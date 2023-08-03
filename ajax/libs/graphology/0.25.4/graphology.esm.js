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
    if (!arguments[i]) continue;

    for (const k in arguments[i]) target[k] = arguments[i][k];
  }

  return target;
}

let assign = assignPolyfill;

if (typeof Object.assign === 'function') assign = Object.assign;

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

  if (!sourceData) return edge;

  if (type === 'mixed') {
    edge =
      (sourceData.out && sourceData.out[target]) ||
      (sourceData.undirected && sourceData.undirected[target]);
  } else if (type === 'directed') {
    edge = sourceData.out && sourceData.out[target];
  } else {
    edge = sourceData.undirected && sourceData.undirected[target];
  }

  return edge;
}

/**
 * Checks whether the given value is a plain object.
 *
 * @param  {mixed}   value - Target value.
 * @return {boolean}
 */
function isPlainObject(value) {
  // NOTE: as per https://github.com/graphology/graphology/issues/149
  // this function has been loosened not to reject object instances
  // coming from other JavaScript contexts. It has also been chosen
  // not to improve it to avoid obvious false positives and avoid
  // taking a performance hit. People should really use TypeScript
  // if they want to avoid feeding subtly irrelvant attribute objects.
  return typeof value === 'object' && value !== null;
}

/**
 * Checks whether the given object is empty.
 *
 * @param  {object}  o - Target Object.
 * @return {boolean}
 */
function isEmpty(o) {
  let k;

  for (k in o) return false;

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
  } else {
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
  if (!isPlainObject(hints)) return false;

  if (hints.attributes && !Array.isArray(hints.attributes)) return false;

  return true;
}

/**
 * Creates a function generating incremental ids for edges.
 *
 * @return {function}
 */
function incrementalIdStartingFromRandomByte() {
  let i = Math.floor(Math.random() * 256) & 0xff;

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
  constructor(message) {
    super();
    this.name = 'GraphError';
    this.message = message;
  }
}

class InvalidArgumentsGraphError extends GraphError {
  constructor(message) {
    super(message);
    this.name = 'InvalidArgumentsGraphError';

    // This is V8 specific to enhance stack readability
    if (typeof Error.captureStackTrace === 'function')
      Error.captureStackTrace(
        this,
        InvalidArgumentsGraphError.prototype.constructor
      );
  }
}

class NotFoundGraphError extends GraphError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundGraphError';

    // This is V8 specific to enhance stack readability
    if (typeof Error.captureStackTrace === 'function')
      Error.captureStackTrace(this, NotFoundGraphError.prototype.constructor);
  }
}

class UsageGraphError extends GraphError {
  constructor(message) {
    super(message);
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

  this.clear();
}

MixedNodeData.prototype.clear = function () {
  // Degrees
  this.inDegree = 0;
  this.outDegree = 0;
  this.undirectedDegree = 0;
  this.undirectedLoops = 0;
  this.directedLoops = 0;

  // Indices
  this.in = {};
  this.out = {};
  this.undirected = {};
};

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

  this.clear();
}

DirectedNodeData.prototype.clear = function () {
  // Degrees
  this.inDegree = 0;
  this.outDegree = 0;
  this.directedLoops = 0;

  // Indices
  this.in = {};
  this.out = {};
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

  this.clear();
}

UndirectedNodeData.prototype.clear = function () {
  // Degrees
  this.undirectedDegree = 0;
  this.undirectedLoops = 0;

  // Indices
  this.undirected = {};
};

/**
 * EdgeData class.
 *
 * @constructor
 * @param {boolean} undirected   - Whether the edge is undirected.
 * @param {string}  string       - The edge's key.
 * @param {string}  source       - Source of the edge.
 * @param {string}  target       - Target of the edge.
 * @param {object}  attributes   - Edge's attributes.
 */
function EdgeData(undirected, key, source, target, attributes) {
  // Attributes
  this.key = key;
  this.attributes = attributes;
  this.undirected = undirected;

  // Extremities
  this.source = source;
  this.target = target;
}

EdgeData.prototype.attach = function () {
  let outKey = 'out';
  let inKey = 'in';

  if (this.undirected) outKey = inKey = 'undirected';

  const source = this.source.key;
  const target = this.target.key;

  // Handling source
  this.source[outKey][target] = this;

  if (this.undirected && source === target) return;

  // Handling target
  this.target[inKey][source] = this;
};

EdgeData.prototype.attachMulti = function () {
  let outKey = 'out';
  let inKey = 'in';

  const source = this.source.key;
  const target = this.target.key;

  if (this.undirected) outKey = inKey = 'undirected';

  // Handling source
  const adj = this.source[outKey];
  const head = adj[target];

  if (typeof head === 'undefined') {
    adj[target] = this;

    // Self-loop optimization
    if (!(this.undirected && source === target)) {
      // Handling target
      this.target[inKey][source] = this;
    }

    return;
  }

  // Prepending to doubly-linked list
  head.previous = this;
  this.next = head;

  // Pointing to new head
  // NOTE: use mutating swap later to avoid lookup?
  adj[target] = this;
  this.target[inKey][source] = this;
};

EdgeData.prototype.detach = function () {
  const source = this.source.key;
  const target = this.target.key;

  let outKey = 'out';
  let inKey = 'in';

  if (this.undirected) outKey = inKey = 'undirected';

  delete this.source[outKey][target];

  // No-op delete in case of undirected self-loop
  delete this.target[inKey][source];
};

EdgeData.prototype.detachMulti = function () {
  const source = this.source.key;
  const target = this.target.key;

  let outKey = 'out';
  let inKey = 'in';

  if (this.undirected) outKey = inKey = 'undirected';

  // Deleting from doubly-linked list
  if (this.previous === undefined) {
    // We are dealing with the head

    // Should we delete the adjacency entry because it is now empty?
    if (this.next === undefined) {
      delete this.source[outKey][target];

      // No-op delete in case of undirected self-loop
      delete this.target[inKey][source];
    } else {
      // Detaching
      this.next.previous = undefined;

      // NOTE: could avoid the lookups by creating a #.become mutating method
      this.source[outKey][target] = this.next;

      // No-op delete in case of undirected self-loop
      this.target[inKey][source] = this.next;
    }
  } else {
    // We are dealing with another list node
    this.previous.next = this.next;

    // If not last
    if (this.next !== undefined) {
      this.next.previous = this.previous;
    }
  }
};

/**
 * Graphology Node Attributes methods
 * ===================================
 */

const NODE = 0;
const SOURCE = 1;
const TARGET = 2;
const OPPOSITE = 3;

function findRelevantNodeData(
  graph,
  method,
  mode,
  nodeOrEdge,
  nameOrEdge,
  add1,
  add2
) {
  let nodeData, edgeData, arg1, arg2;

  nodeOrEdge = '' + nodeOrEdge;

  if (mode === NODE) {
    nodeData = graph._nodes.get(nodeOrEdge);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nodeOrEdge}" node in the graph.`
      );

    arg1 = nameOrEdge;
    arg2 = add1;
  } else if (mode === OPPOSITE) {
    nameOrEdge = '' + nameOrEdge;

    edgeData = graph._edges.get(nameOrEdge);

    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nameOrEdge}" edge in the graph.`
      );

    const source = edgeData.source.key;
    const target = edgeData.target.key;

    if (nodeOrEdge === source) {
      nodeData = edgeData.target;
    } else if (nodeOrEdge === target) {
      nodeData = edgeData.source;
    } else {
      throw new NotFoundGraphError(
        `Graph.${method}: the "${nodeOrEdge}" node is not attached to the "${nameOrEdge}" edge (${source}, ${target}).`
      );
    }

    arg1 = add1;
    arg2 = add2;
  } else {
    edgeData = graph._edges.get(nodeOrEdge);

    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nodeOrEdge}" edge in the graph.`
      );

    if (mode === SOURCE) {
      nodeData = edgeData.source;
    } else {
      nodeData = edgeData.target;
    }

    arg1 = nameOrEdge;
    arg2 = add1;
  }

  return [nodeData, arg1, arg2];
}

function attachNodeAttributeGetter(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );

    return data.attributes[name];
  };
}

function attachNodeAttributesGetter(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge) {
    const [data] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge
    );

    return data.attributes;
  };
}

function attachNodeAttributeChecker(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );

    return data.attributes.hasOwnProperty(name);
  };
}

function attachNodeAttributeSetter(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge, add1, add2) {
    const [data, name, value] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1,
      add2
    );

    data.attributes[name] = value;

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: data.key,
      type: 'set',
      attributes: data.attributes,
      name
    });

    return this;
  };
}

function attachNodeAttributeUpdater(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge, add1, add2) {
    const [data, name, updater] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1,
      add2
    );

    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: updater should be a function.`
      );

    const attributes = data.attributes;
    const value = updater(attributes[name]);

    attributes[name] = value;

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: data.key,
      type: 'set',
      attributes: data.attributes,
      name
    });

    return this;
  };
}

function attachNodeAttributeRemover(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );

    delete data.attributes[name];

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: data.key,
      type: 'remove',
      attributes: data.attributes,
      name
    });

    return this;
  };
}

function attachNodeAttributesReplacer(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge, add1) {
    const [data, attributes] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );

    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );

    data.attributes = attributes;

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: data.key,
      type: 'replace',
      attributes: data.attributes
    });

    return this;
  };
}

function attachNodeAttributesMerger(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge, add1) {
    const [data, attributes] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );

    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );

    assign(data.attributes, attributes);

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: data.key,
      type: 'merge',
      attributes: data.attributes,
      data: attributes
    });

    return this;
  };
}

function attachNodeAttributesUpdater(Class, method, mode) {
  Class.prototype[method] = function (nodeOrEdge, nameOrEdge, add1) {
    const [data, updater] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );

    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided updater is not a function.`
      );

    data.attributes = updater(data.attributes);

    // Emitting
    this.emit('nodeAttributesUpdated', {
      key: data.key,
      type: 'update',
      attributes: data.attributes
    });

    return this;
  };
}

/**
 * List of methods to attach.
 */
const NODE_ATTRIBUTES_METHODS = [
  {
    name: element => `get${element}Attribute`,
    attacher: attachNodeAttributeGetter
  },
  {
    name: element => `get${element}Attributes`,
    attacher: attachNodeAttributesGetter
  },
  {
    name: element => `has${element}Attribute`,
    attacher: attachNodeAttributeChecker
  },
  {
    name: element => `set${element}Attribute`,
    attacher: attachNodeAttributeSetter
  },
  {
    name: element => `update${element}Attribute`,
    attacher: attachNodeAttributeUpdater
  },
  {
    name: element => `remove${element}Attribute`,
    attacher: attachNodeAttributeRemover
  },
  {
    name: element => `replace${element}Attributes`,
    attacher: attachNodeAttributesReplacer
  },
  {
    name: element => `merge${element}Attributes`,
    attacher: attachNodeAttributesMerger
  },
  {
    name: element => `update${element}Attributes`,
    attacher: attachNodeAttributesUpdater
  }
];

/**
 * Attach every attributes-related methods to a Graph class.
 *
 * @param {function} Graph - Target class.
 */
