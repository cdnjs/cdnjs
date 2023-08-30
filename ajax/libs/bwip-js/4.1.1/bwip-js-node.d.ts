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
/// <reference types="node" />

import { IncomingMessage as Request, ServerResponse as Response } from 'http';


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
    export type ToBufferCallback = (err: string | Error, png: Buffer) => void;
    export function toBuffer(opts: RenderOptions, callback: ToBufferCallback): void;
    export function toBuffer(opts: RenderOptions): Promise<Buffer>;
    export function request(req: Request, res: Response, opts?: RenderOptions): void;


    export function auspost(opts: RenderOptions): Promise<Buffer>;
    export function auspost(opts: RenderOptions, callback: ToBufferCallback): void;
    export function auspost(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function auspost(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function azteccode(opts: RenderOptions): Promise<Buffer>;
    export function azteccode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function azteccode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function azteccode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function azteccodecompact(opts: RenderOptions): Promise<Buffer>;
    export function azteccodecompact(opts: RenderOptions, callback: ToBufferCallback): void;
    export function azteccodecompact(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function azteccodecompact(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function aztecrune(opts: RenderOptions): Promise<Buffer>;
    export function aztecrune(opts: RenderOptions, callback: ToBufferCallback): void;
    export function aztecrune(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function aztecrune(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function bc412(opts: RenderOptions): Promise<Buffer>;
    export function bc412(opts: RenderOptions, callback: ToBufferCallback): void;
    export function bc412(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function bc412(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function channelcode(opts: RenderOptions): Promise<Buffer>;
    export function channelcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function channelcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function channelcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function codablockf(opts: RenderOptions): Promise<Buffer>;
    export function codablockf(opts: RenderOptions, callback: ToBufferCallback): void;
    export function codablockf(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function codablockf(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code11(opts: RenderOptions): Promise<Buffer>;
    export function code11(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code11(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code11(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code128(opts: RenderOptions): Promise<Buffer>;
    export function code128(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code128(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code128(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code16k(opts: RenderOptions): Promise<Buffer>;
    export function code16k(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code16k(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code16k(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code2of5(opts: RenderOptions): Promise<Buffer>;
    export function code2of5(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code32(opts: RenderOptions): Promise<Buffer>;
    export function code32(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code32(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code32(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code39(opts: RenderOptions): Promise<Buffer>;
    export function code39(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code39(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code39(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code39ext(opts: RenderOptions): Promise<Buffer>;
    export function code39ext(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code39ext(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code39ext(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code49(opts: RenderOptions): Promise<Buffer>;
    export function code49(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code49(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code49(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code93(opts: RenderOptions): Promise<Buffer>;
    export function code93(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code93(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code93(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function code93ext(opts: RenderOptions): Promise<Buffer>;
    export function code93ext(opts: RenderOptions, callback: ToBufferCallback): void;
    export function code93ext(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function code93ext(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function codeone(opts: RenderOptions): Promise<Buffer>;
    export function codeone(opts: RenderOptions, callback: ToBufferCallback): void;
    export function codeone(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function codeone(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function coop2of5(opts: RenderOptions): Promise<Buffer>;
    export function coop2of5(opts: RenderOptions, callback: ToBufferCallback): void;
    export function coop2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function coop2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function daft(opts: RenderOptions): Promise<Buffer>;
    export function daft(opts: RenderOptions, callback: ToBufferCallback): void;
    export function daft(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function daft(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpanded(opts: RenderOptions): Promise<Buffer>;
    export function databarexpanded(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarexpanded(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpanded(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedcomposite(opts: RenderOptions): Promise<Buffer>;
    export function databarexpandedcomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarexpandedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedstacked(opts: RenderOptions): Promise<Buffer>;
    export function databarexpandedstacked(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarexpandedstacked(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedstacked(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarexpandedstackedcomposite(opts: RenderOptions): Promise<Buffer>;
    export function databarexpandedstackedcomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarexpandedstackedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarexpandedstackedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarlimited(opts: RenderOptions): Promise<Buffer>;
    export function databarlimited(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarlimited(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarlimited(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarlimitedcomposite(opts: RenderOptions): Promise<Buffer>;
    export function databarlimitedcomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarlimitedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarlimitedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databaromni(opts: RenderOptions): Promise<Buffer>;
    export function databaromni(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databaromni(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databaromni(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databaromnicomposite(opts: RenderOptions): Promise<Buffer>;
    export function databaromnicomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databaromnicomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databaromnicomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstacked(opts: RenderOptions): Promise<Buffer>;
    export function databarstacked(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarstacked(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstacked(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedcomposite(opts: RenderOptions): Promise<Buffer>;
    export function databarstackedcomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarstackedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedomni(opts: RenderOptions): Promise<Buffer>;
    export function databarstackedomni(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarstackedomni(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedomni(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databarstackedomnicomposite(opts: RenderOptions): Promise<Buffer>;
    export function databarstackedomnicomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databarstackedomnicomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databarstackedomnicomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databartruncated(opts: RenderOptions): Promise<Buffer>;
    export function databartruncated(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databartruncated(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databartruncated(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function databartruncatedcomposite(opts: RenderOptions): Promise<Buffer>;
    export function databartruncatedcomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function databartruncatedcomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function databartruncatedcomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datalogic2of5(opts: RenderOptions): Promise<Buffer>;
    export function datalogic2of5(opts: RenderOptions, callback: ToBufferCallback): void;
    export function datalogic2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datalogic2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrix(opts: RenderOptions): Promise<Buffer>;
    export function datamatrix(opts: RenderOptions, callback: ToBufferCallback): void;
    export function datamatrix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrixrectangular(opts: RenderOptions): Promise<Buffer>;
    export function datamatrixrectangular(opts: RenderOptions, callback: ToBufferCallback): void;
    export function datamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function datamatrixrectangularextension(opts: RenderOptions): Promise<Buffer>;
    export function datamatrixrectangularextension(opts: RenderOptions, callback: ToBufferCallback): void;
    export function datamatrixrectangularextension(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function datamatrixrectangularextension(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function dotcode(opts: RenderOptions): Promise<Buffer>;
    export function dotcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function dotcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function dotcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean13(opts: RenderOptions): Promise<Buffer>;
    export function ean13(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ean13(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean13(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean13composite(opts: RenderOptions): Promise<Buffer>;
    export function ean13composite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ean13composite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean13composite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean14(opts: RenderOptions): Promise<Buffer>;
    export function ean14(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ean14(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean14(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean2(opts: RenderOptions): Promise<Buffer>;
    export function ean2(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ean2(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean2(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean5(opts: RenderOptions): Promise<Buffer>;
    export function ean5(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ean5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean8(opts: RenderOptions): Promise<Buffer>;
    export function ean8(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ean8(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean8(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ean8composite(opts: RenderOptions): Promise<Buffer>;
    export function ean8composite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ean8composite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ean8composite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function flattermarken(opts: RenderOptions): Promise<Buffer>;
    export function flattermarken(opts: RenderOptions, callback: ToBufferCallback): void;
    export function flattermarken(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function flattermarken(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_128(opts: RenderOptions): Promise<Buffer>;
    export function gs1_128(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1_128(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_128(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_128composite(opts: RenderOptions): Promise<Buffer>;
    export function gs1_128composite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1_128composite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_128composite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1_cc(opts: RenderOptions): Promise<Buffer>;
    export function gs1_cc(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1_cc(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1_cc(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1datamatrix(opts: RenderOptions): Promise<Buffer>;
    export function gs1datamatrix(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1datamatrix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1datamatrix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1datamatrixrectangular(opts: RenderOptions): Promise<Buffer>;
    export function gs1datamatrixrectangular(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1datamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1datamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dldatamatrix(opts: RenderOptions): Promise<Buffer>;
    export function gs1dldatamatrix(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1dldatamatrix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dldatamatrix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dlqrcode(opts: RenderOptions): Promise<Buffer>;
    export function gs1dlqrcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1dlqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dlqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1dotcode(opts: RenderOptions): Promise<Buffer>;
    export function gs1dotcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1dotcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1dotcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1northamericancoupon(opts: RenderOptions): Promise<Buffer>;
    export function gs1northamericancoupon(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1northamericancoupon(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1northamericancoupon(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function gs1qrcode(opts: RenderOptions): Promise<Buffer>;
    export function gs1qrcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function gs1qrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function gs1qrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hanxin(opts: RenderOptions): Promise<Buffer>;
    export function hanxin(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hanxin(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hanxin(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcazteccode(opts: RenderOptions): Promise<Buffer>;
    export function hibcazteccode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibcazteccode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcazteccode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccodablockf(opts: RenderOptions): Promise<Buffer>;
    export function hibccodablockf(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibccodablockf(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccodablockf(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccode128(opts: RenderOptions): Promise<Buffer>;
    export function hibccode128(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibccode128(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccode128(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibccode39(opts: RenderOptions): Promise<Buffer>;
    export function hibccode39(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibccode39(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibccode39(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcdatamatrix(opts: RenderOptions): Promise<Buffer>;
    export function hibcdatamatrix(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibcdatamatrix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcdatamatrix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcdatamatrixrectangular(opts: RenderOptions): Promise<Buffer>;
    export function hibcdatamatrixrectangular(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibcdatamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcdatamatrixrectangular(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcmicropdf417(opts: RenderOptions): Promise<Buffer>;
    export function hibcmicropdf417(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibcmicropdf417(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcmicropdf417(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcpdf417(opts: RenderOptions): Promise<Buffer>;
    export function hibcpdf417(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibcpdf417(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcpdf417(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function hibcqrcode(opts: RenderOptions): Promise<Buffer>;
    export function hibcqrcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function hibcqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function hibcqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function iata2of5(opts: RenderOptions): Promise<Buffer>;
    export function iata2of5(opts: RenderOptions, callback: ToBufferCallback): void;
    export function iata2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function iata2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function identcode(opts: RenderOptions): Promise<Buffer>;
    export function identcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function identcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function identcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function industrial2of5(opts: RenderOptions): Promise<Buffer>;
    export function industrial2of5(opts: RenderOptions, callback: ToBufferCallback): void;
    export function industrial2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function industrial2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function interleaved2of5(opts: RenderOptions): Promise<Buffer>;
    export function interleaved2of5(opts: RenderOptions, callback: ToBufferCallback): void;
    export function interleaved2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function interleaved2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function isbn(opts: RenderOptions): Promise<Buffer>;
    export function isbn(opts: RenderOptions, callback: ToBufferCallback): void;
    export function isbn(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function isbn(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ismn(opts: RenderOptions): Promise<Buffer>;
    export function ismn(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ismn(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ismn(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function issn(opts: RenderOptions): Promise<Buffer>;
    export function issn(opts: RenderOptions, callback: ToBufferCallback): void;
    export function issn(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function issn(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function itf14(opts: RenderOptions): Promise<Buffer>;
    export function itf14(opts: RenderOptions, callback: ToBufferCallback): void;
    export function itf14(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function itf14(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function jabcode(opts: RenderOptions): Promise<Buffer>;
    export function jabcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function jabcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function jabcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function japanpost(opts: RenderOptions): Promise<Buffer>;
    export function japanpost(opts: RenderOptions, callback: ToBufferCallback): void;
    export function japanpost(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function japanpost(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function kix(opts: RenderOptions): Promise<Buffer>;
    export function kix(opts: RenderOptions, callback: ToBufferCallback): void;
    export function kix(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function kix(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function leitcode(opts: RenderOptions): Promise<Buffer>;
    export function leitcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function leitcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function leitcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function mailmark(opts: RenderOptions): Promise<Buffer>;
    export function mailmark(opts: RenderOptions, callback: ToBufferCallback): void;
    export function mailmark(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function mailmark(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function mands(opts: RenderOptions): Promise<Buffer>;
    export function mands(opts: RenderOptions, callback: ToBufferCallback): void;
    export function mands(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function mands(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function matrix2of5(opts: RenderOptions): Promise<Buffer>;
    export function matrix2of5(opts: RenderOptions, callback: ToBufferCallback): void;
    export function matrix2of5(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function matrix2of5(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function maxicode(opts: RenderOptions): Promise<Buffer>;
    export function maxicode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function maxicode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function maxicode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function micropdf417(opts: RenderOptions): Promise<Buffer>;
    export function micropdf417(opts: RenderOptions, callback: ToBufferCallback): void;
    export function micropdf417(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function micropdf417(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function microqrcode(opts: RenderOptions): Promise<Buffer>;
    export function microqrcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function microqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function microqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function msi(opts: RenderOptions): Promise<Buffer>;
    export function msi(opts: RenderOptions, callback: ToBufferCallback): void;
    export function msi(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function msi(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function onecode(opts: RenderOptions): Promise<Buffer>;
    export function onecode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function onecode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function onecode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pdf417(opts: RenderOptions): Promise<Buffer>;
    export function pdf417(opts: RenderOptions, callback: ToBufferCallback): void;
    export function pdf417(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pdf417(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pdf417compact(opts: RenderOptions): Promise<Buffer>;
    export function pdf417compact(opts: RenderOptions, callback: ToBufferCallback): void;
    export function pdf417compact(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pdf417compact(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pharmacode(opts: RenderOptions): Promise<Buffer>;
    export function pharmacode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function pharmacode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pharmacode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pharmacode2(opts: RenderOptions): Promise<Buffer>;
    export function pharmacode2(opts: RenderOptions, callback: ToBufferCallback): void;
    export function pharmacode2(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pharmacode2(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function planet(opts: RenderOptions): Promise<Buffer>;
    export function planet(opts: RenderOptions, callback: ToBufferCallback): void;
    export function planet(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function planet(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function plessey(opts: RenderOptions): Promise<Buffer>;
    export function plessey(opts: RenderOptions, callback: ToBufferCallback): void;
    export function plessey(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function plessey(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function posicode(opts: RenderOptions): Promise<Buffer>;
    export function posicode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function posicode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function posicode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function postnet(opts: RenderOptions): Promise<Buffer>;
    export function postnet(opts: RenderOptions, callback: ToBufferCallback): void;
    export function postnet(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function postnet(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function pzn(opts: RenderOptions): Promise<Buffer>;
    export function pzn(opts: RenderOptions, callback: ToBufferCallback): void;
    export function pzn(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function pzn(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function qrcode(opts: RenderOptions): Promise<Buffer>;
    export function qrcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function qrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function qrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function rationalizedCodabar(opts: RenderOptions): Promise<Buffer>;
    export function rationalizedCodabar(opts: RenderOptions, callback: ToBufferCallback): void;
    export function rationalizedCodabar(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function rationalizedCodabar(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function raw(opts: RenderOptions): Promise<Buffer>;
    export function raw(opts: RenderOptions, callback: ToBufferCallback): void;
    export function raw(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function raw(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function rectangularmicroqrcode(opts: RenderOptions): Promise<Buffer>;
    export function rectangularmicroqrcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function rectangularmicroqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function rectangularmicroqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function royalmail(opts: RenderOptions): Promise<Buffer>;
    export function royalmail(opts: RenderOptions, callback: ToBufferCallback): void;
    export function royalmail(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function royalmail(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function sscc18(opts: RenderOptions): Promise<Buffer>;
    export function sscc18(opts: RenderOptions, callback: ToBufferCallback): void;
    export function sscc18(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function sscc18(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function swissqrcode(opts: RenderOptions): Promise<Buffer>;
    export function swissqrcode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function swissqrcode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function swissqrcode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function symbol(opts: RenderOptions): Promise<Buffer>;
    export function symbol(opts: RenderOptions, callback: ToBufferCallback): void;
    export function symbol(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function symbol(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function telepen(opts: RenderOptions): Promise<Buffer>;
    export function telepen(opts: RenderOptions, callback: ToBufferCallback): void;
    export function telepen(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function telepen(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function telepennumeric(opts: RenderOptions): Promise<Buffer>;
    export function telepennumeric(opts: RenderOptions, callback: ToBufferCallback): void;
    export function telepennumeric(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function telepennumeric(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function ultracode(opts: RenderOptions): Promise<Buffer>;
    export function ultracode(opts: RenderOptions, callback: ToBufferCallback): void;
    export function ultracode(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function ultracode(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upca(opts: RenderOptions): Promise<Buffer>;
    export function upca(opts: RenderOptions, callback: ToBufferCallback): void;
    export function upca(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upca(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upcacomposite(opts: RenderOptions): Promise<Buffer>;
    export function upcacomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function upcacomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upcacomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upce(opts: RenderOptions): Promise<Buffer>;
    export function upce(opts: RenderOptions, callback: ToBufferCallback): void;
    export function upce(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upce(opts: RenderOptions, drawing: DrawingContext<T>): T;
    export function upcecomposite(opts: RenderOptions): Promise<Buffer>;
    export function upcecomposite(opts: RenderOptions, callback: ToBufferCallback): void;
    export function upcecomposite(opts: RenderOptions, drawing: DrawingContext<Promise<T>>): Promise<T>;
    export function upcecomposite(opts: RenderOptions, drawing: DrawingContext<T>): T;

}

export = BwipJs
