(function () {
'use strict';

var bounce = {
    css: [
        {
            easing: 'easeOutCubic',
            offset: [0, .2, .53, .80, 1],
            transformOrigin: 'center bottom',
            y: 0
        },
        {
            easing: 'easeInQuint',
            offset: [.4, .43],
            y: '-30px'
        },
        {
            easing: 'easeInQuint',
            offset: .7,
            y: '-15px'
        },
        {
            offset: .9,
            y: '-4px'
        }
    ],
    fill: 'both',
    name: 'bounce',
    to: 1000
};

var bounceIn = {
    name: 'bounceIn',
    css: [
        {
            opacity: 0,
            scale: .3
        },
        {
            scale: 1.1
        },
        {
            scale: .9
        },
        {
            opacity: 1,
            scale: 1.03
        },
        {
            scale: .97
        },
        {
            opacity: 1,
            scale: 1
        }
    ],
    to: 900,
    fill: 'both',
    easing: 'easeOutCubic'
};

var bounceInDown = {
    css: [
        {
            offset: 0,
            opacity: 0,
            y: '-3000px'
        },
        {
            offset: 0.6,
            opacity: 1,
            y: '25px'
        },
        {
            offset: 0.75,
            opacity: 1,
            y: '-10px'
        },
        {
            offset: 0.9,
            opacity: 1,
            y: '5px'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 900,
    fill: 'both',
    easing: 'easeOutCubic',
    name: 'bounceInDown'
};

var bounceInLeft = {
    css: [
        {
            offset: 0,
            opacity: 0,
            transform: 'translate3d(-3000px, 0, 0)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'translate3d(25px, 0, 0)'
        },
        {
            offset: 0.75,
            opacity: 1,
            transform: 'translate3d(-10px, 0, 0)'
        },
        {
            offset: 0.9,
            opacity: 1,
            transform: 'translate3d(5px, 0, 0)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 900,
    fill: 'both',
    easing: 'easeOutCubic',
    name: 'bounceInLeft'
};

var bounceInRight = {
    css: [
        {
            offset: 0,
            opacity: 0,
            transform: 'translate3d(3000px, 0, 0)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'translate3d(-25px, 0, 0)'
        },
        {
            offset: 0.75,
            transform: 'translate3d(10px, 0, 0)'
        },
        {
            offset: 0.9,
            transform: 'translate3d(-5px, 0, 0)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 900,
    fill: 'both',
    easing: 'easeOutCubic',
    name: 'bounceInRight'
};

var bounceInUp = {
    css: [
        {
            offset: 0,
            opacity: 0,
            transform: 'translate3d(0, 3000px, 0)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'translate3d(0, -20px, 0)'
        },
        {
            offset: 0.75,
            opacity: 1,
            transform: 'translate3d(0, 10px, 0)'
        },
        {
            offset: 0.9,
            opacity: 1,
            transform: 'translate3d(0, -5px, 0)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        }
    ],
    to: 900,
    fill: 'both',
    easing: 'easeOutCubic',
    name: 'bounceInUp'
};

var bounceOut = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none'
        },
        {
            offset: 0.2,
            transform: 'scale3d(.9, .9, .9)'
        },
        {
            offset: 0.5,
            opacity: 1,
            transform: 'scale3d(1.1, 1.1, 1.1)'
        },
        {
            offset: 0.55,
            opacity: 1,
            transform: 'scale3d(1.1, 1.1, 1.1)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale3d(.3, .3, .3)'
        }
    ],
    fill: 'both',
    name: 'bounceOut',
    to: 900
};

var bounceOutDown = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none'
        },
        {
            offset: 0.2,
            transform: 'translate3d(0, 10px, 0)'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'translate3d(0, -20px, 0)'
        },
        {
            offset: 0.45,
            opacity: 1,
            transform: 'translate3d(0, -20px, 0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translate3d(0, 2000px, 0)'
        }
    ],
    to: 900,
    fill: 'both',
    name: 'bounceOutDown'
};

var bounceOutLeft = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none'
        },
        {
            offset: 0.2,
            opacity: 1,
            transform: 'translate3d(20px, 0, 0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translate3d(-2000px, 0, 0)'
        }
    ],
    to: 900,
    fill: 'both',
    name: 'bounceOutLeft'
};

