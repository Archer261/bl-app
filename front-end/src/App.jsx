import { useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Login, Profile, Home, Signup, CreateChallenge, Challenge, Challenges } from './pages';
import { Header, Footer, Info, Topics, DatePickerModal } from './components';
import { Routes, Route } from 'react-router';
import { AuthContext, AuthProvider } from './utils/AuthContext';

const App = () => {

  // const { token, user, isAuthenticated } = useContext(AuthContext);
  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    <>
      <Header />
      <div className="flex flex-col items-center pt-12 px-4 max-h-full max-w-full bg-gradient-to-b from-red-300 to-white overflow-hidden h-full">

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/challenge/:id" element={<Challenge />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/create-challenge" element={<CreateChallenge />} />
          <Route path="/challenge" element={<Challenges />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App