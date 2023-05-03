import Navbar from "@/pages/components/app/Navbar";
export default function UserParameters() {
  return (
    <div className="userParametersContainer">
      <Navbar />
      <main className="mainUserParametersContainer">
        <div className="paramsOrInvoicesContainer">
          <div className="params">Paramètres</div>
          <div className="invoices">Factures</div>
        </div>
      </main>
    </div>
  );
}
