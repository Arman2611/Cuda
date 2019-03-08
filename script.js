// Code for showing dynamic progress by canvases
// data about canvases
var data1 = {percent: 90,colour: "#30BAE7"};
var data2 = {percent: 75,colour: "#D74680"};
var data3 = {percent: 70,colour: "#15C7A8"};
var data4 = {percent: 85,colour: "#EB7D4B"};
var data = [data1,data2,data3,data4];

// This loop says "data must be between 0 and 100!"
for (var i = 0; i < data.length; i++) {
	if(data[i].percent<0) {
		data[i].percent=0;
	} else if (data[i].percent>100) {
		data[i].percent=100;
	}
}

var skills = document.getElementById("skills");
var clearingColor = window.getComputedStyle(skills).backgroundColor;
var canvasList = document.getElementById("canvas-list");
var canvases = document.getElementsByTagName("canvas");

function showProgress (canv,dat) {
	// Draw grey circle
	let paintGrey = canv.getContext("2d");
	paintGrey.strokeStyle = "#DFE8ED";
	paintGrey.lineWidth = 13;
	paintGrey.beginPath();
	paintGrey.arc(60,60,54,0,2*Math.PI);
	paintGrey.stroke();
	paintGrey.closePath();

	// Progress must start from 0
	var percent = 0;

	// Calling engine function
	function engine () {
		if (percent<=dat.percent && dat.percent>=0 && dat.percent<=100) {
				// Clear canvas text
			let clear = canv.getContext("2d");
			clear.strokeStyle = clearingColor;
			clear.lineWidth = 50;
			clear.beginPath()
			clear.moveTo(21,60);
			clear.lineTo(98,60);
			clear.stroke();
			clear.closePath();
				// Draw progress circle
			let radian = (percent/50*Math.PI) - (0.5*Math.PI);
			let paint = canv.getContext("2d");
			paint.lineWidth = 13;
			paint.strokeStyle = dat.colour;
			paint.beginPath();
			paint.arc(60,60,54,-0.5*Math.PI,radian);
			paint.stroke()
			paint.closePath();
				// Write progress
			let writeProgress = canv.getContext("2d");
			writeProgress.font = "34px Arial";
			if(percent<10) {
				writeProgress.fillText(percent,46,74);
			} else if (percent<100) {
				writeProgress.fillText(percent,37,74);
			} else if (percent=100) {
				writeProgress.fillText(percent,22,74);
			}
				// Write % symbol
			let writePercentSymbol = canv.getContext("2d");
			writePercentSymbol.font = "20px Arial";
			if(percent<10) {
				writePercentSymbol.fillText("%",65,74);
			} else if (percent<100) {
				writePercentSymbol.fillText("%",75,74);
			} else if (percent=100) {
				writePercentSymbol.fillText("%",79,74);
			}
				// Add 1% per each iteration
			percent++;
				// Function that calls engine function again or stops progress
			function stopProgress () {
				if (percent<=dat.percent) {
					setTimeout(engine, 50)
				}
			}
			stopProgress();
		}
	}
	// Summoning engine function
	engine();
}

// if hasRolled = true, youSeeMeRolling will not be executed anymore
var hasRolled = false;
function youSeeMeRolling () {
	for (var i = 0; i < canvases.length; i++) {
		showProgress(canvases[i],data[i])
	} 
	hasRolled = true;
};

// canvasList.offsetTop --distance of canvas-list section from start of the page--

function scrollListener () {
	if(hasRolled == false) {
		if (window.scrollY > (canvasList.offsetTop - window.innerHeight)) {
			youSeeMeRolling();
		}
	}
}
window.addEventListener("scroll",scrollListener)



/*Code for showing static progress by canvases
var data1 = {percent: 90,colour: "#30BAE7"}
var data2 = {percent: 75,colour: "#D74680"}
var data3 = {percent: 70,colour: "#15C7A8"}
var data4 = {percent: 85,colour: "#EB7D4B"}
var data = [data1,data2,data3,data4]

var canvases = document.getElementsByTagName("canvas");

function showProgress (canv,dat) {
	console.log(canv);
	var paintGrey = canv.getContext("2d");
	paintGrey.strokeStyle = "#DFE8ED";
	paintGrey.lineWidth = 13;
	paintGrey.beginPath();
	paintGrey.arc(60,60,54,0,2*Math.PI);
	paintGrey.stroke();
	paintGrey.closePath();

	var percent = 0;
	if(dat.percent>=0 && dat.percent<=100) {
		percent = Math.round(dat.percent)
	}
	
	var radian = (percent/50*Math.PI) - (0.5*Math.PI);
	var paint = canv.getContext("2d");
	paint.lineWidth = 13;
	paint.strokeStyle = dat.colour;
	paint.beginPath();
	paint.arc(60,60,54,-0.5*Math.PI,radian);
	paint.stroke()
	paint.closePath();

	var writeProgress = canv.getContext("2d");
	writeProgress.font = "34px Arial";
	if(percent<10) {
		writeProgress.fillText(percent,46,74);
	} else if (percent<100) {
		writeProgress.fillText(percent,37,74);
	} else if (percent=100) {
		writeProgress.fillText(percent,22,74);
	}

	var writePercentSymbol = canv.getContext("2d");
	writePercentSymbol.font = "20px Arial";
	if(percent<10) {
		writePercentSymbol.fillText("%",65,74);
	} else if (percent<100) {
		writePercentSymbol.fillText("%",75,74);
	} else if (percent=100) {
		writePercentSymbol.fillText("%",79,74);
	}
}

for (var i = 0; i < canvases.length; i++) {
	showProgress(canvases[i],data[i])
}*/