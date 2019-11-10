/* ========================================================================
 * Phonon: dialogs.js v0.0.5
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, phonon) {

  'use strict';

  var lastTrigger = false;
  var dialogs = [];

  var createBackdrop = function (id) {
    var backdrop = document.createElement('div');
    backdrop.setAttribute('data-id', id);
    backdrop.classList.add('backdrop-dialog');
    return backdrop;
  };

  var findTrigger = function (target) {
    var triggers = document.querySelectorAll('[data-dialog-id], [data-dialog-close]'), i;
    for (; target && target !== document; target = target.parentNode) {
      for (i = triggers.length; i--;) {
        if (triggers[i] === target) {
          return target;
        }
      }
    }
  };

  var getDialog = function (event) {
    var dialogToggle = findTrigger(event.target);
    if (dialogToggle) {
      var dialogId = dialogToggle.getAttribute('data-dialog-id');
      if(dialogId) {
        return document.querySelector('#'+dialogId);
      } else {
        return findDialog(event.target);
      }
    }
  };

  var findDialog = function (target) {
    var dialogs = document.querySelectorAll('.dialog'), i;

    for (; target && target !== document; target = target.parentNode) {
      for (i = dialogs.length; i--;) {
        if (dialogs[i] === target && target.classList.contains('active')) {
          return target;
        }
      }
    }
  };

  var findDialogObject = function(id) {

    var i = dialogs.length - 1;
    for (; i >= 0; i--) {
      if(dialogs[i].dialog.id === id) {
        var d = dialogs[i];
        d.index = i;
        return d;
      }
    }
    return false;
  };

  var buildDialog = function (type, text, title, cancelable) {
    text = (typeof text === 'string' ? '<p>'+text+'</p>' : '');
    var noTitle = typeof title;
    title = (noTitle === 'string' ? title : type);
    cancelable = (typeof cancelable === 'boolean' ? cancelable : true);

    var div = document.createElement('div');
    div.setAttribute('class', 'dialog');
    div.setAttribute('data-cancelable', cancelable);
    div.id = 'auto-gen-' + type;

    var nodeTitle = (noTitle === undefined ? '' : '<h3>'+title+'</h3>');
    var nodeCancelable = (cancelable ? 'data-dialog-close="true"' : '');
    var btnCancel = '<li><a class="btn btn-flat btn-cancel" '+nodeCancelable+' >Cancel</a></li>';
    var input = '';
    var indicator = '';

    if(type === 'alert') {
      btnCancel = '';
    } else if(type === 'prompt') {
      input = '<input type="text" placeholder="Value">';
    } else if(type === 'indicator') {
      text = '';
      indicator = '<div class="circle-progress active padded-bottom"><div class="spinner"></div></div>';
    }

    var actions = (type === 'indicator' ? '' : '<ul class="buttons">'+
              btnCancel+
              '<li><a class="btn btn-flat primary btn-confirm" data-dialog-close="true">OK</a></li>'+
          '</ul>');

    var alert = '<div class="content">' +
              '<div class="padded-full">' +
                  nodeTitle +
                  text +
                  input +
                  indicator +
              '</div>'+
          '</div>'+
          actions;

    div.innerHTML = alert;

    document.body.appendChild(div);

    return div;
  };

  
  document.on(phonon.event.start, function (evt) {

    if(dialogs.length > 0) {
      var previousDialog = dialogs[dialogs.length - 1].dialog, p = findDialog(evt.target);

      if (!p) {
        if(previousDialog.getAttribute('data-cancelable') !== 'false') {

          // close the previous active dialog
          close(previousDialog);
          
          // dispatch the cancel event
          var evt = new CustomEvent('cancel', {
            detail: { target: previousDialog },
            bubbles: true,
            cancelable: true
          });
          previousDialog.dispatchEvent(evt);
        }
      }

      if (p && p !== previousDialog) {
        // Case where there are two active dialogs
        if (p.id !== previousDialog.id) {
          close(previousDialog);
        }
      } 
    }
  });

  document.on('tap', function (evt) {

    var trigger = findTrigger(evt.target), dialog = null;

    if (trigger) {
      dialog = getDialog(evt);

      lastTrigger = trigger;

      if(dialog) {

        if(dialog.classList.contains('active')) {
          close(dialog);
        } else {
          open(dialog);
        }

        if(!lastTrigger.classList.contains('btn-confirm') && !lastTrigger.classList.contains('btn-cancel')) return;

        var eventName = (lastTrigger.classList.contains('btn-confirm') ? 'confirm' : 'cancel');
        var input = dialog.querySelector('input');
        var inputValue = undefined;

        if(input) inputValue = input.value;

        // dispatch event
        var evt = new CustomEvent(eventName, {
          detail: { inputValue: inputValue, target: dialog },
          bubbles: true,
          cancelable: true
        });
        dialog.dispatchEvent(evt);
      }
    }
  });

  function onHide() {

    var obj = findDialogObject(this.getAttribute('data-id'));
    var backdrop = obj.backdrop;

    backdrop.classList.remove('fadeout');
    document.body.removeChild(backdrop);

    var dialog = obj.dialog;
    dialog.style.visibility = 'hidden';
    dialog.classList.remove('close');

    dialogs.splice(obj.index, 1);

    this.off(phonon.event.transitionEnd, onHide, false);
  }

  function center (target) {

    var computedStyle = getComputedStyle(target),
    width = computedStyle.width,
    height = computedStyle.height;

    width = width.slice(0, width.length - 2);
    height = height.slice(0, height.length - 2);

    var top = (window.innerHeight / 2) - (height / 2);
    target.style.top = top + 'px';
  }

  function open (dialog) {

    dialog.style.visibility = 'visible';

    if(!dialog.classList.contains('active')) {

      center(dialog);

      dialog.classList.add('active');

      var preloader = dialog.querySelector('.circle-progress');

      if(preloader) phonon.preloader(preloader).show();

      var backdrop = createBackdrop(dialog.id);

      dialogs.push( {dialog: dialog, backdrop: backdrop} );

      document.body.appendChild(backdrop);
    }
  }

  function close(dialog) {

    if(dialog.classList.contains('active')) {

      dialog.classList.remove('active');
      dialog.classList.add('close');

      var preloader = dialog.querySelector('.circle-progress');
      if(preloader) phonon.preloader(preloader).hide();

      var obj = findDialogObject(dialog.id);

      var backdrop = obj.backdrop;

      backdrop.classList.add('fadeout');
      backdrop.on(phonon.event.transitionEnd, onHide, false);
    }
  }

  function on(dialog, eventName, callback) {

    var fireEvent = function() {

      var input = dialog.querySelector('input');
      var inputValue = undefined;
      if(input) {
        inputValue = input.value;
      }

      callback(inputValue);
      this.off('tap', fireEvent);
    };

    if(eventName === 'confirm') {
      dialog.querySelector('.btn-confirm').on('tap', fireEvent);
    } else {
      var btnCancel = dialog.querySelector('.btn-cancel');
      if(btnCancel !== null) {
        btnCancel.on('tap', fireEvent);
      }
    }
  }

  phonon.dialog = function(el) {
    if(typeof el === 'undefined') {

      return {
        closeActive: function() {
          var closable = (dialogs.length > 0 ? true : false);

          if(closable) {

            var dialog = dialogs[dialogs.length - 1].dialog;
            if(dialog.getAttribute('data-cancelable') !== 'false') {
              close(dialog);
            }
          }
          return closable;
        },
        alert: function(text, title, cancelable) {
          var dialog = buildDialog('alert', text, title, cancelable);
          open(dialog);
          return {
            on: function(eventName, callback) {
              on(dialog, eventName, callback);
            }
          };
        },
        confirm: function(text, title, cancelable) {
          var dialog = buildDialog('confirm', text, title, cancelable);
          open(dialog);
          return {
            on: function(eventName, callback) {
              on(dialog, eventName, callback);
            }
          };
        },
        prompt: function(text, title, cancelable) {
          var dialog = buildDialog('prompt', text, title, cancelable);
          open(dialog);
          return {
            on: function(eventName, callback) {
              on(dialog, eventName, callback);
            }
          };
        },
        indicator: function(title, cancelable) {
          var dialog = buildDialog('indicator', '', title, cancelable);
          open(dialog);
          return {
            on: function(eventName, callback) {
              on(dialog, eventName, callback, true);
              return this;
            },
            open: function() {
              open(dialog);
              return this;
            },
            close: function() {
              close(dialog);
              return this;
            }
          };
        }
      }
    }

    var dialog = (typeof el === 'string' ? document.querySelector(el) : el);
    if(dialog === null) {
      throw new Error('The following element ' + el + ' does not exists');
    }

    return {
      open: function() {
        open(dialog);
        return this;
      },
      close: function() {
        close(dialog);
        return this;
      },
      on: function(eventName, callback) {
        on(dialog, eventName, callback);
        return this;
      },
      isActive: function() {
        return (dialog.classList.contains('active') ? true : false);
      }
    };
  };

  window.phonon = phonon;

  if(typeof exports === 'object') {
    module.exports = phonon.dialog;
  } else if(typeof define === 'function' && define.amd) {
    define(function() { return phonon.dialog });
  }

}(typeof window !== 'undefined' ? window : this, window.phonon || {}));