/*
  * PageAccelerator - A solution to load web pages faster
  * http://github.com/EasyFood/PageAccelerator
  * author: Evandro Leopoldino Goncalves <evandrolgoncalves@gmail.com>
  * http://github.com/EasyFood
  * License: MIT
*/

(function(global, factory) {

  /*global define: false*/
  /*global exports: true*/
  if (typeof exports === 'object' && exports) {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    factory(global); // <script>
  }
} (this, function(global) {

  var isWindow = global === window;
  var w = isWindow ? global : window;
  var doc = document;

  var M = w._PageAccelerator = w._PageAccelerator || {};

  M.PageAccelerator = function() {
    this.url = doc.location.href;
    this.beforeLoading = function() {};
    this.afterLoading = function() {};
    this.metaKeyIsPressed = false;
  };

  M.PageAccelerator.prototype = {
    _updateObject: function(obj, body) {
      var attrs = body.attributes;

      for (var i=0, size=attrs.length; i<size; i++) {
        obj.attrs[attrs[i].name] = attrs[i].value;
      }

      return obj;
    },

    _updateHistory: function(head, body) {
      var obj = this._updateObject({
        head: head.innerHTML.trim(),
        content: body.innerHTML.trim(),
        attrs: {}
      }, body);

      w.history.pushState(obj, '', this.url);
      w.addEventListener('popstate', this._updateBody.bind(this), false);
    },

    _DOMParser: function(data) {
      var parser = new DOMParser();
      return parser.parseFromString(data, 'text/html');
    },

    _updateBodyAttributes: function(data) {
      Object.keys(data).forEach(function(key) {
        var value = data[key];
        doc.body.setAttribute(key, value);
      });
    },

    _updateBody: function(e) {
      this.beforeLoading();

      var data = e.state;
      this._updateBodyAttributes(data.attrs);
      doc.body.innerHTML = data.content;

      var dom = this._DOMParser(data.head);
      doc.title = dom.head.querySelector('title').innerText;

      this.url = w.location.href;
      this.start();
      this.afterLoading();
    },

    _loadStyles: function(head, callback) {
      var requests = [].map.call(head.querySelectorAll('link[rel="stylesheet"]'), function(element) {
        return M.ajax.get(element.getAttribute('href'));
      });

      w.Promise.all(requests).then(callback.bind(this));
    },

    _update: function(data) {
      var dom = this._DOMParser(data);
      var head = dom.head;

      this._loadStyles(head, function() {
        var body = dom.body;
        doc.body = body;
        doc.head = head;
        doc.title = head.querySelector('title').innerText;

        this._updateHistory(head, body);
        this.afterLoading();
        w.scrollTo(0, 0);
        this.start();
      }.bind(this));
    },

    _onClick: function(element) {
      this.beforeLoading();

      this.url = element.href;
      M.ajax.get(this.url).then(this._update.bind(this))
                          .catch(this._update.bind(this));
    },

    _replaceHistory: function() {
      var body = doc.body;
      var obj = this._updateObject({
        head: doc.head.innerHTML.trim(),
        content: body.innerHTML.trim(),
        attrs: {}
      }, body);

      w.history.replaceState(obj, '', this.url);
    },

    _events: function() {
      var that = this;

      w.addEventListener('keydown', function(e) {
        if (e.metaKey || e.ctrlKey) {
          that.metaKeyIsPressed = true;
        }
      });

      w.addEventListener('keyup', function(e) {
        if (e.metaKey || e.ctrlKey) {
          that.metaKeyIsPressed = false;
        }
      });
    },

    start: function(params) {
      var obj = params || {};
      this.beforeLoading = obj.beforeLoading || this.beforeLoading;
      this.afterLoading = obj.afterLoading || this.afterLoading;
      var that = this;
      var links = doc.querySelectorAll('a:not([data-pageAccelerator="false"]):not([target=_blank])');

      [].forEach.call(links, function(element) {
        if (element.hostname !== w.location.hostname ||
            element.protocol !== w.location.protocol ||
            /#/.test(element.href)) {
          return;
        }

        element.addEventListener('click', function(e) {
          if (!that.metaKeyIsPressed) {
            e.preventDefault();
            that._onClick.call(that, this);
          }
        }, false);
      });

      this._events();
      this._replaceHistory();
    }
  };

  global.pageAccelerator = function(params) {
    new M.PageAccelerator().start(params);
  };

}));
