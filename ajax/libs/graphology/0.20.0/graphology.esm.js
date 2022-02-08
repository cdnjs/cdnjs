import { EventEmitter } from 'events';
import Iterator from 'obliterator/iterator';
import take from 'obliterator/take';
import chain from 'obliterator/chain';

/**
 * Graphology Utilities
 * =====================
 *
 * Collection of helpful functions used by the implementation.
 */

/**
 * Object.assign-like polyfill.
 *
 * @param  {object} target       - First object.
 * @param  {object} [...objects] - Objects to merge.
 * @return {object}
 */
function assignPolyfill() {
  const target = arguments[0];

  for (let i = 1, l = arguments.length; i < l; i++) {
    if (!arguments[i])
      continue;

    for (const k in arguments[i])
      target[k] = arguments[i][k];
  }

  return target;
}

let assign = assignPolyfill;

if (typeof Object.assign === 'function')
  assign = Object.assign;

/**
 * Function returning the first matching edge for given path.
 * Note: this function does not check the existence of source & target. This
 * must be performed by the caller.
 *
 * @param  {Graph}  graph  - Target graph.
 * @param  {any}    source - Source node.
 * @param  {any}    target - Target node.
 * @param  {string} type   - Type of the edge (mixed, directed or undirected).
 * @return {string|null}
 */
function getMatchingEdge(graph, source, target, type) {
  const sourceData = graph._nodes.get(source);

  let edge = null;

  if (!sourceData)
    return edge;

  if (type === 'mixed') {
    edge = (
      (sourceData.out && sourceData.out[target]) ||
      (sourceData.undirected && sourceData.undirected[target])
    );
  }
  else if (type === 'directed') {
    edge = sourceData.out && sourceData.out[target];
  }
  else {
    edge = sourceData.undirected && sourceData.undirected[target];
  }

  return edge;
}

/**
 * Checks whether the given value is a Graph implementation instance.
 *
 * @param  {mixed}   value - Target value.
 * @return {boolean}
 */
function isGraph(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.addUndirectedEdgeWithKey === 'function' &&
    typeof value.dropNode === 'function'
  );
}

/**
 * Checks whether the given value is a plain object.
 *
 * @param  {mixed}   value - Target value.
 * @return {boolean}
 */
function isPlainObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object
  );
}

/**
 * Checks whether the given object is empty.
 *
 * @param  {object}  o - Target Object.
 * @return {boolean}
 */
function isEmpty(o) {
  let k;

  for (k in o)
    return false;

  return true;
}

/**
 * Creates a "private" property for the given member name by concealing it
 * using the `enumerable` option.
 *
 * @param {object} target - Target object.
 * @param {string} name   - Member name.
 */
function privateProperty(target, name, value) {
  Object.defineProperty(target, name, {
    enumerable: false,
    configurable: false,
    writable: true,
    value
  });
}


/**
 * Creates a read-only property for the given member name & the given getter.
 *
 * @param {object}   target - Target object.
 * @param {string}   name   - Member name.
 * @param {mixed}    value  - The attached getter or fixed value.
 */
function readOnlyProperty(target, name, value) {
  const descriptor = {
    enumerable: true,
    configurable: true
  };

  if (typeof value === 'function') {
    descriptor.get = value;
  }
  else {
    descriptor.value = value;
    descriptor.writable = false;
  }

  Object.defineProperty(target, name, descriptor);
}

/**
 * Returns whether the given object constitute valid hints.
 *
 * @param {object} hints - Target object.
 */
function validateHints(hints) {
  if (!isPlainObject(hints))
    return false;

  if (hints.attributes && !Array.isArray(hints.attributes))
    return false;

  return true;
}

/**
 * Creates a function generating incremental ids for edges.
 *
 * @return {function}
 */
function incrementalId() {
  let i = 0;

  return () => {
    return i++;
  };
}

/**
 * Graphology Custom Errors
 * =========================
 *
 * Defining custom errors for ease of use & easy unit tests across
 * implementations (normalized typology rather than relying on error
 * messages to check whether the correct error was found).
 */
class GraphError extends Error {
  constructor(message, data) {
    super();
    this.name = 'GraphError';
    this.message = message || '';
    this.data = data || {};
  }
}

class InvalidArgumentsGraphError extends GraphError {
  constructor(message, data) {
    super(message, data);
    this.name = 'InvalidArgumentsGraphError';

    // This is V8 specific to enhance stack readability
    if (typeof Error.captureStackTrace === 'function')
      Error.captureStackTrace(this, InvalidArgumentsGraphError.prototype.constructor);
  }
}

class NotFoundGraphError extends GraphError {
  constructor(message, data) {
    super(message, data);
    this.name = 'NotFoundGraphError';

    // This is V8 specific to enhance stack readability
    if (typeof Error.captureStackTrace === 'function')
      Error.captureStackTrace(this, NotFoundGraphError.prototype.constructor);
  }
}

class UsageGraphError extends GraphError {
  constructor(message, data) {
    super(message, data);
    this.name = 'UsageGraphError';

    // This is V8 specific to enhance stack readability
    if (typeof Error.captureStackTrace === 'function')
      Error.captureStackTrace(this, UsageGraphError.prototype.constructor);
  }
}

/**
 * Graphology Internal Data Classes
 * =================================
 *
 * Internal classes hopefully reduced to structs by engines & storing
 * necessary information for nodes & edges.
 *
 * Note that those classes don't rely on the `class` keyword to avoid some
 * cruft introduced by most of ES2015 transpilers.
 */

/**
 * MixedNodeData class.
 *
 * @constructor
 * @param {string} string     - The node's key.
 * @param {object} attributes - Node's attributes.
 */
function MixedNodeData(key, attributes) {

  // Attributes
  this.key = key;
  this.attributes = attributes;

  // Degrees
  this.inDegree = 0;
  this.outDegree = 0;
  this.undirectedDegree = 0;
  this.directedSelfLoops = 0;
  this.undirectedSelfLoops = 0;

  // Indices
  this.in = {};
  this.out = {};
  this.undirected = {};
}

/**
 * DirectedNodeData class.
 *
 * @constructor
 * @param {string} string     - The node's key.
 * @param {object} attributes - Node's attributes.
 */
function DirectedNodeData(key, attributes) {

  // Attributes
  this.key = key;
  this.attributes = attributes;

  // Degrees
  this.inDegree = 0;
  this.outDegree = 0;
  this.directedSelfLoops = 0;

  // Indices
  this.in = {};
  this.out = {};
}

DirectedNodeData.prototype.upgradeToMixed = function() {

  // Degrees
  this.undirectedDegree = 0;
  this.undirectedSelfLoops = 0;

  // Indices
  this.undirected = {};
};


/**
 * UndirectedNodeData class.
 *
 * @constructor
 * @param {string} string     - The node's key.
 * @param {object} attributes - Node's attributes.
 */
function UndirectedNodeData(key, attributes) {

  // Attributes
  this.key = key;
  this.attributes = attributes;

  // Degrees
  this.undirectedDegree = 0;
  this.undirectedSelfLoops = 0;

  // Indices
  this.undirected = {};
}

UndirectedNodeData.prototype.upgradeToMixed = function() {

  // Degrees
  this.inDegree = 0;
  this.outDegree = 0;
  this.directedSelfLoops = 0;

  // Indices
  this.in = {};
  this.out = {};
};

/**
 * EdgeData class.
 *
 * @constructor
 * @param {boolean} undirected   - Whether the edge is undirected.
 * @param {string}  string       - The edge's key.
 * @param {boolean} generatedKey - Was its key generated?
 * @param {string}  source       - Source of the edge.
 * @param {string}  target       - Target of the edge.
 * @param {object}  attributes   - Edge's attributes.
 */
function EdgeData(undirected, key, generatedKey, source, target, attributes) {

  // Attributes
  this.key = key;
  this.attributes = attributes;
  this.undirected = undirected;

  // Extremities
  this.source = source;
  this.target = target;

  // Was its key generated?
  this.generatedKey = generatedKey;
}

/**
 * Graphology Indexes Functions
 * =============================
 *
 * Bunch of functions used to compute or clear indexes.
 */

/**
 * Function updating the 'structure' index with the given edge's data.
 * Note that in the case of the multi graph, related edges are stored in a
 * set that is the same for A -> B & B <- A.
 *
 * @param {Graph}    graph      - Target Graph instance.
 * @param {EdgeData} edgeData   - Added edge's data.
 * @param {NodeData} sourceData - Source node's data.
 * @param {NodeData} targetData - Target node's data.
 */
function updateStructureIndex(
  graph,
  undirected,
  edgeData,
  source,
  target,
  sourceData,
  targetData
) {
  const multi = graph.multi;

  let outKey = 'out';
  let inKey = 'in';

  if (undirected)
    outKey = inKey = 'undirected';

  let adj, container;

  if (multi) {

    // Handling source
    adj = sourceData[outKey];
    container = adj[target];

    if (typeof container === 'undefined') {
      container = new Set();
      adj[target] = container;
    }

    container.add(edgeData);

    // If selfLoop, we break here
    if (source === target && undirected)
      return;

    // Handling target (we won't add the edge because it was already taken
    // care of with source above)
    adj = targetData[inKey];
    if (typeof adj[source] === 'undefined')
      adj[source] = container;
  }
  else {

    // Handling source
    sourceData[outKey][target] = edgeData;

    // If selfLoop, we break here
    if (source === target && undirected)
      return;

    // Handling target
    targetData[inKey][source] = edgeData;
  }
}

/**
 * Function clearing the 'structure' index data related to the given edge.
 *
 * @param {Graph}    graph    - Target Graph instance.
 * @param {EdgeData} edgeData - Dropped edge's data.
 */
function clearEdgeFromStructureIndex(graph, undirected, edgeData) {
  const multi = graph.multi;

  const {source: sourceData, target: targetData} = edgeData;

  const source = sourceData.key,
        target = targetData.key;

  // NOTE: since the edge set is the same for source & target, we can only
  // affect source
  const outKey = undirected ? 'undirected' : 'out',
        sourceIndex = sourceData[outKey];

  const inKey = undirected ? 'undirected' : 'in';

  if (target in sourceIndex) {

    if (multi) {
      const set = sourceIndex[target];

      if (set.size === 1) {
        delete sourceIndex[target];
        delete targetData[inKey][source];
      }
      else {
        set.delete(edgeData);
      }
    }
    else
      delete sourceIndex[target];
  }

  if (multi)
    return;

  const targetIndex = targetData[inKey];

  delete targetIndex[source];
}

/**
 * Function clearing the whole 'structure' index.
 *
 * @param {Graph} graph - Target Graph instance.
 */
function clearStructureIndex(graph) {
  graph._nodes.forEach(data => {

    // Clearing now useless properties
    if (typeof data.in !== 'undefined') {
      data.in = {};
      data.out = {};
    }

    if (typeof data.undirected !== 'undefined') {
      data.undirected = {};
    }
  });
}

/**
 * Function used to upgrade a simple `structure` index to a multi on.
 *
 * @param {Graph}  graph - Target Graph instance.
 */
function upgradeStructureIndexToMulti(graph) {
  graph._nodes.forEach((data, node) => {

    // Directed
    if (data.out) {

      for (const neighbor in data.out) {
        const edges = new Set();
        edges.add(data.out[neighbor]);
        data.out[neighbor] = edges;
        graph._nodes.get(neighbor).in[node] = edges;
      }
    }

    // Undirected
    if (data.undirected) {
      for (const neighbor in data.undirected) {
        if (neighbor > node)
          continue;

        const edges = new Set();
        edges.add(data.undirected[neighbor]);
        data.undirected[neighbor] = edges;
        graph._nodes.get(neighbor).undirected[node] = edges;
      }
    }
  });
}

/**
 * Graphology Attributes methods
 * ==============================
 *
 * Attributes-related methods being exactly the same for nodes & edges,
 * we abstract them here for factorization reasons.
 */

/**
 * Attach an attribute getter method onto the provided class.
 *
 * @param {function} Class         - Target class.
 * @param {string}   method        - Method name.
 * @param {string}   type          - Type of the edge to find.
 */
