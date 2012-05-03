Mobilize.js for Wordpress plug-in README
-----------------------------------------

This file contains tips to set-up development environment
for Mobilize.js for Wordpress.

For end user documentation please go to

* http://mobilizejs.com

Tips
----

Symlink this folder to wp-plugins for development.

Pointers how to get bootstrapped development on OSX

* http://blog.mfabrik.com/2010/12/22/local-xampp-development-and-unix-file-permissions/

* http://blog.mfabrik.com/2010/12/21/creating-mysql-database-and-user-from-command-line/

Symlink:

    cd /Users/moo/code/wordpress/wp-content/plugins
    ln -s ~/code/mobilize.js/integrations/mobilizejs_for_wordpress .
    
For development

* Start testserver.py in localhost:8080

* Set DEBUG true in mobilizejs.php    

* Make sure DEBUG <head> code is up-to-date in mobilizejs_init()

Then go to Apache server Wordpress front page, mobilization forced

http://localhost/?mobilize=true