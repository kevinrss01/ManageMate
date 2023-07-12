import express from "express";
import { auth, db } from "../config/firebase.js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
  validateToken,
  validateUpdateAccountBody,
} from "../middlewares/AuthMiddlewares.js";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const router = express.Router();

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
      console.log(req.body);
      const { userId, firstName, lastName } = req.body;
      if (!firstName || !lastName) {
        res.status(400).json({ message: "Missing data" });
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
        message: `Error while updating mail: ${
          error.code ? error.code : error
        }`,
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
        res.status(400).json({ message: "Email is required" });
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
      console.error(error.message);
      if (
        error.message ===
        "Cannot destructure property 'auth' of 'user' as it is null."
      ) {
        res.status(500).json({
          message: `Error while updating email, please login again.`,
        });
      } else {
        res.status(500).json({
          message: `Error while updating mail: ${
            error.code ? error.code : error
          }`,
        });
      }
    }
  }
);

router.put("/modifPassw/", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const auth = getAuth();
    await updatePassword(auth.currentUser, password);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/invalid-user-id"
    ) {
      res.status(404).json({
        message: "User not found",
      });
    } else if (error.code === "auth/weak-password") {
      res.status(400).json({
        message: "Weak password. Please choose a stronger password.",
      });
    } else {
      console.error(error);
      res.status(500).json({
        message: `Error while updating password: ${
          error.code ? error.code : error
        }`,
      });
    }
  }
});

export default router;
