import { b as useStore } from './index-de9ac4b8.js';
import 'zustand';
import 'zustand/context';
import 'd3-zoom';

var edgesSelector = function edgesSelector(state) {
  return state.edges;
};

function useEdges() {
  var edges = useStore(edgesSelector);
  return edges;
}

export { useEdges as default };
//# sourceMappingURL=useEdges.js.map
