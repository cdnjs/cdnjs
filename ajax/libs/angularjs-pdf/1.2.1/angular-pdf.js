/*! Angular-PDF Version: 1.2.1 | (C) Sayanee Basu 2015, released under an MIT license */
(function() {

  'use strict';

  angular.module('pdf', []).directive('ngPdf', [ '$window', function($window) {
    var backingScale = function(canvas) {
      var ctx = canvas.getContext('2d');
      var dpr = window.devicePixelRatio || 1;
      var bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

      return dpr / bsr;
    };

    var setCanvasDimensions = function(canvas, w, h) {
      var ratio = backingScale(canvas);
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      canvas.style.width = Math.floor(w) + 'px';
      canvas.style.height = Math.floor(h) + 'px';
      canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
      return canvas;
    };
    return {
      restrict: 'E',
      templateUrl: function(element, attr) {
        return attr.templateUrl ? attr.templateUrl : 'partials/viewer.html'
      },
      link: function(scope, element, attrs) {
        var url = scope.pdfUrl;
        var pdfDoc = null
        var pageNum = (attrs.page ? attrs.page : 1);
        var scale = attrs.scale > 0 ? attrs.scale : 1;
        var canvas = (attrs.canvasid ? document.getElementById(attrs.canvasid) : document.getElementById('pdf-canvas'));
        var ctx = canvas.getContext('2d');
        var windowEl = angular.element($window);

        windowEl.on('scroll', function() {
          scope.$apply(function() {
            scope.scroll = windowEl[0].scrollY;
          });
        });

        PDFJS.disableWorker = true;
        scope.pageNum = pageNum;

        scope.renderPage = function(num) {
          pdfDoc.getPage(num).then(function(page) {
            var viewport;
            var pageWidthScale;
            var pageHeightScale;
            var renderContext = {};
            var pageRendering;

            if (attrs.scale === 'page-fit' && !scale) {
              viewport = page.getViewport(1);
              pageWidthScale = element[0].clientWidth / viewport.width;
              pageHeightScale = element[0].clientHeight / viewport.height;
              scale = Math.min(pageWidthScale, pageHeightScale);
            } else {
              viewport = page.getViewport(scale)
            }

            setCanvasDimensions(canvas, viewport.width, viewport.height);

            renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };

            page.render(renderContext).promise.then(function() {
              if (typeof scope.onPageRender === 'function' ) {
                scope.onPageRender();
              }
            });
          });
        };

        scope.goPrevious = function() {
          if (scope.pageToDisplay <= 1) {
            return;
          }
          scope.pageNum = parseInt(scope.pageNum) - 1;
        };

        scope.goNext = function() {
          if (scope.pageToDisplay >= pdfDoc.numPages) {
            return;
          }
          scope.pageNum = parseInt(scope.pageNum) + 1;
        };

        scope.zoomIn = function() {
          scale = parseFloat(scale) + 0.2;
          scope.renderPage(scope.pageToDisplay);
          return scale;
        };

        scope.zoomOut = function() {
          scale = parseFloat(scale) - 0.2;
          scope.renderPage(scope.pageToDisplay);
          return scale;
        };

        scope.changePage = function() {
          scope.renderPage(scope.pageToDisplay);
        };

        scope.rotate = function() {
          if (canvas.getAttribute('class') === 'rotate0') {
            canvas.setAttribute('class', 'rotate90');
          } else if (canvas.getAttribute('class') === 'rotate90') {
            canvas.setAttribute('class', 'rotate180');
          } else if (canvas.getAttribute('class') === 'rotate180') {
            canvas.setAttribute('class', 'rotate270');
          } else {
            canvas.setAttribute('class', 'rotate0');
          }
        };

        function renderPDF() {
          if (url && url.length) {
            PDFJS.getDocument(url, null, null, scope.onProgress).then(
                function(_pdfDoc) {
                  if (typeof scope.onLoad === 'function') {
                    scope.onLoad();
                  }

                  pdfDoc = _pdfDoc;
                  scope.renderPage(scope.pageToDisplay);

                  scope.$apply(function() {
                    scope.pageCount = _pdfDoc.numPages;
                  });
                }, function(error) {
                  if (error) {
                    if (typeof scope.onError === 'function') {
                      scope.onError(error);
                    }
                  }
                }
            );
          }
        }

        scope.$watch('pageNum', function(newVal) {
          scope.pageToDisplay = parseInt(newVal);
          if (pdfDoc !== null) {
            scope.renderPage(scope.pageToDisplay);
          }
        });

        scope.$watch('pdfUrl', function(newVal) {
          if (newVal !== '') {
            console.log('pdfUrl value change detected: ', scope.pdfUrl);
            url = newVal;
            scope.pageToDisplay = 1;
            renderPDF();
          }
        });

      }
    };
  } ]);

})();
