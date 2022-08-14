import { b as useStore } from './index-de9ac4b8.js';
import 'zustand';
import 'zustand/context';
import 'd3-zoom';

var nodesSelector = function nodesSelector(state) {
  return Array.from(state.nodeInternals.values());
};

function useNodes() {
  var nodes = useStore(nodesSelector);
  return nodes;
}

export { useNodes as default };
//# sourceMappingURL=useNodes.js.map
