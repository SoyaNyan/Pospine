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
		"dateSaved": "2021-05-19T06:25:54.495Z",
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
		"6MoNPrcAor7LJEK+T7zhPWb3WL60vtY9Y9rSPUsAzL6jWWK9qcMJvgoiYz1nebe+fKftvLiDJj4Hg66+zgjoPZCg7D/RfOi+NmNpvnhlDL7Rkhu/FaWCPqrJBj9Mb+g90dKMvmBn8z02yTk/tXy8vhfijL7ihxo9sbkaPaRnH77VmIQ+HrdTvNG1fr4Pzlg+kEqZPgDxFL5dHLo8u1wHvi080L1IFOO9JGvavV2rmz2pBqi+IRddvguM2LxSZh89pcu5P/vl3L7YOGu7fOaOvTQ8jb6y+o88pk7wPr9XMj7/7qy+8cv6PVFDHT8ZoOa7uUlIvrBwg77kkbw90CgaPpffmD7v3Se+i4/6Pd7oHj6la4i+tvuNPLKDKD33h+U9VIMkvlLLoj6cXaU9jSoCPgb0cr5E0/E9hgU7vVGXtD0vAvk/kTvnvjvADb49NB++JSt6vufAnD7VcvU90cstvYOd9b5PSSE+/8CTPqiveb78l9Y9VBq4vela2D7Mrd+9siz1PXGXt72MNgc+qUImPuAWxj1J1w6+uE0tvtC0Uj6lTTm+IUpHvuGaNTzykj0+88YBPaqs5Lz53Kw+RJzlvc7Phj/WKrO+Gl9AvSF+/b00YY08XttcPotEtT1XNxS+Q+CBvVl5Zj0zNa8+NYUsve2oAT4u0vc8b767PS8cnj6xQd49GH3vPo5mGz6/S12+jnohPRiGg7xppKE9QEnTvoFykj5p/P69P1ogPStQyL7iUDE9McnRPRDsiL15sUm997qTP/5i/r6p7Zc+0PgkvRM8Dr/nfGW7lfSQPozbjT6s0w2/gKWzPjmfYz227WQ9G5AQPsu3Lb0s64081eqvPiKe274M/RY+knyPPY7ca77nDeA90nYlPhZ/AL5S03s9Oiv8vOUqiT5wRwg+00nOvDqXQj4STEK+MzIRuwhEib22FhI/CZTsPeuPAb4Kt8+9jGAgvumHrr1Pja89w9V3vmPgXT5anSi9YPWDPOuAFL69oTc+p3WWvt4e8z28tBs967OnPl9zkL6OWgC+WCzXvfUZW75xF369bcemPGpZ9TwKfFi++XuDPgV9BjvFnlK+LKvbPV13tb0w6aG+xG6mPIQqKT9Fefy9+uUaPso7jz456aU9jZgrvi9uZT4y/2w+WYvcvqCACr5BEJG97oSbve76ZT443wg+mGuhPogGbL5cYQu+GO7TvTpbtr7LcHs+TY1ePgFaFj7wJyW9+xpUPUC7jb4PUom8HIzLPCJI6D1JrnK+cdRVPgKGMz4z6jS+loL1vuHB7z6BWHK9YpaGvl1ZQr7WNrS+CqVnPbzPKz2uVrs+P33rvU44Jb5erG09UdEjvleFij5Eqbe947AvvkaTYD//ygW+rgt/vZsAgr0TKeq78dAPPu/nYj7Gksk9G0zhvqiRHj5rkho+dlKrvU/AGT6LTV29UR9xvpbmdL6q0vu+SgnTu7jxaD0YRHe+ZCOkPuIUez1XMKW9BToAvDJFSz4sg6+9l4NIvKoeHz7Z+XU9SOMWPe8XlTotdJO88hnHv6PVOj+h4JM+v2eFPbpWzz73y2S+HzgLPgiiYb2yTpg+G1b7PVQq676v5Uq9ipAoPlzOzjzdOcU8io06Path6b/LGZc/AX5ovltDkz6wBME+GV4BvpJhOL62bG+9AFERP1lW/bp68o6/vdlAvSUwfj7txcK94WqqvsvI273/dPq+oBxMPpL6uz5G5Ho+dCS1PumOJL7Ij/k9B/MxvqUqoTp6E7I+F6G8votesT7BpgM+7vX9uim1a768IQe+1VutvxlbQz92Rmq++safPpNPBT/PeJ6+Ejj6vfxAXj2HnCk/cqvbPT29VL9snVo++HOePsnZ9D2DCay9vYk5vVNHGLzjB7O7nLi/vU3bKT6GwDE+OWoVPo6TR77sQq6+LOgUPsTNgL6H7lO+VghQPkC5G74xCpm9aoKhPT5oxDzQiaQ9yjFMPg47LbvIglC8hm12PvteCb74EKW++mdOvg7/Hj3MLSe9NgIDPvoLj71JntO9/EjvvSoutz26SHC9T63jPdJttz1/7nK8p3mRO1Kxjb7aUT8+fSJTPpBgdr7VEj8+jJKZvLAGwrwGdIs+AMvbPXrhc74OU869UBOQvgNX8728aYk+d0IYPqaHY74WvhW7rx7pPX7807z2HwM9VvpnPnVm8T1JYcC9QI23vcIiAD66xEa96FgRPps8aD1AVs0+8eaGvWdMGD7v5Hg84wF2PcViVL2m37K+pfsQPmW9bj4mK7U9moMcvp1K2T1VWeq95W3kPB7HJr5uAk29oomXviBJdj0GRZq+BNmIvZZAGb4KvGU9wwykPVwYC7zeX0c+AFogPkICRL4cd5u+WCQfvQ45+LzY2iW+ldzPO8hmmD6xTCg+BIvzvKqVlb677Ku+vI+MPvThBr7/qag+eQ8ZPRqia77M2no+dfggO2XG/73YrHy9jMziPXKQZj4YWAq/BM2sPtC3nL6tDGi+oP/QPYqT8T1ZBCi9JL9RPlIs7juCGQW97V6XvuwMD75j5Wk9omhKvGr6jb31lG2+YywUPr2Ob7w0OiG+IWCqvicWPT7bgyA9yb2JvByOFj5bJu29SdAuvoP3Bry9q9U8iWVePWtOnD51f4M9ZZo6PgzeFD+XQJS+zhpivlREHr7vIJs9dukdPmvrML55dOe9IZ+KvjuaAr5oaFY+1IASPifbhz7y0t09Jo/GPT2PPz6URcA+WAGlvsOfSL7PWry883N5vSPCBT4uPKq+YYhSPiLEuT1qFB4+HTCBPgjUHb36iz6+Y4GEvgZtJz4TGbW+Jt8KP9VZqr6/Dp0+q5aGPfhyCz7gqKi9VSbOPhtJLzsYbwo9AtjtvZ822D4Xnus9nSSQPP3Hpr0NuMI9S0/2PRjG5D5DWzm+AAAAAAgHNryuTc69XcpFPKZNAD0xiT899JKbvVPFm72bk6o9VVsOvTTdPr2yniI69FePPAAAAADzOD0+nqOcvj4jEL4bWUu/Jo0jP7n4QrzULC++qBg1P2ePuL69QMk6EKKdPKVMUD9l4Yc/aRGWPtAeBr5yfri/4XZ5PklN2L3B8d09x/UNP9OrDb7V6709OtbtvkNeab4yryS+6rcEPmV96D3X5mS+zsYpvgRqsT3vpq2+ZQJ2P7Eu7D7vjjG93KWCvjydAz4jNQC+UvPsvpNuUr40MBE+eyryvfxfDr6YtFw+2uw7PvVRFz7XLtQ+aU2UvtTCK73KaOw++JhMvgxbxj462x++N99FPq1lmz72Qoc+d6lnvtWeQj48qAG+BWMMPpnvlT5ZGZw9MxdEPhwjGj6ZJlK9js1lvQvf+TxBxIe+e92JPn2IN74ddPy9Bs5dvv27Fb6YR/68LV71vj6AXr5rVG46j43TPbEClru9CoY8fsMjP9MAwz78zyE9appyvTS+P74aEvs+/XX3vLfig74nI3s+IzWKvOSjwr6VHyI+Xnc9PVN+F76vn3w9GDmMPsQM8D1f8IK8yDgMvtgEBj5R3Wc+BEzBPuSjur02QLu+INz+PpxE4r56D5q+7EDRvmLJtz3EmKY+cFY4vnqQiT4LhqG+2+VgPuN4Yr7VUQW+WJ8zvgx/RD1zyqk7TIjIPvXkT72lMrI+ua+GPNzWO74nGc295HyOPgHlhD5RU9a9Th+yvjdUwL7PU52+PnnWvLsUkj6tgDW+HgnPPKoPOD6Mv4+9/lBfvhH1+r1+prg+sYZJPdF6B7/lrhm+IBS1vk8Q7D6pF0s94E4kvub/Az0prEc+BeTNPpu5nb7nQJY+n7EsPT5pKr69J6s9lM0ovoX3qz7T34k+8RU7PsdSgr2f19I+W1aSvdolND7Xz8c+/AsKvqVQDr6MypW9AbXvvbRIh7yHO7e+oNQePrzzr739jI8+YOMwPyXeqL5m6L0+8yJQv8/65b4tVCS977Kwvuqn572MHnm9ZmivPjd66TxBlAU+rDOTulF5R7lJdYK+No7Xvq1qp7088gs961tavuWuOD6BR14+pdqwPbSccL6fRaA9hcWePiNjN7sqKoO+BaC1PjXYsjtN5aw934OZvg+9Z76mvpK+zo+UPVx7eb46N4Y+LEKzPiw1Er6CLY68PfTXvmSRH75hhZK+WtT+PKcWlL6k+gy+r2jEvtOCTL4k7A8+fqdYPvHgmr7vq1M+wJJEvTqFrD6a8ao+Jy/6PZbeObx33E6+iXKhPs7bv77aaiM+HKbMvlwbSz6/VU29VFSSPtm1AT6mbxS+k2yfPWUTDb7+IVC+HIsLPsWB5z2Hjfq9lKvfvL5KwT0Ik1q+VZdAPhB35D4tpNg+u8RcvVCyIT7VEAe+X7xuPoPqlz5fEKO+4lr/vAAAAACMM/s7g8CbPZQdPrtNRei9AAAAAO0KYD0AAAAAl1RuuxjSxLspxQO9KQewPeA4S7x4yFu6loMhPsOGn72/EcE+EPgkv0fhYj/ewjO/bhpivsOjlz4Wkyq/FFazPWZwST3wC0S+25UyvwvJjL/xCii7URK0Pstu+z/nFWw+",
};
