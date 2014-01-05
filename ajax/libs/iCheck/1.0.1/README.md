# [iCheck plugin](http://fronteed.com/iCheck/) <sup>[1.0.1](#december-19-2013)</sup>
#### Highly customizable checkboxes and radio buttons for jQuery and Zepto.

Refer to the [iCheck website](http://fronteed.com/iCheck/) for examples.

![Skins](http://fronteed.com/iCheck/examples.png)


Features
--------

* **Identical inputs across different browsers and devices** — both [desktop and mobile](#browser-support)
* **Touch devices support** — iOS, Android, BlackBerry, Windows Phone, Amazon Kindle
* **Keyboard accessible inputs** — `Tab`, `Spacebar`, `Arrow up/down` and other shortcuts
* **Customization freedom** — use any HTML and CSS to style inputs (try [6 Retina-ready skins](http://fronteed.com/iCheck/))
* **jQuery and Zepto** JavaScript libraries support from single file
* **Screenreader accessible inputs** &mdash; [ARIA](https://developer.mozilla.org/en-US/docs/Accessibility/ARIA) attributes for VoiceOver and others
* **Lightweight size** — 1 kb gzipped

-----

* [32 options](#options) to customize checkboxes and radio buttons
* [11 callbacks](#callbacks) to handle changes
* [9 methods](#methods) to make changes programmatically
* Saves changes to original inputs, [works carefully](#initialize) with any selectors


How it works
------------

iCheck works with checkboxes and radio buttons like a constructor. **It wraps each input with a div**, which may be customized by you or using one of the [available skins](http://fronteed.com/iCheck/). You may also place inside that div some HTML code or text using `insert` option.

For this HTML:

```html
<label>
  <input type="checkbox" name="quux[1]" disabled>
  Foo
</label>

<label for="baz[1]">Bar</label>
<input type="radio" name="quux[2]" id="baz[1]" checked>

<label for="baz[2]">Bar</label>
<input type="radio" name="quux[2]" id="baz[2]">
```

With default options you'll get nearly this:

```html
<label>
  <div class="icheckbox disabled">
    <input type="checkbox" name="quux[1]" disabled>
  </div>
  Foo
</label>

<label for="baz[1]">Bar</label>
<div class="iradio checked">
  <input type="radio" name="quux[2]" id="baz[1]" checked>
</div>

<label for="baz[2]">Bar</label>
<div class="iradio">
  <input type="radio" name="quux[2]" id="baz[2]">
</div>
```

**By default, iCheck doesn't provide any CSS styles for wrapper divs** (if you don't use [skins](http://fronteed.com/iCheck/)).


Options
-------

These options are default:

```js
{
  // 'checkbox' or 'radio' to style only checkboxes or radio buttons, both by default
  handle: '',

  // base class added to customized checkboxes
  checkboxClass: 'icheckbox',

  // base class added to customized radio buttons
  radioClass: 'iradio',

  // class added on checked state (input.checked = true)
  checkedClass: 'checked',

    // if not empty, used instead of 'checkedClass' option (input type specific)
    checkedCheckboxClass: '',
    checkedRadioClass: '',

  // if not empty, added as class name on unchecked state (input.checked = false)
  uncheckedClass: '',

    // if not empty, used instead of 'uncheckedClass' option (input type specific)
    uncheckedCheckboxClass: '',
    uncheckedRadioClass: '',

  // class added on disabled state (input.disabled = true)
  disabledClass: 'disabled',

    // if not empty, used instead of 'disabledClass' option (input type specific)
    disabledCheckboxClass: '',
    disabledRadioClass: '',

  // if not empty, added as class name on enabled state (input.disabled = false)
  enabledClass: '',

    // if not empty, used instead of 'enabledClass' option (input type specific)
    enabledCheckboxClass: '',
    enabledRadioClass: '',

  // class added on indeterminate state (input.indeterminate = true)
  indeterminateClass: 'indeterminate',

    // if not empty, used instead of 'indeterminateClass' option (input type specific)
    indeterminateCheckboxClass: '',
    indeterminateRadioClass: '',

  // if not empty, added as class name on determinate state (input.indeterminate = false)
  determinateClass: '',

    // if not empty, used instead of 'determinateClass' option (input type specific)
    determinateCheckboxClass: '',
    determinateRadioClass: '',

  // class added on hover state (pointer is moved onto input)
  hoverClass: 'hover',

  // class added on focus state (input has gained focus)
  focusClass: 'focus',

  // class added on active state (mouse button is pressed on input)
  activeClass: 'active',

  // adds hoverClass to customized input on label hover and labelHoverClass to label on input hover
  labelHover: true,

    // class added to label if labelHover set to true
    labelHoverClass: 'hover',

  // increase clickable area by given % (negative number to decrease)
  increaseArea: '',

  // true to set 'pointer' CSS cursor over enabled inputs and 'default' over disabled
  cursor: false,

  // set true to inherit original input's class name
  inheritClass: false,

  // if set to true, input's id is prefixed with 'iCheck-' and attached
  inheritID: false,

  // set true to activate ARIA support
  aria: false,

  // add HTML code or text inside customized input
  insert: ''
}
```

There's no need to copy and paste all of them, you can just mention the ones you need:

```js
$('input').iCheck({
  labelHover: false,
  cursor: true
});
```

You can choose any class names and style them as you want.


Initialize
----------

Just include `icheck.js` after [jQuery v1.7+](http://jquery.com) (or [Zepto](http://github.com/madrobby/zepto#zepto-modules) [polyfill, event, data]).

iCheck supports any selectors, but handles only checkboxes and radio buttons:

```js
// customize all inputs (will search for checkboxes and radio buttons)
$('input').iCheck();

// handle inputs only inside $('.block')
$('.block input').iCheck();

// handle only checkboxes inside $('.test')
$('.test input').iCheck({
  handle: 'checkbox'
});

// handle .vote class elements (will search inside the element, if it's not an input)
$('.vote').iCheck();

// you can also change options after inputs are customized
$('input.some').iCheck({
  // different options
});
```

Indeterminate
---------

HTML5 allows specifying [indeterminate](http://css-tricks.com/indeterminate-checkboxes/) ("partially" checked) state for checkboxes. iCheck supports this for both checkboxes and radio buttons.

You can make an input indeterminate through HTML using additional attributes (supported by iCheck). Both do the same job, but `indeterminate="true"` may not work in some browsers (like IE7):

```html
indeterminate="true"
<input type="checkbox" indeterminate="true">
<input type="radio" indeterminate="true">

determinate="false"
<input type="checkbox" determinate="false">
<input type="radio" determinate="false">
```

`indeterminate` and `determinate` [methods](#methods) can be used to toggle indeterminate state.

Callbacks
---------

iCheck provides plenty callbacks, which may be used to handle changes.

<table>
  <thead>
    <tr>
      <th>Callback name</th>
      <th>When used</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ifClicked</td>
      <td>user clicked on a customized input or an assigned label</td>
    </tr>
    <tr>
      <td>ifChanged</td>
      <td>input's "checked", "disabled" or "indeterminate" state is changed</td>
    </tr>
    <tr>
      <td>ifChecked</td>
      <td>input's state is changed to "checked"</td>
    </tr>
    <tr>
      <td>ifUnchecked</td>
      <td>"checked" state is removed</td>
    </tr>
    <tr>
      <td>ifToggled</td>
      <td>input's "checked" state is changed</td>
    </tr>
    <tr>
      <td>ifDisabled</td>
      <td>input's state is changed to "disabled"</td>
    </tr>
    <tr>
      <td>ifEnabled</td>
      <td>"disabled" state is removed</td>
    </tr>
    <tr>
      <td>ifIndeterminate</td>
      <td>input's state is changed to "indeterminate"</td>
    </tr>
    <tr>
      <td>ifDeterminate</td>
      <td>"indeterminate" state is removed</td>
    </tr>
    <tr>
      <td>ifCreated</td>
      <td>input is just customized</td>
    </tr>
    <tr>
      <td>ifDestroyed</td>
      <td>customization is just removed</td>
    </tr>
  </tbody>
</table>

Use `on()` method to bind them to inputs:

```js
$('input').on('ifChecked', function(event){
  alert(event.type + ' callback');
});
```

`ifCreated` callback should be binded before plugin init.


Methods
-------

These methods can be used to make changes programmatically (any selectors can be used):

```js
// change input's state to 'checked'
$('input').iCheck('check');

// remove 'checked' state
$('input').iCheck('uncheck');

// toggle 'checked' state
$('input').iCheck('toggle');

// change input's state to 'disabled'
$('input').iCheck('disable');

// remove 'disabled' state
$('input').iCheck('enable');

// change input's state to 'indeterminate'
$('input').iCheck('indeterminate');

// remove 'indeterminate' state
$('input').iCheck('determinate');

// apply input changes, which were done outside the plugin
$('input').iCheck('update');

// remove all traces of iCheck
$('input').iCheck('destroy');
```

You may also specify some function, that will be executed on each method call:

```js
$('input').iCheck('check', function(){
  alert('Well done, Sir');
});
```

Feel free to fork and submit pull-request or submit an issue if you find something not working.


Comparison
----------

iCheck is created to avoid routine of reinventing the wheel when working with checkboxes and radio buttons. It provides an expected identical result for the huge number of browsers, devices and their versions. Callbacks and methods can be used to easily handle and make changes at customized inputs.

There are some CSS3 ways available to style checkboxes and radio buttons, like [this one](http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/quick-tip-easy-css3-checkboxes-and-radio-buttons/). You have to know about some of the disadvantages of similar methods:

* inputs are keyboard inaccessible, since `display: none` or `visibility: hidden` used to hide them
* poor browser support
* multiple bugs on mobile devices
* tricky, harder to maintain CSS code
* JavaScript is still needed to fix specific issues

While CSS3 method is quite limited solution, iCheck is made to be an everyday replacement covering most of the tasks.


Browser support
---------------

iCheck is verified to work in Internet Explorer 6+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser, Silk and others) are also supported. Tested on iOS (iPad, iPhone, iPod), Android, BlackBerry and Windows Phone devices.


Changelog
---------------

### December 19, 2013

* Added Bower support
* Added NuGet support
* Added to jQuery plugin registry
* Added to CDNJS

### December 18, 2013

* Added ARIA attributes support (for VoiceOver and others) @myfreeweb
* Added Amazon Kindle support @skinofstars
* Fixed clickable links inside labels @LeGaS
* Fixed lines separation between labels and inputs
* Merged two versions of the plugin (jQuery and Zepto) into one
* Fixed demo links
* Fixed callbacks @PepijnSenders


License
-------
iCheck plugin is released under the [MIT License](http://en.wikipedia.org/wiki/MIT_License). Feel free to use it in personal and commercial projects.
