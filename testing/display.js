const app = document.getElementById("root");
const api_key = "c9aeb176ddbedf1360223c8457d2bfe1";
// const container = document.createElement("div");
// container.setAttribute("class", "container");
app.setAttribute("class", "container");

// app.appendChild(container);

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
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      console.log(data);

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;
      var elem = document.createElement("img");
      elem.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;

      //   const p = document.createElement("p");
      //   movie.description = movie.description.substring(0, 300);
      //   p.textContent = `${movie.description}...`;
      card.appendChild(h1);
      card.appendChild(elem);
      app.appendChild(card);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

request.send();