function attachAttributeGetter(Class, method, type) {

  /**
   * Get the desired attribute for the given element (node or edge).
   *
   * Arity 2:
   * @param  {any}    element - Target element.
   * @param  {string} name    - Attribute's name.
   *
   * Arity 3 (only for edges):
   * @param  {any}     source - Source element.
   * @param  {any}     target - Target element.
   * @param  {string}  name   - Attribute's name.
   *
   * @return {mixed}          - The attribute's value.
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function(element, name) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(`Graph.${method}: cannot find this type of edges in your ${this.type} graph.`);

    if (arguments.length > 2) {

      if (this.multi)
        throw new UsageGraphError(`Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);

      const source = '' + element,
            target = '' + name;

      name = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`);
    }
    else {
      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" edge in the graph.`);
    }

    if (type !== 'mixed' && data.undirected !== (type === 'undirected'))
      throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" ${type} edge in the graph.`);

    return data.attributes[name];
  };
}

/**
 * Attach an attributes getter method onto the provided class.
 *
 * @param {function} Class       - Target class.
 * @param {string}   method      - Method name.
 * @param {string}   type        - Type of the edge to find.
 */
function attachAttributesGetter(Class, method, type) {

  /**
   * Retrieves all the target element's attributes.
   *
   * Arity 2:
   * @param  {any}    element - Target element.
   *
   * Arity 3 (only for edges):
   * @param  {any}     source - Source element.
   * @param  {any}     target - Target element.
   *
   * @return {object}          - The element's attributes.
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function(element) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(`Graph.${method}: cannot find this type of edges in your ${this.type} graph.`);

    if (arguments.length > 1) {

      if (this.multi)
        throw new UsageGraphError(`Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);

      const source = '' + element,
            target = '' + arguments[1];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`);
    }
    else {
      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" edge in the graph.`);
    }

    if (type !== 'mixed' && data.undirected !== (type === 'undirected'))
      throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" ${type} edge in the graph.`);

    return data.attributes;
  };
}

/**
 * Attach an attribute checker method onto the provided class.
 *
 * @param {function} Class       - Target class.
 * @param {string}   method      - Method name.
 * @param {string}   type        - Type of the edge to find.
 */
function attachAttributeChecker(Class, method, type) {

  /**
   * Checks whether the desired attribute is set for the given element (node or edge).
   *
   * Arity 2:
   * @param  {any}    element - Target element.
   * @param  {string} name    - Attribute's name.
   *
   * Arity 3 (only for edges):
   * @param  {any}     source - Source element.
   * @param  {any}     target - Target element.
   * @param  {string}  name   - Attribute's name.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function(element, name) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(`Graph.${method}: cannot find this type of edges in your ${this.type} graph.`);

    if (arguments.length > 2) {

      if (this.multi)
        throw new UsageGraphError(`Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);

      const source = '' + element,
            target = '' + name;

      name = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`);
    }
    else {
      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" edge in the graph.`);
    }

    if (type !== 'mixed' && data.undirected !== (type === 'undirected'))
      throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" ${type} edge in the graph.`);

    return data.attributes.hasOwnProperty(name);
  };
}

/**
 * Attach an attribute setter method onto the provided class.
 *
 * @param {function} Class         - Target class.
 * @param {string}   method        - Method name.
 * @param {string}   type          - Type of the edge to find.
 */
function attachAttributeSetter(Class, method, type) {

  /**
   * Set the desired attribute for the given element (node or edge).
   *
   * Arity 2:
   * @param  {any}    element - Target element.
   * @param  {string} name    - Attribute's name.
   * @param  {mixed}  value   - New attribute value.
   *
   * Arity 3 (only for edges):
   * @param  {any}     source - Source element.
   * @param  {any}     target - Target element.
   * @param  {string}  name   - Attribute's name.
   * @param  {mixed}  value   - New attribute value.
   *
   * @return {Graph}          - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function(element, name, value) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(`Graph.${method}: cannot find this type of edges in your ${this.type} graph.`);

    if (arguments.length > 3) {

      if (this.multi)
        throw new UsageGraphError(`Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);

      const source = '' + element,
            target = '' + name;

      name = arguments[2];
      value = arguments[3];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`);
    }
    else {
      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" edge in the graph.`);
    }

    if (type !== 'mixed' && data.undirected !== (type === 'undirected'))
      throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" ${type} edge in the graph.`);

    data.attributes[name] = value;

    // Emitting
    this.emit('edgeAttributesUpdated', {
      key: data.key,
      type: 'set',
      attributes: data.attributes,
      name
    });

    return this;
  };
}

/**
 * Attach an attribute updater method onto the provided class.
 *
 * @param {function} Class         - Target class.
 * @param {string}   method        - Method name.
 * @param {string}   type          - Type of the edge to find.
 */
function attachAttributeUpdater(Class, method, type) {

  /**
   * Update the desired attribute for the given element (node or edge) using
   * the provided function.
   *
   * Arity 2:
   * @param  {any}      element - Target element.
   * @param  {string}   name    - Attribute's name.
   * @param  {function} updater - Updater function.
   *
   * Arity 3 (only for edges):
   * @param  {any}      source  - Source element.
   * @param  {any}      target  - Target element.
   * @param  {string}   name    - Attribute's name.
   * @param  {function} updater - Updater function.
   *
   * @return {Graph}            - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function(element, name, updater) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(`Graph.${method}: cannot find this type of edges in your ${this.type} graph.`);

    if (arguments.length > 3) {

      if (this.multi)
        throw new UsageGraphError(`Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);

      const source = '' + element,
            target = '' + name;

      name = arguments[2];
      updater = arguments[3];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`);
    }
    else {
      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" edge in the graph.`);
    }

    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError(`Graph.${method}: updater should be a function.`);

    if (type !== 'mixed' && data.undirected !== (type === 'undirected'))
      throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" ${type} edge in the graph.`);

    data.attributes[name] = updater(data.attributes[name]);

    // Emitting
    this.emit('edgeAttributesUpdated', {
      key: data.key,
      type: 'set',
      attributes: data.attributes,
      name
    });

    return this;
  };
}

/**
 * Attach an attribute remover method onto the provided class.
 *
 * @param {function} Class         - Target class.
 * @param {string}   method        - Method name.
 * @param {string}   type          - Type of the edge to find.
 */
function attachAttributeRemover(Class, method, type) {

  /**
   * Remove the desired attribute for the given element (node or edge).
   *
   * Arity 2:
   * @param  {any}    element - Target element.
   * @param  {string} name    - Attribute's name.
   *
   * Arity 3 (only for edges):
   * @param  {any}     source - Source element.
   * @param  {any}     target - Target element.
   * @param  {string}  name   - Attribute's name.
   *
   * @return {Graph}          - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function(element, name) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(`Graph.${method}: cannot find this type of edges in your ${this.type} graph.`);

    if (arguments.length > 2) {

      if (this.multi)
        throw new UsageGraphError(`Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);

      const source = '' + element,
            target = '' + name;

      name = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`);
    }
    else {
      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" edge in the graph.`);
    }

    if (type !== 'mixed' && data.undirected !== (type === 'undirected'))
      throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" ${type} edge in the graph.`);

    delete data.attributes[name];

    // Emitting
    this.emit('edgeAttributesUpdated', {
      key: data.key,
      type: 'remove',
      attributes: data.attributes,
      name
    });

    return this;
  };
}

/**
 * Attach an attribute replacer method onto the provided class.
 *
 * @param {function} Class         - Target class.
 * @param {string}   method        - Method name.
 * @param {string}   type          - Type of the edge to find.
 */
function attachAttributesReplacer(Class, method, type) {

  /**
   * Replace the attributes for the given element (node or edge).
   *
   * Arity 2:
   * @param  {any}    element    - Target element.
   * @param  {object} attributes - New attributes.
   *
   * Arity 3 (only for edges):
   * @param  {any}     source     - Source element.
   * @param  {any}     target     - Target element.
   * @param  {object}  attributes - New attributes.
   *
   * @return {Graph}              - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function(element, attributes) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(`Graph.${method}: cannot find this type of edges in your ${this.type} graph.`);

    if (arguments.length > 2) {

      if (this.multi)
        throw new UsageGraphError(`Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);

      const source = '' + element,
            target = '' + attributes;

      attributes = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`);
    }
    else {
      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" edge in the graph.`);
    }

    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(`Graph.${method}: provided attributes are not a plain object.`);

    if (type !== 'mixed' && data.undirected !== (type === 'undirected'))
      throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" ${type} edge in the graph.`);

    data.attributes = attributes;

    // Emitting
    this.emit('edgeAttributesUpdated', {
      key: data.key,
      type: 'replace',
      attributes: data.attributes
    });

    return this;
  };
}

/**
 * Attach an attribute merger method onto the provided class.
 *
 * @param {function} Class         - Target class.
 * @param {string}   method        - Method name.
 * @param {string}   type          - Type of the edge to find.
 */
function attachAttributesMerger(Class, method, type) {

  /**
   * Replace the attributes for the given element (node or edge).
   *
   * Arity 2:
   * @param  {any}    element    - Target element.
   * @param  {object} attributes - Attributes to merge.
   *
   * Arity 3 (only for edges):
   * @param  {any}     source     - Source element.
   * @param  {any}     target     - Target element.
   * @param  {object}  attributes - Attributes to merge.
   *
   * @return {Graph}              - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function(element, attributes) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(`Graph.${method}: cannot find this type of edges in your ${this.type} graph.`);

    if (arguments.length > 2) {

      if (this.multi)
        throw new UsageGraphError(`Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);

      const source = '' + element,
            target = '' + attributes;

      attributes = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`);
    }
    else {
      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" edge in the graph.`);
    }

    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(`Graph.${method}: provided attributes are not a plain object.`);

    if (type !== 'mixed' && data.undirected !== (type === 'undirected'))
      throw new NotFoundGraphError(`Graph.${method}: could not find the "${element}" ${type} edge in the graph.`);

    assign(data.attributes, attributes);

    // Emitting
    this.emit('edgeAttributesUpdated', {
      key: data.key,
      type: 'merge',
      attributes: data.attributes,
      data: attributes
    });

    return this;
  };
}

/**
 * List of methods to attach.
 */
const ATTRIBUTES_METHODS = [
  {
    name: element => `get${element}Attribute`,
    attacher: attachAttributeGetter
  },
  {
    name: element => `get${element}Attributes`,
    attacher: attachAttributesGetter
  },
  {
    name: element => `has${element}Attribute`,
    attacher: attachAttributeChecker
  },
  {
    name: element => `set${element}Attribute`,
    attacher: attachAttributeSetter
  },
  {
    name: element => `update${element}Attribute`,
    attacher: attachAttributeUpdater
  },
  {
    name: element => `remove${element}Attribute`,
    attacher: attachAttributeRemover
  },
  {
    name: element => `replace${element}Attributes`,
    attacher: attachAttributesReplacer
  },
  {
    name: element => `merge${element}Attributes`,
    attacher: attachAttributesMerger
  }
];

/**
 * Attach every attributes-related methods to a Graph class.
 *
 * @param {function} Graph - Target class.
 */
function attachAttributesMethods(Graph) {
  ATTRIBUTES_METHODS.forEach(function({name, attacher}) {

    // For edges
    attacher(
      Graph,
      name('Edge'),
      'mixed'
    );

    // For directed edges
    attacher(
      Graph,
      name('DirectedEdge'),
      'directed'
    );

    // For undirected edges
    attacher(
      Graph,
      name('UndirectedEdge'),
      'undirected'
    );
  });
}

/**
 * Graphology Edge Iteration
 * ==========================
 *
 * Attaching some methods to the Graph class to be able to iterate over a
 * graph's edges.
 */

/**
 * Definitions.
 */
const EDGES_ITERATION = [
  {
    name: 'edges',
    type: 'mixed'
  },
  {
    name: 'inEdges',
    type: 'directed',
    direction: 'in'
  },
  {
    name: 'outEdges',
    type: 'directed',
    direction: 'out'
  },
  {
    name: 'inboundEdges',
    type: 'mixed',
    direction: 'in'
  },
  {
    name: 'outboundEdges',
    type: 'mixed',
    direction: 'out'
  },
  {
    name: 'directedEdges',
    type: 'directed'
  },
  {
    name: 'undirectedEdges',
    type: 'undirected'
  }
];

/**
 * Function collecting edges from the given object.
 *
 * @param  {array}  edges  - Edges array to populate.
 * @param  {object} object - Target object.
 * @return {array}         - The found edges.
 */
function collectSimple(edges, object) {
  for (const k in object)
    edges.push(object[k].key);
}

function collectMulti(edges, object) {
  for (const k in object)
    object[k].forEach(edgeData => edges.push(edgeData.key));
}

/**
 * Function iterating over edges from the given object using a callback.
 *
 * @param {object}   object   - Target object.
 * @param {function} callback - Function to call.
 */
function forEachSimple(object, callback, avoid) {
  for (const k in object) {
    if (k === avoid)
      continue;

    const edgeData = object[k];

    callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected,
      edgeData.generatedKey
    );
  }
}

function forEachMulti(object, callback, avoid) {
  for (const k in object) {
    if (k === avoid)
      continue;

    object[k].forEach(edgeData => callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected,
      edgeData.generatedKey
    ));
  }
}

/**
 * Function iterating over edges from the given object using a callback until
 * the return value of the callback is truthy.
 *
 * @param {object}   object   - Target object.
 * @param {function} callback - Function to call.
 */
function forEachSimpleUntil(object, callback, avoid) {
  let shouldBreak = false;

  for (const k in object) {
    if (k === avoid)
      continue;

    const edgeData = object[k];

    shouldBreak = callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected,
      edgeData.generatedKey
    );

    if (shouldBreak)
      return true;
  }

  return false;
}

function forEachMultiUntil(object, callback, avoid) {
  let iterator, step, edgeData, source, target;

  let shouldBreak = false;

  for (const k in object) {
    if (k === avoid)
      continue;

    iterator = object[k].values();

    while ((step = iterator.next(), step.done !== true)) {
      edgeData = step.value;
      source = edgeData.source;
      target = edgeData.target;

      shouldBreak = callback(
        edgeData.key,
        edgeData.attributes,
        source.key,
        target.key,
        source.attributes,
        target.attributes,
        edgeData.undirected,
        edgeData.generatedKey
      );

      if (shouldBreak)
        return true;
    }
  }

  return false;
}

/**
 * Function returning an iterator over edges from the given object.
 *
 * @param  {object}   object - Target object.
 * @return {Iterator}
 */
function createIterator(object, avoid) {
  const keys = Object.keys(object),
        l = keys.length;

  let inner = null,
      i = 0;

  return new Iterator(function next() {
    let edgeData;

    if (inner) {
      const step = inner.next();

      if (step.done) {
        inner = null;
        i++;
        return next();
      }

      edgeData = step.value;
    }
    else {
      if (i >= l)
        return {done: true};

      const k = keys[i];

      if (k === avoid) {
        i++;
        return next();
      }

      edgeData = object[k];

      if (edgeData instanceof Set) {
        inner = edgeData.values();
        return next();
      }

      i++;
    }

    return {
      done: false,
      value: [
        edgeData.key,
        edgeData.attributes,
        edgeData.source.key,
        edgeData.target.key,
        edgeData.source.attributes,
        edgeData.target.attributes
      ]
    };
  });
}

/**
 * Function collecting edges from the given object at given key.
 *
 * @param  {array}  edges  - Edges array to populate.
 * @param  {object} object - Target object.
 * @param  {mixed}  k      - Neighbor key.
 * @return {array}         - The found edges.
 */
function collectForKeySimple(edges, object, k) {
  const edgeData = object[k];

  if (!edgeData)
    return;

  edges.push(edgeData.key);
}

function collectForKeyMulti(edges, object, k) {
  const edgesData = object[k];

  if (!edgesData)
    return;

  edgesData.forEach(edgeData => edges.push(edgeData.key));
}

/**
 * Function iterating over the egdes from the object at given key using
 * a callback.
 *
 * @param {object}   object   - Target object.
 * @param {mixed}    k        - Neighbor key.
 * @param {function} callback - Callback to use.
 */
function forEachForKeySimple(object, k, callback) {
  const edgeData = object[k];

  if (!edgeData)
    return;

  const sourceData = edgeData.source;
  const targetData = edgeData.target;

  callback(
    edgeData.key,
    edgeData.attributes,
    sourceData.key,
    targetData.key,
    sourceData.attributes,
    targetData.attributes,
    edgeData.undirected,
    edgeData.generatedKey
  );
}

function forEachForKeyMulti(object, k, callback) {
  const edgesData = object[k];

  if (!edgesData)
    return;

  edgesData.forEach(edgeData => callback(
    edgeData.key,
    edgeData.attributes,
    edgeData.source.key,
    edgeData.target.key,
    edgeData.source.attributes,
    edgeData.target.attributes,
    edgeData.undirected,
    edgeData.generatedKey
  ));
}

/**
 * Function iterating over the egdes from the object at given key using
 * a callback until it returns a truthy value to stop iteration.
 *
 * @param {object}   object   - Target object.
 * @param {mixed}    k        - Neighbor key.
 * @param {function} callback - Callback to use.
 */
function forEachForKeySimpleUntil(object, k, callback) {
  const edgeData = object[k];

  if (!edgeData)
    return;

  const sourceData = edgeData.source;
  const targetData = edgeData.target;

  return callback(
    edgeData.key,
    edgeData.attributes,
    sourceData.key,
    targetData.key,
    sourceData.attributes,
    targetData.attributes,
    edgeData.undirected,
    edgeData.generatedKey
  );
}

function forEachForKeyMultiUntil(object, k, callback) {
  const edgesData = object[k];

  if (!edgesData)
    return;

  let shouldBreak = false;

  const iterator = edgesData.values();
  let step, edgeData;

  while ((step = iterator.next(), step.done !== true)) {
    edgeData = step.value;

    shouldBreak = callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected,
      edgeData.generatedKey
    );

    if (shouldBreak)
      return true;
  }

  return false;
}

/**
 * Function returning an iterator over the egdes from the object at given key.
 *
 * @param  {object}   object   - Target object.
 * @param  {mixed}    k        - Neighbor key.
 * @return {Iterator}
 */
function createIteratorForKey(object, k) {
  const v = object[k];

  if (v instanceof Set) {
    const iterator = v.values();

    return new Iterator(function() {
      const step = iterator.next();

      if (step.done)
        return step;

      const edgeData = step.value;

      return {
        done: false,
        value: [
          edgeData.key,
          edgeData.attributes,
          edgeData.source.key,
          edgeData.target.key,
          edgeData.source.attributes,
          edgeData.target.attributes
        ]
      };
    });
  }

  return Iterator.of([
    v.key,
    v.attributes,
    v.source.key,
    v.target.key,
    v.source.attributes,
    v.target.attributes
  ]);
}

/**
 * Function creating an array of edges for the given type.
 *
 * @param  {Graph}   graph - Target Graph instance.
 * @param  {string}  type  - Type of edges to retrieve.
 * @return {array}         - Array of edges.
 */
function createEdgeArray(graph, type) {
  if (graph.size === 0)
    return [];

  if (type === 'mixed' || type === graph.type) {
    if (typeof Array.from === 'function')
      return Array.from(graph._edges.keys());

    return take(graph._edges.keys(), graph._edges.size);
  }

  const size = type === 'undirected' ?
    graph.undirectedSize :
    graph.directedSize;

  const list = new Array(size),
        mask = type === 'undirected';

  const iterator = graph._edges.values();

  let i = 0;
  let step, data;

  while ((step = iterator.next(), step.done !== true)) {
    data = step.value;

    if (data.undirected === mask)
      list[i++] = data.key;
  }

  return list;
}

/**
 * Function iterating over a graph's edges using a callback.
 *
 * @param  {Graph}    graph    - Target Graph instance.
 * @param  {string}   type     - Type of edges to retrieve.
 * @param  {function} callback - Function to call.
 */
function forEachEdge(graph, type, callback) {
  if (graph.size === 0)
    return;

  const shouldFilter = type !== 'mixed' && type !== graph.type;
  const mask = type === 'undirected';

  let step, data;
  const iterator = graph._edges.values();

  while ((step = iterator.next(), step.done !== true)) {
    data = step.value;

    if (shouldFilter && data.undirected !== mask)
      continue;

    const {key, attributes, source, target} = data;

    callback(
      key,
      attributes,
      source.key,
      target.key,
      source.attributes,
      target.attributes,
      data.undirected,
      data.generatedKey
    );
  }
}

/**
 * Function iterating over a graph's edges using a callback until it returns
 * a truthy value to stop iteration.
 *
 * @param  {Graph}    graph    - Target Graph instance.
 * @param  {string}   type     - Type of edges to retrieve.
 * @param  {function} callback - Function to call.
 */
function forEachEdgeUntil(graph, type, callback) {
  if (graph.size === 0)
    return;

  const shouldFilter = type !== 'mixed' && type !== graph.type;
  const mask = type === 'undirected';

  let step, data;
  let shouldBreak = false;
  const iterator = graph._edges.values();

  while ((step = iterator.next(), step.done !== true)) {
    data = step.value;

    if (shouldFilter && data.undirected !== mask)
      continue;

    const {key, attributes, source, target} = data;

    shouldBreak = callback(
      key,
      attributes,
      source.key,
      target.key,
      source.attributes,
      target.attributes,
      data.undirected,
      data.generatedKey
    );

    if (shouldBreak)
      break;
  }
}

/**
 * Function creating an iterator of edges for the given type.
 *
 * @param  {Graph}    graph - Target Graph instance.
 * @param  {string}   type  - Type of edges to retrieve.
 * @return {Iterator}
 */
function createEdgeIterator(graph, type) {
  if (graph.size === 0)
    return Iterator.empty();

  const shouldFilter = type !== 'mixed' && type !== graph.type;
  const mask = type === 'undirected';

  const iterator = graph._edges.values();

  return new Iterator(function next() {
    let step, data;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      step = iterator.next();

      if (step.done)
        return step;

      data = step.value;

      if (shouldFilter && data.undirected !== mask)
        continue;

      break;
    }

    const value = [
      data.key,
      data.attributes,
      data.source.key,
      data.target.key,
      data.source.attributes,
      data.target.attributes
    ];

    return {value, done: false};
  });
}

/**
 * Function creating an array of edges for the given type & the given node.
 *
 * @param  {boolean} multi     - Whether the graph is multi or not.
 * @param  {string}  type      - Type of edges to retrieve.
 * @param  {string}  direction - In or out?
 * @param  {any}     nodeData  - Target node's data.
 * @return {array}             - Array of edges.
 */
function createEdgeArrayForNode(multi, type, direction, nodeData) {
  const edges = [];

  const fn = multi ? collectMulti : collectSimple;

  if (type !== 'undirected') {
    if (direction !== 'out')
      fn(edges, nodeData.in);
    if (direction !== 'in')
      fn(edges, nodeData.out);

    // Handling self loop edge case
    if (!direction && nodeData.directedSelfLoops > 0)
      edges.splice(edges.lastIndexOf(nodeData.key), 1);
  }

  if (type !== 'directed') {
    fn(edges, nodeData.undirected);
  }

  return edges;
}

/**
 * Function iterating over a node's edges using a callback.
 *
 * @param  {boolean}  multi     - Whether the graph is multi or not.
 * @param  {string}   type      - Type of edges to retrieve.
 * @param  {string}   direction - In or out?
 * @param  {any}      nodeData  - Target node's data.
 * @param  {function} callback  - Function to call.
 */
function forEachEdgeForNode(multi, type, direction, nodeData, callback) {
  const fn = multi ? forEachMulti : forEachSimple;

  if (type !== 'undirected') {
    if (direction !== 'out')
      fn(nodeData.in, callback);
    if (direction !== 'in')
      fn(nodeData.out, callback, !direction ? nodeData.key : null);
  }

  if (type !== 'directed') {
    fn(nodeData.undirected, callback);
  }
}

/**
 * Function iterating over a node's edges using a callback until it returns
 * a truthy value to stop iteration.
 *
 * @param  {boolean}  multi     - Whether the graph is multi or not.
 * @param  {string}   type      - Type of edges to retrieve.
 * @param  {string}   direction - In or out?
 * @param  {any}      nodeData  - Target node's data.
 * @param  {function} callback  - Function to call.
 */
function forEachEdgeForNodeUntil(multi, type, direction, nodeData, callback) {
  const fn = multi ? forEachMultiUntil : forEachSimpleUntil;

  let shouldBreak = false;

  if (type !== 'undirected') {
    if (direction !== 'out') {
      shouldBreak = fn(nodeData.in, callback);

      if (shouldBreak)
        return;
    }
    if (direction !== 'in') {
      shouldBreak = fn(nodeData.out, callback, !direction ? nodeData.key : null);

      if (shouldBreak)
        return;
    }
  }

  if (type !== 'directed') {
    shouldBreak = fn(nodeData.undirected, callback);

    if (shouldBreak)
      return;
  }
}

/**
 * Function iterating over a node's edges using a callback.
 *
 * @param  {string}   type      - Type of edges to retrieve.
 * @param  {string}   direction - In or out?
 * @param  {any}      nodeData  - Target node's data.
 * @return {Iterator}
 */
function createEdgeIteratorForNode(type, direction, nodeData) {
  let iterator = Iterator.empty();

  if (type !== 'undirected') {
    if (direction !== 'out' && typeof nodeData.in !== 'undefined')
      iterator = chain(iterator, createIterator(nodeData.in));
    if (direction !== 'in' && typeof nodeData.out !== 'undefined')
      iterator = chain(iterator, createIterator(nodeData.out, !direction ? nodeData.key : null));
  }

  if (type !== 'directed' && typeof nodeData.undirected !== 'undefined') {
    iterator = chain(iterator, createIterator(nodeData.undirected));
  }

  return iterator;
}

/**
 * Function creating an array of edges for the given path.
 *
 * @param  {string}   type       - Type of edges to retrieve.
 * @param  {boolean}  multi      - Whether the graph is multi.
 * @param  {string}   direction  - In or out?
 * @param  {NodeData} sourceData - Source node's data.
 * @param  {any}      target     - Target node.
 * @return {array}               - Array of edges.
 */
function createEdgeArrayForPath(type, multi, direction, sourceData, target) {
  const fn = multi ? collectForKeyMulti : collectForKeySimple;

  const edges = [];

  if (type !== 'undirected') {

    if (typeof sourceData.in !== 'undefined' && direction !== 'out')
      fn(edges, sourceData.in, target);

    if (typeof sourceData.out !== 'undefined' && direction !== 'in')
      fn(edges, sourceData.out, target);

    // Handling self loop edge case
    if (!direction && sourceData.directedSelfLoops > 0)
      edges.splice(edges.lastIndexOf(sourceData.key), 1);
  }

  if (type !== 'directed') {
    if (typeof sourceData.undirected !== 'undefined')
      fn(edges, sourceData.undirected, target);
  }

  return edges;
}

/**
 * Function iterating over edges for the given path using a callback.
 *
 * @param  {string}   type       - Type of edges to retrieve.
 * @param  {boolean}  multi      - Whether the graph is multi.
 * @param  {string}   direction  - In or out?
 * @param  {NodeData} sourceData - Source node's data.
 * @param  {string}   target     - Target node.
 * @param  {function} callback   - Function to call.
 */
function forEachEdgeForPath(type, multi, direction, sourceData, target, callback) {
  const fn = multi ? forEachForKeyMulti : forEachForKeySimple;

  if (type !== 'undirected') {

    if (typeof sourceData.in !== 'undefined' && direction !== 'out')
      fn(sourceData.in, target, callback);

    if (sourceData.key !== target)
      if (typeof sourceData.out !== 'undefined' && direction !== 'in')
        fn(sourceData.out, target, callback);
  }

  if (type !== 'directed') {
    if (typeof sourceData.undirected !== 'undefined')
      fn(sourceData.undirected, target, callback);
  }
}

/**
 * Function iterating over edges for the given path using a callback until
 * it returns a truthy value to stop iteration.
 *
 * @param  {string}   type       - Type of edges to retrieve.
 * @param  {boolean}  multi      - Whether the graph is multi.
 * @param  {string}   direction  - In or out?
 * @param  {NodeData} sourceData - Source node's data.
 * @param  {string}   target     - Target node.
 * @param  {function} callback   - Function to call.
 */
function forEachEdgeForPathUntil(type, multi, direction, sourceData, target, callback) {
  const fn = multi ? forEachForKeyMultiUntil : forEachForKeySimpleUntil;

  let shouldBreak = false;

  if (type !== 'undirected') {

    if (typeof sourceData.in !== 'undefined' && direction !== 'out') {
      shouldBreak = fn(sourceData.in, target, callback);

      if (shouldBreak)
        return;
    }

    if (sourceData.key !== target)
      if (typeof sourceData.out !== 'undefined' && direction !== 'in') {
        shouldBreak = fn(sourceData.out, target, callback, !direction ? sourceData.key : null);

        if (shouldBreak)
          return;
      }
  }

  if (type !== 'directed') {
    if (typeof sourceData.undirected !== 'undefined') {
      shouldBreak = fn(sourceData.undirected, target, callback);

      if (shouldBreak)
        return;
    }
  }
}

/**
 * Function returning an iterator over edges for the given path.
 *
 * @param  {string}   type       - Type of edges to retrieve.
 * @param  {string}   direction  - In or out?
 * @param  {NodeData} sourceData - Source node's data.
 * @param  {string}   target     - Target node.
 * @param  {function} callback   - Function to call.
 */
function createEdgeIteratorForPath(type, direction, sourceData, target) {
  let iterator = Iterator.empty();

  if (type !== 'undirected') {

    if (
      typeof sourceData.in !== 'undefined' &&
      direction !== 'out' &&
      target in sourceData.in
    )
      iterator = chain(iterator, createIteratorForKey(sourceData.in, target));

    if (
      typeof sourceData.out !== 'undefined' &&
      direction !== 'in' &&
      target in sourceData.out
    )
      iterator = chain(iterator, createIteratorForKey(sourceData.out, target));
  }

  if (type !== 'directed') {
    if (
      typeof sourceData.undirected !== 'undefined' &&
      target in sourceData.undirected
    )
      iterator = chain(iterator, createIteratorForKey(sourceData.undirected, target));
  }

  return iterator;
}

/**
 * Function attaching an edge array creator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachEdgeArrayCreator(Class, description) {
  const {
    name,
    type,
    direction
  } = description;

  /**
   * Function returning an array of certain edges.
   *
   * Arity 0: Return all the relevant edges.
   *
   * Arity 1: Return all of a node's relevant edges.
   * @param  {any}   node   - Target node.
   *
   * Arity 2: Return the relevant edges across the given path.
   * @param  {any}   source - Source node.
   * @param  {any}   target - Target node.
   *
   * @return {array|number} - The edges or the number of edges.
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[name] = function(source, target) {

    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return [];

    if (!arguments.length)
      return createEdgeArray(this, type);

    if (arguments.length === 1) {
      source = '' + source;

      const nodeData = this._nodes.get(source);

      if (typeof nodeData === 'undefined')
        throw new NotFoundGraphError(`Graph.${name}: could not find the "${source}" node in the graph.`);

      // Iterating over a node's edges
      return createEdgeArrayForNode(
        this.multi,
        type === 'mixed' ? this.type : type,
        direction,
        nodeData
      );
    }

    if (arguments.length === 2) {
      source = '' + source;
      target = '' + target;

      const sourceData = this._nodes.get(source);

      if (!sourceData)
        throw new NotFoundGraphError(`Graph.${name}:  could not find the "${source}" source node in the graph.`);

      if (!this._nodes.has(target))
        throw new NotFoundGraphError(`Graph.${name}:  could not find the "${target}" target node in the graph.`);

      // Iterating over the edges between source & target
      return createEdgeArrayForPath(type, this.multi, direction, sourceData, target);
    }

    throw new InvalidArgumentsGraphError(`Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`);
  };
}

/**
 * Function attaching a edge callback iterator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachForEachEdge(Class, description) {
  const {
    name,
    type,
    direction
  } = description;

  const forEachName = 'forEach' + name[0].toUpperCase() + name.slice(1, -1);

  /**
   * Function iterating over the graph's relevant edges by applying the given
   * callback.
   *
   * Arity 1: Iterate over all the relevant edges.
   * @param  {function} callback - Callback to use.
   *
   * Arity 2: Iterate over all of a node's relevant edges.
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   *
   * Arity 3: Iterate over the relevant edges across the given path.
   * @param  {any}      source   - Source node.
   * @param  {any}      target   - Target node.
   * @param  {function} callback - Callback to use.
   *
   * @return {undefined}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[forEachName] = function(source, target, callback) {

    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return;

    if (arguments.length === 1) {
      callback = source;
      return forEachEdge(this, type, callback);
    }

    if (arguments.length === 2) {
      source = '' + source;
      callback = target;

      const nodeData = this._nodes.get(source);

      if (typeof nodeData === 'undefined')
        throw new NotFoundGraphError(`Graph.${forEachName}: could not find the "${source}" node in the graph.`);

      // Iterating over a node's edges
      // TODO: maybe attach the sub method to the instance dynamically?
      return forEachEdgeForNode(
        this.multi,
        type === 'mixed' ? this.type : type,
        direction,
        nodeData,
        callback
      );
    }

    if (arguments.length === 3) {
      source = '' + source;
      target = '' + target;

      const sourceData = this._nodes.get(source);

      if (!sourceData)
        throw new NotFoundGraphError(`Graph.${forEachName}:  could not find the "${source}" source node in the graph.`);

      if (!this._nodes.has(target))
        throw new NotFoundGraphError(`Graph.${forEachName}:  could not find the "${target}" target node in the graph.`);

      // Iterating over the edges between source & target
      return forEachEdgeForPath(type, this.multi, direction, sourceData, target, callback);
    }

    throw new InvalidArgumentsGraphError(`Graph.${forEachName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`);
  };
}

/**
 * Function attaching a breakable edge callback iterator method to the Graph
 * prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachForEachEdgeUntil(Class, description) {
  const {
    name,
    type,
    direction
  } = description;

  const forEachUntilName = 'forEach' + name[0].toUpperCase() + name.slice(1, -1) + 'Until';

  /**
   * Function iterating over the graph's relevant edges by applying the given
   * callback and breaking as soon as the callback return a truthy value.
   *
   * Arity 1: Iterate over all the relevant edges.
   * @param  {function} callback - Callback to use.
   *
   * Arity 2: Iterate over all of a node's relevant edges.
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   *
   * Arity 3: Iterate over the relevant edges across the given path.
   * @param  {any}      source   - Source node.
   * @param  {any}      target   - Target node.
   * @param  {function} callback - Callback to use.
   *
   * @return {undefined}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[forEachUntilName] = function(source, target, callback) {

    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return;

    if (arguments.length === 1) {
      callback = source;
      return forEachEdgeUntil(this, type, callback);
    }

    if (arguments.length === 2) {
      source = '' + source;
      callback = target;

      const nodeData = this._nodes.get(source);

      if (typeof nodeData === 'undefined')
        throw new NotFoundGraphError(`Graph.${forEachUntilName}: could not find the "${source}" node in the graph.`);

      // Iterating over a node's edges
      // TODO: maybe attach the sub method to the instance dynamically?
      return forEachEdgeForNodeUntil(
        this.multi,
        type === 'mixed' ? this.type : type,
        direction,
        nodeData,
        callback
      );
    }

    if (arguments.length === 3) {
      source = '' + source;
      target = '' + target;

      const sourceData = this._nodes.get(source);

      if (!sourceData)
        throw new NotFoundGraphError(`Graph.${forEachUntilName}:  could not find the "${source}" source node in the graph.`);

      if (!this._nodes.has(target))
        throw new NotFoundGraphError(`Graph.${forEachUntilName}:  could not find the "${target}" target node in the graph.`);

      // Iterating over the edges between source & target
      return forEachEdgeForPathUntil(type, this.multi, direction, sourceData, target, callback);
    }

    throw new InvalidArgumentsGraphError(`Graph.${forEachUntilName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`);
  };
}

/**
 * Function attaching an edge iterator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachEdgeIteratorCreator(Class, description) {
  const {
    name: originalName,
    type,
    direction
  } = description;

  const name = originalName.slice(0, -1) + 'Entries';

  /**
   * Function returning an iterator over the graph's edges.
   *
   * Arity 0: Iterate over all the relevant edges.
   *
   * Arity 1: Iterate over all of a node's relevant edges.
   * @param  {any}   node   - Target node.
   *
   * Arity 2: Iterate over the relevant edges across the given path.
   * @param  {any}   source - Source node.
   * @param  {any}   target - Target node.
   *
   * @return {array|number} - The edges or the number of edges.
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[name] = function(source, target) {

    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return Iterator.empty();

    if (!arguments.length)
      return createEdgeIterator(this, type);

    if (arguments.length === 1) {
      source = '' + source;

      const sourceData = this._nodes.get(source);

      if (!sourceData)
        throw new NotFoundGraphError(`Graph.${name}: could not find the "${source}" node in the graph.`);

      // Iterating over a node's edges
      return createEdgeIteratorForNode(type, direction, sourceData);
    }

    if (arguments.length === 2) {
      source = '' + source;
      target = '' + target;

      const sourceData = this._nodes.get(source);

      if (!sourceData)
        throw new NotFoundGraphError(`Graph.${name}:  could not find the "${source}" source node in the graph.`);

      if (!this._nodes.has(target))
        throw new NotFoundGraphError(`Graph.${name}:  could not find the "${target}" target node in the graph.`);

      // Iterating over the edges between source & target
      return createEdgeIteratorForPath(type, direction, sourceData, target);
    }

    throw new InvalidArgumentsGraphError(`Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`);
  };
}

/**
 * Function attaching every edge iteration method to the Graph class.
 *
 * @param {function} Graph - Graph class.
 */
function attachEdgeIterationMethods(Graph) {
  EDGES_ITERATION.forEach(description => {
    attachEdgeArrayCreator(Graph, description);
    attachForEachEdge(Graph, description);
    attachForEachEdgeUntil(Graph, description);
    attachEdgeIteratorCreator(Graph, description);
  });
}

/**
 * Graphology Neighbor Iteration
 * ==============================
 *
 * Attaching some methods to the Graph class to be able to iterate over
 * neighbors.
 */

/**
 * Definitions.
 */
const NEIGHBORS_ITERATION = [
  {
    name: 'neighbors',
    type: 'mixed'
  },
  {
    name: 'inNeighbors',
    type: 'directed',
    direction: 'in'
  },
  {
    name: 'outNeighbors',
    type: 'directed',
    direction: 'out'
  },
  {
    name: 'inboundNeighbors',
    type: 'mixed',
    direction: 'in'
  },
  {
    name: 'outboundNeighbors',
    type: 'mixed',
    direction: 'out'
  },
  {
    name: 'directedNeighbors',
    type: 'directed'
  },
  {
    name: 'undirectedNeighbors',
    type: 'undirected'
  }
];

/**
 * Function merging neighbors into the given set iterating over the given object.
 *
 * @param {BasicSet} neighbors - Neighbors set.
 * @param {object}   object    - Target object.
 */
function merge(neighbors, object) {
  if (typeof object === 'undefined')
    return;

  for (const neighbor in object)
    neighbors.add(neighbor);
}

/**
 * Function creating an array of relevant neighbors for the given node.
 *
 * @param  {string}       type      - Type of neighbors.
 * @param  {string}       direction - Direction.
 * @param  {any}          nodeData  - Target node's data.
 * @return {Array}                  - The list of neighbors.
 */
function createNeighborArrayForNode(type, direction, nodeData) {

  // If we want only undirected or in or out, we can roll some optimizations
  if (type !== 'mixed') {
    if (type === 'undirected')
      return Object.keys(nodeData.undirected);

    if (typeof direction === 'string')
      return Object.keys(nodeData[direction]);
  }

  // Else we need to keep a set of neighbors not to return duplicates
  const neighbors = new Set();

  if (type !== 'undirected') {

    if (direction !== 'out') {
      merge(neighbors, nodeData.in);
    }
    if (direction !== 'in') {
      merge(neighbors, nodeData.out);
    }
  }

  if (type !== 'directed') {
    merge(neighbors, nodeData.undirected);
  }

  return take(neighbors.values(), neighbors.size);
}

/**
 * Function iterating over the given node's relevant neighbors using a
 * callback.
 *
 * @param  {string}   type      - Type of neighbors.
 * @param  {string}   direction - Direction.
 * @param  {any}      nodeData  - Target node's data.
 * @param  {function} callback  - Callback to use.
 */
function forEachInObject(nodeData, object, callback) {
  for (const k in object) {
    let edgeData = object[k];

    if (edgeData instanceof Set)
      edgeData = edgeData.values().next().value;

    const sourceData = edgeData.source,
          targetData = edgeData.target;

    const neighborData = sourceData === nodeData ? targetData : sourceData;

    callback(
      neighborData.key,
      neighborData.attributes
    );
  }
}

function forEachInObjectOnce(visited, nodeData, object, callback) {
  for (const k in object) {
    let edgeData = object[k];

    if (edgeData instanceof Set)
      edgeData = edgeData.values().next().value;

    const sourceData = edgeData.source,
          targetData = edgeData.target;

    const neighborData = sourceData === nodeData ? targetData : sourceData;

    if (visited.has(neighborData.key))
      continue;

    visited.add(neighborData.key);

    callback(
      neighborData.key,
      neighborData.attributes
    );
  }
}

/**
 * Function iterating over the given node's relevant neighbors using a
 * callback until it returns a truthy value to stop iteration.
 *
 * @param  {string}   type      - Type of neighbors.
 * @param  {string}   direction - Direction.
 * @param  {any}      nodeData  - Target node's data.
 * @param  {function} callback  - Callback to use.
 */
function forEachInObjectUntil(nodeData, object, callback) {
  for (const k in object) {
    let edgeData = object[k];

    if (edgeData instanceof Set)
      edgeData = edgeData.values().next().value;

    const sourceData = edgeData.source,
          targetData = edgeData.target;

    const neighborData = sourceData === nodeData ? targetData : sourceData;

    const shouldBreak = callback(
      neighborData.key,
      neighborData.attributes
    );

    if (shouldBreak)
      return true;
  }

  return false;
}

function forEachInObjectOnceUntil(visited, nodeData, object, callback) {
  for (const k in object) {
    let edgeData = object[k];

    if (edgeData instanceof Set)
      edgeData = edgeData.values().next().value;

    const sourceData = edgeData.source,
          targetData = edgeData.target;

    const neighborData = sourceData === nodeData ? targetData : sourceData;

    if (visited.has(neighborData.key))
      continue;

    visited.add(neighborData.key);

    const shouldBreak = callback(
      neighborData.key,
      neighborData.attributes
    );

    if (shouldBreak)
      return true;
  }

  return false;
}

function forEachNeighborForNode(type, direction, nodeData, callback) {

  // If we want only undirected or in or out, we can roll some optimizations
  if (type !== 'mixed') {
    if (type === 'undirected')
      return forEachInObject(nodeData, nodeData.undirected, callback);

    if (typeof direction === 'string')
      return forEachInObject(nodeData, nodeData[direction], callback);
  }

  // Else we need to keep a set of neighbors not to return duplicates
  const visited = new Set();

  if (type !== 'undirected') {

    if (direction !== 'out') {
      forEachInObjectOnce(visited, nodeData, nodeData.in, callback);
    }
    if (direction !== 'in') {
      forEachInObjectOnce(visited, nodeData, nodeData.out, callback);
    }
  }

  if (type !== 'directed') {
    forEachInObjectOnce(visited, nodeData, nodeData.undirected, callback);
  }
}

function forEachNeighborForNodeUntil(type, direction, nodeData, callback) {

  // If we want only undirected or in or out, we can roll some optimizations
  if (type !== 'mixed') {
    if (type === 'undirected')
      return forEachInObjectUntil(nodeData, nodeData.undirected, callback);

    if (typeof direction === 'string')
      return forEachInObjectUntil(nodeData, nodeData[direction], callback);
  }

  // Else we need to keep a set of neighbors not to return duplicates
  const visited = new Set();

  let shouldBreak = false;

  if (type !== 'undirected') {

    if (direction !== 'out') {
      shouldBreak = forEachInObjectOnceUntil(visited, nodeData, nodeData.in, callback);

      if (shouldBreak)
        return;
    }
    if (direction !== 'in') {
      shouldBreak = forEachInObjectOnceUntil(visited, nodeData, nodeData.out, callback);

      if (shouldBreak)
        return;
    }
  }

  if (type !== 'directed') {
    shouldBreak = forEachInObjectOnceUntil(visited, nodeData, nodeData.undirected, callback);

    if (shouldBreak)
      return;
  }
}

/**
 * Function returning an iterator over the given node's relevant neighbors.
 *
 * @param  {string}   type      - Type of neighbors.
 * @param  {string}   direction - Direction.
 * @param  {any}      nodeData  - Target node's data.
 * @return {Iterator}
 */
function createObjectIterator(nodeData, object) {
  const keys = Object.keys(object),
        l = keys.length;

  let i = 0;

  return new Iterator(function() {
    if (i >= l)
      return {done: true};

    let edgeData = object[keys[i++]];

    if (edgeData instanceof Set)
      edgeData = edgeData.values().next().value;

    const sourceData = edgeData.source,
          targetData = edgeData.target;

    const neighborData = sourceData === nodeData ? targetData : sourceData;

    return {
      done: false,
      value: [neighborData.key, neighborData.attributes]
    };
  });
}

function createDedupedObjectIterator(visited, nodeData, object) {
  const keys = Object.keys(object),
        l = keys.length;

  let i = 0;

  return new Iterator(function next() {
    if (i >= l)
      return {done: true};

    let edgeData = object[keys[i++]];

    if (edgeData instanceof Set)
      edgeData = edgeData.values().next().value;

    const sourceData = edgeData.source,
          targetData = edgeData.target;

    const neighborData = sourceData === nodeData ? targetData : sourceData;

    if (visited.has(neighborData.key))
      return next();

    visited.add(neighborData.key);

    return {
      done: false,
      value: [neighborData.key, neighborData.attributes]
    };
  });
}

function createNeighborIterator(type, direction, nodeData) {

  // If we want only undirected or in or out, we can roll some optimizations
  if (type !== 'mixed') {
    if (type === 'undirected')
      return createObjectIterator(nodeData, nodeData.undirected);

    if (typeof direction === 'string')
      return createObjectIterator(nodeData, nodeData[direction]);
  }

  let iterator = Iterator.empty();

  // Else we need to keep a set of neighbors not to return duplicates
  const visited = new Set();

  if (type !== 'undirected') {

    if (direction !== 'out') {
      iterator = chain(iterator, createDedupedObjectIterator(visited, nodeData, nodeData.in));
    }
    if (direction !== 'in') {
      iterator = chain(iterator, createDedupedObjectIterator(visited, nodeData, nodeData.out));
    }
  }

  if (type !== 'directed') {
    iterator = chain(iterator, createDedupedObjectIterator(visited, nodeData, nodeData.undirected));
  }

  return iterator;
}

/**
 * Function returning whether the given node has target neighbor.
 *
 * @param  {Graph}        graph     - Target graph.
 * @param  {string}       type      - Type of neighbor.
 * @param  {string}       direction - Direction.
 * @param  {any}          node      - Target node.
 * @param  {any}          neighbor  - Target neighbor.
 * @return {boolean}
 */
function nodeHasNeighbor(graph, type, direction, node, neighbor) {

  const nodeData = graph._nodes.get(node);

  if (type !== 'undirected') {

    if (direction !== 'out' && typeof nodeData.in !== 'undefined') {
      for (const k in nodeData.in)
        if (k === neighbor)
          return true;
    }
    if (direction !== 'in' && typeof nodeData.out !== 'undefined') {
      for (const k in nodeData.out)
        if (k === neighbor)
          return true;
    }
  }

  if (type !== 'directed' && typeof nodeData.undirected !== 'undefined') {
    for (const k in nodeData.undirected)
        if (k === neighbor)
          return true;
  }

  return false;
}

/**
 * Function attaching a neighbors array creator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachNeighborArrayCreator(Class, description) {
  const {
    name,
    type,
    direction
  } = description;

  /**
   * Function returning an array or the count of certain neighbors.
   *
   * Arity 1: Return all of a node's relevant neighbors.
   * @param  {any}   node   - Target node.
   *
   * Arity 2: Return whether the two nodes are indeed neighbors.
   * @param  {any}   source - Source node.
   * @param  {any}   target - Target node.
   *
   * @return {array|number} - The neighbors or the number of neighbors.
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[name] = function(node) {

    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return [];

    if (arguments.length === 2) {
      const node1 = '' + arguments[0],
            node2 = '' + arguments[1];

      if (!this._nodes.has(node1))
        throw new NotFoundGraphError(`Graph.${name}: could not find the "${node1}" node in the graph.`);

      if (!this._nodes.has(node2))
        throw new NotFoundGraphError(`Graph.${name}: could not find the "${node2}" node in the graph.`);

      // Here, we want to assess whether the two given nodes are neighbors
      return nodeHasNeighbor(
        this,
        type,
        direction,
        node1,
        node2
      );
    }
    else if (arguments.length === 1) {
      node = '' + node;

      const nodeData = this._nodes.get(node);

      if (typeof nodeData === 'undefined')
        throw new NotFoundGraphError(`Graph.${name}: could not find the "${node}" node in the graph.`);

      // Here, we want to iterate over a node's relevant neighbors
      const neighbors = createNeighborArrayForNode(
        type === 'mixed' ? this.type : type,
        direction,
        nodeData
      );

      return neighbors;
    }

    throw new InvalidArgumentsGraphError(`Graph.${name}: invalid number of arguments (expecting 1 or 2 and got ${arguments.length}).`);
  };
}

/**
 * Function attaching a neighbors callback iterator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachForEachNeighbor(Class, description) {
  const {
    name,
    type,
    direction
  } = description;

  const forEachName = 'forEach' + name[0].toUpperCase() + name.slice(1, -1);

  /**
   * Function iterating over all the relevant neighbors using a callback.
   *
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   * @return {undefined}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[forEachName] = function(node, callback) {

    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return;

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (typeof nodeData === 'undefined')
      throw new NotFoundGraphError(`Graph.${forEachName}: could not find the "${node}" node in the graph.`);

    // Here, we want to iterate over a node's relevant neighbors
    forEachNeighborForNode(
      type === 'mixed' ? this.type : type,
      direction,
      nodeData,
      callback
    );
  };
}

/**
 * Function attaching a breakable neighbors callback iterator method to the
 * Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachForEachNeighborUntil(Class, description) {
  const {
    name,
    type,
    direction
  } = description;

  const forEachUntilName = 'forEach' + name[0].toUpperCase() + name.slice(1, -1) + 'Until';

  /**
   * Function iterating over all the relevant neighbors using a callback.
   *
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   * @return {undefined}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[forEachUntilName] = function(node, callback) {

    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return;

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (typeof nodeData === 'undefined')
      throw new NotFoundGraphError(`Graph.${forEachUntilName}: could not find the "${node}" node in the graph.`);

    // Here, we want to iterate over a node's relevant neighbors
    forEachNeighborForNodeUntil(
      type === 'mixed' ? this.type : type,
      direction,
      nodeData,
      callback
    );
  };
}

/**
 * Function attaching a neighbors callback iterator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachNeighborIteratorCreator(Class, description) {
  const {
    name,
    type,
    direction
  } = description;

  const iteratorName = name.slice(0, -1) + 'Entries';

  /**
   * Function returning an iterator over all the relevant neighbors.
   *
   * @param  {any}      node     - Target node.
   * @return {Iterator}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[iteratorName] = function(node) {

    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return Iterator.empty();

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (typeof nodeData === 'undefined')
      throw new NotFoundGraphError(`Graph.${iteratorName}: could not find the "${node}" node in the graph.`);

    // Here, we want to iterate over a node's relevant neighbors
    return createNeighborIterator(
      type === 'mixed' ? this.type : type,
      direction,
      nodeData
    );
  };
}

/**
 * Function attaching every neighbor iteration method to the Graph class.
 *
 * @param {function} Graph - Graph class.
 */
function attachNeighborIterationMethods(Graph) {
  NEIGHBORS_ITERATION.forEach(description => {
    attachNeighborArrayCreator(Graph, description);
    attachForEachNeighbor(Graph, description);
    attachForEachNeighborUntil(Graph, description);
    attachNeighborIteratorCreator(Graph, description);
  });
}

/**
 * Graphology Adjacency Iteration
 * ================================
 *
 * Attaching some methods to the Graph class to be able to iterate over a
 * graph's adjacency.
 */

/**
 * Function iterating over a simple graph's adjacency using a callback.
 *
 * @param {boolean}  breakable - Can we break?
 * @param {Graph}    graph     - Target Graph instance.
 * @param {callback} function  - Iteration callback.
 */
function forEachAdjacencySimple(breakable, graph, callback) {
  const iterator = graph._nodes.values();

  const type = graph.type;

  let step, sourceData, neighbor, adj, edgeData, targetData, shouldBreak;

  while ((step = iterator.next(), step.done !== true)) {
    sourceData = step.value;

    if (type !== 'undirected') {
      adj = sourceData.out;

      for (neighbor in adj) {
        edgeData = adj[neighbor];
        targetData = edgeData.target;

        shouldBreak = callback(
          sourceData.key,
          targetData.key,
          sourceData.attributes,
          targetData.attributes,
          edgeData.key,
          edgeData.attributes,
          edgeData.undirected,
          edgeData.generatedKey
        );

        if (breakable && shouldBreak)
          return;
      }
    }

    if (type !== 'directed') {
      adj = sourceData.undirected;

      for (neighbor in adj) {
        edgeData = adj[neighbor];
        targetData = edgeData.target;

        if (targetData.key !== neighbor)
          targetData = edgeData.source;

        shouldBreak = callback(
          sourceData.key,
          targetData.key,
          sourceData.attributes,
          targetData.attributes,
          edgeData.key,
          edgeData.attributes,
          edgeData.undirected,
          edgeData.generatedKey
        );

        if (breakable && shouldBreak)
          return;
      }
    }
  }
}

/**
 * Function iterating over a multi graph's adjacency using a callback.
 *
 * @param {boolean}  breakable - Can we break?
 * @param {Graph}    graph    - Target Graph instance.
 * @param {callback} function - Iteration callback.
 */
function forEachAdjacencyMulti(breakable, graph, callback) {
  const iterator = graph._nodes.values();

  const type = graph.type;

  let step, sourceData, neighbor, container, containerStep, adj, edgeData, targetData, shouldBreak;

  while ((step = iterator.next(), step.done !== true)) {
    sourceData = step.value;

    if (type !== 'undirected') {
      adj = sourceData.out;

      for (neighbor in adj) {
        container = adj[neighbor].values();

        while ((containerStep = container.next(), containerStep.done !== true)) {
          edgeData = containerStep.value;
          targetData = edgeData.target;

          shouldBreak = callback(
            sourceData.key,
            targetData.key,
            sourceData.attributes,
            targetData.attributes,
            edgeData.key,
            edgeData.attributes,
            edgeData.undirected,
            edgeData.generatedKey
          );

          if (breakable && shouldBreak)
            return;
        }
      }
    }

    if (type !== 'directed') {
      adj = sourceData.undirected;

      for (neighbor in adj) {
        container = adj[neighbor].values();

        while ((containerStep = container.next(), containerStep.done !== true)) {
          edgeData = containerStep.value;
          targetData = edgeData.target;

          if (targetData.key !== neighbor)
            targetData = edgeData.source;

          shouldBreak = callback(
            sourceData.key,
            targetData.key,
            sourceData.attributes,
            targetData.attributes,
            edgeData.key,
            edgeData.attributes,
            edgeData.undirected,
            edgeData.generatedKey
          );

          if (breakable && shouldBreak)
            return;
        }
      }
    }
  }
}

function createAdjacencyIteratorSimple(graph) {
  const iterator = graph._nodes.values();

  const type = graph.type;

  let state = 'outer',
      sourceData,
      neighbors,
      adj,
      offset;

  return new Iterator(function next() {
    let step;

    if (state === 'outer') {
      step = iterator.next();

      if (step.done === true)
        return step;

      sourceData = step.value;

      state = 'directed';
      return next();
    }

    if (state === 'directed') {
      if (type === 'undirected') {
        state = 'undirected';
        return next();
      }

      adj = sourceData.out;
      neighbors = Object.keys(sourceData.out);
      offset = 0;
      state = 'inner-directed';

      return next();
    }

    if (state === 'undirected') {
      if (type === 'directed') {
        state = 'outer';
        return next();
      }

      adj = sourceData.undirected;
      neighbors = Object.keys(sourceData.undirected);
      offset = 0;
      state = 'inner-undirected';
    }

    // Inner
    if (offset >= neighbors.length) {
      if (state === 'inner-undirected')
        state = 'outer';
      else
        state = 'undirected';

      return next();
    }

    const neighbor = neighbors[offset++];
    const edgeData = adj[neighbor];
    let targetData = edgeData.target;

    if (state === 'inner-undirected' && targetData.key === sourceData.key)
      targetData = edgeData.source;

    return {
      done: false,
      value: [
        sourceData.key,
        targetData.key,
        sourceData.attributes,
        targetData.attributes,
        edgeData.key,
        edgeData.attributes
      ]
    };
  });
}

function createAdjacencyIteratorMulti(graph) {
  const iterator = graph._nodes.values();

  const type = graph.type;

  let state = 'outer',
      sourceData,
      neighbors,
      container = null,
      adj,
      offset;

  return new Iterator(function next() {
    let step;

    if (state === 'outer') {
      step = iterator.next();

      if (step.done === true)
        return step;

      sourceData = step.value;

      state = 'directed';
      return next();
    }

    if (state === 'directed') {
      if (type === 'undirected') {
        state = 'undirected';
        return next();
      }

      adj = sourceData.out;
      neighbors = Object.keys(sourceData.out);
      offset = 0;
      state = 'inner-directed';

      return next();
    }

    if (state === 'undirected') {
      if (type === 'directed') {
        state = 'outer';
        return next();
      }

      adj = sourceData.undirected;
      neighbors = Object.keys(sourceData.undirected);
      offset = 0;
      state = 'inner-undirected';
    }

    // Inner
    if (!container && offset >= neighbors.length) {
      if (state === 'inner-undirected')
        state = 'outer';
      else
        state = 'undirected';

      return next();
    }

    if (!container) {
      const neighbor = neighbors[offset++];
      container = adj[neighbor].values();
      return next();
    }

    step = container.next();

    if (step.done) {
      container = null;
      return next();
    }

    const edgeData = step.value;
    let targetData = edgeData.target;

    if (state === 'inner-undirected' && targetData.key === sourceData.key)
      targetData = edgeData.source;

    return {
      done: false,
      value: [
        sourceData.key,
        targetData.key,
        sourceData.attributes,
        targetData.attributes,
        edgeData.key,
        edgeData.attributes
      ]
    };
  });
}

/**
 * Graphology Serialization Utilities
 * ===================================
 *
 * Collection of functions used to validate import-export formats & to ouput
 * them from internal graph data.
 *
 * Serialized Node:
 * {key, ?attributes}
 *
 * Serialized Edge:
 * {key?, source, target, attributes?, undirected?}
 *
 * Serialized Graph:
 * {nodes[], edges?[]}
 */

/**
 * Formats internal node data into a serialized node.
 *
 * @param  {any}    key  - The node's key.
 * @param  {object} data - Internal node's data.
 * @return {array}       - The serialized node.
 */
function serializeNode(key, data) {
  const serialized = {key};

  if (!isEmpty(data.attributes))
    serialized.attributes = assign({}, data.attributes);

  return serialized;
}

/**
 * Formats internal edge data into a serialized edge.
 *
 * @param  {any}    key  - The edge's key.
 * @param  {object} data - Internal edge's data.
 * @return {array}       - The serialized edge.
 */
function serializeEdge(key, data) {
  const serialized = {
    source: data.source.key,
    target: data.target.key
  };

  // We export the key unless if it was provided by the user
  if (!data.generatedKey)
    serialized.key = key;

  if (!isEmpty(data.attributes))
    serialized.attributes = assign({}, data.attributes);

  if (data.undirected)
    serialized.undirected = true;

  return serialized;
}

/**
 * Checks whether the given value is a serialized node.
 *
 * @param  {mixed} value - Target value.
 * @return {string|null}
 */
function validateSerializedNode(value) {
  if (!isPlainObject(value))
    return 'not-object';

  if (!('key' in value))
    return 'no-key';

  if ('attributes' in value &&
      (!isPlainObject(value.attributes) || value.attributes === null))
    return 'invalid-attributes';

  return null;
}

/**
 * Checks whether the given value is a serialized edge.
 *
 * @param  {mixed} value - Target value.
 * @return {string|null}
 */
function validateSerializedEdge(value) {
  if (!isPlainObject(value))
    return 'not-object';

  if (!('source' in value))
    return 'no-source';

  if (!('target' in value))
    return 'no-target';

  if ('attributes' in value &&
      (!isPlainObject(value.attributes) || value.attributes === null))
    return 'invalid-attributes';

  if ('undirected' in value &&
      (typeof value.undirected !== 'boolean'))
    return 'invalid-undirected';

  return null;
}

/* eslint no-nested-ternary: 0 */

/**
 * Enums.
 */
const TYPES = new Set([
  'directed',
  'undirected',
  'mixed'
]);

const EMITTER_PROPS = new Set([
  'domain',
  '_events',
  '_eventsCount',
  '_maxListeners'
]);

const EDGE_ADD_METHODS = [
  {
    name: verb => `${verb}Edge`,
    generateKey: true
  },
  {
    name: verb => `${verb}DirectedEdge`,
    generateKey: true,
    type: 'directed'
  },
  {
    name: verb => `${verb}UndirectedEdge`,
    generateKey: true,
    type: 'undirected'
  },
  {
    name: verb => `${verb}EdgeWithKey`,
  },
  {
    name: verb => `${verb}DirectedEdgeWithKey`,
    type: 'directed'
  },
  {
    name: verb => `${verb}UndirectedEdgeWithKey`,
    type: 'undirected'
  }
];

/**
 * Default options.
 */
const DEFAULTS = {
  allowSelfLoops: true,
  edgeKeyGenerator: null,
  multi: false,
  type: 'mixed'
};

/**
 * Abstract functions used by the Graph class for various methods.
 */

/**
 * Internal method used to add a node to the given graph
 *
 * @param  {Graph}   graph           - Target graph.
 * @param  {any}     node            - The node's key.
 * @param  {object}  [attributes]    - Optional attributes.
 * @return {NodeData}                - Created node data.
 */
function addNode(graph, node, attributes) {
  if (attributes && !isPlainObject(attributes))
    throw new InvalidArgumentsGraphError(`Graph.addNode: invalid attributes. Expecting an object but got "${attributes}"`);

  // String coercion
  node = '' + node;
  attributes = attributes || {};

  if (graph._nodes.has(node))
    throw new UsageGraphError(`Graph.addNode: the "${node}" node already exist in the graph.`);

  const data = new graph.NodeDataClass(node, attributes);

  // Adding the node to internal register
  graph._nodes.set(node, data);

  // Emitting
  graph.emit('nodeAdded', {
    key: node,
    attributes
  });

  return data;
}

/**
 * Same as the above but without sanity checks because we call this in contexts
 * where necessary checks were already done.
 */
function unsafeAddNode(graph, node, attributes) {
  const data = new graph.NodeDataClass(node, attributes);

  graph._nodes.set(node, data);

  graph.emit('nodeAdded', {
    key: node,
    attributes
  });

  return data;
}

/**
 * Internal method used to add an arbitrary edge to the given graph.
 *
 * @param  {Graph}   graph           - Target graph.
 * @param  {string}  name            - Name of the child method for errors.
 * @param  {boolean} mustGenerateKey - Should the graph generate an id?
 * @param  {boolean} undirected      - Whether the edge is undirected.
 * @param  {any}     edge            - The edge's key.
 * @param  {any}     source          - The source node.
 * @param  {any}     target          - The target node.
 * @param  {object}  [attributes]    - Optional attributes.
 * @return {any}                     - The edge.
 *
 * @throws {Error} - Will throw if the graph is of the wrong type.
 * @throws {Error} - Will throw if the given attributes are not an object.
 * @throws {Error} - Will throw if source or target doesn't exist.
 * @throws {Error} - Will throw if the edge already exist.
 */
function addEdge(
  graph,
  name,
  mustGenerateKey,
  undirected,
  edge,
  source,
  target,
  attributes
) {

  // Checking validity of operation
  if (!undirected && graph.type === 'undirected')
    throw new UsageGraphError(`Graph.${name}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`);

  if (undirected && graph.type === 'directed')
    throw new UsageGraphError(`Graph.${name}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`);

  if (attributes && !isPlainObject(attributes))
    throw new InvalidArgumentsGraphError(`Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`);

  // Coercion of source & target:
  source = '' + source;
  target = '' + target;
  attributes = attributes || {};

  if (!graph.allowSelfLoops && source === target)
    throw new UsageGraphError(`Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`);

  const sourceData = graph._nodes.get(source),
        targetData = graph._nodes.get(target);

  if (!sourceData)
    throw new NotFoundGraphError(`Graph.${name}: source node "${source}" not found.`);

  if (!targetData)
    throw new NotFoundGraphError(`Graph.${name}: target node "${target}" not found.`);

  // Must the graph generate an id for this edge?
  const eventData = {
    key: null,
    undirected,
    source,
    target,
    attributes
  };

  if (mustGenerateKey)
    edge = graph._edgeKeyGenerator(eventData);

  // Coercion of edge key
  edge = '' + edge;

  // Here, we have a key collision
  if (graph._edges.has(edge))
    throw new UsageGraphError(`Graph.${name}: the "${edge}" edge already exists in the graph.`);

  // Here, we might have a source / target collision
  if (
    !graph.multi &&
    (
      undirected ?
        typeof sourceData.undirected[target] !== 'undefined' :
        typeof sourceData.out[target] !== 'undefined'
    )
  ) {
    throw new UsageGraphError(`Graph.${name}: an edge linking "${source}" to "${target}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`);
  }

  // Storing some data
  const edgeData = new EdgeData(
    undirected,
    edge,
    mustGenerateKey,
    sourceData,
    targetData,
    attributes
  );

  // Adding the edge to the internal register
  graph._edges.set(edge, edgeData);

  // Incrementing node degree counters
  if (source === target) {
    if (undirected) {
      sourceData.undirectedSelfLoops++;
      graph._undirectedSelfLoopCount++;
    }
    else {
      sourceData.directedSelfLoops++;
      graph._directedSelfLoopCount++;
    }
  }
  else {
    if (undirected) {
      sourceData.undirectedDegree++;
      targetData.undirectedDegree++;
    }
    else {
      sourceData.outDegree++;
      targetData.inDegree++;
    }
  }

  // Updating relevant index
  updateStructureIndex(
    graph,
    undirected,
    edgeData,
    source,
    target,
    sourceData,
    targetData
  );

  if (undirected)
    graph._undirectedSize++;
  else
    graph._directedSize++;

  // Emitting
  eventData.key = edge;

  graph.emit('edgeAdded', eventData);

  return edge;
}

/**
 * Internal method used to add an arbitrary edge to the given graph.
 *
 * @param  {Graph}   graph           - Target graph.
 * @param  {string}  name            - Name of the child method for errors.
 * @param  {boolean} mustGenerateKey - Should the graph generate an id?
 * @param  {boolean} undirected      - Whether the edge is undirected.
 * @param  {any}     edge            - The edge's key.
 * @param  {any}     source          - The source node.
 * @param  {any}     target          - The target node.
 * @param  {object}  [attributes]    - Optional attributes.
 * @param  {boolean} [asUpdater]       - Are we updating or merging?
 * @return {any}                     - The edge.
 *
 * @throws {Error} - Will throw if the graph is of the wrong type.
 * @throws {Error} - Will throw if the given attributes are not an object.
 * @throws {Error} - Will throw if source or target doesn't exist.
 * @throws {Error} - Will throw if the edge already exist.
 */
function mergeEdge(
  graph,
  name,
  mustGenerateKey,
  undirected,
  edge,
  source,
  target,
  attributes,
  asUpdater
) {

  // Checking validity of operation
  if (!undirected && graph.type === 'undirected')
    throw new UsageGraphError(`Graph.${name}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`);

  if (undirected && graph.type === 'directed')
    throw new UsageGraphError(`Graph.${name}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`);

  if (attributes) {
    if (asUpdater) {
      if (typeof attributes !== 'function')
        throw new InvalidArgumentsGraphError(`Graph.${name}: invalid updater function. Expecting a function but got "${attributes}"`);
    }
    else {
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(`Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`);
    }
  }

  // Coercion of source & target:
  source = '' + source;
  target = '' + target;

  let updater;

  if (asUpdater) {
    updater = attributes;
    attributes = undefined;
  }

  if (!graph.allowSelfLoops && source === target)
    throw new UsageGraphError(`Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`);

  let sourceData = graph._nodes.get(source),
      targetData = graph._nodes.get(target),
      edgeData;

  // Do we need to handle duplicate?
  let alreadyExistingEdgeData;

  if (!mustGenerateKey) {
    edgeData = graph._edges.get(edge);

    if (edgeData) {

      // Here, we need to ensure, if the user gave a key, that source & target
      // are coherent
      if (
        (edgeData.source.key !== source || edgeData.target.key !== target) ||
        (undirected && (edgeData.source.key !== target || edgeData.target.key !== source))
      ) {
        throw new UsageGraphError(`Graph.${name}: inconsistency detected when attempting to merge the "${edge}" edge with "${source}" source & "${target}" target vs. ("${edgeData.source.key}", "${edgeData.target.key}").`);
      }

      alreadyExistingEdgeData = edgeData;
    }
  }

  // Here, we might have a source / target collision
  if (
    !alreadyExistingEdgeData &&
    !graph.multi &&
    sourceData
  ) {
    alreadyExistingEdgeData = undirected ?
      sourceData.undirected[target] :
      sourceData.out[target];
  }

  // Handling duplicates
  if (alreadyExistingEdgeData) {

    // We can skip the attribute merging part if the user did not provide them
    if (asUpdater ? !updater : !attributes)
      return alreadyExistingEdgeData.key;

    // Updating the attributes
    if (asUpdater) {
      const oldAttributes = alreadyExistingEdgeData.attributes;
      alreadyExistingEdgeData.attributes = updater(oldAttributes);

      graph.emit('edgeAttributesUpdated', {
        type: 'replace',
        key: alreadyExistingEdgeData.key,
        attributes: alreadyExistingEdgeData.attributes,
      });
    }

    // Merging the attributes
    else {
      assign(alreadyExistingEdgeData.attributes, attributes);

      graph.emit('edgeAttributesUpdated', {
        type: 'merge',
        key: alreadyExistingEdgeData.key,
        attributes: alreadyExistingEdgeData.attributes,
        data: attributes
      });
    }

    return alreadyExistingEdgeData.key;
  }

  attributes = attributes || {};

  if (asUpdater && updater)
    attributes = updater(attributes);

  // Must the graph generate an id for this edge?
  const eventData = {
    key: null,
    undirected,
    source,
    target,
    attributes
  };

  if (mustGenerateKey)
    edge = graph._edgeKeyGenerator(eventData);

  // Coercion of edge key
  edge = '' + edge;

  // Here, we have a key collision
  if (graph._edges.has(edge))
    throw new UsageGraphError(`Graph.${name}: the "${edge}" edge already exists in the graph.`);

  if (!sourceData) {
    sourceData = unsafeAddNode(graph, source, {});

    if (source === target)
      targetData = sourceData;
  }
  if (!targetData) {
    targetData = unsafeAddNode(graph, target, {});
  }

  // Storing some data
  edgeData = new EdgeData(
    undirected,
    edge,
    mustGenerateKey,
    sourceData,
    targetData,
    attributes
  );

  // Adding the edge to the internal register
  graph._edges.set(edge, edgeData);

  // Incrementing node degree counters
  if (source === target) {
    if (undirected) {
      sourceData.undirectedSelfLoops++;
      graph._undirectedSelfLoopCount++;
    }
    else {
      sourceData.directedSelfLoops++;
      graph._directedSelfLoopCount++;
    }
  }
  else {
    if (undirected) {
      sourceData.undirectedDegree++;
      targetData.undirectedDegree++;
    }
    else {
      sourceData.outDegree++;
      targetData.inDegree++;
    }
  }

  // Updating relevant index
  updateStructureIndex(
    graph,
    undirected,
    edgeData,
    source,
    target,
    sourceData,
    targetData
  );

  if (undirected)
    graph._undirectedSize++;
  else
    graph._directedSize++;

  // Emitting
  eventData.key = edge;

  graph.emit('edgeAdded', eventData);

  return edge;
}

/**
 * Graph class
 *
 * @constructor
 * @param  {object}  [options] - Options:
 * @param  {boolean}   [allowSelfLoops] - Allow self loops?
 * @param  {string}    [type]           - Type of the graph.
 * @param  {boolean}   [map]            - Allow references as keys?
 * @param  {boolean}   [multi]          - Allow parallel edges?
 *
 * @throws {Error} - Will throw if the arguments are not valid.
 */
class Graph extends EventEmitter {
  constructor(options) {
    super();

    //-- Solving options
    options = assign({}, DEFAULTS, options);

    // Enforcing options validity
    if (options.edgeKeyGenerator && typeof options.edgeKeyGenerator !== 'function')
      throw new InvalidArgumentsGraphError(`Graph.constructor: invalid 'edgeKeyGenerator' option. Expecting a function but got "${options.edgeKeyGenerator}".`);

    if (typeof options.multi !== 'boolean')
      throw new InvalidArgumentsGraphError(`Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${options.multi}".`);

    if (!TYPES.has(options.type))
      throw new InvalidArgumentsGraphError(`Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${options.type}".`);

    if (typeof options.allowSelfLoops !== 'boolean')
      throw new InvalidArgumentsGraphError(`Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${options.allowSelfLoops}".`);

    //-- Private properties

    // Utilities
    const NodeDataClass = options.type === 'mixed' ?
      MixedNodeData :
      (options.type === 'directed') ?
        DirectedNodeData :
        UndirectedNodeData;

    privateProperty(this, 'NodeDataClass', NodeDataClass);

    // Indexes
    privateProperty(this, '_attributes', {});
    privateProperty(this, '_nodes', new Map());
    privateProperty(this, '_edges', new Map());
    privateProperty(this, '_directedSize', 0);
    privateProperty(this, '_undirectedSize', 0);
    privateProperty(this, '_directedSelfLoopCount', 0);
    privateProperty(this, '_undirectedSelfLoopCount', 0);
    privateProperty(this, '_edgeKeyGenerator', options.edgeKeyGenerator || incrementalId());

    // Options
    privateProperty(this, '_options', options);

    // Emitter properties
    EMITTER_PROPS.forEach(prop => privateProperty(this, prop, this[prop]));

    //-- Properties readers
    readOnlyProperty(this, 'order', () => this._nodes.size);
    readOnlyProperty(this, 'size', () => this._edges.size);
    readOnlyProperty(this, 'directedSize', () => this._directedSize);
    readOnlyProperty(this, 'undirectedSize', () => this._undirectedSize);
    readOnlyProperty(this, 'selfLoopCount', () => this._directedSelfLoopCount + this._undirectedSelfLoopCount);
    readOnlyProperty(this, 'directedSelfLoopCount', () => this._directedSelfLoopCount);
    readOnlyProperty(this, 'undirectedSelfLoopCount', () => this._undirectedSelfLoopCount);
    readOnlyProperty(this, 'multi', this._options.multi);
    readOnlyProperty(this, 'type', this._options.type);
    readOnlyProperty(this, 'allowSelfLoops', this._options.allowSelfLoops);
    readOnlyProperty(this, 'implementation', () => 'graphology');
  }

  /**---------------------------------------------------------------------------
   * Read
   **---------------------------------------------------------------------------
   */

  /**
   * Method returning whether the given node is found in the graph.
   *
   * @param  {any}     node - The node.
   * @return {boolean}
   */
  hasNode(node) {
    return this._nodes.has('' + node);
  }

  /**
   * Method returning whether the given directed edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasDirectedEdge(source, target) {

    // Early termination
    if (this.type === 'undirected')
      return false;

    if (arguments.length === 1) {
      const edge = '' + source;

      const edgeData = this._edges.get(edge);

      return (
        !!edgeData &&
        !edgeData.undirected
      );
    }
    else if (arguments.length === 2) {

      source = '' + source;
      target = '' + target;

      // If the node source or the target is not in the graph we break
      const nodeData = this._nodes.get(source);

      if (!nodeData)
        return false;

      // Is there a directed edge pointing toward target?
      const edges = nodeData.out[target];

      if (!edges)
        return false;

      return this.multi ? !!edges.size : true;
    }

    throw new InvalidArgumentsGraphError(`Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`);
  }

  /**
   * Method returning whether the given undirected edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasUndirectedEdge(source, target) {

    // Early termination
    if (this.type === 'directed')
      return false;

    if (arguments.length === 1) {
      const edge = '' + source;

      const edgeData = this._edges.get(edge);

      return (
        !!edgeData &&
        edgeData.undirected
      );
    }
    else if (arguments.length === 2) {

      source = '' + source;
      target = '' + target;

      // If the node source or the target is not in the graph we break
      const nodeData = this._nodes.get(source);

      if (!nodeData)
        return false;

      // Is there a directed edge pointing toward target?
      const edges = nodeData.undirected[target];

      if (!edges)
        return false;

      return this.multi ? !!edges.size : true;
    }

    throw new InvalidArgumentsGraphError(`Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`);
  }

  /**
   * Method returning whether the given edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasEdge(source, target) {

    if (arguments.length === 1) {
      const edge = '' + source;

      return this._edges.has(edge);
    }
    else if (arguments.length === 2) {

      source = '' + source;
      target = '' + target;

      // If the node source or the target is not in the graph we break
      const nodeData = this._nodes.get(source);

      if (!nodeData)
        return false;

      // Is there a directed edge pointing toward target?
      let edges = typeof nodeData.out !== 'undefined' && nodeData.out[target];

      if (!edges)
        edges = typeof nodeData.undirected !== 'undefined' && nodeData.undirected[target];

      if (!edges)
        return false;

      return this.multi ? !!edges.size : true;
    }

    throw new InvalidArgumentsGraphError(`Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`);
  }

  /**
   * Method returning the edge matching source & target in a directed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  directedEdge(source, target) {

    if (this.type === 'undirected')
      return;

    source = '' + source;
    target = '' + target;

    if (this.multi)
      throw new UsageGraphError('Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead.');

    const sourceData = this._nodes.get(source);

    if (!sourceData)
      throw new NotFoundGraphError(`Graph.directedEdge: could not find the "${source}" source node in the graph.`);

    if (!this._nodes.has(target))
      throw new NotFoundGraphError(`Graph.directedEdge: could not find the "${target}" target node in the graph.`);

    const edgeData = (sourceData.out && sourceData.out[target]) || undefined;

    if (edgeData)
      return edgeData.key;
  }

  /**
   * Method returning the edge matching source & target in a undirected fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  undirectedEdge(source, target) {

    if (this.type === 'directed')
      return;

    source = '' + source;
    target = '' + target;

    if (this.multi)
      throw new UsageGraphError('Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead.');

    const sourceData = this._nodes.get(source);

    if (!sourceData)
      throw new NotFoundGraphError(`Graph.undirectedEdge: could not find the "${source}" source node in the graph.`);

    if (!this._nodes.has(target))
      throw new NotFoundGraphError(`Graph.undirectedEdge: could not find the "${target}" target node in the graph.`);

    const edgeData = (sourceData.undirected && sourceData.undirected[target]) || undefined;

    if (edgeData)
      return edgeData.key;
  }

  /**
   * Method returning the edge matching source & target in a mixed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  edge(source, target) {
    if (this.multi)
      throw new UsageGraphError('Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead.');

    source = '' + source;
    target = '' + target;

    const sourceData = this._nodes.get(source);

    if (!sourceData)
      throw new NotFoundGraphError(`Graph.edge: could not find the "${source}" source node in the graph.`);

    if (!this._nodes.has(target))
      throw new NotFoundGraphError(`Graph.edge: could not find the "${target}" target node in the graph.`);

    const edgeData = (
      (sourceData.out && sourceData.out[target]) ||
      (sourceData.undirected && sourceData.undirected[target]) ||
      undefined
    );

    if (edgeData)
      return edgeData.key;
  }

  /**
   * Method returning the given node's in degree.
   *
   * @param  {any}     node      - The node's key.
   * @param  {boolean} allowSelfLoops - Count self-loops?
   * @return {number}            - The node's in degree.
   *
   * @throws {Error} - Will throw if the selfLoops arg is not boolean.
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegree(node, selfLoops = true) {
    if (typeof selfLoops !== 'boolean')
      throw new InvalidArgumentsGraphError(`Graph.inDegree: Expecting a boolean but got "${selfLoops}" for the second parameter (allowing self-loops to be counted).`);

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(`Graph.inDegree: could not find the "${node}" node in the graph.`);

    if (this.type === 'undirected')
      return 0;

    const loops = selfLoops ? nodeData.directedSelfLoops : 0;

    return nodeData.inDegree + loops;
  }

  /**
   * Method returning the given node's out degree.
   *
   * @param  {any}     node      - The node's key.
   * @param  {boolean} selfLoops - Count self-loops?
   * @return {number}            - The node's out degree.
   *
   * @throws {Error} - Will throw if the selfLoops arg is not boolean.
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegree(node, selfLoops = true) {
    if (typeof selfLoops !== 'boolean')
      throw new InvalidArgumentsGraphError(`Graph.outDegree: Expecting a boolean but got "${selfLoops}" for the second parameter (allowing self-loops to be counted).`);

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(`Graph.outDegree: could not find the "${node}" node in the graph.`);

    if (this.type === 'undirected')
      return 0;

    const loops = selfLoops ? nodeData.directedSelfLoops : 0;

    return nodeData.outDegree + loops;
  }

  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node      - The node's key.
   * @param  {boolean} selfLoops - Count self-loops?
   * @return {number}            - The node's directed degree.
   *
   * @throws {Error} - Will throw if the selfLoops arg is not boolean.
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegree(node, selfLoops = true) {
    if (typeof selfLoops !== 'boolean')
      throw new InvalidArgumentsGraphError(`Graph.directedDegree: Expecting a boolean but got "${selfLoops}" for the second parameter (allowing self-loops to be counted).`);

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(`Graph.directedDegree: could not find the "${node}" node in the graph.`);

    if (this.type === 'undirected')
      return 0;

    const loops = selfLoops ? nodeData.directedSelfLoops : 0;

    const inDegree = nodeData.inDegree + loops;
    const outDegree = nodeData.outDegree + loops;

    return inDegree + outDegree;
  }

  /**
   * Method returning the given node's undirected degree.
   *
   * @param  {any}     node      - The node's key.
   * @param  {boolean} selfLoops - Count self-loops?
   * @return {number}            - The node's undirected degree.
   *
   * @throws {Error} - Will throw if the selfLoops arg is not boolean.
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegree(node, selfLoops = true) {
    if (typeof selfLoops !== 'boolean')
      throw new InvalidArgumentsGraphError(`Graph.undirectedDegree: Expecting a boolean but got "${selfLoops}" for the second parameter (allowing self-loops to be counted).`);

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(`Graph.undirectedDegree: could not find the "${node}" node in the graph.`);

    if (this.type === 'directed')
      return 0;

    const loops = selfLoops ? nodeData.undirectedSelfLoops : 0;

    return nodeData.undirectedDegree + loops * 2;
  }

  /**
   * Method returning the given node's degree.
   *
   * @param  {any}     node      - The node's key.
   * @param  {boolean} selfLoops - Count self-loops?
   * @return {number}            - The node's degree.
   *
   * @throws {Error} - Will throw if the selfLoops arg is not boolean.
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degree(node, selfLoops = true) {
    if (typeof selfLoops !== 'boolean')
      throw new InvalidArgumentsGraphError(`Graph.degree: Expecting a boolean but got "${selfLoops}" for the second parameter (allowing self-loops to be counted).`);

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(`Graph.degree: could not find the "${node}" node in the graph.`);

    let degree = 0;
    let loops = 0;

    if (this.type !== 'directed') {
      if (selfLoops)
        loops = nodeData.undirectedSelfLoops;

      degree += nodeData.undirectedDegree + loops * 2;
    }

    if (this.type !== 'undirected') {
      if (selfLoops)
        loops = nodeData.directedSelfLoops;

      degree += nodeData.inDegree + nodeData.outDegree + loops * 2;
    }

    return degree;
  }

  /**
   * Method returning the given edge's source.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's source.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  source(edge) {
    edge = '' + edge;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.source: could not find the "${edge}" edge in the graph.`);

    return data.source.key;
  }

  /**
   * Method returning the given edge's target.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's target.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  target(edge) {
    edge = '' + edge;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.target: could not find the "${edge}" edge in the graph.`);

    return data.target.key;
  }

  /**
   * Method returning the given edge's extremities.
   *
   * @param  {any}   edge - The edge's key.
   * @return {array}      - The edge's extremities.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  extremities(edge) {
    edge = '' + edge;

    const edgeData = this._edges.get(edge);

    if (!edgeData)
      throw new NotFoundGraphError(`Graph.extremities: could not find the "${edge}" edge in the graph.`);

    return [
      edgeData.source.key,
      edgeData.target.key
    ];
  }

  /**
   * Given a node & an edge, returns the other extremity of the edge.
   *
   * @param  {any}   node - The node's key.
   * @param  {any}   edge - The edge's key.
   * @return {any}        - The related node.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph or if the
   *                   edge & node are not related.
   */
  opposite(node, edge) {
    node = '' + node;
    edge = '' + edge;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.opposite: could not find the "${edge}" edge in the graph.`);

    const source = data.source.key,
          target = data.target.key;

    if (node !== source && node !== target)
      throw new NotFoundGraphError(`Graph.opposite: the "${node}" node is not attached to the "${edge}" edge (${source}, ${target}).`);

    return node === source ? target : source;
  }

  /**
   * Returns whether the given edge has the given node as extremity.
   *
   * @param  {any}     edge - The edge's key.
   * @param  {any}     node - The node's key.
   * @return {boolean}      - The related node.
   *
   * @throws {Error} - Will throw if either the node or the edge isn't in the graph.
   */
  hasExtremity(edge, node) {
    edge = '' + edge;
    node = '' + node;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.hasExtremity: could not find the "${edge}" edge in the graph.`);

    return (
      data.source.key === node ||
      data.target.key === node
    );
  }

  /**
   * Method returning whether the given edge is undirected.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isUndirected(edge) {
    edge = '' + edge;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.isUndirected: could not find the "${edge}" edge in the graph.`);

    return data.undirected;
  }

  /**
   * Method returning whether the given edge is directed.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isDirected(edge) {
    edge = '' + edge;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.isDirected: could not find the "${edge}" edge in the graph.`);

    return !data.undirected;
  }

  /**
   * Method returning whether the given edge is a self loop.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isSelfLoop(edge) {
    edge = '' + edge;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.isSelfLoop: could not find the "${edge}" edge in the graph.`);

    return data.source === data.target;
  }

  /**
   * Method returning whether the given edge has a generated key.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  hasGeneratedKey(edge) {
    edge = '' + edge;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.hasGeneratedKey: could not find the "${edge}" edge in the graph.`);

    return data.generatedKey;
  }

  /**---------------------------------------------------------------------------
   * Mutation
   **---------------------------------------------------------------------------
   */

  /**
   * Method used to add a node to the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   *
   * @throws {Error} - Will throw if the given node already exist.
   * @throws {Error} - Will throw if the given attributes are not an object.
   */
  addNode(node, attributes) {
    const nodeData = addNode(this, node, attributes);

    return nodeData.key;
  }

  /**
   * Method used to merge a node into the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   */
  mergeNode(node, attributes) {
    if (attributes && !isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(`Graph.mergeNode: invalid attributes. Expecting an object but got "${attributes}"`);

    // String coercion
    node = '' + node;
    attributes = attributes || {};

    // If the node already exists, we merge the attributes
    let data = this._nodes.get(node);

    if (data) {
      if (attributes) {
        assign(data.attributes, attributes);

        this.emit('nodeAttributesUpdated', {
          type: 'merge',
          key: node,
          attributes: data.attributes,
          data: attributes
        });
      }
      return node;
    }

    data = new this.NodeDataClass(node, attributes);

    // Adding the node to internal register
    this._nodes.set(node, data);

    // Emitting
    this.emit('nodeAdded', {
      key: node,
      attributes
    });

    return node;
  }

  /**
   * Method used to add a node if it does not exist in the graph or else to
   * update its attributes using a function.
   *
   * @param  {any}      node      - The node.
   * @param  {function} [updater] - Optional updater function.
   * @return {any}                - The node.
   */
  updateNode(node, updater) {
    if (updater && typeof updater !== 'function')
      throw new InvalidArgumentsGraphError(`Graph.updateNode: invalid updater function. Expecting a function but got "${updater}"`);

    // String coercion
    node = '' + node;

    // If the node already exists, we update the attributes
    let data = this._nodes.get(node);

    if (data) {
      if (updater) {
        const oldAttributes = data.attributes;
        data.attributes = updater(oldAttributes);

        this.emit('nodeAttributesUpdated', {
          type: 'replace',
          key: node,
          attributes: data.attributes
        });
      }
      return node;
    }

    const attributes = updater ? updater({}) : {};

    data = new this.NodeDataClass(node, attributes);

    // Adding the node to internal register
    this._nodes.set(node, data);

    // Emitting
    this.emit('nodeAdded', {
      key: node,
      attributes
    });

    return node;
  }

  /**
   * Method used to drop a single node & all its attached edges from the graph.
   *
   * @param  {any}    node - The node.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the node doesn't exist.
   */
  dropNode(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(`Graph.dropNode: could not find the "${node}" node in the graph.`);

    // Removing attached edges
    // TODO: we could do faster
    this.forEachEdge(node, edge => {
      this.dropEdge(edge);
    });

    // Dropping the node from the register
    this._nodes.delete(node);

    // Emitting
    this.emit('nodeDropped', {
      key: node,
      attributes: nodeData.attributes
    });
  }

  /**
   * Method used to drop a single edge from the graph.
   *
   * Arity 1:
   * @param  {any}    edge - The edge.
   *
   * Arity 2:
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropEdge(edge) {
    let edgeData;

    if (arguments.length > 1) {
      const source = '' + arguments[0],
            target = '' + arguments[1];

      edgeData = getMatchingEdge(this, source, target, this.type);

      if (!edgeData)
        throw new NotFoundGraphError(`Graph.dropEdge: could not find the "${source}" -> "${target}" edge in the graph.`);
    }
    else {
      edge = '' + edge;

      edgeData = this._edges.get(edge);

      if (!edgeData)
        throw new NotFoundGraphError(`Graph.dropEdge: could not find the "${edge}" edge in the graph.`);
    }

    // Dropping the edge from the register
    this._edges.delete(edgeData.key);

    // Updating related degrees
    const {
      source: sourceData,
      target: targetData,
      attributes
    } = edgeData;

    const undirected = edgeData.undirected;

    if (sourceData === targetData) {
      if (undirected) {
        sourceData.undirectedSelfLoops--;
        this._undirectedSelfLoopCount--;
      }
      else {
        sourceData.directedSelfLoops--;
        this._directedSelfLoopCount--;
      }
    }
    else {
      if (undirected) {
        sourceData.undirectedDegree--;
        targetData.undirectedDegree--;
      }
      else {
        sourceData.outDegree--;
        targetData.inDegree--;
      }
    }

    // Clearing index
    clearEdgeFromStructureIndex(this, undirected, edgeData);

    if (undirected)
      this._undirectedSize--;
    else
      this._directedSize--;

    // Emitting
    this.emit('edgeDropped', {
      key: edge,
      attributes,
      source: sourceData.key,
      target: targetData.key,
      undirected
    });

    return this;
  }

  /**
   * Method used to remove every edge & every node from the graph.
   *
   * @return {Graph}
   */
  clear() {

    // Clearing edges
    this._edges.clear();

    // Clearing nodes
    this._nodes.clear();

    // Emitting
    this.emit('cleared');
  }

  /**
   * Method used to remove every edge from the graph.
   *
   * @return {Graph}
   */
  clearEdges() {

    // Clearing edges
    this._edges.clear();

    // Clearing indices
    this.clearIndex();

    // Emitting
    this.emit('edgesCleared');
  }

  /**---------------------------------------------------------------------------
   * Attributes-related methods
   **---------------------------------------------------------------------------
   */

  /**
   * Method returning the desired graph's attribute.
   *
   * @param  {string} name - Name of the attribute.
   * @return {any}
   */
  getAttribute(name) {
    return this._attributes[name];
  }

  /**
   * Method returning the graph's attributes.
   *
   * @return {object}
   */
  getAttributes() {
    return this._attributes;
  }

  /**
   * Method returning whether the graph has the desired attribute.
   *
   * @param  {string}  name - Name of the attribute.
   * @return {boolean}
   */
  hasAttribute(name) {
    return this._attributes.hasOwnProperty(name);
  }

  /**
   * Method setting a value for the desired graph's attribute.
   *
   * @param  {string}  name  - Name of the attribute.
   * @param  {any}     value - Value for the attribute.
   * @return {Graph}
   */
  setAttribute(name, value) {
    this._attributes[name] = value;

    // Emitting
    this.emit('attributesUpdated', {
      type: 'set',
      attributes: this._attributes,
      name
    });

    return this;
  }

  /**
   * Method using a function to update the desired graph's attribute's value.
   *
   * @param  {string}   name    - Name of the attribute.
   * @param  {function} updater - Function use to update the attribute's value.
   * @return {Graph}
   */
  updateAttribute(name, updater) {
    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError('Graph.updateAttribute: updater should be a function.');

    const value = this._attributes[name];

    this._attributes[name] = updater(value);

    // Emitting
    this.emit('attributesUpdated', {
      type: 'set',
      attributes: this._attributes,
      name
    });

    return this;
  }

  /**
   * Method removing the desired graph's attribute.
   *
   * @param  {string} name  - Name of the attribute.
   * @return {Graph}
   */
  removeAttribute(name) {
    delete this._attributes[name];

    // Emitting
    this.emit('attributesUpdated', {
      type: 'remove',
      attributes: this._attributes,
      name
    });

    return this;
  }

  /**
   * Method replacing the graph's attributes.
   *
   * @param  {object} attributes - New attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  replaceAttributes(attributes) {
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError('Graph.replaceAttributes: provided attributes are not a plain object.');

    this._attributes = attributes;

    // Emitting
    this.emit('attributesUpdated', {
      type: 'replace',
      attributes: this._attributes
    });

    return this;
  }

  /**
   * Method merging the graph's attributes.
   *
   * @param  {object} attributes - Attributes to merge.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  mergeAttributes(attributes) {
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError('Graph.mergeAttributes: provided attributes are not a plain object.');

    assign(this._attributes, attributes);

    // Emitting
    this.emit('attributesUpdated', {
      type: 'merge',
      attributes: this._attributes,
      data: attributes
    });

    return this;
  }

  /**
   * Method returning the desired attribute for the given node.
   *
   * @param  {any}    node - Target node.
   * @param  {string} name - Name of the attribute to get.
   * @return {any}
   *
   * @throws {Error} - Will throw if the node is not found.
   */
  getNodeAttribute(node, name) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.getNodeAttribute: could not find the "${node}" node in the graph.`);

    return data.attributes[name];
  }

  /**
   * Method returning the attributes for the given node.
   *
   * @param  {any}    node - Target node.
   * @return {object}
   *
   * @throws {Error} - Will throw if the node is not found.
   */
  getNodeAttributes(node) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.getNodeAttributes: could not find the "${node}" node in the graph.`);

    return data.attributes;
  }

  /**
   * Method checking whether the given attribute exists for the given node.
   *
   * @param  {any}    node - Target node.
   * @param  {string} name - Name of the attribute to check.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node is not found.
   */
  hasNodeAttribute(node, name) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.hasNodeAttribute: could not find the "${node}" node in the graph.`);

    return data.attributes.hasOwnProperty(name);
  }

  /**
   * Method checking setting the desired attribute for the given node.
   *
   * @param  {any}    node  - Target node.
   * @param  {string} name  - Name of the attribute to set.
   * @param  {any}    value - Value for the attribute.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if less than 3 arguments are passed.
   * @throws {Error} - Will throw if the node is not found.
   */
  setNodeAttribute(node, name, value) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.setNodeAttribute: could not find the "${node}" node in the graph.`);

    if (arguments.length < 3)
      throw new InvalidArgumentsGraphError('Graph.setNodeAttribute: not enough arguments. Either you forgot to pass the attribute\'s name or value, or you meant to use #.replaceNodeAttributes / #.mergeNodeAttributes instead.');

    data.attributes[name] = value;

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: node,
      type: 'set',
      attributes: data.attributes,
      name
    });

    return this;
  }

  /**
   * Method checking setting the desired attribute for the given node.
   *
   * @param  {any}      node    - Target node.
   * @param  {string}   name    - Name of the attribute to set.
   * @param  {function} updater - Function that will update the attribute.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if less than 3 arguments are passed.
   * @throws {Error} - Will throw if updater is not a function.
   * @throws {Error} - Will throw if the node is not found.
   */
  updateNodeAttribute(node, name, updater) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.updateNodeAttribute: could not find the "${node}" node in the graph.`);

    if (arguments.length < 3)
      throw new InvalidArgumentsGraphError('Graph.updateNodeAttribute: not enough arguments. Either you forgot to pass the attribute\'s name or updater, or you meant to use #.replaceNodeAttributes / #.mergeNodeAttributes instead.');

    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError('Graph.updateAttribute: updater should be a function.');

    const attributes = data.attributes;
    const value = updater(attributes[name]);

    attributes[name] = value;

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: node,
      type: 'set',
      attributes: data.attributes,
      name
    });

    return this;
  }

  /**
   * Method removing the desired attribute for the given node.
   *
   * @param  {any}    node  - Target node.
   * @param  {string} name  - Name of the attribute to remove.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the node is not found.
   */
  removeNodeAttribute(node, name) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.hasNodeAttribute: could not find the "${node}" node in the graph.`);

    delete data.attributes[name];

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: node,
      type: 'remove',
      attributes: data.attributes,
      name
    });

    return this;
  }

  /**
   * Method completely replacing the attributes of the given node.
   *
   * @param  {any}    node       - Target node.
   * @param  {object} attributes - New attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the node is not found.
   * @throws {Error} - Will throw if the given attributes is not a plain object.
   */
  replaceNodeAttributes(node, attributes) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.replaceNodeAttributes: could not find the "${node}" node in the graph.`);

    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError('Graph.replaceNodeAttributes: provided attributes are not a plain object.');

    data.attributes = attributes;

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: node,
      type: 'replace',
      attributes: data.attributes
    });

    return this;
  }

  /**
   * Method merging the attributes of the given node with the provided ones.
   *
   * @param  {any}    node       - Target node.
   * @param  {object} attributes - Attributes to merge.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the node is not found.
   * @throws {Error} - Will throw if the given attributes is not a plain object.
   */
  mergeNodeAttributes(node, attributes) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.mergeNodeAttributes: could not find the "${node}" node in the graph.`);

    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError('Graph.mergeNodeAttributes: provided attributes are not a plain object.');

    assign(data.attributes, attributes);

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: node,
      type: 'merge',
      attributes: data.attributes,
      data: attributes
    });

    return this;
  }

  /**
   * Method used to update each node's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachNodeAttributes(updater, hints) {
    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError('Graph.updateEachNodeAttributes: expecting an updater function.');

    if (hints && !validateHints(hints))
      throw new InvalidArgumentsGraphError('Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}');

    const iterator = this._nodes.values();

    let step, nodeData;

    while ((step = iterator.next(), step.done !== true)) {
      nodeData = step.value;
      nodeData.attributes = updater(nodeData.key, nodeData.attributes);
    }

    this.emit('eachNodeAttributesUpdated', {
      hints: hints ? hints : null
    });
  }

  /**
   * Method used to update each edge's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachEdgeAttributes(updater, hints) {
    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError('Graph.updateEachEdgeAttributes: expecting an updater function.');

    if (hints && !validateHints(hints))
      throw new InvalidArgumentsGraphError('Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}');

    const iterator = this._edges.values();

    let step, edgeData;

    while ((step = iterator.next(), step.done !== true)) {
      edgeData = step.value;
      edgeData.attributes = updater(edgeData.key, edgeData.attributes);
    }

    this.emit('eachEdgeAttributesUpdated', {
      hints: hints ? hints : null
    });
  }

  /**---------------------------------------------------------------------------
   * Iteration-related methods
   **---------------------------------------------------------------------------
   */

  /**
   * Method iterating over the graph's adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEach(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError('Graph.forEach: expecting a callback.');

    if (this.multi)
      forEachAdjacencyMulti(false, this, callback);
    else
      forEachAdjacencySimple(false, this, callback);
  }

  /**
   * Method iterating over the graph's adjacency using the given callback until
   * it returns a truthy value to stop iteration.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachUntil(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError('Graph.forEach: expecting a callback.');

    if (this.multi)
      forEachAdjacencyMulti(true, this, callback);
    else
      forEachAdjacencySimple(true, this, callback);
  }

  /**
   * Method returning an iterator over the graph's adjacency.
   *
   * @return {Iterator}
   */
  adjacency() {
    if (this.multi)
      return createAdjacencyIteratorMulti(this);

    return createAdjacencyIteratorSimple(this);
  }

  /**
   * Method returning the list of the graph's nodes.
   *
   * @return {array} - The nodes.
   */
  nodes() {
    if (typeof Array.from === 'function')
      return Array.from(this._nodes.keys());

    return take(this._nodes.keys(), this._nodes.size);
  }

  /**
   * Method iterating over the graph's nodes using the given callback.
   *
   * @param  {function}  callback - Callback (key, attributes, index).
   */
  forEachNode(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError('Graph.forEachNode: expecting a callback.');

    this._nodes.forEach((data, key) => {
      callback(key, data.attributes);
    });
  }

  /**
   * Method iterating over the graph's nodes using the given callback until
   * it returns a truthy value to stop iteration.
   *
   * @param  {function}  callback - Callback (key, attributes, index).
   */
  forEachNodeUntil(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError('Graph.forEachNode: expecting a callback.');

    const iterator = this._nodes.values();

    let step, nodeData, shouldBreak;

    while ((step = iterator.next(), step !== true)) {
      nodeData = step.value;

      shouldBreak = callback(nodeData.key, nodeData.attributes);

      if (shouldBreak)
        break;
    }
  }

  /**
   * Method returning an iterator over the graph's node entries.
   *
   * @return {Iterator}
   */
  nodeEntries() {
    const iterator = this._nodes.values();

    return new Iterator(() => {
      const step = iterator.next();

      if (step.done)
        return step;

      const data = step.value;

      return {value: [data.key, data.attributes], done: false};
    });
  }

  /**---------------------------------------------------------------------------
   * Serialization
   **---------------------------------------------------------------------------
   */

  /**
   * Method exporting the target node.
   *
   * @param  {any}   node - Target node.
   * @return {array}      - The serialized node.
   *
   * @throws {Error} - Will throw if the node is not found.
   */
  exportNode(node) {
    node = '' + node;

    const data = this._nodes.get(node);

    if (!data)
      throw new NotFoundGraphError(`Graph.exportNode: could not find the "${node}" node in the graph.`);

    return serializeNode(node, data);
  }

  /**
   * Method exporting the target edge.
   *
   * @param  {any}   edge - Target edge.
   * @return {array}      - The serialized edge.
   *
   * @throws {Error} - Will throw if the edge is not found.
   */
  exportEdge(edge) {
    edge = '' + edge;

    const data = this._edges.get(edge);

    if (!data)
      throw new NotFoundGraphError(`Graph.exportEdge: could not find the "${edge}" edge in the graph.`);

    return serializeEdge(edge, data);
  }

  /**
   * Method used to export the whole graph.
   *
   * @return {object} - The serialized graph.
   */
  export() {

    const nodes = new Array(this._nodes.size);

    let i = 0;

    this._nodes.forEach((data, key) => {
      nodes[i++] = serializeNode(key, data);
    });

    const edges = new Array(this._edges.size);

    i = 0;

    this._edges.forEach((data, key) => {
      edges[i++] = serializeEdge(key, data);
    });

    return {
      attributes: this.getAttributes(),
      nodes,
      edges,
      options: {
        type: this.type,
        multi: this.multi,
        allowSelfLoops: this.allowSelfLoops
      }
    };
  }

  /**
   * Method used to import a serialized node.
   *
   * @param  {object} data   - The serialized node.
   * @param  {boolean} merge - Whether to merge the given node.
   * @return {Graph}         - Returns itself for chaining.
   */
  importNode(data, merge = false) {

    // Validating
    const error = validateSerializedNode(data);

    if (error) {

      if (error === 'not-object')
        throw new InvalidArgumentsGraphError('Graph.importNode: invalid serialized node. A serialized node should be a plain object with at least a "key" property.');
      if (error === 'no-key')
        throw new InvalidArgumentsGraphError('Graph.importNode: no key provided.');
      if (error === 'invalid-attributes')
        throw new InvalidArgumentsGraphError('Graph.importNode: invalid attributes. Attributes should be a plain object, null or omitted.');
    }

    // Adding the node
    const {key, attributes = {}} = data;

    if (merge)
      this.mergeNode(key, attributes);
    else
      this.addNode(key, attributes);

    return this;
  }

  /**
   * Method used to import a serialized edge.
   *
   * @param  {object}  data  - The serialized edge.
   * @param  {boolean} merge - Whether to merge the given edge.
   * @return {Graph}         - Returns itself for chaining.
   */
  importEdge(data, merge = false) {

    // Validating
    const error = validateSerializedEdge(data);

    if (error) {

      if (error === 'not-object')
        throw new InvalidArgumentsGraphError('Graph.importEdge: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.');
      if (error === 'no-source')
        throw new InvalidArgumentsGraphError('Graph.importEdge: missing souce.');
      if (error === 'no-target')
        throw new InvalidArgumentsGraphError('Graph.importEdge: missing target.');
      if (error === 'invalid-attributes')
        throw new InvalidArgumentsGraphError('Graph.importEdge: invalid attributes. Attributes should be a plain object, null or omitted.');
      if (error === 'invalid-undirected')
        throw new InvalidArgumentsGraphError('Graph.importEdge: invalid undirected. Undirected should be boolean or omitted.');
    }

    // Adding the edge
    const {
      source,
      target,
      attributes = {},
      undirected = false
    } = data;

    let method;

    if ('key' in data) {
      method = merge ?
        (undirected ? this.mergeUndirectedEdgeWithKey : this.mergeDirectedEdgeWithKey) :
        (undirected ? this.addUndirectedEdgeWithKey : this.addDirectedEdgeWithKey);

      method.call(
        this,
        data.key,
        source,
        target,
        attributes
      );
    }
    else {
      method = merge ?
        (undirected ? this.mergeUndirectedEdge : this.mergeDirectedEdge) :
        (undirected ? this.addUndirectedEdge : this.addDirectedEdge);

      method.call(
        this,
        source,
        target,
        attributes
      );
    }

    return this;
  }

  /**
   * Method used to import a serialized graph.
   *
   * @param  {object|Graph} data  - The serialized graph.
   * @param  {boolean}      merge - Whether to merge data.
   * @return {Graph}              - Returns itself for chaining.
   */
  import(data, merge = false) {

    // Importing a Graph instance
    if (isGraph(data)) {

      this.import(data.export(), merge);
      return this;
    }

    // Importing a serialized graph
    if (!isPlainObject(data))
      throw new InvalidArgumentsGraphError('Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance.');

    if (data.attributes) {
      if (!isPlainObject(data.attributes))
        throw new InvalidArgumentsGraphError('Graph.import: invalid attributes. Expecting a plain object.');

      if (merge)
        this.mergeAttributes(data.attributes);
      else
        this.replaceAttributes(data.attributes);
    }

    let i, l, list;

    if (data.nodes) {
      list = data.nodes;

      if (!Array.isArray(list))
        throw new InvalidArgumentsGraphError('Graph.import: invalid nodes. Expecting an array.');


      for (i = 0, l = list.length; i < l; i++)
        this.importNode(list[i], merge);
    }

    if (data.edges) {
      list = data.edges;

      if (!Array.isArray(list))
        throw new InvalidArgumentsGraphError('Graph.import: invalid edges. Expecting an array.');

      for (i = 0, l = list.length; i < l; i++)
        this.importEdge(list[i], merge);
    }

    return this;
  }

  /**---------------------------------------------------------------------------
   * Utils
   **---------------------------------------------------------------------------
   */

  /**
   * Method returning a null copy of the graph, i.e. a graph without nodes
   * & edges but with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The null copy.
   */
  nullCopy(options) {
    return new Graph(assign({}, this._options, options));
  }

  /**
   * Method returning an empty copy of the graph, i.e. a graph without edges but
   * with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The empty copy.
   */
  emptyCopy(options) {
    const graph = this.nullCopy(options);

    this._nodes.forEach((nodeData, key) => {
      const attributes = assign({}, nodeData.attributes);

      // NOTE: no need to emit events since user cannot access the instance yet
      nodeData = new graph.NodeDataClass(key, attributes);
      graph._nodes.set(key, nodeData);
    });

    return graph;
  }

  /**
   * Method returning an exact copy of the graph.
   *
   * @return {Graph} - The copy.
   */
  copy() {
    const graph = new Graph(this._options);
    graph.import(this);

    return graph;
  }

  /**
   * Method upgrading the graph to a mixed one.
   *
   * @return {Graph} - The copy.
   */
  upgradeToMixed() {
    if (this.type === 'mixed')
      return this;

    // Upgrading node data:
    // NOTE: maybe this could lead to some de-optimization by usual
    // JavaScript engines but I cannot be sure of it. Another solution
    // would be to reinstantiate the classes but this surely has a performance
    // and memory impact.
    this._nodes.forEach(data => (data.upgradeToMixed()));

    // Mutating the options & the instance
    this._options.type = 'mixed';
    readOnlyProperty(this, 'type', this._options.type);
    privateProperty(this, 'NodeDataClass', MixedNodeData);

    return this;
  }

  /**
   * Method upgrading the graph to a multi one.
   *
   * @return {Graph} - The copy.
   */
  upgradeToMulti() {
    if (this.multi)
      return this;

    // Mutating the options & the instance
    this._options.multi = true;
    readOnlyProperty(this, 'multi', true);

    // Upgrading indices
    upgradeStructureIndexToMulti(this);

    return this;
  }

  /**---------------------------------------------------------------------------
   * Indexes-related methods
   **---------------------------------------------------------------------------
   */

  /**
   * Method used to clear the desired index to clear memory.
   *
   * @return {Graph}       - Returns itself for chaining.
   */
  clearIndex() {
    clearStructureIndex(this);
    return this;
  }

  /**---------------------------------------------------------------------------
   * Known methods
   **---------------------------------------------------------------------------
   */

  /**
   * Method used by JavaScript to perform JSON serialization.
   *
   * @return {object} - The serialized graph.
   */
  toJSON() {
    return this.export();
  }

  /**
   * Method returning [object Graph].
   */
  toString() {
    return '[object Graph]';
  }

  /**
   * Method used internally by node's console to display a custom object.
   *
   * @return {object} - Formatted object representation of the graph.
   */
  inspect() {
    const nodes = {};
    this._nodes.forEach((data, key) => {
      nodes[key] = data.attributes;
    });

    const edges = {},
          multiIndex = {};

    this._edges.forEach((data, key) => {
      const direction = data.undirected ? '--' : '->';

      let label = '';

      const desc = `(${data.source.key})${direction}(${data.target.key})`;

      if (!data.generatedKey) {
        label += `[${key}]: `;
      }
      else if (this.multi) {
        if (typeof multiIndex[desc] === 'undefined') {
          multiIndex[desc] = 0;
        }
        else {
          multiIndex[desc]++;
        }

        label += `${multiIndex[desc]}. `;
      }

      label += desc;

      edges[label] = data.attributes;
    });

    const dummy = {};

    for (const k in this) {
      if (this.hasOwnProperty(k) &&
          !EMITTER_PROPS.has(k) &&
          typeof this[k] !== 'function')
        dummy[k] = this[k];
    }

    dummy.attributes = this._attributes;
    dummy.nodes = nodes;
    dummy.edges = edges;

    privateProperty(dummy, 'constructor', this.constructor);

    return dummy;
  }
}

