/* This is a variation of the Lunar Lander game. The game mimics the release of neurotransmitters between two neuron cells in a synapse. When a neurotransmitter released from the presynaptic neuron binds to the postsynaptic neuron an electric impulse is generated. This process enables comunication between the brain cells. Welcome to The Synapse */

// Canvas Setup
function setup() {
  let canvas = createCanvas(800, 600);

  canvas.parent("mol-lander-game");

  // Prevent default behavior for arrow keys
  // The following 7 lines of code were adapted from https://chat.openai.com/share/b658d5de-9fcf-4f45-86b9-b2af2204eefe Accessed: 2024-02-14

  document.addEventListener("keydown", function (event) {
    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault();
    }
  });

  gameReset();
  /* UN-COMMENTIG THIS LINE AND COMMENTING THE ONE BELOW ALLOWS TO BLOCK THE START SCREEN - DELETE WHEN FINISHED WITH TESTING */
  // state = "game";
  state = "start";
}

const moleculeWidth = 20;
const moleculeHeight = 40;

/* UN-COMMENTIG THIS LINE AND COMMENTING THE ONE BELOW ALLOWS TO BLOCK THE START SCREEN - DELETE WHEN FINISHED WITH TESTING */
// let state = "game";
let state = "start";

let gameTimer;
let moleculeX;
let moleculeY;
let velocity;
let acceleration;
let rotation;
let speed;
let staticMolX;
let staticMolY;

// Start screen function
function startScreen() {
  push();
  background(107, 171, 205);
  fill(25, 25, 25);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Welcome to The Synapse game", 400, 150);
  textSize(20);
  text("Use arrow keys to controle the dopamine molecule", 400, 250);
  text(
    "You have only 1 minute to cross the synapse and slowly bind to the receptor",
    400,
    300
  );
  text("Earn more points (x2) by binding to the darker receptor", 400, 350);
  textSize(32);
  text("Click mouse button to start the game", 400, 450);
  pop();
}

// Result screen function
function resultScreen() {
  push();
  stroke(255, 255, 255);
  strokeWeight(5);
  fill(107, 171, 205);
  rect(-5, 50, 550, 505);
  noStroke();
  fill(25, 25, 25);
  textSize(26);
  textAlign(CENTER, CENTER);
  text(resultScreenMessage, 250, 200);
  push();
  textStyle(BOLD);
  textSize(32);
  text(resultScreenMessage2, 250, 300);
  pop();
  text("Click mouse button to play again", 250, 400);
  pop();
}

// Starting game values reset function
function gameReset() {
  gameTimer = 0;
  moleculeX = 155;
  moleculeY = 225;
  velocity = 0.01;
  acceleration = 0.001;
  rotation = 0;
  speed = 0;
  staticMolX = 120;
  staticMolY = 320;

  /* COMMENT THIS OUT AND UN-COMMENT state = "start" in the mouseClicked() function IF YOU WHAT TO MAKE IT RETURN TO THE START SCREEN EACH TIME */

  // state = "game";
}

// Initial and after the game player interaction function
function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "result") {
    gameReset();

    /* UN-COMMENT THIS OUT AND COMMENT state = "game" in the gameReset() function IF YOU WHAT TO MAKE IT RETURN TO THE START SCREEN EACH TIME */

    state = "start";
  }
}

// Background setup function
function surroundings() {
  push();
  stroke(255, 255, 255);
  strokeWeight(10);
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

  push();
  // The new improved neuron shape - had to rescale it and translate to fit the game canvas better
  scale(0.8, 0.8);
  translate(0, 60);
  beginShape();
  vertex(0, 250);
  bezierVertex(0, 240, 50, 270, 50, 250);
  bezierVertex(50, 270, 70, 90, 195, 205);
  bezierVertex(250, 260, 250, 340, 195, 395);
  bezierVertex(70, 510, 50, 330, 50, 350);
  bezierVertex(50, 330, 0, 360, 0, 350);
  endShape(CLOSE);
  pop();

  // Shading
  push();
  fill(250, 255, 255, 100);
  beginShape();
  vertex(130, 200);
  bezierVertex(90, 170, 45, 220, 50, 250);
  bezierVertex(60, 220, 90, 190, 130, 200);
  endShape(CLOSE);
  pop();

  push();
  fill(50, 119, 146, 200);
  beginShape();
  vertex(165, 340);
  bezierVertex(125, 400, 65, 410, 45, 320);
  bezierVertex(75, 410, 150, 360, 165, 340);
  endShape(CLOSE);
  pop();

  // synaptic vesicle
  fill(25, 25, 25);
  ellipse(155, 230, 64);
  ellipse(120, 320, 64);

  pop();
}

