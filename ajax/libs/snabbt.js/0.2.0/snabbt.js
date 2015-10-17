(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else {
    // Global Variables

    var snabbtjs = factory();
    root.snabbtjs = snabbtjs;
    root.snabbt = snabbtjs.snabbt;
    //root.returnExportsGlobal = factory();
  }
}(this, function () {

;var snabbtjs = snabbtjs || {};

// ------------------------------ 
// Time animation
// ------------------------------ 

snabbtjs.Animation = function(options) {
  this._start_state = options.start_state;
  this._end_state = options.end_state;
  this.offset = options.offset;
  this.duration = options.duration || 500;
  this.delay = options.delay || 0;
  this.easing = snabbtjs.create_easer('linear');
  this.perspective = options.perspective;
  if(options.easing)
    this.easing = snabbtjs.create_easer(options.easing, options);
  this._current_state = this._start_state.clone();
  if(options.offset) {
    this._current_state.offset_x = this.offset[0];
    this._current_state.offset_y = this.offset[1];
    this._current_state.offset_z = this.offset[2];
    this._end_state.offset_x = this.offset[0];
    this._end_state.offset_y = this.offset[1];
    this._end_state.offset_z = this.offset[2];
  }

  this.start_time = 0;
  this.current_time = 0;
  this._stopped = false;
};

snabbtjs.Animation.prototype.stop = function() {
  this._stopped = true;
};

snabbtjs.Animation.prototype.stopped = function() {
  return this._stopped;
};

snabbtjs.Animation.prototype.tick = function(time) {
  if(this._stopped)
    return;

  // If first tick, set start_time
  if(!this.start_time) 
    this.start_time = time;
  if(time - this.start_time > this.delay)
    this.current_time = time - this.delay;

  var curr = Math.min(Math.max(0.0, this.current_time - this.start_time), this.duration);
  //var curr = Math.max(this.current_time - this.start_time, this.duration);
  var max = this.duration;
  this.easing.tick(curr/max);
  this.update_current_transform();
};

snabbtjs.Animation.prototype.current_state = function() {
  return this._current_state;
};

snabbtjs.Animation.prototype.update_current_transform = function() {
  var tween_value = this.easing.value();
  snabbtjs.TweenStates(this._start_state, this._end_state, this._current_state, tween_value);
};

snabbtjs.Animation.prototype.completed = function() {
  if(this._stopped)
    return true;
  if(this.start_time === 0) {
    return false;
  }
  return this.easing.completed();
};

snabbtjs.Animation.prototype.update_element = function(element) {
  var matrix = this._current_state.as_matrix();
  var properties = this._current_state.properties();
  snabbtjs.update_element_transform(element, matrix, this.perspective);
  snabbtjs.update_element_properties(element, properties);
};

// ------------------------------ 
// End Time animation
// ------------------------------ 

// ------------------------------ 
// Value feeded animation
// ------------------------------ 

snabbtjs.ValueFeededAnimation = function(options) {
  this.value_feeder = options.value_feeder;
  this.duration = options.duration || 500;
  this.delay = options.delay || 0;
  this.perspective = options.perspective;

  this.easing = snabbtjs.create_easer('linear');
  if(options.easing)
    this.easing = snabbtjs.create_easer(options.easing, options);
  this._current_state = new snabbtjs.State({});
  this.current_matrix = this.value_feeder(0);

  this.start_time = 0;
  this.current_time = 0;
  this._stopped = false;
};

snabbtjs.ValueFeededAnimation.prototype.stop = function() {
  this._stopped = true;
};

snabbtjs.ValueFeededAnimation.prototype.stopped = function() {
  return this._stopped;
};

snabbtjs.ValueFeededAnimation.prototype.tick = function(time) {
  if(this._stopped)
    return;

  // If first tick, set start_time
  if(!this.start_time) 
    this.start_time = time;
  if(time - this.start_time > this.delay)
    this.current_time = time - this.delay;

  var curr = Math.min(Math.max(0.001, this.current_time - this.start_time), this.duration);
  var max = this.duration;
  this.easing.tick(curr/max);

  this.update_current_transform();
};

snabbtjs.ValueFeededAnimation.prototype.current_state = function() {
  return this._current_state;
};

snabbtjs.ValueFeededAnimation.prototype.update_current_transform = function() {
  var tween_value = this.easing.value();
  this.current_matrix = this.value_feeder(tween_value);
};

snabbtjs.ValueFeededAnimation.prototype.completed = function() {
  if(this._stopped)
    return true;
  return this.easing.completed();
};

snabbtjs.ValueFeededAnimation.prototype.update_element = function(element) {
  snabbtjs.update_element_transform(element, this.current_matrix, this.perspective);
};

// ------------------------------ 
// End value feeded animation
// ------------------------------ 

// ---------------------- \\
// -- ScrollAnimation --  \\
// ---------------------- \\

snabbtjs.ScrollAnimation = function(options) {
  this.start_scroll = window.scrollY;
  this.end_scroll = options.scroll_pos;
  this.duration = options.duration || 500;
  this.delay = options.delay || 0;
  this.easing = options.easing || snabbtjs.cos_easing;

  this.start_time = 0;
  this.current_time = 0;
};

snabbtjs.ScrollAnimation.prototype.tick = function(time) {
  if(!this.start_time) {
    this.start_time = time;
  }
  if(time - this.start_time > this.delay)
    this.current_time = time - this.delay;
  this.update_scrolling();
};

snabbtjs.ScrollAnimation.prototype.update_scrolling = function(time) {
  var curr = Math.min(Math.max(0.001, this.current_time - this.start_time), this.duration);
  var max = this.duration;
  var s = this.easing(curr, max);
  var scroll_diff = this.end_scroll - this.start_scroll;
  var current_scroll = this.start_scroll + s * scroll_diff;

  window.scrollTo(0, current_scroll);
};

snabbtjs.ScrollAnimation.prototype.completed = function() {
  if(this.start_time === 0) {
    return false;
  }
  return this.current_time - this.start_time > this.duration;
};

// ------------------------
// -- AttentionAnimation --
// ------------------------

snabbtjs.AttentionAnimation = function(options) {
  this.movement = options.movement;
  this.current_movement = new snabbtjs.State({});
  options.initial_velocity = 0.1;
  options.equilibrium_position = 0;
  this.spring = new snabbtjs.SpringEasing(options);
  this._stopped = false;
};

snabbtjs.AttentionAnimation.prototype.stop = function() {
  this._stopped = true;
};

snabbtjs.AttentionAnimation.prototype.stopped = function(time) {
  return this._stopped;
};

snabbtjs.AttentionAnimation.prototype.tick = function(time) {
  if(this._stopped)
    return;
  if(this.spring.equilibrium)
    return;
  this.spring.tick();

  this.update_movement();
};

snabbtjs.AttentionAnimation.prototype.update_movement = function() {
  this.current_movement.x = this.movement.x * this.spring.position;
  this.current_movement.y = this.movement.y * this.spring.position;
  this.current_movement.z = this.movement.z * this.spring.position;
  this.current_movement.ax = this.movement.ax * this.spring.position;
  this.current_movement.ay = this.movement.ay * this.spring.position;
  this.current_movement.az = this.movement.az * this.spring.position;
  this.current_movement.bx = this.movement.bx * this.spring.position;
  this.current_movement.by = this.movement.by * this.spring.position;
  this.current_movement.bz = this.movement.bz * this.spring.position;
};

snabbtjs.AttentionAnimation.prototype.update_element = function(element) {
  var matrix = this.current_movement.as_matrix();
  var properties = this.current_movement.properties();
  snabbtjs.update_element_transform(element, matrix);
  snabbtjs.update_element_properties(element, properties);
};

snabbtjs.AttentionAnimation.prototype.current_state = function() {
  return this.current_movement;
};

snabbtjs.AttentionAnimation.prototype.completed = function() {
  return this.spring.equilibrium || this._stopped;
};


// Returns animation constructors based on options
snabbtjs.create_animation = function(options) {
  if(options.value_feeder)
    return new snabbtjs.ValueFeededAnimation(options);
  return new snabbtjs.Animation(options);
};
;// Steppers

var snabbtjs = snabbtjs || {};

snabbtjs.linear_easing = function(value) {
  return value;
};

snabbtjs.ease = function(value) {
  return (Math.cos(value*Math.PI + Math.PI) + 1)/2;
};

snabbtjs.ease_in = function(value) {
  return value*value;
};

snabbtjs.ease_out = function(value) {
  return -Math.pow(value - 1, 2) + 1;
};

snabbtjs.SpringEasing = function(options) {
  this.position = snabbtjs.option_or_default(options.start_position, 0);
  this.equilibrium_position = snabbtjs.option_or_default(options.equilibrium_position, 1);
  this.velocity = snabbtjs.option_or_default(options.initial_velocity, 0);
  this.spring_constant = snabbtjs.option_or_default(options.spring_constant, 0.8);
  this.deacceleration = snabbtjs.option_or_default(options.spring_deacceleration, 0.9);
  this.mass = snabbtjs.option_or_default(options.spring_mass, 10);

  this.equilibrium = false;
};

snabbtjs.SpringEasing.prototype.tick = function(value) {
  if(value === 0.0)
    return;
  if(this.equilibrium)
    return;
  var spring_force = -(this.position - this.equilibrium_position) * this.spring_constant;
  // f = m * a
  // a = f / m
  var a = spring_force / this.mass;
  // s = v * t
  // t = 1 ( for now )
  this.velocity += a;
  this.position += this.velocity;

  // Deacceleartion
  this.velocity *= this.deacceleration;

  if(Math.abs(this.position - this.equilibrium_position) < 0.001 && Math.abs(this.velocity) < 0.001) {
    this.equilibrium = true;
  }
};

snabbtjs.SpringEasing.prototype.value = function() {
  return this.position;
};

snabbtjs.SpringEasing.prototype.completed = function() {
  return this.equilibrium;
};

snabbtjs.EASING_FUNCS = {
  'linear': snabbtjs.linear_easing,
  'ease': snabbtjs.ease,
  'ease-in': snabbtjs.ease_in,
  'ease-out': snabbtjs.ease_out,
};

snabbtjs.Easer = function(easer) {
  this.easer = easer;
  this._value = 0;
};

snabbtjs.Easer.prototype.tick = function(value) {
  this._value = this.easer(value);
  this.last_value = value;
};

snabbtjs.Easer.prototype.value = function() {
  return this._value;
};

snabbtjs.Easer.prototype.completed = function() {
  return this.last_value >= 1;
};

snabbtjs.create_easer = function(easer_name, options) {
  if(easer_name == 'spring') {
    return new snabbtjs.SpringEasing(options);
  }
  var ease_func;
  if(snabbtjs.is_function(easer_name)) {
    ease_func = easer_name;
  } else {
    ease_func = snabbtjs.EASING_FUNCS[easer_name];
  }
  return new snabbtjs.Easer(ease_func);
};
;if(window.jQuery) {
  (function ( $ ) {
    $.fn.snabbt = function(arg1, arg2) {

      return snabbt(this.get(), arg1, arg2);
    };
  }( jQuery ));
}
;var snabbtjs = snabbtjs || {};

/* Entry point, only function to be called by user */
snabbtjs.snabbt = function(arg1, arg2, arg3) {
  if(arg1 === 'scroll')
    return snabbtjs.setup_scroll_animation(arg2);
  if(arg2 === 'attention')
    return snabbtjs.setup_attention_animation(arg1, arg3);
  if(arg2 === 'stop')
    return snabbtjs.stop_animation(arg1);
  var element = arg1;
  var options = arg2;


  var start = snabbtjs.current_animation_transform(element);
  if(!start)
    start = snabbtjs.state_from_options(start, options, 'from_');
  var end = new snabbtjs.State({});
  end = snabbtjs.state_from_options(end, options, '');

  var anim_options = snabbtjs.setup_animation_options(start, end, options);
  var animation = snabbtjs.create_animation(anim_options);

  if(element.hasOwnProperty('length')) {
    for(var i=0;i<element.length;++i) {
      snabbtjs.running_animations.push([element[i], animation]);
    }
  } else {
    snabbtjs.running_animations.push([element, animation]);
  }

  animation.update_element(element);
  var queue = [];
  var chainer = {
    then: function(opts) {
      queue.unshift(opts);
      return chainer;
    }
  };

  function tick(time) {
    animation.tick(time);
    animation.update_element(element);
    if(animation.stopped())
      return;

    if(!animation.completed())
      return snabbtjs.requestAnimationFrame(tick);


    if(options.loop > 1 && !animation.stopped()) {
      // Loop current animation
      options.loop -= 1;
      animation = snabbtjs.create_animation(anim_options);
      snabbtjs.requestAnimationFrame(tick);
    } else {
      if(options.callback) {
        options.callback();
      }

      // Start next animation in queue
      if(queue.length) {
        options = queue.pop();

        start = snabbtjs.state_from_options(end, options, 'from_');
        end = snabbtjs.state_from_options(new snabbtjs.State({}), options, '');
        snabbtjs.setup_animation_options(start, end, options);
        animation = new snabbtjs.Animation(options);
        snabbtjs.running_animations.push([element, animation]);

        animation.tick(time);
        snabbtjs.requestAnimationFrame(tick);
      }
    }
  }

  snabbtjs.requestAnimationFrame(tick);
  return chainer;
};

snabbtjs.setup_scroll_animation = function(options) {
  var animation = new snabbtjs.ScrollAnimation(options);
  snabbtjs.running_animations.push([undefined, animation]);

  function tick(time) {
    animation.tick(time);
    if(!animation.completed()) {
      snabbtjs.requestAnimationFrame(tick);
    }
  }
  snabbtjs.requestAnimationFrame(tick);
};

snabbtjs.setup_attention_animation = function(element,  options) {
  var movement = snabbtjs.state_from_options(new snabbtjs.State({}), options, '');
  options.movement = movement;
  var animation = new snabbtjs.AttentionAnimation(options);

  snabbtjs.running_animations.push([element, animation]);
  function tick(time) {
    animation.tick(time);
    animation.update_element(element);
    if(!animation.completed()) {
      snabbtjs.requestAnimationFrame(tick);
    }
  }
  snabbtjs.requestAnimationFrame(tick);
};

snabbtjs.stop_animation = function(element) {
  for(var i=0;i<snabbtjs.running_animations.length;++i) {
    var animated_element = snabbtjs.running_animations[i][0];
    var animation = snabbtjs.running_animations[i][1];

    if(element.hasOwnProperty('length')) {
      for(var j=0;j<element.length;++j) {
        if(animated_element === element[j]) {
          animation.stop();
        }
      }

    } else {
      if(animated_element === element) {
        animation.stop();
      }
    }
  }
};

snabbtjs.current_animation_transform = function(element) {
  for(var i=0;i<snabbtjs.running_animations.length;++i) {
    var animated_element = snabbtjs.running_animations[i][0];
    var animation = snabbtjs.running_animations[i][1];
    if(animation.stopped()) {
      continue;
    }
    var state;
    if(element.hasOwnProperty('length')) {
      for(var j=0;j<element.length;++j) {
        if(animated_element === element[j]) {
          state = animation.current_state();
          animation.stop();
          return state;
        }
      }
    } else {
      if(animated_element === element) {
        state = animation.current_state();
        animation.stop();
        return state;
      }
    }
  }
};

snabbtjs.state_from_options = function(p, options, prefix) {
  if(!p)
    p = new snabbtjs.State({});

  if(options[prefix + 'position']) {
    p.x = options[prefix + 'position'][0];
    p.y = options[prefix + 'position'][1];
    p.z = options[prefix + 'position'][2];
  }
  if(options[prefix + 'rotation']) {
    p.ax =  options[prefix + 'rotation'][0];
    p.ay =  options[prefix + 'rotation'][1];
    p.az =  options[prefix + 'rotation'][2];
  }
  if(options[prefix + 'skew']) {
    p.skew_x =  options[prefix + 'skew'][0];
    p.skew_y =  options[prefix + 'skew'][1];
  }
  if(options[prefix + 'rotation_post']) {
    p.bx =  options[prefix + 'rotation_post'][0];
    p.by =  options[prefix + 'rotation_post'][1];
    p.bz =  options[prefix + 'rotation_post'][2];
  }
  if(options[prefix + 'scale']) {
    p.sx =  options[prefix + 'scale'][0];
    p.sy =  options[prefix + 'scale'][1];
  }
  if(options[prefix + 'width'] !== undefined) {
    p.width =  options[prefix + 'width'];
  }
  if(options[prefix + 'height'] !== undefined) {
    p.height =  options[prefix + 'height'];
  }
  if(options[prefix + 'opacity'] !== undefined) {
    p.opacity =  options[prefix + 'opacity'];
  }
  return p;
};

snabbtjs.setup_animation_options = function(start, end, options) {
  options.start_state = start;
  options.end_state = end;
  return options;
};

snabbtjs.tick_requests = [];
snabbtjs.running_animations = [];

snabbtjs.requestAnimationFrame = function(func) {
  snabbtjs.tick_requests.push(func);
};

snabbtjs.tick_animations = function(time) {
  var len = snabbtjs.tick_requests.length;
  for(var i=0;i<len;++i) {
    snabbtjs.tick_requests[i](time);
  }
  snabbtjs.tick_requests.splice(0, len);
  window.requestAnimationFrame(snabbtjs.tick_animations);
  snabbtjs.running_animations = snabbtjs.running_animations.filter(function(a) {
    return !a[1].completed();
  });
};

window.requestAnimationFrame(snabbtjs.tick_animations);
;var snabbtjs = snabbtjs || {};

snabbtjs.assigned_matrix_multiplication = function(a, b, res) {
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

snabbtjs.mat_to_css = function(matrix) {
  var css = 'matrix3d(';
  for(var i=0;i<matrix.length-1;++i) {
    if(Math.abs(matrix[i]) < 0.01)
      css += '0,';
    else
      css += matrix[i].toFixed(10) + '0,';
  }
  css += matrix[15].toFixed(10) + ')';
  return css;
};

snabbtjs.mat_to_css2 = function(matrix) {
  var css = 'matrix3d(' +
            matrix[0].toFixed(10) + ', ' +
            matrix[1].toFixed(10) + ', ' +
            matrix[2].toFixed(10) + ', ' +
            matrix[3].toFixed(10) + ', ' +
            matrix[4].toFixed(10) + ', ' +
            matrix[5].toFixed(10) + ', ' +
            matrix[6].toFixed(10) + ', ' +
            matrix[7].toFixed(10) + ', ' +
            matrix[8].toFixed(10) + ', ' +
            matrix[9].toFixed(10) + ', ' +
            matrix[10].toFixed(10) + ', ' +
            matrix[11].toFixed(10) + ', ' +
            matrix[12].toFixed(10) + ', ' +
            matrix[13].toFixed(10) + ', ' +
            matrix[14].toFixed(10) + ', ' +
            matrix[15].toFixed(10) + ')';
  return css;
};

snabbtjs.mult = function(a, b) {
  var m = new Float32Array(16);
  snabbtjs.assigned_matrix_multiplication(a, b, m);
  return m;
};

snabbtjs.trans = function(x, y, z) {
  return new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]);
};

snabbtjs.rotX = function(rad) {
  return new Float32Array([
    1, 0,             0,              0,
    0, Math.cos(rad), -Math.sin(rad), 0,
    0, Math.sin(rad), Math.cos(rad),  0,
    0, 0,             0,              1
  ]);
};

snabbtjs.rotY = function(rad) {
  return new Float32Array([
    Math.cos(rad),  0, Math.sin(rad), 0,
    0,              1, 0,             0,
    -Math.sin(rad), 0, Math.cos(rad), 0,
    0,              0, 0,             1
  ]);
};

snabbtjs.rotZ = function(rad) {
  return new Float32Array([
    Math.cos(rad), -Math.sin(rad), 0, 0,
    Math.sin(rad), Math.cos(rad),  0, 0,
    0,             0,              1, 0,
    0,             0,              0, 1
  ]);
};

snabbtjs.skew = function(ax, ay) {
  return new Float32Array([
    1,            Math.tan(ax), 0, 0,
    Math.tan(ay), 1,            0, 0,
    0,            0,            1, 0,
    0,            0,            0, 1,
  ]);
};


snabbtjs.scale = function(x, y) {
  return new Float32Array([
     x, 0, 0, 0,
     0, y, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1
  ]);
};

snabbtjs.ident = function() {
  return new Float32Array([
     1, 0, 0, 0,
     0, 1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1
  ]);
};

snabbtjs.set_css = function(el, matrix) {
  if(el.hasOwnProperty('length')) {
    for(var i=0;i<el.length;++i) {
      el[i].style.webkitTransform = snabbtjs.mat_to_css(matrix);
      el[i].style.transform = snabbtjs.mat_to_css(matrix);
    }
  } else {
    el.style.webkitTransform = snabbtjs.mat_to_css(matrix);
    el.style.transform = snabbtjs.mat_to_css(matrix);
  }
};
;snabbtjs.State = function(config) {
  this.ax = snabbtjs.option_or_default(config.ax, 0);
  this.ay = snabbtjs.option_or_default(config.ay, 0);
  this.az = snabbtjs.option_or_default(config.az, 0);
  this.x = snabbtjs.option_or_default(config.x, 0);
  this.y = snabbtjs.option_or_default(config.y, 0);
  this.z = snabbtjs.option_or_default(config.z, 0);
  this.bx = snabbtjs.option_or_default(config.bx, 0);
  this.by = snabbtjs.option_or_default(config.by, 0);
  this.bz = snabbtjs.option_or_default(config.bz, 0);
  this.skew_x = snabbtjs.option_or_default(config.skew_x, 0);
  this.skew_y = snabbtjs.option_or_default(config.skew_y, 0);
  this.offset_x = snabbtjs.option_or_default(config.offset_x, 0);
  this.offset_y = snabbtjs.option_or_default(config.offset_y, 0);
  this.offset_z = snabbtjs.option_or_default(config.offset_z, 0);
  this.sx = snabbtjs.option_or_default(config.sx, 1);
  this.sy = snabbtjs.option_or_default(config.sy, 1);
  this.width = config.width;
  this.height = config.height;
  this.opacity = snabbtjs.option_or_default(config.opacity, 1);
};

snabbtjs.State.prototype.clone = function() {
  var p = new snabbtjs.State({
    ax: this.ax,
    ay: this.ay,
    az: this.az,
    x: this.x,
    y: this.y,
    z: this.z,
    bx: this.bx,
    by: this.by,
    bz: this.bz,
    skew_x: this.skew_x,
    skew_y: this.skew_y,
    sx: this.sx,
    sy: this.sy,
    height: this.height,
    width: this.width,
    opacity: this.opacity
  });
  return p;
};

snabbtjs.State.prototype.assign = function(p) {
  this.ax = p.ax;
  this.ay = p.ay;
  this.az = p.az;
  this.x = p.x;
  this.y = p.y;
  this.z = p.z;
  this.bx = p.bx;
  this.by = p.by;
  this.bz = p.bz;
  this.skew_x = p.skew_x;
  this.skew_y = p.skew_y;
  this.sx = p.sx;
  this.sy = p.sy;
  this.opacity = p.opacity;
  this.height = this.height;
  this.width = this.width;
};

snabbtjs.State.prototype.as_matrix = function() {
  // Scale
  var m = snabbtjs.scale(this.sx, this.sy);

  // Skew
  m = snabbtjs.mult(m, snabbtjs.skew(this.skew_x, this.skew_y));

  // Pre-rotation
  m = snabbtjs.mult(m, snabbtjs.rotX(this.ax));
  m = snabbtjs.mult(m, snabbtjs.rotY(this.ay));
  m = snabbtjs.mult(m, snabbtjs.rotZ(this.az));

  // Translation
  m = snabbtjs.mult(m, snabbtjs.trans(this.x, this.y, this.z));

  // Post-rotation
  m = snabbtjs.mult(m, snabbtjs.rotX(this.bx));
  m = snabbtjs.mult(m, snabbtjs.rotY(this.by));
  m = snabbtjs.mult(m, snabbtjs.rotZ(this.bz));

  // Final offset
  m = snabbtjs.mult(snabbtjs.trans(this.offset_x, this.offset_y, this.offset_z), m);
  return m;
};

snabbtjs.State.prototype.properties = function() {
  return {
    opacity: this.opacity,
    width: this.width + 'px',
    height: this.height + 'px'
  };
};
;var snabbtjs = snabbtjs || {};

snabbtjs.TweenStates = function(start, end, result, tween_value) {
  var dx = (end.x - start.x);
  var dy = (end.y - start.y);
  var dz = (end.z - start.z);
  var dax = (end.ax - start.ax);
  var day = (end.ay - start.ay);
  var daz = (end.az - start.az);
  var dbx = (end.bx - start.bx);
  var dby = (end.by - start.by);
  var dbz = (end.bz - start.bz);
  var dsx = (end.sx - start.sx);
  var dsy = (end.sy - start.sy);
  var dskewx = (end.skew_x - start.skew_x);
  var dskewy = (end.skew_y - start.skew_y);
  var dwidth = (end.width - start.width);
  var dheight = (end.height - start.height);
  var dopacity = (end.opacity - start.opacity);

  result.ax = start.ax + tween_value*dax;
  result.ay = start.ay + tween_value*day;
  result.az = start.az + tween_value*daz;
  result.x = start.x + tween_value*dx;
  result.y = start.y + tween_value*dy;
  result.z = start.z + tween_value*dz;
  result.bx = start.bx + tween_value*dbx;
  result.by = start.by + tween_value*dby;
  result.bz = start.bz + tween_value*dbz;
  result.skew_x = start.skew_x + tween_value*dskewx;
  result.skew_y = start.skew_y + tween_value*dskewy;
  result.sx = start.sx + tween_value*dsx;
  result.sy = start.sy + tween_value*dsy;

  if(end.width !== undefined)
    result.width = start.width + tween_value*dwidth;
  if(end.height !== undefined)
    result.height = start.height + tween_value*dheight;
  if(end.opacity !== undefined)
    result.opacity = start.opacity + tween_value*dopacity;
};
;var snabbtjs = snabbtjs || {};

snabbtjs.option_or_default = function(option, def) {
  if(typeof option == 'undefined') {
    return def;
  }
  return option;
};

snabbtjs._update_element_transform = function(element, matrix, perspective) {
  var css_perspective = '';
  if(perspective) {
    css_perspective = 'perspective(' + perspective + 'px) ';
  }
  element.style.webkitTransform = css_perspective + snabbtjs.mat_to_css(matrix);
  element.style.transform = css_perspective + snabbtjs.mat_to_css(matrix);
};

snabbtjs.update_element_transform = function(element, matrix, perspective) {
  if(element.hasOwnProperty('length')) {
    for(var i=0;i<element.length;++i) {
      snabbtjs._update_element_transform(element[i], matrix, perspective);
    }
  } else {
    snabbtjs._update_element_transform(element, matrix, perspective);
  }
};

snabbtjs._update_element_properties = function(element, properties) {
  for(var key in properties) {
    element.style[key] = properties[key];
  }
};

snabbtjs.update_element_properties = function(element, properties) {
  if(element.hasOwnProperty('length')) {
    for(var i=0;i<element.length;++i) {
      snabbtjs._update_element_properties(element[i], properties);
    }
  } else {
    snabbtjs._update_element_properties(element, properties);
  }
};

snabbtjs.is_function = function(object) {
  return (typeof object === "function");
  //return object && getClass.call(object) == '[object Function]';
};
;
  // Your actual module
  return snabbtjs;
}));
