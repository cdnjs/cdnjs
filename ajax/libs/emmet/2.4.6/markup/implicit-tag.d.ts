import type { AbbreviationNode } from '@emmetio/abbreviation';
import { type Container } from './utils.js';
import type { Config } from '../config.js';
export default function implicitTag(node: AbbreviationNode, ancestors: Container[], config: Config): void;
export declare function resolveImplicitTag(node: AbbreviationNode, ancestors: Container[], config: Config): void;
