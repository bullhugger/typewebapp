var canvasBox = document.getElementById("canvasBox");
var canvasCtx = canvasBox.getContext("2d");
var background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
var font_color = window.getComputedStyle(document.body, null).getPropertyValue('color');
var arr_word = [];
var arr_box = [];
var arr_index = 0;
var count_box = 0 ;
var count_word = 0;
var font_size = 30;
var font_type = "Sans Serif";
var tool_open = false;

document.addEventListener("keypress", SelectMode, true);

function SelectMode(event) {
  if(event.key== "Backspace") {
    event.preventDefault();
  }
  else {
    switch(event.key) {
      case "l" :
        DrawLine();
      break;
    }
  }
}
let start_pos = [];

function DrawLine() {
  document.addEventListener("pointerdown", SetStart, true);
}

function SetStart(event) {
  let start_x = event.clientX;
  let start_y = event.clientY;
  document.removeEventListener("pointerdown", SetStart, true);
  document.addEventListener("pointermove", DrawLineMove(start_x, start_y), true);
}

function DrawLineMove(x_start, y_start) {
  let x_pos = event.clientX;
  let y_pos = event.clientY;
  canvasCtx.beginPath();
  canvasCtx.moveTo(x_start, y_start);
  canvasCtx.lineTo(x_pos, y_pos);
  canvasCtx.stroke();
}
