const weather = document.getElementById("weather")
const time = document.getElementById("time")
const quote = document.getElementById("quote")
const pokemon = document.getElementById("pokemon")
const abilities = document.getElementById("abilities")



navigator.geolocation.getCurrentPosition(async position => {
  const crd = position.coords;
  const latitude = crd.latitude;
  const longitude = crd.longitude;
  const apiKey = "1ad29d4803cb3b86c237422b71268c9d";

  try{
      const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
          if(!res.ok){
            throw Error("Something Went Wrong!")
          }
          const data = await res.json();
          const iconID = data.weather[0].icon
          const weatherIcon = `https://openweathermap.org/img/wn/${iconID}@2x.png`
          weather.innerHTML = 
          `
        <div class="weather-child">
            <img class="weather-icon" src="${weatherIcon}" alt="${data.weather[0].description}"/>
            <p class="city-name">${data.name}</p>
        </div>
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

async function fetchRandomQuotes() {
    const res = await fetch(`https://thequoteshub.com/api/success`)
    const data = await res.json()
    quote.innerHTML = 
    `
    <p>${data.text}</p>
    <p>${data.author}</p>
    `
}
fetchRandomQuotes()


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
                <p>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
                ${abilitiesHTML}
            `
    }
    if (!gifUrl){
        return getPokemonGIF();
    } 
}
getPokemonGIF()

// array has an obj, which has another obj

