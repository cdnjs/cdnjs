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
    ANIMATION_DURATION: function() {
        return ANIMATION_DURATION;
    },
    CONTROL_ELEMENTS_STATE: function() {
        return CONTROL_ELEMENTS_STATE;
    },
    SLIDES_MANAGER_STATE: function() {
        return SLIDES_MANAGER_STATE;
    },
    SLIDE_THRESHOLD: function() {
        return SLIDE_THRESHOLD;
    }
});
const ANIMATION_DURATION = 240;
const SLIDE_THRESHOLD = 0.05;
const CONTROL_ELEMENTS_STATE = {
    canSlideLeft: true,
    canSlideRight: true,
    isDraggable: true
};
const SLIDES_MANAGER_STATE = {
    viewportOffsetWidth: 0,
    slides: [],
    isFullyVisible: true,
    loopPoints: [],
    contentSize: 0,
    snaps: []
};

//# sourceMappingURL=constants.js.map