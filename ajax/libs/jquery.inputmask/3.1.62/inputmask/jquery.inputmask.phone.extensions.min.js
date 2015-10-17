/*!
* jquery.inputmask.phone.extensions.min.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.62
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery","./jquery.inputmask"],a):a(jQuery)}(function(a){return a.extend(a.inputmask.defaults.aliases,{phone:{url:"phone-codes/phone-codes.js",maskInit:"+pp(pp)pppppppp",countrycode:"",mask:function(b){b.definitions={p:{validator:function(){return!1},cardinality:1},"#":{validator:"[0-9]",cardinality:1}};var c=[];return a.ajax({url:b.url,async:!1,dataType:"json",success:function(a){c=a},error:function(a,c,d){alert(d+" - "+b.url)}}),c=c.sort(function(a,b){return(a.mask||a)<(b.mask||b)?-1:1}),""!=b.countrycode&&(b.maskInit="+"+b.countrycode+b.maskInit.substring(3)),c.splice(0,0,b.maskInit),c},nojumps:!0,nojumpsThreshold:1,onBeforeMask:function(a,b){var c=a.replace(/^0/g,"");return(c.indexOf(b.countrycode)>1||-1==c.indexOf(b.countrycode))&&(c="+"+b.countrycode+c),c}},phonebe:{alias:"phone",url:"phone-codes/phone-be.js",countrycode:"32",nojumpsThreshold:4}}),a.fn.inputmask});