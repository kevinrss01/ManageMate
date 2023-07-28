import AuthAPI from "@/services/AuthAPI";
import UsersAPI from "@/services/UsersAPI";
import { useEffect } from "react";
import toastMessage from "@/utils/toast";
import { usePathname, useRouter } from "next/navigation";

const HomePage = () => {
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
        return router.push("/app/homepage");
      }
    } catch (err) {
      handleErrors(
        "Une erreur est survenue lors de la vérification du rôle de l'utilisateur.",
        "Une erreur est survenue, veuillez vous reconnecter."
      );
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

    verifyUserRole(accessToken).then(() => {
      //
    });
  }, []);

  return (
    <div>
      <h1>Admin page</h1>
    </div>
  );
};

export default HomePage;
