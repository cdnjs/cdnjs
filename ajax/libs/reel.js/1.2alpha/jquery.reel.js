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
 * The 360 plugin for jQuery
 *
 * @license Copyright (c) 2009-2011 Petr Vostrel (http://petr.vostrel.cz/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * jQuery Reel
 * http://jquery.vostrel.cz/reel
 * Version: 1.2alpha
 * Updated: 2011-12-30
 *
 * Requires jQuery 1.4.3 or higher
 */
/*
 * Have it served by a cloud CDN:
 * - http://code.vostrel.cz/jquery.reel-bundle.js (recommended)
 * - http://code.vostrel.cz/jquery.reel.js
 * - http://code.vostrel.cz/jquery.reel-debug.js
 * - or http://code.vostrel.cz/jquery.reel-edge.js if you feel like it ;)
 *
 * Optional nice-to-have plugins:
 * - jQuery.disableTextSelect [B] (James Dempster, http://www.jdempster.com/category/jquery/disabletextselect/)
 * - jQuery.mouseWheel [B] (Brandon Aaron, http://plugins.jquery.com/project/mousewheel)
 * - or jQuery.event.special.wheel (Three Dub Media, http://blog.threedubmedia.com/2008/08/eventspecialwheel.html)
 *
 * [B] Marked plugins are contained (with permissions) in the "bundle" version
 */

jQuery.reel || (function($, window, document, undefined){

  if (bad_jquery()) return;

  $.reel= {
    version: '1.2alpha',

    // Options defaults
    def: {
      area:         undefined, // custom mouse-sensitive area jQuery collection
      brake:             0.23, // brake force of the inertial rotation
      clickfree:        false, // binds to mouse leave/enter events instead of down/up
      cw:               false, // true for clockwise organization of sprite
      delay:               -1, // delay before autoplay in seconds (no autoplay by default (-1))
      directional:      false, // two sets of frames (for forward and backward motion) are used when true
      draggable:         true, // mouse or finger drag interaction (allowed by default)
      footage:              6, // number of frames per line/column
      entry:        undefined, // speed of the opening animation (Hz, defaults to value of `speed`)
      frame:                1, // initial frame
      frames:              36, // total number of frames; every 10° for full rotation
      graph:        undefined, // custom graph function
      hint:                '', // mouse-sensitive area hint tooltip
      horizontal:        true, // roll flow; defaults to horizontal
      image:        undefined, // image sprite to be used
      images:              [], // sequence array of individual images to be used instead of sprite
      indicator:            0, // size of a visual indicator of reeling (in pixels)
      inversed:         false, // flags inversed organization of frames in orbital object movie
      klass:               '', // plugin instance class name
      laziness:             6, // on "lazy" devices tempo is divided by this divisor for better performace
      loops:             true, // is it a loop?
      monitor:      undefined, // stored value name to monitor in the upper left corner of the viewport
      opening:              0, // duration of opening animation (in seconds)
      orbital:              0, // view centering tolerance in frames for dual-orbit object movies
      path:                '', // URL path to be prepended to `image` or `images` filenames
      preloader:            4, // size (height) of a image loading indicator (in pixels)
      rebound:            0.5, // time spent on the edge (in seconds) of a non-looping panorama before it bounces back
      revolution:   undefined, // distance mouse must be dragged for full revolution
                               // (defaults to double the viewport size or half the `stitched` option)
      row:                  1, // initial row
      rows:                 0, // number of rows for a multi-row setup (zero from one-row setup)
      spacing:              0, // space between frames on reel
      speed:                0, // animated rotation speed in revolutions per second (Hz)
      step:         undefined, // initial step (overrides `frame`)
      steps:        undefined, // number of steps a revolution is divided in (by default equal to `frames`)
      stitched:             0, // pixel width (length) of a stitched (rectilinear) panoramic reel
      suffix:         '-reel', // sprite filename suffix (A.jpg's sprite is A-reel.jpg by default)
      tempo:               36, // shared ticker tempo in ticks per second
      timeout:              2, // idle timeout in seconds
      throwable:         true, // drag & throw interaction (allowed by default)
      vertical:         false, // switches orbital object movie to vertical mode
      wheelable:         true, // mouse wheel interaction (allowed by default)

      // [NEW] in version 1.2
      annotations:  undefined, // annotations definition object
      attr:                {}, // initial attribute-value pairs map for the IMG tag
      cursor:       undefined, // mouse cursor overriding the default one
      preload:     'fidelity', // preloading order - either "linear" or "fidelity" (default)
      scrollable:        true, // allow page scroll (allowed by default; applies only to touch devices)
      steppable:         true, // allows to step the view (horizontally) by clicking on image
      velocity:             0  // initial velocity of user interaction; washes off quickly with `brake`
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
            src= opt.images.length && opt.images || opt.image || opt.attr.src || $this.attr(_src_),
            width= number(opt.attr.width || $this.css(_width_)),
            height= number(opt.attr.height || $this.css(_height_))
          if (!src || src == __ || !width || !height) return;
          pass.push($this);
        });
        tags.filter(dot(klass)).each(function(ix){
          pass.push($(this).unreel());
        });
        return $(pass);
      })(this),
      instances= []

    // Backward-compatibility of [deprecated] legacy options
    opt.tooltip && (opt.hint= opt.tooltip);
    opt.hotspot && (opt.area= opt.hotspot);

    applicable.each(function(){
      var
        t= $(this),
        data= t.data(),

        // Data storage
        set= function(name, value){
          data[name]= value;
          t.trigger('store', [name, value]);
          return value;
        },
        get= function(name){
          var value= data[name];
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
              src= t.attr(opt.attr).attr(_src_),
              id= set(_id_, t.attr(_id_) || t.attr(_id_, klass+'-'+(+new Date())).attr(_id_)),
              styles= t.attr(_style_),
              data= $.extend({}, t.data()),
              images= opt.images,
              stitched= opt.stitched,
              loops= opt.loops,
              size= { x: number(t.css(_width_) || opt.attr.width), y: number(t.css(_height_) || opt.attr.height) },
              frame= set(_frame_, opt.frame),
              frames= set(_frames_, opt.orbital && opt.footage || opt.rows <= 1 && images.length || opt.frames),
              rows= stitched ? 1 : ceil(frames / opt.footage),
              stage_id= hash(id+opt.suffix),
              classes= t.attr('class') || '',
              $overlay= $(tag(_div_), { id: stage_id.substr(1), 'class': classes+___+overlay_klass+___+frame_klass+frame }),
              $instance= t.wrap($overlay.addClass(opt.klass)).attr({ 'class': klass }),
              instances_count= instances.push(add_instance($instance)[0]),
              $overlay= $instance.parent().bind(on.instance)
            set(_image_, images.length && images.length || opt.image || src.replace(/^(.*)\.(jpg|jpeg|png|gif)$/, '$1' + opt.suffix + '.$2'));
            set(_images_, []);
            set(_frame_, opt.frame);
            set(__frame_, 0);
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
            set(_velocity_, opt.velocity || 0);
            set(_vertical_, opt.vertical);
            set(_row_, (opt.row - 1) / (opt.rows - 1));
            set(_cwish_, negative_when(1, !opt.cw && !stitched));
            set(_reeling_, false);
            set(_brake_, opt.brake);
            set(_center_, !!opt.orbital);
            set(_tempo_, opt.tempo / ($.reel.lazy? opt.laziness : 1));
            set(_opening_ticks_, -1);
            set(_annotations_, opt.annotations) || $overlay.unbind('.annotations');
            set(_backup_, {
              src: src,
              classes: classes,
              style: styles || __,
              data: data
            });
            opt.steppable || $overlay.unbind('click.steppable');
            rule(true, __, { width: size.x, height: size.y, overflow: _hidden_ });
            rule(true, ____+dot(klass), { display: _block_, position: 'relative' });
            pool.bind(on.pool);
            cleanup.call(e);
            t.trigger('setup');
          },
          instance: {
            teardown: function(e){
            /*
            - unbinds events, erases all state data
            - reconstructs the original DOM element
            */
              var
                backup= t.data(_backup_)
              t.parent().unbind(on.instance).children(_img_).unbind(ns);
              get(_style_).remove();
              t.unbind(ns).attr({
               'class': backup.classes,
                src: backup.src,
                style: backup.style
              }).removeClass(klass);
              t.data(backup.data).siblings().remove();
              t.unwrap();
              remove_instance(t);
              no_bias();
              pool.unbind(on.pool);
              stage_pool
              .unbind(_mouseup_).unbind(_mousemove_);
              cleanup.call(e);
            },
            setup: function(e){
            /*
            - binds all mouse/touch events (namespaced)
            - prepares stage overlay elements
            */
              var
                space= get(_dimensions_),
                frames= get(_frames_),
                resolution= max(frames, get(_steps_)),
                fraction= set(_fraction_, 1 / resolution * ((opt.step || opt.frame) - 1)),
                frame= set(_frame_, round(fraction * frames) + 1),
                loaded= 0,
                id= t.attr(_id_),
                $overlay= t.parent(),
                scrollable= !get(_reeling_) || opt.rows <= 1 || !opt.orbital || opt.scrollable,
                area= set(_area_, $(opt.area || $overlay ))
              if ($.reel.touchy){
                // workaround for downsizing-sprites-bug-in-iPhoneOS inspired by Katrin Ackermann
                rule(true, ___+dot(klass), { WebkitUserSelect: _none_, WebkitBackgroundSize: opt.images.length
                  ? 'auto'
                  : (get(_stitched_) && px(get(_stitched_))+___+px(space.y))
                  || px(space.x * opt.footage)+___+px(space.y * get(_rows_) * (opt.rows || 1) * (opt.directional? 2:1))
                });
                area
                  .bind(_touchstart_, function(e){ t.trigger('down', [finger(e).clientX, finger(e).clientY, true]); })
                  .bind(_touchmove_, function(e){ t.trigger('pan', [finger(e).clientX, finger(e).clientY, true]); return !scrollable })
                  .bind(_touchend_, function(e){ t.trigger('up', [true]); return false })
                  .bind(_touchcancel_, function(e){ t.trigger('up', [true]); return false })
              }else{
                var
                  cursor= opt.cursor == _hand_ ? url(drag_cursor)+____+_move_ : opt.cursor || url(reel_cursor)+____+_move_,
                  cursor_down= opt.cursor == _hand_ ? url(drag_cursor_down)+____+_move_+' !important' : false
                rule(true, __, { cursor: cursor });
                rule(true, dot(loading_klass), { cursor: busy_cursor });
                rule(false, dot(panning_klass)+____+dot(panning_klass)+' *', { cursor: cursor_down || cursor });
                area
                  .bind(opt.wheelable ? _mousewheel_ : __, function(e, delta){ t.trigger('wheel', [delta]); return false })
                  .bind(opt.clickfree ? _mouseenter_ : _mousedown_, function(e){ if (inverted_buttons ? !e.button : !!e.button) return; t.trigger('down', [e.clientX, e.clientY]); return false })
                  .bind(opt.clickfree ? _mouseleave_ : __, function(e){ t.trigger('up'); return false })
                  .disableTextSelect();
              }
              (opt.hint) && area.attr(_title_, opt.hint);
              opt.monitor && $overlay.append($monitor= $(tag(_div_), { 'class': monitor_klass })) || ($monitor= $());
              rule(true, ___+dot(monitor_klass), { position: _absolute_, left: 0, top: 0 });
              rule(true, ___+dot(cached_klass), { display: _none_ });
              rule(true, ___+dot(preloader_klass), {
                position: _absolute_,
                left: 0, top: space.y - opt.preloader,
                height: opt.preloader,
                overflow: _hidden_,
                backgroundColor: _hex_black_
              });
              opt.indicator && $overlay.append(indicator(_x_));
              opt.rows > 1 && opt.indicator && $overlay.append(indicator(_y_));
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
                is_sprite= !images.length,
                frames= get(_frames_),
                order= $.reel.preload[opt.preload] || $.reel.preload[$.reel.def.preload],
                preload= is_sprite ? [image] : order(images, opt, get),
                uris= [],
                img_tag= t[0],
                img_frames= img_tag.frames= preload.length,
                img_preloaded= img_tag.preloaded= 0
              $overlay.addClass(loading_klass).append($preloader= $(tag(_div_), { 'class': preloader_klass }));
              t.trigger('stop');
              while(preload.length){
                var
                  uri= opt.path+preload.shift(),
                  width= space.x * (!is_sprite ? 1 : opt.footage),
                  height= space.y * (!is_sprite ? 1 : frames / opt.footage) * (!opt.directional ? 1 : 2),
                  $img= $(new Image()).addClass(cached_klass).attr({ width: width, height: height })
                  .bind('load'+ns, function update_preloader(){
                    img_tag.preloaded++
                    $(this).unbind(ns);
                    $preloader.css({ width: 1 / img_tag.frames * img_tag.preloaded * space.x })
                    if (img_tag.frames == img_tag.preloaded){
                      $preloader.remove();
                      images.length || t.css({ backgroundImage: url(opt.path+image) }).attr({ src: transparent });
                      $overlay.removeClass(loading_klass);
                      t.trigger('loaded');
                      cleanup.call(e);
                    }
                  });
                $overlay.append($img);
                uris.push(uri);
                // The actual loading of the image is done asynchronously
                setTimeout((function($img, uri){ return function(){ $img.attr({ src: uri }) } })($img, uri), 0);
              }
              set(_images_, uris);
              set(_style_, $('<'+_style_+' type="text/css">'+rules.join('\n')+'</'+_style_+'>').prependTo('head'));
            },
            opening: function(e){
            /*
            - initiates opening animation
            - or simply plays the reel when without opening
            */
              if (!opt.opening) return t.trigger('openingDone');
              var
                speed= opt.entry || opt.speed,
                end= get(_fraction_),
                duration= opt.opening,
                start= set(_fraction_, end - speed * opt.opening),
                ticks= set(_opening_ticks_, duration * leader(_tempo_))
            },
            openingDone: function(e){
              delay= setTimeout(function play(){
                t.trigger('play');
              }, opt.delay * 1000 || 0);
            },
            play: function(e, speed){
              var
                speed= set(_speed_, speed || get(_speed_)),
                playing= set(_playing_, !!speed),
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
                panned= false;
                $root.addClass(panning_klass);
                if (!touched){
                  stage_pool
                  .bind(_mousemove_, function(e){ t.trigger('pan', [e.clientX, e.clientY]); cleanup.call(e); return false })
                  opt.clickfree || stage_pool.bind(_mouseup_, function(e){ t.trigger('up'); cleanup.call(e) })
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
                brakes= braking= velocity ? 1 : 0
              velocity ? idle() : unidle();
              no_bias();
              $root.removeClass(panning_klass);
              !touched
              && stage_pool.unbind(_mouseup_).unbind(_mousemove_);
              cleanup.call(e);
            },
            pan: function(e, x, y, touched){
            /*
            - calculates the X distance from drag center and applies graph on it to get fraction
            - recenters the drag when dragged over limits
            - detects the direction of the motion
            - builds inertial motion bias
            - (`pan` was originally `slide` which conflicted with Mootools (GH-51))
            - (and `slide` was once `drag` which conflicted with MSIE)
            */
              if (opt.draggable && slidable){
                // by checking slidable sync with the ticker tempo is achieved
                slidable= false;
                unidle();
                var
                  delta= { x: x - last.x, y: y - last.y }
                if (abs(delta.x) > 0 || abs(delta.y) > 0){
                  panned= true;
                  last= { x: x, y: y };
                  var
                    revolution= get(_revolution_),
                    origin= get(_clicked_location_),
                    vertical= get(_vertical_),
                    fraction= set(_fraction_, graph(vertical ? y - origin.y : x - origin.x, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_), vertical ? y - origin.y : x - origin.x)),
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
                    row= set(_row_, $.reel.math.envelope(y - origin.y, start, space_y, lo, lo + space_y, -1))
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
              var
                delta= ceil(sqrt(abs(distance)) / 2),
                delta= negative_when(delta, distance > 0),
                revolution= 0.0833 * get(_revolution_), // Wheel's revolution is 1/12 of full revolution
                origin= recenter_mouse(undefined, undefined, get(_fraction_), revolution, get(_row_)),
                fraction= set(_fraction_, graph(delta, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_))),
                backwards= delta && set(_backwards_, delta < 0),
                velocity= set(_velocity_, 0)
              unidle();
              cleanup.call(e);
              stage_pool.trigger(_mouseup_);
              t.trigger('fractionChange');
              return false;
            },
            fractionChange: function(e, fraction){
            /*
            - calculates and changes sprite frame
            - for non-looping panoramas
                - keeps track of ticks spent on edge
                - reverses motion direction if too long
            */
              var
                fraction= set(_fraction_, normal.fraction(fraction, opt, get)),
                frame= set(_frame_, 1 + floor(fraction / get(_bit_))),
                multirow= opt.rows > 1,
                orbital= opt.orbital,
                center= set(_center_, !!orbital && (frame <= orbital || frame >= opt.footage - orbital + 2))
              if (!opt.loops && opt.rebound) var
                edgy= !operated && !(fraction % 1) ? on_edge++ : (on_edge= 0),
                bounce= on_edge >= opt.rebound * 1000 / leader(_tempo_),
                backwards= bounce && set(_backwards_, !get(_backwards_))
              t.trigger(multirow ? 'rowChange' : 'frameChange');
              cleanup.call(e);
            },
            rowChange: function(e, row){
            /*
            - recalculates frame from fraction in order to have fresh unshifted value
            - shifts the stored frame to a desired row
            */
              var
                frame= (get(_fraction_) / get(_bit_)) + 1,
                row= set(_row_, normal.row(row, opt, get)),
                row_shift= min_max(0, opt.rows - 1, floor(row * (opt.rows))),
                frame= set(_frame_, floor(frame + row_shift * opt.frames))
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
                fraction= set(_fraction_, normal.fraction(!frame ? undefined : get(_bit_) * (frame-1), opt, get)),
                frame= normal.frame(frame, opt, get),
                footage= opt.footage
              if (get(_vertical_)) var
                frame= opt.inversed ? footage + 1 - frame : frame,
                frame= frame + footage
              if (frame == get(__frame_)) mute(e)
              else{
                var
                  horizontal= opt.horizontal,
                  images= opt.images,
                  space= get(_dimensions_),
                  frame= set(__frame_, set(_frame_, frame))
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
                  t.css({ backgroundPosition: shift.join(___) })
                }
              }
              if (opt.indicator){
                var
                  stage= get(_stage_),
                  multirow= opt.rows > 1,
                  space= get(_dimensions_),
                  travel= (get(_vertical_) ? space.y : space.x) - opt.indicator,
                  indicator= min_max(0, travel, round($.reel.math.interpolate(get(_fraction_), -1, travel+2))),
                  indicator= !opt.cw || opt.stitched ? indicator : travel - indicator,
                  $indicator= $(dot(indicator_klass+dot(_x_)), stage).css(get(_vertical_) ? { left: 0, top: indicator } : { left: indicator, top: space.y - opt.indicator })
                if (multirow) var
                  ytravel= space.y - opt.indicator,
                  yindicator= min_max(0, ytravel, round($.reel.math.interpolate(get(_row_), -1, ytravel+2))),
                  $yindicator= $(dot(indicator_klass+dot(_y_)), stage).css({ top: yindicator })
              }
              cleanup.call(e);
            },

            stepLeft: function(e){
              unidle();
              set(_backwards_, false);
              t.trigger('fractionChange', get(_fraction_) - get(_bit_) * get(_cwish_))
            },
            stepRight: function(e){
              unidle();
              set(_backwards_, true);
              t.trigger('fractionChange', get(_fraction_) + get(_bit_) * get(_cwish_))
            },
            'click.steppable': function(e){
              if (panned) return mute(e);
              t.trigger(e.clientX - t.offset().left > 0.5 * get(_dimensions_).x ? 'stepRight' : 'stepLeft')
            },

            'setup.annotations': function(e){
              var
                space= get(_dimensions_),
                $overlay= t.parent(),
                film_css= { position: _absolute_, width: space.x, height: space.y, left: 0, top: 0 }
              $.each(get(_annotations_), function(ida, note){
                var
                  $note= $(tag(_div_), note.node).attr({ id: ida }).addClass(annotation_klass),
                  $image= note.image ? $(tag(_img_), note.image) : $(),
                  $link= note.link ? $(tag(_a_), note.link) : $()
                rule(false, hash(ida), { display: _none_, position: _absolute_ });
                $link.bind({
                  'click.annotations': function(e){
                    e.stopPropagation();
                  }
                })
                note.image || note.link && $note.append($link);
                note.link || note.image && $note.append($image);
                note.link && note.image && $note.append($link.append($image));
                $note.appendTo($overlay);
              });
              t.trigger('frameChange.annotations');
            },
            'frameChange.annotations': function(e, frame){
              var
                frame= frame || get(_frame_)
              this.className= this.className.replace(frame_klass_pattern, frame_klass + frame);
              if (!get(_velocity_)) $.each(get(_annotations_), function(ida, note){
                var
                  $note= $(hash(ida)),
                  start= note.start || 1,
                  end= note.end,
                  offset= frame - 1,
                  at= note.at ? (note.at[offset] == '+') : false,
                  offset= note.at ? offset : offset - start + 1,
                  x= typeof note.x!=_object_ ? note.x : note.x[offset],
                  y= typeof note.y!=_object_ ? note.y : note.y[offset],
                  placed= x !== undefined && y !== undefined,
                  visible= placed && (note.at ? at : (offset >= 0 && (!end || offset <= end - start))),
                  style= { display: visible ? _block_:_none_, left: px(x) || 0, top: px(y) || 0 }
                $note.css(style);
              });
            },

            'setup.fu': function(){ t.trigger('preload') },
            'loaded.fu': function(){ t.trigger('opening') }

          },
          pool: {
            'tick.reel': function(e){
            /*
            - triggered by pool's `tick.reel` event
            - keeps track of operated and braked statuses
            - decreases inertial velocity by braking
            */
              var
                velocity= get(_velocity_)
              if (braking) var
                braked= velocity - (get(_brake_) / leader(_tempo_) * braking),
                velocity= set(_velocity_, braked > 0.1 ? braked : (braking= operated= 0))
              $monitor.text(get(opt.monitor));
              velocity && braking++;
              operated && operated++;
              to_bias(0);
              slidable= true;
              if (operated && !velocity) return mute(e);
              if (get(_clicked_)) return mute(e, unidle());
              if (get(_opening_ticks_) > 0) return;
              var
                backwards= get(_cwish_) * negative_when(1, get(_backwards_)),
                step= (get(_stopped_) ? velocity : abs(get(_speed_)) + velocity) / leader(_tempo_),
                was= get(_fraction_),
                fraction= set(_fraction_, was - step * backwards)
              cleanup.call(e);
            },
            'tick.reel.opening': function(e){
            /*
            - ticker listener dedicated to opening animation
            */
              if (opt.opening){
                if (get(_opening_ticks_) <= 0) return;
                var
                  speed= opt.entry || opt.speed,
                  step= speed / leader(_tempo_) * (opt.cw? -1:1),
                  was= get(_fraction_),
                  fraction= set(_fraction_, was + step),
                  ticks= set(_opening_ticks_, get(_opening_ticks_) - 1)
                cleanup.call(e);
                if (ticks > 0) return;
                t.trigger('openingDone');
              }
              pool.unbind(_tick_+dot(_opening_), on.pool[_tick_+dot(_opening_)]);
            },

            'tick.reel.fu': function(e){ t.trigger('fractionChange') }
          }
        },

        // Garbage clean-up facility called by every event
        cleanup= function(pass){ ie || delete this; return pass },

        // Events propagation stopper / muter
        mute= function(e, result){ return e.stopImmediatePropagation() || cleanup.call(e) || result },

        // User idle control
        operated,
        braking= 0,
        idle= function(){ return operated= 0 },
        unidle= function(){
          clearTimeout(delay);
          pool.unbind(_tick_+dot(_opening_), on.pool[_tick_+dot(_opening_)]);
          set(_opening_ticks_, 0);
          t.trigger('play');
          return operated= -opt.timeout * leader(_tempo_)
        },
        panned= false,
        delay, // openingDone's delayed play pointer

        $monitor,
        $preloader,
        indicator= function(axis){
          rule(true, ___+dot(indicator_klass)+dot(axis), {
            position: _absolute_,
            width: opt.indicator, height: opt.indicator,
            overflow: _hidden_,
            backgroundColor: _hex_black_
          })
          return $(tag(_div_), { 'class': [indicator_klass, axis].join(___) })
        },

        // CSS rules & stylesheet
        rules= [],
        rule= function(prefix, selector, rule){
          var
            stage= get(_stage_),
            selector= selector.split(____)
          prefix && $.each(selector, function(ix, it){ selector[ix]= stage+it });
          rules.push(selector.join(____)+css(rule));
          return rule;
        },
        $style,

        // Inertia rotation control
        on_edge= 0,
        last= { x: 0, y: 0 },
        to_bias= function(value){ return bias.push(value) && bias.shift() && value },
        no_bias= function(){ return bias= [0,0] },
        bias= no_bias(),

        // Graph function to be used
        graph= opt.graph || $.reel.math[opt.loops ? 'hatch' : 'envelope'],
        normal= $.reel.normal,

        // Resets the interaction graph's zero point
        recenter_mouse= function(x, y, fraction, revolution, row){
          set(_clicked_on_, fraction);
          set(_clicked_row_, row);
          set(_lo_, opt.loops ? 0 : - fraction * revolution);
          set(_hi_, opt.loops ? revolution : revolution - fraction * revolution);
          return x && set(_clicked_location_, { x: x, y: y }) || undefined
        },
        slidable= true,
        stage_pool
      try{ stage_pool= $.browser.opera ? pool : $.unique(pool.add(window.top.document)) }
      catch(e){ stage_pool= pool }
      on.setup();
    });

    ticker= ticker || (function tick(){
      var
        start= +new Date(),
        tempo= leader(_tempo_);
      if (tempo){
        pool.trigger(_tick_);
        $.reel.cost= (+new Date() + $.reel.cost - start) / 2;
        return ticker= setTimeout(tick, max(4, 1000 / tempo - $.reel.cost));
      }else{
        return ticker= undefined
      }
    })();

    return $(instances);
  }

  $.fn.unreel= function(){
    return this.trigger('teardown');
  }

  // Mathematics core
  $.reel.math= {
    envelope: function(x, start, revolution, lo, hi, cwness, y){
      return start + max(lo, min(hi, - x * cwness)) / revolution
    },
    hatch: function(x, start, revolution, lo, hi, cwness, y){
      var
        x= (x < lo ? hi : 0) + x % hi, // Looping
        fraction= start + (- x * cwness) / revolution
      return fraction - floor(fraction)
    },
    interpolate: function(fraction, lo, hi){
      return lo + fraction * (hi - lo)
    }
  }

  // Preload sequences
  $.reel.preload= {
    linear: function(sequence, opt, get){
      return sequence
    },
    fidelity: function(sequence, opt, get){
      var
        rows= opt.orbital ? 2 : opt.rows || 1,
        frames= opt.orbital ? opt.footage : opt.frames,
        start= (opt.row-1) * frames,
        values= new Array().concat(sequence),
        present= new Array(sequence.length),
        priority= rows < 2 ? [] : values.slice(start, start + frames)
      return spread(priority, 1, start).concat(spread(values, rows, 0))

      function spread(sequence, rows, offset){
        if (!sequence.length) return [];
        var
          order= [],
          passes= 4 * rows,
          start= opt.frame,
          frames= sequence.length,
          granule= frames / passes
        for(var i= 0; i < passes; i++)
          add(start + round(i * granule));
        while(granule > 1)
          for(var i= 0, length= order.length, granule= granule / 2; i < length; i++)
            add(round(order[i] + granule));
        for(var i= 0; i < order.length; i++)
          order[i]= sequence[order[i] - 1];
        return order

        function add(frame){
          while(!(frame >= 1 && frame <= frames))
            frame+= frame < 1 ? +frames : -frames;
          return present[offset + frame] || (present[offset + frame]= !!order.push(frame))
        }
      }
    }
  }

  // Normalizations
  $.reel.normal= {
    fraction: function(fraction, opt, get){
      fraction= fraction != undefined ? fraction : get(_fraction_);
      return opt.loops ? fraction - floor(fraction) : min_max(0, 1, fraction)
    },
    row: function(row, opt, get){
      return min_max(0, 1, row != undefined ? (row-1) / (opt.rows-1) : get(_row_))
    },
    frame: function(frame, opt, get){
      var
        frame= frame != undefined ? round(frame) : get(_frame_),
        rows= (opt.orbital ? 2 : opt.rows || 1),
        frames= get(_frames_) * rows,
        result= opt.loops ? frame % frames || frames : min_max(1, frames, frame)
      return result < 0 ? result + frames : result
    }
  }

  $.reel.touchy= (/iphone|ipod|ipad|android/i).test(navigator.userAgent);
  $.reel.lazy= (/iphone|ipod|android/i).test(navigator.userAgent);

  $.reel.cdn= 'http://code.vostrel.cz/',

  $.reel.instances= $();
  $.reel.cost= 0;

  function leader(key){ return $.reel.instances.length ? $.reel.instances.first().data(key) : null }
  $.reel.leader= leader;

  function add_instance($instance){ return ($.reel.instances.push($instance[0])) && $instance }
  function remove_instance($instance){ return ($.reel.instances= $.reel.instances.not(hash($instance.attr(_id_)))) && $instance }

  // Double plugin functions in case plugin is missing
  double_for('mousewheel disableTextSelect enableTextSelect'.split(/ /));

  // PRIVATE
  var
    pool= $(document),
    $root= $('html'),
    browser_version= +$.browser.version.split(dot()).slice(0,2).join(dot()),
    ie= $.browser.msie,
    client= navigator.userAgent,
    os= {
      linux: (/linux/i).test(client),
      windows: (/windows/i).test(client),
      mac: (/macintosh/i).test(client)
    },
    inverted_buttons= (ie && browser_version <= 8),
    failsafe_cursor= 'ew-resize',
    ticker,
    ticks= { before: 0, now: new Date() },

    // HTML classes
    klass= 'reel',
    overlay_klass= klass + '-overlay',
    indicator_klass= klass + '-indicator',
    preloader_klass= klass + '-preloader',
    cached_klass= klass + '-cached',
    monitor_klass= klass + '-monitor',
    annotation_klass= klass + '-annotation',
    panning_klass= klass + '-panning',
    loading_klass= klass + '-loading',
    frame_klass= 'frame-',
    frame_klass_pattern= /frame-\d+/,

    // Shortcuts
    round= Math.round, floor= Math.floor, ceil= Math.ceil,
    min= Math.min, max= Math.max, abs= Math.abs, sqrt= Math.sqrt,
    number= parseInt,

    // Storage keys
    _annotations_= 'annotations',
    _area_= 'area', _backup_= 'backup', _backwards_= 'backwards', _bit_= 'bit', _brake_= 'brake', _center_= 'center',
    _clicked_= 'clicked', _clicked_location_= 'clicked_location', _clicked_on_= 'clicked_on', _clicked_row_= 'clicked_row',
    _cwish_= 'cwish', _dimensions_= 'dimensions', _fraction_= 'fraction', _frame_= 'frame', __frame_= '_frame',
    _frames_= 'frames', _hi_= 'hi', _hidden_= 'hidden', _image_= 'image', _images_= 'images', _opening_ticks_= 'opening_ticks',
    _lo_= 'lo', _playing_= 'playing', _reeling_= 'reeling', _revolution_= 'revolution', _row_= 'row', _rows_= 'rows',
    _spacing_= 'spacing', _speed_= 'speed', _stage_= 'stage', _steps_= 'steps', _stitched_= 'stitched',
    _stitched_travel_= 'stitched_travel', _stopped_= 'stopped', _style_= 'style', _tempo_= 'tempo', _velocity_= 'velocity',
    _vertical_= 'vertical', _wheel_step_= 'wheel_step',

    // Events
    ns= '.reel',
    _mousedown_= 'mousedown'+ns, _mouseenter_= 'mouseenter'+ns,
    _mouseleave_= 'mouseleave'+ns, _mousemove_= 'mousemove'+ns, _mouseup_= 'mouseup'+ns,
    _mousewheel_= 'mousewheel'+ns, _tick_= 'tick'+ns, _touchcancel_= 'touchcancel'+ns,
    _touchend_= 'touchend'+ns, _touchstart_= 'touchstart'+ns, _touchmove_= 'touchmove'+ns,

    // Various string primitives
    __= '', ___= ' ', ____=',', _absolute_= 'absolute', _a_= 'a', _block_= 'block', _cur_= 'cur', _div_= 'div',
    _hand_= 'hand', _height_= 'height', _hex_black_= hash('000'), _id_= 'id', _img_= 'img', _jquery_reel_= 'jquery.reel',
    _move_= 'move', _none_= 'none', _object_= 'object', _opening_= 'opening', _px_= 'px', _src_= 'src', _title_= 'title',
    _width_= 'width', _x_= 'x', _y_= 'y',

    // Image resources
    transparent= embedded('CAAIAIAAAAAAAAAAACH5BAEAAAAALAAAAAAIAAgAAAIHhI+py+1dAAA7') || cdn('blank.gif'),
    busy_cursor= 'wait',
    reel_cursor= cdn(_jquery_reel_+'-'+(os.mac ? 'black':'white')+dot(_cur_)),
    drag_cursor= cdn(_jquery_reel_+'-drag'+dot(_cur_)),
    drag_cursor_down= cdn(_jquery_reel_+'-drag-down'+dot(_cur_))

  // Helpers
  function embedded(image){ return 'data:image/gif;base64,R0lGODlh' + image }
  function tag(string){ return '<' + string + '/>' }
  function dot(string){ return '.' + (string || '') }
  function cdn(path){ return $.reel.cdn + path }
  function url(location){ return 'url(' + location + ')' }
  function min_max(minimum, maximum, number){ return max(minimum, min(maximum, number)) }
  function double_for(methods){ $.each(methods, pretend);
    function pretend(){ if (!$.fn[this]) $.fn[this]= function(){ return this }}
  }
  function negative_when(value, condition){ return abs(value) * (condition ? -1 : 1) }
  function finger(e){ return e.originalEvent.touches[0] }
  function px(value){ return value === undefined || typeof value == 'string' ? value : value + _px_ }
  function hash(value){ return '#' + value }
  function css(values){
    var rules= [];
    $.each(values, function(key, value){ rules.push(key.replace(/([A-Z])/g, '-$1').toLowerCase()+':'+px(value)) })
    return '{'+rules.join(';')+';}';
  }
  function bad_jquery(){
    var
      v= $().jquery.split('.'),
      low= +v[0] <= 1 && (+v[1] < 4 || (+v[1] == 4 && +v[2] < 3 ))
    if (low) try{ console.error('FATAL: jQuery Reel plug-in requires at least jQuery 1.4.3') }catch(e){}
    return low
  }
})(jQuery, window, document);