var bounceOutRight = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none'
        },
        {
            offset: 0.2,
            opacity: 1,
            transform: 'translate3d(-20px, 0, 0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translate3d(2000px, 0, 0)'
        }
    ],
    to: 900,
    fill: 'both',
    name: 'bounceOutRight'
};

var bounceOutUp = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none'
        },
        {
            offset: 0.2,
            opacity: 1,
            transform: 'translate3d(0, -10px, 0)'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'translate3d(0, 20px, 0)'
        },
        {
            offset: 0.45,
            opacity: 1,
            transform: 'translate3d(0, 20px, 0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translate3d(0, -2000px, 0)'
        }
    ],
    to: 900,
    fill: 'both',
    name: 'bounceOutUp'
};

var fadeIn = {
    css: {
        opacity: [0, 1]
    },
    easing: 'ease-in',
    fill: 'both',
    name: 'fadeIn',
    to: 650
};

var fadeInDown = {
    css: {
        opacity: [0, 1],
        y: ['-100%', 0]
    },
    fill: 'both',
    name: 'fadeInDown',
    to: 650
};

var fadeInDownBig = {
    css: {
        opacity: [0, 1],
        y: ['-2000px', 0]
    },
    easing: 'ease-out',
    fill: 'both',
    name: 'fadeInDownBig',
    to: 1300
};

var fadeInLeft = {
    css: [
        {
            opacity: 0,
            transform: 'translate3d(-100%, 0, 0)'
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 650,
    fill: 'both',
    easing: 'ease-in',
    name: 'fadeInLeft'
};

var fadeInLeftBig = {
    css: [
        {
            opacity: 0,
            transform: 'translate3d(-2000px, 0, 0)'
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1300,
    fill: 'both',
    easing: 'ease-out',
    name: 'fadeInLeftBig'
};

var fadeInRight = {
    css: [
        {
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)'
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 650,
    fill: 'both',
    easing: 'ease-in',
    name: 'fadeInRight'
};

var fadeInRightBig = {
    css: [
        {
            opacity: 0,
            transform: 'translate3d(2000px, 0, 0)'
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1300,
    fill: 'both',
    easing: 'ease-out',
    name: 'fadeInRightBig'
};

var fadeInUp = {
    css: [
        {
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)'
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 650,
    fill: 'both',
    easing: 'ease-in',
    name: 'fadeInUp'
};

var fadeInUpBig = {
    css: [
        {
            opacity: 0,
            transform: 'translate3d(0, 2000px, 0)'
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1300,
    fill: 'both',
    easing: 'ease-out',
    name: 'fadeInUpBig'
};

var fadeOut = {
    css: {
        opacity: [1, 0]
    },
    fill: 'both',
    name: 'fadeOut',
    to: 650
};

var fadeOutDown = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)'
        }
    ],
    to: 650,
    name: 'fadeOutDown'
};

var fadeOutDownBig = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(0, 2000px, 0)'
        }
    ],
    to: 1300,
    name: 'fadeOutDownBig'
};

var fadeOutLeft = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(-100%, 0, 0)'
        }
    ],
    to: 650,
    name: 'fadeOutLeft'
};

var fadeOutLeftBig = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(-2000px, 0, 0)'
        }
    ],
    to: 1300,
    name: 'fadeOutLeftBig'
};

var fadeOutRight = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)'
        }
    ],
    to: 650,
    name: 'fadeOutRight'
};

var fadeOutRightBig = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(2000px, 0, 0)'
        }
    ],
    to: 1300,
    name: 'fadeOutRightBig'
};

var fadeOutUp = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(0, -100%, 0)'
        }
    ],
    to: 650,
    name: 'fadeOutUp'
};

var fadeOutUpBig = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(0, -2000px, 0)'
        }
    ],
    to: 1300,
    name: 'fadeOutUpBig'
};

