import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import DialogBody from '../dialog/dialogbody';
import Image from 'next/image';

export default function Card({ data }) {
    const body = useRef(null);
    const isInView = useInView(body, { once: true, margin: "55%" })

    const dialogRef = useRef(null);

    const animation = {
        initial: { opacity: 1, y: "100%" },
        enter: i => ({ opacity: 0, transition: { duration: 1.0, ease: [0.33, 1, 0.68, 1] } }, { y: "0", transition: { duration: 1.0, ease: [0.33, 1, 0.68, 1] } }),
    }

    function toggleDialog(event, info) {
        if (!dialogRef.current) {
            return
        }

        dialogRef.current.hasAttribute("open") ? dialogRef.current.close() : dialogRef.current.showModal()
    }

    return (
        <div ref={body}>
            <motion.div
                className='flex flex-col items-center justify-center w-full md:w-[25vw] lg:w-[15vw] p-4 sm:p-4 md:p-2 border-2 border-custom_orange rounded-md'
                custom={data._id}
                variants={animation}
                initial="initial"
                animate={isInView ? "enter" : ""}
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                onTap={toggleDialog}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
                <Image
                    src={data.images[0]}
                    width={250}
                    height={250}
                    className="pb-2" alt="Agaricus abruptibulbus"
                />
                <p className="font-PT_Serif font-semibold text-lg uppercase text-custom_orange leading-none pb-0 text-center">
                    {data.name} ({data.eng_name})
                </p>
            </motion.div>

            <dialog
                ref={dialogRef}
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        toggleDialog();
                    }
                }}
            >
                <DialogBody toggleDialog={toggleDialog} data={data} />
            </dialog>
        </div>

    )
}