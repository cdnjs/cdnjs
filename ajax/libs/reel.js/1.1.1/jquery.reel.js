/**
          @@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@          @@@@@@@@
  @@@@@@@                @@@@@@@
 @@@@@@@                  @@@@@@@
 @@@@@@@                  @@@@@@@
 @@@@@@@@     @          @@@@@@@@
  @@@@@@@@@  @@@       @@@@@@@@@
   @@@@@@@@@@@@@@   @@@@@@@@@@@
     @@@@@@@@@@@@@    @@@@@@@
       @@@@@@@@@@@@     @@@
          @@@@@@
         @@@@
        @@
 *
 * jQuery Reel
 * ===========
 * 360° projection plugin for jQuery
 *
 * @license Copyright (c) 2009-2010 Petr Vostrel (http://petr.vostrel.cz/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * jQuery Reel
 * http://jquery.vostrel.cz/reel
 * Version: 1.1.1
 * Updated: 2011-03-20
 *
 * Requires jQuery 1.4.2 or higher
 */
/*
 * Have it served by a cloud CDN:
 * - http://code.vostrel.cz/jquery.reel-bundle.js (recommended)
 * - http://code.vostrel.cz/jquery.reel.js
 * - http://code.vostrel.cz/jquery.reel-debug.js
 *
 * Optional nice-to-have plugins:
 * - jQuery.disableTextSelect [B] (James Dempster, http://www.jdempster.com/category/jquery/disabletextselect/)
 * - jQuery.mouseWheel [B] (Brandon Aaron, http://plugins.jquery.com/project/mousewheel)
 * - or jQuery.event.special.wheel (Three Dub Media, http://blog.threedubmedia.com/2008/08/eventspecialwheel.html)
 *
 * [B] Marked plugins are contained (with permissions) in the "bundle" version
 */

