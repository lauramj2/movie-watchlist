const moviePlaceholder = document.getElementById("movie-placeholder")
const movieList = document.getElementById("movie-list")

let watchlist = []

// Add default placeholder where movies will go 
moviePlaceholder.innerHTML = `<i class="fa-solid fa-film"></i>
                                <p>Start Exploring</p>`


// Event listener on search form
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault()
    //clear previous search
    movieList.innerHTML = ""
    searchMovies()
}) 

// Search by movie title
async function searchMovies(){
    //get search input
    const searchInput = document.getElementById("search").value

    //fetch data from API
    const res = await fetch(`http://www.omdbapi.com/?apikey=c44b8d58&?&s=${searchInput}`)
    const data = await res.json()

    //call render function with fetched data and save to local storage
    if (data.Response === "True"){
        const localMovies = localStorage.setItem("movies", JSON.stringify(data.Search))
        renderMovies(data.Search)
    } else {
        moviePlaceholder.innerHTML = `<p>Unable to find what you are looking for.</p>`
    }
}

async function renderMovies(searchArr){
    moviePlaceholder.style.display = "none"
    for (const movie of searchArr){
        const movieContainer = document.createElement("div")
        movieContainer.id = "movie-container"
        movieContainer.innerHTML = `
                                    <div class="movie-card" id="${movie.imdbID}">
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
                                                <button class="add-btn"><i class="fa-solid fa-plus"></i>Watchlist</button>
                                            </div>
                                            <p class="plot"></p>
                                        </div>
                                    </div>
                                    `                   
        const addButton = movieContainer.querySelector(".add-btn")

        addButton.addEventListener("click", () => {
            if (!watchlist.includes(`${movie.imdbID}`)){
                watchlist.push(`${movie.imdbID}`)
                const localList = localStorage.setItem("moviesWatch", JSON.stringify(watchlist))
                // console.log(watchlist)
            } 
        })

        const movieRating = movieContainer.querySelector(".movie-rating")
        const movieRuntime = movieContainer.querySelector(".runtime")
        const movieGenre = movieContainer.querySelector(".genre")
        const moviePlot = movieContainer.querySelector(".plot")
       
        const resId = await fetch(`http://www.omdbapi.com/?apikey=c44b8d58&?&i=${movie.imdbID}`)
        const dataId = await resId.json()
       
        if (dataId.Response === "True"){
            movieRating.textContent = dataId.imdbRating
            movieRuntime.textContent = dataId.Runtime
            movieGenre.textContent = dataId.Genre
            moviePlot.textContent = dataId.Plot
        }

        //deal with error images
        const movieImg = movieContainer.querySelector(".movie-img")
        movieImg.onerror = () => {
            movieImg.src = "images/not-found.jpg"
        }
        movieImg.src = (movie.Poster && movie.Poster !== "N/A") 
            ? movie.Poster 
            : "images/not-found.jpg"
    
        movieList.appendChild(movieContainer)
    }
}



// // Preserve search on page reload
// document.addEventListener("DOMContentLoaded", () => {
//     renderMovies(JSON.parse(localStorage.getItem("movies")))
// })






// const moviesStored = JSON.parse(localStorage.getItem("movies"))

// function addToWatchlist(movieId){
//     watchlist.push(movieId)
//     console.log(watchlist)
//     // localStorage.setItem("movies", JSON.stringify(data.Search))
// }



