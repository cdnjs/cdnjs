import ChangeDetails from '../core/change-details';
import { type TailDetails } from '../core/tail-details';
import { type Direction } from '../core/utils';
import Masked, { type AppendFlags, type ExtractFlags, type MaskedOptions, type MaskedState } from './base';
import { type FactoryArg, type ExtendFactoryArgOptions } from './factory';
import type PatternBlock from './pattern/block';
import ChunksTailDetails from './pattern/chunk-tail-details';
import PatternFixedDefinition from './pattern/fixed-definition';
import PatternInputDefinition from './pattern/input-definition';
import './regexp';
export type MaskedPatternOptions<Value = string, M extends MaskedPattern<Value> = MaskedPattern<Value>, Props extends keyof M = never> = MaskedOptions<M, 'definitions' | 'blocks' | 'placeholderChar' | 'displayChar' | 'lazy' | Props>;
export type Definitions = {
    [k: string]: FactoryArg;
};
export type MaskedPatternState = MaskedState & {
    _blocks: Array<MaskedState>;
};
export type BlockPosData = {
    index: number;
    offset: number;
};
/** Pattern mask */
export default class MaskedPattern<Value = string> extends Masked<Value> {
    static DEFAULTS: Record<string, any>;
    static STOP_CHAR: string;
    static ESCAPE_CHAR: string;
    static InputDefinition: typeof PatternInputDefinition;
    static FixedDefinition: typeof PatternFixedDefinition;
    mask: string;
    /** */
    blocks: {
        [key: string]: ExtendFactoryArgOptions<{
            expose?: boolean;
        }>;
    };
    /** */
    definitions: Definitions;
    /** Single char for empty input */
    placeholderChar: string;
    /** Single char for filled input */
    displayChar: string;
    /** Show placeholder only when needed */
    lazy: boolean;
    /** Enable characters overwriting */
    overwrite?: boolean | 'shift' | undefined;
    /** */
    eager?: boolean | 'remove' | 'append' | undefined;
    /** */
    skipInvalid?: boolean | undefined;
    _blocks: Array<PatternBlock>;
    _maskedBlocks: {
        [key: string]: Array<number>;
    };
    _stops: Array<number>;
    exposeBlock?: Masked;
    constructor(opts: MaskedPatternOptions<Value>);
    updateOptions(opts: Partial<MaskedPatternOptions<Value>>): void;
    _update(opts: Partial<MaskedPatternOptions<Value>>): void;
    _rebuildMask(): void;
    get state(): MaskedPatternState;
    set state(state: MaskedPatternState);
    reset(): void;
    get isComplete(): boolean;
    get isFilled(): boolean;
    get isFixed(): boolean;
    get isOptional(): boolean;
    doCommit(): void;
    get unmaskedValue(): string;
    set unmaskedValue(unmaskedValue: string);
    get value(): string;
    set value(value: string);
    get typedValue(): Value;
    set typedValue(value: Value);
    get displayValue(): string;
    appendTail(tail: string | String | TailDetails): ChangeDetails;
    _appendEager(): ChangeDetails;
    _appendCharRaw(ch: string, flags?: AppendFlags<MaskedPatternState>): ChangeDetails;
    extractTail(fromPos?: number, toPos?: number): ChunksTailDetails;
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    _findStopBefore(blockIndex: number): number | undefined;
    /** Appends placeholder depending on laziness */
    _appendPlaceholder(toBlockIndex?: number): ChangeDetails;
    /** Finds block in pos */
    _mapPosToBlock(pos: number): BlockPosData | undefined;
    _blockStartPos(blockIndex: number): number;
    _forEachBlocksInRange(fromPos: number, toPos: number | undefined, fn: (block: PatternBlock, blockIndex: number, fromPos: number, toPos: number) => void): void;
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    nearestInputPos(cursorPos: number, direction?: Direction): number;
    totalInputPositions(fromPos?: number, toPos?: number): number;
    /** Get block by name */
    maskedBlock(name: string): PatternBlock | undefined;
    /** Get all blocks by name */
    maskedBlocks(name: string): Array<PatternBlock>;
}
//# sourceMappingURL=pattern.d.ts.map