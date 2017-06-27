/* ========================================================================
 * Phonon: popovers.js v0.0.5
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

  'use strict';

  var touchMove = false;
  var previousPopover = null;
  var isOpened = false;
  var backdrop = document.createElement('div');
  backdrop.classList.add('backdrop-popover');

  var findTrigger = function (target) {

    var res = { target : null, id: null, direction : null };

    for (; target && target !== document; target = target.parentNode) {

      var id = target.getAttribute('data-popover-id');

      if(id !== null) {

        res.target = target;
        res.id = id;
        res.direction = 'left';

        if(!target.classList.contains('title') && target.classList.contains('pull-left')) {
          res.direction = 'left'; // button with pull-left
        } else if(!target.classList.contains('title') && target.parentNode.classList.contains('pull-left')) {
          res.direction = 'left'; // button with parent pull-left
        } else if(target.classList.contains('title') && target.classList.contains('pull-left')) {
          res.direction = 'title-left'; // title with pull-left
        } else if(target.parentNode && target.parentNode.classList.contains('pull-left') && target.classList.contains('title')) {
          res.direction = 'title-left'; // title with parent pull-left
        } else if(target.classList.contains('pull-right')) {
          res.direction = 'right'; // button with pull-right
        } else if(target.parentNode && target.parentNode.classList.contains('pull-right')) {
          res.direction = 'right'; // button with parent pull-right
        } else if(target.classList.contains('center')) {
          res.direction = 'title'; // title with center
        } else if(target.parentNode && target.parentNode.classList.contains('center')) {
          res.direction = 'title'; // title with parent center
        } else {
          res.direction = 'button';
        }

        break;
      }
    }
    return res;
  };

  var findPopover = function (target) {
    var popovers = document.querySelectorAll('.popover');
    var i;
    for (; target && target !== document; target = target.parentNode) {
      for (i = popovers.length; i--;) {
        if (popovers[i] === target && target.classList.contains('active')) {
          return target;
        }
      }
    }
  };

  var onItem = function(target) {
    for (; target && target !== document; target = target.parentNode) {
      if(target === previousPopover) {
        return true;
      }
    }
    return false;
  };

  document.on(phonon.event.start, function (e) {
    e = e.originalEvent || e;

    var p = findPopover(e.target);

    if (!p && isOpened) {
      close(previousPopover);
    }
    touchMove = false;
  });

  document.on(phonon.event.move, function (e) {
    e = e.originalEvent || e;
    touchMove = true;
  });

  document.on(phonon.event.end, function (evt) {

    var target = evt.target, trigger = findTrigger(target);

    if (trigger.target) {

      var popover = document.querySelector('#'+trigger.id);

      if(popover) {

        if(popover.classList.contains('active') && !touchMove) {
          close(popover);
        } else {
          open(popover, trigger.direction);
        }
      }
    }

    // fix
    if(target.parentNode === null) {
      return;
    }

    if(onItem(target) && !touchMove) {

      close(previousPopover);

      evt = new CustomEvent('itemchanged', {
        detail: { item: target.textContent, target: evt.target },
        bubbles: true,
        cancelable: true
      });

      var triggers = document.querySelectorAll('[data-popover-id="'+ previousPopover.id +'"]');
      var i = triggers.length - 1;

      for (; i >= 0; i--) {
        var trigger = triggers[i];
        if(trigger.getAttribute('data-autobind') === 'true') {

          if(!('textContent' in trigger)) {
              trigger.innerText = target.innerText;
          } else {
              trigger.textContent = target.textContent;
          }
        }
      }

      previousPopover.dispatchEvent(evt);
    }
  });

  function onHide() {

    var page = document.querySelector('.app-active');
    if(page.querySelector('div.backdrop-popover') !== null) {
      page.removeChild(backdrop);
    }
    previousPopover.style.visibility = 'hidden';
    previousPopover = null;
  }

  /**
   * Public API
  */

  function open (popover, direction) {
    if(direction === undefined) {
      direction = 'left';
    }

    isOpened = true;

    popover.style.visibility = 'visible';

    // Reset the scroll state
    popover.querySelector('ul').scrollTop = 0;

    previousPopover = popover;
    if(!popover.classList.contains('active')) {

      var page = document.querySelector('.app-page.app-active');
      var pageStyle = page.currentStyle || window.getComputedStyle(page);

      if(direction === 'title' || direction === 'title-left') {

        var hb = page.querySelector('.header-bar');
        popover.style.top = hb.offsetHeight + 'px';

        if(direction === 'title') {
          popover.style.left = (((hb.clientWidth/2 + parseInt(pageStyle.marginLeft))) - (popover.clientWidth/2)) + 'px';
        } else {
          popover.style.left = (16 + parseInt(pageStyle.marginLeft)) + 'px';
        }
      } else if(direction === 'left' || direction === 'right') {

        popover.style.top = '12px';

        if(direction === 'left') {
          popover.style.left = (16 + parseInt(pageStyle.marginLeft)) + 'px';
        } else {
          popover.style.left = 'auto';
          popover.style.right = '16px';
        }
      } else {

        var trigger = document.querySelector('.btn-popover[data-popover-id="'+ popover.id +'"]');
        var rect = trigger.getBoundingClientRect();

        popover.style.width = trigger.clientWidth + 'px';
        popover.style.top = rect.top + 'px';
        popover.style.left = rect.left + 'px';
      }

      if(!popover.classList.contains('active')) {
        popover.classList.add('active');
      }

      page.appendChild(backdrop);
    }
  }

  function close (popover) {
    isOpened = false;
    previousPopover = popover;

    if(popover.classList.contains('active')) {
      popover.classList.toggle('active');

      window.setTimeout(function() {
        onHide();
      }, 250);
    }
  }

  phonon.popover = function (el) {
    if(typeof el === 'undefined') {
      return {
        closeActive: function() {
          var closable = (previousPopover ? true : false);
          if(closable) {
            close(previousPopover);
          }
          return closable;
        }
      }
    }

    var popover = (typeof el === 'string' ? document.querySelector(el) : el);
    if(popover === null) {
      throw new Error('The popover with ID ' + el + ' does not exist');
    }

    return {
      open: function () {
        open(popover);
      },
      close: function () {
        close(popover);
      }
    };
  };

  window.phonon = phonon;

  if(typeof exports === 'object') {
    module.exports = phonon.popover;
  } else if(typeof define === 'function' && define.amd) {
    define(function() { return phonon.popover });
  }

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));
