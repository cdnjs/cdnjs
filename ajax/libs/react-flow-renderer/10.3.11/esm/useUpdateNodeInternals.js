import { useCallback } from 'react';
import { b as useStore } from './index-de9ac4b8.js';
import 'zustand';
import 'zustand/context';
import 'd3-zoom';

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

export { useUpdateNodeInternals as default };
//# sourceMappingURL=useUpdateNodeInternals.js.map
