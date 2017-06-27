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
 * @license Copyright (c) 2009-2012 Petr Vostrel (http://petr.vostrel.cz/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * jQuery Reel
 * http://jquery.vostrel.cz/reel
 * Version: 1.2-beta
 * Updated: 2012-02-17
 *
 * Requires jQuery 1.5 or higher
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

  if (+$().jquery.replace(dot(), '').substr(0, 2) < 15)
    throw 'VersionError: far too old jQuery for running Reel'

  var
    reel= $.reel= {
      version: '1.2-beta',

      // Options defaults
      def: {
        area:           undefined, // custom mouse-sensitive area jQuery collection
        brake:               0.23, // brake force of the inertial rotation
        clickfree:          false, // binds to mouse leave/enter events instead of down/up
        cw:                 false, // true for clockwise organization of sprite
        delay:                 -1, // delay before autoplay in seconds (no autoplay by default (-1))
        directional:        false, // two sets of frames (for forward and backward motion) are used when true
        draggable:           true, // mouse or finger drag interaction (allowed by default)
        footage:                6, // number of frames per line/column
        entry:          undefined, // speed of the opening animation (Hz, defaults to value of `speed`)
        frame:                  1, // initial frame
        frames:                36, // total number of frames; every 10° for full rotation
        graph:          undefined, // custom graph function
        hint:                  '', // mouse-sensitive area hint tooltip
        horizontal:          true, // roll flow; defaults to horizontal
        image:          undefined, // image sprite to be used
        images:                [], // sequence array of individual images to be used instead of sprite
        indicator:              0, // size of a visual indicator of reeling (in pixels)
        inversed:           false, // flags inversed organization of frames in orbital object movie
        klass:                 '', // plugin instance class name
        laziness:               6, // on "lazy" devices tempo is divided by this divisor for better performace
        loops:               true, // is it a loop?
        monitor:        undefined, // stored value name to monitor in the upper left corner of the viewport
        opening:                0, // duration of opening animation (in seconds)
        orbital:                0, // view centering tolerance in frames for dual-orbit object movies
        path:                  '', // URL path to be prepended to `image` or `images` filenames
        preloader:              2, // size (height) of a image loading indicator (in pixels)
        rebound:              0.5, // time spent on the edge (in seconds) of a non-looping panorama before it bounces back
        revolution:     undefined, // distance mouse must be dragged for full revolution
                                   // (defaults to double the viewport size or half the `stitched` option)
        row:                    1, // initial row
        rows:                   0, // number of rows for a multi-row setup (zero from one-row setup)
        spacing:                0, // space between frames on reel
        speed:                  0, // animated rotation speed in revolutions per second (Hz)
        step:           undefined, // [deprecated] use `frame` instead
        steps:          undefined, // [deprecated] use `frames` instead
        stitched:               0, // pixel width (length) of a stitched (rectilinear) panoramic reel
        suffix:           '-reel', // sprite filename suffix (A.jpg's sprite is A-reel.jpg by default)
        tempo:                 36, // shared ticker tempo in ticks per second
        timeout:                2, // idle timeout in seconds
        throwable:           true, // drag & throw interaction (allowed by default)
        vertical:           false, // switches orbital object movie to vertical mode
        wheelable:           true, // mouse wheel interaction (allowed by default)

        // [NEW] in version 1.2
        annotations:    undefined, // annotations definition object
        attr:                  {}, // initial attribute-value pairs map for the IMG tag
        cursor:         undefined, // mouse cursor overriding the default one
        preload:       'fidelity', // preloading order - either "linear" or "fidelity" (default)
        scrollable:          true, // allow page scroll (allowed by default; applies only to touch devices)
        steppable:           true, // allows to step the view (horizontally) by clicking on image
        sequence:              '', // URL of sequence images containing the hash placeholder
        velocity:               0  // initial velocity of user interaction; washes off quickly with `brake`
      },
      // [deprecated] options defaults may be gone anytime soon

      fn: {
        reel: function(/*
          .reel( options )            // makes an image reel
          .reel( name, [ value ] )    // interfaces reel image's control data
        */){
          var
            args= arguments,
            t= $(this),
            data= t.data(),
            name= args[0],
            value= args[1]
          if (args.length == 2){
            if (value !== undefined){
              try{ value= reel.normal[name](value, data) }catch(e){ }
              if (data[name] !== value) t.trigger(name+'Change', [ undefined, data[name]= value ]);
            }
            return t.trigger('store', [name, value]);

          }else if (typeof name == 'string'){
            var
              value= data[name]
            t.trigger('recall', [name, value]);
            return value;

          }else{
          var
            opt= $.extend({}, reel.def, name),
            applicable= (function(tags){
              // Only IMG tags with non-empty SRC and non-zero WIDTH and HEIGHT will pass
              var
                pass= []
              tags.filter(_img_).each(function(ix){
                var
                  $this= $(this),
                  src= opt.images.length && opt.images || opt.sequence || opt.image || opt.attr.src || $this.attr('src'),
                  width= number(opt.attr.width || $this.css(_width_)),
                  height= number(opt.attr.height || $this.css(_height_))
                if (src && src != __ && width && height) pass.push($this);
              });
              tags.filter(dot(klass)).each(function(ix){
                pass.push($(this).unreel());
              });
              return $(pass);
            })(this),
            instances= []

          // Backward-compatibility of [deprecated] legacy options
          opt.step && (opt.frame= opt.step);
          opt.steps && (opt.frames= opt.steps);

          applicable.each(function(){
            var
              t= $(this),

              // Quick data interface
              set= function(name, value){ return t.reel(name, value) && value },
              get= function(name){ return t.reel(name) },

              // Events & handlers
              on= {
                setup: function(e){
                /*
                - fills up the data storage with values based on options
                - binds to ticker
                */
                  if (t.hasClass(klass)) return;
                  set(_options_, opt);
                  var
                    src= t.attr(opt.attr).attr('src'),
                    id= set(_id_, t.attr(_id_) || t.attr(_id_, klass+'-'+(+new Date())).attr(_id_)),
                    styles= t.attr(_style_),
                    data= $.extend({}, t.data()),
                    sequence= reel.re.sequence.exec(opt.sequence),
                    images= set(_images_, sequence ? reel.sequence(sequence, opt, get) : opt.images),
                    stitched= opt.stitched,
                    loops= opt.loops,
                    size= { x: number(t.css(_width_) || opt.attr.width), y: number(t.css(_height_) || opt.attr.height) },
                    frames= set(_frames_, opt.orbital && opt.footage || opt.rows <= 1 && images.length || opt.frames),
                    rows= stitched ? 1 : ceil(frames / opt.footage),
                    stage_id= hash(id+opt.suffix),
                    classes= t[0].className || __,
                    $overlay= $(tag(_div_), { id: stage_id.substr(1), 'class': classes+___+overlay_klass+___+frame_klass+'0' }),
                    $instance= t.wrap($overlay.addClass(opt.klass)).attr({ 'class': klass }),
                    instances_count= instances.push(add_instance($instance)[0]),
                    $overlay= $instance.parent().bind(on.instance)
                  set(_image_, images.length ? __ : opt.image || src.replace(reel.re.image, '$1' + opt.suffix + '.$2'));
                  set(_cached_, []);
                  set(_spacing_, opt.spacing);
                  set(_rows_, rows);
                  set(_dimensions_, size);
                  set(_revolution_, opt.revolution || stitched / 2 || size.x * 2);
                  set(_bit_, 1 / (frames - (loops && !stitched ? 0 : 1)));
                  set(_stitched_, stitched);
                  set(_stitched_travel_, stitched - (loops ? 0 : size.x));
                  set(_stitched_shift_, 0);
                  set(_stage_, stage_id);
                  set(_backwards_, set(_speed_, opt.speed) < 0);
                  set(_velocity_, opt.velocity || 0);
                  set(_vertical_, opt.vertical);
                  set(_preloaded_, 0);
                  set(_cwish_, negative_when(1, !opt.cw && !stitched));
                  set(_clicked_location_, {});
                  set(_clicked_, false);
                  set(_clicked_on_, set(_clicked_tier_, 0));
                  set(_lo_, set(_hi_, 0));
                  set(_reeling_, false);
                  set(_opening_, false);
                  set(_brake_, opt.brake);
                  set(_center_, !!opt.orbital);
                  set(_tempo_, opt.tempo / (reel.lazy? opt.laziness : 1));
                  set(_opening_ticks_, -1);
                  set(_annotations_, opt.annotations || $overlay.unbind(dot(_annotations_)) && {});
                  set(_backup_, {
                    src: src,
                    classes: classes,
                    style: styles || __,
                    data: data
                  });
                  opt.steppable || $overlay.unbind('click.steppable');
                  opt.indicator || $overlay.unbind('.indicator');
                  css(__, { width: size.x, height: size.y, overflow: _hidden_, position: 'relative' });
                  css(____+___+dot(klass), { display: _block_ });
                  pool.bind(on.pool);
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
                    t.parent().unbind(on.instance);
                    get(_style_).remove();
                    get(_area_).enableTextSelect();
                    remove_instance(t.unbind(ns).removeData().siblings().unbind(ns).remove().end().attr({
                     'class': backup.classes,
                      src: backup.src,
                      style: backup.style
                    }).data(backup.data).unwrap());
                    no_bias();
                    pool.unbind(on.pool);
                    pools.unbind(pns);
                  },
                  setup: function(e){
                  /*
                  - binds all mouse/touch events (namespaced)
                  - prepares stage overlay elements
                  */
                    var
                      space= get(_dimensions_),
                      frames= get(_frames_),
                      id= t.attr(_id_),
                      $overlay= t.parent()
                      area= set(_area_, $(opt.area || $overlay ))
                    if (touchy){
                      // workaround for downsizing-sprites-bug-in-iPhoneOS inspired by Katrin Ackermann
                      css(___+dot(klass), { WebkitUserSelect: _none_, WebkitBackgroundSize: get(_images_).length
                        ? undefined : get(_stitched_) && px(get(_stitched_))+___+px(space.y)
                        || px(space.x * opt.footage)+___+px(space.y * get(_rows_) * (opt.rows || 1) * (opt.directional? 2:1))
                      });
                      area
                        .bind(_touchstart_, press())
                    }else{
                      var
                        cursor= opt.cursor == _hand_ ? drag_cursor : opt.cursor || reel_cursor,
                        cursor_down= opt.cursor == _hand_ ? drag_cursor_down+___+'!important' : undefined
                      css(__, { cursor: cursor });
                      css(dot(loading_klass), { cursor: 'wait' });
                      css(dot(panning_klass)+____+dot(panning_klass)+' *', { cursor: cursor_down || cursor }, true);
                      area
                        .bind(opt.wheelable ? _mousewheel_ : __, function(e, delta){ return e.preventDefault() || !delta || t.trigger('wheel', [delta]) && false })
                        .bind(opt.clickfree ? _mouseenter_ : _mousedown_, press())
                        .disableTextSelect();
                    }
                    function press(r){ return function(e){ if (e.button == DRAG_BUTTON) return e.preventDefault() || t.trigger('down', [finger(e).clientX, finger(e).clientY]) && r }}
                    opt.hint && area.attr('title', opt.hint);
                    opt.indicator && $overlay.append(indicator('x'));
                    opt.rows > 1 && opt.indicator && $overlay.append(indicator('y'));
                    opt.monitor && $overlay.append($monitor= $(tag(_div_), { 'class': monitor_klass }))
                                && css(___+dot(monitor_klass), { position: _absolute_, left: 0, top: 0 });
                    css(___+dot(cached_klass), { display: _none_ });
                  },
                  preload: function(e){
                  /*
                  - preloads all frames and sprites
                  */
                    var
                      space= get(_dimensions_),
                      $overlay= t.parent(),
                      images= get(_images_),
                      is_sprite= !images.length,
                      frames= get(_frames_),
                      order= reel.preload[opt.preload] || reel.preload[reel.def.preload],
                      preload= is_sprite ? [get(_image_)] : order(images.slice(0), opt, get),
                      to_load= preload.length,
                      preloaded= set(_preloaded_, is_sprite ? 0.5 : 0),
                      uris= []
                    $overlay.addClass(loading_klass).append(preloader());
                    set(_style_, $('<'+_style_+' type="text/css">'+css.rules.join('\n')+'</'+_style_+'>').prependTo(_head_));
                    t.trigger('stop');
                    while(preload.length){
                      var
                        uri= opt.path+preload.shift(),
                        width= space.x * (!is_sprite ? 1 : opt.footage),
                        height= space.y * (!is_sprite ? 1 : frames / opt.footage) * (!opt.directional ? 1 : 2),
                        $img= $(tag(_img_)).attr({ 'class': cached_klass, width: width, height: height }).appendTo($overlay)
                      // The actual loading of the image is done asynchronously
                      $img.bind('load error abort', function(){
                        return !!$(this).parent().length && t.trigger('preloaded') && false;
                      });
                      load(uri, $img);
                      uris.push(uri);
                    }
                    set(_cached_, uris);
                    function load(uri, $img){ setTimeout(function(){
                      $img.parent().length && $img.attr({ src: uri });
                    }, (to_load - preload.length) * 2) }
                  },
                  preloaded: function(e){
                    var
                      images= get(_images_).length || 1,
                      preloaded= set(_preloaded_, min(get(_preloaded_) + 1, images))
                    if (preloaded === images){
                      t.parent().removeClass(loading_klass).unbind(_preloaded_, on.instance.preloaded);
                      t.trigger('loaded');
                    }
                    if (preloaded === 1) var
                      frame= t.trigger('frameChange', [undefined, get(_frame_)])
                  },
                  loaded: function(e){
                    get(_images_).length > 1 || t.css({ backgroundImage: url(opt.path+get(_image_)) }).attr({ src: transparent });
                  },

                  // Opening animation
                  opening: function(e){
                  /*
                  - initiates opening animation
                  - or simply plays the reel when without opening
                  */
                    if (!opt.opening) return t.trigger('openingDone');
                    var
                      opening= set(_opening_, true),
                      stopped= set(_stopped_, !get(_speed_)),
                      speed= opt.entry || opt.speed,
                      end= get(_fraction_),
                      duration= opt.opening,
                      start= set(_fraction_, end - speed * opt.opening),
                      ticks= set(_opening_ticks_, ceil(duration * leader(_tempo_)))
                  },
                  openingDone: function(e){
                    var
                      playing= set(_playing_, false),
                      opening= set(_opening_, false),
                      evnt= _tick_+dot(_opening_)
                    pool.unbind(evnt, on.pool[evnt]);
                    if (opt.delay > 0) delay= setTimeout(function play(){ t.trigger('play') }, opt.delay * 1000)
                    else t.trigger('play');
                  },

                  // Playback
                  play: function(e, speed){
                    var
                      speed= set(_speed_, speed || get(_speed_)),
                      playing= set(_playing_, !!speed),
                      stopped= set(_stopped_, !playing)
                    idle();
                  },
                  pause: function(e){
                    var
                      playing= set(_playing_, false)
                    unidle();
                  },
                  stop: function(e){
                    var
                      stopped= set(_stopped_, true),
                      playing= set(_playing_, !stopped)
                  },

                  // Mouse or touch interactivity
                  down: function(e, x, y){
                  /*
                  - starts the dragging operation by binding dragging events to the pool
                  */
                    if (opt.draggable){
                      var
                        clicked= set(_clicked_, get(_frame_)),
                        velocity= set(_velocity_, 0),
                        scrollable= !get(_reeling_) || opt.rows <= 1 || !opt.orbital || opt.scrollable,
                        origin= last= recenter_mouse(get(_revolution_), x, y)
                      unidle();
                      no_bias();
                      panned= false;
                      $(_html_, pools).addClass(panning_klass);
                      if (touchy){
                        pools
                        .bind(_touchmove_, drag(!scrollable))
                        .bind(_touchend_+___+_touchcancel_, lift())
                      }else{
                        (opt.clickfree ? get(_area_) : pools)
                        .bind(_mousemove_, drag())
                        .bind(opt.clickfree ? _mouseleave_ : _mouseup_, lift())
                      }
                    }
                    function drag(r){ return function(e){ e.preventDefault(); t.trigger('pan', [finger(e).clientX, finger(e).clientY, e]); return r }}
                    function lift(r){ return function(e){ e.preventDefault(); t.trigger('up'); return r }}
                  },
                  up: function(e){
                  /*
                  - ends dragging operation by calculating velocity by summing the bias
                  - unbinds dragging events from pool
                  - resets the mouse cursor
                  */
                    if (!opt.draggable) return;
                    var
                      clicked= set(_clicked_, false),
                      reeling= set(_reeling_, false),
                      velocity= set(_velocity_, !opt.throwable ? 0 : abs(bias[0] + bias[1]) / 60),
                      brakes= braking= velocity ? 1 : 0
                    unidle();
                    no_bias();
                    get(_stopped_) || t.trigger('play');
                    $(_html_, pools).removeClass(panning_klass);
                    pools.unbind(pns);
                  },
                  pan: function(e, x, y, ev){
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
                        host_offset= ev && !$(ev.currentTarget).is(pool) && $iframe.offset() || { left: 0, top: 0 },
                        x= x - host_offset.left,
                        y= y - host_offset.top,
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
                          origin= recenter_mouse(revolution, x, y)
                        if (opt.rows > 1) var
                          space_y= get(_dimensions_).y,
                          revolution_y= opt.rows > 3 ? space_y : space_y / (5 - opt.rows),
                          start= get(_clicked_tier_),
                          lo= - start * revolution_y,
                          tier= set(_tier_, reel.math.envelope(y - origin.y, start, revolution_y, lo, lo + revolution_y, -1))
                        if (!(fraction % 1) && !opt.loops) var
                          origin= recenter_mouse(revolution, x, y)
                      }
                    }
                  },
                  wheel: function(e, distance){
                  /*
                  - calculates wheel input delta and adjusts fraction using the graph
                  - recenters the "drag" each and every time
                  - detects motion direction
                  - nullifies the velocity
                  */
                    if (!distance) return;
                    var
                      delta= ceil(math.sqrt(abs(distance)) / 2),
                      delta= negative_when(delta, distance > 0),
                      revolution= 0.0833 * get(_revolution_), // Wheel's revolution is 1/12 of full revolution
                      origin= recenter_mouse(revolution),
                      backwards= delta && set(_backwards_, delta < 0),
                      velocity= set(_velocity_, 0),
                      fraction= set(_fraction_, graph(delta, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_)))
                    unidle();
                    t.trigger('up')
                    return false;
                  },

                  // Data change reactions
                  fractionChange: function(e, set_fraction, fraction){
                  /*
                  - calculates and changes sprite frame
                  - for non-looping panoramas
                      - keeps track of ticks spent on edge
                      - reverses motion direction if too long
                  */
                    if (set_fraction !== undefined) return deprecated(set(_fraction_, set_fraction));
                    var
                      frame= 1 + floor(fraction / get(_bit_)),
                      multirow= opt.rows > 1,
                      orbital= opt.orbital,
                      center= set(_center_, !!orbital && (frame <= orbital || frame >= opt.footage - orbital + 2))
                    if (multirow) var
                      frame= frame + (get(_row_) - 1) * get(_frames_)
                    var
                      frame= set(_frame_, frame)
                  },
                  tierChange: function(e, deprecated_set, tier){
                    if (deprecated_set === undefined) var
                      row= set(_row_, round(interpolate(tier, 1, opt.rows))),
                      frames= get(_frames_),
                      frame= get(_frame_) % frames || frames,
                      frame= set(_frame_, frame + row * frames - frames)
                  },
                  rowChange: function(e, set_row, row){
                  /*
                  - recalculates frame from fraction in order to have fresh unshifted value
                  - shifts the stored frame to a desired row
                  */
                    if (set_row !== undefined) return set(_row_, set_row);
                    var
                      tier= set(_tier_, 1 / (opt.rows - 1) * (row - 1))
                  },
                  frameChange: function(e, set_frame, frame){
                  /*
                  - calculates and eventually sets fraction (and tier) from given frame
                  - calculates sprite background position shift and applies it
                    or changes sprite image
                  */
                    if (set_frame !== undefined) return deprecated(set(_frame_, set_frame));
                    this.className= this.className.replace(reel.re.frame_klass, frame_klass + frame);
                    var
                      frames= get(_frames_),
                      base= frame % frames || frames,
                      ready= !!get(_preloaded_),
                      frame_row= (frame - base) / frames + 1,
                      frame_tier= (frame_row - 1) / (opt.rows - 1),
                      tier_row= round(interpolate(frame_tier, 1, opt.rows)),
                      tier= ready && tier_row === get(_row_) ? get(_tier_) : set(_tier_, frame_tier),
                      frame_fraction= min((base - 1) / (frames - 1), 0.9999),
                      row_shift= get(_row_) * frames - frames,
                      fraction_frame= round(interpolate(frame_fraction, row_shift + 1, row_shift + frames)),
                      same_spot= abs((get(_fraction_) || 0) - frame_fraction) < 1 / (get(_frames_) - 1),
                      fraction= ready && (fraction_frame === frame && same_spot) ? get(_fraction_) : set(_fraction_, frame_fraction),
                      footage= opt.footage
                    if (opt.orbital && get(_vertical_)) var
                      frame= opt.inversed ? footage + 1 - frame : frame,
                      frame= frame + footage
                    var
                      horizontal= opt.horizontal,
                      images= get(_images_),
                      is_sprite= !images.length,
                      space= get(_dimensions_)
                    if (!is_sprite){
                      var
                        frameshot= images[frame - 1]
                      ready && t.attr({ src: opt.path + frameshot })
                    }else{
                      if (!opt.stitched) var
                        minor= (frame % footage) - 1,
                        minor= minor < 0 ? footage - 1 : minor,
                        major= floor((frame - 0.1) / footage),
                        major= major + (opt.rows > 1 ? 0 : (get(_backwards_) ? 0 : get(_rows_))),
                        spacing= get(_spacing_),
                        a= major * ((horizontal ? space.y : space.x) + spacing),
                        b= minor * ((horizontal ? space.x : space.y) + spacing),
                        shift= images.length ? [0, 0] : horizontal ? [px(-b), px(-a)] : [px(-a), px(-b)]
                      else var
                        x= set(_stitched_shift_, round(interpolate(frame_fraction, 0, get(_stitched_travel_))) % opt.stitched),
                        y= 0,
                        shift= [px(-x), px(y)]
                      t.css({ backgroundPosition: shift.join(___) })
                    }
                  },

                  // Stepping
                  'click.steppable': function(e){
                    if (panned) return mute(e, false);
                    t.trigger(e.clientX - t.offset().left > 0.5 * get(_dimensions_).x ? 'stepRight' : 'stepLeft')
                  },
                  'stepLeft stepRight': function(e){
                    unidle();
                  },
                  stepLeft: function(e){
                    set(_backwards_, false);
                    set(_fraction_, get(_fraction_) - get(_bit_) * get(_cwish_));
                  },
                  stepRight: function(e){
                    set(_backwards_, true);
                    set(_fraction_, get(_fraction_) + get(_bit_) * get(_cwish_));
                  },

                  // Indicators
                  'fractionChange.indicator': function(e, deprecated_set, fraction){
                    if (deprecated_set === undefined && opt.indicator) var
                      space= get(_dimensions_),
                      travel= opt.orbital && get(_vertical_) ? space.y : space.x,
                      slots= opt.orbital ? opt.footage : opt.images.length || get(_frames_),
                      size= opt.indicator,
                      weight= ceil(travel / slots),
                      travel= travel - weight,
                      indicate= round(interpolate(fraction, 0, travel)),
                      indicate= !opt.cw || opt.stitched ? indicate : travel - indicate,
                      $indicator= indicator.$x.css(get(_vertical_)
                      ? { left: 0, top: px(indicate), bottom: _auto_, width: size, height: weight }
                      : { bottom: 0, left: px(indicate), top: _auto_, width: weight, height: size })
                  },
                  'tierChange.indicator': function(e, deprecated_set, tier){
                    if (deprecated_set === undefined && opt.rows > 1 && opt.indicator) var
                      space= get(_dimensions_),
                      travel= space.y,
                      slots= opt.rows,
                      size= opt.indicator,
                      weight= ceil(travel / opt.rows),
                      travel= travel - weight,
                      indicate= round(tier * travel),
                      $yindicator= indicator.$y.css({ left: 0, top: indicate, width: size, height: weight })
                  },

                  // Annotations
                  'setup.annotations': function(e){
                    var
                      space= get(_dimensions_),
                      $overlay= t.parent(),
                      film_css= { position: _absolute_, width: space.x, height: space.y, left: 0, top: 0 }
                    $.each(get(_annotations_), function(ida, note){
                      var
                        $note= typeof note.node == _string_ ? $(note.node) : note.node || {},
                        $note= $note.jquery ? $note : $(tag(_div_), $note),
                        $note= $note.attr({ id: ida }).addClass(annotation_klass),
                        $image= note.image ? $(tag(_img_), note.image) : $(),
                        $link= note.link ? $(tag('a'), note.link) : $()
                      css(hash(ida), { display: _none_, position: _absolute_ }, true);
                      $note.bind({
                        'click.annotations': function(e){
                          e.stopPropagation();
                        }
                      })
                      note.image || note.link && $note.append($link);
                      note.link || note.image && $note.append($image);
                      note.link && note.image && $note.append($link.append($image));
                      $note.appendTo($overlay);
                    });
                  },
                  'frameChange.annotations': function(e, deprecation, frame){
                    if (!get(_preloaded_)) return;
                    if (deprecation === undefined) $.each(get(_annotations_), function(ida, note){
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
                        x= !opt.stitched ? x : x - get(_stitched_shift_),
                        style= { display: visible ? _block_:_none_, left: px(x), top: px(y) }
                      $note.css(style);
                    });
                  },

                  // Follow-ups
                  'setup.fu': function(e){
                    var
                      frame= set(_frame_, opt.frame + (opt.row - 1) * get(_frames_))
                    t.trigger('preload')
                  },
                  'loaded.fu': function(){ t.trigger('opening') }
                },
                pool: {
                  'tick.reel.preload': function(e){
                    var
                      space= get(_dimensions_),
                      current= number(preloader.$.css(_width_)),
                      images= get(_images_).length || 1,
                      target= round(1 / images * get(_preloaded_) * space.x)
                    preloader.$.css({ width: current + (target - current) / 3 + 1 })
                    if (get(_preloaded_) === images && current > space.x - 1){
                      preloader.$.fadeOut(300, function(){ preloader.$.remove() });
                      pool.unbind(_tick_+dot(_preload_), on.pool[_tick_+dot(_preload_)]);
                    }
                  },
                  'tick.reel': function(e){
                  /*
                  - triggered by pool's `tick.reel` event
                  - keeps track of operated and braked statuses
                  - decreases inertial velocity by braking
                  */
                    var
                      velocity= get(_velocity_),
                      leader_tempo= leader(_tempo_)
                    if (braking) var
                      braked= velocity - (get(_brake_) / leader_tempo * braking),
                      velocity= set(_velocity_, braked > 0.1 ? braked : (braking= operated= 0))
                    opt.monitor && $monitor.text(get(opt.monitor));
                    velocity && braking++;
                    operated && operated++;
                    to_bias(0);
                    slidable= true;
                    if (operated && !velocity) return mute(e);
                    if (get(_clicked_)) return mute(e, unidle());
                    if (get(_opening_ticks_) > 0) return;
                    if (!opt.loops && opt.rebound) var
                      edgy= !operated && !(get(_fraction_) % 1) ? on_edge++ : (on_edge= 0),
                      bounce= on_edge >= opt.rebound * 1000 / leader_tempo,
                      backwards= bounce && set(_backwards_, !get(_backwards_))
                    var
                      direction= get(_cwish_) * negative_when(1, get(_backwards_)),
                      step= (!get(_playing_) ? velocity : abs(get(_speed_)) + velocity) / leader(_tempo_),
                      fraction= set(_fraction_, get(_fraction_) - step * direction)
                  },
                  'tick.reel.opening': function(e){
                  /*
                  - ticker listener dedicated to opening animation
                  */
                    if (!get(_opening_)) return;
                    var
                      speed= opt.entry || opt.speed,
                      step= speed / leader(_tempo_) * (opt.cw? -1:1),
                      ticks= set(_opening_ticks_, get(_opening_ticks_) - 1),
                      fraction= set(_fraction_, get(_fraction_) + step)
                    ticks || t.trigger('openingDone');
                  }
                }
              },

              // Events propagation stopper / muter
              mute= function(e, result){ return e.stopImmediatePropagation() || result },

              // User idle control
              operated,
              braking= 0,
              idle= function(){ return operated= 0 },
              unidle= function(){
                clearTimeout(delay);
                pool.unbind(_tick_+dot(_opening_), on.pool[_tick_+dot(_opening_)]);
                set(_opening_ticks_, 0);
                return operated= -opt.timeout * leader(_tempo_)
              },
              panned= false,
              delay, // openingDone's delayed play pointer

              $monitor= $(),
              preloader= function(){
                css(___+dot(preloader_klass), {
                  position: _absolute_,
                  left: 0, top: get(_dimensions_).y - opt.preloader,
                  height: opt.preloader,
                  overflow: _hidden_,
                  backgroundColor: '#000'
                });
                return preloader.$= $(tag(_div_), { 'class': preloader_klass })
              },
              indicator= function(axis){
                css(___+dot(indicator_klass)+dot(axis), {
                  position: _absolute_,
                  width: 0, height: 0,
                  overflow: _hidden_,
                  backgroundColor: '#000'
                });
                return indicator['$'+axis]= $(tag(_div_), { 'class': indicator_klass+___+axis })
              },

              // CSS rules & stylesheet
              css= function(selector, definition, global){
                var
                  stage= global ? __ : get(_stage_),
                  selector= selector.replace(/^/, stage).replace(____, ____+stage)
                return css.rules.push(selector+cssize(definition)) && definition
                function cssize(values){
                  var rules= [];
                  $.each(values, function(key, value){ rules.push(key.replace(/([A-Z])/g, '-$1').toLowerCase()+':'+px(value)+';') });
                  return '{'+rules.join(__)+'}'
                }
              },
              $style,

              // Inertia rotation control
              on_edge= 0,
              last= { x: 0, y: 0 },
              to_bias= function(value){ return bias.push(value) && bias.shift() && value },
              no_bias= function(){ return bias= [0,0] },
              bias= no_bias(),

              // Graph function to be used
              graph= opt.graph || reel.math[opt.loops ? 'hatch' : 'envelope'],
              normal= reel.normal,

              // Resets the interaction graph's zero point
              recenter_mouse= function(revolution, x, y){
                var
                  fraction= set(_clicked_on_, get(_fraction_)),
                  tier= set(_clicked_tier_, get(_tier_))
                set(_lo_, opt.loops ? 0 : - fraction * revolution);
                set(_hi_, opt.loops ? revolution : revolution - fraction * revolution);
                return x && set(_clicked_location_, { x: x, y: y }) || undefined
              },
              slidable= true,
              pools
            try{ pools= $.unique(pool.add(window.top.document)) }
            catch(e){ pools= pool }
            var
              $iframe= top === self ? $() : (function sense_iframe($ifr){
                $('iframe', pools.last()).each(function(){
                  try{ if ($(this).contents().find(_head_).html() == $(_head_).html()) return ($ifr= $(this)) && false }
                  catch(e){}
                })
                return $ifr
              })()
            css.rules= [];
            on.setup();
          });

          ticker= ticker || (function tick(){
            var
              start= +new Date(),
              tempo= leader(_tempo_),
              ticker
            if (tempo){
              pool.trigger(_tick_);
              reel.cost= (+new Date() + reel.cost - start) / 2;
              ticker= setTimeout(tick, max(4, 1000 / tempo - reel.cost));
            }
            return ticker
          })();

          return $(instances);
          }
        },

        unreel: function(){
          return this.trigger('teardown');
        }
      },

      re: {
        image:         /^(.*)\.(jpg|jpeg|png|gif)$/,
        touchy_agent:  /iphone|ipod|ipad|android/i,
        lazy_agent:    /iphone|ipod|android/i,
        frame_klass:   /frame-\d+/,
        sequence:      /(^[^#|]*([#]+)[^#|]*)($|[|]([0-9]+)\.\.([0-9]+))($|[|]([0-9]+)$)/
      },

      cdn: 'http://code.vostrel.cz/',

      // Mathematics core
      math: {
        envelope: function(x, start, revolution, lo, hi, cwness, y){
          return start + min_max(lo, hi, - x * cwness) / revolution
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
      },

      // Preload sequences
      preload: {
        linear: function(sequence, opt, get){
          return sequence
        },
        fidelity: function(sequence, opt, get){
          var
            rows= opt.orbital ? 2 : opt.rows || 1,
            frames= opt.orbital ? opt.footage : get(_frames_),
            start= (opt.row-1) * frames,
            values= new Array().concat(sequence),
            present= new Array(sequence.length + 1),
            priority= rows < 2 ? [] : values.slice(start, start + frames)
          return spread(priority, 1, start).concat(spread(values, rows, 0))

          function spread(sequence, rows, offset){
            if (!sequence.length) return [];
            var
              order= [],
              passes= 4 * rows,
              start= opt.frame,
              frames= sequence.length,
              plus= true,
              granule= frames / passes
            for(var i= 0; i < passes; i++)
              add(start + round(i * granule));
            while(granule > 1)
              for(var i= 0, length= order.length, granule= granule / 2, p= plus= !plus; i < length; i++)
                add(order[i] + (plus? 1:-1) * round(granule));
            for(var i=0; i <= frames; i++) add(i);
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
      },

      // Normalizations
      normal: {
        fraction: function(fraction, data){
          return data[_options_].loops ? fraction - floor(fraction) : min_max(0, 1, fraction)
        },
        tier: function(tier, data){
          return min_max(0, 1, tier)
        },
        row: function(row, data){
          return round(min_max(1, data[_options_].rows, row))
        },
        frame: function(frame, data){
          var
            opt= data[_options_],
            frames= data[_frames_] * (opt.orbital ? 2 : opt.rows || 1),
            result= round(opt.loops ? frame % frames || frames : min_max(1, frames, frame))
          return result < 0 ? result + frames : result
        }
      },

      sequence: function(sequence, opt){
        if (sequence.length <= 1) return opt.images;
        var
          images= [],
          url= sequence[1],
          placeholder= sequence[2],
          start= +sequence[4] || 1,
          rows= opt.orbital ? 2 : opt.rows || 1,
          frames= opt.orbital ? opt.footage : opt.frames,
          end= +(sequence[5] || rows * frames),
          total= end - start,
          increment= +sequence[7] || 1,
          counter= 0
        while(counter < end){
          images.push(url.replace(placeholder, pad((start + counter + __), placeholder.length, '0')));
          counter+= increment;
        }
        return images;
        function pad(string, len, fill){
          while (string.length < len) string= fill + string;
          return string;
        }
      },

      instances: $(),
      leader: leader,
      cost: 0
    },

    // PRIVATE

    pool= $(document),
    browser_version= +$.browser.version.split(dot()).slice(0,2).join(dot()),
    ie= $.browser.msie,
    knows_data_urls= !ie || (ie && browser_version > 6),
    client= navigator.userAgent,
    ticker,

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

    // Shortcuts
    math= Math,
    round= math.round, floor= math.floor, ceil= math.ceil,
    min= math.min, max= math.max, abs= math.abs,
    number= parseInt,
    interpolate= reel.math.interpolate,

    // Storage keys
    _annotations_= 'annotations',
    _area_= 'area', _auto_= 'auto', _backup_= 'backup', _backwards_= 'backwards', _bit_= 'bit', _brake_= 'brake', _cached_= 'cached', _center_= 'center',
    _clicked_= 'clicked', _clicked_location_= 'clicked_location', _clicked_on_= 'clicked_on', _clicked_tier_= 'clicked_tier',
    _cwish_= 'cwish', _dimensions_= 'dimensions', _fraction_= 'fraction', _frame_= 'frame',
    _frames_= 'frames', _hi_= 'hi', _hidden_= 'hidden', _image_= 'image', _images_= 'images', _opening_= 'opening', _opening_ticks_= _opening_+'_ticks',
    _lo_= 'lo', _options_= 'options', _playing_= 'playing', _preloaded_= 'preloaded', _reeling_= 'reeling', _revolution_= 'revolution', _row_= 'row',
    _rows_= 'rows', _spacing_= 'spacing', _speed_= 'speed', _stage_= 'stage', _stitched_= 'stitched',
    _stitched_shift_= 'stitched_shift', _stitched_travel_= 'stitched_travel', _stopped_= 'stopped', _style_= 'style', _tempo_= 'tempo', _tier_= 'tier',
    _velocity_= 'velocity', _vertical_= 'vertical',

    // Events
    ns= dot(klass),
    pns= '.pan' + ns,
    _touch_= 'touch', _mouse_= 'mouse',
    _mousedown_= _mouse_+'down'+ns, _mouseenter_= _mouse_+'enter'+ns,
    _mouseleave_= _mouse_+'leave'+pns, _mousemove_= _mouse_+'move'+pns, _mouseup_= _mouse_+'up'+pns,
    _mousewheel_= _mouse_+'wheel'+ns, _tick_= 'tick'+ns, _touchcancel_= _touch_+'cancel'+pns,
    _touchend_= _touch_+'end'+pns, _touchstart_= _touch_+'start'+ns, _touchmove_= _touch_+'move'+pns,

    // Various string primitives
    __= '', ___= ' ', ____=',', _absolute_= 'absolute', _block_= 'block', _div_= 'div',
    _hand_= 'hand', _head_= 'head', _height_= 'height', _html_= 'html', _id_= 'id',
    _img_= 'img', _jquery_reel_= 'jquery.'+klass, _move_= 'move', _none_= 'none', _object_= 'object',
    _preload_= 'preload', _string_= 'string',
    _width_= 'width',

    // Image resources
    transparent= knows_data_urls ? embedded('CAAIAIAAAAAAAAAAACH5BAEAAAAALAAAAAAIAAgAAAIHhI+py+1dAAA7') : cdn('blank.gif'),
    reel_cursor= url(cdn(_jquery_reel_+'.cur'))+____+_move_,
    drag_cursor= url(cdn(_jquery_reel_+'-drag.cur'))+____+_move_,
    drag_cursor_down= url(cdn(_jquery_reel_+'-drag-down.cur'))+____+_move_,

    touchy= reel.touchy= (reel.re.touchy_agent).test(client),
    lazy= reel.lazy= (reel.re.lazy_agent).test(client),

    DRAG_BUTTON= touchy ? undefined : (ie && browser_version <= 8) ? 1 : 0

  // Double for missing plugin functions
  double_for('disableTextSelect enableTextSelect'.split(/ /));

  // Expose plugin functions as jQuery methods
  $.extend($.fn, reel.fn);

  // Helpers
  function add_instance($instance){ return (reel.instances.push($instance[0])) && $instance }
  function remove_instance($instance){ return (reel.instances= reel.instances.not(hash($instance.attr(_id_)))) && $instance }
  function leader(key){ return reel.instances.length ? reel.instances.first().data(key) : null }
  function embedded(image){ return 'data:image/gif;base64,R0lGODlh' + image }
  function tag(string){ return '<' + string + '/>' }
  function dot(string){ return '.' + (string || '') }
  function cdn(path){ return reel.cdn + path }
  function url(location){ return 'url(' + location + ')' }
  function min_max(minimum, maximum, number){ return max(minimum, min(maximum, number)) }
  function double_for(methods){ $.each(methods, pretend);
    function pretend(){ if (!$.fn[this]) $.fn[this]= function(){ return this }}
  }
  function negative_when(value, condition){ return abs(value) * (condition ? -1 : 1) }
  function finger(e){ return touchy ? e.touch || e.originalEvent.touches[0] : e }
  function px(value){ return value === undefined ? 0 : typeof value == _string_ ? value : value + 'px' }
  function hash(value){ return '#' + value }
  function deprecated(input){ try{ console.warn('Deprecation - Please consult https://github.com/pisi/Reel/wiki/Deprecations') }catch(e){} return input }
})(jQuery, window, document);
