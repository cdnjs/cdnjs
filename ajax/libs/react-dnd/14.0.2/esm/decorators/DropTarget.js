import { invariant } from '@react-dnd/invariant';
import { TargetConnector, DropTargetMonitorImpl, registerTarget } from '../internals';
import { isPlainObject, isValidType } from './utils';
import { checkDecoratorArguments } from './utils';
import { decorateHandler } from './decorateHandler';
import { createTargetFactory } from './createTargetFactory';
/**
 * @param type The accepted target type
 * @param spec The DropTarget specification
 * @param collect The props collector function
 * @param options Options
 */

export function DropTarget(type, spec, collect) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  checkDecoratorArguments('DropTarget', 'type, spec, collect[, options]', type, spec, collect, options);
  var getType = type;

  if (typeof type !== 'function') {
    invariant(isValidType(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' + 'a string, an array of strings, or a function that returns either given ' + 'the current props. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', type);

    getType = function getType() {
      return type;
    };
  }

  invariant(isPlainObject(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', spec);
  var createTarget = createTargetFactory(spec);
  invariant(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
  invariant(isPlainObject(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
  return function decorateTarget(DecoratedComponent) {
    return decorateHandler({
      containerDisplayName: 'DropTarget',
      createHandler: createTarget,
      registerHandler: registerTarget,
      createMonitor: function createMonitor(manager) {
        return new DropTargetMonitorImpl(manager);
      },
      createConnector: function createConnector(backend) {
        return new TargetConnector(backend);
      },
      DecoratedComponent: DecoratedComponent,
      getType: getType,
      collect: collect,
      options: options
    });
  };
}