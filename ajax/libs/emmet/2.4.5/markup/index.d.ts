import type { Abbreviation } from '@emmetio/abbreviation';
import type { Config } from '../config.js';
/**
 * Parses given Emmet abbreviation into a final abbreviation tree with all
 * required transformations applied
 */
export default function parse(abbr: string | Abbreviation, config: Config): Abbreviation;
/**
 * Converts given abbreviation to string according to provided `config`
 */
export declare function stringify(abbr: Abbreviation, config: Config): string;
