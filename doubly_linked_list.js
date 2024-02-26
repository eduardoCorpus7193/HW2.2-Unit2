class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(element) {
        if (!element) {
            return "There is no data";
        }

        const node = new Node(element);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    prepend(element) {
        if (!element) {
            return "There is no data";
        }

        const node = new Node(element);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
    }

    insertBeforeNode(node, element) {
        if (!node || !element) {
            return "Node and element are mandatory";
        }
        
        const newNode = new Node(element);

        let current = this.head;
        while (current) {
            if (current.data === node) {
                newNode.prev = current.prev;
                current.prev = newNode;
                if (current.next === null) {
                    this.head = newNode;
                    return 'The element was added and it is the head'
                }
                return 'The element was added';
            }
            current = current.next;
        } 
        return 'Node not found';
    }   

    insertAfterNode(node, element) {
        if (!node || !element) {
            return "Node and element are mandatory";
        }

        const newNode = new Node(element);

        let current = this.head;
        while (current) {
            if (current.data === node) {
                newNode.next = current.next;
                current.next = newNode;
                if (current === this.tail) {
                    this.tail = newNode;
                    return 'The element was appended and it is the tail';
                }
                return 'The element was appended';
            }
            current = current.next;
        }
        return 'Node not found';
    }

    traverse() {
        if (!this.head) {
            return "There is no data";
        }

        let currentValue = this.head;

        while (currentValue) {
            console.log(currentValue);
            currentValue = currentValue.next;
        }
    }

    deleteNode(element) {
        if (!element || !this.head) {
            return "There is no data";
        }
        if (this.head.data === element) {
            this.head = this.head.next;
            if (this.head === null) {
                this.tail = null;
            }
            return "El elemento indicado era la cabeza";
        }
        let current = this.head;
        while (current) {
            if (current.data === element) {
                if (current === this.tail) {
                    this.tail = current.prev;
                    return "El elemento ingresado se ha borrado y era la cola";
                }
                current = current.next;
                return "Elemento borrado";
            }
            current = current.next;
        }
        return "Elemento no encontrado";
    }

    deleteHead(){
        if (!this.head) {
            return 'There´s no head';
        }

        this.head = this.head.next;

        if (this.head === null) {
            this.tail=null;
        }
    }

    deleteTail(){
        if (!this.head) {
            return 'There´s no data';
        }

        this.tail = this.tail.prev;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return 'The tail was removed and it was also head'
        }
    }
}

const doublyLinkedList = new DoublyLinkedList();
/*
console.log("Lista ligada:");

    console.time();
    linkedList.prepend(5);
    console.timeEnd();

    console.time();
    linkedList.append(15);
    console.timeEnd();

    console.time();
    linkedList.deleteNode(15);
    console.timeEnd();

const numbers = [1, 2, 3, 4, 5];
console.log("Arreglo: ");

    console.time();
    numbers.unshift(0);
    console.timeEnd();

    console.time();
    numbers.push(6);
    console.timeEnd();

    console.time();
    numbers.splice(2, 1);
    console.timeEnd();

console.log(numbers);
*/

doublylinkedList.append(10);
doublylinkedList.append(20);
doublylinkedList.append(30);
console.log(doublylinkedList.insertAfterNode(10, 3));
console.log(doublylinkedList);
