"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CUSTOM_PROPERTY_INSET_PREFIX: function() {
        return CUSTOM_PROPERTY_INSET_PREFIX;
    },
    extractPortalRootByProp: function() {
        return extractPortalRootByProp;
    },
    getClassNamesByMode: function() {
        return getClassNamesByMode;
    },
    getParentElement: function() {
        return getParentElement;
    },
    setSafeAreaInsets: function() {
        return setSafeAreaInsets;
    }
});
const _isRefObject = require("../../lib/isRefObject");
function getClassNamesByMode({ mode, layout, tokensClassName, sizeX, sizeY }) {
    const baseClassNames = [
        'vkui__root'
    ];
    const stylesClassNames = [
        tokensClassName
    ];
    if (mode === 'full' || mode === 'embedded') {
        if (layout) {
            const vkuiLayoutClassNames = {
                card: 'vkui--layout-card',
                plain: 'vkui--layout-plain'
            };
            stylesClassNames.push(vkuiLayoutClassNames[layout]);
        }
        if (sizeX !== 'compact') {
            const vkuiSizeXClassNames = {
                none: 'vkui--sizeX-none',
                regular: 'vkui--sizeX-regular'
            };
            stylesClassNames.push(vkuiSizeXClassNames[sizeX]);
        }
        if (sizeY !== 'regular') {
            const vkuiSizeYClassNames = {
                none: 'vkui--sizeY-none',
                compact: 'vkui--sizeY-compact'
            };
            stylesClassNames.push(vkuiSizeYClassNames[sizeY]);
        }
        if (mode === 'embedded') {
            baseClassNames.push('vkui__root--embedded');
        }
    }
    return [
        baseClassNames,
        stylesClassNames
    ];
}
const getParentElement = (el)=>el ? el.parentElement : null;
const extractPortalRootByProp = (portalRootProp)=>(0, _isRefObject.isRefObject)(portalRootProp) ? portalRootProp.current : portalRootProp;
const CUSTOM_PROPERTY_INSET_PREFIX = `--vkui_internal--safe_area_inset_`;
const setSafeAreaInsets = (safeAreaInsets, rootContainer, portalContainer)=>{
    if (!safeAreaInsets) {
        return ()=>void 0;
    }
    for(const key in safeAreaInsets){
        if (safeAreaInsets.hasOwnProperty(key) && typeof safeAreaInsets[key] === 'number') {
            const propertyKey = `${CUSTOM_PROPERTY_INSET_PREFIX}${key}`;
            const propertyValue = safeAreaInsets[key];
            rootContainer.style.setProperty(propertyKey, `${propertyValue}px`);
            if (portalContainer) {
                portalContainer.style.setProperty(propertyKey, `${propertyValue}px`);
            }
        }
    }
    return function unset() {
        for(const key in safeAreaInsets){
            if (safeAreaInsets.hasOwnProperty(key)) {
                const propertyKey = `${CUSTOM_PROPERTY_INSET_PREFIX}${key}`;
                rootContainer.style.removeProperty(propertyKey);
                if (portalContainer) {
                    portalContainer.style.removeProperty(propertyKey);
                }
            }
        }
    };
};

//# sourceMappingURL=helpers.js.map