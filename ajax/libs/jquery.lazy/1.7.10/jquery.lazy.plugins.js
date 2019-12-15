/*!
 * jQuery & Zepto Lazy - AJAX Plugin - v1.4
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load data by ajax request and pass them to elements inner html, like:
    // <div data-loader="ajax" data-src="url.html" data-method="post" data-type="html"></div>
    $.lazy('ajax', function(element, response) {
        ajaxRequest(this, element, response, element.attr('data-method'));
    });

    // load data by ajax get request and pass them to elements inner html, like:
    // <div data-loader="get" data-src="url.html" data-type="html"></div>
    $.lazy('get', function(element, response) {
        ajaxRequest(this, element, response, 'GET');
    });

    // load data by ajax post request and pass them to elements inner html, like:
    // <div data-loader="post" data-src="url.html" data-type="html"></div>
    $.lazy('post', function(element, response) {
        ajaxRequest(this, element, response, 'POST');
    });

    // load data by ajax put request and pass them to elements inner html, like:
    // <div data-loader="put" data-src="url.html" data-type="html"></div>
    $.lazy('put', function(element, response) {
        ajaxRequest(this, element, response, 'PUT');
    });

    /**
     * execute ajax request and handle response
     * @param {object} instance
     * @param {jQuery|object} element
     * @param {function} response
     * @param {string} [method]
     */
    function ajaxRequest(instance, element, response, method) {
        method = method ? method.toUpperCase() : 'GET';

        var data;
        if ((method === 'POST' || method === 'PUT') && instance.config('ajaxCreateData')) {
            data = instance.config('ajaxCreateData').apply(instance, [element]);
        }

        $.ajax({
            url: element.attr('data-src'),
            type: method === 'POST' || method === 'PUT' ? method : 'GET',
            data: data,
            dataType: element.attr('data-type') || 'html',

            /**
             * success callback
             * @access private
             * @param {*} content
             * @return {void}
             */
            success: function(content) {
                // set responded data to element's inner html
                element.html(content);

                // use response function for Zepto
                response(true);

                // remove attributes
                if (instance.config('removeAttribute')) {
                    element.removeAttr('data-src data-method data-type');
                }
            },

            /**
             * error callback
             * @access private
             * @return {void}
             */
            error: function() {
                // pass error state to lazy
                // use response function for Zepto
                response(false);
            }
        });
    }
})(window.jQuery || window.Zepto);

/*!
 * jQuery & Zepto Lazy - AV Plugin - v1.4
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
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
    $.lazy(['av', 'audio', 'video'], ['audio', 'video'], function(element, response) {
        var elementTagName = element[0].tagName.toLowerCase();

        if (elementTagName === 'audio' || elementTagName === 'video') {
            var srcAttr = 'data-src',
                sources = element.find(srcAttr),
                tracks = element.find('data-track'),
                sourcesInError = 0,

            // create on error callback for sources
            onError = function() {
                if (++sourcesInError === sources.length) {
                    response(false);
                }
            },

            // create callback to handle a source or track entry
            handleSource = function() {
                var source = $(this),
                    type = source[0].tagName.toLowerCase(),
                    attributes = source.prop('attributes'),
                    target = $(type === srcAttr ? '<source>' : '<track>');

                if (type === srcAttr) {
                    target.one('error', onError);
                }

                $.each(attributes, function(index, attribute) {
                    target.attr(attribute.name, attribute.value);
                });

                source.replaceWith(target);
            };

            // create event for successfull load
            element.one('loadedmetadata', function() {
                response(true);
            })

            // remove default callbacks to ignore loading poster image
            .off('load error')

            // load poster image
            .attr('poster', element.attr('data-poster'));

            // load by child tags
            if (sources.length) {
                sources.each(handleSource);
            }

            // load by attribute
            else if (element.attr(srcAttr)) {
                // split for every entry by comma
                $.each(element.attr(srcAttr).split(','), function(index, value) {
                    // split again for file and file type
                    var parts = value.split('|');

                    // create a source entry
                    element.append($('<source>')
                           .one('error', onError)
                           .attr({src: parts[0].trim(), type: parts[1].trim()}));
                });

                // remove now obsolete attribute
                if (this.config('removeAttribute')) {
                    element.removeAttr(srcAttr);
                }
            }

            else {
                // pass error state
                // use response function for Zepto
                response(false);
            }

            // load optional tracks
            if (tracks.length) {
                tracks.each(handleSource);
            }
        }

        else {
            // pass error state
            // use response function for Zepto
            response(false);
        }
    });
})(window.jQuery || window.Zepto);

/*!
 * jQuery & Zepto Lazy - iFrame Plugin - v1.5
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load iframe content, like:
    // <iframe data-src="iframe.html"></iframe>
    //
    // enable content error check with:
    // <iframe data-src="iframe.html" data-error-detect="true"></iframe>
    $.lazy(['frame', 'iframe'], 'iframe', function(element, response) {
        var instance = this;

        if (element[0].tagName.toLowerCase() === 'iframe') {
            var srcAttr = 'data-src',
                errorDetectAttr = 'data-error-detect',
                errorDetect = element.attr(errorDetectAttr);

            // default way, just replace the 'src' attribute
            if (errorDetect !== 'true' && errorDetect !== '1') {
                // set iframe source
                element.attr('src', element.attr(srcAttr));

                // remove attributes
                if (instance.config('removeAttribute')) {
                    element.removeAttr(srcAttr + ' ' + errorDetectAttr);
                }
            }

            // extended way, even check if the document is available
            else {
                $.ajax({
                    url: element.attr(srcAttr),
                    dataType: 'html',
                    crossDomain: true,
                    xhrFields: {withCredentials: true},

                    /**
                     * success callback
                     * @access private
                     * @param {*} content
                     * @return {void}
                     */
                    success: function(content) {
                        // set responded data to element's inner html
                        element.html(content)

                        // change iframe src
                        .attr('src', element.attr(srcAttr));

                        // remove attributes
                        if (instance.config('removeAttribute')) {
                            element.removeAttr(srcAttr + ' ' + errorDetectAttr);
                        }
                    },

                    /**
                     * error callback
                     * @access private
                     * @return {void}
                     */
                    error: function() {
                        // pass error state to lazy
                        // use response function for Zepto
                        response(false);
                    }
                });
            }
        }

        else {
            // pass error state to lazy
            // use response function for Zepto
            response(false);
        }
    });
})(window.jQuery || window.Zepto);

