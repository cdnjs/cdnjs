=============================
 Introduction
=============================

.. contents :: :local:

About
-----

**Mobilize.js is a HTML5 and Javascript
framework to transform websites
to mobile sites.** It allows you to create
a mobile site from your existing web content easily.

Mobilize.js is a solution for

* Creating a mobile version of an existing web site

* Adding mobile support for CMS, eCommerce or other web platform

* Adding mobile support for your web themes

Mobilize.js is a developer solution: experience with HTML and Javascript needed.

Benefits
----------

Mobilize.js is superior to existing open or proprietary mobile site solutions

* Easy to integrate: only one <script> tag needed

* Bulk mobilization for free - focus on more value adding features  

* Uses technologies familiar to front end developers: HTML5, Javascript, jQuery, jQuery Mobile.
  Mobilize.js works with any backend programming language: PHP, Java, Python.

* Open source: no expensive subscription or Software-as-a-Service partners needed

How it works
--------------

mobilize.js <script> tags are inserted on your HTML source code
like with any other Javascript library. Then you give what web 
site elements belong to mobile site.

.. image:: images/screenshots/transform.png

When the web page loads, mobilize.js checks whether the browser
is a mobile browser or a normal desktop browser. For mobile
browsers, a special transformation step takes place.

.. image:: images/mobilizejs/Slide2.png

* All unneeded web resources (text, images, CSS, Javascript) is left unloaded

* Content is reformated for mobile display

* jQuery Mobile theme is applied on the page

Background
----------

The revolutionary idea behind Mobilize.js is that
it pushes difficult content presentation choices to a web browser
instead trying to figure them out on a server.
This is embracing of the original philosophy of HTML mark-up language:
the browser knows best how the page should look like.
With Mobilize.js we serve a normal web page 
and let an embedded Javascript file  
decide should the page be mobilized.

Mobilize.js will do the same for internet mobilization 
what Google Maps did for map services.

Architecture
-------------

mobilize.js builds on the top HTML5 and popular jQuery and jQuery Mobile Javascript frameworks.
In the diagram below the relationship between mobilize.js and the frameworks is explained.

.. image:: images/mobilizejs/Slide1.png


Easy to integrate
--------------------

.. image:: images/mobilizejs/Slide3.png

Because mobilize.js does not have difficult server-side components, 
it is very easy to integrate to different systems. Currently
out of the box supported systems are :doc:`Wordpress blogging platform </integrations/wordpress>`,
:doc:`Sphinx documentation system </integrations/sphinx>` and the list is growing fast.

For example, Wordpress integration plug-in is effectively only ~150 lines of code.
Code examples are available for PHP, Apache and other popular platforms.

Cloud hosted
--------------

mobilize.js comes withs own content delivery network (CDN) solution.
You do not need trouble your server with complex files. CDN automatically
optimizes all Javascript and CSS files for the fastest possible download
rates.

With CDN hosting and ever evolving mobile landscape, your data
for the mobile devices is always up-to-date.

It is also possible to host files yourself for intranet solutions.

Open source
------------

mobilize.js is an open source solution. It is hosted on `Github <https://github.com/mobilizejs/mobilize.js>`
which is a popular social coding source code repository. 

Open source nature guarantees
long term feasibility and high quality of the project. Not only that
you can customize mobilize.js for your own needs, but there is 
community process in place for `support <http://groups.google.com/group/mobilizejs-users>`, 
issue tracking <https://github.com/miohtama/mobilize.js/issues>`_ and
development `<http://groups.google.com/group/mobilizejs-users>`_. 

Device support
--------------- 

mobilize.js supports :doc:`jQuery Mobile grade A devices </support>`.
The supports covers most of developed country mobile internet devices. 

It is possible to further tune mobilize.js to increase
the device support for low end devices.
 