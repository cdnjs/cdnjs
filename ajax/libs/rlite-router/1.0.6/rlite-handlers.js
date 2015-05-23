Rlite.handlers = function () {
  var handlers = arguments;

  return function (r) {
    for (var i = 0; i < handlers.length; ++i) {
      handlers[i](r);
    }
  }
}
