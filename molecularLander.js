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
}

function surroundings() {
  push();
  noStroke();
  // background
  fill(25, 25, 25);
  rect(0, 0, width, height);
  pop();
}

function presynapticNeuron() {
  push();
  noStroke();
  // presynaptic neuron
  fill(107, 171, 205);
  rect(0, 175, 150, 250);
  pop();
}

function postsynapticNeuron() {
  push();
  noStroke();
  // postsynaptic neuron
  fill(107, 171, 205);
  rect(650, 175, 150, 250);
  pop();
}

let moleculeWidth = 25;
let moleculeHeight = 50;

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

let moleculeX = 140;
let moleculeY = 220;

let velocity = 0.01;
let acceleration = 0.001;

let rotation = 0;
let speed = 0;

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
}
