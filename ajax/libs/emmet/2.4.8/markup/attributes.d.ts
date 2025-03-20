import type { AbbreviationNode } from '@emmetio/abbreviation';
import type { Config } from '../config.js';
/**
 * Merges attributes in current node: de-duplicates attributes with the same name
 * and merges class names
 */
export default function mergeAttributes(node: AbbreviationNode, config: Config): void;
