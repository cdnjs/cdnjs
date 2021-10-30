var findFocusable = function findFocusable(element) {
  var programmatic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!element) {
    return null;
  }

  if (programmatic) {
    return element.querySelectorAll("*[tabindex=\"-1\"]");
  }

  return element.querySelectorAll("a[href]:not([tabindex=\"-1\"]),\n                                     area[href],\n                                     input:not([disabled]),\n                                     select:not([disabled]),\n                                     textarea:not([disabled]),\n                                     button:not([disabled]),\n                                     iframe,\n                                     object,\n                                     embed,\n                                     *[tabindex]:not([tabindex=\"-1\"]),\n                                     *[contenteditable]");
};

var onKeyDown;

var bind = function bind(el, _ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? true : _ref$value;

  if (value) {
    var focusable = findFocusable(el);
    var focusableProg = findFocusable(el, true);

    if (focusable && focusable.length > 0) {
      onKeyDown = function onKeyDown(event) {
        // Need to get focusable each time since it can change between key events
        // ex. changing month in a datepicker
        focusable = findFocusable(el);
        focusableProg = findFocusable(el, true);
        var firstFocusable = focusable[0];
        var lastFocusable = focusable[focusable.length - 1];

        if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
          event.preventDefault();
          lastFocusable.focus();
        } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === 'Tab') {
          event.preventDefault();
          firstFocusable.focus();
        }
      };

      el.addEventListener('keydown', onKeyDown);
    }
  }
};

var unbind = function unbind(el) {
  el.removeEventListener('keydown', onKeyDown);
};

var directive = {
  bind: bind,
  unbind: unbind
};

export { directive as t };
