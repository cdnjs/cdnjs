/**
 * @license React
 * react-dom-test-utils.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
"production" !== process.env.NODE_ENV &&
  (function () {
    function error(format) {
      for (
        var _len2 = arguments.length,
          args = Array(1 < _len2 ? _len2 - 1 : 0),
          _key2 = 1;
        _key2 < _len2;
        _key2++
      )
        args[_key2 - 1] = arguments[_key2];
      printWarning("error", format, args, Error("react-stack-top-frame"));
    }
    function printWarning(level, format, args, currentStack) {
      var isErrorLogger =
        "%s\n\n%s\n" === format || "%o\n\n%s\n\n%s\n" === format;
      ReactSharedInternals.getCurrentStack &&
        ((currentStack = ReactSharedInternals.getCurrentStack(currentStack)),
        "" !== currentStack &&
          ((format += "%s"), (args = args.concat([currentStack]))));
      isErrorLogger
        ? args.unshift(format)
        : ((args = args.map(function (item) {
            return String(item);
          })),
          args.unshift("Warning: " + format));
      Function.prototype.apply.call(console[level], console, args);
    }
    var React = require("react"),
      ReactSharedInternals =
        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      didWarnAboutUsingAct = !1;
    exports.act = function (callback) {
      !1 === didWarnAboutUsingAct &&
        ((didWarnAboutUsingAct = !0),
        error(
          "`ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info."
        ));
      return React.act(callback);
    };
  })();
