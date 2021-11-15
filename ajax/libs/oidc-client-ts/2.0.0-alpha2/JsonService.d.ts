export declare class JsonService {
    private _contentTypes;
    private _jwtHandler;
    constructor(additionalContentTypes?: string[], jwtHandler?: any);
    getJson(url: string, token?: string): Promise<any>;
    postForm(url: string, payload: any, basicAuth?: string): Promise<any>;
}
