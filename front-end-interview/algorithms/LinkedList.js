class LinkedList {
  constructor() {
    this.first = null
  }
  insertFirst(node) {
    if (!(node instanceof Node)) {
      throw new Error('addNode param node should pass Node type')
    }

    if (this.first === null) {
      this.first = node
      return this
    }

    const firstNode = this.first

    this.first = node
    this.first.next = firstNode
  }

  displayList() {
    let curNode = this.first;
    while(curNode) {
      console.log('curNode.data =>', curNode.data)
      curNode = curNode.next
    }
  }
}

class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// **use**

const node = new Node(1)
const linkedList = new LinkedList()

// node -> node -> node
// dead loop
linkedList.insertFirst(node)
linkedList.insertFirst(node)

linkedList.displayList()


// -------------------------
// 以上实现会死循环
// -------------------------

class LinkedList {
  constructor() {
    this.first = null
  }
  insertFirst(data) {
    const node = new Node(data)

    const firstNode = this.first
    this.first = node
    this.first.next = firstNode
  }

  displayList() {
    let curNode = this.first;
    while(curNode) {
      console.log('curNode.data =>', curNode.data)
      curNode = curNode.next
    }
  }
}

class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// **use**

const linkedList = new LinkedList()

linkedList.insertFirst(1)
linkedList.insertFirst(1)

linkedList.displayList()
