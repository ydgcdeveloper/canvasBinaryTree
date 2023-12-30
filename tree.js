class Tree {
  constructor(ctx) {
    this.head = null;
    this.length = 0;
    this.ctx = ctx;
  }

  addNode(value) {
    let level = 0;
    let exist = false;
    if (!!this.head) {
      let node = this.head;
      let found = false;
      while (!found) {
        level++;
        if (value < node.value) {
          if (node.left) {
            node = node.left;
          } else {
            node.left = new Node({
              value,
              level,
              parent: node,
              point: this.calculatePoint(node, "left"),
            });
            found = true;
          }
        } else if (value > node.value) {
          if (node.right) {
            node = node.right;
          } else {
            node.right = new Node({
              value,
              level,
              parent: node,
              point: this.calculatePoint(node, "right"),
            });
            found = true;
          }
        } else {
          exist = true;
          break;
        }
      }
    } else {
      this.head = new Node({
        value,
        level,
        parent: null,
        point: new Point(this.ctx.canvas.width / 2, 50),
      });
    }
    !exist && this.length++;
  }

  inOrderTraversal(node = this.head, drawTreeNode, drawLinkNode) {
    if (node !== null) {
      this.inOrderTraversal(node.left, drawTreeNode, drawLinkNode);
      drawLinkNode(this.ctx, node.point, node.parent?.point);
      drawTreeNode(this.ctx, node.point, node.value);
      this.inOrderTraversal(node.right, drawTreeNode, drawLinkNode);
    }
  }

  drawNodes(node = this.head, drawNodes){
    if (node !== null) {
        this.drawNodes(node.left, drawNodes);
        drawNodes(this.ctx, node.point, node.value);
        this.drawNodes(node.right, drawNodes);
      }
  }

  drawLinks(node = this.head, drawLink){
    if (node !== null) {
        this.drawLinks(node.left, drawLink);
        drawLink(this.ctx, node.point, node.parent?.point);
        this.drawLinks(node.right, drawLink);
      }
  }

  calculatePoint(nodeParent, side) {
    const coef = 20;
    let x = 0;
    let y = 0;
    if (side === "right") {
      x = nodeParent.point.x + 160 - coef * (nodeParent.level + 1);
    } else {
      x = nodeParent.point.x + -160 + coef * (nodeParent.level + 1);
    }
    y = nodeParent.point.y + 100;
    return new Point(x, y);
  }
}

class Node {
  constructor({ value, level, point, parent }) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.level = level;
    this.point = point;
  }
}