function staticMolecule(staticMolX, staticMolY) {
  // Static molecule
  push();
  // stroke(255, 255, 255);
  noStroke();
  // fill(25, 25, 25);
  // rectMode(CENTER);
  // rect(staticMolX, staticMolY, moleculeWidth, moleculeHeight);

  // Bonds between the atoms
  stroke(255, 255, 255);

  strokeWeight(0.6);
  line(staticMolX - 6, staticMolY + 15, staticMolX - 3, staticMolY + 10); // C-O BOND
  line(staticMolX + 6, staticMolY + 15, staticMolX + 3, staticMolY + 10); // C-O BOND
  line(staticMolX - 3, staticMolY - 10, staticMolX - 6, staticMolY - 15); // C-N (side chain)
  line(staticMolX - 6, staticMolY - 5, staticMolX - 3, staticMolY - 10); // C-C (side chain)
  line(staticMolX - 6, staticMolY - 5, staticMolX - 3, staticMolY, 4); // C-C (side chain - Ar)
  line(staticMolX - 6, staticMolY + 5, staticMolX - 3, staticMolY + 10); // C-C (Ar)
  line(staticMolX - 3, staticMolY, staticMolX + 3, staticMolY); // C-C (Ar)
  line(staticMolX + 3, staticMolY + 10, staticMolX + 6, staticMolY + 5); // C-C (Ar)

  strokeWeight(1.2);
  line(staticMolX - 6, staticMolY + 5, staticMolX - 3, staticMolY); // C=C (Ar)
  line(staticMolX + 6, staticMolY + 5, staticMolX + 3, staticMolY); // C=C (Ar)
  line(staticMolX - 3, staticMolY + 10, staticMolX + 3, staticMolY + 10); // C=C (Ar)

  // Atoms
  push();
  stroke(255, 255, 255);
  strokeWeight(0.3);
  fill(255, 0, 0);
  ellipse(staticMolX - 6, staticMolY + 15, 4); // oxygen
  ellipse(staticMolX + 6, staticMolY + 15, 4); // oxygen
  fill(75, 75, 75);
  ellipse(staticMolX - 6, staticMolY + 5, 4);
  ellipse(staticMolX - 6, staticMolY - 5, 4); // side chain
  ellipse(staticMolX - 3, staticMolY + 10, 4);
  ellipse(staticMolX + 3, staticMolY + 10, 4);
  ellipse(staticMolX + 6, staticMolY + 5, 4);
  ellipse(staticMolX - 3, staticMolY, 4);
  ellipse(staticMolX + 3, staticMolY, 4);
  ellipse(staticMolX - 3, staticMolY - 10, 4); // side chain
  fill(0, 0, 255);
  ellipse(staticMolX - 6, staticMolY - 15, 4); // nitrogen
  pop();
  pop();
}

// Landing zone setup function
function postsynapticNeuron() {
  push();
  noStroke();
  // postsynaptic neuron
  push();
  fill(107, 171, 205);

  // The new improved neuron shape - had to rescale it and translate to fit the game canvas better
  scale(0.8, 0.8);
  translate(200, 60);
  beginShape();
  vertex(800, 250);
  bezierVertex(800, 240, 750, 270, 750, 250);
  bezierVertex(750, 270, 730, 90, 605, 205);
  bezierVertex(550, 260, 550, 340, 605, 395);
  bezierVertex(730, 510, 750, 330, 750, 350);
  bezierVertex(750, 330, 800, 360, 800, 350);
  endShape(CLOSE);
  pop();

  // Shading
  push();
  fill(250, 255, 255, 100);
  beginShape();
  vertex(625, 260);
  bezierVertex(640, 200, 700, 180, 725, 195);
  bezierVertex(700, 190, 640, 225, 625, 260);
  endShape(CLOSE);
  pop();

  push();
  fill(50, 119, 146, 200);
  beginShape();
  vertex(635, 340);
  bezierVertex(675, 400, 735, 410, 755, 320);
  bezierVertex(725, 390, 650, 360, 635, 340);
  endShape();
  pop();

  // Test shape for collision detection with postsynaptic neuron
  // fill(255, 255, 255, 150);
  // ellipse(665, 300, 185, 250);
  // fill(205, 25, 205, 150);
  // ellipse(690, 280, 170, 230);
  pop();
}

