import { Interpolation } from '../types';
export default function interleave<Props = unknown>(strings: TemplateStringsArray, interpolations: Interpolation<Props>[]): Interpolation<Props>[];
