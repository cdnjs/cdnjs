import { default as pangu, BrowserPangu } from './pangu';
declare global {
    interface Window {
        pangu: typeof pangu & {
            BrowserPangu: typeof BrowserPangu;
        };
    }
}
export default pangu;
