declare const HOOK_BEFORE_CREATE = "beforeCreate";
declare const HOOK_AFTER_CREATE = "afterCreate";
declare const HOOK_BEFORE_RENDER = "beforeRender";
declare const HOOK_AFTER_RENDER = "afterRender";
declare const HOOK_BEFORE_MOUNT = "beforeMount";
declare const HOOK_AFTER_MOUNT = "afterMount";
declare const HOOK_BEFORE_UPDATE = "beforeUpdate";
declare const HOOK_AFTER_UPDATE = "afterUpdate";
declare const HOOK_BEFORE_DESTROY = "beforeDestroy";
declare const HOOK_AFTER_DESTROY = "afterDestroy";
declare const HOOK_BEFORE_PROPS_UPDATE = "beforePropsUpdate";
/**
 * Yox 事件系统的事件类型
 */
export interface CustomEventInterface {
	type: string;
	phase: number;
	ns?: string;
	target?: YoxInterface;
	originalEvent?: CustomEventInterface | Event;
	isPrevented?: true;
	isStoped?: true;
	/**
	 * 阻止事件的默认行为
	 */
	preventDefault(): this;
	/**
	 * 停止事件广播
	 */
	stopPropagation(): this;
	prevent(): this;
	stop(): this;
}
/**
 * Yox 接口类型
 */
