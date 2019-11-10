(function(Fashion){
	var __udf = undefined,
	    Types = Fashion.Types,
	    __strings = {
    _: "$color",
    $: "$color_name",
    A: "$colorLookup",
    a: "$color_variant"
},

	    __names = Fashion.css.buildNames(__strings),

	    __jsNames = Fashion.css.buildJsNames(__strings);
var Bool = Types.Bool,
    __Bool = Bool,
    Literal = Types.Literal,
    __Literal = Literal,
    Text = Types.Text,
    __Text = Text,
    Numeric = Types.Numeric,
    __Numeric = Numeric,
    Color = Types.Color,
    __Color = Color,
    ColorRGBA = Types.ColorRGBA,
    __ColorRGBA = ColorRGBA,
    ColorHSLA = Types.ColorHSLA,
    __ColorHSLA = ColorHSLA,
    ColorStop = Types.ColorStop,
    __ColorStop = ColorStop,
    LinearGradient = Types.LinearGradient,
    __LinearGradient = LinearGradient,
    RadialGradient = Types.RadialGradient,
    __RadialGradient = RadialGradient,
    List = Types.List,
    __List = List,
    Map = Types.Map,
    __Map = Map,
    ParentheticalExpression = Types.ParentheticalExpression,
    __ParentheticalExpression = ParentheticalExpression,
    FunctionCall = Types.FunctionCall,
    __FunctionCall = FunctionCall,
    Null = Types.Null,
    __Null = Null,
    None = Types.None,
    __None = None,
    True = Types.True,
    __True = True,
    False = Types.False,
    __False = False,
    Ruleset = Types.Ruleset,
    __Ruleset = Ruleset,
    Declaration = Types.Declaration,
    __Declaration = Declaration,
    SelectorPart = Types.SelectorPart,
    __SelectorPart = SelectorPart,
    CompoundSelector = Types.CompoundSelector,
    __CompoundSelector = CompoundSelector,
    MultiPartSelector = Types.MultiPartSelector,
    __MultiPartSelector = MultiPartSelector,
    SelectorList = Types.SelectorList,
    __SelectorList = SelectorList,
    SelectorProperty = Types.SelectorProperty,
    __SelectorProperty = SelectorProperty;

	Fashion.css.register(function(__rt) {
__rt.register({
    map_get:  function (map, key) {return map.get(key);},
    rgba:  function (red, green, blue, alpha, color) {var colorInst;return red&&color&&Fashion.raise("Unsupported arguments to RGBA"),color&&!red?color.$isFashionColor?colorInst=color:Fashion.raise("Unsupported arguments to RGBA"):red&&red.$isFashionColor&&(colorInst=red),colorInst&&(alpha=green||alpha,colorInst=colorInst.getRGBA(),red=new Numeric(colorInst.r),green=new Numeric(colorInst.g),blue=new Numeric(colorInst.b)),red&&red.$isFashionNumber||Fashion.raise(red+" is not a number for 'rgba' red"),green&&green.$isFashionNumber||Fashion.raise(green+" is not a number for 'rgba' green"),blue&&blue.$isFashionNumber||Fashion.raise(blue+" is not a number for 'rgba' blue"),alpha&&alpha.$isFashionNumber||Fashion.raise(alpha+" is not a number for 'rgba' alpha"),"%"==red.unit?red=new Numeric(Color.constrainPercentage(red.value)/100*255):red.value!==Color.constrainChannel(red.value)&&Fashion.raise("Color value "+red+" must be between 0 and 255 inclusive for 'rgba'"),"%"==green.unit?green=new Numeric(Color.constrainPercentage(green.value)/100*255):green.value!==Color.constrainChannel(green.value)&&Fashion.raise("Color value "+green+" must be between 0 and 255 inclusive for 'rgba'"),"%"==blue.unit?blue=new Numeric(Color.constrainPercentage(blue.value)/100*255):blue.value!==Color.constrainChannel(blue.value)&&Fashion.raise("Color value "+blue+" must be between 0 and 255 inclusive for 'rgba'"),"%"==alpha.unit?alpha=new Numeric(Color.constrainPercentage(alpha.value)/100):alpha.value!==Color.constrainAlpha(alpha.value)&&Fashion.raise("Alpha channel "+alpha+" must be between 0 and 1 inclusive for 'rgba'"),new ColorRGBA(red.value,green.value,blue.value,alpha.value);}
});
var __rt_constructor = __rt.constructor.bind(__rt),
    __rt_bool = __rt.bool.bind(__rt),
    __rt_color = __rt.color.bind(__rt),
    __rt_quote = __rt.quote.bind(__rt),
    __rt_unquote = __rt.unquote.bind(__rt),
    __rt_not = __rt.not.bind(__rt),
    __rt_reset = __rt.reset.bind(__rt),
    __rt_run = __rt.run.bind(__rt),
    __rt_createTypesBlock = __rt.createTypesBlock.bind(__rt),
    __rt_createMethodBlock = __rt.createMethodBlock.bind(__rt),
    __rt_createPropertyBlock = __rt.createPropertyBlock.bind(__rt),
    __rt_createPrefixedFunctionBody = __rt.createPrefixedFunctionBody.bind(__rt),
    __rt_createWrappedFn = __rt.createWrappedFn.bind(__rt),
    __rt_callWrappedFn = __rt.callWrappedFn.bind(__rt),
    __rt_compile = __rt.compile.bind(__rt),
    __rt_execute = __rt.execute.bind(__rt),
    __rt_load = __rt.load.bind(__rt),
    __rt_registerProcessor = __rt.registerProcessor.bind(__rt),
    __rt_register = __rt.register.bind(__rt),
    __rt_isRegistered = __rt.isRegistered.bind(__rt),
    __rt_getGlobalScope = __rt.getGlobalScope.bind(__rt),
    __rt_getCurrentScope = __rt.getCurrentScope.bind(__rt),
    __rt_getRegisteredFunctions = __rt.getRegisteredFunctions.bind(__rt),
    __rt_getFunctions = __rt.getFunctions.bind(__rt),
    __rt_getMixins = __rt.getMixins.bind(__rt),
    __rt_createScope = __rt.createScope.bind(__rt),
    __rt_pushScope = __rt.pushScope.bind(__rt),
    __rt_popScope = __rt.popScope.bind(__rt),
    __rt_get = __rt.get.bind(__rt),
    __rt_getScopeForName = __rt.getScopeForName.bind(__rt),
    __rt_getDefault = __rt.getDefault.bind(__rt),
    __rt_getGlobalDefault = __rt.getGlobalDefault.bind(__rt),
    __rt_getLocalDefault = __rt.getLocalDefault.bind(__rt),
    __rt_setGlobal = __rt.setGlobal.bind(__rt),
    __rt_setDynamic = __rt.setDynamic.bind(__rt),
    __rt_setScoped = __rt.setScoped.bind(__rt),
    __rt_set = __rt.set.bind(__rt),
    __rt_getDocs = __rt.getDocs.bind(__rt),
    __rt_getString = __rt.getString.bind(__rt),
    __rt_getAstNode = __rt.getAstNode.bind(__rt),
    __rt_applySplat = __rt.applySplat.bind(__rt),
    __rt_sliceArgs = __rt.sliceArgs.bind(__rt),
    __rt_applySplatArgs = __rt.applySplatArgs.bind(__rt),
    __rt_warn = __rt.warn.bind(__rt),
    __rt_debug = __rt.debug.bind(__rt),
    __rt_setCaches = __rt.setCaches.bind(__rt),
    __rt_copyRuntimeState = __rt.copyRuntimeState.bind(__rt),
    __rt_test = __rt.test.bind(__rt),
    __rt_and = __rt.and.bind(__rt),
    __rt_or = __rt.or.bind(__rt),
    __rt_box = __rt.box.bind(__rt),
    __rt_unbox = __rt.unbox.bind(__rt),
    __rt_Scope = __rt.Scope.bind(__rt),
    __rt_constructor = __rt.constructor.bind(__rt),
    __rt_toString = __rt.toString.bind(__rt),
    __rt_toLocaleString = __rt.toLocaleString.bind(__rt),
    __rt_valueOf = __rt.valueOf.bind(__rt),
    __rt_hasOwnProperty = __rt.hasOwnProperty.bind(__rt),
    __rt_propertyIsEnumerable = __rt.propertyIsEnumerable.bind(__rt),
    __rt_isPrototypeOf = __rt.isPrototypeOf.bind(__rt),
    __rt___defineGetter__ = __rt.__defineGetter__.bind(__rt),
    __rt___defineSetter__ = __rt.__defineSetter__.bind(__rt),
    __rt___lookupGetter__ = __rt.__lookupGetter__.bind(__rt),
    __rt___lookupSetter__ = __rt.__lookupSetter__.bind(__rt),
    __rt_constructor = __rt.constructor.bind(__rt);
var __rt_context = __rt.context,
    __rt_mixins = __rt.mixins,
    __rt_functions = __rt.functions,
    __rt_processors = __rt.processors,
    __rt_registered = __rt.registered,
    __rt_registerSelectorHooks = __rt.registerSelectorHooks,
    __rt_registerAtRuleHook = __rt.registerAtRuleHook,
    __rt_registerStyleHooks = __rt.registerStyleHooks,
    __rt_registerFunctionCallHooks = __rt.registerFunctionCallHooks,
    __rt_docCache = __rt.docCache,
    __rt_stringCache = __rt.stringCache,
    __rt_nodeCache = __rt.nodeCache,
    __rt_code = __rt.code,
    __rt_fn = __rt.fn,
    __rt__currentScope = __rt._currentScope,
    __rt__globalScope = __rt._globalScope,
    __rt__dynamics = __rt._dynamics,
    __rt_css = __rt.css,
    __rt_rulesets = __rt.rulesets,
    __rt_extenders = __rt.extenders,
    __rt__scopeStack = __rt._scopeStack;
Fashion.apply(__rt.functions, {
    material_color:  function ($color_name, $color_variant) {
    __rt_createScope(__rt_functions.material_color && __rt_functions.material_color.createdScope);
    var $color_name = $color_name || __Null;
    __rt_set(__strings.$, $color_name, true);
    var $color_variant = $color_variant || new __Text("500", "'");
    __rt_set(__strings.a, $color_variant, true);
    __rt_set(__strings.A, __rt_box(__rt_registered.map_get.apply(__rt.registered, __rt_applySplatArgs([
        __rt_get("$material_colors"), 
        __rt_get(__strings.$)]))));
    if(__rt_unbox(__rt_get(__strings.A))) {
        __rt_set(__strings._, __rt_box(__rt.registered.map_get.apply(__rt.registered, __rt_applySplatArgs([
            __rt_get(__strings.A), 
            __rt_get(__strings.a)]))));
        if(__rt_unbox(__rt_get(__strings._))) {
            var $$$r = __rt_get(__strings._);
            __rt_popScope();
            return $$$r;
        }
        else {
            __rt_warn(__rt_unbox(new __Text("=> ERROR: COLOR NOT FOUND! <= | ", "\"").operate("+",__rt_get(__strings.$)).operate("+",new __Text(",", "\"")).operate("+",__rt_get(__strings.a)).operate("+",new __Text(" combination did not match any of the material design colors.", "\""))));
        }
    }
    else {
        __rt_warn(__rt_unbox(new __Text("=> ERROR: COLOR NOT FOUND! <= | ", "\"").operate("+",__rt_get(__strings.$)).operate("+",new __Text(" did not match any of the material design colors.", "\""))));
    }
    var $$$r = __ColorRGBA.fromHex("#ff0000");
    __rt_popScope();
    return $$$r;
},
    material_foreground_color:  function ($color_name) {
    __rt_createScope(__rt_functions.material_foreground_color && __rt_functions.material_foreground_color.createdScope);
    var $color_name = $color_name || __Null;
    __rt_set(__strings.$, $color_name, true);
    __rt_set(__strings._, __rt_box(__rt.registered.map_get.apply(__rt.registered, __rt_applySplatArgs([
        __rt_get("$material_foreground_colors"), 
        __rt_get(__strings.$)]))));
    if(__rt_unbox(__rt_get(__strings._))) {
        var $$$r = __rt_get(__strings._);
        __rt_popScope();
        return $$$r;
    }
    else {
        __rt_warn(__rt_unbox(new __Text("=> ERROR: COLOR NOT FOUND! <= | ", "\"").operate("+",__rt_get(__strings.$)).operate("+",new __Text(" did not match any of the material design colors.", "\""))));
    }
    var $$$r = __ColorRGBA.fromHex("#ff0000");
    __rt_popScope();
    return $$$r;
}
});
},
 function(__rt) {
var __rt_constructor = __rt.constructor.bind(__rt),
    __rt_bool = __rt.bool.bind(__rt),
    __rt_color = __rt.color.bind(__rt),
    __rt_quote = __rt.quote.bind(__rt),
    __rt_unquote = __rt.unquote.bind(__rt),
    __rt_not = __rt.not.bind(__rt),
    __rt_reset = __rt.reset.bind(__rt),
    __rt_run = __rt.run.bind(__rt),
    __rt_createTypesBlock = __rt.createTypesBlock.bind(__rt),
    __rt_createMethodBlock = __rt.createMethodBlock.bind(__rt),
    __rt_createPropertyBlock = __rt.createPropertyBlock.bind(__rt),
    __rt_createPrefixedFunctionBody = __rt.createPrefixedFunctionBody.bind(__rt),
    __rt_createWrappedFn = __rt.createWrappedFn.bind(__rt),
    __rt_callWrappedFn = __rt.callWrappedFn.bind(__rt),
    __rt_compile = __rt.compile.bind(__rt),
    __rt_execute = __rt.execute.bind(__rt),
    __rt_load = __rt.load.bind(__rt),
    __rt_registerProcessor = __rt.registerProcessor.bind(__rt),
    __rt_register = __rt.register.bind(__rt),
    __rt_isRegistered = __rt.isRegistered.bind(__rt),
    __rt_getGlobalScope = __rt.getGlobalScope.bind(__rt),
    __rt_getCurrentScope = __rt.getCurrentScope.bind(__rt),
    __rt_getRegisteredFunctions = __rt.getRegisteredFunctions.bind(__rt),
    __rt_getFunctions = __rt.getFunctions.bind(__rt),
    __rt_getMixins = __rt.getMixins.bind(__rt),
    __rt_createScope = __rt.createScope.bind(__rt),
    __rt_pushScope = __rt.pushScope.bind(__rt),
    __rt_popScope = __rt.popScope.bind(__rt),
    __rt_get = __rt.get.bind(__rt),
    __rt_getScopeForName = __rt.getScopeForName.bind(__rt),
    __rt_getDefault = __rt.getDefault.bind(__rt),
    __rt_getGlobalDefault = __rt.getGlobalDefault.bind(__rt),
    __rt_getLocalDefault = __rt.getLocalDefault.bind(__rt),
    __rt_setGlobal = __rt.setGlobal.bind(__rt),
    __rt_setDynamic = __rt.setDynamic.bind(__rt),
    __rt_setScoped = __rt.setScoped.bind(__rt),
    __rt_set = __rt.set.bind(__rt),
    __rt_getDocs = __rt.getDocs.bind(__rt),
    __rt_getString = __rt.getString.bind(__rt),
    __rt_getAstNode = __rt.getAstNode.bind(__rt),
    __rt_applySplat = __rt.applySplat.bind(__rt),
    __rt_sliceArgs = __rt.sliceArgs.bind(__rt),
    __rt_applySplatArgs = __rt.applySplatArgs.bind(__rt),
    __rt_warn = __rt.warn.bind(__rt),
    __rt_debug = __rt.debug.bind(__rt),
    __rt_setCaches = __rt.setCaches.bind(__rt),
    __rt_copyRuntimeState = __rt.copyRuntimeState.bind(__rt),
    __rt_test = __rt.test.bind(__rt),
    __rt_and = __rt.and.bind(__rt),
    __rt_or = __rt.or.bind(__rt),
    __rt_box = __rt.box.bind(__rt),
    __rt_unbox = __rt.unbox.bind(__rt),
    __rt_Scope = __rt.Scope.bind(__rt),
    __rt_constructor = __rt.constructor.bind(__rt),
    __rt_toString = __rt.toString.bind(__rt),
    __rt_toLocaleString = __rt.toLocaleString.bind(__rt),
    __rt_valueOf = __rt.valueOf.bind(__rt),
    __rt_hasOwnProperty = __rt.hasOwnProperty.bind(__rt),
    __rt_propertyIsEnumerable = __rt.propertyIsEnumerable.bind(__rt),
    __rt_isPrototypeOf = __rt.isPrototypeOf.bind(__rt),
    __rt___defineGetter__ = __rt.__defineGetter__.bind(__rt),
    __rt___defineSetter__ = __rt.__defineSetter__.bind(__rt),
    __rt___lookupGetter__ = __rt.__lookupGetter__.bind(__rt),
    __rt___lookupSetter__ = __rt.__lookupSetter__.bind(__rt),
    __rt_constructor = __rt.constructor.bind(__rt);
var __rt_context = __rt.context,
    __rt_mixins = __rt.mixins,
    __rt_functions = __rt.functions,
    __rt_processors = __rt.processors,
    __rt_registered = __rt.registered,
    __rt_registerSelectorHooks = __rt.registerSelectorHooks,
    __rt_registerAtRuleHook = __rt.registerAtRuleHook,
    __rt_registerStyleHooks = __rt.registerStyleHooks,
    __rt_registerFunctionCallHooks = __rt.registerFunctionCallHooks,
    __rt_docCache = __rt.docCache,
    __rt_stringCache = __rt.stringCache,
    __rt_nodeCache = __rt.nodeCache,
    __rt_code = __rt.code,
    __rt_fn = __rt.fn,
    __rt__currentScope = __rt._currentScope,
    __rt__globalScope = __rt._globalScope,
    __rt__dynamics = __rt._dynamics,
    __rt_css = __rt.css,
    __rt_rulesets = __rt.rulesets,
    __rt_extenders = __rt.extenders,
    __rt__scopeStack = __rt._scopeStack;
__rt_setDynamic("$dark-mode", __rt_getGlobalDefault("$dark_mode") || __False, 0);
__rt_setDynamic("$base_color_name", __rt_getGlobalDefault("$base_color_name") || new __Text("blue", "'"), 1);
__rt_setDynamic("$material-colors", __rt_getGlobalDefault("$material_colors") || new __Map([new __Text("red", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#ffebee"), new __Text("100", "'"), __ColorRGBA.fromHex("#ffcdd2"), new __Text("200", "'"), __ColorRGBA.fromHex("#ef9a9a"), new __Text("300", "'"), __ColorRGBA.fromHex("#e57373"), new __Text("400", "'"), __ColorRGBA.fromHex("#ef5350"), new __Text("500", "'"), __ColorRGBA.fromHex("#f44336"), new __Text("600", "'"), __ColorRGBA.fromHex("#e53935"), new __Text("700", "'"), __ColorRGBA.fromHex("#d32f2f"), new __Text("800", "'"), __ColorRGBA.fromHex("#c62828"), new __Text("900", "'"), __ColorRGBA.fromHex("#b71c1c"), new __Text("a100", "'"), __ColorRGBA.fromHex("#ff8a80"), new __Text("a200", "'"), __ColorRGBA.fromHex("#ff5252"), new __Text("a400", "'"), __ColorRGBA.fromHex("#ff1744"), new __Text("a700", "'"), __ColorRGBA.fromHex("#d50000")]), new __Text("pink", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#fce4ec"), new __Text("100", "'"), __ColorRGBA.fromHex("#f8bbd0"), new __Text("200", "'"), __ColorRGBA.fromHex("#f48fb1"), new __Text("300", "'"), __ColorRGBA.fromHex("#f06292"), new __Text("400", "'"), __ColorRGBA.fromHex("#ec407a"), new __Text("500", "'"), __ColorRGBA.fromHex("#e91e63"), new __Text("600", "'"), __ColorRGBA.fromHex("#d81b60"), new __Text("700", "'"), __ColorRGBA.fromHex("#c2185b"), new __Text("800", "'"), __ColorRGBA.fromHex("#ad1457"), new __Text("900", "'"), __ColorRGBA.fromHex("#880e4f"), new __Text("a100", "'"), __ColorRGBA.fromHex("#ff80ab"), new __Text("a200", "'"), __ColorRGBA.fromHex("#ff4081"), new __Text("a400", "'"), __ColorRGBA.fromHex("#f50057"), new __Text("a700", "'"), __ColorRGBA.fromHex("#c51162")]), new __Text("purple", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#f3e5f5"), new __Text("100", "'"), __ColorRGBA.fromHex("#e1bee7"), new __Text("200", "'"), __ColorRGBA.fromHex("#ce93d8"), new __Text("300", "'"), __ColorRGBA.fromHex("#ba68c8"), new __Text("400", "'"), __ColorRGBA.fromHex("#ab47bc"), new __Text("500", "'"), __ColorRGBA.fromHex("#9c27b0"), new __Text("600", "'"), __ColorRGBA.fromHex("#8e24aa"), new __Text("700", "'"), __ColorRGBA.fromHex("#7b1fa2"), new __Text("800", "'"), __ColorRGBA.fromHex("#6a1b9a"), new __Text("900", "'"), __ColorRGBA.fromHex("#4a148c"), new __Text("a100", "'"), __ColorRGBA.fromHex("#ea80fc"), new __Text("a200", "'"), __ColorRGBA.fromHex("#e040fb"), new __Text("a400", "'"), __ColorRGBA.fromHex("#d500f9"), new __Text("a700", "'"), __ColorRGBA.fromHex("#aa00ff")]), new __Text("deep-purple", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#ede7f6"), new __Text("100", "'"), __ColorRGBA.fromHex("#d1c4e9"), new __Text("200", "'"), __ColorRGBA.fromHex("#b39ddb"), new __Text("300", "'"), __ColorRGBA.fromHex("#9575cd"), new __Text("400", "'"), __ColorRGBA.fromHex("#7e57c2"), new __Text("500", "'"), __ColorRGBA.fromHex("#673ab7"), new __Text("600", "'"), __ColorRGBA.fromHex("#5e35b1"), new __Text("700", "'"), __ColorRGBA.fromHex("#512da8"), new __Text("800", "'"), __ColorRGBA.fromHex("#4527a0"), new __Text("900", "'"), __ColorRGBA.fromHex("#311b92"), new __Text("a100", "'"), __ColorRGBA.fromHex("#b388ff"), new __Text("a200", "'"), __ColorRGBA.fromHex("#7c4dff"), new __Text("a400", "'"), __ColorRGBA.fromHex("#651fff"), new __Text("a700", "'"), __ColorRGBA.fromHex("#6200ea")]), new __Text("indigo", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#e8eaf6"), new __Text("100", "'"), __ColorRGBA.fromHex("#c5cae9"), new __Text("200", "'"), __ColorRGBA.fromHex("#9fa8da"), new __Text("300", "'"), __ColorRGBA.fromHex("#7986cb"), new __Text("400", "'"), __ColorRGBA.fromHex("#5c6bc0"), new __Text("500", "'"), __ColorRGBA.fromHex("#3f51b5"), new __Text("600", "'"), __ColorRGBA.fromHex("#3949ab"), new __Text("700", "'"), __ColorRGBA.fromHex("#303f9f"), new __Text("800", "'"), __ColorRGBA.fromHex("#283593"), new __Text("900", "'"), __ColorRGBA.fromHex("#1a237e"), new __Text("a100", "'"), __ColorRGBA.fromHex("#8c9eff"), new __Text("a200", "'"), __ColorRGBA.fromHex("#536dfe"), new __Text("a400", "'"), __ColorRGBA.fromHex("#3d5afe"), new __Text("a700", "'"), __ColorRGBA.fromHex("#304ffe")]), new __Text("blue", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#e3f2fd"), new __Text("100", "'"), __ColorRGBA.fromHex("#bbdefb"), new __Text("200", "'"), __ColorRGBA.fromHex("#90caf9"), new __Text("300", "'"), __ColorRGBA.fromHex("#64b5f6"), new __Text("400", "'"), __ColorRGBA.fromHex("#42a5f5"), new __Text("500", "'"), __ColorRGBA.fromHex("#2196f3"), new __Text("600", "'"), __ColorRGBA.fromHex("#1e88e5"), new __Text("700", "'"), __ColorRGBA.fromHex("#1976d2"), new __Text("800", "'"), __ColorRGBA.fromHex("#1565c0"), new __Text("900", "'"), __ColorRGBA.fromHex("#0d47a1"), new __Text("a100", "'"), __ColorRGBA.fromHex("#82b1ff"), new __Text("a200", "'"), __ColorRGBA.fromHex("#448aff"), new __Text("a400", "'"), __ColorRGBA.fromHex("#2979ff"), new __Text("a700", "'"), __ColorRGBA.fromHex("#2962ff")]), new __Text("light-blue", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#e1f5fe"), new __Text("100", "'"), __ColorRGBA.fromHex("#b3e5fc"), new __Text("200", "'"), __ColorRGBA.fromHex("#81d4fa"), new __Text("300", "'"), __ColorRGBA.fromHex("#4fc3f7"), new __Text("400", "'"), __ColorRGBA.fromHex("#29b6f6"), new __Text("500", "'"), __ColorRGBA.fromHex("#03a9f4"), new __Text("600", "'"), __ColorRGBA.fromHex("#039be5"), new __Text("700", "'"), __ColorRGBA.fromHex("#0288d1"), new __Text("800", "'"), __ColorRGBA.fromHex("#0277bd"), new __Text("900", "'"), __ColorRGBA.fromHex("#01579b"), new __Text("a100", "'"), __ColorRGBA.fromHex("#80d8ff"), new __Text("a200", "'"), __ColorRGBA.fromHex("#40c4ff"), new __Text("a400", "'"), __ColorRGBA.fromHex("#00b0ff"), new __Text("a700", "'"), __ColorRGBA.fromHex("#0091ea")]), new __Text("cyan", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#e0f7fa"), new __Text("100", "'"), __ColorRGBA.fromHex("#b2ebf2"), new __Text("200", "'"), __ColorRGBA.fromHex("#80deea"), new __Text("300", "'"), __ColorRGBA.fromHex("#4dd0e1"), new __Text("400", "'"), __ColorRGBA.fromHex("#26c6da"), new __Text("500", "'"), __ColorRGBA.fromHex("#00bcd4"), new __Text("600", "'"), __ColorRGBA.fromHex("#00acc1"), new __Text("700", "'"), __ColorRGBA.fromHex("#0097a7"), new __Text("800", "'"), __ColorRGBA.fromHex("#00838f"), new __Text("900", "'"), __ColorRGBA.fromHex("#006064"), new __Text("a100", "'"), __ColorRGBA.fromHex("#84ffff"), new __Text("a200", "'"), __ColorRGBA.fromHex("#18ffff"), new __Text("a400", "'"), __ColorRGBA.fromHex("#00e5ff"), new __Text("a700", "'"), __ColorRGBA.fromHex("#00b8d4")]), new __Text("teal", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#e0f2f1"), new __Text("100", "'"), __ColorRGBA.fromHex("#b2dfdb"), new __Text("200", "'"), __ColorRGBA.fromHex("#80cbc4"), new __Text("300", "'"), __ColorRGBA.fromHex("#4db6ac"), new __Text("400", "'"), __ColorRGBA.fromHex("#26a69a"), new __Text("500", "'"), __ColorRGBA.fromHex("#009688"), new __Text("600", "'"), __ColorRGBA.fromHex("#00897b"), new __Text("700", "'"), __ColorRGBA.fromHex("#00796b"), new __Text("800", "'"), __ColorRGBA.fromHex("#00695c"), new __Text("900", "'"), __ColorRGBA.fromHex("#004d40"), new __Text("a100", "'"), __ColorRGBA.fromHex("#a7ffeb"), new __Text("a200", "'"), __ColorRGBA.fromHex("#64ffda"), new __Text("a400", "'"), __ColorRGBA.fromHex("#1de9b6"), new __Text("a700", "'"), __ColorRGBA.fromHex("#00bfa5")]), new __Text("green", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#e8f5e9"), new __Text("100", "'"), __ColorRGBA.fromHex("#c8e6c9"), new __Text("200", "'"), __ColorRGBA.fromHex("#a5d6a7"), new __Text("300", "'"), __ColorRGBA.fromHex("#81c784"), new __Text("400", "'"), __ColorRGBA.fromHex("#66bb6a"), new __Text("500", "'"), __ColorRGBA.fromHex("#4caf50"), new __Text("600", "'"), __ColorRGBA.fromHex("#43a047"), new __Text("700", "'"), __ColorRGBA.fromHex("#388e3c"), new __Text("800", "'"), __ColorRGBA.fromHex("#2e7d32"), new __Text("900", "'"), __ColorRGBA.fromHex("#1b5e20"), new __Text("a100", "'"), __ColorRGBA.fromHex("#b9f6ca"), new __Text("a200", "'"), __ColorRGBA.fromHex("#69f0ae"), new __Text("a400", "'"), __ColorRGBA.fromHex("#00e676"), new __Text("a700", "'"), __ColorRGBA.fromHex("#00c853")]), new __Text("light-green", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#f1f8e9"), new __Text("100", "'"), __ColorRGBA.fromHex("#dcedc8"), new __Text("200", "'"), __ColorRGBA.fromHex("#c5e1a5"), new __Text("300", "'"), __ColorRGBA.fromHex("#aed581"), new __Text("400", "'"), __ColorRGBA.fromHex("#9ccc65"), new __Text("500", "'"), __ColorRGBA.fromHex("#8bc34a"), new __Text("600", "'"), __ColorRGBA.fromHex("#7cb342"), new __Text("700", "'"), __ColorRGBA.fromHex("#689f38"), new __Text("800", "'"), __ColorRGBA.fromHex("#558b2f"), new __Text("900", "'"), __ColorRGBA.fromHex("#33691e"), new __Text("a100", "'"), __ColorRGBA.fromHex("#ccff90"), new __Text("a200", "'"), __ColorRGBA.fromHex("#b2ff59"), new __Text("a400", "'"), __ColorRGBA.fromHex("#76ff03"), new __Text("a700", "'"), __ColorRGBA.fromHex("#64dd17")]), new __Text("lime", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#f9fbe7"), new __Text("100", "'"), __ColorRGBA.fromHex("#f0f4c3"), new __Text("200", "'"), __ColorRGBA.fromHex("#e6ee9c"), new __Text("300", "'"), __ColorRGBA.fromHex("#dce775"), new __Text("400", "'"), __ColorRGBA.fromHex("#d4e157"), new __Text("500", "'"), __ColorRGBA.fromHex("#cddc39"), new __Text("600", "'"), __ColorRGBA.fromHex("#c0ca33"), new __Text("700", "'"), __ColorRGBA.fromHex("#afb42b"), new __Text("800", "'"), __ColorRGBA.fromHex("#9e9d24"), new __Text("900", "'"), __ColorRGBA.fromHex("#827717"), new __Text("a100", "'"), __ColorRGBA.fromHex("#f4ff81"), new __Text("a200", "'"), __ColorRGBA.fromHex("#eeff41"), new __Text("a400", "'"), __ColorRGBA.fromHex("#c6ff00"), new __Text("a700", "'"), __ColorRGBA.fromHex("#aeea00")]), new __Text("yellow", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#fffde7"), new __Text("100", "'"), __ColorRGBA.fromHex("#fff9c4"), new __Text("200", "'"), __ColorRGBA.fromHex("#fff59d"), new __Text("300", "'"), __ColorRGBA.fromHex("#fff176"), new __Text("400", "'"), __ColorRGBA.fromHex("#ffee58"), new __Text("500", "'"), __ColorRGBA.fromHex("#ffeb3b"), new __Text("600", "'"), __ColorRGBA.fromHex("#fdd835"), new __Text("700", "'"), __ColorRGBA.fromHex("#fbc02d"), new __Text("800", "'"), __ColorRGBA.fromHex("#f9a825"), new __Text("900", "'"), __ColorRGBA.fromHex("#f57f17"), new __Text("a100", "'"), __ColorRGBA.fromHex("#ffff8d"), new __Text("a200", "'"), __ColorRGBA.fromHex("#ffff00"), new __Text("a400", "'"), __ColorRGBA.fromHex("#ffea00"), new __Text("a700", "'"), __ColorRGBA.fromHex("#ffd600")]), new __Text("amber", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#fff8e1"), new __Text("100", "'"), __ColorRGBA.fromHex("#ffecb3"), new __Text("200", "'"), __ColorRGBA.fromHex("#ffe082"), new __Text("300", "'"), __ColorRGBA.fromHex("#ffd54f"), new __Text("400", "'"), __ColorRGBA.fromHex("#ffca28"), new __Text("500", "'"), __ColorRGBA.fromHex("#ffc107"), new __Text("600", "'"), __ColorRGBA.fromHex("#ffb300"), new __Text("700", "'"), __ColorRGBA.fromHex("#ffa000"), new __Text("800", "'"), __ColorRGBA.fromHex("#ff8f00"), new __Text("900", "'"), __ColorRGBA.fromHex("#ff6f00"), new __Text("a100", "'"), __ColorRGBA.fromHex("#ffe57f"), new __Text("a200", "'"), __ColorRGBA.fromHex("#ffd740"), new __Text("a400", "'"), __ColorRGBA.fromHex("#ffc400"), new __Text("a700", "'"), __ColorRGBA.fromHex("#ffab00")]), new __Text("orange", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#fff3e0"), new __Text("100", "'"), __ColorRGBA.fromHex("#ffe0b2"), new __Text("200", "'"), __ColorRGBA.fromHex("#ffcc80"), new __Text("300", "'"), __ColorRGBA.fromHex("#ffb74d"), new __Text("400", "'"), __ColorRGBA.fromHex("#ffa726"), new __Text("500", "'"), __ColorRGBA.fromHex("#ff9800"), new __Text("600", "'"), __ColorRGBA.fromHex("#fb8c00"), new __Text("700", "'"), __ColorRGBA.fromHex("#f57c00"), new __Text("800", "'"), __ColorRGBA.fromHex("#ef6c00"), new __Text("900", "'"), __ColorRGBA.fromHex("#e65100"), new __Text("a100", "'"), __ColorRGBA.fromHex("#ffd180"), new __Text("a200", "'"), __ColorRGBA.fromHex("#ffab40"), new __Text("a400", "'"), __ColorRGBA.fromHex("#ff9100"), new __Text("a700", "'"), __ColorRGBA.fromHex("#ff6d00")]), new __Text("deep-orange", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#fbe9e7"), new __Text("100", "'"), __ColorRGBA.fromHex("#ffccbc"), new __Text("200", "'"), __ColorRGBA.fromHex("#ffab91"), new __Text("300", "'"), __ColorRGBA.fromHex("#ff8a65"), new __Text("400", "'"), __ColorRGBA.fromHex("#ff7043"), new __Text("500", "'"), __ColorRGBA.fromHex("#ff5722"), new __Text("600", "'"), __ColorRGBA.fromHex("#f4511e"), new __Text("700", "'"), __ColorRGBA.fromHex("#e64a19"), new __Text("800", "'"), __ColorRGBA.fromHex("#d84315"), new __Text("900", "'"), __ColorRGBA.fromHex("#bf360c"), new __Text("a100", "'"), __ColorRGBA.fromHex("#ff9e80"), new __Text("a200", "'"), __ColorRGBA.fromHex("#ff6e40"), new __Text("a400", "'"), __ColorRGBA.fromHex("#ff3d00"), new __Text("a700", "'"), __ColorRGBA.fromHex("#dd2c00")]), new __Text("brown", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#efebe9"), new __Text("100", "'"), __ColorRGBA.fromHex("#d7ccc8"), new __Text("200", "'"), __ColorRGBA.fromHex("#bcaaa4"), new __Text("300", "'"), __ColorRGBA.fromHex("#a1887f"), new __Text("400", "'"), __ColorRGBA.fromHex("#8d6e63"), new __Text("500", "'"), __ColorRGBA.fromHex("#795548"), new __Text("600", "'"), __ColorRGBA.fromHex("#6d4c41"), new __Text("700", "'"), __ColorRGBA.fromHex("#5d4037"), new __Text("800", "'"), __ColorRGBA.fromHex("#4e342e"), new __Text("900", "'"), __ColorRGBA.fromHex("#3e2723")]), new __Text("grey", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#fafafa"), new __Text("100", "'"), __ColorRGBA.fromHex("#f5f5f5"), new __Text("200", "'"), __ColorRGBA.fromHex("#eeeeee"), new __Text("300", "'"), __ColorRGBA.fromHex("#e0e0e0"), new __Text("400", "'"), __ColorRGBA.fromHex("#bdbdbd"), new __Text("500", "'"), __ColorRGBA.fromHex("#9e9e9e"), new __Text("600", "'"), __ColorRGBA.fromHex("#757575"), new __Text("700", "'"), __ColorRGBA.fromHex("#616161"), new __Text("800", "'"), __ColorRGBA.fromHex("#424242"), new __Text("900", "'"), __ColorRGBA.fromHex("#212121")]), new __Text("blue-grey", "'"), new __Map([new __Text("50", "'"), __ColorRGBA.fromHex("#eceff1"), new __Text("100", "'"), __ColorRGBA.fromHex("#cfd8dc"), new __Text("200", "'"), __ColorRGBA.fromHex("#b0bec5"), new __Text("300", "'"), __ColorRGBA.fromHex("#90a4ae"), new __Text("400", "'"), __ColorRGBA.fromHex("#78909c"), new __Text("500", "'"), __ColorRGBA.fromHex("#607d8b"), new __Text("600", "'"), __ColorRGBA.fromHex("#546e7a"), new __Text("700", "'"), __ColorRGBA.fromHex("#455a64"), new __Text("800", "'"), __ColorRGBA.fromHex("#37474f"), new __Text("900", "'"), __ColorRGBA.fromHex("#263238"), new __Text("1000", "'"), __ColorRGBA.fromHex("#11171a")])]), 2);
__rt_setDynamic("$base-color", __rt_getGlobalDefault("$base_color") || __rt_box((__rt_functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$base_color_name"), 
    new __Text("500", "'")]))), 3);
__rt_setDynamic("$base-highlight-color", __rt_getGlobalDefault("$base_highlight_color") || __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$base_color_name"), 
    new __Text("300", "'")]))), 4);
__rt_setDynamic("$base-light-color", __rt_getGlobalDefault("$base_light_color") || __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$base_color_name"), 
    new __Text("100", "'")]))), 5);
