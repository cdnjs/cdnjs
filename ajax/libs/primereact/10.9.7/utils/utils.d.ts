/**
 *
 * @todo Write the documentation.
 *
 * @module utils
 *
 */
import * as React from 'react';
import { PassThroughOptions } from '../passthrough';

export declare function classNames(...args: any[]): string | undefined;

/**
 * Merges properties together taking an Array of props and merging into one single set of
 * properties. The options can contain a "classNameMergeFunction" which can be something
 * like Tailwind Merge for properly merging Tailwind classes.
 *
 * @param {object[]} args the array of object properties to merge
 * @param {PassThroughOptions} options either empty or could contain a custom merge function like TailwindMerge
 * @returns the single properties value after merging
 */
export declare function mergeProps(args: object[], options?: PassThroughOptions): object | undefined;

export declare class DomHandler {
    static innerWidth(el: HTMLElement): number;
    static width(el: HTMLElement): number;
    static getBrowserLanguage(): string;
    static getWindowScrollTop(): number;
    static getWindowScrollLeft(): number;
    static getOuterWidth(el?: HTMLElement | null, margin?: boolean): number;
    static getOuterHeight(el?: HTMLElement | null, margin?: boolean): number;
    static getClientHeight(el?: HTMLElement | null, margin?: boolean): number;
    static getClientWidth(el?: HTMLElement | null, margin?: boolean): number;
    static getViewport(): { width: number; height: number };
    static getOffset(el: HTMLElement): { top: any; left: any };
    static index(el: HTMLElement): number;
    static addMultipleClasses(el: HTMLElement, className: string): void;
    static removeMultipleClasses(el: HTMLElement, className: string): void;
    static addClass(el: HTMLElement, className: string): void;
    static removeClass(el: HTMLElement, className: string): void;
    static addStyles(el: HTMLElement, styles: object): void;
    static hasClass(el: HTMLElement, className: string): boolean;
    static find(el: HTMLElement, selector: string): any[];
    static findSingle(el: HTMLElement, selector: string): any;
    static createElement(type: string, attributes: object, ...children: any): HTMLElement;
    static setAttributes(el: HTMLElement, attributes: object): void;
    static getAttribute(el: HTMLElement, name: string): any;
    static isAttributeEquals(el: HTMLElement, name: string, value: any): boolean;
    static isAttributeNotEquals(el: HTMLElement, name: string, value: any): boolean;
    static getHeight(el: HTMLElement): number;
    static getWidth(el: HTMLElement): number;
    static alignOverlay(overlay: HTMLElement, target: HTMLElement, appendTo?: string, calculateMinWidth?: boolean): void;
    static absolutePosition(el: HTMLElement, target: HTMLElement): void;
    static relativePosition(el: HTMLElement, target: HTMLElement): void;
    static flipfitCollision(el: HTMLElement, target: HTMLElement, my?: string, at?: string, callback?: any): void;
    static findCollisionPosition(position: string): void;
    static getParents(el: HTMLElement, parents?: any[]): any[];
    static getScrollableParents(el: HTMLElement): any[];
    static getHiddenElementOuterHeight(el: HTMLElement): number;
    static getHiddenElementOuterWidth(el: HTMLElement): number;
    static getHiddenElementDimensions(el: HTMLElement): { width?: number; height?: number };
    static fadeIn(el: HTMLElement, duration: number): void;
    static fadeOut(el: HTMLElement, duration: number): void;
    static getUserAgent(): string;
    static isIOS(): boolean;
    static isAndroid(): boolean;
    static isClient(): boolean;
    static isTouchDevice(): boolean;
    static isFunction(obj: any): boolean;
    static appendChild(el: HTMLElement, target: HTMLElement): void;
    static removeChild(el: HTMLElement, target: HTMLElement): void;
    static isElement(obj: any): boolean;
    static isDocument(obj: any): boolean;
    static scrollInView(container: HTMLElement, item: HTMLElement): void;
    static clearSelection(): void;
    static calculateScrollbarWidth(el: HTMLElement): number;
    static calculateBodyScrollbarWidth(): number;
    static getBrowser(): object;
    static blockBodyScroll(className?: string): void;
    static unblockBodyScroll(className?: string): void;
    static resolveUserAgent(): { browser: string; version: string };
    static isVisible(el: HTMLElement): boolean;
    static isExist(el: HTMLElement): boolean;
    static getFocusableElements(el: HTMLElement, selector?: string): any[];
    static getFirstFocusableElement(el: HTMLElement, selector?: string): any;
    static getLastFocusableElement(el: HTMLElement, selector?: string): any;
    static focus(el: HTMLElement, scrollTo?: boolean): void;
    static getCursorOffset(el: HTMLElement, prevText?: string, nextText?: string, currentText?: string): { top: any; left: any };
    static invokeElementMethod(el: HTMLElement, methodName: string, arg: any): void;
    static isClickable(el: HTMLElement): boolean;
    static applyStyle(el: HTMLElement, style: React.CSSProperties | string): void;
    static exportCSV(csv: any, filename: string): void;
    static saveAs(file: { name: string; url: any }): boolean;
    static createInlineStyle(nonce?: string, styleContainer?: ShadowRoot | HTMLElement): HTMLStyleElement;
    static removeInlineStyle(styleElement: HTMLStyleElement): HTMLStyleElement | null;
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
    static mutateFieldData(data: object, field: string, value: any): void;
    static findDiffKeys(obj1: any, obj2: any): object;
    static reorderArray(value: any, from: number, to: number): void;
    static findIndexInList(value: any, list: any[], dataKey?: string): number;
    static getJSXElement(obj: any, ...params: any[]): any;
    static getItemValue(obj: any, ...params: any[]): any;
    static getProp(props: object, prop: string, defaultProps?: object): any;
    static getPropCaseInsensitive(props: object, prop: string, defaultProps?: object): any;
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
    static toFlatCase(str: string): string;
    static toCapitalCase(str: string): string;
    static trim(value: any): any;
    static isEmpty(value: any): boolean;
    static isNotEmpty(value: any): boolean;
    static isFunction(value: any): boolean;
    static isObject(value: any): boolean;
    static isDate(value: any): boolean;
    static isArray(value: any): boolean;
    static isString(value: any): boolean;
    static isPrintableCharacter(char: string): boolean;
    static isLetter(char: string): boolean;
    static isScalar(value: any): boolean;
    static findLast(value: any[], callback: () => any): any;
    static findLastIndex(value: any[], callback: () => any): number;
    static sort(value1: any, value2: any, order: number, locale: string | string[]): number;
    static getNestedValue(obj: object, path: string): any;
    static absoluteCompare(objA: object, objB: object, maxDepth?: number, currentDepth?: number): boolean;
    static selectiveCompare(a: object, b: object, keysToCompare?: string[], maxDepth?: number): boolean;
}

