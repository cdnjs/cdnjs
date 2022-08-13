import { b as useStore } from './index-29a58db6.js';

var edgesSelector = function edgesSelector(state) {
  return state.edges;
};

function useEdges() {
  var edges = useStore(edgesSelector);
  return edges;
}

export { useEdges as u };
//# sourceMappingURL=useEdges-3e9448f4.js.map
