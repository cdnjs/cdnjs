export declare class ErrorResponse extends Error {
    readonly name: string;
    readonly error: string;
    readonly error_description: string;
    readonly error_uri: string;
    readonly state: any;
    readonly session_state?: string;
    constructor({ error, error_description, error_uri, state, session_state }: any);
}
