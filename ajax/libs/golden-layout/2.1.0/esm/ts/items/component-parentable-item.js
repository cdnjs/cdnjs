import { ContentItem } from './content-item';
export class ComponentParentableItem extends ContentItem {
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
//# sourceMappingURL=component-parentable-item.js.map