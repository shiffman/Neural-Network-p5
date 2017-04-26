// Line Circle Intersectio Geometry
// https://bl.ocks.org/milkbread/11000965
// http://stackoverflow.com/a/1088058
// http://stackoverflow.com/a/328193

var points;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  var a = createVector(200, 200);
  var b = createVector(50, 50);
  var c = createVector(mouseX, mouseY);
  var r = 2;

  fill(0);
  noStroke();
  ellipse(a.x, a.y, 16);

  strokeWeight(1);
  stroke(0);
  line(a.x, a.y, b.x, b.y);
  noFill();
  ellipse(c.x, c.y, r * 2);

  points = getIntersections(a, b, c, r);

  if (points) {
    var a = points.intersection1;
    var b = points.intersection2;
    stroke(0, 255, 0);
    strokeWeight(4);
    if (a.onLine) {
      point(a.point.x, a.point.y);
    }
    if (b.onLine) {
      point(b.point.x, b.point.y);
    }
  }


}


// GEOMETRIC function to get the intersections
function getIntersections(a, b, c, r) {

  // compute the direction vector d from a to b and normalize
  var d = p5.Vector.sub(b, a); //createVector((b.x - a.x) / abdist, (b.y - a.y) / eDistAtoB);
  d.normalize();

  // Now the line equation is x = dx*t + ax, y = dy*t + ay with 0 <= t <= 1.

  // compute the value t of the closest point to the circle center (cx, cy)
  var t = (d.x * (c.x - a.x)) + (d.y * (c.y - a.y));

  // compute the coordinates of the point e on line and closest to c
  var e = {
    point: createVector((t * d.x) + a.x, (t * d.y) + a.y),
    onLine: false
  }

  // Calculate the euclidean distance between c & e
  var distCE = p5.Vector.dist(e.point, c);

  // test if the line intersects the circle
  if (distCE < r) {
    // compute distance from t to circle intersection point
    dt = sqrt(r * r - distCE * distCE);

    // compute first intersection point
    var f = {
      point: createVector(),
      onLine: false
    };
    f.point.x = ((t - dt) * d.x) + a.x;
    f.point.y = ((t - dt) * d.y) + a.y;
    // check if f lies on the line
    f.onLine = is_on(a, b, f.point);

    // compute second intersection point
    var g = {
      point: createVector(),
      onLine: false
    };
    g.point.x = ((t + dt) * d.x) + a.x;
    g.point.y = ((t + dt) * d.x) + a.y;
    // check if g lies on the line
    g.onLine = is_on(a, b, g.point);

    return {
      intersection1: f,
      intersection2: g
    }
  } else {
    return false;
  }
}

function is_on(a, b, c) {
  var d1 = p5.Vector.dist(a, c) + p5.Vector.dist(c, b);
  var d2 = p5.Vector.dist(a, b);
  var diff = abs(d1 - d2);
  return diff < 1;
}
