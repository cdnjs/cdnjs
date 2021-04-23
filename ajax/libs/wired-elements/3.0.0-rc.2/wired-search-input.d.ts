import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredSearchInput extends WiredBase {
    disabled: boolean;
    placeholder: string;
    autocomplete: string;
    autocorrect: string;
    autofocus: boolean;
    private textInput?;
    private pendingValue?;
    private searchIcon?;
    private closeIcon?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    get input(): HTMLInputElement | undefined;
    get value(): string;
    set value(v: string);
    wiredRender(force?: boolean): void;
    firstUpdated(): void;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
    private refreshIconState;
    private refire;
}
