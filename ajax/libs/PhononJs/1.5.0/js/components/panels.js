"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* ========================================================================
* Phonon: panels.js v0.1.3
* http://phonon.quarkdev.com
* ========================================================================
* Licensed under MIT (http://phonon.quarkdev.com)
* ======================================================================== */
(function (window, document, phonon, undefined) {
  var _activeObjects = [];

  var createBackdrop = function createBackdrop(id) {
    var backdrop = document.createElement('div');
    backdrop.classList.add('backdrop-panel');
    backdrop.setAttribute('data-backdrop-for', id);
    return backdrop;
  };

  var findTrigger = function findTrigger(target) {
    var triggers = document.querySelectorAll('[data-panel-id], [data-panel-close]');
    var i;

    for (; target && target !== document; target = target.parentNode) {
      for (i = triggers.length; i--;) {
        if (triggers[i] === target) {
          return target;
        }
      }
    }
  };

  var getPanel = function getPanel(event) {
    var panelToggle = findTrigger(event.target);

    if (panelToggle) {
      var panelId = panelToggle.getAttribute('data-panel-id');

      if (panelId) {
        return document.querySelector("#".concat(panelId));
      }

      return findDOMPanel(event.target);
    }
  };

  var findObject = function findObject(panelId) {
    var length = _activeObjects.length;
    var i = 0;

    for (; i < length; i++) {
      if (_activeObjects[i].panel.getAttribute('id') === panelId) {
        var found = _activeObjects[i];
        found.index = i;
        return found;
      }
    }

    return null;
  };

  var findDOMPanel = function findDOMPanel(target) {
    var panels = document.querySelectorAll('.panel, .panel-full');
    var i;

    for (; target && target !== document; target = target.parentNode) {
      for (i = panels.length; i--;) {
        if (panels[i] === target && target.classList.contains('active')) {
          return target;
        }
      }
    }
  };
  /**
  * Used to find an opened dialog or an opened popover
  * in front of a panel
  * @todo clean this
  */


  var onDialog = function onDialog(target) {
    for (; target && target !== document; target = target.parentNode) {
      if (target.classList.contains('dialog') || target.classList.contains('backdrop-dialog') || target.classList.contains('popover') || target.classList.contains('backdrop-popover')) {
        return true;
      }
    }

    return false;
  };

  document.on(phonon.event.start, function (evt) {
    evt = evt.originalEvent || evt; // don't close panels if notifications are pressed

    if (evt.target.classList.contains('notification') || evt.parentNode && evt.target.parentNode.classList.contains('notification')) return; // don't close panels if a dialog is opened

    if (onDialog(evt.target)) return;

    if (_activeObjects.length > 0) {
      var previousPanel = _activeObjects[_activeObjects.length - 1].panel;
      var p = findDOMPanel(evt.target);

      if (!p) {
        _close(previousPanel);
      }

      if (p && p !== previousPanel) {
        // Case where there are two active panels
        if (p.id !== previousPanel.id) {
          _close(previousPanel);
        }
      }
    }
  });
  document.on(phonon.event.tap, function (evt) {
    // don't close panels if notifications are pressed
    if (evt.target.classList.contains('notification') || evt.parentNode && evt.target.parentNode.classList.contains('notification')) return; // don't close panels if a dialog is opened

    if (onDialog(evt.target)) return;
    var trigger = findTrigger(evt.target);
    var panel = null;

    if (trigger) {
      panel = getPanel(evt);

      if (panel) {
        panel.classList.contains('active') ? _close(panel) : _open(panel);
      }
    }

    panel = findDOMPanel(evt.target);

    if (!panel && !trigger) {
      if (_activeObjects.length > 0) {
        var previousPanel = _activeObjects[_activeObjects.length - 1].panel;
        var p = findDOMPanel(evt.target);

        _close(previousPanel);
      }
    }
  });

  function onHide() {
    document.body.removeChild(this);
    var object = findObject(this.getAttribute('data-backdrop-for'));

    _activeObjects.splice(object.index, 1);

    this.off(phonon.event.transitionEnd, onHide, false);
  }
  /**
  * Public API
  */


  function _open(panel) {
    if (!panel.classList.contains('active')) {
      panel.style.display = 'block';
      window.setTimeout(function () {
        panel.classList.add('active');
      }, 10);
      var backdrop = createBackdrop(panel.getAttribute('id'));
      document.body.appendChild(backdrop);

      _activeObjects.push({
        panel: panel,
        backdrop: backdrop
      });
    }
  }

  function _close(panel) {
    if (panel.classList.contains('active')) {
      panel.classList.remove('active');
      panel.classList.add('panel-closing');

      var closePanel = function closePanel() {
        panel.classList.remove('panel-closing');
        panel.style.display = 'none';
        panel.off(phonon.event.transitionEnd, closePanel);
      };

      panel.on(phonon.event.transitionEnd, closePanel);
      var pObject = findObject(panel.getAttribute('id'));

      if (pObject) {
        pObject.backdrop.classList.add('fadeout');
        pObject.backdrop.on(phonon.event.transitionEnd, onHide, false);
      }
    }
  }

  function closeActive() {
    var closable = _activeObjects.length > 0;

    if (closable) {
      _close(_activeObjects[_activeObjects.length - 1].panel);
    }

    return closable;
  }

  phonon.panel = function (el) {
    var panel = typeof el === 'string' ? document.querySelector(el) : el;

    if (panel === null) {
      throw new Error("The panel with ID ".concat(el, " does not exist"));
    }

    return {
      open: function open() {
        _open(panel);
      },
      close: function close() {
        _close(panel);
      }
    };
  };

  phonon.panelUtil = {
    closeActive: closeActive
  };
  window.phonon = phonon;

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = phonon.panel;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return phonon.panel;
    });
  }
})(window, document, window.phonon || {});