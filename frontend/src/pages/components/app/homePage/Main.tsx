import React, { useState } from "react";
import { FcVideoFile, FcImageFile } from "react-icons/fc";
import { AiFillFileText } from "react-icons/ai";
import { MdAudioFile } from "react-icons/md";
import { BsFillTrashFill, BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { selectStorage } from "../../../../../slices/userSlice";
import { useSelector } from "react-redux";
import { formatFileSize } from "@/pages/app/homepage";

const icons: Record<string, React.ReactNode> = {
  pdf: <AiFillFileText style={{ color: "green" }} />,
  jpeg: <FcImageFile style={{ color: "#00b3c3" }} />,
  png: <FcImageFile style={{ color: "#00b3c3" }} />,
  mp4: <MdAudioFile style={{ color: "purple" }} />,
  word: <AiFillFileText />,
  mov: <FcVideoFile />,
};

const iconsType: Record<string, string> = {
  pdf: "Fichier document",
  jpeg: "Fichier image",
  png: "Fichier image",
  mp4: "Fichier audio",
  word: "Fichier Word",
  mov: "Fichier vidéo",
};

export function getTimeSinceAdd(dateString: string): string {
  const date = new Date(dateString);
  if (date.toString() === "Invalid Date") {
    return "Inconnu";
  }
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { name: "an", seconds: 60 * 60 * 24 * 365 },
    { name: "mois", seconds: 60 * 60 * 24 * 30 },
    { name: "semaine", seconds: 60 * 60 * 24 * 7 },
    { name: "jour", seconds: 60 * 60 * 24 },
    { name: "heure", seconds: 60 * 60 },
    { name: "minute", seconds: 60 },
  ];

  for (const unit of units) {
    const count = Math.floor(seconds / unit.seconds);
    if (count >= 1) {
      if (unit.name == "mois") {
        return `${count} ${unit.name}`;
      }
      const plural = count > 1 ? "s" : "";
      return `${count} ${unit.name}${plural}`;
    }
  }
  return "moins d'une minute";
}

export default function Main() {
  const [showTrash, setShowTrash] = useState(true);
  const [fileID, setFileID] = useState("");

  const storageData = useSelector(selectStorage);
  const userFiles = storageData.files;

  const getIcon = (typeOfIcon: string) => {
    return icons[typeOfIcon];
  };

  const getIconText = (typeOfIcon: string) => {
    return iconsType[typeOfIcon];
  };

  return (
    <>
      <div className="mainContainer">
        <h3>Fichier(s) récent(s)</h3>
        <div className="filesContainer">
          {userFiles.length === 0 ? (
            <>
              <p>Vous n'avez pas encore de fichier.</p>
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
                        <div className="fileIcon">{getIcon(file.type)}</div>
                        <div className="fileInfos">
                          <div className="titleContainer">
                            <h3>{file.name}</h3>
                            <h3>.{file.type}</h3>
                          </div>
                          <div className="type">
                            <p>{getIconText(file.type)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="spanContainer">
                        <span className="dateAdded">
                          Il y a {getTimeSinceAdd(file.dateAdded)}
                        </span>
                        <span className="size">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                      {showTrash ? (
                        <>
                          <BsFillTrashFill
                            className="moreIcon"
                            onClick={() => {
                              setFileID(file.id);
                              setShowTrash(false);
                            }}
                          />
                        </>
                      ) : (
                        <>
                          {fileID === file.id ? (
                            <div className="containerDelete">
                              <span>Supprimer ?</span>
                              <BsCheck
                                className="iconValid"
                                style={{ color: "green" }}
                                onClick={() => {
                                  // delete file
                                  setShowTrash(true);
                                }}
                              />
                              <RxCross2
                                className="iconNotValid"
                                style={{ color: "red" }}
                                onClick={() => {
                                  setShowTrash(true);
                                }}
                              />
                            </div>
                          ) : (
                            <BsFillTrashFill
                              className="moreIcon"
                              onClick={() => {
                                setFileID(file.id);
                                setShowTrash(false);
                              }}
                            />
                          )}
                        </>
                      )}
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