function attachNodeAttributesMethods(Graph) {
  NODE_ATTRIBUTES_METHODS.forEach(function ({name, attacher}) {
    // For nodes
    attacher(Graph, name('Node'), NODE);

    // For sources
    attacher(Graph, name('Source'), SOURCE);

    // For targets
    attacher(Graph, name('Target'), TARGET);

    // For opposites
    attacher(Graph, name('Opposite'), OPPOSITE);
  });
}

/**
 * Graphology Edge Attributes methods
 * ===================================
 */

/**
 * Attach an attribute getter method onto the provided class.
 *
 * @param {function} Class         - Target class.
 * @param {string}   method        - Method name.
 * @param {string}   type          - Type of the edge to find.
 */
function attachEdgeAttributeGetter(Class, method, type) {
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
  Class.prototype[method] = function (element, name) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element;
      const target = '' + name;

      name = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

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
function attachEdgeAttributesGetter(Class, method, type) {
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
  Class.prototype[method] = function (element) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 1) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element,
        target = '' + arguments[1];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

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
function attachEdgeAttributeChecker(Class, method, type) {
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
  Class.prototype[method] = function (element, name) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element;
      const target = '' + name;

      name = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

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
function attachEdgeAttributeSetter(Class, method, type) {
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
  Class.prototype[method] = function (element, name, value) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 3) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element;
      const target = '' + name;

      name = arguments[2];
      value = arguments[3];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

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
function attachEdgeAttributeUpdater(Class, method, type) {
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
  Class.prototype[method] = function (element, name, updater) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 3) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element;
      const target = '' + name;

      name = arguments[2];
      updater = arguments[3];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: updater should be a function.`
      );

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
function attachEdgeAttributeRemover(Class, method, type) {
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
  Class.prototype[method] = function (element, name) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element;
      const target = '' + name;

      name = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

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
function attachEdgeAttributesReplacer(Class, method, type) {
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
  Class.prototype[method] = function (element, attributes) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element,
        target = '' + attributes;

      attributes = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );

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
function attachEdgeAttributesMerger(Class, method, type) {
  /**
   * Merge the attributes for the given element (node or edge).
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
  Class.prototype[method] = function (element, attributes) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element,
        target = '' + attributes;

      attributes = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );

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
 * Attach an attribute updater method onto the provided class.
 *
 * @param {function} Class         - Target class.
 * @param {string}   method        - Method name.
 * @param {string}   type          - Type of the edge to find.
 */
function attachEdgeAttributesUpdater(Class, method, type) {
  /**
   * Update the attributes of the given element (node or edge).
   *
   * Arity 2:
   * @param  {any}      element - Target element.
   * @param  {function} updater - Updater function.
   *
   * Arity 3 (only for edges):
   * @param  {any}      source  - Source element.
   * @param  {any}      target  - Target element.
   * @param  {function} updater - Updater function.
   *
   * @return {Graph}            - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if too many arguments are provided.
   * @throws {Error} - Will throw if any of the elements is not found.
   */
  Class.prototype[method] = function (element, updater) {
    let data;

    if (this.type !== 'mixed' && type !== 'mixed' && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );

    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );

      const source = '' + element,
        target = '' + updater;

      updater = arguments[2];

      data = getMatchingEdge(this, source, target, type);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== 'mixed')
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );

      element = '' + element;
      data = this._edges.get(element);

      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }

    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided updater is not a function.`
      );

    data.attributes = updater(data.attributes);

    // Emitting
    this.emit('edgeAttributesUpdated', {
      key: data.key,
      type: 'update',
      attributes: data.attributes
    });

    return this;
  };
}

/**
 * List of methods to attach.
 */
const EDGE_ATTRIBUTES_METHODS = [
  {
    name: element => `get${element}Attribute`,
    attacher: attachEdgeAttributeGetter
  },
  {
    name: element => `get${element}Attributes`,
    attacher: attachEdgeAttributesGetter
  },
  {
    name: element => `has${element}Attribute`,
    attacher: attachEdgeAttributeChecker
  },
  {
    name: element => `set${element}Attribute`,
    attacher: attachEdgeAttributeSetter
  },
  {
    name: element => `update${element}Attribute`,
    attacher: attachEdgeAttributeUpdater
  },
  {
    name: element => `remove${element}Attribute`,
    attacher: attachEdgeAttributeRemover
  },
  {
    name: element => `replace${element}Attributes`,
    attacher: attachEdgeAttributesReplacer
  },
  {
    name: element => `merge${element}Attributes`,
    attacher: attachEdgeAttributesMerger
  },
  {
    name: element => `update${element}Attributes`,
    attacher: attachEdgeAttributesUpdater
  }
];

/**
 * Attach every attributes-related methods to a Graph class.
 *
 * @param {function} Graph - Target class.
 */
function attachEdgeAttributesMethods(Graph) {
  EDGE_ATTRIBUTES_METHODS.forEach(function ({name, attacher}) {
    // For edges
    attacher(Graph, name('Edge'), 'mixed');

    // For directed edges
    attacher(Graph, name('DirectedEdge'), 'directed');

    // For undirected edges
    attacher(Graph, name('UndirectedEdge'), 'undirected');
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
 * Function iterating over edges from the given object to match one of them.
 *
 * @param {object}   object   - Target object.
 * @param {function} callback - Function to call.
 */
function forEachSimple(breakable, object, callback, avoid) {
  let shouldBreak = false;

  for (const k in object) {
    if (k === avoid) continue;

    const edgeData = object[k];

    shouldBreak = callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected
    );

    if (breakable && shouldBreak) return edgeData.key;
  }

  return;
}

function forEachMulti(breakable, object, callback, avoid) {
  let edgeData, source, target;

  let shouldBreak = false;

  for (const k in object) {
    if (k === avoid) continue;

    edgeData = object[k];

    do {
      source = edgeData.source;
      target = edgeData.target;

      shouldBreak = callback(
        edgeData.key,
        edgeData.attributes,
        source.key,
        target.key,
        source.attributes,
        target.attributes,
        edgeData.undirected
      );

      if (breakable && shouldBreak) return edgeData.key;

      edgeData = edgeData.next;
    } while (edgeData !== undefined);
  }

  return;
}

/**
 * Function returning an iterator over edges from the given object.
 *
 * @param  {object}   object - Target object.
 * @return {Iterator}
 */
function createIterator(object, avoid) {
  const keys = Object.keys(object);
  const l = keys.length;

  let edgeData;
  let i = 0;

  return new Iterator(function next() {
    do {
      if (!edgeData) {
        if (i >= l) return {done: true};

        const k = keys[i++];

        if (k === avoid) {
          edgeData = undefined;
          continue;
        }

        edgeData = object[k];
      } else {
        edgeData = edgeData.next;
      }
    } while (!edgeData);

    return {
      done: false,
      value: {
        edge: edgeData.key,
        attributes: edgeData.attributes,
        source: edgeData.source.key,
        target: edgeData.target.key,
        sourceAttributes: edgeData.source.attributes,
        targetAttributes: edgeData.target.attributes,
        undirected: edgeData.undirected
      }
    };
  });
}

/**
 * Function iterating over the egdes from the object at given key to match
 * one of them.
 *
 * @param {object}   object   - Target object.
 * @param {mixed}    k        - Neighbor key.
 * @param {function} callback - Callback to use.
 */
function forEachForKeySimple(breakable, object, k, callback) {
  const edgeData = object[k];

  if (!edgeData) return;

  const sourceData = edgeData.source;
  const targetData = edgeData.target;

  if (
    callback(
      edgeData.key,
      edgeData.attributes,
      sourceData.key,
      targetData.key,
      sourceData.attributes,
      targetData.attributes,
      edgeData.undirected
    ) &&
    breakable
  )
    return edgeData.key;
}

function forEachForKeyMulti(breakable, object, k, callback) {
  let edgeData = object[k];

  if (!edgeData) return;

  let shouldBreak = false;

  do {
    shouldBreak = callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected
    );

    if (breakable && shouldBreak) return edgeData.key;

    edgeData = edgeData.next;
  } while (edgeData !== undefined);

  return;
}

/**
 * Function returning an iterator over the egdes from the object at given key.
 *
 * @param  {object}   object   - Target object.
 * @param  {mixed}    k        - Neighbor key.
 * @return {Iterator}
 */
function createIteratorForKey(object, k) {
  let edgeData = object[k];

  if (edgeData.next !== undefined) {
    return new Iterator(function () {
      if (!edgeData) return {done: true};

      const value = {
        edge: edgeData.key,
        attributes: edgeData.attributes,
        source: edgeData.source.key,
        target: edgeData.target.key,
        sourceAttributes: edgeData.source.attributes,
        targetAttributes: edgeData.target.attributes,
        undirected: edgeData.undirected
      };

      edgeData = edgeData.next;

      return {
        done: false,
        value
      };
    });
  }

  return Iterator.of({
    edge: edgeData.key,
    attributes: edgeData.attributes,
    source: edgeData.source.key,
    target: edgeData.target.key,
    sourceAttributes: edgeData.source.attributes,
    targetAttributes: edgeData.target.attributes,
    undirected: edgeData.undirected
  });
}

/**
 * Function creating an array of edges for the given type.
 *
 * @param  {Graph}   graph - Target Graph instance.
 * @param  {string}  type  - Type of edges to retrieve.
 * @return {array}         - Array of edges.
 */
function createEdgeArray(graph, type) {
  if (graph.size === 0) return [];

  if (type === 'mixed' || type === graph.type) {
    if (typeof Array.from === 'function')
      return Array.from(graph._edges.keys());

    return take(graph._edges.keys(), graph._edges.size);
  }

  const size =
    type === 'undirected' ? graph.undirectedSize : graph.directedSize;

  const list = new Array(size),
    mask = type === 'undirected';

  const iterator = graph._edges.values();

  let i = 0;
  let step, data;

  while (((step = iterator.next()), step.done !== true)) {
    data = step.value;

    if (data.undirected === mask) list[i++] = data.key;
  }

  return list;
}

/**
 * Function iterating over a graph's edges using a callback to match one of
 * them.
 *
 * @param  {Graph}    graph    - Target Graph instance.
 * @param  {string}   type     - Type of edges to retrieve.
 * @param  {function} callback - Function to call.
 */
function forEachEdge(breakable, graph, type, callback) {
  if (graph.size === 0) return;

  const shouldFilter = type !== 'mixed' && type !== graph.type;
  const mask = type === 'undirected';

  let step, data;
  let shouldBreak = false;
  const iterator = graph._edges.values();

  while (((step = iterator.next()), step.done !== true)) {
    data = step.value;

    if (shouldFilter && data.undirected !== mask) continue;

    const {key, attributes, source, target} = data;

    shouldBreak = callback(
      key,
      attributes,
      source.key,
      target.key,
      source.attributes,
      target.attributes,
      data.undirected
    );

    if (breakable && shouldBreak) return key;
  }

  return;
}

/**
 * Function creating an iterator of edges for the given type.
 *
 * @param  {Graph}    graph - Target Graph instance.
 * @param  {string}   type  - Type of edges to retrieve.
 * @return {Iterator}
 */
function createEdgeIterator(graph, type) {
  if (graph.size === 0) return Iterator.empty();

  const shouldFilter = type !== 'mixed' && type !== graph.type;
  const mask = type === 'undirected';

  const iterator = graph._edges.values();

  return new Iterator(function next() {
    let step, data;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      step = iterator.next();

      if (step.done) return step;

      data = step.value;

      if (shouldFilter && data.undirected !== mask) continue;

      break;
    }

    const value = {
      edge: data.key,
      attributes: data.attributes,
      source: data.source.key,
      target: data.target.key,
      sourceAttributes: data.source.attributes,
      targetAttributes: data.target.attributes,
      undirected: data.undirected
    };

    return {value, done: false};
  });
}

