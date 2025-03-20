import type { Abbreviation, AbbreviationNode } from '@emmetio/abbreviation';
import { type WalkState } from './walk.js';
import { type CommentWalkState } from './comment.js';
import type { Config } from '../../config.js';
type WalkNext = (node: AbbreviationNode, index: number, items: AbbreviationNode[]) => void;
export interface HTMLWalkState extends WalkState {
    comment: CommentWalkState;
}
export default function html(abbr: Abbreviation, config: Config): string;
export declare function pushSnippet(node: AbbreviationNode, state: WalkState, next: WalkNext): boolean;
export {};
