System.register("just-animate/animations/bounce", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var bounce;
    return {
        setters: [],
        execute: function () {
            exports_1("bounce", bounce = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceIn", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var bounceIn;
    return {
        setters: [],
        execute: function () {
            exports_2("bounceIn", bounceIn = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceInDown", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var bounceInDown;
    return {
        setters: [],
        execute: function () {
            exports_3("bounceInDown", bounceInDown = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceInLeft", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var bounceInLeft;
    return {
        setters: [],
        execute: function () {
            exports_4("bounceInLeft", bounceInLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceInRight", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var bounceInRight;
    return {
        setters: [],
        execute: function () {
            exports_5("bounceInRight", bounceInRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceInUp", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var bounceInUp;
    return {
        setters: [],
        execute: function () {
            exports_6("bounceInUp", bounceInUp = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceOut", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var bounceOut;
    return {
        setters: [],
        execute: function () {
            exports_7("bounceOut", bounceOut = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceOutDown", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var bounceOutDown;
    return {
        setters: [],
        execute: function () {
            exports_8("bounceOutDown", bounceOutDown = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceOutLeft", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var bounceOutLeft;
    return {
        setters: [],
        execute: function () {
            exports_9("bounceOutLeft", bounceOutLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceOutRight", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var bounceOutRight;
    return {
        setters: [],
        execute: function () {
            exports_10("bounceOutRight", bounceOutRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/bounceOutUp", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var bounceOutUp;
    return {
        setters: [],
        execute: function () {
            exports_11("bounceOutUp", bounceOutUp = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeIn", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var fadeIn;
    return {
        setters: [],
        execute: function () {
            exports_12("fadeIn", fadeIn = {
                css: {
                    opacity: [0, 1]
                },
                easing: 'ease-in',
                fill: 'both',
                name: 'fadeIn',
                to: 650
            });
        }
    };
});
System.register("just-animate/animations/fadeInDown", [], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var fadeInDown;
    return {
        setters: [],
        execute: function () {
            exports_13("fadeInDown", fadeInDown = {
                css: {
                    opacity: [0, 1],
                    y: ['-100%', 0]
                },
                fill: 'both',
                name: 'fadeInDown',
                to: 650
            });
        }
    };
});
System.register("just-animate/animations/fadeInDownBig", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var fadeInDownBig;
    return {
        setters: [],
        execute: function () {
            exports_14("fadeInDownBig", fadeInDownBig = {
                css: {
                    opacity: [0, 1],
                    y: ['-2000px', 0]
                },
                easing: 'ease-out',
                fill: 'both',
                name: 'fadeInDownBig',
                to: 1300
            });
        }
    };
});
System.register("just-animate/animations/fadeInLeft", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var fadeInLeft;
    return {
        setters: [],
        execute: function () {
            exports_15("fadeInLeft", fadeInLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeInLeftBig", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var fadeInLeftBig;
    return {
        setters: [],
        execute: function () {
            exports_16("fadeInLeftBig", fadeInLeftBig = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeInRight", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var fadeInRight;
    return {
        setters: [],
        execute: function () {
            exports_17("fadeInRight", fadeInRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeInRightBig", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var fadeInRightBig;
    return {
        setters: [],
        execute: function () {
            exports_18("fadeInRightBig", fadeInRightBig = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeInUp", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var fadeInUp;
    return {
        setters: [],
        execute: function () {
            exports_19("fadeInUp", fadeInUp = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeInUpBig", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var fadeInUpBig;
    return {
        setters: [],
        execute: function () {
            exports_20("fadeInUpBig", fadeInUpBig = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeOut", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var fadeOut;
    return {
        setters: [],
        execute: function () {
            exports_21("fadeOut", fadeOut = {
                css: {
                    opacity: [1, 0]
                },
                fill: 'both',
                name: 'fadeOut',
                to: 650
            });
        }
    };
});
System.register("just-animate/animations/fadeOutDown", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var fadeOutDown;
    return {
        setters: [],
        execute: function () {
            exports_22("fadeOutDown", fadeOutDown = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeOutDownBig", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var fadeOutDownBig;
    return {
        setters: [],
        execute: function () {
            exports_23("fadeOutDownBig", fadeOutDownBig = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeOutLeft", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var fadeOutLeft;
    return {
        setters: [],
        execute: function () {
            exports_24("fadeOutLeft", fadeOutLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeOutLeftBig", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var fadeOutLeftBig;
    return {
        setters: [],
        execute: function () {
            exports_25("fadeOutLeftBig", fadeOutLeftBig = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeOutRight", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var fadeOutRight;
    return {
        setters: [],
        execute: function () {
            exports_26("fadeOutRight", fadeOutRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeOutRightBig", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var fadeOutRightBig;
    return {
        setters: [],
        execute: function () {
            exports_27("fadeOutRightBig", fadeOutRightBig = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeOutUp", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var fadeOutUp;
    return {
        setters: [],
        execute: function () {
            exports_28("fadeOutUp", fadeOutUp = {
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
            });
        }
    };
});
System.register("just-animate/animations/fadeOutUpBig", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var fadeOutUpBig;
    return {
        setters: [],
        execute: function () {
            exports_29("fadeOutUpBig", fadeOutUpBig = {
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
            });
        }
    };
});
System.register("just-animate/animations/flash", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var flash;
    return {
        setters: [],
        execute: function () {
            exports_30("flash", flash = {
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
            });
        }
    };
});
System.register("just-animate/animations/flip", [], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var flip;
    return {
        setters: [],
        execute: function () {
            exports_31("flip", flip = {
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
            });
        }
    };
});
System.register("just-animate/animations/flipInX", [], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var flipInX;
    return {
        setters: [],
        execute: function () {
            exports_32("flipInX", flipInX = {
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
            });
        }
    };
});
System.register("just-animate/animations/flipInY", [], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var flipInY;
    return {
        setters: [],
        execute: function () {
            exports_33("flipInY", flipInY = {
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
            });
        }
    };
});
System.register("just-animate/animations/flipOutX", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var flipOutX;
    return {
        setters: [],
        execute: function () {
            exports_34("flipOutX", flipOutX = {
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
            });
        }
    };
});
System.register("just-animate/animations/flipOutY", [], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var flipOutY;
    return {
        setters: [],
        execute: function () {
            exports_35("flipOutY", flipOutY = {
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
            });
        }
    };
});
System.register("just-animate/animations/headShake", [], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var headShake;
    return {
        setters: [],
        execute: function () {
            exports_36("headShake", headShake = {
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
            });
        }
    };
});
System.register("just-animate/animations/hinge", [], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var hinge;
    return {
        setters: [],
        execute: function () {
            exports_37("hinge", hinge = {
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
            });
        }
    };
});
System.register("just-animate/animations/jello", [], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var jello;
    return {
        setters: [],
        execute: function () {
            exports_38("jello", jello = {
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
            });
        }
    };
});
System.register("just-animate/animations/lightSpeedIn", [], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var lightSpeedIn;
    return {
        setters: [],
        execute: function () {
            exports_39("lightSpeedIn", lightSpeedIn = {
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
            });
        }
    };
});
System.register("just-animate/animations/lightSpeedOut", [], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var lightSpeedOut;
    return {
        setters: [],
        execute: function () {
            exports_40("lightSpeedOut", lightSpeedOut = {
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
            });
        }
    };
});
System.register("just-animate/animations/pulse", [], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var pulse;
    return {
        setters: [],
        execute: function () {
            exports_41("pulse", pulse = {
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
            });
        }
    };
});
System.register("just-animate/animations/rollIn", [], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var rollIn;
    return {
        setters: [],
        execute: function () {
            exports_42("rollIn", rollIn = {
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
            });
        }
    };
});
System.register("just-animate/animations/rollOut", [], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var rollOut;
    return {
        setters: [],
        execute: function () {
            exports_43("rollOut", rollOut = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateIn", [], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var rotateIn;
    return {
        setters: [],
        execute: function () {
            exports_44("rotateIn", rotateIn = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateInDownLeft", [], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var rotateInDownLeft;
    return {
        setters: [],
        execute: function () {
            exports_45("rotateInDownLeft", rotateInDownLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateInDownRight", [], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var rotateInDownRight;
    return {
        setters: [],
        execute: function () {
            exports_46("rotateInDownRight", rotateInDownRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateInUpLeft", [], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var rotateInUpLeft;
    return {
        setters: [],
        execute: function () {
            exports_47("rotateInUpLeft", rotateInUpLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateInUpRight", [], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var rotateInUpRight;
    return {
        setters: [],
        execute: function () {
            exports_48("rotateInUpRight", rotateInUpRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateOut", [], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var rotateOut;
    return {
        setters: [],
        execute: function () {
            exports_49("rotateOut", rotateOut = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateOutDownLeft", [], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var rotateOutDownLeft;
    return {
        setters: [],
        execute: function () {
            exports_50("rotateOutDownLeft", rotateOutDownLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateOutDownRight", [], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var rotateOutDownRight;
    return {
        setters: [],
        execute: function () {
            exports_51("rotateOutDownRight", rotateOutDownRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateOutUpLeft", [], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var rotateOutUpLeft;
    return {
        setters: [],
        execute: function () {
            exports_52("rotateOutUpLeft", rotateOutUpLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/rotateOutUpRight", [], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var rotateOutUpRight;
    return {
        setters: [],
        execute: function () {
            exports_53("rotateOutUpRight", rotateOutUpRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/rubberBand", [], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var rubberBand;
    return {
        setters: [],
        execute: function () {
            exports_54("rubberBand", rubberBand = {
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
            });
        }
    };
});
System.register("just-animate/animations/shake", [], function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var shake;
    return {
        setters: [],
        execute: function () {
            exports_55("shake", shake = {
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
            });
        }
    };
});
System.register("just-animate/animations/slideInDown", [], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var slideInDown;
    return {
        setters: [],
        execute: function () {
            exports_56("slideInDown", slideInDown = {
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
            });
        }
    };
});
System.register("just-animate/animations/slideInLeft", [], function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var slideInLeft;
    return {
        setters: [],
        execute: function () {
            exports_57("slideInLeft", slideInLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/slideInRight", [], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var slideInRight;
    return {
        setters: [],
        execute: function () {
            exports_58("slideInRight", slideInRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/slideInUp", [], function (exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var slideInUp;
    return {
        setters: [],
        execute: function () {
            exports_59("slideInUp", slideInUp = {
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
            });
        }
    };
});
System.register("just-animate/animations/slideOutDown", [], function (exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var slideOutDown;
    return {
        setters: [],
        execute: function () {
            exports_60("slideOutDown", slideOutDown = {
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
            });
        }
    };
});
System.register("just-animate/animations/slideOutLeft", [], function (exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    var slideOutLeft;
    return {
        setters: [],
        execute: function () {
            exports_61("slideOutLeft", slideOutLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/slideOutRight", [], function (exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var slideOutRight;
    return {
        setters: [],
        execute: function () {
            exports_62("slideOutRight", slideOutRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/slideOutUp", [], function (exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var slideOutUp;
    return {
        setters: [],
        execute: function () {
            exports_63("slideOutUp", slideOutUp = {
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
            });
        }
    };
});
System.register("just-animate/animations/swing", [], function (exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var swing;
    return {
        setters: [],
        execute: function () {
            exports_64("swing", swing = {
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
            });
        }
    };
});
System.register("just-animate/animations/tada", [], function (exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
    var tada;
    return {
        setters: [],
        execute: function () {
            exports_65("tada", tada = {
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
            });
        }
    };
});
System.register("just-animate/animations/wobble", [], function (exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var wobble;
    return {
        setters: [],
        execute: function () {
            exports_66("wobble", wobble = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomIn", [], function (exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var zoomIn;
    return {
        setters: [],
        execute: function () {
            exports_67("zoomIn", zoomIn = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomInDown", [], function (exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    var zoomInDown;
    return {
        setters: [],
        execute: function () {
            exports_68("zoomInDown", zoomInDown = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomInLeft", [], function (exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var zoomInLeft;
    return {
        setters: [],
        execute: function () {
            exports_69("zoomInLeft", zoomInLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomInRight", [], function (exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var zoomInRight;
    return {
        setters: [],
        execute: function () {
            exports_70("zoomInRight", zoomInRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomInUp", [], function (exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var zoomInUp;
    return {
        setters: [],
        execute: function () {
            exports_71("zoomInUp", zoomInUp = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomOut", [], function (exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var zoomOut;
    return {
        setters: [],
        execute: function () {
            exports_72("zoomOut", zoomOut = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomOutDown", [], function (exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var zoomOutDown;
    return {
        setters: [],
        execute: function () {
            exports_73("zoomOutDown", zoomOutDown = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomOutLeft", [], function (exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    var zoomOutLeft;
    return {
        setters: [],
        execute: function () {
            exports_74("zoomOutLeft", zoomOutLeft = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomOutRight", [], function (exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    var zoomOutRight;
    return {
        setters: [],
        execute: function () {
            exports_75("zoomOutRight", zoomOutRight = {
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
            });
        }
    };
});
System.register("just-animate/animations/zoomOutUp", [], function (exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var zoomOutUp;
    return {
        setters: [],
        execute: function () {
            exports_76("zoomOutUp", zoomOutUp = {
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
            });
        }
    };
});
System.register("just-animate/animations", ["just-animate/animations/bounce", "just-animate/animations/bounceIn", "just-animate/animations/bounceInDown", "just-animate/animations/bounceInLeft", "just-animate/animations/bounceInRight", "just-animate/animations/bounceInUp", "just-animate/animations/bounceOut", "just-animate/animations/bounceOutDown", "just-animate/animations/bounceOutLeft", "just-animate/animations/bounceOutRight", "just-animate/animations/bounceOutUp", "just-animate/animations/fadeIn", "just-animate/animations/fadeInDown", "just-animate/animations/fadeInDownBig", "just-animate/animations/fadeInLeft", "just-animate/animations/fadeInLeftBig", "just-animate/animations/fadeInRight", "just-animate/animations/fadeInRightBig", "just-animate/animations/fadeInUp", "just-animate/animations/fadeInUpBig", "just-animate/animations/fadeOut", "just-animate/animations/fadeOutDown", "just-animate/animations/fadeOutDownBig", "just-animate/animations/fadeOutLeft", "just-animate/animations/fadeOutLeftBig", "just-animate/animations/fadeOutRight", "just-animate/animations/fadeOutRightBig", "just-animate/animations/fadeOutUp", "just-animate/animations/fadeOutUpBig", "just-animate/animations/flash", "just-animate/animations/flip", "just-animate/animations/flipInX", "just-animate/animations/flipInY", "just-animate/animations/flipOutX", "just-animate/animations/flipOutY", "just-animate/animations/headShake", "just-animate/animations/hinge", "just-animate/animations/jello", "just-animate/animations/lightSpeedIn", "just-animate/animations/lightSpeedOut", "just-animate/animations/pulse", "just-animate/animations/rollIn", "just-animate/animations/rollOut", "just-animate/animations/rotateIn", "just-animate/animations/rotateInDownLeft", "just-animate/animations/rotateInDownRight", "just-animate/animations/rotateInUpLeft", "just-animate/animations/rotateInUpRight", "just-animate/animations/rotateOut", "just-animate/animations/rotateOutDownLeft", "just-animate/animations/rotateOutDownRight", "just-animate/animations/rotateOutUpLeft", "just-animate/animations/rotateOutUpRight", "just-animate/animations/rubberBand", "just-animate/animations/shake", "just-animate/animations/slideInDown", "just-animate/animations/slideInLeft", "just-animate/animations/slideInRight", "just-animate/animations/slideInUp", "just-animate/animations/slideOutDown", "just-animate/animations/slideOutLeft", "just-animate/animations/slideOutRight", "just-animate/animations/slideOutUp", "just-animate/animations/swing", "just-animate/animations/tada", "just-animate/animations/wobble", "just-animate/animations/zoomIn", "just-animate/animations/zoomInDown", "just-animate/animations/zoomInLeft", "just-animate/animations/zoomInRight", "just-animate/animations/zoomInUp", "just-animate/animations/zoomOut", "just-animate/animations/zoomOutDown", "just-animate/animations/zoomOutLeft", "just-animate/animations/zoomOutRight", "just-animate/animations/zoomOutUp"], function (exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    var bounce_1, bounceIn_1, bounceInDown_1, bounceInLeft_1, bounceInRight_1, bounceInUp_1, bounceOut_1, bounceOutDown_1, bounceOutLeft_1, bounceOutRight_1, bounceOutUp_1, fadeIn_1, fadeInDown_1, fadeInDownBig_1, fadeInLeft_1, fadeInLeftBig_1, fadeInRight_1, fadeInRightBig_1, fadeInUp_1, fadeInUpBig_1, fadeOut_1, fadeOutDown_1, fadeOutDownBig_1, fadeOutLeft_1, fadeOutLeftBig_1, fadeOutRight_1, fadeOutRightBig_1, fadeOutUp_1, fadeOutUpBig_1, flash_1, flip_1, flipInX_1, flipInY_1, flipOutX_1, flipOutY_1, headShake_1, hinge_1, jello_1, lightSpeedIn_1, lightSpeedOut_1, pulse_1, rollIn_1, rollOut_1, rotateIn_1, rotateInDownLeft_1, rotateInDownRight_1, rotateInUpLeft_1, rotateInUpRight_1, rotateOut_1, rotateOutDownLeft_1, rotateOutDownRight_1, rotateOutUpLeft_1, rotateOutUpRight_1, rubberBand_1, shake_1, slideInDown_1, slideInLeft_1, slideInRight_1, slideInUp_1, slideOutDown_1, slideOutLeft_1, slideOutRight_1, slideOutUp_1, swing_1, tada_1, wobble_1, zoomIn_1, zoomInDown_1, zoomInLeft_1, zoomInRight_1, zoomInUp_1, zoomOut_1, zoomOutDown_1, zoomOutLeft_1, zoomOutRight_1, zoomOutUp_1, ANIMATE_CSS;
    return {
        setters: [
            function (bounce_1_1) {
                bounce_1 = bounce_1_1;
            },
            function (bounceIn_1_1) {
                bounceIn_1 = bounceIn_1_1;
            },
            function (bounceInDown_1_1) {
                bounceInDown_1 = bounceInDown_1_1;
            },
            function (bounceInLeft_1_1) {
                bounceInLeft_1 = bounceInLeft_1_1;
            },
            function (bounceInRight_1_1) {
                bounceInRight_1 = bounceInRight_1_1;
            },
            function (bounceInUp_1_1) {
                bounceInUp_1 = bounceInUp_1_1;
            },
            function (bounceOut_1_1) {
                bounceOut_1 = bounceOut_1_1;
            },
            function (bounceOutDown_1_1) {
                bounceOutDown_1 = bounceOutDown_1_1;
            },
            function (bounceOutLeft_1_1) {
                bounceOutLeft_1 = bounceOutLeft_1_1;
            },
            function (bounceOutRight_1_1) {
                bounceOutRight_1 = bounceOutRight_1_1;
            },
            function (bounceOutUp_1_1) {
                bounceOutUp_1 = bounceOutUp_1_1;
            },
            function (fadeIn_1_1) {
                fadeIn_1 = fadeIn_1_1;
            },
            function (fadeInDown_1_1) {
                fadeInDown_1 = fadeInDown_1_1;
            },
            function (fadeInDownBig_1_1) {
                fadeInDownBig_1 = fadeInDownBig_1_1;
            },
            function (fadeInLeft_1_1) {
                fadeInLeft_1 = fadeInLeft_1_1;
            },
            function (fadeInLeftBig_1_1) {
                fadeInLeftBig_1 = fadeInLeftBig_1_1;
            },
            function (fadeInRight_1_1) {
                fadeInRight_1 = fadeInRight_1_1;
            },
            function (fadeInRightBig_1_1) {
                fadeInRightBig_1 = fadeInRightBig_1_1;
            },
            function (fadeInUp_1_1) {
                fadeInUp_1 = fadeInUp_1_1;
            },
            function (fadeInUpBig_1_1) {
                fadeInUpBig_1 = fadeInUpBig_1_1;
            },
            function (fadeOut_1_1) {
                fadeOut_1 = fadeOut_1_1;
            },
            function (fadeOutDown_1_1) {
                fadeOutDown_1 = fadeOutDown_1_1;
            },
            function (fadeOutDownBig_1_1) {
                fadeOutDownBig_1 = fadeOutDownBig_1_1;
            },
            function (fadeOutLeft_1_1) {
                fadeOutLeft_1 = fadeOutLeft_1_1;
            },
            function (fadeOutLeftBig_1_1) {
                fadeOutLeftBig_1 = fadeOutLeftBig_1_1;
            },
            function (fadeOutRight_1_1) {
                fadeOutRight_1 = fadeOutRight_1_1;
            },
            function (fadeOutRightBig_1_1) {
                fadeOutRightBig_1 = fadeOutRightBig_1_1;
            },
            function (fadeOutUp_1_1) {
                fadeOutUp_1 = fadeOutUp_1_1;
            },
            function (fadeOutUpBig_1_1) {
                fadeOutUpBig_1 = fadeOutUpBig_1_1;
            },
            function (flash_1_1) {
                flash_1 = flash_1_1;
            },
            function (flip_1_1) {
                flip_1 = flip_1_1;
            },
            function (flipInX_1_1) {
                flipInX_1 = flipInX_1_1;
            },
            function (flipInY_1_1) {
                flipInY_1 = flipInY_1_1;
            },
            function (flipOutX_1_1) {
                flipOutX_1 = flipOutX_1_1;
            },
            function (flipOutY_1_1) {
                flipOutY_1 = flipOutY_1_1;
            },
            function (headShake_1_1) {
                headShake_1 = headShake_1_1;
            },
            function (hinge_1_1) {
                hinge_1 = hinge_1_1;
            },
            function (jello_1_1) {
                jello_1 = jello_1_1;
            },
            function (lightSpeedIn_1_1) {
                lightSpeedIn_1 = lightSpeedIn_1_1;
            },
            function (lightSpeedOut_1_1) {
                lightSpeedOut_1 = lightSpeedOut_1_1;
            },
            function (pulse_1_1) {
                pulse_1 = pulse_1_1;
            },
            function (rollIn_1_1) {
                rollIn_1 = rollIn_1_1;
            },
            function (rollOut_1_1) {
                rollOut_1 = rollOut_1_1;
            },
            function (rotateIn_1_1) {
                rotateIn_1 = rotateIn_1_1;
            },
            function (rotateInDownLeft_1_1) {
                rotateInDownLeft_1 = rotateInDownLeft_1_1;
            },
            function (rotateInDownRight_1_1) {
                rotateInDownRight_1 = rotateInDownRight_1_1;
            },
            function (rotateInUpLeft_1_1) {
                rotateInUpLeft_1 = rotateInUpLeft_1_1;
            },
            function (rotateInUpRight_1_1) {
                rotateInUpRight_1 = rotateInUpRight_1_1;
            },
            function (rotateOut_1_1) {
                rotateOut_1 = rotateOut_1_1;
            },
            function (rotateOutDownLeft_1_1) {
                rotateOutDownLeft_1 = rotateOutDownLeft_1_1;
            },
            function (rotateOutDownRight_1_1) {
                rotateOutDownRight_1 = rotateOutDownRight_1_1;
            },
            function (rotateOutUpLeft_1_1) {
                rotateOutUpLeft_1 = rotateOutUpLeft_1_1;
            },
            function (rotateOutUpRight_1_1) {
                rotateOutUpRight_1 = rotateOutUpRight_1_1;
            },
            function (rubberBand_1_1) {
                rubberBand_1 = rubberBand_1_1;
            },
            function (shake_1_1) {
                shake_1 = shake_1_1;
            },
            function (slideInDown_1_1) {
                slideInDown_1 = slideInDown_1_1;
            },
            function (slideInLeft_1_1) {
                slideInLeft_1 = slideInLeft_1_1;
            },
            function (slideInRight_1_1) {
                slideInRight_1 = slideInRight_1_1;
            },
            function (slideInUp_1_1) {
                slideInUp_1 = slideInUp_1_1;
            },
            function (slideOutDown_1_1) {
                slideOutDown_1 = slideOutDown_1_1;
            },
            function (slideOutLeft_1_1) {
                slideOutLeft_1 = slideOutLeft_1_1;
            },
            function (slideOutRight_1_1) {
                slideOutRight_1 = slideOutRight_1_1;
            },
            function (slideOutUp_1_1) {
                slideOutUp_1 = slideOutUp_1_1;
            },
            function (swing_1_1) {
                swing_1 = swing_1_1;
            },
            function (tada_1_1) {
                tada_1 = tada_1_1;
            },
            function (wobble_1_1) {
                wobble_1 = wobble_1_1;
            },
            function (zoomIn_1_1) {
                zoomIn_1 = zoomIn_1_1;
            },
            function (zoomInDown_1_1) {
                zoomInDown_1 = zoomInDown_1_1;
            },
            function (zoomInLeft_1_1) {
                zoomInLeft_1 = zoomInLeft_1_1;
            },
            function (zoomInRight_1_1) {
                zoomInRight_1 = zoomInRight_1_1;
            },
            function (zoomInUp_1_1) {
                zoomInUp_1 = zoomInUp_1_1;
            },
            function (zoomOut_1_1) {
                zoomOut_1 = zoomOut_1_1;
            },
            function (zoomOutDown_1_1) {
                zoomOutDown_1 = zoomOutDown_1_1;
            },
            function (zoomOutLeft_1_1) {
                zoomOutLeft_1 = zoomOutLeft_1_1;
            },
            function (zoomOutRight_1_1) {
                zoomOutRight_1 = zoomOutRight_1_1;
            },
            function (zoomOutUp_1_1) {
                zoomOutUp_1 = zoomOutUp_1_1;
            }
        ],
        execute: function () {
            exports_77("ANIMATE_CSS", ANIMATE_CSS = [
                bounce_1.bounce,
                bounceIn_1.bounceIn,
                bounceInDown_1.bounceInDown,
                bounceInLeft_1.bounceInLeft,
                bounceInRight_1.bounceInRight,
                bounceInUp_1.bounceInUp,
                bounceOut_1.bounceOut,
                bounceOutDown_1.bounceOutDown,
                bounceOutLeft_1.bounceOutLeft,
                bounceOutRight_1.bounceOutRight,
                bounceOutUp_1.bounceOutUp,
                fadeIn_1.fadeIn,
                fadeInDown_1.fadeInDown,
                fadeInDownBig_1.fadeInDownBig,
                fadeInLeft_1.fadeInLeft,
                fadeInLeftBig_1.fadeInLeftBig,
                fadeInRight_1.fadeInRight,
                fadeInRightBig_1.fadeInRightBig,
                fadeInUp_1.fadeInUp,
                fadeInUpBig_1.fadeInUpBig,
                fadeOut_1.fadeOut,
                fadeOutDown_1.fadeOutDown,
                fadeOutDownBig_1.fadeOutDownBig,
                fadeOutLeft_1.fadeOutLeft,
                fadeOutLeftBig_1.fadeOutLeftBig,
                fadeOutRight_1.fadeOutRight,
                fadeOutRightBig_1.fadeOutRightBig,
                fadeOutUp_1.fadeOutUp,
                fadeOutUpBig_1.fadeOutUpBig,
                flash_1.flash,
                flip_1.flip,
                flipInX_1.flipInX,
                flipInY_1.flipInY,
                flipOutX_1.flipOutX,
                flipOutY_1.flipOutY,
                headShake_1.headShake,
                hinge_1.hinge,
                jello_1.jello,
                lightSpeedIn_1.lightSpeedIn,
                lightSpeedOut_1.lightSpeedOut,
                pulse_1.pulse,
                rollIn_1.rollIn,
                rollOut_1.rollOut,
                rotateIn_1.rotateIn,
                rotateInDownLeft_1.rotateInDownLeft,
                rotateInDownRight_1.rotateInDownRight,
                rotateInUpLeft_1.rotateInUpLeft,
                rotateInUpRight_1.rotateInUpRight,
                rotateOut_1.rotateOut,
                rotateOutDownLeft_1.rotateOutDownLeft,
                rotateOutDownRight_1.rotateOutDownRight,
                rotateOutUpLeft_1.rotateOutUpLeft,
                rotateOutUpRight_1.rotateOutUpRight,
                rubberBand_1.rubberBand,
                shake_1.shake,
                slideInDown_1.slideInDown,
                slideInLeft_1.slideInLeft,
                slideInRight_1.slideInRight,
                slideInUp_1.slideInUp,
                slideOutDown_1.slideOutDown,
                slideOutLeft_1.slideOutLeft,
                slideOutRight_1.slideOutRight,
                slideOutUp_1.slideOutUp,
                swing_1.swing,
                tada_1.tada,
                wobble_1.wobble,
                zoomIn_1.zoomIn,
                zoomInDown_1.zoomInDown,
                zoomInLeft_1.zoomInLeft,
                zoomInRight_1.zoomInRight,
                zoomInUp_1.zoomInUp,
                zoomOut_1.zoomOut,
                zoomOutDown_1.zoomOutDown,
                zoomOutLeft_1.zoomOutLeft,
                zoomOutRight_1.zoomOutRight,
                zoomOutUp_1.zoomOutUp
            ]);
            exports_77("bounce", bounce_1.bounce);
            exports_77("bounceIn", bounceIn_1.bounceIn);
            exports_77("bounceInDown", bounceInDown_1.bounceInDown);
            exports_77("bounceInLeft", bounceInLeft_1.bounceInLeft);
            exports_77("bounceInRight", bounceInRight_1.bounceInRight);
            exports_77("bounceInUp", bounceInUp_1.bounceInUp);
            exports_77("bounceOut", bounceOut_1.bounceOut);
            exports_77("bounceOutDown", bounceOutDown_1.bounceOutDown);
            exports_77("bounceOutLeft", bounceOutLeft_1.bounceOutLeft);
            exports_77("bounceOutRight", bounceOutRight_1.bounceOutRight);
            exports_77("bounceOutUp", bounceOutUp_1.bounceOutUp);
            exports_77("fadeIn", fadeIn_1.fadeIn);
            exports_77("fadeInDown", fadeInDown_1.fadeInDown);
            exports_77("fadeInDownBig", fadeInDownBig_1.fadeInDownBig);
            exports_77("fadeInLeft", fadeInLeft_1.fadeInLeft);
            exports_77("fadeInLeftBig", fadeInLeftBig_1.fadeInLeftBig);
            exports_77("fadeInRight", fadeInRight_1.fadeInRight);
            exports_77("fadeInRightBig", fadeInRightBig_1.fadeInRightBig);
            exports_77("fadeInUp", fadeInUp_1.fadeInUp);
            exports_77("fadeInUpBig", fadeInUpBig_1.fadeInUpBig);
            exports_77("fadeOut", fadeOut_1.fadeOut);
            exports_77("fadeOutDown", fadeOutDown_1.fadeOutDown);
            exports_77("fadeOutDownBig", fadeOutDownBig_1.fadeOutDownBig);
            exports_77("fadeOutLeft", fadeOutLeft_1.fadeOutLeft);
            exports_77("fadeOutLeftBig", fadeOutLeftBig_1.fadeOutLeftBig);
            exports_77("fadeOutRight", fadeOutRight_1.fadeOutRight);
            exports_77("fadeOutRightBig", fadeOutRightBig_1.fadeOutRightBig);
            exports_77("fadeOutUp", fadeOutUp_1.fadeOutUp);
            exports_77("fadeOutUpBig", fadeOutUpBig_1.fadeOutUpBig);
            exports_77("flash", flash_1.flash);
            exports_77("flip", flip_1.flip);
            exports_77("flipInX", flipInX_1.flipInX);
            exports_77("flipInY", flipInY_1.flipInY);
            exports_77("flipOutX", flipOutX_1.flipOutX);
            exports_77("flipOutY", flipOutY_1.flipOutY);
            exports_77("headShake", headShake_1.headShake);
            exports_77("hinge", hinge_1.hinge);
            exports_77("jello", jello_1.jello);
            exports_77("lightSpeedIn", lightSpeedIn_1.lightSpeedIn);
            exports_77("lightSpeedOut", lightSpeedOut_1.lightSpeedOut);
            exports_77("pulse", pulse_1.pulse);
            exports_77("rollIn", rollIn_1.rollIn);
            exports_77("rollOut", rollOut_1.rollOut);
            exports_77("rotateIn", rotateIn_1.rotateIn);
            exports_77("rotateInDownLeft", rotateInDownLeft_1.rotateInDownLeft);
            exports_77("rotateInDownRight", rotateInDownRight_1.rotateInDownRight);
            exports_77("rotateInUpLeft", rotateInUpLeft_1.rotateInUpLeft);
            exports_77("rotateInUpRight", rotateInUpRight_1.rotateInUpRight);
            exports_77("rotateOut", rotateOut_1.rotateOut);
            exports_77("rotateOutDownLeft", rotateOutDownLeft_1.rotateOutDownLeft);
            exports_77("rotateOutDownRight", rotateOutDownRight_1.rotateOutDownRight);
            exports_77("rotateOutUpLeft", rotateOutUpLeft_1.rotateOutUpLeft);
            exports_77("rotateOutUpRight", rotateOutUpRight_1.rotateOutUpRight);
            exports_77("rubberBand", rubberBand_1.rubberBand);
            exports_77("shake", shake_1.shake);
            exports_77("slideInDown", slideInDown_1.slideInDown);
            exports_77("slideInLeft", slideInLeft_1.slideInLeft);
            exports_77("slideInRight", slideInRight_1.slideInRight);
            exports_77("slideInUp", slideInUp_1.slideInUp);
            exports_77("slideOutDown", slideOutDown_1.slideOutDown);
            exports_77("slideOutLeft", slideOutLeft_1.slideOutLeft);
            exports_77("slideOutRight", slideOutRight_1.slideOutRight);
            exports_77("slideOutUp", slideOutUp_1.slideOutUp);
            exports_77("swing", swing_1.swing);
            exports_77("tada", tada_1.tada);
            exports_77("wobble", wobble_1.wobble);
            exports_77("zoomIn", zoomIn_1.zoomIn);
            exports_77("zoomInDown", zoomInDown_1.zoomInDown);
            exports_77("zoomInLeft", zoomInLeft_1.zoomInLeft);
            exports_77("zoomInRight", zoomInRight_1.zoomInRight);
            exports_77("zoomInUp", zoomInUp_1.zoomInUp);
            exports_77("zoomOut", zoomOut_1.zoomOut);
            exports_77("zoomOutDown", zoomOutDown_1.zoomOutDown);
            exports_77("zoomOutLeft", zoomOutLeft_1.zoomOutLeft);
            exports_77("zoomOutRight", zoomOutRight_1.zoomOutRight);
            exports_77("zoomOutUp", zoomOutUp_1.zoomOutUp);
        }
    };
});
System.register("just-animate/common/resources", [], function (exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var nada, nil, animate, easingString, call, cancel, cubicBezier, duration, finish, finished, idle, offsetString, pause, paused, pending, play, reverse, rotate, rotate3d, rotateX, rotateY, rotateZ, running, scale, scale3d, scaleX, scaleY, scaleZ, skew, skewX, skewY, steps, transform, translate, translate3d, translateX, translateY, translateZ, update, x, y, z, functionTypeString, numberString, objectString, stringString, camelCaseRegex, distanceExpression, percentageExpression, timeExpression;
    return {
        setters: [],
        execute: function () {
            exports_78("nada", nada = null);
            exports_78("nil", nil = undefined);
            exports_78("animate", animate = 'animate');
            exports_78("easingString", easingString = 'easing');
            exports_78("call", call = 'call');
            exports_78("cancel", cancel = 'cancel');
            exports_78("cubicBezier", cubicBezier = 'cubic-bezier');
            exports_78("duration", duration = 'duration');
            exports_78("finish", finish = 'finish');
            exports_78("finished", finished = 'finished');
            exports_78("idle", idle = 'idle');
            exports_78("offsetString", offsetString = 'offset');
            exports_78("pause", pause = 'pause');
            exports_78("paused", paused = 'paused');
            exports_78("pending", pending = 'pending');
            exports_78("play", play = 'play');
            exports_78("reverse", reverse = 'reverse');
            exports_78("rotate", rotate = 'rotate');
            exports_78("rotate3d", rotate3d = 'rotate3d');
            exports_78("rotateX", rotateX = 'rotateX');
            exports_78("rotateY", rotateY = 'rotateY');
            exports_78("rotateZ", rotateZ = 'rotateZ');
            exports_78("running", running = 'running');
            exports_78("scale", scale = 'scale');
            exports_78("scale3d", scale3d = 'scale3d');
            exports_78("scaleX", scaleX = 'scaleX');
            exports_78("scaleY", scaleY = 'scaleY');
            exports_78("scaleZ", scaleZ = 'scaleZ');
            exports_78("skew", skew = 'skew');
            exports_78("skewX", skewX = 'skewX');
            exports_78("skewY", skewY = 'skewY');
            exports_78("steps", steps = 'steps');
            exports_78("transform", transform = 'transform');
            exports_78("translate", translate = 'translate');
            exports_78("translate3d", translate3d = 'translate3d');
            exports_78("translateX", translateX = 'translateX');
            exports_78("translateY", translateY = 'translateY');
            exports_78("translateZ", translateZ = 'translateZ');
            exports_78("update", update = 'update');
            exports_78("x", x = 'x');
            exports_78("y", y = 'y');
            exports_78("z", z = 'z');
            exports_78("functionTypeString", functionTypeString = '[object Function]');
            exports_78("numberString", numberString = 'number');
            exports_78("objectString", objectString = 'object');
            exports_78("stringString", stringString = 'string');
            exports_78("camelCaseRegex", camelCaseRegex = /([a-z])[- ]([a-z])/ig);
            exports_78("distanceExpression", distanceExpression = /(-{0,1}[0-9.]+)(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|q|cm|in|pt|pc|\%){0,1}/);
            exports_78("percentageExpression", percentageExpression = /(-{0,1}[0-9.]+)%{0,1}/);
            exports_78("timeExpression", timeExpression = /([+-][=]){0,1}([\-]{0,1}[0-9]+[\.]{0,1}[0-9]*){1}(s|ms){0,1}/);
        }
    };
});
System.register("just-animate/common/type", ["just-animate/common/resources"], function (exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    /**
     * Tests if object is a list
     *
     * @export
     * @param {*} a object to test
     * @returns {boolean} true if is not a string and length property is a number
     */
    function isArray(a) {
        return isDefined(a) && !isString(a) && !isFunction(a) && isNumber(a.length);
    }
    function isDefined(a) {
        return a !== resources_1.nil && a !== resources_1.nada && a !== '';
    }
    /**
     * Tests if object is a function
     *
     * @export
     * @param {*} a object to test
     * @returns {boolean} true if object.toString reports it as a Function
     */
    function isFunction(a) {
        return getTypeString(a) === resources_1.functionTypeString;
    }
    /**
     * Tests if object is a number
     *
     * @export
     * @param {*} a object to test
     * @returns {boolean} true if the object is typeof number
     */
    function isNumber(a) {
        return typeof a === resources_1.numberString;
    }
    function isObject(a) {
        return typeof a === resources_1.objectString && a !== resources_1.nada;
    }
    /**
     * Tests if object is a string
     *
     * @export
     * @param {*} a object to test
     * @returns {boolean} true if object is typeof string
     */
    function isString(a) {
        return typeof a === resources_1.stringString;
    }
    function getTypeString(val) {
        return ostring.call(val);
    }
    var resources_1, ostring;
    exports_79("isArray", isArray);
    exports_79("isDefined", isDefined);
    exports_79("isFunction", isFunction);
    exports_79("isNumber", isNumber);
    exports_79("isObject", isObject);
    exports_79("isString", isString);
    exports_79("getTypeString", getTypeString);
    return {
        setters: [
            function (resources_1_1) {
                resources_1 = resources_1_1;
            }
        ],
        execute: function () {
            ostring = Object.prototype.toString;
        }
    };
});
System.register("just-animate/common/lists", ["just-animate/common/resources", "just-animate/common/type"], function (exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    /**
     * Returns the first object in the list or undefined
     */
    function head(indexed, predicate) {
        if (!indexed) {
            return resources_2.nil;
        }
        var len = indexed.length;
        if (len < 1) {
            return resources_2.nil;
        }
        if (predicate === resources_2.nil) {
            return indexed[0];
        }
        for (var i = 0; i < len; i++) {
            var item = indexed[i];
            var result = predicate(item);
            if (result === true) {
                return item;
            }
        }
        return resources_2.nil;
    }
    /**
     * Returns the last object in the list or undefined
     */
    function tail(indexed, predicate) {
        if (!indexed) {
            return resources_2.nil;
        }
        var len = indexed.length;
        if (len < 1) {
            return resources_2.nil;
        }
        if (predicate === resources_2.nil) {
            return indexed[len - 1];
        }
        for (var i = len - 1; i > -1; --i) {
            var item = indexed[i];
            var result = predicate(item);
            if (result === true) {
                return item;
            }
        }
        return resources_2.nil;
    }
    /**
     * Converts list to an Array.
     * Useful for converting NodeList and arguments to []
     *
     * @export
     * @template T
     * @param {T[]} list to convert
     * @returns {T[]} array clone of list
     */
    function toArray(indexed, index) {
        return slice.call(indexed, index || 0);
    }
    /**
     * returns an array or an object wrapped in an array
     *
     * @export
     * @template T
     * @param {(IList<T> | T)} indexed
     * @returns {T[]}
     */
    function chain(indexed) {
        return type_1.isArray(indexed) ? indexed : [indexed];
    }
    /**
     * Performs the function against all objects in the list
     *
     * @export
     * @template T1
     * @param {T[]} items list of objects
     * @param {ja.IConsumer<T1>} fn function to execute for each object
     */
    function each(items, fn) {
        for (var i = 0, len = items.length; i < len; i++) {
            fn(items[i]);
        }
    }
    /**
     * Returns the max value of a given property in a list
     *
     * @export
     * @template T1
     * @param {T1[]} items list of objects
     * @param {string} propertyName property to evaluate
     * @returns {*} max value of the property provided
     */
    function max(items, propertyName) {
        var max = '';
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var prop = item[propertyName];
            if (max < prop) {
                max = prop;
            }
        }
        return max;
    }
    /**
     * Returns the max value of a given property in a list
     *
     * @export
     * @template T1
     * @param {T1[]} items list of objects
     * @param {string} propertyName property to evaluate
     * @returns {*} max value of the property provided
     */
    function maxBy(items, predicate) {
        var max = '';
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var prop = predicate(item);
            if (max < prop) {
                max = prop;
            }
        }
        return max;
    }
    /**
     * Maps one list of objects to another.
     * Returning undefined skips the item (effectively filtering it)
     *
     * @export
     * @template T1
     * @template T2
     * @param {T1[]} items list of objects to map
     * @param {ja.IMapper<T1, T2>} fn function that maps each object
     * @returns {T2[]} new list of objects
     */
    function map(items, fn) {
        var results = [];
        for (var i = 0, len = items.length; i < len; i++) {
            var result = fn(items[i]);
            if (result !== resources_2.nil) {
                results.push(result);
            }
        }
        return results;
    }
    /**
     * Pushes each item in target into source and returns source
     *
     * @export
     * @template T
     * @param {T[]} source
     * @param {T[]} target
     */
    function pushAll(source, target) {
        push.apply(source, target);
    }
    var resources_2, type_1, slice, push;
    exports_80("head", head);
    exports_80("tail", tail);
    exports_80("toArray", toArray);
    exports_80("chain", chain);
    exports_80("each", each);
    exports_80("max", max);
    exports_80("maxBy", maxBy);
    exports_80("map", map);
    exports_80("pushAll", pushAll);
    return {
        setters: [
            function (resources_2_1) {
                resources_2 = resources_2_1;
            },
            function (type_1_1) {
                type_1 = type_1_1;
            }
        ],
        execute: function () {
            slice = Array.prototype.slice;
            push = Array.prototype.push;
            ;
        }
    };
});
System.register("just-animate/common/errors", [], function (exports_81, context_81) {
    "use strict";
    var __moduleName = context_81 && context_81.id;
    function invalidArg(name) {
        return new Error("Bad: " + name);
    }
    exports_81("invalidArg", invalidArg);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("just-animate/common/elements", ["just-animate/common/lists", "just-animate/common/type", "just-animate/common/errors"], function (exports_82, context_82) {
    "use strict";
    var __moduleName = context_82 && context_82.id;
    /**
     * Recursively resolves the element source from dom, selector, jquery, array, and function sources
     *
     * @param {ja.ElementSource} source from which to locate elements
     * @returns {Element[]} array of elements found
     */
    function queryElements(source) {
        if (!source) {
            throw errors_1.invalidArg('source');
        }
        if (type_2.isString(source)) {
            // if query selector, search for elements 
            var nodeResults = document.querySelectorAll(source);
            return lists_1.toArray(nodeResults);
        }
        if (typeof source['tagName'] === 'string') {
            // if a single element, wrap in array 
            return [source];
        }
        if (type_2.isFunction(source)) {
            // if function, call it and call this function
            var provider = source;
            var result = provider();
            return queryElements(result);
        }
        if (type_2.isArray(source)) {
            // if array or jQuery object, flatten to an array
            var elements_1 = [];
            lists_1.each(source, function (i) {
                // recursively call this function in case of nested elements
                var innerElements = queryElements(i);
                elements_1.push.apply(elements_1, innerElements);
            });
            return elements_1;
        }
        // otherwise return empty    
        return [];
    }
    function getEmSize(el) {
        return parseFloat(getComputedStyle(el).fontSize);
    }
    function getRemSize() {
        return parseFloat(getComputedStyle(document.body).fontSize);
    }
    var lists_1, type_2, errors_1;
    exports_82("queryElements", queryElements);
    exports_82("getEmSize", getEmSize);
    exports_82("getRemSize", getRemSize);
    return {
        setters: [
            function (lists_1_1) {
                lists_1 = lists_1_1;
            },
            function (type_2_1) {
                type_2 = type_2_1;
            },
            function (errors_1_1) {
                errors_1 = errors_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("just-animate/common/math", ["just-animate/common/resources"], function (exports_83, context_83) {
    "use strict";
    var __moduleName = context_83 && context_83.id;
    /**
     * Clamps a number between the min and max
     *
     * @export
     * @param {number} val number to clamp
     * @param {number} min min number allowed
     * @param {number} max max number allowed
     * @returns {number} val if between min-max, min if lesser, max if greater
     */
    function clamp(val, min, max) {
        return val === resources_3.nil ? resources_3.nil : val < min ? min : val > max ? max : val;
    }
    function inRange(val, min, max) {
        return min < max ? min <= val && val <= max : max <= val && val <= min;
    }
    var resources_3;
    exports_83("clamp", clamp);
    exports_83("inRange", inRange);
    return {
        setters: [
            function (resources_3_1) {
                resources_3 = resources_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("just-animate/common/objects", ["just-animate/common/type", "just-animate/common/resources"], function (exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    function deepCopyObject(origin, dest) {
        dest = dest || {};
        for (var prop in origin) {
            deepCopyProperty(prop, origin, dest);
        }
        return dest;
    }
    function deepCopyProperty(prop, origin, dest) {
        var originProp = origin[prop];
        var destProp = dest[prop];
        // if the source and target don't have the same type, replace with target
        var originType = type_3.getTypeString(originProp);
        var destType = type_3.getTypeString(destProp);
        if (originType !== destType) {
            destProp = resources_4.nil;
        }
        if (type_3.isArray(originProp)) {
            // note: a compromise until a solution for merging arrays becomes clear
            dest[prop] = originProp.slice(0);
        }
        else if (type_3.isObject(originProp)) {
            dest[prop] = deepCopyObject(originProp, destProp);
        }
        else {
            dest[prop] = originProp;
        }
    }
    function inherit(target, source) {
        for (var propName in source) {
            if (!type_3.isDefined(target[propName])) {
                target[propName] = source[propName];
            }
        }
        return target;
    }
    function resolve(value, ctx) {
        if (!type_3.isFunction(value)) {
            return value;
        }
        return value(ctx.target, ctx.index, ctx.targets);
    }
    function listProps(indexed) {
        var props = [];
        var len = indexed.length;
        for (var i = 0; i < len; i++) {
            var item = indexed[i];
            for (var property in item) {
                if (props.indexOf(property) === -1) {
                    props.push(property);
                }
            }
        }
        return props;
    }
    var type_3, resources_4;
    exports_84("deepCopyObject", deepCopyObject);
    exports_84("deepCopyProperty", deepCopyProperty);
    exports_84("inherit", inherit);
    exports_84("resolve", resolve);
    exports_84("listProps", listProps);
    return {
        setters: [
            function (type_3_1) {
                type_3 = type_3_1;
            },
            function (resources_4_1) {
                resources_4 = resources_4_1;
            }
        ],
        execute: function () {
            ;
        }
    };
});
System.register("just-animate/common/random", [], function (exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    function shuffle(choices) {
        return choices[Math.floor(Math.random() * choices.length)];
    }
    function random(first, last) {
        return Math.floor(first + (Math.random() * (last - first)));
    }
    exports_85("shuffle", shuffle);
    exports_85("random", random);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("just-animate/common/strings", ["just-animate/common/type", "just-animate/common/lists", "just-animate/common/resources"], function (exports_86, context_86) {
    "use strict";
    var __moduleName = context_86 && context_86.id;
    function camelCaseReplacer(match, p1, p2) {
        return p1 + p2.toUpperCase();
    }
    function toCamelCase(value) {
        return type_4.isString(value) ? value.replace(resources_5.camelCaseRegex, camelCaseReplacer) : resources_5.nil;
    }
    function startsWith(value, pattern) {
        return value.indexOf(pattern) === 0;
    }
    var type_4, lists_2, resources_5, cssFunction;
    exports_86("toCamelCase", toCamelCase);
    exports_86("startsWith", startsWith);
    return {
        setters: [
            function (type_4_1) {
                type_4 = type_4_1;
            },
            function (lists_2_1) {
                lists_2 = lists_2_1;
            },
            function (resources_5_1) {
                resources_5 = resources_5_1;
            }
        ],
        execute: function () {
            exports_86("cssFunction", cssFunction = function () {
                var args = arguments;
                return args[0] + "(" + lists_2.toArray(args, 1).join(',') + ")";
            });
        }
    };
});
System.register("just-animate/common/units", ["just-animate/common/type", "just-animate/common/resources", "just-animate/common/errors"], function (exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    function Unit() {
        var self = this instanceof Unit ? this : Object.create(Unit.prototype);
        return self;
    }
    function fromDistance(val, unit) {
        if (!type_5.isDefined(val)) {
            return resources_6.nil;
        }
        var returnUnit = unit || Unit();
        if (type_5.isNumber(val)) {
            return returnUnit.values(Number(val), px, stepNone);
        }
        var match = resources_6.distanceExpression.exec(val);
        var unitType = match[2];
        var value = parseFloat(match[1]);
        return returnUnit.values(value, unitType, stepNone);
    }
    function fromPercentage(val, unit) {
        if (!type_5.isDefined(val)) {
            return resources_6.nil;
        }
        var returnUnit = unit || Unit();
        if (type_5.isNumber(val)) {
            return returnUnit.values(Number(val), percent, stepNone);
        }
        var match = resources_6.percentageExpression.exec(val);
        var value = parseFloat(match[1]);
        return returnUnit.values(value, percent, stepNone);
    }
    function fromTime(val, unit) {
        var returnUnit = unit || Unit();
        if (type_5.isNumber(val)) {
            return returnUnit.values(Number(val), millisecond, stepNone);
        }
        var match = resources_6.timeExpression.exec(val);
        var step = match[1] || stepNone;
        var unitType = match[3];
        var value = parseFloat(match[2]);
        var valueMs;
        if (unitType === resources_6.nil || unitType === millisecond) {
            valueMs = value;
        }
        else if (unitType === second) {
            valueMs = value * 1000;
        }
        else {
            throw errors_2.invalidArg('format');
        }
        return returnUnit.values(valueMs, millisecond, step);
    }
    function resolveTimeExpression(val, index) {
        fromTime(val, sharedUnit);
        if (sharedUnit.step === stepForward) {
            return sharedUnit.value * index;
        }
        if (sharedUnit.step === stepBackward) {
            return sharedUnit.value * index * -1;
        }
        return sharedUnit.value;
    }
    var type_5, resources_6, errors_2, stepNone, stepForward, stepBackward, em, ex, ch, rem, vh, vw, vmin, vmax, px, mm, q, cm, inch, point, pica, percent, millisecond, second, sharedUnit;
    exports_87("Unit", Unit);
    exports_87("fromDistance", fromDistance);
    exports_87("fromPercentage", fromPercentage);
    exports_87("fromTime", fromTime);
    exports_87("resolveTimeExpression", resolveTimeExpression);
    return {
        setters: [
            function (type_5_1) {
                type_5 = type_5_1;
            },
            function (resources_6_1) {
                resources_6 = resources_6_1;
            },
            function (errors_2_1) {
                errors_2 = errors_2_1;
            }
        ],
        execute: function () {
            exports_87("stepNone", stepNone = '=');
            exports_87("stepForward", stepForward = '+=');
            exports_87("stepBackward", stepBackward = '-=');
            exports_87("em", em = 'em');
            exports_87("ex", ex = 'ex');
            exports_87("ch", ch = 'ch');
            exports_87("rem", rem = 'rem');
            exports_87("vh", vh = 'vh');
            exports_87("vw", vw = 'vw');
            exports_87("vmin", vmin = 'vmin');
            exports_87("vmax", vmax = 'vmax');
            exports_87("px", px = 'px');
            exports_87("mm", mm = 'mm');
            exports_87("q", q = 'q');
            exports_87("cm", cm = 'cm');
            exports_87("inch", inch = 'in');
            exports_87("point", point = 'pt');
            exports_87("pica", pica = 'pc');
            exports_87("percent", percent = '%');
            exports_87("millisecond", millisecond = 'ms');
            exports_87("second", second = 's');
            Unit.prototype = {
                step: resources_6.nil,
                unit: resources_6.nil,
                value: resources_6.nil,
                values: function (value, unit, step) {
                    var self = this;
                    self.value = value;
                    self.unit = unit;
                    self.step = step;
                    return self;
                },
                toString: function () {
                    return String(this.value) + this.unit;
                }
            };
            sharedUnit = Unit();
        }
    };
});
System.register("just-animate/common/utils", [], function (exports_88, context_88) {
    "use strict";
    var __moduleName = context_88 && context_88.id;
    var global, requestAnimationFrame, now, raf;
    return {
        setters: [],
        execute: function () {
            global = window;
            requestAnimationFrame = global.requestAnimationFrame;
            exports_88("now", now = (performance && performance.now)
                ? function () { return performance.now(); }
                : function () { return Date.now(); });
            exports_88("raf", raf = (requestAnimationFrame)
                ? function (ctx, fn) {
                    requestAnimationFrame(function () { fn(ctx); });
                }
                : function (ctx, fn) {
                    setTimeout(function () { fn(ctx); }, 16.66);
                });
        }
    };
});
System.register("just-animate/plugins/core/Dispatcher", ["just-animate/common/type", "just-animate/common/errors", "just-animate/common/resources"], function (exports_89, context_89) {
    "use strict";
    var __moduleName = context_89 && context_89.id;
    function Dispatcher() {
        var self = this;
        self = self instanceof Dispatcher ? self : Object.create(Dispatcher.prototype);
        self._fn = {};
        return self;
    }
    var type_6, errors_3, resources_7;
    exports_89("Dispatcher", Dispatcher);
    return {
        setters: [
            function (type_6_1) {
                type_6 = type_6_1;
            },
            function (errors_3_1) {
                errors_3 = errors_3_1;
            },
            function (resources_7_1) {
                resources_7 = resources_7_1;
            }
        ],
        execute: function () {
            Dispatcher.prototype = {
                _fn: resources_7.nil,
                trigger: function (eventName, args) {
                    var listeners = this._fn[eventName];
                    if (!listeners) {
                        return;
                    }
                    var len = listeners.length;
                    for (var i = 0; i < len; i++) {
                        var listener = listeners[i];
                        listener.apply(resources_7.nil, args);
                    }
                },
                on: function (eventName, listener) {
                    if (!type_6.isFunction(listener)) {
                        throw errors_3.invalidArg('listener');
                    }
                    var fn = this._fn;
                    var listeners = fn[eventName];
                    if (!listeners) {
                        fn[eventName] = [listener];
                        return;
                    }
                    if (listeners.indexOf(listener) !== -1) {
                        return;
                    }
                    listeners.push(listener);
                },
                off: function (eventName, listener) {
                    var listeners = this._fn[eventName];
                    if (listeners) {
                        var indexOfListener = listeners.indexOf(listener);
                        if (indexOfListener !== -1) {
                            listeners.splice(indexOfListener, 1);
                        }
                    }
                }
            };
        }
    };
});
System.register("just-animate/plugins/core/MixinService", ["just-animate/common/resources"], function (exports_90, context_90) {
    "use strict";
    var __moduleName = context_90 && context_90.id;
    var resources_8, presets, MixinService;
    return {
        setters: [
            function (resources_8_1) {
                resources_8 = resources_8_1;
            }
        ],
        execute: function () {
            presets = {};
            MixinService = (function () {
                function MixinService() {
                    this.defs = {};
                }
                MixinService.prototype.findAnimation = function (name) {
                    return this.defs[name] || presets[name] || resources_8.nil;
                };
                MixinService.prototype.registerAnimation = function (animationOptions, isGlobal) {
                    var name = animationOptions.name;
                    if (isGlobal) {
                        presets[name] = animationOptions;
                        return;
                    }
                    this.defs[name] = animationOptions;
                };
                return MixinService;
            }());
            exports_90("MixinService", MixinService);
        }
    };
});
System.register("just-animate/plugins/core/TimeLoop", ["just-animate/common/resources", "just-animate/common/utils"], function (exports_91, context_91) {
    "use strict";
    var __moduleName = context_91 && context_91.id;
    function TimeLoop() {
        var self = this instanceof TimeLoop ? this : Object.create(TimeLoop.prototype);
        self.active = [];
        self.elapses = [];
        self.isActive = resources_9.nil;
        self.lastTime = resources_9.nil;
        self.offs = [];
        self.ons = [];
        return self;
    }
    function update(self) {
        updateOffs(self);
        updateOns(self);
        var callbacks = self.active;
        var elapses = self.elapses;
        var len = callbacks.length;
        var lastTime = self.lastTime || utils_1.now();
        var thisTime = utils_1.now();
        var delta = thisTime - lastTime;
        // if nil is subscribed, kill the cycle
        if (!len) {
            // end recursion
            self.isActive = resources_9.nil;
            self.lastTime = resources_9.nil;
            return;
        }
        // ensure running and requestAnimationFrame is called
        self.isActive = true;
        self.lastTime = thisTime;
        utils_1.raf(self, update);
        for (var i = 0; i < len; i++) {
            // update delta and save result
            var existingElapsed = elapses[i];
            var updatedElapsed = existingElapsed + delta;
            elapses[i] = updatedElapsed;
            // call sub with updated delta
            callbacks[i](delta, updatedElapsed);
        }
    }
    function updateOffs(self) {
        var len = self.offs.length;
        var active = self.active;
        for (var i = 0; i < len; i++) {
            var fn = self.offs[i];
            var indexOfSub = active.indexOf(fn);
            if (indexOfSub !== -1) {
                active.splice(indexOfSub, 1);
                self.elapses.splice(indexOfSub, 1);
            }
        }
    }
    function updateOns(self) {
        var len = self.ons.length;
        var active = self.active;
        for (var i = 0; i < len; i++) {
            var fn = self.ons[i];
            if (active.indexOf(fn) === -1) {
                active.push(fn);
                self.elapses.push(0);
            }
        }
    }
    var resources_9, utils_1;
    exports_91("TimeLoop", TimeLoop);
    return {
        setters: [
            function (resources_9_1) {
                resources_9 = resources_9_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            TimeLoop.prototype = {
                on: function (fn) {
                    var self = this;
                    var offs = self.offs;
                    var ons = self.ons;
                    var offIndex = offs.indexOf(fn);
                    if (offIndex !== -1) {
                        offs.splice(offIndex, 1);
                    }
                    if (ons.indexOf(fn) === -1) {
                        ons.push(fn);
                    }
                    if (!self.isActive) {
                        self.isActive = true;
                        utils_1.raf(self, update);
                    }
                },
                off: function (fn) {
                    var self = this;
                    var offs = self.offs;
                    var ons = self.ons;
                    var onIndex = ons.indexOf(fn);
                    if (onIndex !== -1) {
                        ons.splice(onIndex, 1);
                    }
                    if (offs.indexOf(fn) === -1) {
                        offs.push(fn);
                    }
                    if (!self.isActive) {
                        self.isActive = true;
                        utils_1.raf(self, update);
                    }
                }
            };
        }
    };
});
System.register("just-animate/plugins/core/easings", ["just-animate/common/strings", "just-animate/common/resources"], function (exports_92, context_92) {
    "use strict";
    var __moduleName = context_92 && context_92.id;
    function getEasingString(easingString) {
        // if no function supplied return linear as cubic
        if (easingString) {
            // if starts with known css function, return with no parsing
            if (strings_1.startsWith(easingString, resources_10.cubicBezier) || strings_1.startsWith(easingString, resources_10.steps)) {
                return easingString;
            }
            // get name as camel case
            var def = easings[strings_1.toCamelCase(easingString)];
            if (def) {
                return strings_1.cssFunction.apply(resources_10.nil, def);
            }
        }
        return strings_1.cssFunction.apply(resources_10.nil, defaultEasing);
    }
    function getEasingFunction(easingString) {
        var parts = getEasingDef(easingString);
        return parts[0] === resources_10.steps
            ? steps(parts[1], parts[2])
            : cubic(parts[1], parts[2], parts[3], parts[4]);
    }
    function getEasingDef(easingString) {
        if (!easingString) {
            return defaultEasing;
        }
        var def = easings[strings_1.toCamelCase(easingString)];
        if (def && def.length) {
            return def;
        }
        var matches = cssFunctionRegex.exec(easingString);
        if (matches && matches.length) {
            return [matches[1]].concat(matches[2].split(','));
        }
        return defaultEasing;
    }
    function bezier(n1, n2, t) {
        return 3 * n1 * (1 - t) * (1 - t) * t + 3 * n2 * (1 - t) * t * t + t * t * t;
    }
    function cubic(p0, p1, p2, p3) {
        if (p0 < 0 || p0 > 1 || p2 < 0 || p2 > 1) {
            return linearCubicBezier;
        }
        return function (x) {
            if (x === 0 || x === 1) {
                return x;
            }
            var start = 0;
            var end = 1;
            var limit = 20;
            while (--limit) {
                var mid = (start + end) / 2;
                var xEst = bezier(p0, p2, mid);
                if (Math.abs(x - xEst) < SUBDIVISION_EPSILON) {
                    return bezier(p1, p3, mid);
                }
                if (xEst < x) {
                    start = mid;
                }
                else {
                    end = mid;
                }
            }
            // limit is reached        
            return x;
        };
    }
    function steps(count, pos) {
        var p = stepAliases.hasOwnProperty(pos)
            ? stepAliases[pos]
            : pos;
        var ratio = count / 1;
        return function (x) { return x >= 1 ? 1 : (p * ratio + x) - (p * ratio + x) % ratio; };
    }
    var strings_1, resources_10, SUBDIVISION_EPSILON, cssFunctionRegex, linearCubicBezier, stepAliases, easings, defaultEasing;
    exports_92("getEasingString", getEasingString);
    exports_92("getEasingFunction", getEasingFunction);
    exports_92("cubic", cubic);
    exports_92("steps", steps);
    return {
        setters: [
            function (strings_1_1) {
                strings_1 = strings_1_1;
            },
            function (resources_10_1) {
                resources_10 = resources_10_1;
            }
        ],
        execute: function () {
            SUBDIVISION_EPSILON = 0.0001;
            cssFunctionRegex = /([a-z-]+)\(([^\)]+)\)/ig;
            linearCubicBezier = function (x) { return x; };
            stepAliases = {
                end: 0,
                start: 1
            };
            easings = {
                ease: [resources_10.cubicBezier, .25, .1, .25, 1],
                easeIn: [resources_10.cubicBezier, .42, 0, 1, 1],
                easeInBack: [resources_10.cubicBezier, .6, -.28, .735, .045],
                easeInCirc: [resources_10.cubicBezier, .6, .04, .98, .335],
                easeInCubic: [resources_10.cubicBezier, .55, .055, .675, .19],
                easeInExpo: [resources_10.cubicBezier, .95, .05, .795, .035],
                easeInOut: [resources_10.cubicBezier, .42, 0, .58, 1],
                easeInOutBack: [resources_10.cubicBezier, .68, -.55, .265, 1.55],
                easeInOutCirc: [resources_10.cubicBezier, .785, .135, .15, .86],
                easeInOutCubic: [resources_10.cubicBezier, .645, .045, .355, 1],
                easeInOutExpo: [resources_10.cubicBezier, 1, 0, 0, 1],
                easeInOutQuad: [resources_10.cubicBezier, .455, .03, .515, .955],
                easeInOutQuart: [resources_10.cubicBezier, .77, 0, .175, 1],
                easeInOutQuint: [resources_10.cubicBezier, .86, 0, .07, 1],
                easeInOutSine: [resources_10.cubicBezier, .445, .05, .55, .95],
                easeInQuad: [resources_10.cubicBezier, .55, .085, .68, .53],
                easeInQuart: [resources_10.cubicBezier, .895, .03, .685, .22],
                easeInQuint: [resources_10.cubicBezier, .755, .05, .855, .06],
                easeInSine: [resources_10.cubicBezier, .47, 0, .745, .715],
                easeOut: [resources_10.cubicBezier, 0, 0, .58, 1],
                easeOutBack: [resources_10.cubicBezier, .175, .885, .32, 1.275],
                easeOutCirc: [resources_10.cubicBezier, .075, .82, .165, 1],
                easeOutCubic: [resources_10.cubicBezier, .215, .61, .355, 1],
                easeOutExpo: [resources_10.cubicBezier, .19, 1, .22, 1],
                easeOutQuad: [resources_10.cubicBezier, .25, .46, .45, .94],
                easeOutQuart: [resources_10.cubicBezier, .165, .84, .44, 1],
                easeOutQuint: [resources_10.cubicBezier, .23, 1, .32, 1],
                easeOutSine: [resources_10.cubicBezier, .39, .575, .565, 1],
                elegantSlowStartEnd: [resources_10.cubicBezier, .175, .885, .32, 1.275],
                linear: [resources_10.cubicBezier, 0, 0, 1, 1],
                stepEnd: [resources_10.steps, 1, 'end'],
                stepStart: [resources_10.steps, 1, 'start']
            };
            defaultEasing = easings.ease;
        }
    };
});
System.register("just-animate/plugins/core/Animator", ["just-animate/common/lists", "just-animate/common/objects", "just-animate/common/type", "just-animate/common/math", "just-animate/common/errors", "just-animate/common/resources", "just-animate/plugins/core/Dispatcher", "just-animate/plugins/core/easings", "just-animate/common/units", "just-animate/common/elements"], function (exports_93, context_93) {
    "use strict";
    var __moduleName = context_93 && context_93.id;
    var lists_3, objects_1, type_7, math_1, errors_4, resources_11, Dispatcher_1, easings_1, units_1, elements_2, animationPadding, unitOut, Animator;
    return {
        setters: [
            function (lists_3_1) {
                lists_3 = lists_3_1;
            },
            function (objects_1_1) {
                objects_1 = objects_1_1;
            },
            function (type_7_1) {
                type_7 = type_7_1;
            },
            function (math_1_1) {
                math_1 = math_1_1;
            },
            function (errors_4_1) {
                errors_4 = errors_4_1;
            },
            function (resources_11_1) {
                resources_11 = resources_11_1;
            },
            function (Dispatcher_1_1) {
                Dispatcher_1 = Dispatcher_1_1;
            },
            function (easings_1_1) {
                easings_1 = easings_1_1;
            },
            function (units_1_1) {
                units_1 = units_1_1;
            },
            function (elements_2_1) {
                elements_2 = elements_2_1;
            }
        ],
        execute: function () {
            // todo: remove these imports as soon as possible
            // fixme!: this controls the amount of time left before the timeline gives up 
            // on individual animation and calls finish.  If an animation plays after its time, it looks
            // like it restarts and that causes jank
            animationPadding = 1.0 / 30;
            unitOut = units_1.Unit();
            Animator = (function () {
                function Animator(resolver, timeloop, plugins) {
                    var self = this;
                    if (!type_7.isDefined(resources_11.duration)) {
                        throw errors_4.invalidArg(resources_11.duration);
                    }
                    self._context = {};
                    self._duration = 0;
                    self._currentTime = resources_11.nil;
                    self._playState = 'idle';
                    self._playbackRate = 1;
                    self._events = [];
                    self._resolver = resolver;
                    self._timeLoop = timeloop;
                    self._plugins = plugins;
                    self._dispatcher = Dispatcher_1.Dispatcher();
                    self._onTick = self._onTick.bind(self);
                    self.on(resources_11.finish, self._onFinish);
                    self.on(resources_11.cancel, self._onCancel);
                    self.on(resources_11.pause, self._onPause);
                    // autoplay    
                    self.play();
                    return self;
                }
                Animator.prototype.animate = function (options) {
                    var self = this;
                    if (type_7.isArray(options)) {
                        lists_3.each(options, function (e) { return self._addEvent(e); });
                    }
                    else {
                        self._addEvent(options);
                    }
                    self._recalculate();
                    return self;
                };
                Animator.prototype.cancel = function () {
                    var self = this;
                    self._dispatcher.trigger(resources_11.cancel, [self]);
                    return self;
                };
                Animator.prototype.duration = function () {
                    return this._duration;
                };
                Animator.prototype.currentTime = function (value) {
                    var self = this;
                    if (!type_7.isDefined(value)) {
                        return self._currentTime;
                    }
                    self._currentTime = value;
                    return self;
                };
                Animator.prototype.finish = function () {
                    var self = this;
                    self._dispatcher.trigger(resources_11.finish, [self]);
                    return self;
                };
                Animator.prototype.playbackRate = function (value) {
                    var self = this;
                    if (!type_7.isDefined(value)) {
                        return self._playbackRate;
                    }
                    self._playbackRate = value;
                    return self;
                };
                Animator.prototype.playState = function (value) {
                    var self = this;
                    if (!type_7.isDefined(value)) {
                        return self._playState;
                    }
                    self._playState = value;
                    self._dispatcher.trigger('set', ['playbackState', value]);
                    return self;
                };
                Animator.prototype.off = function (eventName, listener) {
                    var self = this;
                    self._dispatcher.off(eventName, listener);
                    return self;
                };
                Animator.prototype.on = function (eventName, listener) {
                    var self = this;
                    self._dispatcher.on(eventName, listener);
                    return self;
                };
                Animator.prototype.pause = function () {
                    var self = this;
                    self._dispatcher.trigger(resources_11.pause, [self]);
                    return self;
                };
                Animator.prototype.play = function () {
                    var self = this;
                    if (!(self._playState === 'running' || self._playState === 'pending')) {
                        self._playState = 'pending';
                        self._timeLoop.on(self._onTick);
                    }
                    return self;
                };
                Animator.prototype.reverse = function () {
                    var self = this;
                    self._playbackRate *= -1;
                    return self;
                };
                Animator.prototype._recalculate = function () {
                    var self = this;
                    var endsAt = lists_3.maxBy(self._events, function (e) { return e.startTimeMs + e.animator.totalDuration; });
                    self._duration = endsAt;
                };
                Animator.prototype._addEvent = function (options) {
                    var self = this;
                    // resolve mixin properties     
                    var event;
                    if (options.mixins) {
                        var mixinTarget = lists_3.chain(options.mixins)
                            .map(function (mixin) {
                            var def = self._resolver.findAnimation(mixin);
                            if (!type_7.isDefined(def)) {
                                throw errors_4.invalidArg('mixin');
                            }
                            return def;
                        })
                            .reduce(function (c, n) { return objects_1.deepCopyObject(n, c); });
                        event = objects_1.inherit(options, mixinTarget);
                    }
                    else {
                        event = options;
                    }
                    // set from and to relative to existing duration    
                    units_1.fromTime(event.from || 0, unitOut);
                    event.from = unitOut.value + this._duration;
                    units_1.fromTime(event.to || 0, unitOut);
                    event.to = unitOut.value + this._duration;
                    // set easing to linear by default     
                    var easingFn = easings_1.getEasingFunction(event.easing);
                    event.easing = easings_1.getEasingString(event.easing);
                    lists_3.each(this._plugins, function (plugin) {
                        if (plugin.canHandle(event)) {
                            var targets = elements_2.queryElements(event.targets);
                            for (var i = 0, len = targets.length; i < len; i++) {
                                var target = targets[i];
                                var animator = plugin.handle({
                                    index: i,
                                    options: event,
                                    target: target,
                                    targets: targets
                                });
                                self._events.push({
                                    animator: animator,
                                    easingFn: easingFn,
                                    endTimeMs: event.from + animator.totalDuration,
                                    index: i,
                                    startTimeMs: event.from,
                                    target: target,
                                    targets: targets
                                });
                            }
                        }
                    });
                };
                Animator.prototype._onCancel = function (self) {
                    self._timeLoop.off(self._onTick);
                    self._currentTime = 0;
                    self._playState = 'idle';
                    lists_3.each(self._events, function (evt) { evt.animator.playState('idle'); });
                };
                Animator.prototype._onFinish = function (self) {
                    self._timeLoop.off(self._onTick);
                    self._currentTime = 0;
                    self._playState = 'finished';
                    lists_3.each(self._events, function (evt) { evt.animator.playState('finished'); });
                };
                Animator.prototype._onPause = function (self) {
                    self._timeLoop.off(self._onTick);
                    self._playState = 'paused';
                    lists_3.each(self._events, function (evt) { evt.animator.playState('paused'); });
                };
                Animator.prototype._onTick = function (delta, runningTime) {
                    var self = this;
                    var dispatcher = self._dispatcher;
                    var playState = self._playState;
                    var context = self._context;
                    // canceled
                    if (playState === 'idle') {
                        dispatcher.trigger(resources_11.cancel, [self]);
                        return;
                    }
                    // finished
                    if (playState === 'finished') {
                        dispatcher.trigger(resources_11.finish, [self]);
                        return;
                    }
                    // paused
                    if (playState === 'paused') {
                        dispatcher.trigger(resources_11.pause, [self]);
                        return;
                    }
                    // running/pending
                    var playbackRate = self._playbackRate;
                    var isReversed = playbackRate < 0;
                    // calculate running range
                    var duration1 = self._duration;
                    var startTime = isReversed ? duration1 : 0;
                    var endTime = isReversed ? 0 : duration1;
                    if (self._playState === 'pending') {
                        var currentTime_1 = self._currentTime;
                        self._currentTime = currentTime_1 === resources_11.nil || currentTime_1 === endTime ? startTime : currentTime_1;
                        self._playState = 'running';
                    }
                    // calculate currentTime from delta
                    var currentTime = self._currentTime + delta * playbackRate;
                    self._currentTime = currentTime;
                    // check if animation has finished
                    if (!math_1.inRange(currentTime, startTime, endTime)) {
                        dispatcher.trigger(resources_11.finish, [self]);
                        return;
                    }
                    // start animations if should be active and currently aren't   
                    var events = self._events;
                    var eventLength = events.length;
                    for (var i = 0; i < eventLength; i++) {
                        var evt = events[i];
                        var startTimeMs = playbackRate < 0 ? evt.startTimeMs : evt.startTimeMs + animationPadding;
                        var endTimeMs = playbackRate >= 0 ? evt.endTimeMs : evt.endTimeMs - animationPadding;
                        var shouldBeActive = startTimeMs <= currentTime && currentTime <= endTimeMs;
                        if (shouldBeActive) {
                            var animator = evt.animator;
                            if (animator.playState() !== 'running') {
                                animator.playbackRate(playbackRate);
                                animator.playState('running');
                            }
                            animator.playbackRate(playbackRate);
                            if (animator.onupdate) {
                                // calculate relative timing properties
                                var relativeDuration = evt.endTimeMs - evt.startTimeMs;
                                var relativeCurrentTime = currentTime - evt.startTimeMs;
                                var timeOffset = relativeCurrentTime / relativeDuration;
                                // set context object values for this update cycle            
                                context.currentTime = relativeCurrentTime;
                                context.delta = delta;
                                context.duration = relativeDuration;
                                context.offset = timeOffset;
                                context.playbackRate = playbackRate;
                                context.computedOffset = evt.easingFn(timeOffset);
                                context.target = evt.target;
                                context.targets = evt.targets;
                                context.index = evt.index;
                                animator.onupdate(context);
                            }
                        }
                    }
                };
                return Animator;
            }());
            exports_93("Animator", Animator);
        }
    };
});
System.register("just-animate/JustAnimate", ["just-animate/common/lists", "just-animate/common/random", "just-animate/plugins/core/Animator", "just-animate/plugins/core/TimeLoop", "just-animate/plugins/core/MixinService"], function (exports_94, context_94) {
    "use strict";
    var __moduleName = context_94 && context_94.id;
    var lists_4, random_1, Animator_1, TimeLoop_1, MixinService_1, JustAnimate;
    return {
        setters: [
            function (lists_4_1) {
                lists_4 = lists_4_1;
            },
            function (random_1_1) {
                random_1 = random_1_1;
            },
            function (Animator_1_1) {
                Animator_1 = Animator_1_1;
            },
            function (TimeLoop_1_1) {
                TimeLoop_1 = TimeLoop_1_1;
            },
            function (MixinService_1_1) {
                MixinService_1 = MixinService_1_1;
            }
        ],
        execute: function () {
            JustAnimate = (function () {
                function JustAnimate() {
                    /**
                     * List of supported easing functions
                     *
                     * @type {ja.EasingList}
                     * @memberOf JustAnimate
                     */
                    this.easings = {
                        ease: 'ease',
                        easeIn: 'easeIn',
                        easeInBack: 'easeInBack',
                        easeInCirc: 'easeInCirc',
                        easeInCubic: 'easeInCubic',
                        easeInExpo: 'easeInExpo',
                        easeInOut: 'easeInOut',
                        easeInOutBack: 'easeInOutBack',
                        easeInOutCirc: 'easeInOutCirc',
                        easeInOutCubic: 'easeInOutCubic',
                        easeInOutExpo: 'easeInOutExpo',
                        easeInOutQuad: 'easeInOutQuad',
                        easeInOutQuart: 'easeInOutQuart',
                        easeInOutQuint: 'easeInOutQuint',
                        easeInOutSine: 'easeInOutSine',
                        easeInQuad: 'easeInQuad',
                        easeInQuart: 'easeInQuart',
                        easeInQuint: 'easeInQuint',
                        easeInSine: 'easeInSine',
                        easeOut: 'easeOut',
                        easeOutBack: 'easeOutBack',
                        easeOutCirc: 'easeOutCirc',
                        easeOutCubic: 'easeOutCubic',
                        easeOutExpo: 'easeOutExpo',
                        easeOutQuad: 'easeOutQuad',
                        easeOutQuart: 'easeOutQuart',
                        easeOutQuint: 'easeOutQuint',
                        easeOutSine: 'easeOutSine',
                        elegantSlowStartEnd: 'elegantSlowStartEnd',
                        linear: 'linear',
                        stepEnd: 'stepEnd',
                        stepStart: 'stepStart'
                    };
                    var self = this;
                    self._resolver = new MixinService_1.MixinService();
                    self._timeLoop = TimeLoop_1.TimeLoop();
                    self.plugins = [];
                }
                /**
                 * Register a list of mixins across all instances of JustAnimate
                 *
                 * @static
                 * @param {ja.IAnimationMixin[]} animations
                 *
                 * @memberOf JustAnimate
                 */
                JustAnimate.inject = function (animations) {
                    var resolver = new MixinService_1.MixinService();
                    lists_4.each(animations, function (a) { return resolver.registerAnimation(a, true); });
                };
                /**
                 * Returns a new timeline of animation(s) using the options provided
                 *
                 * @param {(ja.IAnimationOptions | ja.IAnimationOptions[])} options
                 * @returns {ja.IAnimator}
                 *
                 * @memberOf JustAnimate
                 */
                JustAnimate.prototype.animate = function (options) {
                    return new Animator_1.Animator(this._resolver, this._timeLoop, this.plugins).animate(options);
                };
                /**
                 * Generates a random number between the first and last number (exclusive)
                 *
                 * @param {number} first number; start of range
                 * @param {number} last number: end of range
                 * @returns {number} at or between the first number until the last number
                 *
                 * @memberOf JustAnimate
                 */
                JustAnimate.prototype.random = function (first, last) {
                    return random_1.random(first, last);
                };
                /**
                 * Registers a mixin to this instance of JustAnimate.
                 *
                 * @param {ja.IAnimationMixin} preset
                 *
                 * @memberOf JustAnimate
                 */
                JustAnimate.prototype.register = function (preset) {
                    this._resolver.registerAnimation(preset, false);
                };
                /**
                 * Returns one of the supplied values at random
                 *
                 * @template T
                 * @param {T[]} choices from which to choose
                 * @returns {T} a choice at random
                 *
                 * @memberOf JustAnimate
                 */
                JustAnimate.prototype.shuffle = function (choices) {
                    return random_1.shuffle(choices);
                };
                /**
                 * Registers a list of mixins across all instances of JustAnimate.  Same as register in a browser environment
                 *
                 * @param {ja.IAnimationMixin[]} animations
                 *
                 * @memberOf JustAnimate
                 */
                JustAnimate.prototype.inject = function (animations) {
                    var resolver = this._resolver;
                    lists_4.each(animations, function (a) { return resolver.registerAnimation(a, true); });
                };
                return JustAnimate;
            }());
            exports_94("JustAnimate", JustAnimate);
        }
    };
});
System.register("just-animate/index", ["just-animate/animations", "just-animate/JustAnimate"], function (exports_95, context_95) {
    "use strict";
    var __moduleName = context_95 && context_95.id;
    var animations;
    return {
        setters: [
            function (animations_1) {
                animations = animations_1;
            },
            function (JustAnimate_1_1) {
                exports_95({
                    "JustAnimate": JustAnimate_1_1["JustAnimate"]
                });
            }
        ],
        execute: function () {
            exports_95("animations", animations);
        }
    };
});
System.register("just-animate/plugins/waapi/KeyframeAnimator", ["just-animate/common/resources"], function (exports_96, context_96) {
    "use strict";
    var __moduleName = context_96 && context_96.id;
    var resources_12, KeyframeAnimator;
    return {
        setters: [
            function (resources_12_1) {
                resources_12 = resources_12_1;
            }
        ],
        execute: function () {
            KeyframeAnimator = (function () {
                function KeyframeAnimator(init) {
                    this._init = init;
                }
                KeyframeAnimator.prototype.seek = function (value) {
                    this._ensureInit();
                    if (this._animator.currentTime !== value) {
                        this._animator.currentTime = value;
                    }
                };
                KeyframeAnimator.prototype.playbackRate = function (value) {
                    this._ensureInit();
                    if (this._animator.playbackRate !== value) {
                        this._animator.playbackRate = value;
                    }
                };
                KeyframeAnimator.prototype.reverse = function () {
                    this._ensureInit();
                    this._animator.playbackRate *= -1;
                };
                KeyframeAnimator.prototype.playState = function (value) {
                    var self = this;
                    self._ensureInit();
                    var animator = self._animator;
                    var playState = animator.playState;
                    if (value === resources_12.nil) {
                        return playState;
                    }
                    if (value === resources_12.finished) {
                        animator.finish();
                    }
                    else if (value === resources_12.idle) {
                        animator.cancel();
                    }
                    else if (value === resources_12.paused) {
                        animator.pause();
                    }
                    else if (value === resources_12.running) {
                        animator.play();
                    }
                };
                KeyframeAnimator.prototype._ensureInit = function () {
                    if (this._init) {
                        this._animator = this._init();
                        this._init = resources_12.nil;
                    }
                };
                return KeyframeAnimator;
            }());
            exports_96("KeyframeAnimator", KeyframeAnimator);
        }
    };
});
System.register("just-animate/plugins/waapi/KeyframeTransformers", ["just-animate/common/type", "just-animate/common/strings", "just-animate/plugins/core/easings", "just-animate/common/lists", "just-animate/common/objects", "just-animate/common/resources"], function (exports_97, context_97) {
    "use strict";
    var __moduleName = context_97 && context_97.id;
    function initAnimator(timings, ctx) {
        // process css as either keyframes or calculate what those keyframes should be   
        var options = ctx.options;
        var target = ctx.target;
        var css = options.css;
        var sourceKeyframes;
        if (type_8.isArray(css)) {
            // if an array, no processing has to occur
            sourceKeyframes = css;
            expandOffsets(sourceKeyframes);
        }
        else {
            sourceKeyframes = [];
            propsToKeyframes(css, sourceKeyframes, ctx);
        }
        var targetKeyframes = [];
        resolvePropertiesInKeyframes(sourceKeyframes, targetKeyframes, ctx);
        if (options.isTransition === true) {
            addTransition(targetKeyframes, target);
        }
        spaceKeyframes(targetKeyframes);
        arrangeKeyframes(targetKeyframes);
        fixPartialKeyframes(targetKeyframes);
        var animator = target[resources_13.animate](targetKeyframes, timings);
        animator.cancel();
        return animator;
    }
    function addTransition(keyframes, target) {
        // detect properties to transition
        var properties = objects_2.listProps(keyframes);
        // copy properties from the dom to the animation
        // todo: check how to do this in IE8, or not?
        var style = window.getComputedStyle(target);
        // create the first frame
        var firstFrame = { offset: 0 };
        keyframes.splice(0, 0, firstFrame);
        properties.forEach(function (property) {
            // skip offset property
            if (property === resources_13.offsetString) {
                return;
            }
            var alias = transforms.indexOf(property) !== -1 ? resources_13.transform : property;
            var val = style[alias];
            if (type_8.isDefined(val)) {
                firstFrame[alias] = val;
            }
        });
    }
    /**
     * copies keyframs with an offset array to separate keyframes
     *
     * @export
     * @param {waapi.IKeyframe[]} keyframes
     */
    function expandOffsets(keyframes) {
        var len = keyframes.length;
        for (var i = len - 1; i > -1; --i) {
            var keyframe = keyframes[i];
            if (!type_8.isArray(keyframe.offset)) {
                continue;
            }
            keyframes.splice(i, 1);
            var offsets = keyframe.offset;
            var offsetLen = offsets.length;
            for (var j = 0; j < offsetLen; j++) {
                var newKeyframe = objects_2.deepCopyObject(keyframe);
                newKeyframe.offset = offsets[j];
                keyframes.splice(i, 0, newKeyframe);
            }
        }
        // resort by offset    
        keyframes.sort(keyframeOffsetComparer);
    }
    function resolvePropertiesInKeyframes(source, target, ctx) {
        var len = source.length;
        for (var i = 0; i < len; i++) {
            var sourceKeyframe = source[i];
            var targetKeyframe = {};
            for (var propertyName in sourceKeyframe) {
                if (!sourceKeyframe.hasOwnProperty(propertyName)) {
                    continue;
                }
                var sourceValue = sourceKeyframe[propertyName];
                if (!type_8.isDefined(sourceValue)) {
                    continue;
                }
                targetKeyframe[propertyName] = objects_2.resolve(sourceValue, ctx);
            }
            normalizeProperties(targetKeyframe);
            target.push(targetKeyframe);
        }
    }
    function propsToKeyframes(css, keyframes, ctx) {
        // create a map to capture each keyframe by offset
        var keyframesByOffset = {};
        var cssProps = css;
        // iterate over each property split it into keyframes            
        for (var prop in cssProps) {
            if (!cssProps.hasOwnProperty(prop)) {
                continue;
            }
            // resolve value (changes function into discrete value or array)                    
            var val = objects_2.resolve(cssProps[prop], ctx);
            if (type_8.isArray(val)) {
                // if the value is an array, split up the offset automatically
                var valAsArray = val;
                var valLength = valAsArray.length;
                for (var i = 0; i < valLength; i++) {
                    var offset = i === 0 ? 0 : i === valLength - 1 ? 1 : i / (valLength - 1.0);
                    var keyframe = keyframesByOffset[offset];
                    if (!keyframe) {
                        keyframe = {};
                        keyframesByOffset[offset] = keyframe;
                    }
                    keyframe[prop] = val[i];
                }
            }
            else {
                // if the value is not an array, place it at offset 1
                var keyframe = keyframesByOffset[1];
                if (!keyframe) {
                    keyframe = {};
                    keyframesByOffset[1] = keyframe;
                }
                keyframe[prop] = val;
            }
        }
        // reassemble as array
        for (var offset in keyframesByOffset) {
            var keyframe = keyframesByOffset[offset];
            keyframe.offset = Number(offset);
            keyframes.push(keyframe);
        }
        // resort by offset    
        keyframes.sort(keyframeOffsetComparer);
    }
    function spaceKeyframes(keyframes) {
        // don't attempt to fill animation if less than 2 keyframes
        if (keyframes.length < 2) {
            return;
        }
        var first = keyframes[0];
        // ensure first offset    
        if (first.offset !== 0) {
            first.offset = 0;
        }
        var last = keyframes[keyframes.length - 1];
        // ensure last offset
        if (last.offset !== 1) {
            last.offset = 1;
        }
        // explicitly set implicit offsets
        var len = keyframes.length;
        var lasti = len - 1;
        for (var i = 1; i < lasti; i++) {
            var target = keyframes[i];
            // skip entries that have an offset        
            if (type_8.isNumber(target.offset)) {
                continue;
            }
            // search for the next offset with a value        
            for (var j = i + 1; j < len; j++) {
                // pass if offset is not set
                if (!type_8.isNumber(keyframes[j].offset)) {
                    continue;
                }
                // calculate timing/position info
                var startTime = keyframes[i - 1].offset;
                var endTime = keyframes[j].offset;
                var timeDelta = endTime - startTime;
                var deltaLength = j - i + 1;
                // set the values of all keyframes between i and j (exclusive)
                for (var k = 1; k < deltaLength; k++) {
                    // set to percentage of change over time delta + starting time
                    keyframes[k - 1 + i].offset = ((k / j) * timeDelta) + startTime;
                }
                // move i past this keyframe since all frames between should be processed
                i = j;
                break;
            }
        }
    }
    function arrangeKeyframes(keyframes) {
        // don't arrange frames if there aren't any
        if (keyframes.length < 1) {
            return;
        }
        var first = lists_5.head(keyframes, function (k) { return k.offset === 0; })
            || lists_5.head(keyframes, function (k) { return k.offset === resources_13.nil; });
        if (first === resources_13.nil) {
            first = {};
            keyframes.splice(0, 0, first);
        }
        if (first.offset !== 0) {
            first.offset = 0;
        }
        var last = lists_5.tail(keyframes, function (k) { return k.offset === 1; })
            || lists_5.tail(keyframes, function (k) { return k.offset === resources_13.nil; });
        if (last === resources_13.nil) {
            last = {};
            keyframes.push(last);
        }
        if (last.offset !== 1) {
            last.offset = 0;
        }
        // sort by offset (should have all offsets assigned)
        keyframes.sort(keyframeOffsetComparer);
    }
    /**
     * If a property is missing at the start or end keyframe, the first or last instance of it is moved to the end.
     */
    function fixPartialKeyframes(keyframes) {
        // don't attempt to fill animation if less than 1 keyframes
        if (keyframes.length < 1) {
            return;
        }
        var first = lists_5.head(keyframes);
        var last = lists_5.tail(keyframes);
        // fill initial keyframe with missing props
        var len = keyframes.length;
        for (var i = 1; i < len; i++) {
            var keyframe = keyframes[i];
            for (var prop in keyframe) {
                if (prop !== resources_13.offsetString && !type_8.isDefined(first[prop])) {
                    first[prop] = keyframe[prop];
                }
            }
        }
        // fill end keyframe with missing props
        for (var i = len - 2; i > -1; i--) {
            var keyframe = keyframes[i];
            for (var prop in keyframe) {
                if (prop !== resources_13.offsetString && !type_8.isDefined(last[prop])) {
                    last[prop] = keyframe[prop];
                }
            }
        }
    }
    function keyframeOffsetComparer(a, b) {
        return a.offset - b.offset;
    }
    function transformPropertyComparer(a, b) {
        return transforms.indexOf(a[0]) - transforms.indexOf(b[0]);
    }
    /**
     * Handles transforming short hand key properties into their native form
     */
    function normalizeProperties(keyframe) {
        var cssTransforms = [];
        for (var prop in keyframe) {
            var value = keyframe[prop];
            if (!type_8.isDefined(value)) {
                keyframe[prop] = resources_13.nil;
                continue;
            }
            // nullify properties so shorthand and handled properties don't end up in the result
            keyframe[prop] = resources_13.nil;
            // get the final property name
            var propAlias = propertyAliases[prop] || prop;
            // find out if the property needs to end up on transform
            var transformIndex = transforms.indexOf(propAlias);
            if (transformIndex !== -1) {
                // handle transforms
                cssTransforms.push([propAlias, value]);
            }
            else if (propAlias === resources_13.easingString) {
                // handle easings
                keyframe[resources_13.easingString] = easings_2.getEasingString(value);
            }
            else {
                // handle others (change background-color and the like to backgroundColor)
                keyframe[strings_2.toCamelCase(propAlias)] = value;
            }
        }
        if (cssTransforms.length) {
            keyframe[resources_13.transform] = cssTransforms
                .sort(transformPropertyComparer)
                .reduce(function (c, n) { return c + (" " + n[0] + "(" + n[1] + ")"); }, '');
        }
    }
    var type_8, strings_2, easings_2, lists_5, objects_2, resources_13, propertyAliases, transforms;
    exports_97("initAnimator", initAnimator);
    exports_97("addTransition", addTransition);
    exports_97("expandOffsets", expandOffsets);
    exports_97("resolvePropertiesInKeyframes", resolvePropertiesInKeyframes);
    exports_97("propsToKeyframes", propsToKeyframes);
    exports_97("spaceKeyframes", spaceKeyframes);
    exports_97("arrangeKeyframes", arrangeKeyframes);
    exports_97("fixPartialKeyframes", fixPartialKeyframes);
    exports_97("keyframeOffsetComparer", keyframeOffsetComparer);
    exports_97("transformPropertyComparer", transformPropertyComparer);
    exports_97("normalizeProperties", normalizeProperties);
    return {
        setters: [
            function (type_8_1) {
                type_8 = type_8_1;
            },
            function (strings_2_1) {
                strings_2 = strings_2_1;
            },
            function (easings_2_1) {
                easings_2 = easings_2_1;
            },
            function (lists_5_1) {
                lists_5 = lists_5_1;
            },
            function (objects_2_1) {
                objects_2 = objects_2_1;
            },
            function (resources_13_1) {
                resources_13 = resources_13_1;
            }
        ],
        execute: function () {
            propertyAliases = {
                x: resources_13.translateX,
                y: resources_13.translateY,
                z: resources_13.translateZ
            };
            transforms = [
                'perspective',
                'matrix',
                resources_13.translateX,
                resources_13.translateY,
                resources_13.translateZ,
                resources_13.translate,
                resources_13.translate3d,
                resources_13.x,
                resources_13.y,
                resources_13.z,
                resources_13.skew,
                resources_13.skewX,
                resources_13.skewY,
                resources_13.rotateX,
                resources_13.rotateY,
                resources_13.rotateZ,
                resources_13.rotate,
                resources_13.rotate3d,
                resources_13.scaleX,
                resources_13.scaleY,
                resources_13.scaleZ,
                resources_13.scale,
                resources_13.scale3d
            ];
        }
    };
});
System.register("just-animate/plugins/waapi/KeyframePlugin", ["just-animate/plugins/waapi/KeyframeAnimator", "just-animate/common/units", "just-animate/common/type", "just-animate/plugins/core/easings", "just-animate/common/objects", "just-animate/common/resources", "just-animate/plugins/waapi/KeyframeTransformers"], function (exports_98, context_98) {
    "use strict";
    var __moduleName = context_98 && context_98.id;
    var KeyframeAnimator_1, units_2, type_9, easings_3, objects_3, resources_14, KeyframeTransformers_1, KeyframePlugin;
    return {
        setters: [
            function (KeyframeAnimator_1_1) {
                KeyframeAnimator_1 = KeyframeAnimator_1_1;
            },
            function (units_2_1) {
                units_2 = units_2_1;
            },
            function (type_9_1) {
                type_9 = type_9_1;
            },
            function (easings_3_1) {
                easings_3 = easings_3_1;
            },
            function (objects_3_1) {
                objects_3 = objects_3_1;
            },
            function (resources_14_1) {
                resources_14 = resources_14_1;
            },
            function (KeyframeTransformers_1_1) {
                KeyframeTransformers_1 = KeyframeTransformers_1_1;
            }
        ],
        execute: function () {
            KeyframePlugin = (function () {
                function KeyframePlugin() {
                }
                KeyframePlugin.prototype.canHandle = function (options) {
                    return !!(options.css);
                };
                KeyframePlugin.prototype.handle = function (ctx) {
                    var options = ctx.options;
                    var delay = units_2.resolveTimeExpression(objects_3.resolve(options.delay, ctx) || 0, ctx.index);
                    var endDelay = units_2.resolveTimeExpression(objects_3.resolve(options.endDelay, ctx) || 0, ctx.index);
                    var iterations = objects_3.resolve(options.iterations, ctx) || 1;
                    var iterationStart = objects_3.resolve(options.iterationStart, ctx) || 0;
                    var direction = objects_3.resolve(options.direction, ctx) || resources_14.nil;
                    var duration = options.to - options.from;
                    var fill = objects_3.resolve(options.fill, ctx) || 'none';
                    var totalTime = delay + ((iterations || 1) * duration) + endDelay;
                    // note: don't unwrap easings so we don't break this later with custom easings
                    var easing = easings_3.getEasingString(options.easing);
                    var timings = {
                        delay: delay,
                        endDelay: endDelay,
                        duration: duration,
                        iterations: iterations,
                        iterationStart: iterationStart,
                        fill: fill,
                        direction: direction,
                        easing: easing
                    };
                    var animator = new KeyframeAnimator_1.KeyframeAnimator(KeyframeTransformers_1.initAnimator.bind(resources_14.nada, timings, ctx));
                    animator.totalDuration = totalTime;
                    if (type_9.isFunction(options.update)) {
                        animator.onupdate = options.update;
                    }
                    return animator;
                };
                return KeyframePlugin;
            }());
            exports_98("KeyframePlugin", KeyframePlugin);
        }
    };
});
