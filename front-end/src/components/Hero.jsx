import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../assets/';
import DateFormatted from '../utils/DateFormatted';

const Hero = ({ challenge }) => {

    return (
        <section className="overflow-hidden relative sm:grid sm:grid-cols-2 rounded-lg">
            <div className="p-8 md:p-12 lg:px-16 lg:py-24 relative z-10 flex flex-col justify-center">
                <div className="max-w-xl mx-auto text-center ltr:sm:text-left rtl:sm:text-right">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        {challenge.name}
                    </h2>

                    <div className="text-gray-800 font-semibold mt-4 md:block">

                        Participant(s): {challenge.participants.length}
                    </div>

                    <div className="text-gray-800 font-semibold mt-4 md:block">

                        <DateFormatted textValue={'Start Date: '} dateValue={challenge.startDate} />
                    </div>
                    <div className="text-gray-800 font-semibold mt-4 md:block">

                        <DateFormatted textValue={'End Date: '} dateValue={challenge.endDate} />
                    </div>
                    <p className="text-gray-800 font-semibold mt-4 md:block">
                        {challenge.weekCount} Weeks
                    </p>

                    <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-lg m-5">
                        <img
                            src={logo}
                            alt="Avatar"
                            className='w-28 h-28 p-1 bg-white rounded-full mx-auto mb-4'
                        />
                        <h5 className="title mt-11 ml-3 font-bold flex flex-col">Foundry</h5>
                        <p className="text-neutral-900 dark:text-neutral-500">Organizer</p>
                    </div>

                    <div className="mt-4 md:mt-8">
                        <Link to={`/challenge/${challenge._id}`}>
                            <button className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400">
                                Open
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-50"></div>
            <div className="flex justify-center items-center p-8">
                <img
                    alt="challenge"
                    src={logo}
                    className="h-auto object-contain sm:h-auto max-w-full max-h-96"
                />
            </div>
        </section>
    );
};

export default Hero;
