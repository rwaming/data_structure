class Node { //value, prev, next;
    constructor(v,p,n) {
        this.value = v;
        this.prev = p ?? null;
        this.next = n ?? null;
    }   
}




class DoubleLinkedList {
    constructor() { //size, first, last;
        this.first = null;
        this.last = null;
        this.size = 0;
    }


    // 비었나요?
    isEmpty() {
        return (this.size === 0) ? true : false;
    }
    // v 값을 가진 노드가 있나요? 없으면 null을 있으면 그 node를 반환해 주세요
    hasValue(v) {
        let targetNode = this.first;
        while(targetNode.value !== v) { // 현재 node가 값이 아니면 계속 찾기
            targetNode = targetNode.next; // 다음 노드 서치
            if(targetNode === null){ // 다음이 없으면 정지
                break;
            }
        }
        return targetNode; // node반환 (값 or null)
    }


    //가장 앞에 있는 노드를 반환해 주세요 (없으면 null)
    front() {return this.first ?? null;}
    //가장 뒤에 있는 노드를 반환해 주세요 (없으면 null)
    back() {return this.last ?? null;}


    //맨 뒤에 v 값을 추가해주세요
    append(v) {
        const newNode = new Node(v); // ** 새노드 value 채움
        if(this.size === 0) { // 처음일 때 // ** first 채움, 새노드 next없음
            this.first = newNode; // first는 새노드 
        }else{ // first 있을 때,
            newNode.prev = this.last; // 새노드의 prev는 기존last // ** 새노드 prev 채움
            this.last.next = newNode; // 이전 노드의 next는 새노드 // ** 이전노드 next 채움
        }
        this.last = newNode; // last 항상 newNode로 마무리
        this.size++; // 사이즈++
    }
    //맨 앞에 v 값을 추가해주세요
    appendLeft(v) {
        const newNode = new Node(v); // ** 새노드 value 채움
        if(this.size === 0) { // 노드없으면,
            this.last = newNode; // last도 새노드
        }else{ // 노드(last)가 있다면,
            newNode.next = this.first;
            this.first.prev = newNode; // last의 prev는 newNode
        }
        this.first = newNode; // first는 새노드가 된다
        this.size++; // 사이즈++
    }

    //맨 앞에 있는 노드를 제거해주세요 (제거된 노드 반환, 없으면 null)
    popFront() {
        if(this.size !== 0){ // node가 없을 가능성 고려
            const first = this.first; // 기존 first 1
            if(this.size > 1){
                const newfirst = first.next; // 곧 first가 될 2 확보
                newfirst.prev = null; // 2 -> 1 링크 삭제
                this.first = newfirst; // first에 2 대입
            }else{ // 노드가 1개뿐이면,
                this.first = null;
                this.last = null;
            }
            this.size--;
            return first;
        }else{
            return null;
        }
    }
    //맨 뒤에 있는 노드를 제거해주세요 (제거된 노드 반환, 없으면 null)
    popBack() {
        if(this.size !== 0){ // node가 없을 가능성 고려
            const last = this.last; // 기존 last 0
            if(this.size > 1){
                const newlast = last.prev; // 곧 last가 될 -1 확보
                newlast.next = null; // -1 -> 0 링크 삭제
                this.last = newlast; // last에 -1 대입
            }else{ // 노드가 1개뿐이면,
                this.first = null;
                this.last = null;
            }
            this.size--;
            return last;
        }else{
            return null;
        }
    }


    //내 앞에 v 값을 넣어주세요
    pushPrev(node, v) {
        if(node === undefined){ // node가 제대로 없다면 실행x
            return;
        }
        const newNode = new Node(v); // new (v넣기)
        newNode.next = node; // new -> node 링크

        if(this.first === node){ // first = node 였다면,
            this.first = newNode; // first = new 로 변경
        }else{
            newNode.prev = node.prev; // node전 <- new
            node.prev.next = newNode; // node전 -> new(기존해제)
        }
        node.prev = newNode; // new <- node(기존해제)
        this.size++; // size ++
    }
    //내 뒤에 v 값을 넣어주세요
    pushNext(node, v) {
        if(node === undefined){ // node가 제대로 없다면 실행x
            return;
        }
        const newNode = new Node(v); // new (v넣기)
        newNode.prev = node; // node <- new 연결

        if(this.last === node){ // last = node 였다면,
            this.last = newNode; // last = new 로 변경
        }else{
            newNode.next = node.next; // new -> node뒤
            node.next.prev = newNode; // new <- node뒤 (기존해제)
        }
        node.next = newNode; // node -> new (기존해제)
        this.size++; // size ++
    }

    //내 앞에 node를 지워주세요 (제거된 노드 반환, 없으면 null)
    removePrev(node) {
        if(node === undefined){ // node가 제대로 없다면 실행x
            return;
        }
        if(this.first === node) {// node가 first가 아닐때만 실행
            const delNode = node.prev;
            if(this.first === delNode) {// node의 prev가 first라면?
                node.prev = null; // x <- node (연결해제)
                this.first = node; // first = node로 변경 (연결해제)
            }else{ // 외의 상황
                node.prev.prev.next = node; // node전전 -> node
                node.prev = node.prev.prev; // node전전 <- node
            }
            this.size--;
            return delNode;
        }else{
            return null;
        }
    }
    //내 뒤에 node를 지워주세요 (제거된 노드 반환, 없으면 null)
    removeNext(node) {
        if(node === undefined){ // node가 제대로 없다면 실행x
            return;
        }
        if(this.last === node) {// node가 last가 아닐때만 실행
            const delNode = node.next;
            if(this.last === delNode) {// node의 prev가 last라면?
                node.next = null; // node -> x (연결해제)
                this.last = node; // last = node로 변경 (연결해제)
            }else{ // 외의 상황
                node.next.next.prev = node; // node <- node뒤뒤
                node.next = node.next.next; // node -> node뒤뒤
            }
            this.size--;
            return delNode;
        }else{
            return null;
        }
    }


    //나를 지워주세요 (제거된 노드 반환, 없으면 null)
    remove(node) {
        if(node === undefined){ // node가 제대로 없다면 실행x
            return;
        }
        if(this.first === node){ // 
            
        }
        if(this.end === node){

        }
    }
}


// 다 완성하고, 시현이한테 배운거랑 비교해서,
// 1. 축약되지 않은 부분
// 2. 틀린 부분
// 메모하고 한 번 더 코딩해보기


const DL1 = new DoubleLinkedList();


DL1.append(1);
DL1.append(2);
DL1.append(3);
DL1.append(4);
DL1.append(5);
DL1.append(7);
DL1.pushPrev(DL1.front(),0);
DL1.pushPrev(DL1.back(),6);