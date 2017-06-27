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
 * Licensed under the MIT License (LICENSE.txt).
 *
 * jQuery Reel
 * http://reel360.org
 * Version: 1.3.0
 * Updated: 2013-11-04
 *
 * Requires jQuery 1.6.2 or higher
 */

/*
 * CDN
 * ---
 * - http://code.vostrel.net/jquery.reel-bundle.js (recommended)
 * - http://code.vostrel.net/jquery.reel.js
 * - http://code.vostrel.net/jquery.reel-debug.js
 * - or http://code.vostrel.net/jquery.reel-edge.js if you feel like it ;)
 *
 * Optional Plugins
 * ----------------
 * - jQuery.mouseWheel [B] (Brandon Aaron, http://plugins.jquery.com/project/mousewheel)
 * - or jQuery.event.special.wheel (Three Dub Media, http://blog.threedubmedia.com/2008/08/eventspecialwheel.html)
 *
 * [B] Marked plugins are contained (with permissions) in the "bundle" version from the CDN
 */

(function(factory){

  // -----------------------
  // [NEW] AMD Compatibility
  // -----------------------
  //
  // Reel registers as an asynchronous module with dependency on jQuery for [AMD][1] compatible script loaders.
  // Besides that it also complies with [CommonJS][2] module definition for Node and such.
  // Of course, no fancy script loader is necessary and good old plain script tag still works too.
  //
  // [1]:http://en.wikipedia.org/wiki/Asynchronous_module_definition
  // [2]:http://en.wikipedia.org/wiki/CommonJS
  //
  var
    amd= typeof define == 'function' && define.amd && (define(['jquery'], factory) || true),
    commonjs= !amd && typeof module == 'object' && typeof module.exports == 'object' && (module.exports= factory),
    plain= !amd && !commonjs && factory()

})(function(){ return jQuery.reel || (function($, window, document, undefined){

  // ------
  // jQuery
  // ------
  //
  // One vital requirement is the correct jQuery. Reel requires at least version 1.6.2
  // and a make sure check is made at the very beginning.
  //
  if (!$) return;
  var
    version= $ && $().jquery.split(/\./)
  if (!version || +(twochar(version[0])+twochar(version[1])+twochar(version[2] || '')) < 10602)
    return error('Too old jQuery library. Please upgrade your jQuery to version 1.6.2 or higher');
  // ----------------
  // Global Namespace
  // ----------------
  //
  // `$.reel` (or `jQuery.reel`) namespace is provided for storage of all Reel belongings.
  // It is locally referenced as just `reel` for speedier access.
  //
  var
    reel= $.reel= {

      // ### `$.reel.version`
      //
      // `String` (major.minor.patch), since 1.1
      //
      version: '1.3.0',

      // Options
      // -------
      //
      // When calling `.reel()` method you have plenty of options (far too many) available.
      // You collect them into one hash and supply them with your call.
      //
      // _**Example:** Initiate a non-looping Reel with 12 frames:_
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
      // _**Example:** Change default initial frame to 5th:_
      //
      //     $.reel.def.frame = 5
      //
      // ---

      // ### `$.reel.def` ######
      // `Object`, since 1.1
      //
      def: {
        //
        // ### Basic Definition ######
        //
        // Reel is just fine with you not setting any options, however if you don't have
        // 36 frames or beginning at frame 1, you will want to set total number
        // of `frames` and pick a different starting `frame`.
        //
        // ---

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
        // ---

        // #### `loops` Option ####
        // `Boolean`, since 1.0
        //
        loops:               true,


        // ### Interaction ######
        //
        // Using boolean switches many user interaction aspects can be turned on and off.
        // You can disable the mouse wheel control with `wheelable`, the drag & throw
        // action with `throwable`, disallow the dragging completely with `draggable`,
        // on touch devices you can disable the browser's decision to scroll the page
        // instead of Reel script and you can of course disable the stepping of Reel by
        // clicking on either half of the image with `steppable`.
        //
        // You can even enable `clickfree` operation,
        // which will cause Reel to bind to mouse enter/leave events instead of mouse down/up,
        // thus allowing a click-free dragging.
        //
        // ---

        // #### `clickfree` Option ####
        // `Boolean`, since 1.1
        //
        clickfree:          false,

        // #### `draggable` Option ####
        // `Boolean`, since 1.1
        //
        draggable:           true,

        // #### `scrollable` Option ####
        // `Boolean`, since 1.2
        //
        scrollable:          true,

        // #### `steppable` Option ####
        // `Boolean`, since 1.2
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


        // ### [NEW] Gyroscope Support ######
        //
        // When enabled allows gyro-enabled devices (iPad2 for example) to control rotational
        // position using the device's attitude in space. In this more, Reel directly maps the
        // 360° range of your gyro's primary (alpha) axis directly to the value of `fraction`.
        //
        // #### `orientable` Option ####
        // [NEW] `Boolean`, since 1.3
        //
        orientable:         false,


        // ### Order of Images ######
        //
        // Reel presumes counter-clockwise order of the pictures taken. If the nearer facing
        // side doesn't follow your cursor/finger, you did clockwise. Use the `cw` option to
        // correct this.
        //
        // ---

        // #### `cw` Option ####
        // `Boolean`, since 1.1
        //
        cw:                 false,


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
        // ---

        // #### `revolution` Option ####
        // `Number` (pixels) or `Object`, since 1.1, `Object` support since 1.2
        //
        revolution:     undefined,


        // ### Rectilinear Panorama ######
        //
        // The easiest of all is the stitched panorama mode. For this mode, instead of the sprite,
        // a single seamlessly stitched stretched image is used and the view scrolls the image.
        // This mode is triggered by setting a pixel width of the `stitched` image.
        //
        // ---

        // #### `stitched` Option ####
        // `Number` (pixels), since 1.0
        //
        stitched:               0,


        // ### Directional Mode ######
        //
        // As you may have noticed on Reel's homepage or in [`example/object-movie-directional-sprite`][1]
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
        // [1]:../example/object-movie-directional-sprite/
        //
        // ---

        // #### `directional` Option ####
        // `Boolean`, since 1.1
        //
        directional:        false,


        // ### Multi-Row Mode ######
        //
        // As [`example/object-movie-multirow-sequence`][1] very nicely demonstrates, in multi-row arrangement
        // you can perform two-axis manipulation allowing you to add one or more vertical angles. Think of it as
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
        // [1]:../example/object-movie-multirow-sequence/
        //
        // ---

        // #### `row` Option ####
        // `Number` (rows), since 1.1
        //
        row:                    1,

        // #### `rows` Option ####
        // `Number` (rows), since 1.1
        //
        rows:                   0,


        // ### [NEW] Multi-Row Locks ######
        //
        // Optionally you can apply a lock on either of the two axes with `rowlock` and/or `framelock`.
        // That will disable direct mouse interaction and will leave using of `.reel()` the only way
        // of changing position on the locked axis.
        //
        // ---

        // #### `rowlock` Option ####
        // [NEW] `Boolean`, since 1.3
        //
        rowlock:            false,

        // #### `framelock` Option ####
        // [NEW] `Boolean`, since 1.3
        //
        framelock:          false,


        // ### Dual-Orbit Mode ######
        //
        // Special form of multi-axis movie is the dual-axis mode. In this mode the object offers two plain
        // spins - horizontal and vertical orbits combined together crossing each other at the `frame`
        // forming sort of a cross if envisioned. [`example/object-movie-dual-orbit-sequence`][1] demonstrates
        // this setup. When the phone in the example is facing you (marked in the example with green square
        // in the top right), you are at the center. That is within the distance (in frames) defined
        // by the `orbital` option. Translation from horizontal to vertical orbit can be achieved on this sweet-spot.
        // By default horizontal orbit is chosen first, unless `vertical` option is used against.
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
        // [1]:../example/object-movie-dual-orbit-sequence/
        //
        // ---

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
        // ---

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
        // ---

        // #### `images` Option ####
        // [IMPROVED] `String` or `Array`, since 1.1
        //
        images:                '',

        // #### `path` Option ####
        // `String` (URL path), since 1.1
        //
        path:                  '',


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
        // ---

        // #### `preload` Option ####
        // `String`, since 1.2
        //
        preload:       'fidelity',

        // ### [NEW] Shy Initialization ######
        //
        // Sometimes, on-demand activation is desirable in order to conserve device resources or bandwidth
        // especially with multiple instances on a single page. If so, enable _shy mode_, in which Reel will
        // hold up the initialization process until the image is clicked by the user. Alternativelly you can
        // initialize shy instance by triggering `"setup"` event.
        //
        // ---

        // #### `shy` Option ####
        // [NEW] `Boolean`, since 1.3
        //
        shy:                false,


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
        // When a scene doesn't loop (see [`loops`](#loops-Option)) and the animation reaches one end,
        // it stays there for a while and then reversing the direction of the animation it bounces back
        // towards the other end. The time spent on the edge can be customized with `rebound`.
        //
        // ---

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

        // #### `duration` Option ####
        // `Number` (seconds), since 1.3
        //
        duration:       undefined,

        // #### `rebound` Option ####
        // `Number` (seconds), since 1.1
        //
        rebound:              0.5,


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
        // ---

        // #### `entry` Option ####
        // `Number` (Hz), since 1.1
        //
        entry:          undefined,

        // #### `opening` Option ####
        // `Number` (seconds), since 1.1
        //
        opening:                0,


        // ### Momentum ######
        //
        // Often also called inertial motion is a result of measuring a velocity of dragging. This velocity
        // builds up momentum, so when a drag is released, the image still retains the momentum and continues
        // to spin on itself. Naturally the momentum soon wears off as `brake` is being applied.
        //
        // One can utilize this momentum for a different kind of an opening animation. By setting initial
        // `velocity`, the instance gets artificial momentum and spins to slow down to stop.
        //
        // ---

        // #### `brake` Option ####
        // `Number`, since 1.1, where it also has a different default `0.5`
        //
        brake:               0.23,

        // #### `velocity` Option ####
        // `Number`, since 1.2
        //
        velocity:               0,


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
        // ---

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
        // ---

        // #### `laziness` Option ####
        // `Number`, since 1.1
        //
        laziness:               6,


        // ### Customization ######
        //
        // You can customize Reel on both functional and visual front. The most visible thing you can
        // customize is probably the `cursor`, size of the `preloader`, perhaps add visual `indicator`(s)
        // of Reel's position within the range. You can also set custom `hint` for the tooltip, which appears
        // when you mouse over the image area. Last but not least you can also add custom class name `klass`
        // to the instance.
        //
        // ---

        // #### `cursor` Option ####
        // `String`, since 1.2
        //
        cursor:         undefined,

        // #### `hint` Option ####
        // `String`, since 1.0
        //
        hint:                  '',

        // #### `indicator` Option ####
        // `Number` (pixels), since 1.0
        //
        indicator:              0,

        // #### `klass` Option ####
        // `String`, since 1.0
        //
        klass:                 '',

        // #### `preloader` Option ####
        // `Number` (pixels), since 1.1
        //
        preloader:              2,

        // ~~~
        //
        // You can use custom attributes (`attr`) on the node - it accepts the same name-value pairs object
        // jQuery `.attr()` does. In case you want to delegate full interaction control over the instance
        // to some other DOM element(s) on page, you can with `area`.
        //
        // ---

        // #### `area` Option ####
        // `jQuery`, since 1.1
        //
        area:           undefined,

        // #### `attr` Option ####
        // `Object`, since 1.2
        //
        attr:                  {},


        // ### Annotations ######
        //
        // To further visually describe your scene you can place all kinds of in-picture HTML annotations
        // by defining an `annotations` object. Learn more about [Annotations][1] in a dedicated article.
        //
        // [1]:https://github.com/pisi/Reel/wiki/Annotations
        //
        // ---

        // #### `annotations` Option ####
        // `Object`, since 1.2
        //
        annotations:    undefined,


        // ### [NEW] Responsiveness ######
        //
        // By default, dimensions of Reel are fixed and pixel-match the dimensions of the original image
        // and the responsive mode is disabled. Using `responsive` option you can enable responsiveness.
        // In such a case Reel will adopt dimensions of its parent container element and scale all relevant
        // data store values accordingly.
        // The scale applied is stored in `"ratio"` data key, where `1.0` means 100% or no scale.
        //
        // To take full advantage of this, you can setup your URLs to contain actual dimensions and
        // serve images in appropriate detail.
        // Learn more about [data values in URLs](#Data-Values-in-URLs).
        //
        // ---

        // #### `responsive` Option ####
        // [NEW] `Boolean`, since 1.3
        //
        responsive:         false,


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
        // ---

        // #### `graph` Option ####
        // `Function`, since 1.1
        //
        graph:          undefined,


        // ### Monitor ######
        //
        // Specify a string data key and you will see its real-time value dumped in the upper-left corner
        // of the viewport. Its visual can be customized by CSS using `.jquery-reel-monitor` selector.
        //
        // ---

        // #### `monitor` Option ####
        // `String` (data key), since 1.1
        //
        monitor:        undefined

      },

      // -----------------
      // [NEW] Quick Start
      // -----------------
      //
      // For basic Reel initialization, you don't even need to write any Javascript!
      // All it takes is to add __class name__ `"reel"` to your `<img>` HTML tag,
      // assign an unique __`id` attribute__ and decorate the tag with configuration __data attributes__.
      // Result of which will be interactive Reel projection.
      //
      //     <img src="some/image.jpg" width="300" height="200"
      //       id="my_image"
      //       class="reel"
      //       data-images="some/images/01.jpg, some/images/02.jpg"
      //       data-speed="0.5">
      //
      // All otherwise Javascript [options](#Options) are made available as HTML `data-*` attributes.
      //
      // Only the `annotations` option doesn't work this way. To quickly create annotations,
      // simply have any HTML node (`<div>` prefferably) anywhere in the DOM,
      // assign it __class name__ `"reel-annotation"`, an unique __`id` attribute__
      // and add configuration __data attributes__.
      //
      //     <div id="my_annotation"
      //       class="reel-annotation"
      //       data-for="my_image"
      //       data-x="120"
      //       data-y="60">
      //       Whatever HTML I'd like to have in the annotation
      //     </div>
      //
      // Most important is the `data-for` attribute, which references target Reel instance by `id`.
      //
      // ---

      //
      // Responsible for discovery and subsequent conversion of data-configured Reel images is
      // `$.reel.scan()` method, which is being called automagically when the DOM becomes ready.
      // Under normal circumstances you don't need to scan by yourself.
      //
      // It however comes in handy to re-scan when you happen to inject a data-configured Reel `<img>`
      // into already ready DOM.
      //
      // ---

      // ### `$.reel.scan()` Method ######
      // [NEW] returns `jQuery`, since 1.3
      //
      scan: function(){
        return $(dot(klass)+':not('+dot(overlay_klass)+' > '+dot(klass)+')').each(function(ix, image){
          var
            $image= $(image),
            options= $image.data(),
            images= options.images= soft_array(options.images),
            annotations= {}
          $(dot(annotation_klass)+'[data-for='+$image.attr(_id_)+']').each(function(ix, annotation){
            var
              $annotation= $(annotation),
              def= $annotation.data(),
              x= def.x= numerize_array(soft_array(def.x)),
              y= def.y= numerize_array(soft_array(def.y)),
              id= $annotation.attr(_id_),
              node= def.node= $annotation.removeData()
            annotations[id] = def;
          });
          options.annotations = annotations;
          $image.removeData().reel(options);
        });
      },

      // -------
      // Methods
      // -------
      //
      // Reel's methods extend jQuery core functions with members of its `$.reel.fn` object. Despite Reel
      // being a typical one-method plug-in with its `.reel()` function, for convenience it also offers
      // its bipolar twin `.unreel()`.
      //
      // ---

      // ### `$.reel.fn` ######
      // returns `Object`, since 1.1
      //
      fn: {
        // ------------
        // Construction
        // ------------
        //
        // `.reel()` method is the core of Reel and similar to some jQuery functions, it has adaptive interface.
        // It either builds, [reads & writes data](#Data) or [causes events](#Control-Events).
        //
        // ---

        // ### `.reel( [options] )` Method ######
        // returns `jQuery`, since 1.0
        //
        reel: function(){
          var
            args= arguments,
            t= $(this),
            data= t.data(),
            name= args[0] || {},
            value= args[1]

          // The main [core of this procedure](#Construction-Core) is rather bulky, so let's skip it for now
          // and instead let me introduce the other uses first.

          // --------------------
          // [NEW] Control Events
          // --------------------
          //
          // [Event][1] messages are what ties and binds all Reel's internal working components together.
          // Besides being able to binding to any of these events from your script and react on Reel status changes
          // (e.g. position), you can also trigger some of them in order to control Reel's attitude.
          //
          // You can:
          //
          // * control the playback of animated Reels with [`play`](#play-Event), [`pause`](#pause-Event)
          // or [`stop`](#stop-Event)
          // * step the Reel in any direction with [`stepRight`](#stepRight-Event), [`stepLeft`](#stepLeft-Event),
          // [`stepUp`](#stepUp-Event), [`stepDown`](#stepDown-Event), 
          // * reach certain frame with [`reach`](#reach-Event)
          //
          // Triggering Reel's control event is as simple as passing the desired event name to `.reel()`.
          //
          // _**Example:** Stop the animation in progress:_
          //
          //     .reel(':stop')
          //
          // Think of `.reel()` as a convenient shortcut to and synonym for [`.trigger()`][2], only prefix
          // the event name with `:`. Of course you can use simple `.trigger()` instead and without the colon.
          //
          //
          // [1]:http://api.jquery.com/category/events/event-object/
          // [2]:http://api.jquery.com/trigger
          //
          // ---

          // #### `.reel( event, [arguments] )` ######
          // returns `jQuery`, since 1.3
          //
          if (typeof name != 'object'){

            if (name.slice(0, 1) == ':'){
              return t.trigger(name.slice(1), value);
            }

            // ----
            // Data
            // ----
            //
            // Reel stores all its inner state values with the standard DOM [data interface][1] interface
            // while adding an additional change-detecting event layer, which makes Reel entirely data-driven.
            //
            // [1]:http://api.jquery.com/data
            //
            // _**Example:** Find out on what frame a Reel instance currently is:_
            //
            //     .reel('frame') // Returns the frame number
            //
            // This time think of `.reel(data)` as a synonym for `.data()`. Note, that you can therefore easily
            // inspect the entire datastore with `.data()` (without arguments). Use it for debugging only.
            // For real-time data watch use [`monitor`](#Monitor) option instead of manually hooking into
            // the data.
            //
            // ---

            // #### `.reel( data )` ######
            // can return anything, since 1.2
            //
            else{
              if (args.length == 1){
                return data[name]
              }

              // ### Write Access ###
              //
              // You can store any value the very same way by passing the value as the second function
              // argument.
              //
              // _**Example:** Jump to frame 12:_
              //
              //     .reel('frame', 12)
              //
              // Only a handful of data keys is suitable for external manipulation. These include `area`,
              // `backwards`, `brake`, __`fraction`__, __`frame`__, `playing`, `reeling`, __`row`__, `speed`,
              // `stopped`, `velocity` and `vertical`. Use the rest of the keys for reading only, you can
              // mess up easily changing them.
              //
              // ---

              // #### `.reel( data, value )` ######
              // returns `jQuery`, since 1.2
              //
              else{
                if (value !== undefined){
                  reel.normal[name] && (value= reel.normal[name](value, data));

                  // ### Changes ######
                  //
                  // Any value that does not equal (`===`) the old value is considered _new value_ and
                  // in such a case Reel will trigger a _change event_ to announce the change. The event
                  // type takes form of _`key`_`Change`, where _`key`_ will be the data key/name you've
                  // just assigned.
                  //
                  // _**Example:** Setting `"frame"` to `12` in the above example will trigger
                  // `"frameChange"`._
                  //
                  // Some of these _change events_ (like `frame` or `fraction`) have a
                  // default handler attached.
                  //
                  // You can easily bind to any of the data key change with standard event
                  // binding methods.
                  //
                  // _**Example:** React on instance being manipulated or not:_
                  //
                  //     .bind('reelingChange', function(evnt, nothing, reeling){
                  //       if (reeling) console.log('Rock & reel!')
                  //       else console.log('Not reeling...')
                  //     })
                  //
                  // ---

                  // The handler function will be executed every time the value changes and
                  // it will be supplied with three arguments. First one is the event object
                  // as usual, second is `undefined` and the third will be the actual value.
                  // In this case it was a boolean type value.
                  // If the second argument is not `undefined` it is the backward compatible
                  // "before" event triggered from outside Reel.
                  //
                  if (data[name] === undefined) data[name]= value
                  else if (data[name] !== value) t.trigger(name+'Change', [ undefined, data[name]= value ]);
                }
                return t
              }
            }
          }

          //
          // -----------------
          // Construction Core
          // -----------------
          //
          // Now, back to the procedure of [constructing](#Construction) a Reel instance
          // and binding its event handlers.
          //
          // Establish local `opt` object made by extending the defaults.
          //
          else{

          var
            opt= $.extend({}, reel.def, name),
            // Limit the given jQuery collection to just `<img>` tags with `src` attribute
            // and dimensions defined.
            applicable= t.filter(_img_).unreel().filter(function(){
              var
                $this= $(this),
                attr= opt.attr,
                src= attr.src || $this.attr(_src_),
                width= attr.width || $this.attr(_height_) || $this.width(),
                height= attr.height || $this.attr(_width_) || $this.height()
              if (!src) return error('`src` attribute missing on target image');
              if (!width || !height) return error('Dimension(s) of the target image unknown');
              return true;
            }),
            instances= []

          applicable.each(function(){
            var
              t= $(this),

              // Quick data interface
              set= function(name, value){ return t.reel(name, value) && get(name) },
              get= function(name){ return t.data(name) },

              on= {

                // --------------
                // Initialization
                // --------------
                //
                // This internally called private pseudo-handler:
                //
                // - initiates all data store keys,
                // - binds to ticker
                // - and triggers `"setup"` Event when finished.
                //
                setup: function(e){
                  if (t.hasClass(klass) && t.parent().hasClass(overlay_klass)) return;
                  set(_options_, opt);
                  var
                    attr= {
                      src: t.attr(_src_),
                      width: t.attr(_width_) || null,
                      height: t.attr(_height_) || null,
                      style: t.attr(_style_) || null,
                      'class': t.attr(_class_) || null
                    },
                    src= t.attr(opt.attr).attr(_src_),
                    id= set(_id_, t.attr(_id_) || t.attr(_id_, klass+'-'+(+new Date())).attr(_id_)),
                    data= $.extend({}, t.data()),
                    images= set(_images_, opt.images || []),
                    stitched= set(_stitched_, opt.stitched),
                    is_sprite= !images.length || stitched,
                    responsive= set(_responsive_, opt.responsive && (knows_background_size ? true : !is_sprite)),
                    truescale= set(_truescale_, {}),
                    loops= opt.loops,
                    orbital= opt.orbital,
                    revolution= opt.revolution,
                    rows= opt.rows,
                    footage= set(_footage_, min(opt.footage, opt.frames)),
                    spacing= set(_spacing_, opt.spacing),
                    width= set(_width_, +t.attr(_width_) || t.width()),
                    height= set(_height_, +t.attr(_height_) || t.height()),
                    shy= set(_shy_, opt.shy),
                    frames= set(_frames_, orbital && footage || rows <= 1 && images.length || opt.frames),
                    multirow= rows > 1 || orbital,
                    revolution_x= set(_revolution_, axis('x', revolution) || stitched / 2 || width * 2),
                    revolution_y= set(_revolution_y_, !multirow ? 0 : (axis('y', revolution) || (rows > 3 ? height : height / (5 - rows)))),
                    rows= stitched ? 1 : ceil(frames / footage),
                    stitched_travel= set(_stitched_travel_, stitched - (loops ? 0 : width)),
                    stitched_shift= set(_stitched_shift_, 0),
                    stage_id= hash(id+opt.suffix),
                    img_class= t.attr(_class_),
                    classes= !img_class ? __ : img_class+___,
                    $overlay= $(tag(_div_), { id: stage_id.substr(1), 'class': classes+___+overlay_klass+___+frame_klass+'0' }),
                    $instance= t.wrap($overlay.addClass(opt.klass)).addClass(klass),
                    instances_count= instances.push(add_instance($instance)[0]),
                    $overlay= $instance.parent().bind(on.instance)
                  set(_image_, images.length ? __ : opt.image || src.replace(reel.re.image, '$1' + opt.suffix + '.$2'));
                  set(_cache_, $(tag(_div_), { 'class': cache_klass }).appendTo('body'));
                  set(_area_, $()),
                  set(_cached_, []);
                  set(_frame_, null);
                  set(_fraction_, null);
                  set(_row_, opt.row);
                  set(_tier_, 0);
                  set(_rows_, rows);
                  set(_rowlock_, opt.rowlock);
                  set(_framelock_, opt.framelock);
                  set(_departure_, set(_destination_, set(_distance_, 0)));
                  set(_bit_, 1 / frames);
                  set(_stage_, stage_id);
                  set(_backwards_, set(_speed_, opt.speed) < 0);
                  set(_loading_, false);
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
                  set(_ticks_, -1);
                  set(_annotations_, opt.annotations || $overlay.unbind(dot(_annotations_)) && {});
                  set(_ratio_, 1);
                  set(_backup_, {
                    attr: attr,
                    data: data
                  });
                  opt.steppable || $overlay.unbind('up.steppable');
                  opt.indicator || $overlay.unbind('.indicator');
                  css(__, { overflow: _hidden_, position: 'relative' });
                  responsive || css(__, { width: width, height: height });
                  responsive && $.each(responsive_keys, function(i, key){ truescale[key]= get(key) });
                  css(____+___+dot(klass), { display: _block_ });
                  css(dot(cache_klass), { position: 'fixed', left: px(-100), top: px(-100) }, true);
                  css(dot(cache_klass)+___+_img_, { position: _absolute_, width: 10, height: 10 }, true);
                  pool.bind(on.pool);
                  t.trigger(shy ? 'prepare' : 'setup')
                },

                // ------
                // Events
                // ------
                //
                // Reel is completely event-driven meaning there are many events, which can be called
                // (triggered). By binding event handler to any of the events you can easily hook on to any
                // event to inject your custom behavior where and when this event was triggered.
                //
                // _**Example:** Make `#image` element reel and execute some code right after the newly
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
                    if (get(_shy_)) t.parent().unbind(_click_, shy_setup)
                    else get(_style_).remove() && get(_area_).unbind(ns);
                    get(_cache_).empty();
                    clearTimeout(delay);
                    clearTimeout(gauge_delay);
                    $(window).unbind(_resize_, slow_gauge);
                    $(window).unbind(ns);
                    pool.unbind(on.pool);
                    pools.unbind(pns);
                    t.siblings().unbind(ns).remove();
                    no_bias();
                    t.removeAttr('onloaded');
                    remove_instance(t.unbind(ns).removeData().unwrap().attr(backup.attr).data(backup.data));
                    t.attr(_style_) == __ && t.removeAttr(_style_);
                  },

                  // ### `setup` Event ######
                  // `Event`, since 1.0
                  //
                  // `"setup"` Event continues with what has been started by the private `on.setup()`
                  // handler.
                  //
                  // - It prepares all additional on-stage DOM elements
                  // - and cursors for the instance stylesheet.
                  //
                  setup: function(e){
                    var
                      $overlay= t.parent().append(preloader()),
                      $area= set(_area_, $(opt.area || $overlay )),
                      multirow= opt.rows > 1,
                      cursor= opt.cursor,
                      cursor_up= cursor == _hand_ ? drag_cursor : cursor || reel_cursor,
                      cursor_down= cursor == _hand_ ? drag_cursor_down+___+'!important' : undefined
                    css(___+dot(klass), { MozUserSelect: _none_, WebkitUserSelect: _none_, MozTransform: 'translateZ(0)' });
                    t.unbind(_click_, shy_setup);
                    $area
                      .bind(_touchstart_, press)
                      .bind(opt.clickfree ? _mouseenter_ : _mousedown_, press)
                      .bind(opt.wheelable ? _mousewheel_ : null, wheel)
                      .bind(_dragstart_, function(){ return false })
                    css(__, { cursor: cdn(cursor_up) });
                    css(dot(loading_klass), { cursor: 'wait' });
                    css(dot(panning_klass)+____+dot(panning_klass)+' *', { cursor: cdn(cursor_down || cursor_up) }, true);
                    if (get(_responsive_)){
                      css(___+dot(klass), { width: '100%', height: _auto_ });
                      $(window).bind(_resize_, slow_gauge);
                    }
                    function press(e){ return t.trigger('down', [pointer(e).clientX, pointer(e).clientY, e]) && e.give }
                    function wheel(e, delta){ return !delta || t.trigger('wheel', [delta, e]) && e.give }
                    opt.hint && $area.attr('title', opt.hint);
                    opt.indicator && $overlay.append(indicator('x'));
                    multirow && opt.indicator && $overlay.append(indicator('y'));
                    opt.monitor && $overlay.append($monitor= $(tag(_div_), { 'class': monitor_klass }))
                                && css(___+dot(monitor_klass), { position: _absolute_, left: 0, top: 0 });
                  },

                  // ### `preload` Event ######
                  // `Event`, since 1.1
                  //
                  // Reel keeps a cache of all images it needs for its operation. Either a sprite or all
                  // sequence images. It first determines the order of requesting the images and then
                  // asynchronously loads all of them.
                  //
                  // - It preloads all frames and sprites.
                  //
                  preload: function(e){
                    var
                      $overlay= t.parent(),
                      images= get(_images_),
                      is_sprite= !images.length,
                      order= reel.preload[opt.preload] || reel.preload[reel.def.preload],
                      preload= is_sprite ? [get(_image_)] : order(images.slice(0), opt, get),
                      to_load= preload.length,
                      preloaded= set(_preloaded_, is_sprite ? 0.5 : 0),
                      simultaneous= 0,
                      $cache= get(_cache_).empty(),
                      uris= []
                    $overlay.addClass(loading_klass);
                    // It also finalizes the instance stylesheet and prepends it to the head.
                    set(_style_, get(_style_) || $('<'+_style_+' type="text/css">'+css.rules.join('\n')+'</'+_style_+'>').prependTo(_head_));
                    set(_loading_, true);
                    t.trigger('stop');
                    opt.responsive && gauge();
                    t.trigger('resize', true);
                    while(preload.length){
                      var
                        uri= reel.substitute(opt.path+preload.shift(), get),
                        $img= $(tag(_img_)).data(_src_, uri).appendTo($cache)
                      // Each image, which finishes the load triggers `"preloaded"` Event.
                      $img.bind('load error abort', function(e){
                        e.type != 'load' && t.trigger(e.type);
                        return !detached($overlay) && t.trigger('preloaded') && load() && false;
                      });
                      uris.push(uri);
                    }
                    setTimeout(function(){ while (++simultaneous < reel.concurrent_requests) load(); }, 0);
                    set(_cached_, uris);
                    set(_shy_, false);
                    function load(){
                      var
                        $img= $cache.children(':not([src]):first')
                      return $img.attr(_src_, $img.data(_src_))
                    }
                  },

                  // ### `preloaded` Event ######
                  // `Event`, since 1.1
                  //
                  // This event is fired by every preloaded image and adjusts the preloader indicator's
                  // target position. Once all images are preloaded, `"loaded"` Event is triggered.
                  //
                  preloaded: function(e){
                    var
                      images= get(_images_).length || 1,
                      preloaded= set(_preloaded_, min(get(_preloaded_) + 1, images))
                    if (preloaded === 1) var
                      frame= t.trigger('frameChange', [undefined, get(_frame_)])
                    if (preloaded === images){
                      t.parent().removeClass(loading_klass);
                      t.trigger('loaded');
                    }
                  },

                  // ### `loaded` Event ######
                  // `Event`, since 1.1
                  //
                  // `"loaded"` Event is the one announcing when the instance is "locked and loaded".
                  // At this time, all is prepared, preloaded and configured for user interaction
                  // or animation.
                  //
                  loaded: function(e){
                    get(_images_).length > 1 || t.css({ backgroundImage: url(reel.substitute(opt.path+get(_image_), get)) }).attr({ src: cdn(transparent) });
                    get(_stitched_) && t.attr({ src: cdn(transparent) });
                    get(_reeled_) || set(_velocity_, opt.velocity || 0);
                    set(_loading_, false);
                    loaded= true;
                  },

                  // ### `prepare` Event ######
                  // [NEW] `Event`, since 1.3
                  //
                  // In case of `shy` activation, `"prepare"` event is called instead of the full `"setup"`.
                  // It lefts the target image untouched waiting to be clicked to actually setup.
                  //
                  prepare: function(e){
                    t.css('display', _block_).parent().one(_click_, shy_setup);
                  },

                  // ----------------
                  // Animation Events
                  // ----------------
                  //
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
                    opt.orientable && $(window).bind(_deviceorientation_, orient);
                    if (opt.delay > 0) delay= setTimeout(function(){ t.trigger('play') }, opt.delay * 1000)
                    else t.trigger('play');
                    function orient(e){ return t.trigger('orient', [gyro(e).alpha, gyro(e).beta, gyro(e).gamma, e]) && e.give }
                  },

                  // -----------------------
                  // Playback Control Events
                  // -----------------------
                  //
                  // ### `play` Event ######
                  // `Event`, since 1.1
                  //
                  // `"play"` event can optionally accept a `speed` parameter (in Hz) to change the animation
                  // speed on the fly.
                  //
                  play: function(e, speed){
                    var
                      speed= speed ? set(_speed_, speed) : (get(_speed_) * negative_when(1, get(_backwards_))),
                      duration= opt.duration,
                      ticks= duration && set(_ticks_, ceil(duration * leader(_tempo_))),
                      backwards= set(_backwards_, speed < 0),
                      playing= set(_playing_, !!speed),
                      stopped= set(_stopped_, !playing)
                    idle();
                  },

                  // ### `reach` Event ######
                  // [NEW] `Event`, since 1.3
                  //
                  // Use this event to instruct Reel to play and reach a given frame. `"reach"` event requires
                  // `target` parameter, which is the frame to which Reel should animate to and stop.
                  // Optional `speed` parameter allows for custom speed independent on the regular speed.
                  //
                  reach: function(e, target, speed){
                    if (target == get(_frame_)) return;
                    var
                      frames= get(_frames_),
                      row= set(_row_, ceil(target / frames)),
                      departure= set(_departure_, get(_frame_)),
                      target= set(_destination_, target),
                      shortest = set(_distance_, reel.math.distance(departure, target, frames)),
                      speed= abs(speed || get(_speed_)) * negative_when(1, shortest < 0)
                    t.trigger('play', speed);
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
                  //
                  // ### `down` Event ######
                  // `Event`, since 1.1
                  //
                  // Marks the very beginning of touch or mouse interaction. It receives `x` and `y`
                  // coordinates in arguments.
                  //
                  // - It calibrates the center point (origin),
                  // - considers user active not idle,
                  // - flags the `<html>` tag with `.reel-panning` class name
                  // - and binds dragging events for move and lift. These
                  // are usually bound to the pool (document itself) to get a consistent treating regardless
                  // the event target element. However in click-free mode, it binds directly to the instance.
                  //
                  down: function(e, x, y, ev){
                    if (!opt.clickfree && ev && ev.button !== undefined && ev.button != DRAG_BUTTON) return;
                    if (opt.draggable){
                      var
                        clicked= set(_clicked_, get(_frame_)),
                        clickfree= opt.clickfree,
                        velocity= set(_velocity_, 0),
                        $area= clickfree ? get(_area_) : pools,
                        origin= last= recenter_mouse(get(_revolution_), x, y)
                      unidle();
                      no_bias();
                      panned= 0;
                      $(_html_, pools).addClass(panning_klass);
                      $area
                        .bind(_touchmove_+___+_mousemove_, drag)
                        .bind(_touchend_+___+_touchcancel_, lift)
                        .bind(clickfree ? _mouseleave_ : _mouseup_, lift)
                    }
                    function drag(e){ return t.trigger('pan', [pointer(e).clientX, pointer(e).clientY, e]) && e.give }
                    function lift(e){ return t.trigger('up', [e]) && e.give }
                  },

                  // ### `up` Event ######
                  // `Event`, since 1.1
                  //
                  // This marks the termination of user's interaction. She either released the mouse button
                  // or lift the finger of the touch screen. This event handler:
                  //
                  // - calculates the velocity of the drag at that very moment,
                  // - removes the `.reel-panning` class from `<body>`
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
                  // in response and similar to the `"down"` Event it receives `x` and `y` coordinates
                  // in arguments and in addition it is passed a reference to the original browser event.
                  // This handler:
                  //
                  // - syncs with timer to achieve good performance,
                  // - calculates the distance from drag center and applies graph on it to get `fraction`,
                  // - recenters the drag when dragged over limits,
                  // - detects the direction of the motion
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
                        scrollable= !get(_reeling_) && rows <= 1 && !orbital && opt.scrollable,
                        delta= { x: x - last.x, y: y - last.y },
                        abs_delta= { x: abs(delta.x), y: abs(delta.y) }
                      if (ev && scrollable && abs_delta.x < abs_delta.y) return ev.give = true;
                      if (abs_delta.x > 0 || abs_delta.y > 0){
                        ev && (ev.give = false);
                        panned= max(abs_delta.x, abs_delta.y);
                        last= { x: x, y: y };
                        var
                          revolution= get(_revolution_),
                          origin= get(_clicked_location_),
                          vertical= get(_vertical_)
                        if (!get(_framelock_)) var
                          fraction= set(_fraction_, graph(vertical ? y - origin.y : x - origin.x, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_), vertical ? y - origin.y : x - origin.x)),
                          reeling= set(_reeling_, get(_reeling_) || get(_frame_) != get(_clicked_)),
                          motion= to_bias(vertical ? delta.y : delta.x || 0),
                          backwards= motion && set(_backwards_, motion < 0)
                        if (orbital && get(_center_)) var
                          vertical= set(_vertical_, abs(y - origin.y) > abs(x - origin.x)),
                          origin= recenter_mouse(revolution, x, y)
                        if (rows > 1 && !get(_rowlock_)) var
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
                  // plug-in][2] by Three Dub Media instead. Either way `"wheel"` Event handler receives
                  // the positive or negative wheeled distance in arguments. This event:
                  //
                  // - calculates wheel input delta and adjusts the `fraction` using the graph,
                  // - recenters the "drag" each and every time,
                  // - detects motion direction
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

                  // ### `orient` Event ######
                  // [NEW] `Event`, since 1.3
                  //
                  // Maps Reel to device orientation event which is provided by some touch enabled devices
                  // with gyroscope inside. Event handler receives all three device orientation angles 
                  // in arguments. This event:
                  //
                  // - maps alpha angle directly to `fraction`
                  //
                  orient: function(e, alpha, beta, gamma, ev){
                    if (!slidable || operated) return;
                    oriented= true;
                    var
                      alpha_fraction= alpha / 360
                      fraction= set(_fraction_, +((opt.stitched || opt.cw ? 1 - alpha_fraction : alpha_fraction)).toFixed(2))
                    slidable = false;
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
                  //
                  // _**Example:** Change Reel's current `frame`:_
                  //
                  //     .reel("frame", 15)
                  //
                  // Change events always receive the actual data key value in the third argument.
                  //
                  // _**Example:** Log each viewed frame number into the developers console:_
                  //
                  //     .bind("frameChange", function(e, d, frame){
                  //         console.log(frame)
                  //     })
                  //
                  // ---

                  // ### `fractionChange` Event ######
                  // `Event`, since 1.0
                  //
                  // Internally Reel doesn't really work with the frames you set it up with. It uses
                  // __fraction__, which is a numeric value ranging from 0.0 to 1.0. When `fraction` changes
                  // this handler basically calculates and sets new value of `frame`.
                  //
                  fractionChange: function(e, nil, fraction){
                    if (nil !== undefined) return;
                    var
                      frame= 1 + floor(fraction / get(_bit_)),
                      multirow= opt.rows > 1,
                      orbital= opt.orbital,
                      center= set(_center_, !!orbital && (frame <= orbital || frame >= get(_footage_) - orbital + 2))
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
                  tierChange: function(e, nil, tier){
                    if (nil === undefined) var
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
                  rowChange: function(e, nil, row){
                    if (nil === undefined) var
                      tier= may_set(_tier_, undefined, row, opt.rows)
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
                  // - for sequences, it switches the `<img>`'s `src` to the right frame
                  // - and for sprites it recalculates sprite's 'background position shift and applies it.
                  //
                  frameChange: function(e, nil, frame){
                    if (nil !== undefined) return;
                    this.className= this.className.replace(reel.re.frame_klass, frame_klass + frame);
                    var
                      frames= get(_frames_),
                      rows= opt.rows,
                      path= opt.path,
                      base= frame % frames || frames,
                      frame_row= (frame - base) / frames + 1,
                      frame_tier= (frame_row - 1) / (rows - 1),
                      row= get(_row_),
                      tier= !rows ? get(_tier_) : may_set(_tier_, frame_tier, row, rows),
                      fraction= may_set(_fraction_, undefined, base, frames),
                      footage= get(_footage_)
                    if (opt.orbital && get(_vertical_)) var
                      frame= opt.inversed ? footage + 1 - frame : frame,
                      frame= frame + footage
                    var
                      stitched= get(_stitched_),
                      images= get(_images_),
                      is_sprite= !images.length || stitched
                    if (!is_sprite){
                      get(_responsive_) && gauge();
                      get(_preloaded_) && t.attr({ src: reen(reel.substitute(path + images[frame - 1], get)) });
                    }else{
                      var
                        spacing= get(_spacing_),
                        width= get(_width_),
                        height= get(_height_)
                      if (!stitched) var
                        horizontal= opt.horizontal,
                        minor= (frame % footage) - 1,
                        minor= minor < 0 ? footage - 1 : minor,
                        major= floor((frame - 0.1) / footage),
                        major= major + (rows > 1 ? 0 : (get(_backwards_) ? 0 : !opt.directional ? 0 : get(_rows_))),
                        a= major * ((horizontal ? height : width) + spacing),
                        b= minor * ((horizontal ? width : height) + spacing),
                        shift= images.length ? [0, 0] : horizontal ? [px(-b), px(-a)] : [px(-a), px(-b)]
                      else{
                        var
                          x= set(_stitched_shift_, round(interpolate(fraction, 0, get(_stitched_travel_))) % stitched),
                          y= rows <= 1 ? 0 : (height + spacing) * (rows - row),
                          shift= [px(-x), px(-y)],
                          image= images.length > 1 && images[row - 1],
                          fullpath= reel.substitute(path + image, get)
                        image && t.css('backgroundImage').search(fullpath) < 0 && t.css({ backgroundImage: url(fullpath) })
                      }
                      t.css({ backgroundPosition: shift.join(___) })
                    }
                  },

                  // This extra binding takes care of watching frame position while animating the `"reach"` event.
                  //
                  'frameChange.reach': function(e, nil, frame){
                    if (!get(_destination_) || nil !== undefined) return;
                    var
                      travelled= reel.math.distance(get(_departure_), frame, get(_frames_)),
                      onorover= abs(travelled) >= abs(get(_distance_))
                    if (!onorover) return;
                    set(_frame_, set(_destination_));
                    set(_destination_, set(_distance_, set(_departure_, 0)));
                    t.trigger('stop');
                  },

                  // ~~~
                  //
                  // When `image` or `images` is changed on the fly, this handler resets the loading cache and triggers
                  // new preload sequence. Images are actually switched only after the new image is fully loaded.
                  //
                  'imageChange imagesChange': function(e, nil, image){
                    t.trigger('preload');
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
                  'fractionChange.indicator': function(e, nil, fraction){
                    if (opt.indicator && nil === undefined) var
                      size= opt.indicator,
                      orbital= opt.orbital,
                      travel= orbital && get(_vertical_) ? get(_height_) : get(_width_),
                      slots= orbital ? get(_footage_) : opt.images.length || get(_frames_),
                      weight= ceil(travel / slots),
                      travel= travel - weight,
                      indicate= round(interpolate(fraction, 0, travel)),
                      indicate= !opt.cw || get(_stitched_) ? indicate : travel - indicate,
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
                  'tierChange.indicator': function(e, nil, tier){
                    if (opt.rows > 1 && opt.indicator && nil === undefined) var
                      travel= get(_height_),
                      size= opt.indicator,
                      weight= ceil(travel / opt.rows),
                      travel= travel - weight,
                      indicate= round(tier * travel),
                      $yindicator= indicator.$y.css({ left: 0, top: indicate, width: size, height: weight })
                  },

                  // Indicators are bound to `fraction` or `row` changes, meaning they alone can consume
                  // more CPU resources than the entire Reel scene. Use them for development only.
                  //

                  // -----------
                  // Annotations
                  // -----------
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
                      $overlay= t.parent()
                    $.each(get(_annotations_), function(ida, note){
                      var
                        $note= typeof note.node == _string_ ? $(note.node) : note.node || {},
                        $note= $note.jquery ? $note : $(tag(_div_), $note),
                        $note= $note.attr({ id: ida }).addClass(annotation_klass),
                        $image= note.image ? $(tag(_img_), note.image) : $(),
                        $link= note.link ? $(tag('a'), note.link).click(function(){ t.trigger('up.annotations', { target: $link }); }) : $()
                      css(hash(ida), { display: _none_, position: _absolute_ }, true);
                      note.image || note.link && $note.append($link);
                      note.link || note.image && $note.append($image);
                      note.link && note.image && $note.append($link.append($image));
                      $note.appendTo($overlay);
                    });
                  },
                  'prepare.annotations': function(e){
                    $.each(get(_annotations_), function(ida, note){
                      $(hash(ida)).hide();
                    });
                  },
                  'frameChange.annotations': function(e, nil, frame){
                    if (!get(_preloaded_) || nil !== undefined) return;
                    var
                      width= get(_width_),
                      stitched= get(_stitched_),
                      ss= get(_stitched_shift_)
                    $.each(get(_annotations_), function(ida, note){
                      var
                        $note= $(hash(ida)),
                        start= note.start || 1,
                        end= note.end,
                        frame= frame || get(_frame_),
                        offset= frame - 1,
                        at= note.at ? (note.at[offset] == '+') : false,
                        offset= note.at ? offset : offset - start + 1,
                        x= typeof note.x!=_object_ ? note.x : note.x[offset],
                        y= typeof note.y!=_object_ ? note.y : note.y[offset],
                        placed= x !== undefined && y !== undefined,
                        visible= placed && (note.at ? at : (offset >= 0 && (!end || offset <= end - start)))
                      if (stitched) var
                        on_edge= x < width && ss > stitched - width,
                        after_edge= x > stitched - width && ss >= 0 && ss < width,
                        x= !on_edge ? x : x + stitched,
                        x= !after_edge ? x : x - stitched,
                        x= x - ss
                      if (get(_responsive_)) var
                        ratio= get(_ratio_),
                        x= x && x * ratio,
                        y= y && y * ratio
                      var
                        style= { display: visible ? _block_:_none_, left: px(x), top: px(y) }
                      $note.css(style);
                    });
                  },
                  'up.annotations': function(e, ev){
                    if (panned > 10 || wheeled) return;
                    var
                      $target= $(ev.target),
                      $link= ($target.is('a') ? $target : $target.parents('a')),
                      href= $link.attr('href')
                    href && (panned= 10);
                  },

                  // ---------------------
                  // Click Stepping Events
                  // ---------------------
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
                    t.trigger(get(_clicked_location_).x - t.offset().left > 0.5 * get(_width_) ? 'stepRight' : 'stepLeft')
                  },
                  'stepLeft stepRight': function(e){
                    unidle();
                  },

                  // ### `stepLeft` Event ######
                  // `Event`, since 1.2
                  //
                  stepLeft: function(e){
                    set(_backwards_, false);
                    set(_fraction_, get(_fraction_) - get(_bit_) * get(_cwish_));
                  },

                  // ### `stepRight` Event ######
                  // `Event`, since 1.2
                  //
                  stepRight: function(e){
                    set(_backwards_, true);
                    set(_fraction_, get(_fraction_) + get(_bit_) * get(_cwish_));
                  },

                  // ### `stepUp` Event ######
                  // [NEW] `Event`, since 1.3
                  //
                  stepUp: function(e){
                    set(_row_, get(_row_) - 1);
                  },

                  // ### `stepDown` Event ######
                  // [NEW] `Event`, since 1.3
                  //
                  stepDown: function(e){
                    set(_row_, get(_row_) + 1);
                  },

                  // -----------------------
                  // [NEW] Responsive Events
                  // -----------------------
                  //
                  // In responsive mode in case of parent's size change, in addition to actual recalculations,
                  // the instance starts to emit throttled `resize` events. This handler in turn emulates
                  // images changes event leading to reload of frames.
                  //
                  // ---
                  //
                  // ### `resize` Event ######
                  // [NEW] `Event`, since 1.3
                  //
                  resize: function(e, force){
                    if (get(_loading_) && !force) return;
                    var
                      stitched= get(_stitched_),
                      spacing= get(_spacing_),
                      height= get(_height_),
                      is_sprite= !get(_images_).length || stitched,
                      rows= opt.rows || 1,
                      size= get(_images_).length
                        ? !stitched ? undefined : px(stitched)+___+px(height)
                        : stitched && px(stitched)+___+px((height + spacing) * rows - spacing)
                        || px((get(_width_) + spacing) * get(_footage_) - spacing)+___+px((height + spacing) * get(_rows_) * rows * (opt.directional? 2:1) - spacing)
                    t.css({
                      height: is_sprite ? px(height) : null,
                      backgroundSize: size || null
                    });
                    force || t.trigger('imagesChange');
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
                      frame= set(_frame_, opt.frame + (get(_row_) - 1) * get(_frames_))
                    t.trigger('preload')
                  },
                  'wheel.fu': function(){ wheeled= false },
                  'clean.fu': function(){ t.trigger('teardown') },
                  'loaded.fu': function(){ t.trigger('opening') }
                },

                // -------------
                // Tick Handlers
                // -------------
                //
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
                    if (!(loaded || get(_loading_)) || get(_shy_)) return;
                    var
                      width= get(_width_),
                      current= number(preloader.$.css(_width_)),
                      images= get(_images_).length || 1,
                      target= round(1 / images * get(_preloaded_) * width)
                    preloader.$.css({ width: current + (target - current) / 3 + 1 })
                    if (get(_preloaded_) === images && current > width - 1){
                      loaded= false;
                      preloader.$.fadeOut(300, function(){ preloader.$.css({ opacity: 1, width: 0 }) });
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
                    if (get(_shy_)) return;
                    var
                      velocity= get(_velocity_),
                      leader_tempo= leader(_tempo_),
                      monitor= opt.monitor
                    if (!reel.intense && offscreen()) return;
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
                      ticks= get(_ticks_),
                      step= (!get(_playing_) || oriented || !ticks ? velocity : abs(get(_speed_)) + velocity) / leader(_tempo_),
                      fraction= set(_fraction_, get(_fraction_) - step * direction),
                      ticks= !opt.duration ? ticks : ticks > 0 && set(_ticks_, ticks - 1)
                    !ticks && get(_playing_) && t.trigger('stop');
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

              loaded= false,

              // ------------------------
              // Instance Private Helpers
              // ------------------------
              //
              // - Events propagation stopper / muter
              //
              mute= function(e, result){ return e.stopImmediatePropagation() || result },

              // - Shy initialization helper
              //
              shy_setup= function(){ t.trigger('setup') },

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
              panned= 0,
              wheeled= false,
              oriented= false,

              // - Constructors of UI elements
              //
              $monitor= $(),
              preloader= function(){
                css(___+dot(preloader_klass), {
                  position: _absolute_,
                  left: 0, bottom: 0,
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

              // - Off screen detection (vertical only for performance)
              //
              offscreen= function(){
                var
                  height= get(_height_),
                  width= get(_width_),
                  rect= t[0].getBoundingClientRect()
                return rect.top < -height
                    || rect.left < -width
                    || rect.right > width + $(window).width()
                    || rect.bottom > height + $(window).height()
              },

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

              // - Response to the size changes in responsive mode
              //
              slow_gauge= function(){
                clearTimeout(gauge_delay);
                gauge_delay= setTimeout(gauge, reel.resize_gauge);
              },
              gauge= function(){
                if (t.width() == get(_width_)) return;
                var
                  truescale= get(_truescale_),
                  ratio= set(_ratio_, t.width() / truescale.width)
                $.each(truescale, function(key, value){ set(key, round(value * ratio)) })
                t.trigger('resize');
              },

              // - Delay timer pointers
              //
              delay, // openingDone's delayed play
              gauge_delay, // slow_gauge's throttle

              // - Interaction graph's zero point reset
              //
              recenter_mouse= function(revolution, x, y){
                var
                  fraction= set(_clicked_on_, get(_fraction_)),
                  tier= set(_clicked_tier_, get(_tier_)),
                  loops= opt.loops,
                  lo= set(_lo_, loops ? 0 : - fraction * revolution),
                  hi= set(_hi_, loops ? revolution : revolution - fraction * revolution)
                return x !== undefined && set(_clicked_location_, { x: x, y: y }) || undefined
              },
              slidable= true,

              // ~~~
              //
              // Data interface used to set `fraction` and `tier` with the value recalculated through their
              // _cousin_ keys (`frame` for `fraction` and `row` for `tier`). This value is actually set
              // only if it does make a difference in the cousin value.
              //
              may_set= function(key, value, cousin, maximum){
                if (!maximum) return;
                var
                  current= get(key) || 0,
                  recalculated= value !== undefined ? value : (cousin - 1) / (maximum - 1),
                  recalculated= key != _fraction_ ? recalculated : min( recalculated, 0.9999),
                  worthy= +abs(current - recalculated).toFixed(8) >= +(1 / (maximum - 1)).toFixed(8),
                  value= worthy ? set(key, recalculated) : value || current
                return value
              },

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
          }
        },

        // -----------
        // Destruction
        // -----------
        //
        // The evil-twin of `.reel()`. Tears down and wipes off entire instance.
        //
        // ---

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
      // ---

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
        /* Array in a string (comma-separated values) */
        array:         / *, */,
        /* Lazy (low-CPU mobile devices) */
        lazy_agent:    /\(iphone|ipod|android|fennec|blackberry/i,
        /* Format of frame class flag on the instance */
        frame_klass:   /frame-\d+/,
        /* Mask for substitutions in URL */
        substitution:  /(@([A-Z]))/g,
        /* Used for cross-browser detection of Regexp no match situation */
        no_match:      /^(undefined|)$/,
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
      // ---

      // ### `$.reel.cdn` ######
      // `String` (URL path), since 1.1
      //
      cdn: 'http://code.vostrel.net/',

      // -----------
      // Math Behind
      // -----------
      //
      // Surprisingly there's very little math behind Reel. Two equations (graph functions), which
      // drive Reel motion and receive the same set of options.
      //
      // ---

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

        // Plus equation for interpolating `fraction` (and `tier`) value into `frame` and `row`.
        //
        interpolate: function(fraction, lo, hi){
          return lo + fraction * (hi - lo)
        },

        // And one for calculation of the shortest frame distance from start to the end.
        // 
        distance: function(start, end, total){
          var
            half= total / 2,
            d= end - start
          return d < -half ? d + total : d > half ? d - total : d
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
      //
      // ---

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
            frames= orbital ? get(_footage_) : get(_frames_),
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

        // You can opt for a `linear` loading order too, but that has a drawback of leaving large gap
        // of unloaded frames.
        //
        linear: function(sequence, opt, get){
          return sequence
        }
      },

      // -------------------------
      // [NEW] Data Values in URLs
      // -------------------------
      //
      // Reel will process each and every image resource URL and substitute special markup
      // with actual values from the data store. Marks made of `@` character followed by upper case
      // letter will be substituted with values either directly from data store (`@W` and `@H`
      // for `width` and `height`) or calculated (`@T` is substituted with momentary timestamp
      // in milliseconds).
      // Markup can appear anywhere in the folder name, file name or the query params
      // (also in [`path`](#path-Option)) and even multiple times.
      //
      // Comes handy in product configurators
      // and works magic in conjunction with [responsive](#responsive-Option) option.
      //
      // _**Example:** Following URLs:_
      //
      //     image.jpg?size=@Wx@H
      //     pic/@W/@H/rabbit.png
      //     image.php?nocache=@T
      //
      // _... will come out like this for Reel 320 pixels wide and 180 high:_
      //
      //     image.jpg?size=320x180
      //     pic/320/180/rabbit.png
      //     image.php?nocache=1377604502788
      //
      // ---

      // ### `$.reel.substitute()` ######
      // [NEW] `Function`, since 1.3
      //
      substitute: function(uri, get){
        return uri.replace(reel.re.substitution, function(match, mark, key){
          return typeof reel.substitutes[key] == 'function'
                      ? reel.substitutes[key](get) : substitution_keys[key]
                      ? get(substitution_keys[key]) : mark;
        });
      },
      // ### `$.reel.substitutes` ######
      // [NEW] `Object` of `Function`s, since 1.3
      //
      substitutes: {
        T: function(get){ return +new Date() }
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
      // ---

      // ### `$.reel.normal` ######
      // `Object`, since 1.2
      //
      normal: {
        fraction: function(fraction, data){
          if (fraction === null) return fraction;
          return data[_options_].loops ? fraction - floor(fraction) : min_max(0, 1, fraction)
        },
        tier: function(tier, data){
          if (tier === null) return tier;
          return min_max(0, 1, tier)
        },
        row: function(row, data){
          if (row === null) return row;
          return round(min_max(1, data[_options_].rows, row))
        },
        frame: function(frame, data){
          if (frame === null) return frame;
          var
            opt= data[_options_],
            frames= data[_frames_] * (opt.orbital ? 2 : opt.rows || 1),
            result= round(opt.loops ? frame % frames || frames : min_max(1, frames, frame))
          return result < 0 ? result + frames : result
        },
        images: function(images, data){
          var
            sequence= reel.re.sequence.exec(images),
            result= !sequence ? images : reel.sequence(sequence, data[_options_])
          return result;
        }
      },

      // -----------------
      // Sequence Build-up
      // -----------------
      //
      // When configured with a String value for [`images`](#images-Option) like `image##.jpg`, it first has
      // to be converted into an actual Array by engaging the counter placeholder.
      //
      // ---

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
          start= sequence[4],
          start= reel.re.no_match.test(start+__) ? 1 : +start,
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
      //
      // ---

      // ### `$.reel.instances` ######
      // `jQuery`, since 1.1
      //
      instances: $(),

      // For ticker-synchronization-related purposes Reel maintains a reference to the leaders data object
      // all the time.
      //
      // ---

      // ### `$.reel.leader` ######
      // `Object` (DOM data), since 1.1
      //
      leader: leader,

      // `$.reel.resize_gauge` specifies a throttling interval for triggering of `resize` events,
      // in milliseconds.
      //
      // ---

      // ### `$.reel.resize_gauge` ######
      // [NEW] `Number`, since 1.3
      //
      resize_gauge: 300,
      
      // `$.reel.concurrent_requests` specifies how many preloading requests will run simultaneously.
      //
      // ---

      // ### `$.reel.concurrent_requests` ######
      // [NEW] `Number`, since 1.3
      //
      concurrent_requests: 4,
      
      // `$.reel.cost` holds document-wide costs in miliseconds of running all Reel instances. It is used
      // to adjust actual timeout of the ticker.
      //
      // ---

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
    knows_background_size= !(ie && browser_version < 9),
    ticker,

    // ---------------
    // CSS Class Names
    // ---------------
    //
    // These are all the class names assigned by Reel to various DOM elements during initialization of the UI
    // and they all share same base `"reel"`, which in isolation also is the class of the `<img>` node you
    // converted into Reel.
    //
    klass= 'reel',

    // Rest of the class names only extend this base class forming for example `.reel-overlay`, a class
    // assigned to the outter instance wrapper (`<img>`'s injected parent).
    //
    overlay_klass= klass + '-overlay',
    cache_klass= klass + '-cache',
    indicator_klass= klass + '-indicator',
    preloader_klass= klass + '-preloader',
    monitor_klass= klass + '-monitor',
    annotation_klass= klass + '-annotation',
    panning_klass= klass + '-panning',
    loading_klass= klass + '-loading',

    // The instance wrapper is flagged with actual frame number using a this class.
    //
    // _**Example:** Reel on frame 10 will carry a class name `frame-10`._
    //
    frame_klass= 'frame-',

    // --------------------------------
    // Shortcuts And Minification Cache
    // --------------------------------
    //
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
    _annotations_= 'annotations', _area_= 'area', _auto_= 'auto',
    _backup_= 'backup', _backwards_= 'backwards', _bit_= 'bit', _brake_= 'brake',
    _cache_= 'cache', _cached_=_cache_+'d', _center_= 'center', _class_= 'class', _click_= 'click',
    _clicked_= _click_+'ed', _clicked_location_= _clicked_+'_location', _clicked_on_= _clicked_+'_on',
    _clicked_tier_= _clicked_+'_tier', _cwish_= 'cwish',
    _departure_= 'departure', _destination_= 'destination', _distance_= 'distance',
    _footage_= 'footage', _fraction_= 'fraction', _frame_= 'frame', _framelock_= 'framelock', _frames_= 'frames',
    _height_= 'height', _hi_= 'hi', _hidden_= 'hidden',
    _image_= 'image', _images_= 'images',
    _lo_= 'lo', _loading_= 'loading',
    _mouse_= 'mouse',
    _opening_= 'opening', _opening_ticks_= _opening_+'_ticks', _options_= 'options',
    _playing_= 'playing', _preloaded_= 'preloaded',
    _ratio_= 'ratio', _reeling_= 'reeling', _reeled_= 'reeled', _responsive_= 'responsive', _revolution_= 'revolution',
    _revolution_y_= 'revolution_y', _row_= 'row', _rowlock_= 'rowlock', _rows_= 'rows',
    _shy_= 'shy', _spacing_= 'spacing', _speed_= 'speed', _src_= 'src', _stage_= 'stage', _stitched_= 'stitched',
    _stitched_shift_= _stitched_+'_shift', _stitched_travel_= _stitched_+'_travel', _stopped_= 'stopped',
    _style_= 'style',
    _tempo_= 'tempo', _ticks_= 'ticks', _tier_= 'tier', _touch_= 'touch', _truescale_= 'truescale',
    _velocity_= 'velocity', _vertical_= 'vertical',
    _width_= 'width',

    // And the same goes for browser events too.
    //
    ns= dot(klass),
    pns= dot('pan') + ns,
    _deviceorientation_= 'deviceorientation'+ns, _dragstart_= 'dragstart'+ns,
    _mousedown_= _mouse_+'down'+ns, _mouseenter_= _mouse_+'enter'+ns, _mouseleave_= _mouse_+'leave'+pns,
    _mousemove_= _mouse_+'move'+pns, _mouseup_= _mouse_+'up'+pns, _mousewheel_= _mouse_+'wheel'+ns,
    _tick_= 'tick'+ns, _touchcancel_= _touch_+'cancel'+pns, _touchend_= _touch_+'end'+pns,
    _touchstart_= _touch_+'start'+ns, _touchmove_= _touch_+'move'+pns,
    _resize_= 'resize'+ns,

    // And some other frequently used Strings.
    //
    __= '', ___= ' ', ____=',', _absolute_= 'absolute', _block_= 'block', _cdn_= '@CDN@', _div_= 'div',
    _hand_= 'hand', _head_= 'head', _html_= 'html', _id_= 'id',
    _img_= 'img', _jquery_reel_= 'jquery.'+klass, _move_= 'move', _none_= 'none', _object_= 'object',
    _preload_= 'preload', _string_= 'string',

    // Collection of data keys holding scalable pixel values responsive to the scale ratio
    // 
    responsive_keys= [_width_, _height_, _spacing_, _revolution_, _revolution_y_, _stitched_, _stitched_shift_, _stitched_travel_],
    substitution_keys= { W: _width_, H: _height_ },

    // ---------------
    // Image Resources
    // ---------------
    //
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
    // We then only route around MSIE's left button identification quirk (IE 8- reports left as right).
    //
    lazy= reel.lazy= (reel.re.lazy_agent).test(client),

    DRAG_BUTTON= ie && browser_version < 9 ? 1 : 0,

    // ~~~
    //
    // So far jQuery doesn't have a proper built-in mechanism to detect/report DOM node removal.
    // But internally, jQuery calls `$.cleanData()` to flush the DOM data and minimize memory leaks.
    // Reel wraps this function and as a result `clean` event handler is triggered for every element.
    // Note, that the `clean` event does not bubble.
    //
    cleanData= $.cleanData,
    cleanDataEvent= $.cleanData= function(elements){
      $(elements).each(function(){ $(this).triggerHandler('clean'); });
      return cleanData.apply(this, arguments);
    }

  // Expose plugin functions as jQuery methods, do the initial global scan for data-configured
  // `<img`> tags to become enhanced and export the entire namespace module.
  //
  $.extend($.fn, reel.fn) && $(reel.scan);
  return reel;

  // Bunch of very useful helpers.
  //
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
  function pointer(e){ return e.touch || e.originalEvent.touches && e.originalEvent.touches[0] || e }
  function gyro(e){ return e.originalEvent }
  function px(value){ return value === undefined ? 0 : typeof value == _string_ ? value : value + 'px' }
  function hash(value){ return '#' + value }
  function pad(string, len, fill){ while (string.length < len) string= fill + string; return string }
  function twochar(string){ return pad(string, 2, '0') }
  function reen(uri){ return encodeURI(decodeURI(uri)) }
  function soft_array(string){ return reel.re.array.exec(string) ? string.split(reel.re.array) : string }
  function detached($node){ return !$node.parents(_html_).length }
  function numerize_array(array){ return typeof array == _string_ ? array : $.each(array, function(ix, it){ array[ix]= it ? +it : undefined }) }
  function error(message){ try{ console.error('[ Reel ] '+message) }catch(e){} }
})(jQuery, window, document);

});
