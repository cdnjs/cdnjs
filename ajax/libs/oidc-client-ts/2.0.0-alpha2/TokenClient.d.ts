import { MetadataService } from "./MetadataService";
import { OidcClientSettingsStore } from "./OidcClientSettings";
interface ExchangeCodeArgs {
    client_id?: string;
    client_secret?: string;
    redirect_uri?: string;
    grant_type?: string;
    code: string;
    code_verifier: string;
}
interface ExchangeRefreshTokenArgs {
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
    refresh_token: string;
}
export declare class TokenClient {
    private readonly _settings;
    private readonly _jsonService;
    private readonly _metadataService;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    exchangeCode(args: ExchangeCodeArgs): Promise<any>;
    exchangeRefreshToken(args: ExchangeRefreshTokenArgs): Promise<any>;
}
export {};
