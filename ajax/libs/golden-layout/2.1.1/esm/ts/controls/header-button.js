/** @internal */
export class HeaderButton {
    constructor(_header, label, cssClass, _pushEvent) {
        this._header = _header;
        this._pushEvent = _pushEvent;
        this._clickEventListener = (ev) => this.onClick(ev);
        this._touchStartEventListener = (ev) => this.onTouchStart(ev);
        this._element = document.createElement('div');
        this._element.classList.add(cssClass);
        this._element.title = label;
        this._header.on('destroy', () => this.destroy());
        this._element.addEventListener('click', this._clickEventListener, { passive: true });
        this._element.addEventListener('touchstart', this._touchStartEventListener, { passive: true });
        this._header.controlsContainerElement.appendChild(this._element);
    }
    get element() { return this._element; }
    destroy() {
        var _a;
        this._element.removeEventListener('click', this._clickEventListener);
        this._element.removeEventListener('touchstart', this._touchStartEventListener);
        (_a = this._element.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this._element);
    }
    onClick(ev) {
        this._pushEvent(ev);
    }
    onTouchStart(ev) {
        this._pushEvent(ev);
    }
}
//# sourceMappingURL=header-button.js.map