import { IArray, ILinkedList, ITree } from "@Interface/specific";
import { AbstractArray } from "@Entity/abstract";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { Errors } from "@Utils/error-handling";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types";
import { Validation, ValidateParams } from "@Utils/decorator";
import { IArrayFactory } from "@Interface/common";


export const ArrayFactory: IArrayFactory = class ArrayFactory {

    static createStaticArray<T>(capacity: number): IArray<T> {	
        return this.create<T>(capacity);	
    }	

    static createDynamicArray<T>(capacity: number, incrementals: number = capacity): IArray<T> {	
        return this.create<T>(capacity, incrementals);	
    }

    static create<T>(capacity: number, incrementals: number = 0): IArray<T> {
        if (incrementals === 0) return new StaticArray(capacity);

        return new DynamicArray(capacity, incrementals);
    }
}

class StaticArray<T> extends AbstractArray<T> {

    constructor(capacity: number) {
        super(capacity, 0)
    }

    // O(i)
    @Validation('value')
    append(@ValidateParams() value: T): this {

        if (this._idxOfLastElm + 1 === this._capacity) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        this[this._idxOfLastElm + 1] = value;
        this[this._idxOfLastElm + 1 - this._capacity] = value;
        this._size += 1;
        this._idxOfLastElm += 1;
        return this;
    }

    // O(n)
    @Validation()
    insertByIndex(@ValidateParams() value: T, @ValidateParams() index: number): this {

        const idx = this._getValidIndex(index);

        if (!this._isValidValue(this[idx])) {
            this._idxOfLastElm = this._getIdxOfLastElm(idx);
            this[idx] = value;
            this[idx - this._capacity] = value;
            this._size += 1;
            return this;
        }

        let tempIdx: number; // the empty position cloest to the idx on the right

        for (let i = idx + 1; i < this._capacity; i++) {
            if (this[i]) continue;
            tempIdx = i;
            break;
        }

        if (!tempIdx) { // in case no more room for the new value on it's right, we search it's left part 
            for (let i = idx - 1; i >= 0; i--) {
                if (this[i]) continue;
                tempIdx = i;
                break;
            }
        }

        if (tempIdx !== 0 && !tempIdx) {
            throw new Errors.OutOfBoundary(Errors.Msg.NoMoreSpace);
        }

        if (tempIdx > idx) {
            this._idxOfLastElm = this._getIdxOfLastElm(tempIdx);

            for (let j = tempIdx; j > idx; j--) {
                this[j] = this[j - 1];
            }
            this[idx] = value;

            // for negative idx
            for (let k = tempIdx - this._capacity; k > idx - this._capacity; k--) {
                this[k] = this[k - 1];
            }
            this[idx - this._capacity] = value;

        } else {
            for (let j = tempIdx; j < idx; j++) {
                this[j] = this[j + 1];
            }
            this[idx] = value;

            // for negative idx
            for (let k = tempIdx - this._capacity; k < idx - this._capacity; k++) {
                this[k] = this[k + 1];
            }
            this[idx - this._capacity] = value;
        }

        this._size += 1;
        return this;
    }

    // O(n)
    map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): IArray<U> {
        const capacity = this._capacity;
        const newStaticArray: IArray<U> = new StaticArray<U>(capacity);
        for (let idx = 0; idx < capacity; idx++) {
            newStaticArray[idx] = callbackfn(this[idx], idx, this);
            newStaticArray[idx - capacity] = newStaticArray[idx];
        }
        return newStaticArray;
    }

    toArray(arrayType: ArrayTypes = ArrayTypes.Dynamic): IArray<T> {
        if (arrayType = ArrayTypes.Static) return this;

        return this._toDynamicArray();
    }

    toList(listType: ListTypes = ListTypes.Singly): ILinkedList<T> {
        if (listType === ListTypes.Doubly) return this._toDoublyLinkedList();

        if (listType === ListTypes.Circular) return this._toCircularLinkedList();

        if (listType === ListTypes.Skip) return this._toSkipLinkedList();

        return this._toSinglyLinkedList();
    }

    toTree(treeType: TreeTypes = TreeTypes.BST): ITree<T> {
        if (treeType === TreeTypes.AVL) return this._toAVL();

        if (treeType === TreeTypes.R_B) return this._toRedBlack();

        return this._toBST();
    }

    private _getIdxOfLastElm(index: number): number {
        return index > this._idxOfLastElm ? index : this._idxOfLastElm;
    }

    private _toDynamicArray(): IArray<T> {
        throw new Error("Method not implemented.");
    }

    private _toSinglyLinkedList(): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    private _toDoublyLinkedList(): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    private _toCircularLinkedList(): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    private _toSkipLinkedList(): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    private _toBST(): ITree<T> {
        throw new Error("Method not implemented.");
    }

    private _toAVL(): ITree<T> {
        throw new Error("Method not implemented.");
    }

    private _toRedBlack(): ITree<T> {
        throw new Error("Method not implemented.");
    }

}

/**@NOT Completed */
class DynamicArray<T> extends AbstractArray<T> {

    constructor(capacity: number, incremental: number = capacity) {
        super(capacity, incremental);
    }

    @Validation('value')
    append(@ValidateParams() value: T): this {
        throw new Error("Method not implemented.");
    }

    @Validation()
    insertByIndex(@ValidateParams() value: T, @ValidateParams() index: number): this {
        throw new Error("Method not implemented.");
    }

    toArray(arrayType: ArrayTypes): IArray<T> {
        return this;
    }

    toList(listType: ListTypes): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    toTree(treeType: TreeTypes): ITree<T> {
        throw new Error("Method not implemented.");
    }

    map<U>(callbackfn: (value: T, index: number, current: IArray<T>) => U, ICompareFunc: ICompareFunc<U> = valueTypeComparison, thisArg?: any): IArray<U> {
        throw new Error("Method not implemented.");
    }

}