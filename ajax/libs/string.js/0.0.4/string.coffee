#String::isCharBetween = (idx) -> 
#  if idx?
#    return this.charCodeAt(i)

String::contains = (needle) -> this.indexOf(needle) >= 0

String::endsWith = (suffix) ->  #Thanks Google
  l = this.length - suffix.length;
  l >= 0 && this.indexOf(suffix, l) == l;

String::includes = (needle) -> this.contains(needle)

String::isAlpha = -> !/[^a-zA-Z]/.test(this)

String::isAlphaDigit = -> !/[^a-zA-Z0-9]/.test(this)

String::isDigit = -> !/[^0-9]/.test(this) #this does not include 'Infinity' or '-Infinity'

String::isNum = -> Number(this).toString() != 'NaN' #this includes 'Infinity' and '-Infinity'

String::startsWith = (prefix) -> this.lastIndexOf(prefix, 0) == 0 #Thanks Google

if typeof(String::trim) isnt 'function'
  String::trim = -> return this.replace(/(^\s*|\s*$)/g, '')

