import './index.scss';
import type { RequiredDeep } from './utils';
import type { SakanaWidgetCharacter, SakanaWidgetState } from './characters';
interface SakanaWidgetOptions {
    /**
     * widget size, default to `200`
     */
    size?: number;
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
    _image: string;
    _state: SakanaWidgetState;
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
     * switch the auto mode
     */
    triggetAutoMode(): void;
    /**
     * @public
     * mount the widget, default to `#sakana-widget`
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
