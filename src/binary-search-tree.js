const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }

  root() {
    return this.rootTree;
  }

  add(data) {
    if (!this.rootTree) {
      this.rootTree = new Node(data);
    }

    let carendTreeNode = this.rootTree;

    while (carendTreeNode) {
      if (data === carendTreeNode.data) {
        return 0;
      }

      if (data < carendTreeNode.data) {
        carendTreeNode.left === null
          ? (carendTreeNode.left = new Node(data))
          : (carendTreeNode = carendTreeNode.left);
      } else {
        carendTreeNode.right === null
          ? (carendTreeNode.right = new Node(data))
          : (carendTreeNode = carendTreeNode.right);
      }
    }
  }
  has(data) {
    return !!this.find(data);
  }

  find(data, rootNode = this.rootTree) {
    if (!rootNode) {
      return null;
    }
    if (rootNode.data === data) {
      return rootNode;
    } else {
      return rootNode.data > data
        ? this.find(data, rootNode.left)
        : this.find(data, rootNode.right);
    }
  }

  remove(data, node = this.rootTree) {
    if (!this.rootTree) {
      return null;
    }

    if (data === node.data) {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return (node = node.right);
      }
      if (!node.right) {
        return (node = node.left);
      }
      let maxNodeLeft = node.left;
      while (maxNodeLeft.right) {
        maxNodeLeft = maxNodeLeft.right;
      }
      node.data = maxNodeLeft.data;
      node.left = this.remove(maxNodeLeft.data, node.left);
      return node;
    } else if (data < node.data) {
      node.left = this.remove(data, node.left);
      return node;
    } else {
      node.right = this.remove(data, node.right);
      return node;
    }
  }

  min(node = this.rootTree, minRootValue = this.rootTree.data) {
    if (!node) {
      return null;
    }
    if (node.data < minRootValue) {
      minRootValue = node.data;
    }
    return node.left ? this.min(node.left, minRootValue) : minRootValue;
  }

  max(node = this.rootTree, maxRootValue = this.rootTree.data) {
    if (!node) {
      return null;
    }
    if (node.data > maxRootValue) {
      maxRootValue = node.data;
    }
    return node.right ? this.max(node.right, maxRootValue) : maxRootValue;
  }
}

module.exports = {
  BinarySearchTree,
};
