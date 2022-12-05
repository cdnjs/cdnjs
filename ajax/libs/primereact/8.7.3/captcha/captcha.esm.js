import * as React from 'react';
import { useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils } from 'primereact/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var Captcha = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);
  var instance = React.useRef(null);
  var recaptchaScript = React.useRef(null);
  var isCaptchaLoaded = React.useRef(false);
  var init = function init() {
    instance.current = window.grecaptcha.render(elementRef.current, {
      sitekey: props.siteKey,
      theme: props.theme,
      type: props.type,
      size: props.size,
      tabindex: props.tabIndex,
      hl: props.language,
      callback: recaptchaCallback,
      'expired-callback': recaptchaExpiredCallback
    });
  };
  var reset = function reset() {
    !!instance.current && window.grecaptcha.reset(instance.current);
  };
  var getResponse = function getResponse() {
    return !!instance.current ? window.grecaptcha.getResponse(instance.current) : null;
  };
  var recaptchaCallback = function recaptchaCallback(response) {
    props.onResponse && props.onResponse({
      response: response
    });
  };
  var recaptchaExpiredCallback = function recaptchaExpiredCallback() {
    props.onExpire && props.onExpire();
  };
  var addRecaptchaScript = function addRecaptchaScript() {
    recaptchaScript.current = null;
    if (!window.grecaptcha) {
      var head = document.head || document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = function () {
        if (!window.grecaptcha) {
          // eslint-disable-next-line no-console
          console.warn('Recaptcha is not loaded');
          return;
        }
        window.grecaptcha.ready(function () {
          init();
        });
      };
      recaptchaScript.current = script;
      head.appendChild(recaptchaScript.current);
    }
  };
  useMountEffect(function () {
    if (!isCaptchaLoaded.current) {
      addRecaptchaScript();
      if (window.grecaptcha) {
        init();
      }
      isCaptchaLoaded.current = true;
    }
  });
  useUnmountEffect(function () {
    if (recaptchaScript.current && recaptchaScript.current.parentNode) {
      recaptchaScript.current.parentNode.removeChild(recaptchaScript.current);
    }
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      reset: reset,
      getResponse: getResponse,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var otherProps = ObjectUtils.findDiffKeys(props, Captcha.defaultProps);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id
  }, otherProps));
}));
Captcha.displayName = 'Captcha';
Captcha.defaultProps = {
  __TYPE: 'Captcha',
  id: null,
  siteKey: null,
  theme: 'light',
  type: 'image',
  size: 'normal',
  tabIndex: 0,
  language: 'en',
  onResponse: null,
  onExpire: null
};

export { Captcha };
