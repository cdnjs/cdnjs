/**
@license jQuery Toggles v2.0.4
Copyright 2013 Simon Tabor - MIT License
https://github.com/simontabor/jquery-toggles / http://simontabor.com/labs/toggles
*/
$.fn['toggles'] = function(options) {
  options = options || {};

  // extend default opts with the users options
  var opts = $.extend({
    'drag': true, // can the toggle be dragged
    'click': true, // can it be clicked to toggle
    'text': {
      'on': 'ON', // text for the ON position
      'off': 'OFF' // and off
    },
    'on': false, // is the toggle ON on init
    'animate': 250, // animation time
    'transition': 'ease-in-out', // animation transition,
    'checkbox': null, // the checkbox to toggle (for use in forms)
    'clicker': null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
    'width': 50, // width used if not set in css
    'height': 20, // height if not set in css
    'type': 'compact' // defaults to a compact toggle, other option is 'select' where both options are shown at once
  },options);

  var selectType = (opts['type'] == 'select');

  // ensure these are jquery elements
  opts['checkbox'] = $(opts['checkbox']); // doesnt matter for checkbox

  if (opts['clicker']) opts['clicker'] = $(opts['clicker']); // leave as null if not set

  // use native transitions if possible
  var transition = 'margin-left '+opts['animate']+'ms '+opts['transition'];
  var transitions = {
    '-webkit-transition': transition,
    '-moz-transition': transition,
    'transition': transition
  };

  // for resetting transitions to none
  var notransitions = {
    '-webkit-transition': '',
    '-moz-transition': '',
    'transition': ''
  };

  // this is the actual toggle function which does the toggling
  var doToggle = function(slide, width, height, state) {
    var active = slide.toggleClass('active').hasClass('active');

    if (state === active) return;

    var inner = slide.find('.toggle-inner').css(transitions);

    slide.find('.toggle-off').toggleClass('active');
    slide.find('.toggle-on').toggleClass('active');

    // toggle the checkbox, if there is one
    opts['checkbox'].prop('checked',active);

    if (selectType) return;

    var margin = active ? 0 : -width + height;

    // move the toggle!
    inner.css('margin-left',margin);

    // ensure the toggle is left in the correct state after animation
    setTimeout(function() {
      inner.css(notransitions);
      inner.css('margin-left',margin);
    },opts['animate']);

  };

  // start setting up the toggle(s)
  return this.each(function() {
    var toggle = $(this);

    var height = toggle.height();
    var width = toggle.width();

    // if the element doesnt have an explicit height/width in css, set them
    if (!height || !width) {
      toggle.height(height = opts.height);
      toggle.width(width = opts.width);
    }

    var div = '<div class="toggle-';
    var slide = $(div+'slide">'); // wrapper inside toggle
    var inner = $(div+'inner">'); // inside slide, this bit moves
    var on = $(div+'on">'); // the on div
    var off = $(div+'off">'); // off div
    var blob = $(div+'blob">'); // the grip toggle blob

    var halfheight = height/2;
    var onoffwidth = width - halfheight;

    // set up the CSS for the individual elements
    on
      .css({
        height: height,
        width: onoffwidth,
        textAlign: 'center',
        textIndent: selectType ? '' : -halfheight,
        lineHeight: height+'px'
      })
      .html(opts['text']['on']);

    off
      .css({
        height: height,
        width: onoffwidth,
        marginLeft: selectType ? '' : -halfheight,
        textAlign: 'center',
        textIndent: selectType ? '' : halfheight,
        lineHeight: height+'px'
      })
      .html(opts['text']['off'])
      .addClass('active');

    blob.css({
      height: height,
      width: height,
      marginLeft: -halfheight
    });

    inner.css({
      width: width * 2 - height,
      marginLeft: selectType ? 0 : -width + height
    });

    if (selectType) {
      slide.addClass('toggle-select');
      toggle.css('width', onoffwidth*2);
      blob.hide();
    }

    // construct the toggle
    toggle.html(slide.html(inner.append(on,blob,off)));

    // when toggle is fired, toggle the toggle
    slide.on('toggle', function(e,active) {

      // stop bubbling
      if (e) e.stopPropagation();

      doToggle(slide,width,height);
      toggle.trigger('toggle',!active);
    });

    // setup events for toggling on or off
    toggle.on('toggleOn', function() {
      doToggle(slide, width, height, false);
    });
    toggle.on('toggleOff', function() {
      doToggle(slide, width, height, true);
    });

    if (opts['on']) {

      // toggle immediately to turn the toggle on
      doToggle(slide,width,height);
    }

    // if click is enabled and toggle isn't within the clicker element (stops double binding)
    if (opts['click'] && (!opts['clicker'] || !opts['clicker'].has(toggle).length)) {

      // bind the click, ensuring its not the blob being clicked on
      toggle.on('click',function(e) {
        if (e.target !=  blob[0] || !opts['drag']) {
          slide.trigger('toggle', slide.hasClass('active'));
        }
      });
    }

    // setup the clicker element
    if (opts['clicker']) {
      opts['clicker'].on('click',function(e) {
        if (e.target !=  blob[0] || !opts['drag']) {
          slide.trigger('toggle', slide.hasClass('active'));
        }
      });
    }

    // we're done with all the non dragging stuff
    if (!opts['drag'] || selectType) return;

    // time to begin the dragging parts/blob clicks
    var diff;
    var slideLimit = (width - height) / 4;

    // fired on mouseup and mouseleave events
    var upLeave = function(e) {
      toggle.off('mousemove');
      slide.off('mouseleave');
      blob.off('mouseup');

      var active = slide.hasClass('active');

      if (!diff && opts.click && e.type !== 'mouseleave') {

        // theres no diff so nothing has moved. only toggle if its a mouseup
        slide.trigger('toggle', active);
        return;
      }

      if (active) {

        // if the movement enough to toggle?
        if (diff < -slideLimit) {
          slide.trigger('toggle',active);
        } else {

          // go back
          inner.animate({
            marginLeft: 0
          },opts.animate/2);
        }
      } else {

        // inactive
        if (diff > slideLimit) {
          slide.trigger('toggle',active);
        } else {

          // go back again
          inner.animate({
            marginLeft: -width + height
          },opts.animate/2);
        }
      }

    };

    var wh = -width + height;

    blob.on('mousedown', function(e) {

      // reset diff
      diff = 0;

      blob.off('mouseup');
      slide.off('mouseleave');
      var cursor = e.pageX;

      toggle.on('mousemove', blob, function(e) {
        diff = e.pageX - cursor;
        var marginLeft;
        if (slide.hasClass('active')) {

          marginLeft = diff;

          // keep it within the limits
          if (diff > 0) marginLeft = 0;
          if (diff < wh) marginLeft = wh;
        } else {

          marginLeft = diff + wh;

          if (diff < 0) marginLeft = wh;
          if (diff > -wh) marginLeft = 0;

        }

        inner.css('margin-left',marginLeft);
      });

      blob.on('mouseup', upLeave);
      slide.on('mouseleave', upLeave);
    });


  });

};
