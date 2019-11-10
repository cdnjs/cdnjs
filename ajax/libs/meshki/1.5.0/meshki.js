/*
* Meshki v1.5.0
* Copyright 2016-2017, Mohammad reza Hajianpour <hajianpour.mr@gmail.com>
* https://borderliner.github.io/Meshki/
* Free to use under the MIT license.
* https://opensource.org/licenses/MIT
*/

function ready(fn) {
  document.onreadystatechange = function () {
    if (document.readyState == 'complete')
      fn();
  }​
}

ready(function(){
  if (document.getElementsByClassName('sidenav')[0]) {
    overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';
    overlayDiv.onclick = function () { meshki.closeNav(); };
    document.body.appendChild(overlayDiv);
  }
});

function is_rtl() {
  return (window.getComputedStyle(document.body, null).getPropertyValue('direction') == 'rtl' ? true : false);
}

var meshki = {
  openNav: function() {
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
      if (!is_rtl())
        container.style.marginLeft = '250px';
      else
        container.style.marginRight = '250px';
    }

    overlayDiv.style.opacity = 0.4;
    overlayDiv.style.visibility = 'visible';
  },

  closeNav: function() {
    var sidenav = document.getElementsByClassName('sidenav')[0];
    var container = document.getElementsByClassName('container')[0];
    var overlayDiv = document.getElementsByClassName('overlay')[0];
    var isSidenavPush = (sidenav.className.split(' ').indexOf('push') > -1);

    // Close the Sidenav, pushes it back
    sidenav.style.width = '0';

    if (window.innerWidth > 768 && isSidenavPush)
      container.style.margin = '0';

    overlayDiv.style.opacity = 0;
    overlayDiv.style.visibility = 'hidden';
  }
};