var flash = {
    css: [
        {
            opacity: 1
        },
        {
            opacity: 0
        },
        {
            opacity: 1
        },
        {
            opacity: 0
        },
        {
            opacity: 1
        }
    ],
    to: 1000,
    name: 'flash'
};

var flip = {
    css: [
        {
            offset: 0,
            transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)'
        },
        {
            offset: 0.4,
            transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)'
        },
        {
            offset: 0.5,
            transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)'
        },
        {
            offset: 0.8,
            transform: 'perspective(400px) scale3d(.95, .95, .95)'
        },
        {
            offset: 1,
            transform: 'perspective(400px)'
        }
    ],
    to: 1000,
    name: 'flip'
};

var flipInX = {
    css: [
        {
            offset: 0,
            transform: 'perspective(400px)',
            rotateX: '90deg',
            opacity: 0
        },
        {
            offset: 0.4,
            transform: 'perspective(400px)',
            rotateX: '20deg'
        },
        {
            offset: 0.6,
            transform: 'perspective(400px)',
            rotateX: '10deg',
            opacity: 1
        },
        {
            offset: 0.8,
            transform: 'perspective(400px)',
            rotateX: '-5deg',
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'perspective(400px)'
        }
    ],
    to: 750,
    name: 'flipInX'
};

var flipInY = {
    css: [
        {
            offset: 0,
            transform: 'perspective(400px)',
            rotateY: '90deg',
            opacity: 0
        },
        {
            offset: 0.4,
            transform: 'perspective(400px)',
            rotateY: '-20deg',
        },
        {
            offset: 0.6,
            transform: 'perspective(400px)',
            rotateY: '10deg',
            opacity: 1
        },
        {
            offset: 0.8,
            transform: 'perspective(400px)',
            rotateY: '-5deg',
        },
        {
            offset: 1,
            transform: 'perspective(400px)',
            opacity: 1
        }
    ],
    to: 750,
    name: 'flipInY'
};

var flipOutX = {
    css: [
        {
            offset: 0,
            transform: 'perspective(400px)',
            opacity: 1
        },
        {
            offset: 0.3,
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            opacity: 1
        },
        {
            offset: 1,
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            opacity: 0
        }
    ],
    to: 750,
    name: 'flipOutX'
};

var flipOutY = {
    css: [
        {
            offset: 0,
            transform: 'perspective(400px)',
            opacity: 1
        },
        {
            offset: 0.3,
            transform: 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
            opacity: 1
        },
        {
            offset: 1,
            transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
            opacity: 0
        }
    ],
    to: 750,
    name: 'flipOutY'
};

var headShake = {
    css: [
        {
            offset: 0,
            translateX: '0'
        },
        {
            offset: 0.065,
            translateX: '-6px',
            rotateY: '-9deg'
        },
        {
            offset: 0.185,
            translateX: '5px',
            rotateY: '7deg'
        },
        {
            offset: 0.315,
            translateX: '-3px',
            rotateY: '-5deg'
        },
        {
            offset: 0.435,
            translateX: '2px',
            rotateY: '3deg'
        },
        {
            offset: 0.5,
            translateX: '0'
        },
        {
            offset: 1,
            translateX: '0'
        }
    ],
    to: 1000,
    easing: 'ease-out',
    name: 'headShake'
};

var hinge = {
    css: [
        {
            transform: 'none',
            transformOrigin: 'top left',
            opacity: 1
        },
        {
            transform: 'rotate3d(0, 0, 1, 80deg)',
            opacity: 1
        },
        {
            transform: 'rotate3d(0, 0, 1, 60deg)',
            opacity: 1
        },
        {
            transform: 'rotate3d(0, 0, 1, 80deg)',
            opacity: 0
        },
        {
            transform: 'rotate3d(0, 0, 1, 60deg)',
            opacity: 1
        },
        {
            transform: 'translate3d(0, 700px, 0)',
            transformOrigin: 'top left',
            opacity: 0
        }
    ],
    to: 2000,
    name: 'hinge'
};

