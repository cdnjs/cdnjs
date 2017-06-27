;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  var _fixedNodesIndex = new sigma.utils.map();

  /**
   * Sigma Graph Helpers
   * =============================
   *
   * @author Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * @version 0.2
   */

  /**
   * Attach methods to the graph to keep indexes updated.
   * ------------------
   */

  // Index the node after its insertion in the graph if `n.fixed` is `true`.
  sigma.classes.graph.attach(
    'addNode',
    'sigma.helpers.graph.addNode',
    function(n) {
      if (n.fixed) {
        _fixedNodesIndex.set(n.id, this.nodesIndex.get(n.id));
      }
    }
  );

  // Deindex the node before its deletion from the graph.
  sigma.classes.graph.attachBefore(
    'dropNode',
    'sigma.helpers.graph.dropNode',
    function(id) {
      _fixedNodesIndex.delete(id);
    }
  );

  // Deindex all nodes before the graph is cleared.
  sigma.classes.graph.attachBefore(
    'clear',
    'sigma.helpers.graph.clear',
    function() {
      _fixedNodesIndex.clear();
      _fixedNodesIndex = new sigma.utils.map();
    }
  );

  /**
   * This methods will set the value of `fixed` to `true` on a specified node.
   *
   * @param {string}     The node id.
   */
  if (!sigma.classes.graph.hasMethod('fixNode'))
    sigma.classes.graph.addMethod('fixNode', function(id) {
      if (this.nodesIndex.get(id)) {
        this.nodesIndex.get(id).fixed = true;
        _fixedNodesIndex.set(id, this.nodesIndex.get(id));
      }
      return this;
    });

  /**
   * This methods will set the value of `fixed` to `false` on a specified node.
   *
   * @param {string}     The node id.
   */
  if (!sigma.classes.graph.hasMethod('unfixNode'))
    sigma.classes.graph.addMethod('unfixNode', function(id) {
      if (this.nodesIndex.get(id)) {
        this.nodesIndex.get(id).fixed = undefined;
        _fixedNodesIndex.delete(id);
      }
      return this;
    });

  /**
   * This methods returns the list of fixed nodes.
   *
   * @return {array}     The array of fixed nodes.
   */
  if (!sigma.classes.graph.hasMethod('getFixedNodes'))
    sigma.classes.graph.addMethod('getFixedNodes', function() {
      var nodes = [];
      _fixedNodesIndex.forEach(function(n, id) {
        nodes.push(n);
      });
      return nodes;
    });

  /**
   * This methods returns true if fixed nodes exist.
   *
   * @return {boolean}
   */
  if (!sigma.classes.graph.hasMethod('hasFixedNodes'))
    sigma.classes.graph.addMethod('hasFixedNodes', function() {
      return _fixedNodesIndex.size != 0;
    });


  /**
   * This methods drops a set of nodes from the graph.
   *
   * @param  {string|array} v One id, or an array of ids.
   * @return {sigma.graph}    The instance itself.
   */
  if (!sigma.classes.graph.hasMethod('dropNodes'))
    sigma.classes.graph.addMethod('dropNodes', function(v) {
      if (arguments.length > 1)
        throw new Error('Too many arguments. Use an array instead.');

      if (typeof v === 'string' || typeof v === 'number')
        this.dropNode(v);

      else if (Array.isArray(v)) {
        var i, l;
        for (i = 0, l = v.length; i < l; i++)
          if (typeof v[i] === 'string' || typeof v[i] === 'number')
            this.dropNode(v[i]);
          else
            throw new TypeError('Invalid argument: a node id is not a string or a number, was ' + v[i]);
      }
      else
        throw new TypeError('Invalid argument: "v" is not a string, a number, or an array, was ' + v);

      return this;
    });

  /**
   * This methods drops a set of edges from the graph.
   *
   * @param  {string|array} v One id, or an array of ids.
   * @return {sigma.graph}    The instance itself.
   */
  if (!sigma.classes.graph.hasMethod('dropEdges'))
    sigma.classes.graph.addMethod('dropEdges', function(v) {
      if (arguments.length > 1)
        throw new Error('Too many arguments. Use an array instead.');

      if (typeof v === 'string' || typeof v === 'number')
        this.dropEdge(v);

      else if (Array.isArray(v)) {
        var i, l;
        for (i = 0, l = v.length; i < l; i++)
          if (typeof v[i] === 'string' || typeof v[i] === 'number')
            this.dropEdge(v[i]);
          else
            throw new TypeError('Invalid argument: an edge id is not a string or a number, was ' + v[i]);
      }
      else
        throw new TypeError('Invalid argument: it is not a string, a number, or an array, was ' + v);

      return this;
    });

  /**
   * This methods returns an array of nodes that are adjacent to a node.
   *
   * @param  {number|string} id    The node id.
   * @param  {?object}  options:
   *         {?boolean} withHidden Get not hidden nodes if set false, all
   *                               nodes otherwise.
   * @return {array}               The array of adjacent nodes.
   */
  if (!sigma.classes.graph.hasMethod('adjacentNodes'))
    sigma.classes.graph.addMethod('adjacentNodes', function(id, options) {
      options = options || {};
      options.withHidden = (arguments.length == 2) ? options.withHidden : true;


      if (typeof id !== 'string' && typeof id !== 'number')
        throw new TypeError('The node id is not a string or a number, was ' + id);

      var self = this,
          target,
          edgeNotHidden,
          nodes = [];
      (this.allNeighborsIndex.get(id) || []).forEach(function(map, target) {
        if (options.withHidden) {
          nodes.push(self.nodesIndex.get(target));
        }
        else if (!self.nodes(target).hidden) {
          // check if at least one non-hidden edge exists
          // between the node and the target node:
          edgeNotHidden =
            self.allNeighborsIndex.get(id).get(target).keyList().map(function(eid) {
              return self.edges(eid);
            })
            .filter(function(e) {
              return !e.hidden;
            })
            .length != 0;

          if (edgeNotHidden) {
            nodes.push(self.nodesIndex.get(target));
          }
        }
      });

      return nodes;
    });

  /**
   * This methods returns an array of edges that are adjacent to a node.
   *
   * @param  {number|string} id    The node id.
   * @param  {?object}  options:
   *         {?boolean} withHidden Get not hidden nodes if set false, all
   *                               nodes otherwise.
   * @return {array}               The array of adjacent edges.
   */
  if (!sigma.classes.graph.hasMethod('adjacentEdges'))
    sigma.classes.graph.addMethod('adjacentEdges', function(id, options) {
      options = options || {};
      options.withHidden = (arguments.length == 2) ? options.withHidden : true;


      if (typeof id !== 'string' && typeof id !== 'number')
        throw new TypeError('The node id is not a string or a number, was ' + id);

      var self = this,
          a = this.allNeighborsIndex.get(id) || [],
          eid,
          edges = [];

      a.forEach(function(map, target) {
        a.get(target).forEach(function(map2, eid) {
          if (options.withHidden || !self.edges(eid).hidden) {
            edges.push(self.edges(eid));
          }
        });
      });

      return edges;
    });

}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma GEXF File Exporter
   * ================================
   *
   * The aim of this plugin is to enable users to retrieve a GEXF file of the
   * graph.
   *
   * Author: Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * Thanks to Guillaume Plique (Yomguithereal)
   * Version: 0.0.1
   */

  if (typeof sigma === 'undefined')
    throw 'sigma.exporters.gexf: sigma is not declared';

  // Utilities
  function download(fileEntry, extension, filename) {
    var blob = null,
        objectUrl = null,
        dataUrl = null;

    if(window.Blob){
      // use Blob if available
      blob = new Blob([fileEntry], {type: 'text/xml'});
      objectUrl = window.URL.createObjectURL(blob);
    }
    else {
      // else use dataURI
      dataUrl = 'data:text/xml;charset=UTF-8,' +
          encodeURIComponent('<?xml version="1.0" encoding="UTF-8"?>') +
          encodeURIComponent(fileEntry);
    }

    if (navigator.msSaveBlob) { // IE11+ : (has Blob, but not a[download])
      navigator.msSaveBlob(blob, filename);
    } else if (navigator.msSaveOrOpenBlob) { // IE10+ : (has Blob, but not a[download])
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // A-download
      var anchor = document.createElement('a');
      anchor.setAttribute('href', (window.Blob) ? objectUrl : dataUrl);
      anchor.setAttribute('download', filename || 'graph.' + extension);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    if (objectUrl) {
      setTimeout(function() { // Firefox needs a timeout
        window.URL.revokeObjectURL(objectUrl);
      }, 0);
    }
  }

  /**
   * Convert Javascript string in dot notation into an object reference.
   *
   * @param  {object} obj The object.
   * @param  {string} str The string to convert, e.g. 'a.b.etc'.
   * @return {?}          The object reference.
   */
  function strToObjectRef(obj, str) {
    // http://stackoverflow.com/a/6393943
    if (str === null) return null;
    return str.split('.').reduce(function(obj, i) { return obj[i] }, obj);
  }

  /**
   * Transform a color encoded in hexadecimal (shorthand or full form) into an
   * RGB array.
   * See http://stackoverflow.com/a/5623838
   *
   * @param  {string} hex The color in hexadecimal.
   * @return {array}      The color in RGB.
   */
  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
  }

  /**
   * Today formatted as YYYY-MM-DD.
   * See http://stackoverflow.com/a/1531093
   *
   * @return {string} The formatted date of the day.
   */
  function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10){
        dd = '0' + dd;
    }
    if (mm < 10){
        mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }

  /**
   * Return true if the parameter is an integer.
   * See http://stackoverflow.com/a/3885817
   */
  function isInteger(n) {
    return n === +n && n === (n|0);
  }

  /**
   * Update the type of a variable according to a specified value.
   *
   * @param  {?}      x    A value of the variable.
   * @param  {string} type The variable type.
   * @return {string}      The updated variable type.
   */
  function typeOf(x, type) {
    if (type === 'integer' && typeof x === 'number') {
      if (!isInteger(x)) {
        type = 'float';
      }
    }
    else if (typeof x !== 'number') {
      type = 'string';

      if (typeof x === 'boolean') {
        type = 'boolean';
      }
      // NOT available in Gephi yet:
      /*else if (Object.prototype.toString.call(x) === '[object Array]') {
        type = 'list-string';
      }*/
    }
    return type;
  }

  /**
   * Transform the graph memory structure into a GEXF representation (XML dialect).
   * See http://gexf.net/
   * The method builds a DOM tree before serializing it.
   *
   * @param  {object} params The options.
   * @return {string}        The GEXF string.
   */
  sigma.prototype.toGEXF = function(params) {
      params = params || {};

      var doc = document.implementation.createDocument('', '', null),
          oSerializer = new XMLSerializer(),
          sXML = '',
          webgl = true,
          prefix,
          nodes = this.graph.nodes(),
          edges = this.graph.edges();

      if (params.renderer) {
        webgl = params.renderer instanceof sigma.renderers.webgl;
        prefix = webgl ?
          params.renderer.camera.prefix:
          params.renderer.camera.readPrefix;
      }

      var o,
          attrs,
          nodeAttrIndex = {},
          nodeAttrCpt = 0,
          edgeAttrIndex = {},
          edgeAttrCpt = 0,
          attrDefElem,
          attrsElem,
          attrElem,
          nodeAttrsDefElem,
          edgeAttrsDefElem,
          colorElem,
          creatorElem,
          descriptionElem,
          edgesElem,
          edgeElem,
          graphElem,
          metaElem,
          nodesElem,
          nodeElem,
          rootElem,
          positionElem,
          sizeElem,
          textElem;

      rootElem = doc.createElement('gexf');
      rootElem.setAttribute('xmlns', 'http://www.gexf.net/1.2draft');
      rootElem.setAttribute('xmlns:viz', 'http://www.gexf.net/1.2draft/viz');
      rootElem.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
      rootElem.setAttribute('xsi:schemaLocation', 'http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd');
      rootElem.setAttribute('version', '1.2');

      metaElem = doc.createElement('meta');
      metaElem.setAttribute('lastmodifieddate', getDate());

      if (params.creator) {
        creatorElem = doc.createElement('creator');
        textElem = doc.createTextNode('' + params.creator);
        creatorElem.appendChild(textElem);
        metaElem.appendChild(creatorElem);
      }

      if (params.description) {
        descriptionElem = doc.createElement('description');
        textElem = doc.createTextNode('' + params.description);
        descriptionElem.appendChild(textElem);
        metaElem.appendChild(descriptionElem);
      }

      graphElem = doc.createElement('graph');
      graphElem.setAttribute('mode', 'static');


      // NODES
      nodesElem = doc.createElement('nodes');
      for (var i = 0 ; i < nodes.length ; i++) {
        o = nodes[i];
        nodeElem = doc.createElement('node');
        nodeElem.setAttribute('id', o.id);

        // NODE LABEL
        if (o.label)
          nodeElem.setAttribute('label', o.label);

        // NODE ATTRIBUTES
        attrs = strToObjectRef(o, params.nodeAttributes);
        if (attrs) {
          attrsElem = doc.createElement('attvalues');

          Object.keys(attrs).forEach(function (k) {
            if (!(k in nodeAttrIndex)) {
              nodeAttrIndex[k] = {
                id: nodeAttrCpt,
                type: 'integer'
              };
              nodeAttrCpt++;
            }

            var v = attrs[k];
            nodeAttrIndex[k].type = typeOf(v, nodeAttrIndex[k].type);

            attrElem = doc.createElement('attvalue');
            attrElem.setAttribute('for', nodeAttrIndex[k].id);
            attrElem.setAttribute('value', v);
            attrsElem.appendChild(attrElem);
          });

          nodeElem.appendChild(attrsElem);
        }

        // NODE VIZ
        if (params.renderer) {
          if (o.color) {
            var rgb;
            if (o.color[0] === '#') {
              rgb = hexToRgb(o.color);
            }
            else {
              rgb = o.color.match(/\d+/g);
            }

            if (rgb.length > 2) {
              colorElem = doc.createElement('viz:color');
              colorElem.setAttribute('r', rgb[0]);
              colorElem.setAttribute('g', rgb[1]);
              colorElem.setAttribute('b', rgb[2]);
              if (rgb.length > 3) {
                if (rgb.length === 5)
                  colorElem.setAttribute('a', rgb[3] + '.' + rgb[4]);
                else
                  colorElem.setAttribute('a', rgb[3]);
              }
              nodeElem.appendChild(colorElem);
            }
          }

          positionElem = doc.createElement('viz:position');
          positionElem.setAttribute('x', o[prefix + 'x']);
          positionElem.setAttribute('y', -parseInt(o[prefix + 'y'], 10));
          nodeElem.appendChild(positionElem);

          if (o.size) {
            sizeElem = doc.createElement('viz:size');
            sizeElem.setAttribute('value', o[prefix + 'size']);
            nodeElem.appendChild(sizeElem);
          }
        }

        nodesElem.appendChild(nodeElem);
      }

      // DEFINITION OF NODE ATTRIBUTES
      nodeAttrsDefElem = doc.createElement('attributes');
      nodeAttrsDefElem.setAttribute('class', 'node');
      Object.keys(nodeAttrIndex).forEach(function (k) {
        attrDefElem = doc.createElement('attribute');
        attrDefElem.setAttribute('id', nodeAttrIndex[k].id);
        attrDefElem.setAttribute('title', k);
        attrDefElem.setAttribute('type', nodeAttrIndex[k].type);
        nodeAttrsDefElem.appendChild(attrDefElem);
      });

      // EDGES
      edgesElem = doc.createElement('edges');
      for (var i = 0 ; i < edges.length ; i++) {
        o = edges[i];
        edgeElem = doc.createElement('edge');
        edgeElem.setAttribute('id', o.id);
        edgeElem.setAttribute('source', o.source);
        edgeElem.setAttribute('target', o.target);
        if (o.size) {
          edgeElem.setAttribute('weight', o.size);
        }

        // EDGE LABEL
        if (o.label)
          edgeElem.setAttribute('label', o.label);

        // EDGE ATTRIBUTES
        attrs = strToObjectRef(o, params.edgeAttributes);
        if (attrs) {
          attrsElem = doc.createElement('attvalues');

          Object.keys(attrs).forEach(function (k) {
            if (!(k in edgeAttrIndex)) {
              edgeAttrIndex[k] = {
                id: edgeAttrCpt,
                type: 'integer'
              };
              edgeAttrCpt++;
            }

            var v = attrs[k];
            edgeAttrIndex[k].type = typeOf(v, edgeAttrIndex[k].type);

            attrElem = doc.createElement('attvalue');
            attrElem.setAttribute('for', edgeAttrIndex[k].id);
            attrElem.setAttribute('value', v);
            attrsElem.appendChild(attrElem);
          });

          edgeElem.appendChild(attrsElem);
        }

        // EDGE VIZ
        if (params.renderer) {
          if (o.color) {
            var rgb;
            if (o.color[0] === '#') {
              rgb = hexToRgb(o.color);
            }
            else {
              rgb = o.color.match(/\d+/g);
            }

            if (rgb.length > 2 && rgb.length <= 5) {  // ignore alpha in rgba
              colorElem = doc.createElement('viz:color');
              colorElem.setAttribute('r', rgb[0]);
              colorElem.setAttribute('g', rgb[1]);
              colorElem.setAttribute('b', rgb[2]);
              edgeElem.appendChild(colorElem);
            }
          }

          if (o.size) {
            sizeElem = doc.createElement('viz:size');
            sizeElem.setAttribute('value', o.size);
            edgeElem.appendChild(sizeElem);
          }
        }

        edgesElem.appendChild(edgeElem);
      }

      // DEFINITION OF EDGE ATTRIBUTES
      edgeAttrsDefElem = doc.createElement('attributes');
      edgeAttrsDefElem.setAttribute('class', 'edge');
      Object.keys(edgeAttrIndex).forEach(function (k) {
        attrDefElem = doc.createElement('attribute');
        attrDefElem.setAttribute('id', edgeAttrIndex[k].id);
        attrDefElem.setAttribute('title', k);
        attrDefElem.setAttribute('type', edgeAttrIndex[k].type);
        edgeAttrsDefElem.appendChild(attrDefElem);
      });


      graphElem.appendChild(nodeAttrsDefElem);
      graphElem.appendChild(edgeAttrsDefElem);
      graphElem.appendChild(nodesElem);
      graphElem.appendChild(edgesElem);
      rootElem.appendChild(metaElem);
      rootElem.appendChild(graphElem);
      doc.appendChild(rootElem);

      sXML = oSerializer.serializeToString(doc);

      if (params.download) {

        download(sXML, 'gexf', params.filename);
      }

      // Cleaning
      if (attrDefElem) attrDefElem.parentNode.removeChild(attrDefElem);
      if (attrsElem) attrsElem.parentNode.removeChild(attrsElem);
      if (attrElem) attrElem.parentNode.removeChild(attrElem);
      if (colorElem) colorElem.parentNode.removeChild(colorElem);
      if (creatorElem) creatorElem.parentNode.removeChild(creatorElem);
      if (descriptionElem) descriptionElem.parentNode.removeChild(descriptionElem);
      if (textElem) textElem.parentNode.removeChild(textElem);
      if (positionElem) positionElem.parentNode.removeChild(positionElem);
      if (sizeElem) sizeElem.parentNode.removeChild(sizeElem);
      if (nodeElem) nodeElem.parentNode.removeChild(nodeElem);
      if (edgeElem) edgeElem.parentNode.removeChild(edgeElem);
      if (nodeAttrsDefElem) nodeAttrsDefElem.parentNode.removeChild(nodeAttrsDefElem);
      if (edgeAttrsDefElem) edgeAttrsDefElem.parentNode.removeChild(edgeAttrsDefElem);
      if (nodesElem) nodesElem.parentNode.removeChild(nodesElem);
      if (edgesElem) edgesElem.parentNode.removeChild(edgesElem);
      if (graphElem) graphElem.parentNode.removeChild(graphElem);
      if (metaElem) metaElem.parentNode.removeChild(metaElem);
      if (rootElem) rootElem.parentNode.removeChild(rootElem);
      doc = null;

      return sXML;
  };
}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma GraphML File Exporter
   * ================================
   *
   * The aim of this plugin is to enable users to retrieve a GraphML file of the
   * graph.
   *
   * Author: Sylvain Milan
   * Date created: 25/09/2015
   */

  if (typeof sigma === 'undefined')
    throw 'sigma.exporters.graphML: sigma is not declared';

  // Utilities
  function download(fileEntry, extension, filename) {
    var blob = null,
      objectUrl = null,
      dataUrl = null;

    if(window.Blob){
      // use Blob if available
      blob = new Blob([fileEntry], {type: 'text/xml'});
      objectUrl = window.URL.createObjectURL(blob);
    }
    else {
      // else use dataURI
      dataUrl = 'data:text/xml;charset=UTF-8,' +
        encodeURIComponent('<?xml version="1.0" encoding="UTF-8"?>') +
        encodeURIComponent(fileEntry);
    }

    if (navigator.msSaveBlob) { // IE11+ : (has Blob, but not a[download])
      navigator.msSaveBlob(blob, filename);
    } else if (navigator.msSaveOrOpenBlob) { // IE10+ : (has Blob, but not a[download])
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // A-download
      var anchor = document.createElement('a');
      anchor.setAttribute('href', (window.Blob) ? objectUrl : dataUrl);
      anchor.setAttribute('download', filename || 'graph.' + extension);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    if (objectUrl) {
      setTimeout(function() { // Firefox needs a timeout
        window.URL.revokeObjectURL(objectUrl);
      }, 0);
    }
  }

  function iterate(obj, func) {
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) {
        continue;
      }

      func(obj[k], k);
    }
  }

  /**
   * Convert Javascript string in dot notation into an object reference.
   *
   * @param  {object} obj The object.
   * @param  {string} str The string to convert, e.g. 'a.b.etc'.
   * @return {?}          The object reference.
   */
  function strToObjectRef(obj, str) {
    // http://stackoverflow.com/a/6393943
    if (str == null) return null;
    return str.split('.').reduce(function(obj, i) { return obj[i] }, obj);
  }

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  sigma.prototype.toGraphML = function (params) {
    params = params || {};

    var doc = document.implementation.createDocument('', '', null),
        oSerializer = new XMLSerializer(),
        sXML,
        webgl = true,
        prefix,
        nodes = this.graph.nodes(),
        edges = this.graph.edges();

    if (params.renderer) {
      webgl = params.renderer instanceof sigma.renderers.webgl;
      prefix = webgl ?
        params.renderer.camera.prefix:
        params.renderer.camera.readPrefix;
    } else {
      prefix = '';
    }

    function setRGB(obj, color) {
      var rgb;
      if (color[0] === '#') {
        rgb = hexToRgb(color);
      } else {
        rgb = color.match(/\d+(\.\d+)?/g);
      }

      obj.r = rgb[0];
      obj.g = rgb[1];
      obj.b = rgb[2];
      if (obj.a) {
        obj.a = rgb[3];
      }
    }

    function createAndAppend(parentElement, typeToCreate, attributes, elementValue, force) {
      attributes = attributes || {};

      var elt = doc.createElement(typeToCreate);

      for (var key in attributes) {
        if (!attributes.hasOwnProperty(key)) {
          continue;
        }
        var value = attributes[key];
        if (value !== undefined) {
          elt.setAttribute(key, value);
        }
      }

      if (elementValue !== undefined || force) {
        if (Object.prototype.toString.call(elementValue) === '[object Object]') {
          elementValue = JSON.stringify(elementValue);
        }

        var textNode = document.createTextNode(elementValue);
        elt.appendChild(textNode);
      }

      parentElement.appendChild(elt);

      return elt;
    }

    var builtinAttributes = [
      'id', 'source', 'target'
    ];

    var reservedAttributes = [
      'size', 'x', 'y', 'type', 'color', 'label', 'fixed', 'hidden', 'active'
    ];

    var keyElements = {
        'size': {for: 'all', type: 'double'},
        'x': {for: 'node', type: 'double'},
        'y': {for: 'node', type: 'double'},
        'type': {for: 'all', type: 'string'},
        'color': {for: 'all', type: 'string'},
        'r': {for:'all', type:'int'},
        'g': {for:'all', type:'int'},
        'b': {for:'all', type:'int'},
        'a': {for:'all', type:'double'},
        'label': {for: 'all', type: 'string'},
        'fixed': {for: 'node', type: 'boolean'},
        'hidden': {for: 'all', type: 'boolean'},
        'active': {for: 'all', type: 'boolean'}
      },
        nodeElements = [],
        edgeElements = [];

    function processItem(item, itemType, itemAttributesName) {
      var dataAttributes = strToObjectRef(item, itemAttributesName);
      var elt = {id:item.id};

      reservedAttributes.forEach(function (attr) {
        var value = (attr === 'x' || attr === 'y') ? item[prefix + attr] : item[attr];
        if (attr === 'y' && value) {
          value = -parseFloat(value);
        }

        if (value !== undefined) {
          elt[(itemType === 'edge' ? 'edge_' : '') + attr] = value;
          if (attr === 'color') {
            setRGB(elt, value);
          }
        }
      });

      iterate(dataAttributes, function (value, key) {
        if (reservedAttributes.indexOf(key) !== -1 || builtinAttributes.indexOf(key) !== -1) {
          return;
        }

        if (!keyElements[key]) {
          keyElements[key] = {for:itemType, type:'string'};
        } else if (keyElements[key].for !== itemType) {
          keyElements[key].for = 'all';
        }

        elt[key] = value;
      });

      if (itemType === 'edge') {
        elt.source = item.source;
        elt.target = item.target;
        edgeElements.push(elt);
      } else {
        nodeElements.push(elt);
      }
    }

    nodes.forEach(function (n) {
      processItem(n, 'node', params.nodesAttributes);
    });

    edges.forEach(function (e) {
      processItem(e, 'edge', params.edgesAttributes);
    });

    /* Root element */
    var rootElem = createAndAppend(doc, 'graphml', {
    'xmlns': 'http://graphml.graphdrawing.org/xmlns',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation': 'http://graphml.graphdrawing.org/xmlns http://www.yworks.com/xml/schema/graphml/1.1/ygraphml.xsd',
    'xmlns:y': 'http://www.yworks.com/xml/graphml',
    'xmlns:java': 'http://www.yworks.com/xml/yfiles-common/1.0/java',
    'xmlns:sys': 'http://www.yworks.com/xml/yfiles-common/markup/primitives/2.0',
    'xmlns:x': 'http://ww.yworks.com/xml/yfiles-common/markup/2.0'
  });

    /* GraphML attributes */
    iterate(keyElements, function (value, key) {
      if (value.for === 'node' || value.for === 'all') {
        createAndAppend(rootElem, 'key', {
          'attr.name': key,
          'attr.type': value.type,
          'for': 'node',
          'id': key
        });
      }

      if (value.for === 'edge' || value.for === 'all') {
        createAndAppend(rootElem, 'key', {
          'attr.name': key,
          'attr.type': value.type,
          'for': 'edge',
          'id': 'edge_' + key
        });
      }
    });

    /* yFiles extension */
    createAndAppend(rootElem, 'key', {
      'id':'nodegraphics',
      'for':'node',
      'yfiles.type':'nodegraphics',
      'attr.type': 'string'
    });

    createAndAppend(rootElem, 'key', {
      'id':'edgegraphics',
      'for':'edge',
      'yfiles.type':'edgegraphics',
      'attr.type': 'string'
    });

    /* Graph element */
    var graphElem = createAndAppend(rootElem, 'graph', {
      'edgedefault': params.undirectedEdges ? 'undirected' : 'directed',
      'id': params.graphId ? params.graphId : 'G',
      'parse.nodes': nodes.length,
      'parse.edges': edges.length,
      'parse.order': 'nodesfirst'
    });

    function appendShapeNode(nodeElem, node) {
      var dataElem = createAndAppend(nodeElem, 'data', { key:'nodegraphics'});
      var shapeNodeElem = createAndAppend(dataElem, 'y:ShapeNode');

      createAndAppend(shapeNodeElem, 'y:Geometry', { x:node.x, y:node.y, width:node.size, height:node.size});
      createAndAppend(shapeNodeElem, 'y:Fill', { color: node.color ? node.color : '#000000', transparent: false });
      createAndAppend(shapeNodeElem, 'y:NodeLabel', null, node.label ? node.label : '');
      createAndAppend(shapeNodeElem, 'y:Shape', {type:node.type ? node.type : 'circle'});
    }

    function appendPolyLineEdge(edgeElem, edge) {
      var dataElem = createAndAppend(edgeElem, 'data', { key:'edgegraphics'});
      var shapeEdgeElem = createAndAppend(dataElem, 'y:PolyLineEdge');

      createAndAppend(shapeEdgeElem, 'y:LineStyle', {
        type:edge.edge_type ? edge.edge_type : 'line',
        color:edge.edge_color ? edge.edge_color : '#0000FF',
        width:edge.edge_size ? edge.edge_size : 1
      });

      createAndAppend(shapeEdgeElem, 'y:EdgeLabel', null, edge.edge_label ? edge.edge_label : '');
    }

    /* Node elements */
    nodeElements.forEach(function (elt) {
      var nodeElem = createAndAppend(graphElem, 'node', { id:elt.id });

      appendShapeNode(nodeElem, elt);

      iterate(elt, function (value, key) {
        if (builtinAttributes.indexOf(key) !== -1) {
          return;
        }

        createAndAppend(nodeElem, 'data', {key: key}, value, true);
      });
    });

    /* Edge elements */
    edgeElements.forEach(function (elt) {
      var edgeElem = createAndAppend(graphElem, 'edge', { id:elt.id, source:elt.source, target:elt.target });

      appendPolyLineEdge(edgeElem, elt);

      iterate(elt, function (value, key) {
        if (builtinAttributes.indexOf(key) !== -1) {
          return;
        }

        createAndAppend(edgeElem, 'data', {key:key}, value, true);
      });
    });

    sXML = '<?xml version="1.0" encoding="UTF-8"?>' + oSerializer.serializeToString(doc);

    if (params.download) {
      download(sXML, 'graphml', params.filename);
    }
  };

}.call(this));
;(function(undefined) {
  'use strict';

  /**
   * Sigma JSON File Exporter
   * ================================
   *
   * The aim of this plugin is to enable users to retrieve a JSON file of the
   * graph.
   *
   * Author: Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * Version: 0.0.1
   */

  if (typeof sigma === 'undefined')
    throw 'sigma.exporters.json: sigma is not declared';

  // Utilities
  function download(fileEntry, extension, filename) {
    var blob = null,
        objectUrl = null,
        dataUrl = null;

    if(window.Blob){
      // use Blob if available
      blob = new Blob([fileEntry], {type: 'text/json'});
      objectUrl = window.URL.createObjectURL(blob);
    }
    else {
      // else use dataURI
      dataUrl = 'data:text/json;charset=UTF-8,' + encodeURIComponent(fileEntry);
    }

    if (navigator.msSaveBlob) { // IE11+ : (has Blob, but not a[download])
      navigator.msSaveBlob(blob, filename);
    } else if (navigator.msSaveOrOpenBlob) { // IE10+ : (has Blob, but not a[download])
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // A-download
      var anchor = document.createElement('a');
      anchor.setAttribute('href', (window.Blob) ? objectUrl : dataUrl);
      anchor.setAttribute('download', filename || 'graph.' + extension);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    if (objectUrl) {
      setTimeout(function() { // Firefox needs a timeout
        window.URL.revokeObjectURL(objectUrl);
      }, 0);
    }
  }

  /**
   * Fast deep copy function.
   *
   * @param  {object} o The object.
   * @return {object}   The object copy.
   */
  function deepCopy(o) {
    var copy = Object.create(null);
    for (var i in o) {
      if (typeof o[i] === "object" && o[i] !== null) {
        copy[i] = deepCopy(o[i]);
      }
      else if (typeof o[i] === "function" && o[i] !== null) {
        // clone function:
        eval(" copy[i] = " +  o[i].toString());
        //copy[i] = o[i].bind(_g);
      }

      else
        copy[i] = o[i];
    }
    return copy;
  };

  /**
   * Returns true if the string "str" starts with the string "start".
   *
   * @param {string} start
   * @param {string} str
   * @return {boolean}
   */
  function startsWith(start, str) {
    return str.slice(0, start.length) == start;
  };

  /**
   * Remove attributes added by the cameras and renderers. The node/edge
   * object should be a clone of the original.
   *
   * @param  {object} o The node or edge object.
   * @return {object}   The cleaned object.
   */
  function cleanup(o) {
    for (var prop in o) {
      if (
        startsWith('read_cam', prop) ||
        startsWith('cam', prop) ||
        startsWith('renderer', ''+prop)
      ) {
        o[prop] = undefined;
      }
    }

    return o;
  }

  /**
   * Transform the graph memory structure into a JSON representation.
   *
   * @param  {object} params The options.
   * @return {string}        The JSON string.
   */
  sigma.prototype.toJSON = function(params) {
      params = params || {};

      var graph = {
        nodes: this.graph.nodes().map(deepCopy).map(cleanup),
        edges: this.graph.edges().map(deepCopy).map(cleanup)
      };

      if (params.pretty) {
        var jsonString = JSON.stringify(graph, null, ' ');
      }
      else {
        var jsonString = JSON.stringify(graph);
      }

      if (params.download) {
        download(jsonString, 'json', params.filename);
      }

      return jsonString;
  };
}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma Spreadsheet File Exporter
   * ================================
   *
   * The aim of this plugin is to enable users to retrieve a Spreadsheet file
   * for nodes or edges of the graph.
   *
   * Author: Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * Version: 0.0.1
   */

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  function download(fileEntry, extension, filename) {
    var blob = null,
        objectUrl = null,
        dataUrl = null;

    if(window.Blob){
      // use Blob if available
      blob = new Blob([fileEntry], {type: 'text/xml'});
      objectUrl = window.URL.createObjectURL(blob);
    }
    else {
      // else use dataURI
      dataUrl = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(fileEntry);
    }

    if (navigator.msSaveBlob) { // IE11+ : (has Blob, but not a[download])
      navigator.msSaveBlob(blob, filename);
    } else if (navigator.msSaveOrOpenBlob) { // IE10+ : (has Blob, but not a[download])
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // A-download
      var anchor = document.createElement('a');
      anchor.setAttribute('href', (window.Blob) ? objectUrl : dataUrl);
      anchor.setAttribute('download', filename || 'graph.' + extension);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    if (objectUrl) {
      setTimeout(function() { // Firefox needs a timeout
        window.URL.revokeObjectURL(objectUrl);
      }, 0);
    }
  }

  function escape(x, separator) {
    if (x === null || x === undefined)
      return separator + separator;

    if (typeof x === 'function')
      return x.toString();

    x = (typeof x === 'string') ? x : JSON.stringify(x);
    x = x.replace(/\s+/g, ' ');

    if (separator && separator.length) {
      return separator +
        x.replace(
          separator,
          (separator === '"') ? "'" : '"'
        ) +
        separator;
    }
    return x;
  }

  /**
   * Convert Javascript string in dot notation into an object reference.
   *
   * @param  {object} obj The object.
   * @param  {string} str The string to convert, e.g. 'a.b.etc'.
   * @return {?}          The object reference.
   */
  function strToObjectRef(obj, str) {
    // http://stackoverflow.com/a/6393943
    if (str === null || str === undefined) return null;
    return str.split('.').reduce(function(obj, i) { return obj[i] }, obj);
  }

  /**
   * Transform the graph memory structure into a Spreadsheet file.
   *
   * @param  {object} params The options.
   * @return {string}        The Spreadsheet string.
   */
  sigma.prototype.toSpreadsheet = function(params) {
      params = params || {};
      params.separator = params.separator || ',';
      params.textSeparator = params.textSeparator || '';

      if (params.textSeparator && params.textSeparator !== '"' && params.textSeparator !== "'")
        throw new TypeError(
          'Invalid argument :"textSeparator" is not single-quote or double-quote, was ' +
          params.textSeparator);

      var rows = [],
          index = {},
          attributesArr = [],
          cpt = 0,
          data,
          attributes,
          categories,
          categoriesColName = params.categoriesName || 'categories',
          o,
          arr,
          extraCol;

      if (!params.what)
        throw new TypeError('Missing argument: "what".');

      if (params.what === 'nodes') {
        if (params.which)
          data = this.graph.nodes(params.which)
        else
          data = this.graph.nodes();
      }
      else if (params.what === 'edges') {
        if (params.which)
          data = this.graph.edges(params.which)
        else
          data = this.graph.edges();
      }
      else
        throw new TypeError('Invalid argument: "what" is not "nodes" or "edges", was ' + params.what);

      // Find all attributes keys to provide fixed row length to deal with
      // missing attributes
      index['id'] = cpt++;
      attributesArr.push(escape('id', params.textSeparator));

      if (params.what === 'edges') {
        index['source'] = cpt++;
        attributesArr.push(escape('source', params.textSeparator));
        index['target'] = cpt++;
        attributesArr.push(escape('target', params.textSeparator));
      }

      extraCol = params.categories && params.categories.length;
      if (extraCol) {
        index['categories'] = cpt++;
        attributesArr.push(escape(categoriesColName, params.textSeparator));
      }

      for (var i = 0 ; i < data.length ; i++) {
        o = data[i];
        attributes = strToObjectRef(o, params.attributes) || {};
        Object.keys(attributes).forEach(function (k) {
          if (!(k in index)) {
            index[k] = cpt++;
            attributesArr.push(
              escape(k, params.textSeparator)
            );
          }
        });
      }
      rows.push(attributesArr);

      // Get attribute values
      for (var i = 0 ; i < data.length ; i++) {
        o = data[i];
        arr = [];
        arr.length = cpt;

        arr[0] = escape(o.id, params.textSeparator);

        if (params.what === 'edges') {
          arr[1] = escape(o.source, params.textSeparator);
          arr[2] = escape(o.target, params.textSeparator);
        }

        if (extraCol) {
          categories = strToObjectRef(o, params.categories);
          if (Array.isArray(categories)) {
            categories = categories.join(',');
          }

          arr[index['categories']] = escape(categories, params.textSeparator);
        }

        attributes = strToObjectRef(o, params.attributes) || {};
        Object.keys(attributes).forEach(function (k) {
          arr[index[k]] = escape(attributes[k], params.textSeparator);
        });
        rows.push(arr);
      }

      var serialized = rows.map(function(arr) {
        return arr.join(params.separator);
      }).join('\n');

      if (params.download) {
        download(serialized, 'csv', params.filename);
      }

      return serialized;
  };
}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma SVG Exporter
   * ===================
   *
   * This plugin is designed to export a graph to a svg file that can be
   * downloaded or just used elsewhere.
   *
   * Author: Guillaume Plique (Yomguithereal)
   * Version: 0.0.1
   */

  // Terminating if sigma were not to be found
  if (typeof sigma === 'undefined')
    throw 'sigma.renderers.snapshot: sigma not in scope.';


  /**
   * Polyfills
   */
  var URL = this.URL || this.webkitURL || this;


  /**
   * Utilities
   */
  function createBlob(data) {
    return new Blob(
      [data],
      {type: 'image/svg+xml;charset=utf-8'}
    );
  }

  function download(string, filename) {
    if (typeof safari !== 'undefined') {
      var msg = "File download does not work in Safari. Please use a modern web browser such as Firefox, Chrome, or Internet Explorer 11.";
      alert(msg);
      throw new Error(msg);
    }

    // Blob
    var blob = createBlob(string),
        objectUrl = window.URL.createObjectURL(blob);

    if (navigator.msSaveBlob) { // IE11+ : (has Blob, but not a[download])
      navigator.msSaveBlob(blob, filename);
    } else if (navigator.msSaveOrOpenBlob) { // IE10+ : (has Blob, but not a[download])
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // A-download
      var anchor = document.createElement('a');
      anchor.setAttribute('href', objectUrl);
      anchor.setAttribute('download', filename);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    setTimeout(function() { // Firefox needs a timeout
      window.URL.revokeObjectURL(objectUrl);
    }, 0);
  }


  /**
   * Defaults
   */
  var DEFAULTS = {
    size: '1000',
    width: '1000',
    height: '1000',
    margin: 0.05,
    classes: true,
    labels: true,
    data: false,
    download: false,
    filename: 'graph.svg'
  };

  var XMLNS = 'http://www.w3.org/2000/svg';


  /**
   * Subprocesses
   */
  function optimize(svg, prefix, params) {
    var nodeColorIndex = {},
        edgeColorIndex = {},
        count = 0,
        color,
        style,
        styleText = '',
        f,
        i,
        l;

    // Creating style tag if needed
    if (params.classes) {
      style = document.createElementNS(XMLNS, 'style');
      svg.insertBefore(style, svg.firstChild);
    }

    // Iterating over nodes
    var nodes = svg.querySelectorAll('[id="' + prefix + '-group-nodes"] > [class="' + prefix + '-node"]');

    for (i = 0, l = nodes.length, f = true; i < l; i++) {
      color = nodes[i].getAttribute('fill');

      if (!params.data)
        nodes[i].removeAttribute('data-node-id');

      if (params.classes) {

        if (!(color in nodeColorIndex)) {
          nodeColorIndex[color] = (f ? prefix + '-node' : 'c-' + (count++));
          styleText += '.' + nodeColorIndex[color] + '{fill: ' + color + '}';
        }

        if (nodeColorIndex[color] !== prefix + '-node')
          nodes[i].setAttribute('class', nodes[i].getAttribute('class') + ' ' + nodeColorIndex[color]);
        nodes[i].removeAttribute('fill');
      }

      f = false;
    }

    // Iterating over edges
    var edges = svg.querySelectorAll('[id="' + prefix + '-group-edges"] > [class="' + prefix + '-edge"]');

    for (i = 0, l = edges.length, f = true; i < l; i++) {
      color = edges[i].getAttribute('stroke');

      if (!params.data)
        edges[i].removeAttribute('data-edge-id');

      if (params.classes) {

        if (!(color in edgeColorIndex)) {
          edgeColorIndex[color] = (f ? prefix + '-edge' : 'c-' + (count++));
          styleText += '.' + edgeColorIndex[color] + '{stroke: ' + color + '}';
        }

        if (edgeColorIndex[color] !== prefix + '-edge')
          edges[i].setAttribute('class', edges[i].getAttribute('class') + ' ' + edgeColorIndex[color]);
        edges[i].removeAttribute('stroke');
      }

      f = false;
    }

    if (params.classes)
      style.appendChild(document.createTextNode(styleText));
  }


  /**
   * Extending prototype
   */
  sigma.prototype.toSVG = function(params) {
    params = params || {};

    var prefix = this.settings('classPrefix'),
        w = params.size || params.width || DEFAULTS.size,
        h = params.size || params.height || DEFAULTS.size,
        margin = params.margin || DEFAULTS.margin;

    // Creating a dummy container
    var container = document.createElement('div');
    container.setAttribute('width', w);
    container.setAttribute('height', h);
    container.setAttribute('style', 'position:absolute; top: 0px; left:0px; width: ' + w + 'px; height: ' + h + 'px;');

    // Add margin to deal with curved edges
    var sideMargin = this.settings('sideMargin');
    this.settings('sideMargin', margin);

    // Fit graph to viewport
    var autoRescale = this.settings('autoRescale');
    this.settings('autoRescale', true);

    // Creating a camera
    var camera = this.addCamera();

    // Creating a svg renderer
    var renderer = this.addRenderer({
      camera: camera,
      container: container,
      type: 'svg',
      forceLabels: !!params.labels
    });

    // Refreshing
    renderer.resize(w, h);
    this.refresh();

    // Dropping camera and renderers before something nasty happens
    this.killRenderer(renderer);
    this.killCamera(camera);

    // reset setting
    this.settings('sideMargin', sideMargin);
    this.settings('autoRescale', autoRescale);

    // Retrieving svg
    var svg = container.querySelector('svg');
    svg.removeAttribute('style');
    svg.setAttribute('width', w + 'px');
    svg.setAttribute('height', h + 'px');
    svg.setAttribute('x', '0px');
    svg.setAttribute('y', '0px');
    // svg.setAttribute('viewBox', '0 0 1000 1000');

    // Dropping labels
    if (!params.labels) {
      var labelGroup = svg.querySelector('[id="' + prefix + '-group-labels"]');
      svg.removeChild(labelGroup);
    }

    // Dropping hovers
    var hoverGroup = svg.querySelector('[id="' + prefix + '-group-hovers"]');
    svg.removeChild(hoverGroup);

    // Optims?
    params.classes = (params.classes !== false);
    if (!params.data || params.classes)
      optimize(svg, prefix, params);

    // Retrieving svg string
    var svgString = svg.outerHTML;

    // Paranoid cleanup
    container = null;

    // Output string
    var output = '<?xml version="1.0" encoding="utf-8"?>\n';
    output += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n';
    output += svgString;

    if (params.download)
      download(output, params.filename || DEFAULTS.filename);

    return output;
  };
}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma Spreadsheet File Exporter
   * ================================
   *
   * The aim of this plugin is to enable users to retrieve an Excel 2007+
   * spreadsheet file for nodes and edges of the graph.
   *
   * Author: Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * Version: 0.0.1
   */

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  if (typeof dagre === 'undefined' || typeof dagre.graphlib === 'undefined')
    console.warn('to use the xlx plugin, you have to include the XLSX library');


  function downloadBlob(blob, extension, filename) {
    var objectUrl = window.URL.createObjectURL(blob);

    if (navigator.msSaveBlob) { // IE11+ : (has Blob, but not a[download])
      navigator.msSaveBlob(blob, filename);
    } else if (navigator.msSaveOrOpenBlob) { // IE10+ : (has Blob, but not a[download])
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // A-download
      var anchor = document.createElement('a');
      anchor.setAttribute('href', objectUrl);
      anchor.setAttribute('download', filename || 'graph.' + extension);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    setTimeout(function() { // Firefox needs a timeout
      window.URL.revokeObjectURL(objectUrl);
    }, 0);
  }

  // string to array buffer
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  function format(x) {
    if (x === null || x === undefined)
      return '';

    if (typeof x === 'string' || typeof x === 'number')
      return x;

    if (typeof x === 'function')
      return x.toString();

    return JSON.stringify(x);
  }

  function formatCategories(x) {
    if (x === null || x === undefined)
      return '';

    if (typeof x === 'string' || typeof x === 'number')
      return x;

    if (Array.isArray(x))
      return x.join(',');

    if (typeof x === 'function')
      return x.toString();

    return JSON.stringify(x);
  }

  /**
   * Convert Javascript string in dot notation into an object reference.
   *
   * @param  {object} obj The object.
   * @param  {string} str The string to convert, e.g. 'a.b.etc'.
   * @return {?}          The object reference.
   */
  function strToObjectRef(obj, str) {
    // http://stackoverflow.com/a/6393943
    if (str === null || str === undefined) return null;
    return str.split('.').reduce(function(obj, i) { return obj[i] }, obj);
  }

  function Workbook() {
    if(!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
  }

  function datenum(v, date1904) {
    if(date1904) v+=1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  }

  // make sheet from array of arrays
  function sheet(data, opts) {
    var ws = {};
    var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
    for(var R = 0; R != data.length; ++R) {
      for(var C = 0; C != data[R].length; ++C) {
        if(range.s.r > R) range.s.r = R;
        if(range.s.c > C) range.s.c = C;
        if(range.e.r < R) range.e.r = R;
        if(range.e.c < C) range.e.c = C;
        var cell = {v: data[R][C] };
        if(cell.v == null) continue;
        var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

        if(typeof cell.v === 'number') cell.t = 'n';
        else if(typeof cell.v === 'boolean') cell.t = 'b';
        else if(cell.v instanceof Date) {
          cell.t = 'n'; cell.z = XLSX.SSF._table[14];
          cell.v = datenum(cell.v);
        }
        else cell.t = 's';

        ws[cell_ref] = cell;
      }
    }
    if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
  }

  // make array of nodes or edges
  function toArray(data, params) {
    var cpt = 0,
        index = {},
        attributesArr = [],
        attributes,
        attributesPath = params.nodesAttributes,
        categoryPath = params.nodesCategories,
        categoriesColName = params.nodesCategoriesName || 'categories',
        o,
        arr,
        extraCol = 0,
        rows = [];

    if (params.what === 'edges') {
      attributesPath = params.edgesAttributes;
      categoryPath = params.edgesCategories;
      categoriesColName = params.edgesCategoriesName || 'categories';
    }

    extraCol = (categoryPath && categoryPath.length) ? 1 : 0;

    // Find all attributes keys to provide fixed row length to deal with
    // missing attributes
    index['id'] = cpt++;
    attributesArr.push('id');

    if (params.what === 'edges') {
      index['source'] = cpt++;
      attributesArr.push('source');
      index['target'] = cpt++;
      attributesArr.push('target');
    }

    if (extraCol) {
      cpt++;
      attributesArr.push(categoriesColName);
    }

    for (var i = 0 ; i < data.length ; i++) {
      o = data[i];
      attributes = strToObjectRef(o, attributesPath) || {};
      Object.keys(attributes).forEach(function (k) {
        if (!(k in index)) {
          index[k] = cpt++;
          attributesArr.push(format(k));
        }
      });
    }
    rows.push(attributesArr);

    // Get attribute values
    for (var i = 0 ; i < data.length ; i++) {
      o = data[i];
      arr = [];
      arr.length = cpt;

      arr[0] = format(o.id);

      if (params.what === 'edges') {
        arr[1] = format(o.source);
        arr[2] = format(o.target);

        if (extraCol) {
          arr[3] = formatCategories(strToObjectRef(o, categoryPath));
        }
      }
      else if (extraCol) {
        arr[1] = formatCategories(strToObjectRef(o, categoryPath));
      }

      attributes = strToObjectRef(o, attributesPath) || {};
      Object.keys(attributes).forEach(function (k) {
        arr[index[k]] = format(attributes[k]);
      });
      rows.push(arr);
    }
    return rows;
  }

  /**
   * Transform the graph memory structure into a Spreadsheet file.
   *
   * @param  {object} params The options.
   * @return {string}        The Spreadsheet string.
   */
  sigma.prototype.toXLSX = function(params) {
      if (typeof XLSX === 'undefined')
        throw new Error('XLSX is not declared');

      params = params || {};

      var wb = new Workbook(),
          wsNodes,
          wsEdges,
          data;

      if (!params.what) {
        params.what = 'nodes';
        wsNodes = sheet(toArray(this.graph.nodes(), params));
        params.what = 'edges';
        wsEdges = sheet(toArray(this.graph.edges(), params));
      }
      else {
        if (params.what === 'nodes') {
          if (params.which)
            data = this.graph.nodes(params.which)
          else
            data = this.graph.nodes();

          wsNodes = sheet(toArray(data, params));
        }
        else if (params.what === 'edges') {
          if (params.which)
            data = this.graph.edges(params.which)
          else
            data = this.graph.edges();

          wsEdges = sheet(toArray(data, params));
        }
        else
          throw new TypeError(
            'Invalid argument: "what" is not "nodes" or "edges", was ' + params.what);
      }

      /* add worksheets to workbook */
      if (wsNodes) {
        wb.SheetNames.push('Nodes');
        wb.Sheets['Nodes'] = wsNodes;
      }
      if (wsEdges) {
        wb.SheetNames.push("Edges");
        wb.Sheets["Edges"] = wsEdges;
      }

      var wbout = XLSX.write(wb, { bookType:'xlsx', bookSST:false, type:'binary' });
      var blob = new Blob([s2ab(wbout)], {type:''});

      downloadBlob(blob, 'xlsx', params.filename);
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');

  /**
   * Sigma Image Utility
   * =============================
   *
   * @author: Martin de la Taille (martindelataille)
   * @thanks: Guillaume Plique (Yomguithereal)
   * @version: 0.1
   */

  var _contexts,
      _types,
      _canvas,
      _canvasContext;

  _contexts = ['scene', 'edges', 'nodes', 'labels'];
  _types = {
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    tiff: 'image/tiff'
  };

  // UTILITIES FUNCTIONS:
  // ******************
  function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  }

  function download(dataUrl, extension, filename) {
    filename = filename || 'graph.' + extension;

    if (navigator.msSaveOrOpenBlob) { // IE10+
      navigator.msSaveOrOpenBlob(dataURLToBlob(dataUrl), filename);
    }
    else if (navigator.msSaveBlob) { // IE11+
      navigator.msSaveBlob(dataURLToBlob(dataUrl), filename);
    }
    else {
      var anchor = document.createElement('a');
      anchor.setAttribute('href', dataUrl);
      anchor.setAttribute('download', filename);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  }

  function calculateAspectRatioFit(srcWidth, srcHeight, maxSize) {
    var ratio = Math.min(maxSize / srcWidth, maxSize / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  function calculateZoomedBoundaries(s, r, params) {
    var bounds;

    bounds = sigma.utils.getBoundaries(
      s.graph,
      r.camera.readPrefix
    );

    bounds.minX /= params.zoomRatio;
    bounds.minY /= params.zoomRatio;
    bounds.maxX /= params.zoomRatio;
    bounds.maxY /= params.zoomRatio;

    return bounds;
  }

  function calculateRatio(s, r, params) {
    var boundaries,
        margin = params.margin || 0,
        ratio = {
          width:  r.width,
          height: r.height,
        };

    if (!params.clips && !params.size) {
      boundaries = calculateZoomedBoundaries(s, r, params);

      ratio = {
        width:  boundaries.maxX - boundaries.minX + boundaries.sizeMax * 2,
        height: boundaries.maxY - boundaries.minY + boundaries.sizeMax * 2
      };
    }
    else if (params.size && params.size >= 1) {
      ratio = calculateAspectRatioFit(r.width, r.height, params.size);
    }

    ratio.width += margin;
    ratio.height += margin;

    return ratio;
  }

  /**
  * This function generate a new canvas to download image
  *
  * Recognized parameters:
  * **********************
  * Here is the exhaustive list of every accepted parameters in the settings
  * object:
  * @param {s}  sigma instance
  * @param {params}  Options
  */
 function Image(s, r, params) {
    params = params || {};

    if (params.format && !(params.format in _types))
      throw Error('sigma.renderers.image: unsupported format "' + params.format + '".');

    var ratio = calculateRatio(s, r, params);

    var batchEdgesDrawing = s.settings('batchEdgesDrawing');
    if (batchEdgesDrawing) {
      s.settings('batchEdgesDrawing', false); // it may crash if true
    }

    if(!params.clip)
      this.clone(s, params, ratio);

    var merged = this.draw(r, params, ratio);

    s.settings('batchEdgesDrawing', batchEdgesDrawing); // restore setting

    var dataUrl = merged.toDataURL(_types[params.format || 'png']);

    if(params.download)
      download(
        dataUrl,
        params.format || 'png',
        params.filename
      );

    return dataUrl;
  }

  /**
  * @param {s}  sigma instance
  * @param {params}  Options
  */
  Image.prototype.clone = function(s, params, ratio) {
    params.tmpContainer = params.tmpContainer || 'image-container';

    var el = document.getElementById(params.tmpContainer);
    if (!el) {
      el =  document.createElement("div");
      el.id = params.tmpContainer;
      document.body.appendChild(el);
    }
    el.setAttribute("style",
        'width:' + ratio.width + 'px;' +
        'height:' + Math.round(ratio.height) + 'px;');

    var renderer = s.addRenderer({
      container: document.getElementById(params.tmpContainer),
      type: 'canvas',
      settings: {
        batchEdgesDrawing: true,
        drawLabels: !!params.labels
      }
    });
    renderer.camera.ratio = (params.zoomRatio > 0) ? params.zoomRatio : 1;

    var webgl = renderer instanceof sigma.renderers.webgl,
        sized = false,
        doneContexts = [];

    _canvas = document.createElement('canvas');
    _canvasContext = _canvas.getContext('2d');

    s.refresh();

    _contexts.forEach(function(name) {
      if (!renderer.contexts[name])
        return;

      if (params.labels === false && name === 'labels')
        return;

      var canvas = renderer.domElements[name] || renderer.domElements.scene,
        context = renderer.contexts[name];

      if(!sized) {
        _canvas.width = ratio.width;
        _canvas.height = ratio.height;

        if (webgl && context instanceof WebGLRenderingContext) {
          _canvas.width  *= 0.5;
          _canvas.height *= 0.5;
        }

        sized = true;
      }

      if (context instanceof WebGLRenderingContext)
        _canvasContext.drawImage(canvas, 0, 0, canvas.width / 2, canvas.height / 2);
      else
        _canvasContext.drawImage(canvas, 0, 0);

      if (~doneContexts.indexOf(context))
        return;

      doneContexts.push(context);
    });

    // Cleaning
    doneContexts = [];
    s.killRenderer(renderer);
    el.parentNode.removeChild(el);
  }

  /**
  * @param {renderer}  related renderer instance
  * @param {params}  Options
  */
  Image.prototype.draw = function(r, params, ratio) {

    if(!params.size || params.size < 1)
      params.size = window.innerWidth;

    var webgl = r instanceof sigma.renderers.webgl,
        sized = false,
        doneContexts = [];

    var merged = document.createElement('canvas'),
        mergedContext= merged.getContext('2d');

    _contexts.forEach(function(name) {
      if (!r.contexts[name])
        return;

      if (params.labels === false && name === 'labels')
        return;

      var canvas = r.domElements[name] || r.domElements.scene,
        context = r.contexts[name];

      if (~doneContexts.indexOf(context))
        return;

      if (!sized) {

        var width, height;

        if(!params.clip) {
          width = _canvas.width;
          height = _canvas.height;
        } else {
          width = canvas.width;
          height = canvas.height;
          ratio = calculateAspectRatioFit(width, height, params.size);
        }

        merged.width = ratio.width;
        merged.height = ratio.height;

        if (!webgl && !context instanceof WebGLRenderingContext) {
          merged.width *= 2;
          merged.height *=2;
        }

        sized = true;

        // background color
        if (params.background) {
          mergedContext.rect(0, 0, merged.width, merged.height);
          mergedContext.fillStyle = params.background;
          mergedContext.fill();
        }
      }

      if(params.clip)
        mergedContext.drawImage(canvas, 0, 0, merged.width, merged.height);
      else
        mergedContext.drawImage(_canvas, 0, 0, merged.width, merged.height);

      doneContexts.push(context);
    });

    // Cleaning
    doneContexts = [];

    return merged;
  }

  /**
   * Interface
   * ------------------
   */
  var _instance = null;

  /**
   * @param {sigma}  s       The related sigma instance.
   * @param {renderer}  r    The related renderer instance.
   * @param {object} options An object with options.
   */
  sigma.plugins.image = function(s, r, options) {
    sigma.plugins.killImage();
    // Create object if undefined
    if (!_instance) {
      _instance = new Image(s, r, options);
    }
    return _instance;
  };

  /**
   *  This function kills the image instance.
   */
  sigma.plugins.killImage = function() {
    if (_instance instanceof Image) {
      _instance = null;
      _canvas = null;
      _canvasContext = null;
    }
  };

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  if (typeof dagre === 'undefined' || typeof dagre.graphlib === 'undefined')
    console.warn('to use the dagre plugin, '
      +'you have to include dagre and dagre.graphlib');

  // Initialize package:
  sigma.utils.pkg('sigma.layouts.dagre');

  /**
   * Sigma Dagre layout
   * ===============================
   *
   * Require https://github.com/cpettitt/dagre
   * Author: Sébastien Heymann @ Linkurious
   * Version: 0.1
   */

  // see https://github.com/cpettitt/dagre/wiki#configuring-the-layout
  var settings = {
    directed: true, // take edge direction into account
    multigraph: true, // allows multiple edges between the same pair of nodes
    compound: false, //

    // dagre algo options
    rankDir: 'TB', // Direction for rank nodes. Can be TB, BT, LR, or RL,
                   // where T = top, B = bottom, L = left, and R = right.
  };

  var _instance = {};

  /**
   * Event emitter Object
   * ------------------
   */
  var _eventEmitter = {};

  function getBoundaries(nodes, prefix) {
    var i,
        l,
        prefix = prefix || '',
        sizeMax = -Infinity,
        minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    for (i = 0, l = nodes.length; i < l; i++) {
      sizeMax = Math.max(nodes[i][prefix + 'size'], sizeMax);
      maxX = Math.max(nodes[i][prefix + 'x'], maxX);
      minX = Math.min(nodes[i][prefix + 'x'], minX);
      maxY = Math.max(nodes[i][prefix + 'y'], maxY);
      minY = Math.min(nodes[i][prefix + 'y'], minY);
    }

    sizeMax = sizeMax || 1;

    return {
      sizeMax: sizeMax,
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };
  };

  function scaleRange (value, baseMin, baseMax, limitMin, limitMax) {
    return ((limitMax - limitMin) * (value - baseMin) / (baseMax - baseMin)) + limitMin;
  };

  function rescalePosition(point, baseBox, limitBox) {
    return {
      x: scaleRange(point.x, baseBox.minX, baseBox.maxX, limitBox.minX, limitBox.maxX),
      y: scaleRange(point.y, baseBox.minY, baseBox.maxY, limitBox.minY, limitBox.maxY)
    }
  };

  /**
   * Dagre Object
   * ------------------
   */
  function dagreLayout() {
    if (typeof dagre === 'undefined')
      throw new Error('dagre is not declared');

    if (typeof dagre.graphlib === 'undefined')
      throw new Error('dagre.graphlib is not declared');

    var
      self = this,
      dg;

    this.init = function (sigInst, options) {
      options = options || {};

      if (options.nodes) {
        this.nodes = options.nodes;
        delete options.nodes;
      }

      if (options.boundingBox) {
        this.boundingBox = options.boundingBox;
        delete options.boundingBox;
      }

      // Properties
      this.sigInst = sigInst;
      this.config = sigma.utils.extend(options, settings);
      this.easing = options.easing;
      this.duration = options.duration;

      if (this.easing && (!sigma.plugins || typeof sigma.plugins.animate === 'undefined')) {
        throw new Error('sigma.plugins.animate is not declared');
      }

      // State
      this.running = false;
    };

    this.start = function() {
      if (this.running) return;

      this.running = true;

      // Create a new directed graph
      dg = new dagre.graphlib.Graph({
        directed: this.config.directed,
        multigraph: this.config.multigraph,
        compound: this.config.compound
      });

      // Set an object for the graph label
      dg.setGraph(this.config);

      var nodes = this.nodes || this.sigInst.graph.nodes();
      for (var i = 0; i < nodes.length; i++) {
        if (!nodes[i].fixed) {
          dg.setNode(nodes[i].id, {});
        }
      }

      if (this.boundingBox === true) {
        this.boundingBox = getBoundaries(nodes);
      }

      var edges = this.sigInst.graph.edges();
      for (var i = 0; i < edges.length; i++) {
        if (dg.node(edges[i].source) != null && dg.node(edges[i].target) != null) {
          dg.setEdge(edges[i].source, edges[i].target, { id: edges[i].id });
        }
      };

      _eventEmitter[self.sigInst.id].dispatchEvent('start');

      // console.time('sigma.layouts.dagre');
      dagre.layout(dg);
      // console.timeEnd('sigma.layouts.dagre');

      var edge;
      dg.edges().map(function(e) {
        edge = self.sigInst.graph.edges(dg.edge(e).id);
        edge.points = dg.edge(e).points;
      });

      this.stop();
    };

    this.stop = function() {
      if (!dg) return;

      var nodes = dg.nodes().map(function(nid) {
        return self.sigInst.graph.nodes(nid) || self.sigInst.graph.nodes(Number(nid));
      });

      var coord;

      if (this.boundingBox) {
        var baseBoundingBox = getBoundaries(dg.nodes().map(function(nid) {
          return dg.node(nid);
        }));
      }

      this.running = false;

      if (this.easing) {
        // Set new node coordinates
        for (var i = 0; i < nodes.length; i++) {
          if (this.boundingBox) {
            coord = rescalePosition(dg.node(nodes[i].id), baseBoundingBox, self.boundingBox);
            nodes[i].dagre_x = coord.x;
            nodes[i].dagre_y = coord.y;
          }
          else {
            nodes[i].dagre_x = dg.node(nodes[i].id).x;
            nodes[i].dagre_y = dg.node(nodes[i].id).y;
          }
        }

        _eventEmitter[self.sigInst.id].dispatchEvent('interpolate');
        sigma.plugins.animate(
          self.sigInst,
          {
            x: 'dagre_x',
            y: 'dagre_y'
          },
          {
            nodes: nodes,
            easing: self.easing,
            onComplete: function() {
              for (var i = 0; i < nodes.length; i++) {
                nodes[i].dagre_x = null;
                nodes[i].dagre_y = null;
              }
              _eventEmitter[self.sigInst.id].dispatchEvent('stop');
              self.sigInst.refresh();
            },
            duration: self.duration
          }
        );
      }
      else {
        // Apply changes
        var node;
        dg.nodes().forEach(function(nid) {
          node = self.sigInst.graph.nodes(nid);
          node.x = dg.node(nid).x;
          node.y = dg.node(nid).y;
        });

        _eventEmitter[self.sigInst.id].dispatchEvent('stop');
        this.sigInst.refresh();
      }
    };

    this.kill = function() {
      this.sigInst = null;
      this.config = null;
      this.easing = null;
    };
  };



  /**
   * Interface
   * ----------
   */

  /**
   * Configure the layout algorithm.

   * Recognized options:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the settings
   * object:
   *
   *   {?array}             nodes      The subset of nodes to apply the layout.
   *   {?object}           boundingBox Constrain layout bounds. Value: {minX, maxX, minY, maxY}
   *                                   or true (all current positions of the given nodes)
   *   {?boolean}           directed   If `true`, take edge direction into
   *                                   account. Default: `true`.
   *   {?boolean}           multigraph If `true`, allows multiple edges between
   *                                   the same pair of nodes. Default: `true`.
   *   {?boolean}           compound   If `true`, allows ompound nodes, i.e.
   *                                   nodes which can be the parent of other
   *                                   nodes. Default: `false`.
   *   {?string}            rankDir    Direction for rank nodes. Can be TB, BT,
   *                                   LR, or RL, where T = top, B = bottom,
   *                                   L = left, and R = right.
   *   {?(function|string)} easing     Either the name of an easing in the
   *                                   sigma.utils.easings package or a
   *                                   function. If not specified, the
   *                                   quadraticInOut easing from this package
   *                                   will be used instead.
   *   {?number}            duration   The duration of the animation. If not
   *                                   specified, the "animationsTime" setting
   *                                   value of the sigma instance will be used
   *                                   instead.
   *
   *
   * @param  {sigma}   sigInst The related sigma instance.
   * @param  {object} config  The optional configuration object.
   *
   * @return {sigma.classes.dispatcher} Returns an event emitter.
   */
  sigma.layouts.dagre.configure = function(sigInst, config) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');
    if (!config) throw new Error('Missing argument: "config"');

    // Create instance if undefined
    if (!_instance[sigInst.id]) {
      _instance[sigInst.id] = new dagreLayout();

      _eventEmitter[sigInst.id] = {};
      sigma.classes.dispatcher.extend(_eventEmitter[sigInst.id]);

      // Binding on kill to clear the references
      sigInst.bind('kill', function() {
        _instance[sigInst.id].kill();
        _instance[sigInst.id] = null;
        _eventEmitter[sigInst.id] = null;
      });
    }

    _instance[sigInst.id].init(sigInst, config);

    return _eventEmitter[sigInst.id];
  };

  /**
   * Start the layout algorithm. It will use the existing configuration if no
   * new configuration is passed.

   * Recognized options:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the settings
   * object:
   *
   *   {?array}             nodes      The subset of nodes to apply the layout.
   *   {?object}           boundingBox Constrain layout bounds. Value: {minX, maxX, minY, maxY}
   *                                   or true (all current positions of the given nodes).
   *   {?boolean}           directed   If `true`, take edge direction into
   *                                   account. Default: `true`.
   *   {?boolean}           multigraph If `true`, allows multiple edges between
   *                                   the same pair of nodes. Default: `true`.
   *   {?boolean}           compound   If `true`, allows ompound nodes, i.e.
   *                                   nodes which can be the parent of other
   *                                   nodes. Default: `false`.
   *   {?string}            rankDir    Direction for rank nodes. Can be TB, BT,
   *                                   LR, or RL, where T = top, B = bottom,
   *                                   L = left, and R = right.
   *   {?(function|string)} easing     Either the name of an easing in the
   *                                   sigma.utils.easings package or a
   *                                   function. If not specified, the
   *                                   quadraticInOut easing from this package
   *                                   will be used instead.
   *   {?number}            duration   The duration of the animation. If not
   *                                   specified, the "animationsTime" setting
   *                                   value of the sigma instance will be used
   *                                   instead.
   *
   *
   * @param  {sigma}   sigInst The related sigma instance.
   * @param  {?object} config  The optional configuration object.
   *
   * @return {sigma.classes.dispatcher} Returns an event emitter.
   */
  sigma.layouts.dagre.start = function(sigInst, config) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');

    if (config) {
      this.configure(sigInst, config);
    }

    _instance[sigInst.id].start();

    return _eventEmitter[sigInst.id];
  };

  /**
   * Returns true if the layout has started and is not completed.
   *
   * @param  {sigma}   sigInst The related sigma instance.
   *
   * @return {boolean}
   */
  sigma.layouts.dagre.isRunning = function(sigInst) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');

    return !!_instance[sigInst.id] && _instance[sigInst.id].running;
  };

}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma ForceAtlas2.5 Webworker
   * ==============================
   *
   * Author: Guillaume Plique (Yomguithereal)
   * Algorithm author: Mathieu Jacomy @ Sciences Po Medialab & WebAtlas
   * Version: 1.0.3
   */

  var _root = this,
      inWebWorker = !('document' in _root);

  /**
   * Worker Function Wrapper
   * ------------------------
   *
   * The worker has to be wrapped into a single stringified function
   * to be passed afterwards as a BLOB object to the supervisor.
   */
  var Worker = function(undefined) {
    'use strict';

    /**
     * Worker settings and properties
     */
    var W = {

      // Properties
      ppn: 10,
      ppe: 3,
      ppr: 9,
      maxForce: 10,
      iterations: 0,
      converged: false,

      // Possible to change through config
      settings: {
        linLogMode: false,
        outboundAttractionDistribution: false,
        adjustSizes: false,
        edgeWeightInfluence: 0,
        scalingRatio: 1,
        strongGravityMode: false,
        gravity: 1,
        slowDown: 1,
        barnesHutOptimize: false,
        barnesHutTheta: 0.5,
        startingIterations: 1,
        iterationsPerRender: 1
      }
    };

    var NodeMatrix,
        EdgeMatrix,
        RegionMatrix;

    /**
     * Helpers
     */
    function extend() {
      var i,
          k,
          res = {},
          l = arguments.length;

      for (i = l - 1; i >= 0; i--)
        for (k in arguments[i])
          res[k] = arguments[i][k];
      return res;
    }

    function __emptyObject(obj) {
      var k;

      for (k in obj)
        if (!('hasOwnProperty' in obj) || obj.hasOwnProperty(k))
          delete obj[k];

      return obj;
    }

    /**
     * Matrices properties accessors
     */
    var nodeProperties = {
      x: 0,
      y: 1,
      dx: 2,
      dy: 3,
      old_dx: 4,
      old_dy: 5,
      mass: 6,
      convergence: 7,
      size: 8,
      fixed: 9
    };

    var edgeProperties = {
      source: 0,
      target: 1,
      weight: 2
    };

    var regionProperties = {
      node: 0,
      centerX: 1,
      centerY: 2,
      size: 3,
      nextSibling: 4,
      firstChild: 5,
      mass: 6,
      massCenterX: 7,
      massCenterY: 8
    };

    function np(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppn) !== 0)
        throw 'np: non correct (' + i + ').';
      if (i !== parseInt(i))
        throw 'np: non int.';

      if (p in nodeProperties)
        return i + nodeProperties[p];
      else
        throw 'ForceAtlas2.Worker - ' +
              'Inexistant node property given (' + p + ').';
    }

    function ep(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppe) !== 0)
        throw 'ep: non correct (' + i + ').';
      if (i !== parseInt(i))
        throw 'ep: non int.';

      if (p in edgeProperties)
        return i + edgeProperties[p];
      else
        throw 'ForceAtlas2.Worker - ' +
              'Inexistant edge property given (' + p + ').';
    }

    function rp(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppr) !== 0)
        throw 'rp: non correct (' + i + ').';
      if (i !== parseInt(i))
        throw 'rp: non int.';

      if (p in regionProperties)
        return i + regionProperties[p];
      else
        throw 'ForceAtlas2.Worker - ' +
              'Inexistant region property given (' + p + ').';
    }

    // DEBUG
    function nan(v) {
      if (isNaN(v))
        throw 'NaN alert!';
    }


    /**
     * Algorithm initialization
     */

    function init(nodes, edges, config) {
      config = config || {};
      var i, l;

      // Matrices
      NodeMatrix = nodes;
      EdgeMatrix = edges;

      // Length
      W.nodesLength = NodeMatrix.length;
      W.edgesLength = EdgeMatrix.length;

      // Merging configuration
      configure(config);
    }

    function configure(o) {
      W.settings = extend(o, W.settings);
    }

    /**
     * Algorithm pass
     */

    // MATH: get distances stuff and power 2 issues
    function pass() {
      var a, i, j, l, r, n, n1, n2, e, w, g, k, m;

      var outboundAttCompensation,
          coefficient,
          xDist,
          yDist,
          ewc,
          mass,
          distance,
          size,
          factor;

      // 1) Initializing layout data
      //-----------------------------

      // Resetting positions & computing max values
      for (n = 0; n < W.nodesLength; n += W.ppn) {
        NodeMatrix[np(n, 'old_dx')] = NodeMatrix[np(n, 'dx')];
        NodeMatrix[np(n, 'old_dy')] = NodeMatrix[np(n, 'dy')];
        NodeMatrix[np(n, 'dx')] = 0;
        NodeMatrix[np(n, 'dy')] = 0;
      }

      // If outbound attraction distribution, compensate
      if (W.settings.outboundAttractionDistribution) {
        outboundAttCompensation = 0;
        for (n = 0; n < W.nodesLength; n += W.ppn) {
          outboundAttCompensation += NodeMatrix[np(n, 'mass')];
        }

        outboundAttCompensation /= W.nodesLength;
      }


      // 1.bis) Barnes-Hut computation
      //------------------------------

      if (W.settings.barnesHutOptimize) {

        var minX = Infinity,
            maxX = -Infinity,
            minY = Infinity,
            maxY = -Infinity,
            q, q0, q1, q2, q3;

        // Setting up
        // RegionMatrix = new Float32Array(W.nodesLength / W.ppn * 4 * W.ppr);
        RegionMatrix = [];

        // Computing min and max values
        for (n = 0; n < W.nodesLength; n += W.ppn) {
          minX = Math.min(minX, NodeMatrix[np(n, 'x')]);
          maxX = Math.max(maxX, NodeMatrix[np(n, 'x')]);
          minY = Math.min(minY, NodeMatrix[np(n, 'y')]);
          maxY = Math.max(maxY, NodeMatrix[np(n, 'y')]);
        }

        // Build the Barnes Hut root region
        RegionMatrix[rp(0, 'node')] = -1;
        RegionMatrix[rp(0, 'centerX')] = (minX + maxX) / 2;
        RegionMatrix[rp(0, 'centerY')] = (minY + maxY) / 2;
        RegionMatrix[rp(0, 'size')] = Math.max(maxX - minX, maxY - minY);
        RegionMatrix[rp(0, 'nextSibling')] = -1;
        RegionMatrix[rp(0, 'firstChild')] = -1;
        RegionMatrix[rp(0, 'mass')] = 0;
        RegionMatrix[rp(0, 'massCenterX')] = 0;
        RegionMatrix[rp(0, 'massCenterY')] = 0;

        // Add each node in the tree
        l = 1;
        for (n = 0; n < W.nodesLength; n += W.ppn) {

          // Current region, starting with root
          r = 0;

          while (true) {
            // Are there sub-regions?

            // We look at first child index
            if (RegionMatrix[rp(r, 'firstChild')] >= 0) {

              // There are sub-regions

              // We just iterate to find a "leave" of the tree
              // that is an empty region or a region with a single node
              // (see next case)

              // Find the quadrant of n
              if (NodeMatrix[np(n, 'x')] < RegionMatrix[rp(r, 'centerX')]) {

                if (NodeMatrix[np(n, 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                  // Top Left quarter
                  q = RegionMatrix[rp(r, 'firstChild')];
                }
                else {

                  // Bottom Left quarter
                  q = RegionMatrix[rp(r, 'firstChild')] + W.ppr;
                }
              }
              else {
                if (NodeMatrix[np(n, 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                  // Top Right quarter
                  q = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 2;
                }
                else {

                  // Bottom Right quarter
                  q = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 3;
                }
              }

              // Update center of mass and mass (we only do it for non-leave regions)
              RegionMatrix[rp(r, 'massCenterX')] =
                (RegionMatrix[rp(r, 'massCenterX')] * RegionMatrix[rp(r, 'mass')] +
                 NodeMatrix[np(n, 'x')] * NodeMatrix[np(n, 'mass')]) /
                (RegionMatrix[rp(r, 'mass')] + NodeMatrix[np(n, 'mass')]);

              RegionMatrix[rp(r, 'massCenterY')] =
                (RegionMatrix[rp(r, 'massCenterY')] * RegionMatrix[rp(r, 'mass')] +
                 NodeMatrix[np(n, 'y')] * NodeMatrix[np(n, 'mass')]) /
                (RegionMatrix[rp(r, 'mass')] + NodeMatrix[np(n, 'mass')]);

              RegionMatrix[rp(r, 'mass')] += NodeMatrix[np(n, 'mass')];

              // Iterate on the right quadrant
              r = q;
              continue;
            }
            else {

              // There are no sub-regions: we are in a "leave"

              // Is there a node in this leave?
              if (RegionMatrix[rp(r, 'node')] < 0) {

                // There is no node in region:
                // we record node n and go on
                RegionMatrix[rp(r, 'node')] = n;
                break;
              }
              else {

                // There is a node in this region

                // We will need to create sub-regions, stick the two
                // nodes (the old one r[0] and the new one n) in two
                // subregions. If they fall in the same quadrant,
                // we will iterate.

                // Create sub-regions
                RegionMatrix[rp(r, 'firstChild')] = l * W.ppr;
                w = RegionMatrix[rp(r, 'size')] / 2;  // new size (half)

                // NOTE: we use screen coordinates
                // from Top Left to Bottom Right

                // Top Left sub-region
                g = RegionMatrix[rp(r, 'firstChild')];

                RegionMatrix[rp(g, 'node')] = -1;
                RegionMatrix[rp(g, 'centerX')] = RegionMatrix[rp(r, 'centerX')] - w;
                RegionMatrix[rp(g, 'centerY')] = RegionMatrix[rp(r, 'centerY')] - w;
                RegionMatrix[rp(g, 'size')] = w;
                RegionMatrix[rp(g, 'nextSibling')] = g + W.ppr;
                RegionMatrix[rp(g, 'firstChild')] = -1;
                RegionMatrix[rp(g, 'mass')] = 0;
                RegionMatrix[rp(g, 'massCenterX')] = 0;
                RegionMatrix[rp(g, 'massCenterY')] = 0;

                // Bottom Left sub-region
                g += W.ppr;
                RegionMatrix[rp(g, 'node')] = -1;
                RegionMatrix[rp(g, 'centerX')] = RegionMatrix[rp(r, 'centerX')] - w;
                RegionMatrix[rp(g, 'centerY')] = RegionMatrix[rp(r, 'centerY')] + w;
                RegionMatrix[rp(g, 'size')] = w;
                RegionMatrix[rp(g, 'nextSibling')] = g + W.ppr;
                RegionMatrix[rp(g, 'firstChild')] = -1;
                RegionMatrix[rp(g, 'mass')] = 0;
                RegionMatrix[rp(g, 'massCenterX')] = 0;
                RegionMatrix[rp(g, 'massCenterY')] = 0;

                // Top Right sub-region
                g += W.ppr;
                RegionMatrix[rp(g, 'node')] = -1;
                RegionMatrix[rp(g, 'centerX')] = RegionMatrix[rp(r, 'centerX')] + w;
                RegionMatrix[rp(g, 'centerY')] = RegionMatrix[rp(r, 'centerY')] - w;
                RegionMatrix[rp(g, 'size')] = w;
                RegionMatrix[rp(g, 'nextSibling')] = g + W.ppr;
                RegionMatrix[rp(g, 'firstChild')] = -1;
                RegionMatrix[rp(g, 'mass')] = 0;
                RegionMatrix[rp(g, 'massCenterX')] = 0;
                RegionMatrix[rp(g, 'massCenterY')] = 0;

                // Bottom Right sub-region
                g += W.ppr;
                RegionMatrix[rp(g, 'node')] = -1;
                RegionMatrix[rp(g, 'centerX')] = RegionMatrix[rp(r, 'centerX')] + w;
                RegionMatrix[rp(g, 'centerY')] = RegionMatrix[rp(r, 'centerY')] + w;
                RegionMatrix[rp(g, 'size')] = w;
                RegionMatrix[rp(g, 'nextSibling')] = RegionMatrix[rp(r, 'nextSibling')];
                RegionMatrix[rp(g, 'firstChild')] = -1;
                RegionMatrix[rp(g, 'mass')] = 0;
                RegionMatrix[rp(g, 'massCenterX')] = 0;
                RegionMatrix[rp(g, 'massCenterY')] = 0;

                l += 4;

                // Now the goal is to find two different sub-regions
                // for the two nodes: the one previously recorded (r[0])
                // and the one we want to add (n)

                // Find the quadrant of the old node
                if (NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'x')] < RegionMatrix[rp(r, 'centerX')]) {
                  if (NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                    // Top Left quarter
                    q = RegionMatrix[rp(r, 'firstChild')];
                  }
                  else {

                    // Bottom Left quarter
                    q = RegionMatrix[rp(r, 'firstChild')] + W.ppr;
                  }
                }
                else {
                  if (NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                    // Top Right quarter
                    q = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 2;
                  }
                  else {

                    // Bottom Right quarter
                    q = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 3;
                  }
                }

                // We remove r[0] from the region r, add its mass to r and record it in q
                RegionMatrix[rp(r, 'mass')] = NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'mass')];
                RegionMatrix[rp(r, 'massCenterX')] = NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'x')];
                RegionMatrix[rp(r, 'massCenterY')] = NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'y')];

                RegionMatrix[rp(q, 'node')] = RegionMatrix[rp(r, 'node')];
                RegionMatrix[rp(r, 'node')] = -1;

                // Find the quadrant of n
                if (NodeMatrix[np(n, 'x')] < RegionMatrix[rp(r, 'centerX')]) {
                  if (NodeMatrix[np(n, 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                    // Top Left quarter
                    q2 = RegionMatrix[rp(r, 'firstChild')];
                  }
                  else {
                    // Bottom Left quarter
                    q2 = RegionMatrix[rp(r, 'firstChild')] + W.ppr;
                  }
                }
                else {
                  if(NodeMatrix[np(n, 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                    // Top Right quarter
                    q2 = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 2;
                  }
                  else {

                    // Bottom Right quarter
                    q2 = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 3;
                  }
                }

                if (q === q2) {

                  // If both nodes are in the same quadrant,
                  // we have to try it again on this quadrant
                  r = q;
                  continue;
                }

                // If both quadrants are different, we record n
                // in its quadrant
                RegionMatrix[rp(q2, 'node')] = n;
                break;
              }
            }
          }
        }
      }


      // 2) Repulsion
      //--------------
      // NOTES: adjustSizes = antiCollision & scalingRatio = coefficient

      if (W.settings.barnesHutOptimize) {
        coefficient = W.settings.scalingRatio;

        // Applying repulsion through regions
        for (n = 0; n < W.nodesLength; n += W.ppn) {

          // Computing leaf quad nodes iteration

          r = 0; // Starting with root region
          while (true) {

            if (RegionMatrix[rp(r, 'firstChild')] >= 0) {

              // The region has sub-regions

              // We run the Barnes Hut test to see if we are at the right distance
              distance = Math.sqrt(
                (Math.pow(NodeMatrix[np(n, 'x')] - RegionMatrix[rp(r, 'massCenterX')], 2)) +
                (Math.pow(NodeMatrix[np(n, 'y')] - RegionMatrix[rp(r, 'massCenterY')], 2))
              );

              if (2 * RegionMatrix[rp(r, 'size')] / distance < W.settings.barnesHutTheta) {

                // We treat the region as a single body, and we repulse

                xDist = NodeMatrix[np(n, 'x')] - RegionMatrix[rp(r, 'massCenterX')];
                yDist = NodeMatrix[np(n, 'y')] - RegionMatrix[rp(r, 'massCenterY')];

                if (W.settings.adjustSizes) {

                  //-- Linear Anti-collision Repulsion
                  if (distance > 0) {
                    factor = coefficient * NodeMatrix[np(n, 'mass')] *
                      RegionMatrix[rp(r, 'mass')] / distance / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                  else if (distance < 0) {
                    factor = -coefficient * NodeMatrix[np(n, 'mass')] *
                      RegionMatrix[rp(r, 'mass')] / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                }
                else {

                  //-- Linear Repulsion
                  if (distance > 0) {
                    factor = coefficient * NodeMatrix[np(n, 'mass')] *
                      RegionMatrix[rp(r, 'mass')] / distance / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                }

                // When this is done, we iterate. We have to look at the next sibling.
                if (RegionMatrix[rp(r, 'nextSibling')] < 0)
                  break;  // No next sibling: we have finished the tree
                r = RegionMatrix[rp(r, 'nextSibling')];
                continue;

              }
              else {

                // The region is too close and we have to look at sub-regions
                r = RegionMatrix[rp(r, 'firstChild')];
                continue;
              }

            }
            else {

              // The region has no sub-region
              // If there is a node r[0] and it is not n, then repulse

              if (RegionMatrix[rp(r, 'node')] >= 0 && RegionMatrix[rp(r, 'node')] !== n) {
                xDist = NodeMatrix[np(n, 'x')] - NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'x')];
                yDist = NodeMatrix[np(n, 'y')] - NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'y')];

                distance = Math.sqrt(xDist * xDist + yDist * yDist);

                if (W.settings.adjustSizes) {

                  //-- Linear Anti-collision Repulsion
                  if (distance > 0) {
                    factor = coefficient * NodeMatrix[np(n, 'mass')] *
                      NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'mass')] / distance / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                  else if (distance < 0) {
                    factor = -coefficient * NodeMatrix[np(n, 'mass')] *
                      NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'mass')] / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                }
                else {

                  //-- Linear Repulsion
                  if (distance > 0) {
                    factor = coefficient * NodeMatrix[np(n, 'mass')] *
                      NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'mass')] / distance / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                }

              }

              // When this is done, we iterate. We have to look at the next sibling.
              if (RegionMatrix[rp(r, 'nextSibling')] < 0)
                break;  // No next sibling: we have finished the tree
              r = RegionMatrix[rp(r, 'nextSibling')];
              continue;
            }
          }
        }
      }
      else {
        coefficient = W.settings.scalingRatio;

        // Square iteration
        for (n1 = 0; n1 < W.nodesLength; n1 += W.ppn) {
          for (n2 = 0; n2 < n1; n2 += W.ppn) {

            // Common to both methods
            xDist = NodeMatrix[np(n1, 'x')] - NodeMatrix[np(n2, 'x')];
            yDist = NodeMatrix[np(n1, 'y')] - NodeMatrix[np(n2, 'y')];

            if (W.settings.adjustSizes) {

              //-- Anticollision Linear Repulsion
              distance = Math.sqrt(xDist * xDist + yDist * yDist) -
                NodeMatrix[np(n1, 'size')] -
                NodeMatrix[np(n2, 'size')];

              if (distance > 0) {
                factor = coefficient *
                  NodeMatrix[np(n1, 'mass')] *
                  NodeMatrix[np(n2, 'mass')] /
                  distance / distance;

                // Updating nodes' dx and dy
                NodeMatrix[np(n1, 'dx')] += xDist * factor;
                NodeMatrix[np(n1, 'dy')] += yDist * factor;

                NodeMatrix[np(n2, 'dx')] += xDist * factor;
                NodeMatrix[np(n2, 'dy')] += yDist * factor;
              }
              else if (distance < 0) {
                factor = 100 * coefficient *
                  NodeMatrix[np(n1, 'mass')] *
                  NodeMatrix[np(n2, 'mass')];

                // Updating nodes' dx and dy
                NodeMatrix[np(n1, 'dx')] += xDist * factor;
                NodeMatrix[np(n1, 'dy')] += yDist * factor;

                NodeMatrix[np(n2, 'dx')] -= xDist * factor;
                NodeMatrix[np(n2, 'dy')] -= yDist * factor;
              }
            }
            else {

              //-- Linear Repulsion
              distance = Math.sqrt(xDist * xDist + yDist * yDist);

              if (distance > 0) {
                factor = coefficient *
                  NodeMatrix[np(n1, 'mass')] *
                  NodeMatrix[np(n2, 'mass')] /
                  distance / distance;

                // Updating nodes' dx and dy
                NodeMatrix[np(n1, 'dx')] += xDist * factor;
                NodeMatrix[np(n1, 'dy')] += yDist * factor;

                NodeMatrix[np(n2, 'dx')] -= xDist * factor;
                NodeMatrix[np(n2, 'dy')] -= yDist * factor;
              }
            }
          }
        }
      }


      // 3) Gravity
      //------------
      g = W.settings.gravity / W.settings.scalingRatio;
      coefficient = W.settings.scalingRatio;
      for (n = 0; n < W.nodesLength; n += W.ppn) {
        factor = 0;

        // Common to both methods
        xDist = NodeMatrix[np(n, 'x')];
        yDist = NodeMatrix[np(n, 'y')];
        distance = Math.sqrt(
          Math.pow(xDist, 2) + Math.pow(yDist, 2)
        );

        if (W.settings.strongGravityMode) {

          //-- Strong gravity
          if (distance > 0)
            factor = coefficient * NodeMatrix[np(n, 'mass')] * g;
        }
        else {

          //-- Linear Anti-collision Repulsion n
          if (distance > 0)
            factor = coefficient * NodeMatrix[np(n, 'mass')] * g / distance;
        }

        // Updating node's dx and dy
        NodeMatrix[np(n, 'dx')] -= xDist * factor;
        NodeMatrix[np(n, 'dy')] -= yDist * factor;
      }



      // 4) Attraction
      //---------------
      coefficient = 1 *
        (W.settings.outboundAttractionDistribution ?
          outboundAttCompensation :
          1);

      // TODO: simplify distance
      // TODO: coefficient is always used as -c --> optimize?
      for (e = 0; e < W.edgesLength; e += W.ppe) {
        n1 = EdgeMatrix[ep(e, 'source')];
        n2 = EdgeMatrix[ep(e, 'target')];
        w = EdgeMatrix[ep(e, 'weight')];

        // Edge weight influence
        ewc = Math.pow(w, W.settings.edgeWeightInfluence);

        // Common measures
        xDist = NodeMatrix[np(n1, 'x')] - NodeMatrix[np(n2, 'x')];
        yDist = NodeMatrix[np(n1, 'y')] - NodeMatrix[np(n2, 'y')];

        // Applying attraction to nodes
        if (W.settings.adjustSizes) {

          distance = Math.sqrt(
            (Math.pow(xDist, 2) + Math.pow(yDist, 2)) -
            NodeMatrix[np(n1, 'size')] -
            NodeMatrix[np(n2, 'size')]
          );

          if (W.settings.linLogMode) {
            if (W.settings.outboundAttractionDistribution) {

              //-- LinLog Degree Distributed Anti-collision Attraction
              if (distance > 0) {
                factor = -coefficient * ewc * Math.log(1 + distance) /
                distance /
                NodeMatrix[np(n1, 'mass')];
              }
            }
            else {

              //-- LinLog Anti-collision Attraction
              if (distance > 0) {
                factor = -coefficient * ewc * Math.log(1 + distance) / distance;
              }
            }
          }
          else {
            if (W.settings.outboundAttractionDistribution) {

              //-- Linear Degree Distributed Anti-collision Attraction
              if (distance > 0) {
                factor = -coefficient * ewc / NodeMatrix[np(n1, 'mass')];
              }
            }
            else {

              //-- Linear Anti-collision Attraction
              if (distance > 0) {
                factor = -coefficient * ewc;
              }
            }
          }
        }
        else {

          distance = Math.sqrt(
            Math.pow(xDist, 2) + Math.pow(yDist, 2)
          );

          if (W.settings.linLogMode) {
            if (W.settings.outboundAttractionDistribution) {

              //-- LinLog Degree Distributed Attraction
              if (distance > 0) {
                factor = -coefficient * ewc * Math.log(1 + distance) /
                  distance /
                  NodeMatrix[np(n1, 'mass')];
              }
            }
            else {

              //-- LinLog Attraction
              if (distance > 0)
                factor = -coefficient * ewc * Math.log(1 + distance) / distance;
            }
          }
          else {
            if (W.settings.outboundAttractionDistribution) {

              //-- Linear Attraction Mass Distributed
              // NOTE: Distance is set to 1 to override next condition
              distance = 1;
              factor = -coefficient * ewc / NodeMatrix[np(n1, 'mass')];
            }
            else {

              //-- Linear Attraction
              // NOTE: Distance is set to 1 to override next condition
              distance = 1;
              factor = -coefficient * ewc;
            }
          }
        }

        // Updating nodes' dx and dy
        // TODO: if condition or factor = 1?
        if (distance > 0) {

          // Updating nodes' dx and dy
          NodeMatrix[np(n1, 'dx')] += xDist * factor;
          NodeMatrix[np(n1, 'dy')] += yDist * factor;

          NodeMatrix[np(n2, 'dx')] -= xDist * factor;
          NodeMatrix[np(n2, 'dy')] -= yDist * factor;
        }
      }


      // 5) Apply Forces
      //-----------------
      var force,
          swinging,
          traction,
          nodespeed;

      // MATH: sqrt and square distances
      if (W.settings.adjustSizes) {

        for (n = 0; n < W.nodesLength; n += W.ppn) {
          if (!NodeMatrix[np(n, 'fixed')]) {
            force = Math.sqrt(
              Math.pow(NodeMatrix[np(n, 'dx')], 2) +
              Math.pow(NodeMatrix[np(n, 'dy')], 2)
            );

            if (force > W.maxForce) {
              NodeMatrix[np(n, 'dx')] =
                NodeMatrix[np(n, 'dx')] * W.maxForce / force;
              NodeMatrix[np(n, 'dy')] =
                NodeMatrix[np(n, 'dy')] * W.maxForce / force;
            }

            swinging = NodeMatrix[np(n, 'mass')] *
              Math.sqrt(
                (NodeMatrix[np(n, 'old_dx')] - NodeMatrix[np(n, 'dx')]) *
                (NodeMatrix[np(n, 'old_dx')] - NodeMatrix[np(n, 'dx')]) +
                (NodeMatrix[np(n, 'old_dy')] - NodeMatrix[np(n, 'dy')]) *
                (NodeMatrix[np(n, 'old_dy')] - NodeMatrix[np(n, 'dy')])
              );

            traction = Math.sqrt(
              (NodeMatrix[np(n, 'old_dx')] + NodeMatrix[np(n, 'dx')]) *
              (NodeMatrix[np(n, 'old_dx')] + NodeMatrix[np(n, 'dx')]) +
              (NodeMatrix[np(n, 'old_dy')] + NodeMatrix[np(n, 'dy')]) *
              (NodeMatrix[np(n, 'old_dy')] + NodeMatrix[np(n, 'dy')])
            ) / 2;

            nodespeed =
              0.1 * Math.log(1 + traction) / (1 + Math.sqrt(swinging));

            // Updating node's positon
            NodeMatrix[np(n, 'x')] =
              NodeMatrix[np(n, 'x')] + NodeMatrix[np(n, 'dx')] *
              (nodespeed / W.settings.slowDown);
            NodeMatrix[np(n, 'y')] =
              NodeMatrix[np(n, 'y')] + NodeMatrix[np(n, 'dy')] *
              (nodespeed / W.settings.slowDown);
          }
        }
      }
      else {

        for (n = 0; n < W.nodesLength; n += W.ppn) {
          if (!NodeMatrix[np(n, 'fixed')]) {

            swinging = NodeMatrix[np(n, 'mass')] *
              Math.sqrt(
                (NodeMatrix[np(n, 'old_dx')] - NodeMatrix[np(n, 'dx')]) *
                (NodeMatrix[np(n, 'old_dx')] - NodeMatrix[np(n, 'dx')]) +
                (NodeMatrix[np(n, 'old_dy')] - NodeMatrix[np(n, 'dy')]) *
                (NodeMatrix[np(n, 'old_dy')] - NodeMatrix[np(n, 'dy')])
              );

            traction = Math.sqrt(
              (NodeMatrix[np(n, 'old_dx')] + NodeMatrix[np(n, 'dx')]) *
              (NodeMatrix[np(n, 'old_dx')] + NodeMatrix[np(n, 'dx')]) +
              (NodeMatrix[np(n, 'old_dy')] + NodeMatrix[np(n, 'dy')]) *
              (NodeMatrix[np(n, 'old_dy')] + NodeMatrix[np(n, 'dy')])
            ) / 2;

            nodespeed = NodeMatrix[np(n, 'convergence')] *
              Math.log(1 + traction) / (1 + Math.sqrt(swinging));

            // Updating node convergence
            NodeMatrix[np(n, 'convergence')] =
              Math.min(1, Math.sqrt(
                nodespeed *
                (Math.pow(NodeMatrix[np(n, 'dx')], 2) +
                 Math.pow(NodeMatrix[np(n, 'dy')], 2)) /
                (1 + Math.sqrt(swinging))
              ));

            // Updating node's positon
            NodeMatrix[np(n, 'x')] =
              NodeMatrix[np(n, 'x')] + NodeMatrix[np(n, 'dx')] *
              (nodespeed / W.settings.slowDown);
            NodeMatrix[np(n, 'y')] =
              NodeMatrix[np(n, 'y')] + NodeMatrix[np(n, 'dy')] *
              (nodespeed / W.settings.slowDown);
          }
        }
      }

      // Counting one more iteration
      W.iterations++;
    }

    /**
     * Message reception & sending
     */

    // Sending data back to the supervisor
    var sendNewCoords;

    if (typeof window !== 'undefined' && window.document) {

      // From same document as sigma
      sendNewCoords = function() {
        var e;

        if (document.createEvent) {
          e = document.createEvent('Event');
          e.initEvent('newCoords', true, false);
        }
        else {
          e = document.createEventObject();
          e.eventType = 'newCoords';
        }

        e.eventName = 'newCoords';
        e.data = {
          nodes: NodeMatrix.buffer
        };
        requestAnimationFrame(function() {
          document.dispatchEvent(e);
        });
      };
    }
    else {

      // From a WebWorker
      sendNewCoords = function() {
        self.postMessage(
          {nodes: NodeMatrix.buffer},
          [NodeMatrix.buffer]
        );
      };
    }

    // Algorithm run
    function run(n) {
      for (var i = 0; i < n; i++)
        pass();
      sendNewCoords();
    }

    // On supervisor message
    var listener = function(e) {
      switch (e.data.action) {
        case 'start':
          init(
            new Float32Array(e.data.nodes),
            new Float32Array(e.data.edges),
            e.data.config
          );

          // First iteration(s)
          run(W.settings.startingIterations);
          break;

        case 'loop':
          NodeMatrix = new Float32Array(e.data.nodes);
          run(W.settings.iterationsPerRender);
          break;

        case 'config':

          // Merging new settings
          configure(e.data.config);
          break;

        case 'kill':

          // Deleting context for garbage collection
          __emptyObject(W);
          NodeMatrix = null;
          EdgeMatrix = null;
          RegionMatrix = null;
          self.removeEventListener('message', listener);
          break;

        default:
      }
    };

    // Adding event listener
    self.addEventListener('message', listener);
  };


  /**
   * Exporting
   * ----------
   *
   * Crush the worker function and make it accessible by sigma's instances so
   * the supervisor can call it.
   */
  function crush(fnString) {
    var pattern,
        i,
        l;

    var np = [
      'x',
      'y',
      'dx',
      'dy',
      'old_dx',
      'old_dy',
      'mass',
      'convergence',
      'size',
      'fixed'
    ];

    var ep = [
      'source',
      'target',
      'weight'
    ];

    var rp = [
      'node',
      'centerX',
      'centerY',
      'size',
      'nextSibling',
      'firstChild',
      'mass',
      'massCenterX',
      'massCenterY'
    ];

    // rp
    // NOTE: Must go first
    for (i = 0, l = rp.length; i < l; i++) {
      pattern = new RegExp('rp\\(([^,]*), \'' + rp[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    // np
    for (i = 0, l = np.length; i < l; i++) {
      pattern = new RegExp('np\\(([^,]*), \'' + np[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    // ep
    for (i = 0, l = ep.length; i < l; i++) {
      pattern = new RegExp('ep\\(([^,]*), \'' + ep[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    return fnString;
  }

  // Exporting
  function getWorkerFn() {
    var fnString = crush ? crush(Worker.toString()) : Worker.toString();
    return ';(' + fnString + ').call(this);';
  }

  if (inWebWorker) {
    // We are in a webworker, so we launch the Worker function
    eval(getWorkerFn());
  }
  else {
    // We are requesting the worker from sigma, we retrieve it therefore
    if (typeof sigma === 'undefined')
      throw 'sigma is not declared';

    sigma.prototype.getForceAtlas2Worker = getWorkerFn;
  }
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  /**
   * Sigma ForceAtlas2.5 Supervisor
   * ===============================
   *
   * Author: Guillaume Plique (Yomguithereal)
   * Version: 0.1
   */
  var _root = this;

  /**
   * Feature detection
   * ------------------
   */
  var webWorkers = 'Worker' in _root;

  /**
   * Supervisor Object
   * ------------------
   */
  function Supervisor(sigInst, options) {
    var _this = this,
        workerFn = sigInst.getForceAtlas2Worker &&
          sigInst.getForceAtlas2Worker();

    options = options || {};

    // _root URL Polyfill
    _root.URL = _root.URL || _root.webkitURL;

    // Properties
    this.sigInst = sigInst;
    this.graph = this.sigInst.graph;
    this.ppn = 10;
    this.ppe = 3;
    this.config = {};
    this.shouldUseWorker =
      options.worker === false ? false : true && webWorkers;
    this.workerUrl = options.workerUrl;

    // State
    this.started = false;
    this.running = false;

    // Web worker or classic DOM events?
    if (this.shouldUseWorker) {
      if (!this.workerUrl) {
        var blob = this.makeBlob(workerFn);
        this.worker = new Worker(URL.createObjectURL(blob));
      }
      else {
        this.worker = new Worker(this.workerUrl);
      }

      // Post Message Polyfill
      this.worker.postMessage =
        this.worker.webkitPostMessage || this.worker.postMessage;
    }
    else {

      eval(workerFn);
    }

    // Worker message receiver
    this.msgName = (this.worker) ? 'message' : 'newCoords';
    this.listener = function(e) {

      // Retrieving data
      _this.nodesByteArray = new Float32Array(e.data.nodes);

      // If ForceAtlas2 is running, we act accordingly
      if (_this.running) {

        // Applying layout
        _this.applyLayoutChanges();

        // Send data back to worker and loop
        _this.sendByteArrayToWorker();

        // Rendering graph
        _this.sigInst.refresh();
      }
    };

    (this.worker || document).addEventListener(this.msgName, this.listener);

    // Filling byteArrays
    this.graphToByteArrays();

    // Binding on kill to properly terminate layout when parent is killed
    sigInst.bind('kill', function() {
      sigInst.killForceAtlas2();
    });
  }

  Supervisor.prototype.makeBlob = function(workerFn) {
    var blob;

    try {
      blob = new Blob([workerFn], {type: 'application/javascript'});
    }
    catch (e) {
      _root.BlobBuilder = _root.BlobBuilder ||
                          _root.WebKitBlobBuilder ||
                          _root.MozBlobBuilder;

      blob = new BlobBuilder();
      blob.append(workerFn);
      blob = blob.getBlob();
    }

    return blob;
  };

  Supervisor.prototype.graphToByteArrays = function() {
    var nodes = this.graph.nodes(),
        edges = this.graph.edges(),
        nbytes = nodes.length * this.ppn,
        ebytes = edges.length * this.ppe,
        nIndex = {},
        i,
        j,
        l;

    // Allocating Byte arrays with correct nb of bytes
    this.nodesByteArray = new Float32Array(nbytes);
    this.edgesByteArray = new Float32Array(ebytes);

    // Iterate through nodes
    for (i = j = 0, l = nodes.length; i < l; i++) {

      // Populating index
      nIndex[nodes[i].id] = j;

      // Populating byte array
      this.nodesByteArray[j] = nodes[i].x;
      this.nodesByteArray[j + 1] = nodes[i].y;
      this.nodesByteArray[j + 2] = 0;
      this.nodesByteArray[j + 3] = 0;
      this.nodesByteArray[j + 4] = 0;
      this.nodesByteArray[j + 5] = 0;
      this.nodesByteArray[j + 6] = 1 + this.graph.degree(nodes[i].id);
      this.nodesByteArray[j + 7] = 1;
      this.nodesByteArray[j + 8] = nodes[i].size;
      this.nodesByteArray[j + 9] = 0;
      j += this.ppn;
    }

    // Iterate through edges
    for (i = j = 0, l = edges.length; i < l; i++) {
      this.edgesByteArray[j] = nIndex[edges[i].source];
      this.edgesByteArray[j + 1] = nIndex[edges[i].target];
      this.edgesByteArray[j + 2] = edges[i].weight || 0;
      j += this.ppe;
    }
  };

  // TODO: make a better send function
  Supervisor.prototype.applyLayoutChanges = function() {
    var nodes = this.graph.nodes(),
        j = 0,
        realIndex;

    // Moving nodes
    for (var i = 0, l = this.nodesByteArray.length; i < l; i += this.ppn) {
      nodes[j].x = this.nodesByteArray[i];
      nodes[j].y = this.nodesByteArray[i + 1];
      j++;
    }
  };

  Supervisor.prototype.sendByteArrayToWorker = function(action) {
    var content = {
      action: action || 'loop',
      nodes: this.nodesByteArray.buffer
    };

    var buffers = [this.nodesByteArray.buffer];

    if (action === 'start') {
      content.config = this.config || {};
      content.edges = this.edgesByteArray.buffer;
      buffers.push(this.edgesByteArray.buffer);
    }

    if (this.shouldUseWorker)
      this.worker.postMessage(content, buffers);
    else
      _root.postMessage(content, '*');
  };

  Supervisor.prototype.start = function() {
    if (this.running)
      return;

    this.running = true;

    // Do not refresh edgequadtree during layout:
    var k,
        c;
    for (k in this.sigInst.cameras) {
      c = this.sigInst.cameras[k];
      c.edgequadtree._enabled = false;
    }

    if (!this.started) {

      // Sending init message to worker
      this.sendByteArrayToWorker('start');
      this.started = true;
    }
    else {
      this.sendByteArrayToWorker();
    }
  };

  Supervisor.prototype.stop = function() {
    if (!this.running)
      return;

    // Allow to refresh edgequadtree:
    var k,
        c,
        bounds;
    for (k in this.sigInst.cameras) {
      c = this.sigInst.cameras[k];
      c.edgequadtree._enabled = true;

      // Find graph boundaries:
      bounds = sigma.utils.getBoundaries(
        this.graph,
        c.readPrefix
      );

      // Refresh edgequadtree:
      if (c.settings('drawEdges') && c.settings('enableEdgeHovering'))
        c.edgequadtree.index(this.sigInst.graph, {
          prefix: c.readPrefix,
          bounds: {
            x: bounds.minX,
            y: bounds.minY,
            width: bounds.maxX - bounds.minX,
            height: bounds.maxY - bounds.minY
          }
        });
    }

    this.running = false;
  };

  Supervisor.prototype.killWorker = function() {
    if (this.worker) {
      this.worker.terminate();
    }
    else {
      _root.postMessage({action: 'kill'}, '*');
      document.removeEventListener(this.msgName, this.listener);
    }
  };

  Supervisor.prototype.configure = function(config) {

    // Setting configuration
    this.config = config;

    if (!this.started)
      return;

    var data = {action: 'config', config: this.config};

    if (this.shouldUseWorker)
      this.worker.postMessage(data);
    else
      _root.postMessage(data, '*');
  };

  /**
   * Interface
   * ----------
   */
  sigma.prototype.startForceAtlas2 = function(config) {

    // Create supervisor if undefined
    if (!this.supervisor)
      this.supervisor = new Supervisor(this, config);

    // Configuration provided?
    if (config)
      this.supervisor.configure(config);

    // Start algorithm
    this.supervisor.start();

    return this;
  };

  sigma.prototype.stopForceAtlas2 = function() {
    if (!this.supervisor)
      return this;

    // Pause algorithm
    this.supervisor.stop();

    return this;
  };

  sigma.prototype.killForceAtlas2 = function() {
    if (!this.supervisor)
      return this;

    // Stop Algorithm
    this.supervisor.stop();

    // Kill Worker
    this.supervisor.killWorker();

    // Kill supervisor
    this.supervisor = null;

    return this;
  };

  sigma.prototype.configForceAtlas2 = function(config) {
    if (!this.supervisor)
      this.supervisor = new Supervisor(this, config);

    this.supervisor.configure(config);

    return this;
  };

  sigma.prototype.isForceAtlas2Running = function(config) {
    return !!this.supervisor && this.supervisor.running;
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.layouts');

  /**
   * Sigma ForceLink Webworker
   * ==============================
   *
   * Author: Guillaume Plique (Yomguithereal)
   * Algorithm author: Mathieu Jacomy @ Sciences Po Medialab & WebAtlas
   * Extensions author: Sébastien Heymann @ Linkurious
   * Version: 1.0.0
   */

  var _root = this,
      inWebWorker = !('document' in _root);

  /**
   * Worker Function Wrapper
   * ------------------------
   *
   * The worker has to be wrapped into a single stringified function
   * to be passed afterwards as a BLOB object to the supervisor.
   */
  var Worker = function(undefined) {
    'use strict';

    /**
     * Worker settings and properties
     */
    var W = {

      // Properties
      ppn: 10,
      ppe: 3,
      ppr: 9,
      maxForce: 10,
      iterations: 0,
      converged: false,

      // Possible to change through config
      settings: {
        // force atlas 2:
        linLogMode: false,
        outboundAttractionDistribution: false,
        adjustSizes: false,
        edgeWeightInfluence: 0,
        scalingRatio: 1,
        strongGravityMode: false,
        gravity: 1,
        slowDown: 1,
        barnesHutOptimize: false,
        barnesHutTheta: 0.5,
        startingIterations: 1,
        iterationsPerRender: 1,
        // stopping condition:
        maxIterations: 1000,
        avgDistanceThreshold: 0.01,
        autoStop: false,
        // node siblings:
        alignNodeSiblings: false,
        nodeSiblingsScale: 1,
        nodeSiblingsAngleMin: 0
      }
    };

    var NodeMatrix,
        EdgeMatrix,
        RegionMatrix;

    /**
     * Helpers
     */
    function extend() {
      var i,
          k,
          res = {},
          l = arguments.length;

      for (i = l - 1; i >= 0; i--)
        for (k in arguments[i])
          res[k] = arguments[i][k];
      return res;
    }

    function __emptyObject(obj) {
      var k;

      for (k in obj)
        if (!('hasOwnProperty' in obj) || obj.hasOwnProperty(k))
          delete obj[k];

      return obj;
    }

    /**
     * Return the euclidian distance between two points of a plane
     * with an orthonormal basis.
     *
     * @param  {number} x1  The X coordinate of the first point.
     * @param  {number} y1  The Y coordinate of the first point.
     * @param  {number} x2  The X coordinate of the second point.
     * @param  {number} y2  The Y coordinate of the second point.
     * @return {number}     The euclidian distance.
     */
    function getDistance(x0, y0, x1, y1) {
      return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
    };

    /**
     * Return the coordinates of the intersection points of two circles.
     *
     * @param  {number} x0  The X coordinate of center location of the first
     *                      circle.
     * @param  {number} y0  The Y coordinate of center location of the first
     *                      circle.
     * @param  {number} r0  The radius of the first circle.
     * @param  {number} x1  The X coordinate of center location of the second
     *                      circle.
     * @param  {number} y1  The Y coordinate of center location of the second
     *                      circle.
     * @param  {number} r1  The radius of the second circle.
     * @return {xi,yi}      The coordinates of the intersection points.
     */
    function getCircleIntersection(x0, y0, r0, x1, y1, r1) {
      // http://stackoverflow.com/a/12219802
      var a, dx, dy, d, h, rx, ry, x2, y2;

      // dx and dy are the vertical and horizontal distances between the circle
      // centers:
      dx = x1 - x0;
      dy = y1 - y0;

      // Determine the straight-line distance between the centers:
      d = Math.sqrt((dy * dy) + (dx * dx));

      // Check for solvability:
      if (d > (r0 + r1)) {
          // No solution. circles do not intersect.
          return false;
      }
      if (d < Math.abs(r0 - r1)) {
          // No solution. one circle is contained in the other.
          return false;
      }

      //'point 2' is the point where the line through the circle intersection
      // points crosses the line between the circle centers.

      // Determine the distance from point 0 to point 2:
      a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);

      // Determine the coordinates of point 2:
      x2 = x0 + (dx * a / d);
      y2 = y0 + (dy * a / d);

      // Determine the distance from point 2 to either of the intersection
      // points:
      h = Math.sqrt((r0 * r0) - (a * a));

      // Determine the offsets of the intersection points from point 2:
      rx = -dy * (h / d);
      ry = dx * (h / d);

      // Determine the absolute intersection points:
      var xi = x2 + rx;
      var xi_prime = x2 - rx;
      var yi = y2 + ry;
      var yi_prime = y2 - ry;

      return {xi: xi, xi_prime: xi_prime, yi: yi, yi_prime: yi_prime};
    };

    /**
     * Find the intersection between two lines, two segments, or one line and one segment.
     * http://jsfiddle.net/justin_c_rounds/Gd2S2/
     *
     * @param  {number} line1x1  The X coordinate of the start point of the first line.
     * @param  {number} line1y1  The Y coordinate of the start point of the first line.
     * @param  {number} line1x2  The X coordinate of the end point of the first line.
     * @param  {number} line1y2  The Y coordinate of the end point of the first line.v
     * @param  {number} line2x1  The X coordinate of the start point of the second line.
     * @param  {number} line2y1  The Y coordinate of the start point of the second line.
     * @param  {number} line2x2  The X coordinate of the end point of the second line.
     * @param  {number} line2y2  The Y coordinate of the end point of the second line.
     * @return {object}           The coordinates of the intersection point.
     */
    function getLinesIntersection(line1x1, line1y1, line1x2, line1y2, line2x1, line2y1, line2x2, line2y2) {
      // if the lines intersect, the result contains the x and y of the intersection
      // (treating the lines as infinite) and booleans for whether line segment 1 or
      // line segment 2 contain the point
      var
        denominator,
        a,
        b,
        numerator1,
        numerator2,
        result = {
          x: null,
          y: null,
          onLine1: false,
          onLine2: false
      };

      denominator =
        ((line2y2 - line2y1) * (line1x2 - line1x1)) -
        ((line2x2 - line2x1) * (line1y2 - line1y1));

      if (denominator == 0) {
          return result;
      }

      a = line1y1 - line2y1;
      b = line1x1 - line2x1;

      numerator1 = ((line2x2 - line2x1) * a) - ((line2y2 - line2y1) * b);
      numerator2 = ((line1x2 - line1x1) * a) - ((line1y2 - line1y1) * b);

      a = numerator1 / denominator;
      b = numerator2 / denominator;

      // if we cast these lines infinitely in both directions, they intersect here:
      result.x = line1x1 + (a * (line1x2 - line1x1));
      result.y = line1y1 + (a * (line1y2 - line1y1));
      /*
      // it is worth noting that this should be the same as:
        x = line2x1 + (b * (line2x2 - line2x1));
        y = line2x1 + (b * (line2y2 - line2y1));
      */
      // if line1 is a segment and line2 is infinite, they intersect if:
      if (a > 0 && a < 1) {
          result.onLine1 = true;
      }
      // if line2 is a segment and line1 is infinite, they intersect if:
      if (b > 0 && b < 1) {
          result.onLine2 = true;
      }
      // if line1 and line2 are segments, they intersect if both of the above are true
      return result;
    };

    /**
     * Scale a value from the range [baseMin, baseMax] to the range
     * [limitMin, limitMax].
     *
     * @param  {number} value    The value to rescale.
     * @param  {number} baseMin  The min value of the range of origin.
     * @param  {number} baseMax  The max value of the range of origin.
     * @param  {number} limitMin The min value of the range of destination.
     * @param  {number} limitMax The max value of the range of destination.
     * @return {number}          The scaled value.
     */
    function scaleRange(value, baseMin, baseMax, limitMin, limitMax) {
      return ((limitMax - limitMin) * (value - baseMin) / (baseMax - baseMin)) + limitMin;
    };

    /**
     * Get the angle of the vector (in radian).
     *
     * @param  {object} v  The 2d vector with x,y coordinates.
     * @return {number}    The angle of the vector  (in radian).
     */
    function getVectorAngle(v) {
      return Math.acos( v.x / Math.sqrt(v.x * v.x + v.y * v.y) );
    };

    /**
     * Get the normal vector of the line segment, i.e. the vector
     * orthogonal to the line.
     * http://stackoverflow.com/a/1243614/
     *
     * @param  {number} aX The x coorinates of the start point.
     * @param  {number} aY The y coorinates of the start point.
     * @param  {number} bX The x coorinates of the end point.
     * @param  {number} bY The y coorinates of the end point.
     * @return {object}    The 2d vector with (xi,yi), (xi_prime,yi_prime) coordinates.
     */
    function getNormalVector(aX, aY, bX, bY) {
      return {
        xi:       -(bY - aY),
        yi:         bX - aX,
        xi_prime:   bY - aY,
        yi_prime: -(bX - aX)
      };
    };

    /**
     * Get the normalized vector.
     *
     * @param  {object} v      The 2d vector with (xi,yi), (xi_prime,yi_prime) coordinates.
     * @param  {number} length The vector length.
     * @return {object}        The normalized vector
     */
    function getNormalizedVector(v, length) {
      return {
        x: (v.xi_prime - v.xi) / length,
        y: (v.yi_prime - v.yi) / length,
      };
    };

    /**
     * Get the a point the line segment [A,B] at a specified distance percentage
     * from the start point.
     *
     * @param  {number} aX The x coorinates of the start point.
     * @param  {number} aY The y coorinates of the start point.
     * @param  {number} bX The x coorinates of the end point.
     * @param  {number} bY The y coorinates of the end point.
     * @param  {number} t  The distance percentage from the start point.
     * @return {object}    The (x,y) coordinates of the point.
     */
    function getPointOnLineSegment(aX, aY, bX, bY, t) {
      return {
        x: aX + (bX - aX) * t,
        y: aY + (bY - aY) * t
      };
    }



    /**
     * Matrices properties accessors
     */
    var nodeProperties = {
      x: 0,
      y: 1,
      dx: 2,
      dy: 3,
      old_dx: 4,
      old_dy: 5,
      mass: 6,
      convergence: 7,
      size: 8,
      fixed: 9
    };

    var edgeProperties = {
      source: 0,
      target: 1,
      weight: 2
    };

    var regionProperties = {
      node: 0,
      centerX: 1,
      centerY: 2,
      size: 3,
      nextSibling: 4,
      firstChild: 5,
      mass: 6,
      massCenterX: 7,
      massCenterY: 8
    };

    function np(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppn) !== 0)
        throw new Error('Invalid argument in np: "i" is not correct (' + i + ').');
      if (i !== parseInt(i))
        throw new TypeError('Invalid argument in np: "i" is not an integer.');

      if (p in nodeProperties)
        return i + nodeProperties[p];
      else
        throw new Error('ForceLink.Worker - ' +
              'Inexistant node property given (' + p + ').');
    }

    function ep(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppe) !== 0)
        throw new Error('Invalid argument in ep: "i" is not correct (' + i + ').');
      if (i !== parseInt(i))
        throw new TypeError('Invalid argument in ep: "i" is not an integer.');

      if (p in edgeProperties)
        return i + edgeProperties[p];
      else
        throw new Error('ForceLink.Worker - ' +
              'Inexistant edge property given (' + p + ').');
    }

    function rp(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppr) !== 0)
        throw new Error('Invalid argument in rp: "i" is not correct (' + i + ').');
      if (i !== parseInt(i))
        throw new TypeError('Invalid argument in rp: "i" is not an integer.');

      if (p in regionProperties)
        return i + regionProperties[p];
      else
        throw new Error('ForceLink.Worker - ' +
              'Inexistant region property given (' + p + ').');
    }

    // DEBUG
    function nan(v) {
      if (isNaN(v))
        throw new TypeError('NaN alert!');
    }


    /**
     * Algorithm initialization
     */

    function init(nodes, edges, config) {
      config = config || {};
      var i, l;

      // Matrices
      NodeMatrix = nodes;
      EdgeMatrix = edges;

      // Length
      W.nodesLength = NodeMatrix.length;
      W.edgesLength = EdgeMatrix.length;

      // Merging configuration
      configure(config);
    }

    function configure(o) {
      W.settings = extend(o, W.settings);
    }

    /**
     * Algorithm pass
     */

    // MATH: get distances stuff and power 2 issues
    function pass() {
      var a, i, j, l, r, n, n1, n2, e, w, g, k, m;

      var outboundAttCompensation,
          coefficient,
          xDist,
          yDist,
          oldxDist,
          oldyDist,
          ewc,
          mass,
          distance,
          size,
          factor;

      // 1) Initializing layout data
      //-----------------------------

      // Resetting positions & computing max values
      for (n = 0; n < W.nodesLength; n += W.ppn) {
        NodeMatrix[np(n, 'old_dx')] = NodeMatrix[np(n, 'dx')];
        NodeMatrix[np(n, 'old_dy')] = NodeMatrix[np(n, 'dy')];
        NodeMatrix[np(n, 'dx')] = 0;
        NodeMatrix[np(n, 'dy')] = 0;
      }

      // If outbound attraction distribution, compensate
      if (W.settings.outboundAttractionDistribution) {
        outboundAttCompensation = 0;
        for (n = 0; n < W.nodesLength; n += W.ppn) {
          outboundAttCompensation += NodeMatrix[np(n, 'mass')];
        }

        outboundAttCompensation /= W.nodesLength;
      }


      // 1.bis) Barnes-Hut computation
      //------------------------------

      if (W.settings.barnesHutOptimize) {

        var minX = Infinity,
            maxX = -Infinity,
            minY = Infinity,
            maxY = -Infinity,
            q, q0, q1, q2, q3;

        // Setting up
        // RegionMatrix = new Float32Array(W.nodesLength / W.ppn * 4 * W.ppr);
        RegionMatrix = [];

        // Computing min and max values
        for (n = 0; n < W.nodesLength; n += W.ppn) {
          minX = Math.min(minX, NodeMatrix[np(n, 'x')]);
          maxX = Math.max(maxX, NodeMatrix[np(n, 'x')]);
          minY = Math.min(minY, NodeMatrix[np(n, 'y')]);
          maxY = Math.max(maxY, NodeMatrix[np(n, 'y')]);
        }

        // Build the Barnes Hut root region
        RegionMatrix[rp(0, 'node')] = -1;
        RegionMatrix[rp(0, 'centerX')] = (minX + maxX) / 2;
        RegionMatrix[rp(0, 'centerY')] = (minY + maxY) / 2;
        RegionMatrix[rp(0, 'size')] = Math.max(maxX - minX, maxY - minY);
        RegionMatrix[rp(0, 'nextSibling')] = -1;
        RegionMatrix[rp(0, 'firstChild')] = -1;
        RegionMatrix[rp(0, 'mass')] = 0;
        RegionMatrix[rp(0, 'massCenterX')] = 0;
        RegionMatrix[rp(0, 'massCenterY')] = 0;

        // Add each node in the tree
        l = 1;
        for (n = 0; n < W.nodesLength; n += W.ppn) {

          // Current region, starting with root
          r = 0;

          while (true) {
            // Are there sub-regions?

            // We look at first child index
            if (RegionMatrix[rp(r, 'firstChild')] >= 0) {

              // There are sub-regions

              // We just iterate to find a "leave" of the tree
              // that is an empty region or a region with a single node
              // (see next case)

              // Find the quadrant of n
              if (NodeMatrix[np(n, 'x')] < RegionMatrix[rp(r, 'centerX')]) {

                if (NodeMatrix[np(n, 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                  // Top Left quarter
                  q = RegionMatrix[rp(r, 'firstChild')];
                }
                else {

                  // Bottom Left quarter
                  q = RegionMatrix[rp(r, 'firstChild')] + W.ppr;
                }
              }
              else {
                if (NodeMatrix[np(n, 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                  // Top Right quarter
                  q = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 2;
                }
                else {

                  // Bottom Right quarter
                  q = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 3;
                }
              }

              // Update center of mass and mass (we only do it for non-leave regions)
              RegionMatrix[rp(r, 'massCenterX')] =
                (RegionMatrix[rp(r, 'massCenterX')] * RegionMatrix[rp(r, 'mass')] +
                 NodeMatrix[np(n, 'x')] * NodeMatrix[np(n, 'mass')]) /
                (RegionMatrix[rp(r, 'mass')] + NodeMatrix[np(n, 'mass')]);

              RegionMatrix[rp(r, 'massCenterY')] =
                (RegionMatrix[rp(r, 'massCenterY')] * RegionMatrix[rp(r, 'mass')] +
                 NodeMatrix[np(n, 'y')] * NodeMatrix[np(n, 'mass')]) /
                (RegionMatrix[rp(r, 'mass')] + NodeMatrix[np(n, 'mass')]);

              RegionMatrix[rp(r, 'mass')] += NodeMatrix[np(n, 'mass')];

              // Iterate on the right quadrant
              r = q;
              continue;
            }
            else {

              // There are no sub-regions: we are in a "leave"

              // Is there a node in this leave?
              if (RegionMatrix[rp(r, 'node')] < 0) {

                // There is no node in region:
                // we record node n and go on
                RegionMatrix[rp(r, 'node')] = n;
                break;
              }
              else {

                // There is a node in this region

                // We will need to create sub-regions, stick the two
                // nodes (the old one r[0] and the new one n) in two
                // subregions. If they fall in the same quadrant,
                // we will iterate.

                // Create sub-regions
                RegionMatrix[rp(r, 'firstChild')] = l * W.ppr;
                w = RegionMatrix[rp(r, 'size')] / 2;  // new size (half)

                // NOTE: we use screen coordinates
                // from Top Left to Bottom Right

                // Top Left sub-region
                g = RegionMatrix[rp(r, 'firstChild')];

                RegionMatrix[rp(g, 'node')] = -1;
                RegionMatrix[rp(g, 'centerX')] = RegionMatrix[rp(r, 'centerX')] - w;
                RegionMatrix[rp(g, 'centerY')] = RegionMatrix[rp(r, 'centerY')] - w;
                RegionMatrix[rp(g, 'size')] = w;
                RegionMatrix[rp(g, 'nextSibling')] = g + W.ppr;
                RegionMatrix[rp(g, 'firstChild')] = -1;
                RegionMatrix[rp(g, 'mass')] = 0;
                RegionMatrix[rp(g, 'massCenterX')] = 0;
                RegionMatrix[rp(g, 'massCenterY')] = 0;

                // Bottom Left sub-region
                g += W.ppr;
                RegionMatrix[rp(g, 'node')] = -1;
                RegionMatrix[rp(g, 'centerX')] = RegionMatrix[rp(r, 'centerX')] - w;
                RegionMatrix[rp(g, 'centerY')] = RegionMatrix[rp(r, 'centerY')] + w;
                RegionMatrix[rp(g, 'size')] = w;
                RegionMatrix[rp(g, 'nextSibling')] = g + W.ppr;
                RegionMatrix[rp(g, 'firstChild')] = -1;
                RegionMatrix[rp(g, 'mass')] = 0;
                RegionMatrix[rp(g, 'massCenterX')] = 0;
                RegionMatrix[rp(g, 'massCenterY')] = 0;

                // Top Right sub-region
                g += W.ppr;
                RegionMatrix[rp(g, 'node')] = -1;
                RegionMatrix[rp(g, 'centerX')] = RegionMatrix[rp(r, 'centerX')] + w;
                RegionMatrix[rp(g, 'centerY')] = RegionMatrix[rp(r, 'centerY')] - w;
                RegionMatrix[rp(g, 'size')] = w;
                RegionMatrix[rp(g, 'nextSibling')] = g + W.ppr;
                RegionMatrix[rp(g, 'firstChild')] = -1;
                RegionMatrix[rp(g, 'mass')] = 0;
                RegionMatrix[rp(g, 'massCenterX')] = 0;
                RegionMatrix[rp(g, 'massCenterY')] = 0;

                // Bottom Right sub-region
                g += W.ppr;
                RegionMatrix[rp(g, 'node')] = -1;
                RegionMatrix[rp(g, 'centerX')] = RegionMatrix[rp(r, 'centerX')] + w;
                RegionMatrix[rp(g, 'centerY')] = RegionMatrix[rp(r, 'centerY')] + w;
                RegionMatrix[rp(g, 'size')] = w;
                RegionMatrix[rp(g, 'nextSibling')] = RegionMatrix[rp(r, 'nextSibling')];
                RegionMatrix[rp(g, 'firstChild')] = -1;
                RegionMatrix[rp(g, 'mass')] = 0;
                RegionMatrix[rp(g, 'massCenterX')] = 0;
                RegionMatrix[rp(g, 'massCenterY')] = 0;

                l += 4;

                // Now the goal is to find two different sub-regions
                // for the two nodes: the one previously recorded (r[0])
                // and the one we want to add (n)

                // Find the quadrant of the old node
                if (NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'x')] < RegionMatrix[rp(r, 'centerX')]) {
                  if (NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                    // Top Left quarter
                    q = RegionMatrix[rp(r, 'firstChild')];
                  }
                  else {

                    // Bottom Left quarter
                    q = RegionMatrix[rp(r, 'firstChild')] + W.ppr;
                  }
                }
                else {
                  if (NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                    // Top Right quarter
                    q = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 2;
                  }
                  else {

                    // Bottom Right quarter
                    q = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 3;
                  }
                }

                // We remove r[0] from the region r, add its mass to r and record it in q
                RegionMatrix[rp(r, 'mass')] = NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'mass')];
                RegionMatrix[rp(r, 'massCenterX')] = NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'x')];
                RegionMatrix[rp(r, 'massCenterY')] = NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'y')];

                RegionMatrix[rp(q, 'node')] = RegionMatrix[rp(r, 'node')];
                RegionMatrix[rp(r, 'node')] = -1;

                // Find the quadrant of n
                if (NodeMatrix[np(n, 'x')] < RegionMatrix[rp(r, 'centerX')]) {
                  if (NodeMatrix[np(n, 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                    // Top Left quarter
                    q2 = RegionMatrix[rp(r, 'firstChild')];
                  }
                  else {
                    // Bottom Left quarter
                    q2 = RegionMatrix[rp(r, 'firstChild')] + W.ppr;
                  }
                }
                else {
                  if(NodeMatrix[np(n, 'y')] < RegionMatrix[rp(r, 'centerY')]) {

                    // Top Right quarter
                    q2 = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 2;
                  }
                  else {

                    // Bottom Right quarter
                    q2 = RegionMatrix[rp(r, 'firstChild')] + W.ppr * 3;
                  }
                }

                if (q === q2) {

                  // If both nodes are in the same quadrant,
                  // we have to try it again on this quadrant
                  r = q;
                  continue;
                }

                // If both quadrants are different, we record n
                // in its quadrant
                RegionMatrix[rp(q2, 'node')] = n;
                break;
              }
            }
          }
        }
      }


      // 2) Repulsion
      //--------------
      // NOTES: adjustSizes = antiCollision & scalingRatio = coefficient

      if (W.settings.barnesHutOptimize) {
        coefficient = W.settings.scalingRatio;

        // Applying repulsion through regions
        for (n = 0; n < W.nodesLength; n += W.ppn) {

          // Computing leaf quad nodes iteration

          r = 0; // Starting with root region
          while (true) {

            if (RegionMatrix[rp(r, 'firstChild')] >= 0) {

              // The region has sub-regions

              // We run the Barnes Hut test to see if we are at the right distance
              distance = Math.sqrt(
                (NodeMatrix[np(n, 'x')] - RegionMatrix[rp(r, 'massCenterX')]) *
                (NodeMatrix[np(n, 'x')] - RegionMatrix[rp(r, 'massCenterX')]) +
                (NodeMatrix[np(n, 'y')] - RegionMatrix[rp(r, 'massCenterY')]) *
                (NodeMatrix[np(n, 'y')] - RegionMatrix[rp(r, 'massCenterY')])
              );

              if (2 * RegionMatrix[rp(r, 'size')] / distance < W.settings.barnesHutTheta) {

                // We treat the region as a single body, and we repulse

                xDist = NodeMatrix[np(n, 'x')] - RegionMatrix[rp(r, 'massCenterX')];
                yDist = NodeMatrix[np(n, 'y')] - RegionMatrix[rp(r, 'massCenterY')];

                if (W.settings.adjustSizes) {

                  //-- Linear Anti-collision Repulsion
                  if (distance > 0) {
                    factor = coefficient * NodeMatrix[np(n, 'mass')] *
                      RegionMatrix[rp(r, 'mass')] / distance / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                  else if (distance < 0) {
                    factor = -coefficient * NodeMatrix[np(n, 'mass')] *
                      RegionMatrix[rp(r, 'mass')] / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                }
                else {

                  //-- Linear Repulsion
                  if (distance > 0) {
                    factor = coefficient * NodeMatrix[np(n, 'mass')] *
                      RegionMatrix[rp(r, 'mass')] / distance / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                }

                // When this is done, we iterate. We have to look at the next sibling.
                if (RegionMatrix[rp(r, 'nextSibling')] < 0)
                  break;  // No next sibling: we have finished the tree
                r = RegionMatrix[rp(r, 'nextSibling')];
                continue;

              }
              else {

                // The region is too close and we have to look at sub-regions
                r = RegionMatrix[rp(r, 'firstChild')];
                continue;
              }

            }
            else {

              // The region has no sub-region
              // If there is a node r[0] and it is not n, then repulse

              if (RegionMatrix[rp(r, 'node')] >= 0 && RegionMatrix[rp(r, 'node')] !== n) {
                xDist = NodeMatrix[np(n, 'x')] - NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'x')];
                yDist = NodeMatrix[np(n, 'y')] - NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'y')];

                distance = Math.sqrt(xDist * xDist + yDist * yDist);

                if (W.settings.adjustSizes) {

                  //-- Linear Anti-collision Repulsion
                  if (distance > 0) {
                    factor = coefficient * NodeMatrix[np(n, 'mass')] *
                      NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'mass')] / distance / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                  else if (distance < 0) {
                    factor = -coefficient * NodeMatrix[np(n, 'mass')] *
                      NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'mass')] / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                }
                else {

                  //-- Linear Repulsion
                  if (distance > 0) {
                    factor = coefficient * NodeMatrix[np(n, 'mass')] *
                      NodeMatrix[np(RegionMatrix[rp(r, 'node')], 'mass')] / distance / distance;

                    NodeMatrix[np(n, 'dx')] += xDist * factor;
                    NodeMatrix[np(n, 'dy')] += yDist * factor;
                  }
                }

              }

              // When this is done, we iterate. We have to look at the next sibling.
              if (RegionMatrix[rp(r, 'nextSibling')] < 0)
                break;  // No next sibling: we have finished the tree
              r = RegionMatrix[rp(r, 'nextSibling')];
              continue;
            }
          }
        }
      }
      else {
        coefficient = W.settings.scalingRatio;

        // Square iteration
        for (n1 = 0; n1 < W.nodesLength; n1 += W.ppn) {
          for (n2 = 0; n2 < n1; n2 += W.ppn) {

            // Common to both methods
            xDist = NodeMatrix[np(n1, 'x')] - NodeMatrix[np(n2, 'x')];
            yDist = NodeMatrix[np(n1, 'y')] - NodeMatrix[np(n2, 'y')];

            if (W.settings.adjustSizes) {

              //-- Anticollision Linear Repulsion
              distance = Math.sqrt(xDist * xDist + yDist * yDist) -
                NodeMatrix[np(n1, 'size')] -
                NodeMatrix[np(n2, 'size')];

              if (distance > 0) {
                factor = coefficient *
                  NodeMatrix[np(n1, 'mass')] *
                  NodeMatrix[np(n2, 'mass')] /
                  distance / distance;

                // Updating nodes' dx and dy
                NodeMatrix[np(n1, 'dx')] += xDist * factor;
                NodeMatrix[np(n1, 'dy')] += yDist * factor;

                NodeMatrix[np(n2, 'dx')] += xDist * factor;
                NodeMatrix[np(n2, 'dy')] += yDist * factor;
              }
              else if (distance < 0) {
                factor = 100 * coefficient *
                  NodeMatrix[np(n1, 'mass')] *
                  NodeMatrix[np(n2, 'mass')];

                // Updating nodes' dx and dy
                NodeMatrix[np(n1, 'dx')] += xDist * factor;
                NodeMatrix[np(n1, 'dy')] += yDist * factor;

                NodeMatrix[np(n2, 'dx')] -= xDist * factor;
                NodeMatrix[np(n2, 'dy')] -= yDist * factor;
              }
            }
            else {

              //-- Linear Repulsion
              distance = Math.sqrt(xDist * xDist + yDist * yDist);

              if (distance > 0) {
                factor = coefficient *
                  NodeMatrix[np(n1, 'mass')] *
                  NodeMatrix[np(n2, 'mass')] /
                  distance / distance;

                // Updating nodes' dx and dy
                NodeMatrix[np(n1, 'dx')] += xDist * factor;
                NodeMatrix[np(n1, 'dy')] += yDist * factor;

                NodeMatrix[np(n2, 'dx')] -= xDist * factor;
                NodeMatrix[np(n2, 'dy')] -= yDist * factor;
              }
            }
          }
        }
      }


      // 3) Gravity
      //------------
      g = W.settings.gravity / W.settings.scalingRatio;
      coefficient = W.settings.scalingRatio;
      for (n = 0; n < W.nodesLength; n += W.ppn) {
        factor = 0;

        // Common to both methods
        xDist = NodeMatrix[np(n, 'x')];
        yDist = NodeMatrix[np(n, 'y')];
        distance = Math.sqrt(xDist * xDist + yDist * yDist);

        if (W.settings.strongGravityMode) {

          //-- Strong gravity
          if (distance > 0)
            factor = coefficient * NodeMatrix[np(n, 'mass')] * g;
        }
        else {

          //-- Linear Anti-collision Repulsion n
          if (distance > 0)
            factor = coefficient * NodeMatrix[np(n, 'mass')] * g / distance;
        }

        // Updating node's dx and dy
        NodeMatrix[np(n, 'dx')] -= xDist * factor;
        NodeMatrix[np(n, 'dy')] -= yDist * factor;
      }



      // 4) Attraction
      //---------------
      coefficient = 1 *
        (W.settings.outboundAttractionDistribution ?
          outboundAttCompensation :
          1);

      // TODO: simplify distance
      // TODO: coefficient is always used as -c --> optimize?
      for (e = 0; e < W.edgesLength; e += W.ppe) {
        n1 = EdgeMatrix[ep(e, 'source')];
        n2 = EdgeMatrix[ep(e, 'target')];
        w = EdgeMatrix[ep(e, 'weight')];

        // Edge weight influence
        ewc = Math.pow(w, W.settings.edgeWeightInfluence);

        // Common measures
        xDist = NodeMatrix[np(n1, 'x')] - NodeMatrix[np(n2, 'x')];
        yDist = NodeMatrix[np(n1, 'y')] - NodeMatrix[np(n2, 'y')];

        // Applying attraction to nodes
        if (W.settings.adjustSizes) {

          distance = Math.sqrt(
            (xDist * xDist + yDist * yDist) -
            NodeMatrix[np(n1, 'size')] -
            NodeMatrix[np(n2, 'size')]
          );

          if (W.settings.linLogMode) {
            if (W.settings.outboundAttractionDistribution) {

              //-- LinLog Degree Distributed Anti-collision Attraction
              if (distance > 0) {
                factor = -coefficient * ewc * Math.log(1 + distance) /
                distance /
                NodeMatrix[np(n1, 'mass')];
              }
            }
            else {

              //-- LinLog Anti-collision Attraction
              if (distance > 0) {
                factor = -coefficient * ewc * Math.log(1 + distance) / distance;
              }
            }
          }
          else {
            if (W.settings.outboundAttractionDistribution) {

              //-- Linear Degree Distributed Anti-collision Attraction
              if (distance > 0) {
                factor = -coefficient * ewc / NodeMatrix[np(n1, 'mass')];
              }
            }
            else {

              //-- Linear Anti-collision Attraction
              if (distance > 0) {
                factor = -coefficient * ewc;
              }
            }
          }
        }
        else {

          distance = Math.sqrt(xDist * xDist + yDist * yDist);

          if (W.settings.linLogMode) {
            if (W.settings.outboundAttractionDistribution) {

              //-- LinLog Degree Distributed Attraction
              if (distance > 0) {
                factor = -coefficient * ewc * Math.log(1 + distance) /
                  distance /
                  NodeMatrix[np(n1, 'mass')];
              }
            }
            else {

              //-- LinLog Attraction
              if (distance > 0)
                factor = -coefficient * ewc * Math.log(1 + distance) / distance;
            }
          }
          else {
            if (W.settings.outboundAttractionDistribution) {

              //-- Linear Attraction Mass Distributed
              // NOTE: Distance is set to 1 to override next condition
              distance = 1;
              factor = -coefficient * ewc / NodeMatrix[np(n1, 'mass')];
            }
            else {

              //-- Linear Attraction
              // NOTE: Distance is set to 1 to override next condition
              distance = 1;
              factor = -coefficient * ewc;
            }
          }
        }

        // Updating nodes' dx and dy
        // TODO: if condition or factor = 1?
        if (distance > 0) {

          // Updating nodes' dx and dy
          NodeMatrix[np(n1, 'dx')] += xDist * factor;
          NodeMatrix[np(n1, 'dy')] += yDist * factor;

          NodeMatrix[np(n2, 'dx')] -= xDist * factor;
          NodeMatrix[np(n2, 'dy')] -= yDist * factor;
        }
      }


      // 5) Apply Forces
      //-----------------
      var force,
          swinging,
          traction,
          nodespeed,
          alldistance = 0;

      // MATH: sqrt and square distances
      if (W.settings.adjustSizes) {

        for (n = 0; n < W.nodesLength; n += W.ppn) {
          if (!NodeMatrix[np(n, 'fixed')]) {
            force = Math.sqrt(
              NodeMatrix[np(n, 'dx')] * NodeMatrix[np(n, 'dx')] +
              NodeMatrix[np(n, 'dy')] * NodeMatrix[np(n, 'dy')]
            );

            if (force > W.maxForce) {
              NodeMatrix[np(n, 'dx')] =
                NodeMatrix[np(n, 'dx')] * W.maxForce / force;
              NodeMatrix[np(n, 'dy')] =
                NodeMatrix[np(n, 'dy')] * W.maxForce / force;
            }

            swinging = NodeMatrix[np(n, 'mass')] *
              Math.sqrt(
                (NodeMatrix[np(n, 'old_dx')] - NodeMatrix[np(n, 'dx')]) *
                (NodeMatrix[np(n, 'old_dx')] - NodeMatrix[np(n, 'dx')]) +
                (NodeMatrix[np(n, 'old_dy')] - NodeMatrix[np(n, 'dy')]) *
                (NodeMatrix[np(n, 'old_dy')] - NodeMatrix[np(n, 'dy')])
              );

            traction = Math.sqrt(
              (NodeMatrix[np(n, 'old_dx')] + NodeMatrix[np(n, 'dx')]) *
              (NodeMatrix[np(n, 'old_dx')] + NodeMatrix[np(n, 'dx')]) +
              (NodeMatrix[np(n, 'old_dy')] + NodeMatrix[np(n, 'dy')]) *
              (NodeMatrix[np(n, 'old_dy')] + NodeMatrix[np(n, 'dy')])
            ) / 2;

            nodespeed =
              0.1 * Math.log(1 + traction) / (1 + Math.sqrt(swinging));

            oldxDist = NodeMatrix[np(n, 'x')];
            oldyDist = NodeMatrix[np(n, 'y')];

            // Updating node's positon
            NodeMatrix[np(n, 'x')] =
              NodeMatrix[np(n, 'x')] + NodeMatrix[np(n, 'dx')] *
              (nodespeed / W.settings.slowDown);
            NodeMatrix[np(n, 'y')] =
              NodeMatrix[np(n, 'y')] + NodeMatrix[np(n, 'dy')] *
              (nodespeed / W.settings.slowDown);

            xDist = NodeMatrix[np(n, 'x')];
            yDist = NodeMatrix[np(n, 'y')];
            distance = Math.sqrt(
              (xDist - oldxDist) * (xDist - oldxDist) +
              (yDist - oldyDist) * (yDist - oldyDist)
            );
            alldistance += distance;
          }
        }
      }
      else {

        for (n = 0; n < W.nodesLength; n += W.ppn) {
          if (!NodeMatrix[np(n, 'fixed')]) {

            swinging = NodeMatrix[np(n, 'mass')] *
              Math.sqrt(
                (NodeMatrix[np(n, 'old_dx')] - NodeMatrix[np(n, 'dx')]) *
                (NodeMatrix[np(n, 'old_dx')] - NodeMatrix[np(n, 'dx')]) +
                (NodeMatrix[np(n, 'old_dy')] - NodeMatrix[np(n, 'dy')]) *
                (NodeMatrix[np(n, 'old_dy')] - NodeMatrix[np(n, 'dy')])
              );

            traction = Math.sqrt(
              (NodeMatrix[np(n, 'old_dx')] + NodeMatrix[np(n, 'dx')]) *
              (NodeMatrix[np(n, 'old_dx')] + NodeMatrix[np(n, 'dx')]) +
              (NodeMatrix[np(n, 'old_dy')] + NodeMatrix[np(n, 'dy')]) *
              (NodeMatrix[np(n, 'old_dy')] + NodeMatrix[np(n, 'dy')])
            ) / 2;

            nodespeed = NodeMatrix[np(n, 'convergence')] *
              Math.log(1 + traction) / (1 + Math.sqrt(swinging));

            // Updating node convergence
            NodeMatrix[np(n, 'convergence')] =
              Math.min(1, Math.sqrt(
                nodespeed *
                (NodeMatrix[np(n, 'dx')] * NodeMatrix[np(n, 'dx')] +
                 NodeMatrix[np(n, 'dy')] * NodeMatrix[np(n, 'dy')]) /
                (1 + Math.sqrt(swinging))
              ));

            oldxDist = NodeMatrix[np(n, 'x')];
            oldyDist = NodeMatrix[np(n, 'y')];

            // Updating node's positon
            NodeMatrix[np(n, 'x')] =
              NodeMatrix[np(n, 'x')] + NodeMatrix[np(n, 'dx')] *
              (nodespeed / W.settings.slowDown);
            NodeMatrix[np(n, 'y')] =
              NodeMatrix[np(n, 'y')] + NodeMatrix[np(n, 'dy')] *
              (nodespeed / W.settings.slowDown);

            xDist = NodeMatrix[np(n, 'x')];
            yDist = NodeMatrix[np(n, 'y')];
            distance = Math.sqrt(
              (xDist - oldxDist) * (xDist - oldxDist) +
              (yDist - oldyDist) * (yDist - oldyDist)
            );
            alldistance += distance;
          }
        }
      }

      // Counting one more iteration
      W.iterations++;

      // Auto stop.
      // The greater the ratio nb nodes / nb edges,
      // the greater the number of iterations needed to converge.
      if (W.settings.autoStop) {
        W.converged = (
          W.iterations > W.settings.maxIterations ||
          alldistance / W.nodesLength < W.settings.avgDistanceThreshold
        );

        // align nodes that are linked to the same two nodes only:
        if (W.converged && W.settings.alignNodeSiblings) {
          // console.time("alignment");

          var
            neighbors = {}, // index of neighbors
            parallelNodes = {}, // set of parallel nodes indexed by same <source;target>
            setKey, // tmp
            keysN;  // tmp

          // build index of neighbors:
          for (e = 0; e < W.edgesLength; e += W.ppe) {
            n1 = EdgeMatrix[ep(e, 'source')];
            n2 = EdgeMatrix[ep(e, 'target')];

            if (n1 === n2) continue;

            neighbors[n1] = neighbors[n1] || {};
            neighbors[n2] = neighbors[n2] || {};
            neighbors[n1][n2] = true;
            neighbors[n2][n1] = true;
          }

          // group triplets by same <source, target> (resp. target, source):
          Object.keys(neighbors).forEach(function(n) {
            n = ~~n;  // string to int
            keysN = Object.keys(neighbors[n]);
            if (keysN.length == 2) {
              setKey = keysN[0] + ';' + keysN[1];
              if (setKey in parallelNodes) {
                parallelNodes[setKey].push(n);
              }
              else {
                setKey = keysN[1] + ';' + keysN[0];
                if (!parallelNodes[setKey]) {
                  parallelNodes[setKey] = [ ~~keysN[1], ~~keysN[0] ];
                }
                parallelNodes[setKey].push(n);
              }
            }
          });

          var
            setNodes,
            setSource,
            setTarget,
            degSource,
            degTarget,
            sX,
            sY,
            tX,
            tY,
            t,
            distSourceTarget,
            intersectionPoint,
            normalVector,
            nNormaleVector,
            angle,
            angleMin = W.settings.nodeSiblingsAngleMin;

          Object.keys(parallelNodes).forEach(function(key) {
            setSource = parallelNodes[key].shift();
            setTarget = parallelNodes[key].shift();
            setNodes = parallelNodes[key].filter(function(setNode) {
              return !NodeMatrix[np(setNode, 'fixed')];
            });

            if (setNodes.length == 1) return;

            sX = NodeMatrix[np(setSource, 'x')];
            sY = NodeMatrix[np(setSource, 'y')];
            tX = NodeMatrix[np(setTarget, 'x')];
            tY = NodeMatrix[np(setTarget, 'y')];

            // the extremity of lowest degree attracts the nodes
            // up to 1/4 of the distance:
            degSource = Object.keys(neighbors[setSource]).length;
            degTarget = Object.keys(neighbors[setTarget]).length;
            t = scaleRange(degSource / (degSource + degTarget), 0, 1, 1/4, 3/4);
            intersectionPoint = getPointOnLineSegment(sX, sY, tX, tY, t);

            // vector normal to the segment [source, target]:
            normalVector = getNormalVector(sX, sY, tX, tY);

            distSourceTarget = getDistance(sX, sY, tX, tY);

            // normalized normal vector:
            nNormaleVector = getNormalizedVector(normalVector, distSourceTarget);

            angle = getVectorAngle(nNormaleVector);

            // avoid horizontal vector because node labels overlap:
            if (2 * angleMin > Math.PI)
              throw new Error('ForceLink.Worker - Invalid parameter: angleMin must be smaller than 2 PI.');

            if (angleMin > 0) {
              // TODO layout parameter
              if (angle < angleMin ||
                (angle > Math.PI - angleMin) && angle <= Math.PI) {

                // New vector of angle PI - angleMin
                nNormaleVector = {
                  x: Math.cos(Math.PI - angleMin) * 2,
                  y: Math.sin(Math.PI - angleMin) * 2,
                };
              }
              else if ((angle > 2 * Math.PI - angleMin) ||
                angle >= Math.PI && (angle < Math.PI + angleMin)) {

                // New vector of angle angleMin
                nNormaleVector = {
                  x: Math.cos(angleMin) * 2,
                  y: Math.sin(angleMin) * 2,
                };
              }
            }

            // evenly distribute nodes along the perpendicular line to
            // [source, target] at the computed intersection point:
            var
              start = 0,
              sign = 1,
              steps = 1;

            if (setNodes.length % 2 == 1) {
              steps = 0;
              start = 1;
            }

            for(var i = 0; i < setNodes.length; i++) {
              NodeMatrix[np(setNodes[i], 'x')] =
                intersectionPoint.x + (sign * nNormaleVector.x * steps) *
                ((start || i >= 2) ? W.settings.nodeSiblingsScale : W.settings.nodeSiblingsScale * 2/3);

              NodeMatrix[np(setNodes[i], 'y')] =
                intersectionPoint.y + (sign * nNormaleVector.y * steps) *
                ((start || i >= 2) ? W.settings.nodeSiblingsScale : W.settings.nodeSiblingsScale * 2/3);

              sign = -sign;
              steps += (i + start) % 2;
            }
          });

          // console.timeEnd("alignment");
        }
      }
    }

    /**
     * Message reception & sending
     */

    // Sending data back to the supervisor
    var sendNewCoords;

    if (typeof window !== 'undefined' && window.document) {

      // From same document as sigma
      sendNewCoords = function() {
        if (!W.autoStop || W.converged) {
          var e;

          if (document.createEvent) {
            e = document.createEvent('Event');
            e.initEvent('newCoords', true, false);
          }
          else {
            e = document.createEventObject();
            e.eventType = 'newCoords';
          }

          e.eventName = 'newCoords';
          e.data = {
            nodes: NodeMatrix.buffer,
            converged: W.converged
          };
          requestAnimationFrame(function() {
            document.dispatchEvent(e);
          });
        }
      };
    }
    else {

      // From a WebWorker
      sendNewCoords = function() {
        if (!W.autoStop || W.converged) {
          self.postMessage(
            {
              nodes: NodeMatrix.buffer,
              converged: W.converged
            },
            [NodeMatrix.buffer]
          );
        }
      };
    }

    // Algorithm run
    function run(n) {
      for (var i = 0; i < n; i++)
        pass();
      sendNewCoords();
    }

    // On supervisor message
    var listener = function(e) {
      switch (e.data.action) {
        case 'start':
          init(
            new Float32Array(e.data.nodes),
            new Float32Array(e.data.edges),
            e.data.config
          );

          // First iteration(s)
          run(W.settings.startingIterations);
          break;

        case 'loop':
          NodeMatrix = new Float32Array(e.data.nodes);
          run(W.settings.iterationsPerRender);
          break;

        case 'config':

          // Merging new settings
          configure(e.data.config);
          break;

        case 'kill':

          // Deleting context for garbage collection
          __emptyObject(W);
          NodeMatrix = null;
          EdgeMatrix = null;
          RegionMatrix = null;
          self.removeEventListener('message', listener);
          break;

        default:
      }
    };

    // Adding event listener
    self.addEventListener('message', listener);
  };


  /**
   * Exporting
   * ----------
   *
   * Crush the worker function and make it accessible by sigma's instances so
   * the supervisor can call it.
   */
  function crush(fnString) {
    var pattern,
        i,
        l;

    var np = [
      'x',
      'y',
      'dx',
      'dy',
      'old_dx',
      'old_dy',
      'mass',
      'convergence',
      'size',
      'fixed'
    ];

    var ep = [
      'source',
      'target',
      'weight'
    ];

    var rp = [
      'node',
      'centerX',
      'centerY',
      'size',
      'nextSibling',
      'firstChild',
      'mass',
      'massCenterX',
      'massCenterY'
    ];

    // rp
    // NOTE: Must go first
    for (i = 0, l = rp.length; i < l; i++) {
      pattern = new RegExp('rp\\(([^,]*), \'' + rp[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    // np
    for (i = 0, l = np.length; i < l; i++) {
      pattern = new RegExp('np\\(([^,]*), \'' + np[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    // ep
    for (i = 0, l = ep.length; i < l; i++) {
      pattern = new RegExp('ep\\(([^,]*), \'' + ep[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    return fnString;
  }

  // Exporting
  function getWorkerFn() {
    var fnString = crush ? crush(Worker.toString()) : Worker.toString();
    return ';(' + fnString + ').call(this);';
  }

  if (inWebWorker) {
    // We are in a webworker, so we launch the Worker function
    eval(getWorkerFn());
  }
  else {
    // We are requesting the worker from sigma, we retrieve it therefore
    if (typeof sigma === 'undefined')
      throw new Error('sigma is not declared');

    sigma.layouts.getForceLinkWorker = getWorkerFn;
  }
}).call(this);
;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.layouts');

  /**
   * Sigma ForceLink Supervisor
   * ===============================
   *
   * Author: Guillaume Plique (Yomguithereal)
   * Extensions author: Sébastien Heymann @ Linkurious
   * Version: 0.1
   */
  var _root = this;

  /**
   * Feature detection
   * ------------------
   */
  var webWorkers = 'Worker' in _root;

  /**
   * Event emitter Object
   * ------------------
   */
  var eventEmitter = {};
  sigma.classes.dispatcher.extend(eventEmitter);

  /**
   * Supervisor Object
   * ------------------
   */
  function Supervisor(sigInst, options) {
    // Window URL Polyfill
    _root.URL = _root.URL || _root.webkitURL;

    options = options || {};

    // Properties
    this.sigInst = sigInst;
    this.graph = this.sigInst.graph;
    this.ppn = 10;
    this.ppe = 3;
    this.config = {};
    this.worker = null;
    this.shouldUseWorker = null;
    this.workerUrl = null;
    this.runOnBackground = null;
    this.easing = null;
    this.randomize = null;

    this.configure(options);

    // State
    this.started = false;
    this.running = false;

    this.initWorker();
  }

  Supervisor.prototype.makeBlob = function(workerFn) {
    var blob;

    try {
      blob = new Blob([workerFn], {type: 'application/javascript'});
    }
    catch (e) {
      _root.BlobBuilder = _root.BlobBuilder ||
                          _root.WebKitBlobBuilder ||
                          _root.MozBlobBuilder;

      blob = new BlobBuilder();
      blob.append(workerFn);
      blob = blob.getBlob();
    }

    return blob;
  };

  Supervisor.prototype.graphToByteArrays = function() {
    var nodes = this.graph.nodes(),
        edges = this.graph.edges(),
        nbytes = nodes.length * this.ppn,
        ebytes = edges.length * this.ppe,
        nIndex = {},
        i,
        j,
        l;

    // Allocating Byte arrays with correct nb of bytes
    this.nodesByteArray = new Float32Array(nbytes);
    this.edgesByteArray = new Float32Array(ebytes);

    // Iterate through nodes
    for (i = j = 0, l = nodes.length; i < l; i++) {

      // Populating index
      nIndex[nodes[i].id] = j;

      // Populating byte array
      this.nodesByteArray[j] = this.randomize(nodes[i].x);
      this.nodesByteArray[j + 1] = this.randomize(nodes[i].y);
      this.nodesByteArray[j + 2] = 0;
      this.nodesByteArray[j + 3] = 0;
      this.nodesByteArray[j + 4] = 0;
      this.nodesByteArray[j + 5] = 0;
      this.nodesByteArray[j + 6] = 1 + this.graph.degree(nodes[i].id);
      this.nodesByteArray[j + 7] = 1;
      this.nodesByteArray[j + 8] = nodes[i].size;
      this.nodesByteArray[j + 9] = nodes[i].fixed || 0;
      j += this.ppn;
    }

    // Iterate through edges
    for (i = j = 0, l = edges.length; i < l; i++) {
      this.edgesByteArray[j] = nIndex[edges[i].source];
      this.edgesByteArray[j + 1] = nIndex[edges[i].target];
      this.edgesByteArray[j + 2] = edges[i].weight || 0;
      j += this.ppe;
    }
  };

  // TODO: make a better send function
  Supervisor.prototype.applyLayoutChanges = function(prefixed) {
    var nodes = this.graph.nodes(),
        j = 0,
        realIndex;

    // Moving nodes
    for (var i = 0, l = this.nodesByteArray.length; i < l; i += this.ppn) {
      if (!nodes[j].fixed) {
        if (prefixed) {
          nodes[j].fa2_x = this.nodesByteArray[i];
          nodes[j].fa2_y = this.nodesByteArray[i + 1];

        } else {
          nodes[j].x = this.nodesByteArray[i];
          nodes[j].y = this.nodesByteArray[i + 1];
        }
      }
      j++;
    }
  };

  Supervisor.prototype.sendByteArrayToWorker = function(action) {
    var content = {
      action: action || 'loop',
      nodes: this.nodesByteArray.buffer
    };

    var buffers = [this.nodesByteArray.buffer];

    if (action === 'start') {
      content.config = this.config || {};
      content.edges = this.edgesByteArray.buffer;
      buffers.push(this.edgesByteArray.buffer);
    }

    if (this.shouldUseWorker)
      this.worker.postMessage(content, buffers);
    else
      _root.postMessage(content, '*');
  };

  Supervisor.prototype.start = function() {
    if (this.running)
      return;

    this.running = true;

    if (!this.started) {
      // Sending init message to worker
      this.sendByteArrayToWorker('start');
      this.started = true;
      eventEmitter.dispatchEvent('start');
    }
    else {
      this.sendByteArrayToWorker();
    }
  };

  Supervisor.prototype.stop = function() {
    if (!this.running)
      return;

    this.running = false;
    eventEmitter.dispatchEvent('stop');
  };

  Supervisor.prototype.initWorker = function() {
    var _this = this,
        workerFn = sigma.layouts.getForceLinkWorker();

    // Web worker or classic DOM events?
    if (this.shouldUseWorker) {
      if (!this.workerUrl) {
        var blob = this.makeBlob(workerFn);
        this.worker = new Worker(URL.createObjectURL(blob));
      }
      else {
        this.worker = new Worker(this.workerUrl);
      }

      // Post Message Polyfill
      this.worker.postMessage =
        this.worker.webkitPostMessage || this.worker.postMessage;
    }
    else {

      // TODO: do we crush?
      eval(workerFn);
    }

    // Worker message receiver
    this.msgName = (this.worker) ? 'message' : 'newCoords';
    this.listener = function(e) {

      // Retrieving data
      _this.nodesByteArray = new Float32Array(e.data.nodes);

      // If ForceLink is running, we act accordingly
      if (_this.running) {

        // Applying layout
        _this.applyLayoutChanges(_this.runOnBackground);

        // Send data back to worker and loop
        _this.sendByteArrayToWorker();

        // Rendering graph
        if (!_this.runOnBackground)
          _this.sigInst.refresh({skipIndexation: true});
      }

      // Stop ForceLink if it has converged
      if (e.data.converged) {
        _this.running = false;
      }

      if (!_this.running) {
        _this.killWorker();
        if (_this.runOnBackground && _this.easing) {
          _this.applyLayoutChanges(true);
          eventEmitter.dispatchEvent('interpolate');

          // reset fa_x/y in case a pinned node was previously layed out
          _this.graph.nodes()
            .filter(function(node) { return node.fixed; })
            .forEach(function(node) {
              node.fa2_x = node.x;
              node.fa2_y = node.y;
            });

          sigma.plugins.animate(
            _this.sigInst,
            {
              x: 'fa2_x',
              y: 'fa2_y'
            },
            {
              easing: _this.easing,
              onComplete: function() {
                _this.sigInst.refresh();
                eventEmitter.dispatchEvent('stop');
              }
            }
          );
        }
        else {
          _this.applyLayoutChanges(false);
          _this.sigInst.refresh();
          eventEmitter.dispatchEvent('stop');
        }
      }
    };

    (this.worker || document).addEventListener(this.msgName, this.listener);

    // Filling byteArrays
    this.graphToByteArrays();

    // Binding on kill to properly terminate layout when parent is killed
    _this.sigInst.bind('kill', function() {
      sigma.layouts.killForceLink();
    });
  };

  Supervisor.prototype.killWorker = function() {
    if (this.worker) {
      this.worker.terminate();
    }
    else {
      _root.postMessage({action: 'kill'}, '*');
      document.removeEventListener(this.msgName, this.listener);
    }
  };

  Supervisor.prototype.configure = function(config) {

    // Setting configuration
    this.config = config;

    this.shouldUseWorker =
      config.worker === false ? false : true && webWorkers;
    this.workerUrl = config.workerUrl;
    this.runOnBackground = (config.background) ? true : false;
    this.easing = config.easing;

    switch (config.randomize) {
      case 'globally':
        this.randomize = function(x) { return Math.random() * (config.randomizeFactor || 1) };
      break;
      case 'locally':
        this.randomize = function(x) { return x + (Math.random() * (config.randomizeFactor || 1)) };
      break;
      default:
        this.randomize = function(x) { return x };
    }

    if (!this.started)
      return;

    var data = {action: 'config', config: this.config};

    if (this.shouldUseWorker)
      this.worker.postMessage(data);
    else
      _root.postMessage(data, '*');
  };

  /**
   * Interface
   * ----------
   */
  var supervisor = null;

  sigma.layouts.startForceLink = function(sigInst, config) {

    // Create supervisor if undefined
    if (!supervisor) {
      supervisor = new Supervisor(sigInst, config);
    }
    else if (!supervisor.running) {
      supervisor.killWorker();
      supervisor.initWorker();
      supervisor.started = false;
    }

    // Configuration provided?
    if (config)
      supervisor.configure(config);

    // Start algorithm
    supervisor.start();

    return eventEmitter;
  };

  sigma.layouts.stopForceLink = function() {
    if (!supervisor)
      return;

    // Stop algorithm
    supervisor.stop();

    return supervisor;
  };

  sigma.layouts.killForceLink = function() {
    if (!supervisor)
      return;

    // Stop Algorithm
    supervisor.stop();

    // Kill Worker
    supervisor.killWorker();

    // Kill supervisor
    supervisor = null;

    eventEmitter = {};
    sigma.classes.dispatcher.extend(eventEmitter);
  };

  sigma.layouts.configForceLink = function(sigInst, config) {
    if (!supervisor) {
      supervisor = new Supervisor(sigInst, config);
    }
    else if (!supervisor.running) {
      supervisor.killWorker();
      supervisor.initWorker();
      supervisor.started = false;
    }

    supervisor.configure(config);

    return eventEmitter;
  };

  sigma.layouts.isForceLinkRunning = function() {
    return !!supervisor && supervisor.running;
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.layouts.fruchtermanReingold');

  /**
   * Sigma Fruchterman-Reingold
   * ===============================
   *
   * Author: Sébastien Heymann @ Linkurious
   * Version: 0.1
   */


  var settings = {
    autoArea: true,
    area: 1,
    gravity: 10,
    speed: 0.1,
    iterations: 1000
  };

  var _instance = {};


  /**
   * Event emitter Object
   * ------------------
   */
  var _eventEmitter = {};


  /**
   * Fruchterman Object
   * ------------------
   */
  function FruchtermanReingold() {
    var self = this;

    this.init = function (sigInst, options) {
      options = options || {};

      // Properties
      this.sigInst = sigInst;
      this.config = sigma.utils.extend(options, settings);
      this.easing = options.easing;
      this.duration = options.duration;

      if (!sigma.plugins || typeof sigma.plugins.animate === 'undefined') {
        throw new Error('sigma.plugins.animate is not declared');
      }

      // State
      this.running = false;
    };

    /**
     * Single layout iteration.
     */
    this.atomicGo = function () {
      if (!this.running || this.iterCount < 1) return false;

      var nodes = this.sigInst.graph.nodes(),
          edges = this.sigInst.graph.edges(),
          i,
          j,
          n,
          n2,
          e,
          xDist,
          yDist,
          dist,
          repulsiveF,
          nodesCount = nodes.length,
          edgesCount = edges.length;

      this.config.area = this.config.autoArea ? (nodesCount * nodesCount) : this.config.area;
      this.iterCount--;
      this.running = (this.iterCount > 0);

      var maxDisplace = Math.sqrt(this.config.area) / 10,
          k = Math.sqrt(this.config.area / (1 + nodesCount));

      for (i = 0; i < nodesCount; i++) {
        n = nodes[i];

        // Init
        if (!n.fr) {
          n.fr_x = n.x;
          n.fr_y = n.y;
          n.fr = {
            dx: 0,
            dy: 0
          };
        }

        for (j = 0; j < nodesCount; j++) {
          n2 = nodes[j];

          // Repulsion force
          if (n.id != n2.id) {
            xDist = n.fr_x - n2.fr_x;
            yDist = n.fr_y - n2.fr_y;
            dist = Math.sqrt(xDist * xDist + yDist * yDist) + 0.01;
            // var dist = Math.sqrt(xDist * xDist + yDist * yDist) - n1.size - n2.size;

            if (dist > 0) {
              repulsiveF = k * k / dist;
              n.fr.dx += xDist / dist * repulsiveF;
              n.fr.dy += yDist / dist * repulsiveF;
            }
          }
        }
      }

      var nSource,
          nTarget,
          attractiveF;

      for (i = 0; i < edgesCount; i++) {
        e = edges[i];

        // Attraction force
        nSource = self.sigInst.graph.nodes(e.source);
        nTarget = self.sigInst.graph.nodes(e.target);

        xDist = nSource.fr_x - nTarget.fr_x;
        yDist = nSource.fr_y - nTarget.fr_y;
        dist = Math.sqrt(xDist * xDist + yDist * yDist) + 0.01;
        // dist = Math.sqrt(xDist * xDist + yDist * yDist) - nSource.size - nTarget.size;
        attractiveF = dist * dist / k;

        if (dist > 0) {
          nSource.fr.dx -= xDist / dist * attractiveF;
          nSource.fr.dy -= yDist / dist * attractiveF;
          nTarget.fr.dx += xDist / dist * attractiveF;
          nTarget.fr.dy += yDist / dist * attractiveF;
        }
      }

      var d,
          gf,
          limitedDist;

      for (i = 0; i < nodesCount; i++) {
        n = nodes[i];

        // Gravity
        d = Math.sqrt(n.fr_x * n.fr_x + n.fr_y * n.fr_y);
        gf = 0.01 * k * self.config.gravity * d;
        n.fr.dx -= gf * n.fr_x / d;
        n.fr.dy -= gf * n.fr_y / d;

        // Speed
        n.fr.dx *= self.config.speed;
        n.fr.dy *= self.config.speed;

        // Apply computed displacement
        if (!n.fixed) {
          xDist = n.fr.dx;
          yDist = n.fr.dy;
          dist = Math.sqrt(xDist * xDist + yDist * yDist);

          if (dist > 0) {
            limitedDist = Math.min(maxDisplace * self.config.speed, dist);
            n.fr_x += xDist / dist * limitedDist;
            n.fr_y += yDist / dist * limitedDist;
          }
        }
      }

      return this.running;
    };

    this.go = function () {
      this.iterCount = this.config.iterations;

      while (this.running) {
        this.atomicGo();
      };

      this.stop();
    };

    this.start = function() {
      if (this.running) return;

      var nodes = this.sigInst.graph.nodes();

      this.running = true;

      // Init nodes
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].fr_x = nodes[i].x;
        nodes[i].fr_y = nodes[i].y;
        nodes[i].fr = {
          dx: 0,
          dy: 0
        };
      }
      _eventEmitter[self.sigInst.id].dispatchEvent('start');
      this.go();
    };

    this.stop = function() {
      var nodes = this.sigInst.graph.nodes();

      this.running = false;

      if (this.easing) {
        _eventEmitter[self.sigInst.id].dispatchEvent('interpolate');
        sigma.plugins.animate(
          self.sigInst,
          {
            x: 'fr_x',
            y: 'fr_y'
          },
          {
            easing: self.easing,
            onComplete: function() {
              self.sigInst.refresh();
              for (var i = 0; i < nodes.length; i++) {
                nodes[i].fr = null;
                nodes[i].fr_x = null;
                nodes[i].fr_y = null;
              }
              _eventEmitter[self.sigInst.id].dispatchEvent('stop');
            },
            duration: self.duration
          }
        );
      }
      else {
        // Apply changes
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].x = nodes[i].fr_x;
          nodes[i].y = nodes[i].fr_y;
        }

        this.sigInst.refresh();

        for (var i = 0; i < nodes.length; i++) {
          nodes[i].fr = null;
          nodes[i].fr_x = null;
          nodes[i].fr_y = null;
        }
        _eventEmitter[self.sigInst.id].dispatchEvent('stop');
      }
    };

    this.kill = function() {
      this.sigInst = null;
      this.config = null;
      this.easing = null;
    };
  };



  /**
   * Interface
   * ----------
   */

  /**
   * Configure the layout algorithm.

   * Recognized options:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the settings
   * object:
   *
   *   {?boolean}           autoArea   If `true`, area will be computed as N².
   *   {?number}            area       The area of the graph.
   *   {?number}            gravity    This force attracts all nodes to the
   *                                   center to avoid dispersion of
   *                                   disconnected components.
   *   {?number}            speed      A greater value increases the
   *                                   convergence speed at the cost of precision loss.
   *   {?number}            iterations The number of iterations to perform
   *                                   before the layout completes.
   *   {?(function|string)} easing     Either the name of an easing in the
   *                                   sigma.utils.easings package or a
   *                                   function. If not specified, the
   *                                   quadraticInOut easing from this package
   *                                   will be used instead.
   *   {?number}            duration   The duration of the animation. If not
   *                                   specified, the "animationsTime" setting
   *                                   value of the sigma instance will be used
   *                                   instead.
   *
   *
   * @param  {sigma}   sigInst The related sigma instance.
   * @param  {object} config  The optional configuration object.
   *
   * @return {sigma.classes.dispatcher} Returns an event emitter.
   */
  sigma.layouts.fruchtermanReingold.configure = function(sigInst, config) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');
    if (!config) throw new Error('Missing argument: "config"');

    // Create instance if undefined
    if (!_instance[sigInst.id]) {
      _instance[sigInst.id] = new FruchtermanReingold();

      _eventEmitter[sigInst.id] = {};
      sigma.classes.dispatcher.extend(_eventEmitter[sigInst.id]);

      // Binding on kill to clear the references
      sigInst.bind('kill', function() {
        _instance[sigInst.id].kill();
        _instance[sigInst.id] = null;
        _eventEmitter[sigInst.id] = null;
      });
    }

    _instance[sigInst.id].init(sigInst, config);

    return _eventEmitter[sigInst.id];
  };

  /**
   * Start the layout algorithm. It will use the existing configuration if no
   * new configuration is passed.

   * Recognized options:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the settings
   * object:
   *
   *   {?boolean}           autoArea   If `true`, area will be computed as N².
   *   {?number}            area       The area of the graph.
   *   {?number}            gravity    This force attracts all nodes to the
   *                                   center to avoid dispersion of
   *                                   disconnected components.
   *   {?number}            speed      A greater value increases the
   *                                   convergence speed at the cost of precision loss.
   *   {?number}            iterations The number of iterations to perform
   *                                   before the layout completes.
   *   {?(function|string)} easing     Either the name of an easing in the
   *                                   sigma.utils.easings package or a
   *                                   function. If not specified, the
   *                                   quadraticInOut easing from this package
   *                                   will be used instead.
   *   {?number}            duration   The duration of the animation. If not
   *                                   specified, the "animationsTime" setting
   *                                   value of the sigma instance will be used
   *                                   instead.
   *
   *
   * @param  {sigma}   sigInst The related sigma instance.
   * @param  {?object} config  The optional configuration object.
   *
   * @return {sigma.classes.dispatcher} Returns an event emitter.
   */
  sigma.layouts.fruchtermanReingold.start = function(sigInst, config) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');

    if (config) {
      this.configure(sigInst, config);
    }

    _instance[sigInst.id].start();

    return _eventEmitter[sigInst.id];
  };

  /**
   * Returns true if the layout has started and is not completed.
   *
   * @param  {sigma}   sigInst The related sigma instance.
   *
   * @return {boolean}
   */
  sigma.layouts.fruchtermanReingold.isRunning = function(sigInst) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');

    return !!_instance[sigInst.id] && _instance[sigInst.id].running;
  };

  /**
   * Returns the number of iterations done divided by the total number of
   * iterations to perform.
   *
   * @param  {sigma}   sigInst The related sigma instance.
   *
   * @return {number} A value between 0 and 1.
   */
  sigma.layouts.fruchtermanReingold.progress = function(sigInst) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');

    return (_instance[sigInst.id].config.iterations - _instance[sigInst.id].iterCount) /
      _instance[sigInst.id].config.iterations;
  };
}).call(this);

;(function (undefined) {
    'use strict';

    if (typeof sigma === 'undefined')
        throw 'sigma is not declared';

    // Declare cypher package
    sigma.utils.pkg("sigma.neo4j");

    // Initialize package:
    sigma.utils.pkg('sigma.utils');
    sigma.utils.pkg('sigma.parsers');


    /**
     * This function is an helper for the neo4j communication.
     *
     * @param   {string|object}     neo4j       The URL of neo4j server or a neo4j server object.
     * @param   {string}            endpoint    Endpoint of the neo4j server
     * @param   {string}            method      The calling method for the endpoint : 'GET' or 'POST'
     * @param   {object|string}     data        Data that will be sent to the server
     * @param   {function}          callback    The callback function
     * @param   {integer}           timeout     The amount of time in milliseconds that neo4j should run the query before
     *                                          returning a timeout error.  Note, this will only work if the following
     *                                          two settings are added to the neo4j property files:
     *                                          To the file './conf/neo4j.properties' add 'execution_guard_enabled=true'.
     *                                          To the file './conf/neo4j-server.properties' add 'org.neo4j.server.webserver.limit.executiontime={timeout_in_seconds}'.
     *                                          Make sure the timeout in the above property file is greater then the timeout that
     *                                          you want to send with the request, because neo4j will use whichever timeout is shorter.
     */
    sigma.neo4j.send = function(neo4j, endpoint, method, data, callback, timeout) {
        var
          xhr = sigma.utils.xhr(),
          timeout = timeout || -1,
          url,
          user,
          password;

        // if neo4j arg is not an object
        url = neo4j;
        if(typeof neo4j === 'object') {
            url = neo4j.url;
            user = neo4j.user;
            password = neo4j.password;
        }

        if (!xhr)
            throw 'XMLHttpRequest not supported, cannot load the file.';

        // Construct the endpoint url
        url += endpoint;

        xhr.open(method, url, true);
        if( user && password) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(user + ':' + password));
        }
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        if (timeout > 0) {
        	xhr.setRequestHeader('max-execution-time', timeout);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // Call the callback if specified:
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(data);
    };

    /**
     * This function parse a neo4j cypher query result, and transform it into
     * a sigma graph object.
     *
     * @param  {object}     result      The server response of a cypher query.
     *
     * @return A graph object
     */
    sigma.neo4j.cypher_parse = function(result) {
        var graph = { nodes: [], edges: [] },
            nodesMap = {},
            edgesMap = {},
            key;

        if (!Array.isArray(result))
          result = result.results[0].data;

        // Iteration on all result data
        result.forEach(function (data) {

            // iteration on graph for all node
            data.graph.nodes.forEach(function (node) {

                var sigmaNode =  {
                    id : node.id,
                    label : node.id,
                    x : Math.random(),
                    y : Math.random(),
                    size : 1,
                    neo4j_labels : node.labels,
                    neo4j_data : node.properties
                };

                if (sigmaNode.id in nodesMap) {
                    // do nothing
                } else {
                    nodesMap[sigmaNode.id] = sigmaNode;
                }
            });

            // iteration on graph for all node
            data.graph.relationships.forEach(function (edge) {
                var sigmaEdge =  {
                    id : edge.id,
                    label : edge.type,
                    source : edge.startNode,
                    target : edge.endNode,
                    neo4j_type : edge.type,
                    neo4j_data : edge.properties
                };

                if (sigmaEdge.id in edgesMap) {
                    // do nothing
                } else {
                    edgesMap[sigmaEdge.id] = sigmaEdge;
                }
            });

        });

        // construct sigma nodes
        for (key in nodesMap) {
            graph.nodes.push(nodesMap[key]);
        }
        // construct sigma nodes
        for (key in edgesMap) {
            graph.edges.push(edgesMap[key]);
        }

        return graph;
    };


    /**
     * This function execute a cypher and create a new sigma instance or
     * updates the graph of a given instance. It is possible to give a callback
     * that will be executed at the end of the process.
     *
     * @param  {object|string}      neo4j       The URL of neo4j server or a neo4j server object.
     * @param  {string}             cypher      The cypher query
     * @param  {?object|?sigma}     sig         A sigma configuration object or a sigma instance.
     * @param  {?function}          callback    Eventually a callback to execute after
     *                                          having parsed the file. It will be called
     *                                          with the related sigma instance as
     *                                          parameter.
     */
    sigma.neo4j.cypher = function (neo4j, cypher, sig, callback, timeout) {
        var
          endpoint = '/db/data/transaction/commit',
          timeout = timeout || -1,
          data,
          cypherCallback;

        // Data that will be sent to the server
        data = JSON.stringify({
            "statements": [
                {
                    "statement": cypher,
                    "resultDataContents": ["graph"],
                    "includeStats": false
                }
            ]
        });

        // Callback method after server response
        cypherCallback = function (callback) {

            return function (response) {
                if (response.errors.length > 0)
                    return callback(null, response.errors);

                var graph = { nodes: [], edges: [] };

                graph = sigma.neo4j.cypher_parse(response);

                // Update the instance's graph:
                if (sig instanceof sigma) {
                    sig.graph.clear();
                    sig.graph.read(graph);

                    // ...or instantiate sigma if needed:
                } else if (typeof sig === 'object') {
                    sig = new sigma(sig);
                    sig.graph.read(graph);
                    sig.refresh();

                    // ...or it's finally the callback:
                } else if (typeof sig === 'function') {
                    callback = sig;
                    sig = null;
                }

                // Call the callback if specified:
                if (callback)
                    callback(sig || graph);
            };
        };

        // Let's call neo4j
        sigma.neo4j.send(neo4j, endpoint, 'POST', data, cypherCallback(callback), timeout);
    };

    /**
     * This function call neo4j to get all labels of the graph.
     *
     * @param  {string}       neo4j      The URL of neo4j server or an object with the url, user & password.
     * @param  {function}     callback   The callback function
     *
     * @return An array of label
     */
    sigma.neo4j.getLabels = function(neo4j, callback) {
        sigma.neo4j.send(neo4j, '/db/data/labels', 'GET', null, callback);
    };

    /**
     * This function parse a neo4j cypher query result.
     *
     * @param  {string}       neo4j      The URL of neo4j server or an object with the url, user & password.
     * @param  {function}     callback   The callback function
     *
     * @return An array of relationship type
     */
    sigma.neo4j.getTypes = function(neo4j, callback) {
        sigma.neo4j.send(neo4j, '/db/data/relationship/types', 'GET', null, callback);
    };

}).call(this);



;(function(undefined) {
  'use strict';

  /**
   * GEXF Library
   * =============
   *
   * Author: PLIQUE Guillaume (Yomguithereal)
   * URL: https://github.com/Yomguithereal/gexf-parser
   * Version: 0.1.1
   */

  /**
   * Helper Namespace
   * -----------------
   *
   * A useful batch of function dealing with DOM operations and types.
   */
  var _helpers = {
    getModelTags: function(xml) {
      var attributesTags = xml.getElementsByTagName('attributes'),
          modelTags = {},
          l = attributesTags.length,
          i;

      for (i = 0; i < l; i++)
        modelTags[attributesTags[i].getAttribute('class')] =
          attributesTags[i].childNodes;

      return modelTags;
    },
    nodeListToArray: function(nodeList) {

      // Return array
      var children = [];

      // Iterating
      for (var i = 0, len = nodeList.length; i < len; ++i) {
        if (nodeList[i].nodeName !== '#text')
          children.push(nodeList[i]);
      }

      return children;
    },
    nodeListEach: function(nodeList, func) {

      // Iterating
      for (var i = 0, len = nodeList.length; i < len; ++i) {
        if (nodeList[i].nodeName !== '#text')
          func(nodeList[i]);
      }
    },
    nodeListToHash: function(nodeList, filter) {

      // Return object
      var children = {};

      // Iterating
      for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].nodeName !== '#text') {
          var prop = filter(nodeList[i]);
          children[prop.key] = prop.value;
        }
      }

      return children;
    },
    namedNodeMapToObject: function(nodeMap) {

      // Return object
      var attributes = {};

      // Iterating
      for (var i = 0; i < nodeMap.length; i++) {
        attributes[nodeMap[i].name] = nodeMap[i].value;
      }

      return attributes;
    },
    getFirstElementByTagNS: function(node, ns, tag) {
      var el = node.getElementsByTagName(ns + ':' + tag)[0];

      if (!el)
        el = node.getElementsByTagNameNS(ns, tag)[0];

      if (!el)
        el = node.getElementsByTagName(tag)[0];

      return el;
    },
    getAttributeNS: function(node, ns, attribute) {
      var attr_value = node.getAttribute(ns + ':' + attribute);

      if (attr_value === undefined)
        attr_value = node.getAttributeNS(ns, attribute);

      if (attr_value === undefined)
        attr_value = node.getAttribute(attribute);

      return attr_value;
    },
    enforceType: function(type, value) {

      switch (type) {
        case 'boolean':
          value = (value === 'true');
          break;

        case 'integer':
        case 'long':
        case 'float':
        case 'double':
          value = +value;
          break;

        case 'liststring':
          value = value ? value.split('|') : [];
          break;
      }

      return value;
    },
    getRGB: function(values) {
      return (values[3]) ?
        'rgba(' + values.join(',') + ')' :
        'rgb(' + values.slice(0, -1).join(',') + ')';
    }
  };


  /**
   * Parser Core Functions
   * ----------------------
   *
   * The XML parser's functions themselves.
   */

  /**
   * Node structure.
   * A function returning an object guarded with default value.
   *
   * @param  {object} properties The node properties.
   * @return {object}            The guarded node object.
   */
  function Node(properties) {

    // Possible Properties
    var node = {
      id: properties.id,
      label: properties.label
    };

    if (properties.viz)
      node.viz = properties.viz;

    if (properties.attributes)
      node.attributes = properties.attributes;

    return node;
  }


  /**
   * Edge structure.
   * A function returning an object guarded with default value.
   *
   * @param  {object} properties The edge properties.
   * @return {object}            The guarded edge object.
   */
  function Edge(properties) {

    // Possible Properties
    var edge = {
      id: properties.id,
      type: properties.type || 'undirected',
      label: properties.label || '',
      source: properties.source,
      target: properties.target,
      weight: +properties.weight || 1.0
    };

    if (properties.viz)
      edge.viz = properties.viz;

    if (properties.attributes)
      edge.attributes = properties.attributes;

    return edge;
  }

  /**
   * Graph parser.
   * This structure parse a gexf string and return an object containing the
   * parsed graph.
   *
   * @param  {string} xml The xml string of the gexf file to parse.
   * @return {object}     The parsed graph.
   */
  function Graph(xml) {
    var _xml = {};

    // Basic Properties
    //------------------
    _xml.els = {
      root: xml.getElementsByTagName('gexf')[0],
      graph: xml.getElementsByTagName('graph')[0],
      meta: xml.getElementsByTagName('meta')[0],
      nodes: xml.getElementsByTagName('node'),
      edges: xml.getElementsByTagName('edge'),
      model: _helpers.getModelTags(xml)
    };

    // Information
    _xml.hasViz = !!_helpers.getAttributeNS(_xml.els.root, 'xmlns', 'viz');
    _xml.version = _xml.els.root.getAttribute('version') || '1.0';
    _xml.mode = _xml.els.graph.getAttribute('mode') || 'static';

    var edgeType = _xml.els.graph.getAttribute('defaultedgetype');
    _xml.defaultEdgetype = edgeType || 'undirected';

    // Parser Functions
    //------------------

    // Meta Data
    function _metaData() {

      var metas = {};
      if (!_xml.els.meta)
        return metas;

      // Last modified date
      metas.lastmodifieddate = _xml.els.meta.getAttribute('lastmodifieddate');

      // Other information
      _helpers.nodeListEach(_xml.els.meta.childNodes, function(child) {
        metas[child.tagName.toLowerCase()] = child.textContent;
      });

      return metas;
    }

    // Model
    function _model(cls) {
      var attributes = [];

      // Iterating through attributes
      if (_xml.els.model[cls])
        _helpers.nodeListEach(_xml.els.model[cls], function(attr) {

          // Properties
          var properties = {
            id: attr.getAttribute('id') || attr.getAttribute('for'),
            type: attr.getAttribute('type') || 'string',
            title: attr.getAttribute('title') || ''
          };

          // Defaults
          var default_el = _helpers.nodeListToArray(attr.childNodes);

          if (default_el.length > 0)
            properties.defaultValue = default_el[0].textContent;

          // Creating attribute
          attributes.push(properties);
        });

      return attributes.length > 0 ? attributes : false;
    }

    // Data from nodes or edges
    function _data(model, node_or_edge) {

      var data = {};
      var attvalues_els = node_or_edge.getElementsByTagName('attvalue');

      // Getting Node Indicated Attributes
      var ah = _helpers.nodeListToHash(attvalues_els, function(el) {
        var attributes = _helpers.namedNodeMapToObject(el.attributes);
        var key = attributes.id || attributes['for'];

        // Returning object
        return {key: key, value: attributes.value};
      });


      // Iterating through model
      model.map(function(a) {

        // Default value?
        data[a.id] = !(a.id in ah) && 'defaultValue' in a ?
          _helpers.enforceType(a.type, a.defaultValue) :
          _helpers.enforceType(a.type, ah[a.id]);

      });

      return data;
    }

    // Nodes
    function _nodes(model) {
      var nodes = [];

      // Iteration through nodes
      _helpers.nodeListEach(_xml.els.nodes, function(n) {

        // Basic properties
        var properties = {
          id: n.getAttribute('id'),
          label: n.getAttribute('label') || ''
        };

        // Retrieving data from nodes if any
        if (model)
          properties.attributes = _data(model, n);

        // Retrieving viz information
        if (_xml.hasViz)
          properties.viz = _nodeViz(n);

        // Pushing node
        nodes.push(Node(properties));
      });

      return nodes;
    }

    // Viz information from nodes
    function _nodeViz(node) {
      var viz = {};

      // Color
      var color_el = _helpers.getFirstElementByTagNS(node, 'viz', 'color');

      if (color_el) {
        var color = ['r', 'g', 'b', 'a'].map(function(c) {
          return color_el.getAttribute(c);
        });

        viz.color = _helpers.getRGB(color);
      }

      // Position
      var pos_el = _helpers.getFirstElementByTagNS(node, 'viz', 'position');

      if (pos_el) {
        viz.position = {};

        ['x', 'y', 'z'].map(function(p) {
          viz.position[p] = +pos_el.getAttribute(p);
        });
      }

      // Size
      var size_el = _helpers.getFirstElementByTagNS(node, 'viz', 'size');
      if (size_el)
        viz.size = +size_el.getAttribute('value');

      // Shape
      var shape_el = _helpers.getFirstElementByTagNS(node, 'viz', 'shape');
      if (shape_el)
        viz.shape = shape_el.getAttribute('value');

      return viz;
    }

    // Edges
    function _edges(model, default_type) {
      var edges = [];

      // Iteration through edges
      _helpers.nodeListEach(_xml.els.edges, function(e) {

        // Creating the edge
        var properties = _helpers.namedNodeMapToObject(e.attributes);
        if (!('type' in properties)) {
          properties.type = default_type;
        }

        // Retrieving edge data
        if (model)
          properties.attributes = _data(model, e);


        // Retrieving viz information
        if (_xml.hasViz)
          properties.viz = _edgeViz(e);

        edges.push(Edge(properties));
      });

      return edges;
    }

    // Viz information from edges
    function _edgeViz(edge) {
      var viz = {};

      // Color
      var color_el = _helpers.getFirstElementByTagNS(edge, 'viz', 'color');

      if (color_el) {
        var color = ['r', 'g', 'b', 'a'].map(function(c) {
          return color_el.getAttribute(c);
        });

        viz.color = _helpers.getRGB(color);
      }

      // Shape
      var shape_el = _helpers.getFirstElementByTagNS(edge, 'viz', 'shape');
      if (shape_el)
        viz.shape = shape_el.getAttribute('value');

      // Thickness
      var thick_el = _helpers.getFirstElementByTagNS(edge, 'viz', 'thickness');
      if (thick_el)
        viz.thickness = +thick_el.getAttribute('value');

      return viz;
    }


    // Returning the Graph
    //---------------------
    var nodeModel = _model('node'),
        edgeModel = _model('edge');

    var graph = {
      version: _xml.version,
      mode: _xml.mode,
      defaultEdgeType: _xml.defaultEdgetype,
      meta: _metaData(),
      model: {},
      nodes: _nodes(nodeModel),
      edges: _edges(edgeModel, _xml.defaultEdgetype)
    };

    if (nodeModel)
      graph.model.node = nodeModel;
    if (edgeModel)
      graph.model.edge = edgeModel;

    return graph;
  }


  /**
   * Public API
   * -----------
   *
   * User-accessible functions.
   */

  // Fetching GEXF with XHR
  function fetch(gexf_url, callback) {
    var xhr = (function() {
      if (window.XMLHttpRequest)
        return new XMLHttpRequest();

      var names,
          i;

      if (window.ActiveXObject) {
        names = [
          'Msxml2.XMLHTTP.6.0',
          'Msxml2.XMLHTTP.3.0',
          'Msxml2.XMLHTTP',
          'Microsoft.XMLHTTP'
        ];

        for (i in names)
          try {
            return new ActiveXObject(names[i]);
          } catch (e) {}
      }

      return null;
    })();

    if (!xhr)
      throw 'XMLHttpRequest not supported, cannot load the file.';

    // Async?
    var async = (typeof callback === 'function'),
        getResult;

    // If we can't override MIME type, we are on IE 9
    // We'll be parsing the response string then.
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/xml');
      getResult = function(r) {
        return r.responseXML;
      };
    }
    else {
      getResult = function(r) {
        var p = new DOMParser();
        return p.parseFromString(r.responseText, 'application/xml');
      };
    }

    xhr.open('GET', gexf_url, async);

    if (async)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)
          callback(getResult(xhr));
      };

    xhr.send();

    return (async) ? xhr : getResult(xhr);
  }

  // Parsing the GEXF File
  function parse(gexf) {
    return Graph(gexf);
  }

  // Fetch and parse the GEXF File
  function fetchAndParse(gexf_url, callback) {
    if (typeof callback === 'function') {
      return fetch(gexf_url, function(gexf) {
        callback(Graph(gexf));
      });
    } else
      return Graph(fetch(gexf_url));
  }


  /**
   * Exporting
   * ----------
   */
  if (typeof this.gexf !== 'undefined')
    throw 'gexf: error - a variable called "gexf" already ' +
          'exists in the global scope';

  this.gexf = {

    // Functions
    parse: parse,
    fetch: fetchAndParse,

    // Version
    version: '0.1.1'
  };

  if (typeof exports !== 'undefined' && this.exports !== exports)
    module.exports = this.gexf;
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.parsers');

  // Just a basic ID generator:
  var _id = 0;
  function edgeId() {
    return 'e' + (_id++);
  }

  /**
   * If the first arguments is a valid URL, this function loads a GEXF file and
   * creates a new sigma instance or updates the graph of a given instance. It
   * is possible to give a callback that will be executed at the end of the
   * process. And if the first argument is a DOM element, it will skip the
   * loading step and parse the given XML tree to fill the graph.
   *
   * @param  {string|DOMElement} target   The URL of the GEXF file or a valid
   *                                      GEXF tree.
   * @param  {object|sigma}      sig      A sigma configuration object or a
   *                                      sigma instance.
   * @param  {?function}         callback Eventually a callback to execute
   *                                      after having parsed the file. It will
   *                                      be called with the related sigma
   *                                      instance as parameter.
   */
  sigma.parsers.gexf = function(target, sig, callback) {
    var i,
        l,
        arr,
        obj;

    function parse(graph) {
      // Adapt the graph:
      arr = graph.nodes;
      for (i = 0, l = arr.length; i < l; i++) {
        obj = arr[i];

        obj.id = obj.id;
        if (obj.viz && typeof obj.viz === 'object') {
          if (obj.viz.position && typeof obj.viz.position === 'object') {
            obj.x = obj.viz.position.x;
            obj.y = -obj.viz.position.y; // Needed otherwise it's up side down
          }
          obj.size = obj.viz.size;
          obj.color = obj.viz.color;
        }

        if (obj.attributes) {
          if (obj.attributes.latitude)
            obj.lat = obj.attributes.latitude;

          if (obj.attributes.longitude)
            obj.lng = obj.attributes.longitude;
        }
      }

      arr = graph.edges;
      for (i = 0, l = arr.length; i < l; i++) {
        obj = arr[i];

        obj.id = typeof obj.id === 'string' ? obj.id : edgeId();
        obj.source = '' + obj.source;
        obj.target = '' + obj.target;

        if (obj.viz && typeof obj.viz === 'object') {
          obj.color = obj.viz.color;
          obj.size = obj.viz.thickness;
        }

        // Weight over viz.thickness?
        obj.size = obj.weight;

        // Changing type to be direction so it won't mess with sigma's naming
        obj.direction = obj.type;
        delete obj.type;
      }

      // Update the instance's graph:
      if (sig instanceof sigma) {
        sig.graph.clear();

        arr = graph.nodes;
        for (i = 0, l = arr.length; i < l; i++)
          sig.graph.addNode(arr[i]);

        arr = graph.edges;
        for (i = 0, l = arr.length; i < l; i++)
          sig.graph.addEdge(arr[i]);

      // ...or instantiate sigma if needed:
      } else if (typeof sig === 'object') {
        sig.graph = graph;
        sig = new sigma(sig);

      // ...or it's finally the callback:
      } else if (typeof sig === 'function') {
        callback = sig;
        sig = null;
      }

      // Call the callback if specified:
      if (callback) {
        callback(sig || graph);
        return;
      } else
        return graph;
    }

    if (typeof target === 'string')
      gexf.fetch(target, parse);
    else if (typeof target === 'object')
      return parse(gexf.parse(target));
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.parsers');
  sigma.utils.pkg('sigma.utils');

  /**
   * Just an XmlHttpRequest polyfill for different IE versions.
   *
   * @return {*} The XHR like object.
   */
  sigma.utils.xhr = function() {
    if (window.XMLHttpRequest)
      return new XMLHttpRequest();

    var names,
        i;

    if (window.ActiveXObject) {
      names = [
        'Msxml2.XMLHTTP.6.0',
        'Msxml2.XMLHTTP.3.0',
        'Msxml2.XMLHTTP',
        'Microsoft.XMLHTTP'
      ];

      for (i in names)
        try {
          return new ActiveXObject(names[i]);
        } catch (e) {}
    }

    return null;
  };

  /**
   * This function loads a JSON file and creates a new sigma instance or
   * updates the graph of a given instance. It is possible to give a callback
   * that will be executed at the end of the process.
   *
   * @param  {string}       url      The URL of the JSON file.
   * @param  {object|sigma} sig      A sigma configuration object or a sigma
   *                                 instance.
   * @param  {?function}    callback Eventually a callback to execute after
   *                                 having parsed the file. It will be called
   *                                 with the related sigma instance as
   *                                 parameter.
   */
  sigma.parsers.json = function(url, sig, callback) {
    var graph,
        xhr = sigma.utils.xhr();

    if (!xhr)
      throw 'XMLHttpRequest not supported, cannot load the file.';

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        graph = JSON.parse(xhr.responseText);

        // Update the instance's graph:
        if (sig instanceof sigma) {
          sig.graph.clear();
          sig.graph.read(graph);

        // ...or instantiate sigma if needed:
        } else if (typeof sig === 'object') {
          sig.graph = graph;
          sig = new sigma(sig);

        // ...or it's finally the callback:
        } else if (typeof sig === 'function') {
          callback = sig;
          sig = null;
        }

        // Call the callback if specified:
        if (callback)
          callback(sig || graph);
      }
    };
    xhr.send();
  };
}).call(this);

(function() {
  'use strict';

  if (typeof sigma === 'undefined') {
    throw 'sigma is not declared';
  }

  // Default function to compute path length between two nodes:
  // the euclidian
  var defaultPathLengthFunction = function(node1, node2, previousPathLength) {
    var isEverythingDefined =
      node1 != undefined &&
      node2 != undefined &&
      node1.x != undefined &&
      node1.y != undefined &&
      node2.x != undefined &&
      node2.y != undefined;
    if(!isEverythingDefined) {
      return undefined;
    }

    return (previousPathLength || 0) + Math.sqrt(
      Math.pow((node2.y - node1.y), 2) + Math.pow((node2.x - node1.x), 2)
    );
  };

  sigma.classes.graph.addMethod(
    'astar',
    function(srcId, destId, settings) {
      var currentSettings = new sigma.classes.configurable(
        // Default settings
        {
          // Graph is directed, affects which edges are taken into account
          undirected: false,
          // Function to compute the distance between two connected node
          pathLengthFunction: defaultPathLengthFunction,
          // Function to compute an distance between two nodes
          // if undefined, uses pathLengthFunction
          heuristicLengthFunction: undefined
        },
        settings || {});

      var pathLengthFunction = currentSettings("pathLengthFunction"),
          heuristicLengthFunction = currentSettings("heuristicLengthFunction") || pathLengthFunction;

      var srcNode = this.nodes(srcId),
          destNode = this.nodes(destId);

      var closedList = {},
          openList = [];

      var addToLists = function(node, previousNode, pathLength, heuristicLength) {
        var nodeId = node.id;
        var newItem = {
          pathLength: pathLength,
          heuristicLength: heuristicLength,
          node: node,
          nodeId: nodeId,
          previousNode: previousNode
        };

        if(closedList[nodeId] == undefined || closedList[nodeId].pathLenth > pathLength) {
          closedList[nodeId] = newItem;

          var item;
          var i;
          for(i = 0; i < openList.length; i++) {
            item = openList[i];
            if(item.heuristicLength > heuristicLength) {
              break;
            }
          }

          openList.splice(i, 0, newItem);
        }
      };

      addToLists(srcNode, null, 0, 0);

      var pathFound = false;

      // Depending of the type of graph (directed or not),
      // the neighbors are either the out neighbors or all.
      var allNeighbors;
      if(currentSettings("undirected")) {
        allNeighbors = this.allNeighborsIndex;
      }
      else {
        allNeighbors = this.outNeighborsIndex;
      }


      var inspectedItem,
          neighbors,
          neighbor,
          pathLength,
          heuristicLength,
          i;
      while(openList.length > 0) {
        inspectedItem = openList.shift();

        // We reached the destination node
        if(inspectedItem.nodeId == destId) {
          pathFound = true;
          break;
        }

        neighbors = Object.keys(allNeighbors[inspectedItem.nodeId]);
        for(i = 0; i < neighbors.length; i++) {
          neighbor = this.nodes(neighbors[i]);
          pathLength = pathLengthFunction(inspectedItem.node, neighbor, inspectedItem.pathLength);
          heuristicLength = heuristicLengthFunction(neighbor, destNode, pathLength);
          addToLists(neighbor, inspectedItem.node, pathLength, heuristicLength);
        }
      }

      if(pathFound) {
        // Rebuilding path
        var path = [],
            currentNode = destNode;

        while(currentNode) {
          path.unshift(currentNode);
          currentNode = closedList[currentNode.id].previousNode;
        }

        return path;
      }
      else {
        return undefined;
      }
    }
  );
}).call(window);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');

  /**
   * Sigma ActiveState
   * =============================
   *
   * @author Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * @version 0.1
   */

  var _instance = null,
      // Indexes are working now, i.e. before the ActiveState constructor is
      // called, to index active nodes and edges when a graph object is passed
      // to sigma at instantiation.
      _activeNodesIndex,
      _activeEdgesIndex,
      _g = null,
      _enableEvents = true;

  function initIndexes() {
    _activeNodesIndex = new sigma.utils.map();
    _activeEdgesIndex = new sigma.utils.map();
  };
  initIndexes();

  /**
   * Dispatch the 'activeNodes' event.
   */
  function dispatchNodeEvent() {
    if(_instance !== null && _enableEvents) {
      _instance.dispatchEvent('activeNodes');
    }
  };

  /**
   * Dispatch the 'activeEdges' event.
   */
  function dispatchEdgeEvent() {
    if(_instance !== null && _enableEvents) {
      _instance.dispatchEvent('activeEdges');
    }
  };

  /**
   * Attach methods to the graph to keep indexes updated.
   * They may be called before the ActiveState constructor is called.
   * ------------------
   */

  // Index the node after its insertion in the graph if `n.active` is `true`.
  sigma.classes.graph.attach(
    'addNode',
    'sigma.plugins.activeState.addNode',
    function(n) {
      if (n.active) {
        _activeNodesIndex.set(n.id, this.nodesIndex.get(n.id));
        dispatchNodeEvent();
      }
    }
  );

  // Index the edge after its insertion in the graph if `e.active` is `true`.
  sigma.classes.graph.attach(
    'addEdge',
    'sigma.plugins.activeState.addEdge',
    function(e) {
      if (e.active) {
        _activeEdgesIndex.set(e.id, this.edgesIndex.get(e.id));
        dispatchEdgeEvent();
      }
    }
  );

  // Deindex the node before its deletion from the graph if `n.active` is
  // `true`.
  sigma.classes.graph.attachBefore(
    'dropNode',
    'sigma.plugins.activeState.dropNode',
    function(id) {
      if (this.nodesIndex.get(id) !== undefined && this.nodesIndex.get(id).active) {
        _activeNodesIndex.delete(id);
        dispatchNodeEvent();
      }
    }
  );

  // Deindex the edge before its deletion from the graph if `e.active` is
  // `true`.
  sigma.classes.graph.attachBefore(
    'dropEdge',
    'sigma.plugins.activeState.dropEdge',
    function(id) {
      if (this.edgesIndex.get(id) !== undefined && this.edgesIndex.get(id).active) {
        _activeEdgesIndex.delete(id);
        dispatchEdgeEvent();
      }
    }
  );

  // Deindex all nodes and edges before the graph is cleared.
  sigma.classes.graph.attachBefore(
    'clear',
    'sigma.plugins.activeState.clear',
    initIndexes
  );

  /**
   * ActiveState Object
   * ------------------
   * @param  {sigma} s                   The sigma instance.
   * @return {sigma.plugins.activeState} The instance itself.
   */
  function ActiveState(s) {
    _instance = this;
    _g = s.graph;

    if (_activeNodesIndex === null) {
      // It happens after a kill. Index nodes:
      _activeNodesIndex = new sigma.utils.map();

      _g.nodes().forEach(function(o) {
        if (o.active) {
          _activeNodesIndex.set(o.id, o);
        }
      });
    }
    if (_activeEdgesIndex === null) {
      // It happens after a kill. Index edges:
      _activeEdgesIndex = new sigma.utils.map();

      _g.edges().forEach(function(o) {
        if (o.active) {
          _activeEdgesIndex.set(o.id, o);
        }
      });
    }

    sigma.classes.dispatcher.extend(this);

    // Binding on kill to properly clear the references
    s.bind('kill', function() {
      _instance.kill();
    });
  };

  ActiveState.prototype.kill = function() {
    this.unbind();
    _activeNodesIndex = null;
    _activeEdgesIndex = null;
    _g = null;
    _instance = null;
  };

  /**
   * This method will set one or several nodes as 'active', depending on how it
   * is called.
   *
   * To activate all nodes, call it without argument.
   * To activate a specific node, call it with the id of the node. To activate
   * multiple nodes, call it with an array of ids.
   *
   * @param  {(number|string|array)} v   Eventually one id, an array of ids.
   * @return {sigma.plugins.activeState} Returns the instance itself.
   */
  ActiveState.prototype.addNodes = function(v) {
    var oldCount = _activeNodesIndex.size,
        n;

    // Activate all nodes:
    if (!arguments.length) {
      _g.nodes().forEach(function(o) {
        if (!o.hidden) {
          o.active = true;
          _activeNodesIndex.set(o.id, o);
        }
      });
    }

    if (arguments.length > 1) {
      throw new TypeError('Too many arguments. Use an array instead.');
    }

    // Activate one node:
    else if (typeof v === 'string' || typeof v === 'number') {
      n = _g.nodes(v);
      if (!n.hidden) {
        n.active = true;
        _activeNodesIndex.set(v, n);
      }
    }

    // Activate a set of nodes:
    else if (Array.isArray(v)) {
      var i,
          l,
          a = [];

      for (i = 0, l = v.length; i < l; i++)
        if (typeof v[i] === 'string' || typeof v[i] === 'number') {
          n = _g.nodes(v[i]);
          if (!n.hidden) {
            n.active = true;
            _activeNodesIndex.set(v[i], n);
          }
        }
        else
          throw new TypeError('Invalid argument: a node id is not a string or a number, was ' + v[i]);
    }

    if (oldCount != _activeNodesIndex.size) {
      dispatchNodeEvent();
    }

    return this;
  };

  /**
   * This method will set one or several visible edges as 'active', depending
   * on how it is called.
   *
   * To activate all visible edges, call it without argument.
   * To activate a specific visible edge, call it with the id of the edge.
   * To activate multiple visible edges, call it with an array of ids.
   *
   * @param  {(number|string|array)} v   Eventually one id, an array of ids.
   * @return {sigma.plugins.activeState} Returns the instance itself.
   */
  ActiveState.prototype.addEdges = function(v) {
    var oldCount = _activeEdgesIndex.size,
        e;

    // Activate all edges:
    if (!arguments.length) {
      _g.edges().forEach(function(o) {
        if (!o.hidden) {
          o.active = true;
          _activeEdgesIndex.set(o.id, o);
        }
      });
    }

    if (arguments.length > 1) {
      throw new TypeError('Too many arguments. Use an array instead.');
    }

    // Activate one edge:
    else if (typeof v === 'string' || typeof v === 'number') {
      e = _g.edges(v);
      if (!e.hidden) {
        e.active = true;
        _activeEdgesIndex.set(v, e);
      }
    }

    // Activate a set of edges:
    else if (Array.isArray(v)) {
      var i,
          l,
          a = [];

      for (i = 0, l = v.length; i < l; i++)
        if (typeof v[i] === 'string' || typeof v[i] === 'number') {
          e = _g.edges(v[i]);
          if (!e.hidden) {
            e.active = true;
            _activeEdgesIndex.set(v[i], e);
          }
        }
        else
          throw new TypeError('Invalid argument: an edge id is not a string or a number, was ' + v[i]);
    }

    if (oldCount != _activeEdgesIndex.size) {
      dispatchEdgeEvent();
    }

    return this;
  };

  /**
   * This method will set one or several nodes as 'inactive', depending on how
   * it is called.
   *
   * To deactivate all nodes, call it without argument.
   * To deactivate a specific node, call it with the id of the node. To
   * deactivate multiple nodes, call it with an array of ids.
   *
   * @param  {(number|string|array)} v   Eventually one id, an array of ids.
   * @return {sigma.plugins.activeState} Returns the instance itself.
   */
  ActiveState.prototype.dropNodes = function(v) {
    var oldCount = _activeNodesIndex.size;

    // Deactivate all nodes:
    if (!arguments.length) {
      _g.nodes().forEach(function(o) {
        o.active = false;
        _activeNodesIndex.delete(o.id);
      });
    }

    if (arguments.length > 1) {
      throw new TypeError('Too many arguments. Use an array instead.');
    }

    // Deactivate one node:
    else if (typeof v === 'string' || typeof v === 'number') {
      _g.nodes(v).active = false;
      _activeNodesIndex.delete(v);
    }

    // Deactivate a set of nodes:
    else if (Array.isArray(v)) {
      var i,
          l;

      for (i = 0, l = v.length; i < l; i++)
        if (typeof v[i] === 'string' || typeof v[i] === 'number') {
          _g.nodes(v[i]).active = false;
          _activeNodesIndex.delete(v[i]);
        }
        else
          throw new TypeError('Invalid argument: a node id is not a string or a number, was ' + v[i]);
    }

    if (oldCount != _activeNodesIndex.size) {
      dispatchNodeEvent();
    }

    return this;
  };

  /**
   * This method will set one or several edges as 'inactive', depending on how
   * it is called.
   *
   * To deactivate all edges, call it without argument.
   * To deactivate a specific edge, call it with the id of the edge. To
   * deactivate multiple edges, call it with an array of ids.
   *
   * @param  {(number|string|array)} v   Eventually one id, an array of ids.
   * @return {sigma.plugins.activeState} Returns the instance itself.
   */
  ActiveState.prototype.dropEdges = function(v) {
    var oldCount = _activeEdgesIndex.size;

    // Deactivate all edges:
    if (!arguments.length) {
      _g.edges().forEach(function(o) {
        o.active = false;
        _activeEdgesIndex.delete(o.id);
      });
    }

    if (arguments.length > 1) {
      throw new TypeError('Too many arguments. Use an array instead.');
    }

    // Deactivate one edge:
    else if (typeof v === 'string' || typeof v === 'number') {
      _g.edges(v).active = false;
      _activeEdgesIndex.delete(v);
    }

    // Deactivate a set of edges:
    else if (Array.isArray(v)) {
      var i,
          l;

      for (i = 0, l = v.length; i < l; i++)
        if (typeof v[i] === 'string' || typeof v[i] === 'number') {
          _g.edges(v[i]).active = false;
          _activeEdgesIndex.delete(v[i]);
        }
        else
          throw new TypeError('Invalid argument: an edge id is not a string or a number, was ' + v[i]);
    }

    if (oldCount != _activeEdgesIndex.size) {
      dispatchEdgeEvent();
    }

    return this;
  };

  /**
   * This method will set the visible neighbors of all active nodes as 'active'.
   *
   * @return {sigma.plugins.activeState} Returns the instance itself.
   */
  ActiveState.prototype.addNeighbors = function() {
    if (!('adjacentNodes' in _g))
      throw new Error('Missing method graph.adjacentNodes');

    var a = _activeNodesIndex.keyList();

    _activeNodesIndex.forEach(function(n, id) {
      _g.adjacentNodes(id).forEach(function (adj) {
        if (!adj.hidden)
          a.push(adj.id);
      });
    });

    _enableEvents = false;
    this.dropNodes().dropEdges();
    _enableEvents = true;
    this.addNodes(a);

    return this;
  };

  /**
   * This method will set the nodes that pass a specified truth test (i.e.
   * predicate) as 'active', or as 'inactive' otherwise. The method must be
   * called with the predicate, which is a function that takes a node as
   * argument and returns a boolean. The context of the predicate is
   * {{sigma.graph}}.
   *
   * // Activate isolated nodes:
   * > var activeState = new sigma.plugins.activeState(sigInst.graph);
   * > activeState.setNodesBy(function(n) {
   * >   return this.degree(n.id) === 0;
   * > });
   *
   * @param  {function}                  fn The predicate.
   * @return {sigma.plugins.activeState}    Returns the instance itself.
   */
  ActiveState.prototype.setNodesBy = function(fn) {
    var a = [];

    _g.nodes().forEach(function (o) {
      if (fn.call(_g, o)) {
        if (!o.hidden)
          a.push(o.id);
      }
    });

    _enableEvents = false;
    this.dropNodes();
    _enableEvents = true;
    this.addNodes(a);

    return this;
  };

  /**
   * This method will set the edges that pass a specified truth test (i.e.
   * predicate) as 'active', or as 'inactive' otherwise. The method must be
   * called with the predicate, which is a function that takes a node as
   * argument and returns a boolean. The context of the predicate is
   * {{sigma.graph}}.
   *
   * @param  {function}                  fn The predicate.
   * @return {sigma.plugins.activeState}    Returns the instance itself.
   */
  ActiveState.prototype.setEdgesBy = function(fn) {
    var a = [];

    _g.edges().forEach(function (o) {
      if (fn.call(_g, o)) {
        if (!o.hidden)
          a.push(o.id);
      }
    });

    _enableEvents = false;
    this.dropEdges();
    _enableEvents = true;
    this.addEdges(a);

    return this;
  };

  /**
   * This method will set the active nodes as 'inactive' and the other nodes as
   * 'active'.
   *
   * @return {sigma.plugins.activeState} Returns the instance itself.
   */
  ActiveState.prototype.invertNodes = function() {
    var a = _g.nodes().filter(function (o) {
      return !o.hidden && !o.active;
    }).map(function (o) {
      return o.id;
    });

    _enableEvents = false;
    this.dropNodes();
    _enableEvents = true;

    if (a.length) {
      this.addNodes(a);
    }
    else {
      dispatchNodeEvent();
    }

    return this;
  };

  /**
   * This method will set the active edges as 'inactive' and the other edges as
   * 'active'.
   *
   * @return {sigma.plugins.activeState} Returns the instance itself.
   */
  ActiveState.prototype.invertEdges = function() {
    var a = _g.edges().filter(function (o) {
      return !o.hidden && !o.active;
    }).map(function (o) {
      return o.id;
    });

    _enableEvents = false;
    this.dropEdges();
    _enableEvents = true;

    if (a.length) {
      this.addEdges(a);
    }
    else {
      dispatchEdgeEvent();
    }

    return this;
  };

  /**
   * This method returns an array of the active nodes.
   * @return {array} The active nodes.
   */
  ActiveState.prototype.nodes = function() {
    if (!_activeNodesIndex) return [];

    if (!sigma.forceES5) {
      return _activeNodesIndex.valueList();
    }

    var id,
        a = [];
    _activeNodesIndex.forEach(function(n, id) {
      a.push(n);
    });
    return a;
  };

  /**
   * This method returns an array of the active edges.
   * @return {array} The active edges.
   */
  ActiveState.prototype.edges = function() {
    if (!_activeEdgesIndex) return [];

    if (!sigma.forceES5) {
      return _activeEdgesIndex.valueList();
    }

    var id,
        a = [];
    _activeEdgesIndex.forEach(function(e, id) {
      a.push(e);
    });
    return a;
  };

  /**
   * This method returns the number of the active edges.
   * @return {number} The number of active edges.
   */
  ActiveState.prototype.nbNodes = function() {
    if (!_activeNodesIndex) return 0;
    return _activeNodesIndex.size;
  };

  /**
   * This method returns the number of the active nodes.
   * @return {number} The number of active nodes.
   */
  ActiveState.prototype.nbEdges = function() {
    if (!_activeEdgesIndex) return 0;
    return _activeEdgesIndex.size;
  };


  /**
   * Interface
   * ------------------
   */

  /**
   * @param {sigma} s The sigma instance.
   */
  sigma.plugins.activeState = function(s) {
    // Create object if undefined
    if (!_instance) {
      _instance = new ActiveState(s);
    }
    return _instance;
  };

  /**
   *  This function kills the activeState instance.
   */
  sigma.plugins.killActiveState = function() {
    if (_instance instanceof ActiveState) {
      _instance.kill();
      _instance = null;
    }
  };

}).call(this);

/**
 * This plugin provides a method to animate a sigma instance by interpolating
 * some node properties. Check the sigma.plugins.animate function doc or the
 * examples/animate.html code sample to know more.
 */
(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  sigma.utils.pkg('sigma.plugins');

  var _id = 0,
      _cache = {};

  // TOOLING FUNCTIONS:
  // ******************
  function parseColor(val) {
    if (_cache[val])
      return _cache[val];

    var result = [0, 0, 0];

    if (val.match(/^#/)) {
      val = (val || '').replace(/^#/, '');
      result = (val.length === 3) ?
        [
          parseInt(val.charAt(0) + val.charAt(0), 16),
          parseInt(val.charAt(1) + val.charAt(1), 16),
          parseInt(val.charAt(2) + val.charAt(2), 16)
        ] :
        [
          parseInt(val.charAt(0) + val.charAt(1), 16),
          parseInt(val.charAt(2) + val.charAt(3), 16),
          parseInt(val.charAt(4) + val.charAt(5), 16)
        ];
    } else if (val.match(/^ *rgba? *\(/)) {
      val = val.match(
        /^ *rgba? *\( *([0-9]*) *, *([0-9]*) *, *([0-9]*) *(,.*)?\) *$/
      );
      result = [
        +val[1],
        +val[2],
        +val[3]
      ];
    }

    _cache[val] = {
      r: result[0],
      g: result[1],
      b: result[2]
    };

    return _cache[val];
  }

  function interpolateColors(c1, c2, p) {
    c1 = parseColor(c1);
    c2 = parseColor(c2);

    var c = {
      r: c1.r * (1 - p) + c2.r * p,
      g: c1.g * (1 - p) + c2.g * p,
      b: c1.b * (1 - p) + c2.b * p
    };

    return 'rgb(' + [c.r | 0, c.g | 0, c.b | 0].join(',') + ')';
  }

  /**
   * This function will animate some specified node properties. It will
   * basically call requestAnimationFrame, interpolate the values and call the
   * refresh method during a specified duration.
   *
   * Events fired though sigma instance:
   * *************
   * animate.start  Fired at the beginning of the animation.
   * animate.end    Fired at the end of the animation.
   *
   * Recognized parameters:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the settings
   * object:
   *
   *   {?array}             nodes      An array of node objects or node ids. If
   *                                   not specified, all nodes of the graph
   *                                   will be animated.
   *   {?(function|string)} easing     Either the name of an easing in the
   *                                   sigma.utils.easings package or a
   *                                   function. If not specified, the
   *                                   quadraticInOut easing from this package
   *                                   will be used instead.
   *   {?number}            duration   The duration of the animation. If not
   *                                   specified, the "animationsTime" setting
   *                                   value of the sigma instance will be used
   *                                   instead.
   *   {?function}          onComplete Eventually a function to call when the
   *                                   animation is ended.
   *
   * @param  {sigma}   s       The related sigma instance.
   * @param  {object}  animate An hash with the keys being the node properties
   *                           to interpolate, and the values being the related
   *                           target values.
   * @param  {?object} options Eventually an object with options.
   */
  sigma.plugins.animate = function(s, animate, options) {
    var o = options || {},
        id = ++_id,
        duration = o.duration || s.settings('animationsTime'),
        easing = typeof o.easing === 'string' ?
          sigma.utils.easings[o.easing] :
          typeof o.easing === 'function' ?
          o.easing :
          sigma.utils.easings.quadraticInOut,
        start = sigma.utils.dateNow(),
        nodes,
        startPositions;

    if (o.nodes && o.nodes.length) {
      if (typeof o.nodes[0] === 'object')
        nodes = o.nodes;
      else
        nodes = s.graph.nodes(o.nodes); // argument is an array of IDs
    }
    else
      nodes = s.graph.nodes();

    // Store initial positions:
    startPositions = nodes.reduce(function(res, node) {
      var k;
      res[node.id] = {};
      for (k in animate)
        if (k in node)
          res[node.id][k] = node[k];
      return res;
    }, {});

    s.animations = s.animations || Object.create({});
    sigma.plugins.killAnimate(s);

    s.dispatchEvent('animate.start'); // send a sigma event

    function step() {
      var p = (sigma.utils.dateNow() - start) / duration;

      if (p >= 1) {
        nodes.forEach(function(node) {
          for (var k in animate)
            if (k in animate && animate[k] in node)
              node[k] = node[animate[k]];
        });

        s.refresh({skipIndexation: true});
        if (typeof o.onComplete === 'function') {
          o.onComplete();
        }
        s.dispatchEvent('animate.end'); // send a sigma event
      }
      else {
        p = easing(p);
        nodes.forEach(function(node) {
          for (var k in animate)
            if (k in animate && animate[k] in node) {
              if (k.match(/color$/))
                node[k] = interpolateColors(
                  startPositions[node.id][k],
                  node[animate[k]],
                  p
                );
              else
                node[k] =
                  node[animate[k]] * p +
                  startPositions[node.id][k] * (1 - p);
            }
        });

        s.refresh({skipIndexation: true});
        s.animations[id] = requestAnimationFrame(step);
      }
    }

    step();
  };

  sigma.plugins.killAnimate = function(s) {
    for (var k in (s.animations || {}))
      cancelAnimationFrame(s.animations[k]);
  };
}).call(window);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');


// This product includes color specifications and designs developed by Cynthia Brewer (http://colorbrewer.org/).
sigma.plugins.colorbrewer = {YlGn: {
3: ["#f7fcb9","#addd8e","#31a354"],
4: ["#ffffcc","#c2e699","#78c679","#238443"],
5: ["#ffffcc","#c2e699","#78c679","#31a354","#006837"],
6: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#31a354","#006837"],
7: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
8: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
9: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]
},YlGnBu: {
3: ["#edf8b1","#7fcdbb","#2c7fb8"],
4: ["#ffffcc","#a1dab4","#41b6c4","#225ea8"],
5: ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"],
6: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"],
7: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
8: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
9: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
},GnBu: {
3: ["#e0f3db","#a8ddb5","#43a2ca"],
4: ["#f0f9e8","#bae4bc","#7bccc4","#2b8cbe"],
5: ["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"],
6: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#43a2ca","#0868ac"],
7: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
8: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
9: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]
},BuGn: {
3: ["#e5f5f9","#99d8c9","#2ca25f"],
4: ["#edf8fb","#b2e2e2","#66c2a4","#238b45"],
5: ["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"],
6: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#2ca25f","#006d2c"],
7: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
8: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
9: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]
},PuBuGn: {
3: ["#ece2f0","#a6bddb","#1c9099"],
4: ["#f6eff7","#bdc9e1","#67a9cf","#02818a"],
5: ["#f6eff7","#bdc9e1","#67a9cf","#1c9099","#016c59"],
6: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#1c9099","#016c59"],
7: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
8: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
9: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"]
},PuBu: {
3: ["#ece7f2","#a6bddb","#2b8cbe"],
4: ["#f1eef6","#bdc9e1","#74a9cf","#0570b0"],
5: ["#f1eef6","#bdc9e1","#74a9cf","#2b8cbe","#045a8d"],
6: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"],
7: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
8: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
9: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"]
},BuPu: {
3: ["#e0ecf4","#9ebcda","#8856a7"],
4: ["#edf8fb","#b3cde3","#8c96c6","#88419d"],
5: ["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"],
6: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"],
7: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
8: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
9: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"]
},RdPu: {
3: ["#fde0dd","#fa9fb5","#c51b8a"],
4: ["#feebe2","#fbb4b9","#f768a1","#ae017e"],
5: ["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"],
6: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#c51b8a","#7a0177"],
7: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
8: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
9: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"]
},PuRd: {
3: ["#e7e1ef","#c994c7","#dd1c77"],
4: ["#f1eef6","#d7b5d8","#df65b0","#ce1256"],
5: ["#f1eef6","#d7b5d8","#df65b0","#dd1c77","#980043"],
6: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#dd1c77","#980043"],
7: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
8: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
9: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"]
},OrRd: {
3: ["#fee8c8","#fdbb84","#e34a33"],
4: ["#fef0d9","#fdcc8a","#fc8d59","#d7301f"],
5: ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"],
6: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"],
7: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
8: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
9: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]
},YlOrRd: {
3: ["#ffeda0","#feb24c","#f03b20"],
4: ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],
5: ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],
6: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],
7: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
8: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
9: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]
},YlOrBr: {
3: ["#fff7bc","#fec44f","#d95f0e"],
4: ["#ffffd4","#fed98e","#fe9929","#cc4c02"],
5: ["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"],
6: ["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"],
7: ["#ffffd4","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
8: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
9: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]
},Purples: {
3: ["#efedf5","#bcbddc","#756bb1"],
4: ["#f2f0f7","#cbc9e2","#9e9ac8","#6a51a3"],
5: ["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"],
6: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#756bb1","#54278f"],
7: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
8: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
9: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"]
},Blues: {
3: ["#deebf7","#9ecae1","#3182bd"],
4: ["#eff3ff","#bdd7e7","#6baed6","#2171b5"],
5: ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"],
6: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"],
7: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
8: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
9: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]
},Greens: {
3: ["#e5f5e0","#a1d99b","#31a354"],
4: ["#edf8e9","#bae4b3","#74c476","#238b45"],
5: ["#edf8e9","#bae4b3","#74c476","#31a354","#006d2c"],
6: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"],
7: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
8: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
9: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]
},Oranges: {
3: ["#fee6ce","#fdae6b","#e6550d"],
4: ["#feedde","#fdbe85","#fd8d3c","#d94701"],
5: ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"],
6: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"],
7: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
8: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
9: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]
},Reds: {
3: ["#fee0d2","#fc9272","#de2d26"],
4: ["#fee5d9","#fcae91","#fb6a4a","#cb181d"],
5: ["#fee5d9","#fcae91","#fb6a4a","#de2d26","#a50f15"],
6: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],
7: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
8: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
9: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]
},Greys: {
3: ["#f0f0f0","#bdbdbd","#636363"],
4: ["#f7f7f7","#cccccc","#969696","#525252"],
5: ["#f7f7f7","#cccccc","#969696","#636363","#252525"],
6: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#636363","#252525"],
7: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
8: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
9: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"]
},PuOr: {
3: ["#f1a340","#f7f7f7","#998ec3"],
4: ["#e66101","#fdb863","#b2abd2","#5e3c99"],
5: ["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"],
6: ["#b35806","#f1a340","#fee0b6","#d8daeb","#998ec3","#542788"],
7: ["#b35806","#f1a340","#fee0b6","#f7f7f7","#d8daeb","#998ec3","#542788"],
8: ["#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788"],
9: ["#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788"],
10: ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],
11: ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]
},BrBG: {
3: ["#d8b365","#f5f5f5","#5ab4ac"],
4: ["#a6611a","#dfc27d","#80cdc1","#018571"],
5: ["#a6611a","#dfc27d","#f5f5f5","#80cdc1","#018571"],
6: ["#8c510a","#d8b365","#f6e8c3","#c7eae5","#5ab4ac","#01665e"],
7: ["#8c510a","#d8b365","#f6e8c3","#f5f5f5","#c7eae5","#5ab4ac","#01665e"],
8: ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e"],
9: ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e"],
10: ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],
11: ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]
},PRGn: {
3: ["#af8dc3","#f7f7f7","#7fbf7b"],
4: ["#7b3294","#c2a5cf","#a6dba0","#008837"],
5: ["#7b3294","#c2a5cf","#f7f7f7","#a6dba0","#008837"],
6: ["#762a83","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837"],
7: ["#762a83","#af8dc3","#e7d4e8","#f7f7f7","#d9f0d3","#7fbf7b","#1b7837"],
8: ["#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837"],
9: ["#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837"],
10: ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],
11: ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"]
},PiYG: {
3: ["#e9a3c9","#f7f7f7","#a1d76a"],
4: ["#d01c8b","#f1b6da","#b8e186","#4dac26"],
5: ["#d01c8b","#f1b6da","#f7f7f7","#b8e186","#4dac26"],
6: ["#c51b7d","#e9a3c9","#fde0ef","#e6f5d0","#a1d76a","#4d9221"],
7: ["#c51b7d","#e9a3c9","#fde0ef","#f7f7f7","#e6f5d0","#a1d76a","#4d9221"],
8: ["#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221"],
9: ["#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221"],
10: ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],
11: ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"]
},RdBu: {
3: ["#ef8a62","#f7f7f7","#67a9cf"],
4: ["#ca0020","#f4a582","#92c5de","#0571b0"],
5: ["#ca0020","#f4a582","#f7f7f7","#92c5de","#0571b0"],
6: ["#b2182b","#ef8a62","#fddbc7","#d1e5f0","#67a9cf","#2166ac"],
7: ["#b2182b","#ef8a62","#fddbc7","#f7f7f7","#d1e5f0","#67a9cf","#2166ac"],
8: ["#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac"],
9: ["#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac"],
10: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],
11: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]
},RdGy: {
3: ["#ef8a62","#ffffff","#999999"],
4: ["#ca0020","#f4a582","#bababa","#404040"],
5: ["#ca0020","#f4a582","#ffffff","#bababa","#404040"],
6: ["#b2182b","#ef8a62","#fddbc7","#e0e0e0","#999999","#4d4d4d"],
7: ["#b2182b","#ef8a62","#fddbc7","#ffffff","#e0e0e0","#999999","#4d4d4d"],
8: ["#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d"],
9: ["#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d"],
10: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],
11: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"]
},RdYlBu: {
3: ["#fc8d59","#ffffbf","#91bfdb"],
4: ["#d7191c","#fdae61","#abd9e9","#2c7bb6"],
5: ["#d7191c","#fdae61","#ffffbf","#abd9e9","#2c7bb6"],
6: ["#d73027","#fc8d59","#fee090","#e0f3f8","#91bfdb","#4575b4"],
7: ["#d73027","#fc8d59","#fee090","#ffffbf","#e0f3f8","#91bfdb","#4575b4"],
8: ["#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4"],
9: ["#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4"],
10: ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],
11: ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]
},Spectral: {
3: ["#fc8d59","#ffffbf","#99d594"],
4: ["#d7191c","#fdae61","#abdda4","#2b83ba"],
5: ["#d7191c","#fdae61","#ffffbf","#abdda4","#2b83ba"],
6: ["#d53e4f","#fc8d59","#fee08b","#e6f598","#99d594","#3288bd"],
7: ["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],
8: ["#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd"],
9: ["#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd"],
10: ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],
11: ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]
},RdYlGn: {
3: ["#fc8d59","#ffffbf","#91cf60"],
4: ["#d7191c","#fdae61","#a6d96a","#1a9641"],
5: ["#d7191c","#fdae61","#ffffbf","#a6d96a","#1a9641"],
6: ["#d73027","#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850"],
7: ["#d73027","#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850"],
8: ["#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850"],
9: ["#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"],
10: ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],
11: ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]
},Accent: {
3: ["#7fc97f","#beaed4","#fdc086"],
4: ["#7fc97f","#beaed4","#fdc086","#ffff99"],
5: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0"],
6: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f"],
7: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17"],
8: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"]
},Dark2: {
3: ["#1b9e77","#d95f02","#7570b3"],
4: ["#1b9e77","#d95f02","#7570b3","#e7298a"],
5: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e"],
6: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02"],
7: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d"],
8: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]
},Paired: {
3: ["#a6cee3","#1f78b4","#b2df8a"],
4: ["#a6cee3","#1f78b4","#b2df8a","#33a02c"],
5: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99"],
6: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c"],
7: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f"],
8: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00"],
9: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6"],
10: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"],
11: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99"],
12: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]
},Pastel1: {
3: ["#fbb4ae","#b3cde3","#ccebc5"],
4: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4"],
5: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6"],
6: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc"],
7: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd"],
8: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec"],
9: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]
},Pastel2: {
3: ["#b3e2cd","#fdcdac","#cbd5e8"],
4: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4"],
5: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9"],
6: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae"],
7: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc"],
8: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"]
},Set1: {
3: ["#e41a1c","#377eb8","#4daf4a"],
4: ["#e41a1c","#377eb8","#4daf4a","#984ea3"],
5: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00"],
6: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33"],
7: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628"],
8: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf"],
9: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]
},Set2: {
3: ["#66c2a5","#fc8d62","#8da0cb"],
4: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3"],
5: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"],
6: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f"],
7: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494"],
8: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]
},Set3: {
3: ["#8dd3c7","#ffffb3","#bebada"],
4: ["#8dd3c7","#ffffb3","#bebada","#fb8072"],
5: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3"],
6: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462"],
7: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69"],
8: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5"],
9: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9"],
10: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd"],
11: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5"],
12: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]
}};

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');

  /**
   * Sigma design
   * =============================
   *
   * @author Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * @version 0.4
   */


  /**
   * Convert Javascript string in dot notation into an object reference.
   *
   * @param  {object} obj The object.
   * @param  {string} str The string to convert, e.g. 'a.b.etc'.
   * @return {?}          The object reference.
   */
  function strToObjectRef(obj, str) {
    // http://stackoverflow.com/a/6393943
    return str.split('.').reduce(function(obj, i) { return obj[i] }, obj);
  }

  /**
   * This custom tool function removes every pair key/value from an hash. The
   * goal is to avoid creating a new object while some other references are
   * still hanging in some scopes...
   *
   * @param  {object} obj The object to empty.
   * @return {object}     The empty object.
   */
  function emptyObject(obj) {
    var k;

    for (k in obj)
      if (!('hasOwnProperty' in obj) || obj.hasOwnProperty(k))
        delete obj[k];

    return obj;
  }

  /**
   * Fast deep copy function.
   *
   * @param  {object} o The object.
   * @return {object}   The object copy.
   */
  function deepCopy(o) {
    var copy = Object.create(null);
    for (var i in o) {
      if (typeof o[i] === "object" && o[i] !== null) {
        copy[i] = deepCopy(o[i]);
      }
      else if (typeof o[i] === "function" && o[i] !== null) {
        // clone function:
        eval(" copy[i] = " +  o[i].toString());
        //copy[i] = o[i].bind(_g);
      }

      else
        copy[i] = o[i];
    }
    return copy;
  }

  /**
   * This method will put the values in different bins using a linear scale,
   * for a specified number of bins (i.e. histogram). It will return a
   * dictionary of bins indexed by the specified values.
   *
   * @param  {array}  values The values.
   * @param  {number} nbins  The number of bins.
   * @return {object}        The basic histogram.
   */
  function baseHistogram(values, nbins) {
    var numlist,
        min,
        max,
        bin,
        res = {};

    if (!values.length)
      return res;

    // sort values by inverse order:
    numlist = values.map(function (val) {
      return parseFloat(val);
    })
    .sort(function(a, b) {
      return a - b;
    });

    min = numlist[0];
    max = numlist[numlist.length - 1];


    if (max - min !== 0) {
      numlist.forEach(function (num) {
        bin = Math.floor(nbins * Math.abs(num - min) / Math.abs(max - min));
        bin -= (bin == nbins) ? 1 : 0;
        res[num] = bin;
      });
    } else {
      // if the max is the same as the minimum, we put all the numbers in the same bin.
      numlist.forEach(function(num){
        res[num] = 0;
      });
    }

    return res;
  }

  /**
   * This function will generate a consolidated histogram of values grouped by
   * bins. The result is an array of objects ordered by bins. Each object
   * contains the list of `values` in the `bin`, the `min` and `max` values,
   * and the `ratio` of values in the bin compared to the largest bin.
   *
   * @param  {object} h         The nodes or edges histograms.
   * @param  {string} p         The property accessor.
   * @return {array}            The consolidated histogram.
   */
  function histogram(h, p) {
    var d = [],
        bins,
        maxOcc = 0;

    if (h && h[p]) {
      Object.keys(h[p]).forEach(function(value) {
        var bin = h[p][value];
        d[bin] = d[bin] || [];
        d[bin].push(+value);
      });

      bins = (d.length !== 1 ) ? d.length : 7;

      for (var bin = 0; bin < bins; bin++) {
        if (d[bin]) {
          maxOcc = (maxOcc > d[bin].length) ? maxOcc : d[bin].length;
        }
      }

      for (var bin = 0; bin < bins; bin++) {
        if (d[bin] === undefined) {
          d[bin] = [];
        }
        d[bin] = {
          bin: bin,
          values: d[bin],
          ratio: d[bin].length / maxOcc
        };
        // d[bin][visualVar] = design.palette.sequential[bins][bin];

        if (d[bin].values.length) {
          d[bin].min = Math.min.apply(null, d[bin].values);
          d[bin].max = Math.max.apply(null, d[bin].values);
        }
      }
    }
    return d;
  }

  /**
   * Add reference to nodes or edges in histogram bins.
   *
   * @param  {object} h         The nodes or edges histograms.
   * @param  {Vision} vision    The vision object.
   * @param  {string} p         The property accessor.
   * @return {array}            The consolidated histogram.
   */
  function resolveHistogram(h, vision, p) {
    var items = vision.get(p),
      item,
      value,
      nBins = h.length,
      maxOcc = 0;

    for (var bin = 0; bin < nBins; bin++) {
      h[bin].items = [];
    }

    Object.keys(items).forEach(function(value) {
      for (var i = 0; i < items[value].items.length; i++) {
        item = items[value].items[i];
        value = strToObjectRef(item, p);

        for (var bin = 0; bin < h.length; bin++) {
          if ((!'min' in h[bin]) || (!'max' in h[bin]))
            continue;

          if (h[bin].min <= value && value <= h[bin].max) {
            h[bin].items.push(item);
          }
        }
      }
    });

    for (var bin = 0; bin < nBins; bin++) {
      if (h[bin].items) {
        maxOcc = (maxOcc > h[bin].items.length) ? maxOcc : h[bin].items.length;
      }
    }

    for (var bin = 0; bin < nBins; bin++) {
      h[bin].itemsRatio = h[bin].items.length / maxOcc;
    }

    return h;
  }

  // Utilities
  function download(fileEntry, extension, filename) {
    var blob = null,
        objectUrl = null,
        dataUrl = null;

    if(window.Blob){
      // use Blob if available
      blob = new Blob([fileEntry], {type: 'text/json'});
      objectUrl = window.URL.createObjectURL(blob);
    }
    else {
      // else use dataURI
      dataUrl = 'data:text/json;charset=UTF-8,' + encodeURIComponent(fileEntry);
    }

    if (navigator.msSaveBlob) { // IE11+ : (has Blob, but not a[download])
      navigator.msSaveBlob(blob, filename);
    } else if (navigator.msSaveOrOpenBlob) { // IE10+ : (has Blob, but not a[download])
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // A-download
      var anchor = document.createElement('a');
      anchor.setAttribute('href', (window.Blob) ? objectUrl : dataUrl);
      anchor.setAttribute('download', filename || 'graph.' + extension);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    if (objectUrl) {
      setTimeout(function() { // Firefox needs a timeout
        window.URL.revokeObjectURL(objectUrl);
      }, 0);
    }
  }


  /**
   * This constructor instanciates a new vision on a specified dataset (nodes
   * or edges).
   *
   * @param  {sigma} s              The sigma instance.
   * @param  {function} datasetName The dataset. Available options: 'nodes',
   *                                'edges'.
   * @param  {object} mappings      The style mappings object.
   * @param  {object} palette       The palette object.
   * @return {Vision}               The vision instance.
   */
  function Vision(s, datasetName, mappings, palette) {
    var that = this;

    // defined below:
    this.visualVars = null;

    // mappings may be overriden:
    this.mappings = null;

    // palette may be overriden:
    this.palette = palette;

    // index of data properties:
    this.idx = Object.create(null);

    // histograms of data properties for visual variables:
    this.histograms = Object.create(null);

    // index of deprecated visions on data properties:
    this.deprecated = Object.create(null);

    // some original sigma settings:
    this.sigmaSettings = Object.create(null);

    // properties are sequential or qualitative data
    this.dataTypes = Object.create(null);

    // original values of visual variables
    this.originalVisualVariable = Object.create(null);

    // nodes or edges:
    if (datasetName === 'nodes') {
      this.visualVars = ['color', 'size', 'label', 'type', 'icon', 'image'];
      this.mappings = mappings.nodes;
      this.dataset = function() { return s.graph.nodes(); }
    }
    else if (datasetName === 'edges') {
      this.visualVars = ['color', 'size', 'label', 'type'];
      this.mappings = mappings.edges;
      this.dataset = function() { return s.graph.edges(); }
    }
    else
      throw new Error('Invalid argument: "datasetName" is not "nodes" or "edges", was ' + datasetName);


    /**
     * This method will index the collection with the specified property, and
     * will compute all styles related to the specified property for each item.
     *
     * @param  {string}  key The property accessor.
     */
    this.update = function(key) {
      // console.log('Vision.update', key);
      var self = this;

      if (key === undefined)
        throw new Error('Missing argument: "key".');

      if (typeof key !== 'string')
        throw new Error('Invalid argument: "key" is not a string, was ' + key);

      var val,
          byFn,
          schemeFn,
          isSequential = undefined,
          isArray = true;

      byFn = function(item, key) { return strToObjectRef(item, key); };
      schemeFn = function(palette, key) { return strToObjectRef(palette, key); };

      function insertItem(val, item) {
        if (self.idx[key][val] === undefined) {
          self.idx[key][val] = {
            key: val,
            items: [],
            styles: Object.create(null)
          };
        }
        self.idx[key][val].items.push(item);

        if (isSequential || isSequential === undefined) {
          isSequential = (typeof val === 'number');
          // TODO: throw error if is number AND (is NaN or is Infinity)
        }
      }

      // Index the collection:
      this.idx[key] = {};
      this.dataset().forEach(function (item) {
        val = byFn(item, key);
        if (val !== undefined) {
          if (isArray) {
            isArray = Array.isArray(val) ? isArray : false;
          }
          if (isArray) {
            if (val.length === 1) {
              insertItem(val[0], item);
            }
            else {
              val.forEach(function (v) {
                insertItem(v, item);
              });
            }
          }
          else {
            insertItem(val, item);
          }
        }
      });

      this.dataTypes[key] = { sequential: isSequential, array: isArray };
      this.deprecated[key] = false;

      // Find the max number of occurrence of values:
      var maxOcc = 0;
      for (val in this.idx[key]) {
        maxOcc =
          (maxOcc < this.idx[key][val].items.length) ?
          this.idx[key][val].items.length :
          maxOcc;
      }

      // number of occurrence / max number of occurrences of the value:
      Object.keys(this.idx[key]).forEach(function (val) {
        self.idx[key][val].ratio =
          parseFloat(self.idx[key][val].items.length / maxOcc);
      });

      var format,
          colorHist,
          sizeHist,
          colorScheme,
          typeScheme,
          iconScheme,
          imageScheme,
          bins,
          visualVars,
          nset = 0;

      // Visual variables mapped to the specified property:
      visualVars = Object.keys(that.mappings).filter(function (visualVar) {
        return (
          (that.mappings[visualVar]) &&
          (that.mappings[visualVar].by !== undefined) &&
          (that.mappings[visualVar].by.toString() == key)
        );
      });

      // Validate the mappings and compute histograms if needed:
      visualVars.forEach(function (visualVar) {
        switch (visualVar) {
          case 'color':
            colorScheme = that.mappings.color.scheme;

            if (typeof colorScheme !== 'string')
              throw new Error('color.scheme "' + colorScheme + '" is not a string.');

            if (isSequential) {
              bins = that.mappings.color.bins || 7;
              self.histograms.color = self.histograms.color || {};
              self.histograms.color[key] = baseHistogram(Object.keys(self.idx[key]), bins);
            }

            break;

          case 'label':
            format = that.mappings.label.format || function(item) {
              return (typeof item === 'string') ? item : item.label;
            };

            if (typeof format !== 'function')
              throw new Error('label.format "' + format + '" is not a function.');
            break;

          case 'size':
            if (isSequential === undefined) break;

            if (!isSequential)
              throw new Error('One value of the property "' + key + '" is not a number.');

            self.histograms.size = self.histograms.size || {};
            self.histograms.size[key] = baseHistogram(
              Object.keys(self.idx[key]),
              (that.mappings.size.bins || 7)
            );
            break;

          case 'type':
            typeScheme = that.mappings.type.scheme;

            if (typeof typeScheme !== 'string')
              throw new Error('type.scheme "' + typeScheme + '" is not a string.');

            break;

          case 'icon':
            iconScheme = that.mappings.icon.scheme;

            if (typeof iconScheme !== 'string')
              throw new Error('icon.scheme "' + iconScheme + '" is not a string.');

            break;

          case 'image':
            imageScheme = that.mappings.image.scheme;

            if (typeof imageScheme !== 'string')
              throw new Error('type.scheme "' + imageScheme + '" is not a string.');

            break;
        }
      });

      // Compute all styles related to the property for each item:
      Object.keys(this.idx[key]).forEach(function (val) {
        visualVars.forEach(function (visualVar) {
          switch (visualVar) {

            case 'color':
              if (isSequential) {
                self.idx[key][val].styles.color = function() {
                  var bin = self.histograms.color[key][val];
                  return schemeFn(that.palette, colorScheme)[bins][bin];
                };
              }
              else {
                self.idx[key][val].styles.color = function() {
                  if (schemeFn(that.palette, colorScheme) === undefined)
                    throw new Error('Wrong or undefined color scheme.');

                  if (that.mappings.color.set > 0) {
                    var setItem = schemeFn(that.palette, colorScheme)[that.mappings.color.set][nset];
                    nset = (nset + 1) % that.mappings.color.set;
                    return setItem;
                  }

                  return schemeFn(that.palette, colorScheme)[val];
                };
              }
              break;

            case 'label':
              self.idx[key][val].styles.label = function(item) {
                return format(byFn(item, key));
              };
              break;

            case 'size':
              self.idx[key][val].styles.size = function() {
                return 1 + self.histograms.size[key][val];
              };
              break;

            case 'type':
              self.idx[key][val].styles.type = function() {
                if (schemeFn(that.palette, typeScheme) === undefined)
                  throw new Error('Wrong or undefined type scheme.');

                return schemeFn(that.palette, typeScheme)[val];
              };
              break;

            case 'icon':
              self.idx[key][val].styles.icon = function() {
                if (schemeFn(that.palette, iconScheme) === undefined)
                  throw new Error('Wrong or undefined icon scheme.');

                return schemeFn(that.palette, iconScheme)[val];
              };
              break;

            case 'image':
              self.idx[key][val].styles.image = function() {
                if (schemeFn(that.palette, imageScheme) === undefined)
                  throw new Error('Wrong or undefined image scheme.');

                return schemeFn(that.palette, imageScheme)[val];
              };
              break;
          }
        });
      });
    };

    /**
     * This method will return the vision on a specified property. It will update
     * the vision on the property if it is deprecated or missing.
     *
     * @param  {string} key  The property accessor.
     * @return {object}      The vision on the property.
     */
    this.get = function (key) {
      if (key === undefined)
        throw new TypeError('Missing argument: "key".');

      if (typeof key !== 'string')
        throw new TypeError('Invalid argument: "key" is not a string, was ' + key);

      // lazy updating:
      if (this.deprecated[key]) this.update(key);

      // lazy indexing:
      if (this.idx[key] === undefined) this.update(key);

      return this.idx[key];
    };

    /**
     * This method will apply a mapping between a visual variable and a property.
     * It will update the vision on the property if it is deprecated or missing.
     * It will stores the original value of the visual variable for each item.
     * If the new value is `undefined`, it will keep the original value.
     * Available visual variables are stored in `visualVars`.
     *
     * @param {string} visualVar The name of the visual variable.
     * @param {string} key       The property accessor.
     */
    this.applyStyle = function(visualVar, key) {
      if (key === undefined)
        throw new TypeError('Missing argument: "key"');

      if (typeof key !== 'string')
        throw new TypeError('Invalid argument: "key" is not a string, was ' + key);

      if (this.visualVars.indexOf(visualVar) == -1)
        throw new Error('Unknown style "' + visualVar + '"');

      var self = this,
          idxp = this.get(key);

      if (visualVar === 'color' && self.dataTypes[key].array) {
        this.dataset().forEach(function (item) {
          delete item.colors;
        });

        Object.keys(idxp).forEach(function (val) {
          var o = idxp[val];
          o.items.forEach(function (item) {
            item.colors = [];
          });
        });
      }

      Object.keys(idxp).forEach(function (val) {
        var o = idxp[val];
        o.items.forEach(function (item) {
          if (item !== undefined &&
              o.styles !== undefined &&
              typeof o.styles[visualVar] === 'function') {

            if (!self.originalVisualVariable[item.id]) {
              self.originalVisualVariable[item.id] = {};
            }
            if (!(visualVar in self.originalVisualVariable[item.id])) {
              // non-writable property
              Object.defineProperty(self.originalVisualVariable[item.id], visualVar, {
               enumerable: true,
               value: item[visualVar]
              });
            }

            var newVal = o.styles[visualVar](item);

            if (visualVar === 'color' && self.dataTypes[key].array) {
              if (newVal !== undefined) {
                item.color = newVal;  // backward-compatibility
                item.colors.push(newVal);
              }
            }
            else if (newVal !== undefined) {
              item[visualVar] = newVal;
            }
          }
          else {
            if (typeof o.styles[visualVar] === 'function')
              throw new TypeError(o.styles + '.' + visualVar + 'is not a function, was ' + o.styles[visualVar]);
          }
        });
      });

      if (visualVar === 'size') {
        if (datasetName === 'nodes') {
          if (this.mappings.size.min > this.mappings.size.max) {
            throw new RangeError('nodes.size.min must be ' +
            'lower or equal than nodes.size.max');
          }

          if (this.mappings.size.min) {
            if (!this.sigmaSettings.minNodeSize) {
              this.sigmaSettings.minNodeSize = s.settings('minNodeSize');
            }
            s.settings('minNodeSize', this.mappings.size.min);
          }

          if (this.mappings.size.max) {
            if (!this.sigmaSettings.maxNodeSize) {
              this.sigmaSettings.maxNodeSize = s.settings('maxNodeSize');
            }
            s.settings('maxNodeSize', this.mappings.size.max);
          }
        }
        else if (datasetName === 'edges') {
          if (this.mappings.size.min > this.mappings.size.max) {
            throw new RangeError('edges.size.min must be '+
            'lower or equal than edges.size.max');
          }

          if (this.mappings.size.min) {
            if (!this.sigmaSettings.minEdgeSize) {
              this.sigmaSettings.minEdgeSize = s.settings('minEdgeSize');
            }
            s.settings('minEdgeSize', this.mappings.size.min);
          }

          if (this.mappings.size.max) {
            if (!this.sigmaSettings.maxEdgeSize) {
              this.sigmaSettings.maxEdgeSize = s.settings('maxEdgeSize');
            }
            s.settings('maxEdgeSize', this.mappings.size.max);
          }
        }
      }
    };

    /**
     * This method will reset a mapping between a visual variable and a property.
     * It restores the original value of the visual variable for each item. It
     * will do nothing if the vision on the property is missing.
     * Available visual variables are stored in `visualVars`.
     *
     * @param {string} visualVar The name of the visual variable.
     * @param {string} key       The property accessor.
     */
    this.resetStyle = function(visualVar, key) {
      if (key === undefined)
        throw new TypeError('Missing argument: "key"');

      if (typeof key !== 'string')
        throw new TypeError('Invalid argument: "key" is not a string, was ' + key);

      if (this.visualVars.indexOf(visualVar) == -1)
        throw new Error('Unknown style "' + visualVar + '".');

      if (this.idx[key] === undefined) return;

      var self = this,
          idxp = this.get(key);

      if (visualVar === 'color' && self.dataTypes[key].array) {
        Object.keys(idxp).forEach(function (val) {
          var o = idxp[val];
          o.items.forEach(function (item) {
            delete item.colors;
          });
        });
      }

      Object.keys(idxp).forEach(function (val) {
        var o = idxp[val];
        o.items.forEach(function (item) {
          if (item !== undefined && item[visualVar] !== undefined) {

            if (self.originalVisualVariable[item.id] === undefined ||
              self.originalVisualVariable[item.id][visualVar] === undefined) {

              // Avoid Sigma bug on edge with no size
              if (self.key === 'edges' && visualVar === 'size')
                item.size = 1;
              else
                delete item[visualVar];
          }
            else
              item[visualVar] = self.originalVisualVariable[item.id][visualVar];
          }
        });
      });

      if (visualVar === 'size') {
        if (datasetName === 'nodes') {
          if (this.sigmaSettings.minNodeSize) {
            s.settings('minNodeSize', this.sigmaSettings.minNodeSize);
          }
          if (this.sigmaSettings.maxNodeSize) {
            s.settings('maxNodeSize', this.sigmaSettings.maxNodeSize);
          }
        }
        else if (datasetName === 'edges') {
          if (this.sigmaSettings.minEdgeSize) {
            s.settings('minEdgeSize', this.sigmaSettings.minEdgeSize);
          }
          if (this.sigmaSettings.maxEdgeSize) {
            s.settings('maxEdgeSize', this.sigmaSettings.maxEdgeSize);
          }
        }
      }
    };

    /**
     * This method empties the arrays and indexes.
     */
    this.clear = function() {
      this.visualVars.length = 0;
      emptyObject(this.idx);
      emptyObject(this.histograms);
      emptyObject(this.deprecated);
      emptyObject(this.sigmaSettings);
      emptyObject(this.dataTypes);
      emptyObject(this.originalVisualVariable);
    };

    return this;
  };


  /**
   * design Object
   * ------------------
   * @param  {sigma}   s       The related sigma instance.
   * @param  {?object} options The object contains `palette` and `styles`.
   *                           Styles are mappings between visual variables and
   *                           data properties on nodes and edges.
   */
  function design(s, options) {
    this.palette = (options || {}).palette || {};
    this.styles = sigma.utils.extend((options || {}).styles || {}, {
      nodes: {},
      edges: {}
    });

    var self = this,
        _visionOnNodes = new Vision(s, 'nodes', this.styles, this.palette),
        _visionOnEdges = new Vision(s, 'edges', this.styles, this.palette);

    s.bind('kill', function() {
      sigma.plugins.killDesign(s);
    });


    /**
     * This method will set new styles. Styles are mappings between visual
     * variables and data properties on nodes and edges. It will deprecate
     * existing styles.
     *
     * @param  {object}  styles The styles object.
     * @return {design}       The instance.
     */
    this.setStyles = function(styles) {
      this.styles = sigma.utils.extend(styles || {}, {
        nodes: {},
        edges: {}
      });

      _visionOnNodes.mappings = this.styles.nodes;
      _visionOnEdges.mappings = this.styles.edges;

      this.deprecate();
      return this;
    };

    /**
     * This method will set a specified node style. Styles are mappings between
     * visual variables and data properties on nodes and edges. It will
     * deprecate existing node styles bound to the specified data property.
     *
     * @param  {string}  visualVar The visual variable.
     * @param  {object}  params    The style parameter.
     * @return {design}          The instance.
     */
    this.nodesBy = function(visualVar, params) {
      this.styles = sigma.utils.extend(this.styles || {}, {
        nodes: {},
        edges: {}
      });

      this.styles.nodes[visualVar] = params;
      _visionOnNodes.mappings = this.styles.nodes;

      if (params.by) {
        this.deprecate('nodes', params.by);
      }

      return this;
    };

    /**
     * This method will set a specified edge style. Styles are mappings between
     * visual variables and data properties on nodes and edges. It will
     * deprecate existing edge styles bound to the specified data property.
     *
     * @param  {string}  visualVar The visual variable.
     * @param  {object}  params    The style parameter.
     * @return {design}          The instance.
     */
    this.edgesBy = function(visualVar, params) {
      this.styles = sigma.utils.extend(this.styles || {}, {
        nodes: {},
        edges: {}
      });

      this.styles.edges[visualVar] = params;
      _visionOnEdges.mappings = this.styles.edges;

      if (params.by) {
        this.deprecate('edges', params.by);
      }

      return this;
    };


    /**
     * This method will set a new palette. It will deprecate existing styles.
     *
     * @param  {object}  palette The palette object.
     * @return {design}        The instance.
     */
    this.setPalette = function(palette) {
      this.palette = palette;

      _visionOnNodes.palette = this.palette;
      _visionOnEdges.palette = this.palette;

      this.deprecate();
      return this;
    };

    /**
     * This method is used to get the styles bound to each node of the graph for
     * a specified property.
     *
     * @param  {string} key The property accessor. Use a dot notation like
     *                      'data.myProperty'.
     * @return {object}     The styles.
     */
    this.nodes = function(key) {
      return _visionOnNodes.get(key);
    };

    /**
     * This method is used to get the styles bound to each edge of the graph for
     * a specified property.
     *
     * @param  {string} key The property accessor. Use a dot notation like
     *                      'data.myProperty'.
     * @return {object}     The styles.
     */
    this.edges = function(key) {
      return _visionOnEdges.get(key);
    };

    /**
     * This method will export a deep copy of the internal `Vision` objects,
     * which store the indexes, bound styles and histograms.
     *
     * @return {object}  The object of keys `nodes` and `edges`.
     */
    this.inspect = function() {
      return {
        nodes: deepCopy(_visionOnNodes),
        edges: deepCopy(_visionOnEdges)
      };
    };

    function __apply(mappings, vision, visualVar) {
      if (!visualVar) {
        // apply all styles if no visual variable is specified:
        Object.keys(mappings).forEach(function (visuVar) {
          mappings[visuVar].active = false;
          if (mappings[visuVar] && mappings[visuVar].by) {
            vision.applyStyle(visuVar, mappings[visuVar].by);
            mappings[visuVar].active = true;
          }
        });
      }
      else if (mappings[visualVar] && mappings[visualVar].by) {
        // apply the style of the specified visual variable:
        vision.applyStyle(visualVar, mappings[visualVar].by);
        mappings[visualVar].active = true;
      }

      if (s) s.refresh({skipIndexation: true});
    };

    /**
     * This method is used to apply all target styles or a specified target
     * style, depending on how it is called. Apply all styles if it is called
     * without argument. It will refresh the display.
     *
     * @param  {?string} target     The data target. Available values:
     *                              "nodes", "edges".
     * @param  {?string} visualVar  The visual variable. Available values:
     *                              "color", "size", "label".
     * @return {design}            The instance.
     */
    this.apply = function(target, visualVar) {
      if (!this.styles) return;

      if (!target) {
        __apply(this.styles.nodes, _visionOnNodes, visualVar);
        __apply(this.styles.edges, _visionOnEdges, visualVar);
        return this;
      }

      switch (target) {
        case 'nodes':
          __apply(this.styles.nodes, _visionOnNodes, visualVar);
          break;
        case 'edges':
          __apply(this.styles.edges, _visionOnEdges, visualVar);
          break;
        default:
          throw new Error('Invalid argument: "target" is not "nodes" or "edges", was ' + target);
      }

      return this;
    };

    function __reset(mappings, vision, visualVar) {
      if (!visualVar) {
        // reset all styles if no visual variable is specified:
        Object.keys(mappings).forEach(function (visuVar) {
          if (mappings[visuVar].active) {
            vision.resetStyle(visuVar, mappings[visuVar].by);
            mappings[visuVar].active = false;
          }
        });
      }
      else if (mappings[visualVar] && mappings[visualVar].active) {
        // reset the style of the specified visual variable:
        vision.resetStyle(visualVar, mappings[visualVar].by);
        mappings[visualVar].active = false;
      }

      if (s) s.refresh({skipIndexation: true});
    };

    /**
     * This method is used to reset all target styles or a specified target style,
     * depending on how it is called. reset all styles if it is called
     * without argument. It will do nothing if the visual variable
     * is not in the existing styles. It will finally refresh the display.
     *
     * @param  {?string} target     The data target. Available values:
     *                               "nodes", "edges".
     * @param  {?string} visualVar  The visual variable. Available values:
     *                             "color", "size", "label".
     * @return {design}  The instance.
     */
    this.reset = function(target, visualVar) {
      if (!this.styles) return;

      if (!target) {
        __reset(this.styles.nodes, _visionOnNodes, visualVar);
        __reset(this.styles.edges, _visionOnEdges, visualVar);
        return this;
      }

      switch (target) {
        case 'nodes':
          __reset(this.styles.nodes, _visionOnNodes, visualVar);
          break;
        case 'edges':
          __reset(this.styles.edges, _visionOnEdges, visualVar);
          break;
        default:
          throw new Error('Invalid argument: "target" is not "nodes" or "edges", was ' + target);
      }

      return this;
    };

    /**
     * This method is used when the styles are deprecated, for instance when the
     * graph has changed. The specified property style will be remade the next
     * time it is called using `.apply()`, `.nodes()`, or `.edges()`
     * or all property styles if called without argument.
     *
     * @param  {?string} target  The data target. Available values:
     *                           "nodes", "edges".
     * @param  {?string} key     The property accessor. Use a dot notation like
     *                           'data.myProperty'.
     *
     * @return {design}          The instance.
     */
    this.deprecate = function(target, key) {
      if (target) {
        if (target !== 'nodes' && target !== 'edges')
          throw new Error('Invalid argument: "target" is not "nodes" or "edges", was ' + target);

        if (key) {
          if (target === 'nodes') {
            _visionOnNodes.deprecated[key] = true;
          }
          else if (target === 'edges') {
            _visionOnEdges.deprecated[key] = true;
          }
        }
        else {
          if (target === 'nodes') {
            Object.keys(_visionOnNodes.deprecated).forEach(function(prop) {
              _visionOnNodes.deprecated[prop] = true;
            });
          }
          else if (target === 'edges') {
            Object.keys(_visionOnEdges.deprecated).forEach(function(prop) {
              _visionOnEdges.deprecated[prop] = true;
            });
          }
        }
      }
      else {
        Object.keys(_visionOnNodes.deprecated).forEach(function(prop) {
          _visionOnNodes.deprecated[prop] = true;
        });

        Object.keys(_visionOnEdges.deprecated).forEach(function(prop) {
          _visionOnEdges.deprecated[prop] = true;
        });
      }

      return this;
    };

    /**
     * Delete styles from a node or an edge according to its specified id,
     * target type and property reference.
     *
     * @param {string}  target The data target. Available values: "nodes", "edges".
     * @param {number}  id     The id of the node or edge to update
     * @param {string}  key    The property key to delete styles from.
     *
     * @return {design}        The instance.
     */
    this.deletePropertyStylesFrom = function(target, id, key){

      if (id == null){
        throw new TypeError('Missing argument: "id".');
      }
      if (target !== 'nodes' && target !== 'edges') {
        throw new Error('Invalid argument: "target" is not "nodes" or "edges", was ' + target);
      }
      if (key == null){
        throw new TypeError('Missing argument: "key".');
      }

      var
        computedStyles,
        computedStyle,
        appliedStyles,
        item;

      if (target === 'nodes'){
        computedStyles = _visionOnNodes.get(key);
      } else {
        computedStyles = _visionOnEdges.get(key);
      }

      var values = Object.keys(computedStyles);

      for (var k = 0 ; k < values.length ; k++){

        computedStyle = computedStyles[values[k]];
        appliedStyles = Object.keys(computedStyle.styles);

        for (var i = 0 ; i < computedStyle.items.length ; i++){

          item = computedStyle.items[i];
          if (item.id === id) {

            // For a given property, we want to delete all the styles references that are computed
            // from it for a given node
            for (var j = 0; j < appliedStyles.length; j++) {

              if (appliedStyles[j] !== 'label' && appliedStyles[j] !== 'size') {
                delete item[appliedStyles[j]];
              } else if (appliedStyles[j] === 'size'){
                item.size = 1;
              }
            }
            // There is only one node that should correspond to this. Once we have found it, we
            // can return.
            this.deprecate(target, key);
            return this;
          }
        }
      }

      return this;
    };

    /**
     * This method is used to clear all styles. It will refresh the display. Use
     * `.reset()` instead to reset styles without losing the configuration.
     *
     * @return {design}  The instance.
     */
    this.clear = function() {
      this.reset();
      this.styles = {
        nodes: {},
        edges: {}
      };
      this.palette = {};

      _visionOnNodes.clear();
      _visionOnEdges.clear();

      _visionOnNodes = new Vision(s, 'nodes', this.styles, this.palette);
      _visionOnEdges = new Vision(s, 'edges', this.styles, this.palette);

      if (s) s.refresh({skipIndexation: true});

      return this;
    };

    /**
     * This method destroys the current instance.
     */
    this.kill = function() {
      delete this.styles;
      delete this.palette;
      _visionOnNodes.clear();
      _visionOnEdges.clear();
    };

    /**
     * Transform the styles and palette into a JSON representation.
     *
     * @param  {object} params The options.
     * @return {string}        The JSON string.
     */
    this.toJSON = function(params) {
      params = params || {};

      var o = {
        styles: this.styles,
        palette: this.palette
      }

      if (params.pretty) {
        var jsonString = JSON.stringify(o, null, ' ');
      }
      else {
        var jsonString = JSON.stringify(o);
      }

      if (params.download) {
        download(jsonString, 'json', params.filename);
      }

      return jsonString;
    };

    this.utils = {};

    /**
     * This method is used to get the data type of a specified property on nodes
     * or edges. It is true if data is sequential, false otherwise (qualitative),
     * or undefined if the property doesn't exist.
     *
     * @param  {string} target     The data target. Available values:
     *                             "nodes", "edges".
     * @param  {string} property   The property accessor.
     * @return {boolean}           The data type.
     */
    this.utils.isSequential = function(target, property) {
      if (!target)
        throw new TypeError('Missing argument: "target"');

      var v;
      switch (target) {
        case 'nodes':
          v = _visionOnNodes;
          break;
        case 'edges':
          v = _visionOnEdges;
          break;
        default:
          throw new Error('Invalid argument: "target" is not "nodes" or "edges", was ' + target);
      }

      if (property === undefined)
        throw new TypeError('Missing argument: "property"');

      if (typeof property !== 'string')
        throw new TypeError('Invalid argument: "property" is not a string, was ' + property);

      if (!(property in v.dataTypes) || v.dataTypes[property].sequential === undefined) {
        var val,
            found = false,
            isSequential = true;

        v.dataset().forEach(function (item) {
          val = strToObjectRef(item, property);
          if (val !== undefined) {
            found = true;
            isSequential = (typeof val === 'number') ? isSequential : false;
            // TODO: throw error if is number AND (is NaN or is Infinity)
          }
        });

        if (found) {
          v.dataTypes[property] = { sequential: isSequential };
        }
        else if(v.dataTypes[property]) {
          v.dataTypes[property].sequential = undefined;
        }
      }

      return (v.dataTypes[property] || {}).sequential;
    };

    /**
     * This method is used to get the histogram of values, grouped by bins, on
     * a specified property of nodes or edges computed for a visual variable.
     * The property must have been used on a style before calling this method.
     *
     * The result is an array of objects ordered by bins. Each object contains
     * the list of `values` in the `bin`, the `min` and `max` values, and the
     * `ratio` of values in the bin compared to the largest bin.
     * If the visual variable is the `color`, it also contains the `color` of the
     * bin.
     *
     * @param  {string} target     The data target. Available values:
     *                             "nodes", "edges".
     * @param  {string} visualVar  The visual variable. Available values:
     *                             "color", "size", "label".
     * @param  {string} property   The property accessor.
     * @return {array}             The histogram.
     */
    this.utils.histogram = function(target, visualVar, property) {
      if (!target)
        throw new TypeError('Missing argument: "target"');

      var v;
      switch (target) {
        case 'nodes':
          v = _visionOnNodes;
          break;
        case 'edges':
          v = _visionOnEdges;
          break;
        default:
          throw new Error('Invalid argument: "target" is not "nodes" or "edges", was ' + target);
      }

      if (v.visualVars.indexOf(visualVar) == -1)
        throw new Error('Unknown visual variable "' + visualVar + '".');

      if (property === undefined)
        throw new TypeError('Missing argument: "property".');

      if (typeof property !== 'string')
        throw new TypeError('Invalid argument: "property" is not a string, was' + property);

      var isSequential = self.utils.isSequential(target, property);

      if (!isSequential)
        throw new Error('The property "'+ property +'" is not sequential.');

      var h = histogram(v.histograms[visualVar], property);
      h = resolveHistogram(h, v, property);

      if (visualVar === 'color') {
        if (!self.styles[target].color) {
          throw new Error('Missing key "color" in '+ target +' palette.');
        }
        var bins = h.length,
          o = strToObjectRef(self.palette, self.styles[target].color.scheme);

        if (!o)
          throw new Error('Color scheme "' + self.styles[target].color.scheme + '" not in '+ target +' palette.');

        if (isSequential) {
          for (var bin = 0; bin < bins; bin++) {
            if (!o[bins])
              throw new Error('Missing key "'+ bins +'" in '+ target +' palette " of color scheme ' + self.styles[target].color.scheme + '".');

            h[bin][visualVar] = o[bins][bin];
          }
        }
      }

      return h;
    };
  };


  /**
   * Interface
   * ------------------
   *
   * > var design = sigma.plugins.design(s, options);
   */
  var _instance = {};

  /**
   * @param  {sigma}   s       The related sigma instance.
   * @param  {?object} options The object contains `palette` and `styles`.
   *                           Styles are mappings between visual variables and
   *                           data properties on nodes and edges.
   * @return {design}        The instance.
   */
  sigma.plugins.design = function(s, options) {
    // Create instance if undefined
    if (!_instance[s.id]) {
      _instance[s.id] = new design(s, options);
    }
    return _instance[s.id];
  };

  /**
   *  This function kills the design instance.
   */
  sigma.plugins.killDesign = function(s) {
    if (_instance[s.id] instanceof design) {
      _instance[s.id].kill();
    }
    delete _instance[s.id];
  };

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma not in scope.');

  // Initialize package:
  sigma.utils.pkg('sigma.settings');

  /**
  * Extended sigma settings.
  */
  var settings = {
    /* {number} Width of the widgets */
    legendWidth: 130,
    /* {string} Name of the font used by the widgets */
    legendFontFamily: 'Arial',
    /* {number}  Size of the text */
    legendFontSize: 10,
    /* {string} Color of the text */
    legendFontColor: 'black',
    /* {string} Name of the font used to display the widgets' title */
    legendTitleFontFamily: 'Arial',
    /* {number}  Size of the font used to display the titles */
    legendTitleFontSize: 15,
    /* {string} Color of the titles */
    legendTitleFontColor: 'black',
    /* {number} The maximum number of characters displayed when displaying a widget's title */
    legendTitleMaxLength: '30',
    /* {string} The text alignment of the widgets' title ('left', 'middle') */
    legendTitleTextAlign: 'left',
    /* {string} Color of the shapes in the legend */
    legendShapeColor: 'grey',
    /* {string} Color of the widgets' background */
    legendBackgroundColor: 'white',
    /* {string} Color of the widgets' border */
    legendBorderColor: 'black',
    /* {number} Radius of the widgets' border */
    legendBorderRadius: 10,
    /* {number}  Size of the widgets' border */
    legendBorderWidth: 1,
    /* {number}  Size of the margin between a widget's borders and its content */
    legendInnerMargin: 10,
    /* {number}  Size of the margin between widgets */
    legendOuterMargin: 5
  };

  // Export the previously designed settings:
  sigma.settings = sigma.utils.extend(sigma.settings || {}, settings);

}).call(this);
;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');

  /* ======================== */
  /* ===== MAIN CLASSES ===== */
  /* ======================== */

  function LegendPlugin(s) {
    var self = this,
      settings = s.settings,
      pixelRatio = window.devicePixelRatio || 1;

    this._sigmaInstance = s;
    this._designPlugin = sigma.plugins.design(s);

    this._visualSettings = {
      pixelRatio: pixelRatio,
      legendWidth: settings('legendWidth'),
      legendFontFamily: settings('legendFontFamily'),
      legendFontSize: settings('legendFontSize'),
      legendFontColor: settings('legendFontColor'),
      legendTitleFontFamily: settings('legendTitleFontFamily'),
      legendTitleFontSize: settings('legendTitleFontSize'),
      legendTitleFontColor: settings('legendTitleFontColor'),
      legendShapeColor: settings('legendShapeColor'),
      legendBackgroundColor: settings('legendBackgroundColor'),
      legendBorderColor: settings('legendBorderColor'),
      legendBorderWidth: settings('legendBorderWidth'),
      legendInnerMargin: settings('legendInnerMargin'),
      legendOuterMargin: settings('legendOuterMargin'),
      legendTitleMaxLength: settings('legendTitleMaxLength'),
      legendTitleTextAlign: settings('legendTitleTextAlign'),
      legendBorderRadius: settings('legendBorderRadius')
    };

    iterate(this._visualSettings, function (value, key) {
      if (typeof value === 'number') {
        self._visualSettings[key] = value * pixelRatio;
      }
    });

    computeTotalWidth(this._visualSettings);

    var renderer = s.renderers[0]; // TODO: handle several renderers?
    this._canvas = document.createElement('canvas');
    //renderer.initDOM('canvas', 'legend');
    //this._canvas = renderer.domElements['legend'];
    this._canvas.style.position = 'absolute';
    this._canvas.style.pointerEvents = 'none';
    setupCanvas(this._canvas, renderer.container.offsetWidth, renderer.container.offsetHeight, pixelRatio);
    renderer.container.appendChild(this._canvas);

    window.addEventListener('resize', function () {
      setupCanvas(self._canvas, renderer.container.offsetWidth, renderer.container.offsetHeight, pixelRatio);
      drawLayout(self);
    });

    this.textWidgetCounter = 1;
    this.enoughSpace = true;
    this.placement = 'bottom';
    this.visible = true;
    this.widgets = { };
    this.boundingBox = {x:0, y:0, w:0, h:0};
    this.externalCSS = [];

    this.addWidget('node', 'size');
    this.addWidget('node', 'color');
    this.addWidget('node', 'icon');
    this.addWidget('node', 'type');
    this.addWidget('edge', 'size');
    this.addWidget('edge', 'color');
    this.addWidget('edge', 'type');

    this.draw();
  }


  function LegendWidget(canvas, sigmaInstance, designPlugin, legendPlugin, elementType, visualVar) {
    this._canvas = canvas;
    this._sigmaInstance = sigmaInstance;
    this._designPlugin = designPlugin;
    this._legendPlugin = legendPlugin;
    this.visualVar = visualVar;
    this.elementType = elementType;
    this.x = 0;
    this.y = 0;
    this.text = '';
    this.unit = null;
    this.img = new Image();
    this.pinned = false;
  }

  /* ============================= */
  /* ===== UTILITY FUNCTIONS ===== */
  /* ============================= */

  function setupCanvas(canvas, width, height, pixelRatio) {
    canvas.setAttribute('width', (width * pixelRatio));
    canvas.setAttribute('height', (height * pixelRatio));
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }

  /**
   * Example: with obj = a and str = 'qw.er.ty', returns a.qw.er.ty
   * @param {Object} obj
   * @param {string} str
   * @returns {Object}
   */
  function strToObjectRef(obj, str) {
    if (str == null) return null;
    return str.split('.').reduce(function(obj, i) { return obj[i] }, obj);
  }

  function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  }

  function download(fileEntry, filename, isDataUrl) {
    var blob = null,
        objectUrl = null,
        dataUrl = null;

    if (window.Blob){
      // use Blob if available
      blob = isDataUrl ? dataURLToBlob(fileEntry) : new Blob([fileEntry], {type: 'text/xml'});
      objectUrl = window.URL.createObjectURL(blob);
    }
    else {
      // else use dataURI
      dataUrl = 'data:text/xml;charset=UTF-8,' +
        encodeURIComponent('<?xml version="1.0" encoding="UTF-8"?>') +
        encodeURIComponent(fileEntry);
    }

    if (navigator.msSaveBlob) { // IE11+ : (has Blob, but not a[download])
      navigator.msSaveBlob(blob, filename);
    } else if (navigator.msSaveOrOpenBlob) { // IE10+ : (has Blob, but not a[download])
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // A-download
      var anchor = document.createElement('a');
      anchor.setAttribute('href', (window.Blob) ? objectUrl : dataUrl);
      anchor.setAttribute('download', filename);

      // Firefox requires the link to be added to the DOM before it can be clicked.
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    if (objectUrl) {
      setTimeout(function() { // Firefox needs a timeout
        window.URL.revokeObjectURL(objectUrl);
      }, 0);
    }
  }

  /**
   * Iterate over an array or object and call a specified function on each value
   * @param obj {Array|Object}
   * @param func {function}   function (value, key) { ... }
   */
  function iterate(obj, func) {
    for (var k in obj) {
      if (!obj.hasOwnProperty(k) || obj[k] === undefined) {
        continue;
      }

      func(obj[k], k);
    }
  }

  /**
   * Create a DOM element and append it to another element.
   * @param parentElement   {DOMElement} Parent element
   * @param typeToCreate    {string}  Type of the element to create
   * @param attributes      {object}  Attributes of the element to create
   * @param [elementValue]  {*}       Value to put inside the element
   * @param [force]         {boolean} If true, put 'elementValue' inside the element even if it's null or undefiened
   * @returns {Element}     {DOMElement} Appended object
   */
  function createAndAppend(parentElement, typeToCreate, attributes, elementValue, force) {
    attributes = attributes || {};

    var elt = document.createElement(typeToCreate);

    for (var key in attributes) {
      if (!attributes.hasOwnProperty(key)) {
        continue;
      }
      var value = attributes[key];
      if (value !== undefined) {
        elt.setAttribute(key, value);
      }
    }

    if (elementValue !== undefined || force) {
      if (Object.prototype.toString.call(elementValue) === '[object Object]') {
        elementValue = JSON.stringify(elementValue);
      }

      var textNode = document.createTextNode(elementValue);
      elt.appendChild(textNode);
    }

    parentElement.appendChild(elt);

    return elt;
  }

  /**
   * Convert a widget's SVG to a base64 encoded image url, so it can be drawn onto a canvas.
   *
   * @param {Object}    widget        Widget
   * @param {function}  callback      Function that will be called once the image is built
   */
  function buildImageFromSvg(widget, callback) {
    if (!widget.svg) {
      callback();
      return;
    }

    var str = '';

    str += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="' + widget.svg.width + 'px" height="' + widget.svg.height + 'px">';

    str += widget.svg.innerHTML + '</svg>';
    var src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(str)));

    if (widget.img.src !== src) {
      widget.img.onload = callback;
      widget.img.src = src;
    } else {
      callback();
    }
  }

  /**
   * Returns the sum of a widget's width + its border + its outer margin
   * @param visualSettings
   */
  function computeTotalWidth(visualSettings) {
    visualSettings.totalWidgetWidth =
      visualSettings.legendWidth + (visualSettings.legendBorderWidth + visualSettings.legendOuterMargin) * 2
  }

  /**
   *  Reconstruct the legend's svg (i.e. recreate the image representation of each widget).
   *  @param {LegendPlugin} legendPlugin
   *  @param {function}     callback
   */
  function buildLegendWidgets(legendPlugin, callback) {
    var nbWidgetsBuilt = 0,
        nbWidgets = Object.keys(legendPlugin.widgets).length;

    iterate(legendPlugin.widgets, function (value) {
      buildWidget(value, function () {
        ++nbWidgetsBuilt;
        if (callback && nbWidgetsBuilt === nbWidgets) {
          callback();
        }
      });
    });
  }

  /**
   * Apply the layout algorithm to compute the position of every widget.
   * Does not build widgets.
   * Draw the legend at the end.
   */
  function drawLayout(legendPlugin) {
    var vs = legendPlugin._visualSettings,
        placement = legendPlugin.placement,
        horizontal = placement === 'top' || placement === 'bottom',
        maxHeight = legendPlugin._canvas.height,
        maxWidth = legendPlugin._canvas.width,
        textWidgets = getUnpinnedWidgets(legendPlugin.widgets, 'text'),
        nodeWidgets = getUnpinnedWidgets(legendPlugin.widgets, 'node'),
        edgeWidgets = getUnpinnedWidgets(legendPlugin.widgets, 'edge'),
        widgetLists = [textWidgets, nodeWidgets, edgeWidgets],
        height = horizontal ? getMaxHeight(legendPlugin.widgets) + vs.legendOuterMargin * 2 : maxHeight,
        maxNbCols = Math.floor(maxWidth / vs.totalWidgetWidth),
        cols = initializeColumns(horizontal ? maxNbCols : 1, vs.legendOuterMargin * 2),
        colIndex = 0,
        tryAgain = true,
        notEnoughSpace = false;

    while (tryAgain && !notEnoughSpace) {
      tryAgain = false;
      colIndex = 0;
      iterate(widgetLists, function (list) {
        var widgetsToDisplay = [],
            desiredHeight,
            bestCombination;

        if (tryAgain || notEnoughSpace) {
          return;
        }

        list.forEach(function (w) {
          widgetsToDisplay.push(w);
        });

        while (true) {
          desiredHeight = height - (cols[colIndex] ? cols[colIndex].height : 0);
          bestCombination = getOptimalWidgetCombination(widgetsToDisplay, desiredHeight);
          bestCombination.forEach(function (index) {
            cols[colIndex].widgets.push(widgetsToDisplay[index]);
            cols[colIndex].height += widgetsToDisplay[index].svg.height;
          });
          for (var i = bestCombination.length - 1; i >= 0; --i) {
            widgetsToDisplay.splice(bestCombination[i], 1);
          }

          if (widgetsToDisplay.length > 0) {
            if (horizontal) {
             if (colIndex === maxNbCols - 1) {
               cols = initializeColumns(maxNbCols, vs.legendOuterMargin * 2);
               height += 30;
               tryAgain = true;
               if (height > maxHeight) {
                 notEnoughSpace = true;
               }
               break;
             } else {
                ++colIndex;
             }
            } else if (cols.length === maxNbCols) {
              notEnoughSpace = true;
              break;
            } else {
              cols.push({widgets: [], height: vs.legendOuterMargin * 2});
              ++colIndex;
            }
          } else {
            break;
          }
        }
      });
    }

    if (!notEnoughSpace) {
      if (placement === 'right') {
        cols.reverse();
      }

      for (var i = 0; i < cols.length; ++i) {
        var h = placement === 'bottom' ? height - cols[i].height : 0;
        for (var j = 0; j < cols[i].widgets.length; ++j) {
          cols[i].widgets[j].x = vs.totalWidgetWidth * i +
            (placement === 'right' ? (maxWidth - cols.length * vs.totalWidgetWidth) : vs.legendOuterMargin);

          if (placement === 'bottom') {
            cols[i].widgets[j].y = maxHeight - height + h + vs.legendOuterMargin * 2;
          } else {
            cols[i].widgets[j].y = h + vs.legendOuterMargin;
          }
          h += cols[i].widgets[j].svg.height;
        }
      }

      var nbCols = cols.reduce(function (prev, value) { return prev + (value.height > vs.legendOuterMargin * 2 ? 1 : 0); }, 0),
          legendWidth = nbCols * (vs.totalWidgetWidth + vs.legendOuterMargin) + vs.legendOuterMargin,
          legendHeight = cols.reduce(function (previous, value) { return ( previous > value.height ? previous : value.height ); }, 0);

      legendPlugin.boundingBox = {
        w: legendWidth,
        h: legendHeight,
        x: legendPlugin.placement === 'right' ? maxWidth - legendWidth : 0,
        y: legendPlugin.placement === 'bottom' ? maxHeight - legendHeight : 0
      };
    } else {
      legendPlugin.boundingBox = {x:0, y:0, w:0, h:0};
    }

    drawLegend(legendPlugin);
    legendPlugin.enoughSpace = !notEnoughSpace;
  }

  function initializeColumns(number, initialHeight) {
    var columns = [];
    for (var i = 0; i < number; ++i) {
      columns.push({widgets:[], height:initialHeight});
    }

    return columns;
  }

  /**
   * Returns the list of widgets of which the total height is maximal but smaller than a specified limit
   * @param widgets       {Array<LegendWidget>} Initial list of widgets
   * @param desiredHeight {number}              Maximum desired height
   * @returns {Array<Number>}                   List of indexes
   */
  function getOptimalWidgetCombination(widgets, desiredHeight) {
    var best = {indexes: [], height: 0},
        combinations = getCombinations(widgets.length, 0);

    combinations.forEach(function (c) {
      var height = computeCombinedWidgetsHeight(widgets, c);
      if (height > best.height && height <= desiredHeight) {
        best.indexes = c;
        best.height = height;
      }
    });

    return best.indexes;
  }

  /**
   * Returns the list of combinations that are possible given a length and index.
   * Warning: complexity O(2^n) (should not be a problem since we usually won't have high values)
   * Example: getCombinations(3, 0) -> [ [0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2] ]
   *          getCombinations(3, 1) -> [ [1], [2], [1, 2] ]
   * @param length        {number}
   * @param startingIndex {number}
   * @returns {Array<number>}
   */
  function getCombinations(length, startingIndex) {
    if (startingIndex === length) {
      return [];
    } else {
      var combinations = [[startingIndex]],
          nextCombinations = getCombinations(length, startingIndex + 1);

      nextCombinations.forEach(function (c) {
        combinations.push([startingIndex].concat(c));
      });

      combinations = combinations.concat(nextCombinations);

      return combinations;
    }
  }

  /**
   * Returns the total height of widgets with their index contained in the specified array
   * @param {Array<LegendWidget>} widgets
   * @param {Array<number>}       indexes
   * @returns {number}
   */
  function computeCombinedWidgetsHeight(widgets, indexes) {
    var totalHeight = 0;
    indexes.forEach(function (index) {
      totalHeight += widgets[index].svg.height;
    });

    return totalHeight;
  }

  /**
   * Returns every widget that is not pinned (the widgets that are taken care of by the layout algorithm)
   * @param widgets
   * @param elementType
   * @returns {Array}
   */
  function getUnpinnedWidgets(widgets, elementType) {
    var unpinned = [];

    iterate(widgets, function (value) {
      if (value.svg && !value.pinned && value.elementType === elementType) {
        unpinned.push(value);
      }
    });

    return unpinned;
  }

  /**
   * Returns the height of the largest widget.
   * @param widgets {Array<LegendWidget>}
   * @returns {number}
   */
  function getMaxHeight(widgets) {
    var maxWidgetHeight = 0;
    iterate(widgets, function (widget) {
      if (widget.svg && widget.svg.height > maxWidgetHeight) {
        maxWidgetHeight = widget.svg.height;
      }
    });

    return maxWidgetHeight;
  }

  function makeWidgetId(elementType, visualVar) {
    return elementType + '_' + visualVar;
  }

  /**
   * Clear the canvas on which the legend is displayed.
   */
  function clearLegend(legendPlugin) {
    var context = legendPlugin._canvas.getContext('2d');
    context.clearRect(0, 0, legendPlugin._canvas.width, legendPlugin._canvas.height);
  }

  /**
   * Draw each widget (unpinned before pinned, we want the user-positioned
   * widget to be displayed on top those positioned with the layout algorithm.
   */
  function drawLegend(legendPlugin) {
    clearLegend(legendPlugin);
    iterate(legendPlugin.widgets, function (widget) {
      if (mustDisplayWidget(legendPlugin, widget)) {
        drawWidget(widget);
      }
    });
  }


  /**
   * Indicates if a widget must be displayed (typically used when a widget's image has just been loaded to
   * know if it must be displayed immediatly).
   * @param legendPlugin
   * @param widget
   * @returns {boolean}
   */
  function mustDisplayWidget(legendPlugin, widget) {
    return legendPlugin.visible && (legendPlugin.enoughSpace || widget.pinned) && legendPlugin.widgets[widget.id] !== undefined && widget.svg !== null;
  }

  /**
   * Create a widget's svg.
   */
  function buildWidget(widget, callback) {
    var vs = widget._legendPlugin._visualSettings;

    if (widget.visualVar === 'size') {
      widget.svg = drawSizeLegend(vs, widget._sigmaInstance.graph, widget._designPlugin, widget.elementType, widget.unit)
    } else if (widget.elementType !== 'text') {
      widget.svg = drawNonSizeLegend(vs, widget._sigmaInstance.graph, widget._designPlugin, widget.elementType, widget.visualVar, widget.unit);
    } else {
      var lines = getLines(vs, widget.text, vs.legendWidth - 2 * vs.legendInnerMargin),
          lineHeight = vs.legendFontSize + 1,
          height = lines.length * lineHeight + vs.legendInnerMargin * 2,
          offsetY = vs.legendInnerMargin + lineHeight;

      widget.svg = document.createElement('svg');
      drawBackground(widget.svg, vs, height);

      for (var i = 0; i < lines.length; ++i) {
        drawText(vs, widget.svg, lines[i], vs.legendInnerMargin, offsetY);
        offsetY += lineHeight;
      }

      widget.svg.width = vs.totalWidgetWidth;
      widget.svg.height = height + 2 * (vs.legendBorderWidth + vs.legendOuterMargin);
    }

     buildImageFromSvg(widget, callback);
  }

  /**
   * Build a widget a redraw the layout
   * @param widget
   */
  function buildWidgetAndDrawLayout(widget) {
    buildWidget(widget, function () { drawLayout(widget._legendPlugin); });
  }

  /**
   * Split a string into multiple lines. Each line's length (in pixels) won't be larger than 'maxWidth'.
   * Words are not splited into several lines.
   * @param vs {Object}       Visual settings
   * @param text {string}     String to split.
   * @param maxWidth {number} Maximum length (in pixels) of a string.
   * @returns {Array<string>}
   */
  function getLines(vs, text, maxWidth) {
    var approximateWidthMeasuring = false,
        spaceWidth = getTextWidth(' ', vs.legendFontFamily, vs.legendFontSize, approximateWidthMeasuring),
        words = text.split(' '),
        lines = [{width:-spaceWidth, words:[]}],
        lineIndex = 0,
        lineList = [];

    for (var i = 0; i < words.length; ++i) {
      var width = getTextWidth(words[i] + ' ', vs.legendFontFamily, vs.legendFontSize, approximateWidthMeasuring);
      if (lines[lineIndex].width + width <= maxWidth) {
        lines[lineIndex].words.push(words[i] + ' ');
        lines[lineIndex].width += width;
      } else {
        lines.push({width:width - spaceWidth, words:[words[i] + ' ']});
        lineIndex++;
      }
    }

    for (i = 0; i < lines.length; ++i) {
      var str = '';
      for (var j = 0; j < lines[i].words.length; ++j) {
        str += lines[i].words[j];
      }
      lineList.push(str);
    }

    return lineList;
  }

  function getPropertyName(prop) {
    var s = prop.split('.');
    if ((s.length > 2 && s[s.length - 2] === 'categories') || (s.length >= 1 && s[1] === 'categories')) {
      return 'Category';
    } else {
      return prettyfy(s[s.length - 1]);
    }
  }

  /**
   * Draw a widget on the canvas.
   */
  function drawWidget(widget) {
    if (!widget.img) {
      return;
    }

    var ctx = widget._canvas.getContext('2d');

    ctx.drawImage(widget.img, widget.x, widget.y);
    if (widget.elementType === 'node' && widget.visualVar === 'icon') {
      ctx.textBaseline = 'middle';
      iterate(widget.svg.icons, function (value, content) {
        ctx.fillStyle = value.color;
        ctx.font = value.fontSize + 'px ' + value.font;
        ctx.fillText(content, widget.x + value.x, widget.y + value.y);
      });
    }
  }

  /**
   * Iterate over a list of elements and returns the minimum and maximum values for a specified property.
   * @param elements {Array<Object>}  List of nodes or edges
   * @param propertyName {string}     Name of the property.
   * @returns {{min: *, max: *}}
   */
  function getBoundaryValues(elements, propertyName) {
    var minValue = null,
        maxValue = null;

    for (var i = 1; i < elements.length; ++i) {
      var value = strToObjectRef(elements[i], propertyName);
      if (typeof value !== 'number') {
        continue;
      }

      if (!minValue || value < minValue) {
        minValue = value;
      }
      if (!maxValue || value > maxValue) {
        maxValue = value;
      }
    }

    return {min: minValue ? minValue : 0, max: maxValue ? maxValue : 0};
  }

  /**
   * Returns 'number' + 1 values between a specified minimum and maximum. These values are linear.
   * Example: extractValueList({min:1, max:5}, 4) -> [1, 2, 3, 4, 5]
   * @param boundaries {{min:{number}, max:{number}}}
   * @param number
   * @returns {Array}
   */
  function extractValueList(boundaries, number) {
    var list = [],
        dif = boundaries.max - boundaries.min;

    for (var i = 0; i < number + 1; ++i) {
      list.push(boundaries.min + dif * (i / number))
    }

    return list;
  }


  /**
   * Returns a map of the different values of a property.
   * @param elts      List of elements. Edges or nodes.
   * @param propName  Name of the property.
   * @returns {Object}
   */
  function getExistingPropertyValues(elts, propName) {
    var existingValues = {};
    for (var i = 0; i < elts.length; ++i) {
      var prop = strToObjectRef(elts[i], propName);
      if (prop && typeof prop === 'object') {
        iterate(prop, function (value) {
          existingValues[value] = true;
        });
      } else {
        existingValues[prop] = true;
      }
    }

    return existingValues;
  }

  /**
   * Returns the number of keys that exists in both a specified object and a scheme.
   * @param scheme
   * @param existingValues
   * @returns {number}
   */
  function getNbElements(scheme, existingValues) {
    var nb = 0;
    iterate(scheme, function (val, key) {
      if (existingValues[key]) {
        ++nb;
      }
    });

    return nb;
  }

  /* ============================= */
  /* ===== DRAWING FUNCTIONS ===== */
  /* ============================= */

  /**
   * Draw a widget representing a size (node size, edge size)
   *
   * @param visualSettings        {Object}
   * @param graph                 {Object}
   * @param designPluginInstance  {LegendPlugin}
   * @param elementType           {string}        'node' or 'edge'
   * @param unit                  {string}        Optional. Specifies a unit to display alongside the title
   * @returns {Element}
   */
  function drawSizeLegend(visualSettings, graph, designPluginInstance, elementType, unit) {
    var vs = visualSettings,
        svg = document.createElement('svg'),
        elts = elementType === 'node' ? graph.nodes() : graph.edges(),
        styles = elementType === 'node' ? designPluginInstance.styles.nodes : designPluginInstance.styles.edges,
        titleMargin = vs.legendTitleFontSize + vs.legendInnerMargin + vs.legendFontSize * 1.5;

    if (!styles.size) {
      return null;
    }

    var propName = styles.size.by,
        boundaries = getBoundaryValues(elts, propName),
        minValue = boundaries.min,
        maxValue = boundaries.max,
        isInteger = minValue % 1 === 0 && maxValue % 1 === 0,
        meanValue = isInteger ? Math.round((minValue + maxValue) / 2) : (minValue + maxValue) / 2,
        ratio = styles.size.max / styles.size.min,
        bigElementSize = vs.legendFontSize * 1.5,
        smallElementSize = bigElementSize / ratio,
        mediumElementSize = (bigElementSize + smallElementSize) / 2,
        height;

    if (elementType === 'node') {
      var circleBorderWidth = 2;

      height = titleMargin + bigElementSize * 2 + 10;

      drawBackground(svg, vs, height);
      drawWidgetTitle(vs, svg, getPropertyName(styles.size.by), unit);

      var textOffsetX = bigElementSize * 2 + circleBorderWidth + vs.legendInnerMargin * 2;
      drawText(vs, svg, numberToText(maxValue, isInteger), textOffsetX, titleMargin + vs.legendFontSize);
      drawText(vs, svg, numberToText(meanValue, isInteger), textOffsetX, titleMargin + 2 * vs.legendFontSize);
      drawText(vs, svg, numberToText(minValue, isInteger), textOffsetX, titleMargin + 3 * vs.legendFontSize);


      drawCircle(svg, bigElementSize + vs.legendInnerMargin, titleMargin + bigElementSize, bigElementSize,
                 vs.legendBackgroundColor, vs.legendShapeColor, circleBorderWidth);
      drawCircle(svg, bigElementSize + vs.legendInnerMargin, titleMargin + bigElementSize * 2 - mediumElementSize,
                 mediumElementSize, vs.legendBackgroundColor, vs.legendShapeColor, circleBorderWidth);
      drawCircle(svg, bigElementSize + vs.legendInnerMargin, titleMargin + bigElementSize * 2 - smallElementSize,
                 smallElementSize, vs.legendBackgroundColor, vs.legendShapeColor, circleBorderWidth);

    } else if (elementType === 'edge') {
      var labelOffsetY = titleMargin + bigElementSize * 1.7,
          rectWidth = (vs.legendWidth - vs.legendInnerMargin * 2) / 3;

      height = labelOffsetY + vs.legendFontSize;


      drawBackground(svg, vs, height);
      drawWidgetTitle(vs, svg, getPropertyName(styles.size.by), unit);

      draw(svg, 'rect', {x:vs.legendInnerMargin, y:titleMargin + 5, width:rectWidth, height:bigElementSize / 2,
                         fill:vs.legendShapeColor});
      draw(svg, 'rect', {x:vs.legendInnerMargin + rectWidth, y:titleMargin + 5 + (bigElementSize - mediumElementSize) / 4,
                         width:rectWidth, height:mediumElementSize / 2, fill:vs.legendShapeColor});
      draw(svg, 'rect', {x:vs.legendInnerMargin + 2 * rectWidth, y:titleMargin + 5 + (bigElementSize - smallElementSize) / 4,
                         width:rectWidth, height:smallElementSize / 2, fill:vs.legendShapeColor});

      drawText(vs, svg, numberToText(maxValue, isInteger), vs.legendInnerMargin + rectWidth * 0.5, labelOffsetY, 'middle');
      drawText(vs, svg, numberToText(meanValue, isInteger), vs.legendInnerMargin + rectWidth * 1.5, labelOffsetY, 'middle');
      drawText(vs, svg, numberToText(minValue, isInteger), vs.legendInnerMargin + rectWidth * 2.5, labelOffsetY, 'middle');
    }

    svg.width = vs.totalWidgetWidth;
    svg.height = height + (vs.legendBorderWidth + vs.legendOuterMargin) * 2;

    return svg;
  }

  /**
   * Draw a legend widget that doesn't represent a size (color, icon, etc)
   * @param visualSettings  {Object}
   * @param graph           {Object}
   * @param designPluginInstance {LegendPlugin}
   * @param elementType     {string} 'node' or 'edge'
   * @param visualVar       {string} 'color', 'icon', 'type'
   * @param unit            {string}  Optional. Unit to display alongside the title.
   *                                  in the way the icons are displayed).
   * @returns {Element}
   */
  function drawNonSizeLegend(visualSettings, graph, designPluginInstance, elementType, visualVar, unit) {
    var vs = visualSettings,
        svg = document.createElement('svg'),
        elts = elementType === 'node' ? graph.nodes() : graph.edges(),
        styles = elementType === 'node' ? designPluginInstance.styles.nodes : designPluginInstance.styles.edges;

    if (!styles[visualVar]) {
      return null;
    }

    var palette = designPluginInstance.palette,
        lineHeight = vs.legendFontSize * 1.5,
        titleMargin = vs.legendTitleFontSize + vs.legendInnerMargin + lineHeight * 0.8,
        quantitativeColor = visualVar === 'color' && styles.color.bins,
        edgeType = elementType === 'edge' && visualVar === 'type',
        scheme = quantitativeColor ? strToObjectRef(palette, styles.color.scheme)[styles.color.bins] : strToObjectRef(palette, styles[visualVar].scheme),
        existingValues = getExistingPropertyValues(elts, styles[visualVar].by),
        nbElements = quantitativeColor ?  Object.keys(scheme).length : getNbElements(scheme, existingValues),
        height = lineHeight * nbElements + titleMargin + (edgeType ? lineHeight : 0),
        leftColumnWidth = vs.legendWidth / 3,
        offsetY = titleMargin,
        textOffsetX = elementType === 'edge' ? leftColumnWidth : vs.legendFontSize * 1.5 + vs.legendInnerMargin,
        boundaries,
        valueList,
        isInteger,
        txt,
        fontSize;

    if (quantitativeColor) {
        boundaries = getBoundaryValues(elts, styles.color.by);
        valueList = extractValueList(boundaries, styles.color.bins);
        isInteger = boundaries.min % 1 == 0 && boundaries.max % 1 == 0;
    }

    svg.icons = {};

    drawBackground(svg, vs, height);
    drawWidgetTitle(vs, svg, getPropertyName(styles[visualVar].by), unit);

    /* Display additional information for the type of edge */
    if (elementType === 'edge' && visualVar === 'type') {
      txt =  'source node to target node';
      fontSize = shrinkFontSize(txt, vs.legendFontFamily, vs.legendFontSize, vs.legendWidth - vs.legendInnerMargin * 2);
      drawText(vs, svg, txt, vs.legendInnerMargin, offsetY, 'left', vs.legendFontColor, vs.legendFontFamily, fontSize);
      offsetY += lineHeight;
    }

    iterate(scheme, function (value, key) {
      if (!quantitativeColor && !existingValues[key]) {
        return;
      }

      if (visualVar === 'color') {
        if (quantitativeColor) {
          value = scheme[scheme.length - key - 1];
        }

        if (elementType === 'edge') {
          draw(svg, 'rect', {x:vs.legendInnerMargin, y:offsetY - lineHeight / 8,
                             width:leftColumnWidth - vs.legendInnerMargin * 2, height:lineHeight / 4, fill:value});
        } else {
          drawCircle(svg, vs.legendInnerMargin + vs.legendFontSize / 2, offsetY, vs.legendFontSize / 2, value);
        }
      } else if (visualVar === 'icon') {
        svg.icons[value.content] = {
          font: value.font,
          fontSize: vs.legendFontSize,
          //color: value.color,
          color: vs.legendFontColor,
          x: vs.legendInnerMargin,
          y: offsetY
        };
      } else if (visualVar === 'type') {
        if (elementType === 'edge') {
          drawEdge(vs, svg, value, vs.legendInnerMargin, leftColumnWidth - vs.legendInnerMargin, offsetY, vs.legendFontSize / 3);
        } else {
          drawShape(vs, svg, value, vs.legendInnerMargin + vs.legendFontSize / 2, offsetY, vs.legendFontSize / 2);
        }
      }

      var textYAdjustment = 2;
      if (quantitativeColor) {
        txt = numberToText(valueList[nbElements - key - 1], isInteger) + ' - ' + numberToText(valueList[nbElements - parseInt(key)], isInteger);
        drawText(vs, svg, txt, leftColumnWidth, offsetY + textYAdjustment, 'left', null, null, null, 'middle');
      } else {
        var shrinkedText = getShrinkedText(prettyfy(key), vs.legendWidth - vs.legendInnerMargin - textOffsetX,
          vs.legendFontFamily, vs.legendFontSize);

        drawText(vs, svg, shrinkedText, textOffsetX, offsetY + textYAdjustment, 'left', null, null, null, 'middle');
      }

      offsetY += lineHeight;
    });

    svg.width = vs.totalWidgetWidth;
    svg.height = height + (vs.legendBorderWidth + vs.legendOuterMargin) * 2;

    return svg;
  }

  /**
   * Remove every character of a string that are after a specified with limit. Add '...' at the end of the string if
   * at least one character is removed.
   * @param text       {string}
   * @param maxWidth   {number}
   * @param fontFamily {string}
   * @param fontSize   {number}
   * @returns {*}
   */
  function getShrinkedText(text, maxWidth, fontFamily, fontSize) {
    var textWidth = getTextWidth(text, fontFamily, fontSize, false),
        shrinked = false;

    while (textWidth > maxWidth) {
      shrinked = true;
      var ratio = maxWidth / textWidth,
          text = text.substr(0, text.length * ratio);
      textWidth = getTextWidth(text, fontFamily, fontSize, false);
    }

    if (shrinked) {
      text += '...';
    }

    return text;
  }

  /**
   * Not currently used, but may be useful in the future. The idea was to display an image in base64
   * inside a svg.
   * @param svg
   * @param base64Img
   * @param x
   * @param y
   */
  function drawImage(svg, base64Img, x, y) {
    var i = createAndAppend(svg, 'image',  {
      x:x,
      y:y,
      'xlink:href':base64Img
    });
  }

  function drawText(vs, svg, content, x, y, textAlign, color, fontFamily, fontSize, verticalAlign) {
    createAndAppend(svg, 'text', {
      x: x,
      y: y,
      'text-anchor': textAlign ? textAlign : 'left',
      fill: color ? color : vs.legendFontColor,
      'font-size': fontSize ? fontSize : vs.legendFontSize,
      'font-family': fontFamily ? fontFamily : vs.legendFontFamily,
      'alignment-baseline': verticalAlign ? verticalAlign : 'auto'
    }, content);
  }

  function drawCircle(svg, x, y, r, color, borderColor, borderWidth) {
    createAndAppend(svg, 'circle', {
      cx:x,
      cy:y,
      r:r,
      fill:color,
      stroke:borderColor,
      'stroke-width':borderWidth
    });
  }

  function drawBackground(svg, vs, height) {
    draw(svg, 'rect', {
      x:vs.legendBorderWidth,
      y:vs.legendBorderWidth,
      width:vs.legendWidth,
      height:height,
      stroke:vs.legendBorderColor,
      'stroke-width':vs.legendBorderWidth,
      fill:vs.legendBackgroundColor,
      rx:vs.legendBorderRadius,
      ry:vs.legendBorderRadius});
  }

  /* 'type' can be 'arrow', 'parallel', 'cuvedArrow', 'dashed', 'dotted', 'tapered' */
  function drawEdge(vs, svg, type, x1, x2, y, size) {
    var triangleSize = size * 2.5,
        curveHeight = size * 3,
        offsetX = Math.sqrt(3) / 2 * triangleSize;

    if (type === 'arrow') {
      drawLine(svg, x1, y, x2 - offsetX + 1, y, vs.legendShapeColor, size);
      drawPolygon(svg, [x2, y, x2 - offsetX, y - triangleSize / 2, x2 - offsetX, y + triangleSize / 2], vs.legendShapeColor);
    } else if (type === 'parallel') {
      size *= 0.8;
      drawLine(svg, x1, y - size, x2, y - size, vs.legendShapeColor, size);
      drawLine(svg, x1, y + size, x2, y + size, vs.legendShapeColor, size);
    } else if (type === 'curve') {
      drawCurve(svg, x1, y, (x1 + x2) / 2, y - curveHeight, x2, y, vs.legendShapeColor, size);
    } else if (type === 'curvedArrow') {
      var angle,
          len = x2 - x1;

      /* Warning: this is totally arbitrary. It's only an approximation, it should be replaced by proper values */
      if (len < 40) {
        angle = 35;
      } else if (len < 60) {
        angle = 33;
      } else {
        angle = 30;
      }

      drawCurve(svg, x1, y, (x1 + x2) / 2, y - curveHeight, x2 - triangleSize / 2, y - size, vs.legendShapeColor, size);
      drawPolygon(svg, [x2, y, x2 - offsetX, y - triangleSize / 2, x2 - offsetX, y + triangleSize / 2],
                  vs.legendShapeColor, {angle:angle, cx:x2, cy:y});
    } else if (type === 'dashed') {
      var dashArray = '8 3';  // Same values as in sigma.renderers.linkurious/canvas/sigma.canvas.edges.dashed
      drawLine(svg, x1, y, x2, y, vs.legendShapeColor, size, dashArray);
    } else if (type === 'dotted') {
      var dotDashArray = '2'; // Same values as in sigma.renderers.linkurious/canvas/sigma.canvas.edges.dotted
      drawLine(svg, x1, y, x2, y, vs.legendShapeColor, size, dotDashArray);
    } else if (type === 'tapered') {
      drawPolygon(svg, [x1, y + size, x1, y - size, x2, y], vs.legendShapeColor);
    }
  }

  function drawCurve(svg, x1, y1, x2, y2, x3, y3, color, width) {
    var d = 'M ' + x1 + ' ' + y1 + ' Q ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3;

    createAndAppend(svg, 'path', {
      d:d,
      stroke:color,
      'stroke-width':width,
      fill:'none'
    });
  }

  function drawShape(vs, svg, shape, x, y, size) {
    var points = [],
        angle;

    if (shape === 'diamond') {
      size *= 1.3;
      points = [ x - size,  y, x, y - size, x + size, y, x, y + size ];
    } else if (shape === 'star') {
      size *= 1.7;
      angle = -Math.PI / 2;

      for (var i = 0; i < 5; ++i) {
        points[i*2] = Math.cos(angle);
        points[i*2+1] = Math.sin(angle);
        angle += Math.PI * 4 / 5;
      }
    } else if (shape === 'equilateral') {
      size *= 1.3;
      var nbPoints = 5; // Default value like in sigma.renderers.linkurious/canvas/sigma.canvas.nodes.equilateral

      angle = -Math.PI / 2;

      for (var i = 0; i < nbPoints; ++i) {
        points[i*2] = Math.cos(angle);
        points[i*2+1] = Math.sin(angle);
        angle += Math.PI * 2 / nbPoints;
      }
    } else if (shape === 'square') {
      points = [x - size, y - size, x + size, y - size, x + size, y + size, x - size, y + size];
    }

    if (shape === 'star' || shape === 'equilateral') {
      for (var i = 0; i < points.length; i += 2) {
        points[i] = x + points[i] * size;
        points[i+1] = y + points[i+1] * size;
      }
    }

    if (shape !== 'cross') {
      drawPolygon(svg, points, vs.legendShapeColor);
    } else {
      size *= 1.2;
      var lineWidth = 2 * window.devicePixelRatio; // Arbitrary
      drawLine(svg, x - size, y, x + size, y, vs.legendShapeColor, lineWidth);
      drawLine(svg, x, y - size, x, y + size, vs.legendShapeColor, lineWidth);
    }
  }

  /**
   * Draw a polygon on a svg.
   * @param svg     {Object}
   * @param points  {Array<number>} Format: [x1, y1, x2, y2, ...]
   * @param color   {string}
   * @param [rotation] {Object}       Optional. Specifies a rotation to apply to the polygon.
   */
  function drawPolygon(svg, points, color, rotation) {
    var attrPoints = points[0] + ',' + points[1];
    for (var i = 2; i < points.length; i += 2) {
      attrPoints += ' ' + points[i] + ',' + points[i+1];
    }

    var attributes = {points:attrPoints, fill:color};
    if (rotation) {
      attributes.transform = 'rotate(' + rotation.angle + ', ' + rotation.cx + ', ' + rotation.cy + ')';
    }

    createAndAppend(svg, 'polygon', attributes);
  }

  function drawLine(svg, x1, y1, x2, y2, color, width, dashArray) {
    createAndAppend(svg, 'line', {
      x1:x1,
      y1:y1,
      x2:x2,
      y2:y2,
      stroke:color,
      'stroke-width':width,
      'stroke-dasharray':dashArray
    });
  }

  function draw(svg, type, args) {
    createAndAppend(svg, type, args);
  }

  /**
   * Draw the title of a widget. If the title is too large, the font size will be reduced until it fits.
   * @param vs    {Object} Visual settings.
   * @param svg   {Object}
   * @param title {string} Title of the widget.
   * @param unit  {string} Optional. The unit to be displayed alongside the title.
   */
  function drawWidgetTitle(vs, svg, title, unit) {
    var text = (title.length > vs.legendTitleMaxLength ? title.substring(0, vs.legendTitleMaxLength) : title)
             + (unit ? ' (' + unit + ')' : ''),
        fontSize = shrinkFontSize(text, vs.legendTitleFontFamily, vs.legendTitleFontSize, vs.legendWidth - vs.legendInnerMargin),
        offsetX = vs.legendTitleTextAlign === 'middle' ? vs.legendWidth / 2 : vs.legendInnerMargin;

    drawText(vs, svg, text, offsetX, vs.legendFontSize + vs.legendInnerMargin, vs.legendTitleTextAlign,
      vs.legendTitleFontColor, vs.legendTitleFontFamily, fontSize);
  }

  /**
   * Convert a property name to a nice, good looking title (e.g. 'funding_year' -> 'Funding year')
   * @param txt {string}
   * @returns {string}
   */
  function prettyfy(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1).replace(/_/g, ' ');
  }

  /**
   * Reduce the font size of until the specified text fits a specified with.
   * @param text        {string}
   * @param fontFamily  {string}
   * @param fontSize    {number}
   * @param maxWidth    {number}
   * @returns {number}            The new size of the font.
   */
  function shrinkFontSize(text, fontFamily, fontSize, maxWidth) {
    while (getTextWidth(text, fontFamily, fontSize, false) > maxWidth) {
      fontSize -= (fontSize > 15 ? 2 : 1);
    }

    return fontSize;
  }

  var helper = document.createElement('canvas').getContext('2d');
  /**
   * Compute the width in pixels of a string, given a font family and font size.
   * @param text        {string}
   * @param fontFamily  {string}
   * @param fontSize    {number}
   * @param approximate {boolean} Optional. Specifies if the computation must be approximate (faster, but not accurate).
   * @returns {number}  Width of the text.
   */
  function getTextWidth(text, fontFamily, fontSize, approximate) {
    if (approximate) {
      return 0.45 * fontSize * text.length;
    } else {
      helper.font = fontSize + 'px ' + fontFamily;
      return helper.measureText(text).width;
    }
  }

  /**
   * Convert a number N to a formatted string.
   * If N > 9999 -> 3 most significant digits + unit (K, M, G, ...)
   * If N <= 9999 -> 4 most significant digits (including digits after the comma)
   * @param number {number}
   * @param isInteger {boolean} Indicates if the number is an integer (if so, no digit after the comma will be displayed).
   * @returns {string} The formatted number/
   */
  function numberToText(number, isInteger) {
    var units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

    if (number > 9999) {
      var i = 0;
      while (i < units.length && number > 999) {
        number /= 1000;
        ++i;
      }
      return Math.ceil(number) + units[i-1];
    } else if (isInteger) {
      return Math.round(number).toString();
    } else if (number < 10) {
      return (Math.round(number * 1000) / 1000).toString();
    } else if (number < 100) {
      return (Math.round(number * 100) / 100).toString();
    } else if (number < 1000) {
      return (Math.round(number * 10) / 10).toString();
    } else {
      return (Math.round(number)).toString();
    }
  }

  /* ============================ */
  /* ===== PUBLIC FUNCTIONS ===== */
  /* ============================ */

  var _legendInstances = {};

  /**
   * Returns the instance of a specified sigma instance's legend plugin. Create it if it does not exist yet.
   * @param s {Object}        Sigma instance.
   * @returns {LegendPlugin}
   */
  sigma.plugins.legend = function (s) {
    if (!_legendInstances[s.id]) {
      _legendInstances[s.id] = new LegendPlugin(s);

      s.bind('kill', function() {
        sigma.plugins.killLegend(s);
      });
    }

    return _legendInstances[s.id];
  };

  /**
   * Destroy a sigma instance's associated legend plugin instance.
   * @param s {Object} Sigma instance.
   */
  sigma.plugins.killLegend = function (s) {
    var legendInstance = _legendInstances[s.id];
    if (legendInstance) {
      iterate(legendInstance.widgets, function (value, key) {
        legendInstance.widgets[key] = undefined;
      });
      _legendInstances[s.id] = undefined;
    }
  };

  /**
   * Build the widgets, compute the layout and draw the legend.
   * Must be called whenever the graph's design changes.
   */
  LegendPlugin.prototype.draw = function (callback) {
    var self = this,
        pixelRatio = this._visualSettings.pixelRatio;

    //setupCanvas(this._canvas, this._canvas.width / pixelRatio, this._canvas.height / pixelRatio, this._visualSettings.pixelRatio);
    buildLegendWidgets(this, function () {
      drawLayout(self);
      if (callback) {
        callback();
      }
    });
  };

  /**
   * Set the visibility of the legend.
   * @param visible {boolean}
   */
  LegendPlugin.prototype.setVisibility = function (visible) {
    this.visible = visible;
    drawLayout(this);
  };

  /**
   * Change the position of the legend.
   * @param newPlacement 'top', 'bottom', 'left' or 'right'
   */
  LegendPlugin.prototype.setPlacement = function (newPlacement) {
    if (['top', 'bottom', 'right', 'left'].indexOf(newPlacement) === -1) {
      return;
    }

    this.placement = newPlacement;
    drawLayout(this);
  };


  /**
   * Add a widget to the legend. Draw the legend.
   * Note: if a widget is not used (no corresponding design mapping), it won't be displayed.
   * @param elementType 'node' or 'edge'
   * @param visualVar   'size', 'color', 'icon'
   * @param unit        Optional. The unit to be displayed beside the widget's title
   * @returns {*}       The added widget.
   */
  LegendPlugin.prototype.addWidget = function (elementType, visualVar, unit) {
    var widget = this.widgets[makeWidgetId(elementType, visualVar)];

    if (!widget) {
      widget = new LegendWidget(this._canvas, this._sigmaInstance, this._designPlugin, this, elementType, visualVar);
      widget.id = makeWidgetId(elementType, visualVar);
      this.widgets[widget.id] = widget;
    }
    widget.unit = unit;
    buildWidgetAndDrawLayout(widget);

    return widget;
  };

  /**
   * @param elementType {string} 'node' or 'edge'
   * @param visualVar   {string} 'color', 'icon', 'size', 'type'
   * @returns {LegendWidget}
   */
  LegendPlugin.prototype.getWidget = function (elementType, visualVar) {
    return this.widgets[makeWidgetId(elementType, visualVar)];
  };

  /**
   * Add a widget that only contains text.  Draw the legend.
   * @param text              The text to be displayed inside the widget.
   * @returns {LegendWidget}  The added widget
   */
  LegendPlugin.prototype.addTextWidget = function (text) {
    var widget = new LegendWidget(this._canvas, this._sigmaInstance, this._designPlugin, this, 'text');

    widget.text = text;
    widget.id = 'text' + this.textWidgetCounter++;
    this.widgets[widget.id] = widget;

    buildWidgetAndDrawLayout(widget);

    return widget;
  };

  /**
   * Remove a widget.
   * @param arg1  The widget to remove, or the type of element ('node' or 'edge')
   * @param arg2  If the first argument was the type of element, it represents the visual variable
   *              of the widget to remove
   */
  LegendPlugin.prototype.removeWidget = function (arg1, arg2) {
    var id = arg1 instanceof LegendWidget ? arg1.id : makeWidgetId(arg1, arg2);
    if (this.widgets[id]) {
      this.widgets[id] = undefined;
      drawLayout(this);
    }
  };

  /**
   * Remove all widgets from the legend.
   */
  LegendPlugin.prototype.removeAllWidgets = function () {
    this.widgets = {};
    drawLayout(this);
  };

  /**
   * Unpin the widget. An pinned widget is not taken into account when it is positioned through
   * automatic layout.
   */
  LegendWidget.prototype.unpin = function () {
    this.pinned = false;
    drawLayout(this._legendPlugin);
  };


  /**
   * Change the position of a widget and pin it. An pinned widget is not taken into account when
   * it is positioned through automatic layout.
   * @param x
   * @param y
   */
  LegendWidget.prototype.setPosition = function (x, y) {
    this.pinned = true;
    this.x = x;
    this.y = y;
    drawLayout(this._legendPlugin);
  };

  /**
   * Set the text of a widget. The widget must be a text widget.
   * @param text The text to be displayed by the widget.
   */
  LegendWidget.prototype.setText = function (text) {
    this.text = text;
    buildWidgetAndDrawLayout(this);
  };

  /**
   * Set the unit of a widget. The widget must represent a size.
   * @param unit The unit to be displayed alongside the widget's title.
   */
  LegendWidget.prototype.setUnit = function (unit) {
    this.unit = unit;
    buildWidgetAndDrawLayout(this);
  };

  /**
   * Specify the list of external css files that must be included within the svg.
   * @param externalCSSList {Array<string>}
   */
  LegendPlugin.prototype.setExternalCSS = function (externalCSSList) {
    this.externalCSS = externalCSSList;
  };

  /**
   * Download the legend (PNG format).
   * @param [filename] {string} Optional. Default: 'legend.png'
   */
  LegendPlugin.prototype.exportPng = function (filename) {
    var visibility = this.visible,
        self = this;

    // We set the legend to visible so it draws the legend in the canvas
    self.visible = true;
    self.draw(function () {
      var tmpCanvas = document.createElement('canvas'),
        ctx = tmpCanvas.getContext('2d'),
        box = self.boundingBox;

      tmpCanvas.width = box.w;
      tmpCanvas.height = box.h;

      ctx.drawImage(self._canvas, box.x, box.y, box.w, box.h, 0, 0, box.w, box.h);
      self.setVisibility(visibility);

      download(tmpCanvas.toDataURL(), filename ? filename : 'legend.png', true);
    });
  };

  /**
   * Download the legend (SVG format).
   * 'setExternalCSS' needs to be called before (if there is any external CSS file needed).
   * @param [filename] {string} Optional. Default: 'legend.svg'
   */
  LegendPlugin.prototype.exportSvg = function (filename) {
    var self = this;
    this.draw(function () {
      var vs = self._visualSettings,
        box = self.boundingBox,
        str = '';

      (self.externalCSS || []).forEach(function (url) {
        str += '<?xml-stylesheet type="text/css" href="' + url + '" ?>\n';
      });

      str += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="' + box.w + 'px" height="' + box.h + 'px">';
      iterate(self.widgets, function (widget) {
        if (widget.svg === null) {
          return;
        }

        str += '<g transform="translate(' + (widget.x + - box.x) + ' ' + (widget.y - box.y) + ')">';
        str += widget.svg.innerHTML;
        if (widget.visualVar === 'icon') {
          var tmpSvg = document.createElement('svg');
          iterate(widget.svg.icons, function (value, content) {
            drawText(vs, tmpSvg, content, value.x, value.y, 'left', vs.legendFontColor, value.font,
              vs.legendFontSize, 'central');
          });
          str += tmpSvg.innerHTML;
        }
        str += '</g>';
      });
      str += '</svg>';

      download(str, filename ? filename : 'legend.svg');
    });
  };

}).call(this);
/**
 * This plugin provides a method to drag & drop nodes. Check the
 * sigma.plugins.dragNodes function doc or the examples/drag-nodes.html code
 * sample to know more.
 */
(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  sigma.utils.pkg('sigma.plugins');


  /**
   * This function will add `mousedown`, `mouseup` & `mousemove` events to the
   * nodes in the `overNode`event to perform drag & drop operations. It uses
   * `linear interpolation` [http://en.wikipedia.org/wiki/Linear_interpolation]
   * and `rotation matrix` [http://en.wikipedia.org/wiki/Rotation_matrix] to
   * calculate the X and Y coordinates from the `cam` or `renderer` node
   * attributes. These attributes represent the coordinates of the nodes in
   * the real container, not in canvas.
   *
   * Fired events:
   * *************
   * startdrag  Fired at the beginning of the drag.
   * drag       Fired while the node is dragged.
   * drop       Fired at the end of the drag if the node has been dragged.
   * dragend    Fired at the end of the drag.
   *
   * Recognized parameters:
   * **********************
   * @param  {sigma}                      s        The related sigma instance.
   * @param  {renderer}                   renderer The related renderer instance.
   * @param  {?sigma.plugins.activeState} a        The activeState plugin instance.
   */
  function DragNodes(s, renderer, a) {
    sigma.classes.dispatcher.extend(this);

    // A quick hardcoded rule to prevent people from using this plugin with the
    // WebGL renderer (which is impossible at the moment):
    if (
      sigma.renderers.webgl &&
      renderer instanceof sigma.renderers.webgl
    )
      throw new Error(
        'The sigma.plugins.dragNodes is not compatible with the WebGL renderer'
      );

    // Init variables:
    var _self = this,
      _s = s,
      _a = a,
      _body = document.body,
      _renderer = renderer,
      _mouse = renderer.container.getElementsByClassName('sigma-mouse')[0],
      _prefix = renderer.options.prefix,
      _node = null,
      _draggingNode = null,
      _hoveredNode = null,
      _isMouseDown = false,
      _isMouseOverCanvas = false,
      _drag = false,
      _sticky = true,
      _enabled = true;

    if (renderer instanceof sigma.renderers.svg) {
        _mouse = renderer.container.firstChild;
    }

    renderer.bind('hovers', nodeMouseOver);
    renderer.bind('hovers', treatOutNode);
    renderer.bind('click', click);

    /**
     * Enable dragging and events.
     */
    this.enable = function() {
      _enabled = true;
    }

    /**
     * Disable dragging and events.
     */
    this.disable = function() {
      _enabled = false;
      _node = null,
      _draggingNode = null,
      _hoveredNode = null;
      _isMouseDown = false,
      _isMouseOverCanvas = false,
      _drag = false,
      _sticky = true;
    }

    /**
     * Unbind all event listeners.
     */
    this.unbindAll = function() {
      _mouse.removeEventListener('mousedown', nodeMouseDown);
      _body.removeEventListener('mousemove', nodeMouseMove);
      _body.removeEventListener('mouseup', nodeMouseUp);
      _renderer.unbind('hovers', nodeMouseOver);
      _renderer.unbind('hovers', treatOutNode);
    }

    // Calculates the global offset of the given element more accurately than
    // element.offsetTop and element.offsetLeft.
    function calculateOffset(element) {
      var style = window.getComputedStyle(element);
      var getCssProperty = function(prop) {
        return parseInt(style.getPropertyValue(prop).replace('px', '')) || 0;
      };
      return {
        left: element.getBoundingClientRect().left + getCssProperty('padding-left'),
        top: element.getBoundingClientRect().top + getCssProperty('padding-top')
      };
    };

    function click(event) {
      // event triggered at the end of the click
      _isMouseDown = false;
      _body.removeEventListener('mousemove', nodeMouseMove);
      _body.removeEventListener('mouseup', nodeMouseUp);

      if (!_hoveredNode) {
        _node = null;
      }
      else {
        // Drag node right after click instead of needing mouse out + mouse over:
        setTimeout(function() {
          // Set the current node to be the last hovered node
          _node = _hoveredNode;
          _mouse.addEventListener('mousedown', nodeMouseDown);
        }, 0);
      }
    };

    function nodeMouseOver(event) {
      if (event.data.enter.nodes.length == 0) {
        return;
      }
      var n = event.data.enter.nodes[0];

      // Don't treat the node if it is already registered
      if (_hoveredNode && _hoveredNode.id === n.id) {
        return;
      }

      // Set reference to the hovered node
      _hoveredNode = n;

      if(!_isMouseDown) {
        // Set the current node to be the last hovered node
        _node = _hoveredNode;
        _mouse.addEventListener('mousedown', nodeMouseDown);
      }
    };

    function treatOutNode(event) {
      if (event.data.leave.nodes.length == 0) {
        return;
      }
      var n = event.data.leave.nodes[0];

      if (_hoveredNode && _hoveredNode.id === n.id) {
        _hoveredNode = null;
        _node = null;
      }
      else if (!_hoveredNode) {
        _mouse.removeEventListener('mousedown', nodeMouseDown);
      }
    };

    function nodeMouseDown(event) {
      if(!_enabled || event.which == 3) return; // Right mouse button pressed

      _isMouseDown = true;
      if (_node && _s.graph.nodes().length > 0) {
        _sticky = true;
        _mouse.removeEventListener('mousedown', nodeMouseDown);
        _body.addEventListener('mousemove', nodeMouseMove);
        _body.addEventListener('mouseup', nodeMouseUp);

        // Deactivate drag graph.
        _renderer.settings({mouseEnabled: false, enableHovering: false});

        _self.dispatchEvent('startdrag', {
          node: _node,
          captor: event,
          renderer: _renderer
        });
      }
    };

    function nodeMouseUp(event) {
      _isMouseDown = false;
      _mouse.addEventListener('mousedown', nodeMouseDown);
      _body.removeEventListener('mousemove', nodeMouseMove);
      _body.removeEventListener('mouseup', nodeMouseUp);

      // Activate drag graph.
      _renderer.settings({mouseEnabled: true, enableHovering: true});

      if (_drag) {
        _self.dispatchEvent('drop', {
          node: _draggingNode,
          captor: event,
          renderer: _renderer
        });

        if(_a) {
          var activeNodes = _a.nodes();
          for(var i = 0; i < activeNodes.length; i++) {
            activeNodes[i].alphaX = undefined;
            activeNodes[i].alphaY = undefined;
          }
        }

        _s.refresh();
      }
      _self.dispatchEvent('dragend', {
        node: _node,
        captor: event,
        renderer: _renderer
      });

      _drag = false;
      _draggingNode = null;
    };

    function nodeMouseMove(event) {
      if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        clearTimeout(timeOut);
        var timeOut = setTimeout(executeNodeMouseMove, 0);
      } else {
        executeNodeMouseMove();
      }

      function executeNodeMouseMove() {
        var offset = calculateOffset(_renderer.container),
            x = event.clientX - offset.left,
            y = event.clientY - offset.top,
            cos = Math.cos(_renderer.camera.angle),
            sin = Math.sin(_renderer.camera.angle),
            nodes = _s.graph.nodes(),
            ref = [],
            x2,
            y2,
            activeNodes,
            n,
            aux,
            isHoveredNodeActive,
            dist;

        if (_a && _a.nbNodes() === nodes.length) return;

        if (!_enabled || nodes.length < 2) return;

        dist = sigma.utils.getDistance(x, y, _node[_prefix + 'x'],_node[_prefix + 'y']);

        if (_sticky && dist < _node[_prefix + 'size']) return;
        _sticky = false;

        // Find two reference points and derotate them
        // We take the first node as a first reference point and then try to find
        // another node not aligned with it
        for (var i = 0;;i++) {
          if(!_enabled) break;

          n = nodes[i];
          if (n) {
            aux = {
              x: n.x * cos + n.y * sin,
              y: n.y * cos - n.x * sin,
              renX: n[_prefix + 'x'], //renderer X
              renY: n[_prefix + 'y'], //renderer Y
            };
            ref.push(aux);
          }
          if(i == nodes.length - 1) { //we tried all nodes
            break
          }
          if (i > 0) {
            if (ref[0].x == ref[1].x || ref[0].y == ref[1].y) {
              ref.pop() // drop last nodes and try to find another one
            } else { // we managed to find two nodes not aligned
              break
            }
          }
        }

        var a = ref[0], b = ref[1];

        // Applying linear interpolation.
        var divx = (b.renX - a.renX);
        if (divx === 0) divx = 1; //fix edge case where axis are aligned

        var divy = (b.renY - a.renY);
        if (divy === 0) divy = 1; //fix edge case where axis are aligned

        x = ((x - a.renX) / divx) * (b.x - a.x) + a.x;
        y = ((y - a.renY) / divy) * (b.y - a.y) + a.y;

        x2 = x * cos - y * sin;
        y2 = y * cos + x * sin;

        // Drag multiple nodes, Keep distance
        if(_a) {
          activeNodes = _a.nodes();

          // If hovered node is active, drag active nodes
          isHoveredNodeActive = (-1 < activeNodes.map(function(node) {
            return node.id;
          }).indexOf(_node.id));

          if (isHoveredNodeActive) {
            for(var i = 0; i < activeNodes.length; i++) {
              // Delete old reference
              if(_draggingNode != _node) {
                activeNodes[i].alphaX = undefined;
                activeNodes[i].alphaY = undefined;
              }

              // Calcul first position of activeNodes
              if(!activeNodes[i].alphaX || !activeNodes[i].alphaY) {
                activeNodes[i].alphaX = activeNodes[i].x - x;
                activeNodes[i].alphaY = activeNodes[i].y - y;
              }

              // Move activeNodes to keep same distance between dragged nodes
              // and active nodes
              activeNodes[i].x = _node.x + activeNodes[i].alphaX;
              activeNodes[i].y = _node.y + activeNodes[i].alphaY;
            }
          }
        }

        // Rotating the coordinates.
        _node.x = x2;
        _node.y = y2;

        _s.refresh({skipIndexation: true});

        _drag = true;
        _draggingNode = _node;

        _self.dispatchEvent('drag', {
          node: _draggingNode,
          captor: event,
          renderer: _renderer
        });
      }
    };
  };

  /**
   * Interface
   * ------------------
   *
   * > var dragNodesListener = sigma.plugins.dragNodes(s, s.renderers[0], a);
   */
  var _instance = {};

  /**
   * @param  {sigma}                      s        The related sigma instance.
   * @param  {renderer}                   renderer The related renderer instance.
   * @param  {?sigma.plugins.activeState} a        The activeState plugin instance.
   */
  sigma.plugins.dragNodes = function(s, renderer, a) {
    // Create object if undefined
    if (!_instance[s.id]) {
      // Handle drag events:
      _instance[s.id] = new DragNodes(s, renderer, a);
    }

    s.bind('kill', function() {
      sigma.plugins.killDragNodes(s);
    });

    // disable on plugins.animate start.
    s.bind('animate.start', function() {
      _instance[s.id].disable();
    });

    // enable on plugins.animate end.
    s.bind('animate.end', function() {
      _instance[s.id].enable();
    });

    return _instance[s.id];
  };

  /**
   * This method removes the event listeners and kills the dragNodes instance.
   *
   * @param  {sigma} s The related sigma instance.
   */
  sigma.plugins.killDragNodes = function(s) {
    if (_instance[s.id] instanceof DragNodes) {
      _instance[s.id].unbindAll();
      delete _instance[s.id];
    }
  };

}).call(window);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');


  /**
   * Fast deep copy function.
   *
   * @param  {object} o The object.
   * @return {object}   The copy.
   */
  function deepCopy(o) {
    var copy = Object.create(null);
    for (var i in o) {
      if (typeof o[i] === "object" && o[i] !== null) {
        copy[i] = deepCopy(o[i]);
      }
      else if (typeof o[i] === "function" && o[i] !== null) {
        // clone function:
        eval(" copy[i] = " +  o[i].toString());
        //copy[i] = o[i].bind(_g);
      }
      else
        copy[i] = o[i];
    }
    return copy;
  };


  /**
   * This method finds an edge in the graph. If the edge is a sibling, it
   * returns the container of the sibling.
   *
   * @param  {string} id The edge identifier.
   * @return {object}    The edge or its container.
   */
  function find(id) {
    var sibling,
        edges,
        e;

    // Cases:
    //   single edge
    //   1 sibling and container has same id
    //   2+ siblings and container has same id
    //   has siblings and container has different id

    if (sibling = this.siblingEdgesIndex[id]) {
      edges = this.allNeighborsIndex.get(sibling.source).get(sibling.target);

      if (edges.size === 1) {
        e = this.edges(edges.keyList()[0]);
        if (e.type !== 'parallel')
          throw new Error('The sibling container must be of type "parallel", was ' + e.type);

        if (e.siblings === undefined)
          throw new Error('The sibling container has no "siblings" key.');

        if (Object.keys(e.siblings).length < 2)
          throw new Error('The sibling container must have more than one sibling, had ' + Object.keys(e.siblings).length);

        if (e.siblings[id] === undefined)
          throw new Error('Sibling container found but the edge sibling is missing.');

        return e;
      }
      else if (edges.size > 1) {
        // We have parallel edges in the graph structure, maybe because
        // graph.addEdge() has been called directly.
        var edgeFound;
        edges.forEach(function(e, eid) {
          if (e.type === 'parallel' && e.siblings !== undefined) {
            // The edge contains siblings, but does it contain our sibling?
            if (Object.keys(e.siblings).length) {
              if (e.siblings[id] !== undefined) {
                edgeFound = e;
              }
            }
            else
              throw new Error('Edge sibling found but its container is missing.');
          }
        });
        if (edgeFound !== undefined)
          return edgeFound;
        throw new Error('Edge sibling found but its container is missing.');
      }
      else // edges.size == 0
        throw new Error('Edge sibling found but its container is missing.');
    }
    else
      return this.edgesIndex.get(id);
  };


  /**
   * This methods returns one or several edges, depending on how it is called.
   *
   * To get the array of edges, call "edges" without argument. To get a
   * specific edge, call it with the id of the edge. The get multiple edge,
   * call it with an array of ids, and it will return the array of edges, in
   * the same order. If some edges are siblings, their containers are returned
   * instead.
   *
   * @param  {?(number|string|array)} v Eventually one id, an array of ids.
   * @return {object|array}             The related edge or array of edges.
   */
  function get(v) {
    // Clone the array of edges and return it:
    if (!arguments.length || v === undefined)
      return this.edgesArray.slice(0);

    if (arguments.length > 1)
      throw new Error('Too many arguments. Use an array instead.');

    // Return the related edge or edge container:
    if (typeof v === 'number' || typeof v === 'string') {
      return find.call(this, v);
    }

    // Return an array of the related edge or edge container:
    if (Array.isArray(v)) {
      var i,
          l,
          a = [];

      for (i = 0, l = v.length; i < l; i++)
        if (typeof v[i] === 'number' || typeof v[i] === 'string') {
          a.push(find.call(this, v[i]));
        }
        else
          throw new Error('Invalid argument: an edge id is not a string or a number, was ' + v[i]);

      return a;
    }

    throw new Error('Invalid argument: "v" is not a string or an array, was ' + v);
  };

  /**
   * This method adds an edge sibling to its edge container. Edge siblings are
   * stored in the "siblings" property of the container.
   *
   * If the container didn't have any sibling, it transforms it as a container:
   * it will copy the it as a sibling, set its type as "parallel", remove
   * its label and color, and reset its size.
   *
   * @param {object} c The sibling container.
   * @param {object} s The edge sibling.
   */
  function add(c, s) {
    if (!c.siblings) {
      var copy = deepCopy(c);
      c.siblings = {};
      c.siblings[c.id] = copy;

      delete c.color;
      delete c.label;
      c.size = 1;
      c.type = 'parallel';

      this.siblingEdgesIndex[copy.id] = copy;
    }

    c.siblings[s.id] = s;
    this.siblingEdgesIndex[s.id] = s;
  };

  /**
   * This method removes an edge sibling from its edge container.
   *
   * If a single sibling remains after the removal, it transforms the edge used
   * as a container into a normal edge.
   *
   * @param {object} c   The sibling container.
   * @param {string} sid The sibling id.
   */
  function drop(c, sid) {
    delete c.siblings[sid];
    delete this.siblingEdgesIndex[sid];

    if (Object.keys(c.siblings).length === 1) {
      // One sibling remains so we drop the container and add the sibling as a
      // new edge:
      var e = c.siblings[Object.keys(c.siblings)[0]];
      this.dropEdge(c.id);
      this.addEdge(e);
      delete this.siblingEdgesIndex[c.id];
      delete this.siblingEdgesIndex[e.id];
    }
  };


  // Add custom graph methods:


  /**
   * This methods returns one or several edges, depending on how it is called.
   *
   * To get the array of edges, call "edges" without argument. To get a
   * specific edge, call it with the id of the edge. The get multiple edge,
   * call it with an array of ids, and it will return the array of edges, in
   * the same order. If some edges are siblings, their containers are returned
   * instead.
   *
   * @param  {?(string|array)} v Eventually one id, an array of ids.
   * @return {object|array}      The related edge or array of edges.
   */
  if (!sigma.classes.graph.hasMethod('edgeSiblings'))
    sigma.classes.graph.addMethod('edgeSiblings', function(v) {
      return get.call(this, v);
    });

  /**
   * This method adds an edge to the graph. The edge must be an object, with a
   * string under the key "id", and strings under the keys "source" and
   * "target" that design existing nodes. Except for this, it is possible to
   * add any other attribute, that will be preserved all along the
   * manipulations.
   *
   * If the graph option "clone" has a truthy value, the edge will be cloned
   * when added to the graph. Also, if the graph option "immutable" has a
   * truthy value, its id, source and target will be defined as immutable.
   *
   * If an edge already exists between the source and target nodes, it will add
   * the edge as a sibling of the existing edge. It will copy the existing edge
   * as a sibling, set its type as "parallel", remove its label and color, and
   * reset its size.
   *
   * If parallel edges already exist, it will add the edge as a sibling to one
   * of these edges (in this case the operation is not deterministic). It may
   * happen when graph.addEdge or graph.read is used.
   *
   * @param  {object} edge The edge to add.
   * @return {object}      The graph instance.
   */
  if (!sigma.classes.graph.hasMethod('addEdgeSibling'))
    sigma.classes.graph.addMethod('addEdgeSibling', function(edge) {
      // Check that the edge is an object and has an id:
      if (arguments.length == 0)
        throw new TypeError('Missing argument.');

      if (Object(edge) !== edge)
        throw new TypeError('Invalid argument: "edge" is not an object, was ' + edge);

      if (typeof edge.id !== 'number' && typeof edge.id !== 'string')
        throw new TypeError('Invalid argument key: "edge.id" is not a string or a number, was ' + edge.id);

      if ((typeof edge.source !== 'number' && typeof edge.source !== 'string') || !this.nodesIndex.get(edge.source))
        throw new Error('Invalid argument key: "edge.source" is not an existing node id, was ' + edge.source);

      if ((typeof edge.target !== 'number' && typeof edge.target !== 'string') || !this.nodesIndex.get(edge.target))
        throw new Error('Invalid argument key: "edge.target" is not an existing node id, was ' + edge.target);

      if (this.edgesIndex.get(edge.id))
        throw new Error('Invalid argument: an edge of id "' + edge.id + '" already exists.');

      if (this.siblingEdgesIndex[edge.id])
        throw new Error('Invalid argument: an edge sibling of id "' + edge.id + '" already exists.');

      var edges = this.allNeighborsIndex.get(edge.source).get(edge.target);
      if (edges !== undefined && edges.size) {
        // An edge already exists, we make it a container and add a sibling:
        var otherEdge = this.edges(edges.get(edges.keyList()[0]).id);
        add.call(
          this,
          otherEdge,
          edge
        );
      }
      else {
        // No edge exists between source and target, we add a normal edge:
        this.addEdge(edge);
      }

      return this;
    });

  /**
   * This method drops an edge from the graph. An error is thrown if the edge
   * does not exist.
   *
   * If the edge is a sibling, it will drop the sibling. If a single sibling
   * remains after the removal, it will transform the edge used as a container
   * into a regular edge.
   *
   * If parallel edges exist, i.e. multiple edges may contain the sibling, it
   * will drop the first sibling found in a parallel edge.
   *
   * @param  {number|string} id The edge id.
   * @return {object}           The graph instance.
   */
  if (!sigma.classes.graph.hasMethod('dropEdgeSibling'))
    sigma.classes.graph.addMethod('dropEdgeSibling', function(id) {
      // Check that the arguments are valid:
      if (arguments.length == 0)
        throw new TypeError('Missing argument.');

      if (typeof id !== 'number' && typeof id !== 'string')
        throw new TypeError('Invalid argument: "id" is not a string or a number, was ' + id);

      if (this.siblingEdgesIndex[id]) {
        var container = find.call(this, id);
        drop.call(this, container, id);
      }
      else
        this.dropEdge(id);

      return this;
    });

  /**
   * This method reads an object and adds the nodes and edges, through the
   * proper methods "addNode" and "addEdgeSibling".
   *
   * Here is an example:
   *
   *  > var myGraph = new graph();
   *  > myGraph.readWithSiblings({
   *  >   nodes: [
   *  >     { id: 'n0' },
   *  >     { id: 'n1' }
   *  >   ],
   *  >   edges: [
   *  >     {
   *  >       id: 'e0',
   *  >       source: 'n0',
   *  >       target: 'n1'
   *  >     },
   *  >     {
   *  >       id: 'e1',
   *  >       source: 'n0',
   *  >       target: 'n1'
   *  >     }
   *  >   ]
   *  > });
   *  >
   *  > console.log(
   *  >   myGraph.nodes().length,
   *  >   myGraph.edges().length
   *  > ); // outputs 2 1
   *  >
   *  > console.log(
   *  >   myGraph.edges('e0')
   *  > ); // outputs:
   *  > //  {
   *  > //    ...
   *  > //    type: 'parallel'
   *  > //    siblings: {
   *  > //      {
   *  > //        'e0': {
   *  > //          id: 'e0',
   *  > //          source: 'n0',
   *  > //          target: 'n1'
   *  > //        },
   *  > //        'e1': {
   *  > //          id: 'e1',
   *  > //          source: 'n0',
   *  > //          target: 'n1'
   *  > //        }
   *  > //      }
   *  > //  }
   *
   * @param  {object} g The graph object.
   * @return {object}   The graph instance.
   */
  if (!sigma.classes.graph.hasMethod('readWithSiblings'))
    sigma.classes.graph.addMethod('readWithSiblings', function(g) {
      var i,
          a,
          l;

      a = g.nodes || [];
      for (i = 0, l = a.length; i < l; i++)
        this.addNode(a[i]);

      a = g.edges || [];
      for (i = 0, l = a.length; i < l; i++)
        this.addEdgeSibling(a[i]);

      return this;
    });

    // Add custom graph indexes:
    sigma.classes.graph.addIndex('siblingEdgesIndex', {
      constructor: function() {
        this.siblingEdgesIndex = Object.create(null);
      }
    });

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');


  var _instance = {};

  // Add custom graph methods:
  /**
   * This methods returns an array of nodes that are adjacent to a node.
   *
   * @param  {string} id The node id.
   * @return {array}     The array of adjacent nodes.
   */
  if (!sigma.classes.graph.hasMethod('adjacentNodes'))
    sigma.classes.graph.addMethod('adjacentNodes', function(id) {
      if (typeof id !== 'number' && typeof id !== 'string')
        throw new TypeError('Invalid argument: "id" is not a string or a number, was ' + id);

      var target,
          nodes = [];
      for(target in this.allNeighborsIndex[id]) {
        nodes.push(this.nodesIndex.get(target));
      }
      return nodes;
    });

  /**
   * This methods returns an array of edges that are adjacent to a node.
   *
   * @param  {string} id The node id.
   * @return {array}     The array of adjacent edges.
   */
  if (!sigma.classes.graph.hasMethod('adjacentEdges'))
    sigma.classes.graph.addMethod('adjacentEdges', function(id) {
      if (typeof id !== 'number' && typeof id !== 'string')
        throw new TypeError('Invalid argument: "id" is not a string or a number, was ' + id);

      var a = this.allNeighborsIndex[id],
          eid,
          target,
          edges = [];
      for(target in a) {
        for(eid in a[target]) {
          edges.push(a[target][eid]);
        }
      }
      return edges;
    });


  // fast deep copy function
  function deepCopy(o) {
    var copy = Object.create(null);
    for (var i in o) {
      if (typeof o[i] === "object" && o[i] !== null) {
        copy[i] = deepCopy(o[i]);
      }
      else if (typeof o[i] === "function" && o[i] !== null) {
        // clone function:
        eval(" copy[i] = " +  o[i].toString());
        //copy[i] = o[i].bind(_g);
      }

      else
        copy[i] = o[i];
    }
    return copy;
  };

  function cloneChain(chain) {
    // Clone the array of filters:
    var copy = chain.slice(0);
    for (var i = 0, len = copy.length; i < len; i++) {
      copy[i] = deepCopy(copy[i]);
    };
    return copy;
  };

  /**
   * Convert Javascript string in dot notation into an object reference.
   *
   * @param  {object} obj The object.
   * @param  {string} str The string to convert, e.g. 'a.b.etc'.
   * @return {?}          The object reference.
   */
  function strToObjectRef(obj, str) {
    // http://stackoverflow.com/a/6393943
    return str.split('.').reduce(function(obj, i) { return obj[i] }, obj);
  };


  /**
   * Sigma Filter
   * =============================
   *
   * @author Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * @version 0.1.1
   */


  /**
   * Library of processors
   * ------------------
   */

  var Processors = {};   // available predicate processors

   /**
    *
    * @param  {sigma.classes.graph} g The graph instance.
    * @param  {function} fn           The predicate.
    * @param  {?object}  params       The options.
    */
  Processors.nodes = function(g, fn, params) {
    if (!g) return;

    var n = g.nodes(),
        ln = n.length,
        e = g.edges(),
        le = e.length;

    // hide node, or keep former value
    while(ln--)
      n[ln].hidden = !fn.call({
        graph: g,
        get: strToObjectRef
      }, n[ln], params) || n[ln].hidden;

    while(le--)
      if (g.nodes(e[le].source).hidden || g.nodes(e[le].target).hidden)
        e[le].hidden = true;
  };

   /**
    *
    * @param  {sigma.classes.graph} g The graph instance.
    * @param  {function} fn           The predicate.
    * @param  {?object}  params       The options.
    */
  Processors.edges = function(g, fn, params) {
    if (!g) return;

    var e = g.edges(),
        le = e.length;

    // hide edge, or keep former value
    while(le--)
      e[le].hidden = !fn.call({
        graph: g,
        get: strToObjectRef
      }, e[le], params) || e[le].hidden;
  };

   /**
    *
    * @param  {sigma.classes.graph} g The graph instance.
    * @param  {string} id             The center node.
    */
  Processors.neighbors = function(g, id) {
    if (!g) return;

    var n = g.nodes(),
        ln = n.length,
        e = g.edges(),
        le = e.length,
        neighbors = g.adjacentNodes(id),
        nn = neighbors.length,
        no = {};

    while(nn--)
      no[neighbors[nn].id] = true;

    while(ln--)
      if (n[ln].id !== id && !(n[ln].id in no))
        n[ln].hidden = true;

    while(le--)
      if (g.nodes(e[le].source).hidden || g.nodes(e[le].target).hidden)
        e[le].hidden = true;
  };

   /**
    *
    * @param  {sigma.classes.graph} g The graph instance.
    */
  Processors.undo = function(g) {
    if (!g) return;

    var n = g.nodes(),
        ln = n.length,
        e = g.edges(),
        le = e.length;

    while(ln--)
      n[ln].hidden = false;

    while(le--)
      e[le].hidden = false;
  };



  /**
   * Filter Object
   * ------------------
   * @param  {sigma} s The related sigma instance.
   */
  function Filter(s) {
    var _self = this,
      _s = s,
      _g = s.graph,
      _chain = [], // chain of wrapped filters
      _keysIndex = Object.create(null);

    /**
     * This function adds a filter to the chain of filters.
     *
     * @param  {string}   processor The processor name.
     * @param  {function} p         The predicate.
     * @param  {?object}  params    The predicate options.
     * @param  {?string}  key       The key to identify the filter.
     */
    function register(processor, p, params, key) {
      if (arguments[3] === undefined) {
        if (typeof arguments[2] !== 'object') {
          key = params;
          params = null;
        }
      }

      if (key !== undefined && typeof key !== 'number' && typeof key !== 'string')
        throw new TypeError('Invalid argument: "key" is not a number or a string, was ' + key);

      if (key !== undefined && typeof key === 'string' && !key.length)
        throw new TypeError('Invalid argument: "key" is an empty string.');

      if (typeof processor !== 'string')
        throw new TypeError('Invalid argument: "processor" is not a string, was ' + processor);

      if ('undo' === key)
        throw new Error('Invalid argument: "key" has value "undo", which is a reserved keyword.');

      if (_keysIndex[key])
        throw new Error('Invalid argument: the filter of key "' + key + '" already exists.');

      if (key)
        _keysIndex[key] = true;

      _chain.push({
        'key': key,
        'processor': processor,
        'predicate': p,
        'options': params || {}
      });
    };

    /**
     * This function removes a set of filters from the chain.
     *
     * @param {object} o The filter keys.
     */
    function unregister(o) {
      _chain = _chain.filter(function(a) {
        return !(a.key in o);
      });

      for(var key in o)
        delete _keysIndex[key];
    };

    /**
     * This method will return true if the filter key exists, false otherwise.
     *
     * @param  {string}  key The filter key.
     * @return {boolean}
     */
    this.has = function(key) {
      return _keysIndex[key];
    }

    /**
     * This method is used to filter the nodes. The method must be called with
     * the predicate, which is a function that takes a node as argument and
     * returns a boolean. It may take an identifier as argument to undo the
     * filter later. The method wraps the predicate into an anonymous function
     * that looks through each node in the graph. When executed, the anonymous
     * function hides the nodes that fail a truth test (predicate). The method
     * adds the anonymous function to the chain of filters. The filter is not
     * executed until the apply() method is called.
     *
     * > var filter = new sigma.plugins.filter(s);
     * > filter.nodesBy(function(n) {
     * >   return this.degree(n.id) > 0;
     * > }, 'degreeNotNull');
     *
     * @param  {function}             fn      The filter predicate.
     * @param  {?object}              params  The filter options.
     * @param  {?string}              key     The key to identify the filter.
     * @return {sigma.plugins.filter}         Returns the instance.
     */
    this.nodesBy = function(fn, params, key) {
      // Wrap the predicate to be applied on the graph and add it to the chain.
      register('nodes', fn, params, key);

      return this;
    };

    /**
     * This method is used to filter the edges. The method must be called with
     * the predicate, which is a function that takes a node as argument and
     * returns a boolean. It may take an identifier as argument to undo the
     * filter later. The method wraps the predicate into an anonymous function
     * that looks through each edge in the graph. When executed, the anonymous
     * function hides the edges that fail a truth test (predicate). The method
     * adds the anonymous function to the chain of filters. The filter is not
     * executed until the apply() method is called.
     *
     * > var filter = new sigma.plugins.filter(s);
     * > filter.edgesBy(
     * >   function(e, options) {
     * >     return e.size > options.val;
     * >   },
     * >   { val:1 },
     * >   'edgeSize'
     * > );
     *
     * @param  {function}             fn  The filter predicate.
     * @param  {?object}              params  The filter options.
     * @param  {?string}              key The key to identify the filter.
     * @return {sigma.plugins.filter}     Returns the instance.
     */
    this.edgesBy = function(fn, params, key) {
      // Wrap the predicate to be applied on the graph and add it to the chain.
      register('edges', fn, params, key);

      return this;
    };

    /**
     * This method is used to filter the nodes which are not direct connections
     * of a given node. The method must be called with the node identifier. It
     * may take an identifier as argument to undo the filter later. The filter
     * is not executed until the apply() method is called.
     *
     * > var filter = new sigma.plugins.filter(s);
     * > filter.neighborsOf('n0');
     *
     * @param  {number|string}        id  The node id.
     * @param  {?object}              params  The filter options.
     * @param  {?string}              key The key to identify the filter.
     * @return {sigma.plugins.filter}     Returns the instance.
     */
    this.neighborsOf = function(id, params, key) {
      if (typeof id !== 'number' && typeof id !== 'string')
        throw new TypeError('Invalid argument: id is not a string or a number, was ' + id);
      if (typeof id === 'string' && !id.length)
        throw new TypeError('Invalid argument: id is an empty string.');

      // Wrap the predicate to be applied on the graph and add it to the chain.
      register('neighbors', id, params, key);

      return this;
    };

    /**
     * This method is used to execute the chain of filters and to refresh the
     * display.
     *
     * > var filter = new sigma.plugins.filter(s);
     * > filter
     * >   .nodesBy(
     * >     function(n, options) {
     * >       return this.degree(n.id) > options.val;
     * >     },
     * >     { val:0 },
     * >    'degreeGreaterThan'
     * >   )
     * >   .apply();
     *
     * @return {sigma.plugins.filter}      Returns the instance.
     */
    this.apply = function() {
      for (var i = 0, len = _chain.length; i < len; ++i) {
        switch(_chain[i].processor) {
          case 'nodes':
            Processors.nodes(_g, _chain[i].predicate, _chain[i].options);
            break;
          case 'edges':
            Processors.edges(_g, _chain[i].predicate, _chain[i].options);
            break;
          case 'neighbors':
            Processors.neighbors(_g, _chain[i].predicate);
            break;
          case 'undo':
            Processors.undo(_g, _chain[i].predicate);
            break;
          default:
            throw new Error('Unknown processor ' + _chain[i].processor);
        }
      };

      if (_chain[0] && 'undo' === _chain[0].key) {
        _chain.shift();
      }

      if (_s) _s.refresh();

      return this;
    };

    /**
     * This method undoes one or several filters, depending on how it is called.
     *
     * To undo all filters, call "undo" without argument. To undo a specific
     * filter, call it with the key of the filter. To undo multiple filters, call
     * it with an array of keys or multiple arguments, and it will undo each
     * filter, in the same order. The undo is not executed until the apply()
     * method is called. For instance:
     *
     * > var filter = new sigma.plugins.filter(s);
     * > filter
     * >   .nodesBy(function(n) {
     * >     return this.degree(n.id) > 0;
     * >   }, 'degreeNotNull');
     * >   .edgesBy(function(e) {
     * >     return e.size > 1;
     * >   }, 'edgeSize')
     * >   .undo();
     *
     * Other examples:
     * > filter.undo();
     * > filter.undo('myfilter');
     * > filter.undo(['myfilter1', 'myfilter2']);
     * > filter.undo('myfilter1', 'myfilter2');
     *
     * @param  {?(string|array|*string))} v Eventually one key, an array of keys.
     * @return {sigma.plugins.filter}       Returns the instance.
     */
    this.undo = function(v) {
      var q = Object.create(null),
          la = arguments.length;

      // find removable filters
      if (la === 1) {
        if (Object.prototype.toString.call(v) === '[object Array]')
          for (var i = 0, len = v.length; i < len; i++)
            q[v[i]] = true;

        else // 1 filter key
          q[v] = true;

      } else if (la > 1) {
        for (var i = 0; i < la; i++)
          q[arguments[i]] = true;
      }
      else
        this.clear();

      unregister(q);

      _chain.unshift({
        'key': 'undo',
        'processor': 'undo'
      });

      return this;
    };

    /**
     * This method is used to empty the chain of filters.
     * Prefer the undo() method to reset filters.
     *
     * > var filter = new sigma.plugins.filter(s);
     * > filter.clear();
     *
     * @return {sigma.plugins.filter} Returns the instance.
     */
    this.clear = function() {
      _chain.length = 0; // clear the array
      _keysIndex = Object.create(null);
      return this;
    };

    this.kill = function() {
      this.clear();
      delete _instance[_s.id];
      _g = null;
      _s = null;
      return this;
    }

    /**
     * This method will serialize the chain of filters.
     *
     * > var filter = new sigma.plugins.filter(s);
     * > var chain = filter.serialize();
     *
     * @return {object}   The serialized filters.
     */
    this.serialize = function() {
      var copy = cloneChain(_chain);
      for (var i = 0, len = copy.length; i < len; i++) {
        copy[i].predicate = copy[i].predicate.toString().replace(/\s+/g, ' ')
          .replace(/"use strict"; /, '');
      };
      return copy;
    };

    /**
     * This method sets the chain of filters with the specified serialized chain.
     * Warning: predicate strings are executed using `eval()`.
     *
     * > var filter = new sigma.plugins.filter(s);
     * > var chain = [
     * >   {
     * >     key: 'my-filter',
     * >     predicate: function(n) {...},
     * >     processor: 'nodes'
     * >   }, ...
     * > ];
     * > filter.load(chain);
     *
     * @param {array} chain The chain of filters.
     * @return {sigma.plugins.filter} Returns the instance.
     */
    this.load = function(chain) {
      if (chain === undefined)
        throw new TypeError('Missing argument.');

      if (!Array.isArray(chain))
        throw new TypeError('Invalid argument: "chain" is not an array, was ' + chain);

      this.clear();
      var copy = cloneChain(chain);

      for (var i = 0, len = copy.length; i < len; i++) {
        if (copy[i].predicate === undefined)
          throw new TypeError('Missing filter key: "predicate".');

        if (copy[i].processor === undefined)
          throw new TypeError('Missing filter key: "processor".');

        if (copy[i].key != undefined && typeof copy[i].key !== 'string')
          throw new TypeError('Invalid filter key: "key" is not a string, was ' + copy[i].key.toString());

        if (typeof copy[i].predicate === 'string')
          eval(" copy[i].predicate = " +  copy[i].predicate);

        if (typeof copy[i].predicate !== 'function')
          throw new TypeError('Invalid filter key: "predicate" of key "'+ copy[i].key +'" is not a function.');

        if (typeof copy[i].processor !== 'string')
          throw new TypeError('Invalid filter key: "processor" of key "'+ copy[i].key +'" is not a string.');

        if (copy[i].key)
          _keysIndex[copy[i].key] = true;
      };

      _chain = copy;

      return this;
    };

  };



  /**
   * Interface
   * ------------------
   *
   * > var filter = sigma.plugins.filter(s);
   */

  /**
   * @param  {sigma} s The related sigma instance.
   */
  sigma.plugins.filter = function(s) {
    // Create filter if undefined
    if (!_instance[s.id]) {
      _instance[s.id] = new Filter(s);

      // Binding on kill to clear the references
      s.bind('kill', function() {
        sigma.plugins.killFilter(s);
      });
    }
    return _instance[s.id];
  };

  /**
   *  This function kills the filter instance.
   *
   * @param  {sigma} s The related sigma instance.
   */
  sigma.plugins.killFilter = function(s) {
    if (_instance[s.id] instanceof Filter) {
      _instance[s.id].kill();
    }
    delete _instance[s.id];
  };

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.plugins.fullScreen');

  /**
   * Sigma Fullscreen
   * =============================
   *
   * @author Martin de la Taille <https://github.com/Martindelataille>
   * @author Sébastien Heymann <https://github.com/sheymann>
   * @version 0.2
   */

  var _container = null,
      _eventListenerElement = null;

  function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
      if (_container.requestFullscreen) {
        _container.requestFullscreen();
      } else if (_container.msRequestFullscreen) {
        _container.msRequestFullscreen();
      } else if (_container.mozRequestFullScreen) {
        _container.mozRequestFullScreen();
      } else if (_container.webkitRequestFullscreen) {
        _container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  /**
   * This plugin enables the activation of full screen mode by clicking on btn.
   * If btn does not exist, this plugin will leave the full screen mode.
   *
   * @param  {?object} options The configuration. Can contain:
   *         {?string|DOMElement} options.container A container object or id,
   *                              otherwise sigma container is used.
   *         {?string} options.btnId A btn id.
   */
  function fullScreen(options) {
    var o = options || {};

    if (o.container) {
      if (typeof o.container === 'object') {
        _container = o.container;
      }
      else {
        _container = document.getElementById(o.container)
      }
    }
    else {
      _container = this.container;
    }

    _eventListenerElement = null;

    // Get the btn element reference from the DOM
    if(o.btnId) {
      _eventListenerElement = document.getElementById(o.btnId);
      _eventListenerElement.removeEventListener("click", toggleFullScreen);
      _eventListenerElement.addEventListener("click", toggleFullScreen);
    }
    else {
      toggleFullScreen();
    }
  };

  /**
   *  This function kills the fullScreen instance.
   */
  function killFullScreen() {
    toggleFullScreen();
    _container = null;

    if (_eventListenerElement)
      _eventListenerElement.removeEventListener("click", toggleFullScreen);
  };

  sigma.plugins.fullScreen = fullScreen;
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  sigma.utils.pkg('sigma.plugins');

  sigma.plugins.generators = {}; // collection of generators

  function isNumber(value) {
    // source: is.js
    // NaN is number :)
    return value === value && Object.prototype.toString.call(value) === '[object Number]';
  };

  function isObject(value) {
    // source: is.js
    return typeof value === 'object' && !!value;
  };

  /**
   * Generates a random graph.
   *
   * @param  {object} options
   * @param  {number} options.nbNodes The number of nodes.
   * @param  {number} options.nbEdges The number of edges.
   * @return {object}         A graph object that can be read by sigma.classes.graph
   */
  sigma.plugins.generators.random = function(options) {
    if (!options)
      throw new Error('Missing argument: options');
    if (!isObject(options))
      throw new TypeError('Invalid argument: options is not an object, was ' + options);
    if (!isNumber(options.nbNodes) || options.nbNodes < 1)
      throw new TypeError('Invalid argument: options.nbNodes is not a positive number, was ' + options.nbNodes);
    if (!isNumber(options.nbEdges) || options.nbEdges < 1)
      throw new TypeError('Invalid argument: options.nbEdges is not a number, was ' + options.nbEdges);

    var i,
        N = options.nbNodes,
        E = options.nbEdges,
        g = {
          nodes: [],
          edges: []
        };

    // Generate a random graph:
    for (i = 0; i < N; i++)
      g.nodes.push({
        id: 'n' + i,
        label: 'Node ' + i,
        x: Math.random(),
        y: Math.random(),
        size: 1
      });

    for (i = 0; i < E; i++)
      g.edges.push({
        id: 'e' + i,
        label: 'Edge ' + i,
        source: 'n' + (Math.random() * N | 0),
        target: 'n' + (Math.random() * N | 0)
      });

    return g;
  };

  /**
   * Generates a simple balanced tree.
   * Source: https://github.com/gka/randomgraph.js (license: public domain)
   *
   * @param  {object} options
   * @param  {number} options.nbChildren The number of children each node has.
   * @param  {number} options.height     The height of the tree.
   * @return {object}   A graph object that can be read by sigma.classes.graph
   */
  sigma.plugins.generators.balancedTree = function(options) {
    if (!options)
      throw new Error('Missing argument: options');
    if (!isObject(options))
      throw new TypeError('Invalid argument: options is not an object, was ' + options);
    if (!isNumber(options.nbChildren) || options.nbChildren < 1)
      throw new TypeError('Invalid argument: options.nbChildren is not a positive number, was ' + options.nbChildren);
    if (!isNumber(options.height) || options.height < 1)
      throw new TypeError('Invalid argument: options.height is not a positive number, was ' + options.height);

    var v = 0,
        m = 0,
        R = options.nbChildren,
        H = options.height,
        graph = {
          nodes: [{
            id: 'n0',
            label: 'Node 0',
            x: Math.random(),
            y: Math.random(),
            size: 1,
            index: 0
          }],
          edges: []
        },
        newLeaves = [],
        i, j, height, node, leaves;

    for (i = 0; i < R; i++) {
      node = {
        id: 'n' + (++v),
        label: 'Node '+ v,
        x: Math.random(),
        y: Math.random(),
        size: 1,
        index: (v - 1)
      };
      graph.nodes.push(node);
      newLeaves.push(node);
      graph.edges.push({
        id: 'e' + (m++),
        label: 'Edge ' + m,
        source: 'n0',
        target: 'n' + v
      });
    }

    for (height = 1; height < H; height++) {
      leaves = newLeaves;
      newLeaves = [];
      for (j = 0; j < leaves.length; j++) {
        for (i = 0; i < R; i++) {
          node = {
            id: 'n' + (++v),
            label: 'Node '+ v,
            x: Math.random(),
            y: Math.random(),
            size: 1,
            index: (v - 1)
          };
          newLeaves.push(node);
          graph.nodes.push(node);
          graph.edges.push({
            id: 'e' + (m++),
            label: 'Edge ' + m,
            source: 'n' + leaves[j].index,
            target: 'n' + v
          });
        }
      }
    }
    return graph;
  };

  /**
   * Generates an Erdős–Rényi graph. Call it with options (n,p) or (n,m).
   * Source: https://github.com/gka/randomgraph.js (license: public domain)
   *
   * @param  {object}  options
   * @param  {number}  options.nbNodes The number of nodes.
   * @param  {?number} options.p The probability [0..1] of a edge between any two nodes.
   * @param  {?number} options.nbEdges The number of edges.
   * @return {object}    A graph object that can be read by sigma.classes.graph
   */
  sigma.plugins.generators.erdosRenyi = function(options) {
    if (!options)
      throw new Error('Missing argument: options');
    if (!isObject(options))
      throw new TypeError('Invalid argument: options is not an object, was ' + options);
    if (!isNumber(options.nbNodes) || options.nbNodes < 1)
      throw new TypeError('Invalid argument: options.nbNodes is not a positive number, was ' + options.nbNodes);
    if (options.nbNodes < 3)
      throw new TypeError('Invalid argument: options.nbNodes is smaller than 3, was ' + options.nbNodes);
    if ('nbEdges' in options && 'p' in options)
      throw new TypeError('Invalid argument: choose between options.nbEdges and options.p');

    var graph = { nodes: [], edges: [] },
      edge,
      i,
      j,
      k = 0,
      N = options.nbNodes,
      P = options.p;

    if (options.p >= 0) {
      if (!isNumber(options.p) || options.p < 0)
        throw new TypeError('Invalid argument: options.p is not a positive number, was ' + options.p);

      for (i = 0; i < N; i++) {
        graph.nodes.push({
          id: 'n' + i,
          label: 'Node '+ i,
          x: Math.random(),
          y: Math.random(),
          size: 1
        });
        for (j = 0; j < i; j++) {
          if (Math.random() < P) {
            graph.edges.push({
              id: 'e' + (k++),
              label: 'Edge ' + k,
              source: 'n' + i,
              target: 'n' + j
            });
          }
        }
      }
    }
    else {
      if (!isNumber(options.nbEdges) || options.nbEdges < 1)
        throw new TypeError('Invalid argument: options.nbEdges is not a positive number, was ' + options.nbEdges);

      var tmpEdges = [],
        M = options.nbEdges,
        k;

      for (i = 0; i < N; i++) {
        graph.nodes.push({
          id: 'n' + i,
          label: 'Node '+ i,
          x: Math.random(),
          y: Math.random(),
          size: 1
        });
        for (j = i + 1; j < N; j++) {
          tmpEdges.push({
            source: 'n' + i,
            target: 'n' + j
          });
        }
      }
      // pick m random edges from tmpEdges
      k = tmpEdges.length - 1;
      for (i = 0; i < M; i++) {
        edge = tmpEdges.splice(Math.floor(Math.random() * k), 1)[0];
        edge.id = 'e' + i;
        edge.label = 'Edge ' + i;
        graph.edges.push(edge);
        k--;
      }
    }
    return graph;
  };

  /**
   * Generates a Barabási–Albert graph.
   * Source: https://github.com/gka/randomgraph.js (license: public domain)
   *
   * @param  {object} options
   * @param  {number} options.nbNodes The total number of nodes  N  > 0
   * @param  {number} options.m0      m0 > 0 && m0 <  N
   * @param  {number} options.m       M  > 0 && M  <= m0
   * @return {object}   A graph object that can be read by sigma.classes.graph
   */
  sigma.plugins.generators.barabasiAlbert = function(options) {
    if (!options)
      throw new Error('Missing argument: options');
    if (!isObject(options))
      throw new TypeError('Invalid argument: options is not an object, was ' + options);
    if (!isNumber(options.nbNodes) || options.nbNodes < 1)
      throw new TypeError('Invalid argument: options.nbNodes is not a positive number, was ' + options.nbNodes);
    if (options.nbNodes < 3)
      throw new TypeError('Invalid argument: options.nbNodes is smaller than 3, was ' + options.nbNodes);
    if (!isNumber(options.m0) || options.m0 <= 0)
      throw new TypeError('Invalid argument: options.m0 is not a positive number, was ' + options.m0);
    if (!isNumber(options.m) || options.m <= 0)
      throw new TypeError('Invalid argument: options.m is not a positive number, was ' + options.m);
    if (options.m0 >= options.nbNode)
      throw new TypeError('Invalid argument: options.m0 is greater than options.nbNodes, was ' + options.m0);
    if (options.m > options.m0)
      throw new TypeError('Invalid argument: options.m is strictly greater than options.m0, was ' + options.m);

    var graph = { nodes: [], edges: [] },
      edge_lut = {},
      degrees = [],
      i, j, edge, sum, s, m, r, p,
      k = 0,
      N = options.nbNodes,
      m0 = options.m0,
      M = options.m;

    // creating m0 nodes
    for (i = 0; i < m0; i++) {
      graph.nodes.push({
        id: 'n' + i,
        label: 'node '+ i,
        x: Math.random(),
        y: Math.random(),
        size: 1
      });
      degrees[i] = 0;
    }
    // Linking every node with each other (no self-loops)
    for (i = 0; i < m0; i++) {
      for (j = i + 1; j < m0; j++) {
        edge = {
          id: 'e' + (k++),
          label: 'Edge ' + k,
          source: 'n' + i,
          target: 'n' + j
        };
        edge_lut[edge.source + '-' + edge.target] = edge;
        graph.edges.push(edge);
        degrees[i]++;
        degrees[j]++;
      }
    }
    // Adding N - m0 nodes, each with M edges
    for (i = m0; i < N; i++) {
      graph.nodes.push({
        id: 'n' + i,
        label: 'node '+ i,
        x: Math.random(),
        y: Math.random(),
        size: 1
      });
      degrees[i] = 0;
      sum = 0;  // sum of all nodes degrees
      for (j = 0; j < i; j++) sum += degrees[j];
      s = 0;
      for (m = 0; m < M; m++) {
        r = Math.random();
        p = 0;
        for (j = 0; j < i; j++) {
          if (edge_lut[i + '-' + j] || edge_lut[j + '-' + i]) continue;
          if (i == 1) p = 1;
          else {
            p += degrees[j] / sum + s / (i - m);
          }

          if (r <= p) {
            s += degrees[j] / sum;
            edge = {
              id: 'e' + (k++),
              label: 'Edge ' + k,
              source: 'n' + i,
              target: 'n' + j
            };
            edge_lut[edge.source + '-' + edge.target] = edge;
            graph.edges.push(edge);
            degrees[i]++;
            degrees[j]++;
            break;
          }
        }
      }
    }
    return graph;
  };

  /**
   * Generates a Watts-Strogatz Small World graph.
   * Call it with options alpha or beta to run the corresponding model.
   * Source: https://github.com/gka/randomgraph.js (license: public domain)
   *
   * @param  {object}  options
   * @param  {number}  options.nbNodes The number of nodes.
   * @param  {number}  options.k       The mean degree of nodes (even integer).
   * @param  {?number} options.alpha   The rewiring probability [0..1].
   * @param  {?number} options.beta    The rewiring probability [0..1].
   * @return {object}    A graph object that can be read by sigma.classes.graph
   */
  sigma.plugins.generators.wattsStrogatz = function(options) {
    if (!options)
      throw new Error('Missing argument: options');
    if (!isObject(options))
      throw new TypeError('Invalid argument: options is not an object, was ' + options);
    if (!isNumber(options.nbNodes) || options.nbNodes < 1)
      throw new TypeError('Invalid argument: options.nbNodes is not a positive number, was ' + options.nbNodes);
    if (options.nbNodes < 3)
      throw new TypeError('Invalid argument: options.nbNodes is smaller than 3, was ' + options.nbNodes);
    if (!isNumber(options.k) || (options.k % 2) != 0)
      throw new TypeError('Invalid argument: options.k is not an even integer, was ' + options.k);

    var graph = { nodes: [], edges: [] },
      i, j, k = 0, edge,
      edge_lut = {},
      N = options.nbNodes,
      K = options.k;

    function calculateRij(i, j) {
      if (i == j || edge_lut[i + '-' + j]) return 0;
      var mij = calculatemij(i, j);
      if (mij >= K) return 1;
      if (mij === 0) return p;
      return Math.pow(mij / K, options.alpha) * (1 - p) + p;
    };

    function calculatemij(i, j) {
      var mij = 0, l;
      for (l = 0; l < N; l++) {
        if (l != i && l != j && edge_lut[i + '-' + l] && edge_lut[j + '-' + l]) {
          mij++;
        }
      }
      return mij;
    };

    if ('alpha' in options) {
      if (!isNumber(options.alpha) || options.alpha < 0 || options.alpha > 1)
        throw new TypeError('Invalid argument: options.alpha is not a number between [0,1], was ' + options.alpha);

      var p = Math.pow(10, -10),
        ec = 0,
        ids = [],
        nk_half = N * K / 2,
        Rij, sumRij, r, pij;

      for (i = 0; i < N; i++) {
        graph.nodes.push({
          id: 'n' + i,
          label: 'Node '+ i,
          x: Math.random(),
          y: Math.random(),
          size: 1
        });
        // create a latice ring structure
        edge = {
          id: 'e' + (k++),
          label: 'Edge '+ k,
          source: 'n' + i,
          target: 'n' + ((i + 1) % N)
        };
        edge_lut[edge.source + '-' + edge.target] = edge;
        graph.edges.push(edge);
        ec++;
      }
      // Creating N * K / 2 edges
      while (ec < nk_half) {
        for (i = 0; i < N; i++) {
          ids.push(i);
        }
        while (ec < nk_half && ids.length > 0) {
          i = ids.splice(Math.floor(Math.random() * ids.length), 1)[0];
          Rij = [];
          sumRij = 0;
          for (j = 0; j < N; j++) {
            Rij[j] = calculateRij(i, j);
            sumRij += Rij[j];
          }
          r = Math.random();
          pij = 0;
          for (j = 0; j < N; j++) {
            if (i != j) {
              pij += Rij[j] / sumRij;
              if (r <= pij) {
                edge = {
                  id: 'e' + (k++),
                  label: 'Edge '+ k,
                  source: 'n' + i,
                  target: 'n' + j
                };
                graph.edges.push(edge);
                ec++;
                edge_lut[edge.source + '-' + edge.target] = edge;
              }
            }
          }
        }
      }
    }
    else { // beta
      if (!isNumber(options.beta) || options.beta < 0 || options.beta > 1)
        throw new TypeError('Invalid argument: options.beta is not a number between [0,1], was ' + options.beta);

      var t;

      K = K>>1; // divide by two
      for (i = 0; i < N; i++) {
        graph.nodes.push({
          id: 'n' + i,
          label: 'node '+ i,
          x: Math.random(),
          y: Math.random(),
          size: 1
        });
        // create a latice ring structure
        for (j = 1; j <= K; j++) {
          edge = {
            id: 'e' + (k++),
            label: 'Edge '+ k,
            source: 'n' + i,
            target: 'n' + ((i + j) % N)
          };
          edge_lut[edge.source + '-' + edge.target] = edge;
          graph.edges.push(edge);
        }
      }
      // rewiring of edges
      for (i = 0; i < N; i++) {
        for (j = 1; j <= K; j++) { // for every pair of nodes
          if (Math.random() <= options.beta) {
            do {
              t = Math.floor(Math.random() * (N - 1));
            }
            while (t == i || edge_lut['n'+ i + '-n' + t]);

            var j_ = (i + j) % N;
            edge_lut['n'+ i + '-n' + j_].target = 'n'+ t; // rewire
            edge_lut['n'+ i + '-n' + t] = edge_lut['n'+ i + '-n' + j_];
            delete edge_lut['n'+ i + '-n' + j_];
          }
        }
      }
    }

    return graph;
  };

  /**
   * Generates a path.
   * Source: https://github.com/anvaka/ngraph.generators (license: MIT)
   *
   * @param  {number} length The number of nodes.
   * @return {object}        A graph object that can be read by sigma.classes.graph
   */
  sigma.plugins.generators.path = function(length) {
    if (!length || length < 0) {
      throw new TypeError('Invalid argument: "length" is not a positive number, was ' + length);
    }

    var graph = {
      nodes: [{
        id: 'n0',
        label: 'Node 0',
        x: Math.random(),
        y: Math.random(),
        size: 1
      }],
      edges: []
    };

    for (var i = 1; i < length; ++i) {
      graph.nodes.push({
        id: 'n' + i,
        label: 'Node ' + i,
        x: Math.random(),
        y: Math.random(),
        size: 1
      });
      graph.edges.push({
        id: 'e' + i,
        label: 'Edge '+ i,
        source: 'n' + (i - 1),
        target: 'n' + i
      });
    }
    return graph;
  };

  /**
   * Generates a grid with n rows and m columns.
   * Source: https://github.com/anvaka/ngraph.generators (license: MIT)
   *
   * @param  {Number} n The number of rows in the graph.
   * @param  {Number} m The number of columns in the graph.
   * @return {object}   A graph object that can be read by sigma.classes.graph
   */
  sigma.plugins.generators.grid = function(n, m) {
    if (n < 1)
      throw new TypeError('Invalid argument: "n" is not a positive integer, was ' + n);
    if (m < 1)
      throw new TypeError('Invalid argument: "m" is not a positive integer, was ' + m);

    var graph = { nodes: [], edges: [] },
      i,
      j,
      k = 0,
      nodeids = [],
      source,
      target;

    nodeids.length = n * m;

    if (n === 1 && m === 1) {
      graph.nodes.push({
        id: 'n0',
        label: 'Node 0',
        x: Math.random(),
        y: Math.random(),
        size: 1
      });
      return graph;
    }

    for (i = 0; i < n; ++i) {
      for (j = 0; j < m; ++j) {
        source = i + j * n;
        if (!nodeids[source]) {
          graph.nodes.push({
            id: 'n' + source,
            label: 'Node ' + source,
            x: Math.random(),
            y: Math.random(),
            size: 1
          });
          nodeids[source] = true;
        }

        if (i > 0) {
          target = i - 1 + j * n;
          if (!nodeids[target]) {
            graph.nodes.push({
              id: 'n' + target,
              label: 'Node ' + target,
              x: Math.random(),
              y: Math.random(),
              size: 1
            });
            nodeids[target] = true;
          }
          graph.edges.push({
            id: 'e' + (k++),
            label: 'Edge '+ k,
            source: 'n' + source,
            target: 'n' + target
          });
        }
        if (j > 0) {
          target = i + (j - 1) * n;
          if (!nodeids[target]) {
            graph.nodes.push({
              id: 'n' + target,
              label: 'Node ' + target,
              x: Math.random(),
              y: Math.random(),
              size: 1
            });
            nodeids[target] = true;
          }
          graph.edges.push({
            id: 'e' + (k++),
            label: 'Edge '+ k,
            source: 'n' + source,
            target: 'n' + target
          });
        }
      }
    }

    return graph;
  };

}).call(this);

;(function(undefined) {
  'use strict';

  /**
   * Sigma Keyboard Utility
   * ================================
   *
   * The aim of this plugin is to bind any function to a combinaison of keys,
   * and to control the camera zoom and position with the keyboard.
   * Use (Alt +) Arrow to move in any direction.
   * Use (Alt +) Space + Top/Bottom Arrow to zoom in/out.
   *
   * Author: Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * Version: 0.0.1
   */

  if (typeof sigma === 'undefined')
    throw 'sigma.plugins.keyboard: sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');

  /**
   * The default settings.
   *
   */
  var settings = {
    // {number} Camera displacement in pixels
    displacement: 100,
    // {number} Override the `mouseZoomDuration` setting of Sigma
    duration: 200,
    // {number} Override the `zoomingRatio` setting of Sigma
    zoomingRatio: 1.7,
    // {boolean} Set focus on the visualization container when the plugin is
    // initialized and when the mouse is over it. The container must have the
    // focus to enable keyboard events.
    autofocus: true,
    // {number} Tab index of the graph container provided if no `tabindex`
    // attribute is found
    tabIndex: -1
  };

  var _instance = {};

  /**
   * Keyboard Object
   * ------------------
   *
   * @param  {sigma}   s       The related sigma instance.
   * @param  {object} renderer The renderer to attach keyboard events.
   * @param  {object} params   The options related to the object.
   */
  function Keyboard(s, renderer, params) {
    params = sigma.utils.extend(params, settings);
    params.zoomingRatio = params.zoomingRatio || s.settings('zoomingRatio');
    params.duration = params.duration || s.settings('mouseZoomDuration');

    this.domElt = renderer.container;
    this.keys = {};
    this.currentEvents = null;

    var self = this;

    sigma.classes.dispatcher.extend(this);

    // needed to provide focus to the graph container
    // see http://www.dbp-consulting.com/tutorials/canvas/CanvasKeyEvents.html
    this.domElt.tabIndex = params.tabIndex;


    function camera(o) {
      // Normalize ratio:
      var ratio = Math.max(
        s.settings('zoomMin'),
        Math.min(s.settings('zoomMax'), s.camera.ratio * (o.ratio || 1))
      );

      sigma.misc.animation.camera(
        s.camera,
        {
          x: s.camera.x + (o.x || 0),
          y: s.camera.y + (o.y || 0),
          ratio: ratio
        },
        { duration: o.duration}
      );
    }

    function moveLeft() {
      camera({
        x: - params.displacement,
        duration: params.duration
      });
    };

    function moveTop() {
      camera({
        y: - params.displacement,
        duration: params.duration
      });
    };

    function moveRight() {
      camera({
        x: params.displacement,
        duration: params.duration
      });
    };

    function moveDown() {
      camera({
        y: params.displacement,
        duration: params.duration
      });
    };

    function zoomIn() {
      camera({
        ratio: 1 / params.zoomingRatio,
        duration: params.duration
      });
    };

    function zoomOut() {
      camera({
        ratio: params.zoomingRatio,
        duration: params.duration
      });
    };

    function bindAll() {
      if (params.autofocus) {
        self.domElt.focus();
        self.domElt.addEventListener('mouseover', self.focus);
        self.domElt.addEventListener('mouseout', self.blur);
      }

      self.domElt.addEventListener('keydown', self.keyDown);
      self.domElt.addEventListener('keyup', self.keyUp);

      self.bind('37 18+37', moveLeft); // (ALT +) LEFT ARROW
      self.bind('38 18+38', moveTop); // (ALT +) TOP ARROW
      self.bind('39 18+39', moveRight); // (ALT +) RIGHT ARROW
      self.bind('40 18+40', moveDown); // (ALT +) BOTTOM ARROW

      self.bind('32+38 18+32+38', zoomIn); // (ALT +) SPACE + TOP ARROW
      self.bind('32+40 18+32+40', zoomOut); // (ALT +) SPACE + BOTTOM ARROW
    }

    function unbindAll() {
      self.domElt.removeEventListener('mouseover', self.focus);
      self.domElt.removeEventListener('mouseout', self.blur);
      self.domElt.removeEventListener('keydown', self.keyDown);
      self.domElt.removeEventListener('keyup', self.keyUp);

      self.unbind();
    }

    this.keyDown = function(event) {
      if (event.which !== 9 && event.which !== 18 && event.which !== 20 && !self.keys[event.which]) {
        // Do nothing on Tabbing, Alt and Capslock because keyUp won't be triggered
        self.keys[event.which] = true;
        self.currentEvents = Object.keys(self.keys).join('+');
        self.dispatchEvent(self.currentEvents);
      }
    }

    this.keyUp = function(event) {
      delete self.keys[event.which];
      self.currentEvents = null;
    }

    this.focus = function(event) {
      self.domElt.focus();
      return true;
    }

    this.blur = function(event) {
      self.domElt.blur();
      self.keys = {};
      self.currentEvents = null;
      return true;
    }

    this.kill = function() {
      unbindAll();
      self.domElt = null;
      self.keys = {};
      self.currentEvents = null;
    }

    bindAll();
  };


  /**
   * Interface
   * ------------------
   */

  /**
   * This function initializes the Keyboard for a specified Sigma instance.
   *
   * Usage:
   *   var kbd = sigma.plugins.keyboard(s, s.renderers[0]);
   *   kbd.bind('32', function() { console.log('"Space" key pressed'); });
   *
   * @param  {sigma}  s        The related sigma instance.
   * @param  {object} renderer The renderer to attach keyboard events.
   * @param  {object} options  The options related to the object.
   */
  sigma.plugins.keyboard = function(s, renderer, options) {
    // Create object if undefined
    if (!_instance[s.id]) {
      _instance[s.id] = new Keyboard(s, renderer, options);

      s.bind('kill', function() {
        sigma.plugins.killKeyboard(s);
      });
    }

    return _instance[s.id];
  };

  /**
   * This function kills the Keyboard instance.
   */
  sigma.plugins.killKeyboard = function(s) {
    if (_instance[s.id] instanceof Keyboard) {
      _instance[s.id].kill();
      delete _instance[s.id];
    }
  };

}).call(this);

/**
 * Sigma Lasso
 * =============================
 *
 * @author Florent Schildknecht <florent.schildknecht@gmail.com> (Florent Schildknecht)
 * @version 0.0.2
 */
;(function (undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');

   var _body = undefined,
       _instances = {};

  /**
   * Lasso Object
   * ------------------
   * @param  {sigma}                                  sigmaInstance The related sigma instance.
   * @param  {renderer} renderer                      The sigma instance renderer.
   * @param  {sigma.classes.configurable} settings    A settings class
   */
  function Lasso (sigmaInstance, renderer, settings) {
    // Lasso is also an event dispatcher
    sigma.classes.dispatcher.extend(this);

    // A quick hardcoded rule to prevent people from using this plugin with the
    // WebGL renderer (which is impossible at the moment):
    if (
      sigma.renderers.webgl &&
      renderer instanceof sigma.renderers.webgl
    )
      throw new Error(
        'The sigma.plugins.lasso is not compatible with the WebGL renderer'
      );

    this.sigmaInstance = sigmaInstance;
    this.renderer = renderer;
    this.drawingCanvas = undefined;
    this.drawingContext = undefined;
    this.drewPoints = [];
    this.selectedNodes = [];
    this.isActive = false;
    this.isDrawing = false;

    _body = document.body;

    // Extends default settings
    this.settings = new sigma.classes.configurable({
      'strokeStyle': 'black',
      'lineWidth': 2,
      'fillWhileDrawing': false,
      'fillStyle': 'rgba(200, 200, 200, 0.25)',
      'cursor': 'crosshair'
     }, settings || {});
  };

  /**
   * This method is used to destroy the lasso.
   *
   * > var lasso = new sigma.plugins.lasso(sigmaInstance);
   * > lasso.clear();
   *
   * @return {sigma.plugins.lasso} Returns the instance.
   */
  Lasso.prototype.clear = function () {
    this.deactivate();

    this.sigmaInstance = undefined;
    this.renderer = undefined;

    return this;
  };

  // Lasso.prototype.getSigmaInstance = function () {
  //   return this.sigmaInstance;
  // }

  /**
   * This method is used to activate the lasso mode.
   *
   * > var lasso = new sigma.plugins.lasso(sigmaInstance);
   * > lasso.activate();
   *
   * @return {sigma.plugins.lasso} Returns the instance.
   */
  Lasso.prototype.activate = function () {
    if (this.sigmaInstance && !this.isActive) {
      this.isActive = true;

      // Add a new background layout canvas to draw the path on
      if (!this.renderer.domElements['lasso']) {
        this.renderer.initDOM('canvas', 'lasso');
        this.drawingCanvas = this.renderer.domElements['lasso'];

        this.drawingCanvas.width = this.renderer.container.offsetWidth;
        this.drawingCanvas.height = this.renderer.container.offsetHeight;
        this.renderer.container.appendChild(this.drawingCanvas);
        this.drawingContext = this.drawingCanvas.getContext('2d');
        this.drawingCanvas.style.cursor = this.settings('cursor');
      }

      _bindAll.apply(this);
    }

    return this;
  };

  /**
   * This method is used to deactivate the lasso mode.
   *
   * > var lasso = new sigma.plugins.lasso(sigmaInstance);
   * > lasso.deactivate();
   *
   * @return {sigma.plugins.lasso} Returns the instance.
   */
  Lasso.prototype.deactivate = function () {
    if (this.sigmaInstance && this.isActive) {
      this.isActive = false;
      this.isDrawing = false;

      _unbindAll.apply(this);

      if (this.renderer.domElements['lasso']) {
        this.renderer.container.removeChild(this.renderer.domElements['lasso']);
        delete this.renderer.domElements['lasso'];
        this.drawingCanvas.style.cursor = '';
        this.drawingCanvas = undefined;
        this.drawingContext = undefined;
        this.drewPoints = [];
      }
    }

    return this;
  };

  /**
   * This method is used to bind all events of the lasso mode.
   *
   * > var lasso = new sigma.plugins.lasso(sigmaInstance);
   * > lasso.activate();
   *
   * @return {sigma.plugins.lasso} Returns the instance.
   */
  var _bindAll = function () {
    // Mouse events
    this.drawingCanvas.addEventListener('mousedown', onDrawingStart.bind(this));
    _body.addEventListener('mousemove', onDrawing.bind(this));
    _body.addEventListener('mouseup', onDrawingEnd.bind(this));
    // Touch events
    this.drawingCanvas.addEventListener('touchstart', onDrawingStart.bind(this));
    _body.addEventListener('touchmove', onDrawing.bind(this));
    _body.addEventListener('touchcancel', onDrawingEnd.bind(this));
    _body.addEventListener('touchleave', onDrawingEnd.bind(this));
    _body.addEventListener('touchend', onDrawingEnd.bind(this));
  };

  /**
   * This method is used to unbind all events of the lasso mode.
   *
   * > var lasso = new sigma.plugins.lasso(sigmaInstance);
   * > lasso.activate();
   *
   * @return {sigma.plugins.lasso} Returns the instance.
   */
  var _unbindAll = function () {
    // Mouse events
    this.drawingCanvas.removeEventListener('mousedown', onDrawingStart.bind(this));
    _body.removeEventListener('mousemove', onDrawing.bind(this));
    _body.removeEventListener('mouseup', onDrawingEnd.bind(this));
    // Touch events
    this.drawingCanvas.removeEventListener('touchstart', onDrawingStart.bind(this));
    this.drawingCanvas.removeEventListener('touchmove', onDrawing.bind(this));
    _body.removeEventListener('touchcancel', onDrawingEnd.bind(this));
    _body.removeEventListener('touchleave', onDrawingEnd.bind(this));
    _body.removeEventListener('touchend', onDrawingEnd.bind(this));
  };

  /**
   * This method is used to retrieve the previously selected nodes
   *
   * > var lasso = new sigma.plugins.lasso(sigmaInstance);
   * > lasso.getSelectedNodes();
   *
   * @return {array} Returns an array of nodes.
   */
  Lasso.prototype.getSelectedNodes = function () {
    return this.selectedNodes;
  };

  function onDrawingStart (event) {
    var drawingRectangle = this.drawingCanvas.getBoundingClientRect();

    if (this.isActive) {
      this.isDrawing = true;
      this.drewPoints = [];
      this.selectedNodes = [];

      this.sigmaInstance.refresh();

      this.drewPoints.push({
        x: event.clientX - drawingRectangle.left,
        y: event.clientY - drawingRectangle.top
      });

      this.drawingCanvas.style.cursor = this.settings('cursor');

      event.stopPropagation();
    }
  }

  function onDrawing (event) {
    if (this.isActive && this.isDrawing) {
      var x = 0,
          y = 0,
          drawingRectangle = this.drawingCanvas.getBoundingClientRect();
      switch (event.type) {
        case 'touchmove':
          x = event.touches[0].clientX;
          y = event.touches[0].clientY;
          break;
        default:
          x = event.clientX;
          y = event.clientY;
          break;
      }
      this.drewPoints.push({
        x: x - drawingRectangle.left,
        y: y - drawingRectangle.top
      });

      // Drawing styles
      this.drawingContext.lineWidth = this.settings('lineWidth');
      this.drawingContext.strokeStyle = this.settings('strokeStyle');
      this.drawingContext.fillStyle = this.settings('fillStyle');
      this.drawingContext.lineJoin = 'round';
      this.drawingContext.lineCap = 'round';

      // Clear the canvas
      this.drawingContext.clearRect(0, 0, this.drawingContext.canvas.width, this.drawingContext.canvas.height);

      // Redraw the complete path for a smoother effect
      // Even smoother with quadratic curves
      var sourcePoint = this.drewPoints[0],
          destinationPoint = this.drewPoints[1],
          pointsLength = this.drewPoints.length,
          getMiddlePointCoordinates = function (firstPoint, secondPoint) {
            return {
              x: firstPoint.x + (secondPoint.x - firstPoint.x) / 2,
              y: firstPoint.y + (secondPoint.y - firstPoint.y) / 2
            };
          };

      this.drawingContext.beginPath();
      this.drawingContext.moveTo(sourcePoint.x, sourcePoint.y);

      for (var i = 1; i < pointsLength; i++) {
        var middlePoint = getMiddlePointCoordinates(sourcePoint, destinationPoint);
        // this.drawingContext.lineTo(this.drewPoints[i].x, this.drewPoints[i].y);
        this.drawingContext.quadraticCurveTo(sourcePoint.x, sourcePoint.y, middlePoint.x, middlePoint.y);
        sourcePoint = this.drewPoints[i];
        destinationPoint = this.drewPoints[i+1];
      }

      this.drawingContext.lineTo(sourcePoint.x, sourcePoint.y);
      this.drawingContext.stroke();

      if (this.settings('fillWhileDrawing')) {
        this.drawingContext.fill();
      }

      event.stopPropagation();
    }
  }

  function onDrawingEnd (event) {
    if (this.isActive && this.isDrawing) {
      this.isDrawing = false;

      // Select the nodes inside the path
      var nodes = this.renderer.nodesOnScreen,
        nodesLength = nodes.length,
        i = 0,
        prefix = this.renderer.options.prefix || '';

      // Loop on all nodes and check if they are in the path
      while (nodesLength--) {
        var node = nodes[nodesLength],
            x = node[prefix + 'x'],
            y = node[prefix + 'y'];

        if (this.drawingContext.isPointInPath(x, y) && !node.hidden) {
          this.selectedNodes.push(node);
        }
      }

      // Dispatch event with selected nodes
      this.dispatchEvent('selectedNodes', this.selectedNodes);

      // Clear the drawing canvas
      this.drawingContext.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);

      this.drawingCanvas.style.cursor = this.settings('cursor');

      event.stopPropagation();
    }
  }

  /**
   * @param  {sigma}                                  sigmaInstance The related sigma instance.
   * @param  {renderer} renderer                      The sigma instance renderer.
   * @param  {sigma.classes.configurable} settings    A settings class
   *
   * @return {sigma.plugins.lasso} Returns the instance
   */
  sigma.plugins.lasso = function (sigmaInstance, renderer, settings) {
    // Create lasso if undefined
    if (!_instances[sigmaInstance.id]) {
      _instances[sigmaInstance.id] = new Lasso(sigmaInstance, renderer, settings);
    }

    // Listen for sigmaInstance kill event, and remove the lasso isntance
    sigmaInstance.bind('kill', function () {
      if (_instances[sigmaInstance.id] instanceof Lasso) {
        _instances[sigmaInstance.id].clear();
        delete _instances[sigmaInstance.id];
      }
    });

    return _instances[sigmaInstance.id];
  };

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  if (typeof L === 'undefined')
    console.warn('Include leaflet to use the leaflet plugin for sigma.');

  // Initialize package:
  sigma.utils.pkg('sigma.plugins.leaflet');


  /**
   * Create a new MouseEvent object with the same properties as the given
   * event object.
   *
   * @param  {MouseEvent} e
   * @return {MouseEvent}
   */
  function cloneMouseEvent(e) {
    // http://stackoverflow.com/a/12752970/738167
    // It doesn't handle WheelEvent.
    var evt = document.createEvent("MouseEvent");
    evt.initMouseEvent(e.type, e.canBubble, e.cancelable, e.view, e.detail, e.screenX,
      e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
      e.button, e.relatedTarget);
    return evt;
  }

  /**
   * Return true if the node has latitude and longitude coordinates.
   *
   * @param  {object} node
   * @return {boolean}
   */
  function hasNodeGeoCoordinates(node) {
    return typeof node.lat != 'undefined' && typeof node.lng != 'undefined' &&
      typeof node.lat === 'number' && typeof node.lng === 'number';
  }

  // Index of the nodes that have geo coordinates
  var _geoNodesIndex = new sigma.utils.map();

  /**
   * Attach methods to the graph to keep indexes updated.
   * ------------------
   */

  // Index the node after its insertion in the graph if it has geo coordinates.
  sigma.classes.graph.attach(
    'addNode',
    'sigma.plugins.leaflet.addNode',
    function(n) {
      if (hasNodeGeoCoordinates(n)) {
        _geoNodesIndex.set(n.id, this.nodesIndex.get(n.id));
      }
    }
  );

  // Deindex the node before its deletion from the graph.
  sigma.classes.graph.attachBefore(
    'dropNode',
    'sigma.plugins.leaflet.dropNode',
    function(id) {
      _geoNodesIndex.delete(id);
    }
  );

  // Deindex all nodes before the graph is cleared.
  sigma.classes.graph.attachBefore(
    'clear',
    'sigma.plugins.leaflet.clear',
    function() {
      _geoNodesIndex.clear();
      _geoNodesIndex = new sigma.utils.map();
    }
  );

  /**
   * This methods returns true if the given node has geo coordinates. If no
   * node is given, returns true if one node has geo coordinates in the graph.
   *
   * @param {?string|number} nodeId The optional node id to check.
   * @return {boolean}
   */
  if (!sigma.classes.graph.hasMethod('hasLatLngCoordinates'))
    sigma.classes.graph.addMethod('hasLatLngCoordinates', function(nodeId) {
      if (nodeId !== undefined) {
        var node = this.nodesIndex.get(nodeId);
        if (node) {
          return hasNodeGeoCoordinates(node);
        }
      }
      return _geoNodesIndex.size != 0;
    });


  /**
   * Sigma Leaflet integration plugin
   * ===============================
   *
   * Require https://github.com/Leaflet/Leaflet
   * Author: Sébastien Heymann @ Linkurious
   * Version: 0.1
   */

  var settings = {
    // Leaflet zoom is discrete while Sigma zoom is continuous!
    // We use sigma zoom ratio as a binary switch.
    // It will zoom to the center of the view regardless of where the mouse was.
    zoomingRatio: 0.999999999,
    doubleClickZoomingRatio: 0.999999999,
    // Non-instant zoom can trigger the coordinatesUpdated event multiple times:
    mouseZoomDuration: 0,
    doubleClickZoomDuration: 0,
    // Disable automatic fit-to-screen:
    autoRescale: ['nodeSize', 'edgeSize'],
    // Disable zoom on mouse location:
    zoomOnLocation: false,
    // Disable inertia because of inaccurate node position:
    mouseInertiaDuration: 0,
    mouseInertiaRatio: 1,
    touchInertiaDuration: 0,
    touchInertiaRatio: 1
  };

  var locateAnimationSettings = {
    node: {
      duration: 0
    },
    edge: {
      duration: 0
    },
    center: {
      duration: 0
    }
  };

  // List of events received by the graph container
  // and copied to the map container
  var forwardedEvents = [
    'click',
    'mouseup',
    'mouseover',
    'mouseout',
    'mousemove',
    // 'contextmenu', // conflict with sigma.plugins.tooltips
    'focus',
    'blur'
  ];


  /**
   * This function provides geospatial features to Sigma by intergrating Leaflet.
   *
   * Fired events:
   * *************
   * enabled  Fired when the plugin is enabled and node coordinates are synchronized with the map.
   * disabled Fired when the plugin is disabled and original node coordinates are restored.
   *
   * @param {sigma}     sigInst     The Sigma instance.
   * @param {leaflet}   leafletMap  The Leaflet map instance.
   * @param {?object}   options     The options.
   */
  function LeafletPlugin(sigInst, leafletMap, options) {
    sigma.classes.dispatcher.extend(this);

    if (typeof L === 'undefined')
      throw new Error('leaflet is not declared');

    options = options || {};

    var _self = this,
      _s = sigInst,
      _map = leafletMap,
      _renderer = options.renderer || _s.renderers[0],
      _dragListener,
      _filter,
      _sigmaSettings = Object.create(null),
      _locateAnimationSettings = Object.create(null),

      // Easing parameters (can be applied only at enable/disable)
      _easeEnabled = false,
      _easing = options.easing,
      _duration = options.duration,
      _isAnimated = false,

      // Plugin state
      _enabled = false,
      _bound = false,
      _settingsApplied = false,
      _locateSettingsApplied = false,

      // Cache camera properties
      _sigmaCamera = {
        x: _s.camera.x,
        y: _s.camera.y,
        ratio: _s.camera.ratio
      };

    if (_easing && (!sigma.plugins || typeof sigma.plugins.animate === 'undefined')) {
      throw new Error('sigma.plugins.animate is not declared');
    }

    /**
     * Check if at least one node has geographical coordinates.
     *
     * @return {boolean}
     */
    this.isApplicable = function() {
      var nodes = _s.graph.nodes();
      for (var i = 0, l = nodes.length; i < l; i++) {
        if (hasNodeGeoCoordinates(nodes[i])) {
          return true;
        }
      }
      return false;
    };

    /**
     * Check if the plugin is enabled.
     *
     * @return {boolean}
     */
    this.isEnabled = function() {
      return _enabled;
    }

    /**
     * Apply mandatory Sigma settings, update node coordinates from their
     * geospatial coordinates, and bind all event listeners.
     *
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.enable = function() {
      showMapContainer();
      applySigmaSettings();
      applyLocatePluginSettings();

      // Reset camera cache
      _sigmaCamera = {
        x: _s.camera.x,
        y: _s.camera.y,
        ratio: _s.camera.ratio
      };

      _self.bindAll();

      _easeEnabled = !!_easing;
      _self.syncNodes(function() {
        _self.dispatchEvent('enabled');
      });
      _easeEnabled = false;

      _enabled = true;

      return _self;
    };

    /**
     * Restore the original Sigma settings and node coordinates,
     * and unbind event listeners.
     *
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.disable = function() {
      hideMapContainer();
      restoreSigmaSettings();
      restoreLocatePluginSettings();

      _easeEnabled = !!_easing;

      if (_filter) {
        // must be before unbindAll
        _filter.undo('geo-coordinates').apply();
      }

      restoreGraph(function() {
        _self.dispatchEvent('disabled');
      });

      _easeEnabled = false;
      _enabled = false;

      _self.unbindAll();

      return _self;
    };

    /**
     * Update the cartesian coordinates of the given node ids from their geospatial
     * coordinates and refresh sigma.
     * All nodes will be updated if no parameter is given.
     *
     * @param {?number|string|array} v One node id or a list of node ids.
     * @param {?function} callback A callback function triggered after node positions are updated.
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.syncNodes = function(v, callback) {
      var nodes, node, point;

      if (typeof v === 'string' || typeof v === 'number' || Array.isArray(v)) {
        nodes = _s.graph.nodes(v);
      }
      else {
        nodes = _s.graph.nodes();
      }

      if (typeof v === 'function') {
        callback = v;
      }

      if (!Array.isArray(nodes)) {
        nodes = [nodes];
      }

      for (var i = 0, l = nodes.length; i < l; i++) {
        node = nodes[i];

        // Store current cartesian coordinates
        if (node.leaflet_x === undefined) {
          node.leaflet_x = node.x;
        }
        if (node.leaflet_y === undefined) {
          node.leaflet_y = node.y;
        }

        if (hasNodeGeoCoordinates(node)) {
          // ensures the node is indexed if lat/lng properties have been added
          _geoNodesIndex.set(node.id, _s.graph.nodes(node.id));

          // Compute new cartesian coordinates
          point = _self.utils.latLngToSigmaPoint(node);

          if (_easeEnabled) {
            // Set current position on screen
            node.x = node['read_cam0:x'] || node.x;
            node.y = node['read_cam0:y'] || node.y;

            // Store new cartesian coordinates for animation
            node.leaflet_x_easing = point.x;
            node.leaflet_y_easing = point.y;
          }
          else {
            // Apply new cartesian coordinates
            node.x = point.x;
            node.y = point.y;
          }
        }
        else {
          // ensures the node is not indexed if lat/lng properties have been removed
          _geoNodesIndex.delete(node.id);

          if (!_filter) {
            // Hide node because it doesn't have geo coordinates
            // and store current "hidden" state
            if (node.leaflet_hidden === undefined) {
              node.leaflet_hidden = !!node.hidden;
            }
            node.hidden = true;
          }
        }
      }

      applyGeoFilter();

      if (_easeEnabled) {
        animate(nodes, callback);
      }
      else {
        _s.refresh();
        if (callback) callback();
      }
      return _self;
    };

    /**
     * It will increment the zoom level of the map by 1
     * if the zoom ratio of Sigma has been decreased.
     * It will decrement the zoom level of the map by 1
     * if the zoom ratio of Sigma has been increased.
     * It will update the Leaflet map center if the zoom ratio of Sigma is the same.
     *
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.syncMap = function() {
      // update map zoom
      if (_sigmaCamera.ratio !== _s.camera.ratio) {

        // Leaflet zoom is discrete while Sigma zoom is continuous!
        // We use sigma zoom ratio as a binary switch.
        if (_sigmaCamera.ratio < _s.camera.ratio) {
          _map.zoomIn();
        }
        else {
          _map.zoomOut();
        }
        // Reset zoom ratio of Sigma
        _s.camera.ratio = 1;
      }
      else {
        // update map center
        var dX = _s.camera.x - _sigmaCamera.x;
        var dY = _s.camera.y - _sigmaCamera.y;

        _sigmaCamera.x = _s.camera.x;
        _sigmaCamera.y = _s.camera.y;

        _map.panBy([dX, dY], {
          animate: false // the map will stick to the graph
        });
      }
      return _self;
    };

    /**
     * Fit the view to the graph or to the given nodes or edges. If sigma is
     * currently animated, it will postpone the execution after the end of the
     * animation.
     *
     * @param  {?object} options       The options. Fit to all nodes otherwise.
     *         {?number|string|array}  options.nodeIds The set of node ids.
     *         {?number|string|array}  options.edgeIds The set of edges ids.
     *         {?boolean}              options.animate Animate the nodes if true.
     *         {?function}             options.onComplete The callback function.
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.fitBounds = function(options) {
      var o = options || {};
      var zoom = _map.getZoom();
      if (_isAnimated) {
        _s.bind('animate.end', fitGeoBounds);
      }
      else {
        fitGeoBounds();
      }

      function fitGeoBounds() {
        if (o.edgeIds) {
          if (!Array.isArray(o.edgeIds)) {
            o.edgeIds = [o.edgeIds];
          }
          o.nodeIds = [];
          var edges = _s.graph.edges(o.edgeIds);
          for (var i = 0, l = edges.length; i < l; i++) {
            o.nodeIds.push(edges[i].source);
            o.nodeIds.push(edges[i].target);
          }
        }
        if (o.nodeIds && !Array.isArray(o.nodeIds)) {
          o.nodeIds = [o.nodeIds];
        }
        var nodes = o.nodeIds ? _s.graph.nodes(o.nodeIds) : _s.graph.nodes();

        _map.fitBounds(_self.utils.geoBoundaries(nodes), {
          animate: false
        });

        if (_map.getZoom() === zoom) {
          _easeEnabled = !!o.animate;

          if (o.onComplete) {
            _self.syncNodes(o.onComplete);
          }
          else {
            _self.syncNodes();
          }

          _easeEnabled = false;
        }
        else if (o.onComplete) {
          o.onComplete();
        }

        // handler removes itself
        setTimeout(function() {
          _s.unbind('animate.end', fitGeoBounds);
        }, 0);
      }

      return _self;
    };

    /**
     * Zoom in the map.
     */
    this.zoomIn = function() {
      _map.zoomIn();
    };

    /**
     * Zoom out the map.
     */
    this.zoomOut = function() {
      _map.zoomOut();
    };

    /**
     * Bind the given instance of the dragNodes listener. The geographical
     * coordinates of the dragged nodes will be updated to their new location
     * to preserve their position during zoom.
     *
     * @param {sigma.plugins.dragNodes} listener The dragNodes plugin instance.
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.bindDragListener = function(listener) {
      _dragListener = _dragListener || listener;
      _dragListener.bind('drop', leafletDropNodesHandler);
      return _self;
    };

    /**
     * Unbind the instance of the dragNodes listener.
     *
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.unbindDragListener = function() {
      if (_dragListener === undefined) return;

      _dragListener.unbind('drop', leafletDropNodesHandler);
      _dragListener = undefined;
      return _self;
    };

    /**
     * Bind the given instance of the filter plugin and apply the geo filter.
     *
     * @param {sigma.plugins.filter} listener The filter plugin instance.
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.bindFilter = function(filterInstance) {
      _filter = filterInstance;
      applyGeoFilter();
      return _self;
    };

    /**
     * Unbind the instance of the filter plugin.
     *
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.unbindFilter = function() {
      _filter = undefined;
      return _self;
    };

    /**
     * Reset the geographical coordinates of the nodes that have been dragged.
     *
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.resetDraggedNodesLatLng = function() {
      var node,
        nodes = _s.graph.nodes();

      for (var i = 0, l = nodes.length; i < l; i++) {
        node = nodes[i];

        if (node.lat_init !== undefined && node.lng_init !== undefined) {
          node.lat = node.lat_init;
          node.lng = node.lng_init;

          node.lat_init = undefined;
          node.lng_init = undefined;
        }
      }
      return _self;
    };

    /**
     * Bind all event listeners.
     *
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.bindAll = function() {
      if (_bound) return;

      _bound = true;
      forwardEvents();
      _s.bind('coordinatesUpdated', _self.syncMap);
      _map
        .on('zoomstart', hideGraphContainer)
        .on('zoomend', showGraphContainer);

      // Toggle animation state
      _s.bind('animate.start', toggleAnimating);
      _s.bind('animate.end', toggleAnimating);

      return _self;
    };

    /**
     * Unbind all event listeners.
     *
     * @return {sigma.plugins.leaflet} The plugin instance.
     */
    this.unbindAll = function() {
      if (!_bound) return;

      _bound = false;
      cancelForwardEvents();
      _s.unbind('coordinatesUpdated', _self.syncMap);
      _map
        .off('zoomstart', hideGraphContainer)
        .off('zoomend', showGraphContainer);

      // Toggle animation state
      _s.unbind('animate.start', toggleAnimating);
      _s.unbind('animate.end', toggleAnimating);

      _self.unbindDragListener();
      _self.unbindFilter();

      return _self;
    };

    /**
     * Unbind all event listeners, restore Sigma settings and remove all
     * references to Sigma and the Leaflet map.
     */
    this.kill = function() {
      _self.unbindAll();
      hideMapContainer();
      restoreSigmaSettings();
      _enabled = false;

      _s = undefined;
      _renderer = undefined;
      _map = undefined;
      _sigmaCamera = undefined;
    };

    this.utils = {};

    /**
     * Returns the geographical coordinates of a given Sigma point x,y.
     *
     * @param  {node|leaflet<Point>} point The Sigma x,y coordinates.
     * @return {leaflet<LatLng>}           The geographical coordinates.
     */
    this.utils.sigmaPointToLatLng = function(point) {
      var center = _map.project(_map.getCenter());
      return _map.unproject([
        point.x + center.x - _s.camera.x,
        point.y + center.y - _s.camera.y
      ]);
    };

    /**
     * Returns the cartesian coordinates of a Leaflet map layer point.
     *
     * @param  {node|leaflet<LatLng>} latlng The Leaflet map layer point.
     * @return {leaflet<Point>}              The Sigma x,y coordinates.
     */
    this.utils.latLngToSigmaPoint = function(latlng) {
      var center = _map.project(_map.getCenter());
      var point = _map.project(latlng);
      return {
        x: point.x - center.x + _s.camera.x,
        y: point.y - center.y + _s.camera.y
      }
    };

    /**
     * Compute the spatial boundaries of the given nodes.
     * Ignore hidden nodes and nodes with missing latitude or longitude coordinates.
     *
     * @param  {array}   nodes The nodes of the graph.
     * @return {leaflet<LatLngBounds>}
     */
    this.utils.geoBoundaries = function(nodes) {
      var node,
        minLat = Infinity,
        minLng = Infinity,
        maxLat = -Infinity,
        maxLng = -Infinity;

      for (var i = 0, l = nodes.length; i < l; i++) {
        node = nodes[i];
        if (node.hidden || !hasNodeGeoCoordinates(node)) {
          continue; // skip node
        }
        maxLat = Math.max(node.lat, maxLat);
        minLat = Math.min(node.lat, minLat);
        maxLng = Math.max(node.lng, maxLng);
        minLng = Math.min(node.lng, minLng);
      }

      return L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng));
    };


    // PRIVATE FUNCTIONS

    /**
     * Restore original cartesian coordinates of the nodes and "hidden" state.
     * Unpin all nodes.
     */
    function restoreGraph(callback) {
      if (!_s) return;

      var nodes = _s.graph.nodes(),
        node;

      for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];

        if (!_filter && node.leaflet_hidden !== undefined) {
          node.hidden = node.leaflet_hidden;
          node.leaflet_hidden = undefined;
        }

        if (node.leaflet_x !== undefined && node.leaflet_y !== undefined) {
          if (_easeEnabled) {
            // Set current position on screen
            node.x = node['read_cam0:x'] || node.x;
            node.y = node['read_cam0:y'] || node.y;

            // Store new cartesian coordinates for animation
            node.leaflet_x_easing = node.leaflet_x;
            node.leaflet_y_easing = node.leaflet_y;
          }
          else {
            node.x = node.leaflet_x;
            node.y = node.leaflet_y;
          }

          node.leaflet_x = undefined;
          node.leaflet_y = undefined;
        }
      }

      if (_easeEnabled) {
        animate(nodes, callback);
      }
      else {
        _s.refresh();
        if (callback) callback();
      }
    }

    /**
     * Apply the geo filter or create it and apply it.
     */
    function applyGeoFilter() {
      if (_filter) {
        if (_filter.has('geo-coordinates')) {
          _filter.apply();
        }
        else {
          _filter.nodesBy(hasNodeGeoCoordinates, 'geo-coordinates').apply();
        }
      }
    }

    /**
     * Toggle the node animation state.
     */
    function toggleAnimating() {
      _isAnimated = !_isAnimated;
    }

    /**
     * Animate a set of given nodes.
     *
     * @param {array} nodes The list of nodes to animate.
     * @param {?function} callback The function to run after the animation is complete.
     */
    function animate(nodes, callback) {
      sigma.plugins.animate(
        _s,
        {
          x: 'leaflet_x_easing',
          y: 'leaflet_y_easing'
        },
        {
          easing: _easing,
          onComplete: function() {
            _s.refresh();
            for (var i = 0; i < nodes.length; i++) {
              nodes[i].leaflet_x_easing = null;
              nodes[i].leaflet_y_easing = null;
            }
            if (callback) callback();
          },
          duration: _duration
        }
      );
    }

    /**
     * Set new geographical coordinates to the nodes of the given event
     * according to their Sigma cartesian coordinates.
     *
     * @param {object} event The Sigma 'drop' nodes event.
     */
    function leafletDropNodesHandler(event) {
      var node,
        latLng,
        nodes = event.data.nodes || [event.data.node];

      for (var i = 0, l = nodes.length; i < l; i++) {
        node = nodes[i];
        latLng = _self.utils.sigmaPointToLatLng(node);

        node.lat_init = node.lat;
        node.lng_init = node.lng;

        node.lat = latLng.lat;
        node.lng = latLng.lng;
      }
    }

    /**
     * Apply mandatory settings to sigma for the integration to work.
     * Cache overriden sigma settings to be restored when the plugin is killed.
     * Reset zoom ratio.
     */
    function applySigmaSettings() {
      if (_settingsApplied) return;
      _settingsApplied = true;

      Object.keys(settings).forEach(function(key) {
        _sigmaSettings[key] = _s.settings(key);
        _s.settings(key, settings[key]);
      });

      _s.camera.ratio = 1;
    }

    /**
     * Restore overriden sigma settings.
     */
    function restoreSigmaSettings() {
      if (!_settingsApplied) return;
      _settingsApplied = false;

      Object.keys(settings).forEach(function(key) {
        _s.settings(key, _sigmaSettings[key]);
      });
    }

    /**
     * Apply mandatory settings to sigma.plugins.locate for the integration to work.
     * Cache overriden settings to be restored when the plugin is killed.
     */
    function applyLocatePluginSettings() {
      if (_locateSettingsApplied || typeof sigma.plugins.locate === 'undefined') return;
      _locateSettingsApplied = true;

      if (_s) {
        // locate plugin must be instanciated before!
        var locateAnim = sigma.plugins.locate(_s).settings.animation;

        _locateAnimationSettings.nodeDuration = locateAnim.node.duration;
        _locateAnimationSettings.edgeDuration = locateAnim.edge.duration;
        _locateAnimationSettings.centerDuration = locateAnim.center.duration;

        locateAnim.node.duration = 0;
        locateAnim.edge.duration = 0;
        locateAnim.center.duration = 0;
      }
    }

    /**
     * Restore overriden sigma.plugins.locate settings.
     */
    function restoreLocatePluginSettings() {
      if (!_locateSettingsApplied || typeof sigma.plugins.locate === 'undefined') return;
      _locateSettingsApplied = false;

      if (_s) {
        // locate plugin must be instanciated before!
        var locateAnim = sigma.plugins.locate(_s).settings.animation;

        locateAnim.node.duration = _locateAnimationSettings.nodeDuration;
        locateAnim.edge.duration = _locateAnimationSettings.edgeDuration;
        locateAnim.center.duration = _locateAnimationSettings.centerDuration;
      }
    }

    /**
     * Forward a subset of mouse events from the sigma container to the Leaflet map.
     */
    function forwardEvents() {
      forwardedEvents.forEach(function(eventType) {
        // Listen on capture phase because sigma prevents propagation on bubbling phase
        _renderer.container.addEventListener(eventType, forwardEventsHandler, true);
      });
    }

    function cancelForwardEvents() {
      forwardedEvents.forEach(function(eventType) {
        _renderer.container.removeEventListener(eventType, forwardEventsHandler, true);
      });
    }

    function forwardEventsHandler(e) {
      _map.getContainer().dispatchEvent(cloneMouseEvent(e));
    }

    function hideGraphContainer() {
      _s.settings('enableCamera', false);
      _renderer.container.style.visibility = 'hidden';
    }

    function showGraphContainer() {
      _s.settings('enableCamera', true);
      _renderer.container.style.visibility = '';
      _self.syncNodes();
    }

    function hideMapContainer() {
      if (_map) {
        _map.getContainer().style.opacity = 0;
        _map.getContainer().style.visibility = 'hidden';
      }
    }

    function showMapContainer() {
      if (_map) {
        _map.getContainer().style.opacity = 1;
        _map.getContainer().style.visibility = '';
      }
    }
  }


  /**
   * Interface
   * ------------------
   *
   * > var leafletPlugin = sigma.plugins.leaflet(s, map, { easing: 'cubicInOut' });
   */
  var _instance = {};

  /**
   * This function provides geospatial features to Sigma by intergrating Leaflet.
   *
   * Recognized options:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the settings
   * object:
   *
   *   {?sigma.renderer}    renderer   The instance of the sigma renderer.
   *   {?(function|string)} easing     Either the name of an easing in the
   *                                   sigma.utils.easings package or a
   *                                   function. If not specified, the
   *                                   quadraticInOut easing from this package
   *                                   will be used instead.
   *   {?number}            duration   The duration of the animation. If not
   *                                   specified, the "animationsTime" setting
   *                                   value of the sigma instance will be used
   *                                   instead.
   *
   * @param {sigma}   sigInst    The related sigma instance.
   * @param {leaflet} leafletMap The Leaflet map instance.
   * @param {?object} options    The configuration options.
   */
  sigma.plugins.leaflet = function(sigInst, leafletMap, options) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');
    if (!leafletMap) throw new Error('Missing argument: "leafletMap"');

    // Create instance if undefined
    if (!_instance[sigInst.id]) {
      _instance[sigInst.id] = new LeafletPlugin(sigInst, leafletMap, options);

      // Binding on kill to clear the references
      sigInst.bind('kill', function() {
        _instance[sigInst.id].kill();
        _instance[sigInst.id] = undefined;
      });
    }

    return _instance[sigInst.id];
  };

  /**
   * This method removes the event listeners and kills the leaflet plugin instance.
   *
   * @param  {sigma} sigInst The related sigma instance.
   */
  sigma.plugins.killLeafletPlugin = function(sigInst) {
    if (!sigInst) throw new Error('Missing argument: "sigInst"');

    if (_instance[sigInst.id] instanceof LeafletPlugin) {
      _instance[sigInst.id].kill();
      _instance[sigInst.id] = undefined;
    }
  };


}).call(this);

/**
 * This plugin provides a method to locate a node, a set of nodes, an edge, or
 * a set of edges.
 */
(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  sigma.utils.pkg('sigma.plugins');

  /**
   * Sigma Locate
   * =============================
   *
   * @author Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * @version 0.1
   */

  /**
  * The default settings.
  *
  * Here is the exhaustive list of every accepted parameters in the animation
  * object:
  *
  *   {?number}            duration   The duration of the animation.
  *   {?function}          onNewFrame A callback to execute when the animation
  *                                   enters a new frame.
  *   {?function}          onComplete A callback to execute when the animation
  *                                   is completed or killed.
  *   {?(string|function)} easing     The name of a function from the package
  *                                   sigma.utils.easings, or a custom easing
  *                                   function.
  */
  var settings = {
    // ANIMATION SETTINGS:
    // **********
    animation: {
      node: {
        duration: 300
      },
      edge: {
        duration: 300
      },
      center: {
        duration: 300
      }
    },
    // PADDING:
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    // GLOBAL SETTINGS:
    // **********
    // If true adds a halfway point while animating the camera.
    focusOut: false,
    // The default zoom ratio, sigma zoomMax otherwise.
    zoomDef: null
  };

  var _instance = {}

  function getRescalePosition(s) {
    var autoRescale = s.settings('autoRescale');
    if (autoRescale) {
      if (Array.isArray(autoRescale)) {
        return (autoRescale.indexOf('nodePosition') !== -1);
      }
      return true;
    }
    return false;
  };

  function getBoundaries(nodes, prefix) {
    var i,
        l,
        sizeMax = -Infinity,
        minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    for (i = 0, l = nodes.length; i < l; i++) {
      sizeMax = Math.max(nodes[i][prefix + 'size'], sizeMax);
      maxX = Math.max(nodes[i][prefix + 'x'], maxX);
      minX = Math.min(nodes[i][prefix + 'x'], minX);
      maxY = Math.max(nodes[i][prefix + 'y'], maxY);
      minY = Math.min(nodes[i][prefix + 'y'], minY);
    }

    sizeMax = sizeMax || 1;

    return {
      sizeMax: sizeMax,
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };
  };


  /**
   * Locate Object
   * ------------------
   * @param  {sigma}   s      The related sigma instance.
   * @param  {object} options The options related to the object.
   */
  function Locate(s, options) {
    var self = this;

    this.s = s;
    this.settings = sigma.utils.extend(options, settings);
    this.settings.zoomDef = this.settings.zoomDef || this.s.settings('zoomMax');

    this.s.bind('kill', function() {
      sigma.plugins.killLocate(self.s);
    });


    /**
     * This function computes the target point (x, y, ratio) of the animation
     * given a bounding box.
     *
     * @param {object} boundaries:
     *      {number}  minX  The bounding box top.
     *      {number}  maxX  The bounding box bottom.
     *      {number}  minY  The bounding box left.
     *      {number}  maxY  The bounding box right.
     * @return {object}        The target point.
     */
    function target(boundaries) {
      var x,
          y,
          ratio,
          width,
          height,
          rendererWidth,
          rendererHeight;

      // Center of the boundaries:
      x = (boundaries.minX + boundaries.maxX) * 0.5;
      y = (boundaries.minY + boundaries.maxY) * 0.5;

      // Zoom ratio:
      if (getRescalePosition(self.s)) {
        var graphBoundaries,
            graphRect,
            graphWidth,
            graphHeight,
            rect;

        // Coordinates of the rectangle representing the camera on screen for the selection boundaries:
        rect = self.s.camera.getRectangle(
          boundaries.maxX - boundaries.minX,
          boundaries.maxY - boundaries.minY
        );

        width = rect.x2 - rect.x1 || 1;
        height = rect.height || 1;

        // Graph boundaries:
        graphBoundaries = sigma.utils.getBoundaries(
          self.s.graph,
          self.s.camera.readPrefix
        );

        // Coordinates of the rectangle representing the camera on screen for the graph boundaries:
        graphRect = self.s.camera.getRectangle(
          graphBoundaries.maxX - graphBoundaries.minX,
          graphBoundaries.maxY - graphBoundaries.minY
        );

        graphWidth = graphRect.x2 - graphRect.x1 || 1;
        graphHeight = graphRect.height || 1;

        rendererWidth = graphWidth - self.settings.padding.left - self.settings.padding.right;
        rendererHeight = graphHeight - self.settings.padding.top - self.settings.padding.bottom;

        ratio = Math.max(width / rendererWidth, height / rendererHeight);
      }
      else {
        width = boundaries.maxX - boundaries.minX + boundaries.sizeMax * 2;
        height = boundaries.maxY - boundaries.minY + boundaries.sizeMax * 2;
        rendererWidth = self.s.renderers[0].width - self.settings.padding.left - self.settings.padding.right;
        rendererHeight = self.s.renderers[0].height - self.settings.padding.top - self.settings.padding.bottom;
        ratio = Math.max(width / rendererWidth, height / rendererHeight);
      }

      // Normalize ratio:
      ratio = Math.max(self.s.settings('zoomMin'), Math.min(self.s.settings('zoomMax'), ratio));

      // Update center:
      x += (self.settings.padding.right - self.settings.padding.left) * ratio * 0.5;
      y += (self.settings.padding.bottom - self.settings.padding.top) * ratio * 0.5;

      return {
        x: x,
        y: y,
        ratio: ratio
      };
    };

    /**
     * This function will locate a node or a set of nodes in the visualization.
     *
     * Recognized parameters:
     * **********************
     * Here is the exhaustive list of every accepted parameters in the animation
     * options:
     *
     *   {?number}            duration   The duration of the animation.
     *   {?function}          onNewFrame A callback to execute when the animation
     *                                   enters a new frame.
     *   {?function}          onComplete A callback to execute when the animation
     *                                   is completed or killed.
     *   {?(string|function)} easing     The name of a function from the package
     *                                   sigma.utils.easings, or a custom easing
     *                                   function.
     *
     *
     * @param  {string|array}  v       Eventually one node id, an array of ids.
     * @param  {?object}       options A dictionary with options for a possible
     *                                 animation.
     * @return {sigma.plugins.locate}  Returns the instance itself.
     */
    this.nodes = function(v, options) {
      if (arguments.length < 1)
        throw new TypeError('Too few arguments.');

      if (arguments.length === 3 && typeof options !== "object")
        throw new TypeError('Invalid argument: "options" is not an object, was ' + options);

      var t,
          n,
          animationOpts = sigma.utils.extend(options, self.settings.animation.node),
          ratio = self.s.camera.ratio,
          rescalePosition = getRescalePosition(self.s);

      // One node:
      if (typeof v === 'string' || typeof v === 'number') {
        n = self.s.graph.nodes(v);
        if (n === undefined)
          throw new Error('Invalid argument: the node of id "' + v + '" does not exist.');

        t = {
          x: n[self.s.camera.readPrefix + 'x'],
          y: n[self.s.camera.readPrefix + 'y'],
          ratio: rescalePosition ?
            self.s.settings('zoomMin') : self.settings.zoomDef
        }
      }

      // Array of nodes:
      else if (Array.isArray(v)) {
        var boundaries = getBoundaries(v.map(function(id) {
          return self.s.graph.nodes(id);
        }), self.s.camera.readPrefix);

        t = target(boundaries);
      }
      else
        throw new TypeError('Invalid argument: "v" is not a string, a number, or an array, was ' + v);

      if (self.settings.focusOut && rescalePosition) {
        sigma.misc.animation.camera(
          s.camera,
          {
            x: (self.s.camera.x + t.x) * 0.5,
            y: (self.s.camera.y + t.y) * 0.5,
            ratio: self.settings.zoomDef
          },
          {
            duration: animationOpts.duration,
            onComplete: function() {
              sigma.misc.animation.camera(
                self.s.camera,
                t,
                animationOpts
              );
            }
          }
        );
      } else {
        // console.log(t);
        sigma.misc.animation.camera(
          self.s.camera,
          t,
          animationOpts
        );
      }

      return self;
    };


    /**
     * This function will locate an edge or a set of edges in the visualization.
     *
     * Recognized parameters:
     * **********************
     * Here is the exhaustive list of every accepted parameters in the animation
     * options:
     *
     *   {?number}            duration   The duration of the animation.
     *   {?function}          onNewFrame A callback to execute when the animation
     *                                   enters a new frame.
     *   {?function}          onComplete A callback to execute when the animation
     *                                   is completed or killed.
     *   {?(string|function)} easing     The name of a function from the package
     *                                   sigma.utils.easings, or a custom easing
     *                                   function.
     *
     *
     * @param  {string|array}  v       Eventually one edge id, an array of ids.
     * @param  {?object}       options A dictionary with options for a possible
     *                                 animation.
     * @return {sigma.plugins.locate}  Returns the instance itself.
     */
    this.edges = function(v, options) {
      if (arguments.length < 1)
        throw new TypeError('Too few arguments.');

      if (arguments.length === 3 && typeof options !== "object")
        throw new TypeError('Invalid argument: "options" is not an object, was ' + options);

      var t,
          e,
          boundaries,
          animationOpts = sigma.utils.extend(options, self.settings.animation.edge),
          ratio = self.s.camera.ratio,
          rescalePosition = getRescalePosition(self.s);

      // One edge:
      if (typeof v === 'string' || typeof v === 'number') {
        e = self.s.graph.edges(v);
        if (e === undefined)
          throw new Error('Invalid argument: the edge of id "' + v + '" does not exist.');

        boundaries = getBoundaries([
          self.s.graph.nodes(e.source),
          self.s.graph.nodes(e.target)
        ], self.s.camera.readPrefix);

        t = target(boundaries);
      }

      // Array of edges:
      else if (Array.isArray(v)) {
        var i,
            l,
            nodes = [];

        for (i = 0, l = v.length; i < l; i++) {
          e = self.s.graph.edges(v[i]);
          nodes.push(self.s.graph.nodes(e.source));
          nodes.push(self.s.graph.nodes(e.target));
        }

        boundaries = getBoundaries(nodes, self.s.camera.readPrefix);
        t = target(boundaries);
      }
      else
        throw new TypeError('Invalid argument: "v" is not a string or a number, or an array, was ' + v);

      if (self.settings.focusOut && rescalePosition) {
        sigma.misc.animation.camera(
          s.camera,
          {
            x: (self.s.camera.x + t.x) * 0.5,
            y: (self.s.camera.y + t.y) * 0.5,
            ratio: self.settings.zoomDef
          },
          {
            duration: animationOpts.duration,
            onComplete: function() {
              sigma.misc.animation.camera(
                self.s.camera,
                t,
                animationOpts
              );
            }
          }
        );
      } else {
        sigma.misc.animation.camera(
          self.s.camera,
          t,
          animationOpts
        );
      }

      return self;
    };


    /**
     * This method moves the camera to the equidistant position from all nodes,
     * or to the coordinates (0, 0) if the graph is empty, given a final zoom
     * ratio.
     *
     * Recognized parameters:
     * **********************
     * Here is the exhaustive list of every accepted parameters in the animation
     * options:
     *
     *   {?number}            duration   The duration of the animation.
     *   {?function}          onNewFrame A callback to execute when the animation
     *                                   enters a new frame.
     *   {?function}          onComplete A callback to execute when the animation
     *                                   is completed or killed.
     *   {?(string|function)} easing     The name of a function from the package
     *                                   sigma.utils.easings, or a custom easing
     *                                   function.
     *
     *
     * @param  {number}  ratio        The final zoom ratio.
     * @param  {?object} options      A dictionary with options for a possible
     *                                animation.
     * @return {sigma.plugins.locate} Returns the instance itself.
     */
    this.center = function(ratio, options) {
      var animationOpts = sigma.utils.extend(options, self.settings.animation.center);
      if (self.s.graph.nodes().length) {
        self.nodes(self.s.graph.nodes().map(function(n) {
          return n.id;
        }), animationOpts);
      }
      else {
        sigma.misc.animation.camera(
          self.s.camera,
          {
            x: 0,
            y: 0,
            ratio: ratio
          },
          animationOpts
        );
      }

      return self;
    };

    /**
     * Set the padding, i.e. the space (in screen pixels) between the renderer
     * border and the renderer content.
     * The parameters are `top`, `right`, `bottom`, `left`.
     *
     * @param  {object} options  A dictionary with padding options.
     * @return {sigma.plugins.locate} Returns the instance itself.
     */
    this.setPadding = function(options) {
      self.settings.padding = sigma.utils.extend(options, self.settings.padding);
      return self;
    }

    this.kill = function() {
      self.settings = null;
      self.s = null;
    }

  };



  /**
   * Interface
   * ------------------
   *
   * > var locate = sigma.plugins.locate(s);
   * > locate.nodes('n0');
   * > locate.nodes(['n0', 'n1']);
   * > locate.edges('e0');
   * > locate.edges(['e0', 'e1']);
   */

  /**
   * @param  {sigma} s The related sigma instance.
   * @param  {object} options The options related to the object.
   */
  sigma.plugins.locate = function(s, options) {
    // Create instance if undefined
    if (!_instance[s.id]) {
      _instance[s.id] = new Locate(s, options);
    }
    return _instance[s.id];
  };

  /**
   *  This function kills the locate instance.
   */
  sigma.plugins.killLocate = function(s) {
    if (_instance[s.id] instanceof Locate) {
      _instance[s.id].kill();
    }
    delete _instance[s.id];
  };

}).call(window);

/**
 * This plugin provides a method to retrieve the neighborhood of a node.
 * Basically, it loads a graph and stores it in a headless sigma.classes.graph
 * instance, that you can query to retrieve neighborhoods.
 *
 * It is useful for people who want to provide a neighborhoods navigation
 * inside a big graph instead of just displaying it, and without having to
 * deploy an API or the list of every neighborhoods.
 *
 * This plugin also adds to the graph model a method called "neighborhood".
 * Check the code for more information.
 *
 * Here is how to use it:
 *
 *  > var db = new sigma.plugins.neighborhoods();
 *  > db.load('path/to/my/graph.json', function() {
 *  >   var nodeId = 'anyNodeID';
 *  >   mySigmaInstance
 *  >     .read(db.neighborhood(nodeId))
 *  >     .refresh();
 *  > });
 */
(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  /**
   * This method takes the ID of node as argument and returns the graph of the
   * specified node, with every other nodes that are connected to it and every
   * edges that connect two of the previously cited nodes. It uses the built-in
   * indexes from sigma's graph model to search in the graph.
   *
   * @param  {string} centerId The ID of the center node.
   * @return {object}          The graph, as a simple descriptive object, in
   *                           the format required by the "read" graph method.
   */
  sigma.classes.graph.addMethod(
    'neighborhood',
    function(centerId) {
      var k1,
          k2,
          k3,
          node,
          center,
          // Those two local indexes are here just to avoid duplicates:
          localNodesIndex = {},
          localEdgesIndex = {},
          // And here is the resulted graph, empty at the moment:
          graph = {
            nodes: [],
            edges: []
          };

      // Check that the exists:
      if (!this.nodes(centerId))
        return graph;

      // Add center. It has to be cloned to add it the "center" attribute
      // without altering the current graph:
      node = this.nodes(centerId);
      center = {};
      center.center = true;
      for (k1 in node)
        center[k1] = node[k1];

      localNodesIndex[centerId] = true;
      graph.nodes.push(center);

      // Add neighbors and edges between the center and the neighbors:
      for (k1 in this.allNeighborsIndex[centerId]) {
        if (!localNodesIndex[k1]) {
          localNodesIndex[k1] = true;
          graph.nodes.push(this.nodesIndex[k1]);
        }

        for (k2 in this.allNeighborsIndex[centerId][k1])
          if (!localEdgesIndex[k2]) {
            localEdgesIndex[k2] = true;
            graph.edges.push(this.edgesIndex[k2]);
          }
      }

      // Add edges connecting two neighbors:
      for (k1 in localNodesIndex)
        if (k1 !== centerId)
          for (k2 in localNodesIndex)
            if (
              k2 !== centerId &&
              k1 !== k2 &&
              this.allNeighborsIndex[k1][k2]
            )
              for (k3 in this.allNeighborsIndex[k1][k2])
                if (!localEdgesIndex[k3]) {
                  localEdgesIndex[k3] = true;
                  graph.edges.push(this.edgesIndex[k3]);
                }

      // Finally, let's return the final graph:
      return graph;
    }
  );

  sigma.utils.pkg('sigma.plugins');

  /**
   * sigma.plugins.neighborhoods constructor.
   */
  sigma.plugins.neighborhoods = function() {
    var ready = false,
        readyCallbacks = [],
        graph = new sigma.classes.graph();

    /**
     * This method just returns the neighborhood of a node.
     *
     * @param  {string} centerNodeID The ID of the center node.
     * @return {object}              Returns the neighborhood.
     */
    this.neighborhood = function(centerNodeID) {
      return graph.neighborhood(centerNodeID);
    };

    /**
     * This method loads the JSON graph at "path", stores it in the local graph
     * instance, and executes the callback.
     *
     * @param {string}    path     The path of the JSON graph file.
     * @param {?function} callback Eventually a callback to execute.
     */
    this.load = function(path, callback) {
      // Quick XHR polyfill:
      var xhr = (function() {
        if (window.XMLHttpRequest)
          return new XMLHttpRequest();

        var names,
            i;

        if (window.ActiveXObject) {
          names = [
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.3.0',
            'Msxml2.XMLHTTP',
            'Microsoft.XMLHTTP'
          ];

          for (i in names)
            try {
              return new ActiveXObject(names[i]);
            } catch (e) {}
        }

        return null;
      })();

      if (!xhr)
        throw 'XMLHttpRequest not supported, cannot load the data.';

      xhr.open('GET', path, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          graph.clear().read(JSON.parse(xhr.responseText));

          if (callback)
            callback();
        }
      };

      // Start loading the file:
      xhr.send();

      return this;
    };

    /**
     * This method cleans the graph instance "reads" a graph into it.
     *
     * @param {object} g The graph object to read.
     */
    this.read = function(g) {
      graph.clear().read(g);
    };
  };
}).call(window);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma.plugins.poweredBy: sigma not in scope.';

  // Initialize package:
  sigma.utils.pkg('sigma.settings');

  /**
  * Extended sigma settings.
  */
  var settings = {
    // {string}
    poweredByHTML: 'Linkurious.js',
    // {number}
    poweredByURL: 'https://github.com/Linkurious/linkurious.js',
    // {string}
    poweredByPingURL: ''
  };

  // Export the previously designed settings:
  sigma.settings = sigma.utils.extend(sigma.settings || {}, settings);

}).call(this);

;(function(undefined) {

  /**
   * Sigma Renderer PoweredBy Utility
   * ================================
   *
   * The aim of this plugin is to display a clickable "powered by" text on the canvas.
   *
   * Author: Sébastien Heymann (sheymann) for Linkurious
   * Version: 0.0.1
   */

  function poweredBy(options) {
    options = options || {};
    var self = this,
        content,
        html = options.html || this.settings('poweredByHTML'),
        url = options.url || this.settings('poweredByURL'),
        pingURL = options.pingURL || this.settings('poweredByPingURL');

    if (!document.getElementsByClassName('sigma-poweredby').length) {
      if (url) {
        content = [
          '<a href="' +
          url +
          '" target="_blank" style="font-family:\'Helvetica Neue\',Arial,Helvetica,sans-serif; font-size:11px">' +
          html +
          '</a>'
        ];
      }
      else {
        content = [ html ];
      }

      if (pingURL) {
        var img = new Image();
        img.src = pingURL;
      }

      var dom = document.createElement('div');
      dom.setAttribute('class', 'sigma-poweredby');
      dom.innerHTML = content.join('');
      dom.style.position = 'absolute';
      dom.style.padding = '0 5px';
      dom.style.bottom = '2px';
      dom.style.right = '1px';
      dom.style.zIndex = '1000';
      dom.style.background = 'rgba(255, 255, 255, 0.7)';

      this.container.appendChild(dom);
    }
  }

  // Extending canvas and webl renderers
  sigma.renderers.canvas.prototype.poweredBy = poweredBy;
  sigma.renderers.webgl.prototype.poweredBy = poweredBy;

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');

  /**
   * Sigma Select
   * =============================
   *
   * @author Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * @version 0.3
   */

  var _instance = {},
      _body = null,
      _nodeReference = null,
      _spacebar = false,
      _doubleClickingNodes = false;


  function keyDown(event) {
    _spacebar = event.which === 32;
    _body.removeEventListener('keydown', keyDown, false);
    _body.addEventListener('keyup', keyUp, false);
  }

  function keyUp(event) {
    _spacebar = false;
    _body.addEventListener('keydown', keyDown, false);
    _body.removeEventListener('keyup', keyUp, false);
  }


  /**
   * Select Object
   * ------------------
   *
   * @param  {sigma}                     s The related sigma instance.
   * @param  {sigma.plugins.activeState} a The activeState plugin instance.
   * @param  {?renderer}                 renderer The related renderer instance.
   *                                              Default value: s.renderers[0].
   */
  function Select(s, a, r) {
    var
      self = this,
      renderer = r || s.renderers[0],
      mousemoveCount = 0,
      kbd = null,
      lasso = null;

    _body = _body || document.getElementsByTagName('body')[0];

    renderer.container.lastChild.addEventListener('mousedown', nodeMouseDown);
    renderer.container.lastChild.addEventListener('mouseup', nodeMouseUp);


    /**
     * Initialize with current active nodes. This method should be called if a
     * node is active before any mouse event.
     */
    this.init = function() {
      if (a.nbNodes()) {
        _nodeReference = a.nodes()[0].id;
      }
    };

    /**
     * This fuction handles the node click event. The clicked node is activated.
     * All active nodes are deactivated if one of the active nodes is clicked.
     * The double-clicked nodes are activated.
     * If the Spacebar key is hold, it adds the nodes to the list of active
     * nodes instead of clearing the list. It clears the list of active edges. It
     * prevent nodes to be selected while dragging.
     *
     * @param {event} The event.
     */
    this.clickNodesHandler = function(event) {
      // Prevent nodes to be selected while dragging:
      if (mousemoveCount > 1) return;

      var target = event.data.node[0].id;
      var actives = a.nodes().map(function(n) {
        return n.id;
      });

      var newTarget = (actives.indexOf(target) > -1) ? undefined : target;

      a.dropEdges();

      if (_spacebar) {
        var existingTarget = (newTarget === target) ? undefined : target;
        a.dropNodes(existingTarget);
        s.refresh({skipIndexation: true});
      }
      else {
        if (actives.length > 1) {
          a.addNodes(target);
        }

        var activeNode = a.nodes()[0];

        if(activeNode != null) {
          if(_nodeReference === activeNode.id) {
            if(newTarget != null) {
              a.dropNodes();
              _nodeReference = null;
            }
            else {
              setTimeout(function() {
                if (!_doubleClickingNodes) {
                  a.dropNodes();
                  _nodeReference = null;
                  s.refresh({skipIndexation: true});
                }
              }, s.settings('doubleClickTimeout'));
            }
          } else {
            _nodeReference = activeNode.id;
          }
        } else {
          _nodeReference = newTarget;
        }
      }

      if (newTarget != null) {
        a.addNodes(newTarget);
        s.refresh({skipIndexation: true});
      }
    };

    /**
     * Handle the flag 'doubleClickingNodes'.
     * Warning: sigma fires 'doubleClickNodes' before 'clickNodes'.
     */
    this.doubleClickNodesHandler = function(event) {
      _doubleClickingNodes = true;

      setTimeout(function() {
        _doubleClickingNodes = false;
      }, 100 + s.settings('doubleClickTimeout'));
    };

    /**
     * This fuction handles the edge click event. The clicked edge is activated.
     * The clicked active edges are deactivated.
     * If the Spacebar key is hold, it adds the edges to the list of active
     * edges instead of clearing the list. It clears the list of active nodes. It
     * prevent edges to be selected while dragging.
     *
     * @param {event} The event.
     */
    this.clickEdgesHandler = function(event) {
      // Prevent edges to be selected while dragging:
      if (mousemoveCount > 1) return;

      var target = event.data.edge[0].id;
      var actives = a.edges().map(function(e) {
        return e.id;
      });

      var newTarget = (actives.indexOf(target) > -1) ? undefined : target;

      a.dropNodes();
      _nodeReference = null;

      if (_spacebar) {
        var existingTarget = (newTarget === target) ? undefined : target;
        a.dropEdges(existingTarget);
        s.refresh({skipIndexation: true});
      }
      else {
        a.dropEdges();
      }

      if (newTarget != null) {
        a.addEdges(newTarget);
        s.refresh({skipIndexation: true});
      }
    };

    // Select all nodes or deselect them if all nodes are active
    function spaceA() {
      a.dropEdges();

      if (a.nbNodes() === s.graph.nodes().length) {
        a.dropNodes();
      }
      else {
        a.addNodes();
      }
      s.refresh({skipIndexation: true});
    }

    function nodeMouseMove() {
      mousemoveCount++;
    }

    function nodeMouseDown() {
      mousemoveCount = 0;
      renderer.container.lastChild.addEventListener('mousemove', nodeMouseMove);
    }

    function nodeMouseUp() {
      setTimeout(function() {
        mousemoveCount = 0;
        var n = a.nodes()[0];
        if(n && _nodeReference === null) {
          _nodeReference = n.id;
        }
      }, 1);
      renderer.container.lastChild.removeEventListener('mousemove', nodeMouseMove);
    }

    // Deselect all nodes and edges
    function spaceU() {
      a.dropEdges();
      a.dropNodes();
      s.refresh({skipIndexation: true});
    }

    // Drop selected nodes and edges
    function spaceDel() {
      var nodes = a.nodes().map(function(n) { return n.id; }),
        edges = a.edges().map(function(e) { return e.id; });

      a.dropEdges(edges);
      a.dropNodes(nodes);

      if (nodes.length == s.graph.nodes().length) {
        s.graph.clear();
      }
      else {
        s.graph.dropEdges(edges);
        s.graph.dropNodes(nodes);
      }

      s.refresh();
    }

    // Select neighbors of selected nodes
    function spaceE() {
      a.addNeighbors();
      s.refresh({skipIndexation: true});
    }

    // Select isolated nodes (i.e. of degree 0)
    function spaceI() {
      a.dropEdges();
      a.setNodesBy(function(n) {
        return s.graph.degree(n.id) === 0;
      });
      s.refresh({skipIndexation: true});
    }

    // Select leaf nodes (i.e. nodes with 1 adjacent node)
    function spaceL() {
      a.dropEdges();
      a.setNodesBy(function(n) {
        return s.graph.adjacentNodes(n.id).length === 1;
      });
      s.refresh({skipIndexation: true});
    }

    s.bind('clickNodes', this.clickNodesHandler);
    s.bind('doubleClickNodes', this.doubleClickNodesHandler);
    s.bind('clickEdges', this.clickEdgesHandler);

    _body.addEventListener('keydown', keyDown, false);

    /**
     * Bind the select plugin to handle keyboard events.
     * @param  {sigma.plugins.keyboard} keyboard The keyboard plugin instance.
     */
    this.bindKeyboard = function(keyboard) {
      if (!keyboard) throw new Error('Missing argument: "keyboard"');

      kbd = keyboard;
      kbd.bind('32+65 18+32+65', spaceA);
      kbd.bind('32+85 18+32+85', spaceU);
      kbd.bind('32+46 18+32+46', spaceDel);
      kbd.bind('32+69 18+32+69', spaceE);
      kbd.bind('32+73 18+32+73', spaceI);
      kbd.bind('32+76 18+32+76', spaceL);
      return this;
    };

    /**
     * Clear event bindings to the keyboard plugin.
     */
    this.unbindKeyboard = function() {
      if (kbd) {
        kbd.unbind('32+65 18+32+65', spaceA);
        kbd.unbind('32+85 18+32+85', spaceU);
        kbd.unbind('32+46 18+32+46', spaceDel);
        kbd.unbind('32+69 18+32+69', spaceE);
        kbd.unbind('32+73 18+32+73', spaceI);
        kbd.unbind('32+76 18+32+76', spaceL);
        kbd = null;
      }
      return this;
    };

    // Update active nodes and edges and update the node reference.
    function lassoHandler(event) {
      var nodes = event.data;

      if (!nodes.length) {
        a.dropNodes();
        _nodeReference = null;
      }
      else {
        a.dropEdges();
        a.addNodes(nodes.map(function(n) { return n.id; }));
        _nodeReference = a.nodes()[0].id;
      }
    };

    /**
     * Bind the select plugin to handle lasso events.
     * @param  {sigma.plugins.lasso} lasso The lasso plugin instance.
     */
    this.bindLasso = function(lassoInstance) {
      if (!lassoInstance) throw new Error('Missing argument: "lassoInstance"');

      lasso = lassoInstance;
      lasso.bind('selectedNodes', lassoHandler);
    };

    /**
     * Clear event bindings to the lasso plugin.
     */
    this.unbindLasso = function() {
      if (lasso) {
        lasso.unbind('selectedNodes', lassoHandler);
      }
    }

    /**
     * Clear all event bindings and references.
     */
    this.clear = function() {
      s.unbind('clickNodes', self.clickNodesHandler);
      s.unbind('doubleClickNodes', self.doubleClickNodesHandler);
      s.unbind('clickEdges', self.clickEdgesHandler);

      self.unbindKeyboard();
      self.unbindLasso();

      renderer.container.lastChild.removeEventListener('mousedown', nodeMouseDown);
      renderer.container.lastChild.removeEventListener('mouseup', nodeMouseUp);
      renderer.container.lastChild.removeEventListener('mousemove', nodeMouseMove);

      renderer = null;
      kbd = null;
    };
  }

  /**
   * Interface
   * ------------------
   */

  /**
   * This plugin enables the activation of nodes and edges by clicking on them
   * (i.e. selection). Multiple nodes or edges may be activated by holding the
   * Ctrl or Meta key while clicking on them (i.e. multi selection).
   *
   * @param  {sigma}                     s The related sigma instance.
   * @param  {sigma.plugins.activeState} a The activeState plugin instance.
   * @param  {?renderer}                 renderer The related renderer instance.
   *                                              Default value: s.renderers[0].
   */
  sigma.plugins.select = function(s, a, renderer) {
    // Create object if undefined
    if (!_instance[s.id]) {
      _instance[s.id] = new Select(s, a);

      s.bind('kill', function() {
        sigma.plugins.killSelect(s);
      });
    }

    return _instance[s.id];
  };

  /**
   *  This function kills the select instance.
   *
   * @param  {sigma} s The related sigma instance.
   */
  sigma.plugins.killSelect = function(s) {
    if (_instance[s.id] instanceof Select) {
      _instance[s.id].clear();
      delete _instance[s.id];
    }

    if (!_instance.length && _body) {
      _body.removeEventListener('keydown', keyDown, false);
      _body.removeEventListener('keyup', keyUp, false);
      _body = null;
    }
  };

}).call(this);

/**
 * This plugin provides a method to display a tooltip at a specific event, e.g.
 * to display some node properties on node hover. Check the
 * sigma.plugins.tooltip function doc or the examples/tooltip.html code sample
 * to know more.
 */
(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');

  /**
   * Sigma tooltip
   * =============================
   *
   * @author Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * @version 0.3
   */

  var settings = {
    stage: {
      show: 'rightClickStage',
      hide: 'clickStage',
      cssClass: 'sigma-tooltip',
      position: 'top',    // top | bottom | left | right
      autoadjust: false,
      delay: 0,
      hideDelay: 0,
      template: '',       // HTML string
      renderer: null      // function
    },
    node: {
      show: 'clickNode',
      hide: 'clickStage',
      cssClass: 'sigma-tooltip',
      position: 'top',    // top | bottom | left | right
      autoadjust: false,
      delay: 0,
      hideDelay: 0,
      template: '',       // HTML string
      renderer: null      // function
    },
    edge: {
      show: 'clickEdge',
      hide: 'clickStage',
      cssClass: 'sigma-tooltip',
      position: 'top',    // top | bottom | left | right
      autoadjust: false,
      delay: 0,
      hideDelay: 0,
      template: '',       // HTML string
      renderer: null      // function
    },
    doubleClickDelay: 800
  };


  /**
   * This function will display a tooltip when a sigma event is fired. It will
   * basically create a DOM element, fill it with the template or the result of
   * the renderer function, set its position and CSS class, and insert the
   * element as a child of the sigma container. Only one tooltip may exist.
   *
   * Recognized parameters of options:
   * *********************************
   * Enable node tooltips by adding the "node" key to the options object.
   * Enable edge tooltips by adding the "edge" key to the options object.
   * Each value could be an array of objects for multiple tooltips,
   * or an object for one tooltip.
   * Here is the exhaustive list of every accepted parameter in these objects:
   *
   *   {?string}   show       The event that triggers the tooltip. Default
   *                          values: "clickNode", "clickEdge". Other suggested
   *                          values: "overNode", "doubleClickNode",
   *                          "rightClickNode", "hovers", "doubleClickEdge",
   *                          "rightClickEdge", "doubleClickNode",
   *                          "rightClickNode".
   *   {?string}   hide       The event that hides the tooltip. Default value:
   *                          "clickStage". Other suggested values: "hovers"
   *   {?string}   template   The HTML template. It is directly inserted inside
   *                          a div element unless a renderer is specified.
   *   {?function} renderer   This function may process the template or be used
   *                          independently. It should return an HTML string or
   *                          a DOM element. It is executed at runtime. Its
   *                          context is sigma.graph.
   *   {?string}   cssClass   The CSS class attached to the top div element.
   *                          Default value: "sigma-tooltip".
   *   {?string}   position   The position of the tooltip regarding the mouse.
   *                          If it is not specified, the tooltip top-left
   *                          corner is positionned at the mouse position.
   *                          Available values: "top", "bottom", "left",
   *                          "right".
   *   {?number}   delay      The delay in miliseconds before displaying the
   *                          tooltip after the show event is triggered.
   *   {?boolean}  autoadjust [EXPERIMENTAL] If true, tries to adjust the
   *                          tooltip position to be fully included in the body
   *                          area. Doesn't work on Firefox 30. Better work on
   *                          elements with fixed width and height.
   *
   * > sigma.plugins.tooltip(s, {
   * >   node: {
   * >     template: 'Hello node!'
   * >   },
   * >   edge: {
   * >     template: 'Hello edge!'
   * >   },
   * >   stage: {
   * >     template: 'Hello stage!'
   * >   }
   * > });
   *
   * @param {sigma}    s        The related sigma instance.
   * @param {renderer} renderer The related sigma renderer.
   * @param {object}   options  An object with options.
   */
  function Tooltips(s, renderer, options) {
    var self = this,
        _tooltip,
        _timeoutHandle,
        _timeoutHideHandle,
        _stageTooltips = [],
        _nodeTooltips = [],
        _edgeTooltips = [],
        _mouseOverTooltip = false,
        _doubleClick = false;

    if (Array.isArray(options.stage)) {
      for (var i = 0; i < options.stage.length; i++) {
        _stageTooltips.push(sigma.utils.extend(options.stage[i], settings.stage));
      }
    } else {
      _stageTooltips.push(sigma.utils.extend(options.stage, settings.stage));
    }

    if (Array.isArray(options.node)) {
      for (var i = 0; i < options.node.length; i++) {
        _nodeTooltips.push(sigma.utils.extend(options.node[i], settings.node));
      }
    } else {
      _nodeTooltips.push(sigma.utils.extend(options.node, settings.node));
    }

    if (Array.isArray(options.edge)) {
      for (var i = 0; i < options.edge.length; i++) {
        _edgeTooltips.push(sigma.utils.extend(options.edge[i], settings.edge));
      }
    } else {
      _edgeTooltips.push(sigma.utils.extend(options.edge, settings.edge));
    }

    sigma.classes.dispatcher.extend(this);

    s.bind('kill', function() {
      sigma.plugins.killTooltips(s);
    });

    function contextmenuListener(event) {
      event.preventDefault();
    };

    /**
     * This function removes the existing tooltip and creates a new tooltip for a
     * specified node or edge.
     *
     * @param {object}    o          The node or the edge.
     * @param {object}    options    The options related to the object.
     * @param {number}    x          The X coordinate of the mouse.
     * @param {number}    y          The Y coordinate of the mouse.
     * @param {function?} onComplete Optional function called when open finish
     */
    this.open = function(o, options, x, y, onComplete) {
      remove();

      // Create the DOM element:
      _tooltip = document.createElement('div');
      if (options.renderer) {
        // Copy the object:
        var clone = Object.create(null),
            tooltipRenderer,
            type,
            k;
        for (k in o)
          clone[k] = o[k];

        tooltipRenderer = options.renderer.call(s.graph, clone, options.template);

        type = typeof tooltipRenderer;

        if (type === 'undefined') return;

        if (type === 'string') {
           _tooltip.innerHTML = tooltipRenderer;
        }
        else {
          // tooltipRenderer is a dom element:
          _tooltip.appendChild(tooltipRenderer);
        }
      }
      else {
        _tooltip.innerHTML = options.template;
      }

      var containerPosition = window.getComputedStyle(renderer.container).position;

      if(containerPosition !== 'static') {
        _tooltip.style.position = 'absolute';
        var containerRect = renderer.container.getBoundingClientRect();
        x = ~~(x - containerRect.left);
        y = ~~(y - containerRect.top);
      }


      // Style it:
      _tooltip.className = options.cssClass;

      if (options.position !== 'css') {
        if(containerPosition === 'static') {
          _tooltip.style.position = 'absolute';
        }

        // Default position is mouse position:
        _tooltip.style.left = x + 'px';
        _tooltip.style.top = y + 'px';
      }

      _tooltip.addEventListener('mouseenter', function() {
        _mouseOverTooltip = true;
      }, false);

      _tooltip.addEventListener('mouseleave', function() {
        _mouseOverTooltip = false;
      }, false);

      // Execute after rendering:
      setTimeout(function() {
        if (!_tooltip)
          return;

        // Insert the element in the DOM:
        renderer.container.appendChild(_tooltip);

        // Find offset:
        var bodyRect = document.body.getBoundingClientRect(),
            tooltipRect = _tooltip.getBoundingClientRect(),
            offsetTop =  tooltipRect.top - bodyRect.top,
            offsetBottom = bodyRect.bottom - tooltipRect.bottom,
            offsetLeft =  tooltipRect.left - bodyRect.left,
            offsetRight = bodyRect.right - tooltipRect.right;

        if (options.position === 'top') {
          // New position vertically aligned and on top of the mouse:
          _tooltip.className = options.cssClass + ' top';
          _tooltip.style.left = x - (tooltipRect.width / 2) + 'px';
          _tooltip.style.top = y - tooltipRect.height + 'px';
        }
        else if (options.position === 'bottom') {
          // New position vertically aligned and on bottom of the mouse:
          _tooltip.className = options.cssClass + ' bottom';
          _tooltip.style.left = x - (tooltipRect.width / 2) + 'px';
          _tooltip.style.top = y + 'px';
        }
        else if (options.position === 'left') {
          // New position vertically aligned and on bottom of the mouse:
          _tooltip.className = options.cssClass+ ' left';
          _tooltip.style.left = x - tooltipRect.width + 'px';
          _tooltip.style.top = y - (tooltipRect.height / 2) + 'px';
        }
        else if (options.position === 'right') {
          // New position vertically aligned and on bottom of the mouse:
          _tooltip.className = options.cssClass + ' right';
          _tooltip.style.left = x + 'px';
          _tooltip.style.top = y - (tooltipRect.height / 2) + 'px';
        }

        // Adjust position to keep the tooltip inside body:
        // FIXME: doesn't work on Firefox
        if (options.autoadjust) {

          // Update offset
          tooltipRect = _tooltip.getBoundingClientRect();
          offsetTop = tooltipRect.top - bodyRect.top;
          offsetBottom = bodyRect.bottom - tooltipRect.bottom;
          offsetLeft = tooltipRect.left - bodyRect.left;
          offsetRight = bodyRect.right - tooltipRect.right;

          if (offsetBottom < 0) {
            _tooltip.className = options.cssClass;
            if (options.position === 'top' || options.position === 'bottom') {
              _tooltip.className = options.cssClass + ' top';
            }
            _tooltip.style.top = y - tooltipRect.height + 'px';
          }
          else if (offsetTop < 0) {
            _tooltip.className = options.cssClass;
            if (options.position === 'top' || options.position === 'bottom') {
              _tooltip.className = options.cssClass + ' bottom';
            }
            _tooltip.style.top = y + 'px';
          }
          if (offsetRight < 0) {
            //! incorrect tooltipRect.width on non fixed width element.
            _tooltip.className = options.cssClass;
            if (options.position === 'left' || options.position === 'right') {
              _tooltip.className = options.cssClass + ' left';
            }
            _tooltip.style.left = x - tooltipRect.width + 'px';
          }
          else if (offsetLeft < 0) {
            _tooltip.className = options.cssClass;
            if (options.position === 'left' || options.position === 'right') {
              _tooltip.className = options.cssClass + ' right';
            }
            _tooltip.style.left = x + 'px';
          }
        }
        if (onComplete) onComplete();
      }, 0);
    };

    /**
     * This function removes the tooltip element from the DOM.
     */
    function remove() {
      if (_tooltip && _tooltip.parentNode) {
        // Remove from the DOM:
        _tooltip.parentNode.removeChild(_tooltip);
        _tooltip = null;
      }
    };

    /**
     * This function clears all timeouts related to the tooltip
     * and removes the tooltip.
     */
    function cancel() {
      clearTimeout(_timeoutHandle);
      clearTimeout(_timeoutHideHandle);
      _timeoutHandle = false;
      _timeoutHideHandle = false;
      remove();
    };

    /**
     * Similar to cancel() but can be delayed.
     *
     * @param {number} delay. The delay in miliseconds.
     */
    function delayedCancel(delay) {
      clearTimeout(_timeoutHandle);
      clearTimeout(_timeoutHideHandle);
      _timeoutHandle = false;
      _timeoutHideHandle = setTimeout(function() {
        if (!_mouseOverTooltip) remove();
      }, delay);
    };

    // INTERFACE:
    this.close = function() {
      cancel();
      this.dispatchEvent('hidden');
      return this;
    };

    this.kill = function() {
      this.unbindEvents();
      clearTimeout(_timeoutHandle);
      clearTimeout(_timeoutHideHandle);
      _tooltip = null;
      _timeoutHandle = null;
      _timeoutHideHandle = null;
      _doubleClick = false;
      _stageTooltips = [];
      _nodeTooltips = [];
      _edgeTooltips = [];
    };

    this.unbindEvents = function() {
      var tooltips = _stageTooltips.concat(_nodeTooltips).concat(_edgeTooltips);

      for (var i = 0; i < tooltips.length; i++) {
        s.unbind(tooltips[i].show);
        s.unbind(tooltips[i].hide);

        if (tooltips[i].show === 'rightClickNode' || tooltips[i].show === 'rightClickEdge') {
          renderer.container.removeEventListener(
            'contextmenu',
            contextmenuListener
          );
        }
      }
      // Remove the default event handlers
      s.unbind('doubleClickStage');
      s.unbind('doubleClickNode');
      s.unbind('doubleClickEdge');
    };

    this.bindStageEvents = function(tooltip) {
      s.bind(tooltip.show, function(event) {
        if (tooltip.show !== 'doubleClickStage' && _doubleClick) {
          return;
        }

        var clientX = event.data.captor.clientX,
            clientY = event.data.captor.clientY;

        clearTimeout(_timeoutHandle);
        _timeoutHandle = setTimeout(function() {
          self.open(
            null,
            tooltip,
            clientX,
            clientY,
            self.dispatchEvent.bind(self,'shown', event.data));
        }, tooltip.delay);
      });

      s.bind(tooltip.hide, function(event) {
        var p = _tooltip;
        delayedCancel(settings.stage.hideDelay);
        if (p)
          self.dispatchEvent('hidden', event.data);
      });
    };

    this.bindNodeEvents = function(tooltip) {
      s.bind(tooltip.show, function(event) {
        if (tooltip.show !== 'doubleClickNode' && _doubleClick) {
          return;
        }

        var n = event.data.node;
        if (!n && event.data.enter) {
          n = event.data.enter.nodes[0];
        }
        if (n == undefined) return;

        var clientX = event.data.captor.clientX,
            clientY = event.data.captor.clientY;

        clearTimeout(_timeoutHandle);
        _timeoutHandle = setTimeout(function() {
          self.open(
            n,
            tooltip,
            clientX,
            clientY,
            self.dispatchEvent.bind(self,'shown', event.data));
        }, tooltip.delay);
      });

      s.bind(tooltip.hide, function(event) {
        if (event.data.leave && event.data.leave.nodes.length == 0)
          return
        var p = _tooltip;
        delayedCancel(settings.node.hideDelay);
        if (p)
          self.dispatchEvent('hidden', event.data);
      });
    };

    this.bindEdgeEvents = function(tooltip) {
      s.bind(tooltip.show, function(event) {
        if (tooltip.show !== 'doubleClickEdge' && _doubleClick) {
          return;
        }

        var e = event.data.edge;
        if (!e && event.data.enter) {
          e = event.data.enter.edges[0];
        }
        if (e == undefined) return;

        var clientX = event.data.captor.clientX,
            clientY = event.data.captor.clientY;

        clearTimeout(_timeoutHandle);
        _timeoutHandle = setTimeout(function() {
          self.open(
            e,
            tooltip,
            clientX,
            clientY,
            self.dispatchEvent.bind(self,'shown', event.data));
        }, tooltip.delay);
      });

      s.bind(tooltip.hide, function(event) {
        if (event.data.leave && event.data.leave.edges.length == 0)
          return
        var p = _tooltip;
        delayedCancel(settings.edge.hideDelay);
        if (p)
          self.dispatchEvent('hidden', event.data);
      });
    };

    // STAGE tooltip:
    if (options.stage) {
      var hasDoubleClickStage = false;

      for (var i = 0; i < _stageTooltips.length; i++) {
        if (_stageTooltips[i].renderer !== null &&
            typeof _stageTooltips[i].renderer !== 'function')
          throw new TypeError('"options.stage.renderer" is not a function, was ' + _stageTooltips[i].renderer);

        if (_stageTooltips[i].position !== undefined) {
          if (_stageTooltips[i].position !== 'top' &&
              _stageTooltips[i].position !== 'bottom' &&
              _stageTooltips[i].position !== 'left' &&
              _stageTooltips[i].position !== 'right' &&
              _stageTooltips[i].position !== 'css') {
            throw new Error('"options.position" is not "top", "bottom", "left", "right", or "css", was ' + _stageTooltips[i].position);
          }
        }

        if (_stageTooltips[i].show === 'doubleClickStage') {
          hasDoubleClickStage = true;
        }
      }

      for (var i = 0; i < _stageTooltips.length; i++) {
        this.bindStageEvents(_stageTooltips[i]);
      }

      if (!hasDoubleClickStage) {
        s.bind('doubleClickStage', function(event) {
          cancel();
          _doubleClick = true;
          self.dispatchEvent('hidden', event.data);
          setTimeout(function() {
            _doubleClick = false;
          }, settings.doubleClickDelay);
        });
      }
    }

    // NODE tooltip:
    if (options.node) {
      var hasRightClickNode = false;
      var hasDoubleClickNode = false;

      for (var i = 0; i < _nodeTooltips.length; i++) {
        if (_nodeTooltips[i].renderer !== null &&
            typeof _nodeTooltips[i].renderer !== 'function')
          throw new TypeError('"options.node.renderer" is not a function, was ' + _nodeTooltips[i].renderer);

        if (_nodeTooltips[i].position !== undefined) {
          if (_nodeTooltips[i].position !== 'top' &&
              _nodeTooltips[i].position !== 'bottom' &&
              _nodeTooltips[i].position !== 'left' &&
              _nodeTooltips[i].position !== 'right' &&
              _nodeTooltips[i].position !== 'css') {
            throw new Error('"options.position" is not "top", "bottom", "left", "right", or "css", was ' + _nodeTooltips[i].position);
          }
        }

        if (_nodeTooltips[i].show === 'doubleClickNode') {
          hasDoubleClickNode = true;
        } else if (_nodeTooltips[i].show === 'rightClickNode') {
          hasRightClickNode = true;
        }
      }

      for (var i = 0; i < _nodeTooltips.length; i++) {
        this.bindNodeEvents(_nodeTooltips[i]);
      }

      if (!hasDoubleClickNode) {
        s.bind('doubleClickNode', function(event) {
          cancel();
          _doubleClick = true;
          self.dispatchEvent('hidden', event.data);
          setTimeout(function() {
            _doubleClick = false;
          }, settings.doubleClickDelay);
        });
      }
    }

    // EDGE tooltip:
    if (options.edge) {
      var hasRightClickEdge = false;
      var hasDoubleClickEdge = false;

      for (var i = 0; i < _edgeTooltips.length; i++) {
        if (_edgeTooltips[i].renderer !== null &&
            typeof _edgeTooltips[i].renderer !== 'function')
          throw new TypeError('"options.edge.renderer" is not a function, was ' + _edgeTooltips[i].renderer);

        if (_edgeTooltips[i].position !== undefined) {
          if (_edgeTooltips[i].position !== 'top' &&
              _edgeTooltips[i].position !== 'bottom' &&
              _edgeTooltips[i].position !== 'left' &&
              _edgeTooltips[i].position !== 'right' &&
              _edgeTooltips[i].position !== 'css') {
            throw new Error('"options.position" is not "top", "bottom", "left", "right", or "css", was ' + _edgeTooltips[i].position);
          }
        }

        if (_edgeTooltips[i].show === 'doubleClickEdge') {
          hasDoubleClickEdge = true;
        } else if (_edgeTooltips[i].show === 'rightClickEdge') {
          hasRightClickEdge = true;
        }
      }

      for (var i = 0; i < _edgeTooltips.length; i++) {
        this.bindEdgeEvents(_edgeTooltips[i]);
      }

      if (!hasDoubleClickEdge) {
        s.bind('doubleClickEdge', function(event) {
          cancel();
          _doubleClick = true;
          self.dispatchEvent('hidden', event.data);
          setTimeout(function() {
            _doubleClick = false;
          }, settings.doubleClickDelay);
        })
      }
    }

    // Prevent the browser context menu to appear
    // if the right click event is already handled:
    if (hasRightClickNode || hasRightClickEdge) {
      renderer.container.addEventListener(
        'contextmenu',
        contextmenuListener
      );
    }
  };

  /**
   * Interface
   * ------------------
   */
  var _instance = {};

  /**
   * @param {sigma}    s        The related sigma instance.
   * @param {renderer} renderer The related sigma renderer.
   * @param {object}   options  An object with options.
   */
  sigma.plugins.tooltips = function(s, renderer, options) {
    // Create object if undefined
    if (!_instance[s.id]) {
      _instance[s.id] = new Tooltips(s, renderer, options);
    }
    return _instance[s.id];
  };

  /**
   *  This function kills the tooltips instance.
   */
  sigma.plugins.killTooltips = function(s) {
    if (_instance[s.id] instanceof Tooltips) {
      _instance[s.id].kill();
    }
    delete _instance[s.id];
  };

}).call(window);

(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  sigma.utils.pkg('sigma.plugins');

  var _id = 0,
      _cache = {};

  /**
   * This function will change size for all nodes depending to their degree
   *
   * @param  {sigma}   s       		The related sigma instance.
   * @param  {object}  initialSize 	Start size property
   */
  sigma.plugins.relativeSize = function(s, initialSize) {
    var nodes = s.graph.nodes();

    // second create size for every node
    for(var i = 0; i < nodes.length; i++) {
      var degree = s.graph.degree(nodes[i].id);
      nodes[i].size = initialSize * Math.sqrt(degree);
    }
    s.refresh();
  };
}).call(window);

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size..
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.dashed =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel');

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    context.setLineDash([8,3]);
    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();

    // draw label with a background
    if (sigma.canvas.edges.labels) {
      edge.hover = true;
      sigma.canvas.edges.labels.def(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size..
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.dotted =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel');

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    context.setLineDash([2]);
    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();

    // draw label with a background
    if (sigma.canvas.edges.labels) {
      edge.hover = true;
      sigma.canvas.edges.labels.def(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size..
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.parallel =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel'),
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        c,
        d,
        dist = sigma.utils.getDistance(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    // Intersection points of the source node circle:
    c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

    // Intersection points of the target node circle:
    d = sigma.utils.getCircleIntersection(tX, tY, size, sX, sY, dist);

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(c.xi, c.yi);
    context.lineTo(d.xi_prime, d.yi_prime);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(c.xi_prime, c.yi_prime);
    context.lineTo(d.xi, d.yi);
    context.closePath();
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();

    // draw label with a background
    if (sigma.canvas.edges.labels) {
      edge.hover = true;
      sigma.canvas.edges.labels.def(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.tapered =
    function(edge, source, target, context, settings) {
    // The goal is to draw a triangle where the target node is a point of
    // the triangle, and the two other points are the intersection of the
    // source circle and the circle (target, distance(source, target)).
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        prefix = settings('prefix') || '',
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel'),
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        dist = sigma.utils.getDistance(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    // Intersection points:
    var c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    // Turn transparency on:
    context.globalAlpha = 0.65;

    // Draw the triangle:
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(tX, tY);
    context.lineTo(c.xi, c.yi);
    context.lineTo(c.xi_prime, c.yi_prime);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();

    // draw label with a background
    if (sigma.canvas.edges.labels) {
      edge.hover = true;
      sigma.canvas.edges.labels.def(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This method renders the edge as a dashed line.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.dashed = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level;

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.setLineDash([8,3]);
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This method renders the edge as a dotted line.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.dotted = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level;

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.setLineDash([2]);
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This method renders the edge as two parallel lines.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.parallel = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level,
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        c,
        d,
        dist = sigma.utils.getDistance(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    // Intersection points of the source node circle:
    c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

    // Intersection points of the target node circle:
    d = sigma.utils.getCircleIntersection(tX, tY, size, sX, sY, dist);

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.lineWidth = size;
    context.beginPath();
    context.moveTo(c.xi, c.yi);
    context.lineTo(d.xi_prime, d.yi_prime);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(c.xi_prime, c.yi_prime);
    context.lineTo(d.xi, d.yi);
    context.closePath();
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This method renders the edge as a tapered line.
   * Danny Holten, Petra Isenberg, Jean-Daniel Fekete, and J. Van Wijk (2010)
   * Performance Evaluation of Tapered, Curved, and Animated Directed-Edge
   * Representations in Node-Link Graphs. Research Report, Sep 2010.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.tapered = function(edge, source, target, context, settings) {
    // The goal is to draw a triangle where the target node is a point of
    // the triangle, and the two other points are the intersection of the
    // source circle and the circle (target, distance(source, target)).
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        prefix = settings('prefix') || '',
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level,
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        dist = sigma.utils.getDistance(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    // Intersection points:
    var c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (edge.active) {
      context.fillStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.fillStyle = color;
    }

    // Turn transparency on:
    context.globalAlpha = 0.65;

    // Draw the triangle:
    context.beginPath();
    context.moveTo(tX, tY);
    context.lineTo(c.xi, c.yi);
    context.lineTo(c.xi_prime, c.yi_prime);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();
  };
})();

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.settings');

  /**
  * Extended sigma settings for sigma.renderers.edgeLabels.
  */
  var settings = {
    /**
     * RENDERERS SETTINGS:
     * *******************
     */
    // {string} Indicates how to choose the edge labels color. Available values:
    //          "edge", "default"
    edgelabelColor: 'default',
    // {string}
    defaultEdgeLabelColor: '#000',
    // {string}
    defaultEdgeLabelActiveColor: '#000',
    // {string}
    defaultEdgeLabelSize: 10,
    // {string} Indicates how to choose the edge labels size. Available values:
    //          "fixed", "proportional"
    edgeLabelSize: 'fixed',
    // {string} Label position relative to its edge. Available values:
    //          "auto", "horizontal"
    edgeLabelAlignment: 'auto',
    // {string} The opposite power ratio between the font size of the label and
    // the edge size:
    // Math.pow(size, -1 / edgeLabelSizePowRatio) * size * defaultEdgeLabelSize
    edgeLabelSizePowRatio: 1,
    // {number} The minimum size an edge must have to see its label displayed.
    edgeLabelThreshold: 1,
    // {string}
    defaultEdgeHoverLabelBGColor: '#fff',
    // {string} Indicates how to choose the hovered edge labels color.
    //          Available values: "edge", "default"
    edgeLabelHoverBGColor: 'default',
    // {string} Indicates how to choose the hovered edges shadow color.
    //          Available values: "edge", "default"
    edgeLabelHoverShadow: 'default',
    // {string}
    edgeLabelHoverShadowColor: '#000'
  };

  // Export the previously designed settings:
  sigma.settings = sigma.utils.extend(sigma.settings || {}, settings);

  // Override default settings:
  sigma.settings.drawEdgeLabels = true;

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.edges.labels');

  /**
   * This label renderer will just display the label on the curve of the edge.
   * The label is rendered at half distance of the edge extremities, and is
   * always oriented from left to right on the top side of the curve.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.labels.curve =
    function(edge, source, target, context, settings) {
    if (typeof edge.label !== 'string')
      return;

    var prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1;

    if (size < settings('edgeLabelThreshold') && !edge.hover)
      return;

    if (0 === settings('edgeLabelSizePowRatio'))
      throw new Error('Invalid setting: "edgeLabelSizePowRatio" is equal to 0.');

    var fontSize,
        sSize = source[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        dX = tX - sX,
        dY = tY - sY,
        sign = (sX < tX) ? 1 : -1,
        cp = {},
        c,
        angle = 0,
        t = 0.5,  //length of the curve
        fontStyle = edge.hover ?
          (settings('hoverFontStyle') || settings('fontStyle')) :
          settings('fontStyle');

    if (source.id === target.id) {
      cp = sigma.utils.getSelfLoopControlPoints(sX, sY, sSize);
      c = sigma.utils.getPointOnBezierCurve(
        t, sX, sY, tX, tY, cp.x1, cp.y1, cp.x2, cp.y2
      );
    } else {
      cp = sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY, edge.cc);
      c = sigma.utils.getPointOnQuadraticCurve(t, sX, sY, tX, tY, cp.x, cp.y);
    }

    // The font size is sublineraly proportional to the edge size, in order to
    // avoid very large labels on screen.
    // This is achieved by f(x) = x * x^(-1/ a), where 'x' is the size and 'a'
    // is the edgeLabelSizePowRatio. Notice that f(1) = 1.
    // The final form is:
    // f'(x) = b * x * x^(-1 / a), thus f'(1) = b. Application:
    // fontSize = defaultEdgeLabelSize if edgeLabelSizePowRatio = 1
    fontSize = (settings('edgeLabelSize') === 'fixed') ?
      settings('defaultEdgeLabelSize') :
      settings('defaultEdgeLabelSize') *
      size *
      Math.pow(size, -1 / settings('edgeLabelSizePowRatio'));

    context.save();

    if (edge.active) {
      context.font = [
        settings('activeFontStyle') || settings('fontStyle'),
        fontSize + 'px',
        settings('activeFont') || settings('font')
      ].join(' ');
    }
    else {
      context.font = [
        fontStyle,
        fontSize + 'px',
        settings('font')
      ].join(' ');
    }

    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';

    // force horizontal alignment if not enough space to draw the text,
    // otherwise draw text along the edge curve:
    if ('auto' === settings('edgeLabelAlignment')) {
      if (source.id === target.id) {
        angle = Math.atan2(1, 1); // 45°
      } else {
        var
          labelWidth = sigma.utils.canvas.getTextWidth(context,
            settings('approximateLabelWidth'), fontSize, edge.label),
          edgeLength = sigma.utils.getDistance(
            source[prefix + 'x'],
            source[prefix + 'y'],
            target[prefix + 'x'],
            target[prefix + 'y']);

          // reduce node sizes + constant
          edgeLength = edgeLength - source[prefix + 'size'] - target[prefix + 'size'] - 10;

        if (labelWidth < edgeLength) {
          angle = Math.atan2(dY * sign, dX * sign);
        }
      }
    }

    if (edge.hover) {
      // Label background:
      context.fillStyle = settings('edgeLabelHoverBGColor') === 'edge' ?
        (edge.color || settings('defaultEdgeColor')) :
        settings('defaultEdgeHoverLabelBGColor');

      if (settings('edgeLabelHoverShadow')) {
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 8;
        context.shadowColor = settings('edgeLabelHoverShadowColor');
      }

      drawBackground(angle, context, fontSize, size, edge.label, c.x, c.y);

      if (settings('edgeLabelHoverShadow')) {
        context.shadowBlur = 0;
        context.shadowColor = '#000';
      }
    }

    if (edge.active) {
      context.fillStyle =
        settings('edgeActiveColor') === 'edge' ?
        (edge.active_color || settings('defaultEdgeActiveColor')) :
        settings('defaultEdgeLabelActiveColor');
    }
    else {
      context.fillStyle =
        (settings('edgeLabelColor') === 'edge') ?
        (edge.color || settings('defaultEdgeColor')) :
        settings('defaultEdgeLabelColor');
    }

    context.translate(c.x, c.y);
    context.rotate(angle);
    context.fillText(
      edge.label,
      0,
      (-size / 2) - 3
    );

    context.restore();

    function drawBackground(angle, context, fontSize, size, label, x, y) {
      var w = Math.round(
            sigma.utils.canvas.getTextWidth(context,
                settings('approximateLabelWidth'), fontSize, label) +
            size + 1.5 + fontSize / 3
          ),
          h = fontSize + 4;

      context.save();
      context.beginPath();

      // draw a rectangle for the label
      context.translate(x, y);
      context.rotate(angle);
      context.rect(-w / 2, -h -size/2, w, h);

      context.closePath();
      context.fill();
      context.restore();
    }
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.edges.labels');

  /**
   * This label renderer will just display the label on the curve of the edge.
   * The label is rendered at half distance of the edge extremities, and is
   * always oriented from left to right on the top side of the curve.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.labels.curvedArrow =
    function(edge, source, target, context, settings) {
    sigma.canvas.edges.labels.curve(edge, source, target, context, settings);
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.edges.labels');

  /**
   * This label renderer will just display the label on the line of the edge.
   * The label is rendered at half distance of the edge extremities, and is
   * always oriented from left to right on the top side of the line.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   * @param  {object?}                  infos        The current batch infos.
   */
  sigma.canvas.edges.labels.def =
    function(edge, source, target, context, settings, infos) {
    if (typeof edge.label !== 'string' || source == target)
      return;

    var prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1;

    if (size < settings('edgeLabelThreshold') && !edge.hover)
      return;

    if (0 === settings('edgeLabelSizePowRatio'))
      throw new Error('Invalid setting: "edgeLabelSizePowRatio" is equal to 0.');

    var fontSize,
        angle = 0,
        fontStyle = edge.hover ?
          (settings('hoverFontStyle') || settings('fontStyle')) :
          settings('fontStyle'),
        x = (source[prefix + 'x'] + target[prefix + 'x']) / 2,
        y = (source[prefix + 'y'] + target[prefix + 'y']) / 2,
        dX, dY, sign;

    // The font size is sublineraly proportional to the edge size, in order to
    // avoid very large labels on screen.
    // This is achieved by f(x) = x * x^(-1/ a), where 'x' is the size and 'a'
    // is the edgeLabelSizePowRatio. Notice that f(1) = 1.
    // The final form is:
    // f'(x) = b * x * x^(-1 / a), thus f'(1) = b. Application:
    // fontSize = defaultEdgeLabelSize if edgeLabelSizePowRatio = 1

    fontSize = (settings('edgeLabelSize') === 'fixed') ?
      settings('defaultEdgeLabelSize') :
      settings('defaultEdgeLabelSize') *
      size *
      Math.pow(size, -1 / settings('edgeLabelSizePowRatio'));

    var new_font = [
        fontStyle,
        fontSize + 'px',
        settings('font')
      ].join(' ');
    if (edge.active) {
     new_font = [
        settings('activeFontStyle') || settings('fontStyle'),
        fontSize + 'px',
        settings('activeFont') || settings('font')
      ].join(' ');
    }

    if (infos && infos.ctx.font != new_font) { //use font value caching
      context.font = new_font;
      infos.ctx.font = new_font;
    } else {
      context.font = new_font;
    }

    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';

    // force horizontal alignment if not enough space to draw the text,
    // otherwise draw text along the edge line:
    if ('auto' === settings('edgeLabelAlignment')) {
      var labelWidth = sigma.utils.canvas.getTextWidth(context,
            settings('approximateLabelWidth'), fontSize, edge.label)
      var edgeLength = sigma.utils.getDistance(
          source[prefix + 'x'],
          source[prefix + 'y'],
          target[prefix + 'x'],
          target[prefix + 'y']);

        // reduce node sizes + constant
        edgeLength = edgeLength - source[prefix + 'size'] - target[prefix + 'size'] - 10;

      if (labelWidth < edgeLength) {
        dX = target[prefix + 'x'] - source[prefix + 'x'];
        dY = target[prefix + 'y'] - source[prefix + 'y'];
        sign = (source[prefix + 'x'] < target[prefix + 'x']) ? 1 : -1;
        angle = Math.atan2(dY * sign, dX * sign);
      }
    }

    if (edge.hover) {
      // Label background:
      context.fillStyle = settings('edgeLabelHoverBGColor') === 'edge' ?
        (edge.color || settings('defaultEdgeColor')) :
        settings('defaultEdgeHoverLabelBGColor');

      if (settings('edgeLabelHoverShadow')) {
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 8;
        context.shadowColor = settings('edgeLabelHoverShadowColor');
      }

      drawBackground(angle, context, fontSize, size, edge.label, x, y);

      if (settings('edgeLabelHoverShadow')) {
        context.shadowBlur = 0;
        context.shadowColor = '#000';
      }
    }

    if (edge.active) {
      context.fillStyle =
        settings('edgeActiveColor') === 'edge' ?
        (edge.active_color || settings('defaultEdgeActiveColor')) :
        settings('defaultEdgeLabelActiveColor');
    }
    else {
      context.fillStyle =
        (settings('edgeLabelColor') === 'edge') ?
        (edge.color || settings('defaultEdgeColor')) :
        settings('defaultEdgeLabelColor');
    }

    context.translate(x, y);
    context.rotate(angle);
    context.fillText(
      edge.label,
      0,
      (-size / 2) - 3
    );
    context.rotate(-angle);
    context.translate(-x, -y);

  function drawBackground(angle, context, fontSize, size, label, x, y) {
    var w = Math.round(
          sigma.utils.canvas.getTextWidth(context,
            settings('approximateLabelWidth'), fontSize, label) +
          size + 1.5 + fontSize / 3
        ),
        h = fontSize + 4;

    context.save();
    context.beginPath();

    // draw a rectangle for the label
    context.translate(x, y);
    context.rotate(angle);
    context.rect(-w / 2, -h - size / 2, w, h);

    context.closePath();
    context.fill();
    context.restore();
  }    
  };
}).call(this);
;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.svg.edges.labels');

  /**
   * The label renderer for curved edges. It renders the label as a simple text.
   */
  sigma.svg.edges.labels.curve = {

    /**
     * SVG Element creation.
     *
     * @param  {object}                   edge       The edge object.
     * @param  {configurable}             settings   The settings function.
     */
    create: function(edge, settings) {
      var prefix = settings('prefix') || '',
          size = edge[prefix + 'size'],
          text = document.createElementNS(settings('xmlns'), 'text');

      var fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;

      var fontColor = (settings('edgeLabelColor') === 'edge') ?
        (edge.color || settings('defaultEdgeColor')) :
        settings('defaultEdgeLabelColor');

      text.setAttributeNS(null, 'data-label-target', edge.id);
      text.setAttributeNS(null, 'class', settings('classPrefix') + '-label');
      text.setAttributeNS(null, 'font-size', fontSize);
      text.setAttributeNS(null, 'font-family', settings('font'));
      text.setAttributeNS(null, 'fill', fontColor);

      text.innerHTML = edge.label;
      text.textContent = edge.label;

      return text;
    },

    /**
     * SVG Element update.
     *
     * @param  {object}                   edge     The edge object.
     * @param  {object}                   source   The source node object.
     * @param  {object}                   target   The target node object.
     * @param  {DOMElement}               text     The label DOM element.
     * @param  {configurable}             settings The settings function.
     */
    update: function(edge, source, target, text, settings) {
      var prefix = settings('prefix') || '',
          size = edge[prefix + 'size'],
          sSize = source[prefix + 'size'],
          x = Math.round((source[prefix + 'x'] + target[prefix + 'x']) / 2),
          y = Math.round((source[prefix + 'y'] + target[prefix + 'y']) / 2),
          sX = source[prefix + 'x'],
          sY = source[prefix + 'y'],
          tX = target[prefix + 'x'],
          tY = target[prefix + 'y'],
          dX = tX - sX,
          dY = tY - sY,
          translateY = 0,
          sign = (sX < tX) ? 1 : -1,
          angle = 0,
          t = 0.5,  //length of the curve
          cp = {},
          c,
          fontSize = (settings('labelSize') === 'fixed') ?
          settings('defaultLabelSize') :
          settings('labelSizeRatio') * size;

      // Case when we don't want to display the label
      if (!settings('forceLabels') && size < settings('edgeLabelThreshold'))
        return;

      if (typeof edge.label !== 'string')
        return;

      if (source.id === target.id) {
        cp = sigma.utils.getSelfLoopControlPoints(sX, sY, sSize);
        c = sigma.utils.getPointOnBezierCurve(
          t, sX, sY, tX, tY, cp.x1, cp.y1, cp.x2, cp.y2
        );
      } else {
        cp = sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY, edge.cc);
        c = sigma.utils.getPointOnQuadraticCurve(t, sX, sY, tX, tY, cp.x, cp.y);
      }

      if ('auto' === settings('edgeLabelAlignment')) {
        translateY = -1 - size;
        if (source.id === target.id) {
          angle = 45; // deg
        }
        else {
          angle = Math.atan2(dY * sign, dX * sign) * (180 / Math.PI); // deg
        }
      }

      // Updating
      text.setAttributeNS(null, 'x', c.x);
      text.setAttributeNS(null, 'y', c.y);
      text.setAttributeNS(
        null,
        'transform',
        'rotate('+angle+' '+c.x+' '+c.y+') translate(0 '+translateY+')'
      );

      // Showing
      text.style.display = '';

      return this;
    }
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.svg.edges.labels');

  /**
   * The label renderer for curved arrow edges. It renders the label as a simple text.
   */
  sigma.svg.edges.labels.curvedArrow = sigma.svg.edges.labels.curve;

}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.svg.edges.labels');

  /**
   * The default edge label renderer. It renders the label as a simple text.
   */
  sigma.svg.edges.labels.def = {

    /**
     * SVG Element creation.
     *
     * @param  {object}                   edge       The edge object.
     * @param  {configurable}             settings   The settings function.
     */
    create: function(edge, settings) {
      var prefix = settings('prefix') || '',
          size = edge[prefix + 'size'],
          text = document.createElementNS(settings('xmlns'), 'text');

      var fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;

      var fontColor = (settings('edgeLabelColor') === 'edge') ?
        (edge.color || settings('defaultEdgeColor')) :
        settings('defaultEdgeLabelColor');

      text.setAttributeNS(null, 'data-label-target', edge.id);
      text.setAttributeNS(null, 'class', settings('classPrefix') + '-label');
      text.setAttributeNS(null, 'font-size', fontSize);
      text.setAttributeNS(null, 'font-family', settings('font'));
      text.setAttributeNS(null, 'fill', fontColor);

      text.innerHTML = edge.label;
      text.textContent = edge.label;

      return text;
    },

    /**
     * SVG Element update.
     *
     * @param  {object}                   edge     The edge object.
     * @param  {object}                   source   The source node object.
     * @param  {object}                   target   The target node object.
     * @param  {DOMElement}               text     The label DOM element.
     * @param  {configurable}             settings The settings function.
     */
    update: function(edge, source, target, text, settings) {
      var prefix = settings('prefix') || '',
          size = edge[prefix + 'size'],
          x = Math.round((source[prefix + 'x'] + target[prefix + 'x']) / 2),
          y = Math.round((source[prefix + 'y'] + target[prefix + 'y']) / 2),
          dX,
          dY,
          tY = 0,
          sign,
          angle = 0,
          fontSize = (settings('labelSize') === 'fixed') ?
          settings('defaultLabelSize') :
          settings('labelSizeRatio') * size;

      if (source.id === target.id)
        return;

      // Case when we don't want to display the label
      if (!settings('forceLabels') && size < settings('edgeLabelThreshold'))
        return;

      if (typeof edge.label !== 'string')
        return;

      if ('auto' === settings('edgeLabelAlignment')) {
        dX = target[prefix + 'x'] - source[prefix + 'x'];
        dY = target[prefix + 'y'] - source[prefix + 'y'];
        sign = (source[prefix + 'x'] < target[prefix + 'x']) ? 1 : -1;
        angle = Math.atan2(dY * sign, dX * sign) * (180 / Math.PI); // deg
        tY = Math.round(-1 - size);
      }

      // Updating
      text.setAttributeNS(null, 'x', x);
      text.setAttributeNS(null, 'y', y);
      text.setAttributeNS(null, 'transform', 'rotate('+angle+' '+x+' '+y+') translate(0 '+tY+')');

      // Showing
      text.style.display = '';

      return this;
    }
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma.renderers.glyphs: sigma not in scope.';

  // Initialize package:
  sigma.utils.pkg('sigma.settings');

  /**
  * Extended sigma settings.
  */
  var settings = {
    // {number} The glyph size ratio compared to the node size.
    glyphScale: 0.5,
    // {string} The glyph background-color.
    glyphFillColor: 'white',
    // {string} The glyph text-color.
    glyphTextColor: 'black',
    // {string} The glyph border-color.
    glyphStrokeColor: 'black',
    // {number} The glyph border-width in pixels.
    glyphLineWidth: 2,
    // {string} The glyph text font-family. Should be included if needed with
    // @font-face or equivalent.
    glyphFont: 'Arial',
    // {string} The glyph text font-style.
    glyphFontStyle: 'normal',
    // {number} The font size ratio compared to the glyph size.
    glyphFontScale: 1,
    // {number} The minimum size a node must have to see its glyph text displayed.
    glyphTextThreshold: 7,
    // {boolean} A flag to display glyph strokes only if its text is displayed.
    glyphStrokeIfText: false,
    // {number} The minimum size a node must have to see its glyph displayed.
    glyphThreshold: 1,
    // {boolean} A flag to display glyphs or not.
    drawGlyphs: true
  };

  // Export the previously designed settings:
  sigma.settings = sigma.utils.extend(sigma.settings || {}, settings);

}).call(this);

;(function(undefined) {
  "use strict";

  /**
   * Sigma Renderer Glyphs Utility
   * ================================
   *
   * The aim of this plugin is to display customized glyphs around a node,
   * at four possible positions.
   *
   * Author: Florent Schildknecht (Flo-Schield-Bobby)
   * Version: 0.0.1
   */
  if (typeof sigma === 'undefined') {
    throw 'sigma is not declared';
  }

  // Utility function
  function degreesToRadians (degrees) {
    return degrees * Math.PI / 180;
  }

  function resolve (param, thisArg) {
    if (typeof param === 'function') {
      return param.call(thisArg);
    }
    return param;
  }

  // Main method: create glyphs canvas and append it to the scene
  function glyphs (params) {
    params = params || {};

    var defFont = params.font || this.settings('glyphFont'),
        defFontStyle = params.fontStyle || this.settings('glyphFontStyle'),
        defFontScale = params.fontScale || this.settings('glyphFontScale'),
        defStrokeColor = params.strokeColor || this.settings('glyphStrokeColor'),
        defLineWidth = params.lineWidth || this.settings('glyphLineWidth'),
        defFillColor = params.fillColor || this.settings('glyphFillColor'),
        defScale = params.scale || this.settings('glyphScale'),
        defTextColor = params.textColor || this.settings('glyphTextColor'),
        defTextThreshold = params.textThreshold || this.settings('glyphTextThreshold'),
        defStrokeIfText = ('strokeIfText' in params) ? params.strokeIfText : this.settings('glyphStrokeIfText'),
        defThreshold = params.threshold || this.settings('glyphThreshold'),
        defDraw = ('draw' in params) ? params.draw : this.settings('drawGlyphs');

    if(!defDraw){
      return;
    }


    if (!this.domElements['glyphs']) {
      this.initDOM('canvas', 'glyphs');
      this.domElements['glyphs'].width = this.container.offsetWidth;
      this.domElements['glyphs'].height = this.container.offsetHeight;
      this.container.insertBefore(
        this.domElements['glyphs'],
        this.domElements['glyphs'].previousSibling
      );
    }
    this.drawingContext = this.domElements['glyphs'].getContext('2d');
    this.drawingContext.textAlign = 'center';
    this.drawingContext.textBaseline = 'middle';
    this.drawingContext.lineWidth = defLineWidth;
    this.drawingContext.strokeStyle = defStrokeColor;

    var self = this,
        nodes = this.nodesOnScreen || [],
        prefix = this.options.prefix || '',
        cos45 = Math.cos(degreesToRadians(45)),
        sin45 = Math.sin(degreesToRadians(45)),
        cos135 = Math.cos(degreesToRadians(135)),
        sin135 = Math.sin(degreesToRadians(135)),
        cos225 = Math.cos(degreesToRadians(225)),
        sin225 = Math.sin(degreesToRadians(225)),
        cos315 = Math.cos(degreesToRadians(315)),
        sin315 = Math.sin(degreesToRadians(315));

    function draw (o, context) {
        // console.log(o.draw);
      if (o.draw && o.x && o.y && o.radius > o.threshold) {
        var x = o.x,
            y = o.y;

        switch (o.position) {
          case 'top-right':
            x += o.nodeSize * cos315;
            y += o.nodeSize * sin315;
            break;
          case 'top-left':
            x += o.nodeSize * cos225;
            y += o.nodeSize * sin225;
            break;
          case 'bottom-left':
            x += o.nodeSize * cos135;
            y += o.nodeSize * sin135;
            break;
          case 'bottom-right':
            x += o.nodeSize * cos45;
            y += o.nodeSize * sin45;
            break;
        }

        // Glyph rendering
        context.fillStyle = o.fillColor;
        if (o.strokeColor !== context.strokeStyle) {
          context.strokeStyle = o.strokeColor;
        }
        context.beginPath();
        context.arc(x, y, o.radius, 2 * Math.PI, false);
        context.closePath();
        if (!o.strokeIfText || o.radius > o.textThreshold) {
          context.stroke();
        }
        context.fill();

        // Glyph content rendering
        if (o.radius > o.textThreshold) {
          var fontSize = Math.round(o.fontScale * o.radius);
          var font =  o.fontStyle + ' ' + fontSize + 'px ' + o.font;
          if (font !== context.font) {
            context.font = font;
          }
          context.fillStyle = o.textColor;
          context.fillText(o.content, x, y);
        }
      }
    };

    var display;
    nodes.forEach(function(node) {
      if (node.glyphs) {
        node.glyphs.forEach(function(glyph) {
          display = !node.hidden;
          if (display && 'draw' in glyph) {
            display = glyph.draw;
          }

          draw(
            {
              x: node[prefix + 'x'],
              y: node[prefix + 'y'],
              nodeSize: node[prefix + 'size'] || 0,
              position: glyph.position,
              radius: glyph.size || node[prefix + 'size'] * defScale,
              content: (glyph.content || '').toString() || '',
              lineWidth: glyph.lineWidth || defLineWidth,
              fillColor: resolve(glyph.fillColor, node) || defFillColor,
              textColor: resolve(glyph.textColor, node) || defTextColor,
              strokeColor: resolve(glyph.strokeColor, node) || defStrokeColor,
              strokeIfText: ('strokeIfText' in glyph) ? glyph.strokeIfText : defStrokeIfText,
              fontStyle: glyph.fontStyle || defFontStyle,
              font: glyph.font || defFont,
              fontScale: glyph.fontScale || defFontScale,
              threshold: glyph.threshold || defThreshold,
              textThreshold: glyph.textThreshold || defTextThreshold,
              draw: display
            },
            self.drawingContext
          );
        });
      }
    });
  }

  // Bind glyphs method to renderers
  sigma.renderers.canvas.prototype.glyphs = glyphs;
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma not in scope.');

  // Initialize package:
  sigma.utils.pkg('sigma.settings');

  /**
  * Extended sigma settings.
  */
  var settings = {
    // {string}
    nodeHaloColor: '#fff',
    // {boolean}
    nodeHaloStroke: false,
    // {string}
    nodeHaloStrokeColor: '#000',
    // {number}
    nodeHaloStrokeWidth: 0.5,
    // {number}
    nodeHaloSize: 50,
    // {boolean}
    nodeHaloClustering: false,
    // {number}
    nodeHaloClusteringMaxRadius: 1000,
    // {string}
    edgeHaloColor: '#fff',
    // {number}
    edgeHaloSize: 10,
    // {boolean}
    drawHalo: true,
  };

  // Export the previously designed settings:
  sigma.settings = sigma.utils.extend(sigma.settings || {}, settings);

}).call(this);
;(function(undefined) {
  'use strict';

  /**
   * Sigma Renderer Halo Utility
   * ================================
   *
   * The aim of this plugin is to display a circled halo behind specified nodes.
   *
   * Author: Sébastien Heymann (sheymann) for Linkurious
   * Version: 0.0.2
   */

  // Terminating if sigma were not to be found
  if (typeof sigma === 'undefined')
    throw new Error('sigma not in scope.');

  /**
   * Creates an array of unique values present in all provided arrays using
   * strict equality for comparisons, i.e. `===`.
   *
   * @see lodash
   * @param {...Array} [array] The arrays to inspect.
   * @return {Array} Returns an array of shared values.
   * @example
   *
   * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
   * // => [1, 2]
   */
  function intersection() {
    var args = [],
        argsIndex = -1,
        argsLength = arguments.length;

    while (++argsIndex < argsLength) {
      var value = arguments[argsIndex];
       args.push(value);
    }
    var array = args[0],
        index = -1,
        length = array ? array.length : 0,
        result = [];

    outer:
    while (++index < length) {
      value = array[index];
      if (result.indexOf(value) < 0) {
        var argsIndex = argsLength;
        while (--argsIndex) {
          if (args[argsIndex].indexOf(value) < 0) {
            continue outer;
          }
        }
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Draw the specified circles in a given context.
   *
   * @param {array}   circles
   * @param {object}  context
   * @param {boolean} onlyStroke
   */
  function drawCircles(circles, context, onlyStroke) {
    for (var i = 0; i < circles.length; i++) {
      if (circles[i] == null) continue;

      context.beginPath();

      context.arc(
        circles[i].x,
        circles[i].y,
        circles[i].radius,
        0,
        Math.PI * 2,
        true
      );

      context.closePath();
      if (onlyStroke) {
        context.stroke();
      } else {
        context.fill();
      }
    }
  }

  /**
   * Avoid crossing strokes.
   *
   * @see http://vis4.net/blog/posts/clean-your-symbol-maps/
   * @param {array}  circles    The circles to cluster.
   * @param {number} margin     The minimal distance between the circle
   *                            and the points inside it.
   * @param {?number} maxRadius The max length of a radius
   * @return {array}            The clustered circles.
   */
  function clusterCircles(circles, margin, maxRadius) {
    maxRadius = maxRadius || Number.POSITIVE_INFINITY;

    // console.time('halo cluster');
    if (circles.length > 1) {
      var
        intersecting = true,
        centroid,
        d,
        points;

      while (intersecting) {
        intersecting = false;
        for (var i = 0; i < circles.length; i++) {
          if (circles[i] === null) continue;

          for (var j = i + 1; j < circles.length; j++) {
            if (circles[j] === null) continue;

            // distance between i-1 and i
            d = sigma.utils.getDistance(
              circles[i].x, circles[i].y, circles[j].x, circles[j].y
            );
            if (d < maxRadius && d < circles[i].radius + circles[j].radius) {
              intersecting = true;

              // Centers of the merged circles:
              points = [
                {x: circles[i].x, y: circles[i].y, radius: circles[i].radius},
                {x: circles[j].x, y: circles[j].y, radius: circles[j].radius}
              ];
              if (circles[i].points) {
                points = points.concat(circles[i].points);
              }
              if (circles[j].points) {
                points = points.concat(circles[j].points);
              }

              // Compute the centroid:
              centroid = {x: 0, y: 0};
              for (var p = 0; p < points.length; p++) {
                centroid.x += points[p].x;
                centroid.y += points[p].y;
              }
              centroid.x /= points.length;
              centroid.y /= points.length;

              // Compute radius:
              centroid.radius = Math.max.apply(null, points.map(function(point) {
                return margin + sigma.utils.getDistance(
                  centroid.x, centroid.y, point.x, point.y
                );
              }));

              // Merge circles
              circles.push({
                x: centroid.x,
                y: centroid.y,
                radius: centroid.radius,
                points: points
              });

              circles[i] = circles[j] = null;
              break; // exit for loop
            }
          }
        }
      }
    }
    // console.timeEnd('halo cluster');
    return circles;
  }


  // Main function
  function halo(params) {
    params = params || {};

    if (!this.domElements['background']) {
      this.initDOM('canvas', 'background');
      this.domElements['background'].width =
        this.container.offsetWidth;
      this.domElements['background'].height =
        this.container.offsetHeight;
      this.container.insertBefore(this.domElements['background'], this.container.firstChild);
    }

    var self = this,
        context = self.contexts.background,
        webgl = this instanceof sigma.renderers.webgl,
        ePrefix = self.options.prefix,
        nPrefix = webgl ? ePrefix.substr(5) : ePrefix,
        nHaloClustering = params.nodeHaloClustering || self.settings('nodeHaloClustering'),
        nHaloClusteringMaxRadius = params.nodeHaloClusteringMaxRadius || self.settings('nodeHaloClusteringMaxRadius'),
        nHaloColor = params.nodeHaloColor || self.settings('nodeHaloColor'),
        nHaloSize = params.nodeHaloSize || self.settings('nodeHaloSize'),
        nHaloStroke = params.nodeHaloStroke || self.settings('nodeHaloStroke'),
        nHaloStrokeColor = params.nodeHaloStrokeColor || self.settings('nodeHaloStrokeColor'),
        nHaloStrokeWidth = params.nodeHaloStrokeWidth || self.settings('nodeHaloStrokeWidth'),
        borderSize = self.settings('nodeBorderSize') || 0,
        outerBorderSize = self.settings('nodeOuterBorderSize') || 0,
        eHaloColor = params.edgeHaloColor || self.settings('edgeHaloColor'),
        eHaloSize = params.edgeHaloSize || self.settings('edgeHaloSize'),
        drawHalo = params.drawHalo || self.settings('drawHalo'),
        nodes = params.nodes || [],
        edges = params.edges || [],
        source,
        target,
        cp,
        sSize,
        sX,
        sY,
        tX,
        tY,
        margin,
        circles;

    if (!drawHalo) {
      return;
    }

    nodes = webgl ? nodes : intersection(params.nodes, self.nodesOnScreen);
    edges = webgl ? edges : intersection(params.edges, self.edgesOnScreen);

    // clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.save();

    // EDGES
    context.strokeStyle = eHaloColor;

    edges.forEach(function(edge) {
      source = self.graph.nodes(edge.source);
      target = self.graph.nodes(edge.target);

      context.lineWidth = (edge[ePrefix + 'size'] || 1) + eHaloSize;
      context.beginPath();

      cp = {};
      sSize = source[nPrefix + 'size'];
      sX = source[nPrefix + 'x'];
      sY = source[nPrefix + 'y'];
      tX = target[nPrefix + 'x'];
      tY = target[nPrefix + 'y'];

      context.moveTo(sX, sY);

      if (edge.type === 'curve' || edge.type === 'curvedArrow') {
        if (edge.source === edge.target) {
          cp = sigma.utils.getSelfLoopControlPoints(sX, sY, sSize);
          context.bezierCurveTo(cp.x1, cp.y1, cp.x2, cp.y2, tX, tY);
        }
        else {
          cp = sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY, edge.cc);
          context.quadraticCurveTo(cp.x, cp.y, tX, tY);
        }
      }
      else {
        context.moveTo(sX, sY);
        context.lineTo(tX, tY);
      }
      context.stroke();

      context.closePath();
    });

    // NODES
    context.fillStyle = nHaloColor;

    if (nHaloStroke) {
      context.lineWidth = nHaloStrokeWidth;
      context.strokeStyle = nHaloStrokeColor;
    }

    margin = borderSize + outerBorderSize + nHaloSize;

    circles = nodes.filter(function(node) {
      return !node.hidden;
    })
    .map(function(node) {
      return {
        x: node[nPrefix + 'x'],
        y: node[nPrefix + 'y'],
        radius: node[nPrefix + 'size'] + margin,
      };
    });

    if (nHaloClustering) {
      // Avoid crossing strokes:
      circles = clusterCircles(circles, margin, nHaloClusteringMaxRadius);
    }
    if (nHaloStroke) {
      drawCircles(circles, context, true);
    }
    drawCircles(circles, context);

    context.restore();
  }

  // Extending canvas and webl renderers
  sigma.renderers.canvas.prototype.halo = halo;
  sigma.renderers.webgl.prototype.halo = halo;

  // TODO clear scene?
}).call(this);

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.arrow =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel'),
        size = edge[prefix + 'size'] || 1,
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'];

    size = (edge.hover) ?
      settings('edgeHoverSizeRatio') * size : size;
    var aSize = Math.max(size * 2.5, settings('minArrowSize')),
        d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
        aX = sX + (tX - sX) * (d - aSize - tSize) / d,
        aY = sY + (tY - sY) * (d - aSize - tSize) / d,
        vX = (tX - sX) * aSize / d,
        vY = (tY - sY) * aSize / d;

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    context.lineTo(
      aX,
      aY
    );
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    // draw label with a background
    if (sigma.canvas.edges.labels.arrow) {
      edge.hover = true;
      sigma.canvas.edges.labels.arrow(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.curve =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = settings('edgeHoverSizeRatio') * (edge[prefix + 'size'] || 1),
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel'),
        cp = {},
        sSize = source[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'];

    cp = (source.id === target.id) ?
      sigma.utils.getSelfLoopControlPoints(sX, sY, sSize) :
      sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY, edge.cc);

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    if (source.id === target.id) {
      context.bezierCurveTo(cp.x1, cp.y1, cp.x2, cp.y2, tX, tY);
    } else {
      context.quadraticCurveTo(cp.x, cp.y, tX, tY);
    }
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    // draw label with a background
    if (sigma.canvas.edges.labels.curve) {
      edge.hover = true;
      sigma.canvas.edges.labels.curve(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.curvedArrow =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel'),
        cp = {},
        size = settings('edgeHoverSizeRatio') * (edge[prefix + 'size'] || 1),
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        d,
        aSize,
        aX,
        aY,
        vX,
        vY;

    cp = (source.id === target.id) ?
      sigma.utils.getSelfLoopControlPoints(sX, sY, tSize) :
      sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY, edge.cc);

    if (source.id === target.id) {
      d = Math.sqrt(Math.pow(tX - cp.x1, 2) + Math.pow(tY - cp.y1, 2));
      aSize = size * 2.5;
      aX = cp.x1 + (tX - cp.x1) * (d - aSize - tSize) / d;
      aY = cp.y1 + (tY - cp.y1) * (d - aSize - tSize) / d;
      vX = (tX - cp.x1) * aSize / d;
      vY = (tY - cp.y1) * aSize / d;
    }
    else {
      d = Math.sqrt(Math.pow(tX - cp.x, 2) + Math.pow(tY - cp.y, 2));
      aSize = Math.max(size * 2.5, settings('minArrowSize'));
      aX = cp.x + (tX - cp.x) * (d - aSize - tSize) / d;
      aY = cp.y + (tY - cp.y) * (d - aSize - tSize) / d;
      vX = (tX - cp.x) * aSize / d;
      vY = (tY - cp.y) * aSize / d;
    }

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    if (source.id === target.id) {
      context.bezierCurveTo(cp.x2, cp.y2, cp.x1, cp.y1, aX, aY);
    } else {
      context.quadraticCurveTo(cp.x, cp.y, aX, aY);
    }
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    // draw label with a background
    if (sigma.canvas.edges.labels.curvedArrow) {
      edge.hover = true;
      var def = sigma.canvas.edges.labels.curvedArrow;
      (def.render || def)(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size..
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.dashed =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel');

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    context.setLineDash([8,3]);
    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();

    // draw label with a background
    if (sigma.canvas.edges.labels) {
      edge.hover = true;
      sigma.canvas.edges.labels.def(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.def =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel');

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    // draw label with a background
    if (sigma.canvas.edges.labels.def) {
      edge.hover = true;
      sigma.canvas.edges.labels.def(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size..
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.dotted =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel');

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    context.setLineDash([2]);
    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();

    // draw label with a background
    if (sigma.canvas.edges.labels) {
      edge.hover = true;
      var def = sigma.canvas.edges.labels.def;
      (def.render || def)(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size..
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.parallel =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel'),
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        c,
        d,
        dist = sigma.utils.getDistance(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    // Intersection points of the source node circle:
    c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

    // Intersection points of the target node circle:
    d = sigma.utils.getCircleIntersection(tX, tY, size, sX, sY, dist);

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(c.xi, c.yi);
    context.lineTo(d.xi_prime, d.yi_prime);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(c.xi_prime, c.yi_prime);
    context.lineTo(d.xi, d.yi);
    context.closePath();
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();

    // draw label with a background
    if (sigma.canvas.edges.labels) {
      edge.hover = true;
      sigma.canvas.edges.labels.def(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   * It will also display the label with a background.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.tapered =
    function(edge, source, target, context, settings) {
    // The goal is to draw a triangle where the target node is a point of
    // the triangle, and the two other points are the intersection of the
    // source circle and the circle (target, distance(source, target)).
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        prefix = settings('prefix') || '',
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = settings('edgeHoverLevel'),
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        dist = sigma.utils.getDistance(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    // Intersection points:
    var c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    // Turn transparency on:
    context.globalAlpha = 0.65;

    // Draw the triangle:
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(tX, tY);
    context.lineTo(c.xi, c.yi);
    context.lineTo(c.xi_prime, c.yi_prime);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();

    // draw label with a background
    if (sigma.canvas.edges.labels) {
      edge.hover = true;
      sigma.canvas.edges.labels.def(edge, source, target, context, settings);
      edge.hover = false;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This edge renderer will display edges as arrows going from the source node
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.arrow = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level,
        size = edge[prefix + 'size'] || 1,
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'];

    var aSize = Math.max(size * 2.5, settings('minArrowSize')),
        d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
        aX = sX + (tX - sX) * (d - aSize - tSize) / d,
        aY = sY + (tY - sY) * (d - aSize - tSize) / d,
        vX = (tX - sX) * aSize / d,
        vY = (tY - sY) * aSize / d;

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    context.lineTo(
      aX,
      aY
    );
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');


  var calc = function(ratio, n, i, sortByDirection) {
    if (sortByDirection) {
      // sort edges by direction:
      var d = (ratio * n) / i;
      return { y: d ? d : Number.POSITIVE_INFINITY };
    }

    var step = ratio / (n / 2);
    var d = ratio - step * i;
    return { y: d ? 1 / d : n };
  };

  /**
   * Curves multiple edges between two nodes (i.e. "parallel edges").
   * This method is not a renderer. It should be called after modification
   * of the graph structure.
   * Time complexity: 2 * O(|E|)
   *
   * Settings: autoCurveRatio, autoCurveSortByDirection
   *
   * @param {object} s The sigma instance
   */
  sigma.canvas.edges.autoCurve = function(s) {
    var
      key,
      ratio = s.settings('autoCurveRatio'),
      sortByDirection = s.settings('autoCurveSortByDirection'),
      defaultEdgeType = s.settings('defaultEdgeType'),
      edges = s.graph.edges();

    var count = {
      key: function(o) {
        var key = o.source + ',' + o.target;
        if (this[key]) {
          return key;
        }
        if (!sortByDirection) {
          key = o.target + ',' + o.source;
          if (this[key]) {
            return key;
          }
        }

        if (sortByDirection && this[o.target + ',' + o.source]) {
          // count a parallel edge if an opposite edge exists
          this[key] = { i: 1, n: 1 };
        }
        else {
          this[key] = { i: 0, n: 0 };
        }
        return key;
      },
      inc: function(o) {
        // number of edges parallel to this one (included)
        this[this.key(o)].n++;
      }
    };

    edges.forEach(function(edge) {
      count.inc(edge);
    });

    edges.forEach(function(edge) {
      key = count.key(edge);

      // if the edge has parallel edges:
      if (count[key].n > 1 || count[key].i > 0) {
        if (!edge.cc) {
          // update edge type:
          if (edge.type === 'arrow' || edge.type === 'tapered' ||
            defaultEdgeType === 'arrow' || defaultEdgeType === 'tapered') {

            if (!edge.cc_prev_type) {
              edge.cc_prev_type = edge.type;
            }
            edge.type = 'curvedArrow';
          }
          else {
            if (!edge.cc_prev_type) {
              edge.cc_prev_type = edge.type;
            }
            edge.type = 'curve';
          }
        }

        // curvature coefficients
        edge.cc = calc(ratio, count[key].n, count[key].i++, sortByDirection);
      }
      else if (edge.cc) {
        // the edge is no longer a parallel edge
        edge.type = edge.cc_prev_type;
        edge.cc_prev_type = undefined;
        edge.cc = undefined;
      }
    });
  };

})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This edge renderer will display edges as curves.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.curve = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level,
        cp = {},
        sSize = source[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'];

    cp = (source.id === target.id) ?
      sigma.utils.getSelfLoopControlPoints(sX, sY, sSize) :
      sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY, edge.cc);

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    if (source.id === target.id) {
      context.bezierCurveTo(cp.x1, cp.y1, cp.x2, cp.y2, tX, tY);
    } else {
      context.quadraticCurveTo(cp.x, cp.y, tX, tY);
    }
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }
  };

})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This edge renderer will display edges as curves with arrow heading.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.curvedArrow =
    function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level,
        cp = {},
        size = edge[prefix + 'size'] || 1,
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        d,
        aSize,
        aX,
        aY,
        vX,
        vY;

    cp = (source.id === target.id) ?
      sigma.utils.getSelfLoopControlPoints(sX, sY, tSize) :
      sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY, edge.cc);

    if (source.id === target.id) {
      d = Math.sqrt(Math.pow(tX - cp.x1, 2) + Math.pow(tY - cp.y1, 2));
      aSize = size * 2.5;
      aX = cp.x1 + (tX - cp.x1) * (d - aSize - tSize) / d;
      aY = cp.y1 + (tY - cp.y1) * (d - aSize - tSize) / d;
      vX = (tX - cp.x1) * aSize / d;
      vY = (tY - cp.y1) * aSize / d;
    }
    else {
      d = Math.sqrt(Math.pow(tX - cp.x, 2) + Math.pow(tY - cp.y, 2));
      aSize = Math.max(size * 2.5, settings('minArrowSize'));
      aX = cp.x + (tX - cp.x) * (d - aSize - tSize) / d;
      aY = cp.y + (tY - cp.y) * (d - aSize - tSize) / d;
      vX = (tX - cp.x) * aSize / d;
      vY = (tY - cp.y) * aSize / d;
    }

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    if (source.id === target.id) {
      context.bezierCurveTo(cp.x2, cp.y2, cp.x1, cp.y1, aX, aY);
    } else {
      context.quadraticCurveTo(cp.x, cp.y, aX, aY);
    }
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This method renders the edge as a dashed line.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.dashed = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level;

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.setLineDash([8,3]);
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * The default edge renderer. It renders the edge as a simple line.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.def = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level;

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This method renders the edge as a dotted line.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.dotted = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level;

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.setLineDash([2]);
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This method renders the edge as two parallel lines.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.parallel = function(edge, source, target, context, settings) {
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level,
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        c,
        d,
        dist = sigma.utils.getDistance(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    // Intersection points of the source node circle:
    c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

    // Intersection points of the target node circle:
    d = sigma.utils.getCircleIntersection(tX, tY, size, sX, sY, dist);

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (edge.active) {
      context.strokeStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.strokeStyle = color;
    }

    context.lineWidth = size;
    context.beginPath();
    context.moveTo(c.xi, c.yi);
    context.lineTo(d.xi_prime, d.yi_prime);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(c.xi_prime, c.yi_prime);
    context.lineTo(d.xi, d.yi);
    context.closePath();
    context.stroke();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This method renders the edge as a tapered line.
   * Danny Holten, Petra Isenberg, Jean-Daniel Fekete, and J. Van Wijk (2010)
   * Performance Evaluation of Tapered, Curved, and Animated Directed-Edge
   * Representations in Node-Link Graphs. Research Report, Sep 2010.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.tapered = function(edge, source, target, context, settings) {
    // The goal is to draw a triangle where the target node is a point of
    // the triangle, and the two other points are the intersection of the
    // source circle and the circle (target, distance(source, target)).
    var color = edge.active ?
          edge.active_color || settings('defaultEdgeActiveColor') :
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        prefix = settings('prefix') || '',
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        level = edge.active ? settings('edgeActiveLevel') : edge.level,
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        dist = sigma.utils.getDistance(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    // Intersection points:
    var c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

    context.save();

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    if (edge.active) {
      context.fillStyle = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else {
      context.fillStyle = color;
    }

    // Turn transparency on:
    context.globalAlpha = 0.65;

    // Draw the triangle:
    context.beginPath();
    context.moveTo(tX, tY);
    context.lineTo(c.xi, c.yi);
    context.lineTo(c.xi_prime, c.yi_prime);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.shadowColor = '#000000'
    }

    context.restore();
  };
})();

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.extremities');

  /**
   * The default renderer for hovered edge extremities. It renders the edge
   * extremities as hovered.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.extremities.def =
    function(edge, source, target, context, settings) {
    // Source Node:
    (
      sigma.canvas.hovers[source.type] ||
      sigma.canvas.hovers.def
    )(source, context, settings);

    // Target Node:
    (
      sigma.canvas.hovers[target.type] ||
      sigma.canvas.hovers.def
    )(target, context, settings);
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.hovers');

  /**
   * This hover renderer will basically display the label with a background.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.hovers.def = function(node, context, settings) {
    var x,
        y,
        w,
        h,
        e,
        fontStyle = settings('hoverFontStyle') || settings('fontStyle'),
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        defaultNodeColor = settings('defaultNodeColor'),
        borderSize = node.active ?
          node.border_size || settings('nodeActiveBorderSize') || settings('nodeBorderSize') :
          node.border_size || settings('nodeHoverBorderSize') || settings('nodeBorderSize'),
        outerBorderSize = node.active ?
          settings('nodeActiveOuterBorderSize') || settings('nodeOuterBorderSize') :
          settings('nodeOuterBorderSize'),
        alignment = settings('labelAlignment'),
        fontSize = (settings('labelSize') === 'fixed') ?
          settings('defaultLabelSize') :
          settings('labelSizeRatio') * size,
        color = settings('nodeHoverColor') === 'node' ?
          (node.color || defaultNodeColor) :
          settings('defaultNodeHoverColor'),
        borderColor = settings('nodeHoverBorderColor') === 'default'
          ? (settings('defaultNodeHoverBorderColor') || settings('defaultNodeBorderColor'))
          : (node.border_color || defaultNodeColor),
        maxLineLength = settings('maxNodeLabelLineLength') || 0,
        level = settings('nodeHoverLevel'),
        lines = getLines(node.label, maxLineLength);

    if (alignment !== 'center') {
      prepareLabelBackground(context);
      drawLabelBackground(alignment, context, fontSize, node, lines, maxLineLength);
    }

    // Level:
    if (level) {
      context.shadowOffsetX = 0;
      // inspired by Material Design shadows, level from 1 to 5:
      switch(level) {
        case 1:
          context.shadowOffsetY = 1.5;
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.36)';
          break;
        case 2:
          context.shadowOffsetY = 3;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.39)';
          break;
        case 3:
          context.shadowOffsetY = 6;
          context.shadowBlur = 12;
          context.shadowColor = 'rgba(0,0,0,0.42)';
          break;
        case 4:
          context.shadowOffsetY = 10;
          context.shadowBlur = 20;
          context.shadowColor = 'rgba(0,0,0,0.47)';
          break;
        case 5:
          context.shadowOffsetY = 15;
          context.shadowBlur = 24;
          context.shadowColor = 'rgba(0,0,0,0.52)';
          break;
      }
    }

    // Border:
    if (borderSize > 0) {
      context.beginPath();
      context.fillStyle = settings('nodeHoverBorderColor') === 'node'
        ? borderColor
        : (settings('defaultNodeHoverBorderColor') || settings('defaultNodeBorderColor'));
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        size + borderSize,
        0,
        Math.PI * 2,
        true
      );
      context.closePath();
      context.fill();
    }

    // Node:
    var nodeRenderer = sigma.canvas.nodes[node.type] || sigma.canvas.nodes.def;
    nodeRenderer(node, context, settings, { color: color });

    // reset shadow
    if (level) {
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
    }

    if (alignment === 'center') {
      prepareLabelBackground(context);
      drawLabelBackground(alignment, context, fontSize, node, lines, maxLineLength);
    }

    // Display the label:
    if (typeof node.label === 'string') {
      context.fillStyle = (settings('labelHoverColor') === 'node') ?
        (node.color || defaultNodeColor) :
        settings('defaultLabelHoverColor');

      var labelOffsetX = 0,
          labelOffsetY = fontSize / 3,
          shouldRender = true,
          labelWidth;
      context.textAlign = "center";

      switch (alignment) {
        case 'bottom':
          labelOffsetY = + size + 4 * fontSize / 3;
          break;
        case 'center':
          break;
        case 'left':
          context.textAlign = "right";
          labelOffsetX = - size - borderSize - outerBorderSize - 3;
          break;
        case 'top':
          labelOffsetY = - size - 2 * fontSize / 3;
          break;
        case 'constrained':
          labelWidth = sigma.utils.canvas.getTextWidth(node.label);
          if (labelWidth > (size + fontSize / 3) * 2) {
            shouldRender = false;
          }
          break;
        case 'inside':
          labelWidth = sigma.utils.canvas.getTextWidth(node.label);
          if (labelWidth <= (size + fontSize / 3) * 2) {
            break;
          }
        /* falls through*/
        case 'right':
        /* falls through*/
        default:
          labelOffsetX = size + borderSize + outerBorderSize + 3;
          context.textAlign = "left";
          break;
      }

      if (shouldRender) {
        var baseX = node[prefix + 'x'] + labelOffsetX,
            baseY = Math.round(node[prefix + 'y'] + labelOffsetY);

        for (var i = 0; i < lines.length; ++i) {
          context.fillText(lines[i], baseX, baseY + i * (fontSize + 1));
        }
      }
    }

    function prepareLabelBackground(context) {
      context.font = (fontStyle ? fontStyle + ' ' : '') +
        fontSize + 'px ' + (settings('hoverFont') || settings('font'));

      context.beginPath();
      context.fillStyle = settings('labelHoverBGColor') === 'node' ?
        (node.color || defaultNodeColor) :
        settings('defaultHoverLabelBGColor');

      if (node.label && settings('labelHoverShadow')) {
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 8;
        context.shadowColor = settings('labelHoverShadowColor');
      }
    }

    function drawLabelBackground(alignment, context, fontSize, node, lines, maxLineLength) {
      var labelWidth =
        (maxLineLength > 1 && lines.length > 1) ?
        0.6 * maxLineLength * fontSize :
        sigma.utils.canvas.getTextWidth(
          context,
          settings('approximateLabelWidth'),
          fontSize,
          lines[0]
        );

      var x = Math.round(node[prefix + 'x']),
          y = Math.round(node[prefix + 'y']),
          w = Math.round(labelWidth + 4),
          h = h = ((fontSize + 1) * lines.length) + 4,
          e = Math.round(size + fontSize * 0.25);

      if (node.label && typeof node.label === 'string') {
        // draw a rectangle for the label
        switch (alignment) {
          case 'constrained':
          /* falls through*/
          case 'center':
            y = Math.round(node[prefix + 'y'] - fontSize * 0.5 - 2);
            context.rect(x - w * 0.5, y, w, h);
            break;
          case 'left':
            x = Math.round(node[prefix + 'x'] + fontSize * 0.5 + 2);
            y = Math.round(node[prefix + 'y'] - fontSize * 0.5 - 2);
            w += size * 0.5 + fontSize * 0.5;

            context.moveTo(x, y + e);
            context.arcTo(x, y, x - e, y, e);
            context.lineTo(x - w - borderSize - outerBorderSize - e, y);
            context.lineTo(x - w - borderSize - outerBorderSize - e, y + h);
            context.lineTo(x - e, y + h);
            context.arcTo(x, y + h, x, y + h - e, e);
            context.lineTo(x, y + e);
            break;
          case 'top':
            context.rect(x - w * 0.5, y - e - h, w, h);
            break;
          case 'bottom':
            context.rect(x - w * 0.5, y + e, w, h);
            break;
          case 'inside':
            if (labelWidth <= e * 2) {
              // don't draw anything
              break;
            }
            // use default setting, falling through
          /* falls through*/
          case 'right':
          /* falls through*/
          default:
            x = Math.round(node[prefix + 'x'] - fontSize * 0.5 - 2);
            y = Math.round(node[prefix + 'y'] - fontSize * 0.5 - 2);
            w += size * 0.5 + fontSize * 0.5;

            context.moveTo(x, y + e);
            context.arcTo(x, y, x + e, y, e);
            context.lineTo(x + w + borderSize + outerBorderSize + e, y);
            context.lineTo(x + w + borderSize + outerBorderSize + e, y + h);
            context.lineTo(x + e, y + h);
            context.arcTo(x, y + h, x, y + h - e, e);
            context.lineTo(x, y + e);
            break;
        }
      }

      context.closePath();
      context.fill();

      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
    }

    /**
     * Split a text into several lines. Each line won't be longer than the specified maximum length.
     * @param {string}  text            Text to split
     * @param {number}  maxLineLength   Maximum length of a line. A value <= 1 will be treated as "infinity".
     * @returns {Array<string>}         List of lines
     */
    function getLines(text, maxLineLength) {
      if (text == null) {
        return [];
      }

      if (maxLineLength <= 1) {
        return [text];
      }

      var words = text.split(' '),
        lines = [],
        lineLength = 0,
        lineIndex = -1,
        lineList = [],
        lineFull = true;

      for (var i = 0; i < words.length; ++i) {
        if (lineFull) {
          if (words[i].length > maxLineLength) {
            var parts = splitWord(words[i], maxLineLength);
            for (var j = 0; j < parts.length; ++j) {
              lines.push([parts[j]]);
              ++lineIndex;
            }
            lineLength = parts[parts.length - 1].length;
          } else {
            lines.push([words[i]
            ]);
            ++lineIndex;
            lineLength = words[i].length + 1;
          }
          lineFull = false;
        } else if (lineLength + words[i].length <= maxLineLength) {
          lines[lineIndex].push(words[i]);
          lineLength += words[i].length + 1;
        } else {
          lineFull = true;
          --i;
        }
      }

      for (i = 0; i < lines.length; ++i) {
        lineList.push(lines[i].join(' '))
      }

      return lineList;
    }

    /**
     * Split a word into several lines (with a '-' at the end of each line but the last).
     * @param {string} word       Word to split
     * @param {number} maxLength  Maximum length of a line
     * @returns {Array<string>}   List of lines
     */
    function splitWord(word, maxLength) {
      var parts = [];

      for (var i = 0; i < word.length; i += maxLength - 1) {
        parts.push(word.substr(i, maxLength - 1) + '-');
      }

      var lastPartLen = parts[parts.length - 1].length;
      parts[parts.length - 1] = parts[parts.length - 1].substr(0, lastPartLen - 1) + ' ';

      return parts;
    }
  };
}).call(this);

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.labels');

  /**
   * This label renderer will display the label of the node
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   * @param  {object?}                  infos    The batch infos.
   */
  sigma.canvas.labels.def = function(node, context, settings, infos) {
    var fontSize,
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        fontStyle = node.active ?
          settings('activeFontStyle') : settings('fontStyle'),
        borderSize = node.active ?
          (node.border_size || settings('nodeActiveBorderSize') || settings('nodeBorderSize')) + (settings('nodeActiveOuterBorderSize') || settings('nodeOuterBorderSize')) :
          settings('nodeBorderSize') + settings('nodeOuterBorderSize'),
        labelWidth,
        maxLineLength = settings('maxNodeLabelLineLength') || 0,
        labelOffsetX,
        labelOffsetY,
        shouldRender = true,
        alignment = settings('labelAlignment');

    if (size <= settings('labelThreshold'))
      return;

    if (!node.label || typeof node.label !== 'string')
      return;

    fontSize = (settings('labelSize') === 'fixed') ?
      settings('defaultLabelSize') :
      settings('labelSizeRatio') * size;

    var new_font = (fontStyle ? fontStyle + ' ' : '') +
      fontSize + 'px ' +
      (node.active ?
        settings('activeFont') || settings('font') :
        settings('font'));

    if (infos && infos.ctx.font != new_font) { //use font value caching
      context.font = new_font;
      infos.ctx.font = new_font;
    } else {
      context.font = new_font;
    }

    if (node.active)
      context.fillStyle =
        (settings('labelActiveColor') === 'node') ?
        node.active_color || settings('defaultNodeActiveColor') :
        settings('defaultLabelActiveColor');
    else
      context.fillStyle =
        (settings('labelColor') === 'node') ?
        node.color || settings('defaultNodeColor') :
        settings('defaultLabelColor');

    labelOffsetX = 0;
    labelOffsetY = fontSize / 3;
    context.textAlign = "center";

    switch (alignment) {
      case 'bottom':
        labelOffsetY = + size + 4 * fontSize / 3;
        break;
      case 'center':
        break;
      case 'left':
        context.textAlign = "right";
        labelOffsetX = - size - borderSize - 3;
        break;
      case 'top':
        labelOffsetY = - size - 2 * fontSize / 3;
        break;
      case 'constrained':
        labelWidth = sigma.utils.canvas.getTextWidth(context,
            settings('approximateLabelWidth'), fontSize, node.label);

        if (labelWidth > (size + fontSize / 3) * 2) {
          shouldRender = false;
        }
        break;
      case 'inside':
        labelWidth = sigma.utils.canvas.getTextWidth(context,
            settings('approximateLabelWidth'), fontSize, node.label);

        if (labelWidth <= (size + fontSize / 3) * 2) {
          break;
        }
      /* falls through*/
      case 'right':
      /* falls through*/
      default:
        labelOffsetX = size + borderSize + 3;
        context.textAlign = "left";
        break;
    }

    if (shouldRender) {
      var lines = getLines(node.label, maxLineLength),
        baseX = node[prefix + 'x'] + labelOffsetX,
        baseY = Math.round(node[prefix + 'y'] + labelOffsetY);

      for (var i = 0; i < lines.length; ++i) {
        context.fillText(lines[i], baseX, baseY + i * (fontSize + 1));
      }
    }
  };

  /**
  * Split a text into several lines. Each line won't be longer than the specified maximum length.
  * @param {string}  text            Text to split
  * @param {number}  maxLineLength   Maximum length of a line. A value <= 1 will be treated as "infinity".
  * @returns {Array<string>}         List of lines
  */
  function getLines(text, maxLineLength) {
    if (maxLineLength <= 1) {
      return [text];
    }

    var words = text.split(' '),
      lines = [],
      lineLength = 0,
      lineIndex = -1,
      lineList = [],
      lineFull = true;

    for (var i = 0; i < words.length; ++i) {
      if (lineFull) {
        if (words[i].length > maxLineLength) {
          var parts = splitWord(words[i], maxLineLength);
          for (var j = 0; j < parts.length; ++j) {
            lines.push([parts[j]]);
            ++lineIndex;
          }
          lineLength = parts[parts.length - 1].length;
        } else {
          lines.push([words[i]
          ]);
          ++lineIndex;
          lineLength = words[i].length + 1;
        }
        lineFull = false;
      } else if (lineLength + words[i].length <= maxLineLength) {
        lines[lineIndex].push(words[i]);
        lineLength += words[i].length + 1;
      } else {
        lineFull = true;
        --i;
      }
    }

    for (i = 0; i < lines.length; ++i) {
      lineList.push(lines[i].join(' '))
    }

    return lineList;
  }

  /**
   * Split a word into several lines (with a '-' at the end of each line but the last).
   * @param {string} word       Word to split
   * @param {number} maxLength  Maximum length of a line
   * @returns {Array<string>}   List of lines
   */
  function splitWord(word, maxLength) {
    var parts = [];

    for (var i = 0; i < word.length; i += maxLength - 1) {
      parts.push(word.substr(i, maxLength - 1) + '-');
    }

    var lastPartLen = parts[parts.length - 1].length;
    parts[parts.length - 1] = parts[parts.length - 1].substr(0, lastPartLen - 1) + ' ';

    return parts;
  }
}).call(this);

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  var drawCross = function(node, x, y, size, context) {
    var lineWeight = (node.cross && node.cross.lineWeight) || 1;
    context.moveTo(x - size, y - lineWeight);
    context.lineTo(x - size, y + lineWeight);
    context.lineTo(x - lineWeight, y + lineWeight);
    context.lineTo(x - lineWeight, y + size);
    context.lineTo(x + lineWeight, y + size);
    context.lineTo(x + lineWeight, y + lineWeight);
    context.lineTo(x + size, y + lineWeight);
    context.lineTo(x + size, y - lineWeight);
    context.lineTo(x + lineWeight, y - lineWeight);
    context.lineTo(x + lineWeight, y - size);
    context.lineTo(x - lineWeight, y - size);
    context.lineTo(x - lineWeight, y - lineWeight);
  }


  /**
   * The node renderer renders the node as a cross.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   * @param  {?object}                  options  Force optional parameters (e.g. color).
   */
  sigma.canvas.nodes.cross = function(node, context, settings, options) {
    var o = options || {},
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        x = node[prefix + 'x'],
        y = node[prefix + 'y'],
        defaultNodeColor = settings('defaultNodeColor'),
        imgCrossOrigin = settings('imgCrossOrigin') || 'anonymous',
        borderSize = node.border_size || settings('nodeBorderSize'),
        outerBorderSize = settings('nodeOuterBorderSize'),
        activeBorderSize = node.border_size || settings('nodeActiveBorderSize'),
        activeOuterBorderSize = settings('nodeActiveOuterBorderSize'),
        color = o.color || node.color || defaultNodeColor,
        borderColor = settings('nodeBorderColor') === 'default'
          ? settings('defaultNodeBorderColor')
          : (o.borderColor || node.border_color || defaultNodeColor),
        level = node.active ? settings('nodeActiveLevel') : node.level;

    // Level:
    sigma.utils.canvas.setLevel(level, context);

    if (node.active) {
      // Color:
      if (settings('nodeActiveColor') === 'node') {
        color = node.active_color || color;
      }
      else {
        color = settings('defaultNodeActiveColor') || color;
      }

      // Outer Border:
      if (activeOuterBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeActiveOuterBorderColor');
        context.arc(x, y, size + activeBorderSize + activeOuterBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
      // Border:
      if (activeBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeActiveBorderColor');
        context.arc(x, y, size + activeBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }
    else {
      // Outer Border:
      if (outerBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeOuterBorderColor');
        context.arc(x, y, size + borderSize + outerBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }

      // Border:
      if (borderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeBorderColor');
        context.arc(x, y, size + borderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }

    // Shape:
    context.fillStyle = color;
    context.beginPath();
    drawCross(node, x, y, size, context);
    context.closePath();
    context.fill();

    // reset shadow
    sigma.utils.canvas.setLevel(level, context);

    // Image:
    if (node.image) {
      sigma.utils.canvas.drawImage(
        node, x, y, size, context, imgCrossOrigin, settings('imageThreshold', drawCross)
      );
    }

    // Icon:
    if (node.icon) {
      sigma.utils.canvas.drawIcon(node, x, y, size, context, settings('iconThreshold'));
    }

  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  var drawBorder = function(context, x, y, radius, color, line_width) {
    context.beginPath();
    context.strokeStyle = color;
	  context.lineWidth = line_width;
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.stroke();
  };


  /**
   * The default node renderer. It renders the node as a simple disc.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   * @param  {?object}                  options  Force optional parameters (e.g. color).
   */
  sigma.canvas.nodes.def = function(node, context, settings, options) {
    var o = options || {},
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        x = node[prefix + 'x'],
        y = node[prefix + 'y'],
        defaultNodeColor = settings('defaultNodeColor'),
        imgCrossOrigin = settings('imgCrossOrigin') || 'anonymous',
        borderSize = node.border_size || settings('nodeBorderSize'),
        outerBorderSize = settings('nodeOuterBorderSize'),
        activeBorderSize = node.border_size || settings('nodeActiveBorderSize'),
        activeOuterBorderSize = settings('nodeActiveOuterBorderSize'),
        color = o.color || node.color || defaultNodeColor,
	      borderColor = settings('nodeBorderColor') === 'default'
          ? settings('defaultNodeBorderColor')
          : (o.borderColor || node.border_color || node.color || defaultNodeColor),
        level = node.active ? settings('nodeActiveLevel') : node.level;

    // Level:
    sigma.utils.canvas.setLevel(level, context);

    if (node.active) {
      // Color:
      if (settings('nodeActiveColor') === 'node') {
        color = node.active_color || color;
      }
      else {
        color = settings('defaultNodeActiveColor') || color;
      }

      // Outer Border:
      if (activeOuterBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeActiveOuterBorderColor');
        context.arc(x, y, size + activeBorderSize + activeOuterBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
      // Border:
      if (activeBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeActiveBorderColor');
        context.arc(x, y, size + activeBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }
    else {
      // Outer Border:
      if (outerBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeOuterBorderColor');
        context.arc(x, y, size + borderSize + outerBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }

      // Border:
      if (borderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeBorderColor');
        context.arc(x, y, size + borderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }

    if ((!node.active ||
      (node.active && settings('nodeActiveColor') === 'node')) &&
      node.colors &&
      node.colors.length) {

      // see http://jsfiddle.net/hvYkM/1/
      var i,
          l = node.colors.length,
          j = 1 / l,
          lastend = 0;

      for (i = 0; i < l; i++) {
        context.fillStyle = node.colors[i];
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, size, lastend, lastend + (Math.PI * 2 * j), false);
        context.lineTo(x, y);
        context.closePath();
        context.fill();
        lastend += Math.PI * 2 * j;
      }
      sigma.utils.canvas.resetLevel(context);
    }
    else {
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();

      sigma.utils.canvas.resetLevel(context);

      if (!node.active && borderSize > 0 && (size > 2 * borderSize)) {
		    drawBorder(context, x, y, size, borderColor, borderSize);
      }
    }

    // Image:
    if (node.image) {
      sigma.utils.canvas.drawImage(
        node, x, y, size, context, imgCrossOrigin, settings('imageThreshold')
      );
    }

    // Icon:
    if (node.icon) {
      sigma.utils.canvas.drawIcon(node, x, y, size, context, settings('iconThreshold'));
    }

  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  var drawDiamond = function(node, x, y, size, context) {
    context.moveTo(x - size, y);
    context.lineTo(x, y - size);
    context.lineTo(x + size, y);
    context.lineTo(x, y + size);
  };


  /**
   * The node renderer renders the node as a diamond.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   * @param  {?object}                  options  Force optional parameters (e.g. color).
   */
  sigma.canvas.nodes.diamond = function(node, context, settings, options) {
    var o = options || {},
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        x = node[prefix + 'x'],
        y = node[prefix + 'y'],
        defaultNodeColor = settings('defaultNodeColor'),
        imgCrossOrigin = settings('imgCrossOrigin') || 'anonymous',
        borderSize = node.border_size || settings('nodeBorderSize'),
        outerBorderSize = settings('nodeOuterBorderSize'),
        activeBorderSize = node.border_size || settings('nodeActiveBorderSize'),
        activeOuterBorderSize = settings('nodeActiveOuterBorderSize'),
        color = o.color || node.color || defaultNodeColor,
        borderColor = settings('nodeBorderColor') === 'default'
          ? settings('defaultNodeBorderColor')
          : (o.borderColor || node.border_color || defaultNodeColor),
        level = node.active ? settings('nodeActiveLevel') : node.level;

    // Level:
    sigma.utils.canvas.setLevel(level, context);

    if (node.active) {
      // Color:
      if (settings('nodeActiveColor') === 'node') {
        color = node.active_color || color;
      }
      else {
        color = settings('defaultNodeActiveColor') || color;
      }

      // Outer Border:
      if (activeOuterBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeActiveOuterBorderColor');
        context.arc(x, y, size + activeBorderSize + activeOuterBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
      // Border:
      if (activeBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeActiveBorderColor');
        context.arc(x, y, size + activeBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }
    else {
      // Outer Border:
      if (outerBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeOuterBorderColor');
        context.arc(x, y, size + borderSize + outerBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }

      // Border:
      if (borderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeBorderColor');
        context.arc(x, y, size + borderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }

    // Shape:
    context.fillStyle = color;
    context.beginPath();
    drawDiamond(node, x, y, size, context);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      sigma.utils.canvas.resetLevel(context);
    }

    // Image:
    if (node.image) {
      sigma.utils.canvas.drawImage(
        node, x, y, size, context, imgCrossOrigin, settings('imageThreshold'), drawDiamond
      );
    }

    // Icon:
    if (node.icon) {
      sigma.utils.canvas.drawIcon(node, x, y, size, context, settings('iconThreshold'));
    }

  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  var drawEquilateral = function(node, x, y, size, context) {
    var pcount = (node.equilateral && node.equilateral.numPoints) || 5;
    var rotate = ((node.equilateral && node.equilateral.rotate) || 0); // we expect radians: Math.PI/180;
    var radius = size;

    // TODO FIXME there is an angle difference between the webgl algorithm and
    // the canvas algorithm
    rotate += Math.PI / pcount; // angleOffset

     // first point on outer radius, angle 'rotate'
    context.moveTo(
      x + radius * Math.sin(rotate),
      y - radius * Math.cos(rotate)
    );

    for(var i = 1; i < pcount; i++) {
      context.lineTo(
        x + Math.sin(rotate + 2 * Math.PI * i / pcount) * radius,
        y - Math.cos(rotate + 2 * Math.PI * i / pcount) * radius
      );
    }
  };


  /**
   * The node renderer renders the node as a equilateral.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   * @param  {?object}                  options  Force optional parameters (e.g. color).
   */
  sigma.canvas.nodes.equilateral = function(node, context, settings, options) {
    var o = options || {},
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        x = node[prefix + 'x'],
        y = node[prefix + 'y'],
        defaultNodeColor = settings('defaultNodeColor'),
        imgCrossOrigin = settings('imgCrossOrigin') || 'anonymous',
        borderSize = node.border_size || settings('nodeBorderSize'),
        outerBorderSize = settings('nodeOuterBorderSize'),
        activeBorderSize = node.border_size || settings('nodeActiveBorderSize'),
        activeOuterBorderSize = settings('nodeActiveOuterBorderSize'),
        color = o.color || node.color || defaultNodeColor,
        borderColor = settings('nodeBorderColor') === 'default'
          ? settings('defaultNodeBorderColor')
          : (o.borderColor || node.border_color || defaultNodeColor),
        level = node.active ? settings('nodeActiveLevel') : node.level;

    // Level:
    sigma.utils.canvas.setLevel(level, context);

    if (node.active) {
      // Color:
      if (settings('nodeActiveColor') === 'node') {
        color = node.active_color || color;
      }
      else {
        color = settings('defaultNodeActiveColor') || color;
      }

      // Outer Border:
      if (activeOuterBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeActiveOuterBorderColor');
        context.arc(x, y, size + activeBorderSize + activeOuterBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
      // Border:
      if (activeBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeActiveBorderColor');
        context.arc(x, y, size + activeBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }
    else {
      // Outer Border:
      if (outerBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeOuterBorderColor');
        context.arc(x, y, size + borderSize + outerBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }

      // Border:
      if (borderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeBorderColor');
        context.arc(x, y, size + borderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }

    // Shape:
    context.fillStyle = color;
    context.beginPath();
    drawEquilateral(node, x, y, size, context);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      sigma.utils.canvas.resetLevel(context);
    }

    // Image:
    if (node.image) {
      sigma.utils.canvas.drawImage(
        node, x, y, size, context, imgCrossOrigin, settings('imageThreshold'), drawEquilateral
      );
    }

    // Icon:
    if (node.icon) {
      sigma.utils.canvas.drawIcon(node, x, y, size, context, settings('iconThreshold'));
    }

  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  var drawSquare = function(node, x, y, size, context) {
    // 45 deg rotation of a diamond shape
    var rotate = Math.PI * 45 / 180;

    // first point on outer radius, dwangle 'rotate'
    context.moveTo(
      x + size * Math.sin(rotate),
      y - size * Math.cos(rotate)
    );

    for(var i = 1; i < 4; i++) {
      context.lineTo(
        x + Math.sin(rotate + 2 * Math.PI * i / 4) * size,
        y - Math.cos(rotate + 2 * Math.PI * i / 4) * size
      );
    }
  };


  /**
   * The node renderer renders the node as a square.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   * @param  {?object}                  options  Force optional parameters (e.g. color).
   */
  sigma.canvas.nodes.square = function(node, context, settings, options) {
    var o = options || {},
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        x = node[prefix + 'x'],
        y = node[prefix + 'y'],
        defaultNodeColor = settings('defaultNodeColor'),
        imgCrossOrigin = settings('imgCrossOrigin') || 'anonymous',
        borderSize = node.border_size || settings('nodeBorderSize'),
        outerBorderSize = settings('nodeOuterBorderSize'),
        activeBorderSize = node.border_size || settings('nodeActiveBorderSize'),
        activeOuterBorderSize = settings('nodeActiveOuterBorderSize'),
        color = o.color || node.color || defaultNodeColor,
        borderColor = settings('nodeBorderColor') === 'default'
          ? settings('defaultNodeBorderColor')
          : (o.borderColor || node.border_color || defaultNodeColor),
        level = node.active ? settings('nodeActiveLevel') : node.level;

    // Level:
    sigma.utils.canvas.setLevel(level, context);

    if (node.active) {
      // Color:
      if (settings('nodeActiveColor') === 'node') {
        color = node.active_color || color;
      }
      else {
        color = settings('defaultNodeActiveColor') || color;
      }

      // Outer Border:
      if (activeOuterBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeActiveOuterBorderColor');
        context.arc(x, y, size + activeBorderSize + activeOuterBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
      // Border:
      if (activeBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeActiveBorderColor');
        context.arc(x, y, size + activeBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }
    else {
      // Outer Border:
      if (outerBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeOuterBorderColor');
        context.arc(x, y, size + borderSize + outerBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }

      // Border:
      if (borderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeBorderColor');
        context.arc(x, y, size + borderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }

    // Shape:
    context.fillStyle = color;
    context.beginPath();
    drawSquare(node, x, y, size, context);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      sigma.utils.canvas.resetLevel(context);
    }

    // Image:
    if (node.image) {
      sigma.utils.canvas.drawImage(
        node, x, y, size, context, imgCrossOrigin, settings('imageThreshold'), drawSquare
      );
    }

    // Icon:
    if (node.icon) {
      sigma.utils.canvas.drawIcon(node, x, y, size, context, settings('iconThreshold'));
    }

  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  var drawStar = function(node, x, y, size, context) {
    var pcount = (node.star && node.star.numPoints) || 5,
        inRatio = (node.star && node.star.innerRatio) || 0.5,
        outR = size,
        inR = size * inRatio,
        angleOffset = Math.PI / pcount;

    context.moveTo(x, y - size); // first point on outer radius, top

    for(var i = 0; i < pcount; i++) {
      context.lineTo(
        x + Math.sin(angleOffset + 2 * Math.PI * i / pcount) * inR,
        y - Math.cos(angleOffset + 2 * Math.PI * i / pcount) * inR
      );
      context.lineTo(
        x + Math.sin(2 * Math.PI * (i + 1) / pcount) * outR,
        y - Math.cos(2 * Math.PI * (i + 1) / pcount) * outR
      );
    }
  };


  /**
   * The node renderer renders the node as a star.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   * @param  {?object}                  options  Force optional parameters (e.g. color).
   */
  sigma.canvas.nodes.star = function(node, context, settings, options) {
    var o = options || {},
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'] || 1,
        x = node[prefix + 'x'],
        y = node[prefix + 'y'],
        defaultNodeColor = settings('defaultNodeColor'),
        imgCrossOrigin = settings('imgCrossOrigin') || 'anonymous',
        borderSize = node.border_size || settings('nodeBorderSize'),
        outerBorderSize = settings('nodeOuterBorderSize'),
        activeBorderSize = node.border_size || settings('nodeActiveBorderSize'),
        activeOuterBorderSize = settings('nodeActiveOuterBorderSize'),
        color = o.color || node.color || defaultNodeColor,
        borderColor = settings('nodeBorderColor') === 'default'
          ? settings('defaultNodeBorderColor')
          : (o.borderColor || node.border_color || defaultNodeColor),
        level = node.active ? settings('nodeActiveLevel') : node.level;

    // Level:
    sigma.utils.canvas.setLevel(level, context);

    if (node.active) {
      // Color:
      if (settings('nodeActiveColor') === 'node') {
        color = node.active_color || color;
      }
      else {
        color = settings('defaultNodeActiveColor') || color;
      }

      // Outer Border:
      if (activeOuterBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeActiveOuterBorderColor');
        context.arc(x, y, size + activeBorderSize + activeOuterBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
      // Border:
      if (activeBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeActiveBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeActiveBorderColor');
        context.arc(x, y, size + activeBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }
    else {
      // Outer Border:
      if (outerBorderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeOuterBorderColor') === 'node' ?
          (color || defaultNodeColor) :
          settings('defaultNodeOuterBorderColor');
        context.arc(x, y, size + borderSize + outerBorderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }

      // Border:
      if (borderSize > 0) {
        context.beginPath();
        context.fillStyle = settings('nodeBorderColor') === 'node'
          ? borderColor
          : settings('defaultNodeBorderColor');
        context.arc(x, y, size + borderSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
    }

    // Shape:
    context.fillStyle = color;
    context.beginPath();
    drawStar(node, x, y, size, context);
    context.closePath();
    context.fill();

    // reset shadow
    if (level) {
      sigma.utils.canvas.resetLevel(context);
    }

    // Image:
    if (node.image) {
      sigma.utils.canvas.drawImage(
        node, x, y, size, context, imgCrossOrigin, settings('imageThreshold'), drawStar
      );
    }

    // Icon:
    if (node.icon) {
      sigma.utils.canvas.drawIcon(node, x, y, size, context, settings('iconThreshold'));
    }

  };
})();

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.settings');

  /**
  * Extended sigma settings for sigma.plugins.activeState.
  */
  var settings = {
    /**
     * NODE BORDERS SETTINGS:
     * **********************
     */
    // {string} Indicates how to choose the nodes border color.
    //          Available values: "node", "default"
    nodeBorderColor: 'node,',
    // defaultNodeBorderColor is set in sigma.settings.
    // {string} Indicates how to choose the nodes outer border color.
    //          Available values: "node", "default"
    nodeOuterBorderColor: '',
    // {number} The size of the outer border of nodes.
    nodeOuterBorderSize: 0,
    // {string} The default node outer border's color.
    defaultNodeOuterBorderColor: '#000',

    /**
     * HOVERED NODE BORDERS SETTINGS:
     * **********************
     */
    // {number} The size of the border of hovered nodes.
    nodeHoverBorderSize: 0,
    // {string} Indicates how to choose the hovered nodes border color.
    //          Available values: "node", "default"
    nodeHoverBorderColor: 'node,',
    // {number} The default hovered node border's color.
    defaultNodeHoverBorderColor: '#000',

    /**
     * ACTIVE NODE BORDERS SETTINGS:
     * **********************
     */
    // {number} The size of the border of active nodes.
    nodeActiveBorderSize: 0,
    // {string} Indicates how to choose the active nodes border color.
    //          Available values: "node", "default"
    nodeActiveBorderColor: 'node,',
    // {number} The default active node border's color.
    defaultNodeActiveBorderColor: '#000',
    // {string} Indicates how to choose the active nodes outer border color.
    //          Available values: "node", "default"
    nodeActiveOuterBorderColor: '',
    // {number} The size of the outer border of active nodes.
    nodeActiveOuterBorderSize: 0,
    // {string} The default active node outer border's color.
    defaultNodeActiveOuterBorderColor: '#000',

    /**
     * ACTIVE STATE SETTINGS:
     * **********************
     */
    // {string}
    defaultLabelActiveColor: '#000',
    // {string} The active node's label font. If not specified, will heritate
    //          the "font" value.
    activeFont: '',
    // {string} Example: 'bold'
    activeFontStyle: '',
    // {string} Indicates how to choose the labels color of active nodes.
    //          Available values: "node", "default"
    labelActiveColor: 'default',
    // {string} Indicates how to choose the active nodes color.
    //          Available values: "node", "default"
    nodeActiveColor: 'node',
    // {string}
    defaultNodeActiveColor: 'rgb(236, 81, 72)',
    // {string} Indicates how to choose the active nodes color.
    //          Available values: "edge", "default"
    edgeActiveColor: 'edge',
    // {string}
    defaultEdgeActiveColor: 'rgb(236, 81, 72)',

    /**
     * NODE LEVEL SETTINGS:
     * **********************
     */
    // {number} The (Material Design) shadow level of active nodes.
    //          Available values: 0 (no shadow), 1 (low), 2, 3, 4, 5 (high)
    nodeActiveLevel: 0,
    // {number} The (Material Design) shadow level of hovered nodes.
    //          Available values: 0 (no shadow), 1 (low), 2, 3, 4, 5 (high)
    nodeHoverLevel: 0,
    // {number} The (Material Design) shadow level of active edges.
    //          Available values: 0 (no shadow), 1 (low), 2, 3, 4, 5 (high)
    edgeActiveLevel: 0,
    // {number} The (Material Design) shadow level of hovered edges.
    //          Available values: 0 (no shadow), 1 (low), 2, 3, 4, 5 (high)
    edgeHoverLevel: 0,


    /**
     * NODE ICONS AND IMAGES SETTINGS:
     * *******************************
     */
    // {number} The minimum size a node must have to see its icon displayed.
    iconThreshold: 8,
    // {number} The minimum size a node must have to see its image displayed.
    imageThreshold: 8,
    // {string} Controls the security policy of the image loading, from the
    // browser's side.
    imgCrossOrigin: 'anonymous'
  };

  // Export the previously designed settings:
  sigma.settings = sigma.utils.extend(sigma.settings || {}, settings);

}).call(this);

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.svg.edges');

  /**
   * It renders the edge as a tapered line.
   * Danny Holten, Petra Isenberg, Jean-Daniel Fekete, and J. Van Wijk (2010)
   * Performance Evaluation of Tapered, Curved, and Animated Directed-Edge
   * Representations in Node-Link Graphs. Research Report, Sep 2010.
   */
  sigma.svg.edges.tapered = {

    /**
     * SVG Element creation.
     *
     * @param  {object}                   edge       The edge object.
     * @param  {object}                   source     The source node object.
     * @param  {object}                   target     The target node object.
     * @param  {configurable}             settings   The settings function.
     */
    create: function(edge, source, target, settings) {
      var color = edge.color,
          prefix = settings('prefix') || '',
          edgeColor = settings('edgeColor'),
          defaultNodeColor = settings('defaultNodeColor'),
          defaultEdgeColor = settings('defaultEdgeColor');

      if (!color)
        switch (edgeColor) {
          case 'source':
            color = source.color || defaultNodeColor;
            break;
          case 'target':
            color = target.color || defaultNodeColor;
            break;
          default:
            color = defaultEdgeColor;
            break;
        }

      var polygon = document.createElementNS(settings('xmlns'), 'polygon');

      // Attributes
      polygon.setAttributeNS(null, 'data-edge-id', edge.id);
      polygon.setAttributeNS(null, 'class', settings('classPrefix') + '-edge');
      polygon.setAttributeNS(null, 'fill', color);
      polygon.setAttributeNS(null, 'fill-opacity', 0.6);
      polygon.setAttributeNS(null, 'stroke-width', 0);

      return polygon;
    },

    /**
     * SVG Element update.
     *
     * @param  {object}                   edge       The edge object.
     * @param  {DOMElement}               polygon    The polygon DOM Element.
     * @param  {object}                   source     The source node object.
     * @param  {object}                   target     The target node object.
     * @param  {configurable}             settings   The settings function.
     */
    update: function(edge, polygon, source, target, settings) {
      var prefix = settings('prefix') || '',
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        size = edge[prefix + 'size'] || 1,
        dist = sigma.utils.getDistance(sX, sY, tX, tY),
        c,
        p;

      if (!dist) return; // should be a self-loop

      // Intersection points:
      c = sigma.utils.getCircleIntersection(sX, sY, size, tX, tY, dist);

      // Path
      p = tX+','+tY+' '+c.xi+','+c.yi+' '+c.xi_prime+','+c.yi_prime;
      polygon.setAttributeNS(null, "points", p);

      // Showing
      polygon.style.display = '';

      return this;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.edges');

  /**
   * This edge renderer will display edges as arrows going from the source node
   * to the target node. To deal with edge thicknesses, the lines are made of
   * three triangles: two forming rectangles, with the gl.TRIANGLES drawing
   * mode.
   *
   * It is expensive, since drawing a single edge requires 9 points, each
   * having a lot of attributes.
   */
  sigma.webgl.edges.arrow = {
    POINTS: 9,
    ATTRIBUTES: 11,
    addEdge: function(edge, source, target, data, i, prefix, settings) {
      var w = (edge[prefix + 'size'] || 1) / 2,
          x1 = source[prefix + 'x'],
          y1 = source[prefix + 'y'],
          x2 = target[prefix + 'x'],
          y2 = target[prefix + 'y'],
          targetSize = target[prefix + 'size'],
          color = edge.active ?
            edge.active_color || settings('defaultEdgeActiveColor') :
            edge.color;

      if (!color)
        switch (settings('edgeColor')) {
          case 'source':
            color = source.color || settings('defaultNodeColor');
            break;
          case 'target':
            color = target.color || settings('defaultNodeColor');
            break;
          default:
            color = settings('defaultEdgeColor');
            break;
        }

      if (edge.active) {
        color = settings('edgeActiveColor') === 'edge' ?
          (color || defaultEdgeColor) :
          settings('defaultEdgeActiveColor');
      }

      // Normalize color:
      color = sigma.utils.floatColor(color);

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 0.0;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = 0.0;
      data[i++] = color;

      // Arrow head:
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 1.0;
      data[i++] = -1.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = targetSize;
      data[i++] = 1.0;
      data[i++] = 0.0;
      data[i++] = 1.0;
      data[i++] = 1.0;
      data[i++] = color;
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var positionLocation1 =
            gl.getAttribLocation(program, 'a_pos1'),
          positionLocation2 =
            gl.getAttribLocation(program, 'a_pos2'),
          thicknessLocation =
            gl.getAttribLocation(program, 'a_thickness'),
          targetSizeLocation =
            gl.getAttribLocation(program, 'a_tSize'),
          delayLocation =
            gl.getAttribLocation(program, 'a_delay'),
          minusLocation =
            gl.getAttribLocation(program, 'a_minus'),
          headLocation =
            gl.getAttribLocation(program, 'a_head'),
          headPositionLocation =
            gl.getAttribLocation(program, 'a_headPosition'),
          colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix'),
          matrixHalfPiLocation =
            gl.getUniformLocation(program, 'u_matrixHalfPi'),
          matrixHalfPiMinusLocation =
            gl.getUniformLocation(program, 'u_matrixHalfPiMinus'),
          ratioLocation =
            gl.getUniformLocation(program, 'u_ratio'),
          nodeRatioLocation =
            gl.getUniformLocation(program, 'u_nodeRatio'),
          arrowHeadLocation =
            gl.getUniformLocation(program, 'u_arrowHead'),
          scaleLocation =
            gl.getUniformLocation(program, 'u_scale');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniform1f(
        ratioLocation,
        params.ratio / Math.pow(params.ratio, params.settings('edgesPowRatio'))
      );
      gl.uniform1f(
        nodeRatioLocation,
        Math.pow(params.ratio, params.settings('nodesPowRatio')) /
        params.ratio
      );
      gl.uniform1f(arrowHeadLocation, 5.0);
      gl.uniform1f(scaleLocation, params.scalingRatio);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);
      gl.uniformMatrix2fv(
        matrixHalfPiLocation,
        false,
        sigma.utils.matrices.rotation(Math.PI / 2, true)
      );
      gl.uniformMatrix2fv(
        matrixHalfPiMinusLocation,
        false,
        sigma.utils.matrices.rotation(-Math.PI / 2, true)
      );

      gl.enableVertexAttribArray(positionLocation1);
      gl.enableVertexAttribArray(positionLocation2);
      gl.enableVertexAttribArray(thicknessLocation);
      gl.enableVertexAttribArray(targetSizeLocation);
      gl.enableVertexAttribArray(delayLocation);
      gl.enableVertexAttribArray(minusLocation);
      gl.enableVertexAttribArray(headLocation);
      gl.enableVertexAttribArray(headPositionLocation);
      gl.enableVertexAttribArray(colorLocation);

      gl.vertexAttribPointer(positionLocation1,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(positionLocation2,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );
      gl.vertexAttribPointer(thicknessLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        16
      );
      gl.vertexAttribPointer(targetSizeLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        20
      );
      gl.vertexAttribPointer(delayLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        24
      );
      gl.vertexAttribPointer(minusLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        28
      );
      gl.vertexAttribPointer(headLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        32
      );
      gl.vertexAttribPointer(headPositionLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        36
      );
      gl.vertexAttribPointer(colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        40
      );

      gl.drawArrays(
        gl.TRIANGLES,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_pos1;',
          'attribute vec2 a_pos2;',
          'attribute float a_thickness;',
          'attribute float a_tSize;',
          'attribute float a_delay;',
          'attribute float a_minus;',
          'attribute float a_head;',
          'attribute float a_headPosition;',
          'attribute float a_color;',

          'uniform vec2 u_resolution;',
          'uniform float u_ratio;',
          'uniform float u_nodeRatio;',
          'uniform float u_arrowHead;',
          'uniform float u_scale;',
          'uniform mat3 u_matrix;',
          'uniform mat2 u_matrixHalfPi;',
          'uniform mat2 u_matrixHalfPiMinus;',

          'varying vec4 color;',

          'void main() {',
            // Find the good point:
            'vec2 pos = normalize(a_pos2 - a_pos1);',

            'mat2 matrix = (1.0 - a_head) *',
              '(',
                'a_minus * u_matrixHalfPiMinus +',
                '(1.0 - a_minus) * u_matrixHalfPi',
              ') + a_head * (',
                'a_headPosition * u_matrixHalfPiMinus * 0.6 +',
                '(a_headPosition * a_headPosition - 1.0) * mat2(1.0)',
              ');',

            'pos = a_pos1 + (',
              // Deal with body:
              '(1.0 - a_head) * a_thickness * u_ratio * matrix * pos +',
              // Deal with head:
              'a_head * u_arrowHead * a_thickness * u_ratio * matrix * pos +',
              // Deal with delay:
              'a_delay * pos * (',
                'a_tSize / u_nodeRatio +',
                'u_arrowHead * a_thickness * u_ratio',
              ')',
            ');',

            // Scale from [[-1 1] [-1 1]] to the container:
            'gl_Position = vec4(',
              '((u_matrix * vec3(pos, 1)).xy /',
                'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
              '0,',
              '1',
            ');',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',

          'void main(void) {',
            'gl_FragColor = color;',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.edges');

  /**
   * This edge renderer will display edges as lines going from the source node
   * to the target node. To deal with edge thicknesses, the lines are made of
   * two triangles forming rectangles, with the gl.TRIANGLES drawing mode.
   *
   * It is expensive, since drawing a single edge requires 6 points, each
   * having 7 attributes (source position, target position, thickness, color
   * and a flag indicating which vertice of the rectangle it is).
   */
  sigma.webgl.edges.def = {
    POINTS: 6,
    ATTRIBUTES: 7,
    addEdge: function(edge, source, target, data, i, prefix, settings) {
      var w = (edge[prefix + 'size'] || 1) / 2,
          x1 = source[prefix + 'x'],
          y1 = source[prefix + 'y'],
          x2 = target[prefix + 'x'],
          y2 = target[prefix + 'y'],
          color = edge.active ?
            edge.active_color || settings('defaultEdgeActiveColor') :
            edge.color;

      if (!color)
        switch (settings('edgeColor')) {
          case 'source':
            color = source.color || settings('defaultNodeColor');
            break;
          case 'target':
            color = target.color || settings('defaultNodeColor');
            break;
          default:
            color = settings('defaultEdgeColor');
            break;
        }

      if (edge.active) {
        color = settings('edgeActiveColor') === 'edge' ?
          (color || defaultEdgeColor) :
          settings('defaultEdgeActiveColor');
      }

      // Normalize color:
      color = sigma.utils.floatColor(color);

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = 1.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = x1;
      data[i++] = y1;
      data[i++] = w;
      data[i++] = 0.0;
      data[i++] = color;

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = 1.0;
      data[i++] = color;

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = x2;
      data[i++] = y2;
      data[i++] = w;
      data[i++] = 0.0;
      data[i++] = color;
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          positionLocation1 =
            gl.getAttribLocation(program, 'a_position1'),
          positionLocation2 =
            gl.getAttribLocation(program, 'a_position2'),
          thicknessLocation =
            gl.getAttribLocation(program, 'a_thickness'),
          minusLocation =
            gl.getAttribLocation(program, 'a_minus'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix'),
          matrixHalfPiLocation =
            gl.getUniformLocation(program, 'u_matrixHalfPi'),
          matrixHalfPiMinusLocation =
            gl.getUniformLocation(program, 'u_matrixHalfPiMinus'),
          ratioLocation =
            gl.getUniformLocation(program, 'u_ratio'),
          scaleLocation =
            gl.getUniformLocation(program, 'u_scale');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniform1f(
        ratioLocation,
        params.ratio / Math.pow(params.ratio, params.settings('edgesPowRatio'))
      );
      gl.uniform1f(scaleLocation, params.scalingRatio);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);
      gl.uniformMatrix2fv(
        matrixHalfPiLocation,
        false,
        sigma.utils.matrices.rotation(Math.PI / 2, true)
      );
      gl.uniformMatrix2fv(
        matrixHalfPiMinusLocation,
        false,
        sigma.utils.matrices.rotation(-Math.PI / 2, true)
      );

      gl.enableVertexAttribArray(colorLocation);
      gl.enableVertexAttribArray(positionLocation1);
      gl.enableVertexAttribArray(positionLocation2);
      gl.enableVertexAttribArray(thicknessLocation);
      gl.enableVertexAttribArray(minusLocation);

      gl.vertexAttribPointer(positionLocation1,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(positionLocation2,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );
      gl.vertexAttribPointer(thicknessLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        16
      );
      gl.vertexAttribPointer(minusLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        20
      );
      gl.vertexAttribPointer(colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        24
      );

      gl.drawArrays(
        gl.TRIANGLES,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_position1;',
          'attribute vec2 a_position2;',
          'attribute float a_thickness;',
          'attribute float a_minus;',
          'attribute float a_color;',

          'uniform vec2 u_resolution;',
          'uniform float u_ratio;',
          'uniform float u_scale;',
          'uniform mat3 u_matrix;',
          'uniform mat2 u_matrixHalfPi;',
          'uniform mat2 u_matrixHalfPiMinus;',

          'varying vec4 color;',

          'void main() {',
            // Find the good point:
            'vec2 position = a_thickness * u_ratio *',
              'normalize(a_position2 - a_position1);',

            'mat2 matrix = a_minus * u_matrixHalfPiMinus +',
              '(1.0 - a_minus) * u_matrixHalfPi;',

            'position = matrix * position + a_position1;',

            // Scale from [[-1 1] [-1 1]] to the container:
            'gl_Position = vec4(',
              '((u_matrix * vec3(position, 1)).xy /',
                'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
              '0,',
              '1',
            ');',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',

          'void main(void) {',
            'gl_FragColor = color;',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.edges');

  /**
   * This edge renderer will display edges as lines with the gl.LINES display
   * mode. Since this mode does not support well thickness, edges are all drawn
   * with the same thickness (3px), independantly of the edge attributes or the
   * zooming ratio.
   */
  sigma.webgl.edges.fast = {
    POINTS: 2,
    ATTRIBUTES: 3,
    addEdge: function(edge, source, target, data, i, prefix, settings) {
      var w = (edge[prefix + 'size'] || 1) / 2,
          x1 = source[prefix + 'x'],
          y1 = source[prefix + 'y'],
          x2 = target[prefix + 'x'],
          y2 = target[prefix + 'y'],
          color = edge.active ?
            edge.active_color || settings('defaultEdgeActiveColor') :
            edge.color;

      if (!color)
        switch (settings('edgeColor')) {
          case 'source':
            color = source.color || settings('defaultNodeColor');
            break;
          case 'target':
            color = target.color || settings('defaultNodeColor');
            break;
          default:
            color = settings('defaultEdgeColor');
            break;
        }

      if (edge.active) {
        color = settings('edgeActiveColor') === 'edge' ?
          (color || defaultEdgeColor) :
          settings('defaultEdgeActiveColor');
      }

      // Normalize color:
      color = sigma.utils.floatColor(color);

      data[i++] = x1;
      data[i++] = y1;
      data[i++] = color;

      data[i++] = x2;
      data[i++] = y2;
      data[i++] = color;
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          positionLocation =
            gl.getAttribLocation(program, 'a_position'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);

      gl.enableVertexAttribArray(positionLocation);
      gl.enableVertexAttribArray(colorLocation);

      gl.vertexAttribPointer(positionLocation,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );

      gl.lineWidth(3);
      gl.drawArrays(
        gl.LINES,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_position;',
          'attribute float a_color;',

          'uniform vec2 u_resolution;',
          'uniform mat3 u_matrix;',

          'varying vec4 color;',

          'void main() {',
            // Scale from [[-1 1] [-1 1]] to the container:
            'gl_Position = vec4(',
              '((u_matrix * vec3(a_position, 1)).xy /',
                'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
              '0,',
              '1',
            ');',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',

          'void main(void) {',
            'gl_FragColor = color;',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

;
(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.nodes');

  /**
   * This node renderer can display nodes as regular polygons:
   * triangle, square, pentagram, hexagon..
   *
   * The fragment shader does not deal with anti-aliasing, so make sure that
   * you deal with it somewhere else in the code (by default, the WebGL
   * renderer will oversample the rendering through the webglOversamplingRatio
   * value).
   */
  sigma.webgl.nodes.def = {

    POINTS: 3,
    ATTRIBUTES: 12,

    addNode: function(node, data, i, prefix, settings) {

      var self = this;

      var trueColor = node.color || settings('defaultNodeColor');
      var imgCrossOrigin = settings('imgCrossOrigin') || 'anonymous';

      if (node.active) {
        if (settings('nodeActiveColor') === 'node') {
          trueColor = node.active_color || trueColor;
        }
        else {
          trueColor = settings('defaultNodeActiveColor') || trueColor;
        }
      }
      var color = sigma.utils.floatColor(
        trueColor || settings('defaultNodeColor')
      );


      if (typeof self.spriteSheet === "undefined") {
        self.createSpriteSheet(settings);
      }
      var imageIndex = -1;

      var scale = 0.7;

      var numPoints = 999; // leave default
      var imageScaleW = 1.0; // leave default
      var imageScaleH = 1.0;

      var isConvex = 1;
      var shapeRotation = 0;

      switch (node.type || 'circle') {

        case 'circle':
        case 'disc':
        case 'disk':
          isConvex = 1;
          numPoints = 999;
          scale = 1.0;
          break;

        case 'square':
          isConvex = 0;
          numPoints = 4;
          scale = 0.7;
          if (typeof node.square !== "undefined") {
            if (typeof node.square.rotate === "number") {
              shapeRotation = node.square.rotate;
            }
          }
          break;

        case 'diamond':
          isConvex = 0;
          numPoints = 4;
          scale = 0.7;
          shapeRotation = 45 * Math.PI / 180; // 45°
          if (typeof node.diamond !== "undefined") {
            if (typeof node.diamond.rotate === "number") {
              shapeRotation = node.diamond.rotate;
            }
          }
          break;

        case 'triangle':
          isConvex = 0;
          numPoints = 3;
          scale = 0.5;
          shapeRotation = Math.PI;
          if (typeof node.triangle !== "undefined") {
            if (typeof node.triangle.rotate === "number") {
              shapeRotation = node.triangle.rotate;
            }
          }
          break;

        case 'star':
          isConvex = 1;
          scale = 0.7;
          numPoints = 5;
          if (typeof node.star !== "undefined") {
            if (typeof node.star.numPoints === "number") {
              numPoints = node.star.numPoints;
            }
            if (typeof node.star.rotate === "number") {
              shapeRotation = node.star.rotate;
            }
            // innerRatio: node.star.innerRatio || 1.0 // ratio of inner radius in star, compared to node.size
          }
          break;

        case 'seastar':
          isConvex = 2;
          scale = 0.5;
          numPoints = 5;
          if (typeof node.seastar !== "undefined") {
            if (typeof node.seastar.numPoints === 'number') {
              numPoints = node.seastar.numPoints;
            }
            if (typeof node.seastar.rotate === 'number') {
              shapeRotation = node.seastar.rotate;
            }
            // innerRatio: node.star.innerRatio || 1.0 // ratio of inner radius in star, compared to node.size
          }
          break;



        case 'equilateral':
          isConvex = 0;
          numPoints = 7;
          scale = 0.7;
          shapeRotation = 0;
          if (typeof node.equilateral !== "undefined") {
            if (typeof node.equilateral.numPoints === "number") {
              numPoints = node.equilateral.numPoints;
            }
            if (typeof node.equilateral.rotate === "number") {
              shapeRotation = node.equilateral.rotate;
            }
          }

          break;

        case 'hexagon':
          isConvex = 0;
          numPoints = 6;
          scale = 0.7;
          if (typeof node.hexagon !== "undefined") {
            if (typeof node.hexagon.rotate === "number") {
              shapeRotation = node.hexagon.rotate;
            }
          }
          break;

        case 'polygon':
          isConvex = 1;
          numPoints = 5;
          scale = 0.5;
          shapeRotation = 0;
          if (typeof node.polygon !== "undefined") {
            if (typeof node.polygon.type === "string") {
              isConvex = (node.polygon.type == 'convex') ? 1 : 0;
            }
            if (typeof node.polygon.angles === "number") {
              numPoints = Math.round(Math.max(3, Math.min(8, node.polygon.angles)));
            }
            if (typeof node.polygon.scale === "number") {
              scale = node.polygon.scale || (isConvex ? 0.5 : 0.7);
            }
            if (typeof node.polygon.rotate === "number") {
              shapeRotation = node.polygon.rotate;
            }
          }
          break;

        case 'cross':
          isConvex = 0; // desn't matter much
          numPoints = 9; // special code
          scale = 0.10;
          if (typeof node.cross !== "undefined") {
            if (typeof node.cross.lineWeight === "number") {
              scale = Math.max(0.10, Math.min(0.50, (node.cross.lineWeight) * 0.1));
            }
            if (typeof node.rotate === "number") {
              shapeRotation = node.cross.rotate;
            }
          }
          break;
      }


      if (typeof node.image !== "undefined") {

        var url = node.image.url || "";
        if (url.length > 0) {
          imageIndex = self.getImage(url, imgCrossOrigin);
          imageScaleW = node.image.w || 1.0;
          imageScaleH = node.image.h || 1.0;
        }

      }

      if (typeof node.icon !== "undefined") {

        var font = "Arial";
        if (typeof node.icon.font === "string") {
          font = node.icon.font;
        }

        var content = "";
        if (typeof node.icon.content === "string") {
          content = node.icon.content;
        }

        // adjust icon size
        var fontSizeRatio = 0.70;
        if (typeof node.icon.scale === "number") {
          fontSizeRatio = Math.abs(Math.max(0.01, node.icon.scale)) * 0.5;
        }

        // adjust icon background (border) and foreground (main) color
        var fgColor = node.icon.color || trueColor; // '#f00';
        var bgColor = node.color || trueColor;

        // adjust icon position
        var px = 0.5,
          py = 0.5;
        if (typeof node.icon.x === "number") {
          px = node.icon.x;
        }
        if (typeof node.icon.y === "number") {
          py = node.icon.y;
        }

        imageIndex = self.getText(font, bgColor, fgColor, fontSizeRatio, px, py, content);

      }



      data[i++] = node[prefix + 'x'];
      data[i++] = node[prefix + 'y'];
      data[i++] = node[prefix + 'size'];
      data[i++] = color;
      data[i++] = 0;
      data[i++] = isConvex;
      data[i++] = numPoints;
      data[i++] = scale;
      data[i++] = shapeRotation;
      data[i++] = imageIndex;
      data[i++] = imageScaleW;
      data[i++] = imageScaleH;



      data[i++] = node[prefix + 'x'];
      data[i++] = node[prefix + 'y'];
      data[i++] = node[prefix + 'size'];
      data[i++] = color;
      data[i++] = 2 * Math.PI / 3;
      data[i++] = isConvex;
      data[i++] = numPoints;
      data[i++] = scale;
      data[i++] = shapeRotation;
      data[i++] = imageIndex;
      data[i++] = imageScaleW;
      data[i++] = imageScaleH;


      data[i++] = node[prefix + 'x'];
      data[i++] = node[prefix + 'y'];
      data[i++] = node[prefix + 'size'];
      data[i++] = color;
      data[i++] = 4 * Math.PI / 3;
      data[i++] = isConvex;
      data[i++] = numPoints;
      data[i++] = scale;
      data[i++] = shapeRotation;
      data[i++] = imageIndex;
      data[i++] = imageScaleW;
      data[i++] = imageScaleH;



    },

    render: function(gl, program, data, params) {
      var buffer, self = this,
        args = arguments;


      if (typeof self.spriteSheet === 'undefined') {
        self.createSpriteSheet();
      }

      // Define attributes:
      var positionLocation = gl.getAttribLocation(program, 'a_position'),
        sizeLocation = gl.getAttribLocation(program, 'a_size'),
        colorLocation = gl.getAttribLocation(program, 'a_color'),
        angleLocation = gl.getAttribLocation(program, 'a_angle'),
        imageLocation = gl.getAttribLocation(program, 'a_image'),
        shapeLocation = gl.getAttribLocation(program, 'a_shape'),
        resolutionLocation = gl.getUniformLocation(program, 'u_resolution'),
        matrixLocation = gl.getUniformLocation(program, 'u_matrix'),
        ratioLocation = gl.getUniformLocation(program, 'u_ratio'),
        scaleLocation = gl.getUniformLocation(program, 'u_scale'),


        spriteDimLocation = gl.getUniformLocation(program, 'u_sprite_dim'),
        textureDimLocation = gl.getUniformLocation(program, 'u_texture_dim'),
        samplerUniformLocation = gl.getUniformLocation(program, 'u_sampler');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniform1f(
        ratioLocation, 1 / Math.pow(params.ratio, params.settings('nodesPowRatio')));
      gl.uniform1f(scaleLocation, params.scalingRatio);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);


      gl.uniform2f(spriteDimLocation, self.spriteSheet.spriteWidth, self.spriteSheet.spriteHeight);
      gl.uniform2f(textureDimLocation, self.spriteSheet.maxWidth, self.spriteSheet.maxHeight);

      gl.enableVertexAttribArray(positionLocation);
      gl.enableVertexAttribArray(sizeLocation);
      gl.enableVertexAttribArray(colorLocation);
      gl.enableVertexAttribArray(angleLocation);
      gl.enableVertexAttribArray(shapeLocation);
      gl.enableVertexAttribArray(imageLocation);

      gl.vertexAttribPointer(
        positionLocation, 2, gl.FLOAT, false, this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer(
        sizeLocation, 1, gl.FLOAT, false, this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
      gl.vertexAttribPointer(
        colorLocation, 1, gl.FLOAT, false, this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 12);
      gl.vertexAttribPointer(
        angleLocation, 1, gl.FLOAT, false, this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);

      gl.vertexAttribPointer(
        shapeLocation, 4, gl.FLOAT, false, this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 20);

      gl.vertexAttribPointer(
        imageLocation, 3, gl.FLOAT, false, this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 36);



      // https://developer.mozilla.org/en-US/docs/Web/WebGL/Using_textures_in_WebGL
      if (typeof self.texture === 'undefined') {

        self.texture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, self.texture);


        // this function can throw a SecurityError:
        // "Failed to execute 'texImage2D' on 'WebGLRenderingContext':
        // Tainted canvases may not be loaded."
        //
        // This means the browser believes the canvas data is tainted / compromised
        // by an untrusted source (eg. an image from another website has been copied in it).
        // This can be caused by a cross-domain policy problem (eg. you used the
        // file:// protocol, or the image provider is not trusted)
        gl.texImage2D(
          gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
          self.spriteSheet.canvas
        );

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);


        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.generateMipmap(gl.TEXTURE_2D);

        //gl.uniform1i(gl.getUniformLocation(program, "u_sampler"), 0);
        //  gl.bindTexture(gl.TEXTURE_2D, null);
        //console.log("empty texture created");
      }


      //console.log("self.updateNeeded: "+self.updateNeeded);
      if (typeof self.texture !== "undefined") {
        //console.log("texture defined, selecting it..");
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, self.texture);

        if (self.updateNeeded) {
          //console.log("update needed!");
          self.updateNeeded = false;

          // https://www.khronos.org/webgl/public-mailing-list/archives/1212/msg00050.html
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

          gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.spriteSheet.canvas);
          //console.log("texture updated");
        }

        gl.uniform1i(gl.getUniformLocation(program, "u_sampler"), 0);

      }


      gl.drawArrays(
        gl.TRIANGLES,
        params.start || 0, params.count || (data.length / this.ATTRIBUTES)
      );


    },

    initProgram: function(gl) {
      var vertexShader, fragmentShader, program;

      vertexShader = sigma.utils.loadShader(
        gl, [
          'attribute vec2 a_position;',
          'attribute float a_size;',
          'attribute float a_color;',
          'attribute float a_angle;',

          'attribute vec4 a_shape;',
          'attribute vec3 a_image;',

          'uniform vec2 u_resolution;',
          'uniform float u_ratio;',
          'uniform float u_scale;',
          'uniform mat3 u_matrix;',
          'uniform vec2 u_sprite_dim;',
          'uniform vec2 u_texture_dim;',

          'varying vec4 shape;',
          'varying highp vec4 v_sprite;',
          'varying vec4 color;',
          'varying vec2 center;',
          'varying float radius;',
          'varying vec3 image;',

          'void main() {',
          // Multiply the point size twice:
          'radius = a_size * u_ratio;',

          // Scale from [[-1 1] [-1 1]] to the container:
          'vec2 position = (u_matrix * vec3(a_position, 1)).xy;',

          'center = position * u_scale;',
          'center = vec2(center.x, u_scale * u_resolution.y - center.y);',

          'position = position +',
          '2.0 * radius * vec2(cos(a_angle), sin(a_angle));',
          'position = (position / u_resolution * 2.0 - 1.0) * vec2(1, -1);',

          'radius = radius * u_scale;',

          // s: isconvex, t: angles, p: scale, q: rotation
          'shape = a_shape;',
          'image = a_image;',

          // compute the index in the texture
          'highp vec2 sp = ',
          'vec2(mod((a_image.s * u_sprite_dim.x), u_texture_dim.x),',
          'floor((a_image.s * u_sprite_dim.x) / u_texture_dim.y) * u_sprite_dim.y);',

          // move pointer to center of sprite
          'sp = vec2(sp.x + (u_sprite_dim.x * 0.5),',
          ' sp.y + (u_sprite_dim.y * 0.5));',

          // we have the coordinates in pixel, we need to normalize [0.0, 1.0]
          'v_sprite = vec4(',
          'sp.x / u_texture_dim.x,',
          'sp.y / u_texture_dim.y,',
          'u_sprite_dim.x / u_texture_dim.x,',

          // https://www.khronos.org/webgl/public-mailing-list/archives/1212/msg00050.html
          '- u_sprite_dim.y / u_texture_dim.y', // the minus here is to flip the texture
          ');',

          'gl_Position = vec4(position, 0, 1);',

          // Extract the color:
          'float c = a_color;',
          'color.b = mod(c, 256.0); c = floor(c / 256.0);',
          'color.g = mod(c, 256.0); c = floor(c / 256.0);',
          'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
          'color.a = 1.0;',
          '}'
        ].join('\n'), gl.VERTEX_SHADER);

      fragmentShader = sigma.utils.loadShader(
        gl, [

          '#ifdef GL_ES',
          'precision mediump float;',
          '#endif',

          '#define PI_2 6.283185307179586',
          '#define MAX_ANGLES 8', // no need to support a lot of angles, actually

          'varying vec4 shape;',
          'varying highp vec4 v_sprite;',
          'varying vec4 color;',
          'varying vec2 center;',
          'varying float radius;',
          'varying vec3 image;',

          'uniform sampler2D u_sampler;',

          'void main(void) {',


          // s: isconvex, t: angles, p: scale, q: rotation

          'int angles = int(shape.t);', // nb angles
          'int convex = int(shape.s);', // 0 for concave, 1 for convex

          'vec2 m = gl_FragCoord.xy - center;',

          'vec2 p = m.xy/radius;',


          'float theta = atan(p.y,p.x);',

          // transparent
          'vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);',


          // if we want to rotate the background:
          //'float bgAngle = 0.8;',
          //'mat2 bgRot = mat2(cos(bgAngle),sin(bgAngle),-sin(bgAngle),cos(bgAngle));',
          //'vec2 sp = p * bgRot;',


          // now we need to normalize pixels

          'vec4 color1 = (image.s >= 0.0) ?',
          ' texture2D(u_sampler, ',
          'vec2(',
          '(v_sprite.s + v_sprite.p * p.x * 0.5 * image.t),',
          '(v_sprite.t + v_sprite.q * p.y * 0.5 * image.p)',
          '))',
          ' : color',
          ';',


          // rotate the shape (shape.q is the rotation angle)
          'mat2 shapeRot = mat2(cos(shape.q),sin(shape.q),-sin(shape.q),cos(shape.q));',
          'p = p * shapeRot;',


          // render a disc
          'if (angles > 9) {',
          'gl_FragColor = ',
          // check if we are in the circle
          '((radius - sqrt(m.x * m.x + m.y * m.y)) > 0.0)',
          '? color1 : color0;',

          // render a cross
          '} else if (angles > 8){',
          'gl_FragColor = (',
          '(abs(p.x) > 0.0 && abs(p.x) < (1.0 - sin(shape.p)) && abs(p.y) < shape.p)',
          '|| (abs(p.y) > 0.0 && abs(p.y) < (1.0 - sin(shape.p)) && abs(p.x) < shape.p)',
          ') ? color1 : color0;',

          // render a polygon
          // note: this method does not permit changing a star's inner radius
          '} else {',

          // render a rounded star


          /*
          'if (false){', //convex > 0) {',
          // here shape.s is the number of angles and already in float
          // so we use it directly rather than 'angles'
          'float pk = 0.2;',
          'float k = 0.5;',
          'float radstart = 0.4;',
          'float n = 5.0;',
          'float powr = 1.0;',

          'if (dot(p,p) < ',
          '(1.0/pk',
          '* 1.0 / (',
          '1.0 - k ',
          '* pow(',
          '2.0*n ',
          '* abs(',
          'mod(',
          '(theta + radstart) / PI_2, 1.0/n) ',
          ' - 1.0/(2.0 * n)',
          ')',
          ', powr',
          ')',
          ')',
          ')',
          ') {',
          //'if (dot(p,p) < (  1.0 / exp(acos(sin(theta*shape.t)*0.5)))  )',
          '  gl_FragColor = color1;',
          'else ',
          'discard;',
          '} else {',
          */


          // divide scale by two for convex shapes, so that spikes are not cropped
          'float scale = (convex > 0) ? shape.p * 0.5 : shape.p;',

          // compute the angle for each side
          'float angle = PI_2 / shape.t;',
          'mat2 t = mat2(cos(angle),sin(angle),-sin(angle),cos(angle));',

          'int q = 0;',
          'for (int i=0;i<MAX_ANGLES;i++) {',
          'if (i >= angles) break;',

          'if (p.y < scale) q++;',

          'p *= t;',
          '}',

          'gl_FragColor =',
          '((convex > 0)', // select the kind of polygon
          '? (q > angles - (angles - 1) / 2)', // convex
          ': (q > angles - 1))', // concave
          '? color1 : color0;', // inside: color, outside: transparent
          //  '}',
          '}',


          '}'
        ].join('\n'), gl.FRAGMENT_SHADER);

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    },

    createSpriteSheet: function(settings) {
      var self = this;

      var config = {
        maxWidth: settings('spriteSheetResolution') || 2048,
        maxHeight: settings('spriteSheetResolution') || 2048,
        maxSprites: settings('spriteSheetMaxSprites') || 256
      };

      //console.log(config);

      var spriteWidth = config.maxWidth / Math.sqrt(config.maxSprites);
      var spriteHeight = config.maxHeight / Math.sqrt(config.maxSprites);

      // console.log("sprite width: " + spriteWidth + ", height: " + spriteHeight);

      // to debug you can use an existing canvas: getElementById("canvas");
      var canvas = document.createElement('canvas');
      canvas.width = config.maxWidth;
      canvas.height = config.maxHeight;

      var ctx = canvas.getContext('2d');

      self.spriteSheet = {
        canvas: canvas,
        maxWidth: config.maxWidth,
        maxHeight: config.maxHeight,
        maxSprites: config.maxSprite,
        spriteWidth: spriteWidth,
        spriteHeight: spriteHeight,
        currentIndex: 1,
        urlToIndex: {}
      };

    },

    getText: function(font, bgColor, fgColor, fontSizeRatio, px, py, text) {

      var self = this;

      var fontSize = Math.round(fontSizeRatio * self.spriteSheet.spriteHeight);

      var pwx = px * self.spriteSheet.spriteWidth;
      var phy = py * self.spriteSheet.spriteHeight;

      var uid = font +
        ':' + bgColor +
        ':' + fgColor +
        ':' + fontSize +
        ':' + text +
        ':' + pwx +
        ':' + phy;

      if (uid in self.spriteSheet.urlToIndex) {
        return self.spriteSheet.urlToIndex[uid];
      }

      var index = self.spriteSheet.currentIndex;

      self.spriteSheet.currentIndex += 1;

      self.spriteSheet.urlToIndex[uid] = index;

      var x = (index * self.spriteSheet.spriteWidth) % self.spriteSheet.maxWidth;
      var y = Math.floor(
        (index * self.spriteSheet.spriteWidth) / self.spriteSheet.maxWidth
      ) * self.spriteSheet.spriteHeight;

      var ctx = self.spriteSheet.canvas.getContext('2d');

      ctx.beginPath();
      ctx.rect(x, y, self.spriteSheet.spriteWidth, self.spriteSheet.spriteHeight);
      ctx.fillStyle = bgColor;
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = fgColor;
      ctx.font = '' + (fontSize) + 'px ' + font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x + pwx, y + phy);

      self.updateNeeded = true;

      return index;
    },

    // load an image from the internet, scale it and put in in the spreadsheet
    // there is an unmanaged cache, which will incrementally grow in size
    // in the future we should fix this memory leak somehow, eg. limited size
    // of the cache (parametrable)
    getImage: function(url, imgCrossOrigin) {

      var self = this;

      var ctx = self.spriteSheet.canvas.getContext('2d');

      if (url.length < 1) {
        return -1;
      }


      if (url in self.spriteSheet.urlToIndex) {
        return self.spriteSheet.urlToIndex[url];
      }


      var index = self.spriteSheet.currentIndex;

      if (index > self.spriteSheet.maxSprites) {
        //console.log("sorry, max number of different images reached (maxSprites: " + self.spriteSheet.maxSprites + ")");
        return -1;
      }

      self.spriteSheet.currentIndex += 1;

      self.spriteSheet.urlToIndex[url] = index;

      var img = new Image();

      img.setAttribute('crossOrigin', imgCrossOrigin);

      img.onload = function() {

        var x = (index * self.spriteSheet.spriteWidth) % self.spriteSheet.maxWidth;
        var y = Math.floor((index * self.spriteSheet.spriteWidth) / self.spriteSheet.maxWidth) * self.spriteSheet.spriteHeight;


        ctx.drawImage(
          img,
          0, 0,
          img.width, img.height,
          x, y,
          self.spriteSheet.spriteWidth, self.spriteSheet.spriteHeight
        );

        self.updateNeeded = true;

      };
      img.src = url;

      return index;
    }


  };

})();

;(function() {
  'use strict';

  sigma.utils.pkg('sigma.webgl.nodes');

  /**
   * This node renderer will display nodes in the fastest way: Nodes are basic
   * squares, drawn through the gl.POINTS drawing method. The size of the nodes
   * are represented with the "gl_PointSize" value in the vertex shader.
   *
   * It is the fastest node renderer here since the buffer just takes one line
   * to draw each node (with attributes "x", "y", "size" and "color").
   *
   * Nevertheless, this method has some problems, especially due to some issues
   * with the gl.POINTS:
   *  - First, if the center of a node is outside the scene, the point will not
   *    be drawn, even if it should be partly on screen.
   *  - I tried applying a fragment shader similar to the one in the default
   *    node renderer to display them as discs, but it did not work fine on
   *    some computers settings, filling the discs with weird gradients not
   *    depending on the actual color.
   */
  sigma.webgl.nodes.fast = {
    POINTS: 1,
    ATTRIBUTES: 4,
    addNode: function(node, data, i, prefix, settings) {
      var color = node.color || settings('defaultNodeColor');

      if (node.active) {
        if (settings('nodeActiveColor') === 'node') {
          color = node.active_color || color;
        }
        else {
          color = settings('defaultNodeActiveColor') || color;
        }
      }
      color = sigma.utils.floatColor(
        color || settings('defaultNodeColor')
      );

      data[i++] = node[prefix + 'x'];
      data[i++] = node[prefix + 'y'];
      data[i++] = node[prefix + 'size'] || 1;
      data[i++] = sigma.utils.floatColor(
        color || settings('defaultNodeColor')
      );
    },
    render: function(gl, program, data, params) {
      var buffer;

      // Define attributes:
      var positionLocation =
            gl.getAttribLocation(program, 'a_position'),
          sizeLocation =
            gl.getAttribLocation(program, 'a_size'),
          colorLocation =
            gl.getAttribLocation(program, 'a_color'),
          resolutionLocation =
            gl.getUniformLocation(program, 'u_resolution'),
          matrixLocation =
            gl.getUniformLocation(program, 'u_matrix'),
          ratioLocation =
            gl.getUniformLocation(program, 'u_ratio'),
          scaleLocation =
            gl.getUniformLocation(program, 'u_scale');

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

      gl.uniform2f(resolutionLocation, params.width, params.height);
      gl.uniform1f(
        ratioLocation,
        1 / Math.pow(params.ratio, params.settings('nodesPowRatio'))
      );
      gl.uniform1f(scaleLocation, params.scalingRatio);
      gl.uniformMatrix3fv(matrixLocation, false, params.matrix);

      gl.enableVertexAttribArray(positionLocation);
      gl.enableVertexAttribArray(sizeLocation);
      gl.enableVertexAttribArray(colorLocation);

      gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.vertexAttribPointer(
        sizeLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        8
      );
      gl.vertexAttribPointer(
        colorLocation,
        1,
        gl.FLOAT,
        false,
        this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
        12
      );

      gl.drawArrays(
        gl.POINTS,
        params.start || 0,
        params.count || (data.length / this.ATTRIBUTES)
      );
    },
    initProgram: function(gl) {
      var vertexShader,
          fragmentShader,
          program;

      vertexShader = sigma.utils.loadShader(
        gl,
        [
          'attribute vec2 a_position;',
          'attribute float a_size;',
          'attribute float a_color;',

          'uniform vec2 u_resolution;',
          'uniform float u_ratio;',
          'uniform float u_scale;',
          'uniform mat3 u_matrix;',

          'varying vec4 color;',

          'void main() {',
            // Scale from [[-1 1] [-1 1]] to the container:
            'gl_Position = vec4(',
              '((u_matrix * vec3(a_position, 1)).xy /',
                'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
              '0,',
              '1',
            ');',

            // Multiply the point size twice:
            //  - x SCALING_RATIO to correct the canvas scaling
            //  - x 2 to correct the formulae
            'gl_PointSize = a_size * u_ratio * u_scale * 2.0;',

            // Extract the color:
            'float c = a_color;',
            'color.b = mod(c, 256.0); c = floor(c / 256.0);',
            'color.g = mod(c, 256.0); c = floor(c / 256.0);',
            'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
            'color.a = 1.0;',
          '}'
        ].join('\n'),
        gl.VERTEX_SHADER
      );

      fragmentShader = sigma.utils.loadShader(
        gl,
        [
          'precision mediump float;',

          'varying vec4 color;',

          'void main(void) {',
            'gl_FragColor = color;',
          '}'
        ].join('\n'),
        gl.FRAGMENT_SHADER
      );

      program = sigma.utils.loadProgram(gl, [vertexShader, fragmentShader]);

      return program;
    }
  };
})();

/**
* This plugin computes HITS statistics (Authority and Hub measures) for each node of the graph.
* It adds to the graph model a method called "HITS".
*
* Author: Mehdi El Fadil, Mango Information Systems
* License: This plugin for sigma.js follows the same licensing terms as sigma.js library.
*
* This implementation is based on the original paper J. Kleinberg, Authoritative Sources in a Hyperlinked Environment (http://www.cs.cornell.edu/home/kleinber/auth.pdf), and is inspired by implementation in Gephi software (Patick J. McSweeney <pjmcswee@syr.edu>, Sebastien Heymann <seb@gephi.org>, Dual-licensed under GPL v3 and CDDL)
* https://github.com/Mango-information-systems/gephi/blob/fix-hits/modules/StatisticsPlugin/src/main/java/org/gephi/statistics/plugin/Hits.java
*
* Bugs in Gephi implementation should not be found in this implementation.
* Tests have been put in place based on a test plan used to test implementation in Gephi, cf. discussion here: https://github.com/jacomyal/sigma.js/issues/309
* No guarantee is provided regarding the correctness of the calculations. Plugin author did not control the validity of the test scenarii.
*
* Warning: tricky edge-case. Hubs and authorities for nodes without any edge are only reliable in an undirected graph calculation mode.
*
* Check the code for more information.
*
* Here is how to use it:
*
* > // directed graph
* > var stats = s.graph.HITS()
* > // returns an object indexed by node Id with the authority and hub measures
* > // like { "n0": {"authority": 0.00343, "hub": 0.023975}, "n1": [...]*
*
* > // undirected graph: pass 'true' as function parameter
* > var stats = s.graph.HITS(true)
* > // returns an object indexed by node Id with the authority and hub measures
* > // like { "n0": {"authority": 0.00343, "hub": 0.023975}, "n1": [...]
*/

(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

/**
* This method takes a graph instance and returns authority and hub measures computed for each node. It uses the built-in
* indexes from sigma's graph model to search in the graph.
*
* @param {boolean} isUndirected flag informing whether the graph is directed or not. Default false: directed graph.
* @return {object} object indexed by node Ids, containing authority and hub measures for each node of the graph.
*/

  sigma.classes.graph.addMethod(
    'HITS',
    function(isUndirected) {
      var res = {}
      , epsilon = 0.0001
      , hubList = []
      , authList = []
      , nodes = this.nodes()
      , nodesCount = nodes.length
      , tempRes = {};

      if (!isUndirected)
        isUndirected = false;

      for (var i in nodes) {

        if (isUndirected) {
          hubList.push(nodes[i]);
          authList.push(nodes[i]);
        }
        else {
          if (this.degree(nodes[i].id, 'out') > 0)
            hubList.push(nodes[i]);

          if (this.degree(nodes[i].id, 'in') > 0)
            authList.push(nodes[i]);
        }

        res[nodes[i].id] = { authority : 1, hub: 1 };
      }

      var done;

      while (true) {
        done  = true;
        var authSum = 0
          , hubSum = 0;

        for (var i in authList) {

          tempRes[authList[i].id] = {authority : 1, hub:0 };

          var connectedNodes = [];

          if (isUndirected)
            connectedNodes =  this.allNeighborsIndex.get(authList[i].id).keyList();
          else
            connectedNodes =  this.inNeighborsIndex.get(authList[i].id).keyList();

          for (var j in connectedNodes) {
            if (j != authList[i].id)
              tempRes[authList[i].id].authority += res[connectedNodes[j]].hub;
          }

          authSum += tempRes[authList[i].id].authority;

        }

        for (var i in hubList) {

          if (tempRes[hubList[i].id])
            tempRes[hubList[i].id].hub = 1
          else
            tempRes[hubList[i].id] = {authority: 0, hub : 1 };

          var connectedNodes = [];

          if (isUndirected)
            connectedNodes =  this.allNeighborsIndex.get(hubList[i].id).keyList();
          else
            connectedNodes =  this.outNeighborsIndex.get(hubList[i].id).keyList();

          for (var j in connectedNodes) {
           // console.log(res[connectedNodes[j]]);
            if (j != hubList[i].id)
              tempRes[hubList[i].id].hub += res[connectedNodes[j]].authority;
          }

          hubSum += tempRes[hubList[i].id].hub;

        }

        for (var i in authList) {
          tempRes[authList[i].id].authority /= authSum;

          if (Math.abs((tempRes[authList[i].id].authority - res[authList[i].id].authority) / res[authList[i].id].authority) >= epsilon)
            done = false;
        }

        for (var i in hubList) {
          tempRes[hubList[i].id].hub /= hubSum;

          if (Math.abs((tempRes[hubList[i].id].hub - res[hubList[i].id].hub) / res[hubList[i].id].hub) >= epsilon)
            done = false;
        }
        res = tempRes;

        tempRes = {};

        if (done)
          break;

      }

      return res;

    }
  )

}).call(window)

;(function(undefined) {
  'use strict';

  /**
   * Sigma Louvain Community Detection
   * ===================
   *
   * This plugin detects communities based on the Louvain algorithm
   * (http://arxiv.org/abs/0803.0476).
   * Based on https://bitbucket.org/taynaud/python-louvain/overview
   *
   * Author: Corneliu Sugar (github.com/upphiminn),
             Sébastien Heymann <seb@linkurio.us> (github.com/Linkurious)
   * Version: 0.1
   */

  // Terminating if sigma were not to be found
  if (typeof sigma === 'undefined')
    throw new Error('sigma not in scope.');

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');


  var jLouvain = function (graph, partitions) {
    //Constants
    var __PASS_MAX = -1,
        __MIN = 0.0000001;

    //Local vars
    var status = {},
      dendogram = [],
      original_graph,
      partition_init;

    original_graph = {
      'nodes': graph.nodes().map(function(n) { return n.id; }),
      'edges': graph.edges(),
      '_assoc_mat': make_assoc_mat(graph.edges())
    };
    partition_init = partitions;

    //Helpers
    function make_set(array) {
      var set = {};
      array.forEach(function (d, i) {
        set[d] = true;
      });
      return Object.keys(set);
    };

    function obj_values(obj) {
      var vals = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          vals.push(obj[key]);
        }
      }
      return vals;
    };

    function get_degree_for_node(graph, node) {
      var neighbours = graph._assoc_mat[node] ? Object.keys(graph._assoc_mat[node]) : [];
      var weight = 0;
      neighbours.forEach(function (neighbour, i) {
        var value = graph._assoc_mat[node][neighbour] || 1;
        if (node == neighbour)
            value *= 2;
        weight += value;
      });
      return weight;
    };

    function get_neighbours_of_node(graph, node) {
      if (typeof graph._assoc_mat[node] == 'undefined')
        return [];

      var neighbours = Object.keys(graph._assoc_mat[node]);
      return neighbours;
    }


    function get_edge_weight(graph, node1, node2) {
      return graph._assoc_mat[node1] ? graph._assoc_mat[node1][node2] : undefined;
    }

    function get_graph_size(graph) {
      var size = 0;
      graph.edges.forEach(function (edge) {
          size += edge.weight;
      });
      return size;
    }

    function add_edge_to_graph(graph, edge) {
      update_assoc_mat(graph, edge);

      var edge_index = graph.edges.map(function (d) {
        return d.source + '_' + d.target;
      }).indexOf(edge.source + '_' + edge.target);

      if (edge_index != -1)
        graph.edges[edge_index].weight = edge.weight;
      else
        graph.edges.push(edge);
    }

    function make_assoc_mat(edge_list) {
      var mat = {};
      edge_list.forEach(function (edge, i) {
        mat[edge.source] = mat[edge.source] || {};
        mat[edge.source][edge.target] = edge.weight;
        mat[edge.target] = mat[edge.target] || {};
        mat[edge.target][edge.source] = edge.weight;
      });

      return mat;
    }

    function update_assoc_mat(graph, edge) {
      graph._assoc_mat[edge.source] = graph._assoc_mat[edge.source] || {};
      graph._assoc_mat[edge.source][edge.target] = edge.weight;
      graph._assoc_mat[edge.target] = graph._assoc_mat[edge.target] || {};
      graph._assoc_mat[edge.target][edge.source] = edge.weight;
    }

    function clone(obj) {
      if (obj == null || typeof(obj) != 'object')
        return obj;

      var temp = obj.constructor();

      for (var key in obj)
        temp[key] = clone(obj[key]);

      return temp;
    }

    //Core-Algorithm Related
    function init_status(graph, status, part) {
        status['nodes_to_com'] = {};
        status['total_weight'] = 0;
        status['internals'] = {};
        status['degrees'] = {};
        status['gdegrees'] = {};
        status['loops'] = {};
        status['total_weight'] = get_graph_size(graph);

        if (typeof part == 'undefined') {
          graph.nodes.forEach(function (node, i) {
            status.nodes_to_com[node] = i;
            var deg = get_degree_for_node(graph, node);
            if (deg < 0)
                throw new Error('A node has a negative degree. Use positive weights.');

            status.degrees[i] = deg;
            status.gdegrees[node] = deg;
            status.loops[node] = get_edge_weight(graph, node, node) || 0;
            status.internals[i] = status.loops[node];
          });
        }
        else {
          graph.nodes.forEach(function (node, i) {
            var com = part[node];
            status.nodes_to_com[node] = com;
            var deg = get_degree_for_node(graph, node);
            status.degrees[com] = (status.degrees[com] || 0) + deg;
            status.gdegrees[node] = deg;
            var inc = 0.0;

            var neighbours = get_neighbours_of_node(graph, node);

            neighbours.forEach(function (neighbour, i) {
              var weight = graph._assoc_mat[node][neighbour];
              if (weight <= 0) {
                  throw new Error('A node has a negative degree. Use positive weights.');
              }

              if (part[neighbour] == com) {
                if (neighbour == node) {
                  inc += weight;
                } else {
                  inc += weight / 2.0;
                }
              }
            });

            status.internals[com] = (status.internals[com] || 0) + inc;
          });
        }
    }

    function __modularity(status) {
      var links = status.total_weight;
      var result = 0.0;
      var communities = make_set(obj_values(status.nodes_to_com));

      communities.forEach(function (com, i) {
        var in_degree = status.internals[com] || 0;
        var degree = status.degrees[com] || 0;
        if (links > 0) {
          result = result + in_degree / links - Math.pow((degree / (2.0 * links)), 2);
        }
      });

      return result;
    }

    function __neighcom(node, graph, status) {
      // compute the communities in the neighb. of the node, with the graph given by
      // node_to_com

      var weights = {};
      var neighboorhood = get_neighbours_of_node(graph, node);//make iterable;

      neighboorhood.forEach(function (neighbour, i) {
        if (neighbour != node) {
          var weight = graph._assoc_mat[node][neighbour] || 1;
          var neighbourcom = status.nodes_to_com[neighbour];
          weights[neighbourcom] = (weights[neighbourcom] || 0) + weight;
        }
      });

      return weights;
    }

    function __insert(node, com, weight, status) {
      //insert node into com and modify status
      status.nodes_to_com[node] = +com;
      status.degrees[com] = (status.degrees[com] || 0) + (status.gdegrees[node] || 0);
      status.internals[com] = (status.internals[com] || 0) + weight + (status.loops[node] || 0);
    }

    function __remove(node, com, weight, status) {
      //remove node from com and modify status
      status.degrees[com] = ((status.degrees[com] || 0) - (status.gdegrees[node] || 0));
      status.internals[com] = ((status.internals[com] || 0) - weight - (status.loops[node] || 0));
      status.nodes_to_com[node] = -1;
    }

    function __renumber(dict) {
      var count = 0;
      var ret = clone(dict); //deep copy :)
      var new_values = {};
      var dict_keys = Object.keys(dict);
      dict_keys.forEach(function (key) {
        var value = dict[key];
        var new_value = typeof new_values[value] == 'undefined' ? -1 : new_values[value];
        if (new_value == -1) {
          new_values[value] = count;
          new_value = count;
          count = count + 1;
        }
        ret[key] = new_value;
      });

      return ret;
    }

    function __one_level(graph, status) {
        //Compute one level of the Communities Dendogram.
        var modif = true,
            nb_pass_done = 0,
            cur_mod = __modularity(status),
            new_mod = cur_mod;

        while (modif && nb_pass_done != __PASS_MAX) {
          cur_mod = new_mod;
          modif = false;
          nb_pass_done += 1

          graph.nodes.forEach(function (node, i) {
            var com_node = status.nodes_to_com[node];
            var degc_totw = (status.gdegrees[node] || 0) / (status.total_weight * 2.0);
            var neigh_communities = __neighcom(node, graph, status);

            __remove(node, com_node, (neigh_communities[com_node] || 0.0), status);

            var best_com = com_node;
            var best_increase = 0;
            var neigh_communities_entries = Object.keys(neigh_communities);//make iterable;

            neigh_communities_entries.forEach(function (com, i) {
              var incr = neigh_communities[com] - (status.degrees[com] || 0.0) * degc_totw;
              if (incr > best_increase) {
                best_increase = incr;
                best_com = com;
              }
            });

            __insert(node, best_com, neigh_communities[best_com] || 0, status);

            if (best_com != com_node)
              modif = true;
          });

          new_mod = __modularity(status);
          if (new_mod - cur_mod < __MIN) break;
        }
    }

    function induced_graph(partition, graph) {
      var ret = {nodes: [], edges: [], _assoc_mat: {}};
      var w_prec, weight;

      //add nodes from partition values
      var partition_values = obj_values(partition);
      ret.nodes = ret.nodes.concat(make_set(partition_values)); //make set

      graph.edges.forEach(function (edge, i) {
        weight = edge.weight || 1;
        var com1 = partition[edge.source];
        var com2 = partition[edge.target];

        w_prec = (get_edge_weight(ret, com1, com2) || 0);
        var new_weight = (w_prec + weight);

        add_edge_to_graph(ret, {'source': com1, 'target': com2, 'weight': new_weight});
      });

      return ret;
    }

    function partition_at_level(dendogram, level) {
      var partition = clone(dendogram[0]);

      for (var i = 1; i < level + 1; i++) {
        Object.keys(partition).forEach(function (key, j) {
          var node = key;
          var com = partition[key];
          partition[node] = dendogram[i][com];
        });
      }

      return partition;
    }

    function generate_dendogram(graph, part_init) {

      if (graph.edges.length == 0) {
        var part = {};
        graph.nodes.forEach(function (node, i) {
            part[node] = node;
        });
        return part;
      }
      var status = {};

      init_status(original_graph, status, part_init);

      var mod = __modularity(status);
      var status_list = [];

      __one_level(original_graph, status);

      var new_mod = __modularity(status);
      var partition = __renumber(status.nodes_to_com);

      status_list.push(partition);
      mod = new_mod;

      var current_graph = induced_graph(partition, original_graph);
      init_status(current_graph, status);

      while (true) {
        __one_level(current_graph, status);
        new_mod = __modularity(status);
        if (new_mod - mod < __MIN) break;

        partition = __renumber(status.nodes_to_com);
        status_list.push(partition);

        mod = new_mod;
        current_graph = induced_graph(partition, current_graph);
        init_status(current_graph, status);
      }

      return status_list;
    }


    /**
     * Public object
     * ------------------
     *
     */

    var core = {};

    /**
     * Execute the algorithm by generating the dendogram of hierarchy.
     *
     * @param {object} partitions Object with ids of nodes as properties and
     *                            community number assigned as value.
     * @return {object}           The algorithm instance.
     */
    core.run = function(partitions) {
      partition_init = partitions || partition_init;
      status = {};
      dendogram = generate_dendogram(original_graph, partition_init);
      return this;
    };

    /**
     * Count levels of hierarchy.
     *
     * @return {number}  The number of levels.
     */
    core.countLevels = function() {
      return dendogram.length - 1;
    };

    /**
     * Get the partitions of the graph at a specified level of hierarchy.
     * The higher level in the hierarchy the fewer partitions.
     *
     * @param {?number} level The level of hierarchy.
     * @return {object}       Dictionary of node id => community id
     */
    core.getPartitions = function(level) {
      if (level !== undefined && (level < 0 || level > dendogram.length - 1))
        throw new RangeError('Invalid argument: "level" is not between 0 and ' + dendogram.length - 1 + ' included.');

      return partition_at_level(dendogram, level || dendogram.length - 1);
    };

    /**
     * Count the number of partitions using the max community id.
     *
     * @param {object} partitions Object with ids of nodes as properties and
     *                            community number assigned as value.
     * @return {number}           The number of partitions
     */
    core.countPartitions = function(partitions) {
      return 1 + Math.max.apply(null, Object.keys(partitions).map(function(key) {
        return partitions[key];
      }));
    };

    /**
     * Assign communities at a specified level of hierarchy
     * (default: last level) to the  nodes of the sigma graph using a setter
     * function (default: last setter used, otherwise values are set to
     * `node._louvain`). The higher level in the hierarchy the fewer partitions.
     *
     * Recognized parameters:
     * **********************
     * Here is the exhaustive list of every accepted parameters in the options
     * object:
     *
     *   {?number}             level      The level of hierarchy
     *                                    (from 1 to .countLevels() - 1).
     *   {?function}           setter     The setter function where `this` is
     *                                    the current node and the argument is
     *                                    the community id.
     *
     * @param {?object} options Eventually an object with options.
     * @return {object}         The algorithm instance.
     */
    core.setResults = function(options) {
      var self = this,
          o = options || {},
          communities = this.getPartitions(o.level);

      graph.nodes().forEach(function(node) {
        if (typeof o.setter === 'function') {
          self.setter = o.setter;
          self.setter.call(node, communities[node.id]);
        }
        else if (typeof self.setter === 'function') {
          self.setter.call(node, communities[node.id]);
        }
        else {
          node._louvain = communities[node.id];
        }
      });

      return this;
    };

    return core;
  };



  /**
   * Interface
   * ------------------
   *
   */

  /**
   * This function will compute node communities based on the Louvain community
   * detection algorithm, and will assign the communities at the lowest level
   * of hierarchy.
   *
   * > sigma.plugins.louvain(sigmaInstance.graph, {
   * >   setter: function(communityId) { this.my_community = communityId; }
   * > });
   *
   * Recognized parameters:
   * **********************
   * Here is the exhaustive list of every accepted parameters in the options
   * object:
   *
   *   {?object}           partitions   Object with ids of nodes as properties
   *                                    and community number assigned as value.
   *   {?function}         setter       The setter function where `this` is
   *                                    the current node and the argument is
   *                                    the community id.
   *
   * @param {sigma.classes.graph} graph   The related sigma graph instance.
   * @param {?object}             options Eventually an object with options.
   * @return {object}                     The algorithm instance.
   */
  sigma.plugins.louvain = function (graph, params) {
    var p = params || {};

    var instance = jLouvain(graph, p.partitions).run();

    instance.setResults({
      level: instance.countLevels(),
      setter: p.setter
    });

    return instance;
  }

}).call(this);
