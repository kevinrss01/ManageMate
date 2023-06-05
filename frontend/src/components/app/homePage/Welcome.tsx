import { FcApproval } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../slices/userSlice";

export default function Welcome() {
  //Redux
  const userData = useSelector(selectUser);

  return (
    <>
      <div className="welcomeContainer">
        <div className="welcomeTextContainer">
          <h2>
            Bienvenue {userData.firstName + " " + userData.lastName} !
            <FcApproval style={{ marginLeft: "5px" }} />
          </h2>
        </div>
      </div>
    </>
  );
}
