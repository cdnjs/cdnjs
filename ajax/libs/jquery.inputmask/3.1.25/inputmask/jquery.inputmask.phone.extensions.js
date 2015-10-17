/*
* jquery.inputmask.phone.extensions.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.25
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery","./jquery.inputmask"],a):a(jQuery)}(function(a){return a.extend(a.inputmask.defaults.aliases,{phone:{url:"phone-codes/phone-codes.js",maskInit:"+pp(pp)pppppppp",mask:function(b){b.definitions={p:{validator:function(){return!1},cardinality:1},"#":{validator:"[0-9]",cardinality:1}};var c=[];return a.ajax({url:b.url,async:!1,dataType:"json",success:function(a){c=a}}),c.splice(0,0,b.maskInit),c.sort(function(a,b){return a.length-b.length}),c},nojumps:!0,nojumpsThreshold:1},phonebe:{alias:"phone",url:"phone-codes/phone-be.js",maskInit:"+32(pp)pppppppp",nojumpsThreshold:4}}),a.fn.inputmask});