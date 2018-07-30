class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
  }

  insertLeft(node) {
    this.left = node;
  }

  insertRight(node) {
    this.right = node;
  }
}

class BinaryTree {
  constructor(node) {
    this.root = node || null;
  }
}

const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
const n4 = new Node(4);
const n5 = new Node(5);

const binaryTree = new BinaryTree(n1);
binaryTree.root.insertLeft(n2);
binaryTree.root.insertRight(n3);
n2.insertLeft(n4);
n2.insertRight(n5);

/**
 * 1 -> 2
 * 1 -> 3
 * 2 -> 4
 * 2 -> 5
 */

// 前序遍历
console.log('*****前序遍历*****');
const traversalBinaryTree1 = (node) => {
  if (node !== null) {
    console.log(node.data);
    traversalBinaryTree1(node.left);
    traversalBinaryTree1(node.right);
  }
}

traversalBinaryTree1(binaryTree.root)


// 前序遍历
console.log('*****前序遍历 - 迭代*****');
const traversalBinaryTree11 = (node) => {
  const stack = [];
  let isHandlingNode = node;
  while (isHandlingNode) {
    console.log(isHandlingNode.data);
    if (isHandlingNode.right) {
      stack.push(isHandlingNode.right);
    }
    if (isHandlingNode.left) {
      isHandlingNode = isHandlingNode.left;
    } else {
      isHandlingNode = stack.pop()
    }
  }
}

traversalBinaryTree11(binaryTree.root)

// 中序遍历
console.log('*****中序遍历*****');
const traversalBinaryTree2 = (node) => {
  if (node !== null) {
    traversalBinaryTree2(node.left);
    console.log(node.data);
    traversalBinaryTree2(node.right);
  }
}

traversalBinaryTree2(binaryTree.root);

// 中序遍历
console.log('*****中序遍历 - 迭代*****');
const traversalBinaryTree22 = (node) => {
  let isHandlingNode = node;
  const stack = [];
  while (isHandlingNode) {
    if (isHandlingNode.right) {
      stack.push(isHandlingNode.right);
    }

    if (isHandlingNode.left) {
      stack.push({
        data: isHandlingNode.data
      })
      isHandlingNode = isHandlingNode.left;
    } else {
      console.log(isHandlingNode.data);
      isHandlingNode = stack.pop()
    }
  }
}

traversalBinaryTree22(binaryTree.root);

// 后序遍历
console.log('*****后序遍历*****');
const traversalBinaryTree3 = (node) => {
  if (node !== null) {
    traversalBinaryTree3(node.left);
    traversalBinaryTree3(node.right);
    console.log(node.data);
  }
}

traversalBinaryTree3(binaryTree.root)

console.log('*****后序遍历 - 迭代*****');
const traversalBinaryTree33 = (node) => {
  let isHandlingNode = node;
  const stack = [];
  while (isHandlingNode) {
    if (!isHandlingNode.left && !isHandlingNode.right) {
      console.log(isHandlingNode.data);
      isHandlingNode = stack.pop();
    } else {
      stack.push({
        data: isHandlingNode.data
      });
      if (isHandlingNode.left && isHandlingNode.right) {
        stack.push(isHandlingNode.right);
        isHandlingNode = isHandlingNode.left;
      }

      if (isHandlingNode.right && !isHandlingNode.left) {
        isHandlingNode = isHandlingNode.right;
      }

      if (isHandlingNode.left && !isHandlingNode.right) {
        isHandlingNode = isHandlingNode.left;
      }
    }
  }
}

traversalBinaryTree33(binaryTree.root)

// 层次遍历
console.log('*****层次遍历*****');
const traversalBinaryTree4 = (node) => {
  const queue = [node];
  while(queue.length > 0) {
    const isHandlingNode = queue.shift();
    console.log(isHandlingNode.data);
    if (isHandlingNode.left) {
      queue.push(isHandlingNode.left);
    }
    if (isHandlingNode.right) {
      queue.push(isHandlingNode.right);
    }
  }
}

traversalBinaryTree4(binaryTree.root);
