import express from "express";
import { db } from "../config/firebase.js";
import { getAuth, updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { validateUpdateAccountBody } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

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

export default router;
