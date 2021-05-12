let video, net;
let poses = [];
let batchCount = 0;
let state = false;

// options
let modelSize = 0.75;
let imageScaleFactor = 0.75;
let minPoseConfidence = 0.3;
let minPartConfidence = 0.3;
let flipHorizontal = false;
let outputStride = 16;
let maxPoseDetections = 10;

const option = {
	detectionType: "single", // single pose mode
};

async function setup() {
	let p5Canvas = createCanvas(640, 480);
	p5Canvas.parent("video-canvas");
	video = createCapture(VIDEO);
	video.size(640, 480);

	// Hide the video element, and just show the canvas
	video.hide();

	// load posenet by downloading the weights for the model.
	posenet.load(modelSize).then(function (loadedNet) {
		net = loadedNet;
		// when it's loaded, start estimating poses
		requestAnimationFrame(function () {
			estimatePoses();
		});
	});

	// poseNet.on("pose", function (results) {
	// 	poses = results;

	// 	if (state) {
	// 		while (batchCount < 1) {
	// 			let x = proccessData(poses);
	// 			let xs = normalizeData(x);

	// 			if (isPospineLoaded && isVideoLoaded) {
	// 				pospine.predict(xs);
	// 			}

	// 			batchCount++;
	// 		}
	// 		state = false;
	// 		batchCount = 0;
	// 	}
	// });
}

function estimatePoses() {
	// call posenet to estimate a pose
	net.estimateSinglePose(capture.elt, imageScaleFactor, flipHorizontal).then(function (pose) {
		// store the keypoints from the pose to draw it below
		keypoints = pose.keypoints;
		// next animation loop, call posenet again to estimate poses
		requestAnimationFrame(function () {
			estimatePoses();
		});
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

function draw() {
	background(255);
	image(capture, 0, 0, 640, 480);

	noStroke();
	// iterate through poses, drawing the keypoints and skeletons
	for (var i = 0; i < poses.length; i++) {
		var pose = poses[i];
		// filter out poses that do not meet the minimum pose confidence.
		if (pose.score >= minPoseConfidence) {
			var keypoints = pose.keypoints;
			// draw keypoints
			for (var j = 0; j < keypoints.length; j++) {
				var keypoint = keypoints[j];
				// filter out keypoints that have a low confidence
				if (keypoint.score > minPartConfidence) {
					// for wrists, make the part cyan
					if (j == posenet.partIds["leftWrist"] || j == posenet.partIds["rightWrist"])
						fill(0, 255, 255);
					// all other parts are yellow
					else fill(255, 255, 0);

					ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
				}
			}

			// get skeleton, filtering out parts wtihout
			// a high enough confidence level
			if (keypoints.length > 0) {
				stroke(255, 255, 0);
				var skeleton = posenet.getAdjacentKeyPoints(keypoints, minPartConfidence);
				for (var j = 0; j < skeleton.length; j++) {
					// draw each line in the skeleton
					var segment = skeleton[j];
					line(
						segment[0].position.x,
						segment[0].position.y,
						segment[1].position.x,
						segment[1].position.y
					);
				}
			}
		}
	}
}
