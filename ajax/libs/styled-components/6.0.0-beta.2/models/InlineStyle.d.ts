import { IInlineStyleConstructor, StyleSheet } from '../types';
export declare const resetStyleCache: () => void;
/**
 * InlineStyle takes arbitrary CSS and generates a flat object
 */
export default function makeInlineStyleClass<Props = unknown>(styleSheet: StyleSheet): IInlineStyleConstructor<Props>;
