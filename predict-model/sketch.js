// Grab elements, create settings, etc.
let video = document.getElementById("video");
let canvas = document.getElementById("video-canvas");
let ctx = canvas.getContext("2d");

const option = {
	detectionType: "single", // single pose mode
};

// The detected positions will be inside an array
let poses = [];
let batchCount = 0;
let state = false;

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
		video.srcObject = stream;
		video.play();
	});
}

// A function to draw the video and poses into the canvas.
// This function is independent of the result of posenet
// This way the video will not seem slow if poseNet
// is not detecting a position
function drawCameraIntoCanvas() {
	// Draw the video element into the canvas
	ctx.drawImage(video, 0, 0, 640, 480);
	// We can call both functions to draw all keypoints and the skeletons
	drawKeypoints();
	drawSkeleton();
	window.requestAnimationFrame(drawCameraIntoCanvas);
}
// Loop over the drawCameraIntoCanvas function
drawCameraIntoCanvas();

// Create a new poseNet method with a single detection
const poseNet = ml5.poseNet(video, modelReady);
poseNet.on("pose", gotPoses);

// A function that gets called every time there's an update from the model
function gotPoses(results) {
	poses = results;

	if (state) {
		while (batchCount < 1) {
			let x = proccessData(poses);
			let xs = normalizeData(x);
			posepine.predict(xs);
			batchCount++;
		}
		state = false;
		batchCount = 0;
	}
}

function modelReady() {
	$("#status").text("Model ready!");
	poseNet.singlePose(video);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i += 1) {
		// For each pose detected, loop through all the keypoints
		for (let j = 0; j < poses[i].pose.keypoints.length; j += 1) {
			let keypoint = poses[i].pose.keypoints[j];
			// Only draw an ellipse is the pose probability is bigger than 0.2
			if (keypoint.score > 0.2) {
				ctx.beginPath();
				ctx.arc(keypoint.position.x, keypoint.position.y, 10, 0, 2 * Math.PI);
				ctx.stroke();
			}
		}
	}
}

// A function to draw the skeletons
function drawSkeleton() {
	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i += 1) {
		// For every skeleton, loop through all body connections
		for (let j = 0; j < poses[i].skeleton.length; j += 1) {
			let partA = poses[i].skeleton[j][0];
			let partB = poses[i].skeleton[j][1];
			ctx.beginPath();
			ctx.moveTo(partA.position.x, partA.position.y);
			ctx.lineTo(partB.position.x, partB.position.y);
			ctx.stroke();
		}
	}
}

function proccessData(data) {
	let pose = data[0].pose;
	let keyPoints = pose.keypoints;
	let tmpArray = [];

	keyPoints.forEach((point) => {
		tmpArray.push(point.position.x);
		tmpArray.push(point.position.y);
	});

	return tmpArray;
}

function normalizeData(data) {
	return data.map((e, i) => {
		return (e - normalizeInfo.min) / (normalizeInfo.max - normalizeInfo.min);
	});
}
