var canvasBox = document.getElementById("canvasBox");
var canvasCtx = canvasBox.getContext("2d");
var background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
var font_color = window.getComputedStyle(document.body, null).getPropertyValue('color');
var arr_word = [];
var arr_box = [];
var start_pos = [];
var move_pos = [];
var arr_index = 0;
var count_box = 0 ;
var count_word = 0;
var font_size = 30;
var font_type = "Sans Serif";
var tool_open = false;
var move = false;

document.addEventListener("keypress", SelectMode, true);

function SelectMode(event) {
  canvasCtx.canvas.width = window.innerWidth;
  canvasCtx.canvas.height = window.innerHeight;
  if(event.key== "Backspace") {
    event.preventDefault();
  }
  else {
    switch(event.key) {
      case "l" :
        document.addEventListener("pointerdown", SetStart, true);
        document.addEventListener("pointerup", SetEnd, true);
      break;
    }
  }
}
function DrawLine(move) {
  if(move == true) {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.moveTo(start_pos[0], start_pos[1]);
    canvasCtx.lineTo(move_pos[0], move_pos[1]);
    canvasCtx.stroke();
  }
  else {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.beginPath();
    canvasCtx.moveTo(start_pos[0], start_pos[1]);
    canvasCtx.lineTo(end_pos[0], end_pos[1]);
    canvasCtx.stroke();
  }
}

function SetStart(event) {
  start_pos[0] = event.clientX;
  start_pos[1] = event.clientY;
  document.removeEventListener("pointerdown", SetStart, true);
  document.addEventListener("pointermove", SetMove, true);
}

function SetMove(event) {
  move_pos[0] = event.clientX;
  move_pos[1] = event.clientY;
  DrawLine(false);
}

function SetEnd(event) {
  end_pos[0] = event.clientX;
  end_pos[1] = event.clientY;
  document.removeEventListener("pointermove", SetMove, true);
  DrawLine(true);
}
