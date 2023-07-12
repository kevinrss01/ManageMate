import express from "express";
import { db } from "../config/firebase.js";
import { getAuth, updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { validateUpdateAccountBody } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.put("/modifInfoPerso/",validateUpdateAccountBody, async (req, res) => {
  try {
    const auth = getAuth();
    const { userId, firstName, lastName } = req.body;
    await updateEmail(auth.currentUser, firstName, lastName);

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

export default router;
