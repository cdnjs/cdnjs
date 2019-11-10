angular.module('angular-img-cropper', []).directive("imageCropper", ['$document', '$window', 'imageCropperDataShare', function ($document, $window, imageCropperDataShare) {
    return {
        scope: {
            image: "=",
            croppedImage: "=",
            cropWidth: "=",
            cropHeight: "=",
            keepAspect: "=",
            touchRadius: "=",
            cropAreaBounds: "=",
            minWidth: "=",
            minHeight: "="
        },
        restrict: "A",
        link: function (scope, element) {
            var crop;
            var __extends = __extends || function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }

                    __.prototype = b.prototype;
                    d.prototype = new __();
                };

            var Handle = (function () {
                function Handle(x, y, radius) {
                    this.over = false;
                    this.drag = false;
                    this.position = new Point(x, y);
                    this.offset = new Point(0, 0);
                    this.radius = radius;
                }

                Handle.prototype.setDrag = function (value) {
                    this.drag = value;
                    this.setOver(value);
                };
                Handle.prototype.draw = function (ctx) {
                };
                Handle.prototype.setOver = function (over) {
                    this.over = over;
                };
                Handle.prototype.touchInBounds = function (x, y) {
                    return (x > this.position.x - this.radius && x < this.position.x + this.radius && y > this.position.y - this.radius && y < this.position.y + this.radius);
                };
                Handle.prototype.getPosition = function () {
                    return this.position;
                };
                Handle.prototype.setPosition = function (x, y) {
                    this.position.x = x;
                    this.position.y = y;
                };
                return Handle;
            })();
            var PointPool = (function () {
                function PointPool(inst) {
                    this.borrowed = 0; //for debugging
                    PointPool.instance = this;
                    var prev = null;
                    for (var i = 0; i < inst; i++) {
                        if (i === 0) {
                            this.firstAvailable = new Point();
                            prev = this.firstAvailable;
                        }
                        else {
                            var p = new Point();
                            prev.setNext(p);
                            prev = p;
                        }
                    }
                }

                PointPool.prototype.borrow = function (x, y) {
                    if (this.firstAvailable == null) {
                        throw "Pool exhausted";
                    }
                    this.borrowed++;
                    var p = this.firstAvailable;
                    this.firstAvailable = p.getNext();
                    p.x = x;
                    p.y = y;
                    return p;
                };
                PointPool.prototype.returnPoint = function (p) {
                    this.borrowed--;
                    p.x = 0;
                    p.y = 0;
                    p.setNext(this.firstAvailable);
                    this.firstAvailable = p;
                };
                return PointPool;
            })();
            var CropService = (function () {
                function CropService() {
                }

                CropService.init = function (canvas) {
                    this.canvas = canvas;
                    this.ctx = this.canvas.getContext("2d");
                };
                CropService.DEG2RAD = 0.0174532925;
                return CropService;
            })();
            var DragMarker = (function (_super) {
                __extends(DragMarker, _super);
                function DragMarker(x, y, radius) {
                    _super.call(this, x, y, radius);
                    this.iconPoints = new Array();
                    this.scaledIconPoints = new Array();
                    this.getDragIconPoints(this.iconPoints, 1);
                    this.getDragIconPoints(this.scaledIconPoints, 1.2);
                }

                DragMarker.prototype.draw = function (ctx) {
                    if (this.over || this.drag) {
                        this.drawIcon(ctx, this.scaledIconPoints);
                    }
                    else {
                        this.drawIcon(ctx, this.iconPoints);
                    }
                };
                DragMarker.prototype.getDragIconPoints = function (arr, scale) {
                    var maxLength = 17 * scale;
                    var arrowWidth = 14 * scale;
                    var arrowLength = 8 * scale;
                    var connectorThroat = 4 * scale;
                    arr.push(PointPool.instance.borrow(-connectorThroat / 2, maxLength - arrowLength));
                    arr.push(PointPool.instance.borrow(-arrowWidth / 2, maxLength - arrowLength));
                    arr.push(PointPool.instance.borrow(0, maxLength));
                    arr.push(PointPool.instance.borrow(arrowWidth / 2, maxLength - arrowLength));
                    arr.push(PointPool.instance.borrow(connectorThroat / 2, maxLength - arrowLength));
                    arr.push(PointPool.instance.borrow(connectorThroat / 2, connectorThroat / 2));
                    arr.push(PointPool.instance.borrow(maxLength - arrowLength, connectorThroat / 2));
                    arr.push(PointPool.instance.borrow(maxLength - arrowLength, arrowWidth / 2));
                    arr.push(PointPool.instance.borrow(maxLength, 0));
                    arr.push(PointPool.instance.borrow(maxLength - arrowLength, -arrowWidth / 2));
                    arr.push(PointPool.instance.borrow(maxLength - arrowLength, -connectorThroat / 2));
                    arr.push(PointPool.instance.borrow(connectorThroat / 2, -connectorThroat / 2));
                    arr.push(PointPool.instance.borrow(connectorThroat / 2, -maxLength + arrowLength));
                    arr.push(PointPool.instance.borrow(arrowWidth / 2, -maxLength + arrowLength));
                    arr.push(PointPool.instance.borrow(0, -maxLength));
                    arr.push(PointPool.instance.borrow(-arrowWidth / 2, -maxLength + arrowLength));
                    arr.push(PointPool.instance.borrow(-connectorThroat / 2, -maxLength + arrowLength));
                    arr.push(PointPool.instance.borrow(-connectorThroat / 2, -connectorThroat / 2));
                    arr.push(PointPool.instance.borrow(-maxLength + arrowLength, -connectorThroat / 2));
                    arr.push(PointPool.instance.borrow(-maxLength + arrowLength, -arrowWidth / 2));
                    arr.push(PointPool.instance.borrow(-maxLength, 0));
                    arr.push(PointPool.instance.borrow(-maxLength + arrowLength, arrowWidth / 2));
                    arr.push(PointPool.instance.borrow(-maxLength + arrowLength, connectorThroat / 2));
                    arr.push(PointPool.instance.borrow(-connectorThroat / 2, connectorThroat / 2));
                };
                DragMarker.prototype.drawIcon = function (ctx, points) {
                    ctx.beginPath();
                    ctx.moveTo(points[0].x + this.position.x, points[0].y + this.position.y);
                    for (var k = 0; k < points.length; k++) {
                        var p = points[k];
                        ctx.lineTo(p.x + this.position.x, p.y + this.position.y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = 'rgba(255,228,0,1)';
                    ctx.fill();
                };
                DragMarker.prototype.recalculatePosition = function (bounds) {
                    var c = bounds.getCentre();
                    this.setPosition(c.x, c.y);
                    PointPool.instance.returnPoint(c);
                };
                return DragMarker;
            })(Handle);
            var CornerMarker = (function (_super) {
                __extends(CornerMarker, _super);
                function CornerMarker(x, y, radius) {
                    _super.call(this, x, y, radius);
                }

                CornerMarker.prototype.drawCornerBorder = function (ctx) {
                    var sideLength = 10;
                    if (this.over || this.drag) {
                        sideLength = 12;
                    }
                    var hDirection = 1;
                    var vDirection = 1;
                    if (this.horizontalNeighbour.position.x < this.position.x) {
                        hDirection = -1;
                    }
                    if (this.verticalNeighbour.position.y < this.position.y) {
                        vDirection = -1;
                    }
                    ctx.beginPath();
                    ctx.lineJoin = "miter";
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y);
                    ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y + (sideLength * vDirection));
                    ctx.lineTo(this.position.x, this.position.y + (sideLength * vDirection));
                    ctx.lineTo(this.position.x, this.position.y);
                    ctx.closePath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'rgba(255,228,0,1)';
                    ctx.stroke();
                };
                CornerMarker.prototype.drawCornerFill = function (ctx) {
                    var sideLength = 10;
                    if (this.over || this.drag) {
                        sideLength = 12;
                    }
                    var hDirection = 1;
                    var vDirection = 1;
                    if (this.horizontalNeighbour.position.x < this.position.x) {
                        hDirection = -1;
                    }
                    if (this.verticalNeighbour.position.y < this.position.y) {
                        vDirection = -1;
                    }
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y);
                    ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y + (sideLength * vDirection));
                    ctx.lineTo(this.position.x, this.position.y + (sideLength * vDirection));
                    ctx.lineTo(this.position.x, this.position.y);
                    ctx.closePath();
                    ctx.fillStyle = 'rgba(0,0,0,1)';
                    ctx.fill();
                };
                CornerMarker.prototype.moveX = function (x) {
                    this.setPosition(x, this.position.y);
                };
                CornerMarker.prototype.moveY = function (y) {
                    this.setPosition(this.position.x, y);
                };
                CornerMarker.prototype.move = function (x, y) {
                    this.setPosition(x, y);
                    this.verticalNeighbour.moveX(x);
                    this.horizontalNeighbour.moveY(y);
                };
                CornerMarker.prototype.addHorizontalNeighbour = function (neighbour) {
                    this.horizontalNeighbour = neighbour;
                };
                CornerMarker.prototype.addVerticalNeighbour = function (neighbour) {
                    this.verticalNeighbour = neighbour;
                };
                CornerMarker.prototype.getHorizontalNeighbour = function () {
                    return this.horizontalNeighbour;
                };
                CornerMarker.prototype.getVerticalNeighbour = function () {
                    return this.verticalNeighbour;
                };
                CornerMarker.prototype.draw = function (ctx) {
                    this.drawCornerFill(ctx);
                    this.drawCornerBorder(ctx);
                };
                return CornerMarker;
            })(Handle);
            var Bounds = (function () {
                function Bounds(x, y, width, height) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (width === void 0) {
                        width = 0;
                    }
                    if (height === void 0) {
                        height = 0;
                    }
                    this.left = x;
                    this.right = x + width;
                    this.top = y;
                    this.bottom = y + height;
                }

                Bounds.prototype.getWidth = function () {
                    return this.right - this.left;
                };
                Bounds.prototype.getHeight = function () {
                    return this.bottom - this.top;
                };
                Bounds.prototype.getCentre = function () {
                    var w = this.getWidth();
                    var h = this.getHeight();
                    return PointPool.instance.borrow(this.left + (w / 2), this.top + (h / 2));
                };
                return Bounds;
            })();
            var Point = (function () {
                function Point(x, y) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    this.x = x;
                    this.y = y;
                }

                Point.prototype.setNext = function (p) {
                    this.next = p;
                };
                Point.prototype.getNext = function () {
                    return this.next;
                };
                return Point;
            })();
            var CropTouch = (function () {
                function CropTouch(x, y, id) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (id === void 0) {
                        id = 0;
                    }
                    this.id = 0;
                    this.x = x;
                    this.y = y;
                    this.id = id;
                }

                return CropTouch;
            })();
            var ImageCropper = (function () {
                function ImageCropper(canvas, x, y, width, height, keepAspect, touchRadius) {
                    if (x === void 0) {
                        x = 0;
                    }
                    if (y === void 0) {
                        y = 0;
                    }
                    if (width === void 0) {
                        width = 100;
                    }
                    if (height === void 0) {
                        height = 50;
                    }
                    if (keepAspect === void 0) {
                        keepAspect = true;
                    }
                    if (touchRadius === void 0) {
                        touchRadius = 20;
                    }
                    this.keepAspect = false;
                    this.aspectRatio = 0;
                    this.currentDragTouches = new Array();
                    this.isMouseDown = false;
                    this.ratioW = 1;
                    this.ratioH = 1;
                    this.fileType = 'png';
                    this.imageSet = false;
                    this.pointPool = new PointPool(200);
                    CropService.init(canvas);
                    this.buffer = document.createElement('canvas');
                    this.cropCanvas = document.createElement('canvas');
                    this.buffer.width = canvas.width;
                    this.buffer.height = canvas.height;
                    this.tl = new CornerMarker(x, y, touchRadius);
                    this.tr = new CornerMarker(x + width, y, touchRadius);
                    this.bl = new CornerMarker(x, y + height, touchRadius);
                    this.br = new CornerMarker(x + width, y + height, touchRadius);
                    this.tl.addHorizontalNeighbour(this.tr);
                    this.tl.addVerticalNeighbour(this.bl);
                    this.tr.addHorizontalNeighbour(this.tl);
                    this.tr.addVerticalNeighbour(this.br);
                    this.bl.addHorizontalNeighbour(this.br);
                    this.bl.addVerticalNeighbour(this.tl);
                    this.br.addHorizontalNeighbour(this.bl);
                    this.br.addVerticalNeighbour(this.tr);
                    this.markers = [this.tl, this.tr, this.bl, this.br];
                    this.center = new DragMarker(x + (width / 2), y + (height / 2), touchRadius);
                    this.canvas = canvas;
                    this.ctx = this.canvas.getContext("2d");
                    this.keepAspect = keepAspect;
                    this.aspectRatio = height / width;
                    this.draw(this.ctx);
                    this.croppedImage = new Image();
                    this.currentlyInteracting = false;
                    window.addEventListener('mousemove', this.onMouseMove.bind(this));
                    window.addEventListener('mouseup', this.onMouseUp.bind(this));
                    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
                    window.addEventListener('touchmove', this.onTouchMove.bind(this), false);
                    canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
                    window.addEventListener('touchend', this.onTouchEnd.bind(this), false);
                }

                ImageCropper.prototype.resizeCanvas = function (width, height) {
                    this.canvas.width = width;
                    this.canvas.height = height;
                    this.buffer.width = width;
                    this.buffer.height = height;
                    this.draw(this.ctx);
                };
                ImageCropper.prototype.draw = function (ctx) {
                    var bounds = this.getBounds();
                    if (this.srcImage) {
                        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                        var sourceAspect = this.srcImage.height / this.srcImage.width;
                        var canvasAspect = this.canvasHeight / this.canvasWidth;
                        var w = this.canvasWidth;
                        var h = this.canvasHeight;
                        if (canvasAspect > sourceAspect) {
                            w = this.canvasWidth;
                            h = this.canvasWidth * sourceAspect;
                        }
                        else {
                            h = this.canvasHeight;
                            w = this.canvasHeight / sourceAspect;
                        }
                        this.ratioW = w / this.srcImage.width;
                        this.ratioH = h / this.srcImage.height;
                        if (canvasAspect < sourceAspect) {
                            this.drawImageIOSFix(ctx, this.srcImage, 0, 0, this.srcImage.width, this.srcImage.height, this.buffer.width / 2 - w / 2, 0, w, h);
                        }
                        else {
                            this.drawImageIOSFix(ctx, this.srcImage, 0, 0, this.srcImage.width, this.srcImage.height, 0, this.buffer.height / 2 - h / 2, w, h);
                        }
                        this.buffer.getContext('2d').drawImage(this.canvas, 0, 0, this.canvasWidth, this.canvasHeight);
                        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                        ctx.drawImage(this.buffer, bounds.left, bounds.top, Math.max(bounds.getWidth(), 1), Math.max(bounds.getHeight(), 1), bounds.left, bounds.top, bounds.getWidth(), bounds.getHeight());
                        var marker;
                        for (var i = 0; i < this.markers.length; i++) {
                            marker = this.markers[i];
                            marker.draw(ctx);
                        }
                        this.center.draw(ctx);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = 'rgba(255,228,0,1)';
                        ctx.strokeRect(bounds.left, bounds.top, bounds.getWidth(), bounds.getHeight());
                    }
                    else {
                        ctx.fillStyle = 'rgba(192,192,192,1)';
                        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                    }
                };
                ImageCropper.prototype.dragCrop = function (x, y, marker) {
                    var bounds = this.getBounds();
                    var left = x - (bounds.getWidth() / 2);
                    var right = x + (bounds.getWidth() / 2);
                    var top = y - (bounds.getHeight() / 2);
                    var bottom = y + (bounds.getHeight() / 2);
                    if (right >= this.maxXClamp) {
                        x = this.maxXClamp - bounds.getWidth() / 2;
                    }
                    if (left <= this.minXClamp) {
                        x = bounds.getWidth() / 2 + this.minXClamp;
                    }
                    if (top < this.minYClamp) {
                        y = bounds.getHeight() / 2 + this.minYClamp;
                    }
                    if (bottom >= this.maxYClamp) {
                        y = this.maxYClamp - bounds.getHeight() / 2;
                    }
                    this.tl.moveX(x - (bounds.getWidth() / 2));
                    this.tl.moveY(y - (bounds.getHeight() / 2));
                    this.tr.moveX(x + (bounds.getWidth() / 2));
                    this.tr.moveY(y - (bounds.getHeight() / 2));
                    this.bl.moveX(x - (bounds.getWidth() / 2));
                    this.bl.moveY(y + (bounds.getHeight() / 2));
                    this.br.moveX(x + (bounds.getWidth() / 2));
                    this.br.moveY(y + (bounds.getHeight() / 2));
                    marker.setPosition(x, y);

                    if (scope.cropAreaBounds && this.imageSet) {
                        scope.cropAreaBounds = this.getCropBounds();
                        scope.$apply();
                    }
                };

                ImageCropper.prototype.enforceMinSize = function (x, y, marker) {

                    var xLength = x - marker.getHorizontalNeighbour().getPosition().x;
                    var yLength = y - marker.getVerticalNeighbour().getPosition().y;
                    var xOver = scope.minWidth - Math.abs(xLength);
                    var yOver = scope.minHeight - Math.abs(yLength);

                    if (xLength == 0 || yLength == 0) {
                        x = marker.getPosition().x;
                        y = marker.getPosition().y;

                        return PointPool.instance.borrow(x, y);
                    }

                    if(scope.keepAspect) {
                        if (xOver > 0 && (yOver / this.aspectRatio) > 0) {
                            if (xOver > (yOver / this.aspectRatio)) {
                                if (xLength < 0) {
                                    x -= xOver;

                                    if (yLength < 0) {
                                        y -= xOver * this.aspectRatio;
                                    }
                                    else {
                                        y += xOver * this.aspectRatio;
                                    }
                                }
                                else {
                                    x += xOver;
                                    if (yLength < 0) {
                                        y -= xOver * this.aspectRatio;
                                    }
                                    else {
                                        y += xOver * this.aspectRatio;
                                    }
                                }
                            }
                            else {
                                if (yLength < 0) {
                                    y -= yOver;

                                    if (xLength < 0) {
                                        x -= yOver / this.aspectRatio;
                                    }
                                    else {
                                        x += yOver / this.aspectRatio;
                                    }

                                }
                                else {
                                    y += yOver;
                                    if (xLength < 0) {
                                        x -= yOver / this.aspectRatio;
                                    }
                                    else {
                                        x += yOver / this.aspectRatio;
                                    }
                                }
                            }
                        }
                        else {
                            if (xOver > 0) {
                                if (xLength < 0) {
                                    x -= xOver;

                                    if (yLength < 0) {
                                        y -= xOver * this.aspectRatio;
                                    }
                                    else {
                                        y += xOver * this.aspectRatio;
                                    }
                                }
                                else {
                                    x += xOver;
                                    if (yLength < 0) {
                                        y -= xOver * this.aspectRatio;
                                    }
                                    else {
                                        y += xOver * this.aspectRatio;
                                    }
                                }
                            }
                            else if (yOver > 0) {
                                if (yLength < 0) {
                                    y -= yOver;

                                    if (xLength < 0) {
                                        x -= yOver / this.aspectRatio;
                                    }
                                    else {
                                        x += yOver / this.aspectRatio;
                                    }
                                }
                                else {
                                    y += yOver;
                                    if (xLength < 0) {
                                        x -= yOver / this.aspectRatio;
                                    }
                                    else {
                                        x += yOver / this.aspectRatio;
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        if(xOver > 0)
                        {
                            if (xLength < 0) {
                                x -= xOver;
                            }
                            else {
                                x += xOver;
                            }
                        }
                        if(yOver > 0)
                        {
                            if (yLength < 0) {
                                y -= yOver;
                            }
                            else {
                                y += yOver;
                            }
                        }
                    }

                    if (x < this.minXClamp || x > this.maxXClamp || y < this.minYClamp || y > this.maxYClamp) {
                        x = marker.getPosition().x;
                        y = marker.getPosition().y;
                    }

                    return PointPool.instance.borrow(x, y);
                };
                ImageCropper.prototype.dragCorner = function (x, y, marker) {
                    var iX = 0;
                    var iY = 0;
                    var ax = 0;
                    var ay = 0;
                    var newHeight = 0;
                    var newWidth = 0;
                    var newY = 0;
                    var newX = 0;
                    var anchorMarker;
                    var fold = 0;


                    if (scope.keepAspect) {
                        anchorMarker = marker.getHorizontalNeighbour().getVerticalNeighbour();
                        ax = anchorMarker.getPosition().x;
                        ay = anchorMarker.getPosition().y;
                        if (x <= anchorMarker.getPosition().x) {
                            if (y <= anchorMarker.getPosition().y) {
                                iX = ax - (100 / this.aspectRatio);
                                iY = ay - (100 / this.aspectRatio * this.aspectRatio);
                                fold = this.getSide(PointPool.instance.borrow(iX, iY), anchorMarker.getPosition(), PointPool.instance.borrow(x, y));
                                if (fold > 0) {
                                    newHeight = Math.abs(anchorMarker.getPosition().y - y);
                                    newWidth = newHeight / this.aspectRatio;
                                    newY = anchorMarker.getPosition().y - newHeight;
                                    newX = anchorMarker.getPosition().x - newWidth;
                                    var min = this.enforceMinSize(newX, newY, marker);
                                    marker.move(min.x, min.y);
                                    PointPool.instance.returnPoint(min);
                                }
                                else if (fold < 0) {
                                    newWidth = Math.abs(anchorMarker.getPosition().x - x);
                                    newHeight = newWidth * this.aspectRatio;
                                    newY = anchorMarker.getPosition().y - newHeight;
                                    newX = anchorMarker.getPosition().x - newWidth;
                                    var min = this.enforceMinSize(newX, newY, marker);
                                    marker.move(min.x, min.y);
                                    PointPool.instance.returnPoint(min);
                                }
                            }
                            else {
                                iX = ax - (100 / this.aspectRatio);
                                iY = ay + (100 / this.aspectRatio * this.aspectRatio);
                                fold = this.getSide(PointPool.instance.borrow(iX, iY), anchorMarker.getPosition(), PointPool.instance.borrow(x, y));
                                if (fold > 0) {
                                    newWidth = Math.abs(anchorMarker.getPosition().x - x);
                                    newHeight = newWidth * this.aspectRatio;
                                    newY = anchorMarker.getPosition().y + newHeight;
                                    newX = anchorMarker.getPosition().x - newWidth;
                                    var min = this.enforceMinSize(newX, newY, marker);
                                    marker.move(min.x, min.y);
                                    PointPool.instance.returnPoint(min);
                                }
                                else if (fold < 0) {
                                    newHeight = Math.abs(anchorMarker.getPosition().y - y);
                                    newWidth = newHeight / this.aspectRatio;
                                    newY = anchorMarker.getPosition().y + newHeight;
                                    newX = anchorMarker.getPosition().x - newWidth;
                                    var min = this.enforceMinSize(newX, newY, marker);
                                    marker.move(min.x, min.y);
                                    PointPool.instance.returnPoint(min);
                                }
                            }
                        }
                        else {
                            if (y <= anchorMarker.getPosition().y) {
                                iX = ax + (100 / this.aspectRatio);
                                iY = ay - (100 / this.aspectRatio * this.aspectRatio);
                                fold = this.getSide(PointPool.instance.borrow(iX, iY), anchorMarker.getPosition(), PointPool.instance.borrow(x, y));
                                if (fold < 0) {
                                    newHeight = Math.abs(anchorMarker.getPosition().y - y);
                                    newWidth = newHeight / this.aspectRatio;
                                    newY = anchorMarker.getPosition().y - newHeight;
                                    newX = anchorMarker.getPosition().x + newWidth;
                                    var min = this.enforceMinSize(newX, newY, marker);
                                    marker.move(min.x, min.y);
                                    PointPool.instance.returnPoint(min);
                                }
                                else if (fold > 0) {
                                    newWidth = Math.abs(anchorMarker.getPosition().x - x);
                                    newHeight = newWidth * this.aspectRatio;
                                    newY = anchorMarker.getPosition().y - newHeight;
                                    newX = anchorMarker.getPosition().x + newWidth;
                                    var min = this.enforceMinSize(newX, newY, marker);
                                    marker.move(min.x, min.y);
                                    PointPool.instance.returnPoint(min);
                                }
                            }
                            else {
                                iX = ax + (100 / this.aspectRatio);
                                iY = ay + (100 / this.aspectRatio * this.aspectRatio);
                                fold = this.getSide(PointPool.instance.borrow(iX, iY), anchorMarker.getPosition(), PointPool.instance.borrow(x, y));
                                if (fold < 0) {
                                    newWidth = Math.abs(anchorMarker.getPosition().x - x);
                                    newHeight = newWidth * this.aspectRatio;
                                    newY = anchorMarker.getPosition().y + newHeight;
                                    newX = anchorMarker.getPosition().x + newWidth;
                                    var min = this.enforceMinSize(newX, newY, marker);
                                    marker.move(min.x, min.y);
                                    PointPool.instance.returnPoint(min);
                                }
                                else if (fold > 0) {
                                    newHeight = Math.abs(anchorMarker.getPosition().y - y);
                                    newWidth = newHeight / this.aspectRatio;
                                    newY = anchorMarker.getPosition().y + newHeight;
                                    newX = anchorMarker.getPosition().x + newWidth;
                                    var min = this.enforceMinSize(newX, newY, marker);
                                    marker.move(min.x, min.y);
                                    PointPool.instance.returnPoint(min);
                                }
                            }
                        }
                    }
                    else {
                        var min = this.enforceMinSize(x, y, marker);
                        marker.move(min.x, min.y);
                        PointPool.instance.returnPoint(min);
                    }
                    this.center.recalculatePosition(this.getBounds());

                    if (scope.cropAreaBounds && this.imageSet) {
                        scope.cropAreaBounds = this.getCropBounds();
                        scope.$apply();
                    }
                };
                ImageCropper.prototype.getSide = function (a, b, c) {
                    var n = this.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
                    //TODO move the return of the pools to outside of this function
                    PointPool.instance.returnPoint(a);
                    PointPool.instance.returnPoint(c);
                    return n;
                };
                ImageCropper.prototype.sign = function (x) {
                    if (+x === x) {
                        return (x === 0) ? x : (x > 0) ? 1 : -1;
                    }
                    return NaN;
                };
                ImageCropper.prototype.handleRelease = function (newCropTouch) {

                    if (newCropTouch == null) {
                        return;
                    }
                    var index = 0;
                    for (var k = 0; k < this.currentDragTouches.length; k++) {
                        if (newCropTouch.id == this.currentDragTouches[k].id) {
                            this.currentDragTouches[k].dragHandle.setDrag(false);
                            newCropTouch.dragHandle = null;
                            index = k;
                        }
                    }
                    this.currentDragTouches.splice(index, 1);
                    this.draw(this.ctx);
                };
                ImageCropper.prototype.handleMove = function (newCropTouch) {
                    var matched = false;
                    for (var k = 0; k < this.currentDragTouches.length; k++) {
                        if (newCropTouch.id == this.currentDragTouches[k].id && this.currentDragTouches[k].dragHandle != null) {
                            var dragTouch = this.currentDragTouches[k];
                            var clampedPositions = this.clampPosition(newCropTouch.x - dragTouch.dragHandle.offset.x, newCropTouch.y - dragTouch.dragHandle.offset.y);
                            newCropTouch.x = clampedPositions.x;
                            newCropTouch.y = clampedPositions.y;
                            PointPool.instance.returnPoint(clampedPositions);
                            if (dragTouch.dragHandle instanceof CornerMarker) {
                                this.dragCorner(newCropTouch.x, newCropTouch.y, dragTouch.dragHandle);
                            }
                            else {
                                this.dragCrop(newCropTouch.x, newCropTouch.y, dragTouch.dragHandle);
                            }
                            this.currentlyInteracting = true;
                            matched = true;
                            imageCropperDataShare.setPressed(this.canvas);
                            break;
                        }
                    }
                    if (!matched) {
                        for (var i = 0; i < this.markers.length; i++) {
                            var marker = this.markers[i];
                            if (marker.touchInBounds(newCropTouch.x, newCropTouch.y)) {
                                newCropTouch.dragHandle = marker;
                                this.currentDragTouches.push(newCropTouch);
                                marker.setDrag(true);
                                newCropTouch.dragHandle.offset.x = newCropTouch.x - newCropTouch.dragHandle.getPosition().x;
                                newCropTouch.dragHandle.offset.y = newCropTouch.y - newCropTouch.dragHandle.getPosition().y;
                                this.dragCorner(newCropTouch.x - newCropTouch.dragHandle.offset.x, newCropTouch.y - newCropTouch.dragHandle.offset.y, newCropTouch.dragHandle);
                                break;
                            }
                        }
                        if (newCropTouch.dragHandle == null) {
                            if (this.center.touchInBounds(newCropTouch.x, newCropTouch.y)) {
                                newCropTouch.dragHandle = this.center;
                                this.currentDragTouches.push(newCropTouch);
                                newCropTouch.dragHandle.setDrag(true);
                                newCropTouch.dragHandle.offset.x = newCropTouch.x - newCropTouch.dragHandle.getPosition().x;
                                newCropTouch.dragHandle.offset.y = newCropTouch.y - newCropTouch.dragHandle.getPosition().y;
                                this.dragCrop(newCropTouch.x - newCropTouch.dragHandle.offset.x, newCropTouch.y - newCropTouch.dragHandle.offset.y, newCropTouch.dragHandle);
                            }
                        }
                    }
                };
                ImageCropper.prototype.updateClampBounds = function () {
                    var sourceAspect = this.srcImage.height / this.srcImage.width;
                    var canvasAspect = this.canvas.height / this.canvas.width;
                    var w = this.canvas.width;
                    var h = this.canvas.height;
                    if (canvasAspect > sourceAspect) {
                        w = this.canvas.width;
                        h = this.canvas.width * sourceAspect;
                    }
                    else {
                        h = this.canvas.height;
                        w = this.canvas.height / sourceAspect;
                    }
                    this.minXClamp = this.canvas.width / 2 - w / 2;
                    this.minYClamp = this.canvas.height / 2 - h / 2;
                    this.maxXClamp = this.canvas.width / 2 + w / 2;
                    this.maxYClamp = this.canvas.height / 2 + h / 2;
                };
                ImageCropper.prototype.getCropBounds = function () {
                    var h = this.canvas.height - (this.minYClamp * 2);
                    var bounds = this.getBounds();
                    bounds.top = Math.round((h - bounds.top + this.minYClamp) / this.ratioH);
                    bounds.bottom = Math.round((h - bounds.bottom + this.minYClamp) / this.ratioH);
                    bounds.left = Math.round((bounds.left - this.minXClamp) / this.ratioW);
                    bounds.right = Math.round((bounds.right - this.minXClamp) / this.ratioW);
                    return bounds;
                };
                ImageCropper.prototype.clampPosition = function (x, y) {
                    if (x < this.minXClamp) {
                        x = this.minXClamp;
                    }
                    if (x > this.maxXClamp) {
                        x = this.maxXClamp;
                    }
                    if (y < this.minYClamp) {
                        y = this.minYClamp;
                    }
                    if (y > this.maxYClamp) {
                        y = this.maxYClamp;
                    }
                    return PointPool.instance.borrow(x, y);
                };
                ImageCropper.prototype.isImageSet = function () {
                    return this.imageSet;
                };
                ImageCropper.prototype.setImage = function (img) {
                    if (!img) {
                        throw "Image is null";
                    }
                    this.imageSet = true;
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    var bufferContext = this.buffer.getContext('2d');
                    bufferContext.clearRect(0, 0, this.buffer.width, this.buffer.height);
                    var splitName = img.src.split('.');
                    var fileType = splitName[1];
                    if (fileType == 'png' || fileType == 'jpg') {
                        this.fileType = fileType;
                    }
                    this.srcImage = img;
                    this.updateClampBounds();
                    var sourceAspect = this.srcImage.height / this.srcImage.width;
                    var cropBounds = this.getBounds();
                    var cropAspect = cropBounds.getHeight() / cropBounds.getWidth();
                    var w = this.canvas.width;
                    var h = this.canvas.height;
                    this.canvasWidth = w;
                    this.canvasHeight = h;
                    var cX = this.canvas.width / 2;
                    var cY = this.canvas.height / 2;
                    var tlPos = PointPool.instance.borrow(cX - cropBounds.getWidth() / 2, cY + cropBounds.getHeight() / 2);
                    var trPos = PointPool.instance.borrow(cX + cropBounds.getWidth() / 2, cY + cropBounds.getHeight() / 2);
                    var blPos = PointPool.instance.borrow(cX - cropBounds.getWidth() / 2, cY - cropBounds.getHeight() / 2);
                    var brPos = PointPool.instance.borrow(cX + cropBounds.getWidth() / 2, cY - cropBounds.getHeight() / 2);
                    this.tl.setPosition(tlPos.x, tlPos.y);
                    this.tr.setPosition(trPos.x, trPos.y);
                    this.bl.setPosition(blPos.x, blPos.y);
                    this.br.setPosition(brPos.x, brPos.y);
                    PointPool.instance.returnPoint(tlPos);
                    PointPool.instance.returnPoint(trPos);
                    PointPool.instance.returnPoint(blPos);
                    PointPool.instance.returnPoint(brPos);
                    this.center.setPosition(cX, cY);
                    if (cropAspect > sourceAspect) {
                        var imageH = Math.min(w * sourceAspect, h);
                        var cropW = imageH / cropAspect;
                        tlPos = PointPool.instance.borrow(cX - cropW / 2, cY + imageH / 2);
                        trPos = PointPool.instance.borrow(cX + cropW / 2, cY + imageH / 2);
                        blPos = PointPool.instance.borrow(cX - cropW / 2, cY - imageH / 2);
                        brPos = PointPool.instance.borrow(cX + cropW / 2, cY - imageH / 2);
                        this.tl.setPosition(tlPos.x, tlPos.y);
                        this.tr.setPosition(trPos.x, trPos.y);
                        this.bl.setPosition(blPos.x, blPos.y);
                        this.br.setPosition(brPos.x, brPos.y);
                        PointPool.instance.returnPoint(tlPos);
                        PointPool.instance.returnPoint(trPos);
                        PointPool.instance.returnPoint(blPos);
                        PointPool.instance.returnPoint(brPos);
                    }
                    else if (cropAspect < sourceAspect) {
                        var imageW = Math.min(h / sourceAspect, w);
                        var cropH = imageW * cropAspect;
                        tlPos = PointPool.instance.borrow(cX - imageW / 2, cY + cropH / 2);
                        trPos = PointPool.instance.borrow(cX + imageW / 2, cY + cropH / 2);
                        blPos = PointPool.instance.borrow(cX - imageW / 2, cY - cropH / 2);
                        brPos = PointPool.instance.borrow(cX + imageW / 2, cY - cropH / 2);
                        this.tl.setPosition(tlPos.x, tlPos.y);
                        this.tr.setPosition(trPos.x, trPos.y);
                        this.bl.setPosition(blPos.x, blPos.y);
                        this.br.setPosition(brPos.x, brPos.y);
                        PointPool.instance.returnPoint(tlPos);
                        PointPool.instance.returnPoint(trPos);
                        PointPool.instance.returnPoint(blPos);
                        PointPool.instance.returnPoint(brPos);
                    }

                    this.vertSquashRatio = this.detectVerticalSquash(img);
                    this.draw(this.ctx);
                    var croppedImg = this.getCroppedImage(scope.cropWidth, scope.cropHeight);
                    scope.croppedImage = croppedImg.src;

                    if (scope.cropAreaBounds && this.imageSet) {
                        scope.cropAreaBounds = this.getCropBounds();
                        scope.$apply();
                    }
                };
                ImageCropper.prototype.getCroppedImage = function (fillWidth, fillHeight) {
                    var bounds = this.getBounds();
                    if (!this.srcImage) {
                        throw "Source image not set.";
                    }
                    if (fillWidth && fillHeight) {
                        var sourceAspect = this.srcImage.height / this.srcImage.width;
                        var canvasAspect = this.canvas.height / this.canvas.width;
                        var w = this.canvas.width;
                        var h = this.canvas.height;
                        if (canvasAspect > sourceAspect) {
                            w = this.canvas.width;
                            h = this.canvas.width * sourceAspect;
                        }
                        else if (canvasAspect < sourceAspect) {
                            h = this.canvas.height;
                            w = this.canvas.height / sourceAspect;
                        }
                        else {
                            h = this.canvas.height;
                            w = this.canvas.width;
                        }
                        this.ratioW = w / this.srcImage.width;
                        this.ratioH = h / this.srcImage.height;
                        this.cropCanvas.width = fillWidth;
                        this.cropCanvas.height = fillHeight;
                        var offsetH = (this.buffer.height - h) / 2 / this.ratioH;
                        var offsetW = (this.buffer.width - w) / 2 / this.ratioW;
                        this.drawImageIOSFix(this.cropCanvas.getContext('2d'), this.srcImage, Math.max(Math.round((bounds.left) / this.ratioW - offsetW), 0), Math.max(Math.round(bounds.top / this.ratioH - offsetH), 0), Math.max(Math.round(bounds.getWidth() / this.ratioW), 1), Math.max(Math.round(bounds.getHeight() / this.ratioH), 1), 0, 0, fillWidth, fillHeight);
                        this.croppedImage.width = fillWidth;
                        this.croppedImage.height = fillHeight;
                    }
                    else {
                        this.cropCanvas.width = Math.max(bounds.getWidth(), 1);
                        this.cropCanvas.height = Math.max(bounds.getHeight(), 1);
                        this.cropCanvas.getContext('2d').drawImage(this.buffer, bounds.left, bounds.top, Math.max(bounds.getWidth(), 1), Math.max(bounds.getHeight(), 1), 0, 0, bounds.getWidth(), bounds.getHeight());
                        this.croppedImage.width = this.cropCanvas.width;
                        this.croppedImage.height = this.cropCanvas.height;
                    }
                    this.croppedImage.src = this.cropCanvas.toDataURL("image/" + this.fileType);
                    return this.croppedImage;
                };
                ImageCropper.prototype.getBounds = function () {
                    var minX = Number.MAX_VALUE;
                    var minY = Number.MAX_VALUE;
                    var maxX = -Number.MAX_VALUE;
                    var maxY = -Number.MAX_VALUE;
                    for (var i = 0; i < this.markers.length; i++) {
                        var marker = this.markers[i];
                        if (marker.getPosition().x < minX) {
                            minX = marker.getPosition().x;
                        }
                        if (marker.getPosition().x > maxX) {
                            maxX = marker.getPosition().x;
                        }
                        if (marker.getPosition().y < minY) {
                            minY = marker.getPosition().y;
                        }
                        if (marker.getPosition().y > maxY) {
                            maxY = marker.getPosition().y;
                        }
                    }
                    var bounds = new Bounds();
                    bounds.left = minX;
                    bounds.right = maxX;
                    bounds.top = minY;
                    bounds.bottom = maxY;
                    return bounds;
                };
                ImageCropper.prototype.setBounds = function (bounds) {

                    var topLeft;
                    var topRight;
                    var bottomLeft;
                    var bottomRight;

                    var currentBounds = this.getBounds();
                    for (var i = 0; i < this.markers.length; i++) {
                        var marker = this.markers[i];

                        if (marker.getPosition().x == currentBounds.left) {
                            if (marker.getPosition().y == currentBounds.top) {
                                topLeft = marker;
                            }
                            else {
                                bottomLeft = marker;
                            }
                        }
                        else {
                            if (marker.getPosition().y == currentBounds.top) {
                                topRight = marker;
                            }
                            else {
                                bottomRight = marker;
                            }
                        }
                    }

                    topLeft.setPosition(bounds.left, bounds.top);
                    topRight.setPosition(bounds.right, bounds.top);
                    bottomLeft.setPosition(bounds.left, bounds.bottom);
                    bottomRight.setPosition(bounds.right, bounds.bottom);

                    this.center.recalculatePosition(bounds);
                    this.center.draw(this.ctx);

                };
                ImageCropper.prototype.getMousePos = function (canvas, evt) {
                    var rect = canvas.getBoundingClientRect();
                    return PointPool.instance.borrow(evt.clientX - rect.left, evt.clientY - rect.top);
                };
                ImageCropper.prototype.getTouchPos = function (canvas, touch) {
                    var rect = canvas.getBoundingClientRect();
                    return PointPool.instance.borrow(touch.clientX - rect.left, touch.clientY - rect.top);
                };
                ImageCropper.prototype.onTouchMove = function (e) {
                    if (crop.isImageSet()) {
                        e.preventDefault();
                        if (e.touches.length >= 1) {
                            for (var i = 0; i < e.touches.length; i++) {
                                var touch = e.touches[i];
                                var touchPosition = this.getTouchPos(this.canvas, touch);
                                var cropTouch = new CropTouch(touchPosition.x, touchPosition.y, touch.identifier);
                                PointPool.instance.returnPoint(touchPosition);
                                this.move(cropTouch, e);
                            }
                        }
                        this.draw(this.ctx);
                    }
                };
                ImageCropper.prototype.onMouseMove = function (e) {

                    if (crop.isImageSet()) {
                        var mousePosition = this.getMousePos(this.canvas, e);
                        this.move(new CropTouch(mousePosition.x, mousePosition.y, 0), e);
                        var dragTouch = this.getDragTouchForID(0);
                        if (dragTouch) {
                            dragTouch.x = mousePosition.x;
                            dragTouch.y = mousePosition.y;
                        }
                        else {
                            dragTouch = new CropTouch(mousePosition.x, mousePosition.y, 0);
                        }
                        PointPool.instance.returnPoint(mousePosition);
                        this.drawCursors(dragTouch, e);
                        this.draw(this.ctx);
                    }
                };
                ImageCropper.prototype.move = function (cropTouch, e) {
                    if (this.isMouseDown) {
                        this.handleMove(cropTouch);
                    }
                };
                ImageCropper.prototype.getDragTouchForID = function (id) {
                    for (var i = 0; i < this.currentDragTouches.length; i++) {
                        if (id == this.currentDragTouches[i].id) {
                            return this.currentDragTouches[i];
                        }
                    }
                };
                ImageCropper.prototype.drawCursors = function (cropTouch, e) {
                    var cursorDrawn = false;
                    if (cropTouch != null) {
                        if (cropTouch.dragHandle == this.center) {
                            imageCropperDataShare.setStyle(this.canvas, 'move');
                            cursorDrawn = true;
                        }
                        if (cropTouch.dragHandle != null && cropTouch.dragHandle instanceof CornerMarker) {

                            this.drawCornerCursor(cropTouch.dragHandle, cropTouch.dragHandle.getPosition().x, cropTouch.dragHandle.getPosition().y, e);
                            cursorDrawn = true;
                        }
                    }
                    var didDraw = false;
                    if (!cursorDrawn) {
                        for (var i = 0; i < this.markers.length; i++) {
                            didDraw = didDraw || this.drawCornerCursor(this.markers[i], cropTouch.x, cropTouch.y, e);
                        }
                        if (!didDraw) {
                            imageCropperDataShare.setStyle(this.canvas, 'initial');
                        }
                    }
                    if (!didDraw && !cursorDrawn && this.center.touchInBounds(cropTouch.x, cropTouch.y)) {
                        this.center.setOver(true);
                        imageCropperDataShare.setOver(this.canvas);
                        imageCropperDataShare.setStyle(this.canvas, 'move');
                    }
                    else {
                        this.center.setOver(false);
                    }
                };
                ImageCropper.prototype.drawCornerCursor = function (marker, x, y, e) {
                    if (marker.touchInBounds(x, y)) {
                        marker.setOver(true);
                        if (marker.getHorizontalNeighbour().getPosition().x > marker.getPosition().x) {
                            if (marker.getVerticalNeighbour().getPosition().y > marker.getPosition().y) {
                                imageCropperDataShare.setOver(this.canvas);
                                imageCropperDataShare.setStyle(this.canvas, 'nwse-resize');
                            }
                            else {
                                imageCropperDataShare.setOver(this.canvas);
                                imageCropperDataShare.setStyle(this.canvas, 'nesw-resize');
                            }
                        }
                        else {
                            if (marker.getVerticalNeighbour().getPosition().y > marker.getPosition().y) {
                                imageCropperDataShare.setOver(this.canvas);
                                imageCropperDataShare.setStyle(this.canvas, 'nesw-resize');
                            }
                            else {
                                imageCropperDataShare.setOver(this.canvas);
                                imageCropperDataShare.setStyle(this.canvas, 'nwse-resize');
                            }
                        }
                        return true;
                    }
                    marker.setOver(false);
                    return false;
                };
                ImageCropper.prototype.onTouchStart = function (e) {
                    if (crop.isImageSet()) {
                        this.isMouseDown = true;
                    }
                };
                ImageCropper.prototype.onTouchEnd = function (e) {
                    if (crop.isImageSet()) {
                        for (var i = 0; i < e.changedTouches.length; i++) {
                            var touch = e.changedTouches[i];
                            var dragTouch = this.getDragTouchForID(touch.identifier);
                            if (dragTouch != null) {
                                if (dragTouch.dragHandle instanceof CornerMarker || dragTouch.dragHandle instanceof DragMarker) {
                                    dragTouch.dragHandle.setOver(false);
                                }
                                this.handleRelease(dragTouch);
                            }
                        }

                        if (crop.isImageSet() && this.currentlyInteracting) {
                            var img = this.getCroppedImage(scope.cropWidth, scope.cropHeight);
                            scope.croppedImage = img.src;
                            scope.$apply();
                        }

                        if (this.currentDragTouches.length == 0) {
                            this.isMouseDown = false;
                            this.currentlyInteracting = false;
                        }
                    }
                };
                //http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
                ImageCropper.prototype.drawImageIOSFix = function (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
                    // Works only if whole image is displayed:
                    // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
                    // The following works correct also when only a part of the image is displayed:
                    ctx.drawImage(img, sx * this.vertSquashRatio, sy * this.vertSquashRatio, sw * this.vertSquashRatio, sh * this.vertSquashRatio, dx, dy, dw, dh);
                };
                ImageCropper.prototype.detectVerticalSquash = function (img) {
                    var iw = img.naturalWidth, ih = img.naturalHeight;
                    var canvas = document.createElement('canvas');
                    canvas.width = 1;
                    canvas.height = ih;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    var data = ctx.getImageData(0, 0, 1, ih).data;
                    // search image edge pixel position in case it is squashed vertically.
                    var sy = 0;
                    var ey = ih;
                    var py = ih;
                    while (py > sy) {
                        var alpha = data[(py - 1) * 4 + 3];
                        if (alpha === 0) {
                            ey = py;
                        }
                        else {
                            sy = py;
                        }
                        py = (ey + sy) >> 1;
                    }
                    var ratio = (py / ih);
                    return (ratio === 0) ? 1 : ratio;
                };
                ImageCropper.prototype.onMouseDown = function (e) {
                    if (crop.isImageSet()) {
                        this.isMouseDown = true;
                    }
                };
                ImageCropper.prototype.onMouseUp = function (e) {
                    if (crop.isImageSet()) {
                        imageCropperDataShare.setReleased(this.canvas);
                        this.isMouseDown = false;
                        this.handleRelease(new CropTouch(0, 0, 0));

                        if (this.currentlyInteracting == true) {
                            var img = this.getCroppedImage(scope.cropWidth, scope.cropHeight);
                            scope.croppedImage = img.src;
                            scope.$apply();
                        }
                        this.currentlyInteracting = false;
                    }
                };

                return ImageCropper;
            })();
            angular.element(document).ready(function () {
                var el = angular.element(element[0]);
                var canvas = el[0];
                var width = scope.cropWidth;
                var height = scope.cropHeight;
                var keepAspect = scope.keepAspect;
                var touchRadius = scope.touchRadius;
                crop = new ImageCropper(canvas, canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height, keepAspect, touchRadius);

            });

            scope.$watch('image',
                function (newValue) {
                    if (newValue != null) {
                        var imageObj = new Image();
                        imageObj.addEventListener("load", function () {

                            crop.setImage(imageObj);
                            var img = crop.getCroppedImage(scope.cropWidth, scope.cropHeight);
                            scope.croppedImage = img.src;
                            scope.$apply();
                        }, false);
                        imageObj.src = newValue;
                    }
                }
            );
        }
    };
}]);

