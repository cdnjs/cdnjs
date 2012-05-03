================== 
 Testing
==================

.. contents :: :local:

Smoke testing
======================================

Generate local JS and CSS bundles by preprocessing files and merging them::

    ./release.py --local=true

You can open static test HTML files through testserver.py

.. code-block:: console

    python testserver.py
    
    ...
    
    
    serving at port 8080
    Open test page http://localhost:8080/tests/localstorage-testing.html?mobilize=true
    Open test page http://localhost:8080/tests/sphinx-front-page.html?mobilize=true
    Open test page http://localhost:8080/tests/wordpress-post-page.html?mobilize=true
    ...
    
Then just open the test URL in a browser of your choice.

Depending on the test case, the HTML file may use bundles or load scripts directly
without bundling.    

Unit testing
============

For running tests from command line we'll use NodeJS.

Installing NodeJS
-----------------
See: https://github.com/ry/node/wiki/Installation

.. code-block:: sh

	mkdir ~/local
	./configure --prefix=$HOME/local/node
	make
	make install
	export PATH=$HOME/local/node/bin:$PATH

Installing NPM(NodeJS Package Manager)
--------------------------------------

See: http://npmjs.org/

.. code-block:: sh

	curl http://npmjs.org/install.sh | sudo sh

Install jQuery for NodeJS
-------------------------

.. code-block:: sh

	npm install jquery

Running tests
-------------

Go to tests folder and execute:

.. code-block:: sh

	node <testname>.js


Code analysis
=============

We enforce practice to scan the sources with jslint before commit.
This is achieved via pre-commit hook. To enable the hook, you must
run script ./run-this-after-clone, which symlinks the githooks folder
to ./git/hooks folder. This is required as git does not support
hooks in repository.

You can also run the scan manually with jslint.py, which adds an
error filtering layer to skip errors we have determined to be invalid.
 
If jslint finds error, jslint.py checks if the error line has "jslint:ignore" text
and ignores the error if it exists.

This will scan all but jquery files(which we don't care about):

.. code-block:: sh

    python jslint.py "js/*.js-jquery*"

Install jslint for NodeJS
-------------------------

.. code-block:: sh

    npm install jslint

Content delivery testing
==========================

* Run ``release.py trunk``

* Start testserver.py, make sure it runs port 8080

* Open ``cloud-wordpress-front-page.html``

Devices and simulators 
========================

Apple
-----------

Use iOS simulator.

You can directly open localhost:8080 URLs. 
No copy-paste from host systems supported, remember to bookmark URLs.

Android
------------

Use Android emulator.

Android emulator runs in its own guest operating system,
so it has different IP address. You need to use
your computer LAN IP to access the test server
from Android emulator.   

Nokia devices:
-----------------

Use Nokia remote device acces 

* http://www.forum.nokia.com/Devices/Remote_device_access/
