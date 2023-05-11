import { BsPlus } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { RiFoldersLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import logo from "../../../../public/images/ManageMate.png";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  //const [isLoading, setIsLoading] = useState<boolean>(false);
  //const [isClicked, setIsClicked] = useState<string>("");

  const Router = useRouter();

  const hoverColor = {
    color: "#f77e3f",
  };
  const links = [
    {
      name: "Homepage",
      path: "/app/homepage",
      icon: (
        <AiFillHome
          className="icon"
          style={pathname.includes("homepage") ? hoverColor : {}}
        />
      ),
    },
    {
      name: "Files",
      path: "/app/files",
      icon: (
        <RiFoldersLine
          className="icon"
          style={pathname.includes("files") ? hoverColor : {}}
        />
      ),
    },
    {
      name: "Parameters",
      path: "/app/userParameters",
      icon: (
        <BsFillPersonFill
          className="icon"
          style={pathname.includes("user") ? hoverColor : {}}
        />
      ),
    },
  ];

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
            {links.map((link, key) => {
              return (
                <div className="button" key={key}>
                  <Link href={link.path}>{link.icon}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
