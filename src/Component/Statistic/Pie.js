import CanvasJSReact from './canvasjs.react';
// import './canvas.scss';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var React = require('react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Pie = (props) => {
	const { numberOfUsers = 1, usersAge } = props;
	const options = {
		animationEnabled: true,
		exportFileName: "New Year Resolutions",
		exportEnabled: true,
		title: {
			text: "Users By Age"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			legendText: "{label}",
			toolTipContent: "{label}: <strong>{y}%</strong>",
			indexLabel: "{y}%",
			indexLabelPlacement: "inside",
			dataPoints: [
				{ y: parseInt(usersAge?.["age10"] / (numberOfUsers + 31) * 100), label: "Ages 0-10" },
				{ y: parseInt(usersAge?.["age20"] / (numberOfUsers + 31) * 100), label: "Age 10-20" },
				{ y: parseInt(usersAge?.["age30"] / (numberOfUsers + 31) * 100), label: "Age 20-30" },
				{ y: parseInt(usersAge?.["age40"] / (numberOfUsers + 31) * 100), label: "Age 30-40" },
				{ y: parseInt(usersAge?.["age50"] / (numberOfUsers + 31) * 100), label: "Age 40-50" },
				{ y: parseInt(usersAge?.["age60"] / (numberOfUsers + 31) * 100), label: "Age 50-60" }
			]
		}]
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