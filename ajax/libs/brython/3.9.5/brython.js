// brython.js brython.info
// version [3, 9, 0, 'final', 0]
// implementation [3, 9, 5, 'final', 0]
// version compiled from commented, indented source files at
// github.com/brython-dev/brython
var __BRYTHON__=__BRYTHON__ ||{}
try{
eval("async function* f(){}")}catch(err){console.warn("Your browser is not fully supported. If you are using "+
"Microsoft Edge, please upgrade to the latest version")}
;(function($B){
$B.isWebWorker=('undefined' !==typeof WorkerGlobalScope)&&
("function"===typeof importScripts)&&
(navigator instanceof WorkerNavigator)
$B.isNode=(typeof process !=='undefined')&&(process.release.name==='node')
var _window
if($B.isNode){_window={location:{href:'',origin:'',pathname:''},navigator:{userLanguage:''}}}else{
_window=self}
var href=_window.location.href
$B.protocol=href.split(':')[0]
$B.BigInt=_window.BigInt
$B.indexedDB=_window.indexedDB
var $path
if($B.brython_path===undefined){
var this_url;
if($B.isWebWorker){this_url=_window.location.href;
if(this_url.startsWith("blob:")){this_url=this_url.substr(5)}}else{var scripts=document.getElementsByTagName('script')
this_url=scripts[scripts.length-1].src}
var elts=this_url.split('/')
elts.pop()
$path=$B.brython_path=elts.join('/')+'/'}else{if(! $B.brython_path.endsWith("/")){$B.brython_path+="/"}
$path=$B.brython_path}
var path=_window.location.origin+_window.location.pathname,path_elts=path.split("/")
path_elts.pop()
var $script_dir=$B.script_dir=path_elts.join("/")
$B.__ARGV=[]
$B.webworkers={}
$B.$py_module_path={}
$B.file_cache={}
$B.$py_src={}
$B.path=[$path+'Lib',$path+'libs',$script_dir,$path+'Lib/site-packages']
$B.async_enabled=false
if($B.async_enabled){$B.block={}}
$B.imported={}
$B.precompiled={}
$B.frames_stack=[]
$B.builtins={}
$B.builtins_scope={id:'__builtins__',module:'__builtins__',binding:{}}
$B.builtin_funcs={}
$B.builtin_classes=[]
$B.__getattr__=function(attr){return this[attr]}
$B.__setattr__=function(attr,value){
if(['debug','stdout','stderr'].indexOf(attr)>-1){$B[attr]=value}
else{throw $B.builtins.AttributeError.$factory(
'__BRYTHON__ object has no attribute '+attr)}}
$B.language=_window.navigator.userLanguage ||_window.navigator.language
$B.locale="C" 
if($B.isWebWorker){$B.charset="utf-8"}else{
$B.charset=document.characterSet ||document.inputEncoding ||"utf-8"}
$B.max_int=Math.pow(2,53)-1
$B.min_int=-$B.max_int
$B.max_float=new Number(Number.MAX_VALUE)
$B.min_float=new Number(Number.MIN_VALUE)
$B.$py_next_hash=Math.pow(2,53)-1
$B.$py_UUID=0
$B.lambda_magic=Math.random().toString(36).substr(2,8)
$B.set_func_names=function(klass,module){if(klass.$infos){var name=klass.$infos.__name__
klass.$infos.__module__=module
klass.$infos.__qualname__=name}else{var name=klass.__name__
klass.$infos={__name__:name,__module__:module,__qualname__:name}}
klass.__module__=module
for(var attr in klass){if(typeof klass[attr]=='function'){klass[attr].$infos={__doc__:klass[attr].__doc__ ||"",__module__:module,__qualname__ :name+'.'+attr,__name__:attr}
if(klass[attr].$type=="classmethod"){klass[attr].__class__=$B.method}}}}
var has_storage=typeof(Storage)!=="undefined"
if(has_storage){$B.has_local_storage=false
try{if(localStorage){$B.local_storage=localStorage
$B.has_local_storage=true}}catch(err){}
$B.has_session_storage=false
try{if(sessionStorage){$B.session_storage=sessionStorage
$B.has_session_storage=true}}catch(err){}}else{$B.has_local_storage=false
$B.has_session_storage=false}
$B.globals=function(){
return $B.frames_stack[$B.frames_stack.length-1][3]}
$B.scripts={}
$B.$options={}
$B.builtins_repr_check=function(builtin,args){
var $=$B.args('__repr__',1,{self:null},['self'],args,{},null,null),self=$.self,_b_=$B.builtins
if(! _b_.isinstance(self,builtin)){throw _b_.TypeError.$factory("descriptor '__repr__' requires a "+
`'${builtin.$infos.__name__}' object but received a `+
`'${$B.class_name(self)}'`)}}
$B.update_VFS=function(scripts){$B.VFS=$B.VFS ||{}
var vfs_timestamp=scripts.$timestamp
if(vfs_timestamp !==undefined){delete scripts.$timestamp}
for(var script in scripts){if($B.VFS.hasOwnProperty(script)){console.warn("Virtual File System: duplicate entry "+script)}
$B.VFS[script]=scripts[script]
$B.VFS[script].timestamp=vfs_timestamp}}
$B.add_files=function(files){
$B.files=$B.files ||{}
for(var file in files){$B.files[file]=files[file]}}
$B.python_to_js=function(src,script_id){$B.meta_path=$B.$meta_path.slice()
if(!$B.use_VFS){$B.meta_path.shift()}
if(script_id===undefined){script_id="__main__"}
var root=__BRYTHON__.py2js(src,script_id,script_id),js=root.to_js()
js="(function() {\n var $locals_"+script_id+" = {}\n"+js+"\n}())"
return js}
_window.py=function(src){
var root=$B.py2js(src[0],"script","script"),js=root.to_js()
$B.set_import_paths()
new Function("$locals_script",js)({})}})(__BRYTHON__)
;
__BRYTHON__.implementation=[3,9,5,'final',0]
__BRYTHON__.__MAGIC__="3.9.5"
__BRYTHON__.version_info=[3,9,0,'final',0]
__BRYTHON__.compiled_date="2021-07-05 11:12:57.617687"
__BRYTHON__.timestamp=1625476377616
__BRYTHON__.builtin_module_names=["_aio","_ajax","_ajax_nevez","_base64","_binascii","_io_classes","_json","_jsre","_locale","_multiprocessing","_posixsubprocess","_profile","_sreXXX","_sre_utils","_string","_strptime","_svg","_webcomponent","_webworker","_zlib_utils","array","bry_re","builtins","dis","encoding_cp932","hashlib","html_parser","long_int","marshal","math","modulefinder","posix","python_re","python_re_backtrack_choice","python_re_v5","random","unicodedata"]
;
;(function($B){function ord(char){if(char.length==1){return char.charCodeAt(0)}
var code=0x10000
code+=(char.charCodeAt(0)& 0x03FF)<< 10
code+=(char.charCodeAt(1)& 0x03FF)
return code}
function $last(array){return array[array.length-1]}
var ops='.,:;+-*/%~^|&=<>[](){}@',op2=['**','//','>>','<<'],augm_op='+-*/%~^|&=<>@',closing={'}':'{',']':'[',')':'('}
function Token(type,string,start,end,line){var res={type,string,start,end,line}
res[0]=type
res[1]=string
res[2]=start.slice(0,2)
res[3]=end
res[4]=line
return res}
function get_line_at(src,pos){
var end=src.substr(pos).search(/[\r\n]/)
return end==-1 ? src.substr(pos):src.substr(pos,end)}
function get_comment(src,pos,line_num,line_start,token_name,line){var start=pos,ix
var t=[]
while(true){if(pos >=src.length ||(ix='\r\n'.indexOf(src[pos]))>-1){t.push(Token('COMMENT',src.substring(start-1,pos),[line_num,start-line_start],[line_num,pos-line_start+1],line))
if(ix !==undefined){var nb=1
if(src[pos]=='\r' && src[pos+1]=='\n'){nb++}else if(src[pos]===undefined){
nb=0}
t.push(Token(token_name,src.substr(pos,nb),[line_num,pos-line_start+1],[line_num,pos-line_start+nb+1],line))
if(src[pos]===undefined){t.push(Token('NEWLINE','\n',[line_num,pos-line_start+1],[line_num,pos-line_start+2],''))}
pos+=nb}
return{t,pos}}
pos++}}
$B.tokenizer=function*(src){var unicode_tables=$B.unicode_tables,whitespace=' \t\n',operators='*+-/%&^~=<>',allowed_after_identifier=',.()[]:;',string_prefix=/^(r|u|R|U|f|F|fr|Fr|fR|FR|rf|rF|Rf|RF)$/,bytes_prefix=/^(b|B|br|Br|bR|BR|rb|rB|Rb|RB)$/
var state="line_start",char,cp,mo,pos=0,start,quote,triple_quote,escaped=false,string_start,string,prefix,name,operator,number,num_type,comment,indent,indents=[],braces=[],line_num=0,line_start=1,line
yield Token('ENCODING','utf-8',[0,0],[0,0],'')
while(pos < src.length){char=src[pos]
cp=src.charCodeAt(pos)
if(cp >=0xD800 && cp <=0xDBFF){
cp=ord(src.substr(pos,2))
char=src.substr(pos,2)
pos++}
pos++
switch(state){case "line_start":
line=get_line_at(src,pos-1)
line_start=pos
line_num++
if(mo=/^\f?(\r\n|\r|\n)/.exec(src.substr(pos-1))){
yield Token('NL',mo[0],[line_num,0],[line_num,mo[0].length],line)
pos+=mo[0].length-1
continue}else if(char=='#'){comment=get_comment(src,pos,line_num,line_start,'NL',line)
for(var item of comment.t){yield item}
pos=comment.pos
state='line_start'
continue}
indent=0
if(char==' '){indent=1}else if(char=='\t'){indent=8}
if(indent){while(pos < src.length){if(src[pos]==' '){indent++}else if(src[pos]=='\t'){indent+=8}else{break}
pos++}
if(pos==src.length){
line_num--
break}
if(src[pos]=='#'){
var comment=get_comment(src,pos+1,line_num,line_start,'NL',line)
for(var item of comment.t){yield item}
pos=comment.pos
continue}else if(mo=/^\f?(\r\n|\r|\n)/.exec(src.substr(pos))){
yield Token('NL','',[line_num,pos-line_start+1],[line_num,pos-line_start+1+mo[0].length],line)
pos+=mo[0].length
continue}
if(indents.length==0 ||indent > $last(indents)){indents.push(indent)
yield Token('INDENT','',[line_num,0],[line_num,indent],line)}else if(indent < $last(indents)){var ix=indents.indexOf(indent)
if(ix==-1){var error=Error('unindent does not match '+
'any outer indentation level')
error.type='IndentationError'
error.line_num=line_num
throw error }
for(var i=indents.length-1;i > ix;i--){indents.pop()
yield Token('DEDENT','',[line_num,indent],[line_num,indent],line)}}
state=null}else{
while(indents.length > 0){indents.pop()
yield Token('DEDENT','',[line_num,indent],[line_num,indent],line)}
state=null
pos--}
break
case null:
switch(char){case '"':
case "'":
quote=char
triple_quote=src[pos]==char && src[pos+1]==char
string_start=[line_num,pos-line_start,line_start]
if(triple_quote){pos+=2}
escaped=false
state='STRING'
string=""
prefix=""
break
case '#':
var token_name=braces.length > 0 ? 'NL' :'NEWLINE'
comment=get_comment(src,pos,line_num,line_start,token_name,line)
for(var item of comment.t){yield item}
pos=comment.pos
if(braces.length==0){state='line_start'}else{state=null
line_num++
line_start=pos+1
line=get_line_at(src,pos)}
break
case '0':
state='NUMBER'
number=char
num_type=''
if(src[pos]&&
'xbo'.indexOf(src[pos].toLowerCase())>-1){number+=src[pos]
num_type=src[pos].toLowerCase()
pos++}
break
case '.':
if(src[pos]&& unicode_tables.Nd[ord(src[pos])]){state='NUMBER'
num_type=''
number=char}else{var op=char
while(src[pos]==char){pos++
op+=char}
var dot_pos=pos-line_start-op.length+1
while(op.length >=3){
yield Token('OP','...',[line_num,dot_pos],[line_num,dot_pos+3],line)
op=op.substr(3)}
for(var i=0;i < op.length;i++){yield Token('OP','.',[line_num,dot_pos],[line_num,dot_pos+1],line)
dot_pos++}}
break
case '\\':
if(mo=/^\f?(\r\n|\r|\n)/.exec(src.substr(pos))){line_num++
pos+=mo[0].length
line_start=pos+1
line=get_line_at(src,pos)}else{yield Token('ERRORTOKEN',char,[line_num,pos-line_start],[line_num,pos-line_start+1],line)}
break
case '\n':
case '\r':
var token_name=braces.length > 0 ? 'NL':'NEWLINE'
mo=/^\f?(\r\n|\r|\n)/.exec(src.substr(pos-1))
yield Token(token_name,mo[0],[line_num,pos-line_start],[line_num,pos-line_start+mo[0].length],line)
pos+=mo[0].length-1
if(token_name=='NEWLINE'){state='line_start'}else{line_num++
line_start=pos+1
line=get_line_at(src,pos)}
break
default:
if(unicode_tables.XID_Start[ord(char)]){
state='NAME'
name=char}else if(unicode_tables.Nd[ord(char)]){state='NUMBER'
num_type=''
number=char}else if(ops.indexOf(char)>-1){var op=char
if(op2.indexOf(char+src[pos])>-1){op=char+src[pos]
pos++}
if(src[pos]=='=' &&(op.length==2 ||
augm_op.indexOf(op)>-1)){op+=src[pos]
pos++}else if((char=='-' && src[pos]=='>')||
(char==':' && src[pos]=='=')){op+=src[pos]
pos++}
if('[({'.indexOf(char)>-1){braces.push(char)}else if('])}'.indexOf(char)>-1){if(braces && $last(braces)==closing[char]){braces.pop()}else{braces.push(char)}}
yield Token('OP',op,[line_num,pos-line_start-op.length+1],[line_num,pos-line_start+1],line)}else if(char=='!' && src[pos]=='='){yield Token('OP','!=',[line_num,pos-line_start],[line_num,pos-line_start+2],line)
pos++}else if(char==' ' ||char=='\t'){}else{yield Token('ERRORTOKEN',char,[line_num,pos-line_start],[line_num,pos-line_start+1],line)}}
break
case 'NAME':
if(unicode_tables.XID_Continue[ord(char)]){name+=char}else if(char=='"' ||char=="'"){if(string_prefix.exec(name)||bytes_prefix.exec(name)){
state='STRING'
quote=char
triple_quote=src[pos]==quote && src[pos+1]==quote
prefix=name
escaped=false
string_start=[line_num,pos-line_start-name.length,line_start]
if(triple_quote){pos+=2}
string=''}else{yield Token('NAME',name,[line_num,pos-line_start-name.length],[line_num,pos-line_start],line)
state=null
pos--}}else{yield Token('NAME',name,[line_num,pos-line_start-name.length],[line_num,pos-line_start],line)
state=null
pos--}
break
case 'STRING':
switch(char){case quote:
if(! escaped){
var string_line=line
if(line_num > string_start[0]){string_line=src.substring(
string_start[2]-1,pos+2)}
if(! triple_quote){var full_string=prefix+quote+string+
quote
yield Token('STRING',full_string,string_start,[line_num,pos-line_start+1],string_line)
state=null}else if(char+src.substr(pos,2)==
quote.repeat(3)){var full_string=prefix+quote.repeat(3)+
string+quote.repeat(3)
triple_quote_line=line
yield Token('STRING',full_string,string_start,[line_num,pos-line_start+3],string_line)
pos+=2
state=null}else{string+=char}}else{string+=char}
escaped=false
break
case '\r':
case '\n':
if(! escaped && ! triple_quote){
var quote_pos=string_start[1]+line_start-1,pos=quote_pos
while(src[pos-1]==' '){pos--}
while(pos < quote_pos){console.log('yield ERRORTOKEN, escaped',escaped)
yield Token('ERRORTOKEN',' ',[line_num,pos-line_start+1],[line_num,pos-line_start+2],line)
pos++}
pos++
yield Token('ERRORTOKEN',quote,[line_num,pos-line_start],[line_num,pos-line_start+1],line)
state=null
pos++
break}
string+=char
line_num++
line_start=pos+1
if(char=='\r' && src[pos]=='\n'){string+=src[pos]
line_start++
pos++}
line=get_line_at(src,pos)
escaped=false
break
case '\\':
string+=char
escaped=! escaped
break
default:
escaped=false
string+=char
break}
break
case 'NUMBER':
if(num_type=='' && unicode_tables.Nd[ord(char)]){number+=char}else if(num_type=='b' && '01'.indexOf(char)>-1){number+=char}else if(num_type=='o' && '01234567'.indexOf(char)>-1){number+=char}else if(num_type=='x' &&
'0123456789abcdef'.indexOf(char.toLowerCase())>-1){number+=char}else if(char=='_'){if(number.endsWith('_')){throw SyntaxError('consecutive _ in number')}
number+=char}else if(char=='.' && number.indexOf(char)==-1){number+=char}else if(char.toLowerCase()=='e' &&
number.toLowerCase().indexOf('e')==-1){number+=char}else if((char=='+' ||char=='-')&&
number.toLowerCase().endsWith('e')){number+=char}else if(char.toLowerCase()=='j'){
number+=char
yield Token('NUMBER',number,[line_num,pos-line_start-number.length+1],[line_num,pos-line_start+1],line)
state=null}else{yield Token('NUMBER',number,[line_num,pos-line_start-number.length],[line_num,pos-line_start],line)
state=null
pos--}
break}}
if(braces.length > 0){throw SyntaxError('EOF in multi-line statement')}
switch(state){case 'line_start':
line_num++
break
case 'NAME':
yield Token('NAME',name,[line_num,pos-line_start-name.length+1],[line_num,pos-line_start+1],line)
break
case 'NUMBER':
yield Token('NUMBER',number,[line_num,pos-line_start-number.length+1],[line_num,pos-line_start+1],line)
break
case 'STRING':
throw SyntaxError(
`unterminated string literal (detected at line ${line_num})`)}
if(! src.endsWith('\n')&& char !=' ' && state !=line_start){yield Token('NEWLINE','',[line_num,pos-line_start+1],[line_num,pos-line_start+2],'')
line_num++}
while(indents.length > 0){indents.pop()
yield Token('DEDENT','',[line_num,0],[line_num,0],'')}
yield Token('ENDMARKER','',[line_num,0],[line_num,0],'')}})(__BRYTHON__)
;

;(function($B){Number.isInteger=Number.isInteger ||function(value){return typeof value==='number' &&
isFinite(value)&&
Math.floor(value)===value};
Number.isSafeInteger=Number.isSafeInteger ||function(value){return Number.isInteger(value)&& Math.abs(value)<=Number.MAX_SAFE_INTEGER;};
var js,$pos,res,$op
var _b_=$B.builtins
var _window
if($B.isNode){_window={location:{href:'',origin:'',pathname:''}}}else{
_window=self}
$B.parser={}
var clone=$B.clone=function(obj){var res={}
for(var attr in obj){res[attr]=obj[attr]}
return res}
$B.last=function(table){if(table===undefined){console.log($B.frames_stack.slice())}
return table[table.length-1]}
$B.list2obj=function(list,value){var res={},i=list.length
if(value===undefined){value=true}
while(i--> 0){res[list[i]]=value}
return res}
$B.op2method={operations:{"**":"pow","//":"floordiv","<<":"lshift",">>":"rshift","+":"add","-":"sub","*":"mul","/":"truediv","%":"mod","@":"matmul" },augmented_assigns:{"//=":"ifloordiv",">>=":"irshift","<<=":"ilshift","**=":"ipow","+=":"iadd","-=":"isub","*=":"imul","/=":"itruediv","%=":"imod","&=":"iand","|=":"ior","^=":"ixor","@=":"imatmul"},binary:{"&":"and","|":"or","~":"invert","^":"xor"},comparisons:{"<":"lt",">":"gt","<=":"le",">=":"ge","==":"eq","!=":"ne"},boolean:{"or":"or","and":"and","in":"in","not":"not","is":"is"},subset:function(){var res={},keys=[]
if(arguments[0]=="all"){keys=Object.keys($B.op2method)
keys.splice(keys.indexOf("subset"),1)}else{for(var i=0,len=arguments.length;i < len;i++){keys.push(arguments[i])}}
for(var i=0,len=keys.length;i < len;i++){var key=keys[i],ops=$B.op2method[key]
if(ops===undefined){throw Error(key)}
for(var attr in ops){res[attr]=ops[attr]}}
return res}}
var $operators=$B.op2method.subset("all")
var $augmented_assigns=$B.augmented_assigns=$B.op2method.augmented_assigns
var noassign=$B.list2obj(['True','False','None','__debug__'])
var $op_order=[['or'],['and'],['not'],['in','not_in'],['<','<=','>','>=','!=','==','is','is_not'],['|'],['^'],['&'],['>>','<<'],['+'],['-'],['*','@','/','//','%'],['unary_neg','unary_inv','unary_pos'],['**']
]
var $op_weight={},$weight=1
$op_order.forEach(function(_tmp){_tmp.forEach(function(item){$op_weight[item]=$weight})
$weight++})
var $loop_num=0
var create_temp_name=$B.parser.create_temp_name=function(prefix){var _prefix=prefix ||'$temp'
return _prefix+$loop_num++;}
var replace_node=$B.parser.replace_node=function(replace_what,replace_with){var parent=replace_what.parent
var pos=replace_what.parent.children.indexOf(replace_what)
parent.children[pos]=replace_with
replace_with.parent=parent
replace_with.bindings=replace_what.bindings}
var add_identnode=$B.parser.add_identnode=function(parent,insert_at,name,val){var new_node=new $Node()
new_node.parent=parent
new_node.locals=parent.locals
new_node.module=parent.module
var new_ctx=new $NodeCtx(new_node)
var expr_ctx=new $ExprCtx(new_ctx,'id',true)
var idctx=new $IdCtx(expr_ctx,name)
var assign=new $AssignCtx(expr_ctx)
if(insert_at===-1)
parent.add(new_node)
else
parent.insert(insert_at,new_node)
assign.tree[1]=val
return new_node}
var chained_comp_num=0
var $_SyntaxError=$B.parser.$_SyntaxError=function(C,msg,indent){
var ctx_node=C
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node,root=tree_node
while(root.parent !==undefined){root=root.parent}
var module=tree_node.module,src=root.src,line_num=tree_node.line_num
if(C.$pos !==undefined){$pos=C.$pos}
if(src){line_num=src.substr(0,$pos).split("\n").length}
if(root.line_info){line_num=root.line_info}
if(indent===undefined ||typeof indent !="number"){if(msg && Array.isArray(msg)){$B.$SyntaxError(module,msg[0],src,$pos,line_num,root)}
if(msg==="Triple string end not found"){
$B.$SyntaxError(module,'invalid syntax : triple string end not found',src,$pos,line_num,root)}
var message='invalid syntax'
if(msg && !(msg.startsWith("token "))){message+=' ('+msg+')'}
$B.$SyntaxError(module,message,src,$pos,line_num,root)}else{throw $B.$IndentationError(module,msg,src,$pos,line_num,root)}}
function SyntaxWarning(C,msg){var node=$get_node(C),module=$get_module(C),src=module.src,lines=src.split("\n"),message=`Module ${module.module} line ${node.line_num}: ${msg}\n`+
'    '+lines[node.line_num-1]
$B.$getattr($B.stderr,"write")(message)}
function check_assignment(C){var ctx=C,forbidden=['assert','del','import','raise','return']
while(ctx){if(forbidden.indexOf(ctx.type)>-1){$_SyntaxError(C,'invalid syntax - assign')}else if(ctx.type=="expr" && ctx.tree[0].type=="op"){if($B.op2method.comparisons[ctx.tree[0].op]!==undefined){$_SyntaxError(C,["cannot assign to comparison"])}else{$_SyntaxError(C,["cannot assign to operator"])}}else if(ctx.type=="ternary"){$_SyntaxError(C,["cannot assign to conditional expression"])}
ctx=ctx.parent}}
var $Node=$B.parser.$Node=function(type){this.type=type
this.children=[]}
$Node.prototype.add=function(child){
this.children[this.children.length]=child
child.parent=this
child.module=this.module}
$Node.prototype.insert=function(pos,child){
this.children.splice(pos,0,child)
child.parent=this
child.module=this.module}
$Node.prototype.toString=function(){return "<object 'Node'>"}
$Node.prototype.show=function(indent){
var res=''
if(this.type==='module'){this.children.forEach(function(child){res+=child.show(indent)})
return res}
indent=indent ||0
res+=' '.repeat(indent)
res+=this.C
if(this.children.length > 0){res+='{'}
res+='\n'
this.children.forEach(function(child){res+=child.show(indent+4)})
if(this.children.length > 0){res+=' '.repeat(indent)
res+='}\n'}
return res}
$Node.prototype.to_js=function(indent){
if(this.js !==undefined){return this.js}
this.res=[]
this.unbound=[]
if(this.type==='module'){this.children.forEach(function(child){this.res.push(child.to_js())},this)
this.js=this.res.join('')
return this.js}
indent=indent ||0
var ctx_js=this.C.to_js()
if(ctx_js){
this.res.push(' '.repeat(indent))
this.res.push(ctx_js)
if(this.children.length > 0){this.res.push('{')}
this.res.push('\n')
this.children.forEach(function(child){this.res.push(child.to_js(indent+4))},this)
if(this.children.length > 0){this.res.push(' '.repeat(indent))
this.res.push('}\n')}}
this.js=this.res.join('')
return this.js}
$Node.prototype.transform=function(rank){
if(this.has_await){
this.parent.insert(rank,$NodeJS("var save_stack = $B.save_stack()"))
if(!(this.C && this.C.tree.length > 0 &&
this.C.tree[0].type=='return')){
this.parent.insert(rank+2,$NodeJS("$B.restore_stack(save_stack, $locals)"))}
this.has_await=false 
return 1}
if(this.has_yield && ! this.has_yield.transformed){
var parent=this.parent
if(this.has_yield.from){var new_node=new $Node()
var new_ctx=new $NodeCtx(new_node)
var new_expr=new $ExprCtx(new_ctx,'js',false)
var _id=new $RawJSCtx(new_expr,`$locals.$expr${this.has_yield.from_num}`)
var assign=new $AssignCtx(new_expr)
var right=new $ExprCtx(assign)
right.tree=this.has_yield.tree
parent.insert(rank,new_node)
var pnode=$get_node(this.has_yield)
var n=this.has_yield.from_num
var replace_with=`$B.$import("sys", [], {})
            var _i${n} = _b_.iter($locals.$expr${n}),
                _r${n}
            var $failed${n} = false
            try{
                var _y${n} = _b_.next(_i${n})
            }catch(_e){
                $B.set_exc(_e)
                $failed${n} = true
                $B.pmframe = $B.last($B.frames_stack)
                _e = $B.exception(_e)
                if(_e.__class__ === _b_.StopIteration){
                    var _r${n} = $B.$getattr(_e, "value")
                }else{
                    throw _e
                }
            }
            if(! $failed${n}){
                while(true){
                    var $failed1${n} = false
                    try{
                        $B.leave_frame({$locals})
                        var _s${n} = yield _y${n}
                        $B.frames_stack.push($top_frame)
                    }catch(_e){
                        if(_e.__class__ === _b_.GeneratorExit){
                            var $failed2${n} = false
                            try{
                                var _m${n} = $B.$getattr(_i${n}, "close")
                            }catch(_e1){
                                $failed2${n} = true
                                if(_e1.__class__ !== _b_.AttributeError){
                                    throw _e1
                                }
                            }
                            if(! $failed2${n}){
                                $B.$call(_m${n})()
                            }
                            throw _e
                        }else if($B.is_exc(_e, [_b_.BaseException])){
                            var _x = $B.$call($B.$getattr($locals.sys, "exc_info"))()
                            var $failed3${n} = false
                            try{
                                var _m${n} = $B.$getattr(_i${n}, "throw")
                            }catch(err){
                                $failed3${n} = true
                                if($B.is_exc(err, [_b_.AttributeError])){
                                    throw err
                                }
                            }
                            if(! $failed3${n}){
                                try{
                                    _y${n} = $B.$call(_m${n}).apply(null,
                                        _b_.list.$factory(_x${n}))
                                }catch(err){
                                    if($B.$is_exc(err, [_b_.StopIteration])){
                                        _r${n} = $B.$getattr(err, "value")
                                        break
                                    }
                                    throw err
                                }
                            }
                        }
                    }
                    if(! $failed1${n}){
                        try{
                            if(_s${n} === _b_.None){
                                _y${n} = _b_.next(_i${n})
                            }else{
                                _y${n} = $B.$call($B.$getattr(_i${n}, "send"))(_s${n})
                            }
                        }catch(err){
                            if($B.is_exc(err, [_b_.StopIteration])){
                                _r${n} = $B.$getattr(err, "value")
                                break
                            }
                            throw err
                        }
                    }
                }
            }`
parent.insert(rank+1,$NodeJS(replace_with))
return 3}
parent.children.splice(rank,1)
if(this.has_yield.tree[0].type==='abstract_expr'){new_node=$NodeJS("var result = _b_.None")}else{var new_node=new $Node()
var new_ctx=new $NodeCtx(new_node)
var new_expr=new $ExprCtx(new_ctx,'js',false)
var _id=new $RawJSCtx(new_expr,'var result')
var assign=new $AssignCtx(new_expr)
assign.tree[1]=this.has_yield.tree[0]
_id.parent=assign}
new_node.line_num=this.line_num
parent.insert(rank,new_node)
var try_node=new $NodeJS("try")
try_node.add($NodeJS("$B.leave_frame({$locals})"))
try_node.add(this)
parent.insert(rank+1,try_node)
this.has_yield.to_js=function(){return 'yield result'}
this.has_yield.transformed=true
var i=0
while(i < try_node.children.length){var offset=try_node.children[i].transform(i)
if(offset===undefined){offset=1}
i+=offset}
var catch_node=$NodeJS(`catch(err${this.line_num})`)
catch_node.add($NodeJS("$B.frames_stack.push($top_frame)"))
catch_node.add($NodeJS(`throw err${this.line_num}`))
parent.insert(rank+2,catch_node)
parent.insert(rank+3,$NodeJS("$B.frames_stack.push($top_frame)"))
return 2}
if(this.type==='module'){
this.__doc__=$get_docstring(this)
var i=0
while(i < this.children.length){var offset=this.children[i].transform(i)
if(offset===undefined){offset=1}
i+=offset}}else{var elt=this.C.tree[0],ctx_offset
if(elt===undefined){console.log(this)}
if(elt.transform !==undefined){ctx_offset=elt.transform(this,rank)}
var i=0
while(i < this.children.length){var offset=this.children[i].transform(i)
if(offset===undefined){offset=1}
i+=offset}
if(ctx_offset===undefined){ctx_offset=1}
return ctx_offset}}
$Node.prototype.clone=function(){var res=new $Node(this.type)
for(var attr in this){res[attr]=this[attr]}
return res}
$Node.prototype.clone_tree=function(){var res=new $Node(this.type)
for(var attr in this){res[attr]=this[attr]}
res.children=[]
for(var i=0,len=this.children.length;i < len;i++){res.add(this.children[i].clone_tree())}
return res}
var $AbstractExprCtx=$B.parser.$AbstractExprCtx=function(C,with_commas){this.type='abstract_expr'
this.with_commas=with_commas
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$AbstractExprCtx.prototype.toString=function(){return '(abstract_expr '+this.with_commas+') '+this.tree}
$AbstractExprCtx.prototype.transition=function(token,value){var C=this
var packed=C.packed,is_await=C.is_await,assign=C.assign
if(! assign){switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case 'ellipsis':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
case 'yield':
C.parent.tree.pop()
var commas=C.with_commas
C=C.parent
C.packed=packed
C.is_await=is_await}}
switch(token){case 'await':
return new $AwaitCtx(C)
case 'id':
return new $IdCtx(new $ExprCtx(C,'id',commas),value)
case 'str':
return new $StringCtx(new $ExprCtx(C,'str',commas),value)
case 'bytes':
return new $StringCtx(new $ExprCtx(C,'bytes',commas),value)
case 'int':
return new $NumberCtx('int',new $ExprCtx(C,'int',commas),value)
case 'float':
return new $NumberCtx('float',new $ExprCtx(C,'float',commas),value)
case 'imaginary':
return new $NumberCtx('imaginary',new $ExprCtx(C,'imaginary',commas),value)
case '(':
return new $ListOrTupleCtx(
new $ExprCtx(C,'tuple',commas),'tuple')
case '[':
return new $ListOrTupleCtx(
new $ExprCtx(C,'list',commas),'list')
case '{':
return new $DictOrSetCtx(
new $ExprCtx(C,'dict_or_set',commas))
case 'ellipsis':
return new $EllipsisCtx(
new $ExprCtx(C,'ellipsis',commas))
case 'not':
if(C.type=='op' && C.op=='is'){
C.op='is_not'
return C}
return new $NotCtx(new $ExprCtx(C,'not',commas))
case 'lambda':
return new $LambdaCtx(new $ExprCtx(C,'lambda',commas))
case 'op':
var tg=value
switch(tg){case '*':
C.parent.tree.pop()
var commas=C.with_commas
C=C.parent
return new $PackedCtx(
new $ExprCtx(C,'expr',commas))
case '-':
case '~':
case '+':
C.parent.tree.pop()
var left=new $UnaryCtx(C.parent,tg)
if(tg=='-'){var op_expr=new $OpCtx(left,'unary_neg')}else if(tg=='+'){var op_expr=new $OpCtx(left,'unary_pos')}else{var op_expr=new $OpCtx(left,'unary_inv')}
return new $AbstractExprCtx(op_expr,false)
case 'not':
C.parent.tree.pop()
var commas=C.with_commas
C=C.parent
return new $NotCtx(
new $ExprCtx(C,'not',commas))
case '...':
return new $EllipsisCtx(new $ExprCtx(C,'ellipsis',commas))}
$_SyntaxError(C,'token '+token+' after '+
C)
case 'in':
if(C.parent.type=='op' && C.parent.op=='not'){C.parent.op='not_in'
return C}
$_SyntaxError(C,'token '+token+' after '+
C)
case '=':
if(C.parent.type=="yield"){$_SyntaxError(C,["assignment to yield expression not possible"])}
$_SyntaxError(C,'token '+token+' after '+
C)
case 'yield':
return new $AbstractExprCtx(new $YieldCtx(C),true)
case ':':
if(C.parent.type=="sub" ||
(C.parent.type=="list_or_tuple" &&
C.parent.parent.type=="sub")){return new $AbstractExprCtx(new $SliceCtx(C.parent),false)}
return $transition(C.parent,token,value)
case ')':
case ',':
switch(C.parent.type){case 'list_or_tuple':
case 'slice':
case 'call_arg':
case 'op':
case 'yield':
break
case 'annotation':
$_SyntaxError(C,"empty annotation")
default:
$_SyntaxError(C,token)}}
return $transition(C.parent,token,value)}
$AbstractExprCtx.prototype.to_js=function(){this.js_processed=true
if(this.type==='list')return '['+$to_js(this.tree)+']'
return $to_js(this.tree)}
var $AliasCtx=$B.parser.$AliasCtx=function(C){
this.type='ctx_manager_alias'
this.parent=C
this.tree=[]
C.tree[C.tree.length-1].alias=this}
$AliasCtx.prototype.transition=function(token,value){var C=this
switch(token){case ',':
case ':':
C.parent.set_alias(C.tree[0].tree[0])
return $transition(C.parent,token,value)}
$_SyntaxError(C,'token '+token+' after '+C)}
var $AnnotationCtx=$B.parser.$AnnotationCtx=function(C){
this.type='annotation'
this.parent=C
this.tree=[]
C.annotation=this
var scope=$get_scope(C)
if(scope.binding.__annotations__===undefined){
scope.binding.__annotations__=true
C.create_annotations=true}
if(scope.ntype=="def" && C.tree && C.tree.length > 0 &&
C.tree[0].type=="id"){var name=C.tree[0].value
if(scope.globals && scope.globals.has(name)>-1){$_SyntaxError(C,["annotated name '"+name+
"' can't be global"])}
scope.annotations=scope.annotations ||new Set()
scope.annotations.add(name)
if(! C.$in_parens){scope.binding=scope.binding ||{}
scope.binding[name]=true}}}
$AnnotationCtx.prototype.toString=function(){return '(annotation) '+this.tree}
$AnnotationCtx.prototype.transition=function(token,value){var C=this
if(token=="eol" && C.tree.length==1 &&
C.tree[0].tree.length==0){$_SyntaxError(C,"empty annotation")}else if(token==':' && C.parent.type !="def"){$_SyntaxError(C,"more than one annotation")}else if(token=="augm_assign"){$_SyntaxError(C,"augmented assign as annotation")}else if(token=="op"){$_SyntaxError(C,"operator as annotation")}
return $transition(C.parent,token)}
$AnnotationCtx.prototype.to_js=function(){return $to_js(this.tree)}
var $AssertCtx=$B.parser.$AssertCtx=function(C){
this.type='assert'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$AssertCtx.prototype.toString=function(){return '(assert) '+this.tree}
$AssertCtx.prototype.transition=function(token,value){var C=this
if(token==","){if(this.tree.length > 1){$_SyntaxError(C,"too many commas after assert")}
return new $AbstractExprCtx(this,false)}
if(token=='eol'){return $transition(C.parent,token)}
$_SyntaxError(C,token)}
$AssertCtx.prototype.transform=function(node,rank){if(this.tree.length > 1){
var condition=this.tree[0]
var message=this.tree[1]}else{var condition=this.tree[0]
var message=null}
if(this.tree[0].type=="expr" && this.tree[0].name=="tuple" &&
this.tree[0].tree[0].tree.length > 1){var warning=_b_.SyntaxWarning.$factory(
"assertion is always true, perhaps remove parentheses?")
var module=$get_module(this)
$B.$syntax_err_line(warning,module.filename,module.src,$pos,$get_node(this).line_num)
$B.imported._warnings.warn(warning)}
var new_ctx=new $ConditionCtx(node.C,'if')
var not_ctx=new $NotCtx(new_ctx)
not_ctx.tree=[condition]
node.C=new_ctx
var new_node=new $Node()
var js='throw _b_.AssertionError.$factory()'
if(message !==null){js='throw _b_.AssertionError.$factory(_b_.str.$factory('+
message.to_js()+'))'}
new $NodeJSCtx(new_node,js)
node.add(new_node)}
function make_assign(left,right,module){var node=new $Node()
node.id=module
var C=new $NodeCtx(node)
var expr=new $ExprCtx(C,'left',true)
expr.tree=left.tree
var assign=new $AssignCtx(expr)
assign.tree[1]=new $JSCode(right)
return node}
var $AssignCtx=$B.parser.$AssignCtx=function(C,expression){
check_assignment(C)
if(C.type=="expr" && C.tree[0].type=="lambda"){$_SyntaxError(C,["cannot assign to lambda"])}
this.type='assign'
if(expression=='expression'){this.expression=true
console.log("parent of assign expr",C.parent)}
C.parent.tree.pop()
C.parent.tree[C.parent.tree.length]=this
this.parent=C.parent
this.tree=[C]
var scope=$get_scope(this)
if(C.type=='expr' && C.tree[0].type=='call'){$_SyntaxError(C,["cannot assign to function call "])}else if(C.type=='list_or_tuple' ||
(C.type=='expr' && C.tree[0].type=='list_or_tuple')){if(C.type=='expr'){if(C.tree[0].real=='gen_expr'){$_SyntaxError(C,['cannot assign to generator expression'])}
C=C.tree[0]}
C.bind_ids(scope)}else if(C.type=='assign'){C.tree.forEach(function(elt){var assigned=elt.tree[0]
if(assigned.type=='id'){$bind(assigned.value,scope,this)}},this)}else{var assigned=C.tree[0]
if(assigned && assigned.type=='id'){var name=assigned.value
if(['None','True','False','__debug__'].indexOf(name)>-1){$_SyntaxError(C,['cannot assign to '+name])}else if(noassign[name]===true){$_SyntaxError(C,["cannot assign to keyword"])}
assigned.bound=true
if(!scope.globals ||!scope.globals.has(assigned.value)){
var node=$get_node(this)
node.bound_before=Object.keys(scope.binding)
$bind(assigned.value,scope,this)}else{
var module=$get_module(C)
assigned.global_module=module.module
$bind(assigned.value,module,this)}}else if(["str","int","float","complex"].indexOf(assigned.type)>-1){$_SyntaxError(C,["cannot assign to literal"])}else if(assigned.type=="ellipsis"){$_SyntaxError(C,['cannot assign to Ellipsis'])}else if(assigned.type=="unary"){$_SyntaxError(C,["cannot assign to operator"])}else if(assigned.type=="packed"){if(assigned.tree[0].name=='id'){var id=assigned.tree[0].tree[0].value
if(['None','True','False','__debug__'].indexOf(id)>-1){$_SyntaxError(C,['cannot assign to '+id])}}
if(assigned.parent.in_tuple===undefined){$_SyntaxError(C,["starred assignment target must be in a list or tuple"])}}}}
$AssignCtx.prototype.guess_type=function(){return}
$AssignCtx.prototype.toString=function(){return '(assign) '+this.tree[0]+'='+this.tree[1]}
$AssignCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){if(C.tree[1].type=='abstract_expr'){$_SyntaxError(C,'token '+token+' after '+
C)}
C.guess_type()
return $transition(C.parent,'eol')}
$_SyntaxError(C,'token '+token+' after '+C)}
$AssignCtx.prototype.transform=function(node,rank){
var scope=$get_scope(this)
var left=this.tree[0],right=this.tree[1],assigned=[]
while(left.type=='assign'){assigned.push(left.tree[1])
left=left.tree[0]}
if(assigned.length > 0){assigned.push(left)
var ctx=node.C
ctx.tree=[]
var nleft=new $RawJSCtx(ctx,'var $temp'+$loop_num)
nleft.tree=ctx.tree
var nassign=new $AssignCtx(nleft)
nassign.tree[1]=right
assigned.forEach(function(elt){if(elt.type=="expr" && elt.tree[0].type=="list_or_tuple" &&
elt.tree[0].real=="tuple" &&
elt.tree[0].tree.length==1){
elt=elt.tree[0].tree[0]}
var new_node=new $Node(),node_ctx=new $NodeCtx(new_node)
new_node.locals=node.locals
new_node.line_num=node.line_num
node.parent.insert(rank+1,new_node)
elt.parent=node_ctx
var assign=new $AssignCtx(elt)
new $RawJSCtx(assign,'$temp'+$loop_num)})
$loop_num++
this.tree[0]=left
return}
var left_items=null
switch(left.type){case 'expr':
if(left.tree.length > 1){left_items=left.tree}else if(left.tree[0].type=='list_or_tuple' ||
left.tree[0].type=='target_list'){left_items=left.tree[0].tree}else if(left.tree[0].type=='id'){
var name=left.tree[0].value
if(scope.globals && scope.globals.has(name)){}else{left.tree[0].bound=true}}
break
case 'target_list':
case 'list_or_tuple':
left_items=left.tree}
var right=this.tree[1]
if(left_items===null){if(left.tree[0].bound){if(right.type=="expr" && right.name=="int"){node.bindings=node.bindings ||{}
node.bindings[left.tree[0].value]="int"}}
return}
var right_items=null
if(right.type=='list' ||right.type=='tuple'||
(right.type=='expr' && right.tree.length > 1)){right_items=right.tree}
if(right_items !==null){
if(right_items.length > left_items.length){throw Error('ValueError : too many values to unpack (expected '+
left_items.length+')')}else if(right_items.length < left_items.length){throw Error('ValueError : need more than '+
right_items.length+' to unpack')}
var new_nodes=[],pos=0
var new_node=new $Node()
new_node.line_num=node.line_num
new $NodeJSCtx(new_node,'void(0)')
new_nodes[pos++]=new_node
var $var='$temp'+$loop_num
var new_node=new $Node()
new_node.line_num=node.line_num
new $NodeJSCtx(new_node,'var '+$var+' = [], $pos = 0')
new_nodes[pos++]=new_node
right_items.forEach(function(right_item){var js=$var+'[$pos++] = '+right_item.to_js()
var new_node=new $Node()
new_node.line_num=node.line_num
new $NodeJSCtx(new_node,js)
new_nodes[pos++]=new_node})
var this_node=$get_node(this)
left_items.forEach(function(left_item){var new_node=new $Node()
new_node.id=this_node.module
new_node.locals=this_node.locals
new_node.line_num=node.line_num
var C=new $NodeCtx(new_node)
left_item.parent=C
var assign=new $AssignCtx(left_item,false)
assign.tree[1]=new $JSCode($var+'['+i+']')
new_nodes[pos++]=new_node},this)
node.parent.children.splice(rank,1)
for(var i=new_nodes.length-1;i >=0;i--){node.parent.insert(rank,new_nodes[i])}
$loop_num++}else{
node.parent.children.splice(rank,1)
var rname=create_temp_name('$right')
var rlname=create_temp_name('$rlist');
var new_node=$NodeJS('var '+rname+' = '+
'$B.$getattr($B.$iter('+right.to_js()+
'), "__next__");')
new_node.line_num=node.line_num 
node.parent.insert(rank++,new_node)
node.parent.insert(rank++,$NodeJS('var '+rlname+'=[], $pos=0;'+
'while(1){'+
'try{'+
rlname+'[$pos++] = '+rname+'()'+
'}catch(err){'+
'break'+
'}'+
'}')
)
var packed=null
var min_length=left_items.length
for(var i=0;i < left_items.length;i++){var expr=left_items[i]
if(expr.type=='packed' ||
(expr.type=='expr' && expr.tree[0].type=='packed')){packed=i
min_length--
break}}
node.parent.insert(rank++,$NodeJS('if('+rlname+'.length<'+min_length+'){'+
'throw _b_.ValueError.$factory('+
'"need more than " +'+rlname+
'.length + " value" + ('+rlname+
'.length > 1 ?'+' "s" : "") + " to unpack")}'
)
)
if(packed==null){node.parent.insert(rank++,$NodeJS('if('+rlname+'.length>'+min_length+'){'+
'throw _b_.ValueError.$factory('+
'"too many values to unpack '+
'(expected '+left_items.length+')"'+
')'+
'}')
)}
left_items.forEach(function(left_item,i){var new_node=new $Node()
new_node.id=scope.id
new_node.line_num=node.line_num
node.parent.insert(rank++,new_node)
var C=new $NodeCtx(new_node)
left_item.parent=C
left_item.in_tuple=true
var assign=new $AssignCtx(left_item,false)
var js=rlname
if(packed==null ||i < packed){js+='['+i+']'}else if(i==packed){js+='.slice('+i+','+rlname+'.length-'+
(left_items.length-i-1)+')'}else{js+='['+rlname+'.length-'+(left_items.length-i)+']'}
assign.tree[1]=new $JSCode(js)})
$loop_num++}}
$AssignCtx.prototype.to_js=function(){this.js_processed=true
if(this.parent.type=='call'){
return '{$nat:"kw",name:'+this.tree[0].to_js()+
',value:'+this.tree[1].to_js()+'}'}
var left=this.tree[0]
while(left.type=='expr' && ! left.assign){left=left.tree[0]}
var right=this.tree[1]
if(left.type=='attribute' ||left.type=='sub'){
var right_js=right.to_js()
var res='',rvar='',$var='$temp'+$loop_num
if(right.type=='expr' && right.tree[0]!==undefined &&
right.tree[0].type=='call' &&
('eval'==right.tree[0].func.value ||
'exec'==right.tree[0].func.value)){res+='var '+$var+' = '+right_js+';\n'
rvar=$var}else if(right.type=='expr' && right.tree[0]!==undefined &&
right.tree[0].type=='sub'){res+='var '+$var+' = '+right_js+';\n'
rvar=$var}else{rvar=right_js}
if(left.type=='attribute'){
$loop_num++
left.func='setattr'
var left_to_js=left.to_js()
left.func='getattr'
if(left.assign_self){return res+left_to_js[0]+rvar+left_to_js[1]+rvar+')'}
res+=left_to_js
res=res.substr(0,res.length-1)
return res+','+rvar+');_b_.None;'}
if(left.type=='sub'){
var seq=left.value.to_js(),temp='$temp'+$loop_num,type
if(left.value.type=='id'){type=$get_node(this).locals[left.value.value]}
$loop_num++
var res='var '+temp+' = '+seq+'\n'
if(type !=='list'){res+='if(Array.isArray('+temp+') && !'+
temp+'.__class__){'}
if(left.tree.length==1){res+='$B.set_list_key('+temp+','+
(left.tree[0].to_js()+'' ||'null')+','+
right.to_js()+')'}else if(left.tree.length==2){res+='$B.set_list_slice('+temp+','+
(left.tree[0].to_js()+'' ||'null')+','+
(left.tree[1].to_js()+'' ||'null')+','+
right.to_js()+')'}else if(left.tree.length==3){res+='$B.set_list_slice_step('+temp+','+
(left.tree[0].to_js()+'' ||'null')+','+
(left.tree[1].to_js()+'' ||'null')+','+
(left.tree[2].to_js()+'' ||'null')+','+
right.to_js()+')'}
if(type=='list'){return res}
res+='\n}else{'
if(left.tree.length==1){res+='$B.$setitem('+left.value.to_js()+
','+left.tree[0].to_js()+','+right_js+')};_b_.None;'}else{left.func='setitem' 
res+=left.to_js()
res=res.substr(0,res.length-1)
left.func='getitem' 
res+=','+right_js+')};_b_.None;'}
return res}}
return left.to_js()+' = '+right.to_js()}
var $AsyncCtx=$B.parser.$AsyncCtx=function(C){
this.type='async'
this.parent=C
C.async=true}
$AsyncCtx.prototype.toString=function(){return '(async)'}
$AsyncCtx.prototype.transition=function(token,value){var C=this
if(token=="def"){return $transition(C.parent,token,value)}else if(token=="for" ||token=="with"){var ntype=$get_scope(C).ntype
if(ntype !=="def" && ntype !="generator"){$_SyntaxError(C,["'async "+token+
"' outside async function"])}
var ctx=$transition(C.parent,token,value)
ctx.parent.async=true 
return ctx}
$_SyntaxError(C,'token '+token+' after '+C)}
var $AttrCtx=$B.parser.$AttrCtx=function(C){
this.type='attribute'
this.value=C.tree[0]
this.parent=C
C.tree.pop()
C.tree[C.tree.length]=this
this.tree=[]
this.func='getattr' }
$AttrCtx.prototype.toString=function(){return '(attr) '+this.value+'.'+this.name}
$AttrCtx.prototype.transition=function(token,value){var C=this
if(token==='id'){var name=value
if(name=='__debug__'){$_SyntaxError(C,['cannot assign to __debug__'])}else if(noassign[name]===true){$_SyntaxError(C,`'${name}' cannot be an attribute`)}
name=$mangle(name,C)
C.name=name
return C.parent}
$_SyntaxError(C,token)}
$AttrCtx.prototype.to_js=function(){this.js_processed=true
var js=this.value.to_js()
if(this.func=="setattr" && this.value.type=="id"){var scope=$get_scope(this),parent=scope.parent
if(scope.ntype=="def"){if(parent.ntype=="class"){var params=scope.C.tree[0].positional_list
if(this.value.value==params[0]&& parent.C &&
parent.C.tree[0].args===undefined){
this.assign_self=true
return[js+".__class__ && "+js+".__dict__ && !"+
js+".__class__.$has_setattr && ! "+js+
".$is_class ? _b_.dict.$setitem("+js+
".__dict__, '"+$B.from_alias(this.name)+
"', ",") : $B.$setattr("+js+
', "'+this.name+'", ']}}}}
if(this.func=='setattr'){
return '$B.$setattr('+js+',"'+this.name+'")'}else{return '$B.$getattr('+js+',"'+this.name+'")'}}
var $AugmentedAssignCtx=$B.parser.$AugmentedAssignCtx=function(C,op){
check_assignment(C)
this.type='augm_assign'
this.C=C
this.parent=C.parent
C.parent.tree.pop()
C.parent.tree[C.parent.tree.length]=this
this.op=op
this.tree=[C]
var scope=this.scope=$get_scope(this)
if(C.type=='expr'){var assigned=C.tree[0]
if(assigned.type=='id'){var name=assigned.value
if(['None','True','False','__debug__'].indexOf(name)>-1){$_SyntaxError(C,'cannot assign to '+name)}
if(noassign[name]===true){$_SyntaxError(C,"cannot assign to keyword")}else if((scope.ntype=='def' ||scope.ntype=='generator')&&
(scope.binding[name]===undefined)){if(scope.globals===undefined ||
! scope.globals.has(name)){
assigned.unbound=true}}}else if(['str','int','float','complex'].indexOf(assigned.type)>-1){$_SyntaxError(C,["cannot assign to literal"])}}
$get_node(this).bound_before=Object.keys(scope.binding)
this.module=scope.module}
$AugmentedAssignCtx.prototype.toString=function(){return '(augm assign) '+this.tree}
$AugmentedAssignCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){if(C.tree[1].type=='abstract_expr'){$_SyntaxError(C,'token '+token+' after '+
C)}
return $transition(C.parent,'eol')}
$_SyntaxError(C,'token '+token+' after '+C)}
$AugmentedAssignCtx.prototype.transform=function(node,rank){var C=this.C,op=this.op,func='__'+$operators[op]+'__',offset=0,parent=node.parent,line_num=node.line_num,lnum_set=false
parent.children.splice(rank,1)
var left_is_id=(this.tree[0].type=='expr' &&
this.tree[0].tree[0].type=='id')
if(left_is_id){var left_bound_to_int=
this.tree[0].tree[0].bindingType(this.scope)=="int"
this.tree[0].tree[0].augm_assign=true
if($B.debug > 0){var check_node=$NodeJS('if('+this.tree[0].to_js()+
' === undefined){throw _b_.NameError.$factory("name \''+
this.tree[0].tree[0].value+'\' is not defined")}')
node.parent.insert(rank,check_node)
offset++}
var left_id=this.tree[0].tree[0].value,was_bound=this.scope.binding[left_id]!==undefined,left_id_unbound=this.tree[0].tree[0].unbound}
var right_is_int=(this.tree[1].type=='expr' &&
this.tree[1].tree[0].type=='int')
if(right_is_int){var value=this.tree[1].tree[0].value,to_int=parseInt(value[1],value[0])
right_is_int=(to_int > $B.min_int)&&(to_int < $B.max_int)}
var right=right_is_int ?
'('+this.tree[1].tree[0].to_js()+')' :
'$temp'
if(!right_is_int){
var new_node=new $Node()
new_node.line_num=line_num
lnum_set=true
new $NodeJSCtx(new_node,'var $temp,$left;')
parent.insert(rank,new_node)
offset++
var new_node=new $Node()
new_node.id=this.scope.id
var new_ctx=new $NodeCtx(new_node)
var new_expr=new $ExprCtx(new_ctx,'js',false)
var _id=new $RawJSCtx(new_expr,'$temp')
var assign=new $AssignCtx(new_expr)
assign.tree[1]=this.tree[1]
_id.parent=assign
parent.insert(rank+offset,new_node)
offset++}
var prefix='',in_class=false
switch(op){case '+=':
case '-=':
case '*=':
case '/=':
if(left_is_id){var scope=this.scope,global_ns='$local_'+scope.module.replace(/\./g,'_')
switch(scope.ntype){case 'module':
prefix=global_ns
break
case 'def':
case 'generator':
if(scope.globals &&
scope.globals.has(C.tree[0].value)){prefix=global_ns}else{prefix='$locals'}
break
case 'class':
var new_node=new $Node()
if(!lnum_set){new_node.line_num=line_num
lnum_set=true}
new $NodeJSCtx(new_node,'var $left = '+
C.to_js())
parent.insert(rank+offset,new_node)
in_class=true
offset++}}}
var left=C.tree[0].to_js()
if(C.tree[0].type=="id"){var binding_scope=C.tree[0].firstBindingScopeId(),left_value=C.tree[0].value
if(binding_scope){left="$locals_"+binding_scope.replace(/\./g,'_')+
'["'+left_value+'"]'}else{left='$locals["'+left_value+'"]'}}
if(left_bound_to_int && right_is_int &&
op !="//="){
parent.insert(rank+offset,$NodeJS(left+" "+op+" "+right))
return offset++}
prefix=prefix && !C.tree[0].unknown_binding && !left_id_unbound
var op1=op.charAt(0)
if(prefix){parent.insert(rank+offset,$NodeJS('$left = '+left))
offset++
var left1=in_class ? '$left' :left
var new_node=new $Node()
if(!lnum_set){new_node.line_num=line_num
lnum_set=true}
js=right_is_int ? 'if(' :'if(typeof $temp.valueOf() == "number" && '
js+='$left.constructor === Number'
js+=' && Number.isSafeInteger($left'+op1+right+')){'+
(right_is_int ? '(' :'(typeof $temp == "number" && ')+
'typeof $left == "number") ? '
js+=left+op+right
js+=' : '+left+' = new Number($left'+op1+
(right_is_int ? right :right+'.valueOf()')+')}'
new $NodeJSCtx(new_node,js)
parent.insert(rank+offset,new_node)
offset++
if(op=='+='){
var js='else if(typeof $left == "string" && typeof $temp == '+
'"string"){'+left+' = $left + $temp}'
parent.insert(rank+offset,$NodeJS(js))
offset++}}
var aaops={'+=':'add','-=':'sub','*=':'mul'}
if(C.tree[0].type=='sub' &&
('+='==op ||'-='==op ||'*='==op)&&
C.tree[0].tree.length==1){var js1='$B.augm_item_'+aaops[op]+'('+
C.tree[0].value.to_js()+','+
C.tree[0].tree[0].to_js()+','+right+');_b_.None;'
var new_node=new $Node()
if(!lnum_set){new_node.line_num=line_num;lnum_set=true}
new $NodeJSCtx(new_node,js1)
parent.insert(rank+offset,new_node)
offset++
return}
if(prefix){var else_node=$NodeJS('else')}else{var else_node=$NodeJS('if(true)')}
parent.insert(rank+offset,else_node)
offset++
var iadd_node=$NodeJS('var iadd = $B.$getattr('+C.to_js()+
',"'+func+'", null)')
if(!lnum_set){iadd_node.line_num=line_num
lnum_set=true}
else_node.add(iadd_node)
var no_iadd_node=$NodeJS('if(iadd === null)')
else_node.add(no_iadd_node)
var aa1=new $Node()
aa1.id=this.scope.id
aa1.line_num=node.line_num
no_iadd_node.add(aa1)
var ctx1=new $NodeCtx(aa1)
var expr1=new $ExprCtx(ctx1,'clone',false)
if(left_id_unbound){new $RawJSCtx(expr1,left)}else{expr1.tree=C.tree
expr1.tree.forEach(function(elt){elt.parent=expr1})}
var assign1=new $AssignCtx(expr1)
var new_op=new $OpCtx(expr1,op.substr(0,op.length-1))
new_op.parent=assign1
new $RawJSCtx(new_op,right)
assign1.tree.push(new_op)
expr1.parent.tree.pop()
expr1.parent.tree.push(assign1)
var yes_iadd_node=$NodeJS("else")
else_node.add(yes_iadd_node)
var aa2=new $Node()
aa2.line_num=node.line_num
yes_iadd_node.add(aa2)
var ctx2=new $NodeCtx(aa2)
var expr2=new $ExprCtx(ctx2,'clone',false)
if(left_id_unbound){var js=left
if(! binding_scope){js='$B.$local_search("'+left_value+'");'+left}
new $RawJSCtx(expr2,js)}else{expr2.tree=C.tree
expr2.tree.forEach(function(elt){elt.parent=expr2})}
var assign2=new $AssignCtx(expr2)
assign2.tree.push($NodeJS('iadd('+right+')'))
expr2.parent.tree.pop()
expr2.parent.tree.push(assign2)
if(left_is_id && !was_bound && !this.scope.blurred){this.scope.binding[left_id]=undefined}
return offset}
$AugmentedAssignCtx.prototype.to_js=function(){return ''}
var $AwaitCtx=$B.parser.$AwaitCtx=function(C){
this.type='await'
this.parent=C
this.tree=[]
C.tree.push(this)
var p=C
while(p){if(p.type=="list_or_tuple"){p.is_await=true}
p=p.parent}}
$AwaitCtx.prototype.transition=function(token,value){var C=this
C.parent.is_await=true
return $transition(C.parent,token,value)}
$AwaitCtx.prototype.to_js=function(){
return 'var save_stack = $B.save_stack();'+
'try{await ($B.promise('+$to_js(this.tree)+'))}'+
'catch(err){$B.restore_stack(save_stack, $locals);throw err};'+
'$B.restore_stack(save_stack, $locals); '}
var $BodyCtx=$B.parser.$BodyCtx=function(C){
var ctx_node=C.parent
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var body_node=new $Node()
body_node.is_body_node=true
body_node.line_num=tree_node.line_num
tree_node.insert(0,body_node)
return new $NodeCtx(body_node)}
var set_loop_context=$B.parser.set_loop_context=function(C,kw){
var ctx_node=C
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var loop_node=tree_node.parent
var break_flag=false
while(1){if(loop_node.type=='module'){
$_SyntaxError(C,kw+' outside of a loop')}else{var ctx=loop_node.C.tree[0]
if(ctx.type=='condition' && ctx.token=='while'){this.loop_ctx=ctx
ctx['has_'+kw]=true
break}
switch(ctx.type){case 'for':
this.loop_ctx=ctx
ctx['has_'+kw]=true
break_flag=true
break
case 'def':
case 'generator':
case 'class':
$_SyntaxError(C,kw+' outside of a loop')
default:
loop_node=loop_node.parent}
if(break_flag){break}}}}
var $BreakCtx=$B.parser.$BreakCtx=function(C){
this.type='break'
this.parent=C
C.tree[C.tree.length]=this
set_loop_context.apply(this,[C,'break'])}
$BreakCtx.prototype.toString=function(){return 'break '}
$BreakCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){return $transition(C.parent,'eol')}
$_SyntaxError(C,token)}
$BreakCtx.prototype.to_js=function(){this.js_processed=true
var scope=$get_scope(this)
var res=';$locals_'+scope.id.replace(/\./g,'_')+
'["$no_break'+this.loop_ctx.loop_num+'"] = false'
if(this.loop_ctx.type !='asyncfor'){res+=';break'}else{res+=';throw _b_.StopIteration.$factory('+
this.loop_ctx.loop_num+')'}
return res}
var $CallArgCtx=$B.parser.$CallArgCtx=function(C){
this.type='call_arg'
this.parent=C
this.start=$pos
this.tree=[]
C.tree.push(this)
this.expect='id'}
$CallArgCtx.prototype.toString=function(){return 'call_arg '+this.tree}
$CallArgCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'await':
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'ellipsis':
case 'not':
case 'lambda':
if(C.expect=='id'){C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)}
break
case '=':
if(C.expect==','){return new $ExprCtx(new $KwArgCtx(C),'kw_value',false)}
break
case 'for':
if(this.parent.tree.length > 1){$_SyntaxError(C,"non-parenthesized generator expression")}
var lst=new $ListOrTupleCtx(C,'gen_expr')
lst.vars=C.vars 
lst.locals=C.locals
lst.intervals=[C.start]
C.tree.pop()
lst.expression=C.tree
C.tree=[lst]
lst.tree=[]
var comp=new $ComprehensionCtx(lst)
return new $TargetListCtx(new $CompForCtx(comp))
case 'op':
if(C.expect=='id'){var op=value
C.expect=','
switch(op){case '+':
case '-':
case '~':
return $transition(new $AbstractExprCtx(C,false),token,op)
case '*':
return new $StarArgCtx(C)
case '**':
return new $DoubleStarArgCtx(C)}}
$_SyntaxError(C,'token '+token+' after '+C)
case ')':
if(C.parent.kwargs &&
$B.last(C.parent.tree).tree[0]&& 
['kwarg','star_arg','double_star_arg'].
indexOf($B.last(C.parent.tree).tree[0].type)==-1){$_SyntaxError(C,['non-keyword argument after keyword argument'])}
if(C.tree.length > 0){var son=C.tree[C.tree.length-1]
if(son.type=='list_or_tuple' &&
son.real=='gen_expr'){son.intervals.push($pos)}}
return $transition(C.parent,token)
case ':':
if(C.expect==',' &&
C.parent.parent.type=='lambda'){return $transition(C.parent.parent,token)}
break
case ',':
if(C.expect==','){if(C.parent.kwargs &&
['kwarg','star_arg','double_star_arg'].
indexOf($B.last(C.parent.tree).tree[0].type)==-1){$_SyntaxError(C,['non-keyword argument after keyword argument'])}
return $transition(C.parent,token,value)}}
$_SyntaxError(C,'token '+token+' after '+C)}
$CallArgCtx.prototype.to_js=function(){this.js_processed=true
return $to_js(this.tree)}
var $CallCtx=$B.parser.$CallCtx=function(C){
this.type='call'
this.func=C.tree[0]
if(this.func !==undefined){
this.func.parent=this}
this.parent=C
if(C.type !='class'){C.tree.pop()
C.tree[C.tree.length]=this}else{
C.args=this}
this.expect='id'
this.tree=[]
this.start=$pos
if(this.func && this.func.type=="attribute" && this.func.name=="wait"
&& this.func.value.type=="id" && this.func.value.value=="time"){console.log('call',this.func)
$get_node(this).blocking={'type':'wait','call':this}}
if(this.func && this.func.value=='input'){$get_node(this).blocking={'type':'input'}}}
$CallCtx.prototype.toString=function(){return '(call) '+this.func+'('+this.tree+')'}
$CallCtx.prototype.transition=function(token,value){var C=this
switch(token){case ',':
if(C.expect=='id'){$_SyntaxError(C,token)}
C.expect='id'
return C
case 'await':
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
case 'ellipsis':
C.expect=','
return $transition(new $CallArgCtx(C),token,value)
case ')':
C.end=$pos
return C.parent
case 'op':
C.expect=','
switch(value){case '-':
case '~':
case '+':
C.expect=','
return $transition(new $CallArgCtx(C),token,value)
case '*':
C.has_star=true
return new $StarArgCtx(C)
case '**':
C.has_dstar=true
return new $DoubleStarArgCtx(C)}
$_SyntaxError(C,token)
case 'yield':
$_SyntaxError(C,token)}
return $transition(C.parent,token,value)}
$CallCtx.prototype.to_js=function(){this.js_processed=true
if(this.tree.length > 0){if(this.tree[this.tree.length-1].tree.length==0){
this.tree.pop()}}
var func_js=this.func.to_js()
if(this.func !==undefined){switch(this.func.value){case 'classmethod':
return '_b_.classmethod.$factory('+$to_js(this.tree)+')'
default:
if(this.func.type=='unary'){
var res='$B.$getattr('+$to_js(this.tree)
switch(this.func.op){case '+':
return res+',"__pos__")()'
case '-':
return res+',"__neg__")()'
case '~':
return res+',"__invert__")()'}}}
var _block=false
var positional=[],kw_args=[],star_args=false,dstar_args=[]
this.tree.forEach(function(arg){var type
switch(arg.type){case 'star_arg':
star_args=true
positional.push([arg.tree[0].tree[0].to_js(),'*'])
break
case 'double_star_arg':
dstar_args.push(arg.tree[0].tree[0].to_js())
break
case 'id':
positional.push([arg.to_js(),'s'])
break
default:
type=arg.tree[0].type
switch(type){case 'expr':
positional.push([arg.to_js(),'s'])
break
case 'kwarg':
kw_args.push(arg.tree[0].tree[0].value+
':'+arg.tree[0].tree[1].to_js())
break
case 'list_or_tuple':
case 'op':
positional.push([arg.to_js(),'s'])
break
case 'star_arg':
star_args=true
positional.push([arg.tree[0].tree[0].to_js(),'*'])
break
case 'double_star_arg':
dstar_args.push(arg.tree[0].tree[0].to_js())
break
default:
positional.push([arg.to_js(),'s'])
break}
break}})
var args_str
if(star_args){
var p=[]
for(var i=0,len=positional.length;i < len;i++){arg=positional[i]
if(arg[1]=='*'){
p.push('_b_.list.$factory('+arg[0]+')')}else{var elt=[positional[i][0]]
i++
while(i < len && positional[i][1]=='s'){elt.push(positional[i][0])
i++}
i--
p.push('['+elt.join(',')+']')}}
args_str=p[0]
for(var i=1;i < p.length;i++){args_str+='.concat('+p[i]+')'}}else{for(var i=0,len=positional.length;i < len;i++){positional[i]=positional[i][0]}
args_str=positional.join(', ')}
var kw_args_str='{'+kw_args.join(', ')+'}'
if(dstar_args.length){kw_args_str='{$nat:"kw",kw:['+kw_args_str+','+
dstar_args.join(', ')+']}'}else if(kw_args_str !='{}'){kw_args_str='{$nat:"kw",kw:'+kw_args_str+'}'}else{kw_args_str=''}
if(star_args && kw_args_str){args_str+='.concat(['+kw_args_str+'])'}else{if(args_str && kw_args_str){args_str+=','+kw_args_str}
else if(!args_str){args_str=kw_args_str}}
if(star_args){
args_str='.apply(null,'+args_str+')'}else{args_str='('+args_str+')'}
var default_res="$B.$call("+func_js+")"+args_str
if(this.tree.length >-1 && this.func.type=='id' &&
this.func.is_builtin){
var classes=["complex","bytes","bytearray","object","memoryview","int","float","str","list","tuple","dict","set","frozenset","range","slice","zip","bool","type","classmethod","staticmethod","enumerate","reversed","property","$$super","zip","map","filter"]
if($B.builtin_funcs[this.func.value]!==undefined){if(classes.indexOf(this.func.value)==-1){
return func_js+args_str}else{
return func_js+".$factory"+args_str}}}
return default_res}}
var $CaseCtx=$B.parser.$CaseCtx=function(node_ctx){
this.type="case"
node_ctx.tree=[this]
this.parent=node_ctx
this.tree=[]
this.expect='as'}
$CaseCtx.prototype.set_alias=function(name){this.alias=name}
$CaseCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'as':
C.expect=':'
return new $AbstractExprCtx(new $AliasCtx(C))
case ':':
function is_irrefutable(pattern){if(pattern.type=="capture_pattern"){return true}else if(pattern.type=="or_pattern"){for(var subpattern of pattern.tree){if(is_irrefutable(subpattern)){return true}}}else if(pattern.type=="sequence_pattern" &&
pattern.token=='(' &&
pattern.tree.length==1 &&
is_irrefutable(pattern.tree[0])){return true}
return false}
if(is_irrefutable(this.tree[0])){
$get_node(C).parent.irrefutable=C}
switch(C.expect){case 'id':
case 'as':
case ':':
return $BodyCtx(C)}
break
case 'op':
if(value=='|'){return new $PatternCtx(new $PatternOrCtx(C))}
$_SyntaxError(C,['expected :'])
case ',':
if(C.expect==':' ||C.expect=='as'){console.log('implicit tuple',this)
var first=this.tree[0]
return new $PatternCtx(new $PatternSequenceCtx(C))}
default:
$_SyntaxError(C,['expected :'])}}
$CaseCtx.prototype.to_js=function(){var node=$get_node(this),rank=node.parent.children.indexOf(node),prefix=rank==0 ? 'if' :'else if'
return prefix+'($B.pattern_match(subject, '+$to_js(this.tree)+
(this.alias ? `, {as: "${this.alias.value}"}` :'')+'))'}
var $ClassCtx=$B.parser.$ClassCtx=function(C){
this.type='class'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.expect='id'
var scope=this.scope=$get_scope(this)
this.parent.node.parent_block=scope
this.parent.node.bound={}
this.parent.node.binding={__annotations__:true}}
$ClassCtx.prototype.toString=function(){return '(class) '+this.name+' '+this.tree+' args '+this.args}
$ClassCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){C.set_name(value)
C.expect='(:'
return C}
break
case '(':
return new $CallCtx(C)
case ':':
return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)}
$ClassCtx.prototype.set_name=function(name){var C=this.parent
this.random=$B.UUID()
this.name=name
this.id=C.node.module+'_'+name+'_'+this.random
this.binding={}
this.parent.node.id=this.id
var scope=this.scope,parent_block=scope
var block=scope,parent_classes=[]
while(block.ntype=="class"){parent_classes.splice(0,0,block.C.tree[0].name)
block=block.parent}
this.qualname=parent_classes.concat([name]).join(".")
while(parent_block.C &&
parent_block.C.tree[0].type=='class'){parent_block=parent_block.parent}
while(parent_block.C &&
'def' !=parent_block.C.tree[0].type &&
'generator' !=parent_block.C.tree[0].type){parent_block=parent_block.parent}
this.parent.node.parent_block=parent_block
$bind(name,scope,this)
if(scope.is_function){if(scope.C.tree[0].locals.indexOf(name)==-1){scope.C.tree[0].locals.push(name)}}}
$ClassCtx.prototype.transform=function(node,rank){
this.doc_string=$get_docstring(node)
this.module=$get_module(this).module.replace(/\./g,'_')
var indent='\n'+' '.repeat(node.indent+12),instance_decl=new $Node(),local_ns='$locals_'+this.id.replace(/\./g,'_'),js='var '+local_ns+' = {'+
'__annotations__: $B.empty_dict()}, '+
indent+'$locals = '+local_ns
new $NodeJSCtx(instance_decl,js)
node.insert(0,instance_decl)
var global_scope=this.scope
while(global_scope.parent_block.id !=='__builtins__'){global_scope=global_scope.parent_block}
var global_ns='$locals_'+global_scope.id.replace(/\./g,'_')
var js=' '.repeat(node.indent+4)+
'$locals.$name = "'+this.name+'"'+indent+
'$locals.$qualname = "'+this.qualname+'"'+indent+
'$locals.$is_class = true; '+indent+
'$locals.$line_info = "'+node.line_num+','+
this.module+'";'+indent+
'var $top_frame = ["'+local_ns+'", $locals,'+'"'+
global_scope.id+'", '+global_ns+']'+
indent+'$locals.$f_trace = $B.enter_frame($top_frame);'+
indent+'if($locals.$f_trace !== _b_.None){'+
'$locals.$f_trace = $B.trace_line()}'
node.insert(1,$NodeJS(js))
node.add($NodeJS('if($locals.$f_trace !== _b_.None){'+
'$B.trace_return(_b_.None)}'))
node.add($NodeJS('$B.leave_frame({$locals})'))
var ret_obj=new $Node()
new $NodeJSCtx(ret_obj,'return '+local_ns+';')
node.insert(node.children.length,ret_obj)
var run_func=new $Node()
new $NodeJSCtx(run_func,')();')
node.parent.insert(rank+1,run_func)
var module_name='$locals_'+this.module+'.__name__'
rank++
node.parent.insert(rank+1,$NodeJS('$'+this.name+'_'+this.random+".__module__ = "+
module_name))
var scope=$get_scope(this)
var name_ref=';$locals_'+scope.id.replace(/\./g,'_')
name_ref+='["'+this.name+'"]'
var js=[name_ref+' = $B.$class_constructor("'+this.name],pos=1
js[pos++]='", $'+this.name+'_'+this.random
if(this.args !==undefined){
var arg_tree=this.args.tree,args=[],kw=[]
arg_tree.forEach(function(_tmp){if(_tmp.tree[0].type=='kwarg'){kw.push(_tmp.tree[0])}
else{args.push(_tmp.to_js())}})
js[pos++]=', _b_.tuple.$factory(['+args.join(',')+']),['
var _re=new RegExp('"','g'),_r=[],rpos=0
args.forEach(function(arg){_r[rpos++]='"'+arg.replace(_re,'\\"')+'"'})
js[pos++]=_r.join(',')+']'
_r=[]
rpos=0
kw.forEach(function(_tmp){_r[rpos++]='["'+_tmp.tree[0].value+'",'+
_tmp.tree[1].to_js()+']'})
js[pos++]=',['+_r.join(',')+']'}else{
js[pos++]=', _b_.tuple.$factory([]),[],[]'}
js[pos++]=')'
var cl_cons=new $Node()
new $NodeJSCtx(cl_cons,js.join(''))
rank++
node.parent.insert(rank+1,cl_cons)
rank++
var ds_node=new $Node()
js=name_ref+'.__doc__ = '+(this.doc_string ||'_b_.None')+';'
new $NodeJSCtx(ds_node,js)
node.parent.insert(rank+1,ds_node)
if(scope.ntype=='module'){var w_decl=new $Node()
new $NodeJSCtx(w_decl,'$locals["'+this.name+'"] = '+
this.name)}
node.parent.insert(rank+2,$NodeJS("_b_.None;"))
this.transformed=true}
$ClassCtx.prototype.to_js=function(){this.js_processed=true
return 'var $'+this.name+'_'+this.random+' = (function()'}
var $CompIfCtx=$B.parser.$CompIfCtx=function(C){
this.type='comp_if'
C.parent.intervals.push($pos)
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$CompIfCtx.prototype.toString=function(){return '(comp if) '+this.tree}
$CompIfCtx.prototype.transition=function(token,value){var C=this
return $transition(C.parent,token,value)}
$CompIfCtx.prototype.to_js=function(){this.js_processed=true
return $to_js(this.tree)}
var $ComprehensionCtx=$B.parser.$ComprehensionCtx=function(C){
this.type='comprehension'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$ComprehensionCtx.prototype.toString=function(){return '(comprehension) '+this.tree}
$ComprehensionCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'if':
return new $AbstractExprCtx(new $CompIfCtx(C),false)
case 'for':
return new $TargetListCtx(new $CompForCtx(C))}
return $transition(C.parent,token,value)}
$ComprehensionCtx.prototype.to_js=function(){this.js_processed=true
var intervals=[]
this.tree.forEach(function(elt){intervals.push(elt.start)})
return intervals}
var $CompForCtx=$B.parser.$CompForCtx=function(C){
this.type='comp_for'
C.parent.intervals.push($pos)
this.parent=C
this.tree=[]
this.expect='in'
C.tree[C.tree.length]=this}
$CompForCtx.prototype.toString=function(){return '(comp for) '+this.tree}
$CompForCtx.prototype.transition=function(token,value){var C=this
if(token=='in' && C.expect=='in'){C.expect=null
return new $AbstractExprCtx(new $CompIterableCtx(C),true)}
if(C.expect===null){
return $transition(C.parent,token,value)}
$_SyntaxError(C,'token '+token+' after '+C)}
$CompForCtx.prototype.to_js=function(){this.js_processed=true
return $to_js(this.tree)}
var $CompIterableCtx=$B.parser.$CompIterableCtx=function(C){
this.type='comp_iterable'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$CompIterableCtx.prototype.toString=function(){return '(comp iter) '+this.tree}
$CompIterableCtx.prototype.transition=function(token,value){var C=this
return $transition(C.parent,token,value)}
$CompIterableCtx.prototype.to_js=function(){this.js_processed=true
return $to_js(this.tree)}
var $ConditionCtx=$B.parser.$ConditionCtx=function(C,token){
this.type='condition'
this.token=token
this.parent=C
this.tree=[]
this.scope=$get_scope(this)
if(token=='while'){this.loop_num=$loop_num++}
C.tree[C.tree.length]=this}
$ConditionCtx.prototype.toString=function(){return this.token+' '+this.tree}
$ConditionCtx.prototype.transition=function(token,value){var C=this
if(token==':'){if(C.tree[0].type=="abstract_expr" &&
C.tree[0].tree.length==0){
$_SyntaxError(C,'token '+token+' after '+C)}
return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)}
$ConditionCtx.prototype.transform=function(node,rank){var scope=$get_scope(this)
if(this.token=="while"){node.parent.insert(rank,$NodeJS('$locals["$no_break'+this.loop_num+'"] = true'))
var module=$get_module(this).module
if($B.last(node.children).C.tree[0].type !="return"){var js='$locals.$line_info = "'+node.line_num+
','+module+'";if($locals.$f_trace !== _b_.None){'+
'$B.trace_line()};_b_.None;'
node.add($NodeJS(js))}
return 2}}
$ConditionCtx.prototype.to_js=function(){this.js_processed=true
var tok=this.token
if(tok=='elif'){tok='else if'}
var res=[tok+'($B.$bool(']
if(tok=='while'){res.push('$locals["$no_break'+this.loop_num+'"] && ')}else if(tok=='else if'){var line_info=$get_node(this).line_num+','+
$get_scope(this).id
res.push('($B.set_line("'+line_info+'")) && ')}
if(this.tree.length==1){res.push($to_js(this.tree)+'))')}else{
res.push(this.tree[0].to_js()+'))')
if(this.tree[1].tree.length > 0){res.push('{'+this.tree[1].to_js()+'}')}}
return res.join('')}
var $ContinueCtx=$B.parser.$ContinueCtx=function(C){
this.type='continue'
this.parent=C
$get_node(this).is_continue=true
C.tree[C.tree.length]=this
set_loop_context.apply(this,[C,'continue'])}
$ContinueCtx.prototype.toString=function(){return '(continue)'}
$ContinueCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){return C.parent}
$_SyntaxError(C,'token '+token+' after '+C)}
$ContinueCtx.prototype.to_js=function(){this.js_processed=true
var js='continue'
if(this.loop_ctx.has_break){
js=`$locals["$no_break${this.loop_ctx.loop_num}"] = true;${js}`}
return js}
var $DebuggerCtx=$B.parser.$DebuggerCtx=function(C){
this.type='continue'
this.parent=C
C.tree[C.tree.length]=this}
$DebuggerCtx.prototype.toString=function(){return '(debugger)'}
$DebuggerCtx.prototype.transition=function(token,value){var C=this}
$DebuggerCtx.prototype.to_js=function(){this.js_processed=true
return 'debugger'}
var $DecoratorCtx=$B.parser.$DecoratorCtx=function(C){
this.type='decorator'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]}
$DecoratorCtx.prototype.toString=function(){return '(decorator) '+this.tree}
$DecoratorCtx.prototype.transition=function(token,value){var C=this
if(token=='id' && C.tree.length==0){return $transition(new $AbstractExprCtx(C,false),token,value)}
if(token=='eol'){return $transition(C.parent,token)}
$_SyntaxError(C,'token '+token+' after '+C)}
$DecoratorCtx.prototype.transform=function(node,rank){var func_rank=rank+1,children=node.parent.children,decorators=[this.tree]
while(1){if(func_rank >=children.length){$_SyntaxError(node.C,['decorator expects function'])}
else if(children[func_rank].C.type=='node_js'){func_rank++}else if(children[func_rank].C.tree[0].type==
'decorator'){decorators.push(children[func_rank].C.tree[0].tree)
children.splice(func_rank,1)}else{break}}
this.dec_ids=[]
var pos=0
decorators.forEach(function(){this.dec_ids.push('$id'+$B.UUID())},this)
var obj=children[func_rank].C.tree[0]
if(obj.type=='def'){obj.decorated=true
obj.alias='$dec'+$B.UUID()}
var tail='',scope=$get_scope(this),ref='$locals["'
if(scope.globals && scope.globals.has(obj.name)){var module=$get_module(this)
ref='$locals_'+module.id+'["'}
ref+=obj.name+'"]'
var res=ref+' = '
decorators.forEach(function(elt,i){res+='$B.$call('+this.dec_ids[i]+')('
tail+=')'},this)
res+=(obj.decorated ? obj.alias :ref)+tail+';'
$bind(obj.name,scope,this)
node.parent.insert(func_rank+1,$NodeJS(res))
this.decorators=decorators}
$DecoratorCtx.prototype.to_js=function(){this.js_processed=true
var res=[]
this.decorators.forEach(function(decorator,i){res.push('var '+this.dec_ids[i]+' = '+
$to_js(decorator)+';')},this)
return res.join('')}
var $DefCtx=$B.parser.$DefCtx=function(C){this.type='def'
this.name=null
this.parent=C
this.tree=[]
this.async=C.async
this.locals=[]
C.tree[C.tree.length]=this
this.enclosing=[]
var scope=this.scope=$get_scope(this)
if(scope.C && scope.C.tree[0].type=="class"){this.class_name=scope.C.tree[0].name}
C.node.binding={}
var parent_block=scope
while(parent_block.C &&
parent_block.C.tree[0].type=='class'){parent_block=parent_block.parent}
while(parent_block.C &&
'def' !=parent_block.C.tree[0].type){parent_block=parent_block.parent}
this.parent.node.parent_block=parent_block
var pb=parent_block
this.is_comp=pb.is_comp
while(pb && pb.C){if(pb.C.tree[0].type=='def'){this.inside_function=true
break}
pb=pb.parent_block}
this.module=scope.module
this.root=$get_module(this)
this.num=$loop_num
$loop_num++
this.positional_list=[]
this.default_list=[]
this.other_args=null
this.other_kw=null
this.after_star=[]}
$DefCtx.prototype.set_name=function(name){try{name=$mangle(name,this.parent.tree[0])}catch(err){console.log(err)
console.log('parent',this.parent)
throw err}
var id_ctx=new $IdCtx(this,name)
this.name=name
this.id=this.scope.id+'_'+name
this.id=this.id.replace(/\./g,'_')
this.id+='_'+$B.UUID()
this.parent.node.id=this.id
this.parent.node.module=this.module
this.binding={}
var scope=this.scope
if(scope.globals !==undefined &&
scope.globals.has(name)){
$bind(name,this.root,this)}else{$bind(name,scope,this)}
id_ctx.bound=true
if(scope.is_function){if(scope.C.tree[0].locals.indexOf(name)==-1){scope.C.tree[0].locals.push(name)}}}
$DefCtx.prototype.toString=function(){return 'def '+this.name+'('+this.tree+')'}
$DefCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.name){$_SyntaxError(C,'token '+token+' after '+C)}
C.set_name(value)
return C
case '(':
if(C.name==null){$_SyntaxError(C,"missing name in function definition")}
C.has_args=true;
return new $FuncArgs(C)
case 'annotation':
return new $AbstractExprCtx(new $AnnotationCtx(C),true)
case ':':
if(C.has_args){return $BodyCtx(C)}else{$_SyntaxError(C,"missing function parameters")}
case 'eol':
if(C.has_args){$_SyntaxError(C,"missing colon")}}
$_SyntaxError(C,'token '+token+' after '+C)}
$DefCtx.prototype.transform=function(node,rank){if(this.is_comp){$get_node(this).is_comp=true}
if(this.transformed !==undefined){return}
var scope=this.scope
this.doc_string=$get_docstring(node)
this.rank=rank 
var indent=node.indent+12
if(this.name.substr(0,15)=='lambda_'+$B.lambda_magic){var pblock=scope.parent_block
if(pblock.C && pblock.C.tree[0].type=="def"){this.enclosing.push(pblock)}}
var pnode=this.parent.node
while(pnode.parent && pnode.parent.is_def_func){this.enclosing.push(pnode.parent.parent)
pnode=pnode.parent.parent}
var defaults=[],defs1=[],has_end_pos=false
this.argcount=0
this.kwonlyargcount=0 
this.kwonlyargsdefaults=[]
this.otherdefaults=[]
this.varnames={}
this.args=[]
this.__defaults__=[]
this.slots=[]
var slot_list=[],slot_init=[],annotations=[]
if(this.annotation){annotations.push('"return":'+this.annotation.to_js())}
this.func_name=this.tree[0].to_js()
var func_name1=this.func_name
if(this.decorated){this.func_name='var '+this.alias
func_name1=this.alias}
var func_args=this.tree[1].tree
func_args.forEach(function(arg){if(arg.type=='end_positional'){this.args.push("/")
slot_list.push('"/"')
has_end_pos=true}else{this.args.push(arg.name)
this.varnames[arg.name]=true}
if(arg.type=='func_arg_id'){if(this.star_arg){this.kwonlyargcount++
if(arg.has_default){this.kwonlyargsdefaults.push(arg.name)}}
else{this.argcount++
if(arg.has_default){this.otherdefaults.push(arg.name)}}
this.slots.push(arg.name+':null')
slot_list.push('"'+arg.name+'"')
slot_init.push(arg.name+':'+arg.name)
if(arg.tree.length > 0){defaults.push('"'+arg.name+'"')
defs1.push(arg.name+':'+$to_js(arg.tree))
this.__defaults__.push($to_js(arg.tree))}}else if(arg.type=='func_star_arg'){if(arg.op=='*'){this.star_arg=arg.name}
else if(arg.op=='**'){this.kw_arg=arg.name}}
if(arg.annotation){var name=$mangle(arg.name,this)
annotations.push(name+': '+arg.annotation.to_js())}},this)
slot_init='{'+slot_init.join(", ")+'}'
var flags=67
if(this.star_arg){flags |=4}
if(this.kw_arg){flags |=8}
if(this.type=='generator'){flags |=32}
if(this.async){flags |=128}
var nodes=[],js
var global_scope=scope
while(global_scope.parent_block &&
global_scope.parent_block.id !=='__builtins__'){global_scope=global_scope.parent_block}
var global_ns='$locals_'+global_scope.id.replace(/\./g,'_')
var name=this.name+this.num
var local_ns='$locals_'+this.id,h='\n'+' '.repeat(indent)
js='var '+local_ns+' = {},'+
h+'$locals = '+local_ns+';'
var new_node=new $Node()
new_node.locals_def=true
new_node.func_node=node
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
var enter_frame_nodes=[$NodeJS('$locals.$line_info = "'+node.line_num+','+
this.module+'"'),$NodeJS(`var $top_frame = ["${this.id}", $locals,`+
'"'+global_scope.id+'", '+global_ns+', '+
(this.is_comp ? this.name :name)+']'),$NodeJS('$locals.$f_trace = $B.enter_frame($top_frame)'),$NodeJS('var $stack_length = $B.frames_stack.length;')
]
if(this.type=="generator"){enter_frame_nodes.push($NodeJS("$locals.$is_generator = true"))}
if(this.async){enter_frame_nodes.splice(1,0,$NodeJS(`$locals.$async = "${this.id}"`))}
enter_frame_nodes.forEach(function(node){node.enter_frame=true})
if(this.is_comp){nodes.push($NodeJS("var $defaults = {}"))}
this.env=[]
var make_args_nodes=[]
var js=local_ns+' = $locals = $B.args("'+this.name+'", '+
this.argcount+', {'+this.slots.join(', ')+'}, '+
'['+slot_list.join(', ')+'], arguments, $defaults, '+
this.other_args+', '+this.other_kw+');'
var new_node=new $Node()
new $NodeJSCtx(new_node,js)
make_args_nodes.push(new_node)
var only_positional=false
if(this.other_args===null && this.other_kw===null &&
this.after_star.length==0 && !has_end_pos){
only_positional=true
nodes.push($NodeJS('var $len = arguments.length;'))
var new_node=new $Node()
var js='var last_arg;if($len > 0 && ((last_arg = '+
'arguments[$len - 1]) !== undefined) && last_arg.$nat '+
'!== undefined)'
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
make_args_nodes.forEach(function(item){new_node.add(item)})
var else_node=new $Node()
new $NodeJSCtx(else_node,'else')
nodes.push(else_node)
var pos_len=this.slots.length
var test_node=$NodeJS('if($len == '+pos_len+')')
else_node.add(test_node)
test_node.add($NodeJS(local_ns+' = $locals = $B.conv_undef('+
slot_init+')'))
else_node.add($NodeJS('else if($len > '+pos_len+
'){$B.wrong_nb_args("'+this.name+'", $len, '+
pos_len+', ['+slot_list+'])}'))
if(pos_len > 0){
else_node.add($NodeJS('else if($len + Object.keys($defaults).length < '+
pos_len+'){$B.wrong_nb_args("'+this.name+
'", $len, '+pos_len+', ['+slot_list+'])}'))
var subelse_node=$NodeJS("else")
else_node.add(subelse_node)
subelse_node.add($NodeJS(local_ns+' = $locals = '+
'$B.conv_undef('+slot_init+')'))
subelse_node.add($NodeJS("var defparams = ["+slot_list+"]"))
subelse_node.add($NodeJS("for(var i = $len; i < defparams.length"+
"; i++){$locals[defparams[i]] = $defaults[defparams[i]]}"))}}else{nodes.push(make_args_nodes[0])
if(make_args_nodes.length > 1){nodes.push(make_args_nodes[1])}}
nodes=nodes.concat(enter_frame_nodes)
var is_method=scope.ntype=="class"
if(is_method){var class_ref="$locals_"+scope.parent_block.id.replace(/\./g,'_')+
'.'+scope.C.tree[0].qualname
var had_class=this.parent.node.binding["__class__"]
this.parent.node.binding["__class__"]=true
nodes.push($NodeJS("$locals.__class__ = "+class_ref))}
nodes.push($NodeJS('$B.js_this = this;'))
for(var i=nodes.length-1;i >=0;i--){node.children.splice(0,0,nodes[i])}
var def_func_node=new $Node()
this.params=''
if(only_positional){this.params=Object.keys(this.varnames).join(', ')}
new $NodeJSCtx(def_func_node,'')
def_func_node.is_def_func=true
def_func_node.module=this.module
var last_node=node.children[node.children.length-1],indent=last_node.indent,last_instr=last_node.C.tree[0]
if(last_instr.type !='return'){
js='if($locals.$f_trace !== _b_.None){\n'+
'    '.repeat(indent)+'$B.trace_return(_b_.None)\n'+
'    '.repeat(indent)+'}\n'+'    '.repeat(indent)
js+='$B.leave_frame'
if(this.id.substr(0,5)=='$exec'){js+='_exec'}
js+='({$locals});return _b_.None'
node.add($NodeJS(js))}
var free_vars=[]
if(this.parent.node.referenced){for(var attr in this.parent.node.referenced){if(! this.parent.node.binding[attr]){free_vars.push('"'+attr+'"')}}}
node.add(def_func_node)
var offset=1,indent=node.indent
if(! this.is_comp){
node.parent.insert(rank+offset++,$NodeJS(name+'.$is_func = true'))
if(this.$has_yield_in_cm){node.parent.insert(rank+offset++,$NodeJS(name+'.$has_yield_in_cm = true'))}
node.parent.insert(rank+offset++,$NodeJS(name+'.$infos = {'))
var __name__=this.name
if(this.name.substr(0,2)=="$$"){__name__=__name__.substr(2)}
if(__name__.substr(0,15)=='lambda_'+$B.lambda_magic){__name__="<lambda>"}
js='    __name__:"'+$B.from_alias(__name__)+'",'
node.parent.insert(rank+offset++,$NodeJS(js))
var __qualname__=__name__
if(this.class_name){__qualname__=this.class_name+'.'+
$B.from_alias(__name__)}
js='    __qualname__:"'+__qualname__+'",'
node.parent.insert(rank+offset++,$NodeJS(js))
if(this.otherdefaults.length > 0){var def_names=[]
this.otherdefaults.forEach(function(_default){def_names.push('$defaults.'+_default)})
node.parent.insert(rank+offset++,$NodeJS('    __defaults__ : '+
'$B.fast_tuple(['+def_names.join(', ')+']),'))}else{node.parent.insert(rank+offset++,$NodeJS('    __defaults__ : '+
'_b_.None,'))}
if(this.kwonlyargsdefaults.lengh > 0){var def_names=[]
this.kwonlyargsdefaults.forEach(function(_default){def_names.push('$defaults.'+_default)})
node.parent.insert(rank+offset++,$NodeJS('    __kwdefaults__ : '+
'$B.fast_tuple(['+def_names.join(', ')+']),'))}else{node.parent.insert(rank+offset++,$NodeJS('    __kwdefaults__ : '+
'_b_.None,'))}
node.parent.insert(rank+offset++,$NodeJS('    __annotations__: {'+annotations.join(',')+'},'))
node.parent.insert(rank+offset++,$NodeJS('    __dict__: $B.empty_dict(),'))
node.parent.insert(rank+offset++,$NodeJS('    __doc__: '+(this.doc_string ||'_b_.None')+','))
var root=$get_module(this)
node.parent.insert(rank+offset++,$NodeJS('    __module__ : "'+root.module+'",'))
for(var attr in this.parent.node.binding){
if(attr=="__class__" && is_method && ! had_class){continue}
this.varnames[attr]=true}
var co_varnames=[]
for(var attr in this.varnames){co_varnames.push('"'+$B.from_alias(attr)+'"')}
var CODE_MARKER='___%%%-CODE-%%%___'+this.name+this.num;
var h='\n'+' '.repeat(indent+8)
js='    __code__:{'+h+'    co_argcount:'+this.argcount
var h1=','+h+' '.repeat(4)
var module=$get_module(this).module
var co_name=this.name
if(co_name.startsWith("lambda_"+$B.lambda_magic)){co_name='<lambda>'}
js+=h1+'co_filename:$locals_'+module.replace(/\./g,'_')+
'["__file__"] || "<string>"'+
h1+'co_firstlineno:'+node.line_num+
h1+'co_flags:'+flags+
h1+'co_freevars: ['+free_vars+']'+
h1+'co_kwonlyargcount:'+this.kwonlyargcount+
h1+'co_name: "'+co_name+'"'+
h1+'co_nlocals: '+co_varnames.length+
h1+'co_posonlyargcount: '+(this.pos_only ||0)+
h1+'co_varnames: $B.fast_tuple(['+co_varnames.join(', ')+'])'+
h+'}\n'+' '.repeat(indent+4)+'};'
js+='_b_.None;'
node.parent.insert(rank+offset++,$NodeJS(js))}
this.default_str='{'+defs1.join(', ')+'}'
if(! this.is_comp){var name1=name
if(this.type=="generator"){name1=`$B.generator.$factory(${name})`}
var res='return '+name1
if(this.async){if(this.type=="generator"){res=`return $B.async_generator.$factory(${name})`}else{res='return $B.make_async('+name1+')'}}
node.parent.insert(rank+offset++,$NodeJS(res+'}'))
node.parent.insert(rank+offset++,$NodeJS(
this.func_name+" = "+this.name+'$'+this.num+
'('+this.default_str+')'))
node.parent.insert(rank+offset++,$NodeJS(
func_name1+".$set_defaults = function(value){return "+
func_name1+" = "+this.name+"$"+this.num+
"(value)}"))
if(this.$has_yield_in_cm){node.parent.insert(rank+offset++,$NodeJS(`${func_name1}.$has_yield_in_cm = true`))}}
var parent=node
for(var pos=0;pos < parent.children.length &&
parent.children[pos]!==$B.last(enter_frame_nodes);pos++){}
var try_node=$NodeJS('try'),children=parent.children.slice(pos+1)
parent.insert(pos+1,try_node)
children.forEach(function(child){if(child.is_def_func){child.children.forEach(function(grand_child){try_node.add(grand_child)})}else{try_node.add(child)}})
parent.children.splice(pos+2,parent.children.length)
var except_node=$NodeJS('catch(err)')
except_node.add($NodeJS('$B.set_exc(err)'))
except_node.add($NodeJS('if($locals.$f_trace !== _b_.None){'+
'$locals.$f_trace = $B.trace_exception()}'))
except_node.add($NodeJS('$B.leave_frame({$locals});throw err'))
parent.add(except_node)
this.transformed=true
return offset}
$DefCtx.prototype.to_js=function(func_name){this.js_processed=true
if(this.is_comp){return "var "+this.name+" = "+
(this.async ? ' async ' :'')+
"function* (expr)"}
func_name=func_name ||this.tree[0].to_js()
if(this.decorated){func_name='var '+this.alias}
return "var "+this.name+'$'+this.num+
' = function($defaults){'+
(this.async ? 'async ' :'')+'function'+
(this.type=='generator' ? "* " :" ")+
this.name+this.num+'('+this.params+')'}
var $DelCtx=$B.parser.$DelCtx=function(C){
this.type='del'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]}
$DelCtx.prototype.toString=function(){return 'del '+this.tree}
$DelCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){return $transition(C.parent,token)}
$_SyntaxError(C,'token '+token+' after '+C)}
$DelCtx.prototype.to_js=function(){this.js_processed=true
var C=this.parent
if(this.tree[0].type=='list_or_tuple'){
var res=[]
this.tree[0].tree.forEach(function(elt){var subdel=new $DelCtx(C)
subdel.tree=[elt]
res.push(subdel.to_js())
C.tree.pop()})
this.tree=[]
return res.join(';')}else if(this.tree[0].type=='expr' &&
this.tree[0].tree[0].type=='list_or_tuple'){
this.tree[0]=this.tree[0].tree[0]
return this.to_js()}else{var expr=this.tree[0].tree[0]
switch(expr.type){case 'id':
var scope=$get_scope(this),is_global=false
if((scope.ntype=="def" ||scope.ntype=="generator")&&
scope.globals && scope.globals.has(expr.value)){
scope=scope.parent
while(scope.parent &&
scope.parent.id !=="__builtins__"){scope=scope.parent}
is_global=true}
var res='$B.$delete("'+expr.value+'"'+
(is_global ? ', "global"' :'')+');'
delete scope.binding[expr.value]
return res
case 'list_or_tuple':
var res=[]
expr.tree.forEach(function(elt){res.push('delete '+elt.to_js())})
return res.join(';')
case 'sub':
expr.func='delitem'
js=expr.to_js()
expr.func='getitem'
return js
case 'op':
$_SyntaxError(this,["cannot delete operator"])
case 'call':
$_SyntaxError(this,["cannot delete function call"])
case 'attribute':
return '_b_.delattr('+expr.value.to_js()+',"'+
expr.name+'")'
default:
$_SyntaxError(this,["cannot delete "+expr.type])}}}
var $DictOrSetCtx=$B.parser.$DictOrSetCtx=function(C){
this.type='dict_or_set'
this.real='dict_or_set'
this.expect='id'
this.closed=false
this.start=$pos
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$DictOrSetCtx.prototype.toString=function(){switch(this.real){case 'dict':
return '(dict) {'+this.items+'}'
case 'set':
return '(set) {'+this.tree+'}'}
return '(dict_or_set) {'+this.tree+'}'}
$DictOrSetCtx.prototype.transition=function(token,value){var C=this
if(C.closed){switch(token){case '[':
return new $AbstractExprCtx(new $SubCtx(C.parent),false)
case '(':
return new $CallArgCtx(new $CallCtx(C.parent))}
return $transition(C.parent,token,value)}else{if(C.expect==','){switch(token){case '}':
switch(C.real){case 'dict_or_set':
if(C.tree.length !=1){break}
C.real='set' 
case 'set':
case 'set_comp':
case 'dict_comp':
C.items=C.tree
C.tree=[]
C.closed=true
return C
case 'dict':
if(C.nb_dict_items()% 2==0){C.items=C.tree
C.tree=[]
C.closed=true
return C}}
$_SyntaxError(C,'token '+token+
' after '+C)
case ',':
if(C.real=='dict_or_set'){C.real='set'}
if(C.real=='dict' &&
C.nb_dict_items()% 2){$_SyntaxError(C,'token '+token+
' after '+C)}
C.expect='id'
return C
case ':':
if(C.real=='dict_or_set'){C.real='dict'}
if(C.real=='dict'){C.expect=','
return new $AbstractExprCtx(C,false)}else{$_SyntaxError(C,'token '+token+
' after '+C)}
case 'for':
if(C.real=='dict_or_set'){C.real='set_comp'}else{C.real='dict_comp'}
var lst=new $ListOrTupleCtx(C,'dict_or_set_comp')
lst.intervals=[C.start+1]
lst.vars=C.vars
C.tree.pop()
lst.expression=C.tree
if(C.yields){lst.expression.yields=C.yields
delete C.yields}
C.tree=[lst]
lst.tree=[]
var comp=new $ComprehensionCtx(lst)
return new $TargetListCtx(new $CompForCtx(comp))}
$_SyntaxError(C,'token '+token+' after '+C)}else if(C.expect=='id'){switch(token){case '}':
if(C.tree.length==0){
C.items=[]
C.real='dict'}else{
C.items=C.tree}
C.tree=[]
C.closed=true
return C
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)
case 'op':
switch(value){case '*':
case '**':
C.expect=","
var expr=new $AbstractExprCtx(C,false)
expr.packed=value.length 
if(C.real=="dict_or_set"){C.real=value=="*" ? "set" :
"dict"}else if(
(C.real=="set" && value=="**")||
(C.real=="dict" && value=="*")){$_SyntaxError(C,'token '+token+
' after '+C)}
return expr
case '+':
return C
case '-':
case '~':
C.expect=','
var left=new $UnaryCtx(C,value)
if(value=='-'){var op_expr=new $OpCtx(left,'unary_neg')}else if(value=='+'){var op_expr=new $OpCtx(left,'unary_pos')}else{var op_expr=new $OpCtx(left,'unary_inv')}
return new $AbstractExprCtx(op_expr,false)}
$_SyntaxError(C,'token '+token+
' after '+C)}
$_SyntaxError(C,'token '+token+' after '+C)}
return $transition(C.parent,token,value)}}
$DictOrSetCtx.prototype.nb_dict_items=function(){var nb=0
this.tree.forEach(function(item){if(item.packed){nb+=2}
else{nb++}})
return nb}
$DictOrSetCtx.prototype.packed_indices=function(){var ixs=[]
this.items.forEach(function(t,i){if(t.type=="expr" && t.packed){ixs.push(i)}})
return ixs}
$DictOrSetCtx.prototype.unpack_dict=function(packed){var js="",res,first,i=0,item,elts=[]
while(i < this.items.length){item=this.items[i]
first=i==0
if(item.type=="expr" && item.packed){res="_b_.list.$factory(_b_.dict.items("+item.to_js()+"))"
i++}else{res="[["+item.to_js()+","+
this.items[i+1].to_js()+"]]"
i+=2}
if(! first){res=".concat("+res+")"}
js+=res}
return js}
$DictOrSetCtx.prototype.unpack_set=function(packed){var js="",res
this.items.forEach(function(t,i){if(packed.indexOf(i)>-1){res="_b_.list.$factory("+t.to_js()+")"}else{res="["+t.to_js()+"]"}
if(i > 0){res=".concat("+res+")"}
js+=res})
return js}
$DictOrSetCtx.prototype.to_js=function(){this.js_processed=true
switch(this.real){case 'dict':
var packed=this.packed_indices()
if(packed.length > 0){return '_b_.dict.$factory('+this.unpack_dict(packed)+
')'+$to_js(this.tree)}
var res=[]
for(var i=0;i < this.items.length;i+=2){res.push('['+this.items[i].to_js()+','+
this.items[i+1].to_js()+']')}
return '_b_.dict.$factory(['+res.join(',')+'])'+
$to_js(this.tree)
case 'set_comp':
return '_b_.set.$factory('+$to_js(this.items)+')'+
$to_js(this.tree)
case 'dict_comp':
return '_b_.dict.$factory('+$to_js(this.items)+')'+
$to_js(this.tree)}
var packed=this.packed_indices()
if(packed.length > 0){return '_b_.set.$factory('+this.unpack_set(packed)+')'}
return '_b_.set.$factory(['+$to_js(this.items)+'])'+$to_js(this.tree)}
var $DoubleStarArgCtx=$B.parser.$DoubleStarArgCtx=function(C){
this.type='double_star_arg'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$DoubleStarArgCtx.prototype.toString=function(){return '**'+this.tree}
$DoubleStarArgCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
return $transition(new $AbstractExprCtx(C,false),token,value)
case ',':
case ')':
return $transition(C.parent,token)
case ':':
if(C.parent.parent.type=='lambda'){return $transition(C.parent.parent,token)}}
$_SyntaxError(C,'token '+token+' after '+C)}
$DoubleStarArgCtx.prototype.to_js=function(){this.js_processed=true
return '{$nat:"pdict",arg:'+$to_js(this.tree)+'}'}
var $EllipsisCtx=$B.parser.$EllipsisCtx=function(C){
this.type='ellipsis'
this.parent=C
this.start=$pos
C.tree[C.tree.length]=this}
$EllipsisCtx.prototype.toString=function(){return 'ellipsis'}
$EllipsisCtx.prototype.transition=function(token,value){var C=this
return $transition(C.parent,token,value)}
$EllipsisCtx.prototype.to_js=function(){this.js_processed=true
return '$B.builtins["Ellipsis"]'}
var $EndOfPositionalCtx=$B.parser.$EndOfConditionalCtx=function(C){
this.type="end_positional"
this.parent=C
C.has_end_positional=true
C.parent.pos_only=C.tree.length
C.tree.push(this)}
$EndOfPositionalCtx.prototype.transition=function(token,value){var C=this
if(token=="," ||token==")"){return $transition(C.parent,token,value)}
$_SyntaxError(C,'token '+token+' after '+C)}
$EndOfPositionalCtx.prototype.to_js=function(){return "/"}
var $ExceptCtx=$B.parser.$ExceptCtx=function(C){
this.type='except'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.expect='id'
this.scope=$get_scope(this)}
$ExceptCtx.prototype.toString=function(){return '(except) '}
$ExceptCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case 'not':
case 'lambda':
if(C.expect=='id'){C.expect='as'
return $transition(new $AbstractExprCtx(C,false),token,value)}
case 'as':
if(C.expect=='as' &&
C.has_alias===undefined){C.expect='alias'
C.has_alias=true
return C}
case 'id':
if(C.expect=='alias'){C.expect=':'
C.set_alias(value)
return C}
break
case ':':
var _ce=C.expect
if(_ce=='id' ||_ce=='as' ||_ce==':'){return $BodyCtx(C)}
break
case '(':
if(C.expect=='id' && C.tree.length==0){C.parenth=true
return C}
break
case ')':
if(C.expect==',' ||C.expect=='as'){C.expect='as'
return C}
case ',':
if(C.parenth !==undefined &&
C.has_alias===undefined &&
(C.expect=='as' ||C.expect==',')){C.expect='id'
return C}}
$_SyntaxError(C,'token '+token+' after '+C.expect)}
$ExceptCtx.prototype.set_alias=function(alias){this.tree[0].alias=$mangle(alias,this)
$bind(alias,this.scope,this)}
$ExceptCtx.prototype.transform=function(node,rank){
var linenum_node=$NodeJS("void(0)")
linenum_node.line_num=node.line_num
node.insert(0,linenum_node)
var last_child=$B.last(node.children)
if(last_child.C.tree && last_child.C.tree[0]&&
last_child.C.tree[0].type=="return"){}
else{node.add($NodeJS("$B.del_exc()"))}}
$ExceptCtx.prototype.to_js=function(){
this.js_processed=true
switch(this.tree.length){case 0:
return 'else'
case 1:
if(this.tree[0].name=='Exception'){return 'else if(1)'}}
var res=[]
this.tree.forEach(function(elt){res.push(elt.to_js())})
var lnum=''
if($B.debug > 0){var module=$get_module(this)
lnum='($locals.$line_info = "'+$get_node(this).line_num+
','+module.id+'") && '}
return 'else if('+lnum+'$B.is_exc('+this.error_name+
',['+res.join(',')+']))'}
var $ExprCtx=$B.parser.$ExprCtx=function(C,name,with_commas){
this.type='expr'
this.name=name
this.$pos=$pos
this.with_commas=with_commas
this.expect=',' 
this.parent=C
if(C.packed){this.packed=C.packed}
if(C.is_await){var node=$get_node(this)
node.has_await=node.has_await ||[]
this.is_await=C.is_await
node.has_await.push(this)}
if(C.assign){
this.assign=C.assign}
this.tree=[]
C.tree[C.tree.length]=this}
$ExprCtx.prototype.toString=function(){return '(expr '+this.with_commas+') '+this.tree}
$ExprCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'bytes':
case 'float':
case 'id':
case 'imaginary':
case 'int':
case 'lambda':
case 'pass':
case 'str':
console.log("syntax error",C,token,value)
$_SyntaxError(C,'token '+token+' after '+
C)
break
case '{':
if(C.tree[0].type !="id" ||
["print","exec"].indexOf(C.tree[0].value)==-1){$_SyntaxError(C,'token '+token+' after '+
C)}
return new $DictOrSetCtx(C)
case '[':
case '(':
case '.':
case 'not':
if(C.expect=='expr'){C.expect=','
return $transition(new $AbstractExprCtx(C,false),token,value)}}
switch(token){case 'not':
if(C.expect==','){return new $ExprNot(C)}
break
case 'in':
if(C.parent.type=='target_list'){
return $transition(C.parent,token)}
if(C.expect==','){return $transition(C,'op','in')}
case ',':
if(C.expect==','){if(C.with_commas ||
["assign","return"].indexOf(C.parent.type)>-1){if($parent_match(C,{type:"yield","from":true})){$_SyntaxError(C,"no implicit tuple for yield from")}
C.parent.tree.pop()
var tuple=new $ListOrTupleCtx(C.parent,'tuple')
tuple.implicit=true
tuple.has_comma=true
tuple.tree=[C]
C.parent=tuple
return tuple}}
return $transition(C.parent,token)
case '.':
return new $AttrCtx(C)
case '[':
return new $AbstractExprCtx(new $SubCtx(C),true)
case '(':
return new $CallCtx(C)
case 'op':
var op_parent=C.parent,op=value
if(op_parent.type=='ternary' && op_parent.in_else){var new_op=new $OpCtx(C,op)
return new $AbstractExprCtx(new_op,false)}
var op1=C.parent,repl=null
while(1){if(op1.type=='expr'){op1=op1.parent}
else if(op1.type=='op' &&
$op_weight[op1.op]>=$op_weight[op]&&
!(op1.op=='**' && op=='**')){
repl=op1
op1=op1.parent}else if(op1.type=="not" &&
$op_weight['not']> $op_weight[op]){repl=op1
op1=op1.parent}else{break}}
if(repl===null){while(1){if(C.parent !==op1){C=C.parent
op_parent=C.parent}else{break}}
C.parent.tree.pop()
var expr=new $ExprCtx(op_parent,'operand',C.with_commas)
expr.expect=','
C.parent=expr
var new_op=new $OpCtx(C,op)
return new $AbstractExprCtx(new_op,false)}else{
if(op==='and' ||op==='or'){while(repl.parent.type=='not'||
(repl.parent.type=='expr' &&
repl.parent.parent.type=='not')){
repl=repl.parent
op_parent=repl.parent}}}
if(repl.type=='op'){var _flag=false
switch(repl.op){case '<':
case '<=':
case '==':
case '!=':
case 'is':
case '>=':
case '>':
_flag=true}
if(_flag){switch(op){case '<':
case '<=':
case '==':
case '!=':
case 'is':
case '>=':
case '>':
var c2=repl.tree[1],
c2js=c2.to_js()
var c2_clone=new Object()
for(var attr in c2){c2_clone[attr]=c2[attr]}
var vname="$c"+chained_comp_num
c2.to_js=function(){return vname}
c2_clone.to_js=function(){return vname}
chained_comp_num++
while(repl.parent && repl.parent.type=='op'){if($op_weight[repl.parent.op]<
$op_weight[repl.op]){repl=repl.parent}else{break}}
repl.parent.tree.pop()
var and_expr=new $OpCtx(repl,'and')
and_expr.wrap={'name':vname,'js':c2js}
c2_clone.parent=and_expr
and_expr.tree.push('xxx')
var new_op=new $OpCtx(c2_clone,op)
return new $AbstractExprCtx(new_op,false)}}}
repl.parent.tree.pop()
var expr=new $ExprCtx(repl.parent,'operand',false)
expr.tree=[op1]
repl.parent=expr
var new_op=new $OpCtx(repl,op)
return new $AbstractExprCtx(new_op,false)
case 'augm_assign':
var parent=C
while(parent){if(parent.type=="assign" ||parent.type=="augm_assign"){$_SyntaxError(C,"augmented assignment inside assignment")}else if(parent.type=="op"){$_SyntaxError(C,["cannot assign to operator"])}else if(parent.type=="list_or_tuple"){$_SyntaxError(C,[`'${parent.real}' is an illegal`+
" expression for augmented assignment"])}else if(['list','tuple'].indexOf(parent.name)>-1){$_SyntaxError(C,[`'${parent.name}' is an illegal`+
" expression for augmented assignment"])}else if(['dict_or_set'].indexOf(parent.name)>-1){$_SyntaxError(C,[`'${parent.tree[0].real } display'`+
" is an illegal expression for augmented assignment"])}
parent=parent.parent}
if(C.expect==','){return new $AbstractExprCtx(
new $AugmentedAssignCtx(C,value),true)}
return $transition(C.parent,token,value)
case ":":
if(C.parent.type=="sub" ||
(C.parent.type=="list_or_tuple" &&
C.parent.parent.type=="sub")){return new $AbstractExprCtx(new $SliceCtx(C.parent),false)}else if(C.parent.type=="slice"){return $transition(C.parent,token,value)}else if(C.parent.type=="node"){
if(C.tree.length==1){var child=C.tree[0]
if(["id","sub","attribute"].indexOf(child.type)>-1){return new $AbstractExprCtx(new $AnnotationCtx(C),false)}else if(child.real=="tuple" && child.expect=="," &&
child.tree.length==1){return new $AbstractExprCtx(new $AnnotationCtx(child.tree[0]),false)}}
$_SyntaxError(C,"invalid target for annotation")}
break
case '=':
function has_parent(ctx,type){
while(ctx.parent){if(ctx.parent.type==type){return ctx.parent}
ctx=ctx.parent}
return false}
var annotation
if(C.expect==','){if(C.parent.type=="call_arg"){
if(C.tree[0].type !="id"){$_SyntaxError(C,['expression cannot contain'+
' assignment, perhaps you meant "=="?'])}
return new $AbstractExprCtx(new $KwArgCtx(C),true)}else if(annotation=has_parent(C,"annotation")){return $transition(annotation,token,value)}else if(C.parent.type=="op"){
$_SyntaxError(C,["cannot assign to operator"])}else if(C.parent.type=="not"){
$_SyntaxError(C,["cannot assign to operator"])}else if(C.parent.type=="list_or_tuple"){
for(var i=0;i < C.parent.tree.length;i++){var item=C.parent.tree[i]
if(item.type=="expr" && item.name=="operand"){$_SyntaxError(C,["cannot assign to operator"])}}}else if(C.tree.length > 0 && C.tree[0].assign){
$_SyntaxError(C,["cannot assign to named expression"])}else if(C.parent.type=="expr" &&
C.parent.name=="target list"){$_SyntaxError(C,'token '+token+' after '
+C)}else if(C.parent.type=="lambda"){if(C.parent.parent.parent.type !="node"){$_SyntaxError(C,['expression cannot contain'+
' assignment, perhaps you meant "=="?'])}}
while(C.parent !==undefined){C=C.parent
if(C.type=="condition"){$_SyntaxError(C,'token '+token+' after '
+C)}else if(C.type=="augm_assign"){$_SyntaxError(C,"assignment inside augmented assignment")}}
C=C.tree[0]
return new $AbstractExprCtx(new $AssignCtx(C),true)}
break
case ':=':
var ptype=C.parent.type
if(["node","assign","kwarg","annotation"].
indexOf(ptype)>-1){$_SyntaxError(C,':= invalid, parent '+ptype)}else if(ptype=="func_arg_id" &&
C.parent.tree.length > 0){
$_SyntaxError(C,':= invalid, parent '+ptype)}else if(ptype=="call_arg" &&
C.parent.parent.type=="call" &&
C.parent.parent.parent.type=="lambda"){
$_SyntaxError(C,':= invalid inside function arguments' )}
if(C.tree.length==1 && C.tree[0].type=="id"){var scope=$get_scope(C),name=C.tree[0].value
if(['None','True','False'].indexOf(name)>-1){$_SyntaxError(C,[`cannot use assignment expressions with ${name}`])}else if(name=='__debug__'){$_SyntaxError(C,['cannot assign to __debug__'])}
while(scope.is_comp){scope=scope.parent_block}
$bind(name,scope,C)
var parent=C.parent
parent.tree.pop()
var assign_expr=new $AbstractExprCtx(parent,false)
assign_expr.assign=C.tree[0]
return assign_expr}
$_SyntaxError(C,'token '+token+' after '+C)
case 'if':
if(C.parent.type=="comp_iterable"){break}
var in_comp=false,ctx=C.parent
while(ctx){if(ctx.type=="list_or_tuple"){
break}else if(ctx.type=='comp_for'){break}else if(ctx.type=='comp_if'){
in_comp=true
break}else if(ctx.type=='call_arg' ||ctx.type=='sub'){
break}else if(ctx.type=='expr'){if(ctx.parent.type=='comp_iterable'){
in_comp=true
break}}
ctx=ctx.parent}
if(in_comp){break}
var ctx=C
while(ctx.parent &&
(ctx.parent.type=='op' ||
ctx.parent.type=='not' ||
(ctx.parent.type=="expr" && ctx.parent.name=="operand"))){ctx=ctx.parent}
return new $AbstractExprCtx(new $TernaryCtx(ctx),true)
case 'eol':
if(C.tree.length==2 &&
C.tree[0].type=="id" &&
["print","exec"].indexOf(C.tree[0].value)>-1){$_SyntaxError(C,["Missing parentheses in call "+
"to '"+C.tree[0].value+"'."])}
if(["dict_or_set","list_or_tuple","str"].indexOf(C.parent.type)==-1){var t=C.tree[0]
if(t.type=="packed"){$pos=t.pos
$_SyntaxError(C,["can't use starred expression here"])}else if(t.type=="call" && t.func.type=="packed"){$pos=t.func.pos
$_SyntaxError(C,["can't use starred expression here"])}}}
return $transition(C.parent,token)}
$ExprCtx.prototype.to_js=function(arg){var res
this.js_processed=true
if(this.type=='list'){res='['+$to_js(this.tree)+']'}else if(this.tree.length==1){res=this.tree[0].to_js(arg)}else{res='_b_.tuple.$factory(['+$to_js(this.tree)+'])'}
if(this.is_await){res="await ($B.promise("+res+"))"}
if(this.assign){
var scope=$get_scope(this)
while(scope.is_comp){scope=scope.parent_block}
if(scope.globals && scope.globals.has(this.assign.value)){
while(scope.parent_block &&
scope.parent_block.id !=="__builtins__"){scope=scope.parent_block}}else if(scope.nonlocals &&
scope.nonlocals[this.assign.value]){
scope=scope.parent_block}
res="($locals_"+scope.id.replace(/\./g,'_')+'["'+
this.assign.value+'"] = '+res+')'}
if(this.name=="call"){
res+='()'}
return res}
var $ExprNot=$B.parser.$ExprNot=function(C){
this.type='expr_not'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$ExprNot.prototype.transition=function(token,value){var C=this
if(token=='in'){
C.parent.tree.pop()
return new $AbstractExprCtx(
new $OpCtx(C.parent,'not_in'),false)}
$_SyntaxError(C,'token '+token+' after '+C)}
$ExprNot.prototype.toString=function(){return '(expr_not)'}
var $ForExpr=$B.parser.$ForExpr=function(C){
if(C.node.parent.is_comp){
C.node.parent.first_for=this}
this.type='for'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.loop_num=$loop_num
this.scope=$get_scope(this)
if(this.scope.is_comp){}
this.module=this.scope.module
$loop_num++}
$ForExpr.prototype.toString=function(){return '(for) '+this.tree}
$ForExpr.prototype.transition=function(token,value){var C=this
switch(token){case 'in':
for(var target_expr of C.tree[0].tree){if(target_expr.tree[0].type=='id'){var id=target_expr.tree[0]
$bind(id.value,this.scope,id)}}
if(C.tree[0].tree.length==0){
$_SyntaxError(C,"missing target between 'for' and 'in'")}
return new $AbstractExprCtx(
new $ExprCtx(C,'target list',true),false)
case ':':
if(C.tree.length < 2 
||C.tree[1].tree[0].type=="abstract_expr"){$_SyntaxError(C,'token '+token+' after '+
C)}
return $BodyCtx(C)}
console.log('C',C,'tokan',token,value)
$_SyntaxError(C,'token '+token+' after '+C)}
$ForExpr.prototype.transform=function(node,rank){
var pnode=this.parent.node.parent
while(pnode){if(pnode.is_comp){var module=$get_module(this)
if(module.outermost_expr===undefined){pnode.outermost_expr=this.tree[1]
module.outermost_expr=this.tree[1]
this.tree.pop()
new $RawJSCtx(this,"expr")}
break}
pnode=pnode.parent}
if(this.async){return this.transform_async(node,rank)}
var scope=$get_scope(this),target=this.tree[0],target_is_1_tuple=target.tree.length==1 && target.expect=='id',iterable=this.tree[1],num=this.loop_num,local_ns='$locals_'+scope.id.replace(/\./g,'_'),h='\n'+' '.repeat(node.indent+4)
var $range=false
if(target.tree.length==1 &&
! scope.blurred &&
target.expct !='id' &&
iterable.type=='expr' &&
iterable.tree[0].type=='expr' &&
iterable.tree[0].tree[0].type=='call'){var call=iterable.tree[0].tree[0]
if(call.func.type=='id'){var func_name=call.func.value
if(func_name=='range' && call.tree.length < 3 &&
call.tree.length > 0){
$range=call}}}
var new_nodes=[],pos=0
var children=node.children
var offset=1
if($range){if(this.has_break){
new_node=new $Node()
new $NodeJSCtx(new_node,local_ns+'["$no_break'+num+'"] = true')
new_nodes[pos++]=new_node}
var range_is_builtin=false,_scope=$get_scope(this),found=[]
while(1){if(_scope.binding["range"]){found.push(_scope.id)}
if(_scope.parent_block){_scope=_scope.parent_block}
else{break}}
range_is_builtin=found.length==1 &&
found[0]=="__builtins__"
var test_range_node=new $Node()
test_range_node.module=node.parent.module
if(range_is_builtin){new $NodeJSCtx(test_range_node,'if(1)')}else{new $NodeJSCtx(test_range_node,'if('+call.func.to_js()+' === _b_.range)')}
new_nodes[pos++]=test_range_node
var idt=target.to_js(),shortcut=false
if($range.tree.length==1){var stop=$range.tree[0].tree[0]
if(stop.tree[0].type=="int"){stop=parseInt(stop.to_js())
if(0 < stop < $B.max_int){shortcut=true
var varname="$i"+$B.UUID()
var for_node=$NodeJS("for (var "+varname+" = 0; "+
varname+" < "+stop+"; "+varname+"++)")
var assign_node=make_assign(target,varname,node.parent.module)
for_node.add(assign_node)}}
var start=0,stop=$range.tree[0].to_js()}else{var start=$range.tree[0].to_js(),stop=$range.tree[1].to_js()}
if(!shortcut){var js='var $stop_'+num+' = $B.int_or_bool('+stop+'),'+
h+'        $next'+num+" = "+start+','+
h+'        $safe'+num+' = typeof $next'+num+
' == "number" && typeof '+'$stop_'+num+' == "number";'+
h+'    while(true)'
var for_node=new $Node()
new $NodeJSCtx(for_node,js)
for_node.add($NodeJS('if($safe'+num+' && $next'+num+
'>= $stop_'+num+'){break}'))
for_node.add($NodeJS('else if(!$safe'+num+' && $B.ge($next'+
num+', $stop_'+num+')){break}'))
var assign_node=make_assign(target,'$next'+num,node.parent.module)
for_node.add(assign_node)
for_node.add($NodeJS('if($safe'+num+'){$next'+num+
' += 1}'))
for_node.add($NodeJS('else{$next'+num+' = $B.add($next'+
num+',1)}'))}
children.forEach(function(child){for_node.add(child.clone_tree())})
if($B.last(node.children).C.tree[0].type !="return"){var js='$locals.$line_info = "'+node.line_num+
','+this.module+'";if($locals.$f_trace !== _b_.None){'+
'$B.trace_line()};_b_.None;'
for_node.add($NodeJS(js))}
var in_loop=false
if(scope.ntype=='module'){var pnode=node.parent
while(pnode){if(pnode.for_wrapper){in_loop=true;break}
pnode=pnode.parent}}
if(scope.ntype=='module' && !in_loop){var func_node=new $Node()
func_node.for_wrapper=true
js='function $f'+num+'('
if(this.has_break){js+='$no_break'+num}
js+=')'
new $NodeJSCtx(func_node,js)
test_range_node.add(func_node)
func_node.add(for_node)
if(this.has_break){func_node.add($NodeJS('return $no_break'+num))}
test_range_node.add($NodeJS('var $res'+num+' = $f'+num+
'();'))
if(this.has_break){test_range_node.add($NodeJS('var $no_break'+num+
' = $res'+num))}}else{
test_range_node.add(for_node)}
if(range_is_builtin){node.parent.children.splice(rank,1)
var k=0
if(this.has_break){node.parent.insert(rank,new_nodes[0])
k++}
new_nodes[k].children.forEach(function(child){node.parent.insert(rank+k,child)})
node.parent.children[rank].line_num=node.line_num
node.parent.children[rank].bindings=node.bindings
node.children=[]
return 0}
var else_node=$NodeJS("else")
new_nodes[pos++]=else_node
for(var i=new_nodes.length-1;i >=0;i--){node.parent.insert(rank+1,new_nodes[i])}
this.test_range=true
new_nodes=[],pos=0}
var new_node=new $Node()
new_node.line_num=$get_node(this).line_num
var it_js=iterable.to_js(),iterable_name='$iter'+num,js='var '+iterable_name+' = '+it_js+';'+
'$locals["$next'+num+'"]'+' = $B.$getattr($B.$iter('+
iterable_name+'),"__next__")'
new $NodeJSCtx(new_node,js)
new_nodes[pos++]=new_node
if(this.has_break){
new_nodes[pos++]=$NodeJS(local_ns+'["$no_break'+num+
'"] = true;')}
var while_node=new $Node()
if(this.has_break){js='while('+local_ns+'["$no_break'+num+'"])'}else{js='while(true)'}
new $NodeJSCtx(while_node,js)
while_node.C.loop_num=num 
while_node.C.type='for' 
new_nodes[pos++]=while_node
node.parent.children.splice(rank,1)
if(this.test_range){for(var i=new_nodes.length-1;i >=0;i--){else_node.insert(0,new_nodes[i])}}else{for(var i=new_nodes.length-1;i >=0;i--){node.parent.insert(rank,new_nodes[i])
offset+=new_nodes.length}}
var try_node=$NodeJS("try")
try_node.bindings=node.bindings
while_node.add(try_node)
var iter_node=new $Node()
iter_node.id=this.module
var C=new $NodeCtx(iter_node)
var target_expr=new $ExprCtx(C,'left',true)
if(target_is_1_tuple){
var t=new $ListOrTupleCtx(target_expr)
t.real='tuple'
t.tree=target.tree}else{target_expr.tree=target.tree}
var assign=new $AssignCtx(target_expr)
assign.tree[1]=new $JSCode('$locals["$next'+num+'"]()')
try_node.add(iter_node)
while_node.add(
$NodeJS('catch($err){if($B.is_exc($err, [_b_.StopIteration]))'+
'{break;}else{throw($err)}}'))
children.forEach(function(child){
while_node.add(child.clone())})
if(node.children.length==0){console.log("bizarre",this)}
if($B.last(node.children).C.tree[0].type !="return"){var js='$locals.$line_info = "'+node.line_num+
','+this.module+'";if($locals.$f_trace !== _b_.None){'+
'$B.trace_line()};_b_.None;'
while_node.add($NodeJS(js))}
node.children=[]
return 0}
$ForExpr.prototype.transform_async=function(node,rank){
var scope=$get_scope(this),target=this.tree[0],target_is_1_tuple=target.tree.length==1 && target.expect=='id',iterable=this.tree[1],num=this.loop_num,local_ns='$locals_'+scope.id.replace(/\./g,'_'),h='\n'+' '.repeat(node.indent+4)
var new_nodes=[]
var it_js=iterable.to_js(),iterable_name='$iter'+num,type_name='$type'+num,running_name='$running'+num,anext_name='$anext'+num,target_name='$target'+num,js='var '+iterable_name+' = '+it_js
new_nodes.push($NodeJS(js))
new_nodes.push($NodeJS('var '+type_name+' = _b_.type.$factory( '+
iterable_name+')'))
js=iterable_name+' = $B.$call($B.$getattr('+type_name+
', "__aiter__"))('+iterable_name+')'
new_nodes.push($NodeJS(js))
new_nodes.push($NodeJS('var '+running_name+' = true'))
new_nodes.push($NodeJS('var '+anext_name+
' = $B.$call($B.$getattr('+type_name+', "__anext__"))'))
var while_node=$NodeJS('while('+running_name+')')
new_nodes.push(while_node)
var try_node=$NodeJS('try')
while_node.add(try_node)
if(target.tree.length==1){var js=target.to_js()+' = await ($B.promise('+
anext_name+'('+iterable_name+')))'
try_node.add($NodeJS(js))}else{var new_node=new $Node(),ctx=new $NodeCtx(new_node),expr=new $ExprCtx(ctx,"left",false)
expr.tree.push(target)
target.parent=expr
var assign=new $AssignCtx(expr)
new $RawJSCtx(assign,'await ($B.promise('+
anext_name+'('+iterable_name+')))')
try_node.add(new_node)}
var catch_node=$NodeJS('catch(err)')
while_node.add(catch_node)
var js='if(err.__class__ === _b_.StopAsyncIteration)'+
'{'+running_name+' = false; continue}else{throw err}'
catch_node.add($NodeJS(js))
node.children.forEach(function(child){while_node.add(child)})
node.parent.children.splice(rank,1)
for(var i=new_nodes.length-1;i >=0;i--){node.parent.insert(rank,new_nodes[i])}
node.children=[]
return 0}
$ForExpr.prototype.to_js=function(){this.js_processed=true
var iterable=this.tree.pop()
return 'for ('+$to_js(this.tree)+' in '+iterable.to_js()+')'}
var $FromCtx=$B.parser.$FromCtx=function(C){
this.type='from'
this.parent=C
this.module=''
this.names=[]
C.tree[C.tree.length]=this
this.expect='module'
this.scope=$get_scope(this)}
$FromCtx.prototype.add_name=function(name){this.names[this.names.length]=name
if(name=='*'){this.scope.blurred=true}}
$FromCtx.prototype.bind_names=function(){
var scope=$get_scope(this)
this.names.forEach(function(name){if(Array.isArray(name)){name=name[1]}
$bind(name,scope,this)},this)}
$FromCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){C.add_name(value)
C.expect=','
return C}
if(C.expect=='alias'){C.names[C.names.length-1]=
[$B.last(C.names),value]
C.expect=','
return C}
case '.':
if(C.expect=='module'){if(token=='id'){C.module+=value}
else{C.module+='.'}
return C}
case 'import':
if(C.expect=='module'){C.expect='id'
return C}
case 'op':
if(value=='*' && C.expect=='id'
&& C.names.length==0){if($get_scope(C).ntype !=='module'){$_SyntaxError(C,["import * only allowed at module level"])}
C.add_name('*')
C.expect='eol'
return C}
case ',':
if(C.expect==','){C.expect='id'
return C}
case 'eol':
switch(C.expect){case ',':
case 'eol':
C.bind_names()
return $transition(C.parent,token)
case 'id':
$_SyntaxError(C,['trailing comma not allowed without '+
'surrounding parentheses'])
default:
$_SyntaxError(C,['invalid syntax'])}
case 'as':
if(C.expect==',' ||C.expect=='eol'){C.expect='alias'
return C}
case '(':
if(C.expect=='id'){C.expect='id'
return C}
case ')':
if(C.expect==',' ||C.expect=='id'){C.expect='eol'
return C}}
$_SyntaxError(C,'token '+token+' after '+C)}
$FromCtx.prototype.toString=function(){return '(from) '+this.module+' (import) '+this.names}
$FromCtx.prototype.to_js=function(){this.js_processed=true
var scope=$get_scope(this),module=$get_module(this),mod=module.module,res=[],pos=0,indent=$get_node(this).indent,head=' '.repeat(indent)
if(mod.startsWith("$exec")){var frame=$B.last($B.frames_stack)[1]
if(frame.module && frame.module.__name__){mod=frame.module.__name__}}
var mod_elts=this.module.split(".")
for(var i=0;i < mod_elts.length;i++){module.imports[mod_elts.slice(0,i+1).join(".")]=true}
var _mod=this.module.replace(/\$/g,''),$package,packages=[]
while(_mod.length > 0){if(_mod.charAt(0)=='.'){if($package===undefined){if($B.imported[mod]!==undefined){$package=$B.imported[mod].__package__
packages=$package.split('.')}}else{$package=$B.imported[$package]
packages.pop()}
if($package===undefined){return 'throw _b_.SystemError.$factory("Parent module \'\' '+
'not loaded, cannot perform relative import")'}else if($package=='None'){console.log('package is None !')}
_mod=_mod.substr(1)}else{break}}
if(_mod){packages.push(_mod)}
this.module=packages.join('.')
var mod_name=this.module.replace(/\$/g,'')
res[pos++]='var module = $B.$import("'
res[pos++]=mod_name+'",["'
var names=[]
for(var i=0,len=this.names.length;i < len;i++){if(Array.isArray(this.names[i])){names.push(this.names[i][0])}else{names.push(this.names[i])}}
res[pos++]=names.join('","')+'"], {'
var sep=''
for(var attr in this.aliases){res[pos++]=sep+'"'+attr+'": "'+this.aliases[attr]+'"'
sep=','}
res[pos++]='}, {}, true);'
if(this.names[0]=='*'){
scope.blurred=true
res[pos++]='\n'+head+'$B.import_all($locals, module);'}else{this.names.forEach(function(name){var alias=name
if(Array.isArray(name)){alias=name[1]
name=name[0]}
module.imports[this.module+'.'+name]=true
res[pos++]='\n'+head+'$locals["'+
alias+'"] = $B.$getattr($B.imported["'+
mod_name+'"], "'+name+'");'},this)}
res[pos++]='\n'+head+'_b_.None;'
return res.join('');}
var $FuncArgs=$B.parser.$FuncArgs=function(C){
this.type='func_args'
this.parent=C
this.tree=[]
this.names=[]
C.tree[C.tree.length]=this
this.expect='id'
this.has_default=false
this.has_star_arg=false
this.has_kw_arg=false}
$FuncArgs.prototype.toString=function(){return 'func args '+this.tree}
$FuncArgs.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.has_kw_arg){$_SyntaxError(C,'duplicate keyword argument')}
if(C.expect=='id'){C.expect=','
if(C.names.indexOf(value)>-1){$_SyntaxError(C,['duplicate argument '+value+
' in function definition'])}}
return new $FuncArgIdCtx(C,value)
case ',':
if(C.expect==','){C.expect='id'
return C}
$_SyntaxError(C,'token '+token+' after '+
C)
case ')':
var last=$B.last(C.tree)
if(last && last.type=="func_star_arg"){if(last.name=="*"){if(C.op=='*'){
$_SyntaxError(C,['named arguments must follow bare *'])}else{$_SyntaxError(C,'invalid syntax')}}}
return C.parent
case 'op':
if(C.has_kw_arg){$_SyntaxError(C,'duplicate keyword argument')}
var op=value
C.expect=','
if(op=='*'){if(C.has_star_arg){$_SyntaxError(C,'duplicate star argument')}
return new $FuncStarArgCtx(C,'*')}else if(op=='**'){return new $FuncStarArgCtx(C,'**')}else if(op=='/'){
if(C.has_end_positional){$_SyntaxError(C,['duplicate / in function parameters'])}else if(C.has_star_arg){$_SyntaxError(C,['/ after * in function parameters'])}
return new $EndOfPositionalCtx(C)}
$_SyntaxError(C,'token '+op+' after '+C)
case ':':
if(C.parent.type=="lambda"){return $transition(C.parent,token)}}
$_SyntaxError(C,'token '+token+' after '+C)}
$FuncArgs.prototype.to_js=function(){this.js_processed=true
return $to_js(this.tree)}
var $FuncArgIdCtx=$B.parser.$FuncArgIdCtx=function(C,name){
this.type='func_arg_id'
this.name=name
this.parent=C
if(C.has_star_arg){C.parent.after_star.push(name)}else{C.parent.positional_list.push(name)}
if(C.parent.type !="lambda"){var node=$get_node(this)
if(node.binding[name]){$_SyntaxError(C,["duplicate argument '"+name+"' in function definition"])}
$bind(name,node,this)}
this.tree=[]
C.tree[C.tree.length]=this
var ctx=C
while(ctx.parent !==undefined){if(ctx.type=='def'){ctx.locals.push(name)
break}
ctx=ctx.parent}
this.expect='='}
$FuncArgIdCtx.prototype.toString=function(){return 'func arg id '+this.name+'='+this.tree}
$FuncArgIdCtx.prototype.transition=function(token,value){var C=this
switch(token){case '=':
if(C.expect=='='){C.has_default=true
var def_ctx=C.parent.parent
if(C.parent.has_star_arg){def_ctx.default_list.push(def_ctx.after_star.pop())}else{def_ctx.default_list.push(def_ctx.positional_list.pop())}
return new $AbstractExprCtx(C,false)}
break
case ',':
case ')':
if(C.parent.has_default && C.tree.length==0 &&
C.parent.has_star_arg===undefined){$pos-=C.name.length
$_SyntaxError(C,['non-default argument follows default argument'])}else{return $transition(C.parent,token)}
case ':':
if(C.parent.parent.type=="lambda"){
return $transition(C.parent.parent,":")}
if(C.has_default){
$_SyntaxError(C,'token '+token+' after '+
C)}
return new $AbstractExprCtx(new $AnnotationCtx(C),false)}
$_SyntaxError(C,'token '+token+' after '+C)}
$FuncArgIdCtx.prototype.to_js=function(){this.js_processed=true
return this.name+$to_js(this.tree)}
var $FuncStarArgCtx=$B.parser.$FuncStarArgCtx=function(C,op){
this.type='func_star_arg'
this.op=op
this.parent=C
this.node=$get_node(this)
C.has_star_arg=op=='*'
C.has_kw_arg=op=='**'
C.tree[C.tree.length]=this}
$FuncStarArgCtx.prototype.toString=function(){return '(func star arg '+this.op+') '+this.name}
$FuncStarArgCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.name===undefined){if(C.parent.names.indexOf(value)>-1){$_SyntaxError(C,['duplicate argument '+value+
' in function definition'])}}
C.set_name(value)
C.parent.names.push(value)
return C
case ',':
case ')':
if(C.name===undefined){
C.set_name('*')
C.parent.names.push('*')}
return $transition(C.parent,token)
case ':':
if(C.parent.parent.type=="lambda"){
return $transition(C.parent.parent,":")}
if(C.name===undefined){$_SyntaxError(C,'annotation on an unnamed parameter')}
return new $AbstractExprCtx(
new $AnnotationCtx(C),false)}
$_SyntaxError(C,'token '+token+' after '+C)}
$FuncStarArgCtx.prototype.set_name=function(name){this.name=name
if(this.parent.parent.type !="lambda"){if(this.node.binding[name]){$_SyntaxError(C,["duplicate argument '"+name+"' in function definition"])}
$bind(name,this.node,this)}
var ctx=this.parent
while(ctx.parent !==undefined){if(ctx.type=='def'){ctx.locals.push(name)
break}
ctx=ctx.parent}
if(this.op=='*'){ctx.other_args='"'+name+'"'}
else{ctx.other_kw='"'+name+'"'}}
var $GlobalCtx=$B.parser.$GlobalCtx=function(C){
this.type='global'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.expect='id'
this.scope=$get_scope(this)
this.scope.globals=this.scope.globals ||new Set()
this.module=$get_module(this)
while(this.module.module !=this.module.id){this.module=this.module.parent_block}
this.module.binding=this.module.binding ||{}
this.$pos=$pos}
$GlobalCtx.prototype.toString=function(){return 'global '+this.tree}
$GlobalCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){new $IdCtx(C,value)
C.add(value)
C.expect=','
return C}
break
case ',':
if(C.expect==','){C.expect='id'
return C}
break
case 'eol':
if(C.expect==','){return $transition(C.parent,token)}
break}
$_SyntaxError(C,'token '+token+' after '+C)}
$GlobalCtx.prototype.add=function(name){if(this.scope.annotations && this.scope.annotations.has(name)){$_SyntaxError(this,["annotated name '"+name+
"' can't be global"])}
if(this.scope.type=="module"){
return}
if(this.scope.binding && this.scope.binding[name]){console.log('error globals, scope',this.scope)
$pos=this.$pos-1
$_SyntaxError(this,[`name '${name}' is parameter and global`])}
this.scope.globals.add(name)
var mod=this.scope.parent_block
if(this.module.module.startsWith("$exec")){while(mod && mod.parent_block !==this.module){
mod._globals=mod._globals ||{}
mod._globals[name]=this.module.id
delete mod.binding[name]
mod=mod.parent_block}}
this.module.binding[name]=true}
$GlobalCtx.prototype.to_js=function(){this.js_processed=true
return ''}
var $IdCtx=$B.parser.$IdCtx=function(C,value){
this.type='id'
this.value=$mangle(value,C)
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
var scope=this.scope=$get_scope(this)
this.blurred_scope=this.scope.blurred
this.env=clone(this.scope.binding)
if(["def","generator"].indexOf(scope.ntype)>-1){scope.referenced=scope.referenced ||{}
if(! $B.builtins[this.value]){scope.referenced[this.value]=true}}
if(C.parent.type=='call_arg'){this.call_arg=true}
var ctx=C
while(ctx.parent !==undefined){switch(ctx.type){case 'ctx_manager_alias':
$bind(value,scope,this)
break
case 'list_or_tuple':
case 'dict_or_set':
case 'call_arg':
case 'def':
case 'lambda':
if(ctx.vars===undefined){ctx.vars=[value]}
else if(ctx.vars.indexOf(value)==-1){ctx.vars.push(value)}
if(this.call_arg&&ctx.type=='lambda'){if(ctx.locals===undefined){ctx.locals=[value]}
else{ctx.locals.push(value)}}}
ctx=ctx.parent}
if($parent_match(C,{type:'target_list'})){
this.no_bindings=true
this.bound=true}
if(["def","generator"].indexOf(scope.ntype)>-1){
var _ctx=this.parent
while(_ctx){if(_ctx.type=='list_or_tuple' && _ctx.is_comp()){this.in_comp=true
break}
_ctx=_ctx.parent}
if(C.type=='expr' && C.parent.type=='comp_if'){}else if(C.type=='global'){if(scope.globals===undefined){scope.globals=new Set([value])}else{scope.globals.add(value)}}}}
$IdCtx.prototype.toString=function(){return '(id) '+this.value+':'+(this.tree ||'')}
$IdCtx.prototype.transition=function(token,value){var C=this
if(C.value=='$$case' && C.parent.parent.type=="node"){
var start=C.parent.$pos,src=$get_module(this).src
if(line_ends_with_comma(src.substr(start))){return $transition(new $PatternCtx(
new $CaseCtx(C.parent.parent)),token,value)}}else if(C.value=='match' && C.parent.parent.type=="node"){
var start=C.parent.$pos,src=$get_module(this).src
if(line_ends_with_comma(src.substr(start))){return $transition(new $AbstractExprCtx(
new $MatchCtx(C.parent.parent),true),token,value)}}
switch(token){case '=':
if(C.parent.type=='expr' &&
C.parent.parent !==undefined &&
C.parent.parent.type=='call_arg'){return new $AbstractExprCtx(
new $KwArgCtx(C.parent),false)}
return $transition(C.parent,token,value)
case '.':
delete this.bound
return $transition(C.parent,token,value)
case 'op':
return $transition(C.parent,token,value)
case 'id':
case 'str':
case 'int':
case 'float':
case 'imaginary':
if(["print","exec"].indexOf(C.value)>-1 ){$_SyntaxError(C,["missing parenthesis in call to '"+
C.value+"'"])}
$_SyntaxError(C,'token '+token+' after '+
C)}
if(this.parent.parent.type=="packed"){if(['.','[','('].indexOf(token)==-1){return this.parent.parent.transition(token,value)}}
return $transition(C.parent,token,value)}
$IdCtx.prototype.firstBindingScopeId=function(){
var scope=this.scope,found=[],nb=0
while(scope){if(scope.globals && scope.globals.has(this.value)){return $get_module(this).id}
if(scope.binding && scope.binding[this.value]){return scope.id}
scope=scope.parent}}
$IdCtx.prototype.boundBefore=function(scope){
function test(node,name){if(node.bindings && node.bindings[name]){
var ctx=node.C.tree[0]
if(['def','generator'].indexOf(ctx.type)>-1 &&
ctx.locals.indexOf(name)>-1){return false}
return true}}
var node=$get_node(this),found=false
var $test=false 
if($test){console.log(this.value,"bound before")
console.log("node",node)}
while(!found && node.parent){var pnode=node.parent
if(test(pnode,this.value)){if($test){console.log("bound in",pnode)}
return pnode.bindings[this.value]}
for(var i=0;i < pnode.children.length;i++){var child=pnode.children[i]
if(child===node){break}
if(test(child,this.value)){if($test){console.log("bound in child",child)}
return child.bindings[this.value]}}
if(pnode===scope){break}
node=pnode}
return found}
$IdCtx.prototype.bindingType=function(scope){
var nb=0,node=$get_node(this),found=false,unknown,ix
while(!found && node.parent && nb++< 100){var pnode=node.parent
if(pnode.bindings && pnode.bindings[this.value]){return pnode.bindings[this.value]}
for(var i=0;i < pnode.children.length;i++){var child=pnode.children[i]
if(child===node){break}
if(child.bindings && child.bindings[this.value]){found=child.bindings[this.value]
ix=i}}
if(found){for(var j=ix+1;j < pnode.children.length;j++){child=pnode.children[j]
if(child.children.length > 0){unknown=true
break}else if(child===node){break}}
return unknown ||found}
if(pnode===scope){break}
node=pnode}
return found}
$IdCtx.prototype.to_js=function(arg){
if(this.result !==undefined && this.scope.ntype=='generator'){return this.result}
var val=this.value
var $test=false 
if($test){console.log("ENTER IdCtx.py2js line",$get_node(this).line_num,"this",this)}
if(val=='__BRYTHON__' ||val=='$B'){return val}
if(val.startsWith("comp_result_"+$B.lambda_magic)){if(this.bound){return "var "+val}
return val}
this.js_processed=true
if(this.scope._globals && this.scope._globals[val]){this.global_module=this.scope._globals[val]}
if(this.global_module){if(this.bound){return '$locals_'+this.global_module.replace(/\./g,"_")+
'["'+val+'"]'}else{return '$B.$check_def_global("'+val+'", $locals_'+
this.global_module.replace(/\./g,"_")+')'}}
var is_local=this.scope.binding[val]!==undefined,this_node=$get_node(this),bound_before=this_node.bound_before
this.nonlocal=this.scope.nonlocals &&
this.scope.nonlocals[val]!==undefined
this.unbound=this.unbound ||(is_local && !this.bound &&
bound_before && bound_before.indexOf(val)==-1)
if((!this.bound)&& this.scope.C
&& this.scope.ntype=='class' &&
this.scope.C.tree[0].name==val){
return '$B.$search("'+val+'")'}
if(this.unbound && !this.nonlocal){if(this.scope.ntype=='def' ||this.scope.ntype=='generator'){return '$B.$local_search("'+val+'")'}else{return '$B.$search("'+val+'")'}}
var innermost=$get_scope(this),scope=innermost,found=[]
if($test){console.log("innermost",innermost)}
var search_ids=['"'+innermost.id+'"']
var gs=innermost
while(true){if($test){console.log(gs.id,gs)}
if(gs.parent_block){if(gs.parent_block==$B.builtins_scope){break}else if(gs.parent_block.id===undefined){break}
gs=gs.parent_block}
if(innermost.ntype !="class" ||gs.parent_block===$B.builtins_scope){search_ids.push('"'+gs.id+'"')}}
search_ids="["+search_ids.join(", ")+"]"
if(innermost.globals && innermost.globals.has(val)){search_ids=['"'+gs.id+'"']
innermost=gs}
if($test){console.log("search ids",search_ids)}
if(this.nonlocal ||this.bound){var bscope=this.firstBindingScopeId()
if($test){console.log("binding",bscope)}
if(bscope !==undefined){return "$locals_"+bscope.replace(/\./g,"_")+'["'+
val+'"]'}else if(this.bound){return "$locals_"+innermost.id.replace(/\./g,"_")+
'["'+val+'"]'}}
var global_ns='$locals_'+gs.id.replace(/\./g,'_')
while(1){if(scope.globals !==undefined &&
scope.globals.has(val)){if($test){console.log("in globals of",scope.id,'globals',gs)}
if(this.boundBefore(gs)){if($test){console.log("bound before in gs",gs,global_ns)}
return global_ns+'["'+val+'"]'}else{if($test){console.log("use global search",this)}
if(this.augm_assign){return global_ns+'["'+val+'"]'}else{return '$B.$check_def("'+val+'", '+global_ns+
'["'+val+'"])'}}}
if($test){console.log("scope",scope.id,scope,"innermost",innermost,"scope is innermost",scope===innermost,"bound_before",bound_before,"found",found.slice())}
if(scope===innermost){
if(bound_before){if(bound_before.indexOf(val)>-1){found.push(scope)}else if(scope.C &&
scope.C.tree[0].type=='def' &&
scope.C.tree[0].env.indexOf(val)>-1){found.push(scope)}}else{if(scope.binding[val]){if($test){console.log(val,'in bindings of',scope.id,this_node.locals[val])}
if(this_node.locals[val]===undefined){
if(!scope.is_comp &&
(!scope.parent_block ||
!scope.parent_block.is_comp)){
found.push(scope)}}else{found.push(scope)
break}
if($test){console.log(val,"found in",scope.id)}}}}else{if(scope.binding===undefined){console.log("scope",scope,val,"no binding",innermost)}
if(innermost.binding[val]&& innermost.ntype=="class"){
if(scope.binding[val]&&
(! scope.parent_block ||
scope.parent_block.id=="__builtins__")){found.push(scope)}}else if(scope.binding[val]){found.push(scope)}}
if(scope.parent_block){scope=scope.parent_block}else{break}}
this.found=found
if($test){console.log(val,"found",found)
found.forEach(function(item){console.log(item.id)})}
if(this.nonlocal && found[0]===innermost){found.shift()}
if(found.length > 0){
if(found[0].C && found[0]===innermost
&& val.charAt(0)!='$'){var locs=this_node.locals ||{},nonlocs=innermost.nonlocals
try{if(locs[val]===undefined &&
! this.augm_assign &&
((innermost.type !='def' ||
innermost.type !='generator')&&
innermost.ntype !='class' &&
innermost.C.tree[0].args &&
innermost.C.tree[0].args.indexOf(val)==-1)&&
(nonlocs===undefined ||nonlocs[val]===undefined)){if($test){console.log("$local search",val,"found",found,"innermost",innermost,"this",this)}
this.result='$B.$local_search("'+val+'")'
return this.result}}catch(err){console.log("error",val,innermost)
throw err}}
if(found.length > 1 && found[0].C){if(found[0].C.tree[0].type=='class'){var ns0='$locals_'+found[0].id.replace(/\./g,'_'),ns1='$locals_'+found[1].id.replace(/\./g,'_'),res
if(bound_before){if(bound_before.indexOf(val)>-1){this.found=found[0].binding[val]
res=ns0}else{this.found=found[1].binding[val]
res=ns1}
this.result=res+'["'+val+'"]'
return this.result}else{this.found=false
var res=ns0+'["'+val+'"] !== undefined ? '
res+=ns0+'["'+val+'"] : '
this.result="("+res+ns1+'["'+val+'"])'
return this.result}}}
var scope=found[0]
this.found=scope.binding[val]
var scope_ns='$locals_'+scope.id.replace(/\./g,'_')
if(scope.C===undefined){if($test){console.log("module level",scope.id,scope.module)}
if(scope.id=='__builtins__'){if(gs.blurred){
val='('+global_ns+'["'+val+'"] || _b_.'+val+')'}else{
val='_b_.'+val
this.is_builtin=true}}else{
if($test){console.log("name found at module level")}
if(this.bound ||this.augm_assign){
val=scope_ns+'["'+val+'"]'}else{if(scope===innermost && this.env[val]===undefined){
this.result='$B.$search("'+val+'")'
return this.result}else{if($test){console.log("boudn before ?",scope,this.boundBefore(scope))}
if(this.boundBefore(scope)){
val=scope_ns+'["'+val+'"]'}else{
if($test){console.log("use check def",scope)}
val='$B.$check_def("'+val+'",'+
scope_ns+'["'+val+'"])'}}}}}else if(scope===innermost){if($test){console.log("scope is innermost",scope.id)}
if(scope.globals && scope.globals.has(val)){val=global_ns+'["'+val+'"]'}else if(!this.bound && !this.augm_assign){
if(this.boundBefore(scope)){val='$locals["'+val+'"]'}else{val='$B.$check_def_local("'+val+'",$locals["'+
val+'"])'}}else{val='$locals["'+val+'"]'}}else if(!this.augm_assign){
val='$B.$check_def_free("'+val+'",'+scope_ns+
'["'+val+'"])'}else{val=scope_ns+'["'+val+'"]'}
this.result=val+$to_js(this.tree,'')
return this.result}else{
this.unknown_binding=true
this.result='$B.$global_search("'+val+'", '+search_ids+')'
return this.result}}
var $ImportCtx=$B.parser.$ImportCtx=function(C){
this.type='import'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.expect='id'}
$ImportCtx.prototype.toString=function(){return 'import '+this.tree}
$ImportCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){new $ImportedModuleCtx(C,value)
C.expect=','
return C}
if(C.expect=='qual'){C.expect=','
C.tree[C.tree.length-1].name+=
'.'+value
C.tree[C.tree.length-1].alias+=
'.'+value
return C}
if(C.expect=='alias'){C.expect=','
C.tree[C.tree.length-1].alias=
value
return C}
break
case '.':
if(C.expect==','){C.expect='qual'
return C}
break
case ',':
if(C.expect==','){C.expect='id'
return C}
break
case 'as':
if(C.expect==','){C.expect='alias'
return C}
break
case 'eol':
if(C.expect==','){C.bind_names()
return $transition(C.parent,token)}
break}
$_SyntaxError(C,'token '+token+' after '+C)}
$ImportCtx.prototype.bind_names=function(){
var scope=$get_scope(this)
this.tree.forEach(function(item){if(item.name==item.alias){var name=item.name,parts=name.split('.'),bound=name
if(parts.length>1){bound=parts[0]}}else{bound=item.alias}
$bind(bound,scope,this)},this)}
$ImportCtx.prototype.to_js=function(){this.js_processed=true
var scope=$get_scope(this),res=[],module=$get_module(this)
this.tree.forEach(function(item){var mod_name=item.name,aliases=(item.name==item.alias)?
'{}' :('{"'+mod_name+'" : "'+
item.alias+'"}'),localns='$locals_'+scope.id.replace(/\./g,'_'),mod_elts=item.name.split(".")
for(var i=0;i < mod_elts.length;i++){module.imports[mod_elts.slice(0,i+1).join(".")]=true}
var js='$B.$import("'+mod_name+'", [],'+aliases+
','+localns+', true);'
res.push(js)})
return res.join('')+'_b_.None;'}
var $ImportedModuleCtx=$B.parser.$ImportedModuleCtx=function(C,name){this.type='imported module'
this.parent=C
this.name=name
this.alias=name
C.tree[C.tree.length]=this}
$ImportedModuleCtx.prototype.toString=function(){return ' (imported module) '+this.name}
$ImportedModuleCtx.prototype.transition=function(token,value){var C=this}
$ImportedModuleCtx.prototype.to_js=function(){this.js_processed=true
return '"'+this.name+'"'}
var $JSCode=$B.parser.$JSCode=function(js){this.js=js}
$JSCode.prototype.toString=function(){return this.js}
$JSCode.prototype.transition=function(token,value){var C=this}
$JSCode.prototype.to_js=function(){this.js_processed=true
return this.js}
var $KwArgCtx=$B.parser.$KwArgCtx=function(C){
this.type='kwarg'
this.parent=C.parent
this.tree=[C.tree[0]]
C.parent.tree.pop()
C.parent.tree.push(this)
C.parent.parent.has_kw=true
var value=this.tree[0].value
var ctx=C.parent.parent 
if(ctx.kwargs===undefined){ctx.kwargs=[value]}
else if(ctx.kwargs.indexOf(value)==-1){ctx.kwargs.push(value)}
else{$_SyntaxError(C,['keyword argument repeated'])}}
$KwArgCtx.prototype.toString=function(){return 'kwarg '+this.tree[0]+'='+this.tree[1]}
$KwArgCtx.prototype.transition=function(token,value){var C=this
if(token==','){return new $CallArgCtx(C.parent.parent)}
return $transition(C.parent,token)}
$KwArgCtx.prototype.to_js=function(){this.js_processed=true
var key=this.tree[0].value
if(key.substr(0,2)=='$$'){key=key.substr(2)}
var res='{$nat:"kw",name:"'+key+'",'
return res+'value:'+
$to_js(this.tree.slice(1,this.tree.length))+'}'}
var $LambdaCtx=$B.parser.$LambdaCtx=function(C){
this.type='lambda'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.args_start=$pos+6
this.vars=[]
this.locals=[]
this.node=$get_node(this)
this.positional_list=[]
this.default_list=[]
this.other_args=null
this.other_kw=null
this.after_star=[]}
$LambdaCtx.prototype.toString=function(){return '(lambda) '+this.args_start+' '+this.body_start}
$LambdaCtx.prototype.transition=function(token,value){var C=this
if(token==':' && C.args===undefined){C.args=C.tree
C.tree=[]
C.body_start=$pos
return new $AbstractExprCtx(C,false)}
if(C.args !==undefined){
C.body_end=$pos
return $transition(C.parent,token)}
if(C.args===undefined && token !="("){return $transition(new $FuncArgs(C),token,value)}
$_SyntaxError(C,'token '+token+' after '+C)}
$LambdaCtx.prototype.to_js=function(){this.js_processed=true
var C=this.parent,node=this.node,module=$get_module(this),src=$get_src(C),args=src.substring(this.args_start,this.body_start),body=src.substring(this.body_start+1,this.body_end)
body=body.replace(/\\\n/g,' ')
var scope=$get_scope(this)
var rand=$B.UUID(),func_name='lambda_'+$B.lambda_magic+'_'+rand,py='def '+func_name+'('+args+'):\n'
py+='    return ('+body+'\n)'
var lambda_name='lambda'+rand,module_name=module.id.replace(/\./g,'_')
node.line_num--
var root=$B.py2js(py,module_name,lambda_name,scope,node.line_num)
var js=root.to_js()
var params=`$locals_${lambda_name}`,args="{}"
if(module.is_comp){
params+=`, $locals_${module.id.replace(/\./g, '_')}`
args+=`, typeof $locals_${module.id.replace(/\./g, '_')} `+
` === "undefined" ? {} : $locals_${module.id.replace(/\./g, '_')}`}
js=`(function(${params}){\n`+js+
`\nreturn $locals.${func_name}})(${args})`
$B.clear_ns(lambda_name)
$B.$py_src[lambda_name]=null
delete $B.$py_src[lambda_name]
return js}
var $ListOrTupleCtx=$B.parser.$ListOrTupleCtx=function(C,real){
this.type='list_or_tuple'
this.start=$pos
this.real=real
this.expect='id'
this.closed=false
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$ListOrTupleCtx.prototype.toString=function(){switch(this.real){case 'list':
return '(list) ['+this.tree+']'
case 'list_comp':
case 'gen_expr':
return '('+this.real+') ['+this.intervals+'-'+
this.tree+']'
default:
return '(tuple) ('+this.tree+')'}}
$ListOrTupleCtx.prototype.transition=function(token,value){var C=this
if(C.closed){if(token=='['){return new $AbstractExprCtx(
new $SubCtx(C.parent),false)}
if(token=='('){return new $CallCtx(C.parent)}
return $transition(C.parent,token,value)}else{if(C.expect==','){switch(C.real){case 'tuple':
case 'gen_expr':
if(token==')'){var close=true
while(C.type=="list_or_tuple" &&
C.real=="tuple" &&
C.parent.type=="expr" &&
C.parent.parent.type=="node" &&
C.tree.length==1){
close=false
var node=C.parent.parent,ix=node.tree.indexOf(C.parent),expr=C.tree[0]
expr.parent=node
expr.$in_parens=true 
node.tree.splice(ix,1,expr)
C=expr.tree[0]}
if(close){C.close()}
if(C.real=='gen_expr'){
if(C.expression.yields){for(const _yield of C.expression.yields){$pos=_yield[1]
$_SyntaxError(C,["'yield' inside generator expression"])}}
C.intervals.push($pos)}
if(C.parent.type=="packed"){return C.parent.parent}
if(C.parent.type=="abstract_expr" &&
C.parent.assign){
C.parent.parent.tree.pop()
var expr=new $ExprCtx(C.parent.parent,"assign",false)
expr.tree=C.parent.tree
expr.tree[0].parent=expr
expr.assign=C.parent.assign
return expr}
return C.parent}
break
case 'list':
case 'list_comp':
if(token==']'){C.close()
if(C.real=='list_comp'){
if(C.expression.yields){for(const _yield of C.expression.yields){$pos=_yield[1]
$_SyntaxError(C,["'yield' inside list comprehension"])}}
C.intervals.push($pos)}
if(C.parent.type=="packed"){if(C.parent.tree.length > 0){return C.parent.tree[0]}else{return C.parent.parent}}
return C.parent}
break
case 'dict_or_set_comp':
if(token=='}'){
if(C.expression.yields){for(const _yield of C.expression.yields){$pos=_yield[1]
var comp_type=C.parent.real=="set_comp" ?
"set" :"dict"
$_SyntaxError(C,[`'yield' inside ${comp_type} comprehension`])}}
C.intervals.push($pos)
return $transition(C.parent,token)}
break}
switch(token){case ',':
if(C.real=='tuple'){C.has_comma=true}
C.expect='id'
return C
case 'for':
if(C.real=='list'){if(this.tree.length > 1){
$_SyntaxError(C,"unparenthesized "+
"expression before 'for'")}
C.real='list_comp'}
else{C.real='gen_expr'}
C.intervals=[C.start+1]
C.expression=C.tree
if(C.yields){C.expression.yields=C.yields
delete C.yields}
C.tree=[]
var comp=new $ComprehensionCtx(C)
return new $TargetListCtx(new $CompForCtx(comp))}
return $transition(C.parent,token,value)}else if(C.expect=='id'){switch(C.real){case 'tuple':
if(token==')'){C.close()
return C.parent}
if(token=='eol' && C.implicit===true){C.close()
return $transition(C.parent,token)}
break
case 'gen_expr':
if(token==')'){C.close()
return $transition(C.parent,token)}
break
case 'list':
if(token==']'){C.close()
return C}
break}
switch(token){case '=':
if(C.real=='tuple' &&
C.implicit===true){C.close()
C.parent.tree.pop()
var expr=new $ExprCtx(C.parent,'tuple',false)
expr.tree=[C]
C.parent=expr
return $transition(C.parent,token)}
$_SyntaxError(C,'unexpected = inside list')
break
case ')':
break
case ']':
if(C.real=='tuple' &&
C.implicit===true){
return $transition(C.parent,token,value)}else{break}
case ',':
$_SyntaxError(C,'unexpected comma inside list')
default:
C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)}}else{return $transition(C.parent,token,value)}}}
$ListOrTupleCtx.prototype.close=function(){this.closed=true
for(var i=0,len=this.tree.length;i < len;i++){
var elt=this.tree[i]
if(elt.type=="expr" &&
elt.tree[0].type=="list_or_tuple" &&
elt.tree[0].real=="tuple" &&
elt.tree[0].tree.length==1 &&
elt.tree[0].expect==","){this.tree[i]=elt.tree[0].tree[0]
this.tree[i].parent=this}}}
$ListOrTupleCtx.prototype.is_comp=function(){switch(this.real){case 'list_comp':
case 'gen_expr':
case 'dict_or_set_comp':
return true}
return false}
$ListOrTupleCtx.prototype.get_src=function(){
var src=$get_module(this).src
var scope=$get_scope(this)
if(scope.comments===undefined){return src}
scope.comments.forEach(function(comment){var start=comment[0],len=comment[1]
src=src.substr(0,start)+' '.repeat(len+1)+
src.substr(start+len+1)})
return src}
$ListOrTupleCtx.prototype.bind_ids=function(scope){
this.tree.forEach(function(item){if(item.type=='id'){$bind(item.value,scope,this)
item.bound=true}else if(item.type=='expr' && item.tree[0].type=="id"){$bind(item.tree[0].value,scope,this)
item.tree[0].bound=true}else if(item.type=='expr' && item.tree[0].type=="packed"){var ctx=item.tree[0].tree[0]
if(ctx.type=='expr' && ctx.tree[0].type=='id'){$bind(ctx.tree[0].value,scope,this)
ctx.tree[0].bound=true}}else if(item.type=='list_or_tuple' ||
(item.type=="expr" &&
item.tree[0].type=='list_or_tuple')){if(item.type=="expr"){item=item.tree[0]}
item.bind_ids(scope)}},this)}
$ListOrTupleCtx.prototype.packed_indices=function(){var ixs=[]
for(var i=0;i < this.tree.length;i++){var t=this.tree[i]
if(t.type=="expr"){t=t.tree[0]
if(t.type=="packed" ||
(t.type=="call" && t.func.type=="packed")){ixs.push(i)}}}
return ixs}
$ListOrTupleCtx.prototype.unpack=function(packed){var js="",res
for(var i=0;i < this.tree.length;i++){if(packed.indexOf(i)>-1){res="_b_.list.$factory("+this.tree[i].to_js()+")"}else{res="["+this.tree[i].to_js()+"]"}
if(i > 0){res=".concat("+res+")"}
js+=res}
return js}
$ListOrTupleCtx.prototype.to_js=function(){this.js_processed=true
var scope=$get_scope(this),sc=scope,scope_id=scope.id.replace(/\//g,'_'),pos=0
var root=$get_module(this),module_name=root.module
switch(this.real){case 'list':
var packed=this.packed_indices()
if(packed.length > 0){return '$B.$list('+this.unpack(packed)+')'}
return '$B.$list(['+$to_js(this.tree)+'])'
case 'list_comp':
case 'gen_expr':
case 'dict_or_set_comp':
var src=this.get_src()
var res1=[],items=[]
var qesc=new RegExp('"',"g")
var comments=root.comments
for(var i=1;i < this.intervals.length;i++){var start=this.intervals[i-1],end=this.intervals[i],txt=src.substring(start,end)
for(var j=comments.length-1;j >=0;j--){var comment=comments[j]
if(comment[0]> start && comment[0]< end){
var pos=comment[0]-start
txt=txt.substr(0,pos)+
' '.repeat(comment[1])+
txt.substr(pos+comment[1]+1)}}
txt=txt.replace(/\\\n/g," ")
items.push(txt)
var lines=txt.split('\n')
var res2=[]
lines.forEach(function(txt){
if(txt.replace(/ /g,'').length !=0){txt=txt.replace(/\n/g,' ')
txt=txt.replace(/\\/g,'\\\\')
txt=txt.replace(qesc,'\\"')
res2.push('"'+txt+'"')}})
res1.push('['+res2.join(',')+']')}
var line_num=$get_node(this).line_num
switch(this.real){case 'list_comp':
var lc=$B.$list_comp(items),
py=lc[0],ix=lc[1],listcomp_name='comp_result_'+$B.lambda_magic+ix,save_pos=$pos,line_info=line_num+','+module_name
var root=$B.py2js(
{src:py,is_comp:true,line_info:line_info},module_name,listcomp_name,scope,1)
var has_yield=root.yields_func_check !==undefined
var outermost_expr=root.outermost_expr
if($get_node(this).has_yield){outermost_expr=this.tree[0].tree[0].tree[1]}
if(outermost_expr===undefined){outermost_expr=root.first_for.tree[1]}
var outer_most=outermost_expr.to_js()
$pos=save_pos
var js=root.to_js()
root=null
$B.clear_ns(listcomp_name)
delete $B.$py_src[listcomp_name]
js+='return '+listcomp_name
js="function"+(has_yield ? "*" :"")+
`(expr){${js}})(${outer_most})`
if(this.is_await){js='async '+js}
return '('+js
case 'dict_or_set_comp':
if(this.expression.length==1){return $B.$gen_expr(module_name,scope,items,line_num,true)}
return $B.$dict_comp(module_name,scope,items,line_num)}
return $B.$gen_expr(module_name,scope,items,line_num)
case 'tuple':
var packed=this.packed_indices()
if(packed.length > 0){return '$B.fast_tuple('+this.unpack(packed)+')'}
if(this.tree.length==1 && this.has_comma===undefined){return this.tree[0].to_js()}
return '$B.fast_tuple(['+$to_js(this.tree)+'])'}}
var $MatchCtx=$B.parser.$MatchCtx=function(node_ctx){
this.type="match"
node_ctx.tree=[this]
node_ctx.node.is_match=true
this.parent=node_ctx
this.tree=[]
this.expect='as'}
$MatchCtx.prototype.transition=function(token,value){var C=this
console.log('transition on match',token,value)
switch(token){case 'as':
return new $AbstractExprCtx(new $AliasCtx(C))
case ':':
switch(C.expect){case 'id':
case 'as':
case ':':
return $BodyCtx(C)}
break}}
$MatchCtx.prototype.to_js=function(){return 'var subject = '+$to_js(this.tree)+';if(true)'}
var $NodeCtx=$B.parser.$NodeCtx=function(node){
this.node=node
node.C=this
this.tree=[]
this.type='node'
var scope=null
var tree_node=node
while(tree_node.parent && tree_node.parent.type !='module'){var ntype=tree_node.parent.C.tree[0].type,_break_flag=false
switch(ntype){case 'def':
case 'class':
case 'generator':
scope=tree_node.parent
_break_flag=true}
if(_break_flag){break}
tree_node=tree_node.parent}
if(scope===null){scope=tree_node.parent ||tree_node }
this.node.locals=clone(scope.binding)
this.scope=scope}
$NodeCtx.prototype.toString=function(){return 'node '+this.tree}
$NodeCtx.prototype.transition=function(token,value){var C=this
if(this.node.parent && this.node.parent.C){var pctx=this.node.parent.C
if(pctx.tree && pctx.tree.length==1 &&
pctx.tree[0].type=="match"){if(token !='eol' &&(token !=='id' ||value !=='$$case')){C.$pos=$pos
$_SyntaxError(C,'line does not start with "case"')}}}
switch(token){case ',':
if(C.tree && C.tree.length==0){$_SyntaxError(C,'token '+token+' after '+C)}
var first=C.tree[0]
C.tree=[]
var implicit_tuple=new $ListOrTupleCtx(C)
implicit_tuple.real="tuple"
implicit_tuple.implicit=0
implicit_tuple.tree.push(first)
first.parent=implicit_tuple
return implicit_tuple
case '[':
case '(':
case '{':
case '.':
case 'bytes':
case 'float':
case 'id':
case 'imaginary':
case 'int':
case 'str':
case 'not':
case 'lambda':
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,value)
case 'assert':
return new $AbstractExprCtx(
new $AssertCtx(C),false,true)
case 'async':
return new $AsyncCtx(C)
case 'await':
return new $AbstractExprCtx(new $AwaitCtx(C),true)
case 'break':
return new $BreakCtx(C)
case 'class':
return new $ClassCtx(C)
case 'continue':
return new $ContinueCtx(C)
case '__debugger__':
return new $DebuggerCtx(C)
case 'def':
return new $DefCtx(C)
case 'del':
return new $AbstractExprCtx(new $DelCtx(C),true)
case 'elif':
var previous=$previous(C)
if(['condition'].indexOf(previous.type)==-1 ||
previous.token=='while'){$_SyntaxError(C,'elif after '+previous.type)}
return new $AbstractExprCtx(
new $ConditionCtx(C,token),false)
case 'ellipsis':
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,value)
case 'else':
var previous=$previous(C)
if(['condition','except','for'].
indexOf(previous.type)==-1){$_SyntaxError(C,'else after '+previous.type)}
return new $SingleKwCtx(C,token)
case 'except':
var previous=$previous(C)
if(['try','except'].indexOf(previous.type)==-1){$_SyntaxError(C,'except after '+previous.type)}
return new $ExceptCtx(C)
case 'finally':
var previous=$previous(C)
if(['try','except'].indexOf(previous.type)==-1 &&
(previous.type !='single_kw' ||
previous.token !='else')){$_SyntaxError(C,'finally after '+previous.type)}
return new $SingleKwCtx(C,token)
case 'for':
return new $TargetListCtx(new $ForExpr(C))
case 'from':
return new $FromCtx(C)
case 'global':
return new $GlobalCtx(C)
case 'if':
case 'while':
return new $AbstractExprCtx(
new $ConditionCtx(C,token),false)
case 'import':
return new $ImportCtx(C)
case 'lambda':
return new $LambdaCtx(C)
case 'nonlocal':
return new $NonlocalCtx(C)
case 'op':
switch(value){case '*':
case '+':
case '-':
case '~':
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,value)
case '@':
return new $DecoratorCtx(C)}
break
case 'pass':
return new $PassCtx(C)
case 'raise':
return new $AbstractExprCtx(new $RaiseCtx(C),true)
case 'return':
return new $AbstractExprCtx(new $ReturnCtx(C),true)
case 'try':
return new $TryCtx(C)
case 'with':
return new $AbstractExprCtx(new $WithCtx(C),false)
case 'yield':
return new $AbstractExprCtx(new $YieldCtx(C),true)
case 'eol':
if(C.tree.length==0){
C.node.parent.children.pop()
return C.node.parent.C}
return C}
console.log('token',token,value)
$_SyntaxError(C,'token '+token+' after '+C)}
$NodeCtx.prototype.to_js=function(){if(this.js !==undefined){return this.js}
this.js_processed=true
this.js=""
if(this.tree[0]){var is_not_def=["def","generator"].indexOf(this.scope.ntype)==-1
if(this.tree[0].annotation){
if(is_not_def){if(this.tree[0].type=="expr" &&
! this.tree[0].$in_parens &&
this.tree[0].tree[0].type=="id"){var js=""
if(this.create_annotations){js+="$locals.__annotations__ = $B.empty_dict();"}
return js+"_b_.dict.$setitem($locals.__annotations__, '"+
this.tree[0].tree[0].value+"', "+
this.tree[0].annotation.to_js()+");"}else if(this.tree[0].type=="def" ||
this.tree[0].type=="generator"){
this.js=this.tree[0].annotation.to_js()+";"}else{
this.js=""
this.tree=[]}}else if(["def","generator"].indexOf(this.tree[0].type)==-1){
this.tree=[]}}else if(this.tree[0].type=="assign" &&
! this.tree[0].tree[0].$in_parens &&
this.tree[0].tree[0].annotation){
var left=this.tree[0].tree[0],right=this.tree[0].tree[1]
if(this.create_annotations){this.js+="$locals.__annotations__ = $B.empty_dict();"}
this.js+="var $value = "+right.to_js()+";"
this.tree[0].tree.splice(1,1)
new $RawJSCtx(this.tree[0],"$value")
if(left.tree[0]&& left.tree[0].type=="id" && is_not_def){this.js+="_b_.dict.$setitem($locals.__annotations__, '"+
left.tree[0].value+"', "+
left.annotation.to_js()+");"}else{
this.js+=$to_js(this.tree)+";"
if(is_not_def){this.js+=left.annotation.to_js()}
return this.js}}}
if(this.node.children.length==0){this.js+=$to_js(this.tree)+';'}else{this.js+=$to_js(this.tree)}
return this.js}
var $NodeJS=$B.parser.$NodeJS=function(js){var node=new $Node()
new $NodeJSCtx(node,js)
return node}
var $NodeJSCtx=$B.parser.$NodeJSCtx=function(node,js){
this.node=node
node.C=this
this.type='node_js'
this.tree=[js]}
$NodeJSCtx.prototype.toString=function(){return 'js '+js}
$NodeJSCtx.prototype.to_js=function(){this.js_processed=true
return this.tree[0]}
var $NonlocalCtx=$B.parser.$NonlocalCtx=function(C){
this.type='nonlocal'
this.parent=C
this.tree=[]
this.names={}
C.tree[C.tree.length]=this
this.expect='id'
this.scope=$get_scope(this)
this.scope.nonlocals=this.scope.nonlocals ||{}
if(this.scope.C===undefined){$_SyntaxError(C,["nonlocal declaration not allowed at module level"])}}
$NonlocalCtx.prototype.toString=function(){return 'nonlocal '+this.tree}
$NonlocalCtx.prototype.add=function(name){if(this.scope.binding[name]=="arg"){$_SyntaxError(C,["name '"+name+"' is parameter and nonlocal"])}
this.names[name]=[false,$pos]
this.scope.nonlocals[name]=true}
$NonlocalCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){new $IdCtx(C,value)
C.add(value)
C.expect=','
return C}
break
case ',':
if(C.expect==','){C.expect='id'
return C}
break
case 'eol':
if(C.expect==','){return $transition(C.parent,token)}
break}
$_SyntaxError(C,'token '+token+' after '+C)}
$NonlocalCtx.prototype.transform=function(node,rank){var C=this.parent,pscope=this.scope.parent_block
if(pscope.C===undefined){$_SyntaxError(C,["no binding for nonlocal '"+
$B.last(Object.keys(this.names))+"' found"])}else{while(pscope !==undefined && pscope.C !==undefined){for(var name in this.names){if(pscope.binding[name]!==undefined){this.names[name]=[true]}}
pscope=pscope.parent_block}
for(var name in this.names){if(!this.names[name][0]){console.log('nonlocal error, C '+C)
$pos=this.names[name][1]
$_SyntaxError(C,["no binding for nonlocal '"+
name+"' found"])}}}}
$NonlocalCtx.prototype.to_js=function(){this.js_processed=true
return ''}
var $NotCtx=$B.parser.$NotCtx=function(C){
this.type='not'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$NotCtx.prototype.toString=function(){return 'not ('+this.tree+')'}
$NotCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'in':
C.parent.parent.tree.pop()
return new $ExprCtx(new $OpCtx(C.parent,'not_in'),'op',false)
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)
case 'op':
var a=value
if('+'==a ||'-'==a ||'~'==a){var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)}}
return $transition(C.parent,token)}
$NotCtx.prototype.to_js=function(){this.js_processed=true
return '!$B.$bool('+$to_js(this.tree)+')'}
var $NumberCtx=$B.parser.$NumberCtx=function(type,C,value){
this.type=type
this.value=value
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$NumberCtx.prototype.toString=function(){return this.type+' '+this.value}
$NumberCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case 'lambda':
$_SyntaxError(C,'token '+token+' after '+
C)}
return $transition(C.parent,token,value)}
$NumberCtx.prototype.to_js=function(){this.js_processed=true
var type=this.type,value=this.value
if(type=='int'){var v=parseInt(value[1],value[0])
if(v > $B.min_int && v < $B.max_int){if(this.unary_op){v=eval(this.unary_op+v)}
return v}else{var v=$B.long_int.$factory(value[1],value[0])
switch(this.unary_op){case "-":
v=$B.long_int.__neg__(v)
break
case "~":
v=$B.long_int.__invert__(v)
break}
return '$B.fast_long_int("'+v.value+'", '+v.pos+')'}}else if(type=="float"){
if(/^\d+$/.exec(value)||/^\d+\.\d*$/.exec(value)){return '(new Number('+this.value+'))'}
return '_b_.float.$factory('+value+')'}else if(type=="imaginary"){return '$B.make_complex(0,'+value+')'}}
var $OpCtx=$B.parser.$OpCtx=function(C,op){
this.type='op'
this.op=op
this.parent=C.parent
this.tree=[C]
this.scope=$get_scope(this)
if(C.type=="expr"){if(['int','float','str'].indexOf(C.tree[0].type)>-1){this.left_type=C.tree[0].type}else if(C.tree[0].type=="id"){var binding=this.scope.binding[C.tree[0].value]
if(binding){this.left_type=binding.type}}}
C.parent.tree.pop()
C.parent.tree.push(this)}
$OpCtx.prototype.toString=function(){return '(op '+this.op+') ['+this.tree+']'}
$OpCtx.prototype.transition=function(token,value){var C=this
if(C.op===undefined){$_SyntaxError(C,['C op undefined '+C])}
if(C.op.substr(0,5)=='unary'){if(token !='eol'){if(C.parent.type=='assign' ||
C.parent.type=='return'){
C.parent.tree.pop()
var t=new $ListOrTupleCtx(C.parent,'tuple')
t.tree.push(C)
C.parent=t
return t}}
if(C.tree.length==2 && C.tree[1].type=="expr" &&
C.tree[1].tree[0].type=="int"){
C.parent.tree.pop()
C.parent.tree.push(C.tree[1])
C.tree[1].parent=C.parent
C.tree[1].tree[0].unary_op=C.tree[0].op}}
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
return $transition(new $AbstractExprCtx(C,false),token,value)
case 'op':
switch(value){case '+':
case '-':
case '~':
return new $UnaryCtx(C,value)}
default:
if(C.tree[C.tree.length-1].type==
'abstract_expr'){$_SyntaxError(C,'token '+token+' after '+
C)}}
return $transition(C.parent,token)}
$OpCtx.prototype.to_js=function(){this.js_processed=true
var comps={'==':'eq','!=':'ne','>=':'ge','<=':'le','<':'lt','>':'gt'}
if(comps[this.op]!==undefined){var method=comps[this.op]
if(this.tree[0].type=='expr' && this.tree[1].type=='expr'){var t0=this.tree[0].tree[0],t1=this.tree[1].tree[0],js0=t0.to_js(),js1=t1.to_js()
switch(t1.type){case 'int':
switch(t0.type){case 'int':
if(Number.isSafeInteger(t0.value)&&
Number.isSafeInteger(t1.value)){return js0+this.op+js1}else{return '$B.$getattr('+
this.tree[0].to_js()+',"__'+
method+'__")('+
this.tree[1].to_js()+')'}
case 'str':
switch(this.op){case "==":
return "false"
case "!=":
return "true"
default:
return '$B.$TypeError("unorderable types: '+
" int() "+this.op+' str()")'}
case 'id':
return '(typeof '+js0+' == "number" ? '+
js0+this.op+js1+' : $B.rich_comp("__'+
method+'__",'+this.tree[0].to_js()+
','+this.tree[1].to_js()+'))'}
break;
case 'str':
switch(t0.type){case 'str':
return js0+this.op+js1
case 'int':
switch(this.op){case "==":
return "false"
case "!=":
return "true"
default:
return '$B.$TypeError("unorderable types: '+
' str() '+this.op+' int()")'}
case 'id':
return '(typeof '+js0+' == "string" ? '+
js0+this.op+js1+' : $B.rich_comp("__'+
method+'__",'+this.tree[0].to_js()+
','+this.tree[1].to_js()+'))'}
break;
case 'id':
if(t0.type=='id'){return 'typeof '+js0+'!="object" && typeof '+
js0+'!="function" && typeof '+js0+
' == typeof '+js1+' ? '+js0+this.op+js1+
' : $B.rich_comp("__'+method+'__",'+
this.tree[0].to_js()+','+this.tree[1].to_js()+
')'}
break}}}
switch(this.op){case 'and':
var op0=this.tree[0].to_js(),op1=this.tree[1].to_js()
if(this.wrap !==undefined){
return '(function(){var '+this.wrap.name+' = '+
this.wrap.js+';return $B.$test_expr($B.$test_item('+
op0+') && $B.$test_item('+op1+'))})()'}else{return '$B.$test_expr($B.$test_item('+op0+')&&'+
'$B.$test_item('+op1+'))'}
case 'or':
var res='$B.$test_expr($B.$test_item('+
this.tree[0].to_js()+')||'
return res+'$B.$test_item('+this.tree[1].to_js()+'))'
case 'in':
return '$B.$is_member('+$to_js(this.tree)+')'
case 'not_in':
return '!$B.$is_member('+$to_js(this.tree)+')'
case 'unary_neg':
case 'unary_pos':
case 'unary_inv':
var op,method
if(this.op=='unary_neg'){op='-';method='__neg__'}
else if(this.op=='unary_pos'){op='+';method='__pos__'}
else{op='~';method='__invert__'}
if(this.tree[1].type=="expr"){var x=this.tree[1].tree[0]
switch(x.type){case 'int':
var v=parseInt(x.value[1],x.value[0])
if(Number.isSafeInteger(v)){return op+v}
return '$B.$getattr('+x.to_js()+', "'+
method+'")()'
case 'float':
return '_b_.float.$factory('+op+x.value+')'
case 'imaginary':
return '$B.make_complex(0,'+op+x.value+')'}}
return '$B.$getattr('+this.tree[1].to_js()+',"'+
method+'")()'
case 'is':
return '$B.$is('+this.tree[0].to_js()+', '+
this.tree[1].to_js()+')'
case 'is_not':
return '! $B.$is('+this.tree[0].to_js()+', '+
this.tree[1].to_js()+')'
case '+':
return '$B.add('+this.tree[0].to_js()+', '+
this.tree[1].to_js()+')'
case '*':
case '-':
var op=this.op,vars=[],has_float_lit=false,scope=$get_scope(this)
function is_simple(elt){if(elt.type=='expr' && elt.tree[0].type=='int'){return true}else if(elt.type=='expr' &&
elt.tree[0].type=='float'){has_float_lit=true
return true}else if(elt.type=='expr' &&
elt.tree[0].type=='list_or_tuple' &&
elt.tree[0].real=='tuple' &&
elt.tree[0].tree.length==1 &&
elt.tree[0].tree[0].type=='expr'){return is_simple(elt.tree[0].tree[0].tree[0])}else if(elt.type=='expr' && elt.tree[0].type=='id'){var _var=elt.tree[0].to_js()
if(vars.indexOf(_var)==-1){vars.push(_var)}
return true}else if(elt.type=='op' &&
['*','+','-'].indexOf(elt.op)>-1){for(var i=0;i < elt.tree.length;i++){if(!is_simple(elt.tree[i])){return false}}
return true}
return false}
function get_type(ns,v){var t
if(['int','float','str'].indexOf(v.type)>-1){t=v.type}else if(v.type=='id' && ns[v.value]){t=ns[v.value].type}
return t}
var e0=this.tree[0],e1=this.tree[1]
if(is_simple(this)){var v0=this.tree[0].tree[0],v1=this.tree[1].tree[0]
if(vars.length==0 && !has_float_lit){
return this.simple_js()}else if(vars.length==0){
return 'new Number('+this.simple_js()+')'}else{
var ns=scope.binding,t0=get_type(ns,v0),t1=get_type(ns,v1)
if((t0=='float' && t1=='float')||
(this.op=='+' && t0=='str' && t1=='str')){this.result_type=t0
return v0.to_js()+this.op+v1.to_js()}else if(['int','float'].indexOf(t0)>-1 &&
['int','float'].indexOf(t1)>-1){if(t0=='int' && t1=='int'){this.result_type='int'}else{this.result_type='float'}
switch(this.op){case '-':
return '$B.sub('+v0.to_js()+','+
v1.to_js()+')'
case '*':
return '$B.mul('+v0.to_js()+','+
v1.to_js()+')'}}
var tests=[],tests1=[],pos=0
vars.forEach(function(_var){
tests.push('typeof '+_var+
'.valueOf() == "number"')
tests1.push('typeof '+_var+' == "number"')})
var res=[tests.join(' && ')+' ? ']
res.push('('+tests1.join(' && ')+' ? ')
res.push(this.simple_js())
res.push(' : new Number('+this.simple_js()+')')
res.push(')')
var t0=this.tree[0].to_js(),t1=this.tree[1].to_js()
if(this.op=='+'){res.push(' : (typeof '+t0+
' == "string" && typeof '+t1+
' == "string") ? '+t0+'+'+t1)}
res.push(': $B.rich_op("'+$operators[this.op]+'",'+
t0+','+t1+')')
return '('+res.join('')+')'}}
if(comps[this.op]!==undefined){return '$B.rich_comp("__'+$operators[this.op]+'__",'+
e0.to_js()+','+e1.to_js()+')'}else{return '$B.rich_op("'+$operators[this.op]+'", '+
e0.to_js()+', '+e1.to_js()+')'}
default:
if(comps[this.op]!==undefined){return '$B.rich_comp("__'+$operators[this.op]+'__",'+
this.tree[0].to_js()+','+this.tree[1].to_js()+')'}else{return '$B.rich_op("'+$operators[this.op]+'", '+
this.tree[0].to_js()+', '+this.tree[1].to_js()+
')'}}}
$OpCtx.prototype.simple_js=function(){var op=this.op
function sjs(elt){if(elt.type=='op'){return elt.simple_js()}else if(elt.type=='expr' && elt.tree[0].type=='list_or_tuple'
&& elt.tree[0].real=='tuple'
&& elt.tree[0].tree.length==1
&& elt.tree[0].tree[0].type=='expr'){return '('+elt.tree[0].tree[0].tree[0].simple_js()+')'}else{return elt.tree[0].to_js()}}
if(op=='+'){return '$B.add('+sjs(this.tree[0])+','+
sjs(this.tree[1])+')'}else if(op=='-'){return '$B.sub('+sjs(this.tree[0])+','+
sjs(this.tree[1])+')'}else if(op=='*'){return '$B.mul('+sjs(this.tree[0])+','+
sjs(this.tree[1])+')'}else if(op=='/'){return '$B.div('+sjs(this.tree[0])+','+
sjs(this.tree[1])+')'}else{return sjs(this.tree[0])+op+sjs(this.tree[1])}}
var $PackedCtx=$B.parser.$PackedCtx=function(C){
this.type='packed'
if(C.parent.type=='list_or_tuple' &&
C.parent.parent.type=="node"){
for(var i=0;i < C.parent.tree.length;i++){var child=C.parent.tree[i]
if(child.type=='expr' && child.tree.length > 0
&& child.tree[0].type=='packed'){$_SyntaxError(C,["two starred expressions in assignment"])}}}
this.parent=C
this.tree=[]
this.pos=$pos-1 
C.tree[C.tree.length]=this}
$PackedCtx.prototype.toString=function(){return '(packed) '+this.tree}
$PackedCtx.prototype.transition=function(token,value){var C=this
if(C.tree.length > 0 && token=="["){
return $transition(C.tree[0],token,value)}
switch(token){case 'id':
var expr=new $AbstractExprCtx(C,false)
expr.packed=true
C.parent.expect=','
var id=$transition(expr,token,value)
return id
case "[":
C.parent.expect=','
return new $ListOrTupleCtx(C,"list")
case "(":
C.parent.expect=','
return new $ListOrTupleCtx(C,"tuple")
case 'str':
C.parent.expect=","
return new $StringCtx(C,value)
case "]":
return $transition(C.parent,token,value)
case "{":
C.parent.expect=','
return new $DictOrSetCtx(C)
case 'op':
switch(value){case '+':
case '-':
case '~':
C.parent.expect=','
return new $UnaryCtx(C,value)
default:
$_SyntaxError(C,["can't use starred expression here"])}}
return C.parent.transition(token,C)}
$PackedCtx.prototype.to_js=function(){this.js_processed=true
return $to_js(this.tree)}
var $PassCtx=$B.parser.$PassCtx=function(C){
this.type='pass'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$PassCtx.prototype.toString=function(){return '(pass)'}
$PassCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){return C.parent}
$_SyntaxError(C,'token '+token+' after '+C)}
$PassCtx.prototype.to_js=function(){this.js_processed=true
return 'void(0)'}
var $PatternCtx=$B.parser.$PatternCtx=function(C){
this.type="pattern"
this.parent=C
this.tree=[]
C.tree.push(this)
this.expect='id'}
$PatternCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case 'id':
switch(token){case 'str':
case 'int':
case 'float':
case 'imaginary':
C.expect=','
return new $PatternLiteralCtx(C,token,value)
case 'op':
switch(value){case '-':
case '+':
C.expect='number'
C.sign=value
return C
default:
$_SyntaxError(C)}
case 'id':
C.expect=','
if(['None','True','False'].indexOf(value)>-1){return new $PatternLiteralCtx(C,token,value)}else{return new $PatternCaptureCtx(C,value)}
break
case '[':
case '(':
return new $PatternCtx(
new $PatternSequenceCtx(C.parent,token))
case '{':
return new $PatternMappingItemCtx(
new $PatternMappingCtx(C.parent,token))}
case 'number':
switch(token){case 'int':
case 'float':
case 'imaginary':
C.expect=','
return new $PatternLiteralCtx(C,token,value,C.sign)
default:
$_SyntaxError(C)}
case ',':
switch(token){case ',':
if(C.parent instanceof $PatternSequenceCtx){return new $PatternCtx(C.parent)}
return new $PatternCtx(
new $PatternSequenceCtx(C.parent))
case ':':
return $BodyCtx(C)}}
return C.parent.transition(token,value)}
var $PatternCaptureCtx=function(C,value){
this.type="capture_pattern"
this.parent=C.parent
C.parent.tree.pop()
C.parent.tree.push(this)
this.tree=[value]
this.expect='.'
this.$pos=$pos}
$PatternCaptureCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case '.':
if(token=='.'){C.type="value_pattern"
C.tree.push('.')
C.expect='id'
return C}else if(token=='('){
return new $PatternCtx(new $PatternClassCtx(C))}
case 'id':
if(token=='id'){C.tree.push(value)
C.expect='.'
return C}}
return $transition(C.parent,token,value)}
$PatternCaptureCtx.prototype.to_js=function(){if(this.tree.length==1){return '{capture: "'+this.tree[0]+'"}'}
return '{value: "'+this.tree.join('')+'"}'}
$PatternClassCtx=function(C){this.type="class_pattern"
this.tree=[]
this.parent=C.parent
this.class_name=C.tree.pop()
C.parent.tree.pop()
C.parent.tree.push(this)
this.expect=','}
$PatternClassCtx.prototype.transition=function(token,value){switch(this.expect){case ',':
switch(token){case '=':
var current=$B.last(this.tree)
if(current instanceof $PatternCaptureCtx){this.tree[this.tree.length-1]=current.tree[0]
return new $PatternCtx(this)}
$_SyntaxError(this)
case ',':
return new $PatternCtx(this)
case ')':
return this.parent
default:
$_SyntaxError(this)}}}
$PatternClassCtx.prototype.to_js=function(){var i=0,args=[]
while(i < this.tree.length){var item=this.tree[i]
if(typeof item=="string"){
args.push('{'+item+': '+this.tree[i+1].to_js()+'}')
i++}else{args.push(item.to_js())}
i++}
return '{class: ['+args.join(', ')+']}'}
var $PatternLiteralCtx=function(C,token,value,sign){
this.type="literal_pattern"
this.parent=C.parent
C.parent.tree.pop()
C.parent.tree.push(this)
this.tree=[{token,value,sign}]
this.expect='op'}
$PatternLiteralCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case 'op':
if(token=="op"){switch(value){case '+':
case '-':
if(['int','float'].indexOf(this.tree[0].token)>-1){C.expect='number'
this.tree.push(value)
C.num_sign=value
return C}
$_SyntaxError(C,value+'sign only after '+
'int or float')
default:
return $transition(C.parent,token,value)}}
break
case 'number':
switch(token){case 'imaginary':
C.tree.push({token,value,sign:C.num_sign})
return C.parent
default:
$_SyntaxError(C,'expected imaginary')}}
return $transition(C.parent,token,value)}
$PatternLiteralCtx.prototype.to_js=function(){function int_to_num(item){var v=parseInt(item.value[1],item.value[0])
return item.sign=='-' ?-v :v}
var res='',first=this.tree[0]
switch(first.token){case 'id':
res='_b_.'+first.value
break
case 'str':
res=first.value
break
case 'int':
res=int_to_num(first)
break
case 'float':
res=(first.sign=='-' ? '-' :'')+first.value
break
case 'imaginary':
res+='$B.make_complex(0, '+first.value+')'
break}
if(this.tree.length > 1){res='$B.make_complex('+res+','+
(this.tree[1]=='-' ? '-' :'')+
this.tree[2].value+')'}
return res}
var $PatternMappingCtx=function(C){
this.type="mapping_pattern"
this.parent=C
C.tree.pop()
this.tree=[]
C.tree.push(this)}
$PatternMappingCtx.prototype.transition=function(token,value){var C=this
switch(token){case ',':
return new $PatternMappingItemCtx(C)
case '}':
return C.parent
default:
$_SyntaxError(C)}}
$PatternMappingCtx.prototype.to_js=function(){return '{mapping: '+$to_js(this.tree)+'}'}
var $PatternMappingItemCtx=function(C){this.type="mapping_pattern_item"
this.parent=C
this.tree=[]
this.expect='literal'
C.tree.push(this)}
$PatternMappingItemCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case 'literal':
switch(token){case 'str':
this.tree.push(value)
this.expect=':'
return this
default:
$_SyntaxError(this,'expected a literal')}
case ':':
switch(token){case ':':
this.expect='pattern'
return new $PatternCtx(this)
default:
$_SyntaxError('expected :')}
case 'pattern':
console.log(token,value)}
return $transition(C.parent,token,value)}
$PatternMappingItemCtx.prototype.to_js=function(){console.log('pattern mapping to js',this)
return '['+this.tree[0]+','+this.tree[1].to_js()+']'}
var $PatternOrCtx=function(C){
this.type="or_pattern"
this.parent=C
var first_pattern=C.tree.pop()
this.tree=[first_pattern]
this.expect='|'
C.tree.push(this)}
$PatternOrCtx.prototype.transition=function(token,value){var C=this
for(var i=0,len=C.tree.length-1;i < len;i++){if(C.tree[i].type=='capture_pattern'){$_SyntaxError(C.tree[i],[`name capture '${C.tree[i].tree[0]}' `+
'makes remaining patterns unreachable'])}}
if(token=='op' && value=="|"){return new $PatternCtx(C)}
return $transition(C.parent,token,value)}
$PatternOrCtx.prototype.to_js=function(){return '{or : ['+$to_js(this.tree)+']}'}
var $PatternSequenceCtx=function(C,token){
this.type="sequence_pattern"
this.parent=C
this.tree=[]
var first_pattern=C.tree.pop()
if(token===undefined){
this.tree=[first_pattern]
first_pattern.parent=this}else{
this.token=token}
this.expect=','
C.tree.push(this)}
$PatternSequenceCtx.prototype.transition=function(token,value){var C=this
if(C.expect==','){if((this.token=='[' && token==']')||
(this.token=='(' && token==")")){return C.parent}else if(token==','){C.expect='id'
return C}else if(this.token===undefined){return $transition(C.parent,token,value)}
$_SyntaxError(C)}else if(C.expect=='id'){C.expect=','
return $transition(new $PatternCtx(C),token,value)}}
$PatternSequenceCtx.prototype.to_js=function(){return '{sequence: ['+$to_js(this.tree)+']}'}
var $RaiseCtx=$B.parser.$RaiseCtx=function(C){
this.type='raise'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.scope_type=$get_scope(this).ntype}
$RaiseCtx.prototype.toString=function(){return ' (raise) '+this.tree}
$RaiseCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.tree.length==0){return new $IdCtx(new $ExprCtx(C,'exc',false),value)}
break
case 'from':
if(C.tree.length > 0){return new $AbstractExprCtx(C,false)}
break
case 'eol':
return $transition(C.parent,token)}
$_SyntaxError(C,'token '+token+' after '+C)}
$RaiseCtx.prototype.to_js=function(){this.js_processed=true
var exc=this.tree.length==0 ? '' :this.tree[0].to_js()
return '$B.$raise('+exc+')'}
var $RawJSCtx=$B.parser.$RawJSCtx=function(C,js){this.type="raw_js"
C.tree[C.tree.length]=this
this.parent=C
this.js=js}
$RawJSCtx.prototype.toString=function(){return '(js) '+this.js}
$RawJSCtx.prototype.transition=function(token,value){var C=this}
$RawJSCtx.prototype.to_js=function(){this.js_processed=true
return this.js}
var $ReturnCtx=$B.parser.$ReturnCtx=function(C){
this.type='return'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.scope=$get_scope(this)
if(["def","generator"].indexOf(this.scope.ntype)==-1){$_SyntaxError(C,["'return' outside function"])}
var node=this.node=$get_node(this)
while(node.parent){if(node.parent.C){var elt=node.parent.C.tree[0]
if(elt.type=='for'){elt.has_return=true
break}else if(elt.type=='try'){elt.has_return=true}else if(elt.type=='single_kw' && elt.token=='finally'){elt.has_return=true}}
node=node.parent}}
$ReturnCtx.prototype.toString=function(){return 'return '+this.tree}
$ReturnCtx.prototype.transition=function(token,value){var C=this
return $transition(C.parent,token)}
$ReturnCtx.prototype.to_js=function(){this.js_processed=true
if(this.tree.length==1 && this.tree[0].type=='abstract_expr'){
this.tree.pop()
new $IdCtx(new $ExprCtx(this,'rvalue',false),'None')}
var scope=this.scope
if(scope.ntype=='generator'){return 'var $res = '+$to_js(this.tree)+'; $B.leave_frame({$locals});'+
'return $B.generator_return($res)'}
var indent='    '.repeat(this.node.indent-1)
var js='var $res = '+$to_js(this.tree)+';\n'+indent+
'if($locals.$f_trace !== _b_.None){$B.trace_return($res)}\n'+indent+
'$B.leave_frame'
if(scope.id.substr(0,6)=='$exec_'){js+='_exec'}
js+='({$locals});\n'
if(this.is_await){js+=indent+'$B.restore_stack(save_stack, $locals)\n'}
js+=indent+'return $res'
return js}
var $SingleKwCtx=$B.parser.$SingleKwCtx=function(C,token){
this.type='single_kw'
this.token=token
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
if(token=="else"){var node=C.node
var pnode=node.parent
for(var rank=0;rank < pnode.children.length;rank++){if(pnode.children[rank]===node){break}}
var pctx=pnode.children[rank-1].C
if(pctx.tree.length > 0){var elt=pctx.tree[0]
if(elt.type=='for' ||
elt.type=='asyncfor' ||
(elt.type=='condition' && elt.token=='while')){elt.has_break=true
elt.else_node=$get_node(this)
this.loop_num=elt.loop_num}}}}
$SingleKwCtx.prototype.toString=function(){return this.token}
$SingleKwCtx.prototype.transition=function(token,value){var C=this
if(token==':'){return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)}
$SingleKwCtx.prototype.transform=function(node,rank){
if(this.token=='finally'){var scope=$get_scope(this)
node.insert(0,$NodeJS('var $exit;'+
'if($B.frames_stack.length < $stack_length){'+
'$exit = true;'+
'$B.frames_stack.push($top_frame)'+
'}')
)
var scope_id=scope.id.replace(/\./g,'_')
var last_child=node.children[node.children.length-1]
if(last_child.C.tree[0].type !="return"){node.add($NodeJS('if($exit){$B.leave_frame({$locals})}'))}}}
$SingleKwCtx.prototype.to_js=function(){this.js_processed=true
if(this.token=='finally'){return this.token}
if(this.loop_num !==undefined){var scope=$get_scope(this)
var res='if($locals_'+scope.id.replace(/\./g,'_')
return res+'["$no_break'+this.loop_num+'"])'}
return this.token}
var $SliceCtx=$B.parser.$SliceCtx=function(C){
this.type='slice'
this.parent=C
this.tree=C.tree.length > 0 ?[C.tree.pop()]:[]
C.tree.push(this)}
$SliceCtx.prototype.transition=function(token,value){var C=this
if(token==":"){return new $AbstractExprCtx(C,false)}
return $transition(C.parent,token,value)}
$SliceCtx.prototype.to_js=function(){for(var i=0;i < this.tree.length;i++){if(this.tree[i].type=="abstract_expr"){this.tree[i].to_js=function(){return "_b_.None"}}}
return "_b_.slice.$factory("+$to_js(this.tree)+")"}
var $StarArgCtx=$B.parser.$StarArgCtx=function(C){
this.type='star_arg'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$StarArgCtx.prototype.toString=function(){return '(star arg) '+this.tree}
$StarArgCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.parent.type=="target_list"){C.tree.push(value)
C.parent.expect=','
return C.parent}
return $transition(new $AbstractExprCtx(C,false),token,value)
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case 'not':
case 'lambda':
return $transition(new $AbstractExprCtx(C,false),token,value)
case ',':
case ')':
if(C.tree.length==0){$_SyntaxError(C,"unnamed star argument")}
return $transition(C.parent,token)
case ':':
if(C.parent.parent.type=='lambda'){return $transition(C.parent.parent,token)}}
$_SyntaxError(C,'token '+token+' after '+C)}
$StarArgCtx.prototype.to_js=function(){this.js_processed=true
return '{$nat:"ptuple",arg:'+$to_js(this.tree)+'}'}
var $StringCtx=$B.parser.$StringCtx=function(C,value){
this.type='str'
this.parent=C
this.tree=[value]
C.tree[C.tree.length]=this
this.raw=false
this.$pos=$pos}
$StringCtx.prototype.toString=function(){return 'string '+(this.tree ||'')}
$StringCtx.prototype.transition=function(token,value){var C=this
switch(token){case '[':
return new $AbstractExprCtx(new $SubCtx(C.parent),false)
case '(':
C.parent.tree[0]=C
return new $CallCtx(C.parent)
case 'str':
C.tree.push(value)
return C}
return $transition(C.parent,token,value)}
$StringCtx.prototype.to_js=function(){this.js_processed=true
var res='',type=null,scope=$get_scope(this)
function fstring(parsed_fstring){
var elts=[]
for(var i=0;i < parsed_fstring.length;i++){if(parsed_fstring[i].type=='expression'){var expr=parsed_fstring[i].expression
var pos=0,br_stack=[],parts=[expr]
while(pos < expr.length){var car=expr.charAt(pos)
if(car==":" && br_stack.length==0){parts=[expr.substr(0,pos),expr.substr(pos+1)]
break}else if("{[(".indexOf(car)>-1){br_stack.push(car)}else if(")]}".indexOf(car)>-1){br_stack.pop()}
pos++}
expr=parts[0]
var save_pos=$pos
var expr_node=$B.py2js(expr,scope.module,scope.id,scope)
expr_node.to_js()
$pos=save_pos
for(var j=0;j < expr_node.children.length;j++){var node=expr_node.children[j]
if(node.C.tree && node.C.tree.length==1 &&
node.C.tree[0]=="try"){
for(var k=0;k < node.children.length;k++){
if(node.children[k].is_line_num){continue}
var expr1=node.children[k].js
if(expr1.length > 0){while("\n;".indexOf(expr1.charAt(expr1.length-1))>-1){expr1=expr1.substr(0,expr1.length-1)}}else{console.log("f-string: empty expression not allowed")}
break}
break}}
switch(parsed_fstring[i].conversion){case "a":
expr1='_b_.ascii('+expr1+')'
break
case "r":
expr1='_b_.repr('+expr1+')'
break
case "s":
expr1='_b_.str.$factory('+expr1+')'
break}
var fmt=parts[1]
if(fmt !==undefined){
var parsed_fmt=$B.parse_fstring(fmt)
if(parsed_fmt.length > 1){fmt=fstring(parsed_fmt)}else{fmt="'"+fmt+"'"}
var res1="_b_.str.format('{0:' + "+
fmt+" + '}', "+expr1+")"
elts.push(res1)}else{if(parsed_fstring[i].conversion===null){expr1='_b_.str.$factory('+expr1+')'}
elts.push(expr1)}}else{var re=new RegExp("'","g")
var elt=parsed_fstring[i].replace(re,"\\'")
.replace(/\n/g,"\\n")
elts.push("'"+elt+"'")}}
return elts.join(' + ')}
function prepare(value){value=value.replace(/\n/g,'\\n\\\n')
value=value.replace(/\r/g,'\\r\\\r')
return value}
for(var i=0;i < this.tree.length;i++){if(this.tree[i].type=="call"){
var js='(function(){throw _b_.TypeError.$factory("'+"'str'"+
' object is not callable")}())'
return js}else{var value=this.tree[i],is_fstring=Array.isArray(value),is_bytes=false
if(!is_fstring){is_bytes=value.charAt(0)=='b'}
if(type==null){type=is_bytes
if(is_bytes){res+='_b_.bytes.$new(_b_.bytes, '}}else if(type !=is_bytes){return '$B.$TypeError("can\'t concat bytes to str")'}
if(!is_bytes){if(is_fstring){res+=fstring(value)}else{res+=prepare(value)}}else{res+=prepare(value.substr(1))}
if(i < this.tree.length-1){res+='+'}}}
if(is_bytes){res+=',"ISO-8859-1")'}
if(res.length==0){res='""'}
return res}
var $SubCtx=$B.parser.$SubCtx=function(C){
this.type='sub'
this.func='getitem' 
this.value=C.tree[0]
C.tree.pop()
C.tree[C.tree.length]=this
this.parent=C
this.tree=[]}
$SubCtx.prototype.toString=function(){return '(sub) (value) '+this.value+' (tree) '+this.tree}
$SubCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)
case ']':
if(C.parent.packed){return C.parent }
if(C.tree[0].tree.length > 0){return C.parent}
break
case ':':
return new $AbstractExprCtx(new $SliceCtx(C),false)
case ',':
return new $AbstractExprCtx(C,false)}
$_SyntaxError(C,'token '+token+' after '+C)}
$SubCtx.prototype.to_js=function(){this.js_processed=true
if(this.func=='getitem' && this.value.type=='id'){var type=$get_node(this).locals[this.value.value],val=this.value.to_js()
if(type=='list' ||type=='tuple'){if(this.tree.length==1){return '$B.list_key('+val+
', '+this.tree[0].to_js()+')'}else if(this.tree.length==2){return '$B.list_slice('+val+
', '+(this.tree[0].to_js()||"null")+','+
(this.tree[1].to_js()||"null")+')'}else if(this.tree.length==3){return '$B.list_slice_step('+val+
', '+(this.tree[0].to_js()||"null")+','+
(this.tree[1].to_js()||"null")+','+
(this.tree[2].to_js()||"null")+')'}}}
if(this.func=='getitem' && this.tree.length==1){if(this.tree[0].type=="slice"){return `$B.getitem_slice(${this.value.to_js()}, `+
`${this.tree[0].to_js()})`}
return '$B.$getitem('+this.value.to_js()+','+
this.tree[0].to_js()+')'}
if(this.func=='delitem' && this.tree.length==1){if(this.tree[0].type=="slice"){return `$B.delitem_slice(${this.value.to_js()}, `+
`${this.tree[0].to_js()})`}
return '$B.$delitem('+this.value.to_js()+','+
this.tree[0].to_js()+')'}
var res='',shortcut=false
if(this.func !=='delitem' &&
this.tree.length==1 && !this.in_sub){var expr='',x=this
shortcut=true
while(x.value.type=='sub'){expr+='['+x.tree[0].to_js()+']'
x.value.in_sub=true
x=x.value}
var subs=x.value.to_js()+'['+x.tree[0].to_js()+']'+
'((Array.isArray('+x.value.to_js()+') || typeof '+
x.value.to_js()+' == "string") && '+subs+
' !== undefined ?'+subs+expr+' : '}
var val=this.value.to_js()
res+='$B.$getattr('+val+',"__'+this.func+'__")('
if(this.tree.length==1){res+=this.tree[0].to_js()+')'}else{var res1=[]
this.tree.forEach(function(elt){if(elt.type=='abstract_expr'){res1.push('_b_.None')}
else{res1.push(elt.to_js())}})
res+='_b_.tuple.$factory(['+res1.join(',')+']))'}
return shortcut ? res+')' :res}
var $TargetListCtx=$B.parser.$TargetListCtx=function(C){
this.type='target_list'
this.parent=C
this.tree=[]
this.expect='id'
C.tree[C.tree.length]=this}
$TargetListCtx.prototype.toString=function(){return '(target list) '+this.tree}
$TargetListCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){C.expect=','
return new $IdCtx(
new $ExprCtx(C,'target',false),value)}
case 'op':
if(C.expect=='id' && value=='*'){
return new $PackedCtx(C)}
case '(':
case '[':
if(C.expect=='id'){C.expect=','
return new $ListOrTupleCtx(C,token=='(' ? 'tuple' :'list')}
case ')':
case ']':
if(C.expect==','){return C.parent}
case ',':
if(C.expect==','){C.expect='id'
return C}}
if(C.expect==','){return $transition(C.parent,token,value)}else if(token=='in'){
return $transition(C.parent,token,value)}
$_SyntaxError(C,'token '+token+' after '+C)}
$TargetListCtx.prototype.to_js=function(){this.js_processed=true
return $to_js(this.tree)}
var ternaries=[]
var $TernaryCtx=$B.parser.$TernaryCtx=function(C){
this.type='ternary'
this.parent=C.parent
C.parent.tree.pop()
C.parent.tree.push(this)
C.parent=this
this.tree=[C]
ternaries.push(this)}
$TernaryCtx.prototype.toString=function(){return '(ternary) '+this.tree}
$TernaryCtx.prototype.transition=function(token,value){var C=this
if(token=='else'){C.in_else=true
return new $AbstractExprCtx(C,false)}else if(! C.in_else){$_SyntaxError(C,'token '+token+' after '+C)}else if(token==","){
if(["assign","augm_assign","node","return"].
indexOf(C.parent.type)>-1){C.parent.tree.pop()
var t=new $ListOrTupleCtx(C.parent,'tuple')
t.implicit=true
t.tree[0]=C
C.parent=t
t.expect="id"
return t}}
return $transition(C.parent,token,value)}
$TernaryCtx.prototype.to_js=function(){this.js_processed=true
var res='$B.$bool('+this.tree[1].to_js()+') ? ' 
res+=this.tree[0].to_js()+' : ' 
return res+this.tree[2].to_js()}
var $TryCtx=$B.parser.$TryCtx=function(C){
this.type='try'
this.parent=C
C.tree[C.tree.length]=this}
$TryCtx.prototype.toString=function(){return '(try) '}
$TryCtx.prototype.transition=function(token,value){var C=this
if(token==':'){return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)}
$TryCtx.prototype.transform=function(node,rank){if(node.parent.children.length==rank+1){$_SyntaxError(node.C,["unexpected EOF while parsing"])}else{var next_ctx=node.parent.children[rank+1].C.tree[0]
switch(next_ctx.type){case 'except':
case 'finally':
case 'single_kw':
break
default:
$pos=node.parent.children[rank+1].pos
$_SyntaxError(node.parent.children[rank+1].C.tree[0],"no clause after try")}}
var scope=$get_scope(this)
var error_name=create_temp_name('$err')
var failed_name="$locals."+create_temp_name('$failed')
var js=failed_name+' = false;\n'+
' '.repeat(node.indent+4)+'try'
new $NodeJSCtx(node,js)
node.has_return=this.has_return
var catch_node=$NodeJS('catch('+error_name+')')
node.parent.insert(rank+1,catch_node)
catch_node.add($NodeJS("$B.set_exc("+error_name+")"))
catch_node.add($NodeJS("if($locals.$f_trace !== _b_.None)"+
"{$locals.$f_trace = $B.trace_exception()}"))
catch_node.add(
$NodeJS(failed_name+' = true;'+
'$B.pmframe = $B.last($B.frames_stack);'+
'if(false){}')
)
var pos=rank+2,has_default=false,
has_else=false,
has_finally=false
while(1){if(pos==node.parent.children.length){break}
var ctx=node.parent.children[pos].C.tree[0]
if(ctx===undefined){
break}
if(ctx.type=='except'){
if(has_else){$_SyntaxError(C,"'except' or 'finally' after 'else'")}
if(has_finally){$_SyntaxError(C,"'except' after 'finally'")}
ctx.error_name=error_name
if(ctx.tree.length > 0 && ctx.tree[0].alias !==null
&& ctx.tree[0].alias !==undefined){
var alias=ctx.tree[0].alias
node.parent.children[pos].insert(0,$NodeJS('$locals["'+alias+'"] = $B.exception('+
error_name+')')
)}
catch_node.insert(catch_node.children.length,node.parent.children[pos])
if(ctx.tree.length==0){if(has_default){$_SyntaxError(C,'more than one except: line')}
has_default=true}
node.parent.children.splice(pos,1)}else if(ctx.type=='single_kw' && ctx.token=='finally'){has_finally=true
var finally_node=node.parent.children[pos]
pos++}else if(ctx.type=='single_kw' && ctx.token=='else'){if(has_else){$_SyntaxError(C,"more than one 'else'")}
if(has_finally){$_SyntaxError(C,"'else' after 'finally'")}
has_else=true
var else_body=node.parent.children[pos]
node.parent.children.splice(pos,1)}else{break}}
if(!has_default){
var new_node=new $Node(),ctx=new $NodeCtx(new_node)
catch_node.insert(catch_node.children.length,new_node)
new $SingleKwCtx(ctx,'else')
new_node.add($NodeJS('throw '+error_name))}
if(has_else){var else_node=new $Node()
else_node.module=scope.module
new $NodeJSCtx(else_node,'if(!'+failed_name+')')
else_body.children.forEach(function(elt){else_node.add(elt)})
if(has_finally){finally_node.insert(0,else_node)}else{node.parent.insert(pos,else_node)}
pos++}
$loop_num++}
$TryCtx.prototype.to_js=function(){this.js_processed=true
return 'try'}
var $UnaryCtx=$B.parser.$UnaryCtx=function(C,op){
this.type='unary'
this.op=op
this.parent=C
C.tree[C.tree.length]=this}
$UnaryCtx.prototype.toString=function(){return '(unary) '+this.op}
$UnaryCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'int':
case 'float':
case 'imaginary':
if(C.parent.type=="packed"){$_SyntaxError(C,["can't use starred expression here"])}
var expr=C.parent
C.parent.parent.tree.pop()
if(C.op=='-'){value="-"+value}
else if(C.op=='~'){value=~value}
return $transition(C.parent.parent,token,value)
case 'id':
var p=C.parent.parent.tree.pop()
if(p.type=="packed"){
C.parent.parent.tree.push(p)
p.tree.pop()
var expr=new $ExprCtx(p,'call',false)}else{var expr=new $ExprCtx(C.parent.parent,'call',false)}
var expr1=new $ExprCtx(expr,'id',false)
new $IdCtx(expr1,value)
var repl=new $AttrCtx(expr)
if(C.op=='+'){repl.name='__pos__'}else if(C.op=='-'){repl.name='__neg__'}else{repl.name='__invert__'}
return expr1
case 'op':
if('+'==value ||'-'==value){if(C.op===value){C.op='+'}
else{C.op='-'}
return C}}
return $transition(C.parent,token,value)}
$UnaryCtx.prototype.to_js=function(){this.js_processed=true
return this.op}
var $WithCtx=$B.parser.$WithCtx=function(C){
this.type='with'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.expect='as'
this.scope=$get_scope(this)}
$WithCtx.prototype.toString=function(){return '(with) '+this.tree}
$WithCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){C.expect='as'
return $transition(
new $AbstractExprCtx(C,false),token,value)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'as':
return new $AbstractExprCtx(new $AliasCtx(C))
case ':':
switch(C.expect){case 'id':
case 'as':
case ':':
return $BodyCtx(C)}
break
case '(':
if(C.expect=='id' && C.tree.length==0){C.parenth=true
return C}else if(C.expect=='alias'){C.expect=':'
return new $TargetListCtx(C,false)}
break
case ')':
if(C.expect==',' ||C.expect=='as'){C.expect=':'
return C}
break
case ',':
if(C.parenth !==undefined &&
C.has_alias===undefined &&
(C.expect==',' ||C.expect=='as')){C.expect='id'
return C}else if(C.expect=='as'){C.expect='id'
return C}else if(C.expect==':'){C.expect='id'
return C}
break}
$_SyntaxError(C,'token '+token+' after '+
C.expect)}
$WithCtx.prototype.set_alias=function(ctx){var ids=[]
if(ctx.type=="id"){ids=[ctx]}else if(ctx.type=="list_or_tuple"){
ctx.tree.forEach(function(expr){if(expr.type=="expr" && expr.tree[0].type=="id"){ids.push(expr.tree[0])}})}
for(var i=0,len=ids.length;i < len;i++){var id_ctx=ids[i]
$bind(id_ctx.value,this.scope,this)
id_ctx.bound=true
if(this.scope.ntype !=='module'){
this.scope.C.tree[0].locals.push(id_ctx.value)}}}
$WithCtx.prototype.transform=function(node,rank){while(this.tree.length > 1){
var suite=node.children,item=this.tree.pop(),new_node=new $Node(),ctx=new $NodeCtx(new_node),with_ctx=new $WithCtx(ctx)
item.parent=with_ctx
with_ctx.tree=[item]
with_ctx.async=this.async
suite.forEach(function(elt){new_node.add(elt)})
node.children=[new_node]}
if(this.transformed){return}
this.prefix=""
if(this.tree.length > 1){var nw=new $Node(),ctx=new $NodeCtx(nw)
nw.parent=node
nw.module=node.module
nw.indent=node.indent+4
var wc=new $WithCtx(ctx)
wc.async=this.async
wc.tree=this.tree.slice(1)
node.children.forEach(function(elt){nw.add(elt)})
node.children=[nw]
this.transformed=true
return}
if(this.async){return this.transform_async(node,rank)}
var top_try_node=$NodeJS("try")
node.parent.insert(rank+1,top_try_node)
var num=this.num=$loop_num++
top_try_node.ctx_manager_num=num
this.cm_name=this.prefix+'$ctx_manager'+num
this.cmexit_name=this.prefix+'$ctx_manager_exit'+num
this.exc_name=this.prefix+'$exc'+num
this.err_name='$err'+num
this.val_name='$value'+num
this.yield_name=this.prefix+'$yield'+num
if(this.tree[0].alias===null){this.tree[0].alias='$temp'}
if(this.tree[0].type=='expr' &&
this.tree[0].tree[0].type=='list_or_tuple'){if(this.tree[1].type !='expr' ||
this.tree[1].tree[0].type !='list_or_tuple'){$_SyntaxError(C)}
if(this.tree[0].tree[0].tree.length !=
this.tree[1].tree[0].tree.length){$_SyntaxError(C,['wrong number of alias'])}
var ids=this.tree[0].tree[0].tree,alias=this.tree[1].tree[0].tree
this.tree.shift()
this.tree.shift()
for(var i=ids.length-1;i >=0;i--){ids[i].alias=alias[i].value
this.tree.splice(0,0,ids[i])}}
var block=node.children 
node.children=[]
var try_node=new $Node()
new $NodeJSCtx(try_node,'try')
top_try_node.add(try_node)
if(this.tree[0].alias){var new_node=new $Node(),ctx=new $NodeCtx(new_node)
try_node.add(new_node)
this.tree[0].alias.tree[0].parent=ctx
var assign=new $AssignCtx(this.tree[0].alias.tree[0])
assign.tree.push(new $RawJSCtx(ctx,this.val_name))}
block.forEach(function(elt){try_node.add(elt)})
var catch_node=new $Node()
new $NodeJSCtx(catch_node,'catch('+this.err_name+')')
var js=this.exc_name+' = false;'+this.err_name+
' = $B.exception('+this.err_name+', true)\n'+
' '.repeat(node.indent+4)+
'var $b = '+this.cmexit_name+'('+
this.err_name+'.__class__,'+
this.err_name+','+
'$B.$getattr('+this.err_name+', "__traceback__"));'
if(this.scope.ntype=="generator"){js+='$B.set_cm_in_generator('+this.cmexit_name+');'}
js+='if(!$B.$bool($b)){throw '+this.err_name+'}'
catch_node.add($NodeJS(js))
top_try_node.add(catch_node)
var finally_node=new $Node()
new $NodeJSCtx(finally_node,'finally')
finally_node.C.type='single_kw'
finally_node.C.token='finally'
finally_node.C.in_ctx_manager=true
finally_node.is_except=true
finally_node.in_ctx_manager=true
var js='if('+this.exc_name
js+='){'+this.cmexit_name+'(_b_.None, _b_.None, _b_.None);'
if(this.scope.ntype=="generator"){js+='delete '+this.cmexit_name}
js+='};'
finally_node.add($NodeJS(js))
node.parent.insert(rank+2,finally_node)
this.transformed=true}
$WithCtx.prototype.transform_async=function(node,rank){
var scope=$get_scope(this),expr=this.tree[0],alias=this.tree[0].alias
var new_nodes=[]
var num=this.num=$loop_num++
this.cm_name='$ctx_manager'+num,this.cmexit_name='$ctx_manager_exit'+num
this.exc_name='$exc'+num
var cmtype_name='$ctx_mgr_type'+num,cmenter_name='$ctx_manager_enter'+num,err_name='$err'+num
var js='var '+this.cm_name+' = '+expr.to_js()+','
new_nodes.push($NodeJS(js))
new_nodes.push($NodeJS('    '+cmtype_name+
' = _b_.type.$factory('+this.cm_name+'),'))
new_nodes.push($NodeJS('    '+this.cmexit_name+
' = $B.$call($B.$getattr('+cmtype_name+', "__aexit__")),'))
new_nodes.push($NodeJS('    '+cmenter_name+
' = $B.$call($B.$getattr('+cmtype_name+', "__aenter__"))'+
'('+this.cm_name+'),'))
new_nodes.push($NodeJS("    "+this.exc_name+" = false"))
js=""
if(alias){if(alias.tree[0].tree[0].type !="list_or_tuple"){var js=alias.tree[0].to_js()+' = '+
'await ($B.promise('+cmenter_name+'))'
new_nodes.push($NodeJS(js))}else{
var new_node=new $Node(),ctx=new $NodeCtx(new_node),expr=new $ExprCtx(ctx,"left",false)
expr.tree.push(alias.tree[0].tree[0])
alias.tree[0].tree[0].parent=expr
var assign=new $AssignCtx(expr)
new $RawJSCtx(assign,'await ($B.promise('+
cmenter_name+'))')
new_nodes.push(new_node)}}else{new_nodes.push($NodeJS('await ($B.promise('+cmenter_name+'))'))}
var try_node=new $NodeJS('try')
node.children.forEach(function(child){try_node.add(child)})
new_nodes.push(try_node)
var catch_node=new $NodeJS('catch(err)')
new_nodes.push(catch_node)
catch_node.add($NodeJS(this.exc_name+' = true'))
catch_node.add($NodeJS('var '+err_name+
' = $B.imported["_sys"].exc_info()'))
var if_node=$NodeJS('if(! await ($B.promise('+
this.cmexit_name+'('+this.cm_name+', '+err_name+'[0], '+
err_name+'[1], '+err_name+'[2]))))')
catch_node.add(if_node)
if_node.add($NodeJS('$B.$raise()'))
var else_node=$NodeJS('if(! '+this.exc_name+')')
new_nodes.push(else_node)
else_node.add($NodeJS('await ($B.promise('+this.cmexit_name+'('+
this.cm_name+', _b_.None, _b_.None, _b_.None)))'))
node.parent.children.splice(rank,1)
for(var i=new_nodes.length-1;i >=0;i--){node.parent.insert(rank,new_nodes[i])}
node.children=[]
return 0}
$WithCtx.prototype.to_js=function(){this.js_processed=true
var indent=$get_node(this).indent,h=' '.repeat(indent),num=this.num
var head=this.prefix=="" ? "var " :this.prefix,cm_name='$ctx_manager'+num,cme_name=head+'$ctx_manager_exit'+num,exc_name=head+'$exc'+num,val_name='$value'+num
return 'var '+cm_name+' = '+this.tree[0].to_js()+'\n'+
h+cme_name+' = $B.$getattr('+cm_name+',"__exit__")\n'+
h+'var '+val_name+' = $B.$getattr('+cm_name+',"__enter__")()\n'+
h+exc_name+' = true\n'}
var $YieldCtx=$B.parser.$YieldCtx=function(C,is_await){
this.type='yield'
this.parent=C
this.tree=[]
this.is_await=is_await
C.tree[C.tree.length]=this
if(C.type=="list_or_tuple" && C.tree.length > 1){$_SyntaxError(C,"non-parenthesized yield")}
if($parent_match(C,{type:"annotation"})){$_SyntaxError(C,["'yield' outside function"])}
var parent=this
while(true){var list_or_tuple=$parent_match(parent,{type:"list_or_tuple"})
if(list_or_tuple){list_or_tuple.yields=list_or_tuple.yields ||[]
list_or_tuple.yields.push([this,$pos])
parent=list_or_tuple}else{break}}
var parent=this
while(true){var set_or_dict=$parent_match(parent,{type:"dict_or_set"})
if(set_or_dict){set_or_dict.yields=set_or_dict.yields ||[]
set_or_dict.yields.push([this,$pos])
parent=set_or_dict}else{break}}
var root=$get_module(this)
root.yields_func_check=root.yields_func_check ||[]
root.yields_func_check.push([this,$pos])
var scope=this.scope=$get_scope(this,true),node=$get_node(this)
node.has_yield=this
var in_comp=$parent_match(this,{type:"comprehension"})
if($get_scope(this).id.startsWith("lc"+$B.lambda_magic)){delete node.has_yield}
if(in_comp){var outermost_expr=in_comp.tree[0].tree[1]
var parent=C
while(parent){if(parent===outermost_expr){break}
parent=parent.parent}
if(! parent){$_SyntaxError(C,["'yield' inside list comprehension"])}}
var in_lambda=false,parent=C
while(parent){if(parent.type=="lambda"){in_lambda=true
this.in_lambda=true
break}
parent=parent.parent}
var parent=node.parent
while(parent){if(parent.C && parent.C.tree.length > 0 &&
parent.C.tree[0].type=="with"){scope.C.tree[0].$has_yield_in_cm=true
break}
parent=parent.parent}
if(! in_lambda){switch(C.type){case 'node':
break;
case 'assign':
case 'list_or_tuple':
break
default:
$_SyntaxError(C,'yield atom must be inside ()')}}}
$YieldCtx.prototype.toString=function(){return '(yield) '+(this.from ? '(from) ' :'')+this.tree}
$YieldCtx.prototype.transition=function(token,value){var C=this
if(token=='from'){
if(C.tree[0].type !='abstract_expr'){
$_SyntaxError(C,"'from' must follow 'yield'")}
C.from=true
C.from_num=$B.UUID()
return C.tree[0]}
return $transition(C.parent,token)}
$YieldCtx.prototype.transform=function(node,rank){
var parent=node.parent
while(parent){if(parent.ctx_manager_num !==undefined){node.parent.insert(rank+1,$NodeJS("$top_frame[1].$has_yield_in_cm = true"))
break}
parent=parent.parent}}
$YieldCtx.prototype.to_js=function(){if(this.from){return `_r${this.from_num}`}else{return "yield "+$to_js(this.tree)}}
$YieldCtx.prototype.check_in_function=function(){if(this.in_lambda){return}
var scope=$get_scope(this),in_func=scope.is_function,func_scope=scope
if(! in_func && scope.is_comp){var parent=scope.parent_block
while(parent.is_comp){parent=parent_block}
in_func=parent.is_function
func_scope=parent}
if(! in_func){$_SyntaxError(this.parent,["'yield' outside function"])}else{var def=func_scope.C.tree[0]
if(! this.is_await){def.type='generator'}}}
var $add_line_num=$B.parser.$add_line_num=function(node,rank,line_info){if(node.type=='module'){var i=0
while(i < node.children.length){i+=$add_line_num(node.children[i],i,line_info)}}else if(node.type !=='marker'){var elt=node.C.tree[0],offset=1,flag=true,pnode=node,_line_info
while(pnode.parent !==undefined){pnode=pnode.parent}
var mod_id=node.module ||pnode.id
var line_num=node.line_num
if(line_num===undefined){flag=false}
if((elt.type=='condition' && elt.token=='elif')||
elt.type=='except' ||
elt.type=='single_kw' ||
elt.type=='case'){flag=false}
if(flag){_line_info=line_info===undefined ? line_num+','+mod_id :
line_info
var js=';$locals.$line_info = "'+_line_info+
'";if($locals.$f_trace !== _b_.None){$B.trace_line()};'+
'_b_.None;'
var new_node=new $Node()
new_node.is_line_num=true 
new $NodeJSCtx(new_node,js)
node.parent.insert(rank,new_node)
offset=2}
var i=0
while(i < node.children.length){i+=$add_line_num(node.children[i],i,line_info)}
return offset}else{return 1}}
var $bind=$B.parser.$bind=function(name,scope,C){
if(scope.nonlocals && scope.nonlocals[name]){
return}
if(scope.globals && scope.globals.has(name)){var module=$get_module(C)
module.binding[name]=true
return}
if(! C.no_bindings){var node=$get_node(C)
node.bindings=node.bindings ||{}
node.bindings[name]=true}
scope.binding=scope.binding ||{}
if(scope.binding[name]===undefined){scope.binding[name]=true}}
function $parent_match(ctx,obj){
var flag
while(ctx.parent){flag=true
for(var attr in obj){if(ctx.parent[attr]!=obj[attr]){flag=false
break}}
if(flag){return ctx.parent}
ctx=ctx.parent}
return false}
var $previous=$B.parser.$previous=function(C){var previous=C.node.parent.children[C.node.parent.children.length-2]
if(!previous ||!previous.C){$_SyntaxError(C,'keyword not following correct keyword')}
return previous.C.tree[0]}
var $get_docstring=$B.parser.$get_docstring=function(node){var doc_string=''
if(node.children.length > 0){var firstchild=node.children[0]
if(firstchild.C.tree && firstchild.C.tree.length > 0 &&
firstchild.C.tree[0].type=='expr'){var expr=firstchild.C.tree[0].tree[0]
if(expr.type=='str' && !Array.isArray(expr.tree[0])){doc_string=firstchild.C.tree[0].tree[0].to_js()}}}
return doc_string}
var $get_scope=$B.parser.$get_scope=function(C,flag){
var ctx_node=C.parent
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node,scope=null
while(tree_node.parent && tree_node.parent.type !=='module'){var ntype=tree_node.parent.C.tree[0].type
switch(ntype){case 'def':
case 'class':
case 'generator':
var scope=tree_node.parent
scope.ntype=ntype
scope.is_function=ntype !='class'
return scope}
tree_node=tree_node.parent}
var scope=tree_node.parent ||tree_node 
scope.ntype="module"
return scope}
var $get_line_num=$B.parser.$get_line_num=function(C){var ctx_node=$get_node(C),line_num=ctx_node.line_num
if(ctx_node.line_num===undefined){ctx_node=ctx_node.parent
while(ctx_node && ctx_node.line_num===undefined){ctx_node=ctx_node.parent}
if(ctx_node && ctx_node.line_num){line_num=ctx_node.line_num}}
return line_num}
var $get_module=$B.parser.$get_module=function(C){
var ctx_node=C instanceof $NodeCtx ? C :C.parent
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
if(tree_node.ntype=="module"){return tree_node}
var scope=null
while(tree_node.parent.type !='module'){tree_node=tree_node.parent}
scope=tree_node.parent 
scope.ntype="module"
return scope}
var $get_src=$B.parser.$get_src=function(C){
var node=$get_node(C)
while(node.parent !==undefined){node=node.parent}
return node.src}
var $get_node=$B.parser.$get_node=function(C){var ctx=C
while(ctx.parent){ctx=ctx.parent}
return ctx.node}
var $to_js_map=$B.parser.$to_js_map=function(tree_element){if(tree_element.to_js !==undefined){return tree_element.to_js()}
console.log('no to_js',tree_element)
throw Error('no to_js() for '+tree_element)}
var $to_js=$B.parser.$to_js=function(tree,sep){if(sep===undefined){sep=','}
return tree.map($to_js_map).join(sep)}
var $mangle=$B.parser.$mangle=function(name,C){
if(name.substr(0,2)=="__" && name.substr(name.length-2)!=="__"){var klass=null,scope=$get_scope(C)
while(true){if(scope.ntype=="module"){return name}
else if(scope.ntype=="class"){var class_name=scope.C.tree[0].name
while(class_name.charAt(0)=='_'){class_name=class_name.substr(1)}
return '_'+class_name+name}else{if(scope.parent && scope.parent.C){scope=$get_scope(scope.C.tree[0])}else{return name}}}}else{return name}}
var $transition=$B.parser.$transition=function(C,token,value){
return C.transition(token,value)}
$B.forbidden=["alert","arguments","case","catch","const","constructor","Date","debugger","delete","default","do","document","enum","export","eval","extends","Error","history","function","instanceof","keys","length","location","Math","message","new","null","Number","RegExp","String","super","switch","this","throw","typeof","var","window","toLocaleString","toString","void"]
$B.aliased_names=$B.list2obj($B.forbidden)
var s_escaped='abfnrtvxuU"0123456789'+"'"+'\\',is_escaped={}
for(var i=0;i < s_escaped.length;i++){is_escaped[s_escaped.charAt(i)]=true}
function SurrogatePair(value){
value=value-0x10000
return String.fromCharCode(0xD800 |(value >> 10))+
String.fromCharCode(0xDC00 |(value & 0x3FF))}
function test_num(num_lit){var len=num_lit.length,pos=0,char,elt=null,subtypes={b:'binary',o:'octal',x:'hexadecimal'},digits_re=/[_\d]/
function error(message){$pos+=pos
$_SyntaxError(C,[message])}
function check(elt){if(elt.value.length==0){var t=subtypes[elt.subtype]||'decimal'
error("invalid "+t+" literal")}else if(elt.value[elt.value.length-1].match(/[\-+_]/)){var t=subtypes[elt.subtype]||'decimal'
error("invalid "+t+" literal")}else{
elt.value=elt.value.replace(/_/g,"")
elt.length=pos
return elt}}
while(pos < len){var char=num_lit[pos]
if(char.match(digits_re)){if(elt===null){elt={value:char}}else{if(char=='_' && elt.value.match(/[._+\-]$/)){
error('consecutive _ at '+pos)}else if(char=='_' && elt.subtype=='float' &&
elt.value.match(/e$/i)){
error('syntax error')}else if(elt.subtype=='b' && !(char.match(/[01_]/))){error(`invalid digit '${char}' in binary literal`)}else if(elt.subtype=='o' && !(char.match(/[0-7_]/))){error(`invalid digit '${char}' in octal literal`)}else if(elt.subtype===undefined && elt.value.startsWith("0")&&
!char.match(/[0_]/)){error("leading zeros in decimal integer literals are not"+
" permitted; use an 0o prefix for octal integers")}
elt.value+=char}
pos++}else if(char.match(/[oxb]/i)){if(elt.value=="0"){elt.subtype=char.toLowerCase()
if(elt.subtype=="x"){digits_re=/[_\da-fA-F]/}
elt.value=''
pos++}else{error("invalid char "+char)}}else if(char=='.'){if(elt===null){error("invalid char in "+num_lit+" pos "+pos+": "+char)}else if(elt.subtype===undefined){elt.subtype="float"
if(elt.value.endsWith('_')){error("invalid decimal literal")}
elt.value=elt.value.replace(/_/g,"")+char
pos++}else{return check(elt)}}else if(char.match(/e/i)){if(num_lit[pos+1]===undefined){error("nothing after e")}else if(elt && subtypes[elt.subtype]!==undefined){
error("syntax error")}else if(elt && elt.value.endsWith('_')){
error("syntax error")}else if(num_lit[pos+1].match(/[+\-0-9_]/)){if(elt && elt.value){if(elt.exp){elt.length=pos
return elt}
elt.subtype='float'
elt.value+=char
elt.exp=true
pos++}else{error("unexpected e")}}else{return check(elt)}}else if(char.match(/[\+\-]/i)){if(elt===null){elt={value:char}
pos++}else if(elt.value.search(/e$/i)>-1){elt.value+=char
pos++}else{return check(elt)}}else if(char.match(/j/i)){if(elt &&(! elt.subtype ||elt.subtype=="float")){elt.imaginary=true
check(elt)
elt.length++
return elt}else{error("invalid syntax")}}else{break}}
return check(elt)}
function*basic_tokenizer(src){
var pos=0
while(pos < src.length){if(src[pos]=='"' ||src[pos]=="'"){var quote=src[pos],escaped=false,start=pos
pos++
while(pos < src.length){if(src[pos]=='\\'){escaped=! escaped}else if(src[pos]==quote && ! escaped){yield src.substring(start,pos+1)
break}
pos++}}else if(src[pos]=='#'){while(pos < src.length){if(src[pos]=='\n'){break}
pos++}}else if(src[pos]=='\\' && src[pos+1]=='\n'){
pos++}else if(' \t'.indexOf(src[pos])==-1){yield src[pos]}
pos++}}
function line_ends_with_comma(src){
var expect=':'
for(token of $B.tokenizer(src)){if(expect==':'){if(token.type=='OP' && token.string==':'){expect='eol'}else if(token.type=='NEWLINE'){return false}}else{return token.type=='NEWLINE'}}
return false}
function prepare_number(n){
n=n.replace(/_/g,"")
if(n.startsWith('.')){if(n.endsWith("j")){return{type:'imaginary',value:n.substr(0,n.length-1)}}else{return{type:'float',value:n}}
pos=j}else if(n.startsWith('0')&& n !='0'){
var num=test_num(n),base
if(num.imaginary){return{type:'imaginary',value:num.value}}
if(num.subtype=='float'){return{type:num.subtype,value:num.value}}
if(num.subtype===undefined){base=10}else{base={'b':2,'o':8,'x':16}[num.subtype]}
if(base !==undefined){return{type:'int',value:[base,num.value]}}}else{var num=test_num(n)
if(num.subtype=="float"){return{
type:num.imaginary ? 'imaginary' :'float',value:num.value}}else{return{
type:num.imaginary ? 'imaginary' :'int',value:num.imaginary ? num.value :[10,num.value]}}}}
function test_escape(C,text,string_start,antislash_pos){
var seq_end,mo
mo=/^[0-7]{1,3}/.exec(text.substr(antislash_pos+1))
if(mo){return[String.fromCharCode(parseInt(mo[0],8)),1+mo[0].length]}
switch(text[antislash_pos+1]){case "x":
var mo=/^[0-9A-F]{0,2}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=2){seq_end=antislash_pos+mo[0].length+1
$pos=string_start+seq_end+2
$_SyntaxError(C,["(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\xXX escape"])}else{return[String.fromCharCode(parseInt(mo[0],16)),2+mo[0].length]}
case "u":
var mo=/^[0-9A-F]{0,4}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=4){seq_end=antislash_pos+mo[0].length+1
$pos=string_start+seq_end+2
$_SyntaxError(C,["(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\uXXXX escape"])}else{return[String.fromCharCode(parseInt(mo[0],16)),2+mo[0].length]}
case "U":
var mo=/^[0-9A-F]{0,8}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=8){seq_end=antislash_pos+mo[0].length+1
$pos=string_start+seq_end+2
$_SyntaxError(C,["(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\uXXXX escape"])}else{var value=parseInt(mo[0],16)
if(value > 0x10FFFF){$_SyntaxError('invalid unicode escape '+mo[0])}else if(value >=0x10000){return[SurrogatePair(value),2+mo[0].length]}else{return[String.fromCharCode(value),2+mo[0].length]}}}}
function prepare_string(C,s,position){var len=s.length,pos=0,string_modifier,_type="string"
while(pos < len){if(s[pos]=='"' ||s[pos]=="'"){quote=s[pos]
string_modifier=s.substr(0,pos)
if(s.substr(pos,3)==quote.repeat(3)){_type="triple_string"
inner=s.substring(pos+3,s.length-3)}else{inner=s.substring(pos+quote.length,len-quote.length)}
break}
pos++}
var result={quote}
var mods={r:'raw',f:'fstring',b:'bytes'}
for(var mod of string_modifier){result[mods[mod]]=true}
var raw=C.type=='str' && C.raw,string_start=$pos+pos+1,bytes=false,fstring=false,sm_length,
end=null;
if(string_modifier){switch(string_modifier){case 'r':
raw=true
break
case 'u':
break
case 'b':
bytes=true
break
case 'rb':
case 'br':
bytes=true
raw=true
break
case 'f':
fstring=true
sm_length=1
break
case 'fr':
case 'rf':
fstring=true
sm_length=2
raw=true
break}
string_modifier=false}
var escaped=false,zone='',end=0,src=inner
while(end < src.length){if(escaped){if(src.charAt(end)=="a"){zone=zone.substr(0,zone.length-1)+"\u0007"}else{zone+=src.charAt(end)
if(raw && src.charAt(end)=='\\'){zone+='\\'}}
escaped=false
end++}else if(src.charAt(end)=="\\"){if(raw){if(end < src.length-1 &&
src.charAt(end+1)==quote){zone+='\\\\'+quote
end+=2}else{zone+='\\\\'
end++}
escaped=true}else{if(src.charAt(end+1)=='\n'){
end+=2}else if(src.substr(end+1,2)=='N{'){
var end_lit=end+3,re=new RegExp("[-a-zA-Z0-9 ]+"),search=re.exec(src.substr(end_lit))
if(search===null){$_SyntaxError(C,"(unicode error) "+
"malformed \\N character escape",pos)}
var end_lit=end_lit+search[0].length
if(src.charAt(end_lit)!="}"){$_SyntaxError(C,"(unicode error) "+
"malformed \\N character escape")}
var description=search[0].toUpperCase()
if($B.unicodedb===undefined){var xhr=new XMLHttpRequest
xhr.open("GET",$B.brython_path+"unicode.txt",false)
xhr.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){$B.unicodedb=this.responseText}else{console.log("Warning - could not "+
"load unicode.txt")}}}
xhr.send()}
if($B.unicodedb !==undefined){var re=new RegExp("^([0-9A-F]+);"+
description+";.*$","m")
search=re.exec($B.unicodedb)
if(search===null){$_SyntaxError(C,"(unicode error) "+
"unknown Unicode character name")}
var cp="0x"+search[1]
zone+=String.fromCodePoint(eval(cp))
end=end_lit+1}else{end++}}else{var esc=test_escape(C,src,string_start,end)
if(esc){if(esc[0]=='\\'){zone+='\\\\'}else{zone+=esc[0]}
end+=esc[1]}else{if(end < src.length-1 &&
is_escaped[src.charAt(end+1)]===undefined){zone+='\\'}
zone+='\\'
escaped=true
end++}}}}else if(src.charAt(end)=='\n' && _type !='triple_string'){
console.log(pos,end,src.substring(pos,end))
$_SyntaxError(C,["EOL while scanning string literal"])}else{zone+=src.charAt(end)
end++}}
var $string=zone,string=''
for(var i=0;i < $string.length;i++){var $car=$string.charAt(i)
if($car==quote){if(raw ||(i==0 ||
$string.charAt(i-1)!='\\')){string+='\\'}else if(_type=="triple_string"){
var j=i-1
while($string.charAt(j)=='\\'){j--}
if((i-j-1)% 2==0){string+='\\'}}}
string+=$car}
if(fstring){try{var re=new RegExp("\\\\"+quote,"g"),string_no_bs=string.replace(re,quote)
var elts=$B.parse_fstring(string_no_bs)}catch(err){if(err.position){$pos+=err.position}
$_SyntaxError(C,[err.message])}}
if(bytes){result.value='b'+quote+string+quote}else if(fstring){result.value=elts}else{result.value=quote+string+quote}
C.raw=raw;
return result}
function unindent(src){
var lines=src.split('\n'),line,global_indent,indent,unindented_lines=[]
for(var line_num=0,len=lines.length;line_num < len;line_num++){line=lines[line_num]
indent=line.match(/^\s*/)[0]
if(indent !=line){
if(global_indent===undefined){
if(indent.length==0){
return src}
global_indent=indent
var start=global_indent.length
unindented_lines.push(line.substr(start))}else if(line.startsWith(global_indent)){unindented_lines.push(line.substr(start))}else{throw SyntaxError("first line starts at "+
`column ${start}, line ${line_num} at column `+
line.match(/\s*/).length+'\n    '+line)}}else{unindented_lines.push('')}}
return unindented_lines.join('\n')}
function handle_errortoken(C,token){if(token.string=="'" ||token.string=='"'){$_SyntaxError(C,['unterminated string literal '+
`(detected at line ${token.start[0]})`])}
$_SyntaxError(C,'invalid token '+token[1]+_b_.ord(token[1]))}
var dispatch_tokens=$B.parser.dispatch_tokens=function(root,src){var tokenizer=$B.tokenizer(src)
var braces_close={")":"(","]":"[","}":"{"},braces_open="([{",braces_stack=[]
var kwdict=["class","return","break","for","lambda","try","finally","raise","def","from","nonlocal","while","del","global","with","as","elif","else","if","yield","assert","import","except","raise","in","pass","with","continue","__debugger__","async","await"
]
var unsupported=[]
var $indented=["class","def","for","condition","single_kw","try","except","with","match","case" 
]
var module=root.module
var lnum=root.line_num===undefined ? 1 :root.line_num
var node=new $Node()
node.line_num=lnum
root.add(node)
var C=null,expect_indent=false,indent=0
var line2pos={0:0,1:0},line_num=1
for(var pos=0,len=src.length;pos < len;pos++){if(src[pos]=='\n'){line_num++
line2pos[line_num]=pos+1}}
while(true){try{var token=tokenizer.next()}catch(err){if(err.type=='IndentationError'){C=C ||new $NodeCtx(node)
$pos=line2pos[err.line_num]
$_SyntaxError(C,err.message,1)}else if(err instanceof SyntaxError){if(braces_stack.length > 0){var last_brace=$B.last(braces_stack),start=last_brace.start
$pos=line2pos[start[0]]+start[1]
$_SyntaxError(C,[`'${last_brace.string} was `+
'never closed'])}
$_SyntaxError(C,err.message)}
throw err}
if(token.done){throw Error('token done without ENDMARKER.')}
token=token.value
if(token[2]===undefined){console.log('token incomplet',token,'module',module,root)
console.log('src',src)}
if(token.start===undefined){console.log('no start',token)}
lnum=token.start[0]
$pos=line2pos[lnum]+token.start[1]
if(expect_indent &&
['INDENT','COMMENT','NL'].indexOf(token.type)==-1){C=C ||new $NodeCtx(node)
$_SyntaxError(C,"expected an indented block",1)}
switch(token.type){case 'ENDMARKER':
if(root.yields_func_check){var save_pos=$pos
for(const _yield of root.yields_func_check){$pos=_yield[1]
_yield[0].check_in_function()}
$pos=save_pos}
if(indent !=0){$_SyntaxError(node.C,'expected an indented block',1)}
if(node.C===undefined ||node.C.tree.length==0){node.parent.children.pop()}
return
case 'ENCODING':
case 'TYPE_COMMENT':
continue
case 'NL':
node.line_num++
continue
case 'COMMENT':
var end=line2pos[token.end[0]]+token.end[1]
root.comments.push([$pos,end-$pos])
continue
case 'ERRORTOKEN':
C=C ||new $NodeCtx(node)
if(token.string !=' '){handle_errortoken(C,token)}
continue}
switch(token[0]){case 'NAME':
case 'NUMBER':
case 'OP':
case 'STRING':
C=C ||new $NodeCtx(node)}
switch(token[0]){case 'NAME':
var name=token[1]
if(kwdict.indexOf(name)>-1){if(unsupported.indexOf(name)>-1){$_SyntaxError(C,"Unsupported Python keyword '"+name+"'")}
C=$transition(C,name)}else if(name=='not'){C=$transition(C,'not')}else if(typeof $operators[name]=='string'){
C=$transition(C,'op',name)}else{if($B.forbidden.indexOf(name)>-1){name='$$'+name}
C=$transition(C,'id',name)}
continue
case 'OP':
var op=token[1]
if((op.length==1 && '()[]{}.,='.indexOf(op)>-1)||
[':='].indexOf(op)>-1){if(braces_open.indexOf(op)>-1){braces_stack.push(token)}else if(braces_close[op]){if(braces_stack.length==0){$_SyntaxError(C,"unmatched '"+op+"'")}else{var last_brace=$B.last(braces_stack)
if(last_brace.string==braces_close[op]){braces_stack.pop()}else{$_SyntaxError(C,[`closing parenthesis '${op}' does not `+
`match opening parenthesis '`+
`${last_brace.string}'`])}}}
C=$transition(C,token[1])}else if(op==':'){C=$transition(C,':')
if(C.node && C.node.is_body_node){node=C.node}}else if(op=='...'){C=$transition(C,'ellipsis')}else if(op=='->'){C=$transition(C,'annotation')}else if(op==';'){if(C.type=='node' && C.tree.length==0){$_SyntaxError(C,'statement cannot start with ;')}
$transition(C,'eol')
var new_node=new $Node()
new_node.line_num=token[2][0]+1
C=new $NodeCtx(new_node)
node.parent.add(new_node)
node=new_node}else if($augmented_assigns[op]){C=$transition(C,'augm_assign',op)}else{C=$transition(C,'op',op)}
continue
case 'STRING':
var prepared=prepare_string(C,token[1],token[2])
C=$transition(C,'str',prepared.value)
continue
case 'NUMBER':
var prepared=prepare_number(token[1])
if(prepared===undefined){console.log('pas de prepared pour',token)}
C=$transition(C,prepared.type,prepared.value)
continue
case 'NEWLINE':
if(C && C.node && C.node.is_body_node){expect_indent=true}
C=C ||new $NodeCtx(node)
$transition(C,'eol')
var new_node=new $Node()
new_node.line_num=token[2][0]+1
if(node.parent.children.length > 0 &&
node.parent.children[0].is_body_node){node.parent.parent.add(new_node)}else{node.parent.add(new_node)}
C=new $NodeCtx(new_node)
node=new_node
continue
case 'DEDENT':
indent--
node.parent.children.pop()
node.parent.parent.add(node)
continue
case 'INDENT':
indent++
if(! expect_indent){C=C ||new $NodeCtx(node)
$_SyntaxError(C,'unexpected indent',$pos)}
expect_indent=false
continue}}}
var $create_root_node=$B.parser.$create_root_node=function(src,module,locals_id,parent_block,line_num){var root=new $Node('module')
root.module=module
root.id=locals_id
root.binding={__doc__:true,__name__:true,__file__:true,__package__:true}
root.parent_block=parent_block
root.line_num=line_num
root.indent=-1
root.comments=[]
root.imports={}
if(typeof src=="object"){root.is_comp=src.is_comp
root.filename=src.filename
if(src.has_annotations){root.binding.__annotations__=true}
src=src.src}
root.src=src
return root}
$B.py2js=function(src,module,locals_id,parent_scope,line_num){
$pos=0
line_num=line_num ||1
if(typeof module=="object"){var __package__=module.__package__
module=module.__name__}else{var __package__=""}
parent_scope=parent_scope ||$B.builtins_scope
var t0=new Date().getTime(),is_comp=false,has_annotations=true,
line_info,
ix,
filename
if(typeof src=='object'){var is_comp=src.is_comp,has_annotations=src.has_annotations,line_info=src.line_info,ix=src.ix,filename=src.filename
if(line_info !==undefined){line_num=parseInt(line_info.split(",")[0])}
src=src.src}
src=src.replace(/\r\n/gm,"\n")
if(src.endsWith("\\")&& !src.endsWith("\\\\")){src=src.substr(0,src.length-1)}
if(src.charAt(src.length-1)!="\n"){src+="\n"}
var locals_is_module=Array.isArray(locals_id)
if(locals_is_module){locals_id=locals_id[0]}
var internal=locals_id.charAt(0)=='$'
var local_ns='$locals_'+locals_id.replace(/\./g,'_')
var global_ns='$locals_'+module.replace(/\./g,'_')
var root=$create_root_node(
{src:src,is_comp:is_comp,has_annotations:has_annotations,filename:filename},module,locals_id,parent_scope,line_num)
dispatch_tokens(root,src)
root.is_comp=is_comp
if(ix !=undefined){root.ix=ix}
root.transform()
var js='var $B = __BRYTHON__,\n'+
'    _b_ = __BRYTHON__.builtins,\n'
if(is_comp){js+='    '+local_ns+' = {},\n'+
'    $locals = '+local_ns+';\n'}else{js+='    $locals = '+local_ns+';\n'}
var offset=0
root.insert(0,$NodeJS(js))
offset++
root.insert(offset++,$NodeJS(local_ns+'.__package__ = "'+__package__+'"'))
if(root.binding.__annotations__){root.insert(offset++,$NodeJS('$locals.__annotations__ = $B.empty_dict()'))}
var enter_frame_pos=offset,js='var $top_frame = ["'+locals_id.replace(/\./g,'_')+'", '+
local_ns+', "'+module.replace(/\./g,'_')+'", '+
global_ns+']\n$locals.$f_trace = $B.enter_frame($top_frame)\n'+
'var $stack_length = $B.frames_stack.length;'
root.insert(offset++,$NodeJS(js))
var try_node=new $NodeJS('try'),children=root.children.slice(enter_frame_pos+1,root.children.length)
root.insert(enter_frame_pos+1,try_node)
if(children.length==0){children=[$NodeJS('')]}
children.forEach(function(child){try_node.add(child)})
try_node.add($NodeJS('$B.leave_frame({$locals, value: _b_.None})'))
root.children.splice(enter_frame_pos+2,root.children.length)
var catch_node=$NodeJS('catch(err)')
catch_node.add($NodeJS('$B.leave_frame({$locals, value: _b_.None})'))
catch_node.add($NodeJS('throw err'))
root.add(catch_node)
$add_line_num(root,null,line_info)
var t1=new Date().getTime()
if($B.debug > 2){if(module==locals_id){console.log('module '+module+' translated in '+
(t1-t0)+' ms')}}
$B.compile_time+=t1-t0
return root}
$B.set_import_paths=function(){
var meta_path=[],path_hooks=[]
if($B.use_VFS){meta_path.push($B.finders.VFS)}
if($B.$options.static_stdlib_import !==false && $B.protocol !="file"){
meta_path.push($B.finders.stdlib_static)
if($B.path.length > 3){$B.path.shift()
$B.path.shift()}}
if($B.protocol !=="file"){meta_path.push($B.finders.path)
path_hooks.push($B.url_hook)}
if($B.$options.cpython_import){if($B.$options.cpython_import=="replace"){$B.path.pop()}
meta_path.push($B.finders.CPython)}
$B.meta_path=meta_path
$B.path_hooks=path_hooks}
var brython=$B.parser.brython=function(options){
if(options===undefined){options={'debug':1}}
if(typeof options=='number'){options={'debug':options}}
if(options.debug===undefined){options.debug=1}
$B.debug=options.debug
_b_.__debug__=$B.debug > 0
$B.compile_time=0
if(options.profile===undefined){options.profile=0}
$B.profile=options.profile
if(options.indexedDB===undefined){options.indexedDB=true}
if(options.static_stdlib_import===undefined){options.static_stdlib_import=true}
$B.static_stdlib_import=options.static_stdlib_import
$B.$options=options
$B.set_import_paths()
var $href=$B.script_path=_window.location.href,$href_elts=$href.split('/')
$href_elts.pop()
if($B.isWebWorker ||$B.isNode){$href_elts.pop()}
$B.curdir=$href_elts.join('/')
if(options.pythonpath !==undefined){$B.path=options.pythonpath
$B.$options.static_stdlib_import=false}
if(options.python_paths){options.python_paths.forEach(function(path){var lang,prefetch
if(typeof path !=="string"){lang=path.lang
prefetch=path.prefetch
path=path.path}
$B.path.push(path)
if(path.slice(-7).toLowerCase()=='.vfs.js' &&
(prefetch===undefined ||prefetch===true)){$B.path_importer_cache[path+'/']=
$B.imported['_importlib'].VFSPathFinder(path)}
if(lang){_importlib.optimize_import_for_path(path,lang)}})}
if(!($B.isWebWorker ||$B.isNode)){
var path_links=document.querySelectorAll('head link[rel~=pythonpath]'),_importlib=$B.imported['_importlib']
for(var i=0,e;e=path_links[i];++i){var href=e.href;
if((' '+e.rel+' ').indexOf(' prepend ')!=-1){$B.path.unshift(href);}else{$B.path.push(href);}
var filetype=e.hreflang
if(filetype){if(filetype.slice(0,2)=='x-'){filetype=filetype.slice(2)}
_importlib.optimize_import_for_path(e.href,filetype)}}}
if($B.$options.args){$B.__ARGV=$B.$options.args}else{$B.__ARGV=_b_.list.$factory([])}
if(!($B.isWebWorker ||$B.isNode)){_run_scripts(options)}}
$B.run_script=function(src,name,url,run_loop){
$B.$py_module_path[name]=$B.script_path
try{var root=$B.py2js(src,name,name),js=root.to_js(),script={__doc__:root.__doc__,js:js,__name__:name,$src:src,__file__:url}
$B.file_cache[script.__file__]=src
if($B.debug > 1){console.log(js)}}catch(err){$B.handle_error(err)}
if($B.hasOwnProperty("VFS")&& $B.has_indexedDB){
var imports1=Object.keys(root.imports).slice(),imports=imports1.filter(function(item){return $B.VFS.hasOwnProperty(item)})
Object.keys(imports).forEach(function(name){if($B.VFS.hasOwnProperty(name)){var submodule=$B.VFS[name],type=submodule[0]
if(type==".py"){var src=submodule[1],subimports=submodule[2],is_package=submodule.length==4
if(type==".py"){
required_stdlib_imports(subimports)}
subimports.forEach(function(mod){if(imports.indexOf(mod)==-1){imports.push(mod)}})}}})
for(var j=0;j < imports.length;j++){$B.tasks.push([$B.inImported,imports[j]])}
root=null}
$B.tasks.push(["execute",script])
if(run_loop){$B.loop()}}
var $log=$B.$log=function(js){js.split("\n").forEach(function(line,i){console.log(i+1,":",line)})}
var _run_scripts=$B.parser._run_scripts=function(options){
var kk=Object.keys(_window)
var defined_ids={},$elts=[],webworkers=[]
var ids=options.ids ||options.ipy_id
if(ids !==undefined){if(!Array.isArray(ids)){throw _b_.ValueError.$factory("ids is not a list")}
var scripts=[]
options.ids.forEach(function(id){var elt=document.getElementById(id)
if(elt===null){throw _b_.KeyError.$factory(`no script with id '${id}'`)}
if(elt.tagName !=="SCRIPT"){throw _b_.KeyError.$factory(`element ${id} is not a script`)}
scripts.push(elt)})}else{var scripts=document.getElementsByTagName('script')}
for(var i=0;i < scripts.length;i++){var script=scripts[i]
if(script.type=="text/python" ||script.type=="text/python3"){if(script.className=="webworker"){if(script.id===undefined){throw _b_.AttributeError.$factory(
"webworker script has no attribute 'id'")}
webworkers.push(script)}else{$elts.push(script)}}}
var first_script=true,module_name
if(options.ipy_id !==undefined){module_name='__main__'
var $src="",js,root
$B.$py_module_path[module_name]=$B.script_path
$elts.forEach(function(elt){$src+=(elt.innerHTML ||elt.textContent)})
try{
root=$B.py2js($src,module_name,module_name)
js=root.to_js()
if($B.debug > 1){$log(js)}
eval(js)
$B.clear_ns(module_name)
root=null
js=null}catch($err){root=null
js=null
console.log($err)
if($B.debug > 1){console.log($err)
for(var attr in $err){console.log(attr+' : ',$err[attr])}}
if($err.$py_error===undefined){console.log('Javascript error',$err)
$err=_b_.RuntimeError.$factory($err+'')}
var $trace=$B.$getattr($err,'info')+'\n'+$err.__name__+
': '+$err.args
try{$B.$getattr($B.stderr,'write')($trace)}catch(print_exc_err){console.log($trace)}
throw $err}}else{if($elts.length > 0){if(options.indexedDB && $B.has_indexedDB &&
$B.hasOwnProperty("VFS")){$B.tasks.push([$B.idb_open])}}
for(var i=0;i < $elts.length;i++){var elt=$elts[i]
if(elt.id){if(defined_ids[elt.id]){throw Error("Brython error : Found 2 scripts with the "+
"same id '"+elt.id+"'")}else{defined_ids[elt.id]=true}}}
var src
for(var i=0,len=webworkers.length;i < len;i++){var worker=webworkers[i]
if(worker.src){
$B.tasks.push([$B.ajax_load_script,{name:worker.id,url:worker.src,is_ww:true}])}else{
src=(worker.innerHTML ||worker.textContent)
src=unindent(src)
src=src.replace(/^\n/,'')
$B.webworkers[worker.id]=src}}
for(var i=0;i < $elts.length;i++){var elt=$elts[i]
if(elt.type=="text/python" ||elt.type=="text/python3"){
if(elt.id){module_name=elt.id}else{
if(first_script){module_name='__main__'
first_script=false}else{module_name='__main__'+$B.UUID()}
while(defined_ids[module_name]!==undefined){module_name='__main__'+$B.UUID()}}
if(elt.src){
$B.tasks.push([$B.ajax_load_script,{name:module_name,url:elt.src}])}else{
src=(elt.innerHTML ||elt.textContent)
src=unindent(src)
src=src.replace(/^\n/,'')
$B.tasks.push([$B.run_script,src,module_name,$B.script_path+"#"+module_name,true])}}}}
if(options.ipy_id===undefined){$B.loop()}}
$B.$operators=$operators
$B.$Node=$Node
$B.$NodeJSCtx=$NodeJSCtx
$B.brython=brython})(__BRYTHON__)
var brython=__BRYTHON__.brython
if(__BRYTHON__.isNode){global.__BRYTHON__=__BRYTHON__
module.exports={__BRYTHON__ }}
;

(function($B){var _b_=$B.builtins
if($B.VFS_timestamp && $B.VFS_timestamp > $B.timestamp){
$B.timestamp=$B.VFS_timestamp}
function idb_load(evt,module){
var res=evt.target.result
var timestamp=$B.timestamp
if(res===undefined ||res.timestamp !=$B.timestamp ||
($B.VFS[module]&& res.source_ts !==$B.VFS[module].timestamp)){
if($B.VFS[module]!==undefined){var elts=$B.VFS[module],ext=elts[0],source=elts[1]
if(ext==".py"){var imports=elts[2],is_package=elts.length==4,source_ts=elts.timestamp,__package__
if(is_package){__package__=module}
else{var parts=module.split(".")
parts.pop()
__package__=parts.join(".")}
$B.imported[module]=$B.module.$factory(module,"",__package__)
try{var root=$B.py2js(source,module,module),js=root.to_js()}catch(err){$B.handle_error(err)}
delete $B.imported[module]
if($B.debug > 1){console.log("precompile",module)}
var parts=module.split(".")
if(parts.length > 1){parts.pop()}
if($B.stdlib.hasOwnProperty(parts.join("."))){var imports=elts[2]
imports=imports.join(",")
$B.tasks.splice(0,0,[store_precompiled,module,js,source_ts,imports,is_package])}}else{console.log('bizarre',module,ext)}}else{}}else{
if(res.is_package){$B.precompiled[module]=[res.content]}else{$B.precompiled[module]=res.content}
if(res.imports.length > 0){
if($B.debug > 1){console.log(module,"imports",res.imports)}
var subimports=res.imports.split(",")
for(var i=0;i < subimports.length;i++){var subimport=subimports[i]
if(subimport.startsWith(".")){
var url_elts=module.split("."),nb_dots=0
while(subimport.startsWith(".")){nb_dots++
subimport=subimport.substr(1)}
var elts=url_elts.slice(0,nb_dots)
if(subimport){elts=elts.concat([subimport])}
subimport=elts.join(".")}
if(!$B.imported.hasOwnProperty(subimport)&&
!$B.precompiled.hasOwnProperty(subimport)){
if($B.VFS.hasOwnProperty(subimport)){var submodule=$B.VFS[subimport],ext=submodule[0],source=submodule[1]
if(submodule[0]==".py"){$B.tasks.splice(0,0,[idb_get,subimport])}else{add_jsmodule(subimport,source)}}}}}}
loop()}
function store_precompiled(module,js,source_ts,imports,is_package){
var db=$B.idb_cx.result,tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules"),cursor=store.openCursor(),data={"name":module,"content":js,"imports":imports,"origin":origin,"timestamp":__BRYTHON__.timestamp,"source_ts":source_ts,"is_package":is_package},request=store.put(data)
if($B.debug > 1){console.log("store precompiled",module,"package",is_package)}
document.dispatchEvent(new CustomEvent('precompile',{detail:'cache module '+module}))
var ix=$B.outdated.indexOf(module)
if(ix >-1){$B.outdated.splice(ix,1)}
request.onsuccess=function(evt){
$B.tasks.splice(0,0,[idb_get,module])
loop()}}
function idb_get(module){
var db=$B.idb_cx.result,tx=db.transaction("modules","readonly")
try{var store=tx.objectStore("modules")
req=store.get(module)
req.onsuccess=function(evt){idb_load(evt,module)}}catch(err){console.info('error',err)}}
$B.idb_open=function(obj){$B.idb_name="brython-cache"
var idb_cx=$B.idb_cx=indexedDB.open($B.idb_name)
idb_cx.onsuccess=function(){var db=idb_cx.result
if(!db.objectStoreNames.contains("modules")){var version=db.version
db.close()
console.info('create object store',version)
idb_cx=indexedDB.open($B.idb_name,version+1)
idb_cx.onupgradeneeded=function(){console.info("upgrade needed")
var db=$B.idb_cx.result,store=db.createObjectStore("modules",{"keyPath":"name"})
store.onsuccess=loop}
idb_cx.onversionchanged=function(){console.log("version changed")}
idb_cx.onsuccess=function(){console.info("db opened",idb_cx)
var db=idb_cx.result,store=db.createObjectStore("modules",{"keyPath":"name"})
store.onsuccess=loop}}else{if($B.debug > 1){console.info("using indexedDB for stdlib modules cache")}
var tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules"),record,outdated=[]
var openCursor=store.openCursor()
openCursor.onerror=function(evt){console.log("open cursor error",evt)}
openCursor.onsuccess=function(evt){cursor=evt.target.result
if(cursor){record=cursor.value
if(record.timestamp==$B.timestamp){if(!$B.VFS ||!$B.VFS[record.name]||
$B.VFS[record.name].timestamp==record.source_ts){
if(record.is_package){$B.precompiled[record.name]=[record.content]}else{$B.precompiled[record.name]=record.content}
if($B.debug > 1){console.info("load from cache",record.name)}}else{
outdated.push(record.name)}}else{outdated.push(record.name)}
cursor.continue()}else{if($B.debug > 1){console.log("done")}
$B.outdated=outdated
loop()}}}}
idb_cx.onupgradeneeded=function(){console.info("upgrade needed")
var db=idb_cx.result,store=db.createObjectStore("modules",{"keyPath":"name"})
store.onsuccess=loop}
idb_cx.onerror=function(){console.info('could not open indexedDB database')
$B.idb_cx=null
$B.idb_name=null
$B.$options.indexedDB=false
loop()}}
$B.ajax_load_script=function(script){var url=script.url,name=script.name
if($B.files && $B.files.hasOwnProperty(name)){$B.tasks.splice(0,0,[$B.run_script,$B.files[name],name,url,true])}else if($B.protocol !="file"){var req=new XMLHttpRequest(),qs=$B.$options.cache ? '' :
(url.search(/\?/)>-1 ? '&' :'?')+Date.now()
req.open("GET",url+qs,true)
req.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){var src=this.responseText
if(script.is_ww){$B.webworkers[name]=src}else{$B.tasks.splice(0,0,[$B.run_script,src,name,url,true])}
loop()}else if(this.status==404){throw Error(url+" not found")}}}
req.send()}else{throw _b_.IOError.$factory("can't load external script at "+
script.url+" (Ajax calls not supported with protocol file:///)")}}
function add_jsmodule(module,source){
source+="\nvar $locals_"+
module.replace(/\./g,"_")+" = $module"
$B.precompiled[module]=source}
var inImported=$B.inImported=function(module){if($B.imported.hasOwnProperty(module)){}else if(__BRYTHON__.VFS && __BRYTHON__.VFS.hasOwnProperty(module)){var elts=__BRYTHON__.VFS[module]
if(elts===undefined){console.log('bizarre',module)}
var ext=elts[0],source=elts[1],is_package=elts.length==4
if(ext==".py"){if($B.idb_cx && !$B.idb_cx.$closed){$B.tasks.splice(0,0,[idb_get,module])}}else{add_jsmodule(module,source)}}else{console.log("bizarre",module)}
loop()}
var loop=$B.loop=function(){if($B.tasks.length==0){
if($B.idb_cx && ! $B.idb_cx.$closed){var db=$B.idb_cx.result,tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules")
while($B.outdated.length > 0){var module=$B.outdated.pop(),req=store.delete(module)
req.onsuccess=function(event){if($B.debug > 1){console.info("delete outdated",module)}
document.dispatchEvent(new CustomEvent('precompile',{detail:'remove outdated '+module+
' from cache'}))}}
document.dispatchEvent(new CustomEvent('precompile',{detail:"close"}))
$B.idb_cx.result.close()
$B.idb_cx.$closed=true}
document.dispatchEvent(new CustomEvent("brython_done",{detail:$B.obj_dict($B.$options)}))
return}
var task=$B.tasks.shift(),func=task[0],args=task.slice(1)
if(func=="execute"){try{var script=task[1],script_id=script.__name__.replace(/\./g,"_"),module=$B.module.$factory(script.__name__)
module.$src=script.$src
module.__file__=script.__file__
$B.imported[script_id]=module
new Function("$locals_"+script_id,script.js)(module)}catch(err){
if(err.__class__===undefined){console.log('Javascript error',err)
if($B.is_recursion_error(err)){err=_b_.RecursionError.$factory("too much recursion")}else{$B.print_stack()
err=_b_.RuntimeError.$factory(err+'')}}
if($B.debug > 1){console.log("handle error",err.__class__,err.args,err.$stack)
console.log($B.frames_stack.slice())}
$B.handle_error(err)}
loop()}else{
try{func.apply(null,args)}catch(err){$B.handle_error(err)}}}
$B.tasks=[]
$B.has_indexedDB=self.indexedDB !==undefined
$B.handle_error=function(err){
if($B.debug > 1){console.log("handle error",err.__class__,err.args,'stderr',$B.stderr)}
if(err.__class__ !==undefined){var name=$B.class_name(err),trace=$B.$getattr(err,'info')
if(name=='SyntaxError' ||name=='IndentationError'){var offset=err.args[1][2]
trace+='\n    '+' '.repeat(offset)+'^'+
'\n'+name+': '+err.args[0]}else{trace+='\n'+name
if(err.args[0]!==undefined && err.args[0]!==_b_.None){trace+=': '+_b_.str.$factory(err.args[0])}}}else{console.log(err)
trace=err+""}
try{$B.$getattr($B.stderr,'write')(trace)
var flush=$B.$getattr($B.stderr,'flush',_b_.None)
if(flush !==_b_.None){flush()}}catch(print_exc_err){console.debug(trace)}
throw err}
function required_stdlib_imports(imports,start){
var nb_added=0
start=start ||0
for(var i=start;i < imports.length;i++){var module=imports[i]
if($B.imported.hasOwnProperty(module)){continue}
var mod_obj=$B.VFS[module]
if(mod_obj===undefined){console.log("undef",module)}
if(mod_obj[0]==".py"){var subimports=mod_obj[2]
subimports.forEach(function(subimport){if(!$B.imported.hasOwnProperty(subimport)&&
imports.indexOf(subimport)==-1){if($B.VFS.hasOwnProperty(subimport)){imports.push(subimport)
nb_added++}}})}}
if(nb_added){required_stdlib_imports(imports,imports.length-nb_added)}
return imports}})(__BRYTHON__)
;
__BRYTHON__.builtins.object=(function($B){var _b_=$B.builtins
var object={
$infos:{__name__:"object"},$is_class:true,$native:true}
var opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or"]
var opsigns=["+","-","*","/","//","%","**","<<",">>","&","^","|"]
object.__delattr__=function(self,attr){attr=$B.from_alias(attr)
if(self.__dict__ && self.__dict__.$string_dict &&
self.__dict__.$string_dict[attr]!==undefined){delete self.__dict__.$string_dict[attr]
return _b_.None}else if(self.__dict__===undefined && self[attr]!==undefined){delete self[attr]
return _b_.None}else{
var klass=self.__class__
if(klass){var prop=$B.$getattr(klass,attr)
if(prop.__class__===_b_.property){if(prop.__delete__ !==undefined){prop.__delete__(self)
return _b_.None}}}}
throw _b_.AttributeError.$factory(attr)}
object.__dir__=function(self){var objects
if(self.$is_class){objects=[self].concat(self.__mro__)}else{var klass=self.__class__ ||$B.get_class(self)
objects=[self,klass].concat(klass.__mro__)}
var res=[]
for(var i=0,len=objects.length;i < len;i++){for(var attr in objects[i]){if(attr.charAt(0)=="$"){if(attr.charAt(1)=="$"){
res.push(attr.substr(2))}
continue}
if(! isNaN(parseInt(attr.charAt(0)))){
continue}
if(attr=="__mro__"){continue}
res.push(attr)}}
if(self.__dict__){for(var attr in self.__dict__.$string_dict){if(attr.substr(0,2)=="$$"){res.push(attr.substr(2))}
else if(attr.charAt(0)!="$"){res.push(attr)}}}
res=_b_.list.$factory(_b_.set.$factory(res))
_b_.list.sort(res)
return res}
object.__eq__=function(self,other){
if(self===other){return true}
return _b_.NotImplemented}
object.__format__=function(){var $=$B.args("__format__",2,{self:null,spec:null},["self","spec"],arguments,{},null,null)
if($.spec !==""){throw _b_.TypeError.$factory(
"non-empty format string passed to object.__format__")}
return _b_.getattr($.self,"__str__")()}
object.__ge__=function(){return _b_.NotImplemented}
object.__getattribute__=function(obj,attr){var klass=obj.__class__ ||$B.get_class(obj),is_own_class_instance_method=false
var $test=false 
if($test){console.log("attr",attr,"de",obj,"klass",klass)}
if(attr==="__class__"){return klass}
var res=obj[attr]
if(Array.isArray(obj)&& Array.prototype[attr]!==undefined){
res=undefined}
if(res===undefined && obj.__dict__){var dict=obj.__dict__,attr1=$B.from_alias(attr)
if(dict.$string_dict.hasOwnProperty(attr1)){if($test){console.log("__dict__ hasOwnProperty",attr1,dict.$string_dict[attr1])}
return dict.$string_dict[attr1][0]}}
if(res===undefined){
function check(obj,kl,attr){var v=kl[attr]
if(v !==undefined){return v}}
res=check(obj,klass,attr)
if(res===undefined){var mro=klass.__mro__
for(var i=0,len=mro.length;i < len;i++){res=check(obj,mro[i],attr)
if(res !==undefined){if($test){console.log("found in",mro[i])}
break}}}else{if(res.__class__ !==$B.method && res.__get__===undefined){
is_own_class_instance_method=true}}}else{if(res.__set__===undefined){
return res}}
if(res !==undefined){if($test){console.log(res)}
if(res.__class__===_b_.property){return res.__get__(res,obj,klass)}
if(res.__class__===$B.method){if($test){console.log("res is method")}
if(res.__get__===undefined){console.log("bizarre",obj,attr,res)}
return res.__get__(obj,klass)}
var get=res.__get__
if(get===undefined && res.__class__){var get=res.__class__.__get__
for(var i=0;i < res.__class__.__mro__.length &&
get===undefined;i++){get=res.__class__.__mro__[i].__get__}}
if($test){console.log("get",get)}
var __get__=get===undefined ? null :
$B.$getattr(res,"__get__",null)
if($test){console.log("__get__",__get__)}
if(__get__ !==null){try{return __get__.apply(null,[obj,klass])}
catch(err){
throw err}}
if(typeof res=="object"){if(__get__ &&(typeof __get__=="function")){get_func=function(x,y){return __get__.apply(x,[y,klass.$factory])}}}
if(__get__===null &&(typeof res=="function")){__get__=function(x){return x}}
if(__get__ !==null){
res.__name__=attr
if(attr=="__new__" ||
res.__class__===$B.builtin_function){res.$type="staticmethod"}
var res1=__get__.apply(null,[res,obj,klass])
if($test){console.log("res",res,"res1",res1)}
if(typeof res1=="function"){
if(res1.__class__===$B.method){return res}
if(res.$type=="staticmethod"){return res}
else{var self=res.__class__===$B.method ? klass :obj,method=function(){var args=[self]
for(var i=0,len=arguments.length;i < len;i++){args.push(arguments[i])}
return res.apply(this,args)}
method.__class__=$B.method
method.__get__=function(obj,cls){var clmethod=res.bind(null,cls)
clmethod.__class__=$B.method
clmethod.$infos={__self__:cls,__func__:res,__name__:res.$infos.__name__,__qualname__:cls.$infos.__name__+"."+
res.$infos.__name__}
return clmethod}
method.__get__.__class__=$B.method_wrapper
method.__get__.$infos=res.$infos
if(klass.$infos===undefined){console.log("no $infos",klass)
console.log($B.last($B.frames_stack))}
method.$infos={__self__:self,__func__:res,__name__:attr,__qualname__:klass.$infos.__name__+"."+attr}
if($test){console.log("return method",method)}
if(is_own_class_instance_method){obj.$method_cache=obj.$method_cache ||{}
obj.$method_cache[attr]=[method,res]}
return method}}else{
return res1}}
return res}else{
var _ga=obj["__getattr__"]
if(_ga===undefined){_ga=klass["__getattr__"]
if(_ga===undefined){var mro=klass.__mro__
for(var i=0,len=mro.length;i < len;i++){_ga=mro[i]["__getattr__"]
if(_ga !==undefined){break}}}}
if(_ga !==undefined){if(klass===$B.module){return _ga(attr)}
return _ga(obj,attr)}else{throw _b_.AttributeError.$factory(attr)}}}
object.__gt__=function(){return _b_.NotImplemented}
object.__hash__=function(self){var hash=self.__hashvalue__
if(hash !==undefined){return hash}
return self.__hashvalue__=$B.$py_next_hash--}
object.__init__=function(){if(arguments.length==0){throw _b_.TypeError.$factory("descriptor '__init__' of 'object' "+
"object needs an argument")}
return _b_.None}
object.__init_subclass__=function(){
var $=$B.args("__init_subclass__",0,{},[],arguments,{},null,null)
return _b_.None}
object.__init_subclass__.$type="staticmethod"
object.__le__=function(){return _b_.NotImplemented}
object.__lt__=function(){return _b_.NotImplemented}
object.__mro__=[]
object.__new__=function(cls,...args){if(cls===undefined){throw _b_.TypeError.$factory("object.__new__(): not enough arguments")}
var init_func=$B.$getattr(cls,"__init__")
if(init_func===object.__init__){if(args.length > 0){throw _b_.TypeError.$factory("object() takes no parameters")}}
return{
__class__ :cls,__dict__:$B.empty_dict()}}
object.__ne__=function(self,other){
if(self===other){return false}
var eq=$B.$getattr(self,"__eq__",null)
if(eq !==null){var res=$B.$call(eq)(other)
if(res===_b_.NotImplemented){return res}
return ! $B.$bool(res)}
return _b_.NotImplemented}
object.__reduce__=function(self){function _reconstructor(cls){return $B.$call(cls)()}
_reconstructor.$infos={__qualname__:"_reconstructor"}
var res=[_reconstructor]
res.push(_b_.tuple.$factory([self.__class__].
concat(self.__class__.__mro__)))
var d=$B.empty_dict()
for(var attr in self.__dict__.$string_dict){_b_.dict.$setitem(d.$string_dict,attr,self.__dict__.$string_dict[attr][0])}
console.log("object.__reduce__, d",d)
res.push(d)
return _b_.tuple.$factory(res)}
function __newobj__(cls){return $B.$getattr(cls,"__new__").apply(null,arguments)}
__newobj__.$infos={__name__:"__newobj__",__qualname__:"__newobj__"}
_b_.__newobj__=__newobj__
object.__reduce_ex__=function(self){var res=[__newobj__]
var arg2=_b_.tuple.$factory([self.__class__])
if(Array.isArray(self)){self.forEach(function(item){arg2.push(item)})}
res.push(arg2)
var d=$B.empty_dict(),nb=0
if(self.__dict__===undefined){throw _b_.TypeError.$factory("cannot pickle '"+
$B.class_name(self)+"' object")}
for(var attr in self.__dict__.$string_dict){if(attr=="__class__" ||attr.startsWith("$")){continue}
_b_.dict.$setitem(d,attr,self.__dict__.$string_dict[attr][0])
nb++}
if(nb==0){d=_b_.None}
res.push(d)
res.push(_b_.None)
return _b_.tuple.$factory(res)}
object.__repr__=function(self){if(self===object){return "<class 'object'>"}
if(self.__class__===_b_.type){return "<class '"+self.__name__+"'>"}
var module=self.__class__.$infos.__module__
if(module !==undefined && !module.startsWith("$")&&
module !=="builtins"){return "<"+self.__class__.$infos.__module__+"."+
$B.class_name(self)+" object>"}else{return "<"+$B.class_name(self)+" object>"}}
object.__setattr__=function(self,attr,val){if(val===undefined){
throw _b_.TypeError.$factory(
"can't set attributes of built-in/extension type 'object'")}else if(self.__class__===object){
if(object[attr]===undefined){throw _b_.AttributeError.$factory(
"'object' object has no attribute '"+attr+"'")}else{throw _b_.AttributeError.$factory(
"'object' object attribute '"+attr+"' is read-only")}}
if($B.aliased_names[attr]){attr="$$"+attr}
if(self.__dict__){_b_.dict.$setitem(self.__dict__,attr,val)}else{
self[attr]=val}
return _b_.None}
object.__setattr__.__get__=function(obj){return function(attr,val){object.__setattr__(obj,attr,val)}}
object.__setattr__.__str__=function(){return "method object.setattr"}
object.__str__=function(self){
var len=arguments.length
if(len==0){throw _b_.TypeError.$factory("descriptor '__str__' of 'object' "+
"object needs an argument")}else if(len > 1){throw _b_.TypeError.$factory("descriptor '__str__' of 'object' "+
"expects 1 argument, got "+len)}else if(self.$nat=='kw'){throw _b_.TypeError.$factory("descriptor '__str__' of 'object' "+
"doesn't accept keyword arguments")}
if(self.$is_class ||self.$factory){var class_str=$B.$getattr(self.__class__ ||$B.get_class(self),'__str__',null)
if(class_str !==null && class_str !==object.__str__){return class_str(self)}
var class_repr=$B.$getattr(self.__class__ ||$B.get_class(self),'__repr__',null)
if(class_repr !==null && class_repr !==object.__repr__){return class_repr(self)}}else{
var repr_func=$B.$getattr(self,"__repr__")
return $B.$call(repr_func)()}}
object.__subclasshook__=function(){return _b_.NotImplemented}
object.$factory=function(){var res={__class__:object},args=[res].concat(Array.prototype.slice.call(arguments))
object.__init__.apply(null,args)
return res}
$B.set_func_names(object,"builtins")
$B.make_class=function(name,factory){
var A={__class__:_b_.type,__mro__:[object],$infos:{__name__:name},$is_class:true}
A.$factory=factory
return A}
return object})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
$B.$class_constructor=function(class_name,class_obj,bases,parents_names,kwargs){bases=bases ||[]
var metaclass
var module=class_obj.__module__
if(module===undefined){
module=class_obj.__module__=$B.last($B.frames_stack)[2]}
for(var i=0;i < bases.length;i++){if(bases[i]===undefined){
$B.line_info=class_obj.$def_line
throw _b_.NameError.$factory("name '"+parents_names[i]+
"' is not defined")}}
var extra_kwargs={},prepare_kwargs={}
if(kwargs){for(var i=0;i < kwargs.length;i++){var key=kwargs[i][0],val=kwargs[i][1]
if(key=="metaclass"){
metaclass=val}else{
extra_kwargs[key]=val}
prepare_kwargs[key]=val}}
var mro0=class_obj
if(class_obj.__eq__ !==undefined && class_obj.__hash__===undefined){class_obj.__hash__=_b_.None}
var orig_bases=bases.slice(),use_mro_entries=false
for(var i=0;i < bases.length;i++){if(bases[i]===undefined ||
(bases[i].__mro__===undefined)){var mro_entries=$B.$getattr(bases[i],"__mro_entries__",_b_.None)
if(mro_entries !==_b_.None){var entries=_b_.list.$factory(mro_entries(bases))
bases.splice(i,1,...entries)
use_mro_entries=true
i--
continue}}}
if(metaclass===undefined){if(bases && bases.length > 0){metaclass=bases[0].__class__
if(metaclass===undefined){
if(typeof bases[0]=="function"){if(bases.length !=1){throw _b_.TypeError.$factory("A Brython class "+
"can inherit at most 1 Javascript constructor")}
metaclass=bases[0].__class__=$B.JSMeta
$B.set_func_names(bases[0],module)}else{throw _b_.TypeError.$factory("Argument of "+class_name+
"is not a class (type '"+$B.class_name(bases[0])+
"')")}}
for(var i=1;i < bases.length;i++){var mc=bases[i].__class__
if(mc===metaclass ||_b_.issubclass(metaclass,mc)){}else if(_b_.issubclass(mc,metaclass)){metaclass=mc}else if(metaclass.__bases__ &&
metaclass.__bases__.indexOf(mc)==-1){throw _b_.TypeError.$factory("metaclass conflict: the "+
"metaclass of a derived class must be a (non-"+
"strict) subclass of the metaclasses of all its bases")}}}else{metaclass=_b_.type}}
var prepare=$B.$getattr(metaclass,"__prepare__",_b_.None),cl_dict=$B.$call(prepare)(class_name,bases)
if(cl_dict.__class__ !==_b_.dict){var set_class_item=$B.$getattr(cl_dict,"__setitem__")}else{var set_class_item=function(attr,value){cl_dict.$string_dict[attr]=[value,cl_dict.$order++]}}
for(var attr in class_obj){if(attr=="__annotations__"){if(cl_dict.$string_dict[attr]===undefined){cl_dict.$string_dict[attr]=[$B.empty_dict(),cl_dict.$order++]}
for(var key in class_obj[attr].$string_dict){$B.$setitem(cl_dict.$string_dict[attr][0],key,class_obj[attr].$string_dict[key][0])}}else{if(attr.charAt(0)!="$" ||attr.substr(0,2)=="$$"){set_class_item(attr,class_obj[attr])}}}
if(use_mro_entries){set_class_item("__orig_bases__",_b_.tuple.$factory(orig_bases))}
var class_dict={__bases__:bases,__class__:metaclass,__dict__:cl_dict}
if(cl_dict.__class__===_b_.dict){for(var key in cl_dict.$string_dict){class_dict[key]=cl_dict.$string_dict[key][0]}}else{var get_class_item=$B.$getattr(cl_dict,"__getitem__")
var it=_b_.iter(cl_dict)
while(true){try{var key=_b_.next(it)
class_dict[key]=get_class_item(key)}catch(err){break}}}
class_dict.__mro__=_b_.type.mro(class_dict).slice(1)
var is_instanciable=true,non_abstract_methods={},abstract_methods={},mro=[class_dict].concat(class_dict.__mro__)
for(var i=0;i < mro.length;i++){var kdict=i==0 ? mro0 :mro[i]
for(var attr in kdict){if(non_abstract_methods[attr]){continue}
var v=kdict[attr]
if(typeof v=="function"){if(v.__isabstractmethod__===true ||
(v.$attrs && v.$attrs.__isabstractmethod__)){is_instanciable=false
abstract_methods[attr]=true}else{non_abstract_methods[attr]=true}}}}
var _slots=class_obj.__slots__
if(_slots !==undefined){if(typeof _slots=="string"){_slots=[_slots]}else{_slots=_b_.list.$factory(_slots)}
cl_dict.__slots__=_slots}
for(var i=0;i < mro.length-1;i++){for(var attr in mro[i]){if(attr=="__setattr__"){cl_dict.$has_setattr=true
break}else if(mro[i][attr]){if(mro[i][attr].__get__ ||(mro[i][attr].__class__ &&
mro[i][attr].__class__.__get__)){
cl_dict.$has_setattr=true
break}}}}
var meta_new=_b_.type.__getattribute__(metaclass,"__new__")
var kls=meta_new(metaclass,class_name,bases,cl_dict)
kls.__module__=module
kls.$infos={__module__:module,__name__:$B.from_alias(class_name),__qualname__:class_obj.$qualname}
kls.$subclasses=[]
for(var attr in class_obj){if(attr.charAt(0)!="$" ||attr.substr(0,2)=="$$"){if(typeof class_obj[attr]=="function"){class_obj[attr].$infos.$class=kls}}}
if(kls.__class__===metaclass){
var meta_init=_b_.type.__getattribute__(metaclass,"__init__")
meta_init(kls,class_name,bases,cl_dict)}
for(var i=0;i < bases.length;i++){bases[i].$subclasses=bases[i].$subclasses ||[]
bases[i].$subclasses.push(kls)}
var sup=_b_.$$super.$factory(kls,kls)
var init_subclass=_b_.$$super.__getattribute__(sup,"__init_subclass__")
init_subclass({$nat:"kw",kw:extra_kwargs})
if(!is_instanciable){function nofactory(){throw _b_.TypeError.$factory("Can't instantiate abstract class "+
"interface with abstract methods "+
Object.keys(abstract_methods).join(", "))}
kls.$factory=nofactory}
kls.__qualname__=class_name.replace("$$","")
return kls}
var type=$B.make_class("type",function(obj,bases,cl_dict){if(arguments.length==1){if(obj===undefined){return $B.UndefinedClass}
return obj.__class__ ||$B.get_class(obj)}
return type.__new__(type,obj,bases,cl_dict)}
)
type.__call__=function(){var extra_args=[],klass=arguments[0]
for(var i=1,len=arguments.length;i < len;i++){extra_args.push(arguments[i])}
var new_func=_b_.type.__getattribute__(klass,"__new__")
var instance=new_func.apply(null,arguments)
if(instance.__class__===klass){
var init_func=_b_.type.__getattribute__(klass,"__init__")
if(init_func !==_b_.object.__init__){
var args=[instance].concat(extra_args)
init_func.apply(null,args)}}
return instance}
type.__class__=type
type.__format__=function(klass,fmt_spec){
return _b_.str.$factory(klass)}
type.__getattribute__=function(klass,attr){switch(attr){case "__annotations__":
var mro=[klass].concat(klass.__mro__),res
for(var i=0,len=mro.length;i < len;i++){if(mro[i].__dict__){var ann=mro[i].__dict__.$string_dict.__annotations__[0]
if(ann){if(res===undefined){res=ann}else if(res.__class__===_b_.dict &&
ann.__class__===_b_.dict){
for(var key in ann.$string_dict){res.$string_dict[key]=ann.$string_dict[key]}}}}}
if(res===undefined){res=$B.empty_dict()}
return res
case "__bases__":
var res=klass.__bases__ ||_b_.tuple.$factory()
res.__class__=_b_.tuple
if(res.length==0){res.push(_b_.object)}
return res
case "__class__":
return klass.__class__
case "__doc__":
return klass.__doc__ ||_b_.None
case "__setattr__":
if(klass["__setattr__"]!==undefined){var func=klass["__setattr__"]}else{var func=function(obj,key,value){obj[key]=value}}
return method_wrapper.$factory(attr,klass,func)
case "__delattr__":
if(klass["__delattr__"]!==undefined){return klass["__delattr__"]}
return method_wrapper.$factory(attr,klass,function(key){delete klass[key]})}
var res=klass[attr]
var $test=false 
if($test){console.log("attr",attr,"of",klass,res,res+"")}
if(res===undefined && klass.__slots__ &&
klass.__slots__.indexOf(attr)>-1){return member_descriptor.$factory(attr,klass)}
if(klass.__class__ &&
klass.__class__[attr]&&
klass.__class__[attr].__get__ &&
klass.__class__[attr].__set__){
if($test){console.log("data descriptor")}
return klass.__class__[attr].__get__(klass)}
if(res===undefined){
var v=klass[attr]
if(v===undefined){var mro=klass.__mro__
if(mro===undefined){console.log("pas de mro pour",klass)}
for(var i=0;i < mro.length;i++){var v=mro[i][attr]
if(v !==undefined){res=v
break}}}else{res=v}
if(res===undefined){
var meta=klass.__class__ ||$B.get_class(klass),res=meta[attr]
if($test){console.log("search in meta",meta,res)}
if(res===undefined){var meta_mro=meta.__mro__
for(var i=0;i < meta_mro.length;i++){var res=meta_mro[i][attr]
if(res !==undefined){break}}}
if(res !==undefined){if($test){console.log("found in meta",res,typeof res)}
if(res.__class__===_b_.property){return res.fget(klass)}
if(typeof res=="function"){
var meta_method=res.bind(null,klass)
meta_method.__class__=$B.method
meta_method.$infos={__self__:klass,__func__:res,__name__:attr,__qualname__:klass.$infos.__name__+"."+attr,__module__:res.$infos ? res.$infos.__module__ :""}
return meta_method}}
if(res===undefined){
var getattr=meta.__getattr__
if(getattr===undefined){for(var i=0;i < meta_mro.length;i++){if(meta_mro[i].__getattr__ !==undefined){getattr=meta_mro[i].__getattr__
break}}}
if(getattr !==undefined){return getattr(klass,attr)}}}}
if(res !==undefined){if($test){console.log("res",res)}
if(res.__class__===_b_.property){return res}
if(res.__get__){if(res.__class__===method){var result=res.__get__(res.__func__,klass)
result.$infos={__func__:res,__name__:res.$infos.__name__,__qualname__:klass.$infos.__name__+"."+res.$infos.__name__,__self__:klass}}else{result=res.__get__(klass)}
return result}else if(res.__class__ && res.__class__.__get__){
if(!(attr.startsWith("__")&& attr.endsWith("__"))){return res.__class__.__get__(res,_b_.None,klass)}}
if(typeof res=="function"){
if(res.$infos===undefined && $B.debug > 1){console.log("warning: no attribute $infos for",res,"klass",klass,"attr",attr)}
if($test){console.log("res is function",res)}
if(attr=="__new__" ||
res.__class__===$B.builtin_function){res.$type="staticmethod"}
if(attr=="__class_getitem__" && res.__class__ !==$B.method){res=_b_.classmethod.$factory(res)}
if(attr=="__init_subclass__"){res=_b_.classmethod.$factory(res)}
if(res.__class__===$B.method){return res.__get__(null,klass)}else{if($test){console.log("return res",res)}
return res}}else{return res}}}
type.__hash__=function(cls){return _b_.hash(cls)}
type.__init__=function(){}
type.__init_subclass__=function(){
var $=$B.args("__init_subclass__",1,{},[],arguments,{},"args","kwargs")
if($.kwargs !==undefined){if($.kwargs.__class__ !==_b_.dict ||
Object.keys($.kwargs.$string_dict).length > 0){throw _b_.TypeError.$factory(
"__init_subclass__() takes no keyword arguments")}}
return _b_.None}
type.__instancecheck__=function(cls,instance){var kl=instance.__class__ ||$B.get_class(instance)
if(kl===cls){return true}
else{for(var i=0;i < kl.__mro__.length;i++){if(kl.__mro__[i]===cls){return true}}}
return false}
type.__instancecheck__.$type="staticmethod"
type.__name__={__get__:function(self){return self.$infos.__name__},__set__:function(self,value){self.$infos.__name__=value},__str__:function(self){return "type"},__eq__:function(self,other){return self.$infos.__name__==other}}
type.__new__=function(meta,name,bases,cl_dict){
var module=cl_dict.$string_dict.__module__
if(module){module=module[0]}
var class_dict={__class__ :meta,__bases__ :bases,__dict__ :cl_dict,$infos:{__name__:name.replace("$$",""),__module__:module},$is_class:true,$has_setattr:cl_dict.$has_setattr}
class_dict.__mro__=type.mro(class_dict).slice(1)
var items=$B.dict_to_list(cl_dict)
for(var i=0;i < items.length;i++){var key=$B.to_alias(items[i][0]),v=items[i][1]
if(key==="__module__"){continue}
if(v===undefined){continue}
class_dict[key]=v
if(v.__class__){
var set_name=$B.$getattr(v.__class__,"__set_name__",_b_.None)
if(set_name !==_b_.None){set_name(v,class_dict,key)}}
if(typeof v=="function"){if(v.$infos===undefined){console.log("type new",v,v+"")
console.log($B.frames_stack.slice())}else{v.$infos.$class=class_dict
v.$infos.__qualname__=name+'.'+v.$infos.__name__
if(v.$infos.$defaults){
var $defaults=v.$infos.$defaults
$B.Function.__setattr__(v,"__defaults__",$defaults)}}}}
return class_dict}
type.__or__=function(){var len=arguments.length
if(len !=1){throw _b_.TypeError.$factory(`expected 1 argument, got ${len}`)}
return _b_.NotImplemented}
type.__prepare__=function(){return $B.empty_dict()}
type.__qualname__={__get__:function(self){return self.$infos.__qualname__ ||self.$infos.__name__},__set__:function(self,value){self.$infos.__qualname__=value},__str__:function(self){console.log("type.__qualname__")},__eq__:function(self,other){return self.$infos.__qualname__==other}}
type.__repr__=function(kls){$B.builtins_repr_check(type,arguments)
if(kls.$infos===undefined){console.log("no $infos",kls)}
var qualname=kls.$infos.__qualname__
if(kls.$infos.__module__ &&
kls.$infos.__module__ !="builtins" &&
!kls.$infos.__module__.startsWith("$")){qualname=kls.$infos.__module__+"."+qualname}
return "<class '"+qualname+"'>"}
type.__ror__=function(){var len=arguments.length
if(len !=1){throw _b_.TypeError.$factory(`expected 1 argument, got ${len}`)}
return _b_.NotImplemented}
type.mro=function(cls){
var bases=cls.__bases__,seqs=[],pos1=0
for(var i=0;i < bases.length;i++){
if(bases[i]===_b_.str){bases[i]=$B.StringSubclass}
var bmro=[],pos=0
if(bases[i]===undefined ||
bases[i].__mro__===undefined){if(bases[i].__class__===undefined){
return[_b_.object]}else{throw _b_.TypeError.$factory(
"Object passed as base class is not a class")}}
bmro[pos++]=bases[i]
var _tmp=bases[i].__mro__
if(_tmp[0]===bases[i]){_tmp.splice(0,1)}
for(var k=0;k < _tmp.length;k++){bmro[pos++]=_tmp[k]}
seqs[pos1++]=bmro}
if(bases.indexOf(_b_.object)==-1){bases=bases.concat(_b_.tuple.$factory([_b_.object]))}
seqs[pos1++]=bases.slice()
var mro=[cls],mpos=1
while(1){var non_empty=[],pos=0
for(var i=0;i < seqs.length;i++){if(seqs[i].length > 0){non_empty[pos++]=seqs[i]}}
if(non_empty.length==0){break}
for(var i=0;i < non_empty.length;i++){var seq=non_empty[i],candidate=seq[0],not_head=[],pos=0
for(var j=0;j < non_empty.length;j++){var s=non_empty[j]
if(s.slice(1).indexOf(candidate)>-1){not_head[pos++]=s}}
if(not_head.length > 0){candidate=null}
else{break}}
if(candidate===null){throw _b_.TypeError.$factory(
"inconsistent hierarchy, no C3 MRO is possible")}
mro[mpos++]=candidate
for(var i=0;i < seqs.length;i++){var seq=seqs[i]
if(seq[0]===candidate){
seqs[i].shift()}}}
if(mro[mro.length-1]!==_b_.object){mro[mpos++]=_b_.object}
return mro}
type.__subclasscheck__=function(self,subclass){
var klass=self
if(klass===_b_.str){klass=$B.StringSubclass}else if(klass===_b_.float){klass=$B.FloatSubclass}
if(subclass.__bases__===undefined){return self===_b_.object}
return subclass.__bases__.indexOf(klass)>-1}
$B.set_func_names(type,"builtins")
_b_.type=type
var wrapper_descriptor=$B.make_class("wrapper_descriptor")
$B.set_func_names(wrapper_descriptor,"builtins")
type.__call__.__class__=wrapper_descriptor
var $instance_creator=$B.$instance_creator=function(klass){
if(klass.prototype && klass.prototype.constructor==klass){
return function(){return new klass(...arguments)}}
if(klass.$instanciable !==undefined){return function(){throw _b_.TypeError.$factory(
"Can't instantiate abstract class interface "+
"with abstract methods")}}
var metaclass=klass.__class__ ||$B.get_class(klass),call_func,factory
if(metaclass===_b_.type &&(!klass.__bases__ ||klass.__bases__.length==0)){if(klass.hasOwnProperty("__new__")){if(klass.hasOwnProperty("__init__")){factory=function(){
var obj=klass.__new__.bind(null,klass).
apply(null,arguments)
klass.__init__.bind(null,obj).apply(null,arguments)
return obj}}else{factory=function(){return klass.__new__.bind(null,klass).
apply(null,arguments)}}}else if(klass.hasOwnProperty("__init__")){factory=function(){var obj={__class__:klass,__dict__:$B.empty_dict()}
klass.__init__.bind(null,obj).apply(null,arguments)
return obj}}else{factory=function(){if(arguments.length > 0){if(arguments.length==1 && arguments[0].$nat &&
Object.keys(arguments[0].kw).length==0){}else{throw _b_.TypeError.$factory("object() takes no parameters")}}
return{__class__:klass,__dict__:$B.empty_dict()}}}}else{call_func=_b_.type.__getattribute__(metaclass,"__call__")
var factory=function(){return call_func.bind(null,klass).apply(null,arguments)}}
factory.__class__=$B.Function
factory.$infos={__name__:klass.$infos.__name__,__module__:klass.$infos.__module__}
return factory}
var method_wrapper=$B.method_wrapper=$B.make_class("method_wrapper",function(attr,klass,method){var f=function(){return method.apply(null,arguments)}
f.$infos={__name__:attr,__module__:klass.__module__}
return f}
)
method_wrapper.__str__=method_wrapper.__repr__=function(self){return "<method '"+self.$infos.__name__+"' of function object>"}
var member_descriptor=$B.make_class("member_descriptor",function(attr,cls){return{__class__:member_descriptor,cls:cls,attr:attr}}
)
member_descriptor.__str__=member_descriptor.__repr__=function(self){return "<member '"+self.attr+"' of '"+self.cls.$infos.__name__+
"' objects>"}
$B.set_func_names(member_descriptor,"builtins")
var method=$B.method=$B.make_class("method",function(func,cls){var f=function(){return $B.$call(func).bind(null,cls).apply(null,arguments)}
f.__class__=method
f.$infos=func.$infos
return f}
)
method.__eq__=function(self,other){return self.$infos !==undefined &&
other.$infos !==undefined &&
self.$infos.__func__===other.$infos.__func__ &&
self.$infos.__self__===other.$infos.__self__}
method.__ne__=function(self,other){return ! $B.method.__eq__(self,other)}
method.__get__=function(self){var f=function(){return self(arguments)}
f.__class__=$B.method_wrapper
f.$infos=method.$infos
return f}
method.__getattribute__=function(self,attr){
var infos=self.$infos
if(infos && infos[attr]){if(attr=="__code__"){var res={__class__:$B.Code}
for(var attr in infos.__code__){res[attr]=infos.__code__[attr]}
return res}else{return infos[attr]}}else if(method.hasOwnProperty(attr)){return _b_.object.__getattribute__(self,attr)}else{
return $B.Function.__getattribute__(self.$infos.__func__,attr)}}
method.__repr__=method.__str__=function(self){return "<bound method "+self.$infos.__qualname__+
" of "+_b_.str.$factory(self.$infos.__self__)+">"}
method.__setattr__=function(self,key,value){
if(key=="__class__"){throw _b_.TypeError.$factory("__class__ assignment only supported "+
"for heap types or ModuleType subclasses")}
throw _b_.AttributeError.$factory("'method' object has no attribute '"+
key+"'")}
$B.set_func_names(method,"builtins")
$B.method_descriptor=$B.make_class("method_descriptor")
$B.classmethod_descriptor=$B.make_class("classmethod_descriptor")
$B.GenericAlias=$B.make_class("GenericAlias",function(origin_class,items){return{
__class__:$B.GenericAlias,origin_class,items}}
)
$B.GenericAlias.__args__={__get__:function(self){return $B.fast_tuple(self.items)}}
$B.GenericAlias.__call__=function(self,...args){return self.origin_class.$factory.apply(null,args)}
$B.GenericAlias.__eq__=function(self,other){return $B.rich_comp("__eq__",self.origin_class,other.origin_class)&&
$B.rich_comp("__eq__",self.items,other.items)}
$B.GenericAlias.__getitem__=function(self,item){throw _b_.TypeError.$factory("descriptor '__getitem__' for '"+
self.origin_class.$infos.__name__+"' objects doesn't apply to a '"+
$B.class_name(item)+"' object")}
$B.GenericAlias.__origin__={__get__:function(self){return self.origin_class}}
$B.GenericAlias.__parameters__={__get__:function(self){
return $B.fast_tuple([])}}
$B.GenericAlias.__repr__=function(self){var items=[]
for(var i=0,len=self.items.length;i < len;i++){if(self.items[i]===_b_.Ellipsis){items.push('...')}else{if(self.items[i].$is_class){items.push(self.items[i].$infos.__name__)}else{items.push(_b_.repr(self.items[i]))}}}
return self.origin_class.$infos.__qualname__+'['+
items.join(", ")+']'}
$B.set_func_names($B.GenericAlias,"builtins")
_b_.object.__class__=type})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins,_window=self,isWebWorker=('undefined' !==typeof WorkerGlobalScope)&&
("function"===typeof importScripts)&&
(navigator instanceof WorkerNavigator)
$B.args=function($fname,argcount,slots,var_names,args,$dobj,extra_pos_args,extra_kw_args){
if($fname.startsWith("lambda_"+$B.lambda_magic)){$fname="<lambda>"}
var has_kw_args=false,nb_pos=args.length,filled=0,extra_kw,only_positional
var end_positional=var_names.indexOf("/")
if(end_positional !=-1){var_names.splice(end_positional,1)
only_positional=var_names.slice(0,end_positional)}
if(nb_pos > 0 && args[nb_pos-1]&& args[nb_pos-1].$nat){nb_pos--
if(Object.keys(args[nb_pos].kw).length > 0){has_kw_args=true
var kw_args=args[nb_pos].kw
if(Array.isArray(kw_args)){var kwa=kw_args[0]
for(var i=1,len=kw_args.length;i < len;i++){var kw_arg=kw_args[i]
if(kw_arg.__class__===_b_.dict){for(var k in kw_arg.$numeric_dict){throw _b_.TypeError.$factory($fname+
"() keywords must be strings")}
for(var k in kw_arg.$object_dict){throw _b_.TypeError.$factory($fname+
"() keywords must be strings")}
for(var k in kw_arg.$string_dict){if(kwa[k]!==undefined){throw _b_.TypeError.$factory($fname+
"() got multiple values for argument '"+
k+"'")}
kwa[k]=kw_arg.$string_dict[k][0]}}else{var it=_b_.iter(kw_arg),getitem=$B.$getattr(kw_arg,'__getitem__')
while(true){try{var k=_b_.next(it)
if(typeof k !=="string"){throw _b_.TypeError.$factory($fname+
"() keywords must be strings")}
if(kwa[k]!==undefined){throw _b_.TypeError.$factory($fname+
"() got multiple values for argument '"+
k+"'")}
kwa[k]=getitem(k)}catch(err){if($B.is_exc(err,[_b_.StopIteration])){break}
throw err}}}}
kw_args=kwa}}}
if(extra_pos_args){slots[extra_pos_args]=[]
slots[extra_pos_args].__class__=_b_.tuple}
if(extra_kw_args){
extra_kw=$B.empty_dict()}
if(nb_pos > argcount){
if(extra_pos_args===null ||extra_pos_args=="*"){
msg=$fname+"() takes "+argcount+" positional argument"+
(argcount > 1 ? "s" :"")+" but more were given"
throw _b_.TypeError.$factory(msg)}else{
for(var i=argcount;i < nb_pos;i++){slots[extra_pos_args].push(args[i])}
nb_pos=argcount}}
for(var i=0;i < nb_pos;i++){slots[var_names[i]]=args[i]
filled++}
if(filled==argcount && argcount===var_names.length &&
! has_kw_args){if(extra_kw_args){slots[extra_kw_args]=extra_kw}
return slots}
if(has_kw_args){for(var key in kw_args){var value=kw_args[key],key1=$B.to_alias(key)
if(slots[key1]===undefined){
if(extra_kw_args){
if(key.substr(0,2)=="$$"){key=key.substr(2)}
extra_kw.$string_dict[key]=[value,extra_kw.$order++]}else{throw _b_.TypeError.$factory($fname+
"() got an unexpected keyword argument '"+key+"'")}}else if(slots[key1]!==null){
throw _b_.TypeError.$factory($fname+
"() got multiple values for argument '"+key+"'")}else if(only_positional && only_positional.indexOf(key1)>-1){throw _b_.TypeError.$factory($fname+"() got an "+
"unexpected keyword argument '"+key+"'")}else{
slots[key1]=value}}}
var missing=[]
for(var attr in slots){if(slots[attr]===null){if($dobj[attr]!==undefined){slots[attr]=$dobj[attr]}
else{missing.push("'"+attr+"'")}}}
if(missing.length > 0){if(missing.length==1){throw _b_.TypeError.$factory($fname+
" missing 1 positional argument: "+missing[0])}else{var msg=$fname+" missing "+missing.length+
" positional arguments: "
msg+=missing.join(" and ")
throw _b_.TypeError.$factory(msg)}}
if(extra_kw_args){slots[extra_kw_args]=extra_kw}
return slots}
$B.wrong_nb_args=function(name,received,expected,positional){if(received < expected){var missing=expected-received
throw _b_.TypeError.$factory(name+"() missing "+missing+
" positional argument"+(missing > 1 ? "s" :"")+": "+
positional.slice(received))}else{throw _b_.TypeError.$factory(name+"() takes "+expected+
" positional argument"+(expected > 1 ? "s" :"")+
" but more were given")}}
$B.get_class=function(obj){
if(obj===null){return $B.$NoneDict}
if(obj===undefined){return $B.UndefinedClass}
var klass=obj.__class__
if(klass===undefined){switch(typeof obj){case "number":
if(obj % 1===0){
return _b_.int}
return _b_.float
case "string":
return _b_.str
case "boolean":
return _b_.bool
case "function":
if(obj.$is_js_func){
return $B.JSObj}
obj.__class__=$B.Function
return $B.Function
case "object":
if(Array.isArray(obj)){if(Object.getPrototypeOf(obj)===Array.prototype){obj.__class__=_b_.list
return _b_.list}}else if(obj.constructor===Number){return _b_.float}else if(typeof Node !=="undefined" 
&& obj instanceof Node){return $B.DOMNode}
break}}
if(klass===undefined){return $B.JSObj}
return klass}
$B.class_name=function(obj){var klass=$B.get_class(obj)
if(klass===$B.JSObj){return 'Javascript '+obj.constructor.name}else{return klass.$infos.__name__}}
$B.$list_comp=function(items){
var ix=$B.UUID(),res="comp_result_"+$B.lambda_magic+ix,py=res+" = []\n",indent=0
for(var i=1,len=items.length;i < len;i++){var item=items[i].replace(/\s+$/,"").replace(/\n/g,"")
py+=" ".repeat(indent)+item+":\n"
indent+=4}
py+=" ".repeat(indent)
py+=res+".append("+items[0]+")\n"
return[py,ix]}
$B.$dict_comp=function(module_name,parent_scope,items,line_num){
var ix=$B.UUID(),res="comp_result_"+$B.lambda_magic+ix,py=res+" = {}\n",
indent=0
for(var i=1,len=items.length;i < len;i++){var item=items[i].replace(/\s+$/,"").replace(/\n/g,"")
py+="    ".repeat(indent)+item+":\n"
indent++}
py+="    ".repeat(indent)+res+".update({"+items[0]+"})"
var line_info=line_num+','+module_name
var dictcomp_name="dc"+ix,root=$B.py2js(
{src:py,is_comp:true,line_info:line_info},module_name,dictcomp_name,parent_scope,line_num),outer_expr=root.outermost_expr.to_js(),js=root.to_js()
js+='\nreturn '+res+'\n'
js="(function(expr){"+js+"})("+outer_expr+")"
$B.clear_ns(dictcomp_name)
delete $B.$py_src[dictcomp_name]
return js}
$B.$gen_expr=function(module_name,parent_scope,items,line_num,set_comp){
var ix=$B.UUID(),genexpr_name=(set_comp ? "set_comp"+$B.lambda_magic :"__ge")+ix,py=`def ${genexpr_name}(expr):\n`,
indent=1
for(var i=1,len=items.length;i < len;i++){var item=items[i].replace(/\s+$/,"").replace(/\n/g,"")
py+=" ".repeat(indent)+item+":\n"
indent+=4}
py+=" ".repeat(indent)
py+="yield ("+items[0]+")"
var line_info=line_num+','+module_name
var root=$B.py2js({src:py,is_comp:true,line_info:line_info,ix:ix},genexpr_name,genexpr_name,parent_scope,line_num),js=root.to_js(),lines=js.split("\n")
if(root.outermost_expr===undefined){console.log("no outermost",module_name,parent_scope)}
var outer_expr=root.outermost_expr.to_js()
js=lines.join("\n")
js+="\nvar $res = $B.generator.$factory("+genexpr_name+
')('+outer_expr+');\nreturn $res\n'
js="(function($locals_"+genexpr_name+"){"+js+"})($locals)\n"
return js}
$B.copy_namespace=function(){var ns={}
for(const frame of $B.frames_stack){for(const kv of[frame[1],frame[3]]){for(var key in kv){if(key.startsWith('$$')||!key.startsWith('$')){ns[key]=kv[key]}}}}
return ns}
$B.clear_ns=function(name){
if(name.startsWith("__ge")){console.log("clear ns",name)}
var len=name.length
for(var key in $B.$py_module_path){if(key.substr(0,len)==name){$B.$py_module_path[key]=null
delete $B.$py_module_path[key]}}
$B.$py_src[name]=null
delete $B.$py_src[name]
var alt_name=name.replace(/\./g,"_")
if(alt_name !=name){$B.clear_ns(alt_name)}}
$B.from_alias=function(attr){if(attr.substr(0,2)=="$$" && $B.aliased_names[attr.substr(2)]){return attr.substr(2)}
return attr}
$B.$search=function(name,global_ns){
var frame=$B.last($B.frames_stack)
if(frame[1][name]!==undefined){return frame[1][name]}
else if(frame[3][name]!==undefined){return frame[3][name]}
else if(_b_[name]!==undefined){return _b_[name]}
else{if(frame[0]==frame[2]||frame[1].$type=="class" ||
frame[1].$exec_locals){throw _b_.NameError.$factory(
"name '"+name+"' is not defined")}
else{throw _b_.UnboundLocalError.$factory("local variable '"+
name+"' referenced before assignment")}}}
$B.$global_search=function(name,search_ids){
var ns={}
for(var i=0;i < $B.frames_stack.length;i++){var frame=$B.frames_stack[i]
if(search_ids.indexOf(frame[0])>-1){if(frame[1].$is_not_dict){
try{return $B.$getitem(frame[1],name)}catch(err){if(! $B.is_exc(err,[_b_.KeyError])){throw err}}}else if(frame[1][name]!==undefined){return frame[1][name]}}
if(search_ids.indexOf(frame[2])>-1){if(frame[3][name]!==undefined){return frame[3][name]}}}
for(var i=0;i < search_ids.length;i++){var search_id=search_ids[i]
if($B.imported[search_id]&& $B.imported[search_id][name]){return $B.imported[search_id][name]}}
throw _b_.NameError.$factory("name '"+$B.from_alias(name)+
"' is not defined")}
$B.$local_search=function(name){
var frame=$B.last($B.frames_stack)
if(frame[1][name]!==undefined){return frame[1][name]}
else{throw _b_.UnboundLocalError.$factory("local variable '"+
$B.from_alias(name)+"' referenced before assignment")}}
$B.$check_def=function(name,value){
if(value !==undefined){return value}else if(_b_[name]!==undefined){
return _b_[name]}else{var frame=$B.last($B.frames_stack)
if(frame[1].$is_not_dict){
try{return $B.$getitem(frame[1],name)}catch(err){if(! $B.is_exc(err,[_b_.KeyError])){throw err}}}else if(frame[1][name]!==undefined){return frame[1][name]}
if(frame[3][name]!==undefined){return frame[3][name]}}
throw _b_.NameError.$factory("name '"+$B.from_alias(name)+
"' is not defined")}
$B.$check_def_global=function(name,ns){var res=ns[name]
if(res===undefined){throw _b_.NameError.$factory("name '"+name+
"' is not defined")}
return res}
$B.$check_def_local=function(name,value){
if(value !==undefined){return value}
throw _b_.UnboundLocalError.$factory("local variable '"+
$B.from_alias(name)+"' referenced before assignment")}
$B.$check_def_free=function(name,value){
if(value !==undefined){return value}
var res
for(var i=$B.frames_stack.length-1;i >=0;i--){res=$B.frames_stack[i][1][name]
if(res !==undefined){return res}
res=$B.frames_stack[i][3][name]
if(res !==undefined){return res}}
throw _b_.NameError.$factory("free variable '"+$B.from_alias(name)+
"' referenced before assignment in enclosing scope")}
$B.$check_def_free1=function(name,scope_id){
var res
for(var i=$B.frames_stack.length-1;i >=0;i--){var frame=$B.frames_stack[i]
res=frame[1][name]
if(res !==undefined){return res}
if(frame[1].$parent){res=frame[1].$parent[name]
if(res !==undefined){return res}}
if(frame[2]==scope_id){res=frame[3][name]
if(res !==undefined){return res}}}
throw _b_.NameError.$factory("free variable '"+$B.from_alias(name)+
"' referenced before assignment in enclosing scope")}
$B.$JS2Py=function(src){if(typeof src==="number"){if(src % 1===0){return src}
return _b_.float.$factory(src)}
if(src===null ||src===undefined){return _b_.None}
if(Array.isArray(src)&&
Object.getPrototypeOf(src)===Array.prototype){src.$brython_class="js" }
return src}
$B.list_key=function(obj,key){key=$B.$GetInt(key)
if(key < 0){key+=obj.length}
var res=obj[key]
if(res===undefined){throw _b_.IndexError.$factory("list index out of range")}
return res}
$B.list_slice=function(obj,start,stop){if(start===null){start=0}
else{start=$B.$GetInt(start)
if(start < 0){start=Math.max(0,start+obj.length)}}
if(stop===null){return obj.slice(start)}
stop=$B.$GetInt(stop)
if(stop < 0){stop+=obj.length}
return obj.slice(start,stop)}
$B.list_slice_step=function(obj,start,stop,step){if(step===null ||step==1){return $B.list_slice(obj,start,stop)}
if(step==0){throw _b_.ValueError.$factory("slice step cannot be zero")}
step=$B.$GetInt(step)
if(start===null){start=step >=0 ? 0 :obj.length-1}
else{start=$B.$GetInt(start)
if(start < 0){start=Math.min(0,start+obj.length)}}
if(stop===null){stop=step >=0 ? obj.length :-1}
else{stop=$B.$GetInt(stop)
if(stop < 0){stop=Math.max(0,stop+obj.length)}}
var res=[]
if(step > 0){for(var i=start;i < stop;i+=step){res.push(obj[i])}}else{for(var i=start;i > stop;i+=step){res.push(obj[i])}}
return res}
function index_error(obj){var type=typeof obj=="string" ? "string" :"list"
throw _b_.IndexError.$factory(type+" index out of range")}
$B.$getitem=function(obj,item){var is_list=Array.isArray(obj)&& obj.__class__===_b_.list,is_dict=obj.__class__===_b_.dict && ! obj.$jsobj
if(typeof item=="number"){if(is_list ||
(typeof obj=="string" &&
! $B.has_surrogate(obj))){item=item >=0 ? item :obj.length+item
if(obj[item]!==undefined){return obj[item]}
else{index_error(obj)}}else if(is_dict){if(obj.$numeric_dict[item]!==undefined){return obj.$numeric_dict[item][0]}}}else if(typeof item=="string" && is_dict){var res=obj.$string_dict[item]
if(res !==undefined){return res[0]}
throw _b_.KeyError.$factory(item)}
if(obj.$is_class){var class_gi=$B.$getattr(obj,"__class_getitem__",_b_.None)
if(class_gi !==_b_.None){return class_gi(item)}else if(obj.__class__){class_gi=$B.$getattr(obj.__class__,"__getitem__",_b_.None)
if(class_gi !==_b_.None){return class_gi(obj,item)}else{throw _b_.TypeError.$factory("'"+
$B.class_name(obj.__class__)+
"' object is not subscriptable")}}}
if(is_list){return _b_.list.$getitem(obj,item)}
if(is_dict){return _b_.dict.$getitem(obj,item)}
var gi=$B.$getattr(obj.__class__ ||$B.get_class(obj),"__getitem__",_b_.None)
if(gi !==_b_.None){return gi(obj,item)}
throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object is not subscriptable")}
$B.getitem_slice=function(obj,slice){var res
if(Array.isArray(obj)&& obj.__class__===_b_.list){if(slice.start===_b_.None && slice.stop===_b_.None){if(slice.step===_b_.None ||slice.step==1){res=obj.slice()}else if(slice.step==-1){res=obj.slice().reverse()}}else if(slice.step===_b_.None){if(slice.start===_b_.None){slice.start=0}
if(slice.stop===_b_.None){slice.stop=obj.length}
if(typeof slice.start=="number" &&
typeof slice.stop=="number"){if(slice.start < 0){slice.start+=obj.length}
if(slice.stop < 0){slice.stop+=obj.length}
res=obj.slice(slice.start,slice.stop)}}
if(res){res.__class__=obj.__class__ 
return res}else{return _b_.list.$getitem(obj,slice)}}
return $B.$getattr(obj,"__getitem__")(slice)}
$B.set_list_key=function(obj,key,value){try{key=$B.$GetInt(key)}
catch(err){if(_b_.isinstance(key,_b_.slice)){var s=_b_.slice.$conv_for_seq(key,obj.length)
return $B.set_list_slice_step(obj,s.start,s.stop,s.step,value)}}
if(key < 0){key+=obj.length}
if(obj[key]===undefined){console.log(obj,key)
throw _b_.IndexError.$factory("list assignment index out of range")}
obj[key]=value}
$B.set_list_slice=function(obj,start,stop,value){if(start===null){start=0}else{start=$B.$GetInt(start)
if(start < 0){start=Math.max(0,start+obj.length)}}
if(stop===null){stop=obj.length}
stop=$B.$GetInt(stop)
if(stop < 0){stop=Math.max(0,stop+obj.length)}
var res=_b_.list.$factory(value)
obj.splice.apply(obj,[start,stop-start].concat(res))}
$B.set_list_slice_step=function(obj,start,stop,step,value){if(step===null ||step==1){return $B.set_list_slice(obj,start,stop,value)}
if(step==0){throw _b_.ValueError.$factory("slice step cannot be zero")}
step=$B.$GetInt(step)
if(start===null){start=step > 0 ? 0 :obj.length-1}else{start=$B.$GetInt(start)}
if(stop===null){stop=step > 0 ? obj.length :-1}else{stop=$B.$GetInt(stop)}
var repl=_b_.list.$factory(value),j=0,test,nb=0
if(step > 0){test=function(i){return i < stop}}
else{test=function(i){return i > stop}}
for(var i=start;test(i);i+=step){nb++}
if(nb !=repl.length){throw _b_.ValueError.$factory(
"attempt to assign sequence of size "+repl.length+
" to extended slice of size "+nb)}
for(var i=start;test(i);i+=step){obj[i]=repl[j]
j++}}
$B.$setitem=function(obj,item,value){if(Array.isArray(obj)&& obj.__class__===undefined &&
typeof item=="number" &&
!_b_.isinstance(obj,_b_.tuple)){if(item < 0){item+=obj.length}
if(obj[item]===undefined){throw _b_.IndexError.$factory("list assignment index out of range")}
obj[item]=value
return}else if(obj.__class__===_b_.dict){_b_.dict.$setitem(obj,item,value)
return}else if(obj.__class__===_b_.list){return _b_.list.$setitem(obj,item,value)}
var si=$B.$getattr(obj.__class__ ||$B.get_class(obj),"__setitem__",null)
if(si===null){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object does not support item assignment")}
return si(obj,item,value)}
$B.$delitem=function(obj,item){if(Array.isArray(obj)&& obj.__class__===_b_.list &&
typeof item=="number" &&
!_b_.isinstance(obj,_b_.tuple)){if(item < 0){item+=obj.length}
if(obj[item]===undefined){throw _b_.IndexError.$factory("list deletion index out of range")}
obj.splice(item,1)
return}else if(obj.__class__===_b_.dict){_b_.dict.__delitem__(obj,item)
return}else if(obj.__class__===_b_.list){return _b_.list.__delitem__(obj,item)}
var di=$B.$getattr(obj.__class__ ||$B.get_class(obj),"__delitem__",null)
if(di===null){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object doesn't support item deletion")}
return di(obj,item)}
$B.delitem_slice=function(obj,slice){if(Array.isArray(obj)&& obj.__class__===_b_.list){if(slice.start===_b_.None && slice.stop===_b_.None){if(slice.step===_b_.None ||slice.step==1 ||
slice.step==-1){while(obj.length > 0){obj.pop()}
return _b_.None}}else if(slice.step===_b_.None){if(slice.start===_b_.None){slice.start=0}
if(slice.stop===_b_.None){slice.stop=obj.length}
if(typeof slice.start=="number" &&
typeof slice.stop=="number"){if(slice.start < 0){slice.start+=obj.length}
if(slice.stop < 0){slice.stop+=obj.length}
obj.splice(slice.start,slice.stop-slice.start)
return _b_.None}}}
var di=$B.$getattr(obj.__class__ ||$B.get_class(obj),"__delitem__",null)
if(di===null){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object doesn't support item deletion")}
return di(obj,slice)}
$B.augm_item_add=function(obj,item,incr){if(Array.isArray(obj)&& typeof item=="number" &&
obj[item]!==undefined){if(Array.isArray(obj[item])&& Array.isArray(incr)){for(var i=0,len=incr.length;i < len;i++){obj[item].push(incr[i])}
return}else if(typeof obj[item]=="string" && typeof incr=="string"){obj[item]+=incr
return}else if(typeof obj[item]=="number" && typeof incr=="number"){obj[item]+=incr
return}}
var ga=$B.$getattr
try{var augm_func=ga(ga(obj,"__getitem__")(item),"__iadd__")}catch(err){ga(obj,"__setitem__")(item,$B.add(ga(obj,"__getitem__")(item),incr))
return}
augm_func(incr)}
var augm_item_src=""+$B.augm_item_add
var augm_ops=[["-=","sub"],["*=","mul"]]
for(var i=0,len=augm_ops.length;i < len;i++){var augm_code=augm_item_src.replace(/add/g,augm_ops[i][1])
augm_code=augm_code.replace(/\+=/g,augm_ops[i][0])
eval("$B.augm_item_"+augm_ops[i][1]+"="+augm_code)}
$B.extend=function(fname,arg){
for(var i=2;i < arguments.length;i++){var mapping=arguments[i]
var it=_b_.iter(mapping),getter=$B.$getattr(mapping,"__getitem__")
while(true){try{var key=_b_.next(it)
if(typeof key !=="string"){throw _b_.TypeError.$factory(fname+
"() keywords must be strings")}
if(arg[key]!==undefined){throw _b_.TypeError.$factory(fname+
"() got multiple values for argument '"+key+"'")}
arg[key]=getter(key)}catch(err){if(_b_.isinstance(err,[_b_.StopIteration])){break}
throw err}}}
return arg}
$B.extend_list=function(){
var res=Array.prototype.slice.call(arguments,0,arguments.length-1),last=$B.last(arguments)
var it=_b_.iter(last)
while(true){try{res.push(_b_.next(it))}catch(err){if(_b_.isinstance(err,[_b_.StopIteration])){break}
throw err}}
return res}
$B.$test_item=function(expr){
$B.$test_result=expr
return _b_.bool.$factory(expr)}
$B.$test_expr=function(){
return $B.$test_result}
$B.$is=function(a,b){
if(a instanceof Number && b instanceof Number){return a.valueOf()==b.valueOf()}
if((a===_b_.int && b==$B.long_int)||
(a===$B.long_int && b===_b_.int)){return true}
return a===b}
$B.conv_undef=function(obj){
var res={}
for(var key in obj){res[key]=obj[key]===undefined ? $B.Undefined :obj[key]}
return res}
$B.$is_member=function(item,_set){
var f,_iter,method
try{method=$B.$getattr(_set.__class__ ||$B.get_class(_set),"__contains__")}
catch(err){}
if(method){return $B.$call(method)(_set,item)}
try{_iter=_b_.iter(_set)}
catch(err){}
if(_iter){while(1){try{var elt=_b_.next(_iter)
if($B.rich_comp("__eq__",elt,item)){return true}}catch(err){return false}}}
try{f=$B.$getattr(_set,"__getitem__")}
catch(err){throw _b_.TypeError.$factory("'"+$B.class_name(_set)+
"' object is not iterable")}
if(f){var i=-1
while(1){i++
try{var elt=f(i)
if($B.rich_comp("__eq__",elt,item)){return true}}catch(err){if(err.__class__===_b_.IndexError){return false}
throw err}}}}
$B.$call=function(callable){if(callable.__class__===$B.method){return callable}else if(callable.$factory){return callable.$factory}else if(callable.$is_class){
return callable.$factory=$B.$instance_creator(callable)}else if(callable.$is_js_class){
return callable.$factory=function(){return new callable(...arguments)}}else if(callable.$in_js_module){
return function(){var res=callable(...arguments)
return res===undefined ? _b_.None :res}}else if(callable.$is_func ||typeof callable=="function"){return callable}
try{return $B.$getattr(callable,"__call__")}catch(err){throw _b_.TypeError.$factory("'"+$B.class_name(callable)+
"' object is not callable")}}
var $io=$B.make_class("io",function(out){return{
__class__:$io,out}}
)
$io.flush=function(self){console[self.out].apply(null,self.buf)
self.buf=[]}
$io.write=function(self,msg){
if(self.buf===undefined){self.buf=[]}
if(typeof msg !="string"){throw _b_.TypeError.$factory("write() argument must be str, not "+
$B.class_name(msg))}
self.buf.push(msg)
return _b_.None}
if(console.error !==undefined){$B.stderr=$io.$factory("error")}else{$B.stderr=$io.$factory("log")}
$B.stdout=$io.$factory("log")
$B.stdin={__class__:$io,__original__:true,closed:false,len:1,pos:0,read:function(){return ""},readline:function(){return ""}}
$B.make_iterator_class=function(name){
var klass={__class__:_b_.type,__mro__:[_b_.object],$factory:function(items){return{
__class__:klass,__dict__:$B.empty_dict(),counter:-1,items:items,len:items.length}},$infos:{__name__:name},$is_class:true,__iter__:function(self){self.counter=self.counter===undefined ?-1 :self.counter
self.len=self.items.length
return self},__len__:function(self){return self.items.length},__next__:function(self){if(typeof self.test_change=="function" && self.test_change()){
throw _b_.RuntimeError.$factory(
"dictionary changed size during iteration")}
self.counter++
if(self.counter < self.items.length){var item=self.items[self.counter]
if(self.items.$brython_class=="js"){
item=$B.$JS2Py(item)}
return item}
throw _b_.StopIteration.$factory("StopIteration")},__reduce_ex__:function(self,protocol){return $B.fast_tuple([_b_.iter,_b_.tuple.$factory([self.items])])}}
$B.set_func_names(klass,"builtins")
return klass}
function $err(op,klass,other){var msg="unsupported operand type(s) for "+op+" : '"+
klass.$infos.__name__+"' and '"+$B.class_name(other)+"'"
throw _b_.TypeError.$factory(msg)}
var r_opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or"]
var ropsigns=["+","-","*","/","//","%","**","<<",">>","&","^","|"]
$B.make_rmethods=function(klass){for(var r_opname of r_opnames){if(klass["__r"+r_opname+"__"]===undefined &&
klass['__'+r_opname+'__']){klass["__r"+r_opname+"__"]=(function(name){return function(self,other){return klass["__"+name+"__"](other,self)}})(r_opname)}}}
$B.UUID=function(){return $B.$py_UUID++}
$B.InjectBuiltins=function(){var _str=["var _b_ = $B.builtins"],pos=1
for(var $b in $B.builtins){_str[pos++]="var "+$b+'=_b_["'+$b+'"]'}
return _str.join(";")}
$B.$GetInt=function(value){
if(typeof value=="number" ||value.constructor===Number){return value}
else if(typeof value==="boolean"){return value ? 1 :0}
else if(_b_.isinstance(value,_b_.int)){return value}
else if(_b_.isinstance(value,_b_.float)){return value.valueOf()}
if(! value.$is_class){try{var v=$B.$getattr(value,"__int__")();return v}catch(e){}
try{var v=$B.$getattr(value,"__index__")();return v}catch(e){}}
throw _b_.TypeError.$factory("'"+$B.class_name(value)+
"' object cannot be interpreted as an integer")}
$B.to_num=function(obj,methods){
var expected_class={"__complex__":_b_.complex,"__float__":_b_.float,"__index__":_b_.int,"__int__":_b_.int}
var klass=obj.__class__ ||$B.get_class(obj)
for(var i=0;i < methods.length;i++){var missing={},method=$B.$getattr(klass,methods[i],missing)
if(method !==missing){var res=method(obj)
if(!_b_.isinstance(res,expected_class[methods[i]])){console.log(res,methods[i],expected_class[methods[i]])
throw _b_.TypeError.$factory(methods[i]+"returned non-"+
expected_class[methods[i]].$infos.__name__+
"(type "+$B.get_class(res)+")")}
return res}}
return null}
$B.PyNumber_Index=function(item){switch(typeof item){case "boolean":
return item ? 1 :0
case "number":
return item
case "object":
if(item.__class__===$B.long_int){return item}
if(_b_.isinstance(item,_b_.int)){
return item.$brython_value}
var method=$B.$getattr(item,"__index__",_b_.None)
if(method !==_b_.None){method=typeof method=="function" ?
method :$B.$getattr(method,"__call__")
return $B.int_or_bool(method())}else{throw _b_.TypeError.$factory("'"+$B.class_name(item)+
"' object cannot be interpreted as an integer")}
default:
throw _b_.TypeError.$factory("'"+$B.class_name(item)+
"' object cannot be interpreted as an integer")}}
$B.int_or_bool=function(v){switch(typeof v){case "boolean":
return v ? 1 :0
case "number":
return v
case "object":
if(v.__class__===$B.long_int){return v}
else{throw _b_.TypeError.$factory("'"+$B.class_name(v)+
"' object cannot be interpreted as an integer")}
default:
throw _b_.TypeError.$factory("'"+$B.class_name(v)+
"' object cannot be interpreted as an integer")}}
$B.enter_frame=function(frame){
$B.frames_stack.push(frame)
if($B.tracefunc && $B.tracefunc !==_b_.None){if(frame[4]===$B.tracefunc ||
($B.tracefunc.$infos && frame[4]&&
frame[4]===$B.tracefunc.$infos.__func__)){
$B.tracefunc.$frame_id=frame[0]
return _b_.None}else{
for(var i=$B.frames_stack.length-1;i >=0;i--){if($B.frames_stack[i][0]==$B.tracefunc.$frame_id){return _b_.None}}
return $B.tracefunc($B._frame.$factory($B.frames_stack,$B.frames_stack.length-1),'call',_b_.None)}}
return _b_.None}
$B.trace_exception=function(){var top_frame=$B.last($B.frames_stack)
if(top_frame[0]==$B.tracefunc.$current_frame_id){return _b_.None}
var trace_func=top_frame[1].$f_trace,exc=top_frame[1].$current_exception,frame_obj=$B._frame.$factory($B.frames_stack,$B.frames_stack.length-1)
return trace_func(frame_obj,'exception',$B.fast_tuple([exc.__class__,exc,$B.traceback.$factory(exc)]))}
$B.trace_line=function(){var top_frame=$B.last($B.frames_stack)
if(top_frame[0]==$B.tracefunc.$current_frame_id){return _b_.None}
var trace_func=top_frame[1].$f_trace,frame_obj=$B._frame.$factory($B.frames_stack,$B.frames_stack.length-1)
return trace_func(frame_obj,'line',_b_.None)}
$B.set_line=function(line_info){
var top_frame=$B.last($B.frames_stack)
if($B.tracefunc && top_frame[0]==$B.tracefunc.$current_frame_id){return _b_.None}
top_frame[1].$line_info=line_info
var trace_func=top_frame[1].$f_trace
if(trace_func !==_b_.None){var frame_obj=$B._frame.$factory($B.frames_stack,$B.frames_stack.length-1)
top_frame[1].$ftrace=trace_func(frame_obj,'line',_b_.None)}
return true}
$B.trace_return=function(value){var top_frame=$B.last($B.frames_stack),trace_func=top_frame[1].$f_trace,frame_obj=$B._frame.$factory($B.frames_stack,$B.frames_stack.length-1)
if(top_frame[0]==$B.tracefunc.$current_frame_id){
return _b_.None}
trace_func(frame_obj,'return',value)}
function exit_ctx_managers_in_generators(frame){
for(key in frame[1]){if(frame[1][key]&& frame[1][key].__class__==$B.generator){
var gen_obj=frame[1][key]
gen_obj.return()}}}
$B.set_cm_in_generator=function(cm_exit){if(cm_exit !==undefined){$B.frames_stack.forEach(function(frame){frame[1].$cm_in_gen=frame[1].$cm_in_gen ||new Set()
frame[1].$cm_in_gen.add(cm_exit)})}}
$B.leave_frame=function(arg){
if($B.frames_stack.length==0){console.log("empty stack");return}
if(arg && arg.value !==undefined && $B.tracefunc){if($B.last($B.frames_stack)[1].$f_trace===undefined){$B.last($B.frames_stack)[1].$f_trace=$B.tracefunc}
if($B.last($B.frames_stack)[1].$f_trace !==_b_.None){$B.trace_return(arg.value)}}
var frame=$B.frames_stack.pop()
frame[1].$current_exception=undefined
if(frame[1].$close_generators){
for(var i=0,len=frame[1].$close_generators.length;i < len;i++){var gen=frame[1].$close_generators[i]
if(gen.$has_run){gen.return()}}}
return _b_.None}
$B.leave_frame_exec=function(arg){
if($B.profile > 0){$B.$profile.return()}
if($B.frames_stack.length==0){console.log("empty stack");return}
var frame=$B.frames_stack.pop()
exit_ctx_managers_in_generators(frame)
for(var i=$B.frames_stack.length-1;i >=0;i--){if($B.frames_stack[i][2]==frame[2]){$B.frames_stack[i][3]=frame[3]}}}
var min_int=Math.pow(-2,53),max_int=Math.pow(2,53)-1
$B.is_safe_int=function(){for(var i=0;i < arguments.length;i++){var arg=arguments[i]
if(arg < min_int ||arg > max_int){return false}}
return true}
$B.add=function(x,y){if(typeof x.valueOf()=="number" && typeof y.valueOf()=="number"){if(typeof x=="number" && typeof y=="number"){
var z=x+y
if(z < $B.max_int && z > $B.min_int){return z}else if(z===Infinity){return _b_.float.$factory("inf")}else if(z===-Infinity){return _b_.float.$factory("-inf")}else if(isNaN(z)){return _b_.float.$factory('nan')}
return $B.long_int.__add__($B.long_int.$factory(x),$B.long_int.$factory(y))}else{
return new Number(x+y)}}else if(typeof x=="string" && typeof y=="string"){
return x+y}
try{var method=$B.$getattr(x.__class__ ||$B.get_class(x),"__add__")}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("unsupported operand type(s) for "+
"+: '"+$B.class_name(x)+"' and '"+$B.class_name(y)+"'")}
throw err}
var res=$B.$call(method)(x,y)
if(res===_b_.NotImplemented){
return $B.rich_op("add",x,y)}
return res}
$B.div=function(x,y){var z=x/y
if(x > min_int && x < max_int && y > min_int && y < max_int
&& z > min_int && z < max_int){return z}
else{return $B.long_int.__truediv__($B.long_int.$factory(x),$B.long_int.$factory(y))}}
$B.eq=function(x,y){if(x > min_int && x < max_int && y > min_int && y < max_int){return x==y}
return $B.long_int.__eq__($B.long_int.$factory(x),$B.long_int.$factory(y))}
$B.floordiv=function(x,y){var z=x/y
if(x > min_int && x < max_int && y > min_int && y < max_int
&& z > min_int && z < max_int){return Math.floor(z)}
else{return $B.long_int.__floordiv__($B.long_int.$factory(x),$B.long_int.$factory(y))}}
$B.mul=function(x,y){var z=(typeof x !="number" ||typeof y !="number")?
new Number(x*y):x*y
if(x > min_int && x < max_int && y > min_int && y < max_int
&& z > min_int && z < max_int){return z}
else if((typeof x=="number" ||x.__class__===$B.long_int)
&&(typeof y=="number" ||y.__class__===$B.long_int)){if((typeof x=="number" && isNaN(x))||
(typeof y=="number" && isNaN(y))){return _b_.float.$factory("nan")}
switch(x){case Infinity:
case-Infinity:
if(y==0){return _b_.float.$factory("nan")}else{return y > 0 ? x :-x}}
return $B.long_int.__mul__($B.long_int.$factory(x),$B.long_int.$factory(y))}else{return z}}
$B.sub=function(x,y){if(x instanceof Number && y instanceof Number){return x-y}
var z=(typeof x !="number" ||typeof y !="number")?
new Number(x-y):x-y
if(x > min_int && x < max_int && y > min_int && y < max_int
&& z > min_int && z < max_int){return z}else if((typeof x=="number" ||x.__class__===$B.long_int)
&&(typeof y=="number" ||y.__class__===$B.long_int)){if(typeof x=="number" && typeof y=="number"){if(isNaN(x)||isNaN(y)){return _b_.float.$factory("nan")}else if(x===Infinity ||x===-Infinity){if(y===x){return _b_.float.$factory("nan")}else{return x}}else if(y===Infinity ||y===-Infinity){if(y===x){return _b_.float.$factory("nan")}else{return-y}}}
if((typeof x=="number" && isNaN(x))||
(typeof y=="number" && isNaN(y))){return _b_.float.$factory("nan")}
return $B.long_int.__sub__($B.long_int.$factory(x),$B.long_int.$factory(y))}else{return z}}
$B.ge=function(x,y){if(typeof x=="number" && typeof y=="number"){return x >=y}
else if(typeof x=="number" && typeof y !="number"){return ! y.pos}
else if(typeof x !="number" && typeof y=="number"){return x.pos===true}else{return $B.long_int.__ge__(x,y)}}
$B.gt=function(x,y){if(typeof x=="number" && typeof y=="number"){return x > y}
else if(typeof x=="number" && typeof y !="number"){return ! y.pos}
else if(typeof x !="number" && typeof y=="number"){return x.pos===true}else{return $B.long_int.__gt__(x,y)}}
var reversed_op={"__lt__":"__gt__","__le__":"__ge__","__gt__":"__lt__","__ge__":"__le__"}
var method2comp={"__lt__":"<","__le__":"<=","__gt__":">","__ge__":">="}
$B.rich_comp=function(op,x,y){var x1=x.valueOf(),y1=y.valueOf()
if(typeof x1=="number" && typeof y1=="number" &&
x.__class__===undefined && y.__class__===undefined){switch(op){case "__eq__":
return x1==y1
case "__ne__":
return x1 !=y1
case "__le__":
return x1 <=y1
case "__lt__":
return x1 < y1
case "__ge__":
return x1 >=y1
case "__gt__":
return x1 > y1}}
var res,rev_op
if(x.$is_class ||x.$factory){if(op=="__eq__"){return(x===y)}else if(op=="__ne__"){return !(x===y)}else{throw _b_.TypeError.$factory("'"+method2comp[op]+
"' not supported between instances of '"+$B.class_name(x)+
"' and '"+$B.class_name(y)+"'")}}
if(x.__class__ && y.__class__){
if(y.__class__.__mro__.indexOf(x.__class__)>-1){rev_op=reversed_op[op]||op
var rev_func=$B.$getattr(y,rev_op)
res=$B.$call($B.$getattr(y,rev_op))(x)
if(res !==_b_.NotImplemented){return res}}}
res=$B.$call($B.$getattr(x,op))(y)
if(res !==_b_.NotImplemented){return res}
rev_op=reversed_op[op]||op
res=$B.$call($B.$getattr(y,rev_op))(x)
if(res !==_b_.NotImplemented ){return res}
if(op=="__eq__"){return _b_.False}
else if(op=="__ne__"){return _b_.True}
throw _b_.TypeError.$factory("'"+method2comp[op]+
"' not supported between instances of '"+$B.class_name(x)+
"' and '"+$B.class_name(y)+"'")}
var opname2opsign={sub:"-",xor:"^",mul:"*"}
$B.rich_op=function(op,x,y){var x_class=x.__class__ ||$B.get_class(x),y_class=y.__class__ ||$B.get_class(y),special_method='__'+op+'__',method
if(x_class===y_class){
if(x_class===_b_.int){return _b_.int[special_method](x,y)}else if(x_class===_b_.bool){return(_b_.bool[special_method]||_b_.int[special_method])
(x,y)}
try{method=$B.$call($B.$getattr(x,"__"+op+"__"))}catch(err){if(err.__class__===_b_.AttributeError){var kl_name=$B.class_name(x)
throw _b_.TypeError.$factory("unsupported operand type(s) "+
"for "+opname2opsign[op]+" : '"+kl_name+"' and '"+
kl_name+"'")}
throw err}
return method(y)}
if(_b_.issubclass(y_class,x_class)){
var reflected_left=$B.$getattr(x_class,'__r'+op+'__'),reflected_right=$B.$getattr(y_class,'__r'+op+'__')
if(reflected_right !==reflected_left){return reflected_right(y,x)}}
var res
try{method=$B.$call($B.$getattr(x,"__"+op+"__"))}catch(err){if(err.__class__ !==_b_.AttributeError){throw err}
res=$B.$call($B.$getattr(y,"__r"+op+"__"))(x)
if(res !==_b_.NotImplemented){return res}
throw _b_.TypeError.$factory("'"+(opname2opsign[op]||op)+
"' not supported between instances of '"+$B.class_name(x)+
"' and '"+$B.class_name(y)+"'")}
res=method(y)
if(res===_b_.NotImplemented){res=$B.$call($B.$getattr(y,"__r"+op+"__"))(x)
if(res !==_b_.NotImplemented){return res}
throw _b_.TypeError.$factory("'"+(opname2opsign[op]||op)+
"' not supported between instances of '"+$B.class_name(x)+
"' and '"+$B.class_name(y)+"'")}else{return res}}
$B.is_none=function(o){return o===undefined ||o===null ||o==_b_.None}
var repr_stack=new Set()
$B.repr={enter:function(obj){if(repr_stack.has(obj)){return true}else{repr_stack.add(obj)}},leave:function(obj){repr_stack.delete(obj)}}})(__BRYTHON__)
;

;(function($B){var _b_=$B.builtins
_b_.__debug__=false
$B.$comps={'>':'gt','>=':'ge','<':'lt','<=':'le'}
$B.$inv_comps={'>':'lt','>=':'le','<':'gt','<=':'ge'}
var check_nb_args=$B.check_nb_args=function(name,expected,args){
var len=args.length,last=args[len-1]
if(last && last.$nat=="kw"){var kw=last.kw
if(Array.isArray(kw)&& kw[1]&& kw[1].__class__===_b_.dict){if(Object.keys(kw[1].$string_dict).length==0){len--}}}
if(len !=expected){if(expected==0){throw _b_.TypeError.$factory(name+"() takes no argument"+
" ("+len+" given)")}else{throw _b_.TypeError.$factory(name+"() takes exactly "+
expected+" argument"+(expected < 2 ? '' :'s')+
" ("+len+" given)")}}}
var check_no_kw=$B.check_no_kw=function(name,x,y){
if(x===undefined){console.log("x undef",name,x,y)}
if((x.$nat && x.kw && x.kw[0]&& x.kw[0].length > 0)||
(y !==undefined && y.$nat)){throw _b_.TypeError.$factory(name+"() takes no keyword arguments")}}
var NoneType={$factory:function(){return None},$infos:{__name__:"NoneType",__module__:"builtins"},__bool__:function(self){return False},__class__:_b_.type,__hash__:function(self){return 0},__mro__:[_b_.object],__repr__:function(self){return 'None'},__str__:function(self){return 'None'},$is_class:true}
NoneType.__setattr__=function(self,attr){return no_set_attr(NoneType,attr)}
var None={__class__:NoneType,}
for(var $op in $B.$comps){
var key=$B.$comps[$op]
switch(key){case 'ge':
case 'gt':
case 'le':
case 'lt':
NoneType['__'+key+'__']=(function(op){return function(other){return _b_.NotImplemented}})($op)}}
for(var $func in None){if(typeof None[$func]=='function'){None[$func].__str__=(function(f){return function(){return "<method-wrapper "+f+
" of NoneType object>"}})($func)}}
$B.set_func_names(NoneType,"builtins")
function abs(obj){check_nb_args('abs',1,arguments)
check_no_kw('abs',obj)
if(isinstance(obj,_b_.int)){if(obj.__class__===$B.long_int){return{
__class__:$B.long_int,value:obj.value,pos:true}}else{return _b_.int.$factory(Math.abs(obj))}}
if(isinstance(obj,_b_.float)){
return _b_.float.$factory(Math.abs(_b_.float.numerator(obj)))}
var klass=obj.__class__ ||$B.get_class(obj)
try{var method=$B.$getattr(klass,"__abs__")}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("Bad operand type for abs(): '"+
$B.class_name(obj)+"'")}
throw err}
return $B.$call(method)(obj)}
function all(obj){check_nb_args('all',1,arguments)
check_no_kw('all',obj)
var iterable=iter(obj)
while(1){try{var elt=next(iterable)
if(!$B.$bool(elt)){return false}}catch(err){return true}}}
function any(obj){check_nb_args('any',1,arguments)
check_no_kw('any',obj)
var iterable=iter(obj)
while(1){try{var elt=next(iterable)
if($B.$bool(elt)){return true}}catch(err){return false}}}
function ascii(obj){check_nb_args('ascii',1,arguments)
check_no_kw('ascii',obj)
var res=repr(obj),res1='',cp
for(var i=0;i < res.length;i++){cp=res.charCodeAt(i)
if(cp < 128){res1+=res.charAt(i)}
else if(cp < 256){res1+='\\x'+cp.toString(16)}
else{var s=cp.toString(16)
if(s.length % 2==1){s="0"+s}
res1+='\\u'+s}}
return res1}
function $builtin_base_convert_helper(obj,base){var prefix="";
switch(base){case 2:
prefix='0b';break
case 8:
prefix='0o';break
case 16:
prefix='0x';break
default:
console.log('invalid base:'+base)}
if(obj.__class__===$B.long_int){var res=prefix+$B.long_int.to_base(obj,base)
if(! obj.pos){res="-"+res}
return res}
var value=$B.$GetInt(obj)
if(value===undefined){
throw _b_.TypeError.$factory('Error, argument must be an integer or'+
' contains an __index__ function')}
if(value >=0){return prefix+value.toString(base)}
return '-'+prefix+(-value).toString(base)}
function bin_hex_oct(base,obj){
if(isinstance(obj,_b_.int)){return $builtin_base_convert_helper(obj,base)}else{try{var klass=obj.__class__ ||$B.get_class(obj),method=$B.$getattr(klass,'__index__')}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object cannot be interpreted as an integer")}
throw err}
var res=$B.$call(method)(obj)
return $builtin_base_convert_helper(res,base)}}
function bin(obj){check_nb_args('bin',1,arguments)
check_no_kw('bin',obj)
return bin_hex_oct(2,obj)}
function breakpoint(){
$B.$import('sys',[])
var missing={},hook=$B.$getattr($B.imported.sys,'breakpointhook',missing)
if(hook===missing){throw _b_.RuntimeError.$factory('lost sys.breakpointhook')}
return $B.$call(hook).apply(null,arguments)}
function callable(obj){check_nb_args('callable',1,arguments)
check_no_kw('callable',obj)
return hasattr(obj,'__call__')}
function chr(i){check_nb_args('chr',1,arguments)
check_no_kw('chr',i)
if(i < 0 ||i > 1114111){throw _b_.ValueError.$factory('Outside valid range')}else if(i >=0x10000 && i <=0x10FFFF){var code=(i-0x10000)
return String.fromCodePoint(0xD800 |(code >> 10))+
String.fromCodePoint(0xDC00 |(code & 0x3FF))}else{return String.fromCodePoint(i)}}
var classmethod=$B.make_class("classmethod",function(func){check_nb_args('classmethod',1,arguments)
check_no_kw('classmethod',func)
var f=function(){return func.apply(null,arguments)}
f.__class__=$B.method
if(func.$attrs){for(var key in func.$attrs){f[key]=func.$attrs[key]}}
f.$infos={__func__:func,__name__:func.$infos.__name__}
f.__get__=function(obj,cls){var method=function(){return f(cls,...arguments)}
method.__class__=$B.method
method.$infos={__self__:cls,__func__:f,__name__:func.$infos.__name__,__qualname__:cls.$infos.__name__+"."+func.$infos.__name__}
return method}
f.__get__.__class__=$B.method_wrapper
f.__get__.$infos=func.$infos
return f}
)
$B.set_func_names(classmethod,"builtins")
var code=$B.code=$B.make_class("code")
code.__repr__=code.__str__=function(self){return '<code object '+self.co_name+', file '+self.co_filename+'>'}
code.__getattribute__=function(self,attr){return self[attr]}
$B.set_func_names(code,"builtins")
function compile(){var $=$B.args('compile',6,{source:null,filename:null,mode:null,flags:null,dont_inherit:null,optimize:null,_feature_version:null},['source','filename','mode','flags','dont_inherit','optimize','_feature_version'],arguments,{flags:0,dont_inherit:false,optimize:-1,_feature_version:0},null,null)
var module_name='$exec_'+$B.UUID()
$B.clear_ns(module_name)
$.__class__=code
$.co_flags=$.flags
$.name="<module>"
var interactive=$.mode=="single" &&($.flags & 0x200)
if(interactive && ! $.source.endsWith("\n")){
var lines=$.source.split("\n")
if($B.last(lines).startsWith(" ")){throw _b_.SyntaxError.$factory("unexpected EOF while parsing")}}
$B.py2js({src:$.source,filename:$.filename},module_name,module_name)
return $}
var __debug__=$B.debug > 0
function delattr(obj,attr){
check_no_kw('delattr',obj,attr)
check_nb_args('delattr',2,arguments)
if(typeof attr !='string'){throw _b_.TypeError.$factory("attribute name must be string, not '"+
$B.class_name(attr)+"'")}
return $B.$getattr(obj,'__delattr__')(attr)}
$B.$delete=function(name,is_global){
function del(obj){if(obj.__class__===$B.generator){
obj.return()}}
var found=false,frame=$B.last($B.frames_stack)
if(! is_global){if(frame[1][name]!==undefined){found=true
del(frame[1][name])
delete frame[1][name]}}else{if(frame[2]!=frame[0]&& frame[3][name]!==undefined){found=true
del(frame[3][name])
delete frame[3][name]}}
if(!found){throw _b_.NameError.$factory(name)}}
function dir(obj){if(obj===undefined){
var frame=$B.last($B.frames_stack)
locals_obj=frame[1],res=_b_.list.$factory(),pos=0
for(var attr in locals_obj){if(attr.charAt(0)=='$' && attr.charAt(1)!='$'){
continue}
res[pos++]=attr}
_b_.list.sort(res)
return res}
check_nb_args('dir',1,arguments)
check_no_kw('dir',obj)
var klass=obj.__class__ ||$B.get_class(obj)
if(obj.$is_class){
var dir_func=$B.$getattr(obj.__class__,"__dir__")
return $B.$call(dir_func)(obj)}
try{var res=$B.$call($B.$getattr(obj,'__dir__'))()
res=_b_.list.$factory(res)
return res}catch(err){}
var res=[],pos=0
for(var attr in obj){if(attr.charAt(0)!=='$' && attr !=='__class__' &&
obj[attr]!==undefined){res[pos++]=attr}}
res.sort()
return res}
function divmod(x,y){check_no_kw('divmod',x,y)
check_nb_args('divmod',2,arguments)
var klass=x.__class__ ||$B.get_class(x)
var dm=$B.$getattr(klass,"__divmod__",_b_.None)
if(dm !==_b_.None){return dm(x,y)}
return _b_.tuple.$factory([$B.$getattr(klass,'__floordiv__')(x,y),$B.$getattr(klass,'__mod__')(x,y)])}
var enumerate=$B.make_class("enumerate",function(){var $ns=$B.args("enumerate",2,{iterable:null,start:null},['iterable','start'],arguments,{start:0},null,null),_iter=iter($ns["iterable"]),start=$ns["start"]
return{
__class__:enumerate,__name__:'enumerate iterator',counter:start-1,iter:_iter,start:start}}
)
enumerate.__iter__=function(self){self.counter=self.start-1
return self}
enumerate.__next__=function(self){self.counter++
return $B.fast_tuple([self.counter,next(self.iter)])}
$B.set_func_names(enumerate,"builtins")
$B.from_alias=function(attr){if(attr.substr(0,2)=='$$' && $B.aliased_names[attr.substr(2)]){return attr.substr(2)}
return attr}
$B.to_alias=function(attr){if($B.aliased_names[attr]){return '$$'+attr}
return attr}
function $$eval(src,_globals,_locals){var $=$B.args("eval",4,{src:null,globals:null,locals:null,mode:null},["src","globals","locals","mode"],arguments,{globals:_b_.None,locals:_b_.None,mode:"eval"},null,null),src=$.src,_globals=$.globals,_locals=$.locals,mode=$.mode
if($.src.mode && $.src.mode=="single" &&
["<console>","<stdin>"].indexOf($.src.filename)>-1){
_b_.print(">",$.src.source.trim())}
if(src.__class__===code){mode=src.mode
src=src.source}else if(typeof src !=='string'){throw _b_.TypeError.$factory("eval() arg 1 must be a string, bytes "+
"or code object")}
var current_frame=$B.frames_stack[$B.frames_stack.length-1]
if(current_frame !==undefined){var current_locals_id=current_frame[0].replace(/\./g,'_'),current_globals_id=current_frame[2].replace(/\./g,'_')}
var stack_len=$B.frames_stack.length
var globals_id='$exec_'+$B.UUID(),globals_name=globals_id,locals_id='$exec_'+$B.UUID(),parent_scope
if(_globals===_b_.None){if(current_locals_id==current_globals_id){locals_id=globals_id}
var local_scope={module:globals_id,id:locals_id,binding:{},bindings:{}}
for(var attr in current_frame[1]){local_scope.binding[attr]=true
local_scope.bindings[attr]=true}
var global_scope={module:globals_id,id:globals_id,binding:{},bindings:{}}
for(var attr in current_frame[3]){global_scope.binding[attr]=true
global_scope.bindings[attr]=true}
local_scope.parent_block=global_scope
global_scope.parent_block=$B.builtins_scope
parent_scope=local_scope
eval("$locals_"+parent_scope.id+" = current_frame[1]")}else{
if(_globals.__class__ !=_b_.dict){throw _b_.TypeError.$factory("exec() globals must be a dict, not "+
$B.class_name(_globals))}
if(_globals.globals_id){globals_id=globals_name=_globals.globals_id}
_globals.globals_id=globals_id
if(_locals===_globals ||_locals===_b_.None){locals_id=globals_id
parent_scope=$B.builtins_scope}else{
var grandparent_scope={id:globals_id,parent_block:$B.builtins_scope,binding:{}}
parent_scope={id:locals_id,parent_block:grandparent_scope,binding:{}}
for(var attr in _globals.$string_dict){grandparent_scope.binding[$B.to_alias(attr)]=true}
for(var attr in _locals.$string_dict){parent_scope.binding[$B.to_alias(attr)]=true}}}
$B.$py_module_path[globals_id]=$B.$py_module_path[current_globals_id]
eval('var $locals_'+globals_id+' = {}\nvar $locals_'+
locals_id+' = {}')
if(_globals===_b_.None){var gobj=current_frame[3],ex='var $locals_'+globals_id+' = gobj;',obj={}
eval(ex)
for(var attr in gobj){if(attr.startsWith("$")&& !attr.startsWith("$$")){continue}
obj[attr]=gobj[attr]}
eval("$locals_"+globals_id+" = obj")}else{var globals_is_dict=false
if(_globals.$jsobj){var items=_globals.$jsobj}else{var items=_b_.dict.$to_obj(_globals)
_globals.$jsobj=items
globals_is_dict=true}
eval("$locals_"+globals_id+" = _globals.$jsobj")
for(var item in items){var item1=$B.to_alias(item)
try{eval('$locals_'+globals_id+'["'+item1+'"] = items.'+item)}catch(err){console.log(err)
console.log('error setting',item)
break}}}
_globals.$is_namespace=true
if(_locals===_b_.None){if(_globals !==_b_.None){eval('var $locals_'+locals_id+' = $locals_'+globals_id)}else{var lobj=current_frame[1],ex='',obj={}
for(var attr in current_frame[1]){if(attr.startsWith("$")&& !attr.startsWith("$$")){continue}
obj[attr]=lobj[attr]}
eval('$locals_'+locals_id+" = obj")}}else{var items
if(_locals.$jsobj){items=_locals.$jsobj}else if(_locals.__class__ !==_b_.dict){items=_locals}else{items=_b_.dict.$to_obj(_locals)
_locals.$jsobj=items}
for(var item in items){var item1=$B.to_alias(item)
try{eval('$locals_'+locals_id+'["'+item1+'"] = items.'+item)}catch(err){console.log(err)
console.log('error setting',item)
break}}
eval("$locals_"+locals_id+".$exec_locals = true")
eval("$locals_"+locals_id+".$is_not_dict = "+
(_locals.__class__ !==_b_.dict))}
_locals.$is_namespace=true
if(_globals===_b_.None && _locals===_b_.None &&
current_frame[0]==current_frame[2]){}else{eval("$locals_"+locals_id+".$src = src")}
var root=$B.py2js(src,globals_id,locals_id,parent_scope),js,gns,lns
if(_globals !==_b_.None &&
(_locals===_b_.None ||_locals===_globals)){for(var attr in _globals.$string_dict){root.binding[attr]=true}}
try{
var try_node=root.children[root.children.length-2],instr=try_node.children[try_node.children.length-2]
var type=instr.C.tree[0].type
switch(type){case 'expr':
case 'list_or_tuple':
case 'op':
case 'ternary':
var children=try_node.children
root.children.splice(root.children.length-2,2)
for(var i=0;i < children.length-1;i++){root.add(children[i])}
break
default:
if(mode=="eval"){throw _b_.SyntaxError.$factory(
"eval() argument must be an expression",'<string>',1,1,src)}}
if(mode !="eval"){
var last=$B.last(root.children),js=last.to_js()
if(["node_js"].indexOf(last.C.type)==-1){last.to_js=function(){while(js.endsWith("\n")){js=js.substr(0,js.length-1)}
while(js.endsWith(";")){js=js.substr(0,js.length-1)}
return "return ("+js+")"}}
js=root.to_js()
var locals_obj=eval("$locals_"+locals_id),globals_obj=eval("$locals_"+globals_id)
if(_globals===_b_.None){var res=new Function("$locals_"+globals_id,"$locals_"+locals_id,js)(
globals_obj,locals_obj)}else{current_globals_obj=current_frame[3]
current_locals_obj=current_frame[1]
var res=new Function("$locals_"+globals_id,"$locals_"+locals_id,"$locals_"+current_globals_id,"$locals_"+current_locals_id,js)(globals_obj,locals_obj,current_globals_obj,current_locals_obj)}
if($.src.mode && $.src.mode=="single" &&
$.src.filename=="<stdin>"){if(res !==_b_.None && res !==undefined){_b_.print(_b_.repr(res))}}}else{js=root.to_js()
var res=eval(js)}
if($.src.filename=="<console>" && $.src.mode=="single" &&
res !==undefined && res !==_b_.None){_b_.print(res)}
gns=eval("$locals_"+globals_id)
if($B.frames_stack[$B.frames_stack.length-1][2]==globals_id){gns=$B.frames_stack[$B.frames_stack.length-1][3]}
if(_locals !==_b_.None){lns=eval("$locals_"+locals_id)
for(var attr in lns){var attr1=$B.from_alias(attr)
if(attr1.charAt(0)!='$'){if(_locals.$jsobj){_locals.$jsobj[attr]=lns[attr]}else if(_locals.__class__ !==_b_.dict){$B.$setitem(_locals,attr1,lns[attr])}else{_b_.dict.$setitem(_locals,attr1,lns[attr])}}}}else{for(var attr in lns){if(attr !=="$src"){current_frame[1][attr]=lns[attr]}}}
if(_globals !==_b_.None){
if(globals_is_dict){var jsobj=_globals.$jsobj
delete _globals.$jsobj}
for(var attr in gns){attr1=$B.from_alias(attr)
if(attr1.charAt(0)!='$'){if(globals_is_dict){_b_.dict.$setitem(_globals,attr,gns[attr])}else{_globals.$jsobj[attr1]=gns[attr]}}}
for(var attr in _globals.$string_dict){if(attr.startsWith("$")&& !attr.startsWith("$$")){delete _globals.$string_dict[attr]}}}else{for(var attr in gns){if(attr !=="$src"){current_frame[3][attr]=gns[attr]}}}
if(res===undefined){return _b_.None}
return res}catch(err){err.src=src
err.module=globals_id
if(err.$py_error===undefined){throw $B.exception(err)}
if(globals_is_dict){delete _globals.$jsobj}
throw err}finally{
if($B.frames_stack.length==stack_len+1){$B.frames_stack.pop()}
root=null
js=null
gns=null
lns=null
$B.clear_ns(globals_id)
$B.clear_ns(locals_id)}}
$$eval.$is_func=true
function exec(src,globals,locals){var missing={}
var $=$B.args("exec",3,{src:null,globals:null,locals:null},["src","globals","locals"],arguments,{globals:_b_.None,locals:_b_.None},null,null),src=$.src,globals=$.globals,locals=$.locals
return $$eval(src,globals,locals,"exec")||_b_.None}
exec.$is_func=true
function exit(){throw _b_.SystemExit}
exit.__repr__=exit.__str__=function(){return "Use exit() or Ctrl-Z plus Return to exit"}
var filter=$B.make_class("filter",function(func,iterable){check_no_kw('filter',func,iterable)
check_nb_args('filter',2,arguments)
iterable=iter(iterable)
if(func===_b_.None){func=$B.$bool}
return{
__class__:filter,func:func,iterable:iterable}}
)
filter.__iter__=function(self){return self}
filter.__next__=function(self){while(true){var _item=next(self.iterable)
if(self.func(_item)){return _item}}}
$B.set_func_names(filter,"builtins")
function format(value,format_spec){var $=$B.args("format",2,{value:null,format_spec:null},["value","format_spec"],arguments,{format_spec:''},null,null)
var klass=value.__class__ ||$B.get_class(value)
try{var method=$B.$getattr(klass,'__format__')}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.NotImplementedError("__format__ is not implemented "+
"for object '"+_b_.str.$factory(value)+"'")}
throw err}
return $B.$call(method)(value,$.format_spec)}
function attr_error(attr,cname){var msg="bad operand type for unary #: '"+cname+"'"
switch(attr){case '__neg__':
throw _b_.TypeError.$factory(msg.replace('#','-'))
case '__pos__':
throw _b_.TypeError.$factory(msg.replace('#','+'))
case '__invert__':
throw _b_.TypeError.$factory(msg.replace('#','~'))
case '__call__':
throw _b_.TypeError.$factory("'"+cname+"'"+
' object is not callable')
default:
while(attr.charAt(0)=='$'){attr=attr.substr(1)}
throw _b_.AttributeError.$factory("'"+cname+
"' object has no attribute '"+attr+"'")}}
function getattr(){var missing={}
var $=$B.args("getattr",3,{obj:null,attr:null,_default:null},["obj","attr","_default"],arguments,{_default:missing},null,null)
return $B.$getattr($.obj,$.attr,$._default===missing ? undefined :$._default)}
function in_mro(klass,attr){if(klass===undefined){return false}
if(klass.hasOwnProperty(attr)){return klass[attr]}
var mro=klass.__mro__
for(var i=0,len=mro.length;i < len;i++){if(mro[i].hasOwnProperty(attr)){return mro[i][attr]}}
return false}
$B.$getattr=function(obj,attr,_default){
attr=$B.to_alias(attr)
if(obj.$method_cache &&
obj.$method_cache[attr]&&
obj.__class__ &&
obj.__class__[attr]==obj.$method_cache[attr][1]){
return obj.$method_cache[attr][0]}
var rawname=attr
if(obj===undefined){console.log("get attr",attr,"of undefined")}
var is_class=obj.$is_class ||obj.$factory
var klass=obj.__class__
var $test=false 
if($test){console.log("$getattr",attr,obj,klass)}
if(klass !==undefined && klass.__bases__ &&
klass.__getattribute__===undefined &&
(klass.__bases__.length==0 ||
(klass.__bases__.length==1 &&
klass.__bases__[0]===_b_.object))){if($test){console.log("class without parent")}
if(obj.hasOwnProperty(attr)){return obj[attr]}else if(obj.__dict__ &&
obj.__dict__.$string_dict.hasOwnProperty(attr)&&
!(klass.hasOwnProperty(attr)&&
klass[attr].__get__)){return obj.__dict__.$string_dict[attr][0]}else if(klass.hasOwnProperty(attr)){if(typeof klass[attr]!="function" &&
attr !="__dict__" &&
klass[attr].__get__===undefined){var kl=klass[attr].__class__
if(! in_mro(kl,"__get__")){return klass[attr]}}}}
if($test){console.log("attr",attr,"of",obj,"class",klass,"isclass",is_class)}
if(klass===undefined){
if(typeof obj=='string'){klass=_b_.str}
else if(typeof obj=='number'){klass=obj % 1==0 ? _b_.int :_b_.float}else if(obj instanceof Number){klass=_b_.float}else{klass=$B.get_class(obj)
if(klass===undefined){
if($test){console.log("no class",attr,obj.hasOwnProperty(attr),obj[attr])}
var res=obj[attr]
if(res !==undefined){if(typeof res=="function"){var f=function(){
return res.apply(obj,arguments)}
f.$infos={__name__:attr,__qualname__:attr}
return f}else{return $B.$JS2Py(res)}}
if(_default !==undefined){return _default}
throw _b_.AttributeError.$factory('object has no attribute '+rawname)}}}
switch(attr){case '__call__':
if(typeof obj=='function'){var res=function(){return obj.apply(null,arguments)}
res.__class__=method_wrapper
res.$infos={__name__:"__call__"}
return res}
break
case '__class__':
return klass
case '__dict__':
if(is_class){var proxy={}
for(var key in obj){var key1=$B.from_alias(key)
if(! key1.startsWith("$")){proxy[key1]=obj[key]}}
proxy.__dict__=$B.getset_descriptor.$factory(obj,"__dict__")
return $B.mappingproxy.$factory(proxy)}else{if(obj.hasOwnProperty(attr)){return obj[attr]}else if(obj.$infos){if(obj.$infos.hasOwnProperty("__dict__")){return obj.$infos.__dict__}else if(obj.$infos.hasOwnProperty("__func__")){return obj.$infos.__func__.$infos.__dict__}}
return $B.obj_dict(obj)}
case '__doc__':
for(var i=0;i < builtin_names.length;i++){if(obj===_b_[builtin_names[i]]){_get_builtins_doc()
return $B.builtins_doc[builtin_names[i]]}}
break
case '__mro__':
if(obj.$is_class){
return _b_.tuple.$factory([obj].concat(obj.__mro__))}else if(obj.__dict__ &&
obj.__dict__.$string_dict.__mro__ !==undefined){return obj.__dict__.$string_dict.__mro__}
throw _b_.AttributeError.$factory(attr)
case '__subclasses__':
if(klass.$factory ||klass.$is_class){var subclasses=obj.$subclasses ||[]
return function(){return subclasses}}
break}
if(typeof obj=='function'){var value=obj[attr]
if(value !==undefined){if(attr=='__module__'){return value}}}
if((! is_class)&& klass.$native){if(obj.$method_cache && obj.$method_cache[attr]){return obj.$method_cache[attr]}
if($test){console.log("native class",klass,klass[attr])}
if(attr=="__doc__" && klass[attr]===undefined && klass.$infos){_get_builtins_doc()
klass[attr]=$B.builtins_doc[klass.$infos.__name__]}
if(klass[attr]===undefined){var object_attr=_b_.object[attr]
if($test){console.log("object attr",object_attr)}
if(object_attr !==undefined){klass[attr]=object_attr}else{if($test){console.log("obj[attr]",obj[attr])}
var attrs=obj.__dict__
if(attrs &&
(object_attr=attrs.$string_dict[attr])!==undefined){return object_attr[0]}
if(_default===undefined){attr_error(attr,klass.$infos.__name__)}
return _default}}
if(klass.$descriptors && klass.$descriptors[attr]!==undefined){return klass[attr](obj)}
if(typeof klass[attr]=='function'){var func=klass[attr]
if(attr=='__new__'){func.$type="staticmethod"}
if(func.$type=="staticmethod"){return func}
var self=klass[attr].__class__==$B.method ? klass :obj,method=klass[attr].bind(null,self)
method.__class__=$B.method
method.$infos={__func__:func,__name__:attr,__self__:self,__qualname__:klass.$infos.__name__+"."+attr}
if(typeof obj=="object"){
obj.__class__=klass
obj.$method_cache=obj.$method_cache ||{}
obj.$method_cache[attr]=method}
return method}else if(klass[attr]!==undefined){return klass[attr]}
attr_error(rawname,klass.$infos.__name__)}
var mro,attr_func
if(is_class){attr_func=_b_.type.__getattribute__ }else{attr_func=klass.__getattribute__
if(attr_func===undefined){var mro=klass.__mro__
if(mro===undefined){console.log(obj,attr,"no mro, klass",klass)}
for(var i=0,len=mro.length;i < len;i++){attr_func=mro[i]['__getattribute__']
if(attr_func !==undefined){break}}}}
if(typeof attr_func !=='function'){console.log(attr+' is not a function '+attr_func,klass)}
var odga=_b_.object.__getattribute__
if($test){console.log("attr_func is odga ?",attr_func,attr_func===odga,obj[attr])}
if(attr_func===odga){var res=obj[attr]
if(Array.isArray(obj)&& Array.prototype[attr]!==undefined){
res=undefined}
if(res===null){return null}else if(res===undefined && obj.hasOwnProperty(attr)){return res}else if(res !==undefined){if($test){console.log(obj,attr,obj[attr],res.__set__ ||res.$is_class)}
if(res.__set__===undefined ||res.$is_class){if($test){console.log("return",res,res+'',res.__set__,res.$is_class)}
return res}}}
try{var res=attr_func(obj,attr)
if($test){console.log("result of attr_func",res)}}catch(err){if(_default !==undefined){return _default}
throw err}
if(res !==undefined){return res}
if(_default !==undefined){return _default}
var cname=klass.$infos.__name__
if(is_class){cname=obj.$infos.__name__}
attr_error(rawname,cname)}
function globals(){
check_nb_args('globals',0,arguments)
var res=$B.obj_dict($B.last($B.frames_stack)[3])
res.$jsobj.__BRYTHON__=$B.JSObj.$factory($B)
res.$is_namespace=true
return res}
function hasattr(obj,attr){check_no_kw('hasattr',obj,attr)
check_nb_args('hasattr',2,arguments)
try{$B.$getattr(obj,attr)
return true}catch(err){return false}}
var hash_cache={}
function hash(obj){check_no_kw('hash',obj)
check_nb_args('hash',1,arguments)
if(obj.__hashvalue__ !==undefined){return obj.__hashvalue__}
if(isinstance(obj,_b_.bool)){return _b_.int.$factory(obj)}
if(obj.$is_class ||
obj.__class__===_b_.type ||
obj.__class__===$B.Function){return obj.__hashvalue__=$B.$py_next_hash--}
if(typeof obj=="string"){var cached=hash_cache[obj]
if(cached !==undefined){return cached}
else{return hash_cache[obj]=_b_.str.__hash__(obj)}}
var klass=obj.__class__ ||$B.get_class(obj)
if(klass===undefined){throw _b_.TypeError.$factory("unhashable type: '"+
_b_.str.$factory($B.JSObj.$factory(obj))+"'")}
var hash_method=$B.$getattr(klass,'__hash__',_b_.None)
if(hash_method===_b_.None){throw _b_.TypeError.$factory("unhashable type: '"+
$B.class_name(obj)+"'")}
if(hash_method.$infos.__func__===_b_.object.__hash__){if($B.$getattr(obj,'__eq__').$infos.__func__ !==_b_.object.__eq__){throw _b_.TypeError.$factory("unhashable type: '"+
$B.class_name(obj)+"'",'hash')}else{return obj.__hashvalue__=_b_.object.__hash__(obj)}}else{return $B.$call(hash_method)(obj)}}
function _get_builtins_doc(){if($B.builtins_doc===undefined){
var url=$B.brython_path
if(url.charAt(url.length-1)=='/'){url=url.substr(0,url.length-1)}
url+='/builtins_docstrings.js'
var f=_b_.open(url)
eval(f.$string)
$B.builtins_doc=docs}}
function help(obj){if(obj===undefined){obj='help'}
if(typeof obj=='string' && _b_[obj]!==undefined){_get_builtins_doc()
var _doc=$B.builtins_doc[obj]
if(_doc !==undefined && _doc !=''){_b_.print(_doc)
return}}
for(var i=0;i < builtin_names.length;i++){if(obj===_b_[builtin_names[i]]){_get_builtins_doc()
_b_.print(_doc=$B.builtins_doc[builtin_names[i]])}}
if(typeof obj=='string'){$B.$import("pydoc");
var pydoc=$B.imported["pydoc"]
$B.$getattr($B.$getattr(pydoc,"help"),"__call__")(obj)
return}
try{return $B.$getattr(obj,'__doc__')}
catch(err){return ''}}
help.__repr__=help.__str__=function(){return "Type help() for interactive help, or help(object) "+
"for help about object."}
function hex(obj){check_no_kw('hex',obj)
check_nb_args('hex',1,arguments)
return bin_hex_oct(16,obj)}
function id(obj){check_no_kw('id',obj)
check_nb_args('id',1,arguments)
if(isinstance(obj,[_b_.str,_b_.int,_b_.float])&&
!isinstance(obj,$B.long_int)){return $B.$getattr(_b_.str.$factory(obj),'__hash__')()}else if(obj.$id !==undefined){return obj.$id}
else{return obj.$id=$B.UUID()}}
function __import__(mod_name,globals,locals,fromlist,level){
var $=$B.args('__import__',5,{name:null,globals:null,locals:null,fromlist:null,level:null},['name','globals','locals','fromlist','level'],arguments,{globals:None,locals:None,fromlist:_b_.tuple.$factory(),level:0},null,null)
return $B.$__import__($.name,$.globals,$.locals,$.fromlist)}
function input(msg){var res=prompt(msg ||'')||''
if($B.imported["sys"]&& $B.imported["sys"].ps1){
var ps1=$B.imported["sys"].ps1,ps2=$B.imported["sys"].ps2
if(msg==ps1 ||msg==ps2){console.log(msg,res)}}
return res}
function isinstance(obj,cls){check_no_kw('isinstance',obj,cls)
check_nb_args('isinstance',2,arguments)
if(obj===null){return cls===None}
if(obj===undefined){return false}
if(cls.constructor===Array){for(var i=0;i < cls.length;i++){if(isinstance(obj,cls[i])){return true}}
return false}
if(cls.__class__===$B.GenericAlias){
throw _b_.TypeError.$factory(
'isinstance() arg 2 cannot be a parameterized generic')}
if(!cls.__class__ ||
!(cls.$factory !==undefined ||cls.$is_class !==undefined)){throw _b_.TypeError.$factory("isinstance() arg 2 must be a type "+
"or tuple of types")}
if(cls===_b_.int &&(obj===True ||obj===False)){return True}
if(cls===_b_.bool){switch(typeof obj){case "string":
return false
case "number":
return false
case "boolean":
return true}}
var klass=obj.__class__
if(klass==undefined){if(typeof obj=='string'){if(cls==_b_.str){return true}
else if($B.builtin_classes.indexOf(cls)>-1){return false}}else if(obj.contructor===Number && Number.isFinite(obj)){if(cls==_b_.float){return true}}else if(typeof obj=='number' && Number.isFinite(obj)){if(Number.isFinite(obj)&& cls==_b_.int){return true}}
klass=$B.get_class(obj)}
if(klass===undefined){return false}
function check(kl,cls){if(kl===cls){return true}
else if(cls===_b_.str && kl===$B.StringSubclass){return true}
else if(cls===_b_.int && kl===$B.IntSubclass){return true}}
if(check(klass,cls)){return true}
var mro=klass.__mro__
for(var i=0;i < mro.length;i++){if(check(mro[i],cls)){return true}}
var instancecheck=$B.$getattr(cls.__class__ ||$B.get_class(cls),'__instancecheck__',_b_.None)
if(instancecheck !==_b_.None){return instancecheck(cls,obj)}
return false}
function issubclass(klass,classinfo){check_no_kw('issubclass',klass,classinfo)
check_nb_args('issubclass',2,arguments)
if(!klass.__class__ ||
!(klass.$factory !==undefined ||klass.$is_class !==undefined)){throw _b_.TypeError.$factory("issubclass() arg 1 must be a class")}
if(isinstance(classinfo,_b_.tuple)){for(var i=0;i < classinfo.length;i++){if(issubclass(klass,classinfo[i])){return true}}
return false}
if(classinfo.__class__===$B.GenericAlias){throw _b_.TypeError.$factory(
'issubclass() arg 2 cannot be a parameterized generic')}
if(classinfo.$factory ||classinfo.$is_class){if(klass===classinfo ||
klass.__mro__.indexOf(classinfo)>-1){return true}}
var sch=$B.$getattr(classinfo.__class__ ||$B.get_class(classinfo),'__subclasscheck__',_b_.None)
if(sch==_b_.None){return false}
return sch(classinfo,klass)}
var iterator_class=$B.make_class("iterator",function(getitem,len){return{
__class__:iterator_class,getitem:getitem,len:len,counter:-1}}
)
iterator_class.__next__=function(self){self.counter++
if(self.len !==null && self.counter==self.len){throw _b_.StopIteration.$factory('')}
try{return self.getitem(self.counter)}
catch(err){throw _b_.StopIteration.$factory('')}}
callable_iterator=$B.make_class("callable_iterator",function(func,sentinel){return{
__class__:callable_iterator,func:func,sentinel:sentinel}}
)
callable_iterator.__iter__=function(self){return self}
callable_iterator.__next__=function(self){var res=self.func()
if($B.rich_comp("__eq__",res,self.sentinel)){throw _b_.StopIteration.$factory()}
return res}
$B.$iter=function(obj,sentinel){
if(sentinel===undefined){var klass=obj.__class__ ||$B.get_class(obj)
try{var _iter=$B.$call($B.$getattr(klass,'__iter__'))}catch(err){if(err.__class__===_b_.AttributeError){try{var gi_method=$B.$call($B.$getattr(klass,'__getitem__')),gi=function(i){return gi_method(obj,i)},ln=len(obj)
return iterator_class.$factory(gi,len)}catch(err){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object is not iterable")}}
throw err}
var res=$B.$call(_iter)(obj)
try{$B.$getattr(res,'__next__')}
catch(err){if(isinstance(err,_b_.AttributeError)){throw _b_.TypeError.$factory(
"iter() returned non-iterator of type '"+
$B.class_name(res)+"'")}}
return res}else{return callable_iterator.$factory(obj,sentinel)}}
function iter(){
var $=$B.args('iter',1,{obj:null},['obj'],arguments,{},'args','kw'),sentinel
if($.args.length > 0){var sentinel=$.args[0]}
return $B.$iter($.obj,sentinel)}
function len(obj){check_no_kw('len',obj)
check_nb_args('len',1,arguments)
var klass=obj.__class__ ||$B.get_class(obj)
try{var method=$B.$getattr(klass,'__len__')}catch(err){throw _b_.TypeError.$factory("object of type '"+
$B.class_name(obj)+"' has no len()")}
return $B.$call(method)(obj)}
function locals(){
check_nb_args('locals',0,arguments)
var res=$B.obj_dict($B.last($B.frames_stack)[1])
res.$is_namespace=true
delete res.$jsobj.__annotations__
return res}
var map=$B.make_class("map",function(){var $=$B.args('map',2,{func:null,it1:null},['func','it1'],arguments,{},'args',null),func=$B.$call($.func)
var iter_args=[$B.$iter($.it1)]
$.args.forEach(function(item){iter_args.push($B.$iter(item))})
var obj={__class__:map,args:iter_args,func:func}
return obj}
)
map.__iter__=function(self){return self}
map.__next__=function(self){var args=[]
for(var i=0;i < self.args.length;i++){args.push(next(self.args[i]))}
return self.func.apply(null,args)}
$B.set_func_names(map,"builtins")
function $extreme(args,op){
var $op_name='min'
if(op==='__gt__'){$op_name="max"}
if(args.length==0){throw _b_.TypeError.$factory($op_name+
" expected 1 arguments, got 0")}
var last_arg=args[args.length-1],nb_args=args.length,has_default=false,func=false
if(last_arg.$nat=='kw'){nb_args--
last_arg=last_arg.kw
for(var attr in last_arg){switch(attr){case 'key':
func=last_arg[attr]
break
case '$$default':
var default_value=last_arg[attr]
has_default=true
break
default:
throw _b_.TypeError.$factory("'"+attr+
"' is an invalid keyword argument for this function")}}}
if((! func)||func===_b_.None){func=function(x){return x}}
if(nb_args==0){throw _b_.TypeError.$factory($op_name+" expected 1 argument, got 0")}else if(nb_args==1){
var $iter=iter(args[0]),res=null
while(true){try{var x=next($iter)
if(res===null ||$B.$bool($B.$getattr(func(x),op)(func(res)))){res=x}}catch(err){if(err.__class__==_b_.StopIteration){if(res===null){if(has_default){return default_value}
else{throw _b_.ValueError.$factory($op_name+
"() arg is an empty sequence")}}else{return res}}
throw err}}}else{if(has_default){throw _b_.TypeError.$factory("Cannot specify a default for "+
$op_name+"() with multiple positional arguments")}
var res=null
for(var i=0;i < nb_args;i++){var x=args[i]
if(res===null ||$B.$bool($B.$getattr(func(x),op)(func(res)))){res=x}}
return res}}
function max(){return $extreme(arguments,'__gt__')}
var memoryview=$B.make_class('memoryview',function(obj){check_no_kw('memoryview',obj)
check_nb_args('memoryview',1,arguments)
if(obj.__class__===memoryview){return obj}
if($B.get_class(obj).$buffer_protocol){return{
__class__:memoryview,obj:obj,
format:'B',itemsize:1,ndim:1,shape:_b_.tuple.$factory([_b_.len(obj)]),strides:_b_.tuple.$factory([1]),suboffsets:_b_.tuple.$factory([]),c_contiguous:true,f_contiguous:true,contiguous:true}}else{throw _b_.TypeError.$factory("memoryview: a bytes-like object "+
"is required, not '"+$B.class_name(obj)+"'")}}
)
memoryview.__eq__=function(self,other){if(other.__class__ !==memoryview){return false}
return $B.$getattr(self.obj,'__eq__')(other.obj)}
memoryview.__getitem__=function(self,key){if(isinstance(key,_b_.int)){var start=key*self.itemsize
if(self.format=="I"){var res=self.obj.source[start],coef=256
for(var i=1;i < 4;i++){res+=self.obj.source[start+i]*coef
coef*=256}
return res}else if("B".indexOf(self.format)>-1){if(key > self.obj.source.length-1){throw _b_.KeyError.$factory(key)}
return self.obj.source[key]}else{
return self.obj.source[key]}}
var res=self.obj.__class__.__getitem__(self.obj,key)
if(key.__class__===_b_.slice){return memoryview.$factory(res)}}
memoryview.__len__=function(self){return len(self.obj)/self.itemsize}
memoryview.cast=function(self,format){switch(format){case "B":
return memoryview.$factory(self.obj)
case "I":
var res=memoryview.$factory(self.obj),objlen=len(self.obj)
res.itemsize=4
res.format="I"
if(objlen % 4 !=0){throw _b_.TypeError.$factory("memoryview: length is not "+
"a multiple of itemsize")}
return res}}
memoryview.hex=function(self){var res='',bytes=_b_.bytes.$factory(self)
bytes.source.forEach(function(item){res+=item.toString(16)})
return res}
memoryview.tobytes=function(self){return _b_.bytes.$factory(self.obj)}
memoryview.tolist=function(self){if(self.itemsize==1){return _b_.list.$factory(_b_.bytes.$factory(self.obj))}else if(self.itemsize==4){if(self.format=="I"){var res=[]
for(var i=0;i < self.obj.source.length;i+=4){var item=self.obj.source[i],coef=256
for(var j=1;j < 4;j++){item+=coef*self.obj.source[i+j]
coef*=256}
res.push(item)}
return res}}}
$B.set_func_names(memoryview,"builtins")
function min(){return $extreme(arguments,'__lt__')}
function next(obj){check_no_kw('next',obj)
var missing={},$=$B.args("next",2,{obj:null,def:null},['obj','def'],arguments,{def:missing},null,null)
var klass=obj.__class__ ||$B.get_class(obj),ga=$B.$call($B.$getattr(klass,"__next__"))
if(ga !==undefined){try{return $B.$call(ga)(obj)}catch(err){if(err.__class__===_b_.StopIteration &&
$.def !==missing){return $.def}
throw err}}
throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object is not an iterator")}
var NotImplementedType=$B.make_class("NotImplementedType",function(){return NotImplemented}
)
NotImplementedType.__repr__=NotImplementedType.__str__=function(self){return "NotImplemented"}
$B.set_func_names(NotImplementedType,"builtins")
var NotImplemented={__class__:NotImplementedType}
function $not(obj){return !$B.$bool(obj)}
function oct(obj){check_no_kw('oct',obj)
check_nb_args('oct',1,arguments)
return bin_hex_oct(8,obj)}
function ord(c){check_no_kw('ord',c)
check_nb_args('ord',1,arguments)
if(typeof c=='string'){if(c.length==1){return c.charCodeAt(0)}
if((0xD800 <=c[0]&& c[0]<=0xDBFF)||
(0xDC00 <=c[1]&& c[1]<=0xDFFF)){throw _b_.TypeError.$factory('ord() expected a character, but '+
'string of length '+c.length+' found')}
var code=0x10000
code+=(c.charCodeAt(0)& 0x03FF)<< 10
code+=(c.charCodeAt(1)& 0x03FF)
return code}
switch($B.get_class(c)){case _b_.str:
if(c.length==1){return c.charCodeAt(0)}
throw _b_.TypeError.$factory('ord() expected a character, but '+
'string of length '+c.length+' found')
case _b_.bytes:
case _b_.bytearray:
if(c.source.length==1){return c.source[0]}
throw _b_.TypeError.$factory('ord() expected a character, but '+
'string of length '+c.source.length+' found')
default:
throw _b_.TypeError.$factory('ord() expected a character, but '+
$B.class_name(c)+' was found')}}
function pow(){var $=$B.args('pow',3,{x:null,y:null,mod:null},['x','y','mod'],arguments,{mod:None},null,null),x=$.x,y=$.y,z=$.mod
var klass=x.__class__ ||$B.get_class(x)
if(z===_b_.None){return $B.rich_op('pow',x,y)}else{if(x !=_b_.int.$factory(x)||y !=_b_.int.$factory(y)){throw _b_.TypeError.$factory("pow() 3rd argument not allowed "+
"unless all arguments are integers")}
return $B.$call($B.$getattr(klass,'__pow__'))(x,y,z)}}
function $print(){var $ns=$B.args('print',0,{},[],arguments,{},'args','kw')
var ks=$ns['kw'].$string_dict
var end=(ks['end']===undefined ||ks['end']===None)? '\n' :ks['end'][0],sep=(ks['sep']===undefined ||ks['sep']===None)? ' ' :ks['sep'][0],file=ks['file']===undefined ? $B.stdout :ks['file'][0],args=$ns['args'],writer=$B.$getattr(file,'write')
var items=[]
for(var i=0,len=args.length;i < len;i++){var arg=_b_.str.$factory(args[i])
writer(arg)
if(i < len-1){writer(sep)}}
writer(end)
var flush=$B.$getattr(file,'flush',None)
if(flush !==None){flush()}
return None}
$print.__name__='print'
$print.is_func=true
var property=$B.make_class("property",function(fget,fset,fdel,doc){var res={__class__:property}
property.__init__(res,fget,fset,fdel,doc)
return res}
)
property.__init__=function(self,fget,fset,fdel,doc){self.__doc__=doc ||""
self.$type=fget.$type
self.fget=fget
self.fset=fset
self.fdel=fdel
if(fget && fget.$attrs){for(var key in fget.$attrs){self[key]=fget.$attrs[key]}}
self.__get__=function(self,obj,objtype){if(obj===undefined){return self}
if(self.fget===undefined){throw _b_.AttributeError.$factory("unreadable attribute")}
return $B.$call(self.fget)(obj)}
if(fset !==undefined){self.__set__=function(self,obj,value){if(self.fset===undefined){throw _b_.AttributeError.$factory("can't set attribute")}
$B.$getattr(self.fset,'__call__')(obj,value)}}
self.__delete__=fdel;
self.getter=function(fget){return property.$factory(fget,self.fset,self.fdel,self.__doc__)}
self.setter=function(fset){return property.$factory(self.fget,fset,self.fdel,self.__doc__)}
self.deleter=function(fdel){return property.$factory(self.fget,self.fset,fdel,self.__doc__)}}
property.__repr__=function(self){$B.builtins_repr_check(property,arguments)
return _b_.repr(self.fget(self))}
$B.set_func_names(property,"builtins")
function quit(){throw _b_.SystemExit}
quit.__repr__=quit.__str__=function(){return "Use quit() or Ctrl-Z plus Return to exit"}
function repr(obj){check_no_kw('repr',obj)
check_nb_args('repr',1,arguments)
var klass=obj.__class__ ||$B.get_class(obj)
return $B.$call($B.$getattr(klass,"__repr__"))(obj)}
var reversed=$B.make_class("reversed",function(seq){
check_no_kw('reversed',seq)
check_nb_args('reversed',1,arguments)
var klass=seq.__class__ ||$B.get_class(seq),rev_method=$B.$getattr(klass,'__reversed__',null)
if(rev_method !==null){return $B.$call(rev_method)(seq)}
try{var method=$B.$getattr(klass,'__getitem__')}catch(err){throw _b_.TypeError.$factory("argument to reversed() must be a sequence")}
var res={__class__:reversed,$counter :_b_.len(seq),getter:function(i){return $B.$call(method)(seq,i)}}
return res}
)
reversed.__iter__=function(self){return self}
reversed.__next__=function(self){self.$counter--
if(self.$counter < 0){throw _b_.StopIteration.$factory('')}
return self.getter(self.$counter)}
$B.set_func_names(reversed,"builtins")
function round(){var $=$B.args('round',2,{number:null,ndigits:null},['number','ndigits'],arguments,{ndigits:None},null,null),arg=$.number,n=$.ndigits===None ? 0 :$.ndigits
if(!isinstance(arg,[_b_.int,_b_.float])){var klass=arg.__class__ ||$B.get_class(arg)
try{return $B.$call($B.$getattr(klass,"__round__")).apply(null,arguments)}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("type "+$B.class_name(arg)+
" doesn't define __round__ method")}else{throw err}}}
if(isinstance(arg,_b_.float)&&
(arg.value===Infinity ||arg.value===-Infinity)){throw _b_.OverflowError.$factory("cannot convert float infinity to integer")}
if(!isinstance(n,_b_.int)){throw _b_.TypeError.$factory(
"'"+$B.class_name(n)+"' object cannot be interpreted as an integer")}
var mult=Math.pow(10,n),x=arg*mult,floor=Math.floor(x),diff=Math.abs(x-floor),res
if(diff==0.5){if(floor % 2){floor+=1}
res=_b_.int.__truediv__(floor,mult)}else{res=_b_.int.__truediv__(Math.round(x),mult)}
if($.ndigits===None){
return res.valueOf()}else if(arg instanceof Number){return new Number(res)}else{return res.valueOf()}}
function setattr(){var $=$B.args('setattr',3,{obj:null,attr:null,value:null},['obj','attr','value'],arguments,{},null,null),obj=$.obj,attr=$.attr,value=$.value
if(!(typeof attr=='string')){throw _b_.TypeError.$factory("setattr(): attribute name must be string")}
return $B.$setattr(obj,attr,value)}
$B.$setattr=function(obj,attr,value){
var $test=false 
var unaliased=$B.from_alias(attr)
if($B.aliased_names[attr]){attr='$$'+attr}else if(attr=='__dict__'){
if(! isinstance(value,_b_.dict)){throw _b_.TypeError.$factory("__dict__ must be set to a dictionary, "+
"not a '"+$B.class_name(value)+"'")}
if(obj.$infos){obj.$infos.__dict__=value
return None}
obj.__dict__=value
return None}else if(attr=="__class__"){
function error(msg){throw _b_.TypeError.$factory(msg)}
if(value.__class__){if(value.__module__=="builtins"){error("__class__ assignement only "+
"supported for heap types or ModuleType subclasses")}else if(Array.isArray(value.__bases__)){for(var i=0;i < value.__bases__.length;i++){if(value.__bases__[i].__module__=="builtins"){error("__class__ assignment: '"+$B.class_name(obj)+
"' object layout differs from '"+
$B.class_name(value)+"'")}}}}
obj.__class__=value
return None}else if(attr=="__doc__" && obj.__class__===_b_.property){obj[attr]=value}
if($test){console.log("set attr",attr,"to",obj)}
if(obj.$factory ||obj.$is_class){var metaclass=obj.__class__
if($test){console.log("obj is class",metaclass,metaclass[attr])}
if(metaclass && metaclass[attr]&& metaclass[attr].__get__ &&
metaclass[attr].__set__){metaclass[attr].__set__(obj,value)
return None}
if(attr=="__module__"){obj.$infos.__module__=value
return _b_.None}
if(obj.$infos && obj.$infos.__module__=="builtins"){throw _b_.TypeError.$factory(
"can't set attributes of built-in/extension type '"+
obj.$infos.__name__+"'")}
obj[attr]=value
if(attr=="__init__" ||attr=="__new__"){
obj.$factory=$B.$instance_creator(obj)}else if(attr=="__bases__"){
obj.__mro__=_b_.type.mro(obj)}
if($test){console.log("after setattr",obj)}
return None}
var res=obj[attr],klass=obj.__class__ ||$B.get_class(obj)
if($test){console.log('set attr',attr,'of obj',obj,'class',klass,"obj[attr]",obj[attr])}
if(res===undefined && klass){res=klass[attr]
if(res===undefined){var mro=klass.__mro__,_len=mro.length
for(var i=0;i < _len;i++){res=mro[i][attr]
if(res !==undefined){break}}}}
if($test){console.log('set attr',attr,'klass',klass,'found in class',res)}
if(res !==undefined && res !==null){
if(res.__set__ !==undefined){res.__set__(res,obj,value);return None}
var rcls=res.__class__,__set1__
if(rcls !==undefined){var __set1__=rcls.__set__
if(__set1__===undefined){var mro=rcls.__mro__
for(var i=0,_len=mro.length;i < _len;i++){__set1__=mro[i].__set__
if(__set1__){break}}}}
if(__set1__ !==undefined){var __set__=$B.$getattr(res,'__set__',null)
if(__set__ &&(typeof __set__=='function')){__set__.apply(res,[obj,value])
return None}}else if(klass && klass.$descriptors !==undefined &&
klass[attr]!==undefined){var setter=klass[attr].setter
if(typeof setter=='function'){setter(obj,value)
return None}else{throw _b_.AttributeError.$factory('readonly attribute')}}}
var _setattr=false
if(klass !==undefined){_setattr=klass.__setattr__
if(_setattr===undefined){var mro=klass.__mro__
for(var i=0,_len=mro.length-1;i < _len;i++){_setattr=mro[i].__setattr__
if(_setattr){break}}}}
var special_attrs=["__module__"]
if(klass && klass.__slots__ && special_attrs.indexOf(attr)==-1 &&
! _setattr){function mangled_slots(klass){if(klass.__slots__){if(Array.isArray(klass.__slots__)){return klass.__slots__.map(function(item){if(item.startsWith("__")&& ! item.endsWith("_")){return "_"+klass.$infos.__name__+item}else{return item}})}else{return klass.__slots__}}
return[]}
var has_slot=false
if(mangled_slots(klass).indexOf(unaliased)>-1){has_slot=true}else{for(var i=0;i < klass.__mro__.length;i++){var kl=klass.__mro__[i]
if(mangled_slots(kl).indexOf(unaliased)>-1){has_slot=true
break}}}
if(! has_slot){throw _b_.AttributeError.$factory("'"+klass.$infos.__name__+
"' object has no attribute '"+unaliased+"'")}}
if($test){console.log("attr",attr,"use _setattr",_setattr)}
if(!_setattr){if(obj.__dict__===undefined){obj[attr]=value}else{_b_.dict.$setitem(obj.__dict__,unaliased,value)}
if($test){console.log("no setattr, obj",obj)}}else{_setattr(obj,attr,value)}
return None}
function sorted(){var $=$B.args('sorted',1,{iterable:null},['iterable'],arguments,{},null,'kw')
var _list=_b_.list.$factory(iter($.iterable)),args=[_list]
for(var i=1;i < arguments.length;i++){args.push(arguments[i])}
_b_.list.sort.apply(null,args)
return _list}
var staticmethod=$B.make_class("staticmethod",function(func){var f={$infos:func.$infos,__get__:function(){return func}}
f.__get__.__class__=$B.method_wrapper
f.__get__.$infos=func.$infos
return f}
)
$B.set_func_names(staticmethod,"builtins")
function sum(iterable,start){var $=$B.args('sum',2,{iterable:null,start:null},['iterable','start'],arguments,{start:0},null,null),iterable=$.iterable,start=$.start
if(_b_.isinstance(start,[_b_.str,_b_.bytes])){throw _b_.TypeError.$factory("TypeError: sum() can't sum bytes"+
" [use b''.join(seq) instead]")}
var res=start,iterable=iter(iterable)
while(1){try{var _item=next(iterable)
res=$B.add(res,_item)}catch(err){if(err.__class__===_b_.StopIteration){break}else{throw err}}}
return res}
$B.missing_super2=function(obj){obj.$missing=true
return obj}
var $$super=$B.make_class("super",function(_type,object_or_type){var no_object_or_type=object_or_type===undefined
if(_type===undefined && object_or_type===undefined){var frame=$B.last($B.frames_stack),pyframe=$B.imported["_sys"].Getframe()
if(pyframe.f_code && pyframe.f_code.co_varnames){_type=frame[1].__class__
if(_type===undefined){throw _b_.RuntimeError.$factory("super(): no arguments")}
object_or_type=frame[1][pyframe.f_code.co_varnames[0]]}else{throw _b_.RuntimeError.$factory("super(): no arguments")}}
if(! no_object_or_type && Array.isArray(object_or_type)){object_or_type=object_or_type[0]}
return{
__class__:$$super,__thisclass__:_type,__self_class__:object_or_type}}
)
$$super.__get__=function(self,instance,klass){
return $$super.$factory(self.__thisclass__,instance)}
$$super.__getattribute__=function(self,attr){var mro=self.__thisclass__.__mro__,res
if(self.__thisclass__.$is_js_class){if(attr=="__init__"){
return function(){mro[0].$js_func.call(self.__self_class__,...arguments)}}}
var sc=self.__self_class__
if(sc !==undefined){if(!sc.$is_class){sc=sc.__class__ ||$B.get_class(sc)}
var sc_mro=[sc].concat(sc.__mro__)
for(var i=0;i < sc_mro.length;i++){if(sc_mro[i]===self.__thisclass__){mro=sc_mro.slice(i+1)
break}}}
var $test=false 
var f
for(var i=0,len=mro.length;i < len;i++){if(mro[i][attr]!==undefined){f=mro[i][attr]
break}}
if(f===undefined){if($$super[attr]!==undefined){return(function(x){return function(){var args=[x]
for(var i=0,len=arguments.length;i < len;i++){args.push(arguments[i])}
return $$super[attr].apply(null,args)}})(self)}
if($test){console.log("no attr",attr,self,"mro",mro)}
throw _b_.AttributeError.$factory(attr)}
if($test){console.log("super",attr,self,"mro",mro,"found in mro[0]",mro[0],f,f+'')}
if(f.$type=="staticmethod" ||attr=="__new__"){return f}else if(typeof f !="function"){return f}else{if(f.__class__===$B.method){
f=f.$infos.__func__}
var callable=$B.$call(f)
var method=function(){var res=callable(self.__self_class__,...arguments)
if($test){console.log("calling super",self.__self_class__,attr,f,"res",res)}
return res}
method.__class__=$B.method
var module
if(f.$infos !==undefined){module=f.$infos.__module__}else if(f.__class__===property){module=f.fget.$infos.__module}else if(f.$is_class){module=f.__module__}
method.$infos={__self__:self.__self_class__,__func__:f,__name__:attr,__module__:module,__qualname__:self.__thisclass__.$infos.__name__+"."+attr}
return method}
throw _b_.AttributeError.$factory("object 'super' has no attribute '"+
attr+"'")}
$$super.__repr__=function(self){$B.builtins_repr_check($$super,arguments)
var res="<super: <class '"+self.__thisclass__.$infos.__name__+"'>"
if(self.__self_class__ !==undefined){res+=', <'+self.__self_class__.__class__.$infos.__name__+' object>'}else{res+=', NULL'}
return res+'>'}
$B.set_func_names($$super,"builtins")
function vars(){var def={},$=$B.args('vars',1,{obj:null},['obj'],arguments,{obj:def},null,null)
if($.obj===def){return _b_.locals()}else{try{return $B.$getattr($.obj,'__dict__')}
catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("vars() argument must have __dict__ attribute")}
throw err}}}
var $Reader=$B.make_class("Reader")
$Reader.__enter__=function(self){return self}
$Reader.__exit__=function(self){return false}
$Reader.__iter__=function(self){
return iter($Reader.readlines(self))}
$Reader.__len__=function(self){return self.lines.length}
$Reader.close=function(self){self.closed=true}
$Reader.flush=function(self){return None}
$Reader.read=function(){var $=$B.args("read",2,{self:null,size:null},["self","size"],arguments,{size:-1},null,null),self=$.self,size=$B.$GetInt($.size)
if(self.closed===true){throw _b_.ValueError.$factory('I/O operation on closed file')}
if(size < 0){size=self.$length-self.$counter}
if(self.$binary){res=_b_.bytes.$factory(self.$content.source.slice(self.$counter,self.$counter+size))}else{res=self.$content.substr(self.$counter,size)}
self.$counter+=size
return res}
$Reader.readable=function(self){return true}
function make_lines(self){
if(self.$lines===undefined){if(! self.$binary){self.$lines=self.$content.split("\n")}else{var lines=[],pos=0,source=self.$content.source
while(pos < self.$length){var ix=source.indexOf(10,pos)
if(ix==-1){lines.push({__class__:_b_.bytes,source:source.slice(pos)})
break}else{lines.push({__class__:_b_.bytes,source:source.slice(pos,ix+1)})
pos=ix+1}}
self.$lines=lines}}}
$Reader.readline=function(self,size){var $=$B.args("readline",2,{self:null,size:null},["self","size"],arguments,{size:-1},null,null),self=$.self,size=$B.$GetInt($.size)
self.$lc=self.$lc===undefined ?-1 :self.$lc
if(self.closed===true){throw _b_.ValueError.$factory('I/O operation on closed file')}
if(self.$binary){var ix=self.$content.source.indexOf(10,self.$counter)
if(ix==-1){var rest=self.$content.source.slice(self.$counter)
self.$counter=self.$content.source.length
return _b_.bytes.$factory(rest)}else{var res={__class__:_b_.bytes,source :self.$content.source.slice(self.$counter,ix+1)}
self.$counter=ix+1
return res}}else{if(self.$counter==self.$content.length){return ''}
var ix=self.$content.indexOf("\n",self.$counter)
if(ix==-1){var rest=self.$content.substr(self.$counter)
self.$counter=self.$content.length
return rest}else{var res=self.$content.substring(self.$counter,ix+1)
self.$counter=ix+1
self.$lc+=1
return res}}}
$Reader.readlines=function(){var $=$B.args("readlines",2,{self:null,hint:null},["self","hint"],arguments,{hint:-1},null,null),self=$.self,hint=$B.$GetInt($.hint)
var nb_read=0
if(self.closed===true){throw _b_.ValueError.$factory('I/O operation on closed file')}
self.$lc=self.$lc===undefined ?-1 :self.$lc
make_lines(self)
if(hint < 0){var lines=self.$lines.slice(self.$lc+1)}else{var lines=[]
while(self.$lc < self.$lines.length &&
nb_read < hint){self.$lc++
lines.push(self.$lines[self.$lc])}}
while(lines[lines.length-1]==''){lines.pop()}
return lines}
$Reader.seek=function(self,offset,whence){if(self.closed===True){throw _b_.ValueError.$factory('I/O operation on closed file')}
if(whence===undefined){whence=0}
if(whence===0){self.$counter=offset}else if(whence===1){self.$counter+=offset}else if(whence===2){self.$counter=self.$length+offset}
return None}
$Reader.seekable=function(self){return true}
$Reader.tell=function(self){return self.$counter}
$Reader.writable=function(self){return false}
$B.set_func_names($Reader,"builtins")
var $BufferedReader=$B.make_class('_io.BufferedReader')
$BufferedReader.__mro__=[$Reader,_b_.object]
var $TextIOWrapper=$B.make_class('_io.TextIOWrapper',function(){var $=$B.args("TextIOWrapper",6,{buffer:null,encoding:null,errors:null,newline:null,line_buffering:null,write_through:null},["buffer","encoding","errors","newline","line_buffering","write_through"],arguments,{encoding:"utf-8",errors:_b_.None,newline:_b_.None,line_buffering:_b_.False,write_through:_b_.False},null,null)
return{
__class__:$TextIOWrapper,$bytes:$.buffer.$bytes,encoding:$.encoding,errors:$.errors,newline:$.newline}}
)
$TextIOWrapper.__mro__=[$Reader,_b_.object]
$B.set_func_names($TextIOWrapper,"builtins")
$B.Reader=$Reader
$B.TextIOWrapper=$TextIOWrapper
$B.BufferedReader=$BufferedReader
function $url_open(){
var $=$B.args('open',3,{file:null,mode:null,encoding:null},['file','mode','encoding'],arguments,{mode:'r',encoding:'utf-8'},'args','kw'),file=$.file,mode=$.mode,encoding=$.encoding,result={}
if(mode.search('w')>-1){throw _b_.IOError.$factory("Browsers cannot write on disk")}else if(['r','rb'].indexOf(mode)==-1){throw _b_.ValueError.$factory("Invalid mode '"+mode+"'")}
if(isinstance(file,_b_.str)){
var is_binary=mode.search('b')>-1
if($B.file_cache.hasOwnProperty($.file)){console.log('open cas 1')
result.content=$B.file_cache[$.file]
if(is_binary){result.content=_b_.str.encode(content,'utf-8')}}else if($B.files && $B.files.hasOwnProperty($.file)){console.log('open cas 2')
$res=atob($B.files[$.file].content)
var source=[]
for(const char of $res){source.push(char.charCodeAt(0))}
$bytes=_b_.bytes.$factory()
$bytes.source=source}else if($B.protocol !="file"){
var req=new XMLHttpRequest()
req.overrideMimeType('text/plain;charset=x-user-defined')
req.onreadystatechange=function(){if(this.readyState !=4){return}
var status=this.status
if(status==404){result.error=_b_.FileNotFoundError.$factory(file)}else if(status !=200){result.error=_b_.IOError.$factory('Could not open file '+
file+' : status '+status)}else{var bytes=[]
for(var i=0,len=this.response.length;i < len;i++){var cp=this.response.codePointAt(i)
if(cp > 0xf700){cp-=0xf700}
bytes.push(cp)}
result.content=_b_.bytes.$factory(bytes)
if(! is_binary){
try{result.content=_b_.bytes.decode(result.content,encoding)}catch(error){result.error=error}}}}
var fake_qs=$B.$options.cache ? '' :
'?foo='+(new Date().getTime())
req.open('GET',file+fake_qs,false)
req.send()}else{throw _b_.FileNotFoundError.$factory(
"cannot use 'open()' with protocol 'file'")}
if(result.error !==undefined){throw result.error}
var res={$binary:is_binary,$content:result.content,$counter:0,$encoding:encoding,$length:is_binary ? result.content.source.length :
result.content.length,closed:False,mode,name:file}
res.__class__=is_binary ? $BufferedReader :$TextIOWrapper
return res}else{throw _b_.TypeError.$factory("invalid argument for open(): "+
_b_.str.$factory(file))}}
var zip=$B.make_class("zip",function(){var res={__class__:zip,items:[]}
if(arguments.length==0){return res}
var $ns=$B.args('zip',0,{},[],arguments,{},'args','kw')
var _args=$ns['args']
var args=[],nexts=[],only_lists=true,min_len
for(var i=0;i < _args.length;i++){if(only_lists && Array.isArray(_args[i])){if(min_len===undefined ||_args[i].length < min_len){min_len=_args[i].length}}else{only_lists=false}
var _next=$B.$call($B.$getattr(iter(_args[i]),"__next__"))
args.push(_next)}
var rank=0,items=[]
if(only_lists){$B.nb_zip_list=$B.nb_zip_list===undefined ?
1 :$B.nb_zip_list+1
for(var i=0;i < min_len;i++){var line=[]
for(var j=0;j < _args.length;j++){line.push(_args[j][i])}
items.push($B.fast_tuple(line))}
res.items=items
return zip_iterator.$factory(items)}
function*iterator(args){while(true){var line=[],flag=true
for(var i=0;i < args.length;i++){try{line.push($B.$call(args[i])())}catch(err){if(err.__class__==_b_.StopIteration){flag=false
break}else{throw err}}}
if(! flag){return}
yield $B.fast_tuple(line)}}
return $B.generator.$factory(iterator,'zip')(args)}
)
var zip_iterator=$B.make_iterator_class('zip')
zip.__iter__=function(self){return zip_iterator.$factory(self.items)}
$B.set_func_names(zip,"builtins")
function no_set_attr(klass,attr){if(klass[attr]!==undefined){throw _b_.AttributeError.$factory("'"+klass.$infos.__name__+
"' object attribute '"+attr+"' is read-only")}else{throw _b_.AttributeError.$factory("'"+klass.$infos.__name__+
"' object has no attribute '"+attr+"'")}}
var True=true
var False=false
var ellipsis=$B.make_class("ellipsis",function(){return Ellipsis}
)
var Ellipsis={__class__:ellipsis,__bool__:function(){return True},}
for(var $key in $B.$comps){
switch($B.$comps[$key]){case 'ge':
case 'gt':
case 'le':
case 'lt':
ellipsis['__'+$B.$comps[$key]+'__']=(function(k){return function(other){throw _b_.TypeError.$factory("unorderable types: ellipsis() "+
k+" "+$B.class_name(other))}})($key)}}
for(var $func in Ellipsis){if(typeof Ellipsis[$func]=='function'){Ellipsis[$func].__str__=(function(f){return function(){return "<method-wrapper "+f+
" of Ellipsis object>"}})($func)}}
$B.set_func_names(ellipsis)
var FunctionCode=$B.make_class("function code")
var FunctionGlobals=$B.make_class("function globals")
$B.Function={__class__:_b_.type,__code__:{__class__:FunctionCode,__name__:'function code'},__globals__:{__class__:FunctionGlobals,__name__:'function globals'},__mro__:[_b_.object],$infos:{__name__:'function',__module__:"builtins"},$is_class:true}
$B.Function.__delattr__=function(self,attr){if(attr=="__dict__"){throw _b_.TypeError.$factory("can't deleted function __dict__")}}
$B.Function.__dir__=function(self){var infos=self.$infos ||{},attrs=self.$attrs ||{}
return Object.keys(infos).concat(Object.keys(attrs))}
$B.Function.__eq__=function(self,other){return self===other}
$B.Function.__get__=function(self,obj){if(obj===_b_.None){return self}
var method=function(){return self(obj,...arguments)}
method.__class__=$B.method
if(self.$infos===undefined){console.log("no $infos",self)
console.log($B.last($B.frames_stack))}
method.$infos={__name__:self.$infos.__name__,__qualname__:$B.class_name(obj)+"."+self.$infos.__name__,__self__:obj,__func__:self}
return method}
$B.Function.__getattribute__=function(self,attr){
if(self.$infos && self.$infos[attr]!==undefined){if(attr=='__code__'){var res={__class__:code}
for(var attr in self.$infos.__code__){res[attr]=self.$infos.__code__[attr]}
res.name=self.$infos.__name__
res.filename=self.$infos.__code__.co_filename
res.co_code=self+"" 
return res}else if(attr=='__annotations__'){
return $B.obj_dict(self.$infos[attr])}else if(self.$infos.hasOwnProperty(attr)){return self.$infos[attr]}}else if(self.$infos && self.$infos.__dict__ &&
self.$infos.__dict__.$string_dict[attr]!==undefined){return self.$infos.__dict__.$string_dict[attr][0]}else if(attr=="__closure__"){var free_vars=self.$infos.__code__.co_freevars
if(free_vars.length==0){return None}
var cells=[]
for(var i=0;i < free_vars.length;i++){try{cells.push($B.cell.$factory($B.$check_def_free(free_vars[i])))}catch(err){
cells.push($B.cell.$factory(None))}}
return _b_.tuple.$factory(cells)}else if(attr=="__globals__"){return $B.obj_dict($B.imported[self.$infos.__module__])}else if(self.$attrs && self.$attrs[attr]!==undefined){return self.$attrs[attr]}else{return _b_.object.__getattribute__(self,attr)}}
$B.Function.__repr__=function(self){if(self.$infos===undefined){return '<function '+self.name+'>'}else{return '<function '+self.$infos.__qualname__+'>'}}
$B.Function.__mro__=[_b_.object]
$B.Function.__setattr__=function(self,attr,value){if(attr=="__closure__"){throw _b_.AttributeError.$factory("readonly attribute")}else if(attr=="__defaults__"){
if(value===_b_.None){value=[]}else if(! isinstance(value,_b_.tuple)){throw _b_.TypeError.$factory(
"__defaults__ must be set to a tuple object")}
var set_func=self.$set_defaults
if(set_func===undefined){throw _b_.AttributeError.$factory("cannot set attribute "+attr+
" of "+_b_.str.$factory(self))}
if(self.$infos && self.$infos.__code__){
var argcount=self.$infos.__code__.co_argcount,varnames=self.$infos.__code__.co_varnames,params=varnames.slice(0,argcount),$defaults={}
for(var i=value.length-1;i >=0;i--){var pos=params.length-value.length+i
if(pos < 0){break}
$defaults[params[pos]]=value[i]}}else{throw _b_.AttributeError.$factory("cannot set attribute "+attr+
" of "+_b_.str.$factory(self))}
var klass=self.$infos.$class 
var new_func=set_func($defaults)
new_func.$set_defaults=set_func
if(klass){klass[self.$infos.__name__]=new_func
new_func.$infos.$class=klass
new_func.$infos.__defaults__=value}else{
self.$infos.$defaults=value
self.$infos.__defaults__=value}
return _b_.None}
if(self.$infos[attr]!==undefined){self.$infos[attr]=value}
else{self.$attrs=self.$attrs ||{};self.$attrs[attr]=value}}
$B.Function.$factory=function(){}
$B.set_func_names($B.Function,"builtins")
_b_.__BRYTHON__=__BRYTHON__
$B.builtin_funcs=["abs","all","any","ascii","bin","breakpoint","callable","chr","compile","delattr","dir","divmod","eval","exec","exit","format","getattr","globals","hasattr","hash","help","hex","id","input","isinstance","issubclass","iter","len","locals","max","min","next","oct","open","ord","pow","print","quit","repr","round","setattr","sorted","sum","vars"
]
var builtin_function=$B.builtin_function=$B.make_class(
"builtin_function_or_method",function(f){f.__class__=builtin_function
return f})
builtin_function.__getattribute__=$B.Function.__getattribute__
builtin_function.__reduce_ex__=builtin_function.__reduce__=function(self){return self.$infos.__name__}
builtin_function.__repr__=builtin_function.__str__=function(self){return '<built-in function '+self.$infos.__name__+'>'}
$B.set_func_names(builtin_function,"builtins")
var method_wrapper=$B.make_class("method_wrapper")
method_wrapper.__repr__=method_wrapper.__str__=function(self){return "<method wrapper '"+self.$infos.__name__+"' of function object>"}
$B.set_func_names(method_wrapper,"builtins")
var wrapper_descriptor=$B.wrapper_descriptor=
$B.make_class("wrapper_descriptor")
wrapper_descriptor.__getattribute__=$B.Function.__getattribute__
wrapper_descriptor.__repr__=wrapper_descriptor.__str__=function(self){return "<slot wrapper '"+self.$infos.__name__+"' of '"+
self.__objclass__.$infos.__name__+"' object>"}
$B.set_func_names(wrapper_descriptor,"builtins")
$B.builtin_classes=["bool","bytearray","bytes","classmethod","complex","dict","enumerate","filter","float","frozenset","int","list","map","memoryview","object","property","range","reversed","set","slice","staticmethod","str","super","tuple","type","zip"
]
var other_builtins=['Ellipsis','False','None','True','__debug__','__import__','copyright','credits','license','NotImplemented'
]
var builtin_names=$B.builtin_funcs.
concat($B.builtin_classes).
concat(other_builtins)
for(var i=0;i < builtin_names.length;i++){var name=builtin_names[i],orig_name=name,name1=name
if(name=='open'){name1='$url_open'}
if(name=='super'){name=name1='$$super'}
if(name=='eval'){name=name1='$$eval'}
if(name=='print'){name1='$print'}
try{_b_[name]=eval(name1)
if($B.builtin_funcs.indexOf(orig_name)>-1){_b_[name].__class__=builtin_function
_b_[name].$infos={__module__:'builtins',__name__:orig_name,__qualname__:orig_name}}}
catch(err){}}
_b_['open']=$url_open
_b_['print']=$print
_b_['$$super']=$$super
_b_.object.__init__.__class__=wrapper_descriptor
_b_.object.__new__.__class__=builtin_function})(__BRYTHON__)
;
;(function($B){var bltns=$B.InjectBuiltins()
eval(bltns)
$B.del_exc=function(){var frame=$B.last($B.frames_stack)
frame[1].$current_exception=undefined}
$B.set_exc=function(exc){var frame=$B.last($B.frames_stack)
if(frame===undefined){console.log("no frame",exc,exc.__class__,exc.args)}
frame[1].$current_exception=$B.exception(exc)}
$B.get_exc=function(){var frame=$B.last($B.frames_stack)
return frame[1].$current_exception}
$B.$raise=function(arg){
if(arg===undefined){var es=$B.get_exc()
if(es !==undefined){throw es}
throw _b_.RuntimeError.$factory("No active exception to reraise")}else if(isinstance(arg,BaseException)){if(arg.__class__===_b_.StopIteration &&
$B.last($B.frames_stack)[1].$is_generator){
arg=_b_.RuntimeError.$factory("generator raised StopIteration")}
throw arg}else if(arg.$is_class && issubclass(arg,BaseException)){if(arg===_b_.StopIteration){if($B.last($B.frames_stack)[1].$is_generator){
throw _b_.RuntimeError.$factory("generator raised StopIteration")}}
throw $B.$call(arg)()}else{throw _b_.TypeError.$factory("exceptions must derive from BaseException")}}
$B.$syntax_err_line=function(exc,module,src,pos,line_num){
var pos2line={},lnum=1,module=module.charAt(0)=="$" ? "<string>" :module
if(src===undefined){exc.$line_info=line_num+','+module
exc.args=$B.fast_tuple([$B.$getitem(exc.args,0),$B.fast_tuple([module,line_num,0,0])])}else{var line_pos={1:0}
for(var i=0,len=src.length;i < len;i++){pos2line[i]=lnum
if(src.charAt(i)=="\n"){line_pos[++lnum]=i}}
while(line_num===undefined){line_num=pos2line[pos]
pos--}
exc.$line_info=line_num+","+module
var lines=src.split("\n"),line=lines[line_num-1],lpos=pos-line_pos[line_num],len=line.length
exc.text=line+'\n'
lpos-=len-line.length
if(lpos < 0){lpos=0}
while(line.charAt(0)==' '){line=line.substr(1)
if(lpos > 0){lpos--}}
exc.offset=lpos+1 
exc.args=$B.fast_tuple([$B.$getitem(exc.args,0),$B.fast_tuple([module,line_num,lpos,line])])}
exc.lineno=line_num
exc.msg=exc.args[0]
exc.filename=module}
$B.$SyntaxError=function(module,msg,src,pos,line_num,root){if(root !==undefined && root.line_info !==undefined){
line_num=root.line_info}
var exc=_b_.SyntaxError.$factory(msg)
$B.$syntax_err_line(exc,module,src,pos,line_num)
throw exc}
$B.$IndentationError=function(module,msg,src,pos,line_num,root){$B.frames_stack.push([module,{$line_info:line_num+","+module},module,{$src:src}])
if(root !==undefined && root.line_info !==undefined){
line_num=root.line_info}
var exc=_b_.IndentationError.$factory(msg)
$B.$syntax_err_line(exc,module,src,pos,line_num)
throw exc}
$B.print_stack=function(stack){stack=stack ||$B.frames_stack
var trace=[]
stack.forEach(function(frame){var line_info=frame[1].$line_info
if(line_info !==undefined){var info=line_info.split(",")
if(info[1].startsWith("$exec")){info[1]="<module>"}
trace.push(info[1]+" line "+info[0])
var src=$B.file_cache[frame[3].__file__]
if(src){var lines=src.split("\n"),line=lines[parseInt(info[0])-1]
trace.push("  "+line.trim())}}})
console.log("print stack ok",trace)
return trace.join("\n")}
var traceback=$B.traceback=$B.make_class("traceback",function(exc,stack){var frame=$B.last($B.frames_stack)
if(stack===undefined){stack=exc.$stack}
return{
__class__ :traceback,$stack:stack,exc:exc}}
)
traceback.__getattribute__=function(self,attr){var line_info
if(attr==='tb_frame' ||
attr==='tb_lineno' ||
attr==='tb_lasti' ||
attr==='tb_next'){if(self.$stack.length==0){console.log("no stack",attr)}
var first_frame=self.$stack[0]
line_info=self.exc.$line_infos[self.exc.$line_infos.length-
self.$stack.length]}
switch(attr){case "tb_frame":
return frame.$factory(self.$stack)
case "tb_lineno":
var lineno
if(line_info===undefined ||
first_frame[0].startsWith($B.lambda_magic)){if(first_frame[4]&& first_frame[4].$infos &&
first_frame[4].$infos.__code__){lineno=first_frame[4].$infos.__code__.co_firstlineno}else{lineno=-1}}else{lineno=parseInt(line_info.split(",")[0])}
return lineno
case "tb_lasti":
if(line_info===undefined){console.log("no line info",self.$stack)
return ""}else{var info=line_info.split(","),src,file
for(var i=self.$stack.length-1;i >=0;i--){var fr=self.$stack[i]
if(fr[2]==info[1].replace(/\./g,'_')){file=fr[3].__file__
src=fr[3].$src
break}}
if(src===undefined){if($B.file_cache.hasOwnProperty(file)){src=$B.file_cache[file]}else if($B.imported[info[1]]&&
$B.imported[info[1]].__file__ ){src=$B.file_cache[$B.imported[info[1]].__file__]
console.log("from filecache",line_info,$B.imported[info[1]].__file__)}}
if(src !==undefined){try{return src.split("\n")[parseInt(info[0]-1)].trim()}catch(err){console.log("error in attr tb_lasti of",self)
console.log(src,info)
throw err}}else{console.log('stack',self.$stack)
console.log(file)
console.log("no src for",info)
return ""}}
case "tb_next":
if(self.$stack.length <=1){return None}
else{return traceback.$factory(self.exc,self.$stack.slice(1))}
default:
return _b_.object.__getattribute__(self,attr)}}
$B.set_func_names(traceback,"builtins")
var frame=$B.make_class("frame",function(stack,pos){var fs=stack
var res={__class__:frame,f_builtins :{},
$stack:stack.slice()}
if(pos===undefined){pos=0}
res.$pos=pos
if(fs.length){var _frame=fs[pos],locals_id=_frame[0],filename
try{res.f_locals=$B.obj_dict(_frame[1])}catch(err){console.log("err "+err)
throw err}
res.f_globals=$B.obj_dict(_frame[3])
if(_frame[3].__file__ !==undefined){filename=_frame[3].__file__}
if(locals_id.startsWith("$exec")){filename="<string>"}
if(_frame[1].$line_info===undefined){res.f_lineno=-1}else{var line_info=_frame[1].$line_info.split(",")
res.f_lineno=parseInt(line_info[0])
var module_name=line_info[1]
if($B.imported.hasOwnProperty(module_name)){filename=$B.imported[module_name].__file__}
res.f_lineno=parseInt(_frame[1].$line_info.split(',')[0])}
var co_name=locals_id.startsWith("$exec")? "<module>" :
locals_id
if(locals_id==_frame[2]){co_name="<module>"}else if(locals_id.startsWith("lc"+$B.lambda_magic)){co_name="<listcomp>"}else{if(_frame[1].$name){co_name=_frame[1].$name}else if(_frame[1].$dict_comp){co_name='<dictcomp>'}else if(_frame[1].$list_comp){co_name='<listcomp>'}else if(_frame.length > 4){if(_frame[4].$infos){co_name=_frame[4].$infos.__name__}else{co_name=_frame[4].name}
if(_frame[4].$infos===undefined){
if(_frame[4].name.startsWith("__ge")){co_name="<genexpr>"}else if(_frame[4].name.startsWith("set_comp"+
$B.lambda_magic)){co_name="<setcomp>"}else if(_frame[4].name.startsWith("lambda"+
$B.lambda_magic)){co_name="<lambda>"}}else if(filename===undefined && _frame[4].$infos.__code__){filename=_frame[4].$infos.__code__.co_filename
if(filename===undefined){filename=_frame[4].$infos.__module__}
res.f_lineno=_frame[4].$infos.__code__.co_firstlineno}}}
if(_frame.length > 4 && _frame[4].$infos !==undefined){res.f_code=_frame[4].$infos.__code__}else{res.f_code={co_name:co_name,co_filename:filename}}
res.f_code.__class__=$B.code
res.f_code.co_code=_b_.None
if(filename===undefined){res.f_code.co_filename="<string>"}}
return res}
)
frame.__delattr__=function(self,attr){if(attr=="f_trace"){$B.last(self.$stack)[1].$f_trace=_b_.None}}
frame.__getattr__=function(self,attr){
if(attr=="f_back"){if(self.$pos > 0){return frame.$factory(self.$stack.slice(0,self.$stack.length-1),self.$pos-1)}else{return _b_.None}}else if(attr=="clear"){return function(){}}else if(attr=="f_trace"){var locals=$B.last(self.$stack)[1]
if(locals.$f_trace===undefined){return _b_.None}
return locals.$f_trace}}
frame.__setattr__=function(self,attr,value){if(attr=="f_trace"){
$B.last(self.$stack)[1].$f_trace=value}}
frame.__str__=frame.__repr__=function(self){return '<frame object, file '+self.f_code.co_filename+
', line '+self.f_lineno+', code '+self.f_code.co_name+'>'}
$B.set_func_names(frame,"builtins")
$B._frame=frame 
var BaseException=_b_.BaseException={__class__:_b_.type,__bases__ :[_b_.object],__mro__:[_b_.object],args:[],$infos:{__name__:"BaseException",__module__:"builtins"},$is_class:true}
BaseException.__init__=function(self){var args=arguments[1]===undefined ?[]:[arguments[1]]
self.args=_b_.tuple.$factory(args)}
BaseException.__repr__=function(self){var res=self.__class__.$infos.__name__
if(self.args[0]!==undefined){res+='('+repr(self.args[0])}
if(self.args.length > 1){res+=', '+repr($B.fast_tuple(self.args.slice(1)))}
return res+')'}
BaseException.__str__=function(self){if(self.args.length > 0){return _b_.str.$factory(self.args[0])}
return self.__class__.$infos.__name__}
BaseException.__new__=function(cls){var err=_b_.BaseException.$factory()
err.__class__=cls
err.__dict__=$B.empty_dict()
return err}
var getExceptionTrace=function(exc,includeInternal){if(exc.__class__===undefined){if($B.debug > 1){console.log("no class",exc)}
return exc+''}
var info=''
if(exc.$js_exc !==undefined && includeInternal){info+="\nJS stack:\n"+exc.$js_exc.stack+"\n"}
info+="Traceback (most recent call last):"
var line_info=exc.$line_info
for(var i=0;i < exc.$stack.length;i++){var frame=exc.$stack[i]
if(! frame[1]||! frame[1].$line_info){continue}
var $line_info=frame[1].$line_info
var line_info=$line_info.split(','),src
if(exc.module==line_info[1]){src=exc.src}
if(!includeInternal){var src=frame[3].$src
if(src===undefined){if($B.VFS && $B.VFS.hasOwnProperty(frame[2])){src=$B.VFS[frame[2]][1]}else if(src=$B.file_cache[frame[3].__file__]){}else{continue}}}
var file=frame[3].__file__ ||"<string>",module=line_info[1],is_exec=module.charAt(0)=="$"
if(is_exec){module="<module>"}
info+="\n  File "+file+" line "+line_info[0]
if(frame.length > 4){if(frame[4].$infos){var name=frame[4].$infos.__name__
if(name.startsWith("lc"+$B.lambda_magic)){info+=', in <listcomp>'}else if(name.startsWith("lambda_"+$B.lambda_magic)){info+=', in <lambda>'}else{info+=', in '+name}}else if(frame[4].name.startsWith("__ge")){info+=', in <genexpr>'}else if(frame[4].name.startsWith("set_comp"+$B.lambda_magic)){info+=', in <setcomp>'}else if(frame[4].name.startsWith("lc"+$B.lambda_magic)){info+=', in <listcomp>'}else{console.log("frame[4]",frame[4])}}else if(frame[1].$list_comp){info+=', in <listcomp>'}else if(frame[1].$dict_comp){info+=', in <dictcomp>'}else{info+=', in <module>'}
if(src !==undefined && ! is_exec){var lines=src.split("\n"),line=lines[parseInt(line_info[0])-1]
if(line){line=line.replace(/^[ ]+/g,"")}
info+="\n    "+line}}
if(exc.__class__===_b_.SyntaxError){info+="\n  File "+exc.args[1][0]+", line "+
exc.args[1][1]+"\n    "+exc.args[1][3]}
return info}
BaseException.__getattr__=function(self,attr){if(attr=="info"){return getExceptionTrace(self,false);}else if(attr=="infoWithInternal"){return getExceptionTrace(self,true);}else if(attr=="__traceback__"){
if(self.$traceback !==undefined){return self.$traceback}
return traceback.$factory(self)}else{throw _b_.AttributeError.$factory(self.__class__.$infos.__name__+
" has no attribute '"+attr+"'")}}
BaseException.with_traceback=function(self,tb){self.$traceback=tb
return self}
$B.deep_copy=function(stack){var res=[]
for(const s of stack){var item=[s[0],{},s[2],{}]
if(s[4]!==undefined){item.push(s[4])}
for(const i of[1,3]){for(var key in s[i]){item[i][key]=s[i][key]}}
res.push(item)}
return res}
$B.save_stack=function(){return $B.deep_copy($B.frames_stack)}
$B.restore_stack=function(stack,locals){$B.frames_stack=stack
$B.frames_stack[$B.frames_stack.length-1][1]=locals}
$B.freeze=function(err){
if(err.$stack===undefined){err.$line_infos=[]
for(var i=0,len=$B.frames_stack.length;i < len;i++){err.$line_infos.push($B.frames_stack[i][1].$line_info)}
err.$stack=$B.frames_stack.slice()
if($B.frames_stack.length){err.$line_info=$B.last($B.frames_stack)[1].$line_info}}}
var show_stack=$B.show_stack=function(stack){stack=stack ||$B.frames_stack
for(const frame of stack){console.log(frame[0],frame[1].$line_info)}}
BaseException.$factory=function(){var err=Error()
err.args=$B.fast_tuple(Array.prototype.slice.call(arguments))
err.__class__=_b_.BaseException
err.$py_error=true
$B.freeze(err)
eval("//placeholder//")
err.__cause__=_b_.None 
err.__context__=_b_.None 
err.__suppress_context__=false 
return err}
BaseException.$factory.$infos={__name__:"BaseException",__qualname__:"BaseException"}
$B.set_func_names(BaseException)
_b_.BaseException=BaseException
$B.exception=function(js_exc,in_ctx_manager){
if(! js_exc.__class__){console.log("Javascript exception:",js_exc)
console.log($B.last($B.frames_stack))
console.log("recursion error ?",$B.is_recursion_error(js_exc))
var exc=Error()
exc.__name__="Internal Javascript error: "+
(js_exc.__name__ ||js_exc.name)
exc.__class__=_b_.Exception
exc.$js_exc=js_exc
if($B.is_recursion_error(js_exc)){return _b_.RecursionError.$factory("too much recursion")}else if(js_exc.name=="ReferenceError"){exc.__name__="NameError"
exc.__class__=_b_.NameError
js_exc.message=js_exc.message.replace("$$","")}else if(js_exc.name=="InternalError"){exc.__name__="RuntimeError"
exc.__class__=_b_.RuntimeError}
exc.__cause__=_b_.None
exc.__context__=_b_.None
exc.__suppress_context__=false
var $message="<Javascript "+js_exc.name+">: "+
(js_exc.message ||"<"+js_exc+">")
exc.args=_b_.tuple.$factory([$message])
exc.$py_error=true
$B.freeze(exc)}else{var exc=js_exc
$B.freeze(exc)
if(in_ctx_manager){
var current_locals=$B.last($B.frames_stack)[0]
for(var i=0,len=exc.$stack.length;i < len;i++){if(exc.$stack[i][0]==current_locals){exc.$stack=exc.$stack.slice(i)
exc.$traceback=traceback.$factory(exc)
break}}}}
return exc}
$B.is_exc=function(exc,exc_list){
if(exc.__class__===undefined){exc=$B.exception(exc)}
var this_exc_class=exc.$is_class ? exc :exc.__class__
for(var i=0;i < exc_list.length;i++){var exc_class=exc_list[i]
if(this_exc_class===undefined){console.log("exc class undefined",exc)}
if(issubclass(this_exc_class,exc_class)){return true}}
return false}
$B.is_recursion_error=function(js_exc){
console.log("test is js exc is recursion error",js_exc,js_exc+"")
var msg=js_exc+"",parts=msg.split(":"),err_type=parts[0].trim(),err_msg=parts[1].trim()
return(err_type=='InternalError' && err_msg=='too much recursion')||
(err_type=='Error' && err_msg=='Out of stack space')||
(err_type=='RangeError' && err_msg=='Maximum call stack size exceeded')}
function $make_exc(names,parent){
var _str=[],pos=0
for(var i=0;i < names.length;i++){var name=names[i],code=""
if(Array.isArray(name)){
var code=name[1],name=name[0]}
$B.builtins_scope[name]=true
var $exc=(BaseException.$factory+"").replace(/BaseException/g,name)
$exc=$exc.replace("//placeholder//",code)
_str[pos++]="_b_."+name+' = {__class__:_b_.type, '+
'__mro__: [_b_.'+parent.$infos.__name__+
"].concat(parent.__mro__), $is_class: true,"+
"$infos: {__name__:'"+name+"'}}"
_str[pos++]="_b_."+name+".$factory = "+$exc
_str[pos++]="_b_."+name+'.$factory.$infos = {__name__: "'+
name+'", __qualname__: "'+name+'"}'
_str[pos++]="$B.set_func_names(_b_."+name+", 'builtins')"}
try{eval(_str.join(";"))}catch(err){console.log("--err"+err)
throw err}}
$make_exc(["SystemExit","KeyboardInterrupt","GeneratorExit","Exception"],BaseException)
$make_exc([["StopIteration","err.value = arguments[0]"],["StopAsyncIteration","err.value = arguments[0]"],"ArithmeticError","AssertionError","AttributeError","BufferError","EOFError",["ImportError","err.name = arguments[0]"],"LookupError","MemoryError","NameError","OSError","ReferenceError","RuntimeError",["SyntaxError","err.msg = arguments[0]"],"SystemError","TypeError","ValueError","Warning"],_b_.Exception)
$make_exc(["FloatingPointError","OverflowError","ZeroDivisionError"],_b_.ArithmeticError)
$make_exc([["ModuleNotFoundError","err.name = arguments[0]"]],_b_.ImportError)
$make_exc(["IndexError","KeyError"],_b_.LookupError)
$make_exc(["UnboundLocalError"],_b_.NameError)
$make_exc(["BlockingIOError","ChildProcessError","ConnectionError","FileExistsError","FileNotFoundError","InterruptedError","IsADirectoryError","NotADirectoryError","PermissionError","ProcessLookupError","TimeoutError"],_b_.OSError)
$make_exc(["BrokenPipeError","ConnectionAbortedError","ConnectionRefusedError","ConnectionResetError"],_b_.ConnectionError)
$make_exc(["NotImplementedError","RecursionError"],_b_.RuntimeError)
$make_exc(["IndentationError"],_b_.SyntaxError)
$make_exc(["TabError"],_b_.IndentationError)
$make_exc(["UnicodeError"],_b_.ValueError)
$make_exc(["UnicodeDecodeError","UnicodeEncodeError","UnicodeTranslateError"],_b_.UnicodeError)
$make_exc(["DeprecationWarning","PendingDeprecationWarning","RuntimeWarning","SyntaxWarning","UserWarning","FutureWarning","ImportWarning","UnicodeWarning","BytesWarning","ResourceWarning"],_b_.Warning)
$make_exc(["EnvironmentError","IOError","VMSError","WindowsError"],_b_.OSError)
$B.$TypeError=function(msg){throw _b_.TypeError.$factory(msg)}
var se=_b_.SyntaxError.$factory
_b_.SyntaxError.$factory=function(){var arg=arguments[0]
if(arg.__class__===_b_.SyntaxError){return arg}
var exc=se.apply(null,arguments),frame=$B.last($B.frames_stack)
if(frame){line_info=frame[1].$line_info
exc.filename=frame[3].__file__
exc.lineno=parseInt(line_info.split(",")[0])
var src=$B.file_cache[frame[3].__file__]
if(src){lines=src.split("\n")
exc.text=lines[exc.lineno-1]}
exc.offset=arg.offset}
return exc}
_b_.SyntaxError})(__BRYTHON__)
;

;(function($B){var _b_=$B.builtins,None=_b_.None,range={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"range"},$is_class:true,$native:true,$descriptors:{start:true,step:true,stop:true}}
range.__contains__=function(self,other){if(range.__len__(self)==0){return false}
try{other=$B.int_or_bool(other)}
catch(err){
try{range.index(self,other);return true}
catch(err){return false}}
var sub=$B.sub(other,self.start),fl=$B.floordiv(sub,self.step),res=$B.mul(self.step,fl)
if($B.eq(res,sub)){if($B.gt(self.stop,self.start)){return $B.ge(other,self.start)&& $B.gt(self.stop,other)}else{return $B.ge(self.start,other)&& $B.gt(other,self.stop)}}else{return false}}
range.__delattr__=function(self,attr,value){throw _b_.AttributeError.$factory("readonly attribute")}
range.__eq__=function(self,other){if(_b_.isinstance(other,range)){var len=range.__len__(self)
if(! $B.eq(len,range.__len__(other))){return false}
if(len==0){return true}
if(! $B.eq(self.start,other.start)){return false}
if(len==1){return true}
return $B.eq(self.step,other.step)}
return false}
function compute_item(r,i){var len=range.__len__(r)
if(len==0){return r.start}
else if(i > len){return r.stop}
return $B.add(r.start,$B.mul(r.step,i))}
range.__getitem__=function(self,rank){if(_b_.isinstance(rank,_b_.slice)){var norm=_b_.slice.$conv_for_seq(rank,range.__len__(self)),substep=$B.mul(self.step,norm.step),substart=compute_item(self,norm.start),substop=compute_item(self,norm.stop)
return range.$factory(substart,substop,substep)}
if(typeof rank !="number"){rank=$B.$GetInt(rank)}
if($B.gt(0,rank)){rank=$B.add(rank,range.__len__(self))}
var res=$B.add(self.start,$B.mul(rank,self.step))
if(($B.gt(self.step,0)&&
($B.ge(res,self.stop)||$B.gt(self.start,res)))||
($B.gt(0,self.step)&&
($B.ge(self.stop,res)||$B.gt(res,self.start)))){throw _b_.IndexError.$factory("range object index out of range")}
return res}
range.__hash__=function(self){var len=range.__len__(self)
if(len==0){return _b_.hash(_b_.tuple.$factory([0,None,None]))}
if(len==1){return _b_.hash(_b_.tuple.$factory([1,self.start,None]))}
return _b_.hash(_b_.tuple.$factory([len,self.start,self.step]))}
var RangeIterator={__class__:_b_.type,__mro__:[_b_.object],__iter__:function(self){return self},__next__:function(self){return _b_.next(self.obj)},$infos:{__name__:"range_iterator",__module__:"builtins"},$is_class:true}
RangeIterator.$factory=function(obj){return{__class__:RangeIterator,obj:obj}}
$B.set_func_names(RangeIterator,"builtins")
range.__iter__=function(self){var res={__class__ :range,start:self.start,stop:self.stop,step:self.step}
if(self.$safe){res.$counter=self.start-self.step}else{res.$counter=$B.sub(self.start,self.step)}
return RangeIterator.$factory(res)}
range.__len__=function(self){var len
if($B.gt(self.step,0)){if($B.ge(self.start,self.stop)){return 0}
var n=$B.sub(self.stop,$B.add(1,self.start)),q=$B.floordiv(n,self.step)
len=$B.add(1,q)}else{if($B.ge(self.stop,self.start)){return 0}
var n=$B.sub(self.start,$B.add(1,self.stop)),q=$B.floordiv(n,$B.mul(-1,self.step))
len=$B.add(1,q)}
if($B.maxsize===undefined){$B.maxsize=$B.long_int.__pow__($B.long_int.$factory(2),63)
$B.maxsize=$B.long_int.__sub__($B.maxsize,1)}
return len}
range.__next__=function(self){if(self.$safe){self.$counter+=self.step
if((self.step > 0 && self.$counter >=self.stop)
||(self.step < 0 && self.$counter <=self.stop)){throw _b_.StopIteration.$factory("")}}else{self.$counter=$B.add(self.$counter,self.step)
if(($B.gt(self.step,0)&& $B.ge(self.$counter,self.stop))
||($B.gt(0,self.step)&& $B.ge(self.stop,self.$counter))){throw _b_.StopIteration.$factory("")}}
return self.$counter}
range.__reversed__=function(self){var n=$B.sub(range.__len__(self),1)
return range.$factory($B.add(self.start,$B.mul(n,self.step)),$B.sub(self.start,self.step),$B.mul(-1,self.step))}
range.__repr__=function(self){$B.builtins_repr_check(range,arguments)
var res="range("+_b_.str.$factory(self.start)+", "+
_b_.str.$factory(self.stop)
if(self.step !=1){res+=", "+_b_.str.$factory(self.step)}
return res+")"}
range.__setattr__=function(self,attr,value){throw _b_.AttributeError.$factory("readonly attribute")}
range.start=function(self){return self.start}
range.step=function(self){return self.step},range.stop=function(self){return self.stop}
range.count=function(self,ob){if(_b_.isinstance(ob,[_b_.int,_b_.float,_b_.bool])){return _b_.int.$factory(range.__contains__(self,ob))}else{var comp=function(other){return $B.rich_comp("__eq__",ob,other)},it=range.__iter__(self),_next=RangeIterator.__next__,nb=0
while(true){try{if(comp(_next(it))){nb++}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){return nb}
throw err}}}}
range.index=function(self,other){var $=$B.args("index",2,{self:null,other:null},["self","other"],arguments,{},null,null),self=$.self,other=$.other
try{other=$B.int_or_bool(other)}catch(err){var comp=function(x){return $B.rich_comp("__eq__",other,x)},it=range.__iter__(self),_next=RangeIterator.__next__,nb=0
while(true){try{if(comp(_next(it))){return nb}
nb++}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){throw _b_.ValueError.$factory(_b_.str.$factory(other)+
" not in range")}
throw err}}}
var sub=$B.sub(other,self.start),fl=$B.floordiv(sub,self.step),res=$B.mul(self.step,fl)
if($B.eq(res,sub)){if(($B.gt(self.stop,self.start)&& $B.ge(other,self.start)
&& $B.gt(self.stop,other))||
($B.ge(self.start,self.stop)&& $B.ge(self.start,other)
&& $B.gt(other,self.stop))){return fl}else{throw _b_.ValueError.$factory(_b_.str.$factory(other)+
' not in range')}}else{throw _b_.ValueError.$factory(_b_.str.$factory(other)+
" not in range")}}
range.$factory=function(){var $=$B.args("range",3,{start:null,stop:null,step:null},["start","stop","step"],arguments,{start:null,stop:null,step:null},null,null),start=$.start,stop=$.stop,step=$.step,safe
if(stop===null && step===null){if(start==null){throw _b_.TypeError.$factory("range expected 1 arguments, got 0")}
stop=$B.PyNumber_Index(start)
safe=typeof stop==="number"
return{__class__:range,start:0,stop:stop,step:1,$is_range:true,$safe:safe}}
if(step===null){step=1}
start=$B.PyNumber_Index(start)
stop=$B.PyNumber_Index(stop)
step=$B.PyNumber_Index(step)
if(step==0){throw _b_.ValueError.$factory("range arg 3 must not be zero")}
safe=(typeof start=="number" && typeof stop=="number" &&
typeof step=="number")
return{__class__:range,start:start,stop:stop,step:step,$is_range:true,$safe:safe}}
$B.set_func_names(range,"builtins")
var slice={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"slice"},$is_class:true,$native:true,$descriptors:{start:true,step:true,stop:true}}
slice.__eq__=function(self,other){var conv1=conv_slice(self),conv2=conv_slice(other)
return conv1[0]==conv2[0]&&
conv1[1]==conv2[1]&&
conv1[2]==conv2[2]}
slice.__repr__=function(self){$B.builtins_repr_check(slice,arguments)
return "slice("+_b_.str.$factory(self.start)+", "+
_b_.str.$factory(self.stop)+", "+_b_.str.$factory(self.step)+")"}
slice.__setattr__=function(self,attr,value){throw _b_.AttributeError.$factory("readonly attribute")}
function conv_slice(self){
var attrs=["start","stop","step"],res=[]
for(var i=0;i < attrs.length;i++){var val=self[attrs[i]]
if(val===_b_.None){res.push(val)}else{try{res.push($B.PyNumber_Index(val))}catch(err){throw _b_.TypeError.$factory("slice indices must be "+
"integers or None or have an __index__ method")}}}
return res}
slice.$conv_for_seq=function(self,len){
var step=self.step===None ? 1 :$B.PyNumber_Index(self.step),step_is_neg=$B.gt(0,step),len_1=$B.sub(len,1)
if(step==0){throw _b_.ValueError.$factory('slice step cannot be zero')}
var start
if(self.start===None){start=step_is_neg ? len_1 :0}else{start=$B.PyNumber_Index(self.start)
if($B.gt(0,start)){start=$B.add(start,len)
if($B.gt(0,start)){start=0}}
if($B.ge(start,len)){start=step < 0 ? len_1 :len}}
if(self.stop===None){stop=step_is_neg ?-1 :len}else{stop=$B.PyNumber_Index(self.stop)
if($B.gt(0,stop)){stop=$B.add(stop,len)}
if($B.ge(stop,len)){stop=step_is_neg ? len_1 :len}}
return{start:start,stop:stop,step:step}}
slice.start=function(self){return self.start}
slice.step=function(self){return self.step}
slice.stop=function(self){return self.stop}
slice.indices=function(self,length){
var $=$B.args("indices",2,{self:null,length:null},["self","length"],arguments,{},null,null)
var len=$B.$GetInt($.length)
if(len < 0){_b_.ValueError.$factory("length should not be negative")}
var _step=(self.step==_b_.None)? 1 :self.step
if(_step < 0){var _start=self.start,_stop=self.stop
_start=(_start==_b_.None)? len-1 :
(_start < 0)? _b_.max(-1,_start+len):_b_.min(len-1,self.start)
_stop=(self.stop==_b_.None)?-1 :
(_stop < 0)? _b_.max(-1,_stop+len):_b_.min(len-1,self.stop)}else{var _start=(self.start==_b_.None)? 0 :_b_.min(len,self.start)
var _stop=(self.stop==_b_.None)? len :_b_.min(len,self.stop)
if(_start < 0){_start=_b_.max(0,_start+len)}
if(_stop < 0){_stop=_b_.max(0,_stop+len)}}
return _b_.tuple.$factory([_start,_stop,_step])}
slice.$factory=function(){var $=$B.args("slice",3,{start:null,stop:null,step:null},["start","stop","step"],arguments,{stop:null,step:null},null,null),start,stop,step
if($.stop===null && $.step===null){start=_b_.None
stop=$.start
step=_b_.None}else{start=$.start
stop=$.stop
step=$.step===null ? _b_.None :$.step}
var res={__class__ :slice,start:start,stop:stop,step:step}
conv_slice(res)
return res}
$B.set_func_names(slice,"builtins")
_b_.range=range
_b_.slice=slice})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
var from_unicode={},to_unicode={}
$B.to_bytes=function(obj){var res
if(_b_.isinstance(obj,[bytes,bytearray])){res=obj.source}else{var ga=$B.$getattr(obj,"tobytes",null)
if(ga !==null){res=$B.$call(ga)().source}
else{throw _b_.TypeError.$factory("object doesn't support the buffer protocol")}}
return res}
function _strip(self,cars,lr){if(cars===undefined){cars=[]
var ws='\r\n \t'
for(var i=0,len=ws.length;i < len;i++){cars.push(ws.charCodeAt(i))}}else if(_b_.isinstance(cars,bytes)){cars=cars.source}else{throw _b_.TypeError.$factory("Type str doesn't support the buffer API")}
if(lr=='l'){for(var i=0,len=self.source.length;i < len;i++){if(cars.indexOf(self.source[i])==-1){break}}
return bytes.$factory(self.source.slice(i))}
for(var i=self.source.length-1;i >=0;i--){if(cars.indexOf(self.source[i])==-1){break}}
return bytes.$factory(self.source.slice(0,i+1))}
function invalid(other){return ! _b_.isinstance(other,[bytes,bytearray])}
var bytearray={__class__:_b_.type,__mro__:[_b_.object],$buffer_protocol:true,$infos:{__module__:"builtins",__name__:"bytearray"},$is_class:true}
var mutable_methods=["__delitem__","clear","copy","count","index","pop","remove","reverse","sort"]
mutable_methods.forEach(function(method){bytearray[method]=(function(m){return function(self){var args=[self.source],pos=1
for(var i=1,len=arguments.length;i < len;i++){args[pos++]=arguments[i]}
return _b_.list[m].apply(null,args)}})(method)})
var bytearray_iterator=$B.make_iterator_class('bytearray_iterator')
bytearray.__iter__=function(self){return bytearray_iterator.$factory(self.source)}
bytearray.__mro__=[_b_.object]
bytearray.__repr__=bytearray.__str__=function(self){return 'bytearray('+bytes.__repr__(self)+")"}
bytearray.__setitem__=function(self,arg,value){if(_b_.isinstance(arg,_b_.int)){if(! _b_.isinstance(value,_b_.int)){throw _b_.TypeError.$factory('an integer is required')}else if(value > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
var pos=arg
if(arg < 0){pos=self.source.length+pos}
if(pos >=0 && pos < self.source.length){self.source[pos]=value}
else{throw _b_.IndexError.$factory('list index out of range')}}else if(_b_.isinstance(arg,_b_.slice)){var start=arg.start===_b_.None ? 0 :arg.start
var stop=arg.stop===_b_.None ? self.source.length :arg.stop
if(start < 0){start=self.source.length+start}
if(stop < 0){stop=self.source.length+stop}
self.source.splice(start,stop-start)
try{var $temp=_b_.list.$factory(value)
for(var i=$temp.length-1;i >=0;i--){if(! _b_.isinstance($temp[i],_b_.int)){throw _b_.TypeError.$factory('an integer is required')}else if($temp[i]> 255){throw ValueError.$factory("byte must be in range(0, 256)")}
self.source.splice(start,0,$temp[i])}}catch(err){throw _b_.TypeError.$factory("can only assign an iterable")}}else{throw _b_.TypeError.$factory('list indices must be integer, not '+
$B.class_name(arg))}}
bytearray.append=function(self,b){if(arguments.length !=2){throw _b_.TypeError.$factory(
"append takes exactly one argument ("+(arguments.length-1)+
" given)")}
if(! _b_.isinstance(b,_b_.int)){throw _b_.TypeError.$factory("an integer is required")}
if(b > 255){throw ValueError.$factory("byte must be in range(0, 256)")}
self.source[self.source.length]=b}
bytearray.extend=function(self,b){if(self.in_iteration){
throw _b_.BufferError.$factory("Existing exports of data: object "+
"cannot be re-sized")}
if(b.__class__===bytearray ||b.__class__===bytes){b.source.forEach(function(item){self.source.push(item)})
return _b_.None}
var it=_b_.iter(b)
while(true){try{bytearray.__add__(self,_b_.next(it))}catch(err){if(err===_b_.StopIteration){break}
throw err}}
return _b_.None}
bytearray.insert=function(self,pos,b){if(arguments.length !=3){throw _b_.TypeError.$factory(
"insert takes exactly 2 arguments ("+(arguments.length-1)+
" given)")}
if(! _b_.isinstance(b,_b_.int)){throw _b_.TypeError.$factory("an integer is required")}
if(b > 255){throw ValueError.$factory("byte must be in range(0, 256)")}
_b_.list.insert(self.source,pos,b)}
bytearray.$factory=function(){var args=[bytearray]
for(var i=0,len=arguments.length;i < len;i++){args.push(arguments[i])}
return bytearray.__new__.apply(null,args)}
var bytes={__class__ :_b_.type,__mro__:[_b_.object],$buffer_protocol:true,$infos:{__module__:"builtins",__name__:"bytes"},$is_class:true}
bytes.__add__=function(self,other){if(_b_.isinstance(other,bytes)){return self.__class__.$factory(self.source.concat(other.source))}else if(_b_.isinstance(other,bytearray)){return self.__class__.$factory(bytes.__add__(self,bytes.$factory(other)))}else if(_b_.isinstance(other,_b_.memoryview)){return self.__class__.$factory(bytes.__add__(self,_b_.memoryview.tobytes(other)))}
throw _b_.TypeError.$factory("can't concat bytes to "+
_b_.str.$factory(other))}
bytes.__contains__=function(self,other){if(typeof other=="number"){return self.source.indexOf(other)>-1}
if(self.source.length < other.source.length){return false}
var len=other.source.length
for(var i=0;i < self.source.length-other.source.length+1;i++){var flag=true
for(var j=0;j < len;j++){if(other.source[i+j]!=self.source[j]){flag=false
break}}
if(flag){return true}}
return false}
var bytes_iterator=$B.make_iterator_class("bytes_iterator")
bytes.__iter__=function(self){return bytes_iterator.$factory(self.source)}
bytes.__eq__=function(self,other){if(invalid(other)){return false}
return $B.$getattr(self.source,'__eq__')(other.source)}
bytes.__ge__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__ge__(self.source,other.source)}
bytes.__getitem__=function(self,arg){var i
if(_b_.isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos=self.source.length+pos}
if(pos >=0 && pos < self.source.length){return self.source[pos]}
throw _b_.IndexError.$factory("index out of range")}else if(_b_.isinstance(arg,_b_.slice)){var s=_b_.slice.$conv_for_seq(arg,self.source.length),start=s.start,stop=s.stop,step=s.step
var res=[],i=null,pos=0
if(step > 0){stop=Math.min(stop,self.source.length)
if(stop <=start){return bytes.$factory([])}
for(var i=start;i < stop;i+=step){res[pos++]=self.source[i]}}else{if(stop >=start){return bytes.$factory([])}
stop=Math.max(0,stop)
for(var i=start;i >=stop;i+=step){res[pos++]=self.source[i]}}
return bytes.$factory(res)}else if(_b_.isinstance(arg,_b_.bool)){return self.source.__getitem__(_b_.int.$factory(arg))}}
bytes.__gt__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__gt__(self.source,other.source)}
bytes.__hash__=function(self){if(self===undefined){return bytes.__hashvalue__ ||$B.$py_next_hash--}
var hash=1
for(var i=0,len=self.source.length;i < len;i++){hash=(101*hash+self.source[i])& 0xFFFFFFFF}
return hash}
bytes.__init__=function(){return _b_.None}
bytes.__le__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__le__(self.source,other.source)}
bytes.__len__=function(self){return self.source.length}
bytes.__lt__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__lt__(self.source,other.source)}
bytes.__mod__=function(self,args){
var s=decode(self,"ascii","strict"),res=_b_.str.__mod__(s,args)
return _b_.str.encode(res,"ascii")}
bytes.__mul__=function(){var $=$B.args('__mul__',2,{self:null,other:null},['self','other'],arguments,{},null,null),other=$B.PyNumber_Index($.other)
var t=[],source=$.self.source,slen=source.length
for(var i=0;i < other;i++){for(var j=0;j < slen;j++){t.push(source[j])}}
var res=bytes.$factory()
res.source=t
return res}
bytes.__ne__=function(self,other){return ! bytes.__eq__(self,other)}
bytes.__new__=function(cls,source,encoding,errors){var $=$B.args("__new__",4,{cls:null,source:null,encoding:null,errors:null},["cls","source","encoding","errors"],arguments,{source:[],encoding:"utf-8",errors:"strict"},null,null)
return bytes.$new($.cls,$.source,$.encoding,$.errors)}
bytes.$new=function(cls,source,encoding,errors){
var self={__class__:cls},int_list=[],pos=0
if(source===undefined){}else if(typeof source=="number" ||_b_.isinstance(source,_b_.int)){var i=source
while(i--){int_list[pos++]=0}}else{if(typeof source=="string" ||_b_.isinstance(source,_b_.str)){if(encoding===undefined){throw _b_.TypeError.$factory("string argument without an encoding")}
int_list=encode(source,encoding ||"utf-8",errors ||"strict")}else{
int_list=_b_.list.$factory(source)
for(var i=0;i < int_list.length;i++){try{var item=_b_.int.$factory(int_list[i])}catch(err){throw _b_.TypeError.$factory("'"+
$B.class_name(int_list[i])+"' object "+
"cannot be interpreted as an integer")}
if(item < 0 ||item > 255){throw _b_.ValueError.$factory("bytes must be in range"+
"(0, 256)")}}}}
self.source=int_list
self.encoding=encoding
self.errors=errors
return self}
bytes.__repr__=bytes.__str__=function(self){var res=""
for(var i=0,len=self.source.length;i < len;i++){var s=self.source[i]
if(s==10){res+='\\n'}else if(s < 32 ||s >=128){var hx=s.toString(16)
hx=(hx.length==1 ? '0' :'')+hx
res+='\\x'+hx}else if(s=="\\".charCodeAt(0)){res+="\\\\"}else{res+=String.fromCharCode(s)}}
if(res.indexOf("'")>-1 && res.indexOf('"')==-1){return 'b"'+res+'"'}else{return "b'"+res.replace(new RegExp("'","g"),"\\'")+"'"}}
bytes.__reduce_ex__=function(self){return bytes.__repr__(self)}
bytes.capitalize=function(self){var src=self.source,len=src.length,buffer=src.slice()
if(buffer[0]> 96 && buffer[0]< 123){buffer[0]-=32}
for(var i=1;i < len;++i){if(buffer[i]> 64 && buffer[i]< 91){buffer[i]+=32}}
return bytes.$factory(buffer)}
bytes.center=function(){var $=$B.args('center',3,{self:null,width:null,fillbyte:null},['self','width','fillbyte'],arguments,{fillbyte:bytes.$factory([32])},null,null)
var diff=$.width-$.self.source.length
if(diff <=0){return bytes.$factory($.self.source)}
var ljust=bytes.ljust($.self,$.self.source.length+Math.floor(diff/2),$.fillbyte)
return bytes.rjust(ljust,$.width,$.fillbyte)}
bytes.count=function(){var $=$B.args('count',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null)
var n=0,index=-1,len=0
if(typeof $.sub=="number"){if($.sub < 0 ||$.sub > 255)
throw _b_.ValueError.$factory("byte must be in range(0, 256)")
len=1}else if(!$.sub.__class__){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.sub)+"'")}else if(!$.sub.__class__.$buffer_protocol){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.sub)+"'")}else{len=$.sub.source.length}
do{index=bytes.find($.self,$.sub,Math.max(index+len,$.start),$.end)
if(index !=-1){n++}}while(index !=-1)
return n}
bytes.decode=function(self,encoding,errors){var $=$B.args("decode",3,{self:null,encoding:null,errors:null},["self","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null)
switch($.errors){case 'strict':
case 'ignore':
case 'replace':
case 'surrogateescape':
case 'surrogatepass':
case 'xmlcharrefreplace':
case 'backslashreplace':
return decode($.self,$.encoding,$.errors)
default:}}
bytes.endswith=function(){var $=$B.args('endswith',4,{self:null,suffix:null,start:null,end:null},['self','suffix','start','end'],arguments,{start:-1,end:-1},null,null)
if(_b_.isinstance($.suffix,bytes)){var start=$.start==-1 ?
$.self.source.length-$.suffix.source.length :
Math.min($.self.source.length-$.suffix.source.length,$.start)
var end=$.end==-1 ?
($.start==-1 ? $.self.source.length :start+$.suffix.source.length):
Math.min($.self.source.length-1,$.end)
var res=true
for(var i=$.suffix.source.length-1,len=$.suffix.source.length;
i >=0 && res;--i){res=$.self.source[end-len+i]==$.suffix.source[i]}
return res}else if(_b_.isinstance($.suffix,_b_.tuple)){for(var i=0;i < $.suffix.length;++i){if(_b_.isinstance($.suffix[i],bytes)){if(bytes.endswith($.self,$.suffix[i],$.start,$.end)){return true}}else{throw _b_.TypeError.$factory("endswith first arg must be "+
"bytes or a tuple of bytes, not "+
$B.class_name($.suffix))}}
return false}else{throw _b_.TypeError.$factory("endswith first arg must be bytes "+
"or a tuple of bytes, not "+$B.class_name($.suffix))}}
bytes.expandtabs=function(){var $=$B.args('expandtabs',2,{self:null,tabsize:null},['self','tabsize'],arguments,{tabsize:8},null,null)
var tab_spaces=[]
for(let i=0;i < $.tabsize;++i){tab_spaces.push(32)}
var buffer=$.self.source.slice()
for(let i=0;i < buffer.length;++i){if(buffer[i]===9){buffer.splice.apply(buffer,[i,1].concat(tab_spaces))}}
return _b_.bytes.$factory(buffer)}
bytes.find=function(self,sub){if(arguments.length !=2){var $=$B.args('find',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null),sub=$.sub,start=$.start,end=$.end}else{var start=0,end=-1}
if(typeof sub=="number"){if(sub < 0 ||sub > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
return self.source.slice(0,end==-1 ? undefined :end).indexOf(sub,start)}else if(! sub.__class__){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name(sub)+"'")}else if(! sub.__class__.$buffer_protocol){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name(sub)+"'")}
end=end==-1 ? self.source.length :Math.min(self.source.length,end)
var len=sub.source.length
for(var i=start;i <=end-len;i++){var chunk=self.source.slice(i,i+len),found=true
for(var j=0;j < len;j++){if(chunk[j]!=sub.source[j]){found=false
break}}
if(found){return i}}
return-1}
bytes.fromhex=function(){var $=$B.args('fromhex',2,{cls:null,string:null},['cls','string'],arguments,{},null,null),string=$.string.replace(/\s/g,''),source=[]
for(var i=0;i < string.length;i+=2){if(i+2 > string.length){throw _b_.ValueError.$factory("non-hexadecimal number found "+
"in fromhex() arg")}
source.push(_b_.int.$factory(string.substr(i,2),16))}
return $.cls.$factory(source)}
bytes.hex=function(){
var $=$B.args('hex',1,{self:null},['self'],arguments,{},null,null),self=$.self,res=""
for(var i=0,len=self.source.length;i < len;i++){var hexa=self.source[i].toString(16)
if(hexa.length < 2){hexa="0"+hexa}
res+=hexa}
return res}
bytes.index=function(){var $=$B.args('rfind',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null)
var index=bytes.find($.self,$.sub,$.start,$.end)
if(index==-1){throw _b_.ValueError.$factory("subsection not found")}
return index}
bytes.isalnum=function(self){var src=self.source,len=src.length,res=len > 0
for(var i=0;i < len && res;++i){res=(src[i]> 96 && src[i]< 123)||
(src[i]> 64 && src[i]< 91)||
(src[i]> 47 && src[i]< 58)}
return res}
bytes.isalpha=function(self){var src=self.source,len=src.length,res=len > 0
for(var i=0;i < len && res;++i){res=(src[i]> 96 && src[i]< 123)||(src[i]> 64 && src[i]< 91)}
return res}
bytes.isdigit=function(self){var src=self.source,len=src.length,res=len > 0
for(let i=0;i < len && res;++i){res=src[i]> 47 && src[i]< 58}
return res}
bytes.islower=function(self){var src=self.source,len=src.length,res=false
for(let i=0;i < len;++i){
res=res ||(src[i]> 96 && src[i]< 123)
if(src[i]> 64 && src[i]< 91){return false}}
return res}
bytes.isspace=function(self){var src=self.source,len=src.length
for(let i=0;i < len;++i){switch(src[i]){case 9:
case 10:
case 11:
case 12:
case 13:
case 32:
break
default:
return false}}
return true}
bytes.isupper=function(self){var src=self.source,len=src.length,res=false
for(let i=0;i < len;++i){
res=res ||(src[i]> 64 && src[i]< 91)
if(src[i]> 96 && src[i]< 123){return false}}
return res}
bytes.istitle=function(self){var src=self.source,len=src.length,current_char_is_letter=false,prev_char_was_letter=false,is_uppercase=false,is_lowercase=false
for(var i=0;i < len;++i){is_lowercase=src[i]> 96 && src[i]< 123
is_uppercase=src[i]> 64 && src[i]< 91
current_char_is_letter=is_lowercase ||is_uppercase
if(current_char_is_letter &&
(prev_char_was_letter && is_uppercase)||
(! prev_char_was_letter && is_lowercase)){return false}
prev_char_was_letter=current_char_is_letter}
return true}
bytes.join=function(){var $ns=$B.args('join',2,{self:null,iterable:null},['self','iterable'],arguments,{}),self=$ns['self'],iterable=$ns['iterable']
var next_func=$B.$getattr(_b_.iter(iterable),'__next__'),res=self.__class__.$factory(),empty=true
while(true){try{var item=next_func()
if(empty){empty=false}
else{res=bytes.__add__(res,self)}
res=bytes.__add__(res,item)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}
return res}
var _lower=function(char_code){if(char_code >=65 && char_code <=90){return char_code+32}else{return char_code}}
bytes.lower=function(self){var _res=[],pos=0
for(var i=0,len=self.source.length;i < len;i++){if(self.source[i]){_res[pos++]=_lower(self.source[i])}}
return bytes.$factory(_res)}
bytes.ljust=function(){var $=$B.args('ljust',3,{self:null,width:null,fillbyte:null},['self','width','fillbyte'],arguments,{fillbyte:bytes.$factory([32])},null,null)
if(!$.fillbyte.__class__){throw _b_.TypeError.$factory("argument 2 must be a byte string of length 1, "+
"not '"+$B.class_name($.fillbyte)+"'")}else if(!$.fillbyte.__class__.$buffer_protocol){throw _b_.TypeError.$factory("argument 2 must be a byte string of length 1, "+
"not '"+$B.class_name($.fillbyte)+"'")}
var padding=[],count=$.width-$.self.source.length
for(var i=0;i < count;++i){padding.push($.fillbyte.source[0])}
return bytes.$factory($.self.source.concat(padding))}
bytes.lstrip=function(self,cars){return _strip(self,cars,'l')}
bytes.maketrans=function(from,to){var _t=[],to=$B.to_bytes(to)
for(var i=0;i < 256;i++){_t[i]=i}
for(var i=0,len=from.source.length;i < len;i++){var _ndx=from.source[i]
_t[_ndx]=to[i]}
return bytes.$factory(_t)}
bytes.partition=function(){var $=$B.args('partition',2,{self:null,sep:null},['self','sep'],arguments,{},null,null)
if(! $.sep.__class__){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}else if(! $.sep.__class__.$buffer_protocol){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}
var len=$.sep.source.length,src=$.self.source,i=bytes.find($.self,$.sep)
return _b_.tuple.$factory([bytes.$factory(src.slice(0,i)),bytes.$factory(src.slice(i,i+len)),bytes.$factory(src.slice(i+len))
])}
bytes.removeprefix=function(){var $=$B.args("removeprefix",2,{self:null,prefix:null},["self","prefix"],arguments,{},null,null)
if(!_b_.isinstance($.prefix,[bytes,bytearray])){throw _b_.ValueError.$factory("prefix should be bytes, not "+
`'${$B.class_name($.prefix)}'`)}
if(bytes.startswith($.self,$.prefix)){return bytes.__getitem__($.self,_b_.slice.$factory($.prefix.source.length,_b_.None))}
return bytes.__getitem__($.self,_b_.slice.$factory(0,_b_.None))}
bytes.removesuffix=function(){var $=$B.args("removesuffix",2,{self:null,prefix:null},["self","suffix"],arguments,{},null,null)
if(!_b_.isinstance($.suffix,[bytes,bytearray])){throw _b_.ValueError.$factory("suffix should be bytes, not "+
`'${$B.class_name($.suffix)}'`)}
if(bytes.endswith($.self,$.suffix)){return bytes.__getitem__($.self,_b_.slice.$factory(0,$.suffix.source.length+1))}
return bytes.__getitem__($.self,_b_.slice.$factory(0,_b_.None))}
bytes.replace=function(){var $=$B.args('replace',4,{self:null,old:null,new:null,count:null},['self','old','new','count'],arguments,{count:-1},null,null),res=[]
var self=$.self,src=self.source,len=src.length,old=$.old,$new=$.new
var count=$.count >=0 ? $.count :src.length
if(! $.old.__class__){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.old)+"'")}else if(! $.old.__class__.$buffer_protocol){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.sep)+"'")}
if(! $.new.__class__){throw _b_.TypeError.$factory("second argument must be a bytes-like "+
"object, not '"+$B.class_name($.old)+"'")}else if(! $.new.__class__.$buffer_protocol){throw _b_.TypeError.$factory("second argument must be a bytes-like "+
"object, not '"+$B.class_name($.sep)+"'")}
for(var i=0;i < len;i++){if(bytes.startswith(self,old,i)&& count){for(var j=0;j < $new.source.length;j++){res.push($new.source[j])}
i+=(old.source.length-1)
count--}else{res.push(src[i])}}
return bytes.$factory(res)}
bytes.rfind=function(self,subbytes){if(arguments.length==2 && subbytes.__class__===bytes){var sub=subbytes,start=0,end=-1}else{var $=$B.args('rfind',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null),self=$.self,sub=$.sub,start=$.start,end=$.end}
if(typeof sub=="number"){if(sub < 0 ||sub > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
return $.self.source.slice(start,$.end==-1 ? undefined :$.end).
lastIndexOf(sub)+start}else if(! sub.__class__){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.sub)+"'")}else if(! sub.__class__.$buffer_protocol){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name(sub)+"'")}
end=end==-1 ? self.source.length :Math.min(self.source.length,end)
var len=sub.source.length
for(var i=end-len;i >=start;--i){var chunk=self.source.slice(i,i+len),found=true
for(var j=0;j < len;j++){if(chunk[j]!=sub.source[j]){found=false
break}}
if(found){return i}}
return-1}
bytes.rindex=function(){var $=$B.args('rfind',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null)
var index=bytes.rfind($.self,$.sub,$.start,$.end)
if(index==-1){throw _b_.ValueError.$factory("subsection not found")}
return index}
bytes.rjust=function(){var $=$B.args('rjust',3,{self:null,width:null,fillbyte:null},['self','width','fillbyte'],arguments,{fillbyte:bytes.$factory([32])},null,null)
if(!$.fillbyte.__class__){throw _b_.TypeError.$factory("argument 2 must be a byte string of length 1, "+
"not '"+$B.class_name($.fillbyte)+"'")}else if(!$.fillbyte.__class__.$buffer_protocol){throw _b_.TypeError.$factory("argument 2 must be a byte string of length 1, "+
"not '"+$B.class_name($.fillbyte)+"'")}
var padding=[],count=$.width-$.self.source.length
for(var i=0;i < count;++i){padding.push($.fillbyte.source[0])}
return bytes.$factory(padding.concat($.self.source))}
bytes.rpartition=function(){var $=$B.args('rpartition',2,{self:null,sep:null},['self','sep'],arguments,{},null,null)
if(!$.sep.__class__){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}else if(!$.sep.__class__.$buffer_protocol){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}
var len=$.sep.source.length,src=$.self.source,i=bytes.rfind($.self,$.sep)
return _b_.tuple.$factory([bytes.$factory(src.slice(0,i)),bytes.$factory(src.slice(i,i+len)),bytes.$factory(src.slice(i+len))
])}
bytes.rstrip=function(self,cars){return _strip(self,cars,'r')}
bytes.split=function(){var $=$B.args('split',2,{self:null,sep:null},['self','sep'],arguments,{sep:bytes.$factory([32])},null,null),res=[],start=0,stop=0
if(! $.sep.__class__ ){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}else if(! $.sep.__class__.$buffer_protocol){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}
var seps=$.sep.source,len=seps.length,src=$.self.source,blen=src.length
while(stop < blen){var match=true
for(var i=0;i < len && match;i++){if(src[stop+i]!=seps[i]){match=false}}
if(match){res.push(bytes.$factory(src.slice(start,stop)))
start=stop+len
stop=start}else{stop++}}
if(match ||(stop > start)){res.push(bytes.$factory(src.slice(start,stop)))}
return res}
bytes.splitlines=function(self){var $=$B.args('splitlines',2,{self:null,keepends:null},['self','keepends'],arguments,{keepends:false},null,null)
if(!_b_.isinstance($.keepends,[_b_.bool,_b_.int])){throw _b_.TypeError('integer argument expected, got '+
$B.get_class($.keepends).__name)}
var keepends=_b_.int.$factory($.keepends),res=[],source=$.self.source,start=0,pos=0
if(! source.length){return res}
while(pos < source.length){if(pos < source.length-1 && source[pos]==0x0d &&
source[pos+1]==0x0a){res.push(bytes.$factory(source.slice(start,keepends ? pos+2 :pos)))
start=pos=pos+2}else if(source[pos]==0x0d ||source[pos]==0x0a){res.push(bytes.$factory(source.slice(start,keepends ? pos+1 :pos)))
start=pos=pos+1}else{pos++}}
if(start < source.length){res.push(bytes.$factory(source.slice(start)))}
return res}
bytes.startswith=function(){var $=$B.args('startswith',3,{self:null,prefix:null,start:null},['self','prefix','start'],arguments,{start:0},null,null),start=$.start
if(_b_.isinstance($.prefix,bytes)){var res=true
for(var i=0;i < $.prefix.source.length && res;i++){res=$.self.source[start+i]==$.prefix.source[i]}
return res}else if(_b_.isinstance($.prefix,_b_.tuple)){var items=[]
for(var i=0;i < $.prefix.length;i++){if(_b_.isinstance($.prefix[i],bytes)){items=items.concat($.prefix[i].source)}else{throw _b_.TypeError.$factory("startswith first arg must be "+
"bytes or a tuple of bytes, not "+
$B.class_name($.prefix))}}
var prefix=bytes.$factory(items)
return bytes.startswith($.self,prefix,start)}else{throw _b_.TypeError.$factory("startswith first arg must be bytes "+
"or a tuple of bytes, not "+$B.class_name($.prefix))}}
bytes.strip=function(self,cars){var res=bytes.lstrip(self,cars)
return bytes.rstrip(res,cars)}
bytes.swapcase=function(self){var src=self.source,len=src.length,buffer=src.slice()
for(var i=0;i < len;++i){if(buffer[i]> 96 && buffer[i]< 123){buffer[i]-=32}else if(buffer[i]> 64 && buffer[i]< 91){buffer[i]+=32}}
return bytes.$factory(buffer)}
bytes.title=function(self){var src=self.source,len=src.length
buffer=src.slice(),current_char_is_letter=false,prev_char_was_letter=false,is_uppercase=false,is_lowercase=false
for(var i=0;i < len;++i){is_lowercase=buffer[i]> 96 && buffer[i]< 123
is_uppercase=buffer[i]> 64 && buffer[i]< 91
current_char_is_letter=is_lowercase ||is_uppercase
if(current_char_is_letter){if(prev_char_was_letter && is_uppercase){buffer[i]+=32}else if(! prev_char_was_letter && is_lowercase){buffer[i]-=32}}
prev_char_was_letter=current_char_is_letter}
return bytes.$factory(buffer)}
bytes.translate=function(self,table,_delete){if(_delete===undefined){_delete=[]}else if(_b_.isinstance(_delete,bytes)){_delete=_delete.source}else{throw _b_.TypeError.$factory("Type "+
$B.get_class(_delete).__name+" doesn't support the buffer API")}
var res=[],pos=0
if(_b_.isinstance(table,bytes)&& table.source.length==256){for(var i=0,len=self.source.length;i < len;i++){if(_delete.indexOf(self.source[i])>-1){continue}
res[pos++]=table.source[self.source[i]]}}
return bytes.$factory(res)}
var _upper=function(char_code){if(char_code >=97 && char_code <=122){return char_code-32}else{return char_code}}
bytes.upper=function(self){var _res=[],pos=0
for(var i=0,len=self.source.length;i < len;i++){if(self.source[i]){_res[pos++]=_upper(self.source[i])}}
return bytes.$factory(_res)}
bytes.zfill=function(self,width){var buffer=self.source.slice(),prefix_offset=(buffer[0]==43 ||buffer[0]==45)? 1 :0
var count=width-self.source.length
var padding=[]
for(var i=0;i < count;++i){padding.push(48)}
buffer.splice.apply(buffer,[prefix_offset,0].concat(padding))
return bytes.$factory(buffer)}
function $UnicodeEncodeError(encoding,code_point,position){throw _b_.UnicodeEncodeError.$factory("'"+encoding+
"' codec can't encode character "+_b_.hex(code_point)+
" in position "+position)}
function $UnicodeDecodeError(encoding,position){throw _b_.UnicodeDecodeError.$factory("'"+encoding+
"' codec can't decode bytes in position "+position)}
function _hex(_int){return _int.toString(16)}
function _int(hex){return parseInt(hex,16)}
function normalise(encoding){var enc=encoding.toLowerCase()
if(enc.substr(0,7)=="windows"){enc="cp"+enc.substr(7)}
if(enc.startsWith("cp")||enc.startsWith("iso")){enc=enc.replace("-","")}
enc=enc.replace(/-/g,"_")
return enc}
function load_decoder(enc){
if(to_unicode[enc]===undefined){var mod=_b_.__import__("encodings."+enc)
if(mod[enc].getregentry){to_unicode[enc]=$B.$getattr(mod[enc].getregentry(),"decode")}}}
function load_encoder(enc){
if(from_unicode[enc]===undefined){var mod=_b_.__import__("encodings."+enc)
if(mod[enc].getregentry){from_unicode[enc]=$B.$getattr(mod[enc].getregentry(),"encode")}}}
var decode=$B.decode=function(obj,encoding,errors){var s="",b=obj.source,enc=normalise(encoding)
switch(enc){case "utf_8":
case "utf-8":
case "utf8":
case "U8":
case "UTF":
var pos=0,s="",err_info
while(pos < b.length){var byte=b[pos]
err_info=null
if(!(byte & 0x80)){
s+=String.fromCodePoint(byte)
pos++}else if((byte >> 5)==6){
if(b[pos+1]===undefined){err_info=[byte,pos,"end"]}else if((b[pos+1]& 0xc0)!=0x80){err_info=[byte,pos,"continuation"]}
if(err_info !==null){if(errors=="ignore"){pos++}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
err_info[0].toString(16)+"  in position "+
err_info[1]+
(err_info[2]=="end" ? ": unexpected end of data" :
": invalid continuation byte"))}}else{var cp=byte & 0x1f
cp <<=6
cp+=b[pos+1]& 0x3f
s+=String.fromCodePoint(cp)
pos+=2}}else if((byte >> 4)==14){
if(b[pos+1]===undefined){err_info=[byte,pos,"end",pos+1]}else if((b[pos+1]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+2]}else if(b[pos+2]===undefined){err_info=[byte,pos+'-'+(pos+1),"end",pos+2]}else if((b[pos+2]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+3]}
if(err_info !==null){if(errors=="ignore"){pos=err_info[3]}else if(errors=="surrogateescape"){for(var i=pos;i < err_info[3];i++){s+=String.fromCodePoint(0xdc80+b[i]-0x80)}
pos=err_info[3]}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
err_info[0].toString(16)+"  in position "+
err_info[1]+
(err_info[2]=="end" ? ": unexpected end of data" :
": invalid continuation byte"))}}else{var cp=byte & 0xf
cp=cp << 12
cp+=(b[pos+1]& 0x3f)<< 6
cp+=b[pos+2]& 0x3f
s+=String.fromCodePoint(cp)
pos+=3}}else if((byte >> 3)==30){
if(b[pos+1]===undefined){err_info=[byte,pos,"end",pos+1]}else if((b[pos+1]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+2]}else if(b[pos+2]===undefined){err_info=[byte,pos+'-'+(pos+1),"end",pos+2]}else if((b[pos+2]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+3]}else if(b[pos+3]===undefined){err_info=[byte,pos+'-'+(pos+1)+'-'+(pos+2),"end",pos+3]}else if((b[pos+2]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+3]}
if(err_info !==null){if(errors=="ignore"){pos=err_info[3]}else if(errors=="surrogateescape"){for(var i=pos;i < err_info[3];i++){s+=String.fromCodePoint(0xdc80+b[i]-0x80)}
pos=err_info[3]}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
err_info[0].toString(16)+"  in position "+
err_info[1]+
(err_info[2]=="end" ? ": unexpected end of data" :
": invalid continuation byte"))}}else{var cp=byte & 0xf
cp=cp << 18
cp+=(b[pos+1]& 0x3f)<< 12
cp+=(b[pos+2]& 0x3f)<< 6
cp+=(b[pos+3]& 0x3f)
s+=String.fromCodePoint(cp)
pos+=4}}else{if(errors=="ignore"){pos++}else if(errors=="surrogateescape"){s+=String.fromCodePoint(0xdc80+b[pos]-0x80)
pos++}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
byte.toString(16)+" in position "+pos+
": invalid start byte")}}}
return s
case "latin_1":
case "windows1252":
case "iso-8859-1":
case "iso8859-1":
case "8859":
case "cp819":
case "latin":
case "latin1":
case "L1":
b.forEach(function(item){s+=String.fromCharCode(item)})
break
case "unicode_escape":
if(obj.__class__===bytes ||obj.__class__===bytearray){obj=decode(obj,"latin-1","strict")}
return obj.replace(/\\n/g,"\n").
replace(/\\a/g,"\u0007").
replace(/\\b/g,"\b").
replace(/\\f/g,"\f").
replace(/\\t/g,"\t").
replace(/\\'/g,"'").
replace(/\\"/g,'"')
case "raw_unicode_escape":
if(obj.__class__===bytes ||obj.__class__===bytearray){obj=decode(obj,"latin-1","strict")}
return obj.replace(/\\u([a-fA-F0-9]{4})/g,function(mo){var cp=parseInt(mo.substr(2),16)
return String.fromCharCode(cp)})
case "ascii":
for(var i=0,len=b.length;i < len;i++){var cp=b[i]
if(cp <=127){s+=String.fromCharCode(cp)}else{if(errors=="ignore"){}else{var msg="'ascii' codec can't decode byte 0x"+
cp.toString(16)+" in position "+i+
": ordinal not in range(128)"
throw _b_.UnicodeDecodeError.$factory(msg)}}}
break
default:
try{load_decoder(enc)}catch(err){console.log(b,encoding,"error load_decoder",err)
throw _b_.LookupError.$factory("unknown encoding: "+enc)}
return to_unicode[enc](obj)[0]}
return s}
var encode=$B.encode=function(){var $=$B.args("encode",3,{s:null,encoding:null,errors:null},["s","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null),s=$.s,encoding=$.encoding,errors=$.errors
var t=[],pos=0,enc=normalise(encoding)
switch(enc){case "utf-8":
case "utf_8":
case "utf8":
var res=[]
for(var i=0,len=s.length;i < len;i++){var cp=s.charCodeAt(i)
if(cp < 0x7f){res.push(cp)}else if(cp < 0x7ff){res.push(0xc0+(cp >> 6),0x80+(cp & 0x3f))}else if(cp < 0xffff){res.push(0xe0+(cp >> 12),0x80+((cp & 0xfff)>> 6),0x80+(cp & 0x3f))}else{console.log("4 bytes")}}
return res
case "latin":
case "latin1":
case "latin-1":
case "latin_1":
case "L1":
case "iso8859_1":
case "iso_8859_1":
case "8859":
case "cp819":
case "windows1252":
for(var i=0,len=s.length;i < len;i++){var cp=s.charCodeAt(i)
if(cp <=255){t[pos++]=cp}
else if(errors !="ignore"){$UnicodeEncodeError(encoding,i)}}
break
case "ascii":
for(var i=0,len=s.length;i < len;i++){var cp=s.charCodeAt(i)
if(cp <=127){t[pos++]=cp}
else if(errors !="ignore"){$UnicodeEncodeError(encoding,i)}}
break
case "raw_unicode_escape":
for(var i=0,len=s.length;i < len;i++){var cp=s.charCodeAt(i)
if(cp < 256){t[pos++]=cp}else{var us=cp.toString(16)
if(us.length % 2){us="0"+us}
us="\\u"+us
for(var j=0;j < us.length;j++){t[pos++]=us.charCodeAt(j)}}}
break
default:
try{load_encoder(enc)}catch(err){throw _b_.LookupError.$factory("unknown encoding: "+encoding)}
t=from_unicode[enc](s)[0].source}
return t}
bytes.$factory=function(source,encoding,errors){var $=$B.args("bytes",3,{source:null,encoding:null,errors:null},["source","encoding","errors"],arguments,{source:[],encoding:"utf-8",errors:"strict"},null,null)
return bytes.$new(bytes,$.source,$.encoding,$.errors)}
bytes.__class__=_b_.type
bytes.$is_class=true
for(var attr in bytes){if(bytearray[attr]===undefined && typeof bytes[attr]=="function"){bytearray[attr]=(function(_attr){return function(){return bytes[_attr].apply(null,arguments)}})(attr)}}
$B.set_func_names(bytes,"builtins")
bytes.fromhex=_b_.classmethod.$factory(bytes.fromhex)
$B.set_func_names(bytearray,"builtins")
bytearray.fromhex=_b_.classmethod.$factory(bytearray.fromhex)
_b_.bytes=bytes
_b_.bytearray=bytearray})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins,object=_b_.object,$N=_b_.None
function create_type(obj){return $B.get_class(obj).$factory()}
function clone(obj){var res=create_type(obj)
res.$items=obj.$items.slice()
for(key in obj.$hashes){res.$hashes[key]=obj.$hashes[key]}
return res}
var set={__class__:_b_.type,$infos:{__module__:"builtins",__name__:"set"},$is_class:true,$native:true}
set.__and__=function(self,other,accept_iter){try{$test(accept_iter,other)}catch(err){return _b_.NotImplemented}
var res=create_type(self)
for(var i=0,len=self.$items.length;i < len;i++){if(_b_.getattr(other,"__contains__")(self.$items[i])){set.add(res,self.$items[i])}}
return res}
set.__class_getitem__=function(cls,item){
if(! Array.isArray(item)){item=[item]}
return $B.GenericAlias.$factory(cls,item)}
set.__contains__=function(self,item){if(typeof item=="number" ||item instanceof Number){if(isNaN(item)){
for(var i=self.$items.length-1;i >=0;i--){if(isNaN(self.$items[i])){return true}}
return false}else if(item instanceof Number){return self.$numbers.indexOf(item.valueOf())>-1}else{return self.$items.indexOf(item)>-1}}else if(typeof item=="string"){return self.$items.indexOf(item)>-1}
var hash=_b_.hash(item),
is_tuple=item.__class__===_b_.tuple
if(self.$hashes[hash]){for(var i=0,len=self.$hashes[hash].length;i < len;i++){if(is_tuple && self.$hashes[hash][i].__class__===_b_.tuple){return true}else if($B.rich_comp("__eq__",self.$hashes[hash][i],item)){return true}}}
return false}
set.__eq__=function(self,other){
if(other===undefined){return self===set}
if(_b_.isinstance(other,[_b_.set,_b_.frozenset])){if(other.$items.length==self.$items.length){for(var i=0,len=self.$items.length;i < len;i++){if(set.__contains__(self,other.$items[i])===false){return false}}
return true}
return false}
return _b_.NotImplemented}
set.__format__=function(self,format_string){return set.__str__(self)}
set.__ge__=function(self,other){if(_b_.isinstance(other,[set,frozenset])){return set.__le__(other,self)}
return _b_.NotImplemented}
set.__gt__=function(self,other){if(_b_.isinstance(other,[set,frozenset])){return set.__lt__(other,self)}
return _b_.NotImplemented}
set.__hash__=_b_.None
set.__init__=function(self,iterable,second){if(second===undefined){if(Array.isArray(iterable)){for(var i=0,len=iterable.length;i < len;i++){$add(self,iterable[i])}
return $N}}
var $=$B.args("__init__",2,{self:null,iterable:null},["self","iterable"],arguments,{iterable:[]},null,null),self=$.self,iterable=$.iterable
if(_b_.isinstance(iterable,[set,frozenset])){self.$items=iterable.$items.slice()
self.$hashes={}
for(var key in iterable.$hashes){self.$hashes[key]=iterable.$hashes[key]}
return $N}
var it=$B.$iter(iterable)
while(1){try{var item=_b_.next(it)
$add(self,item)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}
return $N}
var set_iterator=$B.make_iterator_class("set iterator")
set.__iter__=function(self){self.$items.sort()
return set_iterator.$factory(self.$items)}
set.__le__=function(self,other){
if(_b_.isinstance(other,[set,frozenset])){var cfunc=_b_.getattr(other,"__contains__")
for(var i=0,len=self.$items.length;i < len;i++){if(! cfunc(self.$items[i])){return false}}
return true}else{return _b_.NotImplemented}}
set.__len__=function(self){return self.$items.length}
set.__lt__=function(self,other){if(_b_.isinstance(other,[set,frozenset])){return set.__le__(self,other)&&
set.__len__(self)< _b_.getattr(other,"__len__")()}else{return _b_.NotImplemented}}
set.__mro__=[_b_.object]
set.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory("set.__new__(): not enough arguments")}
return{
__class__:cls,$items:[],$numbers:[],
$hashes:{}}}
set.__or__=function(self,other,accept_iter){
var res=clone(self),func=_b_.getattr($B.$iter(other),"__next__")
while(1){try{set.add(res,func())}
catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}
res.__class__=self.__class__
return res}
set.__rand__=function(self,other){
return set.__and__(self,other)}
set.__reduce__=function(self){return _b_.tuple.$factory([self.__class__,_b_.tuple.$factory([self.$items]),$N])}
set.__reduce_ex__=function(self,protocol){return set.__reduce__(self)}
set.__repr__=function(self){$B.builtins_repr_check(set,arguments)
return set_repr(self)}
function set_repr(self){
klass_name=$B.class_name(self)
if(self.$items.length===0){return klass_name+"()"}
var head=klass_name+"({",tail="})"
if(head=="set({"){head="{";tail="}"}
var res=[]
if($B.repr.enter(self)){return klass_name+"(...)"}
self.$items.sort()
for(var i=0,len=self.$items.length;i < len;i++){var r=_b_.repr(self.$items[i])
if(r===self ||r===self.$items[i]){res.push("{...}")}
else{res.push(r)}}
res=res.join(", ")
$B.repr.leave(self)
return head+res+tail}
set.__rsub__=function(self,other){
return set.__sub__(other,self)}
set.__rxor__=function(self,other){
return set.__xor__(self,other)}
set.__sub__=function(self,other,accept_iter){
try{$test(accept_iter,other,"-")}
catch(err){return _b_.NotImplemented}
var res=create_type(self),cfunc=_b_.getattr(other,"__contains__"),items=[]
for(var i=0,len=self.$items.length;i < len;i++){if(! cfunc(self.$items[i])){items.push(self.$items[i])}}
set.__init__.call(null,res,items)
return res}
set.__xor__=function(self,other,accept_iter){
try{$test(accept_iter,other,"^")}
catch(err){return _b_.NotImplemented}
var res=create_type(self),cfunc=_b_.getattr(other,"__contains__")
for(var i=0,len=self.$items.length;i < len;i++){if(! cfunc(self.$items[i])){set.add(res,self.$items[i])}}
for(var i=0,len=other.$items.length;i < len;i++){if(! set.__contains__(self,other.$items[i])){set.add(res,other.$items[i])}}
return res}
function $test(accept_iter,other,op){if(accept_iter===undefined &&
! _b_.isinstance(other,[set,frozenset])){throw _b_.TypeError.$factory("unsupported operand type(s) for "+op+
": 'set' and '"+$B.class_name(other)+"'")}}
$B.make_rmethods(set)
function $add(self,item){var $simple=false
if(typeof item==="string" ||typeof item==="number" ||
item instanceof Number){$simple=true}
if($simple){var ix=self.$items.indexOf(item)
if(ix==-1){if(item instanceof Number &&
self.$numbers.indexOf(item.valueOf())>-1){}else if(typeof item=="number" &&
self.$numbers.indexOf(item)>-1){}else{self.$items.push(item)
var value=item.valueOf()
if(typeof value=="number"){self.$numbers.push(value)}}}else{
if(item !==self.$items[ix]){self.$items.push(item)}}}else{
var hashvalue=_b_.hash(item)
var items=self.$hashes[hashvalue]
if(items===undefined){self.$hashes[hashvalue]=[item]
self.$items.push(item)}else{var items=self.$hashes[hashvalue],cfunc=function(other){return $B.rich_comp("__eq__",item,other)}
for(var i=0,len=items.length;i < len;i++){if(cfunc(items[i])){
return $N}}
self.$hashes[hashvalue].push(item)
self.$items.push(item)}}
return $N}
set.add=function(){var $=$B.args("add",2,{self:null,item:null},["self","item"],arguments,{},null,null),self=$.self,item=$.item
return $add(self,item)}
set.clear=function(){var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null)
$.self.$items=[]
$.self.$numbers=[]
$.self.$hashes={}
return $N}
set.copy=function(){var $=$B.args("copy",1,{self:null},["self"],arguments,{},null,null)
if(_b_.isinstance($.self,frozenset)){return $.self}
var res=set.$factory()
$.self.$items.forEach(function(item){res.$items.push(item)})
$.self.$numbers.forEach(function(item){res.$numbers.push(item)})
for(key in self.$hashes){res.$hashes[key]=self.$hashes[key]}
return res}
set.difference_update=function(self){var $=$B.args("difference_update",1,{self:null},["self"],arguments,{},"args",null)
for(var i=0;i < $.args.length;i++){var s=set.$factory($.args[i]),_next=_b_.getattr($B.$iter(s),"__next__"),item
while(true){try{item=_next()
var _type=typeof item
if(_type=="string" ||_type=="number"){var _index=self.$items.indexOf(item)
if(_index >-1){self.$items.splice(_index,1)}}else{for(var j=0;j < self.$items.length;j++){if($B.rich_comp("__eq__",self.$items[j],item)){self.$items.splice(j,1)
var hash=_b_.hash(item)
if(self.$hashes[hash]){for(var k=0;k < self.$hashes[hash].length;k++){if($B.rich_comp("__eq__",self.$hashes[hash][k],item)){self.$hashes[hash].splice(k,1)
break}}}}}}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}}
return $N}
set.discard=function(){var $=$B.args("discard",2,{self:null,item:null},["self","item"],arguments,{},null,null)
try{set.remove($.self,$.item)}
catch(err){if(!_b_.isinstance(err,[_b_.KeyError,_b_.LookupError])){throw err}}
return $N}
set.intersection_update=function(){
var $=$B.args("intersection_update",1,{self:null},["self"],arguments,{},"args",null),self=$.self
for(var i=0;i < $.args.length;i++){var remove=[],s=set.$factory($.args[i])
for(var j=0;j < self.$items.length;j++){var _item=self.$items[j],_type=typeof _item
if(_type=="string" ||_type=="number"){if(s.$items.indexOf(_item)==-1){remove.push(j)}}else{var found=false,hash=_b_.hash(_item)
if(s.$hashes[hash]){var hashes=s.$hashes[hash]
for(var k=0;! found && k < hashes.length;k++){if($B.rich_comp("__eq__",hashes[k],_item)){found=true}}
if(! found){remove.push(j)
hashes=self.$hashes[hash]
for(var k=0;! found && k < hashes.length;k++){if($B.rich_comp("__eq__",hashes[k],_item)){self.$hashes.splice(k,1)}}}}}}
remove.sort(function(x,y){return x-y}).reverse()
for(var j=0;j < remove.length;j++){self.$items.splice(remove[j],1)}}
return $N}
set.isdisjoint=function(){var $=$B.args("is_disjoint",2,{self:null,other:null},["self","other"],arguments,{},null,null)
for(var i=0,len=$.self.$items.length;i < len;i++){if(_b_.getattr($.other,"__contains__")($.self.$items[i])){return false}}
return true}
set.pop=function(self){if(self.$items.length===0){throw _b_.KeyError.$factory('pop from an empty set')}
var item=self.$items.pop()
if(typeof item !="string" && typeof item !="number"){
var hash=_b_.hash(item),items=self.$hashes[hash]
for(var k=0;k < items.length;k++){if($B.rich_comp("__eq__",items[k],item)){self.$hashes[hash].splice(k,1)
break}}}
return item}
set.remove=function(self,item){
var $=$B.args("remove",2,{self:null,item:null},["self","item"],arguments,{},null,null),self=$.self,item=$.item
if(! _b_.isinstance(item,set)){_b_.hash(item)}
if(typeof item=="string" ||typeof item=="number"){var _i=self.$items.indexOf(item)
if(_i==-1){throw _b_.KeyError.$factory(item)}
self.$items.splice(_i,1)
if(typeof item=="number"){self.$numbers.splice(self.$numbers.indexOf(item),1)}
return $N}
var hash=_b_.hash(item)
if(self.$hashes[hash]){
for(var i=0,len=self.$items.length;i < len;i++){if($B.rich_comp("__eq__",self.$items[i],item)){self.$items.splice(i,1)
if(item instanceof Number){self.$numbers.splice(self.$numbers.indexOf(item.valueOf()),1)}
break}}
for(var i=0,len=self.$hashes[hash].length;i < len;i++){if($B.rich_comp("__eq__",self.$hashes[hash][i],item)){self.$hashes[hash].splice(i,1)
break}}
return $N}
throw _b_.KeyError.$factory(item)}
set.symmetric_difference_update=function(self,s){
var $=$B.args("symmetric_difference_update",2,{self:null,s:null},["self","s"],arguments,{},null,null),self=$.self,s=$.s
var _next=_b_.getattr($B.$iter(s),"__next__"),item,remove=[],add=[]
while(true){try{item=_next()
var _type=typeof item
if(_type=="string" ||_type=="number"){var _index=self.$items.indexOf(item)
if(_index >-1){remove.push(_index)}else{add.push(item)}}else{var found=false
for(var j=0;! found && j < self.$items.length;j++){if($B.rich_comp("__eq__",self.$items[j],item)){remove.push(j)
found=true}}
if(! found){add.push(item)}}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}
remove.sort(function(x,y){return x-y}).reverse()
for(var i=0;i < remove.length;i++){if(remove[i]!=remove[i-1]){self.$items.splice(remove[i],1)}}
for(var i=0;i < add.length;i++){set.add(self,add[i])}
return $N}
set.update=function(self){
var $=$B.args("update",1,{self:null},["self"],arguments,{},"args",null)
for(var i=0;i < $.args.length;i++){var other=set.$factory($.args[i])
for(var j=0,_len=other.$items.length;j < _len;j++){$add(self,other.$items[j])}}
return $N}
set.difference=function(){var $=$B.args("difference",1,{self:null},["self"],arguments,{},"args",null)
if($.args.length==0){return set.copy($.self)}
var res=clone($.self)
for(var i=0;i < $.args.length;i++){res=set.__sub__(res,set.$factory($.args[i]),true)}
return res}
var fc=set.difference+"" 
eval("set.intersection = "+
fc.replace(/difference/g,"intersection").replace("__sub__","__and__"))
eval("set.symmetric_difference = "+
fc.replace(/difference/g,"symmetric_difference").replace("__sub__","__xor__"))
eval("set.union = "+
fc.replace(/difference/g,"union").replace("__sub__","__or__"))
set.issubset=function(){var $=$B.args("issubset",2,{self:null,other:null},["self","other"],arguments,{},"args",null),func=_b_.getattr($.other,"__contains__")
for(var i=0,len=$.self.$items.length;i < len;i++){if(! func($.self.$items[i])){return false}}
return true}
set.issuperset=function(){var $=$B.args("issuperset",2,{self:null,other:null},["self","other"],arguments,{},"args",null)
var func=_b_.getattr($.self,"__contains__"),it=$B.$iter($.other)
while(true){try{var item=_b_.next(it)
if(! func(item)){return false}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){return true}
throw err}}
return true}
function $accept_only_set(f,op){return function(self,other,accept_iter){$test(accept_iter,other,op)
f(self,other)
return self}}
set.__iand__=$accept_only_set(set.intersection_update,"&=")
set.__isub__=$accept_only_set(set.difference_update,"-=")
set.__ixor__=$accept_only_set(set.symmetric_difference_update,"^=")
set.__ior__=$accept_only_set(set.update,"|=")
set.$factory=function(){
var res={__class__:set,$simple:true,$items:[],$numbers:[],$hashes:{}}
var args=[res].concat(Array.prototype.slice.call(arguments))
set.__init__.apply(null,args)
return res}
$B.set_func_names(set,"builtins")
set.__class_getitem__=_b_.classmethod.$factory(set.__class_getitem__)
var frozenset={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"frozenset"},$is_class:true,$native:true}
for(var attr in set){switch(attr){case "add":
case "clear":
case "discard":
case "pop":
case "remove":
case "update":
break
default:
if(frozenset[attr]==undefined){if(typeof set[attr]=="function"){frozenset[attr]=(function(x){return function(){return set[x].apply(null,arguments)}})(attr)}else{frozenset[attr]=set[attr]}}}}
frozenset.__hash__=function(self){if(self===undefined){return frozenset.__hashvalue__ ||$B.$py_next_hash--}
if(self.__hashvalue__ !==undefined){return self.__hashvalue__}
var _hash=1927868237
_hash*=self.$items.length
for(var i=0,len=self.$items.length;i < len;i++){var _h=_b_.hash(self.$items[i])
_hash ^=((_h ^ 89869747)^(_h << 16))*3644798167}
_hash=_hash*69069+907133923
if(_hash==-1){_hash=590923713}
return self.__hashvalue__=_hash}
frozenset.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory(
"frozenset.__new__(): not enough arguments")}
return{
__class__:cls,$simple:true,$items:[],$numbers:[],$hashes:{}}}
frozenset.__repr__=function(self){$B.builtins_repr_check(frozenset,arguments)
return set_repr(self)}
var singleton_id=Math.floor(Math.random()*Math.pow(2,40))
function empty_frozenset(){var res=frozenset.__new__(frozenset)
res.$id=singleton_id
return res}
frozenset.$factory=function(){var $=$B.args("frozenset",1,{iterable:null},["iterable"],arguments,{iterable:null},null,null)
if($.iterable===null){return empty_frozenset()}
else if($.iterable.__class__==frozenset){return $.iterable}
var res=set.$factory($.iterable)
if(res.$items.length==0){return empty_frozenset()}
res.__class__=frozenset
return res}
$B.set_func_names(frozenset,"builtins")
_b_.set=set
_b_.frozenset=frozenset})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
var object=_b_.object
var _window=self;
function to_simple(value){switch(typeof value){case 'string':
case 'number':
return value
case 'boolean':
return value ? "true" :"false"
case 'object':
if(value===_b_.None){return 'null'}else if(value instanceof Number){return value.valueOf()}
default:
console.log("erreur",value)
throw _b_.TypeError.$factory("keys must be str, int, "+
"float, bool or None, not "+$B.class_name(value))}}
$B.pyobj2structuredclone=function(obj,strict){
strict=strict===undefined ? true :strict
if(typeof obj=="boolean" ||typeof obj=="number" ||
typeof obj=="string"){return obj}else if(obj instanceof Number){return obj.valueOf()}else if(obj===_b_.None){return null }else if(Array.isArray(obj)||obj.__class__===_b_.list ||
obj.__class__===_b_.tuple){var res=[]
for(var i=0,len=obj.length;i < len;i++){res.push($B.pyobj2structuredclone(obj[i]))}
return res}else if(_b_.isinstance(obj,_b_.dict)){if(strict){if(Object.keys(obj.$numeric_dict).length > 0 ||
Object.keys(obj.$object_dict).length > 0){throw _b_.TypeError.$factory("a dictionary with non-string "+
"keys does not support structured clone")}}
var items=$B.dict_to_list(obj),res={}
for(var i=0,len=items.length;i < len;i++){res[to_simple(items[i][0])]=$B.pyobj2structuredclone(items[i][1])}
return res}else{return obj}}
$B.structuredclone2pyobj=function(obj){if(obj===null){return _b_.None}else if(obj===undefined){return $B.Undefined}else if(typeof obj=="boolean" ||typeof obj=="number" ||
typeof obj=="string"){return obj}else if(obj instanceof Number){return obj.valueOf()}else if(Array.isArray(obj)||obj.__class__===_b_.list ||
obj.__class__===_b_.tuple){var res=_b_.list.$factory()
for(var i=0,len=obj.length;i < len;i++){res.push($B.structuredclone2pyobj(obj[i]))}
return res}else if(typeof obj=="object"){var res=$B.empty_dict()
for(var key in obj){_b_.dict.$setitem(res,key,$B.structuredclone2pyobj(obj[key]))}
return res}else{console.log(obj,Array.isArray(obj),obj.__class__,_b_.list,obj.__class__===_b_.list)
throw _b_.TypeError.$factory(_b_.str.$factory(obj)+
" does not support the structured clone algorithm")}}
var JSConstructor={__class__:_b_.type,__mro__:[object],$infos:{__module__:"<javascript>",__name__:'JSConstructor'},$is_class:true}
JSConstructor.__call__=function(self){
return function(){var args=[null]
for(var i=0,len=arguments.length;i < len;i++){args.push(pyobj2jsobj(arguments[i]))}
var factory=self.func.bind.apply(self.func,args)
var res=new factory()
return $B.$JS2Py(res)}}
JSConstructor.__getattribute__=function(self,attr){
if(attr=="__call__"){return function(){var args=[null]
for(var i=0,len=arguments.length;i < len;i++){args.push(pyobj2jsobj(arguments[i]))}
var factory=self.func.bind.apply(self.func,args)
var res=new factory()
return $B.$JS2Py(res)}}
return JSObject.__getattribute__(self,attr)}
JSConstructor.$factory=function(obj){return{
__class__:JSConstructor,js:obj,func:obj.js_func}}
var jsobj2pyobj=$B.jsobj2pyobj=function(jsobj){switch(jsobj){case true:
case false:
return jsobj}
if(jsobj===undefined){return $B.Undefined}
else if(jsobj===null){return _b_.None}
if(Array.isArray(jsobj)){return _b_.list.$factory(jsobj.map(jsobj2pyobj))}
if(typeof jsobj==='number'){if(jsobj.toString().indexOf('.')==-1){return _b_.int.$factory(jsobj)}
return _b_.float.$factory(jsobj)}
if(typeof jsobj=="function"){
return function(){var args=[]
for(var i=0,len=arguments.length;i < len;i++){args.push(pyobj2jsobj(arguments[i]))}
return jsobj2pyobj(jsobj.apply(null,args))}}
if(jsobj.$nat==='kw'){return jsobj}
if($B.$isNode(jsobj)){return $B.DOMNode.$factory(jsobj)}
return $B.JSObj.$factory(jsobj)}
var pyobj2jsobj=$B.pyobj2jsobj=function(pyobj){
if(pyobj===true ||pyobj===false){return pyobj}
if(pyobj===_b_.None){return null}
if(pyobj===$B.Undefined){return undefined}
var klass=$B.get_class(pyobj)
if(klass===undefined){
return pyobj;}
if(klass===JSConstructor){
if(pyobj.js_func !==undefined){return pyobj.js_func}
return pyobj.js}else if(klass===$B.DOMNode ||
klass.__mro__.indexOf($B.DOMNode)>-1){
return pyobj}else if([_b_.list,_b_.tuple].indexOf(klass)>-1){
var res=[]
pyobj.forEach(function(item){res.push(pyobj2jsobj(item))})
return res}else if(klass===_b_.dict ||_b_.issubclass(klass,_b_.dict)){
var jsobj={}
var items=_b_.list.$factory(_b_.dict.items(pyobj))
items.forEach(function(item){if(typeof item[1]=='function'){
item[1].bind(jsobj)}
jsobj[item[0]]=pyobj2jsobj(item[1])})
return jsobj}else if(klass===_b_.float){
return pyobj.valueOf()}else if(klass===$B.Function ||klass===$B.method){
if(pyobj.prototype &&
pyobj.prototype.constructor===pyobj &&
! pyobj.$is_func){
return pyobj}
return function(){try{var args=[]
for(var i=0;i < arguments.length;i++){if(arguments[i]===undefined){args.push(_b_.None)}
else{args.push(jsobj2pyobj(arguments[i]))}}
if(pyobj.prototype.constructor===pyobj && ! pyobj.$is_func){var res=new pyobj(...args)}else{var res=pyobj.apply(this,args)}
return pyobj2jsobj(res)}catch(err){console.log(err)
console.log($B.$getattr(err,'info'))
console.log($B.class_name(err)+':',err.args.length > 0 ? err.args[0]:'' )
throw err}}}else{
return pyobj}}
$B.JSConstructor=JSConstructor
function pyargs2jsargs(pyargs){var args=[]
for(var i=0,len=pyargs.length;i < len;i++){var arg=pyargs[i]
if(arg !==undefined && arg !==null &&
arg.$nat !==undefined){var kw=arg.kw
if(Array.isArray(kw)){kw=$B.extend(js_attr.name,...kw)}
if(Object.keys(kw).length > 0){
throw _b_.TypeError.$factory(
"A Javascript function can't take "+
"keyword arguments")}}else{args.push($B.pyobj2jsobj(arg))}}
return args}
$B.JSObj=$B.make_class("JSObj",function(jsobj){if(Array.isArray(jsobj)){}else if(typeof jsobj=="function"){jsobj.$is_js_func=true
jsobj.__new__=function(){return new jsobj.$js_func(...arguments)}}else if(typeof jsobj=="number" && ! Number.isInteger(jsobj)){return new Number(jsobj)}
return jsobj}
)
$B.JSObj.__sub__=function(self,other){
if(typeof self=="bigint" && typeof other=="bigint"){return self-other}
throw _b_.TypeError.$factory("unsupported operand type(s) for - : '"+
$B.class_name(self)+"' and '"+$B.class_name(other)+"'")}
var ops={'+':'__add__','*':'__mul__','**':'__pow__','%' :'__mod__'}
for(var op in ops){eval('$B.JSObj.'+ops[op]+' = '+
($B.JSObj.__sub__+'').replace(/-/g,op))}
$B.JSObj.__eq__=function(self,other){switch(typeof self){case "object":
if(Object.keys(self).length !==Object.keys(other).length){return false}
for(var key in self){if(! $B.JSObj.__eq__(self[key],other[key])){return false}}
default:
return self===other}}
$B.JSObj.__ne__=function(self,other){return ! $B.JSObj.__eq__(self,other)}
$B.JSObj.__getattribute__=function(self,attr){var test=false 
if(test){console.log("__ga__",self,attr)}
if(attr=="$$new" && typeof self=="function"){
if(self.$js_func){return function(){var args=pyargs2jsargs(arguments)
return $B.JSObj.$factory(new self.$js_func(...args))}}else{return function(){var args=pyargs2jsargs(arguments)
return $B.JSObj.$factory(new self(...args))}}}
if(typeof attr=="string"){attr=$B.from_alias(attr)}
var js_attr=self[attr]
if(js_attr==undefined && typeof self=="function" && self.$js_func){js_attr=self.$js_func[attr]}
if(js_attr===undefined){if(typeof self.getNamedItem=='function'){var res=self.getNamedItem(attr)
if(res !==undefined){return $B.JSObj.$factory(res)}}
var klass=$B.get_class(self)
if(klass && klass[attr]){var class_attr=klass[attr]
if(typeof class_attr=="function"){return function(){var args=[self]
for(var i=0,len=arguments.length;i < len;i++){args.push(arguments[i])}
return $B.JSObj.$factory(class_attr.apply(null,args))}}else{return class_attr}}
if(attr=="bind" && typeof self.addEventListener=="function"){return function(event,callback){return self.addEventListener(event,callback)}}
throw _b_.AttributeError.$factory(attr)}
if(typeof js_attr==='function'){var res=function(){var args=pyargs2jsargs(arguments),target=self.$js_func ||self
try{var result=js_attr.apply(target,args)}catch(err){console.log("error",err)
console.log("attribute",attr,"of self",self,js_attr,args,arguments)
throw err}
if(result===undefined){return $B.Undefined}else if(result===null){return _b_.None}
return $B.JSObj.$factory(result)}
res.prototype=js_attr.prototype
res.$js_func=js_attr
res.__mro__=[_b_.object]
res.$infos={__name__:js_attr.name,__qualname__:js_attr.name}
if($B.frames_stack.length > 0){res.$infos.__module__=$B.last($B.frames_stack)[3].__name__}
return $B.JSObj.$factory(res)}else{return $B.JSObj.$factory(js_attr)}}
$B.JSObj.__setattr__=function(self,attr,value){if(typeof attr=="string"){attr=$B.from_alias(attr)}
self[attr]=$B.pyobj2structuredclone(value)
return _b_.None}
$B.JSObj.__getitem__=function(self,key){if(typeof key=="string"){return $B.JSObj.__getattribute__(self,key)}else if(typeof key=="number"){if(self[key]!==undefined){return $B.JSObj.$factory(self[key])}
if(typeof self.length=='number'){if((typeof key=="number" ||typeof key=="boolean")&&
typeof self.item=='function'){var rank=_b_.int.$factory(key)
if(rank < 0){rank+=self.length}
var res=self.item(rank)
if(res===null){throw _b_.IndexError.$factory(rank)}
return $B.JSObj.$factory(res)}}}
throw _b_.KeyError.$factory(rank)}
$B.JSObj.__setitem__=$B.JSObj.__setattr__
var JSObj_iterator=$B.make_iterator_class('JS object iterator')
$B.JSObj.__iter__=function(self){var items=[]
if(_window.Symbol && self[Symbol.iterator]!==undefined){
var items=[]
if(self.next !==undefined){while(true){var nxt=self.next()
if(nxt.done){break}
items.push($B.JSObj.$factory(nxt.value))}}else if(self.length !==undefined && self.item !==undefined){for(var i=0;i < self.length;i++){items.push($B.JSObj.$factory(self.item(i)))}}
return JSObj_iterator.$factory(items)}else if(self.length !==undefined && self.item !==undefined){
for(var i=0;i < self.length;i++){items.push($B.JSObj.$factory(self.js.item(i)))}
return JSObj_iterator.$factory(items)}
return JSObj_iterator.$factory(Object.keys(self))}
$B.JSObj.__len__=function(self){if(typeof self.length=='number'){return self.length}
throw _b_.AttributeError.$factory(self+' has no attribute __len__')}
$B.JSObj.__repr__=$B.JSObj.__str__=function(self){return '<Javascript '+self.constructor.name+' object: '+
self.toString()+'>'}
$B.JSObj.bind=function(self,evt,func){
var js_func=function(ev){return func(jsobj2pyobj(ev))}
self.addEventListener(evt,js_func)
return _b_.None}
$B.JSObj.to_dict=function(self){
return $B.structuredclone2pyobj(self)}
$B.set_func_names($B.JSObj,"builtins")
$B.JSMeta=$B.make_class("JSMeta")
$B.JSMeta.__call__=function(cls){
var extra_args=[],klass=arguments[0]
for(var i=1,len=arguments.length;i < len;i++){extra_args.push(arguments[i])}
var new_func=_b_.type.__getattribute__(klass,"__new__")
var instance=new_func.apply(null,arguments)
if(instance instanceof cls.__mro__[0].$js_func){
var init_func=_b_.type.__getattribute__(klass,"__init__")
if(init_func !==_b_.object.__init__){
var args=[instance].concat(extra_args)
init_func.apply(null,args)}}
return instance}
$B.JSMeta.__mro__=[_b_.type,_b_.object]
$B.JSMeta.__getattribute__=function(cls,attr){if(cls[attr]!==undefined){return cls[attr]}else if($B.JSMeta[attr]!==undefined){return $B.JSMeta[attr]}else{
return _b_.type.__getattribute__(cls,attr)}}
$B.JSMeta.__init_subclass__=function(){}
$B.JSMeta.__new__=function(metaclass,class_name,bases,cl_dict){
eval("var "+class_name+` = function(){
        if(cl_dict.$string_dict.__init__){
            var args = [this]
            for(var i = 0, len = arguments.length; i < len; i++){
                args.push(arguments[i])
            }
            cl_dict.$string_dict.__init__[0].apply(this, args)
        }else{
            return new bases[0].$js_func(...arguments)
        }
    }`)
var new_js_class=eval(class_name)
new_js_class.prototype=Object.create(bases[0].$js_func.prototype)
new_js_class.prototype.constructor=new_js_class
new_js_class.__mro__=[bases[0],_b_.type]
new_js_class.$is_js_class=true
return new_js_class}
$B.set_func_names($B.JSMeta,"builtins")})(__BRYTHON__)
;
;(function($B){$B.stdlib={}
var pylist=['VFS_import','__future__','_codecs','_codecs_jp','_collections','_collections_abc','_compat_pickle','_contextvars','_csv','_dummy_thread','_frozen_importlib','_functools','_imp','_io','_markupbase','_multibytecodec','_operator','_py_abc','_pydecimal','_queue','_random','_socket','_sre','_struct','_sysconfigdata','_sysconfigdata_0_brython_','_testcapi','_thread','_threading_local','_weakref','_weakrefset','abc','antigravity','argparse','atexit','base64','bdb','binascii','bisect','browser.aio','browser.ajax','browser.highlight','browser.html','browser.indexed_db','browser.local_storage','browser.markdown','browser.object_storage','browser.session_storage','browser.svg','browser.template','browser.timer','browser.webcomponent','browser.websocket','browser.webworker','browser.worker','calendar','cmath','cmd','code','codecs','codeop','colorsys','configparser','contextlib','contextvars','copy','copyreg','csv','dataclasses','datetime','decimal','difflib','doctest','enum','errno','external_import','faulthandler','fnmatch','formatter','fractions','functools','gc','genericpath','getopt','gettext','glob','heapq','hmac','imp','inspect','interpreter','io','ipaddress','itertools','json','keyword','linecache','locale','mimetypes','nntplib','ntpath','numbers','opcode','operator','optparse','os','pathlib','pdb','pickle','pkgutil','platform','posixpath','pprint','profile','pwd','py_compile','pydoc','queue','quopri','re','reprlib','select','selectors','shlex','shutil','signal','site','site-packages.__future__','site-packages.docs','site-packages.header','site-packages.test_sp','socket','sre_compile','sre_constants','sre_parse','stat','string','stringprep','struct','subprocess','sys','sysconfig','tarfile','tb','tempfile','test.namespace_pkgs.module_and_namespace_package.a_test','textwrap','this','threading','time','timeit','token','tokenize','traceback','turtle','types','typing','uu','uuid','warnings','weakref','webbrowser','zipfile','zipimport','zlib']
for(var i=0;i < pylist.length;i++){$B.stdlib[pylist[i]]=['py']}
var js=['_aio','_ajax','_ajax_nevez','_base64','_binascii','_io_classes','_json','_jsre','_locale','_multiprocessing','_posixsubprocess','_profile','_sreXXX','_sre_utils','_string','_strptime','_svg','_webcomponent','_webworker','_zlib_utils','aes','array','bry_re','builtins','dis','encoding_cp932','hashlib','hmac-md5','hmac-ripemd160','hmac-sha1','hmac-sha224','hmac-sha256','hmac-sha3','hmac-sha384','hmac-sha512','html_parser','long_int','marshal','math','md5','modulefinder','pbkdf2','posix','python_re','python_re_backtrack_choice','python_re_v5','rabbit','rabbit-legacy','random','rc4','ripemd160','sha1','sha224','sha256','sha3','sha384','sha512','tripledes','unicodedata']
for(var i=0;i < js.length;i++){$B.stdlib[js[i]]=['js']}
var pkglist=['browser.widgets','collections','concurrent','concurrent.futures','email','email.mime','encodings','html','http','importlib','logging','multiprocessing','multiprocessing.dummy','pydoc_data','site-packages.foobar','site-packages.simpleaio','site-packages.ui','test','test.encoded_modules','test.leakers','test.namespace_pkgs.not_a_namespace_pkg.foo','test.support','test.test_email','test.test_importlib','test.test_importlib.builtin','test.test_importlib.extension','test.test_importlib.frozen','test.test_importlib.import_','test.test_importlib.source','test.test_json','test.tracedmodules','unittest','unittest.test','unittest.test.testmock','urllib']
for(var i=0;i < pkglist.length;i++){$B.stdlib[pkglist[i]]=['py',true]}})(__BRYTHON__)
;

;(function($B){var _b_=$B.builtins,_window=self
var Module=$B.module=$B.make_class("module",function(name,doc,$package){return{
__class__:Module,__name__:name,__doc__:doc ||_b_.None,__package__:$package ||_b_.None}}
)
Module.__new__=function(cls,name,doc,$package){return{
__class__:cls,__name__:name,__doc__:doc ||_b_.None,__package__:$package ||_b_.None}}
Module.__repr__=Module.__str__=function(self){var res="<module "+self.__name__
if(self.__file__===undefined){res+=" (built-in)"}
return res+">"}
Module.__setattr__=function(self,attr,value){if(self.__name__=="__builtins__"){
$B.builtins[attr]=value}else{self[attr]=value}}
$B.set_func_names(Module,"builtins")
function $download_module(mod,url,$package){var xhr=new XMLHttpRequest(),fake_qs="?v="+(new Date().getTime()),res=null,mod_name=mod.__name__
var timer=_window.setTimeout(function(){xhr.abort()},5000)
if($B.$options.cache){xhr.open("GET",url,false)}else{xhr.open("GET",url+fake_qs,false)}
xhr.send()
if($B.$CORS){if(xhr.status==200 ||xhr.status==0){res=xhr.responseText}else{res=_b_.ModuleNotFoundError.$factory("No module named '"+
mod_name+"'")}}else{if(xhr.readyState==4){if(xhr.status==200){res=xhr.responseText
mod.$last_modified=
xhr.getResponseHeader("Last-Modified")}else{
console.info("Error "+xhr.status+
" means that Python module "+mod_name+
" was not found at url "+url)
res=_b_.ModuleNotFoundError.$factory("No module named '"+
mod_name+"'")}}}
_window.clearTimeout(timer)
if(res==null){throw _b_.ModuleNotFoundError.$factory("No module named '"+
mod_name+"' (res is null)")}
if(res.constructor===Error){throw res}
return res}
$B.$download_module=$download_module
function import_js(mod,path){try{var module_contents=$download_module(mod,path,undefined)}catch(err){return null}
run_js(module_contents,path,mod)
return true}
function run_js(module_contents,path,_module){
var module_id="$locals_"+_module.__name__.replace(/\./g,'_')
try{var $module=new Function(module_id,module_contents+";\nreturn $module")(_module)
if($B.$options.store){_module.$js=module_contents}}catch(err){console.log(err)
console.log(path,_module)
throw err}
try{$module}
catch(err){console.log("no $module")
throw _b_.ImportError.$factory("name '$module' not defined in module")}
$module.__name__=_module.__name__
for(var attr in $module){if(typeof $module[attr]=="function"){$module[attr].$infos={__module__:_module.__name__,__name__:$B.from_alias(attr),__qualname__:$B.from_alias(attr)}
$module[attr].$in_js_module=true}}
if(_module !==undefined){
for(var attr in $module){_module[attr]=$module[attr]}
$module=_module
$module.__class__=Module }else{
$module.__class__=Module
$module.__name__=_module.__name__
$module.__repr__=$module.__str__=function(){if($B.builtin_module_names.indexOf(_module.name)>-1){return "<module '"+_module.__name__+"' (built-in)>"}
return "<module '"+_module.__name__+"' from "+path+" >"}
if(_module.name !="builtins"){
$module.__file__=path}}
$B.imported[_module.__name__]=$module
return true}
function show_ns(){var kk=Object.keys(_window)
for(var i=0,len=kk.length;i < len;i++){console.log(kk[i])
if(kk[i].charAt(0)=="$"){console.log(eval(kk[i]))}}
console.log("---")}
function run_py(module_contents,path,module,compiled){
$B.file_cache[path]=module_contents
var root,js,mod_name=module.__name__ 
if(! compiled){var $Node=$B.$Node,$NodeJSCtx=$B.$NodeJSCtx
$B.$py_module_path[module.__name__]=path
var src={src:module_contents,has_annotations:false}
root=$B.py2js(src,module,module.__name__,$B.builtins_scope)
if(module.__package__ !==undefined){root.binding["__package__"]=true}}
try{js=compiled ? module_contents :root.to_js()
if($B.$options.debug==10){console.log("code for module "+module.__name__)
console.log(js)}
var src=js
js="var $module = (function(){\n"+js+"return $locals_"+
module.__name__.replace(/\./g,"_")+"})(__BRYTHON__)\n"+
"return $module"
var module_id="$locals_"+module.__name__.replace(/\./g,'_')
var $module=(new Function(module_id,js))(module)}catch(err){if($B.debug > 1){console.log(err+" for module "+module.__name__)
console.log("module",module)
console.log(root)
if($B.debug > 1){console.log(js)}
for(var attr in err){console.log(attr,err[attr])}
console.log($B.$getattr(err,"info","[no info]"))
console.log("message: "+err.$message)
console.log("filename: "+err.fileName)
console.log("linenum: "+err.lineNumber)}
if($B.debug > 0){console.log("line info "+$B.line_info)}
throw err}finally{$B.clear_ns(module.__name__)}
try{
var mod=eval("$module")
for(var attr in mod){module[attr]=mod[attr]}
module.__initializing__=false
$B.imported[module.__name__]=module
return{
content:src,name:mod_name,imports:Object.keys(root.imports).join(",")}}catch(err){console.log(""+err+" "+" for module "+module.__name__)
for(var attr in err){console.log(attr+" "+err[attr])}
if($B.debug > 0){console.log("line info "+__BRYTHON__.line_info)}
throw err}}
$B.run_py=run_py 
$B.run_js=run_js
var ModuleSpec=$B.make_class("ModuleSpec",function(fields){fields.__class__=ModuleSpec
return fields}
)
ModuleSpec.__str__=ModuleSpec.__repr__=function(self){var res=`ModuleSpec(name='${self.name}', `+
`loader=${_b_.str.$factory(self.loader)}, `+
`origin='${self.origin}'`
if(self.submodule_search_locations !==_b_.None){res+=`, submodule_search_locations=`+
`${_b_.str.$factory(self.submodule_search_locations)}`}
return res+')'}
$B.set_func_names(ModuleSpec,"builtins")
function parent_package(mod_name){
var parts=mod_name.split(".")
parts.pop()
return parts.join(".")}
var VFSFinder=$B.make_class("VFSFinder",function(){return{
__class__:VFSFinder}}
)
VFSFinder.find_spec=function(cls,fullname,path){var stored,is_package,timestamp
if(!$B.use_VFS){return _b_.None}
stored=$B.VFS[fullname]
if(stored===undefined){return _b_.None}
is_package=stored[3]||false
timestamp=stored.timestamp
if(stored){var is_builtin=$B.builtin_module_names.indexOf(fullname)>-1
return ModuleSpec.$factory({name :fullname,loader:VFSLoader.$factory(),
origin :is_builtin? "built-in" :"brython_stdlib",
submodule_search_locations:is_package?[]:_b_.None,loader_state:{stored:stored,timestamp:timestamp},
cached:_b_.None,parent:is_package? fullname :parent_package(fullname),has_location:_b_.False})}}
$B.set_func_names(VFSFinder,"<import>")
for(var method in VFSFinder){if(typeof VFSFinder[method]=="function"){VFSFinder[method]=_b_.classmethod.$factory(
VFSFinder[method])}}
VFSLoader=$B.make_class("VFSLoader",function(){return{
__class__:VFSLoader}}
)
VFSLoader.create_module=function(self,spec){
return _b_.None}
VFSLoader.exec_module=function(self,modobj){
var stored=modobj.__spec__.loader_state.stored,timestamp=modobj.__spec__.loader_state.timestamp
delete modobj.__spec__["loader_state"]
var ext=stored[0],module_contents=stored[1],imports=stored[2]
modobj.$is_package=stored[3]||false
var path="VFS."+modobj.__name__
path+=modobj.$is_package ? "/__init__.py" :ext
modobj.__file__=path
$B.file_cache[modobj.__file__]=$B.VFS[modobj.__name__][1]
if(ext=='.js'){run_js(module_contents,modobj.__path__,modobj)}else if($B.precompiled.hasOwnProperty(modobj.__name__)){if($B.debug > 1){console.info("load",modobj.__name__,"from precompiled")}
var parts=modobj.__name__.split(".")
for(var i=0;i < parts.length;i++){var parent=parts.slice(0,i+1).join(".")
if($B.imported.hasOwnProperty(parent)&&
$B.imported[parent].__initialized__){continue}
var mod_js=$B.precompiled[parent],is_package=modobj.$is_package
if(mod_js===undefined){
continue}
if(Array.isArray(mod_js)){mod_js=mod_js[0]}
var mod=$B.imported[parent]=Module.$factory(parent,undefined,is_package)
mod.__initialized__=true
if(is_package){mod.__path__="<stdlib>"
mod.__package__=parent}else{var elts=parent.split(".")
elts.pop()
mod.__package__=elts.join(".")}
mod.__file__=path
try{var parent_id=parent.replace(/\./g,"_")
mod_js+="return $locals_"+parent_id
var $module=new Function("$locals_"+parent_id,mod_js)(
mod)}catch(err){if($B.debug > 1){console.log('error in module',mod)
console.log(err)
for(var k in err){console.log(k,err[k])}
console.log(Object.keys($B.imported))
if($B.debug > 2){console.log(modobj,"mod_js",mod_js)}}
throw err}
for(var attr in $module){mod[attr]=$module[attr]}
$module.__file__=path
if(i > 0){
$B.builtins.setattr(
$B.imported[parts.slice(0,i).join(".")],parts[i],$module)}}
return $module}else{var mod_name=modobj.__name__
if($B.debug > 1){console.log("run Python code from VFS",mod_name)}
var record=run_py(module_contents,modobj.__path__,modobj)
record.is_package=modobj.$is_package
record.timestamp=$B.timestamp
record.source_ts=timestamp
$B.precompiled[mod_name]=record.is_package ?[record.content]:
record.content
var elts=mod_name.split(".")
if(elts.length > 1){elts.pop()}
if($B.$options.indexedDB && $B.indexedDB &&
$B.idb_name){
var idb_cx=indexedDB.open($B.idb_name)
idb_cx.onsuccess=function(evt){var db=evt.target.result,tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules"),cursor=store.openCursor(),request=store.put(record)
request.onsuccess=function(){if($B.debug > 1){console.info(modobj.__name__,"stored in db")}}
request.onerror=function(){console.info("could not store "+modobj.__name__)}}}}}
$B.set_func_names(VFSLoader,"builtins")
var finder_cpython={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"CPythonFinder"},create_module :function(cls,spec){
return _b_.None},exec_module :function(cls,modobj){console.log("exec PYthon module",modobj)
var loader_state=modobj.__spec__.loader_state
var content=loader_state.content
delete modobj.__spec__["loader_state"]
modobj.$is_package=loader_state.is_package
modobj.__file__=loader_state.__file__
$B.file_cache[modobj.__file__]=content
var mod_name=modobj.__name__
if($B.debug > 1){console.log("run Python code from CPython",mod_name)}
run_py(content,modobj.__path__,modobj)},find_module:function(cls,name,path){return{
__class__:Loader,load_module:function(name,path){var spec=cls.find_spec(cls,name,path)
var mod=Module.$factory(name)
$B.imported[name]=mod
mod.__spec__=spec
cls.exec_module(cls,mod)}}},find_spec :function(cls,fullname,path){console.log("finder cpython",fullname)
var xhr=new XMLHttpRequest(),url="/cpython_import?module="+fullname,result
xhr.open("GET",url,false)
xhr.onreadystatechange=function(){if(this.readyState==4 && this.status==200){var data=JSON.parse(this.responseText)
result=ModuleSpec.$factory({name :fullname,loader:cls,
origin :"CPython",
submodule_search_locations:data.is_package?[]:_b_.None,loader_state:{content:data.content},
cached:_b_.None,parent:data.is_package? fullname :parent_package(fullname),has_location:_b_.False})}}
xhr.send()
return result}}
$B.set_func_names(finder_cpython,"<import>")
for(var method in finder_cpython){if(typeof finder_cpython[method]=="function"){finder_cpython[method]=_b_.classmethod.$factory(
finder_cpython[method])}}
finder_cpython.$factory=function(){return{__class__:finder_cpython}}
var StdlibStaticFinder=$B.make_class("StdlibStaticFinder",function(){return{
__class__:StdlibStaticFinder}}
)
StdlibStaticFinder.find_spec=function(self,fullname,path){
if($B.stdlib && $B.$options.static_stdlib_import){var address=$B.stdlib[fullname]
if(address===undefined){var elts=fullname.split(".")
if(elts.length > 1){elts.pop()
var $package=$B.stdlib[elts.join(".")]
if($package && $package[1]){address=["py"]}}}
if(address !==undefined){var ext=address[0],is_pkg=address[1]!==undefined,path=$B.brython_path+
((ext=="py")? "Lib/" :"libs/")+
fullname.replace(/\./g,"/"),metadata={ext:ext,is_package:is_pkg,path:path+(is_pkg? "/__init__.py" :
((ext=="py")? ".py" :".js")),address:address},_module=Module.$factory(fullname)
metadata.code=$download_module(_module,metadata.path)
var res=ModuleSpec.$factory({name :fullname,loader:PathLoader.$factory(),
origin :metadata.path,submodule_search_locations:is_pkg?[path]:_b_.None,loader_state:metadata,
cached:_b_.None,parent:is_pkg ? fullname :parent_package(fullname),has_location:_b_.True})
return res}}
return _b_.None}
$B.set_func_names(StdlibStaticFinder,"<import>")
for(var method in StdlibStaticFinder){if(typeof StdlibStaticFinder[method]=="function"){StdlibStaticFinder[method]=_b_.classmethod.$factory(
StdlibStaticFinder[method])}}
StdlibStaticFinder.$factory=function(){return{__class__:StdlibStaticFinder}}
var PathFinder=$B.make_class("PathFinder",function(){return{
__class__:PathFinder}}
)
PathFinder.find_spec=function(cls,fullname,path){if($B.VFS && $B.VFS[fullname]){
return _b_.None}
if($B.is_none(path)){
path=$B.path}
for(var i=0,li=path.length;i < li;++i){var path_entry=path[i]
if(path_entry[path_entry.length-1]!="/"){path_entry+="/"}
var finder=$B.path_importer_cache[path_entry]
if(finder===undefined){
for(var j=0,lj=$B.path_hooks.length;j < lj;++j){var hook=$B.path_hooks[j]
try{finder=$B.$call(hook)(path_entry)
$B.path_importer_cache[path_entry]=finder
break}catch(e){if(e.__class__ !==_b_.ImportError){throw e}}}}
if($B.is_none(finder)){continue}
var find_spec=$B.$getattr(finder,"find_spec"),spec=$B.$call(find_spec)(fullname)
if(!$B.is_none(spec)){return spec}}
return _b_.None}
$B.set_func_names(PathFinder,"<import>")
for(var method in PathFinder){if(typeof PathFinder[method]=="function"){PathFinder[method]=_b_.classmethod.$factory(
PathFinder[method])}}
var PathEntryFinder=$B.make_class("PathEntryFinder",function(path_entry,hint){return{
__class__:PathEntryFinder,path_entry:path_entry,hint:hint}}
)
PathEntryFinder.find_spec=function(self,fullname){
var loader_data={},notfound=true,hint=self.hint,base_path=self.path_entry+fullname.match(/[^.]+$/g)[0],modpaths=[]
var tryall=hint===undefined
if(tryall ||hint=='py'){
modpaths=modpaths.concat([[base_path+".py","py",false],[base_path+"/__init__.py","py",true]])}
for(var j=0;notfound && j < modpaths.length;++j){try{var file_info=modpaths[j],module={__name__:fullname,$is_package:false}
loader_data.code=$download_module(module,file_info[0],undefined)
notfound=false
loader_data.ext=file_info[1]
loader_data.is_package=file_info[2]
if(hint===undefined){self.hint=file_info[1]
$B.path_importer_cache[self.path_entry]=self}
if(loader_data.is_package){
$B.path_importer_cache[base_path+'/']=
$B.$call(url_hook)(base_path+'/',self.hint)}
loader_data.path=file_info[0]}catch(err){if(err.__class__ !==_b_.ModuleNotFoundError){throw err}}}
if(!notfound){return ModuleSpec.$factory({name :fullname,loader:PathLoader.$factory(),origin :loader_data.path,
submodule_search_locations:loader_data.is_package?
[base_path]:_b_.None,loader_state:loader_data,
cached:_b_.None,parent:loader_data.is_package? fullname :
parent_package(fullname),has_location:_b_.True})}
return _b_.None}
$B.set_func_names(PathEntryFinder,"builtins")
var PathLoader=$B.make_class("PathLoader",function(){return{
__class__:PathLoader}}
)
PathLoader.create_module=function(self,spec){
return _b_.None}
PathLoader.exec_module=function(self,module){
var metadata=module.__spec__.loader_state
module.$is_package=metadata.is_package
if(metadata.ext=="py"){run_py(metadata.code,metadata.path,module)}else{run_js(metadata.code,metadata.path,module)}}
var url_hook=$B.url_hook=function(path_entry){
path_entry=path_entry.endsWith("/")? path_entry :path_entry+"/"
return PathEntryFinder.$factory(path_entry)}
function import_engine(mod_name,_path,from_stdlib){
var meta_path=$B.meta_path.slice(),_sys_modules=$B.imported,_loader,spec
if(from_stdlib){
var path_ix=meta_path.indexOf($B.finders["path"])
if(path_ix >-1){meta_path.splice(path_ix,1)}}
for(var i=0,len=meta_path.length;i < len;i++){var _finder=meta_path[i],find_spec=$B.$getattr(_finder,"find_spec",_b_.None)
if(find_spec==_b_.None){
var find_module=$B.$getattr(_finder,"find_module",_b_.None)
if(find_module !==_b_.None){_loader=find_module(mod_name,_path)
if(_loader !==_b_.None){
var load_module=$B.$getattr(_loader,"load_module"),module=$B.$call(load_module)(mod_name)
_sys_modules[mod_name]=module
return module}}}else{spec=find_spec(mod_name,_path)
if(!$B.is_none(spec)){module=$B.imported[spec.name]
if(module !==undefined){
return _sys_modules[spec.name]=module}
_loader=$B.$getattr(spec,"loader",_b_.None)
break}}}
if(_loader===undefined){
message=mod_name
if($B.protocol=="file"){message+=" (warning: cannot import local files with protocol 'file')"}
var exc=_b_.ModuleNotFoundError.$factory(message)
exc.name=mod_name
throw exc}
if($B.is_none(module)){if(spec===_b_.None){throw _b_.ModuleNotFoundError.$factory(mod_name)}
var _spec_name=$B.$getattr(spec,"name")
if(!$B.is_none(_loader)){var create_module=$B.$getattr(_loader,"create_module",_b_.None)
if(!$B.is_none(create_module)){module=$B.$call(create_module)(spec)}}
if(module===undefined){throw _b_.ImportError.$factory(mod_name)}
if($B.is_none(module)){
module=$B.module.$factory(mod_name)
var mod_desc=$B.$getattr(spec,"origin")
if($B.$getattr(spec,"has_location")){mod_desc="from '"+mod_desc+"'"}else{mod_desc="("+mod_desc+")"}}}
module.__name__=_spec_name
module.__loader__=_loader
module.__package__=$B.$getattr(spec,"parent","")
module.__spec__=spec
var locs=$B.$getattr(spec,"submodule_search_locations")
if(module.$is_package=!$B.is_none(locs)){module.__path__=locs}
if($B.$getattr(spec,"has_location")){module.__file__=$B.$getattr(spec,"origin")
$B.$py_module_path[module.__name__]=module.__file__}
var cached=$B.$getattr(spec,"cached")
if(! $B.is_none(cached)){module.__cached__=cached}
if($B.is_none(_loader)){if(!$B.is_none(locs)){_sys_modules[_spec_name]=module}else{throw _b_.ImportError.$factory(mod_name)}}else{var exec_module=$B.$getattr(_loader,"exec_module",_b_.None)
if($B.is_none(exec_module)){
module=$B.$getattr(_loader,"load_module")(_spec_name)}else{_sys_modules[_spec_name]=module
try{exec_module(module)}catch(e){delete _sys_modules[_spec_name]
throw e}}}
return _sys_modules[_spec_name]}
$B.path_importer_cache={}
function import_error(mod_name){var exc=_b_.ImportError.$factory(mod_name)
exc.name=mod_name
throw exc}
$B.$__import__=function(mod_name,globals,locals,fromlist,level){var $test=false 
if($test){console.log("__import__",mod_name)}
var from_stdlib=false
if(globals.$jsobj && globals.$jsobj.__file__){var file=globals.$jsobj.__file__
if((file.startsWith($B.brython_path+"Lib/")&&
! file.startsWith($B.brython_path+"Lib/site-packages/"))||
file.startsWith($B.brython_path+"libs/")||
file.startsWith("VFS.")){from_stdlib=true}}
var modobj=$B.imported[mod_name],parsed_name=mod_name.split('.'),has_from=fromlist.length > 0
if(modobj==_b_.None){
import_error(mod_name)}
if(modobj===undefined){
if($B.is_none(fromlist)){fromlist=[]}
for(var i=0,modsep="",_mod_name="",len=parsed_name.length-1,__path__=_b_.None;i <=len;++i){var _parent_name=_mod_name;
_mod_name+=modsep+parsed_name[i]
modsep="."
var modobj=$B.imported[_mod_name]
if($test){console.log("iter",i,_mod_name,"modobj",modobj,"__path__",__path__,Array.isArray(__path__))
alert()}
if(modobj==_b_.None){
import_error(_mod_name)}else if(modobj===undefined){try{import_engine(_mod_name,__path__,from_stdlib)}catch(err){delete $B.imported[_mod_name]
throw err}
if($B.is_none($B.imported[_mod_name])){import_error(_mod_name)}else{
if(_parent_name){_b_.setattr($B.imported[_parent_name],parsed_name[i],$B.imported[_mod_name])}}}else if($B.imported[_parent_name]&&
$B.imported[_parent_name][parsed_name[i]]===undefined){
_b_.setattr($B.imported[_parent_name],parsed_name[i],$B.imported[_mod_name])}
if(i < len){try{__path__=$B.$getattr($B.imported[_mod_name],"__path__")}catch(e){
if(i==len-1 &&
$B.imported[_mod_name][parsed_name[len]]&&
$B.imported[_mod_name][parsed_name[len]].__class__===
module){return $B.imported[_mod_name][parsed_name[len]]}
if(has_from){
import_error(mod_name)}else{
var exc=_b_.ModuleNotFoundError.$factory()
exc.msg="No module named '"+mod_name+"'; '"+
_mod_name+"' is not a package"
exc.args=$B.fast_tuple([exc.msg])
exc.name=mod_name
exc.path=_b_.None
throw exc}}}}}else{if($B.imported[parsed_name[0]]&&
parsed_name.length==2){try{if($B.imported[parsed_name[0]][parsed_name[1]]===undefined){$B.$setattr($B.imported[parsed_name[0]],parsed_name[1],modobj)}}catch(err){console.log("error",parsed_name,modobj)
throw err}}}
if(fromlist.length > 0){
return $B.imported[mod_name]}else{
return $B.imported[parsed_name[0]]}}
$B.$import=function(mod_name,fromlist,aliases,locals){
fromlist=fromlist===undefined ?[]:fromlist
aliases=aliases===undefined ?{}:aliases
locals=locals===undefined ?{}:locals
var parts=mod_name.split(".")
if(mod_name[mod_name.length-1]=="."){parts.pop()}
var norm_parts=[],prefix=true
for(var i=0,len=parts.length;i < len;i++){var p=parts[i]
if(prefix && p==""){
elt=norm_parts.pop()
if(elt===undefined){throw _b_.ImportError.$factory("Parent module '' not loaded, "+
"cannot perform relative import")}}else{prefix=false;
norm_parts.push(p.substr(0,2)=="$$" ? p.substr(2):p)}}
var mod_name=norm_parts.join(".")
if($B.$options.debug==10){console.log("$import "+mod_name)
console.log("use VFS ? "+$B.use_VFS)
console.log("use static stdlib paths ? "+$B.static_stdlib_import)}
var current_frame=$B.frames_stack[$B.frames_stack.length-1],_globals=current_frame[3],__import__=_globals["__import__"],globals=$B.obj_dict(_globals)
if(__import__===undefined){
__import__=$B.$__import__}
var importer=typeof __import__=="function" ?
__import__ :
$B.$getattr(__import__,"__call__"),modobj=importer(mod_name,globals,undefined,fromlist,0)
if(! fromlist ||fromlist.length==0){
var alias=aliases[mod_name]
if(alias){locals[alias]=$B.imported[mod_name]}else{locals[$B.to_alias(norm_parts[0])]=modobj}}else{var __all__=fromlist,thunk={}
if(fromlist && fromlist[0]=="*"){__all__=$B.$getattr(modobj,"__all__",thunk);
if(__all__ !==thunk){
aliases={}}}
if(__all__===thunk){
for(var attr in modobj){if(attr[0]!=="_"){locals[attr]=modobj[attr]}}}else{
for(var i=0,l=__all__.length;i < l;++i){var name=__all__[i]
var alias=aliases[name]||name
try{
locals[alias]=$B.$getattr(modobj,name)}catch($err1){
try{var name1=$B.from_alias(name)
$B.$getattr(__import__,'__call__')(mod_name+'.'+name1,globals,undefined,[],0)
locals[alias]=$B.$getattr(modobj,name1)}catch($err3){
if(mod_name==="__future__"){
var frame=$B.last($B.frames_stack),line_info=frame[3].$line_info,line_elts=line_info.split(','),line_num=parseInt(line_elts[0])
$B.$SyntaxError(frame[2],"future feature "+name+" is not defined",current_frame[3].src,undefined,line_num)}
if($err3.$py_error){var errname=$err3.__class__.$infos.__name__
if($err3.__class__ !==_b_.ImportError &&
$err3.__class__ !==_b_.ModuleNotFoundError){$B.handle_error($err3)}
throw _b_.ImportError.$factory(
"cannot import name '"+name+"'")}
if($B.debug > 1){console.log($err3)
console.log($B.last($B.frames_stack))}
throw _b_.ImportError.$factory(
"cannot import name '"+name+"'")}}}}
return locals}}
$B.import_all=function(locals,module){
for(var attr in module){if(attr.startsWith("$$")){locals[attr]=module[attr]}else if('_$'.indexOf(attr.charAt(0))==-1){locals[attr]=module[attr]}}}
$B.$path_hooks=[url_hook]
$B.$meta_path=[VFSFinder,StdlibStaticFinder,PathFinder]
$B.finders={VFS:VFSFinder,stdlib_static:StdlibStaticFinder,path:PathFinder,CPython:finder_cpython}
function optimize_import_for_path(path,filetype){if(path.slice(-1)!="/"){path=path+"/" }
var value=(filetype=='none')? _b_.None :
url_hook(path,filetype)
$B.path_importer_cache[path]=value}
var Loader={__class__:$B.$type,__mro__:[_b_.object],__name__ :"Loader"}
var _importlib_module={__class__ :Module,__name__ :"_importlib",Loader:Loader,VFSFinder:VFSFinder,StdlibStatic:StdlibStaticFinder,ImporterPath:PathFinder,UrlPathFinder:url_hook,optimize_import_for_path :optimize_import_for_path}
_importlib_module.__repr__=_importlib_module.__str__=function(){return "<module '_importlib' (built-in)>"}
$B.imported["_importlib"]=_importlib_module})(__BRYTHON__)
;
;(function($B){var bltns=$B.InjectBuiltins()
eval(bltns)
var object=_b_.object
function $err(op,other){var msg="unsupported operand type(s) for "+op+
": 'float' and '"+$B.class_name(other)+"'"
throw _b_.TypeError.$factory(msg)}
function float_value(obj){
return obj.$brython_value !==undefined ? obj.$brython_value :obj}
var float={__class__:_b_.type,__dir__:object.__dir__,$infos:{__module__:"builtins",__name__:"float"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
float.numerator=function(self){return float_value(self)}
float.denominator=function(self){return _b_.int.$factory(1)}
float.imag=function(self){return _b_.int.$factory(0)}
float.real=function(self){return float_value(self)}
float.__float__=function(self){return float_value(self)}
$B.shift1_cache={}
float.as_integer_ratio=function(self){self=float_value(self)
if(self.valueOf()==Number.POSITIVE_INFINITY ||
self.valueOf()==Number.NEGATIVE_INFINITY){throw _b_.OverflowError.$factory("Cannot pass infinity to "+
"float.as_integer_ratio.")}
if(! Number.isFinite(self.valueOf())){throw _b_.ValueError.$factory("Cannot pass NaN to "+
"float.as_integer_ratio.")}
var tmp=_b_.$frexp(self.valueOf()),fp=tmp[0],exponent=tmp[1]
for(var i=0;i < 300;i++){if(fp==Math.floor(fp)){break}else{fp*=2
exponent--}}
numerator=_b_.int.$factory(fp)
py_exponent=abs(exponent)
denominator=1
var x
if($B.shift1_cache[py_exponent]!==undefined){x=$B.shift1_cache[py_exponent]}else{x=$B.$getattr(1,"__lshift__")(py_exponent)
$B.shift1_cache[py_exponent]=x}
py_exponent=x
if(exponent > 0){numerator=$B.rich_op("mul",numerator,py_exponent)}else{denominator=py_exponent}
return $B.fast_tuple([_b_.int.$factory(numerator),_b_.int.$factory(denominator)])}
float.__abs__=function(self){return new Number(Math.abs(float_value(self)))}
float.__bool__=function(self){self=float_value(self)
return _b_.bool.$factory(self.valueOf())}
float.__divmod__=function(self,other){if(! _b_.isinstance(other,[int,float])){return _b_.NotImplemented}
return $B.fast_tuple([float.__floordiv__(self,other),float.__mod__(self,other)])}
float.__eq__=function(self,other){self=float_value(self)
other=float_value(other)
if(isNaN(self)&& isNaN(other)){return false}
if(isinstance(other,_b_.int)){return self==other}
if(isinstance(other,float)){
return self.valueOf()==other.valueOf()}
if(isinstance(other,_b_.complex)){if(other.$imag !=0){return false}
return self==other.$real}
return _b_.NotImplemented}
float.__floordiv__=function(self,other){self=float_value(self)
other=float_value(other)
if(isinstance(other,[_b_.int,float])){if(other.valueOf()==0){throw ZeroDivisionError.$factory('division by zero')}
return float.$factory(Math.floor(self/other))}
return _b_.NotImplemented}
float.fromhex=function(arg){
if(! isinstance(arg,_b_.str)){throw _b_.ValueError.$factory("argument must be a string")}
var value=arg.trim()
switch(value.toLowerCase()){case "+inf":
case "inf":
case "+infinity":
case "infinity":
return $FloatClass(Infinity)
case "-inf":
case "-infinity":
return $FloatClass(-Infinity)
case "+nan":
case "nan":
return $FloatClass(Number.NaN)
case "-nan":
return $FloatClass(-Number.NaN)
case "":
throw _b_.ValueError.$factory("could not convert string to float")}
var mo=/^(\d*)(\.?)(\d*)$/.exec(value)
if(mo !==null){var res=parseFloat(mo[1]),coef=16
if(mo[2]){for(var digit of mo[3]){res+=parseInt(digit,16)/coef
coef*=16}}
return $FloatClass(res)}
var _m=/^(\+|-)?(0x)?([0-9A-F]+\.?)?(\.[0-9A-F]+)?(p(\+|-)?\d+)?$/i.exec(value)
if(_m==null){throw _b_.ValueError.$factory("invalid hexadecimal floating-point string")}
var _sign=_m[1],_int=parseInt(_m[3]||'0',16),_fraction=_m[4]||'.0',_exponent=_m[5]||'p0'
if(_sign=="-"){_sign=-1}else{_sign=1}
var _sum=_int
for(var i=1,len=_fraction.length;i < len;i++){_sum+=parseInt(_fraction.charAt(i),16)/Math.pow(16,i)}
return new Number(_sign*_sum*Math.pow(2,parseInt(_exponent.substring(1))))}
float.__getformat__=function(arg){if(arg=="double" ||arg=="float"){return "IEEE, little-endian"}
throw _b_.ValueError.$factory("__getformat__() argument 1 must be "+
"'double' or 'float'")}
function preformat(self,fmt){if(fmt.empty){return _b_.str.$factory(self)}
if(fmt.type && 'eEfFgGn%'.indexOf(fmt.type)==-1){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'float'")}
if(isNaN(self)){if(fmt.type=="f" ||fmt.type=="g"){return "nan"}
else{return "NAN"}}
if(self==Number.POSITIVE_INFINITY){if(fmt.type=="f" ||fmt.type=="g"){return "inf"}
else{return "INF"}}
if(fmt.precision===undefined && fmt.type !==undefined){fmt.precision=6}
if(fmt.type=="%"){self*=100}
if(fmt.type=="e"){var res=self.toExponential(fmt.precision),exp=parseInt(res.substr(res.search("e")+1))
if(Math.abs(exp)< 10){res=res.substr(0,res.length-1)+"0"+
res.charAt(res.length-1)}
return res}
if(fmt.precision !==undefined){
var prec=fmt.precision
if(prec==0){return Math.round(self)+""}
var res=self.toFixed(prec),pt_pos=res.indexOf(".")
if(fmt.type !==undefined &&
(fmt.type=="%" ||fmt.type.toLowerCase()=="f")){if(pt_pos==-1){res+="."+"0".repeat(fmt.precision)}else{var missing=fmt.precision-res.length+pt_pos+1
if(missing > 0){res+="0".repeat(missing)}}}else if(fmt.type && fmt.type.toLowerCase()=="g"){var exp_fmt=preformat(self,{type:"e"}).split("e"),exp=parseInt(exp_fmt[1])
if(-4 <=exp && exp < fmt.precision){res=preformat(self,{type:"f",precision:fmt.precision-1-exp})}else{res=preformat(self,{type:"e",precision:fmt.precision-1})}
var parts=res.split("e")
if(fmt.alternate){if(parts[0].search(/\./)==-1){parts[0]+='.'}}else{if(parts[1]){var signif=parts[0]
while(signif.endsWith("0")){signif=signif.substr(0,signif.length-1)}
if(signif.endsWith(".")){signif=signif.substr(0,signif.length-1)}
parts[0]=signif}}
res=parts.join("e")
if(fmt.type=="G"){res=res.toUpperCase()}
return res}else if(fmt.type===undefined){fmt.type="g"
res=preformat(self,fmt)
fmt.type=undefined}else{var res1=self.toExponential(fmt.precision-1),exp=parseInt(res1.substr(res1.search("e")+1))
if(exp <-4 ||exp >=fmt.precision-1){var elts=res1.split("e")
while(elts[0].endsWith("0")){elts[0]=elts[0].substr(0,elts[0].length-1)}
res=elts.join("e")}}}else{var res=_b_.str.$factory(self)}
if(fmt.type===undefined ||"gGn".indexOf(fmt.type)!=-1){
if(res.search("e")==-1){while(res.charAt(res.length-1)=="0"){res=res.substr(0,res.length-1)}}
if(res.charAt(res.length-1)=="."){if(fmt.type===undefined){res+="0"}
else{res=res.substr(0,res.length-1)}}}
if(fmt.sign !==undefined){if((fmt.sign==" " ||fmt.sign=="+" )&& self > 0){res=fmt.sign+res}}
if(fmt.type=="%"){res+="%"}
return res}
float.__format__=function(self,format_spec){self=float_value(self)
var fmt=new $B.parse_format_spec(format_spec)
fmt.align=fmt.align ||">"
var raw=preformat(self,fmt).split('.'),_int=raw[0]
if(fmt.comma){var len=_int.length,nb=Math.ceil(_int.length/3),chunks=[]
for(var i=0;i < nb;i++){chunks.push(_int.substring(len-3*i-3,len-3*i))}
chunks.reverse()
raw[0]=chunks.join(",")}
return $B.format_width(raw.join("."),fmt)}
float.__hash__=function(self){if(self===undefined){return float.__hashvalue__ ||$B.$py_next_hash--}
var _v=self.valueOf()
if(_v===Infinity){return 314159}
if(_v===-Infinity){return-271828}
if(isNaN(_v)){return 0}
if(_v==Math.round(_v)){return Math.round(_v)}
var r=_b_.$frexp(_v)
r[0]*=Math.pow(2,31)
var hipart=_b_.int.$factory(r[0])
r[0]=(r[0]-hipart)*Math.pow(2,31)
var x=hipart+_b_.int.$factory(r[0])+(r[1]<< 15)
return x & 0xFFFFFFFF}
_b_.$isninf=function(x){var x1=x
if(isinstance(x,float)){x1=float.numerator(x)}
return x1==-Infinity ||x1==Number.NEGATIVE_INFINITY}
_b_.$isinf=function(x){var x1=x
if((! x instanceof Number)&& isinstance(x,float)){x1=float.numerator(x)}
return x1==Infinity ||x1==-Infinity ||
x1==Number.POSITIVE_INFINITY ||x1==Number.NEGATIVE_INFINITY}
_b_.$isnan=function(x){var x1=x
if(isinstance(x,float)){x1=float.numerator(x)}
return isNaN(x1)}
_b_.$fabs=function(x){if(x==0){return new Number(0)}
return x > 0 ? float.$factory(x):float.$factory(-x)}
_b_.$frexp=function(x){var x1=x
if(isinstance(x,float)){x1=x.valueOf()}
if(isNaN(x1)||_b_.$isinf(x1)){return[x1,-1]}else if(x1==0){return[0,0]}
var sign=1,ex=0,man=x1
if(man < 0.){sign=-sign
man=-man}
while(man < 0.5){man*=2.0
ex--}
while(man >=1.0){man*=0.5
ex++}
man*=sign
return[man,ex]}
_b_.$ldexp=function(x,i){if(_b_.$isninf(x)){return float.$factory('-inf')}
if(_b_.$isinf(x)){return float.$factory('inf')}
var y=x
if(isinstance(x,float)){y=x.valueOf()}
if(y==0){return y}
var j=i
if(isinstance(i,float)){j=i.valueOf()}
return y*Math.pow(2,j)}
float.hex=function(self){
self=float_value(self)
var DBL_MANT_DIG=53,
TOHEX_NBITS=DBL_MANT_DIG+3-(DBL_MANT_DIG+2)% 4
switch(self.valueOf()){case Infinity:
case-Infinity:
case Number.NaN:
case-Number.NaN:
return self
case-0:
return "-0x0.0p0"
case 0:
return "0x0.0p0"}
var _a=_b_.$frexp(_b_.$fabs(self.valueOf())),_m=_a[0],_e=_a[1],_shift=1-Math.max(-1021-_e,0)
_m=_b_.$ldexp(_m,_shift)
_e-=_shift
var _int2hex="0123456789ABCDEF".split(""),_s=_int2hex[Math.floor(_m)]
_s+='.'
_m-=Math.floor(_m)
for(var i=0;i <(TOHEX_NBITS-1)/4;i++){_m*=16.0
_s+=_int2hex[Math.floor(_m)]
_m-=Math.floor(_m)}
var _esign="+"
if(_e < 0){_esign="-"
_e=-_e}
if(self.value < 0){return "-0x"+_s+"p"+_esign+_e}
return "0x"+_s+"p"+_esign+_e}
float.__init__=function(self,value){return _b_.None}
float.__int__=function(self){return parseInt(self)}
float.is_integer=function(self){return _b_.int.$factory(self)==self}
float.__mod__=function(self,other){
self=float_value(self)
other=float_value(other)
if(other==0){throw ZeroDivisionError.$factory("float modulo")}
if(isinstance(other,_b_.int)){other=_b_.int.numerator(other)
return new Number((self % other+other)% other)}
if(isinstance(other,float)){
var q=Math.floor(self/other),r=self-other*q
return new Number(r)}
return _b_.NotImplemented}
float.__mro__=[object]
float.__mul__=function(self,other){self=float_value(self)
other=float_value(other)
if(isinstance(other,_b_.int)){if(other.__class__==$B.long_int){return new Number(self*parseFloat(other.value))}
other=_b_.int.numerator(other)
return new Number(self*other)}
if(isinstance(other,float)){return new Number(self*float_value(other))}
return _b_.NotImplemented}
float.__ne__=function(self,other){var res=float.__eq__(self,other)
return res===_b_.NotImplemented ? res :! res}
float.__neg__=function(self){return new Number(-float_value(self))}
float.__new__=function(cls,value){if(cls===undefined){throw _b_.TypeError.$factory("float.__new__(): not enough arguments")}else if(! _b_.isinstance(cls,_b_.type)){throw _b_.TypeError.$factory("float.__new__(X): X is not a type object")}
if(cls===float){return float.$factory(value)}
return{
__class__:cls,__dict__:$B.empty_dict(),$brython_value:value ||0}}
float.__pos__=function(self){return float_value(self)}
float.__pow__=function(self,other){self=float_value(self)
other=float_value(other)
var other_int=isinstance(other,_b_.int)
if(other_int ||isinstance(other,float)){if(self==1){return self}
if(other==0){return new Number(1)}
if(self==-1 &&
(! isFinite(other)||other.__class__===$B.long_int ||
! $B.is_safe_int(other))&&
! isNaN(other)){return new Number(1)}else if(self==0 && isFinite(other)&& other < 0){throw _b_.ZeroDivisionError.$factory("0.0 cannot be raised "+
"to a negative power")}else if(self==Number.NEGATIVE_INFINITY && ! isNaN(other)){if(other < 0 && other % 2==1){return new Number(-0.0)}else if(other < 0){return new Number(0)}
else if(other > 0 && other % 2==1){return Number.NEGATIVE_INFINITY}else{return Number.POSITIVE_INFINITY}}else if(self==Number.POSITIVE_INFINITY && ! isNaN(other)){return other > 0 ? self :new Number(0)}
if(other==Number.NEGATIVE_INFINITY && ! isNaN(self)){return Math.abs(self)< 1 ? Number.POSITIVE_INFINITY :
new Number(0)}else if(other==Number.POSITIVE_INFINITY && ! isNaN(self)){return Math.abs(self)< 1 ? new Number(0):
Number.POSITIVE_INFINITY}
if(self < 0 &&
! _b_.getattr(other,"__eq__")(_b_.int.$factory(other))){
return _b_.complex.__pow__($B.make_complex(self,0),other)}
return float.$factory(Math.pow(self,other))}
return _b_.NotImplemented}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=args.slice(1)
res.__class__=args[0]
return res}
float.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__ ||int,float_value(self)]),_b_.None,_b_.None,_b_.None])}
float.__repr__=function(self){$B.builtins_repr_check(float,arguments)
self=float_value(self).valueOf()
if(self==Infinity){return 'inf'}else if(self==-Infinity){return '-inf'}else if(isNaN(self)){return 'nan'}else if(self===0){if(1/self===-Infinity){return '-0.0'}
return '0.0'}
var res=self+"" 
if(res.indexOf(".")==-1){res+=".0"}
var split_e=res.split(/e/i)
if(split_e.length==2){var mant=split_e[0],exp=split_e[1]
if(exp.startsWith('-')){exp_str=parseInt(exp.substr(1))+''
if(exp_str.length < 2){exp_str='0'+exp_str}
return mant+'e-'+exp_str}}
var x,y
[x,y]=res.split('.')
if(x.length > 16){var exp=x.length-1,int_part=x[0],dec_part=x.substr(1)+y
while(dec_part.endsWith("0")){dec_part=dec_part.substr(0,dec_part.length-1)}
var mant=int_part
if(dec_part.length > 0){mant+='.'+dec_part}
return mant+'e+'+exp}else if(x=="0"){var exp=0
while(exp < y.length && y.charAt(exp)=="0"){exp++}
if(exp > 3){
var rest=y.substr(exp),exp=(exp+1).toString()
while(rest.endsWith("0")){rest=rest.substr(0,res.length-1)}
var mant=rest[0]
if(rest.length > 1){mant+='.'+rest.substr(1)}
if(exp.length==1){exp='0'+exp}
return mant+'e-'+exp}}
return _b_.str.$factory(res)}
float.__setattr__=function(self,attr,value){if(self.constructor===Number){if(float[attr]===undefined){throw _b_.AttributeError.$factory("'float' object has no attribute '"+
attr+"'")}else{throw _b_.AttributeError.$factory("'float' object attribute '"+
attr+"' is read-only")}}
self[attr]=value
return _b_.None}
float.__truediv__=function(self,other){self=float_value(self)
other=float_value(other)
if(isinstance(other,[_b_.int,float])){if(other.valueOf()==0){throw ZeroDivisionError.$factory("division by zero")}
return float.$factory(self/other)}
return _b_.NotImplemented}
var $op_func=function(self,other){self=float_value(self)
other=float_value(other)
if(isinstance(other,_b_.int)){if(typeof other=="boolean"){return other ? self-1 :self}else if(other.__class__===$B.long_int){return float.$factory(self-parseInt(other.value))}else{return float.$factory(self-other)}}
if(isinstance(other,float)){return float.$factory(self-other)}
return _b_.NotImplemented}
$op_func+="" 
var $ops={"+":"add","-":"sub"}
for(var $op in $ops){var $opf=$op_func.replace(/-/gm,$op)
$opf=$opf.replace(/__rsub__/gm,"__r"+$ops[$op]+"__")
eval("float.__"+$ops[$op]+"__ = "+$opf)}
var $comp_func=function(self,other){self=float_value(self)
other=float_value(other)
if(isinstance(other,_b_.int)){if(other.__class__===$B.long_int){return self > parseInt(other.value)}
return self > other.valueOf()}
if(isinstance(other,float)){return self > other}
if(isinstance(other,_b_.bool)){return self.valueOf()> _b_.bool.__hash__(other)}
if(hasattr(other,"__int__")||hasattr(other,"__index__")){return _b_.int.__gt__(self,$B.$GetInt(other))}
var inv_op=getattr(other,"__le__",None)
if(inv_op !==None){return inv_op(self)}
throw _b_.TypeError.$factory(
"unorderable types: float() > "+$B.class_name(other)+"()")}
$comp_func+="" 
for(var $op in $B.$comps){eval("float.__"+$B.$comps[$op]+"__ = "+
$comp_func.replace(/>/gm,$op).
replace(/__gt__/gm,"__"+$B.$comps[$op]+"__").
replace(/__le__/,"__"+$B.$inv_comps[$op]+"__"))}
var r_opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or","divmod"]
for(var r_opname of r_opnames){if(float["__r"+r_opname+"__"]===undefined &&
float['__'+r_opname+'__']){float["__r"+r_opname+"__"]=(function(name){return function(self,other){if(_b_.isinstance(other,_b_.int)){other=float_value(_b_.int.numerator(other))
return float["__"+name+"__"](other,self)}else if(_b_.isinstance(other,float)){other=float_value(other)
return float["__"+name+"__"](other,self)}
return _b_.NotImplemented}})(r_opname)}}
function $FloatClass(value){return new Number(value)}
function to_digits(s){
var arabic_digits="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",res=""
for(var i=0;i < s.length;i++){var x=arabic_digits.indexOf(s[i])
if(x >-1){res+=x}
else{res+=s[i]}}
return res}
float.$factory=function(value){switch(value){case undefined:
return $FloatClass(0.0)
case Number.MAX_VALUE:
return $FloatClass(Infinity)
case-Number.MAX_VALUE:
return $FloatClass(-Infinity)
case true:
return new Number(1)
case false:
return new Number(0)}
if(typeof value=="number"){return new Number(value)}
if(isinstance(value,float)){return float_value(value)}
if(isinstance(value,bytes)){var s=getattr(value,"decode")("latin-1")
return float.$factory(getattr(value,"decode")("latin-1"))}
if(typeof value=="string"){value=value.trim()
switch(value.toLowerCase()){case "+inf":
case "inf":
case "+infinity":
case "infinity":
return Number.POSITIVE_INFINITY
case "-inf":
case "-infinity":
return Number.NEGATIVE_INFINITY
case "+nan":
case "nan":
return Number.NaN
case "-nan":
return-Number.NaN
case "":
throw _b_.ValueError.$factory("count not convert string to float")
default:
value=value.charAt(0)+value.substr(1).replace(/_/g,"")
value=to_digits(value)
if(isFinite(value))return $FloatClass(eval(value))
else{
_b_.str.encode(value,"latin-1")
throw _b_.ValueError.$factory(
"Could not convert to float(): '"+
_b_.str.$factory(value)+"'")}}}
var klass=value.__class__ ||$B.get_class(value),num_value=$B.to_num(value,["__float__","__index__"])
if(value !==Number.POSITIVE_INFINITY && ! isFinite(num_value)){throw _b_.OverflowError.$factory('int too large to convert to float')}
if(num_value !==null){return num_value}
throw _b_.TypeError.$factory("float() argument must be a string or a "+
"number, not '"+$B.class_name(value)+"'")}
$B.$FloatClass=$FloatClass
$B.set_func_names(float,"builtins")
var FloatSubclass=$B.FloatSubclass={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"float"},$is_class:true}
for(var $attr in float){if(typeof float[$attr]=="function"){FloatSubclass[$attr]=(function(attr){return function(){var args=[],pos=0
if(arguments.length > 0){var args=[arguments[0].valueOf()],pos=1
for(var i=1,len=arguments.length;i < len;i++){args[pos++]=arguments[i]}}
return float[attr].apply(null,args)}})($attr)}}
$B.set_func_names(FloatSubclass,"builtins")
_b_.float=float})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
function $err(op,other){var msg="unsupported operand type(s) for "+op+
" : 'int' and '"+$B.class_name(other)+"'"
throw _b_.TypeError.$factory(msg)}
function int_value(obj){
if(typeof obj=="boolean"){return obj ? 1 :0}
return obj.$brython_value !==undefined ? obj.$brython_value :obj}
var int={__class__:_b_.type,__dir__:_b_.object.__dir__,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"int"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
int.as_integer_ratio=function(){var $=$B.args("as_integer_ratio",1,{self:null},["self"],arguments,{},null,null)
return $B.$list([$.self,1])}
int.from_bytes=function(){var $=$B.args("from_bytes",3,{bytes:null,byteorder:null,signed:null},["bytes","byteorder","signed"],arguments,{signed:false},null,null)
var x=$.bytes,byteorder=$.byteorder,signed=$.signed,_bytes,_len
if(_b_.isinstance(x,[_b_.bytes,_b_.bytearray])){_bytes=x.source
_len=x.source.length}else{_bytes=_b_.list.$factory(x)
_len=_bytes.length
for(var i=0;i < _len;i++){_b_.bytes.$factory([_bytes[i]])}}
if(byteorder=="big"){_bytes.reverse()}else if(byteorder !="little"){throw _b_.ValueError.$factory(
"byteorder must be either 'little' or 'big'")}
var num=_bytes[0]
if(signed && num >=128){num=num-256}
var _mult=256
for(var i=1;i < _len;i++){num=$B.add($B.mul(_mult,_bytes[i]),num)
_mult=$B.mul(_mult,256)}
if(! signed){return num}
if(_bytes[_len-1]< 128){return num}
return $B.sub(num,_mult)}
int.to_bytes=function(){var $=$B.args("to_bytes",3,{self:null,len:null,byteorder:null,signed:null},["self","len","byteorder","*","signed"],arguments,{signed:false},null,null),self=$.self,len=$.len,byteorder=$.byteorder,signed=$.signed
if(! _b_.isinstance(len,_b_.int)){throw _b_.TypeError.$factory("integer argument expected, got "+
$B.class_name(len))}
if(["little","big"].indexOf(byteorder)==-1){throw _b_.ValueError.$factory(
"byteorder must be either 'little' or 'big'")}
if(_b_.isinstance(self,$B.long_int)){return $B.long_int.to_bytes(self,len,byteorder,signed)}
if(self < 0){if(! signed){throw _b_.OverflowError.$factory(
"can't convert negative int to unsigned")}
self=Math.pow(256,len)+self}
var res=[],value=self
while(value > 0){var quotient=Math.floor(value/256),rest=value-256*quotient
res.push(rest)
if(res.length > len){throw _b_.OverflowError.$factory("int too big to convert")}
value=quotient}
while(res.length < len){res.push(0)}
if(byteorder=="big"){res.reverse()}
return{
__class__:_b_.bytes,source:res}}
int.__abs__=function(self){return _b_.abs(self)}
int.__add__=function(self,other){self=int_value(self)
if(_b_.isinstance(other,int)){if(other.__class__==$B.long_int){return $B.long_int.__add__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
var res=self+other
if(res > $B.min_int && res < $B.max_int){return res}else{return $B.long_int.__add__($B.long_int.$factory(self),$B.long_int.$factory(other))}}
return _b_.NotImplemented}
int.__bool__=function(self){return int_value(self).valueOf()==0 ? false :true}
int.__ceil__=function(self){return Math.ceil(int_value(self))}
int.__divmod__=function(self,other){if(! _b_.isinstance(other,int)){return _b_.NotImplemented}
return $B.fast_tuple([int.__floordiv__(self,other),int.__mod__(self,other)])}
int.__eq__=function(self,other){
if(other===undefined){return self===int}
if(_b_.isinstance(other,int)){return self.valueOf()==int_value(other).valueOf()}
if(_b_.isinstance(other,_b_.float)){return self.valueOf()==other.valueOf()}
if(_b_.isinstance(other,_b_.complex)){if(other.$imag !=0){return False}
return self.valueOf()==other.$real}
return _b_.NotImplemented}
int.__float__=function(self){return new Number(self)}
function preformat(self,fmt){if(fmt.empty){return _b_.str.$factory(self)}
if(fmt.type && 'bcdoxXn'.indexOf(fmt.type)==-1){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'int'")}
var res
switch(fmt.type){case undefined:
case "d":
res=self.toString()
break
case "b":
res=(fmt.alternate ? "0b" :"")+self.toString(2)
break
case "c":
res=_b_.chr(self)
break
case "o":
res=(fmt.alternate ? "0o" :"")+self.toString(8)
break
case "x":
res=(fmt.alternate ? "0x" :"")+self.toString(16)
break
case "X":
res=(fmt.alternate ? "0X" :"")+self.toString(16).toUpperCase()
break
case "n":
return self }
if(fmt.sign !==undefined){if((fmt.sign==" " ||fmt.sign=="+" )&& self >=0){res=fmt.sign+res}}
return res}
int.__format__=function(self,format_spec){var fmt=new $B.parse_format_spec(format_spec)
if(fmt.type && 'eEfFgG%'.indexOf(fmt.type)!=-1){
return _b_.float.__format__(self,format_spec)}
fmt.align=fmt.align ||">"
var res=preformat(self,fmt)
if(fmt.comma){var sign=res[0]=="-" ? "-" :"",rest=res.substr(sign.length),len=rest.length,nb=Math.ceil(rest.length/3),chunks=[]
for(var i=0;i < nb;i++){chunks.push(rest.substring(len-3*i-3,len-3*i))}
chunks.reverse()
res=sign+chunks.join(",")}
return $B.format_width(res,fmt)}
int.__floordiv__=function(self,other){if(other.__class__===$B.long_int){return $B.long_int.__floordiv__($B.long_int.$factory(self),other)}
if(_b_.isinstance(other,int)){other=int_value(other)
if(other==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
return Math.floor(self/other)}
return _b_.NotImplemented}
int.__hash__=function(self){if(self.$brython_value){
var hash_method=$B.$getattr(self.__class__,'__hash__')
if(hash_method===int.__hash__){if(typeof self.$brython_value=="number"){return self.$brython_value}else{
return $B.long_int.__hash__(self.$brython_value)}}else{return hash_method(self)}}
return self.valueOf()}
int.__index__=function(self){return int_value(self)}
int.__init__=function(self,value){if(value===undefined){value=0}
self.toString=function(){return value}
return _b_.None}
int.__int__=function(self){return self}
int.__invert__=function(self){return ~self}
int.__lshift__=function(self,other){self=int_value(self)
if(_b_.isinstance(other,int)){other=int_value(other)
try{return int.$factory($B.long_int.__lshift__($B.long_int.$factory(self),$B.long_int.$factory(other)))}catch(err){console.log('err in lshift',self,other)
throw err}}
return _b_.NotImplemented}
int.__mod__=function(self,other){
if(_b_.isinstance(other,_b_.tuple)&& other.length==1){other=other[0]}
if(other.__class__===$B.long_int){return $B.long_int.__mod__($B.long_int.$factory(self),other)}
if(_b_.isinstance(other,int)){other=int_value(other)
if(other===false){other=0}
else if(other===true){other=1}
if(other==0){throw _b_.ZeroDivisionError.$factory(
"integer division or modulo by zero")}
return(self % other+other)% other}
return _b_.NotImplemented}
int.__mul__=function(self,other){self=int_value(self)
if(_b_.isinstance(other,int)){if(other.__class__==$B.long_int){return $B.long_int.__mul__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
var res=self*other
if(res > $B.min_int && res < $B.max_int){return res}else{return int.$factory($B.long_int.__mul__($B.long_int.$factory(self),$B.long_int.$factory(other)))}}
return _b_.NotImplemented}
int.__ne__=function(self,other){var res=int.__eq__(self,other)
return(res===_b_.NotImplemented)? res :!res}
int.__neg__=function(self){return-self}
int.__new__=function(cls,value){if(cls===undefined){throw _b_.TypeError.$factory("int.__new__(): not enough arguments")}else if(! _b_.isinstance(cls,_b_.type)){throw _b_.TypeError.$factory("int.__new__(X): X is not a type object")}
if(cls===int){return int.$factory(value)}
return{
__class__:cls,__dict__:$B.empty_dict(),$brython_value:value ||0}}
int.__pos__=function(self){return self}
function extended_euclidean(a,b){var d,u,v
if(b==0){return[a,1,0]}else{[d,u,v]=extended_euclidean(b,a % b)
return[d,v,u-Math.floor(a/b)*v]}}
int.__pow__=function(self,other,z){if(! _b_.isinstance(other,int)){return _b_.NotImplemented}
if(typeof other=="number" ||_b_.isinstance(other,int)){other=int_value(other)
switch(other.valueOf()){case 0:
return int.$factory(1)
case 1:
return int.$factory(self.valueOf())}
if(z !==undefined && z !==_b_.None){
if(z==1){return 0}
var result=1,base=self % z,exponent=other,long_int=$B.long_int
if(exponent < 0){var gcd,inv,_
[gcd,inv,_]=extended_euclidean(self,z)
if(gcd !==1){throw _b_.ValueError.$factory("not relative primes: "+
self+' and '+z)}
return int.__pow__(inv,-exponent,z)}
while(exponent > 0){if(exponent % 2==1){if(result*base > $B.max_int){result=long_int.__mul__(
long_int.$factory(result),long_int.$factory(base))
result=long_int.__mod__(result,z)}else{result=(result*base)% z}}
exponent=exponent >> 1
if(base*base > $B.max_int){base=long_int.__mul__(long_int.$factory(base),long_int.$factory(base))
base=long_int.__mod__(base,z)}else{base=(base*base)% z}}
return result}
var res=Math.pow(self.valueOf(),other.valueOf())
if(res > $B.min_int && res < $B.max_int){return other > 0 ? res :new Number(res)}else if(res !==Infinity && !isFinite(res)){return res}else{if($B.BigInt){return{
__class__:$B.long_int,value:($B.BigInt(self)**$B.BigInt(other)).toString(),pos:true}}
return $B.long_int.__pow__($B.long_int.$from_int(self),$B.long_int.$from_int(other))}}
if(_b_.isinstance(other,_b_.float)){other=_b_.float.numerator(other)
if(self >=0){return new Number(Math.pow(self,other))}else{
return _b_.complex.__pow__($B.make_complex(self,0),other)}}else if(_b_.isinstance(other,_b_.complex)){var preal=Math.pow(self,other.$real),ln=Math.log(self)
return $B.make_complex(preal*Math.cos(ln),preal*Math.sin(ln))}
var rpow=$B.$getattr(other,"__rpow__",_b_.None)
if(rpow !==_b_.None){return rpow(self)}
$err("**",other)}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=args.slice(1)
res.__class__=args[0]
return res}
int.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__ ||int,int_value(self)]),_b_.None,_b_.None,_b_.None])}
int.__repr__=function(self){$B.builtins_repr_check(int,arguments)
return int_value(self).toString()}
int.__rshift__=function(self,other){self=int_value(self)
if(typeof other=="number" ||_b_.isinstance(other,int)){other=int_value(other)
return int.$factory($B.long_int.__rshift__($B.long_int.$factory(self),$B.long_int.$factory(other)))}
return _b_.NotImplemented}
int.__setattr__=function(self,attr,value){if(typeof self=="number" ||typeof self=="boolean"){var cl_name=$B.class_name(self)
if(_b_.dir(self).indexOf(attr)>-1){var msg="attribute '"+attr+`' of '${cl_name}'`+
"objects is not writable"}else{var msg=`'${cl_name}' object has no attribute '${attr}'`}
throw _b_.AttributeError.$factory(msg)}
_b_.dict.$setitem(self.__dict__,attr,value)
return _b_.None}
int.__sub__=function(self,other){self=int_value(self)
if(_b_.isinstance(other,int)){if(other.__class__==$B.long_int){return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
var res=self-other
if(res > $B.min_int && res < $B.max_int){return res}else{return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}}
return _b_.NotImplemented}
int.__truediv__=function(self,other){if(_b_.isinstance(other,int)){other=int_value(other)
if(other==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
if(other.__class__===$B.long_int){return new Number(self/parseInt(other.value))}
return new Number(self/other)}
return _b_.NotImplemented}
int.bit_length=function(self){s=_b_.bin(self)
s=$B.$getattr(s,"lstrip")("-0b")
return s.length }
int.numerator=function(self){return int_value(self)}
int.denominator=function(self){return int.$factory(1)}
int.imag=function(self){return int.$factory(0)}
int.real=function(self){return self}
for(var attr of['numerator','denominator','imag','real']){int[attr].setter=(function(x){return function(self,value){throw _b_.AttributeError.$factory(`attribute '${x}' of `+
`'${$B.class_name(self)}' objects is not writable`)}})(attr)}
$B.max_int32=(1 << 30)*2-1
$B.min_int32=-$B.max_int32
var $op_func=function(self,other){self=int_value(self)
if(typeof other=="number" ||_b_.isinstance(other,int)){if(other.__class__===$B.long_int){return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
if(self > $B.max_int32 ||self < $B.min_int32 ||
other > $B.max_int32 ||other < $B.min_int32){return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}
return self-other}
return _b_.NotImplemented}
$op_func+="" 
var $ops={"&":"and","|":"or","^":"xor"}
for(var $op in $ops){var opf=$op_func.replace(/-/gm,$op)
opf=opf.replace(new RegExp("sub","gm"),$ops[$op])
eval("int.__"+$ops[$op]+"__ = "+opf)}
var $comp_func=function(self,other){if(other.__class__===$B.long_int){return $B.long_int.__lt__(other,$B.long_int.$factory(self))}
if(_b_.isinstance(other,int)){other=int_value(other)
return self.valueOf()> other.valueOf()}else if(_b_.isinstance(other,_b_.float)){return self.valueOf()> _b_.float.numerator(other)}else if(_b_.isinstance(other,_b_.bool)){return self.valueOf()> _b_.bool.__hash__(other)}
if(_b_.hasattr(other,"__int__")||_b_.hasattr(other,"__index__")){return int.__gt__(self,$B.$GetInt(other))}
return _b_.NotImplemented}
$comp_func+="" 
for(var $op in $B.$comps){eval("int.__"+$B.$comps[$op]+"__ = "+
$comp_func.replace(/>/gm,$op).
replace(/__gt__/gm,"__"+$B.$comps[$op]+"__").
replace(/__lt__/,"__"+$B.$inv_comps[$op]+"__"))}
var r_opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or","divmod"]
for(var r_opname of r_opnames){if(int["__r"+r_opname+"__"]===undefined &&
int['__'+r_opname+'__']){int["__r"+r_opname+"__"]=(function(name){return function(self,other){if(_b_.isinstance(other,int)){other=int_value(other)
return int["__"+name+"__"](other,self)}
return _b_.NotImplemented}})(r_opname)}}
var $valid_digits=function(base){var digits=""
if(base===0){return "0"}
if(base < 10){for(var i=0;i < base;i++){digits+=String.fromCharCode(i+48)}
return digits}
var digits="0123456789"
for(var i=10;i < base;i++){digits+=String.fromCharCode(i+55)}
return digits}
int.$factory=function(value,base){
if(value===undefined){return 0}
if(typeof value=="number" &&
(base===undefined ||base==10)){return parseInt(value)}
if(_b_.isinstance(value,_b_.complex)){throw _b_.TypeError.$factory("can't convert complex to int")}
var $ns=$B.args("int",2,{x:null,base:null},["x","base"],arguments,{"base":10},null,null),value=$ns["x"],base=$ns["base"]
if(_b_.isinstance(value,_b_.float)&& base==10){value=_b_.float.numerator(value)
if(value < $B.min_int ||value > $B.max_int){return $B.long_int.$from_float(value)}
else{return value > 0 ? Math.floor(value):Math.ceil(value)}}
if(!(base >=2 && base <=36)){
if(base !=0){throw _b_.ValueError.$factory("invalid base")}}
if(typeof value=="number"){if(base==10){if(value < $B.min_int ||value > $B.max_int){return $B.long_int.$factory(value)}
return value}else if(value.toString().search("e")>-1){
throw _b_.OverflowError.$factory("can't convert to base "+base)}else{var res=parseInt(value,base)
if(value < $B.min_int ||value > $B.max_int){return $B.long_int.$factory(value,base)}
return res}}
if(value===true){return Number(1)}
if(value===false){return Number(0)}
if(value.__class__===$B.long_int){var z=parseInt(value.value)
if(z > $B.min_int && z < $B.max_int){return z}
else{return value}}
base=$B.$GetInt(base)
function invalid(value,base){throw _b_.ValueError.$factory("invalid literal for int() with base "+
base+": '"+_b_.str.$factory(value)+"'")}
if(_b_.isinstance(value,_b_.str)){value=value.valueOf()}
if(typeof value=="string"){var _value=value.trim()
if(_value.length==2 && base==0 &&
(_value=="0b" ||_value=="0o" ||_value=="0x")){throw _b_.ValueError.$factory("invalid value")}
if(_value.length > 2){var _pre=_value.substr(0,2).toUpperCase()
if(base==0){if(_pre=="0B"){base=2}
if(_pre=="0O"){base=8}
if(_pre=="0X"){base=16}}else if(_pre=="0X" && base !=16){invalid(_value,base)}
else if(_pre=="0O" && base !=8){invalid(_value,base)}
if((_pre=="0B" && base==2)||_pre=="0O" ||_pre=="0X"){_value=_value.substr(2)
while(_value.startsWith("_")){_value=_value.substr(1)}}}else if(base==0){
base=10}
var _digits=$valid_digits(base),_re=new RegExp("^[+-]?["+_digits+"]"+
"["+_digits+"_]*$","i"),match=_re.exec(_value)
if(match===null){invalid(value,base)}else{value=_value.replace(/_/g,"")}
if(base <=10 && ! isFinite(value)){invalid(_value,base)}
var res=parseInt(value,base)
if(res < $B.min_int ||res > $B.max_int){return $B.long_int.$factory(value,base)}
return res}
if(_b_.isinstance(value,[_b_.bytes,_b_.bytearray])){return int.$factory($B.$getattr(value,"decode")("latin-1"),base)}
for(var special_method of["__int__","__index__","__trunc__"]){var num_value=$B.$getattr(value.__class__ ||$B.get_class(value),special_method,_b_.None)
if(num_value !==_b_.None){return $B.$call(num_value)(value)}}
throw _b_.TypeError.$factory(
"int() argument must be a string, a bytes-like "+
"object or a number, not '"+$B.class_name(value)+"'")}
$B.set_func_names(int,"builtins")
_b_.int=int
$B.$bool=function(obj){
if(obj===null ||obj===undefined ){return false}
switch(typeof obj){case "boolean":
return obj
case "number":
case "string":
if(obj){return true}
return false
default:
if(obj.$is_class){return true}
var klass=obj.__class__ ||$B.get_class(obj),missing={},bool_method=$B.$getattr(klass,"__bool__",missing)
if(bool_method===missing){try{return _b_.len(obj)> 0}
catch(err){return true}}else{var res=$B.$call(bool_method)(obj)
if(res !==true && res !==false){throw _b_.TypeError.$factory("__bool__ should return "+
"bool, returned "+$B.class_name(res))}
return res}}}
var bool={__bases__:[int],__class__:_b_.type,__mro__:[int,_b_.object],$infos:{__name__:"bool",__module__:"builtins"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
bool.__and__=function(self,other){if(_b_.isinstance(other,bool)){return self && other}else if(_b_.isinstance(other,int)){return int.__and__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.__float__=function(self){return self ? new Number(1):new Number(0)}
bool.__hash__=bool.__index__=bool.__int__=function(self){if(self.valueOf())return 1
return 0}
bool.__neg__=function(self){return-$B.int_or_bool(self)}
bool.__or__=function(self,other){if(_b_.isinstance(other,bool)){return self ||other}else if(_b_.isinstance(other,int)){return int.__or__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.__pos__=$B.int_or_bool
bool.__repr__=function(self){$B.builtins_repr_check(bool,arguments)
return self ? "True" :"False"}
bool.__xor__=function(self,other){if(_b_.isinstance(other,bool)){return self ^ other ? true :false}else if(_b_.isinstance(other,int)){return int.__xor__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.$factory=function(){
var $=$B.args("bool",1,{x:null},["x"],arguments,{x:false},null,null)
return $B.$bool($.x)}
bool.numerator=int.numerator
bool.denominator=int.denominator
bool.real=int.real
bool.imag=int.imag
_b_.bool=bool
$B.set_func_names(bool,"builtins")})(__BRYTHON__)
;
;(function($B){
var bltns=$B.InjectBuiltins()
eval(bltns)
try{eval("window")}catch(err){window=self}
var long_int={__class__:_b_.type,__mro__:[int,object],$infos:{__module__:"builtins",__name__:"int"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
var max_safe_divider=$B.max_int/9
function add_pos(v1,v2){
if(window.BigInt){return{
__class__:long_int,value:(BigInt(v1)+BigInt(v2)).toString(),pos:true}}
var res="",carry=0,iself=v1.length,sv=0,x
for(var i=v2.length-1;i >=0 ;i--){iself--
if(iself < 0){sv=0}else{sv=parseInt(v1.charAt(iself))}
x=(carry+sv+parseInt(v2.charAt(i))).toString()
if(x.length==2){res=x.charAt(1)+res
carry=parseInt(x.charAt(0))}
else{res=x+res;carry=0}}
while(iself > 0){iself--
x=(carry+parseInt(v1.charAt(iself))).toString()
if(x.length==2){res=x.charAt(1)+res
carry=parseInt(x.charAt(0))}
else{res=x+res;carry=0}}
if(carry){res=carry+res}
return{__class__:long_int,value:res,pos:true}}
var len=((Math.pow(2,53)-1)+'').length-1
function binary_pos(t){var nb_chunks=Math.ceil(t.length/len),chunks=[],pos,start,nb,bin=[]
for(var i=0;i < nb_chunks;i++){pos=t.length-(i+1)*len
start=Math.max(0,pos)
nb=pos-start
chunks.push(t.substr(start,len+nb))}
chunks=chunks.reverse()
chunks.forEach(function(chunk,i){chunks[i]=parseInt(chunk)})
var rest
var carry=Math.pow(10,15)
while(chunks[chunks.length-1]> 0){chunks.forEach(function(chunk,i){rest=chunk % 2
chunks[i]=Math.floor(chunk/2)
if(rest && i < chunks.length-1){chunks[i+1]+=carry}})
bin.push(rest)
if(chunks[0]==0){chunks.shift()}}
bin=bin.reverse().join('')
return bin}
function binary(obj){var bpos=binary_pos(obj.value)
if(obj.pos){return bpos}
var res=''
for(var i=0,len=bpos.length;i < len;i++){res+=bpos.charAt(i)=="0" ? "1":"0"}
var add1=add_pos(res,"1").value
add1=res.substr(0,res.length-add1.length)+add1
return add1}
function check_shift(shift){
if(! isinstance(shift,long_int)){throw TypeError.$factory("shift must be int, not '"+
$B.class_name(shift)+"'")}
if(! shift.pos){throw ValueError.$factory("negative shift count")}}
function clone(obj){
var obj1={}
for(var attr in obj){obj1[attr]=obj[attr]}
return obj1}
function comp_pos(v1,v2){
if(v1.length > v2.length){return 1}
else if(v1.length < v2.length){return-1}
else{if(v1 > v2){return 1}
else if(v1 < v2){return-1}}
return 0}
function divmod_by_safe_int(t,n){
if(n==1){return[t,0]}
var T=t.toString(),L=n.toString().length,a=parseInt(T.substr(0,L)),next_pos=L-1,quotient='',q,rest
while(true){q=Math.floor(a/n)
rest=a-q*n
quotient+=q
next_pos++
if(next_pos >=T.length){return[quotient,rest]}
a=10*rest+parseInt(T[next_pos])}}
function divmod_pos(v1,v2){
if($B.BigInt){var a={__class__:long_int,value:(BigInt(v1)/BigInt(v2)).toString(),pos:true},b={__class__:long_int,value:(BigInt(v1)% BigInt(v2)).toString(),pos:true}
return[a,b]}
var iv1=parseInt(v1),iv2=parseInt(v2),res1
if(iv1 < $B.max_int && iv2 < $B.max_int){var rest=iv1 % iv2,quot=Math.floor(iv1/iv2).toString()
var res1=[{__class__:long_int,value:quot.toString(),pos:true},{__class__:long_int,value:rest.toString(),pos:true}
]
return res1}else if(iv2 < max_safe_divider){var res_safe=divmod_by_safe_int(v1,iv2)
return[long_int.$factory(res_safe[0]),long_int.$factory(res_safe[1])]}
var quotient,mod
if(comp_pos(v1,v2)==-1){
quotient="0"
mod=long_int.$factory(v1)}else if(v2==v1){
quotient="1"
mod=long_int.$factory("0")}else{var quotient="",left=v1.substr(0,v2.length)
if(v1 < v2){left=v1.substr(0,v2.length+1)}
var right=v1.substr(left.length)
var mv2={}
while(true){
var candidate=Math.floor(parseInt(left)/parseInt(v2))+""
if(candidate=="10"){
candidate="9"}
if(mv2[candidate]===undefined){mv2[candidate]=mul_pos(v2,candidate).value}
if(comp_pos(left,mv2[candidate])==-1){
candidate--
if(mv2[candidate]===undefined){mv2[candidate]=mul_pos(v2,candidate).value}}
quotient+=candidate
left=sub_pos(left,mv2[candidate]).value
if(right.length==0){break}
left+=right.charAt(0)
right=right.substr(1)}
mod=sub_pos(v1,mul_pos(quotient,v2).value)}
return[long_int.$factory(quotient),mod]}
function split_chunks(s,size){var nb=Math.ceil(s.length/size),chunks=[],len=s.length
for(var i=0;i < nb;i++){var pos=len-size*(i+1)
if(pos < 0){size+=pos;pos=0}
chunks.push(parseInt(s.substr(pos,size)))}
return chunks}
function mul_pos(x,y){if($B.BigInt){
return long_int.$factory(from_BigInt(BigInt(x)*BigInt(y)))}
var ix=parseInt(x),iy=parseInt(y),z=ix*iy
if(z < $B.max_int){return{
__class__:long_int,value:z.toString(),pos:true}}
var chunk_size=6,cx=split_chunks(x,chunk_size),cy=split_chunks(y,chunk_size)
var products={},len=cx.length+cy.length
for(var i=0;i < len-1;i++){products[i]=0}
for(var i=0;i < cx.length;i++){for(var j=0;j < cy.length;j++){products[i+j]+=cx[i]*cy[j]}}
var nb=len-1,pos
for(var i=0;i < len-1;i++){var chunks=split_chunks(products[i].toString(),chunk_size)
for(var j=1;j < chunks.length;j++){pos=i+j
if(products[pos]===undefined){products[pos]=parseInt(chunks[j])
nb=pos}
else{products[pos]+=parseInt(chunks[j])}}
products[i]=chunks[0]}
var result="",i=0,s
while(products[i]!==undefined){s=products[i].toString()
if(products[i+1]!==undefined){s="0".repeat(chunk_size-s.length)+s}
result=s+result
i++}
try{return long_int.$factory(result)}catch(err){console.log(x,y,products,result)
throw err}}
function sub_pos(v1,v2){
if(window.BigInt){return{
__class__:long_int,value:(BigInt(v1)-BigInt(v2)).toString(),pos:true}}
var res="",carry=0,i1=v1.length,sv=0,x
for(var i=v2.length-1;i >=0;i--){i1--
sv=parseInt(v1.charAt(i1))
x=(sv-carry-parseInt(v2.charAt(i)))
if(isNaN(x)){console.log("x is NaN",v1.length,v2.length,i,i1,sv,carry,i,v2.charAt(i))}
if(x < 0){res=(10+x)+res;carry=1}
else{res=x+res;carry=0}}
if(res.startsWith("NaN")){alert(res)}
while(i1 > 0){i1--
x=(parseInt(v1.charAt(i1))-carry)
if(x < 0){res=(10+x)+res;carry=1}
else{res=x+res;carry=0}}
while(res.charAt(0)=="0" && res.length > 1){res=res.substr(1)}
if(res.startsWith("NaN")){console.log("hoho !!",v1,v2,v1 >=v2,res)}
return{__class__:long_int,value:res,pos:true}}
function to_BigInt(x){var res=$B.BigInt(x.value)
if(x.pos){return res}
return-res}
function to_int(long_int){return long_int.pos ? parseInt(long_int.value):-parseInt(long_int.value)}
function from_BigInt(y){var pos=y >=0
y=y.toString()
y=y.endsWith("n")? y.substr(0,y.length-1):y
y=y.startsWith('-')? y.substr(1):y
return intOrLong({__class__:long_int,value:y,pos:pos})}
long_int.$from_float=function(value){var s=Math.abs(value).toString(),v=s
if(s.search("e")>-1){var t=/-?(\d)(\.\d+)?e([+-])(\d*)/.exec(s),n1=t[1],n2=t[2],pos=t[3],exp=t[4]
if(pos=="+"){if(n2===undefined){v=n1+"0".repeat(exp-1)}else{v=n1+n2+"0".repeat(exp-1-n2.length)}}}
return{__class__:long_int,value:v,pos:value >=0}}
function preformat(self,fmt){if(fmt.empty){return _b_.str.$factory(self)}
if(fmt.type && 'bcdoxXn'.indexOf(fmt.type)==-1){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'int'")}
var res
switch(fmt.type){case undefined:
case "d":
res=self.toString()
break
case "b":
res=(fmt.alternate ? "0b" :"")+BigInt(self.value).toString(2)
break
case "c":
res=_b_.chr(self)
break
case "o":
res=(fmt.alternate ? "0o" :"")+BigInt(self.value).toString(8)
break
case "x":
res=(fmt.alternate ? "0x" :"")+BigInt(self.value).toString(16)
break
case "X":
res=(fmt.alternate ? "0X" :"")+BigInt(self.value).toString(16).toUpperCase()
break
case "n":
return self }
if(fmt.sign !==undefined){if((fmt.sign==" " ||fmt.sign=="+" )&& self >=0){res=fmt.sign+res}}
return res}
long_int.__format__=function(self,format_spec){var fmt=new $B.parse_format_spec(format_spec)
if(fmt.type && 'eEfFgG%'.indexOf(fmt.type)!=-1){
return _b_.float.__format__(self,format_spec)}
fmt.align=fmt.align ||">"
var res=preformat(self,fmt)
if(fmt.comma){var sign=res[0]=="-" ? "-" :"",rest=res.substr(sign.length),len=rest.length,nb=Math.ceil(rest.length/3),chunks=[]
for(var i=0;i < nb;i++){chunks.push(rest.substring(len-3*i-3,len-3*i))}
chunks.reverse()
res=sign+chunks.join(",")}
return $B.format_width(res,fmt)}
long_int.__abs__=function(self){return{__class__:long_int,value:self.value,pos:true}}
long_int.__add__=function(self,other){if(isinstance(other,_b_.float)){return _b_.float.$factory(to_int(self)+other)}
if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}else if(other.__class__ !==long_int){if(isinstance(other,_b_.bool)){other=long_int.$factory(other ? 1 :0)}else if(isinstance(other,int)){
other=long_int.$factory(_b_.str.$factory(_b_.int.__index__(other)))}else{return _b_.NotImplemented}}
if($B.BigInt){return from_BigInt(to_BigInt(self)+to_BigInt(other))}
var res
if(self.pos && other.pos){
return add_pos(self.value,other.value)}else if(! self.pos && ! other.pos){
res=add_pos(self.value,other.value)
res.pos=false
return intOrLong(res)}else if(self.pos && ! other.pos){
switch(comp_pos(self.value,other.value)){case 1:
res=sub_pos(self.value,other.value)
break
case 0:
res={__class__:long_int,value:0,pos:true}
break
case-1:
res=sub_pos(other.value,self.value)
res.pos=false
break}
return intOrLong(res)}else{
switch(comp_pos(self.value,other.value)){case 1:
res=sub_pos(self.value,other.value)
res.pos=false
break
case 0:
res={__class__:long_int,value:0,pos:true}
break
case-1:
res=sub_pos(other.value,self.value)
break}
return intOrLong(res)}}
long_int.__and__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
if($B.BigInt){return from_BigInt(to_BigInt(self)& to_BigInt(other))}
var v1=self.value,v2=other.value,temp1,temp2,res=""
var neg=(! self.pos)&&(! other.pos)
if(neg){self=long_int.__neg__(self)
other=long_int.__neg__(other)}
var b1=binary(self),len1=b1.length,b2=binary(other),len2=b2.length,i=1,res='',x1,x2
while(true){if(i > len1 && i > len2){break}
if(i > len1){x1=self.pos ? "0" :"1"}else{x1=b1.charAt(len1-i)}
if(i > len2){x2=other.pos ? "0" :"1"}else{x2=b2.charAt(len2-i)}
if(x1=="1" && x2=="1"){res="1"+res}else{res="0"+res}
i++}
while(res.charAt(0)=="0"){res=res.substr(1)}
res=$B.long_int.$factory(res,2)
if(neg){res.pos=false}
return intOrLong(res)}
long_int.__divmod__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
var dm=divmod_pos(self.value,other.value)
if(self.pos !==other.pos){if(dm[0].value !="0"){dm[0].pos=false}
if(dm[1].value !="0"){
dm[0]=long_int.__sub__(dm[0],long_int.$factory("1"))
dm[1]=long_int.__sub__(self,long_int.__mul__(other,long_int.$factory(dm[0])))}}
return $B.fast_tuple([intOrLong(dm[0]),intOrLong(dm[1])])}
long_int.__eq__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
return self.value==other.value && self.pos==other.pos}
long_int.__float__=function(self){if(! isFinite(parseFloat(self.value))){throw _b_.OverflowError.$factory("int too big to convert to float")}
return new Number(parseFloat(self.value))}
long_int.__floordiv__=function(self,other){if(isinstance(other,_b_.float)){return _b_.float.$factory(to_int(self)/other)}
if(typeof other=="number" && Math.abs(other)< $B.max_safe_divider){var t=self.value,res=divmod_by_safe_int(t,other),pos=other > 0 ? self.pos :!self.pos
return{__class__:long_int,value:res[0],pos:pos}}
var res=intOrLong(long_int.__divmod__(self,other)[0])
return res}
long_int.__ge__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
if(self.pos !=other.pos){return ! other.pos}
if(self.value.length > other.value.length){return self.pos}
else if(self.value.length < other.value.length){return ! self.pos}
else{return self.pos ? self.value >=other.value :
self.value <=other.value}}
long_int.__gt__=function(self,other){return ! long_int.__le__(self,other)}
long_int.__hash__=function(self){var modulus=$B.fast_long_int("2305843009213693951",true),self_pos=$B.fast_long_int(self.value,true)
var _hash=$B.long_int.__mod__(self_pos,modulus)
if(typeof _hash=="number"){_hash=self.pos ? _hash :-_hash}else{_hash.pos=self.pos}
return self.__hashvalue__=_hash}
long_int.__index__=function(self){
var res='',temp=self.value,d
while(true){d=divmod_pos(temp,"2")
res=d[1].value+res
temp=d[0].value
if(temp=="0"){break}}
if(! self.pos){
var nres="",flag=false
for(var len=res.length-1,i=len;i >=0 ;i--){var bit=res.charAt(i)
if(bit=="0"){if(flag){nres="1"+nres}else{nres="0"+nres}}else{if(flag){nres="0"+nres}
else{flag=true;nres="1"+nres}}}
nres="1"+nres
res=nres}else{res="0"+res}
return intOrLong(res)}
long_int.__invert__=function(self){return long_int.__sub__(long_int.$factory("-1"),self)}
long_int.__le__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
if(self.pos !==other.pos){return ! self.pos}
if(self.value.length > other.value.length){return ! self.pos}
else if(self.value.length < other.value.length){return self.pos}
else{return self.pos ? self.value <=other.value :
self.value >=other.value}}
long_int.__lt__=function(self,other){return !long_int.__ge__(self,other)}
long_int.__lshift__=function(self,shift){if(window.BigInt){if(shift.__class__==long_int){shift=shift.value}
return intOrLong({__class__:long_int,value:(BigInt(self.value)<< BigInt(shift)).toString(),pos:self.pos})}
var is_long=shift.__class__===long_int,shift_safe
if(is_long){var shift_value=parseInt(shift.value)
if(shift_value < 0){throw _b_.ValueError.$factory('negative shift count')}
if(shift_value < $B.max_int){shift_safe=true
shift=shift_value}}
if(shift_safe){if(shift_value==0){return self}}else{shift=long_int.$factory(shift)
if(shift.value=="0"){return self}}
var res=self.value
while(true){var x,carry=0,res1=""
for(var i=res.length-1;i >=0;i--){x=(carry+parseInt(res.charAt(i))*2).toString()
if(x.length==2){res1=x.charAt(1)+res1
carry=parseInt(x.charAt(0))}else{res1=x+res1
carry=0}}
if(carry){res1=carry+res1}
res=res1
if(shift_safe){shift--
if(shift==0){break}}else{shift=sub_pos(shift.value,"1")
if(shift.value=="0"){break}}}
return intOrLong({__class__:long_int,value:res,pos:self.pos})}
long_int.__mod__=function(self,other){return intOrLong(long_int.__divmod__(self,other)[1])}
long_int.__mro__=[_b_.int,_b_.object]
long_int.__mul__=function(self,other){switch(self){case Number.NEGATIVE_INFINITY:
case Number.POSITIVE_INFINITY:
if($B.rich_comp("__eq__",other,0)){return NaN}
else if(_b_.getattr(other,"__gt__")(0)){return self}
else{return-self}}
if(isinstance(other,_b_.float)){return _b_.float.$factory(to_int(self)*other)}
if(typeof other=="number"){other=long_int.$factory(other)}
other_value=other.value
other_pos=other.pos
if(other.__class__ !==long_int && isinstance(other,int)){
var value=int.__index__(other)
other_value=_b_.str.$factory(value)
other_pos=value > 0}
if($B.BigInt){return from_BigInt(to_BigInt(self)*to_BigInt(other))}
var res=mul_pos(self.value,other_value)
if(self.pos==other_pos){return intOrLong(res)}
res.pos=false
return intOrLong(res)}
long_int.__neg__=function(obj){return{__class__:long_int,value:obj.value,pos:! obj.pos}}
long_int.__or__=function(self,other){other=long_int.$factory(other)
var v1=long_int.__index__(self)
var v2=long_int.__index__(other)
if(v1.length < v2.length){var temp=v2;v2=v1;v1=temp}
var start=v1.length-v2.length
var res=v1.substr(0,start)
for(var i=0;i < v2.length;i++){if(v1.charAt(start+i)=="1" ||v2.charAt(i)=="1"){res+="1"}
else{res+="0"}}
return intOrLong(long_int.$factory(res,2))}
long_int.__pos__=function(self){return self}
long_int.__pow__=function(self,power,z){if(typeof power=="number"){power=long_int.$from_int(power)}else if(isinstance(power,int)){
power=long_int.$factory(_b_.str.$factory(_b_.int.__index__(power)))}else if(! isinstance(power,long_int)){var msg="power must be an integer, not '"
throw TypeError.$factory(msg+$B.class_name(power)+"'")}
if(! power.pos){if(self.value=="1"){return self}
return long_int.$factory("0")}else if(power.value=="0"){return long_int.$factory("1")}
if($B.BigInt){var s=$B.BigInt(self.value),b=$B.BigInt(1),x=$B.BigInt(power.value),z=z===undefined ? z :typeof z=="number" ? $B.BigInt(z):
$B.BigInt(z.value)
if(z===undefined){return{
__class__:long_int,value:(s**x).toString(),pos:true}}
while(x > 0){if(x % $B.BigInt(2)==1){b=b*s}
x=x/$B.BigInt(2)
if(x > 0){s=s*s}
if(z !==undefined){b=b % z}}
return{__class__:long_int,value:b.toString(),pos:true}}
var b={__class__:long_int,value:"1",pos:true},s=self,pow=power.value,temp
while(true){if(typeof pow=="string" && parseInt(pow)< $B.max_int){pow=parseInt(pow)}
if(pow==0){break}else if(typeof pow=="string"){if(parseInt(pow.charAt(pow.length-1))% 2==1){b=long_int.__mul__(b,s)}
pow=long_int.__floordiv__(pow,2)}else{if(pow % 2==1){if(typeof b=="number" && typeof s=="number" &&
(temp=b*s)< $B.max_int){b=temp}else{b=long_int.__mul__(long_int.$factory(b),long_int.$factory(s))}}
pow=Math.floor(pow/2)}
if(pow > 0){if(typeof s=="number" &&(temp=s*s)< $B.max_int){s=temp}else{s=long_int.$factory(s)
s=long_int.__mul__(s,s)}}
if(z !==undefined){b=long_int.__mod__(b,z)}}
return intOrLong(b)}
long_int.__rshift__=function(self,shift){if(window.BigInt){if(shift.__class__===long_int){shift=shift.value}
return intOrLong(
{__class__:long_int,value:(BigInt(self.value)>> BigInt(shift)).toString(),pos:self.pos}
)}
if(typeof shift=="number"){var pow2=Math.pow(2,shift)
if(pow2 < $B.max_int){var res=divmod_by_safe_int(self.value,pow2)
return intOrLong({__class__:long_int,value:res[0],pos:self.pos})}}
shift=long_int.$factory(shift)
if(shift.value=="0"){return self}
var res=self.value
while(true){res=divmod_pos(res,"2")[0].value
if(res.value=="0"){break}
shift=sub_pos(shift.value,"1")
if(shift.value=="0"){break}}
return intOrLong({__class__:long_int,value:res,pos:self.pos})}
long_int.__str__=long_int.__repr__=function(self){var res=""
if(! self.pos){res+='-'}
return res+self.value}
long_int.__sub__=function(self,other){if(isinstance(other,_b_.float)){other=other instanceof Number ? other :other.$brython_value
return _b_.float.$factory(to_int(self)-other)}
if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
if($B.BigInt){}
var res
if(self.pos && other.pos){switch(comp_pos(self.value,other.value)){case 1:
res=sub_pos(self.value,other.value)
break
case 0:
res={__class__:long_int,value:"0",pos:true}
break
case-1:
res=sub_pos(other.value,self.value)
res.pos=false
break}
return intOrLong(res)}else if(! self.pos && ! other.pos){switch(comp_pos(self.value,other.value)){case 1:
res=sub_pos(self.value,other.value)
res.pos=false
break
case 0:
res={__class__:long_int,value:"0",pos:true}
break
case-1:
res=sub_pos(other.value,self.value)
break}
return intOrLong(res)}else if(self.pos && ! other.pos){return intOrLong(add_pos(self.value,other.value))}else{res=add_pos(self.value,other.value)
res.pos=false
return intOrLong(res)}}
long_int.__truediv__=function(self,other){if(isinstance(other,long_int)){return _b_.float.$factory(to_int(self)/to_int(other))}else if(isinstance(other,_b_.int)){return _b_.float.$factory(to_int(self)/other)}else if(isinstance(other,_b_.float)){return _b_.float.$factory(to_int(self)/other)}else{throw TypeError.$factory(
"unsupported operand type(s) for /: 'int' and '"+
$B.class_name(other)+"'")}}
long_int.__xor__=function(self,other){other=long_int.$factory(other)
var v1=long_int.__index__(self),v2=long_int.__index__(other)
if(v1.length < v2.length){var temp=v2;v2=v1;v1=temp}
var start=v1.length-v2.length
var res=v1.substr(0,start)
for(var i=0;i < v2.length;i++){if(v1.charAt(start+i)=="1" && v2.charAt(i)=="0"){res+="1"}
else if(v1.charAt(start+i)=="0" && v2.charAt(i)=="1"){res+="1"}
else{res+="0"}}
return intOrLong(long_int.$factory(res,2))}
long_int.bit_length=function(self){return binary(self).length}
long_int.numerator=function(self){return self}
long_int.denominator=function(self){return _b_.int.$factory(1)}
long_int.imag=function(self){return _b_.int.$factory(0)}
long_int.real=function(self){return self}
long_int.to_base=function(self,base){
if(base==2){return binary_pos(self.value)}
var res="",v=self.value
while(v > 0){var dm=divmod_pos(v,base.toString())
res=parseInt(dm[1].value).toString(base)+res
v=dm[0].value
if(v==0){break}}
return res}
long_int.to_bytes=function(self,len,byteorder,signed){
var res=[],v=self.value
if(! $B.$bool(signed)&& ! self.pos){throw _b_.OverflowError.$factory("can't convert negative int to unsigned")}
while(v > 0){var dm=divmod_pos(v,256)
v=parseInt(dm[0].value)
res.push(parseInt(dm[1].value))
if(res.length > len){throw _b_.OverflowError.$factory("int too big to convert")}}
while(res.length < len){res.push(0)}
if(byteorder=='big'){res.reverse()}
return _b_.bytes.$factory(res)}
function digits(base){
var is_digits={}
for(var i=0;i < base;i++){if(i==10){break}
is_digits[i]=true}
if(base > 10){
for(var i=0;i < base-10;i++){is_digits[String.fromCharCode(65+i)]=true
is_digits[String.fromCharCode(97+i)]=true}}
return is_digits}
var MAX_SAFE_INTEGER=Math.pow(2,53)-1
var MIN_SAFE_INTEGER=-MAX_SAFE_INTEGER
function isSafeInteger(n){return(typeof n==="number" &&
Math.round(n)===n &&
MIN_SAFE_INTEGER <=n &&
n <=MAX_SAFE_INTEGER)}
function intOrLong(long){
var v=parseInt(long.value)*(long.pos ? 1 :-1)
if(v > MIN_SAFE_INTEGER && v < MAX_SAFE_INTEGER){return v}
return long}
long_int.$from_int=function(value){return{__class__:long_int,value:value.toString(),pos:value > 0}}
long_int.$factory=function(value,base){if(arguments.length > 2){throw _b_.TypeError.$factory("long_int takes at most 2 arguments ("+
arguments.length+" given)")}
if(base===undefined){base=10}
else if(!isinstance(base,int)){throw TypeError.$factory("'"+$B.class_name(base)+
"' object cannot be interpreted as an integer")}
if(base < 0 ||base==1 ||base > 36){throw ValueError.$factory(
"long_int.$factory() base must be >= 2 and <= 36")}
if(typeof value=="number"){var pos=value >=0,value=Math.abs(value),res
if(isSafeInteger(value)){res=long_int.$from_int(value)}
else if(value.constructor==Number){var s=value.toString(),pos_exp=s.search("e")
if(pos_exp >-1){var mant=s.substr(0,pos_exp),exp=parseInt(s.substr(pos_exp+1)),point=mant.search(/\./)
if(point >-1){var nb_dec=mant.substr(point+1).length
if(nb_dec > exp){var res=mant.substr(0,point)+
mant.substr(point+1).substr(0,exp)
res=long_int.$from_int(res)}else{var res=mant.substr(0,point)+
mant.substr(point+1)+'0'.repeat(exp-nb_dec)
res=long_int.$from_int(res)}}else{res=long_int.$from_int(mant+'0'.repeat(exp))}}else{var point=s.search(/\./)
if(point >-1){res=long_int.$from_int(s.substr(0,point))}else{res=long_int.$from_int(s)}}}
else{throw ValueError.$factory(
"argument of long_int is not a safe integer")}
res.pos=pos
return res}else if(isinstance(value,_b_.float)){if(value===Number.POSITIVE_INFINITY ||
value===Number.NEGATIVE_INFINITY){return value}
if(value >=0){value=new Number(Math.round(value.value))}
else{value=new Number(Math.ceil(value.value))}}else if(isinstance(value,_b_.bool)){if(value.valueOf()){return int.$factory(1)}
return int.$factory(0)}else if(value.__class__===long_int){return value}else if(isinstance(value,int)){
value=value.$brython_value+""}else if(isinstance(value,_b_.bool)){value=_b_.bool.__int__(value)+""}else if(typeof value !="string"){throw ValueError.$factory(
"argument of long_int must be a string, not "+
$B.class_name(value))}
var has_prefix=false,pos=true,start=0
while(value.charAt(0)==" " && value.length){value=value.substr(1)}
while(value.charAt(value.length-1)==" " && value.length){value=value.substr(0,value.length-1)}
if(value.charAt(0)=="+"){has_prefix=true}
else if(value.charAt(0)=="-"){has_prefix=true;pos=false}
if(has_prefix){
if(value.length==1){
throw ValueError.$factory(
'long_int argument is not a valid number: "'+value+'"')}else{value=value.substr(1)}}
while(start < value.length-1 && value.charAt(start)=="0"){start++}
value=value.substr(start)
var is_digits=digits(base),point=-1
for(var i=0;i < value.length;i++){if(value.charAt(i)=="." && point==-1){point=i}else if(false){
var mant=value.substr(0,i)
if(/^[+-]?\d+$/.exec(value.substr(i+1))){exp=parseInt(value.substr(i+1))}else{throw Error("wrong exp "+value.substr(i+1))}
if(point !=-1){mant=mant.substr(0,point)+mant.substr(point+1)
exp=exp+point-1}
point=-1
value=mant+"0".repeat(exp-mant.length)
break}
else if(! is_digits[value.charAt(i)]){throw ValueError.$factory(
'long_int argument is not a valid number: "'+value+'"')}}
if(point !=-1){value=value.substr(0,point)}
if(base !=10){
var coef="1",v10=long_int.$factory(0),ix=value.length
while(ix--){var digit_base10=parseInt(value.charAt(ix),base).toString(),digit_by_coef=mul_pos(coef,digit_base10).value
v10=add_pos(v10.value,digit_by_coef)
coef=mul_pos(coef,base.toString()).value}
return v10}
return{__class__:long_int,value:value,pos:pos}}
function extended_euclidean_algorithm(a,b){
var s=0,old_s=1,t=1,old_t=0,r=b,old_r=a,quotient,tmp
while($B.rich_comp('__ne__',r,0)){quotient=$B.rich_op('floordiv',old_r,r)
tmp=$B.rich_op('sub',old_r,$B.rich_op('mul',quotient,r))
old_r=r
r=tmp
tmp=$B.rich_op('sub',old_s,$B.rich_op('mul',quotient,s))
old_s=s
s=tmp
tmp=$B.rich_op('sub',old_t,$B.rich_op('mul',quotient,t))
old_t=t
t=tmp}
return[old_r,old_s,old_t]}
function inverse_of(n,p){
var gcd,x,y
[gcd,x,y]=extended_euclidean_algorithm(n,p)
if($B.rich_comp('__ne__',gcd,1)){
throw Error(
`${n} has no multiplicative inverse '
            'modulo ${p}`)}else{return $B.rich_op('mod',x,p)}}
$B.inverse_of=inverse_of
$B.set_func_names(long_int,"builtins")
$B.long_int=long_int
$B.fast_long_int=function(value,pos){return{__class__:$B.long_int,value:value,pos:pos}}})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
function $UnsupportedOpType(op,class1,class2){throw _b_.TypeError.$factory("unsupported operand type(s) for "+
op+": '"+class1+"' and '"+class2+"'")}
var complex={__class__:_b_.type,__dir__:_b_.object.__dir__,$infos:{__module__:"builtins",__name__:"complex"},$is_class:true,$native:true,$descriptors:{real:true,imag:true}}
complex.__abs__=function(self){var _rf=isFinite(self.$real),_if=isFinite(self.$imag)
if((_rf && isNaN(self.$imag))||(_if && isNaN(self.$real))||
(isNaN(self.$imag)&& isNaN(self.$real))){return NaN}
if(! _rf ||! _if){return Infinity}
var mag=Math.sqrt(Math.pow(self.$real,2)+Math.pow(self.$imag,2))
if(!isFinite(mag)&& _rf && _if){
throw _b_.OverflowError.$factory("absolute value too large")}
return mag}
complex.__add__=function(self,other){if(_b_.isinstance(other,complex)){return make_complex(self.$real+other.$real,self.$imag+other.$imag)}
if(_b_.isinstance(other,_b_.int)){other=_b_.int.numerator(other)
return make_complex($B.add(self.$real,other.valueOf()),self.$imag)}
if(_b_.isinstance(other,_b_.float)){return make_complex(self.$real+other.valueOf(),self.$imag)}
return _b_.NotImplemented}
complex.__bool__=function(self){return(self.$real !=0 ||self.$imag !=0)}
complex.__complex__=function(self){return self}
complex.__eq__=function(self,other){if(_b_.isinstance(other,complex)){return self.$real.valueOf()==other.$real.valueOf()&&
self.$imag.valueOf()==other.$imag.valueOf()}
if(_b_.isinstance(other,_b_.int)){if(self.$imag !=0){return false}
return self.$real==other.valueOf()}
if(_b_.isinstance(other,_b_.float)){if(self.$imag !=0){return false}
return self.$real==other.valueOf()}
return _b_.NotImplemented}
complex.__hash__=function(self){
return self.$imag*1000003+self.$real}
complex.__init__=function(){return _b_.None}
complex.__invert__=function(self){return ~self}
complex.__mro__=[_b_.object]
complex.__mul__=function(self,other){if(_b_.isinstance(other,complex)){return make_complex(self.$real*other.$real-self.$imag*other.$imag,self.$imag*other.$real+self.$real*other.$imag)}else if(_b_.isinstance(other,_b_.int)){return make_complex(self.$real*other.valueOf(),self.$imag*other.valueOf())}else if(_b_.isinstance(other,_b_.float)){return make_complex(self.$real*other,self.$imag*other)}else if(_b_.isinstance(other,_b_.bool)){if(other.valueOf()){return self}
return make_complex(0,0)}
$UnsupportedOpType("*",complex,other)}
complex.__ne__=function(self,other){var res=complex.__eq__(self,other)
return res===_b_.NotImplemented ? res :! res}
complex.__neg__=function(self){return make_complex(-self.$real,-self.$imag)}
complex.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory('complex.__new__(): not enough arguments')}
var res,missing={},args=$B.args("complex",3,{cls:null,real:null,imag:null},["cls","real","imag"],arguments,{real:0,imag:missing},null,null),$real=args.real,$imag=args.imag
if(typeof $real=="string"){if($imag !==missing){throw _b_.TypeError.$factory("complex() can't take second arg "+
"if first is a string")}else{var arg=$real
$real=$real.trim()
if($real.startsWith("(")&& $real.endsWith(")")){$real=$real.substr(1)
$real=$real.substr(0,$real.length-1)}
var complex_re=/^\s*([\+\-]*[0-9_]*\.?[0-9_]*(e[\+\-]*[0-9_]*)?)([\+\-]?)([0-9_]*\.?[0-9_]*(e[\+\-]*[0-9_]*)?)(j?)\s*$/i
var parts=complex_re.exec($real)
function to_num(s){var res=parseFloat(s.charAt(0)+s.substr(1).replace(/_/g,""))
if(isNaN(res)){throw _b_.ValueError.$factory("could not convert string "+
"to complex: '"+arg+"'")}
return res}
if(parts===null){throw _b_.ValueError.$factory("complex() arg is a malformed string")}else if(parts[_real]=="." ||parts[_imag]=="." ||
parts[_real]==".e" ||parts[_imag]==".e" ||
parts[_real]=="e" ||parts[_imag]=="e"){throw _b_.ValueError.$factory("complex() arg is a malformed string")}else if(parts[_j]!=""){if(parts[_sign]==""){$real=0
if(parts[_real]=="+" ||parts[_real]==""){$imag=1}else if(parts[_real]=='-'){$imag=-1}else{$imag=to_num(parts[_real])}}else{$real=to_num(parts[_real])
$imag=parts[_imag]=="" ? 1 :to_num(parts[_imag])
$imag=parts[_sign]=="-" ?-$imag :$imag}}else{$real=to_num(parts[_real])
$imag=0}
res={__class__:complex,$real:$real ||0,$imag:$imag ||0}
return res}}
$imag=$imag===missing ? 0 :$imag
if(arguments.length==2 && $real.__class__===complex && $imag==0){return $real}
if(_b_.isinstance($real,[_b_.float,_b_.int])&&
_b_.isinstance($imag,[_b_.float,_b_.int])){res={__class__:complex,$real:$real,$imag:$imag}
return res}
var real_to_num=$B.to_num($real,["__complex__","__float__","__index__"])
if(real_to_num===null){throw _b_.TypeError.$factory("complex() first argument must be a "+
" string or a number, not '"+$B.class_name($real)+"'")}
$real=real_to_num
$imag=_convert($imag)
if(! _b_.isinstance($real,_b_.float)&& ! _b_.isinstance($real,_b_.int)&&
! _b_.isinstance($real,_b_.complex)){throw _b_.TypeError.$factory("complex() argument must be a string "+
"or a number")}
if(typeof $imag=="string"){throw _b_.TypeError.$factory("complex() second arg can't be a string")}
if(! _b_.isinstance($imag,_b_.float)&& ! _b_.isinstance($imag,_b_.int)&&
! _b_.isinstance($imag,_b_.complex)&& $imag !==missing){throw _b_.TypeError.$factory("complex() argument must be a string "+
"or a number")}
$imag=complex.__mul__(complex.$factory("1j"),$imag)
return complex.__add__($imag,$real)}
complex.__pos__=function(self){return self}
function complex2expo(cx){var norm=Math.sqrt((cx.$real*cx.$real)+(cx.$imag*cx.$imag)),sin=cx.$imag/norm,cos=cx.$real/norm,angle
if(cos==0){angle=sin==1 ? Math.PI/2 :3*Math.PI/2}
else if(sin==0){angle=cos==1 ? 0 :Math.PI}
else{angle=Math.atan(sin/cos)}
return{norm:norm,angle:angle}}
complex.__pow__=function(self,other){
if(other==1){return self}
var exp=complex2expo(self),angle=exp.angle,res=Math.pow(exp.norm,other)
if(_b_.isinstance(other,[_b_.int,_b_.float])){return make_complex(res*Math.cos(angle*other),res*Math.sin(angle*other))}else if(_b_.isinstance(other,complex)){
var x=other.$real,y=other.$imag
var pw=Math.pow(exp.norm,x)*Math.pow(Math.E,-y*angle),theta=y*Math.log(exp.norm)-x*angle
return make_complex(pw*Math.cos(theta),pw*Math.sin(theta))}else{throw _b_.TypeError.$factory("unsupported operand type(s) "+
"for ** or pow(): 'complex' and '"+
$B.class_name(other)+"'")}}
complex.__radd__=function(self,other){if(_b_.isinstance(other,_b_.bool)){other=other ? 1 :0}
if(_b_.isinstance(other,[_b_.int,_b_.float])){return make_complex(other+self.$real,self.$imag)}
return _b_.NotImplemented}
complex.__repr__=function(self){$B.builtins_repr_check(complex,arguments)
var real=_b_.str.$factory(self.$real),imag=_b_.str.$factory(self.$imag)
if(self.$real instanceof Number && self.$real==parseInt(self.$real)){real=_b_.str.$factory(parseInt(self.$real))}
if(self.$imag instanceof Number && self.$imag==parseInt(self.$imag)){imag=_b_.str.$factory(parseInt(self.$imag))
if(self.$imag==0 && 1/self.$imag===-Infinity){imag="-0"}}
if(self.$real==0){if(1/self.$real < 0){if(imag.startsWith('-')){return "-0"+imag+"j"}
return "-0+"+imag+"j"}else{return imag+"j"}}
if(self.$imag > 0 ||isNaN(self.$imag)){return "("+real+"+"+imag+"j)"}
if(self.$imag==0){if(1/self.$imag < 0){return "("+real+"-0j)"}
return "("+real+"+0j)"}
return "("+real+"-"+_b_.str.$factory(-self.$imag)+"j)"}
complex.__rmul__=function(self,other){if(_b_.isinstance(other,_b_.bool)){other=other ? 1 :0}
if(_b_.isinstance(other,[_b_.int,_b_.float])){return make_complex(other*self.$real,other*self.$imag)}
return _b_.NotImplemented}
complex.__sqrt__=function(self){if(self.$imag==0){return complex(Math.sqrt(self.$real))}
var r=self.$real,i=self.$imag,_a=Math.sqrt((r+sqrt)/2),_b=Number.sign(i)*Math.sqrt((-r+sqrt)/2)
return make_complex(_a,_b)}
complex.__sub__=function(self,other){if(_b_.isinstance(other,complex)){return make_complex(self.$real-other.$real,self.$imag-other.$imag)}
if(_b_.isinstance(other,_b_.int)){other=_b_.int.numerator(other)
return make_complex($B.sub(self.$real,other.valueOf()),self.$imag)}
if(_b_.isinstance(other,_b_.float)){return make_complex(self.$real-other.valueOf(),self.$imag)}
return _b_.NotImplemented}
complex.__truediv__=function(self,other){if(_b_.isinstance(other,complex)){if(other.$real==0 && other.$imag==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
var _num=self.$real*other.$real+self.$imag*other.$imag,_div=other.$real*other.$real+other.$imag*other.$imag
var _num2=self.$imag*other.$real-self.$real*other.$imag
return make_complex(_num/_div,_num2/_div)}
if(_b_.isinstance(other,_b_.int)){if(! other.valueOf()){throw _b_.ZeroDivisionError.$factory('division by zero')}
return complex.__truediv__(self,complex.$factory(other.valueOf()))}
if(_b_.isinstance(other,_b_.float)){if(! other.valueOf()){throw _b_.ZeroDivisionError.$factory("division by zero")}
return complex.__truediv__(self,complex.$factory(other.valueOf()))}
$UnsupportedOpType("//","complex",other.__class__)}
complex.conjugate=function(self){return make_complex(self.$real,-self.$imag)}
complex.__ior__=complex.__or__
var r_opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or"]
for(var r_opname of r_opnames){if(complex["__r"+r_opname+"__"]===undefined &&
complex['__'+r_opname+'__']){complex["__r"+r_opname+"__"]=(function(name){return function(self,other){if(_b_.isinstance(other,[_b_.int,_b_.float])){other=make_complex(other,0)
return complex["__"+name+"__"](other,self)}else if(_b_.isinstance(other,complex)){return complex["__"+name+"__"](other,self)}
return _b_.NotImplemented}})(r_opname)}}
var $comp_func=function(self,other){if(other===undefined ||other==_b_.None){return _b_.NotImplemented}
throw _b_.TypeError.$factory("TypeError: no ordering relation "+
"is defined for complex numbers")}
$comp_func+='' 
for(var $op in $B.$comps){eval("complex.__"+$B.$comps[$op]+"__ = "+
$comp_func.replace(/>/gm,$op))}
complex.real=function(self){return new Number(self.$real)}
complex.real.setter=function(){throw _b_.AttributeError.$factory("readonly attribute")}
complex.imag=function(self){return new Number(self.$imag)}
complex.imag.setter=function(){throw _b_.AttributeError.$factory("readonly attribute")}
var _real=1,_real_mantissa=2,_sign=3,_imag=4,_imag_mantissa=5,_j=6
var type_conversions=["__complex__","__float__","__index__"]
var _convert=function(num){var klass=num.__class__ ||$B.get_class(num)
for(var i=0;i < type_conversions.length;i++){var missing={},method=$B.$getattr(klass,type_conversions[i],missing)
if(method !==missing){return method(num)}}
return null}
var make_complex=$B.make_complex=function(real,imag){return{
__class__:complex,$real:real,$imag:imag}}
complex.$factory=function(){return complex.__new__(complex,...arguments)}
$B.set_func_names(complex,"builtins")
_b_.complex=complex})(__BRYTHON__)
;
;(function($B){
var DEFAULT_MIN_MERGE=32
var DEFAULT_MIN_GALLOPING=7
var DEFAULT_TMP_STORAGE_LENGTH=256
var POWERS_OF_TEN=[1e0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9]
function log10(x){if(x < 1e5){if(x < 1e2){return x < 1e1 ? 0 :1}
if(x < 1e4){return x < 1e3 ? 2 :3}
return 4}
if(x < 1e7){return x < 1e6 ? 5 :6}
if(x < 1e9){return x < 1e8 ? 7 :8}
return 9}
function alphabeticalCompare(a,b){if(a===b){return 0}
if(~~a===a && ~~b===b){if(a===0 ||b===0){return a < b ?-1 :1}
if(a < 0 ||b < 0){if(b >=0){return-1}
if(a >=0){return 1}
a=-a
b=-b}
al=log10(a)
bl=log10(b)
var t=0
if(al < bl){a*=POWERS_OF_TEN[bl-al-1]
b/=10
t=-1}else if(al > bl){b*=POWERS_OF_TEN[al-bl-1]
a/=10;
t=1;}
if(a===b){return t}
return a < b ?-1 :1}
var aStr=String(a)
var bStr=String(b)
if(aStr===bStr){return 0}
return aStr < bStr ?-1 :1}
function minRunLength(n){var r=0
while(n >=DEFAULT_MIN_MERGE){r |=(n & 1)
n >>=1}
return n+r}
function makeAscendingRun(array,lo,hi,compare){var runHi=lo+1
if(runHi===hi){return 1;}
if(compare(array[runHi++],array[lo])< 0){while(runHi < hi && compare(array[runHi],array[runHi-1])< 0){runHi++}
reverseRun(array,lo,runHi)}else{while(runHi < hi && compare(array[runHi],array[runHi-1])>=0){runHi++}}
return runHi-lo}
function reverseRun(array,lo,hi){hi--
while(lo < hi){var t=array[lo]
array[lo++]=array[hi]
array[hi--]=t}}
function binaryInsertionSort(array,lo,hi,start,compare){if(start===lo){start++}
for(;start < hi;start++){var pivot=array[start]
var left=lo
var right=start
while(left < right){var mid=(left+right)>>> 1
if(compare(pivot,array[mid])< 0){right=mid}else{left=mid+1}}
var n=start-left
switch(n){case 3:
array[left+3]=array[left+2]
case 2:
array[left+2]=array[left+1]
case 1:
array[left+1]=array[left]
break;
default:
while(n > 0){array[left+n]=array[left+n-1]
n--;}}
array[left]=pivot}}
function gallopLeft(value,array,start,length,hint,compare){var lastOffset=0,maxOffset=0,offset=1
if(compare(value,array[start+hint])> 0){maxOffset=length-hint
while(offset < maxOffset && compare(value,array[start+hint+offset])> 0){lastOffset=offset
offset=(offset << 1)+1
if(offset <=0){offset=maxOffset}}
if(offset > maxOffset){offset=maxOffset}
lastOffset+=hint
offset+=hint}else{maxOffset=hint+1
while(offset < maxOffset && compare(value,array[start+hint-offset])<=0){lastOffset=offset
offset=(offset << 1)+1
if(offset <=0){offset=maxOffset}}
if(offset > maxOffset){offset=maxOffset}
var tmp=lastOffset
lastOffset=hint-offset
offset=hint-tmp}
lastOffset++
while(lastOffset < offset){var m=lastOffset+((offset-lastOffset)>>> 1)
if(compare(value,array[start+m])> 0){lastOffset=m+1}else{offset=m}}
return offset}
function gallopRight(value,array,start,length,hint,compare){var lastOffset=0,maxOffset=0,offset=1
if(compare(value,array[start+hint])< 0){maxOffset=hint+1
while(offset < maxOffset && compare(value,array[start+hint-offset])< 0){lastOffset=offset
offset=(offset << 1)+1
if(offset <=0){offset=maxOffset}}
if(offset > maxOffset){offset=maxOffset}
var tmp=lastOffset
lastOffset=hint-offset
offset=hint-tmp}else{maxOffset=length-hint
while(offset < maxOffset && compare(value,array[start+hint+offset])>=0){lastOffset=offset
offset=(offset << 1)+1
if(offset <=0){offset=maxOffset}}
if(offset > maxOffset){offset=maxOffset}
lastOffset+=hint
offset+=hint}
lastOffset++
while(lastOffset < offset){var m=lastOffset+((offset-lastOffset)>>> 1)
if(compare(value,array[start+m])< 0){offset=m}else{lastOffset=m+1}}
return offset}
var TIM_SORT_ASSERTION="TimSortAssertion"
var TimSortAssertion=function(message){this.name=TIM_SORT_ASSERTION
this.message=message}
var TimSort=function(array,compare){var self={array:array,compare:compare,minGallop:DEFAULT_MIN_GALLOPING,length :array.length,tmpStorageLength:DEFAULT_TMP_STORAGE_LENGTH,stackLength:0,runStart:null,runLength:null,stackSize:0,
pushRun:function(runStart,runLength){this.runStart[this.stackSize]=runStart
this.runLength[this.stackSize]=runLength
this.stackSize+=1},
mergeRuns:function(){while(this.stackSize > 1){var n=this.stackSize-2
if((n >=1 && this.runLength[n-1]<=
this.runLength[n]+this.runLength[n+1])||
(n >=2 && this.runLength[n-2]<=
this.runLength[n]+this.runLength[n-1])){if(this.runLength[n-1]< this.runLength[n+1]){n--}}else if(this.runLength[n]> this.runLength[n+1]){break}
this.mergeAt(n)}},
forceMergeRuns:function(){while(this.stackSize > 1){var n=this.stackSize-2
if(n > 0 && this.runLength[n-1]< this.runLength[n+1]){n--}
this.mergeAt(n)}},
mergeAt:function(i){var compare=this.compare,array=this.array,start1=this.runStart[i],length1=this.runLength[i],start2=this.runStart[i+1],length2=this.runLength[i+1]
this.runLength[i]=length1+length2
if(i===this.stackSize-3){this.runStart[i+1]=this.runStart[i+2]
this.runLength[i+1]=this.runLength[i+2]}
this.stackSize--;
var k=gallopRight(array[start2],array,start1,length1,0,compare)
start1+=k
length1-=k
if(length1===0){return}
length2=gallopLeft(array[start1+length1-1],array,start2,length2,length2-1,compare)
if(length2===0){return}
if(length1 <=length2){this.mergeLow(start1,length1,start2,length2)}else{this.mergeHigh(start1,length1,start2,length2)}},
mergeLow:function(start1,length1,start2,length2){var compare=this.compare,array=this.array,tmp=this.tmp,i=0
for(var i=0;i < length1;i++){tmp[i]=array[start1+i]}
var cursor1=0,cursor2=start2,dest=start1
array[dest++]=array[cursor2++]
if(--length2===0){for(var i=0;i < length1;i++){array[dest+i]=tmp[cursor1+i]}
return}
if(length1===1){for(var i=0;i < length2;i++){array[dest+i]=array[cursor2+i]}
array[dest+length2]=tmp[cursor1]
return}
var minGallop=this.minGallop
while(true){var count1=0,count2=0,exit=false
do{if(compare(array[cursor2],tmp[cursor1])< 0){array[dest++]=array[cursor2++]
count2++
count1=0
if(--length2===0){exit=true
break}}else{array[dest++]=tmp[cursor1++]
count1++
count2=0
if(--length1===1){exit=true
break}}}while((count1 |count2)< minGallop)
if(exit){break}
do{
count1=gallopRight(array[cursor2],tmp,cursor1,length1,0,compare)
if(count1 !==0){for(var i=0;i < count1;i++){array[dest+i]=tmp[cursor1+i]}
dest+=count1
cursor1+=count1
length1-=count1
if(length1 <=1){exit=true
break}}
array[dest++]=array[cursor2++]
if(--length2===0){exit=true
break}
count2=gallopLeft(tmp[cursor1],array,cursor2,length2,0,compare)
if(count2 !==0){for(var i=0;i < count2;i++){array[dest+i]=array[cursor2+i]}
dest+=count2
cursor2+=count2
length2-=count2
if(length2===0){exit=true
break}}
array[dest++]=tmp[cursor1++]
if(--length1===1){exit=true
break}
minGallop--;}while(count1 >=DEFAULT_MIN_GALLOPING ||
count2 >=DEFAULT_MIN_GALLOPING);
if(exit){break}
if(minGallop < 0){minGallop=0}
minGallop+=2}
this.minGallop=minGallop
if(minGallop < 1){this.minGallop=1}
if(length1===1){for(var i=0;i < length2;i++){array[dest+i]=array[cursor2+i]}
array[dest+length2]=tmp[cursor1]}else if(length1===0){throw new TimSortAssertion('mergeLow preconditions were not respected')}else{for(var i=0;i < length1;i++){array[dest+i]=tmp[cursor1+i]}}},
mergeHigh:function(start1,length1,start2,length2){var compare=this.compare,array=this.array,tmp=this.tmp,i=0
for(var i=0;i < length2;i++){tmp[i]=array[start2+i]}
var cursor1=start1+length1-1,cursor2=length2-1,dest=start2+length2-1,customCursor=0,customDest=0
array[dest--]=array[cursor1--]
if(--length1===0){customCursor=dest-(length2-1)
for(var i=0;i < length2;i++){array[customCursor+i]=tmp[i]}
return}
if(length2===1){dest-=length1
cursor1-=length1
customDest=dest+1
customCursor=cursor1+1
for(var i=length1-1;i >=0;i--){array[customDest+i]=array[customCursor+i]}
array[dest]=tmp[cursor2]
return}
var minGallop=this.minGallop
while(true){var count1=0,count2=0,exit=false
do{if(compare(tmp[cursor2],array[cursor1])< 0){array[dest--]=array[cursor1--]
count1++
count2=0
if(--length1===0){exit=true
break}}else{array[dest--]=tmp[cursor2--]
count2++
count1=0
if(--length2===1){exit=true
break}}}while((count1 |count2)< minGallop)
if(exit){break}
do{count1=length1-gallopRight(tmp[cursor2],array,start1,length1,length1-1,compare)
if(count1 !==0){dest-=count1
cursor1-=count1
length1-=count1
customDest=dest+1
customCursor=cursor1+1
for(var i=count1-1;i >=0;i--){array[customDest+i]=array[customCursor+i]}
if(length1===0){exit=true
break}}
array[dest--]=tmp[cursor2--]
if(--length2===1){exit=true
break}
count2=length2-gallopLeft(array[cursor1],tmp,0,length2,length2-1,compare)
if(count2 !==0){dest-=count2
cursor2-=count2
length2-=count2
customDest=dest+1
customCursor=cursor2+1
for(var i=0;i < count2;i++){array[customDest+i]=tmp[customCursor+i]}
if(length2 <=1){exit=true
break}}
array[dest--]=array[cursor1--]
if(--length1===0){exit=true
break}
minGallop--}while(count1 >=DEFAULT_MIN_GALLOPING ||
count2 >=DEFAULT_MIN_GALLOPING)
if(exit){break}
if(minGallop < 0){minGallop=0}
minGallop+=2}
this.minGallop=minGallop
if(minGallop < 1){this.minGallop=1}
if(length2===1){dest-=length1
cursor1-=length1
customDest=dest+1
customCursor=cursor1+1
for(var i=length1-1;i >=0;i--){array[customDest+i]=array[customCursor+i]}
array[dest]=tmp[cursor2]}else if(length2==0){throw new TimSortAssertion("mergeHigh preconditions were not respected")}else{customCursor=dest-(length2-1)
for(var i=0;i < length2;i++){array[customCursor+i]=tmp[i]}}}}
if(self.length < 2*DEFAULT_TMP_STORAGE_LENGTH){self.tmpStorageLength=self.length >>> 1}
self.tmp=new Array(self.tmpStorageLength)
self.stackLength=
(self.length < 120 ? 5 :
self.length < 1542 ? 10 :
self.length < 119151 ? 19 :40)
self.runStart=new Array(self.stackLength)
self.runLength=new Array(self.stackLength)
return self}
function tim_sort(array,compare,lo,hi){if(!Array.isArray(array)){throw TypeError.$factory("Can only sort arrays")}
if(!compare){compare=alphabeticalCompare}else if(typeof compare !=="function"){hi=lo
lo=compare
compare=alphabeticalCompare}
if(!lo){lo=0}
if(!hi){hi=array.length}
var remaining=hi-lo
if(remaining < 2){return}
var runLength=0
if(remaining < DEFAULT_MIN_MERGE){runLength=makeAscendingRun(array,lo,hi,compare)
binaryInsertionSort(array,lo,hi,lo+runLength,compare)
return}
var ts=new TimSort(array,compare)
var minRun=minRunLength(remaining)
do{runLength=makeAscendingRun(array,lo,hi,compare)
if(runLength < minRun){var force=remaining
if(force > minRun){force=minRun}
binaryInsertionSort(array,lo,lo+force,lo+runLength,compare)
runLength=force}
ts.pushRun(lo,runLength)
ts.mergeRuns()
remaining-=runLength
lo+=runLength}while(remaining !==0)
ts.forceMergeRuns()}
function tim_sort_safe(array,compare){
try{
tim_sort(array,compare,0,array.length)}catch(e){if(e.name==TIM_SORT_ASSERTION){array.sort(compare);}else{
throw e;}}}
$B.$TimSort=tim_sort_safe
$B.$AlphabeticalCompare=alphabeticalCompare})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins,object=_b_.object,getattr=$B.$getattr,isinstance=_b_.isinstance,$N=_b_.None
function check_not_tuple(self,attr){if(self.__class__===tuple){throw _b_.AttributeError.$factory(
"'tuple' object has no attribute '"+attr+"'")}}
function $list(){
return list.$factory.apply(null,arguments)}
var list={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"list"},$is_class:true,$native:true,__dir__:object.__dir__}
list.__add__=function(self,other){if($B.get_class(self)!==$B.get_class(other)){var this_name=$B.class_name(self)
var radd=$B.$getattr(other,'__radd__',null)
if(radd===null){throw _b_.TypeError.$factory('can only concatenate '+
this_name+' (not "'+$B.class_name(other)+
'") to '+this_name)}
return _b_.NotImplemented}
var res=self.slice(),is_js=other.$brython_class=="js" 
for(const item of other){res.push(is_js ? $B.$JS2Py(item):item)}
res.__brython__=true
if(isinstance(self,tuple)){res=tuple.$factory(res)}
return res}
list.__class_getitem__=function(cls,item){
if(! Array.isArray(item)){item=[item]}
return $B.GenericAlias.$factory(cls,item)}
list.__contains__=function(self,item){var $=$B.args("__contains__",2,{self:null,item:null},["self","item"],arguments,{},null,null),self=$.self,item=$.item
var _eq=function(other){return $B.rich_comp("__eq__",item,other)}
var i=0
while(i < self.length){if(_eq(self[i])){return true}
i++}
return false}
list.__delitem__=function(self,arg){if(isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos=self.length+pos}
if(pos >=0 && pos < self.length){self.splice(pos,1)
return $N}
throw _b_.IndexError.$factory($B.class_name(self)+
" index out of range")}
if(isinstance(arg,_b_.slice)){var step=arg.step
if(step===$N){step=1}
var start=arg.start
if(start===$N){start=step > 0 ? 0 :self.length}
var stop=arg.stop
if(stop===$N){stop=step > 0 ? self.length :0}
if(start < 0){start=self.length+start}
if(stop < 0){stop=self.length+stop}
var res=[],i=null,pos=0
if(step > 0){if(stop > start){for(var i=start;i < stop;i+=step){if(self[i]!==undefined){res[pos++]=i}}}}else{if(stop < start){for(var i=start;i > stop;i+=step){if(self[i]!==undefined){res[pos++]=i}}
res.reverse()}}
var i=res.length
while(i--){self.splice(res[i],1)}
return $N}
if(_b_.hasattr(arg,"__int__")||_b_.hasattr(arg,"__index__")){list.__delitem__(self,_b_.int.$factory(arg))
return $N}
throw _b_.TypeError.$factory($B.class_name(self)+
" indices must be integer, not "+$B.class_name(arg))}
list.__eq__=function(self,other){if(isinstance(self,list)){var klass=list}else{var klass=tuple}
if(isinstance(other,klass)){if(other.length==self.length){var i=self.length
while(i--){if(! $B.rich_comp("__eq__",self[i],other[i])){return false}}
return true}}
return _b_.NotImplemented}
list.__getitem__=function(self,key){
$B.check_no_kw("__getitem__",self,key)
$B.check_nb_args("__getitem__",2,arguments)
return list.$getitem(self,key)}
list.$getitem=function(self,key){var klass=(self.__class__ ||$B.get_class(self))
var factory=function(list_res){list_res.__class__=klass
return list_res}
var int_key
try{int_key=$B.PyNumber_Index(key)}catch(err){}
if(int_key !==undefined){var items=self.valueOf(),pos=int_key
if(int_key < 0){pos=items.length+pos}
if(pos >=0 && pos < items.length){return items[pos]}
throw _b_.IndexError.$factory($B.class_name(self)+
" index out of range")}
if(key.__class__===_b_.slice ||isinstance(key,_b_.slice)){
if(key.start===_b_.None && key.stop===_b_.None &&
key.step===_b_.None){return self.slice()}
var s=_b_.slice.$conv_for_seq(key,self.length)
var res=[],i=null,items=self.valueOf(),pos=0,start=s.start,stop=s.stop,step=s.step
if(step > 0){if(stop <=start){return factory(res)}
for(var i=start;i < stop;i+=step){res[pos++]=items[i]}
return factory(res)}else{if(stop > start){return factory(res)}
for(var i=start;i > stop;i+=step){res[pos++]=items[i]}
return factory(res)}}
throw _b_.TypeError.$factory($B.class_name(self)+
" indices must be integer, not "+$B.class_name(key))}
list.__ge__=function(self,other){if(! isinstance(other,[list,_b_.tuple])){return _b_.NotImplemented}
var i=0
while(i < self.length){if(i >=other.length){return true}
if($B.rich_comp("__eq__",self[i],other[i])){i++}
else{res=getattr(self[i],"__ge__")(other[i])
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(self[i])+"() >= "+
$B.class_name(other[i])+"()")}else{return res}}}
return other.length==self.length}
list.__gt__=function(self,other){if(! isinstance(other,[list,_b_.tuple])){return _b_.NotImplemented}
var i=0
while(i < self.length){if(i >=other.length){return true}
if($B.rich_comp("__eq__",self[i],other[i])){i++}
else{res=getattr(self[i],"__gt__")(other[i])
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(self[i])+"() > "+
$B.class_name(other[i])+"()")}else return res}}
return false}
list.__hash__=$N
list.__iadd__=function(){var $=$B.args("__iadd__",2,{self:null,x:null},["self","x"],arguments,{},null,null)
var x=list.$factory($B.$iter($.x))
for(var i=0;i < x.length;i++){$.self.push(x[i])}
return $.self}
list.__imul__=function(){var $=$B.args("__imul__",2,{self:null,x:null},["self","x"],arguments,{},null,null),x=$B.$GetInt($.x),len=$.self.length,pos=len
if(x==0){list.clear($.self);return $.self}
for(var i=1;i < x;i++){for(j=0;j < len;j++){$.self[pos++]=$.self[j]}}
return $.self}
list.__init__=function(self,arg){var $=$B.args('__init__',1,{self:null},['self'],arguments,{},'args',null),self=$.self,args=$.args
if(args.length > 1){throw _b_.TypeError.$factory('expected at most 1 argument, got '+
args.length)}
var arg=args[0]
var len_func=$B.$call($B.$getattr(self,"__len__")),pop_func=$B.$getattr(self,"pop",$N)
if(pop_func !==$N){pop_func=$B.$call(pop_func)
while(len_func()){pop_func()}}
if(arg===undefined){return $N}
var arg=$B.$iter(arg),next_func=$B.$call($B.$getattr(arg,"__next__")),pos=len_func()
while(1){try{var res=next_func()
self[pos++]=res}catch(err){if(err.__class__===_b_.StopIteration){break}
else{throw err}}}
return $N}
var list_iterator=$B.make_iterator_class("list_iterator")
list_iterator.__reduce__=list_iterator.__reduce_ex__=function(self){return $B.fast_tuple([_b_.iter,$B.fast_tuple([list.$factory(self)]),0])}
list.__iter__=function(self){return list_iterator.$factory(self)}
list.__le__=function(self,other){var res=list.__ge__(self,other)
if(res===_b_.NotImplemented){return res}
return ! res}
list.__len__=function(self){return self.length}
list.__lt__=function(self,other){if(! isinstance(other,[list,_b_.tuple])){return _b_.NotImplemented}
var i=0
while(i < self.length){if(i >=other.length){return false}
if($B.rich_comp("__eq__",self[i],other[i])){i++}else{res=getattr(self[i],"__lt__")(other[i])
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(self[i])+"() >= "+
$B.class_name(other[i])+"()")}else{return res}}}
return other.length > self.length}
list.__mul__=function(self,other){if(isinstance(other,_b_.int)){other=_b_.int.numerator(other)
var res=[],$temp=self.slice(),len=$temp.length
for(var i=0;i < other;i++){for(var j=0;j < len;j++){res.push($temp[j])}}
res.__class__=self.__class__
return res}
if(_b_.hasattr(other,"__int__")||_b_.hasattr(other,"__index__")){return list.__mul__(self,_b_.int.$factory(other))}
var rmul=$B.$getattr(other,'__rmul__',null)
if(rmul===null){throw _b_.TypeError.$factory(`can't multiply sequence by non-int `+
`of type '${$B.class_name(other)}'`)}
return _b_.NotImplemented}
list.__new__=function(cls,...args){if(cls===undefined){throw _b_.TypeError.$factory("list.__new__(): not enough arguments")}
var res=[]
res.__class__=cls
res.__brython__=true
res.__dict__=$B.empty_dict()
return res}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=args.slice(1)
res.__class__=args[0]
return res}
list.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__]),_b_.None,_b_.iter(self)])}
list.__repr__=function(self){$B.builtins_repr_check(list,arguments)
return list_repr(self)}
function list_repr(self){
if($B.repr.enter(self)){
return '[...]'}
var _r=[],res
for(var i=0;i < self.length;i++){_r.push(_b_.repr(self[i]))}
if(_b_.isinstance(self,tuple)){if(self.length==1){res="("+_r[0]+",)"}else{res="("+_r.join(", ")+")"}}else{res="["+_r.join(", ")+"]"}
$B.repr.leave(self)
return res}
list.__rmul__=function(self,other){return list.__mul__(self,other)}
list.__setattr__=function(self,attr,value){if(self.__class__===list ||self.__class__===tuple){var cl_name=$B.class_name(self)
if(list.hasOwnProperty(attr)){throw _b_.AttributeError.$factory("'"+cl_name+
"' object attribute '"+attr+"' is read-only")}else{throw _b_.AttributeError.$factory(
"'"+cl_name+" object has no attribute '"+attr+"'")}}
_b_.dict.$setitem(self.__dict__,attr,value)
return $N}
list.__setitem__=function(){var $=$B.args("__setitem__",3,{self:null,key:null,value:null},["self","key","value"],arguments,{},null,null),self=$.self,arg=$.key,value=$.value
list.$setitem(self,arg,value)}
list.$setitem=function(self,arg,value){
if(typeof arg=="number" ||isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos=self.length+pos}
if(pos >=0 && pos < self.length){self[pos]=value}else{throw _b_.IndexError.$factory("list index out of range")}
return $N}
if(isinstance(arg,_b_.slice)){var s=_b_.slice.$conv_for_seq(arg,self.length)
if(arg.step===null){$B.set_list_slice(self,s.start,s.stop,value)}else{$B.set_list_slice_step(self,s.start,s.stop,s.step,value)}
return $N}
if(_b_.hasattr(arg,"__int__")||_b_.hasattr(arg,"__index__")){list.__setitem__(self,_b_.int.$factory(arg),value)
return $N}
throw _b_.TypeError.$factory("list indices must be integer, not "+
$B.class_name(arg))}
list.append=function(self,x){$B.check_no_kw("append",self,x)
$B.check_nb_args("append",2,arguments)
self.push(x)
return $N}
list.clear=function(){var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null)
while($.self.length){$.self.pop()}
return $N}
list.copy=function(){var $=$B.args("copy",1,{self:null},["self"],arguments,{},null,null)
return $.self.slice()}
list.count=function(){var $=$B.args("count",2,{self:null,x:null},["self","x"],arguments,{},null,null)
var res=0,_eq=function(other){return $B.rich_comp("__eq__",$.x,other)},i=$.self.length
while(i--){if(_eq($.self[i])){res++}}
return res}
list.extend=function(){var $=$B.args("extend",2,{self:null,t:null},["self","t"],arguments,{},null,null)
var other=list.$factory($B.$iter($.t))
for(var i=0;i < other.length;i++){$.self.push(other[i])}
return $N}
list.index=function(){var missing={},$=$B.args("index",4,{self:null,x:null,start:null,stop:null},["self","x","start" ,"stop"],arguments,{start:0,stop:missing},null,null),self=$.self,start=$.start,stop=$.stop
var _eq=function(other){return $B.rich_comp("__eq__",$.x,other)}
if(start.__class__===$B.long_int){start=parseInt(start.value)*(start.pos ? 1 :-1)}
if(start < 0){start=Math.max(0,start+self.length)}
if(stop===missing){stop=self.length}
else{if(stop.__class__===$B.long_int){stop=parseInt(stop.value)*(stop.pos ? 1 :-1)}
if(stop < 0){stop=Math.min(self.length,stop+self.length)}
stop=Math.min(stop,self.length)}
for(var i=start;i < stop;i++){if(_eq(self[i])){return i}}
throw _b_.ValueError.$factory(_b_.repr($.x)+" is not in "+
$B.class_name(self))}
list.insert=function(){var $=$B.args("insert",3,{self:null,i:null,item:null},["self","i","item"],arguments,{},null,null)
$.self.splice($.i,0,$.item)
return $N}
list.pop=function(){var missing={}
var $=$B.args("pop",2,{self:null,pos:null},["self","pos"],arguments,{pos:missing},null,null),self=$.self,pos=$.pos
check_not_tuple(self,"pop")
if(pos===missing){pos=self.length-1}
pos=$B.$GetInt(pos)
if(pos < 0){pos+=self.length}
var res=self[pos]
if(res===undefined){throw _b_.IndexError.$factory("pop index out of range")}
self.splice(pos,1)
return res}
list.remove=function(){var $=$B.args("remove",2,{self:null,x:null},["self","x"],arguments,{},null,null)
for(var i=0,len=$.self.length;i < len;i++){if($B.rich_comp("__eq__",$.self[i],$.x)){$.self.splice(i,1)
return $N}}
throw _b_.ValueError.$factory(_b_.str.$factory($.x)+" is not in list")}
list.reverse=function(self){var $=$B.args("reverse",1,{self:null},["self"],arguments,{},null,null),_len=$.self.length-1,i=parseInt($.self.length/2)
while(i--){var buf=$.self[i]
$.self[i]=$.self[_len-i]
$.self[_len-i]=buf}
return $N}
function $partition(arg,array,begin,end,pivot)
{var piv=array[pivot]
array=swap(array,pivot,end-1)
var store=begin
if(arg===null){if(array.$cl !==false){
var le_func=_b_.getattr(array.$cl,"__le__")
for(var ix=begin;ix < end-1;++ix){if(le_func(array[ix],piv)){array=swap(array,store,ix);
++store}}}else{for(var ix=begin;ix < end-1;++ix){if(getattr(array[ix],"__le__")(piv)){array=swap(array,store,ix)
++store}}}}else{var len=array.length
for(var ix=begin;ix < end-1;++ix){var x=arg(array[ix])
if(array.length !==len){throw _b_.ValueError.$factory("list modified during sort")}
if(getattr(x,"__le__")(arg(piv))){array=swap(array,store,ix)
++store}}}
array=swap(array,end-1,store)
return store}
function swap(_array,a,b){var tmp=_array[a]
_array[a]=_array[b]
_array[b]=tmp
return _array}
function $qsort(arg,array,begin,end){if(end-1 > begin){var pivot=begin+Math.floor(Math.random()*(end-begin))
pivot=$partition(arg,array,begin,end,pivot)
$qsort(arg,array,begin,pivot)
$qsort(arg,array,pivot+1,end)}}
function $elts_class(self){
if(self.length==0){return null}
var cl=$B.get_class(self[0]),i=self.length
while(i--){if($B.get_class(self[i])!==cl){return false}}
return cl}
list.sort=function(self){var $=$B.args("sort",1,{self:null},["self"],arguments,{},null,"kw")
check_not_tuple(self,"sort")
var func=$N,reverse=false,kw_args=$.kw,keys=_b_.list.$factory(_b_.dict.$$keys(kw_args))
for(var i=0;i < keys.length;i++){if(keys[i]=="key"){func=kw_args.$string_dict[keys[i]][0]}else if(keys[i]=="reverse"){reverse=kw_args.$string_dict[keys[i]][0]}else{throw _b_.TypeError.$factory("'"+keys[i]+
"' is an invalid keyword argument for this function")}}
if(self.length==0){return}
if(func !==$N){func=$B.$call(func)}
self.$cl=$elts_class(self)
var cmp=null;
if(func===$N && self.$cl===_b_.str){if(reverse){cmp=function(b,a){return $B.$AlphabeticalCompare(a,b)}}else{cmp=function(a,b){return $B.$AlphabeticalCompare(a,b)}}}else if(func===$N && self.$cl===_b_.int){if(reverse){cmp=function(b,a){return a-b}}else{cmp=function(a,b){return a-b}}}else{if(func===$N){if(reverse){cmp=function(b,a){res=getattr(a,"__lt__")(b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(b)+"() < "+
$B.class_name(a)+"()")}
if(res){if(a==b){return 0}
return-1}
return 1}}else{cmp=function(a,b){res=getattr(a,"__lt__")(b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(a)+"() < "+
$B.class_name(b)+"()")}
if(res){if(a==b){return 0}
return-1}
return 1}}}else{if(reverse){cmp=function(b,a){var _a=func(a),_b=func(b)
res=getattr(_a,"__lt__")(_b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(b)+"() < "+
$B.class_name(a)+"()")}
if(res){if(_a==_b){return 0}
return-1}
return 1}}else{cmp=function(a,b){var _a=func(a),_b=func(b)
res=$B.$getattr(_a,"__lt__")(_b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(a)+"() < "+
$B.class_name(b)+"()")}
if(res){if(_a==_b){return 0}
return-1}
return 1}}}}
$B.$TimSort(self,cmp)
return(self.__brython__ ? $N :self)}
$B.$list=function(t){t.__brython__=true
t.__class__=_b_.list
return t}
list.$factory=function(){if(arguments.length==0){return[]}
var $=$B.args("list",1,{obj:null},["obj"],arguments,{},null,null),obj=$.obj
if(Array.isArray(obj)){
obj=obj.slice()
obj.__brython__=true;
if(obj.__class__==tuple){var res=obj.slice()
res.__class__=list
return res}
return obj}
var res=[],pos=0,arg=$B.$iter(obj),next_func=$B.$call(getattr(arg,"__next__"))
while(1){try{res[pos++]=next_func()}catch(err){if(!isinstance(err,_b_.StopIteration)){throw err}
break}}
res.__brython__=true 
return res}
$B.set_func_names(list,"builtins")
list.__class_getitem__=_b_.classmethod.$factory(list.__class_getitem__)
var JSArray=$B.JSArray=$B.make_class("JSArray",function(array){return{
__class__:JSArray,js:array}}
)
JSArray.__repr__=JSArray.__str__=function(){return "<JSArray object>"}
function make_args(args){var res=[args[0].js]
for(var i=1,len=args.length;i < len;i++){res.push(args[i])}
return res}
for(var attr in list){if($B.JSArray[attr]!==undefined){continue}
if(typeof list[attr]=="function"){$B.JSArray[attr]=(function(fname){return function(){return $B.$JS2Py(list[fname].apply(null,make_args(arguments)))}})(attr)}}
$B.set_func_names($B.JSArray,"builtins")
function $tuple(arg){return arg}
var tuple={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"tuple"},$is_class:true,$native:true}
var tuple_iterator=$B.make_iterator_class("tuple_iterator")
tuple.__iter__=function(self){return tuple_iterator.$factory(self)}
tuple.$factory=function(){var obj=list.$factory(...arguments)
obj.__class__=tuple
return obj}
$B.fast_tuple=function(array){array.__class__=tuple
array.__brython__=true
array.__dict__=$B.empty_dict()
return array}
for(var attr in list){switch(attr){case "__delitem__":
case "__iadd__":
case "__imul__":
case "__setitem__":
case "append":
case "extend":
case "insert":
case "remove":
case "reverse":
break
default:
if(tuple[attr]===undefined){if(typeof list[attr]=="function"){tuple[attr]=(function(x){return function(){return list[x].apply(null,arguments)}})(attr)}}}}
tuple.__eq__=function(self,other){
if(other===undefined){return self===tuple}
return list.__eq__(self,other)}
function c_mul(a,b){s=((parseInt(a)*b)& 0xFFFFFFFF).toString(16)
return parseInt(s.substr(0,s.length-1),16)}
tuple.__hash__=function(self){
var x=0x3456789
for(var i=0,len=self.length;i < len;i++){var y=_b_.hash(self[i])
x=c_mul(1000003,x)^ y & 0xFFFFFFFF}
return x}
tuple.__init__=function(){
return $N}
tuple.__new__=function(cls,...args){if(cls===undefined){throw _b_.TypeError.$factory("list.__new__(): not enough arguments")}
var self=[]
self.__class__=cls
self.__brython__=true
self.__dict__=$B.empty_dict()
var arg=$B.$iter(args[0]),next_func=$B.$call(getattr(arg,"__next__"))
while(1){try{var item=next_func()
self.push(item)}
catch(err){if(err.__class__===_b_.StopIteration){break}
else{throw err}}}
return self}
tuple.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__].concat(self.slice())),_b_.None,_b_.None])}
tuple.__repr__=function(self){$B.builtins_repr_check(tuple,arguments)
return list_repr(self)}
$B.set_func_names(tuple,"builtins")
_b_.list=list
_b_.tuple=tuple
_b_.object.__bases__=tuple.$factory()})(__BRYTHON__)
;

var $B=__BRYTHON__
$B.unicode={"Cc":[[0,32],[127,33]],"Zs":[32,160,5760,[8192,11],8239,8287,12288],"Po":[[33,3],[37,3],[42,3,2],47,58,59,63,64,92,161,167,182,183,191,894,903,[1370,6],1417,[1472,3,3],1523,1524,1545,1546,1548,1549,1563,1566,1567,[1642,4],1748,[1792,14],[2039,3],[2096,15],2142,2404,2405,2416,2557,2678,2800,3191,3204,3572,3663,3674,3675,[3844,15],3860,3973,[4048,5],4057,4058,[4170,6],4347,[4960,9],5742,[5867,3],5941,5942,[6100,3],[6104,3],[6144,6],[6151,4],6468,6469,6686,6687,[6816,7],[6824,6],[7002,7],[7164,4],[7227,5],7294,7295,[7360,8],7379,8214,8215,[8224,8],[8240,9],[8251,4],[8257,3],[8263,11],8275,[8277,10],[11513,4],11518,11519,11632,11776,11777,[11782,3],11787,[11790,9],11800,11801,11803,11806,11807,[11818,5],[11824,10],[11836,4],11841,[11843,13],11858,[12289,3],12349,12539,42238,42239,[42509,3],42611,42622,[42738,6],[43124,4],43214,43215,[43256,3],43260,43310,43311,43359,[43457,13],43486,43487,[43612,4],43742,43743,43760,43761,44011,[65040,7],65049,65072,65093,65094,[65097,4],[65104,3],[65108,4],[65119,3],65128,65130,65131,[65281,3],[65285,3],[65290,3,2],65295,65306,65307,65311,65312,65340,65377,65380,65381,[65792,3],66463,66512,66927,67671,67871,67903,[68176,9],68223,[68336,7],[68409,7],[68505,4],[69461,5],[69703,7],69819,69820,[69822,4],[69952,4],70004,70005,[70085,4],70093,70107,[70109,3],[70200,6],70313,[70731,5],70746,70747,70749,70854,[71105,23],[71233,3],[71264,13],[71484,3],71739,[72004,3],72162,[72255,8],[72346,3],[72350,5],[72769,5],72816,72817,73463,73464,73727,[74864,5],92782,92783,92917,[92983,5],92996,[93847,4],94178,113823,[121479,5],125278,125279],"Sc":[36,[162,4],1423,1547,2046,2047,2546,2547,2555,2801,3065,3647,6107,[8352,32],43064,65020,65129,65284,65504,65505,65509,65510,[73693,4],123647,126128],"Ps":[40,91,123,3898,3900,5787,8218,8222,8261,8317,8333,8968,8970,9001,[10088,7,2],10181,[10214,5,2],[10627,11,2],10712,10714,10748,[11810,4,2],11842,[12296,5,2],[12308,4,2],12317,64831,65047,[65077,8,2],65095,[65113,3,2],65288,65339,65371,65375,65378],"Pe":[41,93,125,3899,3901,5788,8262,8318,8334,8969,8971,9002,[10089,7,2],10182,[10215,5,2],[10628,11,2],10713,10715,10749,[11811,4,2],[12297,5,2],[12309,4,2],12318,12319,64830,65048,[65078,8,2],65096,[65114,3,2],65289,65341,[65373,3,3]],"Sm":[43,[60,3],124,126,172,177,215,247,1014,[1542,3],8260,8274,[8314,3],[8330,3],8472,[8512,5],8523,[8592,5],8602,8603,[8608,3,3],8622,8654,8655,8658,8660,[8692,268],8992,8993,9084,[9115,25],[9180,6],9655,9665,[9720,8],9839,[10176,5],[10183,31],[10224,16],[10496,131],[10649,63],[10716,32],[10750,258],[11056,21],[11079,6],64297,65122,[65124,3],65291,[65308,3],65372,65374,65506,[65513,4],120513,120539,120571,120597,120629,120655,120687,120713,120745,120771,126704,126705],"Pd":[45,1418,1470,5120,6150,[8208,6],11799,11802,11834,11835,11840,12316,12336,12448,65073,65074,65112,65123,65293,69293],"Nd":[[48,10],[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2662,10],[2790,10],[2918,10],[3046,10],[3174,10],[3302,10],[3430,10],[3558,10],[3664,10],[3792,10],[3872,10],[4160,10],[4240,10],[6112,10],[6160,10],[6470,10],[6608,10],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],[42528,10],[43216,10],[43264,10],[43472,10],[43504,10],[43600,10],[44016,10],[65296,10],[66720,10],[68912,10],[69734,10],[69872,10],[69942,10],[70096,10],[70384,10],[70736,10],[70864,10],[71248,10],[71360,10],[71472,10],[71904,10],[72016,10],[72784,10],[73040,10],[73120,10],[92768,10],[93008,10],[120782,50],[123200,10],[123632,10],[125264,10],[130032,10]],"Lu":[[65,26],[192,23],[216,7],[256,28,2],[313,8,2],[330,24,2],[377,3,2],385,[386,3,2],391,[393,3],[398,4],403,404,[406,3],412,413,415,[416,4,2],423,425,428,430,431,[433,3],437,439,440,444,[452,4,3],[463,7,2],[478,9,2],497,500,[502,3],[506,29,2],570,571,573,574,577,[579,4],[584,4,2],880,882,886,895,902,[904,3],908,910,911,[913,17],[931,9],975,[978,3],[984,12,2],1012,1015,1017,1018,[1021,51],[1120,17,2],[1162,28,2],[1217,7,2],[1232,48,2],[1329,38],[4256,38],4295,4301,[5024,86],[7312,43],[7357,3],[7680,75,2],[7838,49,2],[7944,8],[7960,6],[7976,8],[7992,8],[8008,6],[8025,4,2],[8040,8],[8120,4],[8136,4],[8152,4],[8168,5],[8184,4],8450,8455,[8459,3],[8464,3],8469,[8473,5],[8484,4,2],[8491,3],[8496,4],8510,8511,8517,8579,[11264,47],11360,[11362,3],[11367,4,2],[11374,3],11378,11381,[11390,3],[11394,49,2],11499,11501,11506,[42560,23,2],[42624,14,2],[42786,7,2],[42802,31,2],[42873,3,2],[42878,5,2],42891,42893,42896,42898,[42902,11,2],[42923,4],[42928,5],[42934,5,2],42946,[42948,4],42953,42997,[65313,26],[66560,40],[66736,36],[68736,51],[71840,32],[93760,32],[119808,26],[119860,26],[119912,26],119964,119966,[119967,3,3],119974,[119977,4],[119982,8],[120016,26],120068,120069,[120071,4],[120077,8],[120086,7],120120,120121,[120123,4],[120128,5],120134,[120138,7],[120172,26],[120224,26],[120276,26],[120328,26],[120380,26],[120432,26],[120488,25],[120546,25],[120604,25],[120662,25],[120720,25],120778,[125184,34]],"Sk":[94,96,168,175,180,184,[706,4],[722,14],[741,7],749,[751,17],885,900,901,8125,[8127,3],[8141,3],[8157,3],[8173,3],8189,8190,12443,12444,[42752,23],42784,42785,42889,42890,43867,43882,43883,[64434,16],65342,65344,65507,[127995,5]],"Pc":[95,8255,8256,8276,65075,65076,[65101,3],65343],"Ll":[[97,26],181,[223,24],[248,8],[257,28,2],[312,9,2],[329,24,2],[378,3,2],383,384,387,389,392,396,397,402,405,[409,3],414,[417,3,2],424,426,427,429,432,436,438,441,442,[445,3],[454,3,3],[462,8,2],[477,10,2],496,499,501,[505,30,2],[564,6],572,575,576,578,[583,5,2],[592,68],[661,27],881,[883,3,4],892,893,912,[940,35],976,977,[981,3],[985,12,2],[1008,4],[1013,3,3],1020,[1072,48],[1121,17,2],[1163,27,2],[1218,7,2],[1231,49,2],[1376,41],[4304,43],[4349,3],[5112,6],[7296,9],[7424,44],[7531,13],[7545,34],[7681,75,2],[7830,8],[7839,49,2],[7936,8],[7952,6],[7968,8],[7984,8],[8000,6],[8016,8],[8032,8],[8048,14],[8064,8],[8080,8],[8096,8],[8112,5],8118,8119,8126,[8130,3],8134,8135,[8144,4],8150,8151,[8160,8],[8178,3],8182,8183,8458,8462,8463,8467,[8495,3,5],8508,8509,[8518,4],8526,8580,[11312,47],11361,11365,[11366,4,2],11377,11379,11380,[11382,6],[11393,50,2],11492,11500,11502,11507,[11520,38],11559,11565,[42561,23,2],[42625,14,2],[42787,7,2],42800,[42801,33,2],[42866,7],42874,42876,[42879,5,2],42892,42894,42897,[42899,3],[42903,10,2],42927,[42933,6,2],42947,42952,42954,42998,43002,[43824,43],[43872,9],[43888,80],[64256,7],[64275,5],[65345,26],[66600,40],[66776,36],[68800,51],[71872,32],[93792,32],[119834,26],[119886,7],[119894,18],[119938,26],[119990,4],119995,[119997,7],[120005,11],[120042,26],[120094,26],[120146,26],[120198,26],[120250,26],[120302,26],[120354,26],[120406,26],[120458,28],[120514,25],[120540,6],[120572,25],[120598,6],[120630,25],[120656,6],[120688,25],[120714,6],[120746,25],[120772,6],120779,[125218,34]],"So":[166,169,174,176,1154,1421,1422,1550,1551,1758,1769,1789,1790,2038,2554,2928,[3059,6],3066,3199,3407,3449,[3841,3],3859,[3861,3],[3866,6],[3892,3,2],[4030,8],[4039,6],4046,4047,[4053,4],4254,4255,[5008,10],5741,6464,[6622,34],[7009,10],[7028,9],8448,8449,[8451,4],8456,8457,8468,8470,8471,[8478,6],[8485,3,2],8494,8506,8507,8522,8524,8525,8527,8586,8587,[8597,5],[8604,4],8609,8610,8612,8613,[8615,7],[8623,31],8656,[8657,3,2],[8662,30],[8960,8],[8972,20],[8994,7],[9003,81],[9085,30],[9140,40],[9186,69],[9280,11],[9372,78],[9472,183],[9656,9],[9666,54],[9728,111],[9840,248],[10132,44],[10240,256],[11008,48],11077,11078,[11085,39],[11126,32],[11159,105],[11493,6],11856,11857,[11904,26],[11931,89],[12032,214],[12272,12],12292,12306,12307,12320,12342,12343,12350,12351,12688,12689,[12694,10],[12736,36],[12800,31],[12842,30],12880,[12896,32],[12938,39],[12992,320],[19904,64],[42128,55],[43048,4],43062,43063,43065,[43639,3],65021,65508,65512,65517,65518,65532,65533,[65847,9],[65913,17],[65932,3],[65936,13],65952,[66000,45],67703,67704,68296,71487,[73685,8],[73697,17],[92988,4],92997,113820,[118784,246],[119040,39],[119081,60],[119146,3],119171,119172,[119180,30],[119214,59],[119296,66],119365,[119552,87],[120832,512],[121399,4],[121453,8],[121462,14],121477,121478,123215,126124,126254,[126976,44],[127024,100],[127136,15],[127153,15],[127169,15],[127185,37],[127245,161],[127462,29],[127504,44],[127552,9],127568,127569,[127584,6],[127744,251],[128000,728],[128736,13],[128752,13],[128768,116],[128896,89],[128992,12],[129024,12],[129040,56],[129104,10],[129120,40],[129168,30],129200,129201,[129280,121],[129402,82],[129485,135],[129632,14],[129648,5],[129656,3],[129664,7],[129680,25],[129712,7],[129728,3],[129744,7],[129792,147],[129940,55]],"Lo":[170,186,443,[448,4],660,[1488,27],[1519,4],[1568,32],[1601,10],1646,1647,[1649,99],1749,1774,1775,[1786,3],1791,1808,[1810,30],[1869,89],1969,[1994,33],[2048,22],[2112,25],[2144,11],[2208,21],[2230,18],[2308,54],2365,2384,[2392,10],[2418,15],[2437,8],2447,2448,[2451,22],[2474,7],2482,[2486,4],2493,2510,2524,2525,[2527,3],2544,2545,2556,[2565,6],2575,2576,[2579,22],[2602,7],2610,2611,2613,2614,2616,2617,[2649,4],2654,[2674,3],[2693,9],[2703,3],[2707,22],[2730,7],2738,2739,[2741,5],2749,2768,2784,2785,2809,[2821,8],2831,2832,[2835,22],[2858,7],2866,2867,[2869,5],2877,2908,2909,[2911,3],2929,2947,[2949,6],[2958,3],[2962,4],2969,[2970,3,2],2975,2979,2980,[2984,3],[2990,12],3024,[3077,8],[3086,3],[3090,23],[3114,16],3133,[3160,3],3168,3169,3200,[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3261,3294,3296,3297,3313,3314,[3332,9],[3342,3],[3346,41],3389,3406,[3412,3],[3423,3],[3450,6],[3461,18],[3482,24],[3507,9],3517,[3520,7],[3585,48],3634,3635,[3648,6],3713,[3714,3,2],[3719,4],[3724,24],3749,[3751,10],3762,3763,3773,[3776,5],[3804,4],3840,[3904,8],[3913,36],[3976,5],[4096,43],4159,[4176,6],[4186,4],4193,4197,4198,[4206,3],[4213,13],4238,[4352,329],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],[4992,16],[5121,620],[5743,17],[5761,26],[5792,75],[5873,8],[5888,13],[5902,4],[5920,18],[5952,18],[5984,13],[5998,3],[6016,52],6108,[6176,35],[6212,53],[6272,5],[6279,34],6314,[6320,70],[6400,31],[6480,30],[6512,5],[6528,44],[6576,26],[6656,23],[6688,53],[6917,47],[6981,7],[7043,30],7086,7087,[7098,44],[7168,36],[7245,3],[7258,30],[7401,4],[7406,6],7413,7414,7418,[8501,4],[11568,56],[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],12294,12348,[12353,86],12447,[12449,90],12543,[12549,43],[12593,94],[12704,32],[12784,16],13312,19903,19968,40956,[40960,21],[40982,1143],[42192,40],[42240,268],[42512,16],42538,42539,42606,[42656,70],42895,42999,[43003,7],[43011,3],[43015,4],[43020,23],[43072,52],[43138,50],[43250,6],43259,43261,43262,[43274,28],[43312,23],[43360,29],[43396,47],[43488,5],[43495,9],[43514,5],[43520,41],[43584,3],[43588,8],[43616,16],[43633,6],43642,[43646,50],43697,43701,43702,[43705,5],43712,43714,43739,43740,[43744,11],43762,[43777,6],[43785,6],[43793,6],[43808,7],[43816,7],[43968,35],44032,55203,[55216,23],[55243,49],[63744,366],[64112,106],64285,[64287,10],[64298,13],[64312,5],64318,64320,64321,64323,64324,[64326,108],[64467,363],[64848,64],[64914,54],[65008,12],[65136,5],[65142,135],[65382,10],[65393,45],[65440,31],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],65596,65597,[65599,15],[65616,14],[65664,123],[66176,29],[66208,49],[66304,32],[66349,20],[66370,8],[66384,38],[66432,30],[66464,36],[66504,8],[66640,78],[66816,40],[66864,52],[67072,311],[67392,22],[67424,8],[67584,6],67592,[67594,44],67639,67640,67644,[67647,23],[67680,23],[67712,31],[67808,19],67828,67829,[67840,22],[67872,26],[67968,56],68030,68031,68096,[68112,4],[68117,3],[68121,29],[68192,29],[68224,29],[68288,8],[68297,28],[68352,54],[68416,22],[68448,19],[68480,18],[68608,73],[68864,36],[69248,42],69296,69297,[69376,29],69415,[69424,22],[69552,21],[69600,23],[69635,53],[69763,45],[69840,25],[69891,36],69956,69959,[69968,35],70006,[70019,48],[70081,4],70106,70108,[70144,18],[70163,25],[70272,7],70280,[70282,4],[70287,15],[70303,10],[70320,47],[70405,8],70415,70416,[70419,22],[70442,7],70450,70451,[70453,5],70461,70480,[70493,5],[70656,53],[70727,4],[70751,3],[70784,48],70852,70853,70855,[71040,47],[71128,4],[71168,48],71236,[71296,43],71352,[71424,27],[71680,44],[71935,8],71945,[71948,8],71957,71958,[71960,24],71999,72001,[72096,8],[72106,39],72161,72163,72192,[72203,40],72250,72272,[72284,46],72349,[72384,57],[72704,9],[72714,37],72768,[72818,30],[72960,7],72968,72969,[72971,38],73030,[73056,6],73063,73064,[73066,32],73112,[73440,19],73648,[73728,922],[74880,196],[77824,1071],[82944,583],[92160,569],[92736,31],[92880,30],[92928,48],[93027,21],[93053,19],[93952,75],94032,94208,100343,[100352,1238],101632,101640,[110592,287],[110928,3],[110948,4],[110960,396],[113664,107],[113776,13],[113792,9],[113808,10],[123136,45],123214,[123584,44],[124928,197],[126464,4],[126469,27],126497,126498,126500,126503,[126505,10],[126516,4],126521,126523,126530,[126535,4,2],126542,126543,126545,126546,126548,[126551,6,2],126562,126564,[126567,4],[126572,7],[126580,4],[126585,4],126590,[126592,10],[126603,17],[126625,3],[126629,5],[126635,17],131072,173789,173824,177972,177984,178205,178208,183969,183984,191456,[194560,542],196608,201546],"Pi":[171,8216,8219,8220,8223,8249,11778,11780,11785,11788,11804,11808],"Cf":[173,[1536,6],1564,1757,1807,2274,6158,[8203,5],[8234,5],[8288,5],[8294,10],65279,[65529,3],69821,69837,[78896,9],[113824,4],[119155,8],917505,[917536,96]],"No":[178,179,185,[188,3],[2548,6],[2930,6],[3056,3],[3192,7],[3416,7],[3440,9],[3882,10],[4969,20],[6128,10],6618,8304,[8308,6],[8320,10],[8528,16],8585,[9312,60],[9450,22],[10102,30],11517,[12690,4],[12832,10],[12872,8],[12881,15],[12928,10],[12977,15],[43056,6],[65799,45],[65909,4],65930,65931,[66273,27],[66336,4],[67672,8],[67705,7],[67751,9],[67835,5],[67862,6],68028,68029,[68032,16],[68050,46],[68160,9],68221,68222,[68253,3],[68331,5],[68440,8],[68472,8],[68521,7],[68858,6],[69216,31],[69405,10],[69457,4],[69573,7],[69714,20],[70113,20],71482,71483,[71914,9],[72794,19],[73664,21],[93019,7],[93824,23],[119520,20],[119648,25],[125127,9],[126065,59],[126125,3],[126129,4],[126209,45],[126255,15],[127232,13]],"Pf":[187,8217,8221,8250,11779,11781,11786,11789,11805,11809],"Lt":[[453,3,3],498,[8072,8],[8088,8],[8104,8],8124,8140,8188],"Lm":[[688,18],[710,12],[736,5],748,750,884,890,1369,1600,1765,1766,2036,2037,2042,2074,2084,2088,2417,3654,3782,4348,6103,6211,6823,[7288,6],[7468,63],7544,[7579,37],8305,8319,[8336,13],11388,11389,11631,11823,12293,[12337,5],12347,12445,12446,[12540,3],40981,[42232,6],42508,42623,42652,42653,[42775,9],42864,42888,43000,43001,43471,43494,43632,43741,43763,43764,[43868,4],43881,65392,65438,65439,[92992,4],[94099,13],94176,94177,94179,[123191,7],125259],"Mn":[[768,112],[1155,5],[1425,45],1471,1473,1474,1476,1477,1479,[1552,11],[1611,21],1648,[1750,7],[1759,6],1767,1768,[1770,4],1809,[1840,27],[1958,11],[2027,9],2045,[2070,4],[2075,9],[2085,3],[2089,5],[2137,3],[2259,15],[2275,32],2362,2364,[2369,8],2381,[2385,7],2402,2403,2433,2492,[2497,4],2509,2530,2531,2558,2561,2562,2620,2625,2626,2631,2632,[2635,3],2641,2672,2673,2677,2689,2690,2748,[2753,5],2759,2760,2765,2786,2787,[2810,6],2817,2876,2879,[2881,4],2893,2901,2902,2914,2915,2946,3008,3021,3072,3076,[3134,3],[3142,3],[3146,4],3157,3158,3170,3171,3201,3260,3263,3270,3276,3277,3298,3299,3328,3329,3387,3388,[3393,4],3405,3426,3427,3457,3530,[3538,3],3542,3633,[3636,7],[3655,8],3761,[3764,9],[3784,6],3864,3865,[3893,3,2],[3953,14],[3968,5],3974,3975,[3981,11],[3993,36],4038,[4141,4],[4146,6],4153,4154,4157,4158,4184,4185,[4190,3],[4209,4],4226,4229,4230,4237,4253,[4957,3],[5906,3],[5938,3],5970,5971,6002,6003,6068,6069,[6071,7],6086,[6089,11],6109,[6155,3],6277,6278,6313,[6432,3],6439,6440,6450,[6457,3],6679,6680,6683,6742,[6744,7],6752,6754,[6757,8],[6771,10],6783,[6832,14],6847,6848,[6912,4],6964,[6966,5],6972,6978,[7019,9],7040,7041,[7074,4],7080,7081,[7083,3],7142,7144,7145,7149,[7151,3],[7212,8],7222,7223,[7376,3],[7380,13],[7394,7],7405,7412,7416,7417,[7616,58],[7675,5],[8400,13],8417,[8421,12],[11503,3],11647,[11744,32],[12330,4],12441,12442,42607,[42612,10],42654,42655,42736,42737,43010,43014,43019,43045,43046,43052,43204,43205,[43232,18],43263,[43302,8],[43335,11],[43392,3],43443,[43446,4],43452,43453,43493,[43561,6],43569,43570,43573,43574,43587,43596,43644,43696,[43698,3],43703,43704,43710,43711,43713,43756,43757,43766,44005,44008,44013,64286,[65024,16],[65056,16],66045,66272,[66422,5],[68097,3],68101,68102,[68108,4],[68152,3],68159,68325,68326,[68900,4],69291,69292,[69446,11],69633,[69688,15],[69759,3],[69811,4],69817,69818,[69888,3],[69927,5],[69933,8],70003,70016,70017,[70070,9],[70089,4],70095,[70191,3],70196,70198,70199,70206,70367,[70371,8],70400,70401,70459,70460,70464,[70502,7],[70512,5],[70712,8],[70722,3],70726,70750,[70835,6],70842,70847,70848,70850,70851,[71090,4],71100,71101,71103,71104,71132,71133,[71219,8],71229,71231,71232,71339,71341,[71344,6],71351,[71453,3],[71458,4],[71463,5],[71727,9],71737,71738,71995,71996,71998,72003,[72148,4],72154,72155,72160,[72193,10],[72243,6],[72251,4],72263,[72273,6],[72281,3],[72330,13],72344,72345,[72752,7],[72760,6],72767,[72850,22],[72874,7],72882,72883,72885,72886,[73009,6],73018,73020,73021,[73023,7],73031,73104,73105,73109,73111,73459,73460,[92912,5],[92976,7],94031,[94095,4],94180,113821,113822,[119143,3],[119163,8],[119173,7],[119210,4],[119362,3],[121344,55],[121403,50],121461,121476,[121499,5],[121505,15],[122880,7],[122888,17],[122907,7],122915,122916,[122918,5],[123184,7],[123628,4],[125136,7],[125252,7],[917760,240]],"Me":[1160,1161,6846,[8413,4],[8418,3],[42608,3]],"Mc":[2307,2363,[2366,3],[2377,4],2382,2383,2434,2435,[2494,3],2503,2504,2507,2508,2519,2563,[2622,3],2691,[2750,3],2761,2763,2764,2818,2819,2878,2880,2887,2888,2891,2892,2903,3006,3007,3009,3010,[3014,3],[3018,3],3031,[3073,3],[3137,4],3202,3203,3262,[3264,5],3271,3272,3274,3275,3285,3286,3330,3331,[3390,3],[3398,3],[3402,3],3415,3458,3459,[3535,3],[3544,8],3570,3571,3902,3903,3967,4139,4140,4145,4152,4155,4156,4182,4183,[4194,3],[4199,7],4227,4228,[4231,6],4239,[4250,3],6070,[6078,8],6087,6088,[6435,4],[6441,3],6448,6449,[6451,6],6681,6682,6741,6743,6753,6755,6756,[6765,6],6916,6965,6971,[6973,5],6979,6980,7042,7073,7078,7079,7082,7143,[7146,3],7150,7154,7155,[7204,8],7220,7221,7393,7415,12334,12335,43043,43044,43047,43136,43137,[43188,16],43346,43347,43395,43444,43445,43450,43451,[43454,3],43567,43568,43571,43572,43597,43643,43645,43755,43758,43759,43765,44003,44004,44006,44007,44009,44010,44012,69632,69634,69762,[69808,3],69815,69816,69932,69957,69958,70018,[70067,3],70079,70080,70094,[70188,3],70194,70195,70197,[70368,3],70402,70403,70462,70463,[70465,4],70471,70472,[70475,3],70487,70498,70499,[70709,3],70720,70721,70725,[70832,3],70841,[70843,4],70849,[71087,3],[71096,4],71102,[71216,3],71227,71228,71230,71340,71342,71343,71350,71456,71457,71462,[71724,3],71736,[71984,6],71991,71992,71997,72000,72002,[72145,3],[72156,4],72164,72249,72279,72280,72343,72751,72766,72873,72881,72884,[73098,5],73107,73108,73110,73461,73462,[94033,55],94192,94193,119141,119142,[119149,6]],"Nl":[[5870,3],[8544,35],[8581,4],12295,[12321,9],[12344,3],[42726,10],[65856,53],66369,66378,[66513,5],[74752,111]],"Zl":[8232],"Zp":[8233],"Cs":[55296,56191,56192,56319,56320,57343],"Co":[57344,63743,983040,1048573,1048576,1114109],"digits":[[48,10],178,179,185,[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2662,10],[2790,10],[2918,10],[3046,10],[3174,10],[3302,10],[3430,10],[3558,10],[3664,10],[3792,10],[3872,10],[4160,10],[4240,10],[4969,9],[6112,10],[6160,10],[6470,10],[6608,11],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],8304,[8308,6],[8320,10],[9312,9],[9332,9],[9352,9],9450,[9461,9],9471,[10102,9],[10112,9],[10122,9],[42528,10],[43216,10],[43264,10],[43472,10],[43504,10],[43600,10],[44016,10],[65296,10],[66720,10],[68160,4],[68912,10],[69216,9],[69714,9],[69734,10],[69872,10],[69942,10],[70096,10],[70384,10],[70736,10],[70864,10],[71248,10],[71360,10],[71472,10],[71904,10],[72016,10],[72784,10],[73040,10],[73120,10],[92768,10],[93008,10],[120782,50],[123200,10],[123632,10],[125264,10],[127232,11],[130032,10]],"numeric":[[48,10],178,179,185,[188,3],[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2548,6],[2662,10],[2790,10],[2918,10],[2930,6],[3046,13],[3174,10],[3192,7],[3302,10],[3416,7],[3430,19],[3558,10],[3664,10],[3792,10],[3872,20],[4160,10],[4240,10],[4969,20],[5870,3],[6112,10],[6128,10],[6160,10],[6470,10],[6608,11],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],8304,[8308,6],[8320,10],[8528,51],[8581,5],[9312,60],[9450,22],[10102,30],11517,12295,[12321,9],[12344,3],[12690,4],[12832,10],[12872,8],[12881,15],[12928,10],[12977,15],13317,13443,14378,15181,19968,19971,19975,19977,20061,20108,20116,20118,20159,20160,20191,20200,20237,20336,20740,20806,[20841,3,2],21313,[21315,3],21324,[21441,4],22235,22769,22777,24186,24318,24319,[24332,3],24336,25342,25420,26578,28422,29590,30334,32902,33836,36014,36019,36144,38433,38470,38476,38520,38646,[42528,10],[42726,10],[43056,6],[43216,10],[43264,10],[43472,10],[43504,10],[43600,10],[44016,10],63851,63859,63864,63922,63953,63955,63997,[65296,10],[65799,45],[65856,57],65930,65931,[66273,27],[66336,4],66369,66378,[66513,5],[66720,10],[67672,8],[67705,7],[67751,9],[67835,5],[67862,6],68028,68029,[68032,16],[68050,46],[68160,9],68221,68222,[68253,3],[68331,5],[68440,8],[68472,8],[68521,7],[68858,6],[68912,10],[69216,31],[69405,10],[69457,4],[69573,7],[69714,30],[69872,10],[69942,10],[70096,10],[70113,20],[70384,10],[70736,10],[70864,10],[71248,10],[71360,10],[71472,12],[71904,19],[72016,10],[72784,29],[73040,10],[73120,10],[73664,21],[74752,111],[92768,10],[93008,10],[93019,7],[93824,23],[119520,20],[119648,25],[120782,50],[123200,10],[123632,10],[125127,9],[125264,10],[126065,59],[126125,3],[126129,4],[126209,45],[126255,15],[127232,13],[130032,10],131073,131172,131298,131361,133418,133507,133516,133532,133866,133885,133913,140176,141720,146203,156269,194704],"Cn":[[888,2],[896,4],[907,1],[909,1],[930,1],[1328,1],[1367,2],[1419,2],[1424,1],[1480,8],[1515,4],[1525,11],[1565,1],[1806,1],[1867,2],[1970,14],[2043,2],[2094,2],[2111,1],[2140,2],[2143,1],[2155,53],[2229,1],[2248,11],[2436,1],[2445,2],[2449,2],[2473,1],[2481,1],[2483,3],[2490,2],[2501,2],[2505,2],[2511,8],[2520,4],[2526,1],[2532,2],[2559,2],[2564,1],[2571,4],[2577,2],[2601,1],[2609,1],[2612,1],[2615,1],[2618,2],[2621,1],[2627,4],[2633,2],[2638,3],[2642,7],[2653,1],[2655,7],[2679,10],[2692,1],[2702,1],[2706,1],[2729,1],[2737,1],[2740,1],[2746,2],[2758,1],[2762,1],[2766,2],[2769,15],[2788,2],[2802,7],[2816,1],[2820,1],[2829,2],[2833,2],[2857,1],[2865,1],[2868,1],[2874,2],[2885,2],[2889,2],[2894,7],[2904,4],[2910,1],[2916,2],[2936,10],[2948,1],[2955,3],[2961,1],[2966,3],[2971,1],[2973,1],[2976,3],[2981,3],[2987,3],[3002,4],[3011,3],[3017,1],[3022,2],[3025,6],[3032,14],[3067,5],[3085,1],[3089,1],[3113,1],[3130,3],[3141,1],[3145,1],[3150,7],[3159,1],[3163,5],[3172,2],[3184,7],[3213,1],[3217,1],[3241,1],[3252,1],[3258,2],[3269,1],[3273,1],[3278,7],[3287,7],[3295,1],[3300,2],[3312,1],[3315,13],[3341,1],[3345,1],[3397,1],[3401,1],[3408,4],[3428,2],[3456,1],[3460,1],[3479,3],[3506,1],[3516,1],[3518,2],[3527,3],[3531,4],[3541,1],[3543,1],[3552,6],[3568,2],[3573,12],[3643,4],[3676,37],[3715,1],[3717,1],[3723,1],[3748,1],[3750,1],[3774,2],[3781,1],[3783,1],[3790,2],[3802,2],[3808,32],[3912,1],[3949,4],[3992,1],[4029,1],[4045,1],[4059,37],[4294,1],[4296,5],[4302,2],[4681,1],[4686,2],[4695,1],[4697,1],[4702,2],[4745,1],[4750,2],[4785,1],[4790,2],[4799,1],[4801,1],[4806,2],[4823,1],[4881,1],[4886,2],[4955,2],[4989,3],[5018,6],[5110,2],[5118,2],[5789,3],[5881,7],[5901,1],[5909,11],[5943,9],[5972,12],[5997,1],[6001,1],[6004,12],[6110,2],[6122,6],[6138,6],[6159,1],[6170,6],[6265,7],[6315,5],[6390,10],[6431,1],[6444,4],[6460,4],[6465,3],[6510,2],[6517,11],[6572,4],[6602,6],[6619,3],[6684,2],[6751,1],[6781,2],[6794,6],[6810,6],[6830,2],[6849,63],[6988,4],[7037,3],[7156,8],[7224,3],[7242,3],[7305,7],[7355,2],[7368,8],[7419,5],[7674,1],[7958,2],[7966,2],[8006,2],[8014,2],[8024,1],[8026,1],[8028,1],[8030,1],[8062,2],[8117,1],[8133,1],[8148,2],[8156,1],[8176,2],[8181,1],[8191,1],[8293,1],[8306,2],[8335,1],[8349,3],[8384,16],[8433,15],[8588,4],[9255,25],[9291,21],[11124,2],[11158,1],[11311,1],[11359,1],[11508,5],[11558,1],[11560,5],[11566,2],[11624,7],[11633,14],[11671,9],[11687,1],[11695,1],[11703,1],[11711,1],[11719,1],[11727,1],[11735,1],[11743,1],[11859,45],[11930,1],[12020,12],[12246,26],[12284,4],[12352,1],[12439,2],[12544,5],[12592,1],[12687,1],[12772,12],[12831,1],[40957,3],[42125,3],[42183,9],[42540,20],[42744,8],[42944,2],[42955,42],[43053,3],[43066,6],[43128,8],[43206,8],[43226,6],[43348,11],[43389,3],[43470,1],[43482,4],[43519,1],[43575,9],[43598,2],[43610,2],[43715,24],[43767,10],[43783,2],[43791,2],[43799,9],[43815,1],[43823,1],[43884,4],[44014,2],[44026,6],[55204,12],[55239,4],[55292,4],[64110,2],[64218,38],[64263,12],[64280,5],[64311,1],[64317,1],[64319,1],[64322,1],[64325,1],[64450,17],[64832,16],[64912,2],[64968,40],[65022,2],[65050,6],[65107,1],[65127,1],[65132,4],[65141,1],[65277,2],[65280,1],[65471,3],[65480,2],[65488,2],[65496,2],[65501,3],[65511,1],[65519,10],[65534,2],[65548,1],[65575,1],[65595,1],[65598,1],[65614,2],[65630,34],[65787,5],[65795,4],[65844,3],[65935,1],[65949,3],[65953,47],[66046,130],[66205,3],[66257,15],[66300,4],[66340,9],[66379,5],[66427,5],[66462,1],[66500,4],[66518,42],[66718,2],[66730,6],[66772,4],[66812,4],[66856,8],[66916,11],[66928,144],[67383,9],[67414,10],[67432,152],[67590,2],[67593,1],[67638,1],[67641,3],[67645,2],[67670,1],[67743,8],[67760,48],[67827,1],[67830,5],[67868,3],[67898,5],[67904,64],[68024,4],[68048,2],[68100,1],[68103,5],[68116,1],[68120,1],[68150,2],[68155,4],[68169,7],[68185,7],[68256,32],[68327,4],[68343,9],[68406,3],[68438,2],[68467,5],[68498,7],[68509,12],[68528,80],[68681,55],[68787,13],[68851,7],[68904,8],[68922,294],[69247,1],[69290,1],[69294,2],[69298,78],[69416,8],[69466,86],[69580,20],[69623,9],[69710,4],[69744,15],[69826,11],[69838,2],[69865,7],[69882,6],[69941,1],[69960,8],[70007,9],[70112,1],[70133,11],[70162,1],[70207,65],[70279,1],[70281,1],[70286,1],[70302,1],[70314,6],[70379,5],[70394,6],[70404,1],[70413,2],[70417,2],[70441,1],[70449,1],[70452,1],[70458,1],[70469,2],[70473,2],[70478,2],[70481,6],[70488,5],[70500,2],[70509,3],[70517,139],[70748,1],[70754,30],[70856,8],[70874,166],[71094,2],[71134,34],[71237,11],[71258,6],[71277,19],[71353,7],[71370,54],[71451,2],[71468,4],[71488,192],[71740,100],[71923,12],[71943,2],[71946,2],[71956,1],[71959,1],[71990,1],[71993,2],[72007,9],[72026,70],[72104,2],[72152,2],[72165,27],[72264,8],[72355,29],[72441,263],[72713,1],[72759,1],[72774,10],[72813,3],[72848,2],[72872,1],[72887,73],[72967,1],[72970,1],[73015,3],[73019,1],[73022,1],[73032,8],[73050,6],[73062,1],[73065,1],[73103,1],[73106,1],[73113,7],[73130,310],[73465,183],[73649,15],[73714,13],[74650,102],[74863,1],[74869,11],[75076,2748],[78895,1],[78905,4039],[83527,8633],[92729,7],[92767,1],[92778,4],[92784,96],[92910,2],[92918,10],[92998,10],[93018,1],[93026,1],[93048,5],[93072,688],[93851,101],[94027,4],[94088,7],[94112,64],[94181,11],[94194,14],[100344,8],[101590,42],[101641,8951],[110879,49],[110931,17],[110952,8],[111356,2308],[113771,5],[113789,3],[113801,7],[113818,2],[113828,4956],[119030,10],[119079,2],[119273,23],[119366,154],[119540,12],[119639,9],[119673,135],[119893,1],[119965,1],[119968,2],[119971,2],[119975,2],[119981,1],[119994,1],[119996,1],[120004,1],[120070,1],[120075,2],[120085,1],[120093,1],[120122,1],[120127,1],[120133,1],[120135,3],[120145,1],[120486,2],[120780,2],[121484,15],[121504,1],[121520,1360],[122887,1],[122905,2],[122914,1],[122917,1],[122923,213],[123181,3],[123198,2],[123210,4],[123216,368],[123642,5],[123648,1280],[125125,2],[125143,41],[125260,4],[125274,4],[125280,785],[126133,76],[126270,194],[126468,1],[126496,1],[126499,1],[126501,2],[126504,1],[126515,1],[126520,1],[126522,1],[126524,6],[126531,4],[126536,1],[126538,1],[126540,1],[126544,1],[126547,1],[126549,2],[126552,1],[126554,1],[126556,1],[126558,1],[126560,1],[126563,1],[126565,2],[126571,1],[126579,1],[126584,1],[126589,1],[126591,1],[126602,1],[126620,5],[126628,1],[126634,1],[126652,52],[126706,270],[127020,4],[127124,12],[127151,2],[127168,1],[127184,1],[127222,10],[127406,56],[127491,13],[127548,4],[127561,7],[127570,14],[127590,154],[128728,8],[128749,3],[128765,3],[128884,12],[128985,7],[129004,20],[129036,4],[129096,8],[129114,6],[129160,8],[129198,2],[129202,78],[129401,1],[129484,1],[129620,12],[129646,2],[129653,3],[129659,5],[129671,9],[129705,7],[129719,9],[129731,13],[129751,41],[129939,1],[129995,37],[130042,1030],[173790,34],[177973,11],[178206,2],[183970,14],[191457,3103],[195102,1506],[201547,715958],[917506,30],[917632,128],[918000,65040],[1048574,2]]}
$B.unicode_casefold={223:[115,115],304:[105,775],329:[700,110],496:[106,780],912:[953,776,769],944:[965,776,769],1415:[1381,1410],7830:[104,817],7831:[116,776],7832:[119,778],7833:[121,778],7834:[97,702],7838:[223],8016:[965,787],8018:[965,787,768],8020:[965,787,769],8022:[965,787,834],8064:[7936,953],8065:[7937,953],8066:[7938,953],8067:[7939,953],8068:[7940,953],8069:[7941,953],8070:[7942,953],8071:[7943,953],8072:[8064],8073:[8065],8074:[8066],8075:[8067],8076:[8068],8077:[8069],8078:[8070],8079:[8071],8080:[7968,953],8081:[7969,953],8082:[7970,953],8083:[7971,953],8084:[7972,953],8085:[7973,953],8086:[7974,953],8087:[7975,953],8088:[8080],8089:[8081],8090:[8082],8091:[8083],8092:[8084],8093:[8085],8094:[8086],8095:[8087],8096:[8032,953],8097:[8033,953],8098:[8034,953],8099:[8035,953],8100:[8036,953],8101:[8037,953],8102:[8038,953],8103:[8039,953],8104:[8096],8105:[8097],8106:[8098],8107:[8099],8108:[8100],8109:[8101],8110:[8102],8111:[8103],8114:[8048,953],8115:[945,953],8116:[940,953],8118:[945,834],8119:[945,834,953],8124:[8115],8130:[8052,953],8131:[951,953],8132:[942,953],8134:[951,834],8135:[951,834,953],8140:[8131],8146:[953,776,768],8147:[953,776,769],8150:[953,834],8151:[953,776,834],8162:[965,776,768],8163:[965,776,769],8164:[961,787],8166:[965,834],8167:[965,776,834],8178:[8060,953],8179:[969,953],8180:[974,953],8182:[969,834],8183:[969,834,953],8188:[8179],64256:[102,102],64257:[102,105],64258:[102,108],64259:[102,102,105],64260:[102,102,108],64261:[115,116],64262:[115,116],64275:[1396,1398],64276:[1396,1381],64277:[1396,1387],64278:[1406,1398],64279:[1396,1389]}
$B.unicode_bidi_whitespace=[9,10,11,12,13,28,29,30,31,32,133,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8287,12288]
$B.unicode_identifiers={"XID_Start":[95,[65,26],[97,26],170,181,186,[192,23],[216,31],[248,458],[710,12],[736,5],748,750,[880,5],[886,2],[891,3],895,902,[904,3],908,[910,20],[931,83],[1015,139],[1162,166],[1329,38],1369,[1376,41],[1488,27],[1519,4],[1568,43],[1646,2],[1649,99],1749,[1765,2],[1774,2],[1786,3],1791,1808,[1810,30],[1869,89],1969,[1994,33],[2036,2],2042,[2048,22],2074,2084,2088,[2112,25],[2144,11],[2208,21],[2230,18],[2308,54],2365,2384,[2392,10],2417,[2418,15],[2437,8],[2447,2],[2451,22],[2474,7],2482,[2486,4],2493,2510,[2524,2],[2527,3],[2544,2],2556,[2565,6],[2575,2],[2579,22],[2602,7],[2610,2],[2613,2],[2616,2],[2649,4],2654,[2674,3],[2693,9],[2703,3],[2707,22],[2730,7],[2738,2],[2741,5],2749,2768,[2784,2],2809,[2821,8],[2831,2],[2835,22],[2858,7],[2866,2],[2869,5],2877,[2908,2],[2911,3],2929,2947,[2949,6],[2958,3],[2962,4],[2969,2],2972,[2974,2],[2979,2],[2984,3],[2990,12],3024,[3077,8],[3086,3],[3090,23],[3114,16],3133,[3160,3],[3168,2],3200,[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3261,3294,[3296,2],[3313,2],[3332,9],[3342,3],[3346,41],3389,3406,[3412,3],[3423,3],[3450,6],[3461,18],[3482,24],[3507,9],3517,[3520,7],[3585,48],3634,[3648,7],[3713,2],3716,[3718,5],[3724,24],3749,[3751,10],3762,3773,[3776,5],3782,[3804,4],3840,[3904,8],[3913,36],[3976,5],[4096,43],4159,[4176,6],[4186,4],4193,[4197,2],[4206,3],[4213,13],4238,[4256,38],4295,4301,[4304,43],4348,[4349,332],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],[4992,16],[5024,86],[5112,6],[5121,620],[5743,17],[5761,26],[5792,75],[5870,11],[5888,13],[5902,4],[5920,18],[5952,18],[5984,13],[5998,3],[6016,52],6103,6108,[6176,89],[6272,41],6314,[6320,70],[6400,31],[6480,30],[6512,5],[6528,44],[6576,26],[6656,23],[6688,53],6823,[6917,47],[6981,7],[7043,30],[7086,2],[7098,44],[7168,36],[7245,3],[7258,36],[7296,9],[7312,43],[7357,3],[7401,4],[7406,6],[7413,2],7418,[7424,192],[7680,278],[7960,6],[7968,38],[8008,6],[8016,8],8025,8027,8029,[8031,31],[8064,53],[8118,7],8126,[8130,3],[8134,7],[8144,4],[8150,6],[8160,13],[8178,3],[8182,7],8305,8319,[8336,13],8450,8455,[8458,10],8469,8472,[8473,5],8484,8486,8488,[8490,16],[8508,4],[8517,5],8526,[8544,41],[11264,47],[11312,47],[11360,133],[11499,4],[11506,2],[11520,38],11559,11565,[11568,56],11631,[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],12293,12294,12295,[12321,9],[12337,5],[12344,5],[12353,86],[12445,3],[12449,90],[12540,4],[12549,43],[12593,94],[12704,32],[12784,16],[13312,6592],[19968,20989],[40960,1165],[42192,46],[42240,269],[42512,16],[42538,2],[42560,47],42623,[42624,30],[42656,80],[42775,9],[42786,103],[42891,53],[42946,9],[42997,13],[43011,3],[43015,4],[43020,23],[43072,52],[43138,50],[43250,6],43259,[43261,2],[43274,28],[43312,23],[43360,29],[43396,47],43471,[43488,5],43494,[43495,9],[43514,5],[43520,41],[43584,3],[43588,8],[43616,23],43642,[43646,50],43697,[43701,2],[43705,5],43712,43714,[43739,3],[43744,11],43762,[43763,2],[43777,6],[43785,6],[43793,6],[43808,7],[43816,7],[43824,43],[43868,14],[43888,115],[44032,11172],[55216,23],[55243,49],[63744,366],[64112,106],[64256,7],[64275,5],64285,[64287,10],[64298,13],[64312,5],64318,[64320,2],[64323,2],[64326,108],[64467,139],[64612,218],[64848,64],[64914,54],[65008,10],65137,65139,65143,65145,65147,65149,[65151,126],[65313,26],[65345,26],[65382,56],[65440,31],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],[65596,2],[65599,15],[65616,14],[65664,123],[65856,53],[66176,29],[66208,49],[66304,32],[66349,30],[66384,38],[66432,30],[66464,36],[66504,8],[66513,5],[66560,158],[66736,36],[66776,36],[66816,40],[66864,52],[67072,311],[67392,22],[67424,8],[67584,6],67592,[67594,44],[67639,2],67644,[67647,23],[67680,23],[67712,31],[67808,19],[67828,2],[67840,22],[67872,26],[67968,56],[68030,2],68096,[68112,4],[68117,3],[68121,29],[68192,29],[68224,29],[68288,8],[68297,28],[68352,54],[68416,22],[68448,19],[68480,18],[68608,73],[68736,51],[68800,51],[68864,36],[69248,42],[69296,2],[69376,29],69415,[69424,22],[69552,21],[69600,23],[69635,53],[69763,45],[69840,25],[69891,36],69956,69959,[69968,35],70006,[70019,48],[70081,4],70106,70108,[70144,18],[70163,25],[70272,7],70280,[70282,4],[70287,15],[70303,10],[70320,47],[70405,8],[70415,2],[70419,22],[70442,7],[70450,2],[70453,5],70461,70480,[70493,5],[70656,53],[70727,4],[70751,3],[70784,48],[70852,2],70855,[71040,47],[71128,4],[71168,48],71236,[71296,43],71352,[71424,27],[71680,44],[71840,64],[71935,8],71945,[71948,8],[71957,2],[71960,24],71999,72001,[72096,8],[72106,39],72161,72163,72192,[72203,40],72250,72272,[72284,46],72349,[72384,57],[72704,9],[72714,37],72768,[72818,30],[72960,7],[72968,2],[72971,38],73030,[73056,6],[73063,2],[73066,32],73112,[73440,19],73648,[73728,922],[74752,111],[74880,196],[77824,1071],[82944,583],[92160,569],[92736,31],[92880,30],[92928,48],[92992,4],[93027,21],[93053,19],[93760,64],[93952,75],94032,[94099,13],[94176,2],94179,[94208,6136],[100352,1238],[101632,9],[110592,287],[110928,3],[110948,4],[110960,396],[113664,107],[113776,13],[113792,9],[113808,10],[119808,85],[119894,71],[119966,2],119970,[119973,2],[119977,4],[119982,12],119995,[119997,7],[120005,65],[120071,4],[120077,8],[120086,7],[120094,28],[120123,4],[120128,5],120134,[120138,7],[120146,340],[120488,25],[120514,25],[120540,31],[120572,25],[120598,31],[120630,25],[120656,31],[120688,25],[120714,31],[120746,25],[120772,8],[123136,45],[123191,7],123214,[123584,44],[124928,197],[125184,68],125259,[126464,4],[126469,27],[126497,2],126500,126503,[126505,10],[126516,4],126521,126523,126530,126535,126537,126539,[126541,3],[126545,2],126548,126551,126553,126555,126557,126559,[126561,2],126564,[126567,4],[126572,7],[126580,4],[126585,4],126590,[126592,10],[126603,17],[126625,3],[126629,5],[126635,17],[131072,42718],[173824,4149],[177984,222],[178208,5762],[183984,7473],[194560,542],[196608,4939]],"XID_Continue":[[48,10],[65,26],95,[97,26],170,181,183,186,[192,23],[216,31],[248,458],[710,12],[736,5],748,750,[768,117],[886,2],[891,3],895,902,903,[904,3],908,[910,20],[931,83],[1015,139],[1155,5],[1162,166],[1329,38],1369,[1376,41],[1425,45],1471,[1473,2],[1476,2],1479,[1488,27],[1519,4],[1552,11],[1568,74],[1646,102],1749,[1750,7],[1759,10],[1770,19],1791,1808,1809,[1810,57],[1869,101],[1984,54],2042,2045,[2048,46],[2112,28],[2144,11],[2208,21],[2230,18],[2259,15],[2275,129],[2406,10],2417,[2418,18],[2437,8],[2447,2],[2451,22],[2474,7],2482,[2486,4],2492,2493,[2494,7],[2503,2],[2507,4],2519,[2524,2],[2527,5],[2534,12],2556,2558,[2561,3],[2565,6],[2575,2],[2579,22],[2602,7],[2610,2],[2613,2],[2616,2],2620,[2622,5],[2631,2],[2635,3],2641,[2649,4],2654,[2662,16],[2689,3],[2693,9],[2703,3],[2707,22],[2730,7],[2738,2],[2741,5],2748,2749,[2750,8],[2759,3],[2763,3],2768,[2784,4],[2790,10],2809,[2810,6],2817,[2818,2],[2821,8],[2831,2],[2835,22],[2858,7],[2866,2],[2869,5],2876,2877,2878,2879,2880,[2881,4],[2887,2],[2891,3],[2901,3],[2908,2],[2911,5],[2918,10],2929,2946,2947,[2949,6],[2958,3],[2962,4],[2969,2],2972,[2974,2],[2979,2],[2984,3],[2990,12],[3006,5],[3014,3],[3018,4],3024,3031,[3046,10],3072,[3073,12],[3086,3],[3090,23],[3114,16],3133,[3134,7],[3142,3],[3146,4],[3157,2],[3160,3],[3168,4],[3174,10],3200,3201,[3202,2],[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3260,3261,3262,3263,[3264,5],3270,[3271,2],[3274,4],[3285,2],3294,[3296,4],[3302,10],[3313,2],[3328,13],[3342,3],[3346,51],[3398,3],[3402,5],[3412,4],[3423,5],[3430,10],[3450,6],3457,[3458,2],[3461,18],[3482,24],[3507,9],3517,[3520,7],3530,[3535,6],3542,[3544,8],[3558,10],[3570,2],[3585,58],[3648,15],[3664,10],[3713,2],3716,[3718,5],[3724,24],3749,[3751,23],[3776,5],3782,[3784,6],[3792,10],[3804,4],3840,[3864,2],[3872,10],3893,3895,3897,[3902,10],[3913,36],[3953,20],[3974,18],[3993,36],4038,[4096,74],[4176,78],[4256,38],4295,4301,[4304,43],4348,[4349,332],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],[4957,3],[4969,9],[4992,16],[5024,86],[5112,6],[5121,620],[5743,17],[5761,26],[5792,75],[5870,11],[5888,13],[5902,7],[5920,21],[5952,20],[5984,13],[5998,3],[6002,2],[6016,84],6103,6108,6109,[6112,10],[6155,3],[6160,10],[6176,89],[6272,43],[6320,70],[6400,31],[6432,12],[6448,12],[6470,40],[6512,5],[6528,44],[6576,26],[6608,11],[6656,28],[6688,63],6752,6753,6754,[6755,26],6783,[6784,10],[6800,10],6823,[6832,14],[6847,2],[6912,76],[6992,10],[7019,9],[7040,116],[7168,56],[7232,10],[7245,49],[7296,9],[7312,43],[7357,3],[7376,3],[7380,39],[7424,250],[7675,283],[7960,6],[7968,38],[8008,6],[8016,8],8025,8027,8029,[8031,31],[8064,53],[8118,7],8126,[8130,3],[8134,7],[8144,4],[8150,6],[8160,13],[8178,3],[8182,7],[8255,2],8276,8305,8319,[8336,13],[8400,13],8417,[8421,12],8450,8455,[8458,10],8469,8472,[8473,5],8484,8486,8488,[8490,16],[8508,4],[8517,5],8526,[8544,41],[11264,47],[11312,47],[11360,133],[11499,9],[11520,38],11559,11565,[11568,56],11631,11647,[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],[11744,32],12293,12294,12295,[12321,15],[12337,5],[12344,5],[12353,86],[12441,2],[12445,3],[12449,90],[12540,4],[12549,43],[12593,94],[12704,32],[12784,16],[13312,6592],[19968,20989],[40960,1165],[42192,46],[42240,269],[42512,28],[42560,48],[42612,10],42623,[42624,114],[42775,9],[42786,103],[42891,53],[42946,9],[42997,51],43052,[43072,52],[43136,70],[43216,10],[43232,24],43259,[43261,49],[43312,36],[43360,29],[43392,65],43471,[43472,10],[43488,31],[43520,55],[43584,14],[43600,10],[43616,23],43642,43643,43644,43645,[43646,69],[43739,3],[43744,16],43762,[43763,4],[43777,6],[43785,6],[43793,6],[43808,7],[43816,7],[43824,43],[43868,14],[43888,123],44012,44013,[44016,10],[44032,11172],[55216,23],[55243,49],[63744,366],[64112,106],[64256,7],[64275,5],64285,64286,[64287,10],[64298,13],[64312,5],64318,[64320,2],[64323,2],[64326,108],[64467,139],[64612,218],[64848,64],[64914,54],[65008,10],[65024,16],[65056,16],[65075,2],[65101,3],65137,65139,65143,65145,65147,65149,[65151,126],[65296,10],[65313,26],65343,[65345,26],[65382,89],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],[65596,2],[65599,15],[65616,14],[65664,123],[65856,53],66045,[66176,29],[66208,49],66272,[66304,32],[66349,30],[66384,43],[66432,30],[66464,36],[66504,8],[66513,5],[66560,158],[66720,10],[66736,36],[66776,36],[66816,40],[66864,52],[67072,311],[67392,22],[67424,8],[67584,6],67592,[67594,44],[67639,2],67644,[67647,23],[67680,23],[67712,31],[67808,19],[67828,2],[67840,22],[67872,26],[67968,56],[68030,2],68096,[68097,3],[68101,2],[68108,8],[68117,3],[68121,29],[68152,3],68159,[68192,29],[68224,29],[68288,8],[68297,30],[68352,54],[68416,22],[68448,19],[68480,18],[68608,73],[68736,51],[68800,51],[68864,40],[68912,10],[69248,42],[69291,2],[69296,2],[69376,29],69415,[69424,33],[69552,21],[69600,23],69632,69633,69634,[69635,68],[69734,10],[69759,60],[69840,25],[69872,10],[69888,53],[69942,10],69956,[69957,3],[69968,36],70006,[70016,69],[70089,4],70094,70095,[70096,11],70108,[70144,18],[70163,37],70206,[70272,7],70280,[70282,4],[70287,15],[70303,10],[70320,59],[70384,10],[70400,4],[70405,8],[70415,2],[70419,22],[70442,7],[70450,2],[70453,5],[70459,10],[70471,2],[70475,3],70480,70487,[70493,7],[70502,7],[70512,5],[70656,75],[70736,10],70750,[70751,3],[70784,70],70855,[70864,10],[71040,54],[71096,9],[71128,6],[71168,65],71236,[71248,10],[71296,57],[71360,10],[71424,27],[71453,15],[71472,10],[71680,59],[71840,74],[71935,8],71945,[71948,8],[71957,2],[71960,30],[71991,2],[71995,9],[72016,10],[72096,8],[72106,46],[72154,8],72163,72164,72192,[72193,62],72263,72272,[72273,73],72349,[72384,57],[72704,9],[72714,45],[72760,9],[72784,10],[72818,30],[72850,22],72873,[72874,13],[72960,7],[72968,2],[72971,44],73018,[73020,2],[73023,9],[73040,10],[73056,6],[73063,2],[73066,37],[73104,2],[73107,6],[73120,10],[73440,23],73648,[73728,922],[74752,111],[74880,196],[77824,1071],[82944,583],[92160,569],[92736,31],[92768,10],[92880,30],[92912,5],[92928,55],[92992,4],[93008,10],[93027,21],[93053,19],[93760,64],[93952,75],94031,94032,[94033,55],[94095,17],[94176,2],94179,94180,[94192,2],[94208,6136],[100352,1238],[101632,9],[110592,287],[110928,3],[110948,4],[110960,396],[113664,107],[113776,13],[113792,9],[113808,10],[113821,2],[119141,5],[119149,6],[119163,8],[119173,7],[119210,4],[119362,3],[119808,85],[119894,71],[119966,2],119970,[119973,2],[119977,4],[119982,12],119995,[119997,7],[120005,65],[120071,4],[120077,8],[120086,7],[120094,28],[120123,4],[120128,5],120134,[120138,7],[120146,340],[120488,25],[120514,25],[120540,31],[120572,25],[120598,31],[120630,25],[120656,31],[120688,25],[120714,31],[120746,25],[120772,8],[120782,50],[121344,55],[121403,50],121461,121476,[121499,5],[121505,15],[122880,7],[122888,17],[122907,7],[122915,2],[122918,5],[123136,45],[123184,14],[123200,10],123214,[123584,58],[124928,197],[125136,7],[125184,76],[125264,10],[126464,4],[126469,27],[126497,2],126500,126503,[126505,10],[126516,4],126521,126523,126530,126535,126537,126539,[126541,3],[126545,2],126548,126551,126553,126555,126557,126559,[126561,2],126564,[126567,4],[126572,7],[126580,4],[126585,4],126590,[126592,10],[126603,17],[126625,3],[126629,5],[126635,17],[130032,10],[131072,42718],[173824,4149],[177984,222],[178208,5762],[183984,7473],[194560,542],[196608,4939],[917760,240]]}
$B.unicode_tables={}
for(var gc in $B.unicode){$B.unicode_tables[gc]={}
$B.unicode[gc].forEach(function(item){if(Array.isArray(item)){var step=item[2]||1
for(var i=0,nb=item[1];i < nb;i+=1){$B.unicode_tables[gc][item[0]+i*step]=true}}else{$B.unicode_tables[gc][item]=true}})}
for(var key in $B.unicode_identifiers){$B.unicode_tables[key]={}
for(const item of $B.unicode_identifiers[key]){if(Array.isArray(item)){for(var i=0;i < item[1];i++){$B.unicode_tables[key][item[0]+i]=true}}else{$B.unicode_tables[key][item]=true}}}
$B.is_unicode_cn=function(i){
var cn=$B.unicode.Cn
for(var j=0,len=cn.length;j < len;j++){if(i >=cn[j][0]){if(i < cn[j][0]+cn[j][1]){return true}}
return false}
return false}
;
;(function($B){var _b_=$B.builtins
var unicode_tables=$B.unicode_tables
$B.has_surrogate=function(s){
for(var i=0;i < s.length;i++){code=s.charCodeAt(i)
if(code >=0xD800 && code <=0xDBFF){return true}}
return false}
var str={__class__:_b_.type,__dir__:_b_.object.__dir__,$infos:{__module__:"builtins",__name__:"str"},$is_class:true,$native:true}
function normalize_start_end($){if($.start===null ||$.start===_b_.None){$.start=0}
else if($.start < 0){$.start+=$.self.length
$.start=Math.max(0,$.start)}
if($.end===null ||$.end===_b_.None){$.end=$.self.length}
else if($.end < 0){$.end+=$.self.length
$.end=Math.max(0,$.end)}
if(! _b_.isinstance($.start,_b_.int)||! _b_.isinstance($.end,_b_.int)){throw _b_.TypeError.$factory("slice indices must be integers "+
"or None or have an __index__ method")}}
function reverse(s){
return s.split("").reverse().join("")}
function check_str(obj,prefix){if(! _b_.isinstance(obj,str)){throw _b_.TypeError.$factory((prefix ||'')+
"must be str, not "+$B.class_name(obj))}}
function to_chars(s){
var chars=[]
for(var i=0,len=s.length;i < len;i++){var code=s.charCodeAt(i)
if(code >=0xD800 && code <=0xDBFF){chars.push(s.substr(i,2))
i++}else{chars.push(s.charAt(i))}}
return chars}
function to_codepoints(s){
var cps=[]
for(var i=0,len=s.length;i < len;i++){var code=s.charCodeAt(i)
if(code >=0xD800 && code <=0xDBFF){var v=0x10000
v+=(code & 0x03FF)<< 10
v+=(s.charCodeAt(i+1)& 0x03FF)
cps.push(v)
i++}else{cps.push(code)}}
return cps}
str.__add__=function(self,other){if(!(typeof other==="string")){try{return $B.$getattr(other,"__radd__")(self)}
catch(err){throw _b_.TypeError.$factory("Can't convert "+
$B.class_name(other)+" to str implicitly")}}
return self+other}
str.__contains__=function(self,item){if(! _b_.isinstance(item,str)){throw _b_.TypeError.$factory("'in <string>' requires "+
"string as left operand, not "+item.__class__)}
if(typeof item=="string"){var nbcar=item.length}else{var nbcar=_b_.len(item)}
if(nbcar==0){
return true}
if(self.length==0){return nbcar==0}
for(var i=0,len=self.length;i < len;i++){if(self.substr(i,nbcar)==item){return true}}
return false}
str.__delitem__=function(){throw _b_.TypeError.$factory("'str' object doesn't support item deletion")}
str.__dir__=_b_.object.__dir__
str.__eq__=function(self,other){if(_b_.isinstance(other,_b_.str)){return other.valueOf()==self.valueOf()}
return _b_.NotImplemented}
function preformat(self,fmt){if(fmt.empty){return _b_.str.$factory(self)}
if(fmt.type && fmt.type !="s"){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'str'")}
return self}
str.__format__=function(self,format_spec){var fmt=new $B.parse_format_spec(format_spec)
if(fmt.sign !==undefined){throw _b_.ValueError.$factory(
"Sign not allowed in string format specifier")}
if(fmt.precision){self=self.substr(0,fmt.precision)}
fmt.align=fmt.align ||"<"
return $B.format_width(preformat(self,fmt),fmt)}
str.__getitem__=function(self,arg){var chars=to_chars(self)
if(_b_.isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos+=self.length}
if(pos >=0 && pos < chars.length){return chars[pos]}
throw _b_.IndexError.$factory("string index out of range")}
if(_b_.isinstance(arg,_b_.slice)){var s=_b_.slice.$conv_for_seq(arg,self.length),start=s.start,stop=s.stop,step=s.step
var res="",i=null
if(step > 0){if(stop <=start){return ""}
for(var i=start;i < stop;i+=step){res+=chars[i]}}else{if(stop >=start){return ''}
for(var i=start;i > stop;i+=step){res+=chars[i]}}
return res}
if(_b_.isinstance(arg,_b_.bool)){return self.__getitem__(_b_.int.$factory(arg))}
throw _b_.TypeError.$factory("string indices must be integers")}
var prefix=2,suffix=3,mask=(2**32-1),str_hash_cache={}
str.$nb_str_hash_cache=0
function fnv(p){if(p.length==0){return 0}
var x=prefix
x=(x ^(p[0]<< 7))& mask
for(var i=0,len=p.length;i < len;i++){x=((1000003*x)^ p[i])& mask}
x=(x ^ p.length)& mask
x=(x ^ suffix)& mask
if(x==-1){x=-2}
return x}
str.__hash__=function(self){if(str_hash_cache[self]!==undefined){return str_hash_cache[self]}
str.$nb_str_hash_cache++
if(str.$nb_str_hash_cache > 100000){
str.$nb_str_hash_cache=0
str_hash_cache={}}
return str_hash_cache[self]=fnv(to_codepoints(self))}
str.__init__=function(self,arg){self.valueOf=function(){return arg}
self.toString=function(){return arg}
return _b_.None}
var str_iterator=$B.make_iterator_class("str_iterator")
str.__iter__=function(self){return str_iterator.$factory(to_chars(self))}
str.__len__=function(self){
return[...self].length}
var kwarg_key=new RegExp("([^\\)]*)\\)")
var NotANumber=function(){this.name="NotANumber"}
var number_check=function(s){if(! _b_.isinstance(s,[_b_.int,_b_.float])){throw new NotANumber()}}
var get_char_array=function(size,char){if(size <=0){return ""}
return new Array(size+1).join(char)}
var format_padding=function(s,flags,minus_one){var padding=flags.padding
if(! padding){
return s}
s=s.toString()
padding=parseInt(padding,10)
if(minus_one){
padding-=1}
if(! flags.left){return get_char_array(padding-s.length,flags.pad_char)+s}else{
return s+get_char_array(padding-s.length,flags.pad_char)}}
var format_int_precision=function(val,flags){var precision=flags.precision
if(!precision){return val.toString()}
precision=parseInt(precision,10)
var s
if(val.__class__===$B.long_int){s=$B.long_int.to_base(val,10)}else{s=val.toString()}
if(s[0]==="-"){return "-"+get_char_array(precision-s.length+1,"0")+s.slice(1)}
return get_char_array(precision-s.length,"0")+s}
var format_float_precision=function(val,upper,flags,modifier){var precision=flags.precision
if(isFinite(val)){return modifier(val,precision,flags,upper)}
if(val===Infinity){val="inf"}else if(val===-Infinity){val="-inf"}else{val="nan"}
if(upper){return val.toUpperCase()}
return val}
var format_sign=function(val,flags){if(flags.sign){if(val >=0){return "+"}}else if(flags.space){if(val >=0){return " "}}
return ""}
var str_format=function(val,flags){
flags.pad_char=" " 
return format_padding(str.$factory(val),flags)}
var num_format=function(val,flags){number_check(val)
if(val.__class__===$B.long_int){val=$B.long_int.to_base(val,10)}else{val=parseInt(val)}
var s=format_int_precision(val,flags)
if(flags.pad_char==="0"){if(val < 0){s=s.substring(1)
return "-"+format_padding(s,flags,true)}
var sign=format_sign(val,flags)
if(sign !==""){return sign+format_padding(s,flags,true)}}
return format_padding(format_sign(val,flags)+s,flags)}
var repr_format=function(val,flags){flags.pad_char=" " 
return format_padding(_b_.repr(val),flags)}
var ascii_format=function(val,flags){flags.pad_char=" " 
return format_padding(_b_.ascii(val),flags)}
var _float_helper=function(val,flags){number_check(val)
if(! flags.precision){if(! flags.decimal_point){flags.precision=6}else{flags.precision=0}}else{flags.precision=parseInt(flags.precision,10)
validate_precision(flags.precision)}
return parseFloat(val)}
var trailing_zeros=/(.*?)(0+)([eE].*)/,leading_zeros=/\.(0*)/,trailing_dot=/\.$/
var validate_precision=function(precision){
if(precision > 20){precision=20}}
var floating_point_format=function(val,upper,flags){val=_float_helper(val,flags),v=val.toString(),v_len=v.length,dot_idx=v.indexOf('.')
if(dot_idx < 0){dot_idx=v_len}
if(val < 1 && val >-1){var zeros=leading_zeros.exec(v),numzeros
if(zeros){numzeros=zeros[1].length}else{numzeros=0}
if(numzeros >=4){val=format_sign(val,flags)+format_float_precision(val,upper,flags,_floating_g_exp_helper)
if(!flags.alternate){var trl=trailing_zeros.exec(val)
if(trl){val=trl[1].replace(trailing_dot,"")+trl[3]}}else{if(flags.precision <=1){val=val[0]+"."+val.substring(1)}}
return format_padding(val,flags)}
flags.precision=(flags.precision ||0)+numzeros
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,function(val,precision){return val.toFixed(_b_.min(precision,v_len-dot_idx)+
numzeros)}),flags
)}
if(dot_idx > flags.precision){val=format_sign(val,flags)+format_float_precision(val,upper,flags,_floating_g_exp_helper)
if(! flags.alternate){var trl=trailing_zeros.exec(val)
if(trl){val=trl[1].replace(trailing_dot,"")+trl[3]}}else{if(flags.precision <=1){val=val[0]+"."+val.substring(1)}}
return format_padding(val,flags)}
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,function(val,precision){if(!flags.decimal_point){precision=_b_.min(v_len-1,6)}else if(precision > v_len){if(! flags.alternate){precision=v_len}}
if(precision < dot_idx){precision=dot_idx}
return val.toFixed(precision-dot_idx)}),flags
)}
var _floating_g_exp_helper=function(val,precision,flags,upper){if(precision){--precision}
val=val.toExponential(precision)
var e_idx=val.lastIndexOf("e")
if(e_idx > val.length-4){val=val.substring(0,e_idx+2)+"0"+val.substring(e_idx+2)}
if(upper){return val.toUpperCase()}
return val}
var floating_point_decimal_format=function(val,upper,flags){val=_float_helper(val,flags)
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,function(val,precision,flags){val=val.toFixed(precision)
if(precision===0 && flags.alternate){val+='.'}
return val}),flags
)}
var _floating_exp_helper=function(val,precision,flags,upper){val=val.toExponential(precision)
var e_idx=val.lastIndexOf("e")
if(e_idx > val.length-4){val=val.substring(0,e_idx+2)+"0"+val.substring(e_idx+2)}
if(upper){return val.toUpperCase()}
return val}
var floating_point_exponential_format=function(val,upper,flags){val=_float_helper(val,flags)
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,_floating_exp_helper),flags)}
var signed_hex_format=function(val,upper,flags){var ret
number_check(val)
if(val.__class__===$B.long_int){ret=$B.long_int.to_base(val,16)}else{ret=parseInt(val)
ret=ret.toString(16)}
ret=format_int_precision(ret,flags)
if(upper){ret=ret.toUpperCase()}
if(flags.pad_char==="0"){if(val < 0){ret=ret.substring(1)
ret="-"+format_padding(ret,flags,true)}
var sign=format_sign(val,flags)
if(sign !==""){ret=sign+format_padding(ret,flags,true)}}
if(flags.alternate){if(ret.charAt(0)==="-"){if(upper){ret="-0X"+ret.slice(1)}
else{ret="-0x"+ret.slice(1)}}else{if(upper){ret="0X"+ret}
else{ret="0x"+ret}}}
return format_padding(format_sign(val,flags)+ret,flags)}
var octal_format=function(val,flags){number_check(val)
var ret
if(val.__class__===$B.long_int){ret=$B.long_int.to_base(8)}else{ret=parseInt(val)
ret=ret.toString(8)}
ret=format_int_precision(ret,flags)
if(flags.pad_char==="0"){if(val < 0){ret=ret.substring(1)
ret="-"+format_padding(ret,flags,true)}
var sign=format_sign(val,flags)
if(sign !==""){ret=sign+format_padding(ret,flags,true)}}
if(flags.alternate){if(ret.charAt(0)==="-"){ret="-0o"+ret.slice(1)}
else{ret="0o"+ret}}
return format_padding(ret,flags)}
function series_of_bytes(val,flags){if(val.__class__ && val.__class__.$buffer_protocol){var it=_b_.iter(val),ints=[]
while(true){try{ints.push(_b_.next(it))}catch(err){if(err.__class__===_b_.StopIteration){var b=_b_.bytes.$factory(ints)
return format_padding(_b_.bytes.decode(b,"ascii"),flags)}
throw err}}}else{try{bytes_obj=$B.$getattr(val,"__bytes__")
return format_padding(_b_.bytes.decode(bytes_obj),flags)}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("%b does not accept '"+
$B.class_name(val)+"'")}
throw err}}}
var single_char_format=function(val,flags){if(_b_.isinstance(val,str)&& val.length==1){return val}else if(_b_.isinstance(val,_b_.bytes)&& val.source.length==1){val=val.source[0]}else{try{val=_b_.int.$factory(val)}catch(err){throw _b_.TypeError.$factory("%c requires int or char")}}
return format_padding(_b_.chr(val),flags)}
var num_flag=function(c,flags){if(c==="0" && ! flags.padding && ! flags.decimal_point && ! flags.left){flags.pad_char="0"
return}
if(!flags.decimal_point){flags.padding=(flags.padding ||"")+c}else{flags.precision=(flags.precision ||"")+c}}
var decimal_point_flag=function(val,flags){if(flags.decimal_point){
throw new UnsupportedChar()}
flags.decimal_point=true}
var neg_flag=function(val,flags){flags.pad_char=" " 
flags.left=true}
var space_flag=function(val,flags){flags.space=true}
var sign_flag=function(val,flags){flags.sign=true}
var alternate_flag=function(val,flags){flags.alternate=true}
var char_mapping={"b":series_of_bytes,"s":str_format,"d":num_format,"i":num_format,"u":num_format,"o":octal_format,"r":repr_format,"a":ascii_format,"g":function(val,flags){return floating_point_format(val,false,flags)},"G":function(val,flags){return floating_point_format(val,true,flags)},"f":function(val,flags){return floating_point_decimal_format(val,false,flags)},"F":function(val,flags){return floating_point_decimal_format(val,true,flags)},"e":function(val,flags){return floating_point_exponential_format(val,false,flags)},"E":function(val,flags){return floating_point_exponential_format(val,true,flags)},"x":function(val,flags){return signed_hex_format(val,false,flags)},"X":function(val,flags){return signed_hex_format(val,true,flags)},"c":single_char_format,"0":function(val,flags){return num_flag("0",flags)},"1":function(val,flags){return num_flag("1",flags)},"2":function(val,flags){return num_flag("2",flags)},"3":function(val,flags){return num_flag("3",flags)},"4":function(val,flags){return num_flag("4",flags)},"5":function(val,flags){return num_flag("5",flags)},"6":function(val,flags){return num_flag("6",flags)},"7":function(val,flags){return num_flag("7",flags)},"8":function(val,flags){return num_flag("8",flags)},"9":function(val,flags){return num_flag("9",flags)},"-":neg_flag," ":space_flag,"+":sign_flag,".":decimal_point_flag,"#":alternate_flag}
var UnsupportedChar=function(){this.name="UnsupportedChar"}
str.__mod__=function(self,args){var length=self.length,pos=0 |0,argpos=null,getitem
if(_b_.isinstance(args,_b_.tuple)){argpos=0 |0}else{getitem=$B.$getattr(args,"__getitem__",_b_.None)}
var ret=''
var $get_kwarg_string=function(s){
++pos
var rslt=kwarg_key.exec(s.substring(newpos))
if(! rslt){throw _b_.ValueError.$factory("incomplete format key")}
var key=rslt[1]
newpos+=rslt[0].length
try{var self=getitem(key)}catch(err){if(err.__class__===_b_.KeyError){throw err}
throw _b_.TypeError.$factory("format requires a mapping")}
return get_string_value(s,self)}
var $get_arg_string=function(s){
var self
if(argpos===null){
self=args}else{self=args[argpos++]
if(self===undefined){throw _b_.TypeError.$factory(
"not enough arguments for format string")}}
return get_string_value(s,self)}
var get_string_value=function(s,self){
var flags={"pad_char":" "}
do{var func=char_mapping[s[newpos]]
try{if(func===undefined){throw new UnsupportedChar()}else{var ret=func(self,flags)
if(ret !==undefined){return ret}
++newpos}}catch(err){if(err.name=="UnsupportedChar"){invalid_char=s[newpos]
if(invalid_char===undefined){throw _b_.ValueError.$factory("incomplete format")}
throw _b_.ValueError.$factory(
"unsupported format character '"+invalid_char+
"' (0x"+invalid_char.charCodeAt(0).toString(16)+
") at index "+newpos)}else if(err.name==="NotANumber"){var try_char=s[newpos],cls=self.__class__
if(!cls){if(typeof(self)==="string"){cls="str"}else{cls=typeof(self)}}else{cls=cls.$infos.__name__}
throw _b_.TypeError.$factory("%"+try_char+
" format: a number is required, not "+cls)}else{throw err}}}while(true)}
var nbph=0 
do{var newpos=self.indexOf("%",pos)
if(newpos < 0){ret+=self.substring(pos)
break}
ret+=self.substring(pos,newpos)
++newpos
if(newpos < length){if(self[newpos]==="%"){ret+="%"}else{nbph++
if(self[newpos]==="("){++newpos
ret+=$get_kwarg_string(self)}else{ret+=$get_arg_string(self)}}}else{
throw _b_.ValueError.$factory("incomplete format")}
pos=newpos+1}while(pos < length)
if(argpos !==null){if(args.length > argpos){throw _b_.TypeError.$factory(
"not enough arguments for format string")}else if(args.length < argpos){throw _b_.TypeError.$factory(
"not all arguments converted during string formatting")}}else if(nbph==0){throw _b_.TypeError.$factory(
"not all arguments converted during string formatting")}
return ret}
str.__mro__=[_b_.object]
str.__mul__=function(){var $=$B.args("__mul__",2,{self:null,other:null},["self","other"],arguments,{},null,null)
if(! _b_.isinstance($.other,_b_.int)){throw _b_.TypeError.$factory(
"Can't multiply sequence by non-int of type '"+
$B.class_name($.other)+"'")}
return $.self.valueOf().repeat($.other)}
str.__ne__=function(self,other){return other !==self.valueOf()}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=args[1]
res.__class__=args[0]
return res}
str.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__ ||_b_.str,self]),_b_.None,_b_.None])}
str.__repr__=function(self){
var t={8:"\\x08",9:"\\t",10:"\\n",11:"\\x0b",12:"\\x0c",13:"\\r",92:"\\\\"}
var repl='',chars=to_chars(self)
for(var i=0;i < chars.length;i++){var cp=_b_.ord(chars[i])
if(t[cp]!==undefined){repl+=t[cp]}else if($B.is_unicode_cn(cp)){var s=cp.toString(16)
while(s.length < 4){s='0'+s}
repl+='\\u'+s}else if(cp < 0x20 ||(cp >=0x7f && cp < 0xa0)){cp=cp.toString(16)
if(cp.length < 2){cp='0'+cp}
repl+='\\x'+cp}else if(cp >=0x300 && cp <=0x36F){repl+="\u200B"+chars[i]}else{repl+=chars[i]}}
var res=repl
if(res.search('"')==-1 && res.search("'")==-1){return "'"+res+"'"}else if(self.search('"')==-1){return '"'+res+'"'}
var qesc=new RegExp("'","g")
res="'"+res.replace(qesc,"\\'")+"'"
return res}
str.__rmul__=function(self,other){if(_b_.isinstance(other,_b_.int)){other=_b_.int.numerator(other)
var res=''
while(other > 0){res+=self
other--}
return res}
return _b_.NotImplemented}
str.__setattr__=function(self,attr,value){if(typeof self==="string"){if(str.hasOwnProperty(attr)){throw _b_.AttributeError.$factory("'str' object attribute '"+
attr+"' is read-only")}else{throw _b_.AttributeError.$factory(
"'str' object has no attribute '"+attr+"'")}}
_b_.dict.$setitem(self.__dict__,attr,value)
return $N}
str.__setitem__=function(self,attr,value){throw _b_.TypeError.$factory(
"'str' object does not support item assignment")}
var combining=[]
for(var cp=0x300;cp <=0x36F;cp++){combining.push(String.fromCharCode(cp))}
var combining_re=new RegExp("("+combining.join("|")+")","g")
str.__str__=function(self){var repl='',chars=to_chars(self)
if(chars.length==self.length){return self.replace(combining_re,"\u200B$1")}
for(var i=0;i < chars.length;i++){var cp=_b_.ord(chars[i])
if(cp >=0x300 && cp <=0x36F){repl+="\u200B"+chars[i]}else{repl+=chars[i]}}
return repl}
str.toString=function(){return "string!"}
var $comp_func=function(self,other){if(typeof other !=="string"){return _b_.NotImplemented}
return self > other}
$comp_func+="" 
var $comps={">":"gt",">=":"ge","<":"lt","<=":"le"}
for(var $op in $comps){eval("str.__"+$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))}
var $notimplemented=function(self,other){throw _b_.NotImplementedError.$factory(
"OPERATOR not implemented for class str")}
str.capitalize=function(self){var $=$B.args("capitalize",1,{self},["self"],arguments,{},null,null)
if(self.length==0){return ""}
return self.charAt(0).toUpperCase()+self.substr(1)}
str.casefold=function(self){var $=$B.args("casefold",1,{self},["self"],arguments,{},null,null),res="",char,cf,chars=to_chars($.self)
for(var i=0,len=chars.length;i < len;i++){char=chars[i]
cf=$B.unicode_casefold[char]
if(cf){cf.forEach(function(cp){res+=String.fromCharCode(cp)})}else{res+=char.toLowerCase()}}
return res}
str.center=function(){var $=$B.args("center",3,{self:null,width:null,fillchar:null},["self","width","fillchar"],arguments,{fillchar:" "},null,null),self=$.self
if($.width <=self.length){return self}
var pad=parseInt(($.width-self.length)/2),res=$.fillchar.repeat(pad)
res+=self+res
if(res.length < $.width){res+=$.fillchar}
return res}
str.count=function(){var $=$B.args("count",4,{self:null,sub:null,start:null,stop:null},["self","sub","start","stop"],arguments,{start:null,stop:null},null,null)
if(!(typeof $.sub=="string")){throw _b_.TypeError.$factory("Can't convert '"+$B.class_name($.sub)+
"' object to str implicitly")}
var substr=$.self
if($.start !==null){var _slice
if($.stop !==null){_slice=_b_.slice.$factory($.start,$.stop)}else{_slice=_b_.slice.$factory($.start,$.self.length)}
substr=str.__getitem__.apply(null,[$.self].concat(_slice))}else{if($.self.length+$.sub.length==0){return 1}}
if($.sub.length==0){if($.start==$.self.length){return 1}else if(substr.length==0){return 0}
return substr.length+1}
var n=0,pos=0
while(pos < substr.length){pos=substr.indexOf($.sub,pos)
if(pos >=0){n++
pos+=$.sub.length}else{break}}
return n}
str.encode=function(){var $=$B.args("encode",3,{self:null,encoding:null,errors:null},["self","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null)
if($.encoding=="rot13" ||$.encoding=="rot_13"){
var res=""
for(var i=0,len=$.self.length;i < len ;i++){var char=$.self.charAt(i)
if(("a" <=char && char <="m")||("A" <=char && char <="M")){res+=String.fromCharCode(String.charCodeAt(char)+13)}else if(("m" < char && char <="z")||
("M" < char && char <="Z")){res+=String.fromCharCode(String.charCodeAt(char)-13)}else{res+=char}}
return res}
return _b_.bytes.__new__(_b_.bytes,$.self,$.encoding,$.errors)}
str.endswith=function(){
var $=$B.args("endswith",4,{self:null,suffix:null,start:null,end:null},["self","suffix","start","end"],arguments,{start:0,end:null},null,null)
normalize_start_end($)
var suffixes=$.suffix
if(! _b_.isinstance(suffixes,_b_.tuple)){suffixes=[suffixes]}
var chars=to_chars($.self),s=chars.slice($.start,$.end)
for(var i=0,len=suffixes.length;i < len;i++){var suffix=suffixes[i]
if(! _b_.isinstance(suffix,str)){throw _b_.TypeError.$factory(
"endswith first arg must be str or a tuple of str, not int")}
if(suffix.length <=s.length &&
s.slice(s.length-suffix.length).join('')==suffix){return true}}
return false}
str.expandtabs=function(self,tabsize){var $=$B.args("expandtabs",2,{self:null,tabsize:null},["self","tabsize"],arguments,{tabsize:8},null,null)
var s=$B.$GetInt($.tabsize),col=0,pos=0,res="",chars=to_chars(self)
if(s==1){return self.replace(/\t/g," ")}
while(pos < chars.length){var car=chars[pos]
switch(car){case "\t":
while(col % s > 0){res+=" ";
col++}
break
case "\r":
case "\n":
res+=car
col=0
break
default:
res+=car
col++
break}
pos++}
return res}
str.find=function(){
var $=$B.args("str.find",4,{self:null,sub:null,start:null,end:null},["self","sub","start","end"],arguments,{start:0,end:null},null,null)
check_str($.sub)
normalize_start_end($)
if(!_b_.isinstance($.start,_b_.int)||
!_b_.isinstance($.end,_b_.int)){throw _b_.TypeError.$factory("slice indices must be "+
"integers or None or have an __index__ method")}
var s=""
for(var i=$.start;i < $.end;i++){s+=$.self.charAt(i)}
var len=str.__len__($.self)
if($.sub.length==0 && $.start==len){return len}
if(s.length+$.sub.length==0){return-1}
var last_search=s.length-$.sub.length
for(var i=0;i <=last_search;i++){if(s.substr(i,$.sub.length)==$.sub){return $.start+str.__len__(s.substr(0,i))}}
return-1}
$B.parse_format=function(fmt_string){
var elts=fmt_string.split(":"),name,conv,spec,name_ext=[]
if(elts.length==1){
name=fmt_string}else{
name=elts[0]
spec=elts.splice(1).join(":")}
var elts=name.split("!")
if(elts.length > 1){name=elts[0]
conv=elts[1]}
if(name !==undefined){
function name_repl(match){name_ext.push(match)
return ""}
var name_ext_re=/\.[_a-zA-Z][_a-zA-Z0-9]*|\[[_a-zA-Z][_a-zA-Z0-9]*\]|\[[0-9]+\]/g
name=name.replace(name_ext_re,name_repl)}
return{name:name,name_ext:name_ext,conv:conv,spec:spec ||"",string:fmt_string}}
$B.split_format=function(self){
var pos=0,_len=self.length,car,text="",parts=[],rank=0
while(pos < _len){car=self.charAt(pos)
if(car=="{" && self.charAt(pos+1)=="{"){
text+="{"
pos+=2}else if(car=="}" && self.charAt(pos+1)=="}"){
text+="}"
pos+=2}else if(car=="{"){
parts.push(text)
var end=pos+1,nb=1
while(end < _len){if(self.charAt(end)=="{"){nb++;end++}
else if(self.charAt(end)=="}"){nb--;end++
if(nb==0){
var fmt_string=self.substring(pos+1,end-1)
var fmt_obj=$B.parse_format(fmt_string)
fmt_obj.raw_name=fmt_obj.name
fmt_obj.raw_spec=fmt_obj.spec
if(!fmt_obj.name){fmt_obj.name=rank+""
rank++}
if(fmt_obj.spec !==undefined){
function replace_nested(name,key){if(key==""){
return "{"+rank+++"}"}
return "{"+key+"}"}
fmt_obj.spec=fmt_obj.spec.replace(/\{(.*?)\}/g,replace_nested)}
parts.push(fmt_obj)
text=""
break}}else{end++}}
if(nb > 0){throw _b_.ValueError.$factory("wrong format "+self)}
pos=end}else{text+=car
pos++}}
if(text){parts.push(text)}
return parts}
str.format=function(self){
var last_arg=$B.last(arguments)
if(last_arg.$nat=="mapping"){var mapping=last_arg.mapping,getitem=$B.$getattr(mapping,"__getitem__")
var args=[]
for(var i=0,len=arguments.length-1;i < len;i++){args.push(arguments[i])}
var $=$B.args("format",1,{self:null},["self"],args,{},"$args",null)}else{var $=$B.args("format",1,{self:null},["self"],arguments,{},"$args","$kw"),mapping=$.$kw,
getitem=function(key){return _b_.dict.$getitem(mapping,key)}}
var parts=$B.split_format($.self)
var res="",fmt
for(var i=0;i < parts.length;i++){
if(typeof parts[i]=="string"){res+=parts[i];continue}
fmt=parts[i]
if(fmt.spec !==undefined){
function replace_nested(name,key){if(/\d+/.exec(key)){
return _b_.tuple.__getitem__($.$args,parseInt(key))}else{
return _b_.dict.__getitem__($.$kw,key)}}
fmt.spec=fmt.spec.replace(/\{(.*?)\}/g,replace_nested)}
if(fmt.name.charAt(0).search(/\d/)>-1){
var pos=parseInt(fmt.name),value=_b_.tuple.__getitem__($.$args,pos)}else{
var value=getitem(fmt.name)}
for(var j=0;j < fmt.name_ext.length;j++){var ext=fmt.name_ext[j]
if(ext.charAt(0)=="."){
value=$B.$getattr(value,ext.substr(1))}else{
var key=ext.substr(1,ext.length-2)
if(key.charAt(0).search(/\d/)>-1){key=parseInt(key)}
value=$B.$getattr(value,"__getitem__")(key)}}
if(fmt.conv=="a"){value=_b_.ascii(value)}
else if(fmt.conv=="r"){value=_b_.repr(value)}
else if(fmt.conv=="s"){value=_b_.str.$factory(value)}
if(value.$is_class ||value.$factory){
res+=value.__class__.__format__(value,fmt.spec)}else{res+=$B.$getattr(value,"__format__")(fmt.spec)}}
return res}
str.format_map=function(self,mapping){var $=$B.args("format_map",2,{self:null,mapping:null},['self','mapping'],arguments,{},null,null)
return str.format(self,{$nat:'mapping',mapping})}
str.index=function(self){
var res=str.find.apply(null,arguments)
if(res===-1){throw _b_.ValueError.$factory("substring not found")}
return res}
str.isascii=function(self){
for(var i=0,len=self.length;i < len;i++){if(self.charCodeAt(i)> 127){return false}}
return true}
str.isalnum=function(self){
var $=$B.args("isalnum",1,{self:null},["self"],arguments,{},null,null),cp
for(var char of to_chars(self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]||
unicode_tables.Lu[cp]||
unicode_tables.Lm[cp]||
unicode_tables.Lt[cp]||
unicode_tables.Lo[cp]||
unicode_tables.Nd[cp]||
unicode_tables.digits[cp]||
unicode_tables.numeric[cp]){continue}
return false}
return true}
str.isalpha=function(self){
var $=$B.args("isalpha",1,{self:null},["self"],arguments,{},null,null),cp
for(var char of to_chars(self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]||
unicode_tables.Lu[cp]||
unicode_tables.Lm[cp]||
unicode_tables.Lt[cp]||
unicode_tables.Lo[cp]){continue}
return false}
return true}
str.isdecimal=function(self){
var $=$B.args("isdecimal",1,{self:null},["self"],arguments,{},null,null),cp
for(var char of to_chars(self)){cp=_b_.ord(char)
if(! unicode_tables.Nd[cp]){return false}}
return self.length > 0}
str.isdigit=function(self){
var $=$B.args("isdigit",1,{self:null},["self"],arguments,{},null,null),cp
for(var char of to_chars(self)){cp=_b_.ord(char)
if(! unicode_tables.digits[cp]){return false}}
return self.length > 0}
str.isidentifier=function(self){
var $=$B.args("isidentifier",1,{self:null},["self"],arguments,{},null,null)
if(self.length==0){return false}
var chars=to_chars(self)
if(unicode_tables.XID_Start[_b_.ord(chars[0])]===undefined){return false}else{for(var char of chars){var cp=_b_.ord(char)
if(unicode_tables.XID_Continue[cp]===undefined){return false}}}
return true}
str.islower=function(self){
var $=$B.args("islower",1,{self:null},["self"],arguments,{},null,null),has_cased=false,cp
for(var char of to_chars(self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]){has_cased=true
continue}else if(unicode_tables.Lu[cp]||unicode_tables.Lt[cp]){return false}}
return has_cased}
str.isnumeric=function(self){
var $=$B.args("isnumeric",1,{self:null},["self"],arguments,{},null,null)
for(var char of to_chars(self)){if(! unicode_tables.numeric[_b_.ord(char)]){return false}}
return self.length > 0}
var unprintable={},unprintable_gc=['Cc','Cf','Co','Cs','Zl','Zp','Zs']
str.isprintable=function(self){
if(Object.keys(unprintable).length==0){for(var i=0;i < unprintable_gc.length;i++){var table=unicode_tables[unprintable_gc[i]]
for(var cp in table){unprintable[cp]=true}}
unprintable[32]=true}
var $=$B.args("isprintable",1,{self:null},["self"],arguments,{},null,null)
for(var char of to_chars(self)){if(unprintable[_b_.ord(char)]){return false}}
return true}
str.isspace=function(self){
var $=$B.args("isspace",1,{self:null},["self"],arguments,{},null,null),cp
for(var char of to_chars(self)){cp=_b_.ord(char)
if(! unicode_tables.Zs[cp]&&
$B.unicode_bidi_whitespace.indexOf(cp)==-1){return false}}
return self.length > 0}
str.istitle=function(self){
var $=$B.args("istitle",1,{self:null},["self"],arguments,{},null,null)
return self.length > 0 && str.title(self)==self}
str.isupper=function(self){
var $=$B.args("islower",1,{self:null},["self"],arguments,{},null,null),is_upper=false,cp
for(var char of to_chars(self)){cp=_b_.ord(char)
if(unicode_tables.Lu[cp]){is_upper=true
continue}else if(unicode_tables.Ll[cp]||unicode_tables.Lt[cp]){return false}}
return is_upper}
str.join=function(){var $=$B.args("join",2,{self:null,iterable:null},["self","iterable"],arguments,{},null,null)
var iterable=_b_.iter($.iterable),res=[],count=0
while(1){try{var obj2=_b_.next(iterable)
if(! _b_.isinstance(obj2,str)){throw _b_.TypeError.$factory("sequence item "+count+
": expected str instance, "+$B.class_name(obj2)+
" found")}
res.push(obj2)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
else{throw err}}}
return res.join($.self)}
str.ljust=function(self){var $=$B.args("ljust",3,{self:null,width:null,fillchar:null},["self","width","fillchar"],arguments,{fillchar:" "},null,null),len=str.__len__(self)
if($.width <=len){return self}
return self+$.fillchar.repeat($.width-len)}
str.lower=function(self){var $=$B.args("lower",1,{self:null},["self"],arguments,{},null,null)
return self.toLowerCase()}
str.lstrip=function(self,x){var $=$B.args("lstrip",2,{self:null,chars:null},["self","chars"],arguments,{chars:_b_.None},null,null)
if($.chars===_b_.None){return $.self.trimLeft()}
var chars=to_chars(self)
for(var i=0,len=chars.length;i < len;i++){if($.chars.indexOf(chars[i])===-1){return chars.slice(i).join('')}}
return ""}
str.maketrans=function(){var $=$B.args("maketrans",3,{x:null,y:null,z:null},["x","y","z"],arguments,{y:null,z:null},null,null)
var _t=$B.empty_dict()
if($.y===null && $.z===null){
if(! _b_.isinstance($.x,_b_.dict)){throw _b_.TypeError.$factory(
"maketrans only argument must be a dict")}
var items=_b_.list.$factory(_b_.dict.items($.x))
for(var i=0,len=items.length;i < len;i++){var k=items[i][0],v=items[i][1]
if(! _b_.isinstance(k,_b_.int)){if(_b_.isinstance(k,_b_.str)&& k.length==1){k=_b_.ord(k)}else{throw _b_.TypeError.$factory("dictionary key "+k+
" is not int or 1-char string")}}
if(v !==_b_.None && ! _b_.isinstance(v,[_b_.int,_b_.str])){throw _b_.TypeError.$factory("dictionary value "+v+
" is not None, integer or string")}
_b_.dict.$setitem(_t,k,v)}
return _t}else{
if(!(_b_.isinstance($.x,_b_.str)&& _b_.isinstance($.y,_b_.str))){throw _b_.TypeError.$factory("maketrans arguments must be strings")}else if($.x.length !==$.y.length){throw _b_.TypeError.$factory(
"maketrans arguments must be strings or same length")}else{var toNone={}
if($.z !==null){
if(! _b_.isinstance($.z,_b_.str)){throw _b_.TypeError.$factory(
"maketrans third argument must be a string")}
for(var i=0,len=$.z.length;i < len;i++){toNone[_b_.ord($.z.charAt(i))]=true}}
for(var i=0,len=$.x.length;i < len;i++){var key=_b_.ord($.x.charAt(i)),value=$.y.charCodeAt(i)
_b_.dict.$setitem(_t,key,value)}
for(var k in toNone){_b_.dict.$setitem(_t,parseInt(k),_b_.None)}
return _t}}}
str.maketrans.$type="staticmethod"
str.partition=function(){var $=$B.args("partition",2,{self:null,sep:null},["self","sep"],arguments,{},null,null)
if($.sep==""){throw _b_.ValueError.$factory("empty separator")}
check_str($.sep)
var chars=to_chars($.self),i=$.self.indexOf($.sep)
if(i==-1){return _b_.tuple.$factory([$.self,"",""])}
return _b_.tuple.$factory([chars.slice(0,i).join(''),$.sep,chars.slice(i+$.sep.length).join('')])}
str.removeprefix=function(){var $=$B.args("removeprefix",2,{self:null,prefix:null},["self","prefix"],arguments,{},null,null)
if(!_b_.isinstance($.prefix,str)){throw _b_.ValueError.$factory("prefix should be str, not "+
`'${$B.class_name($.prefix)}'`)}
if(str.startswith($.self,$.prefix)){return $.self.substr($.prefix.length)}
return $.self.substr(0)}
str.removesuffix=function(){var $=$B.args("removesuffix",2,{self:null,prefix:null},["self","suffix"],arguments,{},null,null)
if(!_b_.isinstance($.suffix,str)){throw _b_.ValueError.$factory("suffix should be str, not "+
`'${$B.class_name($.prefix)}'`)}
if($.suffix.length > 0 && str.endswith($.self,$.suffix)){return $.self.substr(0,$.self.length-$.suffix.length)}
return $.self.substr(0)}
function $re_escape(str){var specials="[.*+?|()$^"
for(var i=0,len=specials.length;i < len;i++){var re=new RegExp("\\"+specials.charAt(i),"g")
str=str.replace(re,"\\"+specials.charAt(i))}
return str}
str.replace=function(self,old,_new,count){
var $=$B.args("replace",4,{self:null,old:null,$$new:null,count:null},["self","old","$$new","count"],arguments,{count:-1},null,null),count=$.count,self=$.self,old=$.old,_new=$.$$new
check_str(old,"replace() argument 1 ")
check_str(_new,"replace() argument 2 ")
if(! _b_.isinstance(count,[_b_.int,_b_.float])){throw _b_.TypeError.$factory("'"+$B.class_name(count)+
"' object cannot be interpreted as an integer")}else if(_b_.isinstance(count,_b_.float)){throw _b_.TypeError.$factory("integer argument expected, got float")}
if(count==0){return self}
if(count.__class__==$B.long_int){count=parseInt(count.value)}
if(old==""){if(_new==""){return self}
if(self==""){return _new}
var elts=self.split("")
if(count >-1 && elts.length >=count){var rest=elts.slice(count).join("")
return _new+elts.slice(0,count).join(_new)+rest}else{return _new+elts.join(_new)+_new}}else{var elts=str.split(self,old,count)}
var res=self,pos=-1
if(old.length==0){var res=_new
for(var i=0;i < elts.length;i++){res+=elts[i]+_new}
return res+rest}
if(count < 0){count=res.length}
while(count > 0){pos=res.indexOf(old,pos)
if(pos < 0){break}
res=res.substr(0,pos)+_new+res.substr(pos+old.length)
pos=pos+_new.length
count--}
return res}
str.rfind=function(self,substr){
if(arguments.length==2 && typeof substr=="string"){return self.lastIndexOf(substr)}
var $=$B.args("rfind",4,{self:null,sub:null,start:null,end:null},["self","sub","start","end"],arguments,{start:0,end:null},null,null)
normalize_start_end($)
check_str($.sub)
if($.sub.length==0){if($.start > $.self.length){return-1}else{return str.__len__($.self)}}
var sublen=$.sub.length
for(var i=$.end-sublen;i >=$.start;i--){if($.self.substr(i,sublen)==$.sub){return str.__len__($.self.substr(0,i))}}
return-1}
str.rindex=function(){
var res=str.rfind.apply(null,arguments)
if(res==-1){throw _b_.ValueError.$factory("substring not found")}
return res}
str.rjust=function(self){var $=$B.args("rjust",3,{self:null,width:null,fillchar:null},["self","width","fillchar"],arguments,{fillchar:" "},null,null)
if($.width <=self.length){return self}
return $.fillchar.repeat($.width-self.length)+self}
str.rpartition=function(self,sep){var $=$B.args("rpartition",2,{self:null,sep:null},["self","sep"],arguments,{},null,null)
check_str($.sep)
var self=reverse($.self),sep=reverse($.sep)
var items=str.partition(self,sep).reverse()
for(var i=0;i < items.length;i++){items[i]=items[i].split("").reverse().join("")}
return items}
str.rsplit=function(self){var $=$B.args("rsplit",3,{self:null,sep:null,maxsplit:null},["self","sep","maxsplit"],arguments,{sep:_b_.None,maxsplit:-1},null,null),sep=$.sep
var rev_str=reverse($.self),rev_sep=sep===_b_.None ? sep :reverse($.sep),rev_res=str.split(rev_str,rev_sep,$.maxsplit)
rev_res.reverse()
for(var i=0;i < rev_res.length;i++){rev_res[i]=reverse(rev_res[i])}
return rev_res}
str.rstrip=function(self,x){var $=$B.args("rstrip",2,{self:null,chars:null},["self","chars"],arguments,{chars:_b_.None},null,null)
if($.chars===_b_.None){return $.self.trimRight()}
var chars=to_chars(self)
for(var j=chars.length-1;j >=0;j--){if($.chars.indexOf(chars[j])==-1){return chars.slice(0,j+1).join('')}}
return ""}
str.split=function(){var $=$B.args("split",3,{self:null,sep:null,maxsplit:null},["self","sep","maxsplit"],arguments,{sep:_b_.None,maxsplit:-1},null,null),sep=$.sep,maxsplit=$.maxsplit,self=$.self,pos=0
if(maxsplit.__class__===$B.long_int){maxsplit=parseInt(maxsplit.value)}
if(sep==""){throw _b_.ValueError.$factory("empty separator")}
if(sep===_b_.None){var res=[]
while(pos < self.length && self.charAt(pos).search(/\s/)>-1){pos++}
if(pos===self.length-1){return[self]}
var name=""
while(1){if(self.charAt(pos).search(/\s/)==-1){if(name==""){name=self.charAt(pos)}else{name+=self.charAt(pos)}}else{if(name !==""){res.push(name)
if(maxsplit !==-1 && res.length==maxsplit+1){res.pop()
res.push(name+self.substr(pos))
return res}
name=""}}
pos++
if(pos > self.length-1){if(name){res.push(name)}
break}}
return res}else{var res=[],s="",seplen=sep.length
if(maxsplit==0){return[self]}
while(pos < self.length){if(self.substr(pos,seplen)==sep){res.push(s)
pos+=seplen
if(maxsplit >-1 && res.length >=maxsplit){res.push(self.substr(pos))
return res}
s=""}else{s+=self.charAt(pos)
pos++}}
res.push(s)
return res}}
str.splitlines=function(self){var $=$B.args('splitlines',2,{self:null,keepends:null},['self','keepends'],arguments,{keepends:false},null,null)
if(!_b_.isinstance($.keepends,[_b_.bool,_b_.int])){throw _b_.TypeError('integer argument expected, got '+
$B.get_class($.keepends).__name)}
var keepends=_b_.int.$factory($.keepends),res=[],self=$.self,start=0,pos=0
if(!self.length){return res}
while(pos < self.length){if(self.substr(pos,2)=='\r\n'){res.push(self.slice(start,keepends ? pos+2 :pos))
start=pos=pos+2}else if(self[pos]=='\r' ||self[pos]=='\n'){res.push(self.slice(start,keepends ? pos+1 :pos))
start=pos=pos+1}else{pos++}}
if(start < self.length){res.push(self.slice(start))}
return res}
str.startswith=function(){
var $=$B.args("startswith",4,{self:null,prefix:null,start:null,end:null},["self","prefix","start","end"],arguments,{start:0,end:null},null,null)
normalize_start_end($)
var prefixes=$.prefix
if(! _b_.isinstance(prefixes,_b_.tuple)){prefixes=[prefixes]}
var s=to_chars($.self).slice($.start,$.end).join('')
for(var i=0,len=prefixes.length;i < len;i++){var prefix=prefixes[i]
if(! _b_.isinstance(prefix,str)){throw _b_.TypeError.$factory("endswith first arg must be str "+
"or a tuple of str, not int")}
if(s.substr(0,prefix.length)==prefix){return true}}
return false}
str.strip=function(){var $=$B.args("strip",2,{self:null,chars:null},["self","chars"],arguments,{chars:_b_.None},null,null)
if($.chars===_b_.None){return $.self.trim()}
var chars=to_chars($.self)
for(var i=0;i < chars.length;i++){if($.chars.indexOf(chars[i])==-1){break}}
for(var j=chars.length-1;j >=i;j--){if($.chars.indexOf(chars[j])==-1){break}}
return chars.slice(i,j+1).join('')}
str.swapcase=function(self){var $=$B.args("swapcase",1,{self},["self"],arguments,{},null,null),res="",cp
for(var char of to_chars(self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]){res+=char.toUpperCase()}else if(unicode_tables.Lu[cp]){res+=char.toLowerCase()}else{res+=char}}
return res}
str.title=function(self){var $=$B.args("title",1,{self},["self"],arguments,{},null,null),state,cp,res=""
for(var char of to_chars(self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]){if(! state){res+=char.toUpperCase()
state="word"}else{res+=char}}else if(unicode_tables.Lu[cp]||unicode_tables.Lt[cp]){res+=state ? char.toLowerCase():char
state="word"}else{state=null
res+=char}}
return res}
str.translate=function(self,table){var res=[],getitem=$B.$getattr(table,"__getitem__"),cp
for(var char of to_chars(self)){cp=_b_.ord(char)
try{var repl=getitem(cp)
if(repl !==_b_.None){if(typeof repl=="string"){res.push(repl)}else if(typeof repl=="number"){res.push(String.fromCharCode(repl))}}}catch(err){res.push(char)}}
return res.join("")}
str.upper=function(self){var $=$B.args("upper",1,{self:null},["self"],arguments,{},null,null)
return self.toUpperCase()}
str.zfill=function(self,width){var $=$B.args("zfill",2,{self:null,width:null},["self","width"],arguments,{},null,null),len=str.__len__(self)
if($.width <=len){return self}
switch(self.charAt(0)){case "+":
case "-":
return self.charAt(0)+
"0".repeat($.width-len)+self.substr(1)
default:
return "0".repeat($.width-len)+self}}
str.$factory=function(arg,encoding,errors){if(arguments.length==0){return ""}
if(arg===undefined){return $B.UndefinedClass.__str__()}else if(arg===null){return '<Javascript null>'}
if(encoding !==undefined){
var $=$B.args("str",3,{arg:null,encoding:null,errors:null},["arg","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null),encoding=$.encoding,errors=$.errors}
switch(typeof arg){case "string":
return str.__str__(arg)
case "number":
if(isFinite(arg)){return arg.toString()}}
try{if(arg.$is_class ||arg.$factory){
var func=$B.$getattr(arg.__class__,"__str__")
return func(arg)}
if(arg.__class__ && arg.__class__===_b_.bytes &&
encoding !==undefined){
return _b_.bytes.decode(arg,$.encoding,$.errors)}
var klass=arg.__class__ ||$B.get_class(arg)
if(klass===undefined){return $B.JSObj.__str__($B.JSObj.$factory(arg))}
var method=$B.$getattr(klass ,"__str__",null)
if(method===null ||
(arg.__class__ && arg.__class__ !==_b_.object &&
method.$infos && method.$infos.__func__===_b_.object.__str__)){var method=$B.$getattr(klass,"__repr__")}}
catch(err){console.log("no __str__ for",arg)
console.log("err ",err)
if($B.debug > 1){console.log(err)}
console.log("Warning - no method __str__ or __repr__, "+
"default to toString",arg)
throw err}
return $B.$call(method)(arg)}
str.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory("str.__new__(): not enough arguments")}
return{__class__:cls}}
$B.set_func_names(str,"builtins")
var StringSubclass=$B.StringSubclass={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"str"},$is_class:true}
for(var $attr in str){if(typeof str[$attr]=="function"){StringSubclass[$attr]=(function(attr){return function(){var args=[],pos=0
if(arguments.length > 0){var args=[arguments[0].valueOf()],pos=1
for(var i=1,len=arguments.length;i < len;i++){args[pos++]=arguments[i]}}
return str[attr].apply(null,args)}})($attr)}}
StringSubclass.__new__=function(cls){return{__class__:cls}}
$B.set_func_names(StringSubclass,"builtins")
_b_.str=str
$B.parse_format_spec=function(spec){if(spec==""){this.empty=true}else{var pos=0,aligns="<>=^",digits="0123456789",types="bcdeEfFgGnosxX%",align_pos=aligns.indexOf(spec.charAt(0))
if(align_pos !=-1){if(spec.charAt(1)&& aligns.indexOf(spec.charAt(1))!=-1){
this.fill=spec.charAt(0)
this.align=spec.charAt(1)
pos=2}else{
this.align=aligns[align_pos]
this.fill=" "
pos++}}else{align_pos=aligns.indexOf(spec.charAt(1))
if(spec.charAt(1)&& align_pos !=-1){
this.align=aligns[align_pos]
this.fill=spec.charAt(0)
pos=2}}
var car=spec.charAt(pos)
if(car=="+" ||car=="-" ||car==" "){this.sign=car
pos++
car=spec.charAt(pos)}
if(car=="#"){this.alternate=true;pos++;car=spec.charAt(pos)}
if(car=="0"){
this.fill="0"
if(align_pos==-1){this.align="="}
pos++
car=spec.charAt(pos)}
while(car && digits.indexOf(car)>-1){if(this.width===undefined){this.width=car}else{this.width+=car}
pos++
car=spec.charAt(pos)}
if(this.width !==undefined){this.width=parseInt(this.width)}
if(this.width===undefined && car=="{"){
var end_param_pos=spec.substr(pos).search("}")
this.width=spec.substring(pos,end_param_pos)
console.log("width","["+this.width+"]")
pos+=end_param_pos+1}
if(car==","){this.comma=true
pos++
car=spec.charAt(pos)}
if(car=="."){if(digits.indexOf(spec.charAt(pos+1))==-1){throw _b_.ValueError.$factory(
"Missing precision in format spec")}
this.precision=spec.charAt(pos+1)
pos+=2
car=spec.charAt(pos)
while(car && digits.indexOf(car)>-1){this.precision+=car
pos++
car=spec.charAt(pos)}
this.precision=parseInt(this.precision)}
if(car && types.indexOf(car)>-1){this.type=car
pos++
car=spec.charAt(pos)}
if(pos !==spec.length){throw _b_.ValueError.$factory("Invalid format specifier: "+spec)}}
this.toString=function(){return(this.fill===undefined ? "" :_b_.str.$factory(this.fill))+
(this.align ||"")+
(this.sign ||"")+
(this.alternate ? "#" :"")+
(this.sign_aware ? "0" :"")+
(this.width ||"")+
(this.comma ? "," :"")+
(this.precision ? "."+this.precision :"")+
(this.type ||"")}}
$B.format_width=function(s,fmt){if(fmt.width && s.length < fmt.width){var fill=fmt.fill ||" ",align=fmt.align ||"<",missing=fmt.width-s.length
switch(align){case "<":
return s+fill.repeat(missing)
case ">":
return fill.repeat(missing)+s
case "=":
if("+-".indexOf(s.charAt(0))>-1){return s.charAt(0)+fill.repeat(missing)+s.substr(1)}else{return fill.repeat(missing)+s}
case "^":
var left=parseInt(missing/2)
return fill.repeat(left)+s+fill.repeat(missing-left)}}
return s}
function fstring_expression(){this.type="expression"
this.expression=""
this.conversion=null
this.fmt=null}
function fstring_error(msg,pos){error=Error(msg)
error.position=pos
throw error}
$B.parse_fstring=function(string){
var elts=[],pos=0,current="",ctype=null,nb_braces=0,car
while(pos < string.length){if(ctype===null){car=string.charAt(pos)
if(car=="{"){if(string.charAt(pos+1)=="{"){ctype="string"
current="{"
pos+=2}else{ctype="expression"
nb_braces=1
pos++}}else if(car=="}"){if(string.charAt(pos+1)==car){ctype="string"
current="}"
pos+=2}else{fstring_error(" f-string: single '}' is not allowed",pos)}}else{ctype="string"
current=car
pos++}}else if(ctype=="string"){
var i=pos
while(i < string.length){car=string.charAt(i)
if(car=="{"){if(string.charAt(i+1)=="{"){current+="{"
i+=2}else{elts.push(current)
ctype="expression"
pos=i+1
break}}else if(car=="}"){if(string.charAt(i+1)==car){current+=car
i+=2}else{fstring_error(" f-string: single '}' is not allowed",pos)}}else{current+=car
i++}}
pos=i+1}else if(ctype=="debug"){
while(string.charAt(i)==" "){i++}
if(string.charAt(i)=="}"){
elts.push(current)
ctype=null
current=""
pos=i+1}}else{
var i=pos,nb_braces=1,nb_paren=0,current=new fstring_expression()
while(i < string.length){car=string.charAt(i)
if(car=="{" && nb_paren==0){nb_braces++
current.expression+=car
i++}else if(car=="}" && nb_paren==0){nb_braces-=1
if(nb_braces==0){
if(current.expression==""){fstring_error("f-string: empty expression not allowed",pos)}
elts.push(current)
ctype=null
current=""
pos=i+1
break}
current.expression+=car
i++}else if(car=="\\"){
throw Error("f-string expression part cannot include a"+
" backslash")}else if(nb_paren==0 && car=="!" && current.fmt===null &&
":}".indexOf(string.charAt(i+2))>-1){if(current.expression.length==0){throw Error("f-string: empty expression not allowed")}
if("ars".indexOf(string.charAt(i+1))==-1){throw Error("f-string: invalid conversion character:"+
" expected 's', 'r', or 'a'")}else{current.conversion=string.charAt(i+1)
i+=2}}else if(car=="("){nb_paren++
current.expression+=car
i++}else if(car==")"){nb_paren--
current.expression+=car
i++}else if(car=='"'){
if(string.substr(i,3)=='"""'){var end=string.indexOf('"""',i+3)
if(end==-1){fstring_error("f-string: unterminated string",pos)}else{var trs=string.substring(i,end+3)
trs=trs.replace("\n","\\n\\")
current.expression+=trs
i=end+3}}else{var end=string.indexOf('"',i+1)
if(end==-1){fstring_error("f-string: unterminated string",pos)}else{current.expression+=string.substring(i,end+1)
i=end+1}}}else if(nb_paren==0 && car==":"){current.fmt=true
current.expression+=car
i++}else if(car=="="){
var ce=current.expression,last_char=ce.charAt(ce.length-1),last_char_re=('()'.indexOf(last_char)>-1 ? "\\" :"")+last_char
if(ce.length==0 ||
nb_paren > 0 ||
string.charAt(i+1)=="=" ||
"=!<>:".search(last_char_re)>-1){current.expression+=car
i+=1}else{
tail=car
while(string.charAt(i+1).match(/\s/)){tail+=string.charAt(i+1)
i++}
elts.push(current.expression+tail)
while(ce.match(/\s$/)){ce=ce.substr(0,ce.length-1)}
current.expression=ce
ctype="debug"
i++}}else{current.expression+=car
i++}}
if(nb_braces > 0){fstring_error("f-string: expected '}'",pos)}}}
if(current.length > 0){elts.push(current)}
return elts}
var _chr=$B.codepoint2jsstring=function(i){if(i >=0x10000 && i <=0x10FFFF){var code=(i-0x10000)
return String.fromCodePoint(0xD800 |(code >> 10))+
String.fromCodePoint(0xDC00 |(code & 0x3FF))}else{return String.fromCodePoint(i)}}
var _ord=$B.jsstring2codepoint=function(c){if(c.length==1){return c.charCodeAt(0)}
var code=0x10000
code+=(c.charCodeAt(0)& 0x03FF)<< 10
code+=(c.charCodeAt(1)& 0x03FF)
return code}})(__BRYTHON__)
;
;(function($B){
var bltns=$B.InjectBuiltins()
eval(bltns)
var str_hash=_b_.str.__hash__,$N=_b_.None
var set_ops=["eq","le","lt","ge","gt","sub","rsub","and","or","xor"]
function is_sublist(t1,t2){
for(var i=0,ilen=t1.length;i < ilen;i++){var x=t1[i],flag=false
for(var j=0,jlen=t2.length;j < jlen;j++){if($B.rich_comp("__eq__",x,t2[j])){t2.splice(j,1)
flag=true
break}}
if(! flag){return false}}
return true}
dict_view_op={__eq__:function(t1,t2){return t1.length==t2.length && is_sublist(t1,t2)},__ne__:function(t1,t2){return ! dict_view_op.__eq__(t1,t2)},__lt__:function(t1,t2){return t1.length < t2.length && is_sublist(t1,t2)},__gt__:function(t1,t2){return dict_view_op.__lt__(t2,t1)},__le__:function(t1,t2){return t1.length <=t2.length && is_sublist(t1,t2)},__ge__:function(t1,t2){return dict_view_op.__le__(t2,t1)},__and__:function(t1,t2){var items=[]
for(var i=0,ilen=t1.length;i < ilen;i++){var x=t1[i]
flag=false
for(var j=0,jlen=t2.length;j < jlen;j++){if($B.rich_comp("__eq__",x,t2[j])){t2.splice(j,1)
items.push(x)
break}}}
return items},__or__:function(t1,t2){var items=t1
for(var j=0,jlen=t2.length;j < jlen;j++){var y=t2[j],flag=false
for(var i=0,ilen=t1.length;i < ilen;i++){if($B.rich_comp("__eq__",y,t1[i])){t2.splice(j,1)
flag=true
break}}
if(! flag){items.push(y)}}
return items}}
$B.make_view=function(name){var klass=$B.make_class(name,function(d,items,set_like){return{
__class__:klass,__dict__:$B.empty_dict(),counter:-1,dict:d,items:items,len:items.length,set_like:set_like}})
for(var i=0,len=set_ops.length;i < len;i++){var op="__"+set_ops[i]+"__"
klass[op]=(function(op){return function(self,other){
if(self.set_like){return _b_.set[op](_b_.set.$factory(self),_b_.set.$factory(other))}else{
if(other.__class__ !==klass){return false}
var other_items=_b_.list.$factory(other)
return dict_view_op[op](self.items,other_items)}}})(op)}
klass.__iter__=function(self){var it=klass.$iterator.$factory(self.items)
it.test_change=function(){return self.dict.$version !=self.dict_version}
return it}
klass.__len__=function(self){return self.len}
klass.__repr__=function(self){return klass.$infos.__name__+'('+_b_.repr(self.items)+')'}
$B.set_func_names(klass,"builtins")
return klass}
var dict={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"dict"},$is_class:true,$native:true}
dict.$to_obj=function(d){
var res={}
for(var key in d.$string_dict){res[key]=d.$string_dict[key][0]}
return res}
function to_list(d,ix){var items=[],item
if(d.$jsobj){items=[]
for(var attr in d.$jsobj){if(attr.charAt(0)!="$"){var val=d.$jsobj[attr]
if(val===undefined){val=_b_.NotImplemented}
else if(val===null){val=$N}
items.push([attr,val])}}}else if(_b_.isinstance(d,_b_.dict)){for(var k in d.$numeric_dict){items.push([parseFloat(k),d.$numeric_dict[k]])}
for(var k in d.$string_dict){items.push([k,d.$string_dict[k]])}
for(var k in d.$object_dict){d.$object_dict[k].forEach(function(item){items.push(item)})}
items.sort(function(a,b){return a[1][1]-b[1][1]})
items=items.map(function(item){return[item[0],item[1][0]]})}
if(ix !==undefined){res=items.map(function(item){return item[ix]})
return res}else{items.__class__=_b_.tuple
return items.map(function(item){item.__class__=_b_.tuple;return item}
)}}
$B.dict_to_list=to_list 
var $copy_dict=function(left,right){var _l=to_list(right),si=dict.$setitem
right.$version=right.$version ||0
var right_version=right.$version ||0
for(var i=0,len=_l.length;i < len;i++){si(left,_l[i][0],_l[i][1])
if(right.$version !=right_version){throw _b_.RuntimeError.$factory("dict mutated during update")}}}
function rank(self,hash,key){
var pairs=self.$object_dict[hash]
if(pairs !==undefined){for(var i=0,len=pairs.length;i < len;i++){if($B.rich_comp("__eq__",key,pairs[i][0])){return i}}}
return-1}
dict.__bool__=function(){var $=$B.args("__bool__",1,{self:null},["self"],arguments,{},null,null)
return dict.__len__($.self)> 0}
dict.__class_getitem__=function(cls,item){
if(! Array.isArray(item)){item=[item]}
return $B.GenericAlias.$factory(cls,item)}
dict.__contains__=function(){var $=$B.args("__contains__",2,{self:null,key:null},["self","key"],arguments,{},null,null),self=$.self,key=$.key
if(self.$is_namespace){key=$B.to_alias(key)}
if(self.$jsobj){return self.$jsobj[key]!==undefined}
switch(typeof key){case "string":
return self.$string_dict[key]!==undefined
case "number":
return self.$numeric_dict[key]!==undefined}
var hash=_b_.hash(key)
if(self.$str_hash[hash]!==undefined &&
$B.rich_comp("__eq__",key,self.$str_hash[hash])){return true}
if(self.$numeric_dict[hash]!==undefined &&
$B.rich_comp("__eq__",key,hash)){return true}
return rank(self,hash,key)>-1}
dict.__delitem__=function(){var $=$B.args("__eq__",2,{self:null,arg:null},["self","arg"],arguments,{},null,null),self=$.self,arg=$.arg
if(self.$jsobj){if(self.$jsobj[arg]===undefined){throw _b_.KeyError.$factory(arg)}
delete self.$jsobj[arg]
return $N}
switch(typeof arg){case "string":
if(self.$string_dict[arg]===undefined){throw _b_.KeyError.$factory(_b_.str.$factory(arg))}
delete self.$string_dict[arg]
delete self.$str_hash[str_hash(arg)]
self.$version++
return $N
case "number":
if(self.$numeric_dict[arg]===undefined){throw _b_.KeyError.$factory(_b_.str.$factory(arg))}
delete self.$numeric_dict[arg]
self.$version++
return $N}
var hash=_b_.hash(arg),ix
if((ix=rank(self,hash,arg))>-1){self.$object_dict[hash].splice(ix,1)}else{throw _b_.KeyError.$factory(_b_.str.$factory(arg))}
self.$version++
return $N}
dict.__eq__=function(){var $=$B.args("__eq__",2,{self:null,other:null},["self","other"],arguments,{},null,null),self=$.self,other=$.other
if(! _b_.isinstance(other,dict)){return false}
if(self.$jsobj){self=jsobj2dict(self.$jsobj)}
if(other.$jsobj){other=jsobj2dict(other.$jsobj)}
if(dict.__len__(self)!=dict.__len__(other)){return false}
if(self.$string_dict.length !=other.$string_dict.length){return false}
for(var k in self.$numeric_dict){if(other.$numeric_dict.hasOwnProperty(k)){if(!$B.rich_comp("__eq__",other.$numeric_dict[k][0],self.$numeric_dict[k][0])){return false}}else if(other.$object_dict.hasOwnProperty(k)){var pairs=other.$object_dict[k],flag=false
for(var i=0,len=pairs.length;i < len;i++){if($B.rich_comp("__eq__",k,pairs[i][0])&&
$B.rich_comp("__eq__",self.$numeric_dict[k],pairs[i][1])){flag=true
break}}
if(! flag){return false}}else{return false}}
for(var k in self.$string_dict){if(!other.$string_dict.hasOwnProperty(k)||
!$B.rich_comp("__eq__",other.$string_dict[k][0],self.$string_dict[k][0])){return false}}
for(var hash in self.$object_dict){var pairs=self.$object_dict[hash]
var other_pairs=[]
if(other.$numeric_dict[hash]!==undefined){other_pairs.push([hash,other.$numeric_dict[hash]])}
if(other.$object_dict[hash]!==undefined){other_pairs=other_pairs.concat(other.$object_dict[hash])}
if(other_pairs.length==0){return false}
for(var i=0,len_i=pairs.length;i < len_i;i++){var flag=false
var key=pairs[i][0],value=pairs[i][1][0]
for(var j=0,len_j=other_pairs.length;j < len_j;j++){if($B.rich_comp("__eq__",key,other_pairs[j][0])&&
$B.rich_comp("__eq__",value,other_pairs[j][1][0])){flag=true
break}}
if(! flag){return false}}}
return true}
dict.__getitem__=function(){var $=$B.args("__getitem__",2,{self:null,arg:null},["self","arg"],arguments,{},null,null),self=$.self,arg=$.arg
return dict.$getitem(self,arg)}
$B.string_count=0
$B.num_count=0
dict.$getitem=function(self,arg,ignore_missing){
if(self.$jsobj){if(self.$jsobj[arg]===undefined){if(self.$jsobj.hasOwnProperty(arg)){return $B.Undefined}
throw _b_.KeyError.$factory(arg)}
return self.$jsobj[arg]}
switch(typeof arg){case "string":
var x=self.$string_dict[arg]
if(x !==undefined){$B.string_count++
return x[0]}
break
case "number":
if(self.$numeric_dict[arg]!==undefined){$B.num_count++
return self.$numeric_dict[arg][0]}
break}
var hash=_b_.hash(arg),_eq=function(other){return $B.rich_comp("__eq__",arg,other)}
if(typeof arg=="object"){arg.$hash=hash }
var sk=self.$str_hash[hash]
if(sk !==undefined && _eq(sk)){return self.$string_dict[sk][0]}
if(self.$numeric_dict[hash]!==undefined && _eq(hash)){return self.$numeric_dict[hash][0]}
if(_b_.isinstance(arg,_b_.str)){
var res=self.$string_dict[arg.valueOf()]
if(res !==undefined){return res[0]}}
var ix=rank(self,hash,arg)
if(ix >-1){return self.$object_dict[hash][ix][1][0]}
if(! ignore_missing){if(self.__class__ !==dict && ! ignore_missing){try{var missing_method=getattr(self.__class__,"__missing__",_b_.None)}catch(err){console.log(err)}
if(missing_method !==_b_.None){return missing_method(self,arg)}}}
throw _b_.KeyError.$factory(arg)}
dict.__hash__=_b_.None
function init_from_list(self,args){var i=-1,stop=args.length-1,si=dict.__setitem__
while(i++< stop){var item=args[i]
if(item.length !=2){throw _b_.ValueError.$factory("dictionary "+
`update sequence element #${i} has length 1; 2 is required`)}
switch(typeof item[0]){case 'string':
self.$string_dict[item[0]]=[item[1],self.$order++]
self.$str_hash[str_hash(item[0])]=item[0]
self.$version++
break
case 'number':
if(item[0]!=0 && item[0]!=1){self.$numeric_dict[item[0]]=[item[1],self.$order++]
self.$version++
break}
default:
si(self,item[0],item[1])
break}}}
dict.__init__=function(self,first,second){var $
if(first===undefined){return $N}
if(second===undefined){if(first.$nat !='kw' && $B.get_class(first)===$B.JSObj){for(var key in first){self.$string_dict[key]=[first[key],self.$order++]}
return _b_.None}else if(first.$jsobj){self.$jsobj={}
for(var attr in first.$jsobj){self.$jsobj[attr]=first.$jsobj[attr]}
return $N}else if(Array.isArray(first)){init_from_list(self,first)
return $N}}
$=$ ||$B.args("dict",1,{self:null},["self"],arguments,{},"first","second")
var args=$.first
if(args.length > 1){throw _b_.TypeError.$factory("dict expected at most 1 argument"+
", got 2")}else if(args.length==1){args=args[0]
if(args.__class__===dict){['$string_dict','$str_hash','$numeric_dict','$object_dict'].
forEach(function(d){for(key in args[d]){self[d][key]=args[d][key]}})}else if(_b_.isinstance(args,dict)){$copy_dict(self,args)}else{var keys=$B.$getattr(args,"keys",null)
if(keys !==null){var gi=$B.$getattr(args,"__getitem__",null)
if(gi !==null){
gi=$B.$call(gi)
var kiter=_b_.iter($B.$call(keys)())
while(true){try{var key=_b_.next(kiter),value=gi(key)
dict.__setitem__(self,key,value)}catch(err){if(err.__class__===_b_.StopIteration){break}
throw err}}
return $N}}
if(! Array.isArray(args)){args=_b_.list.$factory(args)}
init_from_list(self,args)}}
var kw=$.second.$string_dict
for(var attr in kw){switch(typeof attr){case "string":
self.$string_dict[attr]=[kw[attr][0],self.$order++]
self.$str_hash[str_hash(attr)]=attr
break
case "number":
self.$numeric_dict[attr]=[kw[attr][0],self.$order++]
break
default:
si(self,attr,kw[attr][0])
break}}
return $N}
dict.__iter__=function(self){return _b_.iter(dict.$$keys(self))}
dict.__ior__=function(self,other){
dict.update(self,other)
return self}
dict.__len__=function(self){var _count=0
if(self.$jsobj){for(var attr in self.$jsobj){if(attr.charAt(0)!="$"){_count++}}
return _count}
for(var k in self.$numeric_dict){_count++}
for(var k in self.$string_dict){_count++}
for(var hash in self.$object_dict){_count+=self.$object_dict[hash].length}
return _count}
dict.__ne__=function(self,other){return ! dict.__eq__(self,other)}
dict.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory("int.__new__(): not enough arguments")}
var instance={__class__:cls,$numeric_dict :{},$object_dict :{},$string_dict :{},$str_hash:{},$version:0,$order:0}
if(cls !==dict){instance.__dict__=$B.empty_dict()}
return instance}
dict.__or__=function(self,other){
if(! _b_.isinstance(other,dict)){return _b_.NotImplemented}
var res=dict.copy(self)
dict.update(res,other)
return res}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=$B.empty_dict()
res.__class__=args[0]
return res}
dict.__reduce_ex__=function(self,protocol){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__]),_b_.None,_b_.None,dict.items(self)])}
dict.__repr__=function(self){$B.builtins_repr_check(dict,arguments)
if(self.$jsobj){
return dict.__repr__(jsobj2dict(self.$jsobj))}
if($B.repr.enter(self)){return "{...}"}
var res=[],items=to_list(self)
items.forEach(function(item){try{res.push(repr(item[0])+": "+repr(item[1]))}catch(err){throw err}})
$B.repr.leave(self)
return "{"+res.join(", ")+"}"}
dict.__ror__=function(self,other){
if(! _b_.isinstance(other,dict)){return _b_.NotImplemented}
var res=dict.copy(other)
dict.update(res,self)
return res}
dict.__setitem__=function(self,key,value){var $=$B.args("__setitem__",3,{self:null,key:null,value:null},["self","key","value"],arguments,{},null,null)
return dict.$setitem($.self,$.key,$.value)}
dict.$setitem=function(self,key,value,$hash){
if(self.$jsobj){if(self.$from_js){
value=$B.pyobj2jsobj(value)}
if(self.$jsobj.__class__===_b_.type){self.$jsobj[key]=value
if(key=="__init__" ||key=="__new__"){
self.$jsobj.$factory=$B.$instance_creator(self.$jsobj)}}else{self.$jsobj[key]=value}
return $N}
switch(typeof key){case "string":
if(self.$string_dict===undefined){console.log("pas de string dict",self,key,value)}
if(self.$string_dict[key]!==undefined){self.$string_dict[key][0]=value}else{self.$string_dict[key]=[value,self.$order++]
self.$str_hash[str_hash(key)]=key
self.$version++}
return $N
case "number":
if(self.$numeric_dict[key]!==undefined){
self.$numeric_dict[key][0]=value}else{
var done=false
if((key==0 ||key==1)&&
self.$object_dict[key]!==undefined){for(const item of self.$object_dict[key]){if((key==0 && item[0]===false)||
(key==1 && item[0]===true)){
item[1][0]=value
done=true}}}
if(! done){
self.$numeric_dict[key]=[value,self.$order++]}
self.$version++}
return $N
case "boolean":
var num=key ? 1 :0
if(self.$numeric_dict[num]!==undefined){var order=self.$numeric_dict[num][1]
self.$numeric_dict[num]=[value,order]
return}
if(self.$object_dict[num]!==undefined){self.$object_dict[num].push([key,[value,self.$order++]])}else{self.$object_dict[num]=[[key,[value,self.$order++]]]}}
var hash=$hash===undefined ? _b_.hash(key):$hash,_eq=function(other){return $B.rich_comp("__eq__",key,other)}
if(self.$numeric_dict[hash]!==undefined && _eq(hash)){self.$numeric_dict[hash]=[value,self.$numeric_dict[hash][1]]
self.$version++
return $N}
var sk=self.$str_hash[hash]
if(sk !==undefined && _eq(sk)){self.$string_dict[sk]=[value,self.$string_dict[sk][1]]
self.$version++
return $N}
if($hash){if(self.$object_dict[$hash]!==undefined){self.$object_dict[$hash].push([key,[value,self.$order++]])}else{self.$object_dict[$hash]=[[key,[value,self.$order++]]]}
self.$version++
return $N}
var ix=rank(self,hash,key)
if(ix >-1){
self.$object_dict[hash][ix][1]=[value,self.$object_dict[hash][ix][1][1]]
return $N}else if(self.$object_dict.hasOwnProperty(hash)){self.$object_dict[hash].push([key,[value,self.$order++]])}else{self.$object_dict[hash]=[[key,[value,self.$order++]]]}
self.$version++
return $N}
$B.make_rmethods(dict)
dict.clear=function(){
var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null),self=$.self
self.$numeric_dict={}
self.$string_dict={}
self.$str_hash={}
self.$object_dict={}
if(self.$jsobj){for(var attr in self.$jsobj){if(attr.charAt(0)!=="$" && attr !=="__class__"){delete self.$jsobj[attr]}}}
self.$version++
self.$order=0
return $N}
dict.copy=function(self){
var $=$B.args("copy",1,{self:null},["self"],arguments,{},null,null),self=$.self,res=$B.empty_dict()
$copy_dict(res,self)
return res}
dict.fromkeys=function(){var $=$B.args("fromkeys",3,{cls:null,keys:null,value:null},["cls","keys","value"],arguments,{value:_b_.None},null,null),keys=$.keys,value=$.value
var klass=$.cls,res=$B.$call(klass)(),keys_iter=$B.$iter(keys)
while(1){try{var key=_b_.next(keys_iter)
if(klass===dict){dict.$setitem(res,key,value)}
else{$B.$getattr(res,"__setitem__")(key,value)}}catch(err){if($B.is_exc(err,[_b_.StopIteration])){return res}
throw err}}}
dict.get=function(){var $=$B.args("get",3,{self:null,key:null,_default:null},["self","key","_default"],arguments,{_default:$N},null,null)
try{return dict.__getitem__($.self,$.key)}
catch(err){if(_b_.isinstance(err,_b_.KeyError)){return $._default}
else{throw err}}}
var dict_items=$B.make_view("dict_items",true)
dict_items.$iterator=$B.make_iterator_class("dict_itemiterator")
dict.items=function(self){if(arguments.length > 1){var _len=arguments.length-1,_msg="items() takes no arguments ("+_len+" given)"
throw _b_.TypeError.$factory(_msg)}
var items=to_list(self),set_like=true
for(var i=0,len=items.length;i < len;i++){try{_b_.hash(items[i][1])}catch(err){set_like=false
break}}
var values=to_list(self)
var it=dict_items.$factory(self,values,set_like)
it.dict_version=self.$version
return it}
var dict_keys=$B.make_view("dict_keys")
dict_keys.$iterator=$B.make_iterator_class("dict_keyiterator")
dict.$$keys=function(self){if(arguments.length > 1){var _len=arguments.length-1,_msg="keys() takes no arguments ("+_len+" given)"
throw _b_.TypeError.$factory(_msg)}
var it=dict_keys.$factory(self,to_list(self,0),true)
it.dict_version=self.$version
return it}
dict.pop=function(){var missing={},$=$B.args("pop",3,{self:null,key:null,_default:null},["self","key","_default"],arguments,{_default:missing},null,null),self=$.self,key=$.key,_default=$._default
try{var res=dict.__getitem__(self,key)
dict.__delitem__(self,key)
return res}catch(err){if(err.__class__===_b_.KeyError){if(_default !==missing){return _default}
throw err}
throw err}}
dict.popitem=function(self){try{var itm=_b_.next(_b_.iter(dict.items(self)))
dict.__delitem__(self,itm[0])
return _b_.tuple.$factory(itm)}catch(err){if(err.__class__==_b_.StopIteration){throw _b_.KeyError.$factory("'popitem(): dictionary is empty'")}}}
dict.setdefault=function(){var $=$B.args("setdefault",3,{self:null,key:null,_default:null},["self","key","_default"],arguments,{_default:$N},null,null),self=$.self,key=$.key,_default=$._default
try{
return dict.$getitem(self,key,true)}catch(err){if(err.__class__ !==_b_.KeyError){throw err}
if(_default===undefined){_default=$N}
var hash=key.$hash
key.$hash=undefined
dict.$setitem(self,key,_default,hash)
return _default}}
dict.update=function(self){var $=$B.args("update",1,{"self":null},["self"],arguments,{},"args","kw"),self=$.self,args=$.args,kw=$.kw
if(args.length > 0){var o=args[0]
if(_b_.isinstance(o,dict)){if(o.$jsobj){o=jsobj2dict(o.$jsobj)}
$copy_dict(self,o)}else if(_b_.hasattr(o,"keys")){var _keys=_b_.list.$factory($B.$call($B.$getattr(o,"keys"))())
for(var i=0,len=_keys.length;i < len;i++){var _value=getattr(o,"__getitem__")(_keys[i])
dict.$setitem(self,_keys[i],_value)}}else{var it=_b_.iter(o),i=0
while(true){try{var item=_b_.next(it)}catch(err){if(err.__class__===_b_.StopIteration){break}
throw err}
try{key_value=_b_.list.$factory(item)}catch(err){throw _b_.TypeError.$factory("cannot convert dictionary"+
" update sequence element #"+i+" to a sequence")}
if(key_value.length !==2){throw _b_.ValueError.$factory("dictionary update "+
"sequence element #"+i+" has length "+
key_value.length+"; 2 is required")}
dict.$setitem(self,key_value[0],key_value[1])
i++}}}
$copy_dict(self,kw)
self.$version++
return $N}
var dict_values=$B.make_view("dict_values")
dict_values.$iterator=$B.make_iterator_class("dict_valueiterator")
dict.values=function(self){if(arguments.length > 1){var _len=arguments.length-1,_msg="values() takes no arguments ("+_len+" given)"
throw _b_.TypeError.$factory(_msg)}
var values=to_list(self,1)
var it=dict_values.$factory(self,values,false)
it.dict_version=self.$version
return it}
dict.$factory=function(){var res=dict.__new__(dict)
var args=[res]
for(var i=0,len=arguments.length;i < len ;i++){args.push(arguments[i])}
dict.__init__.apply(null,args)
return res}
_b_.dict=dict
$B.set_func_names(dict,"builtins")
dict.__class_getitem__=_b_.classmethod.$factory(dict.__class_getitem__)
$B.empty_dict=function(){return{
__class__:dict,$numeric_dict :{},$object_dict :{},$string_dict :{},$str_hash:{},$version:0,$order:0}}
dict.fromkeys=_b_.classmethod.$factory(dict.fromkeys)
$B.getset_descriptor=$B.make_class("getset_descriptor",function(klass,attr){return{
__class__:$B.getset_descriptor,__doc__:_b_.None,cls:klass,attr:attr}}
)
$B.getset_descriptor.__repr__=$B.getset_descriptor.__str__=function(self){return `<attribute '${self.attr}' of '${self.cls.$infos.__name__}' objects>`}
$B.set_func_names($B.getset_descriptor,"builtins")
var mappingproxy=$B.mappingproxy=$B.make_class("mappingproxy",function(obj){if(_b_.isinstance(obj,dict)){
var res=$B.obj_dict(dict.$to_obj(obj))}else{var res=$B.obj_dict(obj)}
res.__class__=mappingproxy
return res}
)
mappingproxy.__setitem__=function(){throw _b_.TypeError.$factory("'mappingproxy' object does not support "+
"item assignment")}
for(var attr in dict){if(mappingproxy[attr]!==undefined ||
["__class__","__mro__","__new__","__init__","__delitem__","clear","fromkeys","pop","popitem","setdefault","update"].indexOf(attr)>-1){continue}
if(typeof dict[attr]=="function"){mappingproxy[attr]=(function(key){return function(){return dict[key].apply(null,arguments)}})(attr)}else{mappingproxy[attr]=dict[attr]}}
$B.set_func_names(mappingproxy,"builtins")
function jsobj2dict(x){var d=$B.empty_dict()
for(var attr in x){if(attr.charAt(0)!="$" && attr !=="__class__"){if(x[attr]===null){d.$string_dict[attr]=[_b_.None,d.$order++]}else if(x[attr]===undefined){continue}else if(x[attr].$jsobj===x){d.$string_dict[attr]=[d,d.$order++]}else{d.$string_dict[attr]=[$B.$JS2Py(x[attr]),d.$order++]}}}
return d}
$B.obj_dict=function(obj,from_js){var klass=obj.__class__ ||$B.get_class(obj)
if(klass !==undefined && klass.$native){throw _b_.AttributeError.$factory("'"+$B.class_name(obj)+
"' object has no attribute '__dict__'")}
var res=$B.empty_dict()
res.$jsobj=obj
res.$from_js=from_js 
return res}})(__BRYTHON__)
;
;(function($B){
var _b_=$B.builtins,object=_b_.object,_window=self
function $getMouseOffset(target,ev){ev=ev ||_window.event;
var docPos=$getPosition(target);
var mousePos=$mouseCoords(ev);
return{x:mousePos.x-docPos.x,y:mousePos.y-docPos.y};}
function $getPosition(e){var left=0,top=0,width=e.width ||e.offsetWidth,height=e.height ||e.offsetHeight,scroll=document.scrollingElement.scrollTop
while(e.offsetParent){left+=e.offsetLeft
top+=e.offsetTop
e=e.offsetParent}
left+=e.offsetLeft ||0
top+=e.offsetTop ||0
if(e.parentElement){
var parent_pos=$getPosition(e.parentElement)
left+=parent_pos.left
top+=parent_pos.top}
return{left:left,top:top,width:width,height:height}}
function trace(msg){var elt=document.getElementById("trace")
if(elt){elt.innerText+=msg}}
function $mouseCoords(ev){if(ev.type.startsWith("touch")){var res={}
res.x=_b_.int.$factory(ev.touches[0].screenX)
res.y=_b_.int.$factory(ev.touches[0].screenY)
res.__getattr__=function(attr){return this[attr]}
res.__class__="MouseCoords"
return res}
var posx=0,posy=0
if(!ev){var ev=_window.event}
if(ev.pageX ||ev.pageY){posx=ev.pageX
posy=ev.pageY}else if(ev.clientX ||ev.clientY){posx=ev.clientX+document.body.scrollLeft+
document.documentElement.scrollLeft
posy=ev.clientY+document.body.scrollTop+
document.documentElement.scrollTop}
var res={}
res.x=_b_.int.$factory(posx)
res.y=_b_.int.$factory(posy)
res.__getattr__=function(attr){return this[attr]}
res.__class__="MouseCoords"
return res}
var $DOMNodeAttrs=["nodeName","nodeValue","nodeType","parentNode","childNodes","firstChild","lastChild","previousSibling","nextSibling","attributes","ownerDocument"]
$B.$isNode=function(o){
return(
typeof Node==="object" ? o instanceof Node :
o && typeof o==="object" && typeof o.nodeType==="number" &&
typeof o.nodeName==="string"
)}
$B.$isNodeList=function(nodes){
try{var result=Object.prototype.toString.call(nodes)
var re=new RegExp("^\\[object (HTMLCollection|NodeList)\\]$")
return(typeof nodes==="object" &&
re.exec(result)!==null &&
nodes.length !==undefined &&
(nodes.length==0 ||
(typeof nodes[0]==="object" && nodes[0].nodeType > 0))
)}catch(err){return false}}
var $DOMEventAttrs_W3C=["NONE","CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE","type","target","currentTarget","eventPhase","bubbles","cancelable","timeStamp","stopPropagation","preventDefault","initEvent"]
var $DOMEventAttrs_IE=["altKey","altLeft","button","cancelBubble","clientX","clientY","contentOverflow","ctrlKey","ctrlLeft","data","dataFld","dataTransfer","fromElement","keyCode","nextPage","offsetX","offsetY","origin","propertyName","reason","recordset","repeat","screenX","screenY","shiftKey","shiftLeft","source","srcElement","srcFilter","srcUrn","toElement","type","url","wheelDelta","x","y"]
$B.$isEvent=function(obj){var flag=true
for(var i=0;i < $DOMEventAttrs_W3C.length;i++){if(obj[$DOMEventAttrs_W3C[i]]===undefined){flag=false;break}}
if(flag){return true}
for(var i=0;i < $DOMEventAttrs_IE.length;i++){if(obj[$DOMEventAttrs_IE[i]]===undefined){return false}}
return true}
var $NodeTypes={1:"ELEMENT",2:"ATTRIBUTE",3:"TEXT",4:"CDATA_SECTION",5:"ENTITY_REFERENCE",6:"ENTITY",7:"PROCESSING_INSTRUCTION",8:"COMMENT",9:"DOCUMENT",10:"DOCUMENT_TYPE",11:"DOCUMENT_FRAGMENT",12:"NOTATION"}
var Attributes=$B.make_class("Attributes",function(elt){return{__class__:Attributes,elt:elt}}
)
Attributes.__contains__=function(){var $=$B.args("__getitem__",2,{self:null,key:null},["self","key"],arguments,{},null,null)
if($.self.elt instanceof SVGElement){return $.self.elt.hasAttributeNS(null,$.key)}else if(typeof $.self.elt.hasAttribute=="function"){return $.self.elt.hasAttribute($.key)}
return false}
Attributes.__delitem__=function(){var $=$B.args("__getitem__",2,{self:null,key:null},["self","key"],arguments,{},null,null)
if(!Attributes.__contains__($.self,$.key)){throw _b_.KeyError.$factory($.key)}
if($.self.elt instanceof SVGElement){$.self.elt.removeAttributeNS(null,$.key)
return _b_.None}else if(typeof $.self.elt.hasAttribute=="function"){$.self.elt.removeAttribute($.key)
return _b_.None}}
Attributes.__getitem__=function(){var $=$B.args("__getitem__",2,{self:null,key:null},["self","key"],arguments,{},null,null)
if($.self.elt instanceof SVGElement &&
$.self.elt.hasAttributeNS(null,$.key)){return $.self.elt.getAttributeNS(null,$.key)}else if(typeof $.self.elt.hasAttribute=="function" &&
$.self.elt.hasAttribute($.key)){return $.self.elt.getAttribute($.key)}
throw _b_.KeyError.$factory($.key)}
Attributes.__iter__=function(self){self.$counter=0
var attrs=self.elt.attributes,items=[]
for(var i=0;i < attrs.length;i++){items.push(attrs[i].name)}
self.$items=items
return self}
Attributes.__next__=function(){var $=$B.args("__next__",1,{self:null},["self"],arguments,{},null,null)
if($.self.$counter < $.self.$items.length){var res=$.self.$items[$.self.$counter]
$.self.$counter++
return res}else{throw _b_.StopIteration.$factory("")}}
Attributes.__setitem__=function(){var $=$B.args("__setitem__",3,{self:null,key:null,value:null},["self","key","value"],arguments,{},null,null)
if($.self.elt instanceof SVGElement &&
typeof $.self.elt.setAttributeNS=="function"){$.self.elt.setAttributeNS(null,$.key,$.value)
return _b_.None}else if(typeof $.self.elt.setAttribute=="function"){$.self.elt.setAttribute($.key,$.value)
return _b_.None}
throw _b_.TypeError.$factory("Can't set attributes on element")}
Attributes.__repr__=Attributes.__str__=function(self){var attrs=self.elt.attributes,items=[]
for(var i=0;i < attrs.length;i++){items.push(attrs[i].name+': "'+
self.elt.getAttributeNS(null,attrs[i].name)+'"')}
return '{'+items.join(", ")+'}'}
Attributes.get=function(){var $=$B.args("get",3,{self:null,key:null,deflt:null},["self","key","deflt"],arguments,{deflt:_b_.None},null,null)
try{return Attributes.__getitem__($.self,$.key)}catch(err){if(err.__class__===_b_.KeyError){return $.deflt}else{throw err}}}
Attributes.$$keys=function(){return Attributes.__iter__.apply(null,arguments)}
Attributes.items=function(){var $=$B.args("values",1,{self:null},["self"],arguments,{},null,null),attrs=$.self.elt.attributes,values=[]
for(var i=0;i < attrs.length;i++){values.push([attrs[i].name,attrs[i].value])}
return _b_.list.__iter__(values)}
Attributes.values=function(){var $=$B.args("values",1,{self:null},["self"],arguments,{},null,null),attrs=$.self.elt.attributes,values=[]
for(var i=0;i < attrs.length;i++){values.push(attrs[i].value)}
return _b_.list.__iter__(values)}
$B.set_func_names(Attributes,"<dom>")
var DOMEvent=$B.DOMEvent={__class__:_b_.type,__mro__:[object],$infos:{__name__:"DOMEvent"}}
DOMEvent.__new__=function(cls,evt_name){var ev=new Event(evt_name)
ev.__class__=DOMEvent
if(ev.preventDefault===undefined){ev.preventDefault=function(){ev.returnValue=false}}
if(ev.stopPropagation===undefined){ev.stopPropagation=function(){ev.cancelBubble=true}}
return ev}
function dom2svg(svg_elt,coords){
var pt=svg_elt.createSVGPoint()
pt.x=coords.x
pt.y=coords.y
return pt.matrixTransform(svg_elt.getScreenCTM().inverse())}
DOMEvent.__getattribute__=function(self,attr){switch(attr){case '__repr__':
case '__str__':
return function(){return '<DOMEvent object>'}
case 'x':
return $mouseCoords(self).x
case 'y':
return $mouseCoords(self).y
case 'data':
if(self.dataTransfer !==null){return Clipboard.$factory(self.dataTransfer)}
return $B.$JS2Py(self['data'])
case 'target':
if(self.target !==undefined){return DOMNode.$factory(self.target)}
case 'char':
return String.fromCharCode(self.which)
case 'svgX':
if(self.target instanceof SVGSVGElement){return Math.floor(dom2svg(self.target,$mouseCoords(self)).x)}
throw _b_.AttributeError.$factory("event target is not an SVG "+
"element")
case 'svgY':
if(self.target instanceof SVGSVGElement){return Math.floor(dom2svg(self.target,$mouseCoords(self)).y)}
throw _b_.AttributeError.$factory("event target is not an SVG "+
"element")}
var res=self[attr]
if(res !==undefined){if(typeof res=="function"){var func=function(){var args=[]
for(var i=0;i < arguments.length;i++){args.push($B.pyobj2jsobj(arguments[i]))}
return res.apply(self,arguments)}
func.$infos={__name__:res.name,__qualname__:res.name}
return func}
return $B.$JS2Py(res)}
throw _b_.AttributeError.$factory("object DOMEvent has no attribute '"+
attr+"'")}
DOMEvent.$factory=function(evt_name){
return DOMEvent.__new__(DOMEvent,evt_name)}
var $DOMEvent=$B.$DOMEvent=function(ev){ev.__class__=DOMEvent
ev.$no_dict=true
if(ev.preventDefault===undefined){ev.preventDefault=function(){ev.returnValue=false}}
if(ev.stopPropagation===undefined){ev.stopPropagation=function(){ev.cancelBubble=true}}
return ev}
$B.set_func_names(DOMEvent,"browser")
var Clipboard={__class__:_b_.type,$infos:{__module__:"browser",__name__:"Clipboard"}}
Clipboard.__getitem__=function(self,name){return self.data.getData(name)}
Clipboard.__mro__=[object]
Clipboard.__setitem__=function(self,name,value){self.data.setData(name,value)}
Clipboard.$factory=function(data){
return{
__class__ :Clipboard,__dict__:$B.empty_dict(),data :data}}
$B.set_func_names(Clipboard,"<dom>")
function $EventsList(elt,evt,arg){
this.elt=elt
this.evt=evt
if(isintance(arg,list)){this.callbacks=arg}
else{this.callbacks=[arg]}
this.remove=function(callback){var found=false
for(var i=0;i < this.callbacks.length;i++){if(this.callbacks[i]===callback){found=true
this.callback.splice(i,1)
this.elt.removeEventListener(this.evt,callback,false)
break}}
if(! found){throw _b_.KeyError.$factory("not found")}}}
var OpenFile=$B.OpenFile={__class__:_b_.type,
__mro__:[object],$infos:{__module__:"<pydom>",__name__:"OpenFile"}}
OpenFile.$factory=function(file,mode,encoding){var res={__class__:$OpenFileDict,file:file,reader:new FileReader()}
if(mode==="r"){res.reader.readAsText(file,encoding)}else if(mode==="rb"){res.reader.readAsBinaryString(file)}
return res}
OpenFile.__getattr__=function(self,attr){if(self["get_"+attr]!==undefined){return self["get_"+attr]}
return self.reader[attr]}
OpenFile.__setattr__=function(self,attr,value){var obj=self.reader
if(attr.substr(0,2)=="on"){
var callback=function(ev){return value($DOMEvent(ev))}
obj.addEventListener(attr.substr(2),callback)}else if("set_"+attr in obj){return obj["set_"+attr](value)}else if(attr in obj){obj[attr]=value}else{setattr(obj,attr,value)}}
$B.set_func_names(OpenFile,"<dom>")
var dom={File :function(){},FileReader :function(){}}
dom.File.__class__=_b_.type
dom.File.__str__=function(){return "<class 'File'>"}
dom.FileReader.__class__=_b_.type
dom.FileReader.__str__=function(){return "<class 'FileReader'>"}
var Options={__class__:_b_.type,__delitem__:function(self,arg){self.parent.options.remove(arg.elt)},__getitem__:function(self,key){return DOMNode.$factory(self.parent.options[key])},__len__:function(self){return self.parent.options.length},__mro__:[object],__setattr__:function(self,attr,value){self.parent.options[attr]=value},__setitem__:function(self,attr,value){self.parent.options[attr]=$B.$JS2Py(value)},__str__:function(self){return "<object Options wraps "+self.parent.options+">"},append:function(self,element){self.parent.options.add(element.elt)},insert:function(self,index,element){if(index===undefined){self.parent.options.add(element.elt)}
else{self.parent.options.add(element.elt,index)}},item:function(self,index){return self.parent.options.item(index)},namedItem:function(self,name){return self.parent.options.namedItem(name)},remove:function(self,arg){self.parent.options.remove(arg.elt)},$infos:{__module__:"<pydom>",__name__:"Options"}}
Options.$factory=function(parent){return{
__class__:Options,parent:parent}}
$B.set_func_names(Options,"<dom>")
var DOMNode={__class__ :_b_.type,__mro__:[object],$infos:{__module__:"browser",__name__:"DOMNode"}}
DOMNode.$factory=function(elt,fromtag){if(elt.__class__===DOMNode){return elt}
if(typeof elt=="number" ||typeof elt=="boolean" ||
typeof elt=="string"){return elt}
if(elt.__class__===undefined && fromtag===undefined){if(DOMNode.tags !==undefined){
var tdict=DOMNode.tags.$string_dict
if(tdict !==undefined && tdict.hasOwnProperty(elt.tagName)){try{var klass=tdict[elt.tagName][0]}catch(err){console.log("tdict",tdict,"tag name",elt.tagName)
throw err}
if(klass !==undefined){
klass.$elt_wrap=elt 
return klass.$factory()}}}}
if(elt["$brython_id"]===undefined ||elt.nodeType==9){
elt.$brython_id="DOM-"+$B.UUID()}
return elt}
DOMNode.__add__=function(self,other){
var res=TagSum.$factory()
res.children=[self],pos=1
if(_b_.isinstance(other,TagSum)){res.children=res.children.concat(other.children)}else if(_b_.isinstance(other,[_b_.str,_b_.int,_b_.float,_b_.list,_b_.dict,_b_.set,_b_.tuple])){res.children[pos++]=DOMNode.$factory(
document.createTextNode(_b_.str.$factory(other)))}else if(_b_.isinstance(other,DOMNode)){res.children[pos++]=other}else{
try{res.children=res.children.concat(_b_.list.$factory(other))}
catch(err){throw _b_.TypeError.$factory("can't add '"+
$B.class_name(other)+"' object to DOMNode instance")}}
return res}
DOMNode.__bool__=function(self){return true}
DOMNode.__contains__=function(self,key){
if(self.nodeType==9 && typeof key=="string"){return document.getElementById(key)!==null}
if(self.length !==undefined && typeof self.item=="function"){for(var i=0,len=self.length;i < len;i++){if(self.item(i)===key){return true}}}
return false}
DOMNode.__del__=function(self){
if(!self.parentNode){throw _b_.ValueError.$factory("can't delete "+_b_.str.$factory(self))}
self.parentNode.removeChild(self)}
DOMNode.__delattr__=function(self,attr){if(self[attr]===undefined){throw _b_.AttributeError.$factory(
`cannot delete DOMNode attribute '${attr}'`)}
delete self[attr]
return _b_.None}
DOMNode.__delitem__=function(self,key){if(self.nodeType==9){
var res=self.getElementById(key)
if(res){res.parentNode.removeChild(res)}
else{throw _b_.KeyError.$factory(key)}}else{
self.parentNode.removeChild(self)}}
DOMNode.__dir__=function(self){var res=[]
for(var attr in self){if(attr.charAt(0)!="$"){res.push(attr)}}
res.sort()
return res}
DOMNode.__eq__=function(self,other){return self==other}
DOMNode.__getattribute__=function(self,attr){if(attr.substr(0,2)=="$$"){attr=attr.substr(2)}
switch(attr){case "attrs":
return Attributes.$factory(self)
case "children":
case "child_nodes":
case "class_name":
case "html":
case "parent":
case "text":
return DOMNode[attr](self)
case "height":
case "left":
case "top":
case "width":
if(self.tagName=="CANVAS" && self[attr]){return self[attr]}
if(self instanceof SVGElement){return self[attr].baseVal.value}
if(self.style[attr]){return parseInt(self.style[attr])}else{var computed=window.getComputedStyle(self).
getPropertyValue(attr)
if(computed !==undefined){var prop=Math.floor(parseFloat(computed)+0.5)
return isNaN(prop)? computed :prop}
throw _b_.AttributeError.$factory("style."+attr+
" is not set for "+_b_.str.$factory(self))}
case "x":
case "y":
if(!(self instanceof SVGElement)){var pos=$getPosition(self)
return attr=="x" ? pos.left :pos.top}
case "clear":
case "closest":
return function(){return DOMNode[attr].call(null,self,...arguments)}
case "headers":
if(self.nodeType==9){
var req=new XMLHttpRequest();
req.open("GET",document.location,false)
req.send(null);
var headers=req.getAllResponseHeaders()
headers=headers.split("\r\n")
var res=$B.empty_dict()
for(var i=0;i < headers.length;i++){var header=headers[i]
if(header.strip().length==0){continue}
var pos=header.search(":")
res.__setitem__(header.substr(0,pos),header.substr(pos+1).lstrip())}
return res}
break
case "$$location":
attr="location"
break}
if(attr=="select" && self.nodeType==1 &&
["INPUT","TEXTAREA"].indexOf(self.tagName.toUpperCase())>-1){return function(selector){if(selector===undefined){self.select();return _b_.None}
return DOMNode.select(self,selector)}}
if(attr=="query" && self.nodeType==9){
var res={__class__:Query,_keys :[],_values :{}}
var qs=location.search.substr(1).split('&')
if(location.search !=""){for(var i=0;i < qs.length;i++){var pos=qs[i].search("="),elts=[qs[i].substr(0,pos),qs[i].substr(pos+1)],key=decodeURIComponent(elts[0]),value=decodeURIComponent(elts[1])
if(res._keys.indexOf(key)>-1){res._values[key].push(value)}else{res._keys.push(key)
res._values[key]=[value]}}}
return res}
var property=self[attr]
if(property===undefined && $B.aliased_names[attr]){property=self["$$"+attr]}
if(property !==undefined && self.__class__ &&
self.__class__.__module__ !="browser.html" &&
self.__class__.__module__ !="browser.svg"){
var bases=self.__class__.__bases__
var show_message=true
for(var base of bases){if(base.__module__=="browser.html"){show_message=false
break}}
if(show_message){var from_class=$B.$getattr(self.__class__,attr,_b_.None)
if(from_class !==_b_.None){var frame=$B.last($B.frames_stack),line_info=frame[1].$line_info,line=line_info.split(',')[0]
console.info("Warning: line "+line+", "+self.tagName+
" element has instance attribute '"+attr+"' set."+
" Attribute of class "+$B.class_name(self)+
" is ignored.")}}}
if(property===undefined){
if(self.tagName){var ce=customElements.get(self.tagName.toLowerCase())
if(ce !==undefined && ce.$cls !==undefined){
var save_class=self.__class__
self.__class__=ce.$cls
try{var res=_b_.object.__getattribute__(self,attr)
self.__class__=save_class
return res}catch(err){self.__class__=save_class
if(! $B.is_exc(err,[_b_.AttributeError])){throw err}}}}
return object.__getattribute__(self,attr)}
var res=property
if(res !==undefined){if(res===null){return _b_.None}
if(typeof res==="function"){
var func=(function(f,elt){return function(){var args=[],pos=0
for(var i=0;i < arguments.length;i++){var arg=arguments[i]
if(typeof arg=="function"){
if(arg.$cache){var f1=arg.$cache}else{var f1=function(dest_fn){return function(){try{return dest_fn.apply(null,arguments)}catch(err){$B.handle_error(err)}}}(arg)
arg.$cache=f1}
args[pos++]=f1}else if(_b_.isinstance(arg,DOMNode)){args[pos++]=arg}else if(arg===_b_.None){args[pos++]=null}else if(arg.__class__==_b_.dict){args[pos++]=_b_.dict.$to_obj(arg)}else{args[pos++]=arg}}
var result=f.apply(elt,args)
return $B.$JS2Py(result)}})(res,self)
func.$infos={__name__ :attr,__qualname__:attr}
func.$is_func=true
return func}
if(attr=='options'){return Options.$factory(self)}
if(attr=='style'){return $B.JSObj.$factory(self[attr])}
if(Array.isArray(res)){return res}
return $B.$JS2Py(res)}
return object.__getattribute__(self,attr)}
DOMNode.__getitem__=function(self,key){if(self.nodeType==9){
if(typeof key=="string"){var res=self.getElementById(key)
if(res){return DOMNode.$factory(res)}
throw _b_.KeyError.$factory(key)}else{try{var elts=self.getElementsByTagName(key.$infos.__name__),res=[]
for(var i=0;i < elts.length;i++){res.push(DOMNode.$factory(elts[i]))}
return res}catch(err){throw _b_.KeyError.$factory(_b_.str.$factory(key))}}}else{if((typeof key=="number" ||typeof key=="boolean")&&
typeof self.item=="function"){var key_to_int=_b_.int.$factory(key)
if(key_to_int < 0){key_to_int+=self.length}
var res=DOMNode.$factory(self.item(key_to_int))
if(res===undefined){throw _b_.KeyError.$factory(key)}
return res}else if(typeof key=="string" &&
self.attributes &&
typeof self.attributes.getNamedItem=="function"){var attr=self.attributes.getNamedItem(key)
if(!!attr){return attr.value}
throw _b_.KeyError.$factory(key)}}}
DOMNode.__hash__=function(self){return self.__hashvalue__===undefined ?
(self.__hashvalue__=$B.$py_next_hash--):
self.__hashvalue__}
DOMNode.__iter__=function(self){
if(self.length !==undefined && typeof self.item=="function"){var items=[]
for(var i=0,len=self.length;i < len;i++){items.push(DOMNode.$factory(self.item(i)))}}else if(self.childNodes !==undefined){var items=[]
for(var i=0,len=self.childNodes.length;i < len;i++){items.push(DOMNode.$factory(self.childNodes[i]))}}
return $B.$iter(items)}
DOMNode.__le__=function(self,other){
if(self.nodeType==9){self=self.body}
if(_b_.isinstance(other,TagSum)){for(var i=0;i < other.children.length;i++){self.appendChild(other.children[i])}}else if(typeof other=="string" ||typeof other=="number"){var $txt=document.createTextNode(other.toString())
self.appendChild($txt)}else if(_b_.isinstance(other,DOMNode)){
self.appendChild(other)}else{try{
var items=_b_.list.$factory(other)
items.forEach(function(item){DOMNode.__le__(self,item)})}catch(err){throw _b_.TypeError.$factory("can't add '"+
$B.class_name(other)+"' object to DOMNode instance")}}
return self }
DOMNode.__len__=function(self){return self.length}
DOMNode.__mul__=function(self,other){if(_b_.isinstance(other,_b_.int)&& other.valueOf()> 0){var res=TagSum.$factory()
var pos=res.children.length
for(var i=0;i < other.valueOf();i++){res.children[pos++]=DOMNode.clone(self)()}
return res}
throw _b_.ValueError.$factory("can't multiply "+self.__class__+
"by "+other)}
DOMNode.__ne__=function(self,other){return ! DOMNode.__eq__(self,other)}
DOMNode.__next__=function(self){self.$counter++
if(self.$counter < self.childNodes.length){return DOMNode.$factory(self.childNodes[self.$counter])}
throw _b_.StopIteration.$factory("StopIteration")}
DOMNode.__radd__=function(self,other){
var res=TagSum.$factory()
var txt=DOMNode.$factory(document.createTextNode(other))
res.children=[txt,self]
return res}
DOMNode.__str__=DOMNode.__repr__=function(self){var attrs=self.attributes,attrs_str="",items=[]
if(attrs !==undefined){var items=[]
for(var i=0;i < attrs.length;i++){items.push(attrs[i].name+'="'+
self.getAttributeNS(null,attrs[i].name)+'"')}}
var proto=Object.getPrototypeOf(self)
if(proto){var name=proto.constructor.name
if(name===undefined){
var proto_str=proto.constructor.toString()
name=proto_str.substring(8,proto_str.length-1)}
items.splice(0,0,name)
return "<"+items.join(" ")+">"}
var res="<DOMNode object type '"
return res+$NodeTypes[self.nodeType]+"' name '"+
self.nodeName+"'"+attrs_str+">"}
DOMNode.__setattr__=function(self,attr,value){
if(attr.substr(0,2)=="on" && attr.length > 2){
if(!$B.$bool(value)){
DOMNode.unbind(self,attr.substr(2))}else{
DOMNode.bind(self,attr.substr(2),value)}}else{switch(attr){case "left":
case "top":
case "width":
case "height":
if(_b_.isinstance(value,_b_.int)&& self.nodeType==1){self.style[attr]=value+"px"
return _b_.None}else{throw _b_.ValueError.$factory(attr+" value should be"+
" an integer, not "+$B.class_name(value))}
break}
if(DOMNode["set_"+attr]!==undefined){return DOMNode["set_"+attr](self,value)}
function warn(msg){console.log(msg)
var frame=$B.last($B.frames_stack)
if($B.debug > 0){var info=frame[1].$line_info.split(",")
console.log("module",info[1],"line",info[0])
if($B.$py_src.hasOwnProperty(info[1])){var src=$B.$py_src[info[1]]
console.log(src.split("\n")[parseInt(info[0])-1])}}else{console.log("module",frame[2])}}
var proto=Object.getPrototypeOf(self),nb=0
while(!!proto && proto !==Object.prototype && nb++< 10){var descriptors=Object.getOwnPropertyDescriptors(proto)
if(!!descriptors &&
typeof descriptors.hasOwnProperty=="function"){if(descriptors.hasOwnProperty(attr)){if(!descriptors[attr].writable &&
descriptors[attr].set===undefined){warn("Warning: property '"+attr+
"' is not writable. Use element.attrs['"+
attr+"'] instead.")}
break}}else{break}
proto=Object.getPrototypeOf(proto)}
if(self.style && self.style[attr]!==undefined){warn("Warning: '"+attr+"' is a property of element.style")}
self[attr]=value
return _b_.None}}
DOMNode.__setitem__=function(self,key,value){if(typeof key=="number"){self.childNodes[key]=value}else if(typeof key=="string"){if(self.attributes){if(self instanceof SVGElement){self.setAttributeNS(null,key,value)}else if(typeof self.setAttribute=="function"){self.setAttribute(key,value)}}}}
DOMNode.abs_left={__get__:function(self){return $getPosition(self).left},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'abs_left' is read-only")}}
DOMNode.abs_top={__get__:function(self){return $getPosition(self).top},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'abs_top' is read-only")}}
DOMNode.attach=DOMNode.__le__ 
DOMNode.bind=function(self,event){
var $=$B.args("bind",4,{self:null,event:null,func:null,options:null},["self","event","func","options"],arguments,{func:_b_.None,options:_b_.None},null,null),self=$.self,event=$.event,func=$.func,options=$.options
if(func===_b_.None){
return function(f){return DOMNode.bind(self,event,f)}}
var callback=(function(f){return function(ev){try{return f($DOMEvent(ev))}catch(err){if(err.__class__ !==undefined){$B.handle_error(err)}else{try{$B.$getattr($B.stderr,"write")(err)}
catch(err1){console.log(err)}}}}}
)(func)
callback.$infos=func.$infos
callback.$attrs=func.$attrs ||{}
callback.$func=func
if(typeof options=="boolean"){self.addEventListener(event,callback,options)}else if(options.__class__===_b_.dict){self.addEventListener(event,callback,_b_.dict.$to_obj(options))}else if(options===_b_.None){self.addEventListener(event,callback,false)}
self.$events=self.$events ||{}
self.$events[event]=self.$events[event]||[]
self.$events[event].push([func,callback])
return self}
DOMNode.children=function(self){var res=[]
if(self.nodeType==9){self=self.body}
for(var child of self.children){res.push(DOMNode.$factory(child))}
return res}
DOMNode.child_nodes=function(self){var res=[]
if(self.nodeType==9){self=self.body}
for(child of self.childNodes){res.push(DOMNode.$factory(child))}
return res}
DOMNode.clear=function(self){
var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null)
if(self.nodeType==9){self=self.body}
while(self.firstChild){self.removeChild(self.firstChild)}}
DOMNode.Class=function(self){if(self.className !==undefined){return self.className}
return _b_.None}
DOMNode.class_name=function(self){return DOMNode.Class(self)}
DOMNode.clone=function(self){var res=DOMNode.$factory(self.cloneNode(true))
var events=self.$events ||{}
for(var event in events){var evt_list=events[event]
evt_list.forEach(function(evt){var func=evt[0]
DOMNode.bind(res,event,func)})}
return res}
DOMNode.closest=function(self,selector){
var $=$B.args("closest",2,{self:null,selector:null},["self","selector"],arguments,{},null,null)
var res=self.closest(selector)
if(res===null){throw _b_.KeyError.$factory("no parent with selector "+selector)}
return DOMNode.$factory(res)}
DOMNode.events=function(self,event){self.$events=self.$events ||{}
var evt_list=self.$events[event]=self.$events[event]||[],callbacks=[]
evt_list.forEach(function(evt){callbacks.push(evt[1])})
return callbacks}
function make_list(node_list){var res=[]
for(var i=0;i < node_list.length;i++){res.push(DOMNode.$factory(node_list[i]))}
return res}
DOMNode.get=function(self){
var args=[]
for(var i=1;i < arguments.length;i++){args.push(arguments[i])}
var $ns=$B.args("get",0,{},[],args,{},null,"kw"),$dict={},items=_b_.list.$factory(_b_.dict.items($ns["kw"]))
items.forEach(function(item){$dict[item[0]]=item[1]})
if($dict["name"]!==undefined){if(self.getElementsByName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by name")}
return make_list(self.getElementsByName($dict['name']))}
if($dict["tag"]!==undefined){if(self.getElementsByTagName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by tag name")}
return make_list(self.getElementsByTagName($dict["tag"]))}
if($dict["classname"]!==undefined){if(self.getElementsByClassName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by class name")}
return make_list(self.getElementsByClassName($dict['classname']))}
if($dict["id"]!==undefined){if(self.getElementById===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by id")}
var id_res=document.getElementById($dict['id'])
if(! id_res){return[]}
return[DOMNode.$factory(id_res)]}
if($dict["selector"]!==undefined){if(self.querySelectorAll===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
return make_list(self.querySelectorAll($dict['selector']))}
return res}
DOMNode.getContext=function(self){
if(!("getContext" in self)){throw _b_.AttributeError.$factory("object has no attribute 'getContext'")}
return function(ctx){return $B.JSObj.$factory(self.getContext(ctx))}}
DOMNode.getSelectionRange=function(self){
if(self["getSelectionRange"]!==undefined){return self.getSelectionRange.apply(null,arguments)}}
DOMNode.html=function(self){var res=self.innerHTML
if(res===undefined){if(self.nodeType==9 && self.body){res=self.body.innerHTML}else{res=_b_.None}}
return res}
DOMNode.index=function(self,selector){var items
if(selector===undefined){items=self.parentElement.childNodes}else{items=self.parentElement.querySelectorAll(selector)}
var rank=-1
for(var i=0;i < items.length;i++){if(items[i]===self){rank=i;break}}
return rank}
DOMNode.inside=function(self,other){
var elt=self
while(true){if(other===elt){return true}
elt=elt.parentNode
if(! elt){return false}}}
DOMNode.options=function(self){
return new $OptionsClass(self)}
DOMNode.parent=function(self){if(self.parentElement){return DOMNode.$factory(self.parentElement)}
return _b_.None}
DOMNode.reset=function(self){
return function(){self.reset()}}
DOMNode.scrolled_left={__get__:function(self){return $getPosition(self).left-
document.scrollingElement.scrollLeft},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'scrolled_left' is read-only")}}
DOMNode.scrolled_top={__get__:function(self){return $getPosition(self).top-
document.scrollingElement.scrollTop},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'scrolled_top' is read-only")}}
DOMNode.select=function(self,selector){
if(self.querySelectorAll===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
return make_list(self.querySelectorAll(selector))}
DOMNode.select_one=function(self,selector){
if(self.querySelector===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
var res=self.querySelector(selector)
if(res===null){return _b_.None}
return DOMNode.$factory(res)}
DOMNode.setSelectionRange=function(self){
if(this["setSelectionRange"]!==undefined){return(function(obj){return function(){return obj.setSelectionRange.apply(obj,arguments)}})(this)}else if(this["createTextRange"]!==undefined){return(function(obj){return function(start_pos,end_pos){if(end_pos==undefined){end_pos=start_pos}
var range=obj.createTextRange()
range.collapse(true)
range.moveEnd("character",start_pos)
range.moveStart("character",end_pos)
range.select()}})(this)}}
DOMNode.set_class_name=function(self,arg){self.setAttribute("class",arg)}
DOMNode.set_html=function(self,value){if(self.nodeType==9){self=self.body}
self.innerHTML=_b_.str.$factory(value)}
DOMNode.set_style=function(self,style){
if(!_b_.isinstance(style,_b_.dict)){throw _b_.TypeError.$factory("style must be dict, not "+
$B.class_name(style))}
var items=_b_.list.$factory(_b_.dict.items(style))
for(var i=0;i < items.length;i++){var key=items[i][0],value=items[i][1]
if(key.toLowerCase()=="float"){self.style.cssFloat=value
self.style.styleFloat=value}else{switch(key){case "top":
case "left":
case "width":
case "height":
case "borderWidth":
if(_b_.isinstance(value,_b_.int)){value=value+"px"}}
self.style[key]=value}}}
DOMNode.set_text=function(self,value){if(self.nodeType==9){self=self.body}
self.innerText=_b_.str.$factory(value)
self.textContent=_b_.str.$factory(value)}
DOMNode.set_value=function(self,value){self.value=_b_.str.$factory(value)}
DOMNode.submit=function(self){
return function(){self.submit()}}
DOMNode.text=function(self){if(self.nodeType==9){self=self.body}
var res=self.innerText ||self.textContent
if(res===null){res=_b_.None}
return res}
DOMNode.toString=function(self){if(self===undefined){return 'DOMNode'}
return self.nodeName}
DOMNode.trigger=function(self,etype){
if(self.fireEvent){self.fireEvent("on"+etype)}else{var evObj=document.createEvent("Events")
evObj.initEvent(etype,true,false)
self.dispatchEvent(evObj)}}
DOMNode.unbind=function(self,event){
self.$events=self.$events ||{}
if(self.$events==={}){return _b_.None}
if(event===undefined){for(var event in self.$events){DOMNode.unbind(self,event)}
return _b_.None}
if(self.$events[event]===undefined ||
self.$events[event].length==0){return _b_.None}
var events=self.$events[event]
if(arguments.length==2){
for(var i=0;i < events.length;i++){var callback=events[i][1]
self.removeEventListener(event,callback,false)}
self.$events[event]=[]
return _b_.None}
for(var i=2;i < arguments.length;i++){var callback=arguments[i],flag=false,func=callback.$func
if(func===undefined){
var found=false
for(var j=0;j < events.length;j++){if(events[j][0]===callback){var func=callback,found=true
break}}
if(!found){throw _b_.TypeError.$factory("function is not an event callback")}}
for(var j=0;j < events.length;j++){if($B.$getattr(func,'__eq__')(events[j][0])){var callback=events[j][1]
self.removeEventListener(event,callback,false)
events.splice(j,1)
flag=true
break}}
if(!flag){throw _b_.KeyError.$factory('missing callback for event '+event)}}}
$B.set_func_names(DOMNode,"browser")
var Query={__class__:_b_.type,__mro__:[_b_.object],$infos:{__name__:"query"}}
Query.__contains__=function(self,key){return self._keys.indexOf(key)>-1}
Query.__getitem__=function(self,key){
var result=self._values[key]
if(result===undefined){throw _b_.KeyError.$factory(key)}else if(result.length==1){return result[0]}
return result}
var Query_iterator=$B.make_iterator_class("query string iterator")
Query.__iter__=function(self){return Query_iterator.$factory(self._keys)}
Query.__setitem__=function(self,key,value){self._values[key]=[value]
return _b_.None}
Query.__str__=Query.__repr__=function(self){
var elts=[]
for(var key in self._values){for(const val of self._values[key]){elts.push(encodeURIComponent(key)+"="+encodeURIComponent(val))}}
if(elts.length==0){return ""}else{return "?"+elts.join("&")}}
Query.getfirst=function(self,key,_default){
var result=self._values[key]
if(result===undefined){if(_default===undefined){return _b_.None}
return _default}
return result[0]}
Query.getlist=function(self,key){
var result=self._values[key]
if(result===undefined){return[]}
return result}
Query.getvalue=function(self,key,_default){try{return Query.__getitem__(self,key)}
catch(err){if(_default===undefined){return _b_.None}
return _default}}
Query.keys=function(self){return self._keys}
$B.set_func_names(Query,"<dom>")
var TagSum={__class__ :_b_.type,__mro__:[object],$infos:{__module__:"<pydom>",__name__:"TagSum"}}
TagSum.appendChild=function(self,child){self.children.push(child)}
TagSum.__add__=function(self,other){if($B.get_class(other)===TagSum){self.children=self.children.concat(other.children)}else if(_b_.isinstance(other,[_b_.str,_b_.int,_b_.float,_b_.dict,_b_.set,_b_.list])){self.children=self.children.concat(
DOMNode.$factory(document.createTextNode(other)))}else{self.children.push(other)}
return self}
TagSum.__radd__=function(self,other){var res=TagSum.$factory()
res.children=self.children.concat(
DOMNode.$factory(document.createTextNode(other)))
return res}
TagSum.__repr__=function(self){var res="<object TagSum> "
for(var i=0;i < self.children.length;i++){res+=self.children[i]
if(self.children[i].toString()=="[object Text]"){res+=" ["+self.children[i].textContent+"]\n"}}
return res}
TagSum.__str__=TagSum.toString=TagSum.__repr__
TagSum.clone=function(self){var res=TagSum.$factory()
for(var i=0;i < self.children.length;i++){res.children.push(self.children[i].cloneNode(true))}
return res}
TagSum.$factory=function(){return{
__class__:TagSum,children:[],toString:function(){return "(TagSum)"}}}
$B.set_func_names(TagSum,"<dom>")
$B.TagSum=TagSum 
var win=$B.JSObj.$factory(_window)
win.get_postMessage=function(msg,targetOrigin){if(_b_.isinstance(msg,dict)){var temp={__class__:"dict"},items=_b_.list.$factory(_b_.dict.items(msg))
items.forEach(function(item){temp[item[0]]=item[1]})
msg=temp}
return _window.postMessage(msg,targetOrigin)}
$B.DOMNode=DOMNode
$B.win=win})(__BRYTHON__)
;
;(function($B){
var _b_=$B.builtins
var bltns=$B.InjectBuiltins()
eval(bltns)
var $GeneratorReturn={}
$B.generator_return=function(value){return{__class__:$GeneratorReturn,value:value}}
$B.generator=$B.make_class("generator",function(func,name){
var res=function(){var gen=func.apply(null,arguments)
gen.$name=name ||'generator'
gen.$func=func
gen.$has_run=false
gen.__class__=$B.generator
if(func.$has_yield_in_cm){var locals=$B.last($B.frames_stack)[1]
locals.$close_generators=locals.$close_generators ||[]
locals.$close_generators.push(gen)}
return gen}
res.$infos=func.$infos
res.$is_genfunc=true
res.$name=name
return res}
)
$B.generator.__iter__=function(self){return self}
$B.generator.__next__=function(self){return $B.generator.send(self,_b_.None)}
$B.generator.__str__=function(self){return '<'+self.$name+' object>'}
$B.generator.close=function(self){try{$B.generator.$$throw(self,_b_.GeneratorExit.$factory())}catch(err){if(! $B.is_exc(err,[_b_.GeneratorExit,_b_.StopIteration])){throw _b_.RuntimeError.$factory("generator ignored GeneratorExit")}}}
$B.generator.send=function(self,value){
self.$has_run=true
if(self.$finished){throw _b_.StopIteration.$factory(value)}
if(self.gi_running===true){throw _b_.ValueError.$factory("generator already executing")}
self.gi_running=true
try{var res=self.next(value)}catch(err){self.$finished=true
throw err}
if(res.value && res.value.__class__===$GeneratorReturn){self.$finished=true
throw _b_.StopIteration.$factory(res.value.value)}
self.gi_running=false
if(res.done){throw _b_.StopIteration.$factory(res.value)}
return res.value}
$B.generator.$$throw=function(self,type,value,traceback){var exc=type
if(exc.$is_class){if(! _b_.issubclass(type,_b_.BaseException)){throw _b_.TypeError.$factory("exception value must be an "+
"instance of BaseException")}else if(value===undefined){exc=$B.$call(exc)()}else if(_b_.isinstance(value,type)){exc=value}}else{if(value===undefined){value=exc}else{exc=$B.$call(exc)(value)}}
if(traceback !==undefined){exc.$traceback=traceback}
var res=self.throw(exc)
if(res.done){throw _b_.StopIteration.$factory("StopIteration")}
return res.value}
$B.set_func_names($B.generator,"builtins")
$B.async_generator=$B.make_class("async_generator",function(func){var f=function(){var res=func.apply(null,arguments)
res.__class__=$B.async_generator
return res}
return f}
)
var ag_closed={}
$B.async_generator.__aiter__=function(self){return self}
$B.async_generator.__anext__=function(self){return $B.async_generator.asend(self,_b_.None)}
$B.async_generator.aclose=function(self){self.$finished=true
return _b_.None}
$B.async_generator.asend=async function(self,value){if(self.$finished){throw _b_.StopAsyncIteration.$factory(value)}
if(self.ag_running===true){throw _b_.ValueError.$factory("generator already executing")}
self.ag_running=true
try{var res=await self.next(value)}catch(err){self.$finished=true
throw err}
if(res.done){throw _b_.StopAsyncIteration.$factory(value)}
if(res.value.__class__===$GeneratorReturn){self.$finished=true
throw _b_.StopAsyncIteration.$factory(res.value.value)}
self.ag_running=false
return res.value}
$B.async_generator.athrow=async function(self,type,value,traceback){var exc=type
if(exc.$is_class){if(! _b_.issubclass(type,_b_.BaseException)){throw _b_.TypeError.$factory("exception value must be an "+
"instance of BaseException")}else if(value===undefined){value=$B.$call(exc)()}}else{if(value===undefined){value=exc}else{exc=$B.$call(exc)(value)}}
if(traceback !==undefined){exc.$traceback=traceback}
await self.throw(value)}
$B.set_func_names($B.async_generator,"builtins")
function rstrip(s,strip_chars){var _chars=strip_chars ||" \t\n";
var nstrip=0,len=s.length;
while(nstrip < len && _chars.indexOf(s.charAt(len-1-nstrip))>-1)nstrip++;
return s.substr(0,len-nstrip)}})(__BRYTHON__)
;
 ;(function($B){var _b_=$B.builtins
var update=function(mod,data){for(attr in data){mod[attr]=data[attr]}}
var _window=self;
var modules={}
var browser={$package:true,$is_package:true,__initialized__:true,__package__:'browser',__file__:$B.brython_path.replace(/\/*$/g,'')+
'/Lib/browser/__init__.py',bind:function(){
var $=$B.args("bind",3,{elt:null,evt:null,options:null},["elt","evt","options"],arguments,{options:_b_.None},null,null)
var options=$.options
if(typeof options=="boolean"){}
else if(options.__class__===_b_.dict){options=options.$string_dict}else{options==false}
return function(callback){if($B.get_class($.elt)===$B.JSObj){
function f(ev){try{return callback($B.JSObj.$factory(ev))}catch(err){$B.handle_error(err)}}
$.elt.addEventListener($.evt,f,options)
return callback}else if(_b_.isinstance($.elt,$B.DOMNode)){
$B.DOMNode.bind($.elt,$.evt,callback,options)
return callback}else if(_b_.isinstance($.elt,_b_.str)){
var items=document.querySelectorAll($.elt)
for(var i=0;i < items.length;i++){$B.DOMNode.bind($B.DOMNode.$factory(items[i]),$.evt,callback,options)}
return callback}
try{var it=$B.$iter($.elt)
while(true){try{var elt=_b_.next(it)
$B.DOMNode.bind(elt,$.evt,callback)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}}catch(err){if(_b_.isinstance(err,_b_.AttributeError)){$B.DOMNode.bind($.elt,$.evt,callback)}
throw err}
return callback}},console:self.console && $B.JSObj.$factory(self.console),self:$B.win,win:$B.win,$$window:$B.win,}
browser.__path__=browser.__file__
if($B.isNode){delete browser.$$window
delete browser.win}else if($B.isWebWorker){browser.is_webworker=true
delete browser.$$window
delete browser.win
browser.self.send=self.postMessage}else{
browser.is_webworker=false
update(browser,{$$alert:function(message){window.alert($B.builtins.str.$factory(message ||""))},confirm:$B.JSObj.$factory(window.confirm),$$document:$B.DOMNode.$factory(document),doc:$B.DOMNode.$factory(document),
DOMEvent:$B.DOMEvent,DOMNode:$B.DOMNode,load:function(script_url){
var file_obj=$B.builtins.open(script_url)
var content=$B.$getattr(file_obj,'read')()
eval(content)},mouseCoords:function(ev){return $B.JSObj.$factory($mouseCoords(ev))},prompt:function(message,default_value){return $B.JSObj.$factory(window.prompt(message,default_value||''))},reload:function(){
var scripts=document.getElementsByTagName('script'),js_scripts=[]
scripts.forEach(function(script){if(script.type===undefined ||
script.type=='text/javascript'){js_scripts.push(script)
if(script.src){console.log(script.src)}}})
console.log(js_scripts)
for(var mod in $B.imported){if($B.imported[mod].$last_modified){console.log('check',mod,$B.imported[mod].__file__,$B.imported[mod].$last_modified)}else{console.log('no date for mod',mod)}}},run_script:function(){var $=$B.args("run_script",2,{src:null,name:null},["src","name"],arguments,{name:"script_"+$B.UUID()},null,null)
$B.run_script($.src,$.name,true)},URLParameter:function(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var regex=new RegExp("[\\?&]"+name+"=([^&#]*)"),results=regex.exec(location.search);
results=results===null ? "" :
decodeURIComponent(results[1].replace(/\+/g," "));
return $B.builtins.str.$factory(results);}})
modules['browser.html']=(function($B){var _b_=$B.builtins
var TagSum=$B.TagSum
function makeTagDict(tagName){
var dict={__class__:_b_.type,$infos:{__name__:tagName,__module__:"browser.html"}}
dict.__init__=function(){var $ns=$B.args('pow',1,{self:null},['self'],arguments,{},'args','kw'),self=$ns['self'],args=$ns['args']
if(args.length==1){var first=args[0]
if(_b_.isinstance(first,[_b_.str,_b_.int,_b_.float])){
self.innerHTML=_b_.str.$factory(first)}else if(first.__class__===TagSum){for(var i=0,len=first.children.length;i < len;i++){self.appendChild(first.children[i])}}else{if(_b_.isinstance(first,$B.DOMNode)){self.appendChild(first)}else{try{
var items=_b_.list.$factory(first)
items.forEach(function(item){$B.DOMNode.__le__(self,item)})}catch(err){if($B.debug > 1){console.log(err,err.__class__,err.args)
console.log("first",first)
console.log(arguments)}
throw err}}}}
var items=_b_.list.$factory(_b_.dict.items($ns['kw']))
for(var i=0,len=items.length;i < len;i++){
var arg=items[i][0],value=items[i][1]
if(arg.toLowerCase().substr(0,2)=="on"){
var js='$B.DOMNode.bind(self,"'+
arg.toLowerCase().substr(2)
eval(js+'",function(){'+value+'})')}else if(arg.toLowerCase()=="style"){$B.DOMNode.set_style(self,value)}else{if(value !==false){
try{
arg=$B.imported["browser.html"].
attribute_mapper(arg)
self.setAttribute(arg,value)}catch(err){throw _b_.ValueError.$factory(
"can't set attribute "+arg)}}}}}
dict.__mro__=[$B.DOMNode,$B.builtins.object]
dict.__new__=function(cls){
if(cls.$elt_wrap !==undefined){
var elt=cls.$elt_wrap 
cls.$elt_wrap=undefined 
var res=$B.DOMNode.$factory(elt,true)
res._wrapped=true }else{var res=$B.DOMNode.$factory(document.createElement(tagName),true)
res._wrapped=false }
res.__class__=cls
res.__dict__=$B.empty_dict()
return res}
$B.set_func_names(dict,"browser.html")
return dict}
function makeFactory(klass){var factory=function(){if(klass.$elt_wrap !==undefined){
var elt=klass.$elt_wrap 
klass.$elt_wrap=undefined 
var res=$B.DOMNode.$factory(elt,true)
res._wrapped=true }else{if(klass.$infos.__name__=='SVG'){var res=$B.DOMNode.$factory(
document.createElementNS("http://www.w3.org/2000/svg","svg"),true)}else{var elt=document.createElement(klass.$infos.__name__),res=$B.DOMNode.$factory(elt,true)}
res._wrapped=false }
res.__class__=klass
klass.__init__(res,...arguments)
return res}
return factory}
var tags=['A','ABBR','ACRONYM','ADDRESS','APPLET','AREA','B','BASE','BASEFONT','BDO','BIG','BLOCKQUOTE','BODY','BR','BUTTON','CAPTION','CENTER','CITE','CODE','COL','COLGROUP','DD','DEL','DFN','DIR','DIV','DL','DT','EM','FIELDSET','FONT','FORM','FRAME','FRAMESET','H1','H2','H3','H4','H5','H6','HEAD','HR','HTML','I','IFRAME','IMG','INPUT','INS','ISINDEX','KBD','LABEL','LEGEND','LI','LINK','MAP','MENU','META','NOFRAMES','NOSCRIPT','OBJECT','OL','OPTGROUP','OPTION','P','PARAM','PRE','Q','S','SAMP','SCRIPT','SELECT','SMALL','SPAN','STRIKE','STRONG','STYLE','SUB','SUP','SVG','TABLE','TBODY','TD','TEXTAREA','TFOOT','TH','THEAD','TITLE','TR','TT','U','UL','VAR',
'ARTICLE','ASIDE','AUDIO','BDI','CANVAS','COMMAND','DATA','DATALIST','EMBED','FIGCAPTION','FIGURE','FOOTER','HEADER','KEYGEN','MAIN','MARK','MATH','METER','NAV','OUTPUT','PROGRESS','RB','RP','RT','RTC','RUBY','SECTION','SOURCE','TEMPLATE','TIME','TRACK','VIDEO','WBR',
'DETAILS','DIALOG','MENUITEM','PICTURE','SUMMARY']
var obj={tags:$B.empty_dict()},dicts={}
$B.DOMNode.tags=obj.tags
function maketag(tag){if(!(typeof tag=='string')){throw _b_.TypeError.$factory("html.maketag expects a string as argument")}
var klass=dicts[tag]=makeTagDict(tag)
klass.$factory=makeFactory(klass)
_b_.dict.$setitem(obj.tags,tag,klass)
return klass}
tags.forEach(function(tag){obj[tag]=maketag(tag)})
obj.maketag=maketag
obj.attribute_mapper=function(attr){return attr.replace(/_/g,'-')}
return obj})(__BRYTHON__)}
modules['browser']=browser
$B.UndefinedClass=$B.make_class("Undefined",function(){return $B.Undefined}
)
$B.UndefinedClass.__mro__=[_b_.object]
$B.UndefinedClass.__bool__=function(self){return false}
$B.UndefinedClass.__repr__=$B.UndefinedClass.__str__=function(self){return "<Javascript undefined>"}
$B.Undefined={__class__:$B.UndefinedClass}
$B.set_func_names($B.UndefinedClass,"javascript")
var super_class=$B.make_class("JavascriptSuper",function(){
var b_super=_b_.$$super.$factory(),b_self=b_super.__self_class__,proto=Object.getPrototypeOf(b_self),parent=proto.constructor.$parent
var factory=function(){var p=parent.bind(b_self),res
if(parent.toString().startsWith("class")){res=new p(...arguments)}else{res=p(...arguments)}
for(key in res){b_self[$B.to_alias(key)]=res[key]}
return res}
return{
__class__:super_class,__init__:factory,__self_class__:b_self}}
)
super_class.__getattribute__=function(self,attr){if(attr=="__init__" ||attr=="__call__"){return self.__init__}
return $B.$getattr(self.__self_class__,attr)}
$B.set_func_names(super_class,"javascript")
modules['javascript']={$$this:function(){
if($B.js_this===undefined){return $B.builtins.None}
return $B.JSObj.$factory($B.js_this)},$$Date:self.Date && $B.JSObj.$factory(self.Date),$$extends:function(js_constr){return function(obj){if(obj.$is_class){var factory=function(){var init=$B.$getattr(obj,"__init__",_b_.None)
if(init !==_b_.None){init.bind(this,this).apply(this,arguments)}
return this}
factory.prototype=Object.create(js_constr.prototype)
factory.prototype.constructor=factory
factory.$parent=js_constr.$js_func
factory.$is_class=true 
factory.$infos=obj.$infos
for(var key in obj){if(typeof obj[key]=="function"){factory.prototype[key]=(function(x){return function(){
return obj[x].bind(this,this).apply(this,arguments)}})(key)}}
return factory}}},JSON:{__class__:$B.make_class("JSON"),parse:function(){return $B.structuredclone2pyobj(
JSON.parse.apply(this,arguments))},stringify:function(obj,replacer,space){return JSON.stringify($B.pyobj2structuredclone(obj,false),$B.JSObj.$factory(replacer),space)}},jsobj2pyobj:function(obj){return $B.jsobj2pyobj(obj)},load:function(script_url){console.log('"javascript.load" is deprecrated. '+
'Use browser.load instead.')
var file_obj=$B.builtins.open(script_url)
var content=$B.$getattr(file_obj,'read')()
eval(content)},$$Math:self.Math && $B.JSObj.$factory(self.Math),NULL:null,$$Number:self.Number && $B.JSObj.$factory(self.Number),py2js:function(src,module_name){if(module_name===undefined){module_name='__main__'+$B.UUID()}
return $B.py2js(src,module_name,module_name,$B.builtins_scope).to_js()},pyobj2jsobj:function(obj){return $B.pyobj2jsobj(obj)},$$RegExp:self.RegExp && $B.JSObj.$factory(self.RegExp),$$String:self.String && $B.JSObj.$factory(self.String),$$super:super_class,UNDEFINED:$B.Undefined,UndefinedType:$B.UndefinedClass}
var arraybuffers=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"]
arraybuffers.forEach(function(ab){if(self[ab]!==undefined){modules['javascript'][ab]=$B.JSObj.$factory(self[ab])}})
var _b_=$B.builtins
modules['_sys']={
Getframe :function(){var $=$B.args("_getframe",1,{depth:null},['depth'],arguments,{depth:0},null,null),depth=$.depth
return $B._frame.$factory($B.frames_stack,$B.frames_stack.length-depth-1)},breakpointhook:function(){var hookname=$B.$options.breakpoint,modname,dot,funcname,hook
if(hookname===undefined){hookname="pdb.set_trace"}
[modname,dot,funcname]=_b_.str.rpartition(hookname,'.')
if(dot==""){modname="builtins"}
try{$B.$import(modname)
hook=$B.$getattr($B.imported[modname],funcname)}catch(err){console.warn("cannot import breakpoint",hookname)
return _b_.None}
return $B.$call(hook).apply(null,arguments)},exc_info:function(){for(var i=$B.frames_stack.length-1;i >=0;i--){var frame=$B.frames_stack[i],exc=frame[1].$current_exception
if(exc){return _b_.tuple.$factory([exc.__class__,exc,$B.$getattr(exc,"__traceback__")])}}
return _b_.tuple.$factory([_b_.None,_b_.None,_b_.None])},excepthook:function(exc_class,exc_value,traceback){$B.handle_error(exc_value)},gettrace:function(){return $B.tracefunc ||_b_.None},max_string_length:$B.max_string_length,
modules:_b_.property.$factory(
function(){return $B.obj_dict($B.imported)},function(self,obj,value){throw _b_.TypeError.$factory("Read only property 'sys.modules'")}
),path:_b_.property.$factory(
function(){return $B.path},function(self,obj,value){$B.path=value;}
),meta_path:_b_.property.$factory(
function(){return $B.meta_path},function(self,obj,value){$B.meta_path=value}
),path_hooks:_b_.property.$factory(
function(){return $B.path_hooks},function(self,obj,value){$B.path_hooks=value}
),path_importer_cache:_b_.property.$factory(
function(){return _b_.dict.$factory($B.JSObj.$factory($B.path_importer_cache))},function(self,obj,value){throw _b_.TypeError.$factory("Read only property"+
" 'sys.path_importer_cache'")}
),settrace:function(){var $=$B.args("settrace",1,{tracefunc:null},['tracefunc'],arguments,{},null,null)
$B.tracefunc=$.tracefunc
$B.last($B.frames_stack)[1].$f_trace=$B.tracefunc
$B.tracefunc.$current_frame_id=$B.last($B.frames_stack)[0]
return _b_.None},stderr:_b_.property.$factory(
function(){return $B.stderr},function(self,value){$B.stderr=value}
),stdout:_b_.property.$factory(
function(){return $B.stdout},function(self,value){$B.stdout=value}
),stdin:_b_.property.$factory(
function(){return $B.stdin},function(self,value){$B.stdin=value}
),vfs:_b_.property.$factory(
function(){if($B.hasOwnProperty("VFS")){return $B.obj_dict($B.VFS)}else{return _b_.None}},function(){throw _b_.TypeError.$factory("Read only property 'sys.vfs'")}
)}
modules._sys.__breakpointhook__=modules._sys.breakpointhook
modules._sys.stderr.write=function(data){return $B.$getattr(_sys.stderr.__get__(),"write")(data)}
modules._sys.stdout.write=function(data){return $B.$getattr(_sys.stdout.__get__(),"write")(data)}
var WarningMessage=$B.make_class("WarningMessage",function(){var $=$B.make_args("WarningMessage",8,{message:null,category:null,filename:null,lineno:null,file:null,line:null,source:null},['message','category','filename','lineno','file','line','source'],arguments,{file:_b_.None,line:_b_.None,source:_b_.None},null,null)
return{
__class__:WarningMessage,message:$.message,category:$.category,filename:$.filename,lineno:$.lineno,file:$.file,line:$.line,source:$.source,_category_name:_b_.bool.$factory($.category)?
$B.$getattr($.category,"__name__"):_b_.None}}
)
modules._warnings={_defaultaction:"default",_filters_mutated:function(){},_onceregistry:$B.empty_dict(),filters:[$B.fast_tuple(['default',_b_.None,_b_.DeprecationWarning,'__main__',0]),$B.fast_tuple(['ignore',_b_.None,_b_.DeprecationWarning,_b_.None,0]),$B.fast_tuple(['ignore',_b_.None,_b_.PendingDeprecationWarning,_b_.None,0]),$B.fast_tuple(['ignore',_b_.None,_b_.ImportWarning,_b_.None,0]),$B.fast_tuple(['ignore',_b_.None,_b_.ResourceWarning,_b_.None,0])
],warn:function(message){
var filters
if($B.imported.warnings){filters=$B.imported.warnings.filters}else{filters=modules._warnings.filters}
if(filters[0][0]=='error'){var syntax_error=_b_.SyntaxError.$factory(message.args[0])
syntax_error.args[1]=[message.filename,message.lineno,message.offset,message.line]
syntax_error.filename=message.filename
syntax_error.lineno=message.lineno
syntax_error.offset=message.offset
syntax_error.line=message.line
throw syntax_error}
var frame=$B.imported._sys.Getframe()
warning_message={__class__:WarningMessage,$$message:message,category:message.__class__,filename:message.filename ||frame.f_code.co_filename,lineno:message.lineno ||frame.f_lineno,file:_b_.None,line:_b_.None,source:_b_.None,_category_name:message.__class__.__name__}
if($B.imported.warnings){$B.imported.warnings._showwarnmsg_impl(warning_message)}else{var trace=$B.class_name(message)+': '+message.args[0]
$B.$getattr($B.stderr,'write')(trace+'\n')
var flush=$B.$getattr($B.stderr,'flush',_b_.None)
if(flush !==_b_.None){flush()}}},warn_explicit:function(){
console.log("warn_explicit",arguments)}}
function load(name,module_obj){
module_obj.__class__=$B.module
module_obj.__name__=name
$B.imported[name]=module_obj
for(var attr in module_obj){if(typeof module_obj[attr]=='function'){var attr1=$B.from_alias(attr)
module_obj[attr].$infos={__module__:name,__name__:attr1,__qualname__:name+'.'+attr1}}}}
for(var attr in modules){load(attr,modules[attr])}
if(!($B.isWebWorker ||$B.isNode)){modules['browser'].html=modules['browser.html']}
var _b_=$B.builtins
_b_.__builtins__=$B.module.$factory('__builtins__','Python builtins')
for(var attr in _b_){_b_.__builtins__[attr]=_b_[attr]
$B.builtins_scope.binding[attr]=true}
_b_.__builtins__.__setattr__=function(attr,value){_b_[attr]=value}
$B.method_descriptor.__getattribute__=$B.Function.__getattribute__
$B.wrapper_descriptor.__getattribute__=$B.Function.__getattribute__
for(var name in _b_){if(_b_[name].__class__===_b_.type){$B.builtin_classes.push(_b_[name])
for(var key in _b_[name]){var value=_b_[name][key]
if(value===undefined){continue}
else if(value.__class__){continue}
else if(typeof value !="function"){continue}
else if(key=="__new__"){value.__class__=$B.builtin_function}else if(key.startsWith("__")){value.__class__=$B.wrapper_descriptor}else{value.__class__=$B.method_descriptor}
value.__objclass__=_b_[name]}}}
for(var attr in $B){if(Array.isArray($B[attr])){$B[attr].__class__=_b_.list}}
$B.cell=$B.make_class("cell",function(value){return{
__class__:$B.cell,$cell_contents:value}}
)
$B.cell.cell_contents=$B.$call(_b_.property)(
function(self){if(self.$cell_contents===null){throw _b_.ValueError.$factory("empty cell")}
return self.$cell_contents},function(self,value){self.$cell_contents=value}
)
var $comps=Object.values($B.$comps).concat(["eq","ne"])
$comps.forEach(function(comp){var op="__"+comp+"__"
$B.cell[op]=(function(op){return function(self,other){if(! _b_.isinstance(other,$B.cell)){return NotImplemented}
if(self.$cell_contents===null){if(other.$cell_contents===null){return op=="__eq__"}else{return["__ne__","__lt__","__le__"].indexOf(op)>-1}}else if(other.$cell_contents===null){return["__ne__","__gt__","__ge__"].indexOf(op)>-1}
return $B.rich_comp(op,self.$cell_contents,other.$cell_contents)}})(op)})
$B.set_func_names($B.cell,"builtins")})(__BRYTHON__)
;
var docs={ArithmeticError:"Base class for arithmetic errors.",AssertionError:"Assertion failed.",AttributeError:"Attribute not found.",BaseException:"Common base class for all exceptions",BlockingIOError:"I/O operation would block.",BrokenPipeError:"Broken pipe.",BufferError:"Buffer error.",BytesWarning:"Base class for warnings about bytes and buffer related problems, mostly\nrelated to conversion from str or comparing to str.",ChildProcessError:"Child process error.",ConnectionAbortedError:"Connection aborted.",ConnectionError:"Connection error.",ConnectionRefusedError:"Connection refused.",ConnectionResetError:"Connection reset.",DeprecationWarning:"Base class for warnings about deprecated features.",EOFError:"Read beyond end of file.",Ellipsis:"",EnvironmentError:"Base class for I/O related errors.",Exception:"Common base class for all non-exit exceptions.",False:"bool(x) -> bool\n\nReturns True when the argument x is true, False otherwise.\nThe builtins True and False are the only two instances of the class bool.\nThe class bool is a subclass of the class int, and cannot be subclassed.",FileExistsError:"File already exists.",FileNotFoundError:"File not found.",FloatingPointError:"Floating point operation failed.",FutureWarning:"Base class for warnings about constructs that will change semantically\nin the future.",GeneratorExit:"Request that a generator exit.",IOError:"Base class for I/O related errors.",ImportError:"Import can't find module, or can't find name in module.",ImportWarning:"Base class for warnings about probable mistakes in module imports",IndentationError:"Improper indentation.",IndexError:"Sequence index out of range.",InterruptedError:"Interrupted by signal.",IsADirectoryError:"Operation doesn't work on directories.",KeyError:"Mapping key not found.",KeyboardInterrupt:"Program interrupted by user.",LookupError:"Base class for lookup errors.",MemoryError:"Out of memory.",NameError:"Name not found globally.",None:"",NotADirectoryError:"Operation only works on directories.",NotImplemented:"",NotImplementedError:"Method or function hasn't been implemented yet.",OSError:"Base class for I/O related errors.",OverflowError:"Result too large to be represented.",PendingDeprecationWarning:"Base class for warnings about features which will be deprecated\nin the future.",PermissionError:"Not enough permissions.",ProcessLookupError:"Process not found.",ReferenceError:"Weak ref proxy used after referent went away.",ResourceWarning:"Base class for warnings about resource usage.",RuntimeError:"Unspecified run-time error.",RuntimeWarning:"Base class for warnings about dubious runtime behavior.",StopIteration:"Signal the end from iterator.__next__().",SyntaxError:"Invalid syntax.",SyntaxWarning:"Base class for warnings about dubious syntax.",SystemError:"Internal error in the Python interpreter.\n\nPlease report this to the Python maintainer, along with the traceback,\nthe Python version, and the hardware/OS platform and version.",SystemExit:"Request to exit from the interpreter.",TabError:"Improper mixture of spaces and tabs.",TimeoutError:"Timeout expired.",True:"bool(x) -> bool\n\nReturns True when the argument x is true, False otherwise.\nThe builtins True and False are the only two instances of the class bool.\nThe class bool is a subclass of the class int, and cannot be subclassed.",TypeError:"Inappropriate argument type.",UnboundLocalError:"Local name referenced but not bound to a value.",UnicodeDecodeError:"Unicode decoding error.",UnicodeEncodeError:"Unicode encoding error.",UnicodeError:"Unicode related error.",UnicodeTranslateError:"Unicode translation error.",UnicodeWarning:"Base class for warnings about Unicode related problems, mostly\nrelated to conversion problems.",UserWarning:"Base class for warnings generated by user code.",ValueError:"Inappropriate argument value (of correct type).",Warning:"Base class for warning categories.",WindowsError:"Base class for I/O related errors.",ZeroDivisionError:"Second argument to a division or modulo operation was zero.",__debug__:"bool(x) -> bool\n\nReturns True when the argument x is true, False otherwise.\nThe builtins True and False are the only two instances of the class bool.\nThe class bool is a subclass of the class int, and cannot be subclassed.",abs:"abs(number) -> number\n\nReturn the absolute value of the argument.",all:"all(iterable) -> bool\n\nReturn True if bool(x) is True for all values x in the iterable.\nIf the iterable is empty, return True.",any:"any(iterable) -> bool\n\nReturn True if bool(x) is True for any x in the iterable.\nIf the iterable is empty, return False.",ascii:"ascii(object) -> string\n\nAs repr(), return a string containing a printable representation of an\nobject, but escape the non-ASCII characters in the string returned by\nrepr() using \\x, \\u or \\U escapes.  This generates a string similar\nto that returned by repr() in Python 2.",bin:"bin(number) -> string\n\nReturn the binary representation of an integer.\n\n   >>> bin(2796202)\n   '0b1010101010101010101010'\n",bool:"bool(x) -> bool\n\nReturns True when the argument x is true, False otherwise.\nThe builtins True and False are the only two instances of the class bool.\nThe class bool is a subclass of the class int, and cannot be subclassed.",bytearray:"bytearray(iterable_of_ints) -> bytearray\nbytearray(string, encoding[, errors]) -> bytearray\nbytearray(bytes_or_buffer) -> mutable copy of bytes_or_buffer\nbytearray(int) -> bytes array of size given by the parameter initialized with null bytes\nbytearray() -> empty bytes array\n\nConstruct an mutable bytearray object from:\n  - an iterable yielding integers in range(256)\n  - a text string encoded using the specified encoding\n  - a bytes or a buffer object\n  - any object implementing the buffer API.\n  - an integer",bytes:"bytes(iterable_of_ints) -> bytes\nbytes(string, encoding[, errors]) -> bytes\nbytes(bytes_or_buffer) -> immutable copy of bytes_or_buffer\nbytes(int) -> bytes object of size given by the parameter initialized with null bytes\nbytes() -> empty bytes object\n\nConstruct an immutable array of bytes from:\n  - an iterable yielding integers in range(256)\n  - a text string encoded using the specified encoding\n  - any object implementing the buffer API.\n  - an integer",callable:"callable(object) -> bool\n\nReturn whether the object is callable (i.e., some kind of function).\nNote that classes are callable, as are instances of classes with a\n__call__() method.",chr:"chr(i) -> Unicode character\n\nReturn a Unicode string of one character with ordinal i; 0 <= i <= 0x10ffff.",classmethod:"classmethod(function) -> method\n\nConvert a function to be a class method.\n\nA class method receives the class as implicit first argument,\njust like an instance method receives the instance.\nTo declare a class method, use this idiom:\n\n  class C:\n      def f(cls, arg1, arg2, ...): ...\n      f = classmethod(f)\n\nIt can be called either on the class (e.g. C.f()) or on an instance\n(e.g. C().f()).  The instance is ignored except for its class.\nIf a class method is called for a derived class, the derived class\nobject is passed as the implied first argument.\n\nClass methods are different than C++ or Java static methods.\nIf you want those, see the staticmethod builtin.",compile:"compile(source, filename, mode[, flags[, dont_inherit]]) -> code object\n\nCompile the source (a Python module, statement or expression)\ninto a code object that can be executed by exec() or eval().\nThe filename will be used for run-time error messages.\nThe mode must be 'exec' to compile a module, 'single' to compile a\nsingle (interactive) statement, or 'eval' to compile an expression.\nThe flags argument, if present, controls which future statements influence\nthe compilation of the code.\nThe dont_inherit argument, if non-zero, stops the compilation inheriting\nthe effects of any future statements in effect in the code calling\ncompile; if absent or zero these statements do influence the compilation,\nin addition to any features explicitly specified.",complex:"complex(real[, imag]) -> complex number\n\nCreate a complex number from a real part and an optional imaginary part.\nThis is equivalent to (real + imag*1j) where imag defaults to 0.",copyright:"interactive prompt objects for printing the license text, a list of\n    contributors and the copyright notice.",credits:"interactive prompt objects for printing the license text, a list of\n    contributors and the copyright notice.",delattr:"delattr(object, name)\n\nDelete a named attribute on an object; delattr(x, 'y') is equivalent to\n``del x.y''.",dict:"dict() -> new empty dictionary\ndict(mapping) -> new dictionary initialized from a mapping object's\n    (key, value) pairs\ndict(iterable) -> new dictionary initialized as if via:\n    d = {}\n    for k, v in iterable:\n        d[k] = v\ndict(**kwargs) -> new dictionary initialized with the name=value pairs\n    in the keyword argument list.  For example:  dict(one=1, two=2)",dir:"dir([object]) -> list of strings\n\nIf called without an argument, return the names in the current scope.\nElse, return an alphabetized list of names comprising (some of) the attributes\nof the given object, and of attributes reachable from it.\nIf the object supplies a method named __dir__, it will be used; otherwise\nthe default dir() logic is used and returns:\n  for a module object: the module's attributes.\n  for a class object:  its attributes, and recursively the attributes\n    of its bases.\n  for any other object: its attributes, its class's attributes, and\n    recursively the attributes of its class's base classes.",divmod:"divmod(x, y) -> (div, mod)\n\nReturn the tuple ((x-x%y)/y, x%y).  Invariant: div*y + mod == x.",enumerate:"enumerate(iterable[, start]) -> iterator for index, value of iterable\n\nReturn an enumerate object.  iterable must be another object that supports\niteration.  The enumerate object yields pairs containing a count (from\nstart, which defaults to zero) and a value yielded by the iterable argument.\nenumerate is useful for obtaining an indexed list:\n    (0, seq[0]), (1, seq[1]), (2, seq[2]), ...",eval:"eval(source[, globals[, locals]]) -> value\n\nEvaluate the source in the C of globals and locals.\nThe source may be a string representing a Python expression\nor a code object as returned by compile().\nThe globals must be a dictionary and locals can be any mapping,\ndefaulting to the current globals and locals.\nIf only globals is given, locals defaults to it.\n",exec:"exec(object[, globals[, locals]])\n\nRead and execute code from an object, which can be a string or a code\nobject.\nThe globals and locals are dictionaries, defaulting to the current\nglobals and locals.  If only globals is given, locals defaults to it.",exit:"",filter:"filter(function or None, iterable) --> filter object\n\nReturn an iterator yielding those items of iterable for which function(item)\nis true. If function is None, return the items that are true.",float:"float(x) -> floating point number\n\nConvert a string or number to a floating point number, if possible.",format:"format(value[, format_spec]) -> string\n\nReturns value.__format__(format_spec)\nformat_spec defaults to \"\"",frozenset:"frozenset() -> empty frozenset object\nfrozenset(iterable) -> frozenset object\n\nBuild an immutable unordered collection of unique elements.",getattr:"getattr(object, name[, default]) -> value\n\nGet a named attribute from an object; getattr(x, 'y') is equivalent to x.y.\nWhen a default argument is given, it is returned when the attribute doesn't\nexist; without it, an exception is raised in that case.",globals:"globals() -> dictionary\n\nReturn the dictionary containing the current scope's global variables.",hasattr:"hasattr(object, name) -> bool\n\nReturn whether the object has an attribute with the given name.\n(This is done by calling getattr(object, name) and catching AttributeError.)",hash:"hash(object) -> integer\n\nReturn a hash value for the object.  Two objects with the same value have\nthe same hash value.  The reverse is not necessarily true, but likely.",help:"Define the builtin 'help'.\n\n    This is a wrapper around pydoc.help that provides a helpful message\n    when 'help' is typed at the Python interactive prompt.\n\n    Calling help() at the Python prompt starts an interactive help session.\n    Calling help(thing) prints help for the python object 'thing'.\n    ",hex:"hex(number) -> string\n\nReturn the hexadecimal representation of an integer.\n\n   >>> hex(3735928559)\n   '0xdeadbeef'\n",id:"id(object) -> integer\n\nReturn the identity of an object.  This is guaranteed to be unique among\nsimultaneously existing objects.  (Hint: it's the object's memory address.)",input:"input([prompt]) -> string\n\nRead a string from standard input.  The trailing newline is stripped.\nIf the user hits EOF (Unix: Ctl-D, Windows: Ctl-Z+Return), raise EOFError.\nOn Unix, GNU readline is used if enabled.  The prompt string, if given,\nis printed without a trailing newline before reading.",int:"int(x=0) -> integer\nint(x, base=10) -> integer\n\nConvert a number or string to an integer, or return 0 if no arguments\nare given.  If x is a number, return x.__int__().  For floating point\nnumbers, this truncates towards zero.\n\nIf x is not a number or if base is given, then x must be a string,\nbytes, or bytearray instance representing an integer literal in the\ngiven base.  The literal can be preceded by '+' or '-' and be surrounded\nby whitespace.  The base defaults to 10.  Valid bases are 0 and 2-36.\nBase 0 means to interpret the base from the string as an integer literal.\n>>> int('0b100', base=0)\n4",isinstance:"isinstance(object, class-or-type-or-tuple) -> bool\n\nReturn whether an object is an instance of a class or of a subclass thereof.\nWith a type as second argument, return whether that is the object's type.\nThe form using a tuple, isinstance(x, (A, B, ...)), is a shortcut for\nisinstance(x, A) or isinstance(x, B) or ... (etc.).",issubclass:"issubclass(C, B) -> bool\n\nReturn whether class C is a subclass (i.e., a derived class) of class B.\nWhen using a tuple as the second argument issubclass(X, (A, B, ...)),\nis a shortcut for issubclass(X, A) or issubclass(X, B) or ... (etc.).",iter:"iter(iterable) -> iterator\niter(callable, sentinel) -> iterator\n\nGet an iterator from an object.  In the first form, the argument must\nsupply its own iterator, or be a sequence.\nIn the second form, the callable is called until it returns the sentinel.",len:"len(object)\n\nReturn the number of items of a sequence or collection.",license:"interactive prompt objects for printing the license text, a list of\n    contributors and the copyright notice.",list:"list() -> new empty list\nlist(iterable) -> new list initialized from iterable's items",locals:"locals() -> dictionary\n\nUpdate and return a dictionary containing the current scope's local variables.",map:"map(func, *iterables) --> map object\n\nMake an iterator that computes the function using arguments from\neach of the iterables.  Stops when the shortest iterable is exhausted.",max:"max(iterable, *[, default=obj, key=func]) -> value\nmax(arg1, arg2, *args, *[, key=func]) -> value\n\nWith a single iterable argument, return its biggest item. The\ndefault keyword-only argument specifies an object to return if\nthe provided iterable is empty.\nWith two or more arguments, return the largest argument.",memoryview:"memoryview(object)\n\nCreate a new memoryview object which references the given object.",min:"min(iterable, *[, default=obj, key=func]) -> value\nmin(arg1, arg2, *args, *[, key=func]) -> value\n\nWith a single iterable argument, return its smallest item. The\ndefault keyword-only argument specifies an object to return if\nthe provided iterable is empty.\nWith two or more arguments, return the smallest argument.",next:"next(iterator[, default])\n\nReturn the next item from the iterator. If default is given and the iterator\nis exhausted, it is returned instead of raising StopIteration.",object:"The most base type",oct:"oct(number) -> string\n\nReturn the octal representation of an integer.\n\n   >>> oct(342391)\n   '0o1234567'\n",open:"open(file, mode='r', buffering=-1, encoding=None,\n     errors=None, newline=None, closefd=True, opener=None) -> file object\n\nOpen file and return a stream.  Raise IOError upon failure.\n\nfile is either a text or byte string giving the name (and the path\nif the file isn't in the current working directory) of the file to\nbe opened or an integer file descriptor of the file to be\nwrapped. (If a file descriptor is given, it is closed when the\nreturned I/O object is closed, unless closefd is set to False.)\n\nmode is an optional string that specifies the mode in which the file\nis opened. It defaults to 'r' which means open for reading in text\nmode.  Other common values are 'w' for writing (truncating the file if\nit already exists), 'x' for creating and writing to a new file, and\n'a' for appending (which on some Unix systems, means that all writes\nappend to the end of the file regardless of the current seek position).\nIn text mode, if encoding is not specified the encoding used is platform\ndependent: locale.getpreferredencoding(False) is called to get the\ncurrent locale encoding. (For reading and writing raw bytes use binary\nmode and leave encoding unspecified.) The available modes are:\n\n========= ===============================================================\nCharacter Meaning\n--------- ---------------------------------------------------------------\n'r'       open for reading (default)\n'w'       open for writing, truncating the file first\n'x'       create a new file and open it for writing\n'a'       open for writing, appending to the end of the file if it exists\n'b'       binary mode\n't'       text mode (default)\n'+'       open a disk file for updating (reading and writing)\n'U'       universal newline mode (deprecated)\n========= ===============================================================\n\nThe default mode is 'rt' (open for reading text). For binary random\naccess, the mode 'w+b' opens and truncates the file to 0 bytes, while\n'r+b' opens the file without truncation. The 'x' mode implies 'w' and\nraises an `FileExistsError` if the file already exists.\n\nPython distinguishes between files opened in binary and text modes,\neven when the underlying operating system doesn't. Files opened in\nbinary mode (appending 'b' to the mode argument) return contents as\nbytes objects without any decoding. In text mode (the default, or when\n't' is appended to the mode argument), the contents of the file are\nreturned as strings, the bytes having been first decoded using a\nplatform-dependent encoding or using the specified encoding if given.\n\n'U' mode is deprecated and will raise an exception in future versions\nof Python.  It has no effect in Python 3.  Use newline to control\nuniversal newlines mode.\n\nbuffering is an optional integer used to set the buffering policy.\nPass 0 to switch buffering off (only allowed in binary mode), 1 to select\nline buffering (only usable in text mode), and an integer > 1 to indicate\nthe size of a fixed-size chunk buffer.  When no buffering argument is\ngiven, the default buffering policy works as follows:\n\n* Binary files are buffered in fixed-size chunks; the size of the buffer\n  is chosen using a heuristic trying to determine the underlying device's\n  \"block size\" and falling back on `io.DEFAULT_BUFFER_SIZE`.\n  On many systems, the buffer will typically be 4096 or 8192 bytes long.\n\n* \"Interactive\" text files (files for which isatty() returns True)\n  use line buffering.  Other text files use the policy described above\n  for binary files.\n\nencoding is the name of the encoding used to decode or encode the\nfile. This should only be used in text mode. The default encoding is\nplatform dependent, but any encoding supported by Python can be\npassed.  See the codecs module for the list of supported encodings.\n\nerrors is an optional string that specifies how encoding errors are to\nbe handled---this argument should not be used in binary mode. Pass\n'strict' to raise a ValueError exception if there is an encoding error\n(the default of None has the same effect), or pass 'ignore' to ignore\nerrors. (Note that ignoring encoding errors can lead to data loss.)\nSee the documentation for codecs.register or run 'help(codecs.Codec)'\nfor a list of the permitted encoding error strings.\n\nnewline controls how universal newlines works (it only applies to text\nmode). It can be None, '', '\\n', '\\r', and '\\r\\n'.  It works as\nfollows:\n\n* On input, if newline is None, universal newlines mode is\n  enabled. Lines in the input can end in '\\n', '\\r', or '\\r\\n', and\n  these are translated into '\\n' before being returned to the\n  caller. If it is '', universal newline mode is enabled, but line\n  endings are returned to the caller untranslated. If it has any of\n  the other legal values, input lines are only terminated by the given\n  string, and the line ending is returned to the caller untranslated.\n\n* On output, if newline is None, any '\\n' characters written are\n  translated to the system default line separator, os.linesep. If\n  newline is '' or '\\n', no translation takes place. If newline is any\n  of the other legal values, any '\\n' characters written are translated\n  to the given string.\n\nIf closefd is False, the underlying file descriptor will be kept open\nwhen the file is closed. This does not work when a file name is given\nand must be True in that case.\n\nA custom opener can be used by passing a callable as *opener*. The\nunderlying file descriptor for the file object is then obtained by\ncalling *opener* with (*file*, *flags*). *opener* must return an open\nfile descriptor (passing os.open as *opener* results in functionality\nsimilar to passing None).\n\nopen() returns a file object whose type depends on the mode, and\nthrough which the standard file operations such as reading and writing\nare performed. When open() is used to open a file in a text mode ('w',\n'r', 'wt', 'rt', etc.), it returns a TextIOWrapper. When used to open\na file in a binary mode, the returned class varies: in read binary\nmode, it returns a BufferedReader; in write binary and append binary\nmodes, it returns a BufferedWriter, and in read/write mode, it returns\na BufferedRandom.\n\nIt is also possible to use a string or bytearray as a file for both\nreading and writing. For strings StringIO can be used like a file\nopened in a text mode, and for bytes a BytesIO can be used like a file\nopened in a binary mode.\n",ord:"ord(c) -> integer\n\nReturn the integer ordinal of a one-character string.",pow:"pow(x, y[, z]) -> number\n\nWith two arguments, equivalent to x**y.  With three arguments,\nequivalent to (x**y) % z, but may be more efficient (e.g. for ints).",print:"print(value, ..., sep=' ', end='\\n', file=sys.stdout, flush=False)\n\nPrints the values to a stream, or to sys.stdout by default.\nOptional keyword arguments:\nfile:  a file-like object (stream); defaults to the current sys.stdout.\nsep:   string inserted between values, default a space.\nend:   string appended after the last value, default a newline.\nflush: whether to forcibly flush the stream.",property:"property(fget=None, fset=None, fdel=None, doc=None) -> property attribute\n\nfget is a function to be used for getting an attribute value, and likewise\nfset is a function for setting, and fdel a function for del'ing, an\nattribute.  Typical use is to define a managed attribute x:\n\nclass C(object):\n    def getx(self): return self._x\n    def setx(self, value): self._x = value\n    def delx(self): del self._x\n    x = property(getx, setx, delx, \"I'm the 'x' property.\")\n\nDecorators make defining new properties or modifying existing ones easy:\n\nclass C(object):\n    @property\n    def x(self):\n        \"I am the 'x' property.\"\n        return self._x\n    @x.setter\n    def x(self, value):\n        self._x = value\n    @x.deleter\n    def x(self):\n        del self._x\n",quit:"",range:"range(stop) -> range object\nrange(start, stop[, step]) -> range object\n\nReturn a virtual sequence of numbers from start to stop by step.",repr:"repr(object) -> string\n\nReturn the canonical string representation of the object.\nFor most object types, eval(repr(object)) == object.",reversed:"reversed(sequence) -> reverse iterator over values of the sequence\n\nReturn a reverse iterator",round:"round(number[, ndigits]) -> number\n\nRound a number to a given precision in decimal digits (default 0 digits).\nThis returns an int when called with one argument, otherwise the\nsame type as the number. ndigits may be negative.",set:"set() -> new empty set object\nset(iterable) -> new set object\n\nBuild an unordered collection of unique elements.",setattr:"setattr(object, name, value)\n\nSet a named attribute on an object; setattr(x, 'y', v) is equivalent to\n``x.y = v''.",slice:"slice(stop)\nslice(start, stop[, step])\n\nCreate a slice object.  This is used for extended slicing (e.g. a[0:10:2]).",sorted:"sorted(iterable, key=None, reverse=False) --> new sorted list",staticmethod:"staticmethod(function) -> method\n\nConvert a function to be a static method.\n\nA static method does not receive an implicit first argument.\nTo declare a static method, use this idiom:\n\n     class C:\n     def f(arg1, arg2, ...): ...\n     f = staticmethod(f)\n\nIt can be called either on the class (e.g. C.f()) or on an instance\n(e.g. C().f()).  The instance is ignored except for its class.\n\nStatic methods in Python are similar to those found in Java or C++.\nFor a more advanced concept, see the classmethod builtin.",str:"str(object='') -> str\nstr(bytes_or_buffer[, encoding[, errors]]) -> str\n\nCreate a new string object from the given object. If encoding or\nerrors is specified, then the object must expose a data buffer\nthat will be decoded using the given encoding and error handler.\nOtherwise, returns the result of object.__str__() (if defined)\nor repr(object).\nencoding defaults to sys.getdefaultencoding().\nerrors defaults to 'strict'.",sum:"sum(iterable[, start]) -> value\n\nReturn the sum of an iterable of numbers (NOT strings) plus the value\nof parameter 'start' (which defaults to 0).  When the iterable is\nempty, return start.",super:"super() -> same as super(__class__, <first argument>)\nsuper(type) -> unbound super object\nsuper(type, obj) -> bound super object; requires isinstance(obj, type)\nsuper(type, type2) -> bound super object; requires issubclass(type2, type)\nTypical use to call a cooperative superclass method:\nclass C(B):\n    def meth(self, arg):\n        super().meth(arg)\nThis works for class methods too:\nclass C(B):\n    @classmethod\n    def cmeth(cls, arg):\n        super().cmeth(arg)\n",tuple:"tuple() -> empty tuple\ntuple(iterable) -> tuple initialized from iterable's items\n\nIf the argument is a tuple, the return value is the same object.",type:"type(object_or_name, bases, dict)\ntype(object) -> the object's type\ntype(name, bases, dict) -> a new type",vars:"vars([object]) -> dictionary\n\nWithout arguments, equivalent to locals().\nWith an argument, equivalent to object.__dict__.",zip:"zip(iter1 [,iter2 [...]]) --> zip object\n\nReturn a zip object whose .__next__() method returns a tuple where\nthe i-th element comes from the i-th iterable argument.  The .__next__()\nmethod continues until the shortest iterable in the argument sequence\nis exhausted and then it raises StopIteration.",}
__BRYTHON__.builtins_doc=docs
;
;(function($B){var _b_=$B.builtins
var coroutine=$B.coroutine=$B.make_class("coroutine")
coroutine.close=function(self){}
coroutine.send=function(self){return self.$func.apply(null,self.$args)}
coroutine.__repr__=coroutine.__str__=function(self){if(self.$func.$infos){return "<coroutine "+self.$func.$infos.__name__+">"}else{return "<coroutine object>"}}
$B.set_func_names(coroutine,"builtins")
$B.make_async=func=>{
if(func.$is_genfunc){return func}
var f=function(){var args=arguments,stack=$B.deep_copy($B.frames_stack)
return{
__class__:coroutine,$args:args,$func:func,$stack:stack}}
f.$infos=func.$infos
return f}
$B.promise=function(obj){if(obj.__class__===coroutine){return coroutine.send(obj)}
if(typeof obj=="function"){return obj()}
return obj}})(__BRYTHON__)
;
