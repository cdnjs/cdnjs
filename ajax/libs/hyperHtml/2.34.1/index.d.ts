type TemplateFunction<T> = (template: TemplateStringsArray, ...values: any[]) => T;
export type BoundTemplateFunction<T extends Element | ShadowRoot> = TemplateFunction<T>;
export type WiredTemplateFunction = TemplateFunction<any>;

export declare class Component<T = {}> {
  static for(context: object, identity?: any): Component;
  handleEvent(e: Event): void;
  html: WiredTemplateFunction;
  svg: WiredTemplateFunction;
  state: T;
  get defaultState(): T;
  setState(state: Partial<T> | ((this: this, state: T) => Partial<T>), render?: boolean): this;
  dispatch(type: string, detail?: any): boolean;
}

export declare function bind<T extends Element | ShadowRoot>(element: T): BoundTemplateFunction<T>;

export declare function define(intent: string, callback: Function): void;

export declare function wire(identity?: object | null, type?: 'html' | 'svg'): WiredTemplateFunction;
export declare function wire(identity?: object | null, type_id?: string): WiredTemplateFunction;

export declare const hyper: {
  Component: typeof Component;
  bind: typeof bind;
  define: typeof define;
  hyper: typeof hyper;
  wire: typeof wire;

  // hyper(null, 'html')`HTML`
  (identity: null | undefined, type?: 'html' | 'svg'): WiredTemplateFunction;

  // hyper('html')`HTML`
  (type: 'html' | 'svg'): WiredTemplateFunction;

  // hyper(element)`HTML`
  <T extends Element>(element: T): BoundTemplateFunction<T>;

  // hyper`HTML`
  (template: TemplateStringsArray, ...values: any[]): any;

  // hyper(obj, 'html:id')`HTML`
  // hyper(obj)`HTML`
  (identity: object, type?: 'html' | 'svg'): WiredTemplateFunction;
  (identity: object, type_id?: string): WiredTemplateFunction;

  // hyper()`HTML`
  (): WiredTemplateFunction;
};

export default hyper;
