import { MetadataService } from "./MetadataService";
import { OidcClientSettingsStore } from "./OidcClientSettings";
export declare class TokenRevocationClient {
    private _settings;
    private _metadataService;
    constructor(settings: OidcClientSettingsStore, metadataService: MetadataService);
    revoke(token: string, required: boolean, type?: string): Promise<void>;
    protected _revoke(url: string, client_id: string, client_secret: string | undefined, token: string, type: string): Promise<void>;
}
