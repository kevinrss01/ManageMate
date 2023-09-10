import express from "express";
import { db } from "../config/firebase.js";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import {
  validateToken,
  validateTokenAdmin,
  validateUpdateAccountBody,
  validateUpdatePasswordBody,
} from "../middlewares/AuthMiddlewares.js";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const router = express.Router();

const ERROR_USER_NOT_FOUND = "auth/user-not-found";
const ERROR_INVALID_USER_ID = "auth/invalid-user-id";
const ERROR_WEAK_PASSWORD = "auth/weak-password";
const ERROR_USER_NOT_CONNECTED_RECENTLY =
  "Cannot destructure property 'auth' of 'user' as it is null.";
const ERROR_EMAIL_ALREADY_IN_USE = "auth/email-already-in-use";

router.get("/allUsers", validateTokenAdmin, async (req, res) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);

    let users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error while getting users : ${error.code ? error.code : error}`,
    });
  }
});

router.get("/all-info/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = doc(db, "users", id);
    const snapshot = await getDoc(docRef);
    const userData = snapshot.data();

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error while getting user data : ${
        error.code ? error.code : error
      }`,
    });
  }
});

router.put(
  "/updateUserNames/",
  validateToken,
  validateUpdateAccountBody,
  async (req, res) => {
    try {
      const auth = getAuth();
      const { userId, firstName, lastName } = req.body;
      if (!firstName || !lastName) {
        res.status(400).json({ message: "Invalid Body" });
        return;
      }
      await updateProfile(auth.currentUser, firstName, lastName);

      const userRef = doc(db, "users", userId);
      const snapshot = await getDoc(userRef);
      const userData = snapshot.data();

      if (userData) {
        const updatedData = {
          ...userData,
          firstName: firstName || userData.firstName,
          lastName: lastName || userData.lastName,
        };

        await updateDoc(userRef, updatedData);
        res.status(200).json({ message: "Account updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Error while updating mail`,
      });
    }
  }
);

router.put(
  "/updateEmail/",
  validateToken,
  validateUpdateAccountBody,
  async (req, res) => {
    try {
      const auth = getAuth();
      const { userId, email } = req.body;
      if (!email) {
        console.error("Email required");
        res.status(401).json({ message: "Invalid body" });
        return;
      }
      await updateEmail(auth.currentUser, email);

      const userRef = doc(db, "users", userId);
      const snapshot = await getDoc(userRef);
      const userData = snapshot.data();

      if (userData) {
        const updatedData = {
          ...userData,
          email: email || userData.email,
        };

        await updateDoc(userRef, updatedData);
        res.status(200).json({ message: "Account updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      if (error.message === ERROR_USER_NOT_CONNECTED_RECENTLY) {
        res.status(401).json({
          message: `Error : User not connected recently.`,
        });
      } else if (error.code === ERROR_EMAIL_ALREADY_IN_USE) {
        res.status(400).json({
          message: `Error : Email already in use.`,
        });
      } else {
        res.status(500).json({
          message: `Error while updating mail.`,
        });
      }
    }
  }
);

router.put(
  "/updatePassword/",
  validateToken,
  validateUpdatePasswordBody,
  async (req, res) => {
    const { userId, password } = req.body;

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("User not logged in");
      }

      await updatePassword(currentUser, password);

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("error : ", error.toString());

      if (
        error.code === ERROR_USER_NOT_FOUND ||
        error.code === ERROR_INVALID_USER_ID
      ) {
        res.status(404).json({ message: "User not found" });
      } else if (error.code === ERROR_WEAK_PASSWORD) {
        res.status(400).json({
          message: "Weak password. Please choose a stronger password.",
        });
      } else if (error.message === ERROR_USER_NOT_CONNECTED_RECENTLY) {
        res
          .status(401)
          .json({ message: "Error : User not connected recently." });
      } else {
        res.status(500).json({ message: `Error while updating password.` });
      }
    }
  }
);

router.put("/addStorage", validateToken, async (req, res) => {
  try {
    const { userId, invoice } = req.body;
    const userRef = doc(db, "users", userId);
    const snapshot = await getDoc(userRef);
    const userData = snapshot.data();

    const {
      billAddress,
      id,
      paymentDate,
      paymentMethod,
      totalAmount,
      totalStorage,
    } = invoice;

    const newInvoice = {
      billAddress: billAddress,
      id,
      paymentDate,
      paymentMethod,
      totalAmount,
      totalStorage,
    };

    if (userData) {
      const updatedData = {
        ...userData,
        totalUserStorage: userData.totalUserStorage + 21474836480,
        invoices: [...userData.invoices, newInvoice],
      };

      await updateDoc(userRef, updatedData);
      res.status(200).json({ message: "Storage updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error while updating storage`,
    });
  }
});

export default router;
