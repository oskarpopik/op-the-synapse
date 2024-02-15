/* This is a variation of the Lunar Lander game. The game mimics the release of neurotransmitters between two neuron cells in a synapse. This process is happening in every brain and allows for comunication between the brain cells. */

// Canvas Setup
function setup() {
  let canvas = createCanvas(800, 600);

  /* UN-COMMENT THIS LATER! */

  canvas.parent("mol-lander-game");

  /* */

  background(255, 255, 255);
  // The following 7 lines of code were adapted from https://chat.openai.com/share/b658d5de-9fcf-4f45-86b9-b2af2204eefe Accessed: 2024-02-14
  // Prevent default behavior for arrow keys
  document.addEventListener("keydown", function (event) {
    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault();
    }
  });

  gameReset();
  state = "start";
}

/* CONST? */
let moleculeWidth = 25;
let moleculeHeight = 50;

let state = "start";
let gameTimer;
let moleculeX;
let moleculeY;
let velocity;
let acceleration;
let rotation;
let speed;

// Start screen function
function startScreen() {
  background(50, 100, 255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Start Screen", 400, 300);
}

// Result screen function
function resultScreen() {
  background(255, 100, 50);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Result Screen", 400, 300);
}

// Starting game values reset function
function gameReset() {
  gameTimer = 0;
  moleculeX = 140;
  moleculeY = 220;
  velocity = 0.01;
  acceleration = 0.001;
  rotation = 0;
  speed = 0;

  /* COMMENT THIS OUT AND UN-COMMENT state = "start" in the mouseClicked() function IF YOU WHAT TO MAKE IT RETURN TO THE START SCREEN EACH TIME */

  state = "game";
}

/* CHANGE THIS LATER TO SPACE CLICK? */

// Initial and after the game player interaction function
function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "result") {
    gameReset();

    /* UN-COMMENT THIS OUT AND COMMENT state = "game" in the gameReset() function IF YOU WHAT TO MAKE IT RETURN TO THE START SCREEN EACH TIME */

    // state = "start";
  }
}

// Background setup function
function surroundings() {
  push();
  noStroke();
  // background
  fill(25, 25, 25);
  rect(0, 0, width, height);
  pop();
}

// Starting zone setup function
function presynapticNeuron() {
  push();
  noStroke();
  // presynaptic neuron
  fill(107, 171, 205);
  beginShape();
  vertex(0, 250);
  bezierVertex(0, 240, 50, 270, 50, 250);
  bezierVertex(50, 270, 70, 40, 155, 205);
  bezierVertex(180, 260, 180, 340, 155, 395);
  bezierVertex(70, 560, 50, 330, 50, 350);
  bezierVertex(50, 330, 0, 360, 0, 350);
  endShape(CLOSE);
  // synaptic vesicle
  fill(25, 25, 25);
  ellipse(145, 225, 80);
  ellipse(120, 350, 80);
  // static molecule
  push();
  stroke(0, 0, 0);
  strokeWeight(1);
  fill(255, 0, 0);
  rectMode(CENTER);
  rect(120, 350, moleculeWidth, moleculeHeight);
  fill(0, 0, 255);
  ellipse(120 - 5, 350 - 15, 5);
  ellipse(120 - 5, 350 + 15, 5);
  pop();
  pop();
}

// Landing zone setup function
function postsynapticNeuron() {
  push();
  noStroke();
  // postsynaptic neuron
  fill(107, 171, 205);
  beginShape();
  vertex(800, 250);
  bezierVertex(800, 240, 750, 270, 750, 250);
  bezierVertex(750, 270, 730, 40, 645, 205);
  bezierVertex(620, 260, 620, 340, 645, 395);
  bezierVertex(730, 560, 750, 330, 750, 350);
  bezierVertex(750, 330, 800, 360, 800, 350);
  endShape(CLOSE);
  pop();
}

// Molecule setup function
function molecule(moleculeX, moleculeY, rotation) {
  push();
  translate(moleculeX, moleculeY);
  rotate(rotation);

  //molecule
  fill(255, 0, 0);
  rectMode(CENTER);
  rect(0, 0, moleculeWidth, moleculeHeight);
  fill(0, 0, 255);
  ellipse(-5, -15, 5);
  ellipse(-5, 15, 5);

  pop();
}

// Controls function
function keyPressed() {
  // Take a 15 degree step turn counterclockwise when the arrow LEFT is pressed
  if (keyCode === 37) {
    rotation -= PI / 12;

    // Take a 15 degree step turn clockwise when the arrow RIGHT is pressed
  } else if (keyCode === 39) {
    rotation += PI / 12;
  }
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    surroundings();
    presynapticNeuron();
    postsynapticNeuron();
    molecule(moleculeX, moleculeY, rotation);

    moleculeX = moleculeX + velocity + Math.cos(rotation) * speed;
    moleculeY = moleculeY + Math.sin(rotation) * speed;
    velocity += acceleration;

    /* This limits the movement of the molecule to the canvas area */
    // The following 2 lines of code was adapted from https://www.geeksforgeeks.org/p5-js-constrain-function/Accessed: 2024-02-13
    moleculeX = constrain(moleculeX, 0 + moleculeWidth, width - moleculeWidth);
    moleculeY = constrain(moleculeY, 0 + moleculeWidth, height - moleculeWidth);

    if (keyIsDown(38)) {
      // Move toward the postsynaptic neuron when the arrow UP is pressed
      speed = 5;
    } else if (keyIsDown(40)) {
      // Move away from the postsynaptic neuron when the arrow DOWN is pressed
      speed = -2;
    } else {
      speed = 0;
    }

    /* HERE IS TEMPORARY LOGIC FOR THE END GAME */

    gameTimer += 1;
    console.log(gameTimer);
    fill(255, 255, 255);
    text(gameTimer, 50, 50);
  }
  if (gameTimer >= 500) {
    gameTimer = 0;
    state = "result";
  } else if (state === "result") {
    resultScreen();
  }
}
