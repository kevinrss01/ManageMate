import React, { useState } from "react";
import { BsFillTrashFill, BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { selectStorage } from "../../../../slices/userSlice";
import { useSelector } from "react-redux";
import { getTimeSinceAdd, formatFileSizeFromKb } from "@/utils/fileUtils";
import { FcVideoFile, FcImageFile } from "react-icons/fc";
import { AiFillFileText, AiOutlineFile } from "react-icons/ai";
import { MdAudioFile } from "react-icons/md";

const icons: Record<string, React.ReactNode> = {
  pdf: <AiFillFileText style={{ color: "green" }} />,
  jpeg: <FcImageFile style={{ color: "#00b3c3" }} />,
  png: <FcImageFile style={{ color: "#00b3c3" }} />,
  mp4: <MdAudioFile style={{ color: "purple" }} />,
  word: <AiFillFileText />,
  mov: <FcVideoFile />,
  others: <AiOutlineFile />,
};

const iconsType: Record<string, string> = {
  pdf: "Fichier document",
  jpeg: "Fichier image",
  png: "Fichier image",
  mp4: "Fichier audio",
  word: "Fichier Word",
  mov: "Fichier vidéo",
};

export default function Main() {
  const [showTrash, setShowTrash] = useState(true);
  const [fileID, setFileID] = useState("");

  const storageData = useSelector(selectStorage);
  const userFiles = storageData.files;

  const getIcon = (typeOfIcon: string) => {
    return icons[typeOfIcon] === undefined
      ? icons["others"]
      : icons[typeOfIcon];
  };

  const getIconText = (typeOfIcon: string) => {
    return iconsType[typeOfIcon] === undefined
      ? "inconnu"
      : iconsType[typeOfIcon];
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
                          {formatFileSizeFromKb(file.size)}
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
