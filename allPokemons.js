const pokemonHtml = document.getElementById("pokemon-html")

const typeColors = {
  electric: "#FFD76A",
  ground: "#D4A373",
  fire: "#FF6B6B",
  water: "#4D9DE0",
  grass: "#81C784",
  bug: "#A8D08D",
  poison: "#A569BD",
  psychic: "#F48FB1",
  rock: "#A1887F",
  ice: "#81D4FA",
  dragon: "#9575CD",
  ghost: "#7E57C2",
  dark: "#6D4C41",
  fairy: "#F8BBD0",
  fighting: "#E57373",
  normal: "#E0E0E0",
  steel: "#B0BEC5",
  flying: "#90CAF9"
};


async function getAllPokemons() {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        if(!res.ok){
            throw new Error("something went worng!")
        }
        const data = await res.json()
        for(let pokemon of data.results){
            
            const pokeapi = pokemon.url

            fetch(pokeapi)
                .then(res => res.json())
                .then(data => {
                    const gif =     data.sprites.versions["generation-v"]["black-white"].animated.front_default || data.sprites.front_default || data.sprites.other["official-artwork"].front_default
                    
                    const type = data.types[0].type.name
            
                     pokemonHtml.innerHTML += `
                    <div class="pokemon-container">
                        <img src="${gif}" alt="pikachu">
                        <div class="pokemon-detail">
                            <p class="pokemon-name">${name}</p>
                            <p class="pokemon-type"
                                style="background-color:${typeColors[type]|| '#f5f5f5'}">
                                ${type}</p>
                        </div>
                    </div>`
                })

            const name = pokemon.name
        }
    } 
    catch (err){
        console.error(err)
    }
}
getAllPokemons()


