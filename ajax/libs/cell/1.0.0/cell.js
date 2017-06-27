////////////////////////////////////////////////////////
// Read GENESIS.md for an overview of this source code
(function($root) {
  ////////////////////////////////////////////////////
  // [Membrane] The Shell
  ////////////////////////////////////////////////////
  var Membrane = {
    inject: function(gene, namespace) { // head/body/element with an id => inject instead of appending
      var $node = null;
      if (gene.$type && (gene.$type === 'head' || gene.$type === 'body') && $root.document.getElementsByTagName(gene.$type)) {
        $node = $root.document.getElementsByTagName(gene.$type)[0];
      } else if (gene.id && $root.document.getElementById(gene.id)) {
        $node = $root.document.getElementById(gene.id);
        if ($node.nodeName.toLowerCase() !== (gene.$type || 'div')) {
          var $replacement = Phenotype.$type(gene, namespace);
          $node.parentNode.replaceChild($replacement, $node);
          $node = $replacement;
        }
      }
      if ($node && !$node.Meta) $node.Meta = {};
      return $node;
    },
    create: function($parent, gene, index, namespace) { // create and append
      var $node = Phenotype.$type(gene, namespace);
      if (index !== null && index !== undefined && $parent.childNodes && $parent.childNodes[index]) {
        $parent.insertBefore($node, $parent.childNodes[index]);
      } else {
        $parent.appendChild($node);
      }
      return $node;
    },
    build: function($parent, gene, index, namespace) {
      var $existing = Membrane.inject(gene, namespace);
      if ($existing) return $existing;
      else return Membrane.create($parent, gene, index, namespace);
    },
  };
  ////////////////////////////////////////////////////
  // [Genotype] Model
  ////////////////////////////////////////////////////
  var Genotype = {
    set: function($node, key, val) {
      if (['$init'].indexOf(key) === -1) {
        $node.Genotype[key] = Nucleus.bind($node, val);
      } else {
        $node.Genotype[key] = val;
      }
    },
    update: function($node, key, val) {
      Nucleus.queue($node, key, 'w'); // Schedule update
      Genotype.set($node, key, val); // Set the attribute
    },
    build: function($node, model, inheritance) {
      $node.Genotype = {};
      $node.Inheritance = inheritance;
      for (var key in model) {
        Genotype.set($node, key, model[key]);
      }
    },
  };
  ////////////////////////////////////////////////////
  // [Gene] Gene manipulation functions
  ////////////////////////////////////////////////////
  var Gene = {
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
  ////////////////////////////////////////////////////
  // [Phenotype] View
  ////////////////////////////////////////////////////
  var Phenotype = {
    build: function($node, genotype) {
      for (var key in genotype) {
        if (genotype[key] !== null && genotype[key] !== undefined) {
          Phenotype.update($node, key, genotype[key]);
        }
      }
      Phenotype.$init($node);
    },
    multiline: function(fn) { return /\/\*!?(?:@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//.exec(fn.toString())[1]; },
    update: function($node, key, val) {
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
      } else if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
        if ($node.setAttribute) $node.setAttribute(key, val);
      } else if (typeof val === 'function') {
        $node[key] = val;
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
        return item; // only compare with Cells (that have Genotype), not subsidiary elements created by another javascript library
      });
      if (old.length > 0) {
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
        // first time construction => build a fragment and insert at once
        var $fragment = Phenotype.$type({ $type: 'fragment' });
        var inheritance = $parent.Inheritance;
        for (var key in $parent.Genotype) {
          if (key[0] === '_') inheritance = inheritance.concat([key]);
        }
        while ($parent.firstChild) { $parent.removeChild($parent.firstChild); } // remove empty text nodes
        components.forEach(function(component, index) {
          $fragment.$build(component, inheritance, index, $parent.Meta.namespace);
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
        for (var key in $node.Dirty) { Phenotype.update($node, key, $node.Genotype[key]); }
        $node.Meta.$updated = false;
        $node.Dirty = null;
      }
    },
  };
  ////////////////////////////////////////////////////
  // [Nucleus] Controller
  ////////////////////////////////////////////////////
  var Nucleus = {
    tick: $root.requestAnimationFrame || $root.webkitRequestAnimationFrame || $root.mozRequestAnimationFrame || $root.msRequestAnimationFrame || function(cb) { return $root.setTimeout(cb, 1000/60); },
    set: function($node, key) {
      Object.defineProperty($node, key, {
        configurable: true,
        get: function() {
          if (key[0] === '$' || key[0] === '_') {
            if (key in $node.Genotype) {
              Nucleus.queue($node, key, 'r');
              return $node.Genotype[key];
            } else if (key[0] === '_') {
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
            // Can't use Genotype because sometimes we want to get natively existing attributes
            // we have never explicitly set, such as "tagName", etc.
            if (key === 'value') {
              return Object.getOwnPropertyDescriptor(Object.getPrototypeOf($node), key).get.call($node);
            } else if (key in $node.Genotype) {
              return $node.Genotype[key];
            } else {
              return Object.getOwnPropertyDescriptor($root.HTMLElement.prototype, key).get.call($node);
            }
          }
        },
        set: function(val) {
          // 1. Set genotype by default
          var $current = $node;
          if (!(key in $node.Genotype) && key[0] === '_') { // search upward in case a _ variable doesn't exist on current level
            while ($current = $current.parentNode) { // eslint-disable-line no-cond-assign
              if ($current && $current.Genotype && (key in $current.Genotype)) {
                break;
              }
            }
          }
          Genotype.update($current, key, val);
          // 2. DOM attribute handling (anything that doesn't start with $ or _)
          if (key[0] !== '$' && key[0] !== '_') {
            if (key === 'value') {
              return Object.getOwnPropertyDescriptor(Object.getPrototypeOf($node), key).set.call($node, val);
            } else if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
              $node.setAttribute(key, val);
            } else if (typeof val === 'function') {
              Object.getOwnPropertyDescriptor($root.HTMLElement.prototype, key).set.call($node, val);
            }
          }
        },
      });
    },
    build: function($node) {
      ['$type', '$text', '$html', '$components'].forEach(function(key) {
        if (!(key in $node.Genotype)) Nucleus.set($node, key);
      }); // default monitor keywords
      if ($node.Inheritance) {
        $node.Inheritance.forEach(function(key) {
          Nucleus.set($node, key);
        });
      }
      for (var key in $node.Genotype) {
        Nucleus.set($node, key);
      }
    },
    _queue: [],
    bind: function($node, v) {
      // binding an attribute to nucleus
      if (typeof v === 'function') {
        return function() {
          // [1] Schedule phenotype update by wrapping them in a single tick (requestAnimationFrame)
          // When there's a function call stack (fnA -> fnB -> fnC), the queue will be processed from the first function (fnA) only,
          // after which it will be drained, preventing from further phenotype updates in subsequent ticks
          Nucleus.tick.call($root, function() {
            Nucleus._queue.forEach(function($node) {
              var needs_update = false;
              for (var key in $node.Dirty) {
                if (Gene.freeze($node.Genotype[key]) !== $node.Dirty[key]) { // Update phenotype if the new value is different from old (Dirty)
                  Phenotype.update($node, key, $node.Genotype[key]);
                  if (key[0] === '_') { needs_update = true; } // If any of the _ variables have changed, need to call $update
                }
              }
              if (needs_update && '$update' in $node.Genotype && (typeof $node.Genotype.$update === 'function')) {
                Phenotype.$update($node);
              } else { $node.Dirty = null; }
            });
            var index = Nucleus._queue.indexOf($node);
            if (index !== -1) Nucleus._queue.splice(index, 1);
          });
          // [2] Run the actual function, which will modify the queue
          return v.apply($node, arguments);
        };
      } else {
        return v;
      }
    },
    queue: function($node, key, mode) {
      var val = $node.Genotype[key];
      if (mode === 'r') { // if read mode => only queue objects or arrays, because their decendants may get mutated
        if (typeof val !== 'object' && !Array.isArray(val)) return;
      }
      if (Nucleus._queue.indexOf($node) === -1) { Nucleus._queue.push($node); }
      if (!$node.Dirty) $node.Dirty = {};
      if (!(key in $node.Dirty)) {
        $node.Dirty[key] = Gene.freeze($node.Genotype[key]); // stores the original value under "Dirty"
      }
    },
  };
  //////////////////////////////////////////////////////////////////
  // [God] God's only purpose is to create cells and get out of the way
  //////////////////////////////////////////////////////////////////
  var God = {
    detect: function($context) { // takes a context, returns all the objects containing thew '$cell' key
      if ($context === undefined) $context = this;
      return Object.keys($context).filter(function(k) {
        try {
          if ($context[k] instanceof $root.Element) return false; // Only look for plain javascript object
          return $context[k] && Object.prototype.hasOwnProperty.call($context[k], '$cell');
        } catch (e) { return false; }
      }).map(function(k) {
        return $context[k];
      });
    },
    create: function($context) {
      if ($context === undefined) $context = $root;
      else $root = $context;
      $context.DocumentFragment.prototype.$build = $context.Element.prototype.$build = function(gene, inheritance, index, namespace) {
        var $node = Membrane.build(this, gene, index, namespace);
        Genotype.build($node, gene, inheritance || [], index);
        Nucleus.build($node);
        Phenotype.build($node, $node.Genotype);
        return $node;
      };
      if ($root.NodeList && !$root.NodeList.prototype.forEach) { // NodeList.forEach override polyfill
        $root.NodeList.prototype.forEach = function(callback, argument) {
          argument = argument || $root;
          for (var i = 0; i < this.length; i++) { callback.call(argument, this[i], i, this); }
        };
      }
      return God.detect($context).map(function(gene) { // find all the Cell objects and build
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
      create: God.create.bind(God),
    };
    if (typeof module !== 'undefined' && module.exports) { exports = module.exports = x; }
    exports = x;
  }

  if (this.addEventListener) {
    // Let there be Cell
    this.addEventListener('load', function() {
      God.create(this);
    });
  }
}(this));
