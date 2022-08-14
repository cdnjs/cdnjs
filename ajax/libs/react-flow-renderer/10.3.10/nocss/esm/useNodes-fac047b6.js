import { b as useStore } from './index-0142d63e.js';

var nodesSelector = function nodesSelector(state) {
  return Array.from(state.nodeInternals.values());
};

function useNodes() {
  var nodes = useStore(nodesSelector);
  return nodes;
}

export { useNodes as u };
//# sourceMappingURL=useNodes-fac047b6.js.map
