$(function() {

    $('#loginSubmit').click(function(e) {
		$('#registerSubmit').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#registerSubmit').click(function(e) {
		console.log("submit clicked");
		$('#loginSubmit').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});