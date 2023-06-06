"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
var _unmountComponentAtNode = _interopRequireDefault(require("../unmountComponentAtNode"));
var _renderApplication = _interopRequireWildcard(require("./renderApplication"));
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var emptyObject = {};
var runnables = {};
var componentProviderInstrumentationHook = component => component();
var wrapperComponentProvider;

/**
 * `AppRegistry` is the JS entry point to running all React Native apps.
 */
class AppRegistry {
  static getAppKeys() {
    return Object.keys(runnables);
  }
  static getApplication(appKey, appParameters) {
    (0, _invariant.default)(runnables[appKey] && runnables[appKey].getApplication, "Application " + appKey + " has not been registered. " + 'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.');
    return runnables[appKey].getApplication(appParameters);
  }
  static registerComponent(appKey, componentProvider) {
    runnables[appKey] = {
      getApplication: appParameters => (0, _renderApplication.getApplication)(componentProviderInstrumentationHook(componentProvider), appParameters ? appParameters.initialProps : emptyObject, wrapperComponentProvider && wrapperComponentProvider(appParameters)),
      run: appParameters => (0, _renderApplication.default)(componentProviderInstrumentationHook(componentProvider), wrapperComponentProvider && wrapperComponentProvider(appParameters), appParameters.callback, {
        hydrate: appParameters.hydrate || false,
        initialProps: appParameters.initialProps || emptyObject,
        mode: appParameters.mode || 'concurrent',
        rootTag: appParameters.rootTag
      })
    };
    return appKey;
  }
  static registerConfig(config) {
    config.forEach(_ref => {
      var appKey = _ref.appKey,
        component = _ref.component,
        run = _ref.run;
      if (run) {
        AppRegistry.registerRunnable(appKey, run);
      } else {
        (0, _invariant.default)(component, 'No component provider passed in');
        AppRegistry.registerComponent(appKey, component);
      }
    });
  }

  // TODO: fix style sheet creation when using this method
  static registerRunnable(appKey, run) {
    runnables[appKey] = {
      run
    };
    return appKey;
  }
  static runApplication(appKey, appParameters) {
    var isDevelopment = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
    if (isDevelopment) {
      var params = (0, _objectSpread2.default)({}, appParameters);
      params.rootTag = "#" + params.rootTag.id;
      console.log("Running application \"" + appKey + "\" with appParams:\n", params, "\nDevelopment-level warnings: " + (isDevelopment ? 'ON' : 'OFF') + "." + ("\nPerformance optimizations: " + (isDevelopment ? 'OFF' : 'ON') + "."));
    }
    (0, _invariant.default)(runnables[appKey] && runnables[appKey].run, "Application \"" + appKey + "\" has not been registered. " + 'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.');
    return runnables[appKey].run(appParameters);
  }
  static setComponentProviderInstrumentationHook(hook) {
    componentProviderInstrumentationHook = hook;
  }
  static setWrapperComponentProvider(provider) {
    wrapperComponentProvider = provider;
  }
  static unmountApplicationComponentAtRootTag(rootTag) {
    (0, _unmountComponentAtNode.default)(rootTag);
  }
}
exports.default = AppRegistry;
module.exports = exports.default;