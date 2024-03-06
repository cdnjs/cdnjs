declare namespace kontra {
  function on(event: string, callback: Function): void;
  function off(event: string, callback: Function): void;
  function emit(event: string, ...args: any): void;
  function getCanvas(): HTMLCanvasElement;
  function getContext(): CanvasRenderingContext2D;
  function init(canvas?: string | HTMLCanvasElement): {canvas: HTMLCanvasElement, context: CanvasRenderingContext2D};
  interface Animation {
    spriteSheet: SpriteSheet;
    frames: number[];
    frameRate: number;
    loop: boolean;
    width: number;
    height: number;
    margin: number;
    clone(): Animation;
    reset(): void;
    update(dt?: number): void;
    render(properties: {x: number, y: number, width?: number, height?: number, context?: CanvasRenderingContext2D}): void;
  }
  interface AnimationConstructor {
    readonly class: AnimationConstructor;
    readonly prototype: Animation;
    new(properties: {spriteSheet: SpriteSheet, frames: number[], frameRate: number, loop?: boolean}): Animation;
    (properties: {spriteSheet: SpriteSheet, frames: number[], frameRate: number, loop?: boolean}): Animation;
  }
  var Animation: AnimationConstructor
  var imageAssets: {[name: string]: HTMLImageElement};
  var audioAssets: {[name: string]: HTMLAudioElement};
  var dataAssets: {[name: string]: any};
  function setImagePath(path: string): void;
  function setAudioPath(path: string): void;
  function setDataPath(path: string): void;
  function loadImage(url: string): Promise<HTMLImageElement>;
  function loadAudio(url: string): Promise<HTMLAudioElement>;
  function loadData(url: string): Promise<any>;
  function load(...urls: string[]): Promise<any[]>;
  function degToRad(deg: number): number;
  function radToDeg(rad: number): number;
  function angleToTarget(source: {x: number, y: number}, target: {x: number, y: number}): number;
  function rotatePoint(point: {x: number, y: number}, angle: number): {x: number, y: number};
  function randInt(min: number, max: number): number;
  function seedRand(str: string): () => number;
  function lerp(start: number, end: number, percent: number): number;
  function inverseLerp(start: number, end: number, value: number): number;
  function clamp(min: number, max: number, value: number): number;
  function setStoreItem(key: string, value: any): void;
  function getStoreItem(key: string): any;
  function collides(obj1: {x: number, y: number, width: number, height: number} | {world: {x: number, y: number, width: number, height: number}}, obj2: {x: number, y: number, width: number, height: number} | {world: {x: number, y: number, width: number, height: number}}): boolean | null;
  function getWorldRect(obj: {x: number, y: number, width: number, height: number} | {world: {x: number, y: number, width: number, height: number}} | {mapwidth: number, mapheight: number}): {x: number, y: number, width: number, height: number};
  interface Vector {
    add(vector: Vector | {x: number, y: number}): Vector;
    subtract(vector: Vector | {x: number, y: number}): Vector;
    scale(value: number): Vector;
    normalize(): Vector;
    dot(vector: Vector | {x: number, y: number}): number;
    length​​(): number;
    distance(vector: Vector | {x: number, y: number}): number;
    angle(vector: Vector): number;
    clamp(xMin: number, yMin: number, xMax: number, yMax: number): void;
    x: number;
    y: number;
  }
  interface VectorConstructor {
    readonly class: VectorConstructor;
    readonly prototype: Vector;
    new(x?: number, y?: number): Vector;
    (x?: number, y?: number): Vector;
  }
  var Vector: VectorConstructor
  interface GameObject {
    init(properties: object): void;
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    parent: GameObject | null;
    children: GameObject[];
    anchor: {x: number, y: number};
    sx: number;
    sy: number;
    opacity: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    render(filterObjects?: Function): void;
    draw(): void;
    x: number;
    y: number;
    world: {x: number, y: number, width: number, height: number, opacity: number, rotation: number, scaleX: number, scaleY: number};
    addChild(child: GameObject): void;
    removeChild(child: GameObject): void;
    setScale(x: number, y?: number): void;
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    ttl: number;
    update(dt?: number): void;
    advance(dt?: number): void;
    dx: number;
    dy: number;
    ddx: number;
    ddy: number;
    isAlive(): boolean;
    [prop: string]: any;
  }
  interface GameObjectConstructor {
    readonly class: GameObjectConstructor;
    readonly prototype: GameObject;
    new(properties?: {x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): GameObject;
    (properties?: {x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): GameObject;
  }
  var GameObject: GameObjectConstructor
  interface Sprite extends GameObject {
    color: string;
    image: HTMLImageElement | HTMLCanvasElement;
    width: number;
    height: number;
    animations: {[name: string] : Animation};
    currentAnimation: Animation;
    playAnimation(name: string): void;
  }
  interface SpriteConstructor {
    readonly class: SpriteConstructor;
    readonly prototype: Sprite;
    new(properties?: {color?: string, image?: HTMLImageElement | HTMLCanvasElement, animations?: {[name: string] : Animation}, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Sprite;
    (properties?: {color?: string, image?: HTMLImageElement | HTMLCanvasElement, animations?: {[name: string] : Animation}, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Sprite;
  }
  var Sprite: SpriteConstructor
  interface Text extends GameObject {
    text: string;
    textAlign: string;
    lineHeight: number;
    font: string;
    color: string;
  }
  interface TextConstructor {
    readonly class: TextConstructor;
    readonly prototype: Text;
    new(properties: {text: string, font?: string, color?: string, width?: number, textAlign?: string, lineHeight?: number, x?: number, y?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Text;
    (properties: {text: string, font?: string, color?: string, width?: number, textAlign?: string, lineHeight?: number, x?: number, y?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Text;
  }
  var Text: TextConstructor
  function getPointer(canvas?: HTMLCanvasElement): {x: number, y: number, radius: number, canvas: HTMLCanvasElement, touches: object};
  function initPointer(canvas?: HTMLCanvasElement): {x: number, y: number, radius: number, canvas: HTMLCanvasElement, touches: object};
  function track(...objects: object[]): void;
  function untrack(...objects: object[]): void;
  function pointerOver(object: object): boolean;
  function onPointerDown(callback: (evt: MouseEvent | TouchEvent, object?: object) => void): void;
  function onPointerUp(callback: (evt: MouseEvent | TouchEvent, object?: object) => void): void;
  function pointerPressed(button: string): boolean;
  interface Button extends Sprite {
    padX: number;
    padY: number;
    textNode: Text;
    text: string;
    destroy(): void;
    enable(): void;
    disabled: boolean;
    disable(): void;
    focus(): void;
    focused: boolean;
    blur(): void;
    hovered: boolean;
    onEnable(): void;
    onDisable(): void;
    onFocus(): void;
    onBlur(): void;
    pressed: boolean;
  }
  interface ButtonConstructor {
    readonly class: ButtonConstructor;
    readonly prototype: Button;
    new(properties?: {text?: object, padX?: number, padY?: number, onEnable?: Function, onDisable?: Function, onFocus?: Function, onBlur?: Function, color?: string, image?: HTMLImageElement | HTMLCanvasElement, animations?: {[name: string] : Animation}, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Button;
    (properties?: {text?: object, padX?: number, padY?: number, onEnable?: Function, onDisable?: Function, onFocus?: Function, onBlur?: Function, color?: string, image?: HTMLImageElement | HTMLCanvasElement, animations?: {[name: string] : Animation}, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Button;
  }
  var Button: ButtonConstructor
  interface GameLoop {
    update(dt?: number): void;
    render(): void;
    isStopped: boolean;
    start(): void;
    stop(): void;
  }
  interface GameLoopConstructor {
    readonly class: GameLoopConstructor;
    readonly prototype: GameLoop;
    new(properties: {update?: (dt?: number) => void, render: Function, fps?: number, clearCanvas?: boolean, context?: CanvasRenderingContext2D}): GameLoop;
    (properties: {update?: (dt?: number) => void, render: Function, fps?: number, clearCanvas?: boolean, context?: CanvasRenderingContext2D}): GameLoop;
  }
  var GameLoop: GameLoopConstructor
  interface Grid extends GameObject {
    flow: string;
    align: string;
    justify: string;
    colGap: number | number[];
    rowGap: number | number[];
    numCols: number;
    dir: string;
    breakpoints: {metric: Function, callback: Function}[];
    destroy(): void;
  }
  interface GridConstructor {
    readonly class: GridConstructor;
    readonly prototype: Grid;
    new(properties?: {flow?: string, align?: string, justify?: string, colGap?: number | number[], rowGap?: number | number[], numCols?: number, dir?: string, breakpoints?: {metric: Function, callback: Function}[], x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Grid;
    (properties?: {flow?: string, align?: string, justify?: string, colGap?: number | number[], rowGap?: number | number[], numCols?: number, dir?: string, breakpoints?: {metric: Function, callback: Function}[], x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Grid;
  }
  var Grid: GridConstructor
  var keyMap: {[key in (string | number)]: string};
  function initKeys(): void;
  function bindKeys(keys: string | string[], callback: (evt: KeyboardEvent) => void, handler?: 'keydown' | 'keyup'): void;
  function unbindKeys(keys: string | string[], handler?: 'keydown' | 'keyup'): void;
  function keyPressed(key: string): boolean;
  function registerPlugin(kontraObj: object, pluginObj: object): void;
  function unregisterPlugin(kontraObj: object, pluginObj: object): void;
  function extendObject(kontraObj: object, properties: object): void;
  interface Pool {
    objects: object[];
    size: number;
    maxSize: number;
    get(properties?: object): object;
    getAliveObjects(): object[];
    clear(): void;
    update(dt?: number): void;
    render(): void;
  }
  interface PoolConstructor {
    readonly class: PoolConstructor;
    readonly prototype: Pool;
    new(properties: {create: () => {update: (dt?: number) => void, render: Function, init: (properties?: object) => void, isAlive: () => boolean}, maxSize?: number}): Pool;
    (properties: {create: () => {update: (dt?: number) => void, render: Function, init: (properties?: object) => void, isAlive: () => boolean}, maxSize?: number}): Pool;
  }
  var Pool: PoolConstructor
  interface Quadtree {
    maxDepth: number;
    maxObjects: number;
    bounds: {x: number, y: number, width: number, height: number};
    clear(): void;
    get(object: {x: number, y: number, width: number, height: number}): object[];
    add(...objects: object[]): void;
  }
  interface QuadtreeConstructor {
    readonly class: QuadtreeConstructor;
    readonly prototype: Quadtree;
    new(properties?: {maxDepth?: number, maxObjects?: number, bounds?: {x: number, y: number, width: number, height: number}}): Quadtree;
    (properties?: {maxDepth?: number, maxObjects?: number, bounds?: {x: number, y: number, width: number, height: number}}): Quadtree;
  }
  var Quadtree: QuadtreeConstructor
  interface Scene extends GameObject {
    id: string;
    name: string;
    cullObjects: boolean;
    cullFunction: Function;
    camera: GameObject;
    show(): void;
    hidden: boolean;
    hide(): void;
    destroy(): void;
    lookAt(object: {x: number, y: number}): void;
    onShow(): void;
    onHide(): void;
  }
  interface SceneConstructor {
    readonly class: SceneConstructor;
    readonly prototype: Scene;
    new(properties: {id: string, name?: string, cullObjects?: boolean, cullFunction?: Function, onShow?: Function, onHide?: Function, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Scene;
    (properties: {id: string, name?: string, cullObjects?: boolean, cullFunction?: Function, onShow?: Function, onHide?: Function, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, sx?: number, sy?: number, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Scene;
  }
  var Scene: SceneConstructor
  interface SpriteSheet {
    animations: {[name: string] : Animation};
    image: HTMLImageElement | HTMLCanvasElement;
    frame: {width: number, height: number, margin: number};
    createAnimations(animations: object): void;
  }
  interface SpriteSheetConstructor {
    readonly class: SpriteSheetConstructor;
    readonly prototype: SpriteSheet;
    new(properties: {image: HTMLImageElement | HTMLCanvasElement, frameWidth: number, frameHeight: number, frameMargin?: number, animations?: object}): SpriteSheet;
    (properties: {image: HTMLImageElement | HTMLCanvasElement, frameWidth: number, frameHeight: number, frameMargin?: number, animations?: object}): SpriteSheet;
  }
  var SpriteSheet: SpriteSheetConstructor
  interface TileEngine {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    layers: object[];
    tilesets: object[];
    context: CanvasRenderingContext2D;
    mapwidth: number;
    mapheight: number;
    sx: number;
    sy: number;
    render(): void;
    renderLayer(name: string): void;
    layerCollidesWith(name: string, object: object): boolean;
    tileAtLayer(name: string, position: {x: number, y: number} | {row: number, col: number}): number;
    setTileAtLayer(name: string, position: {x: number, y: number} | {row: number, col: number}, tile: number): void;
    setLayer(name: string, data: number[]): void;
    addObject(object: object): void;
    removeObject(object: object): void;
  }
  interface TileEngineConstructor {
    readonly class: TileEngineConstructor;
    readonly prototype: TileEngine;
    new(properties: {width: number, height: number, tilewidth: number, tileheight: number, context?: CanvasRenderingContext2D, tilesets: object[], layers: object[]}): TileEngine;
    (properties: {width: number, height: number, tilewidth: number, tileheight: number, context?: CanvasRenderingContext2D, tilesets: object[], layers: object[]}): TileEngine;
  }
  var TileEngine: TileEngineConstructor
}

export = kontra