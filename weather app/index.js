const API_KEY = 'a86c20bb483f0b745f975378b380072b'
const locate = document.querySelector('.location')
const dateTime = document.querySelector('.date-time')
const temperature = document.querySelector('.temperature')
const condition = document.querySelector('.condition')
const visibility = document.querySelector('.visibility').querySelector('div')
const humidity = document.querySelector('.humidity').querySelector('div')
const pressure = document.querySelector('.pressure').querySelector('div')

async function search(event, ele) {
  if (event.key === 'Enter') {
    const cityName = ele.value.trim().replace(/\s+/g, '')
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    const data = await getData(url)
    console.log(data)
    display(data)
  }
}

async function getData(url) {
  try {
    let res = await fetch(url)
    return await res.json()
  } catch (error) {
    console.log('[getData]: ', error)
  }
}

function getLocation() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        return position.coords
      })
    }
  } catch (error) {
    console.log('[getLocation]: ', error)
  }
}

window.onload = async () => {
  const coords = getLocation()
  console.log(coords)
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${API_KEY}`
  const data = await getData(url)
  console.log(data)
  display(data)
}

function display(data) {
  let today = new Date()
  let date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  let currentDateTime = date + ' ' + time

  locate.innerText = data?.name + ', ' + data?.sys?.country
  dateTime.innerText = currentDateTime
  temperature.innerText = data?.main?.temp + '°C'
  condition.innerText = data?.weather[0]?.main
  visibility.innerText = data?.visibility + 'm'
  humidity.innerText = data?.main?.humidity + '%'
  pressure.innerText = data?.main?.pressure + 'hPa'
}
