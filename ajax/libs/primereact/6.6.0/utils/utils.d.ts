import React from "react";

export declare function classNames(...args: any[]): string | undefined;

export declare class ConnectedOverlayScrollHandler {
    constructor(element: any, listener?: () => void);
    bindScrollListener(): void;
    unbindScrollListener(): void;
    destroy(): void;
}

export declare class DomHandler {
    static innerWidth(el: HTMLElement): number;
    static width(el: HTMLElement): number;
    static getWindowScrollTop(): number;
    static getWindowScrollLeft(): number;
    static getOuterWidth(el: HTMLElement, margin: boolean): number;
    static getOuterHeight(el: HTMLElement, margin: boolean): number;
    static getClientHeight(el: HTMLElement, margin: boolean): number;
    static getViewport(): { width: number; height: number; };
    static getOffset(el: HTMLElement): { top: any; left: any; };
    static index(el: HTMLElement): number;
    static addMultipleClasses(el: HTMLElement, className: string): void;
    static addClass(el: HTMLElement, className: string): void;
    static removeClass(el: HTMLElement, className: string): void;
    static hasClass(el: HTMLElement, className: string): boolean;
    static find(el: HTMLElement, selector: string): any[];
    static findSingle(el: HTMLElement, selector: string): any;
    static getHeight(el: HTMLElement): number;
    static getWidth(el: HTMLElement): number;
    static alignOverlay(overlay: HTMLElement, target: HTMLElement, appendTo?: string): void;
    static absolutePosition(el: HTMLElement, target: HTMLElement): void;
    static relativePosition(el: HTMLElement, target: HTMLElement): void;
    static flipfitCollision(el: HTMLElement, target: HTMLElement, my?: string, at?: string, callback?: any): void;
    static findCollisionPosition(position: string): void;
    static getParents(el: HTMLElement, parents?: any[]): any[];
    static getScrollableParents(el: HTMLElement): any[];
    static getHiddenElementOuterHeight(el: HTMLElement): number;
    static getHiddenElementOuterWidth(el: HTMLElement): number;
    static getHiddenElementDimensions(el: HTMLElement): { width?: number; height?: number; };
    static fadeIn(el: HTMLElement, duration: number): void;
    static fadeOut(el: HTMLElement, duration: number): void;
    static getUserAgent(): string;
    static isIOS(): boolean;
    static isAndroid(): boolean;
    static isTouchDevice(): boolean;
    static isFunction(obj: any): boolean;
    static appendChild(el: HTMLElement, target: HTMLElement): void;
    static removeChild(el: HTMLElement, target: HTMLElement): void;
    static isElement(obj: any): boolean;
    static scrollInView(container: HTMLElement, item: HTMLElement): void;
    static calculateScrollbarWidth(el: HTMLElement): number;
    static getBrowser(): object;
    static resolveUserAgent(): { browser: string; version: string; };
    static clearSelection(): void;
    static calculateScrollbarWidth(): number;
    static isVisible(el: HTMLElement): boolean;
    static getFocusableElements(el: HTMLElement): any[];
    static getFirstFocusableElement(el: HTMLElement): any;
    static getLastFocusableElement(el: HTMLElement): any;
    static getCursorOffset(el: HTMLElement, prevText?: string, nextText?: string, currentText?: string): { top: any; left: any; };
}

export declare function EventBus(): {
    on(type: string, fn: any): void;
    emit(type: string, evt?: any): void;
    off(type: string, fn: any): void;
}

export declare class FilterUtils {
    static filter(value: any, fields: string, filterValue: any, filterMatchMode: string, filterLocale?: string): any[];
    static startsWith(value: any, filter: string, filterLocale?: string): boolean;
    static contains(value: any, filter: string, filterLocale?: string): boolean;
    static endsWith(value: any, filter: string, filterLocale?: string): boolean;
    static equals(value: any, filter: string, filterLocale?: string): boolean;
    static notEquals(value: any, filter: string, filterLocale?: string): boolean;
    static in(value: any, filter: string, filterLocale?: string): boolean;
    static lt(value: any, filter: string, filterLocale?: string): boolean;
    static lte(value: any, filter: string, filterLocale?: string): boolean;
    static gt(value: any, filter: string, filterLocale?: string): boolean;
    static gte(value: any, filter: string, filterLocale?: string): boolean;
}

export declare function mask(el: HTMLElement, options: object): {
    init(): void;
    bindEvents(): void;
    unbindEvents(): void;
    updateModel(e: React.SyntheticEvent): void;
    getValue(): string;
}

export declare class ObjectUtils {
    static equals(obj1: any, obj2: any, field: string): boolean;
    static deepEquals(a: any, b: any): boolean;
    static resolveFieldData(data: any, field: string): any;
    static isFunction(obj: any): boolean;
    static findDiffKeys(obj1: any, obj2: any): object;
    static reorderArray(value: any, from: number, to: number): void;
    static findIndexInList(value: any, list: any[], dataKey?: string): number;
    static getJSXElement(obj: any, ...params: any[]): any;
    static removeAccents(str: any): string;
    static isEmpty(value: any): boolean;
    static isNotEmpty(value: any): boolean;
}

export declare function UniqueComponentId(prefix?: string): string;

export declare namespace ZIndexUtils {
    export function get(el?: HTMLElement): number;
    export function set(key: string, el: HTMLElement, baseZIndex?: number): void;
    export function clear(el: HTMLElement): void;
    export function getBase(key: string): number;
    export function getCurrent(key: string): number;
}
