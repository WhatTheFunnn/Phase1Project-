window.addEventListener('DOMContentLoaded', () => {
    weatherLoad()
    console.log('DOM fully loaded and parsed');
    
})

function weatherLoad() {
    fetch("https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=xml&tzshift=0")
    .then(response => response.json())
    .then(data =>  {
        data.split(' ')
        console.log(data)
    })
}