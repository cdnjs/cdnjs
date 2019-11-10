"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* ========================================================================
 * Phonon: dialogs.js v0.0.6
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
(function (window, phonon) {
  var lastTrigger = false;
  var dialogs = [];
  var fireEvent = null;

  function addCancelCallback(dialog, cancelCallback) {
    for (var i = 0; i < dialogs.length; i++) {
      if (dialogs[i].dialog === dialog) {
        dialogs[i].cancelCallback = cancelCallback;
        break;
      }
    }
  }

  var createBackdrop = function createBackdrop(id) {
    var backdrop = document.createElement('div');
    backdrop.setAttribute('data-id', id);
    backdrop.classList.add('backdrop-dialog');
    return backdrop;
  };

  var findTrigger = function findTrigger(target) {
    var triggers = document.querySelectorAll('[data-dialog-id], [data-dialog-close]');
    var i;

    for (; target && target !== document; target = target.parentNode) {
      for (i = triggers.length; i--;) {
        if (triggers[i] === target) {
          return target;
        }
      }
    }
  };

  var getDialog = function getDialog(event) {
    var dialogToggle = findTrigger(event.target);

    if (dialogToggle) {
      var _dialogId = dialogToggle.getAttribute('data-dialog-id');

      if (_dialogId) {
        return document.querySelector("#".concat(_dialogId));
      }

      return findDialog(event.target);
    }
  };

  var findDialog = function findDialog(target) {
    var dialogs = document.querySelectorAll('.dialog');
    var i;

    for (; target && target !== document; target = target.parentNode) {
      for (i = dialogs.length; i--;) {
        if (dialogs[i] === target && target.classList.contains('active')) {
          return target;
        }
      }
    }
  };

  var findDialogObject = function findDialogObject(id) {
    var i = dialogs.length - 1;

    for (; i >= 0; i--) {
      if (dialogs[i].dialog.id === id) {
        var d = dialogs[i];
        d.index = i;
        return d;
      }
    }

    return false;
  };

  var dialogId = 0;

  var buildDialog = function buildDialog(type, text, title, cancelable, textOk, textCancel) {
    text = typeof text === 'string' ? "<p>".concat(text, "</p>") : '';

    var noTitle = _typeof(title);

    title = noTitle === 'string' ? title : type;
    cancelable = typeof cancelable === 'boolean' ? cancelable : true;
    textOk = typeof textOk === 'string' ? textOk : 'Ok';
    textCancel = typeof textCancel === 'string' ? textCancel : 'Cancel';
    var id = "auto-gen-".concat(type, "-").concat(dialogId++);
    var div = document.createElement('div');
    div.setAttribute('class', 'dialog');
    div.setAttribute('data-cancelable', cancelable);
    div.setAttribute('data-auto', 'true');
    div.id = id;
    var nodeTitle = noTitle === undefined ? '' : "<h3>".concat(title, "</h3>");
    var btnCancel = "<li><a class=\"btn btn-flat btn-cancel\" data-dialog-close=\"true\">".concat(textCancel, "</a></li>");
    var input = '';
    var indicator = '';

    if (type === 'alert') {
      btnCancel = '';
    } else if (type === 'prompt') {
      input = '<input type="text" placeholder="">';
    } else if (type === 'passPrompt') {
      input = '<input type="password" placeholder="Password">';
    } else if (type === 'indicator') {
      text = '';
      indicator = '<div class="circle-progress active padded-bottom"><div class="spinner"></div></div>';
    }

    var actions = type === 'indicator' ? '' : "<ul class=\"buttons\">".concat(btnCancel, "<li><a class=\"btn btn-flat primary btn-confirm\" data-dialog-close=\"true\">").concat(textOk, "</a></li>") + '</ul>';
    var alert = "".concat('<div class="content">' + '<div class="padded-full">').concat(nodeTitle).concat(text).concat(input).concat(indicator, "</div>") + "</div>".concat(actions);
    div.innerHTML = alert;
    document.body.appendChild(div);
    return div;
  };

  document.on(phonon.event.start, function (evt) {
    if (dialogs.length > 0) {
      var previous = dialogs[dialogs.length - 1];
      var p = findDialog(evt.target);

      if (!p) {
        if (previous.dialog.getAttribute('data-cancelable') !== 'false') {
          // close the previous active dialog
          _close(previous.dialog); // call the cancel callback


          if (typeof previous.cancelCallback === 'function') previous.cancelCallback();
        }
      }

      if (p && p !== previous.dialog) {
        // Case where there are two active dialogs
        if (p.id !== previous.dialog.id) {
          _close(previous.dialog);
        }
      }
    }
  });
  document.on('tap', function (evt) {
    var trigger = findTrigger(evt.target);
    var dialog = null;

    if (trigger) {
      dialog = getDialog(evt);
      lastTrigger = trigger;

      if (dialog) {
        if (dialog.classList.contains('active')) {
          _close(dialog);
        } else {
          _open(dialog);
        }
      }
    }
  });
  document.on('keypress', function (evt) {
    if (dialogs.length > 0) {
      if (evt.which == 13 || evt.keyCode == 13) {
        var previous = dialogs[dialogs.length - 1];
        var btnConfirm = previous.dialog.querySelector('.btn-confirm');

        if (btnConfirm && typeof btnConfirm.fireConfirm !== 'undefined') {
          btnConfirm.fireConfirm();
        }

        _close(previous.dialog);

        return false;
      }
    }

    return true;
  });

  function onHide() {
    var obj = findDialogObject(this.getAttribute('data-id'));
    var backdrop = obj.backdrop;
    backdrop.classList.remove('fadeout');
    document.body.removeChild(backdrop);
    var dialog = obj.dialog;
    dialog.style.visibility = 'hidden';
    dialog.style.display = 'none';
    dialog.classList.remove('close'); // remove autogenerated dialogs, see: #199

    if (dialog.getAttribute('data-auto')) {
      document.body.removeChild(dialog);
    }

    dialogs.splice(obj.index, 1);
    this.off(phonon.event.transitionEnd, onHide, false);
  }

  function center(target) {
    var computedStyle = getComputedStyle(target);
    var width = computedStyle.width;
    var height = computedStyle.height;
    width = width.slice(0, width.length - 2);
    height = height.slice(0, height.length - 2);
    var top = window.innerHeight / 2 - height / 2;
    target.style.top = "".concat(top, "px");
  }

  function _open(dialog) {
    dialog.style.visibility = 'visible';
    dialog.style.display = 'block';

    if (!dialog.classList.contains('active')) {
      center(dialog);
      dialog.classList.add('active');
      var preloader = dialog.querySelector('.circle-progress');
      if (preloader) phonon.preloader(preloader).show();
      var backdrop = createBackdrop(dialog.id);
      dialogs.push({
        dialog: dialog,
        backdrop: backdrop
      });
      document.body.appendChild(backdrop);
    }
  }

  function _close(dialog) {
    off(dialog);

    if (dialog.classList.contains('active')) {
      dialog.classList.remove('active');
      dialog.classList.add('close');
      var preloader = dialog.querySelector('.circle-progress');
      if (preloader) phonon.preloader(preloader).hide();
      var obj = findDialogObject(dialog.id);
      var backdrop = obj.backdrop;
      backdrop.on(phonon.event.transitionEnd, onHide, false); // fix issue #62

      window.setTimeout(function () {
        backdrop.classList.add('fadeout');
      }, 1);
    }
  }

  function _on(dialog, eventName, callback) {
    fireEvent = function fireEvent() {
      var input = dialog.querySelector('input');
      var inputValue; // undefined by default

      if (input) {
        inputValue = input.value;
      }

      callback(inputValue);
    };

    if (eventName === 'confirm') {
      var btnConfirm = dialog.querySelector('.btn-confirm');

      if (btnConfirm) {
        btnConfirm.fireConfirm = fireEvent;
        btnConfirm.on('tap', fireEvent);
      }
    } else {
      // keep cancel callback for backdrop taps
      addCancelCallback(dialog, callback);
      var btnCancel = dialog.querySelector('.btn-cancel');

      if (btnCancel) {
        btnCancel.on('tap', fireEvent);
      }
    }
  }
  /**
  * Resets tap events when the dialog is closed
  */


  function off(dialog) {
    if (typeof fireEvent !== 'function') return;
    var buttons = dialog.querySelectorAll('.btn-confirm, .btn-cancel');

    if (buttons) {
      var i = 0;
      var l = buttons.length;

      for (; i < l; i++) {
        buttons[i].off('tap', fireEvent);
      }
    }
  }

  function closeActive() {
    var closable = dialogs.length > 0;

    if (closable) {
      var dialog = dialogs[dialogs.length - 1].dialog;

      if (dialog.getAttribute('data-cancelable') !== 'false') {
        _close(dialog);
      }
    }

    return closable;
  }

  phonon.dialog = function (el) {
    if (typeof el === 'undefined') {
      return {
        alert: function alert(text, title, cancelable, textOk) {
          var dialog = buildDialog('alert', text, title, cancelable, textOk);

          _open(dialog);

          return {
            on: function on(eventName, callback) {
              _on(dialog, eventName, callback);
            }
          };
        },
        confirm: function confirm(text, title, cancelable, textOk, textCancel) {
          var dialog = buildDialog('confirm', text, title, cancelable, textOk, textCancel);

          _open(dialog);

          return {
            on: function on(eventName, callback) {
              _on(dialog, eventName, callback);
            }
          };
        },
        prompt: function prompt(text, title, cancelable, textOk, textCancel) {
          var dialog = buildDialog('prompt', text, title, cancelable, textOk, textCancel);

          _open(dialog);

          return {
            on: function on(eventName, callback) {
              _on(dialog, eventName, callback);
            }
          };
        },
        passPrompt: function passPrompt(text, title, cancelable, textOk, textCancel) {
          var dialog = buildDialog('passPrompt', text, title, cancelable, textOk, textCancel);

          _open(dialog);

          return {
            on: function on(eventName, callback) {
              _on(dialog, eventName, callback);
            }
          };
        },
        indicator: function indicator(title, cancelable) {
          var dialog = buildDialog('indicator', '', title, cancelable);

          _open(dialog);

          return {
            on: function on(eventName, callback) {
              _on(dialog, eventName, callback);

              return this;
            },
            open: function open() {
              _open(dialog);

              return this;
            },
            close: function close() {
              _close(dialog);

              return this;
            }
          };
        }
      };
    }

    var dialog = typeof el === 'string' ? document.querySelector(el) : el;

    if (dialog === null) {
      throw new Error("The following element ".concat(el, " does not exists"));
    }

    return {
      open: function open() {
        _open(dialog);

        return this;
      },
      close: function close() {
        _close(dialog);

        return this;
      },
      on: function on(eventName, callback) {
        _on(dialog, eventName, callback);

        return this;
      },
      isActive: function isActive() {
        return !!dialog.classList.contains('active');
      }
    };
  };

  phonon.dialogUtil = {
    closeActive: closeActive
  };
  window.phonon = phonon;

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = phonon.dialog;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return phonon.dialog;
    });
  }
})(typeof window !== 'undefined' ? window : void 0, window.phonon || {});