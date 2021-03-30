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
let truthLabel = 0;

function setup() {
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
        select("#output").html(poses);

        if (state) {
            while (batchCount < 1) {
                proccessData(poses);
                batchCount++;
            }
            state = false;
            batchCount = 0;
        }
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function printOutput(data) {}

function proccessData(data) {
    let pose = data[0].pose;
    let keyPoints = pose.keypoints;
    let tmpArray = [];

    keyPoints.forEach((point) => {
        tmpArray.push(point.position.x);
        tmpArray.push(point.position.y);
    });

    saveData(tmpArray, truthLabel);
}

function saveData(feature, label) {
    let loadedFeatureData = JSON.parse(localStorage.getItem("featureData"));
    if (loadedFeatureData === null) {
        loadedFeatureData = [];
    }
    loadedFeatureData.push(feature);
    localStorage.setItem("featureData", JSON.stringify(loadedFeatureData));

    let loadedLabelData = JSON.parse(localStorage.getItem("labelData"));
    if (loadedLabelData === null) {
        loadedLabelData = [];
    }
    loadedLabelData.push(label);
    localStorage.setItem("labelData", JSON.stringify(loadedLabelData));
}

function modelReady() {
    select("#status").html("Model Loaded");
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
            line(
                partA.position.x,
                partA.position.y,
                partB.position.x,
                partB.position.y
            );
        }
    }
}
