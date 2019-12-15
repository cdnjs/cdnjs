/**
nightly.js is a zero dependency javascript library, it makes it easy and painless
to enable the "Night (Dark) mode" in your website
- TODO: Add supported browsers here -
Visit https://github.com/Fcmam5/nightly.js for more info.
Copyright (c) 2018 Fortas Abdeldjalil <dr.fcmam5[at]gmail.com>
All rights reserved.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

/**
  * Default values for the dark theme
  */
var defaults = {
  nightMode: {
            body: "#282828",
            texts: "#f5f5f5",
            inputs: {color: '#f5f5f5', backgroundColor: "#313131"},
            buttons: {color: "#f5f5f5", backgroundColor: "#757575"},
            textareas: {color: '#f5f5f5', backgroundColor: "#313131"},
            links: "#009688",
            classes: [],
            isTwbs3: false
          },
  nightCallback: function(){ },
  dayCallback: function(){ },
}

/**
  *  Create the night mode with the settings passed in the contructor
  *   when not passing any parameters it Nightly will use the default values
  * @param nightMode - Object - The basic configuration of your night mode colors
  * @param nightCallback - function - The callback after establishing the night mode
  * @param dayCallback - function - The callback after disabling the night mode
  */
var Nightly = function(nightMode, nightCallback, dayCallback) {
  this.isDark = false;
  this.initialTheme = null;
  this.nightMode = !nightMode ? defaults.nightMode : {
    body: nightMode.body || defaults.nightMode.body,
    texts: nightMode.texts || defaults.nightMode.texts,
    inputs: {
      color: nightMode.inputs ? nightMode.inputs.color : defaults.nightMode.inputs.color,
      backgroundColor: nightMode.inputs ? nightMode.inputs.backgroundColor :
                                    defaults.nightMode.inputs.backgroundColor
    },
    buttons: {
      color: nightMode.buttons ? nightMode.buttons.color :
                              defaults.nightMode.buttons.color,
      backgroundColor: nightMode.buttons ? nightMode.buttons.backgroundColor :
                        defaults.nightMode.buttons.backgroundColor
    },
    textareas: {
      color: nightMode.textareas ? nightMode.textareas.color : defaults.nightMode.textareas.color,
      backgroundColor: nightMode.textareas ? nightMode.textareas.backgroundColor :
      defaults.nightMode.textareas.backgroundColor
    },
    links: nightMode.links || defaults.nightMode.links,
    classes: nightMode.classes || defaults.nightMode.classes,
    isTwbs3: nightMode.isTwbs3 || defaults.nightMode.isTwbs3,
  };
  this.darkifyCallback = nightCallback || defaults.nightCallback;
  this.lightifyCallback = dayCallback || defaults.dayCallback;
  this.linkTags = document.getElementsByTagName('a');
  this.inputTags = document.getElementsByTagName('input');
  this.buttons = document.getElementsByTagName('button');
  this.textareaTags = document.getElementsByTagName('textarea');

  /**
  * @public
  * Apply the dark theme to the DOM elements
  */
  this.darkify = function() {
    this.isDark = true;
    this.initialTheme = {
      body: document.body.style.backgroundColor,
      texts: document.body.style.color,
      links: this.linkTags[0].style.color || '',
      inputs: {
              color: this.inputTags[0] ? this.inputTags[0].style.color : '',
              backgroundColor: this.inputTags[0] ?
                                    this.inputTags[0].style.backgroundColor : ''
            },
      buttons: {
              color: this.buttons[0] ? this.buttons[0].style.color : '',
              backgroundColor: this.buttons[0] ? this.buttons[0].style.color : ''
            },
      textareas: {
        color: this.textareaTags[0] ? this.textareaTags[0].style.color : '',
        backgroundColor: this.textareaTags[0] ?
        this.textareaTags[0].style.backgroundColor : ''
      },
    };

    document.body.style.backgroundColor = this.nightMode.body;
    document.body.style.color = this.nightMode.texts;
    for (a of this.linkTags) {
      a.style.color = this.nightMode.links;
    }

    for (inp of this.inputTags) {
      inp.style.color = this.nightMode.inputs.color;
      inp.style.backgroundColor = this.nightMode.inputs.backgroundColor;
    }

    for (btn of this.buttons) {
      btn.style.color = this.nightMode.buttons.color;
      btn.style.borderColor = this.nightMode.buttons.backgroundColor;
      btn.style.backgroundColor = this.nightMode.buttons.backgroundColor;
    }

    for (txtarea of this.textareaTags) {
      txtarea.style.color = this.nightMode.textareas.color;
      txtarea.style.borderColor = this.nightMode.textareas.color;
      txtarea.style.backgroundColor = this.nightMode.textareas.backgroundColor;
    }

    if (this.nightMode.classes.length > 0) {
      this.applyClasses();
    }

    this.darkifyCallback();
  };
  /**
  * @public
  * Save the initial styles
  */
  this.lightify = function() {
    if (this.initialTheme) {
      this.isDark = false;
      document.body.style.backgroundColor = this.initialTheme.body;
      document.body.style.color = this.initialTheme.texts;
      for (a of this.linkTags) {
        a.style.color = this.initialTheme.links;
      }

      for (inp of this.inputTags) {
        inp.style.color = this.initialTheme.inputs.color;
        inp.style.backgroundColor = this.initialTheme.inputs.backgroundColor;
      }

      for (btn of this.buttons) {
        btn.style.color = this.initialTheme.buttons.color;
        btn.style.borderColor = this.initialTheme.buttons.backgroundColor;
        btn.style.backgroundColor = this.initialTheme.buttons.backgroundColor;
      }

      for (txtarea of this.textareaTags) {
        txtarea.style.color = this.initialTheme.textareas.color;
        txtarea.style.borderColor = this.initialTheme.textareas.backgroundColor;
        txtarea.style.backgroundColor = this.initialTheme.textareas.backgroundColor;
      }

      if (this.nightMode.classes.length > 0) {
        this.removeClasses();
      }
    }
    this.lightifyCallback();
  };
  /**
  * @public
  * Toggle darkify and lightify
  */
  this.toggle = function() {
    if (this.isDark) {
      this.lightify();
    } else {
      this.darkify();
    }
  };
  /**
  * Twitter Bootstrap 3 configuration
  */
  this.twbs3Darkify = function() {
    // TODO
    if (this.nightMode.isTwbs3) {
      /**
      * Get all navbars and add 'navbar-inverse'
      * https://getbootstrap.com/docs/3.3/components/#navbar-inverted
      */
      var navbars = document.getElementsByClassName('navbar');
      for(nv of navbars) {
        nv.className += " navbar-inverse";
      }

    }
  };
  /**
  * @private
  * Apply classes on given selectors
  */
  this.applyClasses = function() {
    var classes = this.nightMode.classes;
    var element;

    for (var i = 0; i < classes.length; i++) {
      element = document.getElementsByClassName(classes[i].to);
      console.log(element);
      console.log(classes[i].to);
      for (var j = 0; j < element.length; j++) {
        element[j].classList.add(classes[i].apply);
      }
    }
  };
  /**
  * @private
  * Remove classes on given selectors
  */
  this.removeClasses = function() {
    var classes = this.nightMode.classes;
    var element;

    for (var i = 0; i < classes.length; i++) {
      element = document.getElementsByClassName(classes[i].to);
      for (var j = 0; j < element.length; j++) {
        element[j].classList.remove(classes[i].apply);
      }
    }
  };
};
