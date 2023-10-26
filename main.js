// Function to Change Navigation bar color on  page scroll
const topnav = document.getElementById("header");
window.onscroll = function () {
  "use strict";
  if (
    document.body.scrollTop >= 545 ||
    document.documentElement.scrollTop >= 545
  ) {
    topnav.classList.add("scroll");
  } else {
    topnav.classList.remove("scroll");
  }
};

var showing = [1, 0, 0, 0]; 
var divs = ["mystory", "shortstory", "calender", "drawing"]; 

// Funtion to show and hide div #Guide on click
function nextdiv() {
  var qElems = [];
  for (var i = 0; i < divs.length; i++) {
    qElems.push(document.getElementById(divs[i])); 
  }
  for (var i = 0; i < showing.length; i++) {
    if (showing[i] == 1) { 
      qElems[i].style.display = "none";
      showing[i] = 0;
      if (i == showing.length - 1) {
        qElems[0].style.display = "block";
        showing[0] = 1;
      } 
      else {
        qElems[i + 1].style.display = "block";
        showing[i + 1] = 1;
      }
      break;
    }
  }
}

// Function to upload and display image file using SimpleImage library
function upload() {
  var imgcanvas = document.getElementById("canvasarea");
  var fileinput = document.getElementById("upload");
  var imageupload = new SimpleImage(fileinput);
  imageupload.drawTo(imgcanvas);
}

// Function to Download html div as image on button click.
// used html2canvas libarary to convert html to image.
// Created URL link to download the image.

function download() {
  html2canvas(document.getElementById("main"), { scale: 2 }).then(function (
    canvas
  ) {
    var imagetoURL = canvas.toDataURL("image/png", 1.0);
    var imagelink = document.createElement("a");
    imagelink.href = imagetoURL;
    imagelink.download = "untitled.png";
    document.body.appendChild(imagelink);
    imagelink.click();
  });
}

// initialize  Qill Texteditor toolbar - Qill API modules

var quill = new Quill("#mytextarea", {
  modules: {
    toolbar: "#toolbar" //toolbar options
  },
  placeholder: "    Start your Story here ...",
  theme: "snow"
});

// Function to clear text in textarea on button click
var element = document.getElementById("mytextarea");
function cleartext() {
  quill.setContents([{ insert: "\n" }]);
}

// Funtion to choose background color of a div
var colorInput = document.getElementById("color-picker");
colorInput.addEventListener("input", () => {
  document.getElementById("main").style.backgroundColor = colorInput.value;
});

// Draw Board

var isMouseDown = false;
var canvas = document.getElementById("canvasdraw");
var ctx = canvas.getContext("2d");
var currentSize = 5;
var currentColor = "rgb(200,20,100)";
var currentBg = "black";
var linesArray = [];
createCanvas();


// Setting Variables

// Background color
document.getElementById("bgcolorpicker")
  .addEventListener("change", function () {
    ctx.fillStyle = this.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    currentBg = ctx.fillStyle;
  });

// Brush Color
document.getElementById("ctx-color").addEventListener("change", function () {
  currentColor = this.value;
});

// Brush size
document.getElementById("controlSize").addEventListener("change", function () {
  currentSize = this.value;
  document.getElementById("showSize").innerHTML = this.value;
});

document.getElementById("eraser").addEventListener("click", eraser);
document.getElementById("cleardraw").addEventListener("click", createCanvas);

// mouse function

canvas.addEventListener("mousedown", function () {
  mousedown(canvas, event);
});
canvas.addEventListener("mousemove", function () {
  mousemove(canvas, event);
});
canvas.addEventListener("mouseup", mouseup);

// Setting Draw Board
function createCanvas() {
  canvas.width = 842;
  canvas.height = 500;
  canvas.style.zIndex = 8;
  ctx.fillStyle = currentBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Eraser
function eraser() {
  currentSize = 50;
  currentColor = ctx.fillStyle;
}

// STORE current mouse position, color , size

function store(x, y, s, c) {
  var line = {
    x: x,
    y: y,
    size: s,
    color: c  
  };
  linesArray.push(line);
}

// GET MOUSE POSITION

function getMousePos(canvas, evt) {
var rect = canvas.getBoundingClientRect();    // Method to get current size and position of an element
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// ON MOUSE DOWN

function mousedown(canvas, evt) {
  var mousePos = getMousePos(canvas, evt);
  isMouseDown = true;
  var currentPosition = getMousePos(canvas, evt);
  ctx.moveTo(currentPosition.x, currentPosition.y);
  ctx.beginPath();
  ctx.lineWidth = currentSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;
}

// ON MOUSE MOVE

function mousemove(canvas, evt) {
  if (isMouseDown) {
    var currentPosition = getMousePos(canvas, evt);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();
    store(currentPosition.x, currentPosition.y, currentSize, currentColor);
  }
}

// ON MOUSE UP

function mouseup() {
  isMouseDown = false;
  store();
}
