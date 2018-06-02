class Point {
		constructor(x,y) {
			this.x = x;
			this.y = y;
		}
		getX() {
			return this.x;
		}
		getY() {
			return this.y;
		}
}

class StatPoint {
		constructor(x,y,stat) {
			this.x = x;
			this.y = y;
			this.stat = stat;
		}
		getX() {
			return this.x;
		}
		getY() {
			return this.y;
		}
		getStat() {
			return this.stat;
		}
}

window.onload = function(){
	
	

	canvas = document.getElementById('can');
	ctx = canvas.getContext('2d');
	let height = window.innerHeight*0.99;
	let width = window.innerWidth*0.99;
	canvas.style.width = width + "px";
	canvas.style.height = height + "px";
	allPoints = [];
	statPoints = [];
	allPoints.push(new Point(canvas.width/2, canvas.height/2));
	time = 0;
	level = -1;
	drawStat = 0;
	stick = 80;
	setInterval(update, 1000/30);
}


function update() {
	ctx.fillStyle = 'rgb(800, 800, 800)';
	ctx.fillRect(0,0,canvas.width,canvas.height);

	time += 1/30;
	days = Math.floor(Math.round(time)/48);
	stat = Math.floor(Math.round(time)/24);

	function drawTime(t) {
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.font = "80px Font";
		ctx.fillText(" " + Math.floor(Math.round(t)/24) + " days , " + (Math.round(t) - Math.floor(Math.round(t)/24)*24) + " hours" ,50,100);
	}
	function drawSun() {
		var img = new Image();
		img.src = "img/Sun.png";
		ctx.drawImage(img, 60, 120, 100, 100);
	}
	function drawMoon() {
		var img = new Image();
		img.src = "img/moon.png";
		ctx.drawImage(img, 70, 130, 70, 70);
	}

	function drawDayTime(t) {
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.font = "60px Font";
		let hours1 = (Math.round(t) - Math.floor(Math.round(t)/24)*24);
		if ( hours1 >= 4 && hours1 < 12) {
			ctx.fillText("morning" ,150 ,185);
		} else if ( hours1 >= 12 && hours1 < 16 ) {
			ctx.fillText("noon" ,150 ,185);
		} else if ( hours1 >= 16 && hours1 < 19 ) {
			ctx.fillText("day" ,150 ,185);
		} else if ( hours1 >= 19 && hours1 < 22 ) {
			ctx.fillText("evening" ,150 ,185);
		} else if ( hours1 >= 22 && hours1 < 23 ) {
			ctx.fillText("night" ,150 ,185);
		} else if ( hours1 >= 23 || hours1 < 4 ) {
			ctx.fillText("midnight" ,150 ,185);
		}
	}

	drawTime(time);
	if ( (Math.round(time) - Math.floor(Math.round(time)/24)*24) > 18 || (Math.round(time) - Math.floor(Math.round(time)/24)*24) < 6 ) {
		drawMoon();
	} else {
		drawSun();
	}
	drawDayTime(time);


	function drawLine(x,y,tox,toy){
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(240, 240 , 240)';
		ctx.lineWidth=5;
		ctx.moveTo(x, y);
		ctx.lineTo(tox, toy);
		ctx.stroke();
	}

	function drawRect(x,y,lenght) {
		let pt1x = x - Math.sqrt(3)/2*lenght;
		let pt1y = y - 0.5*lenght;

		let pt2x = x;
		let pt2y = y - lenght;

		let pt3x = x + Math.sqrt(3)/2*lenght;
		let pt3y = y - 0.5*lenght;

		let pt4x = x + Math.sqrt(3)/2*lenght;
		let pt4y = y + 0.5*lenght;

		let pt5x = x;
		let pt5y = y + lenght;

		let pt6x = x - Math.sqrt(3)/2*lenght;
		let pt6y = y + 0.5*lenght;

		drawLine(pt1x, pt1y, pt2x, pt2y);
		drawLine(pt2x, pt2y, pt3x, pt3y);
		drawLine(pt3x, pt3y, pt4x, pt4y);
		drawLine(pt4x, pt4y, pt5x, pt5y);
		drawLine(pt5x, pt5y, pt6x, pt6y);
		drawLine(pt6x, pt6y, pt1x, pt1y);
	}

	function RectAround(x,y,lenght) {
		aroundPoints = [];
	
		let pt1x = x - Math.sqrt(3)*lenght;
		let pt1y = y;
		aroundPoints.push( new Point(pt1x,pt1y));

		let pt2x = x - Math.sqrt(3)/2*lenght;
		let pt2y = y - lenght*1.5;
		aroundPoints.push( new Point(pt2x,pt2y));

		let pt3x = x + Math.sqrt(3)/2*lenght;
		let pt3y = y - 1.5*lenght;
		aroundPoints.push( new Point(pt3x,pt3y));

		let pt4x = x + Math.sqrt(3)*lenght;
		let pt4y = y;
		aroundPoints.push( new Point(pt4x,pt4y));

		let pt5x = x + Math.sqrt(3)/2*lenght;
		let pt5y = y + 1.5*lenght;
		aroundPoints.push( new Point(pt5x,pt5y));

		let pt6x = x - Math.sqrt(3)/2*lenght;
		let pt6y = y + 1.5*lenght;
		aroundPoints.push( new Point(pt6x,pt6y));
		return aroundPoints;
	}

	function unique(arr) {
		let result = [];
		for (let x1 = 0; x1 < arr.length; x1++) {
			let eq = false;
			for (let y1 = 0; y1 < result.length; y1++) {
				if (arr[x1].getX() === result[y1].getX() && arr[x1].getY() === result[y1].getY()){
					eq = true;
				} 
			}
			if (eq === false) {
				result.push(arr[x1]);
			}
		}
		return result;
	}

	//function drawStation();

	for (let pt of allPoints) {
		drawRect(pt.getX(),pt.getY(),stick);
	}

	for (let stationsCat of statPoints) {
		var imga = new Image();
		console.log(stationsCat.getStat());
		imga.src = stationsCat.getStat();
		ctx.drawImage( imga , stationsCat.getX() - 50, stationsCat.getY() - 50, 100 , 100);
	}


	if (days > level) {
		for (let pt of allPoints) {
			let around = RectAround(pt.getX(),pt.getY(),stick);
			allPoints = allPoints.concat(around);
		}
		allPoints = unique(allPoints);
		level++;
		console.log(allPoints);
	}

	if (stat > drawStat) {
		let random = Math.floor((allPoints.length)*Math.random());
		let exist = false;
		for (st of statPoints) {
			if (st.getX() == allPoints[random].getX() && st.getY() == allPoints[random].getY()) {
				exist = true;
			}
		}
		if (exist === false) {
			drawStat++;
			let randomType = Math.round(2*Math.random()) + 1 ;
			let src = "stations/" + randomType + ".png";
			statPoints.push(new StatPoint(allPoints[random].getX(),allPoints[random].getY(), src) );
		}
	}



}