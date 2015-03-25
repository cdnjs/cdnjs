/*! jCarousel - v0.3.0-beta - 2013-01-18
* http://sorgalla.com/jcarousel/
* Copyright 2013 Jan Sorgalla
* Released under the MIT license */

(function($) {
    'use strict';

    $.jCarousel.plugin('jcarouselControl', {
        _options: {
            target: '+=1',
            event:  'click'
        },
        _active: null,
        _init: function() {
            this.onDestroy = $.proxy(function() {
                this._destroy();
                this.carousel()
                    .one('createend.jcarousel', $.proxy(this._create, this));
            }, this);
            this.onReload = $.proxy(this._reload, this);
            this.onEvent = $.proxy(function(e) {
                e.preventDefault();
                this.carousel()
                    .jcarousel('scroll', this.options('target'));
            }, this);
        },
        _create: function() {
            this.carousel()
                .one('destroy.jcarousel', this.onDestroy)
                .bind('reloadend.jcarousel scrollend.jcarousel', this.onReload);

            this._element
                .bind(this.options('event') + '.jcarouselcontrol', this.onEvent);

            this._reload();
        },
        _destroy: function() {
            this._element
                .unbind('.jcarouselcontrol', this.onEvent);

            this.carousel()
                .unbind('destroy.jcarousel', this.onDestroy)
                .unbind('reloadend.jcarousel scrollend.jcarousel', this.onReload);
        },
        _reload: function() {
            var parsed   = $.jCarousel.parseTarget(this.options('target')),
                carousel = this.carousel(),
                active;

            if (parsed.relative) {
                active = carousel
                    .jcarousel(parsed.target > 0 ? 'hasNext' : 'hasPrev');
            } else {
                var target = typeof parsed.target !== 'object' ?
                                carousel.jcarousel('items').eq(parsed.target) :
                                parsed.target;

                active = carousel.jcarousel('target').index(target) >= 0;
            }

            if (this._active !== active) {
                this._trigger(active ? 'active' : 'inactive');
                this._active = active;
            }

            return this;
        }
    });
}(jQuery));
