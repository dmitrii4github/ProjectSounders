
displayPlayerVideos();


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
 
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(playerName),
    $("<td>").text(playerPosition),    
    $("<td>").text(playerCountry),
  );

  // Append the new row to the table
  $("#player-table > tbody").append(newRow);
});




// displayPlayerVideos function re-renders the HTML to display the appropriate content
function displayPlayerVideos() {

  //var player = $(this).attr("data-name");
  var player = "Raul Ruidiaz";
  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&topicId=/m/05z1_&type=video&key=AIzaSyACTpwErP0AMANAI6goF10LBfoxHeKcD9w";

  // Creating an AJAX call for the specific player button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {


    var playerDiv = $("<div class='player'>");

    // Creating a div to hold the player
    var animalView = $("#player-view");

    console.log(response);

//     playerView.html("");

//     for (var i=0; i<5; i++) {

//       var imgURL = "https://media.giphy.com/media/"+response.data[i].id + "/giphy.gif";

//       //alert(imgURL);
      
//       var rating = $("<div>Rating: "+response.data[i].rating+"</div>");

//       var image = $("<img>").attr("src", imgURL);
//       image.addClass("gif");
//       image.addClass("playing");

//       // Appending the image
      
//       animalDiv.append(rating);
//       animalDiv.append(image);
//     }

//      $("#animal-view").append(animalDiv);
//   });

// }

// // Function for displaying animal data
// function renderButtons() {

//   // Deleting the animals prior to adding new animals
//   // (this is necessary otherwise you will have repeat buttons)
//   $("#buttons-view").empty();

//   // Looping through the array of animals
//   for (var i = 0; i < animals.length; i++) {

//     // Then dynamicaly generating buttons for each animal in the array
//     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//     var a = $("<button>");
//     // Adding a class of animal-btn to our button
//     a.addClass("animal-btn");
//     // Adding a data-attribute
//     a.attr("data-name", animals[i]);
//     // Providing the initial button text
//     a.text(animals[i]);
//     // Adding the button to the buttons-view div
//     $("#buttons-view").append(a);
//   }
// }

// // This function handles events where a animal button is clicked
// //$("#add-animal").on("click", function(event) {

// $(document).on("click", "#add-animal", function(event) {
//   event.preventDefault();
//   // This line grabs the input from the textbox
//   var animal = $("#animal-input").val().trim();

//   //alert(animal);

//   // Adding animal from the textbox to our array
//   animals.push(animal);

//   // Calling renderButtons which handles the processing of our animal array
//   renderButtons();
// });

// // Adding a click event listener to all elements with a class of "animal-btn"
// $(document).on("click", ".animal-btn", displayAnimalGifs);








// $(document).ready(function() {
// // Calling the renderButtons function to display the intial buttons
// renderButtons();
// });


// $(document).on("click", ".gif", function(){
//   //alert("Clicked");
// var src = $(this).attr("src");
// if($(this).hasClass('playing')){
//  //stop
//  $(this).attr('src', src.replace(".gif", "_s.gif"))
//  //alert($(this).attr('src'));
//  $(this).removeClass('playing');
// } else {
// //play
// $(this).addClass('playing');
// $(this).attr('src', src.replace("_s.gif", ".gif"))


});

}
