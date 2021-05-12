const inportModel = (model) => {
	localStorage.setItem(
		"tensorflowjs_models/pospine/model_topology",
		JSON.stringify(model.model_topology)
	);
	localStorage.setItem(
		"tensorflowjs_models/pospine/model_metadata",
		JSON.stringify(model.model_metadata)
	);
	localStorage.setItem(
		"tensorflowjs_models/pospine/weight_specs",
		JSON.stringify(model.weight_specs)
	);
	localStorage.setItem("tensorflowjs_models/pospine/info", JSON.stringify(model.info));
	localStorage.setItem("tensorflowjs_models/pospine/weight_data", model.weight_data);
};

const pospineModel = {
	"model_topology": {
		"class_name": "Sequential",
		"config": {
			"name": "sequential_1",
			"layers": [
				{
					"class_name": "Dense",
					"config": {
						"units": 16,
						"activation": "relu",
						"use_bias": true,
						"kernel_initializer": {
							"class_name": "VarianceScaling",
							"config": {
								"scale": 1,
								"mode": "fan_avg",
								"distribution": "normal",
								"seed": null,
							},
						},
						"bias_initializer": {
							"class_name": "Zeros",
							"config": {},
						},
						"kernel_regularizer": null,
						"bias_regularizer": null,
						"activity_regularizer": null,
						"kernel_constraint": null,
						"bias_constraint": null,
						"name": "dense_Dense1",
						"trainable": true,
						"batch_input_shape": [null, 34],
						"dtype": "float32",
					},
				},
				{
					"class_name": "Dense",
					"config": {
						"units": 16,
						"activation": "relu",
						"use_bias": true,
						"kernel_initializer": {
							"class_name": "VarianceScaling",
							"config": {
								"scale": 1,
								"mode": "fan_avg",
								"distribution": "normal",
								"seed": null,
							},
						},
						"bias_initializer": {
							"class_name": "Zeros",
							"config": {},
						},
						"kernel_regularizer": null,
						"bias_regularizer": null,
						"activity_regularizer": null,
						"kernel_constraint": null,
						"bias_constraint": null,
						"name": "dense_Dense2",
						"trainable": true,
					},
				},
				{
					"class_name": "Dense",
					"config": {
						"units": 1,
						"activation": "sigmoid",
						"use_bias": true,
						"kernel_initializer": {
							"class_name": "VarianceScaling",
							"config": {
								"scale": 1,
								"mode": "fan_avg",
								"distribution": "normal",
								"seed": null,
							},
						},
						"bias_initializer": {
							"class_name": "Zeros",
							"config": {},
						},
						"kernel_regularizer": null,
						"bias_regularizer": null,
						"activity_regularizer": null,
						"kernel_constraint": null,
						"bias_constraint": null,
						"name": "dense_Dense3",
						"trainable": true,
					},
				},
			],
		},
		"keras_version": "tfjs-layers 3.6.0",
		"backend": "tensor_flow.js",
	},
	"model_metadata": {
		"format": "layers-model",
		"generatedBy": "TensorFlow.js tfjs-layers v3.6.0",
		"convertedBy": null,
	},
	"info": {
		"dateSaved": "2021-05-12T07:37:13.242Z",
		"modelTopologyType": "JSON",
		"modelTopologyBytes": 1468,
		"weightSpecsBytes": 374,
		"weightDataBytes": 3396,
	},
	"weight_specs": [
		{
			"name": "dense_Dense1/kernel",
			"shape": [34, 16],
			"dtype": "float32",
		},
		{
			"name": "dense_Dense1/bias",
			"shape": [16],
			"dtype": "float32",
		},
		{
			"name": "dense_Dense2/kernel",
			"shape": [16, 16],
			"dtype": "float32",
		},
		{
			"name": "dense_Dense2/bias",
			"shape": [16],
			"dtype": "float32",
		},
		{
			"name": "dense_Dense3/kernel",
			"shape": [16, 1],
			"dtype": "float32",
		},
		{
			"name": "dense_Dense3/bias",
			"shape": [1],
			"dtype": "float32",
		},
	],
	"weight_data":
		"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",
};
