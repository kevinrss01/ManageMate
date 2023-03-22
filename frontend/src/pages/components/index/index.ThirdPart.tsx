import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { MdQueryStats } from "react-icons/md";
import { BiShapeCircle } from "react-icons/bi";
import React, { useEffect, useState } from "react";

export default function ThirdPart() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  return (
    <>
      <div className="thirdContainer">
        {scrollPosition >= 758 && (
          <>
            <div className="titleThirdContainer">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <h2>Qu'est-ce que nous proposons ?</h2>
            </div>
            <div className="squareContainer">
              <div className="square square-one">
                <div className="squareLogoContainer">
                  <HiOutlineDocumentChartBar className="squareIcon" />
                </div>
                <div className="squareTextContainer">
                  <h2>STOCKAGE DE FICHIER</h2>
                  <ul>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <li>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Possibilité de stocker tous les types de fichier jusqu'à
                      20 giga*
                    </li>
                  </ul>
                </div>
              </div>
              <div className="square square-two">
                <div className="squareLogoContainer">
                  <MdQueryStats className="squareIcon" />
                </div>
                <div className="squareTextContainer">
                  <h2>SUIVI EN TEMPS RÉEL</h2>
                  <ul>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <li>
                      Tous vos fichiers sont synchronisés en temps réel sur tous
                      vos appareils
                    </li>
                  </ul>
                </div>
              </div>
              <div className="square square-three">
                <div className="squareLogoContainer">
                  <BiShapeCircle className="squareIcon" />
                </div>
                <div className="squareTextContainer">
                  <h2>SÉCURITÉ ÉLEVÉE</h2>
                  <ul>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <li>
                      Nous utilisons les dernières technologies de cryptage pour
                      garantir la sécurité de vos données
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
