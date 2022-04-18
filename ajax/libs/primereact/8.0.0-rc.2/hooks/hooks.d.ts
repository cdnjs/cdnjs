import { DependencyList, EffectCallback, Ref } from 'react';

export type TargetType = 'document' | 'window' | Ref<HTMLElement> | undefined;

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
export declare function useMountEffect(effect: EffectCallback): void;
export declare function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void;
export declare function useUnmountEffect(effect: EffectCallback): void;
export declare function useEventListener(options: EventOptions): any[];
export declare function useOverlayListener(options: OverlayEventOptions): any[];
export declare function useOverlayScrollListener(options: EventOptions): any[];
export declare function useResizeListener(options: ResizeEventOptions): any[];
export declare function useInterval(fn: any, delay?: number, when?: boolean): any[];
export declare function useTimeout(fn: any, delay?: number, when?: boolean): any[];
