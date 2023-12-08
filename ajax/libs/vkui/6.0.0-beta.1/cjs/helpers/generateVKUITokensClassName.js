"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateVKUITokensClassName", {
    enumerable: true,
    get: function() {
        return generateVKUITokensClassName;
    }
});
const generateVKUITokensClassName = (platform, appearance)=>{
    let tokensPlatform;
    switch(platform){
        case 'android':
            tokensPlatform = 'vkBase';
            break;
        case 'ios':
            tokensPlatform = 'vkIOS';
            break;
        case 'vkcom':
            tokensPlatform = 'vkCom';
            break;
        default:
            tokensPlatform = platform;
    }
    return `vkui--${tokensPlatform}--${appearance}`;
};

//# sourceMappingURL=generateVKUITokensClassName.js.map