var jello = {
    css: [
        {
            offset: 0,
            transform: 'none'
        },
        {
            offset: 0.111,
            transform: 'none'
        },
        {
            offset: 0.222,
            transform: 'skewX(-12.5deg) skewY(-12.5deg)'
        },
        {
            offset: 0.333,
            transform: 'skewX(6.25deg) skewY(6.25deg)'
        },
        {
            offset: 0.444,
            transform: 'skewX(-3.125deg) skewY(-3.125deg)'
        },
        {
            offset: 0.555,
            transform: 'skewX(1.5625deg) skewY(1.5625deg)'
        },
        {
            offset: 0.666,
            transform: 'skewX(-0.78125deg) skewY(-0.78125deg)'
        },
        {
            offset: 0.777,
            transform: 'skewX(0.390625deg) skewY(0.390625deg)'
        },
        {
            offset: 0.888,
            transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)'
        },
        {
            offset: 1,
            transform: 'none'
        }
    ],
    to: 1000,
    fill: 'both',
    easing: 'ease-in-out',
    name: 'jello'
};

var lightSpeedIn = {
    css: [
        {
            offset: 0,
            transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
            opacity: 0
        },
        {
            offset: 0.6,
            transform: 'skewX(20deg)',
            opacity: 1
        },
        {
            offset: 0.8,
            transform: 'skewX(-5deg)',
            opacity: 1
        },
        {
            offset: 1,
            transform: 'none',
            opacity: 1
        }
    ],
    to: 1000,
    fill: 'both',
    easing: 'ease-out',
    name: 'lightSpeedIn'
};

var lightSpeedOut = {
    css: [
        {
            transform: 'none',
            opacity: 1
        },
        {
            transform: 'translate3d(100%, 0, 0) skewX(30deg)',
            opacity: 0
        }
    ],
    to: 1000,
    fill: 'both',
    easing: 'ease-in',
    name: 'lightSpeedOut'
};

var pulse = {
    css: [
        {
            transform: 'scale3d(1, 1, 1)'
        },
        {
            transform: 'scale3d(1.05, 1.05, 1.05)'
        },
        {
            transform: 'scale3d(1, 1, 1)'
        }
    ],
    to: 1000,
    name: 'pulse'
};

var rollIn = {
    css: [
        {
            opacity: 0,
            transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)'
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1000,
    name: 'rollIn'
};

var rollOut = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)'
        }
    ],
    to: 1000,
    name: 'rollOut'
};

var rotateIn = {
    css: [
        {
            transformOrigin: 'center',
            transform: 'rotate3d(0, 0, 1, -200deg)',
            opacity: 0
        },
        {
            transformOrigin: 'center',
            transform: 'none',
            opacity: 1
        }
    ],
    to: 1000,
    name: 'rotateIn'
};

var rotateInDownLeft = {
    css: [
        {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: 0
        },
        {
            transformOrigin: 'left bottom',
            transform: 'none',
            opacity: 1
        }
    ],
    to: 1000,
    name: 'rotateInDownLeft'
};

var rotateInDownRight = {
    css: [
        {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: 0
        },
        {
            transformOrigin: 'right bottom',
            transform: 'none',
            opacity: 1
        }
    ],
    to: 1000,
    name: 'rotateInDownRight'
};

var rotateInUpLeft = {
    css: [
        {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: 0
        },
        {
            transformOrigin: 'left bottom',
            transform: 'none',
            opacity: 1
        }
    ],
    to: 1000,
    name: 'rotateInUpLeft'
};

var rotateInUpRight = {
    css: [
        {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, -90deg)',
            opacity: 0
        },
        {
            transformOrigin: 'right bottom',
            transform: 'none',
            opacity: 1
        }
    ],
    to: 1000,
    name: 'rotateInUpRight'
};

var rotateOut = {
    css: [
        {
            transformOrigin: 'center',
            transform: 'none',
            opacity: 1
        },
        {
            transformOrigin: 'center',
            transform: 'rotate3d(0, 0, 1, 200deg)',
            opacity: 0
        }
    ],
    to: 1000,
    name: 'rotateOut'
};

var rotateOutDownLeft = {
    css: [
        {
            transformOrigin: 'left bottom',
            transform: 'none',
            opacity: 1
        },
        {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: 0
        }
    ],
    to: 1000,
    name: 'rotateOutDownLeft'
};

