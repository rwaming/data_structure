class Node { // 노드만들기
    constructor(v, n) {
        this.value = v;
        this.nextPoint = (n === undefined) ? null : n;
    }
}

class LinkedList { // Linked List 만들기
    constructor() { // construct는 이름바꾸면 안 됨
        this.start = null;
        this.end = null;
        this.size = 0;
    }
    
    append() {
        const newNode = new Node(v, n); // 노드 생성
        if (size === 0) {
            this.start = newNode; // start 없으면, 생성될 노드가 start
        } else { // start가 있다 (= 마지막 노드가 있다는 뜻)
            this.end.nextPoint = newNode; // 아직 end를 바꾸기 전, 기존 노드의 넥스트포인트를 생성할 노드로 바꿈
        }
        this.end = newNode; // 지금의 end를 바꿔줌
        this.size++; // size 추가
    }
    isEmpty() { // 이 링크드 리스트가 비어있는지 알려줘
        return this.size === 0;
    }
    hasValue(v) { // (이러한 값을 가진 애가 있으면) 그 노드를 반환해줘
        const cursor = this.start;
        while(cursor !== null) {
            if(cursor.value === v) {
                break;
            }
            cursor = cursor.nextPoint;
        }
        return cursor;
    }
    insert(node, v) { // 내 뒤에 넣어줘
        node.nextPoint = new Node(v, node.nextPoint);
    }
    remove(node) { // 내 뒤를 지워줘
        node.nextPoint = node.nextPoint?.nextPoint ?? null;
    }
}

const L1 = new LinkedList();
const fourNode = L1.hasValue(4);
if(fourNode !== null) {
    L1.insert(fourNode, 5);
}