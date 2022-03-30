document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    currentWeatherInfo()
    navButtons()
});

function currentWeatherInfo() {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/colton%20OR?unitGroup=metric&key=D7EWQSWC4XASA23DCSMD9M4ZH&contentType=json")
        .then(response => response.json())
        .then(data => {

            let temp = data.currentConditions.temp
            let tempField = document.getElementById("temp")
            tempField.append(" ", temp * 9 / 5 + 32, " Degrees", " F")

            let conditions = data.currentConditions.conditions
            let condField = document.getElementById("conditions")
            condField.append("Condition: ", conditions)

            let location = data.resolvedAddress.split(",")
            let newLocation = (location[0] + "," + location[1])
            let locationField = document.getElementById("location")
            locationField.append(newLocation)

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
            weekly(data)
            // weatherBG(data)
            hourly(data)
        })
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
    dateField.append("Date: " + month + "-" + day + "-" + year, " ")
    if (time > "11:59:59") {
        timeField.append(hour, ":", minutes, " PM")
    }
    else if (time < "11:59:59") {
        timeField.append(hour, ":", minutes, "AM")
    }
};

function locAndSearch(data) {
    let location = data.address.split(" ")
    let city = location[0].charAt(0).toUpperCase() + location[0].slice(1)
    let state = location[1]
    let temp = data.currentConditions.temp
    let locationField = document.getElementById("cityandstate")
    locationField.append(" ", temp * 9 / 5 + 32 + " F. | ", " ")
    locationField.append(city, ", ", state,)

    let searchBar = document.getElementById("search")
    locationField.append(searchBar)

    searchBar.addEventListener('search', (e) => {
        alert("hi")
        //Will have to get search bar to use location suggestion.
        // then call on the current weather info function 
        // then update the element of city and state in the url
    })
};

function hourly(data) {
    let container = document.getElementById("containerB")

    let time = data.currentConditions.datetime.split(":")
    let hour = (time[0])
    let today = data.days[0]
    let hours = today.hours
    let currentHour = document.createElement("h4")
    let currentTemp = document.createElement("p")
    container.append(currentHour)
    container.append(currentTemp)

    if (hour) {
        for (let x = 0; x < hours.length; x++) {
            let newHour = hours[x]

            if (hour === newHour.datetime.split(":")[0] && hour < 12) {
                currentHour.innerText = "Time: " + hour % 12 + " AM"
                currentTemp.innerText = "Temperature: " + (newHour.temp * 9 / 5 + 32) + " F"
            }

            else if (hour === newHour.datetime.split(":")[0] && hour <= 23) {
                currentHour.innerText = "Time: " + hour % 12 + " PM"
                currentTemp.innerText = "Temperature: " + (newHour.temp * 9 / 5 + 32) + " F"
            }
        }

            // for (let x = 0; x < hours.length; x++) {
            //     newHour = ++hour
            //     if (newHour == (hours[newHour].datetime.split(":")[0])) {
            //         let newT = document.createElement("h4")
            //         let newP = document.createElement("p")
            //         container.append(newT)
            //         container.append(newP)
            //         if (newHour > 11 && newHour < 25) {
            //             newT.append("Time: ", hours[newHour].datetime.split(":")[0] % 12, " PM")
            //         }
            //         else if (newHour >= 0 && newHour < 12) {
            //             newT.append("Time: ", hours[newHour].datetime.split(":")[0] % 12, " AM")
            //         }
            //         newP.append("Temperature: ", hours[newHour].temp * 9 / 5 + 32 + " F")
            //     }
            // }
        }
    }

    function weekly(data) {

        let dayOne = data.days[0].datetime.split("-")
        document.getElementById("dayA").append(dayOne[1] + "/" + dayOne[2])
        document.getElementById("dayATemp").append("Temperature: ", data.days[0].temp * 9 / 5 + 32 + " F")
        document.getElementById("dayACond").append("Conditions: ", data.days[0].conditions)

        let dayTwo = data.days[1].datetime.split("-")
        document.getElementById("dayB").append(dayTwo[1] + "/" + dayTwo[2])
        document.getElementById("dayBTemp").append("Temperature: ", data.days[1].temp * 9 / 5 + 32 + " F")
        document.getElementById("dayBCond").append("Conditions: ", data.days[1].conditions)

        let dayThree = data.days[2].datetime.split("-")
        document.getElementById("dayC").append(dayThree[1] + "/" + dayThree[2])
        document.getElementById("dayCTemp").append("Temperature: ", data.days[2].temp * 9 / 5 + 32 + " F")
        document.getElementById("dayCCond").append("Conditions: ", data.days[2].conditions)

        let dayFour = data.days[3].datetime.split("-")
        document.getElementById("dayD").append(dayFour[1] + "/" + dayFour[2])
        document.getElementById("dayDTemp").append("Temperature: ", data.days[3].temp * 9 / 5 + 32 + " F")
        document.getElementById("dayDCond").append("Conditions: ", data.days[3].conditions)

        let dayFive = data.days[4].datetime.split("-")
        document.getElementById("dayE").append(dayFive[1] + "/" + dayFive[2])
        document.getElementById("dayETemp").append("Temperature: ", data.days[4].temp * 9 / 5 + 32 + " F")
        document.getElementById("dayECond").append("Conditions: ", data.days[4].conditions)



    }

    function navButtons() {
        let hourlyButton = document.getElementById("hourly")
        let weeklyButton = document.getElementById("weekly")
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

// function weatherBG(data) {
//     console.log(data)
//     let currentCondition = data.currentConditions.conditions
//     if (currentCondition.innerText = "overcast") {
//         document.getElementById("navBar").style.backgroundImage =
//             "url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Overcast_skies_from_Tropical_Storm_Danny.jpg/1200px-Overcast_skies_from_Tropical_Storm_Danny.jpg?20091209195310')"
//     }
//     else {

//     }
// }