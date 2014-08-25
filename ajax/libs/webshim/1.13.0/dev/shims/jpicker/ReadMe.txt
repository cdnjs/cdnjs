jPicker 1.1.6

jQuery Plugin for Photoshop style color picker

Copyright (c) 2010 Christopher T. Tillman
Digital Magic Productions, Inc. (http://www.digitalmagicpro.com/)
MIT style license, FREE to use, alter, copy, sell, and especially ENHANCE

Painstakingly ported from John Dyers' excellent work on his own color picker based on the Prototype framework.

John Dyers' website: (http://johndyer.name)
Color Picker page:   (http://johndyer.name/post/2007/09/PhotoShop-like-JavaScript-Color-Picker.aspx)


    jPicker is a fast, lightweight jQuery plugin for including an advanced color picker in your web projects.
It has been painstakenly ported from John Dyers' awesome work on his picker using the Prototype framework.

    jPicker supports all current browsers and has been extensively tested in Chrome, Firefox, IE5.5+, Safari,
and Opera.

    If you are updating a current version, you MUST always use the CSS and image files from the download as
there may have been changes.

    If you are moving from a V1.0.* version, you MUST read the docs below to implement some changes to the
Color object returned by the callback functions.


Known Issues
______________
Attaching multiple jPicker objects on a single page will slow performance.
  jPicker creates a new instance of the picker for every element. Performance will suffer when binding dozens of instances.


Coming Soon
______________

    Will consider supporting jQuery ThemeRoller CSS API for theming the UI if demand exists.

Planned For Future Release
______________

  Move the jPicker object to a single instance that all selection instances point to.
     - This will result in much faster operation and initialization for pages with multiple pickers.

  Add activateCallback option for calling a callback function when the jPicker is activated or its binding is switched to a different picker element.
  
  Add multiple window modes for picker operation, include modal, popup, windowed, and exclusive.