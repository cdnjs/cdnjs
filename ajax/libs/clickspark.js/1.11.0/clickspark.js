/*
 * Clickspark JavaScript utility v1.0.0
 * https://github.com/ymc-thzi/clickspark.js
 *
 * Thomas Zinnbauer @ YMC
 *
 * 2015 YMC AG | Sonnenstrasse 4 | CH-8280 Kreuzlingen | Switzerland
 * http://www.ymc.ch
 *
 */
var $ = jQuery;
//global default spec
csDefaultSpecs = {
    particleImagePath: '',
    particleCount: 35,
    particleSpeed: 12,
    particleSize: 12,
    particleRotationSpeed: 0,
    animationType: 'explosion'
}

//setup clickSpark as a jQuery function
$.fn.clickSpark = function (spec) {
    if (spec == undefined) {
        spec = {
            particleImagePath: csDefaultSpecs.particleImagePath,
            particleCount: csDefaultSpecs.particleCount,
            particleSpeed: csDefaultSpecs.particleSpeed,
            particleSize: csDefaultSpecs.particleSize,
            particleRotationSpeed: csDefaultSpecs.particleRotationSpeed,
            animationType: csDefaultSpecs.animationType
        };
    }

    $(this).on("click", function (e) {
        //set specification vars
        clickSpark.setParticleImagePath(spec.particleImagePath);
        clickSpark.setParticleCount(spec.particleCount);
        clickSpark.setParticleSpeed(spec.particleSpeed);
        clickSpark.setParticleSize(spec.particleSize);
        clickSpark.setParticleRotationSpeed(spec.particleRotationSpeed);
        clickSpark.setAnimationType(spec.animationType);

        //call the on click fireParticle
        clickSpark.stdFuncOCl(e);
    });
};


