import { AbbreviationNode } from '@emmetio/abbreviation';
import { Config } from '../config';
/**
 * Merges attributes in current node: de-duplicates attributes with the same name
 * and merges class names
 */
export default function mergeAttributes(node: AbbreviationNode, config: Config): void;
