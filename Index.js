const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

const urlParams = "?unitGroup=metric&key=D7EWQSWC4XASA23DCSMD9M4ZH&contentType=json"

document.addEventListener('DOMContentLoaded', () => {
    currentWeatherInfo("colton%20OR")
    navButtons()
});

function currentWeatherInfo(searchParam) {

    fetch(url + searchParam + urlParams)
        .then(response => response.json())
        .then(data => {
            let location = data.resolvedAddress.split(",")
            let newLocation = (location[0] + "," + location[1])
            let locationField = document.getElementById("location")

            locationField.innerText = ""
            locationField.append("Location: ", newLocation)

            let temp = data.currentConditions.temp
            let tempField = document.getElementById("temp")
            tempField.innerText = ""
            tempField.append("Temperature: ", Math.round(temp * 9 / 5 + 32), " Degrees", " F")

            let conditions = data.currentConditions.conditions
            let condField = document.getElementById("conditions")
            condField.innerText = ""
            condField.append("Condition: ", conditions)

            let precipProb = data.currentConditions.precipprob
            if (precipProb == null) {
                precipProb = ("0%")
            }

            let preciProbField = document.getElementById("preciprob")
            preciProbField.innerText = ""
            preciProbField.append("Precipitation Probability: ", precipProb)

            let precip = data.currentConditions.precip
            let preciField = document.getElementById("preci")
            preciField.innerText = ""
            preciField.append("Precipitation: ", precip, " In")

            let wind = data.currentConditions.windspeed
            let windField = document.getElementById("wind")
            windField.innerText = ""
            windField.append("Wind Speed:", wind, " mph")

            let gust = data.currentConditions.windgust
            let gustField = document.getElementById("gust")
            gustField.innerText = ""
            gustField.append("Gust Speed: ", gust, " mph")


            time(data)
            locationBar(data, url)
            searchBar()
            fiveDay(data)
            hourly(data)
            weatherBG(data)
        })
        .catch(error => alert("Please enter valid city and state"))
};

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
    dateField.innerText = ""
    dateField.append("Date: " + month + "-" + day + "-" + year, " ")
    timeField.innerText = ""
    if (time > "11:59:59") {
        timeField.append(hour, ":", minutes, " PM")
    }
    else if (time < "11:59:59") {
        timeField.append(hour, ":", minutes, "AM")
    }
};

function locationBar(data) {
    let location = data.address.split(" ")
    let city = location[0].charAt(0).toUpperCase() + location[0].slice(1)
    let state = location[1]
    let temp = data.currentConditions.temp
    let locationField = document.getElementById("cityandstate")
    locationField.innerHTML = ""
    locationField.append(" ", Math.round(temp * 9 / 5 + 32) + " F. | ", " ")
    locationField.append(city, ", ", state,)
    console.log(data)
}

function searchBar() {
    let searchBar = document.getElementById("form")

    searchBar.addEventListener('submit', (e) => {
        e.preventDefault()
        let search = e.target[0].value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        e.target.reset()

        currentWeatherInfo(search)

    })

};

function hourly(data) {
    let container = document.getElementById("containerB")

    let time = data.currentConditions.datetime.split(":")
    let hour = (time[0])
    let today = data.days[0]
    let hours = today.hours

    if (hour) {
        for (let x = 0; x < hours.length; x++) {
            let newHour = hours[x]
            let newTime = document.createElement("h4")
            let newTemp = document.createElement("p")
            let newCond = document.createElement("p")
            container.append(newTime)
            container.append(newTemp)
            container.append(newCond)

            if (hour < newHour.datetime.split(":")[0]) {
                if (newHour.datetime.split(":")[0] < 12 && newHour.datetime.split(":")[0]) {
                    newTime.append("Time: ", newHour.datetime.split(":")[0] % 12, " AM")
                    newTemp.append("Temperature: ", Math.round(newHour.temp * 9 / 5 + 32) + " Degrees" + " F")
                    newCond.append("Conditions: ", newHour.conditions)
                }

                else {
                    newTime.append("Time: ", newHour.datetime.split(":")[0] % 12, " PM")
                    newTemp.append("Temperature: ", Math.round(newHour.temp * 9 / 5 + 32) + " Degrees" + " F")
                    newCond.append("Conditions: ", newHour.conditions)
                }
            }
        }
    }
}

function fiveDay(data) {
    let c = document.getElementById("containerC")
    let day = data.days
    console.log()
    for (let x = 0; x < 5; x++) {
        let p = document.createElement("p")
        let date = day[x].datetime.split("-")
        c.append(p)
        p.append("\n", "Date: " + date[1] + "-" + date[2] + "-" + date[0],
            "\n", "Temperature: " + Math.round(day[x].temp * 9 / 5 + 32) + " Degrees" + " F",
            "\n", "Conditions: " + day[x].conditions,
            "\n", day[x].description,
        )
    }
}

function navButtons() {
    let hourlyButton = document.getElementById("hourly")
    let weeklyButton = document.getElementById("fiveDay")
    let container = document.getElementById("containerB")
    let container1 = document.getElementById("containerC")
    let title = document.getElementById("forecast")
    let title1 = document.getElementById("weeklyForecast")
    weeklyButton.addEventListener("click", () => {
        title1.style.visibility = "visible";
        title.style.visibility = "hidden";
        container1.style.visibility = "visible";
        container.style.visibility = "hidden";


        hourlyButton.addEventListener("click", () => {
            title1.style.visibility = "hidden";
            title.style.visibility = "visible";
            container1.style.visibility = "hidden";
            container.style.visibility = "visible";


        })
    })
}

function weatherBG(data) {
    let currentCondition = data.currentConditions.conditions
    if (currentCondition == "Rain") {
        document.body.style.backgroundImage = "url('https://media1.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif?cid=ecf05e471vbipwsodtlvxejxnbteynw6twxn5abw348fi79q&rid=giphy.gif&ct=g')"
    }

    else if (currentCondition != "Rain" && currentCondition == "Partially cloudy") {
        document.body.style.backgroundImage = "url('https://media3.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif?cid=ecf05e47y4x15tyqu0acs13tnn77e0w5kxag93xuch4bki2k&rid=giphy.gif&ct=g')"
    }

    else if (currentCondition != "rain" && currentCondition == "Overcast") {
        document.body.style.backgroundImage = "url('https://media1.giphy.com/media/yB3gwsCaymSglI1Jqt/giphy.gif?cid=ecf05e47u26rposlcao2zh6lj6cvwokopew45oco6hs65cxq&rid=giphy.gif&ct=g')"
    }

    else if (currentCondition != "rain" && currentCondition == "Clear") {
        document.body.style.backgroundImage = "url('https://media1.giphy.com/media/jk9L41aToGZQA/giphy.gif?cid=ecf05e474h834vuneklm4mbnh7gwvw984q39s412yid4pu02&rid=giphy.gif&ct=g')"
    }
}
