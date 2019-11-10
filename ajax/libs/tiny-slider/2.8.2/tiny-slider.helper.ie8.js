// forEach

if (!Array.prototype.forEach) {
  Array.prototype.forEach =  function(block, thisObject) {
    var len = this.length >>> 0;
    for (var i = 0; i < len; i++) {
      if (i in this) {
        block.call(thisObject, this[i], i, this);
      }
    }
  };
}

// map
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
if (!Array.prototype.map) {
    Array.prototype.map = function(fun /*, thisp*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function")
          throw new TypeError();

        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this)
                res[i] = fun.call(thisp, this[i], i, this);
        }

        return res;
    };
}

// indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (value /*, fromIndex */ ) {
        var length = this.length;
        if (!length)
            return -1;
        var i = arguments[1] || 0;
        if (i >= length)
            return -1;
        if (i < 0)
            i += length;
        for (; i < length; i++) {
            if (!Object.prototype.hasOwnProperty.call(this, i))
                continue;
            if (value === this[i])
                return i;
        }
        return -1;
    };
}

// addEventListener
// removeEventListener
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener?redirectlocale=en-US&redirectslug=DOM%2FEventTarget.addEventListener#Compatibility

(function() {
  if (!Element.prototype.addEventListener) {
    var eventListeners=[];
    
    var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var self=this;
      var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (typeof listener.handleEvent != "undefined") {
          listener.handleEvent(e);
        } else {
          listener.call(self,e);
        }
      };
      if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
          if (document.readyState=="complete") {
            wrapper(e);
          }
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
        
        if (document.readyState=="complete") {
          var e=new Event();
          e.srcElement=window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
      }
    };
    var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var counter=0;
      while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
          if (type=="DOMContentLoaded") {
            this.detachEvent("onreadystatechange",eventListener.wrapper);
          } else {
            this.detachEvent("on"+type,eventListener.wrapper);
          }
          eventListeners.splice(counter, 1);
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener=addEventListener;
    Element.prototype.removeEventListener=removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener=addEventListener;
      HTMLDocument.prototype.removeEventListener=removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener=addEventListener;
      Window.prototype.removeEventListener=removeEventListener;
    }
  }
})();

// getComputedStyle

(function(){
  
  if(!window.getComputedStyle){
    window.getComputedStyle = function(el){
      if(!el) { return null; }
      
      /**
       * currentStyle returns an instance of a non-standard class called "CSSCurrentStyleDeclaration"
       * instead of "CSSStyleDeclaration", which has a few methods and properties missing (such as cssText).
       * https://msdn.microsoft.com/en-us/library/cc848941(v=vs.85).aspx
       *
       * Instead of returning the currentStyle value directly, we'll copy its properties to the style
       * of a shadow element. This ensures cssText is included, and ensures the result is an instance of
       * the correct DOM interface.
       *
       * There'll still be some minor discrepancies in the style values. For example, IE preserves the way
       * colour values were authored, whereas standards-compliant browsers will expand colours to use "rgb()"
       * notation. We won't bother to fix things like these, as they'd involve too much fiddling for little
       * gain.
       */
      
      var style   = el.currentStyle;
      var box     = el.getBoundingClientRect();
      var shadow  = document.createElement("div");
      var output  = shadow.style;
      for(var i in style) {
        output[i] = style[i];
      }
      
      /** Fix some glitches */
      output.cssFloat = output.styleFloat;
      if("auto" === output.width) { output.width  = (box.right - box.left) + "px"; }
      if("auto" === output.height) { output.height = (box.bottom - box.top) + "px"; }
      return output;
    };
  } 
})();

// import "./ie8/isArray.js";
