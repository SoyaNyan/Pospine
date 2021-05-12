// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let batchCount = 0;
let state = false;
let truthLabel = 1;

// Pospine Model
inportModel(pospineModel);
const model = tf.loadLayersModel("localstorage://pospine");

async function setup() {
	let p5Canvas = createCanvas(640, 480);
	p5Canvas.parent("video-canvas");
	video = createCapture(VIDEO);
	video.size(width, height);

	const option = {
		detectionType: "single", // single pose mode
	};

	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, option, modelReady);
	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	poseNet.on("pose", function (results) {
		poses = results;

		if (state) {
			while (batchCount < 1) {
				let x = normalizeData(proccessData(poses));
				x = [0.5128650014712293, 0.45078931877692513, 0.585600453655447, 0.3575975926228369, 0.4318861678817371, 0.3625091688597315, 0.6682609186450007, 0.36528630578575516, 0.3481651387356954, 0.3791431325884062, 0.7239364551679092, 0.6025260634278409, 0.19811551107186443, 0.6141833778185842, 0.7832768837830814, 0.8609005919598349, 0.022459426414541805, 0.7401648494294755, 0.5576116367655377, 0.7601802745882079, 0.2525793568157015, 0.7906445211178722, 0.29015284613313164, 0.6128839956412722, 0.1649155165002558, 0.8119490332289825, 0.1800108770611313, 0.7175137426953949, 0.15772224803827867, 0.791367838663634, 0.1651062511409891, 0.8075000921630616, 0.15949092088551203, 0.8104211802518659];
				let xs = tf.tensor(x ,[1, x.length]);
				let pred = model.predict(xs).dataSync()[0];
				console.log(pred);
				batchCount++;
			}
			state = false;
			batchCount = 0;
		}
	});
	// Hide the video element, and just show the canvas
	video.hide();
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
	})
}

function modelReady() {
	select("#status").html("PoseNet Loaded");
}

function draw() {
	image(video, 0, 0, width, height);

	// We can call both functions to draw all keypoints and the skeletons
	drawKeypoints();
	drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i += 1) {
		// For each pose detected, loop through all the keypoints
		const pose = poses[i].pose;
		for (let j = 0; j < pose.keypoints.length; j += 1) {
			// A keypoint is an object describing a body part (like rightArm or leftShoulder)
			const keypoint = pose.keypoints[j];
			// Only draw an ellipse is the pose probability is bigger than 0.2
			if (keypoint.score > 0.2) {
				fill(255, 0, 0);
				noStroke();
				ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
			}
		}
	}
}

// A function to draw the skeletons
function drawSkeleton() {
	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i += 1) {
		const skeleton = poses[i].skeleton;
		// For every skeleton, loop through all body connections
		for (let j = 0; j < skeleton.length; j += 1) {
			const partA = skeleton[j][0];
			const partB = skeleton[j][1];
			stroke(255, 0, 0);
			line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
		}
	}
}
