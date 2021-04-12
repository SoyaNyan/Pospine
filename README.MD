# Pospine - Tensorflow.js Project

- [About](#about)
- [Updates](#updates)
- [Usage](#usage)
  - [Live Example](#)
- [Datasets](#datasets)
  - [Collecting](#collecting)
  - [Processing](#processing)
  - [Normalization](#normalization)
- [Model](#model)
- [Training](#training)
- [Testing](#testing)
- [Contributors](#contributors)



## About

This project was started to help people correct their posture using Tensorflow.js & PoseNet. It was designed to work in low-end environments such as mobile web browsers. No installation is required and Chrome browser is recommended.



## Updates

- Data collecting tool with PoseNet / ml5.js / p5.js (web)
- Data normalization/processing tool (node.js)
- Tensorflow.js Layers API model



## Usage

preparing...



## Datasets

### Collecting

PoseNet returns the position of the joint in the image via webcam. Press the `space bar` or click `capture start `button to save the position data. Load datasets from local memory and save it to local storage via control panel.

![data-collecting-tool](http://soya.moe:463/CDN/collecting_tool.png)

```javascript
// with an array every time new poses are detected
poseNet.on("pose", function (results) {
    poses = results;

    if (state) {
        while (batchCount < 1) {
            proccessData(poses);
            batchCount++;
        }
        state = false;
        batchCount = 0;
    }
});
```

```
// ml5.js pose data structure
[
  {
    pose: {
      keypoints: [{position:{x,y}, score, part}, ...],
      leftAngle:{x, y, confidence},
      leftEar:{x, y, confidence},
      leftElbow:{x, y, confidence},
      ...
    }
  }
]
```

**Note:** You can use our data from [here](http://soya.moe:463/CDN/data.json)



### Processing

Below methods process data into formatted data and store to local storage.

```javascript
// process data(x, y)
function proccessData(data) {
    let pose = data[0].pose;
    let keyPoints = pose.keypoints;
    let tmpArray = [];

    keyPoints.forEach((point) => {
        tmpArray.push(point.position.x);
        tmpArray.push(point.position.y);
    });

    saveData(tmpArray, truthLabel);
    printOutput(data);
}
```

```javascript
// save data to localstorage
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
```

```
// data.json structure
{
    "data": {
        "feature": [
            [
                272.6723803805934,
                119.64644257660507,
                305.40802833171205,
                101.53660399440662,
                269.2220368737841,
                100.57816679839493,
                363.92106943093387,
                ...
        ], ...
        "label": [
         	1, 1, 1, ... , 0, 0
        ]
    }
}
```



### Normalization

Normalize the features of the input data to values between 0 and 1. And split dataset into training data and validation data.

```javascript
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
```

```javascript
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
fs.writeFileSync("../data/validation-data.json", JSON.stringify(normalizedValidationData));
```

```
// train-data.json structure
{
    "data": {
        "feature": [
            [
                0.43020466647188926,
                0.22080847465479406,
                0.4749991641629251,
                ...
        ], ...
        "label": [
         	1, 1, 1, ... , 0, 0
        ]
    }
}
    
// validation-data.json structure
{
    "data": {
        "feature": [
            [
                0.4831963990422944,
                0.328506640706061,
                0.5297701247859256,
                ...
        ], ...
        "label": [
         	1, 1, 1, ... , 0, 0
        ]
    }
}
```

**Note:** For the future use of model on external apps, save normalization info.

```json
// normalization info (of original datasets)
{
    "min":-41.719547969357976,
    "max":689.0766354571984,
    "size":1357
}
```

------

## Contributors

Feel free to contribute in any of the ways outlined:

- Submit issues/pull requests
- Tell us how you're using this plugin in *your* project

[@yuiopna](https://github.com/yuiopna), [@yewl1110](https://github.com/yewl1110), [@gksrlf](https://github.com/gksrlf)