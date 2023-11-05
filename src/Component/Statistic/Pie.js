import CanvasJSReact from './canvasjs.react';
// import './canvas.scss';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var React = require('react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Pie = (props) => {
	const { title, statisticData } = props;
	const options = {
		title: {
			text: title
		},
		data: [{
			type: "pie",
			dataPoints: statisticData.map((item) => {
				return { label: item?.ans, y: item?.sum }
			})
		}],
		height: '300'
	}

	return (<>
		<div>
			<CanvasJSChart options={options} style="margin-right:160px;margin-top:5px"
				className="main-canvas" id="dd"
			/>
		</div>
	</>)
}
export default Pie;