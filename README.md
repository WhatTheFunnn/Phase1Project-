# Phase1Project-
PROJECT WEATHER APP 

# OPERATIONAL INSTRUCTIONS
    Currently the operational instructions only consist of the hourly and five day navigational buttons. These buttons will allow the interactivity of the divB and divC containers replacing one another with a click. 

    Search bar interactivity for location has been disabled for functional purposes. Pleaes see BUGS below for more information. 

![giphy](https://user-images.githubusercontent.com/97571994/160963965-74ac2dbf-8f3d-4179-b755-7d1cfecbf14f.gif)


# CONFIGURATION:

DomContent loaded()

    Takes in the fetch request from current weather info and loads all information on page load. 
    Takes navButton functionality on from page load.


CurrentWeatherInfo() 

    Takes fetch request from www.visualcrossing.com as an api and parses information into JSON data. Then adds location, temperature, weather conditions, precipitation probability and amount, wind speed, and gust speeds and appends p tags already in index.HTML.
    
    The secondary functionality of CurrentWeatherInfo is to pass the fetch data to the following functions: time, locAndSearch, fiveDay, hourly, and weatherBG.


Time()

    Takes in data from the currentWeatherInfo function and breaks it down to a date string index of 3 and into a time string index of 3. The date is broken down and rearranged from year-month-day to day-month-year and the information from index 1 and 2 is is converted into a 12 hour instead of 24. Then a variable for the number 0 is set to 12 and an if statement is used to determine AM or PM, which returns the time in a 12 hour format and the date in correct format, which is then appended to the divA container.


LocAndSearch()

    Takes in data from the currentWeatherInfo function. Then the address is splut into a string index of 2, where the first index (city's), 1st character is returned to uppercase and added back to the city. The temperature is then grabbed from data in celsius and appended to nav bar being converted  into farenheit. The city and state are also appended to the navbar.

    Currently the Search function has been disabled and removed, please check bugs for more information.


Hourly()

    Takes in data from the currentWeatherInfo function. The time data is then converted into a string index of 3. Using the 1st index, the time has been used with an if function and an interation loop to determine AM, PM, and what hours to display. The Time is then converted to a 12 hour clock and then appended with condition for the hour(data.conditions) and the temperature (data.temperature) to the divB container.


FiveDay()

    Takes in data from the currentWeatherInfo function. The day takes the array of 24 for days and it creates a day for the current day as well as the next four days each with a string index of 3 for year-month-day. The 2nd and 3rd index are used to get the date and month and appends them to a divC container p tag for days. The temperature is then taken from the specific day and converted into farenheit, then appended to the divC container with p tag for temperature. Finally the conditions are also taken from a the specific day and appended to the divC container with the p tag for conditions. 
    
NavButtons()

    Uses the document.getElementByID to grab h3 and div container elements. Two event listeners have been added for a click event. When the event triggers the visible container will be made hidden and then hidden container will take its place as it becomes visible. This works for both buttons, although all the information is always present on the screen. 


WeatherBG()

    Takes in data from the currentWeatherInfo function. It then takes the divA, divB, and divC containers with a get element by id and sets them to individual variables. A If conditional is this set to look for the current conditions and compare them to rain, overcast, partially cloudy, and clear. The backgounds of the individual div's is updated to reflect the current weather conditions.



# FILES:

    Index.css
    Index.html
    Index.js
    Index.JSON
    README.md



# CONTACT INFORMATION:


    You may contact the Developer Dan Souza @ username@fakeEmail.com



# COPYRIGHT INFO:


Raining World Travel GIF - Find & Share on GIPHY  - Andrii Sirenko
    https://media1.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif?cid=ecf05e471vbipwsodtlvxejxnbteynw6twxn5abw348fi79q&rid=giphy.gif&ct=g

Happy Sunny Day GIF by MonA Hayslett 
    https://media3.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif?cid=ecf05e47y4x15tyqu0acs13tnn77e0w5kxag93xuch4bki2k&rid=giphy.gif&ct=g


Clouds Weather GIF By Feliks Tomasz Konczakowski
    https://media1.giphy.com/media/yB3gwsCaymSglI1Jqt/giphy.gif?cid=ecf05e47u26rposlcao2zh6lj6cvwokopew45oco6hs65cxq&rid=giphy.gif&ct=g

Observer Theme - BY ZACK SULTAN
    https://media1.giphy.com/media/jk9L41aToGZQA/giphy.gif?cid=ecf05e474h834vuneklm4mbnh7gwvw984q39s412yid4pu02&rid=giphy.gif&ct=g


Magnifying glass 
    https://freesvg.org/img/magnifying-glass.png

API weather information from Visual Crossing
    https://www.visualcrossing.com/weather/weather-data-services



# BUGS:

CurrentWeather()

    1. The time is off on the current weather. This is not because of a coding or clarical error. The issue comes from the API information being updated irreguarly. Time has been cross referenced to the api and the data on the page does match the API itself.

LocAndSearch()

    1. Currently the Search function has been disabled and removed from the page, as it is not currently operational. All code has been commented out for future use.


FiveDay()

    1. The data was not able to be iterated through without causing the divC container to disappear completely. So everything was written long hand. This may be rewritten in the future, but code is repetitive.  

WeatherBG()

    1. Each individual div had to be updated. If the div's were grabbed together or added together into a variable and were updated. The style element would not trigger or recognize that it was a CSS element. 

    2. Sometimes the if conditional statement does not load the correct background image to match the divA container condition. 
