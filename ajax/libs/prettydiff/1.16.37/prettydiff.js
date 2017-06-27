/*prettydiff.com topcoms: true, insize: 4, inchar: " ", vertical: true */
/*jshint laxbreak: true*/
/*global __dirname, ace, csspretty, csvpretty, define, diffview, exports, global, jspretty, markuppretty, process, require, safeSort */
/*

 Execute in a NodeJS app:

    npm install prettydiff        (local install)

    var prettydiff = require("prettydiff"),
        args       = {
            source: "asdf",
            diff  : "asdd",
            lang  : "text"
        },
        output     = prettydiff.api(args);

 Execute on command line with NodeJS:

    npm install prettydiff -g     (global install)

    prettydiff source:"c:\mydirectory\myfile.js" readmethod:"file" diff:"c:\myotherfile.js"

 Execute with WSH:
    cscript prettydiff.wsf /source:"myFile.xml" /mode:"beautify"

 Execute from JavaScript:
    var global = {},
        args   = {
            source: "asdf",
            diff  : "asdd",
            lang  : "text"
        },
        output = prettydiff(args);


                *******   license start   *******
 @source: http://prettydiff.com/prettydiff.js
 @documentation - English: http://prettydiff.com/documentation.xhtml

 @licstart  The following is the entire license notice for Pretty Diff.

 This code may not be used or redistributed unless the following
 conditions are met:

 * Prettydiff created by Austin Cheney originally on 3 Mar 2009.
 http://prettydiff.com/

 * The use of diffview.js and prettydiff.js must contain the following
 copyright:
 Copyright (c) 2007, Snowtide Informatics Systems, Inc.
 All rights reserved.
     - Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
     - Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the
 distribution.
     - Neither the name of the Snowtide Informatics Systems nor the
 names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written
 permission.
     - used as diffview function
     http://prettydiff.com/lib/diffview.js

 * The code mentioned above has significantly expanded documentation in
 each of the respective function's external JS file as linked from the
 documentation page:
 http://prettydiff.com/documentation.php

 * In addition to the previously stated requirements any use of any
 component, aside from directly using the full files in their entirety,
 must restate the license mentioned at the top of each concerned file.

 If each and all these conditions are met use, extension, alteration,
 and redistribution of Pretty Diff and its required assets is unlimited
 and free without author permission.

 @licend  The above is the entire license notice for Pretty Diff.
                *******   license end   *******


 Join the Pretty Diff mailing list at:
 https://groups.google.com/d/forum/pretty-diff

 Special thanks to:

 * Harry Whitfield for the numerous test cases provided against
 JSPretty.  http://g6auc.me.uk/

 * Andreas Greuel for contributing samples to test diffview.js
 https://plus.google.com/105958105635636993368/posts

 */
