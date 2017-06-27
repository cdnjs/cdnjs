(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.vg || (g.vg = {})).embed = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var d3 = (typeof window !== "undefined" ? window['d3'] : typeof global !== "undefined" ? global['d3'] : null),
    vg = (typeof window !== "undefined" ? window['vg'] : typeof global !== "undefined" ? global['vg'] : null),
    parameter = require('./param'),
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
  var renderer = opt.renderer || 'canvas',
      params = [], source, spec;

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
    .attr('class', 'vega-embed');

  // handle parameters
  if (opt.params) {
    var pdiv = div.append('div')
      .attr('class', 'vega-params');
    opt.params.forEach(function(p) {
      params = params.concat(parameter(pdiv, p, spec));
    });
  }

  vg.parse.spec(spec, function(chart) {
    var view = chart({el: el, renderer: renderer});

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

    // bind all parameter elements
    params.forEach(function(el) { el.__vega__ = view; });

    // initialize and return visualization
    view.update();
    if (callback) callback(view);
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

},{"./param":2,"./post":3}],2:[function(require,module,exports){
(function (global){
var d3 = (typeof window !== "undefined" ? window['d3'] : typeof global !== "undefined" ? global['d3'] : null),
    $ = (typeof window !== "undefined" ? window['vg'] : typeof global !== "undefined" ? global['vg'] : null).util.mutator;

module.exports = function(el, param, spec) {
  return (rewrite(param, spec), handle(el, param));
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

  return fm.node();
}

function checkbox(el, param) {
  return el.append('input')
    .on('change', function() { update.call(this, this.checked); })
    .attr('type', 'checkbox')
    .attr('name', param.signal)
    .attr('checked', param.value || null)
    .node();
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
  
  return sl.node();
}

function radio(el, param) {
  var rg = el.append('span')
    .attr('class', 'vega-param-radio');

  return param.options.map(function(option) {
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
}

function range(el, param) {
  var rn = el.append('input')
    .on('input', function() {
      lbl.text(this.value);
      update.call(this, +this.value);
    })
    .attr('type', 'range')
    .attr('name', param.signal)
    .attr('value', param.value)
    .attr('min', param.min)
    .attr('max', param.max)
    .attr('step', param.step || vg.util.bins({
      min: param.min,
      max: param.max,
      maxbins: 100
    }).step);

  var lbl = el.append('label')
    .text(param.value);

  return rn.node();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZW1iZWQuanMiLCJzcmMvcGFyYW0uanMiLCJzcmMvcG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGQzID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2QzJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydkMyddIDogbnVsbCksXG4gICAgdmcgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sndmcnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ3ZnJ10gOiBudWxsKSxcbiAgICBwYXJhbWV0ZXIgPSByZXF1aXJlKCcuL3BhcmFtJyksXG4gICAgcG9zdCA9IHJlcXVpcmUoJy4vcG9zdCcpO1xuXG52YXIgY29uZmlnID0ge1xuICAvLyBVUkwgZm9yIGxvYWRpbmcgc3BlY3MgaW50byBlZGl0b3JcbiAgZWRpdG9yX3VybDogJ2h0dHA6Ly92ZWdhLmdpdGh1Yi5pby92ZWdhLWVkaXRvci8nLFxuXG4gIC8vIEhUTUwgdG8gaW5qZWN0IHdpdGhpbiB2aWV3IHNvdXJjZSBoZWFkIGVsZW1lbnRcbiAgc291cmNlX2hlYWRlcjogJycsXG5cbiAgLy8gSFRNTCB0byBpbmplY3QgYmVmb3JlIHZpZXcgc291cmNlIGNsb3NpbmcgYm9keSB0YWdcbiAgc291cmNlX2Zvb3RlcjogJydcbn07XG5cbi8vIEVtYmVkIGEgVmVnYSB2aXN1YWxpemF0aW9uIGNvbXBvbmVudCBpbiBhIHdlYiBwYWdlLlxuLy8gZWw6IERPTSBlbGVtZW50IGluIHdoaWNoIHRvIHBsYWNlIGNvbXBvbmVudCAoRE9NIG5vZGUgb3IgQ1NTIHNlbGVjdG9yKVxuLy8gb3B0OiBFbWJlZGRpbmcgc3BlY2lmaWNhdGlvbiAocGFyc2VkIEpTT04gb3Igc3RyaW5nKVxuLy8gY2FsbGJhY2s6IGludm9rZWQgd2l0aCB0aGUgZ2VuZXJhdGVkIFZlZ2EgVmlldyBpbnN0YW5jZVxuZnVuY3Rpb24gZW1iZWQoZWwsIG9wdCwgY2FsbGJhY2spIHtcbiAgdmFyIHJlbmRlcmVyID0gb3B0LnJlbmRlcmVyIHx8ICdjYW52YXMnLFxuICAgICAgcGFyYW1zID0gW10sIHNvdXJjZSwgc3BlYztcblxuICBpZiAob3B0LnNvdXJjZSkge1xuICAgIHNvdXJjZSA9IG9wdC5zb3VyY2U7XG4gICAgc3BlYyA9IEpTT04ucGFyc2Uoc291cmNlKTtcbiAgfSBlbHNlIGlmIChvcHQuc3BlYykge1xuICAgIHNwZWMgPSBvcHQuc3BlYztcbiAgICBzb3VyY2UgPSBKU09OLnN0cmluZ2lmeShzcGVjLCBudWxsLCAyKTtcbiAgfSBlbHNlIGlmIChvcHQudXJsKSB7XG4gICAgdmcudXRpbC5sb2FkKHt1cmw6IG9wdC51cmx9LCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSBlbHNlIGlmICghZGF0YSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdObyBkYXRhIGZvdW5kIGF0ICcgKyBvcHQudXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxvYWQgY29kZSwgZXh0ZW5kcyBvcHRpb25zLCBhbmQgcmVzdGFydFxuICAgICAgICBlbWJlZChlbCwgdmcudXRpbC5leHRlbmQoe3NvdXJjZTogZGF0YX0sIG9wdCksIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBlbnN1cmUgY29udGFpbmVyIGRpdiBoYXMgY2xhc3MgJ3ZlZ2EtZW1iZWQnXG4gIHZhciBkaXYgPSBkMy5zZWxlY3QoZWwpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtZW1iZWQnKTtcblxuICAvLyBoYW5kbGUgcGFyYW1ldGVyc1xuICBpZiAob3B0LnBhcmFtcykge1xuICAgIHZhciBwZGl2ID0gZGl2LmFwcGVuZCgnZGl2JylcbiAgICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtcycpO1xuICAgIG9wdC5wYXJhbXMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuY29uY2F0KHBhcmFtZXRlcihwZGl2LCBwLCBzcGVjKSk7XG4gICAgfSk7XG4gIH1cblxuICB2Zy5wYXJzZS5zcGVjKHNwZWMsIGZ1bmN0aW9uKGNoYXJ0KSB7XG4gICAgdmFyIHZpZXcgPSBjaGFydCh7ZWw6IGVsLCByZW5kZXJlcjogcmVuZGVyZXJ9KTtcblxuICAgIC8vIGFkZCBjaGlsZCBkaXYgdG8gaG91c2UgYWN0aW9uIGxpbmtzXG4gICAgdmFyIGN0cmwgPSBkaXYuYXBwZW5kKCdkaXYnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtYWN0aW9ucycpO1xuXG4gICAgLy8gYWRkICdWaWV3IFNvdXJjZScgYWN0aW9uXG4gICAgY3RybC5hcHBlbmQoJ2EnKVxuICAgICAgLnRleHQoJ1ZpZXcgU291cmNlJylcbiAgICAgIC5hdHRyKCdocmVmJywgJyMnKVxuICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2aWV3U291cmNlKHNvdXJjZSk7XG4gICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcblxuICAgIC8vIGFkZCAnT3BlbiBpbiBWZWdhIEVkaXRvcicgYWN0aW9uXG4gICAgY3RybC5hcHBlbmQoJ2EnKVxuICAgICAgLnRleHQoJ09wZW4gaW4gVmVnYSBFZGl0b3InKVxuICAgICAgLmF0dHIoJ2hyZWYnLCAnIycpXG4gICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHBvc3Qod2luZG93LCBlbWJlZC5jb25maWcuZWRpdG9yX3VybCwge3NwZWM6IHNvdXJjZX0pO1xuICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG5cbiAgICAvLyBiaW5kIGFsbCBwYXJhbWV0ZXIgZWxlbWVudHNcbiAgICBwYXJhbXMuZm9yRWFjaChmdW5jdGlvbihlbCkgeyBlbC5fX3ZlZ2FfXyA9IHZpZXc7IH0pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBhbmQgcmV0dXJuIHZpc3VhbGl6YXRpb25cbiAgICB2aWV3LnVwZGF0ZSgpO1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2sodmlldyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB2aWV3U291cmNlKHNvdXJjZSkge1xuICB2YXIgaGVhZGVyID0gJzxodG1sPjxoZWFkPicgKyBjb25maWcuc291cmNlX2hlYWRlciArICc8L2hlYWQ+JyArICc8Ym9keT48cHJlPjxjb2RlIGNsYXNzPVwianNvblwiPic7XG4gIHZhciBmb290ZXIgPSAnPC9jb2RlPjwvcHJlPicgKyBjb25maWcuc291cmNlX2Zvb3RlciArICc8L2JvZHk+PC9odG1sPic7XG4gIHZhciB3aW4gPSB3aW5kb3cub3BlbignJyk7XG4gIHdpbi5kb2N1bWVudC53cml0ZShoZWFkZXIgKyBzb3VyY2UgKyBmb290ZXIpO1xuICB3aW4uZG9jdW1lbnQudGl0bGUgPSAnVmVnYSBKU09OIFNvdXJjZSc7XG59XG5cbi8vIG1ha2UgY29uZmlnIGV4dGVybmFsbHkgdmlzaWJsZVxuZW1iZWQuY29uZmlnID0gY29uZmlnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtYmVkO1xuIiwidmFyIGQzID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2QzJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydkMyddIDogbnVsbCksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wyd2ZyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsndmcnXSA6IG51bGwpLnV0aWwubXV0YXRvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgcGFyYW0sIHNwZWMpIHtcbiAgcmV0dXJuIChyZXdyaXRlKHBhcmFtLCBzcGVjKSwgaGFuZGxlKGVsLCBwYXJhbSkpO1xufTtcblxuLy8gc3BlYyByZS13cml0ZVxuXG5mdW5jdGlvbiByZXdyaXRlKHBhcmFtLCBzcGVjKSB7XG4gIC8vIGFkZCBzaWduYWwgdG8gdG9wLWxldmVsIGlmIG5vdCBkZWZpbmVkXG4gIHZhciBzZyA9IHNwZWMuc2lnbmFscyB8fCAoc3BlYy5zaWduYWxzID0gW10pO1xuICBmb3IgKHZhciBpPTA7IGk8c2cubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoc2dbaV0ubmFtZSA9PT0gcGFyYW0uc2lnbmFsKSBicmVhaztcbiAgfVxuICBpZiAoaSA9PT0gc2cubGVuZ3RoKSB7XG4gICAgc2cucHVzaCh7XG4gICAgICBuYW1lOiBwYXJhbS5zaWduYWwsXG4gICAgICBpbml0OiBwYXJhbS52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVwbGFjZSB2YWx1ZXMgZm9yIHJlLXdyaXRlIGVudHJpZXNcbiAgKHBhcmFtLnJld3JpdGUgfHwgW10pLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuICAgICQocGF0aCkoc3BlYywge3NpZ25hbDogcGFyYW0uc2lnbmFsfSk7XG4gIH0pO1xufVxuXG4vLyBIVE1MIG91dHB1dCBoYW5kbGVyc1xuXG5mdW5jdGlvbiBoYW5kbGUoZWwsIHBhcmFtKSB7XG4gIHZhciBwID0gZWwuYXBwZW5kKCdkaXYnKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtJyk7XG5cbiAgcC5hcHBlbmQoJ3NwYW4nKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtLW5hbWUnKVxuICAgIC50ZXh0KHBhcmFtLm5hbWUgfHwgcGFyYW0uc2lnbmFsKTtcblxuICB2YXIgaW5wdXQgPSBmb3JtO1xuICBzd2l0Y2ggKHBhcmFtLnR5cGUpIHtcbiAgICBjYXNlICdjaGVja2JveCc6IGlucHV0ID0gY2hlY2tib3g7IGJyZWFrO1xuICAgIGNhc2UgJ3NlbGVjdCc6ICAgaW5wdXQgPSBzZWxlY3Q7IGJyZWFrO1xuICAgIGNhc2UgJ3JhZGlvJzogICAgaW5wdXQgPSByYWRpbzsgYnJlYWs7XG4gICAgY2FzZSAncmFuZ2UnOiAgICBpbnB1dCA9IHJhbmdlOyBicmVhaztcbiAgfVxuXG4gIHJldHVybiBpbnB1dChwLCBwYXJhbSk7XG59XG5cbmZ1bmN0aW9uIGZvcm0oZWwsIHBhcmFtKSB7XG4gIHZhciBmbSA9IGVsLmFwcGVuZCgnaW5wdXQnKVxuICAgIC5vbignaW5wdXQnLCB1cGRhdGUpO1xuXG4gIGZvciAodmFyIGtleSBpbiBwYXJhbSkge1xuICAgIGlmIChrZXkgPT09ICdzaWduYWwnIHx8IGtleSA9PT0gJ3Jld3JpdGUnKSBjb250aW51ZTtcbiAgICBmbS5hdHRyKGtleSwgcGFyYW1ba2V5XSk7XG4gIH1cbiAgZm0uYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbCk7XG5cbiAgcmV0dXJuIGZtLm5vZGUoKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tib3goZWwsIHBhcmFtKSB7XG4gIHJldHVybiBlbC5hcHBlbmQoJ2lucHV0JylcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkgeyB1cGRhdGUuY2FsbCh0aGlzLCB0aGlzLmNoZWNrZWQpOyB9KVxuICAgIC5hdHRyKCd0eXBlJywgJ2NoZWNrYm94JylcbiAgICAuYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbClcbiAgICAuYXR0cignY2hlY2tlZCcsIHBhcmFtLnZhbHVlIHx8IG51bGwpXG4gICAgLm5vZGUoKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KGVsLCBwYXJhbSkge1xuICB2YXIgc2wgPSBlbC5hcHBlbmQoJ3NlbGVjdCcpXG4gICAgLmF0dHIoJ25hbWUnLCBwYXJhbS5zaWduYWwpXG4gICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHVwZGF0ZS5jYWxsKHRoaXMsIHRoaXMub3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLl9fZGF0YV9fKTtcbiAgICB9KTtcblxuICBzbC5zZWxlY3RBbGwoJ29wdGlvbicpXG4gICAgLmRhdGEocGFyYW0ub3B0aW9ucylcbiAgIC5lbnRlcigpLmFwcGVuZCgnb3B0aW9uJylcbiAgICAuYXR0cigndmFsdWUnLCB2Zy51dGlsLmlkZW50aXR5KVxuICAgIC5hdHRyKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggPT09IHBhcmFtLnZhbHVlIHx8IG51bGw7IH0pXG4gICAgLnRleHQodmcudXRpbC5pZGVudGl0eSk7XG4gIFxuICByZXR1cm4gc2wubm9kZSgpO1xufVxuXG5mdW5jdGlvbiByYWRpbyhlbCwgcGFyYW0pIHtcbiAgdmFyIHJnID0gZWwuYXBwZW5kKCdzcGFuJylcbiAgICAuYXR0cignY2xhc3MnLCAndmVnYS1wYXJhbS1yYWRpbycpO1xuXG4gIHJldHVybiBwYXJhbS5vcHRpb25zLm1hcChmdW5jdGlvbihvcHRpb24pIHtcbiAgICB2YXIgaWQgPSAndmVnYS1vcHRpb24tJyArIHBhcmFtLnNpZ25hbCArICctJyArIG9wdGlvbjtcblxuICAgIHZhciByYiA9IHJnLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgLmRhdHVtKG9wdGlvbilcbiAgICAgIC5vbignY2hhbmdlJywgdXBkYXRlKVxuICAgICAgLmF0dHIoJ2lkJywgaWQpXG4gICAgICAuYXR0cigndHlwZScsICdyYWRpbycpXG4gICAgICAuYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbClcbiAgICAgIC5hdHRyKCd2YWx1ZScsIG9wdGlvbilcbiAgICAgIC5hdHRyKCdjaGVja2VkJywgb3B0aW9uID09PSBwYXJhbS52YWx1ZSB8fCBudWxsKTtcblxuICAgIHJnLmFwcGVuZCgnbGFiZWwnKVxuICAgICAgLmF0dHIoJ2ZvcicsIGlkKVxuICAgICAgLnRleHQob3B0aW9uKTtcblxuICAgIHJldHVybiByYi5ub2RlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByYW5nZShlbCwgcGFyYW0pIHtcbiAgdmFyIHJuID0gZWwuYXBwZW5kKCdpbnB1dCcpXG4gICAgLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgbGJsLnRleHQodGhpcy52YWx1ZSk7XG4gICAgICB1cGRhdGUuY2FsbCh0aGlzLCArdGhpcy52YWx1ZSk7XG4gICAgfSlcbiAgICAuYXR0cigndHlwZScsICdyYW5nZScpXG4gICAgLmF0dHIoJ25hbWUnLCBwYXJhbS5zaWduYWwpXG4gICAgLmF0dHIoJ3ZhbHVlJywgcGFyYW0udmFsdWUpXG4gICAgLmF0dHIoJ21pbicsIHBhcmFtLm1pbilcbiAgICAuYXR0cignbWF4JywgcGFyYW0ubWF4KVxuICAgIC5hdHRyKCdzdGVwJywgcGFyYW0uc3RlcCB8fCB2Zy51dGlsLmJpbnMoe1xuICAgICAgbWluOiBwYXJhbS5taW4sXG4gICAgICBtYXg6IHBhcmFtLm1heCxcbiAgICAgIG1heGJpbnM6IDEwMFxuICAgIH0pLnN0ZXApO1xuXG4gIHZhciBsYmwgPSBlbC5hcHBlbmQoJ2xhYmVsJylcbiAgICAudGV4dChwYXJhbS52YWx1ZSk7XG5cbiAgcmV0dXJuIHJuLm5vZGUoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB2YWx1ZSA9IHRoaXMuX19kYXRhX18gfHwgZDMuZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB0aGlzLl9fdmVnYV9fLnNpZ25hbCh0aGlzLm5hbWUsIHZhbHVlKS51cGRhdGUoKTtcbn1cbiIsIi8vIG9wZW4gZWRpdG9yIHVybCBpbiBhIG5ldyB3aW5kb3csIGFuZCBwYXNzIGEgbWVzc2FnZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3csIHVybCwgZGF0YSkge1xuICB2YXIgZWRpdG9yID0gd2luZG93Lm9wZW4odXJsKSxcbiAgICAgIHdhaXQgPSAxMDAwMCxcbiAgICAgIHN0ZXAgPSAyNTAsXG4gICAgICBjb3VudCA9IH5+KHdhaXQvc3RlcCk7XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGV2dCkge1xuICAgIGlmIChldnQuc291cmNlID09PSBlZGl0b3IpIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuLCBmYWxzZSk7XG4gICAgfVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuLCBmYWxzZSk7XG5cbiAgLy8gc2VuZCBtZXNzYWdlXG4gIC8vIHBlcmlvZGljYWxseSByZXNlbmQgdW50aWwgYWNrIHJlY2VpdmVkIG9yIHRpbWVvdXRcbiAgZnVuY3Rpb24gc2VuZCgpIHtcbiAgICBpZiAoY291bnQgPD0gMCkgcmV0dXJuO1xuICAgIGVkaXRvci5wb3N0TWVzc2FnZShkYXRhLCAnKicpO1xuICAgIHNldFRpbWVvdXQoc2VuZCwgc3RlcCk7XG4gICAgY291bnQgLT0gMTtcbiAgfVxuICBzZXRUaW1lb3V0KHNlbmQsIHN0ZXApO1xufTtcbiJdfQ==
