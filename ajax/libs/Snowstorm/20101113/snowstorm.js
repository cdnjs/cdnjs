/** @license
 * DHTML Snowstorm! JavaScript-based Snow for web pages
 * --------------------------------------------------------
 * Version 1.41.20101113 (Previous rev: 1.4.20091115)
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/snowstorm/license.txt
 */

/*global window, document, navigator, clearInterval, setInterval */
/*jslint white: false, onevar: true, plusplus: false, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */

var snowStorm = (function(window, document) {

  // --- common properties ---

  this.flakesMax = 128;           // Limit total amount of snow made (falling + sticking)
  this.flakesMaxActive = 64;      // Limit amount of snow falling at once (less = lower CPU use)
  this.animationInterval = 33;    // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
  this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
  this.flakeBottom = null;        // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
  this.followMouse = true;        // Snow movement can respond to the user's mouse
  this.snowColor = '#fff';        // Don't eat (or use?) yellow snow.
  this.snowCharacter = '&bull;';  // &bull; = bullet, &middot; is square on some systems etc.
  this.snowStick = true;          // Whether or not snow should "stick" at the bottom. When off, will never collect.
  this.targetElement = null;      // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
  this.useMeltEffect = true;      // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
  this.useTwinkleEffect = false;  // Allow snow to randomly "flicker" in and out of view while falling
  this.usePositionFixed = false;  // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported

  // --- less-used bits ---

  this.freezeOnBlur = true;       // Only snow when the window is in focus (foreground.) Saves CPU.
  this.flakeLeftOffset = 0;       // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
  this.flakeRightOffset = 0;      // Right margin/gutter space on edge of container
  this.flakeWidth = 8;            // Max pixel width reserved for snow element
  this.flakeHeight = 8;           // Max pixel height reserved for snow element
  this.vMaxX = 5;                 // Maximum X velocity range for snow
  this.vMaxY = 4;                 // Maximum Y velocity range for snow
  this.zIndex = 0;                // CSS stacking order applied to each snowflake

  // --- End of user section ---

  var s = this, storm = this, i,
  // UA sniffing and backCompat rendering mode checks for fixed position, etc.
  isIE = navigator.userAgent.match(/msie/i),
  isIE6 = navigator.userAgent.match(/msie 6/i),
  isOldIE = (isIE && (isIE6 || navigator.userAgent.match(/msie 5/i))),
  isWin98 = navigator.appVersion.match(/windows 98/i),
  isMobile = navigator.userAgent.match(/mobile/i),
  isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
  noFixed = (isMobile || isBackCompatIE || isIE6),
  screenX = null, screenX2 = null, screenY = null, scrollY = null, vRndX = null, vRndY = null,
  windOffset = 1,
  windMultiplier = 2,
  flakeTypes = 6,
  fixedForEverything = false,
  opacitySupported = (function(){
    try {
      document.createElement('div').style.opacity = '0.5';
    } catch(e) {
      return false;
    }
    return true;
  }()),
  didInit = false,
  docFrag = document.createDocumentFragment();

  this.timers = [];
  this.flakes = [];
  this.disabled = false;
  this.active = false;
  this.meltFrameCount = 20;
  this.meltFrames = [];

  this.events = (function() {

    var old = (window.attachEvent), slice = Array.prototype.slice,
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefix
        if (len > 3) {
          args.pop(); // no capture
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }

    function apply(args, sType) {
      var oFunc = args.shift()[evt[sType]];
      if (old) {
        oFunc(args[0], args[1]);
      } else {
        oFunc.apply(this, args);
      }
    }

    function addEvent() {
      apply(getArgs(arguments), 'add');
    }

    function removeEvent() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      add: addEvent,
      remove: removeEvent
    };

  }());

  function rnd(n,min) {
    if (isNaN(min)) {
      min = 0;
    }
    return (Math.random()*n)+min;
  }

  function plusMinus(n) {
    return (parseInt(rnd(2),10)===1?n*-1:n);
  }

  this.randomizeWind = function() {
    vRndX = plusMinus(rnd(s.vMaxX,0.2));
    vRndY = rnd(s.vMaxY,0.2);
    if (this.flakes) {
      for (var i=0; i<this.flakes.length; i++) {
        if (this.flakes[i].active) {
          this.flakes[i].setVelocities();
        }
      }
    }
  };

  this.scrollHandler = function() {
    // "attach" snowflakes to bottom of window if no absolute bottom value was given
    scrollY = (s.flakeBottom?0:parseInt(window.scrollY||document.documentElement.scrollTop||document.body.scrollTop,10));
    if (isNaN(scrollY)) {
      scrollY = 0; // Netscape 6 scroll fix
    }
    if (!fixedForEverything && !s.flakeBottom && s.flakes) {
      for (var i=s.flakes.length; i--;) {
        if (s.flakes[i].active === 0) {
          s.flakes[i].stick();
        }
      }
    }
  };

  this.resizeHandler = function() {
    if (window.innerWidth || window.innerHeight) {
      screenX = window.innerWidth-(!isIE?16:2)-s.flakeRightOffset;
      screenY = (s.flakeBottom?s.flakeBottom:window.innerHeight);
    } else {
      screenX = (document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth)-(!isIE?8:0)-s.flakeRightOffset;
      screenY = s.flakeBottom?s.flakeBottom:(document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight);
    }
    screenX2 = parseInt(screenX/2,10);
  };

  this.resizeHandlerAlt = function() {
    screenX = s.targetElement.offsetLeft+s.targetElement.offsetWidth-s.flakeRightOffset;
    screenY = s.flakeBottom?s.flakeBottom:s.targetElement.offsetTop+s.targetElement.offsetHeight;
    screenX2 = parseInt(screenX/2,10);
  };

  this.freeze = function() {
    // pause animation
    if (!s.disabled) {
      s.disabled = 1;
    } else {
      return false;
    }
    for (var i=s.timers.length; i--;) {
      clearInterval(s.timers[i]);
    }
  };

  this.resume = function() {
    if (s.disabled) {
       s.disabled = 0;
    } else {
      return false;
    }
    s.timerInit();
  };

  this.toggleSnow = function() {
    if (!s.flakes.length) {
      // first run
      s.start();
    } else {
      s.active = !s.active;
      if (s.active) {
        s.show();
        s.resume();
      } else {
        s.stop();
        s.freeze();
      }
    }
  };

  this.stop = function() {
    this.freeze();
    for (var i=this.flakes.length; i--;) {
      this.flakes[i].o.style.display = 'none';
    }
    s.events.remove(window,'scroll',s.scrollHandler);
    s.events.remove(window,'resize',s.resizeHandler);
    if (s.freezeOnBlur && !isOldIE) {
      s.events.remove(window,'blur',s.freeze);
      s.events.remove(window,'focus',s.resume);
    }
  };

  this.show = function() {
    for (var i=this.flakes.length; i--;) {
      this.flakes[i].o.style.display = 'block';
    }
  };

  this.SnowFlake = function(parent,type,x,y) {
    var s = this, storm = parent;
    this.type = type;
    this.x = x||parseInt(rnd(screenX-20),10);
    this.y = (!isNaN(y)?y:-rnd(screenY)-12);
    this.vX = null;
    this.vY = null;
    this.vAmpTypes = [1,1.2,1.4,1.6,1.8]; // "amplification" for vX/vY (based on flake size/type)
    this.vAmp = this.vAmpTypes[this.type];
    this.melting = false;
    this.meltFrameCount = storm.meltFrameCount;
    this.meltFrames = storm.meltFrames;
    this.meltFrame = 0;
    this.twinkleFrame = 0;
    this.active = 1;
    this.fontSize = (10+(this.type/5)*10);
    this.o = document.createElement('div');
    this.o.innerHTML = storm.snowCharacter;
    this.o.style.color = storm.snowColor;
    this.o.style.position = (fixedForEverything?'fixed':'absolute');
    this.o.style.width = storm.flakeWidth+'px';
    this.o.style.height = storm.flakeHeight+'px';
    this.o.style.fontFamily = 'arial,verdana';
    this.o.style.overflow = 'hidden';
    this.o.style.fontWeight = 'normal';
    this.o.style.zIndex = storm.zIndex;
    docFrag.appendChild(this.o);

    this.refresh = function() {
      if (isNaN(s.x) || isNaN(s.y)) {
        // safety check
        return false;
      }
      s.o.style.left = s.x+'px';
      s.o.style.top = s.y+'px';
    };

    this.stick = function() {
      if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
        s.o.style.top = (screenY+scrollY-storm.flakeHeight)+'px';
      } else if (storm.flakeBottom) {
        s.o.style.top = storm.flakeBottom+'px';
      } else {
        s.o.style.display = 'none';
        s.o.style.top = 'auto';
        s.o.style.bottom = '0px';
        s.o.style.position = 'fixed';
        s.o.style.display = 'block';
      }
    };

    this.vCheck = function() {
      if (s.vX>=0 && s.vX<0.2) {
        s.vX = 0.2;
      } else if (s.vX<0 && s.vX>-0.2) {
        s.vX = -0.2;
      }
      if (s.vY>=0 && s.vY<0.2) {
        s.vY = 0.2;
      }
    };

    this.move = function() {
      var vX = s.vX*windOffset, yDiff;
      s.x += vX;
      s.y += (s.vY*s.vAmp);
      if (s.x >= screenX || screenX-s.x < storm.flakeWidth) { // X-axis scroll check
        s.x = 0;
      } else if (vX < 0 && s.x-storm.flakeLeftOffset < 0-storm.flakeWidth) {
        s.x = screenX-storm.flakeWidth-1; // flakeWidth;
      }
      s.refresh();
      yDiff = screenY+scrollY-s.y;
      if (yDiff<storm.flakeHeight) {
        s.active = 0;
        if (storm.snowStick) {
          s.stick();
        } else {
          s.recycle();
        }
      } else {
        if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random()>0.998) {
          // ~1/1000 chance of melting mid-air, with each frame
          s.melting = true;
          s.melt();
          // only incrementally melt one frame
          // s.melting = false;
        }
        if (storm.useTwinkleEffect) {
          if (!s.twinkleFrame) {
            if (Math.random()>0.9) {
              s.twinkleFrame = parseInt(Math.random()*20,10);
            }
          } else {
            s.twinkleFrame--;
            s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame%2===0?'hidden':'visible');
          }
        }
      }
    };

    this.animate = function() {
      // main animation loop
      // move, check status, die etc.
      s.move();
    };

    this.setVelocities = function() {
      s.vX = vRndX+rnd(storm.vMaxX*0.12,0.1);
      s.vY = vRndY+rnd(storm.vMaxY*0.12,0.1);
    };

    this.setOpacity = function(o,opacity) {
      if (!opacitySupported) {
        return false;
      }
      o.style.opacity = opacity;
    };

    this.melt = function() {
      if (!storm.useMeltEffect || !s.melting) {
        s.recycle();
      } else {
        if (s.meltFrame < s.meltFrameCount) {
          s.meltFrame++;
          s.setOpacity(s.o,s.meltFrames[s.meltFrame]);
          s.o.style.fontSize = s.fontSize-(s.fontSize*(s.meltFrame/s.meltFrameCount))+'px';
          s.o.style.lineHeight = storm.flakeHeight+2+(storm.flakeHeight*0.75*(s.meltFrame/s.meltFrameCount))+'px';
        } else {
          s.recycle();
        }
      }
    };

    this.recycle = function() {
      s.o.style.display = 'none';
      s.o.style.position = (fixedForEverything?'fixed':'absolute');
      s.o.style.bottom = 'auto';
      s.setVelocities();
      s.vCheck();
      s.meltFrame = 0;
      s.melting = false;
      s.setOpacity(s.o,1);
      s.o.style.padding = '0px';
      s.o.style.margin = '0px';
      s.o.style.fontSize = s.fontSize+'px';
      s.o.style.lineHeight = (storm.flakeHeight+2)+'px';
      s.o.style.textAlign = 'center';
      s.o.style.verticalAlign = 'baseline';
      s.x = parseInt(rnd(screenX-storm.flakeWidth-20),10);
      s.y = parseInt(rnd(screenY)*-1,10)-storm.flakeHeight;
      s.refresh();
      s.o.style.display = 'block';
      s.active = 1;
    };

    this.recycle(); // set up x/y coords etc.
    this.refresh();

  };

  this.snow = function() {
    var active = 0, used = 0, waiting = 0, flake = null, i;
    for (i=s.flakes.length; i--;) {
      if (s.flakes[i].active === 1) {
        s.flakes[i].move();
        active++;
      } else if (s.flakes[i].active === 0) {
        used++;
      } else {
        waiting++;
      }
      if (s.flakes[i].melting) {
        s.flakes[i].melt();
      }
    }
    if (active<s.flakesMaxActive) {
      flake = s.flakes[parseInt(rnd(s.flakes.length),10)];
      if (flake.active === 0) {
        flake.melting = true;
      }
    }
  };

  this.mouseMove = function(e) {
    if (!s.followMouse) {
      return true;
    }
    var x = parseInt(e.clientX,10);
    if (x<screenX2) {
      windOffset = -windMultiplier+(x/screenX2*windMultiplier);
    } else {
      x -= screenX2;
      windOffset = (x/screenX2)*windMultiplier;
    }
  };

  this.createSnow = function(limit,allowInactive) {
    for (var i=0; i<limit; i++) {
      s.flakes[s.flakes.length] = new s.SnowFlake(s,parseInt(rnd(flakeTypes),10));
      if (allowInactive || i>s.flakesMaxActive) {
        s.flakes[s.flakes.length-1].active = -1;
      }
    }
    storm.targetElement.appendChild(docFrag);
  };

  this.timerInit = function() {
    s.timers = (!isWin98?[setInterval(s.snow,s.animationInterval)]:[setInterval(s.snow,s.animationInterval*3),setInterval(s.snow,s.animationInterval)]);
  };

  this.init = function() {
    for (var i=0; i<s.meltFrameCount; i++) {
      s.meltFrames.push(1-(i/s.meltFrameCount));
    }
    s.randomizeWind();
    s.createSnow(s.flakesMax); // create initial batch
    s.events.add(window,'resize',s.resizeHandler);
    s.events.add(window,'scroll',s.scrollHandler);
    if (s.freezeOnBlur && !isOldIE) {
      s.events.add(window,'blur',s.freeze);
      s.events.add(window,'focus',s.resume);
    }
    s.resizeHandler();
    s.scrollHandler();
    if (s.followMouse) {
      s.events.add(isIE?document:window,'mousemove',s.mouseMove);
    }
    s.animationInterval = Math.max(20,s.animationInterval);
    s.timerInit();
  };

  this.start = function(bFromOnLoad) {
    if (!didInit) {
      didInit = true;
    } else if (bFromOnLoad) {
      // already loaded and running
      return true;
    }
    if (typeof s.targetElement === 'string') {
      var targetID = s.targetElement;
      s.targetElement = document.getElementById(targetID);
      if (!s.targetElement) {
        throw new Error('Snowstorm: Unable to get targetElement "'+targetID+'"');
      }
    }
    if (!s.targetElement) {
      s.targetElement = (!isIE?(document.documentElement?document.documentElement:document.body):document.body);
    }
    if (s.targetElement !== document.documentElement && s.targetElement !== document.body) {
      s.resizeHandler = s.resizeHandlerAlt; // re-map handler to get element instead of screen dimensions
    }
    s.resizeHandler(); // get bounding box elements
    s.usePositionFixed = (s.usePositionFixed && !noFixed); // whether or not position:fixed is supported
    fixedForEverything = s.usePositionFixed;
    if (screenX && screenY && !s.disabled) {
      s.init();
      s.active = true;
    }
  };

  function doStart() {
    if ((this.excludeMobile && !isMobile) || !this.excludeMobile) {
      window.setTimeout(function() {
        s.start(true);
      }, 20);
    }
    // event cleanup
    s.events.remove(window, 'load', doStart);
  }

  // hooks for starting the snow
  s.events.add(window, 'load', doStart, false);

  return this;

}(window, document));