import React, { useState } from "react";
import { BsFillTrashFill, BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { selectStorage, selectUser } from "../../../../slices/userSlice";
import { useSelector } from "react-redux";
import { getTimeSinceAdd, formatFileSizeFromBytes } from "@/utils/fileUtils";
import { FcVideoFile, FcImageFile } from "react-icons/fc";
import {
  AiFillFileText,
  AiOutlineFile,
  AiOutlineDownload,
} from "react-icons/ai";
import { MdAudioFile, MdJavascript } from "react-icons/md";
import { BsFiletypeJson, BsFiletypeHtml, BsFiletypeCss } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const [showTrash, setShowTrash] = useState(true);
  const [fileID, setFileID] = useState("");

  const storageData = useSelector(selectUser);
  const userFiles = storageData.files || [];

  const router = useRouter();

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

  const handleDeleteFile = async () => {
    //
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

              {[...userFiles]
                .sort((a, b) => {
                  const dateA = new Date(a.dateAdded);
                  const dateB = new Date(b.dateAdded);
                  return dateB.getTime() - dateA.getTime();
                })
                .slice(0, 5)
                .map((file) => {
                  return (
                    <div
                      className="file"
                      key={file.id}
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
                        <BsFillTrashFill
                          className="deleteIcon"
                          onClick={() => {
                            handleDeleteFile();
                          }}
                        />
                        <Link href={file.firebaseURL}>
                          <AiOutlineDownload className="download-icon" />
                        </Link>
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
