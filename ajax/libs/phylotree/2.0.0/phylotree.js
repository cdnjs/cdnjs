(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3'), require('underscore'), require('lodash')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3', 'underscore', 'lodash'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.phylotree = global.phylotree || {}, global.d3, global._, global._$1));
}(this, (function (exports, d3, _, _$1) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var d3__namespace = /*#__PURE__*/_interopNamespace(d3);
  var ___namespace = /*#__PURE__*/_interopNamespace(_);
  var ___namespace$1 = /*#__PURE__*/_interopNamespace(_$1);

  //import { parseString } from "xml2js";

  var nexml_parser = function(xml_string, options) {
    var trees;
    parseString(xml_string, function(error, xml) {
      trees = xml["nex:nexml"].trees[0].tree.map(function(nexml_tree) {
        var node_list = nexml_tree.node.map(d => d.$),
          node_hash = node_list.reduce(function(a, b) {
            b.edges = [];
            b.name = b.id;
            a[b.id] = b;
            return a;
          }, {}),
          roots = node_list.filter(d => d.root),
          root_id = roots > 0 ? roots[0].id : node_list[0].id;
        node_hash[root_id].name = "root";

        nexml_tree.edge.map(d => d.$).forEach(function(edge) {
          node_hash[edge.source].edges.push(edge);
        });

        function parseNexml(node, index) {
          if (node.edges) {
            var targets = ___namespace.pluck(node.edges, "target");
            node.children = ___namespace.values(___namespace.pick(node_hash, targets));
            node.children.forEach(function(child, i) {
              child.attribute = node.edges[i].length || "";
            });
            node.children.forEach(parseNexml);
            node.annotation = "";
          }
        }

        parseNexml(node_hash[root_id]);
        return node_hash[root_id];
      });
    });
    return trees;
  };

  // These methods are part of the Phylotree object

  function graftANode(graftAt, newChild, newParent, lengths) {

    let nodes = this.nodes.descendants();

    if (graftAt.parent) {

      let nodeIndex = nodes.indexOf(graftAt);

      if (nodeIndex >= 0) {

        let parentIndex = graftAt.parent.children.indexOf(graftAt);

        let newSplit = {
            name: newParent,
            parent: graftAt.parent,
            attribute: lengths ? lengths[2] : null,
            original_child_order: graftAt["original_child_order"]
          },
          newNode = {
            name: newChild,
            parent: newSplit,
            attribute: lengths ? lengths[1] : null,
            original_child_order: 2
          };

        newSplit["children"] = [graftAt, newNode];
        graftAt["parent"].children[parentIndex] = newSplit;
        graftAt.parent = newSplit;
        graftAt["attribute"] = lengths ? lengths[0] : null;
        graftAt["original_child_order"] = 1;
      }
    }

    return this;

  }

  function addChild(parent, child) {

    if(parent.children) {
      parent.children.push(child);
    } else {
      parent["children"] = [child];
    }

    return parent;

  }

  function createNode(name, lengths) {

    return {
      data: {
        name: name,
        attribute: lengths ? lengths[1] : null
      },
      parent: '',
    };

  }

  /**
   * Delete a given node.
   *
   * @param {Node} The node to be deleted, or the index of such a node.
   * @returns The current ``phylotree``.
   */
  function deleteANode(index) {
    let nodes = this.nodes.descendants();

    if (typeof index != "number") {
      return this.deleteANode(nodes.indexOf(index));
    }

    if (index > 0 && index < nodes.length) {
      let node = nodes[index];

      if (node.parent) {
        // can only delete nodes that are not the root
        let delete_me_idx = node.parent.children.indexOf(node);

        if (delete_me_idx >= 0) {
          nodes.splice(index, 1);

          if (node.children) {
            node.children.forEach(function(d) {
              d["original_child_order"] = node.parent.children.length;
              node.parent.children.push(d);
              d.parent = node.parent;
            });
          }

          if (node.parent.children.length > 2) {
            node.parent.children.splice(delete_me_idx, 1);
          } else {
            if (node.parent.parent) {
              node.parent.parent.children[
                node.parent.parent.children.indexOf(node.parent)
              ] =
                node.parent.children[1 - delete_me_idx];
              node.parent.children[1 - delete_me_idx].parent = node.parent.parent;
              nodes.splice(nodes.indexOf(node.parent), 1);
            } else {
              nodes.splice(0, 1);
              nodes.parent = null;
              delete nodes.data["attribute"];
              delete nodes.data["annotation"];
              delete nodes.data["original_child_order"];
              nodes.name = "root";
              nodes.data.name = "root";
            }
          }
        }
      }
    }

    return this;
  }

  /**
   * Get the tips of the tree
   * @returns {Array} Nodes in the current ``phylotree``.
   */
  function getTips() {
    // get all nodes that have no nodes
    return ___namespace.filter(this.nodes.descendants(), n => {
      return !___namespace.has(n, "children");
    });
  }

  /**
   * Get the internal nodes of the tree
   * @returns {Array} Nodes in the current ``phylotree``.
   */
  function getInternals() {
    // get all nodes that have no nodes
    return ___namespace.filter(this.nodes.descendants(), n => {
      return ___namespace.has(n, "children");
    });
  }


  /**
   * Get the root node.
   *
   * @returns the current root node of the ``phylotree``.
   */
  function getRootNode() {
    return this.nodes;
  }

  /**
   * Get an array of all nodes.
   * @returns {Array} Nodes in the current ``phylotree``.
   */
  function getNodes() {
    return this.nodes;
  }

  /**
   * Get a node by name.
   *
   * @param {String} name Name of the desired node.
   * @returns {Node} Desired node.
   */
  function getNodeByName(name) {
    return ___namespace.filter(this.nodes.descendants(), d => {
      return d.data.name == name;
    })[0];
  }

  /**
   * Add attributes to nodes. New attributes will be placed in the
   * ``annotations`` key of any nodes that are matched.
   *
   * @param {Object} attributes An object whose keys are the names of nodes
   * to modify, and whose values are the new attributes to add.
   */
  function assignAttributes(attributes) {
    //return nodes;
    // add annotations to each matching node
    ___namespace.each(this.nodes.descendants(), function(d) {
      if (d.data && (d.data.name in attributes)) {
        d["annotations"] = attributes[d.data.name];
      }
    });
  }

  /**
   * Determine if a given node is a leaf node.
   *
   * @param {Node} A node in a tree.
   * @returns {Bool} Whether or not the node is a leaf node.
   */
  function isLeafNode(node) {
    return !___namespace.has(node, "children")
  }

  /**
   * Update a given key name in each node.
   *
   * @param {String} old_key The old key name.
   * @param {String} new_key The new key name.
   * @returns The current ``this``.
   */
  function updateKeyName(old_key, new_key) {
    this.nodes.each(function(n) {
      if (old_key in n) {
        if (new_key) {
          n[new_key] = n[old_key];
        }
        delete n[old_key];
      }
    });

    return this;
  }

  function clearInternalNodes(respect) {
    if (!respect) {
      this.nodes.each(d => {
        if (!isLeafNode(d)) {

          // TODO: Move away from storing attribute data as root (BREAKS occasionally with d3>3)
          d[this.selection_attribute_name] = false;

          if(!d.data.traits) {
            d.data.traits = {};
          }
          d.data.traits[this.selection_attribute_name] = d[this.selection_attribute_name];

        }
      });
    }
  }

  /**
   * Select all descendents of a given node, with options for selecting
   * terminal/internal nodes.
   *
   * @param {Node} node The node whose descendents should be selected.
   * @param {Boolean} terminal Whether to include terminal nodes.
   * @param {Boolean} internal Whther to include internal nodes.
   * @returns {Array} An array of selected nodes.
   */
  function selectAllDescendants$1(node, terminal, internal) {

    let selection = [];

    function sel(d) {
      if (isLeafNode(d)) {
        if (terminal) {
          if (d != node) selection.push(d);
        }
      } else {
        if (internal) {
          if (d != node) selection.push(d);
        }
        d.children.forEach(sel);
      }
    }

    sel(node);
    return selection;
  }

  var node_operations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    graftANode: graftANode,
    addChild: addChild,
    createNode: createNode,
    deleteANode: deleteANode,
    getTips: getTips,
    getInternals: getInternals,
    getRootNode: getRootNode,
    getNodes: getNodes,
    getNodeByName: getNodeByName,
    assignAttributes: assignAttributes,
    isLeafNode: isLeafNode,
    updateKeyName: updateKeyName,
    clearInternalNodes: clearInternalNodes,
    selectAllDescendants: selectAllDescendants$1
  });

  /**
   * Parses a Newick string into an equivalent JSON representation that is
   * suitable for consumption by ``hierarchy``.
   *
   * Optionally accepts bootstrap values. Currently supports Newick strings with or without branch lengths,
   * as well as tagged trees such as
   *  ``(a,(b{TAG},(c{TAG},d{ANOTHERTAG})))``
   *
   * @param {String} nwk_str - A string representing a phylogenetic tree in Newick format.
   * @param {Object} bootstrap_values.
   * @returns {Object} An object with keys ``json`` and ``error``.
   */

  function newickParser(nwk_str, options={}) {

    const int_or_float = /^-?\d+(\.\d+)?$/;
    let left_delimiter = options.left_delimiter ||  '{',
      right_delimiter = options.right_delimiter ||  '}';
    let clade_stack = [];

    function addNewTreeLevel() {
      let new_level = {
        name: null
      };

      let the_parent = clade_stack[clade_stack.length - 1];

      if (!("children" in the_parent)) {
        the_parent["children"] = [];
      }

      clade_stack.push(new_level);

      the_parent["children"].push(clade_stack[clade_stack.length - 1]);

      clade_stack[clade_stack.length - 1]["original_child_order"] =
        the_parent["children"].length;
    }

    function finishNodeDefinition() {

      let this_node = clade_stack.pop();

      this_node["name"] = current_node_name;

      if ("children" in this_node) {
        this_node["bootstrap_values"] = current_node_name;
      } else {
        this_node["name"] = current_node_name;
      }

      this_node["attribute"] = current_node_attribute;
      if(left_delimiter == "[" && current_node_annotation.includes("&&NHX")) {
        current_node_annotation
          .split(':')
          .slice(1)
          .forEach(annotation => {
            const [key, value] = annotation.split('=');
            this_node[key] = int_or_float.test(value) ? +value : value;
          });
      } else {
        this_node["annotation"] = current_node_annotation;
      }

      current_node_name = "";
      current_node_attribute = "";
      current_node_annotation = "";
    }

    function generateError(location) {
      return {
        json: null,
        error:
          "Unexpected '" +
          nwk_str[location] +
          "' in '" +
          nwk_str.substring(location - 20, location + 1) +
          "[ERROR HERE]" +
          nwk_str.substring(location + 1, location + 20) +
          "'"
      };
    }

    let automaton_state = 0;
    let current_node_name = "";
    let current_node_attribute = "";
    let current_node_annotation = "";
    let quote_delimiter = null;

    let name_quotes = {
      "'": 1,
      '"': 1
    };

    let tree_json = {
      name: "root"
    };

    clade_stack.push(tree_json);

    var space = /\s/;

    for (var char_index = 0; char_index < nwk_str.length; char_index++) {
      try {
        var current_char = nwk_str[char_index];
        switch (automaton_state) {
          case 0: {
            // look for the first opening parenthesis
            if (current_char == "(") {
              addNewTreeLevel();
              automaton_state = 1; // expecting node name
            }
            break;
          }
          case 1: // name
          case 3: {
            // branch length
            // reading name
            if (current_char == ":") {
              automaton_state = 3;
            } else if (current_char == "," || current_char == ")") {
              try {
                finishNodeDefinition();
                automaton_state = 1;
                if (current_char == ",") {
                  addNewTreeLevel();
                }
              } catch (e) {
                return generateError(char_index);
              }
            } else if (current_char == "(") {
              if (current_node_name.length > 0) {
                return generateError(char_index);
              } else {
                addNewTreeLevel();
              }
            } else if (current_char in name_quotes) {
              if (
                automaton_state == 1 &&
                current_node_name.length === 0 &&
                current_node_attribute.length === 0 &&
                current_node_annotation.length === 0
              ) {
                automaton_state = 2;
                quote_delimiter = current_char;
                continue;
              }
              return generateError(char_index);
            } else {
              if (current_char == left_delimiter) {
                if (current_node_annotation.length) {
                  return generateError(char_index);
                } else {
                  automaton_state = 4;
                }
              } else {
                if (automaton_state == 3) {
                  current_node_attribute += current_char;
                } else {
                  if (space.test(current_char)) {
                    continue;
                  }
                  if (current_char == ";") {
                    // semicolon terminates tree definition
                    char_index = nwk_str.length;
                    break;
                  }
                  current_node_name += current_char;
                }
              }
            }

            break;
          }
          case 2: {
            // inside a quoted expression
            if (current_char == quote_delimiter) {
              if (char_index < nwk_str.length - 1) {
                if (nwk_str[char_index + 1] == quote_delimiter) {
                  char_index++;
                  current_node_name += quote_delimiter;
                  continue;
                }
              }
              quote_delimiter = 0;
              automaton_state = 1;
              continue;
            } else {
              current_node_name += current_char;
            }
            break;
          }
          case 4: {
            // inside a comment / attribute
            if (current_char == right_delimiter) {
              automaton_state = 3;
            } else {
              if (current_char == left_delimiter) {
                return generateError(char_index);
              }
              current_node_annotation += current_char;
            }
            break;
          }
        }
      } catch (e) {
        return generateError(char_index);
      }
    }

    if (clade_stack.length != 1) {
      return generateError(nwk_str.length - 1);
    }

    return {
      json: tree_json,
      error: null
    };
  }

  /**
   * Return Newick string representation of a phylotree.
   *
   * @param {Function} annotator - Function to apply to each node, determining
   * what label is written (optional).
   * @param {Node} node - start at this node (default == root)
   * @returns {String} newick - Phylogenetic tree serialized as a Newick string.
   */


  function getNewick(annotator, root) {
    let self = this;

    if (!annotator) annotator = d => '';

    function nodeDisplay(n) {
      // Skip the node if it is hidden
      if (n.notshown) return;

      if (!isLeafNode(n)) {
        element_array.push("(");
        n.children.forEach(function(d, i) {
          if (i) {
            element_array.push(",");
          }
          nodeDisplay(d);
        });
        element_array.push(")");
      }

      if(n.data.name != 'root') {
        const node_label = n.data.name.replace("'", "''");

        // Escape the entire string if it contains any whitespace.
        if (/\w/.test(node_label)) {
          element_array.push("'" + node_label + "'");
        } else {
          element_array.push(n.data.name);
        }
      }
      element_array.push(annotator(n));

      let bl = self.branch_length_accessor(n);

      if (bl !== undefined) {
        element_array.push(":" + bl);
      }
    }

    let element_array = [];
    annotator = annotator || "";
    nodeDisplay(root || this.nodes);

    return element_array.join("")+";";
  }

  function parseAnnotations (buf) {

    let str = buf;
    let index = str.toUpperCase().indexOf('BEGIN DATA;');
    let data = str.slice(index);

    if(data.length < 2) {
      return '';
    }

    index = data.toUpperCase().indexOf('END;');
    let data_str = data.slice(0, index);

    // split on semicolon
    data = ___namespace.map(data_str.split(';'), d => { return d.trim() } );

    // get dimensions
    let dimensions = ___namespace.filter(data, d => {return d.toUpperCase().startsWith('DIMENSION')}); 
    dimensions = dimensions[0].split(' ');
    dimensions = ___namespace.object(___namespace.map(___namespace.rest(dimensions), d => { return d.split('=') }));

    // get formats
    let format = ___namespace.filter(data, d => {return d.toUpperCase().startsWith('FORMAT')}); 
    format = format[0].split(' ');
    format = ___namespace.object(___namespace.map(___namespace.rest(format), d => { return d.split('=') }));
    format.symbols = ___namespace.reject(format.symbols.split(""), d => d=='"');

    // get character matrix
    let matrix = ___namespace.filter(data, d => {return d.toUpperCase().startsWith('MATRIX')}); 
    matrix = matrix[0].split('\n');
    matrix = ___namespace.object(___namespace.map(___namespace.rest(matrix), d=> { return ___namespace.compact(d.split(' ')) }));

    // create all possible states for matrix
    matrix = ___namespace.mapObject(matrix, (v,k) => { 

      if(v == '?') {
        return format.symbols
      }
      else { 
        return Array(v)
      }
    
    });

    return { 'dimensions' : dimensions, 'format' : format, 'matrix' : matrix }

  }

  /**
   *  Loads annotations from a nexus-formatted buffer and annotates existing tree
   *  nodes appropriately.
   *
   * @param {Object} tree - Instatiated phylotree
   * @param {String} NEXUS string
   * @returns {Object} Annotations
   */
  function loadAnnotations(tree, label, annotations) {

    // if filename, then load from filesystem
    ___namespace.each(tree.getTips(), d => { d.data["test"] = annotations.matrix[d.data.name]; });

    // decorate nodes with annotations

  }

  function loadTree(buf) {

    // if filename, then load from filesystem
    // Parse first tree from NEXUS file and send to newickParser

    // Make all upper case
    let str = buf;

    // Get TREE block
    let index = str.toUpperCase().indexOf('BEGIN TREES;');
    let split = str.slice(index);

    if(split.length < 2) {
      return '';
    }

    index = split.toUpperCase().indexOf('END;');
    let tree_str = split.slice(0, index);

    // Filter lines that start with TREE
    let trees = tree_str.split('\n');
    trees = ___namespace.filter(trees, d => { return d.trim().toUpperCase().startsWith('TREE') });

    // Identify start of newick string
    return newickParser(trees[0]);

  }

  var nexus = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parseAnnotations: parseAnnotations,
    loadAnnotations: loadAnnotations,
    'default': loadTree
  });

  // Changes XML to JSON
  // Modified version from here: http://davidwalsh.name/convert-xml-json
  function xmlToJson(xml) {

  	// Create the return object
  	var obj = {};

  	if (xml.nodeType == 1) { // element
  		// do attributes
  		if (xml.attributes.length > 0) {
  		obj["@attributes"] = {};
  			for (var j = 0; j < xml.attributes.length; j++) {
  				var attribute = xml.attributes.item(j);
  				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
  			}
  		}
  	} else if (xml.nodeType == 3) { // text
  		obj = xml.nodeValue;
  	}

  	// do children
  	// If just one text node inside
  	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
  		obj = xml.childNodes[0].nodeValue;
  	}
  	else if (xml.hasChildNodes()) {
  		for(var i = 0; i < xml.childNodes.length; i++) {
  			var item = xml.childNodes.item(i);
  			var nodeName = item.nodeName;
  			if (typeof(obj[nodeName]) == "undefined") {
  				obj[nodeName] = xmlToJson(item);
  			} else {
  				if (typeof(obj[nodeName].push) == "undefined") {
  					var old = obj[nodeName];
  					obj[nodeName] = [];
  					obj[nodeName].push(old);
  				}
  				obj[nodeName].push(xmlToJson(item));
  			}
  		}
  	}
  	return obj;
  }

  var phyloxml_parser = function(xml, options) {

    function parsePhyloxml(node, index) {
      if (node.clade) {
        node.clade.forEach(parsePhyloxml);
        node.children = node.clade;
        delete node.clade;
      }

  		node.annotation = 1;
  		node.attribute = "0.01";
      if (node.branch_length) {
  			node.attribute = node.branch_length;
      }
      if (node.taxonomy) {
        node.name = node.taxonomy.scientific_name;
      }

      node.annotation = "";

    }

    var tree_json;

    xml = xmlToJson(xml);
    tree_json = xml.phyloxml.phylogeny.clade;
    tree_json.name = "root";
    parsePhyloxml(tree_json);

    return {
      json: tree_json,
      error: null
    };
  };

  function beast_parser(newick, options) {
    options.left_delimiter = '[';
    options.right_delimiter = ']';
    const parsed_newick = newickParser(newick, options);
    function parseBeastNode(node) {
      if(node.annotation) {
        node.beast = {};
        const tokens = node.annotation.split(/=|,|{|}/)
          .filter(token => token);
        for(var i = 0; i < tokens.length; i+=2) {
          let key = tokens[i].replace(/&|%/g, '');
          if(/[a-df-zA-DF-Z]+/.test(tokens[i+2])) {
            node.beast[key] = +tokens[i+1];
          } else {
            node.beast[key] = [+tokens[i+1], +tokens[i+2]];
            i++;
          }
        }
      }
      node.annotation = undefined;
      if(node.children) {
        node.children.forEach(parseBeastNode);
      }
    }
    parseBeastNode(parsed_newick.json);
    return parsed_newick;
  }

  /* 
   * A parser must have two fields, the object and
   * options
   */
  var format_registry = {
    nexml: nexml_parser,
    phyloxml: phyloxml_parser,
    nexus : loadTree,
    nwk: newickParser,
    nhx: newickParser,
    beast: beast_parser
  };

  /**
   * Return CSV of nodes sorted by longest branches.
   *
   * @returns {Array} An array of all tips and associated lengths of the form :
   * [{
   *    name : <tip_name>,
   *    length: <tip_length>
   * }, ...]
   */

  function getTipLengths() {

    // Get nodes and branch lengths
    let self = this;
    let tips = self.getTips();

    // Transform to name, attribute key-pair and sort by attribute length, descending
    let toExport = ___namespace.map(tips, d => { return {'name' : d.data.name, 'length' : parseFloat(d.data.attribute) } });
    toExport = ___namespace.sortBy(toExport, d=> -d.length);
    return toExport;
    
    
  }

  function maxParsimony(respect_existing, attr_name) {

    function populateMpMatrix(attr_name, d) {

      d.mp = [
        [0, 0], // score for parent selected / not selected
        [false, false]
      ]; // selected or not

      if (isLeafNode(d)) {

        d.mp[1][0] = d.mp[1][1] = d[attr_name] || false;
        d.mp[0][0] = d.mp[1][0] ? 1 : 0;
        d.mp[0][1] = 1 - d.mp[0][0];

      } else {

        d.children.forEach(pop_mp_mat);

        var s0 = d.children.reduce(function(p, n) {
          return n.mp[0][0] + p;
        }, 0);

        // cumulative children score if this node is 0
        var s1 = d.children.reduce(function(p, n) {
          return n.mp[0][1] + p;
        }, 0);

        // cumulative children score if this node is 1
        // parent = 0

        if (d[attr_name]) {
          // respect selected
          d.mp[0][0] = s1 + 1;
          d.mp[1][0] = true;
          d.mp[0][1] = s1;
          d.mp[1][1] = true;
        } else {
          if (s0 < s1 + 1) {
            d.mp[0][0] = s0;
            d.mp[1][0] = false;
          } else {
            d.mp[0][0] = s1 + 1;
            d.mp[1][0] = true;
          }

          // parent = 1

          if (s1 < s0 + 1) {
            d.mp[0][1] = s1;
            d.mp[1][1] = true;
          } else {
            d.mp[0][1] = s0 + 1;
            d.mp[1][1] = false;
          }
        }
      }
    }

    const pop_mp_mat = ___namespace.partial(populateMpMatrix, attr_name);
    pop_mp_mat(this.nodes);

    this.nodes.each(d => {
      if (d.parent) {
        d.mp = d.mp[1][d.parent.mp ? 1 : 0];
      } else {
        d.mp = d.mp[1][d.mp[0][0] < d.mp[0][1] ? 0 : 1];
      }
    });

    this.display.modifySelection((d, callback) => {
      if (isLeafNode(d.target)) {
        return d.target[attr_name];
      }
      return d.target.mp;
    });

  }

  function postOrder(node, callback, backtrack) {

    let nodes = [node],
      next = [],
      children,
      i,
      n;

    while ((node = nodes.pop())) {
      if (!(backtrack && backtrack(node))) {
        next.push(node), (children = node.children);
        if (children)
          for (i = 0, n = children.length; i < n; ++i) {
            nodes.push(children[i]);
          }
      }
    }

    while ((node = next.pop())) {
      callback(node);
    }

    return node;

  }

  function preOrder(node, callback, backtrack) {
    let nodes = [node],
      children,
      i;

    while ((node = nodes.pop())) {
      if (!(backtrack && backtrack(node))) {
        callback(node), (children = node.children);
        if (children)
          for (i = children.length - 1; i >= 0; --i) {
            nodes.push(children[i]);
          }
      }
    }

    return node;
  }

  function inOrder(node, callback, backtrack) {
    let current,
      next = [node],
      children,
      i,
      n;

    do {
      (current = next.reverse()), (next = []);
      while ((node = current.pop())) {
        if (!(backtrack && backtrack(node))) {
          callback(node), (children = node.children);
          if (children)
            for (i = 0, n = children.length; i < n; ++i) {
              next.push(children[i]);
            }
        }
      }
    } while (next.length);

    return node;
  }

  /**
   * Traverses a tree that represents left-child right-sibling
   * @param {Object} tree -- the phylotree.js tree object 
   * @return {Object} An edge list that represents the original multi-way tree
   *
   */
  function leftChildRightSibling(root) {

    let declareTrueParent = function(n) {

      if(n.children) {
        // left child is the child
        n.children[0].data.multiway_parent = n;

        // right child is the sibling
        n.children[1].data.multiway_parent = n.parent;
      }

    };

    // First decorate each node with its true parent node
    postOrder(root, declareTrueParent);

    // return edge list
    let edge_list = ___namespace$1.map(root.descendants(), n => { 

      let source = n.data.multiway_parent; 
      let name = "unknown";

      if(source) {
        name = source.data.name;
      }

      // In order to get the true name of the infector/infectee, we must traverse
      // the tree from the multiway_parents node.

      return {"source" : n.data.multiway_parent, "target" : n, "name": name } });

    // Construct edge list by new parent-child listing
    return edge_list;

  }

  /**
   * Returns T/F whether every branch in the tree has a branch length
   *
   * @returns {Object} true if  every branch in the tree has a branch length
   */
  function hasBranchLengths() {

    let bl = this.branch_length;

    if (bl) {
      return ___namespace.every(this.nodes.descendants(), function(node) {
        return !node.parent || !___namespace.isUndefined(bl(node));
      });

    }

    return false;
  }

  /**
   * Returns branch lengths
   *
   * @returns {Array} array of branch lengths
   */
  function getBranchLengths() {

    let bl = this.branch_length;
    return ___namespace.map(this.nodes.descendants(), node => { return bl(node)});

  }


  function defBranchLengthAccessor(_node, new_length) {

    let _node_data = _node.data;

    if (
      "attribute" in _node_data &&
      _node_data["attribute"] &&
      _node_data["attribute"].length
    ) {

      if(new_length > 0) {
        _node_data["attribute"] = String(new_length);
      }

      let bl = parseFloat(_node_data["attribute"]);

      if (!isNaN(bl)) {
        return Math.max(0, bl);
      }

    }

    // Allow for empty branch length at root
    if(_node_data.name == "root") {
      return 0;
    }

    console.warn('Undefined branch length at ' + _node_data.name + '!');

    return undefined;

  }

  /**
   * Get or set branch length accessor.
   *
   * @param {Function} attr Empty if getting, or new branch length accessor if setting.
   * @returns {Object} The branch length accessor if getting, or the current this if setting.
   */
  function setBranchLength(attr) {
    if (!arguments.length) return this.branch_length_accessor;
    this.branch_length_accessor = attr ? attr : defBranchLengthAccessor;
    return this;
  }

  /**
   * Normalizes branch lengths
   */
  function normalize(attr) {

    let bl = this.branch_length;

    let branch_lengths = ___namespace.map(this.nodes.descendants(), function(node) {
      if(bl(node)) {
      return bl(node);
      } else {
        return null;
      }
    });

    const max_bl = ___namespace.max(branch_lengths);
    const min_bl = ___namespace.min(branch_lengths);

    let scaler = function (x) {
      return (x - min_bl)/(max_bl - min_bl);
    };

    ___namespace.each(this.nodes.descendants(), (node) => {
        let len = bl(node);
        if(len) {
          bl(node, scaler(len));
        }     
    });

    return this;

  }


  /**
   * Scales branch lengths
   *
   * @param {Function} function that scales the branches
   */
  function scale(scale_by) {

    let bl = this.branch_length;

    ___namespace.each(this.nodes.descendants(), (node) => {
        let len = bl(node);
        if(len) {
          bl(node, scale_by(len));
        }     
    });

    return this;

  }

  /**
   * Get or set branch name accessor.
   *
   * @param {Function} attr (Optional) If setting, a function that accesses a branch name
   * from a node.
   * @returns The ``nodeLabel`` accessor if getting, or the current ``this`` if setting.
   */
  function branchName(attr) {
    if (!arguments.length) return this.nodeLabel;
    this.nodeLabel = attr;
    return this;
  }

  /**
  * Reroot the tree on the given node.
  *
  * @param {Node} node Node to reroot on.
  * @param {fraction} if specified, partition the branch not into 0.5 : 0.5, but according to 
                     the specified fraction
                     
  * @returns {Phylotree} The current ``phylotree``.
  */
  function reroot(node, fraction) {

    /** TODO add the option to root in the middle of a branch */
    if(!(node instanceof d3__namespace.hierarchy)) {
     throw new Error('node needs to be an instance of a d3.hierarchy node!');
    }

    let nodes = this.nodes.copy();

    fraction = fraction !== undefined ? fraction : 0.5;

    if (node.parent) {

      var new_json = d3__namespace.hierarchy({
        name: "new_root"
      });
      
      new_json.children = [node.copy()];
      new_json.data.__mapped_bl = undefined;

      nodes.each(n => {
        n.data.__mapped_bl = this.branch_length_accessor(n);
      });

      this.setBranchLength(n => {
        return n.data.__mapped_bl;
      });

      let remove_me = node,
        current_node = node.parent,
        stashed_bl = ___namespace.noop();

      let apportioned_bl =
        node.data.__mapped_bl === undefined ? undefined : node.data.__mapped_bl * fraction;

      stashed_bl = current_node.data.__mapped_bl;

      current_node.data.__mapped_bl =
        node.data.__mapped_bl === undefined
          ? undefined
          : node.data.__mapped_bl - apportioned_bl;

      node.data.__mapped_bl = apportioned_bl;

      var remove_idx;

      if (current_node.parent) {

        new_json.children.push(current_node);

        while (current_node.parent) {

          remove_idx = current_node.children.indexOf(remove_me);

          if (current_node.parent.parent) {
            current_node.children.splice(remove_idx, 1, current_node.parent);
          } else {
            current_node.children.splice(remove_idx, 1);
          }

          let t = current_node.parent.data.__mapped_bl;

          if (t !== undefined) {
            current_node.parent.data.__mapped_bl = stashed_bl;
            stashed_bl = t;
          }

          remove_me = current_node;
          current_node = current_node.parent;
        }

        remove_idx = current_node.children.indexOf(remove_me);
        current_node.children.splice(remove_idx, 1);

      } else {

        remove_idx = current_node.children.indexOf(remove_me);
        current_node.children.splice(remove_idx, 1);
        stashed_bl = current_node.data.__mapped_bl;
        remove_me = new_json;

      }

      // current_node is now old root, and remove_me is the root child we came up
      // the tree through
      if (current_node.children.length == 1) {

        if (stashed_bl) {
          current_node.children[0].data.__mapped_bl += stashed_bl;
        }

        remove_me.children = remove_me.children.concat(current_node.children);

      } else {

        let new_node = new d3__namespace.hierarchy({ name: "__reroot_top_clade", __mapped_bl: stashed_bl });
        ___namespace.extendOwn (new_json.children[0], node);
        new_node.data.__mapped_bl = stashed_bl;
        new_node.children = current_node.children.map(function(n) {
          n.parent = new_node;
          return n;
        });

        new_node.parent = remove_me;
        remove_me.children.push(new_node);

     }

    }

    // need to traverse the nodes and update parents
    this.update(new_json);

    this.traverse_and_compute(n => {
      ___namespace.each (n.children, (c) => {c.parent = n;});
    }, "pre-order");


    if(!___namespace.isUndefined(this.display)) {

      // get options
      let options = this.display.options;
      // get container
      d3__namespace.select(this.display.container).select('svg').remove();

      // retain selection
      let selectionName = this.display.selection_attribute_name;

      delete this.display;

      let rendered_tree = this.render(options);
      rendered_tree.selectionLabel(selectionName);
      rendered_tree.update();
      d3__namespace.select(rendered_tree.container).node().appendChild(rendered_tree.show());
      d3__namespace.select(this.display.container).dispatch('reroot');

    }

    return this;

  }

  function rootpath(attr_name, store_name) {

    attr_name = attr_name || "attribute";
    store_name = store_name || "y_scaled";

    if ("parent" in this) {
      let my_value = parseFloat(this[attr_name]);

      this[store_name] =
        this.parent[store_name] + (isNaN(my_value) ? 0.1 : my_value);

    } else {

      this[store_name] = 0.0;

    }

    return this[store_name];

  }

  function pathToRoot(node) {
    let selection = [];
    while (node) {
      selection.push(node);
      node = node.parent;
    }
    return selection;
  }

  var rooting = /*#__PURE__*/Object.freeze({
    __proto__: null,
    reroot: reroot,
    rootpath: rootpath,
    pathToRoot: pathToRoot
  });

  function xCoord(d) {
    return d.y;
  }

  function yCoord(d) {
    return d.x;
  }

  function radialMapper(r, a, radial_center) {
    return {
      x: radial_center + r * Math.sin(a),
      y: radial_center + r * Math.cos(a)
    };
  }

  function cartesianToPolar(
    node,
    radius,
    radial_root_offset,
    radial_center,
    scales,
    size
  ) {

    node.radius = radius * (node.radius + radial_root_offset);

    //if (!node.angle) {
    node.angle = 2 * Math.PI * node.x * scales[0] / size[0];
    //}

    let radial = radialMapper(node.radius, node.angle, radial_center);

    node.x = radial.x;
    node.y = radial.y;

    return node;

  }

  function drawArc(radial_center, points) {


    var start = radialMapper(points[0].radius, points[0].angle, radial_center),
      end = radialMapper(points[0].radius, points[1].angle, radial_center);

    return (
      "M " +
      xCoord(start) +
      "," +
      yCoord(start) +
      " A " +
      points[0].radius +
      "," +
      points[0].radius +
      " 0,0, " +
      (points[1].angle > points[0].angle ? 1 : 0) +
      " " +
      xCoord(end) +
      "," +
      yCoord(end) +
      " L " +
      xCoord(points[1]) +
      "," +
      yCoord(points[1])
    );
  }

  function arcSegmentPlacer(edge, where, radial_center) {
    var r = radialMapper(
      edge.target.radius + (edge.source.radius - edge.target.radius) * where,
      edge.target.angle,
      radial_center
    );
    return { x: xCoord(r), y: yCoord(r) };
  }

  var draw_line = d3__namespace
    .line()
    .x(function(d) {
      return xCoord(d);
    })
    .y(function(d) {
      return yCoord(d);
    })
    .curve(d3__namespace.curveStepBefore);

  function lineSegmentPlacer(edge, where) {
    return {
      x:
        xCoord(edge.target) +
        (xCoord(edge.source) - xCoord(edge.target)) * where,
      y: yCoord(edge.target)
    };
  }

  function itemTagged(item) {
    return item.tag || false;
  }

  function itemSelected(item, tag) {
    return item[tag] || false;
  }

  const css_classes = {
    "tree-container": "phylotree-container",
    "tree-scale-bar": "tree-scale-bar",
    node: "node",
    "internal-node": "internal-node",
    "tagged-node": "node-tagged",
    "selected-node": "node-selected",
    "collapsed-node": "node-collapsed",
    "root-node": "root-node",
    branch: "branch",
    "selected-branch": "branch-selected",
    "tagged-branch": "branch-tagged",
    "tree-selection-brush": "tree-selection-brush",
    "branch-tracer": "branch-tracer",
    clade: "clade",
    node_text: "phylotree-node-text"
  };

  function internalNames(attr) {
    if (!arguments.length) return this.options["internal-names"];
    this.options["internal-names"] = attr;
    return this;
  }

  function radial(attr) {
    if (!arguments.length) return this.options["is-radial"];
    this.options["is-radial"] = attr;
    return this;
  }

  function alignTips(attr) {
    if (!arguments.length) return this.options["align-tips"];
    this.options["align-tips"] = attr;
    return this;
  }

  /**
   * Return the bubble size of the current node.
   *
   * @param {Node} A node in the phylotree.
   * @returns {Float} The size of the bubble associated to this node.
   */
  function nodeBubbleSize(node) {

    // if a custom bubble styler, use that instead

    if(this.options["draw-size-bubbles"] && this.options["bubble-styler"]) {
      return this.options["bubble-styler"](node);
    } else {
      return this.options["draw-size-bubbles"]
        ? this.relative_nodeSpan(node) * this.scales[0] * 0.25
        : 0;
      }
  }

  function shiftTip$1(d) {
    if (this.options["is-radial"]) {
      return [
        (d.text_align == "end" ? -1 : 1) *
          (this.radius_pad_for_bubbles - d.radius),
        0
      ];
    }
    if (this.options["right-to-left"]) {
      return [this.right_most_leaf - d.screen_x, 0];
    }
    return [this.right_most_leaf - d.screen_x, 0];
  }

  function layoutHandler(attr) {
    if (!arguments.length) return this.layout_listener_handler;
    this.layout_listener_handler = attr;
    return this;
  }

  /**
   * Getter/setter for the selection label. Useful when allowing
   * users to make multiple selections.
   *
   * @param {String} attr (Optional) If setting, the new selection label.
   * @returns The current selection label if getting, or the current ``phylotree`` if setting.
   */
  function selectionLabel(attr) {
    if (!arguments.length) return this.selection_attribute_name;
    this.selection_attribute_name = attr;
    this.syncEdgeLabels();
    return this;
  }

  /**
   * Get or set the current node span. If setting, the argument should
   * be a function of a node which returns a number, so that node spans
   * can be determined dynamically. Alternatively, the argument can be the
   * string ``"equal"``, to give all nodes an equal span.
   *
   * @param {Function} attr Optional; if setting, the nodeSpan function.
   * @returns The ``nodeSpan`` if getting, or the current ``phylotree`` if setting.
   */
  function nodeSpan$1(attr) {
    if (!arguments.length) return nodeSpan$1;
    if (typeof attr == "string" && attr == "equal") {
      nodeSpan$1 = function(d) { // eslint-disable-line
        return 1;
      };
    } else {
      nodeSpan$1 = attr; // eslint-disable-line
    }
    return this;
  }

  // List of all selecters that can be used with the restricted-selectable option
  var predefined_selecters = {
    all: d => {
      return true;
    },
    none: d => {
      return false;
    },
    "all-leaf-nodes": d => {
      return isLeafNode(d.target);
    },
    "all-internal-nodes": d => {
      return !isLeafNode(d.target);
    }
  };

  /**
   * Getter/setter for the selection callback. This function is called
   * every time the current selection is modified, and its argument is
   * an array of nodes that make up the current selection.
   *
   * @param {Function} callback (Optional) The selection callback function.
   * @returns The current ``selectionCallback`` if getting, or the current ``this`` if setting.
   */
  function selectionCallback$1(callback) {
    if (!callback) return this.selectionCallback;
    this.selectionCallback = callback;
    return this;
  }

  var opt = /*#__PURE__*/Object.freeze({
    __proto__: null,
    css_classes: css_classes,
    internalNames: internalNames,
    radial: radial,
    alignTips: alignTips,
    nodeBubbleSize: nodeBubbleSize,
    shiftTip: shiftTip$1,
    layoutHandler: layoutHandler,
    selectionLabel: selectionLabel,
    get nodeSpan () { return nodeSpan$1; },
    predefined_selecters: predefined_selecters,
    selectionCallback: selectionCallback$1
  });

  function shiftTip(d) {

    if (this.radial()) {
      return [
        (d.text_align == "end" ? -1 : 1) *
          (this.radius_pad_for_bubbles - d.radius),
        0
      ];
    }

    if (this.options["right-to-left"]) {
      return [this.right_most_leaf - d.screen_x, 0];
    }

    return [this.right_most_leaf - d.screen_x, 0];

  }

  function drawNode(container, node, transitions) {

    container = d3__namespace.select(container);
    var is_leaf = isLeafNode(node);

    if (is_leaf) {
      container = container.attr("data-node-name", node.data.name);
    }

    var labels = container.selectAll("text").data([node]),
      tracers = container.selectAll("line");

    if (is_leaf || (this.showInternalName(node) && !isNodeCollapsed(node))) {

      labels = labels
        .enter()
        .append("text")
        .classed(this.css_classes["node_text"], true)
        .merge(labels)
        .on("click", d=> {
          this.handle_node_click(node, d);
        })
        .attr("dy", d => {
          return this.shown_font_size * 0.33;
        })
        .text(d => {
          return this.options["show-labels"] ? this._nodeLabel(d) : "";
        })
        .style("font-size", d => {
          return this.ensure_size_is_in_px(this.shown_font_size);
        });

      if (this.radial()) {
        labels = labels
          .attr("transform", d => {
            return (
              this.d3PhylotreeSvgRotate(d.text_angle) +
              this.d3PhylotreeSvgTranslate(
                this.alignTips() ? this.shiftTip(d) : null
              )
            );
          })
          .attr("text-anchor", d => {
            return d.text_align;
          });
      } else {
        labels = labels.attr("text-anchor", "start").attr("transform", d => {
          if (this.options["layout"] == "right-to-left") {
            return this.d3PhylotreeSvgTranslate([-20, 0]);
          }
          return this.d3PhylotreeSvgTranslate(
            this.alignTips() ? this.shiftTip(d) : null
          );
        });
      }

      if (this.alignTips()) {
        tracers = tracers.data([node]);

        if (transitions) {
          tracers = tracers
            .enter()
            .append("line")
            .classed(this.css_classes["branch-tracer"], true)
            .merge(tracers)
            .attr("x1", d => {
              return (
                (d.text_align == "end" ? -1 : 1) * this.nodeBubbleSize(node)
              );
            })
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", 0)
            .attr("x2", d => {
              if (this.options["layout"] == "right-to-left") {
                return d.screen_x;
              }

              return this.shiftTip(d)[0];
            })
            .attr("transform", d => {
              return this.d3PhylotreeSvgRotate(d.text_angle);
            })
            .attr("x2", d => {
              if (this.options["layout"] == "right-to-left") {
                return d.screen_x;
              }
              return this.shiftTip(d)[0];
            })
            .attr("transform", d => {
              return this.d3PhylotreeSvgRotate(d.text_angle);
            });
        } else {
          tracers = tracers
            .enter()
            .append("line")
            .classed(this.css_classes["branch-tracer"], true)
            .merge(tracers)
            .attr("x1", d => {
              return (
                (d.text_align == "end" ? -1 : 1) * this.nodeBubbleSize(node)
              );
            })
            .attr("y2", 0)
            .attr("y1", 0)
            .attr("x2", d => {
              return this.shiftTip(d)[0];
            });
          tracers.attr("transform", d => {
            return this.d3PhylotreeSvgRotate(d.text_angle);
          });
        }
      } else {
        tracers.remove();
      }

      if (this.options["draw-size-bubbles"]) {

        var shift = this.nodeBubbleSize(node);

        let circles = container
          .selectAll("circle")
          .data([shift])
          .enter()
          .append("circle");

        circles.attr("r", function(d) {
          return d;
        });

        if (this.shown_font_size >= 5) {
          labels = labels.attr("dx", d => {
            return (
              (d.text_align == "end" ? -1 : 1) *
              ((this.alignTips() ? 0 : shift) + this.shown_font_size * 0.33)
            );
          });
        }
      } else {
        if (this.shown_font_size >= 5) {
          labels = labels.attr("dx", d => { // eslint-disable-line
            return (d.text_align == "end" ? -1 : 1) * this.shown_font_size * 0.33;
          });
        }
      }
    }

    if (!is_leaf) {
      let circles = container
          .selectAll("circle")
          .data([node])
          .enter()
          .append("circle"),
        radius = this.node_circle_size()(node);

      if (radius > 0) {
        circles
          .merge(circles)
          .attr("r", d => {
            return Math.min(this.shown_font_size * 0.75, radius);
          })
          .on("click", d => {
            this.handle_node_click(node, d);
          });
      } else {
        circles.remove();
      }
    }

    if (this.node_styler) {
      this.node_styler(container, node);
    }

    return node;
  }

  function updateHasHiddenNodes() {
    let nodes = this.phylotree.nodes.descendants();

    for (let k = nodes.length - 1; k >= 0; k -= 1) {
      if (isLeafNode(nodes[k])) {
        nodes[k].hasHiddenNodes = nodes[k].notshown;
      } else {
        nodes[k].hasHiddenNodes = nodes[k].children.reduce(function(p, c) {
          return c.notshown || p;
        }, false);
      }
    }

    return this;
  }

  function showInternalName(node) {

    const i_names = this.internalNames();

    if (i_names) {
      if (typeof i_names === "function") {
        return i_names(node);
      }
      return i_names;
    }

    return false;
  }

  /**
   * Get or set the current node span. If setting, the argument should
   * be a function of a node which returns a number, so that node spans
   * can be determined dynamically. Alternatively, the argument can be the
   * string ``"equal"``, to give all nodes an equal span.
   *
   * @param {Function} attr Optional; if setting, the nodeSpan function.
   * @returns The ``nodeSpan`` if getting, or the current ``phylotree`` if setting.
   */
  function nodeSpan(attr) {
    if (!arguments.length) return this.nodeSpan;
    if (typeof attr == "string" && attr == "equal") {
      this.nodeSpan = function(d) {
        return 1;
      };
    } else {
      this.nodeSpan = attr;
    }
    return this;
  }

  function reclassNode(node) {

    let class_var = css_classes[isLeafNode(node) ? "node" : "internal-node"];

    if (itemTagged(node)) {
      class_var += " " + css_classes["tagged-node"];
    }

    if (itemSelected(node, this.selection_attribute_name)) {
      class_var += " " + css_classes["selected-node"];
    }

    if (!node["parent"]) {
      class_var += " " + css_classes["root-node"];
    }

    if (isNodeCollapsed(node) || hasHiddenNodes(node)) {
      class_var += " " + css_classes["collapsed-node"];
    }

    return class_var;
  }

  function nodeVisible(node) {
    return !(node.hidden || node.notshown || false);
  }

  function nodeNotshown(node) {
    return node.notshown;
  }

  function hasHiddenNodes(node) {
    return node.hasHiddenNodes || false;
  }

  function isNodeCollapsed(node) {
    return node.collapsed || false;
  }

  function nodeCssSelectors(css_classes) {
    return [
      css_classes["node"],
      css_classes["internal-node"],
      css_classes["collapsed-node"],
      css_classes["tagged-node"],
      css_classes["root-node"]
    ].reduce(function(p, c, i, a) {
      return (p += "g." + c + (i < a.length - 1 ? "," : ""));
    }, "");
  }

  function internalLabel(callback, respect_existing) {

    this.phylotree.clearInternalNodes(respect_existing);

    for (var i = this.phylotree.nodes.descendants().length - 1; i >= 0; i--) {

      var d = this.phylotree.nodes.descendants()[i];

      if (!(isLeafNode(d) || itemSelected(d, this.selection_attribute_name))) {
        d[this.selection_attribute_name] = callback(d.children);
      }

    }

    this.modifySelection((d, callback) => {
      if (isLeafNode(d.target)) {
        return d.target[this.selection_attribute_name];
      }
      return d.target[this.selection_attribute_name];
    });
  }

  function defNodeLabel(_node) {

    _node = _node.data;

    if (isLeafNode(_node)) {
      return _node.name || "";
    }

    if (this.showInternalName(_node)) {
      return _node.name;
    }

    return "";

  }

  /**
   * Get or set nodeLabel accessor.
   *
   * @param {Function} attr (Optional) If setting, a function that accesses a branch name
   * from a node.
   * @returns The ``nodeLabel`` accessor if getting, or the current ``this`` if setting.
   */
  function nodeLabel(attr) {
    if (!arguments.length) return this._nodeLabel;
    this._nodeLabel = attr ? attr : defNodeLabel;
  	this.update();
    return this;
  }

  var render_nodes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    shiftTip: shiftTip,
    drawNode: drawNode,
    updateHasHiddenNodes: updateHasHiddenNodes,
    showInternalName: showInternalName,
    nodeSpan: nodeSpan,
    reclassNode: reclassNode,
    nodeVisible: nodeVisible,
    nodeNotshown: nodeNotshown,
    hasHiddenNodes: hasHiddenNodes,
    isNodeCollapsed: isNodeCollapsed,
    nodeCssSelectors: nodeCssSelectors,
    internalLabel: internalLabel,
    defNodeLabel: defNodeLabel,
    nodeLabel: nodeLabel
  });

  function cladeCssSelectors(css_classes) {
    return [css_classes["clade"]].reduce(function(p, c, i, a) {
      return (p += "path." + c + (i < a.length - 1 ? "," : ""));
    }, "");
  }

  function updateCollapsedClades(transitions) {

    let enclosure = this.svg.selectAll("." + this.css_classes["tree-container"]);
    var node_id = 0;

    let collapsed_clades = enclosure
      .selectAll(cladeCssSelectors(this.css_classes))
      .data(
        this.phylotree.nodes.descendants().filter(isNodeCollapsed),
        function(d) {
          return d.id || (d.id = ++node_id);
        }
      );

    let spline = function() {};
    let spline_f = ___namespace.noop();

    // Collapse radial differently
    if (this.radial()) {
      spline = d3__namespace
        .line()
        .curve(d3__namespace.curveBasis)
        .y(function(d) {
          return d[0];
        })
        .x(function(d) {
          return d[1];
        });

      spline_f = function(coord, i, d, init_0, init_1) {
        if (i) {
          return [
            d.screen_y + (coord[0] - init_0) / 50,
            d.screen_x + (coord[1] - init_1) / 50
          ];
        } else {
          return [d.screen_y, d.screen_x];
        }
      };
    } else {
      spline = d3__namespace
        .line()
        .y(function(d) {
          return d[0];
        })
        .x(function(d) {
          return d[1];
        }).curve(d3__namespace.curveBasis);

      spline_f = function(coord, i, d, init_0, init_1) {
        if (i) {
           return [
            d.screen_y + (coord[0] - init_0) / 50 ,
            d.screen_x + (coord[1] - init_1) / 50,
          ];
        } else {
          return [d.screen_y, d.screen_x];
        }
      };
    }

    collapsed_clades
      .exit()
      .each(function(d) {
        d.collapsed_clade = null;
      })
      .remove();

    if (transitions) {
      collapsed_clades
        .enter()
        .insert("path", ":first-child")
        .attr("class", this.css_classes["clade"])
        .merge(collapsed_clades)
        .attr("d", function(d) {
          if (d.collapsed_clade) {
            return d.collapsed_clade;
          }

          //console.log (d.collapsed);
          let init_0 = d.collapsed[0][0];
          let init_1 = d.collapsed[0][1];
          

    
          // #1 return spline(d.collapsed.map(spline_f, d, init_0, init_1));
          return spline(
            d.collapsed.map(function(coord, i) {
              return spline_f(coord, i, d, init_0, init_1);
            })
          );
        })
        .attr("d", function(d) {        
          return (d.collapsed_clade = spline(d.collapsed));
        });
    } else {
      collapsed_clades
        .enter()
        .insert("path", ":first-child")
        .attr("class", this.css_classes["clade"])
        .merge(collapsed_clades)
        .attr("d", function(d) {
          return (d.collapsed_clade ? d.collapsed_clade : d.collapsed_clade = spline(d.collapsed));
        });
    }
  }

  var clades = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cladeCssSelectors: cladeCssSelectors,
    updateCollapsedClades: updateCollapsedClades
  });

  function drawEdge(container, edge, transition) {

    container = d3__namespace.select(container);

    container = container
      .attr("class", d => {
        return this.reclassEdge(d);
      })
      .on("click", d => {
        this.modifySelection([edge.target], this.selection_attribute_name);
        this.update();
      });

    let new_branch_path = this.draw_branch([edge.source, edge.target]);

    if (transition) {

      if (container.datum().existing_path) {
        container = container.attr("d", function(d) {
          return d.existing_path;
        });
      }

      container = container.attr("d", new_branch_path);

    } else {
      container = container.attr("d", new_branch_path);
    }

    edge.existing_path = new_branch_path;

    var bl = this.phylotree.branch_length_accessor(edge.target);

    if (bl !== undefined) {
      var haz_title = container.selectAll("title");

      if (haz_title.empty()) {
        haz_title = container.append("title");
      }
      haz_title.text("Length = " + bl);
    } else {
      container.selectAll("title").remove();
    }

    if (this.edge_styler) {
      this.edge_styler(container, edge, transition);
    }

    return this.phylotree;

  }

  function reclassEdge(edge) {

    let class_var = css_classes["branch"];

    if (itemTagged(edge)) {
      class_var += " " + css_classes["tagged-branch"];
    }

    if (itemSelected(edge, this.selection_attribute_name)) {
      class_var += " " + css_classes["selected-branch"];
    }

    return class_var;

  }

  function initializeEdgeLabels() {

    this.links.forEach(d => {

      // TODO: Move away from storing attribute data as root (BREAKS occasionally with d3>3)
      if(d.target.data.annotation) {
        d.target[d.target.data.annotation] = d.target.data.annotation;
      }

    });

  }


  function syncEdgeLabels() {

    this.links.forEach(d => {

      // TODO: Move away from storing attribute data as root (BREAKS occasionally with d3>3)
      d[this.selection_attribute_name] =
        d.target[this.selection_attribute_name] || false;
      d.tag = d.target.tag || false;

    });

    if (this.countHandler()) {

      let counts = {};

      counts[
        this.selection_attribute_name
      ] = this.links.reduce((p, c) => {
        return p + (c[this.selection_attribute_name] ? 1 : 0);
      }, 0);

      counts["tagged"] = this.links.reduce(function(p, c) {
        return p + (itemTagged(c) ? 1 : 0);
      }, 0);

      this.countUpdate(this, counts, this.countHandler());

    }

  }

  function edgeVisible(edge) {
    return !(edge.target.hidden || edge.target.notshown || false);
  }

  function edgeCssSelectors(css_classes) {
    return [
      css_classes["branch"],
      css_classes["selected-branch"],
      css_classes["tagged-branch"]
    ].reduce(function(p, c, i, a) {
      return (p += "path." + c + (i < a.length - 1 ? "," : ""));
    }, "");
  }

  function placeAlongAnEdge (e, where) {
      return this.edge_placer (e, where);
  }

  var render_edges = /*#__PURE__*/Object.freeze({
    __proto__: null,
    drawEdge: drawEdge,
    reclassEdge: reclassEdge,
    initializeEdgeLabels: initializeEdgeLabels,
    syncEdgeLabels: syncEdgeLabels,
    edgeVisible: edgeVisible,
    edgeCssSelectors: edgeCssSelectors,
    placeAlongAnEdge: placeAlongAnEdge
  });

  let d3_layout_phylotree_event_id = "phylotree.event";

  /**
   * Toggle collapsed view of a given node. Either collapses a clade into
   * a smaller blob for viewing large trees, or expands a node that was
   * previously collapsed.
   *
   * @param {Node} node The node to toggle.
   * @returns {Phylotree} The current ``phylotree``.
   */
  function toggleCollapse(node) {
    if (node.collapsed) {
      node.collapsed = false;

      let unhide = function(n) {
        if (!isLeafNode(n)) {
          if (!n.collapsed) {
            n.children.forEach(unhide);
          }
        }
        n.hidden = false;
      };

      unhide(node);
    } else {
      node.collapsed = true;
    }

    this.placenodes();
    return this;
  }

  function resizeSvg(tree, svg, tr) {

    let sizes = this.size;

    if (this.radial()) {
      let pad_radius = this.pad_width(),
        vertical_offset =
          this.options["top-bottom-spacing"] != "fit-to-size"
            ? this.pad_height()
            : 0;

      sizes = [
        sizes[1] + 2 * pad_radius,
        sizes[0] + 2 * pad_radius + vertical_offset
      ];

      if (svg) {
        svg
          .selectAll("." + css_classes["tree-container"])
          .attr(
            "transform",
            "translate (" +
              pad_radius +
              "," +
              (pad_radius + vertical_offset) +
              ")"
          );
      }
    } else {

      sizes = [
        sizes[0] +
          (this.options["top-bottom-spacing"] != "fit-to-size"
            ? this.pad_height()
            : 0),
        sizes[1] +
          (this.options["left-right-spacing"] != "fit-to-size"
            ? this.pad_width()
            : 0)
      ];

    }

    if (svg) {

      if (tr) {
        svg = svg.transition(100);
      }

      svg.attr("height", sizes[0]).attr("width", sizes[1]);

    }

    this.size = sizes;

    return sizes;

  }

  function rescale(scale, attr_name) {
    attr_name = attr_name || "y_scaled";
    if (attr_name in this) {
      this[attr_name] *= scale;
    }
  }

  function triggerRefresh(tree) {

    var event = new CustomEvent(d3_layout_phylotree_event_id, {
      detail: ["refresh", tree]
    });

    document.dispatchEvent(event);

  }

  function countUpdate(tree, counts) {
    var event = new CustomEvent(d3_layout_phylotree_event_id, {
      detail: ["countUpdate", counts, tree.countHandler()]
    });
    document.dispatchEvent(event);
  }

  function d3PhylotreeTriggerLayout(tree) {
    var event = new CustomEvent(d3_layout_phylotree_event_id, {
      detail: ["layout", tree, tree.layoutHandler()]
    });
    document.dispatchEvent(event);
  }

  function d3PhylotreeEventListener(event) {
    switch (event.detail[0]) {
      case "refresh":
        event.detail[1].refresh();
        break;
      case "countUpdate":
        event.detail[2](event.detail[1]);
        break;
      case "layout":
        event.detail[2](event.detail[1]);
    }
    return true;
  }

  function d3PhylotreeAddEventListener() {
    document.addEventListener(
      d3_layout_phylotree_event_id,
      d3PhylotreeEventListener,
      false
    );
  }

  function d3PhylotreeSvgTranslate(x) {
    if (x && (x[0] !== null || x[1] !== null))
      return (
        "translate (" +
        (x[0] !== null ? x[0] : 0) +
        "," +
        (x[1] !== null ? x[1] : 0) +
        ") "
      );

    return "";
  }

  function d3PhylotreeSvgRotate(a) {
    if (a !== null) {
      return "rotate (" + a + ") ";
    }
    return "";
  }

  var events = /*#__PURE__*/Object.freeze({
    __proto__: null,
    toggleCollapse: toggleCollapse,
    resizeSvg: resizeSvg,
    rescale: rescale,
    triggerRefresh: triggerRefresh,
    countUpdate: countUpdate,
    d3PhylotreeTriggerLayout: d3PhylotreeTriggerLayout,
    d3PhylotreeEventListener: d3PhylotreeEventListener,
    d3PhylotreeAddEventListener: d3PhylotreeAddEventListener,
    d3PhylotreeSvgTranslate: d3PhylotreeSvgTranslate,
    d3PhylotreeSvgRotate: d3PhylotreeSvgRotate
  });

  let d3_layout_phylotree_context_menu_id = "d3_layout_phylotree_context_menu";

  function nodeDropdownMenu(node, container, phylotree, options, event) {
    let menu_object = d3__namespace
      .select(container)
      .select("#" + d3_layout_phylotree_context_menu_id);

    if (menu_object.empty()) {
      menu_object = d3__namespace
        .select(container)
        .append("div")
        .attr("id", d3_layout_phylotree_context_menu_id)
        .attr("class", "dropdown-menu")
        .attr("role", "menu");
    }

    menu_object.selectAll("a").remove();
    menu_object.selectAll("h6").remove();
    menu_object.selectAll("div").remove();

    if (node) {
      if (
        !___namespace.some([
          Boolean(node.menu_items),
          options["hide"],
          options["selectable"],
          options["collapsible"]
        ]) ||
        !options["show-menu"]
      )
        return;
      if (!isLeafNode(node)) {
        if (options["collapsible"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text(isNodeCollapsed(node) ? "Expand Subtree" : "Collapse Subtree")
            .on("click", d => {
              menu_object.style("display", "none");
              this.toggleCollapse(node).update();
            });
          if (options["selectable"]) {
            menu_object.append("div").attr("class", "dropdown-divider");
            menu_object
              .append("h6")
              .attr("class", "dropdown-header")
              .text("Toggle selection");
          }
        }

        if (options["selectable"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("All descendant branches")
            .on("click", function(d) {
              menu_object.style("display", "none");
              phylotree.modifySelection(
                phylotree.selectAllDescendants(node, true, true)
              );
            });

          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("All terminal branches")
            .on("click", function(d) {
              menu_object.style("display", "none");
              phylotree.modifySelection(
                phylotree.selectAllDescendants(node, true, false)
              );
            });

          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("All internal branches")
            .on("click", function(d) {
              menu_object.style("display", "none");
              phylotree.modifySelection(
                phylotree.selectAllDescendants(node, false, true)
              );
            });
        }
      }

      if (node.parent) {
        if (options["selectable"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("Incident branch")
            .on("click", function(d) {
              menu_object.style("display", "none");
              phylotree.modifySelection([node]);
            });

          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("Path to root")
            .on("click", d => {
              menu_object.style("display", "none");
              this.modifySelection(this.phylotree.pathToRoot(node));
            });

          if (options["reroot"] || options["hide"]) {
            menu_object.append("div").attr("class", "dropdown-divider");
          }
        }

        if (options["reroot"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("Reroot on this node")
            .on("click", d => {
              menu_object.style("display", "none");
              this.phylotree.reroot(node);
              this.update();
            });
        }

        if (options["hide"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("Hide this " + (isLeafNode(node) ? "node" : "subtree"))
            .on("click", d => {
              menu_object.style("display", "none");
              this.modifySelection([node], "notshown", true, true)
                .updateHasHiddenNodes()
                .update();
            });
        }
      }

      if (hasHiddenNodes(node)) {
        menu_object
          .append("a")
          .attr("class", "dropdown-item")
          .attr("tabindex", "-1")
          .text("Show all descendant nodes")
          .on("click", function(d) {
            menu_object.style("display", "none");
            phylotree
              .modifySelection(
                phylotree.selectAllDescendants(node, true, true),
                "notshown",
                true,
                true,
                "false"
              )
              .updateHasHiddenNodes()
              .update();
          });
      }

      // now see if we need to add user defined menus

      var has_user_elements = [];
      if ("menu_items" in node && typeof node["menu_items"] === "object") {
        node["menu_items"].forEach(function(d) {
          if (d.length == 3) {
            if (!d[2] || d[2](node)) {
              has_user_elements.push([d[0], d[1]]);
            }
          }
        });
      }

      if (has_user_elements.length) {
        const show_divider_options = [
          options["hide"],
          options["selectable"],
          options["collapsible"]
        ];

        if (___namespace.some(show_divider_options)) {
          menu_object.append("div").attr("class", "dropdown-divider");
        }

        has_user_elements.forEach(function(d) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text((d[0])(node)) // eslint-disable-line
            .on("click", ___namespace.partial(d[1], node));
        });
      }

      let tree_container = document.querySelector(container); // eslint-disable-line
      let rect = tree_container.getBoundingClientRect();
     
      menu_object
        .style("position", "absolute")
        .style("left", "" + (event.clientX - rect.x + 12 ) + "px")
        .style("top", "" + (event.clientY - rect.y ) + "px")
        .style("display", "block");
    } else {
      menu_object.style("display", "none");
    }

  }

  function addCustomMenu(node, name, callback, condition) {
    if (!("menu_items" in node)) {
      node["menu_items"] = [];
    }
    if (
      !node["menu_items"].some(function(d) {
        return d[0] == name && d[1] == callback && d[2] == condition;
      })
    ) {
      node["menu_items"].push([name, callback, condition]);
    }
  }

  /**
   *
   * Modify the current selection, via functional programming.
   *
   * @param {Function} node_selecter A function to apply to each node, which
   * determines whether they become part of the current selection. Alternatively,
   * if ``restricted-selectable`` mode is enabled, a string describing one of
   * the pre-defined restricted-selectable options.
   * @param {String} attr (Optional) The selection attribute to modify.
   * @param {Boolean} place (Optional) Whether or not ``placenodes`` should be called.
   * @param {Boolean} skip_refresh (Optional) Whether or not a refresh is called.
   * @param {String} mode (Optional) Can be ``"toggle"``, ``"true"``, or ``"false"``.
   * @returns The current ``this``.
   *
   */
  function modifySelection(
    node_selecter,
    attr,
    place,
    skip_refresh,
    mode
  ) {

    attr = attr || this.selection_attribute_name;
    mode = mode || "toggle";

    // check if node_selecter is a value of pre-defined selecters

    if (this.options["restricted-selectable"].length) {
      // the selection must be from a list of pre-determined selections
      if (___namespace.contains(___namespace.keys(predefined_selecters), node_selecter)) {
        node_selecter = predefined_selecters[node_selecter];
      } else {
        return;
      }
    }

    if (
      (this.options["restricted-selectable"] || this.options["selectable"]) &&
      !this.options["binary-selectable"]
    ) {
      var do_refresh = false;

      if (typeof node_selecter === "function") {
        this.links.forEach(function(d) {
          let select_me = node_selecter(d);
          d[attr] = d[attr] || false;
          if (d[attr] != select_me) {
            d[attr] = select_me;
            do_refresh = true;
            d.target[attr] = select_me;
          }
        });
      } else {
        node_selecter.forEach(function(d) {
          var new_value;
          switch (mode) {
            case "true":
              new_value = true;
              break;
            case "false":
              new_value = false;
              break;
            default:
              new_value = !d[attr];
              break;
          }

          if (d[attr] != new_value) {
            d[attr] = new_value;
            do_refresh = true;
          }
        });

        this.links.forEach(function(d) {
          d[attr] = d.target[attr];
        });
      }

      var counts;

      if (do_refresh) {
        if (!skip_refresh) {
          triggerRefresh(this);
        }
        if (this.countHandler) {
          counts = {};
          counts[attr] = this.links.reduce(function(p, c) {
            return p + (c[attr] ? 1 : 0);
          }, 0);
          countUpdate(this, counts, this.countHandler);
        }

        if (place) {
          this.placenodes();
        }
      }
    } else if (this.options["binary-selectable"]) {
      if (typeof node_selecter === "function") {
        this.links.forEach(function(d) {
          var select_me = node_selecter(d);
          d[attr] = d[attr] || false;

          if (d[attr] != select_me) {
            d[attr] = select_me;
            do_refresh = true;
            d.target[attr] = select_me;
          }

          this.options["attribute-list"].forEach(function(type) {
            if (type != attr && d[attr] === true) {
              d[type] = false;
              d.target[type] = false;
            }
          });
        });
      } else {
        node_selecter.forEach(function(d) {
          var new_value;
          new_value = !d[attr];

          if (d[attr] != new_value) {
            d[attr] = new_value;
            do_refresh = true;
          }
        });

        this.links.forEach(function(d) {
          d[attr] = d.target[attr];
          this.options["attribute-list"].forEach(function(type) {
            if (type != attr && d[attr] !== true) {
              d[type] = false;
              d.target[type] = false;
            }
          });
        });
      }

      if (do_refresh) {
        if (!skip_refresh) {
          triggerRefresh(this);
        }
        if (this.countHandler()) {
          counts = {};
          counts[attr] = this.links.reduce(function(p, c) {
            return p + (c[attr] ? 1 : 0);
          }, 0);
          this.countUpdate(this, counts, this.countHandler());
        }

        if (place) {
          this.placenodes();
        }
      }
    }

    if (this.selectionCallback && attr != "tag") {
      this.selectionCallback(this.getSelection());
    }

    this.refresh();
    this.update();
    return this;
  }

  /**
   * Get nodes which are currently selected.
   *
   * @returns {Array} An array of nodes that match the current selection.
   */
  function getSelection() {
    return this.nodes.filter(d => {
      return d[this.selection_attribute_name];
    });
  }

  /**
   * Select all descendents of a given node, with options for selecting
   * terminal/internal nodes.
   *
   * @param {Node} node The node whose descendents should be selected.
   * @param {Boolean} terminal Whether to include terminal nodes.
   * @param {Boolean} internal Whther to include internal nodes.
   * @returns {Array} An array of selected nodes.
   */
  function selectAllDescendants(node, terminal, internal) {

    let selection = [];

    function sel(d) {
      if (isLeafNode(d)) {
        if (terminal) {
          if (d != node) selection.push(d);
        }
      } else {
        if (internal) {
          if (d != node) selection.push(d);
        }
        d.children.forEach(sel);
      }
    }

    sel(node);
    return selection;
  }

  /**
   * Getter/setter for the selection callback. This function is called
   * every time the current selection is modified, and its argument is
   * an array of nodes that make up the current selection.
   *
   * @param {Function} callback (Optional) The selection callback function.
   * @returns The current ``selectionCallback`` if getting, or the current ``this`` if setting.
   */
  function selectionCallback(callback) {
    if (!callback) return this.selectionCallback;
    this.selectionCallback = callback;
    return this;
  }

  var menus = /*#__PURE__*/Object.freeze({
    __proto__: null,
    nodeDropdownMenu: nodeDropdownMenu,
    addCustomMenu: addCustomMenu,
    modifySelection: modifySelection,
    getSelection: getSelection,
    selectAllDescendants: selectAllDescendants,
    selectionCallback: selectionCallback
  });

  // replacement for d3.functor
  function constant(x) {
    return function() {
      return x;
    };
  }

  class TreeRender {
    constructor(phylotree, options = {}) {
      this.css_classes = css_classes;
      this.phylotree = phylotree;
      this.container = options.container;
      this.separation = function(_node, _previous) {
        return 0;
      };

      this._nodeLabel = this.defNodeLabel;
      this.svg = null;
      this.selectionCallback = null;
      this.scales = [1, 1];
      this.size = [1, 1];
      this.fixed_width = [14, 30];
      this.scale_bar_font_size = 12;

      this.draw_branch = draw_line;
      this.draw_scale_bar = null;
      this.edge_placer = lineSegmentPlacer;
      this.count_listener_handler = function() {};
      this.layout_listener_handler = function() {};
      this.node_styler = undefined;
      this.edge_styler = undefined;
      this.selection_attribute_name = "selected";
      this.right_most_leaf = 0;
      this.label_width = 0;
      this.radial_center = 0;
      this.radius = 1;
      this.radius_pad_for_bubbles = 0;
      this.rescale_nodeSpan = 1;
      this.relative_nodeSpan = function(_node) {
        return this.nodeSpan(_node) / this.rescale_nodeSpan;
      };

      let default_options = {
        layout: "left-to-right",
        logger: console,
        branches: "step",
        scaling: true,
        bootstrap: false,
        "color-fill": true,
        "font-size": 14,
        "internal-names": false,
        selectable: true,
        // restricted-selectable can take an array of predetermined
        // selecters that are defined in phylotree.predefined_selecters
        // only the defined functions will be allowed when selecting
        // branches
        "restricted-selectable": false,
        collapsible: true,
        "left-right-spacing": "fixed-step", //'fit-to-size',
        "top-bottom-spacing": "fixed-step",
        "left-offset": 0,
        "show-scale": "top",
        // currently not implemented to support any other positioning
        "draw-size-bubbles": false,
        "bubble-styler": this.radius_pad_for_bubbles,
        "binary-selectable": false,
        "is-radial": false,
        "attribute-list": [],
        "max-radius": 768,
        "annular-limit": 0.38196601125010515,
        compression: 0.2,
        "align-tips": false,
        "maximum-per-node-spacing": 100,
        "minimum-per-node-spacing": 2,
        "maximum-per-level-spacing": 100,
        "minimum-per-level-spacing": 10,
        node_circle_size: constant(3),
        transitions: null,
        brush: true,
        reroot: true,
        hide: true,
        "label-nodes-with-name": false,
        zoom: false,
        "show-menu": true,
        "show-labels": true,
        "node-styler": null,
        "edge-styler": null,
        "node-span": null
      };

      this.ensure_size_is_in_px = function(value) {
        return typeof value === "number" ? value + "px" : value;
      };

      this.options = ___namespace.defaults(options, default_options);

      this.font_size = this.options["font-size"];
      this.offsets = [0, this.font_size / 2];
      this.shown_font_size = this.font_size;

      this.width = this.options.width || 800;
      this.height = this.options.height || 600;

      this.node_styler = this.options['node-styler'];
      this.edge_styler = this.options['edge-styler'];

      this.nodeSpan = this.options['node-span'];

      if(!this.nodeSpan) {
        this.nodeSpan = function(_node) {
          return 1;
        };
      }

      this.rescale_nodeSpan =
        this.phylotree.nodes.children
          .map(d => {
            if (isLeafNode(d) || this.showInternalName(d))
              return this.nodeSpan(d);
          })
          .reduce(function(p, c) {
            return Math.min(c, p || 1e200);
          }, null) || 1;

      this.initialize_svg(this.container);
      this.links = this.phylotree.nodes.links();
      this.initializeEdgeLabels();
      this.update();
      d3PhylotreeAddEventListener();
    }

    pad_height() {
      if (this.draw_scale_bar) {
        return this.scale_bar_font_size + 25;
      }

      return 0;
    }

    pad_width() {
      // reset label_width
      this.label_width = this._label_width(this.shown_font_size);

      const _label_width = this.options["show-labels"] ? this.label_width : 0;
      return this.offsets[1] + this.options["left-offset"] + _label_width;
    }

    /**
     * Collapses a given node.
     *
     * @param {Node} node A node to be collapsed.
     */
    collapse_node(n) {
      if (!isNodeCollapsed(n)) {
        n.collapsed = true;
      }
    }

    /**
     * Get or set the size of tree in pixels.
     *
     * @param {Array} attr (optional) An array of the form ``[height, width]``.
     * @returns {Phylotree} The current ``size`` array if getting, or the current ``phylotree``
     * if setting.
     */
    set_size(attr) {
      if (!arguments.length) {
        return this.size;
      }

      let phylo_attr = attr;

      if (this.options["top-bottom-spacing"] != "fixed-step") {
        this.size[0] = phylo_attr[0];
      }
      if (this.options["left-right-spacing"] != "fixed-step") {
        this.size[1] = phylo_attr[1];
      }

      return this;
    }

    /**
     * Getter/setter for the SVG element for the Phylotree to be rendered in.
     *
     * @param {d3-selection} svg_element (Optional) SVG element to render within, selected by D3.
     * @returns The selected SVG element if getting, or the current ``phylotree`` if setting.`
     */
    initialize_svg(svg_element) {
      //if (!arguments.length) return this.svg;

      if (this.svg !== svg_element) {
        d3__namespace.select(svg_element)
          .select("svg")
          .remove();

        this.svg = d3__namespace
          .create("svg")
          .attr("width", this.width)
          .attr("height", this.height);

        this.set_size([this.height, this.width]);

        if (this.css_classes["tree-container"] == "phylotree-container") {
          this.svg.selectAll("*").remove();
          this.svg.append("defs");
        }

        d3__namespace.select(this.container).on(
          "click",
          d => {
            this.handle_node_click(null);
          },
          true
        );
      }

      return this;
    }

    update_layout(new_json, do_hierarchy) {
      if (do_hierarchy) {
        this.nodes = d3__namespace.hierarchy(new_json);
        this.nodes.each(function(d) {
          d.id = null;
        });
      }

      this.update();
      this.syncEdgeLabels();
    }

    /**
     * Update the current phylotree, i.e., alter the svg
     * elements.
     *
     * @param {Boolean} transitions (Optional) Toggle whether transitions should be shown.
     * @returns The current ``phylotree``.
     */
    update(transitions) {

      var self = this;

      //if (!this.svg) return this;

      this.placenodes();

      transitions = this.transitions(transitions);

      let node_id = 0;

      let enclosure = this.svg
        .selectAll("." + css_classes["tree-container"])
        .data([0]);

      enclosure = enclosure
        .enter()
        .append("g")
        .attr("class", css_classes["tree-container"])
        .merge(enclosure)
        .attr("transform", d => {
          return this.d3PhylotreeSvgTranslate([
            this.offsets[1] + this.options["left-offset"],
            this.pad_height()
          ]);
        });

      if (this.draw_scale_bar) {
        let scale_bar = this.svg
          .selectAll("." + css_classes["tree-scale-bar"])
          .data([0]);

        scale_bar
          .enter()
          .append("g")
          .attr("class", css_classes["tree-scale-bar"])
          .style("font-size", this.ensure_size_is_in_px(this.scale_bar_font_size))
          .merge(scale_bar)
          .attr("transform", d => {
            return this.d3PhylotreeSvgTranslate([
              this.offsets[1] + this.options["left-offset"],
              this.pad_height() - 10
            ]);
          })
          .call(this.draw_scale_bar);

        scale_bar.selectAll("text").style("text-anchor", "end");
      } else {
        this.svg.selectAll("." + css_classes["tree-scale-bar"]).remove();
      }

      enclosure = this.svg
        .selectAll("." + css_classes["tree-container"])
        .data([0]);

      this.updateCollapsedClades(transitions);

      let drawn_links = enclosure
        .selectAll(edgeCssSelectors(css_classes))
        .data(this.links.filter(edgeVisible), d => {
          return d.target.id || (d.target.id = ++node_id);
        });

      if (transitions) {
        drawn_links.exit().remove();
      } else {
        drawn_links.exit().remove();
      }

      drawn_links = drawn_links
        .enter()
        .insert("path", ":first-child")
        .merge(drawn_links)
        .each(function(d) {
          self.drawEdge(this, d, transitions);
        });

      let drawn_nodes = enclosure
        .selectAll(nodeCssSelectors(css_classes))
        .data(
          this.phylotree.nodes.descendants().filter(nodeVisible),
          d => {
            return d.id || (d.id = ++node_id);
          }
        );

      drawn_nodes.exit().remove();

      drawn_nodes = drawn_nodes
        .enter()
        .append("g")
        .attr("class", this.reclassNode)
        .merge(drawn_nodes)
        .attr("transform", d => {
          const should_shift =
            this.options["layout"] == "right-to-left" && isLeafNode(d);

          d.screen_x = xCoord(d);
          d.screen_y = yCoord(d);

          return this.d3PhylotreeSvgTranslate([
            should_shift ? 0 : d.screen_x,
            d.screen_y
          ]);
        })
        .each(function(d) {
          self.drawNode(this, d, transitions);
        })
        .attr("transform", d => {
          if (!___namespace.isUndefined(d.screen_x) && !___namespace.isUndefined(d.screen_y)) {
            return "translate(" + d.screen_x + "," + d.screen_y + ")";
          }
        });

      if (this.options["label-nodes-with-name"]) {
        drawn_nodes = drawn_nodes.attr("id", d => {
          return "node-" + d.name;
        });
      }

      this.resizeSvg(this.phylotree, this.svg, transitions);

      if (this.options["brush"]) {
        var brush = enclosure
          .selectAll("." + css_classes["tree-selection-brush"])
          .data([0])
          .enter()
          .insert("g", ":first-child")
          .attr("class", css_classes["tree-selection-brush"]);

        var brush_object = d3__namespace
          .brush()
          .on("brush", (event, d) => {
            var extent = event.selection,
              shown_links = this.links.filter(edgeVisible);
            var selected_links = shown_links
                .filter((d, i) => {
                  return (
                    d.source.screen_x >= extent[0][0] &&
                    d.source.screen_x <= extent[1][0] &&
                    d.source.screen_y >= extent[0][1] &&
                    d.source.screen_y <= extent[1][1] &&
                    d.target.screen_x >= extent[0][0] &&
                    d.target.screen_x <= extent[1][0] &&
                    d.target.screen_y >= extent[0][1] &&
                    d.target.screen_y <= extent[1][1]
                  );
                })
                .map(d => {
                  return d.target;
                });

            this.modifySelection(

              this.phylotree.links.map(d => {
                return d.target;
              }),
              "tag",
              false,
              selected_links.length > 0,
              "false"
            );

            this.modifySelection(selected_links, "tag", false, false, "true");

          })
          .on("end", () => {
            //brush.call(d3.event.target.clear());
          });

        brush.call(brush_object);
      }

      this.syncEdgeLabels();

      if (this.options["zoom"]) {
        let zoom = d3__namespace
          .zoom()
          .scaleExtent([0.1, 10])
          .on("zoom", (event) => {

            d3__namespace.select("." + css_classes["tree-container"]).attr("transform", d => {
              let toTransform = event.transform;
              return toTransform;
            });

            // Give some extra room
            d3__namespace.select("." + css_classes["tree-scale-bar"]).attr("transform", d => {
              let toTransform = event.transform;
              toTransform.y -= 10; 
              return toTransform;
            });
            
          });

        this.svg.call(zoom);
      }

      return this;
    }

    _handle_single_node_layout(
      a_node
    ) {
      let _nodeSpan = this.nodeSpan(a_node) / this.rescale_nodeSpan;
      // compute the relative size of nodes (0,1)
      // sum over all nodes is 1
      this.x = a_node.x =
        this.x +
        this.separation(this.last_node, a_node) +
        (this.last_span + _nodeSpan) * 0.5;
        
   
      // separation is a user-settable callback to add additional spacing on nodes
      this._extents[1][1] = Math.max(this._extents[1][1], a_node.y);
      this._extents[1][0] = Math.min(
        this._extents[1][0],
        a_node.y - _nodeSpan * 0.5
      );
      

      if (this.is_under_collapsed_parent) {
         this._extents[0][1] = Math.max(
          this._extents[0][1],
          this.save_x +
            (a_node.x - this.save_x) * this.options["compression"] +
            this.save_span +
            (_nodeSpan * 0.5 + this.separation(this.last_node, a_node)) *
              this.options["compression"]
        );      
      } else {
        this._extents[0][1] = Math.max(
          this._extents[0][1],
          this.x + _nodeSpan * 0.5 + this.separation(this.last_node, a_node)
        );
      }


      this.last_node = a_node;
      this.last_span = _nodeSpan;
      
    }

    tree_layout(a_node) {
      /**
              for each node: 
                  y: the y coordinate is root to tip
                      (left to right in cladogram layout, radius is radial layout
                  x : the x coordinate is top-most to bottom-most 
                      (top to bottom in cladogram layout, angle in radial layout)
                  
                  
           @return the x-coordinate of a_node or undefined in the node is not displayed
                   (hidden or under a collapsed node)
          */


      // do not layout hidden nodes
      if (nodeNotshown(a_node)) {
        return undefined;
      }

      let is_leaf = isLeafNode(a_node);

      // the next four members are radial layout options
      a_node.text_angle = null; // the angle at which text is being laid out
      a_node.text_align = null; // css alignment option for node labels
      a_node.radius = null; // radial layout radius
      a_node.angle = null; // radial layout angle (in radians)

      /** determine the root-to-tip location of this node;
              
        the root node receives the co-ordinate of 0
        
        if the tree has branch lengths, then the placement of each node is simply the 
        total branch length to the root
        
        if the tree has no branch lengths, all leaves get the same depth ("number of internal nodes on the deepest path")
        and all internal nodes get the depth in integer units of the # of internal nodes on the path to the root + 1
          
      */

      let undef_BL = false;

      /** _extents computes a bounding box for the tree (initially NOT in screen 
              coordinates)

          all account for node sizes

          _extents [1][0] -- the minimum x coordinate (breadth)
          _extents [1][1] -- the maximum y coordinate (breadth)
          _extents [1][0] -- the minimum y coordinate (root-to-tip, or depthwise)
          _extents [1][1] -- the maximum y coordinate (root-to-tip, or depthwise)

      */


      // last node laid out in the top bottom hierarchy

      if (a_node["parent"]) {
        if (this.do_scaling) {
          if (undef_BL) {
            return 0;
          }

          a_node.y = this.phylotree.branch_length_accessor(a_node);

          if (typeof a_node.y === "undefined") {
            undef_BL = true;
            return 0;
          }
          a_node.y += a_node.parent.y;
        } else {
          a_node.y = is_leaf ? this.max_depth : a_node.depth;
        }
      } else {
        this.x = 0.0;
        // the span of the last node laid out in the top to bottom hierarchy
        a_node.y = 0.0;
        this.last_node = null;
        this.last_span = 0.0;
        this._extents = [[0, 0], [0, 0]];
      }

      /** the next block has to do with top-to-bottom spacing of nodes **/

      if (is_leaf) {
        // displayed internal nodes are handled in `process_internal_node`
        this._handle_single_node_layout(
          a_node
        );
      }

      if (!is_leaf) {
        // for internal nodes
        if (
          isNodeCollapsed(a_node) &&
          !this.is_under_collapsed_parent
        ) {
          // collapsed node
          this.save_x = this.x;
          this.save_span = this.last_span * 0.5;
          this.is_under_collapsed_parent = true;
          this.process_internal_node(a_node);
          this.is_under_collapsed_parent = false;
   
          if (typeof a_node.x === "number") {
            a_node.x =
              this.save_x +
              (a_node.x -this.save_x) * this.options["compression"] +
              this.save_span;

            a_node.collapsed = [[a_node.x, a_node.y]];

            var map_me = n => {
              n.hidden = true;

              if (isLeafNode(n)) {            
                this.x = n.x =
                  this.save_x +
                  (n.x - this.save_x) * this.options["compression"] +
                  this.save_span;

                a_node.collapsed.push([n.x, n.y]);             
              } else {
                n.children.map(map_me);
              }
            };

            this.x = this.save_x;
            map_me(a_node);
           

            a_node.collapsed.splice(1, 0, [this.save_x, a_node.y]);
            a_node.collapsed.push([this.x, a_node.y]);
            a_node.collapsed.push([a_node.x, a_node.y]);
            a_node.hidden = false;
          }
        } else {
          // normal node, or under a collapsed parent
          this.process_internal_node(a_node);
        }
      }

      return a_node.x;
    }

    process_internal_node(a_node) {
      /** 
              decide if the node will be shown, and compute its top-to-bottom (breadthwise)
              placement 
          */

      let count_undefined = 0;

      if (this.showInternalName(a_node)) {
        // do in-order traversal to allow for proper internal node spacing
        // (x/2) >> 0 is integer division
        let half_way = (a_node.children.length / 2) >> 0;
        let displayed_children = 0;
        let managed_to_display = false;

        for (let child_id = 0; child_id < a_node.children.length; child_id++) {
          let child_x = this.tree_layout(a_node.children[child_id]);//.bind(this);

          if (typeof child_x == "number") {
            displayed_children++;
          }

          if (displayed_children >= half_way && !managed_to_display) {
            this._handle_single_node_layout(a_node);
            managed_to_display = true;
          }
        }

        if (displayed_children == 0) {
          a_node.notshown = true;
          a_node.x = undefined;
        } else {
          if (!managed_to_display) {
            this._handle_single_node_layout(a_node);
          }
        }
      } else {
        // postorder layout
        a_node.x = a_node.children
          .map(this.tree_layout.bind(this))
          .reduce((a, b) => {
            if (typeof b == "number") return a + b;
            count_undefined += 1;
            return a;
          }, 0.0);

        if (count_undefined == a_node.children.length) {
          a_node.notshown = true;
          a_node.x = undefined;
        } else {
          a_node.x /= a_node.children.length - count_undefined;
        }
      }
    }

    do_lr(at_least_one_dimension_fixed) {
      if (this.radial() && at_least_one_dimension_fixed) {
        this.offsets[1] = 0;
      }

      if (this.options["left-right-spacing"] == "fixed-step") {
        this.size[1] = this.max_depth * this.fixed_width[1];

        this.scales[1] = 
          (this.size[1] - this.offsets[1] - this.options["left-offset"]) /
          this._extents[1][1];

        this.label_width = this._label_width(this.shown_font_size);

        if (this.radial()) {
          this.label_width *= 2;
        }
      } else {
        this.label_width = this._label_width(this.shown_font_size);

        at_least_one_dimension_fixed = true;

        let available_width =
          this.size[1] - this.offsets[1] - this.options["left-offset"];

        if (available_width * 0.5 < this.label_width) {
          this.shown_font_size *= (available_width * 0.5) / this.label_width;
          this.label_width = available_width * 0.5;
        }

        this.scales[1] =
          (this.size[1] -
            this.offsets[1] -
            this.options["left-offset"] -
            this.label_width) /
          this._extents[1][1];
      }
    }

    /**
     * Place the current nodes, i.e., determine their coordinates based
     * on current settings.
     *
     * @returns The current ``phylotree``.
     */
    placenodes() {
      this._extents = [
        [0, 0],
        [0, 0]
      ];

      this.x = 0.0;
      this.last_span = 0.0;
      //let x = 0.0,
      //  last_span = 0;
      
      this.last_node = null;
      this.last_span = 0.0;

      (this.save_x = this.x), (this.save_span = this.last_span * 0.5);

      this.do_scaling = this.options["scaling"];
      let undef_BL = false;

      this.is_under_collapsed_parent = false;
      this.max_depth = 1;
      
      // Set initial x
      this.phylotree.nodes.x = this.tree_layout(
        this.phylotree.nodes,
        this.do_scaling
      );

      this.max_depth = d3__namespace.max(this.phylotree.nodes.descendants(), n => {
        return n.depth;
      });

      if (this.do_scaling && undef_BL) {
        // requested scaling, but some branches had no branch lengths
        // redo layout without branch lengths
        this.do_scaling = false;
        this.phylotree.nodes.x = this.tree_layout(this.phylotree.nodes);
      }

      let at_least_one_dimension_fixed = false;

      this.draw_scale_bar = this.options["show-scale"] && this.do_scaling;

      // this is a hack so that phylotree.pad_height would return ruler spacing
      this.offsets[1] = Math.max(
        this.font_size,
        -this._extents[1][0] * this.fixed_width[0]
      );

      if (this.options["top-bottom-spacing"] == "fixed-step") {
        this.size[0] = this._extents[0][1] * this.fixed_width[0];
        this.scales[0] = this.fixed_width[0];
      } else {
        this.scales[0] = (this.size[0] - this.pad_height()) / this._extents[0][1];
        at_least_one_dimension_fixed = true;
      }

      this.shown_font_size = Math.min(this.font_size, this.scales[0]);

      if (this.radial()) {
        // map the nodes to polar coordinates
        this.draw_branch = ___namespace.partial(drawArc, this.radial_center);
        this.edge_placer = arcSegmentPlacer;

        let last_child_angle = null,
          last_circ_position = null,
          last_child_radius = null,
          min_radius = 0,
          effective_span = this._extents[0][1] * this.scales[0];

        let compute_distance = function(r1, r2, a1, a2, annular_shift) {
          annular_shift = annular_shift || 0;
          return Math.sqrt(
            (r2 - r1) * (r2 - r1) +
              2 *
                (r1 + annular_shift) *
                (r2 + annular_shift) *
                (1 - Math.cos(a1 - a2))
          );
        };

        let max_r = 0;

        this.phylotree.nodes.each(d => {
          let my_circ_position = d.x * this.scales[0];
          d.angle = (2 * Math.PI * my_circ_position) / effective_span;
          d.text_angle = d.angle - Math.PI / 2;
          d.text_angle = d.text_angle > 0 && d.text_angle < Math.PI;
          d.text_align = d.text_angle ? "end" : "start";
          d.text_angle = (d.text_angle ? 180 : 0) + (d.angle * 180) / Math.PI;
        });

        this.do_lr(at_least_one_dimension_fixed);

        this.phylotree.nodes.each(d => {
          d.radius = (d.y * this.scales[1]) / this.size[1];
          max_r = Math.max(d.radius, max_r);
        });

        let annular_shift = 0;

        this.phylotree.nodes.each(d => {
          if (!d.children) {
            let my_circ_position = d.x * this.scales[0];
            if (last_child_angle !== null) {
              let required_spacing = my_circ_position - last_circ_position,
                radial_dist = compute_distance(
                  d.radius,
                  last_child_radius,
                  d.angle,
                  last_child_angle,
                  annular_shift
                );

              let local_mr =
                radial_dist > 0
                  ? required_spacing / radial_dist
                  : 10 * this.options["max-radius"];

              if (local_mr > this.options["max-radius"]) {
                // adjust the annular shift
                let dd = required_spacing / this.options["max-radius"],
                  b = d.radius + last_child_radius,
                  c =
                    d.radius * last_child_radius -
                    (dd * dd -
                      (last_child_radius - d.radius) *
                        (last_child_radius - d.radius)) /
                      2 /
                      (1 - Math.cos(last_child_angle - d.angle)),
                  st = Math.sqrt(b * b - 4 * c);

                annular_shift = Math.min(
                  this.options["annular-limit"] * max_r,
                  (-b + st) / 2
                );
                min_radius = this.options["max-radius"];
              } else {
                min_radius = Math.max(min_radius, local_mr);
              }
            }

            last_child_angle = d.angle;
            last_circ_position = my_circ_position;
            last_child_radius = d.radius;
          }
        });

        this.radius = Math.min(
          this.options["max-radius"],
          Math.max(effective_span / 2 / Math.PI, min_radius)
        );

        if (at_least_one_dimension_fixed) {
          this.radius = Math.min(
            this.radius,
            (Math.min(effective_span, this._extents[1][1] * this.scales[1]) -
              this.label_width) *
              0.5 -
              this.radius * annular_shift
          );
        }

        this.radial_center = this.radius_pad_for_bubbles = this.radius;
        this.draw_branch = ___namespace.partial(drawArc, this.radial_center);

        let scaler = 1;

        if (annular_shift) {
          scaler = max_r / (max_r + annular_shift);
          this.radius *= scaler;
        }

        this.phylotree.nodes.each(d => {
          cartesianToPolar(
            d,
            this.radius,
            annular_shift,
            this.radial_center,
            this.scales,
            this.size
          );

          max_r = Math.max(max_r, d.radius);

          if (this.options["draw-size-bubbles"]) {
            this.radius_pad_for_bubbles = Math.max(
              this.radius_pad_for_bubbles,
              d.radius + this.nodeBubbleSize(d)
            );
          } else {
            this.radius_pad_for_bubbles = Math.max(
              this.radius_pad_for_bubbles,
              d.radius
            );
          }

          if (d.collapsed) {
            d.collapsed = d.collapsed.map(p => {
              let z = {};
              z.x = p[0];
              z.y = p[1];
              z = cartesianToPolar(
                z,
                this.radius,
                annular_shift,
                this.radial_center,
                this.scales,
                this.size
              );
              return [z.x, z.y];
            });

            let last_point = d.collapsed[1];

            d.collapsed = d.collapsed.filter(function(p, i) {
              if (i < 3 || i > d.collapsed.length - 4) return true;
              if (
                Math.sqrt(
                  Math.pow(p[0] - last_point[0], 2) +
                    Math.pow(p[1] - last_point[1], 2)
                ) > 3
              ) {
                last_point = p;
                return true;
              }
              return false;
            });
          }
        });

        this.size[0] = this.radial_center + this.radius / scaler;
        this.size[1] = this.radial_center + this.radius / scaler;
      } else {
  this.do_lr();

        this.draw_branch = draw_line;
        this.edge_placer = lineSegmentPlacer;
        this.right_most_leaf = 0;

        this.phylotree.nodes.each(d => {

          d.x *= this.scales[0];
          d.y *= this.scales[1]*.8;

          if (this.options["layout"] == "right-to-left") {   
            d.y = this._extents[1][1] * this.scales[1] - d.y;
          }


          if (isLeafNode(d)) {
            this.right_most_leaf = Math.max(
              this.right_most_leaf,
              d.y + this.nodeBubbleSize(d)
            );
          }

          if (d.collapsed) {
            d.collapsed.forEach(p => {
              p[0] *= this.scales[0];
              p[1] *= this.scales[1]*.8;
            });

            let last_x = d.collapsed[1][0];

            d.collapsed = d.collapsed.filter(function(p, i) {
              if (i < 3 || i > d.collapsed.length - 4) return true;
              if (p[0] - last_x > 3) {
                last_x = p[0];
                return true;
              }
              return false;
            });
          }
        });
      }

      if (this.draw_scale_bar) {
        let domain_limit, range_limit;

        if (this.radial()) {
          range_limit = Math.min(this.radius / 5, 50);
          domain_limit = Math.pow(
            10,
            Math.ceil(
              Math.log((this._extents[1][1] * range_limit) / this.radius) /
                Math.log(10)
            )
          );
          

          range_limit = domain_limit * (this.radius / this._extents[1][1]);

          if (range_limit < 30) {
            let stretch = Math.ceil(30 / range_limit);
            range_limit *= stretch;
            domain_limit *= stretch;
          }
        } else {
          domain_limit = this._extents[1][1];

          range_limit =
            this.size[1] - this.offsets[1] - this.options["left-offset"] - this.shown_font_size;
       }

        let scale = d3__namespace
            .scaleLinear()
            .domain([0, domain_limit])
            .range([0, range_limit]),
           
            scaleTickFormatter = d3__namespace.format(".2f");

        this.draw_scale_bar = d3__namespace
          .axisTop()
          .scale(scale)
          .tickFormat(function(d) {
            if (d === 0) {
              return "";
            }
            return scaleTickFormatter(d);
          });

        if (this.radial()) {
          this.draw_scale_bar.tickValues([domain_limit]);
        } else {
          let round = function(x, n) {
            return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
          };

          let my_ticks = scale.ticks();
          my_ticks = my_ticks.length > 1 ? my_ticks[1] : my_ticks[0];

          this.draw_scale_bar.ticks(
            Math.min(
              10,
              round(
                range_limit /
                  (this.shown_font_size *
                    scaleTickFormatter(my_ticks).length *
                    2),
                0
              )
            )
          );
        }
      } else {
        this.draw_scale_bar = null;
      }

      return this;
    }

    /**
     * Get or set spacing in the x-direction.
     *
     * @param {Number} attr (Optional), the new spacing value if setting.
     * @param {Boolean} skip_render (Optional), whether or not a refresh should be performed.
     * @returns The current ``spacing_x`` value if getting, or the current ``phylotree`` if setting.
     */
    spacing_x(attr, skip_render) {
      if (!arguments.length) return this.fixed_width[0];

      if (
        this.fixed_width[0] != attr &&
        attr >= this.options["minimum-per-node-spacing"] &&
        attr <= this.options["maximum-per-node-spacing"]
      ) {
        this.fixed_width[0] = attr;
        if (!skip_render) {
          this.placenodes();
        }
      }

      return this;
    }

    /**
     * Get or set spacing in the y-direction.
     *
     * @param {Number} attr (Optional), the new spacing value if setting.
     * @param {Boolean} skip_render (Optional), whether or not a refresh should be performed.
     * @returns The current ``spacing_y`` value if getting, or the current ``phylotree`` if setting.
     */
    spacing_y(attr, skip_render) {
      if (!arguments.length) return this.fixed_width[1];

      if (
        this.fixed_width[1] != attr &&
        attr >= this.options["minimum-per-level-spacing"] &&
        attr <= this.options["maximum-per-level-spacing"]
      ) {
        this.fixed_width[1] = attr;
        if (!skip_render) {
          this.placenodes();
        }
      }
      return this;
    }

    _label_width(_font_size) {
      _font_size = _font_size || this.shown_font_size;
      let width = 0;

      this.phylotree.nodes
        .descendants()
        .filter(nodeVisible)
        .forEach(node => {
          let node_width = 12 + this._nodeLabel(node).length * _font_size * 0.8;

          if (node.angle !== null) {
            node_width *= Math.max(
              Math.abs(Math.cos(node.angle)),
              Math.abs(Math.sin(node.angle))
            );
          }
          width = Math.max(node_width, width);
        });

      return width;
    }

    /**
     * Get or set font size.
     *
     * @param {Function} attr Empty if getting, or new font size if setting.
     * @returns The current ``font_size`` accessor if getting, or the current ``phylotree`` if setting.
     */
    font_size(attr) {
      if (!arguments.length) return this.font_size;
      this.font_size = attr === undefined ? 12 : attr;
      return this;
    }

    scale_bar_font_size(attr) {
      if (!arguments.length) return this.scale_bar_font_size;
      this.scale_bar_font_size = attr === undefined ? 12 : attr;
      return this;
    }

    node_circle_size(attr, attr2) {
      if (!arguments.length) return this.options["node_circle_size"];
      this.options["node_circle_size"] = constant(attr === undefined ? 3 : attr);
      return this;
    }

    css(opt) {
      if (arguments.length === 0) return this.css_classes;

      if (arguments.length > 2) {
        var arg = {};
        arg[opt[0]] = opt[1];
        return this.css(arg);
      }

      for (var key in css_classes) {
        if (key in opt && opt[key] != css_classes[key]) {
          css_classes[key] = opt[key];
        }
      }

      return this;
    }

    transitions(arg) {
      if (arg !== undefined) {
        return arg;
      }

      if (this.options["transitions"] !== null) {
        return this.options["transitions"];
      }

      return this.phylotree.nodes.descendants().length <= 300;
    }

    /**
     * Get or set CSS classes.
     *
     * @param {Object} opt Keys are the CSS class to toggle and values are
     * the parameters for that CSS class.
     * @param {Boolean} run_update (optional) Whether or not the tree should update.
     * @returns The current ``phylotree``.
     */
    css_classes(opt, run_update) {
      if (!arguments.length) return this.css_classes;

      let do_update = false;

      for (var key in css_classes) {
        if (key in opt && opt[key] != this.css_classes[key]) {
          do_update = true;
          this.css_classes[key] = opt[key];
        }
      }

      if (run_update && do_update) {
        this.layout();
      }

      return this;
    }

    /**
     * Lay out the tree within the SVG.
     *
     * @param {Boolean} transitions Specify whether or not transitions should occur.
     * @returns The current ``phylotree``.
     */
    layout(transitions) {
      if (this.svg) {
        this.svg.selectAll(
          "." +
            this.css_classes["tree-container"] +
            ",." +
            this.css_classes["tree-scale-bar"] +
            ",." +
            this.css_classes["tree-selection-brush"]
        );

        //.remove();
        this.d3PhylotreeTriggerLayout(this);
        return this.update();
      }

      this.d3PhylotreeTriggerLayout(this);
      return this;
    }

    handle_node_click(node, event) {
      this.nodeDropdownMenu(node, this.container, this, this.options, event);
    }

    refresh() {
      if (this.svg) {
        // for re-entrancy
        let enclosure = this.svg.selectAll(
          "." + this.css_classes["tree-container"]
        );

        let edges = enclosure
          .selectAll(edgeCssSelectors(this.css_classes))
          .attr("class", this.reclassEdge.bind(this));

        if (this.edge_styler) {
          edges.each(d => {
            this.edge_styler(d3__namespace.select(this), d);
          });
        }

        //let nodes = this.enclosure
        //  .selectAll(inspector.nodeCssSelectors(this.css_classes))
        //  .attr("class", this.phylotree.reclassNode);

        //if (this.node_styler) {
        //  nodes.each(function(d) {
        //    this.node_styler(d3.select(this), d);
        //  });
        //}
      }

      return this;
    }

    countHandler(attr) {
      if (!arguments.length) return this.count_listener_handler;
      this.count_listener_handler = attr;
      return this;
    }

    /**
     * Get or set node styler. If setting, pass a function of two arguments,
     * ``element`` and ``data``. ``data`` exposes the underlying node so that
     * its attributes can be referenced. These can be used to apply styles to
     * ``element``, which will be a D3 selection corresponding to the SVG element
     * that makes up the current node.
     * ``transition`` is the third argument which indicates that there is an ongoing
     * d3 transition in progress
     *
     * @param {Function} attr - Optional; if setting, the node styler function to be set.
     * @returns The ``node_styler`` function if getting, or the current ``phylotree`` if setting.
     */
    style_nodes(attr) {
      if (!arguments.length) return this.node_styler;
      this.node_styler = attr;
      return this;
    }

    /**
     * Get or set edge styler. If setting, pass a function of two arguments,
     * ``element`` and ``data``. ``data`` exposes the underlying edge so that
     * its attributes can be referenced. These can be used to apply styles to
     * ``element``, which will be a D3 selection corresponding to the SVG element
     * that makes up the current edge.
     *
     * Note that, in accordance with the D3 hierarchy layout, edges will have
     * a ``source`` and ``target`` field, corresponding to the nodes that make up
     * up the associated branch.
     *
     * @param {Function} attr - Optional; if setting, the node styler function to be set.
     * @returns The ``edge_styler`` function if getting, or the current ``phylotree`` if setting.
     */
    style_edges(attr) {
      if (!arguments.length) return this.edge_styler;
      this.edge_styler = attr.bind(this);
      return this;
    }

    itemSelected(item, tag) {
      return item[tag] || false;
    }

    show() {
      return this.svg.node()
    }

  }

  ___namespace.extend(TreeRender.prototype, clades);
  ___namespace.extend(TreeRender.prototype, render_nodes);
  ___namespace.extend(TreeRender.prototype, render_edges);
  ___namespace.extend(TreeRender.prototype, events);
  ___namespace.extend(TreeRender.prototype, menus);
  ___namespace.extend(TreeRender.prototype, opt);

  function resortChildren(comparator, start_node, filter) {
    // ascending
    this.nodes
      .sum(function (d) {
        return d.value;
      })
      .sort(comparator);

    // if a tree is rendered in the DOM
    if (this.display) {
      this.display.update_layout(this.nodes);
      this.display.update();
    }

    return this;
  }

  /**
   * Return most recent common ancestor of a pair of nodes.
   * @returns An array of strings, comprising each tag that was read.
   */
  function mrca(mrca_nodes) {
    var mrca;

    mrca_nodes = mrca_nodes.map(function (mrca_node) {
      return typeof mrca_node == "string" ? mrca_node : mrca_node.data.name;
    });

    this.traverse_and_compute(function (node) {
      if (!node.children) {
        node.data.mrca = ___namespace.intersection([node.data.name], mrca_nodes);
      } else if (!node.parent) {
        if (!mrca) {
          mrca = node;
        }
      } else {
        node.data.mrca = ___namespace.union(
          ...node.descendants().map((child) => child.data.mrca)
        );
        if (!mrca && node.data.mrca.length == mrca_nodes.length) {
          mrca = node;
        }
      }
    });

    return mrca;
  }

  /**
   * An instance of a phylotree. Sets event listeners, parses tags, and creates links
   * that represent branches.
   *
   * @param {Object} nwk - A Newick string, PhyloXML string, or hierarchical JSON representation of a phylogenetic tree.
   * @param {Object} options
   * - boostrap_values
   * - type - format type
   * @returns {Phylotree} phylotree - itself, following the builder pattern.
   */
  let Phylotree = class {
    constructor(nwk, options = {}) {
      this.newick_string = "";

      this.nodes = [];
      this.links = [];
      this.parsed_tags = [];
      this.partitions = [];
      this.branch_length_accessor = defBranchLengthAccessor;
      this.branch_length = defBranchLengthAccessor;
      this.logger = options.logger || console;
      this.selection_attribute_name = "selected";

      // initialization
      var type = options.type || undefined,
        _node_data = [],
        self = this;

      // If the type is a string, check the parser_registry
      if (___namespace.isString(type)) {
        if (type in format_registry) {
          _node_data = format_registry[type](nwk, options);
        } else {
          // Hard failure
          self.logger.error(
            "type " +
              type +
              " not in registry! Available types are " +
              ___namespace.keys(format_registry)
          );
        }
      } else if (___namespace.isFunction(type)) {
        // If the type is a function, try executing the function
        try {
          _node_data = type(nwk, options);
        } catch (e) {
          // Hard failure
          self.logger.error("Could not parse custom format!");
        }
      } else {
        // this builds children and links;
        if (nwk.name == "root") {
          // already parsed by phylotree.js
          _node_data = { json: nwk, error: null };
        } else if (typeof nwk != "string") {
          // old default
          _node_data = nwk;
        } else if (nwk.contentType == "application/xml") {
          // xml
          _node_data = phyloxml_parser(nwk);
        } else {
          // newick string
          this.newick_string = nwk;
          _node_data = newickParser(nwk, options);
        }
      }

      if (!_node_data["json"]) {
        self.nodes = [];
      } else {
        self.nodes = d3__namespace.hierarchy(_node_data.json);

        // Parse tags
        let _parsed_tags = {};

        self.nodes.each((node) => {
          if (node.data.annotation) {
            _parsed_tags[node.data.annotation] = true;
          }
        });

        self.parsed_tags = Object.keys(_parsed_tags);
      }

      self.links = self.nodes.links();

      // If no branch lengths are supplied, set all to 1
      if (!this.hasBranchLengths()) {
        console.warn(
          "Phylotree User Warning : NO BRANCH LENGTHS DETECTED, SETTING ALL LENGTHS TO 1"
        );
        this.setBranchLength((x) => 1);
      }

      return self;
    }

    /*
      Export the nodes of the tree with all local keys to JSON
      The return will be an array of nodes in the specified traversal_type
      ('post-order' : default, 'pre-order', or 'in-order')
      with parents and children referring to indices in that array

    */
    json(traversal_type) {
      var index = 0;

      this.traverse_and_compute(function (n) {
        n.json_export_index = index++;
      }, traversal_type);

      var node_array = new Array(index);

      index = 0;

      this.traverse_and_compute(function (n) {
        let node_copy = ___namespace.clone(n);
        delete node_copy.json_export_index;

        if (n.parent) {
          node_copy.parent = n.parent.json_export_index;
        }

        if (n.children) {
          node_copy.children = ___namespace.map(n.children, function (c) {
            return c.json_export_index;
          });
        }
        node_array[index++] = node_copy;
      }, traversal_type);

      this.traverse_and_compute(function (n) {
        delete n.json_export_index;
      }, traversal_type);

      return JSON.stringify(node_array);
    }

    /*
     * Traverse the tree in a prescribed order, and compute a value at each node.
     *
     * @param {Function} callback A function to be called on each node.
     * @param {String} traversal_type Either ``"pre-order"`` or ``"post-order"`` or ``"in-order"``.
     * @param {Node} root_node start traversal here, if provided, otherwise start at root
     * @param {Function} backtrack ; if provided, then at each node n, backtrack (n) will be called,
                                     and if it returns TRUE, traversal will NOT continue past into this
                                     node and its children
     */
    traverse_and_compute(callback, traversal_type, root_node, backtrack) {
      traversal_type = traversal_type || "post-order";

      function post_order(node) {
        if (___namespace.isUndefined(node)) {
          return;
        }

        postOrder(node, callback, backtrack);
      }

      function pre_order(node) {
        preOrder(node, callback, backtrack);
      }

      function in_order(node) {
        inOrder(node, callback, backtrack);
      }

      if (traversal_type == "pre-order") {
        traversal_type = pre_order;
      } else {
        if (traversal_type == "in-order") {
          traversal_type = in_order;
        } else {
          traversal_type = post_order;
        }
      }

      traversal_type(root_node ? root_node : this.nodes);

      return this;
    }

    get_parsed_tags() {
      return this.parsed_tags;
    }

    update(json) {
      // update with new hiearchy layout
      this.nodes = json;
    }

    // Warning : Requires DOM!
    render(options) {
      this.display = new TreeRender(this, options);
      return this.display;
    }
  };

  Phylotree.prototype.isLeafNode = isLeafNode;
  Phylotree.prototype.selectAllDescendants = selectAllDescendants$1;
  Phylotree.prototype.mrca = mrca;
  Phylotree.prototype.hasBranchLengths = hasBranchLengths;
  Phylotree.prototype.getBranchLengths = getBranchLengths;
  Phylotree.prototype.branchName = branchName;
  Phylotree.prototype.normalizeBranchLengths = normalize;
  Phylotree.prototype.scaleBranchLengths = scale;
  Phylotree.prototype.getNewick = getNewick;
  Phylotree.prototype.resortChildren = resortChildren;
  Phylotree.prototype.setBranchLength = setBranchLength;
  Phylotree.prototype.maxParsimony = maxParsimony;

  Phylotree.prototype.getTipLengths = getTipLengths;
  Phylotree.prototype.leftChildRightSibling = leftChildRightSibling;

  ___namespace.extend(Phylotree.prototype, node_operations);
  ___namespace.extend(Phylotree.prototype, rooting);
  ___namespace.extend(Phylotree.prototype, nexus);

  /*
   *  given a tree, this function will compute quantities required to work with 
   *  all v all pairwise distances (like in COT) 
   *
   *  @param   tree the tree object
   *  @returns leaf count
   *
   */
  function computePairwiseDistances(tree) {
    /*
     *    traverse the tree and populate the following values in each node
     *        
     *        .cot_computed_length -> for each node (except the root), the current branch length 
     *                                (so as to not compute them each time via a callback) 
     *        .cot_leaf_index      -> post_order traversal order of a leaf (0 to number of leaves - 1)
     *        
     *        for each node
     *        
     *        .cot_path_to_leaves_below   
     *                             -> a dictionary that maps a leaf index to the total path length from this node
     *                                to each of the descendant leaves, EXCLUDING the length of this branch
     *
     *        .cot_path_to_leaves_above   
     *                             -> a dictionary that maps a leaf index to the total path length from this node
     *                                to each of the leaves outside the split defined by this node, EXCLUDING
     *                                the length of this branch
     */

    var bl = tree.branch_length_accessor;

    if (!bl) {
      throw "A non-null branch lengths accessor function is required for this operation";
    }

    var leaf_count = 0;

    tree.traverse_and_compute(function(n) {
      n.cot_computed_length = bl(n);

   
      if (n.parent && ___namespace.isUndefined(n.cot_computed_length)) {
        throw "Non-null branch lengths are required for this operation: missing branch length at node " + n.data.name;
      }

      if (tree.isLeafNode(n)) {
        n.cot_leaf_index = leaf_count++;
        n.cot_path_to_leaves_below = {};
        n.cot_path_to_leaves_below[n.cot_leaf_index] = 0;
        n.cot_path_to_leaves_above = {};
      } else {
        n.cot_path_to_leaves_below = {};
        n.cot_path_to_leaves_above = {};
      }
    });

    // populate all cot_path_to_leaves_below
    tree.traverse_and_compute(function(n) {
      if (n.parent) {
        ___namespace.each(n.cot_path_to_leaves_below, function(length_so_far, leaf_index) {
          n.parent.cot_path_to_leaves_below[leaf_index] =
            length_so_far + n.cot_computed_length;
        });
      }
    });

    // populate all cot_path_to_leaves_above; this is done via a 'pre-order' traversal
    // handle root node first
    var root_node = tree.getRootNode();

    function CopyFromSiblings(a_node) {
      for (var this_node = 0; this_node < a_node.children.length; this_node++) {
        for (
          var other_node = 0;
          other_node < a_node.children.length;
          other_node++
        ) {
          if (this_node != other_node) {
            ___namespace.each(a_node.children[other_node].cot_path_to_leaves_below, function(
              length,
              index
            ) {
              if (a_node.children[this_node].cot_path_to_leaves_above) {
                a_node.children[this_node].cot_path_to_leaves_above[index] =
                  length + a_node.children[other_node].cot_computed_length;
              }
            });
          }
        }
      }
    }

    CopyFromSiblings(root_node);

    // takes two passes

    tree.traverse_and_compute(function(n) {
      if (n.parent) {
        // copy parent's 'above' nodes
        ___namespace.each(n.parent.cot_path_to_leaves_above, function(
          length_so_far,
          leaf_index
        ) {
          n.cot_path_to_leaves_above[leaf_index] =
            length_so_far + n.parent.cot_computed_length;
        });

        if (!tree.isLeafNode(n)) {
          CopyFromSiblings(n);
        }
        // copy sibling's 'below' nodes
      }
    }, "pre-order");

    return leaf_count;
  }

  /*
   * The Sackin's index is computed as the sum of the number of ancestors for each
   * tips of the tree.
   *
   * The less balanced a tree is, the larger its Sackin's index.
   *
   */

  function sackin(tree) {

    // Get tips of tree
    let tips = tree.getTips();

    // Count number of ancestors to root for each tree
    let depths = ___namespace.map(tips, d => { return d.depth });

    return ___namespace.reduce(depths, function(memo, num){ return memo + num; }, 0);

  }

  function centerOfTree(tree, power) {
    power = power || 2;

    var leaf_count = computePairwiseDistances(tree);

    var current_min = Number.MAX_VALUE,
      current_split = 0,
      current_location = null;

    if (power == 2) {
      tree.traverse_and_compute(function(n) {
        if (n.parent) {
          // can't consider the root
          var sum_below = 0,
            sum_below_squared = 0,
            sum_above = 0,
            sum_above_squared = 0;

          var count_below = 0;

          ___namespace.each(n.cot_path_to_leaves_below, function(l) {
            sum_below += l;
            sum_below_squared += l * l;
            count_below++;
          });

          ___namespace.each(n.cot_path_to_leaves_above, function(l) {
            sum_above += l;
            sum_above_squared += l * l;
          });

          var count_above = leaf_count - count_below;

          var tt =
            (sum_above - sum_below + n.cot_computed_length * count_above) /
            leaf_count;
          if (tt < 0) {
            tt = 0;
          } else if (tt > n.cot_computed_length) {
            tt = n.cot_computed_length;
          }

          var score =
            sum_above_squared +
            sum_below_squared +
            2 * (sum_above * (n.cot_computed_length - tt) + sum_below * tt) +
            count_below * tt * tt +
            (n.cot_computed_length - tt) *
              (n.cot_computed_length - tt) *
              count_above;

          if (score < current_min) {
            current_location = n;
            current_split = tt / n.cot_computed_length; //n.cot_computed_length-tt;//1 - tt / n.cot_computed_length;
            current_min = score;
          }

          delete n.cot_computed_length;
          delete n.cot_path_to_leaves_below;
          delete n.cot_path_to_leaves_above;
          delete n.cot_leaf_index;
        }
      });
    } else {
      // in the general case try a simple grid optimization
      tree.traverse_and_compute(function(n) {
        if (n.parent) {
          // can't consider the root

          var optimization_step =
              n.cot_computed_length > 0.0 ? n.cot_computed_length * 0.05 : 0.1,
            current_t = 0;

          while (current_t < n.cot_computed_length) {
            var score = 0.0;

            ___namespace.each(n.cot_path_to_leaves_below, function(l) {
              score += Math.pow(l + current_t, power);
            });

            ___namespace.each(n.cot_path_to_leaves_above, function(l) {
              score += Math.pow(l + (n.cot_computed_length - current_t), power);
            });

            if (score < current_min) {
              current_location = n;
              current_split = current_t / n.cot_computed_length; //n.cot_computed_length-tt;//1 - tt / n.cot_computed_length;
              current_min = score;
            }
            current_t += optimization_step;
          }
        }
      });
    }

    return {
      location: current_location,
      breakpoint: current_split,
      distance: current_min
    };
  }

  /**
   * Compute midpoint of a phylogenetic tree
   * 
   * @param {Object} tree -- the phylotree.js tree object 
   * @return {Object} the calculated midpoint to root on
   *  { location: root_node, breakpoint: 0 }
   *
   */
  function computeMidpoint(tree) {
    if (!tree.hasBranchLengths()) {
      throw "Center of tree calculation cannot be performed on trees that do not have fully specified branch lengths";
    }

    var bl = tree.branch_length;

    tree.traverse_and_compute(function(node) {
      if (node.parent) {
        var my_longest_path_length = bl(node);
        var my_longest_path_terminus;

        if (tree.isLeafNode(node)) {
          my_longest_path_terminus = node;
          node.max_path = 0;
          node.max_path_terminus = node;
        } else {
          my_longest_path_length += node.max_path;
          my_longest_path_terminus = node.max_path_terminus;
        }

        if (
          !node.parent.max_path ||
          node.parent.max_path < my_longest_path_length
        ) {
          node.parent.max_path = my_longest_path_length;
          node.parent.max_path_terminus = my_longest_path_terminus;
        }
      }
    });

    var root_node = tree.getRootNode();
    var longest_path_length = 0;

    root_node.children.forEach(function(root_child) {
      if (root_child.max_path_terminus !== root_node.max_path_terminus) {
        var pl = root_child.max_path + bl(root_child);
        if (pl >= longest_path_length) {
          longest_path_length = pl;
        }
      }
    });

    if (root_node.max_path > longest_path_length) {
      // not already midpoint rooted
      longest_path_length = (longest_path_length + root_node.max_path) * 0.5;

      // start traversing up from the deepest leaf to the root, until we find the
      // half-way point

      var root_on = root_node.max_path_terminus;

      while (true) {
        var current_bl = bl(root_on);
        //console.log (current_bl, longest_path_length);
        if (current_bl <= longest_path_length) {
          longest_path_length -= current_bl;
          root_on = root_on.parent;
        } else {
          //console.log ("Rooting on ", root_on, longest_path_length[0], current_bl);

          return {
            location: root_on,
            breakpoint: longest_path_length / current_bl
          };

          //console.log ("Longest " + root_path (tree.getNodeByName(root_node.max_path_terminus.name)));
          //console.log ("Second longest " + root_path (tree.getNodeByName(longest_path_length[1].name)));
        }
      }
    }
    return { location: root_node, breakpoint: 0 };
  }

  function annotateCopyNumber(tree) {
    tree.traverse_and_compute(function(node) {
      if (tree.isLeafNode(node)) {
        node.data.copy_number = 1;
      }
    });
  }

  // internal function used by best root fitting
  function computeRootToTipOtherRoot(
    tree,
    node,
    coming_from,
    shared_distance,
    distance_to_new_root
  ) {

    var my_bl = tree.branch_length(node);

    var go_up = false;

    if (!coming_from) {
      shared_distance = node.data.rootToTip;
      distance_to_new_root = 0;
      go_up = true;
    }

    if (node.children) {
      for (var c = 0; c < node.children.length; c++) {
        if (node.children[c] != coming_from) {
          computeRootToTipOtherRoot(
            tree,
            node.children[c],
            node,
            shared_distance,
            distance_to_new_root
          );
        } else {
          go_up = true;
        }
      }
    }

    node.data.rtta = node.data.rootToTip - shared_distance + distance_to_new_root;

    if (go_up) {
      shared_distance -= my_bl;
      distance_to_new_root += my_bl;
    }

    if (node.parent && go_up) {
      computeRootToTipOtherRoot(
        tree,
        node.parent,
        node,
        shared_distance,
        distance_to_new_root
      );
    }
  }

  function fitRootToTip(tree) {

    var linear_data = [],
      max_r2 = 0,
      best_node = 0;

    annotateCopyNumber(tree);
    rootToTip(tree);

    // To return if best node is the root already
    tree.traverse_and_compute(function(node) {
      if (tree.isLeafNode(node) && !___namespace.isNull(node.data.decimal_date_value)) {
        linear_data.push([node.data.decimal_date_value, node.data.rtta, node.data.copy_number]);
      }
    });

    let best_fit = linearFit(linear_data);

    tree.traverse_and_compute(function(node) {

      if (tree.isLeafNode(node) && !___namespace.isNull(node.data.decimal_date_value)) {

        computeRootToTipOtherRoot(tree, node, null, 0, 0);

        linear_data = [];

        tree.traverse_and_compute(function(node) {
          if (tree.isLeafNode(node) && !___namespace.isNull(node.data.decimal_date_value)) {
            linear_data.push([
              node.data.decimal_date_value,
              node.data.rtta,
              node.data.copy_number
            ]);
          }
        });

        var fit = linearFit(linear_data),
          r2 = fit["r2"];

        if (r2 > max_r2) {
          max_r2 = r2;
          best_node = node;
          best_fit = fit;
        }

      }
    });

    return { root: best_node, fit: best_fit };

  }

  // linear fit of root to tip distances
  function linearFit(data) {

    var ss = data.reduce(function(p, c) {
        return c[2] + p;
      }, 0), // sample count
      sx = data.reduce(function(p, c) {
        return c[2] * c[0] + p;
      }, 0), // sum X
      sy = data.reduce(function(p, c) {
        return c[2] * c[1] + p;
      }, 0), // sum Y
      sxoss = sx / ss,
      syoss = sy / ss;

    var fitB = 0,
      st2 = 0,
      vary = 0;

    data.forEach(function(point) {
      var t = point[0] - sxoss;
      st2 += point[2] * t * t;
      fitB += point[2] * t * point[1];
      vary += point[2] * (point[1] - syoss) * (point[1] - syoss);
    });

    fitB /= st2;

    var a = (sy - sx * fitB) / ss;

    var varres = 0;

    data.forEach(function(point) {
      var t = point[1] - a - fitB * point[0];
      varres += point[2] * t * t;
    });

    return {
      intercept: a,
      slope: fitB,
      r2: 1 - varres / vary,
      "var (intercept)": Math.sqrt((1 + sx * sx / (ss * st2)) / ss),
      "var (slope)": Math.sqrt(1 / st2)
    };
  }

  /**
   *   fast and memory efficient root to tip distance calculator
   *   for each leaf node stores the current root to tip distance in 
   *   the node.rootToTip field
   *   
   *   @param tree
   *   @return tree with rootToTip computed
   *
   */
  function rootToTip(tree) {

    var bl = tree.branch_length_accessor,
      index = 0;

    tree.traverse_and_compute(n => {
      if (n.parent) {
        n.data._computed_length = bl(n);
        if (!___namespace.isNumber(n.data._computed_length)) {
          throw "rootToTip cannot be run on trees with missing branch lengths";
        }
      }
      if (tree.isLeafNode(n)) {
        n.data.leaf_index = index++;
      }
      if ("r2t" in n.data) {
        delete n.data.r2t;
      }
    });

    tree.traverse_and_compute(n => {
      if (n.parent) {
        if (!("r2t" in n.parent.data)) {
          n.parent.data.r2t = {};
        }
        if (tree.isLeafNode(n)) {
          n.parent.data.r2t[n.data.leaf_index] = n.data._computed_length;
        } else {
          ___namespace.each(n.data.r2t, function(v, idx) {
            n.parent.data.r2t[idx] = v + n.data._computed_length;
          });
          delete n.data.r2t;
        }
        delete n.data._computed_length;
      }
    });

    var r2t = tree.getRootNode().data.r2t;

    tree.traverse_and_compute(n => {
      if (tree.isLeafNode(n)) {
        n.data.rootToTip = r2t[n.data.leaf_index] || 0;
        delete n.data.leaf_index;
      }
    });

    delete tree.getRootNode().data.r2t;

    return tree;
  }

  const default_date_converter = d3__namespace.timeParse("%Y%m%d");

  const default_regexp = /([0-9]{4}).?([0-9]{2}).?([0-9]{2})$/g;

  const default_date_getter = function(node) {
    if (isLeafNode(node)) {
      if ("name" in node) {
        let location = default_regexp.exec(node.name);
        if (location) {
          return location[1] + location[2] + location[3];
        }
      }
    }
    return null;
  };

  /*
   *  Extracts dates from nodes using a provided callback (defaults supplied),
   *  and also converts them to decimal dates; missing dates are allowed; if desired, missing dates 
   *  can throw exceptions 
   *  
   *  @param tree             : the tree object 
   *
   *  @param date_getter      : a function that extracts date strings from nodes (e.g. by parsing the name),
   *                            default is to extract from the end of the node name, using [YYYY] optional sep [MM] optional sep [DD] format;
   *                            default is implemented in phylotree_extensions.extract_dates.date_getter ()
   *                            
   *  @param date_converter   : if provided, will be used to parse the date string; default is %Y%m%d implemented in 
   *                            phylotree_extensions.extract_dates.date_converter
   *  
   *  
   *  @return tree with date-annotated nodes, i.e. each node will have
   *  
   *      n.date_value (date object, e.g. 2018-08-17); null for missing
   *      n.decimal_date_value (decimal object, e.g. 2018.72)
   *  
   */
  const extract_dates = function(tree, date_getter, date_converter=default_date_converter) {

    date_getter = date_getter || default_date_getter;
    
    tree.traverse_and_compute(function(n) {
      var d_string = date_getter(n);
      if (d_string) {
        try {
          n.data.date_value = date_converter(d_string);
          var full_year = n.data.date_value.getFullYear();
          var year_start = new Date(full_year, 0, 1),
            year_start_p1 = new Date(full_year + 1, 0, 1);

          n.data.decimal_date_value =
            full_year +
            (n.data.date_value - year_start) / (year_start_p1 - year_start);
          return;
        } catch (e) {
          // for conversion failures
        }
      }
      n.data.date_value = null;
      n.data.decimal_date_value = null;
    });

    return tree;
  };

  /**
   * Implements a linear time / space version of the Cluster picker algorithm
   * 
   * @param tree -- the tree object 
   * @param bootstrap_thresold -- value in [0,1] that sets the stringency of bootstrap support
   * @param diameter_threshold -- value >=0 that defines the maximum allowable pairwise distance in a cluster
   * @param root_node -- if specified, traverse the tree starting here (useful for only looking at parts of the tree),
   * tree root by default
   * @param missing_bootstrap_value -- if a branch is missing bootstrap support value, use this value instead
   *                   (1.0 by default)
   *                                 
   * @return an array of clusters, where cluster = 
   * \{
   *    'root'   : [root node of cluster],
   *    'members' : [list of leaf. nodes],
   *    'diameter' : max distance in the cluster,
   *    'bootstrap' : bootstrap support at the root node
   * \}                        
   */
  function clusterPicker(
    tree,
    bootstrap_threshold,
    diameter_threshold,
    root_node,
    missing_bootstrap_value
  ) {
    root_node = root_node || tree.getRootNode();
    missing_bootstrap_value = ___namespace.isNumber(missing_bootstrap_value)
      ? missing_bootstrap_value
      : 1;

    // perform a bottom-up pass of the tree
    // where each internal node will receive a floating point value
    // that stores the longest path from the internal node to any of its descendants,
    // the diameter of the cluster,  is then the sum of longest paths of all of its children
    let bl = tree.branch_length;

    // initialize member variables
    tree.traverse_and_compute(function(n) {
      if (n.parent) {
        n._computed_length = bl(n);
        if (!___namespace.isNumber(n._computed_length)) {
          throw "clusterPicker cannot be run on trees with missing branch lengths";
        }
        n.max_path_length = 0;
      }
    });

    tree.traverse_and_compute(function(n) {
      if (n.parent) {
        n.parent.max_path_length = Math.max(
          n.parent.max_path_length,
          n.max_path_length + n._computed_length
        );
      }
    });

    var clusters = [];

    tree.traverse_and_compute(___namespace.noop, "pre-order", root_node, function(n) {
      if (!tree.isLeafNode(n)) {
        var bs = ___namespace.isString(n.data.bootstrap_values)
          ? +n.data.bootstrap_values
          : missing_bootstrap_value;

        if (bs >= bootstrap_threshold) {
          var my_diameter = ___namespace.reduce(
            n.children,
            function(c, n) {
              return n.max_path_length + n._computed_length + c;
            },
            0
          );

          if (my_diameter <= diameter_threshold) {
            clusters.push({ root: n, diameter: my_diameter, bootstrap: bs });
            return true;
          }
        }
      }

      return false;
    });

    // clean up member variables
    tree.traverse_and_compute(
      function(n) {
        if (n.parent) {
          delete n._computed_length;
          delete n.max_path_length;
        }
      },
      "post-order",
      root_node
    );

    ___namespace.each(clusters, function(cluster) {
      cluster["members"] = [];
      tree.traverse_and_compute(
        function(n) {
          if (tree.isLeafNode(n)) {
            cluster["members"].push(n);
          }
        },
        "post-order",
        cluster["root"]
      );
    });

    return clusters;
  }

  function phylopart(
    tree,
    bootstrap_threshold,
    percentile_threshold,
    missing_bootstrap_value,
    resolution
  ) {
    /** TODO SLKP 20180817 : this implementation does not compute pairwise distances correctly at the moment;
     instead it computes root-to-tip distances */
    missing_bootstrap_value = ___namespace.isNumber(missing_bootstrap_value)
      ? missing_bootstrap_value
      : 1;

    var leaf_count = computePairwiseDistances(tree);

    /** first, decide on the domain of branch lengths **/

    var core_node = tree.getRootNode().children[0];

    var min_bl = Number.MAX_VALUE,
      min_bl2 = Number.MAX_VALUE;

    if (!(percentile_threshold > 0 && percentile_threshold < 1)) {
      throw "Invalid percentile threshold in perform_phylopart";
    }

    tree.traverse_and_compute(function(n) {
      if (tree.isLeafNode(n)) {
        if (n.cot_computed_length < min_bl) {
          if (min_bl < min_bl2) {
            min_bl2 = min_bl;
          }
          min_bl = n.cot_computed_length;
        } else {
          if (n.cot_computed_length < min_bl2) {
            min_bl2 = n.cot_computed_length;
          }
        }
      }
    });

    min_bl += min_bl2;

    // pairwise distances are bounded below by the sum of two shortest terminal branches

    // compute the upper bound
    var max_path_length =
      ___namespace.reduce(
        core_node.cot_path_to_leaves_below,
        function(c, n) {
          return n > c ? n : c;
        },
        0
      ) +
      ___namespace.reduce(
        core_node.cot_path_to_leaves_above,
        function(c, n) {
          return n > c ? n : c;
        },
        0
      ) +
      core_node.cot_computed_length;

    var domain = max_path_length - min_bl;

    if (___namespace.isUndefined(resolution)) {
      resolution = Math.min(1e-3, domain / 100);
    }

    var number_of_bins = ((domain / resolution) >> 0) + 1;
    if (number_of_bins > 500) {
      number_of_bins = 500;
      resolution = domain / number_of_bins;
    }

    var root_node = tree.getRootNode();

    root_node.paths_to_leaves = new Array(leaf_count);

    ___namespace.each(root_node.children, function(cn) {
      ___namespace.each(root_node.cot_path_to_leaves_below, function(v, i) {
        root_node.paths_to_leaves[i] = v + cn.cot_computed_length;
      });
    });

    tree.traverse_and_compute(function(n) {
      if (!tree.isLeafNode(n)) {
        n.histogram = new Array(number_of_bins);
        for (var i = 0; i < number_of_bins; i++) {
          n.histogram[i] = 0;
        }
        if (n.parent) {
          var index = 0;
          n.paths_to_leaves = [];
          ___namespace.each(n.cot_path_to_leaves_below, function(v, i) {
            n.paths_to_leaves[index++] = v;
          });
        }
      }
      delete n.cot_path_to_leaves_above;
      delete n.cot_path_to_leaves_below;
    });

    /**
          for each internal node, produce a histogram of pairwise distances on sequences that are defined 
          by the subtree at that node
          
          this could be approximated (I think), by merging histograms of children
      */

    tree.traverse_and_compute(function(n) {
      if (!tree.isLeafNode(n)) {
        for (var n1 = 0; n1 < n.paths_to_leaves.length; n1++) {
          for (var n2 = n1 + 1; n2 < n.paths_to_leaves.length; n2++) {
            var sum = n.paths_to_leaves[n1] + n.paths_to_leaves[n2];
            n.histogram[((sum - min_bl) / resolution) >> 0]++;
          }
        }
        n.leaf_count = n.paths_to_leaves.length;

        delete n.paths_to_leaves;
      }
    });

    // compute the percentile distance cutoff

    var total_comparisons =
      (leaf_count - 1) * leaf_count / 2 * percentile_threshold;
    var bin_i = 0;
    for (
      ;
      bin_i < number_of_bins - 1 &&
      total_comparisons > root_node.histogram[bin_i];
      bin_i++
    ) {
      total_comparisons -= root_node.histogram[bin_i];
    }

    var median_threshold =
      min_bl +
      (bin_i +
        (root_node.histogram[bin_i] - total_comparisons) /
          root_node.histogram[bin_i]) *
        resolution;

    var clusters = [];

    tree.traverse_and_compute(___namespace.noop, "pre-order", null, function(n) {
      if (!tree.isLeafNode(n)) {
        var bs = ___namespace.isString(n.data.bootstrap_values)
          ? +n.data.bootstrap_values
          : missing_bootstrap_value;
        if (bs >= bootstrap_threshold) {
          var total_comparisons = n.leaf_count * (n.leaf_count - 1) * 0.25;

          var bin_i = 0;
          for (
            ;
            bin_i < number_of_bins - 1 && total_comparisons > n.histogram[bin_i];
            bin_i++
          ) {
            total_comparisons -= n.histogram[bin_i];
          }

          var my_median =
            min_bl +
            (bin_i +
              (n.histogram[bin_i] - total_comparisons) / n.histogram[bin_i]) *
              resolution;

          if (my_median <= median_threshold) {
            clusters.push({ root: n, median: my_median, bootstrap: bs });
            return true;
          }
        }
      }
      return false;
    });

    tree.traverse_and_compute(function(n) {
      if (!tree.isLeafNode(n)) {
        if ("histogram" in n) {
          delete n.histogram;
          delete n.leaf_count;
        }
      }
    });

    ___namespace.each(clusters, function(cluster) {
      cluster["members"] = [];
      tree.traverse_and_compute(
        function(n) {
          if (tree.isLeafNode(n)) {
            cluster["members"].push(n);
          }
        },
        "post-order",
        cluster["root"]
      );
    });

    return clusters;
  }

  function parseFasta(fastaData) {


    let sfasta = ___namespace$1.split(fastaData, "\n");

    let seqs = ___namespace$1.chain(sfasta)
      .map((d, i) => (d.startsWith(">") ? i : -1))
      .filter((d) => d != -1)
      .map((d, i, c) => ___namespace$1.slice(sfasta, c[i], c[i + 1]))
      .keyBy((d) => ___namespace$1.trim(d[0], ">"))
      .mapValues((d) => ___namespace$1.tail(d).join(""))
      .value();

    return seqs;

  }

  function remove(i, D) {
    let dNew = [];

    for (let j of ___namespace$1.range(D.length)) {
      if (j != i) {
        let dNewRow = [];
        for (let k of ___namespace$1.range(D[j].length)) {
          if (k != i) {
            dNewRow.push(D[j][k]);
          }
        }
        dNew.push(dNewRow);
      }
    }

    return dNew;
  }

  function getDPrime(distanceMatrix, totalDistances, N) {
    let DPrime = ___namespace$1.chunk(___namespace$1.fill(Array(N * N), 0), N);
    for (let i of ___namespace$1.range(N)) {
      for (let j of ___namespace$1.range(___namespace$1.parseInt(i) + 1, N)) {
        DPrime[i][j] =
          (N - 2) * distanceMatrix[i][j] - totalDistances[i] - totalDistances[j];
        DPrime[j][i] = DPrime[i][j];
      }
    }
    return DPrime;
  }

  function ijMinDPrime(dPrime, N) {
    let i = -1;
    let j = -1;
    let minD = Infinity;
    for (let ii of ___namespace$1.range(N)) {
      for (let jj of ___namespace$1.range(i, N)) {
        if (dPrime[ii][jj] < minD) {
          i = ii;
          j = jj;
          minD = dPrime[i][j];
        }
      }
    }
    return [i, j, minD];
  }

  function createDelta(totalDistances, N) {
    let deltaMatrix = ___namespace$1.chunk(Array(N * N), N);

    for (let i of ___namespace$1.range(N)) {
      for (let j of ___namespace$1.range(parseInt(i) + 1, N)) {
        deltaMatrix[i][j] = (totalDistances[i] - totalDistances[j]) / (N - 2);
        deltaMatrix[j][i] = deltaMatrix[i][j];
      }
    }

    return deltaMatrix;
  }

  function getDistanceMatrix(seqs) {
    // Gaps are masked

    let initKey = ___namespace$1.keys(seqs)[0];
    let seqLength = seqs[initKey].length;

    return ___namespace$1.mapValues(seqs, (seq) =>
      ___namespace$1.map(seqs, (seq2) =>
        ___namespace$1.sum(
          ___namespace$1.map(
            ___namespace$1.range(seqLength),
            (i) => seq[i] != seq2[i] && seq[i] != "-" && seq2[i] != "-"
          )
        )
      )
    );
  }

  function getTotalDistances(distanceMatrix) {
    return ___namespace$1.map(distanceMatrix, ___namespace$1.sum);
  }

  /**
   * Create a neighbor joining tree from a distance matrix
   * See test/neighbor-join-test.js for a working example
   *
   * @param {Array} distanceMatrixArr The NxN distance matrix.
   *	const D = [
   *			[0,  5,  9,  9, 8],
   *			[5,  0, 10, 10, 9],
   *			[9, 10,  0,  8, 7],
   *			[9, 10,  8,  0, 3],
   *			[8,  9,  7,  3, 0]
   * 	];
   * 
   * @param {Number} n The dimension of the distanceMatrixArr.
   * @param {Array} nodeList The names of each row in the distanceMatrix
   * @returns The neighbor joining new tree.
   */
  function neighborJoining(distanceMatrixArr, n, nodeList) {
    if (n <= 2) {
      let tree = new Phylotree("");

      //T.link(nodeList[0],nodeList[1],D[0][1])

      let newNode = tree.getNodes();
      // Get root
      let distance = distanceMatrixArr[0][1] / 2;

      let nodeA = tree.createNode(nodeList[0], [null, [distance]]);
      let nodeB = tree.createNode(nodeList[1], [null, [distance]]);

      //// Add the children to the newly created node
      tree.addChild(newNode, nodeA);
      tree.addChild(newNode, nodeB);

      return tree;
    } else {
      let N = n;
      let totalDistances = getTotalDistances(distanceMatrixArr);
      let dPrime = getDPrime(distanceMatrixArr, totalDistances, N);
      let [i, j, minD] = ijMinDPrime(dPrime, N);
      let deltaMatrix = createDelta(totalDistances, N);
      let limbLengthI = (distanceMatrixArr[i][j] + deltaMatrix[i][j]) / 2;
      let limbLengthJ = (distanceMatrixArr[i][j] - deltaMatrix[i][j]) / 2;
      let newRow = ___namespace$1.concat(
        0,
        ___namespace$1.filter(
          ___namespace$1.map(___namespace$1.range(n), (k) => {
            if (k != i && k != j) {
              return (
                0.5 *
                (distanceMatrixArr[k][i] +
                  distanceMatrixArr[k][j] -
                  distanceMatrixArr[i][j])
              );
            }
          }),
          ___namespace$1.isNumber
        )
      );

      let nodeI = nodeList[i];
      let nodeJ = nodeList[j];

      // Get all nodes of type InternalNode{x} and increment number.
      // If there are none, start with InternalNode0
      let m = "InternalNode0";
      let internalNodes = ___namespace$1.filter(nodeList, (x) =>
        ___namespace$1.includes(x, "InternalNode")
      );

      if (internalNodes.length) {
        let highestNum = ___namespace$1.max(
          ___namespace$1.map(internalNodes, (label) => ___namespace$1.split(label, "InternalNode")[1])
        );
        m = "InternalNode" + ++highestNum;
      }

      nodeList.unshift(m);

      distanceMatrixArr = remove(___namespace$1.max([i, j]), distanceMatrixArr);
      distanceMatrixArr = remove(___namespace$1.min([i, j]), distanceMatrixArr);

      distanceMatrixArr.unshift(newRow);

      ___namespace$1.each(___namespace$1.range(1, n - 1), (l) => distanceMatrixArr[l].unshift(newRow[l]));

      // Remove from nodeList
      ___namespace$1.remove(nodeList, (n) => n == nodeI || n == nodeJ);
      let tree = neighborJoining(distanceMatrixArr, N - 1, nodeList);

      let treeNodeI = tree.createNode(nodeI, [null, [limbLengthI]]);
      let treeNodeJ = tree.createNode(nodeJ, [null, [limbLengthJ]]);

      // If the node doesn't exist, create. Otherwise, reassign the length
      if (tree.getNodeByName(m)) {
        let internalNode = tree.getNodeByName(m);
        tree.addChild(internalNode, treeNodeI);
        tree.addChild(internalNode, treeNodeJ);
      } else {
        let newNode = tree.createNode(m, [null, [0]]);
        tree.addChild(tree.getNodes(), newNode);
        // Add the children to the newly created node
        tree.addChild(newNode, treeNodeI);
        tree.addChild(newNode, treeNodeJ);
      }

      // Set negative to 0 and add distance to other limblength
      return tree;
    }
  }

  exports.centerOfTree = centerOfTree;
  exports.clusterPicker = clusterPicker;
  exports.computeMidpoint = computeMidpoint;
  exports.extract_dates = extract_dates;
  exports.fitRootToTip = fitRootToTip;
  exports.getDistanceMatrix = getDistanceMatrix;
  exports.getNewick = getNewick;
  exports.inOrder = inOrder;
  exports.leftChildRightSibling = leftChildRightSibling;
  exports.loadAnnotations = loadAnnotations;
  exports.neighborJoining = neighborJoining;
  exports.newickParser = newickParser;
  exports.pairwise_distances = computePairwiseDistances;
  exports.parseAnnotations = parseAnnotations;
  exports.parseFasta = parseFasta;
  exports.phylopart = phylopart;
  exports.phylotree = Phylotree;
  exports.postOrder = postOrder;
  exports.preOrder = preOrder;
  exports.rootToTip = rootToTip;
  exports.sackin = sackin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=phylotree.js.map
