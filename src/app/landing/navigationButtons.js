import { motion } from "framer-motion";
import Link from 'next/link';

export default function NavigationButtons() {

    const button = ({ text, url, side }) => (
        <Link href={url}>
            <motion.button
                layout
                className="font-PT_Serif font-normal uppercase text-custom_orange text-2xl "
                initial={{ x: side === "left" ? -200 : 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    duration: 1.0,
                    delay: 1.0,
                }}
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
            >
                {text}
            </motion.button>
        </Link >
    );

    return (
        <div className="flex flex-row justify-between w-[98vw] pt-1 pl-2 lg:pl-6">
            {button({ text: "Go to Game", url: '/game', side: "left" })}
            {button({ text: "Encyclopedia", url: '#encyclopedia', side: "right" })}
        </div>
    );
}
