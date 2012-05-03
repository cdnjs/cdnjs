================================
 How mobilize.js works
================================

.. contents :: :local:

Introduction
=============

In this chapter, a masked magician reveals the trick 
behind mobilize.js magic. We explain what 
happens when mobilize.js is run on your page.

Background
===========

mobilize.js has no any hard dependencies.
It lives its standalone mobilize = {} namespace.

mobilize.js core is in file called *mobilize.js* (surprise).

Extenders
==========

mobilize.js itself is an abstract module. To make anything useful out of it,
you need to tell which bits and pieces of the HTML page will be included in the mobile version.
This process is called *transforming*. 

Each different content management system needs its own transform, because they use different
HTML sematics for navigation, menus, headers and such.

mobilize.js is adopted to your CMS system using an *extender*. Extender is a Javascript
file loaded after mobilize.js itself. The extender overrides abstract functions,
like ``constructBody()`` in mobilize.js, filling them with CMS specific transformations.

.. note ::

	Extender JS file does not need to be physically separate file, if files has been 
	merged for faster download. It is enough that Javascript code is loaded sequentially.

Initialization
===============

mobilize.js init(options, cdnOptions) sets up mobilize.js parameters in this order

* Default core parameters

* Extender supplied parameters

* User supplied parameters (function arguments)

``mobilize.options`` are parameters for the mobilization process itself.

``mobilize.cdnOptions`` are hosting related parameters - where to find files, etc.

After init is called ``mobilize`` namespace is left open for further overriding.

.. note ::

	See API docs for more info.

Bootstrap
==========

``mobilize.bootstrap()`` call starts the mobilization process.

It tries to detect mobile browser.

If no mobile browser is detected nothing is done.
Otherwise, the `octarine colored <http://www.colourlovers.com/blog/2008/04/19/octarine-the-imaginary-color-of-magic/>`_
sparks of start flying around in your browser.

Suspending rendering
=====================

First body rendering is suspended, so that the browser do not try to download additonal images which 
would not be needed in the mobile mode::

	<html>
		<head>
			<link rel="styleheet" href="somestyle.css">
			<script type="text/javascript" src="somescript.js"></script>
		</head>
		<body style="display: none">
			...
			
Head cleaning
==============		

Then bootstrap *cleans* the current ``<head>``. It removes web specific Javascript and CSS 
files. If CSS and JS files are not on ``mobilize.options`` whitelist they are removed.
This way browser does not load or hold extra static media which is not needed in mobile rendering::

	<html>
		<head>
		</head>
		<body style="display: none">
			...

Load mobile library code
==========================

``mobilize.cdnOptions.javascriptBundles`` and ``mobilize.cdnOptions.cssBundles``
bundles are inserted to head.

They contain

* jQuery 

* Additional mobilize.js code which can be executed only after jQuery has been loaded (``mobilize.onJQueryLoaded()`` callback)

* jQuery Mobile

Your document will look like this::

	<html>
		<head>
			<link rel="stylesheet" href="http://mobilizejs.appspot.com/releases/trunk/css/mobilize.wordpress.mobile.min.css">			
		</head>
		<body style="display: none">

.. note ::

	Javascript is currently loaded using ``eval()``. It does not appear in ``<head>``. This may change
	in the future releases.
	
Loading mobile template
========================

After jQuery is loaded, the document transform is performed.

Your orignal HTML document::

	<html>
		<body style="display: none">
			<h1>Title</h1>
			<p>Content</p>
			
... will be injected with a mobile template, loaded using AJAX, from local storage cache or
from injected from the orignal web HTML::

	<html>
		<body style="display: none">
			<h1>Title</h1>
			<p>Content</p>
			<p>Some fancy web only text</p>
			
			<div id="mobile-template-holder">
				<div id="mobile-head">
					<script type="text/javascript" src="some-additional-mobile-javascript.js"></script>
				</div> 
				
				<div id="mobile-body"> 
				
					<!-- http://jquerymobile.com/demos/1.0a3/#docs/pages/docs-pages.html -->				
					<div data-role="page"> 
						<div data-role="header"></div> 
						<div data-role="content"></div> 
						<div data-role="footer"></div> 
					</div> 
				
				</div>

