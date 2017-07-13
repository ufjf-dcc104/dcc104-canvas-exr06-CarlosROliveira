var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var qtdTesourosEncontrados = 0;
var perdeu = false;

function init(){
  qtdTesourosEncontrados = 0;
  perdeu = false;
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  pc = new Sprite();
  pc.x = 60;
  pc.y = 60;
  pc.images = images;
  initControls();
  requestAnimationFrame(passo);
}


function passo(t){
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  //ctx.save();
  //ctx.translate(250,0);
  //ctx.scale(1,0.5);
  //ctx.rotate(Math.PI/4);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  pc.mover(map, dt);
  //map.perseguir(pc);
  map.mover(dt);
  map.desenhar(ctx);
  pc.desenhar(ctx);
  anterior = t;
  //ctx.restore();
  frame = (frame<9)?frame:1;
  //images.drawFrame(ctx,"pc",8,Math.floor(frame),0,0,64);
  frame+=2*dt;
  
  if(qtdTesourosEncontrados==5){
	ctx.fillStyle = "#000";
	ctx.font="30px Arial";
	ctx.fillText("Objetivo Concluído", 90, 210);
	ctx.font="13px Arial";
	ctx.fillText("Espaço - Iniciar Jogo", 160, 240);
	pc.vx = 0;
	pc.vy = 0;
  }
  if(perdeu){
	ctx.fillStyle = "#000";
	ctx.font="30px Arial";
	ctx.fillText("Você Perdeu", 120, 210);
	ctx.font="13px Arial";
	ctx.fillText("Espaço - Iniciar Jogo", 160, 240);
	pc.vx = 0;
	pc.vy = 0;
  }
}


function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
	  case 32:
		if(qtdTesourosEncontrados == 5 || perdeu){
			init();
		}
        break;
      case 37:
	    if(qtdTesourosEncontrados < 5 && !perdeu){
			pc.vx = -100;
			pc.vy = 0;
			pc.pose = 2;
			e.preventDefault();
		}
        break;
      case 38:
	    if(qtdTesourosEncontrados < 5 && !perdeu){
			pc.vy = -100;
			pc.vx = 0;
			pc.pose = 3;
			e.preventDefault();
		}
        break;
      case 39:
	    if(qtdTesourosEncontrados < 5 && !perdeu){
			pc.vx = 100;
			pc.vy = 0;
			pc.pose = 0;
			e.preventDefault();
		}
        break;
      case 40:
	    if(qtdTesourosEncontrados < 5 && !perdeu){
			pc.vy = 100;
			pc.vx = 0;
			pc.pose = 1;
			e.preventDefault();
		}
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37:
      case 39:
        pc.vx = 0;
        pc.pose = 4;
        break;
      case 38:
      case 40:
        pc.vy = 0;
        break;
      default:

    }
  });
}
