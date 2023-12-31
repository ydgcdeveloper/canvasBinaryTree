class Util {
  static calculatePoint(nodeParent, side) {
    const coef = 20;
    let x = 0;
    let y = 0;
    const nodesDist = (window.innerWidth / 4) / (nodeParent.level + 1);
    side === "right"
      ? (x = nodeParent.point.x + nodesDist)
      : (x = nodeParent.point.x + -nodesDist);
    y = nodeParent.point.y + 100;
    return new Point(x, y);
  }

  static randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  static wait(sec) {
    return new Promise((resolve) => {
      setTimeout(resolve, sec * 1000);
    });
  }

  static isPointInsideCircle(x, y, circleX, circleY, radius) {
    const distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
  
    return distance < radius;
  }
}
