=============================
 PHP
=============================

.. contents :: :local:

Introduction
=============

This chapter shows how to integrate mobilize.js with your PHP code.

Check if the client is a mobile browser
========================================
      
Below is a PHP example to check the presence of the doc:`mobilize-mobile cookie </serverside>`.

.. code-block:: php

    /**
     * Check if mobilize.js mobile cookie has been set to mobile mode.
     * 
     * @return true if the client wants to render the page in mobile optimized way 
     */
    function is_mobile() {
        
        // Javascript cookie has been set and it is set to mobile mode
        if(array_key_exists('mobilize-mobile', $_COOKIE)) {
            return $_COOKIE['mobilize-mobile'] == '1';
        }
        
        return false;
    }   



