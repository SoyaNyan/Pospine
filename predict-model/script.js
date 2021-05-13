$(document).ready(function () {
	updateStatistics();
});

// key events
$("body").keyup(function (e) {
	if (e.keyCode == 32) {
		state = true; // start capture
	}
});

$(document).on("click", "#capture-start", function () {
	state = true; // strat capture
});

$(document).on("click", "#reset-data", function () {
	resetStatistics();
});

// data format
/*
    data = {
        poseClass: true|false
    }
*/

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

// toast options
/*
    options = {
        poseClass: true|false,
        score: 0~1(number, float)
    }
*/

const addOutputToast = (options) => {
	let toastBackground = "bg-light";
	let toastMessage = "";
	if (options.poseClass) {
		toastMessage = "Good Posture!";
		toastBackground = "bg-light";
	} else {
		toastMessage = "Bad Posture!";
		toastBackground = "bg-dark text-white border-0";
	}

	toast = `
    <div class="toast show align-items-center ${toastBackground} mb-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                ${toastMessage} (score: ${options.score})
            </div>
        </div>
    </div>
    `;
	$("#toast-container").prepend(toast);
};

const updateGoodProgress = () => {
	const storedData = loadStatistics();

	const progress = $("#good-progress");
	progress.css("width", `${(storedData.goodPose / storedData.totalPose).toFixed(2) * 100}%`);
	progress.attr("aria-valuenow", (storedData.goodPose / storedData.totalPose).toFixed(2) * 100);

	$("#good-percent").text(`${(storedData.goodPose / storedData.totalPose).toFixed(4) * 100}%`);
};

const updateBadProgress = () => {
	const storedData = loadStatistics();

	const progress = $("#bad-progress");
	progress.css("width", `${(storedData.badPose / storedData.totalPose).toFixed(2) * 100}%`);
	progress.attr("aria-valuenow", (storedData.badPose / storedData.totalPose).toFixed(2) * 100);

	$("#bad-percent").text(`${(storedData.badPose / storedData.totalPose).toFixed(4) * 100}%`);
};

const updateTotalCaptured = () => {
	const storedData = loadStatistics();

	$("#statistics-total").text(storedData.totalPose);
};

const updateStatistics = () => {
	updateGoodProgress();
	updateBadProgress();
	updateTotalCaptured();
};
