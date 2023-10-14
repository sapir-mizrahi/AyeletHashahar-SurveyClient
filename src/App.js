import React from 'react'
import './App.css';
import SurveyForm from './Component/CreateSurvey';
import ViewSurvey from './Component/ViewSurvey';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import store from './Redux/store'
import { Provider } from "react-redux";


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={<SurveyForm />} />
            <Route path="/about" element={<ViewSurvey />} />
            <Route path="/contact" element={<ViewSurvey />} />

          </Routes>

        </Router>
      </Provider>
    </div>
  );
}

export default App;