var rotateOutDownRight = {
    css: [
        {
            transformOrigin: 'right bottom',
            transform: 'none',
            opacity: 1
        },
        {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: 0
        }
    ],
    to: 1000,
    name: 'rotateOutDownRight'
};

var rotateOutUpLeft = {
    css: [
        {
            transformOrigin: 'left bottom',
            transform: 'none',
            opacity: 1
        },
        {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: 0
        }
    ],
    to: 1000,
    name: 'rotateOutUpLeft'
};

var rotateOutUpRight = {
    css: [
        {
            transformOrigin: 'right bottom',
            transform: 'none',
            opacity: 1
        },
        {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, 90deg)',
            opacity: 0
        }
    ],
    to: 1000,
    name: 'rotateOutUpRight'
};

var rubberBand = {
    css: [
        {
            offset: 0,
            transform: 'scale3d(1, 1, 1)'
        },
        {
            offset: 0.3,
            transform: 'scale3d(1.25, 0.75, 1)'
        },
        {
            offset: 0.4,
            transform: 'scale3d(0.75, 1.25, 1)'
        },
        {
            offset: 0.5,
            transform: 'scale3d(1.15, 0.85, 1)'
        },
        {
            offset: 0.65,
            transform: 'scale3d(.95, 1.05, 1)'
        },
        {
            offset: 0.75,
            transform: 'scale3d(1.05, .95, 1)'
        },
        {
            offset: 1,
            transform: 'scale3d(1, 1, 1)'
        }
    ],
    name: 'rubberBand',
    to: 1000
};

var shake = {
    css: [
        {
            transform: 'translate3d(0, 0, 0)'
        },
        {
            transform: 'translate3d(-10px, 0, 0)'
        },
        {
            transform: 'translate3d(10px, 0, 0)'
        },
        {
            transform: 'translate3d(-10px, 0, 0)'
        },
        {
            transform: 'translate3d(10px, 0, 0)'
        },
        {
            transform: 'translate3d(-10px, 0, 0)'
        },
        {
            transform: 'translate3d(10px, 0, 0)'
        },
        {
            transform: 'translate3d(-10px, 0, 0)'
        },
        {
            transform: 'translate3d(10px, 0, 0)'
        },
        {
            transform: 'translate3d(-10px, 0, 0)'
        },
        {
            transform: 'translate3d(0, 0, 0)'
        }
    ],
    to: 1000,
    name: 'shake'
};

var slideInDown = {
    css: [
        {
            transform: 'translate3d(0, -100%, 0)',
            visibility: 'hidden'
        },
        {
            transform: 'translate3d(0, 0, 0)',
            visibility: 'visible'
        }
    ],
    to: 1000,
    name: 'slideInDown'
};

var slideInLeft = {
    css: [
        {
            transform: 'translate3d(-100%, 0, 0)',
            visibility: 'hidden'
        },
        {
            transform: 'translate3d(0, 0, 0)',
            visibility: 'visible'
        }
    ],
    to: 1000,
    name: 'slideInLeft'
};

var slideInRight = {
    css: [
        {
            transform: 'translate3d(100%, 0, 0)',
            visibility: 'hidden'
        },
        {
            transform: 'translate3d(0, 0, 0)',
            visibility: 'visible'
        }
    ],
    to: 1000,
    name: 'slideInRight'
};

var slideInUp = {
    css: [
        {
            transform: 'translate3d(0, 100%, 0)',
            visibility: 'hidden'
        },
        {
            transform: 'translate3d(0, 0, 0)',
            visibility: 'visible'
        }
    ],
    to: 1000,
    name: 'slideInUp'
};

var slideOutDown = {
    css: [
        {
            transform: 'translate3d(0, 0, 0)',
            visibility: 'visible'
        },
        {
            visibility: 'hidden',
            transform: 'translate3d(0, 100%, 0)'
        }
    ],
    to: 1000,
    name: 'slideOutDown'
};

