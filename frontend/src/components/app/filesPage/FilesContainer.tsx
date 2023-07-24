import React, { useState } from "react";
import { formatFileSizeFromBytes, getTimeSinceAdd } from "@/utils/fileUtils";
import { File } from "@/interfaces/Interfaces";
import { BsFillTrashFill, BsFillCloudDownloadFill } from "react-icons/bs";
import FilesAPI from "@/services/FilesAPI";
import toastMessage from "@/utils/toast";
import { createStorageUsage } from "@/pages/app/homepage";
import {
  selectUser,
  update,
  updateStorage,
} from "../../../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

interface FilesContainerProps {
  filteredFiles: File[];
  userId: string;
  userAccessToken: string;
}

const convertedDate = (
  date: string | { seconds: number; nanoseconds: number }
) => {
  if (typeof date === "string") {
    return new Date(date).toLocaleString("fr-FR");
  } else {
    const dateObject = new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000
    );
    return dateObject.toLocaleString("fr-FR");
  }
};

const FilesContainer: React.FC<FilesContainerProps> = ({
  filteredFiles,
  userId,
  userAccessToken,
}) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [fileIdDeleted, setFileIdDeleted] = useState<string>("");
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();

  const updateUserStateInRedux = (fileIdDeleted: string) => {
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
      await FilesAPI.deleteFile(userId, fileId, userAccessToken);
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
    <div className="files">
      {filteredFiles.length === 0 ? (
        <>
          <h2>Aucun fichier trouvé</h2>
        </>
      ) : (
        <>
          {filteredFiles.map((file) => {
            return (
              <div className="file" key={`file-${file.fileId}`}>
                <div className="name-type-container">
                  <span className="name">{file.name}</span>
                </div>
                <div className="file-infos-container">
                  <div className="type-size">
                    <span className="type">
                      Fichier <b>{file.type}</b>{" "}
                    </span>
                    <span className="size">
                      ({formatFileSizeFromBytes(file.size)})
                    </span>
                  </div>
                  <span className="date">
                    Ajouté il y a {getTimeSinceAdd(file.dateAdded)}
                  </span>
                  <span className="date-2">
                    ({convertedDate(file.dateAdded)})
                  </span>
                  <div className="icons-container">
                    <button
                      className="noselect delete-button"
                      onClick={() => {
                        setFileIdDeleted(file.fileId);
                        handleDeleteFile(file.fileId, file.name);
                      }}
                    >
                      {isLoadingDelete && fileIdDeleted === file.fileId ? (
                        <ClipLoader color="#fff" size={18} />
                      ) : (
                        <BsFillTrashFill />
                      )}
                    </button>
                    <button
                      className="download-button"
                      onClick={() => {
                        window.open(file.firebaseURL, "_blank");
                      }}
                    >
                      <BsFillCloudDownloadFill />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </>
      )}
    </div>
  );
};

export default FilesContainer;