export interface YoxInterface {
	$options: ComponentOptions;
	$el?: HTMLElement;
	$vnode?: VNode;
	$model?: string;
	$root?: YoxInterface;
	$parent?: YoxInterface;
	$context?: YoxInterface;
	$children?: YoxInterface[];
	$refs?: Record<string, YoxInterface | HTMLElement>;
	get(keypath: string, defaultValue?: any): any;
	set(keypath: string | Data, value?: any): void;
	on(type: string | Record<string, ThisListener<this> | ThisListenerOptions> | ThisTypeListenerOptions[], listener?: ThisListener<this> | ThisListenerOptions): this;
	once(type: string | Record<string, ThisListener<this> | ThisListenerOptions> | ThisTypeListenerOptions[], listener?: ThisListener<this> | ThisListenerOptions): this;
	off(type?: string, listener?: ThisListener<this> | ThisListenerOptions): this;
	fire(type: string | EmitterEvent | CustomEventInterface, data?: Data | boolean, downward?: boolean): boolean;
	watch(keypath: string | Record<string, ThisWatcher<this> | ThisWatcherOptions<this>>, watcher?: ThisWatcher<this> | ThisWatcherOptions<this>, immediate?: boolean): this;
	unwatch(keypath?: string, watcher?: ThisWatcher<this>): this;
	loadComponent(name: string, callback: ComponentCallback): void;
	createComponent(options: ComponentOptions, vnode: VNode): YoxInterface;
	directive(name: string | Record<string, DirectiveHooks>, directive?: DirectiveHooks): DirectiveHooks | void;
	transition(name: string | Record<string, TransitionHooks>, transition?: TransitionHooks): TransitionHooks | void;
	component(name: string | Record<string, Component>, component?: Component): Component | void;
	partial(name: string | Record<string, Partial>, partial?: Partial): Function | void;
	filter(name: string | Record<string, Filter>, filter?: Filter): Filter | void;
	checkProp(key: string, value: any): void;
	renderSlots(props: Data, slots: Slots): void;
	forceUpdate(props?: Data): void;
	destroy(): void;
	nextTick(task: ThisTask<this>): void;
	toggle(keypath: string): boolean;
	increase(keypath: string, step?: number, max?: number): number | void;
	decrease(keypath: string, step?: number, min?: number): number | void;
	insert(keypath: string, item: any, index: number | boolean): true | void;
	append(keypath: string, item: any): true | void;
	prepend(keypath: string, item: any): true | void;
	removeAt(keypath: string, index: number): true | void;
	remove(keypath: string, item: any): true | void;
	copy<T>(data: T, deep?: boolean): T;
}
export interface DirectiveHooks {
	once?: true;
	bind: (node: HTMLElement | YoxInterface, directive: Directive, vnode: VNode) => void;
	unbind?: (node: HTMLElement | YoxInterface, directive: Directive, vnode: VNode) => void;
}
export interface SpecialEventHooks {
	on: (node: HTMLElement | Window | Document, listener: NativeListener) => void;
	off: (node: HTMLElement | Window | Document, listener: NativeListener) => void;
}
export interface TransitionHooks {
	enter?: (node: HTMLElement) => void;
	leave?: (node: HTMLElement, done: () => void) => void;
}
export interface DomApi {
	getBodyElement(): Element;
	createElement(tag: string, isSvg?: boolean): Element;
	createText(text: string): Text;
	createComment(text: string): Comment;
	getAttr(node: HTMLElement, name: string): string | void;
	setAttr(node: HTMLElement, name: string, value: string): void;
	removeAttr(node: HTMLElement, name: string): void;
	setStyle(style: CSSStyleDeclaration, name: string, value: string | number | void): void;
	removeStyle(style: CSSStyleDeclaration, name: string): void;
	before(parentNode: Node, node: Node, beforeNode: Node): void;
	append(parentNode: Node, node: Node): void;
	replace(parentNode: Node, node: Node, oldNode: Node): void;
	remove(parentNode: Node, node: Node): void;
	parent(node: Node): Node | void;
	next(node: Node): Node | void;
	find(selector: string): Element | void;
	tag(node: Node): string | void;
	getText(node: Node): string | void;
	setText(node: Node, text: string, isStyle?: boolean, isOption?: boolean): void;
	getHtml(node: Element): string | void;
	setHtml(node: Element, html: string, isStyle?: boolean, isOption?: boolean): void;
	addClass(node: HTMLElement, className: string): void;
	removeClass(node: HTMLElement, className: string): void;
	on(node: HTMLElement | Window | Document, type: string, listener: Listener): void;
	off(node: HTMLElement | Window | Document, type: string, listener: Function): void;
	addSpecialEvent(type: string, hooks: SpecialEventHooks): void;
}
export interface ArrayApi {
	each<T>(array: T[], callback: (item: T, index: number) => boolean | void, reversed?: boolean): void;
	push<T>(array: T[], target: T | T[]): void;
	unshift<T>(array: T[], target: T | T[]): void;
	indexOf<T>(array: T[], target: T, strict?: boolean): number;
	last<T>(array: T[]): T | void;
	pop<T>(array: T[]): T | void;
	remove<T>(array: T[], target: T, strict?: boolean): number;
	has<T>(array: T[], target: T, strict?: boolean): boolean;
	toArray<T>(array: T[] | ArrayLike<T>): T[];
	toObject(array: any[], key?: string | null, value?: any): object;
	join(array: string[], separator: string): string;
	falsy(array: any): boolean;
}
export interface IsApi {
	func(value: any): boolean;
	array(value: any): boolean;
	object(value: any): boolean;
	string(value: any): boolean;
	number(value: any): boolean;
	boolean(value: any): boolean;
	numeric(value: any): boolean;
}
export interface LoggerApi {
	DEBUG: number;
	INFO: number;
	WARN: number;
	ERROR: number;
	FATAL: number;
	debug(msg: string, tag?: string): void;
	info(msg: string, tag?: string): void;
	warn(msg: string, tag?: string): void;
	error(msg: string, tag?: string): void;
	fatal(msg: string, tag?: string): void;
}
export interface ObjectApi {
	keys(object: Data): string[];
	each(object: Data, callback: (value: any, key: string) => boolean | void): void;
	extend(original: Data, object: Data): Data;
	merge(object1: Data | void, object2: Data | void): Data | void;
	copy(object: any, deep?: boolean): any;
	get(object: any, keypath: string): ValueHolder | undefined;
	set(object: Data, keypath: string, value: any, autofill?: boolean): void;
	has(object: Data, key: string | number): boolean;
	falsy(object: any): boolean;
}
export interface StringApi {
	camelize(str: string): string;
	hyphenate(str: string): string;
	capitalize(str: string): string;
	trim(str: any): string;
	slice(str: string, start: number, end?: number): string;
	indexOf(str: string, part: string, start?: number): number;
	lastIndexOf(str: string, part: string, end?: number): number;
	startsWith(str: string, part: string): boolean;
	endsWith(str: string, part: string): boolean;
	charAt(str: string, index?: number): string;
	codeAt(str: string, index?: number): number;
	upper(str: string): string;
	lower(str: string): string;
	has(str: string, part: string): boolean;
	falsy(str: any): boolean;
}
export declare type EventArgs = (event: CustomEventInterface, data?: Data) => any[];
export declare type DirectiveArgs = () => any;
export interface EventRuntime {
	execute: EventArgs;
}
export interface DirectiveRuntime {
	execute: DirectiveArgs;
}
export interface Directive {
	key: string;
	name: string;
	ns: string;
	runtime: DirectiveRuntime | void;
	readonly modifier: string | void;
	readonly value?: string | number | boolean;
	readonly getter?: () => any | void;
	readonly handler?: () => void | void;
	readonly hooks: DirectiveHooks;
}
export interface EventValue {
	key: string;
	name: string;
	value: string;
	runtime: EventRuntime | void;
	readonly ns: string | void;
	readonly isNative?: boolean;
	readonly listener: Listener;
}
export interface ModelValue {
	keypath: string;
	value: any;
}
export declare type Slots = Record<string, (parent: YoxInterface) => VNode[] | void>;
export interface VNodeOperator {
	create(api: DomApi, vnode: VNode): void;
	update(api: DomApi, vnode: VNode, oldVNode: VNode): void;
	destroy(api: DomApi, vnode: VNode): void;
	insert(api: DomApi, parentNode: Node, vnode: VNode, before?: VNode): void;
	remove(api: DomApi, vnode: VNode): void;
	enter(vnode: VNode): void;
	leave(vnode: VNode, done: Function): void;
}
export interface VNode {
	type: number;
	data?: Data;
	node?: Node;
	parentNode?: Node;
	target?: Node;
	shadow?: VNode;
	parent?: YoxInterface;
	component?: YoxInterface;
	readonly context: YoxInterface;
	readonly operator: VNodeOperator;
	readonly tag?: string;
	readonly isComponent?: boolean;
	readonly isComment?: boolean;
	readonly isFragment?: boolean;
	readonly isPortal?: boolean;
	readonly isSlot?: boolean;
	readonly isSvg?: boolean;
	readonly isStyle?: boolean;
	readonly isOption?: boolean;
	readonly isStatic?: boolean;
	readonly isPure?: boolean;
	readonly slots?: Slots;
	readonly props?: Data;
	readonly nativeAttrs?: Record<string, string>;
	readonly nativeStyles?: Data;
	readonly directives?: Record<string, Directive>;
	readonly events?: Record<string, EventValue>;
	readonly lazy?: Record<string, LazyValue>;
	readonly transition?: TransitionHooks;
	readonly model?: ModelValue;
	readonly to?: string;
	readonly ref?: string;
	readonly key?: string;
	readonly text?: string;
	readonly html?: string;
	readonly children?: VNode[];
}
export interface ComputedOptions {
	get: ComputedGetter;
	set?: ComputedSetter;
	cache?: boolean;
	sync?: boolean;
	deps?: string[];
}
export interface WatcherOptions {
	watcher: Watcher;
	immediate?: boolean;
	sync?: boolean;
	once?: boolean;
}
export interface ThisWatcherOptions<This = any> {
	watcher: ThisWatcher<This>;
	immediate?: boolean;
	sync?: boolean;
	once?: boolean;
}
export interface ListenerOptions {
	listener: Listener;
	ns: string;
}
export interface ThisListenerOptions<This = any> {
	listener: ThisListener<This>;
	ns: string;
}
export interface TypeListenerOptions {
	type: string;
	listener: Listener;
	ns: string;
}
export interface ThisTypeListenerOptions<This = any> {
	type: string;
	listener: ThisListener<This>;
	ns: string;
}
export interface EmitterEvent {
	type: string;
	ns?: string;
}
export interface EmitterFilter {
	type?: string;
	ns?: string;
	listener?: Function;
}
export interface EmitterOptions {
	ns?: string;
	num?: number;
	max?: number;
	count?: number;
	ctx?: any;
	listener: Function;
}
export declare type DataGenerator<T> = (options: ComponentOptions<T>) => Data;
export declare type Accessors<T, V> = {
	[K in keyof T]: V;
};
export declare type ComponentOptionsHook = () => void;
export interface ComponentOptions<Computed = any, Watchers = any, Events = any, Methods = any> {
	name?: string;
	propTypes?: Record<string, PropRule>;
	el?: string | Node;
	data?: Data | DataGenerator<YoxInterface>;
	template?: string | Function;
	model?: string;
	props?: Data;
	root?: YoxInterface;
	parent?: YoxInterface;
	context?: YoxInterface;
	replace?: true;
	vnode?: VNode;
	slots?: Slots;
	computed?: Accessors<Computed, ComputedGetter | ComputedOptions>;
	watchers?: Accessors<Watchers, Watcher | WatcherOptions>;
	events?: Accessors<Events, Listener | ListenerOptions> | TypeListenerOptions[];
	methods?: Methods;
	transitions?: Record<string, TransitionHooks>;
	components?: Record<string, ComponentOptions>;
	directives?: Record<string, DirectiveHooks>;
	partials?: Record<string, string>;
	filters?: Record<string, Filter>;
	extensions?: Data;
	[HOOK_BEFORE_CREATE]?: (options: ComponentOptions) => void;
	[HOOK_AFTER_CREATE]?: ComponentOptionsHook;
	[HOOK_BEFORE_RENDER]?: ComponentOptionsHook;
	[HOOK_AFTER_RENDER]?: ComponentOptionsHook;
	[HOOK_BEFORE_MOUNT]?: ComponentOptionsHook;
	[HOOK_AFTER_MOUNT]?: ComponentOptionsHook;
	[HOOK_BEFORE_UPDATE]?: ComponentOptionsHook;
	[HOOK_AFTER_UPDATE]?: ComponentOptionsHook;
	[HOOK_BEFORE_DESTROY]?: ComponentOptionsHook;
	[HOOK_AFTER_DESTROY]?: ComponentOptionsHook;
	[HOOK_BEFORE_PROPS_UPDATE]?: (props: Data) => void;
}
export declare type Data = Record<string, any>;
export declare type LazyValue = number | true;
export declare type PropTypeFunction = (key: string, value: any, componentName: string | void) => void;
export declare type PropValueFunction = () => any;
export declare type ComponentCallback = (options: ComponentOptions) => void;
export declare type ComponentLoader = (callback: ComponentCallback) => Promise<ComponentOptions> | void;
export declare type Component = ComponentOptions | ComponentLoader;
export declare type FilterFunction = (this: any, ...args: any) => string | number | boolean;
export declare type Filter = FilterFunction | Record<string, FilterFunction>;
export declare type Partial = string | Function;
export declare type ThisTask<This> = (this: This) => void;
export declare type ThisWatcher<This> = (this: This, newValue: any, oldValue: any, keypath: string) => void;
export declare type Watcher = (newValue: any, oldValue: any, keypath: string) => void;
export declare type ThisListener<This> = (this: This, event: CustomEventInterface, data?: Data) => false | void;
export declare type Listener = (event: CustomEventInterface, data?: Data, isNative?: boolean) => false | void;
export declare type NativeListener = (event: CustomEventInterface | Event) => false | void;
export declare type ComputedGetter = () => any;
export declare type ComputedSetter = (value: any) => void;
export declare type ValueHolder = {
	keypath?: string;
	value: any;
};
export declare type PureObject = {
	get(key: string): any;
	set(key: string, value: any): void;
	has(key: string): boolean;
	keys(): string[];
};
export declare type PropRule = {
	type: string | string[] | PropTypeFunction;
	value?: any | PropValueFunction;
	required?: boolean;
};
declare class Emitter {
	/**
	 * 是否开启命名空间
	 */
	ns: boolean;
	/**
	 * 已注册的事件监听
	 */
	listeners: Record<string, EmitterOptions[]>;
	constructor(ns?: boolean);
	/**
	 * 发射事件
	 *
	 * @param type 事件名称或命名空间
	 * @param args 事件处理函数的参数列表
	 * @param filter 自定义过滤器
	 */
	fire(type: string | EmitterEvent, args: any[] | void, filter?: (event: EmitterEvent, args: any[] | void, options: EmitterOptions) => boolean | void): boolean;
	/**
	 * 注册监听
	 *
	 * @param type
	 * @param listener
	 */
	on(type: string, listener: Function | EmitterOptions): void;
	/**
	 * 取消监听
	 *
	 * @param type
	 * @param listener
	 */
	off(type?: string, listener?: Function | EmitterFilter): void;
	/**
	 * 是否已监听某个事件
	 *
	 * @param type
	 * @param listener
	 */
	has(type: string, listener?: Function | EmitterFilter): boolean;
	/**
	 * 把事件类型解析成命名空间格式
	 *
	 * @param type
	 */
	toEvent(type: string): EmitterEvent;
	toFilter(type: string, listener?: Function | EmitterFilter): EmitterFilter;
}
declare class CustomEvent implements CustomEventInterface {
	static PHASE_CURRENT: number;
	static PHASE_UPWARD: number;
	static PHASE_DOWNWARD: number;
	static is(event: any): boolean;
	type: string;
	phase: number;
	ns?: string;
	target?: YoxInterface;
	originalEvent?: CustomEventInterface | Event;
	isPrevented?: true;
	isStoped?: true;
	/**
	 * 构造函数
	 *
	 * 可以传事件名称，也可以传原生事件对象
	 */
	constructor(type: string, originalEvent?: CustomEventInterface | Event);
	/**
	 * 阻止事件的默认行为
	 */
	preventDefault(): this;
	/**
	 * 停止事件广播
	 */
	stopPropagation(): this;
	prevent(): this;
	stop(): this;
}
export declare type NextTaskHooks = {
	beforeTask?: Function;
	afterTask?: Function;
};
declare class NextTask {
	/**
	 * 全局单例
	 */
	static shared(): NextTask;
	/**
	 * 异步队列
	 */
	private tasks;
	private hooks;
	constructor(hooks?: NextTaskHooks);
	/**
	 * 在队尾添加异步任务
	 */
	append(func: Function, context?: any): void;
	/**
	 * 在队首添加异步任务
	 */
	prepend(func: Function, context?: any): void;
	/**
	 * 清空异步队列
	 */
	clear(): void;
	/**
	 * 立即执行异步任务，并清空队列
	 */
	run(): void;
}
declare class Computed {
	static current?: Computed;
	keypath: string;
	value: any;
	deps: string[] | void;
	cache: boolean;
	fixed: boolean;
	observer: Observer;
	getter: ComputedGetter;
	setter: ComputedSetter | void;
	watcher: Watcher;
	watcherOptions: WatcherOptions;
	unique: PureObject | void;
	constructor(keypath: string, sync: boolean, cache: boolean, deps: string[] | void, observer: Observer, getter: ComputedGetter, setter: ComputedSetter | void);
	/**
	 * 读取计算属性的值
	 *
	 * @param force 是否强制刷新缓存
	 */
	get(force?: boolean): any;
	set(value: any): void;
	/**
	 * 添加依赖
	 *
	 * 这里只是为了保证依赖唯一
	 *
	 * @param dep
	 */
	add(dep: string): void;
}
declare class Observer {
	data: Data;
	context: any;
	nextTask: NextTask;
	computed?: Record<string, Computed>;
	syncEmitter: Emitter;
	asyncEmitter: Emitter;
	asyncOldValues: Record<string, any>;
	asyncKeypaths: Record<string, Record<string, boolean>>;
	pending?: boolean;
	constructor(data?: Data, context?: any, nextTask?: NextTask);
	/**
	 * 获取数据
	 *
	 * @param keypath
	 * @param defaultValue
	 * @param depIgnore
	 * @return
	 */
	get(keypath: string, defaultValue?: any, depIgnore?: boolean): any;
	/**
	 * 更新数据
	 *
	 * @param keypath
	 * @param value
	 */
	set(keypath: string | Data, value?: any): void;
	/**
	 * 同步调用的 diff，用于触发 syncEmitter，以及唤醒 asyncEmitter
	 *
	 * @param keypath
	 * @param newValue
	 * @param oldValue
	 */
	diff(keypath: string, newValue: any, oldValue: any): void;
	/**
	 * 异步触发的 diff
	 */
	private diffAsync;
	/**
	 * 添加计算属性
	 *
	 * @param keypath
	 * @param computed
	 */
	addComputed(keypath: string, options: ComputedGetter | ComputedOptions): Computed | void;
	/**
	 * 移除计算属性
	 *
	 * @param keypath
	 */
	removeComputed(keypath: string): void;
	/**
	 * 监听数据变化
	 *
	 * @param keypath
	 * @param watcher
	 * @param immediate
	 */
	watch(keypath: string | Record<string, Watcher | WatcherOptions>, watcher?: Watcher | WatcherOptions, immediate?: boolean): void;
	/**
	 * 取消监听数据变化
	 *
	 * @param keypath
	 * @param watcher
	 */
	unwatch(keypath?: string, watcher?: Watcher): void;
	/**
	 * 取反 keypath 对应的数据
	 *
	 * 不管 keypath 对应的数据是什么类型，操作后都是布尔型
	 *
	 * @param keypath
	 * @return 取反后的布尔值
	 */
	toggle(keypath: string): boolean;
	/**
	 * 递增 keypath 对应的数据
	 *
	 * 注意，最好是整型的加法，如果涉及浮点型，不保证计算正确
	 *
	 * @param keypath 值必须能转型成数字，如果不能，则默认从 0 开始递增
	 * @param step 步进值，默认是 1
	 * @param max 可以递增到的最大值，默认不限制
	 */
	increase(keypath: string, step?: number, max?: number): number | void;
	/**
	 * 递减 keypath 对应的数据
	 *
	 * 注意，最好是整型的减法，如果涉及浮点型，不保证计算正确
	 *
	 * @param keypath 值必须能转型成数字，如果不能，则默认从 0 开始递减
	 * @param step 步进值，默认是 1
	 * @param min 可以递减到的最小值，默认不限制
	 */
	decrease(keypath: string, step?: number, min?: number): number | void;
	/**
	 * 在数组指定位置插入元素
	 *
	 * @param keypath
	 * @param item
	 * @param index
	 */
	insert(keypath: string, item: any, index: number | boolean): true | void;
	/**
	 * 在数组尾部添加元素
	 *
	 * @param keypath
	 * @param item
	 */
	append(keypath: string, item: any): true | void;
	/**
	 * 在数组首部添加元素
	 *
	 * @param keypath
	 * @param item
	 */
	prepend(keypath: string, item: any): true | void;
	/**
	 * 通过索引移除数组中的元素
	 *
	 * @param keypath
	 * @param index
	 */
	removeAt(keypath: string, index: number): true | void;
	/**
	 * 直接移除数组中的元素
	 *
	 * @param keypath
	 * @param item
	 */
	remove(keypath: string, item: any): true | void;
	/**
	 * 拷贝任意数据，支持深拷贝
	 *
	 * @param data
	 * @param deep
	 */
	copy<T>(data: T, deep?: boolean): T;
	/**
	 * 销毁
	 */
	destroy(): void;
}
declare class LifeCycle {
	private $emitter;
	constructor();
	fire(component: YoxInterface, type: string, data?: Data): void;
	on(type: string, listener: Function): this;
	off(type: string, listener: Function): this;
}
export default class Yox implements YoxInterface {
	$options: ComponentOptions;
	$observer: Observer;
	$emitter: Emitter;
	$el?: HTMLElement;
	$template?: Function;
	$slots?: Slots;
	$refs?: Record<string, YoxInterface | HTMLElement>;
	$model?: string;
	$root?: YoxInterface;
	$parent?: YoxInterface;
	$context?: YoxInterface;
	$children?: YoxInterface[];
	$vnode: VNode | undefined;
	private $nextTask;
	private $directives?;
	private $components?;
	private $transitions?;
	private $partials?;
	private $filters?;
	private $dependencies?;
	private $isDirty?;
	/**
	 * core 版本
	 */
	static version: string | undefined;
	/**
	 * 方便外部共用的通用逻辑，特别是写插件，减少重复代码
	 */
	static is: IsApi;
	static dom: DomApi;
	static array: ArrayApi;
	static object: ObjectApi;
	static string: StringApi;
	static logger: LoggerApi;
	static Event: typeof CustomEvent;
	static Emitter: typeof Emitter;
	static lifeCycle: LifeCycle;
	/**
	 * 外部可配置的对象
	 */
	static config: Record<string, any>;
	/**
	 * 定义组件对象
	 */
	static define<Computed, Watchers, Events, Methods>(options: ComponentOptions<Computed, Watchers, Events, Methods> & ThisType<Methods & YoxInterface>): ComponentOptions<Computed, Watchers, Events, Methods> & ThisType<Methods & YoxInterface>;
	/**
	 * 安装插件
	 *
	 * 插件必须暴露 install 方法
	 */
	static use(plugin: {
		install(Y: typeof Yox): void;
	}): void;
	/**
	 * 因为组件采用的是异步更新机制，为了在更新之后进行一些操作，可使用 nextTick
	 */
	static nextTick(task: Function, context?: any): void;
	/**
	 * 编译模板，暴露出来是为了打包阶段的模板预编译
	 */
	static compile(template: string | Function, stringify?: boolean): string | Function;
	/**
	 * 注册全局指令
	 */
	static directive(name: string | Record<string, DirectiveHooks>, directive?: DirectiveHooks): DirectiveHooks | void;
	/**
	 * 注册全局过渡动画
	 */
	static transition(name: string | Record<string, TransitionHooks>, transition?: TransitionHooks): TransitionHooks | void;
	/**
	 * 注册全局组件
	 */
	static component(name: string | Record<string, Component>, component?: Component): Component | void;
	/**
	 * 注册全局子模板
	 */
	static partial(name: string | Record<string, Partial>, partial?: Partial): Function | void;
	/**
	 * 注册全局过滤器
	 */
	static filter(name: string | Record<string, Filter>, filter?: Filter): Filter | void;
	/**
	 * 注册全局方法
	 */
	static method(name: string | Record<string, Function>, method?: Function): Function | void;
	constructor(options?: ComponentOptions);
	/**
	 * 取值
	 */
	get(keypath: string, defaultValue?: any): any;
	/**
	 * 设值
	 */
	set(keypath: string | Data, value?: any): void;
	/**
	 * 监听事件，支持链式调用
	 */
	on(type: string | Record<string, ThisListener<this> | ThisListenerOptions> | ThisTypeListenerOptions[], listener?: ThisListener<this> | ThisListenerOptions): this;
	/**
	 * 监听一次事件，支持链式调用
	 */
	once(type: string | Record<string, ThisListener<this> | ThisListenerOptions> | ThisTypeListenerOptions[], listener?: ThisListener<this> | ThisListenerOptions): this;
	/**
	 * 取消监听事件，支持链式调用
	 */
	off(type?: string, listener?: ThisListener<this> | ThisListenerOptions): this;
	/**
	 * 发射事件
	 */
	fire(type: string | EmitterEvent | CustomEvent, data?: Data | boolean, downward?: boolean): boolean;
	/**
	 * 监听数据变化，支持链式调用
	 */
	watch(keypath: string | Record<string, ThisWatcher<this> | ThisWatcherOptions<this>>, watcher?: ThisWatcher<this> | ThisWatcherOptions<this>, immediate?: boolean): this;
	/**
	 * 取消监听数据变化，支持链式调用
	 */
	unwatch(keypath?: string, watcher?: ThisWatcher<this>): this;
	/**
	 * 加载组件，组件可以是同步或异步，最后会调用 callback
	 *
	 * @param name 组件名称
	 * @param callback 组件加载成功后的回调
	 */
	loadComponent(name: string, callback: ComponentCallback): void;
	/**
	 * 创建子组件
	 *
	 * @param options 组件配置
	 * @param vnode 虚拟节点
	 */
	createComponent(options: ComponentOptions, vnode: VNode): YoxInterface;
	/**
	 * 注册当前组件级别的指令
	 */
	directive(name: string | Record<string, DirectiveHooks>, directive?: DirectiveHooks): DirectiveHooks | void;
	/**
	 * 注册当前组件级别的过渡动画
	 */
	transition(name: string | Record<string, TransitionHooks>, transition?: TransitionHooks): TransitionHooks | void;
	/**
	 * 注册当前组件级别的组件
	 */
	component(name: string | Record<string, Component>, component?: Component): Component | void;
	/**
	 * 注册当前组件级别的子模板
	 */
	partial(name: string | Record<string, Partial>, partial?: Partial): Function | void;
	/**
	 * 注册当前组件级别的过滤器
	 */
	filter(name: string | Record<string, Filter>, filter?: Filter): Filter | void;
	/**
	 * 对于某些特殊场景，修改了数据，但是模板的依赖中并没有这一项
	 * 而你非常确定需要更新模板，强制刷新正是你需要的
	 */
	forceUpdate(props?: Data): void;
	/**
	 * 把模板抽象语法树渲染成 virtual dom
	 */
	render(): VNode | undefined;
	/**
	 * 更新 virtual dom
	 *
	 * @param vnode
	 * @param oldVNode
	 */
	update(vnode: VNode, oldVNode: VNode): void;
	/**
	 * 校验组件参数
	 *
	 * @param props
	 */
	checkProp(key: string, value: any): void;
	/**
	 * 渲染 slots
	 *
	 * @param props
	 * @param slots
	 */
	renderSlots(props: Data, slots: Slots): void;
	/**
	 * 销毁组件
	 */
	destroy(): void;
	/**
	 * 因为组件采用的是异步更新机制，为了在更新之后进行一些操作，可使用 nextTick
	 */
	nextTick(task: ThisTask<this>): void;
	/**
	 * 取反 keypath 对应的数据
	 *
	 * 不管 keypath 对应的数据是什么类型，操作后都是布尔型
	 */
	toggle(keypath: string): boolean;
	/**
	 * 递增 keypath 对应的数据
	 *
	 * 注意，最好是整型的加法，如果涉及浮点型，不保证计算正确
	 *
	 * @param keypath 值必须能转型成数字，如果不能，则默认从 0 开始递增
	 * @param step 步进值，默认是 1
	 * @param max 可以递增到的最大值，默认不限制
	 */
	increase(keypath: string, step?: number, max?: number): number | void;
	/**
	 * 递减 keypath 对应的数据
	 *
	 * 注意，最好是整型的减法，如果涉及浮点型，不保证计算正确
	 *
	 * @param keypath 值必须能转型成数字，如果不能，则默认从 0 开始递减
	 * @param step 步进值，默认是 1
	 * @param min 可以递减到的最小值，默认不限制
	 */
	decrease(keypath: string, step?: number, min?: number): number | void;
	/**
	 * 在数组指定位置插入元素
	 *
	 * @param keypath
	 * @param item
	 * @param index
	 */
	insert(keypath: string, item: any, index: number | boolean): true | void;
	/**
	 * 在数组尾部添加元素
	 *
	 * @param keypath
	 * @param item
	 */
	append(keypath: string, item: any): true | void;
	/**
	 * 在数组首部添加元素
	 *
	 * @param keypath
	 * @param item
	 */
	prepend(keypath: string, item: any): true | void;
	/**
	 * 通过索引移除数组中的元素
	 *
	 * @param keypath
	 * @param index
	 */
	removeAt(keypath: string, index: number): true | void;
	/**
	 * 直接移除数组中的元素
	 *
	 * @param keypath
	 * @param item
	 */
	remove(keypath: string, item: any): true | void;
	/**
	 * 拷贝任意数据，支持深拷贝
	 *
	 * @param data
	 * @param deep
	 */
	copy<T>(data: T, deep?: boolean): T;
}

export {};
