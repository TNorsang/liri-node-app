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

  var queryUrl = "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";

	request(queryUrl, function(error, response, body) {
		if (!inputs){
        	inputs = '';
    	}
		if (!error && response.statusCode === 200) {
        // console.log(response);
		    console.log("Venue Name: " + JSON.parse(body).venue);
		    // console.log("Country: " + JSON.parse(body).country);
		    // console.log("Venue Name: " + JSON.parse(body).region);
		    // console.log("Venue Name: " + JSON.parse(body).city);
		    // console.log("Venue Name: " + JSON.parse(body).datetime);
		}
	});
};

// ------------------ Concert Function -----------------------  \\

function movie(inputs) {

  var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=bbcdfc4f";
  

	request(queryUrl, function(error, response, body) {
		if (!inputs){
        	inputs = '';
    	}
		if (!error && response.statusCode === 200) {
        // // console.log(response);
        console.log("You Searched for | " + inputs + " | Searching Now...");
		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
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
    console.log("Title: " + JSON.parse(body).Title);

		
    });
    return;

};

