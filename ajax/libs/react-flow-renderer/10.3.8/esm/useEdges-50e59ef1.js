import { b as useStore } from './index-3e3ee133.js';

var edgesSelector = function edgesSelector(state) {
  return state.edges;
};

function useEdges() {
  var edges = useStore(edgesSelector);
  return edges;
}

export { useEdges as u };
//# sourceMappingURL=useEdges-50e59ef1.js.map
