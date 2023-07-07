interface Message {
    [key: string]: Key;
}
interface Key {
    [key: string]: Func;
}
interface Func {
    [key: string]: Function;
}
declare let message: Message;
export declare const getCustomErrorMessage: (o: any, m: any) => any;
declare global {
    interface Window {
        REACT_INPUTS_VALIDATION: any;
    }
}
export declare const handleCustomErrorMessage: (message: any, w: Window) => any;
export default message;