__rt_setDynamic("$base-dark-color", __rt_getGlobalDefault("$base_dark_color") || __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$base_color_name"), 
    new __Text("700", "'")]))), 6);
__rt_setDynamic("$base-pressed-color", __rt_getGlobalDefault("$base_pressed_color") || __rt_box(__rt_registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$base_color"), 
    new __Numeric(0.8), 
    __udf, 
    __udf, 
    __udf]))), 7);
__rt_setDynamic("$base-invisible-color", __rt_getGlobalDefault("$base_invisible_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$base_color"), 
    new __Numeric(0), 
    __udf, 
    __udf, 
    __udf]))), 8);
__rt_setDynamic("$material-foreground-colors", __rt_getGlobalDefault("$material_foreground_colors") || new __Map([new __Text("red", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("pink", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("purple", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("deep-purple", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("indigo", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("blue", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("light-blue", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("cyan", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("teal", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("green", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("light-green", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("lime", "'"), __ColorRGBA.fromHex("#111111"), new __Text("yellow", "'"), __ColorRGBA.fromHex("#111111"), new __Text("amber", "'"), __ColorRGBA.fromHex("#111111"), new __Text("orange", "'"), __ColorRGBA.fromHex("#111111"), new __Text("deep-orange", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("brown", "'"), __ColorRGBA.fromHex("#ffffff"), new __Text("grey", "'"), __ColorRGBA.fromHex("#111111"), new __Text("blue-grey", "'"), __ColorRGBA.fromHex("#ffffff")]), 9);
__rt_setDynamic("$base-foreground-color", __rt_getGlobalDefault("$base_foreground_color") || __rt_box((__rt.functions.material_foreground_color || material_foreground_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$base_color_name")]))), 10);
__rt_setDynamic("$accent_color_name", __rt_getGlobalDefault("$accent_color_name") || new __Text("orange", "'"), 11);
__rt_setDynamic("$accent-color", __rt_getGlobalDefault("$accent_color") || __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$accent_color_name"), 
    new __Text("500", "'")]))), 12);
__rt_setDynamic("$accent-light-color", __rt_getGlobalDefault("$accent_light_color") || __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$accent_color_name"), 
    new __Text("100", "'")]))), 13);
__rt_setDynamic("$accent-dark-color", __rt_getGlobalDefault("$accent_dark_color") || __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$accent_color_name"), 
    new __Text("700", "'")]))), 14);
__rt_setDynamic("$accent-pressed-color", __rt_getGlobalDefault("$accent_pressed_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$accent_color"), 
    new __Numeric(0.8), 
    __udf, 
    __udf, 
    __udf]))), 15);
