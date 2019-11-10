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