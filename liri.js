require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var fs = require("fs");

var request = require("request");

var action = process.argv[2];
// console.log(process.argv[2]);

// ----------- Grabs User's Inputs from Command Line --------------- \\ 
var inputs = process.argv[3];


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

  var spotify = new Spotify(keys.spotifyKeys);
  if (!inputs) {
    inputs = '';

  }

  spotify.search({ type: 'track', query: inputs }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    console.log("You Searched for | " + process.argv[3] + " | Searching Now...");

    var songInfo = data.tracks.items;
    console.log("Artist's : " + songInfo[0].artists[0].name);
    console.log("Song Name : " + songInfo[0].name);
    console.log("Preview Link : " + songInfo[0].preview_url);
    console.log("Album: " + songInfo[0].album.name);

  });


}

// ------------------ IMDB Movie Function ----------------------- \\


function concert(inputs) {

  axios.get("https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp")

  .then(function(response) {

      // console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
            var venue = response.data[i].venue.name;
            var location = response.data[i].venue.city;
            var date = response.data[i].datetime;

            console.log(`::::::::::::::::::\n\nVenue: ${venue}\nLocation: ${location}\nDate: ${date}\n`);
      }
      


  }).catch(function(error) {

    return console.log(error)
    
  });
};

// ------------------ Concert Function -----------------------  \\

function movie(action, inputs) {
  
  axios.get("http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=bbcdfc4f")

    .then(function(response) {

        // console.log(response.data);
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);


    }).catch(function(error) {

      return console.log(error)
      
    });
};



// ------------------ This Function will read the file of random.txt and test out any commands -----------------------  \\

function doit(action, inputs) {
	fs.readFile('random.txt', "utf8", function(error, data, body){

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

