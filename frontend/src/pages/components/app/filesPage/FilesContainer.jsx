import { useEffect, useState } from "react";
import {
  formatFileSizeFromKb,
  getTimeSinceAdd,
} from "../../../../utils/fileUtils";

export default function FilesContainer({ filteredFiles }) {
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
              <div className="file" key={file.id}>
                <div className="name-type-container">
                  <span className="name">{file.name}</span>
                </div>
                <div className="file-infos-container">
                  <div className="type-size">
                    <span className="type">
                      Fichier <b>{file.type}</b>{" "}
                    </span>
                    <span className="size">
                      ({formatFileSizeFromKb(file.size)})
                    </span>
                  </div>
                  <span className="date">
                    Ajouté il y a {getTimeSinceAdd(file.dateAdded)}
                  </span>
                  <span className="date-2">({file.dateAdded})</span>
                  <button
                    className="noselect delete-button"
                    onClick={() => {
                      //Delete file
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}{" "}
        </>
      )}
    </div>
  );
}
