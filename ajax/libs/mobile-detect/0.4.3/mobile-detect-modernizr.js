/*global Modernizr MobileDetect*/

(function (window, Modernizr) {
    'use strict';
    var md = new MobileDetect(navigator.userAgent),
        grade = md.mobileGrade();
    Modernizr.addTest({
        mobile: !!md.mobile(),
        phone: !!md.phone(),
        tablet: !!md.tablet(),
        mobilegradea: grade === 'A'
    });
    window.mobileDetect = md;
})(window, Modernizr);

