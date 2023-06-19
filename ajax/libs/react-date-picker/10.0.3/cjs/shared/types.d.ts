export type ClassName = string | null | undefined | (string | null | undefined)[];
export type Detail = 'century' | 'decade' | 'year' | 'month';
export type LooseValuePiece = string | Date | null;
export type LooseValue = LooseValuePiece | [LooseValuePiece, LooseValuePiece];
export type RangeType = 'century' | 'decade' | 'year' | 'month' | 'day';
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
export {};
