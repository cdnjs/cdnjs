import type { TailDetails, AppendTail } from './tail-details';
import type ChangeDetails from './change-details';
type ContinuousTailState = Pick<ContinuousTailDetails, 'value' | 'from' | 'stop'>;
/** Provides details of continuous extracted tail */
export default class ContinuousTailDetails implements TailDetails {
    /** Tail value as string */
    value: string;
    /** Tail start position */
    from: number;
    /** Start position */
    stop?: number;
    constructor(value?: string, from?: number, stop?: number);
    toString(): string;
    extend(tail: string | TailDetails): void;
    appendTo(masked: AppendTail): ChangeDetails;
    get state(): ContinuousTailState;
    set state(state: ContinuousTailState);
    unshift(beforePos?: number): string;
    shift(): string;
}
export {};
//# sourceMappingURL=continuous-tail-details.d.ts.map