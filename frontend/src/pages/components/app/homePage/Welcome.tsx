import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { FcApproval } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { selectValue } from "../../../../../slices/userSlice";

export default function Welcome() {
  const [searchValue, setSearchValue] = useState("");

  //Redux
  const userData = useSelector(selectValue);

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
            Bienvenue {userData.firstName + " " + userData.lastName} !
            <FcApproval style={{ marginLeft: "5px" }} />
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
