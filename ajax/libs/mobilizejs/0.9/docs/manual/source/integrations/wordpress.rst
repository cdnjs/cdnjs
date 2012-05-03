=============================
 Wordpress integration
=============================

.. contents :: :local:

Introduction
============

Mobilize.js is available for Wordpress in two ways 

* *Mobilize.js for Wordpress* plug-in, available from Wordpress Install Plug-ins*. This
  option is for blog authors that want to mobilize their blogs easily.
  
* Direct integration to the theme code with <script> tag. This is for theme authors
  and site managers who want to customize how their mobile site looks and feels.

Installing Mobilize.js for Wordpress plug-in
==============================================

Mobilize for Wordpress plug-in is aimed for people who want
to make mobile version for their blog easily.

Mobilize.js for Wordpress supports

* Blog roll (front page)

* Posts

* Pages

.. note ::

    This plug-in is not needed if you are using a Wordpress theme having
    direct support for mobilize.js as described below. 


Requirements
------------

* You need Wordpress 3.1 minimum

Installation
-------------

* Install plug-in through Wordpress add plug-ins

Mobilize.js for Wordpress plug-in will insert mobilize.js script on your Wordpress
blog. It will also use the default theme (twentyten) for mobile clients,
as old custom themes might not be compatible with mobilize.js.

Settings and optimizations
-----------------------------

There are no settings whatsoever in Wordpress user interface.

For further tuning

* Set Options -> Reading -> Blog pages show at most to 4 (default 10), so that the
  pages will load faster for mobile.
  
.. note ::
  
    You must disable HTML page caching if you are using this theme switcher plug-in.
    If you want to use mobilize.js with page caching, integrate mobilize.js to your
    existing theme using instructions below.

Caching issues
===============

Mobilize.js for Wordpress sets ``Vary: User-Agent`` 
header for public facing HTML pages. 
This should enforce caches to have separate
pages for web and mobile browsers.


But the world is full of broken caches,
proxies and operator services.
Your might want to  disable Apache HTML page caching by add the following directive::

     ExpiresByType text/html A0
   
This should ensure that mobile optimized page is not served
to a web browser and vice versa.
  
Customizing mobile theme
---------------------------

If you want to edit mobile theme for your site.

* Go to Wordpress dashboard -> Plug-ins -> Editor.

* Choose Mobilize.js for Wordpress

* Edit ``mobile-custom.js`` (functionality) and ``mobile-custom.css`` (style overrides)

for more information about customizing 
mobilize.js please see :doc:`tutorial </tutorial>`.   

Integrating mobilize.js with your theme
=========================================

This chapter explains what kind of Wordpress web mark-up sematics (CSS class names).
you need to have in order to make mobilize.js work with it out of the box.

This is the same as Wordpress 3.1 default theme (twentyten) class names.

* Follow Wordpress 3.1 class names with your theme

* Add <script> to your theme <body>

* Add :doc:`page specific overrides </tutorial>`
  if you want to play around with category or tag navigation 

.. note ::
    
    Roadmap exists for a Wordpress plug-in solution which is compatible with all web themes.

Enabling mobilize.js in your theme
===================================

To enable mobilize.js, add following <script> tag to the page right after <body>.

.. code-block:: html

    <body>
        <script class="mobilize-js-source" src="http://cdn.mobilizejs.com/releases/trunk/js/mobilize.wordpress.min.js"></script>

If you further want to fine-tune mobilize.js settings,
see :doc:`tutorial </tutorial>` for more advanced script
including options.



Semantics
=====================

To correctly convert the front page it must follow the default theme structure
(Wordpress 3.1 twentyten theme). 
 
Posts
-----
.. code-block:: html

    <div class="posts">
      <div class="post">
        <div class="entry-title"><a src='url-to-post'>title</a></div>
        <div class="entry-content">...</div>
        <div class="entry-date">...</div>
      </div>
    </div>


Pages
-----

.. code-block:: html
    
    <div class="menu">
      <ul>
        <li><a>Page</a></li>
      </ul>
    </div>

Comments
---------


.. code-block:: html

	<li id="li-comment-4502" class="comment even thread-even depth-1">
		<div id="comment-4502">
		<div class="comment-author vcard">
			<img class="avatar avatar-40 photo" width="40" height="40" src="mfabrik-comments_files/3e9dc491607f52141897a765eaab25e4.jpg" alt="">
		<cite class="fn">
		<span class="says">says:</span>
		</div>
		<div class="comment-meta commentmetadata">
		<div class="comment-body">
		<div class="reply"> </div>
		</div>
	</li>


Advanced overrides
--------------------

Check ``mobilize.wordpress.js`` how Wordpress page elements
are transformed into jQuery Mobile template.

You can override mobilize.wordpress Javascript functions one by one if needed.
In this case, you need to disable the auto-run mode of mobilize.js.

XXX: Add example.

Testing
=========

You can load the Wordpress template used by plug-in without actually running through it jQuery for testing purposes.
This allows you to see HTML/DOM elements before they are run through any kind transformations.

* Use desktop browser

* Use HTTP GET ``mobilize-test-wordpress`` query parameter to load mobile template base::
 
    http://localhost?mobilize-test-wordpress=true