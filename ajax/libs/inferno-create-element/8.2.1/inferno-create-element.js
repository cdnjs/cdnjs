(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Inferno = global.Inferno || {}, global.Inferno));
})(this, (function (exports, inferno) { 'use strict';

    function isNullOrUndef(o) {
      return o === void 0 || o === null;
    }
    function isInvalid(o) {
      return o === null || o === false || o === true || o === void 0;
    }
    function isString(o) {
      return typeof o === 'string';
    }
    function isUndefined(o) {
      return o === void 0;
    }

    var componentHooks = {
      onComponentDidAppear: 1,
      onComponentDidMount: 1,
      onComponentDidUpdate: 1,
      onComponentShouldUpdate: 1,
      onComponentWillDisappear: 1,
      onComponentWillMount: 1,
      onComponentWillUnmount: 1,
      onComponentWillUpdate: 1
    };
    function createElement(type, props, _children) {
      {
        if (isInvalid(type)) {
          throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class, function or forwardRef.');
        }
      }
      var children;
      var ref = null;
      var key = null;
      var className = null;
      var flags;
      var newProps;
      var childLen = arguments.length - 2;
      if (childLen === 1) {
        children = _children;
      } else if (childLen > 1) {
        children = [];
        while (childLen-- > 0) {
          children[childLen] = arguments[childLen + 2];
        }
      }
      if (isString(type)) {
        flags = inferno.getFlagsForElementVnode(type);
        if (!isNullOrUndef(props)) {
          newProps = {};
          for (var prop in props) {
            if (prop === 'className' || prop === 'class') {
              className = props[prop];
            } else if (prop === 'key') {
              key = props.key;
            } else if (prop === 'children' && isUndefined(children)) {
              children = props.children; // always favour children args over props
            } else if (prop === 'ref') {
              ref = props.ref;
            } else {
              if (prop === 'contenteditable') {
                flags |= 4096 /* VNodeFlags.ContentEditable */;
              }

              newProps[prop] = props[prop];
            }
          }
        }
      } else {
        flags = 2 /* VNodeFlags.ComponentUnknown */;
        if (!isUndefined(children)) {
          if (!props) {
            props = {};
          }
          props.children = children;
        }
        if (!isNullOrUndef(props)) {
          newProps = {};
          for (var _prop in props) {
            if (_prop === 'key') {
              key = props.key;
            } else if (_prop === 'ref') {
              ref = props.ref;
            } else if (componentHooks[_prop] === 1) {
              if (!ref) {
                ref = {};
              }
              ref[_prop] = props[_prop];
            } else {
              newProps[_prop] = props[_prop];
            }
          }
        }
        return inferno.createComponentVNode(flags, type, newProps, key, ref);
      }
      if (flags & 8192 /* VNodeFlags.Fragment */) {
        return inferno.createFragment(childLen === 1 ? [children] : children, 0 /* ChildFlags.UnknownChildren */, key);
      }
      return inferno.createVNode(flags, type, className, children, 0 /* ChildFlags.UnknownChildren */, newProps, key, ref);
    }

    exports.createElement = createElement;

}));
