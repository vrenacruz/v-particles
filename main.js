var RADIUS = 10;
var PARTICLES = 100;

var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.onresize = function () {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
};



// Vars, Presets
cmpx = ctx.canvas.width / 2;
cmpy = ctx.canvas.height / 2;

// On Mousemove
document.onmousemove = function (e) {
    cmpx = e.clientX;
    cmpy = e.clientY;
};
document.ontouchmove = function (e) {
    cmpx = e.changedTouches[0].pageX;
    cmpy = e.changedTouches[0].pageY;
}

var space = new Coords(canvas.width, canvas.height, 1);
var objetive = new Coords(canvas.width/2, canvas.height/2, 1);

var swarm = new Swarm(PARTICLES, space, objetive);


//swarm.print('distance');


window.onclick = function () {    
    delete swarm;
     swarm = new Swarm(PARTICLES, space, objetive);
}

// Animation Loop
function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop Particles
    for (i = 0; i < PARTICLES; i++) {       
        
        // Draw Particles
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + (swarm.s[i].pos.x + swarm.s[i].pos.y) + ",60%,60%)";
        //ctx.shadow = 10;
        ctx.arc(swarm.s[i].pos.x, swarm.s[i].pos.y, RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    objetive.x = cmpx;
    objetive.y = cmpy;
    swarm.update(objetive);    
    requestAnimationFrame(drawFrame);
}

drawFrame();

