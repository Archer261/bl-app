import { useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Login, Profile, Home, Signup, CreateChallenge, Challenge, Challenges, CreateUser } from './pages';
import { Header, Footer, Info, Topics, DatePickerModal } from './components';
import { Routes, Route } from 'react-router';
import { AuthContext, AuthProvider } from './utils/AuthContext';
import './App.css';
const App = () => {

  return (
    <>
      <Header />
      <div className="flex flex-col items-center pt-12 px-4 pt-20 max-h-full h-full min-w-full bg-gradient-to-b from-red-300 to-white overflow-hidden">
        <AnimatePresence mode='wait'>
          <Routes>
            <Route path="/login" element={
              <motion.div
                key="login"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                }}
              >
                <Login />
              </motion.div>
            } />
            <Route path="/signup" element={
              <motion.div
                key="signup"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                }}
              >
                <Signup />
              </motion.div>
            } />
            <Route path="/" element={
              <motion.div
                key="home"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                }}
              >
                <Home />
              </motion.div>
            } />
            <Route path="/challenge/:id" element={
              <motion.div
                key="challenge"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                }}
              >
                <Challenge />
              </motion.div>
            } />
            <Route path="/users/:id" element={
              <motion.div
                key="profile"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                }}
              >
                <Profile />
              </motion.div>
            } />
            <Route path="/create-user" element={
              <motion.div
                key="create-user"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                }}
              >
                <CreateUser />
              </motion.div>
            } />
            <Route path="/create-challenge" element={
              <motion.div
                key="create-challenge"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                }}
              >
                <CreateChallenge />
              </motion.div>
            } />
            <Route path="/challenge" element={
              <motion.div
                key="challenges"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.3, // Adjust as needed
                    },
                  },
                }}
              >
                <Challenges />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
};

export default App;
