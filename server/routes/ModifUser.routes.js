import express from "express";
import {
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  validateUpdateAccountBody,
} from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.put("/modifUser", validateUpdateAccountBody, async (req, res) => {
  try {
    const { userId, email, password, firstName, lastName, invoices } = req.body;

  
    if (email) {
      await updateEmail(auth.currentUser, email);
    }
    if (password) {
      await updatePassword(auth.currentUser, password);
    }


    const userRef = doc(db, "users", userId);
    const snapshot = await getDoc(userRef);
    const userData = snapshot.data();

    if (userData) {
      const updatedData = {
        ...userData,
        email: email || userData.email,
        firstName: firstName || userData.firstName,
        lastName: lastName || userData.lastName,
        invoices: invoices || userData.invoices,
      };

      await setDoc(userRef, updatedData);
      res.status(200).json({ message: "Account updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error while updating account: ${
        error.code ? error.code : error
      }`,
    });
  }
});

export default router;
