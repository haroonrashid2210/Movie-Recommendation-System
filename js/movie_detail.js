// const app = document.getElementById("movie_grid_container");
const api_key = "c9aeb176ddbedf1360223c8457d2bfe1";

// getting params
var queryString = decodeURIComponent(window.location.search);
var queries = queryString.split("=");
var movie_id = queries[1];

// ###########################################################################

// Variables for storing request and API data for requests respectively
var requests = new Array();
var API_Data = new Array();

// calling
function ProcessUrls() {
  requests = new Array();
  var urls = new Array(
    "https://api.themoviedb.org/3/movie/" +
      movie_id +
      "?api_key=" +
      api_key +
      "&language=en-US",
    "https://api.themoviedb.org/3/movie/" +
      movie_id +
      "/reviews?api_key=" +
      api_key +
      "&language=en-US&page=1",
    "https://api.themoviedb.org/3/movie/" +
      movie_id +
      "/credits?api_key=" +
      api_key,
    "https://api.themoviedb.org/3/movie/" +
      movie_id +
      "/recommendations?api_key=" +
      api_key +
      "&language=en-US&page=1"
  );

  for (i = 0; i < urls.length; i++) {
    requests.push(new Get_API_Data(urls[i]));
  }
}

// Sending Requests and getting data
function Get_API_Data(url) {
  var http = new XMLHttpRequest();

  http.open("GET", url, false); //ab? //  haan ye bhe sahe hao

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      // console.log("GET requests");
      // console.log(JSON.parse(http.response));
      API_Data.push(JSON.parse(http.response)); //
      // console.log("Call 1 is" + API_Data[0]);
    }
  };

  http.send(null);
  // API_Data.push(JSON.parse(http.response));
}

// ########################################################################################
// #################################### Movie detail ######################################
// ########################################################################################

function movieDetail(data) {
  // Poster image
  document.getElementById("movie_poster").src =
    "https://image.tmdb.org/t/p/w500/" + data.poster_path;

  // Movie Name
  document.getElementById("movie_name").innerText = data.title + " ";
  var movie_name_elements = document.querySelectorAll(".movie_name");
  movie_name_elements.forEach(function (element) {
    element.innerText = data.title;
  });

  // Movie year
  var movie_year = document.createElement("span");
  movie_year.innerText = data.release_date.split("-")[0];
  document.getElementById("movie_name").appendChild(movie_year);

  // Movie Rating
  document.getElementById("movie_rating").innerText = data.vote_average;

  // Vote Count
  document.getElementById("vote_count").innerText = data.vote_count + " votes";

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
}

// ########################################################################################
// #################################### Movie Review ######################################
// ########################################################################################
function movieReview(data) {
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
    console.log("akjdwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
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

// ########################################################################################
// ################################## Movie cast & crew ###################################
// ########################################################################################
function movieCast(data) {
  var director = "";
  var writers = [];
  var producers = [];

  // Movie Crew Extraction
  data.crew.forEach((element) => {
    if (element.job == "Director") {
      director = element.name;
    } else if (element.department == "Writing") {
      writers.push({ name: element.name, job: element.job });
    } else if (element.department == "Production") {
      producers.push({ name: element.name, job: element.job });
    }
  });

  // sending data to createCastCrewDIV(person, parent)
  createCastCrewDIV(
    { name: director, job: "Director" },
    "movie_director_section"
  );
  writers.forEach((element) => {
    createCastCrewDIV(element, "movie_writer_section");
  });
  producers.forEach((element) => {
    createCastCrewDIV(element, "movie_producer_section");
  });
  data.cast.forEach((element) => {
    createCastCrewDIV(
      { name: element.name, job: element.character },
      "movie_cast_section"
    );
  });
}

// Function that creates divs to insert in cast in crew tab
function createCastCrewDIV(person, parent) {
  // creating elements
  var div1 = document.createElement("div");
  var div2 = document.createElement("div");
  var p = document.createElement("p");
  var h4 = document.createElement("h4");
  var a = document.createElement("a");

  // assigning classes
  div1.className = "cast-it";
  div2.className = "cast-left";

  // Extracting data for Person Profile Pic e.g. Haroon Rashid = HR
  var dp = person.name.split(" ")[0][0] + person.name.split(" ")[1][0];

  // Addigning data
  h4.innerText = dp;
  a.innerText = person.name;
  p.innerText = person.job;

  // Appending elements
  div2.appendChild(h4);
  div2.appendChild(a);
  div1.appendChild(div2);
  div1.appendChild(p);

  // Adding to HTML document
  document.getElementById(parent).appendChild(div1);
}

// ########################################################################################
// ################################### Movies Similar #####################################
// ########################################################################################
function movieSimilar(data) {
  data.results.forEach((element) => {
    // creating elements
    var main_div = document.createElement("div");
    var inner_div = document.createElement("div");
    var img = document.createElement("img");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");
    var p5 = document.createElement("p");
    var h6 = document.createElement("h6");

    // adding classes
    main_div.className = "movie-item-style-2";
    inner_div.className = "mv-item-infor";
    p1.className = "rate";
    p2.className = "describe";
    p3.className = "run-time";

    console.log("GOOD");

    // adding data
    h6.innerHTML =
      "<a href='#'>" +
      element.title +
      " <span>(" +
      element.release_date.split("-")[0] +
      ")</span></a>";
    p1.innerHTML =
      "<i class='ion-android-star'></i><span>" +
      element.vote_average +
      "</span> /10";
    p2.innerText = element.overview;
    p3.innerHTML =
      " <span>18+: " +
      element.adult +
      " </span> . < span > Release: " +
      element.release_date +
      "</span >";
    p4.innerText = "Language: " + element.original_language.toUpperCase();
    p5.innerText = "Popularity: " + element.popularity;
    img.src = "https://image.tmdb.org/t/p/w500/" + element.poster_path;

    // appending childs
    inner_div.appendChild(h6);
    inner_div.appendChild(p1);
    inner_div.appendChild(p2);
    inner_div.appendChild(p3);
    inner_div.appendChild(p4);
    inner_div.appendChild(p5);
    main_div.appendChild(img);
    main_div.appendChild(inner_div);

    // adding to the main container
    document.getElementById("movie_similar_list").appendChild(main_div);
  });
}

// Calling function to start processing Urls
ProcessUrls();

// calling functions to fill data
movieDetail(API_Data[0]);
movieReview(API_Data[1]);
movieCast(API_Data[2]);
movieSimilar(API_Data[3]);
