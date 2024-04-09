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

  // get v1 input values
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

  // get v2 input values
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
  return [v1, v2];
}

function handleDrawOperationEvent() {
  var vectors = handleDrawEvent();
  var v1 = vectors[0];
  var v2 = vectors[1];

  // get operation
  var opSelect = document.getElementById('op');
  var op = opSelect.value;
  //console.log(op);

  var scalObj = document.getElementById('Scalar');
  var scal = scalObj.value;

  var v3;
  var v4;

  if (op == 'add') {
    v3 = v1.add(v2);
    drawVector(v3, 'green');
  } else if (op == 'sub') {
    v3 = v1.sub(v2);
    drawVector(v3, 'green');
  } else if (op == 'mul') {
    v3 = v1.mul(scal);
    v4 = v2.mul(scal);
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  } else if (op == 'div') {
    v3 = v1.div(scal);
    v4 = v2.div(scal);
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  }  else if (op == 'mag') {
    console.log("Magnitude v1: " + v1.magnitude());
    console.log("Magnitude v2: " + v2.magnitude()); 
  } else if (op == 'nor') {
    v3 = v1.normalize();
    v4 = v2.normalize();
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  } else if (op == "ang") {
    var dotProd = Vector3.dot(v1, v2);
    var angleRad = Math.acos(dotProd / (v1.magnitude() * v2.magnitude()));
    var angleDeg = angleRad * (180/Math.PI);
    console.log("Angle: " + angleDeg);
  } else if (op == "are") {
    var cross = Vector3.cross(v1, v2);
    console.log("Area of the triangle: " + cross.magnitude() / 2);
  }

  return;
}

function main() {
  // setup
  canvasSetUp();

  // Draw the canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // set a black canvas color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // fill the canvas

  // button set up
  var drawButton = document.getElementById("drawButton");
  drawButton.addEventListener("click", handleDrawEvent);

  var opButton = document.getElementById('opButton');
  opButton.addEventListener("click", handleDrawOperationEvent);
} 