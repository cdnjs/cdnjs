import type { AbbreviationNode } from '@emmetio/abbreviation';
import { type TemplateToken } from './template.js';
import { Config } from '../../config.js';
import { HTMLWalkState } from './html.js';
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
