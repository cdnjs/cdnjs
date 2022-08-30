/*! sakana-widget | DSRKafuU (https://dsrkafuu.net) | Copyright (c) MIT License */
import './index.scss';
import { ResizeObserver } from '@juggle/resize-observer';
import type { RequiredDeep } from './utils';
import type { SakanaWidgetCharacter, SakanaWidgetState } from './characters';
interface SakanaWidgetOptions {
    /**
     * widget size, default to `200`
     */
    size?: number;
    /**
     * auto fit size (120px minimum), default to `false`
     */
    autoFit?: boolean;
    /**
     * default character, default to `chisato`
     */
    character?: 'chisato' | 'takina';
    /**
     * controls bar, default to `true`
     */
    controls?: boolean;
    /**
     * canvas stroke settings, default to `#b4b4b4` & `10`
     */
    stroke?: {
        color?: string;
        width?: number;
    };
    /**
     * motion stop threshold, default to `0.1`
     */
    threshold?: number;
    /**
     * rotate origin, default to `0`
     */
    rotate?: number;
}
/**
 * widget instance class
 */
declare class SakanaWidget {
    _options: RequiredDeep<SakanaWidgetOptions>;
    _imageSize: number;
    _limit: {
        maxR: number;
        maxY: number;
        minY: number;
    };
    _lastRunUnix: number;
    _frameUnix: number;
    _running: boolean;
    _magicForceTimeout: number;
    _magicForceEnabled: boolean;
    _char: string;
    _image: string;
    _state: SakanaWidgetState;
    _domEl: HTMLElement | null;
    _domWrapper: HTMLDivElement;
    _domApp: HTMLDivElement;
    _domCanvas: HTMLCanvasElement;
    _domCanvasCtx: CanvasRenderingContext2D;
    _domMain: HTMLDivElement;
    _domImage: HTMLDivElement;
    _domCtrl: HTMLDivElement;
    _domCtrlPerson: HTMLDivElement;
    _domCtrlMagic: HTMLDivElement;
    _domCtrlGitHub: HTMLAnchorElement;
    _domCtrlClose: HTMLDivElement;
    _resizeObserver: ResizeObserver | null;
    /**
     * @public
     * @static
     * get data of a registered character
     */
    static getCharacter(name: string): SakanaWidgetCharacter | null;
    /**
     * @public
     * @static
     * get all registered character
     */
    static getCharacters(): {
        [key: string]: SakanaWidgetCharacter;
    };
    /**
     * @public
     * @static
     * registered a new character
     */
    static registerCharacter(name: string, character: SakanaWidgetCharacter): void;
    constructor(options?: SakanaWidgetOptions);
    /**
     * @private
     * calculate limit and update from size
     */
    _updateLimit(size: number): void;
    /**
     * @private
     * refresh widget size
     */
    _updateSize(size: number): void;
    /**
     * @private
     * create widget dom elements
     */
    _updateDom(): void;
    /**
     * @private
     * calculate center of the image
     */
    _calcCenterPoint(degree: number, radius: number, x: number, y: number): {
        nx: number;
        ny: number;
    };
    /**
     * @private
     * draw a frame
     */
    _draw(): void;
    /**
     * @private
     * run the widget in animation frame
     */
    _run(): void;
    /**
     * @private
     * manually move the widget
     */
    _move(x: number, y: number): void;
    /**
     * @private
     * handle mouse down event
     */
    _onMouseDown(e: MouseEvent): void;
    /**
     * @private
     * handle touch start event
     */
    _onTouchStart(e: TouchEvent): void;
    /**
     * @private
     * do a force on widget (for auto mode)
     */
    _magicForce(): void;
    /**
     * @public
     * switch the auto mode
     */
    triggetAutoMode(): void;
    /**
     * @public
     * set current state of widget
     */
    setState(state: Partial<SakanaWidgetState>): this;
    /**
     * @public
     * set current character of widget
     */
    setCharacter(name: string): this;
    /**
     * @public
     * set to next character of widget
     */
    nextCharacter(): this;
    /**
     * @private
     * handle widget resize
     */
    _onResize(rect: DOMRect): void;
    /**
     * @public
     * mount the widget
     */
    mount(el: HTMLElement | string): this;
    /**
     * @public
     * unmount the widget
     */
    unmount(): this;
}
export default SakanaWidget;
export type { SakanaWidgetCharacter, SakanaWidgetState, SakanaWidgetOptions };
