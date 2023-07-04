interface DurationValues {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}
export type Duration = {
    negative?: boolean;
} & DurationValues;
export type ParseConfig = {
    allowMultipleFractions?: boolean;
};
export declare const InvalidDurationError: Error;
export declare const MultipleFractionsError: Error;
export declare function parse(durationStr: string, config?: ParseConfig): Duration;
export declare function serialize(duration: Duration): string;
export {};
