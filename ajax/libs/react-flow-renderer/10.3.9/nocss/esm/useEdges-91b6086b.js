import { b as useStore } from './index-59319c26.js';

var edgesSelector = function edgesSelector(state) {
  return state.edges;
};

function useEdges() {
  var edges = useStore(edgesSelector);
  return edges;
}

export { useEdges as u };
//# sourceMappingURL=useEdges-91b6086b.js.map
