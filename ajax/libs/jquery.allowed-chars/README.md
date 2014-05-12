jQuery Allowed Chars - simple plugin
====================================

jQuery plugin to restrict users for typing only allowed chars for specified element.

Library require [jQuery][1] been loaded.

Setup
-----

Include the jQuery library and the `jquery.allowed-chars.js` file.

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript" src="/dist/jquery.allowed-chars.js"></script>
```

### Install with Bower

Install and manage jQuery Allowed Chars simple plugin using [Bower][4].

```
$ bower install jquery.allowed-chars
```

### Install with NPM

Install and manage jQuery Allowed Chars simple plugin using [NPM][5].

```
$ npm install jquery.allowed-chars
```

Usage Example
-------------

In our HTML code we have 2 inputs:

```html
Only int: <input type='text' id="int"/><br/>
Custom chars[a, b, 1, {space}, _]: <input type='text' id="custom"/>
```

So, to strict input valuables to use only integer for input with id `int` use following:

```js
$('#int').allowedChars(); // by default plugin allows only int chars: 0123456789
```

For customized allowed char list, pass string with chars as parameter:

```js
$('#custom').allowedChars('ab1 _'); // now only chars [a, b, 1, {space}, _] will be allowed
```

Demo
----

You can run demo on [JSFiddle][3]: [http://jsfiddle.net/fosco/55XLd/][2]

TODO
----

Allow regular expression as parameter.

[1]: http://jquery.com/
[2]: http://jsfiddle.net/fosco/55XLd/
[3]: http://jsfiddle.net/
[4]: http://bower.io/
[5]: https://www.npmjs.org/
