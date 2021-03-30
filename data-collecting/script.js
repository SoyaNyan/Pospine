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
    truthLabel = $("input[name=truthLabel]:checked").val();
});