// Receptor 1 setup function
function receptor1() {
  push();
  fill(155, 150, 255);
  translate(590, 290);
  rectMode(CENTER);
  // Stem
  rect(20, 0, 10, 10, 5);
  push();
  fill(255, 255, 255);
  rect(20, 0, 8, 2);
  pop();
  // Receptor
  rect(14, 0, 5, 58, 5);
  rect(0, 26, 31, 7, 5);
  rect(0, -26, 31, 7, 5);

  /* Actual binding area of receptor1 starts here */
  noStroke();
  fill(25, 25, 25);
  rect(0, 0, 22, 42);
  /* Ends here */
  pop();
}

// Receptor 2 setup function
function receptor2() {
  push();
  fill(155, 15, 255);
  translate(660, 405);
  rotate((-PI * 4) / 12);
  rectMode(CENTER);
  // Stem
  rect(20, 0, 10, 10, 5);
  push();
  fill(255, 255, 255);
  rect(20, 0, 10, 2);
  pop();
  // Receotor
  rect(14, 0, 5, 58, 5);
  rect(0, 26, 31, 7, 5);
  rect(0, -26, 31, 7, 5);

  /* Actual binding area of receptor2 starts here */
  noStroke();
  fill(25, 25, 25);
  rect(0, 0, 22, 42);
  /* Ends here */
  pop();
}

