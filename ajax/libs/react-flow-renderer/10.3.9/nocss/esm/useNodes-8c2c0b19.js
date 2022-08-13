import { b as useStore } from './index-59319c26.js';

var nodesSelector = function nodesSelector(state) {
  return Array.from(state.nodeInternals.values());
};

function useNodes() {
  var nodes = useStore(nodesSelector);
  return nodes;
}

export { useNodes as u };
//# sourceMappingURL=useNodes-8c2c0b19.js.map
