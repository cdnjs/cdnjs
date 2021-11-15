import { State } from './State';
export declare class SigninState extends State {
    private _nonce;
    private _code_verifier;
    private _code_challenge;
    private _redirect_uri;
    private _authority;
    private _client_id;
    private _response_mode;
    private _client_secret;
    private _scope;
    private _extraTokenParams;
    private _skipUserInfo;
    constructor({ nonce, authority, client_id, redirect_uri, code_verifier, response_mode, client_secret, scope, extraTokenParams, skipUserInfo }?: any);
    get nonce(): any;
    get authority(): any;
    get client_id(): any;
    get redirect_uri(): any;
    get code_verifier(): any;
    get code_challenge(): any;
    get response_mode(): any;
    get client_secret(): any;
    get scope(): any;
    get extraTokenParams(): any;
    get skipUserInfo(): any;
    toStorageString(): string;
    static fromStorageString(storageString: string): SigninState;
}
