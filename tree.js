class Tree {
  constructor(ctx) {
    this.head = null;
    this.length = 0;
    this.levels = 0;
    this.ctx = ctx;
    this.elements = [];
  }

  addNode(value) {
    let level = 0;
    let exist = false;
    if (!!this.head) {
      let node = this.head;
      let added = false;
      while (!added) {
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
            this.elements.push(node.left);
            added = true;
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
            this.elements.push(node.right);
            added = true;
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
      this.elements.push(this.head);
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

  async drawNodes(node = this.head, drawNodes) {
    const stack = [];
    let current = node;
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.right;
      }
      current = stack.pop();
      drawNodes(this.ctx, current.point, current.value);
      await Util.wait(1);
      current = current.left;
    }
  }

  async drawTree(drawNodes, drawLinkNode) {
    const stack = [];
    let current = this.head;

    while (current || stack.length > 0) {
      while (current) {
        drawLinkNode(this.ctx, current.point, current.parent?.point);
        await Util.wait(0.3);

        drawNodes(this.ctx, current.point, current.value);
        await Util.wait(0.8);

        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      current = current.right;
    }
  }

  async drawLinks(node = this.head, drawLink) {
    if (node !== null) {
      this.drawLinks(node.left, drawLink);
      drawLink(this.ctx, node.point, node.parent?.point);
      this.drawLinks(node.right, drawLink);
    }
  }

  findSubtreeBST(root, targetValue) {
    const result = [];

    function traverse(node) {
      if (!node) {
        return;
      }

      if (node.value > targetValue) {
        traverse(node.left);
      }

      if (node.value === targetValue || node.value > targetValue) {
        result.push(node.value);
      }

      if (node.value < targetValue) {
        traverse(node.right);
      }
    }

    traverse(root);

    return result;
  }

  getSubtreeValues(root, result = []) {
    if (root !== null) {
      this.getSubtreeValues(root.left, result);
      result.push(root);
      this.getSubtreeValues(root.right, result);
    }
    return result;
  }

  getSubtreeValuesForValue(value) {
    const subtreeRoot = this.findNode(value);
    if (subtreeRoot === null) {
      return [];
    }
    return this.getSubtreeValues(subtreeRoot);
  }

  findNode(value, node = this.head) {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this.findNode(value, node.left);
    } else {
      return this.findNode(value, node.right);
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
