
export interface Node<A> {
    data: A;
    next: Node<A> | null;
}

export class List<A> {
    private root: Node<A> | null;
    private last: Node<A> | null; // last will maintain a pointer to the virtual but potentially not actual end of the list; 

    constructor(root: Node<A> | null = null) {
        this.root = root;
        this.last = root === null ? null : this.findLast(root); 
    }

    isEmpty(): boolean {
        return this.root === null;
    }

    count(): number {
        return this.findLength(this.root, 0);
    }

    concat(other: List<A>): List<A> {
        if (this.root === null) {
            return new List(other.root);
        }

        this.last!.next = other.root;

        return new List(this.root);
    }

    headTail(): [A | null, List<A> | null] {
        const head = this.root && this.root.data; // refactor to this.root?.data when 3.7 lands
        const tail = this.root && this.root.next; // refactor to this.root?.next when 3.7 lands
        return [head, new List(tail)];
    }

    private findLast(node: Node<A>): Node<A> {
        if (node.next === null) {
            return node;
        }

        return this.findLast(node.next);
    }

    private findLength(node: Node<A> | null, total: number): number {
        if (node === null) {
            return total;
        }

        return this.findLength(node.next, total + 1);
    }
}