var popup = document.querySelector(".popup-end");
popup.style.visibility = "hidden";

var isGameOver = false;

//Select Body and Click
var start = document.querySelector("body");
start.addEventListener("click", startFunction);
///// Event on click

function startFunction() {
  var popup = document.querySelector(".popup-welcome");
  popup.style.visibility = "hidden";
  /////////
  drawingLoop();

  //////// countdown
  var seconds = document.getElementById("countdown").textContent;
  var countdown = setInterval(function() {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) {
      /////////////////////////////// events triggered to end the game!
      clearInterval(countdown);
      var popup = document.querySelector(".popup-end");
      popup.style.visibility = "visible";
      isGameOver = true;
      itemIn.src = "";
      finish.play();
      setTimeout(function() {
        //After 1 second, stops playing . Otherwise, it would be an endless loop by efault.
        itemIn.pause();
        itemIn.currentTime = 0;
      }, 50000);
    }
  }, 1000);
}

//////////// score!

var score = document.querySelector("#catch");
var finalscore = document.querySelector(".finalscore");

///// restart button
var restart = document.querySelector(".btn");
restart.onclick = function() {
  document.location.reload();
};

///////// audio files
var itemIn = new Audio("./sound/beep-00.wav");
var finish = new Audio("./sound/Isabelle.mp3");

///---------------------- CANVAS -------------

var canvas = document.querySelector(".my-game");
var ctx = canvas.getContext("2d");

// sourcing image
var basketImg = new Image();
basketImg.src = "./images/basket.png";

var basket = {
  x: 259,
  y: 500,
  width: 75,
  height: 40,
  // when item is caught, basket turns white
  isCaught: false,
  growth: 0
};

function drawBasket() {
  /////basket animation event
  basket.width += basket.growth;
  basket.height += basket.growth;

  if (basket.width >= 80) {
    basket.growth = -0.5;
  } else if (basket.width <= 75) {
    basket.growth = 0;
  }

  ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height);
}

// when the page loads, the basket will show up
basket.onload = function() {
  drawBasket();
};

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    basket.x = relativeX - basket.width / 2;
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

var rand = function(a, b) {
  return ~~(Math.random() * (b - a + 1) + a);
};

class Pastry {
  constructor(
    pastryImage,
    pastryX,
    pastryY,
    pastryWidth,
    pastryHeight,
    pastryRotate
  ) {
    this.image = pastryImage;
    this.x = pastryX;
    this.y = pastryY;
    this.width = pastryWidth;
    this.height = pastryHeight;
    this.isCaught = false;
    this.Rotate = pastryRotate;
  }

  drawPastry() {
    this.y += 4;
    if (this.y > 600) {
      this.y = -5;
    }

    ////////////// Abi Here ////////////
    ///pastry rotation function
    // ctx.rotate((50 * Math.PI) / 180);

    // draws the pastrys
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
//////// Create Basket Animation

// -------------------------- Drawing Loop  ---------------------------------------------------
// call "drawingLoop" for the first time to begin the loop

function drawingLoop() {
  // erase the whole canvas before drawing (x, y, width, height)
  ctx.clearRect(0, 0, 518, 546);

  drawBasket();
  allPastry.forEach(function(onePastry) {
    onePastry.drawPastry();
  });
  /////// Draws Basket Catches
  checkCatch();

  // ask the browser for a chance to re-draw the scene
  requestAnimationFrame(function() {
    // set up a recursive loop (the function "drawingLoop" calls itself)
    drawingLoop();
  });

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
    var pastriesToAdd = [];

    allPastry.forEach(function(onePastry) {
      if (basketCatching(basket, onePastry)) {
        basket.growth = 0.5;
        basket.isCaught = true;
        onePastry.isCaught = true;
        pastriesToAdd.push(onePastry);

        ///// sound
        itemIn.play();
        setTimeout(function() {
          //After 1 second, stops playing . Otherwise, it would be an endless loop by efault.
          itemIn.pause();
          itemIn.currentTime = 0;
        }, 400);

        if (!isGameOver) {
          score.innerHTML = Number(score.innerHTML) + 1;
          finalscore.innerHTML = score.innerHTML;
        }
      }
    });

    ///// disappearing pastry
    allPastry = allPastry.filter(onePastry => {
      return !onePastry.isCaught; //Caught letters now have a true value.
    });

    pastriesToAdd.forEach(function(onePastry) {
      allPastry.push(
        new Pastry(
          onePastry.image,
          Math.floor(Math.random() * 400) + 5,
          Math.floor(Math.random() * -495),
          50,
          50
        )
      ); // A new letter is pushed inside allPastry array so it's never empty.
    });
  }

  ///////////////// Pastry testing

  allPastry.forEach(onePastry => {
    onePastry.drawPastry();
  });
  //////--- end drawing loop below
}

function growBasket() {
  basket.width += 10;
  basket.height += 10;
}
