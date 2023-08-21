import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import { WeighInForm, LeaderboardList, Top3, Sidebar, ResultsModal, ChallengeModal, WinnersPodiumModal } from '../components';
import CountdownTimer from '../components/CountdownTimer';
import PotCount from '../components/PotCount';
import CountUp from 'react-countup';

const Challenge = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [challengeData, setChallengeData] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false); // State to track whether the form is open
    const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
    const [modalResultsOpen, setModalResultsOpen] = useState(true);

    const winners = [{ name: 'Player A', percent: -6 }, { name: 'Player B', percent: -4 }, { name: 'Player C', percent: -1 }];

    const handleResultsOpenModal = () => {
        setModalResultsOpen(true);
    };

    const handleResultsCloseModal = () => {
        setModalResultsOpen(false);
    };

    useEffect(() => {
        const fetchChallengeData = async () => {
            try {
                const response = await axios.get(`/api/challenge/${id}`);
                setChallengeData(response.data);
                setParticipants(response.data.participants);

                checkOrganizer(response.data.organizer._id);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        const checkOrganizer = (organizerId) => {
            if (organizerId === user.id) {
                setIsOrganizer(true);
            } else {
                setIsOrganizer(false);
            }
        };

        fetchChallengeData();
    }, [id]);


    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const handleSaveChanges = (updatedChallenge) => {
        console.log(updatedChallenge);
        // Make API call to update the challenge on the backend, if needed.
    };

    if (loading) {
        return <span className="loading loading-spinner text-error"></span>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const sd = new Date(challengeData.startDate).getTime();
    const ed = new Date(challengeData.endDate).getTime();
    console.log(challengeData)
    return (
        <>
            <Sidebar
                challengeId={id}
                participants={participants}
                organizer={challengeData.organizer}
                isOrganizer={isOrganizer}
                setParticipants={setParticipants}
            />
            <div>
                {challengeData.prizePool > 0 && (
                    <>
                        <div className="grid gap-4 mb-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 justify-center items-center max-w-full">
                            <div
                                className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800"
                            >
                                <div className="p-4 flex items-center">
                                    <div
                                        className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4"
                                    >
                                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                            <path
                                                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-medium text-white dark:text-white">
                                            Participants
                                        </p>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            {challengeData.participants.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800"
                            >
                                <div className="p-4 flex items-center">
                                    <div
                                        className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4"
                                    >
                                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                            <path
                                                fill-rule="evenodd"
                                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-medium text-white dark:text-white">
                                            Prize Pool
                                        </p>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            $<CountUp end={challengeData.prizePool} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <CountdownTimer startDateTime={sd} endDateTime={ed} />
                        </div>
                    </>
                )}
                {JSON.parse(challengeData.withSize) ? (
                    <div className="grid grid-cols- gap-4 lg:grid-cols-2 lg:gap-8">
                        <div className="max-h-full rounded-lg">
                            <Top3
                                title="Top Weight Losers"
                                participants={participants.filter((p) => p.startingWeight && p.startingWeight !== null).sort((a, b) => a.weightPercentChange - b.weightPercentChange)}
                                isOrganizer={isOrganizer}
                                challengeId={id}
                                weight={true}
                            />
                            <LeaderboardList
                                participants={participants.filter((p) => p.startingWeight && p.startingWeight !== null).sort((a, b) => a.weightPercentChange - b.weightPercentChange)}
                                isOrganizer={isOrganizer}
                                challengeId={id}
                                weight={true}
                            />
                        </div>
                        <div className="max-h-full rounded-lg">
                            <Top3
                                title="Top Size Losers"
                                participants={participants.filter((p) => p.startingSize && p.startingSize !== null).sort((a, b) => a.sizePercentChange - b.sizePercentChange)}
                                isOrganizer={isOrganizer}
                                challengeId={id}
                                size={true}
                            />
                            <LeaderboardList
                                participants={participants.filter((p) => p.startingSize && p.startingSize !== null).sort((a, b) => a.sizePercentChange - b.sizePercentChange)}
                                isOrganizer={isOrganizer}
                                challengeId={id}
                                size={true}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <Top3 title="Top Weight Losers!" participants={participants} />
                        <div className="max-h-full max-w-full rounded-lg">
                            <LeaderboardList />
                        </div>
                    </>
                )}
            </div>
            {isOrganizer || user.isAdmin &&
                <>
                    {/* <button
                        onClick={openForm}
                        className="fixed top-20 right-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tools
                    </button> */}
                    <div className="fixed top-20 right-8 dropdown dropdown-end">
                        <label tabIndex={0} className="btn m-1">Tools</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li onClick={openForm}><a>New Weigh-In</a></li>
                            <li><a onClick={() => setIsChallengeModalOpen(true)}>Edit Challenge</a></li>
                            <li><a>Edit Participants</a></li>
                        </ul>
                    </div>


                    {isFormOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">

                            <WeighInForm participants={participants} onClose={closeForm} challengeId={id} />

                        </div>
                    )}

                    <ChallengeModal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} onSave={handleSaveChanges} />

                </>
            }
            {(challengeData.weighIns.length === challengeData.count) && (
                !modalResultsOpen && (
                    <div class="fixed bottom-4 left-11 flex items-center justify-center">
                        <button
                            onClick={handleResultsOpenModal}
                            className="animate-bounce bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Final Results
                        </button>
                    </div>
                )
            )
            }
            {modalResultsOpen && (
                <WinnersPodiumModal isOpen={modalResultsOpen} winnersOne={participants.filter((p) => p.startingWeight && p.startingWeight !== null).sort((a, b) => a.weightPercentChange - b.weightPercentChange)} onClose={handleResultsCloseModal} winnersTwo={participants.filter((p) => p.startingSize && p.startingSize !== null).sort((a, b) => a.sizePercentChange - b.sizePercentChange)} />
            )
            }
            {/* <ResultsModal data={participants} /> */}
            {/* {challengeData.weighIns.map((r, i) => (
                <button
                    key={i}
                    id={r._id}
                    type="button"
                    className="btn btn-success fixed bottom-8 right-8 md:top-40">
                    {`Week ${i + 1} Results`}
                </button>
            )
            )} */}

        </>
    );
};

export default Challenge;
