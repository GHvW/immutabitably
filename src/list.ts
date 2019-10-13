interface Node<A> {
    data: A,
    next: List<A> | null
}

export class List<A> implements Iterable<A> {
    private root: Node<A> | null;

    private constructor(node?: Node<A>) {
        this.root = node === undefined ? null : node;
    }
    
    static empty<A>(): List<A> {
        return new List();
    }

    static from<A>(data: A): List<A> {
        return new List({ data: data, next: null });
    }

    static new<A>(data: A, next: List<A>): List<A> {
        return new List({ data: data, next: next });
    }

    isEmpty(): boolean {
        return this.root === null;
    }

    cons(data: A): List<A> {
        return new List({ data: data, next: this });       
    }

    headTail(): [A | null, List<A> | null] {
        return [this.root && this.root.data, this.root && this.root.next];
    }

    *[Symbol.iterator](): IterableIterator<A> {
        let [head, tail] = this.headTail();

        while (head !== null && tail !== null) {
            yield head;
            [head, tail] = tail.headTail();

            if (tail === null && head !== null) {
                yield head;
            }
        }
    }
}