// key events
$("body").keyup(function (e) {
    if (e.keyCode == 32) {
        state = true; // start capture
    }
});

$(document).on("click", "#capture-start", function () {
    state = true; // strat capture
});

$(document).on("change", "input[name=truthLabel]", function () {
    truthLabel = parseInt($("input[name=truthLabel]:checked").val());
});

let featureData = [];
let labelData = [];
$(document).on("click", "#load-datasets", function () {
    featureData = JSON.parse(localStorage.getItem("featureData"));
    if (featureData === null) {
        featureData = [];
    }

    labelData = JSON.parse(localStorage.getItem("labelData"));
    if (labelData === null) {
        labelData = [];
    }

    // update datsets info
    $("#feature-info").text(featureData.length + " Features");
    $("#label-info").text(labelData.length + " Labels");
});

$(document).on("click", "#save-datasets", function () {
    let featureString = JSON.stringify(featureData);
    let labelString = JSON.stringify(labelData);

    let featureWindow = window.open();
    featureWindow.document.write(featureString);
    let labelWindow = window.open();
    labelWindow.document.write(labelString);
});
