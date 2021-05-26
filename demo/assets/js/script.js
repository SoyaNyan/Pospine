let chart;
let action = false;

$(document).ready(function () {
	$(".nav-link").on("click", function () {
		const navMenu = $(this).attr("id");

		if (navMenu === "nav-statistics") {
			$("#nav-home").removeClass("active").removeProp("aria-current");
			$("#nav-statistics").addClass("active").prop("aria-current", "page");
			if ($("#section-main").css("display") !== "none") {
				$("#section-main").slideUp(1000);
			}
			if ($("#section-start").css("display") !== "none") {
				$("#section-start").slideUp(1000);
			}
			if ($("#section-statistics").css("display") === "none") {
				$("#section-statistics").slideDown(1000);
			}

			reloadChart();
		} else {
			$("#nav-statistics").removeClass("active").removeProp("aria-current");
			$("#nav-home").addClass("active").prop("aria-current", "page");
			if (action) {
				if ($("#section-main").css("display") !== "none") {
					$("#section-main").slideUp(1000);
				}
				if ($("#section-start").css("display") === "none") {
					$("#section-start").slideDown(1000);
				}
			} else {
				if ($("#section-main").css("display") === "none") {
					$("#section-main").slideDown(1000);
				}
				if ($("#section-start").css("display") !== "none") {
					$("#section-start").slideUp(1000);
				}
			}
			if ($("#section-statistics").css("display") !== "none") {
				$("#section-statistics").slideUp(1000);
			}
		}
	});

	$("#start").on("click", function () {
		$("#section-main").slideUp(1000);
		$("#section-start").slideDown(1000);
		action = true;
	});

	$("#stop").on("click", function () {
		$("#section-main").slideDown(1000);
		$("#section-start").slideUp(1000);
		action = false;
	});

	$(document).on("click", "#reset-data", function () {
		resetStatistics();
		updateStatistics();
	});

	reloadChart();
	updateStatistics();
});

const loadStatistics = () => {
	let storedData = JSON.parse(localStorage.getItem("statistics"));
	if (storedData === null) {
		storedData = {
			totalPose: 0,
			goodPose: 0,
			badPose: 0,
		};
	}

	return storedData;
};

const saveStatistics = (data) => {
	let storedData = loadStatistics();

	if (data.poseClass) {
		storedData.goodPose++;
	} else {
		storedData.badPose++;
	}
	storedData.totalPose++;

	localStorage.setItem("statistics", JSON.stringify(storedData));
};

const resetStatistics = () => {
	let data = {
		totalPose: 0,
		goodPose: 0,
		badPose: 0,
	};

	localStorage.setItem("statistics", JSON.stringify(data));
};

const updateStatistics = () => {
	// update progress bar
	updateGoodProgress();
	updateBadProgress();

	// update apex chart data
	chart.updateSeries([
		{
			data: predictionArray,
		},
	]);
};

const updateGoodProgress = () => {
	const storedData = loadStatistics();

	const progress = $("#good-progress");
	const ratio = (storedData.goodPose / storedData.totalPose) * 100;
	if (!isNaN(ratio)) {
		progress.css("width", `${ratio.toFixed(0)}%`);
		progress.attr("aria-valuenow", ratio.toFixed(0));

		$("#good-percent").text(`${ratio.toFixed(2)}%`);
	} else {
		progress.css("width", `0%`);
		progress.attr("aria-valuenow", 0);

		$("#good-percent").text(`0%`);
	}
};

const updateBadProgress = () => {
	const storedData = loadStatistics();

	const progress = $("#bad-progress");
	const ratio = (storedData.badPose / storedData.totalPose) * 100;
	if (!isNaN(ratio)) {
		progress.css("width", `${ratio.toFixed(0)}%`);
		progress.attr("aria-valuenow", ratio.toFixed(0));

		$("#bad-percent").text(`${ratio.toFixed(2)}%`);
	} else {
		progress.css("width", `0%`);
		progress.attr("aria-valuenow", 0);

		$("#bad-percent").text(`0%`);
	}
};

const getDetectMode = () => {
	return $("#detect-mode").val();
};

const reloadChart = () => {
	// apex chart
	const options = {
		series: [
			{
				name: "Score",
				data: predictionArray.slice(),
			},
		],
		chart: {
			height: 350,
			type: "line",
		},
		stroke: {
			width: 7,
			curve: "smooth",
		},
		xaxis: {
			type: "category",
			categories: ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10"],
			tickAmount: 10,
		},
		title: {
			text: "Posture History",
			align: "left",
			style: {
				fontSize: "16px",
				color: "#666",
			},
		},
		fill: {
			type: "gradient",
			gradient: {
				shade: "dark",
				gradientToColors: ["#FDD835"],
				shadeIntensity: 1,
				type: "horizontal",
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100, 100, 100],
			},
		},
		markers: {
			size: 4,
			colors: ["#FFA41B"],
			strokeColors: "#fff",
			strokeWidth: 2,
			hover: {
				size: 7,
			},
		},
		yaxis: {
			min: 0,
			max: 1,
			title: {
				text: "Score",
			},
		},
	};

	chart = new ApexCharts(document.querySelector("#chart"), options);
	chart.render();
};
