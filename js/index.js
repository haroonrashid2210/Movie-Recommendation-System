const app = document.getElementById("movie_grid_container");
const api_key = "c9aeb176ddbedf1360223c8457d2bfe1";

var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://api.themoviedb.org/3/movie/now_playing?api_key=c9aeb176ddbedf1360223c8457d2bfe1&language=en-US&page=1",
  true
);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.results.forEach((movie) => {
      // main div
      const main_div = document.createElement("div");
      main_div.setAttribute("class", "movie-item-style-2 movie-item-style-1");

      // image part
      const image = document.createElement("img");
      image.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;

      // inner div 1
      const inner_div_1 = document.createElement("div");
      inner_div_1.setAttribute("class", "hvr-inner");

      // anchor >> inner div 1
      const anchor = document.createElement("a");
      // anchor.href = "moviesingle.html";
      anchor.setAttribute("data-movieId", movie.id);
      var parameter = anchor.getAttribute("data-movieId");
      anchor.onclick = () => openMovieDetail(parameter);
      anchor.textContent = "Read More ";

      // i tag >> anchor >> inner div 1
      const i = document.createElement("i");
      i.setAttribute("class", "ion-android-arrow-dropright");

      // inner div 2
      const inner_div_2 = document.createElement("div");
      inner_div_2.setAttribute("class", "mv-item-infor");

      // h6 >> inner div 2
      const h6 = document.createElement("h6");

      // anchor2 >> h6 >> inner div 2
      const anchor2 = document.createElement("a");
      anchor2.href = "#";
      anchor2.textContent = movie.title;

      // p >> inner div 2
      const p = document.createElement("p");
      p.setAttribute("class", "rate");

      // i tag >> p >> inner div 2
      const i2 = document.createElement("i");
      i2.setAttribute("class", "ion-android-star");

      // span >> p >> inner div 2
      const span = document.createElement("span");
      span.textContent = movie.vote_average + " /10";

      // adding elements inner div 1
      anchor.appendChild(i);
      inner_div_1.appendChild(anchor);

      // adding elements inner div 2
      h6.appendChild(anchor2);
      p.appendChild(i2);
      p.appendChild(span);
      inner_div_2.appendChild(h6);
      inner_div_2.appendChild(p);

      // adding all to main div
      main_div.appendChild(image);
      main_div.appendChild(inner_div_1);
      main_div.appendChild(inner_div_2);

      // adding main div to app
      app.appendChild(main_div);

      console.log(anchor.getAttribute("data-movieId"));
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

request.send();

function openMovieDetail(id) {
  var queryString = "?para=" + id;
  window.location.href = "moviesingle.html" + queryString;
}
