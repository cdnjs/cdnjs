!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.terra=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Terrarium = require('./terrarium.js');
var factory = require('./creature.js');

module.exports = {
  Terrarium: Terrarium,
  registerCreature: factory.registerCreature,
  registerCA: factory.registerCA
};

},{"./creature.js":2,"./terrarium.js":5}],2:[function(require,module,exports){
var _ = require('./util.js');

// abstract factory that adds a superclass of baseCreature
var factory = (function () {
  function baseCreature() {
    this.age = -1;
  }
  function baseCA() {
    this.age = -1;
  }

  baseCreature.prototype.initialEnergy = 50;
  baseCreature.prototype.maxEnergy = 100;
  baseCreature.prototype.efficiency = 0.7;
  baseCreature.prototype.size = 50;
  baseCreature.prototype.actionRadius = 1;
  baseCreature.prototype.sustainability = 2;
  // used as percentages of maxEnergy
  baseCreature.prototype.reproduceLv = 0.70;
  baseCreature.prototype.moveLv = 0;

  baseCreature.prototype.boundEnergy = function() {
    if (this.energy > this.maxEnergy)
      this.energy = this.maxEnergy;
  };

  baseCreature.prototype.isDead = function() {
    return this.energy <= 0;
  };

  baseCreature.prototype.reproduce = function (neighbors) {
    var spots = _.filter(neighbors, function (spot) {
      return !spot.creature;
    });

    if (spots.length) {
      var step = spots[_.random(spots.length - 1)];
      var coords = step.coords;
      var creature = factory.make(this.type);

      var successFn = (function () {
        this.energy -= this.initialEnergy;
        return true;
      }).bind(this);
      var failureFn = this.wait;

      return {
        x: coords.x,
        y: coords.y,
        creature: creature,
        successFn: successFn,
        failureFn: failureFn
      };
    } else return false;
  };

  baseCreature.prototype.move = function (neighbors) {
    var creature = this;

    // first, look for creatures to eat
    var spots = _.filter(neighbors, (function (spot) {
      return spot.creature.size < this.size;
    }).bind(this));

    // if there's not enough food, try to move
    if (spots.length < this.sustainability) {
      spots = _.filter(neighbors, function (spot) {
        return !spot.creature;
      });
    }

    // if we've got a spot to move to...
    if (spots.length) {
      // ...pick one
      var step = spots[_.random(spots.length - 1)];

      var coords = step.coords;

      var successFn = (function () {
        var foodEnergy = step.creature.energy * this.efficiency;
        // add foodEnergy if eating, subtract 10 if moving
        this.energy = this.energy + (foodEnergy || -10);
        // clear the original location
        return false;
      }).bind(this);

      return {
        x: coords.x,
        y: coords.y,
        creature: creature,
        successFn: successFn
      };
    } else return false;
  };

  baseCreature.prototype.wait = function () {
    this.energy -= 5;
    return true;
  };

  baseCreature.prototype.process = function (neighbors, x, y) {
    var step = {};
    var maxEnergy = this.maxEnergy;

    if (this.energy > maxEnergy * this.reproduceLv && this.reproduce) {
      step = this.reproduce(neighbors);
    } else if (this.energy > maxEnergy * this.moveLv && this.move) {
      step = this.move(neighbors);
    }

    var creature = step.creature;

    if (creature) {
      creature.successFn = step.successFn || creature.wait;
      creature.failureFn = step.failureFn || creature.wait;

      return {
        x: step.x,
        y: step.y,
        creature: creature,
        observed: true
      };
    } else return this.energy !== this.maxEnergy;
  };

  baseCA.prototype.actionRadius = 1;
  baseCA.prototype.boundEnergy = function () {};
  baseCA.prototype.isDead = function () { return false; };
  baseCA.prototype.process = function (neighbors, x, y) {};
  baseCA.prototype.wait = function () {};

  // Storage for our creature types
  var types = {};

  return {
    make: function (type, options) {
      var Creature = types[type];
      return (Creature ? new Creature(options) : false);
    },

    registerCreature: function (options, init) {
      // required attributes
      var type = options.type;
      // only register classes that fulfill the creature contract
      if (typeof type === 'string' && typeof types[type] === 'undefined') {
        // set the constructor, including init if it's defined
        if (typeof init === 'function') {
          types[type] = function () {
            this.energy = this.initialEnergy;
            init.call(this);
          };
        } else {
          types[type] = function () {
            this.energy = this.initialEnergy;
          };
        }

        var color = options.color || options.colour;
        // set the color randomly if none is provided
        if (typeof color !== 'object' || color.length !== 3) {
          options.color = [_.random(255), _.random(255), _.random(255)];
        }

        types[type].prototype = new baseCreature();
        types[type].prototype.constructor = types[type];

        _.each(options, function(value, key) {
          types[type].prototype[key] = value;
        });

        types[type].prototype.successFn = types[type].prototype.wait;
        types[type].prototype.failureFn = types[type].prototype.wait;
        types[type].prototype.energy = options.initialEnergy;

        return true;
      } else return false;
    },

    registerCA: function (options, init) {
      // required attributes
      var type = options.type;
      // only register classes that fulfill the creature contract
      if (typeof type === 'string' && typeof types[type] === 'undefined') {
        // set the constructor, including init if it's defined
        types[type] = typeof init === 'function' ?
           function () { init.call(this); } :
           function () {};

        var color = options.color = options.color || options.colour;
        // set the color randomly if none is provided
        if (typeof color !== 'object' || color.length !== 3) {
          options.color = [_.random(255), _.random(255), _.random(255)];
        }

        options.colorFn = options.colorFn || options.colourFn;

        types[type].prototype = new baseCA();
        types[type].prototype.constructor = types[type];

        _.each(options, function(value, key) {
          types[type].prototype[key] = value;
        });

        return true;
      } else return false;
    }
  };
})();

module.exports = factory;

},{"./util.js":6}],3:[function(require,module,exports){
var _ = require('./util.js');

module.exports = function (canvas, grid, cellSize, trails, background) {
  var ctx = canvas.getContext('2d');
  if (trails && background) {
    ctx.fillStyle = 'rgba(' + background + ',' + (1 - trails) + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (trails) {
    throw "Background must also be set for trails";
  } else ctx.clearRect(0, 0, canvas.width, canvas.height);

  _.each(grid, function (column, x) {
    _.each(column, function (creature, y) {
      if (creature) {
        var color = creature.colorFn ?
          creature.colorFn() :
          creature.color + ',' + creature.energy / creature.maxEnergy;

        ctx.fillStyle = 'rgba(' + color + ')';

        if (creature.character) {
          ctx.fillText(creature.character, x * cellSize, y * cellSize + cellSize);
        } else {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    });
  });
};

},{"./util.js":6}],4:[function(require,module,exports){
// Creates an HD canvas element on page and
// returns a reference to the element
var createCanvasElement = function (width, height, cellSize, id, insertAfter, background) {
  width *= cellSize;
  height *= cellSize;

  // Creates a scaled-up canvas based on the device's
  // resolution, then displays it properly using styles
  function createHDCanvas () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Creates a dummy canvas to test device's pixel ratio
    var ratio = (function () {
      var ctx = document.createElement('canvas').getContext('2d');
      var dpr = window.devicePixelRatio || 1;
      var bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
      return dpr / bsr;
    })();

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(ratio, ratio);
    ctx.font = 'bold ' + cellSize + 'px Arial';

    if (id) canvas.id = id;
    if (background) canvas.style.background = 'rgb(' + background + ')';

    return canvas;
  }

  var canvas = createHDCanvas();

  if (insertAfter) insertAfter.parentNode.insertBefore(canvas, insertAfter.nextSibling);
  else document.body.appendChild(canvas);

  return canvas;
};

module.exports = {
  createCanvasElement: createCanvasElement
};

},{}],5:[function(require,module,exports){
var _ = require('./util');
var factory = require('./creature.js');
var display = require('./display.js');
var dom = require('./dom.js');

/**
 * Terrarium constructor function
 * @param {int} width             number of cells in the x-direction
 * @param {int} height            number of cells in the y-direction
 * @param {object} options
 *   @param {string} id             id assigned to the generated canvas
 *   @param {int} cellSize          pixel width of each cell (default 10)
 *   @param {string} insertAfter    id of the element to insert the canvas after
 *   @param {float} trails          a number from [0, 1] indicating whether trails should
 *                                    be drawn (0 = no trails, 1 = neverending trails)
 *                                    "background" option is required if trails is set
 *   @param {array} background      an RGB triplet for the canvas' background
 */
function Terrarium (width, height, options) {
  var cellSize, neighborhood;

  // parse width and height as integers
  width = Math.ceil(width);
  height = Math.ceil(height);

  // set default options
  options = options || {};
  cellSize = options.cellSize || 10;
  neighborhood = options.neighborhood || options.neighbourhood;
  if (typeof neighborhood === 'string') neighborhood = neighborhood.toLowerCase();

  this.width = width;
  this.height = height;
  this.cellSize = cellSize;
  this.trails = options.trails;
  this.background = options.background;
  this.canvas = dom.createCanvasElement(width, height, cellSize, options.id, options.insertAfter, this.background);
  this.grid = [];
  this.nextFrame = false;
  this.hasChanged = false;
  this.getNeighborCoords = _.getNeighborCoordsFn(width, height, neighborhood === 'vonneumann', options.periodic);
}

/**
 * Create a grid and fill it by using a function, 2-d array, or uniform type
 * @param  {*} content  if  function, fill grid according to fn(x, y)
 *                        if array, fill grid cells with the corresponding creatureType
 *                        if string, fill grid with that creatureType
 *                        otherwise, create empty grid
 * @return {grid}       a grid adhering to the above rules
 */
Terrarium.prototype.makeGrid = function (content) {
  var grid = [], type = typeof content;
  for (var x = 0, _w = this.width; x < _w; x++) {
    grid.push([]);
    for (var y = 0, _h = this.height; y < _h; y++) {
      grid[x].push(factory.make(
        type === 'function' ? content(x, y) :
        type === 'object' && content.length ? (content[y] || [])[x] :
        type === 'string' ? content :
        undefined
      ));
    }
  } return grid;
};

/**
 * Create a grid and fill it randomly with a set creature distribution
 * @param  {array} distribution   an array of arrays of the form [string 'creatureName', float fillPercent]
 */
Terrarium.prototype.makeGridWithDistribution = function (distribution) {
  var current, rand = 0, grid = [];
  for (var x = 0, _w = this.width; x < _w; x++) {
    grid.push([]);
    for (var y = 0, _h = this.height; y < _h; y++) {
      grid[x].push(factory.make(_.pickRandomWeighted(distribution)));
    }
  } return grid;
};

/**
 * Returns the next step of the simulation
 * @param  {} steps   the number of steps to run through before returning
 * @return {grid}     a new grid after <steps> || 1 steps
 */
Terrarium.prototype.step = function (steps) {
  function copyAndRemoveInner (origCreature) {
    if (origCreature) {
      var copy = _.assign(new (origCreature.constructor)(), origCreature);
      var dead = copy && copy.isDead();
      if (dead && !self.hasChanged) self.hasChanged = true;
      copy.age++;

      return !dead ? copy : false;
    } else return false;
  }

  function copyAndRemove (origCols) {
    return _.map(origCols, copyAndRemoveInner);
  }

  // TODO: Switch coords to just x and y to be consistent w/ pickWinnerInner
  function zipCoordsWithNeighbors (coords) {
    return {
      coords: coords,
      creature: oldGrid[coords.x][coords.y]
    };
  }

  function processLoser (loser) {
    var loserCreature = loser.creature;
    if (loserCreature) {
      loserCreature.failureFn();
      loserCreature.boundEnergy();
    } else {
      loser.wait();
      loser.boundEnergy();
    }
  }

  function processCreaturesInner (creature, x, y) {
    if (creature) {
      var neighbors = _.map(
        self.getNeighborCoords(x, y, creature.actionRadius),
        zipCoordsWithNeighbors
      );
      var result = creature.process(neighbors, x, y);
      if (typeof result === 'object') {
        var eigenColumn = eigenGrid[result.x];
        var returnedCreature = result.creature;
        var returnedY = result.y;

        if (!eigenColumn[returnedY]) eigenColumn[returnedY] = [];

        eigenColumn[returnedY].push({
          x: x,
          y: y,
          creature: returnedCreature
        });
        if (!self.hasChanged && result.observed) self.hasChanged = true;
      } else {
        if (result && !self.hasChanged) self.hasChanged = true;
        processLoser(creature);
      }
    }
  }

  function processCreatures (column, x) {
    _.each(column, function (creature, y) { processCreaturesInner(creature, x, y); });
  }

  function pickWinnerInner (superposition, x, y) {
    if (superposition) {
      var winner = superposition.splice(_.random(superposition.length - 1), 1)[0];
      var winnerCreature = winner.creature;

      // clear the original creature's square if successFn returns false
      if (!winnerCreature.successFn()) {
        newGrid[winner.x][winner.y] = false;
      }
      // TODO: so many calls to this. Can we just run it once at the start of a step?
      winnerCreature.boundEnergy();

      // put the winner in its rightful place
      newGrid[x][y] = winnerCreature;

      // ...and call wait() on the losers. We can do this without
      // affecting temporal consistency because all callbacks have
      // already been created with prior conditions
      _.each(superposition, processLoser);
    }
  }

  function pickWinner (column, x) {
    _.each(column, function (superposition, y) { pickWinnerInner(superposition, x, y); });
  }

  var self = this;
  var gridWidth = this.width;
  var gridHeight = this.height;
  var oldGrid = this.grid, newGrid, eigenGrid;

  if (typeof steps !== 'number') steps = 1;

  while (steps--) {
    this.hasChanged = false;

    oldGrid = newGrid ? _.clone(newGrid) : this.grid;

    // copy the old grid & remove dead creatures
    newGrid = _.map(oldGrid, copyAndRemove);

    // create an empty grid to hold creatures competing for the same square
    eigenGrid = this.makeGrid();

    // Add each creature's intended destination to the eigenGrid
    _.each(newGrid, processCreatures);

    // Choose a winner from each of the eigenGrid's superpositions
    _.each(eigenGrid, pickWinner);

    if (!this.hasChanged) return false;
  }

  return newGrid;
};

/**
 * Updates the canvas to reflect the current grid
 */
Terrarium.prototype.draw = function () {
  display(this.canvas, this.grid, this.cellSize, this.trails, this.background);
};

/**
 * Starts animating the simulation. Can be called with only a function.
 * @param  {int}   steps   the simulation will stop after <steps> steps if specified
 * @param  {Function} fn   called as a callback once the animation finishes
 */
Terrarium.prototype.animate = function (steps, fn) {
  function tick () {
    var grid = self.step();
    if (grid) {
      self.grid = grid;
      self.draw();
      if (++i !== steps) return self.nextFrame = requestAnimationFrame(tick);
    } // if grid hasn't changed || reached last step
    self.nextFrame = false;
    if (fn) fn();
  }

  if (typeof steps === 'function') {
    fn = steps;
    steps = null;
  }

  if (!this.nextFrame) {
    var i = 0;
    var self = this;
    self.nextFrame = requestAnimationFrame(tick);
  }
};

/**
 * Stops a currently running animation
 */
Terrarium.prototype.stop = function () {
  cancelAnimationFrame(this.nextFrame);
  this.nextFrame = false;
};

/**
 * Stops any currently running animation and cleans up the DOM
 */
Terrarium.prototype.destroy = function () {
  var canvas = this.canvas;
  this.stop();
  canvas.parentNode.removeChild(canvas);
};

module.exports = Terrarium;

},{"./creature.js":2,"./display.js":3,"./dom.js":4,"./util":6}],6:[function(require,module,exports){
// Seed Math.random() with seedrandom
require('../bower_components/seedrandom/seedrandom.js')('terra :)', {global: true});

// an extended custom build of lodash, generated with:
// lodash exports=commonjs include=assign,clone,filter,each,map,random,reduce,some
var _ = require('../lodash_custom/lodash.custom.min.js')._;

/**
 * Takes a cell and returns the coordinates of its neighbors
 * @param  {int} x0     - x position of cell
 * @param  {int} y0     - y position of cell
 * @param  {int} xMax   - maximum x index i.e. grid width
 * @param  {int} yMax   - maximum x index i.e. grid height
 * @param  {int} radius - (default = 1) neighbor radius
 * @return {array}      - an array of [x, y] pairs of the neighboring cells
 */
_.getNeighborCoordsFn = function (xMax, yMax, vonNeumann, periodic) {
  if (periodic) {
    if (vonNeumann) {
      // periodic von neumann
      return function (x0, y0, radius) {
        var coords = [], x, rX, y, rY, rYMax;

        for (rX = -radius; rX <= radius; ++rX) {
          rYMax = radius - Math.abs(rX);
          for (rY = -rYMax; rY <= rYMax; ++rY) {
            x = ((rX + x0) % xMax + xMax) % xMax;
            y = ((rY + y0) % yMax + yMax) % yMax;
            if (x !== x0 || y !== y0) {
              coords.push({
                x: x,
                y: y
              });
            }
          }
        }

        return coords;
      };
    }
    else {
      // periodic moore
      return function (x0, y0, radius) {
        var coords = [], x, xLo, xHi, y, yLo, yHi;

        xLo = x0 - radius;
        yLo = y0 - radius;
        xHi = x0 + radius;
        yHi = y0 + radius;

        for (x = xLo; x <= xHi; ++x) {
          for (y = yLo; y <= yHi; ++y) {
            if (x !== x0 || y !== y0) {
              coords.push({
                x: (x % xMax + xMax) % xMax,
                y: (y % yMax + yMax) % yMax
              });
            }
          }
        }

        return coords;
      };
    }
  } else {
    // non-periodic, need to restrict to within [0, max)
    xMax -= 1;
    yMax -= 1;

    if (vonNeumann) {
      //non-periodic von-neumann
      return function (x0, y0, radius) {
        var coords = [], x, rX, y, rY, rYMax;

        for (rX = -radius; rX <= radius; ++rX) {
          rYMax = radius - Math.abs(rX);
          for (rY = -rYMax; rY <= rYMax; ++rY) {
            x = rX + x0;
            y = rY + y0;
            if (x >= 0 && y >=0 && x <= xMax && y <= yMax && (x !== x0 || y !== y0)) {
              coords.push({
                x: x,
                y: y
              });
            }
          }
        }

        return coords;
      };
    }
    else {
      // non-periodic moore
      return function (x0, y0, radius) {
        var coords = [], x, xLo, xHi, y, yLo, yHi;

        xLo = Math.max(0, x0 - radius);
        yLo = Math.max(0, y0 - radius);
        xHi = Math.min(x0 + radius, xMax);
        yHi = Math.min(y0 + radius, yMax);

        for (x = xLo; x <= xHi; ++x)
          for (y = yLo; y <= yHi; ++y)
            if (x !== x0 || y !== y0)
              coords.push({ x: x, y: y });

        return coords;
      };
    }
  }
};

_.pickRandomWeighted = function (weightedArrays) {
  var sum = 0, rand = _.random(100, true);
  var cur, i;
  for (i = 0, _len = weightedArrays.length; i < _len; i++) {
    cur = weightedArrays[i];
    sum += cur[1];
    if (sum > rand) return cur[0];
  } return false;
};

/**
 * CommonJS exports
 * @type {Object}
 */
module.exports = _;

},{"../bower_components/seedrandom/seedrandom.js":7,"../lodash_custom/lodash.custom.min.js":8}],7:[function(require,module,exports){
/**

seedrandom.js
=============

Seeded random number generator for Javascript.

version 2.3.6<br>
Author: David Bau<br>
Date: 2014 May 14

Can be used as a plain script, a node.js module or an AMD module.

Script tag usage
----------------

<script src=//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.6/seedrandom.min.js>
</script>

// Sets Math.random to a PRNG initialized using the given explicit seed.
Math.seedrandom('hello.');
console.log(Math.random());          // Always 0.9282578795792454
console.log(Math.random());          // Always 0.3752569768646784

// Sets Math.random to an ARC4-based PRNG that is autoseeded using the
// current time, dom state, and other accumulated local entropy.
// The generated seed string is returned.
Math.seedrandom();
console.log(Math.random());          // Reasonably unpredictable.

// Seeds using the given explicit seed mixed with accumulated entropy.
Math.seedrandom('added entropy.', { entropy: true });
console.log(Math.random());          // As unpredictable as added entropy.

// Use "new" to create a local prng without altering Math.random.
var myrng = new Math.seedrandom('hello.');
console.log(myrng());                // Always 0.9282578795792454


Node.js usage
-------------

npm install seedrandom

// Local PRNG: does not affect Math.random.
var seedrandom = require('seedrandom');
var rng = seedrandom('hello.');
console.log(rng());                  // Always 0.9282578795792454

// Autoseeded ARC4-based PRNG.
rng = seedrandom();
console.log(rng());                  // Reasonably unpredictable.

// Global PRNG: set Math.random.
seedrandom('hello.', { global: true });
console.log(Math.random());          // Always 0.9282578795792454

// Mixing accumulated entropy.
rng = seedrandom('added entropy.', { entropy: true });
console.log(rng());                  // As unpredictable as added entropy.


Require.js usage
----------------

Similar to node.js usage:

bower install seedrandom

require(['seedrandom'], function(seedrandom) {
  var rng = seedrandom('hello.');
  console.log(rng());                  // Always 0.9282578795792454
});


Network seeding via a script tag
--------------------------------

<script src=//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.6/seedrandom.min.js>
</script>
<!-- Seeds using urandom bits from a server. -->
<script src=//jsonlib.appspot.com/urandom?callback=Math.seedrandom">
</script>

Examples of manipulating the seed for various purposes:

var seed = Math.seedrandom();        // Use prng with an automatic seed.
document.write(Math.random());       // Pretty much unpredictable x.

var rng = new Math.seedrandom(seed); // A new prng with the same seed.
document.write(rng());               // Repeat the 'unpredictable' x.

function reseed(event, count) {      // Define a custom entropy collector.
  var t = [];
  function w(e) {
    t.push([e.pageX, e.pageY, +new Date]);
    if (t.length < count) { return; }
    document.removeEventListener(event, w);
    Math.seedrandom(t, { entropy: true });
  }
  document.addEventListener(event, w);
}
reseed('mousemove', 100);            // Reseed after 100 mouse moves.

The "pass" option can be used to get both the prng and the seed.
The following returns both an autoseeded prng and the seed as an object,
without mutating Math.random:

var obj = Math.seedrandom(null, { pass: function(prng, seed) {
  return { random: prng, seed: seed };
}});


Version notes
-------------

The random number sequence is the same as version 1.0 for string seeds.
* Version 2.0 changed the sequence for non-string seeds.
* Version 2.1 speeds seeding and uses window.crypto to autoseed if present.
* Version 2.2 alters non-crypto autoseeding to sweep up entropy from plugins.
* Version 2.3 adds support for "new", module loading, and a null seed arg.
* Version 2.3.1 adds a build environment, module packaging, and tests.
* Version 2.3.4 fixes bugs on IE8, and switches to MIT license.
* Version 2.3.6 adds a readable options object argument.

The standard ARC4 key scheduler cycles short keys, which means that
seedrandom('ab') is equivalent to seedrandom('abab') and 'ababab'.
Therefore it is a good idea to add a terminator to avoid trivial
equivalences on short string seeds, e.g., Math.seedrandom(str + '\0').
Starting with version 2.0, a terminator is added automatically for
non-string seeds, so seeding with the number 111 is the same as seeding
with '111\0'.

When seedrandom() is called with zero args or a null seed, it uses a
seed drawn from the browser crypto object if present.  If there is no
crypto support, seedrandom() uses the current time, the native rng,
and a walk of several DOM objects to collect a few bits of entropy.

Each time the one- or two-argument forms of seedrandom are called,
entropy from the passed seed is accumulated in a pool to help generate
future seeds for the zero- and two-argument forms of seedrandom.

On speed - This javascript implementation of Math.random() is several
times slower than the built-in Math.random() because it is not native
code, but that is typically fast enough.  Some details (timings on
Chrome 25 on a 2010 vintage macbook):

* seeded Math.random()          - avg less than 0.0002 milliseconds per call
* seedrandom('explicit.')       - avg less than 0.2 milliseconds per call
* seedrandom('explicit.', true) - avg less than 0.2 milliseconds per call
* seedrandom() with crypto      - avg less than 0.2 milliseconds per call

Autoseeding without crypto is somewhat slower, about 20-30 milliseconds on
a 2012 windows 7 1.5ghz i5 laptop, as seen on Firefox 19, IE 10, and Opera.
Seeded rng calls themselves are fast across these browsers, with slowest
numbers on Opera at about 0.0005 ms per seeded Math.random().


LICENSE (MIT)
-------------

Copyright (c)2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

/**
 * All code is in an anonymous closure to keep the global namespace clean.
 */
(function (
    global, pool, math, width, chunks, digits, module, define, rngname) {

//
// The following constants are related to IEEE 754 limits.
//
var startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,

//
// seedrandom()
// This is the seedrandom function described above.
//
impl = math['seed' + rngname] = function(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      // If called as a method of Math (Math.seedrandom()), mutate Math.random
      // because that is how seedrandom.js has worked since v1.0.  Otherwise,
      // it is a newer calling convention, so return the prng directly.
      function(prng, seed, is_math_call) {
        if (is_math_call) { math[rngname] = prng; return seed; }
        else return prng;
      })(

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  }, shortseed, 'global' in options ? options.global : (this == math));
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability discard an initial batch of values.
    // See http://www.rsa.com/rsalabs/node.asp?id=2009
  })(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto if available.
//
/** @param {Uint8Array|Navigator=} seed */
function autoseed(seed) {
  try {
    global.crypto.getRandomValues(seed = new Uint8Array(width));
    return tostring(seed);
  } catch (e) {
    return [+new Date, global, (seed = global.navigator) && seed.plugins,
            global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math[rngname](), pool);

//
// Nodejs and AMD support: export the implemenation as a module using
// either convention.
//
if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
}

// End anonymous scope, and pass initial values.
})(
  this,   // global window object
  [],     // pool: entropy pool starts empty
  Math,   // math: package containing random, pow, and seedrandom
  256,    // width: each RC4 output is 0 <= x < 256
  6,      // chunks: at least six RC4 outputs for each double
  52,     // digits: there are 52 significant digits in a double
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define,  // present with an AMD loader
  'random'// rngname: name for Math.random and Math.seedrandom
);

},{}],8:[function(require,module,exports){
(function (global){
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash exports="commonjs" include="assign,clone,filter,each,map,random,reduce,some"`
 */
;(function(){function n(n){return typeof n.toString!="function"&&typeof(n+"")=="string"}function t(n){n.length=0,S.length<C&&S.push(n)}function e(n,t){var e;t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var o=Array(0>e?0:e);++r<e;)o[r]=n[t+r];return o}function r(){}function o(n){function t(){if(o){var n=e(o);at.apply(n,arguments)}if(this instanceof t){var c=a(r.prototype),n=r.apply(c,n||arguments);return h(n)?n:c}return r.apply(u,n||arguments)}var r=n[0],o=n[2],u=n[4];return dt(t,n),t
}function u(r,o,a,c,i){if(a){var l=a(r);if(typeof l!="undefined")return l}if(!h(r))return r;var f=tt.call(r);if(!G[f]||!bt.nodeClass&&n(r))return r;var p=ht[f];switch(f){case R:case L:return new p(+r);case T:case M:return new p(r);case K:return l=p(r.source,D.exec(r)),l.lastIndex=r.lastIndex,l}if(f=mt(r),o){var s=!c;c||(c=S.pop()||[]),i||(i=S.pop()||[]);for(var g=c.length;g--;)if(c[g]==r)return i[g];l=f?p(r.length):{}}else l=f?e(r):xt({},r);return f&&(ut.call(r,"index")&&(l.index=r.index),ut.call(r,"input")&&(l.input=r.input)),o?(c.push(r),i.push(l),(f?_t:St)(r,function(n,t){l[t]=u(n,o,a,c,i)
}),s&&(t(c),t(i)),l):l}function a(n){return h(n)?ft(n):{}}function c(n,t,e){if(typeof n!="function")return _;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(bt.funcNames&&(r=!n.name),r=r||!bt.funcDecomp,!r)){var o=ot.call(n);bt.funcNames||(r=!P.test(o)),r||(r=F.test(o),dt(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,o){return n.call(t,e,r,o)
};case 4:return function(e,r,o,u){return n.call(t,e,r,o,u)}}return w(n,t)}function i(n){function t(){var n=p?l:this;if(u){var b=e(u);at.apply(b,arguments)}return(c||g)&&(b||(b=e(arguments)),c&&at.apply(b,c),g&&b.length<f)?(o|=16,i([r,y?o:-4&o,b,null,l,f])):(b||(b=arguments),s&&(r=n[v]),this instanceof t?(n=a(r.prototype),b=r.apply(n,b),h(b)?b:n):r.apply(n,b))}var r=n[0],o=n[1],u=n[2],c=n[3],l=n[4],f=n[5],p=1&o,s=2&o,g=4&o,y=8&o,v=r;return dt(t,n),t}function l(e,r,o,u,a,c){if(o){var i=o(e,r);if(typeof i!="undefined")return!!i
}if(e===r)return 0!==e||1/e==1/r;if(e===e&&!(e&&H[typeof e]||r&&H[typeof r]))return false;if(null==e||null==r)return e===r;var f=tt.call(e),p=tt.call(r);if(f==B&&(f=z),p==B&&(p=z),f!=p)return false;switch(f){case R:case L:return+e==+r;case T:return e!=+e?r!=+r:0==e?1/e==1/r:e==+r;case K:case M:return e==r+""}if(p=f==N,!p){var s=ut.call(e,"__wrapped__"),h=ut.call(r,"__wrapped__");if(s||h)return l(s?e.__wrapped__:e,h?r.__wrapped__:r,o,u,a,c);if(f!=z||!bt.nodeClass&&(n(e)||n(r)))return false;if(f=!bt.argsObject&&g(e)?Object:e.constructor,s=!bt.argsObject&&g(r)?Object:r.constructor,f!=s&&!(y(f)&&f instanceof f&&y(s)&&s instanceof s)&&"constructor"in e&&"constructor"in r)return false
}for(f=!a,a||(a=S.pop()||[]),c||(c=S.pop()||[]),s=a.length;s--;)if(a[s]==e)return c[s]==r;var v=0,i=true;if(a.push(e),c.push(r),p){if(s=e.length,v=r.length,(i=v==s)||u)for(;v--;)if(p=s,h=r[v],u)for(;p--&&!(i=l(e[p],h,o,u,a,c)););else if(!(i=l(e[v],h,o,u,a,c)))break}else Ot(r,function(n,t,r){return ut.call(r,t)?(v++,i=ut.call(e,t)&&l(e[t],n,o,u,a,c)):void 0}),i&&!u&&Ot(e,function(n,t,e){return ut.call(e,t)?i=-1<--v:void 0});return a.pop(),c.pop(),f&&(t(a),t(c)),i}function f(n,t,r,u,a,c){var l=1&t,p=4&t,s=16&t,g=32&t;
if(!(2&t||y(n)))throw new TypeError;s&&!r.length&&(t&=-17,s=r=false),g&&!u.length&&(t&=-33,g=u=false);var h=n&&n.__bindData__;return h&&true!==h?(h=e(h),h[2]&&(h[2]=e(h[2])),h[3]&&(h[3]=e(h[3])),!l||1&h[1]||(h[4]=a),!l&&1&h[1]&&(t|=8),!p||4&h[1]||(h[5]=c),s&&at.apply(h[2]||(h[2]=[]),r),g&&it.apply(h[3]||(h[3]=[]),u),h[1]|=t,f.apply(null,h)):(1==t||17===t?o:i)([n,t,r,u,a,c])}function p(){q.h=I,q.b=q.c=q.g=q.i="",q.e="t",q.j=true;for(var n,t=0;n=arguments[t];t++)for(var e in n)q[e]=n[e];t=q.a,q.d=/^[^,]+/.exec(t)[0],n=Function,t="return function("+t+"){",e=q;
var r="var n,t="+e.d+",E="+e.e+";if(!t)return E;"+e.i+";";e.b?(r+="var u=t.length;n=-1;if("+e.b+"){",bt.unindexedChars&&(r+="if(s(t)){t=t.split('')}"),r+="while(++n<u){"+e.g+";}}else{"):bt.nonEnumArgs&&(r+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+e.g+";}}else{"),bt.enumPrototypes&&(r+="var G=typeof t=='function';"),bt.enumErrorProps&&(r+="var F=t===k||t instanceof Error;");var o=[];if(bt.enumPrototypes&&o.push('!(G&&n=="prototype")'),bt.enumErrorProps&&o.push('!(F&&(n=="message"||n=="name"))'),e.j&&e.f)r+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",o.length&&(r+="if("+o.join("&&")+"){"),r+=e.g+";",o.length&&(r+="}"),r+="}";
else if(r+="for(n in t){",e.j&&o.push("m.call(t, n)"),o.length&&(r+="if("+o.join("&&")+"){"),r+=e.g+";",o.length&&(r+="}"),r+="}",bt.nonEnumShadows){for(r+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;7>k;k++)r+="n='"+e.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",e.j||(r+="||(!x[n]&&t[n]!==A[n])"),r+="){"+e.g+"}";r+="}"}return(e.b||bt.nonEnumArgs)&&(r+="}"),r+=e.c+";return E",n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L",t+r+"}")(c,$,Y,ut,A,g,mt,v,q.f,Z,H,vt,M,nt,tt)
}function s(n){return typeof n=="function"&&et.test(n)}function g(n){return n&&typeof n=="object"&&typeof n.length=="number"&&tt.call(n)==B||false}function y(n){return typeof n=="function"}function h(n){return!(!n||!H[typeof n])}function v(n){return typeof n=="string"||n&&typeof n=="object"&&tt.call(n)==M||false}function b(n,t,e){var o=[];if(t=r.createCallback(t,e,3),mt(n)){e=-1;for(var u=n.length;++e<u;){var a=n[e];t(a,e,n)&&o.push(a)}}else _t(n,function(n,e,r){t(n,e,r)&&o.push(n)});return o}function d(n,t,e){if(t&&typeof e=="undefined"&&mt(n)){e=-1;
for(var r=n.length;++e<r&&false!==t(n[e],e,n););}else _t(n,t,e);return n}function m(n,t,e){var o=-1,u=n?n.length:0,a=Array(typeof u=="number"?u:0);if(t=r.createCallback(t,e,3),mt(n))for(;++o<u;)a[o]=t(n[o],o,n);else _t(n,function(n,e,r){a[++o]=t(n,e,r)});return a}function j(n,t,e,o){var u=3>arguments.length;if(t=r.createCallback(t,o,4),mt(n)){var a=-1,c=n.length;for(u&&(e=n[++a]);++a<c;)e=t(e,n[a],a,n)}else _t(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)});return e}function E(n,t,e){var o;if(t=r.createCallback(t,e,3),mt(n)){e=-1;
for(var u=n.length;++e<u&&!(o=t(n[e],e,n)););}else _t(n,function(n,e,r){return!(o=t(n,e,r))});return!!o}function w(n,t){return 2<arguments.length?f(n,17,e(arguments,2),null,t):f(n,1,null,null,t)}function _(n){return n}function x(){}function O(n){return function(t){return t[n]}}var S=[],A={},C=40,D=/\w*$/,P=/^\s*function[ \n\r\t]+\w/,F=/\bthis\b/,I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),B="[object Arguments]",N="[object Array]",R="[object Boolean]",L="[object Date]",$="[object Error]",T="[object Number]",z="[object Object]",K="[object RegExp]",M="[object String]",G={"[object Function]":false};
G[B]=G[N]=G[R]=G[L]=G[T]=G[z]=G[K]=G[M]=true;var J={configurable:false,enumerable:false,value:null,writable:false},q={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:false},H={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},V=H[typeof window]&&window||this,W=H[typeof exports]&&exports&&!exports.nodeType&&exports,Q=H[typeof module]&&module&&!module.nodeType&&module,U=H[typeof global]&&global;!U||U.global!==U&&U.window!==U||(V=U);var X=[],Y=Error.prototype,Z=Object.prototype,nt=String.prototype,tt=Z.toString,et=RegExp("^"+(tt+"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),rt=Math.floor,ot=Function.prototype.toString,ut=Z.hasOwnProperty,at=X.push,ct=Z.propertyIsEnumerable,it=X.unshift,lt=function(){try{var n={},t=s(t=Object.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ft=s(ft=Object.create)&&ft,pt=s(pt=Array.isArray)&&pt,st=s(st=Object.keys)&&st,gt=Math.min,yt=Math.random,ht={};ht[N]=Array,ht[R]=Boolean,ht[L]=Date,ht["[object Function]"]=Function,ht[z]=Object,ht[T]=Number,ht[K]=RegExp,ht[M]=String;var vt={};vt[N]=vt[L]=vt[T]={constructor:true,toLocaleString:true,toString:true,valueOf:true},vt[R]=vt[M]={constructor:true,toString:true,valueOf:true},vt[$]=vt["[object Function]"]=vt[K]={constructor:true,toString:true},vt[z]={constructor:true},function(){for(var n=I.length;n--;){var t,e=I[n];
for(t in vt)ut.call(vt,t)&&!ut.call(vt[t],e)&&(vt[t][e]=false)}}();var bt=r.support={};!function(){function n(){this.x=1}var t={0:1,length:1},e=[];n.prototype={valueOf:1,y:1};for(var r in new n)e.push(r);for(r in arguments);bt.argsClass=tt.call(arguments)==B,bt.argsObject=arguments.constructor==Object&&!(arguments instanceof Array),bt.enumErrorProps=ct.call(Y,"message")||ct.call(Y,"name"),bt.enumPrototypes=ct.call(n,"prototype"),bt.funcDecomp=!s(V.k)&&F.test(function(){return this}),bt.funcNames=typeof Function.name=="string",bt.nonEnumArgs=0!=r,bt.nonEnumShadows=!/valueOf/.test(e),bt.spliceObjects=(X.splice.call(t,0,1),!t[0]),bt.unindexedChars="xx"!="x"[0]+Object("x")[0];
try{bt.nodeClass=!(tt.call(document)==z&&!({toString:0}+""))}catch(o){bt.nodeClass=true}}(1),ft||(a=function(){function n(){}return function(t){if(h(t)){n.prototype=t;var e=new n;n.prototype=null}return e||V.Object()}}());var dt=lt?function(n,t){J.value=t,lt(n,"__bindData__",J)}:x;bt.argsClass||(g=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ut.call(n,"callee")&&!ct.call(n,"callee")||false});var mt=pt||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&tt.call(n)==N||false
},jt=p({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),Et=st?function(n){return h(n)?bt.enumPrototypes&&typeof n=="function"||bt.nonEnumArgs&&n.length&&g(n)?jt(n):st(n):[]}:jt,U={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:Et,g:"if(e(t[n],n,g)===false)return E"},pt={a:"z,H,l",i:"var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",v:Et,g:"if(typeof E[n]=='undefined')E[n]=t[n]",c:"}}"},wt={i:"if(!B[typeof t])return E;"+U.i,b:false},_t=p(U),xt=p(pt,{i:pt.i.replace(";",";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),g:"E[n]=e?e(E[n],t[n]):t[n]"}),Ot=p(U,wt,{j:false}),St=p(U,wt);
y(/x/)&&(y=function(n){return typeof n=="function"&&"[object Function]"==tt.call(n)}),r.assign=xt,r.bind=w,r.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return c(n,t,e);if("object"!=r)return O(n);var o=Et(n),u=o[0],a=n[u];return 1!=o.length||a!==a||h(a)?function(t){for(var e=o.length,r=false;e--&&(r=l(t[o[e]],n[o[e]],null,true)););return r}:function(n){return n=n[u],a===n&&(0!==a||1/a==1/n)}},r.filter=b,r.forEach=d,r.forIn=Ot,r.forOwn=St,r.keys=Et,r.map=m,r.property=O,r.collect=m,r.each=d,r.extend=xt,r.select=b,r.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),u(n,t,typeof e=="function"&&c(e,r,1))
},r.identity=_,r.isArguments=g,r.isArray=mt,r.isFunction=y,r.isObject=h,r.isString=v,r.noop=x,r.random=function(n,t,e){var r=null==n,o=null==t;return null==e&&(typeof n=="boolean"&&o?(e=n,n=1):o||typeof t!="boolean"||(e=t,o=true)),r&&o&&(t=1),n=+n||0,o?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=yt(),gt(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):n+rt(yt()*(t-n+1))},r.reduce=j,r.some=E,r.any=E,r.foldl=j,r.inject=j,r.VERSION="2.4.1",W&&Q&&(W._=r)}).call(this);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});