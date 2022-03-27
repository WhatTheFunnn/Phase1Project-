document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    weatherLoad()
})

function weatherLoad(){
    size = 3 
    fetch("https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0")
    .then(response => response.json())
    .then(data => { 
        const date = data.init.split("", 8)
        let year = date.slice(0,4) 
        let day = date.slice(4,6)
        let month = date.slice(6,8)
        let newDate = (day.join("") + - + month.join("") + - + year.join(""))
        //const fiveDay = 
        //const oneDay = 
        const threeHour = data.dataseries[0];
        let dataField = document.getElementById("weatherinfo");
        dataField.append("Todays Date: ", newDate)
          console.log(threeHour)
    })
}