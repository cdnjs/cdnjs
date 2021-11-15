import { MetadataService } from "./MetadataService";
import { OidcClientSettingsStore } from "./OidcClientSettings";
export declare class TokenClient {
    private readonly _settings;
    private readonly _jsonService;
    private readonly _metadataService;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    exchangeCode(args?: any): Promise<any>;
    exchangeRefreshToken(args?: any): Promise<any>;
}
