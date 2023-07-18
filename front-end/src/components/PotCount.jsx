import React from 'react';
import CountUp from 'react-countup';
import { pot } from '../assets';

const PotCount = (props) => {
    return (
        <div className='flex-1 flex-col items-center justify-center max-w-72 min-h-auto text-yellow-300 p-0'>
            <div className='relative'>
                <img src={pot} className='max-w-full min-w-full' alt='prize-pot' />
                <h1
                    className='absolute left-1/2 transform -translate-x-1/2 bottom-8 text-xl'
                    style={{ color: '#fff' }}
                >
                    $<CountUp end={props.prize} />
                </h1>
            </div>
        </div>
    );
};

export default PotCount;
