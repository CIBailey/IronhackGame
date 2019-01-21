//Select Body and Click
var start = document.querySelector("body");
start.addEventListener("click", startFunction);
// Event on click
function startFunction() {
  console.log("click");
  var popup = document.querySelector(".popup-welcome");
  popup.style.visibility = "hidden";
}

////////////////////////// Dropping Items
var canvas = document.querySelector(".my-game");
var ctx = canvas.getContext("2d");

var Movable = function() {};

var Movable = function() {};

var Score = function() {};

var Pastry = function() {};

var Basket = function() {};
