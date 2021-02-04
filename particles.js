const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    colorMode(HSB, 360,100,100,1);

    // Determine the number of particles based on the browser width
    const particlesLength = Math.floor(window.innerWidth / 5);

    // Initialize the particles and push them into the array
    for(let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    // Background of the canvas
    background('#000033');
    particles.forEach((particle, index) => {
        particle.update();
        particle.drawParticle();
        particle.checkParticles(particles.slice(index));
    })   
}

class Particle {
    constructor() {
        // position
        this.pos = createVector(random(window.innerWidth), random(window.innerHeight));
        // velocity
        this.vel = createVector(random(-5,5), random(-5,5));
        // size
        this.size = random(10,20);
        // color
        this.color = [random(360), random(50,100), random(50, 100), random(0.1, 1)];
    }
    
    // Update movement by adding velocity
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    // Draw simple particle
    drawParticle() {
        noStroke();
        fill(...this.color);
        circle(this.pos.x, this.pos.y, this.size);
    }

    // Detect edges
    edges() {
        if(this.pos.x <= 0 || this.pos.x >= width) {
            this.vel.x *= -1;
        }
        if(this.pos.y <= 0 || this.pos.y >= height) {
            this.vel.y *= -1;
        }
    }

    // Connect particles
    checkParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if(d < 75) {
                stroke('rgba(255,255,255,0.1)')
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        })
    }
}