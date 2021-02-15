/* ------ JavaScript - HTML Canvas Particles ------ */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // ctx is short for context - for 3d use webgl
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 300; // max amount of particles.
//-----------------------------------------------------------
// measure title element 
let titleElement = document.getElementById('title1');
titleMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10,
}
//-----------------------------------------------------------
class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 1; // defines size of particles, value is randomized.
        this.weight = Math.random() * 1 + 1; // defines how fast particles fall and how high they bounce.
        this.directionX = Math.random() * -2 + 1.5; // X direction will push the particles (positive number to the right, negative number to the left).
    }
    update(){
        if (this.y > canvas.height) {
            this.y = 0 - this.size; // particles re-set when they hit the bottom of window.
            this.weight = Math.random() * 1 + 1; // the particles weight gets reset back to it's original when it reaches the bottom.
            this.x = Math.random() * canvas.width * 1.1; // sets a random start point multiplied by the canvas width. The * 1.2 fills the empty screen space created by the arc, with particles.
        }
        this.weight += 0.01; // this increases a particles weight the longer it falls.
        this.y += this.weight; // increase particles verticle Y position by particles weight.
        this.x += this.directionX; // wind value.

        // check for collision between each particle and title element
        if (this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y) {
            this.y -= 3;
            this.weight *= -0.3;
        }
    }
    draw(){
        ctx.fillStyle = '#fcba03'; // this will custom draw each particle with appointed colour.
        ctx.beginPath(); // this tells JavaScript to build a circle, to shape the particle.
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // 0, is the start angle of arc, Math.PI * 2 is the end angle (360 degrees).
        ctx.closePath(); // ends the draw method.
        ctx.shadowColor = '#999'; // particle shadow colour.
        ctx.shadowBlur = 20; // particle shadow blur.
        ctx.shadowOffsetX = 10; // particle shadow X offset.
        ctx.shadowOffsetY = 10; // particle shadow Y offset.
        ctx.fill() // particles fill colour.
    }
}

function init(){
    particlesArray = []; // make sure that particles array is empty before running the function.
    for (let i = 0; i < numberOfParticles; i++){ // loop to create multiple particles.
        const x = Math.random() * canvas.width; // random starts particles across the canvas width.
        const y = Math.random() * canvas.height; // random starts particles along the canvas height.
        particlesArray.push(new Particle(x, y))
    }
}
init();


// this is our animation loop to keep drawing particles.
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.01)'; // overlays an opacity to fade out the particle trail.
    // ctx.fillRect(0, 0, canvas.width, canvas.height); // draws multiple rectangles with opacity on top of the particle to give a fade ing effect.
    for (let i = 0; i < particlesArray.length; i++){ // for loop generates a random amount of particles.
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    requestAnimationFrame(animate); // here is our recursive loop calling the function once, then it looks at it's parent, animate, and calls it again. 
}
animate();

window.addEventListener('resize', function(){ // this allows the particles to react correctly with responsive screen size.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 10,
    }
    init();
});

