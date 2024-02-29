interface IObjectKeys {
    [key: string]: any;
}
declare const DEFAULT_LACALE = "en-us";
declare global {
    interface Window {
        REACT_PICKY_DATE_TIME: any;
    }
}
declare const LOCALE: IObjectKeys;
export { LOCALE, DEFAULT_LACALE };
