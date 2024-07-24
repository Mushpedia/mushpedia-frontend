'use client'

import { motion } from "framer-motion"
import useWindowSize from "../hooks/useWindowSize";
import Image from "next/image";

export default function HeroText() {
    const { width } = useWindowSize();

    const elements = [
        {
            key: 'logo',
            content: (width >= 640) &&
                <Image src='/logo/mushroom_orange.png' alt="logo" width={50} height={50} priority />
            , delay: 0.4
        },
        {
            key: 'text1',
            content: (
                <p className={`font-PT_Serif font-normal text-custom_orange ${(width < 640) ? " text-5xl" : "text-7xl"} `} >
                    <span className="block sm:inline">The </span>
                    <span className="block sm:inline">encyclopedia of</span>
                </p>
            ), delay: 0.6
        },
        {
            key: 'text2',
            content: (
                <h1 className={`font-Shrikhand text-custom_orange ${(width < 640) && "text-8xl"} md:text-[12vw] lg:text-[13vw] leading-none whitespace-normal`} >
                    <span className="block sm:inline">MUSH</span>
                    <span className="block sm:inline">ROOMS</span>
                </h1>
            ), delay: 0.8
        },
        {
            key: 'text3',
            content: <p className={`font-PT_Serif text-custom_orange ${(width < 640) ? " text-5xl" : "text-7xl"} `} >caro deorum</p>, delay: 0.5
        },
    ];

    return (
        <section className={`flex flex-col justify-center items-center text-center w-[100%] h-[80%] gap-8 sm:gap-2`}>
            {elements.map((element, index) => (
                <motion.div
                    key={element.key}
                    layout
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 1.0,
                        delay: index * 0.3,
                    }}
                >
                    {element.content}
                </motion.div>
            ))}
        </section>
    );
}
