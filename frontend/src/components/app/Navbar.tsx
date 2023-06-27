import { BsPlus } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { RiFoldersLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import logo from "../../../public/images/MAnageMate.png";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import AxiosCallApi from "@/services/axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, update, updateStorage } from "../../../slices/userSlice";
import { createStorageUsage } from "../../pages/app/homepage";
import { File } from "@/interfaces/Interfaces";
import toastMessage from "@/utils/toast";
import { ClipLoader } from "react-spinners";

export default function Navbar() {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //const [isClicked, setIsClicked] = useState<string>("");
  const userData = useSelector(selectUser);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      return;
    }
    setUserId(id);
  }, []);

  const Router = useRouter();
  const dispatch = useDispatch();

  const hoverColor = {
    color: "#f77e3f",
  };
  const links = [
    {
      name: "Homepage",
      path: "/app/homepage",
      icon: (
        <AiFillHome
          className="icon"
          style={pathname.includes("homepage") ? hoverColor : {}}
        />
      ),
    },
    {
      name: "Files",
      path: "/app/files",
      icon: (
        <RiFoldersLine
          className="icon"
          style={pathname.includes("files") ? hoverColor : {}}
        />
      ),
    },
    {
      name: "Parameters",
      path: "/app/userParameters",
      icon: (
        <BsFillPersonFill
          className="icon"
          style={pathname.includes("user") ? hoverColor : {}}
        />
      ),
    },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileUploadClick = () => {
    // déclenche le clic sur l'input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateReduxStore = async (file: File) => {
    try {
      const { files, ...rest } = userData;

      const updatedUser = {
        ...rest,
        files: [...files, file],
      };
      const userStorage = await createStorageUsage(updatedUser);

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
    } catch (error) {
      console.error(
        "An error occurred while updating the user in redux.",
        error
      );
      toastMessage(
        "An error occurred while updating the user in redux.",
        "error"
      );
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    try {
      if (!event.target.files) return console.error("No file found");
      const file = event.target.files[0];
      if (file.size > 104857600) {
        toastMessage(
          "La taille du fichier est trop grande, la limite est de 100MB",
          "error"
        );
        return;
      }

      const formData = new FormData();

      formData.append("file", file);
      formData.append("userId", userId);
      const dataInfo: File = await AxiosCallApi.post("files/addFile", formData);
      toastMessage("Fichier importé avec succès", "success");
      updateReduxStore(dataInfo);
    } catch (error) {
      console.error("An error occurred while uploading the file.", error);
      toastMessage(
        "Une erreur est survenue lors de l'import du fichier",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="navbarContainer">
        <div className="navbar">
          <div className="logoContainer">
            <Image className="img" src={logo} alt={"logo"} />
          </div>
          <div className="buttonContainer">
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={onFileChange}
            />
            <div
              className="buttonAdd"
              onClick={() => {
                onFileUploadClick();
              }}
            >
              {isLoading ? (
                <ClipLoader color="#F87F3F" size={30} />
              ) : (
                <BsPlus className="icon" />
              )}
            </div>
            {links.map((link, key) => {
              return (
                <div className="button" key={key}>
                  <Link href={link.path}>{link.icon}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
