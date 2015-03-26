$(document).ready(function() {
    $(document).on('click', '#submit', function() {
        if($('#firstName').val().length > 0 && $('#firstName').val().length > 0 && $('#lastName').val().length > 0 
		&& $('#username').val().length > 0 && $('#createpassword').val().length > 0 && $('#confirmpassword').val().length > 0 && ($('#createpassword').val()== $('#confirmpassword').val())){
            // Send data to server through the ajax call
            // action is functionality we want to call and outputJSON is our data
            $.ajax({
                url: '/signup',
                data: {action : 'signup', firstName : $('#firstName').val(), lastName : $('#lastName').val(), username : $('#username').val(), password : $('#createpassword').val()},
                type: 'post',
                async: 'true',
                dataType: 'json'
            })
            .done(function (result) {
				console.log("123");
                $('#register-form').appendTo('<div><span>User registration successfull</span></div>').delay(5000).queue(function(next){
					  $('div').fadeOut('slow').remove(); 
				});
				console.log(result);
				window.location = result.redirector.successRedirect;
            })
            .always(function (result) {
				$('#register-form').prepend('<div class="error"></div>');
				$('div.error').append('<span>' + result.responseText +'</span>').delay(5000).queue(function(next){
					  $(this).fadeOut('slow').remove(); 
				});
				console.log(result);
            })
            .fail(function (request,error) {
                console.log("656");
                // This callback function will trigger on unsuccessful action
                //alert('Network error has occurred please try again!');
            })
        } else {
            if ($('#firstName').val().length <= 0) {
				$('#register-form').prepend('<div class="error"></div>');
				$('div.error').append('<span>Please fill in your First Name</span>').delay(5000).queue(function(next){
					  $(this).fadeOut('slow').remove(); 
				});
            } else if ($('#lastName').val().length <= 0) {
                $('#register-form').prepend('<div class="error"></div>');
				$('div.error').append('<span>Please fill in your Last Name!!!</span>').delay(5000).queue(function(next){
					  $(this).fadeOut('slow').remove(); 
				});
            } else if ($('#username').val().length <= 0) {
                $('#register-form').prepend('<div class="error"></div>');
				$('div.error').append('<span>Please fill in your email id!!!</span>').delay(5000).queue(function(next){
					  $(this).fadeOut('slow').remove(); 
				});
            } else if ($('#createpassword').val().length <= 0) {
                $('#register-form').prepend('<div class="error"></div>');
				$('div.error').append('<span>Please fill in your create password!!!</span>').delay(5000).queue(function(next){
					  $(this).fadeOut('slow').remove(); 
				});
            } else if ($('#confirmpassword').val().length <= 0) {
                $('#register-form').prepend('<div class="error"></div>');
				$('div.error').append('<span>Please fill in your confirm password!!!</span>').delay(5000).queue(function(next){
					  $(this).fadeOut('slow').remove(); 
				});
            } else if ($('#createpassword').val()!= $('#confirmpassword').val()) {
                $('#register-form').prepend('<div class="error"></div>');
				$('div.error').append('<span>Passwords does not match</span>').delay(5000).queue(function(next){
					  $(this).fadeOut('slow').remove(); 
				});
            }
        }
        return false; // cancel original event to prevent form submitting
    })
})