import { MetadataService } from "./MetadataService";
import { OidcClientSettingsStore } from "./OidcClientSettings";
export declare class UserInfoService {
    private _settings;
    private _jsonService;
    private _metadataService;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    getClaims(token?: string): Promise<any>;
    protected _getClaimsFromJwt(responseText: string): Promise<any>;
    protected _filterByAlg(keys: Record<string, string>[], alg: string): Record<string, string>[];
}
