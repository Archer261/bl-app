import React from 'react'
import CountUp from 'react-countup';
import { pot } from '../assets';

const PotCount = (props) => {
    return (
        <div className='flex-1 relative flex-col items-center justify-center max-w-72 min-h-auto text-yellow-300 p-0'>
            <img src={pot} className='max-w-full min-w-full' alt="prize-pot" />
            <h1 className='absolute left-20 top-8 text-xl'>$<CountUp end={props.prize} /></h1>
        </div>
    )
}

export default PotCount