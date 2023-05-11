import React, { useEffect, CSSProperties, useState } from "react";
import Navbar from "@/pages/components/app/Navbar";
import Welcome from "@/pages/components/app/homePage/Welcome";
import RightSide from "@/pages/components/app/homePage/RightSide";
import Main from "@/pages/components/app/homePage/Main";
import { useDispatch } from "react-redux";
import { update, updateStorage } from "../../../slices/userSlice";
import { files } from "@/exampleFiles";
import { File, UserState } from "@/interfaces/Interfaces";
import toastMessage from "@/utils/toast";
import { PulseLoader } from "react-spinners";

export const fetchUserData = async (): Promise<UserState> => {
  try {
    //FETCH DATA FROM DB AND RETURN THEM

    return {
      firstName: "Kevin",
      lastName: "Rousseau",
      email: "kevin.rousseau3@gmail.com",
      totalUserStorage: 20971520,
    };
  } catch (error: any) {
    toastMessage(
      "Oups ! Une erreur c'est produite veuillez réessayer plus tard.",
      "error"
    );
    console.error("Something went wrong went fetching user data: ", error);
    throw new Error("Something went wrong went fetching user data: ", error);
  }
};

export const fetchFiles = async (): Promise<File[]> => {
  try {
    //FETCH Files from DB and return them
    return files;
  } catch (error: any) {
    toastMessage(
      "Oups ! Une erreur c'est produite veuillez réessayer plus tard.",
      "error"
    );
    console.error("Something went wrong went fetching user data: ", error);
    throw new Error("Something went wrong went fetching user data: ", error);
  }
};

export const createStorageUsage = async (userData: UserState) => {
  try {
    const userFiles = await fetchFiles();
    const sizeUsed = userFiles.reduce(
      (accumulator, file) => accumulator + file.size,
      0
    );
    const availableStorage = userData.totalUserStorage - sizeUsed;

    return {
      availableStorage: availableStorage,
      usedStorage: sizeUsed,
      files: userFiles,
    };
  } catch (error: any) {
    toastMessage(
      "Oups ! Une erreur c'est produit veuillez réessayer plus tard.",
      "error"
    );
    console.error("Something went wrong when creating storage usage: ", error);
    throw new Error(
      "Something went wrong when creating storage usage: ",
      error
    );
  }
};

export default function Homepage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userData = await fetchUserData();
      const userStorage = await createStorageUsage(userData);

      dispatch(
        update({
          ...userData,
        })
      );
      dispatch(
        updateStorage({
          ...userStorage,
        })
      );

      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="homePageContainer">
      <Navbar />
      <main className="mainPageContainer">
        {isLoading && (
          <PulseLoader
            color="#F87F3F"
            size={100}
            style={{ position: "absolute", left: "30%", top: "40%" }}
          />
        )}
        <Welcome />
        <Main />
      </main>
      <RightSide />
    </div>
  );
}
