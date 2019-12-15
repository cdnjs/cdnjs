/*! simpleJsCopy.js v0.2.3 by ryanpcmcquen */

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
  // a stupidly simple copy button
  // - copies on awesome browsers/devices
  // - selects text on underwhelming mobile devices
  // - the button instructs the user if necessary
  window.addEventListener('load', function () {
    var copyBtn = document.querySelector('.js-copy-btn');
    var setCopyBtnText = function (textToSet) {
      copyBtn.textContent = textToSet;
    };
    var throwErr = function (err) {
      throw new Error(err);
    };
    var iPhoneORiPod = false,
      iPad = false,
      safari = false;
    var navAgent = navigator.userAgent;
    if (navAgent.match(/iPhone|iPod/i)) {
      iPhoneORiPod = true;
    } else if (navAgent.match(/iPad/i)) {
      iPad = true;
    } else if (/^((?!chrome).)*safari/i.test(navAgent)) {
      // ^ fancy safari detection thanks to: https://stackoverflow.com/a/23522755
      safari = true;
    }
    if (iPhoneORiPod || iPad || safari) {
      setCopyBtnText("Select text");
    }
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        // select the text
        var copyItem = document.querySelector('.text-to-copy');
        if (copyItem) {
          copyItem.select();
          try {
            // now that we've selected the text, execute the copy command
            document.execCommand('copy');
            if (iPhoneORiPod) {
              setCopyBtnText("Now tap 'Copy'");
            } else if (iPad) {
              // the iPad doesn't have the 'Copy' box pop up,
              // you have to tap the text first
              setCopyBtnText("Now tap the text, then 'Copy'");
            } else if (safari) {
              setCopyBtnText("Press Command + C to copy");
            } else {
              setCopyBtnText("Copied!");
            }
          } catch (ignore) {
            setCopyBtnText("Please copy manually");
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
        } else {
          throwErr("You don't have a <textarea> with the class: 'text-to-copy'. Please check the simpleJsCopy README.");
        }
      });
    } else {
      throwErr("You don't have a <button> with the class: 'js-copy-btn'. Please check the simpleJsCopy README.");
    }
  });
}());
