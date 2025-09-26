import { trainerQuotes } from "./trainerQuotes.js"
const weather = document.getElementById("weather")
const time = document.getElementById("time")
const quote = document.getElementById("quote")
const pokemon = document.getElementById("pokemon")
const allPokemons = document.getElementById("allPokemonBtn")





navigator.geolocation.getCurrentPosition(async position => {
  const crd = position.coords;
  const latitude = crd.latitude;
  const longitude = crd.longitude;
  const apiKey = "1ad29d4803cb3b86c237422b71268c9d";

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`)
    const data = await res.json()
    const buttonGif = data.sprites.versions["generation-v"]["black-white"].animated.back_default  
    console.log(buttonGif)
    console.log("hello")
  try{
      const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
          if(!res.ok){
            throw Error("Something Went Wrong!")
          }
          const data = await res.json();
          const iconID = data.weather[0].icon
          const weatherIcon = `https://openweathermap.org/img/wn/${iconID}@2x.png`
          weather.innerHTML = `
        <div class="weather-child">
            <img class="weather-icon" src="${weatherIcon}" alt="${data.weather[0].description}"/>
            <p class="city-name">${data.name}</p>
            </div>
          `
          allPokemons.innerHTML = `
                <img src="${buttonGif}" alt="pikachu">
          `
        }
        catch(err){
            console.log(err)
        }
});



function getLocalTime(){
    const now = new Date().toLocaleTimeString("en-US", {timeStyle:"short"})
    time.innerHTML = now

}
setInterval(getLocalTime, 1000)

function getTodayDate(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date().getDate()

    const d = new Date()
    const m = new Date()
    let day = days[d.getDay()].substring(0,3)
    let month = months[m.getMonth()].substring(0,3)

     document.getElementById("dates").innerHTML += `<p>${day} ${date} ${month}</p>`

}
setInterval(getTodayDate(),  3600000)

function getRandomQuote(){
    const randomQuote = Math.floor(Math.random() * trainerQuotes.length) + 1
    quote.innerHTML = `<p class="quote">${trainerQuotes[randomQuote]}</p>`
}
    getRandomQuote()


async function getPokemonGIF(){
    const id = Math.floor(Math.random() * 649) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()

    const ability = data.abilities

    const abilitiesHTML = ability.map(type =>{ 
       return  `<p class="ability">${type.ability.name}</p>`
    }).join("")

    const gifUrl = data.sprites.versions["generation-v"]["black-white"].animated.front_default 
    if(gifUrl){
            pokemon.innerHTML = 
            `   <img class="pokemon-img" src="${gifUrl}" alt="pokemon"/>
                <p class="pokemon-name">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
                <p class="abilityHead">Abilities: </p>
                <div class="abilityDiv">
                    ${abilitiesHTML}
                </div>
            `
    }
    if (!gifUrl){
        return getPokemonGIF();
    } 
}
getPokemonGIF()



