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
    AUTO_SCROLL_START_DELAY: function() {
        return AUTO_SCROLL_START_DELAY;
    },
    DATA_DRAGGABLE_PLACEHOLDER_KEY: function() {
        return DATA_DRAGGABLE_PLACEHOLDER_KEY;
    },
    DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP: function() {
        return DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP;
    },
    ITEM_INITIAL_INDEX: function() {
        return ITEM_INITIAL_INDEX;
    }
});
const AUTO_SCROLL_START_DELAY = 300;
const ITEM_INITIAL_INDEX = -1;
const DATA_DRAGGABLE_PLACEHOLDER_KEY = 'data-draggable-placeholder';
const DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP = {
    [DATA_DRAGGABLE_PLACEHOLDER_KEY]: 'true'
};

//# sourceMappingURL=constants.js.map