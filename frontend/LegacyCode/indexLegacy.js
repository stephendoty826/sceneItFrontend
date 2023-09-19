
const apiKey = "c308ac58"

let searchString = ""

let currentPage = 1;

let movieContainer

document.addEventListener("DOMContentLoaded", () => {


  movieContainer = document.querySelector(".movieContainer")

  // event listener on form
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault()

    searchString = document.getElementById("search-bar").value

    let urlEncodedSearchString = encodeURIComponent(searchString)

    fetchMovieData(urlEncodedSearchString)
    
  })


  const prevNextContainer = document.querySelector("#prevNextContainer")

  //Event listener on prevNextContainer to go to previous or next page
  prevNextContainer.addEventListener("click", (e)=>{

    let urlEncodedSearchString = encodeURIComponent(searchString)

    if(e.target.innerHTML === "next" && currentPage !== 5){
      currentPage++
      fetchMovieData(urlEncodedSearchString)
    }
    else if(e.target.innerHTML === "prev" && currentPage !== 1){
      currentPage--
      fetchMovieData(urlEncodedSearchString)
    }

  })



  const paginationContainer = document.querySelector("#paginationContainer")

  //Event listener on pagination at bottom of home page to load different pages of movies
  paginationContainer.addEventListener("click", (e)=>{

    currentPage = e.target.innerHTML

    let urlEncodedSearchString = encodeURIComponent(searchString)

    fetchMovieData(urlEncodedSearchString)


  })


  // code to get random movie when the user first visits the site
  let movieArr = ["game of thrones", "toy story", "lego", "hotel transylvania", "jurassic park", "jurassic world", "an american tail", "despicable me", "the little rascals", "home alone", "the land before time", "star wars", "avatar", "guardians", "super mario", "hunger games", "john wick", "ant man", "avengers", "lord of the rings", "hobbit", "top gun", "the godfather", "spider man", "batman", "indiana jones", "captain marvel", "captain america"]

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  searchString = movieArr[getRandomInt(movieArr.length)]

  let urlEncodedSearchString = encodeURIComponent(searchString)

  fetchMovieData(urlEncodedSearchString)

// end of "DOMContentLoaded eventListener" 
})






