(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VenoBox = factory());
}(this, (function () { 'use strict';

   /**
    * VenoBox 2.0.4
    * Copyright 2013-2021 Nicola Franchini
    * @license: https://github.com/nicolafranchini/VenoBox/blob/master/LICENSE
    */
   let backdrop, blocknum, blockshare, blocktitle, core, container, content, current_item, current_index, diffX, diffY, endY, elPreloader, elPreloaderInner;
   let gallIndex, images, infinigall, items, navigationDisabled, newcontent, numeratio, nextok, prevok, overlay;
   let set_maxWidth, set_overlayColor, set_ratio, set_autoplay, set_href, set_customclass, startY, thenext, theprev, thisborder, thisgall, title, throttle;

   const svgOpen = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">';
   const svgClose = '</svg>';
   const downloadIcon = svgOpen + '<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>' + svgClose;
   const shareIcon = svgOpen + '<path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/><path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>' + svgClose;
   const linkIcon = svgOpen + '<path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>' + svgClose;
   const imagesHolder = document.createElement('div');

   let startX = 0;
   let endX = 0;
   let diff = 0;
   let threshold = 50;
   let startouch = false;
   let imgLoader = new Image();

   const spinners = {
       'bounce': ['sk-bounce', 'sk-bounce-dot', 2],
       'chase': ['sk-chase', 'sk-chase-dot', 6],
       'circle': ['sk-circle', 'sk-circle-dot', 12],
       'circle-fade': ['sk-circle-fade', 'sk-circle-fade-dot', 12],
       'flow': ['sk-flow', 'sk-flow-dot', 3],
       'fold': ['sk-fold', 'sk-fold-cube', 4],
       'grid': ['sk-grid', 'sk-grid-cube', 9],
       'plane': ['sk-plane', '', 0],
       'pulse': ['sk-pulse', '', 5],
       'swing': ['sk-swing', 'sk-swing-dot', 2],
       'wander': ['sk-wander', 'sk-wander-cube', 3],
       'wave': ['sk-wave', 'sk-wave-rec', 5]
   };

   // Default settings
   const defaults = {
       selector: '.venobox',
       autoplay : false,
       bgcolor: '#fff',
       border: '0',
       customClass: false,
       infinigall: false,
       maxWidth: '100%',
       navigation: true,
       navKeyboard: true,
       navTouch: true,
       navSpeed: 300,
       numeration: false,
       overlayClose: true,
       overlayColor: 'rgba(23,23,23,0.95)',
       popup: false,
       ratio: '16x9', // '1x1' | '4x3' | '16x9' | '21x9'
       share: false,
       shareStyle: 'pill', // 'bar' | 'block' | 'pill' | 'transparent'
       spinner: 'bounce', // 'plane' | 'chase' | 'bounce' | 'wave' | 'pulse' | 'flow' | 'swing' | 'circle' | 'circle-fade' | 'grid' | 'fold' | 'wander'
       spinColor : '#d2d2d2',
       titleattr: 'title',
       titlePosition: 'top', // 'top' || 'bottom'
       titleStyle: 'bar', // 'bar' | 'block' | 'pill' | 'transparent'
       toolsBackground: '#1C1C1C', // 'transparent'
       toolsColor: '#d2d2d2',
       onPreOpen: function(){ return true; }, // Return the selected object - set return false to prevent opening
       onPostOpen: function(){}, // Return: current_item, gallIndex, thenext, theprev
       onPreClose: function(){ return true; }, // Return: current_item, gallIndex, thenext, theprev - set return false to prevent closing
       onNavComplete: function(){}, // Return: current_item, gallIndex, thenext, theprev
       onContentLoaded: function(){}, // Return: newcontent
       onInit: function(){}, // Return: plugin obj
       jQuerySelectors: false,
   };

   /**
    * Generate spinner html
    * @param {Array} spinarray Selected spinner
    */
   function createspinner(spinarray){
       if (!spinarray) {
           return 'Loading...';
       }
       let spinner = '<div class="sk-center ' + spinarray[0] + '">';
       let i = 0;
       for (i = 0; i < spinarray[2]; i++) {
           spinner += '<div class="' + spinarray[1] + '"></div>';
       }
       spinner += '</div>';
       return spinner;
   }

   /**
    * A simple forEach() implementation for Arrays, Objects and NodeLists
    * @param {Array|Object|NodeList} collection Collection of items to iterate
    * @param {Function} callback Callback function for each iteration
    * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
    */
   function forEach(collection, callback, scope) {
       if (Object.prototype.toString.call(collection) === '[object Object]') {
           let prop;
           for (prop in collection) {
               if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                   callback.call(scope, collection[prop], prop, collection);
               }
           }
       } else {
           let i = 0;
           let len = collection.length;
           for (i = 0; i < len; i++) {
               callback.call(scope, collection[i], i, collection);
           }
       }
   }

   /**
   * Merge defaults with user options
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   * @returns {Object} Merged values of defaults and options
   */
   function extend( defaults, options ) {
       let extended = {};

       forEach(defaults, function (value, prop) {
           extended[prop] = defaults[prop];
       });

       forEach(options, function (value, prop) {
           extended[prop] = options[prop];
       });
       return extended;
   }

   /**
    * Linear animation timing
    */
   function timingLinear(timeFraction){
       return timeFraction;
   }

   /**
    * Animate with callback
    * https://javascript.info/js-animation
    */
   function animate({timing, draw, duration}) {
       let start = performance.now();
       requestAnimationFrame(function animate(time) {
           // timeFraction goes from 0 to 1
           let timeFraction = (time - start) / duration;
           if (timeFraction > 1) {
               timeFraction = 1;
           }
           // calculate the current animation state
           let progress = timing(timeFraction);
           draw(progress); // draw it
           if (timeFraction < 1) {
               requestAnimationFrame(animate);
           }
       });
   }

   /**
    * Parse Youtube or Vimeo videos and get host & ID
    */
   function parseVideo(url) {
       url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
       let type;
       if (RegExp.$3.indexOf('youtu') > -1) {
           type = 'youtube';
       } else if (RegExp.$3.indexOf('vimeo') > -1) {
           type = 'vimeo';
       }
       return {
           type: type,
           id: RegExp.$6
       };
   }

   /**
    * Get additional url parameters
    */
   function getUrlParameter(url) {
       let result = '';
       let sPageURL = decodeURIComponent(url);
       let firstsplit = sPageURL.split('?');

       if (firstsplit[1] !== undefined) {
           let sURLVariables = firstsplit[1].split('&');
           let sParameterName;
           let i;
           for (i = 0; i < sURLVariables.length; i++) {
               sParameterName = sURLVariables[i].split('=');
               result = result + '&'+ sParameterName[0]+'='+ sParameterName[1];
           }
       }
       return encodeURI(result);
   }

   /**
    * Get all images from string
    */
   function getImages(string) {
       imagesHolder.innerHTML = string;
       return imagesHolder.querySelectorAll('img');
   }

   /**
    * Update item settings.
    */
   function updateVars(obj){
       if (!obj) {
           return false;
       }
       navigationDisabled = true;
       current_item = obj;
       nextok = false;
       prevok = false;
       set_maxWidth = obj.getAttribute("data-maxwidth") || obj.settings.maxWidth;
       set_overlayColor = obj.getAttribute("data-overlay") || obj.settings.overlayColor;
       set_ratio = obj.getAttribute("data-ratio") || obj.settings.ratio;
       set_autoplay = obj.getAttribute("data-autoplay") || obj.settings.autoplay;
       set_href = obj.getAttribute("data-href") || obj.getAttribute('href');
       set_customclass = obj.getAttribute("data-customclass") || obj.settings.customClass;
       title = obj.getAttribute(obj.settings.titleattr) || '';
       thisborder = obj.getAttribute("data-border") || obj.settings.border;
   }

   /**
    * Close modal.
    */
   function close() {
       if (!current_item || !document.body.classList.contains('vbox-open')) {
           return false;
       }
       if (current_item.settings.onPreClose && typeof current_item.settings.onPreClose === 'function') {
           current_item.settings.onPreClose(current_item, gallIndex, thenext, theprev);
           if (current_item.settings.onPreClose === false) {
               return false;
           }
       }
       document.body.removeEventListener('keydown', keyboardHandler);
       document.body.classList.remove('vbox-open');

       current_item.focus();
       animate({
           duration: 200,
           timing: timingLinear,
           draw: function(progress) {
               overlay.style.opacity =  1 - progress;
               if (progress === 1){
                   overlay.remove();
               }
           }
       });
   }

   /**
    * Navigate gallery.
    */
   function next() {
       navigateGall(thenext);
   }
   function prev() {
       navigateGall(theprev);
   }

   /**
    * Keyboard navigation.
    */
   function keyboardHandler(e) {
       if (e.keyCode === 27) { // esc
           close();
       }
       if (!throttle) {
           if (e.keyCode == 37 && prevok === true) { // <
               navigateGall(theprev);
           }
           if (e.keyCode == 39 && nextok === true) { // >
               navigateGall(thenext);
           }
           /* prevent keyboard processing until timer completed */
           throttle = setTimeout(() => {
               throttle = null;
           }, 100);
       }
   }

   /**
    * Append and fade-in new content
    */
   function contentLoaded(){

       navigationDisabled = false;

       content.style.opacity = 0;

       content.innerHTML = newcontent;

       let vboxChild = content.querySelector(":first-child");

       vboxChild.classList.add('vbox-child');

       vboxChild.style.backgroundColor = current_item.settings.bgcolor;
       vboxChild.style.maxWidth = set_maxWidth;
       vboxChild.style.transform = 'scale(0.9)';
       vboxChild.style.transition = 'transform 200ms';

       // Fix weird drag
       let childImageLock = content.querySelector('.vbox-child img');

       if (childImageLock) {
           childImageLock.addEventListener('dragstart', function(e) {
               e.preventDefault();
           });
       }

       // reset content scroll
       container.scrollTo(0, 0);
       vboxChild.style.transform = 'scale(1)';

       overlay.style.setProperty('--vbox-padding', thisborder);

       // Reset custom classes.
       forEach(overlay.classList, function(obj){
           if (obj !== 'vbox-overlay') {
              overlay.classList.remove(obj);
           }
       });

       // Set custom class.
       if (set_customclass){
           overlay.classList.add(set_customclass);
       }

       animate({
           duration: 200,
           timing: timingLinear,
           draw: function(progress) {
               content.style.opacity = progress;
               if (progress === 1){
                   elPreloader.classList.add('vbox-hidden');
               }
           }
       });
       if (current_item.settings.onContentLoaded && typeof current_item.settings.onContentLoaded === 'function') {
           current_item.settings.onContentLoaded(newcontent);
       }
   }

   /**
    * Check animation state
    * @param {string} state 'loading' | 'animated'
    */
   function checkState(state) {
       if (!content.classList.contains('vbox-' + state)) {
           contentLoaded();
       }
   }

   /**
    * Load iFrame
    */
   function loadIframe(dest, ratio){
       content.classList.add("vbox-loading");
       newcontent = '<div class="venoratio venoratio-' + ratio + '"><iframe src="' + dest + '"></iframe></div>';
       content.classList.remove("vbox-loading");
       checkState('animated');
   }

   /**
    * Load videos
    */
   function loadVid(dest, ratio, autoplay){

       content.classList.add("vbox-loading");

       let stringAutoplay;                    
       // check if it's a video file - thanks to @alexxandar
       if (dest.search(/.+\.mp4|og[gv]|webm/) !== -1) {
           stringAutoplay = autoplay ? " autoplay" : "";
           newcontent = '<div class="venoratio venoratio-' + ratio + '"><video src="' + dest + '"' + stringAutoplay + ' controls>Your browser does not support the video tag.</video></div>';
       } else {
           let player;
           let videoObj = parseVideo(dest);

           // set rel=0 to hide related videos at the end of YT + optional autoplay
           stringAutoplay = autoplay ? "?rel=0&autoplay=1" : "?rel=0";
           let queryvars = stringAutoplay + getUrlParameter(dest);

           if (videoObj.type == 'vimeo') {
             player = 'https://player.vimeo.com/video/';
           } else if (videoObj.type == 'youtube') {
             player = 'https://www.youtube.com/embed/';
           }
           newcontent = '<div class="venoratio venoratio-' + ratio + '"><iframe webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay" frameborder="0" src="'+player+videoObj.id+queryvars+'"></iframe></div>';
       }

       content.classList.remove("vbox-loading");
       checkState('animated');
   }

   /**
    * Load inline content
    */
   function loadInline(dest){
       let inlineContent = document.querySelector(dest);
       if (inlineContent) {
           content.classList.add("vbox-loading");
           newcontent = '<div class="vbox-inline">' + inlineContent.innerHTML + '</div>';
           content.classList.remove("vbox-loading");
           checkState('animated');
       }
   }

   /**
    * Preload images from ajax call
    */
   function loadAjaxImages(){
       images = getImages(newcontent);
       if (images.length) {
           let imgCounter = 0;
           forEach(images, function(getimg){
               let srcimg = getimg.src;
               imgLoader = new Image();
               imgLoader.onload = function(){
                   imgCounter++;
                   if ( imgCounter == images.length ) {
                       content.classList.remove("vbox-loading");
                       checkState('animated');
                   }
               };
               imgLoader.onerror = function(){
                   imgCounter++;
                   if ( imgCounter == images.length ) {
                       content.classList.remove("vbox-loading");
                       checkState('animated');
                   }
               };
               imgLoader.src = srcimg;
           });
       } else {
           content.classList.remove("vbox-loading");
           checkState('animated');
       }
   }

   /**
    * Load Ajax
    */
   function loadAjax(dest){
       content.classList.add("vbox-loading");
       let xhr = new XMLHttpRequest();
       xhr.open("GET", dest, true);
       xhr.onload = function() {
           newcontent = '<div class="vbox-inline">'+ xhr.response +'</div>';
           loadAjaxImages();
       };
       xhr.onerror = function() {
           newcontent = '<div class="vbox-inline"></div>';
           content.classList.remove("vbox-loading");
           checkState('animated');
       };
       xhr.send();
   }

   /**
    * Preload image
    */
   function loadImage(dest){
       
       imgLoader.onload = function(){
           // image  has been loaded
           newcontent = '<div class="vbox-child"><img src="' + dest + '"></div>';
           content.classList.remove('vbox-loading');
           checkState('animated');
       };
       imgLoader.src = dest;
   }

   /**
    * Start Drag
    */
   function dragStart(e) {
       if (!navigationDisabled) {
           let speed = (current_item.settings.navSpeed * 0.84);
           content.style.transition = 'margin '+ speed + 'ms ease-out, opacity '+ speed + 'ms ease-out';
           startY = endY = e.pageY;
           startX = endX = e.pageX;
           startouch = true;
       }
   }

   /**
    * End Drag
    */
   function dragEnd(e) {
       if (startouch) {
           startouch = false;
           let subject = current_item;
           let change = false;
           diff = endX - startX;

           if (diff < 0 && nextok) {
               subject = thenext;
               change = true;
           }
           if (diff > 0 && prevok) {
               subject = theprev;
               change = true;
           }

           if (Math.abs(diff) >= threshold && change) {
               navigateGall(subject);
           } else {
               content.style.marginLeft = 0;
               content.style.opacity = 1;
           }
       }
   }

   /**
    * Drag items
    */
   function drag(e) {
       if (startouch && !navigationDisabled) {
           endX = e.pageX;
           endY = e.pageY;
           diffX = endX - startX;
           diffY = endY - startY;

           let absdiffX = Math.abs(diffX);
           let absdiffY = Math.abs(diffY);

           if ((absdiffX > absdiffY) && (absdiffX <= 180)) {
               let diffopac = (1 - absdiffX / 180) * 1.5;
               e.preventDefault();
               content.style.marginLeft = diffX + 'px';
               content.style.opacity = diffopac;
           }
       }
   }


   function setShareButtons(href){
       // Navigator share
       if (navigator.canShare) {
           const shareData = {
               url: href
           };
           blockshare.insertAdjacentHTML('beforeend', '<div class="vbox-link-btn vbox-share-mobile">'+shareIcon+'</div>');
           const mobileShareBtn = blockshare.querySelector('.vbox-share-mobile');
           mobileShareBtn.addEventListener('click', function(e){
               e.preventDefault();
               navigator.share(shareData);
           });
       }

       // Download
       blockshare.insertAdjacentHTML('beforeend', '<a target="_blank" href="'+href+'" download>'+downloadIcon+'</a>');

       // Copy link
       blockshare.insertAdjacentHTML('beforeend', '<div class="vbox-tooltip"><div class="vbox-link-btn vbox-share-copy"><span class="vbox-tooltip-text" id="myTooltip"></span>'+linkIcon+'</div ></div>');
       const shareCopyBtn = blockshare.querySelector('.vbox-share-copy');
       shareCopyBtn.addEventListener('click', function(e){
           e.preventDefault();
           let tooltip = document.getElementById("myTooltip");
           navigator.clipboard.writeText(href).then(function() {
             tooltip.innerHTML = '<div class="vbox-tooltip-inner">Copied</div>';
           }, function() {
               console.log('copy failed');
           });
       });
   }

   /**
    * Check navigation
    * @param {object} el Current item
    */
   function checknav(el){

       if (!el) {
           return false;
       }

       thisgall = el.dataset.gall;
       numeratio = el.settings.numeration;
       infinigall = el.settings.infinigall;
       blockshare.innerHTML = '';

       let vbtype = el.dataset.vbtype;

       if (el.settings.share && vbtype !== 'iframe' && vbtype !== 'inline' && vbtype !== 'ajax' ) {
           setShareButtons(el.href);
       }

       items = document.querySelectorAll('.vbox-item[data-gall="' + thisgall + '"]');

       current_index = Array.prototype.indexOf.call(items, el);

       if (items.length < 2) {
           infinigall = false;
           numeratio = false;
       }

       thenext = items[current_index + 1];
       theprev = items[current_index - 1];

       if (!thenext && infinigall) {
           thenext = items[0];
       }

       if (!theprev && infinigall) {
           theprev = items[items.length - 1];
       }

       // Update gallery numeration
       if (items.length >= 1) {
           gallIndex = current_index + 1;
           blocknum.innerHTML = gallIndex + ' / ' + items.length;
       } else {
           gallIndex = 1;
       }
       if (numeratio) {
           blocknum.classList.remove('vbox-hidden');
       } else {
           blocknum.classList.add('vbox-hidden');
       }

       // Update title
       if (title !== '') {
           blocktitle.classList.remove('vbox-hidden');
       } else {
           blocktitle.classList.add('vbox-hidden');
       }
       blocktitle.innerHTML = title;

       // update navigation arrows
       prevok = false;
       nextok = false;

       if (thenext || infinigall) {
           nextok = true;
       }

       if (current_index > 0 || infinigall) {
           prevok = true;
       }

       // activate swipe
       if ((prevok || nextok) && el.settings.navTouch) {
           content.classList.add('vbox-grab');
           content.addEventListener("touchstart", dragStart, false);
           content.addEventListener("touchend", dragEnd, false);
           content.addEventListener("touchmove", drag, false);
           content.addEventListener("mousedown", dragStart, false);
           content.addEventListener("mouseup", dragEnd, false);
           content.addEventListener("mouseout", dragEnd, false);
           content.addEventListener("mousemove", drag, false);
       } else {
           content.classList.remove('vbox-grab');
           content.removeEventListener("touchstart", dragStart, false);
           content.removeEventListener("touchend", dragEnd, false);
           content.removeEventListener("touchmove", drag, false);
           content.removeEventListener("mousedown", dragStart, false);
           content.removeEventListener("mouseup", dragEnd, false);
           content.removeEventListener("mouseout", dragEnd, false);
           content.removeEventListener("mousemove", drag, false);
       }

       let vbox_next = overlay.querySelector('.vbox-next');
       let vbox_prev = overlay.querySelector('.vbox-prev');

       if (prevok) {
           vbox_prev.classList.remove('vbox-hidden');
       } else {
           vbox_prev.classList.add('vbox-hidden');
       }

       if (nextok) {
           vbox_next.classList.remove('vbox-hidden');
       } else {
           vbox_next.classList.add('vbox-hidden');
       }

       if (!el.settings.navigation) {
           vbox_next.classList.add('vbox-hidden');
           vbox_prev.classList.add('vbox-hidden');
       }
   } // Checknav

   /**
    * Update overlay and tools style.
    */
   function updateOverlay(destination){

       if (!destination) {
           return false;
       }

       backdrop.style.backgroundColor = set_overlayColor;

       // Custom preloader color.
       elPreloaderInner.innerHTML = createspinner(spinners[destination.settings.spinner]);

       overlay.style.setProperty('--sk-color', destination.settings.spinColor);

       elPreloader.classList.remove('vbox-hidden');

       blockshare.classList.remove('vbox-top', 'vbox-bottom');
       blocktitle.classList.remove('vbox-top', 'vbox-bottom');

      if (destination.settings.titlePosition == 'top') {
           blocktitle.classList.add('vbox-top');
           blockshare.classList.add('vbox-bottom');
       } else {
           blocktitle.classList.add('vbox-bottom');
           blockshare.classList.add('vbox-top');
       }

       let titleWidth = destination.settings.titleStyle === 'bar' ? '100%' : 'auto';
       let titleRadius = destination.settings.titleStyle === 'pill' ? '5em' : '0';
       let shareWidth = destination.settings.shareStyle === 'bar' ? '100%' : 'auto';
       let shareRadius = destination.settings.shareStyle === 'pill' ? '5em' : '0';
       let titlebg = destination.settings.titleStyle === 'transparent' ? 'transparent' : destination.settings.toolsBackground;
       let sharebg = destination.settings.shareStyle === 'transparent' ? 'transparent' : destination.settings.toolsBackground;

       overlay.style.setProperty('--vbox-title-width', titleWidth);
       overlay.style.setProperty('--vbox-title-radius', titleRadius);
       overlay.style.setProperty('--vbox-share-width', shareWidth);
       overlay.style.setProperty('--vbox-share-radius', shareRadius);
       overlay.style.setProperty('--vbox-tools-color', destination.settings.toolsColor);
       overlay.style.setProperty('--vbox-title-background', titlebg);
       overlay.style.setProperty('--vbox-share-background', sharebg);
   }

   /**
    * Load content
    */
   function loadContent(){
       if (!current_item) {
           return false;
       }
       let vbtype = current_item.dataset.vbtype;

       switch (vbtype) {
       case 'iframe':
           loadIframe(set_href, set_ratio);
       break;
       case 'inline':
           loadInline(set_href);
       break;
       case 'ajax':
           loadAjax(set_href);
       break;
       case 'video':
           loadVid(set_href, set_ratio, set_autoplay);
       break;
       default:
           loadImage(set_href);
       }
   }

   /**
    * Gallery navigation.
    */
   function navigateGall(destination) {

       if (!destination || navigationDisabled || !document.body.classList.contains('vbox-open')) {
           return false;
       }

       updateVars(destination);
       updateOverlay(destination);

       // swipe out item
       let speed = (current_item.settings.navSpeed * 0.84);
       content.style.transition = 'margin '+ speed + 'ms ease-out, opacity '+ speed + 'ms ease-out';

       if (destination === theprev) {
         content.classList.add("swipe-right");
       }
       if (destination === thenext) {
         content.classList.add("swipe-left");
       }

       elPreloader.classList.remove('vbox-hidden');

       let startopacity = content.style.opacity;

       content.classList.add("vbox-animated", "vbox-loading");

       checknav(destination);

       animate({
           duration: current_item.settings.navSpeed,
           timing: timingLinear,
           draw: function(progress) {

               content.style.opacity = startopacity - progress/startopacity;

               if (progress === 1){
                   content.classList.remove("swipe-left", "swipe-right", "vbox-animated");
                   content.style.marginLeft = 0;
                   content.style.transition = '';

                   checkState('loading');

                   navigationDisabled = false;

                   if (current_item.settings.onNavComplete && typeof current_item.settings.onNavComplete === 'function') {
                       current_item.settings.onNavComplete(current_item, gallIndex, thenext, theprev);
                   }
               }
           }
       });
       loadContent();
   }

   /**
    * Open item.
    */
    function open(obj) {

       if (document.body.classList.contains('vbox-open') || !obj) {
           return false;
       }

       if (obj.settings.onPreOpen && typeof obj.settings.onPreOpen === 'function') {
           obj.settings.onPreOpen(obj);
       }
       if (!obj.settings.onPreOpen) {
           return false;
       }

       updateVars(obj);

       document.body.insertAdjacentHTML('beforeend', core);
       document.body.classList.add('vbox-open');

       overlay = document.querySelector(".vbox-overlay");
       backdrop = overlay.querySelector(".vbox-backdrop");
       container = overlay.querySelector(".vbox-container");
       content = container.querySelector(".vbox-content");
       blocknum = overlay.querySelector(".vbox-num");
       blockshare = overlay.querySelector(".vbox-share");
       blocktitle = overlay.querySelector(".vbox-title");
       elPreloader = overlay.querySelector(".vbox-preloader");
       elPreloaderInner = elPreloader.querySelector(".vbox-preloader-inner");

       overlay.style.opacity = 0;

       updateOverlay(obj);
       checknav(obj);

       content.classList.add("vbox-animated", "vbox-loading");

       // fade in overlay
       animate({
           duration: 200,
           timing: timingLinear,
           draw: function(progress) {
               overlay.style.opacity = progress;
               if (progress === 1){
                   content.classList.remove('vbox-animated');
                   navigationDisabled = false;
                   checkState('loading');
                   if (current_item.settings.onPostOpen && typeof current_item.settings.onPostOpen === 'function') {
                       current_item.settings.onPostOpen(current_item, gallIndex, thenext, theprev);
                   }
               }
           }
       });

       loadContent();

       // Keyboard actions
       if (obj.settings.navKeyboard) {
           document.body.addEventListener('keydown', keyboardHandler);

           // Reset the throttle timer
           document.body.addEventListener('keyup', () => {
               if (throttle) {
                   clearTimeout(throttle);
                   throttle = null;
               }
           });
       }

       // Prev gallery
       document.querySelector('.vbox-prev').addEventListener('click', function(){
           navigateGall(theprev);
       });

       // Newxt gallery
       document.querySelector('.vbox-next').addEventListener('click', function(){
           navigateGall(thenext);
       });

       // Close modal.
       overlay.addEventListener('click', function(e){
           let closeBtn = document.querySelector('.vbox-close');
           if (closeBtn) {
               if (closeBtn.contains(e.target) || closeBtn === e.target || (current_item.settings.overlayClose &&
                   e.target.classList.contains('vbox-overlay') ||
                   e.target.classList.contains('vbox-content') ||
                   e.target.classList.contains('vbox-backdrop') ||
                   e.target.classList.contains('vbox-close') ||
                   e.target.classList.contains('vbox-preloader') ||
                   e.target.classList.contains('vbox-container')
               )) {
                   close();
               }
           }
       });
   }

   /**
    * Initialize Plugin
    */
   function init(venobox, settings) {

       if (settings.onInit && typeof settings.onInit === 'function') {
           settings.onInit(venobox);
       }

       let selectors = settings.jQuerySelectors || document.querySelectorAll(settings.selector);
       let navigation = '<a class="vbox-next"><span>Next</span></a><a class="vbox-prev"><span>Prev</span></a>';
       let vbheader = '<div class="vbox-title"></div><div class="vbox-left-corner"><div class="vbox-num">0/0</div></div><div class="vbox-close"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="vbox-close-icon" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg></div>';
       let vbfooter = '<div class="vbox-share"></div>';
       let preloader = '<div class="vbox-preloader"><div class="vbox-preloader-inner"></div></div>';
       core = '<div class="vbox-overlay"><div class="vbox-backdrop"></div>' + preloader + '<div class="vbox-container"><div class="vbox-content"></div></div>' + vbheader + navigation + vbfooter + '</div>';

       /**
        *  Loop items.
        */
       forEach(selectors, function(obj){
           if (obj.classList.contains("vbox-item")) {
               return true;
           }
           obj.settings = settings;
           obj.classList.add("vbox-item");

           // Open Link
           obj.addEventListener("click", function(e){
               e.preventDefault();
               // Remove focus from link to avoid multiple calls with enter key
               obj.blur();
               open(obj);
               return false;
           }); // Click;
       }); // forEach

       if (settings.popup) {
           let popup = document.querySelector(settings.popup);
           popup.settings = settings;
           open(popup);
       }
   } // init

   /**
    * VenoBox constructor
    */
   const VenoBox = function (options) {
       const venobox = {};

       // Merge user options with defaults
       let settings = extend( defaults, options || {} );

       venobox.close = close;
       venobox.next = next;
       venobox.prev = prev;
       venobox.open = open;
       venobox.settings = settings;

       init(venobox, settings);

       // Public APIs
       return venobox;
   };

   /* jQuery bridge for $().venobox() */
   if (typeof jQuery === 'function') {
       (function($){
           $.fn.extend({
               // plugin name - venobox
               venobox: function(options) {
                   const pluginoptions = options || {};
                   pluginoptions.jQuerySelectors = this;
                   // Init venobx
                   new VenoBox({pluginoptions});
               } // venobox
           }); // extend
       })(jQuery);
   }

   // See https://www.npmjs.com/package/venobox documentation.

   return VenoBox;

})));
