jQuery-switchButton
===================

jQuery iPhone-like switch button  meant to be used on a ```<input type="checkbox">```.

This widget will replace the receiver element with an iPhone-style switch button with two states: "on" and "off". Labels
of the states are customizable, as are their presence and position. The receiver element's "checked" attribute is updated
according to the state of the switch, so that it can be used in a ```<form>```.

Demo
----

Check out the demo page here: http://olance.github.io/jQuery-switchButton/


Dependencies
------------

This is a jQuery UI plugin, so you'll need jQuery and jQuery UI.


Usage
-----

Say this is your markup:

    <form action="...">
      <label for="great">Isn't it great?!</label><input type="checkbox" name="great" id="great">
    </form>

You can transform this checkbox to a nice-looking switch button by calling ```switchButton()``` on it:

    options = { /* see below */ };
    $("input#great").switchButton(options);

By default, this will display a button with "ON" and "OFF" labels on each side of the switch. You can control this and other
parameters at initialization or by calling ```switchButton("option", "optionName", value)```.
Here are the available options:

    checked: undefined        // State of the switch

    show_labels: true         // Should we show the on and off labels?
    labels_placement: "both"  // Position of the labels: "both", "left" or "right"
    on_label: "ON"            // Text to be displayed when checked
    off_label: "OFF"          // Text to be displayed when unchecked

    width: 25                 // Width of the button in pixels
    height: 11                // Height of the button in pixels
    button_width: 12          // Width of the sliding part in pixels

    clear: true               // Should we insert a div with style="clear: both;" after the switch button?
    clear_after: null         // Override the element after which the clearing div should be inserted (null > right after the button)


Styling
-------

The button and labels are styled with a few lines of CSS in ```jquery.switchButton.css```.
Have a look at this file and fiddle with it to change the look of you switch button!

Wordpress users
---------------

Have a look at [this answer](http://wordpress.stackexchange.com/questions/108257/how-to-load-jquery-easing-script-in-wordpress/108267#108267?newreg=7700a444aabf4aadbd1819e794d1d6c4) on StackExchange to include jQuery easing functions in order to make this plugin work in Wordpress.


License
-------

Copyright (c) Olivier Lance - Released under MIT License:

> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation
> files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use,
> copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following
> conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
> OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
> HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
> WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
> OTHER DEALINGS IN THE SOFTWARE.
