function checkLogin(){

    if (!localStorage.getItem("userData"))
        location.href = '/';
    else
        $(".user-name").html(JSON.parse(localStorage.getItem("userData")).name);
        $("#user-email").html(JSON.parse(localStorage.getItem("userData")).email);
        $("#user-age").html(JSON.parse(localStorage.getItem("userData")).age);
        $("#user-city").html(JSON.parse(localStorage.getItem("userData")).city);
    return;
};

function main(){
    location.href = '/main';
};

function logout(){
    localStorage.removeItem("userData");
    location.href = '/';
};

function getAllUsers(){

    $.ajaxSetup({
        headers: {
            'Authorization': JSON.parse(localStorage.getItem("userData")).token,
        }
    });

    $.get('/appUsers/getAllUsers',  function(response){
        
        var html = "<a href='/main'>Return to Home</a><br><br>";
        html += "<h4>Application Users</h4><br>";

        if (response.message == "Data received."){

            for (var i=0; i<response.data.length; i++){

                html+="<div class='row'>";
                html+="<div class='col-md-2'>"+response.data[i].name+"</div>";
                if (response.data[i].frnd)
                    html+="<div class='col-md-2' id="+response.data[i]._id+"><span class='friend-span'>Already Friend</span></div>";
                else
                    html+="<div class='col-md-2' id="+response.data[i]._id+"><button class='add-friend-btn' onclick=addFriend('"+response.data[i]._id+"')>Add Friend</button></div>";
                html+="<div class='col-md-2'><button class='view-details-btn' onclick=viewUserDetails('"+response.data[i]._id+"')>View Details</button></div>";
                html+="</div><hr>";
            }
        }
        else {

            html += "<p>"+response.message+"</p><br>";
        }

        $("main").html(html);
    });
};

function getAllFriends(){

    $.ajaxSetup({
        headers: {
            'Authorization': JSON.parse(localStorage.getItem("userData")).token,
        }
    });

    $.get('/appUsers/getAllFriends',  function(response){
        
        var html = "<a href='/main'>Return to Home</a><br><br>";
        html += "<h4>Your Friends</h4><br>";

        if (response.message == "Data received."){

            for (var i=0; i<response.data.length; i++){

                html+="<div class='row'>";
                html+="<div class='col-md-2'>"+response.data[i].name+"</div>";
                html+="<div class='col-md-2'><button class='view-details-btn' onclick=viewUserDetails('"+response.data[i]._id+"')>View Details</button></div>";
                html+="</div><hr>";
            }
        }
        else {

            html += "<p>"+response.message+"</p><br>";
        }

        $("main").html(html);
    });
};

function viewUserDetails(userId){
    
    $.ajaxSetup({
        headers: {
            'Authorization': JSON.parse(localStorage.getItem("userData")).token,
        }
    });

    $.get('/appUsers/getUserDetails?Id='+userId,  function(response){

        if (response.message == "Data received."){

            $("#modal-user-name").html(response.data.name);
            $("#modal-user-email").html(response.data.email);
            $("#modal-user-age").html(response.data.age);
            $("#modal-user-city").html(response.data.city);
            $('#userDetailModal').modal('show');
        }
        else {

            alert(response.message)
        }
    });
}

function addFriend(userId){

    var data = {Id: userId};
    $.ajaxSetup({
        headers: {
            'Authorization': JSON.parse(localStorage.getItem("userData")).token,
        }
    });

    $.post('/appUsers/addFriend', data, function(response){

        if (response.message == "Data added."){

            $("#"+userId).html("<span class='friend-span'>Friend now</span>");
        }
        else {

            alert(response.message)
        }
    });

}