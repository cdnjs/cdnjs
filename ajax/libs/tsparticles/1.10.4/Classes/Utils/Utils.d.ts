import { ICoordinates } from "../../Interfaces/ICoordinates";
import { IHsl } from "../../Interfaces/IHsl";
import { IRgb } from "../../Interfaces/IRgb";
import { IOptions } from "../../Interfaces/Options/IOptions";
import { IParticlesColor } from "../../Interfaces/Options/Particles/IParticlesColor";
import { ICharacterShape } from "../../Interfaces/Options/Particles/Shape/ICharacterShape";
declare type CSSOMString = string;
declare type FontFaceLoadStatus = 'unloaded' | 'loading' | 'loaded' | 'error';
declare type FontFaceSetStatus = 'loading' | 'loaded';
interface FontFace {
    family: CSSOMString;
    style: CSSOMString;
    weight: CSSOMString;
    stretch: CSSOMString;
    unicodeRange: CSSOMString;
    variant: CSSOMString;
    featureSettings: CSSOMString;
    variationSettings: CSSOMString;
    display: CSSOMString;
    readonly status: FontFaceLoadStatus;
    readonly loaded: Promise<FontFace>;
    load(): Promise<FontFace>;
}
interface FontFaceSet {
    readonly status: FontFaceSetStatus;
    readonly ready: Promise<FontFaceSet>;
    check(font: string, text?: string): Boolean;
    load(font: string, text?: string): Promise<FontFace[]>;
}
declare global {
    interface Document {
        fonts: FontFaceSet;
    }
}
export declare class Utils {
    /**
     * Converts hexadecimal string (HTML color code) in a [[IRgb]] object
     * @param hex the hexadecimal string (#f70 or #ff7700)
     */
    static hexToRgb(hex: string): IRgb | undefined;
    /**
     * Converts a Hue Saturation Lightness ([[IHsl]]) object in a [[IRgb]] object
     * @param hsl
     */
    static hslToRgb(hsl: IHsl): IRgb;
    /**
     * Generate a random RGBA color
     * @param min a minimum seed value for all 3 values
     */
    static getRandomColorRGBA(min?: number): IRgb;
    /**
     * Clamps a number between a minimum and maximum value
     * @param num the source number
     * @param min the minimum value
     * @param max the maximum value
     */
    static clamp(num: number, min: number, max: number): number;
    /**
     * Check if a value is equal to the destination, if same type, or is in the provided array
     * @param value the value to check
     * @param array the data array or single value
     */
    static isInArray<T>(value: T, array: T[] | T): boolean;
    /**
     *
     * @param comp1
     * @param comp2
     * @param weight1
     * @param weight2
     */
    static mixComponents(comp1: number, comp2: number, weight1: number, weight2: number): number;
    /**
     * Prepares a rgba() css function from a [[IRgb]] object
     * @param color the [[IRgb]] color to convert
     */
    static getStyleFromColor(color: IRgb): string;
    /**
     * Get Particle base velocity
     * @param options the options to use for calculating the velocity
     */
    static getParticleBaseVelocity(options: IOptions): ICoordinates;
    /**
     * Gets the particles color
     * @param color the input color to convert in [[IRgb]] object
     */
    static getParticleColor(color: IParticlesColor): IRgb | undefined;
    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    static getDistanceBetweenCoordinates(pointA: ICoordinates, pointB: ICoordinates): number;
    static loadFont(character: ICharacterShape): Promise<void>;
    /**
     *
     * @param p
     * @param q
     * @param t
     */
    private static hue2rgb;
}
export {};
