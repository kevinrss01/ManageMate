import React, { useState, useEffect } from "react";
import { FcVideoFile, FcFile, FcAudioFile, FcImageFile } from "react-icons/fc";
import { AiFillFileText } from "react-icons/ai";

interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  dateAdded: string;
}

export default function Main() {
  const [files, setFiles] = useState(Array<File>);

  useEffect(() => {
    setFiles([
      {
        id: "1",
        name: "test",
        type: "pdf",
        size: 455,
        dateAdded: "2021-05-05",
      },
      {
        id: "2",
        name: "test2test2test2test2",
        type: "jpeg",
        size: 5500,
        dateAdded: "2021-05-05",
      },
      {
        id: "3",
        name: "test3",
        type: "png",
        size: 100,
        dateAdded: "2021-05-05",
      },
      {
        id: "4",
        name: "test4",
        type: "mp4",
        size: 500,
        dateAdded: "2021-05-05",
      },
      {
        id: "5",
        name: "test5",
        type: "word",
        size: 100,
        dateAdded: "2021-05-05",
      },
    ]);
  }, []);

  const icons: Record<string, React.ReactNode> = {
    pdf: <FcFile />,
    jpeg: <FcImageFile />,
    png: <FcImageFile />,
    mp4: <FcAudioFile />,
    word: <AiFillFileText />,
    mov: <FcVideoFile />,
  };

  const getIcon = (typeOfIcon: string) => {
    return icons[typeOfIcon];
  };

  return (
    <>
      <div className="mainContainer">
        <h3>Accès rapide</h3>
        <div className="filesContainer">
          {files.length === 0 ? (
            <>
              <p>Vous n'avez pas encore de fichier.</p>
            </>
          ) : (
            <>
              {files.slice(0, 4).map((file) => {
                return (
                  <div className="file" key={file.id}>
                    <div className="fileIcon">{getIcon(file.type)}</div>
                    <div className="fileInfos">
                      <div className="titleContainer">
                        <h3>{file.name}.</h3>
                        <h3>{file.type}</h3>
                      </div>
                      <div className="sizeAndType">
                        <p>{file.size} Mo - [type du fichier]</p>
                      </div>
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
