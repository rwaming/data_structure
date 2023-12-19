class Node { //value, prev, next;
    constructor(v,p,n) {
        this.value = v;
        this.prev = p ?? null;
        this.next = n ?? null;
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
        let targetNode = this.start;
        while(targetNode.value !== v && targetNode.next !== undefined) { // 현재 node가 값이 아니면서, next가 없을 때, 반복
            targetNode = targetNode.next ?? null; // 다음으로 넘어가기, undefined면 null 대입
        }
        return targetNode; // 값을 찾으면 node반환, 못 찾으면 null 반환
    }


    //가장 앞에 있는 노드를 반환해 주세요 (없으면 null)
    front() {return this.start ?? null;}
    //가장 뒤에 있는 노드를 반환해 주세요 (없으면 null)
    back() {return this.end ?? null;}


    //맨 뒤에 v 값을 추가해주세요
    append(v) {
        const newNode = new Node(v); // ** 새노드 value 채움
        if(this.size === 0) { // 처음일 때 // ** start 채움, 새노드 next없음
            this.start = newNode; // start는 새노드 
        }else{ // start 있을 때,
            newNode.prev = this.end; // 새노드의 prev는 기존end // ** 새노드 prev 채움
            this.end.next = newNode; // 이전 노드의 next는 새노드 // ** 이전노드 next 채움
        }
        this.end = newNode; // end 항상 newNode로 마무리
        this.size++; // 사이즈++
    }
    //맨 앞에 v 값을 추가해주세요
    appendLeft(v) {
        const newNode = new Node(v); // ** 새노드 value 채움
        if(this.size === 0) { // 노드없으면,
            this.end = newNode; // end도 새노드
        }else{ // 노드(end)가 있다면,
            newNode.next = this.start;
            this.start.prev = newNode; // end의 prev는 newNode
        }
        this.start = newNode; // start는 새노드가 된다
        this.size++; // 사이즈++
    }

    //맨 앞에 있는 노드를 제거해주세요
    popFront() {
        const newStart = this.start.next; // 곧 start가 될 2 확보
        newStart.prev = null; // 2 -> 1 링크 삭제
        this.start.next = null; // 1 -> 2 링크 삭제
        this.start = newStart; // start에 2 대입
    }
    //맨 뒤에 있는 노드를 제거해주세요 (제거된 노드 반환, 없으면 null)
    popBack() {
        const newEnd = this.end.prev; // 곧 end가 될 -1 확보
        newEnd.next = null; // -1 -> 0 링크 삭제
        this.end.prev = null; // 0 -> -1 링크 삭제
        this.end = newEnd; // end에 -1 대입
    }


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


// 다 완성하고, 시현이한테 배운거랑 비교해서,
// 1. 축약되지 않은 부분
// 2. 틀린 부분
// 메모하고 한 번 더 코딩해보기


const DL1 = new DoubleLinkedList();


DL1.append(1);
DL1.append(2);
DL1.append(3);
DL1.popFront();
DL1.popBack();
console.log(DL1.start);
console.log(DL1.end);
console.log(DL1.front());
console.log(DL1.back());