jQuery.reel || (function($, window, document, undefined){

  $.reel= {
    version: '1.1.1',

    // Options defaults
    def: {
      footage:            6, // number of frames per line/column
      frame:              1, // initial frame
      frames:            36, // total number of frames; every 10° for full rotation
      hint:              '', // mouse-sensitive area hint tooltip
      horizontal:      true, // roll flow; defaults to horizontal
      hotspot:    undefined, // [deprecated] use `area` instead
      indicator:          0, // size of a visual indicator of reeling (in pixels)
      klass:             '', // plugin instance class name
      loops:           true, // is it a loop?
      reversed:   undefined, // [deprecated] use `cw` instead
      spacing:            0, // space between frames on reel
      stitched:   undefined, // pixel width (length) of a stitched (rectilinear) panoramic reel
      suffix:       '-reel', // sprite filename suffix (A.jpg's sprite is A-reel.jpg by default)
      tooltip:           '', // [deprecated] use `hint` instead

      // [NEW] in version 1.1
      area:       undefined, // custom mouse-sensitive area jQuery collection
      brake:            0.5, // brake force of the inertial rotation
      clickfree:      false, // binds to mouse leave/enter events instead of down/up
      cw:             false, // true for clockwise organization of sprite
      delay:             -1, // delay before autoplay in seconds (no autoplay by default (-1))
      directional:    false, // two sets of frames (for forward and backward motion) are used when true
      draggable:       true, // mouse or finger drag interaction (allowed by default)
      entry:      undefined, // speed of the opening animation (Hz, defaults to value of `speed`)
      graph:      undefined, // custom graph function
      image:      undefined, // image sprite to be used
      images:            [], // sequence array of individual images to be used instead of sprite
      inversed:       false, // flags inversed organization of frames in orbital object movie
      laziness:           8, // on "lazy" devices tempo is divided by this divisor for better performace
      monitor:    undefined, // stored value name to monitor in the upper left corner of the viewport
      opening:            0, // duration of opening animation (in seconds)
      orbital:            0, // view centering tolerance in frames for dual-orbit object movies
      path:              '', // URL path to be prepended to `image` or `images` filenames
      preloader:          4, // size (height) of a image loading indicator (in pixels)
      rebound:          0.5, // time spent on the edge (in seconds) of a non-looping panorama before it bounces back
      revolution: undefined, // distance mouse must be dragged for full revolution
                             // (defaults to double the viewport size or half the `stitched` option)
      row:                1, // initial row
      rows:               0, // number of rows for a multi-row setup (zero from one-row setup)
      speed:              0, // animated rotation speed in revolutions per second (Hz)
      step:       undefined, // initial step (overrides `frame`)
      steps:      undefined, // number of steps a revolution is divided in (by default equal to `frames`)
      tempo:             36, // shared ticker tempo in ticks per second
      timeout:            2, // idle timeout in seconds
      throwable:       true, // drag & throw interaction (allowed by default)
      vertical:       false, // switches orbital object movie to vertical mode
      wheelable:       true  // mouse wheel interaction (allowed by default)
    }
    // [deprecated] options defaults may be gone anytime soon
  }

  $.fn.reel= function(options){
    var
      opt= $.extend({}, $.reel.def, options),
      applicable= (function(tags){
        // Only IMG tags with non-empty SRC and non-zero WIDTH and HEIGHT will pass
        var
          pass= []
        tags.filter(_img_).each(function(ix){
          var
            $this= $(this),
            src= opt.images.length && opt.images || opt.image || $this.attr(_src_),
            width= number($this.css(_width_)),
            height= number($this.css(_height_))
          if (!src || src == __ || !width || !height) return;
          pass.push($this);
        });
        tags.filter(_div_ + dot(klass)).each(function(ix){
          pass.push($(this));
        });
        return $(pass);
      })(this),
      instances= [],
      tempo= opt.tempo / ($.reel.lazy? opt.laziness : 1),
      ticker_target= 1000 / tempo,
      ticker_timeout= ticker_target

    // Backward-compatibility of [deprecated] legacy options
    opt.reversed && (opt.cw= true);
    opt.tooltip && (opt.hint= opt.tooltip);
    opt.hotspot && (opt.area= opt.hotspot);

    ticker= ticker || (function tick(){
      ticks= { before: ticks.now, now: new Date() }
      ticker_timeout+= ticker_target - ceil(ticks.now - ticks.before);
      pool.trigger(_tick_);
      return ticker= setTimeout(tick, ticker_timeout);
    })();

    applicable.each(function(){
      var
        t= $(this),

        // Data storage
        set= function(name, value){
          t.data(name, value);
          t.trigger('store', [name, value]);
          return value;
        },
        get= function(name){
          var
            value= t.data(name)
          t.trigger('recall', [name, value]);
          return value;
        },

        // Events & handlers
        on= {
          setup: function(e){
          /*
          - fills up the data storage with values based on options
          - binds to ticker
          */
            if (t.hasClass(klass)) return cleanup.call(e);
            var
              src= t.attr(_src_),
              id= t.attr(_id_),
              styles= t.attr('style'),
              images= opt.images,
              stitched= opt.stitched,
              loops= opt.loops,
              size= { x: number(t.css(_width_)), y: number(t.css(_height_)) },
              frames= set(_frames_, opt.orbital && opt.footage || opt.rows <= 1 && images.length || opt.frames),
              rows= stitched ? 1 : ceil(frames / opt.footage),
              style= {
                display: 'block',
                width: size.x,
                height: size.y
              },
              stage_id= '#'+id+opt.suffix,
              classes= t.attr('className'),
              overlay_css= { position: 'relative', width: size.x, height: size.y },
              $overlay= $(_div_tag_, { id: stage_id.substr(1), className: classes+___+overlay_klass, css: overlay_css }),
              $instance= t.wrap($overlay).attr({ className: klass }).css(style).bind(on),
              instances_count= instances.push($instance[0])
            set(_image_, images.length && images.length || opt.image || src.replace(/^(.*)\.(jpg|jpeg|png|gif)$/, '$1' + opt.suffix + '.$2'));
            set(_classes_, classes);
            set(_frame_, opt.frame);
            set(_spacing_, opt.spacing);
            set(_dimensions_, size);
            set(_fraction_, 0);
            set(_steps_, opt.steps || opt.frames);
            set(_revolution_, opt.revolution || stitched / 2 || size.x * 2);
            set(_rows_, rows);
            set(_bit_, 1 / (frames - (loops && !stitched ? 0 : 1)));
            set(_wheel_step_, 1 / max(frames, get(_steps_)));
            set(_stitched_, stitched);
            set(_stitched_travel_, stitched - (loops ? 0 : size.x));
            set(_stage_, stage_id);
            set(_backwards_, set(_speed_, opt.speed) < 0);
            set(_velocity_, 0);
            set(_vertical_, opt.vertical);
            set(_row_, (opt.row - 1) / (opt.rows - 1));
            set(_cwish_, negative_when(1, !opt.cw && !stitched));
            set(_reeling_, false);
            set(_backup_, {
              src: src,
              style: styles || __
            });
            ticker && pool.bind(_tick_, on.tick);
            cleanup.call(e);
            t.trigger('start');
          },
          teardown: function(e){
          /*
          - unbinds events, erases all state data
          - reconstructs the original DOM element
          */
            // get rid of Reel's own events
            t.unbind(ns).unbind(on);
            var
              events= t.data('events'),
              // clone & restore the original
              $original= t.clone()
              .attr(t.data(_backup_))
              .removeClass(klass).addClass(get(_classes_));
            // clone original events (inspired by Brandon Aaron's copyEvents plugin)
            for (var type in events) $.each(events[type], function(ix, handler){
              // for this we need the 1.4.2+ version
              $original.bind(type+'.'+handler.namespace, handler.handler, handler.data);
            });
            $('img:hidden', t.parent()).remove();
            // replace stage with the original
            $(get(_stage_)).before($original).detach();
            no_bias();
            pool
            .unbind(_mouseup_).unbind(_mousemove_)
            .unbind(_tick_, on.tick)
            .unbind(_tick_, on.opening_tick);
            cleanup.call(e);
          },
          start: function(e){
          /*
          - binds all mouse/touch events (namespaced)
          - prepares stage overlay elements
          - preloads images if needed
          */
            var
              space= get(_dimensions_),
              frames= get(_frames_),
              resolution= max(frames, get(_steps_)),
              fraction= set(_fraction_, 1 / resolution * ((opt.step || opt.frame) - 1)),
              frame= set(_frame_, fraction * frames + 1),
              loaded= 0,
              id= t.attr('id'),
              $overlay= t.parent(),
              $hi= $(_div_tag_, { className: hi_klass,
                css: { position: _absolute_, left: 0, top: 0, width: space.x, height: space.y, background: _hex_black_, opacity: 0 }
              }).appendTo($overlay),
              area= set(_area_, $(opt.area || $hi ))
            if ($.reel.touchy){
              // workaround for downsizing-sprites-bug-in-iPhoneOS inspired by Katrin Ackermann
              t.css({ WebkitUserSelect: 'none', WebkitBackgroundSize: opt.images.length
                ? 'auto'
                : (get(_stitched_) && get(_stitched_)+'px '+space.y+'px')
                || (space.x * opt.footage)+'px '+(space.y * get(_rows_) * (opt.rows || 1) * (opt.directional? 2:1))+'px'
              });
              area
                .bind(_touchstart_, function(e){ t.trigger('down', [finger(e).clientX, finger(e).clientY, true]); })
                .bind(_touchmove_, function(e){ t.trigger('slide', [finger(e).clientX, finger(e).clientY, true]); return !(opt.rows > 1 || opt.orbital || get(_reeling_)) })
                .bind(_touchend_, function(e){ t.trigger('up', [true]); return false })
                .bind(_touchcancel_, function(e){ t.trigger('up', [true]); return false })
            }else{
              area
                .css({ cursor: 'url('+drag_cursor+'), '+failsafe_cursor })
                .bind(_mousewheel_, function(e, delta){ t.trigger('wheel', [delta]); return false })
                .bind(_dblclick_, function(e){ t.trigger('play') })
                .bind(opt.clickfree ? _mouseenter_ : _mousedown_, function(e){ t.trigger('down', [e.clientX, e.clientY]); return false })
                .bind(opt.clickfree ? _mouseleave_ : '', function(e){ t.trigger('up'); return false })
                .disableTextSelect();
            }
            (opt.hint) && area.attr(_title_, opt.hint);
            opt.monitor && $overlay.append($monitor= $(_div_tag_, {
              className: monitor_klass,
              css: { position: _absolute_, left: 0, top: 0 }
            })) || ($monitor= $());
            opt.indicator && $overlay.append(indicator('x'));
            opt.rows > 1 && opt.indicator && $overlay.append(indicator('y'));
            t.trigger('preload');
          },
          preload: function(e){
          /*
          - preloads all frames and sprites
          */
            var
              space= get(_dimensions_),
              $overlay= t.parent(),
              image= get(_image_),
              images= opt.images,
              preload= !images.length ? [image] : new Array().concat(images),
              img_tag= t[0],
              img_frames= img_tag.frames= preload.length,
              img_preloaded= img_tag.preloaded= 0
            t.trigger('stop');
            $overlay.append($preloader= $(_div_tag_, { className: preloader_klass,
              css: {
                position: _absolute_,
                left: 0,
                top: space.y - opt.preloader,
                height: opt.preloader,
                backgroundColor: _hex_black_
              }
            }));
            while(preload.length){
              var
                url= opt.path+preload.shift(),
                $img= $(new Image()).bind('load'+ns, function update_preloader(){
                  img_tag.preloaded++
                  $(this).unbind(ns);
                  $preloader.css({ width: 1 / img_tag.frames * img_tag.preloaded * space.x })
                  if (img_tag.frames == img_tag.preloaded){
                    $preloader.remove();
                    t.trigger(opt.rows > 1 && !opt.stitched ? 'rowChange' : 'frameChange');
                    t.attr({ src: transparent }).trigger('loaded');
                    t.trigger('opening');
                    cleanup.call(e);
                  }
                });
              $overlay.append($img.hide().attr({ src: url }));
            }
          },
          tick: function(e){
          /*
          - triggered by pool's `tick.reel` event
          - keeps track of operated and breaked statuses
          - decreases inertial velocity by braking
          */
            var
              velocity= get(_velocity_)
            if (breaking) var
              breaked= lofi(velocity - (tick_brake * breaking)),
              done= velocity * breaked <= 0 || velocity < abs(breaked),
              velocity= !done && set(_velocity_, velocity > abs(get(_speed_)) ? breaked : (breaking= operated= 0))
            $monitor.text(get(opt.monitor));
            velocity && breaking++;
            operated && operated++;
            to_bias(0);
            slidable= true;
            if (operated && !velocity) return cleanup.call(e);
            if (get(_clicked_)) return cleanup.call(e, unidle());
            var
              backwards= get(_cwish_) * negative_when(1, get(_backwards_)),
              step= (get(_stopped_) ? velocity : abs(get(_speed_)) + velocity) / tempo,
              was= get(_fraction_),
              fraction= set(_fraction_, was - step * backwards)
            cleanup.call(e);
            if (fraction == was) return;
            t.trigger('fractionChange');
          },
          opening: function(e){
          /*
          - initiates opening animation
          - or simply plays the reel when without opening
          */
            var
              speed= opt.entry || opt.speed,
              end= get(_fraction_),
              duration= opt.opening,
              start= set(_fraction_, end - speed * opt.opening),
              ticks= set(_opening_ticks_, duration * tempo)
            pool.bind(_tick_, on.opening_tick);
          },
          opening_tick: function(e){
          /*
          - ticker listener dedicated to opening animation
          */
            var
              speed= opt.entry || opt.speed,
              step= speed / tempo * (opt.cw? -1:1),
              was= get(_fraction_),
              fraction= set(_fraction_, lofi(was + step)),
              ticks= set(_opening_ticks_, get(_opening_ticks_) - 1)
            t.trigger('fractionChange');
            cleanup.call(e);
            if (ticks > 1) return;

            pool.unbind(_tick_, on.opening_tick);
            delay_play();
          },
          play: function(e, direction){
            var
              playing= set(_playing_, true),
              stopped= set(_stopped_, !playing)
            idle();
            cleanup.call(e);
          },
          pause: function(e){
            var
              playing= set(_playing_, false)
            unidle();
            cleanup.call(e);
          },
          stop: function(e){
            var
              stopped= set(_stopped_, true),
              playing= set(_playing_, !stopped)
            cleanup.call(e);
          },
          down: function(e, x, y, touched){
          /*
          - starts the dragging operation by binding dragging events to the pool
          */
            if (opt.draggable){
              var
                clicked= set(_clicked_, get(_frame_)),
                velocity= set(_velocity_, 0),
                origin= last= recenter_mouse(x, y, get(_fraction_), get(_revolution_), get(_row_))
              unidle();
              no_bias();
              if (!touched){
                pool
                .css({ cursor: url(drag_cursor_down)+', '+failsafe_cursor })
                .bind(_mousemove_, function(e){ t.trigger('slide', [e.clientX, e.clientY]); cleanup.call(e); return false })
                opt.clickfree || pool.bind(_mouseup_, function(e){ t.trigger('up'); cleanup.call(e) })
              }
            }
            cleanup.call(e);
          },
          up: function(e, touched){
          /*
          - ends dragging operation by calculating velocity by summing the bias
          - unbinds dragging events from pool
          - resets the mouse cursor
          */
            if (!opt.draggable) return cleanup.call(e);
            var
              clicked= set(_clicked_, false),
              reeling= set(_reeling_, false),
              velocity= set(_velocity_, !opt.throwable ? 0 : abs(bias[0] + bias[1]) / 60),
              breaks= breaking= velocity ? 1 : 0
            velocity ? idle() : unidle();
            no_bias();
            !touched
            && pool.unbind(_mouseup_).unbind(_mousemove_)
            && get(_area_).css({ cursor: url(drag_cursor)+', '+failsafe_cursor });
            cleanup.call(e);
          },
          slide: function(e, x, y, touched){
          /*
          - calculates the X distance from drag center and applies graph on it to get fraction
          - recenters the drag when dragged over limits
          - detects the direction of the motion
          - builds inertial motion bias
          - (`slide` was originally `drag` which conflicted with MSIE)
          */
            if (opt.draggable && slidable){
              // by checking slidable sync with the ticker tempo is achieved
              slidable= false;
              unidle();
              var
                delta= { x: x - last.x, y: y - last.y }
              if (abs(delta.x) > 0 || abs(delta.y) > 0){
                last= { x: x, y: y };
                var
                  revolution= get(_revolution_),
                  origin= get(_clicked_location_),
                  vertical= get(_vertical_),
                  fraction= set(_fraction_, graph(vertical ? y - origin.y : x - origin.x, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_))),
                  reeling= set(_reeling_, get(_reeling_) || get(_frame_) != get(_clicked_)),
                  motion= to_bias(vertical ? delta.y : delta.x || 0),
                  backwards= motion && set(_backwards_, motion < 0)
                if (opt.orbital && get(_center_)) var
                  vertical= set(_vertical_, abs(y - origin.y) > abs(x - origin.x)),
                  origin= recenter_mouse(x, y, fraction, revolution, get(_row_))
                if (opt.rows > 1) var
                  space_y= get(_dimensions_).y,
                  start= get(_clicked_row_),
                  lo= - start * space_y,
                  row= set(_row_, lofi($.reel.math.envelope(y - origin.y, start, space_y, lo, lo + space_y, -1)))
                var
                  origin= !(fraction % 1) && !opt.loops && recenter_mouse(x, y, fraction, revolution, get(_row_))
                t.trigger('fractionChange');
              }
            }
            cleanup.call(e);
          },
          wheel: function(e, distance){
          /*
          - calculates wheel input delta and adjusts fraction using the graph
          - recenters the "drag" each and every time
          - detects motion direction
          - nullifies the velocity
          */
            if (!opt.wheelable) return cleanup.call(e);
            var
              delta= ceil(sqrt(abs(distance)) / 2),
              delta= negative_when(delta, distance > 0),
              revolution= 0.2 * get(_revolution_), // Wheel's revolution is just 20 % of full revolution
              origin= recenter_mouse(undefined, undefined, get(_fraction_), revolution, get(_row_)),
              fraction= set(_fraction_, graph(delta, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_))),
              backwards= delta && set(_backwards_, delta < 0),
              velocity= set(_velocity_, 0)
            unidle();
            cleanup.call(e);
            t.trigger('fractionChange');
            return false;
          },
          fractionChange: function(e, fraction){
          /*
          - normalizes given fraction (if any) - loop/limit and round
          - calculates and changes sprite frame
          - for non-looping panoramas
              - keeps track of ticks spent on edge
              - reverses motion direction if too long
          */
            var
              fraction= !fraction ? get(_fraction_) : set(_fraction_, fraction),
              fraction= opt.loops ? fraction - floor(fraction) : min_max(0, 1, fraction),
              fraction= set(_fraction_, lofi(fraction)),
              was= get(_frame_),
              frame= set(_frame_, 1 + floor(fraction / get(_bit_))),
              orbital= opt.orbital,
              center= set(_center_, orbital && (frame <= orbital || frame >= opt.footage - orbital + 2))
            if (!opt.loops && opt.rebound) var
              edgy= !operated && !(fraction % 1) ? on_edge++ : (on_edge= 0),
              bounce= on_edge >= opt.rebound * 1000 / tempo,
              backwards= bounce && set(_backwards_, !get(_backwards_))
            var
              space= get(_dimensions_),
              travel= (get(_vertical_) ? space.y : space.x) - opt.indicator,
              indicator= min_max(0, travel, round($.reel.math.interpolate(fraction, -1, travel+2))),
              indicator= !opt.cw || opt.stitched ? indicator : travel - indicator,
              $indicator= $(dot(indicator_klass+'.x'), get(_stage_)).css(get(_vertical_) ? { left: 0, top: indicator } : { left: indicator, top: space.y - opt.indicator });
            if (opt.rows > 1) var
              ytravel= get(_dimensions_).y - opt.indicator,
              yindicator= min_max(0, ytravel, round($.reel.math.interpolate(get(_row_), -1, ytravel+2))),
              $yindicator= $(dot(indicator_klass+'.y'), get(_stage_)).css({ top: yindicator })
            if (frame == was && frame != 1) return cleanup.call(e);
            t.trigger(opt.rows > 1 ? 'rowChange' : 'frameChange');
            cleanup.call(e);
          },
          rowChange: function(e, row){
          /*
          - recalculates frame from fraction in order to have fresh unshifted value
          - shifts the stored frame to a desired row
          */
            var
              frame= floor(get(_fraction_) / get(_bit_)) + 1,
              row= set(_row_, min_max(0, 1, lofi(row != undefined ? (row-1) / (opt.rows-1) : get(_row_)))),
              frame= set(_frame_, frame + (opt.rows <= 1 ? 0 : round(row * (opt.rows - 1)) * opt.frames))
            cleanup.call(e);
            t.trigger('frameChange');
          },
          frameChange: function(e, frame){
          /*
          - rounds given frame (if any) and calculates fraction using it
          - calculates sprite background position shift and applies it
            or changes sprite image
          - adjusts indicator position
          */
            var
              fraction= !frame ? get(_fraction_) : set(_fraction_, lofi(get(_bit_) * (frame-1))),
              frame= set(_frame_, round(frame ? frame : get(_frame_))),
              images= opt.images,
              footage= opt.footage,
              space= get(_dimensions_),
              horizontal= opt.horizontal
            if (get(_vertical_)) var
              frame= opt.inversed ? footage + 1 - frame : frame,
              frame= frame + footage
            if (images.length){
              var
                sprite= images[frame - 1]
              t.attr({ src: opt.path+sprite })
            }else{
              if (!opt.stitched) var
                minor= (frame % footage) - 1,
                minor= minor < 0 ? footage - 1 : minor,
                major= floor((frame - 0.1) / footage),
                major= major + (opt.rows > 1 ? 0 : (get(_backwards_) ? 0 : get(_rows_))),
                spacing= get(_spacing_),
                a= major * ((horizontal ? space.y : space.x) + spacing),
                b= minor * ((horizontal ? space.x : space.y) + spacing),
                shift= images.length ? [0, 0] : horizontal ? [-b + _px_, -a + _px_] : [-a + _px_, -b + _px_]
              else var
                x= round(fraction * get(_stitched_travel_)),
                y= 0,
                shift= [-x + _px_, y + _px_]
              var
                sprite= get(_image_)
              t.css({ background: url(opt.path+sprite)+___+shift.join(___) });
            }
            cleanup.call(e);
          }
        },

        // Garbage clean-up facility called by every event
        cleanup= function(pass){ ie || delete this; return pass },

        // User idle control
        operated,
        breaking= 0,
        idle= function(){ return operated= 0 },
        unidle= function(){
          clearTimeout(delay);
          pool.unbind(_tick_, on.opening_tick);
          t.trigger('play');
          return operated= -opt.timeout * tempo
        },
        delay,
        // Triggers "play" delayed or immediate play
        delay_play= function(){
          delay= setTimeout(function play(){
            t.trigger('play');
          }, opt.delay * 1000 || 0);
        },

        $monitor,
        $preloader,
        indicator= function(axis){
          return $(_div_tag_, {
            className: [indicator_klass, axis].join(___),
            css: {
              width: opt.indicator,
              height: opt.indicator,
              top: get(_dimensions_).y - opt.indicator,
              left: 0,
              position: _absolute_,
              backgroundColor: _hex_black_
            }
          })
        },

        // Inertia rotation control
        on_edge= 0,
        last= { x: 0, y: 0 },
        to_bias= function(value){ return bias.push(value) && bias.shift() && value },
        no_bias= function(){ return bias= [0,0] },
        bias= no_bias(),
        tick_brake= opt.brake / tempo,

        // Graph function to be used
        graph= opt.graph || $.reel.math[opt.loops ? 'hatch' : 'envelope'],

        // Resets the interaction graph's zero point
        recenter_mouse= function(x, y, fraction, revolution, row){
          set(_clicked_on_, fraction);
          set(_clicked_row_, row);
          set(_lo_, opt.loops ? 0 : - fraction * revolution);
          set(_hi_, opt.loops ? revolution : revolution - fraction * revolution);
          return x && set(_clicked_location_, { x: x, y: y }) || undefined
        }

      on.setup();
    });
    return $(instances);
  }

  // Mathematics core
  $.reel.math= {
    envelope: function(x, start, revolution, lo, hi, cwness){
      return start + max(lo, min(hi, - x * cwness)) / revolution
    },
    hatch: function(x, start, revolution, lo, hi, cwness){
      var
        x= (x < lo ? hi : 0) + x % hi, // Looping
        fraction= start + (- x * cwness) / revolution
      return fraction - floor(fraction)
    },
    interpolate: function(fraction, lo, hi){
      return lo + fraction * (hi - lo)
    }
  }

  $.reel.touchy= (/iphone|ipod|ipad|android/i).test(navigator.userAgent);
  $.reel.lazy= (/iphone|ipod|android/i).test(navigator.userAgent);

  // Double plugin functions in case plugin is missing
  double_for('mousewheel disableTextSelect enableTextSelect'.split(/ /));

  // PRIVATE
  var
    pool= $(document),
    ie= $.browser.msie,
    failsafe_cursor= 'ew-resize',
    ticker,
    ticks= { before: 0, now: new Date() },

    // HTML classes
    klass= 'jquery-reel',
    overlay_klass= klass + '-overlay',
    indicator_klass= klass + '-indicator',
    preloader_klass= klass + '-preloader',
    monitor_klass= klass + '-monitor',
    hi_klass= klass + '-interface',

    // Embedded images
    transparent= 'data:image/gif;base64,R0lGODlhCAAIAIAAAAAAAAAAACH5BAEAAAAALAAAAAAIAAgAAAIHhI+py+1dAAA7',
    drag_cursor= 'data:image/gif;base64,R0lGODlhEAAQAJECAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAI3lC8AeBDvgosQxQtne7yvLWGStVBelXBKqDJpNzLKq3xWBlU2nUs4C/O8cCvU0EfZGUwt19FYAAA7',
    drag_cursor_down= 'data:image/gif;base64,R0lGODlhEAAQAJECAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAIslI95EB3MHECxNjBVdE/5b2zcRV1QBabqhwltq41St4hj5konmVioZ6OtEgUAOw==',

    // Shortcuts
    round= Math.round, floor= Math.floor, ceil= Math.ceil,
    min= Math.min, max= Math.max, abs= Math.abs, sqrt= Math.sqrt,
    number= parseInt,

    // Storage keys
    _area_= 'area', _backup_= 'backup', _backwards_= 'backwards', _bit_= 'bit', _center_= 'center',
    _classes_= 'classes', _clicked_= 'clicked', _clicked_location_= 'clicked_location',
    _clicked_on_= 'clicked_on', _clicked_row_= 'clicked_row', _cwish_= 'cwish', _dimensions_= 'dimensions',
    _fraction_= 'fraction', _frame_= 'frame', _frames_= 'frames', _hi_= 'hi', _image_= 'image',
    _opening_ticks_= 'opening_ticks', _lo_= 'lo', _playing_= 'playing', _reeling_= 'reeling', _revolution_= 'revolution',
    _row_= 'row', _rows_= 'rows', _spacing_= 'spacing', _speed_= 'speed', _stage_= 'stage',
    _steps_= 'steps', _stitched_= 'stitched', _stitched_travel_= 'stitched_travel', _stopped_= 'stopped',
    _velocity_= 'velocity', _vertical_= 'vertical', _wheel_step_= 'wheel_step',

    // Events
    ns= '.reel',
    _dblclick_= 'dblclick'+ns, _mousedown_= 'mousedown'+ns, _mouseenter_= 'mouseenter'+ns,
    _mouseleave_= 'mouseleave'+ns, _mousemove_= 'mousemove'+ns, _mouseup_= 'mouseup'+ns,
    _mousewheel_= 'mousewheel'+ns, _tick_= 'tick'+ns, _touchcancel_= 'touchcancel'+ns,
    _touchend_= 'touchend'+ns, _touchstart_= 'touchstart'+ns, _touchmove_= 'touchmove'+ns,

    // Various string primitives
    __= '', ___= ' ', _absolute_= 'absolute', _div_= 'div', _div_tag_= tag(_div_),
    _height_= 'height', _hex_black_= '#000', _id_= 'id', _img_= 'img', _px_= 'px', _src_= 'src',
    _title_= 'title', _width_= 'width'

  // Helpers
  function tag(string){ return '<' + string + '/>' }
  function dot(string){ return '.' + string }
  function url(location){ return 'url(' + location + ')' }
  function lofi(number){ return +number.toFixed(4) }
  function min_max(minimum, maximum, number){ return max(minimum, min(maximum, number)) }
  function double_for(methods){ $.each(methods, pretend);
    function pretend(){ if (!$.fn[this]) $.fn[this]= function(){ return this }}
  }
  function negative_when(value, condition){ return abs(value) * (condition ? -1 : 1) }
  function finger(e){ return e.originalEvent.touches[0] }
})(jQuery, window, document);
