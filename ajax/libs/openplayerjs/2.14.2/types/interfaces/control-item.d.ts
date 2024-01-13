/**
 * Control item
 *
 * @description An object that stores the definition for custom controls
 * @interface ControlItem
 * @export
 */
export default interface ControlItem {
    readonly icon: string;
    readonly title: string;
    readonly id: string;
    readonly showInAds: boolean;
    position: 'right' | 'left' | 'middle' | string;
    layer?: 'top' | 'center' | 'bottom' | 'main' | string;
    custom?: boolean;
    content?: string;
    subitems?: {
        id: string;
        label: string;
        title?: string;
        icon?: string;
        click(): void;
    }[];
    click(event: any): void;
    init?(player: any): void;
    destroy?(player: any): void;
    mouseenter?(event: any): void;
    mouseleave?(event: any): void;
    keydown?(event: any): void;
    blur?(event: any): void;
    focus?(event: any): void;
}
