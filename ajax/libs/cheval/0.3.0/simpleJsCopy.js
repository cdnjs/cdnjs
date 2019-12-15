/*! simpleJsCopy.js v0.3.0 by ryanpcmcquen */

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

(function () {
  'use strict';
  // A simple copy button:
  // - Copies on awesome browsers/devices.
  // - Selects text on underwhelming mobile devices.
  // - The button instructs the user if necessary.
  var simpleJsCopy = function () {
    var copyBtn = document.querySelector('.js-copy-btn');
    var setCopyBtnText = function (textToSet) {
      copyBtn.textContent = textToSet;
    };
    var throwErr = function (err) {
      throw new Error(err);
    };
    var iPhoneORiPod = false,
      iPad = false,
      oldSafari = false;
    var navAgent = navigator.userAgent;
    if (navAgent.match(/iPhone|iPod/i)) {
      iPhoneORiPod = true;
    } else if (navAgent.match(/iPad/i)) {
      iPad = true;
    } else if (
      /^((?!chrome).)*safari/i.test(navAgent)
      // ^ Fancy safari detection thanks to: https://stackoverflow.com/a/23522755
      &&
      !/^((?!chrome).)*[0-9][0-9](\.[0-9][0-9]?)?\ssafari/i.test(navAgent)
      // ^ Even fancier Safari < 10 detection thanks to regex.  :^)
    ) {
      (oldSafari = true);
    }
    if (iPhoneORiPod || iPad || oldSafari) {
      setCopyBtnText("Select text");
    }
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        // Clone the text-to-copy node so that we can
        // create a hidden textarea, with its text value.
        // Thanks to @LeaVerou for the idea.
        var originalCopyItem = document.querySelector('.text-to-copy');
        var dollyTheSheep = originalCopyItem.cloneNode(true);
        var copyItem = document.createElement('textarea');
        // If .value is undefined, .textContent will
        // get assigned to the textarea we made.
        copyItem.value = dollyTheSheep.value || dollyTheSheep.textContent;
        copyItem.style.opacity = 0;
        copyItem.style.position = "absolute";
        document.body.appendChild(copyItem);
        if (copyItem) {
          // Select the text:
          copyItem.select();
          try {
            // Now that we've selected the text, execute the copy command:
            document.execCommand('copy');
            if (iPhoneORiPod) {
              setCopyBtnText("Now tap 'Copy'");
            } else if (iPad) {
              // The iPad doesn't have the 'Copy' box pop up,
              // you have to tap the text first.
              setCopyBtnText("Now tap the text, then 'Copy'");
            } else if (oldSafari) {
              setCopyBtnText("Press Command + C to copy");
            } else {
              setCopyBtnText("Copied!");
            }
          } catch (ignore) {
            setCopyBtnText("Please copy manually");
          }
          originalCopyItem.focus();
          if (iPhoneORiPod || iPad) {
            // This is what selects it on iOS:
            originalCopyItem.selectionStart = 0;
            originalCopyItem.selectionEnd = copyItem.textContent.length;
          } else if (oldSafari) {
            originalCopyItem.select();
          } else {
            copyItem.focus();
            copyItem.select();
          }
          // Disable the button because clicking it again could cause madness.
          copyBtn.disabled = true;
          copyItem.remove();
        } else {
          throwErr("You don't have an element with the class: 'text-to-copy'. Please check the simpleJsCopy README.");
        }
      });
    } else {
      throwErr("You don't have a <button> with the class: 'js-copy-btn'. Please check the simpleJsCopy README.");
    }
  };
  window.addEventListener('DOMContentLoaded', simpleJsCopy);
}());
