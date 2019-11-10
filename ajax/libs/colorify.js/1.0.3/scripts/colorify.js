(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.colorify = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.colorify = factory();
  }
})(this, function () {
  // UMD Definition above, do not remove this line

  // To get to know more about the Universal Module Definition
  // visit: https://github.com/umdjs/umd

  'use strict';

  var colorify = function(args){

    // Define parameters
    var _ID = args.id || 1,
    _CONTAINER = args.container || 'colorify',
    _IMAGES = args.images || false,
    _ACCURACY = args.accuracy || 100,

    _LAZYREVEAL = args.lazyReveal || false,

    _GRADIENT = args.gradient || false,
    _GRADIENT_DIR = args.gradientDirection || 'to bottom right',

    _PADDING = args.padding || 4,
    _GIVE = args.give || false,

    _REVEAL_ON = args.revealOn || false;

    if(!_LAZYREVEAL==false) {
      var _TRANSITION = args.lazyReveal.transition || 0,
          _DELAY = args.lazyReveal.delay || 0,
          _STEPPED = args.lazyReveal.steps || false;
    }

    if(!_REVEAL_ON==false) {
      var _REVEAL_ON_EVENT = args.revealOn.event || false,
          _REVEAL_ON_TRIGGER   = args.revealOn.trigger || false;
    }
    if (!_GIVE==false) {
      var _PROPERTY   = args.give.property || false,
          _TARGET = args.give.target || false;
    }
    var scenes = document.querySelectorAll('['+ _CONTAINER +']');
     for(var i = 0, len = scenes.length; i < len; i++) {
        var _ATTR = args.attr || _CONTAINER+'-'+i
     }

    // If images are added dynamically
    if(!_IMAGES == false ){

      for(var i = 0, len = _IMAGES.length; i < len; i++) {
        var imgSrc = [_IMAGES[i]];

        for(var i = 0; i < len; i++) {
          var im = document.createElement('img');
          im.setAttribute(_ATTR ,'');
          im.crossOrigin = "Anonymous";
          im.src = _IMAGES[i];

          var imContain = document.createElement('div');
          imContain.classList.add('image-container');
          imContain.setAttribute('style','padding: '+ _PADDING +'px;');

          if(!_REVEAL_ON==false) {
            imContain.style.opacity='0';
            imContain.classList.add('to-reveal');
          }

          imContain.appendChild(im)
          document.querySelector('['+ _CONTAINER +']').appendChild(imContain)
        }
      }
    }


    var preIm = document.querySelectorAll('['+ _CONTAINER +'] img');

    for(var i = 0, len = preIm.length; i < len; i++) {
      preIm[i].setAttribute(_ATTR,'');
      preIm[i].classList.add('colorify');
    }

    var cf_item = document.querySelectorAll('['+ _ATTR +']'),
    cf_item_length = cf_item.length,
    cf_item_loaded = 0;

    for(var i = 0, len = cf_item.length; i < len; i++) {

      cf_item[i].setAttribute(_ATTR ,'');
      cf_item.crossOrigin = "Anonymous";
      cf_item.src = cf_item[i];

      var imContain = document.createElement('div');
      imContain.classList.add('image-container');
      imContain.setAttribute('style','padding: '+ _PADDING +'px;');

      if(!_REVEAL_ON==false) {
        imContain.style.opacity='0';
        imContain.classList.add('to-reveal');
      }

      imContain.appendChild(cf_item[i])

      var imgBlock = document.querySelector('['+ _CONTAINER +']');

      imgBlock.appendChild(imContain)
    }


    // If need to reveal
    if(!_REVEAL_ON==false) {
      var toReveal = document.querySelectorAll('.to-reveal');
      document.querySelector(_REVEAL_ON_TRIGGER).addEventListener(_REVEAL_ON_EVENT, function(){
       for (var i=0, len = toReveal.length; i<len;i++) {
        toReveal[i].style.opacity ='1';
      }
    })

    }


    // Get colors
    setTimeout(function(){

      for(i=0; i < cf_item_length; i++) {
        cf_item_loaded++;
        cf_item[i].onload = isLoaded(cf_item[i], cf_item_loaded)
      }



      function isLoaded(el, pos){
        var rgb = getAverageRGB(el);

        if(_GRADIENT) {

          var gradient = 'rgb('+rgb[0].r+','+rgb[0].g+','+rgb[0].b+'), rgb('+rgb[1].r+','+rgb[1].g+','+rgb[1].b+')';
          el.parentNode.style.backgroundImage = 'linear-gradient('+_GRADIENT_DIR+','+gradient+') ';
        }
        else{
          el.parentNode.style.backgroundColor = 'rgb('+rgb[0].r+','+rgb[0].g+','+rgb[0].b+')';
        }


        if(!_GIVE==false) {
          var tar = _TARGET.substring(0, 1);
          if (tar == '#' || tar == "." || tar == '*' || tar == "["){
            var to = document.querySelectorAll(_TARGET);
            for(var i = 0, len = to.length; i < len; i++) {
             to[i].setAttribute('style', _PROPERTY + ': rgb('+rgb[0].r+','+rgb[0].g+','+rgb[0].b+')');
            }
          }
          if(_TARGET=='parent') {
            el.parentNode.parentNode.setAttribute('style', _PROPERTY + ': rgb('+rgb[0].r+','+rgb[0].g+','+rgb[0].b+') !important');
          }
          if(_TARGET=='child') {
           el.childNode.setAttribute('style', _PROPERTY + ': rgb('+rgb[0].r+','+rgb[0].g+','+rgb[0].b+') !important');
          }
        }

       if(!_TRANSITION==false && !_DELAY==false || !_TRANSITION==false || !_DELAY==false ) {
          if(_STEPPED==true){
            el.setAttribute('style', 'transition: all '+_TRANSITION+'s ease '+ _DELAY * pos +'s;');
          } else {
            el.setAttribute('style', 'transition: all '+_TRANSITION+'s ease '+ _DELAY +'s;');
          }
       }

       el.classList.add('visible','all-not-loaded');

       if(cf_item_loaded >= cf_item_length) {
        el.classList.remove('all-not-loaded');
        el.classList.add('all-loaded');
      }
    }

    function getAverageRGBFromZone(zone, opts) {
      var rgb = {r:0,g:0,b:0},
      len = zone.data.length,
      count = 0,
      i = -4;

      opts = opts || {};

      opts.accuracy = opts.accuracy || 1;

      var blockSize = opts.accuracy;

      while ((i += blockSize * 4) < len ) {
        ++count;
        rgb.r += zone.data[i];
        rgb.g += zone.data[i+1];
        rgb.b += zone.data[i+2];
      }

      rgb.r = ~~(rgb.r/count);
      rgb.g = ~~(rgb.g/count);
      rgb.b = ~~(rgb.b/count);

      return rgb;
    }

    function getAverageRGB(imgEl) {

      var blockSize = _ACCURACY,
      defaultRGB = {r:0,g:0,b:0},
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      length,
      rgb = {r:0,g:0,b:0},
      rgb_start = rgb,
      rgb_end = {r:0,g:0,b:0},
      count = 0;

      if (!context) {
        return defaultRGB;
      }

      height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
      width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

      context.drawImage(imgEl, 0, 0);

      if (_GRADIENT) {
        try {
            var rgbStart = getAverageRGBFromZone(context.getImageData(0, 0, width / 4, height / 4), {accuracy: _ACCURACY});
            var rgbEnd = getAverageRGBFromZone(context.getImageData(width - width / 4, height - height / 4, width / 4, height / 4), {accuracy: _ACCURACY});
          } catch(e) {
            console.log('image cannot be processed', e);
            rgbStart = defaultRGB;
            rgbEnd = defaultRGB;
          }
          return [rgbStart, rgbEnd];
        }
        else {
          try {
            rgb = getAverageRGBFromZone(context.getImageData(0, 0, width, height), {accuracy: _ACCURACY});
          } catch(e) {
            console.log('image cannot be processed', e);
            rgb = defaultRGB;
          }

          return [rgb];
        }
      }
    });

  }

  return colorify;

});
