import React, { useEffect, useState } from "react";
import Navbar from "@/components/app/Navbar";
import Welcome from "@/components/app/homePage/Welcome";
import RightSide from "@/components/app/homePage/RightSide";
import Main from "@/components/app/homePage/Main";
import { useDispatch } from "react-redux";
import { update, updateStorage } from "../../../slices/userSlice";
import { files } from "@/exampleFiles";
import { File, UserState } from "@/interfaces/Interfaces";
import toastMessage from "@/utils/toast";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/router";
import UsersAPI from "@/services/UsersAPI";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";

export const createStorageUsage = async (userData: UserState) => {
  try {
    if (!userData) {
      return;
    }
    let sizeUsed = 0;
    console.log;
    if (userData.files.length > 0) {
      sizeUsed = userData.files.reduce(
        (accumulator, file) => accumulator + file.size,
        0
      );
    }

    const availableStorage = userData.totalUserStorage - sizeUsed;

    return {
      availableStorage: availableStorage,
      usedStorage: sizeUsed,
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

export const fetchUserData = async (id: string): Promise<UserState> => {
  try {
    const userData = await UsersAPI.getAllData(id);
    return userData;
  } catch (error: any) {
    toastMessage(
      "Oups ! Une erreur c'est produite veuillez réessayer plus tard.",
      "error"
    );
    console.error("Something went wrong went fetching user data: ", error);
    throw new Error("Something went wrong went fetching user data: ", error);
  }
};

export default function Homepage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const userDataRedux = useSelector(selectUser);

  const { success, successLogin } = router.query;

  useEffect(() => {
    if (success) {
      toastMessage("Votre compte a été créer avec succès !", "success");
    } else if (successLogin) {
      toastMessage("Content de vous revoir !", "success");
    }
  }, [success, successLogin]);

  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        const id = localStorage.getItem("id");
        setIsLoading(true);
        if (!id) {
          router.push("/auth/loginPage");
          return;
        }
        const userData = await fetchUserData(id);
        const userStorage = await createStorageUsage(userData);

        dispatch(
          update({
            ...userData,
          })
        );
        if (userStorage) {
          dispatch(
            updateStorage({
              ...userStorage,
            })
          );
        }

        setIsLoading(false);
      }
    };

    if (userDataRedux.firstName) {
      return;
    }

    fetchData();
  }, [dispatch, router.isReady]);

  return (
    <div className="homePageContainer">
      {isLoading ? (
        <>
          <PulseLoader
            color="#F87F3F"
            size={100}
            style={{ position: "absolute", left: "30%", top: "40%" }}
          />
        </>
      ) : (
        <>
          <Navbar />
          <main className="mainPageContainer">
            <Welcome />
            <Main />
          </main>
          <RightSide />
        </>
      )}
    </div>
  );
}
