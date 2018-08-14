$(document).ready(function(){

    $("#register-form").submit(function(event) {
    
        event.preventDefault();
        var url = 'users/registerUser';
        var data = {
            name: $('#register-name').val(),
            email: $('#register-email').val(),
            age: $('#register-age').val(),
            city: $('#register-city').val(),
            password: $('#register-password').val()
        };
        
        $.post('/users/registerUser', data, function(response){
    
            if (response.message == 'Successfully registered.'){
    
                alert('Successfully registered. Please Login to use the application');
                location.reload();
            }
            else {
    
                alert(response.message);
            }
       });
    });
    
    $("#login-form").submit(function(event) {
    
        event.preventDefault();
        var url = 'users/registerUser';
        var data = {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        };
        
        $.post('/users/loginUser', data, function(response){
    
            if (response.message == 'Successfully logged in.'){
    
                localStorage.setItem("userData", JSON.stringify(response.data));
                location.href = '/main';
            } 
            else {
    
                alert(response.message);
            }        
        });
    });
    
});
