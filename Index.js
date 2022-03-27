document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    weatherLoad()
})

function weatherLoad(){
    fetch("https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0")
    .then(response => response.json())
    .then(data => {
        const date = data.init.split("", 8)
        let year = date.slice(0,4) 
        let day = date.slice(4,6)
        let month = date.slice(6,8)
        let newDate = (day.join("") + - + month.join("") + - + year.join("")) 
        let today = new Date();
        let twelveHourTime = ((today.getHours() + 13) % 12)
        let  hrsAndMins = twelveHourTime + ":" + today.getMinutes()
        
        let dataField = document.getElementById("weatherinfo");
        dataField.append("Todays Date: ", newDate, " " ,)
        dataField.append(" Time: ", hrsAndMins, )


        let current = data.dataseries[0]
        let threeHour = data.dataseries[1]
        let cloudCover = threeHour.cloudcover
        let currentTemp = current.temp2m
        let threeHourTemp = (threeHour.temp2m * 9/5 + 32)
        console.log(currentTemp)
    })
}