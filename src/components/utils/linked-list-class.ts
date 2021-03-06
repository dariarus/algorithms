export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  size: number;
  prepend: (element: T) => void;
  append: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (index: number) => void;
  toArray: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  head: LinkedListNode<T> | null;
  private _size: number;

  constructor() {
    this.head = null;
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  private getNode(index: number) {
    let curr = this.head;
    let currIndex = 0;
    if (!this.head) {
      return null;
    }
    // перебрать элементы в списке до нужной позиции
    while (currIndex < index) {
      if (curr) {
        curr = curr.next;
      } else {
        break
      }
      currIndex++;
    }
    return curr;
  }

  // добавить в голову
  prepend(element: T) {
    const node = new LinkedListNode(element);
    node.next = this.head;
    this.head = node;
    this._size++;
    return this;
  }

  // удалить голову
  deleteHead() {
    if (this.head) {
      if (!this.head.next) {
        this.head = null;
        this._size--;
        return;
      }
      let tmp = this.head;
      this.head = this.head.next;
      tmp.next = null;
    }
    return this;
  }

  // добавить элемент в конец списка
  append(element: T) {
    const node = new LinkedListNode(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this._size++;
    return this;
  }

// удалить из хвоста
  deleteTail() {
    if (!this.head) {
      return null;
    }
    // if only one node in the list
    if (!this.head.next) {
      this.head = null;
      return;
    }
    let previous = this.head;
    let tail = this.head.next;

    while (tail.next !== null) {
      previous = tail;
      tail = tail.next;
    }
    previous.next = null;
    this._size--;
    return this;
  }

  // добавить по индексу
  addByIndex(element: T, index: number) {
    if (index < 0 || index > this._size - 1) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new LinkedListNode(element);
      // добавить элемент в начало списка
      if (index === 0) {
        this.prepend(element);
      } else {
        let prev = this.getNode(index - 1)
        // добавить элемент
        if (prev) {
          node.next = prev.next
          prev.next = node;
        }
        this._size++;
      }
    }
    return this;
  }

  // удалить по индексу
  deleteByIndex(index: number) {
    if (index < 0 || index > this.size - 1) {
      console.log('Enter a valid index');
      return;
    }
    if (!this.head) {
      return;
    }
    const previous = this.getNode(index - 1);

    if (!previous || !previous.next) {
      return;
    }
    previous.next = previous.next.next;
    this._size--;
    return this;
  }

  toArray() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res
  }
}