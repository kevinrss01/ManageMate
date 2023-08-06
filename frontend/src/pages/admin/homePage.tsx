import AuthAPI from "@/services/AuthAPI";
import UsersAPI from "@/services/UsersAPI";
import { useEffect, useState } from "react";
import toastMessage from "@/utils/toast";
import { useRouter } from "next/navigation";
import { UserStateWithId } from "@/interfaces/Interfaces";
import Metrics from "@/components/admin/Metrics";
import AllUsers from "@/components/admin/AllUsers";
import AdminLoader from "@/components/loaders/AdminLoader";

const HomePage = () => {
  const [users, setUsers] = useState<UserStateWithId[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const handleErrors = (
    consoleErrorMessage: string | unknown,
    message?: string
  ) => {
    console.error(consoleErrorMessage);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    message ? toastMessage(message, "error") : null;
    router.push("/auth/loginPage");
  };

  const verifyUserRole = async (accessToken: string) => {
    try {
      const userRole = await AuthAPI.verifyToken(accessToken);

      if (userRole?.decodedToken?.role !== "admin") {
        toastMessage(
          "Vous n'avez pas les droits pour accéder à cette page.",
          "error"
        );
        router.push("/app/homepage");
      } else {
        fetchAllUsers(accessToken);
      }
    } catch (err) {
      handleErrors(
        "Une erreur est survenue lors de la vérification du rôle de l'utilisateur.",
        "Une erreur est survenue, veuillez vous reconnecter."
      );
    }
  };

  const fetchAllUsers = async (accessToken: string) => {
    let errorMessage = "";
    try {
      const users = await UsersAPI.getAllUsers(accessToken);
      if (users) {
        setUsers(users);
      } else {
        errorMessage =
          "Une erreur est survenue lors de la récupération des utilisateurs.";
        return router.push("/app/homepage");
      }
    } catch (err: any) {
      if (err.toString().includes("401")) {
        errorMessage = "Vous n'avez pas les droits pour accéder à cette page.";
        return router.push("/app/homepage");
      } else {
        errorMessage =
          "Une erreur est survenue lors de la récupération des utilisateurs.";
        return router.push("/app/homepage");
      }
    } finally {
      if (errorMessage) toastMessage(errorMessage, "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    const accessToken = localStorage.getItem("token");
    if (!id || !accessToken) {
      return handleErrors(
        "No id found or no token found, (id: ${id}, accessToken: ${accessToken})",
        "Une erreur est survenue, veuillez vous reconnecter."
      );
    }

    verifyUserRole(accessToken);
  }, []);

  // TODO: Dans metrics, ajouter un camembert avec les details des fichiers pour tous les users, essayer de faire une composant reutilisable pour tous les users et pour chaque user

  return (
    <div>
      <h1 className="text-center text-3xl m-5">Page administrateur</h1>
      {isLoading ? (
        <AdminLoader />
      ) : (
        <div className="p-10">
          <Metrics usersData={users} />
          <AllUsers users={users} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
