/**

 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: statevis
 * @version 0.0.13
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(angular, undefined){
"use strict";
// statevis requires d3.
(function () {
  "use strict";
  var app = angular.module("ct.ui.router.extras.statevis", [ 'ct.ui.router.extras.core', 'ct.ui.router.extras.sticky'  ]);

  app.directive('stateVis', [ '$state', '$timeout', '$interval', stateVisDirective ]);

  /**
   * This directive gets all the current states using $state.get() and displays them in a tree using D3 lib.
   * It then listens for state events and updates the tree.
   *
   * Usage:
   * <state-vis height="1000px" width="1000px"></state-vis>
   */
  function stateVisDirective($state, $timeout, $interval) {
    return {
      scope: {
        width: '@',
        height: '@'
      },
      restrict: 'AE',
      template: '<svg></svg>',
      link: function (_scope, _elem, _attrs) {
        var stateMap = {};
        var width = _scope.width || 400,
          height = _scope.height || 400;

        var tree = d3.layout.tree()
            .size([width - 20, height - 20])
            .separation(function (a, b) {
              return a.parent == b.parent ? 10 : 25;
            });

        var root = $state.get().filter(function (state) { return state.name === ""; })[0];
        var nodes = tree(root);

        root.parent = root;
        root.px = root.x = width / 2;
        root.py = root.y = height / 2;

        var activeNode = { };
        activeNode.px = activeNode.x = root.px;
        activeNode.py = activeNode.y = root.py;

        var diagonal = d3.svg.diagonal();

        var svg = d3.select(_elem.find("svg")[0])
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(10, 10)");

        var node = svg.selectAll(".node"),
          link = svg.selectAll(".link"),
          active = svg.selectAll(".active")
          ;

        var updateInterval = 200,
          transLength = 200,
          timer = setInterval(update, updateInterval);

        function addStates(data) {
          // *********** Convert flat data into a nice tree ***************
          data = data.map(function (node) {
            return node.name === "" ? root : angular.copy(node);
          });
          angular.extend(stateMap, data.reduce(function (map, node) {
            map[node.name] = node;
            return map;
          }, {}));

          data.forEach(function (node) {
            // add to parent
            var parentName = node.name.split(/\./).slice(0, -1).join(".");
            var parent = node.name != parentName && stateMap[parentName];
            if (parent) {
              (parent.children || (parent.children = [])).push(node); // create child array if it doesn't exist
              node.px = parent.px;
              node.py = parent.py;
              nodes.push(node);
            }
          });
        }

        $interval(function () {
          _scope.states = $state.get();
          angular.forEach(nodes, function (n) {
            var s = $state.get(n.name);
            if (s) {
              n.status = s.status || 'exited';
            }
          });
//          _scope.futureStates = $futureState.get();
        }, 250);

        _scope.$watchCollection("states", function (newval, oldval) {
          var oldstates = (oldval || []).map(function (s) { return s.name; });
          addStates((newval || []).filter(function(state) { return oldstates.indexOf(state.name) == -1; } ));
//          addStates(_.reject(newval, function (state) { return _.contains(oldstates, state.name); }));
        });

//        addStates($state.get());
        update(updateInterval);

        function update() {
          // Recompute the layout and data join.
          node = node.data(tree.nodes(root), function (d) { return d.name; });
          link = link.data(tree.links(nodes), function (d) { return d.target.name; });
          active = active.data(activeNode);

          nodes.forEach(function (d) { d.y = d.depth * 70; });

          // Add entering nodes in the parent’s old position.
          var nodeEnter = node.enter();

          function stateName(node) {
            var name = node.name.split(".").pop();
            if (node.sticky) { name += " (STICKY)"; }
            if (node.deepStateRedirect) { name += " (DSR)"; }
            return name;
          }

          active.enter()
            .append("circle")
            .attr("class", "active")
            .attr("r", 13)
            .attr("cx", function (d) { return d.parent.px || 100; })
            .attr("cy", function (d) { return d.parent.py || 100; })
          ;

          nodeEnter.append("circle")
            .attr("class", "node")
            .attr("r", 9)
            .attr("cx", function (d) { return d.parent.px; })
            .attr("cy", function (d) { return d.parent.py; });

          nodeEnter.append("text")
            .attr("class", "label")
            .attr("x", function (d) { return d.parent.px; })
            .attr("y", function (d) { return d.parent.py; })
            .attr("text-anchor", function (d) { return "middle"; })
            .text(stateName)
            .style("fill-opacity", 1);


          // Add entering links in the parent’s old position.
          link.enter().insert("path", ".node")
            .attr("class", "link")
            .attr("d", function (d) {
              var o = {x: d.source.px, y: d.source.py};
              return diagonal({source: o, target: o});
            });

          // Transition nodes and links to their new positions.
          var t = svg.transition()
            .duration(transLength);

          t.selectAll(".link")
            .attr("d", diagonal);

          /* jshint -W093 */
          var circleColors = { entered: '#AF0', exited: '#777', active: '#0f0', inactive: '#55F', future: '#009' };
          t.selectAll(".node")
            .attr("cx", function (d) { return d.px = d.x; })
            .attr("cy", function (d) { return d.py = d.y; })
            .attr("r", function (d) { return d.status === 'active' ? 15 : 10; })
            .style("fill", function (d) { return circleColors[d.status] || "#FFF"; });

          t.selectAll(".label")
            .attr("x", function (d) { return d.px = d.x; })
            .attr("y", function (d) { return d.py = d.y - 15; })
            .attr("transform", function (d) { return "rotate(-25 " + d.x + " " + d.y + ")"; })
          ;

          t.selectAll(".active")
            .attr("x", function (d) { return d.px = d.x; })
            .attr("y", function (d) { return d.py = d.y - 15; });
        }
      }
    };
  }
})();


})(angular);