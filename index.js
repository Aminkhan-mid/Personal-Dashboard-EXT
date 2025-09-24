const time = document.getElementById("time")
const pokemon = document.getElementById("pokemon")

// async function fetchRandomUnsplashImg() {
// const accessKey = `kZoo-fy-KtJEGUao4qdcCg9gyhahcTDyq7EWuGxs-GE`
//     const apiUrl = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${accessKey}`
//     try{
//         const res = await fetch(apiUrl)
//         if(!res.ok){
//             throw new Error (`HTTP error! status: ${res.status}`)
//         }
//         const data = await res.json()
//         const imageUrl = data.urls.regular
//         document.body.style.backgroundImage = `url(${imageUrl})`
//     }
//     catch{
//         console.error("Error fetching Unsplash image:", error)
//     }
// }
// fetchRandomUnsplashImg()

function getLocalTime(){
    const now = new Date().toLocaleTimeString("en-US", {timeStyle:"short"})
    time.innerHTML = now

}
setInterval(getLocalTime, 1000)



async function getPokemonGIF(){
    const id = Math.floor(Math.random()*1010) + 1
    console.log(id)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()
    const gifUrl = data.sprites.versions["generation-v"]["black-white"].animated.front_default 
               || data.sprites.other["official-artwork"].front_default
               || data.sprites.front_default;
    pokemon.innerHTML = 
    `   <img src="${gifUrl}" alt="pokemon"/>
        <p>${data.name}</p>
    `
    console.log(gifUrl)
}

getPokemonGIF()



    // Access key: kZoo-fy-KtJEGUao4qdcCg9gyhahcTDyq7EWuGxs-GE
    // Secret key: sxfbEZWz0Dc-wqFC4WwPDY5YCmExk2RXRja1pjGbnNI
