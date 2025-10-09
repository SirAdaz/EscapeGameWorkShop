'use client'

import {useGameState} from "@/hooks/useGameState";
import clsx from "clsx";
import {useEffect, useState} from "react";

export default function DisjoncteurModal() {

    const [disjoncteur, setDisjoncteur] = useState([[false,false,false,false],[false,false,false,false]]);

    const {
        disjoncteurResolu,
        setDisjoncteurResolu
    } = useGameState()

        function checkValide(){
        const allOff = disjoncteur.every(ligne => ligne.every(cell => cell))
        if (allOff) setDisjoncteurResolu(true)
    }

    useEffect(() => {
        checkValide()
        if (disjoncteurResolu) {
            const inverse: Array<Array<boolean>> = [[true,true,true,true],[true,true,true,true]]
            setDisjoncteur(inverse)
        }
    },[disjoncteurResolu])

    function handleCelluleClick(ligne:number, col:number) {
        const changement:Array<Array<boolean>> = disjoncteur.map(row => [...row])
        // inverse la cellule au-dessus/en-dessous de la cliquée
        changement[(ligne+1)%2][col] = !changement[(ligne+1)%2][col]
        // inverse la cellule a droite si possible
        if (col < 3 ) { changement[ligne][col+1] = !changement[ligne][col+1] }
        // inverse la cellule a gauche si possible
        if (col > 1 ) { changement[ligne][col-1] = !changement[ligne][col-1] }

        setDisjoncteur(changement)

        checkValide()
    }

    function handleReset() {
        const reset = [[false,false,false,false],[false,false,false,false]]
        setDisjoncteur(reset)
        setDisjoncteurResolu(false)
    }

    return (
        <div>
            <div id ="breaker" className="w-full bg-gray-500 p-4 flex justify-center">
                <div id = "breakerGrid" className="flex-col w-5/6 gap-4">
                    {
                    disjoncteur.map((ligne,l) => (
                        <div className="flex w-5/6 h-60 justify-center gap-4 rounded-lg border-2 border-gray-400 items-center p-4" key={l}>
                            {ligne.map((_,c) => (
                                <div className={clsx("hover:cursor-pointer bg-gray-700 h-32 w-32 rounded-sm shade", {'bg-yellow-500' : disjoncteur[l][c]} )}
                                    key={c}
                                    onClick={() => handleCelluleClick(l, c)}>
                                    <p>{c}</p>
                                </div>
                            ))}
                        </div>
                    ))
                    }
                </div>    
                <div id = "statusLights" className="flex flex-col w-full h-full items-center justify-center gap-4">
                    <div id="offLight" className={clsx("shade2 w-20 h-20 rounded-full bg-gray-800", {'bg-red-500' : !disjoncteurResolu} )}></div>
                    <div id="onLight" className={clsx("shade2 w-20 h-20 rounded-full bg-gray-800", {'bg-green-500' : disjoncteurResolu} )}></div>
                    <button className="w-full text-black border p-1 rounded-md bg-red-300" onClick={handleReset}>Reinitialiser</button>
                </div>
            </div>
        </div>
    )
}