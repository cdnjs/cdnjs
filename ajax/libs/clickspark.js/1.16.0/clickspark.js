/*
 * ClickSpark.js
 * https://github.com/ymc-thzi/clickspark.js
 *
 * Thomas Zinnbauer @ YMC
 *
 * 2015 YMC AG | Sonnenstrasse 4 | CH-8280 Kreuzlingen | Switzerland
 * http://www.ymc.ch
 *
 */
var clickSpark = (function(){

    "use strict";

    var $ = jQuery;
    //global default spec
    var csDefaultSpecs = {
        particleImagePath: '',
        particleCount: 35,
        particleSpeed: 12,
        particleDuration: 400,
        particleSize: 12,
        particleRotationSpeed: 0,
        animationType: 'explosion',
        callback: null
    }

    //setup clickSpark as a jQuery function
    $.fn.clickSpark = function (spec) {
        spec = $.extend({}, csDefaultSpecs, spec);

        $(this).on("click", function (e) {
            //set specification vars
            clickSpark.setParticleImagePath(spec.particleImagePath);
            clickSpark.setParticleCount(spec.particleCount);
            clickSpark.setParticleSpeed(spec.particleSpeed);
            clickSpark.setParticleDuration(spec.particleDuration);
            clickSpark.setParticleSize(spec.particleSize);
            clickSpark.setParticleRotationSpeed(spec.particleRotationSpeed);
            clickSpark.setAnimationType(spec.animationType);
            clickSpark.setCallback(spec.callback);

            //call the on click fireParticle
            clickSpark.stdFuncOCl(e);
        });
    };


    var clickSpark = function (spec) {

        //spec Attributes
        var particleImagePath = csDefaultSpecs.particleImagePath;
        var particleCount = csDefaultSpecs.particleCount;
        var particleSpeed = csDefaultSpecs.particleSpeed;
        var particleDuration = csDefaultSpecs.particleDuration;
        var particleRotationSpeed = csDefaultSpecs.particleRotationSpeed;
        var animationType = csDefaultSpecs.animationType;
        var particleSize = csDefaultSpecs.particleSize;
        var callback = csDefaultSpecs.callback;

        //private
        var fps = 60;
        var targetFrameDuration = 1000 / fps;
        var currentTime = 0;
        var running = false;
        var canvas;
        var context;
        var particles = [];
        var posX;
        var posY;
        var DEFAULT_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAc5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTNTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KaBqfRAAAATZJREFUOBGtlM2NwjAQhd+MAndaSAu5cuBAC9RAAyuxVICQtgFqoAUOHLi6BbfAnY3ineeNTXYvKA6WRv59X8bxzAj+teUhLCqgeSg2CGhsuzZbmN3NPARu3uHcAu62F67lJnlkg+VXaAKwC20GEEJLjeJoUsGb+Hj7EJc2M2x1COtWsOuAddp81StwqQKO171ceDbC6FHX4mRzXmtsc1phSw+F/yjMcLKrbcZS0nm78lm+sTUomv4fpb3RPfXkaHy13xcbDRkIanK0f/7BeuHQwsgeJIdBISXKGD41YcM4mgQk7E8UT6DdCfNvANIhr8y1Cd48pcZRJi2pz9WikSdHmf1M2iJEL6KeHGUZYfbbeul1XawexuEDgEk6D/i0Scz+/oMvO56nLpWhXIKofFs9S25MqbQ/ard2fSmw8JoAAAAASUVORK5CYII=';
        var BASE_PARTICLE_SIZE = 20;

        //call the constructor
        constructor();

        /*
         * constructor
         */
        function constructor() {
            prepareDOMElements();
        }

        /*
         * setters
         */
        function setParticleImagePath(val) {
            if (val !== undefined) {
                particleImagePath = val;
            }
        }

        function setParticleCount(val) {
            if (val !== undefined) {
                particleCount = val;
            }
        }

        function setParticleSpeed(val) {
            if (val !== undefined) {
                particleSpeed = val;
            }
        }

        function setParticleDuration(val) {
            if (val !== undefined) {
                particleDuration = val;
            }
        }

        function setParticleSize(val) {
            if (val !== undefined) {
                particleSize = val;
            }
        }

        function setParticleRotationSpeed(val) {
            if (val !== undefined) {
                particleRotationSpeed = val;
            }
        }

        function setAnimationType(val) {
            if (val !== undefined) {
                animationType = val;
            }
        }

        function setCallback(val) {
            if (val !== undefined) {
                callback = val;
            }
        }

        var $body, $document, $window;
        var $csCanvasContainer, $csParticleCanvas;
        /*
         * prepareDOMElements
         */
        function prepareDOMElements() {
            $(document).ready(function () {

                $body = $('body');
                $document = $(document);
                $window = $(window);

                $csParticleCanvas = $('<canvas id="cs-particle-canvas"></canvas>');
                $csCanvasContainer = $('<div class="cs-canvas-container"></div>');
                $csCanvasContainer.append($csParticleCanvas);

                $body.prepend( $csCanvasContainer );

                //hide CanvasContainer
                $csCanvasContainer.hide();
                //hide canvas
                $csParticleCanvas.hide();

                //set canvas attributes
                $csCanvasContainer.css({
                    position: 'absolute',
                    zIndex: 99999,
                    width: '100%',
                    height: '100%',
                    top: window.pageYOffset,
                    left: window.pageXOffset
                });
            });
        }

        /*
         * createParticle
         */
        function createParticle() {
            var particle = {};
            if (canvas) {
                particle.x = posX;
                particle.y = posY;
                particle.rotation = 0;
            }
            particle.speed = rnd(0, particleSpeed);
            particle.angle = rnd(0, 360) * (Math.PI / 180);//convert to radians;
            particle.rotationSpeed = rnd((-1) * particleRotationSpeed, particleRotationSpeed);
            particle.size = particleSize;

            return particle;
        }

        /*
         * initParticle
         */
        var particleImg;
        function initParticle() {
            canvas = $csParticleCanvas[0];
            particleImg = new Image();
            particleImg.src = particleImagePath || DEFAULT_IMG;

            if (canvas && typeof(canvas['getContext']) === 'function') {
                context = canvas.getContext("2d");
                context.canvas.width = document.body.clientWidth;
                context.canvas.height = document.body.clientHeight;
            }
            generateParticles();
        }

        /*
         * generateParticles
         */
        function generateParticles() {
            for (var i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }

        var animations = {
            explosion: function (particle) {
                particle.x += particle.speed * Math.cos(particle.angle);
                particle.y += particle.speed * Math.sin(particle.angle);
            },
            splash: function (particle) {
                particle.x -= Math.tan(particle.angle);
                particle.y += particle.speed * -2;
            },
            falloff: function (particle) {
                particle.x -= Math.tan(particle.angle);
                particle.y -= particle.speed * -2;
            },
            blowright: function (particle) {
                particle.x -= particle.speed * -2;
                particle.y -= Math.tan(particle.angle / 8);
            },
            blowleft: function (particle) {
                particle.x += particle.speed * -2;
                particle.y -= Math.tan(particle.angle / 8);
            }
        };

        /*
         * createParticles
         */
        function createParticles() {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            var selectedAnimation = animations[animationType] || animations[DEFAULT_ANIMATION];

            particles.forEach( function(particle) {
                selectedAnimation(particle);
                drawParticles(particle);
            } );
        }

        /*
         * drawParticles
         */
        function drawParticles(particle) {
            particle.size *= 0.96 + (rnd(1, 10) / 100);
            particle.rotation += particle.rotationSpeed;
            context.save();
            context.translate(particle.x, particle.y);
            context.rotate(particle.rotation * Math.PI / 180);

            //fixed base particle size
            particleImg.width = BASE_PARTICLE_SIZE;
            particleImg.height = BASE_PARTICLE_SIZE;

            context.drawImage(particleImg, -(particleImg.width / 2), -(particleImg.height / 2), particle.size, particle.size);
            context.restore();
        }

        /*
         * requestAnimationFrame
         */
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback, lastFrameDuration) {
                    var delay = targetFrameDuration;
                    if (lastFrameDuration > delay) {
                        delay -= (lastFrameDuration - delay);
                        if (delay < 0) delay = 0;
                    }
                    window.setTimeout(callback, delay);
                };
        })();

        /*
         * animate
         */
        function animate() {
            if (running) {
                var lastTime = currentTime;
                currentTime = Date.now();
                requestAnimationFrame(animate, (currentTime - lastTime));
                createParticles();
            }
        }

        /*
         * rnd
         */
        function rnd(min, max) {
            return ((Math.random() * (max - min)) + min);
        }

        /*
         * fireParticles
         */
        function fireParticles(e) {
            currentTime = Date.now();
            //Set the anchor of the particle origin

            //if click take event coordinates
            if (e.type === 'click') {
                posX = e.pageX - window.pageXOffset;
                posY = e.pageY - window.pageYOffset;

            } else {
                //if html-element take position coordinates
                posX = (e.offset().left + e.width() / 2) - window.pageXOffset;
                posY = (e.offset().top + e.height() / 2) - window.pageYOffset;
            }

            particles = [];
            initParticle();

            //avoid flickering scrollbars on canvas display
            if ($document.height() > $window.height()) {
                $body.css('overflow-y', 'inherit');
            } else {
                $body.css('overflow-y', 'hidden');
            }
            if ($document.width() > $window.width()) {
                $body.css('overflow-x', 'inherit');
            } else {
                $body.css('overflow-x', 'hidden');
            }

            $csCanvasContainer.css({
                'top': window.pageYOffset,
                'left': window.pageXOffset
            });

            $csParticleCanvas.css({
                'top': 0,
                'left': 0
            });

            $csCanvasContainer.show();
            $csParticleCanvas.show();
            window.setTimeout(function () {
                $csParticleCanvas.fadeOut(fadeCompleted);
            }, particleDuration);
            running = true;
            animate();

            function fadeCompleted () {
                $csParticleCanvas.hide();
                $csCanvasContainer.hide();
                $body.css({'overflow': 'inherit'});
                running = false;
                if(typeof callback === 'function')
                {
                    callback.call(this);
                }
            }

        }

        /*
         * public methods
         */
        return {
            setParticleImagePath: function (val) {
                setParticleImagePath(val);
            },
            setParticleCount: function (val) {
                setParticleCount(val);
            },
            setParticleSpeed: function (val) {
                setParticleSpeed(val);
            },
            setParticleDuration: function (val) {
                setParticleDuration(val);
            },
            setParticleSize: function (val) {
                setParticleSize(val);
            },
            setParticleRotationSpeed: function (val) {
                setParticleRotationSpeed(val);
            },
            setAnimationType: function (val) {
                setAnimationType(val);
            },
            setCallback: function (val) {
                setCallback(val);
            },
            init: function (spec) {
                fireParticles(element);
            },
            fireParticles: function (element) {
                fireParticles(element);
            },

            stdFuncOCl: function (e) {
                fireParticles(e);

            }
        };
    }();

    return clickSpark;

}());
