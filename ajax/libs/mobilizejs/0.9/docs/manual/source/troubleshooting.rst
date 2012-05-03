====================
 Troubleshooting
====================

.. contents :: :local:

Introduction
=============

Common errors you might encounter with mobilize.js.

mobilize.js is not working
==============================

Check

* Is <script> tag included in your HTML output

* Use Firefox and UA Switcher to set your user agent to iPhone 3

* Visit on the page, and see if Firebug produces any Javascript errors to the console

Javascript console error: to.data("page") is undefined
==========================================================

All scripts are not loading in the order or not ready when they should be.

Android: AJAX status code 0
=============================

Example error message::

    03-19 23:48:49.187: WARN/browser(239): Console: Could not AJAX url:http://cdn.mobilizejs.com/releases/trunk/js/mobilize.wordpress.mobile.min.js got status:0 http://cdn.mobilizejs.com/releases/trunk/js/mobilize.wordpress.min.js?ver=3.1:1

Javascript: mobilize is not defined
======================================

On line::
    
    mobilize.init({ 
    
mobilize.js files are not loaded in the desktop mode.
Usually this is because you are developing against local files
and your test server is not running.



