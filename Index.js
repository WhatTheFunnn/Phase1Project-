document.addEventListener('DOMContentLoaded', () => {
    currentWeatherInfo()
    navButtons()
});

function currentWeatherInfo() {
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/colton%20OR?unitGroup=metric&key=D7EWQSWC4XASA23DCSMD9M4ZH&contentType=json"

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let location = data.resolvedAddress.split(",")
            let newLocation = (location[0] + "," + location[1])
            let locationField = document.getElementById("location")
            locationField.append("Location: ", newLocation)

            let temp = data.currentConditions.temp
            let tempField = document.getElementById("temp")
            tempField.append("Temperature: ", temp * 9 / 5 + 32, " Degrees", " F")

            let conditions = data.currentConditions.conditions
            let condField = document.getElementById("conditions")
            condField.append("Condition: ", conditions)

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
            locAndSearch(data, url)
            fiveDay(data)
            hourly(data)
            weatherBG(data)
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

function locAndSearch(data, url) {
    let location = data.address.split(" ")
    let city = location[0].charAt(0).toUpperCase() + location[0].slice(1)
    let state = location[1]
    let temp = data.currentConditions.temp
    let locationField = document.getElementById("cityandstate")
    locationField.append(" ", temp * 9 / 5 + 32 + " F. | ", " ")
    locationField.append(city, ", ", state,)

    // let searchBar = document.getElementById("search")
    // locationField.append(searchBar)

    // searchBar.addEventListener('search', (e) => {
    //     let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/spokane%20WA?unitGroup=metric&key=D7EWQSWC4XASA23DCSMD9M4ZH&contentType=json"
         
    //     currentWeatherInfo(url)
    
            
        //Will have to get search bar to use location suggestion.
        // then call on the current weather info function 
        // then update the element of city and state in the url
       
        
    // })
        
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
                    newTemp.append("Temperature: ", newHour.temp * 9 / 5 + 32 + " F")
                    newCond.append("Conditions: ", newHour.conditions)
                }   
                
               else {
                    newTime.append("Time: ", newHour.datetime.split(":")[0] % 12, " PM")
                    newTemp.append("Temperature: ", newHour.temp * 9 / 5 + 32 + " F")
                    newCond.append("Conditions: ", newHour.conditions)
                }
            }
        }
    }
}

function fiveDay(data) {

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
    let a = document.getElementById("containerA")
    let b = document.getElementById("containerB")
    let c = document.getElementById("containerC")
    if (currentCondition == "Rain") {
        a.style.backgroundImage = "url('https://media1.giphy.com/media/yB3gwsCaymSglI1Jqt/giphy.gif?cid=ecf05e47u26rposlcao2zh6lj6cvwokopew45oco6hs65cxq&rid=giphy.gif&ct=g')"
        b.style.backgroundImage = "url('https://media1.giphy.com/media/yB3gwsCaymSglI1Jqt/giphy.gif?cid=ecf05e47u26rposlcao2zh6lj6cvwokopew45oco6hs65cxq&rid=giphy.gif&ct=g')"
        c.style.backgroundImage = "url('https://media1.giphy.com/media/yB3gwsCaymSglI1Jqt/giphy.gif?cid=ecf05e47u26rposlcao2zh6lj6cvwokopew45oco6hs65cxq&rid=giphy.gif&ct=g')"
    }

    else if (currentCondition != "Rain" && currentCondition == "Partially cloudy") {
        a.style.backgroundImage = "url('https://media1.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif?cid=ecf05e471vbipwsodtlvxejxnbteynw6twxn5abw348fi79q&rid=giphy.gif&ct=g')"
        b.style.backgroundImage = "url('https://media1.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif?cid=ecf05e471vbipwsodtlvxejxnbteynw6twxn5abw348fi79q&rid=giphy.gif&ct=g')"
        c.style.backgroundImage = "url('https://media1.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif?cid=ecf05e471vbipwsodtlvxejxnbteynw6twxn5abw348fi79q&rid=giphy.gif&ct=g')"
    }

    else if (currentCondition != "Partially cloudy" && currentCondition == "Overcast") {
        a.style.backgroundImage = "url('https://media3.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif?cid=ecf05e47y4x15tyqu0acs13tnn77e0w5kxag93xuch4bki2k&rid=giphy.gif&ct=g')"
        b.style.backgroundImage = "url('https://media3.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif?cid=ecf05e47y4x15tyqu0acs13tnn77e0w5kxag93xuch4bki2k&rid=giphy.gif&ct=g')"
        c.style.backgroundImage = "url('https://media3.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif?cid=ecf05e47y4x15tyqu0acs13tnn77e0w5kxag93xuch4bki2k&rid=giphy.gif&ct=g')"
    }

    else if (currentCondition != "Overcast" && currentCondition == "Clear") {
        a.style.backgroundImage = "url('https://media1.giphy.com/media/yB3gwsCaymSglI1Jqt/giphy.gif?cid=ecf05e47u26rposlcao2zh6lj6cvwokopew45oco6hs65cxq&rid=giphy.gif&ct=g')"
        b.style.backgroundImage = "url('https://media1.giphy.com/media/yB3gwsCaymSglI1Jqt/giphy.gif?cid=ecf05e47u26rposlcao2zh6lj6cvwokopew45oco6hs65cxq&rid=giphy.gif&ct=g')"
        c.style.backgroundImage = "url('https://media1.giphy.com/media/yB3gwsCaymSglI1Jqt/giphy.gif?cid=ecf05e47u26rposlcao2zh6lj6cvwokopew45oco6hs65cxq&rid=giphy.gif&ct=g')"
    }
}