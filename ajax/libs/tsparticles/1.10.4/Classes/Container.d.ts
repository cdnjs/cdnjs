import { Canvas } from "./Canvas";
import { IRepulse } from "../Interfaces/IRepulse";
import { IBubble } from "../Interfaces/IBubble";
import { IImage } from "../Interfaces/IImage";
import { IContainerInteractivity } from "../Interfaces/IContainerInteractivity";
import { Particles } from "./Particles";
import { Retina } from "./Retina";
import { PolygonMask } from "./PolygonMask";
import { ImageShape } from "./Options/Particles/Shape/ImageShape";
import { IOptions } from "../Interfaces/Options/IOptions";
import { Drawer } from "./Drawer";
import { RecursivePartial } from "../Types/RecursivePartial";
declare global {
    interface Window {
        customRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        customCancelRequestAnimationFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
    }
}
/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 */
export declare class Container {
    readonly sourceOptions?: RecursivePartial<IOptions>;
    readonly id: string;
    interactivity: IContainerInteractivity;
    options: IOptions;
    retina: Retina;
    canvas: Canvas;
    particles: Particles;
    polygon: PolygonMask;
    bubble: IBubble;
    repulse: IRepulse;
    images: IImage[];
    lastFrameTime: number;
    pageHidden: boolean;
    drawer: Drawer;
    started: boolean;
    private paused;
    private drawAnimationFrame?;
    private eventListeners;
    constructor(id: string, params?: RecursivePartial<IOptions>);
    static requestFrame(callback: FrameRequestCallback): number;
    static cancelAnimation(handle: number): void;
    play(): void;
    pause(): void;
    densityAutoParticles(): void;
    destroy(): void;
    exportImg(): void;
    loadImg(image: IImage, optionsImage: ImageShape): Promise<void>;
    refresh(): Promise<void>;
    stop(): void;
    start(): Promise<void>;
    private update;
    private init;
    private checkBeforeDraw;
}
