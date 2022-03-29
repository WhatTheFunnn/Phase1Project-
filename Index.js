document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    currentWeatherInfo()
})

function currentWeatherInfo() {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/colton%20OR?unitGroup=metric&key=D7EWQSWC4XASA23DCSMD9M4ZH&contentType=json")
        .then(response => response.json())
        .then(data => {

            let temp = data.currentConditions.temp
            let tempField = document.getElementById("temp")
            tempField.append(" ", temp * 9 / 5 + 32, " F")
            let conditions = data.currentConditions.conditions
            let condField = document.getElementById("conditions")
            condField.append("Condition: ", conditions)

            let icon = data.currentConditions.icon
            let iconField = document.getElementById("icon")
            iconField.append(icon)

            let precipProb = data.currentConditions.precipprob
            if (precipProb == null) {
                precipProb = ("0%")
            }

            let preciProbField = document.getElementById("preciprob")
            preciProbField.append("Precipitation Probability: ", precipProb)

            let precip = data.currentConditions.precip
            let preciField = document.getElementById("preci")
            preciField.append("Precipitation: ", precip, " In")

            let wind = data.currentConditions.windspeed
            let windField = document.getElementById("wind")
            windField.append("Wind Speed:", wind, " mph")

            let gust = data.currentConditions.windgust
            let gustField = document.getElementById("gust")
            gustField.append("Gust Speed: ", gust, " mph")

            time(data)
            locAndSearch(data)
            hourly(data)
        })
}

function time(data) {
    let date = data.days[0].datetime.split("-")
    let year = date[0]
    let month = date[1]
    let day = date[2]
    let time = data.currentConditions.datetime.split(":")
    let hour = (time[0] % 12)
    if (hour == 0) {
        hour = 12
    }
    let minutes = time[1]

    let dateField = document.getElementById("date")
    let timeField = document.getElementById("time")
    dateField.append("Date: " + month + "-" + day + "-" + year, " ")
    if (time > "11:59:59") {
        timeField.append(hour, ":", minutes, " PM")
    }
    else if (time < "11:59:59") {
        timeField.append(hour, ":", minutes, "AM")
    }
}

function locAndSearch(data) {
    let location = data.address.split(" ")
    let city = location[0].charAt(0).toUpperCase() + location[0].slice(1)
    let state = location[1]
    let temp = data.currentConditions.temp
    let locationField = document.getElementById("cityandstate")
    locationField.append(" ", temp * 9 / 5 + 32 + "  | ", " ")
    locationField.append(city, ", ", state,)

    let searchBar = document.getElementById("search")
    locationField.append(searchBar)

    searchBar.addEventListener('search', (e) => {
        alert("hi")
    })
}

function hourly(data) {
    let title = document.getElementById("forecast")
    title.append("Hourly Forecast")
    let container = document.getElementById("containerB")

    let time = data.currentConditions.datetime.split(":")
    let hour = (time[0])
    let today = data.days[0]
    let hours = today.hours
    let currentHour = document.createElement("h4")
    let currentTemp = document.createElement("p")
    let nextHour1 = document.createElement("h4")
    let nextTemp1 = document.createElement("p")
    container.append(currentHour)
    container.append(currentTemp)
    container.append(nextHour1)
    container.append(nextTemp1)
    if (hour) {
        for (let x = 0; x < hours.length; x++) {
            let newHour = hours[x]
            if (hour == newHour.datetime.split(":")[0] < 11) {
                let doubleDigit = newHour.datetime.split(":")[0]
                currentHour.append("Time: ", hour % 12, " AM"), currentTemp.append("Temperature: ", hours[doubleDigit.split("")[1]].temp * 9 / 5 + 32 + " F")
            }
            else if (hour == newHour.datetime.split(":")[0]) {console.log(newHour.datetime.split(":")[0])
                currentHour.append("Time: ", hour % 12, " PM"), currentTemp.append("Temperature: ", hours[hour].temp * 9 / 5 + 32 + " F")
            }

        }

    }

    // if (hour) {
    //     for (let x = 0; x < hours.length; x++) {
    //     newHour = ++hour
    //     console.log(hours[newHour].datetime.split(":"))
    //         if(hour == hours[newHour]){
    //         }       
            
            
    //     }
    // }

}