document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    weatherLoad()
})

function weatherLoad(){
    size = 3 
    fetch("https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0")
    .then(response => response.json())
    .then(data => { 
        //const fiveDay = 
        //const oneDay = 
        const twentyFourHour = data.dataseries;
        const threeHour = twentyFourHour.splice(0, size);
        let card = document.getElementsByClassName("card");
        card.append(threeHour)
          
    })
}