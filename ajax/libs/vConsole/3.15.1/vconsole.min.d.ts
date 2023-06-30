/// <reference path="../build/vendor.d.ts" />

declare module "core/options.interface" {
    export interface VConsoleLogOptions {
        maxLogNumber?: number;
        showTimestamps?: boolean;
    }
    export interface VConsoleNetworkOptions {
        maxNetworkNumber?: number;
        ignoreUrlRegExp?: RegExp;
    }
    export type VConsoleAvailableStorage = 'cookies' | 'localStorage' | 'sessionStorage' | 'wxStorage';
    export interface VConsoleStorageOptions {
        defaultStorages?: VConsoleAvailableStorage[];
    }
    export interface VConsoleOptions {
        target?: string | HTMLElement;
        defaultPlugins?: ('system' | 'network' | 'element' | 'storage')[];
        theme?: '' | 'dark' | 'light';
        disableLogScrolling?: boolean;
        pluginOrder?: string[];
        onReady?: () => void;
        log?: VConsoleLogOptions;
        network?: VConsoleNetworkOptions;
        storage?: VConsoleStorageOptions;
        /**
         * @deprecated Since v3.12.0, use `log.maxLogNumber`.
         */
        maxLogNumber?: number;
        /**
         * @deprecated Since v3.12.0, use `network.maxNetworkNumber`.
         */
        maxNetworkNumber?: number;
        /**
         * @deprecated Since v3.12.0.
         */
        onClearLog?: () => void;
    }
}
declare module "lib/tool" {
    /**
     * Utility Functions
     */
    /**
     * get formatted date by timestamp
     */
    export function getDate(time: number): {
        time: number;
        year: number;
        month: string | number;
        day: string | number;
        hour: string | number;
        minute: string | number;
        second: string | number;
        millisecond: string | number;
    };
    /**
     * Determine whether a value is of a specific type.
     */
    export function isNumber(value: any): boolean;
    export function isBigInt(value: any): boolean;
    export function isString(value: any): boolean;
    export function isArray(value: any): boolean;
    export function isBoolean(value: any): boolean;
    export function isUndefined(value: any): boolean;
    export function isNull(value: any): boolean;
    export function isSymbol(value: any): boolean;
    export function isObject(value: any): boolean;
    export function isFunction(value: any): boolean;
    export function isElement(value: any): boolean;
    export function isWindow(value: any): boolean;
    export function isIterable(value: any): boolean;
    /**
     * Get the prototype name of an object
     */
    export function getPrototypeName(value: any): string;
    /**
     * Get an object's constructor name.
     */
    export function getObjName(obj: any): string;
    /**
     * check whether an object is plain (using {})
     * @param object obj
     * @return boolean
     */
    export function isPlainObject(obj: any): boolean;
    /**
     * Escape HTML to XSS-safe text.
     */
    export function htmlEncode(text: string | number): string;
    /**
     * Convert a text's invisible characters to visible characters.
     */
    export function getVisibleText(text: string): string;
    /**
     * A safe `JSON.stringify` method.
     */
    export function safeJSONStringify(obj: any, opt?: {
        maxDepth?: number;
        keyMaxLen?: number;
        pretty?: boolean;
        standardJSON?: boolean;
    }): string;
    /**
     * Call original `JSON.stringify` and catch unknown exceptions.
     */
    export function JSONStringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    /**
     * Get the bytes of a string.
     * @example 'a' = 1
     * @example '好' = 3
     */
    export function getStringBytes(str: string): number;
    /**
     * Convert bytes number to 'MB' or 'KB' string.
     */
    export function getBytesText(bytes: number): string;
    /**
     * Get a string within a limited max length.
     * The byte size of the string will be appended to the string when reached the limit.
     * @return 'some string...(3.1 MB)'
     */
    export function getStringWithinLength(str: string, maxLen: number): string;
    /**
     * Sore an `string[]` by string.
     */
    export function sortArray(arr: string[]): string[];
    /**
     * Get enumerable keys of an object or array.
     */
    export function getEnumerableKeys(obj: any): string[];
    /**
     * Get enumerable and non-enumerable keys of an object or array.
     */
    export function getEnumerableAndNonEnumerableKeys(obj: any): string[];
    /**
     * Get non-enumerable keys of an object or array.
     */
    export function getNonEnumerableKeys(obj: any): string[];
    export function getSymbolKeys(obj: any): symbol[];
    /**
     * localStorage methods
     */
    export function setStorage(key: string, value: string): void;
    export function getStorage(key: string): string;
    /**
     * Generate a 6-digit unique string with prefix `"__vc_" + ${prefix}`
     */
    export function getUniqueID(prefix?: string): string;
    /**
     * Determine whether it is inside a WeChat Miniprogram.
     */
    export function isWxEnv(): boolean;
    /**
     * Call a WeChat Miniprogram method. E.g: `wx.getStorageSync()`.
     */
    export function callWx(method: string, ...args: any[]): any;
}
declare module "lib/query" {
    const $: {
        /**
         * get single element
         * @public
         */
        one: (selector: string, contextElement?: Element | Document) => HTMLElement;
        /**
         * get multiple elements
         * @public
         */
        all: (selector: string, contextElement?: Element | Document) => HTMLElement[];
        /**
         * add className(s) to an or multiple element(s)
         * @public
         */
        addClass: ($el: Element | Element[], className: string) => void;
        /**
         * remove className(s) from an or multiple element(s)
         * @public
         */
        removeClass: ($el: Element | Element[], className: string) => void;
        /**
         * see whether an element contains a className
         * @public
         */
        hasClass: ($el: Element, className: string) => boolean;
        /**
         * bind an event to element(s)
         * @public
         */
        bind: ($el: Element | Element[], eventType: any, fn: any, useCapture?: boolean) => void;
        /**
         * delegate an event to a parent element
         * @public
         * @param  $el        parent element
         * @param  eventType  name of the event
         * @param  selector   target's selector
         * @param  fn         callback function
         */
        delegate: ($el: Element, eventType: string, selector: string, fn: (event: Event, $target: HTMLElement) => void) => void;
        /**
         * Remove all child elements of an element.
         */
        removeChildren($el: Element): Element;
    };
    /**
     * export
     */
    export default $;
}
declare module "lib/model" {
    type AConstructorTypeOf<T, U extends any[] = any[]> = new (...args: U) => T;
    export class VConsoleModel {
        static singleton: {
            [ctorName: string]: VConsoleModel;
        };
        protected _onDataUpdateCallbacks: Function[];
        /**
         * Get a singleton of a model.
         */
        static getSingleton<T extends VConsoleModel>(ctor: AConstructorTypeOf<T>, ctorName: string): T;
    }
    export default VConsoleModel;
}
declare module "lib/pluginExporter" {
    import type { VConsoleModel } from "lib/model";
    export class VConsolePluginExporter {
        protected model: VConsoleModel;
        protected pluginId: string;
        constructor(pluginId: string);
        destroy(): void;
    }
}
declare module "lib/plugin" {
    import { VConsolePluginExporter } from "lib/pluginExporter";
    import type { VConsole } from "core/core";
    export type IVConsolePluginEvent = (data?: any) => void;
    export type IVConsolePluginEventName = 'init' | 'renderTab' | 'addTopBar' | 'addTool' | 'ready' | 'remove' | 'updateOption' | 'showConsole' | 'hideConsole' | 'show' | 'hide';
    export interface IVConsoleTopbarOptions {
        name: string;
        className: string;
        actived?: boolean;
        data?: {
            [key: string]: string;
        };
        onClick?: (e: Event, data?: any) => any;
    }
    export interface IVConsoleToolbarOptions {
        name: string;
        global?: boolean;
        data?: {
            [key: string]: string;
        };
        onClick?: (e: Event, data?: any) => any;
    }
    export interface IVConsoleTabOptions {
        fixedHeight?: boolean;
    }
    /**
     * vConsole Plugin Base Class
     */
    export class VConsolePlugin {
        isReady: boolean;
        eventMap: Map<IVConsolePluginEventName, IVConsolePluginEvent>;
        exporter?: VConsolePluginExporter;
        protected _id: string;
        protected _name: string;
        protected _vConsole: VConsole;
        constructor(...args: any[]);
        get id(): string;
        set id(value: string);
        get name(): string;
        set name(value: string);
        get vConsole(): VConsole;
        set vConsole(value: VConsole);
        /**
         * Register an event
         * @public
         * @param IVConsolePluginEventName
         * @param IVConsolePluginEvent
         */
        on(eventName: IVConsolePluginEventName, callback: IVConsolePluginEvent): this;
        onRemove(): void;
        /**
         * Trigger an event.
         */
        trigger(eventName: IVConsolePluginEventName, data?: any): this;
        protected bindExporter(): void;
        protected unbindExporter(): void;
        protected getUniqueID(prefix?: string): string;
    }
    export default VConsolePlugin;
}
declare module "lib/sveltePlugin" {
    import VConsolePlugin from "lib/plugin";
    import { SvelteComponent } from "vendor/svelte";
    export class VConsoleSveltePlugin<T extends {} = {}> extends VConsolePlugin {
        CompClass: typeof SvelteComponent;
        compInstance?: SvelteComponent;
        initialProps: T;
        constructor(id: string, name: string, CompClass: typeof SvelteComponent, initialProps: T);
        onReady(): void;
        onRenderTab(callback: any): void;
        onRemove(): void;
    }
}
declare module "core/core.model" {
    export const contentStore: {
        subscribe: (this: void, run: import("vendor/svelte/store").Subscriber<{
            updateTime: number;
        }>, invalidate?: (value?: {
            updateTime: number;
        }) => void) => import("vendor/svelte/store").Unsubscriber;
        set: (this: void, value: {
            updateTime: number;
        }) => void;
        update: (this: void, updater: import("vendor/svelte/store").Updater<{
            updateTime: number;
        }>) => void;
        updateTime: () => void;
    };
}
declare module "log/logTool" {
    import type { IVConsoleLog, IVConsoleLogData } from "log/log.model";
    /**
     * Get a value's text content and its type.
     */
    export const getValueTextAndType: (val: any, wrapString?: boolean) => {
        text: any;
        valueType: string;
    };
    /**
     * A simple parser to get `[` or `]` information.
     */
    export const getLastIdentifier: (text: string) => {
        front: {
            text: string;
            pos: number;
            before: string;
            after: string;
        };
        back: {
            text: string;
            pos: number;
            before: string;
            after: string;
        };
    };
    export const isMatchedFilterText: (log: IVConsoleLog, filterText: string) => boolean;
    /**
     * Styling log output (`%c`), or string substitutions (`%s`, `%d`, `%o`).
     * Apply to the first log only.
     */
    export const getLogDatasWithFormatting: (origDatas: any[]) => IVConsoleLogData[];
    /**
     * An empty class for rendering views.
     */
    export class VConsoleUninvocatableObject {
    }
}
declare module "log/log.store" {
    import type { Writable } from "vendor/svelte/store";
    import type { IVConsoleLog } from "log/log.model";
    export interface IVConsoleLogStore {
        logList: IVConsoleLog[];
    }
    /**
     * Log Store Factory
     */
    export class VConsoleLogStore {
        static storeMap: {
            [pluginId: string]: Writable<IVConsoleLogStore>;
        };
        /**
         * Create a store.
         */
        static create(pluginId: string): Writable<IVConsoleLogStore>;
        /**
         * Delete a store.
         */
        static delete(pluginId: string): void;
        /**
         * Get a store by pluginId,
         */
        static get(pluginId: string): Writable<IVConsoleLogStore>;
        /**
         * Get a store's raw data.
         */
        static getRaw(pluginId: string): IVConsoleLogStore;
        /**
         * Get all stores.
         */
        static getAll(): {
            [pluginId: string]: Writable<IVConsoleLogStore>;
        };
    }
}
declare module "log/log.model" {
    import { VConsoleModel } from "lib/model";
    /**********************************
     * Interfaces
     **********************************/
    export type IConsoleLogMethod = 'log' | 'info' | 'debug' | 'warn' | 'error';
    export interface IVConsoleLogData {
        origData: any;
        style?: string;
    }
    export interface IVConsoleLog {
        _id: string;
        type: IConsoleLogMethod;
        cmdType?: 'input' | 'output';
        repeated: number;
        toggle: Record<string, boolean>;
        date: number;
        data: IVConsoleLogData[];
        groupLevel: number;
        groupLabel?: symbol;
        groupHeader?: 0 | 1 | 2;
        groupCollapsed?: boolean;
    }
    export type IVConsoleLogListMap = {
        [pluginId: string]: IVConsoleLog[];
    };
    export type IVConsoleLogFilter = {
        [pluginId: string]: string;
    };
    export interface IVConsoleAddLogOptions {
        noOrig?: boolean;
        cmdType?: 'input' | 'output';
    }
    /**********************************
     * Model
     **********************************/
    export class VConsoleLogModel extends VConsoleModel {
        readonly LOG_METHODS: IConsoleLogMethod[];
        ADDED_LOG_PLUGIN_ID: string[];
        maxLogNumber: number;
        protected logCounter: number;
        protected groupLevel: number;
        protected groupLabelCollapsedStack: {
            label: symbol;
            collapsed: boolean;
        }[];
        protected pluginPattern: RegExp;
        protected logQueue: IVConsoleLog[];
        protected flushLogScheduled: boolean;
        /**
         * The original `window.console` methods.
         */
        origConsole: {
            [method: string]: Function;
        };
        /**
         * Bind a Log plugin.
         * When binding first plugin, `window.console` will be hooked.
         */
        bindPlugin(pluginId: string): boolean;
        /**
         * Unbind a Log plugin.
         * When no binded plugin exists, hooked `window.console` will be recovered.
         */
        unbindPlugin(pluginId: string): boolean;
        /**
         * Hook `window.console` with vConsole log method.
         * Methods will be hooked only once.
         */
        mockConsole(): void;
        protected _mockConsoleLog(): void;
        protected _mockConsoleTime(): void;
        protected _mockConsoleGroup(): void;
        protected _mockConsoleClear(): void;
        /**
         * Recover `window.console`.
         */
        unmockConsole(): void;
        /**
         * Call origin `window.console[method](...args)`
         */
        callOriginalConsole(method: string, ...args: any[]): void;
        /**
         * Reset groups by `console.group()`.
         */
        resetGroup(): void;
        /**
         * Remove all logs.
         */
        clearLog(): void;
        /**
         * Remove a plugin's logs.
         */
        clearPluginLog(pluginId: string): void;
        /**
         * Add a vConsole log.
         */
        addLog(item?: {
            type: IConsoleLogMethod;
            origData: any[];
            isGroupHeader?: 0 | 1 | 2;
            isGroupCollapsed?: boolean;
        }, opt?: IVConsoleAddLogOptions): void;
        /**
         * Execute a JS command.
         */
        evalCommand(cmd: string): void;
        protected _signalLog(log: IVConsoleLog): void;
        protected _flushLogs(): void;
        protected _extractPluginIdByLog(log: IVConsoleLog): string;
        protected _isRepeatedLog(logList: IVConsoleLog[], log: IVConsoleLog): boolean;
        protected _updateLastLogRepeated(logList: IVConsoleLog[]): IVConsoleLog[];
        protected _limitLogListLength(logList: IVConsoleLog[]): IVConsoleLog[];
    }
}
declare module "log/log.exporter" {
    import { VConsolePluginExporter } from "lib/pluginExporter";
    import { VConsoleLogModel } from "log/log.model";
    import type { IConsoleLogMethod } from "log/log.model";
    export class VConsoleLogExporter extends VConsolePluginExporter {
        model: VConsoleLogModel;
        log(...args: any[]): void;
        info(...args: any[]): void;
        debug(...args: any[]): void;
        warn(...args: any[]): void;
        error(...args: any[]): void;
        clear(): void;
        protected addLog(method: IConsoleLogMethod, ...args: any[]): void;
    }
}
declare module "log/log" {
    import { VConsoleSveltePlugin } from "lib/sveltePlugin";
    import { VConsoleLogModel } from "log/log.model";
    /**
     * vConsole Log Plugin (base class).
     */
    export class VConsoleLogPlugin extends VConsoleSveltePlugin {
        model: VConsoleLogModel;
        isReady: boolean;
        isShow: boolean;
        isInBottom: boolean;
        constructor(id: string, name: string);
        onReady(): void;
        onRemove(): void;
        onAddTopBar(callback: Function): void;
        onAddTool(callback: Function): void;
        onUpdateOption(): void;
    }
    export default VConsoleLogPlugin;
}
declare module "log/default" {
    import { VConsoleLogPlugin } from "log/log";
    export class VConsoleDefaultPlugin extends VConsoleLogPlugin {
        protected onErrorHandler: any;
        protected resourceErrorHandler: any;
        protected rejectionHandler: any;
        onReady(): void;
        onRemove(): void;
        /**
         * Catch window errors.
         */
        protected bindErrors(): void;
        /**
         * Not catch window errors.
         */
        protected unbindErrors(): void;
        /**
         * Catch `window.onerror`.
         */
        protected catchWindowOnError(): void;
        /**
         * Catch resource loading error: image, video, link, script.
         */
        protected catchResourceError(): void;
        /**
         * Catch `Promise.reject`.
         * @reference https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event
         */
        private catchUnhandledRejection;
    }
    export default VConsoleDefaultPlugin;
}
declare module "log/system" {
    import { VConsoleLogPlugin } from "log/log";
    export class VConsoleSystemPlugin extends VConsoleLogPlugin {
        onReady(): void;
        printSystemInfo(): void;
    }
    export default VConsoleSystemPlugin;
}
declare module "network/helper" {
    import type { VConsoleNetworkRequestItem } from "network/requestItem";
    export type IOnUpdateCallback = (item: VConsoleNetworkRequestItem) => void;
    /**
     * Generate `getData` by url.
     */
    export const genGetDataByUrl: (url: string, getData?: {}) => {};
    /**
     * Generate formatted response data by responseType.
     */
    export const genResonseByResponseType: (responseType: string, response: any) => string;
    /**
     * Generate formatted response body by XMLHttpRequestBodyInit.
     */
    export const genFormattedBody: (body?: BodyInit) => string | {
        [key: string]: string;
    };
    /**
     * Get formatted URL object by string.
     */
    export const getURL: (urlString?: string) => URL;
}
declare module "network/requestItem" {
    export type VConsoleRequestMethod = '' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
    export class VConsoleNetworkRequestItem {
        id: string;
        name?: string;
        method: VConsoleRequestMethod;
        url: string;
        status: number | string;
        statusText?: string;
        cancelState?: 0 | 1 | 2 | 3;
        readyState?: XMLHttpRequest['readyState'];
        header: {
            [key: string]: string;
        };
        responseType: XMLHttpRequest['responseType'];
        requestType: 'xhr' | 'fetch' | 'ping' | 'custom';
        requestHeader: HeadersInit;
        response: any;
        responseSize: number;
        responseSizeText: string;
        startTime: number;
        startTimeText: string;
        endTime: number;
        costTime?: number;
        getData: {
            [key: string]: string;
        };
        postData: {
            [key: string]: string;
        } | string;
        actived: boolean;
        noVConsole?: boolean;
        constructor();
    }
    export class VConsoleNetworkRequestItemProxy extends VConsoleNetworkRequestItem {
        static Handler: {
            get(item: VConsoleNetworkRequestItemProxy, prop: string): any;
            set(item: VConsoleNetworkRequestItemProxy, prop: string, value: any): boolean;
        };
        protected _response?: any;
        constructor(item: VConsoleNetworkRequestItem);
    }
}
declare module "network/xhr.proxy" {
    import { VConsoleNetworkRequestItem } from "network/requestItem";
    import type { IOnUpdateCallback } from "network/helper";
    export class XHRProxyHandler<T extends XMLHttpRequest> implements ProxyHandler<T> {
        XMLReq: XMLHttpRequest;
        item: VConsoleNetworkRequestItem;
        protected onUpdateCallback: IOnUpdateCallback;
        constructor(XMLReq: XMLHttpRequest, onUpdateCallback: IOnUpdateCallback);
        get(target: T, key: string): any;
        set(target: T, key: string, value: any): boolean;
        onReadyStateChange(): void;
        onAbort(): void;
        onTimeout(): void;
        protected triggerUpdate(): void;
        protected getOpen(target: T): (...args: any[]) => any;
        protected getSend(target: T): (...args: any[]) => any;
        protected getSetRequestHeader(target: T): (...args: any[]) => any;
        protected setOnReadyStateChange(target: T, key: string, value: any): boolean;
        protected setOnAbort(target: T, key: string, value: any): boolean;
        protected setOnTimeout(target: T, key: string, value: any): boolean;
        /**
         * Update item's properties according to readyState.
         */
        protected updateItemByReadyState(): void;
    }
    export class XHRProxy {
        static origXMLHttpRequest: {
            new (): XMLHttpRequest;
            prototype: XMLHttpRequest;
            readonly DONE: number;
            readonly HEADERS_RECEIVED: number;
            readonly LOADING: number;
            readonly OPENED: number;
            readonly UNSENT: number;
        };
        static create(onUpdateCallback: IOnUpdateCallback): {
            new (): XMLHttpRequest;
            prototype: XMLHttpRequest;
            readonly DONE: number;
            readonly HEADERS_RECEIVED: number;
            readonly LOADING: number;
            readonly OPENED: number;
            readonly UNSENT: number;
        };
    }
}
declare module "network/fetch.proxy" {
    import { VConsoleNetworkRequestItem } from "network/requestItem";
    import type { IOnUpdateCallback } from "network/helper";
    export class ResponseProxyHandler<T extends Response> implements ProxyHandler<T> {
        resp: Response;
        item: VConsoleNetworkRequestItem;
        protected onUpdateCallback: IOnUpdateCallback;
        constructor(resp: T, item: VConsoleNetworkRequestItem, onUpdateCallback: IOnUpdateCallback);
        set(target: T, key: string, value: any): boolean;
        get(target: T, key: string): any;
        protected mockReader(): void;
    }
    export class FetchProxyHandler<T extends typeof fetch> implements ProxyHandler<T> {
        protected onUpdateCallback: IOnUpdateCallback;
        constructor(onUpdateCallback: IOnUpdateCallback);
        apply(target: T, thisArg: typeof window, argsList: any): Promise<Response>;
        protected beforeFetch(item: VConsoleNetworkRequestItem, input: RequestInfo, init?: RequestInit): void;
        protected afterFetch(item: any): (resp: Response) => Response;
        protected handleResponseBody(resp: Response, item: VConsoleNetworkRequestItem): Promise<ArrayBuffer> | Promise<string>;
    }
    export class FetchProxy {
        static origFetch: typeof fetch;
        static create(onUpdateCallback: IOnUpdateCallback): typeof fetch;
    }
}
declare module "network/beacon.proxy" {
    import type { IOnUpdateCallback } from "network/helper";
    export class BeaconProxyHandler<T extends typeof navigator.sendBeacon> implements ProxyHandler<T> {
        protected onUpdateCallback: IOnUpdateCallback;
        constructor(onUpdateCallback: IOnUpdateCallback);
        apply(target: T, thisArg: T, argsList: any[]): any;
    }
    export class BeaconProxy {
        static origSendBeacon: (url: string | URL, data?: BodyInit) => boolean;
        static create(onUpdateCallback: IOnUpdateCallback): any;
    }
}
declare module "network/network.model" {
    import { VConsoleModel } from "lib/model";
    import { VConsoleNetworkRequestItem } from "network/requestItem";
    /**
     * Network Store
     */
    export const requestList: import("vendor/svelte/store").Writable<{
        [id: string]: VConsoleNetworkRequestItem;
    }>;
    /**
     * Network Model
     */
    export class VConsoleNetworkModel extends VConsoleModel {
        maxNetworkNumber: number;
        ignoreUrlRegExp: RegExp;
        protected itemCounter: number;
        constructor();
        unMock(): void;
        clearLog(): void;
        /**
         * Add or update a request item by request ID.
         */
        updateRequest(id: string, data: VConsoleNetworkRequestItem): void;
        /**
         * mock XMLHttpRequest
         * @private
         */
        private mockXHR;
        /**
         * mock fetch request
         * @private
         */
        private mockFetch;
        /**
         * mock navigator.sendBeacon
         * @private
         */
        private mockSendBeacon;
        protected limitListLength(): void;
    }
    export default VConsoleNetworkModel;
}
declare module "network/network.exporter" {
    import { VConsolePluginExporter } from "lib/pluginExporter";
    import { VConsoleNetworkModel } from "network/network.model";
    import { VConsoleNetworkRequestItem, VConsoleNetworkRequestItemProxy } from "network/requestItem";
    export class VConsoleNetworkExporter extends VConsolePluginExporter {
        model: VConsoleNetworkModel;
        add(item: VConsoleNetworkRequestItem): VConsoleNetworkRequestItemProxy;
        update(id: string, item: VConsoleNetworkRequestItem): void;
        clear(): void;
    }
}
declare module "network/network" {
    import { VConsoleSveltePlugin } from "lib/sveltePlugin";
    import { VConsoleNetworkModel } from "network/network.model";
    import { VConsoleNetworkExporter } from "network/network.exporter";
    export class VConsoleNetworkPlugin extends VConsoleSveltePlugin {
        model: VConsoleNetworkModel;
        exporter: VConsoleNetworkExporter;
        constructor(id: string, name: string, renderProps?: {});
        onReady(): void;
        onAddTool(callback: any): void;
        onRemove(): void;
        onUpdateOption(): void;
    }
}
declare module "element/element.model" {
    export interface IVConsoleNode {
        nodeType: typeof Node.prototype.nodeType;
        nodeName: typeof Node.prototype.nodeName;
        textContent: typeof Node.prototype.textContent;
        id: typeof Element.prototype.id;
        className: typeof Element.prototype.className;
        attributes: {
            [name: string]: string;
        }[];
        childNodes: IVConsoleNode[];
        _isExpand?: boolean;
        _isActived?: boolean;
        _isSingleLine?: boolean;
        _isNullEndTag?: boolean;
    }
    /**
     * Element Store
     */
    export const rootNode: import("vendor/svelte/store").Writable<IVConsoleNode>;
    export const activedNode: import("vendor/svelte/store").Writable<IVConsoleNode>;
}
declare module "element/element" {
    import MutationObserver from "vendor/mutation-observer";
    import { VConsoleSveltePlugin } from "lib/sveltePlugin";
    import type { IVConsoleNode } from "element/element.model";
    /**
     * vConsole Element Panel
     */
    export class VConsoleElementPlugin extends VConsoleSveltePlugin {
        protected isInited: boolean;
        protected observer: MutationObserver;
        protected nodeMap: WeakMap<Node, IVConsoleNode>;
        constructor(id: string, name: string, renderProps?: {});
        onShow(): void;
        onRemove(): void;
        onAddTool(callback: any): void;
        protected _init(): void;
        protected _handleMutation(mutation: MutationRecord): void;
        protected _onChildRemove(mutation: MutationRecord): void;
        protected _onChildAdd(mutation: MutationRecord): void;
        protected _onAttributesChange(mutation: MutationRecord): void;
        protected _onCharacterDataChange(mutation: MutationRecord): void;
        /**
         * Generate an VNode for rendering views. VNode will be updated if existing.
         * VNode will be stored in a WeakMap.
         */
        protected _generateVNode(elem: Node): IVConsoleNode;
        protected _updateVNodeAttributes(elem: Node): void;
        /**
         * Expand the actived node.
         * If the node is collapsed, expand it.
         * If the node is expanded, expand it's child nodes.
         */
        protected _expandActivedNode(): void;
        /**
         * Collapse the actived node.
         * If the node is expanded, and has expanded child nodes, collapse it's child nodes.
         * If the node is expanded, and has no expanded child node, collapse it self.
         * If the node is collapsed, do nothing.
         */
        protected _collapseActivedNode(): void;
        protected _isIgnoredNode(elem: Node): boolean;
        protected _isInVConsole(elem: Element): boolean;
        protected _refreshStore(): void;
    }
}
declare module "storage/storage.cookie" {
    import type { IStorage } from "storage/storage.model";
    export interface CookieOptions {
        path?: string | null;
        domain?: string | null;
        expires?: Date | null;
        secure?: boolean;
        sameSite?: 'Strict' | 'Lax' | 'None';
    }
    export class CookieStorage implements IStorage {
        get length(): number;
        /**
         * Returns sorted keys.
         */
        get keys(): string[];
        key(index: number): string;
        setItem(key: string, data: string, cookieOptions?: CookieOptions): void;
        getItem(key: string): string;
        removeItem(key: string, cookieOptions?: CookieOptions): void;
        clear(): void;
    }
}
declare module "storage/storage.wx" {
    import type { IStorage } from "storage/storage.model";
    export class WxStorage implements IStorage {
        keys: string[];
        currentSize: number;
        limitSize: number;
        get length(): number;
        key(index: number): string;
        /**
         * Prepare for async data.
         */
        prepare(): Promise<boolean>;
        getItem(key: string): Promise<string>;
        setItem(key: string, data: any): Promise<void>;
        removeItem(key: string): Promise<void>;
        clear(): Promise<void>;
    }
}
declare module "storage/storage.model" {
    import type { VConsoleAvailableStorage } from "core/options.interface";
    import { VConsoleModel } from "lib/model";
    export interface IStorage {
        length: number;
        key: (index: number) => string | null;
        getItem: (key: string) => string | null | Promise<string | null>;
        setItem: (key: string, data: any) => void | Promise<void>;
        removeItem: (key: string) => void | Promise<void>;
        clear: () => void | Promise<void>;
        prepare?: () => Promise<boolean>;
    }
    /**
     * Storage Store
     */
    export const storageStore: {
        updateTime: import("vendor/svelte/store").Writable<number>;
        activedName: import("vendor/svelte/store").Writable<VConsoleAvailableStorage>;
        defaultStorages: import("vendor/svelte/store").Writable<VConsoleAvailableStorage[]>;
    };
    export class VConsoleStorageModel extends VConsoleModel {
        protected storage: Map<VConsoleAvailableStorage, IStorage>;
        constructor();
        get activedStorage(): IStorage;
        getItem(key: string): Promise<string>;
        setItem(key: string, data: any): Promise<void>;
        removeItem(key: string): Promise<void>;
        clear(): Promise<void>;
        refresh(): void;
        /**
         * Get key-value data.
         */
        getEntries(): Promise<[string, string][]>;
        updateEnabledStorages(): void;
        protected promisify<T extends string | void>(ret: T | Promise<T>): T | Promise<T>;
        protected deleteStorage(key: VConsoleAvailableStorage): void;
    }
}
declare module "storage/storage" {
    import { VConsoleSveltePlugin } from "lib/sveltePlugin";
    import { VConsoleStorageModel } from "storage/storage.model";
    export class VConsoleStoragePlugin extends VConsoleSveltePlugin {
        protected model: VConsoleStorageModel;
        protected onAddTopBarCallback: Function;
        constructor(id: string, name: string, renderProps?: {});
        onReady(): void;
        onShow(): void;
        onAddTopBar(callback: Function): void;
        onAddTool(callback: Function): void;
        onUpdateOption(): void;
        protected updateTopBar(): void;
    }
}
declare module "core/core" {
    /**
     * vConsole core class
     */
    import type { SvelteComponent } from "vendor/svelte";
    import type { VConsoleOptions } from "core/options.interface";
    import { VConsolePlugin } from "lib/plugin";
    import { VConsoleLogPlugin } from "log/log";
    import { VConsoleDefaultPlugin } from "log/default";
    import { VConsoleSystemPlugin } from "log/system";
    import { VConsoleNetworkPlugin } from "network/network";
    import { VConsoleElementPlugin } from "element/element";
    import { VConsoleStoragePlugin } from "storage/storage";
    import { VConsoleLogExporter } from "log/log.exporter";
    import { VConsoleNetworkExporter } from "network/network.exporter";
    export class VConsole {
        version: string;
        isInited: boolean;
        option: VConsoleOptions;
        protected compInstance: SvelteComponent;
        protected pluginList: {
            [id: string]: VConsolePlugin;
        };
        log: VConsoleLogExporter;
        system: VConsoleLogExporter;
        network: VConsoleNetworkExporter;
        static VConsolePlugin: typeof VConsolePlugin;
        static VConsoleLogPlugin: typeof VConsoleLogPlugin;
        static VConsoleDefaultPlugin: typeof VConsoleDefaultPlugin;
        static VConsoleSystemPlugin: typeof VConsoleSystemPlugin;
        static VConsoleNetworkPlugin: typeof VConsoleNetworkPlugin;
        static VConsoleElementPlugin: typeof VConsoleElementPlugin;
        static VConsoleStoragePlugin: typeof VConsoleStoragePlugin;
        constructor(opt?: VConsoleOptions);
        /**
         * Get singleton instance.
         **/
        static get instance(): VConsole | undefined;
        /**
         * Set singleton instance.
         **/
        static set instance(value: VConsole | undefined);
        /**
         * Add built-in plugins.
         */
        private _addBuiltInPlugins;
        /**
         * Init svelte component.
         */
        private _initComponent;
        private _updateComponentByOptions;
        /**
         * Update the position of Switch button.
         */
        setSwitchPosition(x: number, y: number): void;
        /**
         * Auto run after initialization.
         * @private
         */
        private _autoRun;
        private _showFirstPluginWhenEmpty;
        /**
         * Trigger a `vConsole.option` event.
         */
        triggerEvent(eventName: string, param?: any): void;
        /**
         * Init a plugin.
         */
        private _initPlugin;
        /**
         * Trigger an event for each plugin.
         */
        private _triggerPluginsEvent;
        /**
         * Trigger an event by plugin's id.
         * @private
         */
        private _triggerPluginEvent;
        /**
         * Sorting plugin list by option `pluginOrder`.
         * Plugin not listed in `pluginOrder` will be put last.
         */
        private _reorderPluginList;
        /**
         * Add a new plugin.
         */
        addPlugin(plugin: VConsolePlugin): boolean;
        /**
         * Remove a plugin.
         */
        removePlugin(pluginID: string): boolean;
        /**
         * Show console panel.
         */
        show(): void;
        /**
         * Hide console panel.
         */
        hide(): void;
        /**
         * Show switch button
         */
        showSwitch(): void;
        /**
         * Hide switch button.
         */
        hideSwitch(): void;
        /**
         * Show a plugin panel.
         */
        showPlugin(pluginId: string): void;
        /**
         * Update option(s).
         * @example `setOption('log.maxLogNumber', 20)`: set 'maxLogNumber' field only.
         * @example `setOption({ log: { maxLogNumber: 20 }})`: overwrite 'log' object.
         */
        setOption(keyOrObj: any, value?: any): void;
        /**
         * Remove vConsole.
         */
        destroy(): void;
    }
}
declare module "vconsole" {
    /**
     * A Front-End Console Panel for Mobile Webpage
     */
    import "vendor/core-js/stable/symbol";
    import 'core-js/stable/promise';
    import { VConsole } from "core/core";
    export default VConsole;
}
declare module "component/recycleScroller/recycleManager" {
    const createRecycleManager: () => (itemCount: number, start: number, end: number) => {
        key: number;
        index: number;
        show: boolean;
    }[];
    export default createRecycleManager;
}
declare module "component/recycleScroller/resizeObserver" {
    /**
     * A ResizeObserver polyfill.
     * ResizeObserver is not support in iOS 13.3
     */
    class EmptyResizeObserver {
        constructor(callback: (entries: any[], observer?: EmptyResizeObserver) => void);
        disconnect(): void;
        observe(target: Element | SVGElement, options?: any): void;
        unobserve(target: Element | SVGElement): void;
    }
    export const hasResizeObserver: () => boolean;
    export const useResizeObserver: () => {
        new (callback: ResizeObserverCallback): ResizeObserver;
        prototype: ResizeObserver;
    } | typeof EmptyResizeObserver;
}
declare module "component/recycleScroller/scroll/friction" {
    /** *
     * Friction physics simulation. Friction is actually just a simple
     * power curve; the only trick is taking the natural log of the
     * initial drag so that we can express the answer in terms of time.
     */
    class Friction {
        private _drag;
        private _dragLog;
        private _x;
        private _v;
        private _startTime;
        constructor(drag: number);
        set(x: number, v: number, t?: number): void;
        x(t: number): number;
        dx(t: number): number;
        done(t: number): boolean;
    }
    export default Friction;
}
declare module "component/recycleScroller/scroll/linear" {
    class Linear {
        private _x;
        private _endX;
        private _v;
        private _startTime;
        private _endTime;
        set(x: number, endX: number, dt: number, t?: number): void;
        x(t: number): number;
        dx(t: number): number;
        done(t: number): boolean;
    }
    export default Linear;
}
declare module "component/recycleScroller/scroll/spring" {
    class Spring {
        private _solver;
        private _solution;
        private _endPosition;
        private _startTime;
        constructor(mass: number, springConstant: number, damping: number);
        x(t: number): number;
        dx(t: number): number;
        set(endPosition: number, x: number, velocity: number, t?: number): void;
        done(t: number): boolean;
    }
    export default Spring;
}
declare module "component/recycleScroller/scroll/scroll" {
    /** *
     * Scroll combines Friction and Spring to provide the
     * classic "flick-with-bounce" behavior.
     */
    class Scroll {
        private _enableSpring;
        private _getExtend;
        private _friction;
        private _spring;
        private _toEdge;
        constructor(getExtend: () => number, _enableSpring: boolean);
        set(x: number, v: number, t?: number): void;
        x(t: number): number;
        dx(t: number): number;
        done(t: number): boolean;
    }
    export default Scroll;
}
declare module "component/recycleScroller/scroll/touchTracker" {
    export interface TrackerHandler {
        onTouchStart(): void;
        onTouchMove(x: number, y: number): void;
        onTouchEnd(x: number, y: number, velocityX: number, velocityY: number): void;
        onTouchCancel(): void;
        onWheel(x: number, y: number): void;
    }
    class TouchTracker {
        private _handler;
        private _touchId;
        private _startX;
        private _startY;
        private _historyX;
        private _historyY;
        private _historyTime;
        private _wheelDeltaX;
        private _wheelDeltaY;
        constructor(_handler: TrackerHandler);
        private _getTouchDelta;
        private _onTouchMove;
        private _onWheel;
        handleTouchStart: (e: TouchEvent) => void;
        handleTouchMove: (e: TouchEvent) => void;
        handleTouchEnd: (e: TouchEvent) => void;
        handleTouchCancel: (e: TouchEvent) => void;
        handleWheel: (e: WheelEvent) => void;
    }
    export default TouchTracker;
}
declare module "component/recycleScroller/scroll/scrollHandler" {
    import { TrackerHandler } from "component/recycleScroller/scroll/touchTracker";
    class ScrollHandler implements TrackerHandler {
        private _updatePosition;
        private _scrollModel;
        private _linearModel;
        private _startPosition;
        private _position;
        private _animate;
        private _getExtent;
        constructor(getExtent: () => number, _updatePosition: (pos: number) => void);
        onTouchStart(): void;
        onTouchMove(dx: number, dy: number): void;
        onTouchEnd(dx: number, dy: number, velocityX: number, velocityY: number): void;
        onTouchCancel(): void;
        onWheel(x: number, y: number): void;
        getPosition(): number;
        updatePosition(position: number): void;
        scrollTo(position: number, duration?: number): void;
    }
    export default ScrollHandler;
}
