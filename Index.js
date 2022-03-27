let weatherData = []

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    weatherLoad()
})

function weatherLoad(){
    fetch("https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0")
    .then(response => response.json())
    .then(stats => 
        console.log(stats.dataseries)
    )
}