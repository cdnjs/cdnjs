(function ($) {

//get IE version if browser is IE
  var ie = (function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
  })();

  $.fn.sliiide = function(options) {

    var settings = $.extend({
      toggle: "#sliiider-toggle",
      exit_selector: ".slider-exit",
      animation_duration: "0.5s",
      place: "right",
      animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)",
      body_slide: true,
      no_scroll: false,
      auto_close: false
    }, options );

    var newSize;
    var clicked = false;
    var $sliiider = $(this);
    var $toggle = $(settings.toggle);
    var $exit = $(settings.exit_selector);
    var $body = $('body');
    var bodySlideDistance;

    var bodyResetProp = {
      transform: '',
      'overflow-x': '',
      transition: '',
      position: ''
    };

    var sliiiderResetProp = {
      transform: '',
      transition: '',
      width: '',
      height: '',
      left: '',
      top:'',
      bottom:'',
      right:''
    };

    var prepareProperties = {
      visibility: 'hidden',
      transition: 'transform ' + settings.animation_duration + ' ' + settings.animation_curve,
      position: 'fixed'
    };

    var bodyChildrenProp = {
      transition: 'transform ' + settings.animation_duration + ' ' + settings.animation_curve
    };

    var htmlProp = {
      'overflow-x': 'hidden'
    };

    var bodySlidePrepare = {
      position: 'relative', // to make overflow-x hidden work with mobile browsers
      'overflow-x': 'hidden',
    };


    var bodySlideProp = {

      setleft: function(distance) {
        this.left.activateAnimation.transform = 'translateX('+distance+'px)';
        this.left.deactivateAnimation.transform = 'translateX(0px)';
      },
      setright: function(distance) {
        this.right.activateAnimation.transform = 'translateX(-'+distance+'px)';
        this.right.deactivateAnimation.transform = 'translateX(0px)';
      },
      setbottom: function(distance) {
        this.bottom.activateAnimation.transform = 'translateY(-'+distance+'px)';
        this.bottom.deactivateAnimation.transform = 'translateY(0px)';
      },
      settop: function(distance) {
        this.top.activateAnimation.transform = 'translateY('+distance+'px)';
        this.top.deactivateAnimation.transform = 'translateY(0px)';
      },
      left: {
        activateAnimation: {transform:''},
        deactivateAnimation: {transform: ''}
      },
      right: {
        activateAnimation: {transform: ''},
        deactivateAnimation: {transform: ''}
      },
      top: {
        activateAnimation: {transform: ''},
        deactivateAnimation: {transform: ''}
      },
      bottom: {
        activateAnimation: {transform: ''},
        deactivateAnimation: {transform: ''}
      }
    };

    var Prop = {

      left: {
        properties: function() {
          var left = '-' + $sliiider.width() + 'px';
          return {top: '0', left: left};
        },
        activateAnimation: {transform: 'translateX(100%)'},
        deactivateAnimation: {transform: 'translateX(0)'},
        size: function (wHeight, wWidth) {
          return {height: wHeight};
        }
      },

      right: {
        properties: function() {
          var right = '-' + $sliiider.width() + 'px';
          return {top: '0', right: right};
        },
        activateAnimation: {transform: 'translateX(-100%)'},
        deactivateAnimation: {transform: 'translateX(0)'},
        size: function (wHeight, wWidth) {
          return {height: wHeight};
        }

      },

      top: {
        properties: function() {
          var top = '-' + $sliiider.height() + 'px';
          return {left: '0', right:'0', top: top};
        },
        activateAnimation: {transform: 'translateY(100%)'},
        deactivateAnimation: {transform: 'translateY(0)'},
        size: function (wHeight, wWidth) {
          return {width: wWidth};
        }
      },

      bottom: {
        properties: function() {
          var bottom = '-' + $sliiider.height() + 'px';
          return {left:0, right:0 , bottom: bottom};
        },
        activateAnimation: {transform: 'translateY(-100%)'},
        deactivateAnimation: {transform: 'translateY(0)'},
        size: function (wHeight, wWidth) {
          return {width: wWidth};
        }
      }
    };

    var prefixCSS = function(cssProp) {
      $.each(cssProp, function(k, v) {
        if(k === 'transition')
        { var trnsCSS = {};
        var trnsProp = v.split(' ',1)[0];
        var trnsAttr = v.split(' '); trnsAttr.shift(); trnsAttr = trnsAttr.join(' ');
        trnsCSS['-webkit-'+k] = '-webkit-' + trnsProp + ' ' + trnsAttr;
        trnsCSS['-ms-'+k] = '-ms-' + trnsProp + ' ' + trnsAttr;
        $.extend(cssProp, trnsCSS);
      }
      else if (k === 'transform')
      {
        var trnsfCSS = {};
        trnsfCSS['-webkit-'+k] = v;
        trnsfCSS['-ms-'+k] = v;
      }
    });

    return cssProp;
  };

  var siiize = function() {
    var windowSize = {};
    var scroll = getScrollBarWidth();
    windowSize.height = $(window).height();
    windowSize.width = $(window).width() + scroll;
    newSize = Prop[settings.place].size(windowSize.height, windowSize.width);
    $sliiider.css(newSize);
    $sliiider.css(prefixCSS(Prop[settings.place].properties()));
    setSlideDistance();
  };

  var setSlideDistance = function() {
    if(settings.body_slide)
    {
      if(settings.place === 'right' || settings.place === 'left')
      {
        bodySlideDistance = $sliiider.width();
      }
      else
      {
        bodySlideDistance = $sliiider.height();
      }
      bodySlideProp['set'+settings.place](bodySlideDistance);
    }
  };

  var prepare = function() {
    $sliiider.css(prefixCSS(prepareProperties));
    $sliiider.css(prefixCSS(Prop[settings.place].properties()));
    setSlideDistance();
  };

  var getScrollBarWidth = function() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild (inner);

    document.body.appendChild (outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 === w2) { w2 = outer.clientWidth; }

    document.body.removeChild (outer);

    return (w1 - w2);
  };

  var activate = function() {
    siiize(); //sets the size of the slider menu and the distance the body will travel on sliding
    $sliiider.css('visibility','visible');
    if(settings.body_slide)
      {
      $body.css(prefixCSS(bodySlidePrepare));
      $('html').css(htmlProp);
      $body.children().css(prefixCSS(bodyChildrenProp));
      $body.children().css(prefixCSS(bodySlideProp[settings.place].activateAnimation));
      if((ie !== false) && (ie <= 11))
        {
          $sliiider.css(prefixCSS(Prop[settings.place].activateAnimation));
        }

      //dealing with the browser bug of inability to transform fixed elements

      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var sliiiderHeight = $sliiider.height();
      var sliiiderOffsetTop = $sliiider.offset().top;

      // if((sliiiderOffsetTop !== scrollTop) && settings.place !== "bottom" && !(ie && ie <= 11 && settings.place ==="top"))
      //   {
      //     $sliiider.css('top', scrollTop);
      //   }
      // if(((sliiiderOffsetTop !== scrollTop + windowHeight) && (settings.place === "bottom")))
      //   {
      //   $sliiider.css('top', scrollTop + windowHeight - sliiiderHeight).css('bottom','');
      //   }
      }

    else {
      $sliiider.css(prefixCSS(Prop[settings.place].activateAnimation));
    }

    if(settings.no_scroll)  {
      disable_scroll();
    }

    clicked = true;
  };

  var hideSlider = function(e) {
    $sliiider.css('visibility','hidden');
    $body.css(bodyResetProp);
    $('html').css(bodyResetProp);
    $body.unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', hideSlider);
    prepare();
  };

  function deactivate() {

    $body.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', hideSlider);

    if(settings.body_slide) {
      $body.children().css(prefixCSS(bodySlideProp[settings.place].deactivateAnimation));
      if((ie !== false) && (ie <= 11))
        {$sliiider.css(prefixCSS(Prop[settings.place].deactivateAnimation));}
    }

    else {
      $sliiider.css(prefixCSS(Prop[settings.place].deactivateAnimation));
    }

    if(settings.no_scroll)  {
      enable_scroll();
    }

    clicked = false;
  }

  siiize();
  prepare();
  $(window).resize(siiize);
  $sliiider.resize(siiize);

  var handleToggle = function() {
    if (!clicked)
    {activate();}
    else
    {deactivate();}
  };

  $toggle.click(handleToggle);
  if (settings.auto_close) {
    $sliiider.find('a').on('click', function() {deactivate();});
  }
  $exit.on('click', function() {deactivate();});

  var deleteProp = function() {
    $body.css(bodyResetProp);
    $sliiider.css(sliiiderResetProp);
    $(window).off('resize', siiize);
    $toggle.off('click', handleToggle);
  };


  var menu = {
    reset: function(name) {
      $body.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', deleteProp);
      deactivate();
    },
    deactivate: function() {deactivate();},
    activate: function() {activate();}
  };

  return menu;
};

//enable and disable scroll
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
  e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function disable_scroll() {
  if (window.addEventListener) // older FF
  window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enable_scroll() {
  if (window.removeEventListener)
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}

}(jQuery));
