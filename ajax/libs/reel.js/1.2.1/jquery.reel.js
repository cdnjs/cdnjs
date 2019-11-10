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
 * The 360° plugin for jQuery
 *
 * @license Copyright (c) 2009-2013 Petr Vostrel (http://petr.vostrel.cz/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * jQuery Reel
 * http://jquery.vostrel.cz/reel
 * Version: 1.2.1
 * Updated: 2013-02-23
 *
 * Requires jQuery 1.5 or higher
 */

/*
 * CDN
 * ---
 * - http://code.vostrel.cz/jquery.reel-bundle.js (recommended)
 * - http://code.vostrel.cz/jquery.reel.js
 * - http://code.vostrel.cz/jquery.reel-debug.js
 * - or http://code.vostrel.cz/jquery.reel-edge.js if you feel like it ;)
 *
 * Optional Plugins
 * ----------------
 * - jQuery.mouseWheel [B] (Brandon Aaron, http://plugins.jquery.com/project/mousewheel)
 * - or jQuery.event.special.wheel (Three Dub Media, http://blog.threedubmedia.com/2008/08/eventspecialwheel.html)
 *
 * [B] Marked plugins are contained (with permissions) in the "bundle" version from the CDN
 */

jQuery.reel || (function($, window, document, undefined){

  // One vital requirement is the correct jQuery. Reel requires at least version 1.5
  // and a make sure check is made at the very beginning.
  if (!$ || +$().jquery.replace('.', __).substr(0, 2) < 15) return;

  // `$.reel` (or `jQuery.reel`) namespace is provided for storage of all Reel belongings.
  // It is locally referenced as just `reel` for speedier access.
  var
    reel= $.reel= {

      // ### `$.reel.version`
      //
      // `String` (major.minor.patch), since 1.1
      version: '1.2-devel',

      // Options
      // -------
      //
      // When calling `.reel()` method you have plenty of options (far too many) available.
      // You collect them into one hash and supply them with your call.
      //
      // ___Example:__ For a non-looping Reel with 12 frames:_
      //
      //     .reel({
      //       frames: 12,
      //       looping: false
      //     })
      //
      //
      // All options are optional and if omitted, default value is used instead.
      // Defaults are being housed as members of `$.reel.def` hash.
      // If you customize any default value therein, all subsequent `.reel()` calls
      // will use the new value as default.
      //
      // ___Example:__ Change default initial frame to 5th:_
      //
      //     $.reel.def.frame = 5
      //

      // ### `$.reel.def` ######
      // `Object`, since 1.1
      //
      def: {
        // ---
        // ### Basic Definition ######
        //
        // Reel is just fine with you not setting any options, however if you don't have
        // 36 frames or beginning at frame 1, you will want to set total number
        // of `frames` and pick a different starting `frame`.
        //

        // #### `frame` Option ####
        // `Number` (frames), since 1.0
        //
        frame:                  1,

        // #### `frames` Option ####
        // `Number` (frames), since 1.0
        //
        frames:                36,

        // ~~~
        //
        // Another common characteristics of any Reel is whether it `loops` and covers
        // entire 360° or not.
        //

        // #### `loops` Option ####
        // `Boolean`, since 1.0
        //
        loops:               true,


        // ---
        // ### Interaction ######
        //
        // Using boolean switches many user interaction aspects can be turned on and off.
        // You can disable the mouse wheel control with `wheelable`, the drag & throw
        // action with `throwable`, disallow the dragging completely with `draggable`,
        // on "touchy" devices you can disable the browser's decision to scroll the page
        // instead of Reel script and you can of course disable the stepping of Reel by
        // clicking on either half of the image with `steppable`.
        //
        // You can even enable `clickfree` operation,
        // which will cause Reel to bind to mouse enter/leave events instead of mouse down/up,
        // thus allowing a click-free dragging.
        //

        // #### `clickfree` Option ####
        // `Boolean`, since 1.1
        //
        clickfree:          false,

        // #### `draggable` Option ####
        // `Boolean`, since 1.1
        //
        draggable:           true,

        // #### `scrollable` Option ####
        // [NEW] `Boolean`, since 1.2
        //
        scrollable:          true,

        // #### `steppable` Option ####
        // [NEW] `Boolean`, since 1.2
        //
        steppable:           true,

        // #### `throwable` Option ####
        // `Boolean`, since 1.1; or `Number`, since 1.2.1
        //
        throwable:           true,

        // #### `wheelable` Option ####
        // `Boolean`, since 1.1
        //
        wheelable:           true,


        // ---
        // ### Order of Images ######
        //
        // Reel presumes counter-clockwise order of the pictures taken. If the neerer facing
        // side doesn't follow your cursor/finger, you did clockwise. Use the `cw` option to
        // correct this.
        //

        // #### `cw` Option ####
        // `Boolean`, since 1.1
        //
        cw:                 false,


        // ---
        // ### Sensitivity ######
        //
        // In Reel sensitivity is set through the `revolution` parameter, which represents horizontal
        // dragging distance one must cover to perform one full revolution. By default this value
        // is calculated based on the setup you have - it is either twice the width of the image
        // or half the width of stitched panorama. You may also set your own.
        //
        // Optionally `revolution` can be set as an Object with `x` member for horizontal revolution
        // and/or `y` member for vertical revolution in multi-row movies.
        //

        // #### `revolution` Option ####
        // `Number` (pixels) or `Object`, since 1.1, `Object` support since 1.2
        //
        revolution:     undefined,


        // ---
        // ### Rectilinear Panorama ######
        //
        // The easiest of all is the stitched panorama mode. For this mode, instead of the sprite,
        // a single seamlessly stitched stretched image is used and the view scrolls the image.
        // This mode is triggered by setting a pixel width of the `stitched` image.
        //

        // #### `stitched` Option ####
        // `Number` (pixels), since 1.0
        //
        stitched:               0,


        // ---
        // ### Directional Mode ######
        //
        // As you may have noticed on Reel's homepage or in [this example][logo]
        // when you drag the arrow will point to either direction. In such `directional` mode, the sprite
        // is actually 2 in 1 - one file contains two sprites one tightly following the other, one
        // for visually going one way (`A`) and one for the other (`B`).
        //
        //     A01 A02 A03 A04 A05 A06
        //     A07 A08 A09 A10 A11 A12
        //     A13 A14 A15 B01 B02 B03
        //     B04 B05 B06 B07 B08 B09
        //     B10 B11 B12 B13 B14 B15
        //
        // Switching between `A` and `B` frames is based on direction of the drag. Directional mode isn't
        // limited to sprites only, sequences also apply. The figure below shows the very same setup like
        // the above figure, only translated into actual frames of the sequence.
        //
        //     001 002 003 004 005 006
        //     007 008 009 010 011 012
        //     013 014 015 016 017 018
        //     019 020 021 022 023 024
        //     025 026 027 028 029 030
        //
        // Frame `016` represents the `B01` so it actually is first frame of the other direction.
        //

        // #### `directional` Option ####
        // `Boolean`, since 1.1
        //
        directional:        false,


        // ---
        // ### Multi-Row Mode ######
        //
        // As `example/object-movie-multirow-sequence` very nicely demonstrates, in multi-row arrangement you
        // can perform two-axis manipulation allowing you to add one or more vertical angles. Think of it as
        // a layered cake, each new elevation of the camera during shooting creates one layer of the cake -
        // - a _row_. One plain horizontal object movie full spin is one row:
        //
        //     A01 A02 A03 A04 A05 A06
        //     A07 A08 A09 A10 A11 A12
        //     A13 A14 A15
        //
        // Second row tightly follows after the first one:
        //
        //     A01 A02 A03 A04 A05 A06
        //     A07 A08 A09 A10 A11 A12
        //     A13 A14 A15 B01 B02 B03
        //     B04 B05 B06 B07 B08 B09
        //     B10 B11 B12 B13 B14 B15
        //     C01...
        //
        // This way you stack up any number of __`rows`__ you wish and set the initial `row` to start with.
        // Again, not limited to sprites, sequences also apply.
        //

        // #### `row` Option ####
        // `Number` (rows), since 1.1
        //
        row:                    1,

        // #### `rows` Option ####
        // `Number` (rows), since 1.1
        //
        rows:                   0,


        // ---
        // ### Dual-Orbit Mode ######
        //
        // Special form of multi-axis movie is the dual-axis mode. In this mode the object offers two plain
        // spins - horizontal and vertical orbits combined together crossing each other at the `frame`
        // forming sort of a cross if envisioned. [This example][phone] demonstrate this setup. When the
        // phone in the example is facing you (marked in the example with green square in the top right),
        // you are at the center. That is within the distance (in frames) defined by the `orbital` option.
        // Translation from horizontal to vertical orbit can be achieved on this sweet-spot. By default
        // horizontal orbit is chosen first, unless `vertical` option is used against.
        //
        // In case the image doesn't follow the vertical drag, you may have your vertical orbit `inversed`.
        //
        // Technically it is just a two-layer movie:
        //
        //     A01 A02 A03 A04 A05 A06
        //     A07 A08 A09 A10 A11 A12
        //     A13 A14 A15 B01 B02 B03
        //     B04 B05 B06 B07 B08 B09
        //     B10 B11 B12 B13 B14 B15
        //

        // #### `orbital` Option ####
        // `Number` (frames), since 1.1
        //
        orbital:                0,

        // #### `vertical` Option ####
        // `Boolean`, since 1.1
        //
        vertical:           false,

        // #### `inversed` Option ####
        // `Boolean`, since 1.1
        //
        inversed:           false,


        // ---
        // ### Sprite Layout ######
        //
        // For both object movies and panoramas Reel presumes you use a combined _Sprite_ to hold all your
        // frames in a single file. This powerful technique of using a sheet of several individual images
        // has many advantages in terms of compactness, loading, caching, etc. However, know your enemy,
        // be also aware of the limitations, which stem from memory limits of mobile
        // (learn more in [FAQ](https://github.com/pisi/Reel/wiki/FAQ)).
        //
        // Inside the sprite, individual frames are laid down one by one, to the right of the previous one
        // in a straight _Line_:
        //
        //     01 02 03 04 05 06
        //     07...
        //
        // Horizontal length of the line is reffered to as `footage`. Unless frames `spacing` in pixels
        // is set, edges of frames must touch.
        //
        //     01 02 03 04 05 06
        //     07 08 09 10 11 12
        //     13 14 15 16 17 18
        //     19 20 21 22 23 24
        //     25 26 27 28 29 30
        //     31 32 33 34 35 36
        //
        // This is what you'll get by calling `.reel()` without any options. All frames laid out 6 in line.
        // By default nicely even 6 x 6 grid like, which also inherits the aspect ratio of your frames.
        //
        // By setting `horizontal` to `false`, instead of forming lines, frames are expected to form
        // _Columns_. All starts at the top left corner in both cases.
        //
        //     01 07 13 19 25 31
        //     02 08 14 20 26 32
        //     03 09 15 21 27 33
        //     04 10 16 22 28 34
        //     05 11 17 23 29 35
        //     06 12 18 24 30 36
        //
        // URL for the sprite image file is being build from the name of the original `<img>` `src` image
        // by adding a `suffix` to it. By default this results in `"object-reel.jpg"` for `"object.jpg"`.
        // You can also take full control over the sprite `image` URL that will be used.
        //

        // #### `footage` Option ####
        // `Number` (frames), since 1.0
        //
        footage:                6,

        // #### `spacing` Option ####
        // `Number` (pixels), since 1.0
        //
        spacing:                0,

        // #### `horizontal` Option ####
        // `Boolean`, since 1.0
        //
        horizontal:          true,

        // #### `suffix` Option ####
        // `String`, since 1.0
        //
        suffix:           '-reel',

        // #### `image` Option ####
        // `String`, since 1.1
        //
        image:          undefined,


        // ---
        // ### Sequence ######
        //
        // Collection of individual frame images is called _Sequence_ and it this way one HTTP request per
        // frame is made carried out as opposed to sprite with one request per entire sprite. Define it with
        // string like: `"image_###.jpg"`. The `#` placeholders will be replaced with a numeric +1 counter
        // padded to the placeholders length.
        // Learn more about [sequences](Sequences).
        //
        // In case you work with hashed filenames like `64bc654d21cb.jpg`, where no counter element can
        // be indentified, or you prefer direct control, `images` can also accept array of plain URL strings.
        //
        // All images are retrieved from a specified `path`.
        //

        // #### `images` Option ####
        // [IMPROVED] `String` or `Array`, since 1.1
        //
        images:                '',

        // #### `path` Option ####
        // `String` (URL path), since 1.1
        //
        path:                  '',


        // ---
        // ### Images Preload Order ######
        //
        // Given sequence images can be additionally reordered to achieve a perceived faster preloading.
        // Value given to `preload` option must match a name of a pre-registered function within
        // `$.reel.preload` object. There are two functions built-in:
        //
        // - `"fidelity"` - non-linear way that ensures even spreading of preloaded images around the entire
        //   revolution leaving the gaps in-between as small as possible. This results in a gradually
        //   increasing fidelity of the image rather than having one large shrinking gap. This is the default
        //   behavior.
        // - `"linear"` - linear order of preloading
        //

        // #### `preload` Option ####
        // [NEW] `String`, since 1.2
        //
        preload:       'fidelity',


        // ---
        // ### Animation ######
        //
        // Your object movie or a panorama can perform an autonomous sustained motion in one direction.
        // When `speed` is set in revolutions per second (Hz), after a given `delay` the instance will
        // animate and advance frames by itself.
        //
        //     t
        //     |-------›|-----------›
        //       Delay    Animation
        //
        // Start and resume of animation happens when given `timeout` has elapsed since user became idle.
        //
        //     t
        //     |-----------›|= == ==  = === = = |          |-----------›
        //       Animation    User interaction    Timeout    Animation
        //
        // When a scene doesn't loop (see `loops`) and the animation reaches one end, it stays there
        // for a while and then reversing the direction of the animation it bounces back towards the other
        // end. The time spent on the edge can be customized with `rebound`.
        //

        // #### `speed` Option ####
        // `Number` (Hz), since 1.1
        //
        speed:                  0,

        // #### `delay` Option ####
        // `Number` (seconds), since 1.1
        //
        delay:                  0,

        // #### `timeout` Option ####
        // `Number` (seconds), since 1.1
        //
        timeout:                2,

        // #### `rebound` Option ####
        // `Number` (seconds), since 1.1
        //
        rebound:              0.5,


        // ---
        // ### Opening Animation ######
        //
        // Chance is you want the object to spin a little to attract attention and then stop and wait
        // for the user to engage. This is called "opening animation" and it is performed for given number
        // of seconds (`opening`) at dedicated `entry` speed. The `entry` speed defaults to value of `speed`
        // option. After the opening animation has passed, regular animation procedure begins starting with
        // the delay (if any).
        //
        //     t
        //     |--------›|-------›|-----------›
        //       Opening   Delay    Animation
        //

        // #### `entry` Option ####
        // `Number` (Hz), since 1.1
        //
        entry:          undefined,

        // #### `opening` Option ####
        // `Number` (seconds), since 1.1
        //
        opening:                0,


        // ---
        // ### Momentum ######
        //
        // Often also called inertial motion is a result of measuring a velocity of dragging. This velocity
        // builds up momentum, so when a drag is released, the image still retains the momentum and continues
        // to spin on itself. Naturally the momentum soon wears off as `brake` is being applied.
        //
        // One can utilize this momentum for a different kind of an opening animation. By setting initial
        // `velocity`, the instance gets artificial momentum and spins to slow down to stop.
        //

        // #### `brake` Option ####
        // `Number`, since 1.1, where it also has a different default `0.5`
        //
        brake:               0.23,

        // #### `velocity` Option ####
        // [NEW] `Number`, since 1.2
        //
        velocity:               0,


        // ---
        // ### Ticker ######
        //
        // For purposes of animation, Reel starts and maintains a timer device which emits ticks timing all
        // animations. There is only one ticker running in the document and all instances subscribe to this
        // one ticker. Ticker is equipped with a mechanism, which compensates for the  measured costs
        // of running Reels to ensure the ticker ticks on time. The `tempo` (in Hz) of the ticker can be
        // specified.
        //
        // Please note, that ticker is synchronized with a _leader_, the oldest living instance on page,
        // and adjusts to his tempo.
        //

        // #### `tempo` Option ####
        // `Number` (Hz, ticks per second), since 1.1
        //
        tempo:                 36,

        // ~~~
        //
        // Since many mobile devices are sometimes considerably underpowered in comparison with desktops,
        // they often can keep up with the 36 Hz rhythm. In Reel these are called __lazy devices__
        // and everything mobile qualifies as lazy for the sake of the battery and interaction fluency.
        // The ticker is under-clocked for them by a `laziness` factor, which is used to divide the `tempo`.
        // Default `laziness` of `6` will effectively use 6 Hz instead (6 = 36 / 6) on lazy devices.
        //

        // #### `laziness` Option ####
        // `Number`, since 1.1
        //
        laziness:               6,


        // ---
        // ### Customization ######
        //
        // You can customize Reel on both functional and visual front. The most visible thing you can
        // customize is probably the `cursor`, size of the `preloader`, perhaps add visual `indicator`(s)
        // of Reel's position within the range. You can also set custom `hint` for the tooltip, which appears
        // when you mouse over the image area. Last but not least you can also add custom class name `klass`
        // to the instance.
        //

        // #### `cursor` Option ####
        // [NEW] `String`, since 1.2
        cursor:         undefined,

        // #### `hint` Option ####
        // `String`, since 1.0
        hint:                  '',

        // #### `indicator` Option ####
        // `Number` (pixels), since 1.0
        indicator:              0,

        // #### `klass` Option ####
        // `String`, since 1.0
        klass:                 '',

        // #### `preloader` Option ####
        // `Number` (pixels), since 1.1
        preloader:              2,

        // ~~~
        //
        // You can use custom attributes (`attr`) on the node - it accepts the same name-value pairs object
        // jQuery `.attr()` does. In case you want to delegate full interaction control over the instance
        // to some other DOM element(s) on page, you can with `area`.
        //

        // #### `area` Option ####
        // `jQuery`, since 1.1
        area:           undefined,

        // #### `attr` Option ####
        // [NEW] `Object`, since 1.2
        attr:                  {},


        // ---
        // ### Annotations ######
        //
        // To further visually describe your scene you can place all kinds of in-picture HTML annotations
        // by defining an `annotations` object. Learn more about [Annotations][1] in a dedicated article.
        //
        // [1]:https://github.com/pisi/Reel/wiki/Annotations
        //

        // #### `annotations` Option ####
        // [NEW] `Object`, since 1.2
        annotations:    undefined,


        // ---
        // ### Mathematics ######
        //
        // When reeling, instance conforms to a graph function, which defines whether it will loop
        // (`$.reel.math.hatch`) or it won't (`$.reel.math.envelope`). My math is far from flawless
        // and I'm sure there are much better ways how to handle things. the `graph` option is there for you
        // shall you need it. It accepts a function, which should process given criteria and return
        // a fraction of 1.
        //
        //     function( x, start, revolution, lo, hi, cwness, y ){
        //       return fraction  // 0.0 - 1.0
        //     }
        //

        // #### `graph` Option ####
        // `Function`, since 1.1
        graph:          undefined,


        // ---
        // ### Monitor ######
        //
        // Specify a string data key and you will see its real-time value dumped in the upper-left corner
        // of the viewport. Its visual can be customized by CSS using `.jquery-reel-monitor` selector.
        //

        // #### `monitor` Option ####
        // `String` (data key), since 1.1
        monitor:        undefined,


        // ---
        // ### Deprecated Options ######
        //
        // Two options are currently deprecated in version 1.2. Learn more about [Deprecations][1]
        //
        // [1]:https://github.com/pisi/Reel/wiki/Deprecations
        //

        // #### `step` Option ####
        // `Number`, since 1.1
        step:           undefined, // use `frame` instead

        // #### `steps` Option ####
        // `Number`, since 1.1
        steps:          undefined // use `frames` instead

      },

      // -------
      // Methods
      // -------
      //
      // Reel's methods extend jQuery core functions with members of its `$.reel.fn` object. Despite Reel
      // being a typical one-method plug-in with its `.reel()` function, for convenience it also offers
      // its dipolar twin `.unreel()`.
      //

      // ### `$.reel.fn` ######
      // returns `Object`, since 1.1
      fn: {
        // ------------
        // Construction
        // ------------
        //
        // `.reel()` method is the core of Reel and similar to some jQuery functions, this one is three-fold.
        // It either performs the following builder's duty or the [data duty](#Data).
        //

        // ### `.reel()` Method ######
        // returns `jQuery`, since 1.0
        //
        reel: function(){
          // The decision on what to actually do is made upon given arguments.
          var
            args= arguments,
            t= $(this),
            data= t.data(),
            name= args[0] || {},
            value= args[1]

          if (typeof name == 'object'){
          var
            // Establish local `opt` object made by extending the defaults.
            opt= $.extend({}, reel.def, name),
            // Limit the given jQuery collection to just `<img>` tags with `src` attribute
            // and dimensions defined.
            applicable= t.filter(_img_).unreel().filter(function(){
              var
                $this= $(this),
                attr= opt.attr,
                src= attr.src || $this.attr('src'),
                width= attr.width || $this.width(),
                height= attr.height || $this.height()
              if (src && width && height) return true;
            }),
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

              on= {

                // --------------
                // Initialization
                // --------------
                //
                // This internally called private pseudo-handler:
                //
                // - initiates all data store keys
                // - binds to ticker
                // - triggers `"setup` Event when finished
                //
                setup: function(e){
                  if (t.hasClass(klass)) return;
                  set(_options_, opt);
                  var
                    src= t.attr(opt.attr).attr('src'),
                    id= set(_id_, t.attr(_id_) || t.attr(_id_, klass+'-'+(+new Date())).attr(_id_)),
                    styles= t.attr(_style_),
                    data= $.extend({}, t.data()),
                    images= opt.images,
                    stitched= opt.stitched,
                    loops= opt.loops,
                    orbital= opt.orbital,
                    revolution= opt.revolution,
                    rows= opt.rows,
                    footage= opt.footage,
                    sequence= reel.re.sequence.exec(images),
                    images= set(_images_, sequence ? reel.sequence(sequence, opt, get) : images || []),
                    size= { x: t.width(), y: t.height() },
                    frames= set(_frames_, orbital && footage || rows <= 1 && images.length || opt.frames),
                    multirow= rows > 1 || orbital,
                    revolution_x= set(_revolution_, axis('x', revolution) || stitched / 2 || size.x * 2),
                    revolution_y= set(_revolution_y_, !multirow ? 0 : (axis('y', revolution) || (rows > 3 ? size.y : size.y / (5 - rows)))),
                    rows= stitched ? 1 : ceil(frames / footage),
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
                  set(_bit_, 1 / (frames - (loops && !stitched ? 0 : 1)));
                  set(_stitched_travel_, stitched - (loops ? 0 : size.x));
                  set(_stitched_shift_, 0);
                  set(_stage_, stage_id);
                  set(_backwards_, set(_speed_, opt.speed) < 0);
                  set(_velocity_, 0);
                  set(_vertical_, opt.vertical);
                  set(_preloaded_, 0);
                  set(_cwish_, negative_when(1, !opt.cw && !stitched));
                  set(_clicked_location_, {});
                  set(_clicked_, false);
                  set(_clicked_on_, set(_clicked_tier_, 0));
                  set(_lo_, set(_hi_, 0));
                  set(_reeling_, false);
                  set(_reeled_, false);
                  set(_opening_, false);
                  set(_brake_, opt.brake);
                  set(_center_, !!orbital);
                  set(_tempo_, opt.tempo / (reel.lazy? opt.laziness : 1));
                  set(_opening_ticks_, -1);
                  set(_annotations_, opt.annotations || $overlay.unbind(dot(_annotations_)) && {});
                  set(_backup_, {
                    src: src,
                    classes: classes,
                    style: styles || __,
                    data: data
                  });
                  opt.steppable || $overlay.unbind('up.steppable');
                  opt.indicator || $overlay.unbind('.indicator');
                  css(__, { width: size.x, height: size.y, overflow: _hidden_, position: 'relative' });
                  css(____+___+dot(klass), { display: _block_ });
                  pool.bind(on.pool);
                  t.trigger('setup');
                },

                // ---------------------
                // Initialization Events
                // ---------------------
                //
                // Reel is completely event-driven meaning there are many events, which can be called
                // (triggered). By binding event handler to any of the events you can easily hook on to any
                // event to inject your custom behavior where and when this event was triggered.
                // _For example to make `#image` element reel and execute some code right after the newly
                // created instance is initialized and completely loaded:_
                //
                //     $("#image")
                //     .reel()
                //     .bind("loaded", function(ev){
                //       // Your code
                //     })
                //

                // Events bound to all individual instances.
                //
                instance: {

                  // ### `teardown` Event ######
                  // `Event`, since 1.1
                  //
                  // This event does do how it sounds like. It will teardown an instance with all its
                  // belongings leaving no trace.
                  //
                  // - It reconstructs the original `<img>` element,
                  // - wipes out the data store,
                  // - removes instance stylesheet
                  // - and unbinds all its events.
                  //
                  teardown: function(e){
                    var
                      backup= t.data(_backup_)
                    t.parent().unbind(on.instance);
                    get(_style_).remove();
                    get(_area_).unbind(ns);
                    remove_instance(t.unbind(ns).removeData().siblings().unbind(ns).remove().end().attr({
                     'class': backup.classes,
                      src: backup.src,
                      style: backup.style
                    }).data(backup.data).unwrap());
                    no_bias();
                    pool.unbind(on.pool);
                    pools.unbind(pns);
                  },

                  // ### `setup` Event ######
                  // `Event`, since 1.0
                  //
                  // `"setup` Event continues with what has been started by the private `on.setup()`
                  // handler.
                  //
                  // - It prepares all additional on-stage DOM elements,
                  // - and cursors for the instance stylesheet.
                  //
                  setup: function(e){
                    var
                      space= get(_dimensions_),
                      frames= get(_frames_),
                      id= t.attr(_id_),
                      rows= opt.rows,
                      stitched= opt.stitched,
                      $overlay= t.parent(),
                      $area= set(_area_, $(opt.area || $overlay )),
                      rows= opt.rows || 1
                    css(___+dot(klass), { MozUserSelect: _none_, WebkitUserSelect: _none_ });
                    if (touchy){
                      // workaround for downsizing-sprites-bug-in-iPhoneOS inspired by Katrin Ackermann
                      css(___+dot(klass), { WebkitBackgroundSize: get(_images_).length
                        ? !stitched ? undefined : px(stitched)+___+px(space.y)
                        : stitched && px(stitched)+___+px((space.y + opt.spacing) * rows - opt.spacing)
                        || px(space.x * opt.footage)+___+px(space.y * get(_rows_) * rows * (opt.directional? 2:1))
                      });
                      $area
                        .bind(_touchstart_, press)
                    }else{
                      var
                        cursor= opt.cursor,
                        cursor_up= cursor == _hand_ ? drag_cursor : cursor || reel_cursor,
                        cursor_down= cursor == _hand_ ? drag_cursor_down+___+'!important' : undefined
                      css(__, { cursor: cdn(cursor_up) });
                      css(dot(loading_klass), { cursor: 'wait' });
                      css(dot(panning_klass)+____+dot(panning_klass)+' *', { cursor: cdn(cursor_down || cursor_up) }, true);
                      $area
                        .bind(opt.wheelable ? _mousewheel_ : null, wheel)
                        .bind(opt.clickfree ? _mouseenter_ : _mousedown_, press)
                        .bind('dragstart', function(){ return false })
                    }
                    function press(e){ return t.trigger('down', [finger(e).clientX, finger(e).clientY, e]) && e.give }
                    function wheel(e, delta){ return !delta || t.trigger('wheel', [delta, e]) && e.give }
                    opt.hint && $area.attr('title', opt.hint);
                    opt.indicator && $overlay.append(indicator('x'));
                    rows > 1 && opt.indicator && $overlay.append(indicator('y'));
                    opt.monitor && $overlay.append($monitor= $(tag(_div_), { 'class': monitor_klass }))
                                && css(___+dot(monitor_klass), { position: _absolute_, left: 0, top: 0 });
                    css(___+dot(cached_klass), { display: _none_ });
                  },

                  // ### `preload` Event ######
                  // `Event`, since 1.1
                  //
                  // Reel keeps a cache of all images it needs for its operation. Either a sprite or all
                  // sequence images. Physically, this cache is made up of a hidden `<img>` sibling for each
                  // preloaded image. It first determines the order of requesting the images and then
                  // asynchronously loads all of them.
                  //
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
                      footage= opt.footage,
                      order= reel.preload[opt.preload] || reel.preload[reel.def.preload],
                      preload= is_sprite ? [get(_image_)] : order(images.slice(0), opt, get),
                      to_load= preload.length,
                      preloaded= set(_preloaded_, is_sprite ? 0.5 : 0),
                      uris= []
                    $overlay.addClass(loading_klass).append(preloader());
                    // It also finalizes the instance stylesheet and prepends it to the head.
                    set(_style_, $('<'+_style_+' type="text/css">'+css.rules.join('\n')+'</'+_style_+'>').prependTo(_head_));
                    t.trigger('stop');
                    while(preload.length){
                      var
                        uri= opt.path+preload.shift(),
                        width= space.x * (!is_sprite ? 1 : footage),
                        height= space.y * (!is_sprite ? 1 : frames / footage) * (!opt.directional ? 1 : 2),
                        $img= $(tag(_img_)).attr({ 'class': cached_klass, width: width, height: height }).appendTo($overlay)
                      // Each image, which finishes the load triggers `"preloaded` Event.
                      $img.bind('load error abort', function(){
                        return !!$(this).parent().length && t.trigger('preloaded') && false;
                      });
                      load(uri, $img);
                      uris.push(uri);
                    }
                    set(_cached_, uris);
                    function load(uri, $img){ setTimeout(function(){
                      $img.parent().length && $img.attr({ src: reen(uri) });
                    }, (to_load - preload.length) * 2) }
                  },

                  // ### `preloaded` Event ######
                  // `Event`, since 1.1
                  //
                  // This event is fired by every preloaded image and adjusts the preloader indicator's
                  // target position. Once all images are preloaded, `"loaded` Event is triggered.
                  //
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

                  // ### `loaded` Event ######
                  // `Event`, since 1.1
                  //
                  // `"loaded` Event is the one announcing when the instance is "locked and loaded".
                  // At this time, all is prepared, preloaded and configured for user interaction
                  // or animation.
                  //
                  loaded: function(e){
                    get(_images_).length > 1 || t.css({ backgroundImage: url(opt.path+get(_image_)) }).attr({ src: cdn(transparent) });
                    opt.stitched && t.attr({ src: cdn(transparent) });
                    get(_reeled_) || set(_velocity_, opt.velocity || 0);
                  },

                  // ----------------
                  // Animation Events
                  // ----------------

                  // ### `opening` Event ######
                  // `Event`, since 1.1
                  //
                  // When [opening animation](#Opening-Animation) is configured for the instance, `"opening"`
                  // event engages the animation by pre-calculating some of its properties, which will make
                  // the tick handler
                  //
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
                      start= set(_fraction_, end - speed * duration),
                      ticks= set(_opening_ticks_, ceil(duration * leader(_tempo_)))
                  },

                  // ### `openingDone` Event ######
                  // `Event`, since 1.1
                  //
                  // `"openingDone"` is fired onceWhen [opening animation](#Opening-Animation) is configured for the instance, `"opening"`
                  // event engages the animation by pre-calculating some of its properties, which will make
                  // the tick handler
                  //
                  openingDone: function(e){
                    var
                      playing= set(_playing_, false),
                      opening= set(_opening_, false),
                      evnt= _tick_+dot(_opening_)
                    pool.unbind(evnt, on.pool[evnt]);
                    if (opt.delay > 0) delay= setTimeout(function(){ t.trigger('play') }, opt.delay * 1000)
                    else t.trigger('play');
                  },

                  // -----------------------
                  // Playback Control Events
                  // -----------------------

                  // ### `play` Event ######
                  // `Event`, since 1.1
                  //
                  // `"play"` event can optionally accept a `speed` parameter (in Hz) to change the animation
                  // speed on the fly.
                  //
                  play: function(e, speed){
                    var
                      speed= set(_speed_, speed || get(_speed_)),
                      duration= opt.duration,
                      backwards= set(_backwards_, speed < 0),
                      playing= set(_playing_, !!speed),
                      stopped= set(_stopped_, !playing)
                    idle();
                  },

                  // ### `pause` Event ######
                  // `Event`, since 1.1
                  //
                  // Triggering `"pause"` event will halt the playback for a time period designated
                  // by the `timeout` option. After this timenout, the playback is resumed again.
                  //
                  pause: function(e){
                    unidle();
                  },

                  // ### `stop` Event ######
                  // `Event`, since 1.1
                  //
                  // After `"stop"` event is triggered, the playback stops and stays still until `"play"`ed again.
                  //
                  stop: function(e){
                    var
                      stopped= set(_stopped_, true),
                      playing= set(_playing_, !stopped)
                  },

                  // ------------------------
                  // Human Interaction Events
                  // ------------------------

                  // ### `down` Event ######
                  // `Event`, since 1.1
                  //
                  // Marks the very beginning of touch or mouse interaction. It receives `x` and `y`
                  // coordinates in arguments. It:
                  //
                  // - calibrates the center point (origin),
                  // - considers user active not idle,
                  // - flags the `<html>` tag with `.reel-panning` class name,
                  // - and binds dragging events for move and lift. These
                  // are usually bound to the pool (document itself) to get a consistent treating regardless
                  // the event target element. However in click-free mode, it binds directly to the instance.
                  //
                  down: function(e, x, y, ev){
                    if (ev && ev.button != DRAG_BUTTON && !opt.clickfree) return;
                    if (opt.draggable){
                      var
                        clicked= set(_clicked_, get(_frame_)),
                        clickfree= opt.clickfree,
                        velocity= set(_velocity_, 0),
                        origin= last= recenter_mouse(get(_revolution_), x, y)
                      touchy || ev && ev.preventDefault();
                      unidle();
                      no_bias();
                      panned= false;
                      $(_html_, pools).addClass(panning_klass);
                      // Browser events differ for touch and mouse, but both of them are treated equally and
                      // forwarded to the same `"pan"` or `"up` Events.
                      if (touchy){
                        pools
                        .bind(_touchmove_, drag)
                        .bind(_touchend_+___+_touchcancel_, lift)
                      }else{
                        (clickfree ? get(_area_) : pools)
                        .bind(_mousemove_, drag)
                        .bind(clickfree ? _mouseleave_ : _mouseup_, lift)
                      }
                    }
                    function drag(e){ return t.trigger('pan', [finger(e).clientX, finger(e).clientY, e]) && e.give }
                    function lift(e){ return t.trigger('up', [e]) && e.give }
                  },

                  // ### `up` Event ######
                  // `Event`, since 1.1
                  //
                  // This marks the termination of user's interaction. She either released the mouse button
                  // or lift the finger of the touch screen. This event handler:
                  //
                  // - calculates the velocity of the drag at that very moment,
                  // - removes the `.reel-panning` class from `<body>`,
                  // - and unbinds dragging events from the pool.
                  //
                  up: function(e, ev){
                    var
                      clicked= set(_clicked_, false),
                      reeling= set(_reeling_, false),
                      throwable = opt.throwable,
                      biases= abs(bias[0] + bias[1]) / 60,
                      velocity= set(_velocity_, !throwable ? 0 : throwable === true ? biases : min(throwable, biases)),
                      brakes= braking= velocity ? 1 : 0
                    unidle();
                    no_bias();
                    $(_html_, pools).removeClass(panning_klass);
                    (opt.clickfree ? get(_area_) : pools).unbind(pns);
                  },

                  // ### `pan` Event ######
                  // [RENAMED] `Event`, since 1.2
                  //
                  // Regardles the actual source of movement (mouse or touch), this event is always triggered
                  // in response and similar to the `"down` Event it receives `x` and `y` coordinates
                  // in arguments and in addition it is passed a reference to the original browser event.
                  // This handler:
                  //
                  // - syncs with timer to achieve good performance,
                  // - calculates the distance from drag center and applies graph on it to get `fraction`,
                  // - recenters the drag when dragged over limits,
                  // - detects the direction of the motion,
                  // - and builds up inertial motion bias.
                  //
                  // Historically `pan` was once called `slide` (conflicted with Mootools - [GH-51][1])
                  // or `drag` (that conflicted with MSIE).
                  //
                  // [1]:https://github.com/pisi/Reel/issues/51
                  //
                  pan: function(e, x, y, ev){
                    if (opt.draggable && slidable){
                      slidable= false;
                      unidle();
                      var
                        rows= opt.rows,
                        orbital= opt.orbital,
                        scrollable= touchy && !get(_reeling_) && rows <= 1 && !orbital && opt.scrollable,
                        delta= { x: x - last.x, y: y - last.y }
                      if (ev && scrollable && abs(delta.x) < abs(delta.y)) return ev.give = true;
                      if (abs(delta.x) > 0 || abs(delta.y) > 0){
                        ev && (ev.give = false);
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
                        if (orbital && get(_center_)) var
                          vertical= set(_vertical_, abs(y - origin.y) > abs(x - origin.x)),
                          origin= recenter_mouse(revolution, x, y)
                        if (rows > 1) var
                          space_y= get(_dimensions_).y,
                          revolution_y= get(_revolution_y_),
                          start= get(_clicked_tier_),
                          lo= - start * revolution_y,
                          tier= set(_tier_, reel.math.envelope(y - origin.y, start, revolution_y, lo, lo + revolution_y, -1))
                        if (!(fraction % 1) && !opt.loops) var
                          origin= recenter_mouse(revolution, x, y)
                      }
                    }
                  },

                  // ### `wheel` Event ######
                  // `Event`, since 1.0
                  //
                  // Maps Reel to mouse wheel position change event which is provided by a nifty plug-in
                  // written by Brandon Aaron - the [Mousewheel plug-in][1], which you will need to enable
                  // the mousewheel wheel for reeling. You can also choose to use [Wheel Special Event
                  // plug-in][2] by Three Dub Media instead. Either way `"wheel` Event handler receives
                  // the positive or negative wheeled distance in arguments. This event:
                  //
                  // - calculates wheel input delta and adjusts the `fraction` using the graph,
                  // - recenters the "drag" each and every time,
                  // - detects motion direction,
                  // - and nullifies the velocity.
                  //
                  // [1]:https://github.com/brandonaaron/jquery-mousewheel
                  // [2]:http://blog.threedubmedia.com/2008/08/eventspecialwheel.html
                  //
                  wheel: function(e, distance, ev){
                    if (!distance) return;
                    wheeled= true;
                    var
                      delta= ceil(math.sqrt(abs(distance)) / 2),
                      delta= negative_when(delta, distance > 0),
                      revolution= 0.0833 * get(_revolution_), // Wheel's revolution is 1/12 of full revolution
                      origin= recenter_mouse(revolution),
                      backwards= delta && set(_backwards_, delta < 0),
                      velocity= set(_velocity_, 0),
                      fraction= set(_fraction_, graph(delta, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_)))
                    ev && ev.preventDefault();
                    ev && (ev.give = false);
                    unidle();
                    t.trigger('up', [ev]);
                  },

                  // ------------------
                  // Data Change Events
                  // ------------------
                  //
                  // Besides Reel being event-driven, it also is data-driven respectively data-change-driven
                  // meaning that there is a mechanism in place, which detects real changes in data being
                  // stored with `.reel(name, value)`. Learn more about [data changes](#Changes).
                  //
                  // These data change bindings are for internal use only and you don't ever trigger them
                  // per se, you change data and that will trigger respective change event. If the value
                  // being stored is the same as the one already stored, nothing will be triggered.
                  // _For example to change Reel's `frame` you don't trigger `"frameChange"` and instead
                  // you do:
                  //
                  //     .reel("frame", 15)
                  //
                  // Change events always receive the actual data key value in the third argument.
                  // _For example this will log each viewed frame number into the developers console.
                  //
                  //     .bind("frameChange", function(e, d, frame){
                  //         console.log(frame)
                  //     })
                  //

                  // ### `fractionChange` Event ######
                  // `Event`, since 1.0
                  //
                  // Internally Reel doesn't really work with the frames you set it up with. It uses
                  // __fraction__, which is a numeric value ranging from 0.0 to 1.0. When `fraction` changes
                  // this handler basically calculates and sets new value of `frame`.
                  //
                  fractionChange: function(e, set_fraction, fraction){
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

                  // ### `tierChange` Event ######
                  // `Event`, since 1.2
                  //
                  // The situation of `tier` is very much similar to the one of `fraction`. In multi-row
                  // movies, __tier__ is an internal value for the vertical axis. Its value also ranges from
                  // 0.0 to 1.0. Handler calculates and sets new value of `frame`.
                  //
                  tierChange: function(e, deprecated_set, tier){
                    if (deprecated_set === undefined) var
                      row= set(_row_, round(interpolate(tier, 1, opt.rows))),
                      frames= get(_frames_),
                      frame= get(_frame_) % frames || frames,
                      frame= set(_frame_, frame + row * frames - frames)
                  },

                  // ### `rowChange` Event ######
                  // `Event`, since 1.1
                  //
                  // The physical vertical position of Reel is expressed in __rows__ and ranges
                  // from 1 to the total number of rows defined with [`rows`](#rows-Option). This handler
                  // only converts `row` value to `tier` and sets it.
                  //
                  rowChange: function(e, set_row, row){
                    if (set_row !== undefined) return set(_row_, set_row);
                    var
                      tier= set(_tier_, 1 / (opt.rows - 1) * (row - 1))
                  },

                  // ### `frameChange` Event ######
                  // `Event`, since 1.0
                  //
                  // The physical horizontal position of Reel is expressed in __frames__ and ranges
                  // from 1 to the total number of frames configured with [`frames`](#frames-Option).
                  // This handler converts `row` value to `tier` and sets it. This default handler:
                  //
                  // - flags the instance's outter wrapper with `.frame-X` class name
                  //   (where `X` is the actual frame number),
                  // - calculates and eventually sets `fraction` (and `tier` for multi-rows) from given frame,
                  // - for sequences, it switches the `<img>`'s `src` to the right frame,
                  // - for sprites it recalculates sprite's 'background position shift and applies it.
                  //
                  frameChange: function(e, set_frame, frame){
                    if (set_frame !== undefined) return deprecated(set(_frame_, set_frame));
                    this.className= this.className.replace(reel.re.frame_klass, frame_klass + frame);
                    var
                      frames= get(_frames_),
                      rows= opt.rows,
                      path= opt.path,
                      base= frame % frames || frames,
                      ready= !!get(_preloaded_),
                      frame_row= (frame - base) / frames + 1,
                      frame_tier= (frame_row - 1) / (rows - 1),
                      tier_row= round(interpolate(frame_tier, 1, rows)),
                      row= get(_row_),
                      tier= ready && tier_row === row ? get(_tier_) : set(_tier_, frame_tier),
                      frame_fraction= min((base - 1) / (frames - 1), 0.9999),
                      row_shift= row * frames - frames,
                      fraction_frame= round(interpolate(frame_fraction, row_shift + 1, row_shift + frames)),
                      same_spot= abs((get(_fraction_) || 0) - frame_fraction) < 1 / (get(_frames_) - 1),
                      fraction= ready && (fraction_frame === frame && same_spot) ? get(_fraction_) : set(_fraction_, frame_fraction),
                      footage= opt.footage
                    if (opt.orbital && get(_vertical_)) var
                      frame= opt.inversed ? footage + 1 - frame : frame,
                      frame= frame + footage
                    var
                      horizontal= opt.horizontal,
                      stitched= opt.stitched,
                      images= get(_images_),
                      is_sprite= !images.length || opt.stitched,
                      spacing= get(_spacing_),
                      space= get(_dimensions_)
                    if (!is_sprite){
                      var
                        frameshot= images[frame - 1]
                      ready && t.attr({ src: reen(path + frameshot) })
                    }else{
                      if (!stitched) var
                        minor= (frame % footage) - 1,
                        minor= minor < 0 ? footage - 1 : minor,
                        major= floor((frame - 0.1) / footage),
                        major= major + (rows > 1 ? 0 : (get(_backwards_) ? 0 : get(_rows_))),
                        a= major * ((horizontal ? space.y : space.x) + spacing),
                        b= minor * ((horizontal ? space.x : space.y) + spacing),
                        shift= images.length ? [0, 0] : horizontal ? [px(-b), px(-a)] : [px(-a), px(-b)]
                      else{
                        var
                          x= set(_stitched_shift_, round(interpolate(frame_fraction, 0, get(_stitched_travel_))) % stitched),
                          y= rows <= 1 ? 0 : (space.y + spacing) * (rows - row),
                          shift= [px(-x), px(-y)],
                          image= images.length > 1 && images[row - 1]
                        image && t.css('backgroundImage').search(path+image) < 0 && t.css({ backgroundImage: url(path+image) })
                      }
                      t.css({ backgroundPosition: shift.join(___) })
                    }
                  },

                  // ---------
                  // Indicator
                  // ---------
                  //
                  // When configured with the [`indicator`](#indicator-Option) option, Reel adds to the scene
                  // a visual indicator in a form of a black rectangle traveling along the bottom edge
                  // of the image. It bears two distinct messages:
                  //
                  // - its horizontal position accurately reflects actual `fraction`
                  // - and its width reflect one frame's share on the whole (more frames mean narrower
                  //   indicator).
                  //
                  'fractionChange.indicator': function(e, deprecated_set, fraction){
                    if (deprecated_set === undefined && opt.indicator) var
                      space= get(_dimensions_),
                      size= opt.indicator,
                      orbital= opt.orbital,
                      travel= orbital && get(_vertical_) ? space.y : space.x,
                      slots= orbital ? opt.footage : opt.images.length || get(_frames_),
                      weight= ceil(travel / slots),
                      travel= travel - weight,
                      indicate= round(interpolate(fraction, 0, travel)),
                      indicate= !opt.cw || opt.stitched ? indicate : travel - indicate,
                      $indicator= indicator.$x.css(get(_vertical_)
                      ? { left: 0, top: px(indicate), bottom: _auto_, width: size, height: weight }
                      : { bottom: 0, left: px(indicate), top: _auto_, width: weight, height: size })
                  },

                  // For multi-row object movies, there's a second indicator sticked to the left edge
                  // and communicates:
                  //
                  // - its vertical position accurately reflects actual `tier`
                  // - and its height reflect one row's share on the whole (more rows mean narrower
                  //   indicator).
                  //
                  'tierChange.indicator': function(e, deprecated_set, tier){
                    if (deprecated_set === undefined && opt.rows > 1 && opt.indicator) var
                      space= get(_dimensions_),
                      travel= space.y,
                      slots= opt.rows,
                      size= opt.indicator,
                      weight= ceil(travel / slots),
                      travel= travel - weight,
                      indicate= round(tier * travel),
                      $yindicator= indicator.$y.css({ left: 0, top: indicate, width: size, height: weight })
                  },

                  // Indicators are bound to `fraction` or `row` changes, meaning they alone can consume
                  // more CPU resources than the entire Reel scene. Use them for development only.
                  //

                  // -----------------
                  // [NEW] Annotations
                  // -----------------
                  //
                  // If you want to annotate features of your scene to better describe the subject,
                  // there's annotations for you. Annotations feature allows you to place virtually any
                  // HTML content over or into the image and have its position and visibility synchronized
                  // with the position of Reel. These two easy looking handlers do a lot more than to fit
                  // in here.
                  //
                  // Learn more about [Annotations][1] in the wiki, where a great care has been taken
                  // to in-depth explain this new exciting functionality.
                  //
                  // [1]:https://github.com/pisi/Reel/wiki/Annotations
                  //
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
                        $link= note.link ? $(tag('a'), note.link).click(function(){ return false }) : $()
                      css(hash(ida), { display: _none_, position: _absolute_ }, true);
                      note.image || note.link && $note.append($link);
                      note.link || note.image && $note.append($image);
                      note.link && note.image && $note.append($link.append($image));
                      $note.appendTo($overlay);
                    });
                  },
                  'frameChange.annotations': function(e, deprecation, frame){
                    var
                      space= get(_dimensions_),
                      stitched= opt.stitched,
                      ss= get(_stitched_shift_)
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
                        visible= placed && (note.at ? at : (offset >= 0 && (!end || offset <= end - start)))
                      if (stitched) var
                        on_edge= x < space.x && ss > stitched - space.x,
                        after_edge= x > stitched - space.x && ss >= 0 && ss < space.x,
                        x= !on_edge ? x : x + stitched,
                        x= !after_edge ? x : x - stitched,
                        x= x - ss
                      var
                        style= { display: visible ? _block_:_none_, left: px(x), top: px(y) }
                      $note.css(style);
                    });
                  },
                  'up.annotations': function(e, ev){
                    if (panned || wheeled) return;
                    var
                      $target= $(ev.target),
                      $link= ($target.is('a') ? $target : $target.parents('a')),
                      href= $link.attr('href'),
                      target= $link.attr('target') || 'self'
                    if (!href) return;
                    if (target == '_blank') panned= !!window.open(href)
                    else panned= !!(window[target].location.href= href)
                  },

                  // ---------------------------
                  // [NEW] Click Stepping Events
                  // ---------------------------
                  //
                  // For devices without drag support or for developers, who want to use some sort
                  // of left & right buttons on their site to control your instance from outside, Reel
                  // supports ordinary click with added detection of left half or right half and resulting
                  // triggering of `stepLeft` and `stepRight` events respectively.
                  //

                  // This behavior can be disabled by the [`steppable`](#steppable-Option) option.
                  //
                  'up.steppable': function(e, ev){
                    if (panned || wheeled) return;
                    t.trigger(get(_clicked_location_).x - t.offset().left > 0.5 * get(_dimensions_).x ? 'stepRight' : 'stepLeft')
                  },
                  'stepLeft stepRight': function(e){
                    unidle();
                  },

                  // ### `stepLeft` Event ######
                  // `Event`, since 1.2
                  stepLeft: function(e){
                    set(_backwards_, false);
                    set(_fraction_, get(_fraction_) - get(_bit_) * get(_cwish_));
                  },

                  // ### `stepRight` Event ######
                  // `Event`, since 1.2
                  stepRight: function(e){
                    set(_backwards_, true);
                    set(_fraction_, get(_fraction_) + get(_bit_) * get(_cwish_));
                  },

                  // ----------------
                  // Follow-up Events
                  // ----------------
                  //
                  // When some event as a result triggers another event, it preferably is not triggered
                  // directly, because it would disallow preventing the event propagation / chaining
                  // to happen. Instead a followup handler is bound to the first event and it triggers the
                  // second one.
                  //
                  'setup.fu': function(e){
                    var
                      frame= set(_frame_, opt.frame + (opt.row - 1) * get(_frames_))
                    t.trigger('preload')
                  },
                  'wheel.fu': function(){ wheeled= false },
                  'clean.fu': function(){ t.trigger('teardown') },
                  'loaded.fu': function(){ t.trigger('opening') }
                },

                // -------------
                // Tick Handlers
                // -------------

                // As opposed to the events bound to the instance itself, there is a [ticker](#Ticker)
                // in place, which emits `tick.reel` event on the document level by default every 1/36
                // of a second and drives all the animations. Three handlers currently bind each instance
                // to the tick.
                //
                pool: {

                  // This handler has a responsibility of continuously updating the preloading indicator
                  // until all images are loaded and to unbind itself then.
                  //
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

                  // This handler binds to the document's ticks at all times, regardless the situation.
                  // It serves several tasks:
                  //
                  // - keeps track of how long the instance is being operated by the user,
                  // - or for how long it is braking the velocity inertia,
                  // - decreases gained velocity by applying power of the [`brake`](#brake-Option) option,
                  // - flags the instance as `slidable` again, so that `pan` event handler can be executed
                  //   again,
                  // - updates the [`monitor`](#monitor-Option) value,
                  // - bounces off the edges for non-looping panoramas,
                  // - and most importantly it animates the Reel if [`speed`](#speed-Option) is configured.
                  //
                  'tick.reel': function(e){
                    var
                      velocity= get(_velocity_),
                      leader_tempo= leader(_tempo_),
                      monitor= opt.monitor
                    if (braking) var
                      braked= velocity - (get(_brake_) / leader_tempo * braking),
                      velocity= set(_velocity_, braked > 0.1 ? braked : (braking= operated= 0))
                    monitor && $monitor.text(get(monitor));
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

                  // This handler performs the opening animation duty when during it the normal animation
                  // is halted until the opening finishes.
                  //
                  'tick.reel.opening': function(e){
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

              // ------------------------
              // Instance Private Helpers
              // ------------------------

              // - Events propagation stopper / muter
              //
              mute= function(e, result){ return e.stopImmediatePropagation() || result },

              // - User idle control
              //
              operated,
              braking= 0,
              idle= function(){ return operated= 0 },
              unidle= function(){
                clearTimeout(delay);
                pool.unbind(_tick_+dot(_opening_), on.pool[_tick_+dot(_opening_)]);
                set(_opening_ticks_, 0);
                set(_reeled_, true);
                return operated= -opt.timeout * leader(_tempo_)
              },
              panned= false,
              wheeled= false,
              delay, // openingDone's delayed play pointer

              // - Constructors of UI elements
              //
              $monitor= $(),
              preloader= function(){
                var
                  size= opt.preloader
                css(___+dot(preloader_klass), {
                  position: _absolute_,
                  left: 0, top: get(_dimensions_).y - size,
                  height: size,
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

              // - CSS rules & stylesheet
              //
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

              // - Inertia rotation control
              //
              on_edge= 0,
              last= { x: 0, y: 0 },
              to_bias= function(value){ return bias.push(value) && bias.shift() && value },
              no_bias= function(){ return bias= [0,0] },
              bias= no_bias(),

              // - Graph function to be used
              //
              graph= opt.graph || reel.math[opt.loops ? 'hatch' : 'envelope'],
              normal= reel.normal,

              // - Interaction graph's zero point reset
              //
              recenter_mouse= function(revolution, x, y){
                var
                  fraction= set(_clicked_on_, get(_fraction_)),
                  tier= set(_clicked_tier_, get(_tier_)),
                  loops= opt.loops
                set(_lo_, loops ? 0 : - fraction * revolution);
                set(_hi_, loops ? revolution : revolution - fraction * revolution);
                return x && set(_clicked_location_, { x: x, y: y }) || undefined
              },
              slidable= true,

              // ~~~
              //
              // Global events are bound to the pool (`document`), but to make it work inside an `<iframe>`
              // we need to bind to the parent document too to maintain the dragging even outside the area
              // of the `<iframe>`.
              //
              pools= pool
            try{ if (pool[0] != top.document) pools= pool.add(top.document) }
            catch(e){}

            // A private flag `$iframe` is established to indicate Reel being viewed inside `<iframe>`.
            //
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

          // ~~~
          //
          // Reel maintains a ticker, which guides all animations. There's only one ticker per document
          // and all instances bind to it. Ticker's mechanism measures and compares times before and after
          // the `tick.reel` event trigger to estimate the time spent on executing `tick.reel`'s handlers.
          // The actual timeout time is then adjusted by the amount to run as close to expected tempo
          // as possible.
          //
          ticker= ticker || (function tick(){
            var
              start= +new Date(),
              tempo= leader(_tempo_)
            if (!tempo) return ticker= null;
            pool.trigger(_tick_);
            reel.cost= (+new Date() + reel.cost - start) / 2;
            return ticker= setTimeout(tick, max(4, 1000 / tempo - reel.cost));
          })();

          return $(instances);
          }else{

            // ----
            // Data
            // ----
            //
            // Reel stores all its inner state values with the standard DOM [data interface][1] interface
            // while adding an additional change-detecting event layer, which makes Reel entirely data-driven.
            //
            // [1]:http://api.jquery.com/data
            //
            // _For example let's find out on what frame a Reel instance currently is:_
            //
            //     .reel('frame') // Returns the frame number
            //
            // Think of `.reel()` as a synonym for `.data()`. Note, that you can therefore easily inspect
            // the entire datastore with `.data()` (without arguments). Use it for debugging only.
            // For real-time data watch use [`monitor`](#Monitor) option instead of manually hooking into
            // the data.
            //

            // #### `.reel( name )` ######
            // can return anything, since 1.2
            //
            if (typeof name == 'string'){
              if (args.length == 1){
                var
                  value= data[name]
                t.trigger('recall', [name, value]);
                return value;
              }

              // ---
              // ### Write Access ###
              //
              // You can store any value the very same way by passing the value as the second function
              // argument. _For example let's say you want to jump to frame 12:_
              //
              //     .reel('frame', 12)
              //
              // Only a handful of data keys is suitable for external manipulation. These include `area`,
              // `backwards`, `brake`, __`fraction`__, __`frame`__, `playing`, `reeling`, __`row`__, `speed`,
              // `stopped`, `velocity` and `vertical`. Use the rest of the keys for reading only, you can
              // mess up easily changing them.
              //

              // #### `.reel( name, value )` ######
              // returns `jQuery`, since 1.2
              //
              else{
                if (value !== undefined){
                  reel.normal[name] && (value= reel.normal[name](value, data));

                  // ---
                  // ### Changes ######
                  //
                  // Any value that does not equal (`===`) the old value is considered _new value_ and
                  // in such a case Reel will trigger a _change event_ to announce the change. The event
                  // type takes form of _`key`_`Change`, where _`key`_ will be the data key/name you've
                  // just assigned.
                  // _For example, setting `"frame"` to `12` in the above example will trigger
                  // `"frameChange"`._
                  //
                  // Some of these _change events_ (like `frame` or `fraction`) have a
                  // default handler attached.
                  //
                  // You can easily bind to any of the data key change with standard event
                  // binding methods. _For example, let's say you want to react on instance
                  // being manipulated by the user - whether it is __reeling__:_
                  //
                  //     .bind('reelingChange', function(evnt, nothing, reeling){
                  //       if (reeling) console.log('Rock & reel!')
                  //       else console.log('Not reeling...')
                  //     })
                  //

                  // The handler function will be executed every time the value changes and
                  // it will be supplied with three arguments. First one is the event object
                  // as usual, second is `undefined` and the third will be the actual value.
                  // In this case it was a boolean type value.
                  // If the second argument is not `undefined` it is the backward compatible
                  // "before" event triggered from outside Reel.
                  //
                  if (data[name] !== value) t.trigger(name+'Change', [ undefined, data[name]= value ]);
                }
                return t.trigger('store', [name, value]);
              }
            }
          }
        },

        // -----------
        // Destruction
        // -----------
        //
        // The evil-twin of `.reel()`. Tears down and wipes off entire instance.
        //

        // ### `.unreel()` Method ######
        // returns `jQuery`, since 1.2
        //
        unreel: function(){
          return this.trigger('teardown');
        }
      },

      // -------------------
      // Regular Expressions
      // -------------------
      //
      // Few regular expressions is used here and there mostly for options validation and verification
      // levels of user agent's capabilities.
      //

      // ### `$.reel.re` ######
      // `RegExp`, since 1.1
      //
      re: {
        /* Valid image file format */
        image:         /^(.*)\.(jpg|jpeg|png|gif)\??.*$/i,
        /* User agent failsafe stack */
        ua: [
                       /(msie|opera|firefox|chrome|safari)[ \/:]([\d.]+)/i,
                       /(webkit)\/([\d.]+)/i,
                       /(mozilla)\/([\d.]+)/i
        ],
        /* Multi touch devices */
        touchy_agent:  /iphone|ipod|ipad|android|fennec|rim tablet/i,
        /* Lazy (low-CPU mobile devices) */
        lazy_agent:    /\(iphone|ipod|android|fennec|blackberry/i,
        /* Format of frame class flag on the instance */
        frame_klass:   /frame-\d+/,
        /* [Sequence](#Sequence) string format */
        sequence:      /(^[^#|]*([#]+)[^#|]*)($|[|]([0-9]+)\.\.([0-9]+))($|[|]([0-9]+)$)/
      },

      // ------------------------
      // Content Delivery Network
      // ------------------------
      //
      // [CDN][1] is used for distributing mouse cursors to all instances running world-wide. It runs
      // on Google cloud infrastructure. If you want to ease up on the servers, please consider setting up
      // your own location with the cursors.
      //
      // [1]:https://github.com/pisi/Reel/wiki/CDN
      //

      // ### `$.reel.cdn` ######
      // `String` (URL path), since 1.1
      //
      cdn: 'http://code.vostrel.cz/',

      // -----------
      // Math Behind
      // -----------
      //
      // Surprisingly there's very little math behind Reel, just two equations (graph functions). These two
      // functions receive the same set of options.

      // ### `$.reel.math` ######
      // `Object`, since 1.1
      //
      math: {

        //     1 |  ********
        //       |          **
        //       |            **
        //       |              **
        //       |                **
        //       |                  ********
        //     0  ----------------------------›
        //
        envelope: function(x, start, revolution, lo, hi, cwness, y){
          return start + min_max(lo, hi, - x * cwness) / revolution
        },

        //     1 |        **          **
        //       |          **          **
        //       |            **          **
        //       |  **          **
        //       |    **          **
        //       |      **          **
        //     0  ----------------------------›
        //
        hatch: function(x, start, revolution, lo, hi, cwness, y){
          var
            x= (x < lo ? hi : 0) + x % hi, // Looping
            fraction= start + (- x * cwness) / revolution
          return fraction - floor(fraction)
        },

        // And an equation for interpolating `fraction` (and `tier`) value into `frame` and `row`.
        //
        interpolate: function(fraction, lo, hi){
          return lo + fraction * (hi - lo)
        }
      },

      // ----------------
      // Preloading Modes
      // ----------------
      //
      // Reel doesn't load frames in a linear manner from first to last (alhough it can if configured
      // that way with the [`preload`](#preload-Option) option). Reel will take the linear configured
      // sequence and hand it over to one of `$.reel.preload` functions, along with reference to options
      // and the RO data intearface, and it expects the function to reorder the incoming Array and return
      // it back.

      // ### `$.reel.preload` ######
      // `Object`, since 1.2
      //
      preload: {

        // The best (and default) option is the `fidelity` processor, which is designed for a faster and
        // better perceived loading.
        //
        // ![Example](https://camo.githubapp.com/74b73060a50f3cbaf522ec31530d34e3fa5cbcb9/687474703a2f2f6a71756572792e766f737472656c2e637a2f7265656c2f7363617474657265642e6c6f6164696e672e676966)
        //
        fidelity: function(sequence, opt, get){
          var
            orbital= opt.orbital,
            rows= orbital ? 2 : opt.rows || 1,
            frames= orbital ? opt.footage : get(_frames_),
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
        },

        // ~~~
        //
        // You can opt for a `linear` loading order too, but that has a drawback of leaving large gap
        // of unloaded frames.
        //
        linear: function(sequence, opt, get){
          return sequence
        }
      },

      // ------------------------
      // Data Value Normalization
      // ------------------------
      //
      // On all data values being stored with `.reel()` an attempt is made to normalize the value. Like
      // for example normalization of frame `55` when there's just `45` frames total. These are the built-in
      // normalizations. Normalization function has the same name as the data key it is assigned to
      // and is given the raw value in arguments, along with reference to the instances data object,
      // and it has to return the normalized value.
      //

      // ### `$.reel.normal` ######
      // `Object`, since 1.2
      //
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

      // -----------------
      // Sequence Build-up
      // -----------------
      //
      // When configured with a String value for [`images`](#images-Option) like `image##.jpg`, it first has
      // to be converted into an actual Array by engaging the counter placeholder.
      //

      // ### `$.reel.sequence()` ######
      // `Function`, since 1.2
      //
      sequence: function(sequence, opt){
        if (sequence.length <= 1) return opt.images;
        var
          images= [],
          orbital= opt.orbital,
          url= sequence[1],
          placeholder= sequence[2],
          start= +sequence[4] || 1,
          rows= orbital ? 2 : opt.rows || 1,
          frames= orbital ? opt.footage : opt.stitched ? 1 : opt.frames,
          end= +(sequence[5] || rows * frames),
          total= end - start,
          increment= +sequence[7] || 1,
          counter= 0
        while(counter <= total){
          images.push(url.replace(placeholder, pad((start + counter + __), placeholder.length, '0')));
          counter+= increment;
        }
        return images;
      },

      // --------------
      // Reel Instances
      // --------------
      //
      // `$.reel.instances` holds an inventory of all running instances in the DOM document.

      // ### `$.reel.instances` ######
      // `jQuery`, since 1.1
      //
      instances: $(),

      // For ticker-synchronization-related purposes Reel maintains a reference to the leaders data object
      // all the time.
      //

      // ### `$.reel.leader` ######
      // `Object` (DOM data), since 1.1
      //
      leader: leader,

      //
      // `$.reel.cost` holds document-wide costs in miliseconds of running all Reel instances. It is used
      // to adjust actual timeout of the ticker.

      // ### `$.reel.cost` ######
      // `Number`, since 1.1
      //
      cost: 0
    },

    // ------------------------
    // Private-scoped Variables
    // ------------------------
    //
    pool= $(document),
    client= navigator.userAgent,
    browser= reel.re.ua[0].exec(client) || reel.re.ua[1].exec(client) || reel.re.ua[2].exec(client),
    browser_version= +browser[2].split('.').slice(0,2).join('.'),
    ie= browser[1] == 'MSIE',
    knows_data_urls= !(ie && browser_version < 8),
    ticker,

    // ---------------
    // CSS Class Names
    // ---------------

    // These are all the class names assigned by Reel to various DOM elements during initialization of the UI
    // and they all share same base `"reel"`, which in isolation also is the class of the `<img>` node you
    // converted into Reel.
    klass= 'reel',

    // Rest of the class names only extend this base class forming for example `.reel-overlay`, a class
    // assigned to the outter instance wrapper (`<img>`'s injected parent).
    //
    overlay_klass= klass + '-overlay',
    indicator_klass= klass + '-indicator',
    preloader_klass= klass + '-preloader',
    cached_klass= klass + '-cached',
    monitor_klass= klass + '-monitor',
    annotation_klass= klass + '-annotation',
    panning_klass= klass + '-panning',
    loading_klass= klass + '-loading',

    // The instance wrapper is flagged with actual frame number using a this class. _For example Reel
    // on frame 10 will bear a class name `.frame-10`.
    //
    frame_klass= 'frame-',

    // --------------------------------
    // Shortcuts And Minification Cache
    // --------------------------------

    // Several math functions are referenced inside the private scope to yield smaller filesize
    // when the code is minified.
    //
    math= Math,
    round= math.round, floor= math.floor, ceil= math.ceil,
    min= math.min, max= math.max, abs= math.abs,
    number= parseInt,
    interpolate= reel.math.interpolate,

    // For the very same reason all storage key Strings are cached into local vars.
    //
    _annotations_= 'annotations',
    _area_= 'area', _auto_= 'auto', _backup_= 'backup', _backwards_= 'backwards', _bit_= 'bit', _brake_= 'brake', _cached_= 'cached', _center_= 'center',
    _clicked_= 'clicked', _clicked_location_= 'clicked_location', _clicked_on_= 'clicked_on', _clicked_tier_= 'clicked_tier',
    _cwish_= 'cwish', _dimensions_= 'dimensions', _fraction_= 'fraction', _frame_= 'frame',
    _frames_= 'frames', _hi_= 'hi', _hidden_= 'hidden', _image_= 'image', _images_= 'images', _opening_= 'opening', _opening_ticks_= _opening_+'_ticks',
    _lo_= 'lo', _options_= 'options', _playing_= 'playing', _preloaded_= 'preloaded', _reeling_= 'reeling', _reeled_= 'reeled', _revolution_= 'revolution',
    _revolution_y_= 'revolution_y', _row_= 'row', _rows_= 'rows', _spacing_= 'spacing', _speed_= 'speed', _stage_= 'stage',
    _stitched_shift_= 'stitched_shift', _stitched_travel_= 'stitched_travel', _stopped_= 'stopped', _style_= 'style', _tempo_= 'tempo', _tier_= 'tier',
    _velocity_= 'velocity', _vertical_= 'vertical',

    // And the same goes for browser events too.
    //
    ns= dot(klass),
    pns= dot('pan') + ns,
    _touch_= 'touch', _mouse_= 'mouse',
    _mousedown_= _mouse_+'down'+ns, _mouseenter_= _mouse_+'enter'+ns,
    _mouseleave_= _mouse_+'leave'+pns, _mousemove_= _mouse_+'move'+pns, _mouseup_= _mouse_+'up'+pns,
    _mousewheel_= _mouse_+'wheel'+ns, _tick_= 'tick'+ns, _touchcancel_= _touch_+'cancel'+pns,
    _touchend_= _touch_+'end'+pns, _touchstart_= _touch_+'start'+ns, _touchmove_= _touch_+'move'+pns,

    // And some other frequently used Strings.
    //
    __= '', ___= ' ', ____=',', _absolute_= 'absolute', _block_= 'block', _cdn_= '@CDN@', _div_= 'div',
    _hand_= 'hand', _head_= 'head', _height_= 'height', _html_= 'html', _id_= 'id',
    _img_= 'img', _jquery_reel_= 'jquery.'+klass, _move_= 'move', _none_= 'none', _object_= 'object',
    _preload_= 'preload', _string_= 'string',
    _width_= 'width',

    // ---------------
    // Image Resources
    // ---------------

    // Alhough we do what we can to hide the fact, Reel actually needs a few image resources to support
    // some of its actions. First, we may need a transparent image for the original `<img>` to uncover
    // the sprite applied to its background. This one is embedded in the code as it is very small.
    //
    transparent= knows_data_urls ? embedded('CAAIAIAAAAAAAAAAACH5BAEAAAAALAAAAAAIAAgAAAIHhI+py+1dAAA7') : _cdn_+'blank.gif',

    // Proper cross-browser cursors however need to come in an odd format, which essentially is not
    // compressed at all and this means bigger filesize. While it is no more than ~15k, it is unfit
    // for embedding directly here, so a [`CDN`](#Content-Delivery-Network) is employed to retrieve
    // the images from in an effective gzipped and cachable manner.
    //
    reel_cursor= url(_cdn_+_jquery_reel_+'.cur')+____+_move_,
    drag_cursor= url(_cdn_+_jquery_reel_+'-drag.cur')+____+_move_,
    drag_cursor_down= url(_cdn_+_jquery_reel_+'-drag-down.cur')+____+_move_,

    // ~~~
    //
    // We then only identify the user's browser's capabilities and route around a MSIE's left button
    // identification quirk (IE 8- reports left as right).
    touchy= reel.touchy= (reel.re.touchy_agent).test(client),
    lazy= reel.lazy= (reel.re.lazy_agent).test(client),

    DRAG_BUTTON= touchy ? undefined : (ie && browser_version < 9) ? 1 : 0,

    // ~~~
    //
    // So far jQuery doesn't have a proper built-in mechanism to detect/report DOM node removal.
    // But internally, jQuery calls `$.cleanData()` to flush the DOM data and minimize memory leaks.
    // Reel wraps this function and as a result `clean` event handler is triggered for every element.
    // Note, that the `clean` event does not bubble.
    //
    cleanData= $.cleanData,
    cleanDataEvent= $.cleanData= function(elements){
      cleanData($(elements).each(function(){ $(this).triggerHandler('clean'); }));
    }

  // Expose plugin functions as jQuery methods
  $.extend($.fn, reel.fn);

  // Very useful helpers
  function add_instance($instance){ return (reel.instances.push($instance[0])) && $instance }
  function remove_instance($instance){ return (reel.instances= reel.instances.not(hash($instance.attr(_id_)))) && $instance }
  function leader(key){ return reel.instances.first().data(key) }
  function embedded(image){ return 'data:image/gif;base64,R0lGODlh' + image }
  function tag(string){ return '<' + string + '/>' }
  function dot(string){ return '.' + (string || '') }
  function cdn(path){ return path.replace(_cdn_, reel.cdn) }
  function url(location){ return 'url(\'' + reen(location) + '\')' }
  function axis(key, value){ return typeof value == _object_ ? value[key] : value }
  function min_max(minimum, maximum, number){ return max(minimum, min(maximum, number)) }
  function negative_when(value, condition){ return abs(value) * (condition ? -1 : 1) }
  function finger(e){ return touchy ? e.touch || e.originalEvent.touches[0] : e }
  function px(value){ return value === undefined ? 0 : typeof value == _string_ ? value : value + 'px' }
  function hash(value){ return '#' + value }
  function pad(string, len, fill){ while (string.length < len) string= fill + string; return string }
  function reen(uri){ return encodeURI(decodeURI(uri)) }
  function deprecated(input){ try{ console.warn('Deprecation - Please consult https://github.com/pisi/Reel/wiki/Deprecations') }catch(e){} return input }
})(jQuery, window, document);
