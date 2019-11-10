(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.vg || (g.vg = {})).embed = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var d3 = (typeof window !== "undefined" ? window['d3'] : typeof global !== "undefined" ? global['d3'] : null),
    vg = (typeof window !== "undefined" ? window['vg'] : typeof global !== "undefined" ? global['vg'] : null),
    parameter = require('./parameter'),
    post = require('./post');

var config = {
  // URL for loading specs into editor
  editor_url: 'http://vega.github.io/vega-editor/',

  // HTML to inject within view source head element
  source_header: '',

  // HTML to inject before view source closing body tag
  source_footer: ''
};

function load(url, arg, el, callback) {
  vg.util.load({url: url}, function(err, data) {
    if (err || !data) {
      console.error(err || ('No data found at ' + url));
    } else {
      // marshal embedding spec and restart
      var opt = !arg ? JSON.parse(data) : vg.util.extend({source: data}, arg);
      embed(el, opt, callback);
    }
  });
}

// Embed a Vega visualization component in a web page.
// el: DOM element in which to place component (DOM node or CSS selector)
// opt: Embedding specification (parsed JSON or URL string)
// callback: invoked with the generated Vega View instance
function embed(el, opt, callback) {
  var params = [], source, spec;

  if (vg.util.isString(opt)) {
    return load(opt, null, el, callback);
  } else if (opt.source) {
    source = opt.source;
    spec = JSON.parse(source);
  } else if (opt.spec) {
    spec = opt.spec;
    source = JSON.stringify(spec, null, 2);
  } else if (opt.url) {
    return load(opt.url, opt, el, callback);
  } else {
    spec = opt;
    source = JSON.stringify(spec, null, 2);
    opt = {spec: spec, actions: false};
  }

  // ensure container div has class 'vega-embed'
  var div = d3.select(el)
    .classed('vega-embed', true)
    .html(''); // clear container

  // handle parameters
  if (opt.parameters) {
    var elp = opt.parameter_el ? d3.select(opt.parameter_el) : div;
    var pdiv = elp.append('div')
      .attr('class', 'vega-params');
    params = opt.parameters.map(function(p) {
      return parameter.init(pdiv, p, spec);
    });
  }

  vg.parse.spec(spec, function(chart) {
    var renderer = opt.renderer || 'canvas',
        actions  = opt.actions || {};

    var view = chart({
      el: el,
      data: opt.data || undefined,
      renderer: renderer
    });

    if (opt.actions !== false) {
      // add child div to house action links
      var ctrl = div.append('div')
        .attr('class', 'vega-actions');

      // add 'Export' action
      if (actions.export !== false) {
        ctrl.append('a')
          .text('Export as ' + (renderer==='canvas' ? 'PNG' : 'SVG'))
          .attr('href', '#')
          .attr('download', spec.name || 'vega')
          .on('mousedown', function() {
            this.href = imageURL(view);
            d3.event.preventDefault();
          });
      }

      // add 'View Source' action
      if (actions.source !== false) {
        ctrl.append('a')
          .text('View Source')
          .attr('href', '#')
          .on('click', function() {
            viewSource(source);
            d3.event.preventDefault();
          });
      }

      // add 'Open in Vega Editor' action
      if (actions.editor !== false) {
        ctrl.append('a')
          .text('Open in Vega Editor')
          .attr('href', '#')
          .on('click', function() {
            post(window, embed.config.editor_url, {spec: source});
            d3.event.preventDefault();
          });
      }
    }

    // bind all parameter elements
    params.forEach(function(p) { parameter.bind(p, view); });

    // initialize and return visualization
    view.update();
    if (callback) callback(view, spec);
  });
}

function imageURL(view) {
  var ren = view.renderer(),
      scene = ren.scene();

  if (ren.svg) {
    var blob = new Blob([ren.svg()], {type: 'image/svg+xml'});
    return window.URL.createObjectURL(blob);
  } else if (scene.toDataURL) {
    return scene.toDataURL('image/png');
  } else {
    throw Error('Renderer does not support image export.');
  }
}