/**
 * Function iterating over a node's edges using a callback to match one of them.
 *
 * @param  {boolean}  multi     - Whether the graph is multi or not.
 * @param  {string}   type      - Type of edges to retrieve.
 * @param  {string}   direction - In or out?
 * @param  {any}      nodeData  - Target node's data.
 * @param  {function} callback  - Function to call.
 */
function forEachEdgeForNode(
  breakable,
  multi,
  type,
  direction,
  nodeData,
  callback
) {
  const fn = multi ? forEachMulti : forEachSimple;

  let found;

  if (type !== 'undirected') {
    if (direction !== 'out') {
      found = fn(breakable, nodeData.in, callback);

      if (breakable && found) return found;
    }
    if (direction !== 'in') {
      found = fn(
        breakable,
        nodeData.out,
        callback,
        !direction ? nodeData.key : undefined
      );

      if (breakable && found) return found;
    }
  }

  if (type !== 'directed') {
    found = fn(breakable, nodeData.undirected, callback);

    if (breakable && found) return found;
  }

  return;
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
  const edges = []; // TODO: possibility to know size beforehand or factorize with map

  forEachEdgeForNode(false, multi, type, direction, nodeData, function (key) {
    edges.push(key);
  });

  return edges;
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
      iterator = chain(
        iterator,
        createIterator(nodeData.out, !direction ? nodeData.key : undefined)
      );
  }

  if (type !== 'directed' && typeof nodeData.undirected !== 'undefined') {
    iterator = chain(iterator, createIterator(nodeData.undirected));
  }

  return iterator;
}

/**
 * Function iterating over edges for the given path using a callback to match
 * one of them.
 *
 * @param  {string}   type       - Type of edges to retrieve.
 * @param  {boolean}  multi      - Whether the graph is multi.
 * @param  {string}   direction  - In or out?
 * @param  {NodeData} sourceData - Source node's data.
 * @param  {string}   target     - Target node.
 * @param  {function} callback   - Function to call.
 */
function forEachEdgeForPath(
  breakable,
  type,
  multi,
  direction,
  sourceData,
  target,
  callback
) {
  const fn = multi ? forEachForKeyMulti : forEachForKeySimple;

  let found;

  if (type !== 'undirected') {
    if (typeof sourceData.in !== 'undefined' && direction !== 'out') {
      found = fn(breakable, sourceData.in, target, callback);

      if (breakable && found) return found;
    }

    if (
      typeof sourceData.out !== 'undefined' &&
      direction !== 'in' &&
      (direction || sourceData.key !== target)
    ) {
      found = fn(breakable, sourceData.out, target, callback);

      if (breakable && found) return found;
    }
  }

  if (type !== 'directed') {
    if (typeof sourceData.undirected !== 'undefined') {
      found = fn(breakable, sourceData.undirected, target, callback);

      if (breakable && found) return found;
    }
  }

  return;
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
  const edges = []; // TODO: possibility to know size beforehand or factorize with map

  forEachEdgeForPath(
    false,
    type,
    multi,
    direction,
    sourceData,
    target,
    function (key) {
      edges.push(key);
    }
  );

  return edges;
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
      target in sourceData.out &&
      (direction || sourceData.key !== target)
    )
      iterator = chain(iterator, createIteratorForKey(sourceData.out, target));
  }

  if (type !== 'directed') {
    if (
      typeof sourceData.undirected !== 'undefined' &&
      target in sourceData.undirected
    )
      iterator = chain(
        iterator,
        createIteratorForKey(sourceData.undirected, target)
      );
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
  const {name, type, direction} = description;

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
  Class.prototype[name] = function (source, target) {
    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return [];

    if (!arguments.length) return createEdgeArray(this, type);

    if (arguments.length === 1) {
      source = '' + source;

      const nodeData = this._nodes.get(source);

      if (typeof nodeData === 'undefined')
        throw new NotFoundGraphError(
          `Graph.${name}: could not find the "${source}" node in the graph.`
        );

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
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${source}" source node in the graph.`
        );

      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${target}" target node in the graph.`
        );

      // Iterating over the edges between source & target
      return createEdgeArrayForPath(
        type,
        this.multi,
        direction,
        sourceData,
        target
      );
    }

    throw new InvalidArgumentsGraphError(
      `Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}

/**
 * Function attaching a edge callback iterator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachForEachEdge(Class, description) {
  const {name, type, direction} = description;

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
  Class.prototype[forEachName] = function (source, target, callback) {
    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type) return;

    if (arguments.length === 1) {
      callback = source;
      return forEachEdge(false, this, type, callback);
    }

    if (arguments.length === 2) {
      source = '' + source;
      callback = target;

      const nodeData = this._nodes.get(source);

      if (typeof nodeData === 'undefined')
        throw new NotFoundGraphError(
          `Graph.${forEachName}: could not find the "${source}" node in the graph.`
        );

      // Iterating over a node's edges
      // TODO: maybe attach the sub method to the instance dynamically?
      return forEachEdgeForNode(
        false,
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
        throw new NotFoundGraphError(
          `Graph.${forEachName}:  could not find the "${source}" source node in the graph.`
        );

      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${forEachName}:  could not find the "${target}" target node in the graph.`
        );

      // Iterating over the edges between source & target
      return forEachEdgeForPath(
        false,
        type,
        this.multi,
        direction,
        sourceData,
        target,
        callback
      );
    }

    throw new InvalidArgumentsGraphError(
      `Graph.${forEachName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
    );
  };

  /**
   * Function mapping the graph's relevant edges by applying the given
   * callback.
   *
   * Arity 1: Map all the relevant edges.
   * @param  {function} callback - Callback to use.
   *
   * Arity 2: Map all of a node's relevant edges.
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   *
   * Arity 3: Map the relevant edges across the given path.
   * @param  {any}      source   - Source node.
   * @param  {any}      target   - Target node.
   * @param  {function} callback - Callback to use.
   *
   * @return {undefined}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  const mapName = 'map' + name[0].toUpperCase() + name.slice(1);

  Class.prototype[mapName] = function () {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();

    let result;

    // We know the result length beforehand
    if (args.length === 0) {
      let length = 0;

      if (type !== 'directed') length += this.undirectedSize;
      if (type !== 'undirected') length += this.directedSize;

      result = new Array(length);

      let i = 0;

      args.push((e, ea, s, t, sa, ta, u) => {
        result[i++] = callback(e, ea, s, t, sa, ta, u);
      });
    }

    // We don't know the result length beforehand
    // TODO: we can in some instances of simple graphs, knowing degree
    else {
      result = [];

      args.push((e, ea, s, t, sa, ta, u) => {
        result.push(callback(e, ea, s, t, sa, ta, u));
      });
    }

    this[forEachName].apply(this, args);

    return result;
  };

  /**
   * Function filtering the graph's relevant edges using the provided predicate
   * function.
   *
   * Arity 1: Filter all the relevant edges.
   * @param  {function} predicate - Predicate to use.
   *
   * Arity 2: Filter all of a node's relevant edges.
   * @param  {any}      node      - Target node.
   * @param  {function} predicate - Predicate to use.
   *
   * Arity 3: Filter the relevant edges across the given path.
   * @param  {any}      source    - Source node.
   * @param  {any}      target    - Target node.
   * @param  {function} predicate - Predicate to use.
   *
   * @return {undefined}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  const filterName = 'filter' + name[0].toUpperCase() + name.slice(1);

  Class.prototype[filterName] = function () {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();

    const result = [];

    args.push((e, ea, s, t, sa, ta, u) => {
      if (callback(e, ea, s, t, sa, ta, u)) result.push(e);
    });

    this[forEachName].apply(this, args);

    return result;
  };

  /**
   * Function reducing the graph's relevant edges using the provided accumulator
   * function.
   *
   * Arity 1: Reduce all the relevant edges.
   * @param  {function} accumulator  - Accumulator to use.
   * @param  {any}      initialValue - Initial value.
   *
   * Arity 2: Reduce all of a node's relevant edges.
   * @param  {any}      node         - Target node.
   * @param  {function} accumulator  - Accumulator to use.
   * @param  {any}      initialValue - Initial value.
   *
   * Arity 3: Reduce the relevant edges across the given path.
   * @param  {any}      source       - Source node.
   * @param  {any}      target       - Target node.
   * @param  {function} accumulator  - Accumulator to use.
   * @param  {any}      initialValue - Initial value.
   *
   * @return {undefined}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  const reduceName = 'reduce' + name[0].toUpperCase() + name.slice(1);

  Class.prototype[reduceName] = function () {
    let args = Array.prototype.slice.call(arguments);

    if (args.length < 2 || args.length > 4) {
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: invalid number of arguments (expecting 2, 3 or 4 and got ${args.length}).`
      );
    }

    if (
      typeof args[args.length - 1] === 'function' &&
      typeof args[args.length - 2] !== 'function'
    ) {
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    }

    let callback;
    let initialValue;

    if (args.length === 2) {
      callback = args[0];
      initialValue = args[1];
      args = [];
    } else if (args.length === 3) {
      callback = args[1];
      initialValue = args[2];
      args = [args[0]];
    } else if (args.length === 4) {
      callback = args[2];
      initialValue = args[3];
      args = [args[0], args[1]];
    }

    let accumulator = initialValue;

    args.push((e, ea, s, t, sa, ta, u) => {
      accumulator = callback(accumulator, e, ea, s, t, sa, ta, u);
    });

    this[forEachName].apply(this, args);

    return accumulator;
  };
}

