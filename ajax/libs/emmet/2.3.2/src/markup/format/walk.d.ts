import { AbbreviationNode, Abbreviation } from '@emmetio/abbreviation';
import { OutputStream } from '../../output-stream';
import { Config } from '../../config';
export declare type WalkNext = (node: AbbreviationNode, index: number, items: AbbreviationNode[]) => void;
export declare type Visitor<S extends WalkState> = (node: AbbreviationNode, index: number, items: AbbreviationNode[], state: S, next: WalkNext) => void;
export interface WalkState {
    /** Context node */
    current: AbbreviationNode;
    /** Immediate parent of currently iterated method */
    parent?: AbbreviationNode;
    /** List of all ancestors of context node */
    ancestors: AbbreviationNode[];
    /** Current output config */
    config: Config;
    /** Output stream */
    out: OutputStream;
    /** Current field index, used to output field marks for editor tabstops */
    field: number;
}
export default function walk<S extends WalkState>(abbr: Abbreviation, visitor: Visitor<S>, state: S): void;
export declare function createWalkState(config: Config): WalkState;
