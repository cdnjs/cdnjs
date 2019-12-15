/*!
 * ZUI: JS配色表 - v1.9.0 - 2019-03-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2019 cnezsoft.com; Licensed MIT
 */

/*!
 * ZUI: Generated from less code - v1.9.0 - 2019-03-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2019 cnezsoft.com; Licensed MIT
 */

(function($) {
    'use strict';
    var nextColorIndex = 0;
    var presetColors = ['primary', 'red', 'yellow', 'green', 'blue', 'purple', 'brown', 'dark'];

    var colorset = {
        primary: '#3280fc',
        secondary: '#145ccd',
        pale: '#ebf2f9',
        fore: '#353535',
        back: '#fff',
        grayDarker: '#222222',
        grayDark: '#333333',
        gray: '#808080',
        grayLight: '#dddddd',
        grayLighter: '#e5e5e5',
        grayPale: '#f1f1f1',
        white: '#fff',
        black: '#000',
        red: '#ea644a',
        yellow: '#f1a325',
        green: '#38b03f',
        blue: '#03b8cf',
        purple: '#8666b8',
        brown: '#bd7b46',
        greenPale: '#ddf4df',
        yellowPale: '#fff0d5',
        redPale: '#ffe5e0',
        bluePale: '#ddf3f5',
        brownPale: '#f7ebe1',
        purplePale: '#f5eeff',
        light: '#fff',
        dark: '#353535',
        success: '#38b03f',
        warning: '#f1a325',
        danger: '#ea644a',
        info: '#03b8cf',
        important: '#bd7b46',
        special: '#8666b8',
        successPale: '#ddf4df',
        warningPale: '#fff0d5',
        dangerPale: '#ffe5e0',
        infoPale: '#ddf3f5',
        importantPale: '#f7ebe1',
        specialPale: '#f5eeff'
    };
    
    colorset.get = function(colorName) {
        if(typeof colorName === 'undefined' || colorName === 'random') {
            colorName = presetColors[(nextColorIndex++) % presetColors.length];
        }
        var color = colorset[colorName] ? colorset[colorName] : colorName;
        return $.zui.Color ? new $.zui.Color(color) : color;
    }

    $.zui({colorset: colorset});
    if($.zui.Color) $.extend($.zui.Color, colorset);
}(jQuery));
