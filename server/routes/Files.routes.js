import express from "express";
import { db, storage } from "../config/firebase.js";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  validateAddFileBody,
  validateDeleteFileBody,
} from "../middlewares/FilesMiddlewares.js";

const router = express.Router();
const upload = multer();

const uploadFile = async (file, originalname, mimetype) => {
  const newFileId = uuidv4();
  const filePath = `${newFileId}`;
  const storageRef = ref(storage, filePath);

  await uploadBytesResumable(storageRef, file, {
    contentType: mimetype, // Définition du type MIME
  });

  const url = await getDownloadURL(storageRef);

  return {
    url: url,
    fileId: filePath,
  };
};

const addDataInfoDoc = async (userId, dataFromMulter, storageInfo) => {
  try {
    const { originalname, size, mimetype } = dataFromMulter;
    const { fileId, url } = storageInfo;
    const docRef = doc(db, "users", userId);
    const snapshot = await getDoc(docRef);
    const userData = snapshot.data();

    const fileData = {
      name: originalname,
      fileId: fileId,
      size: size,
      type: mimetype.substring(mimetype.length - 4).replace("/", ""),
      dateAdded: new Date(),
      firebaseURL: url,
    };

    const newFiles = [...userData.files, fileData];

    await updateDoc(docRef, { files: newFiles });

    return fileData;
  } catch (error) {
    console.error(error);
  }
};

router.post(
  "/addFile",
  upload.single("file"),
  validateAddFileBody,
  async (req, res) => {
    try {
      const { userId } = req.body;
      const file = req.file.buffer;
      const fileData = req.file;

      const storageInfoFirebase = await uploadFile(
        file,
        fileData.originalname,
        fileData.mimetype
      );
      const dataInfo = await addDataInfoDoc(
        userId,
        fileData,
        storageInfoFirebase
      );

      res.status(200).json(dataInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Error while adding file : ${error.code ? error.code : error}`,
      });
    }
  }
);

router.delete(
  "/deleteFile/:userId/:fileId",
  validateDeleteFileBody,
  async (req, res) => {
    try {
      const { userId, fileId } = req.params;

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const userFiles = userDoc.data().files;
      const fileToRemove = userFiles.find((file) => file.fileId === fileId);

      if (!fileToRemove) {
        res.status(404).json({ message: "File not found" });
        return;
      }

      // Delete file from Firebase Storage
      const fileRef = ref(storage, fileToRemove.fileId);
      await deleteObject(fileRef);

      // Delete file from Firestore
      await updateDoc(userRef, {
        files: arrayRemove(fileToRemove),
      });

      res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Error while deleting file : ${
          error.code ? error.code : error
        }`,
      });
    }
  }
);

export default router;
