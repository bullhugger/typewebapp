const canvasBox = document.getElementById("canvasBox");
const canvasRect = canvasBox.getBoundingClientRect();
const canvasCtx = canvasBox.getContext("2d");
var background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
var font_color = window.getComputedStyle(document.body, null).getPropertyValue('color');
let arr_word = [];
let arr_box = [];
let move_pos = [];
let end_pos = [];
let arr_index = 0;
let count_box = 0;
let count_word = 0;
let font_size = 30;
let font_type = "Sans Serif";
let tool_open = false;
let move = false;
let elements = [];
let start_x = 0;
let start_y = 0;
let end_x = 0;
let end_y = 0;
let move_x = 0;
let move_y = 0;

$(document).ready(function() {
  canvasCtx.canvas.width = window.innerWidth;
  canvasCtx.canvas.height = window.innerHeight;
  ReadyMode();
});

function SelectMode(event) {
  if (event.key == "Backspace") {
    event.preventDefault();
  }
  else {
    switch (event.key) {
      case "l":
        document.removeEventListener("keypress", ReadyMode, true);
        document.addEventListener("pointerdown", SetStartLine, true);
        document.addEventListener("pointerup", SetEndLine, true);
        break;
      case "t":
        document.removeEventListener("keypress", ReadyMode, true);
        document.addEventListener("pointerdown", SetStartBox, true);
        document.addEventListener("pointerup", SetEndBox, true);
        break;
    }
  }
}

function ReadyMode() {
  document.addEventListener("keypress", SelectMode, true);
}

function DrawLine(move) {
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  canvasCtx.beginPath();
  canvasCtx.moveTo(start_x, start_y);
  if (move === true) {
    canvasCtx.lineTo(move_x, move_y);
  }
  else {
    canvasCtx.lineTo(end_x, end_y);
  }
  canvasCtx.stroke();
}

function DrawBox(move) {
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  canvasCtx.beginPath();
  if (move === true) {
    canvasCtx.strokeRect(start_x, start_y, move_x - start_x, move_y - start_y);
  }
  else {
    canvasCtx.strokeRect(start_x, start_y, end_x - start_x, end_y - start_y);
  }
  canvasCtx.stroke();
}

function SetStartLine(event) {
  start_x = event.clientX - canvasRect.left;
  start_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointerdown", SetStartLine, true);
  document.addEventListener("pointermove", SetMoveLine, true);
}

function SetStartBox(event) {
  start_x = event.clientX - canvasRect.left;
  start_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointerdown", SetStartBox, true);
  document.addEventListener("pointermove", SetMoveBox, true);
}

function SetEndBox(event) {
  end_x = event.clientX - canvasRect.left;
  end_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointermove", SetMoveBox, true);
  document.removeEventListener("pointerup", SetEndBox, true);
  DrawBox(false);
  elements.push([start_x, start_y, end_x, end_y]);
  document.addEventListener("keypress", TypeLetter, true);
}

function SetMoveLine(event) {
  move_x = event.clientX - canvasRect.left;
  move_y = event.clientY - canvasRect.top;
  DrawLine(true);
}

function SetMoveBox(event) {
  move_x = event.clientX - canvasRect.left;
  move_y = event.clientY - canvasRect.top;
  DrawBox(true);
}

function SetEndLine(event) {
  end_x = event.clientX - canvasRect.left;
  end_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointermove", SetMoveLine, true);
  document.removeEventListener("pointerup", SetEndLine, true);
  DrawLine(false);
  elements.push([start_x, start_y, end_x, end_y]);
}

function TypeLetter(event) {
  letter = event.key;
  switch (letter) {
    case "Enter":
      start_y = start_y + font_size;
      return start_y;
      break;
  }
}