/**
 * Function attaching a breakable edge callback iterator method to the Graph
 * prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachFindEdge(Class, description) {
  const {name, type, direction} = description;

  const findEdgeName = 'find' + name[0].toUpperCase() + name.slice(1, -1);

  /**
   * Function iterating over the graph's relevant edges in order to match
   * one of them using the provided predicate function.
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
  Class.prototype[findEdgeName] = function (source, target, callback) {
    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return false;

    if (arguments.length === 1) {
      callback = source;
      return forEachEdge(true, this, type, callback);
    }

    if (arguments.length === 2) {
      source = '' + source;
      callback = target;

      const nodeData = this._nodes.get(source);

      if (typeof nodeData === 'undefined')
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}: could not find the "${source}" node in the graph.`
        );

      // Iterating over a node's edges
      // TODO: maybe attach the sub method to the instance dynamically?
      return forEachEdgeForNode(
        true,
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
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}:  could not find the "${source}" source node in the graph.`
        );

      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}:  could not find the "${target}" target node in the graph.`
        );

      // Iterating over the edges between source & target
      return forEachEdgeForPath(
        true,
        type,
        this.multi,
        direction,
        sourceData,
        target,
        callback
      );
    }

    throw new InvalidArgumentsGraphError(
      `Graph.${findEdgeName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
    );
  };

  /**
   * Function iterating over the graph's relevant edges in order to assert
   * whether any one of them matches the provided predicate function.
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
  const someName = 'some' + name[0].toUpperCase() + name.slice(1, -1);

  Class.prototype[someName] = function () {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();

    args.push((e, ea, s, t, sa, ta, u) => {
      return callback(e, ea, s, t, sa, ta, u);
    });

    const found = this[findEdgeName].apply(this, args);

    if (found) return true;

    return false;
  };

  /**
   * Function iterating over the graph's relevant edges in order to assert
   * whether all of them matche the provided predicate function.
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
  const everyName = 'every' + name[0].toUpperCase() + name.slice(1, -1);

  Class.prototype[everyName] = function () {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();

    args.push((e, ea, s, t, sa, ta, u) => {
      return !callback(e, ea, s, t, sa, ta, u);
    });

    const found = this[findEdgeName].apply(this, args);

    if (found) return false;

    return true;
  };
}

/**
 * Function attaching an edge iterator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachEdgeIteratorCreator(Class, description) {
  const {name: originalName, type, direction} = description;

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
  Class.prototype[name] = function (source, target) {
    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return Iterator.empty();

    if (!arguments.length) return createEdgeIterator(this, type);

    if (arguments.length === 1) {
      source = '' + source;

      const sourceData = this._nodes.get(source);

      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${name}: could not find the "${source}" node in the graph.`
        );

      // Iterating over a node's edges
      return createEdgeIteratorForNode(type, direction, sourceData);
    }

    if (arguments.length === 2) {
      source = '' + source;
      target = '' + target;

      const sourceData = this._nodes.get(source);

      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${source}" source node in the graph.`
        );

      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${target}" target node in the graph.`
        );

      // Iterating over the edges between source & target
      return createEdgeIteratorForPath(type, direction, sourceData, target);
    }

    throw new InvalidArgumentsGraphError(
      `Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
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
    attachFindEdge(Graph, description);
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
 * Helpers.
 */
function CompositeSetWrapper() {
  this.A = null;
  this.B = null;
}

CompositeSetWrapper.prototype.wrap = function (set) {
  if (this.A === null) this.A = set;
  else if (this.B === null) this.B = set;
};

CompositeSetWrapper.prototype.has = function (key) {
  if (this.A !== null && key in this.A) return true;
  if (this.B !== null && key in this.B) return true;
  return false;
};

/**
 * Function iterating over the given node's relevant neighbors to match
 * one of them using a predicated function.
 *
 * @param  {string}   type      - Type of neighbors.
 * @param  {string}   direction - Direction.
 * @param  {any}      nodeData  - Target node's data.
 * @param  {function} callback  - Callback to use.
 */
function forEachInObjectOnce(breakable, visited, nodeData, object, callback) {
  for (const k in object) {
    const edgeData = object[k];

    const sourceData = edgeData.source;
    const targetData = edgeData.target;

    const neighborData = sourceData === nodeData ? targetData : sourceData;

    if (visited && visited.has(neighborData.key)) continue;

    const shouldBreak = callback(neighborData.key, neighborData.attributes);

    if (breakable && shouldBreak) return neighborData.key;
  }

  return;
}

function forEachNeighbor(breakable, type, direction, nodeData, callback) {
  // If we want only undirected or in or out, we can roll some optimizations
  if (type !== 'mixed') {
    if (type === 'undirected')
      return forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData.undirected,
        callback
      );

    if (typeof direction === 'string')
      return forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData[direction],
        callback
      );
  }

  // Else we need to keep a set of neighbors not to return duplicates
  // We cheat by querying the other adjacencies
  const visited = new CompositeSetWrapper();

  let found;

  if (type !== 'undirected') {
    if (direction !== 'out') {
      found = forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData.in,
        callback
      );

      if (breakable && found) return found;

      visited.wrap(nodeData.in);
    }
    if (direction !== 'in') {
      found = forEachInObjectOnce(
        breakable,
        visited,
        nodeData,
        nodeData.out,
        callback
      );

      if (breakable && found) return found;

      visited.wrap(nodeData.out);
    }
  }

  if (type !== 'directed') {
    found = forEachInObjectOnce(
      breakable,
      visited,
      nodeData,
      nodeData.undirected,
      callback
    );

    if (breakable && found) return found;
  }

  return;
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
    if (type === 'undirected') return Object.keys(nodeData.undirected);

    if (typeof direction === 'string') return Object.keys(nodeData[direction]);
  }

  const neighbors = [];

  forEachNeighbor(false, type, direction, nodeData, function (key) {
    neighbors.push(key);
  });

  return neighbors;
}

/**
 * Function returning an iterator over the given node's relevant neighbors.
 *
 * @param  {string}   type      - Type of neighbors.
 * @param  {string}   direction - Direction.
 * @param  {any}      nodeData  - Target node's data.
 * @return {Iterator}
 */
function createDedupedObjectIterator(visited, nodeData, object) {
  const keys = Object.keys(object);
  const l = keys.length;

  let i = 0;

  return new Iterator(function next() {
    let neighborData = null;

    do {
      if (i >= l) {
        if (visited) visited.wrap(object);
        return {done: true};
      }

      const edgeData = object[keys[i++]];

      const sourceData = edgeData.source;
      const targetData = edgeData.target;

      neighborData = sourceData === nodeData ? targetData : sourceData;

      if (visited && visited.has(neighborData.key)) {
        neighborData = null;
        continue;
      }
    } while (neighborData === null);

    return {
      done: false,
      value: {neighbor: neighborData.key, attributes: neighborData.attributes}
    };
  });
}

function createNeighborIterator(type, direction, nodeData) {
  // If we want only undirected or in or out, we can roll some optimizations
  if (type !== 'mixed') {
    if (type === 'undirected')
      return createDedupedObjectIterator(null, nodeData, nodeData.undirected);

    if (typeof direction === 'string')
      return createDedupedObjectIterator(null, nodeData, nodeData[direction]);
  }

  let iterator = Iterator.empty();

  // Else we need to keep a set of neighbors not to return duplicates
  // We cheat by querying the other adjacencies
  const visited = new CompositeSetWrapper();

  if (type !== 'undirected') {
    if (direction !== 'out') {
      iterator = chain(
        iterator,
        createDedupedObjectIterator(visited, nodeData, nodeData.in)
      );
    }
    if (direction !== 'in') {
      iterator = chain(
        iterator,
        createDedupedObjectIterator(visited, nodeData, nodeData.out)
      );
    }
  }

  if (type !== 'directed') {
    iterator = chain(
      iterator,
      createDedupedObjectIterator(visited, nodeData, nodeData.undirected)
    );
  }

  return iterator;
}

/**
 * Function attaching a neighbors array creator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachNeighborArrayCreator(Class, description) {
  const {name, type, direction} = description;

  /**
   * Function returning an array of certain neighbors.
   *
   * @param  {any}   node   - Target node.
   * @return {array} - The neighbors of neighbors.
   *
   * @throws {Error} - Will throw if node is not found in the graph.
   */
  Class.prototype[name] = function (node) {
    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return [];

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (typeof nodeData === 'undefined')
      throw new NotFoundGraphError(
        `Graph.${name}: could not find the "${node}" node in the graph.`
      );

    // Here, we want to iterate over a node's relevant neighbors
    return createNeighborArrayForNode(
      type === 'mixed' ? this.type : type,
      direction,
      nodeData
    );
  };
}

/**
 * Function attaching a neighbors callback iterator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachForEachNeighbor(Class, description) {
  const {name, type, direction} = description;

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
  Class.prototype[forEachName] = function (node, callback) {
    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type) return;

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (typeof nodeData === 'undefined')
      throw new NotFoundGraphError(
        `Graph.${forEachName}: could not find the "${node}" node in the graph.`
      );

    // Here, we want to iterate over a node's relevant neighbors
    forEachNeighbor(
      false,
      type === 'mixed' ? this.type : type,
      direction,
      nodeData,
      callback
    );
  };

  /**
   * Function mapping the relevant neighbors using a callback.
   *
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  const mapName = 'map' + name[0].toUpperCase() + name.slice(1);

  Class.prototype[mapName] = function (node, callback) {
    // TODO: optimize when size is known beforehand
    const result = [];

    this[forEachName](node, (n, a) => {
      result.push(callback(n, a));
    });

    return result;
  };

  /**
   * Function filtering the relevant neighbors using a callback.
   *
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  const filterName = 'filter' + name[0].toUpperCase() + name.slice(1);

  Class.prototype[filterName] = function (node, callback) {
    const result = [];

    this[forEachName](node, (n, a) => {
      if (callback(n, a)) result.push(n);
    });

    return result;
  };

  /**
   * Function reducing the relevant neighbors using a callback.
   *
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  const reduceName = 'reduce' + name[0].toUpperCase() + name.slice(1);

  Class.prototype[reduceName] = function (node, callback, initialValue) {
    if (arguments.length < 3)
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );

    let accumulator = initialValue;

    this[forEachName](node, (n, a) => {
      accumulator = callback(accumulator, n, a);
    });

    return accumulator;
  };
}

/**
 * Function attaching a breakable neighbors callback iterator method to the
 * Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachFindNeighbor(Class, description) {
  const {name, type, direction} = description;

  const capitalizedSingular = name[0].toUpperCase() + name.slice(1, -1);

  const findName = 'find' + capitalizedSingular;

  /**
   * Function iterating over all the relevant neighbors using a callback.
   *
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   * @return {undefined}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[findName] = function (node, callback) {
    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type) return;

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (typeof nodeData === 'undefined')
      throw new NotFoundGraphError(
        `Graph.${findName}: could not find the "${node}" node in the graph.`
      );

    // Here, we want to iterate over a node's relevant neighbors
    return forEachNeighbor(
      true,
      type === 'mixed' ? this.type : type,
      direction,
      nodeData,
      callback
    );
  };

  /**
   * Function iterating over all the relevant neighbors to find if any of them
   * matches the given predicate.
   *
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  const someName = 'some' + capitalizedSingular;

  Class.prototype[someName] = function (node, callback) {
    const found = this[findName](node, callback);

    if (found) return true;

    return false;
  };

  /**
   * Function iterating over all the relevant neighbors to find if all of them
   * matche the given predicate.
   *
   * @param  {any}      node     - Target node.
   * @param  {function} callback - Callback to use.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  const everyName = 'every' + capitalizedSingular;

  Class.prototype[everyName] = function (node, callback) {
    const found = this[findName](node, (n, a) => {
      return !callback(n, a);
    });

    if (found) return false;

    return true;
  };
}

/**
 * Function attaching a neighbors callback iterator method to the Graph prototype.
 *
 * @param {function} Class       - Target class.
 * @param {object}   description - Method description.
 */
