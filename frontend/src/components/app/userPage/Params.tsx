import Image from "next/image";
import rocket from "../../../../public/images/rocket.png";
import React, { useState } from "react";
import {
  UpdateDataType,
  UpdatePasswordDataType,
  UserState,
} from "@/interfaces/Interfaces";
import InfoContainer from "@/components/app/userPage/Params/InfoContainer";
import EmailContainer from "@/components/app/userPage/Params/EmailContainer";
import PasswordContainer from "@/components/app/userPage/Params/PasswordContainer";
import toastMessage from "@/utils/toast";
import UsersAPI from "@/services/UsersAPI";
import { useDispatch } from "react-redux";
import { createStorageUsage } from "@/pages/app/homepage";
import { update, updateStorage } from "../../../../slices/userSlice";
import AuthAPI from "@/services/AuthAPI";
import { Button } from "@tremor/react";

const verifyIfPasswordMatch = (data: {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}): boolean => {
  return data.newPassword === data.newPasswordConfirmation;
};

const Params: React.FC<{ userData: UserState; accessToken: string }> = ({
  userData,
  accessToken,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeOfDataFetching, setTypeOfDataFetching] = useState<
    "names" | "password" | "email" | null
  >(null);
  const [isSuccessfullFetch, setIsSuccessfullFetch] = useState<boolean>(false);

  const dispatch = useDispatch();

  const updateStoreInRedux = (data: UpdateDataType) => {
    let updatedUser = userData;

    Object.keys(data).forEach((key) => {
      updatedUser = { ...updatedUser, [key]: data[key] };
    });

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

    userData = updatedUser;
  };

  const updateNamesInFirebase = async (data: UpdateDataType) => {
    setTypeOfDataFetching("names");
    const { firstName, lastName } = data;

    if (firstName === userData.firstName && lastName === userData.lastName) {
      return toastMessage("Les valeurs doivent être différentes.", "error");
    }

    if (!firstName || !lastName)
      return toastMessage("Les valeurs ne peuvent pas être vides.", "error");

    await UsersAPI.updateUserNames(
      userData.id,
      firstName,
      lastName,
      accessToken
    );
    updateStoreInRedux(data);
    toastMessage(`Nom et/ou prénom mis à jour avec succès !`, "success");
  };

  const updateEmailInFirebase = async (data: UpdateDataType) => {
    const { newEmail } = data;

    if (newEmail === userData.email) {
      return toastMessage("Les valeurs doivent être différentes.", "error");
    }
    if (!data.newEmail)
      return toastMessage("L'email ne peut pas être vide.", "error");
    await UsersAPI.updateUserEmail(userData.id, data.newEmail, accessToken);
    updateStoreInRedux({ email: data.newEmail });
    return toastMessage("Email mis à jour avec succès !", "success");
  };

  const updatePasswordInFirebase = async (data: UpdateDataType) => {
    if (!data.newPassword)
      return toastMessage("Le mot de passe ne peut pas être vide.", "error");
    await UsersAPI.updateUserPassword(
      userData.id,
      data.newPassword,
      accessToken
    );
  };

  const onSubmit = async (data: UpdateDataType): Promise<void> => {
    setIsLoading(true);

    try {
      if (data.oldPassword) {
        setTypeOfDataFetching("password");
        if (!verifyIfPasswordMatch(data as UpdatePasswordDataType)) {
          toastMessage("Les mots de passe ne correspondent pas", "error");
          return;
        }
        if (
          data.oldPassword === data.newPassword ||
          data.oldPassword === data.newPasswordConfirmation
        ) {
          toastMessage(
            "Le nouveau mot de passe doit être différent de l'ancien.",
            "error"
          );
          return;
        }
        await AuthAPI.login(userData.email, data.oldPassword)
          .then(async () => {
            await updatePasswordInFirebase(data);
            return toastMessage(
              "Mot de passe mis à jour avec succès !",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error: ", error);
            if (error.toString().includes("401")) {
              toastMessage("Mot de passe incorrect.", "error");
              return;
            }
            toastMessage(
              "Une erreur est survenue. Veuillez réessayer plus tard.",
              "error"
            );
          });
      }

      if (data.newEmail && data.password) {
        setTypeOfDataFetching("email");
        await AuthAPI.login(userData.email, data.password)
          .then(async () => {
            await updateEmailInFirebase(data);
          })
          .catch((error) => {
            console.error("Error: ", error);
            if (error.toString().includes("401")) {
              toastMessage("Mot de passe incorrect.", "error");
              return;
            }
            toastMessage(
              "Une erreur est survenue. Veuillez réessayer plus tard.",
              "error"
            );
          });

        return;
      }

      if (data.firstName && data.lastName) {
        await updateNamesInFirebase(data);
      }
    } catch (error: any) {
      toastMessage(
        "Oups ! Une erreur c'est produit veuillez réessayer plus tard.",
        "error"
      );
      console.error("Something went wrong: ", error);
      throw new Error("Something went wrong: ", error);
    } finally {
      setIsLoading(false);
      setTypeOfDataFetching(null);
    }
  };

  return (
    <div className="params-container">
      <div className="update-container">
        <InfoContainer
          userData={userData}
          onSubmit={onSubmit}
          isLoading={isLoading}
          typeOfDataFetching={typeOfDataFetching}
        />
        <EmailContainer
          userData={userData}
          onSubmit={onSubmit}
          isLoading={isLoading}
          typeOfDataFetching={typeOfDataFetching}
          isSuccessfullFetching={isSuccessfullFetch}
        />
        <PasswordContainer
          userData={userData}
          onSubmit={onSubmit}
          isLoading={isLoading}
          typeOfDataFetching={typeOfDataFetching}
          isSuccessfullFetching={isSuccessfullFetch}
        />
      </div>

      <Button>Bonjour</Button>

      <div className="upgrade-container">
        <div className="upgrade-space-params">
          <Image src={rocket} className="rocketImage" alt="Image of a rocket" />
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
  );
};

export default Params;
