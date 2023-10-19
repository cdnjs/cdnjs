import { ExtendedElement } from './diff';
import 'weakmap-polyfill';
import { VNode } from './vdom';
type Module = {
    default: string;
};
type CSSItem = Module | string;
type PropType = Object | Number | String | Boolean;
type PropTypes = {
    [key: string]: PropType | Array<PropType>;
};
export declare class Component extends HTMLElement {
    static is: string;
    static defaultProps: Record<string, unknown>;
    static propTypes: PropTypes;
    static css: CSSItem | CSSItem[];
    static isLightDOM: boolean;
    props: Record<string, unknown>;
    prevProps: Record<string, unknown> | null;
    elementId: number;
    isInstalled: boolean;
    store?: any;
    inject?: string[];
    injection?: {
        [key: string]: unknown;
    };
    renderRoot?: ExtendedElement | ShadowRoot | Component;
    rootElement: ExtendedElement | ExtendedElement[] | null;
    constructor();
    injectObject(): void;
    createRenderRoot(): ShadowRoot | Component;
    applyAdoptedStyleSheets(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    update(updateSelf?: boolean): void;
    updateProps(obj: Record<string, any>): void;
    updateSelf(): void;
    removeAttribute(key: string): void;
    setAttribute(key: string, val: string | object): void;
    nativeRemoveAttribute(key: string): void;
    nativeSetAttribute(key: string, val: string): void;
    attrsToProps(): void;
    fire(name: string, data: any): void;
    render(props: object, store?: undefined): VNode | undefined | null | void;
    beforeInstall(): void;
    install(): void;
    afterInstall(): void;
    installed(): void;
    uninstall(): void;
    beforeUpdate(): void;
    updated(): void;
    beforeRender(): void;
    rendered(): void;
    receiveProps(): void;
}
export {};
