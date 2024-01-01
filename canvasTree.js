class CanvasTree {
  constructor(ctx, elements) {
    this.ctx = ctx;
    this.elements = elements;
    this.selected = null;
    this.tree = null;

    this.drawCanvas();
  }

  drawCanvas() {
    this.ctx.fillStyle = "#605e5e";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  update() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.drawCanvas();

    this.tree.drawTree(
      this.drawTreeNode,
      this.drawLinkNode,
      false,
      this.selected
    );
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

  drawTreeNode(ctx, point, value, borderColor = "#e5d2c4") {
    ctx.fillStyle = "#ae9c8f";

    ctx.beginPath();
    ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    ctx.fillStyle = "#f2e8e1";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(value, point.x, point.y);
  }

  checkClickInNodes(event, nodes) {
    for (const node of nodes) {
      if (
        Util.isPointInsideCircle(
          event?.x,
          event?.y,
          node?.point.x,
          node?.point.y,
          20
        )
      ) {
        return node;
      }
    }
    return null;
  }

  drawTree() {
    this.tree = new Tree(this.ctx);
    for (let index = 0; index < 8; index++) {
      this.tree.addNode(Util.randomNumber());
    }
    this.ctx.save();
    this.tree.drawTree(
      this.drawTreeNode,
      this.drawLinkNode,
      true,
      this.selected
    );
    this.addListeners();
  }

  addListeners() {
    this.ctx.canvas.addEventListener("mousedown", (event) => {
      const node = this.checkClickInNodes(event, this.tree.elements);
      if (node) {
        this.selected = node;
        this.update();
      }
    });

    this.ctx.canvas.addEventListener("mouseup", (event) => {
      if (this.selected) {
        this.selected = null;
        this.update();
      }
    });

    this.ctx.canvas.addEventListener("mousemove", (event) => {
      if (this.selected) {
        this.selected.point.x = event.x;
        this.selected.point.y = event.y;
        // this.moveAllSubtree(this.selected.value);
        this.update();
      }
      this.changeMouseType(event);
    });
  }

  changeMouseType(event) {
    const node = this.checkClickInNodes(event, this.tree.elements);
    if (node) {
      this.ctx.canvas.style.cursor = "pointer";
    }else{
      this.ctx.canvas.style.cursor = "default";
    }
  }

  moveAllSubtree(value){
    const subtreeNodes = this.tree.getSubtreeValuesForValue(value);
    for (const node of object) {
      
    }
    console.log(subtreeNodes);
  }
}
