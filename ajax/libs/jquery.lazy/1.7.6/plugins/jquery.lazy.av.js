/*!
 * jQuery & Zepto Lazy - AV Plugin - v1.4
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2017, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // loads audio and video tags including tracks by two ways, like:
    // <audio>
    //   <data-src src="audio.ogg" type="video/ogg"></data-src>
    //   <data-src src="audio.mp3" type="video/mp3"></data-src>
    // </audio>
    // <video data-poster="poster.jpg">
    //   <data-src src="video.ogv" type="video/ogv"></data-src>
    //   <data-src src="video.webm" type="video/webm"></data-src>
    //   <data-src src="video.mp4" type="video/mp4"></data-src>
    //   <data-track kind="captions" src="captions.vtt" srclang="en"></data-track>
    //   <data-track kind="descriptions" src="descriptions.vtt" srclang="en"></data-track>
    //   <data-track kind="subtitles" src="subtitles.vtt" srclang="de"></data-track>
    // </video>
    //
    // or:
    // <audio data-src="audio.ogg|video/ogg,video.mp3|video/mp3"></video>
    // <video data-poster="poster.jpg" data-src="video.ogv|video/ogv,video.webm|video/webm,video.mp4|video/mp4">
    //   <data-track kind="captions" src="captions.vtt" srclang="en"></data-track>
    //   <data-track kind="descriptions" src="descriptions.vtt" srclang="en"></data-track>
    //   <data-track kind="subtitles" src="subtitles.vtt" srclang="de"></data-track>
    // </video>
    $.lazy(["av", "audio", "video"], ["audio", "video"], function(element, response) {
        var elementTagName = element[0].tagName.toLowerCase();

        if( elementTagName === "audio" || elementTagName === "video" ) {
            var srcAttr = "data-src",
                sources = element.find(srcAttr),
                tracks = element.find("data-track"),
                sourcesInError = 0,

            // create on error callback for sources
            onError = function() {
                if( ++sourcesInError === sources.length )
                    response(false);
            },

            // create callback to handle a source or track entry
            handleSource = function() {
                var source = $(this),
                    type = source[0].tagName.toLowerCase(),
                    attributes = source.prop("attributes"),
                    target = $(type === srcAttr ? "<source>" : "<track>");

                if( type === srcAttr )
                    target.one("error", onError);

                $.each(attributes, function(index, attribute) {
                    target.attr(attribute.name, attribute.value);
                });

                source.replaceWith(target);
            };

            // create event for successfull load
            element.one("loadedmetadata", function() {
                response(true);
            })

            // remove default callbacks to ignore loading poster image
            .off("load error")

            // load poster image
            .attr("poster", element.attr("data-poster"));

            // load by child tags
            if( sources.length )
                sources.each(handleSource);

            // load by attribute
            else if( element.attr(srcAttr) ) {
                // split for every entry by comma
                $.each(element.attr(srcAttr).split(","), function(index, value) {
                    // split again for file and file type
                    var parts = value.split("|");

                    // create a source entry
                    element.append($("<source>")
                           .one("error", onError)
                           .attr({src: parts[0].trim(), type: parts[1].trim()}));
                });

                // remove now obsolete attribute
                if( this.config("removeAttribute") )
                    element.removeAttr(srcAttr);
            }

            else {
                // pass error state
                // use response function for Zepto
                response(false);
            }

            // load optional tracks
            if( tracks.length )
                tracks.each(handleSource);
        }

        else {
            // pass error state
            // use response function for Zepto
            response(false);
        }
    });
})(window.jQuery || window.Zepto);