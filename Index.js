document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    currentWeatherInfo()
})

function currentWeatherInfo() {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/colton%20OR?unitGroup=metric&key=D7EWQSWC4XASA23DCSMD9M4ZH&contentType=json")
        .then(response => response.json())
        .then(data => {
            let date = data.days[0].datetime.split("-")
            let year = date[0]
            let month = date[1]
            let day = date[2]
            let time = data.currentConditions.datetime.split(":")
            let hour = (time[0] % 12)
            let minutes = time[1]
            let dateField = document.getElementById("date")
            let timeField = document.getElementById("time")
            dateField.append("Date: " + month + "-" + day + "-" + year, " ")
            if (time > "11:59:59") {
                timeField.append("Time: ", hour, ":", minutes, " PM")
            }
            else {
                timeField.append("Time: ", hour, ":", minutes, "AM")
            }
            let temp = data.currentConditions.temp
            let tempField = document.getElementById("temp")
            tempField.append("Temperature: ", temp * 9 / 5 + 32 + " F")

            let conditions = data.currentConditions.conditions
            let condField = document.getElementById("conditions")
            condField.append("Condition: ", conditions)

            let icon = data.currentConditions.icon
            let iconField = document.getElementById("icon")
            iconField.append(icon)

            let precipProb = data.currentConditions.precipprob
            let preciProbField = document.getElementById("preciprob")
            preciProbField.append("Precipitation Probability: ", precipProb)

            let precip = data.currentConditions.precip
            let preciField = document.getElementById("preci")
            preciField.append("Precipitation: ", precip)

            let wind = data.currentConditions.windspeed
            let windField = document.getElementById("wind")
            windField.append("Wind Speed:", wind)

            let gust = data.currentConditions.windgust
            let gustField = document.getElementById("gust")
            gustField.append("Gust Speed: ", gust)

            console.log(data)
            console.log()
        })
}