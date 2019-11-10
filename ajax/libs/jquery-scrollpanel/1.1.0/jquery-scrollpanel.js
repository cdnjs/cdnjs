/*! jquery-scrollpanel v1.1.0 - https://larsjung.de/jquery-scrollpanel/ */
"use strict";

var WIN = window; // eslint-disable-line no-undef

var JQ = WIN.jQuery;
var $WIN = JQ(WIN);
var NAME = 'scrollpanel';
var DEFAULTS = {
  prefix: 'sp-'
};

function ScrollPanel(element, options) {
  var self = this;
  self.settings = JQ.extend({}, DEFAULTS, options);
  var prefix = self.settings.prefix;
  self.$el = JQ(element);
  self.mouse_off_y = 0;
  self.interval_id = 0;

  self.scroll_proxy = function (ev) {
    return self.scroll(ev);
  }; // Make content space relative, if not already.


  if (!self.$el.css('position') || self.$el.css('position') === 'static') {
    self.$el.css('position', 'relative');
  } // Create scrollbar.


  self.$bar = JQ("<div class=\"".concat(prefix, "scrollbar\"/>"));
  self.$thumb = JQ("<div class=\"".concat(prefix, "thumb\"/>")).appendTo(self.$bar); // Wrap element's content and add scrollbar.

  self.$el.addClass("".concat(prefix, "host")).wrapInner("<div class=\"".concat(prefix, "viewport\"><div class=\"").concat(prefix, "container\"/></div>")).append(self.$bar); // Get references.

  self.$viewport = self.$el.find("> .".concat(prefix, "viewport"));
  self.$container = self.$viewport.find("> .".concat(prefix, "container"));
  self.$el.on('mousewheel', function (ev, delta, deltaX, deltaY) {
    self.$viewport.scrollTop(self.$viewport.scrollTop() - 50 * deltaY);
    self.update();
    ev.preventDefault();
    ev.stopPropagation();
  }).on('scroll', function () {
    self.update();
  });
  self.$viewport.css({
    paddingRight: self.$bar.outerWidth(true),
    height: self.$el.height(),
    overflow: 'hidden'
  });
  self.$container.css({
    overflow: 'hidden'
  });
  self.$bar.css({
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden'
  }).on('mousedown', function (ev) {
    self.mouse_off_y = self.$thumb.outerHeight() / 2;
    self.onMousedown(ev);
  }).each(function () {
    self.onselectstart = function () {
      return false;
    };
  });
  self.$thumb.css({
    position: 'absolute',
    left: 0,
    width: '100%'
  }).on('mousedown', function (ev) {
    self.mouse_off_y = ev.pageY - self.$thumb.offset().top;
    self.onMousedown(ev);
  });
  self.update();
  self.update();
}

JQ.extend(ScrollPanel.prototype, {
  update: function update(repeat) {
    var self = this;

    if (self.interval_id && !repeat) {
      WIN.clearInterval(self.interval_id);
      self.interval_id = 0;
    } else if (!self.interval_id && repeat) {
      self.interval_id = WIN.setInterval(function () {
        self.update(true);
      }, 50);
    }

    self.$viewport.css('height', self.$el.height());
    var vis_height = self.$el.height();
    var content_height = self.$container.outerHeight();
    var scroll_top = self.$viewport.scrollTop();
    var scroll_top_frac = scroll_top / content_height;
    var vis_vert_frac = Math.min(vis_height / content_height, 1);
    var bar_height = self.$bar.height();

    if (vis_vert_frac < 1) {
      self.$bar.css({
        height: self.$el.innerHeight() + bar_height - self.$bar.outerHeight(true)
      }).fadeIn(50);
      self.$thumb.css({
        top: bar_height * scroll_top_frac,
        height: bar_height * vis_vert_frac
      });
    } else {
      self.$bar.fadeOut(50);
    }
  },
  scroll: function scroll(ev) {
    var self = this;
    var click_frac = (ev.pageY - self.$bar.offset().top - self.mouse_off_y) / self.$bar.height();
    self.$viewport.scrollTop(self.$container.outerHeight() * click_frac);
    self.update();
    ev.preventDefault();
    ev.stopPropagation();
  },
  onMousedown: function onMousedown(ev) {
    var self = this;
    self.scroll(ev);
    self.$bar.addClass('active');
    $WIN.on('mousemove', self.scroll_proxy).one('mouseup', function (event1) {
      self.$bar.removeClass('active');
      $WIN.off('mousemove', self.scroll_proxy);
      self.scroll(event1);
    });
  }
});

JQ.fn[NAME] = function main(options, options2) {
  return this.each(function (idx, el) {
    var $el = JQ(el);
    var scrollpanel = $el.data(NAME);

    if (!scrollpanel) {
      scrollpanel = new ScrollPanel(el, options);
      $el.data(NAME, scrollpanel);
    }

    if (options === 'update') {
      scrollpanel.update(options2);
    }
  });
};