
require("dotenv").config();
// -- Grabbing the axios Package -- \\
var axios = require("axios");
// -- Linking the keys.js -- \\
var keys = require("./keys.js");
// -- Grabbing spotify api -- \\
var Spotify = require('node-spotify-api');
// -- FS is a way to read/write files -- \\
var fs = require("fs");
// -- Grabbing the request package -- \\
var request = require("request");
// -- Setting the third word into action -- \\
var action = process.argv[2];
// console.log(process.argv[2]);

// -- Setting the fourth word into inputs -- \\
var inputs = process.argv.slice(3).join("+");

// -- This allows for node to go back and forth between specific function base don the command case -- \\
switch (action) {

  case "concert-this":
    concert(inputs);
    break;

  case "spotify-this-song":
    spotify(inputs);
    break;

  case "movie-this":
    movie(inputs);
    break;

  case "do-what-it-says":
    doit(action, inputs);
    break;

};

// ------------------ Spotify Function -----------------------  \\

function spotify(inputs) {
  // -- Constructer-- \\
  var spotify = new Spotify(keys.spotify);

  // -- Search documentation -- \\
  spotify.search({ type: 'track', query: inputs, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      // console.log(data.tracks.items);
      
        var info = data.tracks.items[0];
        var artist = info.artists[0].name;
        var song = info.name;
        var preview = info.preview_url;
        var album = info.album.name;

        console.log("You Searched for | " + inputs + " | Searching Now...");
        console.log(`\n\nArtist: ${artist}\nSong: ${song}\nAlbum: ${album}\nSpotify preview: ${preview}\n`);
      
    };

  });

};

// ------------------ IMDB Movie Function ----------------------- \\


function concert(inputs) {
  // --- Grabbing the data via Axios --- \\
  axios.get("https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp")

    .then(function (response) {

      // console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
        var venue = response.data[i].venue.name;
        var location = response.data[i].venue.city;
        var date = response.data[i].datetime;
        console.log("You Searched for | " + inputs + " | Searching Now...");
        console.log(`::::::::::::::::::\n\nVenue: ${venue}\nLocation: ${location}\nDate: ${date}\n`);
      }



    }).catch(function (error) {

      return console.log(error)

    });
};

// ------------------ Concert Function -----------------------  \\

function movie(action, inputs) {

  axios.get("http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=bbcdfc4f")

    .then(function (response) {

      // console.log(response.data);
      console.log("You Searched for | " + inputs + " | Searching Now...");
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);


    }).catch(function (error) {

      return console.log(error)

    });
};



// ------------------ This Function will read the file of random.txt and test out any commands -----------------------  \\

function doit(action, inputs) {
  fs.readFile('random.txt', "utf8", function (error, data, body) {

    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    console.log(dataArr);


    action = dataArr[0];
    inputs = dataArr[1];

    movie(action, inputs);


  });
  return;

};


// 1) Question One : Spotify error " Error occurred : TypeERror: Cannot read property '0' of undefined "
// 2) Question Two : The Movie function isn't working because of the first parameter = "action". If I take action out for the movie function, the todo function doesn't work. 