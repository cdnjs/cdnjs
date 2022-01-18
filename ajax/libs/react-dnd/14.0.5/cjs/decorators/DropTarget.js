"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropTarget = DropTarget;

var _invariant = require("@react-dnd/invariant");

var _internals = require("../internals");

var _utils = require("./utils");

var _decorateHandler = require("./decorateHandler");

var _createTargetFactory = require("./createTargetFactory");

/**
 * @param type The accepted target type
 * @param spec The DropTarget specification
 * @param collect The props collector function
 * @param options Options
 */
function DropTarget(type, spec, collect) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  (0, _utils.checkDecoratorArguments)('DropTarget', 'type, spec, collect[, options]', type, spec, collect, options);
  var getType = type;

  if (typeof type !== 'function') {
    (0, _invariant.invariant)((0, _utils.isValidType)(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' + 'a string, an array of strings, or a function that returns either given ' + 'the current props. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', type);

    getType = function getType() {
      return type;
    };
  }

  (0, _invariant.invariant)((0, _utils.isPlainObject)(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', spec);
  var createTarget = (0, _createTargetFactory.createTargetFactory)(spec);
  (0, _invariant.invariant)(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
  (0, _invariant.invariant)((0, _utils.isPlainObject)(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
  return function decorateTarget(DecoratedComponent) {
    return (0, _decorateHandler.decorateHandler)({
      containerDisplayName: 'DropTarget',
      createHandler: createTarget,
      registerHandler: _internals.registerTarget,
      createMonitor: function createMonitor(manager) {
        return new _internals.DropTargetMonitorImpl(manager);
      },
      createConnector: function createConnector(backend) {
        return new _internals.TargetConnector(backend);
      },
      DecoratedComponent: DecoratedComponent,
      getType: getType,
      collect: collect,
      options: options
    });
  };
}