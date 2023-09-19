
// declaring watchlistContainer node variable so it's available throughout this file
let watchlistContainer

let moviesObj = {}

document.addEventListener("DOMContentLoaded", async () => {

  // setting watchlistContainer after DOM loads
  watchlistContainer = document.querySelector(".watchlistContainer")

  let watchlistJSON = localStorage.getItem("watchlist")
  let watchlist = JSON.parse(watchlistJSON)

  if(watchlist.length > 0){
    watchlistContainer.innerHTML = await renderWatchlist(watchlist)
  } else {
    watchlistContainer.innerHTML = `<div class="d-flex flex-column align-items-center"> 
                                      <text class="mb-4 fw-normal display-3">Your Watchlist is Empty</text>
                                      <text class="display-6">Click <a href="index.html" class="bolder"> here</a> to search movies and add them to your watchlist</text>
                                    </div>`
  }

})





async function renderWatchlist(watchlist){

  /* This code is using `Promise.all()` to asynchronously fetch movie data from the OMDB API for each
  movie in the user's watchlist, and then mapping over the resulting array of movie data to create
  an array of HTML strings representing each movie card. */
  let watchlistHTMLArray = await Promise.all(watchlist.map(async imdbID => {
    let response = await axios.get(`http://www.omdbapi.com/?apikey=c308ac58&i=${imdbID}&plot=full`)
    let currentMovie = response.data
    moviesObj[currentMovie.imdbID] = currentMovie
    
    return `<div class="col-lg-4 col-md-6 pt-4 d-flex justify-content-center">
              <div class="card" style="width: 18rem;">
                <img src="${currentMovie.Poster}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column justify-content-end">
                <h5 class="card-title">${currentMovie.Title}</h5>
                  <div class="d-flex justify-content-between">
                    <button class="btn btn-danger" onclick=deleteFromWatchlist('${currentMovie.imdbID}')>Delete</button>
                    <button class="ms-2 btn btn-secondary" onclick="showMovieDetails('${currentMovie.imdbID}')" >Details</button>
                  </div>
                </div>
              </div>
            </div>`
  }))

  return watchlistHTMLArray.join("")
}





async function deleteFromWatchlist(imdbID){

  // pull watchlist from localStorage
  let watchlistJSON = localStorage.getItem("watchlist")
  let watchlist = JSON.parse(watchlistJSON)

  // delete movie from watchlist using .filter()
  let filteredWatchlist = watchlist.filter(currentImdbID => {

    return currentImdbID != imdbID
  })

  // save watchlist to localStorage
  watchlistJSON = JSON.stringify(filteredWatchlist)
  localStorage.setItem("watchlist", watchlistJSON)

  // re-render page

  if(filteredWatchlist.length > 0){
    watchlistContainer.innerHTML = await renderWatchlist(filteredWatchlist)
  } else {
    watchlistContainer.innerHTML = `<div class="d-flex flex-column align-items-center"> 
                                      <text class="mb-4 fw-normal display-3">Your Watchlist is Empty</text>
                                      <text class="display-6">Click <a href="index.html" class="bolder"> here</a> to search movies and add them to your watchlist</text>
                                    </div>`
  }

}





const showMovieDetails = (imdbID) => {

  // grab data from moviesObj
  let currentMovie = moviesObj[imdbID]

  // create htmlStringModal of modal
  let htmlStringModal = `<div class="modal fade" id="bootstrapModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h3 class="modal-title" id="modalLabel">${currentMovie.Title}</h3>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="d-flex">
                                <img style="max-height: 500px;" src="${currentMovie.Poster}" class="card-img-top m-3" alt="movie poster for ${currentMovie.Title}">
                                <div class="modal-body">
                                  <div class="card-body">
                                    <h3>Plot</h3>
                                    <p class="card-text pb-3">${currentMovie.Plot}</p>
                                    <h5 class="card-text pb-3"><b>Director:</b> ${currentMovie.Director}</h5>
                                    <h5 class="card-text pb-3"><b>Actors:</b> ${currentMovie.Actors}</h5>
                                    <h5 class="card-text pb-3"><b>Rated:</b> ${currentMovie.Rated}</h5>
                                    <h5 class="card-text pb-3"><b>Release Date:</b> ${currentMovie.Released}</h5>
                                    <h5 class="card-text pb-3"><b>Box Office:</b> ${currentMovie.BoxOffice}</h5>
                                    <h5 class="card-text"><b>IMDB Rating:</b> ${currentMovie.imdbRating}</h5>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button class="btn btn-danger" data-bs-dismiss="modal" onclick=deleteFromWatchlist('${currentMovie.imdbID}')>Delete</button>
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
