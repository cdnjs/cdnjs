'use strict';

$(document).ready(function () {
    $('.burger-contain').click(function () {
        $('.burger-nav').toggleClass('open');
        $('.burger-nav').fadeToggle(600);
        $(this).toggleClass('open');
        $('.burger-brand').toggleClass('open');
    });
});
