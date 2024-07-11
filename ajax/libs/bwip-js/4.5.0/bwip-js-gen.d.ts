// Type definitions for bwip-js  4.5.0 (2024-07-03)
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

declare namespace BwipJs {
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
    export function toSVG(opts: RenderOptions): string;
    export function drawingSVG(): DrawingContext<string>;

    // platform-specific exports
    export function auspost<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function auspost<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function azteccode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function azteccode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function azteccodecompact<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function azteccodecompact<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function aztecrune<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function aztecrune<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function bc412<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function bc412<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function channelcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function channelcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function codablockf<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function codablockf<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code11<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code11<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code128<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code128<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code16k<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code16k<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code2of5<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code2of5<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code32<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code32<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code39<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code39<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code39ext<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code39ext<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code49<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code49<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code93<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code93<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code93ext<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code93ext<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function codeone<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function codeone<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function coop2of5<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function coop2of5<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function daft<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function daft<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpanded<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpanded<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedstacked<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedstacked<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedstackedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedstackedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarlimited<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarlimited<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarlimitedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarlimitedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databaromni<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databaromni<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databaromnicomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databaromnicomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstacked<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstacked<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedomni<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedomni<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedomnicomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedomnicomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databartruncated<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databartruncated<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databartruncatedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databartruncatedcomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datalogic2of5<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datalogic2of5<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrix<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrix<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrixrectangular<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrixrectangular<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrixrectangularextension<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrixrectangularextension<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function dotcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function dotcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean13<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean13<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean13composite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean13composite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean14<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean14<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean2<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean2<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean5<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean5<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean8<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean8<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean8composite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean8composite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function flattermarken<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function flattermarken<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_128<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_128<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_128composite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_128composite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_cc<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_cc<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1datamatrix<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1datamatrix<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1datamatrixrectangular<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1datamatrixrectangular<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dldatamatrix<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dldatamatrix<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dlqrcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dlqrcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dotcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dotcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1northamericancoupon<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1northamericancoupon<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1qrcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1qrcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hanxin<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hanxin<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcazteccode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcazteccode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccodablockf<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccodablockf<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccode128<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccode128<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccode39<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccode39<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcdatamatrix<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcdatamatrix<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcdatamatrixrectangular<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcdatamatrixrectangular<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcmicropdf417<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcmicropdf417<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcpdf417<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcpdf417<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcqrcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcqrcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function iata2of5<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function iata2of5<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function identcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function identcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function industrial2of5<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function industrial2of5<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function interleaved2of5<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function interleaved2of5<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function isbn<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function isbn<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ismn<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ismn<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function issn<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function issn<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function itf14<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function itf14<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function jabcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function jabcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function japanpost<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function japanpost<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function kix<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function kix<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function leitcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function leitcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function mailmark<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function mailmark<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function mands<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function mands<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function matrix2of5<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function matrix2of5<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function maxicode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function maxicode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function micropdf417<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function micropdf417<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function microqrcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function microqrcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function msi<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function msi<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function onecode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function onecode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pdf417<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pdf417<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pdf417compact<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pdf417compact<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pharmacode2<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pharmacode2<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pharmacode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pharmacode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function planet<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function planet<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function plessey<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function plessey<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function posicode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function posicode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function postnet<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function postnet<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pzn<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pzn<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function qrcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function qrcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function rationalizedCodabar<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function rationalizedCodabar<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function raw<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function raw<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function rectangularmicroqrcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function rectangularmicroqrcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function royalmail<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function royalmail<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function sscc18<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function sscc18<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function swissqrcode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function swissqrcode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function symbol<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function symbol<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function telepen<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function telepen<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function telepennumeric<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function telepennumeric<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ultracode<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ultracode<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upca<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upca<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upcacomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upcacomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upce<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upce<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upcecomposite<T>(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upcecomposite<T>(opts: RenderOptions, drawing: DrawingContext<T>): T;

}

export = BwipJs
