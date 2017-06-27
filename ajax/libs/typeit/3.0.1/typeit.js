/**
 * jQuery TypeIt
 * @author Alex MacArthur (http://macarthur.me)
 * @version 3.0.1
 * @copyright 2016 Alex MacArthur
 * @description Types out a given string or strings.
 */

 (function($, undefined){

  $.fn.typeIt = function(opt, cb){
   return this.each(function(){
     $(this).data("typeit", new $.fn.typeIt.tClass($(this), opt, cb));
   });
  };

  // Accepts element, options, and callback function.
  $.fn.typeIt.tClass = function(e, o, c) {
    var t = this;

    t.d = {
      strings: 'Your default string.',
      speed: 100,
      lifeLike: true,
      cursor: true,
      cursorSpeed: 1000,
      breakLines: true,
      breakDelay: 750,
      startDelay: 250,
      loop: false,
      loopDelay: 750,
      html: true 
     };

    t.dd = {
      strings: e.data('typeitStrings'),
      speed: e.data('typeitSpeed'),
      lifeLike: e.data('typeitLifelike'),
      cursor: e.data('typeitCursor'),
      cursorSpeed: e.data('typeitCursorspeed'),
      breakLines: e.data('typeitBreaklines'),
      breakDelay: e.data('typeitBreakdelay'),
      startDelay: e.data('typeitStartdelay'),
      loop: e.data('typeitLoop'),
      loopDelay: e.data('typeitLoopdelay'),
      html: e.data('typeitHtml')
    };

    t.s = $.extend({}, t.d, o, t.dd);
    t.el = e;
    t.cb = c; 
    t.valCB(t);
    t.elCheck(t);   
    t.init(t, o);
  };

 var p = $.fn.typeIt.tClass.prototype;

 p.init = function(t){
  t.CI = 0;
  t.SEI = 0; 
  t.SI = 0; 
  t.SA = []; 
  t.BD = t.s.breakDelay;
  t.span = '<span style="display:inline-block;width:0;height:0;overflow:hidden;">_</span>';

  t.toArr(t);
  t.rake(t);

  t.el.html('<span style="display:inline;position:relative;font:inherit;"></span>');
  t.tel = t.el.find('span');
  t.insert = function(c) { t.tel.append(c); };

  t.cursor(t);
  t.to(function() {
    t.type(t);
  }.bind(t), t.s.startDelay);
 };

  p.valCB = function(t) {
    t.cb = t.cb === undefined ? function(){return;} : t.cb;
  };

  p.to = function(fn, t) {
    setTimeout(function() {
      fn();
    }.bind(t), t);
  };

  p.elCheck = function(t) {
    if(t.el.html().length > 0) {
      t.s.strings = t.el.html().trim();
    }
  };

  p.toArr = function(t) {
    var s = t.s.strings;
    t.SA = s.constructor === Array ? s.slice(0) : s.split('<br>');
  };

  p.cursor = function(t) {
    if(t.s.cursor) {
      t.el.append('<i class="c">|</i>');
      var s = t.s.cursorSpeed;
      (function loop() {
        t.el.find('.c').fadeTo(s/2, 0).fadeTo(s/2, 1);
        t.to(loop, s);
      })();
    }
  };

 /*
  Convert each string in the array to a sub-array. While happening, search the subarrays for HTML tags. 
  When a complete tag is found, slice the subarray to get the complete tag, insert it at the correct index, 
  and delete the range of indexes where the indexed tag used to be.
  */
  p.rake = function(t) {

    for(var i = 0; i < t.SA.length; i++) {
      t.SA[i] = t.SA[i].split('');

      if(t.s.html) {
        t.tPos = [];
        var p = t.tPos;
        t.SEI = 0;
        var tag;
        var en = false;
        for(var j = 0; j < t.SA[i].length; j++) {

          if(t.SA[i][j] === '<' || t.SA[i][j] === '&') {
            p[0] = j;
            en = t.SA[i][j] === '&' ? true : false;
          }

          if(t.SA[i][j] === '>' || (t.SA[i][j] === ';' && en)) {
            p[1] = j;
            j = 0;
            tag = (t.SA[i].slice(p[0], p[1]+1)).join('');
            t.SA[i].splice(p[0], (p[1]-p[0]+1), tag);
            en = false;
          }
        }
      }
    }
  };

  p.random = function(t) {
    var s = t.s.speed;
    var r = s/2;
    t.DT = (t.s.lifeLike) ? Math.abs(Math.random() * ((s+r) - (s-r)) + (s-r)) : s;
  };

  p.type = function(t){
    t.curStr = t.SA[t.SI];
    var csLen = t.curStr.length;
    var saLen = t.SA.length;
    t.tTO = t.to(function () {
      t.random(t);
      var chr = t.SA[t.SI][t.CI];
      if(chr.indexOf('<') !== -1 && chr.indexOf('</') === -1 && t.s.html){
        t.makeNode(t, chr);
      }
      t.print(t, chr);
      t.CI++;

      // More chars to be typed.
      if (t.CI < csLen) {
        t.type(t);

      // More strings to be typed.
      } else if(saLen > 1) {
        t.CI = 0;

        // Multiple strings ending.
        if(t.SI + 1 === saLen) {
          t.end(t);

        // Strings still to go, breakLines = false
        } else if((t.SI + 1 < saLen) && !t.s.breakLines){
          t.to(function(){
            t.delete(t);
          }.bind(t), t.BD);

        // Strings still to go, breakLines = true
        } else if (t.SI + 1 < saLen && t.s.breakLines){
          t.SI++;
          t.to(function(){
            t.insert('<br>');
            t.to(function(){
              t.type(t);
            }.bind(t), t.BD);
          }.bind(t), t.BD);
        }

        // No more strings.
      } else {
        t.end(t);
      }
    }.bind(t), t.DT);
  };

  /*
    Get the start & ending positions of the string inside HTML opening & closing angle brackets, 
    and then create a DOM element of that string/tag name.
  */
  p.makeNode = function(t, chr) {
    t.SEI = 0;
    t.tPos[0] = t.CI + 1;
    for(var d = t.CI; d < t.curStr.length; d++){
      if(t.curStr[d].indexOf('</') !== -1) {
        t.tPos[1] = d - 1;
        break;
      }
    }
    t.tag = $($.parseHTML(chr));
    t.print(t, t.tag);
    t.inTag = true;
  };

  p.end = function(t) {
    if(t.s.loop){
      t.to(function(){
        t.delete(t);
      }.bind(t), t.s.loopDelay);
    } else {
      t.cb();
    }
  };

  p.print = function(t, chr) {
    if(t.inTag) {
      var chr2 = t.curStr[t.tPos[0] + t.SEI];
      $(t.tag, t.el).last().append(chr2);
      t.inTag = (t.tPos[1] === t.tPos[0] + t.SEI - 1) ? false : true;
      t.SEI++;
    } else {
      this.insert(chr);
    }
  };

  /*
    If show cursor is enabled, move array starting point for the for loop back one,
    so that the loop will not find the closing tag and delete the cursor.
  */
  p.delete = function(t, undefined) {
    t.dTO = t.to(function () {
      t.random(t);
      var a = t.tel.html().split("");
      for (var n = a.length - 1; n > -1; n--) {
        if((a[n] === '>' || a[n] === ';') && t.s.html) {
          for(var o = n; o > -1; o--) {

            if(a.slice(o-3, o+1).join('') === '<br>') {
              a.splice(o-3, 4);
              break;
            }

            if(a[o] === '&') {
              a.splice(o, n-o+1);
              break;
            }

            if(a[o] === '<') {
              if(a[o-1] !== '>') {
                if(a[o-1] === ';') {
                  for(var p = o-1; p > -1; p--) {
                    if(a[p] === '&') {
                      a.splice(p, o-p);
                      break;
                    }
                  }
                }

                a.splice(o-1, 1);
                break;
              }
            }
          }
          break;
        }
        else {
          a.splice(n, 1);
          break;
        }
      }
      
      t.tel.html(a.join(''));

      if(t.tel.text().length <= 1){
        t.tel.html('');
      } 

      // Characters still in the string.
      if (t.tel.text().length > 0) {
        t.delete(t);
      
      // Strings still in the array.
      } else if(t.SA[t.SI+1] !== undefined){
        t.SI++;
        t.type(t);

      // Last string, start over if loop = true.
      } else if (t.s.loop){
        t.init(t);
      }
    }.bind(t), t.DT/3);
  };

}(jQuery));
