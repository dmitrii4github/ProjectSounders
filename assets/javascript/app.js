
//displayPlayerVideos();

$(document).on("click", "#videoButton", displayPlayerVideos);

$(document).on("click", "#wikipediaButton", displayPlayerWikipediaArticle);

// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new players - then update the html + update the database
// 3. Create a way to retrieve players from the player database.

// 1. Initialize Firebase
// Initialize Firebase


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqTcJJ_3u7P6Mg7RXJRgZlzuJcLd8XnnM",
    authDomain: "projectsounders-52f0a.firebaseapp.com",
    databaseURL: "https://projectsounders-52f0a.firebaseio.com",
    projectId: "projectsounders-52f0a",
    storageBucket: "projectsounders-52f0a.appspot.com",
    messagingSenderId: "488308303654"
  };
  firebase.initializeApp(config);

  var database = firebase.database();



// 2. Button for adding Players
$("#add-player-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var playerName = $("#player-name-input").val().trim();
  var playerPosition = $("#position-input").val().trim();
  var playerCountry = $("#country-input").val().trim();

  // Creates local "temporary" object for holding player data
  var newPlayer = {
     name: playerName,
     position: playerPosition,
     country: playerCountry,
   };

  // Uploads player data to the database
  database.ref().push({
    name: playerName,
    position: playerPosition,
    country: playerCountry
  });

  // Logs everything to console
  console.log(newPlayer.name);
  console.log(newPlayer.position);
  console.log(newPlayer.country);


  // Clears all of the text-boxes
  $("#player-name-input").val("");
  $("#position-input").val("");
  $("#country-input").val("");
});

// 3. Create Firebase event for adding player to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var playerName = childSnapshot.val().name;
  var playerPosition = childSnapshot.val().position;  
  var playerCountry = childSnapshot.val().country;

  // Player Info
  console.log(playerName);
  console.log(playerPosition);
  console.log(playerCountry);
 
  //var tdVideoLink = $('<td>').html('<a href="#">link</a>');
  //var tdWikipediaLink = $('<td>').html('<a href="#">link</a>');

  var tdVideoButton = $('<td>').html("<button id='videoButton'>click</button>");
  var tdWikipediaButton = $('<td>').html("<button id='wikipediaButton'>click</button>")

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(playerName),
    $("<td>").text(playerPosition),    
    $("<td>").text(playerCountry),
    tdVideoButton,
    tdWikipediaButton
  );

  // Append the new row to the table
  $("#player-table > tbody").append(newRow);
});




// displayPlayerVideos function re-renders the HTML to display the appropriate content
function displayPlayerVideos() {

  //var player = $(this).attr("data-name");
  var player = "Raul Ruidiaz";
  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q='Raul Ruidiaz'&type=video&key=AIzaSyACTpwErP0AMANAI6goF10LBfoxHeKcD9w";

  // Creating an AJAX call for the specific player button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {


    var playerDiv = $("<div class='player'>");

    // Creating a div to hold the player
    var playerView = $("#player-view");

    console.log(response);

     playerView.html("");

     for (var i=0; i<5; i++) {

      var videoID = response.items[i].id.videoId;
      
      var videoURL = "http://www.youtube.com/embed/"+videoID;
      //alert(videoURL);
//       //alert(imgURL);
      

       var iframe = $("<iframe>").attr("src", videoURL);
//       image.addClass("gif");
//       image.addClass("playing");

//       // Appending the image
      
       playerDiv.append(iframe);
//       animalDiv.append(image);
//     }

      playerView.append(playerDiv);
//   });

 }

});

}


function displayPlayerWikipediaArticle() {
  var player = "Raúl_Ruidíaz";
  var queryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&origin=*&titles="+player;

  // Creating an AJAX call for the specific player button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response.query.pages[26176050].extract);
    var playerDiv = $(response.query.pages[26176050].extract);

    // Creating a div to hold the player
    var playerView = $("#player-view");

     playerView.html("");
     playerView.append(playerDiv);
     
  });


}