function attachNeighborIteratorCreator(Class, description) {
  const {name, type, direction} = description;

  const iteratorName = name.slice(0, -1) + 'Entries';

  /**
   * Function returning an iterator over all the relevant neighbors.
   *
   * @param  {any}      node     - Target node.
   * @return {Iterator}
   *
   * @throws {Error} - Will throw if there are too many arguments.
   */
  Class.prototype[iteratorName] = function (node) {
    // Early termination
    if (type !== 'mixed' && this.type !== 'mixed' && type !== this.type)
      return Iterator.empty();

    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (typeof nodeData === 'undefined')
      throw new NotFoundGraphError(
        `Graph.${iteratorName}: could not find the "${node}" node in the graph.`
      );

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
    attachFindNeighbor(Graph, description);
    attachNeighborIteratorCreator(Graph, description);
  });
}

/**
 * Graphology Adjacency Iteration
 * ===============================
 *
 * Attaching some methods to the Graph class to be able to iterate over a
 * graph's adjacency.
 */

/**
 * Function iterating over a simple graph's adjacency using a callback.
 *
 * @param {boolean}  breakable         - Can we break?
 * @param {boolean}  assymetric        - Whether to emit undirected edges only once.
 * @param {boolean}  disconnectedNodes - Whether to emit disconnected nodes.
 * @param {Graph}    graph             - Target Graph instance.
 * @param {callback} function          - Iteration callback.
 */
function forEachAdjacency(
  breakable,
  assymetric,
  disconnectedNodes,
  graph,
  callback
) {
  const iterator = graph._nodes.values();

  const type = graph.type;

  let step, sourceData, neighbor, adj, edgeData, targetData, shouldBreak;

  while (((step = iterator.next()), step.done !== true)) {
    let hasEdges = false;

    sourceData = step.value;

    if (type !== 'undirected') {
      adj = sourceData.out;

      for (neighbor in adj) {
        edgeData = adj[neighbor];

        do {
          targetData = edgeData.target;

          hasEdges = true;
          shouldBreak = callback(
            sourceData.key,
            targetData.key,
            sourceData.attributes,
            targetData.attributes,
            edgeData.key,
            edgeData.attributes,
            edgeData.undirected
          );

          if (breakable && shouldBreak) return edgeData;

          edgeData = edgeData.next;
        } while (edgeData);
      }
    }

    if (type !== 'directed') {
      adj = sourceData.undirected;

      for (neighbor in adj) {
        if (assymetric && sourceData.key > neighbor) continue;

        edgeData = adj[neighbor];

        do {
          targetData = edgeData.target;

          if (targetData.key !== neighbor) targetData = edgeData.source;

          hasEdges = true;
          shouldBreak = callback(
            sourceData.key,
            targetData.key,
            sourceData.attributes,
            targetData.attributes,
            edgeData.key,
            edgeData.attributes,
            edgeData.undirected
          );

          if (breakable && shouldBreak) return edgeData;

          edgeData = edgeData.next;
        } while (edgeData);
      }
    }

    if (disconnectedNodes && !hasEdges) {
      shouldBreak = callback(
        sourceData.key,
        null,
        sourceData.attributes,
        null,
        null,
        null,
        null
      );

      if (breakable && shouldBreak) return null;
    }
  }

  return;
}

/**
 * Graphology Serialization Utilities
 * ===================================
 *
 * Collection of functions used by the graph serialization schemes.
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
 * @param  {string} type - The graph's type.
 * @param  {any}    key  - The edge's key.
 * @param  {object} data - Internal edge's data.
 * @return {array}       - The serialized edge.
 */
function serializeEdge(type, key, data) {
  const serialized = {
    key,
    source: data.source.key,
    target: data.target.key
  };

  if (!isEmpty(data.attributes))
    serialized.attributes = assign({}, data.attributes);

  if (type === 'mixed' && data.undirected) serialized.undirected = true;

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
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.'
    );

  if (!('key' in value))
    throw new InvalidArgumentsGraphError(
      'Graph.import: serialized node is missing its key.'
    );

  if (
    'attributes' in value &&
    (!isPlainObject(value.attributes) || value.attributes === null)
  )
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid attributes. Attributes should be a plain object, null or omitted.'
    );
}

/**
 * Checks whether the given value is a serialized edge.
 *
 * @param  {mixed} value - Target value.
 * @return {string|null}
 */
function validateSerializedEdge(value) {
  if (!isPlainObject(value))
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.'
    );

  if (!('source' in value))
    throw new InvalidArgumentsGraphError(
      'Graph.import: serialized edge is missing its source.'
    );

  if (!('target' in value))
    throw new InvalidArgumentsGraphError(
      'Graph.import: serialized edge is missing its target.'
    );

  if (
    'attributes' in value &&
    (!isPlainObject(value.attributes) || value.attributes === null)
  )
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid attributes. Attributes should be a plain object, null or omitted.'
    );

  if ('undirected' in value && typeof value.undirected !== 'boolean')
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid undirectedness information. Undirected should be boolean or omitted.'
    );
}

/* eslint no-nested-ternary: 0 */

/**
 * Constants.
 */
const INSTANCE_ID = incrementalIdStartingFromRandomByte();

/**
 * Enums.
 */
