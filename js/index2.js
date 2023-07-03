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
function DrawLine() {
  let start_pos = document.addEventListener("pointerdown", SetStart, true);
  alert(start_pos);
}

function SetStart(event)) {
  let start_x = event.clientX;
  let start_y = event.clientY;
  return [start_x, start_y];
}