/**
 * Attaching custom inspect method for node >= 10.
 */
if (typeof Symbol !== 'undefined')
  Graph.prototype[Symbol.for('nodejs.util.inspect.custom')] = Graph.prototype.inspect;

/**
 * Attaching methods to the prototype.
 *
 * Here, we are attaching a wide variety of methods to the Graph class'
 * prototype when those are very numerous and when their creation is
 * abstracted.
 */

/**
 * Related to edge addition.
 */
EDGE_ADD_METHODS.forEach(method => {
  ['add', 'merge', 'update'].forEach(verb => {
    const name = method.name(verb),
          fn = verb === 'add' ? addEdge : mergeEdge;

    if (method.generateKey) {
      Graph.prototype[name] = function(source, target, attributes) {
        return fn(
          this,
          name,
          true,
          (method.type || this.type) === 'undirected',
          null,
          source,
          target,
          attributes,
          verb === 'update'
        );
      };
    }
    else {
      Graph.prototype[name] = function(edge, source, target, attributes) {
        return fn(
          this,
          name,
          false,
          (method.type || this.type) === 'undirected',
          edge,
          source,
          target,
          attributes,
          verb === 'update'
        );
      };
    }
  });
});

/**
 * Self iterator.
 */
if (typeof Symbol !== 'undefined')
  Graph.prototype[Symbol.iterator] = Graph.prototype.adjacency;

