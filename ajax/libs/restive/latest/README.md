# Restive.JS

Restive.JS is a JQuery Plugin that helps you quickly and easily add features to your Web Site that enable it respond and adapt to virtually every Web-enabled Device. Using a combination of Device Detection, Advanced Breakpoints Management, and Orientation Management, the Plugin will give your Website an uncanny ability to stay robust in the face of a constantly changing device landscape.



## Why Restive.JS?!

As a Web Designer, designing Websites for Personal Computers and for Mobile Devices is enough hard work as it is. You can design all your layouts using HTML and CSS, but enabling your Websites to be Responsive/Adaptive usually requires a lot more work than is reasonable. 

If you find that you fit one or more of the criteria below, then you might want to consider using Restive.JS:

- You design Websites that need to be Responsive or Adaptive
- You are not completely satisfied with the tools and/or approaches you currently use to enable Responsive or Adaptive Enhancements on your Website
- You need ONE solution and do not want (nor have the time) to cobble together multiple polyfills and shims to enable your desired features
- You spend too much time tweaking CSS Media Queries
- You need more functionality than CSS Media Queries can provide at the moment
- You need a solution that you can truly 'Set-and-Forget'
- You need a solution that is very easy to understand, use, and maintain
- You need a solution that will not alter your existing Web Design Workflow

**Restive.JS enables you to Become an Expert in Responsive + Adaptive Web Design in Minutes!**



## Requirements