const fetchMovieData = (urlEncodedSearchString) => {
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${urlEncodedSearchString}&page=${currentPage}`)
  .then(response => {
    movieContainer.innerHTML = renderMovies(response.data.Search)
  })
}






function renderMovies(movieArray){

  let watchlistJSON = localStorage.getItem("watchlist")
  let watchlist = JSON.parse(watchlistJSON)

  // reduce method used on MovieArray in order to filter out movies that don't have a poster and return html of those that do
  return movieHTML = movieArray.reduce((accumulator, currentMovie) => {

    let movieInWatchlist = watchlist?.find(currentImdbID => currentMovie.imdbID === currentImdbID)
    
    // if currentMovie has a poster, return a card with that movies data
    if(currentMovie.Poster !== "N/A"){
      return accumulator + `<div class="col-lg-4 col-md-6 pt-4 d-flex justify-content-center">
                              <div class="card" style="width: 18rem;">
                                <img src="${currentMovie.Poster}" class="card-img-top" alt="...">
                                <div class="card-body d-flex flex-column justify-content-end">
                                  <h5 class="card-title">${currentMovie.Title}</h5>
                                  <div class="d-flex justify-content-between">
                                    <button class="btn btn-${movieInWatchlist ? "success" : "primary"} saveToWatchlist${currentMovie.imdbID}" id="saveToWatchlist${currentMovie.imdbID}" onclick="saveToWatchlist('${currentMovie.imdbID}')" ${movieInWatchlist ? "disabled" : ""}>${movieInWatchlist ? "Added" : "Add to Watchlist"}</button>
                                    <button class="btn btn-secondary" onclick="showMovieDetails('${currentMovie.imdbID}')">Details</button>
                                  </div>
                                </div>
                              </div>
                            </div>`
    }

    return accumulator
    
  // initial value of empty string
  }, "")

}





function saveToWatchlist(imdbID){

  updateCardToAdded(imdbID)

  let watchlistJSON = localStorage.getItem("watchlist")
  let watchlist = JSON.parse(watchlistJSON)
  
  if(watchlist === null){
    watchlist = []
  }

  // check if movie already exists in watchlist
  let movieInWatchlist = watchlist.find(currentImdbID => imdbID === currentImdbID)
  
  // if movie already exists in watchlist, alert("Movie already in watchlist")
  if(movieInWatchlist){
    alert("Movie already in watchlist")
  }
  // if movie doesn't exist in watchlist, .push(movie)
  else{

    watchlist.push(imdbID)
  
    watchlistJSON = JSON.stringify(watchlist)
  
    localStorage.setItem("watchlist", watchlistJSON)
  }

}





const showMovieDetails = async (imdbID) => {

  // fetch movie data
  let response = await axios.get(`http://www.omdbapi.com/?apikey=c308ac58&i=${imdbID}&plot=full`)
  let currentMovie = response.data

  let watchlistJSON = localStorage.getItem("watchlist")
  let watchlist = JSON.parse(watchlistJSON)

  // check if movie is in watchlist
  let movieInWatchlist = watchlist.find(currentImdbID => imdbID === currentImdbID)

  // create htmlStringModal of modal
  let htmlStringModal = `<div class="modal fade" id="bootstrapModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h3 class="modal-title" id="modalLabel">${currentMovie.Title}</h3>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="d-flex flex-lg-row flex-md-column">
                                <img style="width: 100%; max-width: 500px;" src="${currentMovie.Poster}" class="card-img-top p-3" alt="movie poster for ${currentMovie.Title}">
                                <div class="modal-body">
                                  <div class="card-body">
                                    <h3>Plot</h3>
                                    <p class="card-text pb-3">${currentMovie.Plot}</p>
                                    <h5 class="card-text pb-3">Director: ${currentMovie.Director}</h5>
                                    <h5 class="card-text pb-3">Actors: ${currentMovie.Actors}</h5>
                                    <h5 class="card-text pb-3">Rated: ${currentMovie.Rated}</h5>
                                    <h5 class="card-text pb-3">Release Date: ${currentMovie.Released}</h5>
                                    <h5 class="card-text pb-3">Box Office: ${currentMovie.BoxOffice}</h5>
                                    <h5 class="card-text">IMDB Rating: ${currentMovie.imdbRating}</h5>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button class="btn btn-${movieInWatchlist ? "success" : "primary"} saveToWatchlist${imdbID}" id="saveToWatchlist${imdbID}" onclick="saveToWatchlist('${imdbID}')" ${movieInWatchlist ? "disabled" : ""}>${movieInWatchlist ? "Added" : "Add to Watchlist"}</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>`

  // grab bootstrapModalDiv from DOM
  let bootstrapModalDiv = document.getElementById("bootstrapModals")

  // set html of bootstrapModalsDiv to be htmlStringModal
  bootstrapModalDiv.innerHTML = htmlStringModal

  // grab bootstrapModal node from DOM
  let bootstrapModal = document.getElementById("bootstrapModal")

  // create javaScriptModal using new bootstrap.Modal()...
  let javaScriptModal = new bootstrap.Modal(bootstrapModal)

  // call javaScriptModal.show() to show modal
  javaScriptModal.show()

}






const updateCardToAdded = (imdbID) => {

  // grab button nodes
  let buttonNodeArray = document.querySelectorAll(`.saveToWatchlist${imdbID}`)

  buttonNodeArray.forEach(buttonNode => {

    // update anchorTag value??? with "Added"
    buttonNode.innerText = "Added"

    // update anchorTag color to green (update class name to remove btn-primary and add btn-success???)
    buttonNode.className = "btn btn-success"

    buttonNode.disabled = true
  })
  
}