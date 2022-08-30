import './index.scss';
/**
 * widget customization options
 */
export interface SakanaWidgetOptions {
    /**
     * mounting container or css query selector, default to `#sakana-widget`
     */
    container?: HTMLElement | string;
    /**
     * widget size, default to `200`
     */
    size?: number;
    /**
     * default character, default to `chisato`
     */
    character?: 'chisato' | 'takina';
    /**
     * image motion inertia, default to `0.08`
     */
    inertia?: number;
    /**
     * image motion decay, default to different value based on character
     */
    decay?: number;
    /**
     * canvas stroke color, default to `#b4b4b4`
     */
    strokeColor?: string;
    /**
     * canvas stroke width, default to `10`
     */
    strokeWidth?: number;
    /**
     * hide control bar, default to `false`
     */
    hideControls?: boolean;
}
/**
 * widget instance
 */
export interface SakanaWidgetInstance {
    /**
     * instance dom element
     */
    node: HTMLElement;
    /**
     * switch to another character
     */
    switchCharacter: () => void;
    /**
     * toggle auto mode
     */
    toggleMagicForce: () => void;
    /**
     * remove the widget
     */
    destroy: () => void;
}
/**
 * create a sakana! widget or get current widget
 */
declare function SakanaWidget(options?: SakanaWidgetOptions): SakanaWidgetInstance;
export default SakanaWidget;
