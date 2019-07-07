export class LinkedList {
  head = null;
  tail = null;
  N = 0;

  constructor(items) {
    if (items) {
      this.addAll(items);
    }
  }

  get size() {
    return this.N;
  }

  add(item = null) {
    if (item === null) { throw Error(`'item' parameter not defined`) }
    if (this.N !== 0) {
        const prev = this.tail;
        this.tail = new ListNode(item, null);
        prev.next = this.tail;
    }
    else {
        this.tail = new ListNode(item, null);
        this.head = this.tail;
    }
    this.N++;
  }

  addAll(items = null) {
    if (items === null) { throw Error(`'items' parameter not defined`) }

    items.forEach(item => this.add(item));
  }

  remove(item = null) {
    if (item === null) { throw Error(`'item' parameter not defined`) }
    if (this.N === 0) { throw Error(`can't remove an item from an empty list`) }

    let prev = this.head;
    let curr = this.head;
    while (curr != null) {
        if (curr.data === item) {
            // remove the last remaining element
            if (this.N === 1) { this.head = null; this.tail = null; }
            // remove first element
            else if (curr === this.head) { this.head = this.head.next; }
            // remove last element
            else if (curr === this.tail) { this.tail = prev; this.tail.next = null; }
            // remove element
            else { prev.next = curr.next; }
            this.N--;
            
            return true;
        }
        prev = curr;
        curr = prev.next;
    }

    return false;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.N = 0;
  }

  [Symbol.iterator]() {
    let item = this.head;
    return {
      next: () => {
        if (item) {
          const value = item.data;
          item = item.next;
          return  { value , done: false };
        }

        return { value: null, done: true }
      }
    }
  }
}

class ListNode {
  data;
  next;

  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}