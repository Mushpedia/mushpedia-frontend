import styles from './page.module.css'
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Carousell from './Carousell';

export default function DialogBody({ toggleDialog, data }) {
    const path = useRef(null);
    let progress = 0;
    let x = 0.5;
    let time = Math.PI / 2;
    let reqId = null;

    useEffect(() => {
        setPath(progress);
    });

    const setPath = (progress) => {
        const width = window.innerWidth * 0.7;
        path.current.setAttributeNS(null, "d", `M0 250 Q${width * x} ${250 + progress}, ${width} 250`)
    }

    const lerp = (x, y, a) => x * (1 - a) + y * a

    const manageMouseEnter = () => {
        if (reqId) {
            cancelAnimationFrame(reqId)
            resetAnimation()
        }
    }

    const manageMouseMove = (e) => {
        const { movementY, clientX } = e;
        const pathBound = path.current.getBoundingClientRect();
        x = (clientX - pathBound.left) / pathBound.width;
        progress += movementY
        setPath(progress);
    }

    const manageMouseLeave = () => {
        animateOut();
    }

    const animateOut = () => {
        const newProgress = progress * Math.sin(time);
        progress = lerp(progress, 0, 0.025);
        time += 0.2;
        setPath(newProgress);
        if (Math.abs(progress) > 0.75) {
            reqId = requestAnimationFrame(animateOut);
        }
        else {
            resetAnimation();
        }
    }

    const resetAnimation = () => {
        time = Math.PI / 2;
        progress = 0;
    }

    const description = ({ header, text }) => (
        <div className="sm:flex justify-end">
            <p className="text-custom_orange text-[18px] m-0 mt-2 sm:mt-3">{header}</p>
            <p className="text-[17px] mt-1 sm:mt-2.5 sm:w-[700px] ml-7 mb-2">{text}</p>
        </div>
    );

    return (
        <div className="h-[90vh] w-[85vw] bg-black text-white font-PT_Serif overflow-auto scrollbar scrollbar-thumb-custom_orange">
            <motion.button
                className='pl-4 pt-2 pb-0 text-xl'
                onTap={toggleDialog}
            >
                exit
            </motion.button>

            <div className="flex flex-col items-center bg-black text-white font-PT_Serif">
                <Carousell images={data.images} />
                <div className="flex flex-col lg:items-end w-[70vw] pb-2 pt-7">

                    <div className={styles.line}>
                        <div onMouseEnter={() => { manageMouseEnter() }} onMouseMove={(e) => { manageMouseMove(e) }} onMouseLeave={() => { manageMouseLeave() }} className={styles.box}></div>
                        <svg>
                            <path ref={path}></path>
                        </svg>
                    </div>

                    {data.characteristics &&
                        <div className="flex justify-end mt-5">
                            <p className="text-custom_orange text-[18px] m-0 pt-2.5">Characteristics</p>
                            <div className="flex flex-wrap gap-2.5 w-[700px] ml-7">
                                <p
                                    className="border border-white rounded-full uppercase text-[16px] p-2.5 px-3"
                                >
                                    {data.characteristics}
                                </p>
                            </div>
                        </div>
                    }

                    {description({ header: "Family", text: data.family })}
                    {description({ header: "Location", text: data.location })}
                    {description({ header: "Description", text: data.description.general })}
                    {description({ header: "Cap", text: data.description.cap })}
                    {description({ header: "Gills", text: data.description.gills })}
                    {description({ header: "Stem", text: data.description.stem })}
                    {description({ header: "Spore Print", text: data.description.spore_print })}
                </div>
            </div>
        </div>
    )
}