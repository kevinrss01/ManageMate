import express from "express";
import {
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, userCollection, db } from "../config/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  validateRegisterBody,
  validateLoginBody,
} from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.post("/register", validateRegisterBody, async (req, res) => {
  try {
    const { email, password, firstName, lastName, invoices } = req.body;
    const user = await createUserWithEmailAndPassword(auth, email, password);

    // total user storage is set to 20GO by default (20971520 bytes/ko)
    await setDoc(doc(db, "users", user.user.uid), {
      email: email,
      firstName: firstName,
      lastName: lastName,
      id: user.user.uid,
      totalUserStorage: 21474836480, // 20GO or 20971520 ko or 21474836480 bytes/octets
      files: [],
      invoices: invoices,
      role: "user",
    });

    res.status(200).json({ id: user.user.uid });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error while creating user : ${error.code ? error.code : error}`,
    });
  }
});

router.post("/login", validateLoginBody, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signInWithEmailAndPassword(auth, email, password);

    const docRef = await doc(userCollection, user.user.uid);
    const snapshot = await getDoc(docRef);
    const userData = snapshot.data();

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }
    res.status(500).json({
      message: `Error while logging in : ${error.code ? error.code : error}`,
    });
  }
});

router.post("/verifyEmail", async (req, res) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(
      auth,
      req.body.email
    );

    res.json({ exists: signInMethods.length > 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occured while verifying email",
    });
  }
});

export default router;
