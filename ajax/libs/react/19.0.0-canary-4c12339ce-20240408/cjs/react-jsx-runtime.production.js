/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var React = require('react');

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
const REACT_ELEMENT_TYPE = Symbol.for('react.element');
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

// -----------------------------------------------------------------------------
// as a normal prop instead of stripping it from the props object.
// Passes `ref` as a normal prop instead of stripping it from the props object
// during element creation.

const enableRefAsProp = true;

const ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

const ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;

function hasValidKey(config) {

  return config.key !== undefined;
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


function ReactElement(type, key, _ref, self, source, owner, props) {
  let ref;

  {
    // When enableRefAsProp is on, ignore whatever was passed as the ref
    // argument and treat `props.ref` as the source of truth. The only thing we
    // use this for is `element.ref`, which will log a deprecation warning on
    // access. In the next release, we can remove `element.ref` as well as the
    // `ref` argument.
    const refProp = props.ref; // An undefined `element.ref` is coerced to `null` for
    // backwards compatibility.

    ref = refProp !== undefined ? refProp : null;
  }

  let element;

  {
    // In prod, `ref` is a regular property and _owner doesn't exist.
    element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type,
      key,
      ref,
      props
    };
  }

  return element;
}
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */


function jsxProd(type, config, maybeKey) {
  let key = null;
  let ref = null; // Currently, key can be spread in as a prop. This causes a potential
  // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
  // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
  // but as an intermediary step, we will use jsxDEV for everything except
  // <div {...props} key="Hi" />, because we aren't currently able to tell if
  // key is explicitly declared to be undefined or not.

  if (maybeKey !== undefined) {

    key = '' + maybeKey;
  }

  if (hasValidKey(config)) {

    key = '' + config.key;
  }

  let props;

  if (!('key' in config)) {
    // If key was not spread in, we can reuse the original props object. This
    // only works for `jsx`, not `createElement`, because `jsx` is a compiler
    // target and the compiler always passes a new object. For `createElement`,
    // we can't assume a new object is passed every time because it can be
    // called manually.
    //
    // Spreading key is a warning in dev. In a future release, we will not
    // remove a spread key from the props object. (But we'll still warn.) We'll
    // always pass the object straight through.
    props = config;
  } else {
    // We need to remove reserved props (key, prop, ref). Create a fresh props
    // object and copy over all the non-reserved props. We don't use `delete`
    // because in V8 it will deopt the object to dictionary mode.
    props = {};

    for (const propName in config) {
      // Skip over reserved prop names
      if (propName !== 'key' && (enableRefAsProp )) {
        {
          props[propName] = config[propName];
        }
      }
    }
  }

  return ReactElement(type, key, ref, undefined, undefined, ReactCurrentOwner.current, props);
} // While `jsxDEV` should never be called when running in production, we do

const jsx = jsxProd; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

const jsxs = jsxProd;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;