import { useCallback } from 'react';
import { u as useStoreApi, b as useStore } from './index-3ffec454.js';
import 'zustand';
import 'zustand/context';
import 'd3-zoom';

var selector = function selector(state) {
  return state.updateNodeDimensions;
};

function useUpdateNodeInternals() {
  var store = useStoreApi();
  var updateNodeDimensions = useStore(selector);
  return useCallback(function (id) {
    var _store$getState = store.getState(),
        domNode = _store$getState.domNode;

    if (!domNode) {
      return;
    }

    var nodeElement = domNode.querySelector(".react-flow__node[data-id=\"".concat(id, "\"]"));

    if (nodeElement) {
      updateNodeDimensions([{
        id: id,
        nodeElement: nodeElement,
        forceUpdate: true
      }]);
    }
  }, []);
}

export { useUpdateNodeInternals as default };
//# sourceMappingURL=useUpdateNodeInternals.js.map
