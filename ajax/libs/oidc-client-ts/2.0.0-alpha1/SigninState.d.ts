import { State } from "./State";
export declare class SigninState extends State {
    readonly nonce: string | undefined;
    readonly code_verifier: string | undefined;
    readonly code_challenge: string | undefined;
    readonly authority: string;
    readonly client_id: string;
    readonly redirect_uri: string;
    readonly scope: string;
    readonly client_secret: string | undefined;
    readonly extraTokenParams: Record<string, any> | undefined;
    readonly response_mode: string | undefined;
    readonly skipUserInfo: boolean | undefined;
    constructor(args: {
        id?: string;
        data?: any;
        created?: number;
        request_type: string;
        nonce?: string | boolean;
        code_verifier?: string | boolean;
        authority: string;
        client_id: string;
        redirect_uri: string;
        scope: string;
        client_secret?: string;
        extraTokenParams?: Record<string, any>;
        response_mode?: string;
        skipUserInfo?: boolean;
    });
    toStorageString(): string;
    static fromStorageString(storageString: string): SigninState;
}
