import { Interpolation } from '../types';
export default function interleave<Props extends object>(strings: TemplateStringsArray, interpolations: Interpolation<Props>[]): Interpolation<Props>[];
