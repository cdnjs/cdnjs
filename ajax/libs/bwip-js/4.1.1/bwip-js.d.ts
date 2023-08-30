// Type definitions for bwip-js  4.1.1 (2023-08-29)
//
// THIS DEFINITION FILE IS MACHINE GENERATED - DO NOT EDIT
//
// Project: https://github.com/metafloor/bwip-js
//
// This definition file was based on:
//
// Definitions by: TANAKA Koichi <https://github.com/MugeSo>
//                 Guillaume VanderEst <https://github.com/gvanderest>
//                 Ryan Jentzsch <https://github.com/RyanNerd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// platform-specific includes

export namespace BwipJs {
    export interface BwippOptions {
        includecheck?: boolean | undefined;
        includecheckintext?: boolean | undefined;

        parse?: boolean | undefined;
        parsefnc?: boolean | undefined;

        height?: number | undefined;
        width?: number | undefined;

        inkspread?: number | undefined;
        inkspreadh?: number | undefined;
        inkspreadv?: number | undefined;
        dotty?: boolean | undefined;

        binarytext?: boolean | undefined;   // really a bwip-js option but better positioned here
        includetext?: boolean | undefined;
        textfont?: string | undefined;
        textsize?: number | undefined;
        textgaps?: number | undefined;
        alttext?: string | undefined;

        textxalign?: 'offleft' | 'left' | 'center' | 'right' | 'offright' | 'justify' | undefined;
        textyalign?: 'below' | 'center' | 'above' | undefined;
        textxoffset?: number | undefined;
        textyoffset?: number | undefined;

        showborder?: boolean | undefined;
        borderwidth?: number | undefined;
        borderleft?: number | undefined;
        borderright?: number | undefined;
        bordertop?: number | undefined;
        boraderbottom?: number | undefined;

        barcolor?: string | undefined;
        backgroundcolor?: string | undefined;
        bordercolor?: string | undefined;
        textcolor?: string | undefined;

        addontextxoffset?: number | undefined;
        addontextyoffset?: number | undefined;
        addontextfont?: string | undefined;
        addontextsize?: number | undefined;

        guardwhitespace?: boolean | undefined;
        guardwidth?: number | undefined;
        guardheight?: number | undefined;
        guardleftpos?: number | undefined;
        guardrightpos?: number | undefined;
        guardleftypos?: number | undefined;
        guardrightypos?: number | undefined;
    }
    export interface RenderOptions extends BwippOptions {
        bcid: string;
        text: string;

        scaleX?: number | undefined;
        scaleY?: number | undefined;
        scale?: number | undefined;

        rotate?: 'N' | 'R' | 'L' | 'I' | undefined;

        paddingwidth?: number | undefined;
        paddingheight?: number | undefined;

        paddingleft?: number | undefined;
        paddingright?: number | undefined;
        paddingtop?: number | undefined;
        paddingbottom?: number | undefined;

        monochrome?: boolean | undefined;
        sizelimit?: number | undefined;
    }
    export interface RawOptions extends BwippOptions {
        bcid: string;
        text: string;
    }
    export interface DrawingContext<T> {
        setopts?(options: RenderOptions): void;
        scale(sx: number, sy: number): [number, number] | null;
        measure(
            str: string,
            font: string,
            fwidth: number,
            fheight: number,
        ): { width: number; ascent: number; descent: number };
        init(width: number, height: number): void;
        line(x0: number, y0: number, x1: number, y1: number, lw: number, rgb: string): void;
        polygon(pts: Array<[number, number]>): void;
        hexagon(pts: [[number, number], [number, number], [number, number], [number, number], [number, number]]): void;
        ellipse(x: number, y: number, rx: number, ry: number, ccw: boolean): void;
        fill(rgb: string): void;
        text(
            x: number,
            y: number,
            str: string,
            rgb: string,
            font: { name: string; width: number; height: number; dx: number },
        ): void;
        end(): T;
    }
    export function render<T>(params: RenderOptions, drawing: DrawingContext<T>): T;
    export function raw(
        options: RawOptions,
    ):
        | Array<{ bbs: number[]; bhs: number[]; sbs: number[] }>
        | Array<{ pixs: number[]; pixx: number; pixy: number; height: number; width: number }>;
    export function raw(
        bcid: string,
        text: string,
        opts: string,
    ):
        | Array<{ bbs: number[]; bhs: number[]; sbs: number[] }>
        | Array<{ pixs: number[]; pixx: number; pixy: number; height: number; width: number }>;
    export function raw(
        bcid: string,
        text: string,
        opts?: BwippOptions,
    ):
        | Array<{ bbs: number[]; bhs: number[]; sbs: number[] }>
        | Array<{ pixs: number[]; pixx: number; pixy: number; height: number; width: number }>;
		
    export const BWIPP_VERSION: string;
    export const BWIPJS_VERSION: string;

    // wrapper around FontLib.loadFont()
    export function loadFont(name: string, data: string | Uint8Array): void;
    export function loadFont(name: string, mult: number, data: string | Uint8Array): void;
    export function loadFont(name: string, multy: number, multx: number, data: string | Uint8Array): void;

    export namespace FontLib {
        export interface PathData
            extends Array<
                | { type: 'M'; x: number; y: number }
                | { type: 'L'; x: number; y: number }
                | { type: 'Q'; x: number; y: number; cx: number; cy: number }
                | { type: 'C'; x: number; y: number; cx1: number; cy1: number; cx2: number; cy2: number }
            > {
            ascent: number;
            descent: number;
            advance: number;
        }
        export function lookup(font: string): number;
        export function monochrome(mono: boolean): void;
        export function getglyph(
            fontid: number,
            charcode: number,
            width: number,
            height: number,
        ): {
            glyph: number;
            top: number;
            left: number;
            width: number;
            height: number;
            advance: number;
            pixels: Uint8Array;
            bytes: Uint8Array;
            cachekey: string;
            offset: number;
        };
        export function getpaths(fontid: number, charcode: number, width: number, height: number): PathData;
        export function loadFont(name: string, data: string | Uint8Array): void;
        export function loadFont(name: string, mult: number, data: string | Uint8Array): void;
        export function loadFont(name: string, multy: number, multx: number, data: string | Uint8Array): void;
    }
    
