/**
 * Based on :
 *  
 * dts-gen -e "const {TreeMap} = require('jstreemap'); new TreeMap()"
 * 
 * dts-gen -e "const {TreeSet} = require('jstreemap'); new TreeSet()"
 */
declare module 'jstreemap' {

    export type Entry<K, V> = [K, V];

    interface Iterator<T, I extends Iterator<T, I>> {
        next(): void;
        prev(): void;
    }

    export interface SetIterator<T> extends Iterator<T, SetIterator<T>> {
        key: T;
        equals(it: SetIterator<T>): boolean;
    }

    export interface MapIterator<K, V> extends Iterator<K, MapIterator<K, V>> {
        key: K;
        value: V;
        equals(it: MapIterator<K, V>): boolean;
    }

    export interface InsertionResult<T, I extends Iterator<T, I>> {
        wasAdded: boolean;
        wasReplaced: boolean;
        iterator: I;
    }

    class Tree<K, V, E, I> {

        compareFunc: (l: K, r: K) => 0 | 1 | -1;

        size: number;

        [Symbol.iterator](): IterableIterator<E>;

        begin(): I;
    
        end(): I;

        rbegin(): I;
    
        rend(): I;
    
        clear(): void;
    
        delete(key: K): void;

        erase(it: I): void;
    
        entries(): IterableIterator<E>;

        keys(): IterableIterator<K>;

        values(): IterableIterator<V>;        

        backward(): IterableIterator<E>;

        find(key: K): I;
    
        first(): E;

        last(): E;

        lowerBound(key: K): I;
    
        upperBound(key: K): I;
    
        forEach(callback : (element: E) => void): void;
    
        has(key: K): boolean;

        toString(): string;
    
    }

    export class TreeSet<T> extends Tree<T, T, T, SetIterator<T>> {

        add(key: T): void;
    
        insertOrReplace(key: T): InsertionResult<T, SetIterator<T>>;
    
        insertUnique(key: T): InsertionResult<T, SetIterator<T>>;

    }

    export class TreeMap<K, V> extends Tree<K, V, Entry<K, V>, MapIterator<K, V>> {

        get(key: K): V | undefined;

        set(key: K, value: V): void;

        insertOrReplace(key: K, value: V): InsertionResult<Entry<K, V>, MapIterator<K, V>>;

        insertUnique(key: K, value: V): InsertionResult<Entry<K, V>, MapIterator<K, V>>;

    }

    export class TreeMultiMap<K, V> extends Tree<K, V, Entry<K, V>, MapIterator<K, V>> {

        get(key: K): V | undefined;

        set(key: K, value: V): void;

        insertMulti(key: K, value: V): InsertionResult<Entry<K, V>, MapIterator<K, V>>;

        insertOrReplace(key: K, value: V): InsertionResult<Entry<K, V>, MapIterator<K, V>>;

        insertUnique(key: K, value: V): InsertionResult<Entry<K, V>, MapIterator<K, V>>;

    }

    export class TreeMultiSet<T> extends Tree<T, T, T, SetIterator<T>> {

        add(key: T): void;
    
        insertMulti(key: T): InsertionResult<T, SetIterator<T>>;

        insertOrReplace(key: T): InsertionResult<T, SetIterator<T>>;
    
        insertUnique(key: T): InsertionResult<T, SetIterator<T>>;

    }
}
