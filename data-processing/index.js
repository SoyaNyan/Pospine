const fs = require("fs");
const originalData = require("../data/data.json");
const data = originalData.data;

const getMaxFrom2dArray = (arr) => {
	let maxRow = arr.map((r) => {
		return Math.max.apply(Math, r);
	});
	return Math.max.apply(null, maxRow);
};

const getMinFrom2dArray = (arr) => {
	let minRow = arr.map((r) => {
		return Math.min.apply(Math, r);
	});
	return Math.min.apply(null, minRow);
};

const shuffleDataArray = (features, labels) => {
	// merge features & labels
	let arr = [];
	for (let i = 0; i < features.length; i++) {
		arr.push({
			x: features[i],
			y: labels[i],
		});
	}

	// shuffle array
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	// destructuring array
	return {
		feature: arr.map((d) => d.x),
		label: arr.map((d) => d.y),
	};
};

// prepare information for normalization
let featureMax = getMaxFrom2dArray(data.feature);
let featureMin = getMinFrom2dArray(data.feature);

// save information for feature use
let normalizationInfo = {
	min: featureMin,
	max: featureMax,
	size: data.feature.length,
};
fs.writeFileSync("../data/normalize.json", JSON.stringify(normalizationInfo));

// normalize feature data (range 0-1 scaling)
let features = data.feature;
let normalizedFeatures = features.map((e, i) => {
	return e.map((e, i) => {
		return (e - featureMin) / (featureMax - featureMin);
	});
});

// total data: 1560
let correctPoseFeatures = normalizedFeatures.slice(0, 780); // length: 780
let correctPoseLabels = data.label.slice(0, 780); // length: 780
let incorrectPoseFeatures = normalizedFeatures.slice(780); // length: 780
let incorrectPoseLabels = data.label.slice(780); // length: 780

// shuffle data
const shuffledCorrectPose = shuffleDataArray(correctPoseFeatures, correctPoseLabels);
const shuffledIncorrectPose = shuffleDataArray(incorrectPoseFeatures, incorrectPoseLabels);

// 1000 for training, 357 for evaluation
let trainingFeatures = shuffledCorrectPose.feature
	.slice(0, 600)
	.concat(shuffledIncorrectPose.feature.slice(0, 600)); // length: 600
let trainingLabels = shuffledCorrectPose.label
	.slice(0, 600)
	.concat(shuffledIncorrectPose.label.slice(0, 600)); // length: 600
let validationFeatures = shuffledCorrectPose.feature
	.slice(600)
	.concat(shuffledIncorrectPose.feature.slice(600)); // length: 180
let validationLabels = shuffledCorrectPose.label
	.slice(600)
	.concat(shuffledIncorrectPose.label.slice(600)); // length: 180

// save normalized data
let normalizedTrainingData = {
	// train set
	data: {
		feature: trainingFeatures,
		label: trainingLabels,
	},
};
fs.writeFileSync("../data/train-data.json", JSON.stringify(normalizedTrainingData));

let normalizedValidationData = {
	// validation set
	data: {
		feature: validationFeatures,
		label: validationLabels,
	},
};
fs.writeFileSync("../data/validation-data.json", JSON.stringify(normalizedValidationData));
