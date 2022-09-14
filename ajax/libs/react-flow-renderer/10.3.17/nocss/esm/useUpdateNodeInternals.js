import { useCallback } from 'react';
import { u as useStoreApi, b as useStore } from './index-a12c80bd.js';
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
    var _store$getState$domNo;

    var nodeElement = (_store$getState$domNo = store.getState().domNode) === null || _store$getState$domNo === void 0 ? void 0 : _store$getState$domNo.querySelector(".react-flow__node[data-id=\"".concat(id, "\"]"));

    if (nodeElement) {
      requestAnimationFrame(function () {
        return updateNodeDimensions([{
          id: id,
          nodeElement: nodeElement,
          forceUpdate: true
        }]);
      });
    }
  }, []);
}

export { useUpdateNodeInternals as default };
//# sourceMappingURL=useUpdateNodeInternals.js.map
