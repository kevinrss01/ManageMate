import { useState } from "react";
import Params from "@/components/app/userPage/Params";
import Invoices from "@/components/app/userPage/Invoices";

import Navbar from "@/components/app/Navbar";
export default function UserParameters() {
  const [isClicked, setIsClicked] = useState("params");

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
