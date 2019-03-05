
function unfade(element) {
    var op = 0.1;  
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 30);
}

function fade(element) {
    var op = 1; 
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 30);
}

function set(){

	document.getElementById("stopButton").click();

  var paramsForm = document.getElementById("paramsForm");
  var x = document.getElementById("x");
  var exFrom = document.getElementById("extendedForm");
  var theoryButton = document.getElementById("theoryText");
  var docButton = document.getElementById("docText");
  if (paramsForm.style.display === "none") {
  	 
  	  if (x.style.display === "block")
	  {
	  	fade(x);
	  	document.getElementById("stopButton").disabled = true;
	  	document.getElementById("startButton").disabled = true;
	  }
	  if(theoryButton.style.display === "block")
	  	fade(theoryButton);
      if(docButton.style.display === "block")
	  	fade(docButton);
	
    unfade(paramsForm);


  } 
  if(x.style.display === "block"){
    	fade(x);
	  	document.getElementById("stopButton").disabled = true;
  }

}

function sendParams(){

	var ballsNum = document.getElementById("ballsNum").value;
	var masses = new Array();
	var velocities = new Array();

	var canvas = document.getElementById('myCanvas');
	canvas.width = window.innerWidth-110;
	canvas.height = window.innerHeight-200;

	for(let i = 0; i < ballsNum; ++i)
	{
		masses.push(document.getElementById("mass"+i).value);
		velocities.push(document.getElementById("velocity"+i).value);
	
	}


	var balls = [];
	var startpointX = 50;
	var startpointY = 40;
	for(let i=0; i<ballsNum; i++){

		if((startpointY - Number(masses[i])) < 0 )
			startpointY = Number(masses[i]) + 1;
		if((startpointX - Number(masses[i])) < 0)
			startpointX = Number(masses[i]) + 1;

		if(startpointX + Number(masses[i]) > canvas.width)
			startpointX = canvas.width - Number(masses[i]) - 1;

		if(startpointY + Number(masses[i]) > canvas.height)
			startpointY = canvas.height - Number(masses[i]) - 1;


		balls.push({
			x: startpointX,
			y: startpointY,
			vx: Number(velocities[i]) * direction(),
	  		vy: Number(velocities[i]) * direction(),
			radius: Number(masses[i]),
			mass : Number(masses[i]),
			color: get_random_color(),

			draw: function() {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fillStyle = this.color;
				ctx.fill();
				
				
			}
		});


		startpointX = startpointX + 60;
		startpointY = startpointY + 50;

	}




	for(let i = 0; i < ballsNum; ++i)
	{
		if(ballsNum>1)
		{
			for(let j=1; j<ballsNum; ++j)
			{
				if(i != j)
				{
				var distance = Math.sqrt(
											(balls[i].x - balls[j].x) * (balls[i].x - balls[j].x) +
											(balls[i].y - balls[j].y) * (balls[i].y - balls[j].y)
										);
				console.log(i + " " + j + " " + (balls[i].radius + balls[j].radius) + " " + distance);
				if(distance < (balls[i].radius + balls[j].radius))
				{
					if(balls[i].x < balls[j].x)
					{
						balls[j].x += (balls[i].radius + balls[j].radius) - Math.abs(balls[i].x - balls[j].x) + 1;
						balls[j].y += (balls[i].radius + balls[j].radius) - Math.abs(balls[i].y - balls[j].y) + 1;
					}
					else
					{
						balls[i].x += (balls[i].radius + balls[j].radius) - Math.abs(balls[i].x - balls[j].x) + 1;
						balls[i].y += (balls[i].radius + balls[j].radius) - Math.abs(balls[i].y - balls[j].y) + 1;
					}
					distance = Math.sqrt(
											(balls[i].x - balls[j].x) * (balls[i].x - balls[j].x) +
											(balls[i].y - balls[j].y) * (balls[i].y - balls[j].y)
										);

				if(balls[i].x + balls[i].radius > canvas.width || balls[j].x + balls[j].radius > canvas.width || balls[i].y + balls[i].radius > canvas.height || balls[j].y + balls[j].radius > canvas.height) 
				{
					alert("Za duzy rozmiar kulek!");
					return;
				}
				}
			}
			}
		}
	}

	var x = document.getElementById("x");
	var paramsForm = document.getElementById("paramsForm");
	var exForm = document.getElementById("extendedForm"); 
    var theoryButton = document.getElementById("theoryText");
    var docButton = document.getElementById("docText");

  if(paramsForm.style.display === "block")
  	{	
  		fade(paramsForm);
  		fade(exForm);
  		console.log('before');

  	}
  	if (x.style.display === "none") {
    unfade(x);
  } 
   if(theoryButton.style.display === "block")
  	{ 
  		fade(theoryButton);
  	}
  	if(docButton.style.display === "block")
  	{ 
  		fade(docButton);
  	}
  		
  document.getElementById("startButton").disabled = true;
 document.getElementById("stopButton").disabled = false;

    var runAnimation = true;
    var raf;
	var ctx = canvas.getContext('2d');
	var ctxText = canvas.getContext('2d');

	var centerX;
	var centerY;
	var side = 110;
	var color = get_random_color();

	function draw() {
		
		side = 110;
		ctx.clearRect(0,0, canvas.width, canvas.height);
		centerX = canvas.width / 2;
    	centerY = canvas.height / 2;

    	ctx.strokeStyle = color;
    	ctx.fillStyle = color;
    	
    	var left_X = centerX - side / 2;
    	var right_X = centerX + side / 2;

    	var upper_Y = centerY - side / 2;
    	var bottom_Y = centerY + side / 2;

		for(var i=0; i<ballsNum; i++){
			
			balls[i].draw();
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			
			if ( (balls[i].y + balls[i].vy + balls[i].radius) > canvas.height || (balls[i].y + balls[i].vy - balls[i].radius) < 0) {
				balls[i].vy = -balls[i].vy;
			}
			if ( (balls[i].x + balls[i].vx + balls[i].radius) > canvas.width || (balls[i].x + balls[i].vx - balls[i].radius) < 0) {
				balls[i].vx = -balls[i].vx;
			}
		}

		for(var i=0; i<ballsNum; i++){
			for(var j=i+1; j<ballsNum; j++){

				var distance = Math.sqrt(
											(balls[i].x - balls[j].x) * (balls[i].x - balls[j].x) +
											(balls[i].y - balls[j].y) * (balls[i].y - balls[j].y)
										);
	
				if(distance < (balls[i].radius + balls[j].radius) ){
					
					//predkosc X pierwszej kuli po zderzeniu
					var ax = (balls[i].vx * (balls[i].mass - balls[j].mass) + (2 * balls[j].mass * balls[j].vx)) / (balls[i].mass + balls[j].mass);

					// predkosc Y drugiej kuli po zderzeniu
                    var ay = (balls[i].vy * (balls[i].mass - balls[j].mass) + (2 * balls[j].mass * balls[j].vy)) / (balls[i].mass + balls[j].mass);

                    //predkosc X pierwszej kuli po zderzeniu
                    balls[j].vx = (balls[j].vx * (balls[j].mass - balls[i].mass) + (2 * balls[i].mass * balls[i].vx)) / (balls[i].mass + balls[j].mass);

                    // predkosc Y drugiej kuli po zderzeniu
                    balls[j].vy = (balls[j].vy * (balls[j].mass - balls[i].mass) + (2 * balls[i].mass * balls[i].vy)) / (balls[i].mass + balls[j].mass);
                    balls[i].vx = ax;
                    balls[i].vy = ay;

				}
			}
		}
		raf = window.requestAnimationFrame(draw);
		
	}

	var stopButton = document.getElementById('stopButton');
        stopButton.addEventListener('click', stop);
   

	function stop (){
		document.getElementById("stopButton").disabled = true;
		document.getElementById("startButton").disabled = false;

			window.cancelAnimationFrame(raf);

	}

	var startButton = document.getElementById('startButton');
        startButton.addEventListener('click', renew);

	function renew(){
		document.getElementById("stopButton").disabled = false;
		document.getElementById("startButton").disabled = true;
		window.requestAnimationFrame(draw);

	}
	window.requestAnimationFrame(draw);

}

