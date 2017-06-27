/**
 * @namespace bootstrapLightbox
 */
angular.module('bootstrapLightbox', [
  'ui.bootstrap'
]);

// optional dependencies
try {
  angular.module('angular-loading-bar');
  angular.module('bootstrapLightbox').requires.push('angular-loading-bar');
} catch (e) {}

try {
  angular.module('ngTouch');
  angular.module('bootstrapLightbox').requires.push('ngTouch');
} catch (e) {}

try {
  angular.module('videosharing-embed');
  angular.module('bootstrapLightbox').requires.push('videosharing-embed');
} catch (e) {}
angular.module('bootstrapLightbox').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lightbox.html',
    "<div class=modal-body ng-swipe-left=Lightbox.nextImage() ng-swipe-right=Lightbox.prevImage()><div class=lightbox-nav><button class=close aria-hidden=true ng-click=$dismiss()>×</button><div class=btn-group ng-if=\"Lightbox.images.length > 1\"><a class=\"btn btn-xs btn-default\" ng-click=Lightbox.prevImage()>‹ Previous</a> <a ng-href={{Lightbox.imageUrl}} target=_blank class=\"btn btn-xs btn-default\" title=\"Open in new tab\">Open image in new tab</a> <a class=\"btn btn-xs btn-default\" ng-click=Lightbox.nextImage()>Next ›</a></div></div><div class=lightbox-image-container><div class=lightbox-image-caption><span>{{Lightbox.imageCaption}}</span></div><img ng-if=!Lightbox.isVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}}><div ng-if=Lightbox.isVideo(Lightbox.image) class=\"embed-responsive embed-responsive-16by9\"><video ng-if=!Lightbox.isSharedVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}} controls autoplay></video><embed-video ng-if=Lightbox.isSharedVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}} ng-href={{Lightbox.imageUrl}} iframe-id=lightbox-video class=embed-responsive-item><a ng-href={{Lightbox.imageUrl}}>Watch video</a></embed-video></div></div></div>"
  );

}]);
/**
 * @class     ImageLoader
 * @classdesc Service for loading an image.
 * @memberOf  bootstrapLightbox
 */
angular.module('bootstrapLightbox').service('ImageLoader', ['$q',
    function ($q) {
  /**
   * Load the image at the given URL.
   * @param    {String} url
   * @return   {Promise} A $q promise that resolves when the image has loaded
   *   successfully.
   * @type     {Function}
   * @name     load
   * @memberOf bootstrapLightbox.ImageLoader
   */
  this.load = function (url) {
    var deferred = $q.defer();

    var image = new Image();

    // when the image has loaded
    image.onload = function () {
      // check image properties for possible errors
      if ((typeof this.complete === 'boolean' && this.complete === false) ||
          (typeof this.naturalWidth === 'number' && this.naturalWidth === 0)) {
        deferred.reject();
      }

      deferred.resolve(image);
    };

    // when the image fails to load
    image.onerror = function () {
      deferred.reject();
    };

    // start loading the image
    image.src = url;

    return deferred.promise;
  };
}]);
/**
 * @class     Lightbox
 * @classdesc Lightbox service.
 * @memberOf  bootstrapLightbox
 */
