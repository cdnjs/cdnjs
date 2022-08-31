import Keyframes from '../models/Keyframes';
import { Interpolation, Styles } from '../types';
export default function keyframes<Props = unknown>(strings: Styles<Props>, ...interpolations: Array<Interpolation<Props>>): Keyframes;
