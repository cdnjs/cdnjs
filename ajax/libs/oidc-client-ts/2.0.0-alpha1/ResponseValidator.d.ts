import { MetadataService } from "./MetadataService";
import { UserInfoService } from "./UserInfoService";
import { TokenClient } from "./TokenClient";
import { OidcClientSettingsStore } from "./OidcClientSettings";
import { SigninState } from "./SigninState";
import { SigninResponse } from "./SigninResponse";
import { State } from "./State";
import { SignoutResponse } from "./SignoutResponse";
export declare class ResponseValidator {
    protected readonly _settings: OidcClientSettingsStore;
    protected readonly _metadataService: MetadataService;
    protected readonly _userInfoService: UserInfoService;
    protected readonly _tokenClient: TokenClient;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    validateSigninResponse(state: SigninState, response: SigninResponse): Promise<SigninResponse>;
    validateSignoutResponse(state: State, response: SignoutResponse): SignoutResponse;
    protected _processSigninParams(state: SigninState, response: SigninResponse): SigninResponse;
    protected _processClaims(state: SigninState, response: SigninResponse): Promise<SigninResponse>;
    protected _mergeClaims(claims1: any, claims2: any): any;
    protected _filterProtocolClaims(claims: any): any;
    protected _validateTokens(state: SigninState, response: SigninResponse): Promise<SigninResponse>;
    protected _processCode(state: SigninState, response: SigninResponse): Promise<SigninResponse>;
    protected _validateIdTokenAttributes(state: SigninState, response: SigninResponse, id_token: string): Promise<SigninResponse>;
    protected _getSigningKeyForJwt(jwt: any): Promise<Record<string, string> | null>;
    protected _getSigningKeyForJwtWithSingleRetry(jwt: any): Promise<Record<string, string> | null>;
    protected _validateIdToken(state: SigninState, response: SigninResponse, id_token: string): Promise<SigninResponse>;
    protected _filterByAlg(keys: Record<string, string>[], alg: string): Record<string, string>[];
    protected _validateAccessToken(response: SigninResponse, access_token: string): SigninResponse;
}
