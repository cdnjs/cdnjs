(function() {
  "Alchemy.js is a graph drawing application for the web.\nCopyright (C) 2014  GraphAlchemist, Inc.\n\nThis program is free software: you can redistribute it and/or modify\nit under the terms of the GNU Affero General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Affero General Public License for more details.\n\nYou should have received a copy of the GNU Affero General Public License\nalong with this program.  If not, see <http://www.gnu.org/licenses/>.\nlets";
  var Alchemy, currentRelationshipTypes,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Alchemy = (function() {
    function Alchemy() {
      this.allEdges = __bind(this.allEdges, this);
      this.allNodes = __bind(this.allNodes, this);
      this.getEdges = __bind(this.getEdges, this);
      this.getNodes = __bind(this.getNodes, this);
      this.begin = __bind(this.begin, this);
      this.version = "0.3.1";
      this.layout = {};
      this.interactions = {};
      this.utils = {};
      this.visControls = {};
      this.styles = {};
      this.models = {};
      this.drawing = {};
      this.editor = {};
      this.log = {};
      this.currentRelationshipTypes = {};
      this.state = {
        "interactions": "default",
        "layout": "default"
      };
      this._nodes = {};
      this._edges = {};
    }

    Alchemy.prototype.begin = function(userConf) {
      this.setConf(userConf);
      if (typeof alchemy.conf.dataSource === 'string') {
        d3.json(alchemy.conf.dataSource, alchemy.startGraph);
      } else if (typeof alchemy.conf.dataSource === 'object') {
        alchemy.startGraph(alchemy.conf.dataSource);
      }
      return this;
    };

    Alchemy.prototype.setConf = function(userConf) {
      var key, value;
      if (userConf.theme != null) {
        _.merge(alchemy.defaults, alchemy.themes["" + userConf.theme]);
      }
      for (key in userConf) {
        value = userConf[key];
        if (key === "clusterColors") {
          userConf["clusterColours"] = value;
        }
        if (key === "backgroundColor") {
          userConf["backgroundColour"] = value;
        }
        if (key === "nodeColor") {
          userConf["nodeColour"] = value;
        }
      }
      return this.conf = _.merge(alchemy.defaults, userConf);
    };

    Alchemy.prototype.getNodes = function() {
      var id, ids, p, params, results, _i, _len;
      id = arguments[0], ids = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (ids) {
        ids.push(id);
        params = _.union(ids);
        results = [];
        for (_i = 0, _len = params.length; _i < _len; _i++) {
          p = params[_i];
          results.push(alchemy._nodes[p].properties);
        }
        return results;
      } else {
        return [this._nodes[id].properties];
      }
    };

    Alchemy.prototype.getEdges = function(id, target) {
      var edge, edge_id, results;
      if (id == null) {
        id = null;
      }
      if (target == null) {
        target = null;
      }
      if ((id != null) && (target != null)) {
        edge_id = "" + id + "-" + target;
        edge = this._edges[edge_id];
        return [edge.properties];
      } else if ((id != null) && (target == null)) {
        results = _.map(this._edges, function(edge) {
          if ((edge.properties.source === id) || (edge.properties.target === id)) {
            return edge.properties;
          }
        });
        return _.compact(results);
      }
    };

    Alchemy.prototype.allNodes = function() {
      return _.map(this._nodes, function(n) {
        return n.properties;
      });
    };

    Alchemy.prototype.allEdges = function() {
      return _.map(this._edges, function(e) {
        return e.properties;
      });
    };

    return Alchemy;

  })();

  currentRelationshipTypes = {};

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = new Alchemy();
  } else {
    this.alchemy = new Alchemy();
  }

  alchemy.create = {
    nodes: function() {
      var n, nodeMap, nodeMaps, registerNode, results, _i, _len;
      nodeMap = arguments[0], nodeMaps = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      registerNode = function(node) {
        var alchemyNode;
        if (!alchemy._nodes[node.id]) {
          alchemyNode = new alchemy.models.Node(node);
          alchemy._nodes[node.id] = alchemyNode;
          return [alchemyNode];
        } else {
          return console.warn("A node with the id " + node.id + " already exists.\nConsider using the alchemy.get.nodes() method to \nretrieve the node and then using the Node methods.");
        }
      };
      if (nodeMaps.length !== 0) {
        nodeMaps.push(nodeMap);
        results = [];
        for (_i = 0, _len = nodeMaps.length; _i < _len; _i++) {
          n = nodeMaps[_i];
          registerNode(n);
        }
        return results;
      } else {
        return registerNode(nodeMap);
      }
    },
    edges: function() {
      var edgeMap, edgeMaps, registerEdge;
      edgeMap = arguments[0], edgeMaps = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      registerEdge = function(edge) {
        var alchemyEdge, edgeArray;
        if (edge.id && !alchemy._edges[edge.id]) {
          alchemyEdge = new alchemy.models.Edge(edge);
          alchemy._edges[edge.id] = [alchemyEdge];
          return [alchemyEdge];
        } else if (edge.id && alchemy._edges[edge.id]) {
          return console.warn("An edge with that id " + someEdgeMap.id + " already exists.\nConsider using the alchemy.get.edge() method to \nretrieve the edge and then using the Edge methods.\nNote: id's are not required for edges.  Alchemy will create\nan unlimited number of edges for the same source and target node.\nSimply omit 'id' when creating the edge.");
        } else {
          edgeArray = alchemy._edges["" + edge.source + "-" + edge.target];
          if (edgeArray) {
            alchemyEdge = new alchemy.models.Edge(edge, edgeArray.length);
            edgeArray.push(alchemyEdge);
            return [alchemyEdge];
          } else {
            alchemyEdge = new alchemy.models.Edge(edge, 0);
            alchemy._edges["" + edge.source + "-" + edge.target] = [alchemyEdge];
            return [alchemyEdge];
          }
        }
      };
      if (edgeMaps.length !== 0) {
        return console.warn("Make sure this function supports multiple arguments");
      } else {
        return registerEdge(edgeMap);
      }
    }
  };

  alchemy.get = {
    nodes: function() {
      var allIDs, id, ids;
      id = arguments[0], ids = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (id != null) {
        allIDs = _.map(arguments, function(arg) {
          return String(arg);
        });
        return _.filter(alchemy._nodes, function(val, key) {
          if (_.contains(allIDs, key)) {
            return val;
          }
        });
      } else {
        return console.warn("Please specify a node id.");
      }
    },
    edges: function(id, target) {
      var edge, edge_id, results;
      if (id == null) {
        id = null;
      }
      if (target == null) {
        target = null;
      }
      if ((id != null) && (target != null)) {
        edge_id = "" + id + "-" + target;
        edge = alchemy._edges[edge_id];
        return [edge];
      } else if ((id != null) && (target == null)) {
        if (alchemy._edges[id] != null) {
          [_.flatten(alchemy._edges[id])];
        } else {
          results = _.map(alchemy._edges, function(edge) {
            if ((edge.properties.source === id) || (edge.properties.target === id)) {
              return edge.properties;
            }
          });
        }
        return _.compact(results);
      }
    },
    allNodes: function(type) {
      if (type != null) {
        return _.filter(alchemy._nodes, function(n) {
          if (n._nodeType === type) {
            return n;
          }
        });
      } else {
        return _.map(alchemy._nodes, function(n) {
          return n;
        });
      }
    },
    activeNodes: function() {
      return _.filter(alchemy._nodes, function(node) {
        if (node._state === "active") {
          return node;
        }
      });
    },
    allEdges: function() {
      return _.flatten(_.map(alchemy._edges, function(edgeArray) {
        var e, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = edgeArray.length; _i < _len; _i++) {
          e = edgeArray[_i];
          _results.push(e);
        }
        return _results;
      }));
    },
    state: function(key) {
      if (alchemy.state.key != null) {
        return alchemy.state.key;
      }
    },
    clusters: function() {
      var clusterMap, nodesByCluster;
      clusterMap = alchemy.layout._clustering.clusterMap;
      nodesByCluster = {};
      _.each(clusterMap, function(key, value) {
        return nodesByCluster[value] = _.select(alchemy.get.allNodes(), function(node) {
          return node.getProperties()[alchemy.conf.clusterKey] === value;
        });
      });
      return nodesByCluster;
    },
    clusterColours: function() {
      var clusterColoursObject, clusterMap;
      clusterMap = alchemy.layout._clustering.clusterMap;
      clusterColoursObject = {};
      _.each(clusterMap, function(key, value) {
        return clusterColoursObject[value] = alchemy.conf.clusterColours[key % alchemy.conf.clusterColours.length];
      });
      return clusterColoursObject;
    }
  };

  alchemy.set = {
    state: function(key, value) {
      return alchemy.state.key = value;
    }
  };

  alchemy.clustering = (function() {
    function clustering() {
      var clustering, conf, nodes, _charge, _friction, _gravity, _linkDistancefn, _linkStrength;
      nodes = alchemy._nodes;
      conf = alchemy.conf;
      clustering = this;
      this.clusterKey = conf.clusterKey;
      this.identifyClusters();
      _charge = -500;
      _linkStrength = function(edge) {
        var sourceCluster, targetCluster;
        sourceCluster = nodes[edge.source.id]._properties[this.clusterKey];
        targetCluster = nodes[edge.target.id]._properties[this.clusterKey];
        if (sourceCluster === targetCluster) {
          return 0.15;
        } else {
          return 0;
        }
      };
      _friction = function() {
        return 0.7;
      };
      _linkDistancefn = function(edge) {
        nodes = alchemy._nodes;
        if (nodes[edge.source.id]._properties.root || nodes[edge.target.id]._properties.root) {
          return 300;
        } else if (nodes[edge.source.id]._properties[this.clusterKey] === nodes[edge.target.id]._properties[this.clusterKey]) {
          return 10;
        } else {
          return 600;
        }
      };
      _gravity = function(k) {
        return 8 * k;
      };
      this.layout = {
        charge: _charge,
        linkStrength: function(edge) {
          return _linkStrength(edge);
        },
        friction: function() {
          return _friction();
        },
        linkDistancefn: function(edge) {
          return _linkDistancefn(edge);
        },
        gravity: function(k) {
          return _gravity(k);
        }
      };
    }

    clustering.prototype.identifyClusters = function() {
      var clusters, nodes, _i, _ref, _results;
      nodes = alchemy.get.allNodes();
      clusters = _.uniq(_.map(_.values(nodes), function(node) {
        return node.getProperties()[alchemy.conf.clusterKey];
      }));
      return this.clusterMap = _.zipObject(clusters, (function() {
        _results = [];
        for (var _i = 0, _ref = clusters.length; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this));
    };

    clustering.prototype.getClusterColour = function(clusterValue) {
      var index;
      index = this.clusterMap[clusterValue] % alchemy.conf.clusterColours.length;
      return alchemy.conf.clusterColours[index];
    };

    clustering.prototype.edgeGradient = function(edges) {
      var Q, defs, edge, endColour, gradient, gradient_id, id, ids, nodes, startColour, _i, _len, _ref, _results;
      defs = alchemy.vis.select("" + alchemy.conf.divSelector + " svg");
      Q = {};
      nodes = alchemy._nodes;
      _ref = _.map(edges, function(edge) {
        return edge._d3;
      });
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        edge = _ref[_i];
        if (nodes[edge.source.id]._properties.root || nodes[edge.target.id]._properties.root) {
          continue;
        }
        if (nodes[edge.source.id]._properties[this.clusterKey] === nodes[edge.target.id]._properties[this.clusterKey]) {
          continue;
        }
        if (nodes[edge.target.id]._properties[this.clusterKey] !== nodes[edge.source.id]._properties[this.clusterKey]) {
          id = nodes[edge.source.id]._properties[this.clusterKey] + "-" + nodes[edge.target.id]._properties[this.clusterKey];
          if (id in Q) {
            continue;
          } else if (!(id in Q)) {
            startColour = this.getClusterColour(nodes[edge.target.id]._properties[this.clusterKey]);
            endColour = this.getClusterColour(nodes[edge.source.id]._properties[this.clusterKey]);
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
    };

    return clustering;

  })();

  alchemy.clusterControls = {
    init: function() {
      var changeClusterHTML;
      changeClusterHTML = "<input class='form-control form-inline' id='cluster-key' placeholder=\"Cluster Key\"></input>";
      alchemy.dash.select("#clustering-container").append("div").attr("id", "cluster-key-container").attr('class', 'property form-inline form-group').html(changeClusterHTML).style("display", "none");
      alchemy.dash.select("#cluster_control_header").on("click", function() {
        var display, element;
        element = alchemy.dash.select("#cluster-key-container");
        return display = element.style("display");
      });
      element.style("display", function(e) {
        if (display === "block") {
          return "none";
        } else {
          return "block";
        }
      });
      if (alchemy.dash.select("#cluster-key-container").style("display") === "none") {
        alchemy.dash.select("#cluster-arrow").attr("class", "fa fa-2x fa-caret-right");
      } else {
        alchemy.dash.select("#cluster-arrow").attr("class", "fa fa-2x fa-caret-down");
      }
      return alchemy.dash.select("#cluster-key").on("keydown", function() {
        if (d3.event.keyIdentifier === "Enter") {
          alchemy.conf.cluster = true;
          alchemy.conf.clusterKey = this.value;
          return alchemy.generateLayout();
        }
      });
    }
  };

  alchemy.controlDash = {
    init: function() {
      var divSelector;
      if (this.dashIsShown()) {
        divSelector = alchemy.conf.divSelector;
        alchemy.dash = d3.select("" + divSelector).append("div").attr("id", "control-dash-wrapper").attr("class", "col-md-4 initial");
        alchemy.dash.append("i").attr("id", "dash-toggle").attr("class", "fa fa-flask col-md-offset-12");
        alchemy.dash.append("div").attr("id", "control-dash").attr("class", "col-md-12");
        alchemy.dash.select('#dash-toggle').on('click', alchemy.interactions.toggleControlDash);
        alchemy.controlDash.zoomCtrl();
        alchemy.controlDash.search();
        alchemy.controlDash.filters();
        alchemy.controlDash.stats();
        return alchemy.controlDash.clustering();
      }
    },
    search: function() {
      if (alchemy.conf.search) {
        alchemy.dash.select("#control-dash").append("div").attr("id", "search").html("<div class='input-group'>\n    <input class='form-control' placeholder='Search'>\n    <i class='input-group-addon search-icon'><span class='fa fa-search fa-1x'></span></i>\n</div> ");
        return alchemy.search.init();
      }
    },
    zoomCtrl: function() {
      if (alchemy.conf.zoomControls) {
        alchemy.dash.select("#control-dash-wrapper").append("div").attr("id", "zoom-controls").attr("class", "col-md-offset-12").html("<button id='zoom-reset'  class='btn btn-defualt btn-primary'><i class='fa fa-crosshairs fa-lg'></i></button> <button id='zoom-in'  class='btn btn-defualt btn-primary'><i class='fa fa-plus'></i></button> <button id='zoom-out' class='btn btn-default btn-primary'><i class='fa fa-minus'></i></button>");
        alchemy.dash.select('#zoom-in').on("click", function() {
          return alchemy.interactions.clickZoom('in');
        });
        alchemy.dash.select('#zoom-out').on("click", function() {
          return alchemy.interactions.clickZoom('out');
        });
        return alchemy.dash.select('#zoom-reset').on("click", function() {
          return alchemy.interactions.clickZoom('reset');
        });
      }
    },
    filters: function() {
      if (alchemy.conf.nodeFilters || alchemy.conf.edgeFilters) {
        alchemy.dash.select("#control-dash").append("div").attr("id", "filters");
        return alchemy.filters.init();
      }
    },
    stats: function() {
      var stats_html;
      if (alchemy.conf.nodeStats || alchemy.conf.edgeStats) {
        stats_html = "<div id = \"stats-header\" data-toggle=\"collapse\" data-target=\"#stats #all-stats\">\n<h3>\n    Statistics\n</h3>\n<span class = \"fa fa-caret-right fa-2x\"></span>\n</div>\n<div id=\"all-stats\" class=\"collapse\">\n    <ul class = \"list-group\" id=\"node-stats\"></ul>\n    <ul class = \"list-group\" id=\"rel-stats\"></ul>  \n</div>";
        alchemy.dash.select("#control-dash").append("div").attr("id", "stats").html(stats_html).select('#stats-header').on('click', function() {
          if (alchemy.dash.select('#all-stats').classed("in")) {
            return alchemy.dash.select("#stats-header>span").attr("class", "fa fa-2x fa-caret-right");
          } else {
            return alchemy.dash.select("#stats-header>span").attr("class", "fa fa-2x fa-caret-down");
          }
        });
        return alchemy.stats.init();
      }
    },
    clustering: function() {
      var clusterControl_html;
      if (alchemy.conf.clusterControl) {
        clusterControl_html = "<div id=\"clustering-container\">\n    <div id=\"cluster_control_header\" data-toggle=\"collapse\" data-target=\"#clustering #cluster-options\">\n         <h3>Clustering</h3>\n        <span id=\"cluster-arrow\" class=\"fa fa-2x fa-caret-right\"></span>\n    </div>\n</div>";
        alchemy.dash.select("#control-dash").append("div").attr("id", "clustering").html(clusterControl_html).select('#cluster_control_header');
        return alchemy.clusterControls.init();
      }
    },
    dashIsShown: function() {
      var conf;
      conf = alchemy.conf;
      return conf.showEditor || conf.captionToggle || conf.toggleRootNodes || conf.removeElement || conf.clusterControl || conf.nodeStats || conf.edgeStats || conf.edgeFilters || conf.nodeFilters || conf.edgesToggle || conf.nodesToggle || conf.search;
    }
  };

  alchemy.filters = {
    init: function() {
      var caption, e, edgeType, edgeTypes, nodeKey, nodeType, nodeTypes, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      alchemy.filters.show();
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
          nodeTypes += "<li class='list-group-item nodeType' role='menuitem' id='li-" + nodeType + "' name=" + nodeType + ">" + caption + "</li>";
        }
        alchemy.dash.select('#node-dropdown').html(nodeTypes);
      }
      if (alchemy.conf.edgeTypes) {
        _ref1 = alchemy.dash.selectAll(".edge")[0];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          e = _ref1[_j];
          alchemy.currentRelationshipTypes[[e].caption] = true;
        }
        edgeTypes = '';
        _ref2 = alchemy.conf.edgeTypes;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          edgeType = _ref2[_k];
          caption = edgeType.replace('_', ' ');
          edgeTypes += "<li class='list-group-item edgeType' role='menuitem' id='li-" + edgeType + "' name=" + edgeType + ">" + caption + "</li>";
        }
        alchemy.dash.select('#rel-dropdown').html(edgeTypes);
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
      filter_html = "<div id = \"filter-header\" data-toggle=\"collapse\" data-target=\"#filters form\">\n    <h3>Filters</h3>\n    <span class = \"fa fa-2x fa-caret-right\"></span>\n</div>\n    <form class=\"form-inline collapse\">\n    </form>";
      alchemy.dash.select('#control-dash #filters').html(filter_html);
      alchemy.dash.selectAll('#filter-header').on('click', function() {
        if (alchemy.dash.select('#filters>form').classed("in")) {
          return alchemy.dash.select("#filter-header>span").attr("class", "fa fa-2x fa-caret-right");
        } else {
          return alchemy.dash.select("#filter-header>span").attr("class", "fa fa-2x fa-caret-down");
        }
      });
      return alchemy.dash.select('#filters form');
    },
    showEdgeFilters: function() {
      var rel_filter_html;
      rel_filter_html = "<div id=\"filter-rel-header\" data-target = \"#rel-dropdown\" data-toggle=\"collapse\">\n    <h4>\n        Edge Types\n    </h4>\n    <span class=\"fa fa-lg fa-caret-right\"></span>\n</div>\n<ul id=\"rel-dropdown\" class=\"collapse list-group\" role=\"menu\">\n</ul>";
      alchemy.dash.select('#filters form').append("div").attr("id", "filter-relationships").html(rel_filter_html);
      return alchemy.dash.select("#filter-rel-header").on('click', function() {
        if (alchemy.dash.select('#rel-dropdown').classed("in")) {
          return alchemy.dash.select("#filter-rel-header>span").attr("class", "fa fa-lg fa-caret-right");
        } else {
          return alchemy.dash.select("#filter-rel-header>span").attr("class", "fa fa-lg fa-caret-down");
        }
      });
    },
    showNodeFilters: function() {
      var node_filter_html;
      node_filter_html = "<div id=\"filter-node-header\" data-target = \"#node-dropdown\" data-toggle=\"collapse\">\n    <h4>\n        Node Types\n    </h4>\n    <span class=\"fa fa-lg fa-caret-right\"></span>\n</div>\n<ul id=\"node-dropdown\" class=\"collapse list-group\" role=\"menu\">\n</ul>";
      alchemy.dash.select('#filters form').append("div").attr("id", "filter-nodes").html(node_filter_html);
      return alchemy.dash.select("#filter-node-header").on('click', function() {
        if (alchemy.dash.select('#node-dropdown').classed("in")) {
          return alchemy.dash.select("#filter-node-header>span").attr("class", "fa fa-lg fa-caret-right");
        } else {
          return alchemy.dash.select("#filter-node-header>span").attr("class", "fa fa-lg fa-caret-down");
        }
      });
    },
    captionsToggle: function() {
      return alchemy.dash.select("#filters form").append("li").attr({
        "id": "toggle-captions",
        "class": "list-group-item active-label toggle"
      }).html("Show Captions").on("click", function() {
        var isDisplayed;
        isDisplayed = alchemy.dash.select("g text").attr("style");
        if (isDisplayed === "display: block" || null) {
          return alchemy.dash.selectAll("g text").attr("style", "display: none");
        } else {
          return alchemy.dash.selectAll("g text").attr("style", "display: block");
        }
      });
    },
    edgesToggle: function() {
      return alchemy.dash.select("#filters form").append("li").attr({
        "id": "toggle-edges",
        "class": "list-group-item active-label toggle"
      }).html("Toggle Edges").on("click", function() {
        if (_.contains(_.pluck(_.flatten(_.values(alchemy._edges)), "_state"), "active")) {
          return _.each(_.values(alchemy._edges), function(edges) {
            return _.each(edges, function(e) {
              if (e._state === "active") {
                return e.toggleHidden();
              }
            });
          });
        } else {
          return _.each(_.values(alchemy._edges), function(edges) {
            return _.each(edges, function(e) {
              var source, target;
              source = alchemy._nodes[e._properties.source];
              target = alchemy._nodes[e._properties.target];
              if (source._state === "active" && target._state === "active") {
                return e.toggleHidden();
              }
            });
          });
        }
      });
    },
    nodesToggle: function() {
      return alchemy.dash.select("#filters form").append("li").attr({
        "id": "toggle-nodes",
        "class": "list-group-item active-label toggle"
      }).html("Toggle Nodes").on("click", function() {
        if (_.contains(_.pluck(_.values(alchemy._nodes), "_state"), "active")) {
          return _.each(_.values(alchemy._nodes), function(n) {
            if (alchemy.conf.toggleRootNodes && n._d3.root) {
              return;
            }
            if (n._state === "active") {
              return n.toggleHidden();
            }
          });
        } else {
          return _.each(_.values(alchemy._nodes), function(n) {
            if (alchemy.conf.toggleRootNodes && n._d3.root) {
              return;
            }
            return n.toggleHidden();
          });
        }
      });
    },
    update: function() {
      return alchemy.dash.selectAll(".nodeType, .edgeType").on("click", function() {
        var element, tag;
        element = d3.select(this);
        tag = element.attr("name");
        alchemy.vis.selectAll("." + tag).each(function(d) {
          var edge, node, source, target;
          if (alchemy._nodes[d.id] != null) {
            node = alchemy._nodes[d.id];
            return node.toggleHidden();
          } else {
            edge = alchemy._edges[d.id][0];
            source = alchemy._nodes[edge._properties.source];
            target = alchemy._nodes[edge._properties.target];
            if (source._state === "active" && target._state === "active") {
              return edge.toggleHidden();
            }
          }
        });
        return alchemy.stats.nodeStats();
      });
    }
  };

  alchemy.interactions = {
    edgeClick: function(d) {
      var edge;
      d3.event.stopPropagation();
      edge = alchemy._edges[d.id][d.pos];
      if (edge._state !== "hidden") {
        edge._state = (function() {
          if (edge._state === "selected") {
            return "active";
          }
          return "selected";
        })();
        edge.setStyles();
      }
      if (typeof (alchemy.conf.edgeClick != null) === 'function') {
        return alchemy.conf.edgeClick();
      }
    },
    edgeMouseOver: function(d) {
      var edge;
      edge = alchemy._edges[d.id][d.pos];
      if (edge._state !== "hidden") {
        if (edge._state !== "selected") {
          edge._state = "highlighted";
        }
        return edge.setStyles();
      }
    },
    edgeMouseOut: function(d) {
      var edge;
      edge = alchemy._edges[d.id][d.pos];
      if (edge._state !== "hidden") {
        if (edge._state !== "selected") {
          edge._state = "active";
        }
        return edge.setStyles();
      }
    },
    nodeMouseOver: function(n) {
      var node;
      node = alchemy._nodes[n.id];
      if (node._state !== "hidden") {
        if (node._state !== "selected") {
          node._state = "highlighted";
          node.setStyles();
        }
        if (typeof alchemy.conf.nodeMouseOver === 'function') {
          return alchemy.conf.nodeMouseOver(node);
        } else if (typeof alchemy.conf.nodeMouseOver === ('number' || 'string')) {
          return node.properties[alchemy.conf.nodeMouseOver];
        }
      }
    },
    nodeMouseOut: function(n) {
      var node;
      node = alchemy._nodes[n.id];
      if (node._state !== "hidden") {
        if (node._state !== "selected") {
          node._state = "active";
          node.setStyles();
        }
        if ((alchemy.conf.nodeMouseOut != null) && typeof alchemy.conf.nodeMouseOut === 'function') {
          return alchemy.conf.nodeMouseOut(n);
        }
      }
    },
    nodeClick: function(n) {
      var node;
      if (d3.event.defaultPrevented) {
        return;
      }
      d3.event.stopPropagation();
      node = alchemy._nodes[n.id];
      if (node._state !== "hidden") {
        node._state = (function() {
          if (node._state === "selected") {
            return "active";
          }
          return "selected";
        })();
        node.setStyles();
      }
      if (typeof alchemy.conf.nodeClick === 'function') {
        return alchemy.conf.nodeClick(n);
      }
    },
    zoom: function(extent) {
      if (this._zoomBehavior == null) {
        this._zoomBehavior = d3.behavior.zoom();
      }
      return this._zoomBehavior.scaleExtent(extent).on("zoom", function() {
        return alchemy.vis.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
      });
    },
    clickZoom: function(direction) {
      var scale, x, y, _ref;
      _ref = alchemy.vis.attr("transform").match(/(-*\d+\.*\d*)/g).map(function(a) {
        return parseFloat(a);
      }), x = _ref[0], y = _ref[1], scale = _ref[2];
      alchemy.vis.attr("transform", function() {
        if (direction === "in") {
          if (scale < alchemy.conf.scaleExtent[1]) {
            scale += 0.2;
          }
          return "translate(" + x + "," + y + ") scale(" + scale + ")";
        } else if (direction === "out") {
          if (scale > alchemy.conf.scaleExtent[0]) {
            scale -= 0.2;
          }
          return "translate(" + x + "," + y + ") scale(" + scale + ")";
        } else if (direction === "reset") {
          return "translate(0,0) scale(1)";
        } else {
          return console.log('error');
        }
      });
      if (this._zoomBehavior == null) {
        this._zoomBehavior = d3.behavior.zoom();
      }
      return this._zoomBehavior.scale(scale).translate([x, y]);
    },
    toggleControlDash: function() {
      var offCanvas;
      offCanvas = alchemy.dash.classed("off-canvas") || alchemy.dash.classed("initial");
      return alchemy.dash.classed({
        "off-canvas": !offCanvas,
        "initial": false,
        "on-canvas": offCanvas
      });
    },
    nodeDragStarted: function(d, i) {
      d3.event.preventDefault;
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);
      return d.fixed = true;
    },
    nodeDragged: function(d, i) {
      var edgeIDs, id, node, selection, _i, _len, _results;
      d.x += d3.event.dx;
      d.y += d3.event.dy;
      d.px += d3.event.dx;
      d.py += d3.event.dy;
      node = d3.select(this);
      node.attr("transform", "translate(" + d.x + ", " + d.y + ")");
      edgeIDs = alchemy._nodes[d.id]._adjacentEdges;
      _results = [];
      for (_i = 0, _len = edgeIDs.length; _i < _len; _i++) {
        id = edgeIDs[_i];
        selection = alchemy.vis.select("#edge-" + id);
        _results.push(alchemy._drawEdges.updateEdge(selection.data()[0]));
      }
      return _results;
    },
    nodeDragended: function(d, i) {
      d3.select(this).classed({
        "dragging": false
      });
      if (!alchemy.conf.forceLocked) {
        return alchemy.force.start();
      }
    },
    deselectAll: function() {
      var _ref;
      if ((_ref = d3.event) != null ? _ref.defaultPrevented : void 0) {
        return;
      }
      if (alchemy.conf.showEditor === true) {
        alchemy.modifyElements.nodeEditorClear();
      }
      _.each(alchemy._nodes, function(n) {
        n._state = "active";
        return n.setStyles();
      });
      _.each(alchemy._edges, function(edge) {
        return _.each(edge, function(e) {
          e._state = "active";
          return e.setStyles();
        });
      });
      if (alchemy.conf.deselectAll && typeof (alchemy.conf.deselectAll === 'function')) {
        return alchemy.conf.deselectAll();
      }
    }
  };

  alchemy.Layout = (function() {
    function Layout() {
      this.linkDistancefn = __bind(this.linkDistancefn, this);
      this.tick = __bind(this.tick, this);
      this.linkStrength = __bind(this.linkStrength, this);
      this.gravity = __bind(this.gravity, this);
      var conf, nodes;
      conf = alchemy.conf;
      nodes = alchemy._nodes;
      this.k = Math.sqrt(Math.log(_.size(alchemy._nodes)) / (conf.graphWidth() * conf.graphHeight()));
      this._clustering = new alchemy.clustering;
      this.d3NodeInternals = _.map(alchemy._nodes, function(v, k) {
        return v._d3;
      });
      if (conf.cluster) {
        this._charge = function() {
          return this._clustering.layout.charge;
        };
        this._linkStrength = function(edge) {
          return this._clustering.layout.linkStrength(edge);
        };
      } else {
        this._charge = function() {
          return -10 / this.k;
        };
        this._linkStrength = function(edge) {
          if (nodes[edge.source.id].getProperties('root') || nodes[edge.target.id].getProperties('root')) {
            return 1;
          } else {
            return 0.9;
          }
        };
      }
      if (conf.cluster) {
        this._linkDistancefn = function(edge) {
          return this._clustering.layout.linkDistancefn(edge);
        };
      } else if (conf.linkDistancefn === 'default') {
        this._linkDistancefn = function(edge) {
          return 1 / (this.k * 50);
        };
      } else if (typeof conf.linkDistancefn === 'number') {
        this._linkDistancefn = function(edge) {
          return conf.linkDistancefn;
        };
      } else if (typeof conf.linkDistancefn === 'function') {
        this._linkDistancefn = function(edge) {
          return conf.linkDistancefn(edge);
        };
      }
    }

    Layout.prototype.gravity = function() {
      if (alchemy.conf.cluster) {
        return this._clustering.layout.gravity(this.k);
      } else {
        return 50 * this.k;
      }
    };

    Layout.prototype.linkStrength = function(edge) {
      return this._linkStrength(edge);
    };

    Layout.prototype.friction = function() {
      return 0.9;
    };

    Layout.prototype.collide = function(node) {
      var conf, nx1, nx2, ny1, ny2, r;
      conf = alchemy.conf;
      r = 2 * (node.radius + node['stroke-width']) + conf.nodeOverlap;
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
    };

    Layout.prototype.tick = function() {
      var edges, node, q, _i, _len, _ref;
      if (alchemy.conf.collisionDetectionls) {
        q = d3.geom.quadtree(this.d3NodeInternals);
        _ref = this.d3NodeInternals;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          q.visit(this.collide(node));
        }
      }
      alchemy.vis.selectAll("g.node").attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
      edges = alchemy.vis.selectAll("g.edge");
      this.drawEdge = alchemy.drawing.DrawEdge;
      this.drawEdge.styleText(edges);
      return this.drawEdge.styleLink(edges);
    };

    Layout.prototype.positionRootNodes = function() {
      var conf, container, i, n, rootNodes, _i, _len, _ref, _ref1, _results;
      conf = alchemy.conf;
      container = {
        width: conf.graphWidth(),
        height: conf.graphHeight()
      };
      rootNodes = _.filter(alchemy.get.allNodes(), function(node) {
        return node.getProperties('root');
      });
      if (rootNodes.length === 1) {
        n = rootNodes[0];
        _ref = [container.width / 2, container.width / 2], n._d3.x = _ref[0], n._d3.px = _ref[1];
        _ref1 = [container.height / 2, container.height / 2], n._d3.y = _ref1[0], n._d3.py = _ref1[1];
        n._d3.fixed = true;
      } else {
        _results = [];
        for (i = _i = 0, _len = rootNodes.length; _i < _len; i = ++_i) {
          n = rootNodes[i];
          n._d3.x = container.width / Math.sqrt(rootNodes.length * (i + 1));
          n._d3.y = container.height / 2;
          _results.push(n._d3.fixed = true);
        }
        return _results;
      }
    };

    Layout.prototype.chargeDistance = function() {
      return 500;
    };

    Layout.prototype.linkDistancefn = function(edge) {
      return this._linkDistancefn(edge);
    };

    Layout.prototype.charge = function() {
      return this._charge();
    };

    return Layout;

  })();

  alchemy.generateLayout = function(start) {
    var conf;
    if (start == null) {
      start = false;
    }
    conf = alchemy.conf;
    alchemy.layout = new alchemy.Layout;
    alchemy.force = d3.layout.force().size([conf.graphWidth(), conf.graphHeight()]).nodes(_.map(alchemy._nodes, function(node) {
      return node._d3;
    })).links(_.flatten(_.map(alchemy._edges, function(edgeArray) {
      var e, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = edgeArray.length; _i < _len; _i++) {
        e = edgeArray[_i];
        _results.push(e._d3);
      }
      return _results;
    })));
    return alchemy.force.charge(alchemy.layout.charge()).linkDistance(function(link) {
      return alchemy.layout.linkDistancefn(link);
    }).theta(1.0).gravity(alchemy.layout.gravity()).linkStrength(function(link) {
      return alchemy.layout.linkStrength(link);
    }).friction(alchemy.layout.friction()).chargeDistance(alchemy.layout.chargeDistance());
  };

  alchemy.search = {
    init: function() {
      var searchBox;
      searchBox = alchemy.dash.select("#search input");
      return searchBox.on("keyup", function() {
        var input;
        input = searchBox[0][0].value.toLowerCase();
        alchemy.vis.selectAll(".node").classed("inactive", false);
        alchemy.vis.selectAll("text").attr("style", function() {
          if (input !== "") {
            return "display: inline;";
          }
        });
        return alchemy.vis.selectAll(".node").classed("inactive", function(node) {
          var DOMtext, hidden;
          DOMtext = d3.select(this).text();
          switch (alchemy.conf.searchMethod) {
            case 'contains':
              hidden = DOMtext.toLowerCase().indexOf(input) < 0;
              break;
            case 'begins':
              hidden = DOMtext.toLowerCase().indexOf(input) !== 0;
          }
          if (hidden) {
            alchemy.vis.selectAll("[source-target*='" + node.id + "']").classed("inactive", hidden);
          } else {
            alchemy.vis.selectAll("[source-target*='" + node.id + "']").classed("inactive", function(edge) {
              var nodeIDs, sourceHidden, targetHidden;
              nodeIDs = [edge.source.id, edge.target.id];
              sourceHidden = alchemy.vis.select("#node-" + nodeIDs[0]).classed("inactive");
              targetHidden = alchemy.vis.select("#node-" + nodeIDs[1]).classed("inactive");
              return targetHidden || sourceHidden;
            });
          }
          return hidden;
        });
      });
    }
  };

  alchemy.startGraph = (function(_this) {
    return function(data) {
      var arrowSize, conf, d3Edges, d3Nodes, defs, editor, editorInteractions, initialComputationDone, marker, nodes;
      conf = alchemy.conf;
      if (d3.select(conf.divSelector).empty()) {
        console.warn(alchemy.utils.warnings.divWarning());
      }
      if (!data) {
        alchemy.utils.warnings.dataWarning();
      }
      alchemy.create.nodes.apply(_this, data.nodes);
      data.edges.forEach(function(e) {
        return alchemy.create.edges(e);
      });
      alchemy.vis = d3.select(conf.divSelector).attr("style", "width:" + (conf.graphWidth()) + "px; height:" + (conf.graphHeight()) + "px; background:" + conf.backgroundColour).append("svg").attr("xmlns", "http://www.w3.org/2000/svg").attr("xlink", "http://www.w3.org/1999/xlink").attr("pointer-events", "all").on('click', alchemy.interactions.deselectAll).call(alchemy.interactions.zoom(conf.scaleExtent)).on("dblclick.zoom", null).append('g').attr("transform", "translate(" + conf.initialTranslate + ") scale(" + conf.initialScale + ")");
      alchemy.interactions.zoom().scale(conf.initialScale);
      alchemy.interactions.zoom().translate(conf.initialTranslate);
      alchemy.generateLayout();
      alchemy.controlDash.init();
      d3Edges = _.flatten(_.map(alchemy._edges, function(edgeArray) {
        var e, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = edgeArray.length; _i < _len; _i++) {
          e = edgeArray[_i];
          _results.push(e._d3);
        }
        return _results;
      }));
      d3Nodes = _.map(alchemy._nodes, function(n) {
        return n._d3;
      });
      alchemy.layout.positionRootNodes();
      alchemy.force.start();
      while (alchemy.force.alpha() > 0.005) {
        alchemy.force.tick();
      }
      alchemy._drawEdges = alchemy.drawing.DrawEdges;
      alchemy._drawEdges.createEdge(d3Edges);
      alchemy._drawNodes = alchemy.drawing.DrawNodes;
      alchemy._drawNodes.createNode(d3Nodes);
      initialComputationDone = true;
      console.log(Date() + ' completed initial computation');
      nodes = alchemy.vis.selectAll('g.node').attr('transform', function(id, i) {
        return "translate(" + id.x + ", " + id.y + ")";
      });
      if (!conf.forceLocked) {
        alchemy.force.on("tick", alchemy.layout.tick).start();
      }
      if (conf.afterLoad != null) {
        if (typeof conf.afterLoad === 'function') {
          conf.afterLoad();
        } else if (typeof conf.afterLoad === 'string') {
          alchemy[conf.afterLoad] = true;
        }
      }
      if (conf.cluster || conf.directedEdges) {
        defs = d3.select("" + alchemy.conf.divSelector + " svg").append("svg:defs");
      }
      if (conf.directedEdges) {
        arrowSize = conf.edgeArrowSize + (conf.edgeWidth() * 2);
        marker = defs.append("svg:marker").attr("id", "arrow").attr("viewBox", "0 -" + (arrowSize * 0.4) + " " + arrowSize + " " + arrowSize).attr('markerUnits', 'userSpaceOnUse').attr("markerWidth", arrowSize).attr("markerHeight", arrowSize).attr("orient", "auto");
        marker.append("svg:path").attr("d", "M " + arrowSize + ",0 L 0," + (arrowSize * 0.4) + " L 0,-" + (arrowSize * 0.4));
        if (conf.curvedEdges) {
          marker.attr("refX", arrowSize + 1);
        } else {
          marker.attr('refX', 1);
        }
      }
      if (conf.nodeStats) {
        alchemy.stats.nodeStats();
      }
      if (conf.showEditor) {
        editor = new alchemy.editor.Editor;
        editorInteractions = new alchemy.editor.Interactions;
        d3.select("body").on('keydown', editorInteractions.deleteSelected);
        return editor.startEditor();
      }
    };
  })(this);

  alchemy.stats = {
    init: function() {
      return alchemy.stats.update();
    },
    nodeStats: function() {
      var activeNodes, allNodes, caption, inactiveNodes, nodeData, nodeGraph, nodeKeys, nodeNum, nodeStats, nodeType, nodeTypes, _i, _len, _ref;
      nodeStats = '';
      nodeData = [];
      allNodes = alchemy.get.allNodes().length;
      activeNodes = alchemy.get.activeNodes().length;
      inactiveNodes = allNodes - activeNodes;
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of nodes: <span class='badge'>" + allNodes + "</span></li>";
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of active nodes: <span class='badge'>" + activeNodes + "</span></li>";
      nodeStats += "<li class = 'list-group-item gen_node_stat'>Number of inactive nodes: <span class='badge'>" + inactiveNodes + "</span></li>";
      if (alchemy.conf.nodeTypes) {
        nodeKeys = Object.keys(alchemy.conf.nodeTypes);
        nodeTypes = '';
        _ref = alchemy.conf.nodeTypes[nodeKeys];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          nodeType = _ref[_i];
          caption = nodeType.replace('_', ' ');
          nodeNum = alchemy.vis.selectAll("g.node." + nodeType)[0].length;
          nodeTypes += "<li class = 'list-group-item nodeType' id='li-" + nodeType + "' name = " + caption + ">Number of <strong style='text-transform: uppercase'>" + caption + "</strong> nodes: <span class='badge'>" + nodeNum + "</span></li>";
          nodeData.push(["" + nodeType, nodeNum]);
        }
        nodeStats += nodeTypes;
      }
      nodeGraph = "<li id='node-stats-graph' class='list-group-item'></li>";
      nodeStats += nodeGraph;
      alchemy.dash.select('#node-stats').html(nodeStats);
      return this.insertSVG("node", nodeData);
    },
    edgeStats: function() {
      var activeEdges, caption, e, edgeData, edgeGraph, edgeNum, edgeType, inactiveEdges, _i, _j, _len, _len1, _ref, _ref1;
      edgeData = null;
      edgeNum = alchemy.vis.selectAll(".edge")[0].length;
      activeEdges = alchemy.vis.selectAll(".edge.active")[0].length;
      inactiveEdges = alchemy.vis.selectAll(".edge.inactive")[0].length;
      edgeGraph = "<li class = 'list-group-item gen_edge_stat'>Number of relationships: <span class='badge'>" + edgeNum + "</span></li> <li class = 'list-group-item gen_edge_stat'>Number of active relationships: <span class='badge'>" + activeEdges + "</span></li> <li class = 'list-group-item gen_edge_stat'>Number of inactive relationships: <span class='badge'>" + inactiveEdges + "</span></li> <li id='edge-stats-graph' class='list-group-item'></li>";
      if (alchemy.conf.edgeTypes) {
        edgeData = [];
        _ref = alchemy.vis.selectAll(".edge")[0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          alchemy.currentRelationshipTypes[[e].caption] = true;
        }
        _ref1 = alchemy.conf.edgeTypes;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          edgeType = _ref1[_j];
          if (!edgeType) {
            continue;
          }
          caption = edgeType.replace('_', ' ');
          edgeNum = alchemy.vis.selectAll(".edge." + edgeType)[0].length;
          edgeData.push(["" + caption, edgeNum]);
        }
      }
      alchemy.dash.select('#rel-stats').html(edgeGraph);
      alchemy.stats.insertSVG("edge", edgeData);
      return edgeData;
    },
    insertSVG: function(element, data) {
      var arc, arcs, color, height, pie, radius, svg, width;
      if (data === null) {
        return alchemy.dash.select("#" + element + "-stats-graph").html("<br><h4 class='no-data'>There are no " + element + "Types listed in your conf.</h4>");
      } else {
        width = alchemy.conf.graphWidth() * .25;
        height = 250;
        radius = width / 4;
        color = d3.scale.category20();
        arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius / 2);
        pie = d3.layout.pie().sort(null).value(function(d) {
          return d[1];
        });
        svg = alchemy.dash.select("#" + element + "-stats-graph").append("svg").append("g").style({
          "width": width,
          "height": height
        }).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        arcs = svg.selectAll(".arc").data(pie(data)).enter().append("g").classed("arc", true).on("mouseover", function(d, i) {
          return alchemy.dash.select("#" + data[i][0] + "-stat").classed("hidden", false);
        }).on("mouseout", function(d, i) {
          return alchemy.dash.select("#" + data[i][0] + "-stat").classed("hidden", true);
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
      }
    },
    update: function() {
      if (alchemy.conf.nodeStats) {
        alchemy.stats.nodeStats();
      }
      if (alchemy.conf.edgeStats) {
        return alchemy.stats.edgeStats();
      }
    }
  };

  alchemy.defaults = {
    renderer: "svg",
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
    alpha: 0.5,
    collisionDetection: true,
    nodeOverlap: 25,
    fixNodes: false,
    fixRootNodes: false,
    forceLocked: true,
    linkDistancefn: 'default',
    nodePositions: null,
    showEditor: false,
    captionToggle: false,
    toggleRootNodes: false,
    removeElement: false,
    cluster: false,
    clusterKey: "cluster",
    clusterColours: d3.shuffle(["#DD79FF", "#FFFC00", "#00FF30", "#5168FF", "#00C0FF", "#FF004B", "#00CDCD", "#f83f00", "#f800df", "#ff8d8f", "#ffcd00", "#184fff", "#ff7e00"]),
    clusterControl: false,
    nodeStats: false,
    edgeStats: false,
    edgeFilters: false,
    nodeFilters: false,
    edgesToggle: false,
    nodesToggle: false,
    zoomControls: false,
    nodeCaption: 'caption',
    nodeCaptionsOnByDefault: false,
    nodeStyle: {
      "all": {
        "radius": 10,
        "color": "#68B9FE",
        "borderColor": "#127DC1",
        "borderWidth": function(d, radius) {
          return radius / 3;
        },
        "captionColor": "#FFFFFF",
        "captionBackground": null,
        "captionSize": 12,
        "selected": {
          "color": "#FFFFFF",
          "borderColor": "#349FE3"
        },
        "highlighted": {
          "color": "#EEEEFF"
        },
        "hidden": {
          "color": "none",
          "borderColor": "none"
        }
      }
    },
    nodeColour: null,
    nodeMouseOver: 'caption',
    nodeRadius: 10,
    nodeTypes: null,
    rootNodes: 'root',
    rootNodeRadius: 15,
    edgeCaption: 'caption',
    edgeCaptionsOnByDefault: false,
    edgeClick: 'default',
    edgeStyle: {
      "all": {
        "width": 4,
        "color": "#CCC",
        "opacity": 0.2,
        "directed": true,
        "curved": true,
        "selected": {
          "opacity": 1
        },
        "highlighted": {
          "opacity": 1
        },
        "hidden": {
          "opacity": 0
        }
      }
    },
    edgeTypes: null,
    curvedEdges: false,
    edgeWidth: function() {
      return 4;
    },
    edgeOverlayWidth: 20,
    directedEdges: false,
    edgeArrowSize: 5,
    search: false,
    searchMethod: "contains",
    backgroundColour: "#000000",
    theme: null,
    afterLoad: 'afterLoad',
    divSelector: '#alchemy',
    dataSource: null,
    initialScale: 1,
    initialTranslate: [0, 0],
    scaleExtent: [0.5, 2.4],
    dataWarning: "default",
    warningMessage: "There be no data!  What's going on?"
  };

  alchemy.drawing.DrawEdge = {
    createLink: (function(_this) {
      return function(edge) {
        var conf, curved, directed, interactions, utils;
        conf = alchemy.conf;
        curved = conf.curvedEdges;
        directed = conf.directedEdges;
        interactions = alchemy.interactions;
        utils = alchemy.drawing.EdgeUtils;
        edge.append('path').attr('class', 'edge-line').attr('id', function(d) {
          return "path-" + d.id;
        });
        edge.filter(function(d) {
          return d.caption != null;
        }).append('text');
        return edge.append('path').attr('class', 'edge-handler').style('stroke-width', "" + conf.edgeOverlayWidth);
      };
    })(this),
    styleLink: (function(_this) {
      return function(edge) {
        var conf, directed, utils;
        conf = alchemy.conf;
        directed = conf.directedEdges;
        utils = alchemy.drawing.EdgeUtils;
        return edge.each(function(d) {
          var angle, arrowX, arrowY, dx, dy, edgeWalk, endLine, g, hyp, offsetX, offsetY, sideOfX, sideOfY, sourceX, sourceY, startLine, targetX, targetY;
          edgeWalk = utils.edgeWalk(d);
          g = d3.select(this);
          g.style(utils.edgeStyle(d));
          if (!conf.curvedEdges) {
            g.attr('transform', "translate(" + edgeWalk.startEdgeX + ", " + edgeWalk.startEdgeY + ") rotate(" + edgeWalk.edgeAngle + ")");
          }
          g.select('.edge-line').attr('d', conf.curvedEdges ? (angle = utils.edgeAngle(d), sideOfY = Math.abs(angle) > 90 ? -1 : 1, sideOfX = (function(angle) {
            if (angle === 0) {
              return 0;
            }
            if (angle < 0) {
              return -1;
            } else {
              return 1;
            }
          })(angle), startLine = utils.startLine(d), endLine = utils.endLine(d), sourceX = startLine.x, sourceY = startLine.y, targetX = endLine.x, targetY = endLine.y, dx = targetX - sourceX, dy = targetY - sourceY, hyp = Math.sqrt(dx * dx + dy * dy), offsetX = (dx * alchemy.conf.nodeRadius + 2) / hyp, offsetY = (dy * alchemy.conf.nodeRadius + 2) / hyp, arrowX = (-sideOfX * conf.edgeArrowSize) + offsetX, arrowY = (sideOfY * conf.edgeArrowSize) + offsetY, "M " + (sourceX - offsetX) + "," + (sourceY - offsetY) + " A " + hyp + ", " + hyp + " " + (utils.edgeAngle(d)) + " 0, 1 " + (targetX - arrowX) + ", " + (targetY - arrowY)) : conf.directedEdges ? "M " + edgeWalk.startPathX + " " + edgeWalk.startPathBottomY + "\nL " + edgeWalk.arrowBendX + " " + edgeWalk.arrowBendBottomY + "\nL " + edgeWalk.arrowBendX + " " + edgeWalk.arrowTipBottomY + "\nL " + edgeWalk.arrowEndX + " " + edgeWalk.arrowEndY + " \nL " + edgeWalk.arrowBendX + " " + edgeWalk.arrowTipTopY + " \nL " + edgeWalk.arrowBendX + " " + edgeWalk.arrowBendTopY + "\nL " + edgeWalk.startPathX + " " + edgeWalk.startPathTopY + "\nZ" : "M " + edgeWalk.startPathX + " " + edgeWalk.startPathBottomY + "\nL " + edgeWalk.arrowEndX + " " + edgeWalk.arrowBendBottomY + "\nL " + edgeWalk.arrowEndX + " " + edgeWalk.arrowBendTopY + "\nL " + edgeWalk.startPathX + " " + edgeWalk.startPathTopY + "\nZ");
          return g.select('.edge-handler').attr('d', function(d) {
            return g.select('.edge-line').attr('d');
          });
        });
      };
    })(this),
    classEdge: (function(_this) {
      return function(edge) {
        return edge.classed('active', true);
      };
    })(this),
    styleText: (function(_this) {
      return function(edge) {
        var conf, curved, directed, utils;
        conf = alchemy.conf;
        curved = conf.curvedEdges;
        directed = conf.directedEdges;
        utils = alchemy.drawing.EdgeUtils;
        if (curved) {
          return edge.select('text').each(function(d) {
            var edgeWalk;
            edgeWalk = utils.edgeWalk(d);
            return d3.select(this).attr('dx', function(d) {
              return utils.middlePath(d).x;
            }).attr('dy', function(d) {
              return utils.middlePath(d).y + 20;
            }).attr('transform', "rotate(" + (utils.captionAngle(d)) + ")").text(d.caption).style("display", function(d) {
              if (conf.edgeCaptionsOnByDefault) {
                return "block";
              }
            });
          });
        } else {
          return edge.select('text').each(function(d) {
            var captionAngle, dx, edgeWalk;
            edgeWalk = utils.edgeWalk(d);
            captionAngle = utils.captionAngle(d);
            if (captionAngle === 180) {
              dx = -edgeWalk.edgeLength / 2;
            } else {
              dx = edgeWalk.edgeLength / 2;
            }
            return d3.select(this).attr('dx', "" + dx).attr('dy', "" + (-d['stroke-width'] * 1.1)).attr('transform', "rotate(" + captionAngle + ")").text(d.caption).style("display", function(d) {
              if (conf.edgeCaptionsOnByDefault) {
                return "block";
              }
            });
          });
        }
      };
    })(this),
    setInteractions: (function(_this) {
      return function(edge) {
        var editorEnabled, editorInteractions, interactions;
        interactions = alchemy.interactions;
        editorEnabled = alchemy.get.state("interactions") === "editor";
        if (editorEnabled) {
          editorInteractions = new alchemy.editor.Interactions;
          return edge.select('.edge-handler').on('click', editorInteractions.edgeClick);
        } else {
          return edge.select('.edge-handler').on('click', interactions.edgeClick).on('mouseover', function(d) {
            return interactions.edgeMouseOver(d);
          }).on('mouseout', function(d) {
            return interactions.edgeMouseOut(d);
          });
        }
      };
    })(this)
  };

  alchemy.drawing.DrawEdges = {
    createEdge: function(d3Edges) {
      var drawEdge, edge;
      drawEdge = alchemy.drawing.DrawEdge;
      edge = alchemy.vis.selectAll("g.edge").data(d3Edges);
      edge.enter().append('g').attr("id", function(d) {
        return "edge-" + d.id + "-" + d.pos;
      }).attr('class', function(d) {
        return "edge " + d.edgeType;
      }).attr('source-target', function(d) {
        return "" + d.source.id + "-" + d.target.id;
      });
      drawEdge.createLink(edge);
      drawEdge.classEdge(edge);
      drawEdge.styleLink(edge);
      drawEdge.styleText(edge);
      drawEdge.setInteractions(edge);
      edge.exit().remove();
      if (alchemy.conf.directedEdges && alchemy.conf.curvedEdges) {
        return edge.select('.edge-line').attr('marker-end', 'url(#arrow)');
      }
    },
    updateEdge: function(d3Edge) {
      var drawEdge, edge;
      drawEdge = alchemy.drawing.DrawEdge;
      edge = alchemy.vis.select("#edge-" + d3Edge.id + "-" + d3Edge.pos);
      drawEdge.classEdge(edge);
      drawEdge.styleLink(edge);
      drawEdge.styleText(edge);
      return drawEdge.setInteractions(edge);
    }
  };

  alchemy.drawing.DrawNode = {
    styleText: function(node) {
      var conf, nodes, utils;
      conf = alchemy.conf;
      utils = alchemy.drawing.NodeUtils;
      nodes = alchemy._nodes;
      return node.selectAll("text").attr('dy', function(d) {
        if (nodes[d.id].getProperties().root) {
          return conf.rootNodeRadius / 2;
        } else {
          return conf.nodeRadius * 2 - 5;
        }
      }).html(function(d) {
        return utils.nodeText(d);
      }).style("display", function(d) {
        if (conf.nodeCaptionsOnByDefault) {
          return "block";
        }
      });
    },
    createNode: function(node) {
      node.append('circle').attr('id', function(d) {
        return "circle-" + d.id;
      });
      return node.append('svg:text').attr('id', function(d) {
        return "text-" + d.id;
      });
    },
    styleNode: function(node) {
      var utils;
      utils = alchemy.drawing.NodeUtils;
      return node.selectAll('circle').attr('r', function(d) {
        if (typeof d.radius === "function") {
          return d.radius();
        } else {
          return d.radius;
        }
      }).attr('shape-rendering', 'optimizeSpeed').each(function(d) {
        return d3.select(this).style(utils.nodeStyle(d));
      });
    },
    setInteractions: function(node) {
      var conf, coreInteractions, drag, editorEnabled, editorInteractions, nonRootNodes, rootNodes;
      conf = alchemy.conf;
      coreInteractions = alchemy.interactions;
      editorEnabled = alchemy.get.state("interactions") === "editor";
      drag = d3.behavior.drag().origin(Object).on("dragstart", null).on("drag", null).on("dragend", null);
      if (editorEnabled) {
        editorInteractions = new alchemy.editor.Interactions;
        return node.on('mouseup', function(d) {
          return editorInteractions.nodeMouseUp(d);
        }).on('mouseover', function(d) {
          return editorInteractions.nodeMouseOver(d);
        }).on('mouseout', function(d) {
          return editorInteractions.nodeMouseOut(d);
        }).on('dblclick', function(d) {
          return coreInteractions.nodeDoubleClick(d);
        }).on('click', function(d) {
          return editorInteractions.nodeClick(d);
        });
      } else {
        node.on('mouseup', null).on('mouseover', function(d) {
          return coreInteractions.nodeMouseOver(d);
        }).on('mouseout', function(d) {
          return coreInteractions.nodeMouseOut(d);
        }).on('dblclick', function(d) {
          return coreInteractions.nodeDoubleClick(d);
        }).on('click', function(d) {
          return coreInteractions.nodeClick(d);
        });
        drag = d3.behavior.drag().origin(Object).on("dragstart", coreInteractions.nodeDragStarted).on("drag", coreInteractions.nodeDragged).on("dragend", coreInteractions.nodeDragended);
        if (!conf.fixNodes) {
          nonRootNodes = node.filter(function(d) {
            return d.root !== true;
          });
          nonRootNodes.call(drag);
        }
        if (!conf.fixRootNodes) {
          rootNodes = node.filter(function(d) {
            return d.root === true;
          });
          return rootNodes.call(drag);
        }
      }
    }
  };

  alchemy.drawing.DrawNodes = {
    createNode: function(d3Nodes) {
      var drawNode, node;
      drawNode = alchemy.drawing.DrawNode;
      node = alchemy.vis.selectAll("g.node").data(d3Nodes, function(n) {
        return n.id;
      });
      node.enter().append("g").attr("class", function(d) {
        var nodeType;
        nodeType = alchemy._nodes[d.id]._nodeType;
        return "node " + nodeType + " active";
      }).attr('id', function(d) {
        return "node-" + d.id;
      }).classed('root', function(d) {
        return d.root;
      });
      drawNode.createNode(node);
      drawNode.styleNode(node);
      drawNode.styleText(node);
      drawNode.setInteractions(node);
      return node.exit().remove();
    },
    updateNode: function(alchemyNode) {
      var drawNode, node;
      drawNode = alchemy.drawing.DrawNode;
      node = alchemy.vis.select("#node-" + alchemyNode.id);
      drawNode.styleNode(node);
      drawNode.styleText(node);
      return drawNode.setInteractions(node);
    }
  };

  alchemy.drawing.EdgeUtils = {
    edgeStyle: function(d) {
      var clustering, edge, nodes, styles;
      edge = alchemy._edges[d.id][d.pos];
      styles = alchemy.svgStyles.edge.update(edge);
      nodes = alchemy._nodes;
      if (alchemy.conf.cluster) {
        clustering = alchemy.layout._clustering;
        styles.stroke = (function(d) {
          var clusterKey, gid, id, index, source, target;
          nodes = alchemy._nodes;
          clusterKey = alchemy.conf.clusterKey;
          source = nodes[d.source.id]._properties;
          target = nodes[d.target.id]._properties;
          if (source.root || target.root) {
            index = source.root ? target[clusterKey] : source[clusterKey];
            return "" + (clustering.getClusterColour(index));
          } else if (source[clusterKey] === target[clusterKey]) {
            index = source[clusterKey];
            return "" + (clustering.getClusterColour(index));
          } else if (source[clusterKey] !== target[clusterKey]) {
            id = "" + source[clusterKey] + "-" + target[clusterKey];
            gid = "cluster-gradient-" + id;
            return "url(#" + gid + ")";
          }
        })(d);
      }
      return styles;
    },
    triangle: function(edge) {
      var height, width;
      width = edge.target.x - edge.source.x;
      height = edge.target.y - edge.source.y;
      return {
        width: width,
        height: height,
        hyp: Math.sqrt(height * height + width * width)
      };
    },
    edgeWalk: function(edge) {
      var arrowScale, arrowSize, curveOffset, edgeLength, edgeWidth, height, hyp, startPathX, triangle, width;
      arrowSize = alchemy.conf.edgeArrowSize;
      arrowScale = 0.3;
      triangle = this.triangle(edge);
      width = triangle.width;
      height = triangle.height;
      hyp = triangle.hyp;
      edgeWidth = edge['stroke-width'];
      curveOffset = 2;
      startPathX = 0 + edge.source.radius + edge.source['stroke-width'] - (edgeWidth / 2) + curveOffset;
      edgeLength = hyp - startPathX - curveOffset * 1.5;
      return {
        edgeAngle: Math.atan2(height, width) / Math.PI * 180,
        startEdgeX: edge.source.x,
        startEdgeY: edge.source.y,
        midLineX: edge.source.x + width / 2,
        midLineY: edge.source.x + height / 2,
        endLineX: edge.source.x + width / hyp,
        endLineY: edge.source.x + height / hyp,
        startPathX: startPathX,
        startPathBottomY: edgeWidth / 2,
        arrowBendX: edgeLength - arrowSize,
        arrowBendBottomY: edgeWidth / 2,
        arrowTipBottomY: edgeWidth / 2 + (arrowSize * arrowScale),
        arrowEndX: edgeLength,
        arrowEndY: 0,
        arrowTipTopY: -(arrowSize * arrowScale + edgeWidth / 2),
        arrowBendTopY: -edgeWidth / 2,
        startPathTopY: -edgeWidth / 2,
        edgeLength: edgeLength
      };
    },
    curvedDirectedEdgeWalk: function(edge, point) {
      var conf, distance, height, hyp, newpoint, width;
      conf = alchemy.conf;
      width = edge.target.x - edge.source.x;
      height = edge.target.y - edge.source.y;
      hyp = Math.sqrt(height * height + width * width);
      newpoint = point === 'middle' ? (distance = hyp / 2, {
        x: edge.source.x + width * distance / hyp,
        y: edge.source.y + height * distance / hyp
      }) : point === 'linkStart' ? (distance = edge.source.radius + edge.source['stroke-width'], {
        x: edge.source.x + width * distance / hyp,
        y: edge.source.y + height * distance / hyp
      }) : point === 'linkEnd' ? (conf.curvedEdges ? distance = hyp : distance = hyp - (edge.target.radius + edge.target['stroke-width']), conf.directedEdges ? distance = distance - conf.edgeArrowSize : void 0, {
        x: edge.source.x + width * distance / hyp,
        y: edge.source.y + height * distance / hyp
      }) : void 0;
      return newpoint;
    },
    middleLine: function(edge) {
      return this.curvedDirectedEdgeWalk(edge, 'middle');
    },
    startLine: function(edge) {
      return this.curvedDirectedEdgeWalk(edge, 'linkStart');
    },
    endLine: function(edge) {
      return this.curvedDirectedEdgeWalk(edge, 'linkEnd');
    },
    edgeLength: function(edge) {
      var height, hyp, width;
      width = edge.target.x - edge.source.x;
      height = edge.target.y - edge.source.y;
      return hyp = Math.sqrt(height * height + width * width);
    },
    edgeAngle: function(edge) {
      var height, width;
      width = edge.target.x - edge.source.x;
      height = edge.target.y - edge.source.y;
      return Math.atan2(height, width) / Math.PI * 180;
    },
    captionAngle: function(angle) {
      if (angle < -90 || angle > 90) {
        return 180;
      } else {
        return 0;
      }
    },
    middlePath: function(edge) {
      var midPoint, pathNode;
      pathNode = alchemy.vis.select("#path-" + edge.id).node();
      midPoint = pathNode.getPointAtLength(pathNode.getTotalLength() / 2);
      return {
        x: midPoint.x,
        y: midPoint.y
      };
    },
    middlePathCurve: function(edge) {
      var midPoint, pathNode;
      pathNode = d3.select("#path-" + edge.id).node();
      midPoint = pathNode.getPointAtLength(pathNode.getTotalLength() / 2);
      return {
        x: midPoint.x,
        y: midPoint.y
      };
    }
  };

  alchemy.drawing.NodeUtils = {
    nodeStyle: function(d) {
      var conf;
      conf = alchemy.conf;
      if (conf.cluster) {
        d.fill = (function(d) {
          var clusterMap, clustering, colour, colourIndex, colours, key, node;
          clustering = alchemy.layout._clustering;
          node = alchemy._nodes[d.id].getProperties();
          clusterMap = clustering.clusterMap;
          key = alchemy.conf.clusterKey;
          colours = conf.clusterColours;
          colourIndex = clusterMap[node[key]] % colours.length;
          colour = colours[colourIndex];
          return "" + colour;
        })(d);
      }
      return d;
    },
    nodeText: function(d) {
      var caption, conf, nodeProps;
      conf = alchemy.conf;
      nodeProps = alchemy._nodes[d.id]._properties;
      if (conf.nodeCaption && typeof conf.nodeCaption === 'string') {
        if (nodeProps[conf.nodeCaption] != null) {
          return nodeProps[conf.nodeCaption];
        } else {
          return '';
        }
      } else if (conf.nodeCaption && typeof conf.nodeCaption === 'function') {
        caption = conf.nodeCaption(nodeProps);
        if (caption === void 0 || String(caption) === 'undefined') {
          alchemy.log["caption"] = "At least one caption returned undefined";
          conf.caption = false;
        }
        return caption;
      }
    }
  };

  alchemy.svgStyles = {
    node: {
      populate: function(node) {
        var conf, d, defaultStyle, fill, nodeType, nodeTypeKey, radius, stroke, strokeWidth, style, svgStyles, toFunc, typedStyle;
        conf = alchemy.conf;
        defaultStyle = _.omit(conf.nodeStyle.all, "selected", "highlighted", "hidden");
        d = node;
        toFunc = function(inp) {
          if (typeof inp === "function") {
            return inp;
          }
          return function() {
            return inp;
          };
        };
        nodeTypeKey = _.keys(conf.nodeTypes)[0];
        nodeType = node.getProperties()[nodeTypeKey];
        if (conf.nodeStyle[nodeType] === void 0) {
          nodeType = "all";
        }
        typedStyle = _.assign(_.cloneDeep(defaultStyle), conf.nodeStyle[nodeType]);
        style = _.assign(typedStyle, conf.nodeStyle[nodeType][node._state]);
        radius = toFunc(style.radius);
        fill = toFunc(style.color);
        stroke = toFunc(style.borderColor);
        strokeWidth = toFunc(style.borderWidth);
        svgStyles = {};
        svgStyles["radius"] = radius(d);
        svgStyles["fill"] = fill(d);
        svgStyles["stroke"] = stroke(d);
        svgStyles["stroke-width"] = strokeWidth(d, radius(d));
        return svgStyles;
      }
    },
    edge: {
      populate: function(edge) {
        var color, conf, defaultStyle, edgeType, opacity, style, svgStyles, toFunc, typedStyle, width;
        conf = alchemy.conf;
        defaultStyle = _.omit(conf.edgeStyle.all, "selected", "highlighted", "hidden");
        toFunc = function(inp) {
          if (typeof inp === "function") {
            return inp;
          }
          return function() {
            return inp;
          };
        };
        edgeType = edge._edgeType;
        if (conf.edgeStyle[edgeType] === void 0) {
          edgeType = "all";
        }
        typedStyle = _.assign(_.cloneDeep(defaultStyle), conf.edgeStyle[edgeType]);
        style = _.assign(typedStyle, conf.edgeStyle[edgeType][edge._state]);
        width = toFunc(style.width);
        color = toFunc(style.color);
        opacity = toFunc(style.opacity);
        svgStyles = {
          "stroke": color(edge),
          "stroke-width": width(edge),
          "opacity": opacity(edge),
          "fill": "none"
        };
        return svgStyles;
      },
      update: function(edge) {
        var color, conf, opacity, style, svgStyles, toFunc, width;
        conf = alchemy.conf;
        style = edge._style;
        toFunc = function(inp) {
          if (typeof inp === "function") {
            return inp;
          }
          return function() {
            return inp;
          };
        };
        width = toFunc(style.width);
        color = toFunc(style.color);
        opacity = toFunc(style.opacity);
        svgStyles = {
          "stroke": color(edge),
          "stroke-width": width(edge),
          "opacity": opacity(edge),
          "fill": "none"
        };
        return svgStyles;
      }
    }
  };

  alchemy.editor.Editor = (function() {
    function Editor() {
      this.nodeEditor = __bind(this.nodeEditor, this);
      this.startEditor = __bind(this.startEditor, this);
      this.utils = new alchemy.editor.Utils;
    }

    Editor.prototype.editorContainerHTML = "<div id=\"editor-header\" data-toggle=\"collapse\" data-target=\"#editor #element-options\">\n    <h3>Editor</h3><span class=\"fa fa-2x fa-caret-right\"></span>\n</div>\n<div id=\"element-options\" class=\"collapse\">\n    <ul class=\"list-group\"> \n        <li class=\"list-group-item\" id=\"remove\">Remove Selected</li> \n        <li class=\"list-group-item\" id=\"editor-interactions\">Editor mode enabled, click to disable editor interactions</li>\n    </ul>\n</div>";

    Editor.prototype.elementEditorHTML = function(type) {
      return "<h4>" + type + " Editor</h4>\n<form id=\"add-property-form\">\n    <div id=\"add-property\">\n        <input class=\"form-control\" id=\"add-prop-key\" placeholder=\"New Property Name\">\n        <input class=\"form-control\" id=\"add-prop-value\" placeholder=\"New Property Value\">\n    </div>\n    <input id=\"add-prop-submit\" type=\"submit\" value=\"Add Property\" placeholder=\"add a property to this node\">\n</form>\n<form id=\"properties-list\">\n    <input id=\"update-properties\" type=\"submit\" value=\"Update Properties\">\n</form>";
    };

    Editor.prototype.startEditor = function() {
      var divSelector, editor, editor_interactions, html, utils;
      divSelector = alchemy.conf.divSelector;
      html = this.editorContainerHTML;
      editor = alchemy.dash.select("#control-dash").append("div").attr("id", "editor").html(html);
      editor.select('#editor-header').on('click', function() {
        if (alchemy.dash.select('#element-options').classed("in")) {
          return alchemy.dash.select("#editor-header>span").attr("class", "fa fa-2x fa-caret-right");
        } else {
          return alchemy.dash.select("#editor-header>span").attr("class", "fa fa-2x fa-caret-down");
        }
      });
      editor_interactions = editor.select('#element-options ul #editor-interactions').on('click', function() {
        return d3.select(this).attr("class", function() {
          if (alchemy.get.state() === 'editor') {
            alchemy.set.state('interactions', 'default');
            return "inactive list-group-item";
          } else {
            alchemy.set.state('interactions', 'editor');
            return "active list-group-item";
          }
        }).html(function() {
          if (alchemy.get.state() === 'editor') {
            return "Disable Editor Interactions";
          } else {
            return "Enable Editor Interactions";
          }
        });
      });
      editor.select("#element-options ul #remove").on("click", function() {
        return alchemy.editor.remove();
      });
      utils = this.utils;
      return editor_interactions.on("click", function() {
        if (!alchemy.dash.select("#editor-interactions").classed("active")) {
          utils.enableEditor();
          return alchemy.dash.select("#editor-interactions").classed({
            "active": true,
            "inactive": false
          }).html("Editor mode enabled, click to disable editor interactions");
        } else {
          utils.disableEditor();
          return alchemy.dash.select("#editor-interactions").classed({
            "active": false,
            "inactive": true
          }).html("Editor mode disabled, click to enable editor interactions");
        }
      });
    };

    Editor.prototype.nodeEditor = function(n) {
      var add_property, divSelector, editor, elementEditor, html, nodeProperties, node_property, options, property, property_list, updateProperty, val;
      divSelector = alchemy.conf.divSelector;
      editor = alchemy.dash.select("#control-dash #editor");
      options = editor.select('#element-options');
      html = this.elementEditorHTML("Node");
      elementEditor = options.append('div').attr('id', 'node-editor').html(html);
      elementEditor.attr("class", function() {
        var active;
        active = alchemy.dash.select("#editor-interactions").classed("active");
        if (active) {
          return "enabled";
        }
        return "hidden";
      });
      add_property = editor.select("#node-editor form #add-property");
      add_property.select("#node-add-prop-key").attr("placeholder", "New Property Name").attr("value", null);
      add_property.select("#node-add-prop-value").attr("placeholder", "New Property Value").attr("value", null);
      alchemy.dash.select("#add-property-form").on("submit", function() {
        var key, value;
        event.preventDefault();
        key = alchemy.dash.select('#add-prop-key').property('value');
        key = key.replace(/\s/g, "_");
        value = alchemy.dash.select('#add-prop-value').property('value');
        updateProperty(key, value, true);
        alchemy.dash.selectAll("#add-property .edited-property").classed({
          "edited-property": false
        });
        return this.reset();
      });
      nodeProperties = alchemy._nodes[n.id].getProperties();
      alchemy.vis.select("#node-" + n.id).classed({
        "editing": true
      });
      property_list = editor.select("#node-editor #properties-list");
      for (property in nodeProperties) {
        val = nodeProperties[property];
        node_property = property_list.append("div").attr("id", "node-" + property).attr("class", "property form-inline form-group");
        node_property.append("label").attr("for", "node-" + property + "-input").attr("class", "form-control property-name").text("" + property);
        node_property.append("input").attr("id", "node-" + property + "-input").attr("class", "form-control property-value").attr("value", "" + val);
      }
      alchemy.dash.select("#properties-list").on("submit", function() {
        var key, properties, selection, value, _i, _len, _ref;
        event.preventDefault();
        properties = alchemy.dash.selectAll(".edited-property");
        _ref = properties[0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          property = _ref[_i];
          selection = alchemy.dash.select(property);
          key = selection.select("label").text();
          value = selection.select("input").attr('value');
          updateProperty(key, value, false);
        }
        alchemy.dash.selectAll("#node-properties-list .edited-property").classed({
          "edited-property": false
        });
        return this.reset();
      });
      d3.selectAll("#add-prop-key, #add-prop-value, .property").on("keydown", function() {
        if (d3.event.keyCode === 13) {
          event.preventDefault();
        }
        return d3.select(this).classed({
          "edited-property": true
        });
      });
      return updateProperty = function(key, value, newProperty) {
        var drawNodes, nodeID;
        nodeID = n.id;
        if ((key !== "") && (value !== "")) {
          alchemy._nodes[nodeID].setProperty("" + key, "" + value);
          drawNodes = alchemy._drawNodes;
          drawNodes.updateNode(alchemy.viz.select("#node-" + nodeID));
          if (newProperty === true) {
            alchemy.dash.select("#node-add-prop-key").attr("value", "property added/updated to key: " + key);
            return alchemy.dash.select("#node-add-prop-value").attr("value", "property at " + key + " updated to: " + value);
          } else {
            return alchemy.dash.select("#node-" + key + "-input").attr("value", "property at " + key + " updated to: " + value);
          }
        } else {
          if (newProperty === true) {
            alchemy.dash.select("#node-add-prop-key").attr("value", "null or invalid input");
            return alchemy.dash.select("#node-add-prop-value").attr("value", "null or invlid input");
          } else {
            return alchemy.dash.select("#node-" + key + "-input").attr("value", "null or invalid input");
          }
        }
      };
    };

    Editor.prototype.editorClear = function() {
      alchemy.dash.selectAll(".node").classed({
        "editing": false
      });
      alchemy.dash.selectAll(".edge").classed({
        "editing": false
      });
      alchemy.dash.select("#node-editor").remove();
      alchemy.dash.select("#edge-editor").remove();
      return alchemy.dash.select("#node-add-prop-submit").attr("placeholder", function() {
        if (alchemy.vis.selectAll(".selected").empty()) {
          return "select a node or edge to edit properties";
        }
        return "add a property to this element";
      });
    };

    Editor.prototype.edgeEditor = function(e) {
      var add_property, divSelector, edgeProperties, edge_property, editor, elementEditor, html, options, property, property_list, updateProperty, val;
      divSelector = alchemy.conf.divSelector;
      editor = alchemy.dash("#control-dash #editor");
      options = editor.select('#element-options');
      html = this.elementEditorHTML("Edge");
      elementEditor = options.append('div').attr('id', 'edge-editor').html(html);
      elementEditor.attr("class", function() {
        if (alchemy.dash.select("#editor-interactions").classed("active")) {
          return "enabled";
        }
        return "hidden";
      });
      add_property = editor.select("#edge-editor form #add-property");
      add_property.select("#add-prop-key").attr("placeholder", "New Property Name").attr("value", null);
      add_property.select("#add-prop-value").attr("placeholder", "New Property Value").attr("value", null);
      edgeProperties = alchemy._edges[e.id].getProperties();
      alchemy.vis.select("#edge-" + e.id).classed({
        "editing": true
      });
      property_list = editor.select("#edge-editor #properties-list");
      for (property in edgeProperties) {
        val = edgeProperties[property];
        edge_property = property_list.append("div").attr("id", "edge-" + property).attr("class", "property form-inline form-group");
        edge_property.append("label").attr("for", "edge-" + property + "-input").attr("class", "form-control property-name").text("" + property);
        edge_property.append("input").attr("id", "edge-" + property + "-input").attr("class", "form-control property-value").attr("value", "" + val);
      }
      alchemy.dash.selectAll("#add-prop-key, #add-prop-value, .property").on("keydown", function() {
        if (d3.event.keyCode === 13) {
          event.preventDefault();
        }
        return d3.select(this).classed({
          "edited-property": true
        });
      });
      alchemy.dash.select("#add-property-form").on("submit", function() {
        var key, value;
        event.preventDefault();
        key = alchemy.dash.select("#add-prop-key").property('value');
        key = key.replace(/\s/g, "_");
        value = alchemy.dash.select("#add-prop-value").property('value');
        updateProperty(key, value, true);
        alchemy.dash.selectAll("#add-property .edited-property").classed({
          "edited-property": false
        });
        return this.reset();
      });
      d3.select("#properties-list").on("submit", function() {
        var key, properties, selection, value, _i, _len, _ref;
        event.preventDefault();
        properties = alchemy.dash.selectAll(".edited-property");
        _ref = properties[0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          property = _ref[_i];
          selection = alchemy.dash.select(property);
          key = selection.select("label").text();
          value = selection.select("input").property('value');
          updateProperty(key, value, false);
        }
        alchemy.dash.selectAll("#properties-list .edited-property").classed({
          "edited-property": false
        });
        return this.reset();
      });
      return updateProperty = function(key, value, newProperty) {
        var drawEdges, edgeID, edgeSelection;
        edgeID = e.id;
        if ((key !== "") && (value !== "")) {
          alchemy._edges[edgeID].setProperty("" + key, "" + value);
          edgeSelection = alchemy.vis.select("#edge-" + edgeID);
          drawEdges = new alchemy.drawing.DrawEdges;
          drawEdges.updateEdge(alchemy.vis.select("#edge-" + edgeID));
          if (newProperty === true) {
            alchemy.dash.select("#add-prop-key").attr("value", "property added/updated to key: " + key);
            return alchemy.dash.select("#add-prop-value").attr("value", "property at " + key + " updated to: " + value);
          } else {
            return alchemy.dash.select("#edge-" + key + "-input").attr("value", "property at " + key + " updated to: " + value);
          }
        } else {
          if (newProperty === true) {
            alchemy.dash.select("#add-prop-key").attr("value", "null or invalid input");
            return alchemy.dash.select("#add-prop-value").attr("value", "null or invlid input");
          } else {
            return alchemy.dash.select("#edge-" + key + "-input").attr("value", "null or invalid input");
          }
        }
      };
    };

    return Editor;

  })();

  alchemy.editor.Interactions = (function() {
    function Interactions() {
      this.reset = __bind(this.reset, this);
      this.deleteSelected = __bind(this.deleteSelected, this);
      this.addNodeDragended = __bind(this.addNodeDragended, this);
      this.addNodeDragging = __bind(this.addNodeDragging, this);
      this.addNodeStart = __bind(this.addNodeStart, this);
      this.edgeClick = __bind(this.edgeClick, this);
      this.nodeClick = __bind(this.nodeClick, this);
      this.nodeMouseUp = __bind(this.nodeMouseUp, this);
      this.editor = new alchemy.editor.Editor;
    }

    Interactions.prototype.nodeMouseOver = function(n) {
      var radius;
      if (!d3.select(this).select("circle").empty()) {
        radius = d3.select(this).select("circle").attr("r");
        d3.select(this).select("circle").attr("r", radius * 3);
      }
      return this;
    };

    Interactions.prototype.nodeMouseUp = function(n) {
      if (this.sourceNode !== n) {
        this.mouseUpNode = true;
        this.targetNode = n;
        this.click = false;
      } else {
        this.click = true;
      }
      return this;
    };

    Interactions.prototype.nodeMouseOut = function(n) {
      var radius;
      if (!d3.select(this).select("circle").empty()) {
        radius = d3.select(this).select("circle").attr("r");
        d3.select(this).select("circle").attr("r", radius / 3);
      }
      return this;
    };

    Interactions.prototype.nodeClick = function(c) {
      var selected;
      d3.event.stopPropagation();
      if (!alchemy.vis.select("#node-" + c.id).empty()) {
        selected = alchemy.vis.select("#node-" + c.id).classed('selected');
        alchemy.vis.select("#node-" + c.id).classed('selected', !selected);
      }
      this.editor.editorClear();
      return this.editor.nodeEditor(c);
    };

    Interactions.prototype.edgeClick = function(e) {
      d3.event.stopPropagation();
      this.editor.editorClear();
      return this.editor.edgeEditor(e);
    };

    Interactions.prototype.addNodeStart = function(d, i) {
      d3.event.sourceEvent.stopPropagation();
      this.sourceNode = d;
      alchemy.vis.select('#dragline').classed({
        "hidden": false
      });
      return this;
    };

    Interactions.prototype.addNodeDragging = function(d, i) {
      var x2coord, y2coord;
      x2coord = d3.event.x;
      y2coord = d3.event.y;
      alchemy.vis.select('#dragline').attr("x1", this.sourceNode.x).attr("y1", this.sourceNode.y).attr("x2", x2coord).attr("y2", y2coord).attr("style", "stroke: #FFF");
      return this;
    };

    Interactions.prototype.addNodeDragended = function(d, i) {
      var dragline, targetX, targetY;
      if (!this.click) {
        if (!this.mouseUpNode) {
          dragline = alchemy.vis.select("#dragline");
          targetX = dragline.attr("x2");
          targetY = dragline.attr("y2");
          this.targetNode = {
            id: "" + (_.uniqueId('addedNode_')),
            x: parseFloat(targetX),
            y: parseFloat(targetY),
            caption: "node added"
          };
        }
        this.newEdge = {
          id: "" + this.sourceNode.id + "-" + this.targetNode.id,
          source: this.sourceNode.id,
          target: this.targetNode.id,
          caption: "edited"
        };
        alchemy.editor.update(this.targetNode, this.newEdge);
      }
      this.reset();
      return this;
    };

    Interactions.prototype.deleteSelected = function(d) {
      switch (d3.event.keyCode) {
        case 8:
        case 46:
          if (!(d3.select(d3.event.target).node().tagName === ("INPUT" || "TEXTAREA"))) {
            d3.event.preventDefault();
            return alchemy.editor.remove();
          }
      }
    };

    Interactions.prototype.reset = function() {
      this.mouseUpNode = null;
      this.sourceNode = null;
      this.targetNode = null;
      this.newEdge = null;
      this.click = null;
      alchemy.vis.select("#dragline").classed({
        "hidden": true
      }).attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 0);
      return this;
    };

    Interactions;

    return Interactions;

  })();

  alchemy.editor.Utils = (function() {
    function Utils() {
      this.enableEditor = __bind(this.enableEditor, this);
      this.drawNodes = alchemy._drawNodes;
      this.drawEdges = alchemy._drawEdges;
    }

    Utils.prototype.enableEditor = function() {
      var dragLine, editor, selectedElements;
      alchemy.set.state("interactions", "editor");
      dragLine = alchemy.vis.append("line").attr("id", "dragline");
      this.drawNodes.updateNode(alchemy.node);
      this.drawEdges.updateEdge(alchemy.edge);
      selectedElements = alchemy.vis.selectAll(".selected");
      editor = new alchemy.editor.Editor;
      if ((!selectedElements.empty()) && (selectedElements.length === 1)) {
        if (selectedElements.classed('node')) {
          editor.nodeEditor(selectedElements.datum());
          return alchemy.dash.select("#node-editor").attr("class", "enabled").style("opacity", 1);
        } else if (selectedElements.classed('edge')) {
          editor.edgeEditor(selectedElements.datum());
          return alchemy.dash.select("#edge-editor").attr("class", "enabled").style("opacity", 1);
        }
      } else {
        return selectedElements.classed({
          "selected": false
        });
      }
    };

    Utils.prototype.disableEditor = function() {
      alchemy.setState("interactions", "default");
      alchemy.vis.select("#dragline").remove();
      alchemy.dash.select("#node-editor").transition().duration(300).style("opacity", 0);
      alchemy.dash.select("#node-editor").transition().delay(300).attr("class", "hidden");
      this.drawNodes.updateNode(alchemy.node);
      return alchemy.vis.selectAll(".node").classed({
        "selected": false
      });
    };

    Utils.prototype.remove = function() {
      var edge, node, nodeID, node_data, selectedNodes, _i, _j, _len, _len1, _ref, _ref1, _results;
      selectedNodes = alchemy.vis.selectAll(".selected.node");
      _ref = selectedNodes[0];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        nodeID = alchemy.vis.select(node).data()[0].id;
        node_data = alchemy._nodes[nodeID];
        if (node_data != null) {
          _ref1 = node_data.adjacentEdges;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            edge = _ref1[_j];
            alchemy._edges = _.omit(alchemy._edges, "" + edge);
            alchemy.edge = alchemy.edge.data(_.map(alchemy._edges, function(e) {
              return e._d3;
            }), function(e) {
              return e.id;
            });
            alchemy.vis.select("#edge-" + edge).remove();
          }
          alchemy._nodes = _.omit(alchemy._nodes, "" + nodeID);
          alchemy.node = alchemy.node.data(_.map(alchemy._nodes, function(n) {
            return n._d3;
          }), function(n) {
            return n.id;
          });
          alchemy.vis.select(node).remove();
          if (alchemy.get.state("interactions") === "editor") {
            _results.push(alchemy.modifyElements.nodeEditorClear());
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Utils.prototype.addNode = function(node) {
      var newNode;
      newNode = alchemy._nodes[node.id] = new alchemy.models.Node({
        id: "" + node.id
      });
      newNode.setProperty("caption", node.caption);
      newNode.setD3Property("x", node.x);
      newNode.setD3Property("y", node.y);
      return alchemy.node = alchemy.node.data(_.map(alchemy._nodes, function(n) {
        return n._d3;
      }), function(n) {
        return n.id;
      });
    };

    Utils.prototype.addEdge = function(edge) {
      var newEdge;
      newEdge = alchemy._edges[edge.id] = new alchemy.models.Edge(edge);
      return alchemy.edge = alchemy.edge.data(_.map(alchemy._edges, function(e) {
        return e._d3;
      }), function(e) {
        return e.id;
      });
    };

    Utils.prototype.update = function(node, edge) {
      if (!this.mouseUpNode) {
        alchemy.editor.addNode(node);
        alchemy.editor.addEdge(edge);
        this.drawEdges.createEdge(alchemy.edge);
        this.drawNodes.createNode(alchemy.node);
      } else {
        alchemy.editor.addEdge(edge);
        this.drawEdges.createEdge(alchemy.edge);
      }
      return alchemy.layout.tick();
    };

    return Utils;

  })();

  alchemy.models.Edge = (function() {
    function Edge(edge, index) {
      var a, conf;
      if (index == null) {
        index = null;
      }
      this.allNodesActive = __bind(this.allNodesActive, this);
      this.getStyles = __bind(this.getStyles, this);
      this.getProperties = __bind(this.getProperties, this);
      this.setProperties = __bind(this.setProperties, this);
      this._setCaption = __bind(this._setCaption, this);
      this._setID = __bind(this._setID, this);
      this._setD3Properties = __bind(this._setD3Properties, this);
      a = alchemy;
      conf = a.conf;
      this.id = this._setID(edge);
      this._index = index;
      this._state = "active";
      this._properties = edge;
      this._edgeType = this._setEdgeType();
      this._style = conf.edgeStyle[this._edgeType] != null ? _.merge(_.clone(conf.edgeStyle["all"]), conf.edgeStyle[this._edgeType]) : _.clone(conf.edgeStyle["all"]);
      this._d3 = _.merge({
        'id': this.id,
        'pos': this._index,
        'edgeType': this._edgeType,
        'source': a._nodes[this._properties.source]._d3,
        'target': a._nodes[this._properties.target]._d3
      }, a.svgStyles.edge.populate(this));
      this._setCaption(edge, conf);
      a._nodes["" + edge.source]._addEdge("" + this.id + "-" + this._index);
      a._nodes["" + edge.target]._addEdge("" + this.id + "-" + this._index);
    }

    Edge.prototype._setD3Properties = function(props) {
      return _.merge(this._d3, props);
    };

    Edge.prototype._setID = function(e) {
      if (e.id != null) {
        return e.id;
      } else {
        return "" + e.source + "-" + e.target;
      }
    };

    Edge.prototype._setCaption = function(edge, conf) {
      var cap, edgeCaption;
      cap = conf.edgeCaption;
      edgeCaption = (function(edge) {
        switch (typeof cap) {
          case 'string' || 'number':
            return edge[cap];
          case 'function':
            return cap(edge);
        }
      })(edge);
      if (edgeCaption) {
        return this._d3.caption = edgeCaption;
      }
    };

    Edge.prototype._setEdgeType = function() {
      var conf, edgeType, lookup;
      conf = alchemy.conf;
      if (conf.edgeTypes) {
        if (_.isPlainObject(conf.edgeTypes)) {
          lookup = Object.keys(alchemy.conf.edgeTypes);
          edgeType = this._properties[lookup];
        } else if (_.isArray(conf.edgeTypes)) {
          edgeType = this._properties["caption"];
        } else if (typeof conf.edgeTypes === 'string') {
          edgeType = this._properties[conf.edgeTypes];
        }
      }
      if (edgeType === void 0) {
        edgeType = "all";
      }
      this._setD3Properties('edgeType', edgeType);
      return edgeType;
    };

    Edge.prototype.setProperties = function(property, value) {
      if (value == null) {
        value = null;
      }
      if (_.isPlainObject(property)) {
        _.assign(this._properties, property);
        if ('source' in property) {
          this._setD3Properties({
            'source': alchemy._nodes[property.source]._d3
          });
        }
        if ('target' in property) {
          this._setD3Properties({
            'target': alchemy._nodes[property.target]._d3
          });
        }
      } else {
        this._properties[property] = value;
        if ((property === 'source') || (property === 'target')) {
          this._setD3Properties({
            property: alchemy._nodes[value]._d3
          });
        }
      }
      return this;
    };

    Edge.prototype.getProperties = function() {
      var key, keys, query;
      key = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (key == null) {
        key = null;
      }
      if ((key == null) && (keys.length === 0)) {
        return this._properties;
      } else if (keys.length !== 0) {
        query = _.union([key], keys);
        return _.pick(this._properties, query);
      } else {
        return this._properties[key];
      }
    };

    Edge.prototype.getStyles = function(key) {
      if (key == null) {
        key = null;
      }
      if (key != null) {
        return this._style[key];
      } else {
        return this._style;
      }
    };

    Edge.prototype.setStyles = function(key, value) {
      if (value == null) {
        value = null;
      }
      if (key === void 0) {
        key = alchemy.svgStyles.edge.populate(this);
      }
      if (_.isPlainObject(key)) {
        _.assign(this._style, key);
      } else if (typeof key === "string") {
        this._style[key] = value;
      }
      this._setD3Properties(alchemy.svgStyles.edge.update(this));
      alchemy._drawEdges.updateEdge(this._d3);
      return this;
    };

    Edge.prototype.toggleHidden = function() {
      this._state = this._state === "hidden" ? "active" : "hidden";
      return this.setStyles();
    };

    Edge.prototype.allNodesActive = function() {
      var source, target;
      source = alchemy.vis.select("#node-" + this.properties.source);
      target = alchemy.vis.select("#node-" + this.properties.target);
      return !source.classed("inactive") && !target.classed("inactive");
    };

    return Edge;

  })();

  alchemy.models.Node = (function() {
    function Node(node) {
      this.getStyles = __bind(this.getStyles, this);
      this.removeProperty = __bind(this.removeProperty, this);
      this.setProperty = __bind(this.setProperty, this);
      this.getProperties = __bind(this.getProperties, this);
      this._setD3Properties = __bind(this._setD3Properties, this);
      this._setNodeType = __bind(this._setNodeType, this);
      var a, conf;
      a = alchemy;
      conf = a.conf;
      this.id = node.id;
      this._properties = node;
      this._d3 = _.merge({
        'id': this.id,
        'root': this._properties[conf.rootNodes]
      }, a.svgStyles.node.populate(this));
      this._nodeType = this._setNodeType();
      this._style = conf.nodeStyle[this._nodeType] ? conf.nodeStyle[this._nodeType] : conf.nodeStyle["all"];
      this._state = "active";
      this._adjacentEdges = [];
    }

    Node.prototype._setNodeType = function() {
      var conf, lookup, nodeType, types;
      conf = alchemy.conf;
      if (conf.nodeTypes) {
        if (_.isPlainObject(conf.nodeTypes)) {
          lookup = Object.keys(alchemy.conf.nodeTypes);
          types = _.values(conf.nodeTypes);
          nodeType = this._properties[lookup];
        } else if (typeof conf.nodeTypes === 'string') {
          nodeType = this._properties[conf.nodeTypes];
        }
      }
      if (nodeType === void 0) {
        nodeType = "all";
      }
      this._setD3Properties('nodeType', nodeType);
      return nodeType;
    };

    Node.prototype._setD3Properties = function(props) {
      return _.merge(this._d3, props);
    };

    Node.prototype._addEdge = function(edgeDomID) {
      return this._adjacentEdges = _.union(this._adjacentEdges, [edgeDomID]);
    };

    Node.prototype.getProperties = function() {
      var key, keys, query;
      key = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (key == null) {
        key = null;
      }
      if ((key == null) && (keys.length === 0)) {
        return this._properties;
      } else if (keys.length !== 0) {
        query = _.union([key], keys);
        return _.pick(this._properties, query);
      } else {
        return this._properties[key];
      }
    };

    Node.prototype.setProperty = function(property, value) {
      if (value == null) {
        value = null;
      }
      if (_.isPlainObject(property)) {
        _.assign(this._properties, property);
      } else {
        this._properties[property] = value;
      }
      return this;
    };

    Node.prototype.removeProperty = function(property) {
      if (this._properties.property != null) {
        _.omit(this._properties, property);
      }
      return this;
    };

    Node.prototype.getStyles = function(key) {
      if (key == null) {
        key = null;
      }
      if (key != null) {
        return this._style[key];
      } else {
        return this._style;
      }
    };

    Node.prototype.setStyles = function(key, value) {
      if (value == null) {
        value = null;
      }
      if (key === void 0) {
        key = alchemy.svgStyles.node.populate(this);
      } else if (_.isPlainObject(key)) {
        _.assign(this._style, key);
      } else {
        this._style[key] = value;
      }
      this._setD3Properties(alchemy.svgStyles.node.populate(this));
      alchemy._drawNodes.updateNode(this._d3);
      return this;
    };

    Node.prototype.toggleHidden = function() {
      this._state = this._state === "hidden" ? "active" : "hidden";
      this.setStyles();
      return _.each(this._adjacentEdges, function(id) {
        var e, pos, source, sourceState, target, targetState, _ref;
        _ref = id.split("-"), source = _ref[0], target = _ref[1], pos = _ref[2];
        e = alchemy._edges["" + source + "-" + target][pos];
        sourceState = alchemy._nodes["" + source]._state;
        targetState = alchemy._nodes["" + target]._state;
        if (e._state === "hidden" && (sourceState === "active" && targetState === "active")) {
          return e.toggleHidden();
        } else if (e._state === "active" && (sourceState === "hidden" || targetState === "hidden")) {
          return e.toggleHidden();
        }
      });
    };

    Node.prototype.outDegree = function() {
      return this._adjacentEdges.length;
    };

    return Node;

  })();

  alchemy.themes = {
    "default": {
      "backgroundColour": "#000000",
      "nodeStyle": {
        "all": {
          "radius": function() {
            return 10;
          },
          "color": function() {
            return "#68B9FE";
          },
          "borderColor": function() {
            return "#127DC1";
          },
          "borderWidth": function(d, radius) {
            return radius / 3;
          },
          "captionColor": function() {
            return "#FFFFFF";
          },
          "captionBackground": function() {
            return null;
          },
          "captionSize": 12,
          "selected": {
            "color": function() {
              return "#FFFFFF";
            },
            "borderColor": function() {
              return "#349FE3";
            }
          },
          "highlighted": {
            "color": function() {
              return "#EEEEFF";
            }
          },
          "hidden": {
            "color": function() {
              return "none";
            },
            "borderColor": function() {
              return "none";
            }
          }
        }
      },
      "edgeStyle": {
        "all": {
          "width": 4,
          "color": "#CCC",
          "opacity": 0.2,
          "directed": true,
          "curved": true,
          "selected": {
            "opacity": 1
          },
          "highlighted": {
            "opacity": 1
          },
          "hidden": {
            "opacity": 0
          }
        }
      }
    },
    "white": {
      "backgroundColour": "#FFFFFF",
      "nodeStyle": {
        "all": {
          "radius": function() {
            return 10;
          },
          "color": function() {
            return "#68B9FE";
          },
          "borderColor": function() {
            return "#127DC1";
          },
          "borderWidth": function(d, radius) {
            return radius / 3;
          },
          "captionColor": function() {
            return "#FFFFFF";
          },
          "captionBackground": function() {
            return null;
          },
          "captionSize": 12,
          "selected": {
            "color": function() {
              return "#FFFFFF";
            },
            "borderColor": function() {
              return "38DD38";
            }
          },
          "highlighted": {
            "color": function() {
              return "#EEEEFF";
            }
          },
          "hidden": {
            "color": function() {
              return "none";
            },
            "borderColor": function() {
              return "none";
            }
          }
        }
      },
      "edgeStyle": {
        "all": {
          "width": 4,
          "color": "#333",
          "opacity": 0.4,
          "directed": false,
          "curved": false,
          "selected": {
            "color": "#38DD38",
            "opacity": 0.9
          },
          "highlighted": {
            "color": "#383838",
            "opacity": 0.7
          },
          "hidden": {
            "opacity": 0
          }
        }
      }
    }
  };

  alchemy.utils.warnings = {
    dataWarning: function() {
      var no_results;
      if (alchemy.conf.dataWarning && typeof alchemy.conf.dataWarning === 'function') {
        return alchemy.conf.dataWarning();
      } else if (alchemy.conf.dataWarning === 'default') {
        no_results = "<div class=\"modal fade\" id=\"no-results\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <h4 class=\"modal-title\">Sorry!</h4>\n            </div>\n            <div class=\"modal-body\">\n                <p>" + alchemy.conf.warningMessage + "</p>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>";
        $('body').append(no_results);
        return $('#no-results').modal('show');
      }
    },
    divWarning: function() {
      return "create an element that matches the value for 'divSelector' in your conf.\nFor instance, if you are using the default 'divSelector' conf, simply provide\n<div id='#alchemy'></div>.";
    }
  };

}).call(this);

//# sourceMappingURL=alchemy.js.map
