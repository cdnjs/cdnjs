/**
 * @license React
 * react-compiler-runtime.development.js
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
    var ReactSharedInternals =
      require("react").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    exports.c = function (size) {
      var dispatcher = ReactSharedInternals.H;
      null === dispatcher &&
        error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      return dispatcher.useMemoCache(size);
    };
  })();
