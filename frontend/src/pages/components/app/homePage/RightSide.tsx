import { useSelector } from "react-redux";
import { selectStorage, selectUser } from "../../../../../slices/userSlice";
import { formatFileSize } from "@/pages/app/homepage";
import { File } from "@/interfaces/Interfaces";
import { AiFillFileText } from "react-icons/ai";
import React from "react";
import { RiFoldersFill } from "react-icons/ri";
import { MdLocalMovies } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";
import Image from "next/image";
import rocket from "../../../../../public/images/rocket.png";

export default function RightSide() {
  //Redux
  const userData = useSelector(selectUser);
  const storageData = useSelector(selectStorage);
  const userFiles = storageData.files;
  const usedStorage = storageData.usedStorage;
  const totalSpace = formatFileSize(userData.totalUserStorage);
  const availableSpace = formatFileSize(storageData.availableStorage);
  const totalPercentageUsed = (): number => {
    const totalPercentageUsed = (
      (usedStorage * 100) /
      userData.totalUserStorage
    ).toFixed(2);

    return parseFloat(totalPercentageUsed);
  };

  const getPercentageByFileType = (files: File[]) => {
    let totalSize = {
      pdf: 0,
      jpeg: 0,
      png: 0,
      mp4: 0,
      word: 0,
      mov: 0,
    };
    files.forEach((file: File) => {
      totalSize[file.type] += file.size;
    });

    return {
      documents: {
        percentage: (
          (totalSize.pdf * 100) / userData.totalUserStorage +
          (totalSize.word * 100) / userData.totalUserStorage
        ).toFixed(2),
        size: formatFileSize(totalSize.pdf + totalSize.word),
      },
      images: {
        percentage: (
          (totalSize.jpeg * 100) / userData.totalUserStorage +
          (totalSize.png * 100) / userData.totalUserStorage
        ).toFixed(2),
        size: formatFileSize(totalSize.jpeg + totalSize.png),
      },
      videos: {
        percentage: ((totalSize.mov * 100) / userData.totalUserStorage).toFixed(
          2
        ),
        size: formatFileSize(totalSize.mov),
      },
      others: {
        percentage: ((totalSize.mp4 * 100) / userData.totalUserStorage).toFixed(
          2
        ),
        size: formatFileSize(totalSize.mp4),
      },
    };
  };

  const getNumberOfFilesByType = (files: File[]) => {
    const totalFiles = {
      pdf: 0,
      jpeg: 0,
      png: 0,
      word: 0,
      mov: 0,
      mp4: 0,
    };

    files.forEach((file: File) => {
      totalFiles[file.type] += 1;
    });

    const { pdf, jpeg, png, word, mov, mp4 } = totalFiles;
    return {
      documents: pdf + word,
      images: jpeg + png,
      videos: mov,
      others: mp4,
    };
  };

  const fileTypeDetail = getPercentageByFileType(userFiles);
  const numberOfFilesByType = getNumberOfFilesByType(userFiles);

  const groupTypeColor = {
    documents: "#247b32",
    images: "#7a22ea",
    others: "#f87f3f",
    videos: "#3f363f",
  };

  return (
    <>
      <div className="rightSideContainer">
        <div className="infoUserContainer">
          <div
            className="nameAndEmailContainer"
            onClick={() => {
              //GO to profile page
            }}
          >
            <h3>{userData.firstName + " " + userData.lastName}</h3>
            <p>{userData.email}</p>
          </div>
        </div>
        <div className="storageUsageContainer">
          <div className="titleContainer">
            <h3>Utilisation du stockage</h3>
          </div>
          <div className="infoUsageContainer">
            <div className="colorUsage">
              <div
                className="fileTypePercentage"
                style={{
                  height: "100%",
                  width: `${fileTypeDetail.documents.percentage}%`,
                  backgroundColor: groupTypeColor.documents,
                }}
              ></div>
              <div
                className="fileTypePercentage"
                style={{
                  height: "100%",
                  width: `${fileTypeDetail.videos.percentage}%`,
                  backgroundColor: groupTypeColor.videos,
                }}
              ></div>
              <div
                className="fileTypePercentage"
                style={{
                  height: "100%",
                  width: `${fileTypeDetail.images.percentage}%`,
                  backgroundColor: groupTypeColor.images,
                }}
              ></div>
              <div
                className="fileTypePercentage"
                style={{
                  height: "100%",
                  width: `${fileTypeDetail.others.percentage}%`,
                  backgroundColor: groupTypeColor.others,
                }}
              ></div>
              {totalPercentageUsed() < 50 && (
                <>
                  <span>
                    {((usedStorage * 100) / userData.totalUserStorage).toFixed(
                      2
                    )}
                    % UTILISÉ
                  </span>
                </>
              )}
            </div>
            <div className="availableUsageContainer">
              <div
                className="availableSpace"
                style={{ borderRight: "1px solid lightgrey" }}
              >
                <p>Place disponible</p>
                <span style={{ color: "#247B32" }}>{availableSpace}</span>
              </div>
              <div className="totalSpace">
                <p>Place totale</p>
                <span style={{ color: "#F87F3F" }}>{totalSpace}</span>
              </div>
            </div>
            <div className="detailUsage">
              <div className="fileTypeUsage">
                <div
                  className="icon"
                  style={{
                    backgroundColor: "rgb(36,123,50, 0.15)",
                  }}
                >
                  <AiFillFileText style={{ color: groupTypeColor.documents }} />
                </div>
                <div className="typeAndSizeContainer">
                  <div className="type">
                    <span className="title">Documents</span>
                    <span className="filesNumber">
                      {numberOfFilesByType.documents}{" "}
                      {numberOfFilesByType.documents > 1
                        ? "fichiers"
                        : "fichier"}
                    </span>
                  </div>
                  <div className="size">{fileTypeDetail.documents.size}</div>
                </div>
              </div>
              <div className="fileTypeUsage">
                <div
                  className="icon"
                  style={{
                    backgroundColor: "rgba(63, 54, 63, 0.15)",
                  }}
                >
                  <MdLocalMovies style={{ color: groupTypeColor.videos }} />
                </div>
                <div className="typeAndSizeContainer">
                  <div className="type">
                    <span className="title">Vidéos</span>
                    <span className="filesNumber">
                      {numberOfFilesByType.videos} {""}
                      {numberOfFilesByType.videos > 1 ? "fichiers" : "fichier"}
                    </span>
                  </div>
                  <div className="size">{fileTypeDetail.videos.size}</div>
                </div>
              </div>
              <div className="fileTypeUsage">
                <div
                  className="icon"
                  style={{
                    backgroundColor: "rgba(122, 34, 234, 0.15)",
                  }}
                >
                  <AiOutlinePicture style={{ color: groupTypeColor.images }} />
                </div>
                <div className="typeAndSizeContainer">
                  <div className="type">
                    <span className="title">Images</span>
                    <span className="filesNumber">
                      {numberOfFilesByType.images} {""}
                      {numberOfFilesByType.images > 1 ? "fichiers" : "fichier"}
                    </span>
                  </div>
                  <div className="size">{fileTypeDetail.images.size}</div>
                </div>
              </div>
              <div className="fileTypeUsage">
                <div
                  className="icon"
                  style={{
                    backgroundColor: "rgba(248, 127, 63, 0.15)",
                  }}
                >
                  <RiFoldersFill style={{ color: groupTypeColor.others }} />
                </div>
                <div className="typeAndSizeContainer">
                  <div className="type">
                    <span className="title">Autres</span>
                    <span className="filesNumber">
                      {numberOfFilesByType.others} {""}
                      {numberOfFilesByType.others > 1 ? "fichiers" : "fichier"}
                    </span>
                  </div>
                  <div className="size">{fileTypeDetail.others.size}</div>
                </div>
              </div>
            </div>
            <div className="upgradeSpace">
              <Image
                src={rocket}
                className="rocketImage"
                alt="Image of a rocket"
              />
              <h3>Besoin de plus d'espace ?</h3>
              <div
                className="button-upgrade"
                onClick={() => {
                  //
                }}
              >
                Augmenter
                <br /> Maintenant
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
