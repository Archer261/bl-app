import React from 'react';
import { motion } from 'framer-motion';
import { first, second, third, firstRibbon, secondRibbon, thirdRibbon } from '../assets';
import { PlaceMedal } from '../components'

const Top3 = ({ title, participants }) => {
    const imageVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const top3Records = participants.slice(0, 3);

    // const hasParticipants = () => {
    //     if (participants.size > 0) {
    //         return true
    //     } else {
    //         return false
    //     }

    // }


    if (participants.length > 0)
        return (

            <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:px-8 w-full md:w-4/5">
                    <motion.div
                        className="text-center max-w-full text-gray-900 font-extrabold text-lg"
                        variants={fadeInVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.2 }}
                    >
                        <h1>{title}</h1>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">

                        <div className="col-span-3 lg:col-span-4 lg:py-4">
                            <ul className="flex justify-center gap-4">
                                {top3Records.map((p, i) => (
                                    <>
                                        <li>
                                            <motion.div
                                                variants={imageVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                            >
                                                <div className="relative py-2 px-4">
                                                    <img
                                                        src={p.user.profileImage}
                                                        alt="Avatar"
                                                        className={
                                                            i === 0 ? "ring ring-primary w-8 h-auto rounded-full sm:w-16 sm:h-auto md:w-24 md:h-auto lg:w-32 lg:h-auto xl:w-40 xl:h-auto" :
                                                                i === 1 ? "ring ring-primary w-8 h-auto rounded-full sm:w-16 sm:h-auto md:w-24 md:h-auto lg:w-32 lg:h-auto xl:w-40 xl:h-auto" :
                                                                    "ring ring-primary w-8 h-auto rounded-full sm:w-16 sm:h-auto md:w-24 md:h-auto lg:w-32 lg:h-auto xl:w-40 xl:h-auto"
                                                        }
                                                    />
                                                    <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 bg-gold text-white py-1 px-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl w-48">
                                                        {i === 0 ? (<img src={firstRibbon} className='max-w-full h-auto' />) : i === 1 ? (<img src={secondRibbon} className='w-full' />) : (<img src={thirdRibbon} className='w-full' />)}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </li>
                                    </>
                                ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    else return (
        <section>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:px-8 w-full md:w-4/5">
                <motion.div
                    className="text-center max-w-full text-gray-900 font-extrabold text-lg"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.2 }}
                >
                    <h1>{title}</h1>
                </motion.div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">

                    <div className="col-span-3 lg:col-span-4 lg:py-4">
                        <ul className="flex justify-center gap-4">
                            <li>
                                <motion.div
                                    variants={imageVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <a href="#" className="block group">
                                        <img
                                            src={second}
                                            alt=""
                                            className="object-cover w-32 h-32 rounded aspect-square"
                                        />

                                        <div className="mt-3">
                                            <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                                                {/* Add content */}
                                            </h3>
                                        </div>
                                    </a>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div
                                    variants={imageVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <a href="#" className="block group">
                                        <img
                                            src={first}
                                            alt=""
                                            className="object-cover w-32 h-32 rounded aspect-square"
                                        />

                                        <div className="mt-3">
                                            <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                                                {/* Add content */}
                                            </h3>
                                        </div>
                                    </a>
                                </motion.div>
                            </li>

                            <li>
                                <motion.div
                                    variants={imageVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <a href="#" className="block group">
                                        <img
                                            src={third}
                                            alt=""
                                            className="object-cover w-32 h-32 rounded aspect-square"
                                        />

                                        <div className="mt-3">
                                            {/* Add content */}
                                        </div>
                                    </a>
                                </motion.div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )


};

export default Top3;
