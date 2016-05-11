(function (Bricklayer) {
  if (typeof Bricklayer != "function") {
    throw new Error("Bricklayer is not initialized.")
  }

  Bricklayer.prototype.addLazyElement = function (to, lazyWaiter) {
    var _this = this;
    return lazyWaiter(function (element) {
      _this[to === "prepend" ? to : "append"](element)
    })
  }

  Bricklayer.prototype.appendLazyElement = function (lazyWaiter) {
    return this.addLazyElement('append', lazyWaiter);
  }

  Bricklayer.prototype.prependLazyElement = function (lazyWaiter) {
    return this.addLazyElement('prepend', lazyWaiter);
  }
})(Bricklayer)