/**
 * Icon utilities for managing icon tasks.
 */
export declare class IconUtils {
    static getJSXIcon(icon: IconType<any>, iconProps: React.HTMLProps<HTMLElement>, options: any): any;
}

/**
 * Generate a unique id for components for a page.
 * @param prefix the optional string prefix of the id
 */
export declare function UniqueComponentId(prefix?: string): string;

/**
 * ZIndex utilities for managing zindex states of different types.
 */
export declare namespace ZIndexUtils {
    export function get(el?: HTMLElement): number;
    export function set(key: string, el: HTMLElement, autoZIndex?: boolean, baseZIndex?: number): void;
    export function clear(el: HTMLElement): void;
    export function getBase(key: string): number;
    export function getCurrent(key: string): number;
}

/**
 * Icon options passed to any icon.
 * @template ComponentProps Props from the owning component.
 * @template AdditionalProps Any custom properties of an icon like SortIcon of the Datatable for example.
 */
export type IconOptions<ComponentProps, AdditionalProps = NonNullable<unknown>> = AdditionalProps & {
    /**
     * Icon specific properties. Size property allows FontAwesome to work properly.
     * @type {(React.HTMLProps<unknown> & { size?: string }) | (React.SVGProps<unknown> & { size?: string })}
     */
    iconProps: (React.HTMLProps<unknown> & { size?: string }) | (React.SVGProps<unknown> & { size?: string });
    /**
     * The element representing the icon.
     * @type {React.ReactNode}
     */
    element: React.ReactNode;
    /**
     * Properties of the owning component.
     * @type {ComponentProps}
     */
    props?: ComponentProps;
    [key: string]: any;
};

export type IconType<ComponentProps, AdditionalProps = NonNullable<unknown>> = React.ReactNode | ((options: IconOptions<ComponentProps, AdditionalProps>) => React.ReactNode);

export type TemplateType<ComponentProps> = React.ReactNode | ((props: ComponentProps) => React.ReactNode);

export type PassThroughType<T, O> =
    | T
    | ((options?: O) => T | void)
    | null
    | undefined
    | {
          [key: string]: any;
      };
