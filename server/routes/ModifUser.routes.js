import express from "express";
import { db } from "../config/firebase.js";
import { getAuth, updateEmail , updatePassword,updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { validateUpdateAccountBody } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.put("/modifInfoPerso/",validateUpdateAccountBody, async (req, res) => {
  try {
    const auth = getAuth();
    const { userId, firstName, lastName } = req.body;
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
});

router.put("/modifMail/", async (req, res) => {
  try {
    const auth = getAuth();
    const { userId, email } = req.body;
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
    if (
      error ==
      "TypeError: Cannot destructure property 'auth' of 'user' as it is null."
    ) {
      res.status(500).json({
        message: `Veuillez vous reconnectez`,
      });
    } else {
      console.error(error);
      res.status(500).json({
        message: `Error while updating mail: ${
          error.code ? error.code : error
        }`,
      });
    }
  }
});

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
