import { useCallback } from 'react';
import { b as useStore } from './index-3e3ee133.js';

var selector = function selector(state) {
  return state.updateNodeDimensions;
};

function useUpdateNodeInternals() {
  var updateNodeDimensions = useStore(selector);
  return useCallback(function (id) {
    var nodeElement = document.querySelector(".react-flow__node[data-id=\"".concat(id, "\"]"));

    if (nodeElement) {
      updateNodeDimensions([{
        id: id,
        nodeElement: nodeElement,
        forceUpdate: true
      }]);
    }
  }, []);
}

export { useUpdateNodeInternals as u };
//# sourceMappingURL=useUpdateNodeInternals-ce69c628.js.map
