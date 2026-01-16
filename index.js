const moviePlaceholder = document.getElementById("movie-placeholder")
const movieList = document.getElementById("movie-list")

let watchlist = []

// Add default placeholder where movies will go 
moviePlaceholder.innerHTML = `<i class="fa-solid fa-film"></i>
                                <p>Start Exploring</p>`


// Event listener on search form
document.getElementById("search-form").addEventListener("submit", function(e){
    e.preventDefault()
    //clear previous search
    movieList.innerHTML = ""
    searchMovies()
}) 

// Search by movie title
async function searchMovies(){
    //get search input
    const searchInput = document.getElementById("search").value

    const res = await fetch(`http://www.omdbapi.com/?apikey=c44b8d58&?&s=${searchInput}`)
    const data = await res.json()

    //call render function with fetched data
    if (data.Response === "True"){
        // console.log(data.Search)
        renderMovies(data.Search)
        // localStorage.setItem("movies", JSON.stringify(data.Search))
    } else {
        moviePlaceholder.innerHTML = `<p>Unable to find what you are looking for.</p>`
    }
}

function renderMovies(searchArr){
    moviePlaceholder.remove()
    searchArr.forEach(async movie => {
        const movieContainer = document.createElement("div")
        movieContainer.id = "movie-container"
        movieContainer.innerHTML = `
                                    <div class="movie-card" id="${movie.imdbID}">
                                        <img class="movie-img" src="${movie.Poster}">
                                        <div class="inner-div">
                                            <div class="movie-title">
                                                <h2>${movie.Title}<h2>
                                                <i class="star"></i>
                                                <p id="movie-rating"></p>
                                            </div>
                                            <div class="movie-info">
                                                <p id="runtime"></p>
                                                <p id="genre"></p>
                                                <button id="add-btn"><i class="fa-solid fa-plus"></i>Watchlist</button>
                                            </div>
                                            <p id="plot"></p>
                                        </div>
                                    </div>
                                    `
        
        const addButton = movieContainer.querySelector("#add-btn")

        addButton.addEventListener("click", function(){
            if (!watchlist.includes(`${movie.imdbID}`)){
                watchlist.push(`${movie.imdbID}`)
                localStorage.setItem("movies", JSON.stringify(watchlist))
                console.log(watchlist)
            } 
        })
        

        const movieRating = movieContainer.querySelector("#movie-rating")
        const movieRuntime = movieContainer.querySelector("#runtime")
        const movieGenre = movieContainer.querySelector("#genre")
        const moviePlot = movieContainer.querySelector("#plot")
       
        const resId = await fetch(`http://www.omdbapi.com/?apikey=c44b8d58&?&i=${movie.imdbID}`)
        const dataId = await resId.json()
       
        if (dataId.Response === "True"){
            movieRating.textContent = dataId.imdbRating
            movieRuntime.textContent = dataId.Runtime
            movieGenre.textContent = dataId.Genre
            moviePlot.textContent = dataId.Plot
        }
    
        movieList.appendChild(movieContainer)                                             
    })
}

// const moviesStored = JSON.parse(localStorage.getItem("movies"))

// function addToWatchlist(movieId){
//     watchlist.push(movieId)
//     console.log(watchlist)
//     // localStorage.setItem("movies", JSON.stringify(data.Search))
// }





// let moviesArray = []
    // const options = {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                     }
    //                 }
    // const url = "http://www.omdbapi.com/?apikey=c44b8d58&?s=" + searchInput

    // console.log(url)
    // fetch(url, options)



     // console.log("hello")
    // console.log(typeof movieRender.split(" "))
    // renderSearch(moviesHTML)
    // console.log("hello")
    // return renderSearch(movieRender.split(" "))