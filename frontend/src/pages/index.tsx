import Head from "next/head";
import FirstPart from "@/components/index/index.FirstPart";
// @ts-ignore
import SecondPart from "@/components/index/index.SecondPart";
import ThirdPart from "@/components/index/index.ThirdPart";
import FifthPart from "@/components/index/index.FifthPart";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toastMessage from "@/utils/toast";

export default function Home() {
  const router = useRouter();
  const { deletedAccount } = router.query;

  useEffect(() => {
    if (deletedAccount) {
      toastMessage("Votre compte a été supprimé avec succès !", "success");
    }
  }, [deletedAccount]);

  return (
    <>
      <Head>
        <title>Manage Mate</title>
        <meta property="og:title" content="Manage Mate" key="title" />
        <link rel="icon" href="/images/ManageMate-logo-solo.png" />
      </Head>
      <main className="mainHomePage">
        <Link href="/auth/loginPage" className="logInButton" id="button">
          Se connecter
        </Link>
        <FirstPart />
        <SecondPart />
        <ThirdPart />
        <div className="fourthContainer">
          <h2>
            Success happens to those
            <br />
            who work for it.
          </h2>
          <div className="imageFourthContainer"></div>
        </div>
        <div>
          <FifthPart />
        </div>
      </main>
    </>
  );
}
