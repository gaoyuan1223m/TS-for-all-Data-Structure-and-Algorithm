import { DataStructures } from "@Utils/data-types";

export interface IStack<T> {

    /**
     * *Looks at the object at the top of this Stack without removing it from the Stack*
     */
    readonly peek: T;

    /**
     * *The number of the objects on the current Stack*
     */
    readonly size: number;

    /**
     * *Pushes an item onto the top of this Stack*.
     * @param value: Object that needs to add at the top of this Stack
     */
    push(value: T): this;

    /**
     * *Removes the object at the top of this Stack and returns that object as the value of this function*
     */
    pop(): T;

}

export interface IStackConstructor {
    new <T>(type: DataStructures, capacity: number): IStack<T>;
}