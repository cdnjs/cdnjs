/**
 *  Zebra_Dialog
 *
 *  A small, compact (one JS file, no dependencies other than jQuery 1.7.0+), mobile friendly and highly configurable
 *  dialog box plugin for jQuery, meant to replace JavaScript's native "alert", "confirmation" and "prompt" dialogs.
 *
 *  Can also be used as a notification widget - when configured to show no buttons and to close automatically - for updates
 *  or errors, without distracting users from their browser experience by displaying obtrusive alerts.
 *
 *  Features:
 *
 *  -   great looks out of the box, with 3 themes included
 *  -   6 types of dialog boxes available: confirmation, information, warning, error, question and prompt
 *  -   content can also be added through AJAX calls, iFrames, or from inline elements (together with attached events)
 *  -   create modal or non-modal dialog boxes
 *  -   easily add custom buttons
 *  -   position the dialog box wherever you want - not just in the middle of the screen
 *  -   use callback functions to handle user's choice
 *  -   works on mobile devices
 *  -   works in pretty much any browser - Firefox, Chrome, Safari, Edge, Opera and Internet Explorer 7+
 *
 *  Read more {@link https://github.com/stefangabos/Zebra_Dialog/ here}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    3.0.5 (last revision: August 18, 2020)
 *  @copyright  (c) 2011 - 2020 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_Dialog
 */
