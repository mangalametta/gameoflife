//constants
var FLOOR_HEIGHT = 50;
var lineWIDTH = 5;
var WIDTH = 1000;
var HEIGHT = 750;
var MAP_WIDTH = 2000;
var Present_mapLeft = 0;
var forwarding = false;
var backwarding = false;

class Root{
	constructor(ml, au){
		this.mapLeft = ml;
		this.absUp = au;
		this.width;
		this.height;
	}
}

class Barrier extends Root{
	constructor(ml,au,w,h,I){
		super(ml,au);
		this.width = w;
		this.height = h;
		this.isImmortml = I;
	}
}

class Player extends Root{
	constructor(ml,au,n){
		super(ml,au);
		this.width = 50;
		this.height = 80;
		this.name = n;
		this.hp=100;
	}

	draw(panel){
		//name
		panel.fillStyle = "#90c2f4";
		panel.fillRect(0, 0,40,15);
		panel.fillStyle = "#000000";
		panel.font = "15px Ariml";
		panel.fillText(this.name, 3 ,13);
		//hp
		panel.fillStyle = "#f1043b";
		panel.fillRect(40, 0,100,15);
		panel.fillStyle = "#04be11";
		panel.fillRect(40, 0,this.hp,15);
		panel.fillStyle = "#044fbe";
		panel.font = "15px Ariml";
		panel.fillText("HP "+this.hp,70 ,13);
		//player
		panel.fillStyle = "#0C8763";
		panel.fillRect(this.mapLeft - Present_mapLeft, HEIGHT-this.absUp-FLOOR_HEIGHT,50,60);
		panel.fillStyle = "#C4C400";
		panel.fillRect(this.mapLeft+20 - Present_mapLeft,HEIGHT-this.absUp+30-FLOOR_HEIGHT,10,25);
		if((this.mapLeft/10)%6>=3){
			panel.fillStyle = "#e90c0c";
			panel.fillRect(this.mapLeft+15 -Present_mapLeft,HEIGHT-this.absUp+60-FLOOR_HEIGHT,15,19);
			panel.fillStyle = "#0C8763";
			panel.fillRect(this.mapLeft+20 -Present_mapLeft,HEIGHT-this.absUp+60-FLOOR_HEIGHT,15,19);
		}
		else{
			panel.fillStyle = "#e90c0c";
			panel.fillRect(this.mapLeft+20 -Present_mapLeft,HEIGHT-this.absUp+60-FLOOR_HEIGHT,15,19);
			panel.fillStyle = "#0C8763";
			panel.fillRect(this.mapLeft+15 -Present_mapLeft,HEIGHT-this.absUp+60-FLOOR_HEIGHT,15,19);
		}
	}

	xmoving(distance){
		if(this.mapLeft + distance +this.width >MAP_WIDTH || this.mapLeft + distance <0){
			return;
		}
		else if(this.mapLeft + this.width/2 >= WIDTH/2 && MAP_WIDTH - this.mapLeft >= WIDTH/2 && Present_mapLeft + distance >=0 && Present_mapLeft +distance +WIDTH <=MAP_WIDTH){
			this.mapLeft += distance;
			Present_mapLeft += distance;
		}
		else{
			this.mapLeft += distance;
		}
	}

	upward(){
		
	}

}

class Box extends Barrier{
	constructor(ml,au,w,h,s,px){
		super(ml,au,w,h,0);
		this.symbol = s;
		this.size = px;
	}
	draw(panel){
		panel.fillStyle = "#000000";
		panel.fillRect(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp,this.width,this.height);
		panel.fillStyle = "#FFFFFF";
		panel.font = this.size +"px Ariml";
		panel.fillText(this.symbol, this.mapLeft -Present_mapLeft, HEIGHT - this.absUp +this.height-5);
		panel.strokeStyle = "brown";
		panel.beginPath();
		panel.moveTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp);
		panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp);
		panel.stroke();
		panel.beginPath();
		panel.moveTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp);
		panel.lineTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp+this.height);
		panel.stroke();
		panel.lineTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp+this.height);
		panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp+this.height);
		panel.stroke();
		panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp);
		panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp+this.height);
		panel.stroke();
	}
}

class Brick extends Barrier{
	constructor(ml,au,w,h){
		super(ml,au,w,h,1);
	}
	draw(panel){
		panel.fillStyle = "#000000";
		panel.fillRect(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp,this.width,this.height);
		for(var i = 0;i<this.absUp/10;i++){
			panel.beginPath();
			panel.strokeStyle = "brown";
			panel.moveTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp+i*10);
			panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp+i*10);
			panel.stroke();
			for(var j = 0;j<this.width/20;j++){
				var offset = 0;
				if(i%2==0)
				offset = 10;
				panel.beginPath();
				panel.strokeStyle = "brown";
				panel.moveTo(this.mapLeft -Present_mapLeft+j*20+offset,HEIGHT-this.absUp+i*10);
				panel.lineTo(this.mapLeft -Present_mapLeft+j*20+offset,HEIGHT-this.absUp+(i+1)*10);
				panel.stroke();
			}
		}
		panel.strokeStyle = "brown";
		panel.beginPath();
		panel.moveTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp);
		panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp);
		panel.stroke();
		panel.beginPath();
		panel.moveTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp);
		panel.lineTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp+this.height);
		panel.stroke();
		panel.lineTo(this.mapLeft -Present_mapLeft,HEIGHT-this.absUp+this.height);
		panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp+this.height);
		panel.stroke();
		panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp);
		panel.lineTo(this.mapLeft -Present_mapLeft+this.width,HEIGHT-this.absUp+this.height);
		panel.stroke();
	}
}

function updateScreen(panel, player, bricks, boxes){
	panel.fillStyle = "#FFFFFF";
	panel.fillRect(0,0,WIDTH,HEIGHT);
	player.draw(panel);
	for(var i in bricks)
		bricks[i].draw(panel);
	for(var i in boxes)
		boxes[i].draw(panel);
}

function playerMotion(player){
	if(forwarding){
		player.xmoving(5);
	}
	else if(backwarding){
		player.xmoving(-5);
	}
}