import React from 'react'
import { firstRibbon, secondRibbon, thirdRibbon } from '../assets'

const PlaceMedal = (i, img) => {

    return (
        <div className="relative">
            <img
                src={img}
                alt="Avatar"
                className="w-40 h-40 rounded-full sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72"
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gold text-white py-1 px-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <img src={firstRibbon} />
            </div>
        </div>
    )
}

export default PlaceMedal