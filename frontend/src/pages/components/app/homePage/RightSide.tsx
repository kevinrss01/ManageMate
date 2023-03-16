import { MdMoreVert } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectValue } from "../../../../../slices/userSlice";
export default function RightSide() {
  //Redux
  const userData = useSelector(selectValue);

  return (
    <>
      <div className="rightSideContainer">
        <div className="infoUserContainer">
          <div className="nameAndEmailContainer">
            <h3>{userData.firstName + " " + userData.lastName}</h3>
            <p>{userData.email}</p>
          </div>
          <div className="userActionsContainer">
            <MdMoreVert />
          </div>
        </div>
      </div>
    </>
  );
}