/**
 * Attributes-related.
 */
attachAttributesMethods(Graph);

/**
 * Edge iteration-related.
 */
attachEdgeIterationMethods(Graph);

/**
 * Neighbor iteration-related.
 */
attachNeighborIterationMethods(Graph);

/**
 * Graphology Helper Classes
 * ==========================
 *
 * Building some higher-order classes instantiating the graph with
 * predefinite options.
 */

/**
 * Alternative constructors.
 */
class DirectedGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({type: 'directed'}, options);

    if ('multi' in finalOptions && finalOptions.multi !== false)
      throw new InvalidArgumentsGraphError('DirectedGraph.from: inconsistent indication that the graph should be multi in given options!');

    if (finalOptions.type !== 'directed')
    throw new InvalidArgumentsGraphError('DirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!');

    super(finalOptions);
  }
}
class UndirectedGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({type: 'undirected'}, options);

    if ('multi' in finalOptions && finalOptions.multi !== false)
      throw new InvalidArgumentsGraphError('UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!');

    if (finalOptions.type !== 'undirected')
      throw new InvalidArgumentsGraphError('UndirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!');

    super(finalOptions);
  }
}
class MultiGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({multi: true}, options);

    if ('multi' in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError('MultiGraph.from: inconsistent indication that the graph should be simple in given options!');

    super(finalOptions);
  }
}
class MultiDirectedGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({type: 'directed', multi: true}, options);

    if ('multi' in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError('MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!');

    if (finalOptions.type !== 'directed')
      throw new InvalidArgumentsGraphError('MultiDirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!');

    super(finalOptions);
  }
}
class MultiUndirectedGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({type: 'undirected', multi: true}, options);

    if ('multi' in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError('MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!');

    if (finalOptions.type !== 'undirected')
      throw new InvalidArgumentsGraphError('MultiUndirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!');

    super(finalOptions);
  }
}

