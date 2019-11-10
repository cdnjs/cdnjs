/*! jQuery requestAnimationFrame - 0.1.3-pre - 2016-10-26
* https://github.com/gnarf37/jquery-requestAnimationFrame
 * Copyright (c) 2016 Corey Frang; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(){c&&(window.requestAnimationFrame(b),a.fx.tick())}if(Number(a.fn.jquery.split(".")[0])>=3)return void(window.console&&window.console.warn&&window.console.warn("The jquery.requestanimationframe plugin is not needed in jQuery 3.0 or newer as they handle it natively."));var c;window.requestAnimationFrame&&(a.fx.timer=function(d){d()&&a.timers.push(d)&&!c&&(c=!0,b())},a.fx.stop=function(){c=!1})});
//# sourceMappingURL=jquery.requestanimationframe.min.map