var slideOutLeft = {
    css: [
        {
            visibility: 'visible',
            transform: 'translate3d(0, 0, 0)'
        },
        {
            visibility: 'hidden',
            transform: 'translate3d(-100%, 0, 0)'
        }
    ],
    to: 1000,
    name: 'slideOutLeft'
};

var slideOutRight = {
    css: [
        {
            visibility: 'visible',
            transform: 'translate3d(0, 0, 0)'
        },
        {
            visibility: 'hidden',
            transform: 'translate3d(100%, 0, 0)'
        }
    ],
    to: 1000,
    name: 'slideOutRight'
};

var slideOutUp = {
    css: [
        {
            visibility: 'visible',
            transform: 'translate3d(0, 0, 0)'
        },
        {
            visibility: 'hidden',
            transform: 'translate3d(0, -100%, 0)'
        }
    ],
    to: 1000,
    name: 'slideOutUp'
};

var swing = {
    css: [
        {
            transform: 'none'
        },
        {
            transform: 'rotate3d(0, 0, 1, 15deg)'
        },
        {
            transform: 'rotate3d(0, 0, 1, -10deg)'
        },
        {
            transform: 'rotate3d(0, 0, 1, 5deg)'
        },
        {
            transform: 'rotate3d(0, 0, 1, -5deg)'
        },
        {
            transform: 'rotate3d(0, 0, 1, 0deg)'
        }
    ],
    to: 1000,
    name: 'swing'
};

var tada = {
    css: [
        {
            transform: 'scale3d(1, 1, 1)'
        },
        {
            transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)'
        },
        {
            transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)'
        },
        {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
        },
        {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
        },
        {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
        },
        {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
        },
        {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
        },
        {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
        },
        {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
        },
        {
            transform: 'scale3d(1, 1, 1)'
        }
    ],
    to: 1000,
    name: 'tada'
};

var wobble = {
    css: [
        {
            offset: 0,
            transform: 'none'
        },
        {
            offset: 0.15,
            transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)'
        },
        {
            offset: 0.3,
            transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)'
        },
        {
            offset: 0.45,
            transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)'
        },
        {
            offset: 0.6,
            transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)'
        },
        {
            offset: 0.75,
            transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)'
        },
        {
            offset: 1,
            transform: 'none'
        }
    ],
    to: 1000,
    name: 'wobble'
};

var zoomIn = {
    css: [
        {
            opacity: 0,
            transform: 'scale3d(.3, .3, .3)'
        },
        {
            opacity: 1
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomIn'
};

var zoomInDown = {
    css: [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1000,
    easing: 'easeInCubic',
    name: 'zoomInDown'
};

var zoomInLeft = {
    css: [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomInLeft'
};

var zoomInRight = {
    css: [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomInRight'
};

var zoomInUp = {
    css: [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'none'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomInUp'
};

var zoomOut = {
    css: [
        {
            opacity: 1,
            transform: 'none',
            transformOrigin: 'center middle'
        },
        {
            opacity: 0,
            transform: 'scale3d(.3, .3, .3)'
        },
        {
            opacity: 0,
            transform: 'none',
            transformOrigin: 'center middle'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomOut'
};

var zoomOutDown = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none',
            transformOrigin: 'center bottom'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
            transformOrigin: 'center bottom'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)',
            transformOrigin: 'center bottom'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomOutDown'
};

var zoomOutLeft = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none',
            transformOrigin: 'left center'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale(.1) translate3d(-2000px, 0, 0)',
            transformOrigin: 'left center'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomOutLeft'
};

var zoomOutRight = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none',
            transformOrigin: 'right center'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale(.1) translate3d(2000px, 0, 0)',
            transformOrigin: 'right center'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomOutRight'
};

var zoomOutUp = {
    css: [
        {
            offset: 0,
            opacity: 1,
            transform: 'none',
            transformOrigin: 'center bottom'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale3d(.1, .1, .1) translate3d(0, -2000px, 0)',
            transformOrigin: 'center bottom'
        }
    ],
    to: 1000,
    easing: 'elegantSlowStartEnd',
    name: 'zoomOutUp'
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

just.inject(ANIMATE_CSS);

}());
