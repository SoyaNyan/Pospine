let tfvisInstance = tfvis.visor();

$(document).ready(function () {
	console.log("Pospine ready...");

	// load data
	trainDataInput = dataToTensor(trainData.data);
	tfvis.show.valuesDistribution(
		{
			name: "Trainset Distribution",
			tab: "Model",
		},
		trainDataInput.inputs
	);
	validationDataInput = dataToTensor(validationData.data);
	tfvis.show.valuesDistribution(
		{
			name: "Validationset Distribution",
			tab: "Model",
		},
		validationDataInput.inputs
	);
	document.getElementById("status").innerText = `Datasets loaded...`;
});

$(".tfvis-show").click(function () {
	if (!tfvisInstance.isOpen()) {
		tfvisInstance.toggle();
	}
});

// training start button
$("#start-train").click(function () {
	run();
});

// update model button
$("#update-model").click(function () {
	model = getModel(modelOptions);
	tfvis.show.modelSummary({ name: "Model Architecture", tab: "Model" }, model);
	document.getElementById("status").innerText = `Model updated!`;

	// toggle start button
	isModelLoaded = true;
	if ($("#start-train").attr("disabled")) {
		$("#start-train").attr("disabled", false);
	}
});

// save model button
$("#save-model").click(function () {
	const modelName = "pospine";
	model.save("localstorage://" + modelName);
	model.save("downloads://" + modelName);
});

// export model button
$("#export-model").click(function () {
	let modelData = {
		model_topology: JSON.parse(
			localStorage.getItem("tensorflowjs_models/pospine/model_topology")
		),
		model_metadata: JSON.parse(
			localStorage.getItem("tensorflowjs_models/pospine/model_metadata")
		),
		info: JSON.parse(localStorage.getItem("tensorflowjs_models/pospine/info")),
		weight_specs: JSON.parse(localStorage.getItem("tensorflowjs_models/pospine/weight_specs")),
		weight_data: localStorage.getItem("tensorflowjs_models/pospine/weight_data"),
	};
	let exportWindow = window.open();
	exportWindow.document.write(JSON.stringify(modelData));
});

// learning rate change event
$(document).on("change", "input[name=learningRate]", function () {
	switch ($("input[name=learningRate]:checked").val()) {
		case "1":
			modelOptions.learningRate = 1;
			break;
		case "0.1":
			modelOptions.learningRate = 0.1;
			break;
		case "0.01":
			modelOptions.learningRate = 0.01;
			break;
		default:
			modelOptions.learningRate = 1;
	}
});

// batch size change event
$(document).on("change keydown", "#batch-size", function () {
	trainingOptions.batchSize = parseInt($("#batch-size").val());
});

// training epochs change event
$(document).on("change keydown", "#train-epoch", function () {
	trainingOptions.trainingEpochs = parseInt($("#train-epoch").val());
});

// layers change event
$(document).on("change keydown", ".layers", function () {
	modelOptions.layers[0].units = parseInt($("#layer-1-unit").val());
	modelOptions.layers[0].activation = $("#layer-1-activation").val();
	modelOptions.layers[1].units = parseInt($("#layer-2-unit").val());
	modelOptions.layers[1].activation = $("#layer-2-activation").val();
	modelOptions.layers[2].units = parseInt($("#layer-3-unit").val());
	modelOptions.layers[2].activation = $("#layer-3-activation").val();
});

// loss function change event
$(document).on("change", "#loss-function", function () {
	modelOptions.lossFunction = $("#loss-function").val();
});

// console.log implementation
(function (logger) {
	console.old = console.log;
	console.log = function () {
		var output = "",
			arg,
			i;

		for (i = 0; i < arguments.length; i++) {
			arg = arguments[i];
			output += '<span class="log-' + typeof arg + '">';

			if (
				typeof arg === "object" &&
				typeof JSON === "object" &&
				typeof JSON.stringify === "function"
			) {
				output += JSON.stringify(arg);
			} else {
				output += arg;
			}

			output += "</span>&nbsp;";
		}

		logger.innerHTML = output + "<br>" + logger.innerHTML;
		console.old.apply(undefined, arguments);
	};
})(document.getElementById("output"));