/**
 * Attaching static #.from method to each of the constructors.
 */
function attachStaticFromMethod(Class) {

  /**
   * Builds a graph from serialized data or another graph's data.
   *
   * @param  {Graph|SerializedGraph} data      - Hydratation data.
   * @param  {object}                [options] - Options.
   * @return {Class}
   */
  Class.from = function(data, options) {

    // Merging given options with serialized ones
    const finalOptions = assign({}, data.options, options);

    const instance = new Class(finalOptions);
    instance.import(data);

    return instance;
  };
}

attachStaticFromMethod(Graph);
attachStaticFromMethod(DirectedGraph);
attachStaticFromMethod(UndirectedGraph);
attachStaticFromMethod(MultiGraph);
attachStaticFromMethod(MultiDirectedGraph);
attachStaticFromMethod(MultiUndirectedGraph);

Graph.Graph = Graph;
Graph.DirectedGraph = DirectedGraph;
Graph.UndirectedGraph = UndirectedGraph;
Graph.MultiGraph = MultiGraph;
Graph.MultiDirectedGraph = MultiDirectedGraph;
Graph.MultiUndirectedGraph = MultiUndirectedGraph;

Graph.InvalidArgumentsGraphError = InvalidArgumentsGraphError;
Graph.NotFoundGraphError = NotFoundGraphError;
Graph.UsageGraphError = UsageGraphError;

/**
 * Graphology ESM Endoint
 * =======================
 *
 * Endpoint for ESM modules consumers.
 */

export default Graph;
export { DirectedGraph, Graph, InvalidArgumentsGraphError, MultiDirectedGraph, MultiGraph, MultiUndirectedGraph, NotFoundGraphError, UndirectedGraph, UsageGraphError };
//# sourceMappingURL=graphology.esm.js.map
