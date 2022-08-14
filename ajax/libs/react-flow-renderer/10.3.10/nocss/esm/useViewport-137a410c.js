import shallow from 'zustand/shallow';
import { b as useStore } from './index-0142d63e.js';

var viewportSelector = function viewportSelector(state) {
  return {
    x: state.transform[0],
    y: state.transform[1],
    zoom: state.transform[2]
  };
};

function useViewport() {
  var viewport = useStore(viewportSelector, shallow);
  return viewport;
}

export { useViewport as u };
//# sourceMappingURL=useViewport-137a410c.js.map
