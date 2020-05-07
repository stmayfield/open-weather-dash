$(document).ready(function () {






    $(".closebtn").click(function () {
        $("#sidebar").css("width", "0")
        $("#main").css("marginLeft", "0")
    });
    $(".openbtn").click(function () {
        $("#sidebar").css("width", "250px")
        $("#main").css("marginLeft", "250px")
    });




    function results(weatherType, weatherCall, weatherID) {
        $("#weather-info").append(($("<div>").text(weatherType).addClass("weather-results")).append($("<span>").text(weatherCall).attr("id", weatherID)))
    }



    var apiKey = "6ed66ab8536af2098115f5cf3916bab8"
    var cityName = "Sacramento"
    var state = "CA"
    var country = "US"
    var queryMainURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + state + "," + country + "&appid=" + apiKey



    $.ajax({
        url: queryMainURL,
        method: "GET"
    }).then(function (response) {
        var lat = response.coord.lat
        var lon = response.coord.lon
        console.log(response);
        console.log(response.id);
        results("Location: ", response.name + ", " + response.sys.country, "location");
        results("Temperature: ", Math.floor(((((response.main.temp) - 273.15) * 1.8) + 32)) + "\xB0" + "F", "temp");
        results("Humidity: ", response.main.humidity.toFixed(2) + "%", "humidity");
        results("Wind Speed: ", (response.wind.speed * 2.237).toFixed(2) + " mph", "wind-speed");

        var queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

        $.ajax({
            url: queryUV,
            method: "GET"
        }).then(function (response) {
            results("UV Index: ", response.value, "UV-Index");
        });






    });










});