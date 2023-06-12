/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IClone } from "./Clone";
import { Ordering } from "./Order";
import * as $type from "./Type";
/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export interface Iterator<A> {
    (push: (value: A) => boolean): void;
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export interface Iterable<A> {
    iterator(): Iterator<A>;
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function fromArray<A>(array: Array<A>): Iterator<A>;
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function length<A>(iter: Iterator<A>): number;
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function toArray<A>(iter: Iterator<A>): Array<A>;
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function eachContinue<A>(iter: Iterator<A>, fn: (value: A) => boolean): void;
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function each<A>(iter: Iterator<A>, fn: (value: A) => void): void;
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function sort<A>(iter: Iterator<A>, fn: (left: A, right: A) => Ordering): Iterator<A>;
/**
 * [A description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function map<A, B>(iter: Iterator<A>, fn: (value: A) => B): Iterator<B>;
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function filter<A>(iter: Iterator<A>, fn: (value: A) => boolean): Iterator<A>;
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function concat<A>(...args: Array<Iterator<A>>): Iterator<A>;
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function flatten<A>(iter: Iterator<Iterator<A>>): Iterator<A>;
/**
 * [number description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function indexed<A>(iter: Iterator<A>): Iterator<[number, A]>;
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function findIndex<A>(iter: Iterator<A>, matches: (value: A) => boolean): number;
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function find<A>(iter: Iterator<A>, matches: (value: A) => boolean): A | undefined;
/**
 * [A description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function findMap<A, B>(iter: Iterator<A>, matches: (value: A) => B | null): B | undefined;
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function contains<A>(iter: Iterator<A>, matches: (value: A) => boolean): boolean;
/**
 * [A description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare function foldl<A, B>(iter: Iterator<A>, init: B, fn: (state: B, value: A) => B): B;
/**
 * [min description]
 *
 * @ignore Exclude from docs
 * @todo Verify that this works correctly
 * @todo Description
 * @param a [description]
 * @return [description]
 */
export declare function min(a: Iterator<number>): number | null;
/**
 * [max description]
 *
 * @ignore Exclude from docs
 * @todo Verify that this works correctly
 * @todo Description
 * @param a [description]
 * @return [description]
 */
export declare function max(a: Iterator<number>): number | null;
/**
 * [join description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param iter [description]
 * @param separator [description]
 * @return [description]
 */
export declare function join(iter: Iterator<string>, separator?: string): string;
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare class ListIterator<T extends IClone<T>> {
    private _listCopy;
    private _create;
    list: Iterable<T>;
    createNewItems: boolean;
    /**
     * Constructor
     *
     * @param list [description]
     * @param create [description]
     */
    constructor(list: Iterable<T>, create: () => T);
    reset(): void;
    clear(): void;
    getFirst(): $type.Optional<T>;
    getLast(): $type.Optional<T>;
    find(fn: (value: T) => boolean): $type.Optional<T>;
    removeItem(item: T): boolean;
    protected returnItem(index: number): $type.Optional<T>;
    iterator(): Iterator<T>;
}