angular.module('bootstrapLightbox').provider('Lightbox', function () {
  /**
   * Template URL passed into `$uibModal.open()`.
   * @type     {String}
   * @name     templateUrl
   * @memberOf bootstrapLightbox.Lightbox
   */
  this.templateUrl = 'lightbox.html';

  /**
   * Whether images should be scaled to the maximum possible dimensions.
   * @type     {Boolean}
   * @name     fullScreenMode
   * @memberOf bootstrapLightbox.Lightbox
   */
  this.fullScreenMode = false;

  /**
   * @param    {*} image An element in the array of images.
   * @return   {String} The URL of the given image.
   * @type     {Function}
   * @name     getImageUrl
   * @memberOf bootstrapLightbox.Lightbox
   */
  this.getImageUrl = function (image) {
    return typeof image === 'string' ? image : image.url;
  };

  /**
   * @param    {*} image An element in the array of images.
   * @return   {String} The caption of the given image.
   * @type     {Function}
   * @name     getImageCaption
   * @memberOf bootstrapLightbox.Lightbox
   */
  this.getImageCaption = function (image) {
    return image.caption;
  };

  /**
   * Calculate the max and min limits to the width and height of the displayed
   *   image (all are optional). The max dimensions override the min
   *   dimensions if they conflict.
   * @param    {Object} dimensions Contains the properties `windowWidth`,
   *   `windowHeight`, `imageWidth`, and `imageHeight`.
   * @return   {Object} May optionally contain the properties `minWidth`,
   *   `minHeight`, `maxWidth`, and `maxHeight`.
   * @type     {Function}
   * @name     calculateImageDimensionLimits
   * @memberOf bootstrapLightbox.Lightbox
   */
  this.calculateImageDimensionLimits = function (dimensions) {
    if (dimensions.windowWidth >= 768) {
      return {
        // 92px = 2 * (30px margin of .modal-dialog
        //             + 1px border of .modal-content
        //             + 15px padding of .modal-body)
        // with the goal of 30px side margins; however, the actual side margins
        // will be slightly less (at 22.5px) due to the vertical scrollbar
        'maxWidth': dimensions.windowWidth - 92,
        // 126px = 92px as above
        //         + 34px outer height of .lightbox-nav
        'maxHeight': dimensions.windowHeight - 126
      };
    } else {
      return {
        // 52px = 2 * (10px margin of .modal-dialog
        //             + 1px border of .modal-content
        //             + 15px padding of .modal-body)
        'maxWidth': dimensions.windowWidth - 52,
        // 86px = 52px as above
        //        + 34px outer height of .lightbox-nav
        'maxHeight': dimensions.windowHeight - 86
      };
    }
  };

  /**
   * Calculate the width and height of the modal. This method gets called
   *   after the width and height of the image, as displayed inside the modal,
   *   are calculated.
   * @param    {Object} dimensions Contains the properties `windowWidth`,
   *   `windowHeight`, `imageDisplayWidth`, and `imageDisplayHeight`.
   * @return   {Object} Must contain the properties `width` and `height`.
   * @type     {Function}
   * @name     calculateModalDimensions
   * @memberOf bootstrapLightbox.Lightbox
   */
  this.calculateModalDimensions = function (dimensions) {
    // 400px = arbitrary min width
    // 32px = 2 * (1px border of .modal-content
    //             + 15px padding of .modal-body)
    var width = Math.max(400, dimensions.imageDisplayWidth + 32);

    // 200px = arbitrary min height
    // 66px = 32px as above
    //        + 34px outer height of .lightbox-nav
    var height = Math.max(200, dimensions.imageDisplayHeight + 66);

    // first case:  the modal width cannot be larger than the window width
    //              20px = arbitrary value larger than the vertical scrollbar
    //                     width in order to avoid having a horizontal scrollbar
    // second case: Bootstrap modals are not centered below 768px
    if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
      width = 'auto';
    }

    // the modal height cannot be larger than the window height
    if (height >= dimensions.windowHeight) {
      height = 'auto';
    }

    return {
      'width': width,
      'height': height
    };
  };

  /**
   * @param    {*} image An element in the array of images.
   * @return   {Boolean} Whether the provided element is a video.
   * @type     {Function}
   * @name     isVideo
   * @memberOf bootstrapLightbox.Lightbox
   */
  this.isVideo = function (image) {
    if (typeof image === 'object' && image && image.type) {
      return image.type === 'video';
    }

    return false;
  };

  /**
   * @param    {*} image An element in the array of images.
   * @return   {Boolean} Whether the provided element is a video that is to be
   *   embedded with an external service like YouTube. By default, this is
   *   determined by the url not ending in `.mp4`, `.ogg`, or `.webm`.
   * @type     {Function}
   * @name     isSharedVideo
   * @memberOf bootstrapLightbox.Lightbox
   */
  this.isSharedVideo = function (image) {
    return this.isVideo(image) &&
      !this.getImageUrl(image).match(/\.(mp4|ogg|webm)$/);
  };

  this.$get = ['$document', '$injector', '$uibModal', '$timeout', 'ImageLoader',
      function ($document, $injector, $uibModal, $timeout, ImageLoader) {
    // optional dependency
    var cfpLoadingBar = $injector.has('cfpLoadingBar') ?
      $injector.get('cfpLoadingBar'): null;

    var Lightbox = {};

    /**
     * Array of all images to be shown in the lightbox (not `Image` objects).
     * @type     {Array}
     * @name     images
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.images = [];

    /**
     * The index in the `Lightbox.images` aray of the image that is currently
     *   shown in the lightbox.
     * @type     {Number}
     * @name     index
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.index = -1;

    // set the configurable properties and methods, the defaults of which are
    // defined above
    Lightbox.templateUrl = this.templateUrl;
    Lightbox.fullScreenMode = this.fullScreenMode;
    Lightbox.getImageUrl = this.getImageUrl;
    Lightbox.getImageCaption = this.getImageCaption;
    Lightbox.calculateImageDimensionLimits = this.calculateImageDimensionLimits;
    Lightbox.calculateModalDimensions = this.calculateModalDimensions;
    Lightbox.isVideo = this.isVideo;
    Lightbox.isSharedVideo = this.isSharedVideo;

    /**
     * Whether keyboard navigation is currently enabled for navigating through
     *   images in the lightbox.
     * @type     {Boolean}
     * @name     keyboardNavEnabled
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.keyboardNavEnabled = false;

    /**
     * The image currently shown in the lightbox.
     * @type     {*}
     * @name     image
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.image = {};

    /**
     * The UI Bootstrap modal instance. See {@link
     *   http://angular-ui.github.io/bootstrap/#/modal}.
     * @type     {Object}
     * @name     modalInstance
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.modalInstance = null;

    /**
     * The URL of the current image. This is a property of the service rather
     *   than of `Lightbox.image` because `Lightbox.image` need not be an
     *   object, and besides it would be poor practice to alter the given
     *   objects.
     * @type     {String}
     * @name     imageUrl
     * @memberOf bootstrapLightbox.Lightbox
     */

    /**
     * The optional caption of the current image.
     * @type     {String}
     * @name     imageCaption
     * @memberOf bootstrapLightbox.Lightbox
     */

    /**
     * Whether an image is currently being loaded.
     * @type     {Boolean}
     * @name     loading
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.loading = false;

    /**
     * Open the lightbox modal.
     * @param    {Array}  newImages An array of images. Each image may be of
     *   any type.
     * @param    {Number} newIndex  The index in `newImages` to set as the
     *   current image.
     * @param    {Object} modalParams  Custom params for the angular UI
     *   bootstrap modal (in $uibModal.open()).
     * @return   {Object} The created UI Bootstrap modal instance.
     * @type     {Function}
     * @name     openModal
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.openModal = function (newImages, newIndex, modalParams) {
      Lightbox.images = newImages;
      Lightbox.setImage(newIndex);

      // store the modal instance so we can close it manually if we need to
      Lightbox.modalInstance = $uibModal.open(angular.extend({
        'templateUrl': Lightbox.templateUrl,
        'controller': ['$scope', function ($scope) {
          // $scope is the modal scope, a child of $rootScope
          $scope.Lightbox = Lightbox;

          Lightbox.keyboardNavEnabled = true;
        }],
        'windowClass': 'lightbox-modal'
      }, modalParams || {}));

      // modal close handler
      Lightbox.modalInstance.result['finally'](function () {
        // prevent the lightbox from flickering from the old image when it gets
        // opened again
        Lightbox.images = [];
        Lightbox.index = 1;
        Lightbox.image = {};
        Lightbox.imageUrl = null;
        Lightbox.imageCaption = null;

        Lightbox.keyboardNavEnabled = false;

        // complete any lingering loading bar progress
        if (cfpLoadingBar) {
          cfpLoadingBar.complete();
        }
      });

      return Lightbox.modalInstance;
    };

    /**
     * Close the lightbox modal.
     * @param    {*} result This argument can be useful if the modal promise
     *   gets handler(s) attached to it.
     * @type     {Function}
     * @name     closeModal
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.closeModal = function (result) {
      return Lightbox.modalInstance.close(result);
    };

    /**
     * This method can be used in all methods which navigate/change the
     *   current image.
     * @param    {Number} newIndex The index in the array of images to set as
     *   the new current image.
     * @type     {Function}
     * @name     setImage
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.setImage = function (newIndex) {
      if (!(newIndex in Lightbox.images)) {
        throw 'Invalid image.';
      }

      // update the loading flag and start the loading bar
      Lightbox.loading = true;
      if (cfpLoadingBar) {
        cfpLoadingBar.start();
      }

      var image = Lightbox.images[newIndex];
      var imageUrl = Lightbox.getImageUrl(image);

      var success = function (properties) {
        // update service properties for the image
        properties = properties || {};
        Lightbox.index = properties.index || newIndex;
        Lightbox.image = properties.image || image;
        Lightbox.imageUrl = properties.imageUrl || imageUrl;
        Lightbox.imageCaption = properties.imageCaption ||
          Lightbox.getImageCaption(image);

        // restore the loading flag and complete the loading bar
        Lightbox.loading = false;
        if (cfpLoadingBar) {
          cfpLoadingBar.complete();
        }
      };

      if (!Lightbox.isVideo(image)) {
        // load the image before setting it, so everything in the view is
        // updated at the same time; otherwise, the previous image remains while
        // the current image is loading
        ImageLoader.load(imageUrl).then(function () {
          success();
        }, function () {
          success({
            'imageUrl': '#', // blank image
            // use the caption to show the user an error
            'imageCaption': 'Failed to load image'
          });
        });
      } else {
        success();
      }
    };

    /**
     * Navigate to the first image.
     * @type     {Function}
     * @name     firstImage
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.firstImage = function () {
      Lightbox.setImage(0);
    };

    /**
     * Navigate to the previous image.
     * @type     {Function}
     * @name     prevImage
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.prevImage = function () {
      Lightbox.setImage((Lightbox.index - 1 + Lightbox.images.length) %
        Lightbox.images.length);
    };

    /**
     * Navigate to the next image.
     * @type     {Function}
     * @name     nextImage
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.nextImage = function () {
      Lightbox.setImage((Lightbox.index + 1) % Lightbox.images.length);
    };

    /**
     * Navigate to the last image.
     * @type     {Function}
     * @name     lastImage
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.lastImage = function () {
      Lightbox.setImage(Lightbox.images.length - 1);
    };

    /**
     * Call this method to set both the array of images and the current image
     *   (based on the current index). A use case is when the image collection
     *   gets changed dynamically in some way while the lightbox is still
     *   open.
     * @param {Array} newImages The new array of images.
     * @type     {Function}
     * @name     setImages
     * @memberOf bootstrapLightbox.Lightbox
     */
    Lightbox.setImages = function (newImages) {
      Lightbox.images = newImages;
      Lightbox.setImage(Lightbox.index);
    };

    // Bind the left and right arrow keys for image navigation. This event
    // handler never gets unbinded. Disable this using the `keyboardNavEnabled`
    // flag. It is automatically disabled when the target is an input and or a
    // textarea. TODO: Move this to a directive.
    $document.bind('keydown', function (event) {
      if (!Lightbox.keyboardNavEnabled) {
        return;
      }

      // method of Lightbox to call
      var method = null;

      switch (event.which) {
      case 39: // right arrow key
        method = 'nextImage';
        break;
      case 37: // left arrow key
        method = 'prevImage';
        break;
      }

      if (method !== null && ['input', 'textarea'].indexOf(
          event.target.tagName.toLowerCase()) === -1) {
        // the view doesn't update without a manual digest
        $timeout(function () {
          Lightbox[method]();
        });

        event.preventDefault();
      }
    });

    return Lightbox;
  }];
});
/**
 * @class     lightboxSrc
 * @classdesc This attribute directive is used in an `<img>` element in the
 *   modal template in place of `src`. It handles resizing both the `<img>`
 *   element and its relevant parent elements within the modal.
 * @memberOf  bootstrapLightbox
 */
