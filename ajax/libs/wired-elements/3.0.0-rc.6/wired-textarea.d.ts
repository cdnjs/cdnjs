import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredTextarea extends WiredBase {
    disabled: boolean;
    rows: number;
    maxrows: number;
    autocomplete: string;
    autofocus: boolean;
    inputmode: string;
    placeholder: string;
    required: boolean;
    readonly: boolean;
    minlength?: number;
    maxlength?: number;
    private textareaInput?;
    private pendingValue?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    get textarea(): HTMLTextAreaElement | undefined;
    get value(): string;
    set value(v: string);
    firstUpdated(): void;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
    private refire;
}
