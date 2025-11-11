const moviePlaceholder = document.getElementById("movie-placeholder").innerHTML = `<i class="fa-solid fa-film"></i>
                                                                                    <p>Start Exploring</p>`

document.getElementById("search-form").addEventListener("submit", function(e){
    e.preventDefault()
    const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                        }
                    }
    const searchInput = document.getElementById("search").value
    const url = "http://www.omdbapi.com/?apikey=c44b8d58&?s=" + searchInput

    console.log(url)
    // fetch(url, options)
    //     .then(res => res.json())
    //     .then(data => console.timeLog(data))
}) 

function getMovieHtml(searchArr = placeholderArr) {
    return searchArr.map(item => {
        const {
            //deconstruct returned thing from api
        } = item
        return `
            <section class="movie-card">
                <img>
                <div class="movie-title>
                    <h2>Movie Title<h2>
                    //ratings
                </div>
                <div class="movie-info">
                    // movie runtime
                    //movie genres
                    <button id="add-btn"><i class="fa-solid fa-plus"></i>Watchlist</button>
                </div>
                <p>Description</p>
            </section>
            <hr>
            `
    }).join("")
}

function renderSearch(){
    document.getElementById("movie-container").innerHTML = getMovieHtml
    moviePlaceholder.remove()
}


