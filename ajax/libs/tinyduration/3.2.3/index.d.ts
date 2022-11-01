interface DurationValues {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}
export declare type Duration = {
    negative?: boolean;
} & DurationValues;
export declare const InvalidDurationError: Error;
export declare function parse(durationStr: string): Duration;
export declare function serialize(duration: Duration): string;
export {};
