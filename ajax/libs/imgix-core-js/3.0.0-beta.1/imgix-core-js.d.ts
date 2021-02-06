// Type definitions for imgix-core-js.js

declare class ImgixClient {
    domain: string;
    useHTTPS: boolean;
    includeLibraryParam: boolean;
    secureURLToken: string;

    constructor(opts: {domain: string; secureURLToken?: string; useHTTPS?: boolean; includeLibraryParam?: boolean;});

    buildURL(path: string, params?: {}): string;
    _sanitizePath(path: string): string;
    _buildParams(params: {}): string;
    _signParams(path: string, queryParams?: {}): string;
    buildSrcSet(path: string, params?: {}, options?: SrcSetOptions): string;
    _buildSrcSetPairs(path: string, params?: {}, options?: SrcSetOptions): string;
    _buildDPRSrcSet(path: string, params?: {}, options?: SrcSetOptions): string;

}    

interface SrcSetOptions {
    widths?: number[];
    widthTolerance?: number;
    minWidth?: number;
    maxWidth?: number;
    disableVariableQuality?: boolean;
}

export = ImgixClient;
