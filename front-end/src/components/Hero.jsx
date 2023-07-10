import React from 'react';
import { Link } from 'react-router-dom';
import { base, logo } from '../assets/';
import DateFormatted from '../utils/DateFormatted';

const Hero = ({ challenge }) => {

    return (
        <>
            <div className="mx-auto max-w-lg text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">Featured Challenge</h2>
                <p className="my-4">View the leaderboard!</p>
            </div>
            <div className="card lg:card-side bg-glass shadow-xl">
                <figure><img
                    src={base}
                    alt="Album"
                    className='px-2 h-auto w-96'
                /></figure>
                <div className="card-body">
                    <h2 className="card-title">{challenge.name}</h2>
                    <DateFormatted textValue={'Start Date: '} dateValue={challenge.startDate} />
                    <DateFormatted textValue={'End Date: '} dateValue={challenge.endDate} />
                    <p>{challenge.weekCount} Weeks</p>
                    <div className="card-actions justify-center">
                        <Link to={`/challenge/${challenge._id}`}><button className="btn btn-secondary">View</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
