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
        $("#weather-info").append(($("<div>").text(weatherType).addClass("weather-results")).append($("<span>").html(weatherCall).attr("id", weatherID)))
    }

    function kelvToFarh(tempConv) {
        return Math.floor(((((tempConv) - 273.15) * 1.8) + 32)) + "\xB0" + "F";
    }



    callWeather("Sacramento", "CA")


    $("#search-btn").click(function (event) {
        event.preventDefault();
        console.log("test")
        var locationSearch = $("#weather-search").val().trim();
        var state = $("#state-select").val()
        $("#weather-info").empty()
        $("#weather-forecast").empty()
        callWeather(locationSearch, state)
        $(".recent-list").prepend($("<li>").append($("<a>").attr("src", "#").text(locationSearch + ", " + state)))
    })



    function callWeather(cityName, state) {

        var apiKey = "6ed66ab8536af2098115f5cf3916bab8"
        var country = "US"
        var date = moment().format("dddd, MMMM Do YYYY");
        var queryMainURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + state + "," + country + "&appid=" + apiKey
        var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + state + "," + country + "&appid=" + apiKey





        // OpenWeather API Calls
        $.ajax({
            url: queryMainURL,
            method: "GET"
        }).then(function (response) {
            var lat = response.coord.lat
            var lon = response.coord.lon
            console.log(response);
            console.log(response.id);
            results("Location: ", response.name + ", " + state + " (" + date + ")", "location");
            results("Temperature: ", kelvToFarh(response.main.temp), "temp");
            results("Humidity: ", response.main.humidity.toFixed(2) + "%", "humidity");
            results("Wind Speed: ", (response.wind.speed * 2.237).toFixed(2) + " mph", "wind-speed");

            var queryUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

            $.ajax({
                url: queryUV,
                method: "GET"
            }).then(function (response) {
                results("UV Index: ", response.value, "UV-Index");
            });

        });

        var resultsDiv = $("<div>").addClass("forecast-results")
        resultsDiv.append($("<h2>").text("5-Day Forecast:"))
        $(".bottom-main").append(resultsDiv)

        for (var i = 0; i < 5; i++) {

            var forecastCard = $("<div>").attr({
                class: "forecast",
                id: "day" + i
            })
            resultsDiv.append(forecastCard);
            var dayHead = $("<h3>").attr("id", "date" + i);
            var dayIcon = $("<img>").attr({
                class: "weather-icons",
                id: "icon" + i,
                alt: "Icon representing the weather on this day"
            });
            var dateTemp = ($("<p>").text("Temp: ")).append($("<span>").attr("id", "degree" + i));
            var dateHumidity = ($("<p>").text("Humidity: ")).append($("<span>").attr("id", "humidity" + i))
            function appendForecast(el) {
                forecastCard.append(el)
            }
            appendForecast(dayHead)
            appendForecast(dayIcon)
            appendForecast(dateTemp)
            appendForecast(dateHumidity)

        }

        $.ajax({
            url: queryForecastURL,
            method: "GET"
        }).then(function (response) {

            console.log(response)

            for (var i = 0, a = 3; i < 5; i++, a = a + 8) {
                $("#date" + i).text(unixConvert(response.list[a].dt));
                $("#degree" + i).text(kelvToFarh(response.list[a].main.temp_max));
                $("#humidity" + i).text(response.list[a].main.humidity + "%");
                var icon = response.list[a].weather[0].icon
                $("#icon" + i).attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
            }
        });

    }


    // Convert Unix Timecode to Date Format
    function unixConvert(unix) {

        var unixTimestamp = unix
        var mili = unixTimestamp * 1000
        var dateObj = new Date(mili)
        var format = {
            weekday: "long",
            month: "short",
            day: "numeric",
        }
        return dateObj.toLocaleString("en-us", format);
    }


});