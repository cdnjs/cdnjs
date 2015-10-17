//@ sourceMappingURL=jquery.caret.map
/*
  Implement Github like autocomplete mentions
  http://ichord.github.com/At.js

  Copyright (c) 2013 chord.luo@gmail.com
  Licensed under the MIT license.
*/


/*
本插件操作 textarea 或者 input 内的插入符
只实现了获得插入符在文本框中的位置，我设置
插入符的位置.
*/


(function() {
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(window.jQuery);
    }
  })(function($) {
    "use strict";
    var EditableCaret, InputCaret, Mirror, Utils, methods, oDocument, oFrame, oWindow, pluginName;
    pluginName = 'caret';
    EditableCaret = (function() {
      function EditableCaret($inputor) {
        this.$inputor = $inputor;
        this.domInputor = this.$inputor[0];
      }

      EditableCaret.prototype.setPos = function(pos) {
        return this.domInputor;
      };

      EditableCaret.prototype.getIEPosition = function() {
        return $.noop();
      };

      EditableCaret.prototype.getPosition = function() {
        return $.noop();
      };

      EditableCaret.prototype.getOldIEPos = function() {
        var preCaretTextRange, textRange;
        textRange = oDocument.selection.createRange();
        preCaretTextRange = oDocument.body.createTextRange();
        preCaretTextRange.moveToElementText(this.domInputor);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        return preCaretTextRange.text.length;
      };

      EditableCaret.prototype.getPos = function() {
        var clonedRange, pos, range;
        if (range = this.range()) {
          clonedRange = range.cloneRange();
          clonedRange.selectNodeContents(this.domInputor);
          clonedRange.setEnd(range.endContainer, range.endOffset);
          pos = clonedRange.toString().length;
          clonedRange.detach();
          return pos;
        } else if (oDocument.selection) {
          return this.getOldIEPos();
        }
      };

      EditableCaret.prototype.getOldIEOffset = function() {
        var range, rect;
        range = oDocument.selection.createRange().duplicate();
        range.moveStart("character", -1);
        rect = range.getBoundingClientRect();
        return {
          height: rect.bottom - rect.top,
          left: rect.left,
          top: rect.top
        };
      };

      EditableCaret.prototype.getOffset = function(pos) {
        var clonedRange, offset, range, rect;
        if (oWindow.getSelection && (range = this.range())) {
          if (range.endOffset - 1 < 0) {
            return null;
          }
          clonedRange = range.cloneRange();
          clonedRange.setStart(range.endContainer, range.endOffset - 1);
          clonedRange.setEnd(range.endContainer, range.endOffset);
          rect = clonedRange.getBoundingClientRect();
          offset = {
            height: rect.height,
            left: rect.left + rect.width,
            top: rect.top
          };
          clonedRange.detach();
        } else if (oDocument.selection) {
          offset = this.getOldIEOffset();
        }
        if (offset && !oFrame) {
          offset.top += $(oWindow).scrollTop();
          offset.left += $(oWindow).scrollLeft();
        }
        return offset;
      };

      EditableCaret.prototype.range = function() {
        var sel;
        if (!oWindow.getSelection) {
          return;
        }
        sel = oWindow.getSelection();
        if (sel.rangeCount > 0) {
          return sel.getRangeAt(0);
        } else {
          return null;
        }
      };

      return EditableCaret;

    })();
    InputCaret = (function() {
      function InputCaret($inputor) {
        this.$inputor = $inputor;
        this.domInputor = this.$inputor[0];
      }

      InputCaret.prototype.getIEPos = function() {
        var endRange, inputor, len, normalizedValue, pos, range, textInputRange;
        inputor = this.domInputor;
        range = oDocument.selection.createRange();
        pos = 0;
        if (range && range.parentElement() === inputor) {
          normalizedValue = inputor.value.replace(/\r\n/g, "\n");
          len = normalizedValue.length;
          textInputRange = inputor.createTextRange();
          textInputRange.moveToBookmark(range.getBookmark());
          endRange = inputor.createTextRange();
          endRange.collapse(false);
          if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
            pos = len;
          } else {
            pos = -textInputRange.moveStart("character", -len);
          }
        }
        return pos;
      };

      InputCaret.prototype.getPos = function() {
        if (oDocument.selection) {
          return this.getIEPos();
        } else {
          return this.domInputor.selectionStart;
        }
      };

      InputCaret.prototype.setPos = function(pos) {
        var inputor, range;
        inputor = this.domInputor;
        if (oDocument.selection) {
          range = inputor.createTextRange();
          range.move("character", pos);
          range.select();
        } else if (inputor.setSelectionRange) {
          inputor.setSelectionRange(pos, pos);
        }
        return inputor;
      };

      InputCaret.prototype.getIEOffset = function(pos) {
        var h, textRange, x, y;
        textRange = this.domInputor.createTextRange();
        pos || (pos = this.getPos());
        textRange.move('character', pos);
        x = textRange.boundingLeft;
        y = textRange.boundingTop;
        h = textRange.boundingHeight;
        return {
          left: x,
          top: y,
          height: h
        };
      };

      InputCaret.prototype.getOffset = function(pos) {
        var $inputor, offset, position;
        $inputor = this.$inputor;
        if (oDocument.selection) {
          offset = this.getIEOffset(pos);
          offset.top += $(oWindow).scrollTop() + $inputor.scrollTop();
          offset.left += $(oWindow).scrollLeft() + $inputor.scrollLeft();
          return offset;
        } else {
          offset = $inputor.offset();
          position = this.getPosition(pos);
          return offset = {
            left: offset.left + position.left - $inputor.scrollLeft(),
            top: offset.top + position.top - $inputor.scrollTop(),
            height: position.height
          };
        }
      };

      InputCaret.prototype.getPosition = function(pos) {
        var $inputor, at_rect, format, html, mirror, start_range;
        $inputor = this.$inputor;
        format = function(value) {
          return value.replace(/</g, '&lt').replace(/>/g, '&gt').replace(/`/g, '&#96').replace(/"/g, '&quot').replace(/\r\n|\r|\n/g, "<br />");
        };
        if (pos === void 0) {
          pos = this.getPos();
        }
        start_range = $inputor.val().slice(0, pos);
        html = "<span>" + format(start_range) + "</span>";
        html += "<span id='caret'>|</span>";
        mirror = new Mirror($inputor);
        return at_rect = mirror.create(html).rect();
      };

      InputCaret.prototype.getIEPosition = function(pos) {
        var h, inputorOffset, offset, x, y;
        offset = this.getIEOffset(pos);
        inputorOffset = this.$inputor.offset();
        x = offset.left - inputorOffset.left;
        y = offset.top - inputorOffset.top;
        h = offset.height;
        return {
          left: x,
          top: y,
          height: h
        };
      };

      return InputCaret;

    })();
    Mirror = (function() {
      Mirror.prototype.css_attr = ["overflowY", "height", "width", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "marginTop", "marginLeft", "marginRight", "marginBottom", "fontFamily", "borderStyle", "borderWidth", "wordWrap", "fontSize", "lineHeight", "overflowX", "text-align"];

      function Mirror($inputor) {
        this.$inputor = $inputor;
      }

      Mirror.prototype.mirrorCss = function() {
        var css,
          _this = this;
        css = {
          position: 'absolute',
          left: -9999,
          top: 0,
          zIndex: -20000,
          'white-space': 'pre-wrap'
        };
        $.each(this.css_attr, function(i, p) {
          return css[p] = _this.$inputor.css(p);
        });
        return css;
      };

      Mirror.prototype.create = function(html) {
        this.$mirror = $('<div></div>');
        this.$mirror.css(this.mirrorCss());
        this.$mirror.html(html);
        this.$inputor.after(this.$mirror);
        return this;
      };

      Mirror.prototype.rect = function() {
        var $flag, pos, rect;
        $flag = this.$mirror.find("#caret");
        pos = $flag.position();
        rect = {
          left: pos.left,
          top: pos.top,
          height: $flag.height()
        };
        this.$mirror.remove();
        return rect;
      };

      return Mirror;

    })();
    Utils = {
      contentEditable: function($inputor) {
        return !!($inputor[0].contentEditable && $inputor[0].contentEditable === 'true');
      }
    };
    methods = {
      pos: function(pos) {
        if (pos) {
          return this.setPos(pos);
        } else {
          return this.getPos();
        }
      },
      position: function(pos) {
        if (oDocument.selection) {
          return this.getIEPosition(pos);
        } else {
          return this.getPosition(pos);
        }
      },
      offset: function(pos) {
        var iOffset, offset;
        offset = this.getOffset(pos);
        if (oFrame) {
          iOffset = $(oFrame).offset();
          offset.top += iOffset.top;
          offset.left += iOffset.left;
        }
        return offset;
      }
    };
    oDocument = null;
    oWindow = null;
    oFrame = null;
    $.fn.caret = function(method) {
      var caret;
      oDocument = this[0].ownerDocument;
      oWindow = oDocument.defaultView || oDocument.parentWindow;
      oFrame = oWindow.frameElement;
      caret = Utils.contentEditable(this) ? new EditableCaret(this) : new InputCaret(this);
      if (methods[method]) {
        return methods[method].apply(caret, Array.prototype.slice.call(arguments, 1));
      } else {
        return $.error("Method " + method + " does not exist on jQuery.caret");
      }
    };
    $.fn.caret.EditableCaret = EditableCaret;
    $.fn.caret.InputCaret = InputCaret;
    $.fn.caret.Utils = Utils;
    return $.fn.caret.apis = methods;
  });

}).call(this);


/*
  Implement Github like autocomplete mentions
  http://ichord.github.com/At.js

  Copyright (c) 2013 chord.luo@gmail.com
  Licensed under the MIT license.
*/


(function() {
  var __slice = [].slice;

  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(window.jQuery);
    }
  })(function($) {
    var $CONTAINER, Api, App, Atwho, Controller, DEFAULT_CALLBACKS, KEY_CODE, Model, View;
    App = (function() {

      function App(inputor) {
        this.current_flag = null;
        this.controllers = {};
        this.alias_maps = {};
        this.$inputor = $(inputor);
        this.listen();
      }

      App.prototype.controller = function(at) {
        return this.controllers[this.alias_maps[at] || at || this.current_flag];
      };

      App.prototype.set_context_for = function(at) {
        this.current_flag = at;
        return this;
      };

      App.prototype.reg = function(flag, setting) {
        var controller, _base;
        controller = (_base = this.controllers)[flag] || (_base[flag] = new Controller(this, flag));
        if (setting.alias) {
          this.alias_maps[setting.alias] = flag;
        }
        controller.init(setting);
        return this;
      };

      App.prototype.listen = function() {
        var _this = this;
        return this.$inputor.on('keyup.atwho', function(e) {
          return _this.on_keyup(e);
        }).on('keydown.atwho', function(e) {
          return _this.on_keydown(e);
        }).on('scroll.atwho', function(e) {
          var _ref;
          return (_ref = _this.controller()) != null ? _ref.view.hide() : void 0;
        }).on('blur.atwho', function(e) {
          var c;
          if (c = _this.controller()) {
            return c.view.hide(c.get_opt("display_timeout"));
          }
        });
      };

      App.prototype.dispatch = function() {
        var _this = this;
        return $.map(this.controllers, function(c) {
          if (c.look_up()) {
            return _this.set_context_for(c.at);
          }
        });
      };

      App.prototype.on_keyup = function(e) {
        var _ref;
        switch (e.keyCode) {
          case KEY_CODE.ESC:
            e.preventDefault();
            if ((_ref = this.controller()) != null) {
              _ref.view.hide();
            }
            break;
          case KEY_CODE.DOWN:
          case KEY_CODE.UP:
            $.noop();
            break;
          default:
            this.dispatch();
        }
      };

      App.prototype.on_keydown = function(e) {
        var view, _ref;
        view = (_ref = this.controller()) != null ? _ref.view : void 0;
        if (!(view && view.visible())) {
          return;
        }
        switch (e.keyCode) {
          case KEY_CODE.ESC:
            e.preventDefault();
            view.hide();
            break;
          case KEY_CODE.UP:
            e.preventDefault();
            view.prev();
            break;
          case KEY_CODE.DOWN:
            e.preventDefault();
            view.next();
            break;
          case KEY_CODE.TAB:
          case KEY_CODE.ENTER:
            if (!view.visible()) {
              return;
            }
            e.preventDefault();
            view.choose();
            break;
          default:
            $.noop();
        }
      };

      return App;

    })();
    Controller = (function() {
      var uuid, _uuid;

      _uuid = 0;

      uuid = function() {
        return _uuid += 1;
      };

      function Controller(app, at) {
        this.app = app;
        this.at = at;
        this.$inputor = this.app.$inputor;
        this.oDocument = this.$inputor[0].ownerDocument;
        this.oWindow = this.oDocument.defaultView || this.oDocument.parentWindow;
        this.id = this.$inputor[0].id || uuid();
        this.setting = null;
        this.query = null;
        this.pos = 0;
        this.cur_rect = null;
        this.range = null;
        $CONTAINER.append(this.$el = $("<div id='atwho-ground-" + this.id + "'></div>"));
        this.model = new Model(this);
        this.view = new View(this);
      }

      Controller.prototype.init = function(setting) {
        this.setting = $.extend({}, this.setting || $.fn.atwho["default"], setting);
        this.view.init();
        return this.model.reload(this.setting.data);
      };

      Controller.prototype.call_default = function() {
        var args, func_name;
        func_name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        try {
          return DEFAULT_CALLBACKS[func_name].apply(this, args);
        } catch (error) {
          return $.error("" + error + " Or maybe At.js doesn't have function " + func_name);
        }
      };

      Controller.prototype.trigger = function(name, data) {
        var alias, event_name;
        data.push(this);
        alias = this.get_opt('alias');
        event_name = alias ? "" + name + "-" + alias + ".atwho" : "" + name + ".atwho";
        return this.$inputor.trigger(event_name, data);
      };

      Controller.prototype.callbacks = function(func_name) {
        return this.get_opt("callbacks")[func_name] || DEFAULT_CALLBACKS[func_name];
      };

      Controller.prototype.get_opt = function(at, default_value) {
        try {
          return this.setting[at];
        } catch (e) {
          return null;
        }
      };

      Controller.prototype.content = function() {
        if (this.$inputor.is('textarea, input')) {
          return this.$inputor.val();
        } else {
          return this.$inputor.text();
        }
      };

      Controller.prototype.catch_query = function() {
        var caret_pos, content, end, query, start, subtext;
        content = this.content();
        caret_pos = this.$inputor.caret('pos');
        subtext = content.slice(0, caret_pos);
        query = this.callbacks("matcher").call(this, this.at, subtext, this.get_opt('start_with_space'));
        if (typeof query === "string" && query.length <= this.get_opt('max_len', 20)) {
          start = caret_pos - query.length;
          end = start + query.length;
          this.pos = start;
          query = {
            'text': query.toLowerCase(),
            'head_pos': start,
            'end_pos': end
          };
          this.trigger("matched", [this.at, query.text]);
        } else {
          this.view.hide();
        }
        return this.query = query;
      };

      Controller.prototype.rect = function() {
        var c, scale_bottom;
        if (!(c = this.$inputor.caret('offset', this.pos - 1))) {
          return;
        }
        if (this.$inputor.attr('contentEditable') === 'true') {
          c = (this.cur_rect || (this.cur_rect = c)) || c;
        }
        scale_bottom = document.selection ? 0 : 2;
        return {
          left: c.left,
          top: c.top,
          bottom: c.top + c.height + scale_bottom
        };
      };

      Controller.prototype.reset_rect = function() {
        if (this.$inputor.attr('contentEditable') === 'true') {
          return this.cur_rect = null;
        }
      };

      Controller.prototype.mark_range = function() {
        if (this.$inputor.attr('contentEditable') === 'true') {
          this.range = this.get_range();
          return this.ie_range = this.get_ie_range();
        }
      };

      Controller.prototype.clear_range = function() {
        return this.range = null;
      };

      Controller.prototype.get_range = function() {
        return this.range || (this.oWindow.getSelection ? this.oWindow.getSelection().getRangeAt(0) : void 0);
      };

      Controller.prototype.get_ie_range = function() {
        return this.ie_range || (this.oDocument.selection ? this.oDocument.selection.createRange() : void 0);
      };

      Controller.prototype.insert_content_for = function($li) {
        var data, data_value, tpl;
        data_value = $li.data('value');
        tpl = this.get_opt('insert_tpl');
        if (this.$inputor.is('textarea, input') || !tpl) {
          return data_value;
        }
        data = $.extend({}, $li.data('item-data'), {
          'atwho-data-value': data_value,
          'atwho-at': this.at
        });
        return this.callbacks("tpl_eval").call(this, tpl, data);
      };

      Controller.prototype.insert = function(content, $li) {
        var $inputor, $insert_node, class_name, content_node, insert_node, pos, range, sel, source, start_str, text;
        $inputor = this.$inputor;
        if ($inputor.attr('contentEditable') === 'true') {
          class_name = "atwho-view-flag atwho-view-flag-" + (this.get_opt('alias') || this.at);
          content_node = "" + content + "<span contenteditable='false'>&nbsp;<span>";
          insert_node = "<span contenteditable='false' class='" + class_name + "'>" + content_node + "</span>";
          $insert_node = $(insert_node, this.oDocument).data('atwho-data-item', $li.data('item-data'));
          if (this.oDocument.selection) {
            $insert_node = $("<span contenteditable='true'></span>", this.oDocument).html($insert_node);
          }
        }
        if ($inputor.is('textarea, input')) {
          content = '' + content;
          source = $inputor.val();
          start_str = source.slice(0, Math.max(this.query.head_pos - this.at.length, 0));
          text = "" + start_str + content + " " + (source.slice(this.query['end_pos'] || 0));
          $inputor.val(text);
          $inputor.caret('pos', start_str.length + content.length + 1);
        } else if (range = this.get_range()) {
          pos = range.startOffset - (this.query.end_pos - this.query.head_pos) - this.at.length;
          range.setStart(range.endContainer, Math.max(pos, 0));
          range.setEnd(range.endContainer, range.endOffset);
          range.deleteContents();
          range.insertNode($insert_node[0]);
          range.collapse(false);
          sel = this.oWindow.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (range = this.get_ie_range()) {
          range.moveStart('character', this.query.end_pos - this.query.head_pos - this.at.length);
          range.pasteHTML(content_node);
          range.collapse(false);
          range.select();
        }
        $inputor.focus();
        return $inputor.change();
      };

      Controller.prototype.render_view = function(data) {
        var search_key;
        search_key = this.get_opt("search_key");
        data = this.callbacks("sorter").call(this, this.query.text, data.slice(0, 1001), search_key);
        return this.view.render(data.slice(0, this.get_opt('limit')));
      };

      Controller.prototype.look_up = function() {
        var query, _callback;
        if (!(query = this.catch_query())) {
          return;
        }
        _callback = function(data) {
          if (data && data.length > 0) {
            return this.render_view(data);
          } else {
            return this.view.hide();
          }
        };
        this.model.query(query.text, $.proxy(_callback, this));
        return query;
      };

      return Controller;

    })();
    Model = (function() {

      function Model(context) {
        this.context = context;
        this.at = this.context.at;
        this.storage = this.context.$inputor;
      }

      Model.prototype.saved = function() {
        return this.fetch() > 0;
      };

      Model.prototype.query = function(query, callback) {
        var data, search_key, _remote_filter;
        data = this.fetch();
        search_key = this.context.get_opt("search_key");
        data = this.context.callbacks('filter').call(this.context, query, data, search_key) || [];
        _remote_filter = this.context.callbacks('remote_filter');
        if (data.length > 0 || (!_remote_filter && data.length === 0)) {
          return callback(data);
        } else {
          return _remote_filter.call(this.context, query, callback);
        }
      };

      Model.prototype.fetch = function() {
        return this.storage.data(this.at) || [];
      };

      Model.prototype.save = function(data) {
        return this.storage.data(this.at, this.context.callbacks("before_save").call(this.context, data || []));
      };

      Model.prototype.load = function(data) {
        if (!(this.saved() || !data)) {
          return this._load(data);
        }
      };

      Model.prototype.reload = function(data) {
        return this._load(data);
      };

      Model.prototype._load = function(data) {
        var _this = this;
        if (typeof data === "string") {
          return $.ajax(data, {
            dataType: "json"
          }).done(function(data) {
            return _this.save(data);
          });
        } else {
          return this.save(data);
        }
      };

      return Model;

    })();
    View = (function() {

      function View(context) {
        this.context = context;
        this.$el = $("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>");
        this.timeout_id = null;
        this.context.$el.append(this.$el);
        this.bind_event();
      }

      View.prototype.init = function() {
        var id;
        id = this.context.get_opt("alias") || this.context.at.charCodeAt(0);
        return this.$el.attr({
          'id': "at-view-" + id
        });
      };

      View.prototype.bind_event = function() {
        var $menu,
          _this = this;
        $menu = this.$el.find('ul');
        $menu.on('mouseenter.atwho-view', 'li', function(e) {
          $menu.find('.cur').removeClass('cur');
          return $(e.currentTarget).addClass('cur');
        }).on('click', function(e) {
          _this.choose();
          return e.preventDefault();
        });
        return this.$el.on('mouseenter.atwho-view', 'ul', function(e) {
          return _this.context.mark_range();
        }).on('mouseleave.atwho-view', 'ul', function(e) {
          return _this.context.clear_range();
        });
      };

      View.prototype.visible = function() {
        return this.$el.is(":visible");
      };

      View.prototype.choose = function() {
        var $li, content;
        $li = this.$el.find(".cur");
        content = this.context.insert_content_for($li);
        this.context.insert(this.context.callbacks("before_insert").call(this.context, content, $li), $li);
        this.context.trigger("inserted", [$li]);
        return this.hide();
      };

      View.prototype.reposition = function(rect) {
        var offset;
        if (rect.bottom + this.$el.height() - $(window).scrollTop() > $(window).height()) {
          rect.bottom = rect.top - this.$el.height();
        }
        offset = {
          left: rect.left,
          top: rect.bottom
        };
        this.$el.offset(offset);
        return this.context.trigger("reposition", [offset]);
      };

      View.prototype.next = function() {
        var cur, next;
        cur = this.$el.find('.cur').removeClass('cur');
        next = cur.next();
        if (!next.length) {
          next = this.$el.find('li:first');
        }
        return next.addClass('cur');
      };

      View.prototype.prev = function() {
        var cur, prev;
        cur = this.$el.find('.cur').removeClass('cur');
        prev = cur.prev();
        if (!prev.length) {
          prev = this.$el.find('li:last');
        }
        return prev.addClass('cur');
      };

      View.prototype.show = function() {
        var rect;
        if (!this.visible()) {
          this.$el.show();
        }
        if (rect = this.context.rect()) {
          return this.reposition(rect);
        }
      };

      View.prototype.hide = function(time) {
        var callback,
          _this = this;
        if (isNaN(time && this.visible())) {
          this.context.reset_rect();
          return this.$el.hide();
        } else {
          callback = function() {
            return _this.hide();
          };
          clearTimeout(this.timeout_id);
          return this.timeout_id = setTimeout(callback, time);
        }
      };

      View.prototype.render = function(list) {
        var $li, $ul, item, li, tpl, _i, _len;
        if (!($.isArray(list) && list.length > 0)) {
          this.hide();
          return;
        }
        this.$el.find('ul').empty();
        $ul = this.$el.find('ul');
        tpl = this.context.get_opt('tpl');
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          item = list[_i];
          item = $.extend({}, item, {
            'atwho-at': this.context.at
          });
          li = this.context.callbacks("tpl_eval").call(this.context, tpl, item);
          $li = $(this.context.callbacks("highlighter").call(this.context, li, this.context.query.text));
          $li.data("item-data", item);
          $ul.append($li);
        }
        this.show();
        return $ul.find("li:first").addClass("cur");
      };

      return View;

    })();
    KEY_CODE = {
      DOWN: 40,
      UP: 38,
      ESC: 27,
      TAB: 9,
      ENTER: 13
    };
    DEFAULT_CALLBACKS = {
      before_save: function(data) {
        var item, _i, _len, _results;
        if (!$.isArray(data)) {
          return data;
        }
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          if ($.isPlainObject(item)) {
            _results.push(item);
          } else {
            _results.push({
              name: item
            });
          }
        }
        return _results;
      },
      matcher: function(flag, subtext, should_start_with_space) {
        var match, regexp;
        flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        if (should_start_with_space) {
          flag = '(?:^|\\s)' + flag;
        }
        regexp = new RegExp(flag + '([A-Za-z0-9_\+\-]*)$|' + flag + '([^\\x00-\\xff]*)$', 'gi');
        match = regexp.exec(subtext);
        if (match) {
          return match[2] || match[1];
        } else {
          return null;
        }
      },
      filter: function(query, data, search_key) {
        var item, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          if (~item[search_key].toLowerCase().indexOf(query)) {
            _results.push(item);
          }
        }
        return _results;
      },
      remote_filter: null,
      sorter: function(query, items, search_key) {
        var item, _i, _len, _results;
        if (!query) {
          return items;
        }
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          item.atwho_order = item[search_key].toLowerCase().indexOf(query);
          if (item.atwho_order > -1) {
            _results.push(item);
          }
        }
        return _results.sort(function(a, b) {
          return a.atwho_order - b.atwho_order;
        });
      },
      tpl_eval: function(tpl, map) {
        try {
          return tpl.replace(/\$\{([^\}]*)\}/g, function(tag, key, pos) {
            return map[key];
          });
        } catch (error) {
          return "";
        }
      },
      highlighter: function(li, query) {
        var regexp;
        if (!query) {
          return li;
        }
        regexp = new RegExp(">\\s*(\\w*)(" + query.replace("+", "\\+") + ")(\\w*)\\s*<", 'ig');
        return li.replace(regexp, function(str, $1, $2, $3) {
          return '> ' + $1 + '<strong>' + $2 + '</strong>' + $3 + ' <';
        });
      },
      before_insert: function(value, $li) {
        return value;
      }
    };
    Api = {
      load: function(at, data) {
        var c;
        if (c = this.controller(at)) {
          return c.model.load(data);
        }
      },
      getInsertedItemsWithIDs: function(at) {
        var c, ids, items;
        if (!(c = this.controller(at))) {
          return [null, null];
        }
        if (at) {
          at = "-" + (c.get_opt('alias') || c.at);
        }
        ids = [];
        items = $.map(this.$inputor.find("span.atwho-view-flag" + (at || "")), function(item) {
          var data;
          data = $(item).data('atwho-data-item');
          if (ids.indexOf(data.id) > -1) {
            return;
          }
          if (data.id) {
            ids.push = data.id;
          }
          return data;
        });
        return [ids, items];
      },
      getInsertedItems: function(at) {
        return Api.getInsertedItemsWithIDs.apply(this, [at])[1];
      },
      getInsertedIDs: function(at) {
        return Api.getInsertedItemsWithIDs.apply(this, [at])[0];
      },
      run: function() {
        return this.dispatch();
      }
    };
    Atwho = {
      init: function(options) {
        var $this, app;
        app = ($this = $(this)).data("atwho");
        if (!app) {
          $this.data('atwho', (app = new App(this)));
        }
        app.reg(options.at, options);
        return this;
      }
    };
    $CONTAINER = $("<div id='atwho-container'></div>");
    $.fn.atwho = function(method) {
      var result, _args;
      _args = arguments;
      $('body').append($CONTAINER);
      result = null;
      this.filter('textarea, input, [contenteditable=true]').each(function() {
        var app;
        if (typeof method === 'object' || !method) {
          return Atwho.init.apply(this, _args);
        } else if (Api[method]) {
          if (app = $(this).data('atwho')) {
            return result = Api[method].apply(app, Array.prototype.slice.call(_args, 1));
          }
        } else {
          return $.error("Method " + method + " does not exist on jQuery.caret");
        }
      });
      return result || this;
    };
    return $.fn.atwho["default"] = {
      at: void 0,
      alias: void 0,
      data: null,
      tpl: "<li data-value='${atwho-at}${name}'>${name}</li>",
      insert_tpl: "<span>${atwho-data-value}</span>",
      callbacks: DEFAULT_CALLBACKS,
      search_key: "name",
      start_with_space: true,
      limit: 5,
      max_len: 20,
      display_timeout: 300
    };
  });

}).call(this);
