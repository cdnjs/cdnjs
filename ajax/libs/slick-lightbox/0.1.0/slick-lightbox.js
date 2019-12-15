(function(){var i;null==window.SlickLightbox&&(i=function(){function i(i,t){var n,o=this;this.options=t,this.element=$(i),null==(n=this.options)&&(this.options={}),this.element.on("click.slickLightbox","a",function(i){return i.preventDefault(),o.init()})}return i.prototype.init=function(){return this.createModal(),this.open(),this.bindEvents(),this.slick()},i.prototype.createModal=function(){var i,t;return t=$.map(this.element.find("a"),function(i){return'<div class="slick-lightbox-slick-item"><img class="slick-lightbox-slick-img" src="'+i.href+'" /></div>'}),i='<div class="slick-lightbox slick-hide">\n	<div class="slick-lightbox-inner">\n		<div class="slick-lightbox-slick">'+t.join("")+'</div>\n		<button type="button" class="slick-lightbox-close"></button>\n	<div>\n<div>',this.modalElement=$(i),$("body").append(this.modalElement)},i.prototype.slick=function(){return null!=this.options.slick?"function"==typeof this.options.slick?this.options.slick(this.modalElement):this.modalElement.find(".slick-lightbox-slick").slick(this.options.slick):this.modalElement.find(".slick-lightbox-slick").slick(),this.modalElement.trigger("init.slickLightbox")},i.prototype.open=function(){return this.modalElement.removeClass("slick-hide")},i.prototype.close=function(){return this.modalElement.addClass("slick-hide"),this.destroy()},i.prototype.bindEvents=function(){var i,t=this;return i=function(){return t.modalElement.find(".slick-lightbox-slick-item").height(t.modalElement.find(".slick-lightbox-inner").height())},$(window).on("orientationchange.slickLightbox resize.slickLightbox",i),this.modalElement.on("init.slickLightbox",i),this.modalElement.on("destroy.slickLightbox",function(){return t.destroy()}),this.modalElement.on("click.slickLightbox touchstart.slickLightbox",".slick-lightbox-close",function(i){return i.preventDefault(),t.close()})},i.prototype.unbindEvents=function(){return $(window).off(".slickLightbox"),this.modalElement.off(".slickLightbox")},i.prototype.destroy=function(i){return null==i&&(i=!1),this.unbindEvents(),this.modalElement.remove(),i?this.element.off(".slickLightbox"):void 0},i}(),$.fn.slickLightbox=function(t){return this.slickLightbox=new i(this,t)},$.fn.unslickLightbox=function(){return this.slickLightbox.destroy(!0)})}).call(this);slick(this.modalElement);
      } else {
        this.slick = this.modalElement.find('.slick-lightbox-slick').slick(this.options.slick);
      }
    } else {
      this.slick = this.modalElement.find('.slick-lightbox-slick').slick();
    }
    return this.modalElement.trigger('init.slickLightbox');
  };

  SlickLightbox.prototype.open = function() {

    /* Opens the lightbox. */
    return this.modalElement.removeClass('slick-hide');
  };

  SlickLightbox.prototype.close = function() {

    /* Closes the lightbox and destroys it, maintaining the original element bindings. */
    this.modalElement.addClass('slick-hide');
    return this.destroy();
  };

  SlickLightbox.prototype.bindEvents = function() {

    /* Binds global events. */
    var resizeSlides;
    resizeSlides = (function(_this) {
      return function() {
        return _this.modalElement.find('.slick-lightbox-slick-item').height(_this.modalElement.find('.slick-lightbox-inner').height());
      };
    })(this);
    $(window).on('orientationchange.slickLightbox resize.slickLightbox', resizeSlides);
    this.modalElement.on('init.slickLightbox', resizeSlides);
    this.modalElement.on('destroy.slickLightbox', (function(_this) {
      return function() {
        return _this.destroy();
      };
    })(this));
    return this.modalElement.on('click.slickLightbox touchstart.slickLightbox', '.slick-lightbox-close', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.close();
      };
    })(this));
  };

  SlickLightbox.prototype.unbindEvents = function() {

    /* Unbinds global events. */
    $(window).off('.slickLightbox');
    return this.modalElement.off('.slickLightbox');
  };

  SlickLightbox.prototype.destroy = function(unbindAnchors) {
    if (unbindAnchors == null) {
      unbindAnchors = false;
    }

    /* Destroys the lightbox and unbinds global events. If `true` is passed as an argument, unbinds the original element as well. */
    this.unbindEvents();
    this.modalElement.remove();
    if (unbindAnchors) {
      return this.element.off('.slickLightbox');
    }
  };

  SlickLightbox.prototype.destroyPrevious = function() {

    /* Destroys lightboxes currently in DOM. */
    return $('body').children('.slick-lightbox').trigger('destroy.slickLightbox');
  };

  return SlickLightbox;

})();

$.fn.slickLightbox = function(options) {
  return this.slickLightbox = new SlickLightbox(this, options);
};

$.fn.unslickLightbox = function(options) {
  return this.slickLightbox.destroy(true);
};
Anchors) {
    if (unbindAnchors == null) {
      unbindAnchors = false;
    }

    /* Destroys the lightbox and unbinds global events. If `true` is passed as an argument, unbinds the original element as well. */
    this.unbindEvents();
    setTimeout(((function(_this) {
      return function() {
        return _this.modalElement.remove();
      };
    })(this)), 500);
    if (unbindAnchors) {
      return this.element.off('.slickLightbox');
    }
  };

  SlickLightbox.prototype.destroyPrevious = function() {

    /* Destroys lightboxes currently in DOM. */
    return $('body').children('.slick-lightbox').trigger('destroy.slickLightbox');
  };

  return SlickLightbox;

})();

defaults = {
  slick: {},
  closeOnEscape: true,
  navigateByArrows: true
};

$.fn.slickLightbox = function(options) {
  options = $.extend({}, defaults, options);
  return this.slickLightbox = new SlickLightbox(this, options);
};

$.fn.unslickLightbox = function(options) {
  return this.slickLightbox.destroy(true);
};
);
};
.slickLightbox = new SlickLightbox(this, options);
};

$.fn.unslickLightbox = function(options) {
  return this.slickLightbox.destroy(true);
};
;
fn.unslickLightbox = function(options) {
  return this.slickLightbox.destroy(true);
};
