let predictionArray = [];

// array init
const predictionInit = () => {
	predictionArray = [];
};

// array push(enqueue)
const pushPrediction = (predScore) => {
	if (predictionArray.length < 10) {
		predictionArray.push(predScore);
	} else {
		shiftPrediction();
		predictionArray.push(predScore);
	}

	return predictionArray.length;
};

// array shift(dequeue)
const shiftPrediction = () => {
	return predictionArray.shift();
};

const checkPosture = (predScore, mode) => {
	pushPrediction(predScore);

	// prediction array ready
	if (predictionArray.length >= 10) {
		let incorrectPoseArray = predictionArray.filter((s) => {
			return s < 0.5;
		});

		let limit = 0;
		switch (mode) {
			case 0: // high sensitivity
				limit = 2;
				break;
			case 1: // medium sensitivity(default)
				limit = 5;
				break;
			case 2: // low sensitivity
				limit = 8;
				break;
			default:
				limit = 5;
		}

		// check incorrect posture ratio
		if (incorrectPoseArray.length >= limit) {
			let notification = {
				title: "Pospine Notification",
				options: {
					body: "You're in a bad posture!! Sit up straight.",
					icon: "http://soya.moe:463/CDN/logo.png",
				},
			};

			notify(notification);
		}
	}
};
