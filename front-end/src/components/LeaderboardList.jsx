import { useState } from 'react'
import { motion } from 'framer-motion';
import ParticipantModal from './ParticipantModal';
const LeaderboardList = ({ participants, challengeId, isOrganizer, onClose }) => {

    // const leaderboardData = [
    //     { rank: 1, name: 'John', score: 100 },
    //     { rank: 2, name: 'Jane', score: 90 },
    //     { rank: 3, name: 'Mike', score: 80 },
    //     { rank: 4, name: 'Sarah', score: 70 },
    //     { rank: 5, name: 'Alex', score: 60 },
    // ];

    const [participantEdit, setParticipantEdit] = useState({});
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = (e) => {
        const getParticipant = participants.find((p) => p._id === e.target.id);
        setParticipantEdit(getParticipant);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setParticipantEdit({});
    };

    if (!participants) {
        return (
            <div className="max-w-lg mx-auto">
                <ul className="divide-y divide-gray-200 flex items-center justify-center">
                    <motion.li
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="py-3 flex items-center w-full px-3"
                    >
                        <span className="ml-3 font-medium">No Data</span>
                    </motion.li>
                </ul>
            </div>

        )
    }

    return (
        <>
            {openEdit && (
                <ParticipantModal participant={participantEdit._id} challengeId={challengeId} onClose={handleCloseEdit} />
            )
            }
            <div className="max-w-lg mx-auto">
                <ul className="divide-y divide-gray-200">
                    <motion.li
                        key='noPlayers'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="py-3 flex items-center w-full px-3"
                    >
                        <span className="text-gray-500">Place</span>
                        <span className="ml-3 font-medium">Name</span>
                        <span className="ml-auto text-gray-500">% Change</span>
                    </motion.li>
                    {participants.map((player) => (
                        <motion.li
                            key={player.rank}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="pb-3 sm:pb-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src={player.user.profileImage} alt={player.user.username} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-red-800">
                                        {player.user.firstName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-800">
                                        {player.user.email}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">

                                </div>
                                {isOrganizer && (
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                                        <button
                                            id={player._id}
                                            className="inline-block rounded bg-blue-600 mx-1 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                                            onClick={handleOpenEdit}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )
                                }
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default LeaderboardList;

