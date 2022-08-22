import * as React from 'react';

export type TargetType = 'document' | 'window' | React.Ref<HTMLElement> | undefined;
export type StorageType = 'local' | 'session';

interface EventOptions {
    target?: TargetType;
    type?: string;
    listener?(event: Event): void;
    options?: any;
    when?: boolean;
}

interface OverlayEventOptions {
    target?: TargetType;
    overlay?: TargetType;
    listener?(event: Event, type?: string): void;
    when?: boolean;
}

interface ResizeEventOptions {
    listener?(event: Event): void;
}

export declare function usePrevious(value: any): any;
export declare function useMountEffect(effect: React.EffectCallback): void;
export declare function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
export declare function useUnmountEffect(effect: React.EffectCallback): void;
export declare function useEventListener(options: EventOptions): any[];
export declare function useOverlayListener(options: OverlayEventOptions): any[];
export declare function useOverlayScrollListener(options: EventOptions): any[];
export declare function useResizeListener(options: ResizeEventOptions): any[];
export declare function useInterval(fn: any, delay?: number, when?: boolean): any[];
export declare function useTimeout(fn: any, delay?: number, when?: boolean): any[];
export declare function useStorage<S, K extends string = string>(initialValue: S, key: K, storage?: StorageType): [S, React.Dispatch<React.SetStateAction<S>>];
export declare function useLocalStorage<S, K extends string = string>(initialValue: S, key: K): [S, React.Dispatch<React.SetStateAction<S>>];
export declare function useSessionStorage<S, K extends string = string>(initialValue: S, key: K): [S, React.Dispatch<React.SetStateAction<S>>];
