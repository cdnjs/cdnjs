import { Accessors, Component, ComponentCallback, ComponentOptions, ComputedGetter, ComputedOptions, CustomEvent, Data, DataGenerator, DirectiveHooks, DomApi, Filter, HOOK_AFTER_CREATE, HOOK_AFTER_DESTROY, HOOK_AFTER_MOUNT, HOOK_AFTER_UPDATE, HOOK_BEFORE_CREATE, HOOK_BEFORE_DESTROY, HOOK_BEFORE_MOUNT, HOOK_BEFORE_UPDATE, Listener, OptionsBeforeCreateHook, OptionsOtherHook, PropRule, Task, TransitionHooks, VNode, Watcher, WatcherOptions, Yox, YoxInterface } from 'yox';

declare const ROUTER_HOOK_BEFORE_ENTER = "beforeEnter";
declare const ROUTER_HOOK_AFTER_ENTER = "afterEnter";
declare const ROUTER_HOOK_BEFORE_UPDATE = "beforeUpdate";
declare const ROUTER_HOOK_AFTER_UPDATE = "afterUpdate";
declare const ROUTER_HOOK_BEFORE_LEAVE = "beforeLeave";
declare const ROUTER_HOOK_AFTER_LEAVE = "afterLeave";
export declare type API = typeof Yox;
export declare type Target = string | RouteTarget;
export declare type Redirect = (to: Location) => Target;
export declare type RouteCallback = (route: RouteOptions) => void;
export declare type RouteLoader = (callback: RouteCallback) => Promise<any> | void;
export declare type BeforeHook = (to: Location, from: Location | void, next: (value?: false | string | RouteTarget) => void) => void;
export declare type AfterHook = (to: Location, from: Location | void) => void;
export interface Location {
	path: string;
	url?: string;
	params?: Data;
	query?: Data;
}
export interface RouteTarget {
	name?: string;
	path?: string;
	params?: Data;
	query?: Data;
}
export interface RouterOptions {
	el: Element | string;
	routes: RouteOptions[];
	route404?: RouteOptions;
	mode?: 'hash' | 'history';
	[ROUTER_HOOK_BEFORE_ENTER]?: BeforeHook;
	[ROUTER_HOOK_AFTER_ENTER]?: AfterHook;
	[ROUTER_HOOK_BEFORE_UPDATE]?: BeforeHook;
	[ROUTER_HOOK_AFTER_UPDATE]?: AfterHook;
	[ROUTER_HOOK_BEFORE_LEAVE]?: BeforeHook;
	[ROUTER_HOOK_AFTER_LEAVE]?: AfterHook;
}
export interface RouteOptions {
	path: string;
	component?: ComponentOptions;
	name?: string;
	load?: RouteLoader;
	redirect?: Target | Redirect;
	children?: RouteOptions[];
	[ROUTER_HOOK_BEFORE_ENTER]?: BeforeHook;
	[ROUTER_HOOK_AFTER_ENTER]?: AfterHook;
	[ROUTER_HOOK_BEFORE_UPDATE]?: BeforeHook;
	[ROUTER_HOOK_AFTER_UPDATE]?: AfterHook;
	[ROUTER_HOOK_BEFORE_LEAVE]?: BeforeHook;
	[ROUTER_HOOK_AFTER_LEAVE]?: AfterHook;
}
export interface LinkedRoute {
	path: string;
	route: RouteOptions;
	name?: string;
	load?: RouteLoader;
	component?: ComponentOptions;
	params?: string[];
	context?: YoxInterface;
	parent?: LinkedRoute;
	child?: LinkedRoute;
}
export interface RoutePending {
	cursor?: number;
	location: Location;
	onComplete: Function;
	onAbort: Function;
}
export interface Mode {
	start(api: DomApi, handler: Function): void;
	stop(api: DomApi, handler: Function): void;
	push(location: Location, handler: Function): void;
	go(n: number): void;
	current(): string;
}
declare class Hooks {
	list: Task[];
	to: Location;
	from: Location | void;
	setLocation(to: Location, from: Location | void): this;
	clear(): this;
	add(hook: Function | void, ctx: any): this;
	next(next: Function, isGuard?: boolean, callback?: Function): void;
}
declare let API: API;
export declare class Router {
	el: Element;
	options: RouterOptions;
	routes: LinkedRoute[];
	route404: LinkedRoute;
	name2Path: Record<string, string>;
	path2Route: Record<string, LinkedRoute>;
	mode: Mode;
	history: Location[];
	cursor: number;
	pending?: RoutePending;
	hooks: Hooks;
	handler: Function;
	route?: LinkedRoute;
	location?: Location;
	constructor(options: RouterOptions);
	/**
	 * 添加一个新的路由
	 */
	add(routeOptions: RouteOptions): LinkedRoute[];
	/**
	 * 删除一个已注册的路由
	 */
	remove(route: LinkedRoute): void;
	/**
	 * target 有 3 种格式：
	 *
	 * 如果只是简单的 path，直接传字符串
	 *
	 * push('/index')
	 *
	 * 如果需要带参数，可传对象
	 *
	 * push({
	 *   path: '/index',
	 *   params: { },
	 *   query: { }
	 * })
	 *
	 * 如果路由配置了 name，可用 name 代替 path，如下：
	 *
	 * push({
	 *   name: 'index'
	 * })
	 *
	 */
	push(target: Target): void;
	/**
	 * 不改变 URL，只修改路由组件
	 */
	replace(target: Target): void;
	/**
	 * 前进或后退 n 步
	 */
	go(n: number): void;
	/**
	 * 启动路由
	 */
	start(): void;
	/**
	 * 停止路由
	 */
	stop(): void;
	/**
	 * 钩子函数
	 */
	hook(route: LinkedRoute, componentHook: string, hook: string, isGuard?: boolean, callback?: Function): void;
	private setHistory;
	private replaceHistory;
	private setUrl;
	private parseLocation;
	private diffRoute;
	private patchRoute;
	private setRoute;
}
/**
 * 版本
 */
export declare const version: string | undefined;
/**
 * 安装插件
 */
export declare function install(Yox: API): void;

export {};
