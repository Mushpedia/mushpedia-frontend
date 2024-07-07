import { motion } from "framer-motion"
import Link from "next/link";
import { useEffect, useState } from "react";
import { MUSHROOM_PUNS } from "./constants";

export default function GameInfo({ runGame, found, startGame }) {
    const [rndIndex, setRndIndex] = useState(0);

    const message = (!runGame && !found) ? "Try to find the elusive green mushroom! It will change color only when you grab it."
        : found ? MUSHROOM_PUNS[rndIndex] : "";

    const buttonText = found ? "Play Again" : "Start Game";

    useEffect(() => {
        if (found) {
            let index = Math.floor(Math.random() * MUSHROOM_PUNS.length);
            setRndIndex(index);
        }
    }, [found])

    const button = (text, onClick) => (
        <motion.button
            className="font-PT_Serif font-normal text-custom_orange text-3xl"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
        >
            {text}
        </motion.button>
    );

    const elements = [
        {
            key: "message",
            content:
                <p className="font-PT_Serif font-normal text-custom_orange text-3xl mt-[25vh]">
                    {message}
                </p>
            , delay: 0.4
        },
        {
            key: "buttons",
            content: (!runGame || found) && (
                <div className="flex items-center gap-14 mt-4">
                    {button(<Link href="/">Encyclopedia</Link>, () => { })}
                    {button(buttonText, startGame)}
                </div>
            ), delay: 0.6
        }
    ];

    return (
        <div className="absolute z-50 w-screen h-2">
            {runGame && (
                <div className="absolute top-0 left-0 mt-4 ml-4">
                    {button(<Link href="/">Return</Link>, () => { })}
                </div>
            )}
            {elements.map((element, index) => (
                <motion.div
                    key={element.key}
                    className="w-[70%] mx-auto flex flex-col items-center"
                    layout
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 1.0,
                        delay: index * 0.4,
                    }}
                >
                    {element.content}
                </motion.div>
            ))}
        </div>
    );
}