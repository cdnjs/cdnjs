;(function ($, window, document, undefined) {

  var pluginName = 'gray',
      defaults = {};

  function Plugin (element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {

    init: function () {
      // TODO: better feature detection
      if (this.isIE10() || this.isIE11()) {
        this.switchImage();
      }
    },

    isIE10: function() {
      return Function('/*@cc_on return document.documentMode===10.0@*/')();
    },

    isIE11: function() {
      return !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
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

    switchImage: function () {
      var template,
          element = $(this.element);

      params = this.getParams(element);

      // TODO: use templating or DOM elements here
      template = $(
        '<div>' +
          '<svg xmlns="http://www.w3.org/2000/svg" id="svgroot" viewBox="0 0 '+params.svg.width+' '+params.svg.height+'" width="'+params.svg.width+'" height="'+params.svg.height+'" style="'+params.svg.offset+'">' +
            '<defs>' +
              '<filter id="gray">' +
                '<feComposite in="SourceGraphic" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" />' +
                '<feColorMatrix type="saturate" values="0" />' +
              '</filter>' +
            '</defs>' +
            '<image filter="url(&quot;#gray&quot;)" x="0" y="0" width="'+params.svg.width+'" height="'+params.svg.height+'" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+params.svg.url+'" />' +
          '</svg>' +
        '</div>');

      params.styles['display']  = 'inline-block';
      params.styles['overflow'] =
        params.styles['overflow-x'] =
        params.styles['overflow-y'] = 'hidden';

      // TODO: Should this really set all params or should we set only unique ones by comparing to a control element?
      template.css(params.styles);

      element.replaceWith(template);
    }
  };

  $.fn[pluginName] = function (options) {
    this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
    return this;
  };

  $(window).on('load', function() {
    $('.grayscale')[pluginName]();
  });

})(jQuery, window, document);
