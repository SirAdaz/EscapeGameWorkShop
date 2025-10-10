import React, { useState } from "react";
import {useSocket} from "@/hooks/useSocket";

export default function Fiole({onClose}: {onClose: () => void}) {
  const [fiole1, setFiole1] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [fiole2, setFiole2] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [fiole3, setFiole3] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [fiole4, setFiole4] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const [fiole5, setFiole5] = useState(false);
  const [hovered5, setHovered5] = useState(false);
  const [fiole6, setFiole6] = useState(false);
  const [hovered6, setHovered6] = useState(false);
  const [fiole7, setFiole7] = useState(false);
  const [hovered7, setHovered7] = useState(false);
  const [fiole8, setFiole8] = useState(false);
  const [hovered8, setHovered8] = useState(false);
  const [fiole9, setFiole9] = useState(false);
  const [hovered9, setHovered9] = useState(false);
  const [fiole10, setFiole10] = useState(false);
  const [hovered10, setHovered10] = useState(false);
  const [fiole11, setFiole11] = useState(false);
  const [hovered11, setHovered11] = useState(false);
  const [fiole12, setFiole12] = useState(false);
  const [hovered12, setHovered12] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [indice1, setIndice1] = useState(false);
  const [hoveredIndice1, setHoveredIndice1] = useState(false);
  const [popUpIndice1, setPopUpIndice1] = useState(false);
  const [indice2, setIndice2] = useState(false);
  const [hoveredIndice2, setHoveredIndice2] = useState(false);
  const [popUpIndice2, setPopUpIndice2] = useState(false);
  const [indice3, setIndice3] = useState(false);
  const [hoveredIndice3, setHoveredIndice3] = useState(false);
  const [popUpIndice3, setPopUpIndice3] = useState(false);
  const {socket } = useSocket();



    const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  };

  // Style du conteneur relatif pour positionner le rectangle
  const imageContainerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };
  
  const rectStyle1: React.CSSProperties = {
    position: "absolute",
    left: "167px", 
    top: "175px", 
    width: "34px",
    height: "200px",
    border: fiole1 ? "1px solid #22c55e" : "1px solid #fff",
    background: fiole1 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
    borderRadius: "12px",
    cursor: "pointer",
    zIndex: 2,
    transition: "all 0.2s",
    opacity: hovered1 || fiole1 ? 1 : 0,
    pointerEvents: "auto",
  };

    const rectStyle2: React.CSSProperties = {
        position: "absolute",
        left: "203px", 
        top: "175px", 
        width: "34px",
        height: "200px",
        border: fiole2 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole2 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered2 || fiole2 ? 1 : 0,
        pointerEvents: "auto",
    };
    
    const rectStyle3: React.CSSProperties = {
        position: "absolute",
        left: "239px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole3 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole3 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered3 || fiole3 ? 1 : 0,
        pointerEvents: "auto",
    };
    
    const rectStyle4: React.CSSProperties = {
        position: "absolute",
        left: "273px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole4 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole4 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered4 || fiole4 ? 1 : 0,
        pointerEvents: "auto",
    };

    const rectStyle5: React.CSSProperties = {
        position: "absolute",
        left: "307px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole5 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole5 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered5 || fiole5 ? 1 : 0,
        pointerEvents: "auto",
    };

    const rectStyle6: React.CSSProperties = {
        position: "absolute",
        left: "343px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole6 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole6 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered6 || fiole6 ? 1 : 0,
        pointerEvents: "auto",
    };

    const rectStyle7: React.CSSProperties = {
        position: "absolute",
        left: "378px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole7 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole7 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered7 || fiole7 ? 1 : 0,
        pointerEvents: "auto",
    };

    const rectStyle8: React.CSSProperties = {
        position: "absolute",
        left: "412px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole8 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole8 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered8 || fiole8 ? 1 : 0,
        pointerEvents: "auto",
    };

    const rectStyle9: React.CSSProperties = {
        position: "absolute",
        left: "447px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole9 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole9 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered9 || fiole9 ? 1 : 0,
        pointerEvents: "auto",
    };

    const rectStyle10: React.CSSProperties = {
        position: "absolute",
        left: "480px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole10 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole10 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered10 || fiole10 ? 1 : 0,
        pointerEvents: "auto",
    };

    const rectStyle11: React.CSSProperties = {
        position: "absolute",
        left: "513px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole11 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole11 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered11 || fiole11 ? 1 : 0,
        pointerEvents: "auto",
    };

    const rectStyle12: React.CSSProperties = {
        position: "absolute",
        left: "550px",
        top: "175px",
        width: "34px",
        height: "200px",
        border: fiole12 ? "1px solid #22c55e" : "1px solid #fff",
        background: fiole12 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        opacity: hovered12 || fiole12 ? 1 : 0,
        pointerEvents: "auto",
    };

    const indiceStyle1: React.CSSProperties = {
        position: "absolute",
        left: "625px",
        top: "100px",
        width: "85px",
        height: "200px",
        border: "1px solid #fff",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        transitionDelay: hoveredIndice1 ? "0.5s" : "0s",
        opacity: hoveredIndice1 || indice1 ? 1 : 0,
    };

    const indiceStyle2: React.CSSProperties = {
        position: "absolute",
        left: "710px",
        top: "100px",
        width: "62px",
        height: "200px",
        border: "1px solid #fff",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        transitionDelay: hoveredIndice2 ? "0.5s" : "0s",
        opacity: hoveredIndice2 || indice2 ? 1 : 0,
    };

    const indiceStyle3: React.CSSProperties = {
        position: "absolute",
        left: "22px",
        top: "310px",
        width: "60px",
        height: "30px",
        border: "1px solid #fff",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "12px",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 0.2s",
        transitionDelay: hoveredIndice3 ? "0.5s" : "0s",
        opacity: hoveredIndice3 || indice3 ? 1 : 0

    };



  React.useEffect(() => {
    setValidationMsg("");
  }, [fiole1, fiole11, fiole3]);

  return (
    <div style={modalStyle}>
      <div style={imageContainerStyle}>
          <img
              src="/images/Fiole.png"
              alt="Fiole"
              style={{ maxWidth: "80vw", maxHeight: "60vh", borderRadius: "10px" }}
          />
          <div
              style={rectStyle1}
              onClick={() => setFiole1((prev) => !prev)}
              onMouseEnter={() => setHovered1(true)}
              onMouseLeave={() => setHovered1(false)}
          />
          <div
              style={rectStyle2}
              onClick={() => setFiole2((prev) => !prev)}
              onMouseEnter={() => setHovered2(true)}
              onMouseLeave={() => setHovered2(false)}
          />
          <div
              style={rectStyle3}
              onClick={() => setFiole3((prev) => !prev)}
              onMouseEnter={() => setHovered3(true)}
              onMouseLeave={() => setHovered3(false)}
          />
          <div
              style={rectStyle4}
              onClick={() => setFiole4((prev) => !prev)}
              onMouseEnter={() => setHovered4(true)}
              onMouseLeave={() => setHovered4(false)}
          />
          <div
              style={rectStyle5}
              onClick={() => setFiole5((prev) => !prev)}
              onMouseEnter={() => setHovered5(true)}
              onMouseLeave={() => setHovered5(false)}
          />
          <div
              style={rectStyle6}
              onClick={() => setFiole6((prev) => !prev)}
              onMouseEnter={() => setHovered6(true)}
              onMouseLeave={() => setHovered6(false)}
          />
          <div
              style={rectStyle7}
              onClick={() => setFiole7((prev) => !prev)}
              onMouseEnter={() => setHovered7(true)}
              onMouseLeave={() => setHovered7(false)}
          />
          <div
              style={rectStyle8}
              onClick={() => setFiole8((prev) => !prev)}
              onMouseEnter={() => setHovered8(true)}
              onMouseLeave={() => setHovered8(false)}
          />
          <div
              style={rectStyle9}
              onClick={() => setFiole9((prev) => !prev)}
              onMouseEnter={() => setHovered9(true)}
              onMouseLeave={() => setHovered9(false)}
          />
          <div
              style={rectStyle10}
              onClick={() => setFiole10((prev) => !prev)}
              onMouseEnter={() => setHovered10(true)}
              onMouseLeave={() => setHovered10(false)}
          />
          <div
              style={rectStyle11}
              onClick={() => setFiole11((prev) => !prev)}
              onMouseEnter={() => setHovered11(true)}
              onMouseLeave={() => setHovered11(false)}
          />
          <div
              style={rectStyle12}
              onClick={() => setFiole12((prev) => !prev)}
              onMouseEnter={() => setHovered12(true)}
              onMouseLeave={() => setHovered12(false)}
          />
          <div
              style={indiceStyle1}
              onClick={() => setPopUpIndice1(true)}
              onMouseEnter={() => setHoveredIndice1(true)}
              onMouseLeave={() => setHoveredIndice1(false)}
          />
          <div
            style={indiceStyle2}
            onClick={() => setPopUpIndice2(true)}
            onMouseEnter={() => setHoveredIndice2(true)}
            onMouseLeave={() => setHoveredIndice2(false)}
          />
          <div
            style={indiceStyle3}
            onClick={() => setPopUpIndice3(true)}
            onMouseEnter={() => setHoveredIndice3(true)}
            onMouseLeave={() => setHoveredIndice3(false)}
          />

      </div>
        <div
            style={{ display: "flex", justifyContent: "space-between", width: "300px", marginTop: "20px" }}
        >
            <button
                onClick={onClose}
                style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1.2rem", borderRadius: "8px", background: "#fff", border: "none", cursor: "pointer", color: "black"}}
            >
                Retour
            </button>
            <button
                onClick={() => {
                    if (
                        fiole1 && fiole3 && fiole11 &&
                        !fiole2 && !fiole4 && !fiole5 && !fiole6 &&
                        !fiole7 && !fiole8 && !fiole9 && !fiole10 && !fiole12
                    ) {
                        setValidationMsg("Vous avez récupéré une fiole pour faire fondre le casier !");
                        if (socket) {
                            socket.emit("addToInventory", "Code fiole [5]");
                        }
                    } else {
                        setValidationMsg("Ce n'est pas la bonne formule");
                    }
                }}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "1.2rem",
                    borderRadius: "8px",
                    background: "#fff",
                    border: "none",
                    cursor: "pointer",
                    color: "black"
                }}
            >
                Valider
            </button>

        </div>
        {validationMsg && (
          <div style={{ marginTop: "20px", fontSize: "1.2rem", color: validationMsg === "Vous avez récupéré une fiole pour faire fondre le casier !" ? "#22c55e" : "#ef4444", fontWeight: "bold" }}>
            {validationMsg}
          </div>
        )}
        {popUpIndice1 && (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20
            }}>
                <div>
                    <img src="/images/IndiceEnigmeFioles/IndiceFiole1.png" style={{ maxWidth: "400px", marginBottom: "20px" }} />
                    <button
                        onClick={() => setPopUpIndice1(false)}
                        style={{ padding: "10px 20px", borderRadius: 8, cursor: "pointer", color: "black", backgroundColor: "#fff", border: "none", display: "flex", margin: "0 auto" }}
                    >
                        Retour
                    </button>
                </div>
            </div>
        )}
        {popUpIndice2 && (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20
            }}>
                <div>
                    <img src="/images/IndiceEnigmeFioles/IndiceFiole2.png" style={{ maxWidth: "400px", marginBottom: "20px" }} />
                    <button
                        onClick={() => setPopUpIndice2(false)}
                        style={{ padding: "10px 20px", borderRadius: 8, cursor: "pointer", color: "black", backgroundColor: "#fff", border: "none", display: "flex", margin: "0 auto" }}
                    >
                        Retour
                    </button>
                </div>
            </div>
        )}
        {popUpIndice3 && (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20
            }}>
                <div>
                    <img src="/images/IndiceEnigmeFioles/IndiceFiole3.png" style={{ maxWidth: "400px", marginBottom: "20px" }} />
                    <button
                        onClick={() => setPopUpIndice3(false)}
                        style={{ padding: "10px 20px", borderRadius: 8, cursor: "pointer", color: "black", backgroundColor: "#fff", border: "none", display: "flex", margin: "0 auto" }}
                    >
                        Retour
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