if (typeof require === "function" && typeof ace !== "object") {
    (function glib_prettydiff() {
        "use strict";
        var localPath = (typeof process === "object" && typeof process.cwd === "function" && (process.cwd() === "/" || (/^([a-z]:\\)$/).test(process.cwd()) === true) && typeof __dirname === "string")
            ? __dirname
            : ".";
        if (global.csspretty === undefined) {
            global.csspretty = require(localPath + "/lib/csspretty.js").api;
        }
        if (global.csvpretty === undefined) {
            global.csvpretty = require(localPath + "/lib/csvpretty.js").api;
        }
        if (global.diffview === undefined) {
            global.diffview = require(localPath + "/lib/diffview.js").api;
        }
        if (global.jspretty === undefined) {
            global.jspretty = require(localPath + "/lib/jspretty.js").api;
        }
        if (global.markuppretty === undefined) {
            global.markuppretty = require(localPath + "/lib/markuppretty.js").api;
        }
        if (global.safeSort === undefined) {
            global.safeSort = require(localPath + "/lib/safeSort.js").api;
        }
    }());
} else {
    global.csspretty    = csspretty;
    global.csvpretty    = csvpretty;
    global.diffview     = diffview;
    global.jspretty     = jspretty;
    global.markuppretty = markuppretty;
    global.safeSort     = safeSort;
}
var prettydiff = function prettydiff_(api) {
    "use strict";
    var startTime = (typeof Date.now === "function")
            ? Date.now()
            : (function prettydiff__dateShim() {
                var dateItem = new Date();
                return Date.parse(dateItem);
            }()),
        core      = function core_(api) {
            var spacetest   = (/^\s+$/g),
                apioutput   = "",
                apidiffout  = "",
                builder     = {
                    css   : {
                        color  : {
                            canvas: "#prettydiff.canvas{background:#986 url('data:image/png;base64,iVBORw0KGgoAAAANSU" +
                                        "hEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAKT2lDQ1BQaG90b3Nob3AgSU" +
                                        "NDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8" +
                                        "igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEe" +
                                        "CDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kT" +
                                        "hLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAG" +
                                        "g7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8l" +
                                        "c88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/" +
                                        "P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQL" +
                                        "UAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TK" +
                                        "Ucz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AX" +
                                        "uRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARK" +
                                        "CBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwl" +
                                        "W4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHf" +
                                        "I9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o" +
                                        "8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE" +
                                        "7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpF" +
                                        "TSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEO" +
                                        "U05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9" +
                                        "BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCp" +
                                        "VKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/Y" +
                                        "kGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj" +
                                        "8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0" +
                                        "onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/" +
                                        "VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJg" +
                                        "YmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutr" +
                                        "xuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+" +
                                        "6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2" +
                                        "e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+" +
                                        "BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8" +
                                        "Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyO" +
                                        "yQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry" +
                                        "1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpx" +
                                        "apLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLO" +
                                        "W5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrA" +
                                        "VZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sj" +
                                        "xxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1Yf" +
                                        "qGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO" +
                                        "319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7Jvt" +
                                        "tVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy" +
                                        "0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9" +
                                        "sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dP" +
                                        "Ky2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/" +
                                        "fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY" +
                                        "+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28" +
                                        "bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAEFdaVRYdF" +
                                        "hNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIen" +
                                        "JlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPS" +
                                        "JBZG9iZSBYTVAgQ29yZSA1LjYtYzAxNCA3OS4xNTY3OTcsIDIwMTQvMDgvMjAtMDk6NTM6MDIgICAgIC" +
                                        "AgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZG" +
                                        "Ytc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgIC" +
                                        "AgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbn" +
                                        "M6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOn" +
                                        "N0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIC" +
                                        "AgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3" +
                                        "VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLz" +
                                        "EuMS8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3" +
                                        "Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLz" +
                                        "EuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj" +
                                        "4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3" +
                                        "NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMS0xMlQxMj" +
                                        "oyNDozOC0wNjowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMT" +
                                        "YtMDEtMTNUMTM6MTg6MDctMDY6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaW" +
                                        "Z5RGF0ZT4yMDE2LTAxLTEzVDEzOjE4OjA3LTA2OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPH" +
                                        "htcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZGYzYjhkMy03NzgyLTQ0MGUtYjA5OS1iYjM5NjA0MDVhOW" +
                                        "Q8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOn" +
                                        "Bob3Rvc2hvcDoxYzM3NjE4MS1mOWU4LTExNzgtOWE5Yy1kODI1ZGZiMGE0NzA8L3htcE1NOkRvY3VtZW" +
                                        "50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo2YjI0ZTI3YS1jZj" +
                                        "A3LTQ5ZDEtOWIwZC02ODEzMTFkNzQwMzE8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgIC" +
                                        "AgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOm" +
                                        "xpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj" +
                                        "5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPn" +
                                        "htcC5paWQ6NmIyNGUyN2EtY2YwNy00OWQxLTliMGQtNjgxMzExZDc0MDMxPC9zdEV2dDppbnN0YW5jZU" +
                                        "lEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAxLTEyVDEyOjI0OjM4LTA2OjAwPC" +
                                        "9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG" +
                                        "90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgIC" +
                                        "AgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2" +
                                        "UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgIC" +
                                        "AgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDUzYzc4NDMtYTVmMi00ODQ3LT" +
                                        "hjNDMtNmUyYzBhNDY4YmViPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdn" +
                                        "Q6d2hlbj4yMDE2LTAxLTEyVDEyOjI0OjM4LTA2OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgIC" +
                                        "AgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKT" +
                                        "wvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3" +
                                        "RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bG" +
                                        "kgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPm" +
                                        "Rlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y2" +
                                        "9udmVydGVkIGZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3A8L3" +
                                        "N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cm" +
                                        "RmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdG" +
                                        "lvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD" +
                                        "54bXAuaWlkOjgzYTc5MGFkLWMwZWQtNGIzYS05ZDJhLWE5YzQ2MWRmMzVhMTwvc3RFdnQ6aW5zdGFuY2" +
                                        "VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wMS0xM1QxMzoxMzoyMy0wNjowMD" +
                                        "wvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUG" +
                                        "hvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgIC" +
                                        "AgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcm" +
                                        "RmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgIC" +
                                        "AgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgIC" +
                                        "AgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG" +
                                        "9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgIC" +
                                        "A8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+Ci" +
                                        "AgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgIC" +
                                        "AgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDoxZGYzYjhkMy03NzgyLTQ0MGUtYjA5OS" +
                                        "1iYjM5NjA0MDVhOWQ8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aG" +
                                        "VuPjIwMTYtMDEtMTNUMTM6MTg6MDctMDY6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgID" +
                                        "xzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChNYWNpbnRvc2gpPC9zdE" +
                                        "V2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dD" +
                                        "pjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogIC" +
                                        "AgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2" +
                                        "VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6ODNhNz" +
                                        "kwYWQtYzBlZC00YjNhLTlkMmEtYTljNDYxZGYzNWExPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgIC" +
                                        "AgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjgzYTc5MGFkLWMwZWQtNGIzYS05ZDJhLWE5YzQ2MW" +
                                        "RmMzVhMTwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbn" +
                                        "RJRD54bXAuZGlkOjZiMjRlMjdhLWNmMDctNDlkMS05YjBkLTY4MTMxMWQ3NDAzMTwvc3RSZWY6b3JpZ2" +
                                        "luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8ZGM6Zm" +
                                        "9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC" +
                                        "9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRU" +
                                        "M2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj" +
                                        "4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAwMDAwLzEwMD" +
                                        "AwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAwMDAwLzEwMD" +
                                        "AwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOl" +
                                        "Jlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT" +
                                        "4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjQ8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogIC" +
                                        "AgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgID" +
                                        "wvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA" +
                                        "ogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCi" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA" +
                                        "ogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCi" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+bleIyQAAAC" +
                                        "BjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAANElEQVR42mJ89+4uAwMDAw" +
                                        "PD6lkTGd69u/vu3d2ZHXnv3t1lgLPevbvLrCTIEJqWD1EJGADaTRll80WcLAAAAABJRU5ErkJggg==')" +
                                        ";color:#420}#prettydiff.canvas *:focus{outline:0.1em dashed #f00}#prettydiff.can" +
                                        "vas a{color:#039}#prettydiff.canvas .contentarea,#prettydiff.canvas legend,#pret" +
                                        "tydiff.canvas fieldset select,#prettydiff.canvas .diff td,#prettydiff.canvas .re" +
                                        "port td,#prettydiff.canvas .data li,#prettydiff.canvas .diff-right,#prettydiff.c" +
                                        "anvas fieldset input{background:#eeeee8;border-color:#420}#prettydiff.canvas sel" +
                                        "ect,#prettydiff.canvas input,#prettydiff.canvas .diff,#prettydiff.canvas .beauti" +
                                        "fy,#prettydiff.canvas .report,#prettydiff.canvas .beautify h3,#prettydiff.canvas" +
                                        " .diff h3,#prettydiff.canvas .beautify h4,#prettydiff.canvas .diff h4,#prettydif" +
                                        "f.canvas #report,#prettydiff.canvas #report .author,#prettydiff.canvas fieldset{" +
                                        "background:#ddddd8;border-color:#420}#prettydiff.canvas fieldset fieldset{backgr" +
                                        "ound:#eeeee8}#prettydiff.canvas fieldset fieldset input,#prettydiff.canvas field" +
                                        "set fieldset select{background:#ddddd8}#prettydiff.canvas h2,#prettydiff.canvas " +
                                        "h2 button,#prettydiff.canvas h3,#prettydiff.canvas legend{color:#900}#prettydiff" +
                                        ".canvas .contentarea{box-shadow:0 1em 1em #b8a899}#prettydiff.canvas .segment{ba" +
                                        "ckground:#fff}#prettydiff.canvas h2 button,#prettydiff.canvas .segment,#prettydi" +
                                        "ff.canvas ol.segment li{border-color:#420}#prettydiff.canvas th{background:#e8dd" +
                                        "cc}#prettydiff.canvas li h4{color:#06f}#prettydiff.canvas code{background:#eee;b" +
                                        "order-color:#eee;color:#00f}#prettydiff.canvas ol.segment h4 strong{color:#c00}#" +
                                        "prettydiff.canvas button{background-color:#ddddd8;border-color:#420;box-shadow:0" +
                                        " 0.25em 0.5em #b8a899;color:#900}#prettydiff.canvas button:hover{background-colo" +
                                        "r:#ccb;border-color:#630;box-shadow:0 0.25em 0.5em #b8a899;color:#630}#prettydif" +
                                        "f.canvas th{background:#ccccc8}#prettydiff.canvas thead th,#prettydiff.canvas th" +
                                        ".heading{background:#ccb}#prettydiff.canvas .diff h3{background:#ddd;border-colo" +
                                        "r:#999}#prettydiff.canvas td,#prettydiff.canvas th,#prettydiff.canvas .segment,#" +
                                        "prettydiff.canvas .count li,#prettydiff.canvas .data li,#prettydiff.canvas .diff" +
                                        "-right{border-color:#ccccc8}#prettydiff.canvas .count{background:#eed;border-col" +
                                        "or:#999}#prettydiff.canvas .count li.fold{color:#900}#prettydiff.canvas h2 butto" +
                                        "n{background:#f8f8f8;box-shadow:0.1em 0.1em 0.25em #ddd}#prettydiff.canvas li h4" +
                                        "{color:#00f}#prettydiff.canvas code{background:#eee;border-color:#eee;color:#009" +
                                        "}#prettydiff.canvas ol.segment h4 strong{color:#c00}#prettydiff.canvas .data .de" +
                                        "lete{background:#ffd8d8}#prettydiff.canvas .data .delete em{background:#fff8f8;b" +
                                        "order-color:#c44;color:#900}#prettydiff.canvas .data .insert{background:#d8ffd8}" +
                                        "#prettydiff.canvas .data .insert em{background:#f8fff8;border-color:#090;color:#" +
                                        "363}#prettydiff.canvas .data .replace{background:#fec}#prettydiff.canvas .data ." +
                                        "replace em{background:#ffe;border-color:#a86;color:#852}#prettydiff.canvas .data" +
                                        " .empty{background:#ddd}#prettydiff.canvas .data em.s0{color:#000}#prettydiff.ca" +
                                        "nvas .data em.s1{color:#f66}#prettydiff.canvas .data em.s2{color:#12f}#prettydif" +
                                        "f.canvas .data em.s3{color:#090}#prettydiff.canvas .data em.s4{color:#d6d}#prett" +
                                        "ydiff.canvas .data em.s5{color:#7cc}#prettydiff.canvas .data em.s6{color:#c85}#p" +
                                        "rettydiff.canvas .data em.s7{color:#737}#prettydiff.canvas .data em.s8{color:#6d" +
                                        "0}#prettydiff.canvas .data em.s9{color:#dd0}#prettydiff.canvas .data em.s10{colo" +
                                        "r:#893}#prettydiff.canvas .data em.s11{color:#b97}#prettydiff.canvas .data em.s1" +
                                        "2{color:#bbb}#prettydiff.canvas .data em.s13{color:#cc3}#prettydiff.canvas .data" +
                                        " em.s14{color:#333}#prettydiff.canvas .data em.s15{color:#9d9}#prettydiff.canvas" +
                                        " .data em.s16{color:#880}#prettydiff.canvas .data .l0{background:#eeeee8}#pretty" +
                                        "diff.canvas .data .l1{background:#fed}#prettydiff.canvas .data .l2{background:#d" +
                                        "ef}#prettydiff.canvas .data .l3{background:#efe}#prettydiff.canvas .data .l4{bac" +
                                        "kground:#fef}#prettydiff.canvas .data .l5{background:#eef}#prettydiff.canvas .da" +
                                        "ta .l6{background:#fff8cc}#prettydiff.canvas .data .l7{background:#ede}#prettydi" +
                                        "ff.canvas .data .l8{background:#efc}#prettydiff.canvas .data .l9{background:#ffd" +
                                        "}#prettydiff.canvas .data .l10{background:#edc}#prettydiff.canvas .data .l11{bac" +
                                        "kground:#fdb}#prettydiff.canvas .data .l12{background:#f8f8f8}#prettydiff.canvas" +
                                        " .data .l13{background:#ffb}#prettydiff.canvas .data .l14{background:#eec}#prett" +
                                        "ydiff.canvas .data .l15{background:#cfc}#prettydiff.canvas .data .l16{background" +
                                        ":#eea}#prettydiff.canvas .data .c0{background:inherit}#prettydiff.canvas #report" +
                                        " p em{color:#060}#prettydiff.canvas #report p strong{color:#009}",
                            shadow: "#prettydiff.shadow{background:#333 url('data:image/png;base64,iVBORw0KGgoAAAANSU" +
                                        "hEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAKT2lDQ1BQaG90b3Nob3AgSU" +
                                        "NDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8" +
                                        "igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEe" +
                                        "CDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kT" +
                                        "hLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAG" +
                                        "g7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8l" +
                                        "c88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/" +
                                        "P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQL" +
                                        "UAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TK" +
                                        "Ucz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AX" +
                                        "uRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARK" +
                                        "CBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwl" +
                                        "W4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHf" +
                                        "I9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o" +
                                        "8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE" +
                                        "7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpF" +
                                        "TSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEO" +
                                        "U05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9" +
                                        "BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCp" +
                                        "VKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/Y" +
                                        "kGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj" +
                                        "8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0" +
                                        "onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/" +
                                        "VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJg" +
                                        "YmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutr" +
                                        "xuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+" +
                                        "6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2" +
                                        "e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+" +
                                        "BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8" +
                                        "Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyO" +
                                        "yQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry" +
                                        "1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpx" +
                                        "apLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLO" +
                                        "W5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrA" +
                                        "VZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sj" +
                                        "xxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1Yf" +
                                        "qGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO" +
                                        "319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7Jvt" +
                                        "tVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy" +
                                        "0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9" +
                                        "sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dP" +
                                        "Ky2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/" +
                                        "fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY" +
                                        "+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28" +
                                        "bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAEQFaVRYdF" +
                                        "hNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIen" +
                                        "JlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPS" +
                                        "JBZG9iZSBYTVAgQ29yZSA1LjYtYzAxNCA3OS4xNTY3OTcsIDIwMTQvMDgvMjAtMDk6NTM6MDIgICAgIC" +
                                        "AgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZG" +
                                        "Ytc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgIC" +
                                        "AgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbn" +
                                        "M6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOn" +
                                        "N0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIC" +
                                        "AgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3" +
                                        "VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLz" +
                                        "EuMS8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3" +
                                        "Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLz" +
                                        "EuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj" +
                                        "4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3" +
                                        "NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMS0xMlQxMj" +
                                        "oyNDozOC0wNjowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMT" +
                                        "YtMDEtMTNUMTU6MTE6MzMtMDY6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaW" +
                                        "Z5RGF0ZT4yMDE2LTAxLTEzVDE1OjExOjMzLTA2OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPH" +
                                        "htcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo4MDAwYTE3Zi1jZTY1LTQ5NTUtYjFmMS05YjVkODIwNDIyNj" +
                                        "U8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOn" +
                                        "Bob3Rvc2hvcDoxZmZhNDk1Yy1mYTU2LTExNzgtOWE5Yy1kODI1ZGZiMGE0NzA8L3htcE1NOkRvY3VtZW" +
                                        "50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo2YjI0ZTI3YS1jZj" +
                                        "A3LTQ5ZDEtOWIwZC02ODEzMTFkNzQwMzE8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgIC" +
                                        "AgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOm" +
                                        "xpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj" +
                                        "5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPn" +
                                        "htcC5paWQ6NmIyNGUyN2EtY2YwNy00OWQxLTliMGQtNjgxMzExZDc0MDMxPC9zdEV2dDppbnN0YW5jZU" +
                                        "lEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAxLTEyVDEyOjI0OjM4LTA2OjAwPC" +
                                        "9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG" +
                                        "90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgIC" +
                                        "AgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2" +
                                        "UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgIC" +
                                        "AgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDUzYzc4NDMtYTVmMi00ODQ3LT" +
                                        "hjNDMtNmUyYzBhNDY4YmViPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdn" +
                                        "Q6d2hlbj4yMDE2LTAxLTEyVDEyOjI0OjM4LTA2OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgIC" +
                                        "AgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKT" +
                                        "wvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3" +
                                        "RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bG" +
                                        "kgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPm" +
                                        "Rlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y2" +
                                        "9udmVydGVkIGZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3A8L3" +
                                        "N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cm" +
                                        "RmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdG" +
                                        "lvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD" +
                                        "54bXAuaWlkOjgzYTc5MGFkLWMwZWQtNGIzYS05ZDJhLWE5YzQ2MWRmMzVhMTwvc3RFdnQ6aW5zdGFuY2" +
                                        "VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wMS0xM1QxMzoxMzoyMy0wNjowMD" +
                                        "wvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUG" +
                                        "hvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgIC" +
                                        "AgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcm" +
                                        "RmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgIC" +
                                        "AgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgIC" +
                                        "AgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjA0ZGYyNDk5LWE1NTktNDE4MC1iNjA1LWI2MT" +
                                        "k3MWMxNWEwMzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+Mj" +
                                        "AxNi0wMS0xM1QxNToxMTozMy0wNjowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RX" +
                                        "Z0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCk8L3N0RXZ0On" +
                                        "NvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW" +
                                        "5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYX" +
                                        "JzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZW" +
                                        "Q8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcH" +
                                        "BsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz" +
                                        "4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVH" +
                                        "lwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RX" +
                                        "Z0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb2" +
                                        "0gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZX" +
                                        "RlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYX" +
                                        "JzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3" +
                                        "RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjgwMD" +
                                        "BhMTdmLWNlNjUtNDk1NS1iMWYxLTliNWQ4MjA0MjI2NTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgIC" +
                                        "AgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wMS0xM1QxNToxMTozMy0wNjowMDwvc3RFdnQ6d2hlbj" +
                                        "4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDID" +
                                        "IwMTQgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdE" +
                                        "V2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgIC" +
                                        "AgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHhtcE1NOk" +
                                        "Rlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3" +
                                        "RhbmNlSUQ+eG1wLmlpZDowNGRmMjQ5OS1hNTU5LTQxODAtYjYwNS1iNjE5NzFjMTVhMDM8L3N0UmVmOm" +
                                        "luc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnhtcC5kaWQ6ODNhNzkwYWQtYz" +
                                        "BlZC00YjNhLTlkMmEtYTljNDYxZGYzNWExPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICAgICA8c3" +
                                        "RSZWY6b3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NmIyNGUyN2EtY2YwNy00OWQxLTliMGQtNjgxMz" +
                                        "ExZDc0MDMxPC9zdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZE" +
                                        "Zyb20+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG" +
                                        "90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3" +
                                        "A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgIC" +
                                        "AgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZX" +
                                        "NvbHV0aW9uPjMwMDAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZX" +
                                        "NvbHV0aW9uPjMwMDAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc2" +
                                        "9sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2" +
                                        "U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NDwvZXhpZj" +
                                        "pQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj40PC9leGlmOlBpeG" +
                                        "VsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG" +
                                        "1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA" +
                                        "ogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCi" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA" +
                                        "ogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCi" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC" +
                                        "AgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2" +
                                        "tldCBlbmQ9InciPz5hSvvCAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxU" +
                                        "YAAAAlSURBVHjaPMYxAQAwDAMgVkv1VFFRuy9cvN0F7m66JNNhOvwBAPyqCtNeO5K2AAAAAElFTkSuQm" +
                                        "CC');color:#fff}#prettydiff.shadow *:focus{outline:0.1em dashed #ff0}#prettydiff" +
                                        ".shadow a:visited{color:#f93}#prettydiff.shadow a{color:#cf3}#prettydiff.shadow " +
                                        ".contentarea,#prettydiff.shadow legend,#prettydiff.shadow fieldset select,#prett" +
                                        "ydiff.shadow .diff td,#prettydiff.shadow .report td,#prettydiff.shadow .data li," +
                                        "#prettydiff.shadow .diff-right,#prettydiff.shadow fieldset input{background:#333" +
                                        ";border-color:#666}#prettydiff.shadow select,#prettydiff.shadow input,#prettydif" +
                                        "f.shadow .diff,#prettydiff.shadow .beautify,#prettydiff.shadow .report,#prettydi" +
                                        "ff.shadow .beautify h3,#prettydiff.shadow .diff h3,#prettydiff.shadow .beautify " +
                                        "h4,#prettydiff.shadow .diff h4,#prettydiff.shadow #report,#prettydiff.shadow #re" +
                                        "port .author,#prettydiff.shadow fieldset{background:#222;border-color:#666}#pret" +
                                        "tydiff.shadow fieldset fieldset{background:#333}#prettydiff.shadow fieldset fiel" +
                                        "dset input,#prettydiff.shadow fieldset fieldset select{background:#222}#prettydi" +
                                        "ff.shadow h2,#prettydiff.shadow h2 button,#prettydiff.shadow h3,#prettydiff.shad" +
                                        "ow input,#prettydiff.shadow option,#prettydiff.shadow select,#prettydiff.shadow " +
                                        "legend{color:#ccc}#prettydiff.shadow .contentarea{box-shadow:0 1em 1em #000}#pre" +
                                        "ttydiff.shadow .segment{background:#222}#prettydiff.shadow h2 button,#prettydiff" +
                                        ".shadow td,#prettydiff.shadow th,#prettydiff.shadow .segment,#prettydiff.shadow " +
                                        "ol.segment li{border-color:#666}#prettydiff.shadow .count li.fold{color:#cf3}#pr" +
                                        "ettydiff.shadow th{background:#000}#prettydiff.shadow h2 button{background:#5858" +
                                        "58;box-shadow:0.1em 0.1em 0.25em #000}#prettydiff.shadow li h4{color:#ff0}#prett" +
                                        "ydiff.shadow code{background:#585858;border-color:#585858;color:#ccf}#prettydiff" +
                                        ".shadow ol.segment h4 strong{color:#f30}#prettydiff.shadow button{background-col" +
                                        "or:#333;border-color:#666;box-shadow:0 0.25em 0.5em #000;color:#ccc}#prettydiff." +
                                        "shadow button:hover{background-color:#777;border-color:#aaa;box-shadow:0 0.25em " +
                                        "0.5em #222;color:#fff}#prettydiff.shadow th{background:#444}#prettydiff.shadow t" +
                                        "head th,#prettydiff.shadow th.heading{background:#444}#prettydiff.shadow .diff h" +
                                        "3{background:#000;border-color:#666}#prettydiff.shadow .segment,#prettydiff.shad" +
                                        "ow .data li,#prettydiff.shadow .diff-right{border-color:#444}#prettydiff.shadow " +
                                        ".count li{border-color:#333}#prettydiff.shadow .count{background:#555;border-col" +
                                        "or:#333}#prettydiff.shadow li h4{color:#ff0}#prettydiff.shadow code{background:#" +
                                        "000;border-color:#000;color:#ddd}#prettydiff.shadow ol.segment h4 strong{color:#" +
                                        "c00}#prettydiff.shadow .data .delete{background:#300}#prettydiff.shadow .data .d" +
                                        "elete em{background:#200;border-color:#c63;color:#c66}#prettydiff.shadow .data ." +
                                        "insert{background:#030}#prettydiff.shadow .data .insert em{background:#010;borde" +
                                        "r-color:#090;color:#6c0}#prettydiff.shadow .data .replace{background:#234}#prett" +
                                        "ydiff.shadow .data .replace em{background:#023;border-color:#09c;color:#7cf}#pre" +
                                        "ttydiff.shadow .data .empty{background:#111}#prettydiff.shadow .diff .author{bor" +
                                        "der-color:#666}#prettydiff.shadow .data em.s0{color:#fff}#prettydiff.shadow .dat" +
                                        "a em.s1{color:#d60}#prettydiff.shadow .data em.s2{color:#aaf}#prettydiff.shadow " +
                                        ".data em.s3{color:#0c0}#prettydiff.shadow .data em.s4{color:#f6f}#prettydiff.sha" +
                                        "dow .data em.s5{color:#0cc}#prettydiff.shadow .data em.s6{color:#dc3}#prettydiff" +
                                        ".shadow .data em.s7{color:#a7a}#prettydiff.shadow .data em.s8{color:#7a7}#pretty" +
                                        "diff.shadow .data em.s9{color:#ff6}#prettydiff.shadow .data em.s10{color:#33f}#p" +
                                        "rettydiff.shadow .data em.s11{color:#933}#prettydiff.shadow .data em.s12{color:#" +
                                        "990}#prettydiff.shadow .data em.s13{color:#987}#prettydiff.shadow .data em.s14{c" +
                                        "olor:#fc3}#prettydiff.shadow .data em.s15{color:#897}#prettydiff.shadow .data em" +
                                        ".s16{color:#f30}#prettydiff.shadow .data .l0{background:#333}#prettydiff.shadow " +
                                        ".data .l1{background:#633}#prettydiff.shadow .data .l2{background:#335}#prettydi" +
                                        "ff.shadow .data .l3{background:#353}#prettydiff.shadow .data .l4{background:#636" +
                                        "}#prettydiff.shadow .data .l5{background:#366}#prettydiff.shadow .data .l6{backg" +
                                        "round:#640}#prettydiff.shadow .data .l7{background:#303}#prettydiff.shadow .data" +
                                        " .l8{background:#030}#prettydiff.shadow .data .l9{background:#660}#prettydiff.sh" +
                                        "adow .data .l10{background:#003}#prettydiff.shadow .data .l11{background:#300}#p" +
                                        "rettydiff.shadow .data .l12{background:#553}#prettydiff.shadow .data .l13{backgr" +
                                        "ound:#432}#prettydiff.shadow .data .l14{background:#640}#prettydiff.shadow .data" +
                                        " .l15{background:#562}#prettydiff.shadow .data .l16{background:#600}#prettydiff." +
                                        "shadow .data .c0{background:inherit}",
                            white : "#prettydiff.white{background:#f8f8f8 url('data:image/png;base64,iVBORw0KGgoAAAAN" +
                                        "SUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAKT2lDQ1BQaG90b3Nob3Ag" +
                                        "SUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUE" +
                                        "G8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIe" +
                                        "EeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0" +
                                        "kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhE" +
                                        "AGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG" +
                                        "8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHg" +
                                        "g/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIP" +
                                        "QLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0" +
                                        "TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+" +
                                        "AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAA" +
                                        "RKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4u" +
                                        "wlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVI" +
                                        "HfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP" +
                                        "2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhM" +
                                        "WE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmx" +
                                        "pFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnl" +
                                        "EOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5O" +
                                        "l9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHK" +
                                        "CpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z" +
                                        "/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOU" +
                                        "Zj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5B" +
                                        "x0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36" +
                                        "p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423Gbcaj" +
                                        "JgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnu" +
                                        "trxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wu" +
                                        "w+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dn" +
                                        "F2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPI" +
                                        "Q+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfL" +
                                        "T8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFo" +
                                        "yOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85" +
                                        "ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSF" +
                                        "pxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOl" +
                                        "LOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQ" +
                                        "rAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5" +
                                        "sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1" +
                                        "YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9W" +
                                        "tO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7J" +
                                        "vttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3v" +
                                        "dy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8" +
                                        "R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4" +
                                        "dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6" +
                                        "b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9D" +
                                        "BY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv" +
                                        "28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAADo2aVRY" +
                                        "dFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlI" +
                                        "enJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRr" +
                                        "PSJBZG9iZSBYTVAgQ29yZSA1LjYtYzAxNCA3OS4xNTY3OTcsIDIwMTQvMDgvMjAtMDk6NTM6MDIgICAg" +
                                        "ICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1y" +
                                        "ZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAg" +
                                        "ICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1s" +
                                        "bnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5z" +
                                        "OnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAg" +
                                        "ICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAg" +
                                        "ICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgog" +
                                        "ICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAg" +
                                        "ICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8" +
                                        "eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChNYWNpbnRvc2gpPC94bXA6Q3Jl" +
                                        "YXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE2LTAxLTEyVDEyOjI0OjM4LTA2OjAw" +
                                        "PC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0wMS0xMlQxMjoy" +
                                        "NDozOC0wNjowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTYt" +
                                        "MDEtMTJUMTI6MjQ6MzgtMDY6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFu" +
                                        "Y2VJRD54bXAuaWlkOmQ1M2M3ODQzLWE1ZjItNDg0Ny04YzQzLTZlMmMwYTQ2OGJlYjwveG1wTU06SW5z" +
                                        "dGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjFj" +
                                        "Mzc2MTgxLWY5ZTgtMTE3OC05YTljLWQ4MjVkZmIwYTQ3MDwveG1wTU06RG9jdW1lbnRJRD4KICAgICAg" +
                                        "ICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjZiMjRlMjdhLWNmMDctNDlkMS05YjBk" +
                                        "LTY4MTMxMWQ3NDAzMTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlz" +
                                        "dG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNl" +
                                        "VHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0" +
                                        "RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo2YjI0" +
                                        "ZTI3YS1jZjA3LTQ5ZDEtOWIwZC02ODEzMTFkNzQwMzE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAg" +
                                        "ICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDEtMTJUMTI6MjQ6MzgtMDY6MDA8L3N0RXZ0OndoZW4+" +
                                        "CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAy" +
                                        "MDE0IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjps" +
                                        "aT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAg" +
                                        "ICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAg" +
                                        "ICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpkNTNjNzg0My1hNWYyLTQ4NDctOGM0My02ZTJjMGE0" +
                                        "NjhiZWI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYt" +
                                        "MDEtMTJUMTI6MjQ6MzgtMDY6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpz" +
                                        "b2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0" +
                                        "d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2Vk" +
                                        "PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8" +
                                        "L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAg" +
                                        "ICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAg" +
                                        "IDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2Zp" +
                                        "bGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAg" +
                                        "IDx0aWZmOlhSZXNvbHV0aW9uPjMwMDAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAg" +
                                        "IDx0aWZmOllSZXNvbHV0aW9uPjMwMDAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAg" +
                                        "IDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlm" +
                                        "OkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNp" +
                                        "b24+NDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj40" +
                                        "PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJE" +
                                        "Rj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAK" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAog" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAK" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAog" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAg" +
                                        "ICAgCjw/eHBhY2tldCBlbmQ9InciPz5cKgaXAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAA" +
                                        "ADqYAAAXb5JfxUYAAAAkSURBVHjaPMahAQAwDMCg7P+/KnsPcq4oHqpqdwNmBt3QDX8AeAUmcrZLnM4A" +
                                        "AAAASUVORK5CYII=')}#prettydiff.white *:focus{outline:0.1em dashed #06f}#prettydi" +
                                        "ff.white .contentarea,#prettydiff.white legend,#prettydiff.white fieldset select" +
                                        ",#prettydiff.white .diff td,#prettydiff.white .report td,#prettydiff.white .data" +
                                        " li,#prettydiff.white .diff-right,#prettydiff.white fieldset input{background:#f" +
                                        "ff;border-color:#999}#prettydiff.white select,#prettydiff.white input,#prettydif" +
                                        "f.white .diff,#prettydiff.white .beautify,#prettydiff.white .report,#prettydiff." +
                                        "white .beautify h3,#prettydiff.white .diff h3,#prettydiff.white .beautify h4,#pr" +
                                        "ettydiff.white .diff h4,#prettydiff.white #pdsamples li div,#prettydiff.white #r" +
                                        "eport,#prettydiff.white .author,#prettydiff.white #report .author,#prettydiff.wh" +
                                        "ite fieldset{background:#eee;border-color:#999}#prettydiff.white .diff h3{backgr" +
                                        "ound:#ddd;border-color:#999}#prettydiff.white fieldset fieldset{background:#ddd}" +
                                        "#prettydiff.white .contentarea{box-shadow:0 1em 1em #999}#prettydiff.white butto" +
                                        "n{background-color:#eee;border-color:#999;box-shadow:0 0.25em 0.5em #ccc;color:#" +
                                        "666}#prettydiff.white button:hover{background-color:#def;border-color:#03c;box-s" +
                                        "hadow:0 0.25em 0.5em #ccf;color:#03c}#prettydiff.white h2,#prettydiff.white h2 b" +
                                        "utton,#prettydiff.white h3{color:#b00}#prettydiff.white th{background:#eee;color" +
                                        ":#333}#prettydiff.white thead th{background:#eef}#prettydiff.white .report stron" +
                                        "g{color:#009}#prettydiff.white .report em{color:#080}#prettydiff.white h2 button" +
                                        ",#prettydiff.white td,#prettydiff.white th,#prettydiff.white .segment,#prettydif" +
                                        "f.white .count li,#prettydiff.white .diff-right #prettydiff.white ol.segment li{" +
                                        "border-color:#ccc}#prettydiff.white .data li{border-color:#ccc}#prettydiff.white" +
                                        " .count li.fold{color:#900}#prettydiff.white .count{background:#eed;border-color" +
                                        ":#999}#prettydiff.white h2 button{background:#f8f8f8;box-shadow:0.1em 0.1em 0.25" +
                                        "em #ddd}#prettydiff.white li h4{color:#00f}#prettydiff.white code{background:#ee" +
                                        "e;border-color:#eee;color:#009}#prettydiff.white ol.segment h4 strong{color:#c00" +
                                        "}#prettydiff.white .data .delete{background:#ffd8d8}#prettydiff.white .data .del" +
                                        "ete em{background:#fff8f8;border-color:#c44;color:#900}#prettydiff.white .data ." +
                                        "insert{background:#d8ffd8}#prettydiff.white .data .insert em{background:#f8fff8;" +
                                        "border-color:#090;color:#363}#prettydiff.white .data .replace{background:#fec}#p" +
                                        "rettydiff.white .data .replace em{background:#ffe;border-color:#a86;color:#852}#" +
                                        "prettydiff.white .data .empty{background:#ddd}#prettydiff.white .data em.s0{colo" +
                                        "r:#000}#prettydiff.white .data em.s1{color:#f66}#prettydiff.white .data em.s2{co" +
                                        "lor:#12f}#prettydiff.white .data em.s3{color:#090}#prettydiff.white .data em.s4{" +
                                        "color:#d6d}#prettydiff.white .data em.s5{color:#7cc}#prettydiff.white .data em.s" +
                                        "6{color:#c85}#prettydiff.white .data em.s7{color:#737}#prettydiff.white .data em" +
                                        ".s8{color:#6d0}#prettydiff.white .data em.s9{color:#dd0}#prettydiff.white .data " +
                                        "em.s10{color:#893}#prettydiff.white .data em.s11{color:#b97}#prettydiff.white .d" +
                                        "ata em.s12{color:#bbb}#prettydiff.white .data em.s13{color:#cc3}#prettydiff.whit" +
                                        "e .data em.s14{color:#333}#prettydiff.white .data em.s15{color:#9d9}#prettydiff." +
                                        "white .data em.s16{color:#880}#prettydiff.white .data .l0{background:#fff}#prett" +
                                        "ydiff.white .data .l1{background:#fed}#prettydiff.white .data .l2{background:#de" +
                                        "f}#prettydiff.white .data .l3{background:#efe}#prettydiff.white .data .l4{backgr" +
                                        "ound:#fef}#prettydiff.white .data .l5{background:#eef}#prettydiff.white .data .l" +
                                        "6{background:#fff8cc}#prettydiff.white .data .l7{background:#ede}#prettydiff.whi" +
                                        "te .data .l8{background:#efc}#prettydiff.white .data .l9{background:#ffd}#pretty" +
                                        "diff.white .data .l10{background:#edc}#prettydiff.white .data .l11{background:#f" +
                                        "db}#prettydiff.white .data .l12{background:#f8f8f8}#prettydiff.white .data .l13{" +
                                        "background:#ffb}#prettydiff.white .data .l14{background:#eec}#prettydiff.white ." +
                                        "data .l15{background:#cfc}#prettydiff.white .data .l16{background:#eea}#prettydi" +
                                        "ff.white .data .c0{background:inherit}#prettydiff.white #report p em{color:#080}" +
                                        "#prettydiff.white #report p strong{color:#009}"
                        },
                        global : "#prettydiff{text-align:center;font-size:10px;overflow-y:scroll}#prettydiff .cont" +
                                     "entarea{border-style:solid;border-width:0.1em;font-family:'Century Gothic','Treb" +
                                     "uchet MS';margin:0 auto;max-width:93em;padding:1em;text-align:left}#prettydiff d" +
                                     "d,#prettydiff dt,#prettydiff p,#prettydiff li,#prettydiff td,#prettydiff blockqu" +
                                     "ote,#prettydiff th{clear:both;font-family:'Palatino Linotype','Book Antiqua',Pal" +
                                     "atino,serif;font-size:1.6em;line-height:1.6em;text-align:left}#prettydiff blockq" +
                                     "uote{font-style:italic}#prettydiff dt{font-size:1.4em;font-weight:bold;line-heig" +
                                     "ht:inherit}#prettydiff li li,#prettydiff li p{font-size:1em}#prettydiff th,#pret" +
                                     "tydiff td{border-style:solid;border-width:0.1em;padding:0.1em 0.2em}#prettydiff " +
                                     "td span{display:block}#prettydiff code,#prettydiff textarea{font-family:'Courier" +
                                     " New',Courier,'Lucida Console',monospace}#prettydiff code,#prettydiff textarea{d" +
                                     "isplay:block;font-size:0.8em;width:100%}#prettydiff code span{display:block;whit" +
                                     "e-space:pre}#prettydiff code{border-style:solid;border-width:0.2em;line-height:1" +
                                     "em}#prettydiff textarea{line-height:1.4em}#prettydiff label{display:inline;font-" +
                                     "size:1.4em}#prettydiff legend{border-radius:1em;border-style:solid;border-width:" +
                                     "0.1em;font-size:1.4em;font-weight:bold;margin-left:-0.25em;padding:0 0.5em}#pret" +
                                     "tydiff fieldset fieldset legend{font-size:1.2em}#prettydiff table{border-collaps" +
                                     "e:collapse}#prettydiff div.report{border-style:none}#prettydiff h2,#prettydiff h" +
                                     "3,#prettydiff h4{clear:both}#prettydiff table{margin:0 0 1em}#prettydiff .analys" +
                                     "is .bad,#prettydiff .analysis .good{font-weight:bold}#prettydiff h1{font-size:3e" +
                                     "m;font-weight:normal;margin-top:0}#prettydiff h1 span{font-size:0.5em}#prettydif" +
                                     "f h1 svg{border-style:solid;border-width:0.05em;float:left;height:1.5em;margin-r" +
                                     "ight:0.5em;width:1.5em}#prettydiff h2{border-style:none;background:transparent;f" +
                                     "ont-size:1em;box-shadow:none;margin:0}#prettydiff h2 button{background:transpare" +
                                     "nt;border-style:solid;cursor:pointer;display:block;font-size:2.5em;font-weight:n" +
                                     "ormal;text-align:left;width:100%;border-width:0.05em;font-weight:normal;margin:1" +
                                     "em 0 0;padding:0.1em}#prettydiff h2 span{display:block;float:right;font-size:0.5" +
                                     "em}#prettydiff h3{font-size:2em;margin:0;background:transparent;box-shadow:none;" +
                                     "border-style:none}#prettydiff h4{font-size:1.6em;font-family:'Century Gothic','T" +
                                     "rebuchet MS';margin:0}#prettydiff li h4{font-size:1em}#prettydiff button,#pretty" +
                                     "diff fieldset,#prettydiff div input,#prettydiff textarea{border-style:solid;bord" +
                                     "er-width:0.1em}#prettydiff section{border-style:none}#prettydiff h2 button,#pret" +
                                     "tydiff select,#prettydiff option{font-family:inherit}#prettydiff select{border-s" +
                                     "tyle:inset;border-width:0.1em;width:13.5em}#prettydiff #dcolorScheme{float:right" +
                                     ";margin:-3em 0 0}#prettydiff #dcolorScheme label,#prettydiff #dcolorScheme label" +
                                     "{display:inline-block;font-size:1em}#prettydiff .clear{clear:both;display:block}" +
                                     "#prettydiff caption,#prettydiff .content-hide{height:1em;left:-1000em;overflow:h" +
                                     "idden;position:absolute;top:-1000em;width:1em}",
                        reports: "#prettydiff #report.contentarea{font-family:'Lucida Sans Unicode','Helvetica','A" +
                                     "rial',sans-serif;max-width:none;overflow:scroll}#prettydiff .diff .replace em,#p" +
                                     "rettydiff .diff .delete em,#prettydiff .diff .insert em{border-style:solid;borde" +
                                     "r-width:0.1em}#prettydiff #report dd,#prettydiff #report dt,#prettydiff #report " +
                                     "p,#prettydiff #report li,#prettydiff #report td,#prettydiff #report blockquote,#" +
                                     "prettydiff #report th{font-family:'Lucida Sans Unicode','Helvetica','Arial',sans" +
                                     "-serif;font-size:1.2em}#prettydiff div#webtool{background:transparent;font-size:" +
                                     "inherit;margin:0;padding:0}#prettydiff #jserror span{display:block}#prettydiff #" +
                                     "a11y{background:transparent;padding:0}#prettydiff #a11y div{margin:0.5em 0;borde" +
                                     "r-style:solid;border-width:0.1em}#prettydiff #a11y h4{margin:0.25em 0}#prettydif" +
                                     "f #a11y ol{border-style:solid;border-width:0.1em}#prettydiff #cssreport.doc tabl" +
                                     "e{clear:none;float:left;margin-left:1em}#prettydiff #css-size{left:24em}#prettyd" +
                                     "iff #css-uri{left:40em}#prettydiff #css-uri td{text-align:left}#prettydiff .repo" +
                                     "rt .analysis th{text-align:left}#prettydiff .report .analysis .parseData td{font" +
                                     "-family:'Courier New',Courier,'Lucida Console',monospace;text-align:left;white-s" +
                                     "pace:pre}#prettydiff .report .analysis td{text-align:right}#prettydiff .analysis" +
                                     "{float:left;margin:0 1em 1em 0}#prettydiff .analysis td,#prettydiff .analysis th" +
                                     "{padding:0.5em}#prettydiff #statreport div{border-style:none}#prettydiff .diff,#" +
                                     "prettydiff .beautify{border-style:solid;border-width:0.1em;display:inline-block;" +
                                     "margin:0 1em 1em 0;position:relative}#prettydiff .diff,#prettydiff .diff li #pre" +
                                     "ttydiff .diff h3,#prettydiff .diff h4,#prettydiff .beautify,#prettydiff .beautif" +
                                     "y li,#prettydiff .beautify h3,#prettydiff .beautify h4{font-family:'Courier New'" +
                                     ",Courier,'Lucida Console',monospace}#prettydiff .diff li,#prettydiff .beautify l" +
                                     "i,#prettydiff .diff h3,#prettydiff .diff h4,#prettydiff .beautify h3,#prettydiff" +
                                     " .beautify h4{border-style:none none solid none;border-width:0 0 0.1em 0;box-sha" +
                                     "dow:none;display:block;font-size:1.2em;margin:0 0 0 -.1em;padding:0.2em 2em;text" +
                                     "-align:left}#prettydiff .diff .skip{border-style:none none solid;border-width:0 " +
                                     "0 0.1em}#prettydiff .diff .diff-left{border-style:none;display:table-cell}#prett" +
                                     "ydiff .diff .diff-right{border-style:none none none solid;border-width:0 0 0 0.1" +
                                     "em;display:table-cell;margin-left:-.1em;min-width:16.5em;right:0;top:0}#prettydi" +
                                     "ff .diff .data li,#prettydiff .beautify .data li{min-width:16.5em;padding:0.5em}" +
                                     "#prettydiff .diff li,#prettydiff .diff p,#prettydiff .diff h3,#prettydiff .beaut" +
                                     "ify li,#prettydiff .beautify p,#prettydiff .beautify h3{font-size:1.2em}#prettyd" +
                                     "iff .diff li em,#prettydiff .beautify li em{font-style:normal;font-weight:bold;m" +
                                     "argin:-0.5em -0.09em}#prettydiff .diff p.author{border-style:solid;border-width:" +
                                     "0.2em 0.1em 0.1em;margin:0;overflow:hidden;padding:0.4em;text-align:right}#prett" +
                                     "ydiff .difflabel{display:block;height:0}#prettydiff .count{border-style:solid;bo" +
                                     "rder-width:0 0.1em 0 0;font-weight:normal;padding:0;text-align:right}#prettydiff" +
                                     " .count li{padding:0.5em 1em;text-align:right}#prettydiff .count li.fold{cursor:" +
                                     "pointer;font-weight:bold;padding-left:0.5em}#prettydiff .data{text-align:left;wh" +
                                     "ite-space:pre}#prettydiff .beautify .data em{display:inline-block;font-style:nor" +
                                     "mal;font-weight:bold}#prettydiff .beautify li,#prettydiff .diff li{border-style:" +
                                     "none none solid;border-width:0 0 0.1em;display:block;line-height:1.2;list-style-" +
                                     "type:none;margin:0;white-space:pre}#prettydiff .beautify ol,#prettydiff .diff ol" +
                                     "{display:table-cell;margin:0;padding:0}#prettydiff .beautify em.l0,#prettydiff ." +
                                     "beautify em.l1,#prettydiff .beautify em.l2,#prettydiff .beautify em.l3,#prettydi" +
                                     "ff .beautify em.l4,#prettydiff .beautify em.l5,#prettydiff .beautify em.l6,#pret" +
                                     "tydiff .beautify em.l7,#prettydiff .beautify em.l8,#prettydiff .beautify em.l9,#" +
                                     "prettydiff .beautify em.l10,#prettydiff .beautify em.l11,#prettydiff .beautify e" +
                                     "m.l12,#prettydiff .beautify em.l13,#prettydiff .beautify em.l14,#prettydiff .bea" +
                                     "utify em.l15,#prettydiff .beautify em.l16{height:2.2em;margin:0 0 -1em;position:" +
                                     "relative;top:-0.5em}#prettydiff .beautify em.l0{margin-left:-0.5em;padding-left:" +
                                     "0.5em}#prettydiff #report .beautify,#prettydiff #report .beautify li,#prettydiff" +
                                     " #report .diff,#prettydiff #report .diff li{font-family:'Courier New',Courier,'L" +
                                     "ucida Console',monospace}#prettydiff #report .beautify{border-style:solid}#prett" +
                                     "ydiff #report .diff h3,#prettydiff #report .beautify h3{margin:0}"
                    },
                    html  : {
                        body  : "/*]]>*/</style></head><body id='prettydiff' class='",
                        color : "white",
                        end   : "//]]>\r\n</script></body></html>",
                        head  : "<?xml version='1.0' encoding='UTF-8' ?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML " +
                                    "1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'><html xmlns='http://www." +
                                    "w3.org/1999/xhtml' xml:lang='en'><head><title>Pretty Diff - The difference tool<" +
                                    "/title><meta name='robots' content='index, follow'/> <meta name='DC.title' conte" +
                                    "nt='Pretty Diff - The difference tool'/> <link rel='canonical' href='http://pret" +
                                    "tydiff.com/' type='application/xhtml+xml'/><meta http-equiv='Content-Type' conte" +
                                    "nt='application/xhtml+xml;charset=UTF-8'/><meta http-equiv='Content-Style-Type' " +
                                    "content='text/css'/><style type='text/css'>/*<![CDATA[*/",
                        intro : "'><div class='contentarea' id='report'><section role='heading'><h1><svg height='" +
                                    "2000.000000pt' id='pdlogo' preserveAspectRatio='xMidYMid meet' version='1.0' vie" +
                                    "wBox='0 0 2000.000000 2000.000000' width='2000.000000pt' xmlns='http://www.w3.or" +
                                    "g/2000/svg'><g fill='#999' stroke='none' transform='translate(0.000000,2000.0000" +
                                    "00) scale(0.100000,-0.100000)'> <path d='M14871 18523 c-16 -64 -611 -2317 -946 -" +
                                    "3588 -175 -660 -319 -1202 -320 -1204 -2 -2 -50 39 -107 91 -961 876 -2202 1358 -3" +
                                    "498 1358 -1255 0 -2456 -451 -3409 -1279 -161 -140 -424 -408 -560 -571 -507 -607 " +
                                    "-870 -1320 -1062 -2090 -58 -232 -386 -1479 -2309 -8759 -148 -563 -270 -1028 -270" +
                                    " -1033 0 -4 614 -8 1365 -8 l1364 0 10 38 c16 63 611 2316 946 3587 175 660 319 12" +
                                    "02 320 1204 2 2 50 -39 107 -91 543 -495 1169 -862 1863 -1093 1707 -568 3581 -211" +
                                    " 4965 946 252 210 554 524 767 796 111 143 312 445 408 613 229 406 408 854 525 13" +
                                    "20 57 225 380 1451 2310 8759 148 563 270 1028 270 1033 0 4 -614 8 -1365 8 l-1364" +
                                    " 0 -10 -37z m-4498 -5957 c477 -77 889 -256 1245 -542 523 -419 850 -998 954 -1689" +
                                    " 18 -121 18 -549 0 -670 -80 -529 -279 -972 -612 -1359 -412 -480 -967 -779 -1625 " +
                                    "-878 -121 -18 -549 -18 -670 0 -494 74 -918 255 -1283 548 -523 419 -850 998 -954 " +
                                    "1689 -18 121 -18 549 0 670 104 691 431 1270 954 1689 365 293 828 490 1283 545 50" +
                                    " 6 104 13 120 15 72 10 495 -3 588 -18z'/></g></svg><a href='prettydiff.com.xhtml" +
                                    "'>Pretty Diff</a></h1><p id='dcolorScheme'><label class='label' for='colorScheme" +
                                    "'>Color Scheme</label><select id='colorScheme'><option>Canvas</option><option>Sh" +
                                    "adow</option><option selected='selected'>White</option></select></p><p>Find <a h" +
                                    "ref='https://github.com/prettydiff/prettydiff'>Pretty Diff on GitHub</a> and <a " +
                                    "href='http://www.npmjs.com/packages/prettydiff'>NPM</a>.</p></section><section r" +
                                    "ole='main'>",
                        script: "</section></div><script type='application/javascript'>//<![CDATA[\r\n"
                    },
                    script: {
                        beautify: "var pd={};pd.colorchange=function(){'use strict';var options=this.getElementsByT" +
                                      "agName('option');document.getElementsByTagName('body')[0].setAttribute('class',o" +
                                      "ptions[this.selectedIndex].innerHTML.toLowerCase());};pd.colorscheme=document.ge" +
                                      "tElementById('colorScheme');pd.colorscheme.onchange=pd.colorchange;pd.beaufold=f" +
                                      "unction dom__beaufold(){'use strict';var self=this,title=self.getAttribute('titl" +
                                      "e').split('line '),min=Number(title[1].substr(0,title[1].indexOf(' '))),max=Numb" +
                                      "er(title[2]),a=0,b='',list=[self.parentNode.getElementsByTagName('li'),self.pare" +
                                      "ntNode.nextSibling.getElementsByTagName('li')];if(self.innerHTML.charAt(0)==='-'" +
                                      "){for(a=min;a<max;a+=1){list[0][a].style.display='none';list[1][a].style.display" +
                                      "='none';}self.innerHTML='+'+self.innerHTML.substr(1);}else{for(a=min;a<max;a+=1)" +
                                      "{list[0][a].style.display='block';list[1][a].style.display='block';if(list[0][a]" +
                                      ".getAttribute('class')==='fold'&&list[0][a].innerHTML.charAt(0)==='+'){b=list[0]" +
                                      "[a].getAttribute('title');b=b.substring(b.indexOf('to line ')+1);a=Number(b)-1;}" +
                                      "}self.innerHTML='-'+self.innerHTML.substr(1);}};(function(){'use strict';var lis" +
                                      "ts=document.getElementsByTagName('ol'),listslen=lists.length,list=[],listlen=0,a" +
                                      "=0,b=0;for(a=0;a<listslen;a+=1){if(lists[a].getAttribute('class')==='count'&&lis" +
                                      "ts[a].parentNode.getAttribute('class')==='beautify'){list=lists[a].getElementsBy" +
                                      "TagName('li');listlen=list.length;for(b=0;b<listlen;b+=1){if(list[b].getAttribut" +
                                      "e('class')==='fold'){list[b].onmousedown=pd.beaufold;}}}}}());",
                        diff    : "var pd={};pd.colorchange=function(){'use strict';var options=this.getElementsByT" +
                                      "agName('option');document.getElementsByTagName('body')[0].setAttribute('class',o" +
                                      "ptions[this.selectedIndex].innerHTML.toLowerCase())};pd.difffold=function dom__d" +
                                      "ifffold(){'use strict';var a=0,b=0,self=this,title=self.getAttribute('title').sp" +
                                      "lit('line '),min=Number(title[1].substr(0,title[1].indexOf(' '))),max=Number(tit" +
                                      "le[2]),inner=self.innerHTML,lists=[],parent=self.parentNode.parentNode,listnodes" +
                                      "=(parent.getAttribute('class')==='diff')?parent.getElementsByTagName('ol'):paren" +
                                      "t.parentNode.getElementsByTagName('ol'),listLen=listnodes.length;for(a=0;a<listL" +
                                      "en;a+=1){lists.push(listnodes[a].getElementsByTagName('li'))}max=(max>=lists[0]." +
                                      "length)?lists[0].length:max;if(inner.charAt(0)==='-'){self.innerHTML='+'+inner.s" +
                                      "ubstr(1);for(a=min;a<max;a+=1){for(b=0;b<listLen;b+=1){lists[b][a].style.display" +
                                      "='none'}}}else{self.innerHTML='-'+inner.substr(1);for(a=min;a<max;a+=1){for(b=0;" +
                                      "b<listLen;b+=1){lists[b][a].style.display='block'}}}};pd.colSliderGrab=function(" +
                                      "e){'use strict';var event=e||window.event,touch=(e!==null&&e.type==='touchstart'" +
                                      "),node=this,diffRight=node.parentNode,diff=diffRight.parentNode,subOffset=0,list" +
                                      "s=diff.getElementsByTagName('ol'),counter=lists[0].clientWidth,data=lists[1].cli" +
                                      "entWidth,width=lists[2].parentNode.clientWidth,total=lists[2].parentNode.parentN" +
                                      "ode.clientWidth,offset=lists[2].parentNode.offsetLeft-lists[2].parentNode.parent" +
                                      "Node.offsetLeft,min=((total-counter-data-2)-width),max=(total-width-counter),sta" +
                                      "tus='ew',minAdjust=min+15,maxAdjust=max-15,withinRange=false,diffLeft=diffRight." +
                                      "previousSibling,drop=function dom__event_colSliderGrab_drop(f){f=f||window.event" +
                                      ";f.preventDefault();node.style.cursor=status+'-resize';if(touch===true){document" +
                                      ".ontouchmove=null;document.ontouchend=null}else{document.onmousemove=null;docume" +
                                      "nt.onmouseup=null}},boxmove=function dom__event_colSliderGrab_boxmove(f){f=f||wi" +
                                      "ndow.event;f.preventDefault();if(touch===true){subOffset=offset-f.touches[0].cli" +
                                      "entX}else{subOffset=offset-f.clientX}if(subOffset>minAdjust&&subOffset<maxAdjust" +
                                      "){withinRange=true}if(withinRange===true&&subOffset>maxAdjust){diffRight.style.w" +
                                      "idth=((total-counter-2)/10)+'em';status='e'}else if(withinRange===true&&subOffse" +
                                      "t<minAdjust){diffRight.style.width=((total-counter-data-2)/10)+'em';status='w'}e" +
                                      "lse if(subOffset<max&&subOffset>min){diffRight.style.width=((width+subOffset)/10" +
                                      ")+'em';status='ew'}if(touch===true){document.ontouchend=drop}else{document.onmou" +
                                      "seup=drop}};event.preventDefault();if(typeof pd.data.node==='object'&&pd.data.no" +
                                      "de.report.code.box!==null){offset+=pd.data.node.report.code.box.offsetLeft;offse" +
                                      "t-=pd.data.node.report.code.body.scrollLeft}else{subOffset=(document.body.parent" +
                                      "Node.scrollLeft>document.body.scrollLeft)?document.body.parentNode.scrollLeft:do" +
                                      "cument.body.scrollLeft;offset-=subOffset}offset+=node.clientWidth;node.style.cur" +
                                      "sor='ew-resize';diff.style.width=(total/10)+'em';diff.style.display='inline-bloc" +
                                      "k';if(diffLeft.nodeType!==1){do{diffLeft=diffLeft.previousSibling}while(diffLeft" +
                                      ".nodeType!==1)}diffLeft.style.display='block';diffRight.style.width=(diffRight.c" +
                                      "lientWidth/10)+'em';diffRight.style.position='absolute';if(touch===true){documen" +
                                      "t.ontouchmove=boxmove;document.ontouchstart=false}else{document.onmousemove=boxm" +
                                      "ove;document.onmousedown=null}return false};(function(){'use strict';var cells=p" +
                                      "d.d[0].getElementsByTagName('li'),len=cells.length,a=0;for(a=0;a<len;a+=1){if(ce" +
                                      "lls[a].getAttribute('class')==='fold'){cells[a].onclick=pd.difffold}}if(pd.d.len" +
                                      "gth>3){pd.d[2].onmousedown=pd.colSliderGrab;pd.d[2].ontouchstart=pd.colSliderGra" +
                                      "b}pd.colorscheme=document.getElementById('colorScheme');pd.colorscheme.onchange=" +
                                      "pd.colorchange}());"
                    }
                },
                html        = [
                    builder.html.head, //0
                    builder.css.color.canvas, //1
                    builder.css.color.shadow, //2
                    builder.css.color.white, //3
                    builder.css.reports, //4
                    builder.css.global, //5
                    builder.html.body, //6
                    builder.html.color, //7
                    builder.html.intro, //8
                    "", //9 - for meta analysis, like stats and accessibility
                    "", //10 - for generated report
                    builder.html.script, //11
                    builder.script.diff, //12
                    builder.html.end //13
                ],
                setlangmode = function core__setlangmode(input) {
                    if (input === "css" || input === "less" || input === "scss") {
                        return "css";
                    }
                    if (input.indexOf("html") > -1 || input === "html" || input === "ejs" || input === "html_ruby" || input === "handlebars" || input === "swig" || input === "twig" || input === "php" || input === "dustjs") {
                        return "html";
                    }
                    if (input === "markup" || input === "jsp" || input === "xml" || input === "xhtml") {
                        return "markup";
                    }
                    if (input === "javascript" || input === "json" || input === "jsx") {
                        return "javascript";
                    }
                    if (input === "text") {
                        return "text";
                    }
                    if (input === "csv") {
                        return "csv";
                    }
                    if (input === "tss" || input === "titanium") {
                        return "tss";
                    }
                    return "javascript";
                },
                nameproper  = function core__nameproper(input) {
                    if (input === "javascript") {
                        return "JavaScript";
                    }
                    if (input === "text") {
                        return "Plain Text";
                    }
                    if (input === "jsx") {
                        return "React JSX";
                    }
                    if (input === "scss") {
                        return "SCSS (Sass)";
                    }
                    if (input === "ejs") {
                        return "EJS Template";
                    }
                    if (input === "handlebars") {
                        return "Handlebars Template";
                    }
                    if (input === "html_ruby") {
                        return "ERB (Ruby) Template";
                    }
                    if (input === "tss" || input === "titanium") {
                        return "Titanium Stylesheets";
                    }
                    if (input === "typescript") {
                        return "TypeScript (not supported yet)";
                    }
                    if (input === "twig") {
                        return "HTML TWIG Template";
                    }
                    if (input === "jsp") {
                        return "JSTL (JSP)";
                    }
                    if (input === "java") {
                        return "Java (not supported yet)";
                    }
                    return input.toUpperCase();
                },
                options     = {
                    // determines api source as necessary to make a decision about whether to supply
                    // externally needed JS functions to reports
                    accessibility  : (api.accessibility === true || api.accessibility === "true"),
                    api            : (api.api === undefined || api.api.length === 0)
                        ? ""
                        : api.api,
                    // braceline - should a new line pad the interior of blocks (curly braces) in
                    // JavaScript
                    braceline      : (api.braceline === true || api.braceline === "true"),
                    //bracepadding - should curly braces be padded with a space in JavaScript?
                    bracepadding   : (api.bracepadding === true || api.bracepadding === "true"),
                    // indent - should JSPretty format JavaScript in the normal KNR style or push
                    // curly braces onto a separate line like the "allman" style
                    braces         : (api.braces === true || api.braces === "true" || api.braces === "allman")
                        ? "allman"
                        : "knr",
                    //color scheme of generated HTML artifacts
                    color          : (api.color === "canvas" || api.color === "shadow")
                        ? api.color
                        : "white",
                    //comments - if comments should receive indentation or not
                    comments       : (api.comments === "noindent")
                        ? "noindent"
                        : ((api.comments === "nocomment")
                            ? "nocomment"
                            : "indent"),
                    //commline - If in markup a newline should be forced above comments
                    commline       : (api.commline === true || api.commline === "true"),
                    // compressedcss - If the beautified CSS should contain minified properties
                    compressedcss  : (api.compressedcss === true || api.compressedcss === "true"),
                    // conditional - should IE conditional comments be preserved during markup
                    // minification
                    conditional    : (api.conditional === true || api.conditional === "true"),
                    //content - should content be normalized during a diff operation
                    content        : (api.content === true || api.content === "true"),
                    // context - should the diff report only include the differences, if so then
                    // buffered by how many lines of code
                    context        : (api.context === "" || (/^(\s+)$/).test(api.context) || isNaN(api.context))
                        ? ""
                        : Number(api.context),
                    //correct - should JSPretty make some corrections for sloppy JS
                    correct        : (api.correct === true || api.correct === "true"),
                    //crlf - if output should use \r\n (Windows compatible) for line termination
                    crlf           : (api.crlf === true || api.crlf === "true"),
                    //cssinsertlines = if a new line should be forced between each css block
                    cssinsertlines : (api.cssinsertlines === true || api.cssinsertlines === "true"),
                    //csvchar - what character should be used as a separator
                    csvchar        : (typeof api.csvchar === "string" && api.csvchar.length > 0)
                        ? api.csvchar
                        : ",",
                    //diff - source code to compare with
                    diff           : (typeof api.diff === "string" && api.diff.length > 0 && (/^(\s+)$/).test(api.diff) === false)
                        ? api.diff
                        : "",
                    // diffcli - if operating from Node.js and set to true diff output will be
                    // printed to stdout just like git diff
                    diffcli        : (api.diffcli === true || api.diffcli === "true"),
                    //diffcomments - should comments be included in the diff operation
                    diffcomments   : (api.diffcomments === true || api.diffcomments === "true"),
                    //difflabel - a text label to describe the diff code
                    difflabel      : (typeof api.difflabel === "string" && api.difflabel.length > 0)
                        ? api.difflabel
                        : "new",
                    // diffspaceignore - If white space differences should be ignored by the diff
                    // tool
                    diffspaceignore: (api.diffspaceignore === true || api.diffspaceignore === "true"),
                    // diffview - should the diff report be a single column showing both sources
                    // simultaneously "inline" or showing the sources in separate columns
                    // "sidebyside"
                    diffview       : (api.diffview === "inline")
                        ? "inline"
                        : "sidebyside",
                    //dustjs - support for this specific templating scheme
                    dustjs         : (api.dustjs === true || api.dustjs === "true"),
                    //elseline - for the 'else' keyword onto a new line in JavaScript
                    elseline       : (api.elseline === true || api.elseline === "true"),
                    // endcomma - if a trailing comma should be injected at the end of arrays and
                    // object literals in JavaScript
                    endcomma       : (api.endcomma === true || api.endcomma === "true"),
                    // force_attribute - forces indentation of all markup attriubtes
                    force_attribute: (api.force_attribute === true || api.force_attribute === "true"),
                    // force_indent - should markup beautification always force indentation even if
                    // disruptive
                    force_indent   : (api.force_indent === true || api.force_indent === "true"),
                    // html - should markup be presumed to be HTML with all the aloppiness HTML
                    // allows
                    html           : (api.html === true || api.html === "true" || (typeof api.html === "string" && api.html === "html-yes")),
                    //inchar - what character(s) should be used to create a single identation
                    inchar         : (typeof api.inchar === "string" && api.inchar.length > 0)
                        ? api.inchar
                        : " ",
                    // inlevel - should indentation in JSPretty be buffered with additional
                    // indentation?  Useful when supplying code to sites accepting markdown
                    inlevel        : (isNaN(api.inlevel) || Number(api.inlevel) < 1)
                        ? 0
                        : Number(api.inlevel),
                    // insize - how many characters from api.inchar should constitute a single
                    // indentation
                    insize         : (isNaN(api.insize))
                        ? 4
                        : Number(api.insize),
                    // jsscope - do you want to enable the jsscope feature of JSPretty?  This
                    // feature will output formatted HTML instead of text code showing which
                    // variables are declared at which functional depth
                    jsscope        : (api.jsscope === true || api.jsscope === "true")
                        ? "report"
                        : (api.jsscope !== "html" && api.jsscope !== "report")
                            ? "none"
                            : api.jsscope,
                    //lang - which programming language will we be analyzing
                    lang           : (typeof api.lang === "string" && api.lang !== "auto")
                        ? setlangmode(api.lang.toLowerCase())
                        : "auto",
                    // langdefault - what language should lang value "auto" resort to when it cannot
                    // determine the language
                    langdefault    : (typeof api.langdefault === "string")
                        ? setlangmode(api.langdefault.toLowerCase())
                        : "text",
                    // methodchain - if JavaScript method chains should be strung onto a single line
                    // instead of indented
                    methodchain    : (api.methodchain === "chain" || api.methodchain === "none")
                        ? api.methodchain
                        : "indent",
                    // miniwrap - when language is JavaScript and mode is 'minify' if option 'jwrap'
                    // should be applied to all code
                    miniwrap       : (api.miniwrap === true || api.miniwrap === "true"),
                    //mode - is this a minify, beautify, or diff operation
                    mode           : (typeof api.mode === "string" && (api.mode === "minify" || api.mode === "beautify" || api.mode === "parse"))
                        ? api.mode
                        : "diff",
                    //neverflatten - prevent flattening of destructured lists in JavaScript
                    neverflatten   : (api.neverflatten === true || api.neverflatten === "true"),
                    //nocaseindent - if a 'case' should be indented to its parent 'switch'
                    nocaseindent   : (api.nocaseindent === true || api.nocaseindent === "true"),
                    // nochainindent - prevent indentation when JavaScript chains of methods are broken onto multiple lines
                    nochainindent  : (api.nochainindent === true || api.nochainindent === "true"),
                    // noleadzero - in CSS removes and prevents a run of 0s from appearing
                    // immediately before a value's decimal.
                    noleadzero     : (api.noleadzero === true || api.noleadzero === "true"),
                    //objsort will alphabetize object keys in JavaScript
                    objsort        : (api.objsort === "all" || api.objsort === "js" || api.objsort === "css" || api.objsort === "css" || api.objsort === true || api.objsort === "true")
                        ? api.objsort
                        : "none",
                    //preserve - should empty lines be preserved in beautify operations of JSPretty?
                    preserve       : (function core__optionPreserve() {
                        if (api.preserve === 1 || api.preserve === undefined || api.preserve === true || api.preserve === "all" || api.preserve === "js" || api.preserve === "css") {
                            return 1;
                        }
                        if (api.preserve === false || isNaN(api.preserve) === true || Number(api.preserve) < 1 || api.preserve === "none") {
                            return 0;
                        }
                        return Number(api.preserve);
                    }()),
                    // quote - should all single quote characters be converted to double quote
                    // characters during a diff operation to reduce the number of false positive
                    // comparisons
                    quote          : (api.quote === true || api.quote === "true"),
                    // quoteConvert - convert " to ' (or ' to ") of string literals or markup
                    // attributes
                    quoteConvert   : (api.quoteConvert === "single" || api.quoteConvert === "double")
                        ? api.quoteConvert
                        : "none",
                    //selectorlist - should comma separated CSS selector lists be on one line
                    selectorlist   : (api.selectorlist === true || api.selectorlist === "true"),
                    // semicolon - should trailing semicolons be removed during a diff operation to
                    // reduce the number of false positive comparisons
                    semicolon      : (api.semicolon === true || api.semicolon === "true"),
                    // source - the source code in minify and beautify operations or "base" code in
                    // operations
                    source         : (typeof api.source === "string" && api.source.length > 0 && (/^(\s+)$/).test(api.source) === false)
                        ? api.source
                        : "",
                    //sourcelabel - a text label to describe the api.source code for the diff report
                    sourcelabel    : (typeof api.sourcelabel === "string" && api.sourcelabel.length > 0)
                        ? api.sourcelabel
                        : "base",
                    // space - should JSPretty include a space between a function keyword and the
                    // next adjacent opening parenthesis character in beautification operations
                    space          : (api.space !== false && api.space !== "false"),
                    //spaceclose - If markup self-closing tags should end with " />" instead of "/>"
                    spaceclose     : (api.spaceclose === true || api.spaceclose === "true"),
                    // style - should JavaScript and CSS code receive indentation if embedded inline
                    // in markup
                    style          : (api.style === "noindent")
                        ? "noindent"
                        : "indent",
                    // styleguide - preset of beautification options to bring a JavaScript sample
                    // closer to conformance of a given style guide
                    styleguide     : (typeof api.styleguide === "string")
                        ? api.styleguide
                        : "",
                    // tagmerge - Allows combining immediately adjacent start and end tags of the
                    // same name into a single self-closing tag:  <a href="home"></a> into
                    // <a//href="home"/>
                    tagmerge       : (api.tagmerge === true || api.tagmerge === "true"),
                    //sort markup child nodes alphabetically
                    tagsort        : (api.tagsort === true || api.tagsort === "true"),
                    // textpreserve - Force the markup beautifier to retain text (white space and
                    // all) exactly as provided.
                    ternaryline    : (api.ternaryline === true || api.ternaryline === "true"),
                    textpreserve   : (api.textpreserve === true || api.textpreserve === "true"),
                    // titanium - TSS document support via option, because this is a uniquely
                    // modified form of JSON
                    titanium       : (api.titanium === true || api.titanium === "true"),
                    // topcoms - should comments at the top of a JavaScript or CSS source be
                    // preserved during minify operations
                    topcoms        : (api.topcoms === true || api.topcoms === "true"),
                    // varword - should consecutive variables be merged into a comma separated list
                    // or the opposite
                    varword        : (api.varword === "each" || api.varword === "list")
                        ? api.varword
                        : "none",
                    // vertical - whether or not to vertically align lists of assigns in CSS and
                    // JavaScript
                    vertical       : (api.vertical === "all" || api.vertical === "css" || api.vertical === "js")
                        ? api.vertical
                        : "none",
                    // wrap - in markup beautification should text content wrap after the first
                    // complete word up to a certain character length
                    wrap           : (isNaN(api.wrap) === true)
                        ? 80
                        : Number(api.wrap)
                },
                autoval     = [],
                autostring  = "",
                auto        = function core__auto(a) {
                    var b      = [],
                        c      = 0,
                        d      = 0,
                        join   = "",
                        flaga  = false,
                        flagb  = false,
                        output = function core__auto_output(langname) {
                            if (langname === "unknown") {
                                return [
                                    options.langdefault,
                                    setlangmode(options.langdefault),
                                    "unknown"
                                ];
                            }
                            if (langname === "xhtml") {
                                return ["xml", "html", "XHTML"];
                            }
                            if (langname === "tss") {
                                return ["tss", "tss", "Titanium Stylesheets"];
                            }
                            return [langname, setlangmode(langname), nameproper(langname)];
                        };
                    if (a === null) {
                        return;
                    }
                    if ((/\sclass\s+\w/).test(a) === false && (/(\s|;|\})((if)|(for)|(function\s*\w*))\s*\(/).test(a) === false && (/return\s*\w*\s*(;|\})/).test(a) === false && (a === undefined || (/^(\s*#(?!(!\/)))/).test(a) === true || (/\n\s*(\.|@)\w+(\(?|(\s*:))/).test(a) === true)) {
                        if ((/\$[a-zA-Z]/).test(a) === true || (/\{\s*(\w|\.|\$|#)+\s*\{/).test(a) === true) {
                            return output("scss");
                        }
                        if ((/@[a-zA-Z]/).test(a) === true || (/\{\s*(\w|\.|@|#)+\s*\{/).test(a) === true) {
                            return output("less");
                        }
                        return output("css");
                    }
                    b = a
                        .replace(/\[[a-zA-Z][\w\-]*\=("|')?[a-zA-Z][\w\-]*("|')?\]/g, "")
                        .split("");
                    c = b.length;
                    if (((/^([\s\w\-]*<)/).test(a) === false || a.indexOf("<") < 0 || a.indexOf("function") < a.indexOf("<")) && (/(>[\s\w\-]*)$/).test(a) === false) {
                        for (d = 1; d < c; d += 1) {
                            if (flaga === false) {
                                if (b[d] === "*" && b[d - 1] === "/") {
                                    b[d - 1] = "";
                                    flaga    = true;
                                } else if (flagb === false && b[d] === "f" && d < c - 6 && b[d + 1] === "i" && b[d + 2] === "l" && b[d + 3] === "t" && b[d + 4] === "e" && b[d + 5] === "r" && b[d + 6] === ":") {
                                    flagb = true;
                                }
                            } else if (flaga === true && b[d] === "*" && d !== c - 1 && b[d + 1] === "/") {
                                flaga    = false;
                                b[d]     = "";
                                b[d + 1] = "";
                            } else if (flagb === true && b[d] === ";") {
                                flagb = false;
                                b[d]  = "";
                            }
                            if (flaga === true || flagb === true) {
                                b[d] = "";
                            }
                        }
                        join = b.join("");
                        if ((/^(\s*(\{|\[)(?!%))/).test(a) === true && (/((\]|\})\s*)$/).test(a) && a.indexOf(",") !== -1) {
                            return output("json");
                        }
                        if ((/((\}?(\(\))?\)*;?\s*)|([a-z0-9]("|')?\)*);?(\s*\})*)$/i).test(a) === true && ((/((var)|(let)|(const))\s+(\w|\$)+[a-zA-Z0-9]*/).test(a) === true || (/console\.log\(/).test(a) === true || (/export\s+default\s+class\s+/).test(a) === true || (/document\.get/).test(a) === true || (/((\=|(\$\())\s*function)|(\s*function\s+(\w*\s+)?\()/).test(a) === true || a.indexOf("{") === -1 || (/^(\s*if\s+\()/).test(a) === true)) {
                            if (a.indexOf("(") > -1 || a.indexOf("=") > -1 || (a.indexOf(";") > -1 && a.indexOf("{") > -1)) {
                                if ((/:\s*((number)|(string))/).test(a) === true && (/((public)|(private))\s+/).test(a) === true) {
                                    return output("typescript");
                                }
                                return output("javascript");
                            }
                            return output("unknown");
                        }
                        if (a.indexOf("{") !== -1 && (/^(\s*[\{\$\.#@a-z0-9])|^(\s*\/(\*|\/))|^(\s*\*\s*\{)/i).test(a) === true && (/^(\s*if\s*\()/).test(a) === false && (/\=\s*(\{|\[|\()/).test(join) === false && (((/(\+|-|\=|\?)\=/).test(join) === false || (/\/\/\s*\=+/).test(join) === true) || ((/\=+('|")?\)/).test(a) === true && (/;\s*base64/).test(a) === true)) && (/function(\s+\w+)*\s*\(/).test(join) === false) {
                            if (((/:\s*((number)|(string))/).test(a) === true || (/this\.\w+\s*\=/).test(a) === true) && (/((public)|(private))\s+/).test(a) === true) {
                                return output("typescript");
                            }
                            if ((/((public)|(private))\s+(((static)?\s+(v|V)oid)|(class)|(final))/).test(a) === true) {
                                return output("java");
                            }
                            if ((/\sclass\s+\w/).test(a) === false && (/<[a-zA-Z]/).test(a) === true && (/<\/[a-zA-Z]/).test(a) === true && ((/\s?\{%/).test(a) === true || (/\{(\{|#)(?!(\{|#|\=))/).test(a) === true)) {
                                return output("twig");
                            }
                            if ((/^\s*(\$|@)/).test(a) === false && ((/:\s*(\{|\(|\[)/).test(a) === true || (/(\{|\s|;)render\s*\(\)\s*\{/).test(a) === true || (/^(\s*return;?\s*\{)/).test(a) === true) && (/(\};?\s*)$/).test(a) === true) {
                                return output("javascript");
                            }
                            if ((/\{\{#/).test(a) === true && (/\{\{\//).test(a) === true && (/<\w/).test(a) === true) {
                                return output("handlebars");
                            }
                            if ((/\{\s*(\w|\.|@|#)+\s*\{/).test(a) === true) {
                                return output("less");
                            }
                            if ((/\$(\w|-)/).test(a) === true) {
                                return output("scss");
                            }
                            if ((/(;|\{|:)\s*@\w/).test(a) === true) {
                                return output("less");
                            }
                            return output("css");
                        }
                        if ((/"\s*:\s*\{/).test(a) === true) {
                            return output("tss");
                        }
                        if (a.indexOf("{%") > -1) {
                            return output("twig");
                        }
                        return output("unknown");
                    }
                    if ((((/(>[\w\s:]*)?<(\/|!)?[\w\s:\-\[]+/).test(a) === true || (/^(\s*<\?xml)/).test(a) === true) && ((/^([\s\w]*<)/).test(a) === true || (/(>[\s\w]*)$/).test(a) === true)) || ((/^(\s*<s((cript)|(tyle)))/i).test(a) === true && (/(<\/s((cript)|(tyle))>\s*)$/i).test(a) === true)) {
                        if ((/^(\s*<!doctype\ html>)/i).test(a) === true || (/^(\s*<html)/i).test(a) === true || ((/^(\s*<!DOCTYPE\s+((html)|(HTML))\s+PUBLIC\s+)/).test(a) === true && (/XHTML\s+1\.1/).test(a) === false && (/XHTML\s+1\.0\s+(S|s)((trict)|(TRICT))/).test(a) === false)) {
                            if ((/<%\s*\}/).test(a) === true) {
                                return output("ejs");
                            }
                            if ((/<%\s*end/).test(a) === true) {
                                return output("html_ruby");
                            }
                            if ((/\{\{(#|\/|\{)/).test(a) === true) {
                                return output("handlebars");
                            }
                            if ((/\{\{end\}\}/).test(a) === true) {
                                //place holder for Go lang templates
                                return output("html");
                            }
                            if ((/\s?\{%/).test(a) === true && (/\{(\{|#)(?!(\{|#|\=))/).test(a) === true) {
                                return output("twig");
                            }
                            if ((/<\?/).test(a) === true) {
                                return output("php");
                            }
                            if ((/<jsp:include\s/).test(a) === true || (/<c:((set)|(if))\s/).test(a) === true) {
                                return output("jsp");
                            }
                            if ((/\{(#|\?|\^|@|<|\+|~)/).test(a) === true && (/\{\//).test(a) === true) {
                                return output("dustjs");
                            }
                            return output("html");
                        }
                        if ((/<jsp:include\s/).test(a) === true || (/<c:((set)|(if))\s/).test(a) === true) {
                            return output("jsp");
                        }
                        if ((/<%\s*\}/).test(a) === true) {
                            return output("ejs");
                        }
                        if ((/<%\s*end/).test(a) === true) {
                            return output("html_ruby");
                        }
                        if ((/\{\{(#|\/|\{)/).test(a) === true) {
                            return output("handlebars");
                        }
                        if ((/\{\{end\}\}/).test(a) === true) {
                            //place holder for Go lang templates
                            return output("xml");
                        }
                        if ((/\s?\{%/).test(a) === true && (/\{\{(?!(\{|#|\=))/).test(a) === true) {
                            return output("twig");
                        }
                        if ((/<\?(?!(xml))/).test(a) === true) {
                            return output("php");
                        }
                        if ((/\{(#|\?|\^|@|<|\+|~)/).test(a) === true && (/\{\//).test(a) === true) {
                            return output("dustjs");
                        }
                        if ((/<jsp:include\s/).test(a) === true || (/<c:((set)|(if))\s/).test(a) === true) {
                            return output("jsp");
                        }
                        return output("xml");
                    }
                    return output("unknown");
                },
                proctime    = function core__proctime() {
                    var minuteString = "",
                        hourString   = "",
                        minutes      = 0,
                        hours        = 0,
                        elapsed      = (typeof Date.now === "function")
                            ? ((Date.now() - startTime) / 1000)
                            : (function core__proctime_dateShim() {
                                var dateitem = new Date();
                                return Date.parse(dateitem);
                            }()),
                        secondString = elapsed.toFixed(3),
                        plural       = function core__proctime_plural(x, y) {
                            var a = "";
                            if (x !== 1) {
                                a = x + y + "s ";
                            } else {
                                a = x + y + " ";
                            }
                            return a;
                        },
                        minute       = function core__proctime_minute() {
                            minutes      = parseInt((elapsed / 60), 10);
                            minuteString = plural(minutes, " minute");
                            minutes      = elapsed - (minutes * 60);
                            secondString = (minutes === 1)
                                ? "1 second"
                                : minutes.toFixed(3) + " seconds";
                        };
                    if (elapsed >= 60 && elapsed < 3600) {
                        minute();
                    } else if (elapsed >= 3600) {
                        hours      = parseInt((elapsed / 3600), 10);
                        hourString = hours.toString();
                        elapsed    = elapsed - (hours * 3600);
                        hourString = plural(hours, " hour");
                        minute();
                    } else {
                        secondString = plural(secondString, " second");
                    }
                    return "<p><strong>Execution time:</strong> <em>" + hourString + minuteString + secondString + "</em></p>";
                },
                pdcomment   = function core__pdcomment() {
                    var comment    = options.source,
                        a          = 0,
                        b          = options.source.length,
                        str        = "/*prettydiff.com",
                        c          = options
                            .source
                            .indexOf(str) + 16,
                        build      = [],
                        comma      = -1,
                        g          = 0,
                        sourceChar = [],
                        quote      = "",
                        sind       = options
                            .source
                            .indexOf(str),
                        dind       = options
                            .diff
                            .indexOf(str);
                    if (sind < 0) {
                        str  = "<!--prettydiff.com";
                        sind = options
                            .source
                            .indexOf(str);
                        c    = sind + 18;
                    }
                    if (dind < 0) {
                        dind = options
                            .source
                            .indexOf("<!--prettydiff.com");
                    }
                    if ((options.source.charAt(c - 17) === "\"" && options.source.charAt(c) === "\"") || (sind < 0 && dind < 0)) {
                        return;
                    }
                    if (sind > -1 && (/^(\s*\{\s*"token"\s*:\s*\[)/).test(options.source) === true && (/\],\s*"types"\s*:\s*\[/).test(options.source) === true) {
                        return;
                    }
                    if (sind < 0 && dind > -1 && (/^(\s*\{\s*"token"\s*:\s*\[)/).test(options.diff) === true && (/\],\s*"types"\s*:\s*\[/).test(options.diff) === true) {
                        return;
                    }
                    if (c === 15 && typeof options.diff === "string") {
                        c       = options
                            .diff
                            .indexOf("/*prettydiff.com") + 16;
                        comment = options.diff;
                    } else if (c === 17 && typeof options.diff === "string") {
                        str     = "<!--prettydiff.com";
                        c       = options
                            .diff
                            .indexOf(str) + 18;
                        comment = options.diff;
                    } else if (c === 17) {
                        return;
                    }
                    for (c = c; c < b; c += 1) {
                        if (quote === "") {
                            if (comment.charAt(c) === "\"" || comment.charAt(c) === "'") {
                                quote = comment.charAt(c);
                            } else {
                                if (comment.charAt(c) === "*" && comment.charAt(c + 1) === "/" && str === "/*prettydiff.com") {
                                    break;
                                }
                                if (comment.charAt(c) === "-" && comment.charAt(c + 1) === "-" && comment.charAt(c + 2) === ">" && str === "<!--prettydiff.com") {
                                    break;
                                }
                                sourceChar.push(comment.charAt(c));
                            }
                        } else if (comment.charAt(c) === quote) {
                            quote = "";
                        }
                    }
                    comment = sourceChar
                        .join("")
                        .toLowerCase();
                    b       = comment.length;
                    for (c = 0; c < b; c += 1) {
                        if ((typeof comment.charAt(c - 1) !== "string" || comment.charAt(c - 1) !== "\\") && (comment.charAt(c) === "\"" || comment.charAt(c) === "'")) {
                            if (quote === "") {
                                quote = comment.charAt(c);
                            } else {
                                quote = "";
                            }
                        }
                        if (quote === "") {
                            if (comment.charAt(c) === ",") {
                                g     = comma + 1;
                                comma = c;
                                build.push(comment.substring(g, comma).replace(/^(\s*)/, "").replace(/(\s*)$/, ""));
                            }
                        }
                    }
                    g     = comma + 1;
                    comma = comment.length;
                    build.push(comment.substring(g, comma).replace(/^(\s*)/, "").replace(/(\s*)$/, ""));
                    quote      = "";
                    b          = build.length;
                    sourceChar = [];
                    for (c = 0; c < b; c += 1) {
                        a = build[c].length;
                        for (g = 0; g < a; g += 1) {
                            if (build[c].indexOf(":") === -1) {
                                build[c] = "";
                                break;
                            }
                            sourceChar = [];
                            if ((typeof build[c].charAt(g - 1) !== "string" || build[c].charAt(g - 1) !== "\\") && (build[c].charAt(g) === "\"" || build[c].charAt(g) === "'")) {
                                if (quote === "") {
                                    quote = build[c].charAt(g);
                                } else {
                                    quote = "";
                                }
                            }
                            if (quote === "") {
                                if (build[c].charAt(g) === ":") {
                                    sourceChar.push(build[c].substring(0, g).replace(/(\s*)$/, ""));
                                    sourceChar.push(build[c].substring(g + 1).replace(/^(\s*)/, ""));
                                    if (sourceChar[1].charAt(0) === sourceChar[1].charAt(sourceChar[1].length - 1) && sourceChar[1].charAt(sourceChar[1].length - 2) !== "\\" && (sourceChar[1].charAt(0) === "\"" || sourceChar[1].charAt(0) === "'")) {
                                        sourceChar[1] = sourceChar[1].substring(1, sourceChar[1].length - 1);
                                    }
                                    build[c] = sourceChar;
                                    break;
                                }
                            }
                        }
                    }
                    for (c = 0; c < b; c += 1) {
                        if (typeof build[c][1] === "string") {
                            build[c][0] = build[c][0].replace("api.", "");
                            if (build[c][0] === "braces" || build[c][0] === "indent") {
                                if (build[c][1] === "knr") {
                                    options.braces = "knr";
                                } else if (build[c][1] === "allman") {
                                    options.braces = "allman";
                                }
                            } else if (build[c][0] === "comments") {
                                if (build[c][1] === "indent") {
                                    options.comments = "indent";
                                } else if (build[c][1] === "noindent") {
                                    options.comments = "noindent";
                                }
                            } else if (build[c][0] === "diffview") {
                                if (build[c][1] === "sidebyside") {
                                    options.diffview = "sidebyside";
                                } else if (build[c][1] === "inline") {
                                    options.diffview = "inline";
                                }
                            } else if (build[c][0] === "lang" || build[c][0] === "langdefault") {
                                options[build[c][0]] = setlangmode(build[c][1]);
                            } else if (build[c][0] === "mode") {
                                if (build[c][1] === "beautify") {
                                    options.mode = "beautify";
                                } else if (build[c][1] === "minify") {
                                    options.mode = "minify";
                                } else if (build[c][1] === "diff") {
                                    options.mode = "diff";
                                } else if (build[c][1] === "parse") {
                                    options.mode = "parse";
                                }
                            } else if (build[c][0] === "quoteConvert") {
                                if (build[c][1] === "single") {
                                    options.quoteConvert = "single";
                                } else if (build[c][1] === "double") {
                                    options.quoteConvert = "double";
                                } else if (build[c][1] === "none") {
                                    options.quoteConvert = "none";
                                }
                            } else if (build[c][0] === "style") {
                                if (build[c][1] === "indent") {
                                    options.style = "indent";
                                } else if (build[c][1] === "noindent") {
                                    options.style = "noindent";
                                }
                            } else if (build[c][0] === "varword") {
                                if (build[c][1] === "each") {
                                    options.varword = "each";
                                } else if (build[c][1] === "list") {
                                    options.varword = "list";
                                } else if (build[c][1] === "none") {
                                    options.varword = "none";
                                }
                            } else if (options[build[c][0]] !== undefined) {
                                if (build[c][1] === "true") {
                                    options[build[c][0]] = true;
                                } else if (build[c][1] === "false") {
                                    options[build[c][0]] = false;
                                } else if (isNaN(build[c][1]) === false) {
                                    options[build[c][0]] = Number(build[c][1]);
                                } else {
                                    options[build[c][0]] = build[c][1];
                                }
                            }
                        }
                    }
                };
            pdcomment();
            if (api.alphasort === true || api.alphasort === "true" || api.objsort === true || api.objsort === "true") {
                options.objsort = "all";
            }
            if (api.indent === "allman") {
                options.braces = "allman";
            }
            if (api.methodchain === true || api.methodchain === "true") {
                options.methodchain = "chain";
            } else if (api.methodchain === false || api.methodchain === "false") {
                options.methodchain = "indent";
            }
            if (api.vertical === true || api.vertical === "true") {
                options.vertical = "all";
            }
            if (options.source === "") {
                return ["Error: Source sample is missing.", ""];
            }
            if (options.mode === "diff") {
                if (options.diff === "Diff sample is missing.") {
                    return ["Error: Diff sample is missing.", ""];
                }
                if (options.lang === "csv") {
                    options.lang = "text";
                }
            }
            if (options.lang === "auto") {
                autoval      = auto(options.source);
                options.lang = autoval[1];
                if (autoval[2] === "unknown") {
                    autostring = "<p>Code type set to <strong>auto</strong>, but language could not be determined." +
                            " Language defaulted to <em>" + autoval[0] + "</em>.</p>";
                } else {
                    autostring = "<p>Code type set to <strong>auto</strong>. Presumed language is <em>" + autoval[2] + "</em>.</p>";
                }
            } else if (options.api === "dom") {
                autoval    = [options.lang, options.lang, options.lang];
                autostring = "<p>Code type is set to <strong>" + options.lang + "</strong>.</p>";
            } else {
                options.lang = setlangmode(options.lang);
                autostring   = "<p>Code type is set to <strong>" + options.lang + "</strong>.</p>";
            }
            if (autoval[0] === "dustjs") {
                options.dustjs = true;
            }
            if (options.lang === "html") {
                options.html = true;
                options.lang = "markup";
            } else if (options.lang === "tss" || options.lang === "titanium") {
                options.titanium = true;
                options.lang     = "javscript";
            }
            if (options.mode === "minify") {
                if (options.lang === "css") {
                    apioutput = global.csspretty(options);
                } else if (options.lang === "csv") {
                    apioutput = global.csvpretty(options);
                } else if (options.lang === "markup") {
                    apioutput = global.markuppretty(options);
                } else if (options.lang === "text") {
                    apioutput  = options.source;
                    apidiffout = "";
                } else {
                    apioutput = global.jspretty(options);
                }
                return (function core__minifyReport() {
                    var sizediff = function core__minifyReport_score() {
                        var a                 = 0,
                            lines             = 0,
                            source            = options.source,
                            sizeOld           = source.length,
                            windowsSize       = 0,
                            sizeNew           = apioutput.length,
                            sizeDifference    = sizeOld - sizeNew,
                            windowsDifference = 0,
                            percent           = ((sizeDifference / sizeOld) * 100),
                            percentUnix       = percent.toFixed(2) + "%",
                            percentWindows    = "",
                            output            = [];
                        for (a = 0; a < sizeOld; a += 1) {
                            if (source.charAt(a) === "\n" && (options.crlf === false || source.charAt(a - 1) === "\r")) {
                                lines += 1;
                            }
                        }
                        windowsSize       = sizeOld + lines;
                        windowsDifference = windowsSize - sizeNew;
                        percent           = ((windowsDifference / windowsSize) * 100);
                        percentWindows    = percent.toFixed(2) + "%";
                        if (global.report.indexOf("<p id='jserror'>") === 0) {
                            output.push(global.report);
                        } else if (global.report !== "") {
                            output.push("<p><strong class='duplicate'>Duplicate id attribute values detected:</strong> " + global.report + "</p>");
                        }
                        output.push("<div class='report'><table class='analysis' summary='Minification efficiency rep" +
                                "ort'><caption>Minification efficiency report</caption><thead><tr><th colspan='2'" +
                                ">Output Size</th><th colspan='2'>Number of Lines From Input</th></tr></thead><tb" +
                                "ody><tr><td colspan='2'>");
                        output.push(sizeNew);
                        output.push("</td><td colspan='2'>");
                        output.push(lines + 1);
                        output.push("</td></tr><tr><th>Operating System</th><th>Input Size</th><th>Size Difference</t" +
                                "h><th>Percentage of Decrease</th></tr><tr><th>Unix/Linux</th><td>");
                        output.push(sizeOld);
                        output.push("</td><td>");
                        output.push(sizeDifference);
                        output.push("</td><td>");
                        output.push(percentUnix);
                        output.push("</td></tr><tr><th>Windows</th><td>");
                        output.push(windowsSize);
                        output.push("</td><td>");
                        output.push(windowsDifference);
                        output.push("</td><td>");
                        output.push(percentWindows);
                        output.push("</td></tr></tbody></table></div>");
                        return output.join("");
                    };
                    if (global.jsxstatus === true) {
                        autoval    = ["jsx", "javascript", "React JSX"];
                        autostring = "<p>Code type set to <strong>auto</strong>. Presumed language is <em>React JSX</e" +
                                         "m>.</p>";
                    }
                    return [
                        apioutput, autostring + proctime() + sizediff()
                    ];
                }());
            }
            if (options.mode === "parse") {
                if (options.lang === "css") {
                    apioutput = global.csspretty(options);
                } else if (options.lang === "csv") {
                    apioutput = global.csvpretty(options);
                } else if (options.lang === "markup") {
                    apioutput  = global.markuppretty(options);
                    autostring = autostring + global.report;
                } else if (options.lang === "text") {
                    apioutput  = options.source;
                    apidiffout = "";
                } else {
                    apioutput = global.jspretty(options);
                }
                if (apidiffout === false) {
                    apidiffout = "";
                }
                if (global.jsxstatus === true) {
                    autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                }
                if (apioutput.token !== undefined) {
                    autostring = autostring + "<p>Total tokens: <strong>" + apioutput.token.length + "</strong></p>";
                }
                return [
                    apioutput, autostring + proctime()
                ];
            }
            if (options.mode === "beautify") {
                if (options.lang === "css") {
                    apioutput  = global.csspretty(options);
                    apidiffout = global.report;
                } else if (options.lang === "csv") {
                    apioutput  = global.csvpretty(options);
                    apidiffout = global.report;
                } else if (options.lang === "markup") {
                    if (api.vertical === "jsonly") {
                        options.vertical = "jsonly";
                    }
                    apioutput  = global.markuppretty(options);
                    apidiffout = global.report;
                    if (options.inchar !== "\t") {
                        apioutput = apioutput.replace(/\r?\n[\t]*\u0020\/>/g, "");
                    }
                } else if (options.lang === "text") {
                    apioutput  = options.source;
                    apidiffout = "";
                } else {
                    if (api.vertical === "jsonly") {
                        options.vertical = "jsonly";
                    }
                    apioutput  = global.jspretty(options);
                    apidiffout = global.report;
                }
                if (apidiffout === false) {
                    apidiffout = "";
                }
                if (global.jsxstatus === true) {
                    autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                }
                if (options.api === "" && options.jsscope !== "none" && options.lang === "javascript") {
                    html[7]  = options.color;
                    html[10] = apidiffout;
                    html[12] = builder.script.beautify;
                    return [
                        html.join(""),
                        ""
                    ];
                }
                return [
                    apioutput, autostring + proctime() + apidiffout
                ];
            }
            if (options.mode === "diff") {
                global.report    = "diff";
                options.vertical = false;
                options.jsscope  = false;
                options.preserve = 0;
                if (options.diffcomments === false) {
                    options.comments = "nocomment";
                }
                if (options.source === "" || options.diff === "") {
                    return ["", ""];
                }
                if (options.lang === "css") {
                    apioutput      = global.csspretty(options);
                    options.source = options.diff;
                    apidiffout     = global.csspretty(options);
                } else if (options.lang === "csv") {
                    apioutput  = global.csvpretty(options);
                    apidiffout = global.csvpretty(options);
                } else if (options.lang === "markup") {
                    apioutput      = global
                        .markuppretty(options)
                        .replace(/\r?\n[\t]*\ \/>/g, "");
                    options.source = options.diff;
                    apidiffout     = global
                        .markuppretty(options)
                        .replace(/\r?\n[\t]*\ \/>/g, "");
                } else if (options.lang === "text") {
                    apioutput  = options.source;
                    apidiffout = options.diff;
                } else {
                    apioutput      = global.jspretty(options);
                    options.source = options.diff;
                    apidiffout     = global.jspretty(options);
                }
                if (options.quote === true) {
                    apioutput  = apioutput.replace(/'/g, "\"");
                    apidiffout = apidiffout.replace(/'/g, "\"");
                }
                if (options.semicolon === true) {
                    apioutput  = apioutput
                        .replace(/;\r\n/g, "\r\n")
                        .replace(/;\n/g, "\n");
                    apidiffout = apidiffout
                        .replace(/;\r\n/g, "\r\n")
                        .replace(/;\n/g, "\n");
                }
                if (options.sourcelabel === "" || spacetest.test(options.sourcelabel)) {
                    options.sourcelabel = "Base Text";
                }
                if (options.difflabel === "" || spacetest.test(options.difflabel)) {
                    options.difflabel = "New Text";
                }
                return (function core__diff() {
                    var a = [],
                        s = "s",
                        t = "s";
                    options.diff   = apidiffout;
                    options.source = apioutput;
                    if (options.diffcli === true) {
                        return global.diffview(options);
                    }
                    if (apioutput === "Error: This does not appear to be JavaScript." || apidiffout === "Error: This does not appear to be JavaScript.") {
                        a[1] = [
                            "<p><strong>Error:</strong> Please try using the option labeled <em>Plain Text (d" +
                                    "iff only)</em>. <span style='display:block'>The input does not appear to be mark" +
                                    "up, CSS, or JavaScript.</span></p>",
                            0,
                            0
                        ];
                    } else {
                        if (options.lang === "text") {
                            options.inchar = "";
                        }
                        a[1] = global.diffview(options);
                        if (a[1][2] === 1) {
                            t = "";
                            if (a[1][1] === 0) {
                                s = "";
                            }
                        }
                    }
                    a[0] = "<p><strong>Number of differences:</strong> <em>" + (a[1][1] + a[1][2]) + "</em> difference" + s + " from <em>" + a[1][2] + "</em> line" + t + " of code.</p>";
                    if (global.jsxstatus === true) {
                        autostring = "<p>Code type is presumed to be <em>React JSX</em>.</p>";
                    }
                    if (options.api === "") {
                        html[7]  = options.color;
                        html[10] = a[0] + a[1][0];
                        return [
                            html.join(""),
                            ""
                        ];
                    }
                    if (options.mode === "diff") {
                        return [
                            a[1][0], autostring + proctime() + a[0] + " <p>Accessibility note. &lt;em&gt; tags in the output represent character differ" +
                                    "ences per lines compared.</p>"
                        ];
                    }
                    return [
                        a[1][0], autostring + proctime() + a[0] + " <p>Accessibility note. &lt;em&gt; tags in the output represent presentation for" +
                                " variable coloring and scope.</p>"
                    ];
                }());
            }
        };
    return core(api);
};
global.report         = "";
global.edition        = {
    addon        : {
        ace: 160307
    },
    api          : {
        dom      : 160309, //dom.js
        nodeLocal: 160308, //node-local.js
        wsh      : 160308
    },
    css          : 160223, //css files
    csspretty    : 160317, //csspretty lib
    csvpretty    : 160307, //csvpretty lib
    diffview     : 160307, //diffview lib
    documentation: 160308, //documentation.xhtml
    jspretty     : 160310, //jspretty lib
    latest       : 0,
    lint         : 160229, //unit test and lint automation as test/lint.js
    markuppretty : 160310, //markuppretty lib
    prettydiff   : 160308, //this file
    safeSort     : 160307, //safeSort lib
    version      : "1.16.37", //version number
    webtool      : 160309
};
global.edition.latest = (function edition_latest() {
    "use strict";
    return Math.max(global.edition.css, global.edition.csspretty, global.edition.csvpretty, global.edition.diffview, global.edition.documentation, global.edition.jspretty, global.edition.markuppretty, global.edition.prettydiff, global.edition.webtool, global.edition.api.dom, global.edition.api.nodeLocal, global.edition.api.wsh);
}());
if (typeof exports === "object" || typeof exports === "function") {
    //commonjs and nodejs support
    exports.report  = global.report;
    exports.edition = global.edition;
    exports.api     = function commonjs(x) {
        "use strict";
        return prettydiff(x);
    };
} else if ((typeof define === "object" || typeof define === "function") && (ace === undefined || ace.prettydiffid === undefined)) {
    //requirejs support
    define(function requirejs(require, exports) {
        "use strict";
        exports.report  = global.report;
        exports.edition = global.edition;
        exports.api     = function requirejs_export(x) {
            return prettydiff(x);
        };
        //worthless if block to appease RequireJS and JSLint
        if (typeof require === "number") {
            return require;
        }
        return exports.api;
    });
}