const TYPES = new Set(['directed', 'undirected', 'mixed']);

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
    name: verb => `${verb}EdgeWithKey`
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
    throw new InvalidArgumentsGraphError(
      `Graph.addNode: invalid attributes. Expecting an object but got "${attributes}"`
    );

  // String coercion
  node = '' + node;
  attributes = attributes || {};

  if (graph._nodes.has(node))
    throw new UsageGraphError(
      `Graph.addNode: the "${node}" node already exist in the graph.`
    );

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
    throw new UsageGraphError(
      `Graph.${name}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`
    );

  if (undirected && graph.type === 'directed')
    throw new UsageGraphError(
      `Graph.${name}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`
    );

  if (attributes && !isPlainObject(attributes))
    throw new InvalidArgumentsGraphError(
      `Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`
    );

  // Coercion of source & target:
  source = '' + source;
  target = '' + target;
  attributes = attributes || {};

  if (!graph.allowSelfLoops && source === target)
    throw new UsageGraphError(
      `Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );

  const sourceData = graph._nodes.get(source),
    targetData = graph._nodes.get(target);

  if (!sourceData)
    throw new NotFoundGraphError(
      `Graph.${name}: source node "${source}" not found.`
    );

  if (!targetData)
    throw new NotFoundGraphError(
      `Graph.${name}: target node "${target}" not found.`
    );

  // Must the graph generate an id for this edge?
  const eventData = {
    key: null,
    undirected,
    source,
    target,
    attributes
  };

  if (mustGenerateKey) {
    // NOTE: in this case we can guarantee that the key does not already
    // exist and is already correctly casted as a string
    edge = graph._edgeKeyGenerator();
  } else {
    // Coercion of edge key
    edge = '' + edge;

    // Here, we have a key collision
    if (graph._edges.has(edge))
      throw new UsageGraphError(
        `Graph.${name}: the "${edge}" edge already exists in the graph.`
      );
  }

  // Here, we might have a source / target collision
  if (
    !graph.multi &&
    (undirected
      ? typeof sourceData.undirected[target] !== 'undefined'
      : typeof sourceData.out[target] !== 'undefined')
  ) {
    throw new UsageGraphError(
      `Graph.${name}: an edge linking "${source}" to "${target}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`
    );
  }

  // Storing some data
  const edgeData = new EdgeData(
    undirected,
    edge,
    sourceData,
    targetData,
    attributes
  );

  // Adding the edge to the internal register
  graph._edges.set(edge, edgeData);

  // Incrementing node degree counters
  const isSelfLoop = source === target;

  if (undirected) {
    sourceData.undirectedDegree++;
    targetData.undirectedDegree++;

    if (isSelfLoop) {
      sourceData.undirectedLoops++;
      graph._undirectedSelfLoopCount++;
    }
  } else {
    sourceData.outDegree++;
    targetData.inDegree++;

    if (isSelfLoop) {
      sourceData.directedLoops++;
      graph._directedSelfLoopCount++;
    }
  }

  // Updating relevant index
  if (graph.multi) edgeData.attachMulti();
  else edgeData.attach();

  if (undirected) graph._undirectedSize++;
  else graph._directedSize++;

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
    throw new UsageGraphError(
      `Graph.${name}: you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead.`
    );

  if (undirected && graph.type === 'directed')
    throw new UsageGraphError(
      `Graph.${name}: you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead.`
    );

  if (attributes) {
    if (asUpdater) {
      if (typeof attributes !== 'function')
        throw new InvalidArgumentsGraphError(
          `Graph.${name}: invalid updater function. Expecting a function but got "${attributes}"`
        );
    } else {
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          `Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`
        );
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
    throw new UsageGraphError(
      `Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );

  let sourceData = graph._nodes.get(source);
  let targetData = graph._nodes.get(target);
  let edgeData;

  // Do we need to handle duplicate?
  let alreadyExistingEdgeData;

  if (!mustGenerateKey) {
    edgeData = graph._edges.get(edge);

    if (edgeData) {
      // Here, we need to ensure, if the user gave a key, that source & target
      // are consistent
      if (edgeData.source.key !== source || edgeData.target.key !== target) {
        // If source or target inconsistent
        if (
          !undirected ||
          edgeData.source.key !== target ||
          edgeData.target.key !== source
        ) {
          // If directed, or source/target aren't flipped
          throw new UsageGraphError(
            `Graph.${name}: inconsistency detected when attempting to merge the "${edge}" edge with "${source}" source & "${target}" target vs. ("${edgeData.source.key}", "${edgeData.target.key}").`
          );
        }
      }

      alreadyExistingEdgeData = edgeData;
    }
  }

  // Here, we might have a source / target collision
  if (!alreadyExistingEdgeData && !graph.multi && sourceData) {
    alreadyExistingEdgeData = undirected
      ? sourceData.undirected[target]
      : sourceData.out[target];
  }

  // Handling duplicates
  if (alreadyExistingEdgeData) {
    const info = [alreadyExistingEdgeData.key, false, false, false];

    // We can skip the attribute merging part if the user did not provide them
    if (asUpdater ? !updater : !attributes) return info;

    // Updating the attributes
    if (asUpdater) {
      const oldAttributes = alreadyExistingEdgeData.attributes;
      alreadyExistingEdgeData.attributes = updater(oldAttributes);

      graph.emit('edgeAttributesUpdated', {
        type: 'replace',
        key: alreadyExistingEdgeData.key,
        attributes: alreadyExistingEdgeData.attributes
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

    return info;
  }

  attributes = attributes || {};

  if (asUpdater && updater) attributes = updater(attributes);

  // Must the graph generate an id for this edge?
  const eventData = {
    key: null,
    undirected,
    source,
    target,
    attributes
  };

  if (mustGenerateKey) {
    // NOTE: in this case we can guarantee that the key does not already
    // exist and is already correctly casted as a string
    edge = graph._edgeKeyGenerator();
  } else {
    // Coercion of edge key
    edge = '' + edge;

    // Here, we have a key collision
    if (graph._edges.has(edge))
      throw new UsageGraphError(
        `Graph.${name}: the "${edge}" edge already exists in the graph.`
      );
  }

  let sourceWasAdded = false;
  let targetWasAdded = false;

  if (!sourceData) {
    sourceData = unsafeAddNode(graph, source, {});
    sourceWasAdded = true;

    if (source === target) {
      targetData = sourceData;
      targetWasAdded = true;
    }
  }
  if (!targetData) {
    targetData = unsafeAddNode(graph, target, {});
    targetWasAdded = true;
  }

  // Storing some data
  edgeData = new EdgeData(undirected, edge, sourceData, targetData, attributes);

  // Adding the edge to the internal register
  graph._edges.set(edge, edgeData);

  // Incrementing node degree counters
  const isSelfLoop = source === target;

  if (undirected) {
    sourceData.undirectedDegree++;
    targetData.undirectedDegree++;

    if (isSelfLoop) {
      sourceData.undirectedLoops++;
      graph._undirectedSelfLoopCount++;
    }
  } else {
    sourceData.outDegree++;
    targetData.inDegree++;

    if (isSelfLoop) {
      sourceData.directedLoops++;
      graph._directedSelfLoopCount++;
    }
  }

  // Updating relevant index
  if (graph.multi) edgeData.attachMulti();
  else edgeData.attach();

  if (undirected) graph._undirectedSize++;
  else graph._directedSize++;

  // Emitting
  eventData.key = edge;

  graph.emit('edgeAdded', eventData);

  return [edge, true, sourceWasAdded, targetWasAdded];
}

/**
 * Internal method used to drop an edge.
 *
 * @param  {Graph}    graph    - Target graph.
 * @param  {EdgeData} edgeData - Data of the edge to drop.
 */
function dropEdgeFromData(graph, edgeData) {
  // Dropping the edge from the register
  graph._edges.delete(edgeData.key);

  // Updating related degrees
  const {source: sourceData, target: targetData, attributes} = edgeData;

  const undirected = edgeData.undirected;

  const isSelfLoop = sourceData === targetData;

  if (undirected) {
    sourceData.undirectedDegree--;
    targetData.undirectedDegree--;

    if (isSelfLoop) {
      sourceData.undirectedLoops--;
      graph._undirectedSelfLoopCount--;
    }
  } else {
    sourceData.outDegree--;
    targetData.inDegree--;

    if (isSelfLoop) {
      sourceData.directedLoops--;
      graph._directedSelfLoopCount--;
    }
  }

  // Clearing index
  if (graph.multi) edgeData.detachMulti();
  else edgeData.detach();

  if (undirected) graph._undirectedSize--;
  else graph._directedSize--;

  // Emitting
  graph.emit('edgeDropped', {
    key: edgeData.key,
    attributes,
    source: sourceData.key,
    target: targetData.key,
    undirected
  });
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
    if (typeof options.multi !== 'boolean')
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${options.multi}".`
      );

    if (!TYPES.has(options.type))
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${options.type}".`
      );

    if (typeof options.allowSelfLoops !== 'boolean')
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${options.allowSelfLoops}".`
      );

    //-- Private properties

    // Utilities
    const NodeDataClass =
      options.type === 'mixed'
        ? MixedNodeData
        : options.type === 'directed'
        ? DirectedNodeData
        : UndirectedNodeData;

    privateProperty(this, 'NodeDataClass', NodeDataClass);

    // Internal edge key generator

    // NOTE: this internal generator produce keys that are strings
    // composed of a weird prefix, an incremental instance id starting from
    // a random byte and finally an internal instance incremental id.
    // All this to avoid intra-frame and cross-frame adversarial inputs
    // that can force a single #.addEdge call to degenerate into a O(n)
    // available key search loop.

    // It also ensures that automatically generated edge keys are unlikely
    // to produce collisions with arbitrary keys given by users.
    const instancePrefix = 'geid_' + INSTANCE_ID() + '_';
    let edgeId = 0;

    const edgeKeyGenerator = () => {
      let availableEdgeKey;

      do {
        availableEdgeKey = instancePrefix + edgeId++;
      } while (this._edges.has(availableEdgeKey));

      return availableEdgeKey;
    };

    // Indexes
    privateProperty(this, '_attributes', {});
    privateProperty(this, '_nodes', new Map());
    privateProperty(this, '_edges', new Map());
    privateProperty(this, '_directedSize', 0);
    privateProperty(this, '_undirectedSize', 0);
    privateProperty(this, '_directedSelfLoopCount', 0);
    privateProperty(this, '_undirectedSelfLoopCount', 0);
    privateProperty(this, '_edgeKeyGenerator', edgeKeyGenerator);

    // Options
    privateProperty(this, '_options', options);

    // Emitter properties
    EMITTER_PROPS.forEach(prop => privateProperty(this, prop, this[prop]));

    //-- Properties readers
    readOnlyProperty(this, 'order', () => this._nodes.size);
    readOnlyProperty(this, 'size', () => this._edges.size);
    readOnlyProperty(this, 'directedSize', () => this._directedSize);
    readOnlyProperty(this, 'undirectedSize', () => this._undirectedSize);
    readOnlyProperty(
      this,
      'selfLoopCount',
      () => this._directedSelfLoopCount + this._undirectedSelfLoopCount
    );
    readOnlyProperty(
      this,
      'directedSelfLoopCount',
      () => this._directedSelfLoopCount
    );
    readOnlyProperty(
      this,
      'undirectedSelfLoopCount',
      () => this._undirectedSelfLoopCount
    );
    readOnlyProperty(this, 'multi', this._options.multi);
    readOnlyProperty(this, 'type', this._options.type);
    readOnlyProperty(this, 'allowSelfLoops', this._options.allowSelfLoops);
    readOnlyProperty(this, 'implementation', () => 'graphology');
  }

  _resetInstanceCounters() {
    this._directedSize = 0;
    this._undirectedSize = 0;
    this._directedSelfLoopCount = 0;
    this._undirectedSelfLoopCount = 0;
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
    if (this.type === 'undirected') return false;

    if (arguments.length === 1) {
      const edge = '' + source;

      const edgeData = this._edges.get(edge);

      return !!edgeData && !edgeData.undirected;
    } else if (arguments.length === 2) {
      source = '' + source;
      target = '' + target;

      // If the node source or the target is not in the graph we break
      const nodeData = this._nodes.get(source);

      if (!nodeData) return false;

      // Is there a directed edge pointing toward target?
      return nodeData.out.hasOwnProperty(target);
    }

    throw new InvalidArgumentsGraphError(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
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
    if (this.type === 'directed') return false;

    if (arguments.length === 1) {
      const edge = '' + source;

      const edgeData = this._edges.get(edge);

      return !!edgeData && edgeData.undirected;
    } else if (arguments.length === 2) {
      source = '' + source;
      target = '' + target;

      // If the node source or the target is not in the graph we break
      const nodeData = this._nodes.get(source);

      if (!nodeData) return false;

      // Is there a directed edge pointing toward target?
      return nodeData.undirected.hasOwnProperty(target);
    }

    throw new InvalidArgumentsGraphError(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
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
    } else if (arguments.length === 2) {
      source = '' + source;
      target = '' + target;

      // If the node source or the target is not in the graph we break
      const nodeData = this._nodes.get(source);

      if (!nodeData) return false;

      // Is there a directed edge pointing toward target?
      return (
        (typeof nodeData.out !== 'undefined' &&
          nodeData.out.hasOwnProperty(target)) ||
        (typeof nodeData.undirected !== 'undefined' &&
          nodeData.undirected.hasOwnProperty(target))
      );
    }

    throw new InvalidArgumentsGraphError(
      `Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
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
    if (this.type === 'undirected') return;

    source = '' + source;
    target = '' + target;

    if (this.multi)
      throw new UsageGraphError(
        'Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead.'
      );

    const sourceData = this._nodes.get(source);

    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.directedEdge: could not find the "${source}" source node in the graph.`
      );

    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.directedEdge: could not find the "${target}" target node in the graph.`
      );

    const edgeData = (sourceData.out && sourceData.out[target]) || undefined;

    if (edgeData) return edgeData.key;
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
    if (this.type === 'directed') return;

    source = '' + source;
    target = '' + target;

    if (this.multi)
      throw new UsageGraphError(
        'Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead.'
      );

    const sourceData = this._nodes.get(source);

    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.undirectedEdge: could not find the "${source}" source node in the graph.`
      );

    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.undirectedEdge: could not find the "${target}" target node in the graph.`
      );

    const edgeData =
      (sourceData.undirected && sourceData.undirected[target]) || undefined;

    if (edgeData) return edgeData.key;
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
      throw new UsageGraphError(
        'Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead.'
      );

    source = '' + source;
    target = '' + target;

    const sourceData = this._nodes.get(source);

    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.edge: could not find the "${source}" source node in the graph.`
      );

    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.edge: could not find the "${target}" target node in the graph.`
      );

    const edgeData =
      (sourceData.out && sourceData.out[target]) ||
      (sourceData.undirected && sourceData.undirected[target]) ||
      undefined;

    if (edgeData) return edgeData.key;
  }

  /**
   * Method returning whether two nodes are directed neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areDirectedNeighbors(node, neighbor) {
    node = '' + node;
    neighbor = '' + neighbor;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areDirectedNeighbors: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return false;

    return neighbor in nodeData.in || neighbor in nodeData.out;
  }

  /**
   * Method returning whether two nodes are out neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutNeighbors(node, neighbor) {
    node = '' + node;
    neighbor = '' + neighbor;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areOutNeighbors: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return false;

    return neighbor in nodeData.out;
  }

  /**
   * Method returning whether two nodes are in neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInNeighbors(node, neighbor) {
    node = '' + node;
    neighbor = '' + neighbor;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areInNeighbors: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return false;

    return neighbor in nodeData.in;
  }

  /**
   * Method returning whether two nodes are undirected neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areUndirectedNeighbors(node, neighbor) {
    node = '' + node;
    neighbor = '' + neighbor;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areUndirectedNeighbors: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'directed') return false;

    return neighbor in nodeData.undirected;
  }

  /**
   * Method returning whether two nodes are neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areNeighbors(node, neighbor) {
    node = '' + node;
    neighbor = '' + neighbor;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areNeighbors: could not find the "${node}" node in the graph.`
      );

    if (this.type !== 'undirected') {
      if (neighbor in nodeData.in || neighbor in nodeData.out) return true;
    }

    if (this.type !== 'directed') {
      if (neighbor in nodeData.undirected) return true;
    }

    return false;
  }

  /**
   * Method returning whether two nodes are inbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInboundNeighbors(node, neighbor) {
    node = '' + node;
    neighbor = '' + neighbor;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areInboundNeighbors: could not find the "${node}" node in the graph.`
      );

    if (this.type !== 'undirected') {
      if (neighbor in nodeData.in) return true;
    }

    if (this.type !== 'directed') {
      if (neighbor in nodeData.undirected) return true;
    }

    return false;
  }

  /**
   * Method returning whether two nodes are outbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutboundNeighbors(node, neighbor) {
    node = '' + node;
    neighbor = '' + neighbor;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areOutboundNeighbors: could not find the "${node}" node in the graph.`
      );

    if (this.type !== 'undirected') {
      if (neighbor in nodeData.out) return true;
    }

    if (this.type !== 'directed') {
      if (neighbor in nodeData.undirected) return true;
    }

    return false;
  }

  /**
   * Method returning the given node's in degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegree(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inDegree: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return 0;

    return nodeData.inDegree;
  }

  /**
   * Method returning the given node's out degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegree(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outDegree: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return 0;

    return nodeData.outDegree;
  }

  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegree(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.directedDegree: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return 0;

    return nodeData.inDegree + nodeData.outDegree;
  }

  /**
   * Method returning the given node's undirected degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegree(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.undirectedDegree: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'directed') return 0;

    return nodeData.undirectedDegree;
  }

  /**
   * Method returning the given node's inbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegree(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inboundDegree: could not find the "${node}" node in the graph.`
      );

    let degree = 0;

    if (this.type !== 'directed') {
      degree += nodeData.undirectedDegree;
    }

    if (this.type !== 'undirected') {
      degree += nodeData.inDegree;
    }

    return degree;
  }

  /**
   * Method returning the given node's outbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegree(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outboundDegree: could not find the "${node}" node in the graph.`
      );

    let degree = 0;

    if (this.type !== 'directed') {
      degree += nodeData.undirectedDegree;
    }

    if (this.type !== 'undirected') {
      degree += nodeData.outDegree;
    }

    return degree;
  }

  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degree(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.degree: could not find the "${node}" node in the graph.`
      );

    let degree = 0;

    if (this.type !== 'directed') {
      degree += nodeData.undirectedDegree;
    }

    if (this.type !== 'undirected') {
      degree += nodeData.inDegree + nodeData.outDegree;
    }

    return degree;
  }

  /**
   * Method returning the given node's in degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegreeWithoutSelfLoops(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return 0;

    return nodeData.inDegree - nodeData.directedLoops;
  }

  /**
   * Method returning the given node's out degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegreeWithoutSelfLoops(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return 0;

    return nodeData.outDegree - nodeData.directedLoops;
  }

  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegreeWithoutSelfLoops(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.directedDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'undirected') return 0;

    return nodeData.inDegree + nodeData.outDegree - nodeData.directedLoops * 2;
  }

  /**
   * Method returning the given node's undirected degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegreeWithoutSelfLoops(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.undirectedDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );

    if (this.type === 'directed') return 0;

    return nodeData.undirectedDegree - nodeData.undirectedLoops * 2;
  }

  /**
   * Method returning the given node's inbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegreeWithoutSelfLoops(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inboundDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );

    let degree = 0;
    let loops = 0;

    if (this.type !== 'directed') {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }

    if (this.type !== 'undirected') {
      degree += nodeData.inDegree;
      loops += nodeData.directedLoops;
    }

    return degree - loops;
  }

  /**
   * Method returning the given node's outbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegreeWithoutSelfLoops(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outboundDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );

    let degree = 0;
    let loops = 0;

    if (this.type !== 'directed') {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }

    if (this.type !== 'undirected') {
      degree += nodeData.outDegree;
      loops += nodeData.directedLoops;
    }

    return degree - loops;
  }

  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degreeWithoutSelfLoops(node) {
    node = '' + node;

    const nodeData = this._nodes.get(node);

    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.degreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );

    let degree = 0;
    let loops = 0;

    if (this.type !== 'directed') {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }

    if (this.type !== 'undirected') {
      degree += nodeData.inDegree + nodeData.outDegree;
      loops += nodeData.directedLoops * 2;
    }

    return degree - loops;
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
      throw new NotFoundGraphError(
        `Graph.source: could not find the "${edge}" edge in the graph.`
      );

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
      throw new NotFoundGraphError(
        `Graph.target: could not find the "${edge}" edge in the graph.`
      );

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
      throw new NotFoundGraphError(
        `Graph.extremities: could not find the "${edge}" edge in the graph.`
      );

    return [edgeData.source.key, edgeData.target.key];
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
      throw new NotFoundGraphError(
        `Graph.opposite: could not find the "${edge}" edge in the graph.`
      );

    const source = data.source.key;
    const target = data.target.key;

    if (node === source) return target;
    if (node === target) return source;

    throw new NotFoundGraphError(
      `Graph.opposite: the "${node}" node is not attached to the "${edge}" edge (${source}, ${target}).`
    );
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
      throw new NotFoundGraphError(
        `Graph.hasExtremity: could not find the "${edge}" edge in the graph.`
      );

    return data.source.key === node || data.target.key === node;
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
      throw new NotFoundGraphError(
        `Graph.isUndirected: could not find the "${edge}" edge in the graph.`
      );

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
      throw new NotFoundGraphError(
        `Graph.isDirected: could not find the "${edge}" edge in the graph.`
      );

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
      throw new NotFoundGraphError(
        `Graph.isSelfLoop: could not find the "${edge}" edge in the graph.`
      );

    return data.source === data.target;
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
      throw new InvalidArgumentsGraphError(
        `Graph.mergeNode: invalid attributes. Expecting an object but got "${attributes}"`
      );

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
      return [node, false];
    }

    data = new this.NodeDataClass(node, attributes);

    // Adding the node to internal register
    this._nodes.set(node, data);

    // Emitting
    this.emit('nodeAdded', {
      key: node,
      attributes
    });

    return [node, true];
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
      throw new InvalidArgumentsGraphError(
        `Graph.updateNode: invalid updater function. Expecting a function but got "${updater}"`
      );

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
      return [node, false];
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

    return [node, true];
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
      throw new NotFoundGraphError(
        `Graph.dropNode: could not find the "${node}" node in the graph.`
      );

    let edgeData;

    // Removing attached edges
    // NOTE: we could be faster here, but this is such a pain to maintain
    if (this.type !== 'undirected') {
      for (const neighbor in nodeData.out) {
        edgeData = nodeData.out[neighbor];

        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }

      for (const neighbor in nodeData.in) {
        edgeData = nodeData.in[neighbor];

        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }

    if (this.type !== 'directed') {
      for (const neighbor in nodeData.undirected) {
        edgeData = nodeData.undirected[neighbor];

        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }

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
      const source = '' + arguments[0];
      const target = '' + arguments[1];

      edgeData = getMatchingEdge(this, source, target, this.type);

      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.dropEdge: could not find the "${source}" -> "${target}" edge in the graph.`
        );
    } else {
      edge = '' + edge;

      edgeData = this._edges.get(edge);

      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.dropEdge: could not find the "${edge}" edge in the graph.`
        );
    }

    dropEdgeFromData(this, edgeData);

    return this;
  }

  /**
   * Method used to drop a single directed edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropDirectedEdge(source, target) {
    if (arguments.length < 2)
      throw new UsageGraphError(
        'Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead.'
      );

    if (this.multi)
      throw new UsageGraphError(
        'Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones.'
      );

    source = '' + source;
    target = '' + target;

    const edgeData = getMatchingEdge(this, source, target, 'directed');

    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.dropDirectedEdge: could not find a "${source}" -> "${target}" edge in the graph.`
      );

    dropEdgeFromData(this, edgeData);

    return this;
  }

  /**
   * Method used to drop a single undirected edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropUndirectedEdge(source, target) {
    if (arguments.length < 2)
      throw new UsageGraphError(
        'Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead.'
      );

    if (this.multi)
      throw new UsageGraphError(
        'Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones.'
      );

    const edgeData = getMatchingEdge(this, source, target, 'undirected');

    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.dropUndirectedEdge: could not find a "${source}" -> "${target}" edge in the graph.`
      );

    dropEdgeFromData(this, edgeData);

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

    // Reset counters
    this._resetInstanceCounters();

    // Emitting
    this.emit('cleared');
  }

  /**
   * Method used to remove every edge from the graph.
   *
   * @return {Graph}
   */
  clearEdges() {
    // Clearing structure index
    const iterator = this._nodes.values();

    let step;

    while (((step = iterator.next()), step.done !== true)) {
      step.value.clear();
    }

    // Clearing edges
    this._edges.clear();

    // Reset counters
    this._resetInstanceCounters();

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
      throw new InvalidArgumentsGraphError(
        'Graph.updateAttribute: updater should be a function.'
      );

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
      throw new InvalidArgumentsGraphError(
        'Graph.replaceAttributes: provided attributes are not a plain object.'
      );

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
      throw new InvalidArgumentsGraphError(
        'Graph.mergeAttributes: provided attributes are not a plain object.'
      );

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
   * Method updating the graph's attributes.
   *
   * @param  {function} updater - Function used to update the attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given updater is not a function.
   */
  updateAttributes(updater) {
    if (typeof updater !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.updateAttributes: provided updater is not a function.'
      );

    this._attributes = updater(this._attributes);

    // Emitting
    this.emit('attributesUpdated', {
      type: 'update',
      attributes: this._attributes
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
      throw new InvalidArgumentsGraphError(
        'Graph.updateEachNodeAttributes: expecting an updater function.'
      );

    if (hints && !validateHints(hints))
      throw new InvalidArgumentsGraphError(
        'Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}'
      );

    const iterator = this._nodes.values();

    let step, nodeData;

    while (((step = iterator.next()), step.done !== true)) {
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
      throw new InvalidArgumentsGraphError(
        'Graph.updateEachEdgeAttributes: expecting an updater function.'
      );

    if (hints && !validateHints(hints))
      throw new InvalidArgumentsGraphError(
        'Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}'
      );

    const iterator = this._edges.values();

    let step, edgeData, sourceData, targetData;

    while (((step = iterator.next()), step.done !== true)) {
      edgeData = step.value;
      sourceData = edgeData.source;
      targetData = edgeData.target;

      edgeData.attributes = updater(
        edgeData.key,
        edgeData.attributes,
        sourceData.key,
        targetData.key,
        sourceData.attributes,
        targetData.attributes,
        edgeData.undirected
      );
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
  forEachAdjacencyEntry(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.forEachAdjacencyEntry: expecting a callback.'
      );

    forEachAdjacency(false, false, false, this, callback);
  }
  forEachAdjacencyEntryWithOrphans(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.forEachAdjacencyEntryWithOrphans: expecting a callback.'
      );

    forEachAdjacency(false, false, true, this, callback);
  }

  /**
   * Method iterating over the graph's assymetric adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAssymetricAdjacencyEntry(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.forEachAssymetricAdjacencyEntry: expecting a callback.'
      );

    forEachAdjacency(false, true, false, this, callback);
  }
  forEachAssymetricAdjacencyEntryWithOrphans(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback.'
      );

    forEachAdjacency(false, true, true, this, callback);
  }

  /**
   * Method returning the list of the graph's nodes.
   *
   * @return {array} - The nodes.
   */
  nodes() {
    if (typeof Array.from === 'function') return Array.from(this._nodes.keys());

    return take(this._nodes.keys(), this._nodes.size);
  }

  /**
   * Method iterating over the graph's nodes using the given callback.
   *
   * @param  {function}  callback - Callback (key, attributes, index).
   */
  forEachNode(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.forEachNode: expecting a callback.'
      );

    const iterator = this._nodes.values();

    let step, nodeData;

    while (((step = iterator.next()), step.done !== true)) {
      nodeData = step.value;
      callback(nodeData.key, nodeData.attributes);
    }
  }

  /**
   * Method iterating attempting to find a node matching the given predicate
   * function.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  findNode(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.findNode: expecting a callback.'
      );

    const iterator = this._nodes.values();

    let step, nodeData;

    while (((step = iterator.next()), step.done !== true)) {
      nodeData = step.value;

      if (callback(nodeData.key, nodeData.attributes)) return nodeData.key;
    }

    return;
  }

  /**
   * Method mapping nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  mapNodes(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.mapNode: expecting a callback.'
      );

    const iterator = this._nodes.values();

    let step, nodeData;

    const result = new Array(this.order);
    let i = 0;

    while (((step = iterator.next()), step.done !== true)) {
      nodeData = step.value;
      result[i++] = callback(nodeData.key, nodeData.attributes);
    }

    return result;
  }

  /**
   * Method returning whether some node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  someNode(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.someNode: expecting a callback.'
      );

    const iterator = this._nodes.values();

    let step, nodeData;

    while (((step = iterator.next()), step.done !== true)) {
      nodeData = step.value;

      if (callback(nodeData.key, nodeData.attributes)) return true;
    }

    return false;
  }

  /**
   * Method returning whether all node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  everyNode(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.everyNode: expecting a callback.'
      );

    const iterator = this._nodes.values();

    let step, nodeData;

    while (((step = iterator.next()), step.done !== true)) {
      nodeData = step.value;

      if (!callback(nodeData.key, nodeData.attributes)) return false;
    }

    return true;
  }

  /**
   * Method filtering nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  filterNodes(callback) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.filterNodes: expecting a callback.'
      );

    const iterator = this._nodes.values();

    let step, nodeData;

    const result = [];

    while (((step = iterator.next()), step.done !== true)) {
      nodeData = step.value;

      if (callback(nodeData.key, nodeData.attributes))
        result.push(nodeData.key);
    }

    return result;
  }

  /**
   * Method reducing nodes.
   *
   * @param  {function}  callback - Callback (accumulator, key, attributes).
   */
  reduceNodes(callback, initialValue) {
    if (typeof callback !== 'function')
      throw new InvalidArgumentsGraphError(
        'Graph.reduceNodes: expecting a callback.'
      );

    if (arguments.length < 2)
      throw new InvalidArgumentsGraphError(
        'Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.'
      );

    let accumulator = initialValue;

    const iterator = this._nodes.values();

    let step, nodeData;

    while (((step = iterator.next()), step.done !== true)) {
      nodeData = step.value;
      accumulator = callback(accumulator, nodeData.key, nodeData.attributes);
    }

    return accumulator;
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

      if (step.done) return step;

      const data = step.value;

      return {
        value: {node: data.key, attributes: data.attributes},
        done: false
      };
    });
  }

  /**---------------------------------------------------------------------------
   * Serialization
   **---------------------------------------------------------------------------
   */

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
      edges[i++] = serializeEdge(this.type, key, data);
    });

    return {
      options: {
        type: this.type,
        multi: this.multi,
        allowSelfLoops: this.allowSelfLoops
      },
      attributes: this.getAttributes(),
      nodes,
      edges
    };
  }

  /**
   * Method used to import a serialized graph.
   *
   * @param  {object|Graph} data  - The serialized graph.
   * @param  {boolean}      merge - Whether to merge data.
   * @return {Graph}              - Returns itself for chaining.
   */
  import(data, merge = false) {
    // Importing a Graph instance directly
    if (data instanceof Graph) {
      // Nodes
      data.forEachNode((n, a) => {
        if (merge) this.mergeNode(n, a);
        else this.addNode(n, a);
      });

      // Edges
      data.forEachEdge((e, a, s, t, _sa, _ta, u) => {
        if (merge) {
          if (u) this.mergeUndirectedEdgeWithKey(e, s, t, a);
          else this.mergeDirectedEdgeWithKey(e, s, t, a);
        } else {
          if (u) this.addUndirectedEdgeWithKey(e, s, t, a);
          else this.addDirectedEdgeWithKey(e, s, t, a);
        }
      });

      return this;
    }

    // Importing a serialized graph
    if (!isPlainObject(data))
      throw new InvalidArgumentsGraphError(
        'Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance.'
      );

    if (data.attributes) {
      if (!isPlainObject(data.attributes))
        throw new InvalidArgumentsGraphError(
          'Graph.import: invalid attributes. Expecting a plain object.'
        );

      if (merge) this.mergeAttributes(data.attributes);
      else this.replaceAttributes(data.attributes);
    }

    let i, l, list, node, edge;

    if (data.nodes) {
      list = data.nodes;

      if (!Array.isArray(list))
        throw new InvalidArgumentsGraphError(
          'Graph.import: invalid nodes. Expecting an array.'
        );

      for (i = 0, l = list.length; i < l; i++) {
        node = list[i];

        // Validating
        validateSerializedNode(node);

        // Adding the node
        const {key, attributes} = node;

        if (merge) this.mergeNode(key, attributes);
        else this.addNode(key, attributes);
      }
    }

    if (data.edges) {
      let undirectedByDefault = false;

      if (this.type === 'undirected') {
        undirectedByDefault = true;
      }

      list = data.edges;

      if (!Array.isArray(list))
        throw new InvalidArgumentsGraphError(
          'Graph.import: invalid edges. Expecting an array.'
        );

      for (i = 0, l = list.length; i < l; i++) {
        edge = list[i];

        // Validating
        validateSerializedEdge(edge);

        // Adding the edge
        const {
          source,
          target,
          attributes,
          undirected = undirectedByDefault
        } = edge;

        let method;

        if ('key' in edge) {
          method = merge
            ? undirected
              ? this.mergeUndirectedEdgeWithKey
              : this.mergeDirectedEdgeWithKey
            : undirected
            ? this.addUndirectedEdgeWithKey
            : this.addDirectedEdgeWithKey;

          method.call(this, edge.key, source, target, attributes);
        } else {
          method = merge
            ? undirected
              ? this.mergeUndirectedEdge
              : this.mergeDirectedEdge
            : undirected
            ? this.addUndirectedEdge
            : this.addDirectedEdge;

          method.call(this, source, target, attributes);
        }
      }
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
    const graph = new Graph(assign({}, this._options, options));
    graph.replaceAttributes(assign({}, this.getAttributes()));
    return graph;
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
   * @param  {object} options - Upgrade options.
   * @return {Graph}          - The copy.
   */
  copy(options) {
    options = options || {};

    if (
      typeof options.type === 'string' &&
      options.type !== this.type &&
      options.type !== 'mixed'
    )
      throw new UsageGraphError(
        `Graph.copy: cannot create an incompatible copy from "${this.type}" type to "${options.type}" because this would mean losing information about the current graph.`
      );

    if (
      typeof options.multi === 'boolean' &&
      options.multi !== this.multi &&
      options.multi !== true
    )
      throw new UsageGraphError(
        'Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph.'
      );

    if (
      typeof options.allowSelfLoops === 'boolean' &&
      options.allowSelfLoops !== this.allowSelfLoops &&
      options.allowSelfLoops !== true
    )
      throw new UsageGraphError(
        'Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph.'
      );

    const graph = this.emptyCopy(options);

    const iterator = this._edges.values();

    let step, edgeData;

    while (((step = iterator.next()), step.done !== true)) {
      edgeData = step.value;

      // NOTE: no need to emit events since user cannot access the instance yet
      addEdge(
        graph,
        'copy',
        false,
        edgeData.undirected,
        edgeData.key,
        edgeData.source.key,
        edgeData.target.key,
        assign({}, edgeData.attributes)
      );
    }

    return graph;
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

      let source = data.source.key;
      let target = data.target.key;
      let tmp;

      if (data.undirected && source > target) {
        tmp = source;
        source = target;
        target = tmp;
      }

      const desc = `(${source})${direction}(${target})`;

      if (!key.startsWith('geid_')) {
        label += `[${key}]: `;
      } else if (this.multi) {
        if (typeof multiIndex[desc] === 'undefined') {
          multiIndex[desc] = 0;
        } else {
          multiIndex[desc]++;
        }

        label += `${multiIndex[desc]}. `;
      }

      label += desc;

      edges[label] = data.attributes;
    });

    const dummy = {};

    for (const k in this) {
      if (
        this.hasOwnProperty(k) &&
        !EMITTER_PROPS.has(k) &&
        typeof this[k] !== 'function' &&
        typeof k !== 'symbol'
      )
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
 * Attaching methods to the prototype.
 *
 * Here, we are attaching a wide variety of methods to the Graph class'
 * prototype when those are very numerous and when their creation is
 * abstracted.
 */

/**
 * Attaching custom inspect method for node >= 10.
 */
if (typeof Symbol !== 'undefined')
  Graph.prototype[Symbol.for('nodejs.util.inspect.custom')] =
    Graph.prototype.inspect;

/**
 * Related to edge addition.
 */
EDGE_ADD_METHODS.forEach(method => {
  ['add', 'merge', 'update'].forEach(verb => {
    const name = method.name(verb);
    const fn = verb === 'add' ? addEdge : mergeEdge;

    if (method.generateKey) {
      Graph.prototype[name] = function (source, target, attributes) {
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
    } else {
      Graph.prototype[name] = function (edge, source, target, attributes) {
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
 * Attributes-related.
 */
attachNodeAttributesMethods(Graph);
attachEdgeAttributesMethods(Graph);

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
      throw new InvalidArgumentsGraphError(
        'DirectedGraph.from: inconsistent indication that the graph should be multi in given options!'
      );

    if (finalOptions.type !== 'directed')
      throw new InvalidArgumentsGraphError(
        'DirectedGraph.from: inconsistent "' +
          finalOptions.type +
          '" type in given options!'
      );

    super(finalOptions);
  }
}
class UndirectedGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({type: 'undirected'}, options);

    if ('multi' in finalOptions && finalOptions.multi !== false)
      throw new InvalidArgumentsGraphError(
        'UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!'
      );

    if (finalOptions.type !== 'undirected')
      throw new InvalidArgumentsGraphError(
        'UndirectedGraph.from: inconsistent "' +
          finalOptions.type +
          '" type in given options!'
      );

    super(finalOptions);
  }
}
class MultiGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({multi: true}, options);

    if ('multi' in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        'MultiGraph.from: inconsistent indication that the graph should be simple in given options!'
      );

    super(finalOptions);
  }
}
class MultiDirectedGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({type: 'directed', multi: true}, options);

    if ('multi' in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        'MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!'
      );

    if (finalOptions.type !== 'directed')
      throw new InvalidArgumentsGraphError(
        'MultiDirectedGraph.from: inconsistent "' +
          finalOptions.type +
          '" type in given options!'
      );

    super(finalOptions);
  }
}
class MultiUndirectedGraph extends Graph {
  constructor(options) {
    const finalOptions = assign({type: 'undirected', multi: true}, options);

    if ('multi' in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        'MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!'
      );

    if (finalOptions.type !== 'undirected')
      throw new InvalidArgumentsGraphError(
        'MultiUndirectedGraph.from: inconsistent "' +
          finalOptions.type +
          '" type in given options!'
      );

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
  Class.from = function (data, options) {
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

export { DirectedGraph, Graph, InvalidArgumentsGraphError, MultiDirectedGraph, MultiGraph, MultiUndirectedGraph, NotFoundGraphError, UndirectedGraph, UsageGraphError, Graph as default };
//# sourceMappingURL=graphology.esm.js.map
