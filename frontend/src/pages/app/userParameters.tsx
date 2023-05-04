import { useState } from "react";
import Params from "../components/app/Params";

import Navbar from "@/pages/components/app/Navbar";
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
            <div className="invoices-container"></div>
          </>
        )}
      </main>
    </div>
  );
}
