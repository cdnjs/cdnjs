import { MetadataService } from './MetadataService';
import { OidcClientSettingsStore } from './OidcClientSettings';
export declare class TokenRevocationClient {
    private _settings;
    private _XMLHttpRequestCtor;
    private _metadataService;
    constructor(settings: OidcClientSettingsStore, XMLHttpRequestCtor?: {
        new (): XMLHttpRequest;
        prototype: XMLHttpRequest;
        readonly DONE: number;
        readonly HEADERS_RECEIVED: number;
        readonly LOADING: number;
        readonly OPENED: number;
        readonly UNSENT: number;
    }, MetadataServiceCtor?: typeof MetadataService);
    revoke(token: string, required: boolean, type?: string): Promise<void | undefined>;
    _revoke(url: string, client_id: string, client_secret: string | undefined, token: string, type: string): Promise<void>;
}
