import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, Footer, Info, Topics, DatePickerModal, Hero } from '../components';


const Home = () => {
    const [challengeData, setChallengeData] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChallengeData = async () => {
            try {
                const response = await axios.get(`/api/challenge`);
                console.log(response)
                const featuredChallenge = response.data.find(
                    (challenge) => challenge.isFeatured === true
                );
                if (featuredChallenge) {
                    setChallengeData(featuredChallenge);
                    setParticipants(featuredChallenge.participants);
                    setLoading(false);
                } else {
                    throw new Error('Featured challenge not found');
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchChallengeData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    console.log(challengeData);

    return (
        <>
            <Hero challenge={challengeData} />
            {/* <Info />
      <Topics /> */}
        </>
    );
};

export default Home;
