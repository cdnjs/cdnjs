/*
 * .reel - Image Turntable Plugin
 *
 * Transforms an image tag to act as a projector
 *
 */
/*! Copyright (c) 2009-2010 Petr Vostrel (http://www.pisi.cz/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://www.vostrel.cz/jquery/reel/
 * Version: 1.0.4 "Touchy"
 * Updated: 2010-04-19
 *
 * Requires jQuery 1.4.x or higher
 */
/*
 * Optional nice-to-haves:
 * - jQuery.disableTextSelect (James Dempster, http://www.jdempster.com/category/jquery/disabletextselect/)
 * - jQuery.mouseWheel (Brandon Aaron, http://plugins.jquery.com/project/mousewheel)
 * - or jQuery.event.special.wheel (Three Dub Media, http://blog.threedubmedia.com/2008/08/eventspecialwheel.html)
 */

(function($){
  $.fn.reel= function(options){
    var
      defaults= {
        footage:            6, // number of frames per line/column
        frame:              1, // initial frame
        frames:            36, // total number of frames; every 10° for full rotation
        horizontal:      true, // roll flow; defaults to horizontal
        hotspot:    undefined, // custom jQuery as a hotspot 
        hint:              '', // hotspot hint tooltip 
        indicator:          0, // size of a visual indicator of reeling (in pixels)
        klass:             '', // plugin instance class name
        loops:           true, // is it a loop?
        reversed:       false, // true for "counter-clockwise sprite"
        saves:          false, // wheather allow user to save the image thumbnail
        sensitivity:       20, // interaction sensitivity
        spacing:            0, // space between frames on reel
        stitched:   undefined, // pixel width (length) of a stitched panoramic reel
        suffix:       '-reel',
        tooltip:           ''  // alias of `hint`
      },

      klass= 'jquery-reel',
      applicable= (function(tags){
        // Only IMG tags with non-empty SRC and non-zero WIDTH and HEIGHT will pass
        var
          pass= []
        tags.filter('img').each(function(ix){
          var
            $this= $(this),
            src= $this.attr('src'),
            width= number($this.css('width')),
            height= number($this.css('height'))
          if (!src || src=='' || !width || !height) return;
          pass.push($this);
        });
        tags.filter('div.' + klass).each(function(ix){
          pass.push($(this));
        });
        return $(pass);
      })(this)	,
      // Flag touch-enabled devices
      touchy= (/iphone|ipod|ipad|android/i).test(navigator.userAgent);

    // Double plugin functions in case plugin is missing
    double_for('mousewheel disableTextSelect'.split(/ /));

    return applicable.each(function(){
      var
        t= $(this),
        set= $.extend(defaults, options),
        pool= $(document),
        store= function(name, value){
          t.data(name, value);
          t.trigger('store');
          return value;
        },
        recall= function(name){
          var
            value= t.data(name)
          t.trigger('recall')
          return value;
        },
        on= {
          setup: function(){
            if (t.hasClass(klass)) return;
            var
              src= t.attr('src'),
              id= t.attr('id'),
              classes= t.attr('class'),
              styles= t.attr('style'),
              image= src.replace(/^(.*)\.(jpg|jpeg|png|gif)$/, '$1' + set.suffix + '.$2'),
              size= { x: number(t.css('width')), y: number(t.css('height')) },
              turntable= $('<div>').attr('class',classes).addClass(klass).addClass(set.klass),
              image_css= touchy || !set.saves ? { display: 'none' } : { opacity: 0 }
            t= t.attr('id', '').wrap(turntable).css(image_css)
            .parent().attr('id', id).bind(on).css({
              display: 'block',
              width: size.x + 'px',
              height: size.y + 'px',
              backgroundImage: 'url(' + image + ')'
            });
            store('frames', set.frames);
            store('spacing', set.spacing);
            store('offset', t.offset());
            store('dimensions', size);
            store('backup', {
              id: id,
              'class': classes || '',
              style: styles || ''
            })
            t.trigger('start');
          },
          teardown: function(e){
            t= t.unbind(on)
            .find('img')
            .attr(t.data('backup')).unwrap()
            .bind('setup', function resetup(e){
              t.unbind('setup');
              on.setup();
            });
          },
          start: function(e){
            var
              hotspot= set.hotspot ? set.hotspot : t,
              space= recall('dimensions')
            hotspot
              .css({ cursor: 'ew-resize' })
              .mouseenter(function(e){ t.trigger('enter'); })
              .mouseleave(function(e){ t.trigger('leave'); })
              .mousemove(function(e){ t.trigger('over', [e.clientX, e.clientY]); })
              .mousewheel(function(e, delta){ t.trigger('wheel', [delta]); return false; })
              .dblclick(function(e){ t.trigger('animate'); })
              .mousedown(function(e){ t.trigger('down', [e.clientX, e.clientY]); })
              .disableTextSelect()
              .each(function touch_support(){
                touchy && bind(this, {
                  touchstart: start,
                  touchmove: move,
                  touchend: end,
                  touchcancel: end,
                  click: prevent,
                  gesturestart: prevent,
                  gesturechange: prevent,
                  gestureend: prevent
                });
                function bind(element, events){
                  $.each(events, function bind_handler(event){
                    element.addEventListener(event, this, false);
                  });
                }
                function prevent(event){
                  event.cancelable && event.preventDefault();
                  return false;
                }
                function start(event){
                  var
                    touch= event.touches[0],
                    clicked= store('clicked', true),
                    location= store('clicked_location', touch.clientX),
                    frame= store('last_frame', store('clicked_on_frame', recall('frame')));
                  return prevent(event);
                }
                function move(event){
                  var
                    touch= event.touches[0];
                  t.trigger('drag', [touch.clientX, touch.clientY]);
                  return prevent(event);
                }
                function end(event){
                  var
                    clicked= store('clicked',false);
                  return prevent(event);
                }
              });
            (set.hint || set.tooltip) && hotspot.attr('title', set.hint || set.tooltip);
            set.indicator && t.append($('<div/>')
              .addClass('indicator')
              .css({
                width: set.indicator + 'px',
                height: set.indicator + 'px',
                top: (space.y - set.indicator) + 'px',
                position: 'relative',
                backgroundColor: '#000'
              }));
            t.trigger('frameChange', set.frame);
          },
          animate: function(e){
            // Stub for future compatibility
            // log(e.type);
          },
          down: function(e, x, y){
            var
              clicked= store('clicked',true),
              location= store('clicked_location', x),
              frame= store('last_frame', store('clicked_on_frame', recall('frame')))
            pool
            .mousemove(function(e){ t.trigger('drag', [e.clientX, e.clientY]); })
            .mouseup(function(e){ t.trigger('up'); });
          },
          up: function(e){
            var
              clicked= store('clicked',false)
            pool.unbind('mousemove mouseup');
          },
          drag: function(e, x, y){
            var
              origin= recall('clicked_location'),
              frame= recall('clicked_on_frame'),
              frames= recall('frames'),
              sensitivity= touchy? set.sensitivity * 0.6 : set.sensitivity,
              distance= Math.round((origin - x) / sensitivity),
              reverse= (set.reversed ? -1 : 1) * (set.stitched ? -1 : 1),
              frame= store('frame', frame - reverse * distance)
            t.trigger('frameChange');
          },
          wheel: function(e, distance){
            var
              frame= recall('frame'),
              frames= recall('frames'),
              delta= Math.ceil(Math.sqrt(Math.abs(distance))),
              delta= distance < 0 ? - delta : delta,
              reverse= set.reversed ? -1 : 1,
              frame= store('frame', frame - reverse * delta)
            t.trigger('frameChange');
            return false;
          },
          frameChange: function(e, frame){
            var
              frame= !frame ? recall('frame') : store('frame', frame),
              last_frame= recall('last_frame'),
              frames= recall('frames'),
              space= recall('dimensions'),
              spacing= recall('spacing'),
              // Take care of the looping
              frame= !set.loops && frame > frames ? frames : frame,
              frame= !set.loops && frame < 1 ? 1 : frame,
              frame= frame - Math.floor(frame / frames) * frames,
              frame= store('last_frame', store('frame', frame < 1 ? frames : frame)),
              // Find out if the movement is reversed
              delta= frame - last_frame,
              delta= Math.abs(delta) > 10 ? 0 - delta : delta,
              reversed= store('reversed', delta != 0 ? (delta > 0) : recall('reversed'))
            if (!set.stitched){
              var
                major= Math.floor(frame / set.footage),
                minor= frame - major * set.footage - 1,
                major= minor == -1 ? major + minor : major,
                minor= minor == -1 ? set.footage + minor : minor,
                // Count new positions
                major_size= set.horizontal ? space.y : space.x,
                minor_size= set.horizontal ? space.x : space.y,
                x= - major * (spacing + major_size),
                y= - minor * (spacing + minor_size),
                rows= Math.ceil(frames / set.footage),
                // Count additional shift when rolling reverse direction
                reverse_shift= rows * major_size + (rows - 1) * spacing,
                x= reversed && set.horizontal ? x - reverse_shift : x,
                y= reversed && !set.horizontal ? y - reverse_shift : y,
                shift= set.horizontal ? y + 'px ' + x + 'px' : x + 'px ' + y + 'px'
            }else{
              var
                step= -(set.stitched - space.x) / frames,
                x= Math.round((frame - 1) * step),
                y= 0,
                shift= x + 'px ' + y + 'px'
            }
            var
              indicator= ((space.x - set.indicator) / (frames - 1) * (frame - 1)) + 'px'
            t.css({ backgroundPosition: shift })
              .find('.indicator').css({ left: indicator });
          }
        };
      t.ready(on.setup);
    });
  }
  // PRIVATE
  function number(input){
    return parseInt(input);
  }
  function double_for(methods){
    $.each(methods, function(){
      if (!$.fn[this]) $.fn[this]= function(){ return this; };
    });
  }
})(jQuery);