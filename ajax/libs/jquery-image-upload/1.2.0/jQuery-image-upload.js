/*
 *  jQuery Image Upload
 *
 *  A jQuery plugin that adds controls to the selected jQuery
 *  elements with a simple call.
 *
 *  Example:
 *
 *      $("img").imageUpload();
 *
 *  Released with <3 and JavaScript by the @jillix developers.
 *
 * */
(function ($) {

    // Defaults
    var defaults = {
        wrapContent: "<div class='jQuery-imageUpload'>",

        inputFileName: "inputFile",
        inputFileClass: "inputFile",

        uploadButtonValue: "Upload",
        uploadButtonClass: "uploadButton",

        browseButtonValue: "Browse",
        browseButtonClass: "browseButton",

        deleteButtonValue: "Delete image",
        deleteButtonClass: "deleteButton",

        automaticUpload: false,

        formClass: "controlForm",

        hideFileInput: true,
        hideDeleteButton: false,

        hover: true,

        addClass: "jQuery-image-upload"
    };

   /*
    * $("[jQuery selector]").imageUpload({...});
    * */
    $.fn.imageUpload = function (options) {

        // Selected jQuery objects
        var $self = this;

        // Return if no elements
        if (!$self.length) { return $self; }

        // Defaults
        var settings = $.extend(defaults, options);

        // Call image upload for each element
        if ($self.length > 1) {
            $self.each(function () {
                $(this).imageUpload(settings);
            });
            return $self;
        }

        // Reload imageUpload if it was already created
        if ($self.data("imageUpload")) {
            $self.trigger("imageUpload.reload");
            return $self;
        }

        // Add class
        $self.addClass(settings.addClass);

        // Set imageUpload data
        $self.data("imageUpload", options);

        // Form action not provided
        if (!settings.formAction) {
            throw new Error ("Form action was not provided. Please provide it: $(...).imageUpload({formAction: '...'})");
        }

        // Wrap
        if (!settings.hover) {
            $self.wrap(settings.wrapContent);
        }

        // Create the control div
        var $controls = $("<div>").addClass("controls");

        // Create the file input element
        var $fileInput = $("<input>")
                            .attr({
                                "type": "file",
                                "name": settings.inputFileName
                            })
                            .addClass(settings.inputFileClass);

        // Create the upload button
        var $uploadButton = $("<button>")
                                .attr("type", "submit")
                                .addClass(settings.uploadButtonClass)
                                .html(settings.uploadButtonValue);

        // Create the browse button
        var $browseButton = $("<button>")
                                .addClass(settings.browseButtonClass)
                                .html(settings.browseButtonValue)
                                .on("click", function () {

                                    // Click the file input
                                    $fileInput.click();

                                    // Prevent browser's default behavior
                                    return false;
                                });

        // Create the delete button
        var $deleteButton = $("<button>")
                                .addClass(settings.deleteButtonClass)
                                .html(settings.deleteButtonValue)
                                .on("click", function () {
                                    // Destroy the image upload
                                    $self.trigger("imageUpload.destroy");

                                    // Trigger remove event
                                    $self.trigger("imageUpload.imageRemoved");

                                    // And remove the image from dom
                                    $self.remove();

                                    // Prevent browser's default behavior
                                    return false;
                                });

        // Generate the iframe id
        var iframeId =  "uploadIframe-" + Math
                                            .random()
                                            .toString(36)
                                            .substring(5, 20)
                                            .toLowerCase();

        // Create the upload iframe
        var $uploadIframe   = $("<iframe>")
                                .attr({
                                    "id": iframeId,
                                    "name": iframeId
                                })
                                .hide();


        // Create the upload form
        var $uploadForm     = $("<form>")
                                .addClass(settings.formClass)
                                .attr({
                                    "target": $uploadIframe.attr("id"),
                                    "enctype": "multipart/form-data",
                                    "method": "post",
                                    "action": settings.formAction
                                });


        // Append controls to form
        $uploadForm.append([$browseButton, $fileInput, $uploadButton, $deleteButton, $uploadIframe]);

        // Hide delete button
        if (settings.hideDeleteButton) {

            // We just remove it
            $deleteButton.remove();
        }

        // If automatic upload
        if (settings.automaticUpload) {

            // Hide the upload button
            $uploadButton.hide();

            // File input change
            $fileInput.on("change", function () {

                // No file selected, do nothing
                if (!$(this).val()) { return; }

                // Start upload
                $uploadButton.click();
            });
        }

        // Hide file input
        if (settings.hideFileInput) {
            $fileInput.hide();
        } else {
            // Hide browse button
            $browseButton.hide();
        }

        // Append $form to $controls
        $controls.append($uploadForm);

        // Form on submit
        $uploadForm.on("submit", function () {

            // Get submiited form
            var $form = $(this);

            // Unset the load handler
            $uploadIframe.off("load");

            // Save the old image source in case of error
            var oldSrc = $self.attr("src");

            // Waiter image
            if (typeof settings.waiter === "string") {
                $self.attr("src", settings.waiter);
            }

            $self.addClass("loading");
            $controls.hide();

            // Set it again
            $uploadIframe.on("load", function () {

                // Get text from the page
                var result = $(this.contentWindow.document).text();

                // The selected file was not a valid image and `result` is not a URL
                if (!/^https?|^\//.test(result)) {
                    loadImage($self, oldSrc);
                    $self.trigger("imageUpload.uploadFailed", [result]);
                    return;
                }

                // If no result, return
                if (!result) {
                    loadImage($self, oldSrc);
                    $self.trigger("imageUpload.uploadFailed", [result]);
                    return;
                }

                // Reload the image upload controls only if the file input is hidden
                if (settings.hideFileInput) {
                    $self.trigger("imageUpload.reload");
                }

                // Verify file input value
                if (!$fileInput.val()) {
                    loadImage($self, oldSrc);
                    return;
                }

                // Set src of iframe
                $uploadIframe.attr("src", "");

                // Update the image source
                loadImage($self, result, function () {
                    // Trigger image changed event
                    $self.trigger("imageUpload.imageChanged");
                });

                // Replace the file input
                $fileInput.replaceWith($fileInput.clone(true));
            });
        });

        // No hover
        if (!settings.hover) {

            // Append controls to image wrapper
            $self.parent().append($controls);
        } else {

            // Set absolute position to controls and set the offset
            $controls.css({ position: "absolute" });

            // Add class to controls
            $controls.addClass("jQuery-image-upload-controls");

            // Append controls to body
            $("body").append($controls.hide());

            // Self on mouse enter
            $self.on("mouseenter", function () {

                if ($self.hasClass("loading")) {
                    return;
                }

                // Get the self offset
                var offset = $self.offset();

                // Set control possition
                $controls.css({
                    top: offset.top,
                    left: offset.left
                });

                // Show controls
                $controls.show();
            });

            // On mouse leave
            $("body").on("mouseleave", "." + settings.addClass, function (e) {

                // Get position, width and height
                var o = $self.offset();
                var w = $self.width();
                var h = $self.height();

                // Hide controls
                if ((e.pageX < o.left || e.pageX > o.left + w) ||
                    (e.pageY < o.top || e.pageY > o.top + h)) {
                    $controls.hide();
                }
            });
        }

        // Destroy
        $self.on("imageUpload.destroy", function () {

            // Remove controls
            $controls.remove();

            // Remove events
            $self.off("imageUpload.destroy");
            $self.off("imageUpload.reload");

            // Remove data
            $self.data("imageUpload", null);
        });

        // Reload
        $self.on("imageUpload.reload", function () {
            $self.trigger("imageUpload.destroy");
            $self.imageUpload(options);
        });

        // Return selected element
        return $self;
    };

    /**
     * Load the image at the URL `newSource` in the `$imageElement` jQuery
     * element with a fade in/out animation, then call the `callback`.
     * @param {jQuery} $imageElement
     * @param {String} newSource
     * @param {Function} callback
     */
    function loadImage ($imageElement, newSource, callback) {
        $imageElement.fadeOut(function () {
            $imageElement.attr("src", newSource);
            imgLoad($imageElement, function () {
                $imageElement.removeClass("loading");
                $imageElement.fadeIn();
                if (typeof callback === "function") {
                    callback();
                }
            });
        });
    }

    /**
     * Trigger a callback when the selected images are loaded:
     * @param {String} selector
     * @param {Function} callback
     */
    function imgLoad (selector, callback) {
        $(selector).each(function () {
            if (this.complete) {
                callback.apply(this);
            }
            else {
                $(this).on('load', function () {
                    callback.apply(this);
                });
            }
        });
    }

    // Defaults
    $.imageUpload = $.fn.imageUpload;
    $.imageUpload.defaults = defaults;
})($);
