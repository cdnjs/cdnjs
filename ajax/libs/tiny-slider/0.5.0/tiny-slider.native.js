/**
  * tiny-slider
  * @version 0.5.0
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
      items: 1,
      gutter: 0,
      gutterPosition: 'right',
      fixedWidth: false,
      maxContainerWidth: false,
      slideByPage: false,
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

    // make sure slider container exists
    if (typeof options.container !== 'object' || options.container === null) { 
      return {
        init: function () { return; },
        destory: function () { return; }
      }; 
    }

    // === define and set variables ===
    var sliderContainer = options.container,
        sliderWrapper = document.createElement('div'),
        sliderItems = sliderContainer.children,
        sliderCount = sliderItems.length,
        sliderCountUpdated = sliderItems.length,
        gutter = options.gutter,
        gutterPosition = (options.gutterPosition === 'right') ? 'marginRight' : 'marginLeft',
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
        loop = (rewind || fixedWidth && !options.maxContainerWidth) ? false : options.loop,
        autoHeight = options.autoHeight,
        slideByPage = options.slideByPage,
        lazyload = options.lazyload,
        touch = options.touch,

        sliderId,
        slideWidth,
        itemsMax,
        items,
        prevButton,
        nextButton,
        allNavs,
        navCount,
        navCountVisible,
        navClicked = -1,
        index = 0,
        running = false,
        resizeTimer,
        ticking = false;

    if (autoplay) {
      var autoplayTimer,
          actionButton,
          animating = false;
    }

    if (touch) {
      var startX = 0,
          startY = 0,
          translateX = 0,
          distX = 0,
          distY = 0,
          run = false;
    }

    // get items, itemsMax, slideWidth, navCountVisible
    var responsive = (fixedWidth) ? false : options.responsive,
        bpKeys = (typeof responsive !== 'object') ? false : Object.keys(responsive),
        bpVals = getMapValues(responsive);

    var getItems = (function () {
      if (!fixedWidth) {
        return function () {
          var itemsTem;
          var ww = document.documentElement.clientWidth;

          if (bpKeys.length !== undefined && bpVals !== undefined && bpKeys.length === bpVals.length) {
            if (ww < bpKeys[0]) {
              itemsTem = options.items;
            } else if (ww >= bpKeys[bpKeys.length - 1]) {
              itemsTem = bpVals[bpVals.length - 1];
            } else {
              for (var i = 0; i < bpKeys.length - 1; i++) {
                if (ww >= bpKeys[i] && ww <= bpKeys[i+1]) {
                  itemsTem = bpVals[i];
                }
              }
            }
          } else {
            itemsTem = options.items;
          }

          return Math.max(Math.min(sliderCount, itemsTem), 1);
        };
      } else {
        return function () {
          return Math.max(Math.min(sliderCount, Math.floor(sliderContainer.parentNode.offsetWidth / fixedWidth)), 1);
        };
      }
    })();

    var getItemsMax = function () {
      var itemsMaxTem;

      if (!fixedWidth) {
        itemsMaxTem = (bpVals.length !== undefined) ? Math.max.apply(Math, bpVals) : options.items;
      } else {
        if (options.maxContainerWidth) {
          itemsMaxTem = Math.ceil(options.maxContainerWidth / fixedWidth);
        } else {
          itemsMaxTem = false;
        }
      }

      if (itemsMaxTem) {
        return Math.min(sliderCount, itemsMaxTem);
      } else {
        return itemsMaxTem;
      }
    };

    var getSlideWidth = (function () {
      if (fixedWidth) {
        return function () { return fixedWidth + gutter; };
      } else {
        return function () { return (gn.getWidth(sliderContainer.parentNode) + gutter) / items; };
      }
    })();

    var getNavCount = (function () {
      if (options.navContainer) {
        return function () { return sliderCount; };
      } else {
        return function () { return Math.ceil(sliderCount / items); };
      }
    })();

    var getCurrent = (function () {
      if (loop) {
        return function () { return index + itemsMax; };
      } else {
        return function () { return index; };
      }
    })();

    items = getItems();
    itemsMax = getItemsMax();
    slideWidth = getSlideWidth();
    navCountVisible = getNavCount();

    // update layout:
    // update slide container width, margin-left
    // update slides' width
    function updateLayout() {
      sliderContainer.style.width = slideWidth * sliderCountUpdated + 'px';

      var ml;
      if (gutter !== 0 && gutterPosition === 'marginLeft') {
        ml = (loop)? itemsMax * slideWidth + gutter : gutter;
      } else {
        ml = itemsMax * slideWidth;
      }
      sliderContainer.style.marginLeft = - ml + 'px';

      for (var b = sliderCountUpdated; b--;) {
        sliderItems[b].style.width = slideWidth - gutter + 'px';
        if (gutter !== 0) {
          sliderItems[b].style[gutterPosition] = gutter + 'px';
        }
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

    // check if all visibel images are loaded
    // and update container height if it's done
    function runAutoHeight() {
      // get all images inside visible slider items
      var current = getCurrent(), images = [];

      for (var i = sliderCountUpdated; i--;) {
        if (i >= current && i < current + items) {
          var imagesTem = sliderItems[i].querySelectorAll('img');
          for (var j = imagesTem.length; j--;) {
            images.push(imagesTem[j]);
          }
        }
      }

      if (images.length === 0) {
        updateContainerHeight(); 
      } else {
        checkImagesLoaded(images);
      }
    }

    // update container height
    // 1. get the max-height of the visible slides
    // 2. set transitionDuration to speed
    // 3. update container height to max-height
    // 4. set transitionDuration to 0s after transition is done
    function updateContainerHeight() {
      var current = getCurrent(), heights = [], maxHeight;

      for (var i = sliderCountUpdated; i--;) {
        if (i >= current && i < current + items) {
          heights.push(sliderItems[i].offsetHeight);
        }
      }

      maxHeight = Math.max.apply(null, heights);
      if (TRANSITIONDURATION) { sliderContainer.style[TRANSITIONDURATION] = speed / 1000 + 's'; }
      sliderContainer.style.height = maxHeight + 'px';
      running = true;
      
      setTimeout(function () {
        if (TRANSITIONDURATION) { sliderContainer.style[TRANSITIONDURATION] = '0s'; }
        running = false;
      }, speed);
    }

    // set transition duration
    function setTransitionDuration(indexGap) {
      if (!TRANSITIONDURATION) { return; }
      sliderContainer.style[TRANSITIONDURATION] = (speed * indexGap / 1000) + 's';
      running = true;
    }

    // set snapInterval (for IE10)
    function setSnapInterval() {
      if (!navigator.msMaxTouchPoints) { return; }
      sliderContainer.parentNode.style.msScrollSnapPointsX = 'snapInterval(0%, ' + slideWidth + ')';
    }

    // update slide
    // set aria-hidden
    function updateSlide() {
      for (var i = sliderCountUpdated; i--;) {
        var current = getCurrent(), slideTem = sliderItems[i];

        if (i >= current && i < current + items) {
          if (!slideTem.hasAttribute('aria-hidden') || slideTem.getAttribute('aria-hidden') === 'true') {
            slideTem.setAttribute('aria-hidden', 'false');
          }
        } else {
          if (!slideTem.hasAttribute('aria-hidden') || slideTem.getAttribute('aria-hidden') === 'false') {
            slideTem.setAttribute('aria-hidden', 'true');
          }
        }
      }
    }

    // non-loop:
    // set 'disabled' to true to controls when reach the edge
    function disableControls() {
      if (loop) { return; }

      if (sliderCount > items) {
        if (index === 0) {
          prevButton.disabled = true;
          changeFocus(prevButton, nextButton);
        } else {
          prevButton.disabled = false;
        }
        if (index === sliderCount - items && !rewind) {
          nextButton.disabled = true;
          changeFocus(nextButton, prevButton);
        } else {
          nextButton.disabled = false;
        }
      } else {
        if (index !== 0) {
          index = 0;
          translate();
        }

        prevButton.disabled = true;
        nextButton.disabled = true;
        prevButton.setAttribute('tabindex', '-1');
        nextButton.setAttribute('tabindex', '-1');
        if (prevButton === document.activeElement) { prevButton.blur(); }
        if (nextButton === document.activeElement) { nextButton.blur(); }
      }
    }

    // show or hide nav.
    // doesn't work on customized nav.
    function diaplayNav() {
      if (!nav || options.navContainer) { return; }

      for (var i = navCount; i--;) {
        var navTem = allNavs[i];

        if (i < navCountVisible) {
          if (navTem.hasAttribute('hidden')) {
            navTem.removeAttribute('hidden');
          }
        } else {
          if (!navTem.hasAttribute('hidden')) {
            navTem.setAttribute('hidden', '');
          }
        }
      }
    }

    // set tabindex & aria-selected on Nav
    function activeNav() {
      if (!nav) { return; }

      var navCurrent;

      if (navClicked === -1) {
        var absoluteIndex = (index < 0) ? index + sliderCount : (index >= sliderCount) ? index - sliderCount : index;
        navCurrent = (options.navContainer) ? absoluteIndex : Math.floor(absoluteIndex / items);

        // non-loop & reach the edge
        if (!loop && !options.navContainer) {
          var re=/^-?[0-9]+$/, integer = re.test(sliderCount / items);
          if(!integer && index === sliderCount - items) {
            navCurrent += 1;
          }
        }
      } else {
        navCurrent = navClicked;
        navClicked = -1;
      }

      for (var i = navCountVisible; i--;) {
        var navTem = allNavs[i];

        if (i === navCurrent) {
          if (navTem.getAttribute('aria-selected') === 'false') {
            navTem.setAttribute('tabindex', '0');
            navTem.setAttribute('aria-selected', 'true');
          }
        } else {
          if (navTem.getAttribute('aria-selected') === 'true') {
            navTem.setAttribute('tabindex', '-1');
            navTem.setAttribute('aria-selected', 'false');
          }
        }
      }
    }

    // make transfer after click/drag:
    // 1. change 'transform' property for mordern browsers
    // 2. change 'left' property for legacy browsers
    function translate() {
      var vw = sliderContainer.parentNode.offsetWidth;

      translateX = - slideWidth * index;
      if (fixedWidth && !loop) {
        translateX = Math.max( translateX, - Math.abs(sliderCount * slideWidth - gutter - vw) );
      }

      if (TRANSFORM) {
        sliderContainer.style[TRANSFORM] = 'translate3d(' + translateX + 'px, 0, 0)';
      } else {
        sliderContainer.style.left = translateX + 'px';
      }
    }

    // render
    function render() {
      updateLayout();
      setSnapInterval();
      translate();
      diaplayNav();
      activeNav();
      updateSlide();
      disableControls();
      if (autoHeight) { 
        runAutoHeight();
      }
      if (lazyload) { lazyLoad(); }
    }

    // check index after click/drag:
    // if viewport reach the left/right edge of slide container or
    // there is not enough room for next transfer,
    // transfer slide container to a new location without animation
    function checkIndex() {
      if (!loop) { return; }

      var reachLeftEdge = (slideByPage) ? index < (items - itemsMax) : index <= - itemsMax,
          reachRightEdge = (slideByPage) ? index > (sliderCount + itemsMax - items * 2 - 1) : index >= (sliderCount + itemsMax - items);

      // fix fixed-width
      if (fixedWidth && itemsMax && !slideByPage) {
        reachRightEdge = index >= (sliderCount + itemsMax - items - 1);
      }

      if (reachLeftEdge) { index += sliderCount; }
      if (reachRightEdge) { index -= sliderCount; }

      if (TRANSITIONDURATION) { sliderContainer.style[TRANSITIONDURATION] = '0s'; }
      translate();
    }

    // Things need to be done after a transfer:
    // 1. check index
    // 2. add classes to visible slide
    // 3. disable controls buttons when reach the first/last slide in non-loop slider
    // 4. update nav status
    // 5. lazyload images
    // 6. update container height
    function update(indexGap) {
      sliderContainer.setAttribute('aria-busy', 'true');
      setTransitionDuration(indexGap);
      translate();

      setTimeout(function () {
        checkIndex();
        updateSlide();
        disableControls();
        activeNav();
        lazyLoad();
        if (autoHeight) {
          runAutoHeight();
        }

        running = false;
        sliderContainer.setAttribute('aria-busy', 'false');
      }, speed * indexGap);
    }

    // on controls click
    function onClickControl(dir) {
      if (!running) {
        dir = (slideByPage) ? dir * items : dir;
        var indexGap = Math.abs(dir);

        index = (loop) ? (index + dir) : Math.max(0, Math.min((index + dir), sliderCount - items));

        update(indexGap);
      }
    }

    function onClickControlPrev() {
      onClickControl(-1);
    }

    function onClickControlNext() {
      if(index === sliderCount - items && rewind){
        onClickControl(- sliderCount + items);
      }else{
        onClickControl(1);
      }
    }

    // on doc click
    function onClickNav(e) {
      if (!running) {
        var clickTarget = e.target || e.srcElement,
            navIndex;

        while (gn.indexOf(allNavs, clickTarget) === -1) {
          clickTarget = clickTarget.parentNode;
        }

        navClicked = navIndex = Number(clickTarget.getAttribute('data-slide'));

        var indexTem, indexGap;
        indexTem = (options.navContainer) ? navIndex : navIndex * items;
        indexTem = (loop) ? indexTem : Math.min(indexTem, sliderCount - items);
        indexGap = Math.abs(indexTem - index);
        index = indexTem;

        update(indexGap);
      }
    }

    function startAction() {
      autoplayTimer = setInterval(function () {
        onClickControl(autoplayDirection);
      }, autoplayTimeout);
      actionButton.setAttribute('data-action', 'stop');
      actionButton.innerHTML = '<span hidden>Stop Animation</span>' + autoplayText[1];

      animating = true;
    }

    function stopAction() {
      clearInterval(autoplayTimer);
      actionButton.setAttribute('data-action', 'start');
      actionButton.innerHTML = '<span hidden>Stop Animation</span>' + autoplayText[0];

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
        onClickControl(1);
      }
    }

    // change focus
    function changeFocus(blur, focus) {
      if (typeof blur === 'object' && typeof focus === 'object') {
        if (blur === document.activeElement) {
          blur.blur();
          focus.focus();
        }
      }
    }

    // on key control
    function onKeyControl(e) {
      e = e || window.event;
      var code = e.keyCode,
          curElement = document.activeElement;

      if (code === KEY.LEFT || code === KEY.UP || code === KEY.HOME || code === KEY.PAGEUP) {
        if (curElement !== prevButton && prevButton.disabled !== true) {
          changeFocus(curElement, prevButton);
        }
      }
      if (code === KEY.RIGHT || code === KEY.DOWN || code === KEY.END || code === KEY.PAGEDOWN) {
        if (curElement !== nextButton && nextButton.disabled !== true) {
          changeFocus(curElement, nextButton);
        }
      }
      if (code === KEY.ENTER || code === KEY.SPACE) {
        if (curElement === nextButton) {
          onClickControlNext();
        } else {
          onClickControlPrev();
        }
      }
    }

    // on key nav
    function onKeyNav(e) {
      e = e || window.event;
      var code = e.keyCode,
          curElement = document.activeElement;

      if (code === KEY.LEFT || code === KEY.PAGEUP) {
        if (curElement.getAttribute('data-slide') > 0) {
          changeFocus(curElement, curElement.previousElementSibling);
        }
      }
      if (code === KEY.UP || code === KEY.HOME) {
        if (curElement.getAttribute('data-slide') !== 0) {
          changeFocus(curElement, allNavs[0]);
        }
      }
      if (code === KEY.RIGHT || code === KEY.PAGEDOWN) {
        if (curElement.getAttribute('data-slide') < navCountVisible - 1) {
          changeFocus(curElement, curElement.nextElementSibling);
        }
      }
      if (code === KEY.DOWN || code === KEY.END) {
        if (curElement.getAttribute('data-slide') < navCountVisible - 1) {
          changeFocus(curElement, allNavs[navCountVisible - 1]);
        }
      }
      if (code === KEY.ENTER || code === KEY.SPACE) {
        onClickNav(e);
      }
    }

    // lazyload
    function lazyLoad() {
      if (!gn.isInViewport(sliderContainer)) { return; }

      var imgs = sliderContainer.querySelectorAll('[aria-hidden="false"] .tiny-lazy');
      if (imgs.length === 0) { return; }
      for (var i = 0, len = imgs.length; i < len; i++) {
        if (!imgs[i].classList.contains('loaded')) {
          imgs[i].src = imgs[i].getAttribute('data-src');
          imgs[i].classList.add('loaded');
        }
      }
    }

    // IE10 scroll function
    function ie10Scroll() {
      sliderContainer.style[TRANSITIONDURATION] = '0s';
      sliderContainer.style.transform = 'translate3d(-' + - sliderContainer.scrollLeft() + 'px,0,0)';
    }

    function onPanStart(e) {
      var touchObj = e.changedTouches[0];
      startX = parseInt(touchObj.clientX);
      startY = parseInt(touchObj.clientY);
    }

    function onPanMove(e) {
      var touchObj = e.changedTouches[0];
      distX = parseInt(touchObj.clientX) - startX;
      distY = parseInt(touchObj.clientY) - startY;

      var rotate = toDegree(Math.atan2(distY, distX)),
          panDir = getPanDir(rotate, 15);

      if (panDir === 'horizontal' && running === false) { run = true; }
      if (run) {
        if (TRANSITIONDURATION) { sliderContainer.style[TRANSITIONDURATION] = '0s'; }

        var min = (!loop) ? - (sliderCount - items) * slideWidth : - (sliderCount + itemsMax - items) * slideWidth,
            max = (!loop) ? 0 : itemsMax * slideWidth;

        if (!loop && fixedWidth) { min = - (sliderCount * slideWidth - sliderContainer.parentNode.offsetWidth); }

        translateX = - index * slideWidth + distX;
        translateX = Math.max(min, Math.min( translateX, max));

        if (TRANSFORM) {
          sliderContainer.style[TRANSFORM] = 'translate3d(' + translateX + 'px, 0, 0)';
        } else {
          sliderContainer.style.left = translateX + 'px';
        }

        e.preventDefault();
      }
    }

    function onPanEnd(e) {
      var touchObj = e.changedTouches[0];
      distX = parseInt(touchObj.clientX) - startX;

      if (run && distX !== 0) {
        e.preventDefault();
        run = false;
        translateX = - index * slideWidth + distX;

        var indexTem,
            min = (!loop) ? 0 : -itemsMax,
            max = (!loop) ? sliderCount - items : sliderCount + itemsMax - items;

        indexTem = - (translateX / slideWidth);
        indexTem = (distX < 0) ? Math.ceil(indexTem) : Math.floor(indexTem);
        indexTem = Math.max(min, Math.min(indexTem, max));
        index = indexTem;

        update(1);
      }
    }

    function onResize() {
      clearTimeout(resizeTimer);

      // update after resize done
      resizeTimer = setTimeout(function () {
        items = getItems();
        slideWidth = getSlideWidth();
        navCountVisible = getNavCount();

        render();
      }, 100);
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (lazyload) { lazyLoad(); }
          ticking = false;
        });
      }
      ticking = true;
    }
    
    return {
      // initialize:
      // 1. add .tiny-content to container
      // 2. wrap container with .tiny-slider
      // 3. add nav and controls if needed, set allNavs, prevButton, nextButton
      // 4. clone items for loop if needed, update childrenCount
      init: function () {
        sliderContainer.classList.add('tiny-content');

        // add slider id
        if (sliderContainer.id.length === 0) {
          sliderContainer.id = sliderId = getSliderId();
        } else {
          sliderId = sliderContainer.id;
        }

        // wrap slider with ".tiny-slider"
        sliderWrapper.className = 'tiny-slider';
        gn.wrap(sliderContainer, sliderWrapper);

        // for IE10
        if (navigator.msMaxTouchPoints) {
          sliderWrapper.classList.add('ms-touch');
          sliderWrapper.addEventListener('scroll', ie10Scroll, false);
        }

        // add slide id
        for (var x = 0; x < sliderCount; x++) {
          sliderItems[x].id = sliderId + 'item' + x;
        }

        // clone items
        if (loop) {
          var fragmentBefore = document.createDocumentFragment(), 
              fragmentAfter = document.createDocumentFragment(); 

          for (var j = itemsMax; j--;) {
            var cloneFirst = sliderItems[j].cloneNode(true),
                cloneLast = sliderItems[sliderCount - 1 - j].cloneNode(true);

            // remove id from cloned slides
            cloneFirst.id = '';
            cloneLast.id = '';

            fragmentBefore.insertBefore(cloneFirst, fragmentBefore.firstChild);
            fragmentAfter.appendChild(cloneLast);
          }

          sliderContainer.appendChild(fragmentBefore);
          sliderContainer.insertBefore(fragmentAfter, sliderContainer.firstChild);

          sliderCountUpdated = sliderContainer.children.length;
          sliderItems = sliderContainer.children;
        }

        // add nav
        if (nav) {
          if (!options.navContainer) {
            var navHtml = '';
            for (var i = 0; i < sliderCount; i++) {
              navHtml += '<button data-slide="' + i +'" tabindex="-1" aria-selected="false" aria-controls="' + sliderId + 'item' + i +'" type="button"></button>';
            }

            if (autoplay) {
              navHtml += '<button data-action="stop" type="button"><span hidden>Stop Animation</span>' + autoplayText[0] + '</button>';
            }

            navHtml = '<div class="tiny-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
            gn.append(sliderWrapper, navHtml);

            navContainer = sliderWrapper.querySelector('.tiny-nav');
          }

          allNavs = navContainer.querySelectorAll('[data-slide]');
          navCount = allNavs.length;

          if (!navContainer.hasAttribute('aria-label')) {
            navContainer.setAttribute('aria-label', "Carousel Pagination");
            for (var y = 0; y < navCount; y++) {
              var navTem = allNavs[y];
              navTem.setAttribute('tabindex', '-1');
              navTem.setAttribute('aria-selected', 'false');
              navTem.setAttribute('aria-controls', sliderId + 'item' + y);
            }
          }
        }

        // add controls
        if (controls) {
          if (!options.controlsContainer) {
            gn.append(sliderWrapper, '<div class="tiny-controls" aria-label="Carousel Navigation"><button data-controls="prev" tabindex="-1" aria-controls="' + sliderId +'" type="button">' + controlsText[0] + '</button><button data-controls="next" tabindex="0" aria-controls="' + sliderId +'" type="button">' + controlsText[1] + '</button></div>');

            controlsContainer = sliderWrapper.querySelector('.tiny-controls');
          }

          prevButton = controlsContainer.querySelector('[data-controls="prev"]');
          nextButton = controlsContainer.querySelector('[data-controls="next"]');

          if (!controlsContainer.hasAttribute('tabindex')) {
            controlsContainer.setAttribute('aria-label', 'Carousel Navigation');
            prevButton.setAttribute('aria-controls', sliderId);
            nextButton.setAttribute('aria-controls', sliderId);
            prevButton.setAttribute('tabindex', '-1');
            nextButton.setAttribute('tabindex', '0');
          }
        }

        // add auto
        if (autoplay) {
          if (!navContainer) {
            gn.append(sliderWrapper, '<div class="tiny-nav" aria-label="Carousel Pagination"><button data-action="stop" type="button"><span hidden>Stop Animation</span>' + autoplayText[0] + '</button></div>');
            navContainer = sliderWrapper.querySelector('.tiny-nav');
          }
          actionButton = navContainer.querySelector('[data-action]');
        }

        render();

        // add sliderContainer eventListeners
        if (touch) {
          sliderContainer.addEventListener('touchstart', onPanStart, false);
          sliderContainer.addEventListener('touchmove', onPanMove, false);
          sliderContainer.addEventListener('touchend', onPanEnd, false);
          sliderContainer.addEventListener('touchcancel', onPanEnd, false);
        }

        if (controls) {
          disableControls();
          prevButton.addEventListener('click', onClickControlPrev, false);
          nextButton.addEventListener('click', onClickControlNext, false);
          prevButton.addEventListener('keydown', onKeyControl, false);
          nextButton.addEventListener('keydown', onKeyControl, false);
        }
        
        if (nav) {
          for (var a = allNavs.length; a--;) {
            allNavs[a].addEventListener('click', onClickNav, false);
            allNavs[a].addEventListener('keydown', onKeyNav, false);
          }
        }

        if (autoplay) {
          startAction();
          actionButton.addEventListener('click', toggleAnimation, false);

          if (controls) {
            prevButton.addEventListener('click', stopAnimation, false );
            nextButton.addEventListener('click', stopAnimation, false );
          }

          if (nav) {
            for (var b = 0; b < navCount; b++) {
              allNavs[b].addEventListener('click', stopAnimation, false);
            }
          }
        }

        if (arrowKeys) {
          document.addEventListener('keydown', onKeyDocument, false);
        }

        // on window resize && scroll
        window.addEventListener('resize', onResize, false);
        window.addEventListener('scroll', onScroll, false);
      },

      // destory
      destory: function () {
        sliderContainer.classList.remove('tiny-content');
        sliderContainer.style.width = '';
        sliderContainer.style[TRANSITIONDURATION] = '';
        sliderContainer.style.transform = '';
        sliderContainer.style.marginLeft = '';
        sliderContainer.style.left = '';

        // remove sliderWrapper
        gn.unwrap(sliderWrapper);
        // sliderWrapper = null;

        // remove clone items
        if (loop) {
          for (var j = itemsMax; j--;) {
            sliderItems[0].remove();
            sliderItems[sliderItems.length - 1].remove();
          }
        }

        // remove ids
        if (sliderId !== undefined) {
          sliderId = null;
          sliderContainer.removeAttribute('id');

          for (var x = sliderCount; x--;) {
            sliderItems[x].removeAttribute('id');
            sliderItems[x].removeAttribute('aria-hidden');
            sliderItems[x].style.width = '';
          }
        }

        // remove sliderContainer event listener
        if (touch) {
          sliderContainer.removeEventListener('touchstart', onPanStart, false);
          sliderContainer.removeEventListener('touchmove', onPanMove, false);
          sliderContainer.removeEventListener('touchend', onPanEnd, false);
          sliderContainer.removeEventListener('touchcancel', onPanEnd, false);
        }

        // remove controls
        if (controls) {
          if (!options.controlsContainer) {
            controlsContainer.remove();
            controlsContainer = null;
            prevButton = null;
            nextButton = null;
          } else {
            controlsContainer.removeAttribute('aria-label');
            prevButton.removeAttribute('aria-controls');
            prevButton.removeAttribute('tabindex');
            prevButton.removeEventListener('click', onClickControlPrev, false);
            prevButton.removeEventListener('keydown', onKeyControl, false);

            nextButton.removeAttribute('aria-controls');
            nextButton.removeAttribute('tabindex');
            nextButton.removeEventListener('click', onClickControlNext, false);
            nextButton.removeEventListener('keydown', onKeyControl, false);
          }
        }

        // remove nav
        if (nav) {
          if (!options.navContainer) {
            navContainer.remove();
            navContainer = null;
          } else {
            navContainer.removeAttribute('aria-label');
            for (var i = allNavs.length; i--;) {
              allNavs[i].removeAttribute('aria-selected');
              allNavs[i].removeAttribute('aria-controls');
              allNavs[i].removeEventListener('click', onClickNav, false);
              allNavs[i].removeEventListener('keydown', onKeyNav, false);
            }
          }
          allNavs = null;
          navCount = null;
        }

        // remove auto
        if (autoplay) {
          if (!options.navContainer && navContainer !== null) {
            navContainer.remove();
            navContainer = null;
          } else {
            actionButton.removeEventListener('click', toggleAnimation, false);
            actionButton = null;

            if (controls && options.controlsContainer) {
              prevButton.removeEventListener('click', stopAnimation, false );
              nextButton.removeEventListener('click', stopAnimation, false );
            }

            if (nav && options.navContainer) {
              for (var b = 0; b < navCount; b++) {
                allNavs[b].removeEventListener('click', stopAnimation, false);
              }
            }
          }
        }

        // remove arrowKeys eventlistener
        if (arrowKeys) {
          document.removeEventListener('keydown', arrowKeys, false);
        }

        // remove window event listeners
        window.removeEventListener('resize', onResize, false);
        window.removeEventListener('scroll', onScroll, false);
      }
    };
  }

  // === Private helper functions === //
  function getSliderId() {
    if (window.tinySliderNumber === undefined) {
      window.tinySliderNumber = 1;
    } else {
      window.tinySliderNumber++;
    }
    return 'tinySlider' + window.tinySliderNumber;
  }

  function toDegree (angle) {
    return angle * (180 / Math.PI);
  }

  function getPanDir(angle, range) {
    if ( Math.abs(90 - Math.abs(angle)) >= (90 - range) ) {
      return 'horizontal';
    } else if ( Math.abs(90 - Math.abs(angle)) <= range ) {
      return 'vertical';
    } else {
      return false;
    }
  }

  function getMapValues (obj) {
    if (typeof(obj) === 'object') {
      var values = [],
          keys = Object.keys(obj);

      for (var i = 0, l = keys.length; i < l; i++) {
        var a = keys[i];
        values.push(obj[a]);
      }

      return values;
    } else {
      return false;
    }
  }

  return core;
})();