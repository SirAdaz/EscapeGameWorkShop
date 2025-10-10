'use client'

import { useSocket } from "@/hooks/useSocket"
import clsx from "clsx"
import { useState } from "react"

export default function ImprimanteModal() {

    const {socket} = useSocket()

    const [power, setPower] = useState<boolean>(false)
    const [code, setCode] = useState<string>("0000")
    const [canPrint, setCanPrint] = useState<boolean>(false)

    const codeFinal:string = "7431"

    function handlePowerCLick() {
        const tmp = true
        setPower(tmp)
    }

    function handleCodeInput(e: React.ChangeEvent<HTMLInputElement>) {
        const tmp = e.target.value
        setCode(tmp)
    }

    function handlePrint() {
        if (code == codeFinal) {
            const tmp = true
            setCanPrint(tmp)
            if (socket) socket.emit('addToInventory',"Code des archives [3]")
        }
    }

    return (
        <div id="imprimanteBoard" className="bg-gray-300 p-4 rounded-lg">
            <div className="w-full">
                <div className="flex p-2 bg-gray-400 rounded-full justify-between items-center">
                    <div id="powerLight" className={clsx("shade2 rounded-full bg-gray-800 h-20 w-20", {'bg-green-500' : power})}></div>
                    <input type="text" value={code} className="input rounded-full" onChange={handleCodeInput}/>
                </div>
                <div className="w-5/6 justify-around flex m-4 bg-gray-400 p-2 rounded-full">
                    <button onClick={handlePowerCLick} className={"btn btn-success"} disabled={power}>POWER</button>
                    <button disabled={!power} onClick={handlePrint} className={clsx("btn btn-info", {'bg-orange-200' : !power})}>RUN</button>
                </div>
            </div>
            <div id="paperExhaust" className={"w-full flex justify-center"}>
                <div id="PaperWithCode" className="w-60 h-60 bg-gray-100 flex justify-center items-center">
                    <span className={clsx("text-gray-100 font-bold text-2xl", {'text-gray-800' : canPrint})}>3</span>
                </div>
            </div>
        </div>
    )
}