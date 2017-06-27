/* ========================================================================
 * Phonon: panels.js v0.1.2
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, document, phonon, undefined) {
  
  'use strict';

  var panels = [];
  var busy = false;

  var createBackdrop = function () {
    var backdrop = document.createElement('div');
    backdrop.classList.add('backdrop-panel');
    return backdrop;
  };

  var findTrigger = function (target) {
    var triggers = document.querySelectorAll('[data-panel-id], [data-panel-close]'), i;
    for (; target && target !== document; target = target.parentNode) {
      for (i = triggers.length; i--;) {
        if (triggers[i] === target) {
          return target;
        }
      }
    }
  };

  var getPanel = function (event) {
    var panelToggle = findTrigger(event.target);
    if (panelToggle) {
      var panelId = panelToggle.getAttribute('data-panel-id');
      if(panelId) {
        return document.querySelector('#'+panelId);
      } else {
        return findPanel(event.target);
      }
    }
  };

  var findPanel = function (target) {
    var panels = document.querySelectorAll('.panel, .panel-full'), i;

    for (; target && target !== document; target = target.parentNode) {
      for (i = panels.length; i--;) {
        if (panels[i] === target && target.classList.contains('active')) {
          return target;
        }
      }
    }
  };

  document.on(phonon.event.start, function (evt) {
    evt = evt.originalEvent || evt;

    if(panels.length > 0) {
      var previousPanel = panels[panels.length - 1].panel, p = findPanel(evt.target);
      
      if (!p) {
        close(previousPanel);
      }

      if (p && p !== previousPanel) {
        // Case where there are two active panels
        if (p.id !== previousPanel.id) {
          close(previousPanel);
        }
      } 
    }
  });

  document.on(phonon.event.tap, function (evt) {

    var trigger = findTrigger(evt.target), panel = null;
    
    if (trigger) {
      panel = getPanel(evt);

      if(panel) {
        panel.classList.contains('active') ? close(panel) : open(panel);
      }
    }

    panel = findPanel(evt.target);

    if(!panel && !trigger) {
      if(panels.length > 0) {
        var previousPanel = panels[panels.length - 1].panel, p = findPanel(evt.target);
        close(previousPanel);
      }
    }
  });

  function onHide() {

    var page = document.querySelector('.app-active');
    if(page.querySelector('div.backdrop-panel') !== null) {

      var backdrop = panels[panels.length - 1].backdrop;
      backdrop.classList.remove('fadeout');

      page.removeChild(backdrop);
    }

    panels[panels.length - 1].panel.style.visibility = 'visible';
    busy = false;

    panels.pop();

    this.off(phonon.event.transitionEnd, onHide, false);
  }

  /**
   * Public API
  */

  function open (panel) {
    if(busy) {
      return;
    }
    
    panel.style.visibility = 'visible';

    if(!panel.classList.contains('active')) {
      panel.classList.add('active');

      var backdrop = backdrop = createBackdrop();
      document.querySelector('.app-active').appendChild(backdrop);

      panels.push( {panel: panel, backdrop: backdrop} );
    }
  }

  function close (panel) {

    if(busy) {
      return;
    }

    if(panel.classList.contains('active') && !busy) {
      
      busy = true;

      panel.classList.remove('active');
      panel.classList.add('panel-closing');
      
      var closePanel = function () {
        panel.classList.remove('panel-closing');
        panel.off(phonon.event.transitionEnd, closePanel);
      };

      panel.on(phonon.event.transitionEnd, closePanel);

      if(panels.length > 0) {
        var backdrop = panels[panels.length - 1].backdrop;
        backdrop.classList.add('fadeout');
        backdrop.on(phonon.event.transitionEnd, onHide, false);
      }
    }
  }

  phonon.panel = function (el) {
    if(typeof el === 'undefined') {
      return {
        closeActive: function() {
          var closable = (panels.length > 0 ? true : false);
          if(closable) {
            close(panels[panels.length - 1].panel);
          }
          return closable;
        }
      }
    }

    var panel = (typeof el === 'string' ? document.querySelector(el) : el);
    if(panel === null) {
      throw new Error('The panel with ID ' + el + ' does not exist');
    }

    return {
      open: function () {
        open(panel);
      },
      close: function () {
        close(panel);
      }
    };
  };

  window.phonon = phonon;

  if(typeof exports === 'object') {
    module.exports = phonon.panel;
  } else if(typeof define === 'function' && define.amd) {
    define(function() { return phonon.panel });
  }

}(window, document, window.phonon || {}));