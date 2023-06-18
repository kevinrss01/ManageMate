import express from "express";
import { db, storage } from "../config/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const upload = multer();

const uploadFile = async (file, originalname) => {
  const storageRef = ref(storage, originalname);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

const addDataInfo = async (userId, dataFromMulter, url) => {
  try {
    const docRef = await doc(db, "users", userId);
    const snapshot = await getDoc(docRef);
    const userData = snapshot.data();

    const { originalname, size, mimetype } = dataFromMulter;

    console.log("data : " + dataFromMulter);

    const fileData = {
      id: uuidv4(),
      name: originalname,
      size: size,
      type: mimetype.substring(mimetype.length - 4),
      dateAdded: new Date().toLocaleDateString("fr-FR"),
      firebaseURL: url,
    };

    const newFiles = [...userData.files, fileData];

    await updateDoc(docRef, { files: newFiles });
  } catch (error) {
    console.error(error);
  }
};

router.post("/addFile", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.file.buffer;
    const fileData = req.file;

    const url = await uploadFile(file, fileData.originalname);
    await addDataInfo(userId, fileData, url);

    res.status(200).json({ message: "File added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error while adding file : ${error.code ? error.code : error}`,
    });
  }
});

export default router;
