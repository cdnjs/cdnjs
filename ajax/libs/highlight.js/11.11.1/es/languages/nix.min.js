/*! `nix` grammar compiled for Highlight.js 11.11.1 */
var hljsGrammar=(()=>{"use strict";return e=>{const t=e.regex,r={
keyword:["assert","else","if","in","inherit","let","or","rec","then","with"],
literal:["true","false","null"],
built_in:["abort","baseNameOf","builtins","derivation","derivationStrict","dirOf","fetchGit","fetchMercurial","fetchTarball","fetchTree","fromTOML","import","isNull","map","placeholder","removeAttrs","scopedImport","throw","toString"]
},a={scope:"built_in",
match:t.either(...["abort","add","addDrvOutputDependencies","addErrorContext","all","any","appendContext","attrNames","attrValues","baseNameOf","bitAnd","bitOr","bitXor","break","builtins","catAttrs","ceil","compareVersions","concatLists","concatMap","concatStringsSep","convertHash","currentSystem","currentTime","deepSeq","derivation","derivationStrict","dirOf","div","elem","elemAt","false","fetchGit","fetchMercurial","fetchTarball","fetchTree","fetchurl","filter","filterSource","findFile","flakeRefToString","floor","foldl'","fromJSON","fromTOML","functionArgs","genList","genericClosure","getAttr","getContext","getEnv","getFlake","groupBy","hasAttr","hasContext","hashFile","hashString","head","import","intersectAttrs","isAttrs","isBool","isFloat","isFunction","isInt","isList","isNull","isPath","isString","langVersion","length","lessThan","listToAttrs","map","mapAttrs","match","mul","nixPath","nixVersion","null","parseDrvName","parseFlakeRef","partition","path","pathExists","placeholder","readDir","readFile","readFileType","removeAttrs","replaceStrings","scopedImport","seq","sort","split","splitVersion","storeDir","storePath","stringLength","sub","substring","tail","throw","toFile","toJSON","toPath","toString","toXML","trace","traceVerbose","true","tryEval","typeOf","unsafeDiscardOutputDependency","unsafeDiscardStringContext","unsafeGetAttrPos","warn","zipAttrsWith"].map((e=>"builtins\\."+e))),
relevance:10},s="[A-Za-z_][A-Za-z0-9_'-]*",i={scope:"symbol",
match:RegExp(`<${s}(/${s})*>`)},n="[A-Za-z0-9_\\+\\.-]+",o={scope:"symbol",
match:RegExp(`(\\.\\.|\\.|~)?/(${n})?(/${n})*(?=[\\s;])`)
},c=t.either("==","=","\\+\\+","\\+","<=","<\\|","<",">=",">","->","//","/","!=","!","\\|\\|","\\|>","\\?","\\*","&&"),l={
scope:"operator",match:t.concat(c,/(?!-)/),relevance:0},p={scope:"number",
match:RegExp(e.NUMBER_RE+"(?!-)"),relevance:0},h={variants:[{scope:"operator",
beforeMatch:/\s/,begin:/-(?!>)/},{begin:[RegExp(""+e.NUMBER_RE),/-/,/(?!>)/],
beginScope:{1:"number",2:"operator"}},{begin:[c,/-/,/(?!>)/],beginScope:{
1:"operator",2:"operator"}}],relevance:0},m={beforeMatch:/(^|\{|;)\s*/,
begin:RegExp(`${s}(\\.${s})*\\s*=(?!=)`),returnBegin:!0,relevance:0,contains:[{
scope:"attr",match:RegExp(`${s}(\\.${s})*(?=\\s*=)`),relevance:.2}]},g={
scope:"subst",begin:/\$\{/,end:/\}/,keywords:r},u={scope:"char.escape",
match:/\\(?!\$)./},d={scope:"string",variants:[{begin:"''",end:"''",contains:[{
scope:"char.escape",match:/''\$/},g,{scope:"char.escape",match:/'''/},u]},{
begin:'"',end:'"',contains:[{scope:"char.escape",match:/\\\$/},g,u]}]},b={
scope:"params",match:RegExp(s+"\\s*:(?=\\s)")
},f=[p,e.HASH_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.COMMENT(/\/\*\*(?!\/)/,/\*\//,{
subLanguage:"markdown",relevance:0}),a,d,i,o,b,m,h,l];return g.contains=f,{
name:"Nix",aliases:["nixos"],keywords:r,contains:f.concat([{scope:"meta.prompt",
match:/^nix-repl>(?=\s)/,relevance:10},{scope:"meta",beforeMatch:/\s+/,
begin:/:([a-z]+|\?)/}])}}})();export default hljsGrammar;