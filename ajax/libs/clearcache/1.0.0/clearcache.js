var href = location.href, origin = location.origin, pathname = location.pathname, search = location.search, hash = location.hash;
var searchs = search.replace(/_t_=[^&\?]*[&\?]*/g, '').replace(/(^[&\?]*)|([&\?]*$)/g, '');
var ct = parseInt(new Date().valueOf() / 10000);
var _t_ = (/_t_=[^&\?]*[&\?]*/.exec(href) || [])[0];
if(_t_){
  _t_ = +_t_.replace(/(_t_=)|\?|&/g, '');
  var _t_p = +(localStorage.getItem('_t_') || ct);
  _t_p !== ct ? add() : clear();
} else add(true);
function add(bol){
  (document.getElementsByTagName('html')[0] || {}).innerHTML = '';
  localStorage.setItem('_t_', ct);
  if(bol) location.replace(origin + pathname + '?' + searchs + (searchs ? '&' : '') + '_t_=' + ct + hash);
  else location.replace(origin + pathname + '?' + searchs + (searchs ? '&' : '') + '_t_=' + ct + hash);
}
function clear(){
  history.replaceState({}, null, origin + pathname + (searchs ? '?' : '') + searchs + hash);
  clear = undefined;
}
