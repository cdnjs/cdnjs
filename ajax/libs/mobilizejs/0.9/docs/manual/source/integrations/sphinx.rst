=============================
 Sphinx integration
=============================

.. contents :: :local:

Enabling
========

To enable mobilize, add following script tag to the page.

.. code-block:: html

    <script src="http://cdn.mobilizejs.com/releases/trunk/js/mobilize.sphinx.min.js"></script>

You can do this by adding the src to _templates/layout.html.

.. code-block:: python

    {% set script_files = script_files + ['_static/theme_extras.js', 'http://cdn.mobilizejs.com/releases/trunk/js/mobilize.sphinx.debug.js'] %}
    
    
