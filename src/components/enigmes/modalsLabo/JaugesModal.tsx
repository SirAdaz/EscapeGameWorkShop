import { useGameState } from "@/hooks/useGameState"
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function JaugesModal() {

    const {socket} = useSocket()

    const {codeEquationRu,codeEquationS,codeEquationU, jaugesResolues, setJaugesResolues} = useGameState()

    useEffect(() => {
        if (jaugesResolues) {
            setValeurRu(codeEquationRu)
            setValeurS(codeEquationS)
            setValeurU(codeEquationU)
        }
    })

    const [valeurRu, setValeurRu] = useState<number>(0);
    const [valeurS, setValeurS] = useState<number>(0);
    const [valeurU, setValeurU] = useState<number>(0);

    function handleRUChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = +e.target.value;
        setValeurRu(newValue)
    }

    function handleSChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = +e.target.value;
        setValeurS(newValue)
    }

    function handleUChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = +e.target.value;
        setValeurU(newValue)
    }

    function handleSubmit() {
        if (codeEquationRu == valeurRu && codeEquationS == valeurS && codeEquationU == valeurU) {
            setJaugesResolues(true)
            console.log(jaugesResolues)
            if (socket) socket.emit("setJaugesResolues",true)
            if (socket) socket.emit("addToInventory", "Code du laboratoire [6]")
        }
    }


    return (
        <div id="panneauJauges" className="w-full h-120 bg-cyan-800 gap-4 flex p-4 rounded-lg flex flex-col">
            <div className="w-full h-full flex flex-row gap-4">
                <div className="jaugePanel w-1/3">
                    <div className="w-full bg-gray-800 text-gray-100 text-center rounded-t-full">Ru</div>
                    <div className="jauge border h-5/6">
                        {
                            [...Array(10).keys()].map(i => (
                                <div key={i} className={clsx("fuelcell", {'bg-gray-400':i>valeurRu})}></div>
                            ))
                        }
                    </div>
                    <div className="w-full h-40 max-w-xs">
                        <input type="range" min={0} max="10" value={valeurRu} className="range bg-gray-800 rounded-b-full" step="1" onChange={handleRUChange}/>
                        <div className="flex text-gray-400 justify-between px-2.5 mt-2 text-xs">
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </div>
                    </div>
                </div>
                <div className="jaugePanel w-1/3">
                    <div className="w-full bg-gray-800 text-gray-100 text-center rounded-t-full">S</div>
                    <div className="jauge border h-5/6">
                        {
                            [...Array(10).keys()].map(i => (
                                <div key={i} className={clsx("fuelcell", {'bg-yellow-400':i>valeurS})}></div>
                            ))
                        }
                    </div>
                    <div className="w-full max-w-xs">
                        <input type="range" min={0} max="10" value={valeurS} className="range bg-gray-800 rounded-b-full" step="1" onChange={handleSChange}/>
                        <div className="flex text-yellow-400 justify-between px-2.5 mt-2 text-xs">
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </div>
                    </div>
                </div>

                <div className="jaugePanel w-1/3">
                    <div className="w-full bg-gray-800 text-gray-100 text-center rounded-t-full">U</div>
                    <div className="jauge border h-5/6">
                        {
                            [...Array(10).keys()].map(i => (
                                <div key={i} className={clsx("fuelcell", {'bg-green-400':i>valeurU})}></div>
                            ))
                        }
                    </div>
                    <div className="w-full h-5/6 max-w-xs">
                        <input type="range" min={0} max="10" value={valeurU} className="range bg-gray-800 rounded-b-full" step="1" onChange={handleUChange}/>
                        <div className="flex text-green-400 justify-between px-2.5 mt-2 text-xs">
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </div>
                    </div>
                </div>
            </div>

            {
                jaugesResolues
                ?
                <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>La porte à été dévérouillée !</span>
                </div>
                :
                <button className="btn btn-success" disabled={jaugesResolues} onClick={handleSubmit}>VALIDER</button>
            }
        </div>
    )
}