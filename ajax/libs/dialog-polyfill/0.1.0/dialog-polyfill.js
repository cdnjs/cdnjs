var dialogPolyfill = {}

dialogPolyfill.reposition = function(element) {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
  element.style.top = topValue + 'px';
  element.dialogPolyfillInfo.isTopOverridden = true;
}

dialogPolyfill.inNodeList = function(nodeList, node) {
  for (var i = 0; i < nodeList.length; ++i) {
    if (nodeList[i] == node)
      return true;
  }
  return false;
}

dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
  for (var i = 0; i < document.styleSheets.length; ++i) {
    var styleSheet = document.styleSheets[i];
    var cssRules = null;
    // Some browsers throw on cssRules.
    try {
      cssRules = styleSheet.cssRules;
    } catch (e) {}
    if (!cssRules)
      continue;
    for (var j = 0; j < cssRules.length; ++j) {
      var rule = cssRules[j];
      var selectedNodes = null;
      // Ignore errors on invalid selector texts.
      try {
        selectedNodes = document.querySelectorAll(rule.selectorText);
      } catch(e) {}
      if (!selectedNodes || !dialogPolyfill.inNodeList(selectedNodes, element))
        continue;
      var cssTop = rule.style.getPropertyValue('top');
      var cssBottom = rule.style.getPropertyValue('bottom');
      if ((cssTop && cssTop != 'auto') || (cssBottom && cssBottom != 'auto'))
        return true;
    }
  }
  return false;
}

dialogPolyfill.needsCentering = function(dialog) {
  var computedStyle = getComputedStyle(dialog);
  if (computedStyle.position != 'absolute')
    return false;

  // We must determine whether the top/bottom specified value is non-auto.  In
  // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
  // Firefox returns the used value. So we do this crazy thing instead: check
  // the inline style and then go through CSS rules.
  if ((dialog.style.top != 'auto' && dialog.style.top != '') ||
      (dialog.style.bottom != 'auto' && dialog.style.bottom != ''))
    return false;
  return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
}

dialogPolyfill.showDialog = function(isModal) {
  if (this.open) {
    throw 'InvalidStateError: showDialog called on open dialog';
  }
  this.open = true;
  this.setAttribute('open', 'open');

  if (dialogPolyfill.needsCentering(this))
    dialogPolyfill.reposition(this);
  if (isModal) {
    this.dialogPolyfillInfo.modal = true;
    dialogPolyfill.dm.pushDialog(this);
  }
};

dialogPolyfill.close = function(retval) {
  if (!this.open)
    throw new InvalidStateError;
  this.open = false;
  this.removeAttribute('open');

  // Leave returnValue untouched in case it was set directly on the element
  if (typeof retval != 'undefined') {
    this.returnValue = retval;
  }

  // This won't match the native <dialog> exactly because if the user sets top
  // on a centered polyfill dialog, that top gets thrown away when the dialog is
  // closed. Not sure it's possible to polyfill this perfectly.
  if (this.dialogPolyfillInfo.isTopOverridden) {
    this.style.top = 'auto';
  }

  if (this.dialogPolyfillInfo.modal) {
    dialogPolyfill.dm.removeDialog(this);
  }

  // Triggering "close" event for any attached listeners on the <dialog>
  var event;
  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent('close', true, true);
  } else {
    event = new Event('close');
  }
  this.dispatchEvent(event);

  return this.returnValue;
}

dialogPolyfill.registerDialog = function(element) {
  if (element.show) {
    console.warn("This browser already supports <dialog>, the polyfill " +
        "may not work correctly.");
  }
  element.show = dialogPolyfill.showDialog.bind(element, false);
  element.showModal = dialogPolyfill.showDialog.bind(element, true);
  element.close = dialogPolyfill.close.bind(element);
  element.dialogPolyfillInfo = {};
};

// The overlay is used to simulate how a modal dialog blocks the document. The
// blocking dialog is positioned on top of the overlay, and the rest of the
// dialogs on the pending dialog stack are positioned below it. In the actual
// implementation, the modal dialog stacking is controlled by the top layer,
// where z-index has no effect.
TOP_LAYER_ZINDEX = 100000;
MAX_PENDING_DIALOGS = 100000;

dialogPolyfill.DialogManager = function() {
  this.pendingDialogStack = [];
  this.overlay = document.createElement('div');
  this.overlay.style.width = '100%';
  this.overlay.style.height = '100%';
  this.overlay.style.position = 'fixed';
  this.overlay.style.left = '0px';
  this.overlay.style.top = '0px';
  this.overlay.style.backgroundColor = 'rgba(0,0,0,0.0)';

  this.overlay.addEventListener('click', function(e) {
    var redirectedEvent = document.createEvent('MouseEvents');
    redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window,
        e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey,
        e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
    document.body.dispatchEvent(redirectedEvent);
  });
}

dialogPolyfill.dm = new dialogPolyfill.DialogManager();

dialogPolyfill.DialogManager.prototype.blockDocument = function() {
  if (!document.body.contains(this.overlay))
    document.body.appendChild(this.overlay);
}

dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
  document.body.removeChild(this.overlay);
}

dialogPolyfill.DialogManager.prototype.updateStacking = function() {
  if (this.pendingDialogStack.length == 0) {
    this.unblockDocument();
    return;
  }
  this.blockDocument();

  var zIndex = TOP_LAYER_ZINDEX;
  for (var i = 0; i < this.pendingDialogStack.length; i++) {
    if (i == this.pendingDialogStack.length - 1)
      this.overlay.style.zIndex = zIndex++;
    var dialog = this.pendingDialogStack[i];
    dialog.dialogPolyfillInfo.backdrop.style.zIndex = zIndex++;
    dialog.style.zIndex = zIndex++;
  }

}

dialogPolyfill.DialogManager.prototype.pushDialog = function(dialog) {
  if (this.pendingDialogStack.length >= MAX_PENDING_DIALOGS) {
    throw "Too many modal dialogs";
  }

  var backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  backdrop.addEventListener('click', function(e) {
    var redirectedEvent = document.createEvent('MouseEvents');
    redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window,
        e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey,
        e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
    dialog.dispatchEvent(redirectedEvent);
  });
  dialog.parentNode.insertBefore(backdrop, dialog.nextSibling);
  dialog.dialogPolyfillInfo.backdrop = backdrop;
  this.pendingDialogStack.push(dialog);
  this.updateStacking();
}

dialogPolyfill.DialogManager.prototype.removeDialog = function(dialog) {
  var index = this.pendingDialogStack.indexOf(dialog);
  if (index == -1)
    return;
  this.pendingDialogStack.splice(index, 1);
  var backdrop = dialog.dialogPolyfillInfo.backdrop;
  backdrop.parentNode.removeChild(backdrop);
  dialog.dialogPolyfillInfo.backdrop = null;
  this.updateStacking();
}
