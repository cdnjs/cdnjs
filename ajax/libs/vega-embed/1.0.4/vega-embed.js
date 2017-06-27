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
  if (opt.params) {
    var elp = opt.el_params ? d3.select(opt.el_params) : div;
    var pdiv = elp.append('div')
      .attr('class', 'vega-params');
    params = opt.params.map(function(p) {
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

},{"./param":2,"./post":3}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZW1iZWQuanMiLCJzcmMvcGFyYW0uanMiLCJzcmMvcG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGQzID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2QzJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydkMyddIDogbnVsbCksXG4gICAgdmcgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sndmcnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ3ZnJ10gOiBudWxsKSxcbiAgICBwYXJhbWV0ZXIgPSByZXF1aXJlKCcuL3BhcmFtJyksXG4gICAgcG9zdCA9IHJlcXVpcmUoJy4vcG9zdCcpO1xuXG52YXIgY29uZmlnID0ge1xuICAvLyBVUkwgZm9yIGxvYWRpbmcgc3BlY3MgaW50byBlZGl0b3JcbiAgZWRpdG9yX3VybDogJ2h0dHA6Ly92ZWdhLmdpdGh1Yi5pby92ZWdhLWVkaXRvci8nLFxuXG4gIC8vIEhUTUwgdG8gaW5qZWN0IHdpdGhpbiB2aWV3IHNvdXJjZSBoZWFkIGVsZW1lbnRcbiAgc291cmNlX2hlYWRlcjogJycsXG5cbiAgLy8gSFRNTCB0byBpbmplY3QgYmVmb3JlIHZpZXcgc291cmNlIGNsb3NpbmcgYm9keSB0YWdcbiAgc291cmNlX2Zvb3RlcjogJydcbn07XG5cbi8vIEVtYmVkIGEgVmVnYSB2aXN1YWxpemF0aW9uIGNvbXBvbmVudCBpbiBhIHdlYiBwYWdlLlxuLy8gZWw6IERPTSBlbGVtZW50IGluIHdoaWNoIHRvIHBsYWNlIGNvbXBvbmVudCAoRE9NIG5vZGUgb3IgQ1NTIHNlbGVjdG9yKVxuLy8gb3B0OiBFbWJlZGRpbmcgc3BlY2lmaWNhdGlvbiAocGFyc2VkIEpTT04gb3Igc3RyaW5nKVxuLy8gY2FsbGJhY2s6IGludm9rZWQgd2l0aCB0aGUgZ2VuZXJhdGVkIFZlZ2EgVmlldyBpbnN0YW5jZVxuZnVuY3Rpb24gZW1iZWQoZWwsIG9wdCwgY2FsbGJhY2spIHtcbiAgdmFyIHBhcmFtcyA9IFtdLCBzb3VyY2UsIHNwZWM7XG5cbiAgaWYgKG9wdC5zb3VyY2UpIHtcbiAgICBzb3VyY2UgPSBvcHQuc291cmNlO1xuICAgIHNwZWMgPSBKU09OLnBhcnNlKHNvdXJjZSk7XG4gIH0gZWxzZSBpZiAob3B0LnNwZWMpIHtcbiAgICBzcGVjID0gb3B0LnNwZWM7XG4gICAgc291cmNlID0gSlNPTi5zdHJpbmdpZnkoc3BlYywgbnVsbCwgMik7XG4gIH0gZWxzZSBpZiAob3B0LnVybCkge1xuICAgIHZnLnV0aWwubG9hZCh7dXJsOiBvcHQudXJsfSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0gZWxzZSBpZiAoIWRhdGEpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gZGF0YSBmb3VuZCBhdCAnICsgb3B0LnVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsb2FkIGNvZGUsIGV4dGVuZHMgb3B0aW9ucywgYW5kIHJlc3RhcnRcbiAgICAgICAgZW1iZWQoZWwsIHZnLnV0aWwuZXh0ZW5kKHtzb3VyY2U6IGRhdGF9LCBvcHQpLCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZW5zdXJlIGNvbnRhaW5lciBkaXYgaGFzIGNsYXNzICd2ZWdhLWVtYmVkJ1xuICB2YXIgZGl2ID0gZDMuc2VsZWN0KGVsKVxuICAgIC5jbGFzc2VkKCd2ZWdhLWVtYmVkJywgdHJ1ZSlcbiAgICAuaHRtbCgnJyk7IC8vIGNsZWFyIGNvbnRhaW5lclxuXG4gIC8vIGhhbmRsZSBwYXJhbWV0ZXJzXG4gIGlmIChvcHQucGFyYW1zKSB7XG4gICAgdmFyIGVscCA9IG9wdC5lbF9wYXJhbXMgPyBkMy5zZWxlY3Qob3B0LmVsX3BhcmFtcykgOiBkaXY7XG4gICAgdmFyIHBkaXYgPSBlbHAuYXBwZW5kKCdkaXYnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtcGFyYW1zJyk7XG4gICAgcGFyYW1zID0gb3B0LnBhcmFtcy5tYXAoZnVuY3Rpb24ocCkge1xuICAgICAgcmV0dXJuIHBhcmFtZXRlci5pbml0KHBkaXYsIHAsIHNwZWMpO1xuICAgIH0pO1xuICB9XG5cbiAgdmcucGFyc2Uuc3BlYyhzcGVjLCBmdW5jdGlvbihjaGFydCkge1xuICAgIHZhciB2aWV3ID0gY2hhcnQoe1xuICAgICAgZWw6IGVsLFxuICAgICAgZGF0YTogb3B0LmRhdGEgfHwgdW5kZWZpbmVkLFxuICAgICAgcmVuZGVyZXI6IG9wdC5yZW5kZXJlciB8fCAnY2FudmFzJ1xuICAgIH0pO1xuXG4gICAgaWYgKG9wdC5hY3Rpb25zICE9PSBmYWxzZSkge1xuICAgICAgLy8gYWRkIGNoaWxkIGRpdiB0byBob3VzZSBhY3Rpb24gbGlua3NcbiAgICAgIHZhciBjdHJsID0gZGl2LmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ZlZ2EtYWN0aW9ucycpO1xuXG4gICAgICAvLyBhZGQgJ1ZpZXcgU291cmNlJyBhY3Rpb25cbiAgICAgIGN0cmwuYXBwZW5kKCdhJylcbiAgICAgICAgLnRleHQoJ1ZpZXcgU291cmNlJylcbiAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIycpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2aWV3U291cmNlKHNvdXJjZSk7XG4gICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIGFkZCAnT3BlbiBpbiBWZWdhIEVkaXRvcicgYWN0aW9uXG4gICAgICBjdHJsLmFwcGVuZCgnYScpXG4gICAgICAgIC50ZXh0KCdPcGVuIGluIFZlZ2EgRWRpdG9yJylcbiAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIycpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBwb3N0KHdpbmRvdywgZW1iZWQuY29uZmlnLmVkaXRvcl91cmwsIHtzcGVjOiBzb3VyY2V9KTtcbiAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIGFsbCBwYXJhbWV0ZXIgZWxlbWVudHNcbiAgICBwYXJhbXMuZm9yRWFjaChmdW5jdGlvbihwKSB7IHBhcmFtZXRlci5iaW5kKHAsIHZpZXcpOyB9KTtcblxuICAgIC8vIGluaXRpYWxpemUgYW5kIHJldHVybiB2aXN1YWxpemF0aW9uXG4gICAgdmlldy51cGRhdGUoKTtcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHZpZXcsIHNwZWMpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdmlld1NvdXJjZShzb3VyY2UpIHtcbiAgdmFyIGhlYWRlciA9ICc8aHRtbD48aGVhZD4nICsgY29uZmlnLnNvdXJjZV9oZWFkZXIgKyAnPC9oZWFkPicgKyAnPGJvZHk+PHByZT48Y29kZSBjbGFzcz1cImpzb25cIj4nO1xuICB2YXIgZm9vdGVyID0gJzwvY29kZT48L3ByZT4nICsgY29uZmlnLnNvdXJjZV9mb290ZXIgKyAnPC9ib2R5PjwvaHRtbD4nO1xuICB2YXIgd2luID0gd2luZG93Lm9wZW4oJycpO1xuICB3aW4uZG9jdW1lbnQud3JpdGUoaGVhZGVyICsgc291cmNlICsgZm9vdGVyKTtcbiAgd2luLmRvY3VtZW50LnRpdGxlID0gJ1ZlZ2EgSlNPTiBTb3VyY2UnO1xufVxuXG4vLyBtYWtlIGNvbmZpZyBleHRlcm5hbGx5IHZpc2libGVcbmVtYmVkLmNvbmZpZyA9IGNvbmZpZztcblxubW9kdWxlLmV4cG9ydHMgPSBlbWJlZDtcbiIsInZhciBkMyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydkMyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnZDMnXSA6IG51bGwpLFxuICAgICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sndmcnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ3ZnJ10gOiBudWxsKS51dGlsLm11dGF0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0OiBmdW5jdGlvbihlbCwgcGFyYW0sIHNwZWMpIHtcbiAgICByZXR1cm4gKHJld3JpdGUocGFyYW0sIHNwZWMpLCBoYW5kbGUoZWwsIHBhcmFtKSk7XG4gIH0sXG4gIGJpbmQ6IGZ1bmN0aW9uKHBhcmFtLCB2aWV3KSB7XG4gICAgcGFyYW0uZG9tLmZvckVhY2goZnVuY3Rpb24oZWwpIHsgZWwuX192ZWdhX18gPSB2aWV3OyB9KTtcbiAgICB2aWV3Lm9uU2lnbmFsKHBhcmFtLmRvbVswXS5uYW1lLCBmdW5jdGlvbihrLCB2KSB7IHBhcmFtLnNldCh2KTsgfSk7XG4gIH1cbn07XG5cbi8vIHNwZWMgcmUtd3JpdGVcblxuZnVuY3Rpb24gcmV3cml0ZShwYXJhbSwgc3BlYykge1xuICAvLyBhZGQgc2lnbmFsIHRvIHRvcC1sZXZlbCBpZiBub3QgZGVmaW5lZFxuICB2YXIgc2cgPSBzcGVjLnNpZ25hbHMgfHwgKHNwZWMuc2lnbmFscyA9IFtdKTtcbiAgZm9yICh2YXIgaT0wOyBpPHNnLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHNnW2ldLm5hbWUgPT09IHBhcmFtLnNpZ25hbCkgYnJlYWs7XG4gIH1cbiAgaWYgKGkgPT09IHNnLmxlbmd0aCkge1xuICAgIHNnLnB1c2goe1xuICAgICAgbmFtZTogcGFyYW0uc2lnbmFsLFxuICAgICAgaW5pdDogcGFyYW0udmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlcGxhY2UgdmFsdWVzIGZvciByZS13cml0ZSBlbnRyaWVzXG4gIChwYXJhbS5yZXdyaXRlIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAkKHBhdGgpKHNwZWMsIHtzaWduYWw6IHBhcmFtLnNpZ25hbH0pO1xuICB9KTtcbn1cblxuLy8gSFRNTCBvdXRwdXQgaGFuZGxlcnNcblxuZnVuY3Rpb24gaGFuZGxlKGVsLCBwYXJhbSkge1xuICB2YXIgcCA9IGVsLmFwcGVuZCgnZGl2JylcbiAgICAuYXR0cignY2xhc3MnLCAndmVnYS1wYXJhbScpO1xuXG4gIHAuYXBwZW5kKCdzcGFuJylcbiAgICAuYXR0cignY2xhc3MnLCAndmVnYS1wYXJhbS1uYW1lJylcbiAgICAudGV4dChwYXJhbS5uYW1lIHx8IHBhcmFtLnNpZ25hbCk7XG5cbiAgdmFyIGlucHV0ID0gZm9ybTtcbiAgc3dpdGNoIChwYXJhbS50eXBlKSB7XG4gICAgY2FzZSAnY2hlY2tib3gnOiBpbnB1dCA9IGNoZWNrYm94OyBicmVhaztcbiAgICBjYXNlICdzZWxlY3QnOiAgIGlucHV0ID0gc2VsZWN0OyBicmVhaztcbiAgICBjYXNlICdyYWRpbyc6ICAgIGlucHV0ID0gcmFkaW87IGJyZWFrO1xuICAgIGNhc2UgJ3JhbmdlJzogICAgaW5wdXQgPSByYW5nZTsgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gaW5wdXQocCwgcGFyYW0pO1xufVxuXG5mdW5jdGlvbiBmb3JtKGVsLCBwYXJhbSkge1xuICB2YXIgZm0gPSBlbC5hcHBlbmQoJ2lucHV0JylcbiAgICAub24oJ2lucHV0JywgdXBkYXRlKTtcblxuICBmb3IgKHZhciBrZXkgaW4gcGFyYW0pIHtcbiAgICBpZiAoa2V5ID09PSAnc2lnbmFsJyB8fCBrZXkgPT09ICdyZXdyaXRlJykgY29udGludWU7XG4gICAgZm0uYXR0cihrZXksIHBhcmFtW2tleV0pO1xuICB9XG4gIGZtLmF0dHIoJ25hbWUnLCBwYXJhbS5zaWduYWwpO1xuXG4gIHZhciBub2RlID0gZm0ubm9kZSgpO1xuICByZXR1cm4ge1xuICAgIGRvbTogW25vZGVdLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHsgbm9kZS52YWx1ZSA9IHZhbHVlOyB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoZWNrYm94KGVsLCBwYXJhbSkge1xuICB2YXIgY2IgPSBlbC5hcHBlbmQoJ2lucHV0JylcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkgeyB1cGRhdGUuY2FsbCh0aGlzLCB0aGlzLmNoZWNrZWQpOyB9KVxuICAgIC5hdHRyKCd0eXBlJywgJ2NoZWNrYm94JylcbiAgICAuYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbClcbiAgICAuYXR0cignY2hlY2tlZCcsIHBhcmFtLnZhbHVlIHx8IG51bGwpXG4gICAgLm5vZGUoKTtcblxuICByZXR1cm4ge1xuICAgIGRvbTogW2NiXSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7IGNiLmNoZWNrZWQgPSAhIXZhbHVlIHx8IG51bGw7IH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KGVsLCBwYXJhbSkge1xuICB2YXIgc2wgPSBlbC5hcHBlbmQoJ3NlbGVjdCcpXG4gICAgLmF0dHIoJ25hbWUnLCBwYXJhbS5zaWduYWwpXG4gICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHVwZGF0ZS5jYWxsKHRoaXMsIHRoaXMub3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLl9fZGF0YV9fKTtcbiAgICB9KTtcblxuICBzbC5zZWxlY3RBbGwoJ29wdGlvbicpXG4gICAgLmRhdGEocGFyYW0ub3B0aW9ucylcbiAgIC5lbnRlcigpLmFwcGVuZCgnb3B0aW9uJylcbiAgICAuYXR0cigndmFsdWUnLCB2Zy51dGlsLmlkZW50aXR5KVxuICAgIC5hdHRyKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggPT09IHBhcmFtLnZhbHVlIHx8IG51bGw7IH0pXG4gICAgLnRleHQodmcudXRpbC5pZGVudGl0eSk7XG4gIFxuICB2YXIgbm9kZSA9IHNsLm5vZGUoKTtcbiAgcmV0dXJuIHtcbiAgICBkb206IFtub2RlXSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgaWR4ID0gcGFyYW0ub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgICAgIG5vZGUuc2VsZWN0ZWRJbmRleCA9IGlkeDtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJhZGlvKGVsLCBwYXJhbSkge1xuICB2YXIgcmcgPSBlbC5hcHBlbmQoJ3NwYW4nKVxuICAgIC5hdHRyKCdjbGFzcycsICd2ZWdhLXBhcmFtLXJhZGlvJyk7XG5cbiAgdmFyIG5vZGVzID0gcGFyYW0ub3B0aW9ucy5tYXAoZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgdmFyIGlkID0gJ3ZlZ2Etb3B0aW9uLScgKyBwYXJhbS5zaWduYWwgKyAnLScgKyBvcHRpb247XG5cbiAgICB2YXIgcmIgPSByZy5hcHBlbmQoJ2lucHV0JylcbiAgICAgIC5kYXR1bShvcHRpb24pXG4gICAgICAub24oJ2NoYW5nZScsIHVwZGF0ZSlcbiAgICAgIC5hdHRyKCdpZCcsIGlkKVxuICAgICAgLmF0dHIoJ3R5cGUnLCAncmFkaW8nKVxuICAgICAgLmF0dHIoJ25hbWUnLCBwYXJhbS5zaWduYWwpXG4gICAgICAuYXR0cigndmFsdWUnLCBvcHRpb24pXG4gICAgICAuYXR0cignY2hlY2tlZCcsIG9wdGlvbiA9PT0gcGFyYW0udmFsdWUgfHwgbnVsbCk7XG5cbiAgICByZy5hcHBlbmQoJ2xhYmVsJylcbiAgICAgIC5hdHRyKCdmb3InLCBpZClcbiAgICAgIC50ZXh0KG9wdGlvbik7XG5cbiAgICByZXR1cm4gcmIubm9kZSgpO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGRvbTogbm9kZXMsXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgZm9yICh2YXIgaT0wOyBpPG5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChub2Rlc1tpXS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBub2Rlc1tpXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcmFuZ2UoZWwsIHBhcmFtKSB7XG4gIHZhciB2YWwgPSBwYXJhbS52YWx1ZSAhPT0gdW5kZWZpbmVkID8gcGFyYW0udmFsdWUgOlxuICAgICgoK3BhcmFtLm1heCkgKyAoK3BhcmFtLm1pbikpIC8gMjtcblxuICB2YXIgcm4gPSBlbC5hcHBlbmQoJ2lucHV0JylcbiAgICAub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgICBsYmwudGV4dCh0aGlzLnZhbHVlKTtcbiAgICAgIHVwZGF0ZS5jYWxsKHRoaXMsICt0aGlzLnZhbHVlKTtcbiAgICB9KVxuICAgIC5hdHRyKCd0eXBlJywgJ3JhbmdlJylcbiAgICAuYXR0cignbmFtZScsIHBhcmFtLnNpZ25hbClcbiAgICAuYXR0cigndmFsdWUnLCB2YWwpXG4gICAgLmF0dHIoJ21pbicsIHBhcmFtLm1pbilcbiAgICAuYXR0cignbWF4JywgcGFyYW0ubWF4KVxuICAgIC5hdHRyKCdzdGVwJywgcGFyYW0uc3RlcCB8fCB2Zy51dGlsLmJpbnMoe1xuICAgICAgbWluOiBwYXJhbS5taW4sXG4gICAgICBtYXg6IHBhcmFtLm1heCxcbiAgICAgIG1heGJpbnM6IDEwMFxuICAgIH0pLnN0ZXApO1xuXG4gIHZhciBsYmwgPSBlbC5hcHBlbmQoJ2xhYmVsJylcbiAgICAuYXR0cignY2xhc3MnLCAndmVnYS1yYW5nZScpXG4gICAgLnRleHQodmFsKTtcblxuICB2YXIgbm9kZSA9IHJuLm5vZGUoKTtcbiAgcmV0dXJuIHtcbiAgICBkb206IFtub2RlXSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBub2RlLnZhbHVlID0gdmFsdWU7XG4gICAgICBsYmwudGV4dCh2YWx1ZSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHZhbHVlID0gdGhpcy5fX2RhdGFfXyB8fCBkMy5ldmVudC50YXJnZXQudmFsdWU7XG4gIHRoaXMuX192ZWdhX18uc2lnbmFsKHRoaXMubmFtZSwgdmFsdWUpLnVwZGF0ZSgpO1xufVxuIiwiLy8gb3BlbiBlZGl0b3IgdXJsIGluIGEgbmV3IHdpbmRvdywgYW5kIHBhc3MgYSBtZXNzYWdlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdywgdXJsLCBkYXRhKSB7XG4gIHZhciBlZGl0b3IgPSB3aW5kb3cub3Blbih1cmwpLFxuICAgICAgd2FpdCA9IDEwMDAwLFxuICAgICAgc3RlcCA9IDI1MCxcbiAgICAgIGNvdW50ID0gfn4od2FpdC9zdGVwKTtcblxuICBmdW5jdGlvbiBsaXN0ZW4oZXZ0KSB7XG4gICAgaWYgKGV2dC5zb3VyY2UgPT09IGVkaXRvcikge1xuICAgICAgY291bnQgPSAwO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW4sIGZhbHNlKTtcbiAgICB9XG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW4sIGZhbHNlKTtcblxuICAvLyBzZW5kIG1lc3NhZ2VcbiAgLy8gcGVyaW9kaWNhbGx5IHJlc2VuZCB1bnRpbCBhY2sgcmVjZWl2ZWQgb3IgdGltZW91dFxuICBmdW5jdGlvbiBzZW5kKCkge1xuICAgIGlmIChjb3VudCA8PSAwKSByZXR1cm47XG4gICAgZWRpdG9yLnBvc3RNZXNzYWdlKGRhdGEsICcqJyk7XG4gICAgc2V0VGltZW91dChzZW5kLCBzdGVwKTtcbiAgICBjb3VudCAtPSAxO1xuICB9XG4gIHNldFRpbWVvdXQoc2VuZCwgc3RlcCk7XG59O1xuIl19
