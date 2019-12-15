'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var createSagaMiddleware = require('@redux-saga/core');
var createSagaMiddleware__default = _interopDefault(createSagaMiddleware);



Object.keys(createSagaMiddleware).forEach(function (key) { exports[key] = createSagaMiddleware[key]; });
exports.default = createSagaMiddleware__default;
