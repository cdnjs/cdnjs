import { ClassNamesState, CommonPropsAndClassName, GroupBase, InputActionMeta, MultiValue, OnChangeValue, Options, PropsValue, SingleValue } from './types';
export declare const noop: () => void;
export declare const emptyString: () => string;
export declare function classNames(prefix?: string | null, state?: ClassNamesState, className?: string): string;
export declare const cleanValue: <Option>(value: PropsValue<Option>) => Options<Option>;
export declare const cleanCommonProps: <Option, IsMulti extends boolean, Group extends GroupBase<Option>, AdditionalProps>(props: Partial<CommonPropsAndClassName<Option, IsMulti, Group>> & AdditionalProps) => Omit<AdditionalProps, keyof CommonPropsAndClassName<Option, IsMulti, Group>>;
export declare function handleInputChange(inputValue: string, actionMeta: InputActionMeta, onInputChange?: (newValue: string, actionMeta: InputActionMeta) => string | void): string;
export declare function isDocumentElement(el: HTMLElement | typeof window): el is typeof window;
export declare function normalizedHeight(el: HTMLElement | typeof window): number;
export declare function getScrollTop(el: HTMLElement | typeof window): number;
export declare function scrollTo(el: HTMLElement | typeof window, top: number): void;
export declare function getScrollParent(element: HTMLElement): HTMLElement;
export declare function animatedScrollTo(element: HTMLElement | typeof window, to: number, duration?: number, callback?: (element: HTMLElement | typeof window) => void): void;
export declare function scrollIntoView(menuEl: HTMLElement, focusedEl: HTMLElement): void;
export declare function getBoundingClientObj(element: HTMLElement): {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
};
export interface RectType {
    left: number;
    right: number;
    bottom: number;
    height: number;
    width: number;
}
export declare function toKey(str: string): string;
export declare function isTouchCapable(): boolean;
export declare function isMobileDevice(): boolean;
export declare const supportsPassiveEvents: boolean;
export declare function notNullish<T>(item: T | null | undefined): item is T;
export declare function isArray<T>(arg: unknown): arg is readonly T[];
export declare function valueTernary<Option, IsMulti extends boolean>(isMulti: IsMulti | undefined, multiValue: MultiValue<Option>, singleValue: SingleValue<Option>): OnChangeValue<Option, IsMulti>;
export declare function singleValueAsValue<Option, IsMulti extends boolean>(singleValue: SingleValue<Option>): OnChangeValue<Option, IsMulti>;
export declare function multiValueAsValue<Option, IsMulti extends boolean>(multiValue: MultiValue<Option>): OnChangeValue<Option, IsMulti>;
export declare const removeProps: <Props extends object, K extends string[]>(propsObj: Props, ...properties: K) => Omit<Props, K[number]>;
