class Node {
    constructor(v, p, n) {
        //value, prev, next;
        this.value = v;
        this.prev = p ?? null;
        this.next = n ?? null;
    }
}

class DoubleLinkedList {
    constructor() {
        //size, first, last;
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // 비었나요?
    isEmpty() {
        return this.size === 0;
    }

    // v 값을 가진 노드가 있다면 반환해 주세요 (없으면 null)
    hasValue(v) {
        let node = this.first; // 첫 확인 노드
        while (node?.value !== v && node !== null) {
            // value가 v거나, null일 때까지
            node = node.next; // 다음 노드 대입
        }
        return node; // node반환 (혹은 null)
    }

    //가장 앞에 있는 노드를 반환해 주세요 (없으면 null)
    front() {
        return this.first;
    }

    //가장 뒤에 있는 노드를 반환해 주세요 (없으면 null)
    back() {
        return this.last;
    }

    //맨 뒤에 v 값을 추가해주세요
    append(v) {
        const newNode = new Node(v, this.last ?? null); // (last가 있다면) last <- new 연결
        this.size === 0 ? (this.first = newNode) : (this.last.next = newNode); // 처음이면 first = new, 아니면 last -> new 연결
        this.last = newNode; // last = new
        this.size++; // 추가
    }

    //맨 앞에 v 값을 추가해주세요
    appendLeft(v) {
        const newNode = new Node(v, null, this.first ?? null); // (first가 있다면) new -> first 연결
        this.size === 0 ? (this.last = newNode) : (this.first.prev = newNode); // 처음이면 last = new, 아니면 new <- first 연결
        this.first = newNode; // first = new
        this.size++; // 추가
    }

    //맨 앞에 있는 노드를 제거해주세요 (제거된 노드 반환, 없으면 null)
    popFront() {
        const first = this.first; // 반환용 first 확보 (없으면 null)
        if (this.size > 1) {
            // 노드 여러개
            this.first.next.prev = null; // first <-x- first뒤
            this.first = this.first.next; // first = first뒤
        } else {
            // 노드1개 or 노드x
            this.first = null;
            this.last = null;
        }
        this.size !== 0 && this.size--; // 노드 있었을 때만 감소
        return first; // 반환
    }

    //맨 뒤에 있는 노드를 제거해주세요 (제거된 노드 반환, 없으면 null)
    popBack() {
        const last = this.last; // 반환용 last 확보 (없으면 null)
        if (this.size > 1) {
            // 노드 여러개
            this.last.prev.next = null; // last전 -x-> last
            this.last = this.last.prev; // last = last전
        } else {
            // 노드1개 or 노드x
            this.first = null;
            this.last = null;
        }
        this.size !== 0 && this.size--; // 노드 있었을 때만 감소
        return last; // 반환
    }

    //내 앞에 v 값을 넣어주세요
    pushPrev(node, v) {
        if (!(node instanceof Node)) {
            // Node 인스턴스가 아니면 실행x
            return undefined;
        }
        const newNode = new Node(v, node.prev ?? null, node); // node앞(null) <- new -> node 연결
        this.first === node ? (this.first = newNode) : (node.prev.next = newNode); // first면 first = new, 아니면 node앞 -> new(링크 변경)
        node.prev = newNode; // new <- node (링크 변경)
        this.size++; // 추가
    }

    // 내 뒤에 v 값을 넣어주세요
    pushNext(node, v) {
        if (!(node instanceof Node)) {
            // Node 인스턴스가 아니면 실행x
            return undefined;
        }
        const newNode = new Node(v, node, node.next ?? null); // node <- new -> node뒤(null) 연결
        this.last === node ? (this.last = newNode) : (node.next.prev = newNode); // last면 last = new, 아니면 new <- node뒤 (링크 변경)
        node.next = newNode; // node -> new (링크 변경)
        this.size++; // 추가
    }

    //내 앞에 node를 지워주세요 (제거된 노드 반환, 없으면 null)
    removePrev(node) {
        if (!(node instanceof Node)) {
            // Node 인스턴스가 아니면 실행x
            return undefined;
        }
        const delNode = node.prev; // 반환용 확보 (없으면 null)
        if (node.prev !== null) {
            // 제거 가능
            if (this.first === delNode) {
                // del이 first면,
                node.prev = null; // del <-x- node
                this.first = node; // first = node
            } else {
                // 외의 상황
                node.prev.prev.next = node; // node전전 -> node
                node.prev = node.prev.prev; // node전전 <- node
            }
            this.size--; // 감소
        }
        return delNode;
    }

    //내 뒤에 node를 지워주세요 (제거된 노드 반환, 없으면 null)
    removeNext(node) {
        if (!(node instanceof Node)) {
            // Node 인스턴스가 아니면 실행x
            return undefined;
        }
        const delNode = node.next; // 반환용 확보 (없으면 null)
        if (node.next !== null) {
            // 제거 가능
            if (this.last === delNode) {
                // del이 last면,
                node.next = null; // node -x-> del
                this.last = node; // last = node
            } else {
                // 외의 상황
                node.next.next.prev = node; // node <- node뒤뒤
                node.next = node.next.next; // node -> node뒤뒤
            }
            this.size--; // 감소
        }
        return delNode;
    }

    //나를 지워주세요 (제거된 노드 반환, 없으면 null)
    remove(node) {
        if (!(node instanceof Node)) {
            // Node 인스턴스가 아니면 실행x
            return undefined;
        }
        this.first === node ? (this.first = node.next ?? null) : (node.prev.next = node.next); // p -> n(연결해제) node가 first면 실행X
        this.last === node ? (this.last = node.prev ?? null) : (node.next.prev = node.prev); // p <- n(연결해제) node가 last면 null이면 실행X
        this.size--;
        return node;
    }
}
