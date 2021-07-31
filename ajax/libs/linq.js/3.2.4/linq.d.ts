declare namespace Enumerable {
  export var Utils: {
    createLambda(expression: any): (...params: any[]) => any;
    createEnumerable<T>(getEnumerator: () => IEnumerator<T>): IEnumerable<T>;
    createEnumerator<T>(initialize: () => void, tryGetNext: () => boolean, dispose: () => void): IEnumerator<T>;
    extendTo(type: any): void;
    recallFrom(type: any): void;
    hasNativeIteratorSupport(): boolean;
  };
  export function choice<T>(...params: T[]): IEnumerable<T>;
  export function cycle<T>(...params: T[]): IEnumerable<T>;
  export function empty<T>(): IEnumerable<T>;
  // from<T>, obj as JScript's IEnumerable or WinMD IIterable<T> is IEnumerable<T> but it can't define.
  export function from(): IEnumerable<any>; // empty
  export function from<T>(obj: IEnumerable<T>): IEnumerable<T>;
  export function from(obj: number): IEnumerable<number>;
  export function from(obj: boolean): IEnumerable<boolean>;
  export function from(obj: string): IEnumerable<string>;
  export function from<T>(obj: T[]): IEnumerable<T>;
  export function from<T>(obj: Iterator<T>): IEnumerable<T>;
  export function from<T>(obj: { length: number;[x: number]: T; }): IEnumerable<T>;
  export function from<T>(obj: { [key: string]: T }): IEnumerable<{ key: string; value: T }>;
  export function from(obj: any): IEnumerable<{ key: string; value: any }>;
  export function make<T>(element: T): IEnumerable<T>;
  export function matches<T>(input: string, pattern: RegExp): IEnumerable<T>;
  export function matches<T>(input: string, pattern: string, flags?: string): IEnumerable<T>;
  export function range(start: number, count: number, step?: number): IEnumerable<number>;
  export function rangeDown(start: number, count: number, step?: number): IEnumerable<number>;
  export function rangeTo(start: number, to: number, step?: number): IEnumerable<number>;
  export function repeat<T>(element: T, count?: number): IEnumerable<T>;
  export function repeatWithFinalize<T>(initializer: () => T, finalizer: (element: T) => void): IEnumerable<T>;
  export function generate<T>(func: () => T, count?: number): IEnumerable<T>;
  export function toInfinity(start?: number, step?: number): IEnumerable<number>;
  export function toNegativeInfinity(start?: number, step?: number): IEnumerable<number>;
  export function unfold<T>(seed: T, func: (value: T) => T): IEnumerable<T>;
  export function defer<T>(enumerableFactory: () => IEnumerable<T>): IEnumerable<T>;

  export interface IEnumerable<T> {
    constructor(getEnumerator: () => IEnumerator<T>): IEnumerable<T>;
    getEnumerator(): IEnumerator<T>;
    [Symbol.iterator](): Iterator<T>;

    // Extension Methods
    traverseBreadthFirst(childrenSelector: (element: T) => IEnumerable<T>): IEnumerable<T>;
    traverseBreadthFirst<TResult>(childrenSelector: (element: T) => IEnumerable<T>, resultSelector: (element: T, nestLevel: number) => TResult): IEnumerable<TResult>;
    traverseDepthFirst<TResult>(childrenSelector: (element: T) => IEnumerable<T>): IEnumerable<T>;
    traverseDepthFirst<TResult>(childrenSelector: (element: T) => IEnumerable<T>, resultSelector?: (element: T, nestLevel: number) => TResult): IEnumerable<TResult>;
    flatten(): IEnumerable<any>;
    pairwise<TResult>(selector: (prev: T, current: T) => TResult): IEnumerable<TResult>;
    scan(func: (prev: T, current: T) => T): IEnumerable<T>;
    scan<TAccumulate>(seed: TAccumulate, func: (prev: TAccumulate, current: T) => TAccumulate): IEnumerable<TAccumulate>;
    select<TResult>(selector: (element: T, index: number) => TResult): IEnumerable<TResult>;
    selectMany<TOther>(collectionSelector: (element: T, index: number) => IEnumerable<TOther>): IEnumerable<TOther>;
    selectMany<TCollection, TResult>(collectionSelector: (element: T, index: number) => IEnumerable<TCollection>, resultSelector: (outer: T, inner: TCollection) => TResult): IEnumerable<TResult>;
    selectMany<TOther>(collectionSelector: (element: T, index: number) => TOther[]): IEnumerable<TOther>;
    selectMany<TCollection, TResult>(collectionSelector: (element: T, index: number) => TCollection[], resultSelector: (outer: T, inner: TCollection) => TResult): IEnumerable<TResult>;
    selectMany<TOther>(collectionSelector: (element: T, index: number) => { length: number;[x: number]: TOther; }): IEnumerable<TOther>;
    selectMany<TCollection, TResult>(collectionSelector: (element: T, index: number) => { length: number;[x: number]: TCollection; }, resultSelector: (outer: T, inner: TCollection) => TResult): IEnumerable<TResult>;
    where(predicate: (element: T, index: number) => boolean): IEnumerable<T>;
    choose(selector: (element: T, index: number) => T): IEnumerable<T>;
    ofType<TResult>(type: any): IEnumerable<TResult>;
    zip<U, TResult>(second: IEnumerable<U>, resultSelector: (first: T, second: U, index: number) => TResult): IEnumerable<TResult>;
    zip<U, TResult>(second: { length: number;[x: number]: U; }, resultSelector: (first: T, second: U, index: number) => TResult): IEnumerable<TResult>;
    zip<U, TResult>(second: U[], resultSelector: (first: T, second: U, index: number) => TResult): IEnumerable<TResult>;
    zip<TResult>(...params: any[]): IEnumerable<TResult>; // last one is selector
    merge(...params: (T[]|IEnumerable<T>|{ length: number;[x: number]: T; })[]): IEnumerable<T>;
    join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: TInner) => TResult, compareSelector?: (obj: T) => TKey): IEnumerable<TResult>;
    join<TInner, TKey, TResult>(inner: { length: number;[x: number]: TInner; }, outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: TInner) => TResult, compareSelector?: (obj: T) => TKey): IEnumerable<TResult>;
    join<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: TInner) => TResult, compareSelector?: (obj: T) => TKey): IEnumerable<TResult>;
    groupJoin<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: IEnumerable<TInner>) => TResult, compareSelector?: (obj: T) => TKey): IEnumerable<TResult>;
    groupJoin<TInner, TKey, TResult>(inner: { length: number;[x: number]: TInner; }, outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: IEnumerable<TInner>) => TResult, compareSelector?: (obj: T) => TKey): IEnumerable<TResult>;
    groupJoin<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: IEnumerable<TInner>) => TResult, compareSelector?: (obj: T) => TKey): IEnumerable<TResult>;
    all(predicate: (element: T) => boolean): boolean;
    any(predicate?: (element: T) => boolean): boolean;
    isEmpty(): boolean;
    concat(...sequences: (T[]|IEnumerable<T>|{ length: number;[x: number]: T; })[]): IEnumerable<T>;
    insert(index: number, second: IEnumerable<T>): IEnumerable<T>;
    insert(index: number, second: { length: number;[x: number]: T; }): IEnumerable<T>;
    alternate(alternateValue: T): IEnumerable<T>;
    alternate(alternateSequence: { length: number;[x: number]: T; }): IEnumerable<T>;
    alternate(alternateSequence: IEnumerable<T>): IEnumerable<T>;
    alternate(alternateSequence: T[]): IEnumerable<T>;
    contains(value: T): boolean;
    contains<TCompare>(value: T, compareSelector?: (element: T) => TCompare): boolean;
    defaultIfEmpty(defaultValue?: T): IEnumerable<T>;
    distinct(): IEnumerable<T>;
    distinct<TCompare>(compareSelector: (element: T) => TCompare): IEnumerable<T>;
    distinctUntilChanged(): IEnumerable<T>;
    distinctUntilChanged<TCompare>(compareSelector: (element: T) => TCompare): IEnumerable<T>;
    except(second: { length: number;[x: number]: T; }): IEnumerable<T>;
    except<TCompare>(second: { length: number;[x: number]: T; }, compareSelector: (element: T) => TCompare): IEnumerable<T>;
    except(second: IEnumerable<T>): IEnumerable<T>;
    except<TCompare>(second: IEnumerable<T>, compareSelector: (element: T) => TCompare): IEnumerable<T>;
    except(second: T[]): IEnumerable<T>;
    except<TCompare>(second: T[], compareSelector: (element: T) => TCompare): IEnumerable<T>;
    intersect(second: { length: number;[x: number]: T; }): IEnumerable<T>;
    intersect<TCompare>(second: { length: number;[x: number]: T; }, compareSelector: (element: T) => TCompare): IEnumerable<T>;
    intersect(second: IEnumerable<T>): IEnumerable<T>;
    intersect<TCompare>(second: IEnumerable<T>, compareSelector: (element: T) => TCompare): IEnumerable<T>;
    intersect(second: T[]): IEnumerable<T>;
    intersect<TCompare>(second: T[], compareSelector: (element: T) => TCompare): IEnumerable<T>;
    union(second: { length: number;[x: number]: T; }): IEnumerable<T>;
    union<TCompare>(second: { length: number;[x: number]: T; }, compareSelector: (element: T) => TCompare): IEnumerable<T>;
    union(second: IEnumerable<T>): IEnumerable<T>;
    union<TCompare>(second: IEnumerable<T>, compareSelector: (element: T) => TCompare): IEnumerable<T>;
    union(second: T[]): IEnumerable<T>;
    union<TCompare>(second: T[], compareSelector: (element: T) => TCompare): IEnumerable<T>;
    sequenceEqual(second: { length: number;[x: number]: T; }): boolean;
    sequenceEqual<TCompare>(second: { length: number;[x: number]: T; }, compareSelector: (element: T) => TCompare): boolean;
    sequenceEqual(second: IEnumerable<T>): boolean;
    sequenceEqual<TCompare>(second: IEnumerable<T>, compareSelector: (element: T) => TCompare): boolean;
    sequenceEqual(second: T[]): boolean;
    sequenceEqual<TCompare>(second: T[], compareSelector: (element: T) => TCompare): boolean;
    orderBy<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
    orderBy<TKey>(keySelector: (element: T) => TKey, comparer: (first: TKey, second: TKey) => number): IOrderedEnumerable<T>;
    orderByDescending<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
    orderByDescending<TKey>(keySelector: (element: T) => TKey, comparer: (first: TKey, second: TKey) => number): IOrderedEnumerable<T>;
    reverse(): IEnumerable<T>;
    shuffle(): IEnumerable<T>;
    weightedSample(weightSelector: (element: T) => number): IEnumerable<T>;
    groupBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<IGrouping<TKey, T>>;
    groupBy<TKey, TElement>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement): IEnumerable<IGrouping<TKey, TElement>>;
    groupBy<TKey, TElement, TResult>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, resultSelector: (key: TKey, element: IEnumerable<TElement>) => TResult): IEnumerable<TResult>;
    groupBy<TKey, TElement, TResult, TCompare>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, resultSelector: (key: TKey, element: IEnumerable<TElement>) => TResult, compareSelector: (element: TKey) => TCompare): IEnumerable<TResult>;
    // :IEnumerable<IGrouping<TKey, T>>
    partitionBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<IGrouping<TKey, any>>;
    // :IEnumerable<IGrouping<TKey, TElement>>
    partitionBy<TKey, TElement>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement): IEnumerable<IGrouping<TKey, TElement>>;
    partitionBy<TKey, TElement, TResult>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, resultSelector: (key: TKey, element: IEnumerable<TElement>) => TResult): IEnumerable<TResult>;
    partitionBy<TKey, TElement, TResult, TCompare>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, resultSelector: (key: TKey, element: IEnumerable<TElement>) => TResult, compareSelector: (element: TKey) => TCompare): IEnumerable<TResult>;
    buffer(count: number): IEnumerable<T[]>;
    aggregate(func: (prev: T, current: T) => T): T;
    aggregate<TAccumulate>(seed: TAccumulate, func: (prev: TAccumulate, current: T) => TAccumulate): TAccumulate;
    aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (prev: TAccumulate, current: T) => TAccumulate, resultSelector: (last: TAccumulate) => TResult): TResult;
    average(selector?: (element: T) => number): number;
    count(predicate?: (element: T, index: number) => boolean): number;
    max(selector?: (element: T) => number): number;
    min(selector?: (element: T) => number): number;
    maxBy<TKey>(keySelector: (element: T) => TKey): T;
    minBy<TKey>(keySelector: (element: T) => TKey): T;
    sum(selector?: (element: T) => number): number;
    elementAt(index: number): T;
    elementAtOrDefault(index: number, defaultValue?: T): T | undefined;
    first(predicate?: (element: T, index: number) => boolean): T;
    firstOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T): T | undefined;
    firstOrDefault(defaultValue?: T): T | undefined;
    last(predicate?: (element: T, index: number) => boolean): T;
    lastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T): T | undefined;
    lastOrDefault(defaultValue?: T): T | undefined;
    single(predicate?: (element: T, index: number) => boolean): T;
    singleOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T): T | undefined;
    skip(count: number): IEnumerable<T>;
    skipWhile(predicate: (element: T, index: number) => boolean): IEnumerable<T>;
    take(count: number): IEnumerable<T>;
    takeWhile(predicate: (element: T, index: number) => boolean): IEnumerable<T>;
    takeExceptLast(count?: number): IEnumerable<T>;
    takeFromLast(count: number): IEnumerable<T>;
    indexOf(item: T): number;
    indexOf(predicate: (element: T, index: number) => boolean): number;
    lastIndexOf(item: T): number;
    lastIndexOf(predicate: (element: T, index: number) => boolean): number;
    asEnumerable(): IEnumerable<T>;
    cast<TResult>(): IEnumerable<TResult>;
    toArray(): T[];
    toLookup<TKey>(keySelector: (element: T) => TKey): ILookup<TKey, T>;
    toLookup<TKey, TElement>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement): ILookup<TKey, TElement>;
    toLookup<TKey, TElement, TCompare>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, compareSelector: (key: TKey) => TCompare): ILookup<TKey, TElement>;
    toObject(keySelector: (element: T) => any, elementSelector?: (element: T) => any): Object;
    // :IDictionary<TKey, T>
    toDictionary<TKey>(keySelector: (element: T) => TKey): IDictionary<TKey, T>;
    toDictionary<TKey, TValue>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TValue): IDictionary<TKey, TValue>;
    toDictionary<TKey, TValue, TCompare>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TValue, compareSelector: (key: TKey) => TCompare): IDictionary<TKey, TValue>;
    toJSONString(replacer: (key: string, value: any) => any): string;
    toJSONString(replacer: any[]): string;
    toJSONString(replacer: (key: string, value: any) => any, space: any): string;
    toJSONString(replacer: any[], space: any): string;
    toJoinedString(separator?: string): string;
    toJoinedString<TResult>(separator: string, selector: (element: T, index: number) => TResult): string;
    doAction(action: (element: T, index: number) => void): IEnumerable<T>;
    doAction(action: (element: T, index: number) => boolean): IEnumerable<T>;
    forEach(action: (element: T, index: number) => void): void;
    forEach(action: (element: T, index: number) => boolean): void;
    write(separator?: string): void;
    write<TResult>(separator: string, selector: (element: T) => TResult): void;
    writeLine(): void;
    writeLine<TResult>(selector: (element: T) => TResult): void;
    force(): void;
    letBind<TResult>(func: (source: IEnumerable<T>) => { length: number;[x: number]: TResult; }): IEnumerable<TResult>;
    letBind<TResult>(func: (source: IEnumerable<T>) => TResult[]): IEnumerable<TResult>;
    letBind<TResult>(func: (source: IEnumerable<T>) => IEnumerable<TResult>): IEnumerable<TResult>;
    share(): IDisposableEnumerable<T>;
    memoize(): IDisposableEnumerable<T>;
    catchError(handler: (exception: any) => void): IEnumerable<T>;
    finallyAction(finallyAction: () => void): IEnumerable<T>;
    log(): IEnumerable<T>;
    log<TValue>(selector: (element: T) => TValue): IEnumerable<T>;
    trace(message?: string): IEnumerable<T>;
    trace<TValue>(message: string, selector: (element: T) => TValue): IEnumerable<T>;
  }

  export interface IEnumerator<T> {
    current(): T;
    moveNext(): boolean;
    dispose(): void;
  }

  export interface IOrderedEnumerable<T> extends IEnumerable<T> {
    createOrderedEnumerable<TKey>(keySelector: (element: T) => TKey, comparer?: (first: TKey, second: TKey) => number, descending?: boolean): IOrderedEnumerable<T>;
    thenBy<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
    thenBy<TKey>(keySelector: (element: T) => TKey, comparer: (first: TKey, second: TKey) => number): IOrderedEnumerable<T>;
    thenByDescending<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
    thenByDescending<TKey>(keySelector: (element: T) => TKey, comparer: (first: TKey, second: TKey) => number): IOrderedEnumerable<T>;
  }

  export interface IDisposableEnumerable<T> extends IEnumerable<T> {
    dispose(): void;
  }

  export interface IDictionary<TKey, TValue> {
    add(key: TKey, value: TValue): void;
    get(key: TKey): TValue;
    set(key: TKey, value: TValue): boolean;
    contains(key: TKey): boolean;
    clear(): void;
    remove(key: TKey): void;
    count(): number;
    toEnumerable(): IEnumerable<{ key: TKey; value: TValue }>;
  }

  export interface ILookup<TKey, TElement> {
    count(): number;
    get(key: TKey): IEnumerable<TElement>;
    contains(key: TKey): boolean;
    toEnumerable(): IEnumerable<IGrouping<TKey, TElement>>;
  }

  export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
    key(): TKey;
    getSource(): TElement[];
  }
}

export = Enumerable;
export as namespace Enumerable;
