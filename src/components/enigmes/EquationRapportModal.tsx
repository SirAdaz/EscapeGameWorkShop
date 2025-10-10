'use client'

import { useState } from "react"
import { arrowLeftIcon,arrowRightIcon } from "@/app/incons"

export default function EquationRapportModal() {

    const equations = [
        {
            title : "Eq528-Virus",
            content : "Expérience visant à reproduire un virus s'attaquant au réseau neuronal," +
                "inodore, incolore et indolore. Utilisable sous forme liqueide, " +
                "il peut également s'ingérer sous forme de gaz, " +
                "dans ce cas la dose léthale nécessaire se vera augmentée. ",
            molecules : ["Carbone","Azote","Or"],
            savefile : "exp46R.tar"
        },
        {
            title : "Eq751-Amalgam",
            content : "Expérience visant à reproduire un almagam lumineux afin d'éclairer des salle sans électricité," + 
            " de façon plus prolongé qu'un bâton lumineux. Expériences prouvent que le chlorure," +
            " bien qu'agissant comme un agent intensifiant, rendre l'exposition au produit dangereux pour l'humain. " + 
            "Symptômes : Irritation, brulures, migraine, vaumissement.",
            molecules : ["Nickel","Chlore","Neon"],
            savefile : "exp11D.tar"
        },
        {
            title : "Eq118-Alloy",
            content : "Expérience visant à établir un matériaux résistant au températures les plus froides. " + 
            "Il fait trop froid dans la salle pour aller étudier l'avancée du projet. Mise en pause de l'expérience pour une durée indéterminée.",
            molecules : ["Erbium","Mercure","Yttrium"],
            savefile : "exp18K.tar"
        },
        {
            title : "Eq292-Neutralisant",
            content : "Expérience visant à créer un agent neutralisant pour rendre inconscient et en incapacité des êtres vivant jusqu'a l'ingestion du remède." + 
            " Agent fonctionne sous forme liquide, besoin de test approffondis pour l'usage d'une forme gazeuse." + 
            " Cet agent pourrait mettre fin aux conflits armés !",
            molecules : ["Ruthénium","Souffre","Uranium"],
            savefile : "exp58M.tar"
        },
        {
            title : "Eq420-Penetrant",
            content : "Fausse expérience, encore une mauvaise blague de Lucas, faut vraiment lui en parler.",
            molecules : ["Helium","Azote","Tantale","Iode"],
            savefile : "exp03P.tar"
        },
    ]

    const [currentFile, setCurrentFile] = useState<number>(0)

    function handleFileChangeUp() {
        const tmp = currentFile + 1
        setCurrentFile(tmp % (equations.length))
    }

    function handleFileChangeDown() {
        let tmp:number;
        if (currentFile == 0) {
            tmp = equations.length - 1
        } else {
            tmp = currentFile - 1
        }
        setCurrentFile(tmp % (equations.length))
    }

    return (
        <div className="ficheRapport">
            <div id="header" className="w-full h-1/5 flex justify-center items-center">
                <h2 className="text-2xl font-bold p-4 border-2 rounded-lg">{equations[currentFile].title}</h2>
            </div>
            <div id="body" className="w-full h-3/5">
                <span className="horizontal"/>
                <div className="w-full flex gap-4 p-4 justify-center">
                    {
                    equations[currentFile].molecules.map((mol:string, i:number) => (
                        <span className="p-2 border-2 font-bold rounded-sm text-xs" key={i}>
                            {mol}
                        </span>
                    ))
                    }
                </div>
                <p className="px-4 text-justify">{equations[currentFile].content}</p>
            </div>
            <div id="footer" className="w-full h-1/5">
                <span className="horizontal"/>
                <h3 className="p-4">Fichier de sauvegarde : <span className="font-bold underline">{equations[currentFile].savefile}</span></h3>
            </div>
            <div>
                <button className="btn btn-info" onClick={handleFileChangeDown}>{arrowLeftIcon}</button>
                <button className="btn btn-info" onClick={handleFileChangeUp}>{arrowRightIcon}</button>
            </div>
        </div>
    )

}