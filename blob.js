class Blob {
  constructor(x, y, n, color) {
    this.x = x;
    this.y = y;
    this.vertices = new Array(n);
    this.color = color;
    this.r = 50;
    this.xOff = random(1000); // noise offset values
    this.yOff = random(2000);
    for (let i = 0; i < n; i++) {
      let angle = map(i, 0, n, 0, TWO_PI);
      this.vertices[i] = p5.Vector.fromAngle(angle);
    }
  }

  update() {
    // Use noise values for smooth transition of x and y values
    this.x = map(noise(this.xOff), 0, 1, 0, width);
    this.y = map(noise(this.yOff), 0, 1, 0, height);

    // Increment offset for the next frame by a 1/20 of the original speed
    this.xOff += 0.0005;
    this.yOff += 0.0005;
  }

  morph() {
    // Update all vertices based on noise
    for (let i = 0; i < this.vertices.length; i++) {
      let offset = createVector(random(-5, 5), random(-5, 5));
      this.vertices[i].add(offset);
      this.vertices[i].limit(this.r);
    }
  }

  show() {
    fill(this.color);
    beginShape();
    this.vertices.forEach((v) => {
      let p = p5.Vector.add(v, createVector(this.x, this.y));
      vertex(p.x, p.y);
    });
    endShape(CLOSE);
  }
}

function draw() {
  background(50, 50, 50);

  // Add noStroke() here to apply to all blobs
  noStroke();

  // Update each blob in the array
  blobs.forEach((blob) => {
    blob.morph();
    blob.update();
    blob.show();
  });

  for (let i = 0; i < blobs.length; i++) {
    for (let j = i + 1; j < blobs.length; j++) {
      let d = dist(blobs[i].x, blobs[i].y, blobs[j].x, blobs[j].y);
      if (d < blobs[i].radius + blobs[j].radius) {
        line(blobs[i].x, blobs[i].y, blobs[j].x, blobs[j].y);
      }
    }
  }
}

let blobs = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  //canvas.parent('body');

  // Initialize blobs with different colors
  blobs.push(new Blob(width / 2, height / 2, 100, color(102, 0, 204))); // Red blob
  blobs.push(new Blob(width / 4, height / 4, 100, color(85, 0, 255))); // Green blob
  blobs.push(new Blob(width / 3, height / 3, 100, color(77, 77, 255))); // Blue blob
  blobs.push(new Blob(width / 3, height / 3, 100, color(120, 0, 220))); // Blue blob
  blobs.push(new Blob(width / 3, height / 3, 100, color(70, 0, 255))); // Blue blob

  canvas.addClass("canvas"); // This will give the canvas element 'canvas' class
}
