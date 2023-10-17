var canvasBox = document.getElementById("canvasBox");
var canvasRect = canvasBox.getBoundingClientRect();
var canvasCtx = canvasBox.getContext("2d");
var background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
var font_color = window.getComputedStyle(document.body, null).getPropertyValue('color');
let arr_word = [];
let arr_box = [];
let arr_object = [];
let arr_element = [];
let arr_index = 0;
let count_word = 0;
let font_align = "start";
let font_baseline = "top";
let font_size = 30;
var font_type = "Sans Serif";
let font_config = font_size + "px " + font_type;
let tool_open = false;
let move = false;
let start_x = 0;
let start_y = 0;
let end_x = 0;
let end_y = 0;
let move_x = 0;
let move_y = 0;
let line_weight = "5px";

function SaveFile() {
  var save_state_word = JSON.stringfy(arr_word);
  var save_state_shape = JSON.stringfy(arr_object);
  $.ajax ({
    url: 'typeweb.action.php',
    dataType: 'json',
    data: {a:'save', data: save_state_word},
    success: function(data) {
      alert('File saved.');
    }
  })
}

$(document).ready(function() {
  canvasCtx.canvas.width = window.innerWidth;
  canvasCtx.canvas.height = window.innerHeight;
  ReadyMode();
});

function ChangeFont() {
  font_type = $('#fontType').val();
}

function SelectMode(event) {
  if (event.key == "Backspace") {
    event.preventDefault();
  }
  else {
    switch (event.key) {
      case "l":
        document.removeEventListener("keydown", SelectMode, true);
        document.addEventListener("pointerdown", SetStartLine, true);
        document.addEventListener("pointerup", SetEndLine, true);
      break;
      case "t":
        document.removeEventListener("keydown", SelectMode, true);
        document.addEventListener("pointerdown", SetStartBox, true);
        document.addEventListener("pointerup", SetEndBox, true);
      break;
    }
  }
}

function ReadyMode() {
  document.addEventListener("keydown", SelectMode, true);
  canvasBox = document.getElementById("canvasBox");
  canvasRect = canvasBox.getBoundingClientRect();
  canvasCtx = canvasBox.getContext("2d");
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
  arr_element.push([start_x, start_y, end_x, end_y]);
  document.addEventListener("keydown", TypeLetter, true);
}

function SetMoveLine(event) {
  move_x = event.clientX - canvasRect.left;
  move_y = event.clientY - canvasRect.top;
  DrawLine(true, start_x, start_y, move_x, move_y);
} function SetMoveBox(event) { move_x = event.clientX - canvasRect.left;
  move_y = event.clientY - canvasRect.top;
  DrawBox(true, start_x, start_y, move_x, move_y);
  count_word = 0;
}

function SetEndLine(event) {
  end_x = event.clientX - canvasRect.left;
  end_y = event.clientY - canvasRect.top;
  document.removeEventListener("pointermove", SetMoveLine, true);
  document.removeEventListener("pointerup", SetEndLine, true);
  DrawLine(true, start_x, start_y, end_x, end_y);
  arr_element.push(["line", start_x, start_y, end_x, end_y]);
  console.table(arr_element);
  DrawShape();
  ReadyMode();
}

function RedrawText() {
  for(let i=0; i < arr_word.length; i++) {
    letter   = arr_word[i][0];
    letter_x = arr_word[i][1];
    letter_y = arr_word[i][2];
    DrawText(letter, letter_x, letter_y, font_size, font_type);
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
        DrawBox(true, start_x, start_y, end_x, end_y);
        break;
    }
  }
}

function TypeLetter(event) {
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
      document.removeEventListener("keydown", TypeLetter, true);
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
      count_word = 0;
      letter_x = start_x;
      break;
    case "End" :
      letter_x = start_x + (font_size * count_word);
      break;
    case "F1" :
      break;
    case "F2" :
      break;
    case "F3" :
      break;
    case "F4" :
      break;
    case "F5" :
      break;
    case "F6" :
      break;
    case "F7" :
      break;
    case "F8" :
      break;
    case "F9" :
      break;
    case "F10" :
      break;
    case "F11" :
      break;
    case "F12" :
      break;
    default :
      letter_x = start_x + (font_size * count_word);
      if(letter_x >= end_x - font_size) {
        count_word = 0;
        letter_x = start_x;
        letter_y = letter_y + font_size;
      }
      DrawText(letter, letter_x, letter_y);
      count_word++;
      arr_word.push([letter, letter_x, letter_y, font_size, font_type]);
      break;
  }
}

function LoadSavedFile(id) {
  var id = $('#id').val();
  $.ajax({
    url: 'type_search',
    dataType: 'HTML',
    data: { id:id, a:'saved_file'},
    success: function(data) {
      $('#selectSaved').append(data);
    }
  })
}

function StoreObject() {
  arr_object.push(arr_word);
  arr_word = [];
  console.table(arr_object);
}
