var THREE = window.THREE || {};

var d3 = window.d3 || {};
d3.geom = d3.geom || {};

(function() {
    var stack = [];
    var lastTime = Date.now();

    function Aquarelle(texture, mask, options) {
        var self = this;

        self.setOptions(Aquarelle.defaultOptions);
        self.setOptions(options);

        self.mask = {};

        self.mask.canvas = document.createElement('canvas');
        self.mask.ctx = self.mask.canvas.getContext('2d');

        if(typeof mask === 'string') {
            self.mask.img = new Image;
            self.mask.img.onload = function() {
                self.drawMaskImage();
            };
            self.mask.crossOrigin = 'Anonymous';
            self.mask.img.src = mask;
        } else
        if(mask.nodeName && mask.src) {
            self.mask.img = mask;
            self.drawMaskImage();
        }

        THREE.ImageUtils.crossOrigin = '';
        new THREE.TextureLoader().load(texture && (typeof texture === 'string' ? texture : texture.nodeName && texture.src) || '', function(texture) {
            self.texture = texture;
            texture.minFilter = THREE.LinearFilter;

            var composer = self.getComposer();

            composer.addPass(new THREE.ClearPass);

            var mask = new THREE.Texture(self.mask.canvas);
            mask.needsUpdate = true;
            mask.minFilter = THREE.LinearFilter;

            var turbulentPass = self.turbulentPass = new THREE.AquarellePass(texture, mask);
            composer.addPass(turbulentPass);

            var outputPass = new THREE.ShaderPass(THREE.CopyShader);
            outputPass.renderToScreen = true;
            composer.addPass(outputPass);

            self.dispatchEvent(self.getEventObject('created'));

            if(self.options.autoplay) {
                self.start();
            }

            self.reset();

            self.isInitialized = true;
        });

        stack.push(self);
    }

    Object.assign(Aquarelle.prototype, THREE.EventDispatcher.prototype);

    Aquarelle.prototype.getRenderer = function() {
        if(!this.renderer) {
            var renderer = this.renderer = new THREE.WebGLRenderer({
                alpha: true
            });
            renderer.setClearColor(0x000000, 0);
            renderer.setSize(this.texture.image.width, this.texture.image.height);
            renderer.autoClear = false;
        }

        return this.renderer;
    };
    Aquarelle.prototype.getCanvas = function() {
        return this.getRenderer().domElement;
    };
    Aquarelle.prototype.getComposer = function() {
        if(!this.composer) {
            this.composer = new THREE.EffectComposer(this.getRenderer(), new THREE.WebGLRenderTarget(this.texture.image.width, this.texture.image.height));
        }

        return this.composer;
    };

    Aquarelle.prototype.drawMaskImage = function() {
        var mask = this.mask || {};

        if(mask.img) {
            mask.canvas.width = mask.img.width;
            mask.canvas.height = mask.img.height;

            mask.ctx.drawImage(mask.img, 0, 0);

            var data = mask.ctx.getImageData(0, 0, mask.img.width, mask.img.height).data;
            mask.points = d3.geom.contour(function(x, y) {
                return data[(y * mask.img.width + x) * 4 + 3] > 0;
            });
        }
    };
    Aquarelle.prototype.renderMask = function() {
        var mask = this.mask || {};

        if(!mask.points) {
            return;
        }

        mask.ctx.clearRect(0, 0, mask.canvas.width, mask.canvas.height);

        mask.ctx.lineJoin = 'round';
        mask.ctx.lineWidth = Math.abs(mask.offset) * 2;

        if(mask.offset) {
            mask.ctx.globalCompositeOperation = 'source-' + (mask.offset < 0 ? 'out' : 'over');

            this.pathPoints();
            mask.ctx.stroke();
        }

        this.pathPoints();
        mask.ctx.fill();
    };
    Aquarelle.prototype.pathPoints = function() {
        var mask = this.mask || {};

        mask.ctx.beginPath();
        mask.points.forEach(function(point, index) {
            mask.ctx[index ? 'lineTo' : 'moveTo'](point[0], point[1]);
        });
        mask.ctx.closePath();
    };

    Aquarelle.prototype.direction = 1;
    Aquarelle.prototype.progress = 1;
    Aquarelle.prototype.isPaused = true;

    Aquarelle.prototype.render = function(delta) {
        if(!this.turbulentPass || !this.composer) {
            return;
        }

        var lastProgress = this.progress;
        var progress = this.clampedProgress(lastProgress + this.direction * delta / (this.options.duration / 1000));

        if(!this.isPaused && lastProgress !== progress) {
            this.progress = progress;
            this.reset();
        }

        this.renderMask();
        this.getRenderer().clear();
        this.getComposer().render(delta);
    };

    Aquarelle.prototype.transitionForProgressInRange = function(progress, startValue, endValue) {
        return startValue + (endValue - startValue) * progress;
    };
    Aquarelle.prototype.progressForValueInRange = function(value, startValue, endValue) {
        return (value - startValue) / (endValue - startValue);
    };
    Aquarelle.prototype.clampedProgress = function(progress) {
        return Math.max(0, Math.min(progress, 1));
    };

    Aquarelle.prototype.transitionInRange = function(startValue, endValue, startTime, endTime) {
        return this.transitionForProgressInRange(this.clampedProgress(this.progressForValueInRange(this.progress, (startTime || 0) / this.options.duration, (endTime || this.options.duration) / this.options.duration)), startValue, endValue);
    };

    Aquarelle.prototype.isComplete = function() {
        return this.direction > 0 ? this.progress === 1 : this.direction < 0 && !this.progress;
    };

    Aquarelle.prototype.pause = function() {
        if(this.isPaused) {
            return;
        }

        this.isPaused = true;

        if(this.isInitialized) {
            this.dispatchEvent(this.getEventObject('paused'));
        }
    };
    Aquarelle.prototype.play = function() {
        if(!this.isPaused) {
            return;
        }

        this.isPaused = false;

        this.dispatchEvent(this.getEventObject('played'));
    };
    Aquarelle.prototype.stop = function() {
        if(this.progress === +(this.direction >= 0) && this.isPaused) {
            return;
        }

        this.progress = +(this.direction >= 0);

        this.pause();

        if(this.isInitialized) {
            this.dispatchEvent(this.getEventObject('stopped'));
        }
    };
    Aquarelle.prototype.start = function() {
        if(this.progress === +(this.direction < 0) && !this.isPaused) {
            return;
        }

        this.progress = +(this.direction < 0);

        this.dispatchEvent(this.getEventObject('started'));

        this.play();
    };

    Aquarelle.prototype.reverse = function() {
        this.direction = this.direction < 0 ? 1 : -1;
    };
    Aquarelle.prototype.reset = function() {
        if(!this.turbulentPass) {
            return;
        }

        this.turbulentPass.uniforms.Amplitude.value = this.transitionInRange(this.options.fromAmplitude, this.options.toAmplitude);
        this.turbulentPass.uniforms.Frequency.value = this.transitionInRange(this.options.fromFrequency, this.options.toFrequency);
        this.mask.offset = this.transitionInRange(this.options.fromOffset, this.options.toOffset);

        this.turbulentPass.uniforms.Mask.value.needsUpdate = true;

        this.dispatchEvent(this.getEventObject('changed'));

        if(this.isComplete()) {
            this.dispatchEvent(this.getEventObject('completed'));

            var isPaused = this.isPaused;
            this.stop();
        }
        if(this.isComplete() && this.options.loop && !isPaused) {
            this.start();
        }
    };

    Aquarelle.prototype.getEventObject = function(type) {
        return {
            type: type,
            timeStamp: Date.now(),
            direction: this.direction,
            progress: this.progress,
            isComplete: this.isComplete()
        };
    };

    Aquarelle.prototype.setOptions = function(options) {
        if(typeof options === 'object' && options !== null) {
            this.options = Object.assign(this.options || {}, options);
        }
    };

    Aquarelle.defaultOptions = {
        fromAmplitude: 50,
        toAmplitude: 0,

        fromFrequency: 8,
        toFrequency: 7,

        fromOffset: -30,
        toOffset: 28,

        autoplay: false,
        loop: false,
        duration: 8000
    };

    function frame() {
        var time = Date.now();
        var deltaTime = time - lastTime;

        lastTime = time;

        stack.forEach(function(item) {
            item.render(deltaTime / 1000);
        });

        requestAnimationFrame(frame);
    }
    frame();

    window.Aquarelle = Aquarelle;
}());