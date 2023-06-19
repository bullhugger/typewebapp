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

document.addEventListener("keydown", selectMode, true);

function getCursor(event) {
  addEventListener("mousedown", event => {
    canvasCtx.canvas.width = window.innerWidth;
    canvasCtx.canvas.height = window.innerHeight;
    count_word = 0;
    arr_word = [];
    var flag = true;
    let x_start = event.clientX;
    let y_start = event.clientY;
    addEventListener("mousemove", event => {
      if(flag == true) {
        let x_pos = event.clientX;
        let y_pos = event.clientY;
        drawBox(x_start, y_start, x_pos - x_start, y_pos - y_start);
      }
    });
    addEventListener("mouseup", event => {
      var x_end = event.clientX;
      var y_end = event.clientY;
      var x_units = x_end - x_start;
      var y_units = y_end - y_start;
      flag = false;
      document.addEventListener("keydown", event => {
        var letter_pos = (count_word * font_size);
        let letter = event.key;
        switch(letter) {
          case "Backspace" :
            if(x_start + letter_pos <= x_start) {
              if(arr_word.length !== 0) {
                arr_index = arr_word.length - 1;
                letter = arr_word[arr_index][0];
                x_pos = arr_word[arr_index][1];
                y_pos = arr_word[arr_index][2];
                drawText(letter, x_pos, y_pos, font_size, true);
                arr_word.pop();
                console.table(arr_word);
              }
              break;
            }
            else {
              letter = arr_word[arr_word.length - 1];
              drawText(letter, x_start + letter_pos - font_size, y_start + font_size, font_size, true);
              arr_word.pop();
              console.log(arr_word);
              break;
            }
          case "Alt" :
            break;
          case "Control" :
            break;
          case "Tab" :
            break;
          case "Shift" :
            break;
          case "Escape" :
            clearBox(arr_word);
            break;
          default :
            if(letter == "Enter" || (x_start + letter_pos - font_size) > x_end) {
              y_start = y_start + font_size;
              letter_pos = 0;
              count_word = 0;
              return;
            }
            drawText(letter, x_start + letter_pos, y_start + font_size, font_size, false);
            break;
        }
      })
    })
  });
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

function selectMode(event) {
  if(event.key == "Backspace") {
    event.preventDefault();
  }
  switch(event.key) {
    case "t":
      getCursor(event.key);
      document.removeEventListener("keydown", selectMode, true);
      tool_open = true;
      break;
    case "Escape" :
      tool_open = false;
      break;
  }
}

$('#font_type').on('change', function() {
  font_type = $(this).val();
})

$('#font_size').on('change', function() {
  font_size = $(this).val();
})
