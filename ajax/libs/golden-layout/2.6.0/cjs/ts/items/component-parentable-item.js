"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentParentableItem = void 0;
const content_item_1 = require("./content-item");
class ComponentParentableItem extends content_item_1.ContentItem {
    constructor() {
        super(...arguments);
        /** @internal */
        this._focused = false;
    }
    get focused() { return this._focused; }
    /** @internal */
    setFocusedValue(value) {
        this._focused = value;
    }
}
exports.ComponentParentableItem = ComponentParentableItem;
//# sourceMappingURL=component-parentable-item.js.map