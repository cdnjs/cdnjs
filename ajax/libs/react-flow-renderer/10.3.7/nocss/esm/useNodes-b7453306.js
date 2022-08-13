import { b as useStore } from './index-c9ec5590.js';

var nodesSelector = function nodesSelector(state) {
  return Array.from(state.nodeInternals.values());
};

function useNodes() {
  var nodes = useStore(nodesSelector);
  return nodes;
}

export { useNodes as u };
//# sourceMappingURL=useNodes-b7453306.js.map
