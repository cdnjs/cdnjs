/*
 * Meshki v2.2.0 (https://borderliner.github.io/Meshki/)
 * Copyright 2016+ Ryan Hajianpour <ryan.hajianpour@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Disable ES6 specific eslint errors
/* eslint prefer-arrow-callback: off */
/* eslint no-var: off */
/* eslint object-shorthand: off */
/* eslint func-names: off */

var meshki = {
  isRTL: function () {
    return (window.getComputedStyle(document.body, null).getPropertyValue('direction') === 'rtl');
  },

  openSidenav: function () {
    var sidenav = document.getElementsByClassName('sidenav')[0];
    var container = document.getElementsByClassName('container')[0];
    // Is sidenav a "Push Sidenav"?
    var isSidenavPush = (sidenav.className.split(' ').indexOf('push') > -1);
    var overlayDiv = document.getElementsByClassName('overlay')[0];

    // Set Sidenav's width to 250px, starts sliding
    sidenav.style.width = '250px';
    // If on Desktop and the sidenav is a push one, push "container"
    if (window.innerWidth > 768 && isSidenavPush) {
      // Hide body overflow-x
      document.body.style.overflowX = 'hidden';
      // If not RTL
      if (!this.isRTL()) {
        container.style.marginLeft = '250px';
      } else {
        container.style.marginRight = '250px';
      }
    }

    overlayDiv.style.opacity = 0.4;
    overlayDiv.style.visibility = 'visible';
  },

  closeSidenav: function () {
    var sidenav = document.getElementsByClassName('sidenav')[0];
    var container = document.getElementsByClassName('container')[0];
    var overlayDiv = document.getElementsByClassName('overlay')[0];
    var isSidenavPush = (sidenav.className.split(' ').indexOf('push') > -1);

    // Close the Sidenav, pushes it back
    sidenav.style.width = '0';

    if (window.innerWidth > 768 && isSidenavPush) {
      container.style.margin = '0';
    }

    overlayDiv.style.opacity = 0;
    overlayDiv.style.visibility = 'hidden';
  },
};

function ready(fn) {
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      fn();
    }
  };
}

ready(function () {
  var overlayDiv = document.createElement('div');
  if (document.getElementsByClassName('sidenav')[0]) {
    overlayDiv.className = 'overlay';
    overlayDiv.onclick = function () { meshki.closeSidenav(); };
    document.body.appendChild(overlayDiv);
  }
});

