// Line Circle Intersectio Geometry
// https://bl.ocks.org/milkbread/11000965
// http://stackoverflow.com/a/1088058
// http://stackoverflow.com/a/328193


// GEOMETRIC function to get the intersections
function intersecting(a, b, c, r) {

  // compute the direction vector d from a to b and normalize
  var d = p5.Vector.sub(b, a); //createVector((b.x - a.x) / abdist, (b.y - a.y) / eDistAtoB);
  d.normalize();

  // Now the line equation is x = dx*t + ax, y = dy*t + ay with 0 <= t <= 1.

  // compute the value t of the closest point to the circle center (cx, cy)
  var t = (d.x * (c.x - a.x)) + (d.y * (c.y - a.y));

  // compute the coordinates of the point e on line and closest to c
  var e =  createVector((t * d.x) + a.x, (t * d.y) + a.y);

  // Calculate the euclidean distance between c & e
  var distCE = p5.Vector.dist(e, c);

  // test if the line intersects the circle
  if (distCE < r) {
    // compute distance from t to circle intersection point
    dt = sqrt(r * r - distCE * distCE);

    // compute first intersection point
    var f = createVector();
    f.x = ((t - dt) * d.x) + a.x;
    f.y = ((t - dt) * d.y) + a.y;
    // check if f lies on the line
    if (is_on(a, b, f)) {
      return true;
    }

    // compute second intersection point
    var g = createVector();
    g.x = ((t + dt) * d.x) + a.x;
    g.y = ((t + dt) * d.x) + a.y;
    // check if g lies on the line
    if (is_on(a, b, g)) {
      return true;
    }
  } else {
    return false;
  }
}

function is_on(a, b, c) {
  var d1 = p5.Vector.dist(a, c) + p5.Vector.dist(c, b);
  var d2 = p5.Vector.dist(a, b);
  var diff = abs(d1 - d2);
  return diff < 0.01;
}
