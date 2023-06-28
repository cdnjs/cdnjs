import { Platform } from '../lib/platform';
export const generateVKUITokensClassName = (platform, appearance)=>{
    let tokensPlatform;
    switch(platform){
        case Platform.ANDROID:
            tokensPlatform = 'vkBase';
            break;
        case Platform.IOS:
            tokensPlatform = 'vkIOS';
            break;
        case Platform.VKCOM:
            tokensPlatform = 'vkCom';
            break;
        default:
            tokensPlatform = platform;
    }
    return `vkui--${tokensPlatform}--${appearance}`;
};

//# sourceMappingURL=generateVKUITokensClassName.js.map