export declare class JsonService {
    private _contentTypes;
    private _XMLHttpRequest;
    private _jwtHandler;
    constructor(additionalContentTypes?: string[] | null, XMLHttpRequestCtor?: {
        new (): XMLHttpRequest;
        prototype: XMLHttpRequest;
        readonly DONE: number;
        readonly HEADERS_RECEIVED: number;
        readonly LOADING: number;
        readonly OPENED: number;
        readonly UNSENT: number;
    }, jwtHandler?: any);
    getJson(url: string, token?: string): Promise<any>;
    postForm(url: string, payload: any, basicAuth?: string): Promise<any>;
}
