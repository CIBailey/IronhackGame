//Select Body and Click
var start = document.querySelector("body");
start.addEventListener("click", startFunction);
// Event on click
function startFunction() {
  var popup = document.querySelector(".popup-welcome");
  popup.style.visibility = "hidden";
}

///---------------------- CANVAS -------------

var canvas = document.querySelector(".my-game");
var ctx = canvas.getContext("2d");

// sourcing image
var basketImg = new Image();
basketImg.src = "./images/basket.png";

var basket = {
  x: 259,
  y: 200,
  width: 75,
  height: 53,
  // when item is caught, basket turns white
  isCaught: false
};

var basketHeight = 53;
var basketWidth = 75;
var basketX = (canvas.width - basketWidth) / 2;

function drawBasket() {
  ctx.drawImage(basketImg, basketX, 500, basketWidth, basketHeight);
}

///// animate in Canvas
// function basketBounce() {
//   basketMove = basketWidth + 10;
//   basketWidth = basketMove;
//   basketMove = basketWidth - 10;
//   setInterval((basketWidth = basketMove), 10);
// }

// when the page loads, the basket will show up
basket.onload = function() {
  drawBasket();
};

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
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
      // continue to move only if basket didn't catch
      this.y += 7;
      if (this.y > 600) {
        this.y = -5;
      }
    }

    if (this.isCaught) {
      // color the pipe red if it's crashed
      ctx.fillStyle = "white";
      //// counts number of times this happens
    }
    // draw a solid rectangle for this pipe
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var allPastry = [
  // x, y, width, height
  new Pastry(
    painauchoc,
    Math.floor(Math.random() * 400) + 5,
    Math.floor(Math.random() * -495),
    50,
    50
  ),
  new Pastry(
    pie,
    Math.floor(Math.random() * 400) + 5,
    Math.floor(Math.random() * -495),
    50,
    50
  ),
  new Pastry(
    tarte,
    Math.floor(Math.random() * 400) + 5,
    Math.floor(Math.random() * -495),
    50,
    50
  ),
  new Pastry(
    croissant,
    Math.floor(Math.random() * 400) + 5,
    Math.floor(Math.random() * -495),
    50,
    50
  )
];

// Drawing Loop
// -----------------------------------------------------------------------------
// call "drawingLoop" for the first time to begin the loop
drawingLoop();

function drawingLoop() {
  // erase the whole canvas before drawing (x, y, width, height)
  ctx.clearRect(0, 0, 518, 546);

  drawBasket();
  allPastry.forEach(function(onePastry) {
    onePastry.drawPastry();
  });
  /////////// Draws Basket Catches
  checkCatch();
  if (basket.isCaught) {
    // function using Jquery to enlarge basket
    // basketBounce();
    $("div").animate({ width: "90px", height: "67px" });
    $("div").animate({ width: "75px", height: "53px" });
  }

  // ask the browser for a chance to re-draw the scene
  requestAnimationFrame(function() {
    // set up a recursive loop (the function "drawingLoop" calls itself)
    drawingLoop();
  });
}

/////// Basket Catching

function basketCatching(rectA, rectB) {
  return (
    rectA.y + rectA.height >= rectB.y &&
    rectA.y <= rectB.y + rectB.height &&
    rectA.x + rectA.width >= rectB.x &&
    rectA.x <= rectB.x + rectB.width
  );
}

function checkCatch() {
  allPastry.forEach(function(onePastry) {
    if (basketCatching(basket, onePastry)) {
      basket.isCaught = true;
      onePastry.isCaught = true;
      console.log(basket);
    }
  });
}