__rt_setDynamic("$accent-invisible-color", __rt_getGlobalDefault("$accent_invisible_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$accent_color"), 
    new __Numeric(0), 
    __udf, 
    __udf, 
    __udf]))), 16);
__rt_setDynamic("$accent-foreground-color", __rt_getGlobalDefault("$accent_foreground_color") || __rt_box((__rt.functions.material_foreground_color || material_foreground_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$accent_color_name")]))), 17);
__rt_setDynamic("$confirm-color", __rt_getGlobalDefault("$confirm_color") || __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    new __Text("light-green", "'"), 
    new __Text("600", "'")]))), 18);
__rt_setDynamic("$confirm-pressed-color", __rt_getGlobalDefault("$confirm_pressed_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$confirm_color"), 
    new __Numeric(0.8), 
    __udf, 
    __udf, 
    __udf]))), 19);
__rt_setDynamic("$alert-color", __rt_getGlobalDefault("$alert_color") || __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    new __Text("red", "'"), 
    new __Text("800", "'")]))), 20);
__rt_setDynamic("$alert-pressed-color", __rt_getGlobalDefault("$alert_pressed_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$alert_color"), 
    new __Numeric(0.8), 
    __udf, 
    __udf, 
    __udf]))), 21);
__rt_setDynamic(__strings._, __rt_getGlobalDefault(__strings._) || (__rt_test(__rt_get("$dark_mode")) ? __ColorRGBA.fromHex("#fff") : __ColorRGBA.fromHex("#111111")), 22);
__rt_setDynamic("$highlight-color", __rt_getGlobalDefault("$highlight_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get(__strings._), 
    new __Numeric(0.54), 
    __udf, 
    __udf, 
    __udf]))), 23);
