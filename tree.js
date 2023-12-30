class Tree {
  constructor(ctx) {
    this.head = null;
    this.length = 0;
    this.levels = 0;
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
            node.left = this.createNode({
              value,
              parent: node,
              side: "left",
            });
            found = true;
          }
        } else if (value > node.value) {
          if (node.right) {
            node = node.right;
          } else {
            node.right = this.createNode({
              value,
              parent: node,
              side: "right",
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

  createNode({ value, parent, side }) {
    const point = Util.calculatePoint(parent, side);
    return new Node({ value, level: parent.level + 1, parent, point });
  }

  inOrderTraversal(node = this.head, callback) {
    if (node !== null) {
      this.inOrderTraversal(node.left, callback);
      callback(node.value);
      this.inOrderTraversal(node.right, callback);
    }
  }

  drawNodes(node = this.head, drawNodes) {
    const stack = [];
    let current = node;
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      drawNodes(this.ctx, current.point, current.value);
      current = current.right;
    }
  }

  drawLinks(node = this.head, drawLink) {
    if (node !== null) {
      this.drawLinks(node.left, drawLink);
      drawLink(this.ctx, node.point, node.parent?.point);
      this.drawLinks(node.right, drawLink);
    }
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
