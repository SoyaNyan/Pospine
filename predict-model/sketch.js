// globals
let net, pospine;
let poses = [];
let batchCount = 0;
let state = false;

// options
let modelSize = 0.75;
let imageScaleFactor = 0.75;
let flipHorizontal = false;
let outputStride = 16;
let maxPoseDetections = 10;

let video = document.getElementById("video");
let canvas = document.getElementById("video-canvas");
let ctx = canvas.getContext("2d");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
		video.srcObject = stream;
		video.play();
	});
}

async function setup() {
	// load posenet by downloading the weights for the model.
	let videoElem = document.getElementById("video");
	video.addEventListener("loadeddata", function () {
		posenet
			.load({
				architecture: "MobileNetV1",
				outputStride: outputStride,
				multiplier: modelSize,
			})
			.then(function (loadedNet) {
				net = loadedNet;
				// when it's loaded, start estimating poses
				requestAnimationFrame(function () {
					estimatePoses();
				});
			});
	});

	inportModel(pospineModel);
	pospine = await tf.loadLayersModel("localstorage://pospine");
	$("#status").text("Pospine ready!");

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
	net.estimateSinglePose(video, imageScaleFactor, flipHorizontal).then(function (pose) {
		// store the keypoints from the pose to draw it below
		poses = [
			{
				pose: pose,
			},
		];

		if (state) {
			while (batchCount < 1) {
				let x = proccessData(poses);
				let xs = normalizeData(x);
				let pred = pospine.predict(xs);
				console.log(pred);
			}
		}

		// next animation loop, call posenet again to estimate poses
		requestAnimationFrame(function () {
			// Draw the video element into the canvas
			ctx.drawImage(video, 0, 0, 640, 480);
			// We can call both functions to draw all keypoints and the skeletons
			drawKeypoints();

			// Loop over the drawCameraIntoCanvas function
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
