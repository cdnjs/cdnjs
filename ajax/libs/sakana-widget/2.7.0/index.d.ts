/*! sakana-widget | DSRKafuU (https://dsrkafuu.net) | Copyright (c) MIT License */
import './index.scss';
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
    character?: 'chisato' | 'takina' | string;
    /**
     * controls bar, default to `true`
     */
    controls?: boolean;
    /**
     * show spring rod, default to `true`
     */
    rod?: boolean;
    /**
     * character draggable, default to `true`
     */
    draggable?: boolean;
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
    /**
     * enable accessibility title feature, default to `false`
     */
    title?: boolean;
}
/**
 * widget instance class
 */
declare class SakanaWidget {
    private _options;
    private _imageSize;
    private _canvasSize;
    private _limit;
    private _lastRunUnix;
    private _frameUnix;
    private _running;
    private _magicForceTimeout;
    private _magicForceEnabled;
    private _char;
    private _image;
    private _state;
    private _domWrapper;
    private _domApp;
    private _domCanvas;
    private _domCanvasCtx;
    private _domMain;
    private _domImage;
    private _domCtrlPerson;
    private _domCtrlMagic;
    private _domCtrlClose;
    private _resizeObserver;
    /**
     * @public
     * @static
     * get data of a registered character
     */
    static getCharacter: (name: string) => SakanaWidgetCharacter | null;
    /**
     * @public
     * @static
     * get all registered character
     */
    static getCharacters: () => {
        [key: string]: SakanaWidgetCharacter;
    };
    /**
     * @public
     * @static
     * registered a new character
     */
    static registerCharacter: (name: string, character: SakanaWidgetCharacter) => void;
    constructor(options?: SakanaWidgetOptions);
    /**
     * @private
     * calculate limit and update from size
     */
    private _updateLimit;
    /**
     * @private
     * refresh widget size
     */
    private _updateSize;
    /**
     * @private
     * create widget dom elements
     */
    private _updateDom;
    /**
     * @private
     * calculate center of the image
     */
    private _calcCenterPoint;
    /**
     * @private
     * draw a frame
     */
    private _draw;
    /**
     * @private
     * run the widget in animation frame
     */
    private _run;
    /**
     * @private
     * manually move the widget
     */
    private _move;
    /**
     * @private
     * handle mouse down event
     */
    private _onMouseDown;
    /**
     * @private
     * handle touch start event
     */
    private _onTouchStart;
    /**
     * @private
     * do a force on widget (for auto mode)
     */
    private _magicForce;
    /**
     * @public
     * switch the auto mode
     */
    triggerAutoMode: () => void;
    /**
     * @public
     * set current state of widget
     */
    setState: (state: Partial<SakanaWidgetState>) => this;
    /**
     * @public
     * set current character of widget
     */
    setCharacter: (name: string) => this;
    /**
     * @public
     * set to next character of widget
     */
    nextCharacter: () => this;
    /**
     * @private
     * handle widget resize
     */
    _onResize: (rect: DOMRect) => void;
    /**
     * @public
     * mount the widget
     */
    mount: (el: HTMLElement | string) => this;
    /**
     * @public
     * unmount the widget
     */
    unmount: () => this;
}
export default SakanaWidget;
export type { SakanaWidgetCharacter, SakanaWidgetState, SakanaWidgetOptions };