angular.module('bootstrapLightbox').directive('lightboxSrc', ['$window',
    'ImageLoader', 'Lightbox', function ($window, ImageLoader, Lightbox) {
  // Calculate the dimensions to display the image. The max dimensions override
  // the min dimensions if they conflict.
  var calculateImageDisplayDimensions = function (dimensions, fullScreenMode) {
    var w = dimensions.width;
    var h = dimensions.height;
    var minW = dimensions.minWidth;
    var minH = dimensions.minHeight;
    var maxW = dimensions.maxWidth;
    var maxH = dimensions.maxHeight;

    var displayW = w;
    var displayH = h;

    if (!fullScreenMode) {
      // resize the image if it is too small
      if (w < minW && h < minH) {
        // the image is both too thin and short, so compare the aspect ratios to
        // determine whether to min the width or height
        if (w / h > maxW / maxH) {
          displayH = minH;
          displayW = Math.round(w * minH / h);
        } else {
          displayW = minW;
          displayH = Math.round(h * minW / w);
        }
      } else if (w < minW) {
        // the image is too thin
        displayW = minW;
        displayH = Math.round(h * minW / w);
      } else if (h < minH) {
        // the image is too short
        displayH = minH;
        displayW = Math.round(w * minH / h);
      }

      // resize the image if it is too large
      if (w > maxW && h > maxH) {
        // the image is both too tall and wide, so compare the aspect ratios
        // to determine whether to max the width or height
        if (w / h > maxW / maxH) {
          displayW = maxW;
          displayH = Math.round(h * maxW / w);
        } else {
          displayH = maxH;
          displayW = Math.round(w * maxH / h);
        }
      } else if (w > maxW) {
        // the image is too wide
        displayW = maxW;
        displayH = Math.round(h * maxW / w);
      } else if (h > maxH) {
        // the image is too tall
        displayH = maxH;
        displayW = Math.round(w * maxH / h);
      }
    } else {
      // full screen mode
      var ratio = Math.min(maxW / w, maxH / h);

      var zoomedW = Math.round(w * ratio);
      var zoomedH = Math.round(h * ratio);

      displayW = Math.max(minW, zoomedW);
      displayH = Math.max(minH, zoomedH);
    }

    return {
      'width': displayW || 0,
      'height': displayH || 0 // NaN is possible when dimensions.width is 0
    };
  };

  // format the given dimension for passing into the `css()` method of `jqLite`
  var formatDimension = function (dimension) {
    return typeof dimension === 'number' ? dimension + 'px' : dimension;
  };

  // the dimensions of the image
  var imageWidth = 0;
  var imageHeight = 0;

  return {
    'link': function (scope, element, attrs) {
      // resize the img element and the containing modal
      var resize = function () {
        // get the window dimensions
        var windowWidth = $window.innerWidth;
        var windowHeight = $window.innerHeight;

        // calculate the max/min dimensions for the image
        var imageDimensionLimits = Lightbox.calculateImageDimensionLimits({
          'windowWidth': windowWidth,
          'windowHeight': windowHeight,
          'imageWidth': imageWidth,
          'imageHeight': imageHeight
        });

        // calculate the dimensions to display the image
        var imageDisplayDimensions = calculateImageDisplayDimensions(
          angular.extend({
            'width': imageWidth,
            'height': imageHeight,
            'minWidth': 1,
            'minHeight': 1,
            'maxWidth': 3000,
            'maxHeight': 3000,
          }, imageDimensionLimits),
          Lightbox.fullScreenMode
        );

        // calculate the dimensions of the modal container
        var modalDimensions = Lightbox.calculateModalDimensions({
          'windowWidth': windowWidth,
          'windowHeight': windowHeight,
          'imageDisplayWidth': imageDisplayDimensions.width,
          'imageDisplayHeight': imageDisplayDimensions.height
        });

        // resize the image
        element.css({
          'width': imageDisplayDimensions.width + 'px',
          'height': imageDisplayDimensions.height + 'px'
        });

        // setting the height on .modal-dialog does not expand the div with the
        // background, which is .modal-content
        angular.element(
          document.querySelector('.lightbox-modal .modal-dialog')
        ).css({
          'width': formatDimension(modalDimensions.width)
        });

        // .modal-content has no width specified; if we set the width on
        // .modal-content and not on .modal-dialog, .modal-dialog retains its
        // default width of 600px and that places .modal-content off center
        angular.element(
          document.querySelector('.lightbox-modal .modal-content')
        ).css({
          'height': formatDimension(modalDimensions.height)
        });
      };

      // load the new image and/or resize the video whenever the attr changes
      scope.$watch(function () {
        return attrs.lightboxSrc;
      }, function (src) {
        // do nothing if there's no image
        if (!Lightbox.image) {
          return;
        }

        if (!Lightbox.isVideo(Lightbox.image)) { // image
          // blank the image before resizing the element
          element[0].src = '#';

          // handle failure to load the image
          var failure = function () {
            imageWidth = 0;
            imageHeight = 0;

            resize();
          };

          if (src) {
            ImageLoader.load(src).then(function (image) {
              // these variables must be set before resize(), as they are used
              // in it
              imageWidth = image.naturalWidth;
              imageHeight = image.naturalHeight;

              // resize the img element and the containing modal
              resize();

              // show the image
              element[0].src = src;
            }, failure);
          } else {
            failure();
          }
        } else { // video
          // default dimensions
          imageWidth = 1280;
          imageHeight = 720;

          // resize the video element and the containing modal
          resize();

          // the src attribute applies to `<video>` and not `<embed-video>`
          element[0].src = src;
        }
      });

      // resize the image and modal whenever the window gets resized
      angular.element($window).on('resize', resize);
    }
  };
}]);
