/*!
 * tipso - A Lightweight Responsive jQuery Tooltip Plugin v1.0.8
 * Copyright (c) 2014-2015 Bojan Petkovski
 * http://tipso.object505.com
 * Licensed under the MIT license
 * http://object505.mit-license.org/
 */
 // CommonJS, AMD or browser globals
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
  var pluginName = "tipso",
    defaults = {
      speed             : 400,          //Animation speed
      background        : '#55b555',
      titleBackground   : '#333333',
      color             : '#ffffff',
      titleColor        : '#ffffff',
      titleContent      : '',           //Content of the title bar
      showArrow         : true,
      position          : 'top',
      width             : 200,
      maxWidth          : '',
      delay             : 200,
      hideDelay         : 0,
      animationIn       : '',
      animationOut      : '',
      offsetX           : 0,
      offsetY           : 0,
      arrowWidth        : 8,
      tooltipHover      : false,
      content           : null,
      ajaxContentUrl    : null,
      ajaxContentBuffer : 0,
      contentElementId  : null,         //Normally used for picking template scripts
      useTitle          : false,        //Use the title tag as tooptip or not
      templateEngineFunc: null,         //A function that compiles and renders the content
      onBeforeShow      : null,
      onShow            : null,
      onHide            : null
    };

  function Plugin(element, options) {
    this.element = element;
    this.$element = $(this.element);
    this.doc = $(document);
    this.win = $(window);
    this.settings = $.extend({}, defaults, options);

    /*
     * Process and add data-attrs to settings as well for ease of use. Also, if
     * data-tipso is an object then use it as extra settings and if it's not
     * then use it as a title.
     */
    if (typeof(this.$element.data("tipso")) === "object")
    {
      $.extend(this.settings, this.$element.data("tipso"));
    }

    var data_keys = Object.keys(this.$element.data());
    var data_attrs = {};
    for (var i = 0; i < data_keys.length; i++)
    {
      var key = data_keys[i].replace(pluginName, "");
      if (key === "")
      {
        continue;
      }
      //lowercase first letter
      key = key.charAt(0).toLowerCase() + key.slice(1);
      data_attrs[key] = this.$element.data(data_keys[i]);

      //We cannot use extend for data_attrs because they are automatically
      //lowercased. We need to do this manually and extend this.settings with
      //data_attrs
      for (var settings_key in this.settings)
      {
        if (settings_key.toLowerCase() == key)
        {
          this.settings[settings_key] = data_attrs[key];
        }
      }
    }

    this._defaults = defaults;
    this._name = pluginName;
    this._title = this.$element.attr('title');
    this.mode = 'hide';
    this.ieFade = !supportsTransitions;

    //By keeping the original prefered position and repositioning by calling
    //the reposition function we can make for more smart and easier positioning
    //in complex scenarios!
    this.settings.preferedPosition = this.settings.position;

    this.init();
  }

  $.extend(Plugin.prototype, {
    init: function() {
      var obj = this,
        $e = this.$element,
        $doc = this.doc;
      $e.addClass('tipso_style').removeAttr('title');

      if (obj.settings.tooltipHover) {
        var waitForHover = null,
            hoverHelper = null;
        $e.on('mouseover' + '.' + pluginName, function() {
          clearTimeout(waitForHover);
          clearTimeout(hoverHelper);
          hoverHelper = setTimeout(function(){
            obj.show();
          }, 150);
        });
        $e.on('mouseout' + '.' + pluginName, function() {
          clearTimeout(waitForHover);
          clearTimeout(hoverHelper);
          waitForHover = setTimeout(function(){
            obj.hide();
          }, 200);

          obj.tooltip()
            .on('mouseover' + '.' + pluginName, function() {
              obj.mode = 'tooltipHover';
            })
            .on('mouseout' + '.' + pluginName, function() {
              obj.mode = 'show';
              clearTimeout(waitForHover);
              waitForHover = setTimeout(function(){
                obj.hide();
              }, 200);
            })
        ;
        });
      } else {
        $e.on('mouseover' + '.' + pluginName, function() {
          obj.show();
        });
        $e.on('mouseout' + '.' + pluginName, function() {
          obj.hide();
        });
      }
	  if(obj.settings.ajaxContentUrl)
	  {
		obj.ajaxContent = null;
	  }
    },
    tooltip: function() {
      if (!this.tipso_bubble) {
        this.tipso_bubble = $(
          '<div class="tipso_bubble"><div class="tipso_title"></div><div class="tipso_content"></div><div class="tipso_arrow"></div></div>'
        );
      }
      return this.tipso_bubble;
    },
    show: function() {
      var tipso_bubble = this.tooltip(),
        obj = this,
        $win = this.win;

      if (obj.settings.showArrow === false) {
          tipso_bubble.find(".tipso_arrow").hide();
      }
      else {
          tipso_bubble.find(".tipso_arrow").show();
      }

      if (obj.mode === 'hide') {
        if ($.isFunction(obj.settings.onBeforeShow)) {
          obj.settings.onBeforeShow(obj.$element, obj.element, obj);
        }
        if (obj.settings.size) {
            tipso_bubble.addClass(obj.settings.size);
        }
        if (obj.settings.width) {
          tipso_bubble.css({
            background: obj.settings.background,
            color: obj.settings.color,
            width: obj.settings.width
          }).hide();
        } else if (obj.settings.maxWidth){
          tipso_bubble.css({
            background: obj.settings.background,
            color: obj.settings.color,
            maxWidth: obj.settings.maxWidth
          }).hide();
        } else {
          tipso_bubble.css({
            background: obj.settings.background,
            color: obj.settings.color,
            width: 200
          }).hide();
        }
        tipso_bubble.find('.tipso_title').css({
            background: obj.settings.titleBackground,
            color: obj.settings.titleColor
        });
        tipso_bubble.find('.tipso_content').html(obj.content());
        tipso_bubble.find('.tipso_title').html(obj.titleContent());
        reposition(obj);

        $win.on('resize' + '.' + pluginName, function tipsoResizeHandler () {
            obj.settings.position = obj.settings.preferedPosition;
            reposition(obj);
        });

        window.clearTimeout(obj.timeout);
        obj.timeout = null;
        obj.timeout = window.setTimeout(function() {
          if (obj.ieFade || obj.settings.animationIn === '' || obj.settings.animationOut === ''){
            tipso_bubble.appendTo('body').stop(true, true).fadeIn(obj.settings
            .speed, function() {
              obj.mode = 'show';
              if ($.isFunction(obj.settings.onShow)) {
                obj.settings.onShow(obj.$element, obj.element, obj);
              }
            });
          } else {
            tipso_bubble.remove().appendTo('body')
            .stop(true, true)
            .removeClass('animated ' + obj.settings.animationOut)
            .addClass('noAnimation')
            .removeClass('noAnimation')
            .addClass('animated ' + obj.settings.animationIn).fadeIn(obj.settings.speed, function() {
              $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated ' + obj.settings.animationIn);
              });
              obj.mode = 'show';
              if ($.isFunction(obj.settings.onShow)) {
                obj.settings.onShow(obj.$element, obj.element, obj);
              }
              $win.off('resize' + '.' + pluginName, null, 'tipsoResizeHandler');
            });
          }
        }, obj.settings.delay);
      }
    },
    hide: function(force) {
      var obj = this,
        $win = this.win,
        tipso_bubble = this.tooltip(),
        hideDelay = obj.settings.hideDelay;

      if (force) {
        hideDelay = 0;
        obj.mode = 'show';
      }

      window.clearTimeout(obj.timeout);
      obj.timeout = null;
      obj.timeout = window.setTimeout(function() {
        if (obj.mode !== 'tooltipHover') {
          if (obj.ieFade || obj.settings.animationIn === '' || obj.settings.animationOut === ''){
            tipso_bubble.stop(true, true).fadeOut(obj.settings.speed,
            function() {
              $(this).remove();
              if ($.isFunction(obj.settings.onHide) && obj.mode === 'show') {
                obj.settings.onHide(obj.$element, obj.element, obj);
              }
              obj.mode = 'hide';
              $win.off('resize' + '.' + pluginName, null, 'tipsoResizeHandler');
            });
          } else {
            tipso_bubble.stop(true, true)
            .removeClass('animated ' + obj.settings.animationIn)
            .addClass('noAnimation').removeClass('noAnimation')
            .addClass('animated ' + obj.settings.animationOut)
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass('animated ' + obj.settings.animationOut).remove();
              if ($.isFunction(obj.settings.onHide) && obj.mode === 'show') {
                obj.settings.onHide(obj.$element, obj.element, obj);
              }
              obj.mode = 'hide';
              $win.off('resize' + '.' + pluginName, null, 'tipsoResizeHandler');
            });
          }
        }
      }, hideDelay);
    },
    close: function() {
      this.hide(true);
    },
    destroy: function() {
      var $e = this.$element,
        $win = this.win,
        $doc = this.doc;
      $e.off('.' + pluginName);
      $win.off('resize' + '.' + pluginName, null, 'tipsoResizeHandler');
      $e.removeData(pluginName);
      $e.removeClass('tipso_style').attr('title', this._title);
    },
    titleContent: function() {
        var content,
          $e = this.$element,
          obj = this;
        if (obj.settings.titleContent)
        {
            content = obj.settings.titleContent;
        }
        else
        {
            content = $e.data('tipso-title');
        }
        return content;
    },
    content: function() {
      var content,
        $e = this.$element,
        obj = this,
        title = this._title;
      if (obj.settings.ajaxContentUrl)
      {
		if(obj._ajaxContent)
		{
			content = obj._ajaxContent;
		}
		else 
		{
			obj._ajaxContent = content = $.ajax({
			  type: "GET",
			  url: obj.settings.ajaxContentUrl,
			  async: false
			}).responseText;
			if(obj.settings.ajaxContentBuffer > 0)
			{
				setTimeout(function(){ 
					obj._ajaxContent = null;
				}, obj.settings.ajaxContentBuffer);
			}
			else 
			{
				obj._ajaxContent = null;
			}
		}
      }
      else if (obj.settings.contentElementId)
      {
        content = $("#" + obj.settings.contentElementId).text();
      }
      else if (obj.settings.content)
      {
        content = obj.settings.content;
      }
      else
      {
        if (obj.settings.useTitle === true)
        {
          content = title;
        }
        else
        {
          // Only use data-tipso as content if it's not being used for settings
          if (typeof($e.data("tipso")) === "string")
          {
            content = $e.data('tipso');
          }
        }
      }
      if (obj.settings.templateEngineFunc !== null)
      {
          content = obj.settings.templateEngineFunc(content);
      }
      return content;
    },
    update: function(key, value) {
      var obj = this;
      if (value) {
        obj.settings[key] = value;
      } else {
        return obj.settings[key];
      }
    }
  });

  function realHeight(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var height = clone.outerHeight();
    var width = clone.outerWidth();
    clone.remove();
    return {
      'width' : width,
      'height' : height
    };
  }

  var supportsTransitions = (function() {
    var s = document.createElement('p').style,
        v = ['ms','O','Moz','Webkit'];
    if( s['transition'] === '' ) return true;
    while( v.length )
        if( v.pop() + 'Transition' in s )
            return true;
    return false;
  })();

  function removeCornerClasses(obj) {
    obj.removeClass("top_right_corner bottom_right_corner top_left_corner bottom_left_corner");
    obj.find(".tipso_title").removeClass("top_right_corner bottom_right_corner top_left_corner bottom_left_corner");
  }

  function reposition(thisthat) {
    var tipso_bubble = thisthat.tooltip(),
      $e = thisthat.$element,
      obj = thisthat,
      $win = $(window),
      arrow = 10,
      pos_top, pos_left, diff;

    var arrow_color = obj.settings.background;
    var title_content = obj.titleContent();
    if (title_content !== undefined && title_content !== '') {
        arrow_color = obj.settings.titleBackground;
    }

    if ($e.parent().outerWidth() > $win.outerWidth()) {
      $win = $e.parent();
    }

    switch (obj.settings.position)
    {
      case 'top-right':
        pos_left = $e.offset().left + ($e.outerWidth());
        pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: '',
        });
        if (pos_top < $win.scrollTop())
        {
          pos_top = $e.offset().top + $e.outerHeight() + arrow;

          tipso_bubble.find('.tipso_arrow').css({
            'border-bottom-color': arrow_color,
            'border-top-color': 'transparent',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });

          /*
           * Hide and show the appropriate rounded corners
           */
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("bottom_right_corner");
          tipso_bubble.find(".tipso_title").addClass("bottom_right_corner");
          tipso_bubble.find('.tipso_arrow').css({
            'border-left-color': arrow_color,
          });

          tipso_bubble.removeClass('top-right top bottom left right');
          tipso_bubble.addClass('bottom');
        }
        else
        {
          tipso_bubble.find('.tipso_arrow').css({
            'border-top-color': obj.settings.background,
            'border-bottom-color': 'transparent ',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });

          /*
           * Hide and show the appropriate rounded corners
           */
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("top_right_corner");
          tipso_bubble.find('.tipso_arrow').css({
            'border-left-color': obj.settings.background,
          });

          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('top');
        }
        break;
      case 'top-left':
        pos_left = $e.offset().left - (realHeight(tipso_bubble).width);
        pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: '',
        });
        if (pos_top < $win.scrollTop())
        {
          pos_top = $e.offset().top + $e.outerHeight() + arrow;

          tipso_bubble.find('.tipso_arrow').css({
            'border-bottom-color': arrow_color,
            'border-top-color': 'transparent',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });

          /*
           * Hide and show the appropriate rounded corners
           */
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("bottom_left_corner");
          tipso_bubble.find(".tipso_title").addClass("bottom_left_corner");
          tipso_bubble.find('.tipso_arrow').css({
            'border-right-color': arrow_color,
          });

          tipso_bubble.removeClass('top-right top bottom left right');
          tipso_bubble.addClass('bottom');
        }
        else
        {
          tipso_bubble.find('.tipso_arrow').css({
            'border-top-color': obj.settings.background,
            'border-bottom-color': 'transparent ',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });

          /*
           * Hide and show the appropriate rounded corners
           */
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("top_left_corner");
          tipso_bubble.find('.tipso_arrow').css({
            'border-right-color': obj.settings.background,
          });

          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('top');
        }
        break;

      /*
       * Bottom right position
       */
      case 'bottom-right':
       pos_left = $e.offset().left + ($e.outerWidth());
       pos_top = $e.offset().top + $e.outerHeight() + arrow;
       tipso_bubble.find('.tipso_arrow').css({
         marginLeft: -obj.settings.arrowWidth,
         marginTop: '',
       });
       if (pos_top + realHeight(tipso_bubble).height > $win.scrollTop() + $win.outerHeight())
       {
         pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;

         tipso_bubble.find('.tipso_arrow').css({
           'border-bottom-color': 'transparent',
           'border-top-color': obj.settings.background,
           'border-left-color': 'transparent',
           'border-right-color': 'transparent'
         });

         /*
          * Hide and show the appropriate rounded corners
          */
         removeCornerClasses(tipso_bubble);
         tipso_bubble.addClass("top_right_corner");
         tipso_bubble.find(".tipso_title").addClass("top_left_corner");
         tipso_bubble.find('.tipso_arrow').css({
           'border-left-color': obj.settings.background,
         });

         tipso_bubble.removeClass('top-right top bottom left right');
         tipso_bubble.addClass('top');
       }
       else
       {
         tipso_bubble.find('.tipso_arrow').css({
           'border-top-color': 'transparent',
           'border-bottom-color': arrow_color,
           'border-left-color': 'transparent',
           'border-right-color': 'transparent'
         });

         /*
          * Hide and show the appropriate rounded corners
          */
         removeCornerClasses(tipso_bubble);
         tipso_bubble.addClass("bottom_right_corner");
         tipso_bubble.find(".tipso_title").addClass("bottom_right_corner");
         tipso_bubble.find('.tipso_arrow').css({
           'border-left-color': arrow_color,
         });

         tipso_bubble.removeClass('top bottom left right');
         tipso_bubble.addClass('bottom');
       }
       break;

       /*
        * Bottom left position
        */
       case 'bottom-left':
        pos_left = $e.offset().left - (realHeight(tipso_bubble).width);
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: '',
        });
        if (pos_top + realHeight(tipso_bubble).height > $win.scrollTop() + $win.outerHeight())
        {
          pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;

          tipso_bubble.find('.tipso_arrow').css({
            'border-bottom-color': 'transparent',
            'border-top-color': obj.settings.background,
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });

          /*
           * Hide and show the appropriate rounded corners
           */
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("top_left_corner");
          tipso_bubble.find(".tipso_title").addClass("top_left_corner");
          tipso_bubble.find('.tipso_arrow').css({
            'border-right-color': obj.settings.background,
          });

          tipso_bubble.removeClass('top-right top bottom left right');
          tipso_bubble.addClass('top');
        }
        else
        {
          tipso_bubble.find('.tipso_arrow').css({
            'border-top-color': 'transparent',
            'border-bottom-color': arrow_color,
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });

          /*
           * Hide and show the appropriate rounded corners
           */
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("bottom_left_corner");
          tipso_bubble.find(".tipso_title").addClass("bottom_left_corner");
          tipso_bubble.find('.tipso_arrow').css({
            'border-right-color': arrow_color,
          });

          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('bottom');
        }
        break;
      /*
       * Top position
       */
      case 'top':
        pos_left = $e.offset().left + ($e.outerWidth() / 2) - (realHeight(tipso_bubble).width / 2);
        pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: '',
        });
        if (pos_top < $win.scrollTop())
        {
          pos_top = $e.offset().top + $e.outerHeight() + arrow;

          tipso_bubble.find('.tipso_arrow').css({
            'border-bottom-color': arrow_color,
            'border-top-color': 'transparent',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });

          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('bottom');
        }
        else
        {
          tipso_bubble.find('.tipso_arrow').css({
            'border-top-color': obj.settings.background,
            'border-bottom-color': 'transparent',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('top');
        }
        break;
      case 'bottom':
        pos_left = $e.offset().left + ($e.outerWidth() / 2) - (realHeight(tipso_bubble).width / 2);
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: '',
        });
        if (pos_top + realHeight(tipso_bubble).height > $win.scrollTop() + $win.outerHeight())
        {
          pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
          tipso_bubble.find('.tipso_arrow').css({
            'border-top-color': obj.settings.background,
            'border-bottom-color': 'transparent',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('top');
        }
        else
        {
          tipso_bubble.find('.tipso_arrow').css({
            'border-bottom-color': arrow_color,
            'border-top-color': 'transparent',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass(obj.settings.position);
        }
        break;
      case 'left':
        pos_left = $e.offset().left - realHeight(tipso_bubble).width - arrow;
        pos_top = $e.offset().top + ($e.outerHeight() / 2) - (realHeight(tipso_bubble).height / 2);
        tipso_bubble.find('.tipso_arrow').css({
          marginTop: -obj.settings.arrowWidth,
          marginLeft: ''
        });
        if (pos_left < $win.scrollLeft())
        {
          pos_left = $e.offset().left + $e.outerWidth() + arrow;
          tipso_bubble.find('.tipso_arrow').css({
            'border-right-color': obj.settings.background,
            'border-left-color': 'transparent',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('right');
        }
        else
        {
          tipso_bubble.find('.tipso_arrow').css({
            'border-left-color': obj.settings.background,
            'border-right-color': 'transparent',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass(obj.settings.position);
        }
        break;
      case 'right':
        pos_left = $e.offset().left + $e.outerWidth() + arrow;
        pos_top = $e.offset().top + ($e.outerHeight() / 2) - (realHeight(tipso_bubble).height / 2);
        tipso_bubble.find('.tipso_arrow').css({
          marginTop: -obj.settings.arrowWidth,
          marginLeft: ''
        });
        if (pos_left + arrow + obj.settings.width > $win.scrollLeft() + $win.outerWidth())
        {
          pos_left = $e.offset().left - realHeight(tipso_bubble).width - arrow;
          tipso_bubble.find('.tipso_arrow').css({
            'border-left-color': obj.settings.background,
            'border-right-color': 'transparent',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass('left');
        }
        else
        {
          tipso_bubble.find('.tipso_arrow').css({
            'border-right-color': obj.settings.background,
            'border-left-color': 'transparent',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent'
          });
          tipso_bubble.removeClass('top bottom left right');
          tipso_bubble.addClass(obj.settings.position);
        }
        break;
    }
    /*
     * Set the position of the arrow for the corner positions
     */
    if (obj.settings.position === 'top-right')
    {
      tipso_bubble.find('.tipso_arrow').css({
        'margin-left': -obj.settings.width / 2
      });
    }
    if (obj.settings.position === 'top-left')
    {
      var tipso_arrow = tipso_bubble.find(".tipso_arrow").eq(0);
      tipso_arrow.css({
        'margin-left': obj.settings.width / 2 - 2 * obj.settings.arrowWidth
      });
    }
    if (obj.settings.position === 'bottom-right')
    {
      var tipso_arrow = tipso_bubble.find(".tipso_arrow").eq(0);
      tipso_arrow.css({
        'margin-left': -obj.settings.width / 2,
        'margin-top': ''
      });
    }
    if (obj.settings.position === 'bottom-left')
    {
      var tipso_arrow = tipso_bubble.find(".tipso_arrow").eq(0);
      tipso_arrow.css({
        'margin-left': obj.settings.width / 2 - 2 * obj.settings.arrowWidth,
        'margin-top': ''
      });
    }

    /*
     * Check out of boundness
     */
    if (pos_left < $win.scrollLeft() && (obj.settings.position === 'bottom' || obj.settings.position === 'top'))
    {
      tipso_bubble.find('.tipso_arrow').css({
        marginLeft: pos_left - obj.settings.arrowWidth
      });
      pos_left = 0;
    }
    if (pos_left + obj.settings.width > $win.outerWidth() && (obj.settings.position === 'bottom' || obj.settings.position === 'top'))
    {
      diff = $win.outerWidth() - (pos_left + obj.settings.width);
      tipso_bubble.find('.tipso_arrow').css({
        marginLeft: -diff - obj.settings.arrowWidth,
        marginTop: ''
      });
      pos_left = pos_left + diff;
    }
    if (pos_left < $win.scrollLeft() &&
       (obj.settings.position === 'left' ||
        obj.settings.position === 'right' ||
        obj.settings.position === 'top-right' ||
        obj.settings.position === 'top-left' ||
        obj.settings.position === 'bottom-right' ||
        obj.settings.position === 'bottom-left'))
    {
      pos_left = $e.offset().left + ($e.outerWidth() / 2) - (realHeight(tipso_bubble).width / 2);
      tipso_bubble.find('.tipso_arrow').css({
        marginLeft: -obj.settings.arrowWidth,
        marginTop: ''
      });
      pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
      if (pos_top < $win.scrollTop())
      {
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find('.tipso_arrow').css({
          'border-bottom-color': arrow_color,
          'border-top-color': 'transparent',
          'border-left-color': 'transparent',
          'border-right-color': 'transparent'
        });
        tipso_bubble.removeClass('top bottom left right');
        removeCornerClasses(tipso_bubble);
        tipso_bubble.addClass('bottom');
      }
      else
      {
        tipso_bubble.find('.tipso_arrow').css({
          'border-top-color': obj.settings.background,
          'border-bottom-color': 'transparent',
          'border-left-color': 'transparent',
          'border-right-color': 'transparent'
        });
        tipso_bubble.removeClass('top bottom left right');
        removeCornerClasses(tipso_bubble);
        tipso_bubble.addClass('top');
      }
      if (pos_left + obj.settings.width > $win.outerWidth())
      {
        diff = $win.outerWidth() - (pos_left + obj.settings.width);
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -diff - obj.settings.arrowWidth,
          marginTop: ''
        });
        pos_left = pos_left + diff;
      }
      if (pos_left < $win.scrollLeft())
      {
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: pos_left - obj.settings.arrowWidth
        });
        pos_left = 0;
      }
    }

    /*
     * If out of bounds from the right hand side
     */
    if (pos_left + obj.settings.width > $win.outerWidth() &&
       (obj.settings.position === 'left' ||
        obj.settings.position === 'right' ||
        obj.settings.position === 'top-right' ||
        obj.settings.position === 'top-left' ||
        obj.settings.position === 'bottom-right' ||
        obj.settings.position === 'bottom-right'))
    {
      pos_left = $e.offset().left + ($e.outerWidth() / 2) - (realHeight(tipso_bubble).width / 2);
      tipso_bubble.find('.tipso_arrow').css({
        marginLeft: -obj.settings.arrowWidth,
        marginTop: ''
      });
      pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
      if (pos_top < $win.scrollTop())
      {
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find('.tipso_arrow').css({
          'border-bottom-color': arrow_color,
          'border-top-color': 'transparent',
          'border-left-color': 'transparent',
          'border-right-color': 'transparent'
        });

        removeCornerClasses(tipso_bubble);
        tipso_bubble.removeClass('top bottom left right');
        tipso_bubble.addClass('bottom');
      }
      else
      {
        tipso_bubble.find('.tipso_arrow').css({
          'border-top-color': obj.settings.background,
          'border-bottom-color': 'transparent',
          'border-left-color': 'transparent',
          'border-right-color': 'transparent'
        });

        /*
         * Hide and show the appropriate rounded corners
         */
        removeCornerClasses(tipso_bubble);
        tipso_bubble.removeClass('top bottom left right');
        tipso_bubble.addClass('top');
      }
      if (pos_left + obj.settings.width > $win.outerWidth())
      {
        diff = $win.outerWidth() - (pos_left + obj.settings.width);
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: -diff - obj.settings.arrowWidth,
          marginTop: ''
        });
        pos_left = pos_left + diff;
      }
      if (pos_left < $win.scrollLeft())
      {
        tipso_bubble.find('.tipso_arrow').css({
          marginLeft: pos_left - obj.settings.arrowWidth
        });
        pos_left = 0;
      }
    }
    tipso_bubble.css({
      left: pos_left + obj.settings.offsetX,
      top: pos_top + obj.settings.offsetY
    });

    // If positioned right or left and tooltip is out of bounds change position
    // This position change will be temporary, because preferedPosition is there
    // to help!!
    if (pos_top < $win.scrollTop() && (obj.settings.position === 'right' || obj.settings.position === 'left'))
    {
      $e.tipso('update', 'position', 'bottom');
      reposition(obj);
    }
    if (pos_top + realHeight(tipso_bubble).height > $win.scrollTop() + $win.outerHeight() &&
        (obj.settings.position === 'right' || obj.settings.position === 'left'))
    {
      $e.tipso('update', 'position', 'top');
      reposition(obj);
    }

  }
  $[pluginName] = $.fn[pluginName] = function(options) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      if (!(this instanceof $)) {
        $.extend(defaults, options);
      }
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !==
      'init') {
      var returns;
      this.each(function() {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (!instance) {
          instance = $.data(this, 'plugin_' + pluginName, new Plugin(
            this, options));
        }
        if (instance instanceof Plugin && typeof instance[options] ===
          'function') {
          returns = instance[options].apply(instance, Array.prototype.slice
            .call(args, 1));
        }
        if (options === 'destroy') {
          $.data(this, 'plugin_' + pluginName, null);
        }
      });
      return returns !== undefined ? returns : this;
    }
  };
}));
