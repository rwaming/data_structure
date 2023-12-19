class Node { //value, prev, next;
    constructor(v,p,n) {
        this.value = v;
        this.prevNode = p;
        this.nextNode = n;
    }   
}

class DoubleLinkedList {
    constructor() { //size, start, end;
        this.start = null;
        this.end = null;
        this.size = 0;
    }

    // 비었나요?
    isEmpty() {
        return (this.size === 0) ? true : false;
    }
    // v 값을 가진 노드가 있나요? 없으면 null을 있으면 그 node를 반환해 주세요
    hasValue(v) {
        
    }

    //가장 앞에 있는 노드를 반환해 주세요 (없으면 null)
    front() {}
    //가장 뒤에 있는 노드를 반환해 주세요 (없으면 null)
    back() {}


    //맨 뒤에 v 값을 추가해주세요
    append(v) {
        const newNode = new Node(v,p,n);

        if(size === 0) { // 처음일 때
            this.start = newNode; // start는 newNode
        }else{ // 아닐 때
        }
        this.end = newNode; // end 항상 newNode
        this.size++;
    }
    //맨 앞에 v 값을 추가해주세요
    appendLeft(v) {}

    //맨 앞에 있는 노드를 제거해주세요
    popFront() {}
    //맨 뒤에 있는 노드를 제거해주세요 (제거된 노드 반환, 없으면 null)
    popBack() {}


    //내 앞에 v 값을 넣어주세요 (제거된 노드 반환, 없으면 null)
    pushPrev(node, v) {}
    //내 뒤에 v 값을 넣어주세요
    pushNext(node, v) {}

    //내 앞에 node를 지워주세요 (제거된 노드 반환, 없으면 null)
    removePrev(node, v) {}
    //내 뒤에 node를 지워주세요 (제거된 노드 반환, 없으면 null)
    removeNext(node, v) {}


    //나를 지워주세요 (제거된 노드 반환, 없으면 null)
    remove(node) {}
}