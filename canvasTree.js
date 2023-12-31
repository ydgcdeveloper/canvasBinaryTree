class CanvasTree {
  constructor(ctx, elements) {
    this.ctx = ctx;
    this.elements = elements;
  }

  drawLinkNode(ctx, pointA, pointB) {
    if (pointA && pointB) {
      ctx.beginPath();
      ctx.strokeStyle = "#f2e8e1";
      ctx.lineWidth = 4;
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(
        pointA.x < pointB.x ? pointB.x - 12 : pointB.x + 12,
        pointB.y + 17
      );
      ctx.stroke();
    }
  }

  drawTreeNode(ctx, point, value) {
    ctx.fillStyle = "#ae9c8f";

    ctx.beginPath();
    ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#e5d2c4";
    ctx.stroke();

    ctx.fillStyle = "#f2e8e1";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(value, point.x, point.y);
  }

  checkClickInNodes(event, nodes) {
    for (const node of nodes) {
      if (Util.isPointInsideCircle(event.x, event.y, node.point.x, node.point.y, 20)) {
        return node;
      }
    }
    return null;
  }

  drawTree() {
    const tree = new Tree(this.ctx);
    tree.addNode(5);
    tree.addNode(3);
    tree.addNode(8);
    tree.addNode(2);
    tree.addNode(4);
    tree.addNode(7);
    tree.addNode(9);
    // for (let index = 0; index < 20; index++) {
    //   tree.addNode(Util.randomNumber());
    // }

    tree.drawTree(this.drawTreeNode, this.drawLinkNode);
    console.log(tree.getSubtreeValuesForValue(3));
    this.addListeners(tree);
  }

  addListeners(tree) {
    this.ctx.canvas.addEventListener("click", (event) => {
      console.log(this.checkClickInNodes(event, tree.elements));;
    });
  }
}
