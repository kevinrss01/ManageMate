import express from "express";
import { auth, db } from "../config/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

const router = express.Router();

router.get("/all-info/:id", async (req, res) => {
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

export default router;
