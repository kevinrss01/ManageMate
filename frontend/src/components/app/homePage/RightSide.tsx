import { useSelector } from "react-redux";
import { selectStorage, selectUser } from "../../../../slices/userSlice";
import { formatFileSizeFromBytes } from "@/utils/fileUtils";
import { AiFillFileText } from "react-icons/ai";
import React, { useEffect } from "react";
import { RiFoldersFill } from "react-icons/ri";
import { MdLocalMovies } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";
import Image from "next/image";
import rocket from "../../../../public/images/rocket.png";
import Link from "next/link";
import {
  getNumberOfFilesByType,
  getPercentageAndSizeByFileType,
} from "@/utils/fileUtils";
import {
  PercentageAndSizeByFileType,
  NumberOfFilesByType,
} from "@/interfaces/Interfaces";

export default function RightSide() {
  //Redux
  const userData = useSelector(selectUser);
  const storageData = useSelector(selectStorage);
  const userFiles = userData.files ? userData.files : [];
  const usedStorage = storageData.usedStorage;

  //Functions
  const totalSpace = formatFileSizeFromBytes(userData.totalUserStorage);
  const availableSpace = formatFileSizeFromBytes(storageData.availableStorage);
  const totalPercentageUsed = (): number => {
    const totalPercentageUsed = (
      (usedStorage * 100) /
      userData.totalUserStorage
    ).toFixed(2);

    return parseFloat(totalPercentageUsed);
  };

  const fileTypeDetail: PercentageAndSizeByFileType =
    getPercentageAndSizeByFileType(userFiles, userData);
  const numberOfFilesByType: NumberOfFilesByType =
    getNumberOfFilesByType(userFiles);

  interface FileType {
    displayName: string;
    name: string;
    color: string;
    colorWithOpacity: string;
    usagePercentage: string;
    icon: React.ReactNode;
  }

  const fileTypes: FileType[] = [
    {
      displayName: "Documents",
      name: "documents",
      color: "#247b32",
      colorWithOpacity: "rgb(36,123,50, 0.15)",
      usagePercentage: fileTypeDetail.documents.percentage,
      icon: <AiFillFileText style={{ color: "#247b32" }} />,
    },
    {
      displayName: "Videos",
      name: "videos",
      color: "#3f363f",
      colorWithOpacity: "rgb(63,54,63, 0.15)",
      usagePercentage: fileTypeDetail.videos.percentage,
      icon: <MdLocalMovies style={{ color: "#3f363f" }} />,
    },
    {
      displayName: "Images",
      name: "images",
      color: "#7a22ea",
      colorWithOpacity: "rgb(122,34,234, 0.15)",
      usagePercentage: fileTypeDetail.images.percentage,
      icon: <AiOutlinePicture style={{ color: "#7a22ea" }} />,
    },
    {
      displayName: "Autres",
      name: "others",
      color: "#f87f3f",
      colorWithOpacity: "rgb(248,127,63, 0.15)",
      usagePercentage: fileTypeDetail.others.percentage,
      icon: <RiFoldersFill style={{ color: "#f87f3f" }} />,
    },
  ];

  return (
    <>
      <div className="rightSideContainer">
        <div className="infoUserContainer">
          <div className="nameAndEmailContainer">
            <Link href="/app/userParameters" style={{ all: "unset" }}>
              <h3>
                {(userData.firstName ? userData.firstName : "Introuvable") +
                  " " +
                  (userData.lastName ? userData.lastName : "introuvable")}
              </h3>
              <p>{userData.email}</p>
            </Link>
          </div>
        </div>
        <div className="storageUsageContainer">
          <div className="titleContainer">
            <h3>Utilisation du stockage</h3>
          </div>
          <div className="infoUsageContainer">
            <div className="colorUsage">
              {fileTypes.map((fileType, index) => {
                return (
                  <div
                    className="fileTypePercentage"
                    key={index}
                    style={{
                      height: "100%",
                      width: `${fileType.usagePercentage}%`,
                      backgroundColor: fileType.color,
                    }}
                  ></div>
                );
              })}
              {totalPercentageUsed() < 50 && (
                <>
                  <span>{totalPercentageUsed()}% UTILISÉ</span>
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
              {fileTypes.map((fileType, index) => {
                return (
                  <div className="fileTypeUsage" key={index}>
                    <div
                      className="icon"
                      style={{
                        backgroundColor: fileType.colorWithOpacity,
                      }}
                    >
                      {fileType.icon}
                    </div>
                    <div className="typeAndSizeContainer">
                      <div className="type">
                        <span className="title">{fileType.displayName}</span>
                        <span className="filesNumber">
                          {numberOfFilesByType[fileType.name]}{" "}
                          {numberOfFilesByType[fileType.name] > 1
                            ? "fichiers"
                            : "fichier"}
                        </span>
                      </div>
                      <div className="size">
                        {fileTypeDetail[fileType.name].size}
                      </div>
                    </div>
                  </div>
                );
              })}
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
