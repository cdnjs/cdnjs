/* simpleJsCopy.js v0.2.0 by @ryanpcmcquen */

// Ryan P.C. McQuen | Everett, WA | ryan.q@linux.com
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version, with the following exception:
// the text of the GPL license may be omitted.
//
// This program is distributed in the hope that it will be useful, but
// without any warranty; without even the implied warranty of
// merchantability or fitness for a particular purpose. Compiling,
// interpreting, executing or merely reading the text of the program
// may result in lapses of consciousness and/or very being, up to and
// including the end of all existence and the Universe as we know it.
// See the GNU General Public License for more details.
//
// You may have received a copy of the GNU General Public License along
// with this program (most likely, a file named COPYING).  If not, see
// <https://www.gnu.org/licenses/>.

/*global window*/
/*jslint browser:true, white:true*/

(function() {
  'use strict';
  // a stupidly simple copy button
  // - copies on awesome browsers/devices
  // - selects text on underwhelming mobile devices
  // - the button instructs the user if necessary
  window.addEventListener('load', function() {
    var copyBtn = document.querySelector('.js-copy-btn');
    var iPhoneORiPod = false,
      iPad = false,
      safari = false;
    if (navigator.userAgent.match(/iPhone|iPod/i)) {
      iPhoneORiPod = true;
    } else if (navigator.userAgent.match(/iPad/i)) {
      iPad = true;
    } else if (/^((?!chrome).)*safari/i.test(navigator.userAgent)) {
      safari = true;
    }
    if (iPhoneORiPod || iPad || safari) {
      copyBtn.textContent = "Select text";
    }
    copyBtn.addEventListener('click', function() {
      // select the text
      var copyItem = document.querySelector('.text-to-copy');
      copyItem.select();
      try {
        // now that we've selected the text, execute the copy command
        document.execCommand('copy');
        if (iPhoneORiPod) {
          copyBtn.textContent = "Now tap 'Copy'";
        } else if (iPad) {
          // the iPad doesn't have the 'Copy' box pop up,
          // you have to tap the text first
          copyBtn.textContent = "Now tap the text, then 'Copy'";
        } else if (safari) {
          // fancy safari detection thanks to: http://stackoverflow.com/a/23522755
          copyBtn.textContent = "Press Command + C to copy";
        } else {
          copyBtn.textContent = "Copied!";
        }
      } catch (ignore) {
        copyBtn.textContent = "Please copy manually";
      }
      // this is what selects it on iOS
      copyItem.focus();
      if (iPhoneORiPod || iPad) {
        copyItem.selectionStart = 0;
        copyItem.selectionEnd = copyItem.textContent.length;
      } else {
        copyItem.select();
      }

      // disable the button because clicking it again could cause madness
      copyBtn.disabled = true;
    });
  });
}());
