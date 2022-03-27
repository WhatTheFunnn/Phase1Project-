window.addEventListener('DOMContentLoaded', () => {
    weatherLoad()
    alert("yeah baby")
})

function weatherLoad() {
    fetch("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json")
    .then(response => response.json())
    .then(data => console.log(data))
}