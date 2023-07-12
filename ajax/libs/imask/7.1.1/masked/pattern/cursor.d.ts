import type MaskedPattern from '../pattern';
import type PatternBlock from './block';
type PatternCursorState = {
    offset: number;
    index: number;
    ok: boolean;
};
export default class PatternCursor<Value> {
    masked: MaskedPattern<Value>;
    offset: number;
    index: number;
    ok: boolean;
    _log: PatternCursorState[];
    constructor(masked: MaskedPattern<Value>, pos: number);
    get block(): PatternBlock;
    get pos(): number;
    get state(): PatternCursorState;
    set state(s: PatternCursorState);
    pushState(): void;
    popState(): PatternCursorState | undefined;
    bindBlock(): void;
    _pushLeft(fn: () => boolean | undefined): boolean;
    _pushRight(fn: () => boolean | undefined): boolean;
    pushLeftBeforeFilled(): boolean;
    pushLeftBeforeInput(): boolean;
    pushLeftBeforeRequired(): boolean;
    pushRightBeforeFilled(): boolean;
    pushRightBeforeInput(): boolean;
    pushRightBeforeRequired(): boolean;
}
export {};
//# sourceMappingURL=cursor.d.ts.map