// Molecule setup function
function molecule(moleculeX, moleculeY, rotation) {
  push();
  translate(moleculeX, moleculeY);
  rotate(rotation);
  scale(-1, -1); // Flip vertically and horizontally around the shape's axis

  // Molecule
  // stroke(255, 255, 255);
  noStroke();
  // fill(25, 25, 25);
  // rectMode(CENTER);
  // rect(0, 0, moleculeWidth, moleculeHeight);

  // Bonds between the atoms
  stroke(255, 255, 255);

  strokeWeight(0.6);
  line(-6, 15, -3, 10); // C-O BOND
  line(6, 15, 3, 10); // C-O BOND
  line(-3, -10, -6, -15); // C-N (side chain)
  line(-6, -5, -3, -10); // C-C (side chain)
  line(-6, -5, -3, 0, 4); // C-C (side chain - Ar)
  line(-6, 5, -3, 10); // C-C (Ar)
  line(-3, 0, 3, 0); // C-C (Ar)
  line(3, 10, 6, 5); // C-C (Ar)

  strokeWeight(1.2);
  line(-6, 5, -3, 0); // C=C (Ar)
  line(6, 5, 3, 0); // C=C (Ar)
  line(-3, 10, 3, 10); // C=C (Ar)

  // Atoms
  push();
  stroke(255, 255, 255);
  strokeWeight(0.3);
  fill(255, 0, 0);
  ellipse(-6, 15, 4); // oxygen
  ellipse(6, 15, 4); // oxygen
  fill(75, 75, 75);
  ellipse(-6, 5, 4);
  ellipse(-6, -5, 4); // side chain
  ellipse(-3, 10, 4);
  ellipse(3, 10, 4);
  ellipse(6, 5, 4);
  ellipse(-3, 0, 4);
  ellipse(3, 0, 4);
  ellipse(-3, -10, 4); // side chain
  fill(0, 0, 255);
  ellipse(-6, -15, 4); // nitrogen
  pop();
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

/* This function is based on the ellipse equation:
 * x ** 2 / a ** 2 + y ** 2 / b ** 2 <= 1
 * For a point to be inside the ellipse, the value of the left-hand side must be less than or equal to 1.
 * In the function, normalizedX and normalizedY are used as x and y.
 * Since the ellipse has been normalized so that a = b = 1, the equation simplifies to:
 * normalizedX ** 2 + normalizedY ** 2 <= 1
 */

// The following 21 lines of code were adapted from https://chat.openai.com/share/590788a7-1009-4a30-8e85-b7dac6f2e486 Accessed: 2024-02-19

function collisionWithNeuronDetection(moleculeX, moleculeY) {
  // Parameters of the ellipse almost covering the neuron
  let ellipseX = 690;
  let ellipseY = 280;
  let ellipseWidth = 170;
  let ellipseHeight = 230;

  // Calculating relative position of the center of the molecule to the center of the ellipse (neuron)
  let relativeMoleculeX = moleculeX - ellipseX;
  let relativeMoleculeY = moleculeY - ellipseY;

  // Normalize molecules coordinates relative to ellipse's  (neurons) radii
  let normalizedX = relativeMoleculeX / (ellipseWidth / 2);
  let normalizedY = relativeMoleculeY / (ellipseHeight / 2);

  // Check if the molecule center is within the ellipse (neuron) using the ellipse equation
  if (normalizedX * normalizedX + normalizedY * normalizedY <= 1) {
    return true; // The molecule's center is within the ellipse (neuron)
  }
  return false; // The molecule's center is outside
}

/* The following logic is needed for the detection of molecular binding
 *
 * A molecule is at the landing (binding) area if all of conditions below are fully met:
 * x: molecule's left edge > receptor's left edge &&
 * x: molecule's right edge < receptor's right edge &&
 * y: molecule's top edge > receptor's top edge &&
 * y: molecule's bottom edge < receptor's bottom edge
 */

function bindingDetenctionRec1(moleculeX, moleculeY) {
  // Edges of the molecule
  let moleculeLeftEdge = moleculeX - moleculeWidth / 2;
  let moleculeRightEdge = moleculeX + moleculeWidth / 2;
  let moleculeTopEdge = moleculeY - moleculeHeight / 2;
  let moleculeBottomEdge = moleculeY + moleculeWidth / 2;

  // Define the center and the widht and height of receptor1
  let rec1X = 590;
  let rec1Y = 290;
  /* Actual binding area of receptor1 starts here */
  let rec1Width = 22;
  let rec1Height = 42;
  /* Ends here */

  // Edges of the receptor1
  let rec1LeftEdge = rec1X - rec1Width / 2;
  let rec1RightEdge = rec1X + rec1Width / 2;
  let rec1TopEdge = rec1Y - rec1Height / 2;
  let rec1BottomEdge = rec1Y + rec1Height / 2;

  // Binding to receptor 1 detection
  if (
    moleculeLeftEdge > rec1LeftEdge &&
    moleculeRightEdge < rec1RightEdge &&
    moleculeTopEdge > rec1TopEdge &&
    moleculeBottomEdge < rec1BottomEdge
  ) {
    return true;
  }
  return false;
}

function bindingDetenctionRec2(moleculeX, moleculeY) {
  // Edges of the molecule
  let moleculeLeftEdge = moleculeX - moleculeWidth / 2;
  let moleculeRightEdge = moleculeX + moleculeWidth / 2;
  let moleculeTopEdge = moleculeY - moleculeHeight / 2;
  let moleculeBottomEdge = moleculeY + moleculeWidth / 2;

  // Define the center and the widht and height of receptor1
  let rec2X = 660;
  let rec2Y = 405;
  /* Actual binding area of receptor2 starts here */
  let rec2Width = 22;
  let rec2Height = 42;
  /* Ends here */

  // Edges of the receptor1
  let rec2LeftEdge = rec2X - rec2Width / 2;
  let rec2RightEdge = rec2X + rec2Width / 2;
  let rec2TopEdge = rec2Y - rec2Height / 2;
  let rec2BottomEdge = rec2Y + rec2Height / 2;

  // Binding to receptor 2 detection
  if (
    moleculeLeftEdge > rec2LeftEdge &&
    moleculeRightEdge < rec2RightEdge &&
    moleculeTopEdge > rec2TopEdge &&
    moleculeBottomEdge < rec2BottomEdge
  ) {
    return true;
  }
  return false;
}

// Lightning
// The following 36 lines of code were adapted from https://chat.openai.com/share/650c41a5-28f9-411a-b88e-36844de7f053 Accessed: 2024-02-17

function drawLightning(startX, startY, midX, midY, endX, endY) {
  let detail = 20; // Adjust for more or less detail in the lightning

  // Draw from start to middle
  drawSegment(startX, startY, midX, midY, detail);

  // Draw from middle to end
  drawSegment(midX, midY, endX, endY, detail);
}

function drawSegment(x1, y1, x2, y2, detail) {
  push();
  stroke(255, 255, 0); // Lightning color
  strokeWeight(2); // Thickness of the lightning
  noFill();

  //   The function calculates the deltas (dx, dy) between the start and end points of the segment and divides this by the detail parameter to determine how much each sub-segment should move in the x and y directions.
  let dx = (x2 - x1) / detail;
  let dy = (y2 - y1) / detail;

  beginShape();
  vertex(x1, y1); // Start point

  for (let i = 1; i < detail; i++) {
    // Add some randomness to vx and vy to create the zigzag effect
    let vx = x1 + i * dx;
    let vy = y1 + i * dy;
    // This deviation introduces horizontal irregularity to the bolt.
    vx += random(-5, 5);
    // This deviation introduces vertical irregularity to the bolt.
    vy += random(-5, 5);
    vertex(vx, vy);
  }

  vertex(x2, y2); // End point
  endShape();
  pop();
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    surroundings();
    presynapticNeuron();
    staticMolecule(staticMolX, staticMolY);
    postsynapticNeuron();
    receptor1();
    receptor2();
    molecule(moleculeX, moleculeY, rotation);

    moleculeX = moleculeX + velocity + Math.cos(rotation) * speed;
    moleculeY = moleculeY + Math.sin(rotation) * speed;
    velocity += acceleration;

    /* This limits the movement of the molecule to the canvas area */
    // The following 2 lines of code was adapted from https://www.geeksforgeeks.org/p5-js-constrain-function/ Accessed: 2024-02-13
    moleculeX = constrain(moleculeX, 0 + moleculeWidth, width - moleculeWidth);
    moleculeY = constrain(moleculeY, 0 + moleculeWidth, height - moleculeWidth);

    // Movement of the molecule stuck inside of the synaptic vesicle
    // The following 1 line of code with the frameCount with modulo operator trick to slow down the movement of only one thing in the animation was added by courtesy of Garrit Schaap
    if (frameCount % 10 === 0) {
      staticMovementX = Math.random() * 1 - 0.5;
      // Correct formula = Math.random() * (0.5 - (-0.5)) + (-0.5);
      staticMovementY = Math.random() * 1 + -0.5;
      staticMolX += staticMovementX;
      staticMolY += staticMovementY;
    }

    // The movement should be within this ellipse:
    // ellipse(120, 320, 64);
    // For simplification (because of the constrain() function limitations) a square inscribed in this ellipse (circle) was used:
    // rect(120 - 64 / Math.sqrt(2), 320 - 64 / Math.sqrt(2), 64 / Math.sqrt(2));

    staticMolX = constrain(
      staticMolX,
      120 - 64 / Math.sqrt(2),
      120 + 64 / Math.sqrt(2)
    );
    staticMolY = constrain(
      staticMolY,
      320 - 64 / Math.sqrt(2),
      320 + 64 / Math.sqrt(2)
    );

    if (keyIsDown(38)) {
      // Move toward the postsynaptic neuron when the arrow UP is pressed
      speed = 5;
    } else if (keyIsDown(40)) {
      // Move away from the postsynaptic neuron when the arrow DOWN is pressed
      speed = -2;
    } else {
      speed = 0;
    }

    gameTimer += 1;
    push();
    fill(255, 255, 255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Gameplay time: " + (60 - Math.floor(gameTimer / 60)) + " s", 690, 25);
    pop();

    if (
      gameTimer >= 3600 ||
      bindingDetenctionRec1(moleculeX, moleculeY) ||
      bindingDetenctionRec2(moleculeX, moleculeY) ||
      collisionWithNeuronDetection(moleculeX, moleculeY)
    ) {
      state = "result";

      if (gameTimer >= 3600) {
        resultScreenMessage = "You ran out of time!";
        resultScreenMessage2 = "GAME OVER";
      }

      if (bindingDetenctionRec1(moleculeX, moleculeY)) {
        resultScreenMessage = "Successful binding to the receptor!";
        resultScreenMessage2 =
          "Your score is: " + 10 * (60 - Math.floor(gameTimer / 60));
        // Very basic lightning representation
        // stroke(255, 255, 0);
        // strokeWeight(2);
        // line(616, 290, 708, 297);
        // line(708, 297, 800, 290);
        drawLightning(616, 290, 708, 297, 800, 290);
        // noLoop();
      }

      if (bindingDetenctionRec2(moleculeX, moleculeY)) {
        resultScreenMessage = "Successful binding to the receptor!";
        resultScreenMessage2 =
          "Your score is: " + 20 * (60 - Math.floor(gameTimer / 60));
        // Very basic lightning representation
        // stroke(255, 255, 0);
        // strokeWeight(2);
        // line(673, 383, 728, 297);
        // line(728, 297, 800, 290);
        drawLightning(673, 383, 728, 297, 800, 290);
        // noLoop();
      }

      if (collisionWithNeuronDetection(moleculeX, moleculeY)) {
        resultScreenMessage = "You missed the receptor!";
        resultScreenMessage2 = "GAME OVER";
      }
    }
  } else if (state === "result") {
    resultScreen();
  }
}
