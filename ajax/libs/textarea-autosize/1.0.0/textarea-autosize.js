class s {
  constructor(t) {
    this.element = t, this.verticalBorderSize = this._styleProp("borderTopWidth") + this._styleProp("borderBottomWidth") || 0, this._inputHandler = this._inputHandler.bind(this), t.addEventListener("input", this._inputHandler), this.update();
  }
  _inputHandler(t) {
    this.update();
  }
  destroy() {
    this.removeEventListener("input", this._inputHandler), this.element = null;
  }
  update() {
    const t = this._styleProp("fontSize");
    this.element.style.height = `${t}px`;
    const e = this.element.scrollHeight + this.verticalBorderSize;
    this.element.style.height = `${e}px`;
  }
  _styleProp(t) {
    const e = getComputedStyle(this.element, null);
    return parseInt(e[t]);
  }
}
export {
  s as TextareaAutoSize
};
//# sourceMappingURL=textarea-autosize.js.map
