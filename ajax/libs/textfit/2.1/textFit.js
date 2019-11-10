/**
 * textFit v2.0
 * Previously known as jQuery.textFit
 * 8/2013 by STRML (strml.github.com)
 * MIT License
 * 
 * To use: textFit(document.getElementById('target-div'), options);
 * 
 * Will make the *text* content inside a container scale to fit the container
 * The container is required to have a set width and height
 * Uses binary search to fit text with minimal layout calls.
 * Version 2.0 does not use jQuery.
 */
/*global define:true, document:true, window:true, HTMLElement:true*/

(function(root, factory) {
  "use strict";

  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    // Wrap in function so we have access to root via `this`.
    define([], factory);
  } else {
    // Browser globals
    root.textFit = factory();
  }

}(typeof global === "object" ? global : this, function () {
  "use strict";

  return function textFit(els, options) {
    var settings = {
      alignVert: false, // if true, textFit will align vertically using css tables
      alignHoriz: false, // if true, textFit will set text-align: center
      multiLine: false, // if true, textFit will not set white-space: no-wrap
      detectMultiLine: true, // disable to turn off automatic multi-line sensing
      minFontSize: 6,
      maxFontSize: 80,
      reProcess: true, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
      widthOnly: false, // if true, textFit will fit text to element width, regardless of text height
      suppressErrors: false // if true, will not print errors to console
    };

    // Extend options.
    for(var key in options){
      if(options.hasOwnProperty(key)){
        settings[key] = options[key];
      }
    }

    // Convert jQuery objects into arrays
    if (typeof els.toArray === "function") {
      els = els.toArray();
    }

    // Support passing a single el
    var elType = Object.prototype.toString.call(els);
    if (elType !== '[object Array]' && elType !== '[object NodeList]'){
      els = [els];
    }

    for(var i = 0; i < els.length; i++){
      processItem(els[i]);
    }

    function processItem(el){

      if (!isElement(el) || (!settings.reProcess && el.getAttribute('textFitted'))) {
        return false;
      }

      // Set textFitted attribute so we know this was processed.
      if(!settings.reProcess){
        el.setAttribute('textFitted', 1);
      }

      var innerSpan, originalHeight, originalHTML, originalWidth;
      var low, mid, high;

      // Get element data.
      originalHTML = el.innerHTML;
      originalWidth = innerWidth(el);
      originalHeight = innerHeight(el);

      // Don't process if we can't find box dimensions
      if (!originalWidth || (!settings.widthOnly && !originalHeight)) {
        // Show an error, if we can.
        if (window.console && !settings.suppressErrors) {
          if(!settings.widthOnly)
            console.info('Set a static height and width on the target element ' + el.outerHTML +
              ' before using textFit!');
          else
            console.info('Set a static width on the target element ' + el.outerHTML +
              ' before using textFit!');
        }
        return false;
      }

      // Add textFitted span inside this container.
      if (originalHTML.indexOf('textFitted') === -1) {
        innerSpan = document.createElement('span');
        innerSpan.className = 'textFitted';
        // Inline block ensure it takes on the size of its contents, even if they are enclosed
        // in other tags like <p>
        innerSpan.style['display'] = 'inline-block';
        innerSpan.innerHTML = originalHTML;
        el.innerHTML = '';
        el.appendChild(innerSpan);
      } else {
        // Reprocessing.
        innerSpan = el.querySelector('span.textFitted');
        // Remove vertical align if we're reprocessing.
        if (hasClass(innerSpan, 'textFitAlignVert')){
          innerSpan.className = innerSpan.className.replace('textFitAlignVert', '');
        }
      }

      // Prepare & set alignment
      if (settings.alignHoriz) {
        el.style['text-align'] = 'center';
        innerSpan.style['text-align'] = 'center';
      }

      // Check if this string is multiple lines
      // Not guaranteed to always work if you use wonky line-heights
      var multiLine = settings.multiLine;
      if (settings.detectMultiLine && !multiLine &&
          innerSpan.offsetHeight >= parseInt(window.getComputedStyle(innerSpan)['font-size'], 10) * 2){
        multiLine = true;
      }

      // If we're not treating this as a multiline string, don't let it wrap.
      if (!multiLine) {
        el.style['white-space'] = 'nowrap';
      }

      low = settings.minFontSize + 1;
      high = settings.maxFontSize + 1;

      // Binary search for best fit
      while ( low <= high) {
        mid = parseInt((low + high) / 2, 10);
        innerSpan.style.fontSize = mid + 'px';
        if(innerSpan.offsetWidth <= originalWidth && (settings.widthOnly || innerSpan.offsetHeight <= originalHeight)){
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      // Sub 1 at the very end, this is closer to what we wanted.
      innerSpan.style.fontSize = (mid - 1) + 'px';

      // Our height is finalized. If we are aligning vertically, set that up.
      if (settings.alignVert) {
        addStyleSheet();
        var height = innerSpan.offsetHeight;
        if (window.getComputedStyle(el)['position'] === "static"){
          el.style['position'] = 'relative';
        }
        if (!hasClass(innerSpan, "textFitAlignVert")){
          innerSpan.className = innerSpan.className + " textFitAlignVert";
        }
        innerSpan.style['height'] = height + "px";
      }
        
    }

    // Calculate height without padding.
    function innerHeight(el){
      var style = window.getComputedStyle(el, null);
      return el.clientHeight -
        parseInt(style.getPropertyValue('padding-top'), 10) -
        parseInt(style.getPropertyValue('padding-bottom'), 10);
    }

    // Calculate width without padding.
    function innerWidth(el){
      var style = window.getComputedStyle(el, null);
      return el.clientWidth -
        parseInt(style.getPropertyValue('padding-left'), 10) -
        parseInt(style.getPropertyValue('padding-right'), 10);
    }

    //Returns true if it is a DOM element    
    function isElement(o){
      return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
      );
    }

    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    // Better than a stylesheet dependency
    function addStyleSheet() {
      if (document.getElementById("textFitStyleSheet")) return;
      var style = [
        ".textFitAlignVert{",
          "position: absolute;",
          "top: 0; right: 0; bottom: 0; left: 0;",
          "margin: auto;",
        "}"].join("");

      var css = document.createElement("style");
      css.type = "text/css";
      css.id = "textFitStyleSheet";
      css.innerHTML = style;
      document.body.appendChild(css);
    }
  };
}));