- [jQuery](http://jquery.com/) (>= 1.7.1 is recommended)



## License

[Click here to view the License Agreement](/LICENSE.md) for the Basic Version of Restive.JS.



## Changelog

[Click here to view the Changelog](/CHANGELOG.md)



## Installation

Include script *after* the jQuery library:

```html
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/restive.min.js"></script>
```    



## Usage

The basic format for using Restive.JS is as follows:

```html
<script>
    $(document).ready(function () {
        $('selector').restive(options);
    });
</script>
```

### Example 1 - Build with Breakpoints

Let's try a basic example. Say we have designed a HTML5 Website and we want to make it Responsive to a specific set of breakpoints: 240, 320, 480, 640, 960, 1024, and 1280. Our Restive.JS Setup will look something like this:

```html
<script>
    $(document).ready(function () {
        $('body').restive({
			breakpoints: ['240', '320', '480', '640', '960', '1024', '1280'],
            classes: ['css-240', 'css-320', 'css-480', 'css-640', 'css-960', 'css-1024', 'css-1280']            
		});
    });
</script>
```

**So what does the above setup mean?!** Restive.JS will actively monitor the viewport of any devices that visit your website for the following declared breakpoint ranges: 0 to 240 pixels, 241 to 320 pixels, 321 to 480 pixels, 481 to 640 pixels, 641 to 960 pixels, 961 to 1024 pixels, and 1025 to 1280 pixels (Please note that these are `device pixels` by default and **NOT** `device-independent pixels`). If the viewport of the device is between 0 and 240 pixels wide, Restive.JS will add the class `css-240` to the `<body>` tag; if the viewport is between 241 and 320 pixels wide, it will add the class `css-320`, and so on.

So if I have a `Google Nexus 4` (768 pixels wide by 1280 pixels high when in portrait orientation) and I visited a Website with the above Restive.JS configuration, the plugin would add the class `css-960` to the `<body>` tag, because the viewport of the device falls within 640 pixels and 960 pixels wide. You could then tweak your CSS file and add any required style rules required to customize your layout.


### Example 2 - Build without Breakpoints

Let's try another example, this time without using conventional breakpoints, and designing for form-factors instead. Our Restive.JS Setup could look something like this:

```html
<script>
    $( document ).ready(function() {
        $('body').restive({
            breakpoints: ['10000'],
            classes: ['nb'],
            turbo_classes: 'is_mobile=mobi,is_phone=phone,is_tablet=tablet,is_portrait=portrait,is_landscape=landscape'
        });
    });
</script>
```

**So what does the above setup mean?!** Restive.JS - via `breakpoints` option - will create a viewport range between 0 and 10,000 pixels [which means that it will match virtually all devices] and add the class `nb` to the `<body>` tag. The operation however is inconsequential and we will be relying on another plugin option. `turbo_classes` is a special feature of Restive.JS that adds classes [in addition to those defined in the classes option] to our `<body>` tag when certain pre-defined conditions are met e.g. when the device is a `mobile` device, when the device is a `tablet`, etc. There are about 9 specific conditions in all. So for example, `is_landscape=landscape` will tell the plugin to add the class `landscape` to the `<body>` tag if the device is in `landscape` orientation, and being that Restive.JS is stateful, this class will also be removed if the device switches to `portrait` orientation.

So if I have an `Apple iPad 4` and I visited a Website [while in Portrait Orientation mode] with the above Restive.JS configuration, the plugin would add the class `nb mobi tablet portrait` to the `<body>` tag, because it is a `mobile` device, a `tablet`, and is in `portrait` orientation. If I switched orientation to `landscape`, it would update the class of the `<body>` tag to `nb mobi tablet landscape`. As expected, you can then update your CSS style rules inline to customize your layout.


**NOTE**: We strongly advise that you use either `html` or `body` as your preferred selector always.



## Quickstart Guide

Please See the Blog Post titled **'[Getting Started with Restive.JS Plugin](http://blog.restive.io/posts/5852603/getting-started-with-restive-plugin)'** as a Quickstart Guide. It will help you get your head around Restive.JS and how it can work for you in a real-life Web Design scenario. You should also read **'[Responsive Web Design with Less Code](http://speckyboy.com/2014/03/17/responsive-web-design-less-code)'** for additional insights.



## Known Limitations

- This plugin uses AmplifyJS Store functionality to store data in SessionStorage (by default and if available). If SessionStorage is not available, LocalStorage is used; And if Session Storage and LocalStorage are not available, it relies on AmplifyJS Store to make a suitable selection. As a result, behavior on very old browsers may be unpredictable.  



## Script Reference Warnings

Please be mindful to disable the following Javascript libraries from your Web pages before using Restive.JS (i.e. if you have them enabled):

- [AmplifyJS Store](http://amplifyjs.com/api/store/)
- [JSON2.js](https://github.com/douglascrockford/JSON-js)
- [iOS-Orientation-Fix](https://github.com/PeterWooster/iOS-Orientationchange-Fix)

These libraries are already embedded within Restive.JS.



## Credits

Restive will like to thank the following third-parties for script usage (and some inspiration):

- AppendTo - [AmplifyJS Store](http://amplifyjs.com/api/store/)
- Douglas Crockford - [JSON2.js](https://github.com/douglascrockford/JSON-js)
- Kevin van Zonneveld - [PHPJS](https://github.com/kvz/phpjs)
- Scott Jehl, Peter Wooster - [iOS-OrientationChange-Fix](https://github.com/PeterWooster/iOS-Orientationchange-Fix)
- Ryan Van Etten - [Response.js](https://github.com/ryanve/response.js)



## API Reference

### Options

These are the options available within **Restive.JS**. The default values are also listed.


#### breakpoints

An itemized list of dimensions that define a specific range within which an adaptive action should take place. Restive.JS allows for 2 distinct types of breakpoints:

1. Pixel e.g. 320
2. Resolution e.g. nHD, SVGA, XGA, etc.

Breakpoints are defined as an array:

```javascript
//example
breakpoints: ['240', '320', '480', '640']
```

The above setting means that the plugin will monitor the viewport for the following width ranges: 0 to 240px, 241 to 320 pixels, 321 to 480 pixels, and 481 to 640 pixels. It will then apply classes (see next option) to the DOM based on which declared range the viewport width matches.

**NOTE**: Do not start from zero when defining breakpoints. Always start from the upper limit of the implied range. For example, if you specify `240` as the first item in the `breakpoints` option, the plugin will enable a range of 0 to 240; if 480 is the next item, the plugin will enable a range of 241 to 480 and so on.

**NOTE**: Do NOT use commas when defining breakpoints that are in the thousands e.g. never do '1,000'; do '1000' instead.

**NOTE**: Ensure that you define your breakpoints based on device pixels [and not css/device-independent pixels]. For example, if you want to match a device width of 720 pixels, use 720 even when you know the Device-Independent Pixel Width is 360. You can override this behavior by using the `force_dip` option.


#### classes

An itemized and corresponding list of CSS classes that will be set to the matched element defined in the Restive.JS selector, in lock-step with the corresponding breakpoints.

Classes are defined as an array:

```javascript
//example
classes: ['240-c', '320-c', '480-c', '640-c']
```

The above setting will add the class `320-c` to the selected DOM element when the viewport is between 241 and 320 pixels (considering the `breakpoints` options defined earlier).

**NOTE**: The number of `classes` defined here must be identical to the number of breakpoint items defined in the `breakpoints` option.

**NOTE**: You can also add multiple classes to the matched element defined in the Restive.JS selector. Simply space-separate your classes e.g. 'myclass1 myclass2' is valid


#### force_dip

This option provides an override capability that forces the `breakpoints` option to consider device-independent pixels instead of device pixels (which is the default behavior). Setting this option to true enables the override.

For example, say you have an `iPad 2` and an `iPad Air` (which has a `retina` display), and your Restive.JS settings are as set up below:

```javascript
$('body').restive({
    breakpoints: ['768', '1280'],
    classes: ['768-c', '1280-c']
});
```

If a user uses the `iPad 2` to visit your website (in portrait orientation), the class `768-c` will be added to the class attribute of the `<body>` tag. However, if the `iPad Air` is used, nothing gets added to the `<body>` tag because the iPad Air viewport width is 1536 pixels (i.e. considering device pixels). This is the default behavior for `breakpoints`.

However, using the `force_dip` option [and setting it to true], you can force breakpoints to consider device-independent pixels instead of device pixels. This way, Restive.JS will see the ranges 0 to 768 pixels [for a non-retina device] and 0 to 1536 pixels [for a retina device] as the same. See revised settings below:

```javascript
$('body').restive({
    breakpoints: ['768', '1280'],
    classes: ['768-c', '1280-c'],
    force_dip: true
});
```


#### anchor

This options enables **Modularity** in Restive.JS. It defines the basis by which **Responsiveness** is applied i.e. how classes will be applied according to changes to either the viewport or DOM element. 

There are two possible options:

- **window**: This will anchor responsiveness to the viewport i.e. classes will be applied as the viewport changes in width, and as those widths match the breakpoints provided
- **element**: This will anchor the responsiveness to the element's container i.e. classes will be applied as the element's container changes in width, and as those widths match the breakpoints provided

Anchor selection is automatic and functions according to the following conditions:

- If you use the `<html>` or `<body>` tag in your Restive.JS constructor e.g. `$('body').restive()`, the anchor option defaults to `window`. You cannot force `element` when either one of these two specific selectors are used.
- If you use any tag that is determined to be within the `<body>` tag e.g. `$('div#someid').restive()`, the anchor option defaults to `element`, otherwise it defaults to `window`. You may force `window` instead of `element` if you so desire.

**NOTE**: When using `anchor` option with `element` value, you must use a valid JQuery ID selector in your Restive.JS constructor e.g. `$('#myid').restive()`.

**NOTE**: Do not define callbacks in any Restive.JS Constructors that have `anchor` option set to `e` or `element`.


#### anchor_e_df

This is a special option that determines what method should be used to retrieve the width of the element container when `anchor` option is used, and its value is `element` i.e. when **Modularity** is in effect. As Modularity focuses on the container, Restive.JS needs to determine the width of said container in order to know when to trigger `classes` in response to `breakpoints` at the container level.

Restive.JS uses JQuery's width methods. There are three possible values that you may use:

- `w` to use `$().width()`. This is the default value
- `i` to use `$().innerWidth()`
- `o` to use `$().outerWidth()`

**NOTE**: This option is only used when `anchor` option is `e` or `element`.


#### platform

This defines the specific device platform that you want to target. The following values are available for use:

- `all`: target all platforms. This is the default setting.
- `ios`: target only devices based on the `iOS` platform e.g. iPad, iPod, etc.
- `android`: target only devices based on the `Android` platform e.g. Samsung Galaxy S4, Amazon Kindle, etc.
- `symbian`: target only devices based on the `Symbian` platform e.g. Nokia Asha 311
- `blackberry`: target only devices based on the `Blackberry` platform e.g. Blackberry Q10
- `windows`: target only devices based on the `Windows` platform e.g. Nokia Lumia, Microsoft Surface, etc.


#### formfactor

This defines the specific form factor that you want to target. The following values are available for use:

- `all`: target all devices. This is the default setting.
- `pc`: target all Personal Computers (e.g. PC, Mac, Linux, etc.)
- `tv`: target smart TVs and Game Consoles
- `tablet`: target tablets
- `phone`: target phones


#### turbo_classes

There are certain instances when you need to define a class that will be added to your selected DOM element alongside any other classes you may have defined in `classes`. 

For example, let's say you want to add a class `mobi` if the device is a mobile device alongside the selected class previously defined in the `classes` option. You can do this quite easily using `turbo_classes`.

Using `turbo_classes`, you can specify one or more conditions and a corresponding class [for each condition] that will be added to the DOM selector when said condition is met.

You define your turbo-class[es] in the following format: `{condition}={class}`

Where `{condition}` is the specific circumstance that will trigger the `{class}` to be added. The following `{condition}` definitions are available for use:

- `is_mobile`: will add a `{class}` if device is mobile e.g. `phone` or `tablet`
- `is_non_mobile`: will add a `{class}` if device is `non-mobile` e.g. `pc` or `tv`
- `is_retina`: will add a `{class}` if device has a `retina` display
- `is_phone`: will add a `{class}` if device is a `phone`
- `is_tablet`: will add a `{class}` if device is a `tablet`
- `is_tv`: will add a `{class}` if device is a `tv`
- `is_pc`: will add a `{class}` if device is a `personal computer`
- `is_portrait`: will add a `{class}` if device is in `portrait` orientation
- `is_landscape`: will add a `{class}` if device is in `landscape` orientation

So let's further clarify with an illustration:

```javascript
$(document).ready(function () {
	$('body').restive({
		breakpoints: ['320', '480', '640', '720', '960', '1280'],
		classes: ['320-c', '480-c', '640-c', '720-c', '960-c', '1280-c'],
		turbo_classes: 'is_mobile=mobi,is_portrait=view-p'
	});
});
```

**Explanation**: The class in the `classes` option will be added to the `<body>` tag depending on which breakpoint range matches the device viewport. However, since the `turbo_classes` option is defined with two conditions, the following will also happen:

1. If the device is a mobile device, `mobi` will be added to the `<body>` tag class attribute
2. If the device is in portrait orientation, `view-p` will be added to the `<body>` tag class attribute.

So if an `iPhone 4` visits our website and happens to be in portrait orientation, `mobi view-p 640-c` will be added to the `class` attribute of the `<body>` tag, because and `iPhone 4` has a viewport width of 640 pixels.
 
**Note**: You can use `turbo_classes` to add only one class per condition i.e. multiple class definitions per condition are not possible. So that means you can't do something like this: `turbo_classes: 'is_mobile=mobi,is_mobile=mobi_plus'`


#### turbo_classes_reflow

This option provides a way to make a layout *Responsive* to a resizing browser window when using `turbo_classes` functionality.

Usually, when using `turbo_classes`, you define key-value items like `is_mobile=mobi` and `is_tablet=tablet` to enable the addition of classes to the DOM element [usually the `<body>` tag] when certain conditions are met. This approach would then enable you to create CSS rules that leverage these class selectors e.g. `.mobi #myid`, `.mobi.tablet #myid`, etc. to enable your layout to respond and adapt to different situations.

As a result, it is very possible to bypass conventional breakpoints entirely to create a website that is Adaptive to only *Form-factor* and *Orientation* using the following code:

```javascript
$('body').restive({
    breakpoints: ['10000'],
    classes: ['nb'],
    turbo_classes: 'is_mobile=mobi,is_phone=phone,is_tablet=tablet,is_portrait=portrait,is_landscape=landscape'
});
```

However, since you have not defined an array of `breakpoints` and corresponding `classes`, your website will NOT be able to *reflow* your layout on Desktop devices when the browser window is resized.

The `turbo_classes_reflow` option provides a way of using your existing `turbo_classes` configuration as pseudo-breakpoints to enable *reflow* functionality on devices of *PC* class e.g. desktops, laptops, etc. Setting the `turbo_classes_reflow` option to `true`, the following will happen:

1. If the `turbo_classes` option is defined, and the `is_mobile` condition has a value, then that value will be applied to the DOM element defined in the Restive.JS selector [usually the `<html>` or `<body>` tag] provided the viewport width of the browser drops below 960 pixels (this threshold can be adjusted using the `turbo_classes_reflow_limits`)

2. If `1.` above is true, and the `is_tablet` condition has a value, then that value will also be added to the class attribute of the target DOM element provided the viewport width of the browser drops below 960 pixels (this threshold can be adjusted using the `turbo_classes_reflow_limits`: it is the second value) 

3. If `1.` above is true, and the `is_phone` condition has a value, then that value will also be added to the class attribute of the target DOM element provided the viewport width of the browser drops below 480 pixels (this threshold can be adjusted using the `turbo_classes_reflow_limits` option: it is the first value).

In other words, if this option is set, two breakpoint ranges will be created: 0 to 480 pixels, and 481 to 960 pixels. Within the first range, `is_phone` turbo-class value will be applied if defined; within the second range, `is_mobile` and `is_tablet` turbo-classes will be applied if defined.

**NOTE**: This option is PC-only [i.e. it works for `PC` class devices only] and will not affect Mobile usage in anyway.

**NOTE**: It is advised that you use this feature only if you are relying heavily on `turbo_classes`. 


#### turbo_classes_reflow_limits

This option works with `turbo_classes_reflow` option. It enables you change the default values used for the `turbo_classes_reflow` option. 

```javascript
//example
turbo_classes_reflow_limits: '480,960'
```

**NOTE**: If you must alter this option, make sure the first value provided is always less than the second value i.e. DO `480,960`, DON'T DO `960,480`.



### Event Callbacks

These are technically also Options. However, just for better categorization, we have separated them from **Options** above.

The following Callbacks are available for use in **Restive.JS**


#### onReady

This callback is triggered on Plugin initialization i.e when the web page is loaded.

```javascript
$('body').restive({
	onReady: function(){alert("I'M READY WHEN YOU ARE!");}
});
```


#### onResize

This callback is triggered after there is a change in the size of the Viewport.

```javascript
$('body').restive({
	onResize: function(){alert("I JUST GOT RESIZED!");}
});
```

**NOTE**: This callback does not work on mobile devices i.e. `phone` and `tablet`


#### onRotate

This callback is triggered just after the Device Orientation changes i.e. from Portrait to Landscape and vice versa.

```javascript
$('body').restive({
	onRotate: function(){alert("I JUST GOT ROTATED!");}
});
```


#### onRotateToP

This callback is triggered just after the Device Orientation changes from Landscape to Portrait.

```javascript
$('body').restive({
	onRotateToP: function(){alert("I JUST GOT ROTATED TO PORTRAIT!");}
});
```


#### onRotateToL

This callback is triggered just after the Device Orientation changes from Portrait to Landscape.

```javascript
$('body').restive({
	onRotateToL: function(){alert("I JUST GOT ROTATED TO LANDSCAPE!");}
});
```

#### onRetina

This callback is triggered if the Device has a pixel ratio of 2 or higher.

```javascript
$('body').restive({
	onRetina: function(){alert("I CANNOT BE MORE CLEAR-EYED!");}
});
```


#### onPortait

This callback is triggered if the Device is in Portrait Orientation on initialization i.e. when the web page is loaded.

```javascript
$('body').restive({
	onPortrait: function(){alert("I AM TALLER THAN I AM WIDE!");}
});
```


#### onLandscape

This callback is triggered if the Device is in Landscape Orientation on initialization i.e. when the web page is loaded.

```javascript
$('body').restive({
	onLandscape: function(){alert("I AM WIDER THAN I AM TALL!");}
});
```


#### onPhone

This callback is triggered if the Device is a Phone.

```javascript
$('body').restive({
	onPhone: function(){alert("I AM A PHONE!");}
});
```


#### onTablet

This callback is triggered if the Device is a Tablet.

```javascript
$('body').restive({
	onTablet: function(){alert("I AM A TABLET!");}
});
```


#### onTV

This callback is triggered if the Device is a TV or TV-enabled e.g. game console.

```javascript
$('body').restive({
	onTV: function(){alert("I AM A TELEVISION!");}
});
```


#### onPC

This callback is triggered if the Device is a Personal Computer i.e. not a Phone, Tablet, or TV.

```javascript
$('body').restive({
	onPC: function(){alert("I AM NOT A PHONE, TABLET, OR TV!");}
});
```


#### onMobile

This callback is triggered if the Device is a Mobile Device i.e. Phone or Tablet.

```javascript
$('body').restive({
	onMobile: function(){alert("I AM MOBILE!");}
});
```


#### onNonMobile

This callback is triggered if the Device is a Non-Mobile Device i.e. TV or PC.

```javascript
$('body').restive({
	onNonMobile: function(){alert("I AM NOT MOBILE!");}
});
```


#### onTurboClassReflow

This callback is triggered if `turbo_classes_reflow` option is `true`, the device is a `PC`, and the browser window is resized into or out of the *reflow* breakpoint range or the browser window is initialized at a viewport width within or outside said range.

```javascript
$('body').restive({
	onTurboClassReflow: function(){alert("I AM EITHER IN OR OUT OF RANGE!");}
});
```


#### onTurboClassReflowIn

This callback is triggered if `turbo_classes_reflow` option is `true`, the device is a `PC`, and the browser window is resized into the *reflow* breakpoint range or the browser window is initialized at a viewport width within said range.

```javascript
$('body').restive({
	onTurboClassReflowIn: function(){alert("I JUST GOT IN!");}
});
```


#### onTurboClassReflowOut

This callback is triggered if `turbo_classes_reflow` option is `true`, the device is a `PC`, and browser window is resized out of the *reflow* breakpoint range or the browser window is initialized at a viewport width within said range.

```javascript
$('body').restive({
	onTurboClassReflowOut: function(){alert("I JUST STEPPED OUT!");}
});
```


#### onAddClass

This callback is triggered when the Restive.JS adds a class to the DOM element identified in `selector` e.g. when a breakpoint range is matched. The name of the class added is passed as the only argument of this function.

```javascript
$('body').restive({
	onAddClass: function(name){alert("PLUGIN JUST ADDED A CLASS CALLED '"+name+"'!");}
});
```


#### onRemoveClass

This callback is triggered when the Restive.JS removes a class from the DOM element identified in `selector` e.g. when there is no breakpoint match. The name of the class removed is passed as the only argument of this function.

```javascript
$('body').restive({
	onRemoveClass: function(name){alert("PLUGIN JUST REMOVED A CLASS CALLED '"+name+"'!");}
});
```



### Methods

These are the methods available within **Restive.JS**. A usage example is also listed.


#### getPlatform

This determines the operating platform of the device. The following are the possible results when using this method: `ios`, `android`, `symbian`, `blackberry`, `windows`. If the device is not recognized as one of these platforms, `other` will be returned.

```javascript
//example
var platform = $.restive.getPlatform();
```


#### getFormFactor

This determines the form-factor of the device. There are only four possible results: `phone`, `tablet`, `tv`, `pc`. If none of the first three are detected, it will be assumed that the device has a `pc` form-factor.

```javascript
//example
var formfactor = $.restive.getFormFactor();
```


#### getResolution

This determines the standard graphic display resolution of the device e.g. `VGA`, `SVGA`, `qHD`, etc.

```javascript
//example
var res = $.restive.getResolution();
```


#### getOrientation

This determines the currently active device orientation. The only two possible results are `portrait`, and `landscape`.

```javascript
//example
var ort = $.restive.getOrientation();
```


#### getPixelRatio

This determines the pixel ratio of the device.

```javascript
//example
var pxr = $.restive.getPixelRatio();
```


#### getViewportW: 

This determines the device viewport width [in device pixels].

```javascript
//example
var viewport_w = $.restive.getViewportW();
```


#### getViewportH: 

This determines the device viewport height [in device pixels].

```javascript
//example
var viewport_h = $.restive.getViewportH();
```


#### getScreenW: 

This determines the device screen width.

```javascript
//example
var screen_w = $.restive.getScreenW();
```


#### getScreenH: 

This determines the device screen height.

```javascript
//example
var screen_h = $.restive.getScreenH();
```


#### getPixelW: 

This determines the device viewport width [in device-independent pixels].

```javascript
//example
var css_pixel_w = $.restive.getPixelW();
```


#### getPixelH: 

This determines the device viewport height [in device-independent pixels].

```javascript
//example
var css_pixel_h = $.restive.getPixelH();
```


#### isMobile

This determines whether a device is a mobile device. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_mobile = $.restive.isMobile();
```


#### isNonMobile

This determines whether a device is not a mobile device. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_non_mobile = $.restive.isNonMobile();
```


#### isPhone

This determines whether a device is a Phone. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_a_phone = $.restive.isPhone();
```


#### isTablet

This determines whether a device is a Tablet. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_a_tablet = $.restive.isTablet();
```


#### isTV

This determines whether a device is a TV or TV-enabled device. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_a_tv = $.restive.isTV();
```


#### isPC

This determines whether a device is a Personal Computer. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_a_pc = $.restive.isPC();
```

**NOTE**: A `pc` [in the context of Restive.JS] is basically any device that is not a `phone`, `tablet`, or `tv`.


#### isIOS

This determines whether a device is based on the iOS Platform. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_ios = $.restive.isIOS();
```


#### isAndroid

This determines whether a device is based on the Android Platform. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_android = $.restive.isAndroid();
```


#### isSymbian

This determines whether a device is based on the Symbian Platform. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_symbian = $.restive.isSymbian();
```


#### isBlackberry

This determines whether a device is based on the Blackberry Platform. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_blackberry = $.restive.isBlackberry();
```


#### isWindows

This determines whether a device is based on the Windows Platform. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_windows = $.restive.isWindows();
```

**NOTE**: This method will detect both Windows Phones and Tablets.


#### isWindowsPhone

This determines whether a device is based on the 'Windows Phone' Platform. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_windows_phone = $.restive.isWindowsPhone();
```

**NOTE**: This method will detect only Windows Phones.


#### isRetina

This determines whether a device has a 'Retina' display i.e. a display with a pixel ratio equal to or greater than 2. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_retina = $.restive.isRetina();
```


#### isPortrait

This determines whether a device is in Portrait Orientation mode. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_portrait = $.restive.isPortrait();
```


#### isLandscape

This determines whether a device is in Landscape Orientation mode. Returns `true` if so, `false` if otherwise.

```javascript
//example
var is_device_landscape = $.restive.isLandscape();
```



## Special Features


### Orientation Markers

Orientation markers are a special feature of Restive.JS that allows you to define breakpoints that target viewport width ranges in specific orientation modes. For example, if you define the following breakpoints: 240, 360-l, 480-p; the Plugin will target the following viewports: 0 to 240 pixels, 241 to 360 pixels only if the device is in landscape orientation, and 361 to 480 pixels only if the device is in portrait orientation. You can append an orientation marker to any breakpoint that you have defined. 

Supported Orientation Markers are:

- `-p` for portrait orientation
- `-l` for landscape orientation

**NOTE**: Orientation markers always take precedence if duplicate breakpoints are defined. For example, let's say you have defined breakpoints that include `640` and `640-p`, with corresponding classes `640-c` and `640-pc` respectively. If the device viewport width falls within 0 and 640 pixels, the class `640-pc` will be applied even though the two breakpoints are both technically an exact match.

**NOTE**: Orientation markers work a little differently when using Resolution Breakpoints. When using resolution breakpoints with orientation markers, Restive.JS uses the width component of the resolution when in portrait, and the height component of the resolution when in landscape. For example, let's say you define the following: `hvga, hvga-l`; this resolution is 320px by 480px. The Plugin will target 0 to 320 pixels, and 321 to 480 pixels only if the device is in landscape orientation.

**NOTE**: If you define two identical breakpoints with two identical orientation markers, the one that appears first in your definition will take precedence.


### Multiple Constructor Usage

Restive.JS lets you call its constructor multiple times. The primary reason for doing this is when you want to segment your breakpoints e.g. when you want to target multiple platforms or form-factors.

The syntax for using multiple constructors is as below:

```javascript
$(document).ready(function () {
    $.restive.startMulti();
    
	$('selector').restive(options_1);
    $('selector').restive(options_2);
    
	$.restive.endMulti();
});
```

So considering a real example, let's say we need to define multiple breakpoints for two different form-factors. We can do this as follows:

```javascript
$(document).ready(function () {
    $.restive.startMulti();
    
	$('body').restive({
	    breakpoints: ['240', '360', '480', '640', '960', '1280'],
        classes: ['240-cp', '360-cp', '480-cp', '640-cp', '960-cp', '1280-cp'],		
		formfactor: 'phone'
	});
		
	$('body').restive({
	    breakpoints: ['240', '360', '480', '640', '960', '1280'], 
		classes: ['240-ct', '360-ct', '480-ct', '640-ct', '960-ct', '1280-ct'],		
		formfactor: 'tablet'
	});
	
	$.restive.endMulti();
});
```

**NOTE**: You must always call the method `$.restive.startMulti()` before you define multiple constructors, and `$.restive.endMulti()` at the very end. If you don't, you'll get errors.

**NOTE**: Ensure that you use the same selector for each constructor i.e. if you're using 'body' as your selector for the `<body>` tag, make sure you use that selector for all your constructor calls. This is best practice advice.

**NOTE**: You should only use this feature when you want to segment breakpoints along platform or form-factors i.e. you want to define different breakpoints for different platforms or form-factors. You shouldn't use it as a way of adding more breakpoints (if you want to add more breakpoints, just add them to your existing breakpoints). We've built Restive.JS to work even if you use multiple constructors without specifying segmentation options like `platform` and `formfactor`, but you really shouldn't use it that way.



## Concepts

### Responsiveness

Responsiveness is your Website's capability to manage different device screen sizes, and modify its layout in response to those differences.


### Adaptiveness

Adaptiveness is your Website's capability to manage different device screen sizes and device features e.g. platform (iOS, Android, etc.), form-factor (phone, tablet, etc.), et al. and modify its layout in response to those differences.


### Modular Web Design

Modular Web Design is an approach to web design in which a website is first broken into components, and then these components are designed, developed, tested, and finally assembled to create a finished Website. A key advantage of this approach is encapsulation. For example, if you design a website widget, and you need to improve it, you can simply update the widget without tampering with any of the other component modules that make up the whole website.


### Modular Responsiveness

This is the ability of your website to modify the layout of a web page component [which is housed within a container] as the size of its container changes. There are specific situations where certain UI elements are built in a modular fashion. Traditional Responsive + Adaptive Web Design techniques are usually only concerned with the viewport. Enabling modular responsiveness will allow these components to adapt to changes in their immediate layouts [not just the overall viewport] e.g. a calendar widget that automatically displays its 'mini' version when it is put in a smaller sidebar container as opposed to its usual wider main page container.


### Modular Adaptiveness

This is the ability of your website to modify the layout of a web page component as the size of its container changes, and according to specific device features e.g. platform (iOS, Android, etc.), form-factor (phone, tablet, etc.), et al.


### Viewport

The viewport is the portion of the web page that the user can currently see. So if on a web page, there is a picture but you have to scroll down to see it, this image is said to be outside the viewport. Viewport width and viewport height refer to the width and height, respectively, of the viewable portion of the web page.


### Container

The container is a HTML element (nested under the `<body>` tag) that encapsulates another HTML element. For example, if you have the following code: `<div id="container-1"><div id="component-1"></div></div>`, the element with **id** `container-1` is a container to the element with **id** `component-1`.


### Orientation

Orientation is the way a rectangular viewing area e.g. a monitor, a mobile device, etc. is oriented for viewing. The two most common types of orientation are portrait and landscape. When the viewing area is taller than it is wider, this is referred to as portrait orientation mode. When the viewing area is wider than it taller, this is referred to as landscape orientation mode.


### Breakpoints

Breakpoints in Responsive Web Design are browser widths that have a declaration – media query or otherwise – to change the layout once the browser is within the declared range.

Restive.JS uses Breakpoints to find and match viewports of mobile devices. So if you define the following breakpoints: 240, 360, 480; the plugin will target the following viewports 0 to 240 pixels, 241 to 360 pixels, and 361 to 480 pixels.

There are two types of breakpoints in Restive.JS

- **Pixel Breakpoints**: This is when the breakpoints are defined by widths in pixels
- **Resolution Breakpoints**: This is when the breakpoints are defined by standard graphic display resolutions e.g. nHD, SVGA, XGA, 1080p, etc. Click here to view all Resolution Shortcodes that are allowed for use when defining such breakpoints.

Every device has its own specific viewport width and height e.g. XGA is 768 by 1024 pixels. When you use resolution breakpoints, Restive searches for the specific graphic display resolution and obtains its viewport width. It then sorts everything in order and creates a viewport range that will match all the resolutions you have listed.

For example, let's say nHD, qHD, and UXGA are listed as your resolution breakpoints. These resolution definitions have a viewport width of 360px, 540px, and 1200px respectively. Restive.JS will then sort the widths in order and create the proper viewport range. So in this case, our breakpoint range will be 0 to 360px, 361 to 540px, and 541 to 1200px. Restive.JS does this automatically.

**NOTE**: Breakpoint ranges are calculated automatically by Restive.JS, you only need to define the actual widths you want to target, and the plugin will do the rest.


## CSS Tips

Restive.JS provides a quick and easy way to implement Responsive and Adaptive features into your Websites. This enables you to focus more on using `HTML` and `CSS` to design all your mobile-optimized layouts, and less on `Javascript`.

Please read the **[Getting Started with Restive.JS Plugin](http://blog.restive.io/posts/5852603/getting-started-with-restive-plugin)** post on the Restive Blog as it provides insights into how to use `CSS` when using the Restive.JS. You could also read **[Responsive Web Design with Less Code](http://speckyboy.com/2014/03/17/responsive-web-design-less-code/)** for a more in-depth review of Restive.JS. 



**THANK YOU FOR READING**