/*!
 * jQuery & Zepto Lazy - NOOP Plugin - v1.2
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // will do nothing, used to disable elements or for development
    // use like:
    // <div data-loader="noop"></div>

    // does not do anything, just a 'no-operation' helper ;)
    $.lazy('noop', function() {});

    // does nothing, but response a successfull loading
    $.lazy('noop-success', function(element, response) {
        // use response function for Zepto
        response(true);
    });

    // does nothing, but response a failed loading
    $.lazy('noop-error', function(element, response) {
        // use response function for Zepto
        response(false);
    });
})(window.jQuery || window.Zepto);

/*!
 * jQuery & Zepto Lazy - Picture Plugin - v1.3
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    var srcAttr = 'data-src',
        srcsetAttr = 'data-srcset',
        mediaAttr = 'data-media',
        sizesAttr = 'data-sizes',
        typeAttr = 'data-type';

    // loads picture elements like:
    // <picture>
    //   <data-src srcset="1x.jpg 1x, 2x.jpg 2x, 3x.jpg 3x" media="(min-width: 600px)" type="image/jpeg"></data-src>
    //   <data-src srcset="1x.jpg 1x, 2x.jpg 2x, 3x.jpg 3x" media="(min-width: 400px)" type="image/jpeg"></data-src>
    //   <data-img src="default.jpg" >
    // </picture>
    //
    // or:
    // <picture data-src="default.jpg">
    //   <data-src srcset="1x.jpg 1x, 2x.jpg 2x, 3x.jpg 3x" media="(min-width: 600px)" type="image/jpeg"></data-src>
    //   <data-src srcset="1x.jpg 1x, 2x.jpg 2x, 3x.jpg 3x" media="(min-width: 400px)" type="image/jpeg"></data-src>
    // </picture>
    //
    // or just with attributes in one line:
    // <picture data-src="default.jpg" data-srcset="1x.jpg 1x, 2x.jpg 2x, 3x.jpg 3x" data-media="(min-width: 600px)" data-sizes="" data-type="image/jpeg" />
    $.lazy(['pic', 'picture'], ['picture'], function(element, response) {
        var elementTagName = element[0].tagName.toLowerCase();

        if (elementTagName === 'picture') {
            var sources = element.find(srcAttr),
                image = element.find('data-img'),
                imageBase = this.config('imageBase') || '';

            // handle as child elements
            if (sources.length) {
                sources.each(function() {
                    renameElementTag($(this), 'source', imageBase);
                });

                // create img tag from child
                if (image.length === 1) {
                    image = renameElementTag(image, 'img', imageBase);

                    // bind event callbacks to new image tag
                    image.on('load', function() {
                        response(true);
                    }).on('error', function() {
                        response(false);
                    });

                    image.attr('src', image.attr(srcAttr));

                    if (this.config('removeAttribute')) {
                        image.removeAttr(srcAttr);
                    }
                }

                // create img tag from attribute
                else if (element.attr(srcAttr)) {
                    // create image tag
                    createImageObject(element, imageBase + element.attr(srcAttr), response);

                    if (this.config('removeAttribute')) {
                        element.removeAttr(srcAttr);
                    }
                }

                // pass error state
                else {
                    // use response function for Zepto
                    response(false);
                }
            }

            // handle as attributes
            else if( element.attr(srcsetAttr) ) {
                // create source elements before img tag
                $('<source>').attr({
                    media: element.attr(mediaAttr),
                    sizes: element.attr(sizesAttr),
                    type: element.attr(typeAttr),
                    srcset: getCorrectedSrcSet(element.attr(srcsetAttr), imageBase)
                })
                .appendTo(element);

                // create image tag
                createImageObject(element, imageBase + element.attr(srcAttr), response);

                // remove attributes from parent picture element
                if (this.config('removeAttribute')) {
                    element.removeAttr(srcAttr + ' ' + srcsetAttr + ' ' + mediaAttr + ' ' + sizesAttr + ' ' + typeAttr);
                }
            }

            // pass error state
            else {
                // use response function for Zepto
                response(false);
            }
        }

        else {
            // pass error state
            // use response function for Zepto
            response(false);
        }
    });

    /**
     * create a new child element and copy attributes
     * @param {jQuery|object} element
     * @param {string} toType
     * @param {string} imageBase
     * @return {jQuery|object}
     */
    function renameElementTag(element, toType, imageBase) {
        var attributes = element.prop('attributes'),
            target = $('<' + toType + '>');

        $.each(attributes, function(index, attribute) {
            // build srcset with image base
            if (attribute.name === 'srcset' || attribute.name === srcAttr) {
                attribute.value = getCorrectedSrcSet(attribute.value, imageBase);
            }

            target.attr(attribute.name, attribute.value);
        });

        element.replaceWith(target);
        return target;
    }

    /**
     * create a new image element inside parent element
     * @param {jQuery|object} parent
     * @param {string} src
     * @param {function} response
     * @return void
     */
    function createImageObject(parent, src, response) {
        // create image tag
        var imageObj = $('<img>')

        // create image tag an bind callbacks for correct response
        .one('load', function() {
            response(true);
        })
        .one('error', function() {
            response(false);
        })

        // set into picture element
        .appendTo(parent)

        // set src attribute at last to prevent early kick-in
        .attr('src', src);

        // call after load even on cached image
        imageObj.complete && imageObj.load(); // jshint ignore : line
    }

    /**
     * prepend image base to all srcset entries
     * @param {string} srcset
     * @param {string} imageBase
     * @returns {string}
     */
    function getCorrectedSrcSet(srcset, imageBase) {
        if (imageBase) {
            // trim, remove unnecessary spaces and split entries
            var entries = srcset.split(',');
            srcset = '';

            for (var i = 0, l = entries.length; i < l; i++) {
                srcset += imageBase + entries[i].trim() + (i !== l - 1 ? ',' : '');
            }
        }

        return srcset;
    }
})(window.jQuery || window.Zepto);

