var FLOOR_HEIGHT = 50;
var lineWIDTH = 5;
var WIDTH = 1000;
var HEIGHT = 750;

class root{
	constructor(al, au){
		this.absLeft = al;
		this.absUp = au;
		this.width;
		this.height;
	}
}

class barrier extends root{
	constructor(al,au,w,h,I){
		super(al,au);
		this.width = w;
		this.height = h;
		this.isImmortal = I;
	}
}

class player extends root{
	constructor(al,au,n){
		super(al,au);
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
		panel.font = "15px Arial";
		panel.fillText(this.name, 3 ,13);
		//hp
		panel.fillStyle = "#f1043b";
		panel.fillRect(40, 0,100,15);
		panel.fillStyle = "#04be11";
		panel.fillRect(40, 0,this.hp,15);
		panel.fillStyle = "#044fbe";
		panel.font = "15px Arial";
		panel.fillText("HP "+this.hp,70 ,13);
		//player
		panel.fillStyle = "#0C8763";
		panel.fillRect(this.absLeft, HEIGHT-this.absUp-FLOOR_HEIGHT,50,60);
		panel.fillStyle = "#C4C400";
		panel.fillRect(this.absLeft+20,HEIGHT-this.absUp+30-FLOOR_HEIGHT,10,25);
		if((this.absLeft/10)%6>=3){
			panel.fillStyle = "#e90c0c";
			panel.fillRect(this.absLeft+15,HEIGHT-this.absUp+60-FLOOR_HEIGHT,15,19);
			panel.fillStyle = "#0C8763";
			panel.fillRect(this.absLeft+20,HEIGHT-this.absUp+60-FLOOR_HEIGHT,15,19);
		}
		else{
			panel.fillStyle = "#e90c0c";
			panel.fillRect(this.absLeft+20,HEIGHT-this.absUp+60-FLOOR_HEIGHT,15,19);
			panel.fillStyle = "#0C8763";
			panel.fillRect(this.absLeft+15,HEIGHT-this.absUp+60-FLOOR_HEIGHT,15,19);
		}
	}

	forward(){
		this.absLeft += 5;
	}

	backword(){
		this.absLeft -= 5;
	}
}

class box extends barrier{
	constructor(al,au,w,h,s,px){
		super(al,au,w,h,0);
		this.symbol = s;
		this.size = px;
	}
	draw(panel){
		panel.fillStyle = "#000000";
		panel.fillRect(this.absLeft,HEIGHT-this.absUp,this.width,this.height);
		panel.fillStyle = "#FFFFFF";
		panel.font = this.size +"px Arial";
		panel.fillText(this.symbol, this.absLeft, HEIGHT - this.absUp +this.height-5);
		panel.strokeStyle = "brown";
		panel.beginPath();
		panel.moveTo(this.absLeft,HEIGHT-this.absUp);
		panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp);
		panel.stroke();
		panel.beginPath();
		panel.moveTo(this.absLeft,HEIGHT-this.absUp);
		panel.lineTo(this.absLeft,HEIGHT-this.absUp+this.height);
		panel.stroke();
		panel.lineTo(this.absLeft,HEIGHT-this.absUp+this.height);
		panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp+this.height);
		panel.stroke();
		panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp);
		panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp+this.height);
		panel.stroke();
	}
}

class brick extends barrier{
	constructor(al,au,w,h){
		super(al,au,w,h,1);
	}
	draw(panel){
		panel.fillStyle = "#000000";
		panel.fillRect(this.absLeft,HEIGHT-this.absUp,this.width,this.height);
		for(var i = 0;i<this.absUp/10;i++){
			panel.beginPath();
			panel.strokeStyle = "brown";
			panel.moveTo(this.absLeft,HEIGHT-this.absUp+i*10);
			panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp+i*10);
			panel.stroke();
			for(var j = 0;j<this.width/20;j++){
				var offset = 0;
				if(i%2==0)
				offset = 10;
				panel.beginPath();
				panel.strokeStyle = "brown";
				panel.moveTo(this.absLeft+j*20+offset,HEIGHT-this.absUp+i*10);
				panel.lineTo(this.absLeft+j*20+offset,HEIGHT-this.absUp+(i+1)*10);
				panel.stroke();
			}
		}
		panel.strokeStyle = "brown";
		panel.beginPath();
		panel.moveTo(this.absLeft,HEIGHT-this.absUp);
		panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp);
		panel.stroke();
		panel.beginPath();
		panel.moveTo(this.absLeft,HEIGHT-this.absUp);
		panel.lineTo(this.absLeft,HEIGHT-this.absUp+this.height);
		panel.stroke();
		panel.lineTo(this.absLeft,HEIGHT-this.absUp+this.height);
		panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp+this.height);
		panel.stroke();
		panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp);
		panel.lineTo(this.absLeft+this.width,HEIGHT-this.absUp+this.height);
		panel.stroke();
	}
}