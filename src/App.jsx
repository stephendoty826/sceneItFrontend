
import './App.css';

function App() {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-12 header text-center mb-3">
            <a href="index.html" style={{textDecoration: "none"}}><h2 class="display-2">Scene It</h2></a>
            <h2 style={{color: "black"}}>Search for movies you want to watch.</h2>
            <h4>Save them to your list</h4>
            <a href="watchlist.html">Show My Watchlist</a>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-11 search">
            <form id="search-form">
              <div class="input-group input-group-lg">
                <input class="form-control search-bar" id="search-bar" placeholder="Search for a movie..."/>
                <button class="btn btn-primary input-group-btn" type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
