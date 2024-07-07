import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { motion, useAnimation } from "framer-motion";
import useWindowSize from "@/app/hooks/useWindowSize";

export default function SearchInput({ searchbarState, handleSubmit, handleInputChange, }) {
    const { width } = useWindowSize
    const [mobile, setMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(mobile);

    useEffect(() => {
        if (width < 640) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, [width])


    const controlsDiv = useAnimation();
    const controlsInput = useAnimation();
    const { setViewSugg, query, viewSugg } = searchbarState;

    const onButtonClick = () => {
        if (mobile) {
            return;
        }

        if (isOpen) {
            controlsDiv.start({
                width: '',
                transition: { duration: 0.3 }
            });

            controlsInput.start({
                width: '0px',
                transition: { duration: 0.8 }
            });
        } else {
            controlsDiv.start({
                width: '91vw',
                transition: { duration: 0.3 }
            });

            controlsInput.start({
                width: '85vw',
                transition: { duration: 0.8 }
            });
        }

        setIsOpen(!isOpen);
        setViewSugg(!viewSugg);
    };

    return (
        <form onSubmit={handleSubmit} >
            <motion.div
                className="flex items-center border-2 h-10 p-4 rounded-full border-custom_orange"
                animate={controlsDiv}
                initial={{ width: isOpen ? '85vw' : '' }}
            >
                <motion.input
                    type="input"
                    value={query}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none placeholder-custom_orange placeholder-PT_Serif"
                    placeholder="Search..."
                    animate={controlsInput}
                    initial={{ width: isOpen ? '90vw' : '0vw' }}
                />

                <motion.button
                    className="p-2"
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                    }}
                    type="button"
                    onClick={onButtonClick}
                >
                    <IoIosSearch size={32} />
                </motion.button>
            </motion.div>
        </form>
    );
}