import { MdWavingHand } from "react-icons/md";
import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";

export default function Welcome() {
  const [firstName, setFirstName] = useState("Kevin");
  const [lastName, setLastName] = useState("Rousseau");
  const [searchValue, setSearchValue] = useState("");

  const searchFiles = () => {
    if (searchValue) {
      console.log(searchValue);
    }
  };

  return (
    <>
      <div className="welcomeContainer">
        <div className="welcomeTextContainer">
          <h2>
            Bienvenue {firstName + " " + lastName} !{" "}
            <MdWavingHand style={{ marginLeft: "5px" }} />
          </h2>
        </div>
        <div className="searchContainer">
          <SlMagnifier className="searchIcon" />
          <input
            type="text"
            placeholder="Rechercher quelque chose ici"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (searchValue) {
                  searchFiles();
                }
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
