/*
 *   {cell}
 *
 *   - Membrane: "The cell membrane (also known as the plasma membrane or cytoplasmic membrane) is a biological membrane that separates the interior of all cells from the outside environment"
 *   - Gene: "The transmission of genes to an organism's offspring is the basis of the inheritance of phenotypic traits. These genes make up different DNA sequences called genotypes. Genotypes along with environmental and developmental factors determine what the phenotypes will be."
 *   - Genotype: "Genotype is an organism's full hereditary information."
 *   - Phenotype: "Phenotype is an organism's actual observed properties, such as morphology, development, or behavior."
 *   - Nucleus: "The nucleus maintains the integrity of genes and controls the activities of the cell by regulating gene expression—the nucleus is, therefore, the control center of the cell."
 */
(function($root) {
  var Membrane = {
    /*
     *  [Membrane] The Shell
     *
     *  "The cell membrane (also known as the plasma membrane or cytoplasmic membrane) is a biological membrane that separates the interior of all cells from the outside environment"
     *    - https://en.wikipedia.org/wiki/Cell_membrane
     *
     *  The Membrane module determines how a cell is inserted into the DOM. There are two ways: Replacing an existing node with cell (inject), or Creating an additional cell node (add).
     *   - inject(): attempts to inject cell into an existing host node
     *   - add(): creates a new cell node and adds it to the DOM without touching other nodes
     */
    inject: function($host, gene, namespace, replace) {
      /*
       *  Membrane.inject() : Inject cell into an existing node
       *
       *  @param {Object} $host - existing host node to inject into
       *  @param {Object} gene - gene object
       *  @param {String} namespace - for handling namespaced elements such as SVG https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
       *  @param {Boolean} replace - if true, create a node and replace it with the host node. Used for manual instantiation
       */
      var $node = null;
      var $replacement;
      if (replace && $host) {
        // 1. Inject into an existing node ($host) by explicit instantiation
        $replacement = Phenotype.$type(gene, namespace);
        if (gene.hasOwnProperty('$cell')) {
          $node = $host;
          if ($node.parentNode) $node.parentNode.replaceChild($replacement, $node);
        }
        $node = $replacement;
      } else if (gene.$type && (gene.$type === 'head' || gene.$type === 'body') && $root.document.getElementsByTagName(gene.$type)) {
        // 2. Inject into existing 'head' or 'body' nodes
        $node = $root.document.getElementsByTagName(gene.$type)[0];
      } else if (gene.id && $root.document.getElementById(gene.id)) {
        // 3. Inject into an existing nodes by ID
        $node = $root.document.getElementById(gene.id);
        if ($node.nodeName.toLowerCase() !== (gene.$type || 'div')) {
          $replacement = Phenotype.$type(gene, namespace);
          $node.parentNode.replaceChild($replacement, $node);
          $node = $replacement;
        }
      }
      if ($node && !$node.Meta) $node.Meta = {};
      return $node;
    },
    add: function($parent, gene, index, namespace) {
      /*
       *  Membrane.add() : Adds a new cell node into the DOM tree
       *
       *  @param $parent - The parent node to which the new cell node will be added
       *  @param gene - gene object
       *  @param index - the position within the parent's childNodes array to which this cell node will be added. Not used in the initial render but used for subsequent renders based on the diff logic
       *  @param namespace - namespace URL for namespaced elements such as SVG
       */
      var $node = Phenotype.$type(gene, namespace);
      if (index !== null && index !== undefined && $parent.childNodes && $parent.childNodes[index]) {
        // Index is specified, so insert into that position
        $parent.insertBefore($node, $parent.childNodes[index]);
      } else {
        // No index, simply apppend to the end
        $parent.appendChild($node);
      }
      return $node;
    },
    build: function($parent, gene, index, namespace, replace) {
      /*
       * Membrane.build() : The main builder function that interfaces with Membrane.inject() and Membrane.add().
       */
      // 1. Attempt to inject into an existing node
      var $existing = Membrane.inject($parent, gene, namespace, replace);
      if ($existing) return $existing;
      // 2. If it's not an injection into an existing node, we create a node
      else return Membrane.add($parent, gene, index, namespace);
    },
  };
  var Genotype = {
    /*
     *  [Genotype] Internal Storage of Genes
     *
     *  "Genotype is an organism's full hereditary information."
     *    - https://en.wikipedia.org/wiki/Genotype
     *
     *   The Genotype module is an internal storage for all the variables required to construct a cell node (attributes, $variables, and _variables)
     *   When you set a variable on a cell (for example: this._index=1), it's actually stored under the node's Genotype instead of directly on the node itself.
     *
     *   - set(): a low-level function to simply set a key/value pair on the Genotype object, used by update() and build()
     *   - update(): updates a key/value pair from the genotype and schedules a phenotype (view) update event to be processed on the next tick
     *   - build(): builds a fresh genotype object from a gene object
     */
    set: function($node, key, val) {
      if (['$init'].indexOf(key) === -1) {
        $node.Genotype[key] = Nucleus.bind($node, val);
      } else {
        val.snapshot = val; // snapshot of $init
        $node.Genotype[key] = val;
      }
    },
    update: function($node, key, val) {
      Nucleus.queue($node, key, 'w');
      Genotype.set($node, key, val);
    },
    build: function($node, gene, inheritance) {
      $node.Genotype = {};
      $node.Inheritance = inheritance;
      for (var key in gene) {
        Genotype.set($node, key, gene[key]);
      }
    },
  };
  var Gene = {
    /*
     *  [Gene] Gene manipulation/diff functions
     *
     *  "The transmission of genes to an organism's offspring is the basis of the inheritance of phenotypic traits. These genes make up different DNA sequences called genotypes. Genotypes along with environmental and developmental factors determine what the phenotypes will be."
     *    - https://en.wikipedia.org/wiki/Gene
     *
     *  The Gene module is a collection of utility functions used for comparing gene objects to determine if a node needs to be replaced or left alone when there's an update.
     *   - freeze(): stringifies a Javascript object snapshot for comparison
     *   - LCS(): Longest Common Subsequence algorithm https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
     *   - diff(): A diff algorithm that returns what have been added (+), and removed (-)
     */
    freeze: function(gene) {
      var cache = [];
      var res = JSON.stringify(gene, function(key, val) {
        if (typeof val === 'function') { return val.toString(); }
        if (typeof val === 'object' && val !== null) {
          if (cache.indexOf(val) !== -1) { return '[Circular]'; }
          cache.push(val);
        }
        return val;
      });
      cache = null;
      return res;
    },
    LCS: function(a, b) {
      var m = a.length, n = b.length, C = [], i, j, af = [], bf = [];
      for (i = 0; i < m; i++) af.push(Gene.freeze(a[i]));
      for (j = 0; j < n; j++) bf.push(Gene.freeze(b[j]));
      for (i = 0; i <= m; i++) C.push([0]);
      for (j = 0; j < n; j++) C[0].push(0);
      for (i = 0; i < m; i++) for (j = 0; j < n; j++) C[i+1][j+1] = af[i] === bf[j] ? C[i][j]+1 : Math.max(C[i+1][j], C[i][j+1]);
      return (function bt(i, j) {
        if (i*j === 0) { return []; }
        if (af[i-1] === bf[j-1]) { return bt(i-1, j-1).concat([{ item: a[i-1], _old: i-1, _new: j-1 }]); }
        return C[i][j-1] > C[i-1][j] ? bt(i, j-1) : bt(i-1, j);
      }(m, n));
    },
    diff: function(_old, _new) {
      var lcs = Gene.LCS(_old, _new);
      var old_common = lcs.map(function(i) { return i._old; });
      var minus = _old.map(function(item, index) {
        return { item: item, index: index };
      }).filter(function(item, index) {
        return old_common.indexOf(index) === -1;
      });
      var new_common = lcs.map(function(i) { return i._new; });
      var plus = _new.map(function(item, index) {
        return { item: item, index: index };
      }).filter(function(item, index) {
        return new_common.indexOf(index) === -1;
      });
      return { '-': minus, '+': plus };
    },
  };
  var Phenotype = {
    /*
     *  [Phenotype] Actual observed properties of a cell
     *
     *  "Phenotype is an organism's actual observed properties, such as morphology, development, or behavior."
     *    - https://en.wikipedia.org/wiki/Phenotype
     *
     *  The Phenotype module manages a cell's actual observed properties, such as textContent ($text), nodeType ($type), innerHTML ($html), childNodes ($components), and DOM attributes
     *
     *   - build(): Build phenotype from genotype
     *   - set(): Sets a key/value pair of phenotype
     *   - $type(): translates the "$type" attribute to nodeType
     *   - $text(): translates the "$type" attribute to textContent
     *   - $html(): translates the "$type" attribute to innerHTML
     *   - $components(): translates the "$components" attribute to childNodes
     *   - $init(): executes the "$init" callback function after the element has been rendered
     *   - $update(): executes the "$update" callback function when needed (called by Nucleus on every tick)
     */
    build: function($node, genotype) {
      for (var key in genotype) {
        if (genotype[key] !== null && genotype[key] !== undefined) {
          Phenotype.set($node, key, genotype[key]);
        }
      }
      Phenotype.$init($node);
    },
    multiline: function(fn) { return /\/\*!?(?:@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//.exec(fn.toString())[1]; },
    get: function(key) {
      return Object.getOwnPropertyDescriptor($root.HTMLElement.prototype, key) || Object.getOwnPropertyDescriptor($root.Element.prototype, key);
    },
    set: function($node, key, val) {
      if (key[0] === '$') {
        if (key === '$type') {
          // recreate and rebind the node if it's different from the old one
          var tag = $node.tagName ? $node.tagName.toLowerCase() : 'text';
          if (val.toLowerCase() !== tag) {
            var fragment = Phenotype.$type({ $type: 'fragment' });
            var replacement = fragment.$build($node.Genotype, $node.Inheritance, null, $node.Meta.namespace);
            $node.parentNode.replaceChild(replacement, $node);
            $node = replacement;
          }
        } else if (key === '$text') {
          if (typeof val === 'function') val = Phenotype.multiline(val);
          $node.textContent = val;
        } else if (key === '$html') {
          if (typeof val === 'function') val = Phenotype.multiline(val);
          $node.innerHTML = val;
        } else if (key === '$components') {
          Phenotype.$components($node, val);
        }
      } else if (key[0] === '_') {
        // "_" variables don't directly alter the phenotype, so do nothing
      } else if (key === 'value') {
        $node[key] = val;
      } else if (key === 'style' && typeof val === 'object') {
        var CSSStyleDeclaration = Phenotype.get(key).get.call($node);
        for (var attr in val) { CSSStyleDeclaration[attr] = val[attr]; }
      } else if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
        if ($node.setAttribute) $node.setAttribute(key, val);
      } else if (typeof val === 'function') {
        // For natively supported HTMLElement.prototype methods such as onclick()
        var prop = Phenotype.get(key);
        if (prop) prop.set.call($node, val);
      }
    },
    $type: function(model, namespace) {
      var meta = {};
      var $node;
      if (model.$type === 'text') {
        if (model.$text && typeof model.$text === 'function') model.$text = Phenotype.multiline(model.$text);
        $node = $root.document.createTextNode(model.$text);
      } else if (model.$type === 'svg') {
        $node = $root.document.createElementNS('http://www.w3.org/2000/svg', model.$type);
        meta.namespace = $node.namespaceURI;
      } else if (namespace) {
        $node = $root.document.createElementNS(namespace, model.$type);
        meta.namespace = $node.namespaceURI;
      } else if (model.$type === 'fragment') {
        $node = $root.document.createDocumentFragment();
      } else {
        $node = $root.document.createElement(model.$type || 'div');
      }
      $node.Meta = meta;
      return $node;
    },
    $components: function($parent, components) {
      if (!components) components = [];
      var old = [].map.call($parent.childNodes, function($node) {
        return $node.Genotype;
      }).filter(function(item) {
        return item; // only compare with Cells (that have Genotype), not additional elements created by another javascript library
      });
      if (old.length > 0) {
        // If childNodes already exist, try to insert into a correct position.
        var diff = Gene.diff(old, components);
        diff['-'].forEach(function(item) { $parent.childNodes[item.index].Kill = true; });
        [].filter.call($parent.childNodes, function($node) {
          return $node.Kill;
        }).forEach(function($node) {
          $parent.removeChild($node);
        });
        diff['+'].forEach(function(item) {
          var inheritance = $parent.Inheritance;
          for (var key in $parent.Genotype) {
            if (key[0] === '_') inheritance = inheritance.concat([key]);
          }
          $parent.$build(item.item, inheritance, item.index, $parent.Meta.namespace);
          $parent.$components[item.index] = $parent.childNodes[item.index].Genotype;
        });
      } else {
        // first time construction => no childNodes => build a fragment and insert at once
        var $fragment = Phenotype.$type({ $type: 'fragment' });
        var inheritance = $parent.Inheritance;
        for (var key in $parent.Genotype) {
          if (key[0] === '_') inheritance = inheritance.concat([key]);
        }
        while ($parent.firstChild) { $parent.removeChild($parent.firstChild); } // remove empty text nodes
        components.forEach(function(component) {
          $fragment.$build(component, inheritance, null, $parent.Meta.namespace);
        });
        $parent.appendChild($fragment);
        $parent.$components = [].map.call($parent.childNodes, function($node) { return $node.Genotype; });
      }
    },
    $init: function($node) {
      Nucleus.tick.call($root, function() {
        if ($node.Genotype && $node.Genotype.$init) Nucleus.bind($node, $node.Genotype.$init)();
      });
    },
    $update: function($node) {
      if ($node.parentNode && !$node.Meta.$updated && $node.$update) {
        $node.Meta.$updated = true;
        $node.$update();
        for (var key in $node.Dirty) { Phenotype.set($node, key, $node.Genotype[key]); }
        $node.Meta.$updated = false;
        $node.Dirty = null;
      }
    },
  };
  var Nucleus = {
    /*
     *  [Nucleus] Handles the cell cycle
     *
     *  "The nucleus maintains the integrity of genes and controls the activities of the cell by regulating gene expression—the nucleus is, therefore, the control center of the cell."
     *    - https://en.wikipedia.org/wiki/Cell_nucleus
     *
     *  The Nucleus module creates a proxy that lets Cell interface with the outside world. Its main job is to automatically trigger phenotype updates based on genotype updates
     *
     *   - set(): Starts listening to a single attribute.
     *   - build(): Starts listening to all attributes defined on the gene
     *   - bind(): Creates a wrapper function that executes the original function, and then automatically updates the Phenotype if necessary.
     *   - queue(): A function that queues up all potential genotype mutation events so that they can be batch-processed in a single tick.
     */
    tick: $root.requestAnimationFrame || $root.webkitRequestAnimationFrame || $root.mozRequestAnimationFrame || $root.msRequestAnimationFrame || function(cb) { return $root.setTimeout(cb, 1000/60); },
    set: function($node, key) {
      // Object.defineProperty is used for overriding the default getter and setter behaviors.
      Object.defineProperty($node, key, {
        configurable: true,
        get: function() {
          // 1. get() overrides the node's getter to create an illusion that users are directly accessing the attribute on the node (In reality they are accessing the genotype via nucleus)
          // 2. get() also queues up the accessed variable so it can potentially trigger a phenotype update in case there's been a mutation
          if (key[0] === '$' || key[0] === '_') {
            if (key in $node.Genotype) {
              Nucleus.queue($node, key, 'r');
              return $node.Genotype[key];
            } else if (key[0] === '_') {
              // Context Inheritance: If a _variable cannot be found on the current node, propagate upwards until we find a node with the attribute.
              var $current = $node;
              while ($current = $current.parentNode) { // eslint-disable-line no-cond-assign
                if ($current && $current.Genotype && (key in $current.Genotype)) {
                  Nucleus.queue($current, key, 'r');
                  return $current.Genotype[key];
                }
              }
            } else {
              return null;
            }
          } else {
            // DOM Attributes.
            if (key === 'value') {
              // The "value" attribute needs a special treatment.
              return Object.getOwnPropertyDescriptor(Object.getPrototypeOf($node), key).get.call($node);
            } else if (key === 'style') {
              return Phenotype.get(key).get.call($node);
            } else if (key in $node.Genotype) {
              // Otherwise utilize Genotype
              return $node.Genotype[key];
            } else {
              // If the key doesn't exist on the Genotype, it means we're dealing with native DOM attributes we didn't explicitly define on the gene.
              // For example, there are many DOM attributes such as "tagName" that come with the node by default.
              // These are not something we directly define on a gene object, but we still need to be able to access them..
              // In this case we just use the native HTMLElement.prototype accessor
              return Phenotype.get(key).get.call($node);
            }
          }
        },
        set: function(val) {
          // set() overrides the node's setter to create an illusion that users are directly setting an attribute on the node (In reality it's proxied to set the genotype value instead)
          // set() also queues up the mutated variable so it can trigger a phenotype update once the current call stack becomes empty

          // 0. Context Inheritance: If a _variable cannot be found on the current node, cell propagates upwards until it finds a node with the attribute.
          var $current = $node;
          if (!(key in $node.Genotype) && key[0] === '_') {
            while ($current = $current.parentNode) { // eslint-disable-line no-cond-assign
              if ($current && $current.Genotype && (key in $current.Genotype)) {
                break;
              }
            }
          }
          // 1. Set genotype by default
          Genotype.update($current, key, val);
          // 2. DOM attribute handling (anything that doesn't start with $ or _)
          if (key[0] !== '$' && key[0] !== '_') {
            if (key === 'value') {
              return Object.getOwnPropertyDescriptor(Object.getPrototypeOf($node), key).set.call($node, val);
            } else if (key === 'style' && typeof val === 'object') {
              Phenotype.get(key).set.call($node, val);
            } else if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
              $node.setAttribute(key, val);
            } else if (typeof val === 'function') {
              Phenotype.get(key).set.call($node, val);
            }
          }
        },
      });
    },
    build: function($node) {
      // 1. The special attributes "$type", "$text", "$html", "$components" are tracked by default even if not manually defined
      ['$type', '$text', '$html', '$components'].forEach(function(key) {
        if (!(key in $node.Genotype)) Nucleus.set($node, key);
      });
      // 2. Used for context inheritance. We want to track not just the attributes directly defined on the current node but all the attributes inherited from ancestors.
      if ($node.Inheritance) {
        $node.Inheritance.forEach(function(key) {
          Nucleus.set($node, key);
        });
      }
      // 3. Track all keys defined on the gene object
      for (var key in $node.Genotype) {
        Nucleus.set($node, key);
      }
    },
    _queue: [],
    bind: function($node, v) {
      // Binding an attribute to the nucleus.
      // 1. No difference if the attribute is just a regular variable
      // 2. If the attribute is a function, we create a wrapper function that first executes the original function, and then triggers a phenotype update depending on the queue condition
      if (typeof v === 'function') {
        var fun = function() {
          // In the following code, everything inside Nucleus.tick.call is executed AFTER the last line--v.apply($node, arguments)--because it gets added to the event loop and waits until the next render cycle.

          // 1. Schedule phenotype update by wrapping them in a single tick (requestAnimationFrame)
          Nucleus.tick.call($root, function() {
            // At this point, Nucleus._queue contains all the nodes that have been touched since the last tick.
            // We process each node one by one to determine whether to update phenotype and whether to auto-trigger $update().

            // Note: If we're in a middle of multiple nested function calls (fnA calls fnB calls fnC), the queue will be processed from the first function (fnA) only,
            // This is because the Nucleus._queue will have been drained empty by the time the second function (fnB)'s Nucleus.tick.call reaches this point.
            Nucleus._queue.forEach(function($node) {
              var needs_update = false;
              /*
               *  At this point, $node.Dirty looks something like this:
               *  { "_index": 1, "_items": [0,1,2]  }
               *
               *  We go through each and compare with the latest version of the Genotype.
               *  If there's been a change we set the Phenotype and mark it as "needs_update"
               */
              for (var key in $node.Dirty) {
                if (Gene.freeze($node.Genotype[key]) !== $node.Dirty[key]) { // Update phenotype if the new value is different from old (Dirty)
                  Phenotype.set($node, key, $node.Genotype[key]);
                  if (key[0] === '_') { needs_update = true; } // If any of the _ variables have changed, need to call $update
                }
              }
              if (needs_update && '$update' in $node.Genotype && (typeof $node.Genotype.$update === 'function')) {
                Phenotype.$update($node);
              } else { $node.Dirty = null; }
            });

            // Remove the $node from the queue
            var index = Nucleus._queue.indexOf($node);
            if (index !== -1) Nucleus._queue.splice(index, 1);
          });

          // 2. Run the actual function, which will modify the queue
          return v.apply($node, arguments);
        };
        fun.snapshot = v;
        return fun;
      } else {
        return v;
      }
    },
    queue: function($node, key, mode) {
      var val = $node.Genotype[key];
      if (mode === 'r') {
        /*
         * Read mode access => the key was queued as a result of a "get()", which doesn't normally mutate the variable.
         *
         * But we still need to take into account the cases where its descendants get mutated, which happens when we're dealing with an array or an object. For example:
         *  - this._items.push(item);
         *  - this._module.name="cell";
         *
         * In these cases we didn't directly mutate the variables (Direct mutations would have been something like: this._items=[1,2]; or this._module={name: "cell"};)
         * but each variable's value *did* change as a result of each expression. To make sure we don't miss these types, we queue them up with a "r" (read) type.
         * But we only need to do this for objects and arrays. (not string, number, etc. because they can't have descendants)
         */
        if (typeof val !== 'object' && !Array.isArray(val)) return;
      }
      if (Nucleus._queue.indexOf($node) === -1) { Nucleus._queue.push($node); }
      if (!$node.Dirty) $node.Dirty = {};
      if (!(key in $node.Dirty)) {
        /*
         * Caches the original gene under $node.Dirty when a key is touched.
         *
         * {
         *   Dirty: {
         *     "_index": 1,
         *     "_items": [0,1,2]
         *   }
         * }
         *
         */
        $node.Dirty[key] = Gene.freeze($node.Genotype[key]); // stores the original value under "Dirty"
      }
    },
  };
  var God = {
    /*
     * The Creator
     * The only purpose of this module is to create cells and get out of the way.
     */
    detect: function($context) {
      // takes a context, returns all the objects containing thew '$cell' key
      if ($context === undefined) $context = this;
      return Object.keys($context).filter(function(k) {
        try {
          if (/webkitStorageInfo|webkitIndexedDB/.test(k) || $context[k] instanceof $root.Element) return false; // Only look for plain javascript object
          return $context[k] && Object.prototype.hasOwnProperty.call($context[k], '$cell');
        } catch (e) { return false; }
      }).map(function(k) {
        return $context[k];
      });
    },
    plan: function($context) {
      // Prepare the DOM for cell creation by adding prototype methods to nodes.
      // As a result, all HTML elements become autonomous.
      if ($context === undefined) $context = $root;
      else $root = $context;
      $context.DocumentFragment.prototype.$build = $context.Element.prototype.$build = function(gene, inheritance, index, namespace, replace) {
        var $node = Membrane.build(this, gene, index, namespace, replace);
        Genotype.build($node, gene, inheritance || [], index);
        Nucleus.build($node);
        Phenotype.build($node, $node.Genotype);
        return $node;
      };
      $context.DocumentFragment.prototype.$cell = $context.Element.prototype.$cell = function(gene, options) {
        return this.$build(gene, [], null, (options && options.namespace) || null, true);
      };
      $context.DocumentFragment.prototype.$snapshot = $context.Element.prototype.$snapshot = function() {
        var json = JSON.stringify(this.Genotype, function(k, v) {
          if (typeof v === 'function' && v.snapshot) { return '(' + v.snapshot.toString() + ')'; }
          return v;
        });
        return JSON.parse(json, function(k, v) {
          if (typeof v === 'string' && v.indexOf('function') >= 0) { return eval(v); }
          return v;
        });
      };
      if ($root.NodeList && !$root.NodeList.prototype.forEach) $root.NodeList.prototype.forEach = Array.prototype.forEach; // NodeList.forEach override polyfill
    },
    create: function($context) {
      // Automatic cell generation based on declarative rules
      return God.detect($context).map(function(gene) {
        return $context.document.body.$build(gene, []);
      });
    },
  };

  // For testing
  if (typeof exports !== 'undefined') {
    var x = {
      Phenotype: Phenotype,
      Genotype: Genotype,
      Nucleus: Nucleus,
      Gene: Gene,
      Membrane: Membrane,
      God: God,
      plan: God.plan.bind(God),
      create: God.create.bind(God),
    };
    if (typeof module !== 'undefined' && module.exports) { exports = module.exports = x; }
    exports = x;
  } else {
    God.plan(this);
    if (this.addEventListener) {
      // Let there be Cell
      this.addEventListener('load', function() {
        God.create(this);
      });
    }
  }
}(this));
