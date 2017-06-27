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
  var onChangeCallbacks = []

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

  var onPopover = function (target) {
    for (; target && target !== document; target = target.parentNode) {
      if (target.classList.contains('popover') && target.classList.contains('active')) {
        return target;
      }
    }
    return false;
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

    if (!onPopover(e.target) && isOpened) {
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
    var popover = document.querySelector('#'+trigger.id);

    if (trigger.target && popover) {
        if(popover.classList.contains('active') && !touchMove) {
          close(popover);
        } else {
            if(trigger.direction === 'button') {
                openFrom(popover, trigger.target);
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

      var changeData = {
          text: target.textContent,
          value: target.getAttribute('data-value'),
          target: evt.target
      };

      evt = new CustomEvent('itemchanged', {
        detail: changeData,
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

      for (var i = 0; i < onChangeCallbacks.length; i++) {
          var o = onChangeCallbacks[i];
          if(o.id === previousPopover.getAttribute('id')) {
              o.callback(changeData);
              // do not stop loop, maybe there are many callbacks
          }
      }
    }
  });

  function onHide() {
    var page = document.querySelector('.app-active');
    if(page.querySelector('div.backdrop-popover') !== null) {
      page.removeChild(backdrop);
    }
    previousPopover.style.visibility = 'hidden';
    previousPopover.style.display = 'none';
    if(previousPopover.getAttribute('data-virtual') === 'true') {
        // remove from DOM
        document.body.removeChild(previousPopover);
    }
    previousPopover = null;
  }

  function buildPopover() {
    var popover = document.createElement('div');
    popover.classList.add('popover');
    popover.setAttribute('id', generateId());
    popover.setAttribute('data-virtual', 'true');
    document.body.appendChild(popover);
    return document.body.lastChild;
  }

  function buildListItem(item) {
    var text = typeof item === 'string' ? item : item.text;
    var value = typeof item === 'string' ? item : item.value;
    return '<li><a class="padded-list" data-value="' + value + '">' + text + '</a></li>';
  }

  /**
   * Public API
  */
  function setList(popover, data, customItemBuilder) {
    if(!(data instanceof Array)) {
      throw new Error('The list of the popover must be an array, ' + typeof data + ' given');
    }

    var list = '<ul class="list">';
    var itemBuilder = buildListItem
    if(typeof customItemBuilder === 'function') {
        itemBuilder = customItemBuilder
    }

    for (var i = 0; i < data.length; i++) {
      list += itemBuilder(data[i]);
    }
    list += '</ul>';
    popover.innerHTML = list
  }

  function generateId() {
    var text = ''
    var possible = 'abcdefghijklmnopqrstuvwxyz'
    var i = 0
    for(; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  function openable(popover) {
      if(!popover.classList.contains('active')) {
        isOpened = true;
        previousPopover = popover;

        popover.style.display = 'block';
        window.setTimeout(function() {
            popover.style.visibility = 'visible';
            popover.classList.add('active');
        }, 10);

        // Reset the scroll state
        popover.querySelector('ul').scrollTop = 0;

        // add backdrop
        document.querySelector('.app-page.app-active').appendChild(backdrop);

        return true;
      }
      return false;
  }

  function openFrom(popover, trigger) {
      var page = document.querySelector('.app-page.app-active');
      trigger = (typeof trigger === 'string' ? page.querySelector(trigger) : trigger);

      if(trigger === null) {
          throw new Error('The trigger for the popover does not exists');
      }

      if(!openable(popover)) return

      var rect = trigger.getBoundingClientRect();
      popover.style.width = trigger.clientWidth + 'px';
      popover.style.top = rect.top + 'px';
      popover.style.left = rect.left + 'px';
  }

  function open(popover, direction) {
    if(typeof direction === 'undefined') {
        direction = 'left'
    }

    if(openable(popover)) {
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
      }
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

  function closeActive() {
      var closable = (previousPopover ? true : false);
      if(closable) {
          close(previousPopover);
      }
      return closable;
  }

  function attachButton(popover, button, autoBind) {
    var button = (typeof button === 'string' ? document.querySelector(button) : button);
    if(button === null) {
      throw new Error('The button does not exists');
    }
    var popoverId = popover.getAttribute('id');
    button.setAttribute('data-popover-id', popoverId);
    if(autoBind === true) {
      button.setAttribute('data-autobind', true);
    }
  }

  function getInstance(popover) {
      return {
          setList: function(list, itemBuilder) {
              setList(popover, list, itemBuilder);
              return this;
          },
          open: function (direction) {
              open(popover, direction);
              return this;
          },
          openFrom: function (trigger) {
              openFrom(popover, trigger);
              return this;
          },
          close: function () {
              close(popover);
              return this;
          },
          onItemChanged: function (callback) {
              onChangeCallbacks.push({id: popover.getAttribute('id'), callback: callback});
              return this;
          },
          attachButton: function (button, autoBind) {
              attachButton(popover, button, autoBind);
              return this;
          }
      }
  }

  phonon.popover = function (el) {
    if(typeof el === 'string' && el === '_caller') {
        return getInstance();
    }
    if(typeof el === 'undefined') {
      return getInstance(buildPopover())
    }

    var popover = (typeof el === 'string' ? document.querySelector(el) : el);
    if(popover === null) {
      throw new Error('The popover with ID ' + el + ' does not exists');
    }

    return getInstance(popover);
  };

  phonon.popoverUtil = {
      closeActive: closeActive
  };

  window.phonon = phonon;

  if(typeof exports === 'object') {
    module.exports = phonon.popover;
  } else if(typeof define === 'function' && define.amd) {
    define(function() { return phonon.popover });
  }

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));
