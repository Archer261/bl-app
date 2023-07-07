import { motion } from 'framer-motion';

const LeaderboardList = ({ participants }) => {

    // const leaderboardData = [
    //     { rank: 1, name: 'John', score: 100 },
    //     { rank: 2, name: 'Jane', score: 90 },
    //     { rank: 3, name: 'Mike', score: 80 },
    //     { rank: 4, name: 'Sarah', score: 70 },
    //     { rank: 5, name: 'Alex', score: 60 },
    // ];

    return (
        <div className="max-w-lg mx-auto">
            <ul className="divide-y divide-gray-200">
                <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="py-3 flex items-center w-full"
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
                        class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src={player.profileImage} alt={player.username} />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {player.firstName}
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {player.email}
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                                {player.score}
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default LeaderboardList;

