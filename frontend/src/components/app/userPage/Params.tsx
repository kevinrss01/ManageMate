import Image from "next/image";
import rocket from "../../../../public/images/rocket.png";
import React from "react";
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

const Params: React.FC<{ userData: UserState; accessToken: string }> = ({
  userData,
  accessToken,
}) => {
  const dispatch = useDispatch();

  const updateStoreInRedux = (data: UpdateDataType) => {
    let updatedUser = { ...userData };
    console.log(updatedUser);

    Object.keys(data).forEach((key) => {
      updatedUser[key] = data[key];
    });

    console.log(updatedUser);

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

  const verifyIfPasswordMatch = (data: {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }): boolean => {
    return data.newPassword === data.newPasswordConfirmation;
  };

  const onSubmit = async (data: UpdateDataType): Promise<void> => {
    try {
      if (data.oldPassword) {
        if (!verifyIfPasswordMatch(data as UpdatePasswordDataType)) {
          toastMessage("Les mots de passe ne correspondent pas", "error");
          return;
        }
        //TODO : Appel axios pour vérifier l'ancien mot de passe est correct et pour connecter l'utilisateur
        //Appel axios pour update le mot de passe
        return toastMessage("Mot de passe mis à jour avec succès !", "success");
      }

      if (data.newEmail) {
        if (data.newEmail === userData.email) {
          return toastMessage("Les valeurs doivent être différentes.", "error");
        }

        //TO DO : Appel axios pour update l'email
        //TO DO : Update le store redux
        return toastMessage("Email mis à jour avec succès !", "success");
      }

      if (data.firstName && data.lastName) {
        if (
          data.firstName === userData.firstName &&
          data.lastName === userData.lastName
        ) {
          return toastMessage("Les valeurs doivent être différentes.", "error");
        }

        await UsersAPI.updateUserNames(
          userData.id,
          data.firstName,
          data.lastName,
          accessToken
        );
        updateStoreInRedux(data);
        toastMessage(`Nom et prénom mis à jour avec succès !`, "success");
      }
    } catch (error: any) {
      toastMessage(
        "Oups ! Une erreur c'est produit veuillez réessayer plus tard.",
        "error"
      );
      console.error("Something went wrong: ", error);
      throw new Error("Something went wrong: ", error);
    }
  };

  return (
    <div className="params-container">
      {/* //TODO :  Mettre cette div dans un composant */}
      <div className="update-container">
        <InfoContainer userData={userData} onSubmit={onSubmit} />
        <EmailContainer userData={userData} onSubmit={onSubmit} />
        <PasswordContainer userData={userData} onSubmit={onSubmit} />
      </div>

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
