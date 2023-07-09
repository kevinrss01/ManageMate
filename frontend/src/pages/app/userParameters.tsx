import { useEffect, useState } from "react";
import Params from "@/components/app/userPage/Params";
import Invoices from "@/components/app/userPage/Invoices";
import { useRouter } from "next/router";
import Navbar from "@/components/app/Navbar";
import authAPI from "@/services/AuthAPI";
import toastMessage from "@/utils/toast";
export default function UserParameters() {
  const [isClicked, setIsClicked] = useState("params");

  const router = useRouter();

  useEffect(() => {
    const verifyUserAccessToken = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
          console.log("No token found");
          await router.push("/auth/loginPage");
          return;
        }

        await authAPI.verifyToken(accessToken);
      } catch (error: any) {
        localStorage.removeItem("token");
        toastMessage(
          "Votre session a expiré, veuillez vous reconnecter.",
          "error"
        );
        await router.push("/auth/loginPage");
      }
    };

    verifyUserAccessToken();
  }, []);

  return (
    <div className="userParametersContainer">
      <Navbar />
      <main className="mainUserParametersContainer">
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

        {isClicked === "params" ? (
          <Params />
        ) : (
          <>
            <Invoices />
          </>
        )}
      </main>
    </div>
  );
}
