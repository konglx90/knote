/**
 * 前序遍历 1 2 4 5 3
 * 中序遍历 4 2 5 1 3
 */

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
     this.root = node;
   }
 }

function rebuildBinaryTree(firstArray, middleArray) {
  if (firstArray.length === 0) {
    return null;
  }

  const rootData = firstArray[0]
  const rootNode = new Node(rootData)

  if (firstArray.length === 1) {
    return rootNode;
  }

  const indexOfRoot = middleArray.indexOf(rootData)

  rootNode.left = rebuildBinaryTree(firstArray.slice(1, indexOfRoot + 1), middleArray.slice(0, indexOfRoot))
  rootNode.right = rebuildBinaryTree(firstArray.slice(indexOfRoot + 1), middleArray.slice(indexOfRoot))

  return rootNode;
}

const binaryTree = rebuildBinaryTree([
 1, 2, 4, 5, 3,
], [
 4, 2, 5, 1, 3,
]);

console.log(binaryTree);
