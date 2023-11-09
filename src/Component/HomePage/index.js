import React, { useEffect } from 'react';
import './style.css';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions";
import startVideo from '../../image/videoSurvey.mp4';
import { useNavigate } from 'react-router';

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSurveys: () => dispatch(actions.getAllSurveys()),
    }
}
export default connect(null, mapDispatchToProps)(function HomePage(props) {
    const { getAllSurveys } = props;
    const navigate = useNavigate()
    const letStartFunc = () => {
        if (JSON.parse(localStorage.getItem('userDetails'))) {
            navigate('/create-survey')
        }
        else {
            navigate('/signIn')
        }
    }
    useEffect(() => {
        getSurveys();
    }, []);

    const getSurveys = async () => {
        await getAllSurveys;
    };
    return (
        <body className='home-page'>
            <video autoPlay preload={'auto'} width="90%" height="500">
                <source src={startVideo} type="video/mp4" />
            </video>
            <div className='div-btn'>
                <button className='btn-start' onClick={() => letStartFunc()}>Let's Start</button>
            </div>
        </body>
    );
});