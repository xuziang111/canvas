var board = document.getElementById('board');
var context = board.getContext('2d');
autoCanvasSize(board);
listenMouse(board);
eraser.onclick = function() {
  active.className = 'x';
};
pen.onclick = function() {
  active.className = '';
};
function drawArc(x,y){
  context.beginPath();
  context.fillStyle= 'black';
  context.arc(x,y,1.5,0,Math.PI*2);
  context.fill();
  //console.log(x,y);
}
function drawLine(x1,y1,x2,y2) {
  context.beginPath();
  context.lineWidth = 4;
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.stroke();
  context.closePath();
}
  
function listenMouse(board) {
  var paintFlag = false;
  var eraserOn = false;
  active.onclick = function() {
  eraserOn = !eraserOn;
    //console.log(eraserOn);
  }
  var lastPoint = {x:undefined,y:undefined};
  board.onmousedown = function (event) {
    var x = event.clientX;
    var y = event.clientY;
    paintFlag = true;
    if(eraserOn){
      context.clearRect(x-5,y-5,10,10);
    }else{
      lastPoint = {x:x,y:y};
      } 
  };
  board.onmousemove = function (event) {
    //console.log(paintFlag);
    var x = event.clientX;
    var y = event.clientY;
    if(paintFlag){
    if(eraserOn){
      context.clearRect(x-5,y-5,10,10);
    }else{
        //console.log(x,y);
        var newPoint = {x:x,y:y};
        drawLine(lastPoint.x,lastPoint.y,x,y);
        lastPoint = newPoint;
        drawArc(x,y)
	}
  }
};
  board.onmouseup = function() {
   paintFlag = false;
  };
  board.onmouseout = function() {
   paintFlag = false;
  }
};
function canvasSize() {
  var x = document.documentElement.clientWidth;
  var y = document.documentElement.clientHeight;
  board.width = x;
  board.height = y;
};
function autoCanvasSize(board) {
    function canvasSize() {
    var x = document.documentElement.clientWidth;
    var y = document.documentElement.clientHeight;
    board.width = x;
    board.height = y;
  };
  canvasSize();
  window.onresize = function() {
    canvasSize();
  };
};
