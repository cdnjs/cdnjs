/**
  * tiny-slider
  * @version 0.6.5
  * @author William Lin
  * @license The MIT License (MIT)
  * @github https://github.com/ganlanyuan/tiny-slider/
  */

var tinySlider = (function () {
  'use strict';

  // get supported property, KEYs
  var TRANSITIONDURATION = gn.getSupportedProp([
        'transitionDuration', 
        'WebkitTransitionDuration', 
        'MozTransitionDuration', 
        'OTransitionDuration'
      ]),
      TRANSFORM = gn.getSupportedProp([
        'transform', 
        'WebkitTransform', 
        'MozTransform', 
        'OTransform'
      ]),
      TRANSITIONEND = whichTransitionEvent(),
      KEY = {
        ENTER: 13,
        SPACE: 32,
        PAGEUP: 33,
        PAGEDOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };

  function core (options) {
    options = gn.extend({
      container: document.querySelector('.slider'),
      mode: 'carousel',
      direction: 'horizontal',
      items: 1,
      gutter: 0,
      gutterPosition: 'right',
      edgePadding: 0,
      fixedWidth: false,
      slideByPage: false,
      slideBy: 1,
      controls: true,
      controlsText: ['prev', 'next'],
      controlsContainer: false,
      nav: true,
      navContainer: false,
      arrowKeys: false,
      speed: 250,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayDirection: 'forward',
      autoplayText: ['start', 'stop'],
      loop: true,
      autoHeight: false,
      responsive: false,
      lazyload: false,
      touch: true,
      rewind: false
    }, options || {});

    // make sure slide container exists
    if (typeof options.container !== 'object' || options.container === null) {
      return {
        init: function () {},
        destory: function () {}
      }; 
    }

    // === define and set variables ===
    var mode = options.mode,
        direction = options.direction,
        items = options.items,
        slideContainer = options.container,
        slideWrapper = document.createElement('div'),
        slideItems = slideContainer.children,
        slideCount = slideItems.length,
        gutter = options.gutter,
        gutterPosition = (options.gutterPosition === 'right') ? 'margin-right' : 'margin-left',
        gapAdjust = (options.gutterPosition === 'left') ? gutter : 0,
        edgePadding = options.edgePadding,
        indexAdjust = (edgePadding) ? 1 : 0,
        fixedWidth = options.fixedWidth,
        controls = options.controls,
        controlsText = options.controlsText,
        controlsContainer = (!options.controlsContainer) ? false : options.controlsContainer,
        nav = options.nav,
        navContainer = (!options.navContainer) ? false : options.navContainer,
        arrowKeys = options.arrowKeys,
        speed = (!TRANSITIONDURATION) ? 0 : options.speed,
        autoplay = options.autoplay,
        autoplayTimeout = options.autoplayTimeout,
        autoplayDirection = (options.autoplayDirection === 'forward') ? 1 : -1,
        autoplayText = options.autoplayText,
        rewind = options.rewind,
        loop = (options.rewind) ? false : options.loop,
        autoHeight = options.autoHeight,
        responsive = (fixedWidth) ? false : options.responsive,
        slideByPage = options.slideByPage,
        slideBy = (slideByPage || options.slideBy === 'page') ? items : options.slideBy,
        lazyload = options.lazyload,
        touch = options.touch,

        slideId,
        slideWidth,
        cloneCount = (loop) ? Math.ceil(slideCount*1.5) : (edgePadding) ? 1 : 0,
        slideCountNew = slideCount + cloneCount * 2,
        prevButton,
        nextButton,
        allNavs,
        navCountVisible,
        navCountVisibleCached = slideCount,
        navClicked = -1,
        navCurrent = 0,
        navCurrentCached = 0,
        index = cloneCount,
        indexCached = index,
        indexMax,
        resizeTimer,
        vw,
        ticking = false;

    if (autoplay) {
      var autoplayTimer,
          autoplayButton,
          animating = false;
    }

    if (touch) {
      var startX = 0,
          startY = 0,
          translateXInit,
          distX,
          distY,
          touchStarted;
    }

    // get items, slideWidth, navCountVisible
    var getItems = (function () {
      if (!fixedWidth) {
        return function () {
          var itemsTem = options.items,
              ww = document.documentElement.clientWidth,
              bpKeys = (typeof responsive === 'object') ? Object.keys(responsive) : false;

          if (bpKeys) {
            for (var i = 0; i < bpKeys.length; i++) {
              if (ww >= bpKeys[i]) { itemsTem = responsive[bpKeys[i]]; }
            }
          }
          return Math.max(1, Math.min(slideCount, itemsTem));
        };

      } else {
        return function () { return Math.max(1, Math.min(slideCount, Math.floor(vw / fixedWidth))); };
      }
    })();

    var getSlideWidth = (function () {
      if (fixedWidth) {
        return function () { return fixedWidth + gutter; };
      } else if (navigator.appVersion.indexOf("MSIE 8") > 0) {
        if (edgePadding) {
          return function () { return Math.round((vw - gutter - edgePadding * 2) / items); };
        } else {
          return function () { return Math.round((vw + gutter) / items); };
        }
      } else {
        if (edgePadding) {
          return function () { return (vw - gutter - edgePadding * 2) / items; };
        } else {
          return function () { return (vw + gutter) / items; };
        }
      }
    })();

    var getVisibleNavCount = (function () {
      if (options.navContainer) {
        return function () { return slideCount; };
      } else {
        return function () { return Math.ceil(slideCount / items); };
      }
    })();

    function wrapContainer() {
      slideWrapper.className = 'tiny-slider';
      gn.wrap(slideContainer, slideWrapper);
      vw = slideWrapper.clientWidth;
    }

    function getVariables() {
      items = getItems();
      indexMax = slideCountNew - items - indexAdjust;
      slideWidth = getSlideWidth();
      navCountVisible = getVisibleNavCount();
      slideBy = (slideByPage || options.slideBy === 'page') ? items : options.slideBy;
    }

    function containerInit() {
      var gap = - gapAdjust;
      if (edgePadding) {
        if (fixedWidth) {
          gap = getFixedWidthEdgePadding();
        } else {
          gap += edgePadding + gutter;
        }
      }
      slideContainer.classList.add('tiny-content', mode, direction);
      var size = 'width: ' + (slideWidth + 1) * slideCountNew + 'px; ',
          x = (-index * slideWidth),
          transforms = (TRANSFORM) ? TRANSFORM + ': translate3d(' + x + 'px, 0px, 0px)' : 'left: ' + x + 'px';
      slideContainer.style.cssText += size + transforms;
    }

    // for IE10
    function msInit() {
      if (navigator.msMaxTouchPoints) {
        slideWrapper.classList.add('ms-touch');
        slideWrapper.addEventListener('scroll', ie10Scroll, false);
      }
    }

    // add ids
    function addIds() {
      if (slideContainer.id === '') {
        slideContainer.id = slideId = _getSlideId();
      } else {
        slideId = slideContainer.id;
      }
      for (var x = 0; x < slideCount; x++) {
        slideItems[x].id = slideId + 'item' + x;
      }
    }

    function slideItemsInit() {
      // clone slides
      if (loop || edgePadding) {
        var fragmentBefore = document.createDocumentFragment(), 
            fragmentAfter = document.createDocumentFragment();

        for (var j = cloneCount; j--;) {
          var num = j%slideCount,
              cloneFirst = slideItems[num].cloneNode(true),
              cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);

          // remove id from cloned slides
          _removeAttrs(cloneFirst, 'id');
          _removeAttrs(cloneLast, 'id');

          fragmentBefore.insertBefore(cloneFirst, fragmentBefore.firstChild);
          fragmentAfter.appendChild(cloneLast);
        }

        slideContainer.appendChild(fragmentBefore);
        slideContainer.insertBefore(fragmentAfter, slideContainer.firstChild);

        slideItems = slideContainer.children;
      }
      _setAttrs(slideItems, {
        'style': 'width: ' + (slideWidth - gutter) + 'px; ' + gutterPosition + ': ' + gutter + 'px',
        'aria-hidden': 'true'
      });
    }

    function controlsInit() {
      if (controls) {
        if (!options.controlsContainer) {
          gn.append(slideWrapper, '<div class="tiny-controls" aria-label="Carousel Navigation"><button data-controls="prev" tabindex="-1" aria-controls="' + slideId +'" type="button">' + controlsText[0] + '</button><button data-controls="next" tabindex="0" aria-controls="' + slideId +'" type="button">' + controlsText[1] + '</button></div>');

          controlsContainer = slideWrapper.querySelector('.tiny-controls');
        }

        prevButton = controlsContainer.querySelector('[data-controls="prev"]');
        nextButton = controlsContainer.querySelector('[data-controls="next"]');

        if (!_hasAttr(controlsContainer, 'tabindex')) {
          _setAttrs(controlsContainer, {'aria-label': 'Carousel Navigation'});
          _setAttrs(controlsContainer.children, {
            'aria-controls': slideId,
            'tabindex': '-1',
          });
        }
      }
    }

    function navInit() {
      if (nav) {
        if (!options.navContainer) {
          var navHtml = '';
          for (var i = 0; i < slideCount; i++) {
            navHtml += '<button data-slide="' + i +'" tabindex="-1" aria-selected="false" aria-controls="' + slideId + 'item' + i +'" type="button"></button>';
          }
          if (autoplay) {
            navHtml += '<button data-action="stop" type="button"><span hidden>Stop Animation</span>' + autoplayText[0] + '</button>';
          }
          navHtml = '<div class="tiny-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
          gn.append(slideWrapper, navHtml);
          navContainer = slideWrapper.querySelector('.tiny-nav');
        }
        allNavs = navContainer.querySelectorAll('[data-slide]');

        // for customized nav container
        if (!_hasAttr(navContainer, 'aria-label')) {
          _setAttrs(navContainer, {'aria-label': 'Carousel Pagination'});
          for (var y = 0; y < slideCount; y++) {
            _setAttrs(allNavs[y], {
              'tabindex': '-1',
              'aria-selected': 'false',
              'aria-controls': slideId + 'item' + y,
            });
          }
        }

        for (var j = navCountVisible; j < slideCount; j++) {
          _setAttrs(allNavs[j], {'hidden': ''});
        }
        navCountVisibleCached = navCountVisible;
      }
    }

    function autoplayInit() {
      if (autoplay) {
        if (!navContainer) {
          gn.append(slideWrapper, '<div class="tiny-nav" aria-label="Carousel Pagination"><button data-action="stop" type="button"><span hidden>Stop Animation</span>' + autoplayText[0] + '</button></div>');
          navContainer = slideWrapper.querySelector('.tiny-nav');
        }
        autoplayButton = navContainer.querySelector('[data-action]');
        startAction();
      }
    }

    function activateSlider() {
      for (var i = index; i < index + items; i++) {
        _setAttrs(slideItems[i], {'aria-hidden': 'false'});
      }
      if (controls) {
        _setAttrs(nextButton, {'tabindex': '0'});
        if (index === indexAdjust && !loop || rewind) {
          prevButton.disabled = true;
        }
      }
      if (nav) {
        _setAttrs(allNavs[0], {'tabindex': '0', 'aria-selected': 'true'});
      }
    }

    function addSliderEvents() {
      if (TRANSITIONEND) {
        slideContainer.addEventListener(TRANSITIONEND, onTransitionEnd, false);
      }
      if (touch) {
        slideContainer.addEventListener('touchstart', onPanStart, false);
        slideContainer.addEventListener('touchmove', onPanMove, false);
        slideContainer.addEventListener('touchend', onPanEnd, false);
        slideContainer.addEventListener('touchcancel', onPanEnd, false);
      }
      if (nav) {
        for (var y = 0; y < slideCount; y++) {
          allNavs[y].addEventListener('click', onClickNav, false);
          allNavs[y].addEventListener('keydown', onKeyNav, false);
        }
      }
      if (controls) {
        prevButton.addEventListener('click', onClickControlPrev, false);
        nextButton.addEventListener('click', onClickControlNext, false);
        prevButton.addEventListener('keydown', onKeyControl, false);
        nextButton.addEventListener('keydown', onKeyControl, false);
      }
      if (autoplay) {
        autoplayButton.addEventListener('click', toggleAnimation, false);

        if (controls) {
          prevButton.addEventListener('click', stopAnimation, false );
          nextButton.addEventListener('click', stopAnimation, false );
        }

        if (nav) {
          for (var b = 0; b < slideCount; b++) {
            allNavs[b].addEventListener('click', stopAnimation, false);
          }
        }
      }
      if (arrowKeys) {
        document.addEventListener('keydown', onKeyDocument, false);
      }
      window.addEventListener('resize', onResize, false);
      window.addEventListener('scroll', onScroll, false);
    }

    // lazyload
    function lazyLoad() {
      if (!lazyload || !gn.isInViewport(slideContainer)) { return; }

      var arr = [];
      for(var i = index - 1; i < index + items + 1; i++) {
        var imgsTem = slideItems[i].querySelectorAll('.tiny-lazy');
        for(var j = imgsTem.length; j--; arr.unshift(imgsTem[j]));
        arr.unshift();
      }

      for (var h = arr.length; h--;) {
        var img = arr[h];
        if (!img.classList.contains('loaded')) {
          img.src = _getAttr(img, 'data-src');
          img.classList.add('loaded');
        }
      }
    }

    // check if all visible images are loaded
    // and update container height if it's done
    function runAutoHeight() {
      if (autoHeight) {
        // get all images inside visible slide items
        var images = [];

        for (var i = index -1; i < index + items; i++) {
          var imagesTem = slideItems[i].querySelectorAll('img');
          for (var j = imagesTem.length; j--;) {
            images.push(imagesTem[j]);
          }
        }

        if (images.length === 0) {
          updateContainerHeight(); 
        } else {
          checkImagesLoaded(images);
        }
      }
    }

    function checkImagesLoaded(images) {
      for (var i = images.length; i--;) {
        if (imageLoaded(images[i])) {
          images.splice(i, 1);
        }
      }

      if (images.length === 0) {
        updateContainerHeight();
      } else {
        setTimeout(function () { 
          checkImagesLoaded(images); 
        }, 16);
      }
    } 

    function sliderInit() {
      wrapContainer();
      getVariables();

      containerInit();
      msInit();
      addIds();
      slideItemsInit();
      controlsInit();
      navInit();
      autoplayInit();
      activateSlider();
      addSliderEvents();
      checkSlideCount();

      lazyLoad();
      runAutoHeight();
    }

    function checkSlideCount() {
      if (slideCount <= items) { 
        nav = controls = autoplay = loop = rewind = false; 
        index = cloneCount;

        if (navContainer) { _hideElement(navContainer); }
        if (controlsContainer) { _hideElement(controlsContainer); }
        if (autoplayButton) { _hideElement(autoplayButton); }
      } else {
        nav = options.nav;
        controls = options.controls;
        autoplay = options.autoplay;
        loop = (options.rewind) ? false : options.loop;
        rewind = options.rewind;

        if (nav) { _showElement(navContainer); }
        if (controls) { _showElement(controlsContainer); }
        if (autoplay) { _showElement(autoplayButton); }
      }
    }

    function getFixedWidthEdgePadding() {
      return ((vw - slideWidth * Math.floor(vw / slideWidth) + gutter) / 2);
    }

    var updateLayout = (function () {
      if (!fixedWidth) {
        return function () {
          // + 1: fixed half-pixel issue
          slideContainer.style.width = (slideWidth + 1) * slideCountNew + 'px'; 
          for (var i = slideCountNew; i--;) {
            slideItems[i].style.width = slideWidth - gutter + 'px';
          }
        };
      } else if (edgePadding) {
        return function () {
          slideContainer.style.marginLeft = getFixedWidthEdgePadding() + 'px';
        };
      }
    })();

    // update container height
    // 1. get the max-height of the visible slides
    // 2. set transitionDuration to speed
    // 3. update container height to max-height
    // 4. set transitionDuration to 0s after transition done
    function updateContainerHeight() {
      var heights = [], maxHeight;
      for (var i = index - indexAdjust; i < index + items; i++) {
        heights.push(slideItems[i].offsetHeight);
      }
      maxHeight = Math.max.apply(null, heights);

      setTransitionDuration(1);
      slideContainer.style.height = maxHeight + 'px';
    }

    // set snapInterval (for IE10)
    function setSnapInterval() {
      slideWrapper.style.msScrollSnapPointsX = 'snapInterval(0%, ' + slideWidth + ')';
    }

    // update slide
    function updateSlideStatus() {
      var h1, h2, v1, v2;
      if (index !== indexCached) {
        if (index > indexCached) {
          h1 = indexCached;
          h2 = Math.min(indexCached + items, index);
          v1 = Math.max(indexCached + items, index);
          v2 = index + items;
        } else {
          h1 = Math.max(index + items, indexCached);
          h2 = indexCached + items;
          v1 = index;
          v2 = Math.min(index + items, indexCached);
        }
      }
      indexCached = index;

      if (slideBy%1 !== 0) {
        h1 = Math.round(h1);
        h2 = Math.round(h2);
        v1 = Math.round(v1);
        v2 = Math.round(v2);
      }

      for (var i = h1; i < h2; i++) {
        _setAttrs(slideItems[i], {'aria-hidden': 'true'});
      }
      for (var j = v1; j < v2; j++) {
        _setAttrs(slideItems[j], {'aria-hidden': 'false'});
      }
    }

    // show or hide nav.
    // doesn't work on customized nav.
    function updateNavDisplay() {
      if (navCountVisible !== navCountVisibleCached) {
        if (navCountVisible > navCountVisibleCached) {
          for (var i = navCountVisibleCached; i < navCountVisible; i++) {
            _removeAttrs(allNavs[i], 'hidden');
          }
        } else {
          for (var j = navCountVisible; j < navCountVisibleCached; j++) {
            _setAttrs(allNavs[j], {'hidden': ''});
          }
        }
      }
      navCountVisibleCached = navCountVisible;
    }

    // get current nav
    function getNavCurrent() {
      var navCurrentTem;
      if (navClicked === -1) {
        var absoluteIndex = (index < cloneCount) ? index + slideCount : index%slideCount;
        if (options.navContainer) {
          return absoluteIndex;
        } else {
          navCurrentTem = Math.floor(absoluteIndex / items);
          // non-loop & reach the edge
          if (!loop && slideCount%items !== 0 && index === slideCount - items) { navCurrentTem += 1; }
          return navCurrentTem;
        }
      } else {
        navCurrentTem = navClicked;
        navClicked = -1;
      }

      return navCurrentTem;
    }

    // set tabindex & aria-selected on Nav
    function updateNavStatus() {
      if (nav) {
        if (navClicked === -1) {
          var absIndex = index;
          while (absIndex < cloneCount) { absIndex += slideCount; }
          absIndex = (absIndex - cloneCount)%slideCount;
          if (options.navContainer) {
            navCurrent = absIndex;
          } else {
            navCurrent = Math.floor(absIndex / items);
            // non-loop & reach the edge
            if (!loop && slideCount%items !== 0 && index === indexMax) { navCurrent += 1; }
          }
        } else {
          navCurrent = navClicked;
          navClicked = -1;
        }

        if (navCurrent !== navCurrentCached) {
          _setAttrs(allNavs[navCurrentCached], {
            'tabindex': '-1',
            'aria-selected': 'false'
          });

          _setAttrs(allNavs[navCurrent], {
            'tabindex': '0',
            'aria-selected': 'true'
          });
          navCurrentCached = navCurrent;
        }
      }
    }

    // set 'disabled' to true on controls when reach the edge
    function updateControlsStatus() {
      if (!controls || loop) { return; }
      if (index === indexAdjust || !rewind && index === indexMax) {
        var inactive = (index === indexAdjust) ? prevButton : nextButton,
            active = (index === indexAdjust) ? nextButton : prevButton;

        changeFocus(inactive, active);

        inactive.disabled = true;
        _setAttrs(inactive, {'tabindex': '-1'});

        active.disabled = false;
        _setAttrs(active, {'tabindex': '0'});
      } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
      }
    }

    // set transition duration
    var setTransitionDuration = (function () {
      if (TRANSITIONDURATION) { 
        return function (indexGap) {
          slideContainer.style[TRANSITIONDURATION] = (speed * indexGap / 1000) + 's';
        };
      } else {
        return function () {};
      }
    })();

    // make transfer after click/drag:
    // 1. change 'transform' property for mordern browsers
    // 2. change 'left' property for legacy browsers
    var transformCore = (function () {
      if (TRANSFORM) {
        return function (distance) {
          var x = distance || -slideWidth * index;
          slideContainer.style[TRANSFORM] = 'translate3d(' + x + 'px, 0, 0)';
        };
      } else {
        return function (distance) {
          var x = distance || -slideWidth * index;
          slideContainer.style.left = x + 'px';
        };
      }
    })();

    function doTransform (indexGap, distance) {
      if (TRANSITIONDURATION) { setTransitionDuration(indexGap); }
      transformCore(distance);
    }

    // check index after click/drag:
    // if there is not enough room for next transfering,
    // move slide container to a new location without animation
    // |-----|-----|----------|-----|-----|
    // |items|items|slideCount|items|items|
    function resetIndexAndContainer() {
      var leftEdge = slideBy + indexAdjust,
          rightEdge = slideCountNew - items - slideBy - 1; // -1: index starts form 0

      if (index < leftEdge || index > rightEdge) {
        (index - slideCount >= leftEdge && index - slideCount <= rightEdge) ? index -= slideCount : index += slideCount;

        doTransform(0);
      }
    }

    function render(indexGap) {
      _setAttrs(slideContainer, {'aria-busy': 'true'});
      doTransform(indexGap);
      if (!TRANSITIONEND) { onTransitionEnd(); }
    }

    // AFTER TRANSFORM
    // Things need to be done after a transfer:
    // 1. check index
    // 2. add classes to visible slide
    // 3. disable controls buttons when reach the first/last slide in non-loop slider
    // 4. update nav status
    // 5. lazyload images
    // 6. update container height
    function onTransitionEnd(e) {
      if (!TRANSITIONEND || e.propertyName !== 'height') {
        if (loop) { resetIndexAndContainer(); }
        updateSlideStatus();
        updateNavStatus();
        updateControlsStatus();
        lazyLoad();
        runAutoHeight();
        _removeAttrs(slideContainer, 'aria-busy');
      }
    }

    // # ACTIONS
    // on controls click
    function onClickControl(dir) {
      if (_getAttr(slideContainer, 'aria-busy') !== 'true') {
        var indexTem = index + dir * slideBy,
            indexGap = Math.abs(dir * slideBy);
        index = (loop) ? indexTem : Math.max(indexAdjust, Math.min(indexTem, indexMax));

        render(indexGap);
      }
    }

    function onClickControlPrev() {
      onClickControl(-1);
    }

    function onClickControlNext() {
      if(rewind && index === slideCount - items){
        onClickControl((items - slideCount) / slideBy);
      }else{
        onClickControl(1);
      }
    }

    // on doc click
    function onClickNav(e) {
      if (_getAttr(slideContainer, 'aria-busy') !== 'true') {
        var clickTarget = e.target || e.srcElement, navIndex, indexGap;

        while (gn.indexOf(allNavs, clickTarget) === -1) {
          clickTarget = clickTarget.parentNode;
        }

        navIndex = navClicked = Number(_getAttr(clickTarget, 'data-slide'));

        index = (options.navContainer) ? navIndex + cloneCount : navIndex * items + cloneCount;
        index = (loop) ? index : Math.min(index, indexMax);
        indexGap = Math.abs(index - indexCached);

        render(indexGap);
      }
    }

    function startAction() {
      autoplayTimer = setInterval(function () {
        onClickControl(autoplayDirection);
      }, autoplayTimeout);
      autoplayButton.setAttribute('data-action', 'stop');
      autoplayButton.innerHTML = '<span hidden>Stop Animation</span>' + autoplayText[1];

      animating = true;
    }

    function stopAction() {
      clearInterval(autoplayTimer);
      autoplayButton.setAttribute('data-action', 'start');
      autoplayButton.innerHTML = '<span hidden>Stop Animation</span>' + autoplayText[0];

      animating = false;
    }

    function toggleAnimation() {
      if (animating) {
        stopAction();
      } else {
        startAction();
      }
    }

    function stopAnimation() {
      if (animating) { stopAction(); }
    }

    // 
    function onKeyDocument(e) {
      e = e || window.event;
      if (e.keyCode === KEY.LEFT) {
        onClickControl(-1);
      } else if (e.keyCode === KEY.RIGHT) {
        if(rewind && index === slideCount - items){
          onClickControl((items - slideCount) / slideBy);
        }else{
          onClickControl(1);
        }
      }
    }

    // change focus
    function changeFocus(blur, focus) {
      if (typeof blur === 'object' && 
          typeof focus === 'object' && 
          blur === document.activeElement) {
        blur.blur();
        focus.focus();
      }
    }

    // on key control
    function onKeyControl(e) {
      e = e || window.event;
      var code = e.keyCode,
          curElement = document.activeElement;

      switch (code) {
        case KEY.LEFT:
        case KEY.UP:
        case KEY.HOME:
        case KEY.PAGEUP:
          if (curElement !== prevButton && prevButton.disabled !== true) {
            changeFocus(curElement, prevButton);
          }
          break;
        case KEY.RIGHT:
        case KEY.DOWN:
        case KEY.END:
        case KEY.PAGEDOWN:
          if (curElement !== nextButton && nextButton.disabled !== true) {
            changeFocus(curElement, nextButton);
          }
          break;
        case KEY.ENTER:
        case KEY.SPACE:
          if (curElement === nextButton) {
            onClickControlNext();
          } else {
            onClickControlPrev();
          }
          break;
      }
    }

    // on key nav
    function onKeyNav(e) {
      e = e || window.event;
      var code = e.keyCode,
          curElement = document.activeElement,
          dataSlide = _getAttr(curElement, 'data-slide');

      switch(code) {
        case KEY.LEFT:
        case KEY.PAGEUP:
          if (dataSlide > 0) { changeFocus(curElement, curElement.previousElementSibling); }
          break;
        case KEY.UP:
        case KEY.HOME:
          if (dataSlide !== 0) { changeFocus(curElement, allNavs[0]); }
          break;
        case KEY.RIGHT:
        case KEY.PAGEDOWN:
          if (dataSlide < navCountVisible - 1) { changeFocus(curElement, curElement.nextElementSibling); }
          break;
        case KEY.DOWN:
        case KEY.END:
          if (dataSlide < navCountVisible - 1) { changeFocus(curElement, allNavs[navCountVisible - 1]); }
          break;
        case KEY.ENTER:
        case KEY.SPACE:
          onClickNav(e);
          break;
      }
    }

    // IE10 scroll function
    function ie10Scroll() {
      doTransform(0, slideContainer.scrollLeft());
    }

    function onPanStart(e) {
      var touchObj = e.changedTouches[0];
      startX = parseInt(touchObj.clientX);
      startY = parseInt(touchObj.clientY);
      translateXInit = Number(slideContainer.style[TRANSFORM].slice(12, -13));
    }

    function onPanMove(e) {
      var touchObj = e.changedTouches[0];
      distX = parseInt(touchObj.clientX) - startX;
      distY = parseInt(touchObj.clientY) - startY;

      if (_getPanDirection(_toDegree(distY, distX), 15) === 'horizontal') { 
        touchStarted = true;
        e.preventDefault();
        doTransform(0, translateXInit + distX);
      }
    }

    function onPanEnd(e) {
      var touchObj = e.changedTouches[0];
      distX = parseInt(touchObj.clientX) - startX;

      if (touchStarted && distX !== 0) {
        touchStarted = false;
        e.preventDefault();

        var indexTem = - (translateXInit + distX) / slideWidth;
        indexTem = (distX > 0) ? Math.floor(indexTem) : Math.ceil(indexTem);
        index = Math.max(indexAdjust, Math.min(indexTem, indexMax));

        var translateXEnd = - index * slideWidth;
        if (!loop && !edgePadding && fixedWidth) {
          translateXEnd = Math.max(- (slideWidth * slideCount - vw), translateXEnd);
        }

        doTransform(1, translateXEnd);
        if (!TRANSITIONEND) { onTransitionEnd(); }
      }
    }

    // # RESIZE
    function onResize() {
      clearTimeout(resizeTimer);
      // update after stop resizing for 100 ms
      resizeTimer = setTimeout(function () {
        if (slideWrapper.clientWidth !== vw) {
          vw = slideWrapper.clientWidth;
          getVariables();
          checkSlideCount();

          updateLayout();
          updateNavDisplay();
          if (navigator.msMaxTouchPoints) { setSnapInterval(); }

          doTransform(0);
          if (!TRANSITIONEND) { onTransitionEnd(); }
        }
      }, 100);
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          lazyLoad();
          ticking = false;
        });
      }
      ticking = true;
    }

    return {
      init: sliderInit,

      // destory
      destory: function () {
        // slideWrapper
        gn.unwrap(slideWrapper);
        slideWrapper = null;

        // slideContainer
        slideContainer.classList.remove('tiny-content', mode, direction);
        _removeAttrs(slideContainer, ['id', 'style']);

        // cloned items
        if (loop) {
          for (var j = cloneCount; j--;) {
            slideItems[0].remove();
            slideItems[slideItems.length - 1].remove();
          }
        }

        // Slide Items
        _removeAttrs(slideItems, ['id', 'style', 'aria-hidden']);
        slideId = slideCount = null;

        // controls
        if (controls) {
          if (!options.controlsContainer) {
            controlsContainer.remove();
            controlsContainer = prevButton = nextButton = null;
          } else {
            _removeAttrs(controlsContainer, ['aria-label']);
            _removeAttrs(controlsContainer.children, ['aria-controls', 'tabindex']);
            _removeEvents(controlsContainer);
          }
        }

        // nav
        if (nav) {
          if (!options.navContainer) {
            navContainer.remove();
            navContainer = null;
          } else {
            _removeAttrs(navContainer, ['aria-label']);
            _removeAttrs(allNavs, ['aria-selected', 'aria-controls', 'tabindex']);
            _removeEvents(navContainer);
          }
          allNavs = null;
        }

        // auto
        if (autoplay) {
          if (!options.navContainer && navContainer !== null) {
            navContainer.remove();
            navContainer = null;
          } else {
            _removeEvents(autoplayButton);
          }
        }

        // remove slider container events at the end
        // because this will make slideContainer = null
        _removeEvents(slideContainer);

        // remove arrowKeys eventlistener
        if (arrowKeys) {
          document.removeEventListener('keydown', onKeyDocument, false);
        }

        // remove window event listeners
        window.removeEventListener('resize', onResize, false);
        window.removeEventListener('scroll', onScroll, false);
      },

      getIndex: function () { return index; },
      // $ Private methods, for test only
      // hasAttr: _hasAttr, 
      // getAttr: _getAttr, 
      // setAttrs: _setAttrs, 
      // removeAttrs: _removeAttrs, 
      // removeEvents: _removeEvents, 
      // getSlideId: _getSlideId, 
      // toDegree: _toDegree, 
      // getPanDirection: _getPanDirection, 
      // hideElement: _hideElement, 
      // showElement: _showElement, 
      
      // mode: mode,
      // direction: direction,
      // gutter: gutter,
      // edgePadding: edgePadding,
      // fixedWidth: fixedWidth,
      // controls: controls,
      // nav: nav,
      // rewind: rewind,
      // loop: loop,
      // autoHeight: autoHeight,
      // slideBy: slideBy,
      // lazyload: lazyload,
      // touch: touch,
      // speed: speed,
      // items: getItems(),
      // cloneCount: cloneCount,
      // navCountVisible: function () { return navCountVisible; },
      // index: function () { return index; },
      // slideWidth: function () { return slideWidth; },
      
      // slideContainer: slideContainer,
      // slideItems: slideItems,
      // slideCount: slideCount,
      // controlsContainer: function () { return controlsContainer; },
      // prevButton: function () { return prevButton; }, 
      // nextButton: function () { return nextButton; }, 
      // navContainer: function () { return navContainer; },
      // allNavs: function () { return allNavs; },
    };
  }

  // === Private helper functions === //
  function _getSlideId() {
    if (window.tinySliderNumber === undefined) {
      window.tinySliderNumber = 1;
    } else {
      window.tinySliderNumber++;
    }
    return 'tinySlider' + window.tinySliderNumber;
  }

  function _toDegree (y, x) {
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  function _getPanDirection(angle, range) {
    if ( Math.abs(90 - Math.abs(angle)) >= (90 - range) ) {
      return 'horizontal';
    } else if ( Math.abs(90 - Math.abs(angle)) <= range ) {
      return 'vertical';
    } else {
      return false;
    }
  }

  function _hasAttr(el, attr) {
    return el.hasAttribute(attr);
  }

  function _getAttr(el, attr) {
    return el.getAttribute(attr);
  }

  function _setAttrs(els, attrs) {
    els = (gn.isNodeList(els) || els instanceof Array) ? els : [els];
    if (Object.prototype.toString.call(attrs) !== '[object Object]') { return; }

    for (var i = els.length; i--;) {
      for(var key in attrs) {
        els[i].setAttribute(key, attrs[key]);
      }
    }
  }

  function _removeAttrs(els, attrs) {
    els = (gn.isNodeList(els) || els instanceof Array) ? els : [els];
    attrs = (attrs instanceof Array) ? attrs : [attrs];

    var attrLength = attrs.length;
    for (var i = els.length; i--;) {
      for (var j = attrLength; j--;) {
        els[i].removeAttribute(attrs[j]);
      }
    }
  }

  function _removeEvents(el) {
    var elClone = el.cloneNode(true), parent = el.parentNode;
    parent.insertBefore(elClone, el);
    el.remove();
    el = null;
  }

  function _hideElement(el) {
    if (!_hasAttr(el, 'hidden')) {
      _setAttrs(el, {'hidden': ''});
    }
  }

  function _showElement(el) {
    if (_hasAttr(el, 'hidden')) {
      _removeAttrs(el, 'hidden');
    }
  }

  // check if an image is loaded
  // 1. See if "naturalWidth" and "naturalHeight" properties are available.
  // 2. See if "complete" property is available.
  function imageLoaded(img) {
    if (typeof img.complete === 'boolean') {
      return img.complete;
    } else if (typeof img.naturalWidth === 'number') {
      return img.naturalWidth !== 0;
    }
  }

  // From Modernizr
  function whichTransitionEvent(){
    var t,
        el = document.createElement('fakeelement'),
        transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        };

    for(t in transitions){
      if( el.style[t] !== undefined ){
        return transitions[t];
      }
    }

    return false; // explicit for ie9-
  }

  return core;
})();