/*
  * PageAccelerator - A solution to load web pages faster
  * http://github.com/EasyFood/PageAccelerator
  * author: Evandro Leopoldino Goncalves <evandrolgoncalves@gmail.com>
  * http://github.com/EasyFood
  * License: MIT
*/

(function(global, doc) {

  var M = global._PageAccelerator = global._PageAccelerator || {};

  M.PageAccelerator = function() {
    this.url = doc.location.href;
    this.callback = function() {};
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

      global.history.pushState(obj, '', this.url);
      global.addEventListener('popstate', this._updateBody.bind(this), false);
    },

    _DOMParser: function(data) {
      var parser = new DOMParser();
      return parser.parseFromString(data, 'text/html');
    },

    _updateBodyAttributes: function(data) {
      Object.keys(data).forEach(function(key) {
        var value = data[key];
        doc.body.attr(key, value);
      });
    },

    _updateBody: function(e) {
      var data = e.state;
      this._updateBodyAttributes(data.attrs);
      doc.body.innerHTML = data.content;

      var dom = this._DOMParser(data.head);
      doc.title = dom.head.querySelector('title').innerText;

      this.url = global.location.href;
      this.start();
      this.callback();
    },

    _loadStyles: function(head, callback) {
      var requests = [].map.call(head.querySelectorAll('link[rel="stylesheet"]'), function(element) {
        return M.ajax.get(element.href);
      });

      global.Promise.all(requests).then(callback.bind(this));
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
        this.callback();
        global.scrollTo(0, 0);
        this.start();
      }.bind(this));
    },

    _onClick: function(element) {
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

      global.history.replaceState(obj, '', this.url);
    },

    start: function(callback) {
      this.callback = callback || this.callback;
      var that = this;
      var links = doc.querySelectorAll('a:not([data-pageAccelerator="false"])');

      [].forEach.call(links, function(element) {
        if (element.hostname !== global.location.hostname ||
            element.protocol !== global.location.protocol) {
          return;
        }

        element.addEventListener('click', function(e) {
          e.preventDefault();
          that._onClick.call(that, this);
        }, false);
      });

      this._replaceHistory();
    }
  };

  global.pageAccelerator = function(callback) {
    new M.PageAccelerator().start(callback);
  };

}(window, document));
