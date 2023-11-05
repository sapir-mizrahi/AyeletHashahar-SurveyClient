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
        debugger
        return { label: item?.ans, y: item?.sum }
      })
    }]
  }
  return (
    <div style={{ margin: "auto", width: "60vw" }}>
      <CanvasJSChart options={options}
      />
    </div>
  );
}
export default Column;
