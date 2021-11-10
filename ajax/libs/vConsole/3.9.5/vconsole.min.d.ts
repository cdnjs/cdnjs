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
     * determines whether the passed value is a specific type
     * @param any value
     * @return boolean
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
    /**
     * Get the prototype name of an object
     */
    export function getPrototypeName(value: any): string;
    /**
     * check whether an object is plain (using {})
     * @param object obj
     * @return boolean
     */
    export function isPlainObject(obj: any): boolean;
    /**
     * HTML encode a string
     * @param string text
     * @return string
     */
    export function htmlEncode(text: string): string;
    /**
     * Change invisible characters to visible characters
     */
    export function invisibleTextEncode(text: string): string;
    /**
     * Simple JSON stringify, stringify top level key-value
     */
    export function SimpleJSONStringify(stringObject: any): string;
    /**
     * rewrite JSON.stringify, catch unknown exception
     */
    export function JSONStringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    export function getStringBytes(str: string): number;
    export function getBytesText(bytes: number): string;
    export function subString(str: string, len: number): string;
    export function circularReplacer(): (key: any, value: any) => any;
    /**
     * get an object's all keys ignore whether they are not enumerable
     */
    export function getObjAllKeys(obj: any): any[];
    /**
     * get an object's prototype name
     */
    export function getObjName(obj: any): string;
    /**
     * localStorage methods
     */
    export function setStorage(key: string, value: string): void;
    export function getStorage(key: string): string;
}
declare module "lib/mito" {
    /**
     * Mito.js
     * A simple template engine
     *
     * @author Maiz
     */
    export default class Mito {
        /**
         * Render `tpl` with `data` into a HTML string.
         */
        render<T extends true>(tpl: string, data: any, toString: T): string;
        /**
         * Render `tpl` with `data` into a HTML element.
         */
        render<T extends false>(tpl: string, data: any, toString?: T): Element;
    }
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
        /**
         * simply render a HTML template
         */
        render: {
            <T extends true>(tpl: string, data: any, toString: T): string;
            <T_1 extends false>(tpl: string, data: any, toString?: T_1): Element;
        };
    };
    /**
     * export
     */
    export default $;
}
declare module "lib/plugin" {
    type VConsolePluginEvent = (data?: any) => void;
    /**
     * vConsole Plugin Class
     */
    class VConsolePlugin {
        isReady: boolean;
        eventList: {
            [eventName: string]: VConsolePluginEvent;
        };
        protected _id: string;
        protected _name: string;
        protected _vConsole: any;
        constructor(...args: any[]);
        get id(): string;
        set id(value: string);
        get name(): string;
        set name(value: string);
        get vConsole(): any;
        set vConsole(value: any);
        /**
         * register an event
         * @public
         * @param string
         * @param function
         */
        on(eventName: string, callback: VConsolePluginEvent): this;
        /**
         * trigger an event
         */
        trigger(eventName: string, data?: any): this;
        protected getUniqueID(prefix?: string): string;
    }
    export default VConsolePlugin;
}
declare module "component/item_copy" {
    export default class VConsoleItemCopy {
        static html: string;
        /**
         * Delegate copy button `onClick` event on a perent element.
         */
        static delegate($el: Element, getCopyText: (id: string) => string): void;
        /**
         * Copy a text to clipboard
         */
        static copy(text: string): boolean;
    }
}
declare module "log/log" {
    import VConsolePlugin from "lib/plugin";
    type VConsoleLogArgs = any[];
    type VConsoleLogType = 'log' | 'info' | 'warn' | 'debug' | 'error';
    interface VConsoleLogItem {
        _id?: string;
        tabName?: 'default' | 'system';
        logType: VConsoleLogType;
        logs?: VConsoleLogArgs;
        content?: Element;
        noOrigin?: boolean;
        date?: number;
        style?: string;
        logClass?: string;
    }
    interface VConsoleLogView {
        _id: string;
        logType: VConsoleLogType;
        logText: string;
        hasContent: boolean;
        hasFold: boolean;
        count: number;
    }
    class VConsoleLogTab extends VConsolePlugin {
        tplTabbox: string;
        allowUnformattedLog: boolean;
        isReady: boolean;
        isShow: boolean;
        $tabbox: Element;
        console: {
            [method: string]: any;
        };
        logList: VConsoleLogItem[];
        cachedLogs: {
            [id: string]: string;
        };
        previousLog: VConsoleLogView;
        isInBottom: boolean;
        maxLogNumber: number;
        logNumber: number;
        constructor(...args: any[]);
        /**
         * when vConsole is ready,
         * this event will be triggered (after 'add' event)
         * @public
         */
        onInit(): void;
        /**
         * this event will make this plugin be registered as a tab
         * @public
         */
        onRenderTab(callback: Function): void;
        onAddTopBar(callback: Function): void;
        onAddTool(callback: Function): void;
        /**
         * after init
         * @public
         */
        onReady(): void;
        /**
         * before remove
         * @public
         */
        onRemove(): void;
        onShow(): void;
        onHide(): void;
        onShowConsole(): void;
        onUpdateOption(): void;
        updateMaxLogNumber(): void;
        limitMaxLogs(): void;
        showLogType(logType: string): void;
        autoScrollToBottom(): void;
        scrollToBottom(): void;
        /**
         * replace window.console with vConsole method
         */
        protected mockConsole(): void;
        clearLog(): void;
        beforeRenderLog($line: Element): void;
        /**
         * print log to origin console
         * @protected
         */
        printOriginLog(item: VConsoleLogItem): void;
        /**
         * print a log to log box
         */
        protected printLog(item: VConsoleLogItem): void;
        /**
         * Render the count of a repeated log
         */
        printRepeatLog(): void;
        /**
         * Render a new log
         */
        protected printNewLog(item: VConsoleLogItem, logs: VConsoleLogArgs): void;
        /**
         * generate the HTML element of a folded line
         */
        protected getFoldedLine(obj: any, outer?: string): Element;
    }
    export default VConsoleLogTab;
}
declare module "log/default" {
    import VConsoleLogTab from "log/log";
    class VConsoleDefaultTab extends VConsoleLogTab {
        private filterText;
        constructor(...args: any[]);
        onReady(): void;
        beforeRenderLog($line: Element): void;
        /**
         * replace window.console & window.onerror with vConsole method
         */
        protected mockConsole(): void;
        /**
         * Catch window.onerror
         */
        private catchWindowOnError;
        /**
         * Promise.reject has no rejection handler
         * about https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event
         */
        private catchUnhandledRejection;
        /**
         * Catch resource loading error: image, video, link, script
         */
        private catchResourceError;
        /**
         * Run a command
         */
        private evalCommand;
        private checkFilterInLine;
    }
    export default VConsoleDefaultTab;
}
declare module "log/system" {
    /**
     * vConsole System Tab
     */
    import VConsoleLogTab from "log/log";
    class VConsoleSystemTab extends VConsoleLogTab {
        constructor(...args: any[]);
        onInit(): void;
        printSystemInfo(): void;
    }
    export default VConsoleSystemTab;
}
declare module "network/network" {
    import VConsolePlugin from "lib/plugin";
    class VConsoleNetworkTab extends VConsolePlugin {
        private $tabbox;
        private $header;
        private reqList;
        private domList;
        private isShow;
        private isInBottom;
        private _xhrOpen;
        private _xhrSend;
        private _xhrSetRequestHeader;
        private _fetch;
        private _sendBeacon;
        constructor(...args: any[]);
        onRenderTab(callback: any): void;
        onAddTool(callback: any): void;
        onReady(): void;
        onRemove(): void;
        onShow(): void;
        onHide(): void;
        onShowConsole(): void;
        autoScrollToBottom(): void;
        scrollToBottom(): void;
        clearLog(): void;
        private renderHeader;
        /**
         * add or update a request item by request ID
         * @private
         */
        private updateRequest;
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
        private getFormattedBody;
        private getURL;
    }
    export default VConsoleNetworkTab;
}
declare module "element/node_view" {
    class NodeView {
        node: any;
        view: HTMLElement;
        constructor(node: any);
        get(): HTMLElement;
        _create(node: any, isRoot?: boolean): HTMLElement;
        _createTextNode(node: any, view: any): void;
        _createElementNode(node: any, view: any): void;
    }
    export default NodeView;
}
declare module "element/element" {
    import VConsolePlugin from "lib/plugin";
    class VConsoleElementsTab extends VConsolePlugin {
        isInited: boolean;
        node: {};
        $tabbox: Element;
        nodes: any[];
        activedElem: Element;
        observer: any;
        constructor(...args: any[]);
        onRenderTab(callback: any): void;
        onAddTool(callback: any): void;
        onShow(): void;
        onRemove(): void;
        onMutation(mutation: any): void;
        onChildRemove(mutation: any): void;
        onChildAdd(mutation: any): void;
        onAttributesChange(mutation: any): void;
        onCharacterDataChange(mutation: any): void;
        renderView(node: any, $related: any, renderMethod?: 'replace' | 'insertBefore'): HTMLElement;
        getNode(elem: any): any;
        _isIgnoredElement(elem: any): boolean;
        _isInVConsole(elem: any): boolean;
    }
    export default VConsoleElementsTab;
}
declare module "lib/sveltePlugin" {
    import VConsolePlugin from "lib/plugin";
    import { SvelteComponent } from 'svelte';
    export class VConsoleSveltePlugin<T extends {} = {}> extends VConsolePlugin {
        Comp: typeof SvelteComponent;
        comp?: SvelteComponent;
        initialProps: T;
        $dom: HTMLElement;
        constructor(id: string, name: string, Comp: typeof SvelteComponent, renderProps: T);
        onRenderTab(callback: any): void;
        onRemove(): void;
    }
    export default VConsoleSveltePlugin;
}
declare module "components/Storage/index" {
    export { default as StorageTab } from './Template.svelte';
}
declare module "storage/storage" {
    import VConsoleSveltePlugin from "lib/sveltePlugin";
    export default class VConsoleStorageTab extends VConsoleSveltePlugin {
        constructor(id: string, name: string, renderProps?: {
            propA: number;
        });
    }
}
declare module "core/core" {
    /**
     * vConsole core class
     */
    import * as tool from "lib/tool";
    import VConsolePlugin from "lib/plugin";
    import VConsoleLogPlugin from "log/log";
    import VConsoleDefaultPlugin from "log/default";
    import VConsoleSystemPlugin from "log/system";
    import VConsoleNetworkPlugin from "network/network";
    import VConsoleElementPlugin from "element/element";
    import VConsoleStoragePlugin from "storage/storage";
    interface VConsoleOptions {
        defaultPlugins?: ('system' | 'network' | 'element' | 'storage')[];
        maxLogNumber?: number;
        theme?: '' | 'dark' | 'light';
        disableLogScrolling?: boolean;
        onReady?: () => void;
        onClearLog?: () => void;
    }
    class VConsole {
        version: string;
        $dom: HTMLElement;
        isInited: boolean;
        option: VConsoleOptions;
        protected activedTab: string;
        protected tabList: any[];
        protected pluginList: {};
        protected switchPos: {
            hasMoved: boolean;
            x: number;
            y: number;
            startX: number;
            startY: number;
            endX: number;
            endY: number;
        };
        tool: typeof tool;
        $: {
            one: (selector: string, contextElement?: Element | Document) => HTMLElement;
            all: (selector: string, contextElement?: Element | Document) => HTMLElement[];
            addClass: ($el: Element | Element[], className: string) => void;
            removeClass: ($el: Element | Element[], className: string) => void;
            hasClass: ($el: Element, className: string) => boolean;
            bind: ($el: Element | Element[], eventType: any, fn: any, useCapture?: boolean) => void;
            delegate: ($el: Element, eventType: string, selector: string, fn: (event: Event, $target: HTMLElement) => void) => void;
            removeChildren($el: Element): Element;
            render: {
                <T extends true>(tpl: string, data: any, toString: T): string;
                <T_1 extends false>(tpl: string, data: any, toString?: T_1): Element;
            };
        };
        static VConsolePlugin: typeof VConsolePlugin;
        static VConsoleLogPlugin: typeof VConsoleLogPlugin;
        static VConsoleDefaultPlugin: typeof VConsoleDefaultPlugin;
        static VConsoleSystemPlugin: typeof VConsoleSystemPlugin;
        static VConsoleNetworkPlugin: typeof VConsoleNetworkPlugin;
        static VConsoleElementPlugin: typeof VConsoleElementPlugin;
        static VConsoleStoragePlugin: typeof VConsoleStoragePlugin;
        constructor(opt?: VConsoleOptions);
        /**
        * add built-in plugins
        * @private
        */
        private _addBuiltInPlugins;
        /**
        * render panel DOM
        * @private
        */
        private _render;
        /**
        * Update theme
        * @private
        */
        private _updateTheme;
        setSwitchPosition(switchX: number, switchY: number): void;
        /**
        * Get an safe [x, y] position for switch button
        * @private
        */
        private _getSwitchButtonSafeAreaXY;
        /**
        * simulate tap event by touchstart & touchend
        * @private
        */
        private _mockTap;
        /**
        * bind DOM events
        * @private
        */
        private _bindEvent;
        /**
        * auto run after initialization
        * @private
        */
        private _autoRun;
        /**
        * trigger a vConsole.option event
        */
        triggerEvent(eventName: string, param?: any): void;
        /**
        * init a plugin
        * @private
        */
        private _initPlugin;
        /**
        * trigger an event for each plugin
        * @private
        */
        private _triggerPluginsEvent;
        /**
        * trigger an event by plugin's name
        * @private
        */
        private _triggerPluginEvent;
        /**
        * add a new plugin
        * @public
        * @param object VConsolePlugin object
        * @return boolean
        */
        addPlugin(plugin: VConsolePlugin): boolean;
        /**
        * remove a plugin
        * @public
        * @param string pluginID
        * @return boolean
        */
        removePlugin(pluginID: string): boolean;
        /**
        * show console panel
        * @public
        */
        show(): void;
        /**
        * hide console panel
        * @public
        */
        hide(): void;
        /**
        * show switch button
        * @public
        */
        showSwitch(): void;
        /**
        * hide switch button
        */
        hideSwitch(): void;
        /**
        * show a tab
        * @public
        */
        showTab(tabID: string): void;
        /**
        * update option(s)
        * @public
        */
        setOption(keyOrObj: any, value?: any): void;
        /**
        * uninstall vConsole
        * @public
        */
        destroy(): void;
    }
    export default VConsole;
}
declare module "vconsole" {
    /**
     * A Front-End Console Panel for Mobile Webpage
     */
    import 'core-js/stable/symbol';
    import VConsole from "core/core";
    export { VConsole };
    export default VConsole;
}
declare module "components/Button/index" {
    export { default as Btn } from './Template.svelte';
}
declare module "lib/cookiesStorage" {
    import { CookieStorage as CookiesStorage } from 'cookie-storage';
    export const cookiesStorage: CookiesStorage;
}
declare module "components/Storage/utils" {
    interface IStorageItem {
        name: string;
        storage: Storage;
    }
    export const getAllStorages: () => IStorageItem[];
}
declare module "components/Tab/index" {
    export { default as Tabs } from './Tabs.svelte';
    export { default as TabList } from './TabList.svelte';
    export { default as TabPanel } from './TabPanel.svelte';
    export { default as Tab } from './Tab.svelte';
    export const TabsContext: {};
}
