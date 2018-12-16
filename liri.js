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

function concertThis() {
    //Axios Request 
axios.get(`https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp&date=upcoming`).then(
    function (response) {
        
        //For loop to limit the results to 5
            for (i=0; i < 5; i++) {
                console.log("---------------------------------")
                console.log("Artist: " + search)
                //venue
                console.log("Venue name: " + response.data[i].venue.name);

                //venue location
                console.log("Location: " + response.data[i].venue.city)

                //date of the event
                console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY')) 
                
                console.log("---------------------------------")
            }   
    });
}





//OMDB API - movie-this
    function movieThis() {
        //API call saved into movieURL variable
        var movieUrl = `http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`;
        //Axios Request
        axios.get(movieUrl).then(
            function (response) {

                console.log("The title of the movie is:  " + response.data.Title);
                console.log("Year the movie came out:  " + response.data.Year);
                console.log("IMDB Rating of the movie is: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating of the movie is: " + response.data.Ratings[1].value);
                console.log("Country where the movie was produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors are: " + response.data.Actors);

            })

        } 
                 
            


//Spotify 
    function spotifyThisSong() {
        //Spotify API found via Spotify API documentation
        //Query was changed to match the variable search
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

   

//Do what it says function
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // Printing the contents of the data, Do not delete commented out code in case of future issues
        //console.log(data);

        // Split the data and save it to an array
        let dataArr = data.split(",");

        //Commented out code is saved for future attempt at expanding the use of this function
        // We will then re-display the content as an array for later use.
        //console.log(dataArr[1]);
        //var commands = dataArr[0];
        //console.log("The Command is " + commands);
       // var search = dataArr[1];
        
        function spotifyThisSong() {
            //Spotify API. Query is changed to dataArr[1] so that only the name of the song gets searched
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
        //Calling the function
        spotifyThisSong();
  
       
    }
    )}






//Switch Statements Down here
switch(commands)
{
    case "concert-this":
    concertThis();
    break;
    case "movie-this":
    //If statements for placeholder results in the event a user doesn't select a movie
    if (search.trim().length === 0) {
        search = "mr+nobody";
        movieThis();
    } else {
        movieThis();
    };
    break;
    case "spotify-this-song":
    //If statements for placeholder results in the event a user doesn't select a movie
    if (search.trim().length === 0) {
        search = "The Sign Ace of Base";
        spotifyThisSong();
    } else {
        spotifyThisSong();
    };
    break;
    case "do-what-it-says":
    doWhatItSays()
    break;
}

//Issues Remaining
//Do-What-It-Says should be able to take the data and call certain functions. DataArr[0] has the name
//of the call (i.e movie this) and DataArr[1] has the name of the movie etc. An if/else or switch statement
//may be needed to call the functions, i.g (if DataArr[0] === "movie this" then run the movieThis() function)\
//However two issues remain, a switch statement wiwth a call to the function isn't working nor is plugging the code
//straight out.