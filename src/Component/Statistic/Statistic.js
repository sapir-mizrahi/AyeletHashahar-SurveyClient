import Column from "./Column";
import Pie from "./Pie";
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { actions } from '../../Redux/actions';
import { useEffect } from "react";
import './style.css';
import { useState } from "react";
import { FcComboChart } from 'react-icons/fc';

function mapStateToProps(state) {
    return {
        // allUsers: state.usersReducer.allUsers,
        // allPackagesByUser: state.packagesByUserReducer.allPackagesByUser,
        // allPackages: state.packagesReducer.packages
    }
}
const mapDispatchToProps = (dispatch) => ({
    getSurveysByUserCreated: (userId) => dispatch(actions.getSurveysByUserCreated(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Statistic(props) {
    let usersAge = { "age10": 5, "age20": 5, "age30": 5, "age40": 5, "age50": 5, "age60": 5 }
    const { getSurveysByUserCreated } = props;
    const [usersAgesStatistic, setUsersAgesStatistic] = useState({});
    const [statistic, setStatistic] = useState();
    const [allSurveyByUser, setAllSurveyByUser] = useState();
    const [currentSurveyStatistic, setCurrentSurveyStatistic] = useState();
    const [currentTable, setCurrentTable] = useState([]);

    useEffect(() => {
        getStatistic();

    }, []);
    const getStatistic = async () => {
        await getSurveysByUserCreated(JSON.parse(localStorage.getItem('userDetails'))?._id)
            .then((res) => {
                let pp = res.filter((ele, ind) => ind === res.findIndex(elem => elem.surveyId === ele.surveyId))
                setAllSurveyByUser(pp)
                setStatistic(res)

            })
    }

    const getSurveyStatistic = (surveyId) => {
        const arr = statistic?.filter(x => x?.surveyId === surveyId)
        let statisticData = [];
        let arrData = [];
        for (let index = 0; index < arr?.length; index++) {
            for (let j = 0; j < arr[index].answers.length; j++) {
                if (arr[index].answers[j]?.answerType === "multi" || arr[index].answers[j]?.answerType === 'single') {
                    for (let k = 0; k < arr[index].answers[j]?.answers.length; k++) {
                        statisticData.push({ ans: arr[index].answers[j]?.answers[k], sum: 0 })
                    }
                    if (arr[index].answers[j]?.answerType === "multi") {
                        for (let k = 0; k < arr[index].answers[j]?.ans.length; k++) {
                            const b = arr[index].answers[j]?.ans[k]
                            for (let x = 0; x < statisticData.length; x++) {
                                if (statisticData[x].ans === b) {
                                    statisticData[x].sum++
                                }

                            }
                        }
                    }
                    else {
                        const b = arr[index].answers[j]?.ans
                        for (let x = 0; x < statisticData.length; x++) {
                            if (statisticData[x].ans === b) {
                                statisticData[x].sum++
                            }

                        }
                    }

                    if (index === 0) {
                        arrData.push({ question: arr[index].answers[j]?.question, statisticData })
                    }
                    else {
                        for (let i = 0; i < arrData.length; i++) {
                            for (let z = 0; z < arrData[i].statisticData.length; z++) {
                                const element = arrData[i].statisticData[z];
                                for (let y = 0; y < statisticData.length; y++) {
                                    if (element.ans === statisticData[y].ans) {
                                        arrData[i].statisticData[z].sum = arrData[i].statisticData[z].sum + statisticData[y]?.sum
                                    }

                                }
                            }
                        }
                    }
                    statisticData = []
                }
                else {
                    if (arr[index].answers[j]?.answerType === "rating") {
                        const min = parseInt(arr[index].answers[j]?.ratingMin);
                        const max = parseInt(arr[index].answers[j]?.ratingMax);

                        for (let v = min; v <= max; v++) {
                            statisticData.push({ ans: v, sum: 0 })
                        }

                        const b = arr[index].answers[j]?.ans
                        for (let x = 0; x < statisticData.length; x++) {
                            if (statisticData[x].ans === b) {
                                statisticData[x].sum++
                            }
                        }
                        if (index === 0) {
                            arrData.push({ question: arr[index].answers[j]?.question, statisticData })
                        }
                        else {
                            for (let i = 0; i < arrData.length; i++) {
                                for (let z = 0; z < arrData[i].statisticData.length; z++) {
                                    const element = arrData[i].statisticData[z];
                                    for (let y = 0; y < statisticData.length; y++) {
                                        if (element.ans === statisticData[y].ans) {
                                            arrData[i].statisticData[z].sum = arrData[i].statisticData[z].sum + statisticData[y]?.sum
                                        }

                                    }
                                }
                            }
                        }
                        statisticData = []

                    }

                }

            }
        }
        setCurrentSurveyStatistic(arrData)
        let helpArr = []
        let ans;
        let q;
        let table = [];
        arr?.map((item, i) => {
            item?.answers?.map((x) => {
                if (x?.answerType === 'normal') {
                    debugger
                    ans = x?.ans
                    q = x?.question
                }
            })
            if (i === 0) {
                table.push({ question: q, answers: [ans] })
            }
            else {
                for (let index = 0; index < table.length; index++) {
                    if (table[index].question === q) {
                        table[index].answers.push(ans)
                    }
                }
            }

        })
        setCurrentTable(table)
    }
    console.log("currentSurveyStatistic", currentSurveyStatistic);
    console.log("currentTable", currentTable);
    return (
        <div className="statistic-main">
            <div className="div-all-survey-statistic">
                Your Surveys:
                {allSurveyByUser?.map((item) =>
                    <div onClick={() => getSurveyStatistic(item?.surveyId)} className="item-survey-statistic">
                        {item?.title}
                    </div>
                )}
            </div>
            {currentSurveyStatistic?.length > 0 ?
                <div className="generalContainer">
                    {currentSurveyStatistic?.title}
                    <br />
                    <br />
                    {currentSurveyStatistic?.map((item, index) =>
                        index % 2 === 0 ?
                            <Column title={item?.question} statisticData={item?.statisticData} />
                            : <Pie title={item?.question} statisticData={item?.statisticData} />
                    )}
                    <br />
                    <br />
                    {currentTable?.map((item) => {
                        return <div className="div-vv">{item?.question}
                            {item?.answers?.map((x) => {
                                return <div className="div-xx">{x}</div>
                            })}</div>
                    }
                    )}
                </div>
                : <div className="message-cl"><FcComboChart  className="ComboChart"/><br />Click survey to view statistics...</div>}
        </div>);
}
)