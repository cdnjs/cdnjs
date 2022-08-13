import { b as useStore } from './index-29a58db6.js';

var nodesSelector = function nodesSelector(state) {
  return Array.from(state.nodeInternals.values());
};

function useNodes() {
  var nodes = useStore(nodesSelector);
  return nodes;
}

export { useNodes as u };
//# sourceMappingURL=useNodes-0af58bb1.js.map
