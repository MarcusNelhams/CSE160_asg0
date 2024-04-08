// DrawRectangle.js
let canvas;
let ctx;

function canvasSetUp() {
  // Retrieve <canvas> element <- (1)
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context for 2DCG <- (2)
  ctx = canvas.getContext('2d');
  if (!ctx) {
    console.log('Failed to retrieve the context element');
    return;
  }
}

function drawVector(v, color) {
  var x = v.elements[0];
  var y = v.elements[1];
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200 + x*20, 200 - y*20);
  ctx.strokeStyle = color;
  ctx.stroke();
  return;
}

function handleDrawEvent() {
  
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // set a black canvas color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // fill the canvas

  // get input values
  var v1xInput = document.getElementById("v1xInput");
  if (!v1xInput) {
    console.log('unaible to get v1x input');
    return;
  }
  var v1yInput = document.getElementById("v1yInput");
  if (!v1yInput) {
    console.log('unaible to get v2y input');
    return;
  }

  v1xValue = v1xInput.value;
  v1yValue = v1yInput.value;

  // draw v1 vector
  let v1 = new Vector3([v1xValue, v1yValue, 0]);
  drawVector(v1, 'red');

  var v2xInput = document.getElementById("v2xInput");
  if (!v2xInput) {
    console.log("unable to get v2x input");
    return;
  }

  var v2yInput = document.getElementById("v2yInput");
  if (!v2yInput) {
    console.log("unable to get v2y input");
    return;
  }

  v2xValue = v2xInput.value;
  v2yValue = v2yInput.value;

  // draw v2 vector
  let v2 = new Vector3([v2xValue, v2yValue, 0]);
  drawVector(v2, 'blue');
  return;
}

function main() {
  // setup
  canvasSetUp();

  // Draw the canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // set a black canvas color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // fill the canvas

  // button set up
  var button = document.getElementById("button");
  button.addEventListener("click", handleDrawEvent);
} 