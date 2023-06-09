import { invoicesExample } from "@/exampleFiles";
import React, { useEffect, useState } from "react";
import { Invoices } from "@/interfaces/Interfaces";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  billAddress: {
    marginBottom: 20,
  },
  total: {
    marginBottom: 20,
  },
  paymentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
  },
  firstTitle: {
    fontSize: 25,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  image: {
    width: 150,
    height: 150,
  },
});

interface InvoicePDFProps {
  invoice: Invoices;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice }) => {
  const priceWithoutTVA = invoice.totalAmount - invoice.totalAmount * 0.2;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={styles.image} src={"/images/ManageMate-logo.png"} />
        </div>
        <Text style={styles.header}>Facture #{invoice.id}</Text>
        <Text> </Text>
        <Text>Date de paiement : {invoice.paymentDate}</Text>
        <Text> </Text>
        <View style={styles.billAddress}>
          <Text style={styles.title}>Adresse de facturation :</Text>
          <Text> </Text>
          <Text>
            {invoice.billAddress.firstName} {invoice.billAddress.lastName}
          </Text>
          <Text>{invoice.billAddress.company}</Text>
          <Text>{invoice.billAddress.address}</Text>
          <Text>
            {invoice.billAddress.postalCode} {invoice.billAddress.city}
          </Text>
          <Text>{invoice.billAddress.country}</Text>
        </View>
        <View>
          <Text style={styles.title}>Contenu :</Text>
          <Text> </Text>
          <Text>
            Total stockage acheté :{" "}
            <Text style={styles.bold}>{invoice.totalStorage}</Text>
          </Text>
          <Text> </Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.title}>Prix :</Text>
          <Text> </Text>
          <Text>
            Montant sans TVA (20%) :{" "}
            <Text style={styles.bold}>{priceWithoutTVA} €</Text>
          </Text>
          <Text>
            Montant total :{" "}
            <Text style={styles.bold}>{invoice.totalAmount} €</Text>
          </Text>
        </View>
        <Text>Méthode de paiement : {invoice.paymentMethod}</Text>
        <Text> </Text>
      </Page>
    </Document>
  );
};

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoices[]>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState<string>("");

  useEffect(() => {
    const getInvoices = async () => {
      //Fetch with axios
      const invoicesFetched = invoicesExample as any;
      setInvoices(invoicesFetched);
    };
    getInvoices();
  }, []);

  const selectedInvoice = invoices.find((invoice) => invoice.id === invoiceId);

  return (
    <div className="invoices-container">
      <div className="invoices-list-container">
        <h2>Liste de mes factures</h2>

        <div className="invoices-list-item">
          {invoices.length === 0 ? (
            <p>Vous n'avez aucune factures.</p>
          ) : (
            <>
              {[...invoices]
                .sort((a, b) => {
                  const dateA = new Date(a.paymentDate);
                  const dateB = new Date(b.paymentDate);
                  return dateB.getTime() - dateA.getTime();
                })
                .map((invoice) => {
                  return (
                    <div
                      className={
                        isClicked && invoice.id === invoiceId
                          ? "invoice-container clicked"
                          : "invoice-container"
                      }
                      key={invoice.id}
                      onClick={() => {
                        setIsClicked(true);
                        setInvoiceId(invoice.id);
                      }}
                    >
                      <span>Facture du {invoice.paymentDate}</span>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
      <div className="invoices">
        {isClicked && selectedInvoice ? (
          <>
            <PDFViewer className="pdf-viewer">
              <InvoicePDF invoice={selectedInvoice} />
            </PDFViewer>
          </>
        ) : (
          <div className="text-container">
            <p>Sélectionnez une facture pour afficher un aperçu.</p>
          </div>
        )}
      </div>
    </div>
  );
}
