let city, weatherPhoto
let temperature, humidity, wrapper,wind,press,visib,temp_min,temp_max, ref
const date = new Date()
const hour = date.getHours()
const weather = document.querySelector('.weather')
const windowHeight = window.outerHeight;
const moreButton = document.querySelector('.more')
const details = document.querySelector('.details')

const showMoreParams = () =>{
    window.scrollTo(0,window.outerHeight)
}

console.log(hour);
const localiseMe =() =>{
    const GEO_API = 'https://api.ip2loc.com/pi3MnYh27t2XskFcBD9v5g3ftZVPAde5/detect?include=city'

    fetch(GEO_API)
        .then(res=>res.json())
        .then(data=>{
            city.textContent = data.city
           /* console.log(city.textContent.toLowerCase())*/
            const API_KEY='0736b13e976591a5beeea93133fa4c3d'
            const API_W_URL = `https://api.openweathermap.org/data/2.5/weather?q=`+`${city.textContent}`+`&units=metric`+`&appid=`+`${API_KEY}`

            const checkWeather =() => {
                fetch(API_W_URL)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data.message)
                        temperature.textContent = data.main.temp+'°C'
                        humidity.textContent = data.main.humidity+'%'
                        wind.textContent = data.wind.speed+ 'km/h';
                        press.textContent = data.main.pressure+' hPa'
                        visib.textContent = data.visibility+ ' m';
                        temp_min.textContent = data.main.temp_min+ ' °C';
                        temp_max.textContent = data.main.temp_max + ' °C';
                        const weatherArr = Object.assign({}, data.weather)
                        weatherText.textContent = weatherArr[0].main
                        const dwId = weatherArr[0].id
                        console.log(dwId);
                        // storm
                        if(dwId>=200 && dwId<=232)
                        {
                            weatherPhoto.setAttribute('src','./img/storm.png')
                            document.body.setAttribute('style','background: linear-gradient(90deg, rgba(96,96,96,1) 0%, rgba(229,238,172,1) 100%, rgba(17,7,66,1) 100%, rgba(204,196,196,1) 100%);')
                        }
                        // rain
                        else if(dwId>=500 && dwId<=531)
                        {
                            weatherPhoto.setAttribute('src','./img/rain.png')
                            document.body.setAttribute('style','background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(135,131,198,1) 0%, rgba(204,196,196,1) 100%, rgba(0,212,255,1) 100%);')
                        }
                        // clouds and clear
                        else if((dwId>=801 && dwId<=804) || (dwId===800))
                        {
                            weatherPhoto.setAttribute('src','./img/partcloud.png')
                            document.body.setAttribute('style','background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,113,255,1) 0%, rgba(197,245,255,1) 100%, rgba(204,196,196,1) 100%);')
                        }
                        //fog
                        else if((dwId>=701 && dwId<=781))
                        {
                            weatherPhoto.setAttribute('src',"https://img.icons8.com/ios/64/000000/fog-day--v2.png")
                            document.body.setAttribute('style',`background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(83,83,83,1) 0%, rgba(204,196,196,1) 100%, rgba(0,212,255,1) 100%);`)
                        }
                        // night
                        else if(hour>=21)
                        {
                            document.body.setAttribute('style',`background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(12,4,147,1) 0%, rgba(17,7,66,1) 100%, rgba(204,196,196,1) 100%);`)
                            weather.setAttribute('style',`background-color: rgb(2, 2, 48)`)
                            details.setAttribute('style','background-color: rgb(2,2,48')
                        }
                    })
                    .catch(error => console.log(error))
            }
            checkWeather()
        })
        .catch(console.log('error'))
}

const prepareDOMEvents =() =>{
    localiseMe()
    moreButton.addEventListener('click',showMoreParams)
}
const prepareDOMElements =() =>{
    city = document.querySelector('.cityName')
    temperature= document.querySelector('.temp')
    humidity = document.querySelector('.humid')
    weatherText = document.querySelector('.weatherText')
    weatherPhoto = document.querySelector('.city>img')
    wrapper = document.querySelector('.wrapper')
    wind = document.querySelector('.wind')
    press = document.querySelector('.press')
    visib = document.querySelector('.visib')
    temp_min = document.querySelector('.temp_min')
    temp_max = document.querySelector('.temp_max')
    ref = document.querySelector('ref')
}

const main =() =>{
    prepareDOMEvents()
    prepareDOMElements()
}
window.addEventListener('DOMContentLoaded',main)
