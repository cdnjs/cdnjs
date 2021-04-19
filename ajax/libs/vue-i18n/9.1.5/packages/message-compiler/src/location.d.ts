export interface SourceLocation {
    start: Position;
    end: Position;
    source?: string;
}
export declare const LocationStub: SourceLocation;
export interface Position {
    offset: number;
    line: number;
    column: number;
}
export declare function createPosition(line: number, column: number, offset: number): Position;
export declare function createLocation(start: Position, end: Position, source?: string): SourceLocation;
//# sourceMappingURL=location.d.ts.map