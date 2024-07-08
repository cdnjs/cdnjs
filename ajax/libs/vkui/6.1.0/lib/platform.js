import { computeBrowserInfo } from './browser';
export const Platform = {
    ANDROID: 'android',
    IOS: 'ios',
    VKCOM: 'vkcom'
};
export function platform(browserInfo) {
    if (!browserInfo) {
        browserInfo = computeBrowserInfo();
    }
    return browserInfo.system === 'ios' ? 'ios' : 'android';
}

//# sourceMappingURL=platform.js.map