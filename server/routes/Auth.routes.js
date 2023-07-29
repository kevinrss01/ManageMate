import express from "express";
import {
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, userCollection, db } from "../config/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  validateRegisterBody,
  validateLoginBody,
} from "../middlewares/AuthMiddlewares.js";
import jsonwebtoken from "jsonwebtoken";

const { sign, verify } = jsonwebtoken;

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

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env.local file");
    }

    const accessToken = sign(
      { userId: user.user.uid, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );

    res.status(200).json({ id: user.user.uid, accessToken: accessToken });
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

    const docRef = doc(userCollection, user.user.uid);
    const snapshot = await getDoc(docRef);
    const userData = snapshot.data();

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env.local file");
    }

    const accessToken = sign(
      { userId: userData.id, role: userData.role },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );

    res.status(200).json({ id: userData.id, accessToken: accessToken });
  } catch (error) {
    console.error(error);
    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      return res.status(401).json({
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

router.get("/verifyToken", (req, res) => {
  try {
    const authHeaderToken = req.headers.authorization;

    if (!authHeaderToken) {
      return res.status(401).json({ message: "No authorization header sent" });
    }

    const decoded = verify(authHeaderToken, process.env.JWT_SECRET);

    res.status(200).json({ decodedToken: decoded });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: "Invalid access token",
    });
  }
});

router.get("/logout", async (req, res) => {
  try {
    await signOut(auth);
    res.status(200).json({ message: "logout" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occured while logging out",
    });
  }
});

export default router;
