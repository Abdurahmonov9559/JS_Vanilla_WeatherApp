const api = {
    key: 'fbcd674d9b00b916f78f3445f81d2ad8',
    baseurl: 'https://api.openweathermap.org/data/2.5/',
}

const searchBox = document.querySelector('.search-box')

searchBox.addEventListener('keypress', setQuery)

getResults('tashkent')


function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchBox.value)
        console.log(searchBox.value)
    }
}

function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json()
        })
        .then(displayResults)
}

let city = document.querySelector('.location .city')
let date = document.querySelector('.location .date')
let temp = document.querySelector('.temp')
let hilow = document.querySelector('.hi-low')
let weatherEl = document.querySelector('.weather')

function displayResults(weather){
    console.log(weather)
    city.innerHTML = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    date.innerHTML = dateBuilder(now)

    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    weatherEl.innerHTML = weather.weather[0].main

    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`

    clear()
}

function dateBuilder(s){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']   

    let day = days[s.getDay()]
    let date = s.getDate()  
    let month = months[s.getMonth()]
    let year = s.getFullYear()

    return `${day} ${date} ${month} ${year}`
}

function clear(){
    searchBox.value = ''
}
