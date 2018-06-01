// 从尾到头打印链表

const LinkedList = require('../LinkedList');


const linkedList = new LinkedList();

linkedList.insertFirst(1)
linkedList.insertFirst(2)
linkedList.insertFirst(3)

// 3 -> 2 ->1

let node = linkedList.first;
const stack = [];

while (node) {
  stack.push(node.data)
  node = node.next;
}

while (stack.length > 0) {
  console.log(stack.pop())
}
