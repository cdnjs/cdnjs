import './index.scss';
/**
 * widget customization options
 */
export interface SakanaWidgetOptions {
    /**
     * widget size
     */
    appSize?: number;
    /**
     * mounting container
     */
    container?: HTMLElement;
    /**
     * default character
     */
    defaultCharacter?: 'chisato' | 'takina';
    /**
     * character decay
     */
    inertia?: number;
    /**
     * character decay
     */
    decay?: number;
    /**
     * canvas stroke color
     */
    strokeColor?: string;
}
/**
 * widget instance
 */
export interface SakanaWidgetInstance {
    /**
     * instance dom element
     */
    element: HTMLElement;
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