function viewSource(source) {
  var header = '<html><head>' + config.source_header + '</head>' + '<body><pre><code class="json">';
  var footer = '</code></pre>' + config.source_footer + '</body></html>';
  var win = window.open('');
  win.document.write(header + source + footer);
  win.document.title = 'Vega JSON Source';
}

// make config and imageURL externally visible
embed.config = config;
embed.imageURL = imageURL;

module.exports = embed;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./parameter":2,"./post":3}],2:[function(require,module,exports){
(function (global){
var d3 = (typeof window !== "undefined" ? window['d3'] : typeof global !== "undefined" ? global['d3'] : null),
    $ = (typeof window !== "undefined" ? window['vg'] : typeof global !== "undefined" ? global['vg'] : null).util.mutator;

module.exports = {
  init: function(el, param, spec) {
    return (rewrite(param, spec), handle(el, param));
  },
  bind: function(param, view) {
    param.dom.forEach(function(el) { el.__vega__ = view; });
    view.onSignal(param.dom[0].name, function(k, v) { param.set(v); });
  }
};

// spec re-write

function rewrite(param, spec) {
  // add signal to top-level if not defined
  var sg = spec.signals || (spec.signals = []);
  for (var i=0; i<sg.length; ++i) {
    if (sg[i].name === param.signal) break;
  }
  if (i === sg.length) {
    sg.push({
      name: param.signal,
      init: param.value
    });
  }

  // replace values for re-write entries
  (param.rewrite || []).forEach(function(path) {
    $(path)(spec, {signal: param.signal});
  });
}

// HTML output handlers

function handle(el, param) {
  var p = el.append('div')
    .attr('class', 'vega-param');

  p.append('span')
    .attr('class', 'vega-param-name')
    .text(param.name || param.signal);

  var input = form;
  switch (param.type) {
    case 'checkbox': input = checkbox; break;
    case 'select':   input = select; break;
    case 'radio':    input = radio; break;
    case 'range':    input = range; break;
  }

  return input(p, param);
}

function form(el, param) {
  var fm = el.append('input')
    .on('input', update);

  for (var key in param) {
    if (key === 'signal' || key === 'rewrite') continue;
    fm.attr(key, param[key]);
  }
  fm.attr('name', param.signal);

  var node = fm.node();
  return {
    dom: [node],
    set: function(value) { node.value = value; }
  };
}

function checkbox(el, param) {
  var cb = el.append('input')
    .on('change', function() { update.call(this, this.checked); })
    .attr('type', 'checkbox')
    .attr('name', param.signal)
    .attr('checked', param.value || null)
    .node();

  return {
    dom: [cb],
    set: function(value) { cb.checked = !!value || null; }
  };
}

function select(el, param) {
  var sl = el.append('select')
    .attr('name', param.signal)
    .on('change', function() {
      update.call(this, this.options[this.selectedIndex].__data__);
    });

  sl.selectAll('option')
    .data(param.options)
   .enter().append('option')
    .attr('value', vg.util.identity)
    .attr('selected', function(x) { return x === param.value || null; })
    .text(vg.util.identity);
  
  var node = sl.node();
  return {
    dom: [node],
    set: function(value) {
      var idx = param.options.indexOf(value);
      node.selectedIndex = idx;
    }
  };
}

function radio(el, param) {
  var rg = el.append('span')
    .attr('class', 'vega-param-radio');

  var nodes = param.options.map(function(option) {
    var id = 'vega-option-' + param.signal + '-' + option;

    var rb = rg.append('input')
      .datum(option)
      .on('change', update)
      .attr('id', id)
      .attr('type', 'radio')
      .attr('name', param.signal)
      .attr('value', option)
      .attr('checked', option === param.value || null);

    rg.append('label')
      .attr('for', id)
      .text(option);

    return rb.node();
  });

  return {
    dom: nodes,
    set: function(value) {
      for (var i=0; i<nodes.length; ++i) {
        if (nodes[i].value === value) {
          nodes[i].checked = true;
        }
      }
    }
  };
}

function range(el, param) {
  var val = param.value !== undefined ? param.value :
    ((+param.max) + (+param.min)) / 2;

  var rn = el.append('input')
    .on('input', function() {
      lbl.text(this.value);
      update.call(this, +this.value);
    })
    .attr('type', 'range')
    .attr('name', param.signal)
    .attr('value', val)
    .attr('min', param.min)
    .attr('max', param.max)
    .attr('step', param.step || vg.util.bins({
      min: param.min,
      max: param.max,
      maxbins: 100
    }).step);

  var lbl = el.append('label')
    .attr('class', 'vega-range')
    .text(val);

  var node = rn.node();
  return {
    dom: [node],
    set: function(value) {
      node.value = value;
      lbl.text(value);
    }
  };
}

function update(value) {
  if (value === undefined) value = this.__data__ || d3.event.target.value;
  this.__vega__.signal(this.name, value).update();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
// open editor url in a new window, and pass a message
module.exports = function(window, url, data) {
  var editor = window.open(url),
      wait = 10000,
      step = 250,
      count = ~~(wait/step);

  function listen(evt) {
    if (evt.source === editor) {
      count = 0;
      window.removeEventListener('message', listen, false);
    }
  }
  window.addEventListener('message', listen, false);

  // send message
  // periodically resend until ack received or timeout
  function send() {
    if (count <= 0) return;
    editor.postMessage(data, '*');
    setTimeout(send, step);
    count -= 1;
  }
  setTimeout(send, step);
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZW1iZWQuanMiLCJzcmMvcGFyYW1ldGVyLmpzIiwic3JjL3Bvc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBkMyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydkMyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnZDMnXSA6IG51bGwpLFxuICAgIHZnID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ3ZnJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyd2ZyddIDogbnVsbCksXG4gICAgcGFyYW1ldGVyID0gcmVxdWlyZSgnLi9wYXJhbWV0ZXInKSxcbiAgICBwb3N0ID0gcmVxdWlyZSgnLi9wb3N0Jyk7XG5cbnZhciBjb25maWcgPSB7XG4gIC8vIFVSTCBmb3IgbG9hZGluZyBzcGVjcyBpbnRvIGVkaXRvclxuICBlZGl0b3JfdXJsOiAnaHR0cDovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtZWRpdG9yLycsXG5cbiAgLy8gSFRNTCB0byBpbmplY3Qgd2l0aGluIHZpZXcgc291cmNlIGhlYWQgZWxlbWVudFxuICBzb3VyY2VfaGVhZGVyOiAnJyxcblxuICAvLyBIVE1MIHRvIGluamVjdCBiZWZvcmUgdmlldyBzb3VyY2UgY2xvc2luZyBib2R5IHRhZ1xuICBzb3VyY2VfZm9vdGVyOiAnJ1xufTtcblxuZnVuY3Rpb24gbG9hZCh1cmwsIGFyZywgZWwsIGNhbGxiYWNrKSB7XG4gIHZnLnV0aWwubG9hZCh7dXJsOiB1cmx9LCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcbiAgICBpZiAoZXJyIHx8ICFkYXRhKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVyciB8fCAoJ05vIGRhdGEgZm91bmQgYXQgJyArIHVybCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtYXJzaGFsIGVtYmVkZGluZyBzcGVjIGFuZCByZXN0YXJ0XG4gICAgICB2YXIgb3B0ID0gIWFyZyA/IEpTT04ucGFyc2UoZGF0YSkgOiB2Zy51dGlsLmV4dGVuZCh7c291cmNlOiBkYXRhfSwgYXJnKTtcbiAgICAgIGVtYmVkKGVsLCBvcHQsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBFbWJlZCBhIFZlZ2EgdmlzdWFsaXphdGlvbiBjb21wb25lbnQgaW4gYSB3ZWIgcGFnZS5cbi8vIGVsOiBET00gZWxlbWVudCBpbiB3aGljaCB0byBwbGFjZSBjb21wb25lbnQgKERPTSBub2RlIG9yIENTUyBzZWxlY3Rvcilcbi8vIG9wdDogRW1iZWRkaW5nIHNwZWNpZmljYXRpb24gKHBhcnNlZCBKU09OIG9yIFVSTCBzdHJpbmcpXG4vLyBjYWxsYmFjazogaW52b2tlZCB3aXRoIHRoZSBnZW5lcmF0ZWQgVmVnYSBWaWV3IGluc3RhbmNlXG5mdW5jdGlvbiBlbWJlZChlbCwgb3B0LCBjYWxsYmFjaykge1xuICB2YXIgcGFyYW1zID0gW10sIHNvdXJjZSwgc3BlYztcblxuICBpZiAodmcudXRpbC5pc1N0cmluZyhvcHQpKSB7XG4gICAgcmV0dXJuIGxvYWQob3B0LCBudWxsLCBlbCwgY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKG9wdC5zb3VyY2UpIHtcbiAgICBzb3VyY2UgPSBvcHQuc291cmNlO1xuICAgIHNwZWMgPSBKU09OLnBhcnNlKHNvdXJjZSk7XG4gIH0gZWxzZSBpZiAob3B0LnNwZWMpIHtcbiAgICBzcGVjID0gb3B0LnNwZWM7XG4gICAgc291cmNlID0gSlNPTi5zdHJpbmdpZnkoc3BlYywgbnVsbCwgMik7XG4gIH0gZWxzZSBpZiAob3B0LnVybCkge1xuICAgIHJldHVybiBsb2FkKG9wdC51cmwsIG9wdCwgZWwsIGNhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICBzcGVjID0gb3B0O1xuICAgIHNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KHNwZWMsIG51bGwsIDIpO1xuICAgIG9wdCA9IHtzcGVjOiBzcGVjLCBhY3Rpb25zOiBmYWxzZX07XG4gIH1cblxuICAvLyBlbnN1cmUgY29udGFpbmVyIGRpdiBoYXMgY2xhc3MgJ3ZlZ2EtZW1iZWQnXG4gIHZhciBkaXYgPSBkMy5zZWxlY3QoZWwpXG4gICAgLmNsYXNzZWQoJ3ZlZ2EtZW1iZWQnLCB0cnVlKVxuICAgIC5odG1sKCcnKTsgLy8gY2xlYXIgY29udGFpbmVyXG5cbiAgLy8gaGFuZGxlIHBhcmFtZXRlcnNcbiAgaWYgKG9wdC5wYXJhbWV0ZXJzKSB7XG4gICAgdmFyIGVscCA9IG9wdC5wYXJhbWV0ZXJfZWwgPyBkMy5zZWxlY3Qob3B0LnBhcmFtZXRlcl9lbCkgOiBkaXY7XG4gICAgdmFyIHBkaXYgPSBlbHAuYXBwZW5kKCdkaXYnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtcGFyYW1zJyk7XG4gICAgcGFyYW1zID0gb3B0LnBhcmFtZXRlcnMubWFwKGZ1bmN0aW9uKHApIHtcbiAgICAgIHJldHVybiBwYXJhbWV0ZXIuaW5pdChwZGl2LCBwLCBzcGVjKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZnLnBhcnNlLnNwZWMoc3BlYywgZnVuY3Rpb24oY2hhcnQpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSBvcHQucmVuZGVyZXIgfHwgJ2NhbnZhcycsXG4gICAgICAgIGFjdGlvbnMgID0gb3B0LmFjdGlvbnMgfHwge307XG5cbiAgICB2YXIgdmlldyA9IGNoYXJ0KHtcbiAgICAgIGVsOiBlbCxcbiAgICAgIGRhdGE6IG9wdC5kYXRhIHx8IHVuZGVmaW5lZCxcbiAgICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICAgIH0pO1xuXG4gICAgaWYgKG9wdC5hY3Rpb25zICE9PSBmYWxzZSkge1xuICAgICAgLy8gYWRkIGNoaWxkIGRpdiB0byBob3VzZSBhY3Rpb24gbGlua3NcbiAgICAgIHZhciBjdHJsID0gZGl2LmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtYWN0aW9ucycpO1xuXG4gICAgICAvLyBhZGQgJ0V4cG9ydCcgYWN0aW9uXG4gICAgICBpZiAoYWN0aW9ucy5leHBvcnQgIT09IGZhbHNlKSB7XG4gICAgICAgIGN0cmwuYXBwZW5kKCdhJylcbiAgICAgICAgICAudGV4dCgnRXhwb3J0IGFzICcgKyAocmVuZGVyZXI9PT0nY2FudmFzJyA/ICdQTkcnIDogJ1NWRycpKVxuICAgICAgICAgIC5hdHRyKCdocmVmJywgJyMnKVxuICAgICAgICAgIC5hdHRyKCdkb3dubG9hZCcsIHNwZWMubmFtZSB8fCAndmVnYScpXG4gICAgICAgICAgLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaHJlZiA9IGltYWdlVVJMKHZpZXcpO1xuICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkICdWaWV3IFNvdXJjZScgYWN0aW9uXG4gICAgICBpZiAoYWN0aW9ucy5zb3VyY2UgIT09IGZhbHNlKSB7XG4gICAgICAgIGN0cmwuYXBwZW5kKCdhJylcbiAgICAgICAgICAudGV4dCgnVmlldyBTb3VyY2UnKVxuICAgICAgICAgIC5hdHRyKCdocmVmJywgJyMnKVxuICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXdTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCAnT3BlbiBpbiBWZWdhIEVkaXRvcicgYWN0aW9uXG4gICAgICBpZiAoYWN0aW9ucy5lZGl0b3IgIT09IGZhbHNlKSB7XG4gICAgICAgIGN0cmwuYXBwZW5kKCdhJylcbiAgICAgICAgICAudGV4dCgnT3BlbiBpbiBWZWdhIEVkaXRvcicpXG4gICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIycpXG4gICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcG9zdCh3aW5kb3csIGVtYmVkLmNvbmZpZy5lZGl0b3JfdXJsLCB7c3BlYzogc291cmNlfSk7XG4gICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGJpbmQgYWxsIHBhcmFtZXRlciBlbGVtZW50c1xuICAgIHBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uKHApIHsgcGFyYW1ldGVyLmJpbmQocCwgdmlldyk7IH0pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBhbmQgcmV0dXJuIHZpc3VhbGl6YXRpb25cbiAgICB2aWV3LnVwZGF0ZSgpO1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2sodmlldywgc3BlYyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbWFnZVVSTCh2aWV3KSB7XG4gIHZhciByZW4gPSB2aWV3LnJlbmRlcmVyKCksXG4gICAgICBzY2VuZSA9IHJlbi5zY2VuZSgpO1xuXG4gIGlmIChyZW4uc3ZnKSB7XG4gICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVuLnN2ZygpXSwge3R5cGU6ICdpbWFnZS9zdmcreG1sJ30pO1xuICAgIHJldHVybiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgfSBlbHNlIGlmIChzY2VuZS50b0RhdGFVUkwpIHtcbiAgICByZXR1cm4gc2NlbmUudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBFcnJvcignUmVuZGVyZXIgZG9lcyBub3Qgc3VwcG9ydCBpbWFnZSBleHBvcnQuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmlld1NvdXJjZShzb3VyY2UpIHtcbiAgdmFyIGhlYWRlciA9ICc8aHRtbD48aGVhZD4nICsgY29uZmlnLnNvdXJjZV9oZWFkZXIgKyAnPC9oZWFkPicgKyAnPGJvZHk+PHByZT48Y29kZSBjbGFzcz1cImpzb25cIj4nO1xuICB2YXIgZm9vdGVyID0gJzwvY29kZT48L3ByZT4nICsgY29uZmlnLnNvdXJjZV9mb290ZXIgKyAnPC9ib2R5PjwvaHRtbD4nO1xuICB2YXIgd2luID0gd2luZG93Lm9wZW4oJycpO1xuICB3aW4uZG9jdW1lbnQud3JpdGUoaGVhZGVyICsgc291cmNlICsgZm9vdGVyKTtcbiAgd2luLmRvY3VtZW50LnRpdGxlID0gJ1ZlZ2EgSlNPTiBTb3VyY2UnO1xufVxuXG4vLyBtYWtlIGNvbmZpZyBhbmQgaW1hZ2VVUkwgZXh0ZXJuYWxseSB2aXNpYmxlXG5lbWJlZC5jb25maWcgPSBjb25maWc7XG5lbWJlZC5pbWFnZVVSTCA9IGltYWdlVVJMO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtYmVkO1xuIiwidmFyIGQzID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2QzJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydkMyddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wyd2ZyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsndmcnXSA6IG51bGwpLnV0aWwubXV0YXRvcjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uKGVsLCBwYXJhbSwgc3BlYykge1xuICAgIHJldHVybiAocmV3cml0ZShwYXJhbSwgc3BlYyksIGhhbmRsZShlbCwgcGFyYW0pKTtcbiAgfSxcbiAgYmluZDogZnVuY3Rpb24ocGFyYW0sIHZpZXcpIHtcbiAgICBwYXJhbS5kb20uZm9yRWFjaChmdW5jdGlvbihlbCkgeyBlbC5fX3ZlZ2FfXyA9IHZpZXc7IH0pO1xuICAgIHZpZXcub25TaWduYWwocGFyYW0uZG9tWzBdLm5hbWUsIGZ1bmN0aW9uKGssIHYpIHsgcGFyYW0uc2V0KHYpOyB9KTtcbiAgfVxufTtcblxuLy8gc3BlYyByZS13cml0ZVxuXG5mdW5jdGlvbiByZXdyaXRlKHBhcmFtLCBzcGVjKSB7XG4gIC8vIGFkZCBzaWduYWwgdG8gdG9wLWxldmVsIGlmIG5vdCBkZWZpbmVkXG4gIHZhciBzZyA9IHNwZWMuc2lnbmFscyB8fCAoc3BlYy5zaWduYWxzID0gW10pO1xuICBmb3IgKHZhciBpPTA7IGk8c2cubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoc2dbaV0ubmFtZSA9PT0gcGFyYW0uc2lnbmFsKSBicmVhaztcbiAgfVxuICBpZiAoaSA9PT0gc2cubGVuZ3RoKSB7XG4gICAgc2cucHVzaCh7XG4gICAgICBuYW1lOiBwYXJhbS5zaWduYWwsXG4gICAgICBpbml0OiBwYXJhbS52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVwbGFjZSB2YWx1ZXMgZm9yIHJlLXdyaXRlIGVudHJpZXNcbiAgKHBhcmFtLnJld3JpdGUgfHwgW10pLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuICAgICQocGF0aCkoc3BlYywge3NpZ25hbDogcGFyYW0uc2lnbmFsfSk7XG4gIH0pO1xufVxuXG4vLyBIVE1MIG91dHB1dCBoYW5kbGVyc1xuXG5mdW5jdGlvbiBoYW5kbGUoZWwsIHBhcmFtKSB7XG4gIHZhciBwID0gZWwuYXBwZW5kKCdkaXYnKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtJyk7XG5cbiAgcC5hcHBlbmQoJ3NwYW4nKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtLW5hbWUnKVxuICAgIC50ZXh0KHBhcmFtLm5hbWUgfHwgcGFyYW0uc2lnbmFsKTtcblxuICB2YXIgaW5wdXQgPSBmb3JtO1xuICBzd2l0Y2ggKHBhcmFtLnR5cGUpIHtcbiAgICBjYXNlICdjaGVja2JveCc6IGlucHV0ID0gY2hlY2tib3g7IGJyZWFrO1xuICAgIGNhc2UgJ3NlbGVjdCc6ICAgaW5wdXQgPSBzZWxlY3Q7IGJyZWFrO1xuICAgIGNhc2UgJ3JhZGlvJzogICAgaW5wdXQgPSByYWRpbzsgYnJlYWs7XG4gICAgY2FzZSAncmFuZ2UnOiAgICBpbnB1dCA9IHJhbmdlOyBicmVhaztcbiAgfVxuXG4gIHJldHVybiBpbnB1dChwLCBwYXJhbSk7XG59XG5cbmZ1bmN0aW9uIGZvcm0oZWwsIHBhcmFtKSB7XG4gIHZhciBmbSA9IGVsLmFwcGVuZCgnaW5wdXQnKVxuICAgIC5vbignaW5wdXQnLCB1cGRhdGUpO1xuXG4gIGZvciAodmFyIGtleSBpbiBwYXJhbSkge1xuICAgIGlmIChrZXkgPT09ICdzaWduYWwnIHx8IGtleSA9PT0gJ3Jld3JpdGUnKSBjb250aW51ZTtcbiAgICBmbS5hdHRyKGtleSwgcGFyYW1ba2V5XSk7XG4gIH1cbiAgZm0uYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbCk7XG5cbiAgdmFyIG5vZGUgPSBmbS5ub2RlKCk7XG4gIHJldHVybiB7XG4gICAgZG9tOiBbbm9kZV0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkgeyBub2RlLnZhbHVlID0gdmFsdWU7IH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hlY2tib3goZWwsIHBhcmFtKSB7XG4gIHZhciBjYiA9IGVsLmFwcGVuZCgnaW5wdXQnKVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7IHVwZGF0ZS5jYWxsKHRoaXMsIHRoaXMuY2hlY2tlZCk7IH0pXG4gICAgLmF0dHIoJ3R5cGUnLCAnY2hlY2tib3gnKVxuICAgIC5hdHRyKCduYW1lJywgcGFyYW0uc2lnbmFsKVxuICAgIC5hdHRyKCdjaGVja2VkJywgcGFyYW0udmFsdWUgfHwgbnVsbClcbiAgICAubm9kZSgpO1xuXG4gIHJldHVybiB7XG4gICAgZG9tOiBbY2JdLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHsgY2IuY2hlY2tlZCA9ICEhdmFsdWUgfHwgbnVsbDsgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBzZWxlY3QoZWwsIHBhcmFtKSB7XG4gIHZhciBzbCA9IGVsLmFwcGVuZCgnc2VsZWN0JylcbiAgICAuYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgdXBkYXRlLmNhbGwodGhpcywgdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0uX19kYXRhX18pO1xuICAgIH0pO1xuXG4gIHNsLnNlbGVjdEFsbCgnb3B0aW9uJylcbiAgICAuZGF0YShwYXJhbS5vcHRpb25zKVxuICAgLmVudGVyKCkuYXBwZW5kKCdvcHRpb24nKVxuICAgIC5hdHRyKCd2YWx1ZScsIHZnLnV0aWwuaWRlbnRpdHkpXG4gICAgLmF0dHIoJ3NlbGVjdGVkJywgZnVuY3Rpb24oeCkgeyByZXR1cm4geCA9PT0gcGFyYW0udmFsdWUgfHwgbnVsbDsgfSlcbiAgICAudGV4dCh2Zy51dGlsLmlkZW50aXR5KTtcbiAgXG4gIHZhciBub2RlID0gc2wubm9kZSgpO1xuICByZXR1cm4ge1xuICAgIGRvbTogW25vZGVdLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBpZHggPSBwYXJhbS5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgICAgbm9kZS5zZWxlY3RlZEluZGV4ID0gaWR4O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcmFkaW8oZWwsIHBhcmFtKSB7XG4gIHZhciByZyA9IGVsLmFwcGVuZCgnc3BhbicpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtcGFyYW0tcmFkaW8nKTtcblxuICB2YXIgbm9kZXMgPSBwYXJhbS5vcHRpb25zLm1hcChmdW5jdGlvbihvcHRpb24pIHtcbiAgICB2YXIgaWQgPSAndmVnYS1vcHRpb24tJyArIHBhcmFtLnNpZ25hbCArICctJyArIG9wdGlvbjtcblxuICAgIHZhciByYiA9IHJnLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgLmRhdHVtKG9wdGlvbilcbiAgICAgIC5vbignY2hhbmdlJywgdXBkYXRlKVxuICAgICAgLmF0dHIoJ2lkJywgaWQpXG4gICAgICAuYXR0cigndHlwZScsICdyYWRpbycpXG4gICAgICAuYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbClcbiAgICAgIC5hdHRyKCd2YWx1ZScsIG9wdGlvbilcbiAgICAgIC5hdHRyKCdjaGVja2VkJywgb3B0aW9uID09PSBwYXJhbS52YWx1ZSB8fCBudWxsKTtcblxuICAgIHJnLmFwcGVuZCgnbGFiZWwnKVxuICAgICAgLmF0dHIoJ2ZvcicsIGlkKVxuICAgICAgLnRleHQob3B0aW9uKTtcblxuICAgIHJldHVybiByYi5ub2RlKCk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgZG9tOiBub2RlcyxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8bm9kZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG5vZGVzW2ldLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgIG5vZGVzW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiByYW5nZShlbCwgcGFyYW0pIHtcbiAgdmFyIHZhbCA9IHBhcmFtLnZhbHVlICE9PSB1bmRlZmluZWQgPyBwYXJhbS52YWx1ZSA6XG4gICAgKCgrcGFyYW0ubWF4KSArICgrcGFyYW0ubWluKSkgLyAyO1xuXG4gIHZhciBybiA9IGVsLmFwcGVuZCgnaW5wdXQnKVxuICAgIC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgIGxibC50ZXh0KHRoaXMudmFsdWUpO1xuICAgICAgdXBkYXRlLmNhbGwodGhpcywgK3RoaXMudmFsdWUpO1xuICAgIH0pXG4gICAgLmF0dHIoJ3R5cGUnLCAncmFuZ2UnKVxuICAgIC5hdHRyKCduYW1lJywgcGFyYW0uc2lnbmFsKVxuICAgIC5hdHRyKCd2YWx1ZScsIHZhbClcbiAgICAuYXR0cignbWluJywgcGFyYW0ubWluKVxuICAgIC5hdHRyKCdtYXgnLCBwYXJhbS5tYXgpXG4gICAgLmF0dHIoJ3N0ZXAnLCBwYXJhbS5zdGVwIHx8IHZnLnV0aWwuYmlucyh7XG4gICAgICBtaW46IHBhcmFtLm1pbixcbiAgICAgIG1heDogcGFyYW0ubWF4LFxuICAgICAgbWF4YmluczogMTAwXG4gICAgfSkuc3RlcCk7XG5cbiAgdmFyIGxibCA9IGVsLmFwcGVuZCgnbGFiZWwnKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXJhbmdlJylcbiAgICAudGV4dCh2YWwpO1xuXG4gIHZhciBub2RlID0gcm4ubm9kZSgpO1xuICByZXR1cm4ge1xuICAgIGRvbTogW25vZGVdLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZTtcbiAgICAgIGxibC50ZXh0KHZhbHVlKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgdmFsdWUgPSB0aGlzLl9fZGF0YV9fIHx8IGQzLmV2ZW50LnRhcmdldC52YWx1ZTtcbiAgdGhpcy5fX3ZlZ2FfXy5zaWduYWwodGhpcy5uYW1lLCB2YWx1ZSkudXBkYXRlKCk7XG59XG4iLCIvLyBvcGVuIGVkaXRvciB1cmwgaW4gYSBuZXcgd2luZG93LCBhbmQgcGFzcyBhIG1lc3NhZ2Vcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCB1cmwsIGRhdGEpIHtcbiAgdmFyIGVkaXRvciA9IHdpbmRvdy5vcGVuKHVybCksXG4gICAgICB3YWl0ID0gMTAwMDAsXG4gICAgICBzdGVwID0gMjUwLFxuICAgICAgY291bnQgPSB+fih3YWl0L3N0ZXApO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbihldnQpIHtcbiAgICBpZiAoZXZ0LnNvdXJjZSA9PT0gZWRpdG9yKSB7XG4gICAgICBjb3VudCA9IDA7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbiwgZmFsc2UpO1xuXG4gIC8vIHNlbmQgbWVzc2FnZVxuICAvLyBwZXJpb2RpY2FsbHkgcmVzZW5kIHVudGlsIGFjayByZWNlaXZlZCBvciB0aW1lb3V0XG4gIGZ1bmN0aW9uIHNlbmQoKSB7XG4gICAgaWYgKGNvdW50IDw9IDApIHJldHVybjtcbiAgICBlZGl0b3IucG9zdE1lc3NhZ2UoZGF0YSwgJyonKTtcbiAgICBzZXRUaW1lb3V0KHNlbmQsIHN0ZXApO1xuICAgIGNvdW50IC09IDE7XG4gIH1cbiAgc2V0VGltZW91dChzZW5kLCBzdGVwKTtcbn07XG4iXX0=
