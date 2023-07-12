const canvasBox = document.getElementById("canvasBox");
const canvasRect = canvasBox.getBoundingClientRect();
const canvasCtx = canvasBox.getContext("2d"); var background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color'); var font_color = window.getComputedStyle(document.body, null).getPropertyValue('color');
let arr_word = [];
let arr_box = [];
let move_pos = [];
let end_pos = [];
let arr_index = 0;
let count_box = 0;
let count_word = 0;
let font_size = 30;
let font_type = "Sans Serif";
let font_config = font_size + "px " + font_type;
let tool_open = false;
let move = false;
let elements = [];
let start_x = 0;
let start_y = 0;
let end_x = 0;
let end_y = 0;
let move_x = 0;
let move_y = 0;
let font_align = "start";
let font_baseline = "top";

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
        document.removeEventListener("keydown", ReadyMode, true);
        document.addEventListener("pointerdown", SetStartLine, true);
        document.addEventListener("pointerup", SetEndLine, true);
        break;
      case "t":
        document.removeEventListener("keydown", ReadyMode, true);
        document.addEventListener("pointerdown", SetStartBox, true);
        document.addEventListener("pointerup", SetEndBox, true);
        break;
    }
  }
}

function ReadyMode() {
  document.addEventListener("keydown", SelectMode, true);
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
    letter_y = start_y;
    letter_x = start_x;
  }
  canvasCtx.stroke();
}

function DrawText(letter, letter_x, letter_y) {
  canvasCtx.fillStyle = font_color;
  canvasCtx.font = font_config;
  canvasCtx.textBaseline = font_baseline;
  canvasCtx.textAlign = font_align;
  canvasCtx.fillText(letter, letter_x, letter_y);
}

function SetStartBox(event) {
  start_x = event.clientX - canvasRect.left;
  start_y = event.clientY - canvasRect.top;
  document.removeEventListener("keydown", SelectMode, true);
  document.removeEventListener("pointerdown", SetStartBox, true);
  document.addEventListener("pointermove", SetMoveBox, true);
}

function SetStartLine(event) {
  start_x = event.clientX - canvasRect.left;
  start_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointerdown", SetStartLine, true);
  document.addEventListener("pointermove", SetMoveLine, true);
}

function SetEndBox(event) {
  end_x = event.clientX - canvasRect.left;
  end_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointermove", SetMoveBox, true);
  document.removeEventListener("pointerup", SetEndBox, true);
  DrawBox(false);
  elements.push([start_x, start_y, end_x, end_y]);
  document.addEventListener("keydown", TypeLetter, true);
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
  count_word = 0;
}

function SetEndLine(event) {
  end_x = event.clientX - canvasRect.left;
  end_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointermove", SetMoveLine, true);
  document.removeEventListener("pointerup", SetEndLine, true);
  DrawLine(false);
  elements.push([start_x, start_y, end_x, end_y]);
}

function RedrawText() {
  for(let i=0; i <= arr_word.length; i++) {
    letter   = arr_word[i][0];
    letter_x = arr_word[i][1];
    letter_y = arr_word[i][2];
    DrawText(letter, letter_x, letter_y);
  }
}

function TypeLetter(event) {
  letter = event.key;
  switch(letter) {
    case "Enter":
      letter_y = letter_y + font_size;
      break;
    case "Backspace" :
      arr_word.pop;
      count_word--;
      RedrawText();
      break;
    case "Escape" :
      document.removeEventListener("keydown", TypeLetter, true);
      canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
      RedrawText();
      ReadyMode();
      break;
    case "Alt" :
      break;
    case "Control" :
      break;
    case "Shift" :
      break;
    case "Home" :
      break;
    default :
      letter_x = start_x + (font_size * count_word);
      if(letter_y > end_y) {
        alert("Maximum size exceeded, please redraw the box.");
        break;
      }
      else {
        if(letter_x >= end_x - font_size) {
          count_word = 0;
          letter_x = start_x;
          letter_y = letter_y + font_size;
        }
      }
      DrawText(letter, letter_x, letter_y);
      count_word++;
      arr_word.push([letter, letter_x, letter_y]);
      console.table(arr_word);
      break;
  }
}

function RemoveTypeLetter() {
}
