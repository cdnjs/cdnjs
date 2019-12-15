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

(function (root) {
  /**
    * Default values for the dark theme
    */
  var defaults = {
    nightMode: {
      body: "#282828",
      texts: "#f5f5f5",
      inputs: { color: '#f5f5f5', backgroundColor: "#313131" },
      buttons: { color: "#f5f5f5", backgroundColor: "#757575" },
      textareas: { color: '#f5f5f5', backgroundColor: "#313131" },
      links: "#009688",
      classes: [],
      isTwbs3: false
    },
  }

  /**
    *  Create the night mode with the settings passed in the contructor
    *   when not passing any parameters it Nightly will use the default values
    * @param nightMode - Object - The basic configuration of your night mode colors
    */
  var Nightly = function (nightMode) {
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
    this.linkTags = document.getElementsByTagName('a');
    this.inputTags = document.getElementsByTagName('input');
    this.buttons = document.getElementsByTagName('button');
    this.textareaTags = document.getElementsByTagName('textarea');

    /**
    * @public
    * Apply the dark theme to the DOM elements
    */
    this.darkify = function (cb) {
      this.isDark = true;
      this.initialTheme = {
        body: document.body.style.backgroundColor,
        texts: document.body.style.color,
        links: this.linkTags[0] ? this.linkTags[0].style.color : '',
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

      var linkTagsLength = this.linkTags.length ? this.linkTags.length : 0;
      var inputTagsLength = this.inputTags.length ? this.inputTags.length : 0;
      var buttonTagsLength = this.buttons.length ? this.buttons.length : 0;
      var textareaTagsLength = this.textareaTags.length ? this.textareaTags.length : 0;

      document.body.style.backgroundColor = this.nightMode.body;
      document.body.style.color = this.nightMode.texts;

      for (var i = 0; i < linkTagsLength; i++) {
        this.linkTags[i].style.color = this.nightMode.links;
      }

      for (i = 0; i < inputTagsLength; i++) {
        this.inputTags[i].style.color = this.nightMode.inputs.color;
        this.inputTags[i].style.backgroundColor = this.nightMode.inputs.backgroundColor;
      }

      for (i = 0; i < buttonTagsLength; i++) {
        this.buttons[i].style.color = this.nightMode.buttons.color;
        this.buttons[i].style.borderColor = this.nightMode.buttons.backgroundColor;
        this.buttons[i].style.backgroundColor = this.nightMode.buttons.backgroundColor;
      }

      for (i = 0; i < textareaTagsLength; i++) {
        this.textareaTags[i].style.color = this.nightMode.textareas.color;
        this.textareaTags[i].style.borderColor = this.nightMode.textareas.color;
        this.textareaTags[i].style.backgroundColor = this.nightMode.textareas.backgroundColor;
      }

      if (this.nightMode.classes.length > 0) {
        this.applyClasses();
      }

      if (cb)
        cb();
    };
    /**
    * @public
    * Save the initial styles
    */
    this.lightify = function (cb) {
      if (this.initialTheme) {
        this.isDark = false;
        document.body.style.backgroundColor = this.initialTheme.body;
        document.body.style.color = this.initialTheme.texts;

        var linkTagsLength = this.linkTags.length ? this.linkTags.length : 0;
        var inputTagsLength = this.inputTags.length ? this.inputTags.length : 0;
        var buttonTagsLength = this.buttons.length ? this.buttons.length : 0;
        var textareaTagsLength = this.textareaTags.length ? this.textareaTags.length : 0;

        for (var i = 0; i < linkTagsLength; i++) {
          this.linkTags[i].style.color = this.initialTheme.links;
        }

        for (i = 0; i < inputTagsLength; i++) {
          this.inputTags[i].style.color = this.initialTheme.inputs.color;
          this.inputTags[i].style.backgroundColor = this.initialTheme.inputs.backgroundColor;
        }

        for (i = 0; i < buttonTagsLength; i++) {
          this.buttons[i].style.color = this.initialTheme.buttons.color;
          this.buttons[i].style.borderColor = this.initialTheme.buttons.backgroundColor;
          this.buttons[i].style.backgroundColor = this.initialTheme.buttons.backgroundColor;
        }

        for (i = 0; i < textareaTagsLength; i++) {
          this.textareaTags[i].style.color = this.initialTheme.textareas.color;
          this.textareaTags[i].style.borderColor = this.initialTheme.textareas.backgroundColor;
          this.textareaTags[i].style.backgroundColor = this.initialTheme.textareas.backgroundColor;
        }

        if (this.nightMode.classes.length > 0) {
          this.removeClasses();
        }
      }
      if (cb)
        cb();
    };
    /**
    * @public
    * Toggle darkify and lightify
    */
    this.toggle = function (nightCallback, dayCallback) {
      if (this.isDark) {
        this.lightify(dayCallback);
      } else {
        this.darkify(nightCallback);
      }
    };
    /**
    * Twitter Bootstrap 3 configuration
    */
    this.twbs3Darkify = function () {
      // TODO
      if (this.nightMode.isTwbs3) {
        /**
        * Get all navbars and add 'navbar-inverse'
        * https://getbootstrap.com/docs/3.3/components/#navbar-inverted
        */
        var navbars = document.getElementsByClassName('navbar');
        var navbarCounts = navbars.length ? navbars.length : 0;
        for (var i = 0; i < navbarCounts; i++) {
          navbars[i].className += " navbar-inverse";
        }

      }
    };
    /**
    * @private
    * Apply classes on given selectors
    */
    this.applyClasses = function () {
      var classes = this.nightMode.classes;
      var element;

      for (var i = 0; i < classes.length; i++) {
        element = document.getElementsByClassName(classes[i].to);
        for (var j = 0; j < element.length; j++) {
          element[j].classList.add(classes[i].apply);
        }
      }
    };
    /**
    * @private
    * Remove classes on given selectors
    */
    this.removeClasses = function () {
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

  // Check if it is CommonJS a environments (example: Node)
  if (typeof module === 'object' && module.exports) {
    module.exports = Nightly;
  } else {    
    // Export as browser globals (roow is window)
    root.Nightly = Nightly;
  }

})(this);
