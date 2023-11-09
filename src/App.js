import React, { useState } from 'react'
import './App.css';
import SurveyForm from './Component/CreateSurvey';
import ViewSurvey from './Component/ViewSurvey';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import store from './Redux/store'
import { Provider } from "react-redux";
import SignIn from './Component/SignIn';
import SignUp from './Component/Signup';
import HomePage from './Component/HomePage';
import { AiOutlineLogout } from 'react-icons/ai';
import { FcBusinessman } from 'react-icons/fc';
import Statistic from './Component/Statistic/Statistic';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
  const setUserDetailsStorage = () => {
    localStorage.setItem('userDetails', null);
    setUserDetails(JSON.parse(localStorage.getItem('userDetails')))
  }

  return (
    <div className="App">
      <Provider store={store}>
        <div className='row header-app'>
          <div className='col-6 header-profile'>
            {userDetails !== null ? <><img src={userDetails?.imgUrl} className='img-profile' />
              <div>{userDetails?.firstName} {userDetails?.lastName} </div>
            </> : <div className='guest-head'>
              <FcBusinessman className='icon-guest' /> Hello Guest
            </div>}
            {userDetails !== null && <div className='logout' onClick={() => setUserDetailsStorage(null)}>Logout <AiOutlineLogout /></div>}

          </div>
          <Router>
            <nav className='col-6 nav-bar' >
              <ul className='ul-nav'>
                <li onClick={() => setCurrentPage(window.location.pathname)} className={currentPage === '/' && 'current-path-li'}>
                  <Link className={currentPage === '/' && 'current-path'} to="/">Home</Link>
                </li>
                {userDetails && <li onClick={() => setCurrentPage(window.location.pathname)} className={currentPage === '/create-survey' && 'current-path-li'}>
                  <Link className={currentPage === '/create-survey' && 'current-path'} to="/create-survey">Create Survey</Link>
                </li>}
                <li onClick={() => setCurrentPage(window.location.pathname)} className={currentPage === '/view' && 'current-path-li'}>
                  <Link className={currentPage === '/view' && 'current-path'} to="/view">Surveys</Link>
                </li>
                {!userDetails &&<li onClick={() => setCurrentPage(window.location.pathname)} className={currentPage === '/Signin' && 'current-path-li'}>
                  <Link className={currentPage === '/Signin' && 'current-path'} to="/Signin">Signin</Link>
                </li>}
                {!userDetails &&<li onClick={() => setCurrentPage(window.location.pathname)} className={currentPage === '/SignUp' && 'current-path-li'}>
                  <Link className={currentPage === '/SignUp' && 'current-path'} to="/SignUp">SignUp</Link>
                </li>}
                <li onClick={() => setCurrentPage(window.location.pathname)} className={currentPage === '/Statistic' && 'current-path-li'}>
                  <Link className={currentPage === '/Statistic' && 'current-path'} to="/Statistic">Statistic</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/create-survey" element={<SurveyForm />} />
              <Route path="/view" element={<ViewSurvey />} />
              <Route path="/Signin" element={<SignIn setUserDetails={setUserDetails} />} />
              <Route path="/SignUp" element={<SignUp setUserDetails={setUserDetails} />} />
              <Route path="/Statistic" element={<Statistic />} />
            </Routes>

          </Router>
        </div>
      </Provider>
    </div>
  );
}

export default App;
