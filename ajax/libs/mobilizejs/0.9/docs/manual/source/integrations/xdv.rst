=============================
 XDV integration
=============================

.. contents :: :local:

Introduction
=============

`XDV <http://pypi.python.org/pypi/xdv>`_ is theming-as-a-service theming proxy used by `Plone <http://plone.org>`_
and many other systems. It can integrate many different systems (CMS, blog, issue tracker) under one theme.

Integration
=============

XDV itself is not concerned about mobilize.js. Just make sure that if you are setting
<script> tag for mobilize.js in your content, not theme, you'll copy this
script tag along the way.

The following example shows how mobilize.js scripts are correctly copied
to the very beginning of <head>.

.. code-block:: xml

    <!-- Copy Wordpress <script> tags - mobilize.js.
    
         Note: prepend preserves order (illogical).
           
     -->
    <prepend css:content="script.mobilize-init" css:theme="head" />
    <prepend css:content="style.mobilize-init" css:theme="head" />
    <prepend content="/html/head/script[contains(@src, 'mobilize')]" css:theme="head" />
