const app = document.getElementById("movie_grid_container");
const api_key = "c9aeb176ddbedf1360223c8457d2bfe1";

// getting params
var queryString = decodeURIComponent(window.location.search);
var queries = queryString.split("=");
var movie_id = queries[1];

// Movie detail request ###################################################################
var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://api.themoviedb.org/3/movie/" +
    movie_id +
    "?api_key=" +
    api_key +
    "&language=en-US",
  true
);

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    // Poster image
    document.getElementById("movie_poster").src =
      "https://image.tmdb.org/t/p/w500/" + data.poster_path;

    // Movie Name
    document.getElementById("movie_name").innerText = data.title + " ";

    // Movie year
    var movie_year = document.createElement("span");
    movie_year.innerText = data.release_date.split("-")[0];
    document.getElementById("movie_name").appendChild(movie_year);

    // Movie Rating
    document.getElementById("movie_rating").innerText = data.vote_average;

    // Vote Count
    document.getElementById("vote_count").innerText =
      data.vote_count + " votes";

    // Movie overview
    document.getElementById("movie_overview").innerText = data.overview;

    // movie genres
    data.genres.forEach((element) => {
      var span = document.createElement("span");
      span.setAttribute("class", "time");
      var anchor = document.createElement("a");
      anchor.innerText = element.name;
      anchor.href = "#";
      span.appendChild(anchor);
      var br = document.createElement("br");
      document.getElementById("movie_genres").appendChild(span);
      document.getElementById("movie_genres").appendChild(br);
    });

    // movie release date
    document.getElementById("movie_release_date").innerText = data.release_date;

    // movie runtime
    document.getElementById("movie_runtime").innerText = data.runtime + " min";

    // Movie MMPA Rating
    if (data.adult == true)
      document.getElementById("movie_mmpa_rating").innerText = "PG 18+";
    else document.getElementById("movie_mmpa_rating").innerText = "PG";

    document.getElementsByClassName("movie_name")[0].innerText = data.title;
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

// Movie cast and crew request ########################################################
var request_crew = new XMLHttpRequest();
request_crew.open(
  "GET",
  "https://api.themoviedb.org/3/movie/" +
    movie_id +
    "/credits?api_key=" +
    api_key,
  true
);

request_crew.onload = function () {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    var director = "";
    var writers = "";

    // Movie Crew Extraction
    data.crew.forEach((element) => {
      if (element.job == "Director") {
        director = element.name;
      } else if (element.job == "Screenplay" || element.job == "Story") {
        writers += element.name + ", ";
      }
    });
  }
};

// Movie Reviews request #############################################################

// Movie cast and crew request
var request_review = new XMLHttpRequest();
request_review.open(
  "GET",
  "https://api.themoviedb.org/3/movie/" +
    movie_id +
    "/reviews?api_key=" +
    api_key +
    "&language=en-US&page=1",
  true
);

request_review.onload = function () {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.results.forEach((item) => {
      // Creating elements
      var div1 = document.createElement("div");
      var div2 = document.createElement("div");
      var div3 = document.createElement("div");
      var h3 = document.createElement("h3");
      var p = document.createElement("p");

      // Giving attributes and data
      div2.className = "user-infor";
      h3.innerText = item.author;
      p.innerHTML = item.content;
      div1.className = "mv-user-review-item";

      // Appending items
      div3.appendChild(h3);
      div2.appendChild(div3);
      div1.appendChild(div2);
      div1.appendChild(p);
      document.getElementById("movie_user_review_list").appendChild(div1);
    });
  }
};

request.send();
// request_crew.send();
// request_review.send();
