import React, { useEffect, useState } from "react";
import Navbar from "@/components/app/Navbar";
import Welcome from "@/components/app/homePage/Welcome";
import RightSide from "@/components/app/homePage/RightSide";
import Main from "@/components/app/homePage/Main";
import { useDispatch } from "react-redux";
import { update, updateStorage } from "../../../slices/userSlice";
import { UserState } from "@/interfaces/Interfaces";
import toastMessage from "@/utils/toast";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/router";
import UsersAPI from "@/services/UsersAPI";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import authAPI from "@/services/AuthAPI";
import { toast } from "react-toastify";

export const createStorageUsage = (userData: UserState) => {
  try {
    if (!userData) {
      return;
    }
    let sizeUsed = 0;
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

export const fetchUserData = async (
  id: string,
  accessToken: string
): Promise<UserState> => {
  try {
    return await UsersAPI.getAllData(id, accessToken);
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
  const [idAndUserToken, setIdAndUserToken] = useState<{
    id: string;
    accessToken: string;
  }>({ id: "", accessToken: "" });
  const router = useRouter();
  const userDataRedux = useSelector(selectUser);

  const { success, successLogin } = router.query;

  const handleErrors = (
    consoleErrorMessage: string | unknown,
    message?: string
  ) => {
    console.error(consoleErrorMessage);
    localStorage.removeItem("token");
    message ? toastMessage(message, "error") : null;
    router.push("/auth/loginPage");
  };

  useEffect(() => {
    if (success) {
      toastMessage("Votre compte a été créer avec succès !", "success");
    } else if (successLogin) {
      //toastMessage("Content de vous revoir !", "success");
    }
  }, [success, successLogin]);

  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (!id) {
      handleErrors("No id found");
      return;
    }
    if (!accessToken) {
      handleErrors("No token found");
      return;
    }
    setIdAndUserToken({ id: id, accessToken: accessToken });

    const fetchData = async () => {
      try {
        if (router.isReady) {
          const userData = await fetchUserData(id, accessToken);
          const userStorage = createStorageUsage(userData);

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
      } catch (error) {
        handleErrors(
          error,
          "Une erreur est survenue lors de la récupération de vos données"
        );
      }
    };

    const verifyUserAccessToken = async () => {
      setIsLoading(true);
      try {
        if (!accessToken) {
          handleErrors("No token found");
          return;
        }

        await authAPI.verifyToken(accessToken);

        // If we already have the user data in redux, we don't need to fetch it again
        if (userDataRedux.firstName) {
          return;
        }

        await fetchData();
      } catch (error: any) {
        if (error?.response?.status === 401) {
          handleErrors(
            "Token expired",
            "Votre session a expiré, veuillez vous reconnecter."
          );
        } else {
          handleErrors(
            error,
            "Une erreur est survenue, veuillez vous reconnecter."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserAccessToken();
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
            <Main
              userId={idAndUserToken.id}
              userAccessToken={idAndUserToken.accessToken}
            />
          </main>
          <RightSide />
        </>
      )}
    </div>
  );
}
