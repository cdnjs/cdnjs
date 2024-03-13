import type { AbbreviationNode } from '@emmetio/abbreviation';
/**
 * Preprocessor of `<label>` element: if it contains `<input>`, remove `for` attribute
 * and `id` from input
 */
export default function label(node: AbbreviationNode): void;
