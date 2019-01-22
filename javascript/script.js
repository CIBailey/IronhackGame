// //Select Body and Click
// var start = document.querySelector("body");
// start.addEventListener("click", startFunction);
// // Event on click
// function startFunction() {
//   console.log("click");
//   var popup = document.querySelector(".popup-welcome");
//   popup.style.visibility = "hidden";
// }

///---------------------- CANVAS -------------

var canvas = document.querySelector(".my-game");
var ctx = canvas.getContext("2d");

// sourcing image
var basket = new Image();
basket.src = "./images/baguette.png";

console.log(basket);

var basket = {
  x: 259,
  y: 485,
  width: 50,
  height: 50,
  // when item is caught, basket turns white
  isCaught: false
};

var basketHeight = 50;
var basketWidth = 50;
var basketX = (canvas.width - basketWidth) / 2;

function drawBasket() {
  // ctx.beginPath();
  ctx.drawImage(basket, 259, 485, basketHeight, basketWidth);
  // ctx.closePath();
}

// when the page loads, the basket will show up
basket.onload = function() {
  drawBasket();
};

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  console.log(relativeX);
  if (relativeX > 0 && relativeX < canvas.width) {
    console.log(basket);
    basketX = relativeX - basketWidth / 2;
  }
}

///////////////// Falling Pastries

// sourcing croissant
var croissant = new Image();
croissant.src = "./images/croissant2.png";

// sourcing pie
var pie = new Image();
pie.src = "./images/pie.png";

// sourcing pain
var painauchoc = new Image();
painauchoc.src = "./images/painauchocolate.png";

// sourcing tarte
var tarte = new Image();
tarte.src = "./images/tarte.png";

class Pastry {
  constructor(pastryImage, pastryX, pastryY, pastryWidth, pastryHeight) {
    this.image = pastryImage;
    this.x = pastryX;
    this.y = pastryY;
    this.width = pastryWidth;
    this.height = pastryHeight;
    // when a pastry goes into the basket, basket will turn white
    this.isCaught = false;
  }

  drawPastry() {
    if (!basket.isCaught) {
      // continue to move only if Céline hasn't crashed
      this.y += 10;
      if (this.y > 600) {
        this.y = -5;
      }
    }

    if (this.isCaught) {
      // color the pipe red if it's crashed
      ctx.fillStyle = "white";
    }
    // draw a solid rectangle for this pipe
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var allPastry = [
  // x, y, width, height
  new Pastry(painauchoc, 5, -3, 50, 50),
  new Pastry(pie, 10, -5, 50, 50),
  new Pastry(tarte, 10, -7, 50, 50),
  new Pastry(croissant, -15, 300, 50, 50)
];

// Drawing Loop
// -----------------------------------------------------------------------------
// call "drawingLoop" for the first time to begin the loop
drawingLoop();

function drawingLoop() {
  // erase the whole canvas before drawing (x, y, width, height)
  ctx.clearRect(0, 0, 518, 546);

  // drawBasket();
  allPastry.forEach(function(onePastry) {
    onePastry.drawPastry();
  });

  if (basket.isCaught) {
    // draw game over screen
  }

  // ask the browser for a chance to re-draw the scene
  requestAnimationFrame(function() {
    // set up a recursive loop (the function "drawingLoop" calls itself)
    drawingLoop();
  });
}
