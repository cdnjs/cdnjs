(function ($) {

  $.fn.sliiide = function(options) {

    var settings = $.extend({
      toggle: "#sliiider-toggle",
      exit_selector: ".slider-exit",
      animation_duration: "0.5s",
      place: "right",
      animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)",
      body_slide: true,
      no_scroll: true,
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
      'overflow-y': '',
      transition: '',
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

    var bodySlidePrepare = {
      transition: 'transform ' + settings.animation_duration + ' ' + settings.animation_curve,
      'overflow-x': 'hidden',
      'overflow-y': 'hidden'
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
    }

    var Prop = {

      left: {
        properties: {top: '0', left: '0', transform: 'translateX(-100%)'},
        activateAnimation: {transform: 'translateX(0)'},
        deactivateAnimation: {transform: 'translateX(-100%)'},
        size: function (wHeight, wWidth) {
          return {height: wHeight}
        }
      },

      right: {
        properties: {top: '0', right: '0', transform: 'translateX(100%)'},
        activateAnimation: {transform: 'translateX(0)'},
        deactivateAnimation: {transform: 'translateX(100%)'},
        size: function (wHeight, wWidth) {
          return {height: wHeight}
        }

      },

      top: {
        properties: {top: '0', right: '0', left:'0', transform: 'translateY(-100%)'},
        activateAnimation: {transform: 'translateY(0)'},
        deactivateAnimation: {transform: 'translateY(-100%)'},
        size: function (wHeight, wWidth) {
          return {width: wWidth}
        }
      },

      bottom: {
        properties: {bottom: '0', right: '0', left:'0', transform: 'translateY(100%)'},
        activateAnimation: {transform: 'translateY(0)'},
        deactivateAnimation: {transform: 'translateY(100%)'},
        size: function (wHeight, wWidth) {
          return {width: wWidth}
        }
      }
    }

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
  }

  var siiize = function() {
    var windowSize = {};
    windowSize.height = $(window).height();
    windowSize.width = $(window).width();
    newSize = Prop[settings.place].size(windowSize.height, windowSize.width);
    $sliiider.css(newSize);
    setSlideDistance();
  }

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
  }

  var prepare = function() {
    $sliiider.css(prefixCSS(prepareProperties));
    $sliiider.css(prefixCSS(Prop[settings.place]["properties"]));
    setSlideDistance();
  };


  var activate = function() {
    siiize();
    $sliiider.css('visibility','initial');
    if(settings.body_slide) {
      $body.css(prefixCSS(bodySlidePrepare));
      $body.css(prefixCSS(bodySlideProp[settings.place].activateAnimation));
    }

    else {
      $sliiider.css(prefixCSS(Prop[settings.place]["activateAnimation"]));
    }

    if(settings.no_scroll)  {
      disable_scroll();
    }

    clicked = true;
  }

  var hideSlider = function(e) {
    $sliiider.css('visibility','hidden');
    $body.css(bodyResetProp);
    $body.unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', hideSlider);
  }

  function deactivate() {

    $body.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', hideSlider);

    if(settings.body_slide) {
      $body.css(prefixCSS(bodySlideProp[settings.place].deactivateAnimation));
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

  var handleToggle = function() {
    if (!clicked)
    {activate();}
    else
    {deactivate();}
  }

  $toggle.click(handleToggle);
  $sliiider.find('a').on('click', function() {deactivate()});
  $exit.on('click', function() {deactivate()});

  var deleteProp = function() {
    $body.css(bodyResetProp);
    $sliiider.css(sliiiderResetProp);
    $(window).off('resize', siiize);
    $toggle.off('click', handleToggle);
  }


  var menu = {
    reset: function(name) {
      $body.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', deleteProp);
      deactivate();
      // $body.unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', deleteProp);
    },
    deactivate: function() {deactivate()},
    activate: function() {activate()}
  };

  return menu;
}

var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
  e.preventDefault();
  e.returnValue = false;
}

function keydown(e) {
  for (var i = keys.length; i--;) {
    if (e.keyCode === keys[i]) {
      preventDefault(e);
      return;
    }
  }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

}(jQuery));
