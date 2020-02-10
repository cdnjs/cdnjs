// brython.js brython.info
// version [3, 8, 0, 'final', 0]
// implementation [3, 8, 6, 'final', 0]
// version compiled from commented, indented source files at
// github.com/brython-dev/brython
var __BRYTHON__=__BRYTHON__ ||{}
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
$B.$py_next_hash=Math.pow(2,53)-1
$B.$py_UUID=0
$B.lambda_magic=Math.random().toString(36).substr(2,8)
$B.set_func_names=function(klass,module){if(klass.$infos){var name=klass.$infos.__name__
klass.$infos.__module__=module
klass.$infos.__qualname__=name}else{var name=klass.__name__
console.log("bizarre",klass)
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
__BRYTHON__.implementation=[3,8,6,'final',0]
__BRYTHON__.__MAGIC__="3.8.6"
__BRYTHON__.version_info=[3,8,0,'final',0]
__BRYTHON__.compiled_date="2019-12-16 11:53:55.463871"
__BRYTHON__.timestamp=1576493635463
__BRYTHON__.builtin_module_names=["_aio","_ajax","_base64","_binascii","_jsre","_locale","_multiprocessing","_posixsubprocess","_profile","_sre_utils","_string","_strptime","_svg","_warnings","_webcomponent","_webworker","_zlib_utils","array","builtins","dis","hashlib","long_int","marshal","math","math1","math_kozh","modulefinder","posix","random","unicodedata"]
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
$B.last=function(table){return table[table.length-1]}
$B.list2obj=function(list,value){var res={},i=list.length
if(value===undefined){value=true}
while(i--> 0){res[list[i]]=value}
return res}
$B.op2method={operations:{"**":"pow","//":"floordiv","<<":"lshift",">>":"rshift","+":"add","-":"sub","*":"mul","/":"truediv","%":"mod","@":"matmul" },augmented_assigns:{"//=":"ifloordiv",">>=":"irshift","<<=":"ilshift","**=":"ipow","+=":"iadd","-=":"isub","*=":"imul","/=":"itruediv","%=":"imod","&=":"iand","|=":"ior","^=":"ixor","@=":"imatmul"},binary:{"&":"and","|":"or","~":"invert","^":"xor"},comparisons:{"<":"lt",">":"gt","<=":"le",">=":"ge","==":"eq","!=":"ne"},boolean:{"or":"or","and":"and","in":"in","not":"not","is":"is","not_in":"not_in","is_not":"is_not" },subset:function(){var res={},keys=[]
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
var pos=get_rank_in_parent(replace_what)
parent.children[pos]=replace_with
replace_with.parent=parent
replace_with.bindings=replace_what.bindings}
var get_rank_in_parent=$B.parser.get_rank_in_parent=function(node){return node.parent.children.indexOf(node)}
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
var $add_yield_from_code=$B.parser.$add_yield_from_code=function(yield_ctx){var pnode=$get_node(yield_ctx)
var generator=$get_scope(yield_ctx).C.tree[0]
pnode.yield_atoms.splice(pnode.yield_atoms.indexOf(this),1)
generator.yields.splice(generator.yields.indexOf(this),1)
var INDENT=" ".repeat(pnode.indent)
var replace_with=
INDENT+"import sys"+"\n"+
INDENT+"try:"+"\n"+
INDENT+"    _y = next(_i)"+"\n"+
INDENT+"except StopIteration as _e:"+"\n"+
INDENT+"    _r = _e.value"+"\n"+
INDENT+"else:"+"\n"+
INDENT+"    while 1:"+"\n"+
INDENT+"        try:"+"\n"+
INDENT+"            _s = yield _y"+"\n"+
INDENT+"        except GeneratorExit as _e:"+"\n"+
INDENT+"            try:"+"\n"+
INDENT+"                _m = _i.close"+"\n"+
INDENT+"            except AttributeError:"+"\n"+
INDENT+"                pass"+"\n"+
INDENT+"            else:"+"\n"+
INDENT+"                _m()"+"\n"+
INDENT+"            raise _e"+"\n"+
INDENT+"        except BaseException as _e:"+"\n"+
INDENT+"            _x = sys.exc_info()"+"\n"+
INDENT+"            try:"+"\n"+
INDENT+"                _m = _i.throw"+"\n"+
INDENT+"            except AttributeError:"+"\n"+
INDENT+"                raise _e"+"\n"+
INDENT+"            else:"+"\n"+
INDENT+"                try:"+"\n"+
INDENT+"                    _y = _m(*_x)"+"\n"+
INDENT+"                except StopIteration as _e:"+"\n"+
INDENT+"                    _r = _e.value"+"\n"+
INDENT+"                    break"+"\n"+
INDENT+"        else:"+"\n"+
INDENT+"            try:"+"\n"+
INDENT+"                if _s is None:"+"\n"+
INDENT+"                    _y = next(_i)"+"\n"+
INDENT+"                else:"+"\n"+
INDENT+"                    _y = _i.send(_s)"+"\n"+
INDENT+"            except StopIteration as _e:"+"\n"+
INDENT+"                _r = _e.value"+"\n"+
INDENT+"                break"+"\n";
var repl={_i :create_temp_name('__i'),_y :create_temp_name('__y'),_r :create_temp_name('__r'),_e :create_temp_name('__e'),_s :create_temp_name('__s'),_m :create_temp_name('__m'),}
pnode.bindings=pnode.bindings ||{}
for(attr in repl){replace_with=replace_with.replace(new RegExp("\\b"+attr+"\\b",'g'),repl[attr])
pnode.bindings[repl[attr]]=true}
$tokenize(pnode,replace_with)
var params={iter_name:repl._i,result_var_name:repl._r,yield_expr:yield_ctx,}
if(yield_ctx.parent.type==='assign'){params.save_result=true
params.assign_ctx=yield_ctx.parent
params.save_result_rank=pnode.parent.children.length-
pnode.parent.children.indexOf(pnode)}
var new_node=new $YieldFromMarkerNode(params)
replace_node(pnode,new_node)}
var chained_comp_num=0
var $_SyntaxError=$B.parser.$_SyntaxError=function(C,msg,indent){
var ctx_node=C
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node,root=tree_node
while(root.parent !==undefined){root=root.parent}
var module=tree_node.module,src=root.src,line_num=tree_node.line_num
if(src){line_num=src.substr(0,$pos).split("\n").length}
if(root.line_info){line_num=root.line_info}
if(indent !==undefined){line_num++}
if(indent===undefined){if(Array.isArray(msg)){$B.$SyntaxError(module,msg[0],src,$pos,line_num)}
if(msg==="Triple string end not found"){
$B.$SyntaxError(module,'invalid syntax : triple string end not found',src,$pos,line_num,root)}
$B.$SyntaxError(module,'invalid syntax',src,$pos,line_num,root)}else{throw $B.$IndentationError(module,msg,src,$pos,line_num,root)}}
function check_assignment(C){var ctx=C,forbidden=['assert','del','import','raise','return']
while(ctx){if(forbidden.indexOf(ctx.type)>-1){$_SyntaxError(C,'invalid syntax - assign')}
ctx=ctx.parent}}
var $Node=$B.parser.$Node=function(type){this.type=type
this.children=[]
this.yield_atoms=[]
this.add=function(child){
this.children[this.children.length]=child
child.parent=this
child.module=this.module}
this.insert=function(pos,child){
this.children.splice(pos,0,child)
child.parent=this
child.module=this.module}
this.toString=function(){return "<object 'Node'>"}
this.show=function(indent){
var res=''
if(this.type==='module'){this.children.forEach(function(child){res+=child.show(indent)})
return res}
indent=indent ||0
res+=' '.repeat(indent)
res+=this.C
if(this.children.length > 0){res+='{'}
res+='\n'
this.children.forEach(function(child){res+='['+i+'] '+child.show(indent+4)})
if(this.children.length > 0){res+=' '.repeat(indent)
res+='}\n'}
return res}
this.to_js=function(indent){
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
this.transform=function(rank){
if(this.yield_atoms.length > 0){
this.parent.children.splice(rank,1)
var offset=0
this.yield_atoms.forEach(function(atom){
var temp_node=new $Node()
var js='var $yield_value'+$loop_num
js+=' = '+(atom.to_js()||'None')
new $NodeJSCtx(temp_node,js)
this.parent.insert(rank+offset,temp_node)
var yield_node=new $Node()
this.parent.insert(rank+offset+1,yield_node)
var yield_expr=new $YieldCtx(new $NodeCtx(yield_node))
new $StringCtx(yield_expr,'$yield_value'+$loop_num)
var set_yield=new $Node()
set_yield.is_set_yield_value=true
set_yield.after_yield=true
js=$loop_num
new $NodeJSCtx(set_yield,js)
this.parent.insert(rank+offset+2,set_yield)
atom.to_js=(function(x){return function(){return '$yield_value'+x}})($loop_num)
$loop_num++
offset+=3},this)
this.parent.insert(rank+offset,this)
this.yield_atoms=[]
return offset}
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
if(this.C && this.C.tree !==undefined &&
this.C.tree[0].type=="generator"){var def_node=this,def_ctx=def_node.C.tree[0]
var blocks=[],node=def_node.parent_block,is_comp=node.is_comp
while(true){var node_id=node.id.replace(/\./g,'_'),block='"$locals_'+node_id+'": '
if(is_comp){block+='$B.clone($locals_'+node_id+')'}else{block+='$locals_'+node_id}
blocks.push(block)
node=node.parent_block
if(node===undefined ||node.id=='__builtins__'){break}}
blocks='{'+blocks+'}'
var parent=this.parent
while(parent !==undefined && parent.id===undefined){parent=parent.parent}
var g=$B.$BRgenerator(def_ctx.name,blocks,def_ctx.id,def_node),block_id=parent.id.replace(/\./g,'_'),name=def_ctx.decorated ? def_ctx.alias :
def_ctx.name+def_ctx.num,res='var '+def_ctx.name+def_ctx.num+' = '+
'$locals_'+block_id+'["'+def_ctx.name+
'"] = $B.genfunc("'+
def_ctx.name+'", '+blocks+',['+g+'],'+
def_ctx.default_str+')'
var new_node=$NodeJS(res)
new_node.bindings=this.bindings
this.parent.children.splice(rank,1)
this.parent.insert(rank+offset-1,new_node)}
return ctx_offset}}
this.clone=function(){var res=new $Node(this.type)
for(var attr in this){res[attr]=this[attr]}
return res}}
var $YieldFromMarkerNode=$B.parser.$YieldFromMarkerNode=function(params){$Node.apply(this,['marker'])
new $NodeCtx(this)
this.params=params
this.tree
this.transform=function(rank){add_identnode(this.parent,rank,params.iter_name,new $JSCode('$B.$iter('+params.yield_expr.tree[0].to_js()+
')')
)
if(params.save_result){var assign_ctx=params.assign_ctx
assign_ctx.tree.pop()
var expr_ctx=new $ExprCtx(assign_ctx,'id',true)
var idctx=new $IdCtx(expr_ctx,params.result_var_name)
assign_ctx.tree[1]=expr_ctx
var node=new $Node()
node.C=assign_ctx
assign_ctx.node=node
var new_rank=params.save_result_rank+rank+1
this.parent.insert(new_rank,node)
assign_ctx.transform(node,new_rank)}
return 2}}
var $MarkerNode=$B.parser.$MarkerNode=function(name){$Node.apply(this,['marker'])
new $NodeCtx(this)
this._name=name
this.transform=function(rank){return 1}
this.to_js=function(){return ''}}
var $AbstractExprCtx=$B.parser.$AbstractExprCtx=function(C,with_commas){this.type='abstract_expr'
this.with_commas=with_commas
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(abstract_expr '+with_commas+') '+this.tree}
this.to_js=function(){this.js_processed=true
if(this.type==='list')return '['+$to_js(this.tree)+']'
return $to_js(this.tree)}}
var $AliasCtx=$B.parser.$AliasCtx=function(C){
this.type='ctx_manager_alias'
this.parent=C
this.tree=[]
C.tree[C.tree.length-1].alias=this}
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
scope.binding[name]=true}}
this.toString=function(){return '(annotation) '+this.tree}
this.to_js=function(){return $to_js(this.tree)}}
var $AssertCtx=$B.parser.$AssertCtx=function(C){
this.type='assert'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(assert) '+this.tree}
this.transform=function(node,rank){if(this.tree[0].type=='list_or_tuple'){
var condition=this.tree[0].tree[0]
var message=this.tree[0].tree[1]}else{var condition=this.tree[0]
var message=null}
var new_ctx=new $ConditionCtx(node.C,'if')
var not_ctx=new $NotCtx(new_ctx)
not_ctx.tree=[condition]
node.C=new_ctx
var new_node=new $Node()
var js='throw AssertionError.$factory("AssertionError")'
if(message !==null){js='throw AssertionError.$factory(str.$factory('+
message.to_js()+'))'}
new $NodeJSCtx(new_node,js)
node.add(new_node)}}
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
if(C.type=='expr' && C.tree[0].type=='call'){$_SyntaxError(C,["can't assign to function call "])}else if(C.type=='list_or_tuple' ||
(C.type=='expr' && C.tree[0].type=='list_or_tuple')){if(C.type=='expr'){C=C.tree[0]}
C.bind_ids(scope)}else if(C.type=='assign'){C.tree.forEach(function(elt){var assigned=elt.tree[0]
if(assigned.type=='id'){$bind(assigned.value,scope,this)}},this)}else{var assigned=C.tree[0]
if(assigned && assigned.type=='id'){if(noassign[assigned.value]===true){$_SyntaxError(C,["can't assign to keyword"])}
assigned.bound=true
if(!scope.globals ||!scope.globals.has(assigned.value)){
var node=$get_node(this)
node.bound_before=Object.keys(scope.binding)
$bind(assigned.value,scope,this)}else{
var module=$get_module(C)
$bind(assigned.value,module,this)}}else if(["str","int","float","complex"].indexOf(assigned.type)>-1){$_SyntaxError(C,["can't assign to literal"])}else if(assigned.type=="unary"){$_SyntaxError(C,["can't assign to operator"])}}
this.guess_type=function(){return}
this.toString=function(){return '(assign) '+this.tree[0]+'='+this.tree[1]}
this.transform=function(node,rank){
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
assigned.forEach(function(elt){var new_node=new $Node(),node_ctx=new $NodeCtx(new_node)
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
'throw ValueError.$factory('+
'"need more than " +'+rlname+
'.length + " value" + ('+rlname+
'.length > 1 ?'+' "s" : "") + " to unpack")}'
)
)
if(packed==null){node.parent.insert(rank++,$NodeJS('if('+rlname+'.length>'+min_length+'){'+
'throw ValueError.$factory('+
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
var assign=new $AssignCtx(left_item,false)
var js=rlname
if(packed==null ||i < packed){js+='['+i+']'}else if(i==packed){js+='.slice('+i+','+rlname+'.length-'+
(left_items.length-i-1)+')'}else{js+='['+rlname+'.length-'+(left_items.length-i)+']'}
assign.tree[1]=new $JSCode(js)})
$loop_num++}}
this.to_js=function(){this.js_processed=true
if(this.parent.type=='call'){
return '{$nat:"kw",name:'+this.tree[0].to_js()+
',value:'+this.tree[1].to_js()+'}'}
var left=this.tree[0]
while(left.type=='expr'){left=left.tree[0]}
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
return res+','+rvar+');None;'}
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
','+left.tree[0].to_js()+','+right_js+')};None;'}else{left.func='setitem' 
res+=left.to_js()
res=res.substr(0,res.length-1)
left.func='getitem' 
res+=','+right_js+')};None;'}
return res}}
return left.to_js()+' = '+right.to_js()}}
var $AsyncCtx=$B.parser.$AsyncCtx=function(C){
this.type='async'
this.parent=C
C.async=true
this.toString=function(){return '(async)'}}
var $AttrCtx=$B.parser.$AttrCtx=function(C){
this.type='attribute'
this.value=C.tree[0]
this.parent=C
C.tree.pop()
C.tree[C.tree.length]=this
this.tree=[]
this.func='getattr' 
this.toString=function(){return '(attr) '+this.value+'.'+this.name}
this.to_js=function(){this.js_processed=true
var js=this.value.to_js()
if(this.func=="setattr" && this.value.type=="id"){var scope=$get_scope(this),parent=scope.parent
if(scope.ntype=="def"){if(parent.ntype=="class"){var params=scope.C.tree[0].positional_list
if(this.value.value==params[0]&& parent.C &&
parent.C.tree[0].args===undefined){
this.assign_self=true
return[js+".__class__ && "+js+".__dict__ && !"+
js+".__class__.$has_setattr && ! "+js+
".$is_class ? "+js+
".__dict__.$string_dict['"+this.name+
"'] = "," : $B.$setattr("+js+
', "'+this.name+'", ']}}}}
if(this.func=='setattr'){
return '$B.$setattr('+js+',"'+this.name+'")'}else{return '$B.$getattr('+js+',"'+this.name+'")'}}}
var $AugmentedAssignCtx=$B.parser.$AugmentedAssignCtx=function(C,op){
check_assignment(C)
this.type='augm_assign'
this.parent=C.parent
C.parent.tree.pop()
C.parent.tree[C.parent.tree.length]=this
this.op=op
this.tree=[C]
var scope=this.scope=$get_scope(this)
if(C.type=='expr'){var assigned=C.tree[0]
if(assigned.type=='id'){var name=assigned.value
if(noassign[name]===true){$_SyntaxError(C,["can't assign to keyword"])}else if((scope.ntype=='def' ||scope.ntype=='generator')&&
(scope.binding[name]===undefined)){if(scope.globals===undefined ||
! scope.globals.has(name)){
assigned.unbound=true}}}else if(['str','int','float','complex'].indexOf(assigned.type)>-1){$_SyntaxError(C,["can't assign to literal"])}}
$get_node(this).bound_before=Object.keys(scope.binding)
this.module=scope.module
this.toString=function(){return '(augm assign) '+this.tree}
this.transform=function(node,rank){var func='__'+$operators[op]+'__',offset=0,parent=node.parent,line_num=node.line_num,lnum_set=false
parent.children.splice(rank,1)
var left_is_id=(this.tree[0].type=='expr' &&
this.tree[0].tree[0].type=='id')
if(left_is_id){var left_bound_to_int=
this.tree[0].tree[0].bindingType(this.scope)=="int"
this.tree[0].tree[0].augm_assign=true
if($B.debug > 0){var check_node=$NodeJS('if('+this.tree[0].to_js()+
' === undefined){throw NameError.$factory("name \'' +
                    this.tree[0].tree[0].value + '\' is not defined")}')
check_node.forced_line_num=node.line_num
node.parent.insert(rank,check_node)
offset++}
var left_id=this.tree[0].tree[0].value,was_bound=this.scope.binding[left_id]!==undefined,left_id_unbound=this.tree[0].tree[0].unbound}
var right_is_int=(this.tree[1].type=='expr' &&
this.tree[1].tree[0].type=='int')
var right=right_is_int ? this.tree[1].tree[0].to_js():'$temp'
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
if(C.tree[0].type=="id"){var binding_scope=C.tree[0].firstBindingScopeId()
if(binding_scope){left="$locals_"+binding_scope.replace(/\./g,'_')+
'["'+C.tree[0].value+'"]'}}
if(left_bound_to_int && right_is_int){parent.insert(rank+offset,$NodeJS(left+" "+op+" "+right))
return offset++}
prefix=prefix && !C.tree[0].unknown_binding && !left_id_unbound
var op1=op.charAt(0)
if(prefix){var left1=in_class ? '$left' :left
var new_node=new $Node()
if(!lnum_set){new_node.line_num=line_num;lnum_set=true}
js=right_is_int ? 'if(' :'if(typeof $temp.valueOf() == "number" && '
js+=left1+'.constructor === Number'
js+=' && Number.isSafeInteger('+left+op1+right+')){'+
(right_is_int ? '(' :'(typeof $temp == "number" && ')+
'typeof '+left1+' == "number") ? '
js+=left+op+right
js+=' : '+left+' = new Number('+left+op1+
(right_is_int ? right :right+'.valueOf()')+')}'
new $NodeJSCtx(new_node,js)
parent.insert(rank+offset,new_node)
offset++}
var aaops={'+=':'add','-=':'sub','*=':'mul'}
if(C.tree[0].type=='sub' &&
('+='==op ||'-='==op ||'*='==op)&&
C.tree[0].tree.length==1){var js1='$B.augm_item_'+aaops[op]+'('+
C.tree[0].value.to_js()+','+
C.tree[0].tree[0].to_js()+','+right+');None;'
var new_node=new $Node()
if(!lnum_set){new_node.line_num=line_num;lnum_set=true}
new $NodeJSCtx(new_node,js1)
parent.insert(rank+offset,new_node)
offset++
return}
var new_node=new $Node()
if(!lnum_set){new_node.line_num=line_num;lnum_set=true}
var js=''
if(prefix){js+='else '}
js+='if(!hasattr('+C.to_js()+',"'+func+'"))'
new $NodeJSCtx(new_node,js)
parent.insert(rank+offset,new_node)
offset++
var aa1=new $Node()
aa1.id=this.scope.id
aa1.line_num=node.line_num
new_node.add(aa1)
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
var else_node=$NodeJS("else")
parent.insert(rank+offset,else_node)
var aa2=new $Node()
aa2.line_num=node.line_num
else_node.add(aa2)
var ctx2=new $NodeCtx(aa2)
var expr2=new $ExprCtx(ctx2,'clone',false)
if(left_id_unbound){new $RawJSCtx(expr2,left)}else{expr2.tree=C.tree
expr2.tree.forEach(function(elt){elt.parent=expr2})}
var assign2=new $AssignCtx(expr2)
assign2.tree.push($NodeJS('$B.$getattr('+C.to_js()+',"'+
func+'")('+right+')'))
expr2.parent.tree.pop()
expr2.parent.tree.push(assign2)
if(left_is_id && !was_bound && !this.scope.blurred){this.scope.binding[left_id]=undefined}
return offset}
this.to_js=function(){return ''}}
var $AwaitCtx=$B.parser.$AwaitCtx=function(C){
this.type='await'
this.parent=C
this.tree=[]
C.tree.push(this)
this.to_js=function(){return 'await $B.promise('+$to_js(this.tree)+')'}}
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
set_loop_context.apply(this,[C,'break'])
this.toString=function(){return 'break '}
this.to_js=function(){this.js_processed=true
var scope=$get_scope(this)
var res=';$locals_'+scope.id.replace(/\./g,'_')+
'["$no_break'+this.loop_ctx.loop_num+'"] = false'
if(this.loop_ctx.type !='asyncfor'){res+=';break'}else{res+=';throw StopIteration.$factory('+
this.loop_ctx.loop_num+')'}
return res}}
var $CallArgCtx=$B.parser.$CallArgCtx=function(C){
this.type='call_arg'
this.parent=C
this.start=$pos
this.tree=[]
C.tree.push(this)
this.expect='id'
this.toString=function(){return 'call_arg '+this.tree}
this.to_js=function(){this.js_processed=true
return $to_js(this.tree)}}
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
this.toString=function(){return '(call) '+this.func+'('+this.tree+')'}
if(this.func && this.func.type=="attribute" && this.func.name=="wait"
&& this.func.value.type=="id" && this.func.value.value=="time"){console.log('call',this.func)
$get_node(this).blocking={'type':'wait','call':this}}
if(this.func && this.func.value=='input'){$get_node(this).blocking={'type':'input'}}
this.to_js=function(){this.js_processed=true
if(this.tree.length > 0){if(this.tree[this.tree.length-1].tree.length==0){
this.tree.pop()}}
var func_js=this.func.to_js()
if(this.func !==undefined){switch(this.func.value){case 'classmethod':
return 'classmethod.$factory('+$to_js(this.tree)+')'
case '$$super':
if(this.tree.length==0){
var scope=$get_scope(this)
if(scope.ntype=='def' ||scope.ntype=='generator'){var def_scope=$get_scope(scope.C.tree[0])
if(def_scope.ntype=='class'){new $IdCtx(this,def_scope.C.tree[0].name)}}}
if(this.tree.length==1){
var scope=$get_scope(this)
if(scope.ntype=='def' ||scope.ntype=='generator'){var args=scope.C.tree[0].args
if(args.length > 0){var missing_id=new $IdCtx(this,args[0])
missing_id.to_js=function(){return "[$locals['"+args[0]+"']]"}}}}
break
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
return default_res}}}
var $ClassCtx=$B.parser.$ClassCtx=function(C){
this.type='class'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.expect='id'
var scope=this.scope=$get_scope(this)
this.parent.node.parent_block=scope
this.parent.node.bound={}
this.parent.node.binding={__annotations__:true}
this.toString=function(){return '(class) '+this.name+' '+this.tree+' args '+this.args}
this.set_name=function(name){this.random=$B.UUID()
this.name=name
this.id=C.node.module+'_'+name+'_'+this.random
this.binding={}
this.parent.node.id=this.id
var parent_block=scope
while(parent_block.C &&
parent_block.C.tree[0].type=='class'){parent_block=parent_block.parent}
while(parent_block.C &&
'def' !=parent_block.C.tree[0].type &&
'generator' !=parent_block.C.tree[0].type){parent_block=parent_block.parent}
this.parent.node.parent_block=parent_block
$bind(name,this.scope,this)
if(scope.is_function){if(scope.C.tree[0].locals.indexOf(name)==-1){scope.C.tree[0].locals.push(name)}}}
this.transform=function(node,rank){
this.doc_string=$get_docstring(node)
var indent='\n'+' '.repeat(node.indent+12),instance_decl=new $Node(),local_ns='$locals_'+this.id.replace(/\./g,'_'),js='var '+local_ns+' = {'+
'__annotations__: _b_.dict.$factory()}, '+
indent+'$locals = '+local_ns+', '+
indent+'$local_name = "'+local_ns+'",'
new $NodeJSCtx(instance_decl,js)
node.insert(0,instance_decl)
var global_scope=this.scope
while(global_scope.parent_block.id !=='__builtins__'){global_scope=global_scope.parent_block}
var global_ns='$locals_'+global_scope.id.replace(/\./g,'_')
var js=' '.repeat(node.indent+4)+
'$top_frame = [$local_name, $locals,'+'"'+
global_scope.id+'", '+global_ns+']'+
indent+'$B.frames_stack.push($top_frame)'
node.insert(1,$NodeJS(js))
node.add($NodeJS('$B.leave_frame()'))
var ret_obj=new $Node()
new $NodeJSCtx(ret_obj,'return '+local_ns+';')
node.insert(node.children.length,ret_obj)
var run_func=new $Node()
new $NodeJSCtx(run_func,')();')
node.parent.insert(rank+1,run_func)
var module_name='$locals_'+
$get_module(this).module.replace(/\./g,'_')+'.__name__'
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
js[pos++]=',tuple.$factory(['+args.join(',')+']),['
var _re=new RegExp('"','g'),_r=[],rpos=0
args.forEach(function(arg){_r[rpos++]='"'+arg.replace(_re,'\\"')+'"'})
js[pos++]=_r.join(',')+']'
_r=[]
rpos=0
kw.forEach(function(_tmp){_r[rpos++]='["'+_tmp.tree[0].value+'",'+
_tmp.tree[1].to_js()+']'})
js[pos++]=',['+_r.join(',')+']'}else{
js[pos++]=',tuple.$factory([]),[],[]'}
js[pos++]=')'
var cl_cons=new $Node()
new $NodeJSCtx(cl_cons,js.join(''))
rank++
node.parent.insert(rank+1,cl_cons)
rank++
var ds_node=new $Node()
js=name_ref+'.__doc__ = '+(this.doc_string ||'None')+';'
new $NodeJSCtx(ds_node,js)
node.parent.insert(rank+1,ds_node)
if(scope.ntype=='module'){var w_decl=new $Node()
new $NodeJSCtx(w_decl,'$locals["'+this.name+'"] = '+
this.name)}
node.parent.insert(rank+2,$NodeJS("None;"))
this.transformed=true}
this.to_js=function(){this.js_processed=true
return 'var $'+this.name+'_'+this.random+' = (function()'}}
var $CompIfCtx=$B.parser.$CompIfCtx=function(C){
this.type='comp_if'
C.parent.intervals.push($pos)
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(comp if) '+this.tree}
this.to_js=function(){this.js_processed=true
return $to_js(this.tree)}}
var $ComprehensionCtx=$B.parser.$ComprehensionCtx=function(C){
this.type='comprehension'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(comprehension) '+this.tree}
this.to_js=function(){this.js_processed=true
var intervals=[]
this.tree.forEach(function(elt){intervals.push(elt.start)})
return intervals}}
var $CompForCtx=$B.parser.$CompForCtx=function(C){
this.type='comp_for'
C.parent.intervals.push($pos)
this.parent=C
this.tree=[]
this.expect='in'
C.tree[C.tree.length]=this
this.toString=function(){return '(comp for) '+this.tree}
this.to_js=function(){this.js_processed=true
return $to_js(this.tree)}}
var $CompIterableCtx=$B.parser.$CompIterableCtx=function(C){
this.type='comp_iterable'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(comp iter) '+this.tree}
this.to_js=function(){this.js_processed=true
return $to_js(this.tree)}}
var $ConditionCtx=$B.parser.$ConditionCtx=function(C,token){
this.type='condition'
this.token=token
this.parent=C
this.tree=[]
if(token=='while'){this.loop_num=$loop_num++}
C.tree[C.tree.length]=this
this.toString=function(){return this.token+' '+this.tree}
this.transform=function(node,rank){var scope=$get_scope(this)
if(this.token=="while"){if(scope.ntype=="generator"){this.parent.node.loop_start=this.loop_num}
node.parent.insert(rank,$NodeJS('$locals["$no_break'+this.loop_num+'"] = true'))
return 2}}
this.to_js=function(){this.js_processed=true
var tok=this.token
if(tok=='elif'){tok='else if'}
var res=[tok+'($B.$bool(']
if(tok=='while'){res.push('$locals["$no_break'+this.loop_num+'"] && ')}else if(tok=='else if'){var line_info=$get_node(this).line_num+','+
$get_scope(this).id
res.push('($locals.$line_info = "'+line_info+'") && ')}
if(this.tree.length==1){res.push($to_js(this.tree)+'))')}else{
res.push(this.tree[0].to_js()+'))')
if(this.tree[1].tree.length > 0){res.push('{'+this.tree[1].to_js()+'}')}}
return res.join('')}}
var $ContinueCtx=$B.parser.$ContinueCtx=function(C){
this.type='continue'
this.parent=C
$get_node(this).is_continue=true
C.tree[C.tree.length]=this
set_loop_context.apply(this,[C,'continue'])
this.toString=function(){return '(continue)'}
this.to_js=function(){this.js_processed=true
return 'continue'}}
var $DebuggerCtx=$B.parser.$DebuggerCtx=function(C){
this.type='continue'
this.parent=C
C.tree[C.tree.length]=this
this.toString=function(){return '(debugger)'}
this.to_js=function(){this.js_processed=true
return 'debugger'}}
var $DecoratorCtx=$B.parser.$DecoratorCtx=function(C){
this.type='decorator'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.toString=function(){return '(decorator) '+this.tree}
this.transform=function(node,rank){var func_rank=rank+1,children=node.parent.children,decorators=[this.tree]
while(1){if(func_rank >=children.length){$_SyntaxError(C,['decorator expects function'])}
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
this.to_js=function(){this.js_processed=true
var res=[]
this.decorators.forEach(function(decorator,i){res.push('var '+this.dec_ids[i]+' = '+
$to_js(decorator)+';')},this)
return res.join('')}}
var $DecoratorExprCtx=$B.parser.$DecoratorExprCtx=function(C){
this.type='decorator_expression'
this.parent=C
C.tree[C.tree.length]=this
this.names=[]
this.tree=[]
this.is_call=false
this.toString=function(){return '(decorator expression)'}
this.to_js=function(){this.js_processed=true
var func=new $IdCtx(this,this.names[0])
var obj=func.to_js()
this.names.slice(1).forEach(function(name){obj="_b_.getattr("+obj+", '"+name+"')"})
if(this.tree.length > 1){
this.tree[0].func={to_js:function(){return obj}}
return this.tree[0].to_js()}
return obj}}
var $DefCtx=$B.parser.$DefCtx=function(C){this.type='def'
this.name=null
this.parent=C
this.tree=[]
this.async=C.async
this.locals=[]
this.yields=[]
C.tree[C.tree.length]=this
this.enclosing=[]
var scope=this.scope=$get_scope(this)
if(scope.C && scope.C.tree[0].type=="class"){this.class_name=scope.C.tree[0].name}
C.node.binding={}
var parent_block=scope
while(parent_block.C &&
parent_block.C.tree[0].type=='class'){parent_block=parent_block.parent}
while(parent_block.C &&
'def' !=parent_block.C.tree[0].type &&
'generator' !=parent_block.C.tree[0].type){parent_block=parent_block.parent}
this.parent.node.parent_block=parent_block
var pb=parent_block
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
this.after_star=[]
this.set_name=function(name){try{name=$mangle(name,this.parent.tree[0])}catch(err){console.log(err)
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
if(this.scope.globals !==undefined &&
this.scope.globals.has(name)){
$bind(name,this.root,this)}else{$bind(name,this.scope,this)}
id_ctx.bound=true
if(scope.is_function){if(scope.C.tree[0].locals.indexOf(name)==-1){scope.C.tree[0].locals.push(name)}}}
this.toString=function(){return 'def '+this.name+'('+this.tree+')'}
this.transform=function(node,rank){
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
if(arg.annotation){annotations.push(arg.name+': '+arg.annotation.to_js())}},this)
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
h+'$local_name = "'+this.id+
'",'+h+'$locals = '+local_ns+';'
var new_node=new $Node()
new_node.locals_def=true
new_node.func_node=node
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
var enter_frame_nodes=[$NodeJS('var $top_frame = [$local_name, $locals,'+
'"'+global_scope.id+'", '+global_ns+', '+name+']'),$NodeJS('$B.frames_stack.push($top_frame)'),$NodeJS('var $stack_length = $B.frames_stack.length;')
]
if(this.async){enter_frame_nodes.push($NodeJS("var $stack = "+
"$B.frames_stack.slice()"))}
enter_frame_nodes.forEach(function(node){node.enter_frame=true})
nodes.push($NodeJS("var $nb_defaults = Object.keys($defaults).length,"))
nodes.push($NodeJS("    $parent = $locals.$parent"))
this.env=[]
var make_args_nodes=[]
var js=this.type=='def' ? local_ns+' = $locals' :'var $ns'
js+=' = $B.args("'+this.name+'", '+
this.argcount+', {'+this.slots.join(', ')+'}, '+
'['+slot_list.join(', ')+'], arguments, $defaults, '+
this.other_args+', '+this.other_kw+');'
var new_node=new $Node()
new $NodeJSCtx(new_node,js)
make_args_nodes.push(new_node)
if(this.type=='generator'){
js='for(var $var in $ns){$locals[$var] = $ns[$var]};'
make_args_nodes.push($NodeJS(js))}
var only_positional=false
if(this.other_args===null && this.other_kw===null &&
this.after_star.length==0 && !has_end_pos){
only_positional=true
nodes.push($NodeJS('var $len = arguments.length;'))
var new_node=new $Node()
var js='if($len > 0 && arguments[$len - 1].$nat !== undefined)'
new $NodeJSCtx(new_node,js)
nodes.push(new_node)
make_args_nodes.forEach(function(item){new_node.add(item)})
var else_node=new $Node()
new $NodeJSCtx(else_node,'else')
nodes.push(else_node)
var pos_len=this.slots.length
var test_node=$NodeJS('if($len == '+pos_len+')')
else_node.add(test_node)
if(this.type=='generator'){if(this.args.length==0){test_node.add($NodeJS('//'))}
else{this.args.forEach(function(arg){test_node.add($NodeJS('$locals["'+arg+'"] = '+
arg))})}}else{test_node.add($NodeJS(local_ns+
' = $locals = '+slot_init))}
else_node.add($NodeJS('else if($len > '+pos_len+
'){$B.wrong_nb_args("'+this.name+'", $len, '+
pos_len+', ['+slot_list+'])}'))
if(pos_len > 0){
else_node.add($NodeJS('else if($len + $nb_defaults < '+
pos_len+'){$B.wrong_nb_args("'+this.name+
'", $len, '+pos_len+', ['+slot_list+'])}'))
subelse_node=$NodeJS("else")
else_node.add(subelse_node)
if(this.type=='generator'){this.args.forEach(function(arg){subelse_node.add($NodeJS('$locals["'+arg+'"] = '+
arg))})}else{subelse_node.add($NodeJS(local_ns+
' = $locals = '+slot_init))}
subelse_node.add($NodeJS("var defparams = ["+slot_list+"]"))
subelse_node.add($NodeJS("for(var i=$len; i < defparams.length"+
";i++){$locals[defparams[i]] = $defaults[defparams[i]]}"))}}else{nodes.push(make_args_nodes[0])
if(make_args_nodes.length > 1){nodes.push(make_args_nodes[1])}}
nodes=nodes.concat(enter_frame_nodes)
nodes.push($NodeJS('$locals.__annotations__ = _b_.dict.$factory()'))
nodes.push($NodeJS('$top_frame[1] = $locals'))
nodes.push($NodeJS('$locals.$parent = $parent'))
var is_method=scope.ntype=="class"
if(is_method){var class_name=scope.C.tree[0].name,class_block=scope.parent_block,class_ref="$locals_"+class_block.id.replace(/\./g,'_')+
'["'+class_name+'"]'
this.parent.node.binding["__class__"]=true
nodes.push($NodeJS("$locals.__class__ = "+class_ref))}
nodes.push($NodeJS('$B.js_this = this;'))
if(this.type=="generator"){var suspension_node=$NodeJS("// suspension")
suspension_node.is_set_yield_value=true
suspension_node.num=node.num
nodes.push(suspension_node)}
for(var i=nodes.length-1;i >=0;i--){node.children.splice(0,0,nodes[i])}
var def_func_node=new $Node()
this.params=''
if(only_positional){this.params=Object.keys(this.varnames).join(', ')}
new $NodeJSCtx(def_func_node,'')
def_func_node.is_def_func=true
def_func_node.module=this.module
var last_instr=node.children[node.children.length-1].C.tree[0]
if(last_instr.type !='return' && this.type !='generator'){
var js='$B.leave_frame'
if(this.id.substr(0,5)=='$exec'){js+='_exec'}
node.add($NodeJS(js+'();return None'))}
node.add(def_func_node)
var offset=1,indent=node.indent
node.parent.insert(rank+offset++,$NodeJS(name+'.$is_func = true'))
node.parent.insert(rank+offset++,$NodeJS(name+'.$infos = {'))
var __name__=this.name
if(this.name.substr(0,2)=="$$"){__name__=__name__.substr(2)}
if(__name__.substr(0,15)=='lambda_'+$B.lambda_magic){__name__="<lambda>"}
js='    __name__:"'+__name__+'",'
node.parent.insert(rank+offset++,$NodeJS(js))
var __qualname__=__name__
if(this.class_name){__qualname__=this.class_name+'.'+__name__}
js='    __qualname__:"'+__qualname__+'",'
node.parent.insert(rank+offset++,$NodeJS(js))
if(this.type !="generator"){
if(this.otherdefaults.length > 0){var def_names=[]
this.otherdefaults.forEach(function(_default){def_names.push('$defaults.'+_default)})
node.parent.insert(rank+offset++,$NodeJS('    __defaults__ : '+
'$B.fast_tuple(['+def_names.join(', ')+']),'))}else{node.parent.insert(rank+offset++,$NodeJS('    __defaults__ : '+
'_b_.None,'))}
if(this.kwonlyargsdefaults.lengh > 0){var def_names=[]
this.kwonlyargsdefaults.forEach(function(_default){def_names.push('$defaults.'+_default)})
node.parent.insert(rank+offset++,$NodeJS('    __kwdefaults__ : '+
'$B.fast_tuple(['+def_names.join(', ')+']),'))}else{node.parent.insert(rank+offset++,$NodeJS('    __kwdefaults__ : '+
'_b_.None,'))}}
node.parent.insert(rank+offset++,$NodeJS('    __annotations__: {'+annotations.join(',')+'},'))
node.parent.insert(rank+offset++,$NodeJS('    __dict__: {__class__: _b_.dict, $string_dict: {},'+
'$str_hash: {}, $numeric_dict: {}, $object_dict:{}},'))
node.parent.insert(rank+offset++,$NodeJS('    __doc__: '+(this.doc_string ||'None')+','))
var root=$get_module(this)
node.parent.insert(rank+offset++,$NodeJS('    __module__ : "'+root.module+'",'))
for(var attr in this.binding){this.varnames[attr]=true}
var co_varnames=[]
for(var attr in this.varnames){co_varnames.push('"'+$B.from_alias(attr)+'"')}
var free_vars=[]
if(this.parent.node.referenced){for(var attr in this.parent.node.referenced){if(! this.parent.node.binding[attr]){free_vars.push('"'+attr+'"')}}}
var CODE_MARKER='___%%%-CODE-%%%___'+this.name+this.num;
var h='\n'+' '.repeat(indent+8)
js='    __code__:{'+h+'    co_argcount:'+this.argcount
var h1=','+h+' '.repeat(4)
var module=$get_module(this).module
js+=h1+'co_filename:$locals_'+module.replace(/\./g,'_')+
'["__file__"]'+
h1+'co_firstlineno:'+node.line_num+
h1+'co_flags:'+flags+
h1+'co_freevars: ['+free_vars+']'+
h1+'co_kwonlyargcount:'+this.kwonlyargcount+
h1+'co_name: "'+this.name+'"'+
h1+'co_nlocals: '+co_varnames.length+
h1+'co_posonlyargcount: '+(this.pos_only ||0)+
h1+'co_varnames: $B.fast_tuple(['+co_varnames.join(', ')+']'+
h+')}\n'+' '.repeat(indent+4)+'};'
js+='None;'
node.parent.insert(rank+offset++,$NodeJS(js))
this.default_str='{'+defs1.join(', ')+'}'
if(this.type=="def"){
node.parent.insert(rank+offset++,new $MarkerNode('func_end:'+
CODE_MARKER))
var res='return '+name
if(this.async){res='return $B.make_async('+name+')'}
node.parent.insert(rank+offset++,$NodeJS(res+'}'))
node.parent.insert(rank+offset++,$NodeJS(
this.func_name+" = "+this.name+'$'+this.num+
'('+this.default_str+')'))
node.parent.insert(rank+offset++,$NodeJS(
func_name1+".$set_defaults = function(value){return "+
func_name1+" = "+this.name+"$"+this.num+
"(value)}"))}
if(this.type=='def'){var parent=node
for(var pos=0;pos < parent.children.length &&
parent.children[pos]!==$B.last(enter_frame_nodes);pos++){}
var try_node=$NodeJS('try'),children=parent.children.slice(pos+1)
parent.insert(pos+1,try_node)
children.forEach(function(child){if(child.is_def_func){child.children.forEach(function(grand_child){try_node.add(grand_child)})}else{try_node.add(child)}})
parent.children.splice(pos+2,parent.children.length)
var except_node=$NodeJS('catch(err)')
if(this.async){except_node.add($NodeJS('err.$stack = $stack'))}
except_node.add($NodeJS('$B.leave_frame();throw err'))
parent.add(except_node)}
this.transformed=true
return offset}
this.to_js=function(func_name){this.js_processed=true
func_name=func_name ||this.tree[0].to_js()
if(this.decorated){func_name='var '+this.alias}
return "var "+this.name+'$'+this.num+
' = function($defaults){'+
(this.async ? 'async ' :'')+'function '+
this.name+this.num+'('+this.params+')'}}
var $DelCtx=$B.parser.$DelCtx=function(C){
this.type='del'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.toString=function(){return 'del '+this.tree}
this.to_js=function(){this.js_processed=true
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
$_SyntaxError(this,["can't delete operator"])
case 'call':
$_SyntaxError(this,["can't delete function call"])
case 'attribute':
return 'delattr('+expr.value.to_js()+',"'+
expr.name+'")'
default:
$_SyntaxError(this,["can't delete "+expr.type])}}}}
var $DictOrSetCtx=$B.parser.$DictOrSetCtx=function(C){
this.type='dict_or_set'
this.real='dict_or_set'
this.expect='id'
this.closed=false
this.start=$pos
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){switch(this.real){case 'dict':
return '(dict) {'+this.items+'}'
case 'set':
return '(set) {'+this.tree+'}'}
return '(dict_or_set) {'+this.tree+'}'}
this.nb_dict_items=function(){var nb=0
this.tree.forEach(function(item){if(item.packed){nb+=2}
else{nb++}})
return nb}
this.packed_indices=function(){var ixs=[]
this.items.forEach(function(t,i){if(t.type=="expr" && t.packed){ixs.push(i)}})
return ixs}
this.unpack_dict=function(packed){var js="",res,first,i=0,item,elts=[]
while(i < this.items.length){item=this.items[i]
first=i==0
if(item.type=="expr" && item.packed){res="_b_.list.$factory(_b_.dict.items("+item.to_js()+"))"
i++}else{res="[["+item.to_js()+","+
this.items[i+1].to_js()+"]]"
i+=2}
if(! first){res=".concat("+res+")"}
js+=res}
return js}
this.unpack_set=function(packed){var js="",res
this.items.forEach(function(t,i){if(packed.indexOf(i)>-1){res="_b_.list.$factory("+t.to_js()+")"}else{res="["+t.to_js()+"]"}
if(i > 0){res=".concat("+res+")"}
js+=res})
return js}
this.to_js=function(){this.js_processed=true
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
if(packed.length > 0){return 'set.$factory('+this.unpack_set(packed)+')'}
return 'set.$factory(['+$to_js(this.items)+'])'+$to_js(this.tree)}}
var $DoubleStarArgCtx=$B.parser.$DoubleStarArgCtx=function(C){
this.type='double_star_arg'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '**'+this.tree}
this.to_js=function(){this.js_processed=true
return '{$nat:"pdict",arg:'+$to_js(this.tree)+'}'}}
var $EllipsisCtx=$B.parser.$EllipsisCtx=function(C){
this.type='ellipsis'
this.parent=C
this.nbdots=1
this.start=$pos
C.tree[C.tree.length]=this
this.toString=function(){return 'ellipsis'}
this.to_js=function(){this.js_processed=true
return '$B.builtins["Ellipsis"]'}}
var $EndOfPositionalCtx=$B.parser.$EndOfConditionalCtx=function(C){
this.type="end_positional"
this.parent=C
C.has_end_positional=true
C.parent.pos_only=C.tree.length
C.tree.push(this)
this.to_js=function(){return "/"}}
var $ExceptCtx=$B.parser.$ExceptCtx=function(C){
this.type='except'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.expect='id'
this.scope=$get_scope(this)
this.toString=function(){return '(except) '}
this.set_alias=function(alias){this.tree[0].alias=$mangle(alias,this)
$bind(alias,this.scope,this)}
this.transform=function(node,rank){
var last_child=$B.last(node.children)
if(last_child.C.tree && last_child.C.tree[0]&&
last_child.C.tree[0].type=="return"){}
else{node.add($NodeJS("$B.del_exc()"))}}
this.to_js=function(){
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
',['+res.join(',')+']))'}}
var $ExprCtx=$B.parser.$ExprCtx=function(C,name,with_commas){
this.type='expr'
this.name=name
this.with_commas=with_commas
this.expect=',' 
this.parent=C
if(C.packed){this.packed=C.packed}
if(C.is_await){this.is_await=C.is_await}
if(C.assign){
this.assign=C.assign}
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(expr '+with_commas+') '+this.tree}
this.to_js=function(arg){var res
this.js_processed=true
if(this.type=='list'){res='['+$to_js(this.tree)+']'}
else if(this.tree.length==1){res=this.tree[0].to_js(arg)}
else{res='_b_.tuple.$factory(['+$to_js(this.tree)+'])'}
if(this.is_await){res="await $B.promise("+res+")"}
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
return res}}
var $ExprNot=$B.parser.$ExprNot=function(C){
this.type='expr_not'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(expr_not)'}}
var $FloatCtx=$B.parser.$FloatCtx=function(C,value){
this.type='float'
this.value=value
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return 'float '+this.value}
this.to_js=function(){this.js_processed=true
if(/^\d+$/.exec(this.value)||
/^\d+\.\d*$/.exec(this.value)){return '(new Number('+this.value+'))'}
return 'float.$factory('+this.value+')'}}
var $ForExpr=$B.parser.$ForExpr=function(C){
this.type='for'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.loop_num=$loop_num
this.module=$get_scope(this).module
$loop_num++
this.toString=function(){return '(for) '+this.tree}
this.transform=function(node,rank){if(this.async){return this.transform_async(node,rank)}
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
if($range && scope.ntype !='generator'){if(this.has_break){
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
if(range_is_builtin){new $NodeJSCtx(test_range_node,'if(1)')}else{new $NodeJSCtx(test_range_node,'if('+call.func.to_js()+' === $B.builtins.range)')}
new_nodes[pos++]=test_range_node
var idt=target.to_js(),shortcut=false
if($range.tree.length==1){var stop=$range.tree[0].tree[0]
if(stop.tree[0].type=="int"){stop=parseInt(stop.to_js())
if(0 < stop < $B.max_int){shortcut=true
var varname="$i"+$B.UUID()
var for_node=$NodeJS("for (var "+varname+" = 0; "+
varname+" < "+stop+"; "+varname+"++)")
for_node.add($NodeJS(idt+" = "+varname))}}
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
for_node.add($NodeJS(idt+' = $next'+num))
for_node.add($NodeJS('if($safe'+num+'){$next'+num+
' += 1}'))
for_node.add($NodeJS('else{$next'+num+' = $B.add($next'+
num+',1)}'))}
children.forEach(function(child){for_node.add(child)})
for_node.add($NodeJS('$locals.$line_info = "'+node.line_num+
','+scope.id+'"; None;'))
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
if(this.has_break){js='while('+local_ns+'["$no_break'+num+'"])'}else{js='while(1)'}
new $NodeJSCtx(while_node,js)
while_node.C.loop_num=num 
while_node.C.type='for' 
while_node.line_num=node.line_num
if(scope.ntype=='generator'){
while_node.loop_start=num}
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
$NodeJS('catch($err){if($B.is_exc($err, [StopIteration]))'+
'{break;}else{throw($err)}}'))
children.forEach(function(child){while_node.add(child)})
node.children=[]
return 0}
this.transform_async=function(node,rank){
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
if(target.tree.length==1){var js=target.to_js()+' = await $B.promise('+
anext_name+'('+iterable_name+'))'
try_node.add($NodeJS(js))}else{var new_node=new $Node(),ctx=new $NodeCtx(new_node),expr=new $ExprCtx(ctx,"left",false)
expr.tree.push(target)
target.parent=expr
var assign=new $AssignCtx(expr)
new $RawJSCtx(assign,'await $B.promise('+
anext_name+'('+iterable_name+'))')
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
this.to_js=function(){this.js_processed=true
var iterable=this.tree.pop()
return 'for ('+$to_js(this.tree)+' in '+iterable.to_js()+')'}}
var $FromCtx=$B.parser.$FromCtx=function(C){
this.type='from'
this.parent=C
this.module=''
this.names=[]
this.aliases={}
C.tree[C.tree.length]=this
this.expect='module'
this.scope=$get_scope(this)
this.add_name=function(name){this.names[this.names.length]=name
if(name=='*'){this.scope.blurred=true}}
this.bind_names=function(){
var scope=$get_scope(this)
this.names.forEach(function(name){name=this.aliases[name]||name
$bind(name,scope,this)},this)}
this.toString=function(){return '(from) '+this.module+' (import) '+this.names+
'(as)'+this.aliases}
this.to_js=function(){this.js_processed=true
var scope=$get_scope(this),module=$get_module(this),mod=module.module,res=[],pos=0,indent=$get_node(this).indent,head=' '.repeat(indent)
if(mod.startsWith("$exec")){var frame=$B.last($B.frames_stack)[1]
if(frame.module && frame.module.__name__){mod=frame.module.__name__}}
var mod_elts=this.module.split(".")
for(var i=0;i < mod_elts.length;i++){module.imports[mod_elts.slice(0,i+1).join(".")]=true}
var _mod=this.module.replace(/\$/g,''),$package,packages=[]
while(_mod.length > 0){if(_mod.charAt(0)=='.'){if($package===undefined){if($B.imported[mod]!==undefined){$package=$B.imported[mod].__package__
packages=$package.split('.')}}else{$package=$B.imported[$package]
packages.pop()}
if($package===undefined){return 'throw SystemError.$factory("Parent module \'\' '+
'not loaded, cannot perform relative import")'}else if($package=='None'){console.log('package is None !')}
_mod=_mod.substr(1)}else{break}}
if(_mod){packages.push(_mod)}
this.module=packages.join('.')
var mod_name=this.module.replace(/\$/g,'')
res[pos++]='var module = $B.$import("'
res[pos++]=mod_name+'",["'
res[pos++]=this.names.join('","')+'"], {'
var sep=''
for(var attr in this.aliases){res[pos++]=sep+'"'+attr+'": "'+this.aliases[attr]+'"'
sep=','}
res[pos++]='}, {}, true);'
if(this.names[0]=='*'){
scope.blurred=true
res[pos++]='\n'+head+'for(var attr in module'+
'){if(attr.charAt(0) !== "_" && attr.charAt(0) !== "$")'+
'{$locals[attr] = module[attr]}};'}else{this.names.forEach(function(name){module.imports[this.module+'.'+name]=true
res[pos++]='\n'+head+'$locals["'+
(this.aliases[name]||name)+'"] = $B.$getattr($B.imported["'+
mod_name+'"], "'+name+'");'},this)}
res[pos++]='\n'+head+'None;'
return res.join('');}}
var $FuncArgs=$B.parser.$FuncArgs=function(C){
this.type='func_args'
this.parent=C
this.tree=[]
this.names=[]
C.tree[C.tree.length]=this
this.expect='id'
this.has_default=false
this.has_star_arg=false
this.has_kw_arg=false
this.toString=function(){return 'func args '+this.tree}
this.to_js=function(){this.js_processed=true
return $to_js(this.tree)}}
var $FuncArgIdCtx=$B.parser.$FuncArgIdCtx=function(C,name){
this.type='func_arg_id'
this.name=name
this.parent=C
if(C.has_star_arg){C.parent.after_star.push(name)}else{C.parent.positional_list.push(name)}
var node=$get_node(this)
if(node.binding[name]){$_SyntaxError(C,["duplicate argument '"+name+"' in function definition"])}
$bind(name,node,this)
this.tree=[]
C.tree[C.tree.length]=this
var ctx=C
while(ctx.parent !==undefined){if(ctx.type=='def'){ctx.locals.push(name)
break}
ctx=ctx.parent}
this.expect='='
this.toString=function(){return 'func arg id '+this.name+'='+this.tree}
this.to_js=function(){this.js_processed=true
return this.name+$to_js(this.tree)}}
var $FuncStarArgCtx=$B.parser.$FuncStarArgCtx=function(C,op){
this.type='func_star_arg'
this.op=op
this.parent=C
this.node=$get_node(this)
C.has_star_arg=op=='*'
C.has_kw_arg=op=='**'
C.tree[C.tree.length]=this
this.toString=function(){return '(func star arg '+this.op+') '+this.name}
this.set_name=function(name){this.name=name
if(this.node.binding[name]){$_SyntaxError(C,["duplicate argument '"+name+"' in function definition"])}
$bind(name,this.node,this)
var ctx=C
while(ctx.parent !==undefined){if(ctx.type=='def'){ctx.locals.push(name)
break}
ctx=ctx.parent}
if(op=='*'){ctx.other_args='"'+name+'"'}
else{ctx.other_kw='"'+name+'"'}}}
var $GlobalCtx=$B.parser.$GlobalCtx=function(C){
this.type='global'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.expect='id'
this.scope=$get_scope(this)
this.scope.globals=this.scope.globals ||new Set()
this.module=$get_module(this)
this.module.binding=this.module.binding ||{}
this.toString=function(){return 'global '+this.tree}
this.add=function(name){if(this.scope.annotations && this.scope.annotations.has(name)){$_SyntaxError(C,["annotated name '"+name+
"' can't be global"])}
this.scope.globals.add(name)
this.module.binding[name]=true}
this.to_js=function(){this.js_processed=true
return ''}}
var $IdCtx=$B.parser.$IdCtx=function(C,value){
this.type='id'
this.value=$mangle(value,C)
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
var scope=this.scope=$get_scope(this)
this.blurred_scope=this.scope.blurred
this.env=clone(this.scope.binding)
if(scope.ntype=="def" ||scope.ntype=="generator"){scope.referenced=scope.referenced ||{}
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
if(C.type=='target_list' ||
(C.type=='expr' && C.parent.type=='target_list')){
this.no_bindings=true
$bind(value,scope,this)
this.bound=true}
if(scope.ntype=='def' ||scope.ntype=='generator'){
var _ctx=this.parent
while(_ctx){if(_ctx.type=='list_or_tuple' && _ctx.is_comp()){this.in_comp=true
return}
_ctx=_ctx.parent}
if(C.type=='expr' && C.parent.type=='comp_if'){
return}else if(C.type=='global'){if(scope.globals===undefined){scope.globals=new Set([value])}else{scope.globals.add(value)}}}
this.toString=function(){return '(id) '+this.value+':'+(this.tree ||'')}
this.firstBindingScopeId=function(){
var scope=this.scope,found=[],nb=0
while(scope && nb++< 20){if(scope.binding && scope.binding[this.value]){return scope.id}
scope=scope.parent}}
this.boundBefore=function(scope){
var node=$get_node(this),found=false
var $test=this.value=="bx"
while(!found && node.parent){var pnode=node.parent
if(pnode.bindings && pnode.bindings[this.value]){if($test){console.log("bound in",pnode)}
return pnode.bindings[this.value]}
for(var i=0;i < pnode.children.length;i++){var child=pnode.children[i]
if(child===node){break}
if(child.bindings && child.bindings[this.value]){if($test){console.log("bound in child",child)}
return child.bindings[this.value]}}
if(pnode===scope){break}
node=pnode}
return found}
this.bindingType=function(scope){
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
this.to_js=function(arg){
if(this.result !==undefined && this.scope.ntype=='generator'){return this.result}
this.js_processed=true
var val=this.value
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
if(val=='__BRYTHON__' ||val=='$B'){return val}
var innermost=$get_scope(this),scope=innermost,found=[]
var search_ids=['"'+innermost.id+'"']
var gs=innermost
var $test=val=="bx"
if($test){console.log("this",this)}
while(true){if($test){console.log(gs.id,gs)}
if(gs.parent_block){if(gs.parent_block==$B.builtins_scope){break}
else if(gs.parent_block.id===undefined){break}
gs=gs.parent_block}
search_ids.push('"'+gs.id+'"')}
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
scope.globals.has(val)){if($test){console.log("in globals of",scope.id)}
if(this.boundBefore(gs)){if($test){console.log("bound before in gs",gs)}
return global_ns+'["'+val+'"]'}else{if($test){console.log("use global search",this)}
if(this.augm_assign){return global_ns+'["'+val+'"]'}else{return '$B.$global_search("'+val+'", '+
search_ids+')'}}}
if($test){console.log("scope",scope,"innermost",innermost,scope===innermost,"bound_before",bound_before,"found",found.slice())}
if(scope===innermost){
if(bound_before){if(bound_before.indexOf(val)>-1){found.push(scope)}
else if(scope.C &&
scope.C.tree[0].type=='def' &&
scope.C.tree[0].env.indexOf(val)>-1){found.push(scope)}}else{if(scope.binding[val]){
if(this_node.locals[val]===undefined){
if(!scope.is_comp &&
(!scope.parent_block ||
!scope.parent_block.is_comp)){
found.push(scope)}}else{found.push(scope)
break}
if($test){console.log(val,"found in",scope.id)}}}}else{if(scope.binding===undefined){console.log("scope",scope,val,"no binding",innermost)}
if(scope.binding[val]){found.push(scope)}}
if(scope.parent_block){scope=scope.parent_block}
else{break}}
this.found=found
if($test){console.log("found",found)
found.forEach(function(item){console.log(item.id)})}
if(this.nonlocal && found[0]===innermost){found.shift()}
if(found.length > 0){
if(found[0].C && found[0]===innermost
&& val.charAt(0)!='$'){var locs=this_node.locals ||{},nonlocs=innermost.nonlocals
if(locs[val]===undefined &&
((innermost.type !='def' ||
innermost.type !='generator')&&
innermost.ntype !='class' &&
innermost.C.tree[0].args.indexOf(val)==-1)&&
(nonlocs===undefined ||nonlocs[val]===undefined)){this.result='$B.$local_search("'+val+'")'
return this.result}}
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
val='('+global_ns+'["'+val+'"] || '+val+')'}else{
if(val !=='__builtins__'){val='$B.builtins.'+val}
this.is_builtin=true}}else{
if($test){console.log("name found at module level")}
if(this.bound ||this.augm_assign){
val=scope_ns+'["'+val+'"]'}else{if(scope===innermost && this.env[val]===undefined){
this.result='$B.$search("'+val+'")'
return this.result}else{if($test){console.log("boudn before ?",this.boundBefore(scope))}
if(this.boundBefore(scope)){
val=scope_ns+'["'+val+'"]'}else{
if($test){console.log("use check def")}
val='$B.$check_def("'+val+'",'+
scope_ns+'["'+val+'"])'}}}}}else if(scope===innermost){if($test){console.log("scope is innermost",scope.id)}
if(scope.globals && scope.globals.has(val)){val=global_ns+'["'+val+'"]'}else if(!this.bound && !this.augm_assign){
if(this.boundBefore(scope)){val='$locals["'+val+'"]'}else{val='$B.$check_def_local("'+val+'",$locals["'+
val+'"])'}}else{val='$locals["'+val+'"]'}}else if(!this.augm_assign){
if(scope.ntype=='generator'){
var up=0,
sc=innermost
while(sc !==scope){up++;sc=sc.parent_block}
var scope_name="$B.frames_stack[$B.frames_stack.length-1-"+
up+"][1]"
val='$B.$check_def_free1("'+val+'", "'+
scope.id.replace(/\./g,"_")+'")'}else{val='$B.$check_def_free("'+val+'",'+scope_ns+
'["'+val+'"])'}}else{val=scope_ns+'["'+val+'"]'}
this.result=val+$to_js(this.tree,'')
return this.result}else{
this.unknown_binding=true
this.result='$B.$global_search("'+val+'", '+search_ids+')'
return this.result}}}
var $ImaginaryCtx=$B.parser.$ImaginaryCtx=function(C,value){
this.type='imaginary'
this.value=value
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return 'imaginary '+this.value}
this.to_js=function(){this.js_processed=true
return '$B.make_complex(0,'+this.value+')'}}
var $ImportCtx=$B.parser.$ImportCtx=function(C){
this.type='import'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.expect='id'
this.toString=function(){return 'import '+this.tree}
this.bind_names=function(){
var scope=$get_scope(this)
this.tree.forEach(function(item){if(item.name==item.alias){var name=item.name,parts=name.split('.'),bound=name
if(parts.length>1){bound=parts[0]}}else{bound=item.alias}
$bind(bound,scope,this)},this)}
this.to_js=function(){this.js_processed=true
var scope=$get_scope(this),res=[],module=$get_module(this)
this.tree.forEach(function(item){var mod_name=item.name,aliases=(item.name==item.alias)?
'{}' :('{"'+mod_name+'" : "'+
item.alias+'"}'),localns='$locals_'+scope.id.replace(/\./g,'_'),mod_elts=item.name.split(".")
for(var i=0;i < mod_elts.length;i++){module.imports[mod_elts.slice(0,i+1).join(".")]=true}
var js='$B.$import("'+mod_name+'", [],'+aliases+
','+localns+', true);'
res.push(js)})
return res.join('')+'None;'}}
var $ImportedModuleCtx=$B.parser.$ImportedModuleCtx=function(C,name){this.type='imported module'
this.parent=C
this.name=name
this.alias=name
C.tree[C.tree.length]=this
this.toString=function(){return ' (imported module) '+this.name}
this.to_js=function(){this.js_processed=true
return '"'+this.name+'"'}}
var $IntCtx=$B.parser.$IntCtx=function(C,value){
this.type='int'
this.value=value
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return 'int '+this.value}
this.to_js=function(){this.js_processed=true
var v=parseInt(value[1],value[0])
if(v > $B.min_int && v < $B.max_int){return v}
else{return '$B.long_int.$factory("'+value[1]+'", '+value[0]+')'}}}
var $JSCode=$B.parser.$JSCode=function(js){this.js=js
this.toString=function(){return this.js}
this.to_js=function(){this.js_processed=true
return this.js}}
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
else{$_SyntaxError(C,['keyword argument repeated'])}
this.toString=function(){return 'kwarg '+this.tree[0]+'='+this.tree[1]}
this.to_js=function(){this.js_processed=true
var key=this.tree[0].value
if(key.substr(0,2)=='$$'){key=key.substr(2)}
var res='{$nat:"kw",name:"'+key+'",'
return res+'value:'+
$to_js(this.tree.slice(1,this.tree.length))+'}'}}
var $LambdaCtx=$B.parser.$LambdaCtx=function(C){
this.type='lambda'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.args_start=$pos+6
this.vars=[]
this.locals=[]
this.toString=function(){return '(lambda) '+this.args_start+' '+this.body_start}
this.to_js=function(){this.js_processed=true
var node=$get_node(this),module=$get_module(this),src=$get_src(C),args=src.substring(this.args_start,this.body_start),body=src.substring(this.body_start+1,this.body_end)
body=body.replace(/\\\n/g,' ')
body=body.replace(/\n/g,' ')
var scope=$get_scope(this)
var rand=$B.UUID(),func_name='lambda_'+$B.lambda_magic+'_'+rand,py='def '+func_name+'('+args+'):\n'
py+='    return '+body
var lambda_name='lambda'+rand,module_name=module.id.replace(/\./g,'_')
var root=$B.py2js(py,module_name,lambda_name,scope,node.line_num)
var js=root.to_js()
js='(function($locals_'+lambda_name+'){\n'+js+
'\nreturn $locals.'+func_name+'\n})({})'
$B.clear_ns(lambda_name)
$B.$py_src[lambda_name]=null
delete $B.$py_src[lambda_name]
return js}}
var $ListOrTupleCtx=$B.parser.$ListOrTupleCtx=function(C,real){
this.type='list_or_tuple'
this.start=$pos
this.real=real
this.expect='id'
this.closed=false
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){switch(this.real){case 'list':
return '(list) ['+this.tree+']'
case 'list_comp':
case 'gen_expr':
return '('+this.real+') ['+this.intervals+'-'+
this.tree+']'
default:
return '(tuple) ('+this.tree+')'}}
this.is_comp=function(){switch(this.real){case 'list_comp':
case 'gen_expr':
case 'dict_or_set_comp':
return true}
return false}
this.get_src=function(){
var src=$get_module(this).src
var scope=$get_scope(this)
if(scope.comments===undefined){return src}
scope.comments.forEach(function(comment){var start=comment[0],len=comment[1]
src=src.substr(0,start)+' '.repeat(len+1)+
src.substr(start+len+1)})
return src}
this.bind_ids=function(scope){
this.tree.forEach(function(item){if(item.type=='id'){$bind(item.value,scope,this)
item.bound=true}else if(item.type=='expr' && item.tree[0].type=="id"){$bind(item.tree[0].value,scope,this)
item.tree[0].bound=true}else if(item.type=='expr' && item.tree[0].type=="packed"){if(item.tree[0].tree[0].type=='id'){$bind(item.tree[0].tree[0].value,scope,this)
item.tree[0].tree[0].bound=true}}else if(item.type=='list_or_tuple' ||
(item.type=="expr" &&
item.tree[0].type=='list_or_tuple')){if(item.type=="expr"){item=item.tree[0]}
item.bind_ids(scope)}},this)}
this.packed_indices=function(){var ixs=[]
for(var i=0;i < this.tree.length;i++){var t=this.tree[i]
if(t.type=="expr"){t=t.tree[0]
if(t.type=="packed" ||
(t.type=="call" && t.func.type=="packed")){ixs.push(i)}}}
return ixs}
this.unpack=function(packed){var js="",res
for(var i=0;i < this.tree.length;i++){if(packed.indexOf(i)>-1){res="_b_.list.$factory("+this.tree[i].to_js()+")"}else{res="["+this.tree[i].to_js()+"]"}
if(i > 0){res=".concat("+res+")"}
js+=res}
return js}
this.to_js=function(){this.js_processed=true
var scope=$get_scope(this),sc=scope,scope_id=scope.id.replace(/\//g, '_'),
            pos = 0
        var root = $get_module(this),
            module_name = root.module
        switch(this.real) {
            case 'list':
                var packed = this.packed_indices()
                if(packed.length > 0){
                    return '$B.$list(' + this.unpack(packed) + ')'
                }
                return '$B.$list([' + $to_js(this.tree) + '])'
            case 'list_comp':
            case 'gen_expr':
            case 'dict_or_set_comp':
                var src = this.get_src()
                var res1 = [], items = []
                var qesc = new RegExp('"', "g") //to escape double quotes in arguments
var comments=root.comments
for(var i=1;i < this.intervals.length;i++){var start=this.intervals[i-1],end=this.intervals[i],txt=src.substring(start,end)
comments.forEach(function(comment){if(comment[0]> start && comment[0]< end){
var pos=comment[0]-start
txt=txt.substr(0,pos)+
' '.repeat(comment[1])+
txt.substr(pos+comment[1]+1)}})
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
py=lc[0],ix=lc[1],listcomp_name='lc'+ix,save_pos=$pos
var root=$B.py2js({src:py,is_comp:true},module_name,listcomp_name,scope,1)
$pos=save_pos
var js=root.to_js()
root=null
$B.clear_ns(listcomp_name)
delete $B.$py_src[listcomp_name]
js+='return $locals_lc'+ix+'["x'+ix+'"]'
js='(function($locals_'+listcomp_name+'){'+
js+'})({})'
return js
case 'dict_or_set_comp':
if(this.expression.length==1){return $B.$gen_expr(module_name,scope,items,line_num)}
return $B.$dict_comp(module_name,scope,items,line_num)}
return $B.$gen_expr(module_name,scope,items,line_num)
case 'tuple':
var packed=this.packed_indices()
if(packed.length > 0){return '$B.fast_tuple('+this.unpack(packed)+')'}
if(this.tree.length==1 && this.has_comma===undefined){return this.tree[0].to_js()}
return '$B.fast_tuple(['+$to_js(this.tree)+'])'}}}
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
this.scope=scope
this.toString=function(){return 'node '+this.tree}
this.to_js=function(){if(this.js !==undefined){return this.js}
this.js_processed=true
if(this.tree.length > 1){var new_node=new $Node()
var ctx=new $NodeCtx(new_node)
ctx.tree=[this.tree[1]]
new_node.indent=node.indent+4
this.tree.pop()
node.add(new_node)}
this.js=""
if(this.tree[0]){var is_not_def=this.scope.ntype !="def"
if(this.tree[0].annotation){
if(is_not_def){if(this.tree[0].type=="expr" &&
! this.tree[0].$in_parens &&
this.tree[0].tree[0].type=="id"){var js=""
if(this.create_annotations){js+="$locals.__annotations__ = _b_.dict.$factory();"}
return js+"$locals.__annotations__.$string_dict['"+
this.tree[0].tree[0].value+"'] = "+
this.tree[0].annotation.to_js()+";"}else if(this.tree[0].type=="def"){
this.js=this.tree[0].annotation.to_js()+";"}else{
this.js=""
this.tree=[]}}else if(this.tree[0].type !="def"){
this.tree=[]}}else if(this.tree[0].type=="assign" &&
! this.tree[0].tree[0].$in_parens &&
this.tree[0].tree[0].annotation){
var left=this.tree[0].tree[0],right=this.tree[0].tree[1]
if(this.create_annotations){this.js+="$locals.__annotations__ = _b_.dict.$factory();"}
this.js+="var $value = "+right.to_js()+";"
this.tree[0].tree.splice(1,1)
new $RawJSCtx(this.tree[0],"$value")
if(left.tree[0]&& left.tree[0].type=="id" && is_not_def){this.js+="$locals.__annotations__.$string_dict['"+
left.tree[0].value+"'] = "+
left.annotation.to_js()+";"}else{
this.js+=$to_js(this.tree)+";"
if(is_not_def){this.js+=left.annotation.to_js()}
return this.js}}}
if(node.children.length==0){this.js+=$to_js(this.tree)+';'}else{this.js+=$to_js(this.tree)}
return this.js}}
var $NodeJS=$B.parser.$NodeJS=function(js){var node=new $Node()
new $NodeJSCtx(node,js)
return node}
var $NodeJSCtx=$B.parser.$NodeJSCtx=function(node,js){
this.node=node
node.C=this
this.type='node_js'
this.tree=[js]
this.toString=function(){return 'js '+js}
this.to_js=function(){this.js_processed=true
return js}}
var $NonlocalCtx=$B.parser.$NonlocalCtx=function(C){
this.type='nonlocal'
this.parent=C
this.tree=[]
this.names={}
C.tree[C.tree.length]=this
this.expect='id'
this.scope=$get_scope(this)
this.scope.nonlocals=this.scope.nonlocals ||{}
if(this.scope.C===undefined){$_SyntaxError(C,["nonlocal declaration not allowed at module level"])}
this.toString=function(){return 'nonlocal '+this.tree}
this.add=function(name){if(this.scope.binding[name]=="arg"){$_SyntaxError(C,["name '"+name+"' is parameter and nonlocal"])}
this.names[name]=[false,$pos]
this.scope.nonlocals[name]=true}
this.transform=function(node,rank){var pscope=this.scope.parent_block
if(pscope.C===undefined){$_SyntaxError(C,["no binding for nonlocal '"+
$B.last(Object.keys(this.names))+"' found"])}else{while(pscope !==undefined && pscope.C !==undefined){for(var name in this.names){if(pscope.binding[name]!==undefined){this.names[name]=[true]}}
pscope=pscope.parent_block}
for(var name in this.names){if(!this.names[name][0]){console.log('nonlocal error, C '+C)
$pos=this.names[name][1]
$_SyntaxError(C,["no binding for nonlocal '"+
name+"' found"])}}}}
this.to_js=function(){this.js_processed=true
return ''}}
var $NotCtx=$B.parser.$NotCtx=function(C){
this.type='not'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return 'not ('+this.tree+')'}
this.to_js=function(){this.js_processed=true
return '!$B.$bool('+$to_js(this.tree)+')'}}
var $OpCtx=$B.parser.$OpCtx=function(C,op){
this.type='op'
this.op=op
this.parent=C.parent
this.tree=[C]
this.scope=$get_scope(this)
if(C.type=="expr"){if(['int','float','str'].indexOf(C.tree[0].type)>-1){this.left_type=C.tree[0].type}else if(C.tree[0].type=="id"){var binding=this.scope.binding[C.tree[0].value]
if(binding){this.left_type=binding.type}}}
C.parent.tree.pop()
C.parent.tree.push(this)
this.toString=function(){return '(op '+this.op+') ['+this.tree+']'}
this.to_js=function(){this.js_processed=true
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
return 'typeof '+js0+' == "number" ? '+
js0+this.op+js1+' : $B.rich_comp("__'+
method+'__",'+this.tree[0].to_js()+
','+this.tree[1].to_js()+')'}
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
return 'typeof '+js0+' == "string" ? '+
js0+this.op+js1+' : $B.rich_comp("__'+
method+'__",'+this.tree[0].to_js()+
','+this.tree[1].to_js()+')'}
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
return 'float.$factory('+op+x.value+')'
case 'imaginary':
return '$B.make_complex(0,'+op+x.value+')'}}
return '$B.$getattr('+this.tree[1].to_js()+',"'+
method+'")()'
case 'is':
return '$B.$is('+this.tree[0].to_js()+', '+
this.tree[1].to_js()+')'
case 'is_not':
return this.tree[0].to_js()+'!=='+this.tree[1].to_js()
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
this.simple_js=function(){function sjs(elt){if(elt.type=='op'){return elt.simple_js()}
else if(elt.type=='expr' && elt.tree[0].type=='list_or_tuple'
&& elt.tree[0].real=='tuple'
&& elt.tree[0].tree.length==1
&& elt.tree[0].tree[0].type=='expr'){return '('+elt.tree[0].tree[0].tree[0].simple_js()+')'}else{return elt.tree[0].to_js()}}
if(op=='+'){return '$B.add('+sjs(this.tree[0])+','+
sjs(this.tree[1])+')'}else if(op=='-'){return '$B.sub('+sjs(this.tree[0])+','+
sjs(this.tree[1])+')'}else if(op=='*'){return '$B.mul('+sjs(this.tree[0])+','+
sjs(this.tree[1])+')'}else if(op=='/'){return '$B.div('+sjs(this.tree[0])+','+
sjs(this.tree[1])+')'}else{return sjs(this.tree[0])+op+sjs(this.tree[1])}}}
var $PackedCtx=$B.parser.$PackedCtx=function(C){
this.type='packed'
if(C.parent.type=='list_or_tuple' &&
C.parent.parent.type=="node"){
for(var i=0;i < C.parent.tree.length;i++){var child=C.parent.tree[i]
if(child.type=='expr' && child.tree.length > 0
&& child.tree[0].type=='packed'){$_SyntaxError(C,["two starred expressions in assignment"])}}}
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(packed) '+this.tree}
this.to_js=function(){this.js_processed=true
return $to_js(this.tree)}}
var $PassCtx=$B.parser.$PassCtx=function(C){
this.type='pass'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(pass)'}
this.to_js=function(){this.js_processed=true
return 'void(0)'}}
var $RaiseCtx=$B.parser.$RaiseCtx=function(C){
this.type='raise'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return ' (raise) '+this.tree}
this.to_js=function(){this.js_processed=true
var res=''
if(this.tree.length==0){return '$B.$raise()'}
var exc_js=this.tree[0].to_js()
return '$B.$raise('+exc_js+')'}}
var $RawJSCtx=$B.parser.$RawJSCtx=function(C,js){this.type="raw_js"
C.tree[C.tree.length]=this
this.parent=C
this.toString=function(){return '(js) '+js}
this.to_js=function(){this.js_processed=true
return js}}
var $ReturnCtx=$B.parser.$ReturnCtx=function(C){
this.type='return'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.scope=$get_scope(this)
if(["def","generator"].indexOf(this.scope.ntype)==-1){$_SyntaxError(C,["'return' outside function"])}
var node=$get_node(this)
while(node.parent){if(node.parent.C){var elt=node.parent.C.tree[0]
if(elt.type=='for'){elt.has_return=true
break}else if(elt.type=='try'){elt.has_return=true}else if(elt.type=='single_kw' && elt.token=='finally'){elt.has_return=true}}
node=node.parent}
this.toString=function(){return 'return '+this.tree}
this.to_js=function(){this.js_processed=true
if(this.tree.length==1 && this.tree[0].type=='abstract_expr'){
this.tree.pop()
new $IdCtx(new $ExprCtx(this,'rvalue',false),'None')}
var scope=this.scope
if(scope.ntype=='generator'){return 'return [$B.generator_return('+$to_js(this.tree)+')]'}
var js='var $res = '+$to_js(this.tree)+';'+'$B.leave_frame'
if(scope.id.substr(0,6)=='$exec_'){js+='_exec'}
return js+'("'+scope.id+'");return $res'}}
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
this.loop_num=elt.loop_num}}}
this.toString=function(){return this.token}
this.transform=function(node,rank){
if(this.token=='finally'){var scope=$get_scope(this)
if(scope.ntype !='generator'){node.insert(0,$NodeJS('var $exit;'+
'if($B.frames_stack.length<$stack_length){'+
'$exit = true;'+
'$B.frames_stack.push($top_frame)'+
'}')
)
var scope_id=scope.id.replace(/\./g,'_')
var last_child=node.children[node.children.length-1]
if(last_child.C.tree[0].type !="return"){node.add($NodeJS('if($exit){$B.leave_frame()}'))}}}}
this.to_js=function(){this.js_processed=true
if(this.token=='finally'){return this.token}
if(this.loop_num !==undefined){var scope=$get_scope(this)
var res='if($locals_'+scope.id.replace(/\./g,'_')
return res+'["$no_break'+this.loop_num+'"])'}
return this.token}}
var $SliceCtx=$B.parser.$SliceCtx=function(C){
this.type='slice'
this.parent=C
this.tree=C.tree.length > 0 ?[C.tree.pop()]:[]
C.tree.push(this)
this.to_js=function(){for(var i=0;i < this.tree.length;i++){if(this.tree[i].type=="abstract_expr"){this.tree[i].to_js=function(){return "None"}}}
return "slice.$factory("+$to_js(this.tree)+")"}}
var $StarArgCtx=$B.parser.$StarArgCtx=function(C){
this.type='star_arg'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.toString=function(){return '(star arg) '+this.tree}
this.to_js=function(){this.js_processed=true
return '{$nat:"ptuple",arg:'+$to_js(this.tree)+'}'}}
var $StringCtx=$B.parser.$StringCtx=function(C,value){
this.type='str'
this.parent=C
this.tree=[value]
C.tree[C.tree.length]=this
this.raw=false
this.toString=function(){return 'string '+(this.tree ||'')}
this.to_js=function(){this.js_processed=true
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
while("\n;".indexOf(expr1.charAt(expr1.length-1))>-1){expr1=expr1.substr(0,expr1.length-1)}
break}
break}}
switch(parsed_fstring[i].conversion){case "a":
expr1='$B.builtins.ascii('+expr1+')'
break
case "r":
expr1='$B.builtins.repr('+expr1+')'
break
case "s":
expr1='$B.builtins.str.$factory('+expr1+')'
break}
var fmt=parts[1]
if(fmt !==undefined){
var parsed_fmt=$B.parse_fstring(fmt)
if(parsed_fmt.length > 1){fmt=fstring(parsed_fmt)}else{fmt="'"+fmt+"'"}
var res1="$B.builtins.str.format('{0:' + "+
fmt+" + '}', "+expr1+")"
elts.push(res1)}else{if(parsed_fstring[i].conversion===null){expr1='$B.builtins.str.$factory('+expr1+')'}
elts.push(expr1)}}else{var re=new RegExp("'","g")
var elt=parsed_fstring[i].replace(re,"\\'")
.replace(/\n/g,"\\n")
elts.push("'"+elt+"'")}}
return elts.join(' + ')}
function prepare(value){value=value.replace(/\n/g,'\\n\\\n')
value=value.replace(/\\U([A-Fa-f0-9]{8})/gm,function(mo){return String.fromCharCode("0x"+mo.slice(2))})
return value}
for(var i=0;i < this.tree.length;i++){if(this.tree[i].type=="call"){
var js='(function(){throw TypeError.$factory("'+"'str'"+
' object is not callable")}())'
return js}else{var value=this.tree[i],is_fstring=Array.isArray(value),is_bytes=false
if(!is_fstring){is_bytes=value.charAt(0)=='b'}
if(type==null){type=is_bytes
if(is_bytes){res+='bytes.$factory('}}else if(type !=is_bytes){return '$B.$TypeError("can\'t concat bytes to str")'}
if(!is_bytes){if(is_fstring){res+=fstring(value)}else{res+=prepare(value)}}else{res+=prepare(value.substr(1))}
if(i < this.tree.length-1){res+='+'}}}
if(is_bytes){res+=',"ISO-8859-1")'}
if(res.length==0){res='""'}
return res}}
var $SubCtx=$B.parser.$SubCtx=function(C){
this.type='sub'
this.func='getitem' 
this.value=C.tree[0]
C.tree.pop()
C.tree[C.tree.length]=this
this.parent=C
this.tree=[]
this.toString=function(){return '(sub) (value) '+this.value+' (tree) '+this.tree}
this.to_js=function(){this.js_processed=true
if(this.func=='getitem' && this.value.type=='id'){var type=$get_node(this).locals[this.value.value],val=this.value.to_js()
if(type=='list' ||type=='tuple'){if(this.tree.length==1){return '$B.list_key('+val+
', '+this.tree[0].to_js()+')'}else if(this.tree.length==2){return '$B.list_slice('+val+
', '+(this.tree[0].to_js()||"null")+','+
(this.tree[1].to_js()||"null")+')'}else if(this.tree.length==3){return '$B.list_slice_step('+val+
', '+(this.tree[0].to_js()||"null")+','+
(this.tree[1].to_js()||"null")+','+
(this.tree[2].to_js()||"null")+')'}}}
if(this.func=='getitem' && this.tree.length==1){return '$B.$getitem('+this.value.to_js()+','+
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
this.tree.forEach(function(elt){if(elt.type=='abstract_expr'){res1.push('None')}
else{res1.push(elt.to_js())}})
res+='tuple.$factory(['+res1.join(',')+']))'}
return shortcut ? res+')' :res}}
var $TargetListCtx=$B.parser.$TargetListCtx=function(C){
this.type='target_list'
this.parent=C
this.tree=[]
this.expect='id'
C.tree[C.tree.length]=this
this.toString=function(){return '(target list) '+this.tree}
this.to_js=function(){this.js_processed=true
return $to_js(this.tree)}}
var $TernaryCtx=$B.parser.$TernaryCtx=function(C){
this.type='ternary'
this.parent=C.parent
C.parent.tree.pop()
C.parent.tree.push(this)
C.parent=this
this.tree=[C]
this.toString=function(){return '(ternary) '+this.tree}
this.to_js=function(){this.js_processed=true
var res='$B.$bool('+this.tree[1].to_js()+') ? ' 
res+=this.tree[0].to_js()+' : ' 
return res+this.tree[2].to_js()}}
var $TryCtx=$B.parser.$TryCtx=function(C){
this.type='try'
this.parent=C
C.tree[C.tree.length]=this
this.toString=function(){return '(try) '}
this.transform=function(node,rank){if(node.parent.children.length==rank+1){$_SyntaxError(C,"missing clause after 'try'")}else{var next_ctx=node.parent.children[rank+1].C.tree[0]
switch(next_ctx.type){case 'except':
case 'finally':
case 'single_kw':
break
default:
$_SyntaxError(C,"missing clause after 'try'")}}
var scope=$get_scope(this)
var error_name=create_temp_name('$err')
var failed_name="$locals."+create_temp_name('$failed')
var js=failed_name+' = false;\n'+
' '.repeat(node.indent+4)+'try'
new $NodeJSCtx(node,js)
node.is_try=true 
node.has_return=this.has_return
var catch_node=$NodeJS('catch('+error_name+')')
catch_node.is_catch=true
node.parent.insert(rank+1,catch_node)
catch_node.add($NodeJS("$B.set_exc("+error_name+")"))
catch_node.add(
$NodeJS(failed_name+' = true;'+
'$B.pmframe = $B.last($B.frames_stack);'+
'if(0){}')
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
this.to_js=function(){this.js_processed=true
return 'try'}}
var $UnaryCtx=$B.parser.$UnaryCtx=function(C,op){
this.type='unary'
this.op=op
this.parent=C
C.tree[C.tree.length]=this
this.toString=function(){return '(unary) '+this.op}
this.to_js=function(){this.js_processed=true
return this.op}}
var $WithCtx=$B.parser.$WithCtx=function(C){
this.type='with'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.expect='as'
this.scope=$get_scope(this)
this.toString=function(){return '(with) '+this.tree}
this.set_alias=function(ctx){var ids=[]
if(ctx.type=="id"){ids=[ctx]}else if(ctx.type=="list_or_tuple"){
ctx.tree.forEach(function(expr){if(expr.type=="expr" && expr.tree[0].type=="id"){ids.push(expr.tree[0])}})}
for(var i=0,len=ids.length;i < len;i++){var id_ctx=ids[i]
$bind(id_ctx.value,this.scope,this)
id_ctx.bound=true
if(this.scope.ntype !=='module'){
this.scope.C.tree[0].locals.push(id_ctx.value)}}}
this.transform=function(node,rank){while(this.tree.length > 1){
var suite=node.children,item=this.tree.pop(),new_node=new $Node(),ctx=new $NodeCtx(new_node),with_ctx=new $WithCtx(ctx)
item.parent=with_ctx
with_ctx.tree=[item]
with_ctx.async=this.async
suite.forEach(function(elt){new_node.add(elt)})
node.children=[new_node]}
if(this.transformed){return}
this.prefix=""
if(this.scope.ntype=="generator"){this.prefix="$locals."}
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
top_try_node.is_try=true
node.parent.insert(rank+1,top_try_node)
var num=this.num=$loop_num++
top_try_node.ctx_manager_num=num
this.cm_name=this.prefix+'$ctx_manager'+num
this.cmexit_name=this.prefix+'$ctx_manager_exit'+num
this.exc_name=this.prefix+'$exc'+num
this.err_name='$err'+num
this.val_name='$value'+num
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
try_node.is_try=true
new $NodeJSCtx(try_node,'try')
top_try_node.add(try_node)
if(this.tree[0].alias){var alias=this.tree[0].alias.tree[0].tree[0].value
try_node.add($NodeJS('$locals'+'["'+alias+'"] = '+
this.val_name))}
block.forEach(function(elt){try_node.add(elt)})
var catch_node=new $Node()
catch_node.is_catch=true 
new $NodeJSCtx(catch_node,'catch('+this.err_name+')')
var js=this.exc_name+' = false;'+this.err_name+
' = $B.exception('+this.err_name+')\n'+
' '.repeat(node.indent+4)+
'var $b = '+this.cmexit_name+'('+
this.err_name+'.__class__,'+
this.err_name+','+
'$B.$getattr('+this.err_name+', "__traceback__"));'
if(this.scope.ntype=="generator"){js+='delete '+this.cmexit_name+';'}
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
if(this.scope.ntype=="generator"){js+=' && (!$yield)'+
' && '+this.cmexit_name}
js+='){;'+this.cmexit_name+'(None,None,None);'
if(this.scope.ntype=="generator"){js+='delete '+this.cmexit_name}
js+='}'
if(this.scope.ntype=="generator"){js+='$yield = undefined'}
finally_node.add($NodeJS(js))
node.parent.insert(rank+2,finally_node)
this.transformed=true}
this.transform_async=function(node,rank){
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
'await $B.promise('+cmenter_name+')'
new_nodes.push($NodeJS(js))}else{
var new_node=new $Node(),ctx=new $NodeCtx(new_node),expr=new $ExprCtx(ctx,"left",false)
expr.tree.push(alias.tree[0].tree[0])
alias.tree[0].tree[0].parent=expr
var assign=new $AssignCtx(expr)
new $RawJSCtx(assign,'await $B.promise('+
cmenter_name+')')
new_nodes.push(new_node)}}else{new_nodes.push($NodeJS('await $B.promise('+cmenter_name+')'))}
var try_node=new $NodeJS('try')
node.children.forEach(function(child){try_node.add(child)})
new_nodes.push(try_node)
var catch_node=new $NodeJS('catch(err)')
new_nodes.push(catch_node)
catch_node.add($NodeJS(this.exc_name+' = true'))
catch_node.add($NodeJS('var '+err_name+
' = $B.imported["_sys"].exc_info()'))
var if_node=$NodeJS('if(! await $B.promise('+
this.cmexit_name+'('+this.cm_name+', '+err_name+'[0], '+
err_name+'[1], '+err_name+'[2])))')
catch_node.add(if_node)
if_node.add($NodeJS('$B.$raise()'))
var else_node=$NodeJS('if(! '+this.exc_name+')')
new_nodes.push(else_node)
else_node.add($NodeJS('await $B.promise('+this.cmexit_name+'('+
this.cm_name+', _b_.None, _b_.None, _b_.None))'))
node.parent.children.splice(rank,1)
for(var i=new_nodes.length-1;i >=0;i--){node.parent.insert(rank,new_nodes[i])}
node.children=[]
return 0}
this.to_js=function(){this.js_processed=true
var indent=$get_node(this).indent,h=' '.repeat(indent),num=this.num
var head=this.prefix=="" ? "var " :this.prefix,cm_name='$ctx_manager'+num,cme_name=head+'$ctx_manager_exit'+num,exc_name=head+'$exc'+num,val_name='$value'+num
return 'var '+cm_name+' = '+this.tree[0].to_js()+'\n'+
h+cme_name+' = $B.$getattr('+cm_name+',"__exit__")\n'+
h+'var '+val_name+' = $B.$getattr('+cm_name+',"__enter__")()\n'+
h+exc_name+' = true\n'}}
var $YieldCtx=$B.parser.$YieldCtx=function(C,is_await){
this.type='yield'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
var in_lambda=false,parent=C
while(parent){if(parent.type=="lambda"){in_lambda=true
break}
parent=parent.parent}
if(! in_lambda){switch(C.type){case 'node':
break;
case 'assign':
case 'tuple':
case 'list_or_tuple':
$get_node(C).yield_atoms.push(this)
break
default:
$_SyntaxError(C,'yield atom must be inside ()')}}
var scope=this.scope=$get_scope(this,true)
if(! in_lambda){var in_func=scope.is_function,func_scope=scope
if(! in_func && scope.is_comp){var parent=scope.parent_block
while(parent.is_comp){parent=parent_block}
in_func=parent.is_function
func_scope=parent}
if(! in_func){$_SyntaxError(C,["'yield' outside function"])}}
if(! in_lambda){var def=func_scope.C.tree[0]
if(! is_await){def.type='generator'
func_scope.ntype='generator'}
def.yields.push(this)}
this.toString=function(){return '(yield) '+(this.from ? '(from) ' :'')+this.tree}
this.transform=function(node,rank){
var new_node=$NodeJS('// placeholder for generator sent value')
new_node.is_set_yield_value=true
new_node.after_yield=true
new_node.indent=node.indent
node.parent.insert(rank+1,new_node)
var parent=node.parent
while(parent){if(parent.ctx_manager_num !==undefined){node.parent.insert(rank+2,$NodeJS("$top_frame[1].$has_yield_in_cm = true"))
break}
parent=parent.parent}}
this.to_js=function(){this.js_processed=true
if(this.from===undefined){return $to_js(this.tree)||'None'}
return $to_js(this.tree)}}
var $add_profile=$B.parser.$add_profile=function(node,rank){if(node.type=='module'){var i=0
while(i < node.children.length){i+=$add_profile(node.children[i],i)}}else{var elt=node.C.tree[0],offset=1,flag=true,pnode=node
while(pnode.parent !==undefined){pnode=pnode.parent}
var mod_id=pnode.id
if(node.line_num===undefined){flag=false}
if(elt.type=='condition' && elt.token=='elif'){flag=false}
else if(elt.type=='except'){flag=false}
else if(elt.type=='single_kw'){flag=false}
if(flag){
var new_node=new $Node()
new $NodeJSCtx(new_node,';$B.$profile.count("'+mod_id+'",'+node.line_num+');')
node.parent.insert(rank,new_node)
offset=2}
var i=0
while(i < node.children.length){i+=$add_profile(node.children[i],i)}
return offset}}
var $add_line_num=$B.parser.$add_line_num=function(node,rank){if(node.type=='module'){var i=0
while(i < node.children.length){i+=$add_line_num(node.children[i],i)}}else if(node.type !=='marker'){var elt=node.C.tree[0],offset=1,flag=true,pnode=node
while(pnode.parent !==undefined){pnode=pnode.parent}
var mod_id=pnode.id
var line_num=node.line_num ||node.forced_line_num
if(line_num===undefined){flag=false}
if(elt.type=='condition' && elt.token=='elif'){flag=false}
else if(elt.type=='except'){flag=false}
else if(elt.type=='single_kw'){flag=false}
if(flag){
var js=';$locals.$line_info = "'+line_num+','+
mod_id+'";'
var new_node=new $Node()
new_node.is_line_num=true 
new $NodeJSCtx(new_node,js)
node.parent.insert(rank,new_node)
offset=2}
var i=0
while(i < node.children.length){i+=$add_line_num(node.children[i],i)}
if((elt.type=='condition' && elt.token=="while")
||node.C.type=='for'){if($B.last(node.children).C.tree[0].type !="return"){node.add($NodeJS('$locals.$line_info = "'+line_num+
','+mod_id+'";'))}}
return offset}else{return 1}}
$B.$add_line_num=$add_line_num
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
var ctx_node=C.parent
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
if(tree_node.ntype=="module"){return tree_node}
var scope=null
while(tree_node.parent.type !='module'){tree_node=tree_node.parent}
var scope=tree_node.parent 
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
switch(C.type){case 'abstract_expr':
var packed=C.packed,is_await=C.is_await,assign=C.assign
if(! assign){switch(token){case 'id':
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
case 'yield':
C.parent.tree.pop()
var commas=C.with_commas
C=C.parent
C.packed=packed
C.is_await=is_await
if(assign){console.log("set assign to parent",C)
C.assign=assign}}}
switch(token){case 'await':
return new $AwaitCtx(C)
case 'id':
return new $IdCtx(new $ExprCtx(C,'id',commas),value)
case 'str':
return new $StringCtx(new $ExprCtx(C,'str',commas),value)
case 'bytes':
return new $StringCtx(new $ExprCtx(C,'bytes',commas),value)
case 'int':
return new $IntCtx(new $ExprCtx(C,'int',commas),value)
case 'float':
return new $FloatCtx(new $ExprCtx(C,'float',commas),value)
case 'imaginary':
return new $ImaginaryCtx(
new $ExprCtx(C,'imaginary',commas),value)
case '(':
return new $ListOrTupleCtx(
new $ExprCtx(C,'tuple',commas),'tuple')
case '[':
return new $ListOrTupleCtx(
new $ExprCtx(C,'list',commas),'list')
case '{':
return new $DictOrSetCtx(
new $ExprCtx(C,'dict_or_set',commas))
case '.':
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
new $ExprCtx(C,'not',commas))}
$_SyntaxError(C,'token '+token+' after '+
C)
case '=':
$_SyntaxError(C,token)
case 'yield':
return new $AbstractExprCtx(new $YieldCtx(C),true)
case ':':
if(C.parent.type=="sub" ||
(C.parent.type=="list_or_tuple" &&
C.parent.parent.type=="sub")){return new $AbstractExprCtx(new $SliceCtx(C.parent),false)}
return $transition(C.parent,token,value)
case ')':
case ',':
switch(C.parent.type){case 'slice':
case 'list_or_tuple':
case 'call_arg':
case 'op':
case 'yield':
break
default:
$_SyntaxError(C,token)}}
return $transition(C.parent,token,value)
case 'annotation':
if(token=="eol" && C.tree.length==1 &&
C.tree[0].tree.length==0){$_SyntaxError(C,"empty annotation")}else if(token==':' && C.parent.type !="def"){$_SyntaxError(C,"more than one annotation")}else if(token=="augm_assign"){$_SyntaxError(C,"augmented assign as annotation")}else if(token=="op"){$_SyntaxError(C,"operator as annotation")}
return $transition(C.parent,token)
case 'assert':
if(token=='eol'){return $transition(C.parent,token)}
$_SyntaxError(C,token)
case 'assign':
if(token=='eol'){if(C.tree[1].type=='abstract_expr'){$_SyntaxError(C,'token '+token+' after '+
C)}
C.guess_type()
return $transition(C.parent,'eol')}
$_SyntaxError(C,'token '+token+' after '+C)
case 'async':
if(token=="def"){return $transition(C.parent,token,value)}else if(token=="for" ||token=="with"){var ntype=$get_scope(C).ntype
if(ntype !=="def" && ntype !="generator"){$_SyntaxError(C,["'async "+token+
"' outside async function"])}
var ctx=$transition(C.parent,token,value)
ctx.parent.async=true 
return ctx}
$_SyntaxError(C,'token '+token+' after '+C)
case 'attribute':
if(token==='id'){var name=value
if(noassign[name]===true){$_SyntaxError(C,["cannot assign to "+name])}
name=$mangle(name,C)
C.name=name
return C.parent}
$_SyntaxError(C,token)
case 'augm_assign':
if(token=='eol'){if(C.tree[1].type=='abstract_expr'){$_SyntaxError(C,'token '+token+' after '+
C)}
return $transition(C.parent,'eol')}
$_SyntaxError(C,'token '+token+' after '+C)
case 'await':
C.parent.is_await=true
return $transition(C.parent,token,value)
case 'break':
if(token=='eol'){return $transition(C.parent,'eol')}
$_SyntaxError(C,token)
case 'call':
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
$_SyntaxError(C,token)}
return $transition(C.parent,token,value)
case 'call_arg':
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
indexOf($B.last(C.parent.tree).tree[0].type)==-1){$_SyntaxError(C,['non-keyword arg after keyword arg'])}
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
indexOf($B.last(C.parent.tree).tree[0].type)==-1){$_SyntaxError(C,['non-keyword arg after keyword arg'])}
return $transition(C.parent,token,value)}}
$_SyntaxError(C,'token '+token+' after '+C)
case 'class':
switch(token){case 'id':
if(C.expect=='id'){C.set_name(value)
C.expect='(:'
return C}
break
case '(':
return new $CallCtx(C)
case ':':
return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'comp_if':
return $transition(C.parent,token,value)
case 'comp_for':
if(token=='in' && C.expect=='in'){C.expect=null
return new $AbstractExprCtx(new $CompIterableCtx(C),true)}
if(C.expect===null){
return $transition(C.parent,token,value)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'comp_iterable':
return $transition(C.parent,token,value)
case 'comprehension':
switch(token){case 'if':
return new $AbstractExprCtx(new $CompIfCtx(C),false)
case 'for':
return new $TargetListCtx(new $CompForCtx(C))}
return $transition(C.parent,token,value)
case 'condition':
if(token==':'){if(C.tree[0].type=="abstract_expr" &&
C.tree[0].tree.length==0){
$_SyntaxError(C,'token '+token+' after '+C)}
return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'continue':
if(token=='eol'){return C.parent}
$_SyntaxError(C,'token '+token+' after '+C)
case 'ctx_manager_alias':
switch(token){case ',':
case ':':
C.parent.set_alias(C.tree[0].tree[0])
return $transition(C.parent,token,value)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'decorator':
if(token=='id' && C.tree.length==0){return $transition(new $DecoratorExprCtx(C),token,value)}
if(token=='eol'){return $transition(C.parent,token)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'decorator_expression':
if(C.expects===undefined){if(token=="id"){C.names.push(value)
C.expects="."
return C}
$_SyntaxError(C,'token '+token+' after '+C)}else if(C.is_call && token !=="eol"){$_SyntaxError(C,'token '+token+' after '+C)}else if(token=="id" && C.expects=="id"){C.names.push(value)
C.expects="."
return C}else if(token=="." && C.expects=="."){C.expects="id"
return C}else if(token=="(" && C.expects=="."){if(! C.is_call){C.is_call=true
return new $CallCtx(C)}}else if(token=='eol'){return $transition(C.parent,token)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'def':
switch(token){case 'id':
if(C.name){$_SyntaxError(C,'token '+token+' after '+C)}
C.set_name(value)
return C
case '(':
if(C.name==null){$_SyntaxError(C,'token '+token+
' after '+C)}
C.has_args=true;
return new $FuncArgs(C)
case 'annotation':
return new $AbstractExprCtx(new $AnnotationCtx(C),true)
case ':':
if(C.has_args){return $BodyCtx(C)}}
$_SyntaxError(C,'token '+token+' after '+C)
case 'del':
if(token=='eol'){return $transition(C.parent,token)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'dict_or_set':
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
if(C.real=='dict_or_set'){C.real='set_comp'}
else{C.real='dict_comp'}
var lst=new $ListOrTupleCtx(C,'dict_or_set_comp')
lst.intervals=[C.start+1]
lst.vars=C.vars
C.tree.pop()
lst.expression=C.tree
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
return $transition(C.parent,token,value)}
case 'double_star_arg':
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
$_SyntaxError(C,'token '+token+' after '+C)
case 'ellipsis':
if(token=='.'){C.nbdots++
if(C.nbdots==3 && $pos-C.start==2){C.$complete=true}
return C}else{if(! C.$complete){$pos--
$_SyntaxError(C,'token '+token+' after '+
C)}else{return $transition(C.parent,token,value)}}
case 'end_positional':
if(token=="," ||token==")"){return $transition(C.parent,token,value)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'except':
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
$_SyntaxError(C,'token '+token+' after '+C.expect)
case 'expr':
switch(token){case 'bytes':
case 'float':
case 'id':
case 'imaginary':
case 'int':
case 'lambda':
case 'pass':
case 'str':
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
break
case ',':
if(C.expect==','){if(C.with_commas){if($parent_match(C,{type:"yield","from":true})){$_SyntaxError(C,"no implicit tuple for yield from")}
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
var parent=C.parent
while(parent){if(parent.type=="assign" ||parent.type=="augm_assign"){$_SyntaxError(C,"augmented assign inside assign")}else if(parent.type=="op"){$_SyntaxError(C,["can't assign to operator"])}
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
if(C.tree[0].type !="id"){$_SyntaxError(C,["keyword can't be an expression"])}
return new $AbstractExprCtx(new $KwArgCtx(C),true)}else if(annotation=has_parent(C,"annotation")){return $transition(annotation,token,value)}else if(C.parent.type=="op"){
$_SyntaxError(C,["can't assign to operator"])}else if(C.parent.type=="list_or_tuple"){
for(var i=0;i < C.parent.tree.length;i++){var item=C.parent.tree[i]
if(item.type=="expr" && item.name=="operand"){$_SyntaxError(C,["can't assign to operator"])}}}
while(C.parent !==undefined){C=C.parent
if(C.type=="condition"){$_SyntaxError(C,'token '+token+' after '
+C)}else if(C.type=="augm_assign"){$_SyntaxError(C,"assign inside augmented assign")}}
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
$_SyntaxError(C,':= invalid, parent '+ptype)}
if(C.tree.length==1 &&
C.tree[0].type=="id"){var scope=$get_scope(C),name=C.tree[0].value
while(scope.is_comp){scope=scope.parent_block}
$bind(name,scope,C)
var parent=C.parent
parent.tree.pop()
var assign_expr=new $AbstractExprCtx(parent,false)
assign_expr.assign=C.tree[0]
return assign_expr}
$_SyntaxError(C,'token '+token+' after '+C)
case 'if':
var in_comp=false,ctx=C.parent
while(true){if(ctx.type=="list_or_tuple"){
break}else if(ctx.type=='comp_for' ||ctx.type=="comp_if"){in_comp=true
break}
if(ctx.parent !==undefined){ctx=ctx.parent}
else{break}}
if(in_comp){break}
var ctx=C
while(ctx.parent && ctx.parent.type=='op'){ctx=ctx.parent
if(ctx.type=='expr' &&
ctx.parent && ctx.parent.type=='op'){ctx=ctx.parent}}
return new $AbstractExprCtx(new $TernaryCtx(ctx),false)
case 'eol':
if(C.tree.length==2 &&
C.tree[0].type=="id" &&
["print","exec"].indexOf(C.tree[0].value)>-1){$_SyntaxError(C,["Missing parentheses in call "+
"to '"+C.tree[0].value+"'."])}
if(["dict_or_set","list_or_tuple"].indexOf(C.parent.type)==-1){var t=C.tree[0]
if(t.type=="packed" ||
(t.type=="call" && t.func.type=="packed")){$_SyntaxError(C,["can't use starred expression here"])}}}
return $transition(C.parent,token)
case 'expr_not':
if(token=='in'){
C.parent.tree.pop()
return new $AbstractExprCtx(
new $OpCtx(C.parent,'not_in'),false)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'for':
switch(token){case 'in':
return new $AbstractExprCtx(
new $ExprCtx(C,'target list',true),false)
case ':':
if(C.tree.length < 2 
||C.tree[1].tree[0].type=="abstract_expr"){$_SyntaxError(C,'token '+token+' after '+
C)}
return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'from':
switch(token){case 'id':
if(C.expect=='id'){C.add_name(value)
C.expect=','
return C}
if(C.expect=='alias'){C.aliases[C.names[C.names.length-1]]=
value
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
$_SyntaxError(C,'token '+token+' after '+C)
case 'func_arg_id':
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
if(C.has_default){
$_SyntaxError(C,'token '+token+' after '+
C)}
return new $AbstractExprCtx(new $AnnotationCtx(C),false)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'func_args':
switch(token){case 'id':
if(C.has_kw_arg){$_SyntaxError(C,'duplicate kw arg')}
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
if(C.has_kw_arg){$_SyntaxError(C,'duplicate kw arg')}
var op=value
C.expect=','
if(op=='*'){if(C.has_star_arg){$_SyntaxError(C,'duplicate star arg')}
return new $FuncStarArgCtx(C,'*')}else if(op=='**'){return new $FuncStarArgCtx(C,'**')}else if(op=='/'){
if(C.has_end_positional){$_SyntaxError(C,['duplicate / in function parameters'])}else if(C.has_star_arg){$_SyntaxError(C,['/ after * in function parameters'])}
return new $EndOfPositionalCtx(C)}
$_SyntaxError(C,'token '+op+' after '+C)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'func_star_arg':
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
if(C.name===undefined){$_SyntaxError(C,'annotation on an unnamed parameter')}
return new $AbstractExprCtx(
new $AnnotationCtx(C),false)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'global':
case 'nonlocal':
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
$_SyntaxError(C,'token '+token+' after '+C)
case 'id':
switch(token){case '=':
if(C.parent.type=='expr' &&
C.parent.parent !==undefined &&
C.parent.parent.type=='call_arg'){return new $AbstractExprCtx(
new $KwArgCtx(C.parent),false)}
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
if(C.value=="async"){
if(token=='def'){C.parent.parent.tree=[]
var ctx=$transition(C.parent.parent,token,value)
ctx.async=true
return ctx}}
return $transition(C.parent,token,value)
case 'import':
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
$_SyntaxError(C,'token '+token+' after '+C)
case 'imaginary':
case 'int':
case 'float':
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
$_SyntaxError(C,'token '+token+' after '+
C)}
return $transition(C.parent,token,value)
case 'kwarg':
if(token==','){return new $CallArgCtx(C.parent.parent)}
return $transition(C.parent,token)
case 'lambda':
if(token==':' && C.args===undefined){C.args=C.tree
C.tree=[]
C.body_start=$pos
return new $AbstractExprCtx(C,false)}if(C.args !==undefined){
C.body_end=$pos
return $transition(C.parent,token)}
if(C.args===undefined && token !="("){return $transition(new $CallCtx(C),token,value)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'list_or_tuple':
if(C.closed){if(token=='['){return new $AbstractExprCtx(
new $SubCtx(C.parent),false)}
if(token=='('){return new $CallCtx(C.parent)}
return $transition(C.parent,token,value)}else{if(C.expect==','){switch(C.real){case 'tuple':
case 'gen_expr':
if(token==')'){while(C.type=="list_or_tuple" &&
C.real=="tuple" &&
C.parent.type=="expr" &&
C.parent.parent.type=="node" &&
C.tree.length==1){
var node=C.parent.parent,ix=node.tree.indexOf(C.parent),expr=C.tree[0]
expr.parent=node
expr.$in_parens=true 
node.tree.splice(ix,1,expr)
C=expr.tree[0]}
C.closed=true
if(C.real=='gen_expr'){C.intervals.push($pos)}
if(C.parent.type=="packed"){return C.parent.parent}
return C.parent}
break
case 'list':
case 'list_comp':
if(token==']'){C.closed=true
if(C.real=='list_comp'){C.intervals.push($pos)}
if(C.parent.type=="packed"){if(C.parent.tree.length > 0){return C.parent.tree[0]}else{return C.parent.parent}}
return C.parent}
break
case 'dict_or_set_comp':
if(token=='}'){C.intervals.push($pos)
return $transition(C.parent,token)}
break}
switch(token){case ',':
if(C.real=='tuple'){C.has_comma=true}
C.expect='id'
return C
case 'for':
if(C.real=='list'){C.real='list_comp'}
else{C.real='gen_expr'}
C.intervals=[C.start+1]
C.expression=C.tree
C.tree=[]
var comp=new $ComprehensionCtx(C)
return new $TargetListCtx(new $CompForCtx(comp))}
return $transition(C.parent,token,value)}else if(C.expect=='id'){switch(C.real){case 'tuple':
if(token==')'){C.closed=true
return C.parent}
if(token=='eol' && C.implicit===true){C.closed=true
return $transition(C.parent,token)}
break
case 'gen_expr':
if(token==')'){C.closed=true
return $transition(C.parent,token)}
break
case 'list':
if(token==']'){C.closed=true
return C}
break}
switch(token){case '=':
if(C.real=='tuple' &&
C.implicit===true){C.closed=true
C.parent.tree.pop()
var expr=new $ExprCtx(C.parent,'tuple',false)
expr.tree=[C]
C.parent=expr
return $transition(C.parent,token)}
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
return $transition(expr,token,value)}}else{return $transition(C.parent,token,value)}}
case 'list_comp':
switch(token){case ']':
return C.parent
case 'in':
return new $ExprCtx(C,'iterable',true)
case 'if':
return new $ExprCtx(C,'condition',true)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'node':
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
case '.':
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,value)
case 'op':
switch(value){case '*':
case '+':
case '-':
case '~':
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,value)}
break
case 'async':
return new $AsyncCtx(C)
case 'await':
return new $AbstractExprCtx(new $AwaitCtx(C),true)
case 'class':
return new $ClassCtx(C)
case 'continue':
return new $ContinueCtx(C)
case '__debugger__':
return new $DebuggerCtx(C)
case 'break':
return new $BreakCtx(C)
case 'def':
return new $DefCtx(C)
case 'for':
return new $TargetListCtx(new $ForExpr(C))
case 'if':
case 'while':
return new $AbstractExprCtx(
new $ConditionCtx(C,token),false)
case 'elif':
var previous=$previous(C)
if(['condition'].indexOf(previous.type)==-1 ||
previous.token=='while'){$_SyntaxError(C,'elif after '+previous.type)}
return new $AbstractExprCtx(
new $ConditionCtx(C,token),false)
case 'else':
var previous=$previous(C)
if(['condition','except','for'].
indexOf(previous.type)==-1){$_SyntaxError(C,'else after '+previous.type)}
return new $SingleKwCtx(C,token)
case 'finally':
var previous=$previous(C)
if(['try','except'].indexOf(previous.type)==-1 &&
(previous.type !='single_kw' ||
previous.token !='else')){$_SyntaxError(C,'finally after '+previous.type)}
return new $SingleKwCtx(C,token)
case 'try':
return new $TryCtx(C)
case 'except':
var previous=$previous(C)
if(['try','except'].indexOf(previous.type)==-1){$_SyntaxError(C,'except after '+previous.type)}
return new $ExceptCtx(C)
case 'assert':
return new $AbstractExprCtx(
new $AssertCtx(C),'assert',true)
case 'from':
return new $FromCtx(C)
case 'import':
return new $ImportCtx(C)
case 'global':
return new $GlobalCtx(C)
case 'nonlocal':
return new $NonlocalCtx(C)
case 'lambda':
return new $LambdaCtx(C)
case 'pass':
return new $PassCtx(C)
case 'raise':
return new $AbstractExprCtx(new $RaiseCtx(C),true)
case 'return':
return new $AbstractExprCtx(new $ReturnCtx(C),true)
case 'with':
return new $AbstractExprCtx(new $WithCtx(C),false)
case 'yield':
return new $AbstractExprCtx(new $YieldCtx(C),true)
case 'del':
return new $AbstractExprCtx(new $DelCtx(C),true)
case '@':
return new $DecoratorCtx(C)
case 'eol':
if(C.tree.length==0){
C.node.parent.children.pop()
return C.node.parent.C}
return C}
console.log('syntax error','token',token,'after',C)
$_SyntaxError(C,'token '+token+' after '+C)
case 'not':
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
return $transition(C.parent,token)
case 'op':
if(C.op===undefined){$_SyntaxError(C,['C op undefined '+C])}
if(C.op.substr(0,5)=='unary' && token !='eol'){if(C.parent.type=='assign' ||
C.parent.type=='return'){
C.parent.tree.pop()
var t=new $ListOrTupleCtx(C.parent,'tuple')
t.tree.push(C)
C.parent=t
return t}}
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
return $transition(C.parent,token)
case 'packed':
if(C.tree.length > 0 && token=="["){
console.log("apply to packed element",C.tree[0])
return $transition(C.tree[0],token,value)}
if(token=='id'){new $IdCtx(C,value)
C.parent.expect=','
return C.parent}else if(token=="["){C.parent.expect=','
return new $ListOrTupleCtx(C,"list")}else if(token=="("){C.parent.expect=','
return new $ListOrTupleCtx(C,"tuple")}else if(token=="]"){return $transition(C.parent,token,value)}
console.log("syntax error",C,token)
$_SyntaxError(C,'token '+token+' after '+C)
case 'pass':
if(token=='eol'){return C.parent}
$_SyntaxError(C,'token '+token+' after '+C)
case 'raise':
switch(token){case 'id':
if(C.tree.length==0){return new $IdCtx(new $ExprCtx(C,'exc',false),value)}
break
case 'from':
if(C.tree.length > 0){return new $AbstractExprCtx(C,false)}
break
case 'eol':
return $transition(C.parent,token)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'return':
return $transition(C.parent,token)
case 'single_kw':
if(token==':'){return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'slice':
if(token==":"){return new $AbstractExprCtx(C,false)}
return $transition(C.parent,token,value)
case 'star_arg':
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
$_SyntaxError(C,'token '+token+' after '+C)
case 'str':
switch(token){case '[':
return new $AbstractExprCtx(new $SubCtx(C.parent),false)
case '(':
C.parent.tree[0]=C
return new $CallCtx(C.parent)
case 'str':
C.tree.push(value)
return C}
return $transition(C.parent,token,value)
case 'sub':
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
if(C.parent.packed){return C.parent.tree[0]}
if(C.tree[0].tree.length > 0){return C.parent}
break
case ':':
return new $AbstractExprCtx(new $SliceCtx(C),false)
case ',':
return new $AbstractExprCtx(C,false)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'target_list':
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
return new $TargetListCtx(C)}
case ')':
case ']':
if(C.expect==','){return C.parent}
case ',':
if(C.expect==','){C.expect='id'
return C}}
if(C.expect==','){return $transition(C.parent,token,value)}else if(token=='in'){
return $transition(C.parent,token,value)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'ternary':
if(token=='else'){C.in_else=true
return new $AbstractExprCtx(C,false)}else if(! C.in_else){$_SyntaxError(C,'token '+token+' after '+C)}
return $transition(C.parent,token,value)
case 'try':
if(token==':'){return $BodyCtx(C)}
$_SyntaxError(C,'token '+token+' after '+C)
case 'unary':
switch(token){case 'int':
case 'float':
case 'imaginary':
var expr=C.parent
C.parent.parent.tree.pop()
if(C.op=='-'){value="-"+value}
else if(C.op=='~'){value=~value}
return $transition(C.parent.parent,token,value)
case 'id':
C.parent.parent.tree.pop()
var expr=new $ExprCtx(C.parent.parent,'call',false)
var expr1=new $ExprCtx(expr,'id',false)
new $IdCtx(expr1,value)
var repl=new $AttrCtx(expr)
if(C.op=='+'){repl.name='__pos__'}
else if(C.op=='-'){repl.name='__neg__'}
else{repl.name='__invert__'}
return expr1
case 'op':
if('+'==value ||'-'==value){if(C.op===value){C.op='+'}
else{C.op='-'}
return C}}
return $transition(C.parent,token,value)
case 'with':
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
C.expect)
case 'yield':
if(token=='from'){
if(C.tree[0].type !='abstract_expr'){
$_SyntaxError(C,"'from' must follow 'yield'")}
C.from=true
$add_yield_from_code(C)
return C.tree[0]}
return $transition(C.parent,token)}}
$B.forbidden=["alert","arguments","case","catch","const","constructor","Date","debugger","delete","default","do","document","enum","export","eval","extends","Error","history","function","instanceof","keys","length","location","Math","message","new","null","Number","RegExp","String","super","switch","this","throw","typeof","var","window","toLocaleString","toString","void"]
$B.aliased_names=$B.list2obj($B.forbidden)
var s_escaped='abfnrtvxuU"0123456789'+"'"+'\\',is_escaped={}
for(var i=0;i < s_escaped.length;i++){is_escaped[s_escaped.charAt(i)]=true}
var $tokenize=$B.parser.$tokenize=function(root,src){var br_close={")":"(","]":"[","}":"{"},br_stack="",br_pos=[]
var kwdict=["class","return","break","for","lambda","try","finally","raise","def","from","nonlocal","while","del","global","with","as","elif","else","if","yield","assert","import","except","raise","in","pass","with","continue","__debugger__","async","await"
]
var unsupported=[]
var $indented=["class","def","for","condition","single_kw","try","except","with"
]
var int_pattern=/^(\d[0-9_]*)(j|J)?/,float_pattern1=/^(\d[\d_]*)\.(\d*)([eE][+-]?\d+(_\d+)*)?(j|J)?/,float_pattern2=/^(\d[\d_]*)([eE][+-]?\d+(_\d+)*)(j|J)?/,hex_pattern=/^0[xX]([\da-fA-F_]+)/,octal_pattern=/^0[oO]([0-7_]+)/,binary_pattern=/^0[bB]([01_]+)/
var C=null
var new_node=new $Node(),current=root,name="",_type=null,pos=0,indent=null,string_modifier=false
var module=root.module
var lnum=root.line_num ||1
while(pos < src.length){var car=src.charAt(pos)
if(indent===null){var indent=0
while(pos < src.length){var _s=src.charAt(pos)
if(_s==" "){indent++;pos++}
else if(_s=="\t"){
indent++;pos++
if(indent % 8 > 0){indent+=8-indent % 8}}else{break}}
var _s=src.charAt(pos)
if(_s=='\n'){pos++;lnum++;indent=null;continue}
else if(_s=='#'){
var offset=src.substr(pos).search(/\n/)
if(offset==-1){break}
pos+=offset+1
lnum++
indent=null
continue}
new_node.indent=indent
new_node.line_num=lnum
new_node.module=module
if(current.is_body_node){
current.indent=indent}
if(indent > current.indent){
if(C !==null){if($indented.indexOf(C.tree[0].type)==-1){$pos=pos
$_SyntaxError(C,'unexpected indent',pos)}}
current.add(new_node)}else if(indent <=current.indent && C && C.tree[0]&&
$indented.indexOf(C.tree[0].type)>-1 &&
C.tree.length < 2){$pos=pos
$_SyntaxError(C,'expected an indented block',pos)}else{
while(indent !==current.indent){current=current.parent
if(current===undefined ||indent > current.indent){$pos=pos
$_SyntaxError(C,'unexpected indent',pos)}}
current.parent.add(new_node)}
current=new_node
C=new $NodeCtx(new_node)
continue}
if(car=="#"){var end=src.substr(pos+1).search('\n')
if(end==-1){end=src.length-1}
root.comments.push([pos,end])
pos+=end+1
continue}
if(car=='"' ||car=="'"){var raw=C.type=='str' && C.raw,bytes=false,fstring=false,sm_length,
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
bytes=true;raw=true
break
case 'f':
fstring=true
sm_length=1
break
case 'fr','rf':
fstring=true
sm_length=2
raw=true
break}
string_modifier=false}
if(src.substr(pos,3)==car+car+car){_type="triple_string"
end=pos+3}else{_type="string"
end=pos+1}
var escaped=false,zone=car,found=false
while(end < src.length){if(escaped){if(src.charAt(end)=="a"){zone=zone.substr(0,zone.length-1)+"\u0007"}else{zone+=src.charAt(end)
if(raw && src.charAt(end)=='\\'){zone+='\\'}}
escaped=false
end++}else if(src.charAt(end)=="\\"){if(raw){if(end < src.length-1 &&
src.charAt(end+1)==car){zone+='\\\\'+car
end+=2}else{zone+='\\\\'
end++}
escaped=true}else{if(src.charAt(end+1)=='\n'){
end+=2
lnum++}else if(src.substr(end+1,2)=='N{'){
var end_lit=end+3,re=new RegExp("[-A-Z0-9 ]+"),search=re.exec(src.substr(end_lit))
if(search===null){$_SyntaxError(C,"(unicode error) "+
"malformed \\N character escape",pos)}
var end_lit=end_lit+search[0].length
if(src.charAt(end_lit)!="}"){$_SyntaxError(C,"(unicode error) "+
"malformed \\N character escape",pos)}
var description=search[0]
if($B.unicodedb===undefined){var xhr=new XMLHttpRequest
xhr.open("GET",$B.brython_path+"unicode.txt",false)
xhr.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){$B.unicodedb=this.responseText}else{console.log("Warning - could not "+
"load unicode.txt")}}}
xhr.send()}
if($B.unicodedb !==undefined){var re=new RegExp("^([0-9A-F]+);"+
description+";.*$","m")
search=re.exec($B.unicodedb)
if(search===null){$_SyntaxError(C,"(unicode error) "+
"unknown Unicode character name",pos)}
if(search[1].length==4){zone+="\\u"+search[1]
end=end_lit+1}else{end++}}else{end++}}else{if(end < src.length-1 &&
is_escaped[src.charAt(end+1)]===undefined){zone+='\\'}
zone+='\\'
escaped=true
end++}}}else if(src.charAt(end)=='\n' && _type !='triple_string'){
$pos=end
$_SyntaxError(C,["EOL while scanning string literal"])}else if(src.charAt(end)==car){if(_type=="triple_string" &&
src.substr(end,3)!=car+car+car){zone+=src.charAt(end)
end++}else{found=true
$pos=pos
var $string=zone.substr(1),string=''
for(var i=0;i < $string.length;i++){var $car=$string.charAt(i)
if($car==car &&
(raw ||(i==0 ||
$string.charAt(i-1)!='\\'))){string+='\\'}
string+=$car}
if(fstring){try{var re=new RegExp("\\\\"+car,"g"),string_no_bs=string.replace(re,car)
var elts=$B.parse_fstring(string_no_bs)}catch(err){$_SyntaxError(C,[err.toString()])}}
if(bytes){C=$transition(C,'str','b'+car+string+car)}else if(fstring){$pos-=sm_length
C=$transition(C,'str',elts)
$pos+=sm_length}else{C=$transition(C,'str',car+string+car)}
C.raw=raw;
pos=end+1
if(_type=="triple_string"){pos=end+3}
break}}else{zone+=src.charAt(end)
if(src.charAt(end)=='\n'){lnum++}
end++}}
if(!found){if(_type==="triple_string"){$_SyntaxError(C,"Triple string end not found")}else{$_SyntaxError(C,"String end not found")}}
continue}
if(name=="" && car !='$'){
if($B.unicode_tables.XID_Start[car.charCodeAt(0)]){name=car 
var p0=pos
pos++
while(pos < src.length &&
$B.unicode_tables.XID_Continue[src.charCodeAt(pos)]){name+=src.charAt(pos)
pos++}}
if(name){if(kwdict.indexOf(name)>-1){$pos=pos-name.length
if(unsupported.indexOf(name)>-1){$_SyntaxError(C,"Unsupported Python keyword '"+name+"'")}
C=$transition(C,name)}else if(typeof $operators[name]=='string' &&
['is_not','not_in'].indexOf(name)==-1){
if(name=='is'){
var re=/^\s+not\s+/
var res=re.exec(src.substr(pos))
if(res !==null){pos+=res[0].length
$pos=pos-name.length
C=$transition(C,'op','is_not')}else{$pos=pos-name.length
C=$transition(C,'op',name)}}else if(name=='not'){
var re=/^\s+in\s+/
var res=re.exec(src.substr(pos))
if(res !==null){pos+=res[0].length
$pos=pos-name.length
C=$transition(C,'op','not_in')}else{$pos=pos-name.length
C=$transition(C,name)}}else{$pos=pos-name.length
C=$transition(C,'op',name)}}else if((src.charAt(pos)=='"' ||src.charAt(pos)=="'")
&&['r','b','u','rb','br','f','fr','rf'].
indexOf(name.toLowerCase())!==-1){string_modifier=name.toLowerCase()
name=""
continue}else{if($B.forbidden.indexOf(name)>-1){name='$$'+name}
$pos=pos-name.length
C=$transition(C,'id',name)}
name=""
continue}}
function rmuf(numeric_literal){
if(numeric_literal.search("__")>-1){
$_SyntaxError(C,"invalid literal")}else if(numeric_literal.endsWith("_")){
$_SyntaxError(C,"invalid literal")}
return numeric_literal.replace(/_/g,"")}
function check_int(numeric_literal){
rmuf(numeric_literal)
if(numeric_literal.startsWith("0")){if(numeric_literal.substr(1).search(/[^0_]/)>-1){
$_SyntaxError(C,"invalid literal")}else{return "0"}}}
function rmu(numeric_literal){return numeric_literal.replace(/_/g,"")}
switch(car){case ' ':
case '\t':
pos++
break
case '.':
if(pos < src.length-1 &&/^\d$/.test(src.charAt(pos+1))){
var j=pos+1
while(j < src.length &&
src.charAt(j).search(/\d|e|E|_/)>-1){j++}
if(src.charAt(j)=="j"){C=$transition(C,'imaginary','0'+rmu(src.substr(pos,j-pos)))
j++}else{C=$transition(C,'float','0'+rmu(src.substr(pos,j-pos)))}
pos=j
break}
$pos=pos
C=$transition(C,'.')
pos++
break
case '0':
var res=hex_pattern.exec(src.substr(pos))
if(res){rmuf(res[1])
C=$transition(C,'int',[16,rmu(res[1])])
pos+=res[0].length
break}
var res=octal_pattern.exec(src.substr(pos))
if(res){C=$transition(C,'int',[8,rmuf(res[1])])
pos+=res[0].length
break}
var res=binary_pattern.exec(src.substr(pos))
if(res){C=$transition(C,'int',[2,rmuf(res[1])])
pos+=res[0].length
break}
if(src.charAt(pos+1).search(/\d/)>-1){
if(parseInt(src.substr(pos))===0){res=int_pattern.exec(src.substr(pos))
$pos=pos
check_int(res[0])
C=$transition(C,'int',[10,rmu(res[0])])
pos+=res[0].length
break}else{$_SyntaxError(C,'invalid literal starting with 0')}}
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
var res=float_pattern1.exec(src.substr(pos))
if(res){check_int(res[1])
if(res[2]){rmuf(res[2])}
$pos=pos
if($B.last(res)!==undefined){C=$transition(C,'imaginary',rmuf(res[0].substr(0,res[0].length-1)))}else{C=$transition(C,'float',rmuf(res[0]))}}else{res=float_pattern2.exec(src.substr(pos))
if(res){check_int(res[1])
$pos=pos
if($B.last(res)!==undefined){C=$transition(C,'imaginary',rmuf(res[0].substr(0,res[0].length-1)))}else{C=$transition(C,'float',rmuf(res[0]))}}else{res=int_pattern.exec(src.substr(pos))
check_int(res[1])
$pos=pos
if(res[2]!==undefined){C=$transition(C,'imaginary',rmu(res[1]))}else{C=$transition(C,'int',[10,rmu(res[0])])}}}
pos+=res[0].length
break
case '\n':
lnum++
if(br_stack.length > 0){
pos++}else{if(current.C.tree.length > 0 ||current.C.async){$pos=pos
C=$transition(C,'eol')
indent=null
new_node=new $Node()}else{new_node.line_num=lnum}
pos++}
break
case '(':
case '[':
case '{':
br_stack+=car
br_pos[br_stack.length-1]=[C,pos]
$pos=pos
C=$transition(C,car)
pos++
break
case ')':
case ']':
case '}':
if(br_stack==""){$pos=pos
$_SyntaxError(C,"Unexpected closing bracket")}else if(br_close[car]!=
br_stack.charAt(br_stack.length-1)){$pos=pos
$_SyntaxError(C,"Unbalanced bracket")}else{br_stack=br_stack.substr(0,br_stack.length-1)
$pos=pos
C=$transition(C,car)
pos++}
break
case '=':
if(src.charAt(pos+1)!="="){$pos=pos
C=$transition(C,'=')
pos++}else{$pos=pos
C=$transition(C,'op','==')
pos+=2}
break
case ',':
case ':':
$pos=pos
if(src.substr(pos,2)==":="){
C=$transition(C,":=")
pos++}else{C=$transition(C,car)}
pos++
break
case ';':
$transition(C,'eol')
if(current.C.tree.length==0){
$pos=pos
$_SyntaxError(C,'invalid syntax')}
var pos1=pos+1
var ends_line=false
while(pos1 < src.length){var _s=src.charAt(pos1)
if(_s=='\n' ||_s=='#'){ends_line=true;break}
else if(_s==' '){pos1++}
else{break}}
if(ends_line){pos++;break}
new_node=new $Node()
new_node.indent=$get_node(C).indent
new_node.line_num=lnum
new_node.module=module
$get_node(C).parent.add(new_node)
current=new_node
C=new $NodeCtx(new_node)
pos++
break
case '/':
case '%':
case '&':
case '>':
case '<':
case '-':
case '+':
case '*':
case '@':
case '/':
case '^':
case '=':
case '|':
case '~':
case '!':
if(car=='-' && src.charAt(pos+1)=='>'){C=$transition(C,'annotation')
pos+=2
continue}
if(car=='@' && C.type=="node"){$pos=pos
C=$transition(C,car)
pos++
break}
var op_match=""
for(var op_sign in $operators){if(op_sign==src.substr(pos,op_sign.length)
&& op_sign.length > op_match.length){op_match=op_sign}}
$pos=pos
if(op_match.length > 0){if(op_match in $augmented_assigns){C=$transition(C,'augm_assign',op_match)}else{C=$transition(C,'op',op_match)}
pos+=op_match.length}else{$_SyntaxError(C,'invalid character: '+car)}
break
case '\\':
if(src.charAt(pos+1)=='\n'){lnum++
pos+=2
if(pos==src.length){$_SyntaxError(C,["unexpected EOF while parsing"])}else if(C.type=="node"){$_SyntaxError(C,'nothing before \\')}
break}else{$pos=pos
$_SyntaxError(C,['unexpected character after line continuation character'])}
case String.fromCharCode(12):
pos+=1
break
default:
$pos=pos
$_SyntaxError(C,'unknown token ['+car+']')}}
if(br_stack.length !=0){var br_err=br_pos[0]
$pos=br_err[1]
var lines=src.split("\n"),id=root.id,fname=id.startsWith("$")? '<string>' :id
$_SyntaxError(br_err[0],["unexpected EOF while parsing ("+fname+", line "+
(lines.length-1)+")"])}
if(C !==null && C.type=="async"){
console.log("error with async",pos,src,src.substr(pos))
$pos=pos-7
throw $_SyntaxError(C,"car "+car+"after async",pos)}
if(C !==null && C.tree[0]&&
$indented.indexOf(C.tree[0].type)>-1){$pos=pos-1
$_SyntaxError(C,'expected an indented block',pos)}}
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
if(src.has_annotations){root.binding.__annotations__=true}
src=src.src}
root.src=src
return root}
$B.py2js=function(src,module,locals_id,parent_scope,line_num){
$pos=0
if(typeof module=="object"){var __package__=module.__package__
module=module.__name__}else{var __package__=""}
parent_scope=parent_scope ||$B.builtins_scope
var t0=new Date().getTime(),is_comp=false,has_annotations=true 
if(typeof src=='object'){var is_comp=src.is_comp,has_annotations=src.has_annotations
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
{src:src,is_comp:is_comp,has_annotations:has_annotations},module,locals_id,parent_scope,line_num)
$tokenize(root,src)
root.is_comp=is_comp
root.transform()
var js=['var $B = __BRYTHON__;\n'],pos=1
js[pos++]='var $bltns = __BRYTHON__.InjectBuiltins();eval($bltns);\n\n'
js[pos]='var $locals = '+local_ns+';'
var offset=0
root.insert(0,$NodeJS(js.join('')))
offset++
root.insert(offset++,$NodeJS(local_ns+'["__package__"] = "'+__package__+'"'))
if(root.binding.__annotations__){root.insert(offset++,$NodeJS('$locals.__annotations__ = _b_.dict.$factory()'))}
var enter_frame_pos=offset,js='var $top_frame = ["'+locals_id.replace(/\./g,'_')+'", '+
local_ns+', "'+module.replace(/\./g,'_')+'", '+
global_ns+']\n$B.frames_stack.push($top_frame)\n'+
'var $stack_length = $B.frames_stack.length;'
root.insert(offset++,$NodeJS(js))
var try_node=new $NodeJS('try'),children=root.children.slice(enter_frame_pos+1,root.children.length)
root.insert(enter_frame_pos+1,try_node)
if(children.length==0){children=[$NodeJS('')]}
children.forEach(function(child){try_node.add(child)})
try_node.add($NodeJS('$B.leave_frame()'))
root.children.splice(enter_frame_pos+2,root.children.length)
var catch_node=$NodeJS('catch(err)')
catch_node.add($NodeJS('$B.leave_frame()'))
catch_node.add($NodeJS('throw err'))
root.add(catch_node)
if($B.profile > 0){$add_profile(root,null,module)}
if($B.debug > 0){$add_line_num(root,null,module)}
var t1=new Date().getTime()
if($B.debug > 2){if(module==locals_id){console.log('module '+module+' translated in '+
(t1-t0)+' ms')}}
$B.compile_time+=t1-t0
return root}
$B.set_import_paths=function(){
var meta_path=[],path_hooks=[]
if($B.use_VFS){meta_path.push($B.$meta_path[0])}
if($B.$options.static_stdlib_import !==false && $B.protocol !="file"){
meta_path.push($B.$meta_path[1])
if($B.path.length > 3){$B.path.shift()
$B.path.shift()}}
if($B.protocol !=="file"){meta_path.push($B.$meta_path[2])
path_hooks.push($B.$path_hooks[0])}
$B.meta_path=meta_path
$B.path_hooks=path_hooks}
var brython=$B.parser.brython=function(options){
if(options===undefined){options={'debug':0}}
if(typeof options=='number'){options={'debug':options}}
if(options.debug===undefined){options.debug=0}
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
$B.run_script=function(src,name,run_loop){
if(run_loop){if($B.idb_cx && $B.idb_cx.$closed){$B.tasks.push([$B.idb_open])}}
$B.$py_module_path[name]=$B.script_path
try{var root=$B.py2js(src,name,name),js=root.to_js(),script={__doc__:root.__doc__,js:js,__name__:name,$src:src,__file__:$B.script_path+
($B.script_path.endsWith("/")? "" :"/")+name}
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
var defined_ids={}
if(options.ipy_id !==undefined){var $elts=[]
options.ipy_id.forEach(function(elt){$elts.push(document.getElementById(elt))})}else{var scripts=document.getElementsByTagName('script'),$elts=[],webworkers=[]
for(var i=0;i < scripts.length;i++){var script=scripts[i]
if(script.type=="text/python" ||script.type=="text/python3"){if(script.className=="webworker"){if(script.id===undefined){throw _b_.AttributeError.$factory(
"webworker script has no attribute 'id'")}
webworkers.push(script)}else{$elts.push(script)}}}}
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
var $trace=_b_.getattr($err,'info')+'\n'+$err.__name__+
': '+$err.args
try{_b_.getattr($B.stderr,'write')($trace)}catch(print_exc_err){console.log($trace)}
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
src=src.replace(/^\n/,'')
$B.run_script(src,module_name)}}}}
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
if(res===undefined ||res.timestamp !=$B.timestamp){
if($B.VFS[module]!==undefined){var elts=$B.VFS[module],ext=elts[0],source=elts[1]
if(ext==".py"){var imports=elts[2],is_package=elts.length==4,source_ts=elts.timestamp,__package__
if(is_package){__package__=module}
else{var parts=module.split(".")
parts.pop()
__package__=parts.join(".")}
$B.imported[module]=$B.module.$factory(module,"",__package__)
try{var root=$B.py2js(source,module,module),js=root.to_js()}catch(err){$B.handle_error(err)
throw err}
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
request.onsuccess=function(evt){
$B.tasks.splice(0,0,[idb_get,module])
loop()}}
function idb_get(module){
var db=$B.idb_cx.result,tx=db.transaction("modules","readonly")
try{var store=tx.objectStore("modules")
req=store.get(module)
req.onsuccess=function(evt){idb_load(evt,module)}}catch(err){console.info('error',err)}}
function remove_from_cache(cursor,record){var request=cursor.delete()
request.onsuccess=function(){if($B.debug > 1){console.log("delete outdated",record.name)}}}
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
store.onsuccess=loop}}else{console.info("using indexedDB for stdlib modules cache")
var tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules"),record,outdated=[]
store.openCursor().onsuccess=function(evt){cursor=evt.target.result
if(cursor){record=cursor.value
if(record.timestamp==$B.timestamp){if(!$B.VFS ||!$B.VFS[record.name]||
$B.VFS[record.name].timestamp==record.source_ts){
if(record.is_package){$B.precompiled[record.name]=[record.content]}else{$B.precompiled[record.name]=record.content}
if($B.debug > 1){console.log("load from cache",record.name)}}else{
remove_from_cache(cursor,record)}}else{remove_from_cache(cursor,record)}
cursor.continue()}else{if($B.debug > 1){console.log("done")}
loop()}}}}
idb_cx.onupgradeneeded=function(){console.info("upgrade needed")
var db=idb_cx.result,store=db.createObjectStore("modules",{"keyPath":"name"})
store.onsuccess=loop}
idb_cx.onerror=function(){console.info('could not open indexedDB database')}}
$B.ajax_load_script=function(script){var url=script.url,name=script.name
if($B.files && $B.files.hasOwnProperty(name)){$B.tasks.splice(0,0,[$B.run_script,$B.files[name],name,true])
loop()}else if($B.protocol !="file"){var req=new XMLHttpRequest()
req.open("GET",url+"?"+Date.now(),true)
req.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){var src=this.responseText
if(script.is_ww){$B.webworkers[name]=src}else{$B.tasks.splice(0,0,[$B.run_script,src,name,true])}}else if(this.status==404){throw Error(url+" not found")}
loop()}}
req.send()}}
function add_jsmodule(module,source){
source+="\nvar $locals_"+
module.replace(/\./g,"_")+" = $module"
$B.precompiled[module]=source}
var inImported=$B.inImported=function(module){if($B.imported.hasOwnProperty(module)){}else if(__BRYTHON__.VFS && __BRYTHON__.VFS.hasOwnProperty(module)){var elts=__BRYTHON__.VFS[module]
if(elts===undefined){console.log('bizarre',module)}
var ext=elts[0],source=elts[1],is_package=elts.length==4
if(ext==".py"){if($B.idb_cx){$B.tasks.splice(0,0,[idb_get,module])}}else{add_jsmodule(module,source)}}else{console.log("bizarre",module)}
loop()}
var loop=$B.loop=function(){if($B.tasks.length==0){
if($B.idb_cx){$B.idb_cx.result.close()
$B.idb_cx.$closed=true}
return}
var task=$B.tasks.shift(),func=task[0],args=task.slice(1)
if(func=="execute"){try{var script=task[1],script_id=script.__name__.replace(/\./g,"_"),module=$B.module.$factory(script.__name__)
module.$src=script.$src
module.__file__=script.__file__
$B.imported[script_id]=module
new Function("$locals_"+script_id,script.js)(module)}catch(err){
if(err.$py_error===undefined){console.log('Javascript error',err)
if($B.is_recursion_error(err)){err=_b_.RecursionError.$factory("too much recursion")}else{$B.print_stack()
err=_b_.RuntimeError.$factory(err+'')}}
if($B.debug > 1){console.log("handle error",err.__class__,err.args,err.$stack)
console.log($B.frames_stack.slice())}
$B.handle_error(err)}
loop()}else{
func.apply(null,args)}}
$B.tasks=[]
$B.has_indexedDB=self.indexedDB !==undefined
$B.handle_error=function(err){
if(err.__class__ !==undefined){var name=$B.class_name(err),trace=_b_.getattr(err,'info')
if(name=='SyntaxError' ||name=='IndentationError'){var offset=err.args[3]
trace+='\n    '+' '.repeat(offset)+'^'+
'\n'+name+': '+err.args[0]}else{trace+='\n'+name+': '+err.args}}else{console.log(err)
trace=err+""}
try{$B.$getattr($B.stderr,'write')(trace)
try{$B.$getattr($B.stderr,'flush')()}catch(err){console.log(err)}}catch(print_exc_err){console.log(trace)}
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
object.__getattribute__=function(obj,attr){var klass=obj.__class__ ||$B.get_class(obj)
var $test=false 
if($test){console.log("attr",attr,"de",obj,"klass",klass)}
if(attr==="__class__"){return klass}
var res=obj[attr]
if(Array.isArray(obj)&& Array.prototype[attr]!==undefined){
res=undefined}
if(res===undefined && obj.__dict__ &&
obj.__dict__.$string_dict.hasOwnProperty(attr)){return obj.__dict__.$string_dict[attr]}
if(res===undefined){
function check(obj,kl,attr){var v=kl[attr]
if(v !==undefined){return v}}
res=check(obj,klass,attr)
if(res===undefined){var mro=klass.__mro__
for(var i=0,len=mro.length;i < len;i++){res=check(obj,mro[i],attr)
if(res !==undefined){if($test){console.log("found in",mro[i])}
break}}}}else{if(res.__set__===undefined){
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
_b_.getattr(res,"__get__",null)
if($test){console.log("__get__",__get__)}
if(__get__ !==null){try{return __get__.apply(null,[obj,klass])}
catch(err){console.log('error in get.apply',err)
console.log("get attr",attr,"of",obj)
console.log(__get__+'')
throw err}}
if(typeof res=="object"){if(__get__ &&(typeof __get__=="function")){get_func=function(x,y){return __get__.apply(x,[y,klass.$factory])}}}
if(__get__===null &&(typeof res=="function")){__get__=function(x){return x}}
if(__get__ !==null){
res.__name__=attr
if(attr=="__new__"){res.$type="staticmethod"}
var res1=__get__.apply(null,[res,obj,klass])
if($test){console.log("res",res,"res1",res1)}
if(typeof res1=="function"){
if(res1.__class__===$B.method){return res}
if(res.$type=="staticmethod"){return res}
else{var self=res.__class__===$B.method ? klass :obj,method=res.bind(null,self)
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
return method}}else{
return res1}}
return res}else{
var _ga=obj["__getattr__"]
if(_ga===undefined){_ga=klass["__getattr__"]
if(_ga===undefined){var mro=klass.__mro__
for(var i=0,len=mro.length;i < len;i++){_ga=mro[i]["__getattr__"]
if(_ga !==undefined){break}}}}
if(_ga !==undefined){return _ga(obj,attr)}}}
object.__gt__=function(){return _b_.NotImplemented}
object.__hash__=function(self){var hash=self.__hashvalue__
if(hash !==undefined){return hash}
return self.__hashvalue__=$B.$py_next_hash--}
object.__init__=function(){if(arguments.length==0){throw _b_.TypeError.$factory("descriptor '__init__' of 'object' "+
"object needs an argument")}
return _b_.None}
object.__le__=function(){return _b_.NotImplemented}
object.__lt__=function(){return _b_.NotImplemented}
object.__mro__=[]
object.__new__=function(cls,...args){if(cls===undefined){throw _b_.TypeError.$factory("object.__new__(): not enough arguments")}
var init_func=$B.$getattr(cls,"__init__")
if(init_func===object.__init__){if(args.length > 0){throw _b_.TypeError.$factory("object() takes no parameters")}}
return{
__class__ :cls,__dict__:_b_.dict.$factory()}}
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
var d=_b_.dict.$factory()
for(var attr in self.__dict__.$string_dict){d.$string_dict[attr]=self.__dict__.$string_dict[attr]}
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
var d=_b_.dict.$factory(),nb=0
if(self.__dict__===undefined){console.log("no dict",self)
$B.frames_stack.forEach(function(frame){console.log(frame[0],frame[1],frame[2])})}
for(var attr in self.__dict__.$string_dict){if(attr=="__class__" ||attr.startsWith("$")){continue}
d.$string_dict[attr]=self.__dict__.$string_dict[attr]
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
if(self.__dict__){self.__dict__.$string_dict[attr]=val}else{
self[attr]=val}
return _b_.None}
object.__setattr__.__get__=function(obj){return function(attr,val){object.__setattr__(obj,attr,val)}}
object.__setattr__.__str__=function(){return "method object.setattr"}
object.__str__=function(self){var repr_func=$B.$getattr(self,"__repr__")
return $B.$call(repr_func)()}
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
module=$B.last($B.frames_stack)[2]}
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
var orig_bases=bases.slice(),use_mro_entries=false
for(var i=0;i < bases.length;i++){if(bases[i]===undefined ||
(bases[i].__mro__===undefined &&
bases[i].__class__ !==$B.JSObject)){var mro_entries=$B.$getattr(bases[i],"__mro_entries__",_b_.None)
if(mro_entries !==_b_.None){var entries=_b_.list.$factory(mro_entries(bases))
bases.splice(i,1,...entries)
use_mro_entries=true
i--
continue}}}
if(metaclass===undefined){if(bases && bases.length > 0 && bases[0].__class__ !==$B.JSObject){metaclass=bases[0].__class__
for(var i=1;i < bases.length;i++){var mc=bases[i].__class__
if(mc===metaclass){}else if(mc.__bases__ &&
mc.__bases__.indexOf(metaclass)>-1){metaclass=mc}else if(metaclass.__bases__ &&
metaclass.__bases__.indexOf(mc)==-1){throw _b_.TypeError.$factory("metaclass conflict: the "+
"metaclass of a derived class must be a (non-"+
"strict) subclass of the metaclasses of all its bases")}}}else{metaclass=_b_.type}}
var prepare=$B.$getattr(metaclass,"__prepare__",_b_.None),cl_dict=prepare(class_name,bases)
if(cl_dict.__class__ !==_b_.dict){set_class_item=$B.$getattr(cl_dict,"__setitem__")}else{set_class_item=function(attr,value){cl_dict.$string_dict[attr]=value}}
for(var attr in class_obj){if(attr=="__annotations__"){cl_dict.$string_dict[attr]=cl_dict.$string_dict[attr]||
_b_.dict.$factory()
for(var key in class_obj[attr].$string_dict){$B.$setitem(cl_dict.$string_dict[attr],key,class_obj[attr].$string_dict[key])}}else{if(attr.charAt(0)!="$" ||attr.substr(0,2)=="$$"){set_class_item(attr,class_obj[attr])}}}
if(use_mro_entries){set_class_item("__orig_bases__",_b_.tuple.$factory(orig_bases))}
var class_dict={__bases__:bases,__class__:metaclass,__dict__:cl_dict}
if(cl_dict.__class__===_b_.dict){for(var key in cl_dict.$string_dict){class_dict[key]=cl_dict.$string_dict[key]}}else{var get_class_item=$B.$getattr(cl_dict,"__getitem__")
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
kls.$infos={__module__:module,__name__:class_name,__qualname__:class_name}
kls.$subclasses=[]
for(var attr in class_obj){if(attr.charAt(0)!="$" ||attr.substr(0,2)=="$$"){if(typeof class_obj[attr]=="function"){class_obj[attr].$infos.$class=kls}}}
if(kls.__class__===metaclass){
var meta_init=_b_.type.__getattribute__(metaclass,"__init__")
meta_init(kls,class_name,bases,cl_dict)}
for(var i=0;i < bases.length;i++){bases[i].$subclasses=bases[i].$subclasses ||[]
bases[i].$subclasses.push(kls)
if(i==0){var init_subclass=_b_.type.__getattribute__(bases[i],"__init_subclass__")
if(init_subclass.$infos.__func__ !==undefined){init_subclass.$infos.__func__(kls,{$nat:"kw",kw:extra_kwargs})}else{init_subclass(kls,{$nat:"kw",kw:extra_kwargs})}}}
if(bases.length==0){$B.$getattr(metaclass,"__init_subclass__")(kls,{$nat:"kw",kw:extra_kwargs})}
if(!is_instanciable){function nofactory(){throw _b_.TypeError.$factory("Can't instantiate abstract class "+
"interface with abstract methods "+
Object.keys(abstract_methods).join(", "))}
kls.$factory=nofactory}
kls.__qualname__=class_name.replace("$$","")
return kls}
var type=$B.make_class("type",function(obj,bases,cl_dict){if(arguments.length==1){return obj.__class__ ||$B.get_class(obj)}
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
for(var i=0,len=mro.length;i < len;i++){if(mro[i].__dict__){var ann=mro[i].__dict__.$string_dict.__annotations__
if(ann){if(res===undefined){res=ann}else if(res.__class__===_b_.dict &&
ann.__class__===_b_.dict){
for(var key in ann.$string_dict){res.$string_dict[key]=ann.$string_dict[key]}}}}}
if(res===undefined){res=_b_.dict.$factory()}
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
for(var i=0;i < mro.length;i++){var v=mro[i][attr]
if(v !==undefined){res=v
break}}}else{res=v}
if(res===undefined){
var meta=klass.__class__,res=meta[attr]
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
if(res.__class__===_b_.property){return res }
if(res.__get__){if(res.__class__===method){var result=res.__get__(res.__func__,klass)
result.$infos={__func__:res,__name__:res.$infos.__name__,__qualname__:klass.$infos.__name__+"."+res.$infos.__name__,__self__:klass}}else{result=res.__get__(klass)}
return result}
if(typeof res=="function"){
if(res.$infos===undefined && $B.debug > 1){console.log("warning: no attribute $infos for",res,"attr",attr)}
if($test){console.log("res is function",res)}
if(attr=="__new__"){res.$type="staticmethod"}
if(attr=="__class_getitem__" && res.__class__ !==$B.method){res=_b_.classmethod.$factory(res)}
if(res.__class__===$B.method){return res.__get__(null,klass)}else{if($test){console.log("return res",res)}
return res}}else{return res}}}
type.__hash__=function(cls){return _b_.hash(cls)}
type.__init__=function(){}
type.__init_subclass__=function(cls,kwargs){
var $=$B.args("__init_subclass__",1,{cls:null},["cls"],arguments,{},"args","kwargs")
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
var class_dict={__class__ :meta,__bases__ :bases,__dict__ :cl_dict,$infos:{__name__:name.replace("$$","")},$is_class:true,$has_setattr:cl_dict.$has_setattr}
var items=$B.dict_to_list(cl_dict)
for(var i=0;i < items.length;i++){var key=$B.to_alias(items[i][0]),v=items[i][1]
if(v===undefined){continue}
class_dict[key]=v
if(v.__class__){
var is_descriptor=
$B.$getattr(v.__class__,"__get__",_b_.None)!==_b_.None
if(is_descriptor){var set_name=$B.$getattr(v.__class__,"__set_name__",_b_.None)
if(set_name !==_b_.None){set_name(v,v.__class__,key)}}}
if(typeof v=="function"){v.$infos.$class=class_dict
if(v.$infos.$defaults){
var $defaults=v.$infos.$defaults
$B.Function.__setattr__(v,"__defaults__",$defaults)}}}
class_dict.__mro__=type.mro(class_dict).slice(1)
return class_dict}
type.__repr__=type.__str__=function(kls){if(kls.$infos===undefined){console.log("no $infos",kls)}
var qualname=kls.$infos.__name__
if(kls.$infos.__module__ &&
kls.$infos.__module__ !="builtins" &&
!kls.$infos.__module__.startsWith("$")){qualname=kls.$infos.__module__+"."+qualname}
return "<class '"+qualname+"'>"}
type.__prepare__=function(){return _b_.dict.$factory()}
type.__qualname__={__get__:function(self){return self.$infos.__qualname__ ||self.$infos.__name__},__set__:function(self,value){self.$infos.__qualname__=value},__str__:function(self){console.log("type.__qualname__")},__eq__:function(self,other){return self.$infos.__qualname__==other}}
type.mro=function(cls){
var bases=cls.__bases__,seqs=[],pos1=0
for(var i=0;i < bases.length;i++){
if(bases[i]===_b_.str){bases[i]=$B.StringSubclass}
var bmro=[],pos=0
if(bases[i]===undefined ||
bases[i].__mro__===undefined){if(bases[i].__class__===$B.JSObject){
var js_func=bases[i].js_func
bases[i]={__class__:_b_.type,__mro__:[_b_.object],__name__:js_func.name,__init__:function(instance,...args){args.forEach(function(arg,i){args[i]=$B.pyobj2jsobj(arg)})
js_func.apply(instance,args)
for(var attr in instance){if(typeof instance[attr]=="function"){instance[attr]=(function(f){return function(){var res=f.apply(instance,arguments)
return $B.jsobj2pyobj(res)}})(instance[attr])}}}}
bases[i].__init__.$infos={__name__:bases[i].$infos.__name__}}else{throw _b_.TypeError.$factory(
"Object passed as base class is not a class")}}
bmro[pos++]=bases[i]
var _tmp=bases[i].__mro__
if(_tmp[0]===bases[i]){_tmp.splice(0,1)}
for(var k=0;k < _tmp.length;k++){bmro[pos++]=_tmp[k]}
seqs[pos1++]=bmro}
if(bases.indexOf(_b_.object)==-1){bases=bases.concat(_b_.tuple.$factory([_b_.object]))}
for(var i=0;i < bases.length;i++){seqs[pos1++]=bases[i]}
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
$B.$factory={__class__:type,$is_class:true}
$B.$factory.__mro__=[type,_b_.object]
var $instance_creator=$B.$instance_creator=function(klass){
if(klass.$instanciable !==undefined){return function(){throw _b_.TypeError.$factory(
"Can't instantiate abstract class interface "+
"with abstract methods")}}
var metaclass=klass.__class__,call_func,factory
if(metaclass===_b_.type &&(!klass.__bases__ ||klass.__bases__.length==0)){if(klass.hasOwnProperty("__new__")){if(klass.hasOwnProperty("__init__")){factory=function(){
var obj=klass.__new__.bind(null,klass).
apply(null,arguments)
klass.__init__.bind(null,obj).apply(null,arguments)
return obj}}else{factory=function(){return klass.__new__.bind(null,klass).
apply(null,arguments)}}}else if(klass.hasOwnProperty("__init__")){factory=function(){var obj={__class__:klass,__dict__:_b_.dict.$factory()}
klass.__init__.bind(null,obj).apply(null,arguments)
return obj}}else{factory=function(){if(arguments.length > 0){if(arguments.length==1 && arguments[0].$nat &&
Object.keys(arguments[0].kw).length==0){}else{throw _b_.TypeError.$factory("object() takes no parameters")}}
return{__class__:klass,__dict__:_b_.dict.$factory()}}}}else{call_func=_b_.type.__getattribute__(metaclass,"__call__")
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
_b_.object.__class__=type})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins,_window=self,isWebWorker=('undefined' !==typeof WorkerGlobalScope)&&
("function"===typeof importScripts)&&
(navigator instanceof WorkerNavigator)
$B.args=function($fname,argcount,slots,var_names,args,$dobj,extra_pos_args,extra_kw_args){
var $args=[]
if(Array.isArray(args)){$args=args}
else{
for(var i=0,len=args.length;i < len;i++){$args.push(args[i])}}
var has_kw_args=false,nb_pos=$args.length,filled=0,extra_kw,only_positional
var end_positional=var_names.indexOf("/")
if(end_positional !=-1){var_names.splice(end_positional,1)
only_positional=var_names.slice(0,end_positional)}
if(nb_pos > 0 && $args[nb_pos-1]&& $args[nb_pos-1].$nat){nb_pos--
if(Object.keys($args[nb_pos].kw).length > 0){has_kw_args=true
var kw_args=$args[nb_pos].kw
if(Array.isArray(kw_args)){kw_args=$B.extend($fname,...kw_args)}}}
if(extra_pos_args){slots[extra_pos_args]=[]
slots[extra_pos_args].__class__=_b_.tuple}
if(extra_kw_args){
extra_kw={__class__:_b_.dict,$numeric_dict:{},$object_dict:{},$string_dict :{},$str_hash:{},length:0}}
if(nb_pos > argcount){
if(extra_pos_args===null ||extra_pos_args=="*"){
msg=$fname+"() takes "+argcount+" positional argument"+
(argcount> 1 ? "" :"s")+" but more were given"
throw _b_.TypeError.$factory(msg)}else{
for(var i=argcount;i < nb_pos;i++){slots[extra_pos_args].push($args[i])}
nb_pos=argcount}}
for(var i=0;i < nb_pos;i++){slots[var_names[i]]=$args[i]
filled++}
if(filled==argcount && argcount===var_names.length &&
! has_kw_args){if(extra_kw_args){slots[extra_kw_args]=extra_kw}
return slots}
if(has_kw_args){for(var key in kw_args){var value=kw_args[key],key1=$B.to_alias(key)
if(slots[key1]===undefined){
if(extra_kw_args){
if(key.substr(0,2)=="$$"){key=key.substr(2)}
extra_kw.$string_dict[key]=value}else{throw _b_.TypeError.$factory($fname+
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
obj.__class__=$B.Function
return $B.Function
case "object":
if(obj.$class){return obj.$class}
if(Array.isArray(obj)){if(Object.getPrototypeOf(obj)===Array.prototype){obj.__class__=_b_.list
return _b_.list}}else if(obj.constructor===Number){return _b_.float}
break}}
return klass}
$B.class_name=function(obj){return $B.get_class(obj).$infos.__name__}
$B.$list_comp=function(items){
var ix=$B.UUID(),py="x"+ix+"=[]\n",indent=0
for(var i=1,len=items.length;i < len;i++){var item=items[i].replace(/\s+$/,"").replace(/\n/g,"")
py+=" ".repeat(indent)+item+":\n"
indent+=4}
py+=" ".repeat(indent)
py+="x"+ix+".append("+items[0]+")\n"
return[py,ix]}
$B.$dict_comp=function(module_name,parent_scope,items,line_num){
var ix=$B.UUID(),res="res"+ix,py=res+"={}\n",
indent=0
for(var i=1,len=items.length;i < len;i++){var item=items[i].replace(/\s+$/,"").replace(/\n/g,"")
py+="    ".repeat(indent)+item+":\n"
indent++}
py+="    ".repeat(indent)+res+".update({"+items[0]+"})"
var dictcomp_name="dc"+ix,root=$B.py2js({src:py,is_comp:true},module_name,dictcomp_name,parent_scope,line_num),js=root.to_js()
js+='\nreturn $locals["'+res+'"]\n'
js="(function($locals_"+dictcomp_name+"){"+js+"})({})"
$B.clear_ns(dictcomp_name)
delete $B.$py_src[dictcomp_name]
return js}
$B.$gen_expr=function(module_name,parent_scope,items,line_num){
var $ix=$B.UUID(),py="def __ge"+$ix+"():\n",
indent=1
for(var i=1,len=items.length;i < len;i++){var item=items[i].replace(/\s+$/,"").replace(/\n/g,"")
py+=" ".repeat(indent)+item+":\n"
indent+=4}
py+=" ".repeat(indent)
py+="yield ("+items[0]+")"
var genexpr_name="__ge"+$ix,root=$B.py2js({src:py,is_comp:true},genexpr_name,genexpr_name,parent_scope,line_num),js=root.to_js(),lines=js.split("\n")
js=lines.join("\n")
js+="\nvar $res = $locals_"+genexpr_name+'["'+genexpr_name+
'"]();\n$res.is_gen_expr = true;\nreturn $res\n'
js="(function($locals_"+genexpr_name+"){"+js+"})({})\n"
delete $B.$py_src[genexpr_name]
return js}
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
for(var i=0;i< $B.frames_stack.length;i++){var frame=$B.frames_stack[i]
if(search_ids.indexOf(frame[0])>-1 &&
frame[1][name]!==undefined){return frame[1][name]}
if(search_ids.indexOf(frame[2])>-1 &&
frame[3][name]!==undefined){return frame[3][name]}}
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
return _b_[name]}
throw _b_.NameError.$factory("name '"+$B.from_alias(name)+
"' is not defined")}
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
Object.getPrototypeOf(src)===Array.prototype){var res=[]
for(var i=0,len=src.length;i< len;i++){res.push($B.$JS2Py(src[i]))}
return res}
var klass=$B.get_class(src)
if(klass !==undefined){if(klass===$B.JSObject){src=src.js}else{return src}}
if(typeof src=="object"){if($B.$isNode(src)){return $B.DOMNode.$factory(src)}
if($B.$isEvent(src)){return $B.$DOMEvent(src)}
if($B.$isNodeList(src)){return $B.DOMNode.$factory(src)}}
return $B.JSObject.$factory(src)}
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
if(stop < 0){stop=Math.max(0,stop+obj.length)}
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
$B.$getitem=function(obj,item){var is_list=Array.isArray(obj)&& obj.__class__===_b_.list
if(typeof item=="number"){if(is_list ||typeof obj=="string"){item=item >=0 ? item :obj.length+item
if(obj[item]!==undefined){return obj[item]}
else{index_error(obj)}}}
try{item=$B.$GetInt(item)}catch(err){}
if((is_list ||typeof obj=="string")
&& typeof item=="number"){item=item >=0 ? item :obj.length+item
if(obj[item]!==undefined){return obj[item]}
else{index_error(obj)}}
if(obj.$is_class){var class_gi=$B.$getattr(obj,"__class_getitem__",_b_.None)
if(class_gi !==_b_.None){return class_gi(item)}else if(obj.__class__){class_gi=$B.$getattr(obj.__class__,"__getitem__",_b_.None)
if(class_gi !==_b_.None){return class_gi(obj,item)}}}
var gi=$B.$getattr(obj,"__getitem__",_b_.None)
if(gi !==_b_.None){return gi(item)}
throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object is not subscriptable")}
$B.set_list_key=function(obj,key,value){try{key=$B.$GetInt(key)}
catch(err){if(_b_.isinstance(key,_b_.slice)){var s=_b_.slice.$conv_for_seq(key,obj.length)
return $B.set_list_slice_step(obj,s.start,s.stop,s.step,value)}}
if(key < 0){key+=obj.length}
if(obj[key]===undefined){console.log(obj,key)
throw _b_.IndexError.$factory("list assignment index out of range")}
obj[key]=value}
$B.set_list_slice=function(obj,start,stop,value){if(start===null){start=0}
else{start=$B.$GetInt(start)
if(start < 0){start=Math.max(0,start+obj.length)}}
if(stop===null){stop=obj.length}
stop=$B.$GetInt(stop)
if(stop < 0){stop=Math.max(0,stop+obj.length)}
var res=_b_.list.$factory(value)
obj.splice.apply(obj,[start,stop-start].concat(res))}
$B.set_list_slice_step=function(obj,start,stop,step,value){if(step===null ||step==1){return $B.set_list_slice(obj,start,stop,value)}
if(step==0){throw _b_.ValueError.$factory("slice step cannot be zero")}
step=$B.$GetInt(step)
if(start===null){start=step > 0 ? 0 :obj.length-1}
else{start=$B.$GetInt(start)
if(start < 0){start=Math.min(0,start+obj.length)}}
if(stop===null){stop=step > 0 ? obj.length :-1}
else{stop=$B.$GetInt(stop)
if(stop < 0){stop=Math.max(0,stop+obj.length)}}
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
return}else if(obj.__class__===$B.JSObject){$B.JSObject.__setattr__(obj,item,value)
return}else if(obj.__class__===_b_.list){return _b_.list.$setitem(obj,item,value)}
$B.$getattr(obj,"__setitem__")(item,value)}
$B.augm_item_add=function(obj,item,incr){if(Array.isArray(obj)&& typeof item=="number" &&
obj[item]!==undefined){if(Array.isArray(obj[item])&& Array.isArray(incr)){for(var i=0,len=incr.length;i < len;i++){obj[item].push(incr[i])}
return}else if(typeof obj[item]=="string" && typeof incr=="string"){obj[item]+=incr
return}}
var ga=$B.$getattr
try{var augm_func=ga(ga(obj,"__getitem__")(item),"__iadd__")}catch(err){ga(obj,"__setitem__")(item,ga(ga(obj,"__getitem__")(item),"__add__")(incr))
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
return a===b}
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
$B.$call=function(callable){if(callable.__class__===$B.method){return callable}
else if(callable.$is_func ||typeof callable=="function"){return callable}else if(callable.$factory){return callable.$factory}else if(callable.$is_class){
return callable.$factory=$B.$instance_creator(callable)}else if(callable.__class__===$B.JSObject){if(typeof(callable.js)=="function"){return callable.js}else{throw _b_.TypeError.$factory("'"+$B.class_name(callable)+
"' object is not callable")}}
try{return $B.$getattr(callable,"__call__")}catch(err){throw _b_.TypeError.$factory("'"+$B.class_name(callable)+
"' object is not callable")}}
var $io=$B.make_class("io",function(){return{__class__:$io}}
)
$io.flush=function(){}
$io.write=function(self,msg){
console.log(msg)
return _b_.None}
$B.stderr=$io.$factory()
$B.stdout=$io.$factory()
$B.stdin={__class__:$io,__original__:true,closed:false,len:1,pos:0,read:function(){return ""},readline:function(){return ""}}
$B.make_iterator_class=function(name){
var klass={__class__:_b_.type,__mro__:[_b_.object],$factory:function(items){return{
__class__:klass,__dict__:_b_.dict.$factory(),counter:-1,items:items,len:items.length}},$infos:{__name__:name},$is_class:true,__iter__:function(self){self.counter=self.counter===undefined ?-1 :self.counter
self.len=self.items.length
return self},__len__:function(self){return self.items.length},__next__:function(self){if(typeof self.len_func=="function" &&
self.len_func()!=self.len){throw _b_.RuntimeError.$factory(
"dictionary changed size during iteration")}
self.counter++
if(self.counter < self.items.length){return self.items[self.counter]}
throw _b_.StopIteration.$factory("StopIteration")},__reduce_ex__:function(self,protocol){return $B.fast_tuple([_b_.iter,_b_.tuple.$factory([self.items])])}}
$B.set_func_names(klass,"builtins")
return klass}
function $err(op,klass,other){var msg="unsupported operand type(s) for "+op+": '"+
klass.$infos.__name__+"' and '"+$B.class_name(other)+"'"
throw _b_.TypeError.$factory(msg)}
var ropnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or"]
var ropsigns=["+","-","*","/","//","%","**","<<",">>","&","^","|"]
$B.make_rmethods=function(klass){for(var j=0,_len_j=ropnames.length;j < _len_j;j++){if(klass["__"+ropnames[j]+"__"]===undefined){klass["__"+ropnames[j]+"__"]=(function(name,sign){return function(self,other){try{return $B.$getattr(other,"__r"+name+"__")(self)}
catch(err){$err(sign,klass,other)}}})(ropnames[j],ropsigns[j])}}}
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
var method=$B.$getattr(item,"__index__",_b_.None)
if(method !==_b_.None){method=typeof method=="function" ?
method :$B.$getattr(method,"__call__")
return $B.int_or_bool(method)}
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
$B.frames_stack.push(frame)}
function exit_ctx_managers_in_generators(frame){
for(key in frame[1]){if(frame[1][key]&& frame[1][key].$is_generator_obj){var gen_obj=frame[1][key]
if(gen_obj.env !==undefined){for(var attr in gen_obj.env){if(attr.search(/^\$ctx_manager_exit\d+$/)>-1){
$B.$call(gen_obj.env[attr])()}}}}}}
$B.leave_frame=function(arg){
if($B.frames_stack.length==0){console.log("empty stack");return}
$B.del_exc()
var frame=$B.frames_stack.pop()
if(frame[1].$has_yield_in_cm){
exit_ctx_managers_in_generators(frame)}}
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
if(z < max_int){return z}
return $B.long_int.__add__($B.long_int.$factory(x),$B.long_int.$factory(y))}else{
return new Number(x+y)}}else if(typeof x=="string" && typeof y=="string"){
return x+y}
try{var method=$B.$getattr(x.__class__ ||$B.get_class(x),"__add__")}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("unsupported operand type(s) for "+
"+: '"+$B.class_name(x)+"' and '"+$B.class_name(y)+"'")}
throw err}
return $B.$call(method)(x,y)}
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
return $B.long_int.__mul__($B.long_int.$factory(x),$B.long_int.$factory(y))}else{return z}}
$B.sub=function(x,y){var z=(typeof x !="number" ||typeof y !="number")?
new Number(x-y):x-y
if(x > min_int && x < max_int && y > min_int && y < max_int
&& z > min_int && z < max_int){return z}
else if((typeof x=="number" ||x.__class__===$B.long_int)
&&(typeof y=="number" ||y.__class__===$B.long_int)){if((typeof x=="number" && isNaN(x))||
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
var res,rev_op,compared=false
if(x.$is_class ||x.$factory){if(op=="__eq__"){return(x===y)}else if(op=="__ne__"){return !(x===y)}else{throw _b_.TypeError.$factory("'"+method2comp[op]+
"' not supported between instances of '"+$B.class_name(x)+
"' and '"+$B.class_name(y)+"'")}}
if(x.__class__ && y.__class__){
if(y.__class__.__mro__.indexOf(x.__class__)>-1){rev_op=reversed_op[op]||op
var rev_func=$B.$getattr(y,rev_op)
res=$B.$call($B.$getattr(y,rev_op))(x)
if(res !==_b_.NotImplemented){return res}
compared=true}}
res=$B.$call($B.$getattr(x,op))(y)
if(res !==_b_.NotImplemented){return res}
if(compared){return false}
rev_op=reversed_op[op]||op
res=$B.$call($B.$getattr(y,rev_op))(x)
if(res !==_b_.NotImplemented ){return res}
if(op=="__eq__"){return _b_.False}
else if(op=="__ne__"){return _b_.True}
throw _b_.TypeError.$factory("'"+method2comp[op]+
"' not supported between instances of '"+$B.class_name(x)+
"' and '"+$B.class_name(y)+"'")}
var opname2opsign={sub:"-",xor:"^",mul:"*"}
$B.rich_op=function(op,x,y){var x_class=x.__class__ ||$B.get_class(x),y_class=y.__class__ ||$B.get_class(y),method
if(x_class===y_class){
try{method=$B.$call($B.$getattr(x,"__"+op+"__"))}catch(err){if(err.__class__===_b_.AttributeError){var kl_name=$B.class_name(x)
throw _b_.TypeError.$factory("unsupported operand type(s) "+
"for "+opname2opsign[op]+": '"+kl_name+"' and '"+
kl_name+"'")}
throw err}
return method(y)}
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
$B.is_none=function(o){return o===undefined ||o===null ||o==_b_.None}})(__BRYTHON__)
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(obj,fromIndex){if(fromIndex < 0)fromIndex+=this.length
for(var i=fromIndex ||0,len=this.length;i < len;i++){if(this[i]===obj){return i}}
return-1}}
if(!String.prototype.repeat){String.prototype.repeat=function(count){if(count < 1){return ''}
var result='',pattern=this.valueOf()
while(count > 1){if(count & 1){result+=pattern}
count >>=1,pattern+=pattern}
return result+pattern}}
;

;(function($B){var bltns=$B.InjectBuiltins()
eval(bltns)
_b_.__debug__=false
var object=_b_.object,odga=object.__getattribute__
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
if(x.$nat ||(y !==undefined && y.$nat)){throw _b_.TypeError.$factory(name+"() takes no keyword arguments")}}
var NoneType={$factory:function(){return None},$infos:{__name__:"NoneType",__module__:"builtins"},__bool__:function(self){return False},__class__:_b_.type,__hash__:function(self){return 0},__mro__:[object],__repr__:function(self){return 'None'},__str__:function(self){return 'None'},$is_class:true}
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
if(isinstance(obj,_b_.float)){return _b_.float.$factory(Math.abs(obj))}
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
if(obj.__class__===$B.long_int){if(obj.pos){return prefix+$B.long_int.to_base(obj,base)}
return '-'+prefix+$B.long_int.to_base(-obj,base)}
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
function callable(obj){check_nb_args('callable',1,arguments)
check_no_kw('callable',obj)
return hasattr(obj,'__call__')}
function chr(i){check_nb_args('chr',1,arguments)
check_no_kw('chr',i)
if(i < 0 ||i > 1114111){throw _b_.ValueError.$factory('Outside valid range')}
return String.fromCodePoint(i)}
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
code.__repr__=code.__str__=function(self){return '<code object '+self.name+', file '+self.filename+'>'}
code.__getattr__=function(self,attr){if(attr=="co_code"){return 'co_code'}
return self[attr]}
function compile(){var $=$B.args('compile',6,{source:null,filename:null,mode:null,flags:null,dont_inherit:null,optimize:null},['source','filename','mode','flags','dont_inherit','optimize'],arguments,{flags:0,dont_inherit:false,optimize:-1},null,null)
var module_name='$exec_'+$B.UUID()
$B.clear_ns(module_name)
$.__class__=code
$.co_flags=$.flags
$B.py2js($.source,module_name,module_name)
return $}
var __debug__=$B.debug > 0
function delattr(obj,attr){
check_no_kw('delattr',obj,attr)
check_nb_args('delattr',2,arguments)
if(typeof attr !='string'){throw _b_.TypeError.$factory("attribute name must be string, not '"+
$B.class_name(attr)+"'")}
return $B.$getattr(obj,'__delattr__')(attr)}
$B.$delete=function(name,is_global){
function del(obj){
if(obj.$is_generator_obj && obj.env){for(var attr in obj.env){if(attr.search(/^\$ctx_manager_exit\d+$/)>-1){$B.$call(obj.env[attr])()
delete obj.env[attr]}}}}
var found=false,frame=$B.last($B.frames_stack)
if(! is_global){if(frame[1][name]!==undefined){found=true
del(frame[1][name])
delete frame[1][name]}}else{if(frame[2]!=frame[0]&& frame[3][name]!==undefined){found=true
del(frame[3][name])
delete frame[3][name]}}
if(!found){throw _b_.NameError.$factory(name)}}
function dir(obj){if(obj===undefined){
var frame=$B.last($B.frames_stack),globals_obj=frame[3],res=_b_.list.$factory(),pos=0
for(var attr in globals_obj){if(attr.charAt(0)=='$' && attr.charAt(1)!='$'){
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
res.sort()
return res}catch(err){}
var res=[],pos=0
for(var attr in obj){if(attr.charAt(0)!=='$' && attr !=='__class__' &&
obj[attr]!==undefined){res[pos++]=attr}}
res.sort()
return res}
function divmod(x,y){check_no_kw('divmod',x,y)
check_nb_args('divmod',2,arguments)
var klass=x.__class__ ||$B.get_class(x)
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
function $$eval(src,_globals,_locals){var $=$B.args("eval",4,{src:null,globals:null,locals:null,is_exec:null},["src","globals","locals","is_exec"],arguments,{globals:_b_.None,locals:_b_.None,is_exec:false},null,null),src=$.src,_globals=$.globals,_locals=$.locals,is_exec=$.is_exec
var current_frame=$B.frames_stack[$B.frames_stack.length-1]
if(current_frame !==undefined){var current_locals_id=current_frame[0].replace(/\./,'_'),current_globals_id=current_frame[2].replace(/\./,'_')}
var stack_len=$B.frames_stack.length
if(src.__class__===code){is_exec=src.mode=="exec"
src=src.source}else if(typeof src !=='string'){throw _b_.TypeError.$factory("eval() arg 1 must be a string, bytes "+
"or code object")}
var globals_id='$exec_'+$B.UUID(),globals_name=globals_id,locals_id='$exec_'+$B.UUID(),parent_scope
if(_globals===_b_.None){if(current_locals_id==current_globals_id){locals_id=globals_id}
var local_scope={module:locals_id,id:locals_id,binding:{},bindings:{}}
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
for(var attr in _globals.$string_dict){grandparent_scope.binding[attr]=true}
for(var attr in _locals.$string_dict){parent_scope.binding[attr]=true}}}
$B.$py_module_path[globals_id]=$B.$py_module_path[current_globals_id]
eval('var $locals_'+globals_id+' = {}\nvar $locals_'+
locals_id+' = {}')
if(_globals===_b_.None){var gobj=current_frame[3],ex='var $locals_'+globals_id+' = gobj;',obj={}
eval(ex)
for(var attr in gobj){if((! attr.startsWith("$"))){obj[attr]=gobj[attr]}}
eval("$locals_"+globals_id+" = obj")}else{if(_globals.$jsobj){var items=_globals.$jsobj}
else{var items=_globals.$string_dict}
eval("$locals_"+globals_id+" = _globals.$string_dict")
for(var item in items){var item1=$B.to_alias(item)
try{eval('$locals_'+globals_id+'["'+item1+
'"] = items[item]')}catch(err){console.log(err)
console.log('error setting',item)
break}}}
_globals.$is_namespace=true
if(_locals===_b_.None){if(_globals !==_b_.None){eval('var $locals_'+locals_id+' = $locals_'+globals_id)}else{var lobj=current_frame[1],ex='',obj={}
for(var attr in current_frame[1]){if(attr.startsWith("$")&& !attr.startsWith("$$")){continue}
obj[attr]=lobj[attr]}
eval('$locals_'+locals_id+" = obj")}}else{if(_locals.$jsobj){var items=_locals.$jsobj}
else{var items=_locals.$string_dict}
for(var item in items){var item1=$B.to_alias(item)
try{eval('$locals_'+locals_id+'["'+item+'"] = items.'+item)}catch(err){console.log(err)
console.log('error setting',item)
break}}
eval("$locals_"+locals_id+".$exec_locals = true")}
_locals.$is_namespace=true
if(_globals===_b_.None && _locals===_b_.None &&
current_frame[0]==current_frame[2]){}else{eval("$locals_"+locals_id+".$src = src")}
var root=$B.py2js(src,globals_id,locals_id,parent_scope),js,gns,lns
if(_globals !==_b_.None && _locals==_b_.None){for(var attr in _globals.$string_dict){root.binding[attr]=true}}
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
if(!is_exec){throw _b_.SyntaxError.$factory(
"eval() argument must be an expression",'<string>',1,1,src)}}
js=root.to_js()
if(is_exec){var locals_obj=eval("$locals_"+locals_id),globals_obj=eval("$locals_"+globals_id)
if(_globals===_b_.None){var res=new Function("$locals_"+globals_id,"$locals_"+locals_id,js)(globals_obj,locals_obj)}else{current_globals_obj=current_frame[3]
current_locals_obj=current_frame[1]
var res=new Function("$locals_"+globals_id,"$locals_"+locals_id,"$locals_"+current_globals_id,"$locals_"+current_locals_id,js)(globals_obj,locals_obj,current_globals_obj,current_locals_obj)}}else{var res=eval(js)}
gns=eval("$locals_"+globals_id)
if($B.frames_stack[$B.frames_stack.length-1][2]==globals_id){gns=$B.frames_stack[$B.frames_stack.length-1][3]}
if(_locals !==_b_.None){lns=eval("$locals_"+locals_id)
for(var attr in lns){var attr1=$B.from_alias(attr)
if(attr1.charAt(0)!='$'){if(_locals.$jsobj){_locals.$jsobj[attr]=lns[attr]}
else{_locals.$string_dict[attr1]=lns[attr]}}}}else{for(var attr in lns){if(attr !=="$src"){current_frame[1][attr]=lns[attr]}}}
if(_globals !==_b_.None){
for(var attr in gns){attr1=$B.from_alias(attr)
if(attr1.charAt(0)!='$'){if(_globals.$jsobj){_globals.$jsobj[attr1]=gns[attr]}
else{_globals.$string_dict[attr]=gns[attr]}}}
for(var attr in _globals.$string_dict){if(attr.startsWith("$")&& !attr.startsWith("$$")){delete _globals.$string_dict[attr]}}}else{for(var attr in gns){if(attr !=="$src"){current_frame[3][attr]=gns[attr]}}}
if(res===undefined){return _b_.None}
return res}catch(err){err.src=src
err.module=globals_id
if(err.$py_error===undefined){throw $B.exception(err)}
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
return $$eval(src,globals,locals,true)||_b_.None}
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
var rawname=attr
attr=$B.to_alias(attr)
if(obj===undefined){console.log("get attr",attr,"of undefined")}
var is_class=obj.$is_class ||obj.$factory
var klass=obj.__class__
var $test=false 
if($test){console.log("$getattr",attr,obj,klass)}
if(klass !==undefined && klass.__bases__ &&
(klass.__bases__.length==0 ||
(klass.__bases__.length==1 &&
klass.__bases__[0]===_b_.object))){if(obj.hasOwnProperty(attr)){return obj[attr]}else if(obj.__dict__ &&
obj.__dict__.$string_dict.hasOwnProperty(attr)&&
!(klass.hasOwnProperty(attr)&&
klass[attr].__get__)){return obj.__dict__.$string_dict[attr]}else if(klass.hasOwnProperty(attr)){if(typeof klass[attr]!="function" &&
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
if(is_class){return $B.mappingproxy.$factory(obj)}else{if(obj.hasOwnProperty(attr)){return obj[attr]}else if(obj.$infos){if(obj.$infos.hasOwnProperty("__dict__")){return obj.$infos.__dict__}else if(obj.$infos.hasOwnProperty("__func__")){return obj.$infos.__func__.$infos.__dict__}}
return $B.obj_dict(obj)}
case '__doc__':
for(var i=0;i < builtin_names.length;i++){if(obj===_b_[builtin_names[i]]){_get_builtins_doc()
return $B.builtins_doc[builtin_names[i]]}}
break
case '__mro__':
if(obj.$is_class){
return _b_.tuple.$factory([obj].concat(obj.__mro__))}
break
case '__subclasses__':
if(klass.$factory ||klass.$is_class){var subclasses=obj.$subclasses ||[]
return function(){return subclasses}}
break
case '$$new':
if(klass===$B.JSObject && obj.js_func !==undefined){return $B.JSConstructor.$factory(obj)}
break}
if(typeof obj=='function'){var value=obj[attr]
if(value !==undefined){if(attr=='__module__'){return value}}}
if((! is_class)&& klass.$native){if($test){console.log("native class",klass,klass[attr])}
if(attr=="__doc__" && klass[attr]===undefined && klass.$infos){_get_builtins_doc()
klass[attr]=$B.builtins_doc[klass.$infos.__name__]}
if(klass[attr]===undefined){var object_attr=_b_.object[attr]
if($test){console.log("object attr",object_attr)}
if(object_attr !==undefined){klass[attr]=object_attr}else{if($test){console.log("obj[attr]",obj[attr])}
var attrs=obj.__dict__
if(attrs &&
(object_attr=attrs.$string_dict[attr])!==undefined){return object_attr}
if(_default===undefined){attr_error(attr,klass.$infos.__name__)}
return _default}}
if(klass.$descriptors && klass.$descriptors[attr]!==undefined){return klass[attr](obj)}
if(typeof klass[attr]=='function'){var func=klass[attr]
if(attr=='__new__'){func.$type="staticmethod"}
if(func.$type=="staticmethod"){return func}
var self=klass[attr].__class__==$B.method ? klass :obj,method=klass[attr].bind(null,self)
method.__class__=$B.method
method.$infos={__func__:func,__name__:attr,__self__:self,__qualname__:klass.$infos.__name__+"."+attr}
return method}else if(klass[attr]!==undefined){return klass[attr]}
attr_error(rawname,klass.$infos.__name__)}
var mro,attr_func
if(is_class){attr_func=_b_.type.__getattribute__ }else{attr_func=klass.__getattribute__
if(attr_func===undefined){var mro=klass.__mro__
if(mro===undefined){console.log(obj,attr,"no mro, klass",klass)}
for(var i=0,len=mro.length;i < len;i++){attr_func=mro[i]['__getattribute__']
if(attr_func !==undefined){break}}}}
if(typeof attr_func !=='function'){console.log(attr+' is not a function '+attr_func,klass)}
if($test){console.log("attr_func is odga",attr_func,attr_func===odga,obj[attr])}
if(attr_func===odga){var res=obj[attr]
if(Array.isArray(obj)&& Array.prototype[attr]!==undefined){
res=undefined}
if(res===null){return null}
else if(res===undefined && obj.hasOwnProperty(attr)){return res}else if(res !==undefined){if($test){console.log(obj,attr,obj[attr],res.__set__ ||res.$is_class)}
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
res.$jsobj.__BRYTHON__=$B.JSObject.$factory($B)
res.$is_namespace=true
return res}
function hasattr(obj,attr){check_no_kw('hasattr',obj,attr)
check_nb_args('hasattr',2,arguments)
try{$B.$getattr(obj,attr);return true}
catch(err){return false}}
var hash_cache={}
function hash(obj){check_no_kw('hash',obj)
check_nb_args('hash',1,arguments)
if(obj.__hashvalue__ !==undefined){return obj.__hashvalue__}
if(isinstance(obj,_b_.bool)){return _b_.int.$factory(obj)}
if(isinstance(obj,_b_.int)){return obj.valueOf()}
if(obj.$is_class ||
obj.__class__===_b_.type ||
obj.__class__===$B.Function){return obj.__hashvalue__=$B.$py_next_hash--}
if(typeof obj=="string"){var cached=hash_cache[obj]
if(cached !==undefined){return cached}
else{return hash_cache[obj]=_b_.str.__hash__(obj)}}
var klass=obj.__class__ ||$B.get_class(obj)
var hash_method=$B.$getattr(klass,'__hash__',_b_.None)
if(hash_method==_b_.None){throw _b_.TypeError.$factory("unhashable type: '"+
$B.class_name(obj)+"'",'hash')}
if(hash_method.$infos===undefined){return obj.__hashvalue__=hashfunc()}
if(hash_method.$infos.__func__===_b_.object.__hash__){if($B.$getattr(obj,'__eq__').$infos.__func__ !==_b_.object.__eq__){throw _b_.TypeError.$factory("unhashable type: '"+
$B.class_name(obj)+"'",'hash')}else{return _b_.object.__hash__(obj)}}else{return $B.$call(hash_method)(obj)}}
function _get_builtins_doc(){if($B.builtins_doc===undefined){
var url=$B.brython_path
if(url.charAt(url.length-1)=='/'){url=url.substr(0,url.length-1)}
url+='/builtins_docstrings.js'
var f=_b_.open(url)
eval(f.$content)
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
function input(msg){return prompt(msg ||'')||''}
function isinstance(obj,cls){check_no_kw('isinstance',obj,cls)
check_nb_args('isinstance',2,arguments)
if(obj===null){return cls===None}
if(obj===undefined){return false}
if(cls.constructor===Array){for(var i=0;i < cls.length;i++){if(isinstance(obj,cls[i])){return true}}
return false}
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
else if($B.builtin_classes.indexOf(cls)>-1){return false}}else if(obj.contructor===Number && Number.isFinite(obj)){if(cls==_b_.float){return true}
else if($B.builtin_classes.indexOf(cls)>-1){return false}}else if(typeof obj=='number' && Number.isFinite(obj)){if(Number.isFinite(obj)&& cls==_b_.int){return true}
else if($B.builtin_classes.indexOf(cls)>-1){return false}}
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
if(classinfo.$factory ||classinfo.$is_class){if(klass===classinfo ||
klass.__mro__.indexOf(classinfo)>-1){return true}}
var sch=$B.$getattr(classinfo,'__subclasscheck__',_b_.None)
if(sch==_b_.None){return false}
if(classinfo===_b_.type ||
(classinfo.__bases__ &&
classinfo.__bases__.indexOf(_b_.type)>-1)){return sch(classinfo,klass)}
return sch(klass)}
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
if(!func){func=function(x){return x}}
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
var NotImplemented={__class__:NotImplementedType}
function $not(obj){return !$B.$bool(obj)}
function oct(obj){check_no_kw('oct',obj)
check_nb_args('oct',1,arguments)
return bin_hex_oct(8,obj)}
function ord(c){check_no_kw('ord',c)
check_nb_args('ord',1,arguments)
if(typeof c=='string'){if(c.length==1){return c.charCodeAt(0)}
throw _b_.TypeError.$factory('ord() expected a character, but '+
'string of length '+c.length+' found')}
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
function pow(x,y){var $=$B.args('pow',3,{x:null,y:null,z:null},['x','y','z'],arguments,{z:null},null,null),z=$.z
var klass=x.__class__ ||$B.get_class(x),res=$B.$call($B.$getattr(klass,'__pow__'))(x,y,z)
if(z===null){return res}
else{if(x !=_b_.int.$factory(x)||y !=_b_.int.$factory(y)){throw _b_.TypeError.$factory("pow() 3rd argument not allowed "+
"unless all arguments are integers")}
return $B.$getattr(res,'__mod__')(z)}}
function $print(){var $ns=$B.args('print',0,{},[],arguments,{},'args','kw')
var ks=$ns['kw'].$string_dict
var end=(ks['end']===undefined ||ks['end']===None)? '\n' :ks['end'],sep=(ks['sep']===undefined ||ks['sep']===None)? ' ' :ks['sep'],file=ks['file']===undefined ? $B.stdout :ks['file'],args=$ns['args']
var items=[]
args.forEach(function(arg){items.push(_b_.str.$factory(arg))})
var res=items.join(sep)+end
res=res.replace(new RegExp("\u0007","g"),"").
replace(new RegExp("(.)\b","g"),"")
$B.$getattr(file,'write')(res)
var flush=$B.$getattr(file,'flush',None)
if(flush !==None){flush()}
return None}
$print.__name__='print'
$print.is_func=true
var property=$B.make_class("property")
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
return None}
if($test){console.log("set attr",attr,"to",obj)}
if(obj.$factory ||obj.$is_class){var metaclass=obj.__class__
if($test){console.log("obj is class",metaclass,metaclass[attr])}
if(metaclass && metaclass[attr]&& metaclass[attr].__get__ &&
metaclass[attr].__set__){metaclass[attr].__set__(obj,value)
return None}
obj[attr]=value
if(attr=="__init__" ||attr=="__new__"){
obj.$factory=$B.$instance_creator(obj)}else if(attr=="__bases__"){
obj.__mro__=_b_.type.mro(obj)}
if($test){console.log("after setattr",obj)}
return None}
var res=obj[attr],klass=obj.__class__ ||$B.get_class(obj)
if($test){console.log('set attr',attr,'of obj',obj,'class',klass)}
if(res===undefined && klass){res=klass[attr]
if(res===undefined){var mro=klass.__mro__,_len=mro.length
for(var i=0;i < _len;i++){res=mro[i][attr]
if(res !==undefined){break}}}}
if($test){console.log('set attr',attr,'found in class',res)}
if(res !==undefined){
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
if(mangled_slots(klass).indexOf(attr)>-1){has_slot=true}else{for(var i=0;i < klass.__mro__.length;i++){var kl=klass.__mro__[i]
if(mangled_slots(kl).indexOf(attr)>-1){has_slot=true
break}}}
if(! has_slot){throw _b_.AttributeError.$factory("'"+klass.$infos.__name__+
"' object has no attribute '"+attr+"'")}}
if($test){console.log("attr",attr,"use _setattr",_setattr)}
if(!_setattr){if(obj.__dict__===undefined){obj[attr]=value}else{obj.__dict__.$string_dict[attr]=value}}else{_setattr(obj,attr,value)}
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
res=$B.$getattr(res,'__add__')(_item)}catch(err){if(err.__class__===_b_.StopIteration){break}else{throw err}}}
return res}
$B.missing_super2=function(obj){obj.$missing=true
return obj}
var $$super=$B.make_class("super",function(_type1,_type2){var missing2=false
if(Array.isArray(_type2)){_type2=_type2[0]
missing2=true}
return{__class__:$$super,__thisclass__:_type1,__self_class__:_type2,$missing2:missing2}}
)
$$super.__getattribute__=function(self,attr){var mro=self.__thisclass__.__mro__,res
var sc=self.__self_class__
if(sc !==undefined){if(!sc.$is_class){sc=sc.__class__}
var sc_mro=[sc].concat(sc.__mro__)
for(var i=0;i < sc_mro.length;i++){if(sc_mro[i]===self.__thisclass__){mro=sc_mro.slice(i+1)
break}}}
if(attr=="__repr__" ||attr=="__str__"){
return function(){return $$super.__repr__(self)}}
var f=_b_.type.__getattribute__(mro[0],attr)
var $test=false 
if($test){console.log("super",attr,self,f,f+'')}
if(f.$type=="staticmethod"){return f}
else{if(f.__class__===$B.method){
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
$$super.__repr__=$$super.__str__=function(self){var res="<super: <class '"+self.__thisclass__.$infos.__name__+"'>"
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
var binary=self.$content.__class__===_b_.bytes,len=binary ? self.$content.source.length :self.$content.length
if(size < 0){size=len}
if(self.$content.__class__===_b_.bytes){res=_b_.bytes.$factory(self.$content.source.slice(self.$counter,self.$counter+size))}else{res=self.$content.substr(self.$counter,size)}
self.$counter+=size
return res}
$Reader.readable=function(self){return true}
$Reader.readline=function(self,size){var $=$B.args("readline",2,{self:null,size:null},["self","size"],arguments,{size:-1},null,null),self=$.self,size=$B.$GetInt($.size)
self.$lc=self.$lc===undefined ?-1 :self.$lc
if(self.closed===true){throw _b_.ValueError.$factory('I/O operation on closed file')}
if(self.$lc==self.$lines.length-1){return ''}
self.$lc++
var line=self.$lines[self.$lc]
if(size > 0){line=line.substr(0,size)}
self.$counter+=line.length
return line}
$Reader.readlines=function(){var $=$B.args("readlines",2,{self:null,hint:null},["self","hint"],arguments,{hint:-1},null,null),self=$.self,hint=$B.$GetInt($.hint)
var nb_read=0
if(self.closed===true){throw _b_.ValueError.$factory('I/O operation on closed file')}
self.$lc=self.$lc===undefined ?-1 :self.$lc
if(hint < 0){var lines=self.$lines.slice(self.$lc+1)}else{var lines=[]
while(self.$lc < self.$lines.length &&
nb_read < hint){self.$lc++
lines.push(self.$lines[self.$lc])}}
while(lines[lines.length-1]==''){lines.pop()}
return lines}
$Reader.seek=function(self,offset,whence){if(self.closed===True){throw _b_.ValueError.$factory('I/O operation on closed file')}
if(whence===undefined){whence=0}
if(whence===0){self.$counter=offset}
else if(whence===1){self.$counter+=offset}
else if(whence===2){self.$counter=self.$content.length+offset}}
$Reader.seekable=function(self){return true}
$Reader.tell=function(self){return self.$counter}
$Reader.writable=function(self){return false}
$B.set_func_names($Reader,"builtins")
var $BufferedReader=$B.make_class('_io.BufferedReader')
$BufferedReader.__mro__=[$Reader,object]
var $TextIOWrapper=$B.make_class('_io.TextIOWrapper')
$TextIOWrapper.__mro__=[$Reader,object]
$B.set_func_names($TextIOWrapper,"builtins")
$B.TextIOWrapper=$TextIOWrapper
function $url_open(){
var $ns=$B.args('open',3,{file:null,mode:null,encoding:null},['file','mode','encoding'],arguments,{mode:'r',encoding:'utf-8'},'args','kw'),$res
for(var attr in $ns){eval('var '+attr+'=$ns["'+attr+'"]')}
if(args.length > 0){var mode=args[0]}
if(args.length > 1){var encoding=args[1]}
if(isinstance(file,$B.JSObject)){return $B.OpenFile.$factory(file.js,mode,encoding)}
if(mode.search('w')>-1){throw _b_.IOError.$factory("Browsers cannot write on disk")}else if(['r','rb'].indexOf(mode)==-1){throw _b_.ValueError.$factory("Invalid mode '"+mode+"'")}
if(isinstance(file,_b_.str)){
var is_binary=mode.search('b')>-1
if($B.file_cache.hasOwnProperty($ns.file)){var str_content=$B.file_cache[$ns.file]
if(is_binary){$res=_b_.str.encode(str_content,"utf-8")}else{$res=str_content}}else if($B.files && $B.files.hasOwnProperty($ns.file)){
$res=atob($B.files[$ns.file].content)
var source=[]
for(const char of $res){source.push(char.charCodeAt(0))}
$res=_b_.bytes.$factory()
$res.source=source
if(! is_binary){
$res=_b_.bytes.decode($res,$ns.encoding)}}else if($B.protocol !="file"){
if(is_binary){throw _b_.IOError.$factory(
"open() in binary mode is not supported")}
var req=new XMLHttpRequest();
req.onreadystatechange=function(){try{var status=this.status
if(status==404){$res=_b_.FileNotFoundError.$factory(file)}else if(status !=200){$res=_b_.IOError.$factory('Could not open file '+
file+' : status '+status)}else{$res=this.responseText}}catch(err){$res=_b_.IOError.$factory('Could not open file '+
file+' : error '+err)}}
var fake_qs='?foo='+(new Date().getTime())
req.open('GET',file+fake_qs,false)
req.overrideMimeType('text/plain; charset=utf-8')
req.send()
if($res.constructor===Error){throw $res}}
if($res===undefined){throw _b_.FileNotFoundError.$factory($ns.file)}
if(typeof $res=="string"){var lines=$res.split('\n')
for(var i=0;i < lines.length-1;i++){lines[i]+='\n'}}else{var lines=_b_.bytes.split($res,_b_.bytes.$factory([10]))}
var res={$content:$res,$counter:0,$lines:lines,closed:False,encoding:encoding,mode:mode,name:file}
res.__class__=is_binary ? $BufferedReader :$TextIOWrapper
return res}}
var zip=$B.make_class("zip",function(){var res={__class__:zip,items:[]}
if(arguments.length==0)return res
var $ns=$B.args('zip',0,{},[],arguments,{},'args','kw')
var _args=$ns['args']
var args=[]
for(var i=0;i < _args.length;i++){args.push(iter(_args[i]))}
var rank=0,items=[]
while(1){var line=[],flag=true
for(var i=0;i < args.length;i++){try{line.push(next(args[i]))}catch(err){if(err.__class__==_b_.StopIteration){flag=false
break}else{throw err}}}
if(!flag){break}
items[rank++]=_b_.tuple.$factory(line)}
res.items=items
return res}
)
var zip_iterator=$B.make_iterator_class('zip_iterator')
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
$B.Function={__class__:_b_.type,__code__:{__class__:FunctionCode,__name__:'function code'},__globals__:{__class__:FunctionGlobals,__name__:'function globals'},__mro__:[object],$infos:{__name__:'function',__module__:"builtins"},$is_class:true}
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
self.$infos.__dict__.$string_dict[attr]!==undefined){return self.$infos.__dict__.$string_dict[attr]}else if(attr=="__closure__"){var free_vars=self.$infos.__code__.co_freevars
if(free_vars.length==0){return None}
var cells=[]
for(var i=0;i < free_vars.length;i++){try{cells.push($B.cell.$factory($B.$check_def_free(free_vars[i])))}catch(err){
cells.push($B.cell.$factory(None))}}
return _b_.tuple.$factory(cells)}else if(self.$attrs && self.$attrs[attr]!==undefined){return self.$attrs[attr]}else{return _b_.object.__getattribute__(self,attr)}}
$B.Function.__repr__=$B.Function.__str__=function(self){if(self.$infos===undefined){return '<function '+self.name+'>'}else{return '<function '+self.$infos.__qualname__+'>'}}
$B.Function.__mro__=[object]
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
$B.builtin_funcs=["abs","all","any","ascii","bin","callable","chr","compile","delattr","dir","divmod","eval","exec","exit","format","getattr","globals","hasattr","hash","help","hex","id","input","isinstance","issubclass","iter","len","locals","max","min","next","oct","open","ord","pow","print","quit","repr","round","setattr","sorted","sum","vars"
]
var builtin_function=$B.builtin_function=$B.make_class("builtin_function_or_method")
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
frame[1].$current_exception=$B.exception(exc)}
$B.get_exc=function(){var frame=$B.last($B.frames_stack)
return frame[1].$current_exception}
$B.$raise=function(arg){
if(arg===undefined){var es=$B.get_exc()
if(es !==undefined){throw es}
throw _b_.RuntimeError.$factory("No active exception to reraise")}else if(isinstance(arg,BaseException)){throw arg}else if(arg.$is_class && issubclass(arg,BaseException)){throw $B.$call(arg)()}else{throw _b_.TypeError.$factory("exceptions must derive from BaseException")}}
$B.$syntax_err_line=function(exc,module,src,pos,line_num){
var pos2line={},lnum=1,module=module.charAt(0)=="$" ? "<string>" :module
if(src===undefined){exc.$line_info=line_num+','+module
exc.args=_b_.tuple.$factory([$B.$getitem(exc.args,0),module,line_num,0,0])}else{var line_pos={1:0}
for(var i=0,len=src.length;i < len;i++){pos2line[i]=lnum
if(src.charAt(i)=="\n"){line_pos[++lnum]=i}}
while(line_num===undefined){line_num=pos2line[pos]
pos--}
exc.$line_info=line_num+","+module
var lines=src.split("\n"),line=lines[line_num-1],lpos=pos-line_pos[line_num],len=line.length
exc.text=line
lpos-=len-line.length
if(lpos < 0){lpos=0}
while(line.charAt(0)==' '){line=line.substr(1)
if(lpos > 0){lpos--}}
exc.offset=lpos
exc.args=_b_.tuple.$factory([$B.$getitem(exc.args,0),module,line_num,lpos,line])}
exc.lineno=line_num
exc.msg=exc.args[0]
exc.filename=module}
$B.$SyntaxError=function(module,msg,src,pos,line_num,root){
if(root !==undefined && root.line_info !==undefined){
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
var traceback=$B.traceback=$B.make_class("traceback",function(exc,stack){if(stack===undefined)
stack=exc.$stack
return{
__class__ :traceback,$stack:stack,exc:exc}}
)
traceback.__getattribute__=function(self,attr){var line_info
if(attr==='tb_frame' ||
attr==='tb_lineno' ||
attr==='tb_lasti' ||
attr==='tb_next'){if(self.$stack.length==0){console.log("no stack",attr)}
var first_frame=self.$stack[0]
if(first_frame===undefined){console.log("last frame undef",self.$stack,Object.keys(self.$stack))}
var line_info=first_frame[1].$line_info}
switch(attr){case "tb_frame":
return frame.$factory(self.$stack)
case "tb_lineno":
if(line_info===undefined ||
first_frame[0].search($B.lambda_magic)>-1){if(first_frame[4]&& first_frame[4].$infos &&
first_frame[4].$infos.__code__){return first_frame[4].$infos.__code__.co_firstlineno}
return-1}
else{return parseInt(line_info.split(",")[0])}
case "tb_lasti":
if(line_info===undefined){return "<unknown>"}else{var info=line_info.split(","),src
for(var i=self.$stack.length-1;i >=0;i--){var fr=self.$stack[i]
if(fr[2]==info[1]){src=fr[3].$src
break}}
if(src===undefined && $B.file_cache.hasOwnProperty(info[1])){src=$B.file_cache[info[1]]}
if(src !==undefined){return src.split("\n")[parseInt(info[0]-1)].trim()}else{return "<unknown>"}}
case "tb_next":
if(self.$stack.length <=1){return None}
else{return traceback.$factory(self.exc,self.$stack.slice(1))}
default:
return _b_.object.__getattribute__(self,attr)}}
$B.set_func_names(traceback,"builtins")
var frame=$B.make_class("frame",function(stack,pos){var fs=stack
var res={__class__:frame,f_builtins :{},
$stack:deep_copy(stack)}
if(pos===undefined){pos=0}
res.$pos=pos
if(fs.length){var _frame=fs[pos],locals_id=_frame[0],filename
try{res.f_locals=$B.obj_dict(_frame[1])}catch(err){console.log("err "+err)
throw err}
res.f_globals=$B.obj_dict(_frame[3])
if(_frame[3].__file__ !==undefined){filename=_frame[3].__file__}else if(locals_id.startsWith("$exec")){filename="<string>"}
if(_frame[1].$line_info===undefined){res.f_lineno=-1}else{var line_info=_frame[1].$line_info.split(",")
res.f_lineno=parseInt(line_info[0])
var module_name=line_info[1]
if($B.imported.hasOwnProperty(module_name)){filename=$B.imported[module_name].__file__}
res.f_lineno=parseInt(_frame[1].$line_info.split(',')[0])}
var co_name=locals_id.startsWith("$exec")? "<string>" :
locals_id
if(locals_id==_frame[2]){co_name="<module>"}else{if(_frame[0].$name){co_name=_frame[0].$name}else if(_frame.length > 4){if(_frame[4].$infos){co_name=_frame[4].$infos.__name__}else{co_name=_frame[4].name}
if(filename===undefined && _frame[4].$infos.__code__){filename=_frame[4].$infos.__code__.co_filename
res.f_lineno=_frame[4].$infos.__code__.co_firstlineno}}}
res.f_code={__class__:$B.code,co_code:None,
co_name:co_name,
co_filename:filename }
if(res.f_code.co_filename===undefined){res.f_code.co_filename="<string>"}}
return res}
)
frame.__getattr__=function(self,attr){
if(attr=="f_back"){if(self.$pos > 0){return frame.$factory(self.$stack.slice(0,self.$stack.length-1))}else{return _b_.None}}else if(attr=="clear"){return function(){}}}
$B.set_func_names(frame,"builtins")
$B._frame=frame 
var BaseException=_b_.BaseException={__class__:_b_.type,__bases__ :[_b_.object],__mro__:[_b_.object],args:[],$infos:{__name__:"BaseException",__module__:"builtins"},$is_class:true}
BaseException.__init__=function(self){var args=arguments[1]===undefined ?[]:[arguments[1]]
self.args=_b_.tuple.$factory(args)}
BaseException.__repr__=function(self){return self.__class__.$infos.__name__+repr(self.args)}
BaseException.__str__=function(self){if(self.args.length > 0){return _b_.str.$factory(self.args[0])}
return self.__class__.$infos.__name__}
BaseException.__new__=function(cls){var err=_b_.BaseException.$factory()
err.__class__=cls
err.__dict__=_b_.dict.$factory()
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
var module=line_info[1]
if(module.charAt(0)=="$"){module="<module>"}
info+="\n  module "+module+" line "+line_info[0]
if(frame.length > 4 && frame[4].$infos){info+=', in '+frame[4].$infos.__name__}
if(src !==undefined){var lines=src.split("\n"),line=lines[parseInt(line_info[0])-1]
if(line){line=line.replace(/^[ ]+/g,"")}
info+="\n    "+line}else{console.log("src undef",line_info)}}
if(exc.__class__===_b_.SyntaxError){info+="\n  File "+exc.args[1]+", line "+exc.args[2]+
"\n    "+exc.args[4]}
return info}
BaseException.__getattr__=function(self,attr){if(attr=="info"){return getExceptionTrace(self,false);}else if(attr=="infoWithInternal"){return getExceptionTrace(self,true);}else if(attr=="__traceback__"){
if(self.$traceback !==undefined){return self.$traceback}
return traceback.$factory(self)}else{throw _b_.AttributeError.$factory(self.__class__.$infos.__name__+
" has no attribute '"+attr+"'")}}
BaseException.with_traceback=function(self,tb){self.$traceback=tb
return self}
function deep_copy(stack){var result=stack.slice();
for(var i=0;i < result.length;i++){
result[i]=result[i].slice()
result[i][1]={$line_info:result[i][1].$line_info}}
return result;}
BaseException.$factory=function(){var err=Error()
err.args=_b_.tuple.$factory(Array.prototype.slice.call(arguments))
err.__class__=_b_.BaseException
err.$py_error=true
if(err.$stack===undefined){err.$stack=deep_copy($B.frames_stack);}
if($B.frames_stack.length){err.$line_info=$B.last($B.frames_stack)[1].$line_info}
eval("//placeholder//")
err.__cause__=_b_.None 
err.__context__=_b_.None 
err.__suppress_context__=false 
return err}
BaseException.$factory.$infos={__name__:"BaseException",__qualname__:"BaseException"}
$B.set_func_names(BaseException)
_b_.BaseException=BaseException
$B.exception=function(js_exc){
if(! js_exc.$py_error){console.log("Javascript exception:",js_exc)
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
exc.$stack=deep_copy($B.frames_stack);}else{var exc=js_exc}
return exc}
$B.is_exc=function(exc,exc_list){
if(exc.__class__===undefined){exc=$B.exception(exc)}
var this_exc_class=exc.__class__
for(var i=0;i < exc_list.length;i++){var exc_class=exc_list[i]
if(this_exc_class===undefined){console.log("exc class undefined",exc)}
if(issubclass(this_exc_class,exc_class)){return true}}
return false}
$B.is_recursion_error=function(js_exc){
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
$make_exc([["StopIteration","err.value = arguments[0]"],["StopAsyncIteration","err.value = arguments[0]"],"ArithmeticError","AssertionError","AttributeError","BufferError","EOFError","ImportError","LookupError","MemoryError","NameError","OSError","ReferenceError","RuntimeError","SyntaxError","SystemError","TypeError","ValueError","Warning"],_b_.Exception)
$make_exc(["FloatingPointError","OverflowError","ZeroDivisionError"],_b_.ArithmeticError)
$make_exc(["ModuleNotFoundError"],_b_.ImportError)
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
var RangeIterator={__class__:_b_.type,__mro__:[_b_.object],__iter__:function(self){return self},__next__:function(self){return _b_.next(self.obj)},$infos:{__name__:"range_iterator",__module__:"builtins"}}
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
range.__repr__=range.__str__=function(self){var res="range("+_b_.str.$factory(self.start)+", "+
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
slice.__repr__=slice.__str__=function(self){return "slice("+_b_.str.$factory(self.start)+", "+
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
if($B.gt(0,start)){start=$B.add(start,len)}
if($B.gt(0,start)){start=step < 0 ?-1 :0}
if($B.ge(start,len)){start=step < 0 ? len_1 :len}}
if(self.stop===None){stop=step_is_neg ?-1 :len}else{stop=$B.PyNumber_Index(self.stop)
if($B.gt(0,stop)){stop+=len}
if($B.gt(0,stop)){stop=step < 0 ?-1 :0}
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
;(function($B){var _b_=$B.builtins,object=_b_.object,isinstance=_b_.isinstance,getattr=_b_.getattr,None=_b_.None
var from_unicode={},to_unicode={}
$B.to_bytes=function(obj){var res
if(_b_.isinstance(obj,[bytes,bytearray])){res=obj.source}else{var ga=$B.$getattr(obj,"tobytes",null)
if(ga !==null){res=$B.$call(ga)().source}
else{throw _b_.TypeError.$factory("object doesn't support the buffer protocol")}}
return res}
function _strip(self,cars,lr){if(cars===undefined){cars=[]
var ws='\r\n \t'
for(var i=0,len=ws.length;i < len;i++){cars.push(ws.charCodeAt(i))}}else if(isinstance(cars,bytes)){cars=cars.source}else{throw _b_.TypeError.$factory("Type str doesn't support the buffer API")}
if(lr=='l'){for(var i=0,len=self.source.length;i < len;i++){if(cars.indexOf(self.source[i])==-1){break}}
return bytes.$factory(self.source.slice(i))}
for(var i=self.source.length-1;i >=0;i--){if(cars.indexOf(self.source[i])==-1){break}}
return bytes.$factory(self.source.slice(0,i+1))}
function invalid(other){return ! _b_.isinstance(other,[bytes,bytearray])}
var bytearray={__class__:_b_.type,__mro__:[object],$buffer_protocol:true,$infos:{__module__:"builtins",__name__:"bytearray"},$is_class:true}
var mutable_methods=["__delitem__","clear","copy","count","index","pop","remove","reverse","sort"]
mutable_methods.forEach(function(method){bytearray[method]=(function(m){return function(self){var args=[self.source],pos=1
for(var i=1,len=arguments.length;i < len;i++){args[pos++]=arguments[i]}
return _b_.list[m].apply(null,args)}})(method)})
var bytearray_iterator=$B.make_iterator_class('bytearray_iterator')
bytearray.__iter__=function(self){return bytearray_iterator.$factory(self.source)}
bytearray.__mro__=[object]
bytearray.__repr__=bytearray.__str__=function(self){return 'bytearray('+bytes.__repr__(self)+")"}
bytearray.__setitem__=function(self,arg,value){if(isinstance(arg,_b_.int)){if(! isinstance(value,_b_.int)){throw _b_.TypeError.$factory('an integer is required')}else if(value > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
var pos=arg
if(arg < 0){pos=self.source.length+pos}
if(pos >=0 && pos < self.source.length){self.source[pos]=value}
else{throw _b_.IndexError.$factory('list index out of range')}}else if(isinstance(arg,_b_.slice)){var start=arg.start===None ? 0 :arg.start
var stop=arg.stop===None ? self.source.length :arg.stop
if(start < 0){start=self.source.length+start}
if(stop < 0){stop=self.source.length+stop}
self.source.splice(start,stop-start)
try{var $temp=_b_.list.$factory(value)
for(var i=$temp.length-1;i >=0;i--){if(! isinstance($temp[i],_b_.int)){throw _b_.TypeError.$factory('an integer is required')}else if($temp[i]> 255){throw ValueError.$factory("byte must be in range(0, 256)")}
self.source.splice(start,0,$temp[i])}}catch(err){throw _b_.TypeError.$factory("can only assign an iterable")}}else{throw _b_.TypeError.$factory('list indices must be integer, not '+
$B.class_name(arg))}}
bytearray.append=function(self,b){if(arguments.length !=2){throw _b_.TypeError.$factory(
"append takes exactly one argument ("+(arguments.length-1)+
" given)")}
if(! isinstance(b,_b_.int)){throw _b_.TypeError.$factory("an integer is required")}
if(b > 255){throw ValueError.$factory("byte must be in range(0, 256)")}
self.source[self.source.length]=b}
bytearray.extend=function(self,b){if(b.__class__===bytearray ||b.__class__===bytes){b.source.forEach(function(item){self.source.push(item)})
return _b_.None}
var it=_b_.iter(b)
while(true){try{bytearray.__add__(self,_b_.next(it))}catch(err){if(err===_b_.StopIteration){break}
throw err}}
return _b_.None}
bytearray.insert=function(self,pos,b){if(arguments.length !=3){throw _b_.TypeError.$factory(
"insert takes exactly 2 arguments ("+(arguments.length-1)+
" given)")}
if(!isinstance(b,_b_.int)){throw _b_.TypeError.$factory("an integer is required")}
if(b > 255){throw ValueError.$factory("byte must be in range(0, 256)")}
_b_.list.insert(self.source,pos,b)}
bytearray.$factory=function(source,encoding,errors){return bytearray.__new__(bytearray,source,encoding,errors)}
var bytes={__class__ :_b_.type,__mro__:[object],$buffer_protocol:true,$infos:{__module__:"builtins",__name__:"bytes"},$is_class:true}
bytes.__add__=function(self,other){if(isinstance(other,bytes)){return self.__class__.$factory(self.source.concat(other.source))}else if(isinstance(other,bytearray)){return self.__class__.$factory(bytes.__add__(self,bytes.$factory(other)))}else if(isinstance(other,_b_.memoryview)){return self.__class__.$factory(bytes.__add__(self,_b_.memoryview.tobytes(other)))}
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
return getattr(self.source,'__eq__')(other.source)}
bytes.__ge__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__ge__(self.source,other.source)}
bytes.__getitem__=function(self,arg){var i
if(isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos=self.source.length+pos}
if(pos >=0 && pos < self.source.length){return self.source[pos]}
throw _b_.IndexError.$factory("index out of range")}else if(isinstance(arg,_b_.slice)){var step=arg.step===None ? 1 :arg.step
if(step > 0){var start=arg.start===None ? 0 :arg.start
var stop=arg.stop===None ?
getattr(self.source,'__len__')():arg.stop}else{var start=arg.start===None ?
getattr(self.source,'__len__')()-1 :arg.start
var stop=arg.stop===None ? 0 :arg.stop}
if(start < 0){start=self.source.length+start}
if(stop < 0){stop=self.source.length+stop}
var res=[],i=null,pos=0
if(step > 0){stop=Math.min(stop,self.source.length)
if(stop <=start){return bytes.$factory([])}
for(var i=start;i < stop;i+=step){res[pos++]=self.source[i]}}else{if(stop >=start){return bytes.$factory([])}
stop=Math.max(0,stop)
for(var i=start;i >=stop;i+=step){res[pos++]=self.source[i]}}
return bytes.$factory(res)}else if(isinstance(arg,_b_.bool)){return self.source.__getitem__(_b_.int.$factory(arg))}}
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
bytes.__mul__=function(){var $=$B.args('__mul__',2,{self:null,other:null},['self','other'],arguments,{},null,null),other=$B.PyNumber_Index($.other)
var t=[],source=$.self.source,slen=source.length
for(var i=0;i < other;i++){for(var j=0;j < slen;j++){t.push(source[j])}}
var res=bytes.$factory()
res.source=t
return res}
bytes.__ne__=function(self,other){return ! bytes.__eq__(self,other)}
bytes.__new__=function(cls,source,encoding,errors){var $=$B.args("__new__",4,{cls:null,source:null,encoding:null,errors:null},["cls","source","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null)
return bytes.$new($.cls,$.source,$.encoding,$.errors)}
bytes.$new=function(cls,source,encoding,errors){
var self={__class__:cls},int_list=[],pos=0
if(source===undefined){}else if(isinstance(source,_b_.int)){var i=source
while(i--){int_list[pos++]=0}}else{if(isinstance(source,_b_.str)){if(encoding===undefined){throw _b_.TypeError.$factory("string argument without an encoding")}
int_list=encode(source,encoding,errors)}else{
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
bytes.__repr__=bytes.__str__=function(self){var res="b'"
for(var i=0,len=self.source.length;i < len;i++){var s=self.source[i]
if(s==10){res+='\\n'}else if(s < 32 ||s >=128){var hx=s.toString(16)
hx=(hx.length==1 ? '0' :'')+hx
res+='\\x'+hx}else if(s=="\\".charCodeAt(0)){res+="\\\\"}else{res+=String.fromCharCode(s)}}
return res+"'"}
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
var next_func=_b_.getattr(_b_.iter(iterable),'__next__'),res=self.__class__.$factory(),empty=true
while(true){try{var item=next_func()
if(empty){empty=false}
else{res=bytes.__add__(res,self)}
res=bytes.__add__(res,item)}catch(err){if(isinstance(err,_b_.StopIteration)){break}
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
bytes.split=function(){var $=$B.args('split',2,{self:null,sep:null},['self','sep'],arguments,{},null,null),res=[],start=0,stop=0
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
bytes.splitlines=function(){var $=$B.args('splitlines',2,{self:null,keepends:null},['self','keepends'],arguments,{keepends:false},null,null),lines=[],src=$.self.source,start=0,end=-1,newline_end=-1
for(var i=0;i < src.length;++i){var newline_end=-1
if(src[i]===13){end=i
newline_end=++i}
if(src[i]===10){end=newline_end==-1 ? i :i-1
newline_end=++i}
if(newline_end !=-1){lines.push(bytes.$factory(src.slice(start,$.keepends ?
newline_end :end)))
start=i}}
if(src.length > 0){lines.push(bytes.$factory(src.slice(start)))}
return lines}
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
bytes.translate=function(self,table,_delete){if(_delete===undefined){_delete=[]}else if(isinstance(_delete,bytes)){_delete=_delete.source}else{throw _b_.TypeError.$factory("Type "+
$B.get_class(_delete).__name+" doesn't support the buffer API")}
var res=[],pos=0
if(isinstance(table,bytes)&& table.source.length==256){for(var i=0,len=self.source.length;i < len;i++){if(_delete.indexOf(self.source[i])>-1){continue}
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
pos+=3}}else{if(errors=="ignore"){pos++}else if(errors=="surrogateescape"){s+=String.fromCodePoint(0xdc80+b[pos]-0x80)
pos++}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
byte.toString(16)+"in position "+pos+
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
return res}
var set={__class__:_b_.type,$infos:{__module__:"builtins",__name__:"set"},$is_class:true,$native:true}
set.__add__=function(self,other){throw _b_.TypeError.$factory(
"unsupported operand type(s) for +: 'set' and "+typeof other)}
set.__and__=function(self,other,accept_iter){try{$test(accept_iter,other)}
catch(err){return _b_.NotImplemented}
var res=create_type(self)
for(var i=0,len=self.$items.length;i < len;i++){if(_b_.getattr(other,"__contains__")(self.$items[i])){set.add(res,self.$items[i])}}
return res}
set.__contains__=function(self,item){if(self.$simple){if(typeof item=="number" ||item instanceof Number){if(isNaN(item)){
for(var i=self.$items.length-1;i >=0;i--){if(isNaN(self.$items[i])){return true}}
return false}else if(item instanceof Number){return self.$numbers.indexOf(item.valueOf())>-1}else{return self.$items.indexOf(item)>-1}}else if(typeof item=="string"){return self.$items.indexOf(item)>-1}}
if(! _b_.isinstance(item,set)){$B.$getattr(item,"__hash__")}
for(var i=0,len=self.$items.length;i < len;i++){if($B.rich_comp("__eq__",self.$items[i],item)){return true}}
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
set.__init__=function(self,iterable,second){if(second===undefined){if(Array.isArray(iterable)){for(var i=0,len=iterable.length;i < len;i++){$add(self,iterable[i])}
return $N}}
var $=$B.args("__init__",2,{self:null,iterable:null},["self","iterable"],arguments,{iterable:[]},null,null),self=$.self,iterable=$.iterable
if(_b_.isinstance(iterable,[set,frozenset])){self.$items=iterable.$items.slice()
return $N}
var it=$B.$iter(iterable)
while(1){try{var item=_b_.next(it)
set.add(self,item)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
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
__class__:cls,$simple:true,$items:[],$numbers:[]}}
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
set.__rsub__=function(self,other){
return set.__sub__(self,other)}
set.__rxor__=function(self,other){
return set.__xor__(self,other)}
set.__str__=set.__repr__=function(self){var klass_name=$B.class_name(self)
self.$cycle=self.$cycle===undefined ? 0 :self.$cycle+1
if(self.$items.length===0){return klass_name+"()"}
var head=klass_name+"({",tail="})"
if(head=="set({"){head="{";tail="}"}
var res=[]
if(self.$cycle){self.$cycle--
return klass_name+"(...)"}
self.$items.sort()
for(var i=0,len=self.$items.length;i < len;i++){var r=_b_.repr(self.$items[i])
if(r===self ||r===self.$items[i]){res.push("{...}")}
else{res.push(r)}}
res=res.join(", ")
self.$cycle--
return head+res+tail}
set.__sub__=function(self,other,accept_iter){
try{$test(accept_iter,other,"-")}
catch(err){return _b_.NotImplemented}
var res=create_type(self),cfunc=_b_.getattr(other,"__contains__")
for(var i=0,len=self.$items.length;i < len;i++){if(! cfunc(self.$items[i])){res.$items.push(self.$items[i])}}
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
if(item !==self.$items[ix]){self.$items.push(item)}}
return $N}else{
_b_.hash(item)}
var cfunc=function(other){return $B.rich_comp("__eq__",item,other)}
for(var i=0,len=self.$items.length;i < len;i++){if(cfunc(self.$items[i])){return $N}}
self.$items.push(item)
return $N}
set.add=function(){var $=$B.args("add",2,{self:null,item:null},["self","item"],arguments,{},null,null),self=$.self,item=$.item
return $add(self,item)}
set.clear=function(){var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null)
$.self.$items=[]
return $N}
set.copy=function(){var $=$B.args("copy",1,{self:null},["self"],arguments,{},null,null)
if(_b_.isinstance($.self,frozenset)){return $.self}
var res=set.$factory()
$.self.$items.forEach(function(item){res.$items.push(item)})
$.self.$numbers.forEach(function(item){res.$numbers.push(item)})
return res}
set.difference_update=function(self){var $=$B.args("difference_update",1,{self:null},["self"],arguments,{},"args",null)
for(var i=0;i < $.args.length;i++){var s=set.$factory($.args[i]),_next=_b_.getattr($B.$iter(s),"__next__"),item
while(true){try{item=_next()
var _type=typeof item
if(_type=="string" ||_type=="number"){var _index=self.$items.indexOf(item)
if(_index >-1){self.$items.splice(_index,1)}}else{for(var j=0;j < self.$items.length;j++){if($B.rich_comp("__eq__",self.$items[j],item)){self.$items.splice(j,1)}}}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
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
if(_type=="string" ||_type=="number"){if(s.$items.indexOf(_item)==-1){remove.push(j)}}else{var found=false
for(var k=0;! found && k < s.$items.length;k++){if($B.rich_comp("__eq__",s.$items[k],_item)){found=true}}
if(! found){remove.push(j)}}}
remove.sort(function(x,y){return x-y}).reverse()
for(var j=0;j < remove.length;j++){self.$items.splice(remove[j],1)}}
return $N}
set.isdisjoint=function(){var $=$B.args("is_disjoint",2,{self:null,other:null},["self","other"],arguments,{},null,null)
for(var i=0,len=$.self.$items.length;i < len;i++){if(_b_.getattr($.other,"__contains__")($.self.$items[i])){return false}}
return true}
set.pop=function(self){if(self.$items.length===0){throw _b_.KeyError.$factory('pop from an empty set')}
return self.$items.pop()}
set.remove=function(self,item){
var $=$B.args("remove",2,{self:null,item:null},["self","item"],arguments,{},null,null),self=$.self,item=$.item
if(! _b_.isinstance(item,set)){_b_.hash(item)}
if(typeof item=="string" ||typeof item=="number"){var _i=self.$items.indexOf(item)
if(_i==-1){throw _b_.KeyError.$factory(item)}
self.$items.splice(_i,1)
if(typeof item=="number"){self.$numbers.splice(self.$numbers.indexOf(item),1)}
return $N}
for(var i=0,len=self.$items.length;i < len;i++){if($B.rich_comp("__eq__",self.$items[i],item)){self.$items.splice(i,1)
if(item instanceof Number){self.$numbers.splice(self.$numbers.indexOf(item.valueOf()),1)}
return $N}}
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
for(var j=0,_len=other.$items.length;j < _len;j++){set.add(self,other.$items[j])}}
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
var res={__class__:set,$simple:true,$items:[],$numbers:[]}
var args=[res].concat(Array.prototype.slice.call(arguments))
set.__init__.apply(null,args)
return res}
$B.set_func_names(set,"builtins")
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
frozenset.__init__=function(){
return $N}
frozenset.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory(
"frozenset.__new__(): not enough arguments")}
return{
__class__:cls,$simple:true,$items:[],$numbers:[]}}
var singleton_id=Math.floor(Math.random()*Math.pow(2,40))
function empty_frozenset(){return{
__class__:frozenset,$items:[],$numbers:[],$id:singleton_id}}
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
;(function($B){var bltns=$B.InjectBuiltins()
eval(bltns)
var object=_b_.object
var _window=self;
$B.pyobj2structuredclone=function(obj){
if(typeof obj=="boolean" ||typeof obj=="number" ||
typeof obj=="string"){return obj}else if(obj instanceof Number){return obj.valueOf()}else if(Array.isArray(obj)||obj.__class__===_b_.list ||
obj.__class__===_b_.tuple){var res=[]
for(var i=0,len=obj.length;i < len;i++){res.push($B.pyobj2structuredclone(obj[i]))}
return res}else if(obj.__class__===_b_.dict){if(Object.keys(obj.$numeric_dict).length > 0 ||
Object.keys(obj.$object_dict).length > 0){throw _b_.TypeError.$factory("a dictionary with non-string "+
"keys cannot be sent to or from a Web Worker")}
var res={}
for(var key in obj.$string_dict){res[key]=$B.pyobj2structuredclone(obj.$string_dict[key])}
return res}else{console.log(obj,obj.__class__)
return obj}}
$B.structuredclone2pyobj=function(obj){if(obj===null){return _b_.None}else if(typeof obj=="boolean" ||typeof obj=="number" ||
typeof obj=="string"){return obj}else if(obj instanceof Number){return obj.valueOf()}else if(Array.isArray(obj)||obj.__class__===_b_.list ||
obj.__class__===_b_.tuple){var res=_b_.list.$factory()
for(var i=0,len=obj.length;i < len;i++){res.push($B.structuredclone2pyobj(obj[i]))}
return res}else if(typeof obj=="object"){var res=_b_.dict.$factory()
for(var key in obj){res.$string_dict[key]=$B.structuredclone2pyobj(obj[key])}
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
var UndefinedClass=$B.make_class("undefined",function(){return Undefined}
)
UndefinedClass.__bool__=function(){return false}
UndefinedClass.__repr__=function(){return "undefined"}
var Undefined={__class__:UndefinedClass}
$B.set_func_names(UndefinedClass,"<javascript>")
var jsobj2pyobj=$B.jsobj2pyobj=function(jsobj){switch(jsobj){case true:
case false:
return jsobj}
if(jsobj===undefined){return $B.Undefined}
else if(jsobj===null){return _b_.None}
if(Array.isArray(jsobj)){return _b_.list.$factory(jsobj.map(jsobj2pyobj))}
if(typeof jsobj==='number'){if(jsobj.toString().indexOf('.')==-1){return _b_.int.$factory(jsobj)}
return _b_.float.$factory(jsobj)}
if(jsobj.$nat==='kw'){return jsobj}
return JSObject.$factory(jsobj)}
var pyobj2jsobj=$B.pyobj2jsobj=function(pyobj){
if(pyobj===true ||pyobj===false){return pyobj}
if(pyobj===_b_.None){return null}
if(pyobj===$B.Undefined){return undefined}
var klass=$B.get_class(pyobj)
if(klass===undefined){
return pyobj;}
if(klass===JSObject ||klass===JSConstructor){
if(pyobj.js_func !==undefined){return pyobj.js_func}
return pyobj.js}else if(klass===$B.DOMNode ||
klass.__mro__.indexOf($B.DOMNode)>-1){
return pyobj.elt}else if([_b_.list,_b_.tuple].indexOf(klass)>-1){
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
return function(){try{var args=[]
for(var i=0;i < arguments.length;i++){if(arguments[i]===undefined){args.push(_b_.None)}
else{args.push(jsobj2pyobj(arguments[i]))}}
return pyobj2jsobj(pyobj.apply(this,args))}catch(err){console.log(err)
console.log(_b_.getattr(err,'info'))
console.log($B.class_name(err)+':',err.args.length > 0 ? err.args[0]:'' )
throw err}}}else{
return pyobj}}
var JSObject={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:'JSObject'}}
JSObject.__bool__=function(self){return(new Boolean(self.js)).valueOf()}
JSObject.__delattr__=function(self,attr){_b_.getattr(self,attr)
delete self.js[attr]
return _b_.None}
JSObject.__dir__=function(self){return Object.keys(self.js)}
JSObject.__getattribute__=function(self,attr){var $test=false 
if($test){console.log("get attr",attr,"of",self)}
if(attr.substr(0,2)=='$$'){attr=attr.substr(2)}
if(self.js===null){return object.__getattribute__(None,attr)}
if(attr=="__class__"){return JSObject}
if(attr=="__call__"){if(typeof self.js=="function"){return function(){
var args=[]
for(var i=0;i < arguments.length;i++){args.push($B.pyobj2jsobj(arguments[i]))}
var res=self.js.apply(null,args)
if(res===undefined){return None}
return JSObject.$factory(res)}}else{throw _b_.AttributeError.$factory("object is not callable")}}
if(self.__class__===JSObject && attr=="bind" &&
self.js[attr]===undefined &&
self.js['addEventListener']!==undefined){
attr='addEventListener'}
if(attr=="data" && self.js instanceof MessageEvent){return $B.structuredclone2pyobj(self.js.data)}
var js_attr=self.js[attr]
if(self.js_func && self.js_func[attr]!==undefined){js_attr=self.js_func[attr]}
if(js_attr !==undefined){if($test){console.log("jsattr",js_attr)}
if(typeof js_attr=='function'){
var res=function(){var args=[]
for(var i=0,len=arguments.length;i < len;i++){var arg=arguments[i]
if(arg !==undefined && arg !==null &&
arg.$nat !==undefined){var kw=arg.kw
if(Array.isArray(kw)){kw=$B.extend(js_attr.name,...kw)}
if(Object.keys(kw).length > 0){
throw _b_.TypeError.$factory(
"A Javascript function can't take "+
"keyword arguments")}}else{args.push(pyobj2jsobj(arg))}}
if(attr==='replace' && self.js===location){location.replace(args[0])
return}
var new_this=self.js
if(self.js_func){
new_this=self.js_func;}
if(this !==null && this !==undefined && this !==_window){new_this=this}
var result=js_attr.apply(new_this,args)
return jsobj2pyobj(result)}
res.__repr__=function(){return '<function '+attr+'>'}
res.__str__=function(){return '<function '+attr+'>'}
res.prototype=js_attr.prototype
return{__class__:JSObject,js:res,js_func:js_attr}}else{if($test){console.log("use JS2Py",$B.$JS2Py(js_attr))}
return $B.$JS2Py(js_attr)}}else if(self.js===_window && attr==='$$location'){
return $Location()}
var res=self.__class__[attr]
if(res===undefined){
var mro=self.__class__.__mro__
for(var i=0,len=mro.length;i < len;i++){var v=mro[i][attr]
if(v !==undefined){res=v
break}}}
if(res !==undefined){if($test){console.log("found in klass",res+"")}
if(typeof res==='function'){
return function(){var args=[self]
for(var i=0,len=arguments.length;i < len;i++){var arg=arguments[i]
if(arg &&(arg.__class__===JSObject ||
arg.__class__===JSConstructor)){args.push(arg.js)}else{args.push(arg)}}
return res.apply(self,args)}}
return $B.$JS2Py(res)}else{
throw _b_.AttributeError.$factory("no attribute "+attr+' for '+
self.js)}}
JSObject.__getitem__=function(self,rank){if(typeof self.js.length=='number'){if((typeof rank=="number" ||typeof rank=="boolean")&&
typeof self.js.item=='function'){var rank_to_int=_b_.int.$factory(rank)
if(rank_to_int < 0){rank_to_int+=self.js.length}
var res=self.js.item(rank_to_int)
if(res===null){throw _b_.IndexError.$factory(rank)}
return JSObject.$factory(res)}else if(typeof rank=="string" &&
typeof self.js.getNamedItem=='function'){var res=JSObject.$factory(self.js.getNamedItem(rank))
if(res===undefined){throw _b_.KeyError.$factory(rank)}
return res}}
try{return $B.$call($B.$getattr(self.js,'__getitem__'))(rank)}catch(err){if(self.js[rank]!==undefined){return JSObject.$factory(self.js[rank])}
throw _b_.KeyError.$factory(rank)}}
var JSObject_iterator=$B.make_iterator_class('JS object iterator')
JSObject.__iter__=function(self){var items=[]
if(_window.Symbol && self.js[Symbol.iterator]!==undefined){
var items=[]
if(self.js.next !==undefined){while(true){var nxt=self.js.next()
if(nxt.done){break}
items.push(nxt.value)}}else if(self.js.length !==undefined && self.js.item !==undefined){for(var i=0;i < self.js.length;i++){items.push(self.js.item(i))}}
return JSObject_iterator.$factory(items)}else if(self.js.length !==undefined && self.js.item !==undefined){
for(var i=0;i < self.js.length;i++){items.push(JSObject.$factory(self.js.item(i)))}
return JSObject_iterator.$factory(items)}
var _dict=JSObject.to_dict(self)
return _b_.dict.__iter__(_dict)}
JSObject.__le__=function(self,other){if(typeof self.js["appendChild"]=="function"){return $B.DOMNode.__le__($B.DOMNode.$factory(self.js),other)}
return _b_.NotImplemented}
JSObject.__len__=function(self){if(typeof self.js.length=='number'){return self.js.length}
try{return getattr(self.js,'__len__')()}
catch(err){throw _b_.AttributeError.$factory(self.js+' has no attribute __len__')}}
JSObject.__repr__=function(self){if(self.js instanceof Date){return self.js.toString()}
var proto=Object.getPrototypeOf(self.js)
if(proto){var name=proto.constructor.name
if(name===undefined){
var proto_str=proto.constructor.toString()
name=proto_str.substring(8,proto_str.length-1)}
return "<"+name+" object>"}
return "<JSObject wraps "+self.js+">"}
JSObject.__setattr__=function(self,attr,value){if(attr.substr && attr.substr(0,2)=='$$'){
attr=attr.substr(2)}
if(isinstance(value,JSObject)){self.js[attr]=value.js}
else{self.js[attr]=value
if(typeof value=='function'){self.js[attr]=function(){var args=[]
for(var i=0,len=arguments.length;i < len;i++){args.push($B.$JS2Py(arguments[i]))}
try{return value.apply(null,args)}
catch(err){err=$B.exception(err)
var info=_b_.getattr(err,'info')
if(err.args.length > 0){err.toString=function(){return info+'\n'+$B.class_name(err)+
': '+_b_.repr(err.args[0])}}else{err.toString=function(){return info+'\n'+$B.class_name(err)}}
console.log(err+'')
throw err}}}}}
JSObject.__setitem__=JSObject.__setattr__
JSObject.__str__=JSObject.__repr__
var no_dict={'string':true,'function':true,'number':true,'boolean':true}
JSObject.bind=function(self,evt,func){var js_func=function(ev){return func(jsobj2pyobj(ev))}
self.js.addEventListener(evt,js_func)
return _b_.None}
JSObject.to_dict=function(self){
return $B.obj_dict(self.js,true)}
JSObject.$factory=function(obj){if(obj===null){return _b_.None}
if(typeof obj=='function'){return{__class__:JSObject,js:obj,js_func:obj}}
var klass=$B.get_class(obj)
if(klass===_b_.float){return _b_.float.$factory(obj)}
if(klass===_b_.list){return $B.JSArray.$factory(obj)}
if(klass !==undefined){return obj}
return{
__class__:JSObject,js:obj}}
$B.JSObject=JSObject
$B.JSConstructor=JSConstructor})(__BRYTHON__)
;
;(function($B){$B.stdlib={}
var pylist=['VFS_import','__future__','_abcoll','_codecs','_collections','_collections_abc','_compat_pickle','_contextvars','_csv','_dummy_thread','_functools','_imp','_io','_markupbase','_operator','_py_abc','_pydecimal','_queue','_random','_socket','_sre','_struct','_sysconfigdata','_sysconfigdata_0_brython_','_testcapi','_thread','_threading_local','_weakref','_weakrefset','abc','antigravity','argparse','atexit','base64','bdb','binascii','bisect','browser.aio','browser.ajax','browser.highlight','browser.html','browser.indexed_db','browser.local_storage','browser.markdown','browser.object_storage','browser.session_storage','browser.svg','browser.template','browser.timer','browser.webcomponent','browser.websocket','browser.webworker','browser.worker','calendar','cmath','cmd','code','codecs','codeop','colorsys','configparser','contextlib','contextvars','copy','copyreg','csv','dataclasses','datetime','decimal','difflib','doctest','enum','errno','external_import','faulthandler','fnmatch','formatter','fractions','functools','gc','genericpath','getopt','gettext','glob','heapq','hmac','imp','inspect','io','ipaddress','itertools','keyword','linecache','locale','mimetypes','nntplib','numbers','opcode','operator','optparse','os','pdb','pickle','pkgutil','platform','posixpath','pprint','profile','pwd','py_compile','pydoc','queue','quopri','re','reprlib','select','selectors','shlex','shutil','signal','site','site-packages.__future__','site-packages.docs','site-packages.header','site-packages.test','site-packages.test_sp','socket','sre_compile','sre_constants','sre_parse','stat','string','stringprep','struct','subprocess','sys','sysconfig','tarfile','tb','tempfile','test.namespace_pkgs.module_and_namespace_package.a_test','textwrap','this','threading','time','timeit','token','tokenize','traceback','turtle','types','typing','uu','uuid','warnings','weakref','webbrowser','zipfile','zlib']
for(var i=0;i < pylist.length;i++){$B.stdlib[pylist[i]]=['py']}
var js=['_aio','_ajax','_base64','_binascii','_jsre','_locale','_multiprocessing','_posixsubprocess','_profile','_sre_utils','_string','_strptime','_svg','_warnings','_webcomponent','_webworker','_zlib_utils','aes','array','builtins','dis','hashlib','hmac-md5','hmac-ripemd160','hmac-sha1','hmac-sha224','hmac-sha256','hmac-sha3','hmac-sha384','hmac-sha512','long_int','marshal','math','math1','math_kozh','md5','modulefinder','pbkdf2','posix','rabbit','rabbit-legacy','random','rc4','ripemd160','sha1','sha224','sha256','sha3','sha384','sha512','tripledes','unicodedata']
for(var i=0;i < js.length;i++){$B.stdlib[js[i]]=['js']}
var pkglist=['browser.widgets','collections','concurrent','concurrent.futures','email','email.mime','encodings','html','http','importlib','json','logging','multiprocessing','multiprocessing.dummy','pydoc_data','site-packages.simpleaio','site-packages.ui','test','test.encoded_modules','test.leakers','test.namespace_pkgs.not_a_namespace_pkg.foo','test.support','test.test_email','test.test_importlib','test.test_importlib.builtin','test.test_importlib.extension','test.test_importlib.frozen','test.test_importlib.import_','test.test_importlib.source','test.test_json','test.tracedmodules','unittest','unittest.test','unittest.test.testmock','urllib']
for(var i=0;i < pkglist.length;i++){$B.stdlib[pkglist[i]]=['py',true]}})(__BRYTHON__)
;

;(function($B){var _b_=$B.builtins,_window=self
var module=$B.module={__class__ :_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"module"},$is_class:true}
module.__init__=function(){}
module.__new__=function(cls,name,doc,$package){return{
$class:cls,__name__:name,__doc__:doc ||_b_.None,__package__:$package ||_b_.None}}
module.__repr__=module.__str__=function(self){var res="<module "+self.__name__
if(self.__file__===undefined){res+=" (built-in)"}
return res+">"}
module.__setattr__=function(self,attr,value){if(self.__name__=="__builtins__"){
$B.builtins[attr]=value}else{self[attr]=value}}
module.$factory=function(name,doc,$package){return{
$class:module,__name__:name,__doc__:doc ||_b_.None,__package__:$package ||_b_.None}}
$B.set_func_names(module,"builtins")
function parent_package(mod_name){var parts=mod_name.split(".")
parts.pop()
return parts.join(".")}
function $download_module(mod,url,$package){var xhr=new XMLHttpRequest(),fake_qs="?v="+(new Date().getTime()),res=null,mod_name=mod.__name__
var timer=_window.setTimeout(function(){xhr.abort()},5000)
xhr.open("GET",url+fake_qs,false)
xhr.send()
if($B.$CORS){if(xhr.status==200 ||xhr.status==0){res=xhr.responseText}else{res=_b_.FileNotFoundError.$factory("No module named '"+
mod_name+"'")}}else{if(xhr.readyState==4){if(xhr.status==200){res=xhr.responseText
mod.$last_modified=
xhr.getResponseHeader("Last-Modified")}else{
console.info("Error "+xhr.status+
" means that Python module "+mod_name+
" was not found at url "+url)
res=_b_.FileNotFoundError.$factory("No module named '"+
mod_name+"'")}}}
_window.clearTimeout(timer)
if(res==null){throw _b_.FileNotFoundError.$factory("No module named '"+
mod_name+"' (res is null)")}
if(res.constructor===Error){throw res}
return res}
$B.$download_module=$download_module
function import_js(mod,path){try{var module_contents=$download_module(mod,path,undefined)}catch(err){return null}
run_js(module_contents,path,mod)
return true}
function run_js(module_contents,path,_module){
try{var $module=new Function(module_contents+";\nreturn $module")()
if($B.$options.store){_module.$js=module_contents}}catch(err){console.log(err)
console.log(path,_module)
throw err}
try{$module}
catch(err){console.log("no $module")
throw _b_.ImportError.$factory("name '$module' not defined in module")}
$module.__name__=_module.__name__
for(var attr in $module){if(typeof $module[attr]=="function"){$module[attr].$infos={__module__:_module.__name__,__name__:attr,__qualname__:attr}}}
if(_module !==undefined){
for(var attr in $module){_module[attr]=$module[attr]}
$module=_module
$module.__class__=module }else{
$module.__class__=module
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
function import_py(mod,path,$package){
var mod_name=mod.__name__,module_contents=$download_module(mod,path,$package)
mod.$src=module_contents
$B.imported[mod_name].$is_package=mod.$is_package
$B.imported[mod_name].$last_modified=mod.$last_modified
if(path.substr(path.length-12)=="/__init__.py"){$B.imported[mod_name].__package__=mod_name
$B.imported[mod_name].__path__=path
$B.imported[mod_name].$is_package=mod.$is_package=true}else if($package){$B.imported[mod_name].__package__=$package}else{var mod_elts=mod_name.split(".")
mod_elts.pop()
$B.imported[mod_name].__package__=mod_elts.join(".")}
$B.imported[mod_name].__file__=path
return run_py(module_contents,path,mod)}
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
var $module=(new Function(module_id,js))(module)}catch(err){
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
function new_spec(fields){
fields.__class__=module
return fields}
var finder_VFS={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"VFSFinder"},create_module :function(cls,spec){
return _b_.None},exec_module :function(cls,modobj){var stored=modobj.__spec__.loader_state.stored,timestamp=modobj.__spec__.loader_state.timestamp
delete modobj.__spec__["loader_state"]
var ext=stored[0],module_contents=stored[1],imports=stored[2]
modobj.$is_package=stored[3]||false
var path=$B.brython_path+"Lib/"+modobj.__name__
if(modobj.$is_package){path+="/__init__.py"}
modobj.__file__=path
if(ext=='.js'){run_js(module_contents,modobj.__path__,modobj)}else if($B.precompiled.hasOwnProperty(modobj.__name__)){var parts=modobj.__name__.split(".")
for(var i=0;i < parts.length;i++){var parent=parts.slice(0,i+1).join(".")
if($B.imported.hasOwnProperty(parent)&&
$B.imported[parent].__initialized__){continue}
var mod_js=$B.precompiled[parent],is_package=modobj.$is_package
if(Array.isArray(mod_js)){mod_js=mod_js[0]}
var mod=$B.imported[parent]=module.$factory(parent,undefined,is_package)
mod.__initialized__=true
mod.__file__=mod.__cached__="VFS."+modobj.__name__+".py"
$B.file_cache[mod.__file__]=module_contents
if(is_package){mod.__path__="<stdlib>"
mod.__package__=parent}else{var elts=parent.split(".")
elts.pop()
mod.__package__=elts.join(".")}
try{var parent_id=parent.replace(/\./g,"_")
mod_js+="return $locals_"+parent_id
var $module=new Function("$locals_"+parent_id,mod_js)(
mod)}catch(err){if($B.debug > 1){console.log(err)
for(var k in err){console.log(k,err[k])}
console.log(Object.keys($B.imported))
if($B.debug > 2){console.log(mod_js)}}
throw err}
for(var attr in $module){mod[attr]=$module[attr]}
if(i>0){
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
if($B.$options.indexedDB && self.indexedDB &&
$B.idb_name){
var idb_cx=indexedDB.open($B.idb_name)
idb_cx.onsuccess=function(evt){var db=evt.target.result,tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules"),cursor=store.openCursor(),request=store.put(record)
request.onsuccess=function(){if($B.debug > 1){console.info(modobj.__name__,"stored in db")}}}}}},find_module:function(cls,name,path){return{
__class__:Loader,load_module:function(name,path){var spec=cls.find_spec(cls,name,path)
var mod=module.$factory(name)
$B.imported[name]=mod
mod.__spec__=spec
cls.exec_module(cls,mod)}}},find_spec :function(cls,fullname,path,prev_module){var stored,is_package,timestamp
if(!$B.use_VFS){return _b_.None}
stored=$B.VFS[fullname]
if(stored===undefined){return _b_.None}
is_package=stored[3]||false
timestamp=stored.timestamp
if(stored){var is_builtin=$B.builtin_module_names.indexOf(fullname)>-1
return new_spec({name :fullname,loader:cls,
origin :is_builtin? "built-in" :"brython_stdlib",
submodule_search_locations:is_package?[]:_b_.None,loader_state:{stored:stored,timestamp:timestamp},
cached:_b_.None,parent:is_package? fullname :parent_package(fullname),has_location:_b_.False})}}}
$B.set_func_names(finder_VFS,"<import>")
for(var method in finder_VFS){if(typeof finder_VFS[method]=="function"){finder_VFS[method]=_b_.classmethod.$factory(
finder_VFS[method])}}
finder_VFS.$factory=function(){return{__class__:finder_VFS}}
var finder_stdlib_static={$factory :finder_stdlib_static,__class__ :_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"StdlibStatic"},create_module :function(cls,spec){
return _b_.None},exec_module :function(cls,module){var metadata=module.__spec__.loader_state
module.$is_package=metadata.is_package
if(metadata.ext=="py"){import_py(module,metadata.path,module.__package__)}else{import_js(module,metadata.path)}
delete module.__spec__["loader_state"]},find_module:function(cls,name,path){var spec=cls.find_spec(cls,name,path)
if(spec===_b_.None){return _b_.None}
return{
__class__:Loader,load_module:function(name,path){var mod=module.$factory(name)
$B.imported[name]=mod
mod.__spec__=spec
mod.__package__=spec.parent
cls.exec_module(cls,mod)}}},find_spec:function(cls,fullname,path,prev_module){if($B.stdlib && $B.$options.static_stdlib_import){var address=$B.stdlib[fullname]
if(address===undefined){var elts=fullname.split(".")
if(elts.length > 1){elts.pop()
var $package=$B.stdlib[elts.join(".")]
if($package && $package[1]){address=["py"]}}}
if(address !==undefined){var ext=address[0],is_pkg=address[1]!==undefined,path=$B.brython_path+
((ext=="py")? "Lib/" :"libs/")+
fullname.replace(/\./g,"/"),metadata={ext:ext,is_package:is_pkg,path:path+(is_pkg? "/__init__.py" :
((ext=="py")? ".py" :".js")),address:address}
var res=new_spec({name :fullname,loader:cls,
origin :metadata.path,submodule_search_locations:is_pkg?[path]:_b_.None,loader_state:metadata,
cached:_b_.None,parent:is_pkg ? fullname :parent_package(fullname),has_location:_b_.True})
return res}}
return _b_.None}}
$B.set_func_names(finder_stdlib_static,"<import>")
for(var method in finder_stdlib_static){if(typeof finder_stdlib_static[method]=="function"){finder_stdlib_static[method]=_b_.classmethod.$factory(
finder_stdlib_static[method])}}
finder_stdlib_static.$factory=function(){return{__class__:finder_stdlib_static}}
var finder_path={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"ImporterPath"},create_module :function(cls,spec){
return _b_.None},exec_module :function(cls,_module){var _spec=$B.$getattr(_module,"__spec__"),code=_spec.loader_state.code;
_module.$is_package=_spec.loader_state.is_package,delete _spec.loader_state["code"]
var src_type=_spec.loader_state.type
if(src_type=="py" ||src_type=="pyc.js"){run_py(code,_spec.origin,_module,src_type=="pyc.js")}
else if(_spec.loader_state.type=="js"){run_js(code,_spec.origin,_module)}},find_module:function(cls,name,path){return finder_path.find_spec(cls,name,path)},find_spec :function(cls,fullname,path,prev_module){var current_module=$B.last($B.frames_stack)[2]
if($B.VFS && $B.VFS[current_module]){
return _b_.None}
if($B.is_none(path)){
path=$B.path}
for(var i=0,li=path.length;i < li;++i){var path_entry=path[i]
if(path_entry[path_entry.length-1]!="/"){path_entry+="/"}
var finder=$B.path_importer_cache[path_entry]
if(finder===undefined){var finder_notfound=true
for(var j=0,lj=$B.path_hooks.length;
j < lj && finder_notfound;++j){var hook=$B.path_hooks[j].$factory
try{finder=(typeof hook=="function" ? hook :
$B.$getattr(hook,"__call__"))(path_entry)
finder_notfound=false}catch(e){if(e.__class__ !==_b_.ImportError){throw e}}}
if(finder_notfound){$B.path_importer_cache[path_entry]=_b_.None}}
if($B.is_none(finder)){continue}
var find_spec=$B.$getattr(finder,"find_spec"),fs_func=typeof find_spec=="function" ?
find_spec :
$B.$getattr(find_spec,"__call__")
var spec=fs_func(fullname,prev_module)
if(!$B.is_none(spec)){return spec}}
return _b_.None}}
$B.set_func_names(finder_path,"<import>")
for(var method in finder_path){if(typeof finder_path[method]=="function"){finder_path[method]=_b_.classmethod.$factory(
finder_path[method])}}
finder_path.$factory=function(){return{__class__:finder_path}}
var url_hook={__class__:_b_.type,__mro__:[_b_.object],__repr__:function(self){return "<UrlPathFinder"+(self.hint? " for '"+self.hint+"'":
"(unbound)")+" at "+self.path_entry+'>'},$infos:{__module__:"builtins",__name__:"UrlPathFinder"},find_spec :function(self,fullname,module){var loader_data={},notfound=true,hint=self.hint,base_path=self.path_entry+fullname.match(/[^.]+$/g)[0],modpaths=[]
var tryall=hint===undefined
if(tryall ||hint=='py'){
modpaths=modpaths.concat([[base_path+".py","py",false],[base_path+"/__init__.py","py",true]])}
for(var j=0;notfound && j < modpaths.length;++j){try{var file_info=modpaths[j],module={__name__:fullname,$is_package:false}
loader_data.code=$download_module(module,file_info[0],undefined)
notfound=false
loader_data.type=file_info[1]
loader_data.is_package=file_info[2]
if(hint===undefined){self.hint=file_info[1]
$B.path_importer_cache[self.path_entry]=self}
if(loader_data.is_package){
$B.path_importer_cache[base_path+'/']=
url_hook.$factory(base_path+'/',self.hint)}
loader_data.path=file_info[0]}catch(err){}}
if(!notfound){return new_spec({name :fullname,loader:finder_path,origin :loader_data.path,
submodule_search_locations:loader_data.is_package?
[base_path]:_b_.None,loader_state:loader_data,
cached:_b_.None,parent:loader_data.is_package? fullname :
parent_package(fullname),has_location:_b_.True})}
return _b_.None},invalidate_caches :function(self){}}
url_hook.$factory=function(path_entry,hint){return{
__class__:url_hook,path_entry:path_entry.endsWith("/")? path_entry :path_entry+"/",hint:hint}}
$B.set_func_names(url_hook,"<import>")
$B.path_importer_cache={};
var _sys_paths=[[$B.script_dir+"/","py"],[$B.brython_path+"Lib/","py"],[$B.brython_path+"Lib/site-packages/","py"],[$B.brython_path+"libs/","js"]]
for(var i=0;i < _sys_paths.length;++i){var _path=_sys_paths[i],_type=_path[1]
_path=_path[0]
$B.path_importer_cache[_path]=url_hook.$factory(_path,_type)}
function import_error(mod_name){var exc=_b_.ImportError.$factory(mod_name)
exc.name=mod_name
throw exc}
$B.$__import__=function(mod_name,globals,locals,fromlist,level){
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
if(modobj==_b_.None){
import_error(_mod_name)}else if(modobj===undefined){try{$B.import_hooks(_mod_name,__path__,from_stdlib)}catch(err){delete $B.imported[_mod_name]
throw err}
if($B.is_none($B.imported[_mod_name])){import_error(_mod_name)}else{
if(_parent_name){_b_.setattr($B.imported[_parent_name],parsed_name[i],$B.imported[_mod_name])}}}
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
parsed_name.length > 1){try{$B.$setattr($B.imported[parsed_name[0]],parsed_name[1],modobj)}catch(err){console.log("error",parsed_name,modobj)
throw err}}}
if(fromlist.length > 0){
return $B.imported[mod_name]}else{
return $B.imported[parsed_name[0]]}}
$B.$import=function(mod_name,fromlist,aliases,locals){var parts=mod_name.split(".")
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
$B.$path_hooks=[url_hook]
$B.$meta_path=[finder_VFS,finder_stdlib_static,finder_path]
$B.finders={VFS:finder_VFS,stdlib_static:finder_stdlib_static,path:finder_path}
function optimize_import_for_path(path,filetype){if(path.slice(-1)!="/"){path=path+"/" }
var value=(filetype=='none')? _b_.None :
url_hook.$factory(path,filetype)
$B.path_importer_cache[path]=value}
var Loader={__class__:$B.$type,__mro__:[_b_.object],__name__ :"Loader"}
var _importlib_module={__class__ :module,__name__ :"_importlib",Loader:Loader,VFSFinder:finder_VFS,StdlibStatic:finder_stdlib_static,ImporterPath:finder_path,UrlPathFinder:url_hook,optimize_import_for_path :optimize_import_for_path}
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
return obj.$value !==undefined ? obj.$value :obj}
var float={__class__:_b_.type,__dir__:object.__dir__,$infos:{__module__:"builtins",__name__:"float"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
float.numerator=function(self){return float_value(self)}
float.denominator=function(self){return _b_.int.$factory(1)}
float.imag=function(self){return _b_.int.$factory(0)}
float.real=function(self){return float_value(self)}
float.__float__=function(self){return float_value(self)}
float.as_integer_ratio=function(self){self=float_value(self)
if(self.valueOf()==Number.POSITIVE_INFINITY ||
self.valueOf()==Number.NEGATIVE_INFINITY){throw _b_.OverflowError.$factory("Cannot pass infinity to "+
"float.as_integer_ratio.")}
if(! Number.isFinite(self.valueOf())){throw _b_.ValueError.$factory("Cannot pass NaN to "+
"float.as_integer_ratio.")}
var tmp=_b_.$frexp(self.valueOf()),fp=tmp[0],exponent=tmp[1]
for(var i=0;i < 300;i++){if(fp==Math.floor(fp)){break}else{fp*=2
exponent--}}
numerator=float.$factory(fp)
py_exponent=abs(exponent)
denominator=1
py_exponent=_b_.getattr(_b_.int.$factory(denominator),"__lshift__")(py_exponent)
if(exponent > 0){numerator=numerator*py_exponent}else{denominator=py_exponent}
return _b_.tuple.$factory([_b_.int.$factory(numerator),_b_.int.$factory(denominator)])}
float.__bool__=function(self){self=float_value(self)
return _b_.bool.$factory(self.valueOf())}
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
if(hasattr(other,"__rfloordiv__")){return getattr(other,"__rfloordiv__")(self)}
$err("//",other)}
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
var _m=/^(\d*\.?\d*)$/.exec(value)
if(_m !==null){return $FloatClass(parseFloat(_m[1]))}
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
(fmt.type=="%" ||fmt.type.toLowerCase()=="f")){if(pt_pos==-1){res+="."+"0".repeat(fmt.precision)}
else{var missing=fmt.precision-res.length+pt_pos+1
if(missing > 0){res+="0".repeat(missing)}}}else{var res1=self.toExponential(fmt.precision-1),exp=parseInt(res1.substr(res1.search("e")+1))
if(exp <-4 ||exp >=fmt.precision-1){var elts=res1.split("e")
while(elts[0].endsWith("0")){elts[0]=elts[0].substr(0,elts[0].length-1)}
res=elts.join("e")}}}else{var res=_b_.str.$factory(self)}
if(fmt.type===undefined||"gGn".indexOf(fmt.type)!=-1){
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
if(isinstance(x,float)){x1=x.valueOf()}
return x1==-Infinity ||x1==Number.NEGATIVE_INFINITY}
_b_.$isinf=function(x){var x1=x
if(isinstance(x,float)){x1=x.valueOf()}
return x1==Infinity ||x1==-Infinity ||
x1==Number.POSITIVE_INFINITY ||x1==Number.NEGATIVE_INFINITY}
_b_.$fabs=function(x){return x > 0 ? float.$factory(x):float.$factory(-x)}
_b_.$frexp=function(x){var x1=x
if(isinstance(x,float)){x1=x.valueOf()}
if(isNaN(x1)||_b_.$isinf(x1)){return[x1,-1]}
if(x1==0){return[0,0]}
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
if(isinstance(other,_b_.int)){return new Number((self % other+other)% other)}
if(isinstance(other,float)){
var q=Math.floor(self/other),r=self-other*q
return new Number(r)}
if(isinstance(other,_b_.bool)){var bool_value=0
if(other.valueOf()){bool_value=1}
return new Number((self % bool_value+bool_value)% bool_value)}
if(hasattr(other,"__rmod__")){return getattr(other,"__rmod__")(self)}
$err("%",other)}
float.__mro__=[object]
float.__mul__=function(self,other){self=float_value(self)
other=float_value(other)
if(isinstance(other,_b_.int)){if(other.__class__==$B.long_int){return new Number(self*parseFloat(other.value))}
return new Number(self*other)}
if(isinstance(other,float)){return new Number(self*float_value(other))}
if(isinstance(other,_b_.bool)){var bool_value=0
if(other.valueOf()){bool_value=1}
return new Number(self*bool_value)}
if(isinstance(other,_b_.complex)){return $B.make_complex(float.$factory(self*other.$real),float.$factory(self*other.$imag))}
if(hasattr(other,"__rmul__")){return getattr(other,"__rmul__")(self)}
$err("*",other)}
float.__ne__=function(self,other){var res=float.__eq__(self,other)
return res===_b_.NotImplemented ? res :! res}
float.__neg__=function(self,other){return float.$factory(-float_value(self))}
float.__new__=function(cls,value){if(cls===undefined){throw _b_.TypeError.$factory("float.__new__(): not enough arguments")}else if(! _b_.isinstance(cls,_b_.type)){throw _b_.TypeError.$factory("float.__new__(X): X is not a type object")}
if(cls===float){return float.$factory(value)}
return{
__class__:cls,__dict__:_b_.dict.$factory(),$value:value ||0}}
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
return float.$factory(Math.pow(self,other))}else if(isinstance(other,_b_.complex)){var preal=Math.pow(self,other.$real),ln=Math.log(self)
return $B.make_complex(preal*Math.cos(ln),preal*Math.sin(ln))}
if(hasattr(other,"__rpow__")){return getattr(other,"__rpow__")(self)}
$err("** or pow()",other)}
float.__repr__=float.__str__=function(self){self=float_value(self)
if(self.valueOf()==Infinity){return 'inf'}
if(self.valueOf()==-Infinity){return '-inf'}
if(isNaN(self.valueOf())){return 'nan'}
var res=self.valueOf()+"" 
if(res.indexOf(".")==-1){res+=".0"}
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
if(isinstance(other,_b_.complex)){var cmod=other.$real*other.$real+other.$imag*other.$imag
if(cmod==0){throw ZeroDivisionError.$factory("division by zero")}
return $B.make_complex(float.$factory(self*other.$real/cmod),float.$factory(-self*other.$imag/cmod))}
if(hasattr(other,"__rtruediv__")){return getattr(other,"__rtruediv__")(self)}
$err("/",other)}
var $op_func=function(self,other){self=float_value(self)
other=float_value(other)
if(isinstance(other,_b_.int)){if(typeof other=="boolean"){return other ? self-1 :self}else if(other.__class__===$B.long_int){return float.$factory(self-parseInt(other.value))}else{return float.$factory(self-other)}}
if(isinstance(other,float)){return float.$factory(self-other)}
if(isinstance(other,_b_.bool)){var bool_value=0
if(other.valueOf()){bool_value=1}
return float.$factory(self-bool_value)}
if(isinstance(other,_b_.complex)){return $B.make_complex(self-other.$real,-other.$imag)}
if(hasattr(other,"__rsub__")){return getattr(other,"__rsub__")(self)}
$err("-",other)}
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
$B.make_rmethods(float)
var $notimplemented=function(self,other){throw _b_.TypeError.$factory(
"unsupported operand types for OPERATOR: 'float' and '"+
$B.class_name(other)+"'")}
$notimplemented+="" 
for(var $op in $B.$operators){
if($B.augmented_assigns[$op]===undefined){var $opfunc="__"+$B.$operators[$op]+"__"
if(float[$opfunc]===undefined){eval("float."+$opfunc+"="+
$notimplemented.replace(/OPERATOR/gm,$op))}}}
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
if(isinstance(value,float)){return value}
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
": 'int' and '"+$B.class_name(other)+"'"
throw _b_.TypeError.$factory(msg)}
function int_value(obj){
return obj.$value !==undefined ? obj.$value :obj}
var int={__class__:_b_.type,__dir__:_b_.object.__dir__,$infos:{__module__:"builtins",__name__:"int"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
int.from_bytes=function(){var $=$B.args("from_bytes",3,{bytes:null,byteorder:null,signed:null},["bytes","byteorder","signed"],arguments,{signed:false},null,null)
var x=$.bytes,byteorder=$.byteorder,signed=$.signed,_bytes,_len
if(_b_.isinstance(x,[_b_.bytes,_b_.bytearray])){_bytes=x.source
_len=x.source.length}else{_bytes=_b_.list.$factory(x)
_len=_bytes.length
for(var i=0;i < _len;i++){_b_.bytes.$factory([_bytes[i]])}}
switch(byteorder){case "big":
var num=_bytes[_len-1]
var _mult=256
for(var i=_len-2;i >=0;i--){
num=$B.add($B.mul(_mult,_bytes[i]),num)
_mult=$B.mul(_mult,256)}
if(! signed){return num}
if(_bytes[0]< 128){return num}
return $B.sub(num,_mult)
case "little":
var num=_bytes[0]
if(num >=128){num=num-256}
var _mult=256
for(var i=1;i < _len;i++){num=$B.add($B.mul(_mult,_bytes[i]),num)
_mult=$B.mul(_mult,256)}
if(! signed){return num}
if(_bytes[_len-1]< 128){return num}
return $B.sub(num,_mult)}
throw _b_.ValueError.$factory("byteorder must be either 'little' or 'big'")}
int.to_bytes=function(){var $=$B.args("to_bytes",3,{self:null,len:null,byteorder:null},["self","len","byteorder"],arguments,{},"args","kw"),self=$.self,len=$.len,byteorder=$.byteorder,kwargs=$.kw
if(! _b_.isinstance(len,_b_.int)){throw _b_.TypeError.$factory("integer argument expected, got "+
$B.class_name(len))}
if(["little","big"].indexOf(byteorder)==-1){throw _b_.ValueError.$factory("byteorder must be either 'little' or 'big'")}
var signed=kwargs.$string_dict["signed"]||false,res=[]
if(self < 0){if(! signed){throw _b_.OverflowError.$factory("can't convert negative int to unsigned")}
self=Math.pow(256,len)+self}
var value=self
while(true){var quotient=Math.floor(value/256),rest=value-256*quotient
res.push(rest)
if(quotient==0){break}
value=quotient}
if(res.length > len){throw _b_.OverflowError.$factory("int too big to convert")}else{while(res.length < len){res=res.concat([0])}}
if(byteorder=="big"){res=res.reverse()}
return{
__class__:_b_.bytes,source:res}}
int.__abs__=function(self){return _b_.abs(self)}
int.__bool__=function(self){return int_value(self).valueOf()==0 ? false :true}
int.__ceil__=function(self){return Math.ceil(int_value(self))}
int.__divmod__=function(self,other){return _b_.divmod(self,other)}
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
if(_b_.isinstance(other,_b_.float)){if(!other.valueOf()){throw _b_.ZeroDivisionError.$factory("division by zero")}
return Math.floor(self/other)}
if(hasattr(other,"__rfloordiv__")){return $B.$getattr(other,"__rfloordiv__")(self)}
$err("//",other)}
int.__hash__=function(self){if(self===undefined){return int.__hashvalue__ ||$B.$py_next_hash--}
return self.valueOf()}
int.__index__=function(self){return int_value(self)}
int.__init__=function(self,value){if(value===undefined){value=0}
self.toString=function(){return value}
return _b_.None}
int.__int__=function(self){return self}
int.__invert__=function(self){return ~self}
int.__lshift__=function(self,other){if(_b_.isinstance(other,int)){other=int_value(other)
return int.$factory($B.long_int.__lshift__($B.long_int.$factory(self),$B.long_int.$factory(other)))}
var rlshift=$B.$getattr(other,"__rlshift__",_b_.None)
if(rlshift !==_b_.None){return rlshift(self)}
$err("<<",other)}
int.__mod__=function(self,other){
if(_b_.isinstance(other,_b_.tuple)&& other.length==1){other=other[0]}
if(other.__class__===$B.long_int){return $B.long_int.__mod__($B.long_int.$factory(self),other)}
if(_b_.isinstance(other,[int,_b_.float,bool])){other=int_value(other)
if(other===false){other=0}
else if(other===true){other=1}
if(other==0){throw _b_.ZeroDivisionError.$factory(
"integer division or modulo by zero")}
return(self % other+other)% other}
if(hasattr(other,"__rmod__")){return $B.$getattr(other,"__rmod__")(self)}
$err("%",other)}
int.__mro__=[_b_.object]
int.__mul__=function(self,other){var val=self.valueOf()
if(typeof other==="string"){return other.repeat(val)}
if(_b_.isinstance(other,int)){other=int_value(other)
var res=self*other
if(res > $B.min_int && res < $B.max_int){return res}
else{return int.$factory($B.long_int.__mul__($B.long_int.$factory(self),$B.long_int.$factory(other)))}}
if(_b_.isinstance(other,_b_.float)){return new Number(self*other)}
if(_b_.isinstance(other,_b_.bool)){if(other.valueOf()){return self}
return int.$factory(0)}
if(_b_.isinstance(other,_b_.complex)){return $B.make_complex(int.__mul__(self,other.$real),int.__mul__(self,other.$imag))}
if(_b_.isinstance(other,[_b_.list,_b_.tuple])){var res=[]
var $temp=other.slice(0,other.length)
for(var i=0;i < val;i++){res=res.concat($temp)}
if(_b_.isinstance(other,_b_.tuple)){res=_b_.tuple.$factory(res)}
return res}
if(_b_.hasattr(other,"__rmul__")){return $B.$getattr(other,"__rmul__")(self)}
$err("*",other)}
int.__ne__=function(self,other){var res=int.__eq__(self,other)
return(res===_b_.NotImplemented)? res :!res}
int.__neg__=function(self){return-self}
int.__new__=function(cls,value){if(cls===undefined){throw _b_.TypeError.$factory("int.__new__(): not enough arguments")}else if(! _b_.isinstance(cls,_b_.type)){throw _b_.TypeError.$factory("int.__new__(X): X is not a type object")}
if(cls===int){return int.$factory(value)}
return{
__class__:cls,__dict__:_b_.dict.$factory(),$value:value ||0}}
int.__pos__=function(self){return self}
int.__pow__=function(self,other,z){if(_b_.isinstance(other,int)){other=int_value(other)
switch(other.valueOf()){case 0:
return int.$factory(1)
case 1:
return int.$factory(self.valueOf())}
if(z !==undefined && z !==null){
if(z==1){return 0}
var result=1,base=self % z,exponent=other,long_int=$B.long_int
while(exponent > 0){if(exponent % 2==1){if(result*base > $B.max_int){result=long_int.__mul__(
long_int.$factory(result),long_int.$factory(base))
result=long_int.__mod__(result,z)}else{result=(result*base)% z}}
exponent=exponent >> 1
if(base*base > $B.max_int){base=long_int.__mul__(long_int.$factory(base),long_int.$factory(base))
base=long_int.__mod__(base,z)}else{base=(base*base)% z}}
return result}
var res=Math.pow(self.valueOf(),other.valueOf())
if(res > $B.min_int && res < $B.max_int){return res}
else if(res !==Infinity && !isFinite(res)){return res}
else{return int.$factory($B.long_int.__pow__($B.long_int.$factory(self),$B.long_int.$factory(other)))}}
if(_b_.isinstance(other,_b_.float)){if(self >=0){return new Number(Math.pow(self,other.valueOf()))}
else{
return _b_.complex.__pow__($B.make_complex(self,0),other)}}else if(_b_.isinstance(other,_b_.complex)){var preal=Math.pow(self,other.$real),ln=Math.log(self)
return $B.make_complex(preal*Math.cos(ln),preal*Math.sin(ln))}
if(hasattr(other,"__rpow__")){return $B.$getattr(other,"__rpow__")(self)}
$err("**",other)}
int.__repr__=function(self){if(self===int){return "<class 'int'>"}
return self.toString()}
int.__rshift__=function(self,other){if(_b_.isinstance(other,int)){other=int_value(other)
return int.$factory($B.long_int.__rshift__($B.long_int.$factory(self),$B.long_int.$factory(other)))}
var rrshift=$B.$getattr(other,"__rrshift__",_b_.None)
if(rrshift !==_b_.None){return rrshift(self)}
$err('>>',other)}
int.__setattr__=function(self,attr,value){if(typeof self=="number"){if(int.$factory[attr]===undefined){throw _b_.AttributeError.$factory(
"'int' object has no attribute '"+attr+"'")}else{throw _b_.AttributeError.$factory(
"'int' object attribute '"+attr+"' is read-only")}}
self.__dict__.$string_dict[attr]=value
return _b_.None}
int.__str__=int.__repr__
int.__truediv__=function(self,other){if(_b_.isinstance(other,int)){other=int_value(other)
if(other==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
if(other.__class__===$B.long_int){return new Number(self/parseInt(other.value))}
return new Number(self/other)}
if(_b_.isinstance(other,_b_.float)){if(!other.valueOf()){throw _b_.ZeroDivisionError.$factory("division by zero")}
return new Number(self/other)}
if(_b_.isinstance(other,_b_.complex)){var cmod=other.$real*other.$real+other.$imag*other.$imag
if(cmod==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
return $B.make_complex(self*other.$real/cmod,-self*other.$imag/cmod)}
if(_b_.hasattr(other,"__rtruediv__")){return $B.$getattr(other,"__rtruediv__")(self)}
$err("/",other)}
int.bit_length=function(self){s=_b_.bin(self)
s=$B.$getattr(s,"lstrip")("-0b")
return s.length }
int.numerator=function(self){return self}
int.denominator=function(self){return int.$factory(1)}
int.imag=function(self){return int.$factory(0)}
int.real=function(self){return self}
$B.max_int32=(1 << 30)*2-1
$B.min_int32=-$B.max_int32
var $op_func=function(self,other){if(_b_.isinstance(other,int)){if(other.__class__===$B.long_int){return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
if(self > $B.max_int32 ||self < $B.min_int32 ||
other > $B.max_int32 ||other < $B.min_int32){return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}
return self-other}
if(_b_.isinstance(other,_b_.bool)){return self-other}
var rsub=$B.$getattr(other,"__rsub__",_b_.None)
if(rsub !==_b_.None){return rsub(self)}
$err("-",other)}
$op_func+="" 
var $ops={"&":"and","|":"or","^":"xor"}
for(var $op in $ops){var opf=$op_func.replace(/-/gm,$op)
opf=opf.replace(new RegExp("sub","gm"),$ops[$op])
eval("int.__"+$ops[$op]+"__ = "+opf)}
var $op_func=function(self,other){if(_b_.isinstance(other,int)){other=int_value(other)
if(typeof other=="number"){var res=self.valueOf()-other.valueOf()
if(res > $B.min_int && res < $B.max_int){return res}
else{return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}}else if(typeof other=="boolean"){return other ? self-1 :self}else{return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}}
if(_b_.isinstance(other,_b_.float)){return new Number(self-other)}
if(_b_.isinstance(other,_b_.complex)){return $B.make_complex(self-other.$real,-other.$imag)}
if(_b_.isinstance(other,_b_.bool)){var bool_value=0;
if(other.valueOf()){bool_value=1}
return self-bool_value}
if(_b_.isinstance(other,_b_.complex)){return $B.make_complex(self.valueOf()-other.$real,other.$imag)}
var rsub=$B.$getattr(other,"__rsub__",_b_.None)
if(rsub !==_b_.None){return rsub(self)}
throw $err("-",other)}
$op_func+="" 
var $ops={"+":"add","-":"sub"}
for(var $op in $ops){var opf=$op_func.replace(/-/gm,$op)
opf=opf.replace(new RegExp("sub","gm"),$ops[$op])
eval("int.__"+$ops[$op]+"__ = "+opf)}
var $comp_func=function(self,other){if(other.__class__===$B.long_int){return $B.long_int.__lt__(other,$B.long_int.$factory(self))}
if(_b_.isinstance(other,int)){other=int_value(other)
return self.valueOf()> other.valueOf()}else if(_b_.isinstance(other,_b_.float)){return self.valueOf()> other.valueOf()}else if(_b_.isinstance(other,_b_.bool)){return self.valueOf()> _b_.bool.__hash__(other)}
if(_b_.hasattr(other,"__int__")||_b_.hasattr(other,"__index__")){return int.__gt__(self,$B.$GetInt(other))}
return _b_.NotImplemented}
$comp_func+="" 
for(var $op in $B.$comps){eval("int.__"+$B.$comps[$op]+"__ = "+
$comp_func.replace(/>/gm,$op).
replace(/__gt__/gm,"__"+$B.$comps[$op]+"__").
replace(/__lt__/,"__"+$B.$inv_comps[$op]+"__"))}
$B.make_rmethods(int)
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
if(_b_.isinstance(value,_b_.float)&& base==10){if(value < $B.min_int ||value > $B.max_int){return $B.long_int.$from_float(value)}
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
if(_value.length >2){var _pre=_value.substr(0,2).toUpperCase()
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
var num_value=$B.to_num(value,["__int__","__index__","__trunc__"])
if(num_value===null){throw _b_.TypeError.$factory(
"int() argument must be a string, a bytes-like "+
"object or a number, not '"+$B.class_name(value)+"'")}
return num_value}
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
var bool={__bases__:[int],__class__:_b_.type,__mro__:[int,_b_.object],$infos:{__name__:"bool",__module__:"builtins"},$is_class:true,$native:true}
var methods=$B.op2method.subset("operations","binary","comparisons","boolean")
for(var op in methods){var method="__"+methods[op]+"__"
bool[method]=(function(op){return function(self,other){var value=self ? 1 :0
if(int[op]!==undefined){return int[op](value,other)}}})(method)}
bool.__and__=function(self,other){if(_b_.isinstance(other,bool)){return self && other}else if(_b_.isinstance(other,int)){return int.__and__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.__hash__=bool.__index__=bool.__int__=function(self){if(self.valueOf())return 1
return 0}
bool.__neg__=function(self){return-$B.int_or_bool(self)}
bool.__or__=function(self,other){if(_b_.isinstance(other,bool)){return self ||other}else if(_b_.isinstance(other,int)){return int.__or__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.__pos__=$B.int_or_bool
bool.__repr__=bool.__str__=function(self){return self ? "True" :"False"}
bool.__setattr__=function(self,attr){if(_b_.dir(self).indexOf(attr)>-1){var msg="attribute '"+attr+"' of 'int' objects is not writable"}else{var msg="'bool' object has no attribute '"+attr+"'"}
throw _b_.AttributeError.$factory(msg)}
bool.__xor__=function(self,other){if(_b_.isinstance(other,bool)){return self ^ other ? true :false}else if(_b_.isinstance(other,int)){return int.__xor__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.$factory=function(){
var $=$B.args("bool",1,{x:null},["x"],arguments,{x:false},null,null)
return $B.$bool($.x)}
_b_.bool=bool
$B.set_func_names(bool,"builtins")})(__BRYTHON__)
;
;(function($B){
var bltns=$B.InjectBuiltins()
eval(bltns)
var long_int={__class__:_b_.type,__mro__:[int,object],$infos:{__module__:"builtins",__name__:"int"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
function add_pos(v1,v2){
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
function binary(t){var nb_chunks=Math.ceil(t.length/len),chunks=[],pos,start,nb,bin=[]
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
var len=(Math.floor((Math.pow(2,53)-1)/n)+'').length-1,nb_chunks=Math.ceil(t.length/len),
chunks=[],pos,start,nb,in_base=[]
for(var i=0;i < nb_chunks;i++){pos=t.length-(i+1)*len
start=Math.max(0,pos)
nb=pos-start
chunks.push(t.substr(start,len+nb))}
chunks=chunks.reverse()
chunks.forEach(function(chunk,i){chunks[i]=parseInt(chunk)})
var rest,carry=Math.pow(10,len),x
chunks.forEach(function(chunk,i){rest=chunk % n
chunks[i]=Math.floor(chunk/n)
if(i < chunks.length-1){
chunks[i+1]+=carry*rest}})
if(chunks[0]==0){chunks.shift()
if(chunks.length==0){return "0"}}
x=chunks[0]+''
chunks.forEach(function(chunk,i){if(i > 0){
x+="0".repeat(len-chunk.toString().length)+chunk}})
return[x,rest]}
function divmod_pos(v1,v2){
var iv1=parseInt(v1),iv2=parseInt(v2),res1
if(iv1 < $B.max_int && iv2 < $B.max_int){var rest=iv1 % iv2,quot=Math.floor(iv1/iv2).toString()
var res1=[{__class__:long_int,value:quot.toString(),pos:true},{__class__:long_int,value:rest.toString(),pos:true}
]
return res1}
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
function mul_pos(x,y){var ix=parseInt(x),iy=parseInt(y),z=ix*iy
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
long_int.$from_float=function(value){var s=Math.abs(value).toString(),v=s
if(s.search("e")>-1){var t=/-?(\d)(\.\d+)?e([+-])(\d*)/.exec(s),n1=t[1],n2=t[2],pos=t[3],exp=t[4]
if(pos=="+"){if(n2===undefined){v=n1+"0".repeat(exp-1)}else{v=n1+n2+"0".repeat(exp-1-n2.length)}}}
return{__class__:long_int,value:v,pos:value >=0}}
long_int.__abs__=function(self){return{__class__:long_int,value:self.value,pos:true}}
long_int.__add__=function(self,other){if(isinstance(other,_b_.float)){return _b_.float.$factory(parseInt(self.value)+other.value)}
if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}else if(other.__class__ !==long_int){if(isinstance(other,_b_.bool)){other=long_int.$factory(other ? 1 :0)}else if(isinstance(other,int)){
other=long_int.$factory(_b_.str.$factory(_b_.int.__index__(other)))}}
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
res={__class__:ong_int,value:0,pos:true}
break
case-1:
res=sub_pos(other.value,self.value)
break}
return intOrLong(res)}}
long_int.__and__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
var v1=long_int.__index__(self),v2=long_int.__index__(other)
if(v1.length < v2.length){var temp=v2;v2=v1;v1=temp}
if(v2.charAt(0)=="1"){v2="1".repeat(v1.length-v2.length)+v2}
var start=v1.length-v2.length,res=""
for(var i=0;i < v2.length;i++){if(v1.charAt(start+i)=="1" && v2.charAt(i)=="1"){res+="1"}
else{res+="0"}}
return intOrLong(long_int.$factory(res,2))}
long_int.__divmod__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
var dm=divmod_pos(self.value,other.value)
if(self.pos !==other.pos){if(dm[0].value !="0"){dm[0].pos=false}
if(dm[1].value !="0"){
dm[0]=long_int.__sub__(dm[0],long_int.$factory("1"))
dm[1]=long_int.__add__(dm[1],long_int.$factory("1"))}}
return[intOrLong(dm[0]),intOrLong(dm[1])]}
long_int.__eq__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
return self.value==other.value && self.pos==other.pos}
long_int.__float__=function(self){return new Number(parseFloat(self.value))}
long_int.__floordiv__=function(self,other){if(isinstance(other,_b_.float)){return _b_.float.$factory(parseInt(self.value)/other)}
if(typeof other=="number"){var t=self.value,res=divmod_by_safe_int(t,other),pos=other > 0 ? self.pos :!self.pos
return{__class__:long_int,value:res[0],pos:pos}}
return intOrLong(long_int.__divmod__(self,other)[0])}
long_int.__ge__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
if(self.pos !=other.pos){return ! other.pos}
if(self.value.length > other.value.length){return self.pos}
else if(self.value.length < other.value.length){return ! self.pos}
else{return self.pos ? self.value >=other.value :
self.value <=other.value}}
long_int.__gt__=function(self,other){return ! long_int.__le__(self,other)}
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
long_int.__lshift__=function(self,shift){var is_long=shift.__class__===long_int,shift_safe
if(is_long){var shift_value=parseInt(shift.value)
if(shift_value < 0){throw _b_.ValueError.$factory('negative shift count')}
if(shift_value < $B.max_int){shift_safe=true;shift=shift_value}}
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
if(isinstance(other,_b_.float)){return _b_.float.$factory(parseInt(self.value)*other)}
other_value=other.value
other_pos=other.pos
if(other.__class__ !==long_int && isinstance(other,int)){
var value=int.__index__(other)
other_value=_b_.str.$factory(value)
other_pos=value > 0}
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
long_int.__pow__=function(self,power,z){if(typeof power=="number"){power=long_int.$factory(_b_.str.$factory(power))}else if(isinstance(power,int)){
power=long_int.$factory(_b_.str.$factory(_b_.int.__index__(power)))}else if(! isinstance(power,long_int)){var msg="power must be a LongDict, not '"
throw TypeError.$factory(msg+$B.class_name(power)+"'")}
if(! power.pos){if(self.value=="1"){return self}
return long_int.$factory("0")}else if(power.value=="0"){return long_int.$factory("1")}
var res={__class__:long_int,value:self.value,pos:self.pos},pow=power.value
while(true){pow=sub_pos(pow,"1").value
if(pow=="0"){break}
res=long_int.$factory(long_int.__mul__(res,self))
if(z !==undefined){res=long_int.__mod__(res,z)}}
return intOrLong(res)}
long_int.__rshift__=function(self,shift){shift=long_int.$factory(shift)
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
long_int.__sub__=function(self,other){if(isinstance(other,_b_.float)){return _b_.float.$factory(parseInt(self.value)-other.value)}
if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
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
long_int.__truediv__=function(self,other){if(isinstance(other,long_int)){return _b_.float.$factory(parseInt(self.value)/parseInt(other.value))}else if(isinstance(other,_b_.int)){return _b_.float.$factory(parseInt(self.value)/other)}else if(isinstance(other,_b_.float)){return _b_.float.$factory(parseInt(self.value)/other)}else{throw TypeError.$factory(
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
long_int.numerator=function(self){return self}
long_int.denominator=function(self){return _b_.int.$factory(1)}
long_int.imag=function(self){return _b_.int.$factory(0)}
long_int.real=function(self){return self}
long_int.to_base=function(self,base){
if(base==2){return binary(self.value)}
var res="",v=self.value
while(v > 0){var dm=divmod_pos(v,base.toString())
res=parseInt(dm[1].value).toString(base)+res
v=dm[0].value
if(v==0){break}}
return res}
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
long_int.$factory=function(value,base){
if(arguments.length > 2){throw _b_.TypeError.$factory("long_int takes at most 2 arguments ("+
arguments.length+" given)")}
if(base===undefined){base=10}
else if(!isinstance(base,int)){throw TypeError.$factory("'"+$B.class_name(base)+
"' object cannot be interpreted as an integer")}
if(base < 0 ||base==1 ||base > 36){throw ValueError.$factory(
"long_int.$factory() base must be >= 2 and <= 36")}
if(isinstance(value,_b_.float)){if(value===Number.POSITIVE_INFINITY ||
value===Number.NEGATIVE_INFINITY){return value}
if(value >=0){value=new Number(Math.round(value.value))}
else{value=new Number(Math.ceil(value.value))}}else if(isinstance(value,_b_.bool)){if(value.valueOf()){return int.$factory(1)}
return int.$factory(0)}
if(typeof value=="number"){if(isSafeInteger(value)){value=value.toString()}
else if(value.constructor==Number){value=value.toString()}
else{throw ValueError.$factory(
"argument of long_int is not a safe integer")}}else if(value.__class__===long_int){return value}else if(isinstance(value,int)){
value=value.$value+""}else if(isinstance(value,_b_.bool)){value=_b_.bool.__int__(value)+""}else if(typeof value !="string"){throw ValueError.$factory(
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
for(var i=0;i < value.length;i++){if(value.charAt(i)=="." && point==-1){point=i}
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
$B.set_func_names(long_int,"builtins")
$B.long_int=long_int})(__BRYTHON__)
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
complex.__bool__=function(self){return(self.$real !=0 ||self.$imag !=0)}
complex.__eq__=function(self,other){if(_b_.isinstance(other,complex)){return self.$real.valueOf()==other.$real.valueOf()&&
self.$imag.valueOf()==other.$imag.valueOf()}
if(_b_.isinstance(other,_b_.int)){if(self.$imag !=0){return false}
return self.$real==other.valueOf()}
if(_b_.isinstance(other,_b_.float)){if(self.$imag !=0){return false}
return self.$real==other.valueOf()}
return _b_.NotImplemented}
complex.__floordiv__=function(self,other){$UnsupportedOpType("//","complex",$B.get_class(other))}
complex.__hash__=function(self){
return self.$imag*1000003+self.$real}
complex.__init__=function(){return _b_.None}
complex.__invert__=function(self){return ~self}
complex.__mod__=function(self,other){throw _b_.TypeError.$factory("TypeError: can't mod complex numbers.")}
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
if(arguments.length==1 && $real.__class__===complex && $imag==0){return $real}
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
var exp=complex2expo(self),angle=exp.angle,res=Math.pow(exp.norm,other)
if(_b_.isinstance(other,[_b_.int,_b_.float])){return make_complex(res*Math.cos(angle*other),res*Math.sin(angle*other))}else if(_b_.isinstance(other,complex)){
var x=other.$real,y=other.$imag
var pw=Math.pow(exp.norm,x)*Math.pow(Math.E,-y*angle),theta=y*Math.log(exp.norm)-x*angle
return make_complex(pw*Math.cos(theta),pw*Math.sin(theta))}else{throw _b_.TypeError.$factory("unsupported operand type(s) "+
"for ** or pow(): 'complex' and '"+
$B.class_name(other)+"'")}}
complex.__str__=complex.__repr__=function(self){if(self.$real==0){if(1/self.$real < 0){if(self.$imag < 0){return "(-0"+self.$imag+"j)"}else if(self.$imag==0 && 1/self.$imag < 0){return "(-0-"+self.$imag+"j)"}else return "(-0+"+self.$imag+"j)"}else{if(self.$imag==0 && 1/self.$imag < 0){return "-"+self.$imag+"j"}else{return self.$imag+"j"}}}
if(self.$imag > 0){return "("+self.$real+"+"+self.$imag+"j)"}
if(self.$imag==0){if(1/self.$imag < 0){return "("+self.$real+"-"+self.$imag+"j)"}
return "("+self.$real+"+"+self.$imag+"j)"}
return "("+self.$real+"-"+(-self.$imag)+"j)"}
complex.__sqrt__=function(self){if(self.$imag==0){return complex(Math.sqrt(self.$real))}
var r=self.$real,i=self.$imag,_a=Math.sqrt((r+sqrt)/2),_b=Number.sign(i)*Math.sqrt((-r+sqrt)/2)
return make_complex(_a,_b)}
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
var $op_func=function(self,other){throw _b_.TypeError.$factory("TypeError: unsupported operand type(s) "+
"for -: 'complex' and '"+$B.class_name(other)+"'")}
$op_func+="" 
var $ops={"&":"and","|":"ior","<<":"lshift",">>":"rshift","^":"xor"}
for(var $op in $ops){eval("complex.__"+$ops[$op]+"__ = "+$op_func.replace(/-/gm,$op))}
complex.__ior__=complex.__or__
var $op_func=function(self,other){if(_b_.isinstance(other,complex)){return make_complex(self.$real-other.$real,self.$imag-other.$imag)}
if(_b_.isinstance(other,_b_.int)){return make_complex($B.sub(self.$real,other.valueOf()),self.$imag)}
if(_b_.isinstance(other,_b_.float)){return make_complex(self.$real-other.valueOf(),self.$imag)}
if(_b_.isinstance(other,_b_.bool)){var bool_value=0
if(other.valueOf()){bool_value=1}
return make_complex(self.$real-bool_value,self.$imag)}
throw _b_.TypeError.$factory("unsupported operand type(s) for -: "+
self.__repr__()+" and '"+$B.class_name(other)+"'")}
complex.__sub__=$op_func
$op_func+='' 
$op_func=$op_func.replace(/-/gm,"+").replace(/sub/gm,"add")
eval("complex.__add__ = "+$op_func)
var $comp_func=function(self,other){if(other===undefined ||other==_b_.None){return _b_.NotImplemented}
throw _b_.TypeError.$factory("TypeError: no ordering relation "+
"is defined for complex numbers")}
$comp_func+='' 
for(var $op in $B.$comps){eval("complex.__"+$B.$comps[$op]+"__ = "+
$comp_func.replace(/>/gm,$op))}
$B.make_rmethods(complex)
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
var bltns=$B.InjectBuiltins()
eval(bltns)
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
list.__add__=function(self,other){if($B.get_class(self)!==$B.get_class(other)){var radd=getattr(other,"__radd__",_b_.NotImplemented)
if(radd !==_b_.NotImplemented){return radd(self)}
throw _b_.TypeError.$factory('can only concatenate list (not "'+
$B.class_name(other)+'") to list')}
var res=self.valueOf().concat(other.valueOf())
res.__brython__=true
if(isinstance(self,tuple)){res=tuple.$factory(res)}
return res}
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
throw _b_.IndexError.$factory("list index out of range")}
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
throw _b_.TypeError.$factory("list indices must be integer, not "+
_b_.str.$factory(arg.__class__))}
list.__eq__=function(self,other){if(isinstance(self,list)){var klass=list}else{var klass=tuple}
if(isinstance(other,klass)){if(other.length==self.length){var i=self.length
while(i--){if(! $B.rich_comp("__eq__",self[i],other[i])){return false}}
return true}}
return _b_.NotImplemented}
list.__getitem__=function(self,arg){var $=$B.args("__getitem__",2,{self:null,key:null},["self","key"],arguments,{},null,null),self=$.self,key=$.key
var factory=$B.get_class(self).$factory
if(isinstance(key,_b_.int)){var items=self.valueOf(),pos=key
if(key < 0){pos=items.length+pos}
if(pos >=0 && pos < items.length){return items[pos]}
throw _b_.IndexError.$factory("list index out of range")}
if(isinstance(key,_b_.slice)){
var s=_b_.slice.$conv_for_seq(key,self.length)
var res=[],i=null,items=self.valueOf(),pos=0,start=s.start,stop=s.stop,step=s.step
if(step > 0){if(stop <=start){return factory(res)}
for(var i=start;i < stop;i+=step){res[pos++]=items[i]}
return factory(res)}else{if(stop > start){return factory(res)}
for(var i=start;i > stop;i+=step){res[pos++]=items[i]}
return factory(res)}}
if(_b_.hasattr(key,"__int__")||_b_.hasattr(key,"__index__")){return list.__getitem__(self,_b_.int.$factory(key))}
throw _b_.TypeError.$factory("list indices must be integer, not "+
$B.class_name(key))}
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
var radd=getattr($.x,"__radd__",_b_.NotImplemented)
if(radd !==_b_.NotImplemented){return radd($.self)}
var x=list.$factory($B.$iter($.x))
for(var i=0;i < x.length;i++){$.self.push(x[i])}
return $.self}
list.__imul__=function(){var $=$B.args("__imul__",2,{self:null,x:null},["self","x"],arguments,{},null,null),x=$B.$GetInt($.x),len=$.self.length,pos=len
if(x==0){list.clear($.self);return $.self}
for(var i=1;i < x;i++){for(j=0;j < len;j++){$.self[pos++]=$.self[j]}}
return $.self}
list.__init__=function(self,arg){var len_func=$B.$call(getattr(self,"__len__")),pop_func=getattr(self,"pop",$N)
if(pop_func !==$N){pop_func=$B.$call(pop_func)
while(len_func()){pop_func()}}
if(arg===undefined){return $N}
var arg=$B.$iter(arg),next_func=$B.$call(getattr(arg,"__next__")),pos=len_func()
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
while(i < self.length){if(i >=other.length){return true}
if($B.rich_comp("__eq__",self[i],other[i])){i++}else{res=getattr(self[i],"__lt__")(other[i])
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(self[i])+"() >= "+
$B.class_name(other[i])+"()")}else{return res}}}
return other.length > self.length}
list.__mul__=function(self,other){if(isinstance(other,_b_.int)){
var res=[],$temp=self.slice(),len=$temp.length
for(var i=0;i < other;i++){for(var j=0;j < len;j++){res.push($temp[j])}}
res.__class__=self.__class__
return res}
if(_b_.hasattr(other,"__int__")||_b_.hasattr(other,"__index__")){return list.__mul__(self,_b_.int.$factory(other))}
var rmul=$B.$getattr(other,"__rmul__",_b_.NotImplemented)
if(rmul !==_b_.NotImplemented){return rmul(self)}
throw _b_.TypeError.$factory(
"can't multiply sequence by non-int of type '"+
$B.class_name(other)+"'")}
list.__new__=function(cls,...args){if(cls===undefined){throw _b_.TypeError.$factory("list.__new__(): not enough arguments")}
var res=[]
res.__class__=cls
res.__brython__=true
res.__dict__=_b_.dict.$factory()
return res}
list.__repr__=function(self){if(self===undefined){return "<class 'list'>"}
var _r=[]
for(var i=0;i < self.length;i++){if(self[i]===self){_r.push('[...]')}
else{_r.push(_b_.repr(self[i]))}}
if(self.__class__===tuple){if(self.length==1){return "("+_r[0]+",)"}
return "("+_r.join(", ")+")"}
return "["+_r.join(", ")+"]"}
list.__setattr__=function(self,attr,value){if(self.__class__===list){if(list.hasOwnProperty(attr)){throw _b_.AttributeError.$factory("'list' object attribute '"+
attr+"' is read-only")}else{throw _b_.AttributeError.$factory(
"'list' object has no attribute '"+attr+"'")}}
self.__dict__.$string_dict[attr]=value
return $N}
list.__setitem__=function(){var $=$B.args("__setitem__",3,{self:null,key:null,value:null},["self","key","value"],arguments,{},null,null),self=$.self,arg=$.key,value=$.value
list.$setitem(self,arg,value)}
list.$setitem=function(self,arg,value){
if(typeof arg=="number" ||isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos=self.length+pos}
if(pos >=0 && pos < self.length){self[pos]=value}
else{throw _b_.IndexError.$factory("list index out of range")}
return $N}
if(isinstance(arg,_b_.slice)){var s=_b_.slice.$conv_for_seq(arg,self.length)
if(arg.step===null){$B.set_list_slice(self,s.start,s.stop,value)}
else{$B.set_list_slice_step(self,s.start,s.stop,s.step,value)}
return $N}
if(_b_.hasattr(arg,"__int__")||_b_.hasattr(arg,"__index__")){list.__setitem__(self,_b_.int.$factory(arg),value)
return $N}
throw _b_.TypeError.$factory("list indices must be integer, not "+
$B.class_name(arg))}
$B.make_rmethods(list)
var _ops=["add","sub"]
list.append=function(){var $=$B.args("append",2 ,{self:null,x:null},["self","x"],arguments,{},null,null)
$.self[$.self.length]=$.x
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
throw _b_.ValueError.$factory(_b_.str.$factory($.x)+" is not in list")}
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
for(var i=0;i < keys.length;i++){if(keys[i]=="key"){func=kw_args.$string_dict[keys[i]]}
else if(keys[i]=="reverse"){reverse=kw_args.$string_dict[keys[i]]}
else{throw _b_.TypeError.$factory("'"+keys[i]+
"' is an invalid keyword argument for this function")}}
if(self.length==0){return}
if(func !==$N){func=$B.$call(func)}
self.$cl=$elts_class(self)
var cmp=null;
if(func===$N && self.$cl===_b_.str){if(reverse){cmp=function(b,a){return $B.$AlphabeticalCompare(a,b)}}else{cmp=function(a,b){return $B.$AlphabeticalCompare(a,b)}}}else if(func===$N && self.$cl===_b_.int){if(reverse){cmp=function(b,a){return a-b}}else{cmp=function(a,b){return a-b}}}else{if(func===$N){if(reverse){cmp=function(b,a){res=getattr(a,"__le__")(b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(b)+"() <="+
$B.class_name(a)+"()")}
if(res){if(a==b){return 0}
return-1}
return 1}}else{cmp=function(a,b){res=getattr(a,"__le__")(b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(a)+"() <="+
$B.class_name(b)+"()")}
if(res){if(a==b){return 0}
return-1}
return 1}}}else{if(reverse){cmp=function(b,a){var _a=func(a),_b=func(b)
res=getattr(_a,"__le__")(_b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(b)+"() <="+
$B.class_name(a)+"()")}
if(res){if(_a==_b){return 0}
return-1}
return 1}}else{cmp=function(a,b){var _a=func(a),_b=func(b)
res=$B.$getattr(_a,"__lt__")(_b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(a)+"() <="+
$B.class_name(b)+"()")}
if(res){if(_a==_b){return 0}
return-1}
return 1}}}}
$B.$TimSort(self,cmp)
return(self.__brython__ ? $N :self)}
$B.$list=function(t){t.__brython__=true
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
array.__dict__=_b_.dict.$factory()
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
if(tuple[attr]===undefined){if(typeof list[attr]=="function"){tuple[attr]=(function(x){return function(){return list[x].apply(null,arguments)}})(attr)}else{}}}}
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
self.__dict__=_b_.dict.$factory()
var arg=$B.$iter(args[0]),next_func=$B.$call(getattr(arg,"__next__"))
while(1){try{var item=next_func()
self.push(item)}
catch(err){if(err.__class__===_b_.StopIteration){break}
else{throw err}}}
return self}
$B.set_func_names(tuple,"builtins")
_b_.list=list
_b_.tuple=tuple
_b_.object.__bases__=tuple.$factory()})(__BRYTHON__)
;
var $B=__BRYTHON__
$B.unicode={"Cc":[[0,32],[127,33]],"Zs":[32,160,5760,6158,[8192,11],8239,8287,12288],"Po":[[33,3],[37,3],[42,3,2],47,58,59,63,64,92,161,183,191,894,903,[1370,6],1417,[1472,3,3],1523,1524,1545,1546,1548,1549,1563,1566,1567,[1642,4],1748,[1792,14],[2039,3],[2096,15],2404,2405,2416,3572,3663,3674,3675,[3844,15],3973,[4048,5],[4170,6],4347,[4961,8],5741,5742,[5867,3],5941,5942,[6100,3],[6104,3],[6144,6],[6151,4],6468,6469,6622,6623,6686,6687,[6816,7],[6824,6],[7002,7],[7227,5],7294,7295,7379,8214,8215,[8224,8],[8240,9],[8251,4],[8257,3],[8263,11],8275,[8277,10],[11513,4],11518,11519,11776,11777,[11782,3],11787,[11790,9],11800,11801,11803,11806,11807,[11818,5],11824,11825,[12289,3],12349,12539,42238,42239,[42509,3],42611,42622,[42738,6],[43124,4],43214,43215,[43256,3],43310,43311,43359,[43457,13],43486,43487,[43612,4],43742,43743,44011,[65040,7],65049,65072,65093,65094,[65097,4],[65104,3],[65108,4],[65119,3],65128,65130,65131,[65281,3],[65285,3],[65290,3,2],65295,65306,65307,65311,65312,65340,65377,65380,65381,65792,65793,66463,66512,67671,67871,67903,[68176,9],68223,[68409,7],69819,69820,[69822,4],[74864,4]],"Sc":[36,[162,4],1547,2546,2547,2555,2801,3065,3647,6107,[8352,25],43064,65020,65129,65284,65504,65505,65509,65510],"Ps":[40,91,123,3898,3900,5787,8218,8222,8261,8317,8333,9001,[10088,7,2],10181,[10214,5,2],[10627,11,2],10712,10714,10748,[11810,4,2],[12296,5,2],[12308,4,2],12317,64830,65047,[65077,8,2],65095,[65113,3,2],65288,65339,65371,65375,65378],"Pe":[41,93,125,3899,3901,5788,8262,8318,8334,9002,[10089,7,2],10182,[10215,5,2],[10628,11,2],10713,10715,10749,[11811,4,2],[12297,5,2],[12309,4,2],12318,12319,64831,65048,[65078,8,2],65096,[65114,3,2],65289,65341,[65373,3,3]],"Sm":[43,[60,3],124,126,172,177,215,247,1014,[1542,3],8260,8274,[8314,3],[8330,3],[8512,5],8523,[8592,5],8602,8603,[8608,3,3],8622,8654,8655,8658,8660,[8692,268],[8968,4],8992,8993,9084,[9115,25],[9180,6],9655,9665,[9720,8],9839,[10176,5],[10183,4],10188,[10192,22],[10224,16],[10496,131],[10649,63],[10716,32],[10750,258],[11056,21],[11079,6],64297,65122,[65124,3],65291,[65308,3],65372,65374,65506,[65513,4],120513,120539,120571,120597,120629,120655,120687,120713,120745,120771],"Pd":[45,1418,1470,5120,6150,[8208,6],11799,11802,12316,12336,12448,65073,65074,65112,65123,65293],"Nd":[[48,10],[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2662,10],[2790,10],[2918,10],[3046,10],[3174,10],[3302,10],[3430,10],[3664,10],[3792,10],[3872,10],[4160,10],[4240,10],[6112,10],[6160,10],[6470,10],[6608,11],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],[42528,10],[43216,10],[43264,10],[43472,10],[43600,10],[44016,10],[65296,10],[66720,10],[120782,50]],"Lu":[[65,26],[192,23],[216,7],[256,28,2],[313,8,2],[330,24,2],[377,3,2],385,[386,3,2],391,[393,3],[398,4],403,404,[406,3],412,413,415,[416,4,2],423,425,428,430,431,[433,3],437,439,440,444,[452,4,3],[463,7,2],[478,9,2],497,500,[502,3],[506,29,2],570,571,573,574,577,[579,4],[584,4,2],880,882,886,902,[904,3],908,910,911,[913,17],[931,9],975,[978,3],[984,12,2],1012,1015,1017,1018,[1021,51],[1120,17,2],[1162,28,2],[1217,7,2],[1232,43,2],[1329,38],[4256,38],[7680,75,2],[7838,49,2],[7944,8],[7960,6],[7976,8],[7992,8],[8008,6],[8025,4,2],[8040,8],[8120,4],[8136,4],[8152,4],[8168,5],[8184,4],8450,8455,[8459,3],[8464,3],8469,[8473,5],[8484,4,2],[8491,3],[8496,4],8510,8511,8517,8579,[11264,47],11360,[11362,3],[11367,4,2],[11374,3],11378,11381,[11390,3],[11394,49,2],11499,11501,[42560,16,2],[42594,6,2],[42624,12,2],[42786,7,2],[42802,31,2],[42873,3,2],[42878,5,2],42891,[65313,26],[66560,40],[119808,26],[119860,26],[119912,26],119964,119966,[119967,3,3],119974,[119977,4],[119982,8],[120016,26],120068,120069,[120071,4],[120077,8],[120086,7],120120,120121,[120123,4],[120128,5],120134,[120138,7],[120172,26],[120224,26],[120276,26],[120328,26],[120380,26],[120432,26],[120488,25],[120546,25],[120604,25],[120662,25],[120720,25],120778],"Sk":[94,96,168,175,180,184,[706,4],[722,14],[741,7],749,[751,17],885,900,901,8125,[8127,3],[8141,3],[8157,3],[8173,3],8189,8190,12443,12444,[42752,23],42784,42785,42889,42890,65342,65344,65507],"Pc":[95,8255,8256,8276,65075,65076,[65101,3],65343],"Ll":[[97,26],170,181,186,[223,24],[248,8],[257,28,2],[312,9,2],[329,24,2],[378,3,2],383,384,387,389,392,396,397,402,405,[409,3],414,[417,3,2],424,426,427,429,432,436,438,441,442,[445,3],[454,3,3],[462,8,2],[477,10,2],496,499,501,[505,30,2],[564,6],572,575,576,578,[583,5,2],[592,68],[661,27],881,[883,3,4],892,893,912,[940,35],976,977,[981,3],[985,12,2],[1008,4],[1013,3,3],1020,[1072,48],[1121,17,2],[1163,27,2],[1218,7,2],[1231,44,2],[1377,39],[7424,44],[7522,22],[7545,34],[7681,75,2],[7830,8],[7839,49,2],[7936,8],[7952,6],[7968,8],[7984,8],[8000,6],[8016,8],[8032,8],[8048,14],[8064,8],[8080,8],[8096,8],[8112,5],8118,8119,8126,[8130,3],8134,8135,[8144,4],8150,8151,[8160,8],[8178,3],8182,8183,8458,8462,8463,8467,[8495,3,5],8508,8509,[8518,4],8526,8580,[11312,47],11361,11365,[11366,4,2],11377,11379,11380,[11382,7],[11393,50,2],11492,11500,11502,[11520,38],[42561,16,2],[42595,6,2],[42625,12,2],[42787,7,2],42800,[42801,33,2],[42866,7],42874,42876,[42879,5,2],42892,[64256,7],[64275,5],[65345,26],[66600,40],[119834,26],[119886,7],[119894,18],[119938,26],[119990,4],119995,[119997,7],[120005,11],[120042,26],[120094,26],[120146,26],[120198,26],[120250,26],[120302,26],[120354,26],[120406,26],[120458,28],[120514,25],[120540,6],[120572,25],[120598,6],[120630,25],[120656,6],[120688,25],[120714,6],[120746,25],[120772,6],120779],"So":[166,167,169,174,176,182,1154,1550,1551,1769,1789,1790,2038,2554,2928,[3059,6],3066,3199,3313,3314,3449,[3841,3],[3859,5],[3866,6],[3892,3,2],[4030,8],[4039,6],4046,4047,[4053,4],4254,4255,4960,[5008,10],6464,[6624,32],[7009,10],[7028,9],8448,8449,[8451,4],8456,8457,8468,[8470,3],[8478,6],[8485,3,2],8494,8506,8507,8522,8524,8525,8527,[8597,5],[8604,4],8609,8610,8612,8613,[8615,7],[8623,31],8656,[8657,3,2],[8662,30],[8960,8],[8972,20],[8994,7],[9003,81],[9085,30],[9140,40],[9186,7],[9216,39],[9280,11],[9372,78],[9472,183],[9656,9],[9666,54],[9728,111],[9840,94],[9935,19],9955,[9960,24],[9985,4],[9990,4],[9996,28],[10025,35],10061,[10063,4],[10070,9],[10081,7],10132,[10136,24],[10161,14],[10240,256],[11008,48],11077,11078,[11088,10],[11493,6],[11904,26],[11931,89],[12032,214],[12272,12],12292,12306,12307,12320,12342,12343,12350,12351,12688,12689,[12694,10],[12736,36],[12800,31],[12842,39],[12896,32],[12938,39],[12992,63],[13056,256],[19904,64],[42128,55],[43048,4],43062,43063,43065,[43639,3],65021,65508,65512,65517,65518,65532,65533,65794,[65847,9],[65913,17],[65936,12],[66000,45],[118784,246],[119040,39],[119081,60],[119146,3],119171,119172,[119180,30],[119214,48],[119296,66],119365,[119552,87],[126976,44],[127024,100],[127248,31],127281,127293,127295,[127298,3,4],[127307,4],127319,127327,127353,127355,127356,127359,[127370,4],127376,127488,[127504,34],[127552,9]],"Pi":[171,8216,8219,8220,8223,8249,11778,11780,11785,11788,11804,11808],"Cf":[173,[1536,4],1757,1807,6068,6069,[8203,5],[8234,5],[8288,5],[8298,6],65279,[65529,3],69821,[119155,8],917505,[917536,96]],"No":[178,179,185,[188,3],[2548,6],[3056,3],[3192,7],[3440,6],[3882,10],[4969,20],[6128,10],8304,[8308,6],[8320,10],[8528,16],8585,[9312,60],[9450,22],[10102,30],11517,[12690,4],[12832,10],[12881,15],[12928,10],[12977,15],[43056,6],[65799,45],[65909,4],65930,[66336,4],[67672,8],[67862,6],[68160,8],68221,68222,[68440,8],[68472,8],[69216,31],[119648,18],[127232,11]],"Pf":[187,8217,8221,8250,11779,11781,11786,11789,11805,11809],"Lo":[443,[448,4],660,[1488,27],[1520,3],[1569,31],[1601,10],1646,1647,[1649,99],1749,1774,1775,[1786,3],1791,1808,[1810,30],[1869,89],1969,[1994,33],[2048,22],[2308,54],2365,2384,[2392,10],2418,[2425,7],[2437,8],2447,2448,[2451,22],[2474,7],2482,[2486,4],2493,2510,2524,2525,[2527,3],2544,2545,[2565,6],2575,2576,[2579,22],[2602,7],2610,2611,2613,2614,2616,2617,[2649,4],2654,[2674,3],[2693,9],[2703,3],[2707,22],[2730,7],2738,2739,[2741,5],2749,2768,2784,2785,[2821,8],2831,2832,[2835,22],[2858,7],2866,2867,[2869,5],2877,2908,2909,[2911,3],2929,2947,[2949,6],[2958,3],[2962,4],2969,[2970,3,2],2975,2979,2980,[2984,3],[2990,12],3024,[3077,8],[3086,3],[3090,23],[3114,10],[3125,5],3133,3160,3161,3168,3169,[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3261,3294,3296,3297,[3333,8],[3342,3],[3346,23],[3370,16],3389,3424,3425,[3450,6],[3461,18],[3482,24],[3507,9],3517,[3520,7],[3585,48],3634,3635,[3648,6],3713,3714,3716,3719,3720,3722,3725,[3732,4],[3737,7],[3745,3],3749,3751,3754,3755,[3757,4],3762,3763,3773,[3776,5],3804,3805,3840,[3904,8],[3913,36],[3976,4],[4096,43],4159,[4176,6],[4186,4],4193,4197,4198,[4206,3],[4213,13],4238,[4304,43],[4352,329],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],[4992,16],[5024,85],[5121,620],[5743,17],[5761,26],[5792,75],[5888,13],[5902,4],[5920,18],[5952,18],[5984,13],[5998,3],[6016,52],6108,[6176,35],[6212,52],[6272,41],6314,[6320,70],[6400,29],[6480,30],[6512,5],[6528,44],[6593,7],[6656,23],[6688,53],[6917,47],[6981,7],[7043,30],7086,7087,[7168,36],[7245,3],[7258,30],[7401,4],[7406,4],[8501,4],[11568,54],[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],12294,12348,[12353,86],12447,[12449,90],12543,[12549,41],[12593,94],[12704,24],[12784,16],13312,19893,19968,40907,[40960,21],[40982,1143],[42192,40],[42240,268],[42512,16],42538,42539,42606,[42656,70],[43003,7],[43011,3],[43015,4],[43020,23],[43072,52],[43138,50],[43250,6],43259,[43274,28],[43312,23],[43360,29],[43396,47],[43520,41],[43584,3],[43588,8],[43616,16],[43633,6],43642,[43648,48],43697,43701,43702,[43705,5],43712,43714,43739,43740,[43968,35],44032,55203,[55216,23],[55243,49],[63744,302],[64048,62],[64112,106],64285,[64287,10],[64298,13],[64312,5],64318,64320,64321,64323,64324,[64326,108],[64467,363],[64848,64],[64914,54],[65008,12],[65136,5],[65142,135],[65382,10],[65393,45],[65440,31],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],65596,65597,[65599,15],[65616,14],[65664,123],[66176,29],[66208,49],[66304,31],[66352,17],[66370,8],[66432,30],[66464,36],[66504,8],[66640,78],[67584,6],67592,[67594,44],67639,67640,67644,[67647,23],[67840,22],[67872,26],68096,[68112,4],[68117,3],[68121,27],[68192,29],[68352,54],[68416,22],[68448,19],[68608,73],[69763,45],[73728,879],[77824,1071],131072,173782,173824,177972,[194560,542]],"Lt":[[453,3,3],498,[8072,8],[8088,8],[8104,8],8124,8140,8188],"Lm":[[688,18],[710,12],[736,5],748,750,884,890,1369,1600,1765,1766,2036,2037,2042,2074,2084,2088,2417,3654,3782,4348,6103,6211,6823,[7288,6],[7468,54],7544,[7579,37],8305,8319,[8336,5],11389,11631,11823,12293,[12337,5],12347,12445,12446,[12540,3],40981,[42232,6],42508,42623,[42775,9],42864,42888,43471,43632,43741,65392,65438,65439],"Mn":[[768,112],[1155,5],[1425,45],1471,1473,1474,1476,1477,1479,[1552,11],[1611,20],1648,[1750,7],[1759,6],1767,1768,[1770,4],1809,[1840,27],[1958,11],[2027,9],[2070,4],[2075,9],[2085,3],[2089,5],[2304,3],2364,[2369,8],2381,[2385,5],2402,2403,2433,2492,[2497,4],2509,2530,2531,2561,2562,2620,2625,2626,2631,2632,[2635,3],2641,2672,2673,2677,2689,2690,2748,[2753,5],2759,2760,2765,2786,2787,2817,2876,2879,[2881,4],2893,2902,2914,2915,2946,3008,3021,[3134,3],[3142,3],[3146,4],3157,3158,3170,3171,3260,3263,3270,3276,3277,3298,3299,[3393,4],3405,3426,3427,3530,[3538,3],3542,3633,[3636,7],[3655,8],3761,[3764,6],3771,3772,[3784,6],3864,3865,[3893,3,2],[3953,14],[3968,5],3974,3975,[3984,8],[3993,36],4038,[4141,4],[4146,6],4153,4154,4157,4158,4184,4185,[4190,3],[4209,4],4226,4229,4230,4237,4253,4959,[5906,3],[5938,3],5970,5971,6002,6003,[6071,7],6086,[6089,11],6109,[6155,3],6313,[6432,3],6439,6440,6450,[6457,3],6679,6680,6742,[6744,7],6752,6754,[6757,8],[6771,10],6783,[6912,4],6964,[6966,5],6972,6978,[7019,9],7040,7041,[7074,4],7080,7081,[7212,8],7222,7223,[7376,3],[7380,13],[7394,7],7405,[7616,39],[7677,3],[8400,13],8417,[8421,12],[11503,3],[11744,32],[12330,6],12441,12442,42607,42620,42621,42736,42737,43010,43014,43019,43045,43046,43204,[43232,18],[43302,8],[43335,11],[43392,3],43443,[43446,4],43452,[43561,6],43569,43570,43573,43574,43587,43596,43696,[43698,3],43703,43704,43710,43711,43713,44005,44008,44013,64286,[65024,16],[65056,7],66045,[68097,3],68101,68102,[68108,4],[68152,3],68159,69760,69761,[69811,4],69817,69818,[119143,3],[119163,8],[119173,7],[119210,4],[119362,3],[917760,240]],"Me":[1160,1161,1758,[8413,4],[8418,3],[42608,3]],"Mc":[2307,[2366,3],[2377,4],2382,2434,2435,[2494,3],2503,2504,2507,2508,2519,2563,[2622,3],2691,[2750,3],2761,2763,2764,2818,2819,2878,2880,2887,2888,2891,2892,2903,3006,3007,3009,3010,[3014,3],[3018,3],3031,[3073,3],[3137,4],3202,3203,3262,[3264,5],3271,3272,3274,3275,3285,3286,3330,3331,[3390,3],[3398,3],[3402,3],3415,3458,3459,[3535,3],[3544,8],3570,3571,3902,3903,3967,4139,4140,4145,4152,4155,4156,4182,4183,[4194,3],[4199,7],4227,4228,[4231,6],4239,[4250,3],6070,[6078,8],6087,6088,[6435,4],[6441,3],6448,6449,[6451,6],[6576,17],6600,6601,[6681,3],6741,6743,6753,6755,6756,[6765,6],6916,6965,6971,[6973,5],6979,6980,7042,7073,7078,7079,7082,[7204,8],7220,7221,7393,7410,43043,43044,43047,43136,43137,[43188,16],43346,43347,43395,43444,43445,43450,43451,[43453,4],43567,43568,43571,43572,43597,43643,44003,44004,44006,44007,44009,44010,44012,69762,[69808,3],69815,69816,119141,119142,[119149,6]],"Nl":[[5870,3],[8544,35],[8581,4],12295,[12321,9],[12344,3],[42726,10],[65856,53],66369,66378,[66513,5],[74752,99]],"Zl":[8232],"Zp":[8233],"Cs":[55296,56191,56192,56319,56320,57343],"Co":[57344,63743,983040,1048573,1048576,1114109],"digits":[[48,10],178,179,185,[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2662,10],[2790,10],[2918,10],[3046,10],[3174,10],[3302,10],[3430,10],[3558,10],[3664,10],[3792,10],[3872,10],[4160,10],[4240,10],[4969,9],[6112,10],[6160,10],[6470,10],[6608,11],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],8304,[8308,6],[8320,10],[9312,9],[9332,9],[9352,9],9450,[9461,9],9471,[10102,9],[10112,9],[10122,9],[42528,10],[43216,10],[43264,10],[43472,10],[43504,10],[43600,10],[44016,10],[65296,10],[66720,10],[68160,4],[68912,10],[69216,9],[69714,9],[69734,10],[69872,10],[69942,10],[70096,10],[70384,10],[70736,10],[70864,10],[71248,10],[71360,10],[71472,10],[71904,10],[72784,10],[73040,10],[73120,10],[92768,10],[93008,10],[120782,50],[123200,10],[123632,10],[125264,10],[127232,11]],"numeric":[[48,10],178,179,185,[188,3],[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2548,6],[2662,10],[2790,10],[2918,10],[2930,6],[3046,13],[3174,10],[3192,7],[3302,10],[3416,7],[3430,19],[3558,10],[3664,10],[3792,10],[3872,20],[4160,10],[4240,10],[4969,20],[5870,3],[6112,10],[6128,10],[6160,10],[6470,10],[6608,11],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],8304,[8308,6],[8320,10],[8528,51],[8581,5],[9312,60],[9450,22],[10102,30],11517,12295,[12321,9],[12344,3],[12690,4],[12832,10],[12872,8],[12881,15],[12928,10],[12977,15],13317,13443,14378,15181,19968,19971,19975,19977,20061,20108,20116,20118,20159,20160,20191,20200,20237,20336,20740,20806,[20841,3,2],21313,[21315,3],21324,[21441,4],22235,22769,22777,24186,24318,24319,[24332,3],24336,25342,25420,26578,28422,29590,30334,32902,33836,36014,36019,36144,38433,38470,38476,38520,38646,[42528,10],[42726,10],[43056,6],[43216,10],[43264,10],[43472,10],[43504,10],[43600,10],[44016,10],63851,63859,63864,63922,63953,63955,63997,[65296,10],[65799,45],[65856,57],65930,65931,[66273,27],[66336,4],66369,66378,[66513,5],[66720,10],[67672,8],[67705,7],[67751,9],[67835,5],[67862,6],68028,68029,[68032,16],[68050,46],[68160,9],68221,68222,[68253,3],[68331,5],[68440,8],[68472,8],[68521,7],[68858,6],[68912,10],[69216,31],[69405,10],[69457,4],[69714,30],[69872,10],[69942,10],[70096,10],[70113,20],[70384,10],[70736,10],[70864,10],[71248,10],[71360,10],[71472,12],[71904,19],[72784,29],[73040,10],[73120,10],[73664,21],[74752,111],[92768,10],[93008,10],[93019,7],[93824,23],[119520,20],[119648,25],[120782,50],[123200,10],[123632,10],[125127,9],[125264,10],[126065,59],[126125,3],[126129,4],[126209,45],[126255,15],[127232,13],131073,131172,131298,131361,133418,133507,133516,133532,133866,133885,133913,140176,141720,146203,156269,194704]}
$B.unicode_casefold={223:[115,115],304:[105,775],329:[700,110],496:[106,780],912:[953,776,769],944:[965,776,769],1415:[1381,1410],7830:[104,817],7831:[116,776],7832:[119,778],7833:[121,778],7834:[97,702],7838:[223],8016:[965,787],8018:[965,787,768],8020:[965,787,769],8022:[965,787,834],8064:[7936,953],8065:[7937,953],8066:[7938,953],8067:[7939,953],8068:[7940,953],8069:[7941,953],8070:[7942,953],8071:[7943,953],8072:[8064],8073:[8065],8074:[8066],8075:[8067],8076:[8068],8077:[8069],8078:[8070],8079:[8071],8080:[7968,953],8081:[7969,953],8082:[7970,953],8083:[7971,953],8084:[7972,953],8085:[7973,953],8086:[7974,953],8087:[7975,953],8088:[8080],8089:[8081],8090:[8082],8091:[8083],8092:[8084],8093:[8085],8094:[8086],8095:[8087],8096:[8032,953],8097:[8033,953],8098:[8034,953],8099:[8035,953],8100:[8036,953],8101:[8037,953],8102:[8038,953],8103:[8039,953],8104:[8096],8105:[8097],8106:[8098],8107:[8099],8108:[8100],8109:[8101],8110:[8102],8111:[8103],8114:[8048,953],8115:[945,953],8116:[940,953],8118:[945,834],8119:[945,834,953],8124:[8115],8130:[8052,953],8131:[951,953],8132:[942,953],8134:[951,834],8135:[951,834,953],8140:[8131],8146:[953,776,768],8147:[953,776,769],8150:[953,834],8151:[953,776,834],8162:[965,776,768],8163:[965,776,769],8164:[961,787],8166:[965,834],8167:[965,776,834],8178:[8060,953],8179:[969,953],8180:[974,953],8182:[969,834],8183:[969,834,953],8188:[8179],64256:[102,102],64257:[102,105],64258:[102,108],64259:[102,102,105],64260:[102,102,108],64261:[115,116],64262:[115,116],64275:[1396,1398],64276:[1396,1381],64277:[1396,1387],64278:[1406,1398],64279:[1396,1389]}
$B.unicode_bidi_whitespace=[9,10,11,12,13,28,29,30,31,32,133,5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8287,12288]
$B.unicode_identifiers={"XID_Start":[95,[65,26],[97,26],170,181,186,[192,23],[216,31],[248,458],[710,12],[736,5],748,750,[880,5],[886,2],[891,3],902,[904,3],908,[910,20],[931,83],[1015,139],[1162,156],[1329,38],1369,[1377,39],[1488,27],[1520,3],[1569,42],[1646,2],[1649,99],1749,[1765,2],[1774,2],[1786,3],1791,1808,[1810,30],[1869,89],1969,[1994,33],[2036,2],2042,[2048,22],2074,2084,2088,[2308,54],2365,2384,[2392,10],2417,2418,[2425,7],[2437,8],[2447,2],[2451,22],[2474,7],2482,[2486,4],2493,2510,[2524,2],[2527,3],[2544,2],[2565,6],[2575,2],[2579,22],[2602,7],[2610,2],[2613,2],[2616,2],[2649,4],2654,[2674,3],[2693,9],[2703,3],[2707,22],[2730,7],[2738,2],[2741,5],2749,2768,[2784,2],[2821,8],[2831,2],[2835,22],[2858,7],[2866,2],[2869,5],2877,[2908,2],[2911,3],2929,2947,[2949,6],[2958,3],[2962,4],[2969,2],2972,[2974,2],[2979,2],[2984,3],[2990,12],3024,[3077,8],[3086,3],[3090,23],[3114,10],[3125,5],3133,[3160,2],[3168,2],[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3261,3294,[3296,2],[3333,8],[3342,3],[3346,23],[3370,16],3389,[3424,2],[3450,6],[3461,18],[3482,24],[3507,9],3517,[3520,7],[3585,48],3634,[3648,7],[3713,2],3716,[3719,2],3722,3725,[3732,4],[3737,7],[3745,3],3749,3751,[3754,2],[3757,4],3762,3773,[3776,5],3782,[3804,2],3840,[3904,8],[3913,36],[3976,4],[4096,43],4159,[4176,6],[4186,4],4193,[4197,2],[4206,3],[4213,13],4238,[4256,38],[4304,43],4348,[4352,329],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],[4992,16],[5024,85],[5121,620],[5743,17],[5761,26],[5792,75],[5870,3],[5888,13],[5902,4],[5920,18],[5952,18],[5984,13],[5998,3],[6016,52],6103,6108,[6176,88],[6272,41],6314,[6320,70],[6400,29],[6480,30],[6512,5],[6528,44],[6593,7],[6656,23],[6688,53],6823,[6917,47],[6981,7],[7043,30],[7086,2],[7168,36],[7245,3],[7258,36],[7401,4],[7406,4],[7424,192],[7680,278],[7960,6],[7968,38],[8008,6],[8016,8],8025,8027,8029,[8031,31],[8064,53],[8118,7],8126,[8130,3],[8134,7],[8144,4],[8150,6],[8160,13],[8178,3],[8182,7],8305,8319,[8336,5],8450,8455,[8458,10],8469,8472,[8473,5],8484,8486,8488,[8490,16],[8508,4],[8517,5],8526,[8544,41],[11264,47],[11312,47],[11360,133],[11499,4],[11520,38],[11568,54],11631,[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],12293,12294,12295,[12321,9],[12337,5],[12344,5],[12353,86],[12445,3],[12449,90],[12540,4],[12549,41],[12593,94],[12704,24],[12784,16],[13312,6582],[19968,20940],[40960,1165],[42192,46],[42240,269],[42512,16],[42538,2],[42560,32],[42594,13],42623,[42624,24],[42656,80],[42775,9],[42786,103],[42891,2],[43003,7],[43011,3],[43015,4],[43020,23],[43072,52],[43138,50],[43250,6],43259,[43274,28],[43312,23],[43360,29],[43396,47],43471,[43520,41],[43584,3],[43588,8],[43616,23],43642,[43648,48],43697,[43701,2],[43705,5],43712,43714,[43739,3],[43968,35],[44032,11172],[55216,23],[55243,49],[63744,302],[64048,62],[64112,106],[64256,7],[64275,5],64285,[64287,10],[64298,13],[64312,5],64318,[64320,2],[64323,2],[64326,108],[64467,139],[64612,218],[64848,64],[64914,54],[65008,10],65137,65139,65143,65145,65147,65149,[65151,126],[65313,26],[65345,26],[65382,56],[65440,31],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],[65596,2],[65599,15],[65616,14],[65664,123],[65856,53],[66176,29],[66208,49],[66304,31],[66352,27],[66432,30],[66464,36],[66504,8],[66513,5],[66560,158],[67584,6],67592,[67594,44],[67639,2],67644,[67647,23],[67840,22],[67872,26],68096,[68112,4],[68117,3],[68121,27],[68192,29],[68352,54],[68416,22],[68448,19],[68608,73],[69763,45],[73728,879],[74752,99],[77824,1071],[119808,85],[119894,71],[119966,2],119970,[119973,2],[119977,4],[119982,12],119995,[119997,7],[120005,65],[120071,4],[120077,8],[120086,7],[120094,28],[120123,4],[120128,5],120134,[120138,7],[120146,340],[120488,25],[120514,25],[120540,31],[120572,25],[120598,31],[120630,25],[120656,31],[120688,25],[120714,31],[120746,25],[120772,8],[131072,42711],[173824,4149],[194560,542]],"XID_Continue":[[48,10],[65,26],95,[97,26],170,181,183,186,[192,23],[216,31],[248,458],[710,12],[736,5],748,750,[768,117],[886,2],[891,3],902,903,[904,3],908,[910,20],[931,83],[1015,139],[1155,5],[1162,156],[1329,38],1369,[1377,39],[1425,45],1471,[1473,2],[1476,2],1479,[1488,27],[1520,3],[1552,11],[1569,62],[1632,10],[1646,102],1749,[1750,7],[1759,10],[1770,19],1791,1808,1809,[1810,57],[1869,101],[1984,54],2042,[2048,46],[2304,58],2364,2365,[2366,17],2384,[2385,5],[2392,12],[2406,10],2417,2418,[2425,7],2433,[2434,2],[2437,8],[2447,2],[2451,22],[2474,7],2482,[2486,4],2492,2493,[2494,7],[2503,2],[2507,4],2519,[2524,2],[2527,5],[2534,12],[2561,3],[2565,6],[2575,2],[2579,22],[2602,7],[2610,2],[2613,2],[2616,2],2620,[2622,5],[2631,2],[2635,3],2641,[2649,4],2654,[2662,16],[2689,3],[2693,9],[2703,3],[2707,22],[2730,7],[2738,2],[2741,5],2748,2749,[2750,8],[2759,3],[2763,3],2768,[2784,4],[2790,10],2817,[2818,2],[2821,8],[2831,2],[2835,22],[2858,7],[2866,2],[2869,5],2876,2877,2878,2879,2880,[2881,4],[2887,2],[2891,3],2902,2903,[2908,2],[2911,5],[2918,10],2929,2946,2947,[2949,6],[2958,3],[2962,4],[2969,2],2972,[2974,2],[2979,2],[2984,3],[2990,12],[3006,5],[3014,3],[3018,4],3024,3031,[3046,10],[3073,3],[3077,8],[3086,3],[3090,23],[3114,10],[3125,5],3133,[3134,7],[3142,3],[3146,4],[3157,2],[3160,2],[3168,4],[3174,10],[3202,2],[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3260,3261,3262,3263,[3264,5],3270,[3271,2],[3274,4],[3285,2],3294,[3296,4],[3302,10],[3330,2],[3333,8],[3342,3],[3346,23],[3370,16],3389,[3390,7],[3398,3],[3402,4],3415,[3424,4],[3430,10],[3450,6],[3458,2],[3461,18],[3482,24],[3507,9],3517,[3520,7],3530,[3535,6],3542,[3544,8],[3570,2],[3585,58],[3648,15],[3664,10],[3713,2],3716,[3719,2],3722,3725,[3732,4],[3737,7],[3745,3],3749,3751,[3754,2],[3757,13],[3771,3],[3776,5],3782,[3784,6],[3792,10],[3804,2],3840,[3864,2],[3872,10],3893,3895,3897,[3902,10],[3913,36],[3953,20],[3974,6],[3984,8],[3993,36],4038,[4096,74],[4176,78],[4256,38],[4304,43],4348,[4352,329],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],4959,[4969,9],[4992,16],[5024,85],[5121,620],[5743,17],[5761,26],[5792,75],[5870,3],[5888,13],[5902,7],[5920,21],[5952,20],[5984,13],[5998,3],[6002,2],[6016,52],6070,[6071,29],6103,6108,6109,[6112,10],[6155,3],[6160,10],[6176,88],[6272,43],[6320,70],[6400,29],[6432,12],[6448,12],[6470,40],[6512,5],[6528,44],[6576,26],[6608,11],[6656,28],[6688,63],6752,6753,6754,[6755,26],6783,[6784,10],[6800,10],6823,[6912,76],[6992,10],[7019,9],[7040,43],[7086,12],[7168,56],[7232,10],[7245,49],[7376,3],[7380,31],[7424,231],[7677,281],[7960,6],[7968,38],[8008,6],[8016,8],8025,8027,8029,[8031,31],[8064,53],[8118,7],8126,[8130,3],[8134,7],[8144,4],[8150,6],[8160,13],[8178,3],[8182,7],[8255,2],8276,8305,8319,[8336,5],[8400,13],8417,[8421,12],8450,8455,[8458,10],8469,8472,[8473,5],8484,8486,8488,[8490,16],[8508,4],[8517,5],8526,[8544,41],[11264,47],[11312,47],[11360,133],[11499,7],[11520,38],[11568,54],11631,[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],[11744,32],12293,12294,12295,[12321,15],[12337,5],[12344,5],[12353,86],[12441,2],[12445,3],[12449,90],[12540,4],[12549,41],[12593,94],[12704,24],[12784,16],[13312,6582],[19968,20940],[40960,1165],[42192,46],[42240,269],[42512,28],[42560,32],[42594,14],[42620,2],42623,[42624,24],[42656,82],[42775,9],[42786,103],[42891,2],[43003,45],[43072,52],[43136,69],[43216,10],[43232,24],43259,[43264,46],[43312,36],[43360,29],[43392,65],43471,[43472,10],[43520,55],[43584,14],[43600,10],[43616,23],43642,43643,[43648,67],[43739,3],[43968,43],44012,44013,[44016,10],[44032,11172],[55216,23],[55243,49],[63744,302],[64048,62],[64112,106],[64256,7],[64275,5],64285,64286,[64287,10],[64298,13],[64312,5],64318,[64320,2],[64323,2],[64326,108],[64467,139],[64612,218],[64848,64],[64914,54],[65008,10],[65024,16],[65056,7],[65075,2],[65101,3],65137,65139,65143,65145,65147,65149,[65151,126],[65296,10],[65313,26],65343,[65345,26],[65382,89],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],[65596,2],[65599,15],[65616,14],[65664,123],[65856,53],66045,[66176,29],[66208,49],[66304,31],[66352,27],[66432,30],[66464,36],[66504,8],[66513,5],[66560,158],[66720,10],[67584,6],67592,[67594,44],[67639,2],67644,[67647,23],[67840,22],[67872,26],68096,[68097,3],[68101,2],[68108,8],[68117,3],[68121,27],[68152,3],68159,[68192,29],[68352,54],[68416,22],[68448,19],[68608,73],[69760,59],[73728,879],[74752,99],[77824,1071],[119141,5],[119149,6],[119163,8],[119173,7],[119210,4],[119362,3],[119808,85],[119894,71],[119966,2],119970,[119973,2],[119977,4],[119982,12],119995,[119997,7],[120005,65],[120071,4],[120077,8],[120086,7],[120094,28],[120123,4],[120128,5],120134,[120138,7],[120146,340],[120488,25],[120514,25],[120540,31],[120572,25],[120598,31],[120630,25],[120656,31],[120688,25],[120714,31],[120746,25],[120772,8],[120782,50],[131072,42711],[173824,4149],[194560,542],[917760,240]]}
$B.unicode_tables={}
for(var gc in $B.unicode){$B.unicode_tables[gc]={}
$B.unicode[gc].forEach(function(item){if(Array.isArray(item)){var step=item[2]||1
for(var i=0,nb=item[1];i < nb;i+=1){$B.unicode_tables[gc][item[0]+i*step]=true}}else{$B.unicode_tables[gc][item]=true}})}
for(var key in $B.unicode_identifiers){$B.unicode_tables[key]={}
for(const item of $B.unicode_identifiers[key]){if(Array.isArray(item)){for(var i=0;i < item[1];i++){$B.unicode_tables[key][item[0]+i]=true}}else{$B.unicode_tables[key][item]=true}}}
;
;(function($B){var bltns=$B.InjectBuiltins()
eval(bltns)
var unicode_tables=$B.unicode_tables
var str={__class__:_b_.type,__dir__:object.__dir__,$infos:{__module__:"builtins",__name__:"str"},$is_class:true,$native:true}
function normalize_start_end($){if($.start===null ||$.start===_b_.None){$.start=0}
else if($.start < 0){$.start+=$.self.length
$.start=Math.max(0,$.start)}
if($.end===null ||$.end===_b_.None){$.end=$.self.length}
else if($.end < 0){$.end+=$.self.length
$.end=Math.max(0,$.end)}
if(! isinstance($.start,_b_.int)||! isinstance($.end,_b_.int)){throw _b_.TypeError.$factory("slice indices must be integers "+
"or None or have an __index__ method")}}
function reverse(s){
return s.split("").reverse().join("")}
function check_str(obj){if(! _b_.isinstance(obj,str)){throw _b_.TypeError.$factory("can't convert '"+
$B.class_name(obj)+"' object to str implicitly")}}
str.__add__=function(self,other){if(!(typeof other==="string")){try{return getattr(other,"__radd__")(self)}
catch(err){throw _b_.TypeError.$factory("Can't convert "+
$B.class_name(other)+" to str implicitly")}}
return self+other}
str.__contains__=function(self,item){if(!(typeof item=="string")){throw _b_.TypeError.$factory("'in <string>' requires "+
"string as left operand, not "+item.__class__)}
var nbcar=item.length
if(nbcar==0){return true}
if(self.length==0){return nbcar==0}
for(var i=0,len=self.length;i < len;i++){if(self.substr(i,nbcar)==item){return true}}
return false}
str.__delitem__=function(){throw _b_.TypeError.$factory("'str' object doesn't support item deletion")}
str.__dir__=object.__dir__
str.__eq__=function(self,other){if(other===undefined){
return self===str}
if(_b_.isinstance(other,_b_.str)){return other.valueOf()==self.valueOf()}
return _b_.NotImplemented}
function preformat(self,fmt){if(fmt.empty){return _b_.str.$factory(self)}
if(fmt.type && fmt.type !="s"){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'str'")}
return self}
str.__format__=function(self,format_spec){var fmt=new $B.parse_format_spec(format_spec)
if(fmt.sign !==undefined){throw _b_.ValueError.$factory(
"Sign not allowed in string format specifier")}
fmt.align=fmt.align ||"<"
return $B.format_width(preformat(self,fmt),fmt)}
str.__getitem__=function(self,arg){if(isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos+=self.length}
if(pos >=0 && pos < self.length){return self.charAt(pos)}
throw _b_.IndexError.$factory("string index out of range")}
if(isinstance(arg,slice)){var s=_b_.slice.$conv_for_seq(arg,self.length),start=s.start,stop=s.stop,step=s.step
var res="",i=null
if(step > 0){if(stop <=start){return ""}
for(var i=start;i < stop;i+=step){res+=self.charAt(i)}}else{if(stop >=start){return ''}
for(var i=start;i > stop;i+=step){res+=self.charAt(i)}}
return res}
if(isinstance(arg,_b_.bool)){return self.__getitem__(_b_.int.$factory(arg))}
throw _b_.TypeError.$factory("string indices must be integers")}
var prefix=2,suffix=3,mask=(2**32-1)
function fnv(p){if(p.length==0){return 0}
var x=prefix
x=(x ^(p.charCodeAt(0)<< 7))& mask
for(var i=0,len=p.length;i < len;i++){x=((1000003*x)^ p.charCodeAt(i))& mask}
x=(x ^ p.length)& mask
x=(x ^ suffix)& mask
if(x==-1){x=-2}
return x}
str.__hash__=function(self){return fnv(self)}
str.__init__=function(self,arg){self.valueOf=function(){return arg}
self.toString=function(){return arg}
return _b_.None}
var str_iterator=$B.make_iterator_class("str_iterator")
str.__iter__=function(self){var items=self.split("")
return str_iterator.$factory(items)}
str.__len__=function(self){return self.length}
var kwarg_key=new RegExp("([^\\)]*)\\)")
var NotANumber=function(){this.name="NotANumber"}
var number_check=function(s){if(! isinstance(s,[_b_.int,_b_.float])){throw new NotANumber()}}
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
return format_padding(repr(val),flags)}
var ascii_format=function(val,flags){flags.pad_char=" " 
return format_padding(ascii(val),flags)}
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
format_float_precision(val,upper,flags,function(val,precision){return val.toFixed(min(precision,v_len-dot_idx)+
numzeros)}),flags
)}
if(dot_idx > flags.precision){val=format_sign(val,flags)+format_float_precision(val,upper,flags,_floating_g_exp_helper)
if(! flags.alternate){var trl=trailing_zeros.exec(val)
if(trl){val=trl[1].replace(trailing_dot,"")+trl[3]}}else{if(flags.precision <=1){val=val[0]+"."+val.substring(1)}}
return format_padding(val,flags)}
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,function(val,precision){if(!flags.decimal_point){precision=min(v_len-1,6)}else if(precision > v_len){if(! flags.alternate){precision=v_len}}
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
var single_char_format=function(val,flags){if(isinstance(val,str)&& val.length==1)return val
try{val=_b_.int.$factory(val)}catch(err){throw _b_.TypeError.$factory("%c requires int or char")}
return format_padding(chr(val),flags)}
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
var char_mapping={"s":str_format,"d":num_format,"i":num_format,"u":num_format,"o":octal_format,"r":repr_format,"a":ascii_format,"g":function(val,flags){return floating_point_format(val,false,flags)},"G":function(val,flags){return floating_point_format(val,true,flags)},"f":function(val,flags){return floating_point_decimal_format(val,false,flags)},"F":function(val,flags){return floating_point_decimal_format(val,true,flags)},"e":function(val,flags){return floating_point_exponential_format(val,false,flags)},"E":function(val,flags){return floating_point_exponential_format(val,true,flags)},"x":function(val,flags){return signed_hex_format(val,false,flags)},"X":function(val,flags){return signed_hex_format(val,true,flags)},"c":single_char_format,"0":function(val,flags){return num_flag("0",flags)},"1":function(val,flags){return num_flag("1",flags)},"2":function(val,flags){return num_flag("2",flags)},"3":function(val,flags){return num_flag("3",flags)},"4":function(val,flags){return num_flag("4",flags)},"5":function(val,flags){return num_flag("5",flags)},"6":function(val,flags){return num_flag("6",flags)},"7":function(val,flags){return num_flag("7",flags)},"8":function(val,flags){return num_flag("8",flags)},"9":function(val,flags){return num_flag("9",flags)},"-":neg_flag," ":space_flag,"+":sign_flag,".":decimal_point_flag,"#":alternate_flag}
var UnsupportedChar=function(){this.name="UnsupportedChar"}
str.__mod__=function(self,args){var length=self.length,pos=0 |0,argpos=null,getitem
if(_b_.isinstance(args,_b_.tuple)){argpos=0 |0}else{getitem=_b_.getattr(args,"__getitem__",_b_.None)}
var ret=''
var $get_kwarg_string=function(s){
++pos
var rslt=kwarg_key.exec(s.substring(newpos))
if(! rslt){throw _b_.ValueError.$factory("incomplete format key")}
var key=rslt[1]
newpos+=rslt[0].length
try{var self=getitem(key)}catch(err){if(err.name==="KeyError"){throw err}
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
str.__mro__=[object]
str.__mul__=function(){var $=$B.args("__mul__",2,{self:null,other:null},["self","other"],arguments,{},null,null)
if(! isinstance($.other,_b_.int)){throw _b_.TypeError.$factory(
"Can't multiply sequence by non-int of type '"+
$B.class_name($.other)+"'")}
var $res=""
for(var i=0;i< $.other;i++){$res+=$.self.valueOf()}
return $res}
str.__ne__=function(self,other){return other !==self.valueOf()}
str.__repr__=function(self){var res=self
res=self.replace(/\\/g,"\\\\")
res=res.replace(new RegExp("\u0007","g"),"\\x07").
replace(new RegExp("\b","g"),"\\x08").
replace(new RegExp("\f","g"),"\\x0c").
replace(new RegExp("\n","g"),"\\n").
replace(new RegExp("\r","g"),"\\r").
replace(new RegExp("\t","g"),"\\t")
res=res.replace(combining_re,"\u200B$1")
if(res.search('"')==-1 && res.search("'")==-1){return "'"+res+"'"}else if(self.search('"')==-1){return '"'+res+'"'}
var qesc=new RegExp("'","g")
res="'"+res.replace(qesc,"\\'")+"'"
return res}
str.__setitem__=function(self,attr,value){throw _b_.TypeError.$factory(
"'str' object does not support item assignment")}
var combining=[]
for(var cp=0x300;cp <=0x36F;cp++){combining.push(String.fromCharCode(cp))}
var combining_re=new RegExp("("+combining.join("|")+")")
str.__str__=function(self){return self.replace(combining_re,"\u200B$1")}
str.toString=function(){return "string!"}
var $comp_func=function(self,other){if(typeof other !=="string"){return _b_.NotImplemented}
return self > other}
$comp_func+="" 
var $comps={">":"gt",">=":"ge","<":"lt","<=":"le"}
for(var $op in $comps){eval("str.__"+$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))}
$B.make_rmethods(str)
var $notimplemented=function(self,other){throw NotImplementedError.$factory(
"OPERATOR not implemented for class str")}
str.capitalize=function(self){var $=$B.args("capitalize",1,{self},["self"],arguments,{},null,null)
if(self.length==0){return ""}
return self.charAt(0).toUpperCase()+self.substr(1)}
str.casefold=function(self){var $=$B.args("casefold",1,{self},["self"],arguments,{},null,null),res="",char,cf
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
cf=$B.unicode_casefold[char]
if(cf){cf.forEach(function(cp){res+=String.fromCharCode(cp)})}else{res+=self.charAt(i).toLowerCase()}}
return res}
str.center=function(){var $=$B.args("center",3,{self:null,width:null,fillchar:null},["self","width","fillchar"],arguments,{fillchar:" "},null,null),self=$.self
if($.width <=self.length){return self}
var pad=parseInt(($.width-self.length)/2),res=$.fillchar.repeat(pad)
res+=self+res
if(res.length < $.width){res+=$.fillchar}
return res}
str.count=function(){var $=$B.args("count",4,{self:null,sub:null,start:null,stop:null},["self","sub","start","stop"],arguments,{start:null,stop:null},null,null)
if(!(typeof $.sub=="string")){throw _b_.TypeError.$factory(
"Can't convert '"+$B.class_name($.sub)+
"' object to str implicitly")}
var substr=$.self
if($.start !==null){var _slice
if($.stop !==null){_slice=_b_.slice.$factory($.start,$.stop)}
else{_slice=_b_.slice.$factory($.start,$.self.length)}
substr=str.__getitem__.apply(null,[$.self].concat(_slice))}else{if($.self.length+$.sub.length==0){return 1}}
if($.sub.length==0){if($.start==$.self.length){return 1}
else if(substr.length==0){return 0}
return substr.length+1}
var n=0,pos=0
while(pos < substr.length){pos=substr.indexOf($.sub,pos)
if(pos >=0){n++;pos+=$.sub.length}
else{break}}
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
if(! isinstance(suffixes,_b_.tuple)){suffixes=[suffixes]}
var s=$.self.substring($.start,$.end)
for(var i=0,len=suffixes.length;i < len;i++){var suffix=suffixes[i]
if(! _b_.isinstance(suffix,str)){throw _b_.TypeError.$factory(
"endswith first arg must be str or a tuple of str, not int")}
if(suffix.length <=s.length &&
s.substr(s.length-suffix.length)==suffix){return true}}
return false}
str.expandtabs=function(self,tabsize){var $=$B.args("expandtabs",2,{self:null,tabsize:null},["self","tabsize"],arguments,{tabsize:8},null,null)
var s=$B.$GetInt($.tabsize),col=0,pos=0,res=""
if(s==1){return self.replace(/\t/g," ")}
while(pos < self.length){var car=self.charAt(pos)
switch(car){case "\t":
while(col % s > 0){res+=" ";col++}
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
if(!isinstance($.start,_b_.int)||!isinstance($.end,_b_.int)){throw _b_.TypeError.$factory("slice indices must be "+
"integers or None or have an __index__ method")}
var s=""
for(var i=$.start;i < $.end;i++){s+=$.self.charAt(i)}
if($.sub.length==0 && $.start==$.self.length){return $.self.length}
if(s.length+$.sub.length==0){return-1}
var last_search=s.length-$.sub.length
for(var i=0;i <=last_search;i++){if(s.substr(i,$.sub.length)==$.sub){return $.start+i}}
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
if(nb > 0){throw ValueError.$factory("wrong format "+self)}
pos=end}else{text+=car;pos++}}
if(text){parts.push(text)}
return parts}
str.format=function(self){var $=$B.args("format",1,{self:null},["self"],arguments,{},"$args","$kw")
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
var value=_b_.dict.__getitem__($.$kw,fmt.name)}
for(var j=0;j < fmt.name_ext.length;j++){var ext=fmt.name_ext[j]
if(ext.charAt(0)=="."){
value=_b_.getattr(value,ext.substr(1))}else{
var key=ext.substr(1,ext.length-2)
if(key.charAt(0).search(/\d/)>-1){key=parseInt(key)}
value=_b_.getattr(value,"__getitem__")(key)}}
if(fmt.conv=="a"){value=_b_.ascii(value)}
else if(fmt.conv=="r"){value=_b_.repr(value)}
else if(fmt.conv=="s"){value=_b_.str.$factory(value)}
if(value.$is_class ||value.$factory){
res+=value.__class__.__format__(value,fmt.spec)}else{res+=_b_.getattr(value,"__format__")(fmt.spec)}}
return res}
str.format_map=function(self){throw NotImplementedError.$factory(
"function format_map not implemented yet")}
str.index=function(self){
var res=str.find.apply(null,arguments)
if(res===-1){throw _b_.ValueError.$factory("substring not found")}
return res}
str.isascii=function(self){
for(var i=0,len=self.length;i < len;i++){if(self.charCodeAt(i)> 127){return false}}
return true}
str.isalnum=function(self){
var $=$B.args("isalnum",1,{self:null},["self"],arguments,{},null,null),char
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(unicode_tables.Ll[char]||
unicode_tables.Lu[char]||
unicode_tables.Lm[char]||
unicode_tables.Lt[char]||
unicode_tables.Lo[char]||
unicode_tables.Nd[char]||
unicode_tables.digits[char]||
unicode_tables.numeric[char]){continue}
return false}
return true}
str.isalpha=function(self){
var $=$B.args("isalpha",1,{self:null},["self"],arguments,{},null,null),char
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(unicode_tables.Ll[char]||
unicode_tables.Lu[char]||
unicode_tables.Lm[char]||
unicode_tables.Lt[char]||
unicode_tables.Lo[char]){continue}
return false}
return true}
str.isdecimal=function(self){
var $=$B.args("isdecimal",1,{self:null},["self"],arguments,{},null,null),char
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(! unicode_tables.Nd[char]){return false}}
return self.length > 0}
str.isdigit=function(self){
var $=$B.args("isdigit",1,{self:null},["self"],arguments,{},null,null),char
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(! unicode_tables.digits[char]){return false}}
return self.length > 0}
str.isidentifier=function(self){
var $=$B.args("isidentifier",1,{self:null},["self"],arguments,{},null,null),char
if(self.length==0){return false}
else if(unicode_tables.XID_Start[self.charCodeAt(0)]===undefined){return false}else{for(var i=1,len=self.length;i < len;i++){if(unicode_tables.XID_Continue[self.charCodeAt(i)]===undefined){return false}}}
return true}
str.islower=function(self){
var $=$B.args("islower",1,{self:null},["self"],arguments,{},null,null),has_cased=false,char
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(unicode_tables.Ll[char]){has_cased=true;continue}
else if(unicode_tables.Lu[char]||unicode_tables.Lt[char]){return false}}
return has_cased}
str.isnumeric=function(self){
var $=$B.args("isnumeric",1,{self:null},["self"],arguments,{},null,null)
for(var i=0,len=self.length;i < len;i++){if(! unicode_tables.numeric[self.charCodeAt(i)]){return false}}
return self.length > 0}
var printable,printable_gc=['Cc','Cf','Co','Cs','Zl','Zp','Zs']
str.isprintable=function(self){
if(printable===undefined){for(var i=0;i < printable_gc.length;i++){var table=unicode_tables[printable_gc[i]]
for(var cp in table){printable[cp]=true}}
printable[32]=true}
var $=$B.args("isprintable",1,{self:null},["self"],arguments,{},null,null),char,flag
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(! printable[char]){return false}}
return true}
str.isspace=function(self){
var $=$B.args("isspace",1,{self:null},["self"],arguments,{},null,null),char
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(! unicode_tables.Zs[char]&&
$B.unicode_bidi_whitespace.indexOf(char)==-1){return false}}
return self.length > 0}
str.istitle=function(self){
var $=$B.args("istitle",1,{self:null},["self"],arguments,{},null,null)
return self.length > 0 && str.title(self)==self}
str.isupper=function(self){
var $=$B.args("islower",1,{self:null},["self"],arguments,{},null,null),has_cased=false,char
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(unicode_tables.Lu[char]){has_cased=true;continue}
else if(unicode_tables.Ll[char]||unicode_tables.Lt[char]){return false}}
return has_cased}
str.join=function(){var $=$B.args("join",2,{self:null,iterable:null},["self","iterable"],arguments,{},null,null)
var iterable=_b_.iter($.iterable),res=[],count=0
while(1){try{var obj2=_b_.next(iterable)
if(! isinstance(obj2,str)){throw _b_.TypeError.$factory(
"sequence item "+count+": expected str instance, "+
$B.class_name(obj2)+" found")}
res.push(obj2)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
else{throw err}}}
return res.join($.self)}
str.ljust=function(self){var $=$B.args("ljust",3,{self:null,width:null,fillchar:null},["self","width","fillchar"],arguments,{fillchar:" "},null,null)
if($.width <=self.length){return self}
return self+$.fillchar.repeat($.width-self.length)}
str.lower=function(self){var $=$B.args("lower",1,{self:null},["self"],arguments,{},null,null)
return self.toLowerCase()}
str.lstrip=function(self,x){var $=$B.args("lstrip",2,{self:null,chars:null},["self","chars"],arguments,{chars:_b_.None},null,null)
if($.chars===_b_.None){return $.self.trimLeft()}
for(var i=0;i < $.self.length;i++){if($.chars.indexOf($.self.charAt(i))===-1){return $.self.substring(i)}}
return ""}
str.maketrans=function(){var $=$B.args("maketrans",3,{x:null,y:null,z:null},["x","y","z"],arguments,{y:null,z:null},null,null)
var _t=_b_.dict.$factory()
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
var i=$.self.indexOf($.sep)
if(i==-1){return _b_.tuple.$factory([$.self,"",""])}
return _b_.tuple.$factory([$.self.substring(0,i),$.sep,$.self.substring(i+$.sep.length)])}
function $re_escape(str){var specials="[.*+?|()$^"
for(var i=0,len=specials.length;i < len;i++){var re=new RegExp("\\"+specials.charAt(i),"g")
str=str.replace(re,"\\"+specials.charAt(i))}
return str}
str.replace=function(self,old,_new,count){
var $=$B.args("replace",4,{self:null,old:null,$$new:null,count:null},["self","old","$$new","count"],arguments,{count:-1},null,null),count=$.count,self=$.self,old=$.old,_new=$.$$new
check_str(old)
check_str(_new)
if(! isinstance(count,[_b_.int,_b_.float])){throw _b_.TypeError.$factory("'"+$B.class_name(count)+
"' object cannot be interpreted as an integer")}else if(isinstance(count,_b_.float)){throw _b_.TypeError.$factory("integer argument expected, got float")}
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
if($.sub.length==0){if($.start > $.self.length){return-1}
else{return $.self.length}}
var sublen=$.sub.length
for(var i=$.end-sublen;i >=$.start;i--){if($.self.substr(i,sublen)==$.sub){return i}}
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
for(var j=$.self.length-1;j >=0;j--){if($.chars.indexOf($.self.charAt(j))==-1){return $.self.substring(0,j+1)}}
return ""}
str.split=function(){var $=$B.args("split",3,{self:null,sep:null,maxsplit:null},["self","sep","maxsplit"],arguments,{sep:_b_.None,maxsplit:-1},null,null),sep=$.sep,maxsplit=$.maxsplit,self=$.self,pos=0
if(maxsplit.__class__===$B.long_int){maxsplit=parseInt(maxsplit.value)}
if(sep==""){throw _b_.ValueError.$factory("empty separator")}
if(sep===_b_.None){var res=[]
while(pos < self.length && self.charAt(pos).search(/\s/)>-1){pos++}
if(pos===self.length-1){return[self]}
var name=""
while(1){if(self.charAt(pos).search(/\s/)==-1){if(name==""){name=self.charAt(pos)}
else{name+=self.charAt(pos)}}else{if(name !==""){res.push(name)
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
str.splitlines=function(self){var $=$B.args("splitlines",2,{self:null,keepends:null},["self","keepends"],arguments,{keepends:false},null,null)
if(! _b_.isinstance($.keepends,[_b_.bool,_b_.int])){throw _b_.TypeError.$factory("integer argument expected, got "+
$B.get_class($.keepends).__name)}
var keepends=_b_.int.$factory($.keepends)
if(keepends){var res=[],start=pos,pos=0,self=$.self
while(pos < self.length){if(self.substr(pos,2)=="\r\n"){res.push(self.substring(start,pos+2))
start=pos+2
pos=start}else if(self.charAt(pos)=="\r" ||self.charAt(pos)=="\n"){res.push(self.substring(start,pos+1))
start=pos+1
pos=start}else{pos++}}
var rest=self.substr(start)
if(rest){res.push(rest)}
return res}else{var self=$.self.replace(/[\r\n]$/,"")
return self.split(/\n|\r\n|\r/)}}
str.startswith=function(){
var $=$B.args("startswith",4,{self:null,prefix:null,start:null,end:null},["self","prefix","start","end"],arguments,{start:0,end:null},null,null)
normalize_start_end($)
var prefixes=$.prefix
if(! isinstance(prefixes,_b_.tuple)){prefixes=[prefixes]}
var s=$.self.substring($.start,$.end)
for(var i=0,len=prefixes.length;i < len;i++){var prefix=prefixes[i]
if(! _b_.isinstance(prefix,str)){throw _b_.TypeError.$factory(
"endswith first arg must be str or a tuple of str, not int")}
if(s.substr(0,prefix.length)==prefix){return true}}
return false}
str.strip=function(){var $=$B.args("strip",2,{self:null,chars:null},["self","chars"],arguments,{chars:_b_.None},null,null)
if($.chars===_b_.None){return $.self.trim()}
for(var i=0;i < $.self.length;i++){if($.chars.indexOf($.self.charAt(i))==-1){break}}
for(var j=$.self.length-1;j >=i;j--){if($.chars.indexOf($.self.charAt(j))==-1){break}}
return $.self.substring(i,j+1)}
str.swapcase=function(self){var $=$B.args("swapcase",1,{self},["self"],arguments,{},null,null),res="",char
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(unicode_tables.Ll[char]){res+=self.charAt(i).toUpperCase()}else if(unicode_tables.Lu[char]){res+=self.charAt(i).toLowerCase()}else{res+=self.charAt(i)}}
return res}
str.title=function(self){var $=$B.args("title",1,{self},["self"],arguments,{},null,null),state,char,res=""
for(var i=0,len=self.length;i < len;i++){char=self.charCodeAt(i)
if(unicode_tables.Ll[char]){if(! state){res+=self.charAt(i).toUpperCase()
state="word"}else{res+=self.charAt(i)}}else if(unicode_tables.Lu[char]||unicode_tables.Lt[char]){res+=state ? self.charAt(i).toLowerCase():self.charAt(i)
state="word"}else{state=null
res+=self.charAt(i)}}
return res}
str.translate=function(self,table){var res=[],getitem=$B.$getattr(table,"__getitem__")
for(var i=0,len=self.length;i < len;i++){try{var repl=getitem(self.charCodeAt(i))
if(repl !==_b_.None){res.push(String.fromCharCode(repl))}}catch(err){res.push(self.charAt(i))}}
return res.join("")}
str.upper=function(self){var $=$B.args("upper",1,{self:null},["self"],arguments,{},null,null)
return self.toUpperCase()}
str.zfill=function(self,width){var $=$B.args("zfill",2,{self:null,width:null},["self","width"],arguments,{},null,null)
if($.width <=self.length){return self}
switch(self.charAt(0)){case "+":
case "-":
return self.charAt(0)+
"0".repeat($.width-self.length)+self.substr(1)
default:
return "0".repeat(width-self.length)+self}}
str.$factory=function(arg,encoding,errors){if(arguments.length==0){return ""}
if(arg===undefined){throw _b_.TypeError.$factory("str() argument is undefined")}
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
var StringSubclass=$B.StringSubclass={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"str"},$is_class:true}
for(var $attr in str){if(typeof str[$attr]=="function"){StringSubclass[$attr]=(function(attr){return function(){var args=[],pos=0
if(arguments.length > 0){var args=[arguments[0].valueOf()],pos=1
for(var i=1,len=arguments.length;i < len;i++){args[pos++]=arguments[i]}}
return str[attr].apply(null,args)}})($attr)}}
StringSubclass.__new__=function(cls){return{__class__:cls}}
$B.set_func_names(StringSubclass,"builtins")
_b_.str=str
$B.parse_format_spec=function(spec){if(spec==""){this.empty=true}
else{var pos=0,aligns="<>=^",digits="0123456789",types="bcdeEfFgGnosxX%",align_pos=aligns.indexOf(spec.charAt(0))
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
while(car && digits.indexOf(car)>-1){if(this.width===undefined){this.width=car}
else{this.width+=car}
pos++
car=spec.charAt(pos)}
if(this.width !==undefined){this.width=parseInt(this.width)}
if(this.width===undefined && car=="{"){
var end_param_pos=spec.substr(pos).search("}")
this.width=spec.substring(pos,end_param_pos)
console.log("width","["+this.width+"]")
pos+=end_param_pos+1}
if(car==","){this.comma=true;pos++;car=spec.charAt(pos)}
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
$B.parse_fstring=function(string){
var elts=[],pos=0,current="",ctype=null,nb_braces=0,car
while(pos < string.length){if(ctype===null){car=string.charAt(pos)
if(car=="{"){if(string.charAt(pos+1)=="{"){ctype="string"
current="{"
pos+=2}else{ctype="expression"
nb_braces=1
pos++}}else if(car=="}"){if(string.charAt(pos+1)==car){ctype="string"
current="}"
pos+=2}else{throw Error(" f-string: single '}' is not allowed")}}else{ctype="string"
current=car
pos++}}else if(ctype=="string"){
var i=pos
while(i < string.length){car=string.charAt(i)
if(car=="{"){if(string.charAt(i+1)=="{"){current+="{"
i+=2}else{elts.push(current)
ctype="expression"
pos=i+1
break}}else if(car=="}"){if(string.charAt(i+1)==car){current+=car
i+=2}else{throw Error(" f-string: single '}' is not allowed")}}else{current+=car
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
if(end==-1){throw Error("f-string: unterminated string")}else{var trs=string.substring(i,end+3)
trs=trs.replace("\n","\\n\\")
current.expression+=trs
i=end+3}}else{var end=string.indexOf('"',i+1)
if(end==-1){throw Error("f-string: unterminated string")}else{current.expression+=string.substring(i,end+1)
i=end+1}}}else if(nb_paren==0 && car==":"){current.fmt=true
current.expression+=car
i++}else if(car=="="){
var ce=current.expression
if(ce.length==0 ||
"=!<>:".search(ce.charAt(ce.length-1))>-1){current.expression+=car
i++}else{
tail=car
while(string.charAt(i+1).match(/\s/)){tail+=string.charAt(i+1)
i++}
elts.push(current.expression+tail)
while(ce.match(/\s$/)){ce=ce.substr(0,ce.length-1)}
current.expression=ce
ctype="debug"
i++}}else{current.expression+=car
i++}}
if(nb_braces > 0){throw Error("f-string: expected '}'")}}}
if(current.length > 0){elts.push(current)}
return elts}})(__BRYTHON__)
;
;(function($B){var bltns=$B.InjectBuiltins()
eval(bltns)
var object=_b_.object,str_hash=_b_.str.__hash__,$N=_b_.None
var set_ops=["eq","add","sub","and","or","xor","le","lt","ge","gt"]
$B.make_view=function(name,set_like){var klass=$B.make_class(name,function(items){return{
__class__:klass,__dict__:_b_.dict.$factory(),counter:-1,items:items,len:items.length}})
if(set_like){for(var i=0,len=set_ops.length;i < len;i++){var op="__"+set_ops[i]+"__"
klass[op]=(function(op){return function(self,other){
return _b_.set[op](_b_.set.$factory(self),_b_.set.$factory(other))}})(op)}}
klass.__iter__=function(self){var it=klass.$iterator.$factory(self.items)
it.len_func=self.len_func
return it}
klass.__repr__=function(self){return klass.$infos.__name__+'('+_b_.repr(self.items)+')'}
$B.set_func_names(klass,"builtins")
return klass}
function dict_iterator_next(self){if(self.len_func()!=self.len){throw RuntimeError.$factory("dictionary changed size during iteration")}
self.counter++
if(self.counter < self.items.length){return self.items[self.counter]}
throw _b_.StopIteration.$factory("StopIteration")}
var dict={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"dict"},$is_class:true,$native:true}
function to_list(d,ix){var items=[],item
if(d.$jsobj){items=[]
for(var attr in d.$jsobj){if(attr.charAt(0)!="$"){var val=d.$jsobj[attr]
if(val===undefined){val=_b_.NotImplemented}
else if(val===null){val=$N}
items.push([attr,val])}}}else{for(var k in d.$numeric_dict){items.push([parseFloat(k),d.$numeric_dict[k]])}
for(var k in d.$string_dict){items.push([k,d.$string_dict[k]])}
for(var k in d.$object_dict){d.$object_dict[k].forEach(function(item){items.push(item)})}}
if(ix !==undefined){return items.map(function(item){return item[ix]})}else{items.__class__=_b_.tuple
return items.map(function(item){item.__class__=_b_.tuple;return item}
)}}
$B.dict_to_list=to_list 
function dict_iterator_next(self){if(self.len_func()!=self.len){throw RuntimeError.$factory("dictionary changed size during iteration")}
self.counter++
if(self.counter < self.items.length){return self.items[self.counter]}
throw _b_.StopIteration.$factory("StopIteration")}
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
if(self.$jsobj){if(self.$jsobj[arg]===undefined){throw KeyError.$factory(arg)}
delete self.$jsobj[arg]
return $N}
switch(typeof arg){case "string":
if(self.$string_dict[arg]===undefined){throw KeyError.$factory(_b_.str.$factory(arg))}
delete self.$string_dict[arg]
delete self.$str_hash[str_hash(arg)]
self.$version++
return $N
case "number":
if(self.$numeric_dict[arg]===undefined){throw KeyError.$factory(_b_.str.$factory(arg))}
delete self.$numeric_dict[arg]
self.$version++
return $N}
var hash=_b_.hash(arg),ix
if((ix=rank(self,hash,arg))>-1){self.$object_dict[hash].splice(ix,1)}else{throw KeyError.$factory(_b_.str.$factory(arg))}
self.$version++
return $N}
dict.__eq__=function(){var $=$B.args("__eq__",2,{self:null,other:null},["self","other"],arguments,{},null,null),self=$.self,other=$.other
if(! isinstance(other,dict)){return false}
if(self.$jsobj){self=jsobj2dict(self.$jsobj)}
if(other.$jsobj){other=jsobj2dict(other.$jsobj)}
if(dict.__len__(self)!=dict.__len__(other)){return false}
if(self.$string_dict.length !=other.$string_dict.length){return false}
for(var k in self.$numeric_dict){if(other.$numeric_dict.hasOwnProperty(k)){if(!$B.rich_comp("__eq__",other.$numeric_dict[k],self.$numeric_dict[k])){return false}}else if(other.$object_dict.hasOwnProperty(k)){var pairs=other.$object_dict[k],flag=false
for(var i=0,len=pairs.length;i < len;i++){if($B.rich_comp("__eq__",k,pairs[i][0])&&
$B.rich_comp("__eq__",self.$numeric_dict[k],pairs[i][1])){flag=true
break}}
if(! flag){return false}}else{return false}}
for(var k in self.$string_dict){if(!other.$string_dict.hasOwnProperty(k)||
!$B.rich_comp("__eq__",other.$string_dict[k],self.$string_dict[k])){return false}}
for(var hash in self.$object_dict){var pairs=self.$object_dict[hash]
var other_pairs=[]
if(other.$numeric_dict[hash]!==undefined){other_pairs.push([hash,other.$numeric_dict[hash]])}
if(other.$object_dict[hash]!==undefined){other_pairs=other_pairs.concat(other.$object_dict[hash])}
if(other_pairs.length==0){return false}
for(var i=0,len_i=pairs.length;i < len_i;i++){var flag=false
var key=pairs[i][0],value=pairs[i][1]
for(var j=0,len_j=other_pairs.length;j < len_j;j++){if($B.rich_comp("__eq__",key,other_pairs[j][0])&&
$B.rich_comp("__eq__",value,other_pairs[j][1])){flag=true
break}}
if(! flag){return false}}}
return true}
dict.__getitem__=function(){var $=$B.args("__getitem__",2,{self:null,arg:null},["self","arg"],arguments,{},null,null),self=$.self,arg=$.arg
if(self.$jsobj){if(!self.$jsobj.hasOwnProperty(arg)){throw _b_.KeyError.$factory(str.$factory(arg))}else if(self.$jsobj[arg]===undefined){return _b_.NotImplemented}else if(self.$jsobj[arg]===null){return $N}
return self.$jsobj[arg]}
switch(typeof arg){case "string":
if(self.$string_dict[arg]!==undefined){return self.$string_dict[arg]}
break
case "number":
if(self.$numeric_dict[arg]!==undefined){return self.$numeric_dict[arg]}
break}
var hash=_b_.hash(arg),_eq=function(other){return $B.rich_comp("__eq__",arg,other)}
if(typeof arg=="object"){arg.$hash=hash }
var sk=self.$str_hash[hash]
if(sk !==undefined && _eq(sk)){return self.$string_dict[sk]}
if(self.$numeric_dict[hash]!==undefined && _eq(hash)){return self.$numeric_dict[hash]}
if(isinstance(arg,_b_.str)){
var res=self.$string_dict[arg.valueOf()]
if(res !==undefined){return res}}
var ix=rank(self,hash,arg)
if(ix >-1){return self.$object_dict[hash][ix][1]}
if(self.__class__ !==dict){try{var missing_method=getattr(self.__class__,"__missing__",_b_.None)}catch(err){console.log(err)}
if(missing_method !==_b_.None){return missing_method(self,arg)}}
throw KeyError.$factory(arg)}
dict.__hash__=_b_.None
function init_from_list(self,args){var i=-1,stop=args.length-1,si=dict.__setitem__
while(i++< stop){var item=args[i]
switch(typeof item[0]){case 'string':
self.$string_dict[item[0]]=item[1]
self.$str_hash[str_hash(item[0])]=item[0]
break
case 'number':
self.$numeric_dict[item[0]]=item[1]
break
default:
si(self,item[0],item[1])
break}}}
dict.__init__=function(self,first,second){var $
if(first===undefined){return $N}
if(second===undefined){if(first.__class__===$B.JSObject){self.$jsobj=first.js
return $N}else if(first.$jsobj){self.$jsobj={}
for(var attr in first.$jsobj){self.$jsobj[attr]=first.$jsobj[attr]}
return $N}else if(Array.isArray(first)){init_from_list(self,first)
return $N}}
$=$ ||$B.args("dict",1,{self:null},["self"],arguments,{},"first","second")
var args=$.first
if(args.length > 1){throw _b_.TypeError.$factory("dict expected at most 1 argument"+
", got 2")}else if(args.length==1){args=args[0]
if(args.__class__===dict){['$string_dict','$str_hash','$numeric_dict','$object_dict'].
forEach(function(d){for(key in args[d]){self[d][key]=args[d][key]}})}else if(isinstance(args,dict)){$copy_dict(self,args)}else{var keys=$B.$getattr(args,"keys",null)
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
self.$string_dict[attr]=kw[attr]
self.$str_hash[str_hash(attr)]=attr
break
case "number":
self.$numeric_dict[attr]=kw[attr]
break
default:
si(self,attr,kw[attr])
break}}
return $N}
dict.__iter__=function(self){return _b_.iter(dict.$$keys(self))}
dict.__len__=function(self){var _count=0
if(self.$jsobj){for(var attr in self.$jsobj){if(attr.charAt(0)!="$"){_count++}}
return _count}
for(var k in self.$numeric_dict){_count++}
for(var k in self.$string_dict){_count++}
for(var hash in self.$object_dict){_count+=self.$object_dict[hash].length}
return _count}
dict.__ne__=function(self,other){return ! dict.__eq__(self,other)}
dict.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory("int.__new__(): not enough arguments")}
var instance={__class__:cls,$numeric_dict :{},$object_dict :{},$string_dict :{},$str_hash:{},$version:0}
if(cls !==dict){instance.__dict__=_b_.dict.$factory()}
return instance}
dict.__repr__=function(self){if(self.$jsobj){
return dict.__repr__(jsobj2dict(self.$jsobj))}
var res=[],items=to_list(self)
items.forEach(function(item){if((!self.$jsobj && item[1]===self)||
(self.$jsobj && item[1]===self.$jsobj)){res.push(repr(item[0])+": {...}")}else{res.push(repr(item[0])+": "+repr(item[1]))}})
return "{"+res.join(", ")+"}"}
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
self.$string_dict[key]=value
self.$str_hash[str_hash(key)]=key
self.$version++
return $N
case "number":
self.$numeric_dict[key]=value
self.$version++
return $N}
var hash=$hash===undefined ? _b_.hash(key):$hash,_eq=function(other){return $B.rich_comp("__eq__",key,other)}
if(self.$numeric_dict[hash]!==undefined && _eq(hash)){self.$numeric_dict[hash]=value
self.$version++
return $N}
var sk=self.$str_hash[hash]
if(sk !==undefined && _eq(sk)){self.$string_dict[sk]=value
self.$version++
return $N}
if($hash){if(self.$object_dict[$hash]!==undefined){self.$object_dict[$hash].push([key,value])}else{self.$object_dict[$hash]=[[key,value]]}
self.$version++
return $N}
var ix=rank(self,hash,key)
if(ix >-1){
self.$object_dict[hash][ix][1]=value
return $N}else if(self.$object_dict.hasOwnProperty(hash)){self.$object_dict[hash].push([key,value])}else{self.$object_dict[hash]=[[key,value]]}
self.$version++
return $N}
dict.__str__=function(){return dict.__repr__.apply(null,arguments)}
$B.make_rmethods(dict)
dict.clear=function(){
var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null),self=$.self
self.$numeric_dict={}
self.$string_dict={}
self.$str_hash={}
self.$object_dict={}
if(self.$jsobj){for(var attr in self.$jsobj){if(attr.charAt(0)!=="$" && attr !=="__class__"){delete self.$jsobj[attr]}}}
self.$version++
return $N}
dict.copy=function(self){
var $=$B.args("copy",1,{self:null},["self"],arguments,{},null,null),self=$.self,res=_b_.dict.$factory()
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
var it=dict_items.$factory(to_list(self))
it.len_func=function(){return dict.__len__(self)}
return it}
var dict_keys=$B.make_view("dict_keys",true)
dict_keys.$iterator=$B.make_iterator_class("dict_keyiterator")
dict.$$keys=function(self){if(arguments.length > 1){var _len=arguments.length-1,_msg="keys() takes no arguments ("+_len+" given)"
throw _b_.TypeError.$factory(_msg)}
var it=dict_keys.$factory(to_list(self,0))
it.len_func=function(){return dict.__len__(self)}
return it}
dict.pop=function(){var missing={},$=$B.args("pop",3,{self:null,key:null,_default:null},["self","key","_default"],arguments,{_default:missing},null,null),self=$.self,key=$.key,_default=$._default
try{var res=dict.__getitem__(self,key)
dict.__delitem__(self,key)
return res}catch(err){if(err.__class__===_b_.KeyError){if(_default !==missing){return _default}
throw err}
throw err}}
dict.popitem=function(self){try{var itm=_b_.next(_b_.iter(dict.items(self)))
dict.__delitem__(self,itm[0])
return _b_.tuple.$factory(itm)}catch(err){if(err.__class__==_b_.StopIteration){throw KeyError.$factory("'popitem(): dictionary is empty'")}}}
dict.setdefault=function(){var $=$B.args("setdefault",3,{self:null,key:null,_default:null},["self","key","_default"],arguments,{_default:$N},null,null),self=$.self,key=$.key,_default=$._default
try{return dict.__getitem__(self,key)}
catch(err){if(err.__class__ !==_b_.KeyError){throw err}
if(_default===undefined){_default=$N}
var hash=key.$hash
key.$hash=undefined
dict.$setitem(self,key,_default,hash)
return _default}}
dict.update=function(self){var $=$B.args("update",1,{"self":null},["self"],arguments,{},"args","kw"),self=$.self,args=$.args,kw=$.kw
if(args.length > 0){var o=args[0]
if(isinstance(o,dict)){if(o.$jsobj){o=jsobj2dict(o.$jsobj)}
$copy_dict(self,o)}else if(hasattr(o,"keys")){var _keys=_b_.list.$factory($B.$call($B.$getattr(o,"keys"))())
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
var it=dict_values.$factory(to_list(self,1))
it.len_func=function(){return dict.__len__(self)}
return it}
dict.$factory=function(){var res=dict.__new__(dict)
var args=[res]
for(var i=0,len=arguments.length;i < len ;i++){args.push(arguments[i])}
dict.__init__.apply(null,args)
return res}
_b_.dict=dict
$B.set_func_names(dict,"builtins")
dict.fromkeys=_b_.classmethod.$factory(dict.fromkeys)
var mappingproxy=$B.mappingproxy=$B.make_class("mappingproxy",function(obj){if(_b_.isinstance(obj,dict)){
var res=$B.obj_dict(obj.$string_dict)}else{var res=$B.obj_dict(obj)}
res.__class__=mappingproxy
return res}
)
mappingproxy.__setitem__=function(){throw _b_.TypeError.$factory("'mappingproxy' object does not support "+
"item assignment")}
for(var attr in dict){if(mappingproxy[attr]!==undefined ||
["__class__","__mro__","__new__","__init__","__delitem__","clear","fromkeys","pop","popitem","setdefault","update"].indexOf(attr)>-1){continue}
if(typeof dict[attr]=="function"){mappingproxy[attr]=(function(key){return function(){return dict[key].apply(null,arguments)}})(attr)}else{mappingproxy[attr]=dict[attr]}}
$B.set_func_names(mappingproxy,"builtins")
function jsobj2dict(x){var d=dict.$factory()
for(var attr in x){if(attr.charAt(0)!="$" && attr !=="__class__"){if(x[attr]===undefined){continue}else if(x[attr].$jsobj===x){d.$string_dict[attr]=d}else{d.$string_dict[attr]=x[attr]}}}
return d}
$B.obj_dict=function(obj,from_js){var klass=obj.__class__ ||$B.get_class(obj)
if(klass !==undefined && klass.$native){throw _b_.AttributeError.$factory(klass.__name__+
" has no attribute '__dict__'")}
var res=dict.$factory()
res.$jsobj=obj
res.$from_js=from_js 
return res}})(__BRYTHON__)
;
;(function($B){
var _b_=$B.builtins;
var object=_b_.object
var JSObject=$B.JSObject
var _window=self;
function $getMouseOffset(target,ev){ev=ev ||_window.event;
var docPos=$getPosition(target);
var mousePos=$mouseCoords(ev);
return{x:mousePos.x-docPos.x,y:mousePos.y-docPos.y};}
function $getPosition(e){var left=0,top=0,width=e.width ||e.offsetWidth,height=e.height ||e.offsetHeight
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
function $mouseCoords(ev){var posx=0,posy=0
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
Attributes.get=function(){var $=$B.args("get",3,{self:null,key:null,deflt:null},["self","key","deflt"],arguments,{deflt:_b_.None},null,null)
try{return Attributes.__getitem__($.self,$.key)}catch(err){if(err.__class__===_b_.KeyError){return $B.deflt}else{throw err}}}
Attributes.keys=function(){return Attributes.__iter__.apply(null,arguments)}
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
if(self.dataTransfer !==undefined){return Clipboard.$factory(self.dataTransfer)}
return self['data']
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
__class__ :Clipboard,__dict__:_b_.dict.$factory(),data :data}}
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
if(fromtag===undefined){if(DOMNode.tags !==undefined){
var tdict=DOMNode.tags.$string_dict
if(tdict !==undefined){var klass=tdict[elt.tagName]
if(klass !==undefined){
klass.$elt_wrap=elt 
return klass.$factory()}}}}
if(elt["$brython_id"]===undefined ||elt.nodeType==9){
elt.$brython_id="DOM-"+$B.UUID()}
return{
__class__:DOMNode,elt:elt}}
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
if(self.elt.nodeType==9 && typeof key=="string"){return document.getElementById(key)!==null}
key=key.elt !==undefined ? key.elt :key
if(self.elt.length !==undefined && typeof self.elt.item=="function"){for(var i=0,len=self.elt.length;i < len;i++){if(self.elt.item(i)===key){return true}}}
return false}
DOMNode.__del__=function(self){
if(!self.elt.parentNode){throw _b_.ValueError.$factory("can't delete "+_b_.str.$factory(self.elt))}
self.elt.parentNode.removeChild(self.elt)}
DOMNode.__delitem__=function(self,key){if(self.elt.nodeType==9){
var res=self.elt.getElementById(key)
if(res){res.parentNode.removeChild(res)}
else{throw _b_.KeyError.$factory(key)}}else{
self.elt.parentNode.removeChild(self.elt)}}
DOMNode.__dir__=function(self){var res=[]
for(var attr in self.elt){if(attr.charAt(0)!="$"){res.push(attr)}}
for(var attr in DOMNode){if(attr.charAt(0)!="$" && res.indexOf(attr)==-1){res.push(attr)}}
return res}
DOMNode.__eq__=function(self,other){return self.elt==other.elt}
DOMNode.__getattribute__=function(self,attr){if(attr.substr(0,2)=="$$"){attr=attr.substr(2)}
switch(attr){case "attrs":
return Attributes.$factory(self.elt)
case "class_name":
case "html":
case "id":
case "parent":
case "query":
case "text":
return DOMNode[attr](self)
case "height":
case "left":
case "top":
case "width":
if(self.elt.tagName=="CANVAS" && self.elt[attr]){return self.elt[attr]}
if(self.elt instanceof SVGElement){return self.elt[attr].baseVal.value}
if(self.elt.style[attr]){return parseInt(self.elt.style[attr])}else{throw _b_.AttributeError.$factory("style."+attr+
" is not set for "+_b_.str.$factory(self))}
case "clear":
case "closest":
return function(){return DOMNode[attr](self,arguments[0])}
case "headers":
if(self.elt.nodeType==9){
var req=new XMLHttpRequest();
req.open("GET",document.location,false)
req.send(null);
var headers=req.getAllResponseHeaders()
headers=headers.split("\r\n")
var res=_b_.dict.$factory()
for(var i=0;i < headers.length;i++){var header=headers[i]
if(header.strip().length==0){continue}
var pos=header.search(":")
res.__setitem__(header.substr(0,pos),header.substr(pos+1).lstrip())}
return res}
break
case "$$location":
attr="location"
break}
if(attr=="select" && self.elt.nodeType==1 &&
["INPUT","TEXTAREA"].indexOf(self.elt.tagName.toUpperCase())>-1){return function(selector){if(selector===undefined){self.elt.select();return _b_.None}
return DOMNode.select(self,selector)}}
var property=self.elt[attr]
if(property===undefined && $B.aliased_names[attr]){property=self.elt["$$"+attr]}
if(property===undefined){return object.__getattribute__(self,attr)}
var res=property
if(res !==undefined){if(res===null){return _b_.None}
if(typeof res==="function"){
var func=(function(f,elt){return function(){var args=[],pos=0
for(var i=0;i < arguments.length;i++){var arg=arguments[i]
if(typeof arg=="function"){
if(arg.$cache){var f1=arg.$cache}else{var f1=function(dest_fn){return function(){try{return dest_fn.apply(null,arguments)}catch(err){$B.handle_error(err)}}}(arg)
arg.$cache=f1}
args[pos++]=f1}
else if(_b_.isinstance(arg,JSObject)){args[pos++]=arg.js}else if(_b_.isinstance(arg,DOMNode)){args[pos++]=arg.elt}else if(arg===_b_.None){args[pos++]=null}else if(arg.__class__==_b_.dict){args[pos++]=arg.$string_dict}else{args[pos++]=arg}}
var result=f.apply(elt,args)
return $B.$JS2Py(result)}})(res,self.elt)
func.$infos={__name__ :attr}
func.$is_func=true
return func}
if(attr=='options'){return Options.$factory(self.elt)}
if(attr=='style'){return $B.JSObject.$factory(self.elt[attr])}
if(Array.isArray(res)){return res}
return $B.$JS2Py(res)}
return object.__getattribute__(self,attr)}
DOMNode.__getitem__=function(self,key){if(self.elt.nodeType==9){
if(typeof key=="string"){var res=self.elt.getElementById(key)
if(res){return DOMNode.$factory(res)}
throw _b_.KeyError.$factory(key)}else{try{var elts=self.elt.getElementsByTagName(key.$infos.__name__),res=[]
for(var i=0;i < elts.length;i++){res.push(DOMNode.$factory(elts[i]))}
return res}catch(err){throw _b_.KeyError.$factory(_b_.str.$factory(key))}}}else{if((typeof key=="number" ||typeof key=="boolean")&&
typeof self.elt.item=="function"){var key_to_int=_b_.int.$factory(key)
if(key_to_int < 0){key_to_int+=self.elt.length}
var res=DOMNode.$factory(self.elt.item(key_to_int))
if(res===undefined){throw _b_.KeyError.$factory(key)}
return res}else if(typeof key=="string" &&
self.elt.attributes &&
typeof self.elt.attributes.getNamedItem=="function"){var attr=self.elt.attributes.getNamedItem(key)
if(!!attr){return attr.value}
throw _b_.KeyError.$factory(key)}}}
DOMNode.__hash__=function(self){return self.__hashvalue__===undefined ?
(self.__hashvalue__=$B.$py_next_hash--):
self.__hashvalue__}
DOMNode.__iter__=function(self){
if(self.elt.length !==undefined && typeof self.elt.item=="function"){var items=[]
for(var i=0,len=self.elt.length;i < len;i++){items.push(DOMNode.$factory(self.elt.item(i)))}}else if(self.elt.childNodes !==undefined){var items=[]
for(var i=0,len=self.elt.childNodes.length;i < len;i++){items.push(DOMNode.$factory(self.elt.childNodes[i]))}}
return $B.$iter(items)}
DOMNode.__le__=function(self,other){
var elt=self.elt
if(self.elt.nodeType==9){elt=self.elt.body}
if(_b_.isinstance(other,TagSum)){for(var i=0;i < other.children.length;i++){elt.appendChild(other.children[i].elt)}}else if(typeof other=="string" ||typeof other=="number"){var $txt=document.createTextNode(other.toString())
elt.appendChild($txt)}else if(_b_.isinstance(other,DOMNode)){
elt.appendChild(other.elt)}else{try{
var items=_b_.list.$factory(other)
items.forEach(function(item){DOMNode.__le__(self,item)})}catch(err){throw _b_.TypeError.$factory("can't add '"+
$B.class_name(other)+"' object to DOMNode instance")}}}
DOMNode.__len__=function(self){return self.elt.length}
DOMNode.__mul__=function(self,other){if(_b_.isinstance(other,_b_.int)&& other.valueOf()> 0){var res=TagSum.$factory()
var pos=res.children.length
for(var i=0;i < other.valueOf();i++){res.children[pos++]=DOMNode.clone(self)()}
return res}
throw _b_.ValueError.$factory("can't multiply "+self.__class__+
"by "+other)}
DOMNode.__ne__=function(self,other){return ! DOMNode.__eq__(self,other)}
DOMNode.__next__=function(self){self.$counter++
if(self.$counter < self.elt.childNodes.length){return DOMNode.$factory(self.elt.childNodes[self.$counter])}
throw _b_.StopIteration.$factory("StopIteration")}
DOMNode.__radd__=function(self,other){
var res=TagSum.$factory()
var txt=DOMNode.$factory(document.createTextNode(other))
res.children=[txt,self]
return res}
DOMNode.__str__=DOMNode.__repr__=function(self){var proto=Object.getPrototypeOf(self.elt)
if(proto){var name=proto.constructor.name
if(name===undefined){
var proto_str=proto.constructor.toString()
name=proto_str.substring(8,proto_str.length-1)}
return "<"+name+" object>"}
var res="<DOMNode object type '"
return res+$NodeTypes[self.elt.nodeType]+"' name '"+
self.elt.nodeName+"'>"}
DOMNode.__setattr__=function(self,attr,value){
if(attr.substr(0,2)=="on"){
if(!$B.$bool(value)){
DOMNode.unbind(self,attr.substr(2))}else{
DOMNode.bind(self,attr.substr(2),value)}}else{switch(attr){case "left":
case "top":
case "width":
case "height":
if(_b_.isinstance(value,_b_.int)&& self.elt.nodeType==1){self.elt.style[attr]=value+"px"
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
var proto=Object.getPrototypeOf(self.elt),nb=0
while(!!proto && proto !==Object.prototype && nb++< 10){var descriptors=Object.getOwnPropertyDescriptors(proto)
if(!!descriptors &&
typeof descriptors.hasOwnProperty=="function"){if(descriptors.hasOwnProperty(attr)){if(!descriptors[attr].writable &&
descriptors[attr].set===undefined){warn("Warning: property '"+attr+
"' is not writable. Use element.attrs['"+
attr+"'] instead.")}
break}}else{break}
proto=Object.getPrototypeOf(proto)}
if(self.elt.style && self.elt.style[attr]!==undefined){warn("Warning: '"+attr+"' is a property of element.style")}
self.elt[attr]=value
return _b_.None}}
DOMNode.__setitem__=function(self,key,value){if(typeof key=="number"){self.elt.childNodes[key]=value}else if(typeof key=="string"){if(self.elt.attributes){if(self.elt instanceof SVGElement){self.elt.setAttributeNS(null,key,value)}else if(typeof self.elt.setAttribute=="function"){self.elt.setAttribute(key,value)}}}}
DOMNode.abs_left={__get__:function(self){return $getPosition(self.elt).left},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'abs_left' is read-only")}}
DOMNode.abs_top={__get__:function(self){return $getPosition(self.elt).top},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'abs_top' is read-only")}}
DOMNode.bind=function(self,event){
var $=$B.args("bind",4,{self:null,event:null,func:null,options:null},["self","event","func","options"],arguments,{options:_b_.None},null,null),self=$.self,event=$.event,func=$.func,options=$.options
var callback=(function(f){return function(ev){try{return f($DOMEvent(ev))}catch(err){if(err.__class__ !==undefined){var msg=$B.$getattr(err,"info")+
"\n"+$B.class_name(err)
if(err.args){msg+=": "+err.args[0]}
try{$B.$getattr($B.stderr,"write")(msg)}
catch(err){console.log(msg)}}else{try{$B.$getattr($B.stderr,"write")(err)}
catch(err1){console.log(err)}}}}}
)(func)
callback.$infos=func.$infos
callback.$attrs=func.$attrs ||{}
callback.$func=func
if(typeof options=="boolean"){self.elt.addEventListener(event,callback,options)}else if(options.__class__===_b_.dict){self.elt.addEventListener(event,callback,options.$string_dict)}else if(options===_b_.None){self.elt.addEventListener(event,callback,false)}
self.elt.$events=self.elt.$events ||{}
self.elt.$events[event]=self.elt.$events[event]||[]
self.elt.$events[event].push([func,callback])
return self}
DOMNode.children=function(self){var res=[],elt=self.elt
console.log(elt,elt.childNodes)
if(elt.nodeType==9){elt=elt.body}
elt.childNodes.forEach(function(child){res.push(DOMNode.$factory(child))})
return res}
DOMNode.clear=function(self){
var elt=self.elt
if(elt.nodeType==9){elt=elt.body}
while(elt.firstChild){elt.removeChild(elt.firstChild)}}
DOMNode.Class=function(self){if(self.elt.className !==undefined){return self.elt.className}
return _b_.None}
DOMNode.class_name=function(self){return DOMNode.Class(self)}
DOMNode.clone=function(self){var res=DOMNode.$factory(self.elt.cloneNode(true))
var events=self.elt.$events ||{}
for(var event in events){var evt_list=events[event]
evt_list.forEach(function(evt){var func=evt[0]
DOMNode.bind(res,event,func)})}
return res}
DOMNode.closest=function(self,tagName){
var res=self.elt,tagName=tagName.toLowerCase()
while(res.tagName.toLowerCase()!=tagName){res=res.parentNode
if(res===undefined ||res.tagName===undefined){throw _b_.KeyError.$factory("no parent of type "+tagName)}}
return DOMNode.$factory(res)}
DOMNode.events=function(self,event){self.elt.$events=self.elt.$events ||{}
var evt_list=self.elt.$events[event]=self.elt.$events[event]||[],callbacks=[]
evt_list.forEach(function(evt){callbacks.push(evt[1])})
return callbacks}
DOMNode.focus=function(self){return(function(obj){return function(){
setTimeout(function(){obj.focus()},10)}})(self.elt)}
function make_list(node_list){var res=[]
for(var i=0;i < node_list.length;i++){res.push(DOMNode.$factory(node_list[i]))}
return res}
DOMNode.get=function(self){
var obj=self.elt,args=[]
for(var i=1;i < arguments.length;i++){args.push(arguments[i])}
var $ns=$B.args("get",0,{},[],args,{},null,"kw"),$dict={},items=_b_.list.$factory(_b_.dict.items($ns["kw"]))
items.forEach(function(item){$dict[item[0]]=item[1]})
if($dict["name"]!==undefined){if(obj.getElementsByName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by name")}
return make_list(obj.getElementsByName($dict['name']))}
if($dict["tag"]!==undefined){if(obj.getElementsByTagName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by tag name")}
return make_list(obj.getElementsByTagName($dict["tag"]))}
if($dict["classname"]!==undefined){if(obj.getElementsByClassName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by class name")}
return make_list(obj.getElementsByClassName($dict['classname']))}
if($dict["id"]!==undefined){if(obj.getElementById===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by id")}
var id_res=document.getElementById($dict['id'])
if(! id_res){return[]}
return[DOMNode.$factory(id_res)]}
if($dict["selector"]!==undefined){if(obj.querySelectorAll===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
return make_list(obj.querySelectorAll($dict['selector']))}
return res}
DOMNode.getContext=function(self){
if(!("getContext" in self.elt)){throw _b_.AttributeError.$factory("object has no attribute 'getContext'")}
var obj=self.elt
return function(ctx){return JSObject.$factory(obj.getContext(ctx))}}
DOMNode.getSelectionRange=function(self){
if(self.elt["getSelectionRange"]!==undefined){return self.elt.getSelectionRange.apply(null,arguments)}}
DOMNode.html=function(self){var res=self.elt.innerHTML
if(res===undefined){if(self.elt.nodeType==9){res=self.elt.body.innerHTML}
else{res=_b_.None}}
return res}
DOMNode.id=function(self){if(self.elt.id !==undefined){return self.elt.id}
return _b_.None}
DOMNode.index=function(self,selector){var items
if(selector===undefined){items=self.elt.parentElement.childNodes}else{items=self.elt.parentElement.querySelectorAll(selector)}
var rank=-1
for(var i=0;i < items.length;i++){if(items[i]===self.elt){rank=i;break}}
return rank}
DOMNode.inside=function(self,other){
other=other.elt
var elt=self.elt
while(true){if(other===elt){return true}
elt=elt.parentElement
if(! elt){return false}}}
DOMNode.options=function(self){
return new $OptionsClass(self.elt)}
DOMNode.parent=function(self){if(self.elt.parentElement){return DOMNode.$factory(self.elt.parentElement)}
return _b_.None}
DOMNode.reset=function(self){
return function(){self.elt.reset()}}
DOMNode.select=function(self,selector){
if(self.elt.querySelectorAll===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
return make_list(self.elt.querySelectorAll(selector))}
DOMNode.select_one=function(self,selector){
if(self.elt.querySelector===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
var res=self.elt.querySelector(selector)
if(res===null){return _b_.None}
return DOMNode.$factory(res)}
DOMNode.style=function(self){
self.elt.style.float=self.elt.style.cssFloat ||self.style.styleFloat
return $B.JSObject.$factory(self.elt.style)}
DOMNode.setSelectionRange=function(self){
if(this["setSelectionRange"]!==undefined){return(function(obj){return function(){return obj.setSelectionRange.apply(obj,arguments)}})(this)}else if(this["createTextRange"]!==undefined){return(function(obj){return function(start_pos,end_pos){if(end_pos==undefined){end_pos=start_pos}
var range=obj.createTextRange()
range.collapse(true)
range.moveEnd("character",start_pos)
range.moveStart("character",end_pos)
range.select()}})(this)}}
DOMNode.set_class_name=function(self,arg){self.elt.setAttribute("class",arg)}
DOMNode.set_html=function(self,value){var elt=self.elt
if(elt.nodeType==9){elt=elt.body}
elt.innerHTML=_b_.str.$factory(value)}
DOMNode.set_style=function(self,style){
if(!_b_.isinstance(style,_b_.dict)){throw _b_.TypeError.$factory("style must be dict, not "+
$B.class_name(style))}
var items=_b_.list.$factory(_b_.dict.items(style))
for(var i=0;i < items.length;i++){var key=items[i][0],value=items[i][1]
if(key.toLowerCase()=="float"){self.elt.style.cssFloat=value
self.elt.style.styleFloat=value}else{switch(key){case "top":
case "left":
case "width":
case "borderWidth":
if(_b_.isinstance(value,_b_.int)){value=value+"px"}}
self.elt.style[key]=value}}}
DOMNode.set_text=function(self,value){var elt=self.elt
if(elt.nodeType==9){elt=elt.body}
elt.innerText=_b_.str.$factory(value)
elt.textContent=_b_.str.$factory(value)}
DOMNode.set_value=function(self,value){self.elt.value=_b_.str.$factory(value)}
DOMNode.submit=function(self){
return function(){self.elt.submit()}}
DOMNode.text=function(self){var elt=self.elt
if(elt.nodeType==9){elt=elt.body}
var res=elt.innerText ||elt.textContent
if(res===null){res=_b_.None}
return res}
DOMNode.toString=function(self){if(self===undefined){return 'DOMNode'}
return self.elt.nodeName}
DOMNode.trigger=function(self,etype){
if(self.elt.fireEvent){self.elt.fireEvent("on"+etype)}else{var evObj=document.createEvent("Events")
evObj.initEvent(etype,true,false)
self.elt.dispatchEvent(evObj)}}
DOMNode.unbind=function(self,event){
self.elt.$events=self.elt.$events ||{}
if(self.elt.$events==={}){return _b_.None}
if(event===undefined){for(var event in self.elt.$events){DOMNode.unbind(self,event)}
return _b_.None}
if(self.elt.$events[event]===undefined ||
self.elt.$events[event].length==0){return _b_.None}
var events=self.elt.$events[event]
if(arguments.length==2){
for(var i=0;i < events.length;i++){var callback=events[i][1]
self.elt.removeEventListener(event,callback,false)}
self.elt.$events[event]=[]
return _b_.None}
for(var i=2;i < arguments.length;i++){var callback=arguments[i],flag=false,func=callback.$func
if(func===undefined){
var found=false
for(var j=0;j < events.length;j++){if(events[j][0]===callback){var func=callback,found=true
break}}
if(!found){throw _b_.TypeError.$factory("function is not an event callback")}}
for(var j=0;j < events.length;j++){if($B.$getattr(func,'__eq__')(events[j][0])){var callback=events[j][1]
self.elt.removeEventListener(event,callback,false)
events.splice(j,1)
flag=true
break}}
if(!flag){throw _b_.KeyError.$factory('missing callback for event '+event)}}}
$B.set_func_names(DOMNode,"browser")
var Query={__class__:_b_.type,$infos:{__name__:"query"}}
Query.__contains__=function(self,key){return self._keys.indexOf(key)>-1}
Query.__getitem__=function(self,key){
var result=self._values[key]
if(result===undefined){throw _b_.KeyError.$factory(key)}
if(result.length==1){return result[0]}
return result}
var Query_iterator=$B.make_iterator_class("query string iterator")
Query.__iter__=function(self){return Query_iterator.$factory(self._keys)}
Query.__mro__=[object]
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
DOMNode.query=function(self){var res={__class__:Query,_keys :[],_values :{}}
var qs=location.search.substr(1).split('&')
for(var i=0;i < qs.length;i++){var pos=qs[i].search("="),elts=[qs[i].substr(0,pos),qs[i].substr(pos+1)],key=decodeURIComponent(elts[0]),value=decodeURIComponent(elts[1])
if(res._keys.indexOf(key)>-1){res._values[key].push(value)}
else{res._keys.push(key)
res._values[key]=[value]}}
return res}
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
var win=JSObject.$factory(_window)
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
function rstrip(s,strip_chars){var _chars=strip_chars ||" \t\n";
var nstrip=0,len=s.length;
while(nstrip < len && _chars.indexOf(s.charAt(len-1-nstrip))>-1)nstrip++;
return s.substr(0,len-nstrip)}
function jscode_namespace(iter_name,action,parent_id){var _clean='';
if(action==='store'){_clean=' = {}'}
var res='for(var attr in this.blocks){'+
'eval("var " + attr + " = this.blocks[attr]")'+
'};'+
'\nvar $locals_'+iter_name+' = this.env'+_clean+', '+
'\n    $local_name = "'+iter_name+'", '+
'\n    $locals = $locals_'+iter_name+','+
'\n    $yield;'
if(parent_id){res+='$locals.$parent = $locals_'+parent_id.replace(/\./g,"_")+
';'}
return res}
function make_node(top_node,node){
if(node.type==="marker"){return}
var is_cond=false,is_except=false,is_else=false,is_continue,ctx_js
if(node.C.$genjs){ctx_js=node.C.$genjs}else{ctx_js=node.C.$genjs=node.C.to_js()}
if(node.locals_def){var parent_id=node.func_node.parent_block.id
if(node.func_node.ntype=="generator"){
var iter_name=top_node.iter_id
ctx_js=jscode_namespace(iter_name,'store',parent_id)}else{ctx_js+="$locals.$parent = $locals_"+parent_id+";"}}
if(node.is_catch){is_except=true;is_cond=true}
if(node.is_except){is_except=true}
if(node.C.type=="node"){var ctx=node.C.tree[0]
var ctype=ctx.type
switch(ctx.type){case "except":
is_except=true
is_cond=true
break
case "single_kw":
is_cond=true
if(ctx.token=="else"){is_else=true}
if(ctx.token=="finally"){is_except=true}
break
case "condition":
if(ctx.token=="elif"){is_else=true;is_cond=true}
if(ctx.token=="if"){is_cond=true}}}
if(ctx_js){
var new_node=new $B.genNode(ctx_js)
new_node.line_num=node.line_num
if(ctype=="yield"){
var ctx_manager=in_ctx_manager(node)
var yield_node_id=top_node.yields.length
while(ctx_js.endsWith(";")){ctx_js=ctx_js.substr(0,ctx_js.length-1)}
var res="return ["+ctx_js+", "+yield_node_id+"]"
if(ctx_manager !==undefined){res="$yield = true;"+res}
new_node.data=res
top_node.yields.push(new_node)}else if(node.is_set_yield_value){
var ctx_manager
if(node.after_yield){ctx_manager=in_ctx_manager(node)}
var js="var sent_value = this.sent_value === undefined ? "+
"None : this.sent_value;",h="\n"+' '.repeat(node.indent)
js+=h+"this.sent_value = None"
js+=h+"if(sent_value.__class__ === $B.$GeneratorSendError)"+
"{throw sent_value.err};"
if(typeof ctx_js=="number"){js+=h+"var $yield_value"+ctx_js+" = sent_value;"}
if(ctx_manager !==undefined){js+=h+"$yield = true;" }
new_node.data=js}else if(ctype=="break" ||ctype=="continue"){
new_node["is_"+ctype]=true
new_node.loop_num=node.C.tree[0].loop_ctx.loop_num}
new_node.is_yield=(ctype=="yield" ||ctype=="return")
new_node.is_cond=is_cond
new_node.is_except=is_except
new_node.is_if=ctype=="condition" && ctx.token=="if"
new_node.is_try=node.is_try
new_node.is_else=is_else
new_node.loop_start=node.loop_start
new_node.is_set_yield_value=node.is_set_yield_value
for(var i=0,len=node.children.length;i < len;i++){var nd=make_node(top_node,node.children[i])
if(nd !==undefined){new_node.addChild(nd)}}}
return new_node}
$B.genNode=function(data,parent){this.data=data
this.parent=parent
this.children=[]
this.has_child=false
if(parent===undefined){this.nodes={}
this.num=0}
this.addChild=function(child){if(child===undefined){console.log("child of "+this+" undefined")}
this.children[this.children.length]=child
this.has_child=true
child.parent=this
child.rank=this.children.length-1}
this.insert=function(pos,child){if(child===undefined){console.log("child of "+this+" undefined")}
this.children.splice(pos,0,child)
this.has_child=true
child.parent=this
child.rank=pos}
this.clone=function(){var res=new $B.genNode(this.data)
res.has_child=this.has_child
res.is_cond=this.is_cond
res.is_except=this.is_except
res.is_if=this.is_if
res.is_try=this.is_try
res.is_else=this.is_else
res.loop_num=this.loop_num
res.loop_start=this.loop_start
res.is_yield=this.is_yield
res.line_num=this.line_num
return res}
this.clone_tree=function(exit_node,head){
var res=new $B.genNode(this.data)
if(this.replaced && ! in_loop(this)){
console.log("already replaced",this)
res.data="void(0)"}
if(this===exit_node &&(this.parent.is_cond ||! in_loop(this))){
if(! exit_node.replaced){
console.log("replace by void(0)",this)
res=new $B.genNode("void(0)")}else{res=new $B.genNode(exit_node.data)}
exit_node.replaced=true}
if(head &&(this.is_break ||this.is_continue)){var loop=in_loop(this)
res.loop=loop
res.data=""
if(this.is_break){res.data+='$locals["$no_break'+this.loop_num+
'"] = false;'}
res.data+='var err = new Error("break"); '+
"err.__class__ = $B.GeneratorBreak; throw err;"
res.is_break=this.is_break}
res.is_continue=this.is_continue
res.has_child=this.has_child
res.is_cond=this.is_cond
res.is_except=this.is_except
res.is_try=this.is_try
res.is_else=this.is_else
res.loop_num=this.loop_num
res.loop_start=this.loop_start
res.no_break=true
res.is_yield=this.is_yield
res.line_num=this.line_num
for(var i=0,len=this.children.length;i < len;i++){res.addChild(this.children[i].clone_tree(exit_node,head))
if(this.children[i].is_break){res.no_break=false}}
return res}
this.has=function(keyword){
if(this["is_"+keyword]){return true}else{for(var i=0,len=this.children.length;i < len;i++){if(this.children[i].loop_start !==undefined){
continue}
if(this.children[i].has(keyword)){return true}}}
return false}
this.indent_src=function(indent){return " ".repeat(indent*indent)}
this.src=function(indent){
indent=indent ||0
var res=[this.indent_src(indent)+this.data],pos=1
if(this.has_child){res[pos++]="{"}
res[pos++]="\n"
for(var i=0,len=this.children.length;i < len;i++){res[pos++]=this.children[i].src(indent+1)
if(this.children[i].is_yield){break}}
if(this.has_child){res[pos++]="\n"+this.indent_src(indent)+"}\n"}
return res.join("")}
this.toString=function(){return "<Node "+this.data+">"}}
$B.GeneratorBreak=$B.make_class("GeneratorBreak")
$B.$GeneratorSendError={}
var $GeneratorReturn={}
$B.generator_return=function(value){return{__class__:$GeneratorReturn,value:value}}
function in_ctx_manager(node){
var ctx_manager,parent=node.parent
while(parent && parent.ntype !=="generator"){ctx_manager=parent.ctx_manager_num
if(ctx_manager !==undefined){return ctx_manager}
parent=parent.parent}}
function in_loop(node){
while(node){if(node.loop_start !==undefined){return node}
node=node.parent}
return false}
function in_try(node){
var tries=[],pnode=node.parent,pos=0
while(pnode){if(pnode.is_try){tries[pos++]=pnode}
pnode=pnode.parent}
return tries}
var $BRGeneratorDict={__class__:_b_.type,$infos:{__name__:"generator",__module__:"builtins"},$is_class:true}
$B.gen_counter=0 
function remove_line_nums(node){
for(var i=0;i < node.children.length;i++){if(node.children[i].is_line_num){node.children.splice(i,1)}else{remove_line_nums(node.children[i])}}}
$B.$BRgenerator=function(func_name,blocks,def_id,def_node){
var def_ctx=def_node.C.tree[0]
var module=def_node.module,
iter_id=def_id
if($B.debug > 0){
$B.$add_line_num(def_node,def_ctx.rank)}
var func_root=new $B.genNode(def_ctx.to_js())
remove_line_nums(def_node.parent)
func_root.module=module
func_root.yields=[]
func_root.loop_ends={}
func_root.def_id=def_id
func_root.iter_id=iter_id
for(var i=0,len=def_node.children.length;i < len;i++){var nd=make_node(func_root,def_node.children[i])
if(nd===undefined){continue}
func_root.addChild(nd)}
var obj={__class__ :$BRGeneratorDict,blocks:blocks,def_ctx:def_ctx,def_id:def_id,func_name:func_name,func_root:func_root,module:module,gi_running:false,iter_id:iter_id,id:iter_id,num:0}
var src=func_root.src(),raw_src=src.substr(src.search("function"))
raw_src+="return "+def_ctx.name+def_ctx.num+"}"
var funcs=[raw_src]
obj.parent_block=def_node
for(var i=0;i < func_root.yields.length;i++){funcs.push(make_next(obj,i))}
return funcs}
function make_next(self,yield_node_id){
var exit_node=self.func_root.yields[yield_node_id]
exit_node.replaced=false
var root=new $B.genNode(self.def_ctx.to_js())
var fnode=self.func_root.clone()
root.addChild(fnode)
var parent_scope=self.func_root
var js=jscode_namespace(self.iter_id,'restore')
fnode.addChild(new $B.genNode(js))
js='var $top_frame = ["'+self.iter_id+'",$locals,"'+self.module+
'",$locals_'+self.module.replace(/\./g,'_')+'];'+
'$B.frames_stack.push($top_frame); var $stack_length = '+
'$B.frames_stack.length;'
fnode.addChild(new $B.genNode(js))
while(1){
var exit_parent=exit_node.parent,rest=[],pos=0,breaks=[],has_break,has_continue
var start=exit_node.rank+1
if(exit_node.loop_start !==undefined){
start=exit_node.rank}else if(exit_node.is_cond){
while(start < exit_parent.children.length &&
(exit_parent.children[start].is_except ||
exit_parent.children[start].is_else)){start++}}else if(exit_node.is_try ||exit_node.is_except){
while(start < exit_parent.children.length &&
(exit_parent.children[start].is_except ||
exit_parent.children[start].is_else)){start++}}
var is_continue
for(var i=start,len=exit_parent.children.length;i < len;i++){var clone=exit_parent.children[i].clone_tree(null,true)
if(clone.is_continue){
is_continue=true
var loop=clone.loop
rest[pos++]=loop.clone_tree()
break}
if(clone.has("continue")){has_continue=true;}
rest[pos++]=clone
var break_num=clone.has("break")
if(break_num){has_break=true}}
if((has_break ||has_continue)&& rest.length > 0){
var rest_try=new $B.genNode("try")
for(var i=0,len=rest.length;i < len;i++){rest_try.addChild(rest[i])}
var catch_test="catch(err)"+
"{if(err.__class__ !== $B.GeneratorBreak){throw err}}"
catch_test=new $B.genNode(catch_test)
rest=[rest_try,catch_test]
if(exit_parent.loop_start !==undefined){var test='if($locals["$no_break'+exit_parent.loop_start+
'"])',test_node=new $B.genNode(test)
test_node.addChild(rest_try)
test_node.addChild(catch_test)
rest=[test_node]}}
var tries=in_try(exit_node)
if(tries.length==0){
for(var i=0;i < rest.length;i++){fnode.addChild(rest[i])}}else{
var tree=[],pos=0
for(var i=0;i < tries.length;i++){var try_node=tries[i],try_clone=try_node.clone()
if(i==0){for(var j=0;j < rest.length;j++){try_clone.addChild(rest[j])}}
var children=[try_clone],cpos=1
for(var j=try_node.rank+1;
j < try_node.parent.children.length;j++){if(try_node.parent.children[j].is_except){children[cpos++]=
try_node.parent.children[j].clone_tree(null,true)}else{break}}
tree[pos++]=children}
var parent=fnode
while(tree.length){children=tree.pop()
children.forEach(function(child){parent.addChild(child)})
parent=children[0]}}
exit_node=exit_parent
if(exit_node===self.func_root){break}}
var src=root.children[0].src(),next_src=src.substr(src.search("function"))
next_src=next_src.substr(10)
next_src=next_src.substr(next_src.search("function"))
return next_src}
var generator={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"generator"}}
generator.__enter__=function(self){console.log("generator.__enter__ called")}
generator.__exit__=function(self){console.log("generator.__exit__ called")}
generator.__str__=function(self){return "<generator object "+self.__name__+">"}
generator.__iter__=function(self){return self}
generator.__next__=function(self){if(self.$finished){throw _b_.StopIteration.$factory(_b_.None)}
if(self.gi_running===true){throw ValueError.$factory("generator already executing")}
self.gi_running=true
if(self.next===undefined){self.$finished=true
throw _b_.StopIteration.$factory(_b_.None)}
try{var res=self.next.apply(self,self.args)}catch(err){
self.$finished=true
err.$stack=$B.frames_stack.slice()
throw err}finally{
self.gi_running=false
$B.leave_frame(self.iter_id)}
if(res===undefined){throw _b_.StopIteration.$factory(_b_.None)}
else if(res[0].__class__===$GeneratorReturn){
self.$finished=true
throw StopIteration.$factory(res[0].value)}
self.next=self.nexts[res[1]]
self.gi_running=false
return res[0]}
generator.close=function(self,value){self.sent_value=_b_.GeneratorExit.$factory()
try{var res=generator.__next__(self)
if(res !==_b_.None){throw _b_.RuntimeError.$factory("closed generator returned a value")}}catch(err){if($B.is_exc(err,[_b_.StopIteration,_b_.GeneratorExit])){return _b_.None}
throw err}}
generator.send=function(self,value){self.sent_value=value
return generator.__next__(self)}
generator.$$throw=function(self,type,value,traceback){var exc=type
if(value !==undefined){exc=$B.$call(exc)(value)}
if(traceback !==undefined){exc.$traceback=traceback}
self.sent_value={__class__:$B.$GeneratorSendError,err:exc}
return generator.__next__(self)}
generator.$factory=$B.genfunc=function(name,blocks,funcs,$defaults){
if(name.startsWith("__ge")){
for(var block_id in blocks){if(block_id=="$locals_"+name){continue}
for(var attr in blocks[block_id]){blocks["$locals_"+name][attr]=blocks[block_id][attr]}}}
return function(){var iter_id="$gen"+$B.gen_counter++,gfuncs=[]
gfuncs.push(funcs[0]($defaults))
for(var i=1;i < funcs.length;i++){gfuncs.push(funcs[i])}
var res={__class__:generator,__name__:name,args:Array.prototype.slice.call(arguments),blocks:blocks,env:{},name:name,nexts:gfuncs.slice(1),next:gfuncs[0],iter_id:iter_id,gi_running:false,$started:false,$defaults:$defaults,$is_generator_obj:true}
return res}}
$B.set_func_names(generator,"builtins")})(__BRYTHON__)
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
return function(callback){if($.elt.__class__ &&
_b_.issubclass($.elt.__class__,$B.JSObject)){
function f(ev){try{return callback($B.JSObject.$factory(ev))}catch(err){$B.handle_error(err)}}
$.elt.js.addEventListener($.evt,f,options)
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
return callback}},console:self.console && $B.JSObject.$factory(self.console),self:$B.win,win:$B.win,$$window:$B.win,}
browser.__path__=browser.__file__
if($B.isNode){delete browser.$$window
delete browser.win}else if($B.isWebWorker){browser.is_webworker=true
delete browser.$$window
delete browser.win
browser.self.js.send=self.postMessage}else{
browser.is_webworker=false
update(browser,{$$alert:function(message){window.alert($B.builtins.str.$factory(message))},confirm:$B.JSObject.$factory(window.confirm),$$document:$B.DOMNode.$factory(document),doc:$B.DOMNode.$factory(document),
DOMEvent:$B.DOMEvent,DOMNode:$B.DOMNode,load:function(script_url){
var file_obj=$B.builtins.open(script_url)
var content=$B.builtins.getattr(file_obj,'read')()
eval(content)},mouseCoords:function(ev){return $B.JSObject.$factory($mouseCoords(ev))},prompt:function(message,default_value){return $B.JSObject.$factory(window.prompt(message,default_value||''))},reload:function(){
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
self.elt.innerHTML=_b_.str.$factory(first)}else if(first.__class__===TagSum){for(var i=0,len=first.children.length;i < len;i++){self.elt.appendChild(first.children[i].elt)}}else{if(_b_.isinstance(first,$B.DOMNode)){self.elt.appendChild(first.elt)}else{try{
var items=_b_.list.$factory(first)
items.forEach(function(item){$B.DOMNode.__le__(self,item)})}catch(err){if($B.debug > 1){console.log(err,err.__class__,err.args)
console.log("first",first)
console.log(arguments)}
$B.handle_error(err)}}}}
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
self.elt.setAttribute(arg,value)}catch(err){throw _b_.ValueError.$factory(
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
res.__dict__=_b_.dict.$factory()
return res}
$B.set_func_names(dict,"browser.html")
return dict}
function makeFactory(klass){var factory=function(){if(klass.$elt_wrap !==undefined){
var elt=klass.$elt_wrap 
klass.$elt_wrap=undefined 
var res=$B.DOMNode.$factory(elt,true)
res._wrapped=true }else{if(klass.$infos.__name__=='SVG'){var res=$B.DOMNode.$factory(document.createElementNS("http://www.w3.org/2000/svg","svg"),true)}else{var res=$B.DOMNode.$factory(document.createElement(klass.$infos.__name__),true)}
res._wrapped=false }
res.__class__=klass
klass.__init__(res,...arguments)
return res}
return factory}
var tags=['A','ABBR','ACRONYM','ADDRESS','APPLET','AREA','B','BASE','BASEFONT','BDO','BIG','BLOCKQUOTE','BODY','BR','BUTTON','CAPTION','CENTER','CITE','CODE','COL','COLGROUP','DD','DEL','DFN','DIR','DIV','DL','DT','EM','FIELDSET','FONT','FORM','FRAME','FRAMESET','H1','H2','H3','H4','H5','H6','HEAD','HR','HTML','I','IFRAME','IMG','INPUT','INS','ISINDEX','KBD','LABEL','LEGEND','LI','LINK','MAP','MENU','META','NOFRAMES','NOSCRIPT','OBJECT','OL','OPTGROUP','OPTION','P','PARAM','PRE','Q','S','SAMP','SCRIPT','SELECT','SMALL','SPAN','STRIKE','STRONG','STYLE','SUB','SUP','SVG','TABLE','TBODY','TD','TEXTAREA','TFOOT','TH','THEAD','TITLE','TR','TT','U','UL','VAR',
'ARTICLE','ASIDE','AUDIO','BDI','CANVAS','COMMAND','DATA','DATALIST','EMBED','FIGCAPTION','FIGURE','FOOTER','HEADER','KEYGEN','MAIN','MARK','MATH','METER','NAV','OUTPUT','PROGRESS','RB','RP','RT','RTC','RUBY','SECTION','SOURCE','TEMPLATE','TIME','TRACK','VIDEO','WBR',
'DETAILS','DIALOG','MENUITEM','PICTURE','SUMMARY']
var obj={tags:_b_.dict.$factory()},dicts={}
$B.DOMNode.tags=obj.tags
function maketag(tag){if(!(typeof tag=='string')){throw _b_.TypeError.$factory("html.maketag expects a string as argument")}
var klass=dicts[tag]=makeTagDict(tag)
klass.$factory=makeFactory(klass)
obj.tags.$string_dict[tag]=klass
return klass}
tags.forEach(function(tag){obj[tag]=maketag(tag)})
obj.maketag=maketag
obj.attribute_mapper=function(attr){return attr.replace(/_/g,'-')}
return obj})(__BRYTHON__)}
modules['browser']=browser
modules['javascript']={$$this:function(){
if($B.js_this===undefined){return $B.builtins.None}
return $B.JSObject.$factory($B.js_this)},$$Date:self.Date && $B.JSObject.$factory(self.Date),JSConstructor:{__get__:function(){console.warn('"javascript.JSConstructor" is deprecrated. '+
'Use window.<js constructor name>.new() instead.')
return $B.JSConstructor},__set__:function(){throw _b_.AttributeError.$factory("read only")}},JSObject:{__get__:function(){console.warn('"javascript.JSObject" is deprecrated. To use '+
'a Javascript object, use window.<object name> instead.')
return $B.JSObject},__set__:function(){throw _b_.AttributeError.$factory("read only")}},JSON:{__class__:$B.make_class("JSON"),parse:function(s){return $B.structuredclone2pyobj(JSON.parse(s))},stringify:function(obj){return JSON.stringify($B.pyobj2structuredclone(obj))}},jsobj2pyobj:function(obj){return $B.jsobj2pyobj(obj)},load:function(script_url){console.log('"javascript.load" is deprecrated. '+
'Use browser.load instead.')
var file_obj=$B.builtins.open(script_url)
var content=$B.builtins.getattr(file_obj,'read')()
eval(content)},$$Math:self.Math && $B.JSObject.$factory(self.Math),NULL:null,$$Number:self.Number && $B.JSObject.$factory(self.Number),py2js:function(src,module_name){if(module_name===undefined){module_name='__main__'+$B.UUID()}
return $B.py2js(src,module_name,module_name,$B.builtins_scope).to_js()},pyobj2jsobj:function(obj){return $B.pyobj2jsobj(obj)},$$RegExp:self.RegExp && $B.JSObject.$factory(self.RegExp),$$String:self.String && $B.JSObject.$factory(self.String),UNDEFINED:undefined}
var arraybuffers=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"]
arraybuffers.forEach(function(ab){if(self[ab]!==undefined){modules['javascript'][ab]=$B.JSObject.$factory(self[ab])}})
var _b_=$B.builtins
modules['_sys']={
Getframe :function(depth){return $B._frame.$factory($B.frames_stack,$B.frames_stack.length-depth-1)},exc_info:function(){for(var i=$B.frames_stack.length-1;i >=0;i--){var frame=$B.frames_stack[i],exc=frame[1].$current_exception
if(exc){return _b_.tuple.$factory([exc.__class__,exc,$B.$getattr(exc,"__traceback__")])}}
return _b_.tuple.$factory([_b_.None,_b_.None,_b_.None])},excepthook:function(exc_class,exc_value,traceback){$B.handle_error(exc_value)},modules:{__get__:function(){return $B.obj_dict($B.imported)},__set__:function(self,obj,value){throw _b_.TypeError.$factory("Read only property 'sys.modules'")}},path:{__get__:function(){return $B.path},__set__:function(self,obj,value){$B.path=value;}},meta_path:{__get__:function(){return $B.meta_path},__set__:function(self,obj,value){$B.meta_path=value }},path_hooks:{__get__:function(){return $B.path_hooks},__set__:function(self,obj,value){$B.path_hooks=value }},path_importer_cache:{__get__:function(){return _b_.dict.$factory($B.JSObject.$factory($B.path_importer_cache))},__set__:function(self,obj,value){throw _b_.TypeError.$factory("Read only property"+
" 'sys.path_importer_cache'")}},stderr:{__get__:function(){return $B.stderr},__set__:function(self,obj,value){$B.stderr=value},write:function(data){_b_.getattr($B.stderr,"write")(data)}},stdout:{__get__:function(){return $B.stdout},__set__:function(self,obj,value){$B.stdout=value},write:function(data){_b_.getattr($B.stdout,"write")(data)}},stdin:{__get__:function(){return $B.stdin},__set__:function(){throw _b_.TypeError.$factory("sys.stdin is read-only")}},vfs:{__get__:function(){if($B.hasOwnProperty("VFS")){return $B.obj_dict($B.VFS)}
else{return _b_.None}},__set__:function(){throw _b_.TypeError.$factory("Read only property 'sys.vfs'")}}}
function load(name,module_obj){
module_obj.__class__=$B.module
module_obj.__name__=name
$B.imported[name]=module_obj
for(var attr in module_obj){if(typeof module_obj[attr]=='function'){var attr1=$B.from_alias(attr)
module_obj[attr].$infos={__name__:attr1,__qualname__:name+'.'+attr1}}}}
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
;(function($B){var _b_=$B.builtins
function import_hooks(mod_name,_path,from_stdlib){var meta_path=$B.meta_path.slice(),_sys_modules=$B.imported,_loader,spec
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
_loader=_b_.getattr(spec,"loader",_b_.None)
break}}}
if(_loader===undefined){
var exc=_b_.ModuleNotFoundError.$factory(mod_name)
exc.name=mod_name
throw exc}
if($B.is_none(module)){if(spec===_b_.None){throw _b_.ModuleNotFoundError.$factory(mod_name)}
var _spec_name=_b_.getattr(spec,"name")
if(!$B.is_none(_loader)){var create_module=_b_.getattr(_loader,"create_module",_b_.None)
if(!$B.is_none(create_module)){module=$B.$call(create_module)(spec)}}
if(module===undefined){throw _b_.ImportError.$factory(mod_name)}
if($B.is_none(module)){
module=$B.module.$factory(mod_name)
var mod_desc=_b_.getattr(spec,"origin")
if(_b_.getattr(spec,"has_location")){mod_desc="from '"+mod_desc+"'"}else{mod_desc="("+mod_desc+")"}}}
module.__name__=_spec_name
module.__loader__=_loader
module.__package__=_b_.getattr(spec,"parent","")
module.__spec__=spec
var locs=_b_.getattr(spec,"submodule_search_locations")
if(module.$is_package=!$B.is_none(locs)){module.__path__=locs}
if(_b_.getattr(spec,"has_location")){module.__file__=_b_.getattr(spec,"origin")
$B.$py_module_path[module.__name__]=module.__file__}
var cached=_b_.getattr(spec,"cached")
if(! $B.is_none(cached)){module.__cached__=cached}
if($B.is_none(_loader)){if(!$B.is_none(locs)){_sys_modules[_spec_name]=module}else{throw _b_.ImportError.$factory(mod_name)}}else{var exec_module=_b_.getattr(_loader,"exec_module",_b_.None)
if($B.is_none(exec_module)){
module=_b_.getattr(_loader,"load_module")(_spec_name)}else{_sys_modules[_spec_name]=module
try{exec_module(module)}catch(e){delete _sys_modules[_spec_name]
throw e}}}
return _sys_modules[_spec_name]}
$B.import_hooks=import_hooks})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
var coroutine=$B.coroutine=$B.make_class("coroutine")
coroutine.close=function(self){}
coroutine.send=function(self){return self.$func.apply(null,self.$args)}
coroutine.__repr__=coroutine.__str__=function(self){if(self.$func.$infos){return "<coroutine "+self.$func.$infos.__name__+">"}else{return "<coroutine object>"}}
$B.set_func_names(coroutine,"builtins")
$B.make_async=func=>{
var f=function(){var args=arguments
return{
__class__:coroutine,$args:args,$func:func}}
f.$infos=func.$infos
return f}
$B.promise=function(obj){if(obj.__class__===$B.JSObject){return obj.js}else if(obj.__class__===coroutine){return coroutine.send(obj)}
if(typeof obj=="function"){return obj()}
return obj}})(__BRYTHON__)
;
