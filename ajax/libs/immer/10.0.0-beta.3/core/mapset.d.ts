import { ImmerState, AnyMap, AnySet, ImmerBaseState, DRAFT_STATE, ArchType, Drafted } from "../internal";
/** Map / Set plugin */
export interface MapState extends ImmerBaseState {
    type_: ArchType.Map;
    copy_: AnyMap | undefined;
    assigned_: Map<any, boolean> | undefined;
    base_: AnyMap;
    revoked_: boolean;
    draft_: DraftMap;
}
export interface SetState extends ImmerBaseState {
    type_: ArchType.Set;
    copy_: AnySet | undefined;
    base_: AnySet;
    drafts_: Map<any, Drafted>;
    revoked_: boolean;
    draft_: DraftSet;
}
declare class DraftMap extends Map {
    [DRAFT_STATE]: MapState;
    constructor(target: AnyMap, parent?: ImmerState);
    get size(): number;
    has(key: any): boolean;
    set(key: any, value: any): this;
    delete(key: any): boolean;
    clear(): void;
    forEach(cb: (value: any, key: any, self: any) => void, thisArg?: any): void;
    get(key: any): any;
    keys(): IterableIterator<any>;
    values(): IterableIterator<any>;
    entries(): IterableIterator<[any, any]>;
    [Symbol.iterator](): IterableIterator<[any, any]>;
}
export declare function proxyMap<T extends AnyMap>(target: T, parent?: ImmerState): T;
declare class DraftSet extends Set {
    [DRAFT_STATE]: SetState;
    constructor(target: AnySet, parent?: ImmerState);
    get size(): number;
    has(value: any): boolean;
    add(value: any): any;
    delete(value: any): any;
    clear(): void;
    values(): IterableIterator<any>;
    entries(): IterableIterator<[any, any]>;
    keys(): IterableIterator<any>;
    [Symbol.iterator](): IterableIterator<any>;
    forEach(cb: any, thisArg?: any): void;
}
export declare function proxySet<T extends AnySet>(target: T, parent?: ImmerState): T;
export {};
//# sourceMappingURL=mapset.d.ts.map