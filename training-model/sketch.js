// global variables
let epoch = 0,
	trainingLogs;
let model,
	isModelLoaded = false,
	trainDataInput,
	validationDataInput;

// options for model.compile()
let trainingOptions = {
	batchSize: 32,
	trainingEpochs: 10,
};
// options for getModel()
let modelOptions = {
	layers: [
		{
			units: 16,
			activation: "relu",
		},
		{
			units: 16,
			activation: "relu",
		},
		{
			units: 1,
			activation: "sigmoid",
		},
	],
	learningRate: 0.1,
	lossFunction: "binaryCrossentropy",
};

// returns tensor from data
function dataToTensor(data) {
	let inputData = [];

	for (let i = 0; i < data.feature.length; i++) {
		inputData.push({
			x: data.feature[i],
			y: data.label[i],
		});
	}

	return tf.tidy(() => {
		// shuffle data
		tf.util.shuffle(inputData);

		// convert data to tensors
		const features = inputData.map((d) => d.x);
		const labels = inputData.map((d) => d.y);
		const featureTensor = tf.tensor2d(features);
		const labelTensor = tf.tensor1d(labels);

		return {
			inputs: featureTensor,
			labels: labelTensor,
		};
	});
}

// create model
function getModel(modelOptions) {
	const model = tf.sequential();

	model.add(
		tf.layers.dense({
			inputShape: [34],
			units: modelOptions.layers[0].units,
			activation: modelOptions.layers[0].activation,
		})
	);

	model.add(
		tf.layers.dense({
			units: modelOptions.layers[1].units,
			activation: modelOptions.layers[1].activation,
		})
	);

	model.add(
		tf.layers.dense({
			units: modelOptions.layers[2].units,
			activation: modelOptions.layers[2].activation,
		})
	);

	const optimizer = tf.train.sgd(modelOptions.learningRate);
	model.compile({
		loss: modelOptions.lossFunction,
		optimizer: optimizer,
		metrics: ["accuracy"],
	});

	return model;
}

// logging callbacks(on epoch ends)
function epochLog(epoch, logs) {
	let info = {
		loss: logs.loss.toFixed(3),
		acc: logs.acc.toFixed(3),
		val_loss: logs.val_loss.toFixed(3),
		val_acc: logs.val_acc.toFixed(3),
	};
	// save logs to global variables
	trainingLogs = info;

	document.getElementById(
		"status"
	).innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Training... [Epoch: ${epoch}]`;
	console.log(
		`Epoch ${epoch} | [Train] Loss: ${info.loss}, Acc: ${info.acc}(${(info.acc * 100).toFixed(
			2
		)}%) | [Validation] Loss: ${info.val_loss}, Acc: ${info.val_acc}(${(
			info.val_acc * 100
		).toFixed(2)}%)`
	);
}

// train model
async function trainModel(model, trainData, validationData, trainingOptions) {
	const metrics = ["loss", "val_loss", "acc", "val_acc"];
	const container = {
		name: "Model Training",
		tab: "Training",
		styles: { height: "1000px" },
	};
	const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
	const BATCH_SIZE = trainingOptions.batchSize;

	return model.fit(trainData.inputs, trainData.labels, {
		batchSize: BATCH_SIZE,
		validationData: [validationData.inputs, validationData.labels],
		epochs: trainingOptions.trainingEpochs,
		shuffle: true,
		callbacks: [
			{
				onTrainBegin: (l) => {
					epoch = 0;
					trainingLogs = {};
					document.getElementById("status").innerText = "Start training model.";

					// toggle start & save & export model button
					if (!$("#start-train").attr("disabled")) {
						$("#start-train").attr("disabled", true);
					}
					if (!$("#save-model").attr("disabled")) {
						$("#save-model").attr("disabled", true);
					}
					if (!$("#export-model").attr("disabled")) {
						$("#export-model").attr("disabled", true);
					}
				},
				onTrainEnd: (l) => {
					document.getElementById("status").innerText = "Finished training!!";
					console.log(
						`Final Results => [Train] Loss: ${trainingLogs.loss}, Acc: ${
							trainingLogs.acc
						}(${(trainingLogs.acc * 100).toFixed(2)}%) | [Validation] Loss: ${
							trainingLogs.val_loss
						}, Acc: ${trainingLogs.val_acc}(${(trainingLogs.val_acc * 100).toFixed(
							2
						)}%)`
					);

					// toggle start & save & export model button
					if ($("#start-train").attr("disabled")) {
						$("#start-train").attr("disabled", false);
					}
					if ($("#save-model").attr("disabled")) {
						$("#save-model").attr("disabled", false);
					}
					if ($("#export-model").attr("disabled")) {
						$("#export-model").attr("disabled", false);
					}

					// open tfvis visor
					if (!tfvisInstance.isOpen()) {
						tfvisInstance.toggle();
					}
				},
				onEpochEnd: (e, l) => {
					epochLog(e, l);
				},
			},
			fitCallbacks,
		],
	});
}

// main thread
async function run() {
	// load model
	// model = getModel(modelOptions);
	// tfvis.show.modelSummary(
	//     { name: "Model Architecture", tab: "Model" },
	//     model
	// );

	// train model
	if (isModelLoaded) {
		await trainModel(model, trainDataInput, validationDataInput, trainingOptions);
	}
}