__rt_setDynamic("$disabled-color", __rt_getGlobalDefault("$disabled_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get(__strings._), 
    new __Numeric(0.38), 
    __udf, 
    __udf, 
    __udf]))), 24);
__rt_setDynamic("$divider-color", __rt_getGlobalDefault("$divider_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get(__strings._), 
    new __Numeric(0.12), 
    __udf, 
    __udf, 
    __udf]))), 25);
__rt_setDynamic("$reverse-color", __rt_getGlobalDefault("$reverse_color") || (__rt_test(__rt_get("$dark_mode")) ? __ColorRGBA.fromHex("#222") : __ColorRGBA.fromHex("#fff")), 26);
__rt_setDynamic("$reverse-highlight-color", __rt_getGlobalDefault("$reverse_highlight_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$reverse_color"), 
    new __Numeric(0.54), 
    __udf, 
    __udf, 
    __udf]))), 27);
__rt_setDynamic("$reverse-disabled-color", __rt_getGlobalDefault("$reverse_disabled_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$reverse_color"), 
    new __Numeric(0.38), 
    __udf, 
    __udf, 
    __udf]))), 28);
__rt_setDynamic("$reverse-divider-color", __rt_getGlobalDefault("$reverse_divider_color") || __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __rt_get("$reverse_color"), 
    new __Numeric(0.12), 
    __udf, 
    __udf, 
    __udf]))), 29);
