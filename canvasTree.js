class CanvasTree {
  ctx;
  elements;

  constructor(ctx, elements) {
    this.ctx = ctx;
    this.elements = elements;
  }

  drawShapes() {
    this.drawLinkNode(
      new Point(this.ctx.canvas.width / 2, 50),
      new Point(this.ctx.canvas.width / 2 - 50, 150)
    );
    this.drawTreeNode(new Point(this.ctx.canvas.width / 2, 50), 6);
    this.drawTreeNode(new Point(this.ctx.canvas.width / 2 - 50, 150), 8);
  }

  drawLinkNode(ctx, pointA, pointB) {
    if (pointA && pointB) {
      ctx.strokeStyle = "#f2e8e1";
      ctx.lineWidth = 4;
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.stroke();
    }
  }

  drawTreeNode(ctx, point, value) {
    ctx.fillStyle = "#ae9c8f";

    ctx.beginPath();
    ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "#f2e8e1";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(value, point.x, point.y);
  }

  drawTree() {
    const bst = new Tree(this.ctx);
    bst.addNode(5);
    bst.addNode(5);
    bst.addNode(3);
    bst.addNode(1);
    bst.addNode(8);
    bst.addNode(2);
    bst.addNode(4);
    bst.addNode(7);
    bst.addNode(19);
    bst.addNode(11);
    bst.addNode(6);
    bst.addNode(14);
    bst.addNode(10);

    const printValue = (value) => console.log(value);

    bst.drawLinks(bst.head, this.drawLinkNode);
    bst.drawNodes(bst.head, this.drawTreeNode);
  }
}
