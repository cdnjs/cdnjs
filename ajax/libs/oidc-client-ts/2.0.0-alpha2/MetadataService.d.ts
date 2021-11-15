import { OidcClientSettingsStore } from "./OidcClientSettings";
import { OidcMetadata } from "./OidcMetadata";
export declare class MetadataService {
    private readonly _settings;
    private readonly _jsonService;
    private _metadataUrl;
    private _signingKeys;
    private _metadata;
    constructor(settings: OidcClientSettingsStore);
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
    protected _getMetadataProperty(name: keyof OidcMetadata, optional?: boolean): Promise<string | boolean | string[] | undefined>;
    getSigningKeys(): Promise<Record<string, string>[] | null>;
}
