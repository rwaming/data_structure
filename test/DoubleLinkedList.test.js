const {describe, test, expect, beforeEach} = require("@jest/globals");
const {DoubleLinkedList} = require("../DoubleLinkedList.js");

describe("DoubleLinkedList", () => {
    let dll;
    beforeEach(() => {
        dll = new DoubleLinkedList();
    })
    describe("append", () => {
        test("값을 추가하면 사이즈가 1 증가 함", () => {
            expect(dll.size).toBe(0);
            dll.append(1);
            expect(dll.size).toBe(1);
        })
        test("비어있는 상태에서 실행 시 첫번째 값이 됨", () => {
            dll.append(1);
            expect(dll.back().value).toBe(1);
        })
        test("비어있지 않는 상태에서 실행 시 첫번째 값은 변하지 않음", () => {
            dll.append(1);
            const beforeFront =  dll.front();
            dll.append(2);
            expect(dll.front()).toBe(beforeFront);
            expect(dll.front().value).toBe(beforeFront.value);
        })
        test("마지막에 값을 추가 함", () => {
            dll.append(1);
            const beforeBack =  dll.back();
            dll.append(2);
            expect(dll.back()).not.toBe(beforeBack);
            expect(dll.back().value).toBe(2);
        })
    })
    describe("appendLeft", () => {
        test("값을 추가하면 사이즈가 1 증가 함", () => {
            expect(dll.size).toBe(0);
            dll.appendLeft(1);
            expect(dll.size).toBe(1);
        })
        test("가장 앞에 있는 값은 새로 추가된 값으로 변경 됨", () => {
            dll.appendLeft(1);
            const beforeFront =  dll.front();
            dll.appendLeft(2);
            expect(dll.front()).not.toBe(beforeFront);
            expect(dll.front().value).toBe(2);
        })
        test("비어있는 상태에서 실행 시 마지막 값이 됨", () => {
            dll.appendLeft(1);
            expect(dll.back().value).toBe(1);
        })
        test("비어있지 않는 상태에서 실행 시 마지막 값은 변하지 않음", () => {
            dll.appendLeft(1);
            const beforeBack =  dll.back();
            dll.appendLeft(2);
            expect(dll.back()).toBe(beforeBack);
        })
    })
    describe("isEmpty",() => {
        test("비어있다면 true를 반환", () => {
            expect(dll.isEmpty()).toBe(true);
        })
        test("비어있지 않다면 false를 반환", () => {
            dll.append(3)
            expect(dll.isEmpty()).toBe(false);
        })
    })
    describe("front", () => {
        test("비어있다면 null을 반환", () => {
            expect(dll.front()).toBeNull();
        })
        test("값이 존재한다면 가장 앞에 있는 노드를 반환", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            expect(dll.front().value).toBe(1)
        })
    })
    describe("back", () => {
        test("비어있다면 null을 반환", () => {
            expect(dll.back()).toBeNull();
        })
        test("값이 존재한다면 가장 앞에 있는 노드를 반환", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            expect(dll.back().value).toBe(3)
        })
    })
    describe("hasValue", () => {
        test("없는 값을 요구할 경우 null을 반환 함", () => {
            expect(dll.hasValue(3)).toBeNull();
            expect(dll.hasValue(undefined)).toBeNull();
        })
        test("값이 있을 경우 해당 node를 반환해야 함", () => {
            dll.append(1);
            dll.append(2);
            expect(dll.hasValue(1)).toBe(dll.front());
            expect(dll.hasValue(2)).toBe(dll.back());
        })
    })
    describe("popFront", () => {
        test("비어 있는 경우 null을 반환", () => {
            expect(dll.popFront()).toBeNull();
        })
        test("실행 시 가장 앞에 있는 노드를 반환", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            const front = dll.front();
            expect(dll.popFront()).toBe(front);
        })
        test("실행 시 가장 앞에 있는 노드는 제거되어야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            expect(dll.popFront()).not.toBe(dll.popFront());
        })
        test("실행 시 size가 1 줄어들어야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            const size = dll.size;
            dll.popFront();
            expect(dll.size).toBe(size - 1);
        })
    })
    describe("popBack", () => {
        test("비어 있는 경우 null을 반환", () => {
            expect(dll.popBack()).toBeNull();
        })
        test("실행 시 가장 뒤에 있는 노드를 반환", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            const back = dll.back();
            expect(dll.popBack()).toBe(back);
        })
        test("실행 시 가장 뒤에 있는 노드는 제거되어야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            expect(dll.popBack()).not.toBe(dll.popBack());
        })
        test("실행 시 size가 1 줄어들어야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            const size = dll.size;
            dll.popBack();
            expect(dll.size).toBe(size - 1);
        })
    })
    describe("pushPrev", () => {
        test("실행 시 사이즈가 1 증가해야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(4);
            const size = dll.size;
            dll.pushPrev(dll.back(), 3);
            expect(dll.size).toBe(size + 1);
        })
        test("실행 시 노드의 뒤로 값이 들어가야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(4);
            dll.pushPrev(dll.back(), 3);
            const orderSeq = [];
            while(true) {
                const front = dll.popFront();
                if(front === null) {
                    break;
                }
                orderSeq.push(front.value);
            }
            expect(orderSeq).toStrictEqual([1,2,3,4]);
        })
    })
    describe("pushNext", () => {
        test("실행 시 사이즈가 1 증가해야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(4);
            const size = dll.size;
            dll.pushNext(dll.back(), 3);
            expect(dll.size).toBe(size + 1);
        })
        test("실행 시 노드의 앞으로 값이 들어가야 함", () => {
            dll.append(1);
            dll.append(3);
            dll.append(4);
            dll.pushNext(dll.front(), 2);
            const orderSeq = [];
            while(true) {
                const front = dll.popFront();
                if(front === null) {
                    break;
                }
                orderSeq.push(front.value);
            }
            expect(orderSeq).toStrictEqual([1,2,3,4]);
        })
    })
    describe("removePrev", () => {
        test("실행 시 사이즈가 1 감소해야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(4);
            const size = dll.size;
            dll.removePrev(dll.back());
            expect(dll.size).toBe(size - 1);
        })
        test("실행 시 노드의 뒤로 값이 들어가야 함", () => {
            dll.append(1);
            dll.append(3);
            dll.append(2);
            dll.removePrev(dll.back());
            const orderSeq = [];
            while(true) {
                const front = dll.popFront();
                if(front === null) {
                    break;
                }
                orderSeq.push(front.value);
            }
            expect(orderSeq).toStrictEqual([1,2]);
        })
    })
    describe("removeNext", () => {
        test("실행 시 사이즈가 1 감소해야 함", () => {
            dll.append(1);
            dll.append(2);
            dll.append(4);
            const size = dll.size;
            dll.removeNext(dll.front());
            expect(dll.size).toBe(size - 1);
        })
        test("실행 시 노드의 뒤로 값이 들어가야 함", () => {
            dll.append(1);
            dll.append(3);
            dll.append(2);
            dll.removeNext(dll.front());
            const orderSeq = [];
            while(true) {
                const front = dll.popFront();
                if(front === null) {
                    break;
                }
                orderSeq.push(front.value);
            }
            expect(orderSeq).toStrictEqual([1,2]);
        })
    })
    describe("remove", () => {
        test("노드가 없으면 null 반환", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            dll.append(4);
            const target = dll.hasValue(2);
            dll.remove(target);
            expect(dll.remove(target)).toBeNull();
        })
        test("타겟 노드를 제거시 해당 노드 반환", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            dll.append(4);
            const target = dll.hasValue(2);
            expect(dll.remove(target)).toBe(target);
        })
        test("타겟 노드를 제거한 경우 size가 1 감소", () => {
            dll.append(1);
            dll.append(2);
            dll.append(3);
            dll.append(4);
            const size = dll.size;
            const target = dll.hasValue(2);
            dll.remove(target);
            expect(dll.size).toBe(size - 1);
        })
    })
})
