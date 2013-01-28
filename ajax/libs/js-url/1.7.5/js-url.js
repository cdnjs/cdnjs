/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This websanova JavaScript url is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @github          http://github.com/websanova/js-url
 * @version			1.7.5
 *
 ******************************************/

window.url = (function() {
	function isNumeric(arg) {
	  return !isNaN(parseFloat(arg)) && isFinite(arg);
	}
	
	return function url(arg, url) {
		var _ls = url || window.location.toString();

		if(_ls.substring(0,2) === '//') _ls = 'http:' + _ls;
		else if(_ls.split('://').length === 1) _ls = 'http://' + _ls;

		url = _ls.split('/');
		var _l = {auth:''}, host = url[2].split('@');

		if(host.length === 1) host = host[0].split(':');
		else{ _l.auth = host[0]; host = host[1].split(':'); }

		_l.protocol=url[0], _l.hostname=host[0], _l.port=(host[1]||'80'), _l.pathname='/' + url.slice(3, url.length).join('/').split('?')[0].split('#')[0];
		var _p = _l.pathname;
		if(_p.split('.').length === 1 && _p[_p.length-1] !== '/') _p += '/';
		var _h = _l.hostname, _hs = _h.split('.'), _ps = _p.split('/');

		if(!arg) return _ls;
		else if(arg === 'hostname') return _h;
		else if(arg === 'domain') return _hs.slice(-2).join('.');
		else if(arg === 'tld') return _hs.slice(-1).join('.');
		else if(arg === 'sub') return _hs.slice(0, _hs.length - 2).join('.');
		else if(arg === 'port') return _l.port || '80';
		else if(arg === 'protocol') return _l.protocol.split(':')[0];
		else if(arg === 'auth') return _l.auth;
		else if(arg === 'user') return _l.auth.split(':')[0];
		else if(arg === 'pass') return _l.auth.split(':')[1] || '';
		else if(arg === 'path') return _p;
		else if(arg[0] === '.')
		{
			arg = arg.substring(1);
			if(isNumeric(arg)) {arg = parseInt(arg); return _hs[arg < 0 ? _hs.length + arg : arg-1] || ''; }
		}
		else if(isNumeric(arg)){ arg = parseInt(arg); return _ps[arg < 0 ? _ps.length - 1 + arg : arg] || ''; }
		else if(arg === 'file') return _ps.slice(-1)[0];
		else if(arg === 'filename') return _ps.slice(-1)[0].split('.')[0];
		else if(arg === 'fileext') return _ps.slice(-1)[0].split('.')[1] || '';
		else if(arg[0] === '?' || arg[0] === '#')
		{
			var params = _ls, param = null;

			if(arg[0] === '?') params = (params.split('?')[1] || '').split('#')[0];
			else if(arg[0] === '#') params = (params.split('#')[1] || '');

			if(!arg[1]) return params;

			arg = arg.substring(1);
			params = params.split('&');

			for(var i=0,ii=params.length; i<ii; i++)
			{
				param = params[i].split('=');
				if(param[0] === arg) return param[1];
			}
		}

		return '';
	}
})();
