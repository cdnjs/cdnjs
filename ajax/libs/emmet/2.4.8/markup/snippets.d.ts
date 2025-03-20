import type { Abbreviation } from '@emmetio/abbreviation';
import type { Config } from '../config.js';
/**
 * Finds matching snippet from `registry` and resolves it into a parsed abbreviation.
 * Resolved node is then updated or replaced with matched abbreviation tree.
 *
 * A HTML registry basically contains aliases to another Emmet abbreviations,
 * e.g. a predefined set of name, attributes and so on, possibly a complex
 * abbreviation with multiple elements. So we have to get snippet, parse it
 * and recursively resolve it.
 */
export default function resolveSnippets(abbr: Abbreviation, config: Config): Abbreviation;
