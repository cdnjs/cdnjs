(function (root, factory) {
  var snabbt = factory();

  if (typeof exports === 'object') {
    // CommonJS
    module.exports = snabbt;
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function () {
      return (root.returnExportsGlobal = snabbt);
    });
  } else {
    // As global variable
    root.snabbt = snabbt;
  }
}(this, function () {

  var tickRequests = [];
  var runningAnimations = [];
  var completedAnimations = [];
  var transformProperty = 'transform';

  // Find which vendor prefix to use
  var styles = window.getComputedStyle(document.documentElement, '');
  var vendorPrefix = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
  if(vendorPrefix === 'webkit')
    transformProperty = 'webkitTransform';

  /* Entry point, only function to be called by user */
  var snabbt = function(arg1, arg2, arg3) {

    var elements = arg1;

    // If argument is an Array or a NodeList or other list type that can be iterable.
    // Loop through and start one animation for each element.
    if(elements.length !== undefined) {
      var aggregateChainer = {
        chainers: [],
        then: function(opts) {
          console.log('DeprecationWarning: then() is renamed to snabbt()');
          return this.snabbt(opts);
        },
        snabbt: function(opts) {
          var len = this.chainers.length;
          this.chainers.forEach(function(chainer, index) {
            chainer.snabbt(preprocessOptions(opts, index, len));
          });
          return aggregateChainer;
        },
        setValue: function(value) {
          this.chainers.forEach(function(chainer) {
            chainer.setValue(value);
          });
          return aggregateChainer;
        },
        finish: function() {
          this.chainers.forEach(function(chainer) {
            chainer.finish();
          });
          return aggregateChainer;
        },
        rollback: function() {
          this.chainers.forEach(function(chainer) {
            chainer.rollback();
          });
          return aggregateChainer;
        }
      };

      for(var i=0, len=elements.length;i<len;++i) {
        if(typeof arg2 == 'string')
          aggregateChainer.chainers.push(snabbtSingleElement(elements[i], arg2, preprocessOptions(arg3, i, len)));
        else
          aggregateChainer.chainers.push(snabbtSingleElement(elements[i], preprocessOptions(arg2, i, len), arg3));
      }
      return aggregateChainer;
    } else {
      if(typeof arg2 == 'string')
        return snabbtSingleElement(elements, arg2, preprocessOptions(arg3, 0, 1));
      else
        return snabbtSingleElement(elements, preprocessOptions(arg2, 0, 1), arg3);
    }
  };

  var preprocessOptions = function(options, index, len) {
    if(!options)
      return options;
    var clone = cloneObject(options);

    if(isFunction(options.delay)) {
      clone.delay = options.delay(index, len);
    }

    if(isFunction(options.callback)) {
      console.log('DeprecationWarning: callback is renamed to complete');
      clone.complete = function() {
        options.callback.call(this, index, len);
      };
    }

    var hasAllDoneCallback = isFunction(options.allDone);
    var hasCompleteCallback = isFunction(options.complete);

    if(hasCompleteCallback || hasAllDoneCallback) {
      clone.complete = function() {
        if(hasCompleteCallback) {
          options.complete.call(this, index, len);
        }
        if(hasAllDoneCallback && (index == len - 1)) {
          options.allDone();
        }
      };
    }

    if(isFunction(options.valueFeeder)) {
      clone.valueFeeder = function(i, matrix) {
        return options.valueFeeder(i, matrix, index, len);
      };
    }
    if(isFunction(options.easing)) {
      clone.easing = function(i) {
        return options.easing(i, index, len);
      };
    }

    var properties = [
      'position',
      'rotation',
      'skew',
      'rotationPost',
      'scale',
      'scalePost',
      'width',
      'height',
      'opacity',
      'fromPosition',
      'fromRotation',
      'fromSkew',
      'fromRotationPost',
      'fromScale',
      'fromScalePost',
      'fromWidth',
      'fromHeight',
      'fromOpacity',
      'transformOrigin',
      'duration',
      'delay'
    ];

    properties.forEach(function(property) {
      if(isFunction(options[property])) {
        clone[property] = options[property](index, len);
      }
    });

    return clone;
  };

  var snabbtSingleElement = function(element, arg2, arg3) {
    if(arg2 === 'attention')
      return setupAttentionAnimation(element, arg3);
    if(arg2 === 'stop')
      return stopAnimation(element);
    var options = arg2;

    // Remove orphaned end states
    clearOphanedEndStates();

    // If there is a running or past completed animation with element, use that end state as start state
    var currentState = currentAnimationState(element);
    var start = currentState;
    // from has precendance over current animation state
    start = stateFromOptions(options, start, true);
    var end = cloneObject(currentState);
    end = stateFromOptions(options, end);

    var animOptions = setupAnimationOptions(start, end, options);
    var animation = createAnimation(animOptions);

    runningAnimations.push([element, animation]);

    animation.updateElement(element, true);
    var queue = [];
    var chainer = {
      snabbt: function(opts) {
        queue.unshift(preprocessOptions(opts, 0, 1));
        return chainer;
      },
      then: function(opts) {
        console.log('DeprecationWarning: then() is renamed to snabbt()');
        return this.snabbt(opts);
      }
    };

    function tick(time) {
      animation.tick(time);
      animation.updateElement(element);
      if(animation.isStopped())
        return;

      if(!animation.completed())
        return queueTick(tick);

      if(options.loop > 1 && !animation.isStopped()) {
        // Loop current animation
        options.loop -= 1;
        animation.restart();
        queueTick(tick);
      } else {
        if(options.complete) {
          options.complete.call(element);
        }

        // Start next animation in queue
        if(queue.length) {
          options = queue.pop();

          start = stateFromOptions(options, end, true);
          end = stateFromOptions(options, cloneObject(end));
          options = setupAnimationOptions(start, end, options);

          animation = createAnimation(options);
          runningAnimations.push([element, animation]);

          animation.tick(time);
          queueTick(tick);
        }
      }
    }

    queueTick(tick);
    // Manual animations are not chainable, instead an animation controller object is returned
    // with setValue, finish and rollback methods
    if(options.manual)
      return animation;
    return chainer;
  };

  var setupAttentionAnimation = function(element,  options) {
    var movement = stateFromOptions(options, createState({}));
    options.movement = movement;
    var animation = createAttentionAnimation(options);

    runningAnimations.push([element, animation]);
    function tick(time) {
      animation.tick(time);
      animation.updateElement(element);
      if(!animation.completed()) {
        queueTick(tick);
      } else {
        if(options.callback) {
          options.callback(element);
        }
        if(options.loop && options.loop > 1) {
          options.loop--;
          animation.restart();
          queueTick(tick);
        }
      }
    }
    queueTick(tick);
  };

  var stopAnimation = function(element) {
    for(var i= 0,len=runningAnimations.length;i<len;++i) {
      var currentAnimation = runningAnimations[i];
      var animatedElement = currentAnimation[0];
      var animation = currentAnimation[1];

      if(animatedElement === element) {
        animation.stop();
      }
    }
  };

  var findAnimationState = function(animationList, element) {
    for(var i=0,len=animationList.length;i<len;++i) {
      var currentAnimation = animationList[i];
      var animatedElement = currentAnimation[0];
      var animation = currentAnimation[1];

      if(animatedElement === element) {
        var state = animation.getCurrentState();
        animation.stop();
        return state;
      }
    }
  };

  var clearOphanedEndStates = function() {
    completedAnimations = completedAnimations.filter(function(animation) {
      return (findUltimateAncestor(animation[0]).body);
    });
  };

  var findUltimateAncestor = function(node) {
    var ancestor = node;
    while(ancestor.parentNode) {
      ancestor = ancestor.parentNode;
    }
    return ancestor;
  };

  /**
   * Returns the current state of element if there is an ongoing or previously finished
   * animation releated to it. Will also call stop on the animation.
   * TODO: The stopping of the animation is better put somewhere else
   */
  var currentAnimationState = function(element) {
    // Check if a completed animation is stored for this element
    var state = findAnimationState(runningAnimations, element);
    if(state)
      return state;

    return findAnimationState(completedAnimations, element);
  };

  /**
   * Parses an animation configuration object and returns a State instance
   */
  var stateFromOptions = function(options, state, useFromPrefix) {
    if (!state) {
      state = createState({
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        rotationPost: [0, 0, 0],
        scale: [1, 1],
        scalePost: [1, 1],
        skew: [0, 0]
      });
    }
    var position = 'position';
    var rotation = 'rotation';
    var skew = 'skew';
    var rotationPost = 'rotationPost';
    var scale = 'scale';
    var scalePost = 'scalePost';
    var width = 'width';
    var height = 'height';
    var opacity = 'opacity';

    if(useFromPrefix) {
      position = 'fromPosition';
      rotation = 'fromRotation';
      skew = 'fromSkew';
      rotationPost = 'fromRotationPost';
      scale = 'fromScale';
      scalePost = 'fromScalePost';
      width = 'fromWidth';
      height = 'fromHeight';
      opacity = 'fromOpacity';
    }

    state.position = optionOrDefault(options[position], state.position);
    state.rotation = optionOrDefault(options[rotation], state.rotation);
    state.rotationPost = optionOrDefault(options[rotationPost], state.rotationPost);
    state.skew = optionOrDefault(options[skew], state.skew);
    state.scale = optionOrDefault(options[scale], state.scale);
    state.scalePost = optionOrDefault(options[scalePost], state.scalePost);
    state.opacity = options[opacity];
    state.width = options[width];
    state.height = options[height];

    return state;
  };

  var setupAnimationOptions = function(start, end, options) {
    options.startState = start;
    options.endState = end;
    return options;
  };

  var polyFillrAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { return setTimeout(callback, 1000 / 60); };

  var queueTick = function(func) {
    if(tickRequests.length === 0)
      polyFillrAF(tickAnimations);
    tickRequests.push(func);
  };

  var tickAnimations = function(time) {
    var len = tickRequests.length;
    for(var i=0;i<len;++i) {
      tickRequests[i](time);
    }
    tickRequests.splice(0, len);

    var finishedAnimations = runningAnimations.filter(function(animation) {
      return animation[1].completed();
    });

    // See if there are any previously completed animations on the same element, if so, remove it before merging
    completedAnimations = completedAnimations.filter(function(animation) {
      for(var i=0,len=finishedAnimations.length;i<len;++i) {
        if(animation[0] === finishedAnimations[i][0]) {
          return false;
        }
      }
      return true;
    });

    completedAnimations = completedAnimations.concat(finishedAnimations);

    runningAnimations = runningAnimations.filter(function(animation) {
      return !animation[1].completed();
    });

    if(tickRequests.length !== 0)
      polyFillrAF(tickAnimations);
  };


  // Class for handling animation between two states
  var createAnimation = function(options) {
    var startState = options.startState;
    var endState = options.endState;
    var duration = optionOrDefault(options.duration, 500);
    var delay = optionOrDefault(options.delay, 0);
    var perspective = options.perspective;
    var easing = createEaser(optionOrDefault(options.easing, 'linear'), options);
    var currentState = duration === 0 ? endState.clone() : startState.clone();
    var transformOrigin = options.transformOrigin;
    currentState.transformOrigin = options.transformOrigin;

    var startTime = 0;
    var currentTime = 0;
    var stopped = false;
    var started = false;

    // Manual related
    var manual = options.manual;
    var manualValue = 0;
    var manualDelayFactor = delay / duration;
    var manualCallback;

    var tweener;
    // Setup tweener
    if(options.valueFeeder) {
      tweener = createValueFeederTweener(options.valueFeeder,
                                         startState,
                                         endState,
                                         currentState);
    } else {
      tweener = createStateTweener(startState, endState, currentState);
    }

    // Public api
    return {
      stop: function() {
        stopped = true;
      },
      isStopped: function() {
        return stopped;
      },

      finish: function(callback) {
        manual = false;
        var manualDuration = duration * manualValue;
        startTime = currentTime - manualDuration;
        manualCallback = callback;
        easing.resetFrom(manualValue);
      },

      rollback: function(callback) {
        manual = false;
        tweener.setReverse();
        var manualDuration = duration * (1 - manualValue);
        startTime = currentTime - manualDuration;
        manualCallback = callback;
        easing.resetFrom(manualValue);
      },

      restart: function() {
        // Restart timer
        startTime = undefined;
        easing.resetFrom(0);
      },

      tick: function(time) {
        if(stopped)
          return;

        if(manual) {
          currentTime = time;
          this.updateCurrentTransform();
          return;
        }

        // If first tick, set startTime
        if(!startTime) {
          startTime = time;
        }
        if(time - startTime > delay) {
          started = true;
          currentTime = time - delay;

          var curr = Math.min(Math.max(0.0, currentTime - startTime), duration);
          easing.tick(curr / duration);
          this.updateCurrentTransform();
          if(this.completed() && manualCallback) {
            manualCallback();
          }
        }
      },

      getCurrentState: function() {
        return currentState;
      },

      setValue: function(_manualValue) {
        started = true;
        manualValue = Math.min(Math.max(_manualValue, 0.0001), 1 + manualDelayFactor);
      },

      updateCurrentTransform: function() {
        var tweenValue = easing.getValue();
        if(manual) {
          var value = Math.max(0.00001, manualValue - manualDelayFactor);
          if(easing.isSpring) {
            tweenValue = value;
          } else {
            easing.tick(value, true);
            tweenValue = easing.getValue();
          }
        }
        tweener.tween(tweenValue);
      },

      completed: function() {
        if(stopped)
          return true;
        if(startTime === 0) {
          return false;
        }
        return easing.completed();
      },

      updateElement: function(element, forceUpdate) {
        if(!started && !forceUpdate)
          return;
        var matrix = tweener.asMatrix();
        var properties = tweener.getProperties();
        updateElementTransform(element, matrix, perspective);
        updateElementProperties(element, properties);
      }
    };
  };

  // ------------------------------
  // End Time animation
  // ------------------------------

  // ------------------------
  // -- AttentionAnimation --
  // ------------------------

  var createAttentionAnimation = function(options) {
    var movement = options.movement;
    options.initialVelocity = 0.1;
    options.equilibriumPosition = 0;
    var spring = createSpringEasing(options);
    var stopped = false;
    var tweenPosition = movement.position;
    var tweenRotation = movement.rotation;
    var tweenRotationPost = movement.rotationPost;
    var tweenScale = movement.scale;
    var tweenScalePost = movement.scalePost;
    var tweenSkew = movement.skew;

    var currentMovement = createState({
      position: tweenPosition ? [0, 0, 0] : undefined,
      rotation: tweenRotation ? [0, 0, 0] : undefined,
      rotationPost: tweenRotationPost ? [0, 0, 0] : undefined,
      scale: tweenScale ? [0, 0] : undefined,
      skew: tweenSkew ? [0, 0] : undefined,
    });

    // Public API
    return {
      stop: function() {
        stopped = true;
      },

      isStopped: function(time) {
        return stopped;
      },

      tick: function(time) {
        if(stopped)
          return;
        if(spring.equilibrium)
          return;
        spring.tick();

        this.updateMovement();
      },

      updateMovement:function() {
        var value = spring.getValue();
        if(tweenPosition) {
          currentMovement.position[0] = movement.position[0] * value;
          currentMovement.position[1] = movement.position[1] * value;
          currentMovement.position[2] = movement.position[2] * value;
        }
        if(tweenRotation) {
          currentMovement.rotation[0] = movement.rotation[0] * value;
          currentMovement.rotation[1] = movement.rotation[1] * value;
          currentMovement.rotation[2] = movement.rotation[2] * value;
        }
        if(tweenRotationPost) {
          currentMovement.rotationPost[0] = movement.rotationPost[0] * value;
          currentMovement.rotationPost[1] = movement.rotationPost[1] * value;
          currentMovement.rotationPost[2] = movement.rotationPost[2] * value;
        }
        if(tweenScale) {
          currentMovement.scale[0] = 1 + movement.scale[0] * value;
          currentMovement.scale[1] = 1 + movement.scale[1] * value;
        }
        if(tweenScalePost) {
          currentMovement.scalePost[0] = 1 + movement.scalePost[0] * value;
          currentMovement.scalePost[1] = 1 + movement.scalePost[1] * value;
        }

        if(tweenSkew) {
          currentMovement.skew[0] = movement.skew[0] * value;
          currentMovement.skew[1] = movement.skew[1] * value;
        }
      },

      updateElement: function(element) {
        updateElementTransform(element, currentMovement.asMatrix());
        updateElementProperties(element, currentMovement.getProperties());
      },

      getCurrentState: function() {
        return currentMovement;
      },

      completed: function() {
        return spring.equilibrium || stopped;
      },

      restart: function() {
        // Restart spring
        spring = createSpringEasing(options);
      }
    };
  };


  /**********
  * Easings *
  ***********/

  var linearEasing = function(value) {
    return value;
  };

  var ease = function(value) {
    return (Math.cos(value*Math.PI + Math.PI) + 1)/2;
  };

  var easeIn = function(value) {
    return value*value;
  };

  var easeOut = function(value) {
    return -Math.pow(value - 1, 2) + 1;
  };

  var createSpringEasing = function(options) {
    var position = optionOrDefault(options.startPosition, 0);
    var equilibriumPosition = optionOrDefault(options.equilibriumPosition, 1);
    var velocity = optionOrDefault(options.initialVelocity, 0);
    var springConstant = optionOrDefault(options.springConstant, 0.8);
    var deceleration = optionOrDefault(options.springDeceleration, 0.9);
    var mass = optionOrDefault(options.springMass, 10);

    var equilibrium = false;

    // Public API
    return {
      isSpring: true,
      tick: function(value, isManual) {
        if(value === 0.0 || isManual)
          return;
        if(equilibrium)
          return;
        var springForce = -(position - equilibriumPosition) * springConstant;
        // f = m * a
        // a = f / m
        var a = springForce / mass;
        // s = v * t
        // t = 1 ( for now )
        velocity += a;
        position += velocity;

        // Deceleration
        velocity *= deceleration;

        if(Math.abs(position - equilibriumPosition) < 0.001 && Math.abs(velocity) < 0.001) {
          equilibrium = true;
        }
      },

      resetFrom: function(value) {
        console.log('resetting spring from ' + value);
        position = value;
        velocity = 0;
      },


      getValue: function() {
        if(equilibrium)
          return equilibriumPosition;
        return position;
      },

      completed: function() {
        return equilibrium;
      }
    };
  };

  var EASING_FUNCS = {
    'linear': linearEasing,
    'ease': ease,
    'easeIn': easeIn,
    'easeOut': easeOut,
  };


  var createEaser = function(easerName, options) {
    if(easerName == 'spring') {
      return createSpringEasing(options);
    }
    var easeFunction = easerName;
    if(!isFunction(easerName)) {
      easeFunction = EASING_FUNCS[easerName];
    }

    var easer = easeFunction;
    var value = 0;
    var lastValue;

    // Public API
    return {
      tick: function(v) {
        value = easer(v);
        lastValue = v;
      },

      resetFrom: function(value) {
        lastValue = 0;
      },

      getValue: function() {
        return value;
      },

      completed: function() {
        if(lastValue >= 1) {
          return lastValue;
        }
        return false;
      }
    };
  };

  /***
   * Matrix related
   */

  var assignTranslate = function(matrix, x, y, z) {
    matrix[0] = 1;
    matrix[1] = 0;
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = 0;
    matrix[5] = 1;
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = 0;
    matrix[9] = 0;
    matrix[10] = 1;
    matrix[11] = 0;
    matrix[12] = x;
    matrix[13] = y;
    matrix[14] = z;
    matrix[15] = 1;
  };

  var assignRotateX = function(matrix, rad) {
    matrix[0] = 1;
    matrix[1] = 0;
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = 0;
    matrix[5] = Math.cos(rad);
    matrix[6] = -Math.sin(rad);
    matrix[7] = 0;
    matrix[8] = 0;
    matrix[9] = Math.sin(rad);
    matrix[10] = Math.cos(rad);
    matrix[11] = 0;
    matrix[12] = 0;
    matrix[13] = 0;
    matrix[14] = 0;
    matrix[15] = 1;
  };


  var assignRotateY = function(matrix, rad) {
    matrix[0] = Math.cos(rad);
    matrix[1] = 0;
    matrix[2] = Math.sin(rad);
    matrix[3] = 0;
    matrix[4] = 0;
    matrix[5] = 1;
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = -Math.sin(rad);
    matrix[9] = 0;
    matrix[10] = Math.cos(rad);
    matrix[11] = 0;
    matrix[12] = 0;
    matrix[13] = 0;
    matrix[14] = 0;
    matrix[15] = 1;
  };

  var assignRotateZ = function(matrix, rad) {
    matrix[0] = Math.cos(rad);
    matrix[1] = -Math.sin(rad);
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = Math.sin(rad);
    matrix[5] = Math.cos(rad);
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = 0;
    matrix[9] = 0;
    matrix[10] = 1;
    matrix[11] = 0;
    matrix[12] = 0;
    matrix[13] = 0;
    matrix[14] = 0;
    matrix[15] = 1;
  };

  var assignSkew = function(matrix, ax, ay) {
    matrix[0] = 1;
    matrix[1] = Math.tan(ax);
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = Math.tan(ay);
    matrix[5] = 1;
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = 0;
    matrix[9] = 0;
    matrix[10] = 1;
    matrix[11] = 0;
    matrix[12] = 0;
    matrix[13] = 0;
    matrix[14] = 0;
    matrix[15] = 1;
  };


  var assignScale = function(matrix, x, y) {
    matrix[0] = x;
    matrix[1] = 0;
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = 0;
    matrix[5] = y;
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = 0;
    matrix[9] = 0;
    matrix[10] = 1;
    matrix[11] = 0;
    matrix[12] = 0;
    matrix[13] = 0;
    matrix[14] = 0;
    matrix[15] = 1;
  };

  var assignIdentity = function(matrix) {
    matrix[0] = 1;
    matrix[1] = 0;
    matrix[2] = 0;
    matrix[3] = 0;
    matrix[4] = 0;
    matrix[5] = 1;
    matrix[6] = 0;
    matrix[7] = 0;
    matrix[8] = 0;
    matrix[9] = 0;
    matrix[10] = 1;
    matrix[11] = 0;
    matrix[12] = 0;
    matrix[13] = 0;
    matrix[14] = 0;
    matrix[15] = 1;
  };

  var copyArray = function(a, b) {
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];
    b[6] = a[6];
    b[7] = a[7];
    b[8] = a[8];
    b[9] = a[9];
    b[10] = a[10];
    b[11] = a[11];
    b[12] = a[12];
    b[13] = a[13];
    b[14] = a[14];
    b[15] = a[15];
  };

  var createMatrix = function() {
    var data = new Float32Array(16);
    var a = new Float32Array(16);
    var b = new Float32Array(16);
    assignIdentity(data);

    return {
      data: data,

      asCSS: function() {
        var css = 'matrix3d(';
        for(var i=0;i<15;++i) {
          if(Math.abs(data[i]) < 0.0001)
            css += '0,';
          else
            css += data[i].toFixed(10) + ',';
        }
        if(Math.abs(data[15]) < 0.0001)
          css += '0)';
        else
          css += data[15].toFixed(10) + ')';
        return css;
      },

      clear: function() {
        assignIdentity(data);
      },

      translate: function(x, y, z) {
        copyArray(data, a);
        assignTranslate(b, x, y, z);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      rotateX: function(radians) {
        copyArray(data, a);
        assignRotateX(b, radians);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      rotateY: function(radians) {
        copyArray(data, a);
        assignRotateY(b, radians);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      rotateZ: function(radians) {
        copyArray(data, a);
        assignRotateZ(b, radians);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      scale: function(x, y) {
        copyArray(data, a);
        assignScale(b, x, y);
        assignedMatrixMultiplication(a, b, data);
        return this;
      },

      skew: function(ax, ay) {
        copyArray(data, a);
        assignSkew(b, ax, ay);
        assignedMatrixMultiplication(a, b, data);
        return this;
      }
    };
  };

  var assignedMatrixMultiplication = function(a, b, res) {
    // Unrolled loop
    res[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    res[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    res[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
    res[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

    res[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
    res[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
    res[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
    res[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

    res[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
    res[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
    res[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
    res[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

    res[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
    res[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
    res[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
    res[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

    return res;
  };

  var createState = function(config) {
    // Caching of matrix and properties so we don't have to create new ones everytime they are needed
    var matrix = createMatrix();
    var properties = {
      opacity: undefined,
      width: undefined,
      height: undefined
    };

    // Public API
    return {
      position: config.position,
      rotation: config.rotation,
      rotationPost: config.rotationPost,
      skew: config.skew,
      scale: config.scale,
      scalePost: config.scalePost,
      opacity: config.opacity,
      width: config.width,
      height: config.height,


      clone: function() {
        return createState({
          position: this.position ? this.position.slice(0) : undefined,
          rotation: this.rotation ? this.rotation.slice(0) : undefined,
          rotationPost: this.rotationPost ? this.rotationPost.slice(0) : undefined,
          skew: this.skew ? this.skew.slice(0) : undefined,
          scale: this.scale ? this.scale.slice(0) : undefined,
          scalePost: this.scalePost ? this.scalePost.slice(0) : undefined,
          height: this.height,
          width: this.width,
          opacity: this.opacity
        });
      },

      asMatrix: function() {
        var m = matrix;
        m.clear();

        if(this.transformOrigin)
          m.translate(-this.transformOrigin[0], -this.transformOrigin[1], -this.transformOrigin[2]);

        if(this.scale) {
          m.scale(this.scale[0], this.scale[1]);
        }

        if(this.skew) {
          m.skew(this.skew[0], this.skew[1]);
        }

        if(this.rotation) {
          m.rotateX(this.rotation[0]);
          m.rotateY(this.rotation[1]);
          m.rotateZ(this.rotation[2]);
        }

        if(this.position) {
          m.translate(this.position[0], this.position[1], this.position[2]);
        }

        if(this.rotationPost) {
          m.rotateX(this.rotationPost[0]);
          m.rotateY(this.rotationPost[1]);
          m.rotateZ(this.rotationPost[2]);
        }

        if(this.scalePost) {
          m.scale(this.scalePost[0], this.scalePost[1]);
        }

        if(this.transformOrigin)
          m.translate(this.transformOrigin[0], this.transformOrigin[1], this.transformOrigin[2]);
        return m;
      },

      getProperties: function() {
        properties.opacity = this.opacity;
        properties.width = this.width + 'px';
        properties.height = this.height + 'px';
        return properties;
      }
    };
  };
  // ------------------
  // -- StateTweener --
  // -------------------

  var createStateTweener = function(startState, endState, resultState) {
    var start = startState;
    var end = endState;
    var result = resultState;

    var tweenPosition = end.position !== undefined;
    var tweenRotation = end.rotation !== undefined;
    var tweenRotationPost = end.rotationPost !== undefined;
    var tweenScale = end.scale !== undefined;
    var tweenScalePost = end.scalePost !== undefined;
    var tweenSkew = end.skew !== undefined;
    var tweenWidth = end.width !== undefined;
    var tweenHeight = end.height !== undefined;
    var tweenOpacity = end.opacity !== undefined;

    // Public API
    return {

      tween: function(tweenValue) {

        if(tweenPosition) {
          var dX = (end.position[0] - start.position[0]);
          var dY = (end.position[1] - start.position[1]);
          var dZ = (end.position[2] - start.position[2]);
          result.position[0] = start.position[0] + tweenValue*dX;
          result.position[1] = start.position[1] + tweenValue*dY;
          result.position[2] = start.position[2] + tweenValue*dZ;
        }

        if(tweenRotation) {
          var dAX = (end.rotation[0] - start.rotation[0]);
          var dAY = (end.rotation[1] - start.rotation[1]);
          var dAZ = (end.rotation[2] - start.rotation[2]);
          result.rotation[0] = start.rotation[0] + tweenValue*dAX;
          result.rotation[1] = start.rotation[1] + tweenValue*dAY;
          result.rotation[2] = start.rotation[2] + tweenValue*dAZ;
        }

        if(tweenRotationPost) {
          var dBX = (end.rotationPost[0] - start.rotationPost[0]);
          var dBY = (end.rotationPost[1] - start.rotationPost[1]);
          var dBZ = (end.rotationPost[2] - start.rotationPost[2]);
          result.rotationPost[0] = start.rotationPost[0] + tweenValue*dBX;
          result.rotationPost[1] = start.rotationPost[1] + tweenValue*dBY;
          result.rotationPost[2] = start.rotationPost[2] + tweenValue*dBZ;
        }

        if(tweenSkew) {
          var dSkewX = (end.skew[0] - start.skew[0]);
          var dSkewY = (end.skew[1] - start.skew[1]);

          result.skew[0] = start.skew[0] + tweenValue*dSkewX;
          result.skew[1] = start.skew[1] + tweenValue*dSkewY;
        }

        if(tweenScale) {
          var dSX = (end.scale[0] - start.scale[0]);
          var dSY = (end.scale[1] - start.scale[1]);

          result.scale[0] = start.scale[0] + tweenValue*dSX;
          result.scale[1] = start.scale[1] + tweenValue*dSY;
        }

        if(tweenScalePost) {
          var dSXPost = (end.scalePost[0] - start.scalePost[0]);
          var dSYPost = (end.scalePost[1] - start.scalePost[1]);

          result.scalePost[0] = start.scalePost[0] + tweenValue*dSXPost;
          result.scalePost[1] = start.scalePost[1] + tweenValue*dSYPost;
        }


        if(tweenWidth) {
          var dWidth = (end.width - start.width);
          result.width = start.width + tweenValue*dWidth;
        }


        if(tweenHeight) {
          var dHeight = (end.height - start.height);
          result.height = start.height + tweenValue*dHeight;
        }

        if(tweenOpacity) {
          var dOpacity = (end.opacity - start.opacity);
          result.opacity = start.opacity + tweenValue*dOpacity;
        }

      },

      asMatrix: function() {
        return result.asMatrix();
      },

      getProperties: function() {
        return result.getProperties();
      },

      setReverse: function() {
        var oldStart = start;
        start = end;
        end = oldStart;
      }
    };
  };

  // ------------------------
  // -- ValueFeederTweener --
  // ------------------------

  var createValueFeederTweener = function(valueFeeder, startState, endState, resultState) {
    var currentMatrix = valueFeeder(0, createMatrix());
    var start = startState;
    var end = endState;
    var result = resultState;
    var reverse = false;


    // Public API
    return {

      tween: function(tweenValue) {
        if(reverse)
          tweenValue = 1 - tweenValue;
        currentMatrix.clear();
        currentMatrix = valueFeeder(tweenValue, currentMatrix);

        var dWidth = (end.width - start.width);
        var dHeight = (end.height - start.height);
        var dOpacity = (end.opacity - start.opacity);

        if(end.width !== undefined)
          result.width = start.width + tweenValue*dWidth;
        if(end.height !== undefined)
          result.height = start.height + tweenValue*dHeight;
        if(end.opacity !== undefined)
          result.opacity = start.opacity + tweenValue*dOpacity;
      },

      asMatrix: function() {
        return currentMatrix;
      },

      getProperties: function() {
        return result.getProperties();
      },

      setReverse: function() {
        reverse = true;
      }

    };
  };

  var optionOrDefault = function(option, def) {
    if(typeof option == 'undefined') {
      return def;
    }
    return option;
  };

  var updateElementTransform = function(element, matrix, perspective) {
    var cssPerspective = '';
    if(perspective) {
      cssPerspective = 'perspective(' + perspective + 'px) ';
    }
    var cssMatrix = matrix.asCSS();
    element.style[transformProperty] = cssPerspective + cssMatrix;
  };

  var updateElementProperties = function(element, properties) {
    for(var key in properties) {
      element.style[key] = properties[key];
    }
  };

  var isFunction = function(object) {
    return (typeof object === "function");
  };

  var cloneObject = function(object) {
    if(!object)
      return object;
    var clone = {};
    for(var key in object) {
      clone[key] = object[key];
    }
    return clone;
  };

  if(window.jQuery) {
    (function ( $ ) {
      $.fn.snabbt = function(arg1, arg2) {
        return snabbt(this.get(), arg1, arg2);
      };
    }( jQuery ));
  }

  snabbt.createMatrix = createMatrix;
  snabbt.setElementTransform = updateElementTransform;
  return snabbt;
}));
