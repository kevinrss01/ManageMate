import { BsPlus } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { RiFoldersLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import logo from "../../../../public/images/ManageMate.png";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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
              <Link href="/app/homepage">
                <AiFillHome
                  className="icon"
                  style={
                    pathname.includes("homepage") ? { color: "#f77e3f" } : {}
                  }
                ></AiFillHome>
              </Link>
            </div>

            <div className="button">
              <Link href="/app/files">
                <RiFoldersLine
                  className="icon"
                  style={pathname.includes("files") ? { color: "#f77e3f" } : {}}
                />
              </Link>
            </div>
            <div className="button">
              <Link href="/app/userParameters">
                <BsFillPersonFill
                  className="icon"
                  style={pathname.includes("user") ? { color: "#f77e3f" } : {}}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
