import { useState, useEffect } from "react";
export default function FifthPart() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  console.log(scrollPosition);
  return (
    <>
      <div className="fifthContainer">
        <div className="contactContainer">
          <div className="imageSide"></div>
          {scrollPosition >= 2000 && (
            <>
              <div className="textSide">
                <div className="textContainer">
                  <h2>Contactez-nous</h2>
                  <h4>ADRESSE : </h4>
                  <span>35 boulevard de TypeScript, 75087 Paris</span>
                  <h4>CONTACT : </h4>
                  <span>
                    06.07.08.09.10
                    <br />
                    ManageMate@mail.com
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