    // platform-specific exports
    export function toCanvas(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;


    export function auspost(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function auspost(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function auspost(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function azteccode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function azteccode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function azteccode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function azteccodecompact(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function azteccodecompact(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function azteccodecompact(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function aztecrune(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function aztecrune(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function aztecrune(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function bc412(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function bc412(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function bc412(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function channelcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function channelcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function channelcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function codablockf(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function codablockf(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function codablockf(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code11(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code11(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code11(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code128(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code128(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code128(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code16k(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code16k(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code16k(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code2of5(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code32(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code32(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code32(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code39(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code39(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code39(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code39ext(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code39ext(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code39ext(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code49(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code49(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code49(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code93(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code93(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code93(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code93ext(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function code93ext(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code93ext(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function codeone(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function codeone(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function codeone(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function coop2of5(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function coop2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function coop2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function daft(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function daft(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function daft(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpanded(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarexpanded(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpanded(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedcomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarexpandedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedstacked(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarexpandedstacked(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedstacked(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedstackedcomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarexpandedstackedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedstackedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarlimited(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarlimited(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarlimited(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarlimitedcomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarlimitedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarlimitedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databaromni(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databaromni(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databaromni(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databaromnicomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databaromnicomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databaromnicomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstacked(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarstacked(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstacked(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedcomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarstackedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedomni(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarstackedomni(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedomni(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedomnicomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databarstackedomnicomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedomnicomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databartruncated(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databartruncated(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databartruncated(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databartruncatedcomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function databartruncatedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databartruncatedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datalogic2of5(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function datalogic2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datalogic2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrix(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function datamatrix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrixrectangular(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function datamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrixrectangularextension(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function datamatrixrectangularextension(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrixrectangularextension(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function dotcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function dotcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function dotcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean13(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ean13(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean13(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean13composite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ean13composite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean13composite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean14(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ean14(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean14(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean2(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ean2(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean2(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean5(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ean5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean8(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ean8(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean8(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean8composite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ean8composite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean8composite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function flattermarken(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function flattermarken(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function flattermarken(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_128(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1_128(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_128(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_128composite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1_128composite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_128composite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_cc(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1_cc(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_cc(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1datamatrix(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1datamatrix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1datamatrix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1datamatrixrectangular(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1datamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1datamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dldatamatrix(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1dldatamatrix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dldatamatrix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dlqrcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1dlqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dlqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dotcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1dotcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dotcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1northamericancoupon(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1northamericancoupon(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1northamericancoupon(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1qrcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function gs1qrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1qrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hanxin(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hanxin(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hanxin(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcazteccode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibcazteccode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcazteccode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccodablockf(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibccodablockf(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccodablockf(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccode128(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibccode128(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccode128(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccode39(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibccode39(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccode39(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcdatamatrix(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibcdatamatrix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcdatamatrix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcdatamatrixrectangular(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibcdatamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcdatamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcmicropdf417(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibcmicropdf417(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcmicropdf417(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcpdf417(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibcpdf417(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcpdf417(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcqrcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function hibcqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function iata2of5(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function iata2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function iata2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function identcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function identcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function identcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function industrial2of5(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function industrial2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function industrial2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function interleaved2of5(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function interleaved2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function interleaved2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function isbn(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function isbn(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function isbn(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ismn(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ismn(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ismn(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function issn(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function issn(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function issn(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function itf14(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function itf14(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function itf14(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function jabcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function jabcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function jabcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function japanpost(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function japanpost(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function japanpost(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function kix(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function kix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function kix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function leitcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function leitcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function leitcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function mailmark(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function mailmark(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function mailmark(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function mands(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function mands(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function mands(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function matrix2of5(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function matrix2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function matrix2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function maxicode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function maxicode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function maxicode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function micropdf417(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function micropdf417(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function micropdf417(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function microqrcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function microqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function microqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function msi(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function msi(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function msi(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function onecode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function onecode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function onecode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pdf417(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function pdf417(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pdf417(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pdf417compact(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function pdf417compact(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pdf417compact(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pharmacode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function pharmacode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pharmacode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pharmacode2(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function pharmacode2(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pharmacode2(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function planet(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function planet(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function planet(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function plessey(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function plessey(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function plessey(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function posicode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function posicode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function posicode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function postnet(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function postnet(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function postnet(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pzn(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function pzn(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pzn(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function qrcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function qrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function qrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function rationalizedCodabar(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function rationalizedCodabar(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function rationalizedCodabar(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function raw(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function raw(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function raw(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function rectangularmicroqrcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function rectangularmicroqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function rectangularmicroqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function royalmail(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function royalmail(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function royalmail(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function sscc18(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function sscc18(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function sscc18(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function swissqrcode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function swissqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function swissqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function symbol(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function symbol(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function symbol(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function telepen(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function telepen(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function telepen(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function telepennumeric(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function telepennumeric(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function telepennumeric(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ultracode(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function ultracode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ultracode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upca(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function upca(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upca(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upcacomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function upcacomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upcacomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upce(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function upce(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upce(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upcecomposite(canvas: string | HTMLCanvasElement, opts: RenderOptions): HTMLCanvasElement;
    export function upcecomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upcecomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
}

export = BwipJs
