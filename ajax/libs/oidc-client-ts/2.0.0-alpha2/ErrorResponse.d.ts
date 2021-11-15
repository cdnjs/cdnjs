export declare class ErrorResponse extends Error {
    readonly name: string;
    readonly error: string;
    readonly error_description: string | undefined;
    readonly error_uri: string | undefined;
    readonly state: any;
    readonly session_state: string | undefined;
    constructor(args: {
        error?: string;
        error_description?: string;
        error_uri?: string;
        state?: string;
        session_state?: string;
    });
}
