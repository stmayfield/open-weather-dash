$(document).ready(function () {


    $(".closebtn").click(function () {
        $("#sidebar").css("width", "0")
        $("#main").css("marginLeft", "0")
    });
    $(".openbtn").click(function () {
        $("#sidebar").css("width", "250px")
        $("#main").css("marginLeft", "250px")
    });

    function weatherAPI() {

        var apiKey = "6ed66ab8536af2098115f5cf3916bab8"
        var cityName = "Sacramento"
        var state = "CA"
        var country = "US"
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + state + "," + country + "&appid=" + apiKey


        // var queryURL = "http://api.openweathermap.org/data/2.5/weather?id=5389489&appid=6ed66ab8536af2098115f5cf3916bab8"
        // api.openweathermap.org/data/2.5/weather?q=rocklin,ca&appid=6ed66ab8536af2098115f5cf3916bab8


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.main.temp);
            console.log(response.main.humidity);
            console.log(response.wind.speed);
            console.log(response.name + " " + response.sys.country);
            console.log(response.weather[0].icon);
            console.log(response.id);
            console.log(Math.floor(((((response.main.temp) - 273.15) * 1.8) + 32)) + "\xB0" + "F"
            );



        });
    }

    weatherAPI();















});