/*!
* Qoopido.js library v3.4.3, 2014-6-11
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.3
* date:    2014-6-11
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(t){window.qoopido.register("function/merge",t)}(function(t,e,n,o,r,u,f){"use strict";return function i(){var t,e,n,o,r,u=arguments[0];for(t=1;(e=arguments[t])!==f;t++)for(n in e)o=u[n],r=e[n],r!==f&&(null!==r&&"object"==typeof r?(o=r.length!==f?o&&"object"==typeof o&&o.length!==f?o:[]:o&&"object"==typeof o&&o.length===f?o:{},u[n]=i(o,r)):u[n]=r);return u}});