/*! Gray v1.4.1 (https://github.com/karlhorky/gray) | MIT */
/*! Modernizr 2.8.3 (Custom Build) | MIT & BSD */
/* Build: http://modernizr.com/download/#-inlinesvg-prefixes-css_filters-svg_filters
 */
;window.Modernizr=window.Modernizr||function(a,b,c){function v(a){i.cssText=a}function w(a,b){return v(l.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m={svg:"http://www.w3.org/2000/svg"},n={},o={},p={},q=[],r=q.slice,s,t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==m.svg};for(var A in n)u(n,A)&&(s=A.toLowerCase(),e[s]=n[A](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},v(""),h=j=null,e._version=d,e._prefixes=l,e}(this,this.document),Modernizr.addTest("cssfilters",function(){var a=document.createElement("div");return a.style.cssText=Modernizr._prefixes.join("filter:blur(2px); "),!!a.style.length&&(document.documentMode===undefined||document.documentMode>9)}),Modernizr.addTest("svgfilters",function(){var a=!1;try{a=typeof SVGFEColorMatrixElement!==undefined&&SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE==2}catch(b){}return a});
;(function ($, window, document, undefined) {

  var pluginName = 'gray',
      defaults = {
        fade   : false,
        classes: {
          fade: 'grayscale-fade'
        }
      };

  function Plugin (element, options) {
    var classes,
        fadeClass;

    options = options || {};

    classes = options.classes || {};
    fadeClass = classes.fade || defaults.classes.fade;
    options.fade = options.fade || element.className.indexOf(fadeClass) > -1;

    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend(Plugin.prototype, {

    init: function () {
      var element;

      if (!Modernizr.cssfilters &&
        Modernizr.inlinesvg &&
        Modernizr.svgfilters
      ) {
        element = $(this.element);

        if (this.cssFilterDeprecated(element) || this.settings.fade) {
          this.switchImage(element);
        }
      }
    },

    // TODO: Test a freshly made element (modernizr feature test?)
    // instead of testing the active element (fragile)
    cssFilterDeprecated: function(element) {
      return element.css('filter') === 'none';
    },

    elementType: function(element) {
      var type;

      if (element.prop('tagName') === 'IMG') {
        type = 'Img';
      } else {
        type = 'Bg';
      }

      return type;
    },

    getComputedStyle: function(element) {
      var computedStyle = {},
          styles        = {};

      computedStyle = window.getComputedStyle(element, null);

      for(var i = 0, length = computedStyle.length; i < length; i++) {
        var prop = computedStyle[i];
        var val = computedStyle.getPropertyValue(prop);
        styles[prop] = val;
      }

      return styles;
    },

    extractUrl: function(backgroundImage) {
      var url,
          regex;

      startRegex = /^url\(["']?/;
      endRegex   = /["']?\)$/;
      url = backgroundImage.replace(startRegex, '')
                           .replace(endRegex, '');

      return url;
    },

    positionToNegativeMargin: function(backgroundPosition) {
      var x,
          y,
          margin;

      x = backgroundPosition.match(/^(-?\d+\S+)/)[0]
      y = backgroundPosition.match(/\s(-?\d+\S+)$/)[0]

      margin = 'margin:' + y + ' 0 0 ' + x;

      return margin;
    },

    getBgSize: function(url, backgroundSize) {
      var img,
          ratio,
          defaultW,
          w,
          defaultH,
          h,
          size;

      img = new Image();
      img.src = url;

      // TODO: Break this up or simplify
      if (backgroundSize !== 'auto' && backgroundSize !== 'cover' && backgroundSize !== 'contain' && backgroundSize !== 'inherit') {
        var $element = $(this.element);

        ratio    = img.width / img.height;
        w        = parseInt((backgroundSize.match(/^(\d+)px/) || [0,0])[1]);
        h        = parseInt((backgroundSize.match(/\s(\d+)px$/) || [0,0])[1]);
        defaultW = $element.height() * ratio;
        defaultH = $element.width() / ratio;
        w        = w || defaultW;
        h        = h || defaultH;
      }

      if (w || h) {
        size = {
          width: w,
          height: h
        }
      } else {

        size = {
          width : img.width,
          height: img.height
        };
      }

      return size;
    },

    getParams: function(element) {
      var type = this.elementType(element);
      return this['get' + type + 'Params'](element);
    },

    getImgParams: function(element) {
      var params = {};

      params.styles = this.getComputedStyle(element[0]);

      params.svg = {
        url   : element[0].src,
        width : params.styles.width.replace('px', ''),
        height: params.styles.height.replace('px', ''),
        offset: ''
      };

      return params;
    },

    getBgParams: function(element) {
      var params = {},
          url,
          position;

      url       = this.extractUrl(element.css('background-image'));
      bgSize    = this.getBgSize(url, element.css('background-size'))
      offset    = this.positionToNegativeMargin(element.css('background-position'));

      params.styles = this.getComputedStyle(element[0]);

      params.svg = $.extend(
        { url   : url },
        bgSize,
        { offset: offset }
      );

      return params;
    },

    setStyles: function(styles, url, width, height) {
      styles['display']  = 'inline-block';
      styles['overflow'] =
        styles['overflow-x'] =
        styles['overflow-y'] = 'hidden';
      styles['background-image'] = 'url("' + url + '")';
      styles['background-size'] = width + 'px ' + height + 'px';
      delete styles['filter'];

      return styles;
    },

    // TODO: Run this outside of the plugin so that it's not run
    // on every element
    addSVGFilterOnce: function() {
      $body = $('body');
      if (!$body.data('plugin_' + pluginName + '_has_filter')) {
        $body.data('plugin_' + pluginName + '_has_filter', 'true')
          .append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute"><defs><filter id="gray"><feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"></feColorMatrix></filter></defs></svg>');
      }
    },

    switchImage: function(element) {
      var params,
          classes,
          template;

      params = this.getParams(element);

      classes = this.settings.fade ? this.settings.classes.fade : '';

      template = $(
        '<div class="grayscale grayscale-replaced ' + classes + '">' +
          '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + params.svg.width + ' ' + params.svg.height + '" width="' + params.svg.width + '" height="' + params.svg.height + '" style="' + params.svg.offset + '">' +
            '<image filter="url(&quot;#gray&quot;)" x="0" y="0" width="' + params.svg.width + '" height="' + params.svg.height + '" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + params.svg.url + '" />' +
          '</svg>' +
        '</div>');

      params.styles = this.setStyles(params.styles, params.svg.url, params.svg.width, params.svg.height);

      // TODO: Should this really set all params or should we set only unique ones by comparing to a control element?
      template.css(params.styles);

      this.addSVGFilterOnce();
      element.replaceWith(template);
    }
  });

  $.fn[pluginName] = function (options) {
    this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
    return this;
  };

  $(window).on('load', function() {
    $('.grayscale:not(.grayscale-replaced)')[pluginName]();
  });

})(jQuery, window, document);
