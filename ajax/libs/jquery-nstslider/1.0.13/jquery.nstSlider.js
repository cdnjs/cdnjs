/*! Nestoria Slider - v1.0.13 - 2015-07-16
* http://lokku.github.io/jquery-nstslider/
* Copyright (c) 2015 Lokku Ltd.; Licensed MIT */
(function($) {
    /* 
     * These are used for user interaction. This plugin assumes the user can
     * interact with one control at a time. For this reason it's safe to keep
     * these global.
     */
    var _$current_slider;
    var _is_mousedown;
    var _original_mousex;

    // both for keyboard and mouse interaction
    var _is_left_grip;

    // for keyboard interaction only
    var _before_keydown_value;
    var _before_keydown_pixel;
    var _before_keyup_value;
    var _before_keyup_pixel;

    // a fixed configuration for the single bar slider, used to decide where to
    // place the naked bar.
    var _naked_bar_deltas; // see populateNakedBarDeltas

    var _methods = {
         /*
          * This method must be called once during initialization.
          * It sets the behaviour of the naked bar in case of one handle.
          */
         'setNakedBarDelta': function (position, handleWidth) {
             if (position === "stickToSides") {
                _naked_bar_deltas = {
                    toEndWidth: handleWidth,
                    toBeginLeft: 0,
                    toBeginWidth: handleWidth
                };
             }
             else if (position === "middle") {
                // Position naked end of the bar at the middle value.
                _naked_bar_deltas = {
                    toEndWidth: handleWidth/2,
                    toBeginLeft: handleWidth/2,
                    toBeginWidth: handleWidth/2
                };
             }
             else {
                throw new Error('unknown position of setNakedBarDelta: ' + position);
             }
         },
         'getSliderValuesAtPositionPx' : function (leftPx, rightPx) {
              var $this = this,
                  leftPxInValue, rightPxInValue,
                  pixel_to_value_mapping_func = $this.data('pixel_to_value_mapping');

              if (typeof pixel_to_value_mapping_func !== 'undefined') {
                  leftPxInValue = pixel_to_value_mapping_func(leftPx);
                  rightPxInValue = pixel_to_value_mapping_func(rightPx);
              }
              else {
                  var w = _methods.getSliderWidthPx.call($this) - $this.data('left_grip_width');
                  leftPxInValue = _methods.inverse_rangemap_0_to_n.call($this, leftPx, w);
                  rightPxInValue = _methods.inverse_rangemap_0_to_n.call($this, rightPx, w);
              }

              return [leftPxInValue, rightPxInValue];
         },
         /*
          *  Move slider grips to the specified position. This method is
          *  designed to run within the user interaction lifecycle. Only call
          *  this method if the user has interacted with the sliders
          *  actually...
          *
          *  First the desired positions are validated. If values are ok, the
          *  move is performed, otherwise it's just ignored because weird
          *  values have been passed.
          */
         'validateAndMoveGripsToPx' : function (nextLeftGripPositionPx, nextRightGripPositionPx) {
             var $this = this;

             var draggableAreaLengthPx = _methods.getSliderWidthPx.call($this) - $this.data('left_grip_width');

             //
             // Validate & Move
             //
             if (nextRightGripPositionPx <= draggableAreaLengthPx && 
                 nextLeftGripPositionPx >= 0 &&
                 nextLeftGripPositionPx <= draggableAreaLengthPx && 
                 (!$this.data('has_right_grip') || nextLeftGripPositionPx <= nextRightGripPositionPx) ) {

                 var prevMin = $this.data('cur_min'),                        
                     prevMax = $this.data('cur_max');       

                 // note: also stores new cur_min, cur_max
                 _methods.set_position_from_px.call($this, nextLeftGripPositionPx, nextRightGripPositionPx);

                 // set the style of the grips according to the highlighted range
                 _methods.refresh_grips_style.call($this);

                 _methods.notify_changed_implicit.call($this, 'drag_move', prevMin, prevMax);
             }

             return $this;
         },
         /*
          * Update aria attributes of the slider based on the current
          * configuration of the slider.
          */
         'updateAriaAttributes' : function () {
            var $this = this,
                settings = $this.data('settings'),
                $leftGrip = $this.find(settings.left_grip_selector);

            //
            // double grips sliders is probably the most common case...
            // ... also, the values to be set in the two cases are quite
            // different.
            //
            if ($this.data('has_right_grip')) {

                var $rightGrip = $this.find(settings.right_grip_selector);

                //
                // grips are mutually binding their max/min values when 2 grips
                // are present. For example, we should imagine the left grip as
                // being constrained between [ rangeMin, valueMax ]
                //
                $leftGrip
                    .attr('aria-valuemin', $this.data('range_min'))
                    .attr('aria-valuenow', methods.get_current_min_value.call($this))
                    .attr('aria-valuemax', methods.get_current_max_value.call($this));

                $rightGrip
                    .attr('aria-valuemin', methods.get_current_min_value.call($this))
                    .attr('aria-valuenow', methods.get_current_max_value.call($this))
                    .attr('aria-valuemax', $this.data('range_max'));
            }
            else {
                $leftGrip
                    .attr('aria-valuemin', $this.data('range_min'))
                    .attr('aria-valuenow', methods.get_current_min_value.call($this))
                    .attr('aria-valuemax', $this.data('range_max'));
            }

            return $this;
         },
         /*
          * Return the width in pixels of the slider bar, i.e., the maximum
          * number of pixels the user can slide the slider over. This function
          * should always be used internally to obtain the width of the
          * slider in pixels!
          */
         'getSliderWidthPx' : function () {
            var $this = this;

            //
            // .width() can actually return a floating point number! see
            // jquery docs!
            //
            return Math.round($this.width());
         },
         /*
          * Return the position of a given grip in pixel in integer format.
          * Use this method internally if you are literally going to get the
          * left CSS property from the provided grip.
          *
          * This method assumes a certain grip exists and will have the left
          * property.
          *
          * This is generally safe for the left grip, because it is basically
          * guaranteed to exist. But for the right grip you should be really
          * using getRightGripPositionPx instead.
          *
          */
         'getGripPositionPx' : function ($grip) {
            return parseInt($grip.css('left').replace('px',''), 10);
         },
         /*
          * Just the same as getGripPositionPx, but there is no need to provide
          * the $slider.
          */
         'getLeftGripPositionPx' : function () {
            var $this = this,
                settings = $this.data('settings'),
                $leftGrip = $this.find(settings.left_grip_selector);

            return _methods.getGripPositionPx.call($this, $leftGrip);
         },
         /*
          * Return the position of the right Grip if it exists or return the
          * current position if not. Even if the right grip doesn't exist, its
          * position should be defined, as it determines the position of the 
          * bar.
          */
         'getRightGripPositionPx' : function () {
            var $this = this,
                settings = $this.data('settings');

                if ($this.data('has_right_grip')) {
                    return _methods.getGripPositionPx.call($this,
                        $this.find(settings.right_grip_selector)
                    );
                }

                // default
                var sliderWidthPx = _methods.getSliderWidthPx.call($this) - $this.data('left_grip_width');
                return _methods.rangemap_0_to_n.call($this, $this.data('cur_max'), sliderWidthPx);
         },
         /*
          * Return the width of the left grip.  Like getSliderWidthPx, this
          * method deals with .width() returning a floating point number. All
          * the code in this plugin assumes an integer here!
          */
         'getLeftGripWidth' : function () {
            var $this = this,
                settings = $this.data('settings'),
                $leftGrip = $this.find(settings.left_grip_selector);

            return Math.round($leftGrip.outerWidth());
         },
         /*
          * Return the width of the right grip. The calling method should
          * check that the right grip actually exists. This method assumes it
          * does.
          */
         'getRightGripWidth' : function () {
            var $this = this,
                settings = $this.data('settings'),
                $rightGrip = $this.find(settings.right_grip_selector);

            return Math.round($rightGrip.outerWidth());
         },
         'binarySearchValueToPxCompareFunc' : function (s, a, i) {
            // Must return:
            //
            // s: element to search for
            // a: array we are looking in 
            // i: position of the element we are looking for
            //
            // -1 (s < a[i])
            // 0  found (= a[i])
            // 1  (s > a[i])
            if (s === a[i])          { return 0; }  // element found exactly
            if (s < a[i] && i === 0) { return 0; }  // left extreme case e.g., a = [ 3, ... ], s = 1
            if (a[i-1] <= s && s < a[i]) { return 0; } // s is between two elements, always return the rightmost
            if (s > a[i])           { return 1;  }
            if (s <= a[i-1])        { return -1; }
            $.error('cannot compare s: ' + s + ' with a[' + i + ']. a is: ' + a.join(','));
         },
         /*
          * Perform binary search to find searchElement into a generic array.
          * It uses a customized compareFunc to perform the comparison between
          * two elements of the array and a getElement function to pick the
          * element from the array (e.g., in case we want to pick a field of an
          * array of objects)
          */
         'binarySearch' : function(array, searchElement, getElementFunc, compareFunc) {
              var minIndex = 0;
              var maxIndex = array.length - 1;
              var currentIndex;
              var currentElement;

              while (minIndex <= maxIndex) {
                  currentIndex = (minIndex + maxIndex) / 2 | 0;
                  currentElement = getElementFunc(array, currentIndex);

                  // lt = -1 (searchElement < currentElement)
                  // eq = 0 
                  // gt = 1  (searchElement > currentElement)
                  var lt_eq_gt = compareFunc(searchElement, array, currentIndex);

                  if (lt_eq_gt > 0) {
                      minIndex = currentIndex + 1;
                  }
                  else if (lt_eq_gt < 0) {
                      maxIndex = currentIndex - 1;
                  }
                  else {
                      return currentIndex;
                  }
              }

              return -1;
        },
        /*
         * Returns true if this slider has limit, false otherwise. There can be
         * an upper limit and a lower limit for the sliders.
         * The lower/upper limits are values that are out of the slider range,
         * but that can be selected by the user when he moves a slider all the
         * way down the minimum and up to the maximum value.
         */
        'haveLimits' : function () {
            var $this = this,
                lowerLimit = $this.data('lower-limit'),
                upperLimit = $this.data('upper-limit'),
                haveLimits = false;

            if (typeof lowerLimit !== 'undefined' && 
                typeof upperLimit !== 'undefined') {
                
                haveLimits = true;
            }

            return haveLimits;
        },
        /*
         * This method is called whenever the style of the grips needs to get
         * updated.
         */
        'refresh_grips_style' : function () {
            var $this = this,
            settings = $this.data('settings');

            // Skip refreshing grips style if no hihglight is specified in
            // construction
            if (typeof settings.highlight === 'undefined') {
                return;
            }

            var highlightedRangeMin = $this.data('highlightedRangeMin');

            if (typeof highlightedRangeMin === 'undefined') {
                return;
            }

            var $leftGrip = $this.find(settings.left_grip_selector),
                $rightGrip = $this.find(settings.right_grip_selector),
                highlightedRangeMax = $this.data('highlightedRangeMax'),
                curMin = $this.data('cur_min'),
                curMax = $this.data('cur_max'),
                highlightGripClass = settings.highlight.grip_class;

            // curmin is within the highlighted range
            if (curMin < highlightedRangeMin || curMin > highlightedRangeMax) {
                // de-highlight grip
                $leftGrip.removeClass(highlightGripClass);
            }
            else {
                // highlight grip
                $leftGrip.addClass(highlightGripClass);
            }

            // time to highlight right grip
            if (curMax < highlightedRangeMin || curMax > highlightedRangeMax) {
                // de-highlight grip
                $rightGrip.removeClass(highlightGripClass);
            }
            else {
                // highlight grip
                $rightGrip.addClass(highlightGripClass);
            }
        },
        /* 
         *  Set left and right handle at the right position on the screen (pixels) 
         *  given the desired position in currency.
         * 
         *  e.g., _methods.set_position_from_val.call($this, 10000, 100000);
         *        
         *        may set the left handle at 100px and the right handle at
         *        200px;
         *   
         */
        'set_position_from_val' : function (cur_min, cur_max) {
            var $this = this;
            // 
            // We need to understand how much pixels cur_min and cur_max
            // correspond.
            //
            var range_min = $this.data('range_min'),
                range_max = $this.data('range_max');

            //
            // (safety) constrain the cur_min or the cur_max value between the
            // max/min ranges allowed for this slider.
            //
            if (cur_min < range_min) { cur_min = range_min; }
            if (cur_min > range_max) { cur_min = range_max; }

            if ($this.data('has_right_grip')) {
                if (cur_max > range_max) { cur_max = range_max; }
                if (cur_max < range_min) { cur_max = range_min; }
            }
            else {
                cur_max = $this.data('cur_max');
            }

            var leftPx = methods.value_to_px.call($this, cur_min),
                rightPx = methods.value_to_px.call($this, cur_max);

            _methods.set_handles_at_px.call($this, leftPx, rightPx);

            // save this position
            $this.data('cur_min', cur_min);

            if ($this.data('has_right_grip')) {
                $this.data('cur_max', cur_max);
            }

            return $this;
        },
        /*
         * Set the position of the handles at the specified pixel points (taking
         * the whole slider width as a maximum point).
         */
        'set_position_from_px' : function (leftPx, rightPx) {
            var $this = this;

            //
            // we need to find a value from the given value in pixels
            //

            // now set the position as requested...
            _methods.set_handles_at_px.call($this, leftPx, rightPx);

            var valueLeftRight = _methods.getSliderValuesAtPositionPx.call($this, leftPx, rightPx),
                leftPxInValue = valueLeftRight[0],
                rightPxInValue = valueLeftRight[1];

            // ... and save the one we've found.
            $this.data('cur_min', leftPxInValue);

            if ($this.data('has_right_grip')) {
                $this.data('cur_max', rightPxInValue);
            }

            return $this;
        },
        /*
         * Updates the CSS of grips and bar so that the left grip appears at
         * leftPx and the right grip appears at rightPx. Note: leftPx can be >
         * rightPx.
         */
        'set_handles_at_px' : function (leftPx, rightPx) {
            var $this = this;
            var settings = $this.data('settings');

            var left_grip_selector = settings.left_grip_selector,
                right_grip_selector = settings.right_grip_selector,
                value_bar_selector = settings.value_bar_selector;

            var handleWidth = $this.data('left_grip_width');

            // The left grip
            $this.find(left_grip_selector).css('left', leftPx + 'px');

            // The right grip
            $this.find(right_grip_selector).css('left', rightPx + 'px');

            // The value bar
            if ($this.data('has_right_grip')) {
                // If both the grips are there, the value bar must stick to
                // beginning and the end of the grips. 
                $this.find(value_bar_selector)
                    .css('left', leftPx + 'px')
                    .css('width', (rightPx - leftPx + handleWidth) + 'px');
            }
            else {
                if (!_naked_bar_deltas) {
                    _methods.populateNakedBarDeltas.call($this, leftPx, rightPx, handleWidth);
                }

                if (rightPx > leftPx) {
                    // The naked end of the bar is on the right of the grip
                    $this.find(value_bar_selector)
                        .css('left', leftPx + 'px')
                        .css('width', rightPx - leftPx + _naked_bar_deltas.toEndWidth + 'px');
                }
                else {
                    // The naked end of the bar is on the left of the grip
                    // NOTE: leftPx and rightPx are to be read swapped here.
                    $this.find(value_bar_selector)
                        .css('left', rightPx + _naked_bar_deltas.toBeginLeft + 'px')
                        .css('width', (leftPx - rightPx + _naked_bar_deltas.toBeginWidth) + 'px');
                }
            }

            return $this;
            
        },
        'drag_start_func_touch' : function (e, settings, $left_grip, $right_grip, is_touch) {
            var $this = this,
                original_event = e.originalEvent,
                touch = original_event.touches[0];

            // for touch devices we need to make sure we allow the user to scroll
            // if the click was too far from the slider.
            var curY = touch.pageY,
                curX = touch.pageX;

            // is the user allowed to grab if he/she tapped too far from the
            // slider?
            var ydelta = Math.abs($this.offset().top - curY),
                slider_left = $this.offset().left,
                xldelta = slider_left - curX,
                xrdelta = curX - (slider_left + $this.width());

            if (ydelta > settings.touch_tolerance_value_bar_y  ||
                xldelta > settings.touch_tolerance_value_bar_x ||
                xrdelta > settings.touch_tolerance_value_bar_x ) {

                return;
            }

            original_event.preventDefault();
            _original_mousex = touch.pageX;

            // true : is touch event
            _methods.drag_start_func.call($this, touch, settings, $left_grip, 
                $right_grip, is_touch);
        },
        'drag_start_func' : function (e, settings, $leftGrip, $rightGrip, 
                is_touch) {

            var $this = this;

            $this.find(settings.left_grip_selector + 
                ',' + settings.value_bar_selector + 
                ',' + settings.right_grip_selector).removeClass(

                settings.animating_css_class
            );
            
            if (!methods.is_enabled.call($this)) { return; }
        
            //
            // if the user used the finger, he/she is allowed to touch anywhere.
            // but if the mouse is used, we want to enable the logic only for
            // left grip, right grip, bar/panel elements.
            //
            var $target = $(e.target);

            // ... if the highlight range was enabled we should check wether
            // the user has tapped or clicked the highlight panel...
            var targetIsPanelSelector = false;
            if (typeof settings.highlight === 'object') {
                targetIsPanelSelector = $target.is(settings.highlight.panel_selector);
            }

            if (is_touch === false && 
                !$target.is(settings.left_grip_selector) &&
                !$target.is(settings.right_grip_selector) && 
                !$target.is(settings.value_bar_selector) &&
                !targetIsPanelSelector &&
                !$target.is($this) ) {

                return;
            }

            // - - - -
            // the following logic finds the nearest slider grip and starts
            // dragging it.
            // - - - -
            
            _$current_slider = $this;

            var leftGripPositionPx = _methods.getGripPositionPx.call($this, $leftGrip),
                sliderWidthPx = _methods.getSliderWidthPx.call($this) - $this.data('left_grip_width'),
                lleft = $leftGrip.offset().left,
                rleft, // don't compute this yet (maybe not needed if 1 grip)
                curX,
                ldist,
                rdist,
                ldelta,
                rdelta;

            var rightGripPositionPx = _methods.getRightGripPositionPx.call($this);

            //
            // We need to do as if the click happened a bit more on the left.
            // That's because we will be setting the left CSS property at the
            // point where the click happened, meaning the slider grip will be
            // spanning to the right.
            //
            curX = Math.round(e.pageX) - ($this.data('left_grip_width') / 2);

            // calculate deltas from left and right grip
            ldist = Math.abs(lleft - curX);
            ldelta = curX - lleft;

            if ($this.data('has_right_grip')) {
                rleft = $rightGrip.offset().left;
                rdist = Math.abs(rleft - curX);
                rdelta = curX - rleft;
            }
            else {
                // no right grip... we make the right slider
                // unreachable!
                rdist = ldist * 2;
                rdelta = ldelta * 2;
            }
            
            // notify the beginning of a dragging...
            settings.user_drag_start_callback.call($this, e);

            if (ldist === rdist) {

                if (curX < lleft) {
                    // move the left grip
                    leftGripPositionPx += ldelta;
                    _is_left_grip = true;
                }
                else {
                    // move the right grip
                    rightGripPositionPx += rdelta;
                    _is_left_grip = false;
                }
            }
            else if (ldist < rdist) {

                // move the left grip
                leftGripPositionPx += ldelta;
                _is_left_grip = true;
            }
            else {
                // move the right grip
                rightGripPositionPx += rdelta;
                _is_left_grip = false;
            }

            //
            // Limit the right grip to the maximum allowed - as the user can
            // actually click beyond it!
            //
            // ...............
            //               ^-- maximum clickable
            //              ^--- maximum allowed (i.e., sliderWidth - gripWidth)
            //
            // if user clicks at sliderWidth, we will be setting CSS left of
            // right handle having:
            //
            // ...............R  <-- out of bound :-(
            //               ^-- maximum clickable
            //              ^--- maximum allowed (i.e., sliderWidth - gripWidth)
            //
            // but we want:
            //
            // ..............R <-- within bound :-)
            //               ^-- maximum clickable
            //              ^--- maximum allowed (i.e., sliderWidth - gripWidth)
            //
            // Hence we limit.
            //

            if ($this.data('has_right_grip')) {
                // here we check the right handle only, because it should
                // always be the one that gets moved if the user clicks towards
                // the right extremity!
                if (rightGripPositionPx > sliderWidthPx) {
                    rightGripPositionPx = sliderWidthPx;
                }
            }
            else {
                // in case we have one handle only, we will be moving the left
                // handle instead of the right one... hence we need to perform
                // this check on the left handle as well!
                if (leftGripPositionPx > sliderWidthPx) {
                    leftGripPositionPx = sliderWidthPx;
                }
            }

            // this can happen because the user can click on the left handle!
            // (which is out of the left boundary)
            if (leftGripPositionPx < 0) {
                leftGripPositionPx = 0;
            }
            
            _is_mousedown = true;

            var prev_min = $this.data('cur_min'),
                prev_max = $this.data('cur_max');

            _methods.set_position_from_px.call($this, leftGripPositionPx, rightGripPositionPx);

            // set the style of the grips according to the highlighted range
            _methods.refresh_grips_style.call($this);

            _methods.notify_changed_implicit.call($this, 'drag_start', prev_min, prev_max);

            // no need to call preventDefault on touch events, as we called
            // preventDefault on the original event already
            if (Object.prototype.toString.apply(e) !== "[object Touch]") {
                e.preventDefault();
            }
        },
        'drag_move_func_touch' : function (e) {
            if (_is_mousedown === true) {
                var original_event = e.originalEvent;
                original_event.preventDefault();
                var touch = original_event.touches[0];
                _methods.drag_move_func(touch);
            }
        },
        'drag_move_func' : function (e) {
            if (_is_mousedown) {
                // our slider element.
                var $this = _$current_slider,
                    settings = $this.data('settings'),
                    sliderWidthPx = _methods.getSliderWidthPx.call($this) - $this.data('left_grip_width'),
                    leftGripPositionPx = _methods.getLeftGripPositionPx.call($this);

                var rightGripPositionPx = _methods.getRightGripPositionPx.call($this);

                //
                // Here we are going to set the position in pixels based on
                // where the user has moved the mouse cursor. We obtain the
                // position of the mouse cursors via e.pageX, which returns the
                // absolute position of the mouse on the screen.
                //
                var absoluteMousePosition = Math.round(e.pageX);

                //
                // Compute the delta (in px) for the slider movement. It is the
                // difference between the new position of the cursor and the
                // old position of the cursor.
                //
                // Based on the delta we decide how to move the dragged handle.
                //
                // 0 : no movement
                // -delta: move left
                // +delta: move right
                //
                var delta = absoluteMousePosition - _original_mousex;

                //
                // User cannot drag the handles outside the slider bar area.
                //

                // 1) calculate the area within which the movement is
                //    considered to be valid.
                var half_a_grip_width = $this.data('left_grip_width') / 2,
                    drag_area_start = $this.offset().left + $this.data('left_grip_width') - half_a_grip_width,
                    drag_area_end = drag_area_start + sliderWidthPx;

                if (settings.crossable_handles === false && $this.data('has_right_grip')) {
                    // if handles are not crossable, we should define the left
                    // and the right boundary of the movement.
                    if (_is_left_grip) {
                        drag_area_end = drag_area_start + rightGripPositionPx;
                    }
                    else {
                        drag_area_start = drag_area_start + leftGripPositionPx;
                    }
                }
 
                // 2) by default we accept to move the slider according to both
                // the deltas (i.e., left or right)
                var ignore_positive_delta = 0,
                    ignore_negative_delta = 0;
 
                // 3) but if the user is moving the mouse beyond the draggable
                // area, we should only accept a movement in one direction.
                if (absoluteMousePosition < drag_area_start) { 
                    ignore_positive_delta = 1;
                    ignore_negative_delta = 0;
                }
                if (absoluteMousePosition > drag_area_end) {
                    ignore_negative_delta = 1;
                    ignore_positive_delta = 0;
                }

                //
                // Here we decide whether to invert the grip being moved.
                //
                if (settings.crossable_handles === true && 
                    $this.data('has_right_grip')) {

                    if (_is_left_grip) {

                        // ... if we are using the left grip
                        if (rightGripPositionPx <= sliderWidthPx) {

                            // the inversion logic should only be active when the
                            // slider is not at the extremity
                            if (leftGripPositionPx + delta > rightGripPositionPx) {

                                _is_left_grip = false;

                                // TWEAK: keep the position of the left handle fixed
                                // at the one of the right handle as the user may
                                // have moved the mouse too fast, thus giving
                                // leftGripPositionPx > rightGripPositionPx.
                                //
                                // Basically here we avoid:
                                // 
                                // Initial State:
                                //
                                // ------L-R------  (leftGripPositionPx < rightGripPositionPx)
                                //
                                // Fast Mouse Move:
                                //
                                // --------R--L---  (leftGripPositionPx + delta)
                                // --------R-L----  (leftGripPositionPx [ still > rightGripPositionPx! ])
                                //
                                // _is_left_grip becomes false (this code)
                                // 
                                leftGripPositionPx = rightGripPositionPx;
                            }
                        }
                    }
                    else {
                        // ... converse logic
                        if (leftGripPositionPx >= 0) {
                            if (rightGripPositionPx + delta < leftGripPositionPx) {

                                // current_max = current_min;
                                _is_left_grip = true;

                                rightGripPositionPx = leftGripPositionPx;
                            }
                        }
                    }
                }

                //
                // Decide the position of the new handles.
                //
                var nextLeftGripPositionPx = leftGripPositionPx,
                    nextRightGripPositionPx = rightGripPositionPx;

                if ((delta > 0 && !ignore_positive_delta) || 
                    (delta < 0 && !ignore_negative_delta)) {

                    if (_is_left_grip) {
                        nextLeftGripPositionPx += delta;
                    }
                    else {
                        nextRightGripPositionPx += delta;
                    }
                }

                _methods.validateAndMoveGripsToPx.call($this, nextLeftGripPositionPx, nextRightGripPositionPx);
 
                // prepare for next movement
                _original_mousex = absoluteMousePosition;

                
                // no need to call preventDefault on touch events, as we called
                // preventDefault on the original event already
                if (Object.prototype.toString.apply(e) !== "[object Touch]") {
                    e.preventDefault();
                }
            }
        },
        'drag_end_func_touch' : function (e) {
            var original_event = e.originalEvent;
            original_event.preventDefault();
            var touch = original_event.touches[0];
            _methods.drag_end_func(touch);
        },
        'drag_end_func' : function (/* e */) {
            var $this = _$current_slider;
            if (typeof $this !== 'undefined') {
                _is_mousedown = false;
                _original_mousex = undefined;

                _methods.notify_mouse_up_implicit.call($this, _is_left_grip);

                // require another click on a handler before going into here again!
                _$current_slider = undefined;

                // put back the class once user finished dragging
                var settings = $this.data('settings');
                $this.find(settings.left_grip_selector + 
                    ',' + settings.value_bar_selector + 
                    ',' + settings.right_grip_selector).addClass(

                    settings.animating_css_class
                );
            }
        },
        'get_rounding_for_value' : function (v) {
            var $this = this;
            var rounding = $this.data('rounding');
            var rounding_ranges = $this.data('rounding_ranges');

            if (typeof rounding_ranges === 'object') {

                // then it means the rounding is not fixed, we should find the
                // value in the roundings_array.
                var roundingIdx  = _methods.binarySearch.call($this, rounding_ranges, v, 
                    // pick an element from the array
                    function (array, index) { return array[index].range; },

                    // compare search element with current element
                    // < 0 search < current
                    // 0   equals
                    // > 0 search > current
                    function (search, array, currentIdx) {

                        // first check if this is our element

                        // this is our element if the search value is:
                        if (search < array[currentIdx].range) {

                            // we can have a match or search in the left half
                            if (currentIdx > 0) {
                                if (search >= array[currentIdx - 1].range) {
                                    return 0;
                                }
                                else {
                                    // go left
                                    return -1;
                                }
                            }
                            else {
                                return 0;
                            }
                        }
                        else {
                            // we must search in the next half
                            return 1;
                        }
                    }
                );

                rounding = 1;
                if (roundingIdx > -1) {
                    rounding = parseInt(rounding_ranges[roundingIdx].value, 10);
                }
                else {
                    var lastIdx = rounding_ranges.length - 1;
                    if (v >= rounding_ranges[lastIdx].range) {
                        rounding = rounding_ranges[lastIdx].value;
                    }
                }
            }
            return rounding;
        },
        /*
         * Calls the user mouseup callback with the right parameters. Relies on
         * $data('beforestart_min/max') in addition to the isLeftGrip parameter.
         *
         * NOTE: saves the new beforestart_min and begforestart_max as well.
         */
        'notify_mouse_up_implicit' : function(isLeftGrip) {
            var $this = this,
                current_min_value = methods.get_current_min_value.call($this),
                current_max_value = methods.get_current_max_value.call($this),
                didValuesChange = false;

            // check if we changed.
            if (($this.data('beforestart_min') !== current_min_value) || 
                ($this.data('beforestart_max') !== current_max_value)
            ) {
                // values have changed!
                didValuesChange = true;

                // save the new values
                $this.data('beforestart_min', current_min_value);
                $this.data('beforestart_max', current_max_value);
            }


            var settings = $this.data('settings');

            settings.user_mouseup_callback.call($this, 
                methods.get_current_min_value.call($this),
                methods.get_current_max_value.call($this),
                isLeftGrip,
                didValuesChange
            );

            return $this;
        },
        /*
         * NOTE: this method may take the previous min/max value as input.
         *       if no arguments are provided the method blindly notifies.
         */
        'notify_changed_implicit' : function (cause, prevMin, prevMax) {
            var $this = this;

            var force = false;
            if (cause === 'init' || cause === 'refresh') {
                force = true;
            }

            var curMin = methods.get_current_min_value.call($this),
                curMax = methods.get_current_max_value.call($this);

            if (!force) {
                prevMin = methods.round_value_according_to_rounding.call($this, prevMin);
                prevMax = methods.round_value_according_to_rounding.call($this, prevMax);
            }

            if (force || curMin !== prevMin || curMax !== prevMax) {

                _methods.notify_changed_explicit.call($this, cause, prevMin, prevMax, curMin, curMax);

                force = 1;
            }

            return force;
        },
        'notify_changed_explicit' : function (cause, prevMin, prevMax, curMin, curMax) {
            var $this = this,
                settings = $this.data('settings');

            // maybe update aria attributes for accessibility
            if ($this.data('aria_enabled')) {
                _methods.updateAriaAttributes.call($this);
            }

            settings.value_changed_callback.call($this, cause, curMin, curMax, prevMin, prevMax);

            return $this;
        },
        'validate_params' : function (settings) {
            var $this = this;
            var min_value = $this.data('range_min'),
                max_value = $this.data('range_max'),
                cur_min = $this.data('cur_min'),
                lower_limit = $this.data('lower-limit'),
                upper_limit = $this.data('upper-limit');

            var have_limits = _methods.haveLimits.call($this);

            if (typeof min_value === 'undefined') {
                $.error("the data-range_min attribute was not defined");
            }
            if (typeof max_value === 'undefined') {
                $.error("the data-range_max attribute was not defined");
            }
            if (typeof cur_min === 'undefined') {
                $.error("the data-cur_min attribute must be defined");
            }
            if (min_value > max_value) {
                $.error("Invalid input parameter. must be min < max");
            }

            if (have_limits && lower_limit > upper_limit) {
                $.error('Invalid data-lower-limit or data-upper-limit');
            }
            if ($this.find(settings.left_grip_selector).length === 0) {
                $.error("Cannot find element pointed by left_grip_selector: " + settings.left_grip_selector);
            }
            /* 
             * NOTE: only validate right grip selector if it is not
             * undefined otherwise just assume that if it isn't
             * found isn't there. This is because we initialize the
             * slider at once and let the markup decide if the
             * slider is there or not.
             */
            if (typeof settings.right_grip_selector !== 'undefined') {
                if ($this.find(settings.right_grip_selector).length === 0) {
                    $.error("Cannot find element pointed by right_grip_selector: " + settings.right_grip_selector);
                }
            }

            // same thing for the value bar selector
            if (typeof settings.value_bar_selector !== 'undefined') {
                if ($this.find(settings.value_bar_selector).length === 0) {
                    $.error("Cannot find element pointed by value_bar_selector" + settings.value_bar_selector);
                }
            }
        },
        /*
         * Maps a value between [minRange -- maxRange] into [0 -- n].
         * The target range will be an integer number.
         */
        'rangemap_0_to_n' : function (val, n) {
            var $this = this;
            var rangeMin = $this.data('range_min');
            var rangeMax = $this.data('range_max');

            if (val <= rangeMin) { return 0; }
            if (val >= rangeMax) { return n; }

            return Math.floor((n * val - n * rangeMin) / (rangeMax - rangeMin));
        },
        /*
         * Maps a value between [0 -- max] back into [minRange -- maxRange].
         * The target range can be a floating point number.
         */
        'inverse_rangemap_0_to_n' : function (val, max) {
            var $this = this;
            var rangeMin = $this.data('range_min');
            var rangeMax = $this.data('range_max');

            if (val <= 0)   { return rangeMin; }
            if (val >= max) { return rangeMax; }

            //
            // To do this we first map 0 -- max relatively withing [minRange
            // and maxRange], that is between [0 and (maxRange-minRange)].
            //
            var relativeMapping = (rangeMax - rangeMin) * val / max;

            // ... then we bring this to the actual value by adding rangeMin.
            return relativeMapping + rangeMin;
        }

    };
    var methods = {
        
        'teardown' : function () {
            var $this = this;

            // remove all data set with .data()
            $this.removeData();

            // unbind the document as well
            $(document)
                .unbind('mousemove.nstSlider')
                .unbind('mouseup.nstSlider');

            // unbind events bound to the container element
            $this.parent()
                .unbind('mousedown.nstSlider')
                .unbind('touchstart.nstSlider')
                .unbind('touchmove.nstSlider')
                .unbind('touchend.nstSlider');
            
            // unbind events bound to the current element
            $this.unbind('keydown.nstSlider')
                .unbind('keyup.nstSlider');

            return $this;
        },
        'init' : function(options) {
            var settings = $.extend({
                'animating_css_class' : 'nst-animating',
                // this is the distance from the value bar by which we should
                // grab the left or the right handler.
                'touch_tolerance_value_bar_y': 30,  // px
                'touch_tolerance_value_bar_x': 15,  // px
                // where is the left grip?
                'left_grip_selector': '.nst-slider-grip-left',
                // where is the right grip?
                // undefined = (only left grip bar)
                'right_grip_selector': undefined,

                // Specify highlight like this if you want to highlight a range
                // in the slider.
                //
                // 'highlight' : {
                //     'grip_class' : '.nsti-slider-hi',
                //     'panel_selector' : '.nst-slider-highlight-panel'
                // },
                'highlight' : undefined,

                // Lets you specify the increment rounding for the slider handles
                // for when the user moves them.
                // It can be a string, indicating a fixed increment, or an object
                // indicating the increment based on the value to be rounded.
                //
                // This can be specified in the following form: {
                //    '1' : '100',    
                //    '10' : '1000',  /* rounding = 10 for values in [100-999] */
                //    '50' : '10000',
                // }
                'rounding': undefined,

                // if the bar is not wanted
                'value_bar_selector': undefined,

                // Allow handles to cross each other while one of them is being
                // dragged. This option is ignored if just one handle is used.
                'crossable_handles': true,

                'value_changed_callback': function(/*cause, vmin, vmax*/) { return; },
                'user_mouseup_callback' : function(/*vmin, vmax, left_grip_moved*/) { return; },
                'user_drag_start_callback' : function () { return; }
            }, options);

            //
            // we need to unbind events attached to the document,
            // as if we replace html elements and re-initialize, we
            // don't want to double-bind events!
            //
            var $document = $(document);

            // make sure only one event is bound to the document
            $document.unbind('mouseup.nstSlider');
            $document.unbind('mousemove.nstSlider');

            $document.bind('mousemove.nstSlider', _methods.drag_move_func);
            $document.bind('mouseup.nstSlider',   _methods.drag_end_func);

            return this.each(function() {
                //
                // $this is like:
                //
                // <div class="outer-slider" data-... data-...>
                //     <div class="bar"></div>
                //     <div class="leftGrip"></div>
                //     <div class="rightGrip"></div>
                // </div>
                //
                // It is supposed to be enclosed in a container
                //
                var $this = $(this),
                    $container = $this.parent();

                // enable: the user is able to move the grips of this slider.
                $this.data('enabled', true);

                // fix some values first
                var rangeMin = $this.data('range_min'),
                    rangeMax = $this.data('range_max'),
                    valueMin = $this.data('cur_min'),
                    valueMax = $this.data('cur_max');

                // assume 0 if valueMax is not specified
                if (typeof valueMax === 'undefined') {
                    valueMax = valueMin;
                }

                if (rangeMin === '') { rangeMin = 0; }
                if (rangeMax === '') { rangeMax = 0; }
                if (valueMin === '') { valueMin = 0; }
                if (valueMax === '') { valueMax = 0; }

                $this.data('range_min', rangeMin);
                $this.data('range_max', rangeMax);
                $this.data('cur_min', valueMin);
                $this.data('cur_max', valueMax);

                // halt on error
                _methods.validate_params.call($this, settings);

                $this.data('settings', settings);

                // override rounding from markup if defined in configuration
                if (typeof settings.rounding !== 'undefined') {
                    methods.set_rounding.call($this, settings.rounding);
                }
                else if (typeof $this.data('rounding') !== 'undefined') {
                    methods.set_rounding.call($this, $this.data('rounding'));
                }
                else {
                    methods.set_rounding.call($this, 1);
                }
                
                var left_grip = $this.find(settings.left_grip_selector)[0],
                    $left_grip = $(left_grip),
                    $right_grip = $($this.find(settings.right_grip_selector)[0]);

                // make sure left grip can be tabbed if the user hasn't
                // defined their own tab index
                if (typeof $left_grip.attr('tabindex') === 'undefined') {
                    $left_grip.attr('tabindex', 0);
                }

                // no right handler means single handler
                var has_right_grip = false;
                if ($this.find(settings.right_grip_selector).length > 0) {
                    has_right_grip = true;

                    // make sure right grip can be tabbed if the user hasn't
                    // defined their own tab index
                    if (typeof $right_grip.attr('tabindex') === 'undefined') {
                        $right_grip.attr('tabindex', 0);
                    }
                }
                $this.data('has_right_grip', has_right_grip);

                // enable aria attributes update?
                if ($this.data('aria_enabled') === true) {
                    // setup aria role attributes on each grip
                    $left_grip
                        .attr('role', 'slider')
                        .attr('aria-disabled', 'false');

                    if (has_right_grip) {
                        $right_grip
                            .attr('role', 'slider')
                            .attr('aria-disabled', 'false');
                    }
                }

                //
                // deal with keypresses here
                //
                $this.bind('keyup.nstSlider', function (e) {
                    if ($this.data('enabled')) {
                        switch (e.which) {
                            case 37:   // left
                            case 38:   // up
                            case 39:   // right 
                            case 40:   // down

                            if (_before_keydown_value === _before_keyup_value) {

                                // we should search for the next value change...
                                // ... in which direction? depends on whe

                                var searchUntil = _methods.getSliderWidthPx.call($this),
                                    val,
                                    i,
                                    setAtPixel;

                                if (_before_keydown_pixel - _before_keyup_pixel < 0) {
                                    // the grip was moved towards the right

                                    for (i=_before_keyup_pixel; i<=searchUntil; i++) {
                                        // if the value at pixel i is different than
                                        // the current value then we are good to go.
                                        //
                                        val = methods.round_value_according_to_rounding.call($this,
                                            _methods.getSliderValuesAtPositionPx.call($this, i, i)[1]
                                        );
                                        if (val !== _before_keyup_value) {
                                            setAtPixel = i;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    // the grip was moved towards the left

                                    for (i=_before_keyup_pixel; i>=0; i--) {

                                        // if the value at pixel i is different than
                                        // the current value then we are good to go.
                                        //
                                        val = methods.round_value_according_to_rounding.call($this,
                                            _methods.getSliderValuesAtPositionPx.call($this, i, i)[1]
                                        );
                                        if (val !== _before_keyup_value) {
                                           setAtPixel = i;
                                           break;
                                        }
                                    }
                                }


                                // we need to set the slider at this position
                                if (_is_left_grip) {
                                    _methods.validateAndMoveGripsToPx.call($this, setAtPixel, _methods.getRightGripPositionPx.call($this));
                                }
                                else {
                                    _methods.validateAndMoveGripsToPx.call($this, _methods.getLeftGripPositionPx.call($this), setAtPixel);
                                }

                                //
                                // call the mouseup callback when the key is up!
                                //
                                _methods.notify_mouse_up_implicit.call($this, _is_left_grip);
                            }
                        }

                        // clear values 
                        _before_keydown_value = undefined;
                        _before_keydown_pixel = undefined;
                        _before_keyup_value = undefined;
                        _before_keyup_pixel = undefined;
                    }
                });
                $this.bind('keydown.nstSlider', function (evt) {
                    if ($this.data('enabled')) {

                        var moveHandleBasedOnKeysFunc = function ($grip, e) {

                            var nextLeft = _methods.getLeftGripPositionPx.call($this),
                                nextRight = _methods.getRightGripPositionPx.call($this);

                            if (typeof _before_keydown_value === 'undefined') {
                                _before_keydown_pixel = _is_left_grip ? nextLeft : nextRight;

                                _before_keydown_value = _is_left_grip ? methods.get_current_min_value.call($this) : methods.get_current_max_value.call($this);
                            }

                            switch (e.which) {
                                case 37:   // left
                                case 40:   // down
                                    if (_is_left_grip) { nextLeft--; } else { nextRight--; }
                                    e.preventDefault();
                                    break;

                                case 38:   // up
                                case 39:   // right 
                                    if (_is_left_grip) { nextLeft++; } else { nextRight++; }

                                    e.preventDefault();
                                    break;
                            }

                            _before_keyup_pixel = _is_left_grip ?  nextLeft : nextRight;

                            // may write into cur_min, cur_max data...
                            _methods.validateAndMoveGripsToPx.call($this, nextLeft, 
                                nextRight);

                            _before_keyup_value = _is_left_grip ? methods.get_current_min_value.call($this) : methods.get_current_max_value.call($this);
                        };
                        
                        // default
                        if (has_right_grip && $this.find(':focus').is($right_grip)) {
                            _is_left_grip = false;
                            moveHandleBasedOnKeysFunc.call($this, $right_grip, evt);
                        }
                        else {
                            _is_left_grip = true;
                            moveHandleBasedOnKeysFunc.call($this, $left_grip, evt);
                        }
                    } 
                });

                // determine size of grips
                var left_grip_width = _methods.getLeftGripWidth.call($this),
                    right_grip_width = has_right_grip ? 
                        _methods.getRightGripWidth.call($this) : left_grip_width;

                $this.data('left_grip_width', left_grip_width);
                $this.data('right_grip_width', right_grip_width);

                $this.data('value_bar_selector', settings.value_bar_selector);

                // set behaviour of naked bar in case of one handle
                if (!has_right_grip) {
                    var bStickToSides = valueMax === rangeMax || valueMax === rangeMin;
                    _methods.setNakedBarDelta.call($this,
                        bStickToSides ? "stickToSides" : "middle",
                        left_grip_width
                    );
                }

                // this will set the range to the right extreme in such a case.
                if (rangeMin === rangeMax || valueMin === valueMax) {
                    methods.set_range.call($this, rangeMin, rangeMax);
                }
                else {

                    // set the initial position
                    _methods.set_position_from_val.call($this, 
                        $this.data('cur_min'), $this.data('cur_max'));
                }

                _methods.notify_changed_implicit.call($this, 'init');

                // handle mouse movement
                $this.data('beforestart_min', methods.get_current_min_value.call($this));
                $this.data('beforestart_max', methods.get_current_max_value.call($this));

                // pass a closure, so that 'this' will be the current slider bar,
                // not the container.
                $this.bind('mousedown.nstSlider', function (e) {
                    _methods.drag_start_func.call($this, e, settings, $left_grip, $right_grip, false);
                });
                
                $container.bind('touchstart.nstSlider', function (e) {
                    _methods.drag_start_func_touch.call($this, e, settings, $left_grip, $right_grip, true);
                });
                $container.bind('touchend.nstSlider',  function (e) {
                    _methods.drag_end_func_touch.call($this, e);
                });
                $container.bind('touchmove.nstSlider', function (e) {
                    _methods.drag_move_func_touch.call($this, e);
                });

                // if the data-histogram attribute exists, then use this
                // histogram to set the step distribution
                var step_histogram = $this.data('histogram');
                if (typeof step_histogram !== 'undefined') {
                    methods.set_step_histogram.call($this, step_histogram);
                }
            }); // -- each slider
        },
        'get_range_min' : function () {
            var $this = this;
            return $this.data('range_min');
        },
        'get_range_max' : function () {
            var $this = this;
            return $this.data('range_max');
        },
        'get_current_min_value' : function () {
            var $this = $(this);

            var rangeMin = methods.get_range_min.call($this),
                rangeMax = methods.get_range_max.call($this);

            var currentMin = $this.data('cur_min');

            var min;
            if (rangeMin >= currentMin) {
                min = rangeMin;
            }
            else {
                min = methods.round_value_according_to_rounding.call($this, currentMin);
            }

            if (_methods.haveLimits.call($this)) {
                if (min <= rangeMin) {
                    return $this.data('lower-limit');
                }
                else if (min >= rangeMax) {
                    return $this.data('upper-limit');
                }
            }
            else {
                if (min <= rangeMin) {
                    return rangeMin;
                }
                else if (min >= rangeMax) {
                    return rangeMax;
                }
            }

            return min;
        },
        'get_current_max_value' : function () {
            var $this = $(this);

            var rangeMin = methods.get_range_min.call($this),
                rangeMax = methods.get_range_max.call($this);

            var currentMax = $this.data('cur_max');

            var max;
            if (rangeMax <= currentMax) {
                max = rangeMax;
            }
            else {
                max = methods.round_value_according_to_rounding.call($this, currentMax);
            }


            if (_methods.haveLimits.call($this)) {
                if (max >= rangeMax) {
                    return $this.data('upper-limit');
                }
                else if (max <= rangeMin) {
                    return $this.data('lower-limit');
                }
            }
            else {
                if (max >= rangeMax) {
                    return rangeMax;
                }
                else if (max <= rangeMin) {
                    return rangeMin;
                }
            }

            return max;
        },
        'is_handle_to_left_extreme' : function () {
            var $this = this; 
            if (_methods.haveLimits.call($this)) {
                return $this.data('lower-limit') === methods.get_current_min_value.call($this);
            }
            else {
                return methods.get_range_min.call($this) === methods.get_current_min_value.call($this);
            }
        },
        'is_handle_to_right_extreme' : function () {
            var $this = this; 
            if (_methods.haveLimits.call($this)) {
                return $this.data('upper-limit') === methods.get_current_max_value.call($this);
            }
            else {
                return methods.get_range_max.call($this) === methods.get_current_max_value.call($this);
            }
        },
        // just call set_position on the current values
        'refresh' : function () {
            var $this = this;

            // re-set the slider step if specified
            var lastStepHistogram = $this.data('last_step_histogram');
            if (typeof lastStepHistogram !== 'undefined') {
                methods.set_step_histogram.call($this, lastStepHistogram); 
            }

            // re-center given values
            _methods.set_position_from_val.call($this, 
                methods.get_current_min_value.call($this),
                methods.get_current_max_value.call($this)
            );

            // re-highlight the range
            var highlightRangeMin = $this.data('highlightedRangeMin');
            if (typeof highlightRangeMin === 'number') {
                // a highlight range is present, we must update it
                var highlightRangeMax = $this.data('highlightedRangeMax');
                methods.highlight_range.call($this, highlightRangeMin, highlightRangeMax);
            }

            _methods.notify_changed_implicit.call($this, 'refresh');
            return $this;
        },
        'disable' : function () {
            var $this = this,
                settings = $this.data('settings');

            $this.data('enabled', false)
                .find(settings.left_grip_selector)
                    .attr('aria-disabled', 'true')
                .end()
                .find(settings.right_grip_selector)
                    .attr('aria-disabled', 'true');

            return $this;
        },
        'enable' : function() {
            var $this = this,
                settings = $this.data('settings');

            $this.data('enabled', true)
                .find(settings.left_grip_selector)
                    .attr('aria-disabled', 'false')
                .end()
                .find(settings.right_grip_selector)
                    .attr('aria-disabled', 'false');

            return $this;
        },
        'is_enabled' : function() {
            var $this = this;
            return $this.data('enabled');
        },
        /*
         * This one is the public method, called externally.
         * It sets the position and notifies in fact.
         */
        'set_position' : function(min, max) {
            var $this = this;

            var prev_min = $this.data('cur_min'),
                prev_max = $this.data('cur_max');

            if (min > max) {
                _methods.set_position_from_val.call($this, max, min);
            }
            else {
                _methods.set_position_from_val.call($this, min, max);
            }

            // set the style of the grips according to the highlighted range
            _methods.refresh_grips_style.call($this);

            _methods.notify_changed_implicit.call($this, 'set_position', prev_min, prev_max);
            
            // this is for the future, therefore "before the next
            // interaction starts"
            $this.data('beforestart_min', min);
            $this.data('beforestart_max', max);
        },
        /*
         * This tells the slider to increment its step non linearly over the
         * current range, based on the histogram on where results are.
         *
         * the input parameter 'histogram' identifies an empirical probability
         * density function (PDF).
         *
         */
        'set_step_histogram' : function (histogram) {
            var $this = this;

            $this.data('last_step_histogram', histogram);

            if (typeof histogram === 'undefined') {
                $.error('got an undefined histogram in set_step_histogram');
                _methods.unset_step_histogram.call($this);
            }

            var sliderWidthPx = _methods.getSliderWidthPx.call($this) - $this.data('left_grip_width'),
                nbuckets = histogram.length;

            if (sliderWidthPx <= 0) {
                // that means the slider is not visible...
                return;
            }

            //
            // we need to transform this pdf into a cdf, and use it to obtain
            // two mappings: pixel to value and value to pixel.
            //
            // 1) normalize the pdf to sum to sliderWidthPx first
            var i;
            var histogram_sum = 0;
            for (i=0; i<nbuckets; i++) {
                histogram_sum += histogram[i]; 
            }

            //
            // if the sum of the histogram is 0 it means that all is 0 in the 
            // histogram! (i.e, flat histogram). In this case we already know
            // what's going to be the answer...
            //
            if (histogram_sum === 0) {
                // ... and the answer is: a linear scale between min_range and
                // max range!
                methods.unset_step_histogram.call($this);

                return $this;
            }

            // coefficient for normalization
            var coeff = parseFloat(histogram_sum)/sliderWidthPx;

            // go normalize the histogram using this coefficient!
            for (i=0; i<nbuckets; i++) {
                histogram[i] = histogram[i]/coeff;
            }

            // 2) now that the histogram is normalized, extract the cumulative
            // distribution function (CDF). This is an always increasing function
            // that ranges between 0 and sliderWidthPx;
            //
            // We also build the inverted cdf, just the cdf read the other way
            // around.
            //
            var cdf = [ histogram[0] ];  // points to pixels
            for (i=1; i<nbuckets; i++) {
                var cdf_x = cdf[i-1] + histogram[i];
                cdf.push(cdf_x);
            }
            cdf.push(sliderWidthPx);


            // the first value here is always min_range as the cdf is supposed
            // to start from 0 (also first pixel = min_range)
            var pixel_to_value_lookup = [ $this.data('range_min') ];

            var last_filled = 0; // we've already filled 0

            // now stretch over the rest of the cdf
            var last_price_for_cdf_bucket = pixel_to_value_lookup[0];

            var cdf_bucket_count = 0;
            while (last_filled <= sliderWidthPx) { // do until all pixels are filled

                // get next item from cdf
                var fill_up_to_px = parseInt(cdf.shift(), 10);
                var price_for_cdf_bucket = 
                    _methods.inverse_rangemap_0_to_n.call($this, cdf_bucket_count+1, nbuckets+1);

                cdf_bucket_count++;

                // how many pixels do we have to fill
                var fill_tot = fill_up_to_px - last_filled;

                // interpolate and fill
                var diff = price_for_cdf_bucket - last_price_for_cdf_bucket;
                for (i = last_filled; i < fill_up_to_px; i++) {
                    var next_price_for_cdf_bucket = 
                        last_price_for_cdf_bucket + (diff * (i-last_filled+1) / fill_tot);

                    pixel_to_value_lookup.push(next_price_for_cdf_bucket);

                    last_filled++;

                    last_price_for_cdf_bucket = next_price_for_cdf_bucket;
                }

                if (last_filled === sliderWidthPx) {
                    break;
                }
            }
            pixel_to_value_lookup[pixel_to_value_lookup.length-1] = $this.data('range_max');

            // 3) build lookup functions to extract pixels and values from the
            // cdf and the inverted cdf.
            //
            var pixel_to_value_mapping = function (pixel) {
                return pixel_to_value_lookup[parseInt(pixel, 10)];
            };

            var value_to_pixel_mapping = function (value) {
                //
                // Binary search into the array of pixels, returns always the
                // rightmost pixel if there is no exact match.
                //
                var suggestedPixel = _methods.binarySearch.call($this, pixel_to_value_lookup, value, 
                    function(a, i) { return a[i]; },  // access a value in the array
                    _methods.binarySearchValueToPxCompareFunc
                );

                // exact match
                if (pixel_to_value_lookup[suggestedPixel] === value) {
                    return suggestedPixel;
                }

                // approx match: we need to check if it's closer to the value
                // at suggestedPixel or the value at suggestedPixel-1
                if ( Math.abs(pixel_to_value_lookup[suggestedPixel-1] - value) <
                     Math.abs(pixel_to_value_lookup[suggestedPixel] - value) ) {

                     return suggestedPixel-1;
                }
                return suggestedPixel;
            };

            //
            // these two functions will be stored and then used internally to
            // decide what value to display given a certain pixel, and what
            // pixel to put the slider on given a certain value.
            //
            $this.data('pixel_to_value_mapping', pixel_to_value_mapping);
            $this.data('value_to_pixel_mapping', value_to_pixel_mapping);

            return $this;
        },
        /*
         * Remove the pixel-to-value and the value-to-pixel mappings from the
         * slider so that the slider can follow a linear step over the current
         * range again.
         */
        'unset_step_histogram' : function () {
            var $this = this;

            $this.removeData('pixel_to_value_mapping');
            $this.removeData('value_to_pixel_mapping');
            $this.removeData('last_step_histogram');

            return $this;
        },
        'set_range' : function (rangeMin, rangeMax) {
            var $this = this;

            // get the current values
            var oldMin = methods.get_current_min_value.call($this),
                oldMax = methods.get_current_max_value.call($this);
            
            // set range
            $this.data('range_min', rangeMin);
            $this.data('range_max', rangeMax);

            // try to re-center old values in the new range.
            // NOTE: this may set different values!
            _methods.set_position_from_val.call($this, oldMin, oldMax);

            /*
             * Re-highlight ranges if any are defined.
             */
            // var highlightRangeMin = $this.data('highlightedRangeMin');
            // if (typeof rangeMin === 'number') {
            //     // a highlight range is present, we must update it
            //     var highlightRangeMax = $this.data('highlightedRangeMax');
            //     methods.highlight_range.call($this, highlightRangeMin, highlightRangeMax);
            // }

            // pass old min and max in the notify_changed_implicit method, so that we
            // notify if we need to
            _methods.notify_changed_implicit.call($this, 'set_range', oldMin, oldMax);

            return $this;
        },
        /*
         * This method highlights the range of the slider apart from the
         * position of the slider grips.
         * To work well, the slider must have background color set to
         * transparent in the CSS or not set.
         */
        'highlight_range' : function(rangeMin, rangeMax) {
            var $this = this;
            var settings = $this.data('settings');

            if (typeof settings.highlight === "undefined") {
                $.error('you cannot call highlight_range if you haven\' specified the "highlight" parameter in construction!');
            }

            // avoid empty string
            if (!rangeMin) { rangeMin = 0; }
            if (!rangeMax) { rangeMax = 0; }

            // we need to map rangeMin and rangeMax into pixels.
            var leftPx = methods.value_to_px.call($this, rangeMin),
                rightPx = methods.value_to_px.call($this, rangeMax),
                barWidth = rightPx - leftPx + $this.data('left_grip_width');

            // set position
            var $highlightPanel = $this.find(
                settings.highlight.panel_selector
            );

            $highlightPanel.css('left', leftPx + "px");
            $highlightPanel.css('width', barWidth + "px");

            // keep the latest highlighted range, because if set_range is called
            // we must be able to update the highlighting.
            $this.data('highlightedRangeMin', rangeMin);
            $this.data('highlightedRangeMax', rangeMax);

            // now decide wether the handler should be highlight
            _methods.refresh_grips_style.call($this);

            return $this;
        },
        /*
         * Sets the increment rounding for the slider, see input parameters section
         * for more information.
         */
        'set_rounding' : function (rounding) {
            var $this = this;

            if (typeof rounding === 'string' && rounding.indexOf('{') > -1) {
                // probably a json string
                rounding = $.parseJSON(rounding);
            }

            $this.data('rounding', rounding);
            
            // build an array of roundings and sort it by value to facilitate search
            // when the range is going to be set.
            var roundings_array = [];
            if (typeof rounding === 'object') {
                // initial object has the form { value : range }
                var rounding_value;
                for (rounding_value in rounding) { // skip_javascript_test
                    if (rounding.hasOwnProperty(rounding_value)) {
                        var rounding_range = rounding[rounding_value];
                        roundings_array.push({ 
                            'range' : rounding_range, 
                            'value' : rounding_value 
                        });
                    }
                }

                // now sort it by rounding range
                roundings_array.sort(function (a, b) { return a.range - b.range; });

                $this.data('rounding_ranges', roundings_array);
            }
            else {
                $this.removeData('rounding_ranges');
            }

            return $this;
        },
        'get_rounding' : function () {
            var $this = this;
            return $this.data('rounding');
        },
        /*
         * This method rounds a given value to the closest integer defined
         * according to the rounding. Examples:
         * rounding: 10 v: 12.3    --> 10
         * rounding: 1 v: 12.3     --> 12
         * rounding: 10 v: 12.6    --> 13
         */
        'round_value_according_to_rounding' : function(v) {
            var $this = this;
            var rounding = _methods.get_rounding_for_value.call($this, v);

            if (rounding > 0) {
                // We bring ourselves in a space of unitary roundings. You can
                // imagine now that sliders range between a certain minimum and 
                // maximum, and we always increase/decrease of one.
                var increment = v / rounding;

                // This is the proposed value.
                var increment_int = parseInt(increment, 10);

                // delta is a positive number between 0 and 1 that tells us how
                // close is the slider to integer + 1 (i.e., the next rounding).
                // 0 means the grip is exactly on integer
                // 1 means the grip is on integer + 1.
                var delta = increment - increment_int;

                // now use delta to modify or not the current value.
                if (delta > 0.5) {
                    increment_int++; 
                }

                // we now move the 
                var rounded = increment_int * rounding;

                return rounded;
            }
            else {
                $.error('rounding must be > 0, got ' + rounding + ' instead');
            }
            return v;
        },
        /*
         * Utility function. Given a value within the range of the slider,
         * converts the value in pixels. If a value_to_pixel_mapping function
         * is defined it will be used, otherwise a linear mapping is used for
         * the conversion.
         */
        'value_to_px' : function (value) {
            var $this = this,
                value_to_pixel_mapping_func = $this.data('value_to_pixel_mapping');

            // try using non-linear mapping if it's there...
            if (typeof value_to_pixel_mapping_func !== 'undefined') {
                return value_to_pixel_mapping_func(value); 
            }

            // ... use linear mapping otherwise
            var w = _methods.getSliderWidthPx.call($this) - $this.data('left_grip_width');
            return _methods.rangemap_0_to_n.call($this, value, w);
        }
    };

    var __name__ = 'nstSlider';

    $.fn[__name__] = function(method) {
        /*
         * Just a router for method calls
         */
        if (methods[method]) {
            if (this.data('initialized') === true) {
                // call a method
                return methods[method].apply(this,
                    Array.prototype.slice.call(arguments, 1)
                );
            }
            else {
                throw new Error('method ' + method + ' called on an uninitialized instance of ' + __name__);
            }
        }
        else if (typeof method === 'object' || !method) {
            // call init, user passed the settings as parameters
            this.data('initialized', true);
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Cannot call method ' + method);
        }
    };
})(jQuery);
