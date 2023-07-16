const canvasBox = document.getElementById("canvasBox");
const canvasRect = canvasBox.getBoundingClientRect();
const canvasCtx = canvasBox.getContext("2d"); var background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color'); var font_color = window.getComputedStyle(document.body, null).getPropertyValue('color');
let arr_word = [];
let arr_box = [];
let arr_object = [];
let arr_element = [];
let arr_index = 0;
let count_word = 0;
let font_align = "start";
let font_baseline = "top";
let font_size = 30;
let font_type = "Sans Serif";
let font_config = font_size + "px " + font_type;
let tool_open = false;
let move = false;
let start_x     = 0;
let start_y     = 0;
let end_x       = 0;
let end_y       = 0;
let move_x      = 0;
let move_y      = 0;
let letter_x    = 0;
let letter_y    = 0;
let line_weight = "5px";

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
      case "l" :
        document.removeEventListener("keydown", SelectMode);
        document.addEventListener("pointerdown", SetStartLine);
        document.addEventListener("pointerup", SetEndLine);
        break;
      case "t" :
        document.removeEventListener("keydown", SelectMode);
        document.addEventListener("pointerdown", SetStartBox);
        document.addEventListener("pointerup", function() {
          SetEndBox(event, true);
        });
        break;

      case "b" :
        document.addEvenlistener("pointerup", function() {
          SetEndBox(event, false);
        });
        break;
    }
  }
}

function ReadyMode() {
  document.addEventListener("keydown", SelectMode);
}

function DrawLine(move, start_x, start_y, end_x, end_y) {
  canvasCtx.beginPath();
  canvasCtx.moveTo(start_x, start_y);
  if (move === true) {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.lineTo(move_x, move_y);
  }
  else {
    canvasCtx.lineTo(end_x, end_y);
  }
  canvasCtx.lineWidth = line_weight;
  canvasCtx.stroke();
}

function DrawBox(move) {
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  canvasCtx.beginPath();
  if (move === true) {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
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
  document.removeEventListener("keydown", SelectMode);
  document.removeEventListener("pointerdown", SetStartBox);
  document.addEventListener("pointermove", SetMoveBox);
}

function SetStartLine(event) {
  start_x = event.clientX - canvasRect.left;
  start_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointerdown", SetStartLine);
  document.addEventListener("pointermove", SetMoveLine);
}

function SetMoveLine(event) {
  move_x = event.clientX - canvasRect.left;
  move_y = event.clientY - canvasRect.top;
  DrawLine(true, start_x, start_y, move_x, move_y);
}

function SetMoveBox(event) {
  move_x = event.clientX - canvasRect.left;
  move_y = event.clientY - canvasRect.top;
  DrawBox(true, start_x, start_y, move_x, move_y);
  count_word = 0;
}

function SetEndLine(event) {
  end_x = event.clientX - canvasRect.left;
  end_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointermove", SetMoveLine);
  document.removeEventListener("pointerup", SetEndLine);
  DrawLine(true, start_x, start_y, end_x, end_y);
  arr_element.push(["line", start_x, start_y, end_x, end_y]);
  console.table(arr_element);
  DrawShape();
  ReadyMode();
}

function SetEndBox(event, type) {
  end_x = event.clientX - canvasRect.left;
  end_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointermove", SetMoveBox);
  if(type == false) {
    DrawBox(false);
    arr_element.push(["box", start_x, start_y, end_x, end_y]);
  }
  else {
    document.addEventListener("keydown", function() {
      TypeLetter(event, start_x, start_y);
    });
  }
  document.removeEventListener("pointerup", SetEndBox);
}

function RedrawText() {
  for(let i=0; i < arr_word.length; i++) {
    letter   = arr_word[i][0];
    letter_x = arr_word[i][1];
    letter_y = arr_word[i][2];
    DrawText(letter, letter_x, letter_y);
  }
}

function DrawShape() {
  for(let i=0; i < arr_element.length; i++) {
    shape = arr_element[i][0];
    start_x = arr_element[i][1];
    start_y = arr_element[i][2];
    end_x = arr_element[i][3];
    end_y = arr_element[i][4];
    switch(shape) {
      case "line" :
        DrawLine(false, start_x, start_y, end_x, end_y);
        break;
      case "box" :
        DrawBox(false, start_x, start_y, end_x, end_y);
        break;
    }
  }
}

function TypeLetter(event, letter_x, letter_y) {
  letter = event.key;
  switch(letter) {
    case "Enter":
      letter_y += font_size;
      break;
    case "Backspace" :
      arr_word.pop;
      count_word--;
      RedrawText();
      break;
    case "Escape" :
      document.removeEventListener("keydown", TypeLetter);
      canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
      RedrawText();
      StoreObject();
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
      if(letter_x >= end_x - font_size) {
        count_word = 0;
        letter_x = start_x;
        letter_y += font_size;
      }
      DrawText(letter, letter_x, letter_y);
      count_word++;
      arr_word.push([letter, letter_x, letter_y]);
      break;
  }
}

function StoreObject() {
  arr_object.push(arr_word);
  arr_word = [];
  console.table(arr_object);
}
