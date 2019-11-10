(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Notify = global.Notify || {})));
}(this, function (exports) { 'use strict';

  var _objectWithoutProperties = (function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  })

  /*
   * Author: Alex Gibson
   * https://github.com/alexgibson/notify.js
   * License: MIT license
   */

  var N = window.Notification;

  function isFunction(item) {
      return typeof item === 'function';
  }

  function Notify(title) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


      if (typeof title !== 'string') {
          throw new Error('Notify(): first arg (title) must be a string.');
      }

      if (typeof options !== 'object') {
          throw new Error('Notify(): second arg (options) must be an object.');
      }

      var _options$notifyShow = options.notifyShow;
      var
      // Notify options
      notifyShow = _options$notifyShow === undefined ? null : _options$notifyShow;
      var _options$notifyClose = options.notifyClose;
      var notifyClose = _options$notifyClose === undefined ? null : _options$notifyClose;
      var _options$notifyClick = options.notifyClick;
      var notifyClick = _options$notifyClick === undefined ? null : _options$notifyClick;
      var _options$notifyError = options.notifyError;
      var notifyError = _options$notifyError === undefined ? null : _options$notifyError;
      var _options$closeOnClick = options.closeOnClick;
      var closeOnClick = _options$closeOnClick === undefined ? false : _options$closeOnClick;
      var _options$timeout = options.timeout;
      var timeout = _options$timeout === undefined ? null : _options$timeout;

      var rest = _objectWithoutProperties(options, ['notifyShow', 'notifyClose', 'notifyClick', 'notifyError', 'closeOnClick', 'timeout']);

      this.title = title;
      this.options = rest;
      this.permission = null;
      this.closeOnClick = closeOnClick;
      this.timeout = timeout;

      //callback when notification is displayed
      if (isFunction(notifyShow)) {
          this.onShowCallback = notifyShow;
      }

      //callback when notification is closed
      if (isFunction(notifyClose)) {
          this.onCloseCallback = notifyClose;
      }

      //callback when notification is clicked
      if (isFunction(notifyClick)) {
          this.onClickCallback = notifyClick;
      }

      //callback when notification throws error
      if (isFunction(notifyError)) {
          this.onErrorCallback = notifyError;
      }
  }

  // returns true if the browser supports Web Notifications
  // https://developers.google.com/web/updates/2015/05/Notifying-you-of-notificiation-changes
  // @param {perm} for test purposes only
  Notify.isSupported = function (perm) {
      if (!N || !N.requestPermission) {
          return false;
      }

      if (perm === 'granted' || N.permission === 'granted') {
          throw new Error('You must only call this before calling Notification.requestPermission(), otherwise this feature detect would trigger an actual notification!');
      }

      try {
          new N('');
      } catch (e) {
          if (e.name === 'TypeError') {
              return false;
          }
      }
      return true;
  };

  // true if the permission is not granted
  Notify.needsPermission = N && N.permission && N.permission === 'granted' ? false : true;

  // asks the user for permission to display notifications.  Then calls the callback functions is supplied.
  Notify.requestPermission = function (onPermissionGrantedCallback, onPermissionDeniedCallback) {
      N.requestPermission(function (perm) {
          switch (perm) {
              case 'granted':
                  Notify.needsPermission = false;
                  if (isFunction(onPermissionGrantedCallback)) {
                      onPermissionGrantedCallback();
                  }
                  break;
              case 'denied':
                  Notify.needsPermission = true;
                  if (isFunction(onPermissionDeniedCallback)) {
                      onPermissionDeniedCallback();
                  }
                  break;
          }
      });
  };

  Notify.prototype.show = function () {
      this.myNotify = new N(this.title, this.options);

      if (!this.options.requireInteraction && this.timeout && !isNaN(this.timeout)) {
          setTimeout(this.close.bind(this), this.timeout * 1000);
      }

      this.myNotify.addEventListener('show', this, false);
      this.myNotify.addEventListener('error', this, false);
      this.myNotify.addEventListener('close', this, false);
      this.myNotify.addEventListener('click', this, false);
  };

  Notify.prototype.onShowNotification = function (e) {
      if (this.onShowCallback) {
          this.onShowCallback(e);
      }
  };

  Notify.prototype.onCloseNotification = function (e) {
      if (this.onCloseCallback) {
          this.onCloseCallback(e);
      }
      this.destroy();
  };

  Notify.prototype.onClickNotification = function (e) {
      if (this.onClickCallback) {
          this.onClickCallback(e);
      }

      if (this.closeOnClick) {
          this.close();
      }
  };

  Notify.prototype.onErrorNotification = function (e) {
      if (this.onErrorCallback) {
          this.onErrorCallback(e);
      }
      this.destroy();
  };

  Notify.prototype.destroy = function () {
      this.myNotify.removeEventListener('show', this, false);
      this.myNotify.removeEventListener('error', this, false);
      this.myNotify.removeEventListener('close', this, false);
      this.myNotify.removeEventListener('click', this, false);
  };

  Notify.prototype.close = function () {
      this.myNotify.close();
  };

  Notify.prototype.handleEvent = function (e) {
      switch (e.type) {
          case 'show':
              this.onShowNotification(e);
              break;
          case 'close':
              this.onCloseNotification(e);
              break;
          case 'click':
              this.onClickNotification(e);
              break;
          case 'error':
              this.onErrorNotification(e);
              break;
      }
  };

  exports['default'] = Notify;

}));