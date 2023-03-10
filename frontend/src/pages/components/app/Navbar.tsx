import { BsPlus } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { RiFoldersLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import logo from "../../../../public/images/ManageMate.png";

export default function Navbar() {
  return (
    <>
      <div className="navbarContainer">
        <div className="navbar">
          <div className="logoContainer">
            <Image className="img" src={logo} alt={"logo"} />
          </div>
          <div className="buttonContainer">
            <div className="buttonAdd">
              <BsPlus className="icon" />
            </div>
            <div className="button">
              <AiFillHome className="icon" />
            </div>
            <div className="button">
              <RiFoldersLine className="icon" />
            </div>
            <div className="button">
              <BsFillPersonFill className="icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
