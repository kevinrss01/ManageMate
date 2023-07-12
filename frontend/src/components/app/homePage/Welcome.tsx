import { FcApproval } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../slices/userSlice";

export default function Welcome() {
  //Redux
  const userData = useSelector(selectUser);
  const { firstName, lastName } = userData;

  return (
    <>
      <div className="welcomeContainer">
        <div className="welcomeTextContainer">
          <h2>
            Bienvenue {firstName + " " + lastName} !
            <FcApproval style={{ marginLeft: "5px" }} />
          </h2>
        </div>
      </div>
    </>
  );
}
