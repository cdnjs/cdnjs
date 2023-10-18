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
    calcMax: function() {
        return calcMax;
    },
    calcMin: function() {
        return calcMin;
    }
});
var calcMin = function(param) {
    var _param_containerWidth = param.containerWidth, containerWidth = _param_containerWidth === void 0 ? 0 : _param_containerWidth, _param_layerWidth = param.layerWidth, layerWidth = _param_layerWidth === void 0 ? 0 : _param_layerWidth, _param_slides = param.slides, slides = _param_slides === void 0 ? [] : _param_slides, _param_viewportOffsetWidth = param.viewportOffsetWidth, viewportOffsetWidth = _param_viewportOffsetWidth === void 0 ? 0 : _param_viewportOffsetWidth, align = param.align, isCenterWithCustomWidth = param.isCenterWithCustomWidth;
    switch(align){
        case "left":
            return containerWidth - layerWidth;
        case "right":
            return viewportOffsetWidth - layerWidth;
        case "center":
            if (isCenterWithCustomWidth && slides.length) {
                var _slides_ = slides[slides.length - 1], coordX = _slides_.coordX, width = _slides_.width;
                return viewportOffsetWidth / 2 - coordX - width / 2;
            } else {
                return viewportOffsetWidth - (containerWidth - viewportOffsetWidth) / 2 - layerWidth;
            }
    }
    return undefined;
};
var calcMax = function(param) {
    var _param_slides = param.slides, slides = _param_slides === void 0 ? [] : _param_slides, _param_viewportOffsetWidth = param.viewportOffsetWidth, viewportOffsetWidth = _param_viewportOffsetWidth === void 0 ? 0 : _param_viewportOffsetWidth, isCenterWithCustomWidth = param.isCenterWithCustomWidth;
    if (isCenterWithCustomWidth && slides.length) {
        var _slides_ = slides[0], width = _slides_.width, coordX = _slides_.coordX;
        return viewportOffsetWidth / 2 - coordX - width / 2;
    }
    return 0;
};

//# sourceMappingURL=helpers.js.map