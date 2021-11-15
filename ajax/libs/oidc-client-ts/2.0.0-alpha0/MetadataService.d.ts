import { JsonService } from './JsonService';
import { OidcClientSettingsStore } from './OidcClientSettings';
import { OidcMetadata } from './OidcMetadata';
export declare class MetadataService {
    private _settings;
    private _jsonService;
    private _metadataUrl;
    constructor(settings: OidcClientSettingsStore, JsonServiceCtor?: typeof JsonService);
    get metadataUrl(): string;
    resetSigningKeys(): void;
    getMetadata(): Promise<Partial<OidcMetadata>>;
    getIssuer(): Promise<string>;
    getAuthorizationEndpoint(): Promise<string>;
    getUserInfoEndpoint(): Promise<string>;
    getTokenEndpoint(optional?: boolean): Promise<string | undefined>;
    getCheckSessionIframe(): Promise<string | undefined>;
    getEndSessionEndpoint(): Promise<string | undefined>;
    getRevocationEndpoint(): Promise<string | undefined>;
    getKeysEndpoint(optional?: boolean): Promise<string | undefined>;
    _getMetadataProperty(name: keyof OidcMetadata, optional?: boolean): Promise<string | boolean | string[] | undefined>;
    getSigningKeys(): Promise<any[] | undefined>;
}
