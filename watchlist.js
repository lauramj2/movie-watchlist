const listPlaceholder = document.getElementById("list-placeholder")
const listContainer = document.getElementById("list-container")
// let storedList = localStorage.getItem("moviesWatch")
// let storedList = JSON.parse(localStorage.getItem("moviesWatch"))
let watchlist = []

//default placeholder
listPlaceholder.innerHTML = `<p>Your watch list is looking a little empty...</p>
                            <a href="index.html"><i class="fa-solid fa-plus"></i> Lets add some movies!</a>`

//remove placeholder if there are items in watchlist
document.addEventListener("DOMContentLoaded", () => {
    const storedList = JSON.parse(localStorage.getItem("moviesWatch")) || []

    if (storedList.length > 0){
        console.log(typeof storedList)
        console.log(storedList)
        listPlaceholder.style.display = "none"
        watchlist = [...storedList]
        // console.log(typeof storedList)
        // renderList(JSON.parse(storedList))
        renderList(watchlist)
    }
    if (storedList.length === 0){
        listPlaceholder.innerHTML = `<p>Your watch list is looking a little empty...</p>
                                    <a href="index.html"><i class="fa-solid fa-plus"></i> Lets add some movies!</a>`
    }
})

async function renderList(list){
    for (const movie of list){
        const container = document.createElement("div")
        container.classList.add("movie-container")
        container.innerHTML = `
                                <div class="movie-card" id="movie-${movie.imdbID}">
                                    <img class="movie-img" src="${movie.Poster}">
                                    <div class="inner-div">
                                        <div class="movie-title">
                                            <h2>${movie.Title}</h2>
                                            <i class="star"></i>
                                            <p class="movie-rating"></p>
                                        </div>
                                        <div class="movie-info">
                                            <p class="runtime"></p>
                                            <p class="genre"></p>
                                            <button class="remove-btn"><i class="fa-solid fa-minus"></i>Remove</button>
                                        </div>
                                        <p class="plot"></p>
                                    </div>
                                </div>
                                `

        const movieRating = container.querySelector(".movie-rating")
        const movieRuntime = container.querySelector(".runtime")
        const movieGenre = container.querySelector(".genre")
        const moviePlot = container.querySelector(".plot")
       
        try {
            const resId = await fetch(`http://www.omdbapi.com/?apikey=c44b8d58&?&i=${movie.imdbID}`)
            const dataId = await resId.json()
            if (dataId.Response === "True"){
                movieRating.textContent = dataId.imdbRating
                movieRuntime.textContent = dataId.Runtime
                movieGenre.textContent = dataId.Genre
                moviePlot.textContent = dataId.Plot
            }
        } catch(err){
            console.error("Error fetching movie details:", err)
        }

        //deal with error images
        const movieImg = container.querySelector(".movie-img")
        movieImg.onerror = () => {
            movieImg.src = "images/not-found.jpg"
        }
        movieImg.src = (movie.Poster && movie.Poster !== "N/A") 
            ? movie.Poster 
            : "images/not-found.jpg"

        listContainer.appendChild(container)  
        
        const removeButton = container.querySelector(".remove-btn")
            removeButton.addEventListener("click", () => {
                const index = watchlist.findIndex(m => m.imdbID === movie.imdbID)
                if (index !== -1){
                    watchlist.splice(index, 1)
                    localStorage.setItem("moviesWatch", JSON.stringify(watchlist))
                    container.remove()
                }
                    // Show placeholder if list is empty
                if (watchlist.length === 0){
                    listPlaceholder.style.display = "block"
                }
            })
    }
}


//  removeButton.addEventListener("click", () => {
//             if (watchlist.includes(`${movie.imdbID}`)){
//                 const movieToRemove = `${movie.imdbID}`
//                 const index = watchlist.indexOf(movieToRemove)
//                 watchlist.splice(index, 1)
//                 localStorage.setItem("moviesWatch", JSON.stringify(watchlist))
//                 console.log(watchlist)
//             } 
//         })



// const resId = await fetch(`http://www.omdbapi.com/?apikey=c44b8d58&?&i=${movie.imdbID}`)
//         const dataId = await resId.json()
       
//         if (dataId.Response === "True"){
//             movieRating.textContent = dataId.imdbRating
//             movieRuntime.textContent = dataId.Runtime
//             movieGenre.textContent = dataId.Genre
//             moviePlot.textContent = dataId.Plot
//         }
