import React, { useState, useEffect } from "react";
import { FcVideoFile, FcImageFile } from "react-icons/fc";
import { AiFillFileText } from "react-icons/ai";
import { MdAudioFile } from "react-icons/md";
import { BsFillTrashFill, BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { selectStorage, updateStorage } from "../../../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { File } from "@/interfaces/Interfaces";

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

const fetchFiles = async (): Promise<File[]> => {
  return [
    {
      id: "1",
      name: "Whitepaper",
      type: "pdf",
      size: 2045,
      dateAdded: "2022-05-05",
    },
    {
      id: "2",
      name: "imageOfThisAmazingDay",
      type: "jpeg",
      size: 5500,
      dateAdded: "2023-05-05",
    },
    {
      id: "3",
      name: "Image",
      type: "png",
      size: 5700,
      dateAdded: "2019-05-05",
    },
    {
      id: "4",
      name: "musique",
      type: "mp4",
      size: 1700,
      dateAdded: "2017-05-05",
    },
    {
      id: "5",
      name: "test5",
      type: "word",
      size: 1200,
      dateAdded: "2018-05-05",
    },
  ];
};

export const formatFileSize = (sizeInKb: number): string => {
  if (sizeInKb < 1024) {
    return `${sizeInKb} ko`;
  }

  const sizeInMb = sizeInKb / 1024;
  if (sizeInMb < 1024) {
    return `${sizeInMb.toFixed(1)} Mo`;
  }

  const sizeInGb = sizeInMb / 1024;
  return `${sizeInGb.toFixed(1)} Go`;
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
  const [files, setFiles] = useState(Array<File>);
  const [showTrash, setShowTrash] = useState(true);
  const [fileID, setFileID] = useState("");

  const dispatch = useDispatch();
  const storageDataFromRedux = useSelector(selectStorage);

  useEffect(() => {
    const fetchData = async () => {
      const userFiles = await fetchFiles();
      setFiles(userFiles);

      const sizeUsed = userFiles.reduce(
        (accumulator, file) => accumulator + file.size,
        0
      );
      const availableStorage = storageDataFromRedux.availableStorage - sizeUsed;

      dispatch(
        updateStorage({
          availableStorage: availableStorage,
          usedStorage: sizeUsed,
        })
      );
    };

    fetchData();
  }, [dispatch]);

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
          {files.length === 0 ? (
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

              {files
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
                      style={files.length < 4 ? {} : {}}
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
