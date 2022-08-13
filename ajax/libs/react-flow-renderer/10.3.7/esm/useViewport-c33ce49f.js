import shallow from 'zustand/shallow';
import { b as useStore } from './index-c9ec5590.js';

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
//# sourceMappingURL=useViewport-c33ce49f.js.map
