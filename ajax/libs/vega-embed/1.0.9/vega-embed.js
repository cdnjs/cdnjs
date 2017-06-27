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
        var ext = (renderer==='canvas' ? 'png' : 'svg');
        ctrl.append('a')
          .text('Export as ' + ext.toUpperCase())
          .attr('href', '#')
          .attr('target', '_blank')
          .attr('download', (spec.name || 'vega') + '.' + ext)
          .on('mousedown', function() {
            this.href = view.toImageURL(ext);
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

function viewSource(source) {
  var header = '<html><head>' + config.source_header + '</head>' + '<body><pre><code class="json">';
  var footer = '</code></pre>' + config.source_footer + '</body></html>';
  var win = window.open('');
  win.document.write(header + source + footer);
  win.document.title = 'Vega JSON Source';
}

// make config externally visible
embed.config = config;

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZW1iZWQuanMiLCJzcmMvcGFyYW1ldGVyLmpzIiwic3JjL3Bvc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZDMgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snZDMnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2QzJ10gOiBudWxsKSxcbiAgICB2ZyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wyd2ZyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsndmcnXSA6IG51bGwpLFxuICAgIHBhcmFtZXRlciA9IHJlcXVpcmUoJy4vcGFyYW1ldGVyJyksXG4gICAgcG9zdCA9IHJlcXVpcmUoJy4vcG9zdCcpO1xuXG52YXIgY29uZmlnID0ge1xuICAvLyBVUkwgZm9yIGxvYWRpbmcgc3BlY3MgaW50byBlZGl0b3JcbiAgZWRpdG9yX3VybDogJ2h0dHA6Ly92ZWdhLmdpdGh1Yi5pby92ZWdhLWVkaXRvci8nLFxuXG4gIC8vIEhUTUwgdG8gaW5qZWN0IHdpdGhpbiB2aWV3IHNvdXJjZSBoZWFkIGVsZW1lbnRcbiAgc291cmNlX2hlYWRlcjogJycsXG5cbiAgLy8gSFRNTCB0byBpbmplY3QgYmVmb3JlIHZpZXcgc291cmNlIGNsb3NpbmcgYm9keSB0YWdcbiAgc291cmNlX2Zvb3RlcjogJydcbn07XG5cbmZ1bmN0aW9uIGxvYWQodXJsLCBhcmcsIGVsLCBjYWxsYmFjaykge1xuICB2Zy51dGlsLmxvYWQoe3VybDogdXJsfSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgaWYgKGVyciB8fCAhZGF0YSkge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIgfHwgKCdObyBkYXRhIGZvdW5kIGF0ICcgKyB1cmwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbWFyc2hhbCBlbWJlZGRpbmcgc3BlYyBhbmQgcmVzdGFydFxuICAgICAgdmFyIG9wdCA9ICFhcmcgPyBKU09OLnBhcnNlKGRhdGEpIDogdmcudXRpbC5leHRlbmQoe3NvdXJjZTogZGF0YX0sIGFyZyk7XG4gICAgICBlbWJlZChlbCwgb3B0LCBjYWxsYmFjayk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gRW1iZWQgYSBWZWdhIHZpc3VhbGl6YXRpb24gY29tcG9uZW50IGluIGEgd2ViIHBhZ2UuXG4vLyBlbDogRE9NIGVsZW1lbnQgaW4gd2hpY2ggdG8gcGxhY2UgY29tcG9uZW50IChET00gbm9kZSBvciBDU1Mgc2VsZWN0b3IpXG4vLyBvcHQ6IEVtYmVkZGluZyBzcGVjaWZpY2F0aW9uIChwYXJzZWQgSlNPTiBvciBVUkwgc3RyaW5nKVxuLy8gY2FsbGJhY2s6IGludm9rZWQgd2l0aCB0aGUgZ2VuZXJhdGVkIFZlZ2EgVmlldyBpbnN0YW5jZVxuZnVuY3Rpb24gZW1iZWQoZWwsIG9wdCwgY2FsbGJhY2spIHtcbiAgdmFyIHBhcmFtcyA9IFtdLCBzb3VyY2UsIHNwZWM7XG5cbiAgaWYgKHZnLnV0aWwuaXNTdHJpbmcob3B0KSkge1xuICAgIHJldHVybiBsb2FkKG9wdCwgbnVsbCwgZWwsIGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmIChvcHQuc291cmNlKSB7XG4gICAgc291cmNlID0gb3B0LnNvdXJjZTtcbiAgICBzcGVjID0gSlNPTi5wYXJzZShzb3VyY2UpO1xuICB9IGVsc2UgaWYgKG9wdC5zcGVjKSB7XG4gICAgc3BlYyA9IG9wdC5zcGVjO1xuICAgIHNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KHNwZWMsIG51bGwsIDIpO1xuICB9IGVsc2UgaWYgKG9wdC51cmwpIHtcbiAgICByZXR1cm4gbG9hZChvcHQudXJsLCBvcHQsIGVsLCBjYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgc3BlYyA9IG9wdDtcbiAgICBzb3VyY2UgPSBKU09OLnN0cmluZ2lmeShzcGVjLCBudWxsLCAyKTtcbiAgICBvcHQgPSB7c3BlYzogc3BlYywgYWN0aW9uczogZmFsc2V9O1xuICB9XG5cbiAgLy8gZW5zdXJlIGNvbnRhaW5lciBkaXYgaGFzIGNsYXNzICd2ZWdhLWVtYmVkJ1xuICB2YXIgZGl2ID0gZDMuc2VsZWN0KGVsKVxuICAgIC5jbGFzc2VkKCd2ZWdhLWVtYmVkJywgdHJ1ZSlcbiAgICAuaHRtbCgnJyk7IC8vIGNsZWFyIGNvbnRhaW5lclxuXG4gIC8vIGhhbmRsZSBwYXJhbWV0ZXJzXG4gIGlmIChvcHQucGFyYW1ldGVycykge1xuICAgIHZhciBlbHAgPSBvcHQucGFyYW1ldGVyX2VsID8gZDMuc2VsZWN0KG9wdC5wYXJhbWV0ZXJfZWwpIDogZGl2O1xuICAgIHZhciBwZGl2ID0gZWxwLmFwcGVuZCgnZGl2JylcbiAgICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtcycpO1xuICAgIHBhcmFtcyA9IG9wdC5wYXJhbWV0ZXJzLm1hcChmdW5jdGlvbihwKSB7XG4gICAgICByZXR1cm4gcGFyYW1ldGVyLmluaXQocGRpdiwgcCwgc3BlYyk7XG4gICAgfSk7XG4gIH1cblxuICB2Zy5wYXJzZS5zcGVjKHNwZWMsIGZ1bmN0aW9uKGNoYXJ0KSB7XG4gICAgdmFyIHJlbmRlcmVyID0gb3B0LnJlbmRlcmVyIHx8ICdjYW52YXMnLFxuICAgICAgICBhY3Rpb25zICA9IG9wdC5hY3Rpb25zIHx8IHt9O1xuXG4gICAgdmFyIHZpZXcgPSBjaGFydCh7XG4gICAgICBlbDogZWwsXG4gICAgICBkYXRhOiBvcHQuZGF0YSB8fCB1bmRlZmluZWQsXG4gICAgICByZW5kZXJlcjogcmVuZGVyZXJcbiAgICB9KTtcblxuICAgIGlmIChvcHQuYWN0aW9ucyAhPT0gZmFsc2UpIHtcbiAgICAgIC8vIGFkZCBjaGlsZCBkaXYgdG8gaG91c2UgYWN0aW9uIGxpbmtzXG4gICAgICB2YXIgY3RybCA9IGRpdi5hcHBlbmQoJ2RpdicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLWFjdGlvbnMnKTtcblxuICAgICAgLy8gYWRkICdFeHBvcnQnIGFjdGlvblxuICAgICAgaWYgKGFjdGlvbnMuZXhwb3J0ICE9PSBmYWxzZSkge1xuICAgICAgICB2YXIgZXh0ID0gKHJlbmRlcmVyPT09J2NhbnZhcycgPyAncG5nJyA6ICdzdmcnKTtcbiAgICAgICAgY3RybC5hcHBlbmQoJ2EnKVxuICAgICAgICAgIC50ZXh0KCdFeHBvcnQgYXMgJyArIGV4dC50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAgIC5hdHRyKCdocmVmJywgJyMnKVxuICAgICAgICAgIC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJylcbiAgICAgICAgICAuYXR0cignZG93bmxvYWQnLCAoc3BlYy5uYW1lIHx8ICd2ZWdhJykgKyAnLicgKyBleHQpXG4gICAgICAgICAgLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaHJlZiA9IHZpZXcudG9JbWFnZVVSTChleHQpO1xuICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkICdWaWV3IFNvdXJjZScgYWN0aW9uXG4gICAgICBpZiAoYWN0aW9ucy5zb3VyY2UgIT09IGZhbHNlKSB7XG4gICAgICAgIGN0cmwuYXBwZW5kKCdhJylcbiAgICAgICAgICAudGV4dCgnVmlldyBTb3VyY2UnKVxuICAgICAgICAgIC5hdHRyKCdocmVmJywgJyMnKVxuICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZpZXdTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCAnT3BlbiBpbiBWZWdhIEVkaXRvcicgYWN0aW9uXG4gICAgICBpZiAoYWN0aW9ucy5lZGl0b3IgIT09IGZhbHNlKSB7XG4gICAgICAgIGN0cmwuYXBwZW5kKCdhJylcbiAgICAgICAgICAudGV4dCgnT3BlbiBpbiBWZWdhIEVkaXRvcicpXG4gICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIycpXG4gICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcG9zdCh3aW5kb3csIGVtYmVkLmNvbmZpZy5lZGl0b3JfdXJsLCB7c3BlYzogc291cmNlfSk7XG4gICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGJpbmQgYWxsIHBhcmFtZXRlciBlbGVtZW50c1xuICAgIHBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uKHApIHsgcGFyYW1ldGVyLmJpbmQocCwgdmlldyk7IH0pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBhbmQgcmV0dXJuIHZpc3VhbGl6YXRpb25cbiAgICB2aWV3LnVwZGF0ZSgpO1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2sodmlldywgc3BlYyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB2aWV3U291cmNlKHNvdXJjZSkge1xuICB2YXIgaGVhZGVyID0gJzxodG1sPjxoZWFkPicgKyBjb25maWcuc291cmNlX2hlYWRlciArICc8L2hlYWQ+JyArICc8Ym9keT48cHJlPjxjb2RlIGNsYXNzPVwianNvblwiPic7XG4gIHZhciBmb290ZXIgPSAnPC9jb2RlPjwvcHJlPicgKyBjb25maWcuc291cmNlX2Zvb3RlciArICc8L2JvZHk+PC9odG1sPic7XG4gIHZhciB3aW4gPSB3aW5kb3cub3BlbignJyk7XG4gIHdpbi5kb2N1bWVudC53cml0ZShoZWFkZXIgKyBzb3VyY2UgKyBmb290ZXIpO1xuICB3aW4uZG9jdW1lbnQudGl0bGUgPSAnVmVnYSBKU09OIFNvdXJjZSc7XG59XG5cbi8vIG1ha2UgY29uZmlnIGV4dGVybmFsbHkgdmlzaWJsZVxuZW1iZWQuY29uZmlnID0gY29uZmlnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtYmVkO1xuIiwidmFyIGQzID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2QzJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydkMyddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wyd2ZyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsndmcnXSA6IG51bGwpLnV0aWwubXV0YXRvcjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uKGVsLCBwYXJhbSwgc3BlYykge1xuICAgIHJldHVybiAocmV3cml0ZShwYXJhbSwgc3BlYyksIGhhbmRsZShlbCwgcGFyYW0pKTtcbiAgfSxcbiAgYmluZDogZnVuY3Rpb24ocGFyYW0sIHZpZXcpIHtcbiAgICBwYXJhbS5kb20uZm9yRWFjaChmdW5jdGlvbihlbCkgeyBlbC5fX3ZlZ2FfXyA9IHZpZXc7IH0pO1xuICAgIHZpZXcub25TaWduYWwocGFyYW0uZG9tWzBdLm5hbWUsIGZ1bmN0aW9uKGssIHYpIHsgcGFyYW0uc2V0KHYpOyB9KTtcbiAgfVxufTtcblxuLy8gc3BlYyByZS13cml0ZVxuXG5mdW5jdGlvbiByZXdyaXRlKHBhcmFtLCBzcGVjKSB7XG4gIC8vIGFkZCBzaWduYWwgdG8gdG9wLWxldmVsIGlmIG5vdCBkZWZpbmVkXG4gIHZhciBzZyA9IHNwZWMuc2lnbmFscyB8fCAoc3BlYy5zaWduYWxzID0gW10pO1xuICBmb3IgKHZhciBpPTA7IGk8c2cubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoc2dbaV0ubmFtZSA9PT0gcGFyYW0uc2lnbmFsKSBicmVhaztcbiAgfVxuICBpZiAoaSA9PT0gc2cubGVuZ3RoKSB7XG4gICAgc2cucHVzaCh7XG4gICAgICBuYW1lOiBwYXJhbS5zaWduYWwsXG4gICAgICBpbml0OiBwYXJhbS52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVwbGFjZSB2YWx1ZXMgZm9yIHJlLXdyaXRlIGVudHJpZXNcbiAgKHBhcmFtLnJld3JpdGUgfHwgW10pLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuICAgICQocGF0aCkoc3BlYywge3NpZ25hbDogcGFyYW0uc2lnbmFsfSk7XG4gIH0pO1xufVxuXG4vLyBIVE1MIG91dHB1dCBoYW5kbGVyc1xuXG5mdW5jdGlvbiBoYW5kbGUoZWwsIHBhcmFtKSB7XG4gIHZhciBwID0gZWwuYXBwZW5kKCdkaXYnKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtJyk7XG5cbiAgcC5hcHBlbmQoJ3NwYW4nKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtLW5hbWUnKVxuICAgIC50ZXh0KHBhcmFtLm5hbWUgfHwgcGFyYW0uc2lnbmFsKTtcblxuICB2YXIgaW5wdXQgPSBmb3JtO1xuICBzd2l0Y2ggKHBhcmFtLnR5cGUpIHtcbiAgICBjYXNlICdjaGVja2JveCc6IGlucHV0ID0gY2hlY2tib3g7IGJyZWFrO1xuICAgIGNhc2UgJ3NlbGVjdCc6ICAgaW5wdXQgPSBzZWxlY3Q7IGJyZWFrO1xuICAgIGNhc2UgJ3JhZGlvJzogICAgaW5wdXQgPSByYWRpbzsgYnJlYWs7XG4gICAgY2FzZSAncmFuZ2UnOiAgICBpbnB1dCA9IHJhbmdlOyBicmVhaztcbiAgfVxuXG4gIHJldHVybiBpbnB1dChwLCBwYXJhbSk7XG59XG5cbmZ1bmN0aW9uIGZvcm0oZWwsIHBhcmFtKSB7XG4gIHZhciBmbSA9IGVsLmFwcGVuZCgnaW5wdXQnKVxuICAgIC5vbignaW5wdXQnLCB1cGRhdGUpO1xuXG4gIGZvciAodmFyIGtleSBpbiBwYXJhbSkge1xuICAgIGlmIChrZXkgPT09ICdzaWduYWwnIHx8IGtleSA9PT0gJ3Jld3JpdGUnKSBjb250aW51ZTtcbiAgICBmbS5hdHRyKGtleSwgcGFyYW1ba2V5XSk7XG4gIH1cbiAgZm0uYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbCk7XG5cbiAgdmFyIG5vZGUgPSBmbS5ub2RlKCk7XG4gIHJldHVybiB7XG4gICAgZG9tOiBbbm9kZV0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkgeyBub2RlLnZhbHVlID0gdmFsdWU7IH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hlY2tib3goZWwsIHBhcmFtKSB7XG4gIHZhciBjYiA9IGVsLmFwcGVuZCgnaW5wdXQnKVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7IHVwZGF0ZS5jYWxsKHRoaXMsIHRoaXMuY2hlY2tlZCk7IH0pXG4gICAgLmF0dHIoJ3R5cGUnLCAnY2hlY2tib3gnKVxuICAgIC5hdHRyKCduYW1lJywgcGFyYW0uc2lnbmFsKVxuICAgIC5hdHRyKCdjaGVja2VkJywgcGFyYW0udmFsdWUgfHwgbnVsbClcbiAgICAubm9kZSgpO1xuXG4gIHJldHVybiB7XG4gICAgZG9tOiBbY2JdLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHsgY2IuY2hlY2tlZCA9ICEhdmFsdWUgfHwgbnVsbDsgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBzZWxlY3QoZWwsIHBhcmFtKSB7XG4gIHZhciBzbCA9IGVsLmFwcGVuZCgnc2VsZWN0JylcbiAgICAuYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgdXBkYXRlLmNhbGwodGhpcywgdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0uX19kYXRhX18pO1xuICAgIH0pO1xuXG4gIHNsLnNlbGVjdEFsbCgnb3B0aW9uJylcbiAgICAuZGF0YShwYXJhbS5vcHRpb25zKVxuICAgLmVudGVyKCkuYXBwZW5kKCdvcHRpb24nKVxuICAgIC5hdHRyKCd2YWx1ZScsIHZnLnV0aWwuaWRlbnRpdHkpXG4gICAgLmF0dHIoJ3NlbGVjdGVkJywgZnVuY3Rpb24oeCkgeyByZXR1cm4geCA9PT0gcGFyYW0udmFsdWUgfHwgbnVsbDsgfSlcbiAgICAudGV4dCh2Zy51dGlsLmlkZW50aXR5KTtcbiAgXG4gIHZhciBub2RlID0gc2wubm9kZSgpO1xuICByZXR1cm4ge1xuICAgIGRvbTogW25vZGVdLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBpZHggPSBwYXJhbS5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgICAgbm9kZS5zZWxlY3RlZEluZGV4ID0gaWR4O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcmFkaW8oZWwsIHBhcmFtKSB7XG4gIHZhciByZyA9IGVsLmFwcGVuZCgnc3BhbicpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtcGFyYW0tcmFkaW8nKTtcblxuICB2YXIgbm9kZXMgPSBwYXJhbS5vcHRpb25zLm1hcChmdW5jdGlvbihvcHRpb24pIHtcbiAgICB2YXIgaWQgPSAndmVnYS1vcHRpb24tJyArIHBhcmFtLnNpZ25hbCArICctJyArIG9wdGlvbjtcblxuICAgIHZhciByYiA9IHJnLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgLmRhdHVtKG9wdGlvbilcbiAgICAgIC5vbignY2hhbmdlJywgdXBkYXRlKVxuICAgICAgLmF0dHIoJ2lkJywgaWQpXG4gICAgICAuYXR0cigndHlwZScsICdyYWRpbycpXG4gICAgICAuYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbClcbiAgICAgIC5hdHRyKCd2YWx1ZScsIG9wdGlvbilcbiAgICAgIC5hdHRyKCdjaGVja2VkJywgb3B0aW9uID09PSBwYXJhbS52YWx1ZSB8fCBudWxsKTtcblxuICAgIHJnLmFwcGVuZCgnbGFiZWwnKVxuICAgICAgLmF0dHIoJ2ZvcicsIGlkKVxuICAgICAgLnRleHQob3B0aW9uKTtcblxuICAgIHJldHVybiByYi5ub2RlKCk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgZG9tOiBub2RlcyxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8bm9kZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG5vZGVzW2ldLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgIG5vZGVzW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiByYW5nZShlbCwgcGFyYW0pIHtcbiAgdmFyIHZhbCA9IHBhcmFtLnZhbHVlICE9PSB1bmRlZmluZWQgPyBwYXJhbS52YWx1ZSA6XG4gICAgKCgrcGFyYW0ubWF4KSArICgrcGFyYW0ubWluKSkgLyAyO1xuXG4gIHZhciBybiA9IGVsLmFwcGVuZCgnaW5wdXQnKVxuICAgIC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgIGxibC50ZXh0KHRoaXMudmFsdWUpO1xuICAgICAgdXBkYXRlLmNhbGwodGhpcywgK3RoaXMudmFsdWUpO1xuICAgIH0pXG4gICAgLmF0dHIoJ3R5cGUnLCAncmFuZ2UnKVxuICAgIC5hdHRyKCduYW1lJywgcGFyYW0uc2lnbmFsKVxuICAgIC5hdHRyKCd2YWx1ZScsIHZhbClcbiAgICAuYXR0cignbWluJywgcGFyYW0ubWluKVxuICAgIC5hdHRyKCdtYXgnLCBwYXJhbS5tYXgpXG4gICAgLmF0dHIoJ3N0ZXAnLCBwYXJhbS5zdGVwIHx8IHZnLnV0aWwuYmlucyh7XG4gICAgICBtaW46IHBhcmFtLm1pbixcbiAgICAgIG1heDogcGFyYW0ubWF4LFxuICAgICAgbWF4YmluczogMTAwXG4gICAgfSkuc3RlcCk7XG5cbiAgdmFyIGxibCA9IGVsLmFwcGVuZCgnbGFiZWwnKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXJhbmdlJylcbiAgICAudGV4dCh2YWwpO1xuXG4gIHZhciBub2RlID0gcm4ubm9kZSgpO1xuICByZXR1cm4ge1xuICAgIGRvbTogW25vZGVdLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZTtcbiAgICAgIGxibC50ZXh0KHZhbHVlKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgdmFsdWUgPSB0aGlzLl9fZGF0YV9fIHx8IGQzLmV2ZW50LnRhcmdldC52YWx1ZTtcbiAgdGhpcy5fX3ZlZ2FfXy5zaWduYWwodGhpcy5uYW1lLCB2YWx1ZSkudXBkYXRlKCk7XG59XG4iLCIvLyBvcGVuIGVkaXRvciB1cmwgaW4gYSBuZXcgd2luZG93LCBhbmQgcGFzcyBhIG1lc3NhZ2Vcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCB1cmwsIGRhdGEpIHtcbiAgdmFyIGVkaXRvciA9IHdpbmRvdy5vcGVuKHVybCksXG4gICAgICB3YWl0ID0gMTAwMDAsXG4gICAgICBzdGVwID0gMjUwLFxuICAgICAgY291bnQgPSB+fih3YWl0L3N0ZXApO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbihldnQpIHtcbiAgICBpZiAoZXZ0LnNvdXJjZSA9PT0gZWRpdG9yKSB7XG4gICAgICBjb3VudCA9IDA7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbiwgZmFsc2UpO1xuXG4gIC8vIHNlbmQgbWVzc2FnZVxuICAvLyBwZXJpb2RpY2FsbHkgcmVzZW5kIHVudGlsIGFjayByZWNlaXZlZCBvciB0aW1lb3V0XG4gIGZ1bmN0aW9uIHNlbmQoKSB7XG4gICAgaWYgKGNvdW50IDw9IDApIHJldHVybjtcbiAgICBlZGl0b3IucG9zdE1lc3NhZ2UoZGF0YSwgJyonKTtcbiAgICBzZXRUaW1lb3V0KHNlbmQsIHN0ZXApO1xuICAgIGNvdW50IC09IDE7XG4gIH1cbiAgc2V0VGltZW91dChzZW5kLCBzdGVwKTtcbn07XG4iXX0=
