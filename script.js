var board = document.getElementById('board');
var context = board.getContext('2d');
var black,red,green,blue,jiw;
autoCanvasSize();
getColor();
getPenWidth();
listenMouse();

document.ontouchmove = function (event){
	event.preventDefault();
	event.stopPropagation();
}

function getColor() {
	black = document.getElementById('color-black');
	red = document.getElementById('color-red');
	green = document.getElementById('color-green');
	blue = document.getElementById('color-blue');
	black.onclick = function() {
		context.fillStyle = 'black';
		context.strokeStyle = 'black';
		black.classList.add('active');
		red.classList.remove('active');
		green.classList.remove('active');
		blue.classList.remove('active');
	};
	red.onclick = function() {
		context.fillStyle = 'red';
		context.strokeStyle = 'red';
		red.classList.add('active');
		black.classList.remove('active');
		green.classList.remove('active');
		blue.classList.remove('active');
	};
	green.onclick = function() {
		context.fillStyle = 'green';
		context.strokeStyle = 'green';
		green.classList.add('active');
		red.classList.remove('active');
		black.classList.remove('active');
		blue.classList.remove('active');
	};
	blue.onclick = function() {
		context.fillStyle = 'blue';
		context.strokeStyle = 'blue';
		blue.classList.add('active');
		red.classList.remove('active');
		green.classList.remove('active');
		black.classList.remove('active');
	};
	
}

function getPenWidth() {
	penThin.onclick = function(){
		context.lineWidth = 4;
		jiw = context.lineWidth;
		penThin.classList.add('active');
        penThick.classList.remove('active');
	}
    penThick.onclick = function(){
		context.lineWidth = 6;
		jiw = context.lineWidth;
		penThick.classList.add('active');	
        penThin.classList.remove('active');		
	}
};

function drawArc(x,y,raidus){
  context.beginPath();
  context.arc(x,y,raidus-0.5,0,Math.PI*2);
  context.fill();
}
function drawLine(x1,y1,x2,y2) {
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.stroke();
  context.closePath();
}
  
function listenMouse() {
  var paintFlag = false;
  var eraserOn = false;
  context.lineWidth = 4;
  eraser.onclick = function() {
    eraserOn = true;
	eraser.classList.add('active');
	pen.classList.remove('active');
  };
  pen.onclick = function() {
    eraserOn = false;
	pen.classList.add('active');
	eraser.classList.remove('active');
  };
  var lastPoint = {x:undefined,y:undefined};
  if(document.body.ontouchstart !== undefined){
    board.ontouchstart = function (event) {
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      paintFlag = true;
      if(eraserOn){
        context.clearRect(x-5,y-5,10,10);
      }else{
        lastPoint = {x:x,y:y};
        } 
    };	  
    board.ontouchmove = function (event) {
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      if(paintFlag){
        if(eraserOn){
          context.clearRect(x-5,y-5,10,10);
        }else{
            var newPoint = {x:x,y:y};
            drawLine(lastPoint.x,lastPoint.y,x,y);
            lastPoint = newPoint;
            drawArc(x,y,context.lineWidth/2)
  	    }
      }
    };
    board.ontouchend = function() {
     paintFlag = false;
    };
  }else{
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
      var x = event.clientX;
      var y = event.clientY;
      if(paintFlag){
        if(eraserOn){
          context.clearRect(x-5,y-5,10,10);
        }else{
            var newPoint = {x:x,y:y};
            drawLine(lastPoint.x,lastPoint.y,x,y);
            lastPoint = newPoint;
            drawArc(x,y,context.lineWidth/2)
  	    }
      }
    };
    board.onmouseup = function() {
     paintFlag = false;
    };
    board.onmouseout = function() {
     paintFlag = false;
    }
  }
};
function canvasSize() {
  var x = document.documentElement.clientWidth;
  var y = document.documentElement.clientHeight;
  board.width = x;
  board.height = y;
};
function autoCanvasSize() {
    function canvasSize() {
    var x = document.documentElement.clientWidth;
    var y = document.documentElement.clientHeight;
    board.width = x;
    board.height = y;
	context.lineWidth = jiw;
  };
  canvasSize();
  window.onresize = function() {
	var imageData = context.getImageData(0,0,board.width,board.height);
    canvasSize();
	context.putImageData(imageData,0,0);
  };

};

clear.onclick = function () {
	context.clearRect(0,0,board.width,board.height);
};
save.onclick = function() {
	var url = board.toDataURL('image/png')
	var a = document.createElement('a');
	document.body.appendChild(a);
	a.href = url;
	a.download = 'img';
	a.target = '_blank';
	a.click();
};
