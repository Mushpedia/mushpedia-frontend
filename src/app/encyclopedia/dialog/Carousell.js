import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
            },
        },
    };

    const slidersVariants = {
        hover: {
            scale: 1.2,
            backgroundColor: "#ff00008e",
        },
    };

    const dotsVariants = {
        initial: {
            y: 0,
        },
        animate: {
            y: -10,
            scale: 1.2,
            transition: { type: "spring", stiffness: 1000, damping: "10" },
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setDirection("left");

        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    return (
        <div className="carousel px-4 py-2">
            <div className="relative rounded-lg h-[400px] w-max-[600px] overflow-hidden">
                <AnimatePresence>
                    <motion.img
                        className="w-[99%] h-[99%] rounded-lg"
                        key={currentIndex}
                        src={images[currentIndex]}
                        initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                        animate="visible"
                        exit="exit"
                        variants={slideVariants}
                    />
                </AnimatePresence>
                <div className="flex justify-between">
                    <motion.div
                        variants={slidersVariants}
                        whileHover="hover"
                        className="bg-custom_orange text-white p-2 pr-6 m-auto rounded-lg absolute top-0 bottom-0 h-10 w-6 left-2"
                        onClick={handlePrevious}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 96 960 960"
                            width="20"
                        >
                            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                        </svg>
                    </motion.div>
                    <motion.div
                        variants={slidersVariants}
                        whileHover="hover"
                        className="bg-custom_orange text-white p-2 pr-6 m-auto rounded-lg absolute top-0 bottom-0 h-10 w-6 right-2"
                        onClick={handleNext}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 96 960 960"
                            width="20"
                            style={{}}
                        >
                            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                        </svg>
                    </motion.div>
                </div>
            </div>
            <div className="mt-5 flex justify-center gap-5">
                {images.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`bg-[#333] w-4 h-4 rounded-lg ${currentIndex === index ? "bg-[#fa2020]" : ""}`}
                        onClick={() => handleDotClick(index)}
                        initial="initial"
                        animate={currentIndex === index ? "animate" : ""}
                        whileHover="hover"
                        variants={dotsVariants}
                    ></motion.div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;