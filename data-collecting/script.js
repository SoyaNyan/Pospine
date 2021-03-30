$('body').keyup(function(e){
    if(e.keyCode == 32){
        state = true;
    }
});

$(document).on('click', '#capture-start', function() {
    state = true;
});

$(document).on('change', 'input[name=truthLabel]', function() {
    truthLabel = $('input[name=truthLabel]:checked').val();
});