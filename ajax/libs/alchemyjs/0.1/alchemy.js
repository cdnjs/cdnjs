(function() {
  "Alchemy.js is a graph drawing application for the web.\nCopyright (C) 2014  GraphAlchemist, Inc.\n\nThis program is free software: you can redistribute it and/or modify\nit under the terms of the GNU Affero General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Affero General Public License for more details.\n\nYou should have received a copy of the GNU Affero General Public License\nalong with this program.  If not, see <http://www.gnu.org/licenses/>.\nlets";
  var Alchemy, allCaptions, allTags, container, currentNodeTypes, currentRelationshipTypes, nodeDragStarted, nodeDragended, nodeDragged, rootNodeId,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Alchemy = (function() {
    function Alchemy() {
      this.version = "0.1.0";
      this.layout = {};
      this.interactions = {};
      this.utils = {};
      this.visControls = {};
      this.styles = {};
      this.drawing = {};
      this.log = {};
    }

    return Alchemy;

  })();

  allTags = {};

  allCaptions = {};

  currentNodeTypes = {};

  currentRelationshipTypes = {};

  container = null;

  rootNodeId = null;

  this.alchemy = new Alchemy();

  alchemy.controlDash = {
    init: function() {
      if (alchemy.conf.showControlDash === true) {
        d3.select(".alchemy").append("div").attr("id", "control-dash-wrapper").attr("class", "col-md-4 off-canvas");
        d3.select(".alchemy").append("div").attr("id", "control-dash-background").attr("class", "col-md-4");
        d3.select("#control-dash-wrapper").append("i").attr("id", "dash-toggle").attr("class", "fa fa-flask col-md-offset-12");
        d3.select("#control-dash-wrapper").append("div").attr("id", "control-dash").attr("class", "col-md-12");
        d3.select('#dash-toggle').on('click', alchemy.interactions.toggleControlDash);
        alchemy.controlDash.zoomCtrl();
        alchemy.controlDash.search();
        alchemy.controlDash.filters();
        alchemy.controlDash.stats();
        return alchemy.controlDash.modifyElements();
      }
    },
    search: function() {
      d3.select("#control-dash").append("div").attr("id", "search").html("<div class='input-group'>\n    <input class='form-control' placeholder='Search'>\n    <i class='input-group-addon search-icon'><span class='fa fa-search fa-1x'></span></i>\n</div> ");
      return alchemy.search.init();
    },
    zoomCtrl: function() {
      if (alchemy.conf.zoomControls) {
        d3.select("#control-dash-wrapper").append("div").attr("id", "zoom-controls").attr("class", "col-md-offset-12").html("<button id='zoom-reset'  class='btn btn-defualt btn-primary'><i class='fa fa-crosshairs fa-lg'></i></button> <button id='zoom-in'  class='btn btn-defualt btn-primary'><i class='fa fa-plus'></i></button> <button id='zoom-out' class='btn btn-default btn-primary'><i class='fa fa-minus'></i></button>");
        d3.select('#zoom-in').on("click", function() {
          return alchemy.interactions.clickZoom('in');
        });
        d3.select('#zoom-out').on("click", function() {
          return alchemy.interactions.clickZoom('out');
        });
        return d3.select('#zoom-reset').on("click", function() {
          return alchemy.interactions.clickZoom('reset');
        });
      }
    },
    filters: function() {
      d3.select("#control-dash").append("div").attr("id", "filters");
      return alchemy.filters.init();
    },
    stats: function() {
      d3.select("#control-dash").append("div").attr("id", "stats");
      return alchemy.stats.init();
    },
    modifyElements: function() {
      d3.select("#control-dash").append("div").attr("id", "update-elements");
      return alchemy.modifyElements.init();
    }
  };

  alchemy.drawing.drawedges = function(edge) {
    var edgeStyle;
    if (alchemy.conf.cluster) {
      edgeStyle = function(d) {
        var gid, id, index;
        if (d.source.node_type === "root" || d.target.node_type === "root") {
          index = (d.source.node_type === "root" ? d.target.cluster : d.source.cluster);
        } else if (d.source.cluster === d.target.cluster) {
          index = d.source.cluster;
        } else if (d.source.cluster !== d.target.cluster) {
          id = "" + d.source.cluster + "-" + d.target.cluster;
          gid = "cluster-gradient-" + id;
          return "stroke: url(#" + gid + ")";
        }
        return "stroke: " + (alchemy.styles.getClusterColour(index));
      };
    } else if (alchemy.conf.edgeColour && !alchemy.conf.cluster) {
      edgeStyle = function(d) {
        return "stroke: " + alchemy.conf.edgeColour;
      };
    } else {
      edgeStyle = function(d) {
        return "";
      };
    }
    edge.enter().insert("line", 'g.node').attr("class", function(d) {
      return "edge " + d.caption + " active " + (d.shortest ? 'highlighted' : '');
    }).attr('source-target', function(d) {
      return d.source.id + '-' + d.target.id;
    }).on('click', alchemy.interactions.edgeClick);
    edge.exit().remove();
    return edge.attr('x1', function(d) {
      return d.source.x;
    }).attr('y1', function(d) {
      return d.source.y;
    }).attr('x2', function(d) {
      return d.target.x;
    }).attr('y2', function(d) {
      return d.target.y;
    }).attr('shape-rendering', 'optimizeSpeed').attr("style", function(d) {
      return edgeStyle(d);
    });
  };

  alchemy.drawing.drawnodes = function(node) {
    var nodeColours, nodeEnter, nonRootNodes, rootNodes;
    nodeEnter = node.enter().append("g").attr("class", function(d) {
      var nodeType;
      if (alchemy.conf.nodeTypes) {
        nodeType = d[Object.keys(alchemy.conf.nodeTypes)];
        return "node " + nodeType + " active";
      } else {
        return "node";
      }
    }).attr('id', function(d) {
      return "node-" + d.id;
    }).on('mousedown', function(d) {
      return d.fixed = true;
    }).on('mouseover', alchemy.interactions.nodeMouseOver).on('mouseout', alchemy.interactions.nodeMouseOut).on('dblclick', alchemy.interactions.nodeDoubleClick).on('click', alchemy.interactions.nodeClick);
    if (!alchemy.conf.fixNodes) {
      nonRootNodes = nodeEnter.filter(function(d) {
        return d.node_type !== "root";
      });
      nonRootNodes.call(alchemy.interactions.drag);
    }
    if (!alchemy.conf.fixRootNodes) {
      rootNodes = nodeEnter.filter(function(d) {
        return d.node_type === "root";
      });
      rootNodes.call(alchemy.interactions.drag);
    }
    nodeColours = function(d) {
      var colour;
      if (alchemy.conf.cluster) {
        if ((isNaN(parseInt(d.cluster))) || (d.cluster > alchemy.conf.clusterColours.length)) {
          colour = alchemy.conf.clusterColours[alchemy.conf.clusterColours.length - 1];
        } else {
          colour = alchemy.conf.clusterColours[d.cluster];
        }
        return "fill: " + colour + "; stroke: " + colour + ";";
      } else {
        if (alchemy.conf.nodeColour) {
          return colour = alchemy.conf.nodeColour;
        } else {
          return '';
        }
      }
    };
    nodeEnter.append('circle').attr('class', function(d) {
      return "" + d.node_type + " active";
    }).attr('id', function(d) {
      return "circle-" + d.id;
    }).attr('r', function(d) {
      return alchemy.utils.nodeSize(d);
    }).attr('shape-rendering', 'optimizeSpeed').attr('target-id', function(d) {
      return d.id;
    }).attr('style', function(d) {
      return "" + (nodeColours(d)) + "; stroke-width: " + (this.r / 3);
    });
    return nodeEnter.append('svg:text').attr('id', function(d) {
      return "text-" + d.id;
    }).attr('dy', function(d) {
      if (d.node_type === 'root') {
        return alchemy.conf.rootNodeRadius / 2;
      } else {
        return alchemy.conf.nodeRadius * 2 - 5;
      }
    }).text(function(d) {
      return alchemy.utils.nodeText(d);
    });
  };

  alchemy.filters = {
    init: function() {
      var caption, e, edgeType, edgeTypes, nodeKey, nodeType, nodeTypes, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (alchemy.conf.showFilters) {
        alchemy.filters.show();
      }
      if (alchemy.conf.edgeFilters) {
        alchemy.filters.showEdgeFilters();
      }
      if (alchemy.conf.nodeFilters) {
        alchemy.filters.showNodeFilters();
      }
      if (alchemy.conf.nodeTypes) {
        nodeKey = Object.keys(alchemy.conf.nodeTypes);
        nodeTypes = '';
        _ref = alchemy.conf.nodeTypes[nodeKey];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          nodeType = _ref[_i];
          caption = nodeType.replace('_', ' ');
          nodeTypes += "<li class = 'list-group-item nodeType' role = 'menuitem' id='li-" + nodeType + "' name = " + nodeType + ">" + caption + "</li>";
        }
        $('#node-dropdown').append(nodeTypes);
      }
      if (alchemy.conf.edgeTypes) {
        _ref1 = d3.selectAll(".edge")[0];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          e = _ref1[_j];
          currentRelationshipTypes[[e].caption] = true;
        }
        edgeTypes = '';
        _ref2 = alchemy.conf.edgeTypes;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          edgeType = _ref2[_k];
          if (!edgeType) {
            continue;
          }
          caption = edgeType.replace('_', ' ');
          edgeTypes += "<li class = 'list-group-item edgeType' role = 'menuitem' id='li-" + edgeType + "' name = " + edgeType + ">" + caption + "</li>";
        }
        $('#rel-dropdown').append(edgeTypes);
      }
      if (alchemy.conf.captionsToggle) {
        alchemy.filters.captionsToggle();
      }
      if (alchemy.conf.edgesToggle) {
        alchemy.filters.edgesToggle();
      }
      if (alchemy.conf.nodesToggle) {
        alchemy.filters.nodesToggle();
      }
      return alchemy.filters.update();
    },
    show: function() {
      var filter_html;
      filter_html = "<div id = \"filter-header\" data-toggle=\"collapse\" data-target=\"#filters form\">\n    <h3>\n        Filters\n    </h3>\n    <span class = \"fa fa-2x fa-caret-right\"></span>\n</div>\n    <form class=\"form-inline collapse\">\n    </form>";
      d3.select('#control-dash #filters').html(filter_html);
      d3.selectAll('#filter-header').on('click', function() {
        if (d3.select('#filters>form').classed("in")) {
          return d3.select("#filter-header>span").attr("class", "fa fa-2x fa-caret-right");
        } else {
          return d3.select("#filter-header>span").attr("class", "fa fa-2x fa-caret-down");
        }
      });
      return $('#filters form').submit(false);
    },
    showEdgeFilters: function() {
      var rel_filter_html;
      rel_filter_html = "<div id=\"filter-relationships\">\n     <div id=\"filter-rel-header\" data-target = \"#rel-dropdown\" data-toggle=\"collapse\">\n         <h4>\n             Edge Types\n         </h4>\n         <span class=\"fa fa-lg fa-caret-right\"></span>\n     </div>\n     <ul id=\"rel-dropdown\" class=\"collapse list-group\" role=\"menu\">\n     </ul>\n</div>\n";
      $('#filters form').append(rel_filter_html);
      return d3.select("#filter-rel-header").on('click', function() {
        if (d3.select('#rel-dropdown').classed("in")) {
          return d3.select("#filter-rel-header>span").attr("class", "fa fa-lg fa-caret-right");
        } else {
          return d3.select("#filter-rel-header>span").attr("class", "fa fa-lg fa-caret-down");
        }
      });
    },
    showNodeFilters: function() {
      var node_filter_html;
      node_filter_html = " <div id=\"filter-nodes\">\n     <div id=\"filter-node-header\" data-target = \"#node-dropdown\" data-toggle=\"collapse\">\n         <h4>\n             Node Types\n         </h4>\n         <span class=\"fa fa-lg fa-caret-right\"></span>\n     </div>\n     <ul id=\"node-dropdown\" class=\"collapse list-group\" role=\"menu\">\n     </ul>\n</div>";
      $('#filters form').append(node_filter_html);
      return d3.select("#filter-node-header").on('click', function() {
        if (d3.select('#node-dropdown').classed("in")) {
          return d3.select("#filter-node-header>span").attr("class", "fa fa-lg fa-caret-right");
        } else {
          return d3.select("#filter-node-header>span").attr("class", "fa fa-lg fa-caret-down");
        }
      });
    },
    captionsToggle: function() {
      return d3.select("#filters form").append("li").attr({
        "id": "toggle-captions",
        "class": "list-group-item active-label toggle"
      }).html("Show Captions").on("click", function() {
        var isNowHidden;
        isNowHidden = !d3.select("#toggle-captions").classed("disabled");
        d3.select("#toggle-captions").classed("disabled", function() {
          return isNowHidden;
        });
        return d3.selectAll("g text").classed("hidden", isNowHidden);
      });
    },
    edgesToggle: function() {
      return d3.select("#filters form").append("li").attr({
        "id": "toggle-edges",
        "class": "list-group-item active-label toggle"
      }).html("Toggle Edges").on("click", function() {
        if (d3.selectAll(".edge.hidden")[0].length === 0) {
          return d3.selectAll(".edge").classed("hidden", true);
        } else {
          return d3.selectAll(".edge").classed("hidden", false);
        }
      });
    },
    nodesToggle: function() {
      return d3.select("#filters form").append("li").attr({
        "id": "toggle-nodes",
        "class": "list-group-item active-label toggle"
      }).html("Toggle Nodes").on("click", function() {
        var affectedNodes;
        affectedNodes = alchemy.conf.toggleRootNodes ? ".node,.edge" : ".node:not(.root),.edge";
        if (d3.selectAll(".node.hidden")[0].length === 0) {
          return d3.selectAll(affectedNodes).classed("hidden", true);
        } else {
          return d3.selectAll(affectedNodes).classed("hidden", false);
        }
      });
    },
    update: function() {
      var checked, element, graphElements, name, reFilter, state, tag, tags, vis, _i, _len, _ref;
      vis = alchemy.vis;
      graphElements = {
        "node": vis.selectAll("g"),
        "edge": vis.selectAll("line")
      };
      tags = d3.selectAll(".nodeType, .edgeType");
      reFilter = function(tag, highlight) {
        var checked, edge, edgeType, name, node, nodeId, sourceNode, state, targetNode, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        checked = !element.classed("disabled");
        name = element.attr("name");
        state = checked ? "active" : "inactive";
        if (highlight) {
          state += " highlight";
        }
        name = name.replace(/\s+/g, '_');
        ["node", "edge"].forEach(function(t) {
          return graphElements[t].filter("." + name).attr("class", "" + t + " " + name + " " + state);
        });
        state = state.replace(/\s+/g, '.');
        if (element.classed("nodeType")) {
          _ref = alchemy.node.filter("." + name + "." + state).data();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            nodeId = node.id;
            _ref1 = alchemy.edge.filter("[source-target*='" + nodeId + "']").data();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              edge = _ref1[_j];
              edgeType = edge.caption;
              if (__indexOf.call(alchemy.conf.edgeTypes, edgeType) >= 0) {
                if (d3.select("#li-" + edgeType).classed("disabled")) {
                  alchemy.edge.filter("[source-target*='" + nodeId + "']").classed({
                    "inactive": true,
                    "active": false,
                    "highlight": false
                  });
                } else {
                  alchemy.edge.filter("[source-target*='" + nodeId + "']").classed({
                    "inactive": !checked,
                    "active": checked,
                    "highlight": highlight
                  });
                }
              }
            }
          }
        } else if (element.classed("edgeType")) {
          _ref2 = alchemy.edge.filter("." + name + "." + state).data();
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            edge = _ref2[_k];
            sourceNode = edge.source;
            targetNode = edge.target;
            if (d3.select("#node-" + targetNode.id).classed("inactive") || d3.select("#node-" + sourceNode.id).classed("inactive")) {
              alchemy.edge.filter("[source-target='" + sourceNode.id + "-" + targetNode.id + "']").classed({
                "inactive": true,
                "active": false,
                "highlight": false
              });
            } else {
              alchemy.edge.filter("[source-target='" + sourceNode.id + "-" + targetNode.id + "']");
            }
          }
        } else {
          console.log("ERROR tag was neither edgeType nor nodeType");
        }
        return alchemy.stats.update();
      };
      _ref = tags[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        element = d3.select(tag);
        name = element.attr("name");
        checked = !element.classed("disabled");
        state = checked ? "active" : "inactive";
        element.classed({
          'active-label': checked,
          'disabled': !checked
        });
        reFilter(element, false);
      }
      return tags.on("mouseenter", function() {
        var highlight;
        element = d3.select(this);
        highlight = true;
        return reFilter(element, highlight);
      }).on("mouseleave", function() {
        var highlight;
        element = d3.select(this);
        highlight = false;
        return reFilter(element, highlight);
      }).on("click", function() {
        var highlight;
        element = d3.select(this);
        checked = !element.classed("disabled");
        checked = !checked;
        element.classed({
          'active-label': checked,
          'disabled': !checked
        });
        highlight = false;
        return reFilter(element, highlight);
      });
    }
  };

  nodeDragStarted = function(d, i) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
  };

  nodeDragged = function(d, i) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d.px += d3.event.dx;
    d.py += d3.event.dy;
    d3.select(this).attr("transform", "translate(" + d.x + ", " + d.y + ")");
    if (!alchemy.conf.forceLocked) {
      alchemy.force.start();
    }
    alchemy.edge.attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    }).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  };

  nodeDragended = function(d, i) {
    d3.select(this).classed("dragging", false);
  };

  alchemy.interactions = {
    edgeClick: function(d) {
      var vis;
      vis = alchemy.vis;
      vis.selectAll('line').classed('highlight', false);
      d3.select(this).classed('highlight', true);
      d3.event.stopPropagation;
      if (typeof (alchemy.conf.edgeClick != null) === 'function') {
        return alchemy.conf.edgeClick();
      }
    },
    nodeMouseOver: function(n) {
      if (alchemy.conf.nodeMouseOver != null) {
        if (typeof alchemy.conf.nodeMouseOver === 'function') {
          return alchemy.conf.nodeMouseOver(n);
        } else if (typeof alchemy.conf.nodeMouseOver === ('number' || 'string')) {
          return n[alchemy.conf.nodeMouseOver];
        }
      } else {
        return null;
      }
    },
    nodeMouseOut: function(n) {
      if ((alchemy.conf.nodeMouseOut != null) && typeof alchemy.conf.nodeMouseOut === 'function') {
        return alchemy.conf.nodeMouseOut(n);
      } else {
        return null;
      }
    },
    nodeDoubleClick: function(c) {
      var e, links, _results;
      if (!alchemy.conf.extraDataSource || c.expanded || alchemy.conf.unexpandable.indexOf(c.type === !-1)) {
        return;
      }
      $('<div id="loading-spi"></div>nner').show();
      console.log("loading more data for " + c.id);
      c.expanded = true;
      d3.json(alchemy.conf.extraDataSource + c.id, loadMoreNodes);
      links = findAllEdges(c);
      _results = [];
      for (e in edges) {
        _results.push(edges[e].distance *= 2);
      }
      return _results;
    },
    nodeClick: function(c) {
      d3.event.stopPropagation();
      alchemy.vis.selectAll('line').classed('selected', function(d) {
        return c.id === d.source.id || c.id === d.target.id;
      });
      alchemy.vis.selectAll('.node').classed('selected', function(d) {
        return c.id === d.id;
      }).classed('selected', function(d) {
        return d.id === c.id || alchemy.edges.some(function(e) {
          return ((e.source.id === c.id && e.target.id === d.id) || (e.source.id === d.id && e.target.id === c.id)) && d3.select(".edge[id*='" + d.id + "']").classed("active");
        });
      });
      if (typeof alchemy.conf.nodeClick === 'function') {
        alchemy.conf.nodeClick(c);
      }
    },
    drag: d3.behavior.drag().origin(Object).on("dragstart", nodeDragStarted).on("drag", nodeDragged).on("dragend", nodeDragended),
    zoom: d3.behavior.zoom().scaleExtent([0.2, 2.4]).on("zoom", function() {
      alchemy.vis.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    }),
    clickZoom: function(direction) {
      var endTransform, startTransform;
      startTransform = alchemy.vis.attr("transform").match(/(-*\d+\.*\d*)/g).map(function(a) {
        return parseFloat(a);
      });
      endTransform = startTransform;
      alchemy.vis.attr("transform", function() {
        if (direction === "in") {
          return "translate(" + endTransform.slice(0, 2) + ") scale(" + (endTransform[2] = endTransform[2] + 0.2) + ")";
        } else if (direction === "out") {
          return "translate(" + endTransform.slice(0, 2) + ") scale(" + (endTransform[2] = endTransform[2] - 0.2) + ")";
        } else if (direction === "reset") {
          return "translate(0,0) scale(1)";
        } else {
          return console.log('error');
        }
      });
      this.zoom.scale(endTransform[2]);
      return this.zoom.translate(endTransform.slice(0, 2));
    },
    toggleControlDash: function() {
      var offCanvas;
      offCanvas = d3.select("#control-dash-wrapper").classed("off-canvas");
      d3.select("#control-dash-wrapper").classed({
        "off-canvas": !offCanvas,
        "on-canvas": offCanvas
      });
      return d3.select("#control-dash-background").classed({
        "off-canvas": !offCanvas,
        "on-canvas": offCanvas
      });
    }
  };

  alchemy.layout = {
    gravity: function(k) {
      return 8 * k;
    },
    charge: function(k) {
      if (alchemy.conf.cluster) {
        return -500;
      } else {
        return -10 / k;
      }
    },
    linkStrength: function(edge) {
      if (alchemy.conf.cluster) {
        if (edge.source.cluster === edge.target.cluster) {
          return 1;
        } else {
          return 0.1;
        }
      } else {
        if (edge.source.root || edge.target.root) {
          return 0.9;
        } else {
          return 1;
        }
      }
    },
    friction: function() {
      if (alchemy.conf.cluster) {
        return 0.7;
      } else {
        return 0.9;
      }
    },
    collide: function(node) {
      var nx1, nx2, ny1, ny2, r;
      r = 2.2 * alchemy.utils.nodeSize(node) + alchemy.conf.nodeOverlap;
      nx1 = node.x - r;
      nx2 = node.x + r;
      ny1 = node.y - r;
      ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        var l, x, y;
        if (quad.point && (quad.point !== node)) {
          x = node.x - Math.abs(quad.point.x);
          y = node.y - quad.point.y;
          l = Math.sqrt(x * x + y * y);
          r = r;
          if (l < r) {
            l = (l - r) / l * alchemy.conf.alpha;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    },
    tick: function() {
      var node, q, _i, _len, _ref;
      if (alchemy.conf.collisionDetection) {
        q = d3.geom.quadtree(alchemy.nodes);
        _ref = alchemy.nodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          q.visit(alchemy.layout.collide(node));
        }
      }
      alchemy.edge.attr("x1", function(d) {
        return d.source.x;
      }).attr("y1", function(d) {
        return d.source.y;
      }).attr("x2", function(d) {
        return d.target.x;
      }).attr("y2", function(d) {
        return d.target.y;
      });
      return alchemy.node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    },
    positionRootNodes: function() {
      var i, n, number, rootNodes, _i, _j, _len, _len1, _ref, _results;
      container = {
        width: alchemy.conf.graphWidth(),
        height: alchemy.conf.graphHeight()
      };
      rootNodes = Array();
      _ref = alchemy.nodes;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        n = _ref[i];
        if (!n.root) {
          continue;
        } else {
          n.i = i;
          rootNodes.push(n);
        }
      }
      if (rootNodes.length === 1) {
        n = rootNodes[0];
        alchemy.nodes[n.i].x = container.width / 2;
        alchemy.nodes[n.i].y = container.height / 2;
        alchemy.nodes[n.i].px = container.width / 2;
        alchemy.nodes[n.i].py = container.height / 2;
        alchemy.nodes[n.i].fixed = alchemy.conf.fixRootNodes;
      } else {
        number = 0;
        _results = [];
        for (_j = 0, _len1 = rootNodes.length; _j < _len1; _j++) {
          n = rootNodes[_j];
          number++;
          alchemy.nodes[n.i].x = container.width / Math.sqrt(rootNodes.length * number);
          alchemy.nodes[n.i].y = container.height / 2;
          _results.push(alchemy.nodes[n.i].fixed = true);
        }
        return _results;
      }
    },
    chargeDistance: function() {
      var distance;
      distance = 500;
      return distance;
    },
    linkDistancefn: function(edge, k) {
      if (alchemy.conf.cluster) {
        if ((edge.source.node_type || edge.target.node_type) === 'root') {
          300;
        }
        if (edge.source.cluster === edge.target.cluster) {
          return 10;
        } else {
          return 600;
        }
      } else {
        return 10 / (k * 5);
      }
    }
  };

  alchemy.modifyElements = {
    init: function() {
      if (alchemy.conf.showEditor) {
        return alchemy.modifyElements.show();
      }
    },
    show: function() {
      var modifyElements_html;
      modifyElements_html = "<div id = \"editor-header\" data-toggle=\"collapse\" data-target=\"#update-elements #element-options\">\n     <h3>\n        Editor\n    </h3>\n    <span class = \"fa fa-2x fa-caret-right\"></span>\n</div>";
      d3.select("#update-elements").html(modifyElements_html);
      if (alchemy.conf.removeElement) {
        return alchemy.modifyElements.showRemove();
      }
    },
    showRemove: function() {
      var removeElement_html;
      removeElement_html = "<div id=\"element-options\" class=\"collapse\">\n    <ul class = \"list-group\" id=\"remove\">Remove Selected</ul>\n</div>";
      d3.selectAll('#editor-header').append("div").html(removeElement_html).on('click', function() {
        if (d3.select('#element-options').classed("in")) {
          return d3.select("#editor-header>span").attr("class", "fa fa-2x fa-caret-right");
        } else {
          return d3.select("#editor-header>span").attr("class", "fa fa-2x fa-caret-down");
        }
      });
      return d3.select("#remove").on("click", function() {
        return alchemy.modifyElements.remove();
      });
    },
    remove: function() {
      var selectedEdges, selectedNodes;
      selectedNodes = d3.selectAll(".selected.node").data();
      selectedEdges = d3.selectAll(".selected.edge").data();
      alchemy.edges = _.difference(alchemy.edges, selectedEdges);
      alchemy.nodes = _.difference(alchemy.nodes, selectedNodes);
      alchemy.force.friction(1);
      alchemy.updateGraph(false);
      alchemy.force.resume();
      alchemy.force.friction(0.9);
      return d3.selectAll(".selected").classed("selected", false);
    }
  };

  alchemy.search = {
    init: function() {
      var searchBox;
      searchBox = d3.select("#search input");
      return searchBox.on("keyup", function() {
        d3.selectAll(".node").classed("inactive", false);
        return d3.selectAll(".node").classed("inactive", function(node) {
          var hidden, input;
          input = searchBox[0][0].value.toLowerCase();
          hidden = node.caption.toLowerCase().indexOf(input) < 0;
          if (hidden) {
            d3.selectAll("[source-target*='" + node.id + "']").classed("inactive", hidden);
          } else {
            d3.selectAll("[source-target*='" + node.id + "']").classed("inactive", function(edge) {
              var nodeIDs, sourceHidden, targetHidden;
              nodeIDs = [edge.source.id, edge.target.id];
              sourceHidden = d3.select("#node-" + nodeIDs[0]).classed("inactive");
              targetHidden = d3.select("#node-" + nodeIDs[1]).classed("inactive");
              return targetHidden || sourceHidden;
            });
          }
          return hidden;
        });
      });
    }
  };

  alchemy.startGraph = function(data) {
    var k, no_results, nodesMap;
    if (d3.select(alchemy.conf.divSelector).empty()) {
      console.warn("create an element with the alchemy.conf.divSelector.\ne.g. the defaul #alchemy");
    }
    if (!data) {
      no_results = "<div class=\"modal fade\" id=\"no-results\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <h4 class=\"modal-title\">Sorry!</h4>\n            </div>\n            <div class=\"modal-body\">\n                <p>" + alchemy.conf.warningMessage + "</p>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>";
      $('body').append(no_results);
      $('#no-results').modal('show');
      $('#loading-spinner').hide();
      return;
    }
    alchemy.nodes = data.nodes;
    alchemy.edges = data.edges;
    nodesMap = d3.map();
    alchemy.nodes.forEach(function(n) {
      return nodesMap.set(n.id, n);
    });
    alchemy.edges.forEach(function(e) {
      e.source = nodesMap.get(e.source);
      return e.target = nodesMap.get(e.target);
    });
    alchemy.layout.positionRootNodes();
    alchemy.vis = d3.select(alchemy.conf.divSelector).attr("style", "width:" + (alchemy.conf.graphWidth()) + "px; height:" + (alchemy.conf.graphHeight()) + "px").append("svg").attr("xmlns", "http://www.w3.org/2000/svg").attr("pointer-events", "all").on("dblclick.zoom", null).on('click', alchemy.utils.deselectAll).call(alchemy.interactions.zoom).append('g').attr("transform", "translate(" + alchemy.conf.initialTranslate + ") scale(" + alchemy.conf.initialScale + ")");
    k = Math.sqrt(alchemy.nodes.length / (alchemy.conf.graphWidth() * alchemy.conf.graphHeight()));
    alchemy.force = d3.layout.force().charge(alchemy.layout.charge(k)).linkDistance(function(d) {
      return alchemy.conf.linkDistance(d, k);
    }).theta(1.0).gravity(alchemy.layout.gravity(k)).linkStrength(alchemy.layout.linkStrength).friction(alchemy.layout.friction()).chargeDistance(alchemy.layout.chargeDistance()).size([alchemy.conf.graphWidth(), alchemy.conf.graphHeight()]).nodes(alchemy.nodes).links(alchemy.edges).on("tick", alchemy.layout.tick);
    alchemy.updateGraph();
    alchemy.controlDash.init();
    if (!alchemy.conf.forceLocked) {
      alchemy.force.on("tick", alchemy.layout.tick).start();
    }
    if (alchemy.conf.afterLoad != null) {
      if (typeof alchemy.conf.afterLoad === 'function') {
        alchemy.conf.afterLoad();
      } else if (typeof alchemy.conf.afterLoad === 'string') {
        alchemy[alchemy.conf.afterLoad] = true;
      }
    }
    if (alchemy.conf.initialScale !== alchemy.defaults.initialScale) {
      alchemy.interactions.zoom.scale(alchemy.conf.initialScale);
      return;
    }
    if (alchemy.conf.initialTranslate !== alchemy.defaults.initialTranslate) {
      alchemy.interactions.zoom.translate(alchemy.conf.initialTranslate);
    }
  };

  alchemy.stats = {
    init: function() {
      if (alchemy.conf.showStats === true) {
        alchemy.stats.show();
        return alchemy.stats.update();
      }
    },
    show: function() {
      var stats_html;
      stats_html = "<div id = \"stats-header\" data-toggle=\"collapse\" data-target=\"#stats #all-stats\">\n<h3>\n    Statistics\n</h3>\n<span class = \"fa fa-caret-right fa-2x\"></span>\n</div>\n<div id=\"all-stats\" class=\"collapse\">\n    <ul class = \"list-group\" id=\"node-stats\"></ul>\n    <ul class = \"list-group\" id=\"rel-stats\"></ul>  ";
      d3.select('#stats').html(stats_html);
      return d3.selectAll('#stats-header').on('click', function() {
        if (d3.select('#all-stats').classed("in")) {
          return d3.select("#stats-header>span").attr("class", "fa fa-2x fa-caret-right");
        } else {
          return d3.select("#stats-header>span").attr("class", "fa fa-2x fa-caret-down");
        }
      });
    },
    nodeStats: function() {
      var activeNodes, caption, inactiveNodes, nodeGraph, nodeKey, nodeNum, nodeStats, nodeType, nodeTypes, _i, _len, _ref;
      nodeStats = '';
      nodeNum = d3.selectAll(".node")[0].length;
      activeNodes = d3.selectAll(".node.active")[0].length;
      inactiveNodes = d3.selectAll(".node.inactive")[0].length;
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of nodes: <span class='badge'>" + nodeNum + "</span></li>";
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of active nodes: <span class='badge'>" + activeNodes + "</span></li>";
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of inactive nodes: <span class='badge'>" + inactiveNodes + "</span></li>";
      if (alchemy.conf.nodeTypes) {
        nodeKey = Object.keys(alchemy.conf.nodeTypes);
        nodeTypes = '';
        _ref = alchemy.conf.nodeTypes[nodeKey];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          nodeType = _ref[_i];
          caption = nodeType.replace('_', ' ');
          nodeNum = d3.selectAll("g.node." + nodeType)[0].length;
          nodeTypes += "<li class = 'list-group-item nodeType' id='li-" + nodeType + "' name = " + caption + ">Number of nodes of type " + caption + ": <span class='badge'>" + nodeNum + "</span></li>";
        }
        nodeStats += nodeTypes;
      }
      nodeGraph = "<li id='node-stats-graph' class='list-group-item'></li>";
      nodeStats += nodeGraph;
      return $('#node-stats').html(nodeStats);
    },
    edgeStats: function() {
      var activeEdges, caption, e, edgeData, edgeGraph, edgeNum, edgeType, inactiveEdges, _i, _j, _len, _len1, _ref, _ref1;
      edgeData = [];
      edgeNum = d3.selectAll(".edge")[0].length;
      activeEdges = d3.selectAll(".edge.active")[0].length;
      inactiveEdges = d3.selectAll(".edge.inactive")[0].length;
      edgeGraph = "<li class = 'list-group-item gen_edge_stat'>Number of relationships: <span class='badge'>" + edgeNum + "</span></li> <li class = 'list-group-item gen_edge_stat'>Number of active relationships: <span class='badge'>" + activeEdges + "</span></li> <li class = 'list-group-item gen_edge_stat'>Number of inactive relationships: <span class='badge'>" + inactiveEdges + "</span></li> <li id='edge-stats-graph' class='list-group-item'></li>";
      if (alchemy.conf.edgeTypes) {
        _ref = d3.selectAll(".edge")[0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          currentRelationshipTypes[[e].caption] = true;
        }
        _ref1 = alchemy.conf.edgeTypes;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          edgeType = _ref1[_j];
          if (!edgeType) {
            continue;
          }
          caption = edgeType.replace('_', ' ');
          edgeNum = d3.selectAll(".edge." + edgeType)[0].length;
          edgeData.push(["" + caption, edgeNum]);
        }
      }
      $('#rel-stats').html(edgeGraph);
      alchemy.stats.insertSVG("edge", edgeData);
      return edgeData;
    },
    nodeStats: function() {
      var activeNodes, inactiveNodes, nodeData, nodeGraph, nodeKey, nodeNum, nodeType, totalNodes, _i, _len, _ref;
      nodeData = [];
      totalNodes = d3.selectAll(".node")[0].length;
      activeNodes = d3.selectAll(".node.active")[0].length;
      inactiveNodes = d3.selectAll(".node.inactive")[0].length;
      if (alchemy.conf.nodeTypes) {
        nodeKey = Object.keys(alchemy.conf.nodeTypes);
        _ref = alchemy.conf.nodeTypes[nodeKey];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          nodeType = _ref[_i];
          nodeNum = d3.selectAll("g.node." + nodeType)[0].length;
          nodeData.push(["" + nodeType, nodeNum]);
        }
      }
      nodeGraph = "<li class = 'list-group-item gen_node_stat'>Number of nodes: <span class='badge'>" + totalNodes + "</span></li> <li class = 'list-group-item gen_node_stat'>Number of active nodes: <span class='badge'>" + activeNodes + "</span></li> <li class = 'list-group-item gen_node_stat'>Number of inactive nodes: <span class='badge'>" + inactiveNodes + "</span></li> <li id='node-stats-graph' class='list-group-item'></li>";
      $('#node-stats').html(nodeGraph);
      alchemy.stats.insertSVG("node", nodeData);
      return nodeData;
    },
    insertSVG: function(element, data) {
      var arc, arcs, color, height, pie, radius, svg, width;
      width = alchemy.conf.graphWidth() * .25;
      height = 250;
      radius = width / 4;
      color = d3.scale.category20();
      arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius / 2);
      pie = d3.layout.pie().sort(null).value(function(d) {
        return d[1];
      });
      svg = d3.select("#" + element + "-stats-graph").append("svg").append("g").style({
        "width": width,
        "height": height
      }).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      arcs = svg.selectAll(".arc").data(pie(data)).enter().append("g").classed("arc", true).on("mouseover", function(d, i) {
        return d3.select("#" + data[i][0] + "-stat").classed("hidden", false);
      }).on("mouseout", function(d, i) {
        return d3.select("#" + data[i][0] + "-stat").classed("hidden", true);
      });
      arcs.append("path").attr("d", arc).attr("stroke", function(d, i) {
        return color(i);
      }).attr("stroke-width", 2).attr("fill-opacity", "0.3");
      return arcs.append("text").attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      }).attr("id", function(d, i) {
        return "" + data[i][0] + "-stat";
      }).attr("dy", ".35em").classed("hidden", true).text(function(d, i) {
        return data[i][0];
      });
    },
    update: function() {
      if (alchemy.conf.nodeStats === true) {
        alchemy.stats.nodeStats();
      }
      if (alchemy.conf.edgeStats === true) {
        return alchemy.stats.edgeStats();
      }
    }
  };

  alchemy.updateGraph = function(start) {
    var initialComputationDone;
    if (start == null) {
      start = true;
    }
    alchemy.edge = alchemy.vis.selectAll("line").data(alchemy.edges);
    alchemy.node = alchemy.vis.selectAll("g.node").data(alchemy.nodes, function(d) {
      return d.id;
    });
    if (start) {
      this.force.start();
    }
    if (!initialComputationDone) {
      while (this.force.alpha() > 0.005) {
        alchemy.force.tick();
      }
      initialComputationDone = true;
      console.log(Date() + ' completed initial computation');
      if (alchemy.conf.locked) {
        alchemy.force.stop();
      }
    }
    alchemy.styles.edgeGradient(alchemy.edges);
    alchemy.drawing.drawedges(alchemy.edge);
    alchemy.drawing.drawnodes(alchemy.node);
    alchemy.vis.selectAll('g.node').attr('transform', function(d) {
      return "translate(" + d.x + ", " + d.y + ")";
    });
    alchemy.vis.selectAll('.node text').text((function(_this) {
      return function(d) {
        return _this.utils.nodeText(d);
      };
    })(this));
    return alchemy.node.exit().remove();
  };

  alchemy.defaults = {
    graphWidth: function() {
      return d3.select(this.divSelector).node().parentElement.clientWidth;
    },
    graphHeight: function() {
      if (d3.select(this.divSelector).node().parentElement.nodeName === "BODY") {
        return window.innerHeight;
      } else {
        return d3.select(this.divSelector).node().parentElement.clientHeight;
      }
    },
    alpha: .5,
    cluster: false,
    clusterColours: d3.shuffle(["#DD79FF", "#FFFC00", "#00FF30", "#5168FF", "#00C0FF", "#FF004B", "#00CDCD", "#f83f00", "#f800df", "#ff8d8f", "#ffcd00", "#184fff", "#ff7e00"]),
    collisionDetection: true,
    fixNodes: false,
    fixRootNodes: false,
    forceLocked: true,
    linkDistance: alchemy.layout.linkDistancefn,
    nodePositions: null,
    showEditor: false,
    captionToggle: false,
    edgesToggle: false,
    nodesToggle: false,
    toggleRootNodes: true,
    removeElement: false,
    addNodes: false,
    addEdges: false,
    showControlDash: false,
    showStats: false,
    nodeStats: false,
    edgeStats: false,
    showFilters: false,
    edgeFilters: false,
    nodeFilters: false,
    zoomControls: false,
    nodeCaption: 'caption',
    nodeColour: null,
    nodeMouseOver: 'caption',
    nodeOverlap: 25,
    nodeRadius: 10,
    nodeTypes: null,
    rootNodeRadius: 15,
    edgeCaption: 'caption',
    edgeColour: null,
    edgeTypes: null,
    afterLoad: 'afterLoad',
    divSelector: '#alchemy',
    dataSource: null,
    initialScale: 1,
    initialTranslate: [0, 0],
    scaleExtent: [0.01, 5],
    warningMessage: "There be no data!  What's going on?"
  };

  alchemy.begin = function(userConf) {
    alchemy.conf = _.assign({}, alchemy.defaults, userConf);
    if (typeof alchemy.conf.dataSource === 'string') {
      return d3.json(alchemy.conf.dataSource, alchemy.startGraph);
    } else if (typeof alchemy.conf.dataSource === 'object') {
      return alchemy.startGraph(alchemy.conf.dataSource);
    }
  };

  alchemy.styles = {
    getClusterColour: function(index) {
      if (alchemy.conf.clusterColours[index] != null) {
        return alchemy.conf.clusterColours[index];
      } else {
        return '#EBECE4';
      }
    },
    edgeGradient: function(edges) {
      var Q, defs, edge, endColour, gradient, gradient_id, id, ids, startColour, _i, _len, _results;
      defs = d3.select("" + alchemy.conf.divSelector + " svg").append("svg:defs");
      Q = {};
      for (_i = 0, _len = edges.length; _i < _len; _i++) {
        edge = edges[_i];
        if (edge.source.node_type === "root" || edge.target.node_type === "root") {
          continue;
        }
        if (edge.source.cluster === edge.target.cluster) {
          continue;
        }
        if (edge.target.cluster !== edge.source.cluster) {
          id = edge.source.cluster + "-" + edge.target.cluster;
          if (id in Q) {
            continue;
          } else if (!(id in Q)) {
            startColour = this.getClusterColour(edge.target.cluster);
            endColour = this.getClusterColour(edge.source.cluster);
            Q[id] = {
              'startColour': startColour,
              'endColour': endColour
            };
          }
        }
      }
      _results = [];
      for (ids in Q) {
        gradient_id = "cluster-gradient-" + ids;
        gradient = defs.append("svg:linearGradient").attr("id", gradient_id);
        gradient.append("svg:stop").attr("offset", "0%").attr("stop-color", Q[ids]['startColour']);
        _results.push(gradient.append("svg:stop").attr("offset", "100%").attr("stop-color", Q[ids]['endColour']));
      }
      return _results;
    }
  };

  alchemy.utils = {
    deselectAll: function() {
      var _ref;
      if ((_ref = d3.event) != null ? _ref.defaultPrevented : void 0) {
        return;
      }
      alchemy.vis.selectAll('.node, line').classed('selected highlight', false);
      d3.select('.alchemy svg').classed({
        'highlight-active': false
      });
      alchemy.vis.selectAll('line.edge').classed('highlighted connected unconnected', false);
      alchemy.vis.selectAll('g.node,circle,text').classed('selected unselected neighbor unconnected connecting', false);
      if (alchemy.conf.deselectAll && typeof (alchemy.conf.deselectAll === 'function')) {
        return alchemy.conf.deselectAll();
      }
    },
    centreView: function(id) {
      var delta, level, node, nodeBounds, params, svg, svgBounds, x, y;
      svg = $('#graph').get(0);
      node = $(id).get(0);
      svgBounds = svg.getBoundingClientRect();
      nodeBounds = node.getBoundingClientRect();
      delta = [svgBounds.width / 2 + svgBounds.left - nodeBounds.left - nodeBounds.width / 2, svgBounds.height / 2 + svgBounds.top - nodeBounds.top - nodeBounds.height / 2];
      params = getCurrentViewParams();
      x = parseFloat(params[0]) + delta[0];
      y = parseFloat(params[1]) + delta[1];
      level = parseFloat(params[2]);
      alchemy.vis.transition().attr('transform', "translate(" + x + ", " + y + ") scale(" + level + ")");
      return zoom.translate([x, y]).scale(level);
    },
    nodeText: function(d) {
      var caption;
      if (alchemy.conf.nodeCaption && typeof alchemy.conf.nodeCaption === 'string') {
        if (d[alchemy.conf.nodeCaption] != null) {
          return d[alchemy.conf.nodeCaption];
        } else {
          return '';
        }
      } else if (alchemy.conf.nodeCaption && typeof alchemy.conf.nodeCaption === 'function') {
        caption = alchemy.conf.nodeCaption(d);
        if (caption === void 0 || String(caption) === 'undefined') {
          alchemy.log["caption"] = "At least one caption returned undefined";
          alchemy.conf.caption = false;
        }
        return caption;
      }
    },
    nodeSize: function(d, i) {
      var key;
      if (alchemy.conf.nodeRadius != null) {
        if (typeof alchemy.conf.nodeRadius === 'function') {
          if (d.node_type === 'root') {
            return alchemy.conf.rootNodeRadius;
          } else {
            return alchemy.conf.nodeRadius(d);
          }
        } else if (typeof alchemy.conf.nodeRadius === 'string') {
          key = alchemy.conf.nodeRadius;
          if (d.node_type === 'root') {
            return alchemy.conf.rootNodeRadius;
          } else {
            return d.degree;
          }
        } else if (typeof alchemy.conf.nodeRadius === 'number') {
          if (d.node_type === 'root') {
            return alchemy.conf.rootNodeRadius;
          } else {
            return alchemy.conf.nodeRadius;
          }
        }
      } else {
        return 20;
      }
    }
  };

  alchemy.welcomeConf = {
    forceLocked: false,
    captionToggle: true,
    edgesToggle: true,
    nodesToggle: true,
    toggleRootNodes: true,
    showControlDash: true,
    showStats: true,
    nodeStats: true,
    edgeStats: true,
    showFilters: true,
    edgeFilters: true,
    nodeFilters: true,
    zoomControls: true,
    nodeTypes: null
  };

}).call(this);

//# sourceMappingURL=alchemy.js.map
