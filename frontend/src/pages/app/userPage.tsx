import { useEffect, useState } from "react";
import Params from "@/components/app/userPage/Params";
import Invoices from "@/components/app/userPage/Invoices";
import { useRouter } from "next/router";
import Navbar from "@/components/app/Navbar";
import authAPI from "@/services/AuthAPI";
import toastMessage from "@/utils/toast";
import { useSelector } from "react-redux";
import { fetchUserData } from "@/pages/app/homepage";
import { selectUser } from "../../../slices/userSlice";
import { UserState } from "@/interfaces/Interfaces";
export default function UserPage() {
  const userDataFromRedux = useSelector(selectUser);

  const [isClicked, setIsClicked] = useState<"params" | "invoices">("params");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserState>(userDataFromRedux);
  const [accessToken, setAccessToken] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    setUserData(userDataFromRedux);
  }, [userDataFromRedux]);

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
    const accessToken = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const verifyUserAccessToken = async () => {
      try {
        setIsLoading(true);

        if (!id || !accessToken) {
          handleErrors(
            `No id found or no token found, (id: ${id}, accessToken: ${accessToken})`,
            "Une erreur est survenue, veuillez vous reconnecter."
          );
          return;
        }

        setAccessToken(accessToken);
        await authAPI.verifyToken(accessToken);
        await fetchUser();
      } catch (error: any) {
        localStorage.removeItem("token");
        toastMessage(
          "Votre session a expiré, veuillez vous reconnecter.",
          "error"
        );
        await router.push("/auth/loginPage");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUser = async () => {
      if (userData.firstName === "" && id && accessToken) {
        const dataFetched = await fetchUserData(id, accessToken);
        setUserData(dataFetched);
      } else {
        return;
      }
    };

    verifyUserAccessToken();
  }, []);

  //TODO: add a loader

  return (
    <div className="userParametersContainer">
      <Navbar />
      <main className="mainUserParametersContainer">
        {isLoading ? (
          <>loading...</>
        ) : (
          <>
            <div className="paramsOrInvoicesContainer">
              <div
                className={isClicked === "params" ? "params clicked" : "params"}
                onClick={() => {
                  setIsClicked("params");
                }}
              >
                Paramètres
              </div>
              <div
                className={
                  isClicked === "invoices" ? "invoices clicked" : "invoices"
                }
                onClick={() => {
                  setIsClicked("invoices");
                }}
              >
                Factures
              </div>
            </div>

            {isClicked === "params" && accessToken ? (
              <Params userData={userData} accessToken={accessToken} />
            ) : (
              <>
                <Invoices userData={userData} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
