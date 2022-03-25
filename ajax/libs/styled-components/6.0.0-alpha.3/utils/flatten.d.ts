import StyleSheet from '../sheet';
import { ExecutionContext, ExtensibleObject, Interpolation, Stringifier } from '../types';
export declare const objToCssArray: (obj: ExtensibleObject, prevKey?: string | undefined) => string[];
export default function flatten<Props = unknown>(chunk: Interpolation<Props>, executionContext?: ExecutionContext & Props, styleSheet?: StyleSheet, stylisInstance?: Stringifier): Interpolation<Props>;
