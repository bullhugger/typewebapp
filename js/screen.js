var canvasBox = document.getElementById("canvasBox");
var canvasCtx = canvasBox.getContext("2d");
var background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
var font_color = window.getComputedStyle(document.body, null).getPropertyValue('color');
var arr_word = [];
var font_size = 30;
var font_type = "Sans Serif";
var count_word = 0;
var count_box = 0 ;
var arr_index = 0;
var canvasArea = document.getElementById("canvasBox");

canvasArea.addEventListener("pointerdown", e => {
  canvasCtx.canvas.width = window.innerWidth;
  canvasCtx.canvas.height = window.innerHeight;
  count_word = 0;
  arr_word = [];
  var flag = true;
  var x_start = event.clientX;
  var y_start = event.clientX;
  canvasArea.addEventListener("pointermove", e => {
    if(flag == true) {
      let x_pos = event.clientX;
      let y_pos = event.clientY;
      drawBox(x_start, y_start, x_pos, y_pos);
    }
    canvasArea.addEventListener("pointerup", e => {
      var x_end = event.clientX;
      var y_end = event.clientY;
      var x_units = x_end - x_start;
      var y_units = y_end - y_start;
      flag = false;
    })
  })
});

function drawBox(x_start, y_start, x_pos, y_pos) {
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  canvasCtx.beginPath();
  canvasCtx.strokeRect(x_start, y_start, x_pos, y_pos);
  canvasCtx.stroke();
}

function clearBox(arr_word) {
  canvasCtx.clearRect(0, 0, canvasBox.width, canvasBox.height);
  console.table(arr_word);
  for(i = 0; i < arr_word.length; i++) {
    letter = arr_word[i][0];
    x_pos = arr_word[i][1];
    y_pos = arr_word[i][2];
    canvasCtx.fillText(letter, x_pos, y_pos);
    console.log(letter);
  }
}

function drawText(letter, x_pos, y_pos, font_size, text_type) {
  canvasCtx.beginPath();
  canvasCtx.font = font_size + "px " + font_type;
  if(text_type === true) {
    canvasCtx.fillStyle = background_color;
    canvasCtx.fillText(letter, x_pos, y_pos);
    count_word--;
    console.log(count_word);
  }
  else {
    arr_word.push([letter, x_pos, y_pos]);
    canvasCtx.fillStyle = font_color;
    canvasCtx.fillText(letter, x_pos, y_pos);
    count_word++;
    console.log(count_word);
  }
}