__rt_setDynamic("$background-color", __rt_getGlobalDefault("$background_color") || (__rt_test(__rt_get("$dark_mode")) ? __ColorRGBA.fromHex("#303030") : __ColorRGBA.fromHex("#fafafa")), 30);
__rt_setDynamic("$alt-background-color", __rt_getGlobalDefault("$alt_background_color") || (__rt_test(__rt_get("$dark_mode")) ? __ColorRGBA.fromHex("#3a3a3a") : __ColorRGBA.fromHex("#f5f5f5")), 31);
__rt_setDynamic("$reverse-background-color", __rt_getGlobalDefault("$reverse_background_color") || (__rt_test(__rt_get("$dark_mode")) ? __ColorRGBA.fromHex("#fafafa") : __ColorRGBA.fromHex("#303030")), 32);
__rt_setDynamic("$reverse-alt-background-color", __rt_getGlobalDefault("$reverse_alt_background_color") || (__rt_test(__rt_get("$dark_mode")) ? __ColorRGBA.fromHex("#f5f5f5") : __ColorRGBA.fromHex("#3a3a3a")), 33);
__rt_setDynamic("$faded-color", __rt_getGlobalDefault("$faded_color") || (__rt_test(__rt_get("$dark_mode")) ? __ColorRGBA.fromHex("#4d4d4d") : __ColorRGBA.fromHex("#c3c3c3")), 34);
__rt_setDynamic("$overlay-color", __rt_getGlobalDefault("$overlay_color") || (__rt_test(__rt_get("$dark_mode")) ? __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __ColorRGBA.fromHex("#fff"), 
    new __Numeric(0.03), 
    __udf, 
    __udf, 
    __udf]))) : __rt_box(__rt.registered.rgba.apply(__rt.registered, __rt_applySplatArgs([
    __ColorRGBA.fromHex("#000"), 
    new __Numeric(0.03), 
    __udf, 
    __udf, 
    __udf])))), 35);
