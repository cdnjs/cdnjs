declare namespace kontra {
  function on(event: string, callback: Function): void;
  function off(event: string, callback: Function): void;
  function emit(event: string, ...args: any): void;
  function getCanvas(): HTMLCanvasElement;
  function getContext(): CanvasRenderingContext2D;
  function init(canvas?: string | HTMLCanvasElement, options?: {contextless?: boolean}): {canvas: HTMLCanvasElement, context: CanvasRenderingContext2D};
  interface Animation {
    spriteSheet: SpriteSheet;
    frames: number[];
    frameRate: number;
    loop: boolean;
    name: string;
    width: number;
    height: number;
    margin: number;
    isStopped: boolean;
    clone(): Animation;
    start(): void;
    stop(): void;
    reset(): void;
    update(dt?: number): void;
    render(properties: {x: number, y: number, width?: number, height?: number, context?: CanvasRenderingContext2D}): void;
  }
  interface AnimationConstructor {
    new(properties: {spriteSheet: SpriteSheet, frames: number[], frameRate: number, loop?: boolean, name?: string}): Animation;
  }
  var AnimationClass: AnimationConstructor
  function Animation(properties: {spriteSheet: SpriteSheet, frames: number[], frameRate: number, loop?: boolean, name?: string}): Animation;
  var imageAssets: {[name: string]: HTMLImageElement};
  var audioAssets: {[name: string]: HTMLAudioElement};
  var dataAssets: {[name: string]: any};
  function setImagePath(path: string): void;
  function setAudioPath(path: string): void;
  function setDataPath(path: string): void;
  function loadImage(url: string): Promise<HTMLImageElement>;
  function loadAudio(url: string | string[]): Promise<HTMLAudioElement>;
  function loadData(url: string): Promise<any>;
  function load(...urls: (string | string[])[]): Promise<any[]>;
  function degToRad(deg: number): number;
  function radToDeg(rad: number): number;
  function angleToTarget(source: {x: number, y: number}, target: {x: number, y: number}): number;
  function rotatePoint(point: {x: number, y: number}, angle: number): {x: number, y: number};
  function movePoint(point: {x: number, y: number}, angle: number, distance: number): {x: number, y: number};
  function randInt(min: number, max: number): number;
  function seedRand(str: string): () => number;
  function lerp(start: number, end: number, percent: number): number;
  function inverseLerp(start: number, end: number, value: number): number;
  function clamp(min: number, max: number, value: number): number;
  function setStoreItem(key: string, value: any): void;
  function getStoreItem(key: string): any;
  function collides(obj1: {x: number, y: number, width: number, height: number} | {world: {x: number, y: number, width: number, height: number}}, obj2: {x: number, y: number, width: number, height: number} | {world: {x: number, y: number, width: number, height: number}}): boolean;
  function getWorldRect(obj: {x: number, y: number, width: number, height: number} | {world: {x: number, y: number, width: number, height: number}} | {mapwidth: number, mapheight: number}): {x: number, y: number, width: number, height: number};
  function depthSort(obj1: {x: number, y: number, width: number, height: number} | {world: {x: number, y: number, width: number, height: number}}, obj2: {x: number, y: number, width: number, height: number} | {world: {x: number, y: number, width: number, height: number}}, prop?: string): number;
  interface Vector {
    set(vector: Vector | {x: number, y: number}): void;
    add(vector: Vector | {x: number, y: number}): Vector;
    subtract(vector: Vector | {x: number, y: number}): Vector;
    scale(value: number): Vector;
    normalize(): Vector;
    dot(vector: Vector | {x: number, y: number}): number;
    length​​(): number;
    distance(vector: Vector | {x: number, y: number}): number;
    angle(vector: Vector): number;
    direction(): number;
    clamp(xMin: number, yMin: number, xMax: number, yMax: number): void;
    x: number;
    y: number;
  }
  interface VectorConstructor {
    new(x?: number | {x: number, y: number}, y?: number): Vector;
  }
  var VectorClass: VectorConstructor
  function Vector(x?: number | {x: number, y: number}, y?: number): Vector;
  interface GameObject {
    init(properties: object): void;
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    parent: GameObject | null;
    children: GameObject[];
    anchor: {x: number, y: number};
    opacity: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    render(): void;
    draw(): void;
    x: number;
    y: number;
    world: {x: number, y: number, width: number, height: number, opacity: number, rotation: number, scaleX: number, scaleY: number};
    addChild(...objects: (GameObject | GameObject[])[]): void;
    removeChild(...objects: (GameObject | GameObject[])[]): void;
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
    new(properties?: {x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): GameObject;
  }
  var GameObjectClass: GameObjectConstructor
  function GameObject(properties?: {x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): GameObject;
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
    new(properties?: {color?: string, image?: HTMLImageElement | HTMLCanvasElement, animations?: {[name: string] : Animation}, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Sprite;
  }
  var SpriteClass: SpriteConstructor
  function Sprite(properties?: {color?: string, image?: HTMLImageElement | HTMLCanvasElement, animations?: {[name: string] : Animation}, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Sprite;
  interface Text extends GameObject {
    text: string;
    textAlign: string;
    lineHeight: number;
    font: string;
    color: string;
  }
  interface TextConstructor {
    new(properties: {text: string, font?: string, color?: string, width?: number, textAlign?: string, lineHeight?: number, strokeColor?: string, lineWidth?: number, x?: number, y?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Text;
  }
  var TextClass: TextConstructor
  function Text(properties: {text: string, font?: string, color?: string, width?: number, textAlign?: string, lineHeight?: number, strokeColor?: string, lineWidth?: number, x?: number, y?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Text;
  var pointerMap: {[key: number]: string};
  function getPointer(canvas?: HTMLCanvasElement): {x: number, y: number, radius: number, canvas: HTMLCanvasElement, touches: object};
  function initPointer(options?: {radius?: number, canvas?: HTMLCanvasElement}): {x: number, y: number, radius: number, canvas: HTMLCanvasElement, touches: object};
  function track(...objects: (object | object[])[]): void;
  function untrack(...objects: (object | object[])[]): void;
  function pointerOver(object: object): boolean;
  function onPointer(direction: 'down' | 'up', callback: (evt: MouseEvent | TouchEvent, object?: object) => void): void;
  function offPointer(direction: 'down' | 'up'): void;
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
    new(properties?: {text?: object, disabled?: boolean, padX?: number, padY?: number, onEnable?: Function, onDisable?: Function, onFocus?: Function, onBlur?: Function, color?: string, image?: HTMLImageElement | HTMLCanvasElement, animations?: {[name: string] : Animation}, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Button;
  }
  var ButtonClass: ButtonConstructor
  function Button(properties?: {text?: object, disabled?: boolean, padX?: number, padY?: number, onEnable?: Function, onDisable?: Function, onFocus?: Function, onBlur?: Function, color?: string, image?: HTMLImageElement | HTMLCanvasElement, animations?: {[name: string] : Animation}, x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Button;
  interface GameLoop {
    update(dt?: number): void;
    render(): void;
    isStopped: boolean;
    context: CanvasRenderingContext2D;
    start(): void;
    stop(): void;
  }
  interface GameLoopConstructor {
    new(properties: {update?: (dt: number) => void, render: Function, fps?: number, clearCanvas?: boolean, context?: CanvasRenderingContext2D, blur?: boolean}): GameLoop;
  }
  var GameLoopClass: GameLoopConstructor
  function GameLoop(properties: {update?: (dt: number) => void, render: Function, fps?: number, clearCanvas?: boolean, context?: CanvasRenderingContext2D, blur?: boolean}): GameLoop;
  var gamepadMap: {[key: number]: string};
  function updateGamepad(): void;
  function initGamepad(): void;
  function onGamepad(buttons: string | string[], callback: (gamepad: Gamepad, button: GamepadButton, buttonName: string) => void, options?: {gamepad?: number, handler?: 'gamepaddown' | 'gamepadup'}): void;
  function offGamepad(buttons: string | string[], options?: {gamepad?: number, handler?: 'gamepaddown' | 'gamepadup'}): void;
  function gamepadPressed(button: string, options?: {gamepad?: number}): boolean;
  function gamepadAxis(name: string, gamepad: number): number;
  var gestureMap: {[name: string]: {touches: number, touchstart?: Function, touchmove?: Function, touchend?: Function, [prop: string]: any}};
  function initGesture(): void;
  function onGesture(gestures: string | string[], callback: (evt: TouchEvent, touches: object) => void): void;
  function offGesture(gestures: string | string[]): void;
  interface Grid extends GameObject {
    flow: string;
    align: string | string[];
    justify: string | string[];
    colGap: number | number[];
    rowGap: number | number[];
    numCols: number;
    dir: string;
    breakpoints: {metric: Function, callback: Function}[];
    destroy(): void;
  }
  interface GridConstructor {
    new(properties?: {flow?: string, align?: string | string[], justify?: string | string[], colGap?: number | number[], rowGap?: number | number[], numCols?: number, dir?: string, breakpoints?: {metric: Function, callback: Function}[], x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Grid;
  }
  var GridClass: GridConstructor
  function Grid(properties?: {flow?: string, align?: string | string[], justify?: string | string[], colGap?: number | number[], rowGap?: number | number[], numCols?: number, dir?: string, breakpoints?: {metric: Function, callback: Function}[], x?: number, y?: number, width?: number, height?: number, context?: CanvasRenderingContext2D, dx?: number, dy?: number, ddx?: number, ddy?: number, ttl?: number, anchor?: {x: number, y: number}, children?: GameObject[], opacity?: number, rotation?: number, scaleX?: number, scaleY?: number, update?: (dt?: number) => void, render?: Function, [props: string]: any}): Grid;
  var keyMap: {[key in (string | number)]: string};
  function initKeys(): void;
  function onKey(keys: string | string[], callback: (evt: KeyboardEvent) => void, options?: {handler?: 'keydown' | 'keyup', preventDefault?: boolean}): void;
  function offKey(keys: string | string[], options?: {handler?: 'keydown' | 'keyup'}): void;
  function keyPressed(keys: string | string[]): boolean;
  function initInput(options?: {pointer?: object}): {pointer: {x: number, y: number, radius: number, canvas: HTMLCanvasElement, touches: object}};
  function onInput(inputs: string | string[], callback: Function, options?: {gamepad?: object, key?: object}): void;
  function offInput(inputs: string | string[], options?: {gamepad?: object, key?: object}): void;
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
    new(properties: {create: () => {update: (dt?: number) => void, render: Function, init: (properties?: object) => void, isAlive: () => boolean}, maxSize?: number}): Pool;
  }
  var PoolClass: PoolConstructor
  function Pool(properties: {create: () => {update: (dt?: number) => void, render: Function, init: (properties?: object) => void, isAlive: () => boolean}, maxSize?: number}): Pool;
  interface Quadtree {
    maxDepth: number;
    maxObjects: number;
    bounds: {x: number, y: number, width: number, height: number};
    clear(): void;
    get(object: {x: number, y: number, width: number, height: number}): object[];
    add(...objects: ({x: number, y: number, width: number, height: number} | {x: number, y: number, width: number, height: number}[])[]): void;
  }
  interface QuadtreeConstructor {
    new(properties?: {maxDepth?: number, maxObjects?: number, bounds?: {x: number, y: number, width: number, height: number}}): Quadtree;
  }
  var QuadtreeClass: QuadtreeConstructor
  function Quadtree(properties?: {maxDepth?: number, maxObjects?: number, bounds?: {x: number, y: number, width: number, height: number}}): Quadtree;
  interface Scene {
    id: string;
    name: string;
    objects: object[];
    context: CanvasRenderingContext2D;
    cullObjects: boolean;
    cullFunction: Function;
    sortFunction: Function;
    camera: GameObject;
    add(...objects: (object | object[])[]): void;
    remove(...objects: (object | object[])[]): void;
    show(): void;
    hidden: boolean;
    hide(): void;
    destroy(): void;
    lookAt(object: {x: number, y: number}): void;
    update(dt?: number): void;
    render(): void;
    onShow(): void;
    onHide(): void;
  }
  interface SceneConstructor {
    new(properties: {id: string, name?: string, objects?: object[], context?: CanvasRenderingContext2D, cullObjects?: boolean, cullFunction?: (object1: object, object2: object) => boolean, sortFunction?: (object1: object, object2: object) => number, onShow?: Function, onHide?: Function, [props: string]: any}): Scene;
  }
  var SceneClass: SceneConstructor
  function Scene(properties: {id: string, name?: string, objects?: object[], context?: CanvasRenderingContext2D, cullObjects?: boolean, cullFunction?: (object1: object, object2: object) => boolean, sortFunction?: (object1: object, object2: object) => number, onShow?: Function, onHide?: Function, [props: string]: any}): Scene;
  interface SpriteSheet {
    animations: {[name: string] : Animation};
    image: HTMLImageElement | HTMLCanvasElement;
    frame: {width: number, height: number, margin: number};
    createAnimations(animations: object): void;
  }
  interface SpriteSheetConstructor {
    new(properties: {image: HTMLImageElement | HTMLCanvasElement, frameWidth: number, frameHeight: number, frameMargin?: number, animations?: object}): SpriteSheet;
  }
  var SpriteSheetClass: SpriteSheetConstructor
  function SpriteSheet(properties: {image: HTMLImageElement | HTMLCanvasElement, frameWidth: number, frameHeight: number, frameMargin?: number, animations?: object}): SpriteSheet;
  interface TileEngine {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    tilesets: object[];
    context: CanvasRenderingContext2D;
    mapwidth: number;
    mapheight: number;
    layers: object[];
    sx: number;
    sy: number;
    add(...objects: (object | object[])[]): void;
    remove(...objects: (object | object[])[]): void;
    setTileAtLayer(name: string, position: {x: number, y: number} | {row: number, col: number}, tile: number): void;
    setLayer(name: string, data: number[]): void;
    layerCollidesWith(name: string, object: object): boolean;
    tileAtLayer(name: string, position: {x: number, y: number} | {row: number, col: number}): number;
    render(): void;
    renderLayer(name: string): void;
  }
  interface TileEngineConstructor {
    new(properties: {width: number, height: number, tilewidth: number, tileheight: number, context?: CanvasRenderingContext2D, tilesets: object[], layers: object[]}): TileEngine;
  }
  var TileEngineClass: TileEngineConstructor
  function TileEngine(properties: {width: number, height: number, tilewidth: number, tileheight: number, context?: CanvasRenderingContext2D, tilesets: object[], layers: object[]}): TileEngine;
}

export = kontra