/*!
 * jQuery & Zepto Lazy - Script Plugin - v1.2
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // loads javascript files for script tags, like:
    // <script data-src="file.js" type="text/javascript"></script>
    $.lazy(['js', 'javascript', 'script'], 'script', function(element, response) {
        if (element[0].tagName.toLowerCase() === 'script') {
            element.attr('src', element.attr('data-src'));

            // remove attribute
            if (this.config('removeAttribute')) {
                element.removeAttr('data-src');
            }
        }
        else {
            // use response function for Zepto
            response(false);
        }
    });
})(window.jQuery || window.Zepto);

/*!
 * jQuery & Zepto Lazy - Vimeo Plugin - v1.1
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load vimeo video iframe, like:
    // <iframe data-loader="vimeo" data-src="176894130" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    $.lazy('vimeo', function(element, response) {
        if (element[0].tagName.toLowerCase() === 'iframe') {
            // pass source to iframe
            element.attr('src', 'https://player.vimeo.com/video/' + element.attr('data-src'));

            // remove attribute
            if (this.config('removeAttribute')) {
                element.removeAttr('data-src');
            }
        }

        else {
            // pass error state
            // use response function for Zepto
            response(false);
        }
    });
})(window.jQuery || window.Zepto);

/*!
 * jQuery & Zepto Lazy - YouTube Plugin - v1.5
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load youtube video iframe, like:
    // <iframe data-loader="yt" data-src="1AYGnw6MwFM" data-nocookie="1" width="560" height="315" frameborder="0" allowfullscreen></iframe>
    $.lazy(['yt', 'youtube'], function(element, response) {
        if (element[0].tagName.toLowerCase() === 'iframe') {
            // pass source to iframe
            var noCookie = /1|true/.test(element.attr('data-nocookie'));
            element.attr('src', 'https://www.youtube' + (noCookie ? '-nocookie' : '') + '.com/embed/' + element.attr('data-src') + '?rel=0&amp;showinfo=0');

            // remove attribute
            if (this.config('removeAttribute')) {
                element.removeAttr('data-src');
            }
        }

        else {
            // pass error state
            response(false);
        }
    });
})(window.jQuery || window.Zepto);