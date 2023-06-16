import { SetState, ImmerScope, ProxyObjectState, ProxyArrayState, MapState, DRAFT_STATE } from "../internal";
export declare type Objectish = AnyObject | AnyArray | AnyMap | AnySet;
export declare type ObjectishNoSet = AnyObject | AnyArray | AnyMap;
export declare type AnyObject = {
    [key: string]: any;
};
export declare type AnyArray = Array<any>;
export declare type AnySet = Set<any>;
export declare type AnyMap = Map<any, any>;
export declare const enum ArchType {
    Object = 0,
    Array = 1,
    Map = 2,
    Set = 3
}
export interface ImmerBaseState {
    parent_?: ImmerState;
    scope_: ImmerScope;
    modified_: boolean;
    finalized_: boolean;
    isManual_: boolean;
}
export declare type ImmerState = ProxyObjectState | ProxyArrayState | MapState | SetState;
export declare type Drafted<Base = any, T extends ImmerState = ImmerState> = {
    [DRAFT_STATE]: T;
} & Base;
//# sourceMappingURL=types-internal.d.ts.map