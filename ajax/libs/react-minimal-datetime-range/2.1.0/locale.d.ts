interface IObjectKeys {
    [key: string]: object;
}
declare let locale: IObjectKeys;
declare global {
    interface Window {
        REACT_MINIMAL_DATETIME_RANGE: any;
    }
}
export default locale;
