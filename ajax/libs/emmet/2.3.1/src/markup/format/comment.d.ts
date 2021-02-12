import { AbbreviationNode } from '@emmetio/abbreviation';
import { TemplateToken } from './template';
import { Config } from '../../config';
import { HTMLWalkState } from './html';
export interface CommentWalkState {
    enabled: boolean;
    trigger: string[];
    before?: TemplateToken[];
    after?: TemplateToken[];
}
export declare function createCommentState(config: Config): CommentWalkState;
/**
 * Adds comment prefix for given node, if required
 */
export declare function commentNodeBefore(node: AbbreviationNode, state: HTMLWalkState): void;
/**
 * Adds comment suffix for given node, if required
 */
export declare function commentNodeAfter(node: AbbreviationNode, state: HTMLWalkState): void;