function validate(){
	var ballsNum = document.getElementById("ballsNum").value;
	var divForm = document.getElementById("extendedForm");
	divForm.innerHTML = '';
	divForm.style.opacity = 0;
	if(ballsNum == "" || ballsNum < 1 || ballsNum > 10)
		alert("Niepoprawne dane wejściowe!");
	else{
		var content = ` <table class="center">
						<tr>
							<th>Masa</th><th>Predkość początkowa</th>
						</tr>`;

		for(let i = 0; i < ballsNum; ++i){
			content += `<tr> 
							<td>`+ Number(i+1) +`&nbsp;&nbsp;<input type="number" id="mass" value="25"></td><td><input type="number" id="velocity" value="5"></td>
						</tr>`	
		}

		content += `</table><input type="button" value="Wyślij" id="toSend" onclick="sendParams()"/>`; 
		divForm.innerHTML = content;
		unfade(divForm);
		for(let i=0; i<ballsNum; ++i)
		{
			var toChangeMass = document.getElementById("mass");
			var toChangeVelocity = document.getElementById("velocity");

			toChangeMass.setAttribute("id", "mass" + i);
			toChangeVelocity.setAttribute("id", "velocity" + i);
		}

	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function direction(){
	var chosenValue = Math.random() < 0.5 ? 1 : -1;
	return chosenValue;
}

function rand(min, max) {
	return parseInt(Math.random() * (max-min+1), 10) + min;
}

function get_random_color() {
    var h = rand(1, 360); 
    var s = rand(30, 100);
    var l = rand(30, 70);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}


function start(){

document.getElementById("stopButton").click();

  var x = document.getElementById("x");
  var paramsForm = document.getElementById("paramsForm");
  var exForm = document.getElementById("extendedForm");
  var theoryButton = document.getElementById("theoryText");
  var docButton = document.getElementById("docText");
  if (x.style.display === "none") {
  	if (paramsForm.style.display === "block") 
  		fade(paramsForm); 
  		
	unfade(x);
  }
  if(paramsForm.style.display === "block")
  	{ 
  		fade(paramsForm);
  	 	 fade(exForm);
  	}
  	 if(theoryButton.style.display === "block")
  	{ 
  		fade(theoryButton);
  	}
  	 if(docButton.style.display === "block")
  	{ 
  		fade(docButton);
  	}

  document.getElementById("startButton").disabled = true;
 document.getElementById("stopButton").disabled = false;

    var runAnimation = true;
    var raf;
	var canvas = document.getElementById('myCanvas');
	canvas.width = window.innerWidth-100;
	canvas.height = window.innerHeight-200;
	var ctx = canvas.getContext('2d');
	var ctxText = canvas.getContext('2d');
	console.log(window.innerWidth + " x " + window.innerHeight);
	var centerX;
	var centerY;
	var side = 110;
	var color = get_random_color();

	var balls = [];
	var ballCount = getRandomInt(3,9);
	
	var startpointX = 100;
	var startpointY = 50;

	for(var i=0; i<ballCount; i++){

		var randValue = getRandomInt(20,30);
		
		balls.push({
			x: startpointX,
			y: startpointY,
			vx: getRandomInt(5,6) * direction(),
	  		vy: getRandomInt(5,6) * direction(),
			radius: randValue,
			mass : randValue,
			color: get_random_color(),

			draw: function() {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fillStyle = this.color;
				ctx.fill();
			}
		});

		startpointX = startpointX + 50;
		startpointY = startpointY + 40;
	}

	
	function draw() {
		side = 110;
		ctx.clearRect(0,0, canvas.width, canvas.height);
		centerX = canvas.width / 2;
    	centerY = canvas.height / 2;

    	ctx.strokeStyle = color;
    	ctx.fillStyle = color;
    	
    	var left_X = centerX - side / 2;
    	var right_X = centerX + side / 2;

    	var upper_Y = centerY - side / 2;
    	var bottom_Y = centerY + side / 2;

		for(var i=0; i<ballCount; i++){
			
			balls[i].draw();
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			
			if ( (balls[i].y + balls[i].vy + balls[i].radius) > canvas.height || (balls[i].y + balls[i].vy - balls[i].radius) < 0) {
				balls[i].vy = -balls[i].vy;
			}
			if ( (balls[i].x + balls[i].vx + balls[i].radius) > canvas.width || (balls[i].x + balls[i].vx - balls[i].radius) < 0) {
				balls[i].vx = -balls[i].vx;
			}
		}


		for(var i=0; i<ballCount; i++){
			for(var j=i+1; j<ballCount; j++){

				var distance = Math.sqrt(
											(balls[i].x - balls[j].x) * (balls[i].x - balls[j].x) +
											(balls[i].y - balls[j].y) * (balls[i].y - balls[j].y)
										);

				if(distance < (balls[i].radius + balls[j].radius) ){

					//predkosc X pierwszej kuli po zderzeniu
					var ax = (balls[i].vx * (balls[i].mass - balls[j].mass) + (2 * balls[j].mass * balls[j].vx)) / (balls[i].mass + balls[j].mass);

					// predkosc Y drugiej kuli po zderzeniu
                    var ay = (balls[i].vy * (balls[i].mass - balls[j].mass) + (2 * balls[j].mass * balls[j].vy)) / (balls[i].mass + balls[j].mass);

                    //predkosc X pierwszej kuli po zderzeniu
                    balls[j].vx = (balls[j].vx * (balls[j].mass - balls[i].mass) + (2 * balls[i].mass * balls[i].vx)) / (balls[i].mass + balls[j].mass);

                    // predkosc Y drugiej kuli po zderzeniu
                    balls[j].vy = (balls[j].vy * (balls[j].mass - balls[i].mass) + (2 * balls[i].mass * balls[i].vy)) / (balls[i].mass + balls[j].mass);
                    balls[i].vx = ax;
                    balls[i].vy = ay;
				}
			}
		}
		raf = window.requestAnimationFrame(draw);
		
	}

	var stopButton = document.getElementById('stopButton');
        stopButton.addEventListener('click', stop);

	function stop(){
		document.getElementById("stopButton").disabled = true;
		document.getElementById("startButton").disabled = false;
			window.cancelAnimationFrame(raf);
		
	}

	var startButton = document.getElementById('startButton');
        startButton.addEventListener('click', renew);

	function renew(){
		document.getElementById("stopButton").disabled = false;
		document.getElementById("startButton").disabled = true;
		window.requestAnimationFrame(draw);

	}
	
		

	window.requestAnimationFrame(draw);

}

function theory(){

	var theoryButton = document.getElementById('theoryText');
	var x = document.getElementById("x");
    var paramsForm = document.getElementById("paramsForm");
    var exForm = document.getElementById("extendedForm");
    var docButton = document.getElementById('docText');
	
	if(x.style.display === "block")
		fade(x);
	if(paramsForm.style.display === "block")
		fade(paramsForm);
	if(exForm.style.display === "block")
		fade(exForm);

	if(docButton.style.display === "block")
		fade(docButton);

	if(theoryButton.style.display === "none")
		unfade(theoryButton);
	else
		fade(theoryButton);

	document.getElementById("startButton").disabled = true;
 	document.getElementById("stopButton").disabled = true;
}

function showDoc(){

	var docButton = document.getElementById('docText');
	var x = document.getElementById("x");
    var paramsForm = document.getElementById("paramsForm");
    var exForm = document.getElementById("extendedForm");
	var theoryButton = document.getElementById('theoryText');

	if(x.style.display === "block")
		fade(x);
	if(paramsForm.style.display === "block")
		fade(paramsForm);
	if(exForm.style.display === "block")
		fade(exForm);
	if(theoryButton.style.display === "block")
		fade(theoryButton);

	if(docButton.style.display === "none")
		unfade(docButton);
	else
		fade(docButton);

	document.getElementById("startButton").disabled = true;
 	document.getElementById("stopButton").disabled = true;
}