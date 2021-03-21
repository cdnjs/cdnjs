import { ColorValue } from '@emmetio/css-abbreviation';
export default function color(token: ColorValue, shortHex?: boolean): string;
/**
 * Output given color as hex value
 * @param short Produce short value (e.g. #fff instead of #ffffff), if possible
 */
export declare function asHex(token: ColorValue, short?: boolean): string;
export declare function frac(num: number, digits?: number): string;
