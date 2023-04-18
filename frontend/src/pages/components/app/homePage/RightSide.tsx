import { MdMoreVert } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectStorage, selectUser } from "../../../../../slices/userSlice";
import { formatFileSize } from "@/pages/app/homepage";
import { File } from "@/interfaces/Interfaces";
import { AiFillFileText } from "react-icons/ai";
import React from "react";
import { RiFoldersFill } from "react-icons/ri";
import { MdLocalMovies } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";

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
      documents: (
        (totalSize.pdf * 100) / userData.totalUserStorage +
        (totalSize.word * 100) / userData.totalUserStorage
      ).toFixed(2),
      images: (
        (totalSize.jpeg * 100) / userData.totalUserStorage +
        (totalSize.png * 100) / userData.totalUserStorage
      ).toFixed(2),
      videos: ((totalSize.mov * 100) / userData.totalUserStorage).toFixed(2),
      others: ((totalSize.mp4 * 100) / userData.totalUserStorage).toFixed(2),
    };
  };

  const percentageByFileType = getPercentageByFileType(userFiles);
  console.log(percentageByFileType);
  const fileTypeColor = {
    documents: "#247b32",
    images: "#7a22ea",
    others: "#f87f3f",
    videos: "#3f363f",
  };

  return (
    <>
      <div className="rightSideContainer">
        <div className="infoUserContainer">
          <div className="nameAndEmailContainer">
            <h3>{userData.firstName + " " + userData.lastName}</h3>
            <p>{userData.email}</p>
          </div>
          <div className="userActionsContainer">
            <MdMoreVert />
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
                  width: `${percentageByFileType.documents}%`,
                  backgroundColor: fileTypeColor.documents,
                }}
              ></div>
              <div
                className="fileTypePercentage"
                style={{
                  height: "100%",
                  width: `${percentageByFileType.videos}%`,
                  backgroundColor: fileTypeColor.videos,
                }}
              ></div>
              <div
                className="fileTypePercentage"
                style={{
                  height: "100%",
                  width: `${percentageByFileType.images}%`,
                  backgroundColor: fileTypeColor.images,
                }}
              ></div>
              <div
                className="fileTypePercentage"
                style={{
                  height: "100%",
                  width: `${percentageByFileType.others}%`,
                  backgroundColor: fileTypeColor.others,
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
                <div className="icon">
                  <AiFillFileText style={{ color: fileTypeColor.documents }} />
                </div>
                <div className="type">
                  <span className="title"></span>
                  <span className="filesNumber"></span>
                </div>
                <div className="size"></div>
              </div>
              <div className="fileTypeUsage">
                <div className="icon">
                  <MdLocalMovies style={{ color: fileTypeColor.videos }} />
                </div>
                <div className="type">
                  <span className="title"></span>
                  <span className="filesNumber"></span>
                </div>
                <div className="size"></div>
              </div>
              <div className="fileTypeUsage">
                <div className="icon">
                  <AiOutlinePicture style={{ color: fileTypeColor.images }} />
                </div>
                <div className="type">
                  <span className="title"></span>
                  <span className="filesNumber"></span>
                </div>
                <div className="size"></div>
              </div>
              <div className="fileTypeUsage">
                <div className="icon">
                  <RiFoldersFill style={{ color: fileTypeColor.others }} />
                </div>
                <div className="type">
                  <span className="title"></span>
                  <span className="filesNumber"></span>
                </div>
                <div className="size"></div>
              </div>
            </div>
            <div className="upgradeSpace"></div>
          </div>
        </div>
      </div>
    </>
  );
}
