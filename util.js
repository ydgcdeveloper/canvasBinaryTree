class Util {
  static calculatePoint(nodeParent, side) {
    const coef = 20;
    let x = 0;
    let y = 0;
    side === "right"
      ? (x = nodeParent.point.x + 160 - coef * (nodeParent.level + 1))
      : (x = nodeParent.point.x + -160 + coef * (nodeParent.level + 1));
    y = nodeParent.point.y + 100;
    return new Point(x, y);
  }
}
