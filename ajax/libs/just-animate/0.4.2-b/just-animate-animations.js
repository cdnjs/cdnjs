(function () {
    'use strict';

    var bounce = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'translate3d(0, 0, 0)'
            },
            {
                'offset': 0.2,
                'transform': 'translate3d(0, 0, 0)'
            },
            {
                'offset': 0.4,
                'transform': 'translate3d(0, -30px, 0)'
            },
            {
                'offset': 0.43,
                'transform': 'translate3d(0, -30px, 0)'
            },
            {
                'offset': 0.53,
                'transform': 'translate3d(0, 0, 0)'
            },
            {
                'offset': 0.7,
                'transform': 'translate3d(0, -15px, 0)'
            },
            {
                'offset': 0.8,
                'transform': 'translate3d(0, 0, 0)'
            },
            {
                'offset': 0.9,
                'transform': 'translate3d(0, -4px, 0)'
            },
            {
                'offset': 1,
                'transform': 'translate3d(0, 0, 0)'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both',
            'easing': 'easeOutCubic'
        },
        'name': 'bounce'
    };

    var bounceIn = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'scale3d(.3, .3, .3)'
            },
            {
                'transform': 'scale3d(1.1, 1.1, 1.1)'
            },
            {
                'transform': 'scale3d(.9, .9, .9)'
            },
            {
                'opacity': 1,
                'transform': 'scale3d(1.03, 1.03, 1.03)'
            },
            {
                'transform': 'scale3d(.97, .97, .97)'
            },
            {
                'opacity': 1,
                'transform': 'scale3d(1, 1, 1)'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both',
            'easing': 'easeOutCubic'
        },
        'name': 'bounceIn'
    };

    var bounceInDown = {
        'keyframes': [
            {
                'offset': 0,
                'easing': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                'opacity': 0,
                'transform': 'translate3d(0, -3000px, 0)'
            },
            {
                'offset': 0.6,
                'easing': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                'opacity': 1,
                'transform': 'translate3d(0, 25px, 0)'
            },
            {
                'offset': 0.75,
                'easing': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                'opacity': 1,
                'transform': 'translate3d(0, -10px, 0)'
            },
            {
                'offset': 0.9,
                'easing': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                'opacity': 1,
                'transform': 'translate3d(0, 5px, 0)'
            },
            {
                'offset': 1,
                'easing': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both',
            'easing': 'easeOutCubic'
        },
        'name': 'bounceInDown'
    };

    var bounceInLeft = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 0,
                'transform': 'translate3d(-3000px, 0, 0)'
            },
            {
                'offset': 0.6,
                'opacity': 1,
                'transform': 'translate3d(25px, 0, 0)'
            },
            {
                'offset': 0.75,
                'opacity': 1,
                'transform': 'translate3d(-10px, 0, 0)'
            },
            {
                'offset': 0.9,
                'opacity': 1,
                'transform': 'translate3d(5px, 0, 0)'
            },
            {
                'offset': 1,
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both',
            'easing': 'easeOutCubic'
        },
        'name': 'bounceInLeft'
    };

    var bounceInRight = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 0,
                'transform': 'translate3d(3000px, 0, 0)'
            },
            {
                'offset': 0.6,
                'opacity': 1,
                'transform': 'translate3d(-25px, 0, 0)'
            },
            {
                'offset': 0.75,
                'transform': 'translate3d(10px, 0, 0)'
            },
            {
                'offset': 0.9,
                'transform': 'translate3d(-5px, 0, 0)'
            },
            {
                'offset': 1,
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both',
            'easing': 'easeOutCubic'
        },
        'name': 'bounceInRight'
    };

    var bounceInUp = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 0,
                'transform': 'translate3d(0, 3000px, 0)'
            },
            {
                'offset': 0.6,
                'opacity': 1,
                'transform': 'translate3d(0, -20px, 0)'
            },
            {
                'offset': 0.75,
                'opacity': 1,
                'transform': 'translate3d(0, 10px, 0)'
            },
            {
                'offset': 0.9,
                'opacity': 1,
                'transform': 'translate3d(0, -5px, 0)'
            },
            {
                'offset': 1,
                'opacity': 1,
                'transform': 'translate3d(0, 0, 0)'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both',
            'easing': 'easeOutCubic'
        },
        'name': 'bounceInUp'
    };

    var bounceOut = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none'
            },
            {
                'offset': 0.2,
                'transform': 'scale3d(.9, .9, .9)'
            },
            {
                'offset': 0.5,
                'opacity': 1,
                'transform': 'scale3d(1.1, 1.1, 1.1)'
            },
            {
                'offset': 0.55,
                'opacity': 1,
                'transform': 'scale3d(1.1, 1.1, 1.1)'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'scale3d(.3, .3, .3)'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both'
        },
        'name': 'bounceOut'
    };

    var bounceOutDown = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none'
            },
            {
                'offset': 0.2,
                'transform': 'translate3d(0, 10px, 0)'
            },
            {
                'offset': 0.4,
                'opacity': 1,
                'transform': 'translate3d(0, -20px, 0)'
            },
            {
                'offset': 0.45,
                'opacity': 1,
                'transform': 'translate3d(0, -20px, 0)'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'translate3d(0, 2000px, 0)'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both'
        },
        'name': 'bounceOutDown'
    };

    var bounceOutLeft = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none'
            },
            {
                'offset': 0.2,
                'opacity': 1,
                'transform': 'translate3d(20px, 0, 0)'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'translate3d(-2000px, 0, 0)'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both'
        },
        'name': 'bounceOutLeft'
    };

    var bounceOutRight = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none'
            },
            {
                'offset': 0.2,
                'opacity': 1,
                'transform': 'translate3d(-20px, 0, 0)'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'translate3d(2000px, 0, 0)'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both'
        },
        'name': 'bounceOutRight'
    };

    var bounceOutUp = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none'
            },
            {
                'offset': 0.2,
                'opacity': 1,
                'transform': 'translate3d(0, -10px, 0)'
            },
            {
                'offset': 0.4,
                'opacity': 1,
                'transform': 'translate3d(0, 20px, 0)'
            },
            {
                'offset': 0.45,
                'opacity': 1,
                'transform': 'translate3d(0, 20px, 0)'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'translate3d(0, -2000px, 0)'
            }
        ],
        'timings': {
            'duration': 900,
            'fill': 'both'
        },
        'name': 'bounceOutUp'
    };

    var fadeIn = {
        'keyframes': [
            {
                'opacity': 0
            },
            {
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 650,
            'fill': 'both',
            'easing': 'ease-in'
        },
        'name': 'fadeIn'
    };

    var fadeInDown = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(0, -100%, 0)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 650,
            'fill': 'both'
        },
        'name': 'fadeInDown'
    };

    var fadeInDownBig = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(0, -2000px, 0)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1300,
            'fill': 'both'
        },
        'name': 'fadeInDownBig'
    };

    var fadeInLeft = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(-100%, 0, 0)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 650,
            'fill': 'both'
        },
        'name': 'fadeInLeft'
    };

    var fadeInLeftBig = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(-2000px, 0, 0)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1300,
            'fill': 'both'
        },
        'name': 'fadeInLeftBig'
    };

    var fadeInRight = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(100%, 0, 0)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 650,
            'fill': 'both'
        },
        'name': 'fadeInRight'
    };

    var fadeInRightBig = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(2000px, 0, 0)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1300,
            'fill': 'both'
        },
        'name': 'fadeInRightBig'
    };

    var fadeInUp = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(0, 100%, 0)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 650,
            'fill': 'both'
        },
        'name': 'fadeInUp'
    };

    var fadeInUpBig = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(0, 2000px, 0)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1300,
            'fill': 'both'
        },
        'name': 'fadeInUpBig'
    };

    var fadeOut = {
        'keyframes': [
            {
                'opacity': 1
            },
            {
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 650,
            'fill': 'both'
        },
        'name': 'fadeOut'
    };

    var fadeOutDown = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(0, 100%, 0)'
            }
        ],
        'timings': {
            'duration': 650
        },
        'name': 'fadeOutDown'
    };

    var fadeOutDownBig = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(0, 2000px, 0)'
            }
        ],
        'timings': {
            'duration': 1300
        },
        'name': 'fadeOutDownBig'
    };

    var fadeOutLeft = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(-100%, 0, 0)'
            }
        ],
        'timings': {
            'duration': 650
        },
        'name': 'fadeOutLeft'
    };

    var fadeOutLeftBig = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(-2000px, 0, 0)'
            }
        ],
        'timings': {
            'duration': 1300
        },
        'name': 'fadeOutLeftBig'
    };

    var fadeOutRight = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(100%, 0, 0)'
            }
        ],
        'timings': {
            'duration': 650
        },
        'name': 'fadeOutRight'
    };

    var fadeOutRightBig = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(2000px, 0, 0)'
            }
        ],
        'timings': {
            'duration': 1300
        },
        'name': 'fadeOutRightBig'
    };

    var fadeOutUp = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(0, -100%, 0)'
            }
        ],
        'timings': {
            'duration': 650
        },
        'name': 'fadeOutUp'
    };

    var fadeOutUpBig = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(0, -2000px, 0)'
            }
        ],
        'timings': {
            'duration': 1300
        },
        'name': 'fadeOutUpBig'
    };

    var flash = {
        'keyframes': [
            {
                'opacity': 1
            },
            {
                'opacity': 0
            },
            {
                'opacity': 1
            },
            {
                'opacity': 0
            },
            {
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'flash'
    };

    var flip = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'perspective(400px) rotate3d(0, 1, 0, -360deg)'
            },
            {
                'offset': 0.4,
                'transform': 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)'
            },
            {
                'offset': 0.5,
                'transform': 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)'
            },
            {
                'offset': 0.8,
                'transform': 'perspective(400px) scale3d(.95, .95, .95)'
            },
            {
                'offset': 1,
                'transform': 'perspective(400px)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'flip'
    };

    var flipInX = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
                'easing': 'ease-in ',
                'opacity': 0
            },
            {
                'offset': 0.4,
                'transform': 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
                'easing': 'ease-in '
            },
            {
                'offset': 0.6,
                'transform': 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
                'opacity': 1
            },
            {
                'offset': 0.8,
                'transform': 'perspective(400px) rotate3d(1, 0, 0, -5deg)'
            },
            {
                'offset': 1,
                'opacity': 1,
                'transform': 'perspective(400px)'
            }
        ],
        'timings': {
            'duration': 750
        },
        'name': 'flipInX'
    };

    var flipInY = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
                'opacity': 0
            },
            {
                'offset': 0.4,
                'transform': 'perspective(400px) rotate3d(0, 1, 0, -20deg)'
            },
            {
                'offset': 0.6,
                'transform': 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
                'opacity': 1
            },
            {
                'offset': 0.8,
                'transform': 'perspective(400px) rotate3d(0, 1, 0, -5deg)'
            },
            {
                'offset': 1,
                'transform': 'perspective(400px)',
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 750
        },
        'name': 'flipInY'
    };

    var flipOutX = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'perspective(400px)',
                'opacity': 1
            },
            {
                'offset': 0.3,
                'transform': 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
                'opacity': 1
            },
            {
                'offset': 1,
                'transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 750
        },
        'name': 'flipOutX'
    };

    var flipOutY = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'perspective(400px)',
                'opacity': 1
            },
            {
                'offset': 0.3,
                'transform': 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
                'opacity': 1
            },
            {
                'offset': 1,
                'transform': 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 750
        },
        'name': 'flipOutY'
    };

    var headShake = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'translateX(0)'
            },
            {
                'offset': 0.065,
                'transform': 'translateX(-6px) rotateY(-9deg)'
            },
            {
                'offset': 0.185,
                'transform': 'translateX(5px) rotateY(7deg)'
            },
            {
                'offset': 0.315,
                'transform': 'translateX(-3px) rotateY(-5deg)'
            },
            {
                'offset': 0.435,
                'transform': 'translateX(2px) rotateY(3deg)'
            },
            {
                'offset': 0.5,
                'transform': 'translateX(0)'
            },
            {
                'offset': 1,
                'transform': 'translateX(0)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'headShake'
    };

    var hinge = {
        'keyframes': [
            {
                'transform': 'none',
                'transform-origin': 'top left',
                'opacity': 1
            },
            {
                'transform': 'rotate3d(0, 0, 1, 80deg)',
                'opacity': 1
            },
            {
                'transform': 'rotate3d(0, 0, 1, 60deg)',
                'opacity': 1
            },
            {
                'transform': 'rotate3d(0, 0, 1, 80deg)',
                'opacity': 0
            },
            {
                'transform': 'rotate3d(0, 0, 1, 60deg)',
                'opacity': 1
            },
            {
                'transform': 'translate3d(0, 700px, 0)',
                'transform-origin': 'top left',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 2000
        },
        'name': 'hinge'
    };

    var jello = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'none'
            },
            {
                'offset': 0.111,
                'transform': 'none'
            },
            {
                'offset': 0.222,
                'transform': 'skewX(-12.5deg) skewY(-12.5deg)'
            },
            {
                'offset': 0.333,
                'transform': 'skewX(6.25deg) skewY(6.25deg)'
            },
            {
                'offset': 0.444,
                'transform': 'skewX(-3.125deg) skewY(-3.125deg)'
            },
            {
                'offset': 0.555,
                'transform': 'skewX(1.5625deg) skewY(1.5625deg)'
            },
            {
                'offset': 0.666,
                'transform': 'skewX(-0.78125deg) skewY(-0.78125deg)'
            },
            {
                'offset': 0.777,
                'transform': 'skewX(0.390625deg) skewY(0.390625deg)'
            },
            {
                'offset': 0.888,
                'transform': 'skewX(-0.1953125deg) skewY(-0.1953125deg)'
            },
            {
                'offset': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1000,
            'fill': 'both',
            'easing': 'ease-in-out'
        },
        'name': 'jello'
    };

    var lightSpeedIn = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'translate3d(100%, 0, 0) skewX(-30deg)',
                'opacity': 0
            },
            {
                'offset': 0.6,
                'transform': 'skewX(20deg)',
                'opacity': 1
            },
            {
                'offset': 0.8,
                'transform': 'skewX(-5deg)',
                'opacity': 1
            },
            {
                'offset': 1,
                'transform': 'none',
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 1000,
            'fill': 'both',
            'easing': 'ease-out'
        },
        'name': 'lightSpeedIn'
    };

    var lightSpeedOut = {
        'keyframes': [
            {
                'transform': 'none',
                'opacity': 1
            },
            {
                'transform': 'translate3d(100%, 0, 0) skewX(30deg)',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 1000,
            'fill': 'both',
            'easing': 'ease-in'
        },
        'name': 'lightSpeedOut'
    };

    var pulse = {
        'keyframes': [
            {
                'transform': 'scale3d(1, 1, 1)'
            },
            {
                'transform': 'scale3d(1.05, 1.05, 1.05)'
            },
            {
                'transform': 'scale3d(1, 1, 1)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'pulse'
    };

    var rollIn = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)'
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rollIn'
    };

    var rollOut = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none'
            },
            {
                'opacity': 0,
                'transform': 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rollOut'
    };

    var rotateIn = {
        'keyframes': [
            {
                'transform-origin': 'center',
                'transform': 'rotate3d(0, 0, 1, -200deg)',
                'opacity': 0
            },
            {
                'transform-origin': 'center',
                'transform': 'none',
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateIn'
    };

    var rotateInDownLeft = {
        'keyframes': [
            {
                'transform-origin': 'left bottom',
                'transform': 'rotate3d(0, 0, 1, -45deg)',
                'opacity': 0
            },
            {
                'transform-origin': 'left bottom',
                'transform': 'none',
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateInDownLeft'
    };

    var rotateInDownRight = {
        'keyframes': [
            {
                'transform-origin': 'right bottom',
                'transform': 'rotate3d(0, 0, 1, 45deg)',
                'opacity': 0
            },
            {
                'transform-origin': 'right bottom',
                'transform': 'none',
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateInDownRight'
    };

    var rotateInUpLeft = {
        'keyframes': [
            {
                'transform-origin': 'left bottom',
                'transform': 'rotate3d(0, 0, 1, 45deg)',
                'opacity': 0
            },
            {
                'transform-origin': 'left bottom',
                'transform': 'none',
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateInUpLeft'
    };

    var rotateInUpRight = {
        'keyframes': [
            {
                'transform-origin': 'right bottom',
                'transform': 'rotate3d(0, 0, 1, -90deg)',
                'opacity': 0
            },
            {
                'transform-origin': 'right bottom',
                'transform': 'none',
                'opacity': 1
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateInUpRight'
    };

    var rotateOut = {
        'keyframes': [
            {
                'transform-origin': 'center',
                'transform': 'none',
                'opacity': 1
            },
            {
                'transform-origin': 'center',
                'transform': 'rotate3d(0, 0, 1, 200deg)',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateOut'
    };

    var rotateOutDownLeft = {
        'keyframes': [
            {
                'transform-origin': 'left bottom',
                'transform': 'none',
                'opacity': 1
            },
            {
                'transform-origin': 'left bottom',
                'transform': 'rotate3d(0, 0, 1, 45deg)',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateOutDownLeft'
    };

    var rotateOutDownRight = {
        'keyframes': [
            {
                'transform-origin': 'right bottom',
                'transform': 'none',
                'opacity': 1
            },
            {
                'transform-origin': 'right bottom',
                'transform': 'rotate3d(0, 0, 1, -45deg)',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateOutDownRight'
    };

    var rotateOutUpLeft = {
        'keyframes': [
            {
                'transform-origin': 'left bottom',
                'transform': 'none',
                'opacity': 1
            },
            {
                'transform-origin': 'left bottom',
                'transform': 'rotate3d(0, 0, 1, -45deg)',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateOutUpLeft'
    };

    var rotateOutUpRight = {
        'keyframes': [
            {
                'transform-origin': 'right bottom',
                'transform': 'none',
                'opacity': 1
            },
            {
                'transform-origin': 'right bottom',
                'transform': 'rotate3d(0, 0, 1, 90deg)',
                'opacity': 0
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rotateOutUpRight'
    };

    var rubberBand = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'scale3d(1, 1, 1)'
            },
            {
                'offset': 0.3,
                'transform': 'scale3d(1.25, 0.75, 1)'
            },
            {
                'offset': 0.4,
                'transform': 'scale3d(0.75, 1.25, 1)'
            },
            {
                'offset': 0.5,
                'transform': 'scale3d(1.15, 0.85, 1)'
            },
            {
                'offset': 0.65,
                'transform': 'scale3d(.95, 1.05, 1)'
            },
            {
                'offset': 0.75,
                'transform': 'scale3d(1.05, .95, 1)'
            },
            {
                'offset': 1,
                'transform': 'scale3d(1, 1, 1)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'rubberBand'
    };

    var shake = {
        'keyframes': [
            {
                'transform': 'translate3d(0, 0, 0)'
            },
            {
                'transform': 'translate3d(-10px, 0, 0)'
            },
            {
                'transform': 'translate3d(10px, 0, 0)'
            },
            {
                'transform': 'translate3d(-10px, 0, 0)'
            },
            {
                'transform': 'translate3d(10px, 0, 0)'
            },
            {
                'transform': 'translate3d(-10px, 0, 0)'
            },
            {
                'transform': 'translate3d(10px, 0, 0)'
            },
            {
                'transform': 'translate3d(-10px, 0, 0)'
            },
            {
                'transform': 'translate3d(10px, 0, 0)'
            },
            {
                'transform': 'translate3d(-10px, 0, 0)'
            },
            {
                'transform': 'translate3d(0, 0, 0)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'shake'
    };

    var slideInDown = {
        'keyframes': [
            {
                'transform': 'translate3d(0, -100%, 0)',
                'visibility': 'hidden'
            },
            {
                'transform': 'translate3d(0, 0, 0)',
                'visibility': 'visible'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'slideInDown'
    };

    var slideInLeft = {
        'keyframes': [
            {
                'transform': 'translate3d(-100%, 0, 0)',
                'visibility': 'hidden'
            },
            {
                'transform': 'translate3d(0, 0, 0)',
                'visibility': 'visible'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'slideInLeft'
    };

    var slideInRight = {
        'keyframes': [
            {
                'transform': 'translate3d(100%, 0, 0)',
                'visibility': 'hidden'
            },
            {
                'transform': 'translate3d(0, 0, 0)',
                'visibility': 'visible'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'slideInRight'
    };

    var slideInUp = {
        'keyframes': [
            {
                'transform': 'translate3d(0, 100%, 0)',
                'visibility': 'hidden'
            },
            {
                'transform': 'translate3d(0, 0, 0)',
                'visibility': 'visible'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'slideInUp'
    };

    var slideOutDown = {
        'keyframes': [
            {
                'transform': 'translate3d(0, 0, 0)',
                'visibility': 'visible'
            },
            {
                'visibility': 'hidden',
                'transform': 'translate3d(0, 100%, 0)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'slideOutDown'
    };

    var slideOutLeft = {
        'keyframes': [
            {
                'visibility': 'visible',
                'transform': 'translate3d(0, 0, 0)'
            },
            {
                'visibility': 'hidden',
                'transform': 'translate3d(-100%, 0, 0)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'slideOutLeft'
    };

    var slideOutRight = {
        'keyframes': [
            {
                'visibility': 'visible',
                'transform': 'translate3d(0, 0, 0)'
            },
            {
                'visibility': 'hidden',
                'transform': 'translate3d(100%, 0, 0)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'slideOutRight'
    };

    var slideOutUp = {
        'keyframes': [
            {
                'visibility': 'visible',
                'transform': 'translate3d(0, 0, 0)'
            },
            {
                'visibility': 'hidden',
                'transform': 'translate3d(0, -100%, 0)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'slideOutUp'
    };

    var swing = {
        'keyframes': [
            {
                'transform': 'none'
            },
            {
                'transform': 'rotate3d(0, 0, 1, 15deg)'
            },
            {
                'transform': 'rotate3d(0, 0, 1, -10deg)'
            },
            {
                'transform': 'rotate3d(0, 0, 1, 5deg)'
            },
            {
                'transform': 'rotate3d(0, 0, 1, -5deg)'
            },
            {
                'transform': 'rotate3d(0, 0, 1, 0deg)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'swing'
    };

    var tada = {
        'keyframes': [
            {
                'transform': 'scale3d(1, 1, 1)'
            },
            {
                'transform': 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)'
            },
            {
                'transform': 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)'
            },
            {
                'transform': 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
            },
            {
                'transform': 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
            },
            {
                'transform': 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
            },
            {
                'transform': 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
            },
            {
                'transform': 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
            },
            {
                'transform': 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
            },
            {
                'transform': 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
            },
            {
                'transform': 'scale3d(1, 1, 1)'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'tada'
    };

    var wobble = {
        'keyframes': [
            {
                'offset': 0,
                'transform': 'none'
            },
            {
                'offset': 0.15,
                'transform': 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)'
            },
            {
                'offset': 0.3,
                'transform': 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)'
            },
            {
                'offset': 0.45,
                'transform': 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)'
            },
            {
                'offset': 0.6,
                'transform': 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)'
            },
            {
                'offset': 0.75,
                'transform': 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)'
            },
            {
                'offset': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1000
        },
        'name': 'wobble'
    };

    var zoomIn = {
        'keyframes': [
            {
                'opacity': 0,
                'transform': 'scale3d(.3, .3, .3)'
            },
            {
                'opacity': 1
            },
            {
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomIn'
    };

    var zoomInDown = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 0,
                'transform': 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)'
            },
            {
                'offset': 0.6,
                'opacity': 1,
                'transform': 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)'
            },
            {
                'offset': 1,
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'easeInCubic'
        },
        'name': 'zoomInDown'
    };

    var zoomInLeft = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 0,
                'transform': 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)'
            },
            {
                'offset': 0.6,
                'opacity': 1,
                'transform': 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)'
            },
            {
                'offset': 1,
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomInLeft'
    };

    var zoomInRight = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 0,
                'transform': 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)'
            },
            {
                'offset': 0.6,
                'opacity': 1,
                'transform': 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)'
            },
            {
                'offset': 1,
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomInRight'
    };

    var zoomInUp = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 0,
                'transform': 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)'
            },
            {
                'offset': 0.6,
                'opacity': 1,
                'transform': 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)'
            },
            {
                'offset': 1,
                'opacity': 1,
                'transform': 'none'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomInUp'
    };

    var zoomOut = {
        'keyframes': [
            {
                'opacity': 1,
                'transform': 'none',
                'transform-origin': 'center middle'
            },
            {
                'opacity': 0,
                'transform': 'scale3d(.3, .3, .3)'
            },
            {
                'opacity': 0,
                'transform': 'none',
                'transform-origin': 'center middle'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomOut'
    };

    var zoomOutDown = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none',
                'transform-origin': 'center bottom'
            },
            {
                'offset': 0.4,
                'opacity': 1,
                'transform': 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
                'transform-origin': 'center bottom'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)',
                'transform-origin': 'center bottom'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomOutDown'
    };

    var zoomOutLeft = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none',
                'transform-origin': 'left center'
            },
            {
                'offset': 0.4,
                'opacity': 1,
                'transform': 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'scale(.1) translate3d(-2000px, 0, 0)',
                'transform-origin': 'left center'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomOutLeft'
    };

    var zoomOutRight = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none',
                'transform-origin': 'right center'
            },
            {
                'offset': 0.4,
                'opacity': 1,
                'transform': 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'scale(.1) translate3d(2000px, 0, 0)',
                'transform-origin': 'right center'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomOutRight'
    };

    var zoomOutUp = {
        'keyframes': [
            {
                'offset': 0,
                'opacity': 1,
                'transform': 'none',
                'transform-origin': 'center bottom'
            },
            {
                'offset': 0.4,
                'opacity': 1,
                'transform': 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)'
            },
            {
                'offset': 1,
                'opacity': 0,
                'transform': 'scale3d(.1, .1, .1) translate3d(0, -2000px, 0)',
                'transform-origin': 'center bottom'
            }
        ],
        'timings': {
            'duration': 1000,
            'easing': 'elegantSlowStartEnd'
        },
        'name': 'zoomOutUp'
    };

    var ANIMATE_CSS = [
        bounce,
        bounceIn,
        bounceInDown,
        bounceInLeft,
        bounceInRight,
        bounceInUp,
        bounceOut,
        bounceOutDown,
        bounceOutLeft,
        bounceOutRight,
        bounceOutUp,
        fadeIn,
        fadeInDown,
        fadeInDownBig,
        fadeInLeft,
        fadeInLeftBig,
        fadeInRight,
        fadeInRightBig,
        fadeInUp,
        fadeInUpBig,
        fadeOut,
        fadeOutDown,
        fadeOutDownBig,
        fadeOutLeft,
        fadeOutLeftBig,
        fadeOutRight,
        fadeOutRightBig,
        fadeOutUp,
        fadeOutUpBig,
        flash,
        flip,
        flipInX,
        flipInY,
        flipOutX,
        flipOutY,
        headShake,
        hinge,
        jello,
        lightSpeedIn,
        lightSpeedOut,
        pulse,
        rollIn,
        rollOut,
        rotateIn,
        rotateInDownLeft,
        rotateInDownRight,
        rotateInUpLeft,
        rotateInUpRight,
        rotateOut,
        rotateOutDownLeft,
        rotateOutDownRight,
        rotateOutUpLeft,
        rotateOutUpRight,
        rubberBand,
        shake,
        slideInDown,
        slideInLeft,
        slideInRight,
        slideInUp,
        slideOutDown,
        slideOutLeft,
        slideOutRight,
        slideOutUp,
        swing,
        tada,
        wobble,
        zoomIn,
        zoomInDown,
        zoomInLeft,
        zoomInRight,
        zoomInUp,
        zoomOut,
        zoomOutDown,
        zoomOutLeft,
        zoomOutRight,
        zoomOutUp
    ];

    Just.inject(ANIMATE_CSS);

}());