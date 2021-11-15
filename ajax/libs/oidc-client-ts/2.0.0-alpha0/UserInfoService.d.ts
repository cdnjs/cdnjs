import { JsonService } from './JsonService';
import { MetadataService } from './MetadataService';
import { OidcClientSettingsStore } from './OidcClientSettings';
export declare class UserInfoService {
    private _settings;
    private _jsonService;
    private _metadataService;
    constructor(settings: OidcClientSettingsStore, JsonServiceCtor?: typeof JsonService, MetadataServiceCtor?: typeof MetadataService);
    getClaims(token?: string): Promise<any>;
    _getClaimsFromJwt(req: any): Promise<any>;
    _filterByAlg(keys: any[], alg: string): any[];
}
