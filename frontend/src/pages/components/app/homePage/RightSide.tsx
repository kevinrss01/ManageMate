import { MdMoreVert } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectStorage, selectUser } from "../../../../../slices/userSlice";
export default function RightSide() {
  //Redux
  const userData = useSelector(selectUser);
  const storageData = useSelector(selectStorage);

  console.log(storageData);

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
        <div className="storageUsageContainer">
          <div className="titleContainer">
            <h3>Utilisation du stockage</h3>
          </div>
          <div className="infoUsageContainer">
            <div className="colorUsage"></div>
            <div className="availableSpace"></div>
            <div className="detailUsage"></div>
            <div className="upgradeSpace"></div>
          </div>
        </div>
      </div>
    </>
  );
}
