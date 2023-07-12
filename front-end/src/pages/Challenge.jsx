import React, { useState, useEffect, useContext } from 'react'
import { LeaderboardList, Top3, Sidebar } from '../components'
import { useParams } from "react-router";
import { AuthContext } from '../utils/AuthContext';
import useAxios from "../utils/useAxios";
import CountdownTimer from '../components/CountdownTimer';
import axios from 'axios';
import PotCount from '../components/PotCount';

const Challenge = () => {

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [challengeData, setChallengeData] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOrganizer, setIsOrganizer] = useState(false)

    useEffect(() => {
        const fetchChallengeData = async () => {
            try {
                const response = await axios.get(`/api/challenge/${id}`);
                setChallengeData(response.data);
                setParticipants(response.data.participants);
                //fetchParticipants(response.data.participants)
                checkOrgainzer(response.data.organizer._id);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        const checkOrgainzer = (organizerId) => {

            if (organizerId === user.id) {
                setIsOrganizer(true);
            } else {
                setIsOrganizer(false);
            }
        }

        fetchChallengeData();

    }, [id]);

    if (loading) {
        return <span className="loading loading-spinner text-error"></span>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const sd = new Date(challengeData.startDate).getTime();
    const ed = new Date(challengeData.endDate).getTime();
    return (
        <>
            <Sidebar challengeId={id} participants={participants} organizer={challengeData.organizer} isOrganizer={isOrganizer} setParticipants={setParticipants} />
            <div>
                {challengeData.prizePool > 0 && (
                    <div className='w-96 flex justify-self-center px-4 lg:ml-80 min-h-40'>
                        <CountdownTimer startDateTime={sd} endDateTime={ed} />
                        <div className="divider divider-horizontal"></div>
                        <PotCount prize={challengeData.prizePool} />
                    </div>
                )
                }
                {JSON.parse(challengeData.withSize) ?
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                        <div className="max-h-full rounded-lg"><Top3 title={"Top Weight Losers"} participants={participants.filter((p) => { if (p.startingWeight && p.startingWeight !== null) { return p } })} isOrganizer={isOrganizer} challengeId={id} /><LeaderboardList participants={participants.filter((p) => { if (p.startingWeight && p.startingWeight !== null) { return p } })} isOrganizer={isOrganizer} challengeId={id} /></div>
                        <div className="max-h-full rounded-lg"><Top3 title={"Top Size Losers"} participants={participants.filter((p) => { if (p.startingSize && p.startingSize !== null) { return p } })} isOrganizer={isOrganizer} challengeId={id} /><LeaderboardList participants={participants.filter((p) => { if (p.startingSize && p.startingSize !== null) { return p } })} isOrganizer={isOrganizer} challengeId={id} /></div>
                    </div>
                    : <><Top3 title={"Top Weight Losers!"} participants={participants} /><div className="max-h-full max-w-full rounded-lg"><LeaderboardList /></div></>
                }
            </div>
        </>
    )
}

export default Challenge