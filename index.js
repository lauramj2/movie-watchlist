const moviePlaceholder = document.getElementById("movie-placeholder")

moviePlaceholder.innerHTML = `<i class="fa-solid fa-film"></i>
                                <p>Start Exploring</p>`


let moviesArray = []

document.getElementById("search-form").addEventListener("submit", function(e){
    moviesArray = []
    e.preventDefault()
    searchMovies()
}) 

function searchMovies(){
   const searchInput = document.getElementById("search").value
    // const options = {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                     }
    //                 }
    // const url = "http://www.omdbapi.com/?apikey=c44b8d58&?s=" + searchInput

    // console.log(url)
    // fetch(url, options)
    fetch(`http://www.omdbapi.com/?apikey=c44b8d58&?&s=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            // const searchResults = data.Search
            moviesArray = data.Search
            console.log(moviesArray)
            return getMovieHtml(moviesArray)
        })
        .catch(error => {
            moviePlaceholder.innerHTML = `<p>Unable to find what you are looking for.</p>`
        }) 
}

function getMovieHtml(searchArr) {
    const moviesHTML = searchArr.map(movie => {
        // const {Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID} = movie
        return moviePlaceholder.innerHTML = `
                                            <section class="movie-card" id="${movie.imdbID}">
                                                <img class="movie-img" src="${movie.Poster}">
                                                <div class="inner-div">
                                                    <div class="movie-title">
                                                        <h2>${movie.Title}<h2>
                                                        <i class="star"></i>
                                                        <p class="movie-rating">${movie.imdbRating}</p>
                                                    </div>
                                                    <div class="movie-info">
                                                        <p class="runtime">${movie.Runtime}</p>
                                                        <p class="genre">${movie.Genre}</p>
                                                        <button id="add-btn"><i class="fa-solid fa-plus"></i>Watchlist</button>
                                                    </div>
                                                    <p class="description">${movie.Plot}</p>
                                                </div>
                                            </section>
                                            `
    }).join('')

    renderSearch(moviesHTML)
}

function renderSearch(renderHtml){
    document.getElementById("movie-container").innerHTML = renderHtml
    moviePlaceholder.remove()
}