__rt_setDynamic("$content-padding", __rt_getGlobalDefault("$content_padding") || new __Numeric(16, "px"), 36);
__rt_setDynamic("$listitem-selected-background-color", __rt_getGlobalDefault("$listitem_selected_background_color") || (__rt_test(__rt_get("$dark_mode")) ? __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$base_color_name"), 
    new __Text("700", "'")]))) : __rt_box((__rt.functions.material_color || material_color__fn).apply(__rt.functions, __rt_applySplatArgs([
    __rt_get("$base_color_name"), 
    new __Text("200", "'")])))), 37);
},
 {
	":root": [
		"dark-mode",
		"base-color",
		"base-highlight-color",
		"base-light-color",
		"base-dark-color",
		"base-pressed-color",
		"base-invisible-color",
		"base-foreground-color",
		"accent-color",
		"accent-light-color",
		"accent-dark-color",
		"accent-pressed-color",
		"accent-invisible-color",
		"accent-foreground-color",
		"confirm-color",
		"confirm-pressed-color",
		"alert-color",
		"alert-pressed-color",
		__names._,
		"highlight-color",
		"disabled-color",
		"divider-color",
		"reverse-color",
		"reverse-highlight-color",
		"reverse-disabled-color",
		"reverse-divider-color",
		"background-color",
		"alt-background-color",
		"reverse-background-color",
		"reverse-alt-background-color",
		"faded-color",
		"overlay-color",
		"content-padding",
		"listitem-selected-background-color"
	],
	"html": [
		"base_color_name",
		"accent_color_name"
	]});
})(Fashion);