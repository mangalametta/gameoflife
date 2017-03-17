//Name: Cheng-Yao Chou
//Test Enviroment: OSX Chrome
//Editor: Sublime Text
//Description: for js, html and oop Execrise
//
var FLOOR_HEIGHT = 50;
var lineWIDTH = 5;
var WIDTH = 1000;
var HEIGHT = 750;
var MAP_WIDTH = 2000;
var Present_mapLeft = 0;
var upCounter = 0;
var gravity = 3;
var v=0;
//
var forwarding = false;
var backwarding = false;
var upwarding = false;
var hurting = false;
//
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
		this.isImmortal = I;
	}
}

class MovingObject extends Root{
	constructor(ml, au){
		super(ml,au);
	}
	checkOverlape(obj){
		if((this.mapLeft >= obj.mapLeft && this.mapLeft < obj.mapLeft+obj.width)||(obj.mapLeft >= this.mapLeft && obj.mapLeft < this.mapLeft+this.width)){
			if((this.absUp <= obj.absUp&& this.absUp > obj.absUp-obj.height)||(obj.absUp <= this.absUp && obj.absUp > this.absUp-this.height)){
				return true;
			}
			else{
				return false;
			}
		}
		else{
			return false;
		}
	}
	fallingDetermine(obj){
		if((this.mapLeft >= obj.mapLeft && this.mapLeft < obj.mapLeft+obj.width)||(obj.mapLeft >= this.mapLeft && obj.mapLeft < this.mapLeft+this.width)){
			if(obj.absUp > this.absUp-this.height && obj.absUp <this.absUp){
				return false;
			}
			return true;
		}
		return true;
	}
}

class Monster extends MovingObject{
	constructor(ml,au,h,w,lmin,lmax,n,s,v){
		super(ml,au);
		this.name = n;
		this.height = h;
		this.width = w;
		this.minLeft = lmin;
		this.maxLeft = lmax;
		this.symbol = s;
		this.vector = v;
	}
	draw(panel){
		panel.fillStyle = "#90c2f4";
		panel.globalAlpha = 0.5;
		panel.fillRect(this.mapLeft - Present_mapLeft, HEIGHT - this.absUp-14,this.width,15);
		panel.globalAlpha = 1;
		panel.fillStyle = "#000000";
		panel.font = "15px Ariml";
		panel.fillText(this.name, this.mapLeft -Present_mapLeft,HEIGHT - this.absUp,this.width);
		panel.font = this.width+"px Ariml";
		panel.fillText(this.symbol, this.mapLeft -Present_mapLeft,HEIGHT-this.absUp+this.height,this.width);
	}
	checkOverlape(obj){
		return super.checkOverlape(obj);
	}
}

class Player extends MovingObject{
	constructor(ml,au,n){
		super(ml,au);
		console.log(this.absUp);
		this.width = 50;
		this.height = 80;
		this.name = n;
		this.hp=100;
		this.inAir = true;
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
		panel.fillRect(this.mapLeft - Present_mapLeft, HEIGHT-this.absUp,50,60);
		panel.fillStyle = "#C4C400";
		panel.fillRect(this.mapLeft+20 - Present_mapLeft,HEIGHT-this.absUp+30,10,25);
		if((this.mapLeft/10)%6>=3){
			panel.fillStyle = "#e90c0c";
			panel.fillRect(this.mapLeft+15 -Present_mapLeft,HEIGHT-this.absUp+60,15,20);
			panel.fillStyle = "#0C8763";
			panel.fillRect(this.mapLeft+20 -Present_mapLeft,HEIGHT-this.absUp+60,15,20);
		}
		else{
			panel.fillStyle = "#e90c0c";
			panel.fillRect(this.mapLeft+20 -Present_mapLeft,HEIGHT-this.absUp+60,15,20);
			panel.fillStyle = "#0C8763";
			panel.fillRect(this.mapLeft+15 -Present_mapLeft,HEIGHT-this.absUp+60,15,20);
		}
		if(hurting){
			panel.globalAlpha = 0.7;
			panel.fillStyle = "#FF0000";
			panel.fillRect(this.mapLeft - Present_mapLeft, HEIGHT-this.absUp,50,60);
			panel.fillRect(this.mapLeft+20 - Present_mapLeft,HEIGHT-this.absUp+30,10,25);
			panel.fillRect(this.mapLeft+20 -Present_mapLeft,HEIGHT-this.absUp+60,15,20);
			panel.fillRect(this.mapLeft+15 -Present_mapLeft,HEIGHT-this.absUp+60,15,20);
			panel.globalAlpha = 1;
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
	checkOverlape(obj){
		return super.checkOverlape(obj);
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
		for(var i = 0;i<this.height/10;i++){
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

function updateScreen(panel, player, bricks, boxes, mosters){
	panel.fillStyle = "#FFFFFF";
	panel.fillRect(0,0,WIDTH,HEIGHT);
	player.draw(panel);
	for(var i in bricks)
		bricks[i].draw(panel);
	for(var i in boxes)
		boxes[i].draw(panel);
	for(var i in monsters)
		monsters[i].draw(panel);

}

function Motions(player, mosters){
	//player
	hurting = false;
	for(var i in monsters){
		if(!player.fallingDetermine(monsters[i])){
			hurting = true;
			player.hp-=1;
			break;
		}
	}
	if(forwarding){
		player.xmoving(5);
		for(var i in bricks){
			if(player.checkOverlape(bricks[i])){
				player.xmoving(-5);
				break;
			}
		}
	}
	else if(backwarding){
		player.xmoving(-5);
		for(var i in bricks){
			if(player.checkOverlape(bricks[i])){
				player.xmoving(5);
				break;
			}
		}
	}
	if(upwarding && !player.inAir){
		v = 35;
	}
	//monster
	for(var i in monsters){
		if((monsters[i].mapLeft + monsters[i].vector > monsters[i].maxLeft)||(monsters[i].mapLeft + monsters[i].vector < monsters[i].minLeft)){
			monsters[i].vector *= -1;
		}
		monsters[i].mapLeft += monsters[i].vector;
		/*if(monsters[i].checkOverlape(player)){
			mosters[i].mapLeft -= monsters[i].vector;
		}*/
	}
	//gravity falls
	v-=gravity;
	player.absUp += v;
	player.inAir = true;
	if(v <= 0)upwarding=false;
	for(var i in bricks){
		if(!player.fallingDetermine(bricks[i])){
			player.absUp = bricks[i].absUp+player.height;
			player.inAir = false;
			v=0;
			break;
		}
		if(player.checkOverlape(bricks[i])){
			player.absUp = bricks[i].absUp-bricks[i].height;
			v=0;
			break;
		}
	}
	for(var i in monsters){
		if(!player.fallingDetermine(monsters[i]) && !upwarding && player.inAir){
			monsters.splice(i,1);
		}
	}

}
