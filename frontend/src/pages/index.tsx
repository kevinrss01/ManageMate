import Head from "next/head";
import FirstPart from "@/pages/components/index/index.FirstPart";
// @ts-ignore
import SecondPart from "@/pages/components/index/index.SecondPart";
import ThirdPart from "@/pages/components/index/index.ThirdPart";
import FifthPart from "@/pages/components/index/index.FifthPart";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next APP</title>
      </Head>
      <main className="mainHomePage">
        <div className="logInButton" id="button">
          Se connecter
        </div>
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
