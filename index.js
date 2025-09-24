

fetch(`http://localhost:3000/api/manga`)
    .then(res=> res.json())
    .then(data => {
        console.log(data)
    })