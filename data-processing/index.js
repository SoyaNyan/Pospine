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

// total data: 1357
let correctPoseFeatures = normalizedFeatures.slice(0, 683); // length: 683
let correctPoseLabels = data.label.slice(0, 683); // length: 683
let incorrectPoseFeatures = normalizedFeatures.slice(683); // length: 674
let incorrectPoseLabels = data.label.slice(683); // length: 674

// 1000 for training, 357 for evaluation
let trainingFeatures = correctPoseFeatures
    .slice(0, 500)
    .concat(incorrectPoseFeatures.slice(0, 500)); // length: 1000
let trainingLabels = correctPoseLabels
    .slice(0, 500)
    .concat(incorrectPoseLabels.slice(0, 500)); // length: 1000
let validationFeatures = correctPoseFeatures
    .slice(500)
    .concat(incorrectPoseFeatures.slice(500)); // length: 357
let validationLabels = correctPoseLabels
    .slice(500)
    .concat(incorrectPoseLabels.slice(500)); // length: 357

// save normalized data
let normalizedTrainingData = { // train set
    data: {
        feature: trainingFeatures,
        label: trainingLabels,
    },
};
fs.writeFileSync("../data/train-data.json", JSON.stringify(normalizedTrainingData));

let normalizedValidationData = { // validation set
    data: {
        feature: validationFeatures,
        label: validationLabels,
    },
};
fs.writeFileSync(
    "../data/validation-data.json",
    JSON.stringify(normalizedValidationData)
);