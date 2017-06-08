Labelauty jQuery Plugin
=========

A nice and lightweight jQuery plugin that gives beauty to checkboxes and
radio buttons and allows custom labels for each status of (un)checked inputs.

**Demo:** http://fntneves.github.io/jquery-labelauty

__Note:__ Labelauty does not support Internet Explorer 7 and 8.

Installation
------------
~~~~
bower install labelauty
~~~


Fast Usage
-----------

Write your checkbox or radio input in `body` section and call `labelauty()` to beautify it.
Note: Call plugin when document is ready. See below:

~~~ html
<input type="checkbox"/>
~~~

~~~ js
$(document).ready(function(){
	$(":checkbox").labelauty();
});
~~~

Simple, isn't it?


Use Cases
----------

 * If you want to create user-friendly websites, this is the right choice!

 * Very useful in `remember me` checkboxes, in `settings panel`, etc.


How does it work ?
--------------

The above case will generate one checkbox with default
labels "Checked" and "Unchecked", one for each input state.

You can change the default labels (see [Options] section) or
give custom labels to each checkbox, like the following example:

~~~ html
<input type="checkbox" data-labelauty="Don't synchronize files|Synchronize my files"/>
~~~

~~~ js
$(document).ready(function(){
	$(":checkbox").labelauty();
});
~~~

The __data-labelauty__ attribute of radio and checkbox inputs lets you write custom labels for __unchecked|checked__ cases.
Pipe character __|__, is the default separator between these two labels. You can change it (see [Options] section).




The __data-labelauty__ attribute can be used in three different ways:
__________
__Unchecked|Checked__

To choose a custom label for Unchecked and Checked states.

~~~ html
<input type="checkbox" data-labelauty="Don't synchronize files|Synchronize my files"/>
~~~
__________
__Message__

Without separator, the __Message__ text will be the permanent label. It means that label will not change between input state.

~~~ html
<input type="checkbox" data-labelauty="Synchronize my files"/>
~~~
___________
__Omitted__

By omitting this attribute, the default labels will be shown.

~~~ html
<input type="checkbox"/>
~~~


Options
-------------

Set a new `class` value that will be applied to changed inputs.

~~~ js
$(":checkbox").labelauty({ class: "myclass" });
~~~

When `label` is set to `false`, only the input icon appears and changes.

~~~ js
$(":checkbox").labelauty({ label: false });
~~~

Change separator between custom labels, in __data-labelauty__ attribute.
Choose your separator with `separator`.

~~~ js
$(":checkbox").labelauty({ separator: "-" });
~~~

Do you want to generate random ID's for all inputs?
Change `force_random_id` to `true`.

~~~ js
$(":checkbox").labelauty({
	force_random_id: true,
});
~~~

Do you want custom default labels?
Set new text in `checked_label` and `unchecked_label`.

~~~ js
$(":checkbox").labelauty({
	checked_label: "You selected this",
	unchecked_label: "You don't want it"
});
~~~

Actually, custom labels have different number of characters or width.
So, you can set `minimum-width` to custom CSS option.

~~~ js
$(":checkbox").labelauty({ minimum_width: "170px" });
~~~

If you dislike the previous option, then you can set labels with the same width.
Just set `same_width` to `true`.

~~~ js
$(":checkbox").labelauty({ same_width: true });
~~~


Customization
-------------

You are free to customize all styles included in Labelauty jQuery Plugin.

Just edit [jquery-labelauty.css] to your liking and change images as you wish.


The included CSS file is tiny and simple. Don't be afraid to change it.


Acknowledgements
----------------

© 2013, Francisco Neves. Released under the [MIT License](License.md).

**Labelauty** is authored and maintained by [Francisco Neves][francisconeves].

[Contributors][c] can help to make this plugin better.

You can follow [Trello of this repo](https://trello.com/b/bXfzw5mz/jquery-labelauty).

 * [My website](http://francisconeves.com) (francisconeves.com)
 * [Github](http://github.com/fntneves) (@fntneves)
 * [Twitter](http://twitter.com/fntneves) (@fntneves)

[francisconeves]: http://www.francisconeves.com
[c]:   http://github.com/fntneves/labelauty-jquery/contributors
[jquery-labelauty.js]: https://github.com/fntneves/labelauty-jquery/blob/master/source/jquery-labelauty.js
[jquery-labelauty.css]: https://github.com/fntneves/labelauty-jquery/blob/master/source/jquery-labelauty.css
[images]: https://github.com/fntneves/labelauty-jquery/tree/master/source/images
[Options]: https://github.com/fntneves/labelauty-jquery#options
