/**
 * jQuery TypeIt
 * @author Alex MacArthur (http://macarthur.me)
 * @version 4.2.3
 * @copyright 2016 Alex MacArthur
 * @description Types out a given string or strings.
 */

 /* jslint browser: true */
 /* globals jQuery:false */

(function($, undefined) {

  'use strict';

  var $doc = $(document);

  $.fn.typeIt = function(opt) {
    return this.each(function() {
      var $t = $(this);
      $t.data('typeit', new $.typeIt($t, opt));
    });
  };

  $.typeIt = function(el, opt) {
    this.d = {
      strings: [],
      speed: 100,
      deleteSpeed: undefined,
      lifeLike: true,
      cursor: true,
      cursorSpeed: 1000,
      breakLines: true,
      breakDelay: 750,
      startDelay: 250,
      startDelete: false,
      loop: false,
      loopDelay: 750,
      html: true,
      autoStart: true,
      callback: function() {}
    };

    this.queue = [];
    this.queueIndex = 0;
    this.hasStarted = false;
    this.inTag = false;
    this.stringsToDelete = '';
    this.style = 'style="display:inline;position:relative;font:inherit;color:inherit;"';
    this.s = $.extend({}, this.d, opt);
    this.el = el;
    this._init();
  };

  $.typeIt.prototype = {

    _init: function() {
      this.el.find('.ti-container, .ti-cursor, .ti-placeholder').remove();
      this._elCheck();
      this.s.strings = this._toArray(this.s.strings);
      this.el.html('<i class="ti-placeholder" style="display:inline-block;width:0;line-height:0;overflow:hidden;">.</i><span ' + this.style + ' class="ti-container"></span>');
      this.tel = this.el.find('span');

      this.insert = function(c) {
        this.tel.append(c);
      };

      if (this.s.startDelete) {
        this.tel.html(this.stringsToDelete);
        this.queue.push([this.delete]);
      }

      this._generateQueue();
      this._kickoff();
    },

    _kickoff: function() {
      this._cursor();

      if (this.s.autoStart) {
        this._startQueue();
      } else {
        if (this._isVisible()) {
          this.hasStarted = true;
          this._startQueue();
        } else {
          $doc.on('scroll', function() {
            if (this._isVisible() && !this.hasStarted) {
              this.hasStarted = true;
              this._startQueue();
            }
          }.bind(this));
        }
      }
    },

    _generateQueue: function() {
      for (var i = 0; i < this.s.strings.length; i++) {

        this.queue.push([this.type, this.s.strings[i]]);

        if (i < (this.s.strings.length - 1)) {
          var curPos = this.queue.length;
          this.queue.push([this.s.breakLines ? this.break : this.delete]);

          if (this.s.breakLines) {
            this.queue.splice(curPos, 0, [this.pause, this.s.breakDelay / 2]);
            this.queue.splice(curPos + 2, 0, [this.pause, this.s.breakDelay / 2]);
          }
        }
      }
    },

    _startQueue: function() {
      this._to(function() {
        this._executeQueue();
      }.bind(this), this.s.startDelay);
    },

    /*
      Pass in a string, and loop over that string until empty. Then return true.
    */
    type: function(string, rake) {

      // set default 'rake' value
      rake = typeof rake === 'undefined' ? true : rake;

      // convert to array
      string = this._toArray(string);

      // if it's designated, rake that bad boy for HTML tags and stuff
      if (rake) {
        string = this._rake(string);
        string = string[0];
      }

      // do the work that matters
      this.tTO = setTimeout(function() {

        // randomize the timeout each time, if that's your thing
        this._setPace(this);

        // "_print" the character
        // if an opening HTML tag is found and we're not already pringing inside a tag
        if (this.s.html && (string[0].indexOf('<') !== -1 && string[0].indexOf('</') === -1) && (!this.inTag)) {

          // loop the string to find where the tag ends
          for (var i = string.length - 1; i >= 0; i--) {
            if (string[i].indexOf('</') !== -1) {
              this.tagCount = 1;
              this.tagDuration = i;
            }
          }

          this._makeNode(string[0]);
        } else {
          this._print(string[0]);
        }

        // shorten it
        string.splice(0, 1);

        // if there's more to it, run again until fully printed
        if (string.length) {
          this.type(string, false);
        } else {
          this._executeQueue();
        }

      }.bind(this), this.typePace);
    },

    pause: function(time) {
      time = time === undefined ? this.s.breakDelay : time;
      this._to(function() {
        this._executeQueue();
      }.bind(this), time);
    },

    break: function() {
      this.insert('<br>');
      this._executeQueue();
    },

    mergeSet: function(s) {
      this.s = $.extend({}, this.s, s);
      this._executeQueue();
    },

    _print: function(chr) {
      if (this.inTag) {
        $(this.tag, this.el).last().append(chr);
        if (this.tagCount < this.tagDuration) {
          this.tagCount++;
        } else {
          this.inTag = false;
        }
      } else {
        this.insert(chr);
      }
    },

    /*
    If show cursor is enabled, move array starting point for the for loop back one,
    so that the loop will not find the closing tag and delete the cursor.
  */
    delete: function(chars) {

      this.dTO = setTimeout(function() {

        this._setPace();

        var a = this.tel.html().split("");

        var amount = chars === undefined || chars === null ? a.length - 1 : chars + 1;

        // cut the array by a character
        for (var n = a.length - 1; n > -1; n--) {

          if ((a[n] === '>' || a[n] === ';') && this.s.html) {
            for (var o = n; o > -1; o--) {

              if (a.slice(o - 3, o + 1).join('') === '<br>') {
                a.splice(o - 3, 4);
                break;
              }

              if (a[o] === '&') {
                a.splice(o, n - o + 1);
                break;
              }

              if (a[o] === '<') {
                if (a[o - 1] !== '>') {
                  if (a[o - 1] === ';') {
                    for (var p = o - 1; p > -1; p--) {
                      if (a[p] === '&') {
                        a.splice(p, o - p);
                        break;
                      }
                    }
                  }

                  a.splice(o - 1, 1);
                  break;
                }
              }
            }
            break;
          } else {
            a.pop();
            break;
          }

        }

        // if we've found an empty set of HTML tags...
        if (this.tel.html().indexOf('></') > -1) {
          for (var i = this.tel.html().indexOf('></') - 2; i >= 0; i--) {
            if (a[i] === '<') {
              a.splice(i, a.length - i);
              break;
            }
          }
        }

        this.tel.html(a.join(''));

        // characters still in the string.
        if (amount > (chars === undefined ? 0 : 2)) {
          this.delete(chars === undefined ? undefined : chars - 1);
        } else {
          this._executeQueue();
        }
      }.bind(this), this.deletePace);
    },

    _isVisible: function() {
      var win = $(window);

      var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
      };
      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();

      var height = this.el.outerHeight();
      var width = this.el.outerWidth();

      if (!width || !height) {
        return false;
      }

      var bounds = this.el.offset();
      bounds.right = bounds.left + width;
      bounds.bottom = bounds.top + height;

      var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

      if (!visible) {
        return false;
      }

      var deltas = {
        top: Math.min(1, (bounds.bottom - viewport.top) / height),
        bottom: Math.min(1, (viewport.bottom - bounds.top) / height),
        left: Math.min(1, (bounds.right - viewport.left) / width),
        right: Math.min(1, (viewport.right - bounds.left) / width)
      };

      return (deltas.left * deltas.right) >= 1 && (deltas.top * deltas.bottom) >= 1;
    },

    /* 
      Advance the function queue to execute the next function after the previous one has finished.
    */
    _executeQueue: function() {
      if (this.queueIndex < this.queue.length) {
        var thisFunc = this.queue[this.queueIndex];
        this.queueIndex++;

        // delay execution if looping back to the beginning of the queue.
        if (this.isLooping && this.queueIndex === 1) {
          this._to(function() {
            thisFunc[0].bind(this)(thisFunc[1]);
          }.bind(this), this.s.loopDelay / 2);
        } else {
          thisFunc[0].bind(this)(thisFunc[1]);
        }
      } else {
        if (this.s.loop) {
          this.queueIndex = 0;
          this.isLooping = true;
          this._to(function() {
            this.delete();
          }.bind(this), this.s.loopDelay / 2);
        } else {
          this.s.callback();
        }
      }
    },

    _to: function(fn, time) {
      setTimeout(function() {
        fn();
      }.bind(this), time);
    },

    _elCheck: function() {
      if (!this.s.startDelete && this.el.html().length > 0) {
        this.s.strings = this.el.html().trim();
      } else if (this.s.startDelete) {
        this.stringsToDelete = this.el.html();
      }
    },

    _toArray: function(str) {
      return str.constructor === Array ? str.slice(0) : str.split('<br>');
    },

    _cursor: function() {
      if (this.s.cursor) {
        this.el.append('<span ' + this.style + 'class="ti-cursor">|</span>');
        var s = this.s.cursorSpeed;
        var t = this;
        (function loop() {
          t.el.find('.ti-cursor').fadeTo(s / 2, 0).fadeTo(s / 2, 1);
          t._to(loop, s);
        })();
      }
    },

    _setPace: function() {
      var typeSpeed = this.s.speed;
      var deleteSpeed = this.s.deleteSpeed !== undefined ? this.s.deleteSpeed : this.s.speed / 3;
      var typeRange = typeSpeed / 2;
      var deleteRange = deleteSpeed / 2;

      this.typePace = this.s.lifeLike ? this._randomInRange(typeSpeed, typeRange) : typeSpeed;
      this.deletePace = this.s.lifeLike ? this._randomInRange(deleteSpeed, deleteRange) : deleteSpeed;
    },

    _randomInRange: function(value, range) {
      return Math.abs(Math.random() * ((value + range) - (value - range)) + (value - range));
    },

    /*
    Convert each string in the array to a sub-array. While happening, search the subarrays for HTML tags. 
    When a complete tag is found, slice the subarray to get the complete tag, insert it at the correct index, 
    and delete the range of indexes where the indexed tag used to be.
    */
    _rake: function(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = array[i].split('');

        if (this.s.html) {
          this.tPos = [];
          var p = this.tPos;
          var tag;
          var en = false;
          for (var j = 0; j < array[i].length; j++) {

            if (array[i][j] === '<' || array[i][j] === '&') {
              p[0] = j;
              en = array[i][j] === '&' ? true : false;
            }

            if (array[i][j] === '>' || (array[i][j] === ';' && en)) {
              p[1] = j;
              j = 0;
              tag = (array[i].slice(p[0], p[1] + 1)).join('');
              array[i].splice(p[0], (p[1] - p[0] + 1), tag);
              en = false;
            }
          }
        }
      }

      return array;
    },

    /*
      Get the start & ending positions of the string inside HTML opening & closing angle brackets, 
      and then create a DOM element of that string/tag name.
    */
    _makeNode: function(char) {
      this.tag = $($.parseHTML(char));
      this._print(this.tag);
      this.inTag = true;
    }
  };

  $.fn.tiType = function(str) {
    var i = $(this).data('typeit');
    if (i === undefined) return $doc;
    i.queue.push([i.type, str]);
    return this;
  };

  $.fn.tiDelete = function(num) {
    var i = $(this).data('typeit');
    if (i === undefined) return $doc;
    i.queue.push([i.delete, num]);
    return this;
  };

  $.fn.tiPause = function(time) {
    var i = $(this).data('typeit');
    if (i === undefined) return $doc;
    i.queue.push([i.pause, time]);
    return this;
  };

  $.fn.tiBreak = function() {
    var i = $(this).data('typeit');
    if (i === undefined) return $doc;
    i.queue.push([i.break]);
    return this;
  };

  $.fn.tiSettings = function(settings) {
    var i = $(this).data('typeit');
    if (i === undefined) return $doc;
    i.queue.push([i.mergeSet, settings]);
    return this;
  };

}(jQuery));