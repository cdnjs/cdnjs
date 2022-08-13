import shallow from 'zustand/shallow';
import { b as useStore } from './index-3e3ee133.js';

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
//# sourceMappingURL=useViewport-817bb5a4.js.map
