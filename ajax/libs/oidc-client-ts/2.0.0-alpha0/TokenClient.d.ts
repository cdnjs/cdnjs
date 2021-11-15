import { JsonService } from './JsonService';
import { MetadataService } from './MetadataService';
import { OidcClientSettingsStore } from './OidcClientSettings';
export declare class TokenClient {
    private _settings;
    private _jsonService;
    private _metadataService;
    constructor(settings: OidcClientSettingsStore, JsonServiceCtor?: typeof JsonService, MetadataServiceCtor?: typeof MetadataService);
    exchangeCode(args?: any): Promise<any>;
    exchangeRefreshToken(args?: any): Promise<any>;
}
