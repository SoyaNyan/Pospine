let video;
let poseNet, mobileNet, pospine;
let poses = [];
let batchCount = 0;
let state = false;
let isPospineLoaded = false,
	isVideoLoaded = false;

const option = {
	detectionType: "single", // single pose mode
};

function preload() {
	// pospine with mobilenet
	mobileNet = ml5.featureExtractor("MobileNet");
	pospine = mobileNet.regression(video, videoReady);
	pospine.load("./pospine.json", pospineReady);
}

async function setup() {
	let p5Canvas = createCanvas(640, 480);
	p5Canvas.parent("video-canvas");
	video = createCapture(VIDEO);
	video.size(width, height);

	// Hide the video element, and just show the canvas
	video.hide();

	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, option, modelReady);
	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	poseNet.on("pose", function (results) {
		poses = results;

		if (state) {
			while (batchCount < 1) {
				let x = proccessData(poses);
				let xs = normalizeData(x);

				if (isPospineLoaded && isVideoLoaded) {
					pospine.predict(xs);
				}

				batchCount++;
			}
			state = false;
			batchCount = 0;
		}
	});
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

function modelReady() {
	select("#status").html("PoseNet Loaded");
}

function videoReady() {
	isVideoLoaded = true;
}

function pospineReady() {
	select("#status").html("Posepine ready!");
	isPospineLoaded = true;
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
