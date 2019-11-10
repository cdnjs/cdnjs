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

// Embed a Vega visualization component in a web page.
// el: DOM element in which to place component (DOM node or CSS selector)
// opt: Embedding specification (parsed JSON or string)
// callback: invoked with the generated Vega View instance
function embed(el, opt, callback) {
  var params = [], source, spec;

  if (opt.source) {
    source = opt.source;
    spec = JSON.parse(source);
  } else if (opt.spec) {
    spec = opt.spec;
    source = JSON.stringify(spec, null, 2);
  } else if (opt.url) {
    vg.util.load({url: opt.url}, function(err, data) {
      if (err) {
        console.error(err);
      } else if (!data) {
        console.error('No data found at ' + opt.url);
      } else {
        // load code, extends options, and restart
        embed(el, vg.util.extend({source: data}, opt), callback);
      }
    });
    return;
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
    var view = chart({
      el: el,
      data: opt.data || undefined,
      renderer: opt.renderer || 'canvas'
    });

    if (opt.actions !== false) {
      // add child div to house action links
      var ctrl = div.append('div')
        .attr('class', 'vega-actions');

      // add 'View Source' action
      ctrl.append('a')
        .text('View Source')
        .attr('href', '#')
        .on('click', function() {
          viewSource(source);
          d3.event.preventDefault();
        });

      // add 'Open in Vega Editor' action
      ctrl.append('a')
        .text('Open in Vega Editor')
        .attr('href', '#')
        .on('click', function() {
          post(window, embed.config.editor_url, {spec: source});
          d3.event.preventDefault();
        });
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZW1iZWQuanMiLCJzcmMvcGFyYW1ldGVyLmpzIiwic3JjL3Bvc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBkMyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydkMyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnZDMnXSA6IG51bGwpLFxuICAgIHZnID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ3ZnJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyd2ZyddIDogbnVsbCksXG4gICAgcGFyYW1ldGVyID0gcmVxdWlyZSgnLi9wYXJhbWV0ZXInKSxcbiAgICBwb3N0ID0gcmVxdWlyZSgnLi9wb3N0Jyk7XG5cbnZhciBjb25maWcgPSB7XG4gIC8vIFVSTCBmb3IgbG9hZGluZyBzcGVjcyBpbnRvIGVkaXRvclxuICBlZGl0b3JfdXJsOiAnaHR0cDovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtZWRpdG9yLycsXG5cbiAgLy8gSFRNTCB0byBpbmplY3Qgd2l0aGluIHZpZXcgc291cmNlIGhlYWQgZWxlbWVudFxuICBzb3VyY2VfaGVhZGVyOiAnJyxcblxuICAvLyBIVE1MIHRvIGluamVjdCBiZWZvcmUgdmlldyBzb3VyY2UgY2xvc2luZyBib2R5IHRhZ1xuICBzb3VyY2VfZm9vdGVyOiAnJ1xufTtcblxuLy8gRW1iZWQgYSBWZWdhIHZpc3VhbGl6YXRpb24gY29tcG9uZW50IGluIGEgd2ViIHBhZ2UuXG4vLyBlbDogRE9NIGVsZW1lbnQgaW4gd2hpY2ggdG8gcGxhY2UgY29tcG9uZW50IChET00gbm9kZSBvciBDU1Mgc2VsZWN0b3IpXG4vLyBvcHQ6IEVtYmVkZGluZyBzcGVjaWZpY2F0aW9uIChwYXJzZWQgSlNPTiBvciBzdHJpbmcpXG4vLyBjYWxsYmFjazogaW52b2tlZCB3aXRoIHRoZSBnZW5lcmF0ZWQgVmVnYSBWaWV3IGluc3RhbmNlXG5mdW5jdGlvbiBlbWJlZChlbCwgb3B0LCBjYWxsYmFjaykge1xuICB2YXIgcGFyYW1zID0gW10sIHNvdXJjZSwgc3BlYztcblxuICBpZiAob3B0LnNvdXJjZSkge1xuICAgIHNvdXJjZSA9IG9wdC5zb3VyY2U7XG4gICAgc3BlYyA9IEpTT04ucGFyc2Uoc291cmNlKTtcbiAgfSBlbHNlIGlmIChvcHQuc3BlYykge1xuICAgIHNwZWMgPSBvcHQuc3BlYztcbiAgICBzb3VyY2UgPSBKU09OLnN0cmluZ2lmeShzcGVjLCBudWxsLCAyKTtcbiAgfSBlbHNlIGlmIChvcHQudXJsKSB7XG4gICAgdmcudXRpbC5sb2FkKHt1cmw6IG9wdC51cmx9LCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSBlbHNlIGlmICghZGF0YSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdObyBkYXRhIGZvdW5kIGF0ICcgKyBvcHQudXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxvYWQgY29kZSwgZXh0ZW5kcyBvcHRpb25zLCBhbmQgcmVzdGFydFxuICAgICAgICBlbWJlZChlbCwgdmcudXRpbC5leHRlbmQoe3NvdXJjZTogZGF0YX0sIG9wdCksIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBlbnN1cmUgY29udGFpbmVyIGRpdiBoYXMgY2xhc3MgJ3ZlZ2EtZW1iZWQnXG4gIHZhciBkaXYgPSBkMy5zZWxlY3QoZWwpXG4gICAgLmNsYXNzZWQoJ3ZlZ2EtZW1iZWQnLCB0cnVlKVxuICAgIC5odG1sKCcnKTsgLy8gY2xlYXIgY29udGFpbmVyXG5cbiAgLy8gaGFuZGxlIHBhcmFtZXRlcnNcbiAgaWYgKG9wdC5wYXJhbWV0ZXJzKSB7XG4gICAgdmFyIGVscCA9IG9wdC5wYXJhbWV0ZXJfZWwgPyBkMy5zZWxlY3Qob3B0LnBhcmFtZXRlcl9lbCkgOiBkaXY7XG4gICAgdmFyIHBkaXYgPSBlbHAuYXBwZW5kKCdkaXYnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtcGFyYW1zJyk7XG4gICAgcGFyYW1zID0gb3B0LnBhcmFtZXRlcnMubWFwKGZ1bmN0aW9uKHApIHtcbiAgICAgIHJldHVybiBwYXJhbWV0ZXIuaW5pdChwZGl2LCBwLCBzcGVjKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZnLnBhcnNlLnNwZWMoc3BlYywgZnVuY3Rpb24oY2hhcnQpIHtcbiAgICB2YXIgdmlldyA9IGNoYXJ0KHtcbiAgICAgIGVsOiBlbCxcbiAgICAgIGRhdGE6IG9wdC5kYXRhIHx8IHVuZGVmaW5lZCxcbiAgICAgIHJlbmRlcmVyOiBvcHQucmVuZGVyZXIgfHwgJ2NhbnZhcydcbiAgICB9KTtcblxuICAgIGlmIChvcHQuYWN0aW9ucyAhPT0gZmFsc2UpIHtcbiAgICAgIC8vIGFkZCBjaGlsZCBkaXYgdG8gaG91c2UgYWN0aW9uIGxpbmtzXG4gICAgICB2YXIgY3RybCA9IGRpdi5hcHBlbmQoJ2RpdicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLWFjdGlvbnMnKTtcblxuICAgICAgLy8gYWRkICdWaWV3IFNvdXJjZScgYWN0aW9uXG4gICAgICBjdHJsLmFwcGVuZCgnYScpXG4gICAgICAgIC50ZXh0KCdWaWV3IFNvdXJjZScpXG4gICAgICAgIC5hdHRyKCdocmVmJywgJyMnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmlld1NvdXJjZShzb3VyY2UpO1xuICAgICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBhZGQgJ09wZW4gaW4gVmVnYSBFZGl0b3InIGFjdGlvblxuICAgICAgY3RybC5hcHBlbmQoJ2EnKVxuICAgICAgICAudGV4dCgnT3BlbiBpbiBWZWdhIEVkaXRvcicpXG4gICAgICAgIC5hdHRyKCdocmVmJywgJyMnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcG9zdCh3aW5kb3csIGVtYmVkLmNvbmZpZy5lZGl0b3JfdXJsLCB7c3BlYzogc291cmNlfSk7XG4gICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYmluZCBhbGwgcGFyYW1ldGVyIGVsZW1lbnRzXG4gICAgcGFyYW1zLmZvckVhY2goZnVuY3Rpb24ocCkgeyBwYXJhbWV0ZXIuYmluZChwLCB2aWV3KTsgfSk7XG5cbiAgICAvLyBpbml0aWFsaXplIGFuZCByZXR1cm4gdmlzdWFsaXphdGlvblxuICAgIHZpZXcudXBkYXRlKCk7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayh2aWV3LCBzcGVjKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHZpZXdTb3VyY2Uoc291cmNlKSB7XG4gIHZhciBoZWFkZXIgPSAnPGh0bWw+PGhlYWQ+JyArIGNvbmZpZy5zb3VyY2VfaGVhZGVyICsgJzwvaGVhZD4nICsgJzxib2R5PjxwcmU+PGNvZGUgY2xhc3M9XCJqc29uXCI+JztcbiAgdmFyIGZvb3RlciA9ICc8L2NvZGU+PC9wcmU+JyArIGNvbmZpZy5zb3VyY2VfZm9vdGVyICsgJzwvYm9keT48L2h0bWw+JztcbiAgdmFyIHdpbiA9IHdpbmRvdy5vcGVuKCcnKTtcbiAgd2luLmRvY3VtZW50LndyaXRlKGhlYWRlciArIHNvdXJjZSArIGZvb3Rlcik7XG4gIHdpbi5kb2N1bWVudC50aXRsZSA9ICdWZWdhIEpTT04gU291cmNlJztcbn1cblxuLy8gbWFrZSBjb25maWcgZXh0ZXJuYWxseSB2aXNpYmxlXG5lbWJlZC5jb25maWcgPSBjb25maWc7XG5cbm1vZHVsZS5leHBvcnRzID0gZW1iZWQ7XG4iLCJ2YXIgZDMgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snZDMnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2QzJ10gOiBudWxsKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ3ZnJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyd2ZyddIDogbnVsbCkudXRpbC5tdXRhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdDogZnVuY3Rpb24oZWwsIHBhcmFtLCBzcGVjKSB7XG4gICAgcmV0dXJuIChyZXdyaXRlKHBhcmFtLCBzcGVjKSwgaGFuZGxlKGVsLCBwYXJhbSkpO1xuICB9LFxuICBiaW5kOiBmdW5jdGlvbihwYXJhbSwgdmlldykge1xuICAgIHBhcmFtLmRvbS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7IGVsLl9fdmVnYV9fID0gdmlldzsgfSk7XG4gICAgdmlldy5vblNpZ25hbChwYXJhbS5kb21bMF0ubmFtZSwgZnVuY3Rpb24oaywgdikgeyBwYXJhbS5zZXQodik7IH0pO1xuICB9XG59O1xuXG4vLyBzcGVjIHJlLXdyaXRlXG5cbmZ1bmN0aW9uIHJld3JpdGUocGFyYW0sIHNwZWMpIHtcbiAgLy8gYWRkIHNpZ25hbCB0byB0b3AtbGV2ZWwgaWYgbm90IGRlZmluZWRcbiAgdmFyIHNnID0gc3BlYy5zaWduYWxzIHx8IChzcGVjLnNpZ25hbHMgPSBbXSk7XG4gIGZvciAodmFyIGk9MDsgaTxzZy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChzZ1tpXS5uYW1lID09PSBwYXJhbS5zaWduYWwpIGJyZWFrO1xuICB9XG4gIGlmIChpID09PSBzZy5sZW5ndGgpIHtcbiAgICBzZy5wdXNoKHtcbiAgICAgIG5hbWU6IHBhcmFtLnNpZ25hbCxcbiAgICAgIGluaXQ6IHBhcmFtLnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICAvLyByZXBsYWNlIHZhbHVlcyBmb3IgcmUtd3JpdGUgZW50cmllc1xuICAocGFyYW0ucmV3cml0ZSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG4gICAgJChwYXRoKShzcGVjLCB7c2lnbmFsOiBwYXJhbS5zaWduYWx9KTtcbiAgfSk7XG59XG5cbi8vIEhUTUwgb3V0cHV0IGhhbmRsZXJzXG5cbmZ1bmN0aW9uIGhhbmRsZShlbCwgcGFyYW0pIHtcbiAgdmFyIHAgPSBlbC5hcHBlbmQoJ2RpdicpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtcGFyYW0nKTtcblxuICBwLmFwcGVuZCgnc3BhbicpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtcGFyYW0tbmFtZScpXG4gICAgLnRleHQocGFyYW0ubmFtZSB8fCBwYXJhbS5zaWduYWwpO1xuXG4gIHZhciBpbnB1dCA9IGZvcm07XG4gIHN3aXRjaCAocGFyYW0udHlwZSkge1xuICAgIGNhc2UgJ2NoZWNrYm94JzogaW5wdXQgPSBjaGVja2JveDsgYnJlYWs7XG4gICAgY2FzZSAnc2VsZWN0JzogICBpbnB1dCA9IHNlbGVjdDsgYnJlYWs7XG4gICAgY2FzZSAncmFkaW8nOiAgICBpbnB1dCA9IHJhZGlvOyBicmVhaztcbiAgICBjYXNlICdyYW5nZSc6ICAgIGlucHV0ID0gcmFuZ2U7IGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGlucHV0KHAsIHBhcmFtKTtcbn1cblxuZnVuY3Rpb24gZm9ybShlbCwgcGFyYW0pIHtcbiAgdmFyIGZtID0gZWwuYXBwZW5kKCdpbnB1dCcpXG4gICAgLm9uKCdpbnB1dCcsIHVwZGF0ZSk7XG5cbiAgZm9yICh2YXIga2V5IGluIHBhcmFtKSB7XG4gICAgaWYgKGtleSA9PT0gJ3NpZ25hbCcgfHwga2V5ID09PSAncmV3cml0ZScpIGNvbnRpbnVlO1xuICAgIGZtLmF0dHIoa2V5LCBwYXJhbVtrZXldKTtcbiAgfVxuICBmbS5hdHRyKCduYW1lJywgcGFyYW0uc2lnbmFsKTtcblxuICB2YXIgbm9kZSA9IGZtLm5vZGUoKTtcbiAgcmV0dXJuIHtcbiAgICBkb206IFtub2RlXSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7IG5vZGUudmFsdWUgPSB2YWx1ZTsgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjaGVja2JveChlbCwgcGFyYW0pIHtcbiAgdmFyIGNiID0gZWwuYXBwZW5kKCdpbnB1dCcpXG4gICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHsgdXBkYXRlLmNhbGwodGhpcywgdGhpcy5jaGVja2VkKTsgfSlcbiAgICAuYXR0cigndHlwZScsICdjaGVja2JveCcpXG4gICAgLmF0dHIoJ25hbWUnLCBwYXJhbS5zaWduYWwpXG4gICAgLmF0dHIoJ2NoZWNrZWQnLCBwYXJhbS52YWx1ZSB8fCBudWxsKVxuICAgIC5ub2RlKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBkb206IFtjYl0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkgeyBjYi5jaGVja2VkID0gISF2YWx1ZSB8fCBudWxsOyB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdChlbCwgcGFyYW0pIHtcbiAgdmFyIHNsID0gZWwuYXBwZW5kKCdzZWxlY3QnKVxuICAgIC5hdHRyKCduYW1lJywgcGFyYW0uc2lnbmFsKVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICB1cGRhdGUuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnNbdGhpcy5zZWxlY3RlZEluZGV4XS5fX2RhdGFfXyk7XG4gICAgfSk7XG5cbiAgc2wuc2VsZWN0QWxsKCdvcHRpb24nKVxuICAgIC5kYXRhKHBhcmFtLm9wdGlvbnMpXG4gICAuZW50ZXIoKS5hcHBlbmQoJ29wdGlvbicpXG4gICAgLmF0dHIoJ3ZhbHVlJywgdmcudXRpbC5pZGVudGl0eSlcbiAgICAuYXR0cignc2VsZWN0ZWQnLCBmdW5jdGlvbih4KSB7IHJldHVybiB4ID09PSBwYXJhbS52YWx1ZSB8fCBudWxsOyB9KVxuICAgIC50ZXh0KHZnLnV0aWwuaWRlbnRpdHkpO1xuICBcbiAgdmFyIG5vZGUgPSBzbC5ub2RlKCk7XG4gIHJldHVybiB7XG4gICAgZG9tOiBbbm9kZV0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGlkeCA9IHBhcmFtLm9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICBub2RlLnNlbGVjdGVkSW5kZXggPSBpZHg7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiByYWRpbyhlbCwgcGFyYW0pIHtcbiAgdmFyIHJnID0gZWwuYXBwZW5kKCdzcGFuJylcbiAgICAuYXR0cignY2xhc3MnLCAndmVnYS1wYXJhbS1yYWRpbycpO1xuXG4gIHZhciBub2RlcyA9IHBhcmFtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKG9wdGlvbikge1xuICAgIHZhciBpZCA9ICd2ZWdhLW9wdGlvbi0nICsgcGFyYW0uc2lnbmFsICsgJy0nICsgb3B0aW9uO1xuXG4gICAgdmFyIHJiID0gcmcuYXBwZW5kKCdpbnB1dCcpXG4gICAgICAuZGF0dW0ob3B0aW9uKVxuICAgICAgLm9uKCdjaGFuZ2UnLCB1cGRhdGUpXG4gICAgICAuYXR0cignaWQnLCBpZClcbiAgICAgIC5hdHRyKCd0eXBlJywgJ3JhZGlvJylcbiAgICAgIC5hdHRyKCduYW1lJywgcGFyYW0uc2lnbmFsKVxuICAgICAgLmF0dHIoJ3ZhbHVlJywgb3B0aW9uKVxuICAgICAgLmF0dHIoJ2NoZWNrZWQnLCBvcHRpb24gPT09IHBhcmFtLnZhbHVlIHx8IG51bGwpO1xuXG4gICAgcmcuYXBwZW5kKCdsYWJlbCcpXG4gICAgICAuYXR0cignZm9yJywgaWQpXG4gICAgICAudGV4dChvcHRpb24pO1xuXG4gICAgcmV0dXJuIHJiLm5vZGUoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkb206IG5vZGVzLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAobm9kZXNbaV0udmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgbm9kZXNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJhbmdlKGVsLCBwYXJhbSkge1xuICB2YXIgdmFsID0gcGFyYW0udmFsdWUgIT09IHVuZGVmaW5lZCA/IHBhcmFtLnZhbHVlIDpcbiAgICAoKCtwYXJhbS5tYXgpICsgKCtwYXJhbS5taW4pKSAvIDI7XG5cbiAgdmFyIHJuID0gZWwuYXBwZW5kKCdpbnB1dCcpXG4gICAgLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgbGJsLnRleHQodGhpcy52YWx1ZSk7XG4gICAgICB1cGRhdGUuY2FsbCh0aGlzLCArdGhpcy52YWx1ZSk7XG4gICAgfSlcbiAgICAuYXR0cigndHlwZScsICdyYW5nZScpXG4gICAgLmF0dHIoJ25hbWUnLCBwYXJhbS5zaWduYWwpXG4gICAgLmF0dHIoJ3ZhbHVlJywgdmFsKVxuICAgIC5hdHRyKCdtaW4nLCBwYXJhbS5taW4pXG4gICAgLmF0dHIoJ21heCcsIHBhcmFtLm1heClcbiAgICAuYXR0cignc3RlcCcsIHBhcmFtLnN0ZXAgfHwgdmcudXRpbC5iaW5zKHtcbiAgICAgIG1pbjogcGFyYW0ubWluLFxuICAgICAgbWF4OiBwYXJhbS5tYXgsXG4gICAgICBtYXhiaW5zOiAxMDBcbiAgICB9KS5zdGVwKTtcblxuICB2YXIgbGJsID0gZWwuYXBwZW5kKCdsYWJlbCcpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtcmFuZ2UnKVxuICAgIC50ZXh0KHZhbCk7XG5cbiAgdmFyIG5vZGUgPSBybi5ub2RlKCk7XG4gIHJldHVybiB7XG4gICAgZG9tOiBbbm9kZV0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgbGJsLnRleHQodmFsdWUpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB2YWx1ZSA9IHRoaXMuX19kYXRhX18gfHwgZDMuZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB0aGlzLl9fdmVnYV9fLnNpZ25hbCh0aGlzLm5hbWUsIHZhbHVlKS51cGRhdGUoKTtcbn1cbiIsIi8vIG9wZW4gZWRpdG9yIHVybCBpbiBhIG5ldyB3aW5kb3csIGFuZCBwYXNzIGEgbWVzc2FnZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3csIHVybCwgZGF0YSkge1xuICB2YXIgZWRpdG9yID0gd2luZG93Lm9wZW4odXJsKSxcbiAgICAgIHdhaXQgPSAxMDAwMCxcbiAgICAgIHN0ZXAgPSAyNTAsXG4gICAgICBjb3VudCA9IH5+KHdhaXQvc3RlcCk7XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGV2dCkge1xuICAgIGlmIChldnQuc291cmNlID09PSBlZGl0b3IpIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuLCBmYWxzZSk7XG4gICAgfVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuLCBmYWxzZSk7XG5cbiAgLy8gc2VuZCBtZXNzYWdlXG4gIC8vIHBlcmlvZGljYWxseSByZXNlbmQgdW50aWwgYWNrIHJlY2VpdmVkIG9yIHRpbWVvdXRcbiAgZnVuY3Rpb24gc2VuZCgpIHtcbiAgICBpZiAoY291bnQgPD0gMCkgcmV0dXJuO1xuICAgIGVkaXRvci5wb3N0TWVzc2FnZShkYXRhLCAnKicpO1xuICAgIHNldFRpbWVvdXQoc2VuZCwgc3RlcCk7XG4gICAgY291bnQgLT0gMTtcbiAgfVxuICBzZXRUaW1lb3V0KHNlbmQsIHN0ZXApO1xufTtcbiJdfQ==