var clickSpark = function (spec) {

    //spec Attributes
    var particleImagePath = csDefaultSpecs.particleImagePath;
    var particleCount = csDefaultSpecs.particleCount;
    var particleSpeed = csDefaultSpecs.particleSpeed;
    var particleRotationSpeed = csDefaultSpecs.particleRotationSpeed;
    var animationType = csDefaultSpecs.animationType;
    var particleSize = csDefaultSpecs.particleSize;

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
        if (val != undefined) {
            particleImagePath = val;
        }
    }

    function setParticleCount(val) {
        if (val != undefined) {
            particleCount = val;
        }
    }

    function setParticleSpeed(val) {
        if (val != undefined) {
            particleSpeed = val;
        }
    }

    function setParticleSize(val) {
        if (val != undefined) {
            particleSize = val;
        }
    }

    function setParticleRotationSpeed(val) {
        if (val != undefined) {
            particleRotationSpeed = val;
        }
    }

    function setAnimationType(val) {
        if (val != undefined) {
            animationType = val;
        }
    }

    /*
     * prepareDOMElements
     */
    function prepareDOMElements() {
        $(document).ready(function () {

            $('body').prepend('<div class="cs-canvas-container"><canvas id="cs-particle-canvas"></canvas></div>');

            //hide CanvasContainer
            $(".cs-canvas-container").hide();
            //hide canvas
            $("#cs-particle-canvas").hide();

            //set canvas attributes
            $(".cs-canvas-container").css({
                position: 'absolute',
                zIndex: 99999,
                width: '100%',
                height: '100%',
                top: window.scrollY,
                left: window.scrollX
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
    function initParticle() {
        canvas = document.getElementById("cs-particle-canvas");
        if (particleImagePath == '') {
            defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAc5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTNTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KaBqfRAAAATZJREFUOBGtlM2NwjAQhd+MAndaSAu5cuBAC9RAAyuxVICQtgFqoAUOHLi6BbfAnY3ineeNTXYvKA6WRv59X8bxzAj+teUhLCqgeSg2CGhsuzZbmN3NPARu3uHcAu62F67lJnlkg+VXaAKwC20GEEJLjeJoUsGb+Hj7EJc2M2x1COtWsOuAddp81StwqQKO171ceDbC6FHX4mRzXmtsc1phSw+F/yjMcLKrbcZS0nm78lm+sTUomv4fpb3RPfXkaHy13xcbDRkIanK0f/7BeuHQwsgeJIdBISXKGD41YcM4mgQk7E8UT6DdCfNvANIhr8y1Cd48pcZRJi2pz9WikSdHmf1M2iJEL6KeHGUZYfbbeul1XawexuEDgEk6D/i0Scz+/oMvO56nLpWhXIKofFs9S25MqbQ/ard2fSmw8JoAAAAASUVORK5CYII='
            particleImg = new Image();
            particleImg.src = defaultImg;
        } else {
            particleImg = new Image();
            particleImg.src = particleImagePath;
        }

        if (canvas && typeof(canvas['getContext']) == 'function') {
            context = canvas.getContext("2d");
            bodyWidth = document.body.clientWidth;
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

    /*
     * createParticles
     */
    function createParticles() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (var i = 0; i < particleCount; i++) {
            var particle = particles[i];

            //animationType of the fountain
            switch (animationType) {
                case 'explosion':
                    animationType_explosion(particle);
                    break;
                case 'splash':
                    animationType_splash(particle);
                    break;
                case 'falloff':
                    animationType_falloff(particle);
                    break;
                case 'blowright':
                    animationType_blowright(particle);
                    break;
                case 'blowleft':
                    animationType_blowleft(particle);
                    break;
                default:
                    animationType_explosion(particle);
            }

            drawParticles(particle);
        }
    }

    /*
     * animationType: explosion
     */
    function animationType_explosion(particle) {
        particle.x = particle.x + particle.speed * Math.cos(particle.angle);
        particle.y = particle.y + particle.speed * Math.sin(particle.angle);
    }

    /*
     * animationType: splash
     */
    function animationType_splash(particle) {
        particle.x = particle.x - Math.tan(particle.angle);
        particle.y = particle.y + particle.speed * -2;
    }

    /*
     * animationType: falloff
     */
    function animationType_falloff(particle) {
        particle.x = particle.x - Math.tan(particle.angle);
        particle.y = particle.y - particle.speed * -2;
    }

    /*
     * animationType: blowright
     */
    function animationType_blowright(particle) {
        particle.x = particle.x - particle.speed * -2;
        particle.y = particle.y - Math.tan(particle.angle / 8);
    }

    /*
     * animationType: blowleft
     */
    function animationType_blowleft(particle) {
        particle.x = particle.x + particle.speed * -2;
        particle.y = particle.y - Math.tan(particle.angle / 8);
    }

    /*
     * drawParticles
     */
    function drawParticles(particle) {
        particle.size = particle.size * (0.96 + (rnd(1, 10) / 100));
        particle.rotation = particle.rotation + particle.rotationSpeed;
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation * Math.PI / 180);
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
        if (e.type == 'click') {
            posX = e.pageX - window.scrollX;
            posY = e.pageY - window.scrollY;

        } else {
            //if html-element take position coordinates
            posX = (e.offset().left + e.width() / 2) - window.scrollX;
            posY = (e.offset().top + e.height() / 2) - window.scrollY;
        }

        particles = [];
        particle = null;
        initParticle();

        //avoid flickering scrollbars on canvas display
        if ($(document).height() > $(window).height()) {
            $("body").css('overflow-y', 'inherit');
        } else {
            $("body").css('overflow-y', 'hidden');
        }
        if ($(document).width() > $(window).width()) {
            $("body").css('overflow-x', 'inherit');
        } else {
            $("body").css('overflow-x', 'hidden');
        }

        $(".cs-canvas-container").css('top', window.scrollY);
        $(".cs-canvas-container").css('left', window.scrollX);

        $("#cs-particle-canvas").css('top', 0);
        $("#cs-particle-canvas").css('left', 0);

        $(".cs-canvas-container").show();
        $("#cs-particle-canvas").show();
        window.setTimeout(function () {
            $("#cs-particle-canvas").fadeOut();
        }, 400);
        running = true;
        animate();
        window.setTimeout(function () {
            $("#cs-particle-canvas").hide();
            $(".cs-canvas-container").hide();
            $("body").css('overflow', 'inherit');
            running = false;
        }, 800);
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
        setParticleSize: function (val) {
            setParticleSize(val);
        },
        setParticleRotationSpeed: function (val) {
            setParticleRotationSpeed(val);
        },
        setAnimationType: function (val) {
            setAnimationType(val);
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





