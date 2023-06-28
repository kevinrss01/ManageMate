import React, { useEffect, useState, useMemo } from "react";
import { BsFillTrashFill, BsCheck } from "react-icons/bs";
import {
  selectUser,
  update,
  updateStorage,
} from "../../../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getTimeSinceAdd, formatFileSizeFromBytes } from "@/utils/fileUtils";
import { FcVideoFile, FcImageFile } from "react-icons/fc";
import {
  AiFillFileText,
  AiOutlineFile,
  AiOutlineDownload,
} from "react-icons/ai";
import { MdAudioFile, MdJavascript } from "react-icons/md";
import { BsFiletypeJson, BsFiletypeHtml, BsFiletypeCss } from "react-icons/bs";
import { File } from "@/interfaces/Interfaces";
import { ClipLoader } from "react-spinners";
import FilesAPI from "@/services/FilesAPI";
import toastMessage from "@/utils/toast";
import { createStorageUsage } from "../../../pages/app/homepage";

const icons: Record<string, React.ReactNode> = {
  pdf: <AiFillFileText style={{ color: "green" }} />,
  jpeg: <FcImageFile style={{ color: "#00b3c3" }} />,
  png: <FcImageFile style={{ color: "#00b3c3" }} />,
  mp4: <MdAudioFile style={{ color: "purple" }} />,
  word: <AiFillFileText />,
  mov: <FcVideoFile />,
  json: <BsFiletypeJson />,
  html: <BsFiletypeHtml />,
  css: <BsFiletypeCss />,
  js: <MdJavascript />,
  txt: <AiFillFileText />,
  svg: <FcImageFile style={{ color: "#00b3c3" }} />,
  docx: <AiFillFileText style={{ color: "skyblue" }} />,
  others: <AiOutlineFile />,
};

const iconsType: Record<string, string> = {
  pdf: "Fichier document",
  jpeg: "Fichier image",
  jpg: "Fichier image",
  png: "Fichier image",
  gif: "Fichier image",
  svg: "Fichier image",
  mp4: "Fichier vidéo",
  mov: "Fichier vidéo",
  avi: "Fichier vidéo",
  flv: "Fichier vidéo",
  mkv: "Fichier vidéo",
  doc: "Fichier Word",
  docx: "Fichier Word",
  txt: "Fichier texte",
  csv: "Fichier CSV",
  xls: "Fichier Excel",
  xlsx: "Fichier Excel",
  ppt: "Fichier PowerPoint",
  pptx: "Fichier PowerPoint",
  mp3: "Fichier audio",
  wav: "Fichier audio",
  ogg: "Fichier audio",
  zip: "Fichier compressé",
  rar: "Fichier compressé",
  html: "Fichier HTML",
  css: "Fichier CSS",
  js: "Fichier JavaScript",
  ts: "Fichier TypeScript",
  json: "Fichier JSON",
  lain: "Fichier texte",
};

export default function Main() {
  const [fileID, setFileID] = useState("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const userState = useSelector(selectUser);
  const [userFiles, setUserFiles] = useState(userState.files.slice(0, 5));
  const dispatch = useDispatch();

  useEffect(() => {
    setUserFiles(
      [...userState.files]
        .sort((a, b) => {
          let dateA;
          let dateB;
          if (
            typeof a.dateAdded === "string" &&
            typeof b.dateAdded === "string"
          ) {
            dateA = new Date(a.dateAdded);
            dateB = new Date(b.dateAdded);
          }
          if (
            typeof a.dateAdded === "object" &&
            typeof b.dateAdded === "object"
          ) {
            dateA = new Date(
              a.dateAdded.seconds * 1000 + a.dateAdded.nanoseconds / 1000000
            );
            dateB = new Date(
              b.dateAdded.seconds * 1000 + b.dateAdded.nanoseconds / 1000000
            );
          }
          if (!dateA || !dateB) {
            return 0;
          }
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 5)
    );
  }, [userState.files]);

  const getIcon = (fileName: string, fileTypeByMulter: string) => {
    let typeOfIcon = fileName.split(".").pop();
    typeOfIcon = typeOfIcon || fileName;

    const iconType = typeOfIcon === fileName ? fileTypeByMulter : typeOfIcon;
    return icons[iconType] || icons["others"];
  };

  const getIconText = (fileName: string, fileTypeByMulter: string) => {
    let typeOfIcon = fileName.split(".").pop();
    typeOfIcon = typeOfIcon || fileName;
    const iconType = typeOfIcon === fileName ? fileTypeByMulter : typeOfIcon;
    return iconsType[iconType] || "Type de fichier inconnu";
  };

  const updateUserStateInRedux = async (fileIdDeleted: string) => {
    const newFiles = userState.files.filter(
      (file) => file.fileId !== fileIdDeleted
    );
    const { files, ...rest } = userState;

    const updatedUser = {
      ...rest,
      files: newFiles,
    };

    const userStorage = createStorageUsage(updatedUser);

    dispatch(
      update({
        ...updatedUser,
      })
    );
    if (userStorage) {
      dispatch(
        updateStorage({
          ...userStorage,
        })
      );
    }
  };

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    try {
      setIsLoadingDelete(true);
      const userId = localStorage.getItem("id");
      if (!userId) {
        throw new Error("No user id found");
      }

      await FilesAPI.deleteFile(userId, fileId);
      updateUserStateInRedux(fileId);
      toastMessage(`Fichier "${fileName}" supprimé avec succès`, "success");
    } catch (error) {
      toastMessage(
        "Une erreur est survenue lors de la suppression du fichier",
        "error"
      );
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <h3>Fichier(s) récent(s)</h3>
        <div className="filesContainer">
          {userFiles.length === 0 ? (
            <>
              <p>
                Vous n'avez pas encore de fichier. Ajouter un fichier en
                cliquant sur le bouton "+"
              </p>
            </>
          ) : (
            <>
              <div className="containerColumnName">
                <h3 style={{ marginRight: "27%" }}>Nom</h3>
                <h3 style={{ marginRight: "8%" }}>Date d'ajout</h3>
                <h3>Taille</h3>
              </div>

              {[...userFiles].map((file) => {
                return (
                  <div
                    className="file"
                    key={file.fileId}
                    style={userFiles.length < 4 ? {} : {}}
                  >
                    <div className="containerInfoAndIcon">
                      <div className="fileIcon">
                        {getIcon(file.name, file.type)}
                      </div>
                      <div className="fileInfos">
                        <div className="titleContainer">
                          <h3>{file.name}</h3>
                        </div>
                        <div className="type">
                          <p>{`${getIconText(file.name, file.type)} (${
                            file.type
                          })`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="spanContainer">
                      <span className="dateAdded">
                        Il y a {getTimeSinceAdd(file.dateAdded)}
                      </span>
                      <span className="size">
                        {formatFileSizeFromBytes(file.size)}
                      </span>
                    </div>

                    <div>
                      {isLoadingDelete && fileID === file.fileId ? (
                        <>
                          <ClipLoader color="#F87F3F" size={20} />
                        </>
                      ) : (
                        <>
                          <BsFillTrashFill
                            className="deleteIcon"
                            onClick={() => {
                              setFileID(file.fileId);
                              handleDeleteFile(file.fileId, file.name);
                            }}
                          />
                        </>
                      )}

                      <a
                        href={file.firebaseURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiOutlineDownload className="download-icon" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
