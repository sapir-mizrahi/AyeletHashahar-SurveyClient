// #2:
import React from "react";
//npm i canvasjs-react-charts
import { CanvasJSChart } from 'canvasjs-react-charts'
const Column = (props) => {
  const { title, statisticData } = props;
  const options = {
    title: {
      text: title
    },
    data: [{
      type: "column",
      dataPoints: statisticData.map((item) => {
        return { label: item?.ans, y: item?.sum }
      })
    }],
    height: '300'
  }
  return (
    <div style={{ margin: "auto", width: "400px" }}>
      <CanvasJSChart options={options}
      />
    </div>
  );
}
export default Column;
