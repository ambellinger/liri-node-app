//SPOTIFY REQUIREMENTS
//Link the dotenv so that you can link in the spotify keys
require("dotenv").config();
//import keys and save them into the keys pointer
var keys = require("./keys.js");
//import the spotify node documentation
const Spotify = require("node-spotify-api");
//run the keys thru the spotify constructor and save to a pointer
var spotify = new Spotify(keys.spotify);

//BANDS IN TOWN & OMDB REQUIREMENTS
//Connect to API
const axios = require("axios");
//moment,js
const moment = require("moment");


//LINK UP FS NODE FOR DO WHAT IT SAYS FUNCTION
//Fs node package
const fs = require("fs");


//USER INPUT
//Create variables to take in the commands
var commands = process.argv[2];
//Create if or else statement that will do the different commands 
var search = process.argv.slice(3).join(" ");



///////COMMANDS/////////
//Bands in Town - concert-this

// We then run the request with axios module on a URL with a JSON
axios.get(`https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp&date=upcoming`).then(
    function (response) {
        // Then we print out the result
        if (commands == "concert-this") {

            for (i=0; i < 5; i++) {
                console.log("Artist: " + search)
                //venue
                console.log("Venue name: " + response.data[i].venue.name);

                //venue location
                console.log("Location: " + response.data[i].venue.city)

                //date of the event
                console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY')) 
                //console.log("Event time " + response.data[i].datetime)

                console.log("##################")
            }

           
        }

    });

//OMDB API - movie-this
if (commands == "movie-this") {
    function movieThis() {
        var movieUrl = `http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`;

        axios.get(movieUrl).then(
            function (response) {

                console.log("The title of the movie is " + response.data.Title);
                console.log("Year the movie came out " + response.data.Year);
                console.log("IMDB Rating of the movie is " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating of the movie is " + response.data.Ratings[1].value);
                console.log("Country where the movie was produced " + response.data.Country);
                console.log("Language " + response.data.Language);
                console.log("Plot of the movie " + response.data.Plot);
                console.log("Actors are " + response.data.Actors);

            })

        } 
                 if (search.trim().length === 0) {
                     search = "mr+nobody";
                     movieThis();
                 } else {
                     movieThis();
                 }
            }


//Spotify 

if (commands == "spotify-this-song") {

    function spotifyThisSong() {

        spotify.search({ type: 'track', query: search }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            console.log("The song's name: " + data.tracks.items[0].name);
            console.log("Preview link of the song " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);

        });
    }

    if (search.trim().length === 0) {
        search = "The Sign Ace of Base";
        spotifyThisSong();
    } else {
        spotifyThisSong();
    }
};

if (commands == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        let dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr[1]);

        function spotifyThisSong() {

            spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Artist name: " + data.tracks.items[0].artists[0].name);
                console.log("The song's name: " + data.tracks.items[0].name);
                console.log("Preview link of the song " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);

            });
        }

        spotifyThisSong();
    }
    )
}