The mobile template contains necessary barebone HTML for jQuery Mobile.

For more information see

* http://jquerymobile.com/test/#docs/pages/docs-pages.html

Transform
===========

The orignal web page content is moved to the mobile template
using jQuery manipulation.

* ``<head>`` is filled with content from ``<div id="mobilehead">`` in ``mobilize.constructHead()``

* ``<div id="mobile-body">`` gets necessary page bits moved/copied from the orignal document in
  ``constructBody()``
  
The resulting HTML tree will look like::

	<html>
		<head>
			<script type="text/javascript" src="some-additional-mobile-javascript.js"></script>
		</head>
		<body style="display: none">
			
	
			<p>Some fancy web only text</p>
			<div id="mobile-template-holder">
				<div id="mobile-head">	
				</div> 
				
				<div id="mobile-body"> 
				
					<!-- http://jquerymobile.com/demos/1.0a3/#docs/pages/docs-pages.html -->				
					<div data-role="page"> 
						<div data-role="header"><h1>Title</h1></div> 
						<div data-role="content"><p>Content</p></div> 
						<div data-role="footer"></div> 
					</div> 
				
				</div>

Making rendered mobile page visible
=====================================

After the mobile HTML has been set-up it is time to lift the rendering ban on ``<body>``.
``swapBody()`` removes the web page leftovers which did not end up to the mobile page after ``tranform()``.

Afterwards your HTML looks like this::
			
	<html>
		<body style="display: block">								
			<div data-role="page"> 
				<div data-role="header"><h1>Title</h1></div> 
				<div data-role="content"><p>Content</p></div> 
				<div data-role="footer"></div> 
			</div> 
			
jQuery Mobile page initialization
==================================

jQuery Mobile UI framework by adding additional wrapper elements
based on barebone HTML notation where ``data-role`` attributes
marks content roles.

``transform()`` calls ``prepareFinish()``. If jQuery Mobile is loaded,
it will proceed to ``mobilize.finish()``.

``finish()`` will call ``$.mobile.initializePage()`` which allows
jQuery Mobile to install its UI layer to HTML.

The HTML will look something like this::

	<!DOCTYPE html>
	<html class="ui-mobile landscape min-width-320px min-width-480px min-width-768px min-width-1024px">
		<head>
		<body class="ui-mobile-viewport">
			<div id="jqm-home" class="ui-page ui-body-b" data-theme="b" data-role="page" data-url="jqm-home">
			<div class="ui-page ui-body-c" data-role="page" data-url="docs/pages/index.html">
			<div class="ui-bar-b ui-header" data-theme="b" data-role="header" role="banner">
				<a class="ui-btn-left ui-btn ui-btn-up-b ui-btn-icon-left ui-btn-corner-all ui-shadow" data-icon="arrow-l" data-rel="back" href="#" data-theme="b">
				<h1 class="ui-title" tabindex="0" role="heading" aria-level="1">Pages</h1>
				<a class="ui-btn-right jqm-home ui-btn ui-btn-up-b ui-btn-icon-notext ui-btn-corner-all ui-shadow" data-direction="reverse" data-iconpos="notext" data-icon="home" href="../../" title="Home" data-theme="b">
			</div>
				<div class="ui-content" data-role="content" role="main">
			</div>
			<div class="ui-loader ui-body-a ui-corner-all" style="top: 322.5px;">
			<div class="ui-page ui-body-c ui-page-active" data-role="page" data-url="docs/pages/docs-pages.html">
		</body>
	</html>
	
Even though mark-up makes the hardcore borg to twist around in its cube, the resulting UI is very fancy!	

Installing additional jQuery Mobile event handlers
====================================================

If you need to add event handlers for jQuery Elements, like collapsile conten blocks, 
you (or your CMS extender) can do it in `` mobilize.bindEventHandlers()``. It is called
after jQuery Mobile UI is up and running.

Finished
===========

That's all folks. Now your touch optimized HTML pages is at the front of your nose in your tinywiny mobile
browser and you can enjoy it.


