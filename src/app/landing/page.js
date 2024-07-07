'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import NavigationButtons from './navigationButtons';
import HeroText from './heroText';

export default function LandingPage() {
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

    return (
        <motion.div
            layout
            className={`h-[120vh] w-[100vw] bg-cover z-10`}
            style={{
                backgroundImage: `url(${'/img/mushrooms.jpg'})`,
                scale: scale,
            }}
        >
            <NavigationButtons />
            <HeroText />
        </motion.div>
    );
}