import React, { useEffect, useState } from "react";

export default function SecondPart() {
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
      <div className="secondContainer">
        {scrollPosition >= 254 && (
          <>
            <div className="titleSecondContainer">
              <img src="/images/ManageMate-logo-solo.png" alt="" />
              <h2>Qui Somme Nous</h2>
              <p>
                ManageMate est une application web haut de gamme qui permet de
                gérer et de synchroniser tous vos fichiers sur une même
                plateforme en toute sécurité, simplement et rapidement. Nous
                utilisons les technologies les plus récentes afin de rendre la
                meilleure expérience possible.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
