import { MdWavingHand } from "react-icons/md";

export default function Welcome() {
  return (
    <>
      <div className="welcomeContainer">
        <div className="welcomeTextContainer">
          <h2>
            Bienvenue Prénom Nom ! <MdWavingHand />
          </h2>
        </div>
      </div>
    </>
  );
}