angular.module('angular-img-cropper').directive("imgCropperFileread", ['$timeout', function ($timeout) {
    return {
        scope: {
            image: "="
        },
        link: function (scope, element) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    $timeout(function () {
                        scope.image = loadEvent.target.result;
                    }, 0);
                };
                if (changeEvent.target.files[0]) {
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }
            });
        }
    };
}]);

angular.module('angular-img-cropper').directive('imgCropperFilereadCall', function factory() {
    return{
        scope: {
            control: '='
        },
        link : function (scope) {
            scope.internalControl = scope.control || {};
            scope.internalControl.load = function(elem) {

                var elemental = angular.element(document.querySelector(elem));
                var ev = document.createEvent("MouseEvent");
                ev.initEvent("click", true, false);
                elemental[0].dispatchEvent(ev);
            };
        }
    };
});

angular.module('angular-img-cropper').factory("imageCropperDataShare", function () {
    var share = {};
    var pressed;
    var over;
    share.setPressed = function (canvas) {
        pressed = canvas;
    };

    share.setReleased = function (canvas) {
        if (canvas === pressed) {
            pressed = undefined;
        }
    };

    share.setOver = function (canvas) {
        over = canvas;
    };

    share.setStyle = function (canvas, style) {
        if (pressed !== undefined) {
            if (pressed === canvas) {
                angular.element(document.documentElement).css('cursor', style);
            }
        }
        else {
            if (canvas === over) {
                angular.element(document.documentElement).css('cursor', style);
            }
        }
    };
    return share;
});