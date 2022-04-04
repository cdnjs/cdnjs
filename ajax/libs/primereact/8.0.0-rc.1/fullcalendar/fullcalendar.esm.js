import * as React from 'react';
import { usePrevious, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils } from 'primereact/utils';

function _extends() {
  _extends = Object.assign || function (target) {
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

var FullCalendar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);
  var config = React.useRef({});
  var calendar = React.useRef(null);
  var prevEvents = usePrevious(props.events);
  var prevOptions = usePrevious(props.options);

  var initialize = function initialize() {
    import('@fullcalendar/core').then(function (module) {
      if (module && module.Calendar) {
        calendar.current = new module.Calendar(elementRef.current, config.current);
        calendar.current.render();

        if (props.events) {
          calendar.current.removeAllEventSources();
          calendar.current.addEventSource(props.events);
        }
      }
    });
  };

  useMountEffect(function () {
    console.warn("FullCalendar component is deprecated. Use FullCalendar component of '@fullcalendar/react' package.");
    config.current = {
      theme: true
    };

    if (props.options) {
      for (var prop in props.options) {
        config.current[prop] = props.options[prop];
      }
    }

    initialize();
  });
  useUpdateEffect(function () {
    if (!calendar.current) {
      initialize();
    } else {
      if (!ObjectUtils.equals(prevEvents, props.events)) {
        calendar.current.removeAllEventSources();
        calendar.addEventSource(props.events);
      }

      if (!ObjectUtils.equals(prevOptions, props.options)) {
        for (var prop in props.options) {
          var optionValue = props.options[prop];
          config.current[prop] = optionValue;
          calendar.current.setOption(prop, optionValue);
        }
      }
    }
  });
  useUnmountEffect(function () {
    if (calendar.current) {
      calendar.current.destroy();
    }
  });
  var otherProps = ObjectUtils.findDiffKeys(props, FullCalendar.defaultProps);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    style: props.style,
    className: props.className
  }, otherProps));
}));
FullCalendar.displayName = 'FullCalendar';
FullCalendar.defaultProps = {
  __TYPE: 'FullCalendar',
  id: null,
  events: [],
  style: null,
  className: null,
  options: null
};

export { FullCalendar };
