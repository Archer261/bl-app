import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../assets/'

const Hero = ({ challenge }) => {
    return (
        <div>
            <section class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
                <div class="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div
                        class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
                    >
                        <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
                            {challenge.name}
                        </h2>

                        <p class="hidden text-gray-500 md:mt-4 md:block">
                            Start Date: {challenge.startDate}
                        </p>
                        <p class="hidden text-gray-500 md:mt-4 md:block">
                            End Date: {challenge.endDate}
                        </p>
                        <p class="hidden text-gray-500 md:mt-4 md:block">
                            {challenge.weekCount} Weeks
                        </p>

                        <div class="mt-4 md:mt-8">
                            <Link to={`/challenge/${challenge._id}`}><a
                                class="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                                Open
                            </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <img
                    alt="challenge"
                    src={logo}
                    class="h-auto object-cover sm:h-full max-w-lg"
                />
            </section>
        </div>
    )
}

export default Hero