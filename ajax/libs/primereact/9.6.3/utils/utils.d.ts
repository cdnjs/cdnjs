/**
 *
 * @todo Write the documentation.
 *
 * @module utils
 *
 */
import * as React from 'react';

export declare function classNames(...args: any[]): string | undefined;

export declare function mergeProps(...args: object[]): object | undefined;

/**
 * Use 'useOverlayScrollListener' hook instead
 * @deprecated since version 8.0.0
 */
export declare class ConnectedOverlayScrollHandler {
    constructor(element: any, listener?: () => void);
    bindScrollListener(): void;
    unbindScrollListener(): void;
    destroy(): void;
}

export declare class DomHandler {
    static innerWidth(el: HTMLElement): number;
    static width(el: HTMLElement): number;
    static getBrowserLanguage(): string;
    static getWindowScrollTop(): number;
    static getWindowScrollLeft(): number;
    static getOuterWidth(el: HTMLElement, margin: boolean): number;
    static getOuterHeight(el: HTMLElement, margin: boolean): number;
    static getClientHeight(el: HTMLElement, margin: boolean): number;
    static getClientWidth(el: HTMLElement, margin: boolean): number;
    static getViewport(): { width: number; height: number };
    static getOffset(el: HTMLElement): { top: any; left: any };
    static index(el: HTMLElement): number;
    static addMultipleClasses(el: HTMLElement, className: string): void;
    static removeMultipleClasses(el: HTMLElement, className: string): void;
    static addClass(el: HTMLElement, className: string): void;
    static removeClass(el: HTMLElement, className: string): void;
    static hasClass(el: HTMLElement, className: string): boolean;
    static find(el: HTMLElement, selector: string): any[];
    static findSingle(el: HTMLElement, selector: string): any;
    static getHeight(el: HTMLElement): number;
    static getWidth(el: HTMLElement): number;
    static alignOverlay(overlay: HTMLElement, target: HTMLElement, appendTo?: string, calculateMinWidth?: boolean): void;
    static absolutePosition(el: HTMLElement, target: HTMLElement): void;
    static relativePosition(el: HTMLElement, target: HTMLElement): void;
    static flipfitCollision(el: HTMLElement, target: HTMLElement, my?: string, at?: string, callback?: any): void;
    static findCollisionPosition(position: string): void;
    static getParents(el: HTMLElement, parents?: any[]): any[];
    static getScrollableParents(el: HTMLElement, hideOverlaysOnDocumentScrolling?: boolean): any[];
    static getHiddenElementOuterHeight(el: HTMLElement): number;
    static getHiddenElementOuterWidth(el: HTMLElement): number;
    static getHiddenElementDimensions(el: HTMLElement): { width?: number; height?: number };
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
    static clearSelection(): void;
    static calculateScrollbarWidth(el: HTMLElement): number;
    static getBrowser(): object;
    static resolveUserAgent(): { browser: string; version: string };
    static isVisible(el: HTMLElement): boolean;
    static isExist(el: HTMLElement): boolean;
    static hasDOM(): boolean;
    static getFocusableElements(el: HTMLElement, selector?: string): any[];
    static getFirstFocusableElement(el: HTMLElement, selector?: string): any;
    static getLastFocusableElement(el: HTMLElement, selector?: string): any;
    static focus(el: HTMLElement, scrollTo?: boolean): void;
    static getCursorOffset(el: HTMLElement, prevText?: string, nextText?: string, currentText?: string): { top: any; left: any };
    static invokeElementMethod(el: HTMLElement, methodName: string, arg: any): void;
    static isClickable(el: HTMLElement): boolean;
    static applyStyle(el: HTMLElement, style: any): void;
    static exportCSV(csv: any, filename: string): void;
    static saveAs(file: { name: string; url: any }): boolean;
    static createInlineStyle(nonce: string): HTMLElement;
    static removeInlineStyle(styleElement: HTMLElement): HTMLElement | null;
    static getTargetElement(target: any): HTMLElement | null;
}

export declare function EventBus(): {
    on(type: string, fn: any): void;
    emit(type: string, evt?: any): void;
    off(type: string, fn: any): void;
};

export declare function mask(
    el: HTMLElement,
    options: object
): {
    init(): void;
    bindEvents(): void;
    unbindEvents(): void;
    updateModel(e: React.SyntheticEvent): void;
    getValue(): string;
};

export declare class ObjectUtils {
    static equals(obj1: any, obj2: any, field: string): boolean;
    static deepEquals(a: any, b: any): boolean;
    static resolveFieldData(data: any, field: string): any;
    static isFunction(obj: any): boolean;
    static findDiffKeys(obj1: any, obj2: any): object;
    static reorderArray(value: any, from: number, to: number): void;
    static findIndexInList(value: any, list: any[], dataKey?: string): number;
    static getJSXElement(obj: any, ...params: any[]): any;
    static getProp(props: object, prop: string, defaultProps?: object): any;
    static getMergedProps(props: object, defaultProps: object): object;
    static getDiffProps(props: object, defaultProps: object): object;
    static getPropValue(obj: any, ...params: any[]): any;
    static isValidChild(child: any, type: string): boolean;
    static getComponentProp(component: any, prop: string, defaultProps?: object): any;
    static getComponentProps(component: any, defaultProps?: object): object | undefined;
    static getComponentDiffProps(component: any, defaultProps?: object): object | undefined;
    static getRefElement(ref: any): any;
    static combinedRefs(innerRef: any, forwardRef: any): void;
    static removeAccents(str: any): string;
    static isEmpty(value: any): boolean;
    static isNotEmpty(value: any): boolean;
    static sort(value1: any, value2: any, order: number, locale: string | string[]): number;
}

export declare class IconUtils {
    static getJSXIcon(icon: IconType<any>, iconProps: React.HTMLProps<HTMLElement>, options: any): any;
}

export declare function UniqueComponentId(prefix?: string): string;

export declare namespace ZIndexUtils {
    export function get(el?: HTMLElement): number;
    export function set(key: string, el: HTMLElement, autoZIndex?: boolean, baseZIndex?: number): void;
    export function clear(el: HTMLElement): void;
    export function getBase(key: string): number;
    export function getCurrent(key: string): number;
}

export interface IconOptions<ParentProps> {
    iconProps: React.HTMLProps<HTMLElement>;
    element: React.ReactNode;
    props?: ParentProps;
    [key: string]: any;
}

export type IconType<ParentProps> = React.ReactNode | ((options: IconOptions<ParentProps>) => React.ReactNode);

export type TemplateType<ParentProps> = React.ReactNode | ((props: ParentProps) => React.ReactNode);

export type PassThroughType<T, O> = T | ((options?: O) => T | void) | null | undefined;
