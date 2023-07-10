import {
  formatFileSizeFromBytes,
  getTimeSinceAdd,
} from "../../../utils/fileUtils";
import { File } from "@/interfaces/Interfaces";
import { BsFillTrashFill, BsFillCloudDownloadFill } from "react-icons/bs";

interface FilesContainerProps {
  filteredFiles: File[];
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

const FilesContainer: React.FC<FilesContainerProps> = ({ filteredFiles }) => {
  return (
    <div className="files">
      {/** Transformer toute cette partie en composant */}
      {filteredFiles.length === 0 ? (
        <>
          <h2>Aucun fichier trouvé</h2>
        </>
      ) : (
        <>
          {" "}
          {filteredFiles.map((file) => {
            return (
              <div className="file" key={file.fileId}>
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
                        //Delete file
                      }}
                    >
                      <BsFillTrashFill />
                    </button>
                    <button className="download-button">
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
