var canvasBox = document.getElementById("canvasBox");
var canvasCtx = canvasBox.getContext("2d");
var background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
var font_color = window.getComputedStyle(document.body, null).getPropertyValue('color');
var arr_word = [];
var arr_box = [];
var move_pos = [];
var end_pos = [];
var arr_index = 0;
var count_box = 0 ;
var count_word = 0;
var font_size = 30;
var font_type = "Sans Serif";
var tool_open = false;
var move = false;
var elements = [];
var start_x = 0;
var start_y = 0;
var end_x = 0;
var end_y = 0;
var move_x = 0;
var move_y = 0;

document.addEventListener("keypress", SelectMode, true);
$(document).ready(function() {
  canvasCtx.canvas.width = window.innerWidth;
  canvasCtx.canvas.height = window.innerHeight;
});

function SelectMode(event) {
  if(event.key== "Backspace") {
    event.preventDefault();
  }
  else {
    switch(event.key) {
      case "l" :
        document.addEventListener("pointerdown", SetStartLine, true);
        document.addEventListener("pointerup", SetEndLine, true);
        break;
      case "t" :
        document.addEventListener("pointerdown", SetStartBox, true);
        document.addEventListener("pointerup", SetEndBox, true);
      break;
    }
  }
}

function DrawBox(move) {
  if(move == true) {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.strokeRect(x_start, y_start, x_pos, y_pos);
    canvasCtx.stroke();
  }
  else {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.strokeRect(x_start, y_start, x_pos, y_pos);
    canvasCtx.stroke();
  }
}

function DrawLine(move) {
  if(move == true) {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.moveTo(start_x, start_y);
    canvasCtx.lineTo(move_x, move_y);
    canvasCtx.stroke();
  }
  else {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.moveTo(start_x, start_y);
    canvasCtx.lineTo(end_x, end_y);
    canvasCtx.stroke();
  }
}

function DrawBox(move) {
  if(move == true) {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.drawRect(start_x, start_y - font_size, start_x + move_x, start_y + move_y);
    canvasCtx.stroke();
  }
  else {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.drawRect(start_x, start_y - font_size, start_x + move_x, start_y + move_y);
    canvasCtx.stroke();
  }
}

function SetStartLine(event) {
  start_x = event.clientX;
  start_y = event.clientY;
  document.removeEventListener("pointerdown", SetStartLine, true);
  document.addEventListener("pointermove", SetMoveLine, true);
}

function SetStartBox(event) {
  start_x = event.clientX;
  start_y = event.clientY;
  document.removeEventListener("pointerdown", SetStartBox, true);
  document.addEventListener("pointermove", SetMoveBox, true);
}

function SetEndBox(event) {
  end_x = event.clientX;
  end_y = event.clientY;
  document.removeEventListener("pointermove", SetMoveBox, true);
  document.removeEventListener("pointerup", SetEndBox, true);
  DrawBox(false);
  elements.push([start_x, start_y, end_x, end_y]);
  console.table(elements)
}

function SetMoveLine(event) {
  move_x = event.clientX;
  move_y = event.clientY;
  DrawLine(true);
}

function SetMoveBox(event) {
  move_x = event.clientX;
  move_y = event.clientY;
  DrawBox(true);
}

function SetEndLine(event) {
  end_x = event.clientX;
  end_y = event.clientY;
  document.removeEventListener("pointermove", SetMoveLine, true);
  document.removeEventListener("pointerup", SetEndLine, true);
  DrawLine(false);
  elements.push([start_x, start_y, end_x, end_y]);
  console.table(elements)
}
