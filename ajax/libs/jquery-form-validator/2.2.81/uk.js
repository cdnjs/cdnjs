/**
 *  JQUERY-FORM-VALIDATOR
 *
 *  @website by 
 *  @license MIT
 *  @version 2.2.81
 */
$.formUtils.addValidator({name:"ukvatnumber",validatorFunction:function(a){if(a=a.replace(/[^0-9]/g,""),a.length<9)return!1;var b=!1,c=[];c=a.split("");var d=Number(c[7]+c[8]),e=c[0],f=c[1];if(0==e&&f>0)return!1;for(var g=0,h=0;7>h;h++)g+=c[h]*(8-h);for(var i=0,h=0,j=8;j>=2;j--)i+=c[h]*j,h++;for(;g>0;)g-=97;return g=Math.abs(g),d==g&&(b=!0),b||(g%=97,g>=55?g-=55:g+=42,g==d&&(b=!0)),b},errorMessage:"",errorMessageKey:"badUKVatAnswer"});