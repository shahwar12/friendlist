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

    var html = "<a href='/main'>Return to Home</a><br><br>";
    html += "<h4>Application Users</h4><br>";
    $("main").html(html);
};

function getAllFriends(){

    var html = "<a href='/main'>Return to Home</a><br><br>";
    html += "<h4>Your Friends</h4><br>";
    $("main").html(html);
};
