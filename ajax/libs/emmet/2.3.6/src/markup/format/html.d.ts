import { Abbreviation, AbbreviationNode } from '@emmetio/abbreviation';
import { WalkState } from './walk';
import { CommentWalkState } from './comment';
import { Config } from '../../config';
declare type WalkNext = (node: AbbreviationNode, index: number, items: AbbreviationNode[]) => void;
export interface HTMLWalkState extends WalkState {
    comment: CommentWalkState;
}
export default function html(abbr: Abbreviation, config: Config): string;
export declare function pushSnippet(node: AbbreviationNode, state: WalkState, next: WalkNext): boolean;
export {};
