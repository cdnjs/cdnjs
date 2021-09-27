import { invariant } from '@react-dnd/invariant';
import { registerSource, DragSourceMonitorImpl, SourceConnector } from '../internals';
import { checkDecoratorArguments, isPlainObject, isValidType } from './utils';
import { decorateHandler } from './decorateHandler';
import { createSourceFactory } from './createSourceFactory';
/**
 * Decorates a component as a dragsource
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */

export function DragSource(type, spec, collect) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  checkDecoratorArguments('DragSource', 'type, spec, collect[, options]', type, spec, collect, options);
  var getType = type;

  if (typeof type !== 'function') {
    invariant(isValidType(type), 'Expected "type" provided as the first argument to DragSource to be ' + 'a string, or a function that returns a string given the current props. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', type);

    getType = function getType() {
      return type;
    };
  }

  invariant(isPlainObject(spec), 'Expected "spec" provided as the second argument to DragSource to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', spec);
  var createSource = createSourceFactory(spec);
  invariant(typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
  invariant(isPlainObject(options), 'Expected "options" provided as the fourth argument to DragSource to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
  return function decorateSource(DecoratedComponent) {
    return decorateHandler({
      containerDisplayName: 'DragSource',
      createHandler: createSource,
      registerHandler: registerSource,
      createConnector: function createConnector(backend) {
        return new SourceConnector(backend);
      },
      createMonitor: function createMonitor(manager) {
        return new DragSourceMonitorImpl(manager);
      },
      DecoratedComponent: DecoratedComponent,
      getType: getType,
      collect: collect,
      options: options
    });
  };
}