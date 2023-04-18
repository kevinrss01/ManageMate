import React, { useEffect } from "react";
import Navbar from "@/pages/components/app/Navbar";
import Welcome from "@/pages/components/app/homePage/Welcome";
import RightSide from "@/pages/components/app/homePage/RightSide";
import Main from "@/pages/components/app/homePage/Main";
import { useDispatch } from "react-redux";
import { update, updateStorage } from "../../../slices/userSlice";
import { files } from "@/exampleFiles";
import { File } from "@/interfaces/Interfaces";

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

export default function Homepage() {
  //Redux
  const dispatch = useDispatch();

  const fetchFiles = async (): Promise<File[]> => {
    //FETCH Files from DB and return them

    return files;
  };

  useEffect(() => {
    //FETCH DATA WITH AXIOS
    //THEN DISPATCH THE DATA TO THE REDUX STORE
    const data = {
      firstName: "Kevin",
      lastName: "Rousseau",
      email: "kevin.rousseau3@gmail.com",
      totalUserStorage: 20971520,
    };

    dispatch(
      update({
        ...data,
      })
    );

    const fetchData = async () => {
      const userFiles = await fetchFiles();

      console.log(userFiles);
      const sizeUsed = userFiles.reduce(
        (accumulator, file) => accumulator + file.size,
        0
      );

      const availableStorage = data.totalUserStorage - sizeUsed;

      dispatch(
        updateStorage({
          availableStorage: availableStorage,
          usedStorage: sizeUsed,
          files: userFiles,
        })
      );
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="homePageContainer">
      <Navbar />
      <main className="mainPageContainer">
        <Welcome />
        <Main />
      </main>
      <RightSide />
    </div>
  );
}
