/**
 * android - базовая платформа
 * ios - платформа которая подстраивается под ios
 * vkcom - платформа предназначенная для миниприложений которые встраиваются в vk.com
 */ import { computeBrowserInfo } from "./browser.js";
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