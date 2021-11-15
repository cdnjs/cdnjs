import { Global } from './Global';
export declare class UrlUtility {
    static addQueryParam(url: string, name: string, value: string): string;
    static parseUrlFragment(value?: string, delimiter?: string, global?: typeof Global): {
        [name: string]: string;
    };
}