(function($) {

    'use strict';

    $.Zebra_Dialog = function() {

        // so you can tell the version number even if all you have is the minified source
        this.version = '3.0.5';

        // default options
        var defaults = {

                animation_speed_hide:       250,            //  The speed, in milliseconds, by which the backdrop and the
                                                            //  dialog box will be animated when closing.
                                                            //
                                                            //  Default is 250

                animation_speed_show:       0,              //  The speed, in milliseconds, by which the dialog box will
                                                            //  fade in when appearing.
                                                            //
                                                            //  Default is 0

                auto_close:                 false,          //  The number of milliseconds after which to automatically
                                                            //  close the dialog box or FALSE to not automatically close
                                                            //  the dialog box.
                                                            //
                                                            //  Default is FALSE

                auto_focus_button:          true,           //  The index (0-based) of the button (from left to right) to
                                                            //  place the focus on when a dialog box is first shown.
                                                            //
                                                            //  Set to FALSE to disable. When set to FALSE the focus will
                                                            //  be placed on the dialog box's content so that when the
                                                            //  users presses TAB, the focus will be set on the first
                                                            //  button.
                                                            //
                                                            //  Setting this to TRUE is equivalent to setting it to 0.
                                                            //
                                                            //  Default is TRUE

                buttons:                    true,           //  Use this for localization and for adding custom buttons.
                                                            //
                                                            //  If set to TRUE, the default buttons will be used, depending
                                                            //  on the type of the dialog box: ['Ok', 'Cancel'] for "prompt",
                                                            //  "question" and "warning" types, and ['Ok'] for the other
                                                            //  dialog box types.
                                                            //
                                                            //  For custom buttons, use an array containing the captions
                                                            //  of the buttons to display: ['My button 1', 'My button 2'].
                                                            //
                                                            //  Set to FALSE if you want no buttons.
                                                            //
                                                            //  You can also add custom CSS classes, set which button's
                                                            //  callback to be triggered when the user presses ENTER while
                                                            //  inside the input box (for "prompt" dialog boxes), and/or
                                                            //  attach callback functions to individual buttons by using
                                                            //  objects in the form of:
                                                            //
                                                            //  [
                                                            //  {
                                                            //      caption: 'My button 1',
                                                            //      custom_class: 'foo',
                                                            //      default_confirmation: true,
                                                            //      callback: function() { // code }
                                                            //  },
                                                            //  {
                                                            //      caption: 'My button 2',
                                                            //      custom_class: 'bar',
                                                            //      callback: function() { // code }
                                                            //  }
                                                            //  ]
                                                            //
                                                            //  For "prompt" dialog box types use the "default_confirmation"
                                                            //  property to tell the library which button's callback to
                                                            //  trigger when the user presses ENTER while inside the input
                                                            //  box. If not set, you will *have* to handle user input via
                                                            //  the "onClose" event, or you will not be able to process
                                                            //  user input for this case.
                                                            //
                                                            //  Callback functions receive as first argument the entire
                                                            //  dialog box, as a jQuery object, and as second argument,
                                                            //  the value entered in the input box - when the dialog box
                                                            //  type is "prompt", or undefined for the other dialog types.
                                                            //
                                                            //  A callback function attached to a button is executed as
                                                            //  soon as the button is clicked rather than *after* the
                                                            //  dialog box is closed, as it is the case with the "onClose"
                                                            //  event.
                                                            //
                                                            //  A callback function returning FALSE will prevent the dialog
                                                            //  box from closing.

                center_buttons:              false,         //  When set to TRUE, the buttons will be centered instead of
                                                            //  right-aligned.
                                                            //
                                                            //  Default is FALSE

                custom_class:                false,         //  An extra class to add to the dialog box's container and to
                                                            //  the backdrop (when present).
                                                            //
                                                            //  For example, setting this value to "mycustom" and in the
                                                            //  CSS file having something like
                                                            //  .mycustom .ZebraDialog_Title { background: red }
                                                            //  would set the dialog box title's background to red.
                                                            //
                                                            //  See the CSS file for what can be changed.
                                                            //
                                                            //  Default is FALSE

                default_value:              '',             //  Default value to show in the input box when the dialog
                                                            //  box type is "prompt".
                                                            //
                                                            //  Default is "" (an empty string)

                disable_page_scrolling:     true,           //  Prevents scrolling of the page behind the dialog box, when
                                                            //  the dialog box is open.
                                                            //
                                                            //  This has effect only when the "modal" property is set to
                                                            //  TRUE.
                                                            //
                                                            //  Default is TRUE

                height:                     0,              //  By default, the height of the dialog box is automatically
                                                            //  computed in order to fit the content (but not exceed
                                                            //  viewport).
                                                            //
                                                            //  Can be specified as a numeric value (which will be interpreted
                                                            //  as a value in pixels) or as a percentage (of the viewport).
                                                            //
                                                            //  If "max_height" is set to valid value greater than 0,
                                                            //  then this property will be ignored!
                                                            //
                                                            //  Default is "0" - height is automatically set.

                keyboard:                   true,           //  When set to TRUE, pressing the ESC key will close the
                                                            //  dialog box.
                                                            //
                                                            //  Default is TRUE.

                margin:                     0,              //  Margin of the dialog box relative to the viewport's limits
                                                            //  (a single value, applied both horizontally and/or vertically)
                                                            //
                                                            //  This is used when the dialog box is stretched 100% horizontally
                                                            //  and/or vertically and "width" and "max_width" are not set
                                                            //  (when stretched horizontally) and "height" and "max_height"
                                                            //  are not set (when stretched vertically).
                                                            //
                                                            //  Can be specified as a numeric value (which will be interpreted
                                                            //  as a value in pixels) or as a percentage (of the viewport).
                                                            //
                                                            //  Default is "0" - when stretched, the dialog box sticks to
                                                            //  the viewport's limits.

                max_height:                 0,              //  The maximum height of the dialog box.
                                                            //
                                                            //  Can be specified as a numeric value (which will be interpreted
                                                            //  as a value in pixels) or as a percentage (of the viewport).
                                                            //
                                                            //  If "max_height" is set to valid value greater than 0,
                                                            //  then the "height" property will be ignored.
                                                            //
                                                            //  Default is "0" - the maximum height is the viewport's height.

                max_width:                  450,            //  The maximum width of the dialog box.
                                                            //
                                                            //  Can be specified as a numeric value (which will be interpreted
                                                            //  as a value in pixels) or as a percentage (of the viewport).
                                                            //
                                                            //  If "max_width" is set to valid value greater than 0,
                                                            //  then the "width" property will be ignored.
                                                            //
                                                            //  Default is 450.

                message:                    '',             //  The text (or HTML) to be displayed in the dialog box.
                                                            //
                                                            //  See the "source" property on how to add content via AJAX,
                                                            //  iFrames or from inline elements.

                modal:                      true,           //  When set to TRUE there will be a semitransparent backdrop
                                                            //  behind the dialog box, preventing users from clicking
                                                            //  the page's content.
                                                            //
                                                            //  Default is TRUE

                backdrop_close:             true,           //  Should the dialog box close when the backdrop is clicked?
                                                            //
                                                            //  Default is TRUE

                backdrop_opacity:           '.9',           //  The opacity of the backdrop (between 0 and 1)
                                                            //
                                                            //  Default is .9

                position:                   'center',       //  Position of the dialog box.
                                                            //
                                                            //  Can be either "center" (which would center the dialog box
                                                            //  both horizontally and vertically), or an array with 2
                                                            //  elements, in the form of
                                                            //  {'horizontal_position +/- offset', 'vertical_position +/- offset'}
                                                            //  (notice how everything is enclosed in quotes) where
                                                            //  "horizontal_position" can be "left", "right" or "center",
                                                            //  "vertical_position" can be "top", "bottom" or "center",
                                                            //  and "offset" represents an optional number of pixels to
                                                            //  add/subtract from the respective horizontal or vertical
                                                            //  position.
                                                            //
                                                            //  Positions are relative to the viewport (the area of the
                                                            //  browser that is visible to the user) and the value of the
                                                            //  "margin" property is taken into account!
                                                            //
                                                            //  Examples:
                                                            //
                                                            //  ['left + 20', 'top + 20'] would position the dialog box
                                                            //  in the top-left corner, shifted 20 pixels inside.
                                                            //
                                                            //  ['right - 20', 'bottom - 20'] would position the dialog
                                                            //  box in the bottom-right corner, shifted 20 pixels inside.
                                                            //
                                                            //  ['center', 'top + 20'] would position the dialog box in
                                                            //  center-top, shifted 20 pixels down.
                                                            //
                                                            //  Note that when the width of the viewport is less than
                                                            //  768 pixels, any arithmetics will be ignored (so, things
                                                            //  like "left + 20" will be read as just "left")
                                                            //
                                                            //  Default is "center" (equivalent with  ['center', 'center']).

                reposition_speed:           500,            //  The duration (in milliseconds) of the animation used to
                                                            //  reposition the dialog box when the browser window is resized.
                                                            //
                                                            //  Default is 500.

                show_close_button:          true,           //  When set to TRUE, a "close" button (the little "x") will
                                                            //  be shown in the upper right corner of the dialog box.
                                                            //
                                                            //  If the dialog box has a title bar then the "close" button
                                                            //  will be shown in the title bar, vertically centered and
                                                            //  respecting the right padding.
                                                            //
                                                            //  If the dialog box does not have a title bar then the "close"
                                                            //  button will be shown in the upper right corner of the body
                                                            //  of the dialog box, respecting the position related properties
                                                            //  set in the stylesheet.
                                                            //
                                                            //  Default is TRUE.

                source:                     false,          //  Add content via AJAX, iFrames or from inline elements (together
                                                            //  with the already applied events).
                                                            //
                                                            //  This property can be any of the following:
                                                            //
                                                            //  - 'ajax': object - where "object" can be an object with
                                                            //  any of the properties you'd normally use to make an AJAX
                                                            //  call in jQuery (see the description for the "settings"
                                                            //  argument at http://api.jquery.com/jQuery.ajax/), or it
                                                            //  can be a string representing a valid URL whose content to
                                                            //  be fetched via AJAX and placed inside the dialog box.
                                                            //
                                                            //  Example:
                                                            //
                                                            //  source: {'ajax': 'http://myurl.com/'}
                                                            //
                                                            //  source: {'ajax': {
                                                            //      'url':      'http://myurl.com/',
                                                            //      'cache':    false
                                                            //  }}
                                                            //
                                                            //  Note that you cannot use the "success" property as it will
                                                            //  always be overwritten by the library; use the "complete"
                                                            //  property instead, if you have to!
                                                            //
                                                            //  - 'iframe': object - where "object" can be an object where
                                                            //  property names can be valid attributes of the <iframe> tag
                                                            //  (see https://developer.mozilla.org/en-US/docs/HTML/Element/iframe),
                                                            //  or it can be a string representing a valid URL to be loaded
                                                            //  inside an iFrame and placed inside the dialog box.
                                                            //
                                                            //  iFrame's width & height are computed automatically!
                                                            //
                                                            //  Example:
                                                            //
                                                            //  source: {'iframe': 'http://myurl.com/'}
                                                            //
                                                            //  source: {'iframe': {
                                                            //      'src':          'http://myurl.com/'
                                                            //  }}
                                                            //
                                                            //  - 'inline': selector - where "element" is a jQuery element
                                                            //  from the page; the element will be copied and placed inside
                                                            //  the dialog box together with any attached events! if you just
                                                            //  want the element's inner HTML, use $('#element').html().
                                                            //
                                                            //  Example:
                                                            //
                                                            //  source: {'inline': $('#myelement')}
                                                            //
                                                            //  Default is FALSE

                title:                      '',             //  Title of the dialog box
                                                            //
                                                            //  Default is "" (an empty string - no title)

                type:                       'information',  //  Dialog box type.
                                                            //
                                                            //  Can be any of the following:
                                                            //
                                                            //  - confirmation
                                                            //  - error
                                                            //  - information
                                                            //  - question
                                                            //  - warning
                                                            //  - prompt
                                                            //
                                                            //  If you don't want an icon, set the "type" property to FALSE.
                                                            //
                                                            //  By default, the "question", "prompt" and "warning" types
                                                            //  have two buttons with the captions "Ok" and "Cancel" respectively,
                                                            //  while the other types have a single button with the caption
                                                            //  "Ok".
                                                            //
                                                            //  Default is "information".

                vcenter_short_message:      true,           //  Should messages shorter than the dialog's height be
                                                            //  vertically centered?
                                                            //
                                                            //  This property is ignored when `source` is an iFrame
                                                            //
                                                            //  Default is TRUE

                width:                      0,              //  By default, the width of the dialog box is automatically
                                                            //  computed in order to fit the content (but not exceed
                                                            //  viewport).
                                                            //
                                                            //  Can be specified as a numeric value (which will be interpreted
                                                            //  as a value in pixels) or as a percentage (of the viewport).
                                                            //
                                                            //  If "max_width" is set to valid value greater than 0,
                                                            //  then the "width" property will be ignored.
                                                            //
                                                            //  Default is "0" - width is automatically set.

                onClose:                null                //  Event fired when *after* the dialog box is closed.
                                                            //
                                                            //  For executing functions *before* the closing of the dialog
                                                            //  box, see the "buttons" attribute.
                                                            //
                                                            //  The callback function (if any) receives as first argument
                                                            //  the caption of the clicked button or boolean FALSE if the
                                                            //  dialog box is closed by pressing the ESC key, by clicking
                                                            //  the dialog box's "x" button, or by clicking the backdrop.
                                                            //  The argument can also be boolean TRUE when the dialog box
                                                            //  type is "prompt" and the ENTER key is pressed while inside
                                                            //  the input box.
                                                            //
                                                            //  As second argument, the callback function receives the value
                                                            //  entered in the input box when the dialog box type is
                                                            //  "prompt" and a button was clicked or the ENTER key was
                                                            //  pressed while inside the input box, or undefined for any
                                                            //  other case.
                                                            //
                                                            //  All this is important when expecting user input as you
                                                            //  can say that you have user input *only* when the value
                                                            //  of the first argument is boolean TRUE or the value it's
                                                            //  the same as the label of the button considered as confirmation
                                                            //  (i.e. "Ok"), and the value of the second argument is
                                                            //  !== undefined.
                                                            //
                                                            //  See the "buttons" property for another way of handling
                                                            //  user input.
            },

            // to avoid confusions, we use "plugin" to reference the current instance of the object
            plugin = this,

            // by default, we assume there are no custom options provided
            options = {},

            // we'll use this when resizing
            timeout,

            // we'll use this for "prompt" dialog boxes to handle the
            // event of the user pressing ENTER while inside the input box
            default_confirmation_button = false,

            // used when "height" or "max_height" are set
            compute_body_height = false,

            // each dialog will have it's own internal unique identifier
            // which we'll use for setting and removing event handlers on $(document) and $(window)
            id,

            /**
             *  Draw the dialog box
             *
             *  @return void
             *
             *  @access private
             */
            _draw = function() {

                var

                    // get the viewport width and height
                    viewport_width = $(window).width(),
                    viewport_height = $(window).height(),

                    // get dialog box's width and height
                    dialog_width = plugin.dialog.outerWidth(),
                    dialog_height = plugin.dialog.outerHeight(),

                    // consider a mobile device when viewport width is less than 768px
                    is_xs = viewport_width < 768,

                    values, message, message_height, container_height, margin, horizontal_margin = 0, vertical_margin = 0;

                // reset these values
                plugin.dialog_left = undefined;
                plugin.dialog_top = undefined;

                // see if margin is valid
                margin = (plugin.settings.margin + '').match(/^([0-9]+)(\%)?$/);

                // if margin is valid
                if (margin) {

                    // if margin was specified as a percentage
                    if (undefined !== margin[2]) {

                        // compute the value in pixels
                        horizontal_margin = parseInt(viewport_width * parseInt(margin[1], 10) / 100, 10);
                        vertical_margin = parseInt(viewport_height * parseInt(margin[1], 10) / 100, 10);

                    // if margin was not specified as a percentage
                    } else horizontal_margin = vertical_margin = parseInt(margin[1], 10);

                    // if converted value is not a valid number
                    if (isNaN(horizontal_margin)) horizontal_margin = vertical_margin = 0;

                }

                // the numeric representations for some constants that may exist in the "position" property
                // (with margins factored in)
                values = {

                    'left':     horizontal_margin,
                    'top':      vertical_margin,
                    'right':    viewport_width - horizontal_margin - dialog_width,
                    'bottom':   viewport_height - vertical_margin - dialog_height,
                    'center':   (viewport_width - dialog_width) / 2,
                    'middle':   (viewport_height - dialog_height) / 2

                };

                // if
                if (

                    // the position is given as an array
                    $.isArray(plugin.settings.position) &&

                    // the array has exactly two elements
                    plugin.settings.position.length === 2 &&

                    // first element is a string
                    typeof plugin.settings.position[0] === 'string' &&

                    // first element contains only "left", "right", "center", numbers, spaces, plus and minus signs
                    plugin.settings.position[0].match(/^(left|right|center)[\s0-9\+\-]*$/) &&

                    // second element is a string
                    typeof plugin.settings.position[1] === 'string' &&

                    // second element contains only "top", "bottom", "middle", "center", numbers, spaces, plus and minus signs
                    plugin.settings.position[1].match(/^(top|bottom|middle|center)[\s0-9\+\-]*$/)

                ) {

                    // make sure both entries are lowercase
                    plugin.settings.position[0] = plugin.settings.position[0].toLowerCase();
                    plugin.settings.position[1] = plugin.settings.position[1].toLowerCase();

                    // allow for "center" to be used for vertical position also
                    if (plugin.settings.position[1] === 'center') plugin.settings.position[1] = 'middle';

                    // iterate through the array of replacements
                    $.each(values, function(index, value) {

                        var i, tmp, original_value;

                        // we need to check both the horizontal and vertical values
                        for (i = 0; i < 2; i++) {

                            // if are on a small screen size, we ignore any arithmetics
                            original_value = is_xs ? plugin.settings.position[i].replace(/[0-9\+\-\s]/g, '') : plugin.settings.position[i];

                            // replace if there is anything to be replaced
                            tmp = original_value.replace(index, value);

                            // if anything could be replaced
                            if (tmp !== original_value)

                                // evaluate string as a mathematical expression and set the appropriate value
                                if (i === 0) plugin.dialog_left = _eval(tmp); else plugin.dialog_top = _eval(tmp);

                        }

                    });

                }

                // if "dialog_left" and/or "dialog_top" values are still not set
                if (undefined === plugin.dialog_left || undefined === plugin.dialog_top) {

                    // the dialog box will be in its default position, centered
                    plugin.dialog_left = values.center;
                    plugin.dialog_top = values.middle;

                }

                // make sure top is not negative
                if (plugin.dialog_top < vertical_margin) plugin.dialog_top = vertical_margin;

                // if dialog height exceeds screen's height
                if (dialog_height + vertical_margin > viewport_height - (vertical_margin * 2))

                    // adjust the dialog box's body height so that it fits
                    plugin.body.css('height', viewport_height - (vertical_margin * 2) -
                        ($('.ZebraDialog_Title', plugin.dialog).length ? $('.ZebraDialog_Title', plugin.dialog).outerHeight() : 0) -
                        ($('.ZebraDialog_Buttons', plugin.dialog).length ? $('.ZebraDialog_Buttons', plugin.dialog).outerHeight() : 0) -
                        (parseFloat(plugin.body.css('marginTop')) || 0) -
                        (parseFloat(plugin.body.css('marginBottom')) || 0) -
                        (parseFloat(plugin.body.css('paddingTop')) || 0) -
                        (parseFloat(plugin.body.css('paddingBottom')) || 0) -
                        (parseFloat(plugin.body.css('borderTopWidth')) || 0) -
                        (parseFloat(plugin.body.css('borderBottomWidth')) || 0)
                    );

                // if dialog has "height" or "max_height" set
                // adjust the dialog box's body height
                else if (compute_body_height)

                    plugin.body.css('height', plugin.dialog.height() -
                        ($('.ZebraDialog_Title', plugin.dialog).length ? $('.ZebraDialog_Title', plugin.dialog).outerHeight() : 0) -
                        ($('.ZebraDialog_Buttons', plugin.dialog).length ? $('.ZebraDialog_Buttons', plugin.dialog).outerHeight() : 0) -
                        (parseFloat(plugin.body.css('marginTop')) || 0) -
                        (parseFloat(plugin.body.css('marginBottom')) || 0) -
                        (parseFloat(plugin.body.css('paddingTop')) || 0) -
                        (parseFloat(plugin.body.css('paddingBottom')) || 0) -
                        (parseFloat(plugin.body.css('borderTopWidth')) || 0) -
                        (parseFloat(plugin.body.css('borderBottomWidth')) || 0)
                    );

                // if content is in an iFrame
                if (plugin.iframe)

                    // see "overflow: hidden" to the body element
                    plugin.body.css('overflow', 'hidden');

                // if short messages are to be centered vertically
                if (plugin.settings.vcenter_short_message) {

                    // the secondary container - the one that contains the message
                    message = plugin.body.find('div:first');

                    // the height of the secondary container
                    message_height = message.height();

                    // the main container's height
                    container_height = plugin.body.height();

                    // if we need to center the message vertically
                    if (message_height < container_height)

                        // center the message vertically
                        message.css('padding-top', (container_height - message_height) / 2);

                }

                // if dialog box is to be placed without animation
                if ((typeof arguments[0] === 'boolean' && arguments[0] === false) || plugin.settings.reposition_speed === 0)

                    // position the dialog box and make it visible
                    plugin.dialog.css({

                        'left':         plugin.dialog_left,
                        'top':          plugin.dialog_top,
                        'visibility':   'visible',
                        'opacity':      0

                    // (notice that we use the opacity's value as string - this is required for working with IE8
                    // see https://stackoverflow.com/questions/4987842/jquery-on-ie8-error-object-doesnt-support-this-property-or-method)
                    }).animate({'opacity': '1'}, plugin.settings.animation_speed_show);

                // if dialog box is to be animated into position
                else {

                    // stop any ongoing animation
                    // (or animations will queue up when manually resizing the window)
                    plugin.dialog.stop(true);

                    plugin.dialog.css('visibility', 'visible').animate({
                        'left': plugin.dialog_left,
                        'top':  plugin.dialog_top
                    }, plugin.settings.reposition_speed);

                }

                // only do it when we initialize the dialog and not also on resizing because otherwise, if there is an
                // input in the dialog and the input receives focus on mobile, the virtual keyboard will show up and will
                // trigger this method again which would remove the focus and, therefore, the virtual keyboard, making
                // it impossible to give focus to the input element
                if (undefined === timeout)

                    // if we have to set focus to one of the buttons
                    if (plugin.settings.auto_focus_button !== false)

                        // move the focus to the first of the dialog box's buttons
                        plugin.dialog.find('a[class^=ZebraDialog_Button]').eq(plugin.settings.auto_focus_button === true ? 0 : plugin.settings.auto_focus_button).focus();

                    // if we do not want to set focus to one of the buttons
                    // do this kind of a trick to set the focus to the content
                    // (so that pressing tab gets you to the first button)
                    else plugin.body.attr('tabindex', 1).focus().removeAttr('tabindex');

            },

            /**
             *  Returns an array containing the buttons that are to be added to the dialog box.
             *
             *  If no custom buttons are specified, the returned array depends on the type of the dialog box.
             *
             *  @return array       Returns an array containing the buttons that are to be added to the dialog box.
             *
             *  @access private
             */
            _get_buttons = function() {

                // if plugin.settings.buttons is not TRUE and is not an array either, don't go further
                if (plugin.settings.buttons !== true && !$.isArray(plugin.settings.buttons)) return false;

                // if default buttons are to be used
                if (plugin.settings.buttons === true)

                    // there are different buttons for different dialog box types
                    switch (plugin.settings.type) {

                        // for "question" type
                        case 'question':
                        case 'warning':
                        case 'prompt':

                            // there are two buttons
                            plugin.settings.buttons = ['Ok', 'Cancel'];

                            break;

                        // for the other types
                        default:

                            // there is only one button
                            plugin.settings.buttons = ['Ok'];

                    }

                // return the buttons
                return plugin.settings.buttons;

            },

            /**
             *  Returns the scrollbar's width.
             *
             *  Solution taken from https://stackoverflow.com/a/13382873/1542774
             */
            _get_scrollbar_width = function() {

                var

                    // create an invisible container
                    outer = $('<div>').css({
                        visibility: 'hidden',
                        overflow: 'scroll',             // forces scrollbar
                        msOverflowStyle: 'scrollbar'    // required for WinJS apps
                    }).appendTo($('body')),

                    // create inner element and place in container
                    inner = $('<div>').appendTo(outer),

                    // compute difference between container's full width and the child's width
                    scroll_width = outer.outerWidth() - inner.outerWidth();

                // remove elements from DOM
                outer.remove();
                inner.remove();

                return scroll_width;

            },

            /**
             *  Returns the type of the dialog box, or FALSE if type is not one of the six known types.
             *
             *  Values that may be returned by this method are:
             *  -   Confirmation
             *  -   Error
             *  -   Information
             *  -   Question
             *  -   Warning
             *  -   Prompt
             *
             *  @return boolean     Returns the type of the dialog box, or FALSE if type is not one of the six known types.
             *
             *  @access private
             */
            _get_type = function() {

                // see what is the type of the dialog box
                switch (plugin.settings.type) {

                    // if one of the six supported types
                    case 'confirmation':
                    case 'error':
                    case 'information':
                    case 'question':
                    case 'warning':
                    case 'prompt':

                        // return the dialog box's type, first letter capital
                        return plugin.settings.type.charAt(0).toUpperCase() + plugin.settings.type.slice(1).toLowerCase();

                    // if unknown type
                    default:

                        // return FALSE
                        return false;

                }

            },

            /**
             *  Evaluates a string as a mathematical expression
             *
             *  Based on this answer https://stackoverflow.com/questions/2276021/evaluating-a-string-as-a-mathematical-expression-in-javascript/44282109#44282109
             *
             *  @access private
             */
            _eval = function(source) {
                var total = 0;

                source = source.replace(/\s/g, '').match(/[+\-]?([0-9\.\s]+)/g) || [];
                while (source.length) total += parseFloat(source.shift());

                return total;
            };

        // this will hold the merged default, and user-provided options
        plugin.settings = {};

        // if plugin is initialized so that first argument is a string
        // that string is the message to be shown in the dialog box
        if (typeof arguments[0] === 'string') options.message = arguments[0];

        // if plugin is initialized so that first or second argument is an object
        if (typeof arguments[0] === 'object' || typeof arguments[1] === 'object')

            // extend the options object with the user-provided options
            options = $.extend(options, (typeof arguments[0] === 'object' ? arguments[0] : arguments[1]));

        /**
         *  Constructor method
         *
         *  @return object  Returns a reference to the plugin
         */
        plugin.init = function() {

            var ajax_options, button_bar, buttons, canvas, $container = $('body'), default_options, iframe_options,
                len, max_zindex = 0, spinner, $title, tmp, type;

            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            // iterate over the already existing dialogs on the page
            $('.ZebraDialog').each(function() {

                // get the dialog box's zIndex
                var zIndex = parseInt($(this).css('zIndex'), 10);

                // if a zIndex is set and it is more than what we have, use that as reference from now on
                if (zIndex && zIndex > max_zindex) max_zindex = zIndex;

            });

            // if dialog box is modal
            if (plugin.settings.modal) {

                // create the backdrop
                plugin.backdrop = $('<div>', {

                    'class':    'ZebraDialogBackdrop' +

                    // any custom classes
                    (plugin.settings.custom_class ? ' ' + plugin.settings.custom_class : '')

                // set some css properties of the backdrop
                }).css({

                    'position': 'fixed',
                    'left':     0,                                      //  the backdrop starts at the top-left corner of the
                    'top':      0,                                      //  browser window (later on we'll stretch it)
                    'opacity':  plugin.settings.backdrop_opacity + ''   //  set the backdrop's opacity (also we need to specify it
                                                                        //  as a string)

                });

                // if there are already open modals
                if (max_zindex > 0) {

                    // make the current modal dialog's backdrop have a higher zIndex value than that of the others
                    plugin.backdrop.css('zIndex', max_zindex + 1);

                    // iterate over the other existing backdrops
                    $('.ZebraDialogBackdrop').each(function() {

                        var $this = $(this);

                        // if we did not already do this before
                        if (!$this.data('ZebraDialog_opacity'))

                            $this

                                // ...store current opacity
                                .data('ZebraDialog_opacity', $this.css('opacity'))

                                // and set opacity to 0
                                .css('opacity', 0);

                    });

                    // iterate over the existing dialogs
                    $('.ZebraDialog').each(function() {

                        // set a flag used to "mute" the event handler for when the ESC key is pressed
                        // (otherwise when pressing ESC all the dialog boxes would close not just the one on top)
                        $(this).data('ZebraDialog_MuteESC', true);

                    });

                }

                // if dialog box can be closed by clicking the backdrop
                if (plugin.settings.backdrop_close)

                    // when the backdrop is clicked
                    // remove the backdrop and the dialog box from the DOM
                    plugin.backdrop.on('click', function() { plugin.close(); });

                // append the backdrop to the DOM
                plugin.backdrop.appendTo($container);

                // if page scrolling needs to be disabled while the dialog is open, the page has vertical scrolling, and this has not already been taken care of by an already open modal
                if (plugin.settings.disable_page_scrolling && window.innerWidth > document.body.clientWidth && !$container.hasClass('ZebraDialog_NoScroll'))

                    // prevent body from scrolling
                    $container
                        .data('ZebraDialog_vScroll', window.pageYOffset)
                        .css({
                            right: _get_scrollbar_width(),
                            top: -1 * $(window).scrollTop()
                        })
                        .addClass('ZebraDialog_NoScroll');

            }

            // create the dialog box
            plugin.dialog = $('<div>', {

                'class':    'ZebraDialog' +

                            // any custom classes
                            (plugin.settings.custom_class ? ' ' + plugin.settings.custom_class : '') +

                            // flag if dialog is not modal
                            (!plugin.settings.modal ? ' ZebraDialog_NotModal' : '') +

                            // the type, if required
                            (_get_type() !== false ? ' ZebraDialog_Icon ZebraDialog_' + _get_type() : '')

            // set some css properties of the dialog box
            }).css({

                'position':     'fixed',
                'left':         0,                                      //  by default, place it in the top-left corner of the
                'top':          0,                                      //  browser window (we'll position it later)
                'visibility':   'hidden'                                //  the dialog box is hidden for now

            });

            // if other dialogs already exist on the page, set the zIndex of this one higher
            if (max_zindex > 0) plugin.dialog.css('zIndex', max_zindex + 1);

            // assign an internal unique identifier
            id = Math.floor(Math.random() * 9999999);

            // see if "width" is valid
            tmp = (plugin.settings.width + '').match(/^([0-9]+)(\%)?$/);

            // if "width" is valid
            if (tmp) {

                // if "width" was specified as a percentage
                if (undefined !== tmp[2])

                    // compute the value in pixels
                    tmp = parseInt(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * parseInt(tmp[1], 10) / 100, 10);

                // if "width" was not specified as a percentage
                else tmp = parseInt(tmp[1], 10);

                // if converted value is a valid number, greater than 0
                // set the dialog box's width
                if (!isNaN(tmp) && tmp > 0) plugin.dialog.css('width', tmp);

            }

            // if "width" was not specified, was 0, or it was invalid
            if (isNaN(tmp) || tmp === 0) {

                // see if "max_width" is valid
                tmp = (plugin.settings.max_width + '').match(/^([0-9]+)(\%)?$/);

                // if "max_width" is valid
                if (tmp) {

                    // if "max_width" was specified as a percentage
                    if (undefined !== tmp[2])

                        // compute the value in pixels
                        tmp = parseInt(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * parseInt(tmp[1], 10) / 100, 10);

                    // if "max_width" was not specified as a percentage
                    else tmp = parseInt(tmp[1], 10);

                    // if converted value is a valid number, greater than 0
                    // set the dialog box's max_width
                    if (!isNaN(tmp) && tmp > 0) plugin.dialog.css('max-width', tmp);

                }

            }

            // see if "height" is valid
            tmp = (plugin.settings.height + '').match(/^([0-9]+)(\%)?$/);

            // if "height" is valid
            if (tmp) {

                // if "height" was specified as a percentage
                if (undefined !== tmp[2])

                    // compute the value in pixels
                    tmp = parseInt(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * parseInt(tmp[1], 10) / 100, 10);

                // if "height" was not specified as a percentage
                else tmp = parseInt(tmp[1], 10);

                // if converted value is a valid number, greater than 0
                if (!isNaN(tmp) && tmp > 0) {

                    // set the dialog box's height
                    plugin.dialog.css('height', tmp);

                    // set flag
                    compute_body_height = true;

                }

            }

            // if "max_height" was not specified, was 0, or it was invalid
            if (isNaN(tmp) || tmp === 0) {

                // see if "max_height" is valid
                tmp = (plugin.settings.max_height + '').match(/^([0-9]+)(\%)?$/);

                // if "max_height" is valid
                if (tmp) {

                    // if "max_height" was specified as a percentage
                    if (undefined !== tmp[2])

                        // compute the value in pixels
                        tmp = parseInt(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * parseInt(tmp[1], 10) / 100, 10);

                    // if "max_height" was not specified as a percentage
                    else tmp = parseInt(tmp[1], 10);

                    // if converted value is a valid number, greater than 0
                    if (!isNaN(tmp) && tmp > 0) {

                        // set the dialog box's max_height
                        plugin.dialog.css('max-height', tmp);

                        // set flag
                        compute_body_height = true;

                    }

                }

            }

            // if dialog box has a title
            if (plugin.settings.title)

                // create the title
                $title = $('<h3>', {

                    'class':    'ZebraDialog_Title'

                // set the title's text
                // and append the title to the dialog box
                }).html(plugin.settings.title).appendTo(plugin.dialog);

            // if dialog box doesn't have a title
            else plugin.dialog.addClass('ZebraDialog_NoTitle');

            // this property is always false for iFrames
            // as iFrames strecth to 100% of the available height
            if (undefined !== plugin.settings.source.iframe) plugin.settings.vcenter_short_message = false;

            // create the container of the actual message
            // we save it as a reference because we'll use it later in the "draw" method
            // if the "vcenter_short_message" property is TRUE
            plugin.body = $('<div>', {

                // if a known dialog box type is specified, also show the appropriate icon
                'class':    'ZebraDialog_Body'

            });

            // if dialog type is "prompt"
            if (plugin.settings.type === 'prompt')

                // add input box
                plugin.settings.message += '<input type="text" name="ZebraDialog_Prompt_Input" value="' + plugin.settings.default_value + '" class="ZebraDialog_Prompt_Input">';

            // if short messages are to be centered vertically
            if (plugin.settings.vcenter_short_message)

                // create a secondary container for the message and add everything to the message container
                // (we'll later align the container vertically)
                $('<div>').html(plugin.settings.message).appendTo(plugin.body);

            // if short messages are not to be centered vertically
            else

                // add the message to the message container
                plugin.body.html(plugin.settings.message);

            // if dialog type is "prompt"
            if (plugin.settings.type === 'prompt') {

                // get a reference to the newly created input box
                plugin.settings.message = $('.ZebraDialog_Prompt_Input', plugin.body);

                // handle key presses on the input box
                $('.ZebraDialog_Prompt_Input', plugin.body).on('keypress', function(e) {

                    // if ENTER is pressed, close the dialog and return the input box's content
                    if (e.keyCode === 13)

                        // if a default confirmation button exists, trigger its click event
                        if (default_confirmation_button) default_confirmation_button.trigger('click');

                        // otherwise close the dialog now
                        else plugin.close(true, this.value);

                });

            }

            // if dialog box content is to be fetched from an external source
            if (plugin.settings.source && typeof plugin.settings.source === 'object') {

                // the object where the content will be injected into
                canvas = (plugin.settings.vcenter_short_message ? $('div:first', plugin.body) : plugin.body);

                // let's see what type of content we need
                for (type in plugin.settings.source)

                    switch (type) {

                        // if we have to fetch content using an AJAX call
                        case 'ajax':

                            // prepare the options for the AJAX call
                            ajax_options = typeof plugin.settings.source[type] === 'string' ? {'url': plugin.settings.source[type]} : plugin.settings.source[type];

                            // create the animated spinner and show it
                            spinner = $('<div>').attr('class', 'ZebraDialog_Spinner').appendTo(canvas);

                            // handle the "success" event
                            ajax_options.success = function(result) {

                                // remove the spinner
                                spinner.remove();

                                // append new content
                                canvas.append(result);

                                // reposition the dialog box
                                _draw(false);

                            };

                            // make the AJAX call
                            $.ajax(ajax_options);

                            break;

                        // if we have to show an iFrame
                        case 'iframe':

                            // these are the default options
                            // we are setting the height in the "_draw" method
                            default_options = {
                                'width':        '100%',
                                'height':       '100%',
                                'marginheight': '0',
                                'marginwidth':  '0',
                                'frameborder':  '0'
                            };

                            // extend the default options with the ones provided by the user, if any
                            iframe_options = $.extend(default_options, typeof plugin.settings.source[type] === 'string' ? {'src': plugin.settings.source[type]} : plugin.settings.source[type]);

                            // create the iFrame
                            plugin.iframe = $('<iframe>').attr(iframe_options).on('load', function() {

                                // remove the spinner when the iFrame is done loading
                                $('.ZebraDialog_Spinner', plugin.body).remove();

                            });

                            // add spinner while the iFrame loads
                            plugin.body.append($('<div>').addClass('ZebraDialog_Spinner ZebraDialog_iFrame'));

                            // place iFrame inside the dialog box
                            canvas.append(plugin.iframe);

                            break;

                        // if content is to be taken from an inline element
                        case 'inline':

                            // copy content and place it inside the dialog box
                            canvas.append(plugin.settings.source[type]);

                            break;

                    }

            }

            // add the message container to the dialog box
            plugin.body.appendTo(plugin.dialog);

            // get the buttons that are to be added to the dialog box
            buttons = _get_buttons();

            // if there are any buttons to be added to the dialog box
            if (buttons) {

                // create the button bar
                button_bar = $('<div>', {

                    'class':    'ZebraDialog_Buttons'

                // append it to the dialog box
                }).appendTo(plugin.dialog);

                // iterate through the buttons that are to be attached to the dialog box
                $.each(buttons, function(index, value) {

                    // create button
                    var button = $('<a>', {

                        'href':     'javascript:void(0)',
                        'class':    'ZebraDialog_Button_' + index + (undefined !== value.custom_class && value.custom_class.toString().trim() !== '' ? ' ' + value.custom_class : '')

                    });

                    // if button is given as an object, with a caption and a callback function
                    // set the button's caption
                    if (undefined !== value.caption) button.html(value.caption);

                    // if button is given as a plain string, set the button's caption accordingly
                    else button.html(value);

                    // handle the button's click event
                    button.on('click', function() {

                        var
                            // by default, clicking a button closes the dialog box
                            close = true,

                            // the value of the input box is sent only when the "Ok" button is clicked
                            // we always scan the DOM for the input element for the case when the dialog box's content was altered at run-time
                            input = plugin.settings.type === 'prompt' && $('.ZebraDialog_Prompt_Input', plugin.body).length ? $('.ZebraDialog_Prompt_Input', plugin.body).val() : undefined;

                        // execute the callback function when button is clicked
                        if (undefined !== value.callback) close = value.callback(plugin.dialog, input);

                        // if dialog box is to be closed
                        if (close !== false)

                            // remove the backdrop and the dialog box from the DOM
                            // and pass the clicked button's label as argument
                            plugin.close(undefined !== value.caption ? value.caption : value, input);

                    });

                    // append the button to the button bar
                    button.appendTo(button_bar);

                    // if we have the "default_confirmation" property set for this button
                    if (undefined !== value.default_confirmation && value.default_confirmation)

                        // cache it for later
                        // (it is used by the "prompt" dialog box type when the user presses ENTER while inside
                        // the input box)
                        default_confirmation_button = button;

                });

                // center buttons if needed
                if (plugin.settings.center_buttons) button_bar.addClass('ZebraDialog_Buttons_Centered');

            // if the dialog box has no button
            } else plugin.dialog.addClass('ZebraDialog_NoButtons');

            // insert the dialog box in the DOM
            plugin.dialog.appendTo($container);

            // if we need to show the little "x" for closing the dialog box, in the top-right corner
            if (plugin.settings.show_close_button)

                // create the button now and append it to the dialog box's title, or to the dialog box's body if there's no title
                $('<a href="javascript:void(0)" class="ZebraDialog_Close">&times;</a>').on('click', function(e) {

                    e.preventDefault();
                    plugin.close();

                }).appendTo($title || plugin.body);

            // if the dialog has no "x" button
            else plugin.dialog.addClass('ZebraDialog_NoCloseButton');

            // if the browser window is resized
            $(window).on('resize.ZebraDialog_' + id, function() {

                // clear a previously set timeout
                // this will ensure that the next piece of code will not be executed on every step of the resize event
                clearTimeout(timeout);

                // set a small timeout before doing anything
                timeout = setTimeout(function() {

                    // reposition the dialog box
                    _draw();

                }, 100);

            });

            // if dialog box can be closed by pressing the ESC key
            if (plugin.settings.keyboard)

                // if a key is pressed
                $(document).on('keyup.ZebraDialog_' + id, function(e) {

                    // if this is not the modal that we are closing, ignore
                    if (plugin.dialog.data('ZebraDialog_MuteESC')) return;

                    // if pressed key is ESC
                    // remove the backdrop and the dialog box from the DOM
                    if (e.which === 27) plugin.close();

                    // let the event bubble up
                    return true;

                });

            // if plugin is to be closed automatically after a given number of milliseconds
            if (plugin.settings.auto_close !== false) {

                // if, in the meantime, the box is clicked
                plugin.dialog.on('click', function() {

                    // stop the timeout
                    clearTimeout(plugin.timeout);

                    // close the box now
                    plugin.close();

                });

                // call the "close" method after the given number of milliseconds
                plugin.timeout = setTimeout(plugin.close, plugin.settings.auto_close);

            }

            // draw the backdrop and the dialog box
            // (no animation)
            _draw(false);

            // if dialog type is "prompt"
            if (plugin.settings.type === 'prompt') {

                // move focus to the input box
                $('.ZebraDialog_Prompt_Input', plugin.body).focus();

                // if a default value is set
                if (plugin.settings.default_value !== '')

                    //  move cursor to the end of the default text
                    //  https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/

                    // if "setSelectionRange" function exists... (IE 9+)
                    if (plugin.settings.message.get(0).setSelectionRange) {

                        // double the message's length because Opera is inconsistent about whether a carriage return is
                        // one character or two
                        len = plugin.settings.default_value.length * 2;

                        // timeout seems to be required for Blink
                        setTimeout(function() {
                            plugin.settings.message.get(0).setSelectionRange(len, len);
                        }, 1);

                    // if "setSelectionRange" function does not exist...
                    } else

                        // as a fallback, replace the contents with itself
                        // doesn't work in Chrome, but Chrome has "setSelectionRange"
                        plugin.settings.message.val(plugin.settings.default_value);

            }

            // return a reference to the object itself
            return plugin;

        };

        /**
         *  Close the dialog box
         *
         *  @return void
         */
        plugin.close = function(caption, input) {

            var animation_speed = plugin.settings.animation_speed_hide,
                backdrops = $('.ZebraDialogBackdrop'),
                dialogs = $('.ZebraDialog'),
                $body = $('body'),
                backdrop,
                backdrop_count = backdrops.length;

            // remove global event handlers set by the plugin
            $(document).off('.ZebraDialog_' + id);
            $(window).off('.ZebraDialog_' + id);

            // if we are closing a modal dialog and a backdrop exists
            if (plugin.settings.modal && plugin.backdrop) {

                // if there are multiple dialogs open and we are closing the top one
                if (backdrop_count > 1 && $(backdrops[backdrop_count - 1]).is(plugin.backdrop)) {

                    // get the backdrop beneath the one we are closing
                    backdrop = $(backdrops[backdrop_count - 2]);

                    // set its opacity back to what it was before
                    backdrop.css('opacity', backdrop.data('ZebraDialog_opacity')).removeData('ZebraDialog_opacity');

                    // we'll use no animation speed in this case
                    animation_speed = 0;

                    // un-mute handling of ESC key on the dialog that sits beneath the one we're about to hide
                    $(dialogs[backdrop_count - 2]).removeData('ZebraDialog_MuteESC');

                // if this is the last open modal dialog
                // and page scrolling was disabled while modal dialogs are open
                } else if (backdrop_count === 1 && $body.hasClass('ZebraDialog_NoScroll')) {

                    // remove changes done to the page's <body>
                    $body.removeClass('ZebraDialog_NoScroll').css({
                        right: '',
                        top: '',
                        height: ''
                    });

                    // adjust the page's vertical scroll to its initial state
                    $(window).scrollTop($body.data('ZebraDialog_vScroll'));

                }

                // remove event now in order to prevent issues with multiple fast clicks on the backdrop
                plugin.backdrop.off('click')

                    // animate backdrop's css properties
                    // (notice that we use the opacity's value as string - this is required for working with IE8
                    // see https://stackoverflow.com/questions/4987842/jquery-on-ie8-error-object-doesnt-support-this-property-or-method)
                    .animate({

                        opacity: '0'    // fade out the backdrop

                    },

                    // animation speed
                    animation_speed,

                    // when the animation is complete
                    function() {

                        // remove the backdrop from the DOM
                        plugin.backdrop.remove();

                    });

            }

            // animate dialog box's css properties
            // (notice that we use the values for the animation's properties as strings; this is required for working with IE8
            // see https://stackoverflow.com/questions/4987842/jquery-on-ie8-error-object-doesnt-support-this-property-or-method)
            plugin.dialog.animate({

                top: '0',       // move the dialog box to the top
                opacity: '0'    // fade out the dialog box

            },

            // animation speed
            plugin.settings.animation_speed_hide,

            // when the animation is complete
            function() {

                // remove the dialog box from the DOM
                plugin.dialog.remove();

                // if a callback function exists for when closing the dialog box
                if (plugin.settings.onClose && typeof plugin.settings.onClose === 'function')

                    // execute the callback function
                    plugin.settings.onClose(undefined !== caption ? caption : '', input);

            });

        };

        /**
         *  Updates the dialog box's position on the screen. Useful if you add content at run-time.
         *
         *  @return void
         */
        plugin.update = function() {

            // clear a previously set timeout
            // this will ensure that the next piece of code will not be executed on every step of the resize event
            clearTimeout(timeout);

            // set a small timeout before doing anything
            timeout = setTimeout(function() {

                // reposition the dialog box
                _draw();

            }, 100);

        };

        // fire up the plugin!
        // call the "constructor" method
        return plugin.init();

    };

})(jQuery);
