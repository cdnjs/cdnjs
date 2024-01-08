/*

	国际化，网页自动翻译。
	作者：管雷鸣
	开原仓库：https://github.com/xnx3/translate

 */
var translate = {
	/*
	 * 当前的版本
	 */
	version:'2.10.0.20231214',
	useVersion:'v1',	//当前使用的版本，默认使用v1. 可使用 setUseVersion2(); //来设置使用v2
	setUseVersion2:function(){
		translate.useVersion = 'v2';
	},
	/*
	 * 翻译的对象，也就是 new google.translate.TranslateElement(...)
	 * 已废弃，v1使用的
	 */
	translate:null,
	/*
	 * 支持哪些语言切换，包括：de,hi,lt,hr,lv,ht,hu,zh-CN,hy,uk,mg,id,ur,mk,ml,mn,af,mr,uz,ms,el,mt,is,it,my,es,et,eu,ar,pt-PT,ja,ne,az,fa,ro,nl,en-GB,no,be,fi,ru,bg,fr,bs,sd,se,si,sk,sl,ga,sn,so,gd,ca,sq,sr,kk,st,km,kn,sv,ko,sw,gl,zh-TW,pt-BR,co,ta,gu,ky,cs,pa,te,tg,th,la,cy,pl,da,tr
	 * 已废弃，请使用 translate.selectLanguageTag.languages 
	 */
	includedLanguages:'zh-CN,zh-TW,en',
	/*
	 * 资源文件url的路径
	 * 已废弃，v1使用的
 	 */
	resourcesUrl:'//res.zvo.cn/translate',

	/**
	 * 默认出现的选择语言的 select 选择框，可以通过这个选择切换语言。
	 */
	selectLanguageTag:{
		/* 是否显示 select选择语言的选择框，true显示； false不显示。默认为true */
		show:true,
		/* 
			支持哪些语言切换
			v1.x 版本包括：de,hi,lt,hr,lv,ht,hu,zh-CN,hy,uk,mg,id,ur,mk,ml,mn,af,mr,uz,ms,el,mt,is,it,my,es,et,eu,ar,pt-PT,ja,ne,az,fa,ro,nl,en-GB,no,be,fi,ru,bg,fr,bs,sd,se,si,sk,sl,ga,sn,so,gd,ca,sq,sr,kk,st,km,kn,sv,ko,sw,gl,zh-TW,pt-BR,co,ta,gu,ky,cs,pa,te,tg,th,la,cy,pl,da,tr 
			v2.x 版本根据后端翻译服务不同，支持的语言也不同。具体支持哪些，可通过 http://api.translate.zvo.cn/doc/language.json.html 获取 （如果您私有部署的，将请求域名换为您自己私有部署的域名）
		*/
		languages:'',
		alreadyRender:false, //当前是否已渲染过了 true为是 v2.2增加
		selectOnChange:function(event){
			var language = event.target.value;
			translate.changeLanguage(language);
		},
		render:function(){ //v2增加
			if(translate.selectLanguageTag.alreadyRender){
				return;
			}
			translate.selectLanguageTag.alreadyRender = true;
			
			//判断如果不显示select选择语言，直接就隐藏掉
			if(!translate.selectLanguageTag.show){
				return;
			}
			
			//判断translate 的id是否存在，不存在就创建一个
			if(document.getElementById('translate') == null){
				var body_trans = document.getElementsByTagName('body')[0];
				var div = document.createElement("div");  //创建一个script标签
				div.id="translate";
				body_trans.appendChild(div);
			}else{
				//存在，那么判断一下 select是否存在，要是存在就不重复创建了
				if(document.getElementById('translateSelectLanguage') != null){
					//select存在了，就不重复创建了
					return;
				}
			}
			
			//从服务器加载支持的语言库
			translate.request.post(translate.request.api.language, {}, function(data){
				if(data.result == 0){
					console.log('load language list error : '+data.info);
					return;
				}
			
				//select的onchange事件
				var onchange = function(event){ translate.selectLanguageTag.selectOnChange(event); }
				
				//创建 select 标签
				var selectLanguage = document.createElement("select"); 
				selectLanguage.id = 'translateSelectLanguage';
				selectLanguage.className = 'translateSelectLanguage';
				for(var i = 0; i<data.list.length; i++){
					var option = document.createElement("option"); 
				    option.setAttribute("value",data.list[i].id);

				    //判断 selectLanguageTag.languages 中允许使用哪些

					if(translate.selectLanguageTag.languages.length > 0){
						//设置了自定义显示的语言

						//都转小写判断
						var langs_indexof = (','+translate.selectLanguageTag.languages+',').toLowerCase();
						console.log(langs_indexof)
						if(langs_indexof.indexOf(','+data.list[i].id.toLowerCase()+',') < 0){
							//没发现，那不显示这个语种，调出
							continue
						}
					}

					/*判断默认要选中哪个语言*/
				    if(translate.to != null && typeof(translate.to) != 'undefined' && translate.to.length > 0){
						//设置了目标语言，那就进行判断显示目标语言
						
						if(translate.to == data.list[i].id){
							option.setAttribute("selected",'selected');
						}
				    }else{
						//没设置目标语言，那默认选中当前本地的语种
						if(data.list[i].id == translate.language.getLocal()){
							option.setAttribute("selected",'selected');
						}
					}
					
				    option.appendChild(document.createTextNode(data.list[i].name)); 
				    selectLanguage.appendChild(option);
				}
				//增加 onchange 事件
				if(window.addEventListener){ // Mozilla, Netscape, Firefox 
					selectLanguage.addEventListener('change', onchange,false); 
				}else{ // IE 
					selectLanguage.attachEvent('onchange',onchange); 
				} 
				//将select加入进网页显示
				document.getElementById('translate').appendChild(selectLanguage);
				/*
				try{
					document.getElementById('translateSelectLanguage').style.width = '94px';
				}catch(e){ console.log(e);} 
				*/
			});
			
			
		}
	},
	
	/*
	 * 当前本地语言
	 * 已废弃，v1使用的
	 */
	//localLanguage:'zh-CN',
	localLanguage:'zh-CN',
	
	/**
	 * google翻译执行的
	 * 已废弃，v1使用的
	 */
	googleTranslateElementInit:function(){
		var selectId = '';
		if(document.getElementById('translate') != null){	// && document.getElementById('translate').innerHTML.indexOf('translateSelectLanguage') > 0
			//已经创建过了,存在
			selectId = 'translate';
		}
		
		translate.translate = new google.translate.TranslateElement(
			{
				//这参数没用，请忽略
				pageLanguage: 'zh-CN',
				//一共80种语言选择，这个是你需要翻译的语言，比如你只需要翻译成越南和英语，这里就只写en,vi
				//includedLanguages: 'de,hi,lt,hr,lv,ht,hu,zh-CN,hy,uk,mg,id,ur,mk,ml,mn,af,mr,uz,ms,el,mt,is,it,my,es,et,eu,ar,pt-PT,ja,ne,az,fa,ro,nl,en-GB,no,be,fi,ru,bg,fr,bs,sd,se,si,sk,sl,ga,sn,so,gd,ca,sq,sr,kk,st,km,kn,sv,ko,sw,gl,zh-TW,pt-BR,co,ta,gu,ky,cs,pa,te,tg,th,la,cy,pl,da,tr',
	            includedLanguages: translate.selectLanguageTag.languages,
				//选择语言的样式，这个是面板，还有下拉框的样式，具体的记不到了，找不到api~~  
				layout: 0,
				//自动显示翻译横幅，就是翻译后顶部出现的那个，有点丑，设置这个属性不起作用的话，请看文章底部的其他方法
				//autoDisplay: false, 
				//disableAutoTranslation:false,
				//还有些其他参数，由于原插件不再维护，找不到详细api了，将就了，实在不行直接上dom操作
			}, 
			selectId //触发按钮的id
		);
	},
	
	/**
	 * 初始化，如加载js、css资源
	 * 已废弃，v1使用的
	 */
	init:function(){
		/****** 先判断当前协议，定义资源路径  ******/
		var protocol = window.location.protocol;
		if(window.location.protocol == 'file:'){
			//本地的，那就用http
			protocol = 'http:';
		}
		if(this.resourcesUrl.indexOf('://') == -1){
			//还没设置过，进行设置
			this.resourcesUrl = protocol + this.resourcesUrl;
		}
		
		//this.resourcesUrl = 'file://G:/git/translate';
		
	},
	/**
	 * 执行翻译操作
	 * 已废弃，v1使用的
	 */
	execute_v1:function(){
		/*********** 判断translate 的id是否存在，不存在就创建一个  */
		if(document.getElementById('translate') == null){
			if(translate.selectLanguageTag.show){
				var body_trans = document.getElementsByTagName('body')[0];
				var div = document.createElement("div");  //创建一个script标签
				div.id="translate";
				body_trans.appendChild(div);
			}
		}
		
		/* 处理1.0 - 1.1 升级的 */
		if(translate.includedLanguages == ''){
			//如果未设置，用默认的
			translate.selectLanguageTag.languages = translate.includedLanguages;
		}
		/* 用户1.0版本设置过这个，那么就以这个为主 */
		console.log('translate.js tip: translate.includedLanguages obsolete, please use the translate.selectLanguageTag.languages are set');
		
		
		/****** 先加载资源  ******/
		var head0 = document.getElementsByTagName('head')[0];
		var script = document.createElement("script");  //创建一个script标签
		script.type = "text/javascript";
		//script.async = true;
		script.src = this.resourcesUrl+'/js/element.js';
		head0.appendChild(script);
	},
	
	/**
	 * 设置Cookie，失效时间一年。
	 * @param name
	 * @param value
	 * * 已废弃，v1使用的
	 */
	setCookie:function (name,value){
		var cookieString=name+"="+escape(value); 
		document.cookie=cookieString; 
	},

	//获取Cookie。若是不存再，返回空字符串
	//* 已废弃，v1使用的
	getCookie:function (name){ 
		var strCookie=document.cookie; 
		var arrCookie=strCookie.split("; "); 
		for(var i=0;i<arrCookie.length;i++){ 
			var arr=arrCookie[i].split("="); 
			if(arr[0]==name){
				return unescape(arr[1]);
			}
		}
		return "";
	},
	
	/**
	 * 获取当前页面采用的是什么语言
	 * 返回值如 en、zh-CN、zh-TW （如果是第一次用，没有设置过，那么返回的是 translate.localLanguage 设置的值）		
	 * * 已废弃，v1使用的
	 */
	currentLanguage:function(){
		//translate.check();
		var cookieValue = translate.getCookie('googtrans');
		if(cookieValue.length > 0){
			return cookieValue.substr(cookieValue.lastIndexOf('/')+1,cookieValue.length-1);
		}else{
			return translate.localLanguage;
		}
	},
	
	/**
	 * 切换语言，比如切换为英语、法语
 	 * @param languageName 要切换的语言语种。传入如 english
	 * 				会自动根据传入的语言来判断使用哪种版本。比如传入 en、zh-CN 等，则会使用v1.x版本
	 * 														传入 chinese_simplified 、english 等，则会使用 v2.x版本
	 */
	changeLanguage:function(languageName){
		//判断使用的是否是v1.x
		var v1 = ',en,de,hi,lt,hr,lv,ht,hu,zh-CN,hy,uk,mg,id,ur,mk,ml,mn,af,mr,uz,ms,el,mt,is,it,my,es,et,eu,ar,pt-PT,ja,ne,az,fa,ro,nl,en-GB,no,be,fi,ru,bg,fr,bs,sd,se,si,sk,sl,ga,sn,so,gd,ca,sq,sr,kk,st,km,kn,sv,ko,sw,gl,zh-TW,pt-BR,co,ta,gu,ky,cs,pa,te,tg,th,la,cy,pl,da,tr,';
		if(v1.indexOf(','+languageName+',') > -1){
			//用的是v1.x
			console.log('您使用的是v1版本的切换语种方式，v1已在2021年就以废弃，请更换为v2，参考文档： http://translate.zvo.cn/41549.html');
			translate.check();
			
			var googtrans = '/'+translate.localLanguage+'/'+languageName;
			
			//先清空泛解析域名的设置
			var s = document.location.host.split('.');
			if(s.length > 2){
				var fanDomain = s[s.length-2]+'.'+s[s.length-1];
				document.cookie = 'googtrans=;expires='+(new Date(1))+';domain='+fanDomain+';path=/';
				document.cookie = 'googtrans='+googtrans+';domain='+fanDomain+';path=/';
			}
			
			translate.setCookie('googtrans', ''+googtrans);
			location.reload();
			return;
		}
		
		//用的是v2.x或更高
		translate.setUseVersion2();
		//判断是否是第一次翻译，如果是，那就不用刷新页面了。 true则是需要刷新，不是第一次翻译
		if(translate.to != null && translate.to.length > 0){
			//当前目标值有值，且目标语言跟当前语言不一致，那当前才是已经被翻译过的
			if(translate.to != translate.language.getLocal()){
				var isReload = true; //标记要刷新页面
			}
		}
		
		
		translate.to = languageName;
		translate.storage.set('to',languageName);	//设置目标翻译语言
		
		if(isReload){
			location.reload(); //刷新页面
		}else{
			//不用刷新，直接翻译
			translate.execute(); //翻译
		}
	},
	
	/**
	 * 自检提示，适用于 v1.x， 在 v2.x中已废弃
	 * english
	 * 已废弃，v1使用的
	 */
	check:function(){
		if(window.location.protocol == 'file:'){
			console.log('\r\n---WARNING----\r\ntranslate.js 主动翻译组件自检异常，当前协议是file协议，翻译组件要在正常的线上http、https协议下才能正常使用翻译功能\r\n------------');
		}
	},
	
	
	/**************************** v2.0 */
	to:'', //翻译为的目标语言，如 english 、chinese_simplified
	//用户第一次打开网页时，自动判断当前用户所在国家使用的是哪种语言，来自动进行切换为用户所在国家的语种。
	//如果使用后，第二次在用，那就优先以用户所选择的为主，这个就不管用了
	//默认是false，不使用，可设置true：使用
	//使用 setAutoDiscriminateLocalLanguage 进行设置
	autoDiscriminateLocalLanguage:false,
	documents:[], //指定要翻译的元素的集合,可设置多个，如设置： document.getElementsByTagName('DIV')
	//翻译时忽略的一些东西，比如忽略某个tag、某个class等
	ignore:{
		tag:['style', 'script', 'link', 'pre', 'code'],
		class:['ignore','translateSelectLanguage'],
		id:[],
		/*
			传入一个元素，判断这个元素是否是被忽略的元素。 这个会找父类，看看父类中是否包含在忽略的之中。
			return true是在忽略的之中，false不再忽略的之中
		*/
		isIgnore:function(ele){
			if(ele == null || typeof(ele) == 'undefined'){
				return false;
			}

			var parentNode = ele;
			var maxnumber = 100;	//最大循环次数，避免死循环
			while(maxnumber-- > 0){
				if(parentNode == null || typeof(parentNode) == 'undefined'){
					//没有父元素了
					return false;
				}

				//判断Tag
				//var tagName = parentNode.nodeName.toLowerCase(); //tag名字，小写
				var nodename = translate.element.getNodeName(parentNode).toLowerCase(); //tag名字，小写
				if(nodename.length > 0){
					//有nodename
					if(nodename == 'body' || nodename == 'html' || nodename == '#document'){
						//上层元素已经是顶级元素了，那肯定就不是了
						return false;
					}
					if(translate.ignore.tag.indexOf(nodename) > -1){
						//发现ignore.tag 当前是处于被忽略的 tag
						return true;
					}
				}
				

				//判断class name
				if(parentNode.className != null){
					var classNames = parentNode.className;
					if(classNames == null || typeof(classNames) != 'string'){
						continue;
					}
					//console.log('className:'+typeof(classNames));
					//console.log(classNames);
					classNames = classNames.trim().split(' ');
					for(var c_index = 0; c_index < classNames.length; c_index++){
						if(classNames[c_index] != null && classNames[c_index].trim().length > 0){
							//有效的class name，进行判断
							if(translate.ignore.class.indexOf(classNames[c_index]) > -1){
								//发现ignore.class 当前是处于被忽略的 class
								return true;
							}
						}
					}					
				}

				//判断id
				if(parentNode.id != null && typeof(parentNode.id) != 'undefined'){
					//有效的class name，进行判断
					if(translate.ignore.id.indexOf(parentNode.id) > -1){
						//发现ignore.id 当前是处于被忽略的 id
						return true;
					}
				}

				//赋予判断的元素向上一级
				parentNode = parentNode.parentNode;
			}

			return false;
		}
	},
	//自定义翻译术语
	nomenclature:{
		/*
			术语表
			一维：要转换的语种，如 english
			二维：翻译至的目标语种，如 english
			三维：要转换的字符串，如 "你好"
			结果：自定义的翻译结果，如 “Hallo”
		*/
		data:new Array(),
		
		/*
			原始术语表，可编辑的
			一维：要自定义目标词
			二维：针对的是哪个语种
			值：要翻译为什么内容

			其设置如 
			var data = new Array();
			data['版本'] = {
				english : 'banben',
				korean : 'BanBen'
			};
			data['国际化'] = {
				english : 'guojihua',
				korean : 'GuoJiHua'
			};
			
			【已过时】
		*/
		old_Data:[],
		/*
		set:function(data){
			translate.nomenclature.data = data;
		},
		*/
		set:function(data){
			alert('请将 translate.nomenclature.set 更换为 append，具体使用可参考： https://github.com/xnx3/translate ');
		},
		/*
			向当前术语库中追加自定义术语。如果追加的数据重复，会自动去重
			传入参数：
				from 要转换的语种
				to 翻译至的目标语种
				properties 属于配置表，格式如：
						你好=Hello
						世界=ShiJie

		*/
		append:function(from, to, properties){
			if(typeof(translate.nomenclature.data[from]) == 'undefined'){
				translate.nomenclature.data[from] = new Array();
			}
			if(typeof(translate.nomenclature.data[from][to]) == 'undefined'){
				translate.nomenclature.data[from][to] = new Array();
			}
			
			//将properties进行分析
			//按行拆分
			var line = properties.split('\n');
			//console.log(line)
			for(var line_index = 0; line_index < line.length; line_index++){
				var item = line[line_index].trim();
				if(item.length < 1){
					//空行，忽略
					continue;
				}
				var kvs = item.split('=');
				//console.log(kvs)
				if(kvs.length != 2){
					//不是key、value构成的，忽略
					continue;
				}
				var key = kvs[0].trim();
				var value = kvs[1].trim();
				//console.log(key)
				if(key.length == 0 || value.length == 0){
					//其中某个有空，则忽略
					continue;
				}


				//加入，如果之前有加入，则会覆盖
				translate.nomenclature.data[from][to][key] = value;
				//console.log(local+', '+target+', key:'+key+', value:'+value);
			}

			//追加完后，对整个对象数组进行排序，key越大越在前面
			translate.nomenclature.data[from][to] = translate.util.objSort(translate.nomenclature.data[from][to]);

		},
		//获取当前定义的术语表
		get:function(){
			return translate.nomenclature.data;
		},
		//对传入的str字符进行替换，将其中的自定义术语提前进行替换，然后将替换后的结果返回
		dispose:function(str){
			if(str == null || str.length == 0){
				return str;
			}
			//if(translate.nomenclature.data.length == 0){
			//	return str;
			//}
			//判断当前翻译的两种语种是否有自定义术语库
			//console.log(typeof(translate.nomenclature.data[translate.language.getLocal()][translate.to]))
			if(typeof(translate.nomenclature.data[translate.language.getLocal()]) == 'undefined' || typeof(translate.nomenclature.data[translate.language.getLocal()][translate.to]) == 'undefined'){
				return str;
			}
			//console.log(str)
			for(var originalText in translate.nomenclature.data[translate.language.getLocal()][translate.to]){
				var translateText = translate.nomenclature.data[translate.language.getLocal()][translate.to][originalText];
				if(typeof(translateText) == 'function'){
					//进行异常的预处理调出
					continue;
				}

				var index = str.indexOf(originalText);
				if(index > -1){
					//console.log('find -- '+originalText+', \t'+translateText);
					if(translate.language.getLocal() == 'english'){
						//如果本地语种是英文，那么还要判断它的前后，避免比如要替换 is 将 display 中的is给替换，将单词给强行拆分了
						
						//判断这个词前面是否符合
						var beforeChar = '';	//前面的字符
						if(index == 0){
							//前面没别的字符了，那前面合适
						}else{
							//前面有别的字符,判断是什么字符，如果是英文，那么这个是不能被拆分的，要忽略
							beforeChar = str.substr(index-1,1);
							//console.log('beforeChar:'+beforeChar+', str:'+str)
							var lang = translate.language.getCharLanguage(beforeChar);
							//console.log(lang);
							if(lang == 'english'){
								//调出，不能强拆
								continue;
							}
						}

						//判断这个词的后面是否符合
						var afterChar = ''; //后面的字符
						if(index + originalText.length == str.length ){
							//后面没别的字符了，那前面合适
							//console.log(originalText+'， meile '+str)
						}else{
							//后面有别的字符,判断是什么字符，如果是英文，那么这个是不能被拆分的，要忽略
							afterChar = str.substr(index+originalText.length,1);
							var lang = translate.language.getCharLanguage(afterChar);
							if(lang == 'english'){
								//跳出，不能强拆
								continue;
							}
						}

						str = str.replace(new RegExp(beforeChar+originalText+afterChar,'g'), beforeChar+translateText+afterChar);
					}else{
						//其他情况，如汉语、汉语等语种
						str = str.replace(new RegExp(originalText,'g'), translateText);
					}

				}
			}

			return str;

			/*
			//遍历一维
			for(var originalText in translate.nomenclature.data){
				var languageResult = translate.nomenclature.data[originalText];
				if(typeof(languageResult) == 'function'){
					//进行异常的预处理调出
					continue;
				}

				if(typeof(languageResult[translate.to]) == 'undefined'){
					//console.log('und');
					continue;
				}

				//var hash = translate.util.hash(originalText);

				//console.log(originalText+',\t'+str);
				if(str.indexOf(originalText) > -1){
					//console.log('find -- '+originalText+', \t'+languageResult[translate.to]);
					str = str.replace(new RegExp(originalText,'g'),languageResult[translate.to]);
				}
			}
			
			
			return str;
			*/
		},
		
	},
	office:{
		/*
			网页上翻译之后，自动导出当前页面的术语库
			
			需要先指定本地语种，会自动将本地语种进行配置术语库
			
		*/
		export:function(){
			if(translate.language.getLocal() == translate.language.getCurrent()){
				alert('本地语种跟要翻译的语种一致，无需导出');
				return;
			}

			var text = '';
			for(var uuid in translate.nodeQueue){
				var queueValue = translate.nodeQueue[uuid];
				for(var lang in translate.nodeQueue[uuid].list){
					//console.log('------'+lang)
					if(typeof(lang) != 'string' || lang.length < 1){
						continue;
					}
					//if(translate.language.getLocal() == lang){
						//console.log(translate.nodeQueue[uuid].list[lang]);
						for(var hash in translate.nodeQueue[uuid].list[lang]){
							//console.log(translate.nodeQueue[uuid].list[lang][hash].original);
							//console.log(translate.nodeQueue[uuid].list[lang][hash].original);
							text = text + '\n' + translate.nodeQueue[uuid].list[lang][hash].original + '='+translate.storage.get('hash_'+translate.language.getCurrent()+'_'+hash);
							
						}
					//}
				}
				
			}

			if(text.length > 0){
				//有内容
				text = 'translate.office.append(\''+translate.language.getCurrent()+'\',`'+text+'\n`);';
				//console.log(text);
				translate.util.loadMsgJs();
				msg.popups({
				    text:'<textarea id="msgPopupsTextarea" style="width:100%; height:100%;">loaing...</textarea>',
				    width:'750px',
				    height:'600px',
				    padding:'1px',
				});	
				document.getElementById('msgPopupsTextarea').value = text;
			}else{
				msg.alert('无有效内容');
			}


		},
		//显示导出面板
		showPanel:function(){
			let panel = document.createElement('div');
			panel.setAttribute('id', 'translate_export');
			panel.setAttribute('class','ignore');

			//导出按钮
			let button = document.createElement('button');
			button.onclick = function() {
			  translate.office.export();
			};
			button.innerHTML = '导出配置信息';
			button.setAttribute('style', 'margin-left: 72px; margin-top: 30px; margin-bottom: 20px; font-size: 25px;');
			panel.appendChild(button);

			//说明文字
			let textdiv = document.createElement('div');
			textdiv.innerHTML = '1. 首先将当前语种切换为你要翻译的语种<br/>2. 点击导出按钮，将翻译的配置信息导出<br/>3. 将导出的配置信息粘贴到代码中，即可完成<br/><a href="asd" target="_black" style="color: aliceblue;">点此进行查阅详细使用说明</a>';
			textdiv.setAttribute('style','font-size: 14px; padding: 12px;');

			panel.appendChild(textdiv);			
			
			panel.setAttribute('style', 'background-color: black; color: #fff; width: 320px; height: 200px; position: fixed; bottom: 50px; right: 50px;');
			//把元素节点添加到body元素节点中成为其子节点，放在body的现有子节点的最后
			document.body.appendChild(panel);

			translate.util.loadMsgJs();
		},
		/*
			追加离线翻译数据。如果追加的数据重复，会自动去重
			传入参数：
				from 要转换的语种
				to 翻译至的目标语种
				properties 属于配置表，格式如：
						你好=Hello
						世界=ShiJie
			这个传入参数跟 translate.nomenclature.append 的传入参数格式是一致的			
		*/
		append:function(to, properties){
			//console.log(properties)
			//将properties进行分析
			//按行拆分
			var line = properties.split('\n');
			//console.log(line)
			for(var line_index = 0; line_index < line.length; line_index++){
				var item = line[line_index].trim();
				if(item.length < 1){
					//空行，忽略
					continue;
				}
				var kvs = item.split('=');
				//console.log(kvs)
				if(kvs.length != 2){
					//不是key、value构成的，忽略
					continue;
				}
				var key = kvs[0];
				var value = kvs[1];
				//console.log(key)
				if(key.length == 0 || value.length == 0){
					//其中某个有空，则忽略
					continue;
				}
				//console.log('set---'+key);
				//加入 storate
				translate.storage.set('hash_'+to+'_'+translate.util.hash(key), value);
			}
		},
	},
	setAutoDiscriminateLocalLanguage:function(){
		translate.autoDiscriminateLocalLanguage = true;
	},
	/*
		待翻译的页面的node队列
		一维：key:uuid，也就是execute每次执行都会创建一个翻译队列，这个是翻译队列的唯一标识。   
			 value:
				k/v 
		二维：对象形态，具体有：
			 key:expireTime 当前一维数组key的过期时间，到达过期时间会自动删除掉这个一维数组。如果<0则代表永不删除，常驻内存
			 value:list 待翻译的页面的node队列
		三维：针对二维的value，  key:english、chinese_simplified等语种，这里的key便是对value的判断，取value中的要翻译的词是什么语种，对其进行了语种分类    value: k/v
		四维：针对三维的value，  key:要翻译的词（经过语种分割的）的hash，   value: node数组
		五维：针对四维的value，  这是个对象， 其中
				original: 是三维的key的hash的原始文字，也就是 node 中的原始文字。
				cacheHash: 如果翻译时匹配到了自定义术语库中的词，那么翻译完后存入到缓存中时，其缓存的翻译前字符串已经不是original，而是匹配完术语库后的文本的hash了。所以这里额外多增加了这个属性。如果匹配了术语库，那这里就是要进行缓存的翻译前文本的hash，如果未使用术语库，这里就跟其key-hash 相同。
				translateText: 针对 original 的经过加工过的文字，比如经过自定义术语操作后的，待翻译的文字。
				nodes: 有哪些node元素中包含了这个词，都会在这里记录
		六维：针对五维的 nodes，将各个具体的 node 以及 其操作的 attribute 以数组形式列出
		七维：针对六维列出的nodes数组，其中包含：
				node: 具体操作的node元素
				attribute: 也就是翻译文本针对的是什么，是node本身（nodeValue），还是 node 的某个属性，比如title属性，这则是设置为 "title"。如果这里不为空，那就是针对的属性操作的。 如果这里为空或者undefined ，那就是针对node本身，也就是 nodeValue 的字符串操作的
				beforeText: node元素中进行翻译结果赋予时，额外在翻译结果的前面加上的字符串。其应用场景为，如果中英文混合场景下，避免中文跟英文挨着导致翻译为英语后，连到一块了。默认是空字符串 ''
				afterText:  node元素中进行翻译结果赋予时，额外在翻译结果的后面加上的字符串。其应用场景为，如果中英文混合场景下，避免中文跟英文挨着导致翻译为英语后，连到一块了。默认是空字符串 ''

		生命周期： 当execute()执行时创建，  当execute结束（其中的所有request接收到响应并渲染完毕）时销毁（当前暂时不销毁，以方便调试）
	*/
	nodeQueue:{},
	//指定要翻译的元素的集合,可传入一个元素或多个元素
	//如设置一个元素，可传入如： document.getElementsById('test')
	//如设置多个元素，可传入如： document.getElementsByTagName('DIV')
	setDocuments:function(documents){
		if (documents == null || typeof(documents) == 'undefined') {
			return;
		}
		
		if(typeof(documents.length) == 'undefined'){
			//不是数组，是单个元素
			translate.documents[0] = documents;
		}else{
			//是数组，直接赋予
			translate.documents = documents;
		}
		//清空翻译队列，下次翻译时重新检索
		translate.nodeQueue = {};
		console.log('set documents , clear translate.nodeQueue');
	},
	//获取当前指定翻译的元素（数组形式 [document,document,...]）
	//如果用户未使用setDocuments 指定的，那么返回整个网页
	getDocuments:function(){
		if(translate.documents != null && typeof(translate.documents) != 'undefined' && translate.documents.length > 0){
			// setDocuments 指定的
			return translate.documents;
		}else{
			//未使用 setDocuments指定，那就是整个网页了
			return document.all; //翻译所有的
		}
	},
	listener:{
		//当前页面打开后，是否已经执行完execute() 方法进行翻译了，只要执行完一次，这里便是true。 （多种语言的API请求完毕并已渲染html）
		//isExecuteFinish:false,
		//是否已经使用了 translate.listener.start() 了，如果使用了，那这里为true，多次调用 translate.listener.start() 只有第一次有效
		isStart:false,
		//translate.listener.start();	//开启html页面变化的监控，对变化部分会进行自动翻译。注意，这里变化区域，是指使用 translate.setDocuments(...) 设置的区域。如果未设置，那么为监控整个网页的变化
		start:function(){
			
			translate.temp_linstenerStartInterval = setInterval(function(){
				if(document.readyState == 'complete'){
					//dom加载完成，进行启动
					clearInterval(translate.temp_linstenerStartInterval);//停止
					translate.listener.addListener();
				}
				
				//if(translate.listener.isExecuteFinish){ //执行完过一次，那才能使用
					/*if(translate.listener.isStart){
						//已开启了
						return;
					}*/
					
					//console.log('translate.temp_linstenerStartInterval Finish!');
				//}
	        }, 300);
			
			
		//	window.onload = function(){
				/* if(translate.listener.isStart){
					//已开启了
					return;
				} */
				
				//判断是否是执行完一次了
		//        translate.temp_linstenerStartInterval = setInterval(function(){
					//if(translate.listener.isExecuteFinish){ //执行完过一次，那才能使用
						/*if(translate.listener.isStart){
							//已开启了
							return;
						}*/
		//				clearInterval(translate.temp_linstenerStartInterval);//停止
		//				translate.listener.addListener();
						//console.log('translate.temp_linstenerStartInterval Finish!');
					//}
		//	      }, 50);
		//	}
			
			
		},
		//增加监听，开始监听。这个不要直接调用，需要使用上面的 start() 开启
		addListener:function(){
			translate.listener.isStart = true; //记录已执行过启动方法了
			
			// 观察器的配置（需要观察什么变动）
			const config = { attributes: true, childList: true, subtree: true };
			// 当观察到变动时执行的回调函数
			const callback = function(mutationsList, observer) {
				var documents = []; //有变动的元素
				
			    // Use traditional 'for loops' for IE 11
			    for(let mutation of mutationsList) {
			        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
						//多了个组件
						documents.push.apply(documents,mutation.addedNodes);
			        //    console.log(mutation.addedNodes);
			        //}else if (mutation.type === 'attributes') {
			        //   console.log('The ' + mutation.attributeName + ' attribute was modified.');
			        }
			    }
			    
				//console.log(documents);
				if(documents.length > 0){
					//有变动，需要看看是否需要翻译，延迟10毫秒执行
					// 使用setTimeout()函数延迟30毫秒执行一段代码
					setTimeout(function() {
						//console.log(documents);
						translate.execute(documents); //指定要翻译的元素的集合,可传入一个或多个元素。如果不设置，默认翻译整个网页
					}, 10);
				}
			};
			// 创建一个观察器实例并传入回调函数
			const observer = new MutationObserver(callback);
			// 以上述配置开始观察目标节点
			var docs = translate.getDocuments();
			for(var docs_index = 0; docs_index < docs.length; docs_index++){
				var doc = docs[docs_index];
				if(doc != null){
					observer.observe(doc, config);
				}
			}
		},
		/*
			每当执行完一次渲染任务（翻译）时会触发此。注意页面一次翻译会触发多个渲染任务。普通情况下，一次页面的翻译可能会触发两三次渲染任务。
			另外如果页面中有ajax交互方面的信息，时，每次ajax信息刷新后，也会进行翻译，也是一次渲染任务。
			这个是为了方便扩展使用。比如在layui中扩展，监控 select 的渲染
		*/
		renderTaskFinish:function(renderTask){
			//console.log(renderTask);
		}
	},
	//对翻译结果进行替换渲染的任务，将待翻译内容替换为翻译内容的过程
	renderTask:class{
		constructor(){
			/*
			 * 任务列表
			 * 一维数组 [hash] = tasks;  tasks 是多个task的数组集合
			 * 二维数组 [task,task,...]，存放多个 task，每个task是一个替换。这里的数组是同一个nodeValue的多个task替换
			 * 三维数组 task['originalText'] 、 task['resultText'] 存放要替换的字符串
			 		   task['attribute'] 存放要替换的属性，比如 a标签的title属性。 如果是直接替换node.nodeValue ，那这个没有
			 */
			this.taskQueue = [];
			
			/*
			 * 要进行翻译的node元素，
			 * 一维数组 key:node.nodeValue 的 hash ， value:node的元素数组
			 * 二维数组，也就是value中包含的node集合 [node,node,...]
	 		 */
			this.nodes = [];
		}
		
		/**
		 * 向替换队列中增加替换任务
		 * node:要替换的字符属于那个node元素
		 * originalText:待翻译的字符
		 * resultText:翻译后的结果字符
		 * attribute: 要替换的是哪个属性，比如 a标签的title属性，这里便是传入title。如果不是替换属性，这里不用传入，或者传入null
		 */
		add(node, originalText, resultText, attribute){
			var nodeAnaly = translate.element.nodeAnalyse.get(node, attribute); //node解析
			//var hash = translate.util.hash(translate.element.getTextByNode(node)); 	//node中内容的hash
			var hash = translate.util.hash(nodeAnaly['text']);
			//console.log('--------------'+hash);
			//console.log(nodeAnaly);
			//console.log(node);
			//console.log('originalText:'+originalText+', resultText:'+resultText+', attribute:'+attribute);
			/****** 加入翻译的元素队列  */
			if(typeof(this.nodes[hash]) == 'undefined'){
				this.nodes[hash] = new Array();
			}
			this.nodes[hash].push(node);
			//console.log(node)
			
			/****** 加入翻译的任务队列  */
			var tasks = this.taskQueue[hash];
			if(tasks == null || typeof(tasks) == 'undefined'){
				//console.log(node.nodeValue);
				tasks = new Array(); //任务列表，存放多个 task，每个task是一个替换。这里的数组是同一个nodeValue的多个task替换
			}
			var task = new Array();
			
			//v2.3.3 增加 -- 开始
			//这里要进行处理，因为有时候翻译前，它前或者后是有空格的，但是翻译后会把前或者后的空格给自动弄没了，如果是这种情况，要手动补上
			if (originalText.substr(0, 1) == ' ') {
				//console.log('第一个字符是空格');
				if(resultText.substr(0, 1) != ' '){
					//翻译结果的第一个字符不是空格，那么补上
					resultText = ' ' + resultText;
				}
			}
			if (originalText.substr(originalText.length - 1, 1) === ' ') {
				//console.log('最后一个字符是空格');
				if(resultText.substr(0, 1) != ' '){
					//翻译结果的最后一个字符不是空格，那么补上
					resultText = resultText + ' ';
				}
			}
			//v2.3.3 增加 -- 结束

			task['originalText'] = originalText;
			task['resultText'] = resultText;
			task['attribute'] = attribute;

			//console.log(task);
			tasks.push(task);
			this.taskQueue[hash] = tasks;
			/****** 加入翻译的任务队列 end  */
		}
		//进行替换渲染任务，对页面进行渲染替换翻译
		execute(){
			//先对tasks任务队列的替换词进行排序，将同一个node的替换词有大到小排列，避免先替换了小的，大的替换时找不到
			for(var hash in this.taskQueue){
				var tasks = this.taskQueue[hash];
				if(typeof(tasks) == 'function'){
					//进行异常的预处理调出
					continue;
				}

				//进行排序,将原字符串长的放前面，避免造成有部分不翻译的情况（bug是先翻译了短的，导致长的被打断而无法进行适配）
				tasks.sort((a, b) => b.originalText.length - a.originalText.length);
				
				this.taskQueue[hash] = tasks;
			}
			
			//console.log('===========task=========');
			//console.log(this.taskQueue);
			//console.log(this.nodes);
			//console.log('===========task======end===');

			//对nodeQueue进行翻译
			for(var hash in this.nodes){
				var tasks = this.taskQueue[hash]; //取出当前node元素对应的替换任务
				//var tagName = this.nodes[hash][0].nodeName; //以下节点的tag name
				//console.log(tasks);
				for(var node_index = 0; node_index < this.nodes[hash].length; node_index++){
					//对这个node元素进行替换翻译字符
					for(var task_index=0; task_index<tasks.length; task_index++){
						var task = tasks[task_index];
						if(typeof(tasks) == 'function'){
							//进行异常的预处理调出
							continue;
						}
						
						//console.log(this.nodes[hash][task_index]);
						translate.element.nodeAnalyse.set(this.nodes[hash][task_index], task.originalText, task.resultText, task['attribute']);
						/*
						//var tagName = translate.element.getTagNameByNode(this.nodes[hash][task_index]);//节点的tag name
						//console.log(tagName)
						//console.log(this.nodes[hash][task_index])
						//var tagName = this.nodes[hash][task_index].nodeName; //节点的tag name
						var nodename = translate.element.getNodeName(this.nodes[hash][task_index]);
						
						//console.log(this.nodes[hash][task_index]+', '+task.originalText+', '+task.resultText+', tagName:'+tagName);
						if(nodename == 'META'){
							if(typeof(this.nodes[hash][task_index].name) != 'undefined' && this.nodes[hash][task_index].name != null){
								//var nodeName = this.nodes[hash][task_index].name.toLowerCase();  //取meta 标签的name 属性
								
								this.nodes[hash][task_index].content = this.nodes[hash][task_index].content.replace(new RegExp(translate.util.regExp.pattern(task.originalText),'g'), translate.util.regExp.resultText(task.resultText));
							}
						}else if(nodename == 'IMG'){
							this.nodes[hash][task_index].alt = this.nodes[hash][task_index].alt.replace(new RegExp(translate.util.regExp.pattern(task.originalText),'g'), translate.util.regExp.resultText(task.resultText));
						}else{
							//普通的
							//console.log('task.originalText : '+task.originalText);
							//console.log(translate.util.regExp.pattern(task.originalText))
							//console.log('task.resultText : '+task.resultText);
							this.nodes[hash][task_index].nodeValue = this.nodes[hash][task_index].nodeValue.replace(new RegExp(translate.util.regExp.pattern(task.originalText),'g'), translate.util.regExp.resultText(task.resultText));
						}
						*/
					}
				}
			}
			
			//console.log('---listen');

			//监听
			if(typeof(this.taskQueue) != 'undefined' && Object.keys(this.taskQueue).length > 0){
				//50毫秒后执行，以便页面渲染完毕
				var renderTask = this;
				setTimeout(function() {

					/** 执行完成后，保存翻译的历史node **/
					//将当前翻译完成的node进行缓存记录，以node唯一标识为key，  node、以及node当前翻译之后的内容为值进行缓存。方便下一次执行 translate.execute() 时，若值未变化则不进行翻译
					for(var hash in renderTask.nodes){
						//console.log(translate.nodeQueue[uuid].list[lang][hash])
						for(var nodeindex in renderTask.nodes[hash]){
							//console.log(translate.nodeQueue[uuid].list[lang][hash].original);
							//var nodename = translate.element.getNodeName(translate.nodeQueue[uuid].list[lang][hash].nodes[0].node);
							//console.log("nodename:"+nodename);
							//console.log(translate.nodeQueue[uuid].list[lang][hash].nodes[0].node.nodeName);
							//console.log(translate.nodeQueue[uuid].list[lang][hash].nodes[0].node);
							var analyse = translate.element.nodeAnalyse.get(renderTask.nodes[hash][0]);
							//analyse.text  analyse.node
							var nodeid = nodeuuid.uuid(analyse.node);

							if(nodeid.length == 0){
								//像是input的placeholder 暂时没考虑进去，这种就直接忽略了
								continue;
							}

							//加入
							/*
							if(typeof(translate.nodeHistory[nodeid]) == 'object'){
								//已经加入过了，判断它的值是否有发生过变化

								if(translate.nodeHistory[nodeid].translateText == analyse.text){
									//值相同，就不用再加入了
									continue;
								}
							}
							这里就不用判断了，直接同步到最新的，因为同一个node，可能有本地缓存直接更新，这样会非常快，网络的会慢2秒，因时间导致同步不是最新的
							*/
							//console.log('add-----'+analyse.text +', uuid:'+nodeid);
							//console.log(analyse.node);
							translate.nodeHistory[nodeid] = {};
							translate.nodeHistory[nodeid].node = analyse.node;
							translate.nodeHistory[nodeid].translateText = analyse.text;
						}
						
					}
					//console.log(translate.nodeHistory);

					/** 执行完成后，触发用户自定义的翻译完成执行函数 **/
					translate.listener.renderTaskFinish(renderTask);

				}, 50);
				
			}else{
				//console.log(this.taskQueue);
				//console.log('---this.taskQueue is null');
			}
		}
	},
	
	//执行翻译操作。翻译的是 nodeQueue 中的
	//docs 如果传入，那么翻译的只是传入的这个docs的。传入如 [document.getElementById('xxx'),document.getElementById('xxx'),...]
	execute:function(docs){
		if(typeof(doc) != 'undefined'){
			//execute传入参数，只有v2版本才支持
			translate.useVersion = 'v2';
		}
		
		if(translate.useVersion == 'v1'){
		//if(this.to == null || this.to == ''){
			//采用1.x版本的翻译，使用google翻译
			//translate.execute_v1();
			//return;
			//v2.5.1增加
			console.log('提示：https://github.com/xnx3/translate 在 v2.5 版本之后，由于谷歌翻译调整，免费翻译通道不再支持，所以v1版本的翻译接口不再被支持，v1全线下架。考虑到v1已不能使用，当前已自动切换到v2版本。如果您使用中发现什么异常，请针对v2版本进行适配。');
			translate.useVersion = 'v2';
		}
		
		/****** 采用 2.x 版本的翻译，使用自有翻译算法 */
		

		//每次执行execute，都会生成一个唯一uuid，也可以叫做队列的唯一标识，每一次执行execute都会创建一个独立的翻译执行队列
		var uuid = translate.util.uuid();
		//console.log('=====')
		//console.log(translate.nodeQueue);
		
		/* v2.4.3 将初始化放到了 translate.element.whileNodes 中，如果uuid对应的没有，则自动创建

		translate.nodeQueue[uuid] = new Array(); //创建
		translate.nodeQueue[uuid]['expireTime'] = Date.now() + 120*1000; //删除时间，10分钟后删除
		translate.nodeQueue[uuid]['list'] = new Array(); 
		*/
		//console.log(translate.nodeQueue);
		//console.log('=====end')
		
		//如果页面打开第一次使用，先判断缓存中有没有上次使用的语种，从缓存中取出
		if(translate.to == null || translate.to == ''){
			var to_storage = translate.storage.get('to');
			if(to_storage != null && typeof(to_storage) != 'undefined' && to_storage.length > 0){
				translate.to = to_storage;
			}
		}
		
		//渲染select选择语言
		try{
			translate.selectLanguageTag.render();	
		}catch(e){
			console.log(e);
		}
		
		//判断是否还未指定翻译的目标语言
		if(translate.to == null || typeof(translate.to) == 'undefined' || translate.to.length == 0){
			//未指定，判断如果指定了自动获取用户本国语种了，那么进行获取
			if(translate.autoDiscriminateLocalLanguage){
				translate.executeByLocalLanguage();
			}
			
			//没有指定翻译目标语言、又没自动获取用户本国语种，则不翻译
			return;
		}
		
		//判断本地语种跟要翻译的目标语种是否一样，如果是一样，那就不需要进行任何翻译
		if(translate.to == translate.language.getLocal()){
			return;
		}
		
		/********** 翻译进行 */
		
		//先进行图片的翻译替换，毕竟图片还有加载的过程
		translate.images.execute();
		
		/*
			进行翻译指定的node操作。优先级为：
			1. 这个方法已经指定的翻译 nodes
			2. setDocuments 指定的 
			3. 整个网页 
			其实2、3都是通过 getDocuments() 取，在getDocuments() 就对2、3进行了判断
		*/
		var all;
		if(typeof(docs) != 'undefined'){
			//1. 这个方法已经指定的翻译 nodes
			
			if(docs == null){
				//要翻译的目标区域不存在
				console.log('translate.execute(...) 中传入的要翻译的目标区域不存在。');
				return;
			}
			
			if(typeof(docs.length) == 'undefined'){
				//不是数组，是单个元素
				all = new Array();
				all[0] = docs;
			}else{
				//是数组，直接赋予
				all = docs;
			}
			
		}else{
			//2、3
			all = translate.getDocuments();
		}
		//console.log('----要翻译的目标元素-----');
		//console.log(all)
		
		//检索目标内的node元素
		for(var i = 0; i< all.length & i < 20; i++){
			var node = all[i];
			translate.element.whileNodes(uuid, node);	
		}

		//console.log(translate.nodeHistory);
		//console.log(translate.nodeQueue[uuid])
		for(var lang in translate.nodeQueue[uuid].list){
			//console.log('lang:'+lang)
			for(var hash in translate.nodeQueue[uuid].list[lang]){
				//console.log(hash)
				if(typeof(translate.nodeQueue[uuid].list[lang][hash]) == 'function'){
					//v2.10增加，避免hash冒出个 Contains 出来导致for中的.length 出错
					continue;
				}
				for(var nodeindex = translate.nodeQueue[uuid].list[lang][hash].nodes.length-1; nodeindex > -1; nodeindex--){
					//console.log(translate.nodeQueue[uuid].list[lang][hash].nodes);
					var analyse = translate.element.nodeAnalyse.get(translate.nodeQueue[uuid].list[lang][hash].nodes[nodeindex].node);
					//analyse.text  analyse.node
					var nodeid = nodeuuid.uuid(analyse.node);
					//translate.nodeQueue[uuid].list[lang][hash].nodes.splice(nodeindex, 1);
					//console.log(nodeid+'\t'+analyse.text);
					if(typeof(translate.nodeHistory[nodeid]) != 'undefined'){
						//存在，判断其内容是否发生了改变
						//console.log('比较---------');
						//console.log(translate.nodeHistory[nodeid].translateText);
						//console.log(analyse.text);
						if(translate.nodeHistory[nodeid].translateText == analyse.text){
							//内容未发生改变，那么不需要再翻译了，从translate.nodeQueue中删除这个node
							translate.nodeQueue[uuid].list[lang][hash].nodes.splice(nodeindex, 1);
							//console.log('发现相等的node，删除 '+analyse.text+'\t'+hash);
						}else{
							//console.log("发现变化的node =======nodeid:"+nodeid);
							//console.log(translate.nodeHistory[nodeid].translateText == analyse.text);
							//console.log(translate.nodeHistory[nodeid].node);
							//console.log(translate.nodeHistory[nodeid].translateText);
							//console.log(analyse.text);
							
						}
					}else{
						//console.log('未在 nodeHistory 中发现，新的node  nodeid:'+nodeid);
						//console.log(analyse.node)
					}
				}
				if(translate.nodeQueue[uuid].list[lang][hash].nodes.length == 0){
					//如果node数组中已经没有了，那么直接把这个hash去掉
					delete translate.nodeQueue[uuid].list[lang][hash];
				}
			}
			if(Object.keys(translate.nodeQueue[uuid].list[lang]).length == 0){
				//如果这个语言中没有要翻译的node了，那么删除这个语言
				delete translate.nodeQueue[uuid].list[lang];
			}
		}
		//console.log('new queuq');
		//console.log(translate.nodeQueue[uuid])
		//translate.nodeHistory[nodeid]

		
		//console.log('-----待翻译：----');
		//console.log(translate.nodeQueue);
		
		//translateTextArray[lang][0]
		var translateTextArray = {};	//要翻译的文本的数组，格式如 ["你好","欢迎"]
		var translateHashArray = {};	//要翻译的文本的hash,跟上面的index是一致的，只不过上面是存要翻译的文本，这个存hash值
		

		/*
				要进行第二次扫描的node - 2023.8.22 解决缓存会打散扫描到的翻译文本，导致翻译结束后找寻不到而导致不翻译的问题
				一维 key: lang
				二维 key: hash
				三维 key: 
						node: 当前的node元素
				四维		array: 当前缓存中进行翻译的文本数组：
							cacheOriginal: 已缓存被替换前的文本
							cacheTranslateText: 已缓存被替换后的翻译文本
					
		*/
		var twoScanNodes = {};
		for(var lang in translate.nodeQueue[uuid]['list']){ //二维数组中，取语言
			//console.log('lang:'+lang); //lang为english这种语言标识
			if(lang == null || typeof(lang) == 'undefined' || lang.length == 0 || lang == 'undefined'){
				//console.log('lang is null : '+lang);
				continue;
			}

			translateTextArray[lang] = [];
			translateHashArray[lang] = [];
			
			let task = new translate.renderTask();
			//console.log(translate.nodeQueue);
			
			twoScanNodes[lang] = [];
			//二维数组，取hash、value
			for(var hash in translate.nodeQueue[uuid]['list'][lang]){
				if(typeof(translate.nodeQueue[uuid]['list'][lang][hash]) == 'function'){
					//跳出，增加容错率。  正常情况下应该不会这样
					continue;
				}

				//取原始的词，还未经过翻译的，需要进行翻译的词
				//var originalWord = translate.nodeQueue[uuid]['list'][lang][hash]['original'];	

				//原始的node中的词
				var originalWord = translate.nodeQueue[uuid]['list'][lang][hash]['original'];	
				//要翻译的词
				var translateText = translate.nodeQueue[uuid]['list'][lang][hash]['translateText'];
				//console.log(originalWord);
/*
				//自定义术语后的。如果
				var nomenclatureOriginalWord = translate.nomenclature.dispose(cache);
				if(nomenclatureOriginalWord != originalWord){
					has
				}
*/				
				//console.log(originalWord == translateText ? '1':'xin：'+translateText);
				//根据hash，判断本地是否有缓存了
				var cacheHash = originalWord == translateText ? hash:translate.util.hash(translateText); //如果匹配到了自定义术语库，那翻译前的hash是被改变了
				translate.nodeQueue[uuid]['list'][lang][hash]['cacheHash'] = cacheHash; //缓存的hash。 缓存时，其hash跟翻译的语言是完全对应的，缓存的hash就是翻译的语言转换来的
				var cache = translate.storage.get('hash_'+translate.to+'_'+cacheHash);
				//console.log(cacheHash+', '+cache);

				//var twoScanNodes[] = [];	//要进行第二次扫描的node
				if(cache != null && cache.length > 0){
					//有缓存了
					//console.log('find cache：'+cache);
					//console.log(this.nodeQueue[lang][hash]['nodes']);
					//直接将缓存赋予
					//for(var index = 0; index < this.nodeQueue[lang][hash].length; index++){
						//this.nodeQueue[lang][hash][index].nodeValue = cache;

						for(var node_index = 0; node_index < translate.nodeQueue[uuid]['list'][lang][hash]['nodes'].length; node_index++){
							//this.nodeQueue[lang][hash]['nodes'][node_index].nodeValue = cache;
							//console.log(translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]);
							task.add(translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['node'], originalWord, translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['beforeText']+cache+translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['afterText'], translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['attribute']);
							//this.nodeQueue[lang][hash]['nodes'][node_index].nodeValue = this.nodeQueue[lang][hash]['nodes'][node_index].nodeValue.replace(new RegExp(originalWord,'g'), cache);
							
							//重新扫描这个node,避免这种情况：
							//localstorage缓存中有几个词的缓存了，但是从缓存中使用时，把原本识别的要翻译的数据给打散了，导致翻译结果没法赋予，导致用户展示时有些句子没成功翻译的问题 -- 2023.8.22
							//console.log('继续扫描 + 1 - '+twoScanNodes.length);
							var twoScanIndex = -1; //当前元素是否在 twoScan 中已经加入了，如果已经加入了，那么这里赋予当前所在的下标
							for(var i = 0; i<twoScanNodes[lang].length; i++){
								if(translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['node'].isSameNode(twoScanNodes[lang][i]['node'])){
									//如果已经加入过了，那么跳过
									twoScanIndex = i;
									continue;
								}
							}
							if(twoScanIndex == -1){
								twoScanIndex = twoScanNodes[lang].length;
								twoScanNodes[lang][twoScanIndex] = {};
								twoScanNodes[lang][twoScanIndex]['node'] = translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['node'];
								twoScanNodes[lang][twoScanIndex]['array'] = [];
							}
							//未加入过，那么加入
							var arrayIndex = twoScanNodes[lang][twoScanIndex]['array'].length;
							twoScanNodes[lang][twoScanIndex]['array'][arrayIndex] = translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['beforeText']+cache+translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['afterText'];
							//twoScanNodes[lang][twoScanIndex]['array'][arrayIndex] = translate.nodeQueue[uuid]['list'][lang][hash]['beforeText']+cache+translate.nodeQueue[uuid]['list'][lang][hash]['afterText'];
						}
					//}


						
					continue;	//跳出，不用在传入下面的翻译接口了
				}
				

				/*
				//取出数组
				var queueNodes = this.nodeQueue[lang][hash];
				if(queueNodes.length > 0){
					//因为在这个数组中的值都是一样的，那么只需要取出第一个就行了
					var valueStr = queueNodes[0].nodeValue;
					valueStr = this.util.charReplace(valueStr);

					translateTextArray[lang].push(valueStr);
					translateHashArray[lang].push(hash);
				}
				*/
				
				//加入待翻译数组
				translateTextArray[lang].push(translateText);
				translateHashArray[lang].push(hash); //这里存入的依旧还是用原始hash，未使用自定义术语库前的hash，目的是不破坏 nodeQueue 的 key
			}

			task.execute(); //执行渲染任务
		}
		//console.log(twoScanNodes);


		/******* 进行第二次扫描、追加入翻译队列。目的是防止缓存打散扫描的待翻译文本 ********/
		for(var lang in twoScanNodes){
			//记录第一次扫描的数据，以便跟第二次扫描后的进行对比
			var firstScan = Object.keys(translate.nodeQueue[uuid]['list'][lang]);
			var firstScan_lang_langth = firstScan.length; //第一次扫描后的数组长度

			//console.log(twoScanNodes[lang]);
			for(var i = 0; i<twoScanNodes[lang].length; i++){
				
				twoScanNodes[lang][i].array.sort(function(a, b) { return b.length - a.length; });
				//console.log(twoScanNodes[lang][i].array);

				var nodeAnaly = translate.element.nodeAnalyse.get(twoScanNodes[lang][i].node);
				//console.log(nodeAnaly);
				var text = nodeAnaly.text;
				//console.log(text.indexOf(twoScanNodes[lang][i].array[0]));

				for(var ai = 0; ai < twoScanNodes[lang][i].array.length; ai++){
					if(twoScanNodes[lang][i].array[ai] < 1){
						continue;
					}
					text = text.replace(new RegExp(translate.util.regExp.pattern(twoScanNodes[lang][i].array[ai]),'g'), translate.util.regExp.resultText('\n'));
				}
				
				//console.log(text);
				var textArray = text.split('\n');
				//console.log(textArray);
				for(var tai = 0; tai < textArray.length; tai++){
					if(textArray[tai] < 1){
						continue;
					}
					//console.log(textArray[tai]);
					//将新增的追加到 translate.nodeQueue 中
					translate.addNodeToQueue(uuid, nodeAnaly['node'], textArray[tai]);
				}
			}


			//取第二次扫描追加后的数据
			var twoScan = Object.keys(translate.nodeQueue[uuid]['list'][lang]);
			var twoScan_lang_langth = twoScan.length; //第二次扫描后的数组长度
			//console.log(firstScan_lang_langth+ '=='+twoScan_lang_langth);
			if(firstScan_lang_langth - twoScan_lang_langth == 0){
				//一致，没有新增，那么直接跳出，忽略
				continue;
			}

			//console.log(translate.nodeQueue[uuid]['list'][lang]);
			//console.log(firstScan);
			for(var ti=0; ti<twoScan.length; ti++){
				twoHash = twoScan[ti];
				//console.log(twoHash + '-- '+firstScan.indexOf(twoHash));
				if(firstScan.indexOf(twoHash) == -1){
					//需要追加了
					var item = translate.nodeQueue[uuid]['list'][lang][twoHash];

					var cacheHash = item.original == item.translateText ? twoHash:translate.util.hash(item.translateText); //如果匹配到了自定义术语库，那翻译前的hash是被改变了
					translate.nodeQueue[uuid]['list'][lang][twoHash]['cacheHash'] = cacheHash; //缓存的hash。 缓存时，其hash跟翻译的语言是完全对应的，缓存的hash就是翻译的语言转换来的
					
					translateTextArray[lang].push(item.translateText);
					translateHashArray[lang].push(twoHash);
				}
			}
			
		}
		/******* 进行第二次扫描、追加入翻译队列  -- 结束 ********/

		
		//window.translateHashArray = translateHashArray;
		
		//统计出要翻译哪些语种 ，这里面的语种会调用接口进行翻译。其内格式如 english
		var fanyiLangs = []; 
		//console.log(translateTextArray)
		for(var lang in translate.nodeQueue[uuid]['list']){ //二维数组中取语言
			if(typeof(translateTextArray[lang]) == 'undefined'){
				continue;
			}
			if(translateTextArray[lang].length < 1){
				continue;
			}
			fanyiLangs.push(lang);
		}
		

		/******* 用以记录当前是否进行完第一次翻译了 *******/
		/*
		if(!translate.listener.isExecuteFinish){
			translate.temp_executeFinishNumber = 0;	//下面请求接口渲染，翻译执行完成的次数	
			//判断是否是执行完一次了
	        translate.temp_executeFinishInterval = setInterval(function(){
				if(translate.temp_executeFinishNumber == fanyiLangs.length){
					translate.listener.isExecuteFinish = true; //记录当前已执行完第一次了
					clearInterval(translate.temp_executeFinishInterval);//停止
					console.log('translate.execute() Finish!');
					//console.log(uuid);
					
				}
	        }, 50);
		}
		*/

		//console.log(fanyiLangs)
		if(fanyiLangs.length == 0){
			//没有需要翻译的，直接退出
			return;
		}
		

		//进行掉接口翻译
		for(var lang_index in fanyiLangs){ //一维数组，取语言
			var lang = fanyiLangs[lang_index];
			//console.log(typeof(translateTextArray[lang]))
			
			if(typeof(translateTextArray[lang]) == 'undefined' || translateTextArray[lang].length < 1){
				return;
			}

			//自定义术语
			/*var nomenclatureCache = translate.nomenclature.dispose(cache);
			for(var ttr_index = 0; ttr_index<translateTextArray[lang].length; ttr_index++){
				console.log(translateTextArray[lang][ttr_index])
			}*/

			/*** 翻译开始 ***/
			var url = translate.request.api.translate;
			var data = {
				from:lang,
				to:translate.to,
				//text:JSON.stringify(translateTextArray[lang])
				text:encodeURIComponent(JSON.stringify(translateTextArray[lang]))
			};
			//console.log('url-'+url)
			translate.request.post(url, data, function(data){
				//console.log(data); 
				if(data.result == 0){
					console.log('=======ERROR START=======');
					console.log(translateTextArray[data.from]);
					//console.log(encodeURIComponent(JSON.stringify(translateTextArray[data.from])));
					
					console.log('response : '+data.info);
					console.log('=======ERROR END  =======');
					//translate.temp_executeFinishNumber++; //记录执行完的次数
					return;
				}
				
				//console.log('-----待翻译3：----');
				//console.log(translate.nodeQueue);
				
				//console.log('response:'+uuid);
				let task = new translate.renderTask();
				//遍历 translateHashArray
				for(var i=0; i<translateHashArray[data.from].length; i++){
					//翻译前的语种，如 english
					var lang = data.from;	
					//翻译后的内容
					var text = data.text[i];	
					//翻译前的hash对应下标
					var hash = translateHashArray[data.from][i];	
					var cacheHash = translate.nodeQueue[uuid]['list'][lang][hash]['cacheHash'];


					
					//取原始的词，还未经过翻译的，需要进行翻译的词
					var originalWord = '';
					try{
						originalWord = translate.nodeQueue[uuid]['list'][lang][hash]['original'];
						//console.log('bef:'+translate.nodeQueue[uuid]['list'][lang][hash]['beforeText']);
					}catch(e){
						console.log('uuid:'+uuid+', originalWord:'+originalWord+', lang:'+lang+', hash:'+hash+', text:'+text+', queue:'+translate.nodeQueue[uuid]);
						console.log(e);
						continue;
					}
					
					//for(var index = 0; index < translate.nodeQueue[lang][hash].length; index++){
					for(var node_index = 0; node_index < translate.nodeQueue[uuid]['list'][lang][hash]['nodes'].length; node_index++){
						//translate.nodeQueue[lang][hash]['nodes'][node_index].nodeValue = translate.nodeQueue[lang][hash]['nodes'][node_index].nodeValue.replace(new RegExp(originalWord,'g'), text);
						//加入任务
						task.add(translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['node'], originalWord, translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['beforeText']+text+translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['afterText'], translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['attribute']);
					}
					//}
					/*
					for(var index = 0; index < translate.nodeQueue[data.from][hash].length; index++){
						translate.nodeQueue[data.from][hash][index].nodeValue = text;
					}
					*/
					
					//将翻译结果以 key：hash  value翻译结果的形式缓存
					translate.storage.set('hash_'+data.to+'_'+cacheHash,text);
				}
				task.execute(); //执行渲染任务
				//translate.temp_executeFinishNumber++; //记录执行完的次数

			});
			/*** 翻译end ***/

			
		}
	},
	/*
		将已成功翻译并渲染的node节点进行缓存记录
		key: node节点的唯一标识符，通过 nodeuuid.uuid() 生成
		value: 
			node: node节点
			translateText: 翻译完成后，当前node节点的内容文本（是已经翻译渲染过的）
	*/
	nodeHistory:{},
	element:{
		//对翻译前后的node元素的分析（翻以前）及渲染（翻译后）
		nodeAnalyse:{
			/*
				获取node中的要进行翻译的文本内容、以及要操作的实际node对象（这个node对象很可能是传入的node中的某个子node）
				node 
				attribute 要获取的是某个属性的值，还是node本身的值。比如 a标签的title属性的值，则传入 title。  如果是直接获取node.nodeValue ，那这个没有

				返回结果是一个数组。其中：
					['text']:要进行翻译的text内容文本
					['node']:要进行翻译的目标node

			*/
			get:function(node, attribute){
				return translate.element.nodeAnalyse.analyse(node,'','', attribute);
			},
			/*
				进行翻译之后的渲染显示
				参数：
					node 当前翻译的node元素
					originalText 翻译之前的内容文本
					resultText 翻译之后的内容文本
					attribute 存放要替换的属性，比如 a标签的title属性。 如果是直接替换node.nodeValue ，那这个没有
			*/
			set:function(node, originalText, resultText, attribute){
				translate.element.nodeAnalyse.analyse(node,originalText,resultText, attribute);
			},
			/*	
				
				注意，这个不使用，只是服务于上面的get、set使用。具体使用用上面的get、set

				1. 只传入 node：
					获取node中的要进行翻译的文本内容、以及要操作的实际node对象（这个node对象很可能是传入的node中的某个子node）
					返回结果是一个数组。其中：
						['text']:要进行翻译的text内容文本
						['node']:要进行翻译的目标node
				2. 传入 node、originalText、 resultText
					则是进行翻译之后的渲染显示

				attribute : 进行替换渲染时使用，存放要替换的属性，比如 a标签的title属性。 如果是直接替换node.nodeValue ，那这个没有
			*/
			analyse:function(node, originalText, resultText, attribute){
				var result = new Array(); //返回的结果
				result['node'] = node;
				result['text'] = '';

				var nodename = translate.element.getNodeName(node);

				if(attribute != null && typeof(attribute) == 'string' && attribute.length > 0){
					//这个node有属性，替换的是node的属性，而不是nodeValue
					result['text'] = node[attribute];

					//替换渲染
					if(typeof(originalText) != 'undefined' && originalText.length > 0){
						if(typeof(node[attribute]) != 'undefined'){
							node[attribute] = node[attribute].replace(new RegExp(translate.util.regExp.pattern(originalText),'g'), translate.util.regExp.resultText(resultText));	
						}else{
							console.log(node);
						}
						
					}
					return result;
				}

				//正常的node ，typeof 都是 object

				//console.log(typeof(node)+node);
				if(nodename == '#text'){
					//如果是普通文本，判断一下上层是否是包含在textarea标签中
					if(typeof(node.parentNode) != 'undefined'){
						var parentNodename = translate.element.getNodeName(node.parentNode);
						//console.log(parentNodename)
						if(parentNodename == 'TEXTAREA'){
							//是textarea标签，那将nodename 纳入 textarea的判断中，同时将判断对象交于上级，也就是textarea标签
							nodename = 'TEXTAREA';
							node = node.parentNode;
						}
					}
				}



				//console.log(nodename)
				//console.log(translate.element.getNodeName(node.parentNode))
				//console.log(node)
				if(nodename == 'INPUT' || nodename == 'TEXTAREA'){
					//console.log(node.attributes)
					/*
						1. input、textarea 输入框，要对 placeholder 做翻译
						2. input 要对 type=button 的情况进行翻译
					*/
					if(node.attributes == null || typeof(node.attributes) == 'undefined'){
						result['text'] = '';
						return result;
					}

					//input，要对 type=button、submit 的情况进行翻译
					if(nodename == 'INPUT'){
						if(typeof(node.attributes.type) != 'undefined' && typeof(node.attributes.type.nodeValue) != null && (node.attributes.type.nodeValue.toLowerCase() == 'button' || node.attributes.type.nodeValue.toLowerCase() == 'submit')){
							//console.log('----是 <input type="button"');
							//取它的value
							var input_value_node = node.attributes.value;
							if(input_value_node != null && typeof(input_value_node) != 'undefined' && typeof(input_value_node.nodeValue) != 'undefined' && input_value_node.nodeValue.length > 0){
								//替换渲染
								if(typeof(originalText) != 'undefined' && originalText.length > 0){
									//this.nodes[hash][task_index].nodeValue = this.nodes[hash][task_index].nodeValue.replace(new RegExp(translate.util.regExp.pattern(task.originalText),'g'), translate.util.regExp.resultText(task.resultText));
									input_value_node.nodeValue = input_value_node.nodeValue.replace(new RegExp(translate.util.regExp.pattern(originalText),'g'), translate.util.regExp.resultText(resultText));
								}

								result['text'] = input_value_node.nodeValue;
								result['node'] = input_value_node;
								return result;
							}
						}
					}
					//console.log(node)

					//input textarea 的 placeholder 情况
					if(typeof(node.attributes['placeholder']) != 'undefined'){
						//console.log(node);
						//替换渲染
						if(typeof(originalText) != 'undefined' && originalText.length > 0){
							//this.nodes[hash][task_index].nodeValue = this.nodes[hash][task_index].nodeValue.replace(new RegExp(translate.util.regExp.pattern(task.originalText),'g'), translate.util.regExp.resultText(task.resultText));
							node.attributes['placeholder'].nodeValue = node.attributes['placeholder'].nodeValue.replace(new RegExp(translate.util.regExp.pattern(originalText),'g'), translate.util.regExp.resultText(resultText));
						}

						result['text'] = node.attributes['placeholder'].nodeValue;
						result['node'] = node.attributes['placeholder'];
						return result;
						//return node.attributes['placeholder'].nodeValue;
					}
					//console.log(node)
					result['text'] = '';
					return result;
				}
				if(nodename == 'META'){
					//meta标签，如是关键词、描述等
					if(typeof(node.name) != 'undefined' && node.name != null){
						var nodeAttributeName = node.name.toLowerCase();  //取meta 标签的name 属性
						if(nodeAttributeName == 'keywords' || nodeAttributeName == 'description'){
							//替换渲染
							if(typeof(originalText) != 'undefined' && originalText != null && originalText.length > 0){
								//this.nodes[hash][task_index].nodeValue = this.nodes[hash][task_index].nodeValue.replace(new RegExp(translate.util.regExp.pattern(task.originalText),'g'), translate.util.regExp.resultText(task.resultText));
								node.content = node.content.replace(new RegExp(translate.util.regExp.pattern(originalText),'g'), translate.util.regExp.resultText(resultText));
							}

							result['text'] = node.content;
							return result;
						}
					}

					result['text'] = '';
					return result;
				}
				if(nodename == 'IMG'){
					if(typeof(node.alt) == 'undefined' || node.alt == null){
						result['text'] = '';
						return result;
					}

					//替换渲染
					if(typeof(originalText) != 'undefined' && originalText.length > 0){
						//this.nodes[hash][task_index].nodeValue = this.nodes[hash][task_index].nodeValue.replace(new RegExp(translate.util.regExp.pattern(task.originalText),'g'), translate.util.regExp.resultText(task.resultText));
						node.alt = node.alt.replace(new RegExp(translate.util.regExp.pattern(originalText),'g'), translate.util.regExp.resultText(resultText));
					}
					result['text'] = node.alt;
					return result;
				}
				
				
				//其他的
				if(node.nodeValue == null || typeof(node.nodeValue) == 'undefined'){
					result['text'] = '';
				}else if(node.nodeValue.trim().length == 0){
					//避免就是单纯的空格或者换行
					result['text'] = '';
				}else{
					//替换渲染
					if(typeof(originalText) != 'undefined' && originalText != null && originalText.length > 0){
						//this.nodes[hash][task_index].nodeValue = this.nodes[hash][task_index].nodeValue.replace(new RegExp(translate.util.regExp.pattern(task.originalText),'g'), translate.util.regExp.resultText(task.resultText));
						node.nodeValue = node.nodeValue.replace(new RegExp(translate.util.regExp.pattern(originalText),'g'), translate.util.regExp.resultText(resultText));
					}
					result['text'] = node.nodeValue;
				}
				return result;
			}
		},
		//获取这个node元素的node name ,如果未发现，则返回''空字符串
		getNodeName:function(node){
			if(node == null || typeof(node) == 'undefined'){
				return '';
			}

			if(node.nodeName == null || typeof(node.nodeName) == 'undefined'){
				return '';
			}

			var nodename = node.nodeName;
			//console.log('nodename:'+nodename+', node:'+node);
			return nodename;
		},
		//向下遍历node
		whileNodes:function(uuid, node){
			if(node == null || typeof(node) == 'undefined'){
				return;
			}

			//如果这个uuid没有，则创建
			if(typeof(translate.nodeQueue[uuid]) == 'undefined' || translate.nodeQueue[uuid] == null){
				translate.nodeQueue[uuid] = new Array(); //创建
				translate.nodeQueue[uuid]['expireTime'] = Date.now() + 120*1000; //删除时间，10分钟后删除
				translate.nodeQueue[uuid]['list'] = new Array(); 
				//console.log('创建 --- ');
				//console.log(uuid)
			}

			//console.log('---'+typeof(node)+', ');
			//判断是否是有title属性，title属性也要翻译
			if(typeof(node) == 'object' && typeof(node['title']) == 'string' && node['title'].length > 0){
				//将title加入翻译队列
				//console.log('---'+node.title+'\t'+node.tagName);
				//console.log(node)
				//console.log('------------');
				
				//判断当前元素是否在ignore忽略的tag、id、class name中
				if(!translate.ignore.isIgnore(node)){
					//不在忽略的里面，才会加入翻译
					translate.addNodeToQueue(uuid, node, node['title'], 'title');
				}
			}
			
			var childNodes = node.childNodes;
			if(childNodes.length > 0){
				for(var i = 0; i<childNodes.length; i++){
					translate.element.whileNodes(uuid, childNodes[i]);
				}
			}else{
				//单个了
				translate.element.findNode(uuid, node);
			}
		},
		findNode:function(uuid, node){
			if(node == null || typeof(node) == 'undefined'){
				return;
			}
			//console.log(node)
			if(node.parentNode == null){
				return;
			}

			//console.log('-----parent')
			var parentNodeName = translate.element.getNodeName(node.parentNode);
			//node.parentNode.nodeName;
			if(parentNodeName == ''){
				return;
			}
			if(translate.ignore.tag.indexOf(parentNodeName.toLowerCase()) > -1){
				//忽略tag
				//console.log('忽略tag：'+parentNodeName);
				return;
			}
	
			/****** 判断忽略的class ******/
			/*
			这段理论上不需要了，因为在  translate.ignore.isIgnore 判断了
			var ignoreClass = false;	//是否是被忽略的class，true是
			var parentNode = node.parentNode;
			while(node != parentNode && parentNode != null){
				//console.log('node:'+node+', parentNode:'+parentNode);
				if(parentNode.className != null){
					if(translate.ignore.class.indexOf(parentNode.className) > -1){
						//发现ignore.class 当前是处于被忽略的 class
						ignoreClass = true;
					}
				}
				
				parentNode = parentNode.parentNode;
			}
			if(ignoreClass){
				//console.log('ignore class :  node:'+node.nodeValue);
				return;
			}
			*/
			/**** 判断忽略的class结束 ******/



			/**** 避免中途局部翻译，在判断一下 ****/
			//判断当前元素是否在ignore忽略的tag、id、class name中
			if(translate.ignore.isIgnore(node)){
				//console.log('node包含在要忽略的元素中：');
				//console.log(node);
				return;
			}

			//node分析
			var nodeAnaly = translate.element.nodeAnalyse.get(node);
			if(nodeAnaly['text'].length > 0){
				//有要翻译的目标内容，加入翻译队列
				//console.log('addNodeToQueue -- '+nodeAnaly['node']+', text:' + nodeAnaly['text']);
				translate.addNodeToQueue(uuid, nodeAnaly['node'], nodeAnaly['text']);
			}
			
			/*
			//console.log(node.nodeName+', type:'+node.nodeType+', '+node.nodeValue);
			var nodename = translate.element.getNodeName(node);
			if(nodename == 'INPUT' || nodename == 'TEXTAREA'){
				//input 输入框，要对 placeholder 做翻译
				console.log('input---'+node.attributes);
				if(node.attributes == null || typeof(node.attributes) == 'undefined'){
					return;
				}
	
				if(typeof(node.attributes['placeholder']) != 'undefined'){
					//console.log(node.attributes['placeholder'].nodeValue);
					//加入要翻译的node队列
					//translate.nodeQueue[translate.hash(node.nodeValue)] = node.attributes['placeholder'];
					//加入要翻译的node队列
					//translate.addNodeToQueue(translate.hash(node.attributes['placeholder'].nodeValue), node.attributes['placeholder']);
					translate.addNodeToQueue(uuid, node.attributes['placeholder'], node.attributes['placeholder'].nodeValue);
				}
				
				//console.log(node.getAttribute("placeholder"));
			}else if(nodename == 'META'){
				//meta标签，如是关键词、描述等
				if(typeof(node.name) != 'undefined' && node.name != null){
					var nodeAttributeName = node.name.toLowerCase();  //取meta 标签的name 属性
					//console.log(nodeName);
					if(nodeAttributeName == 'keywords' || nodeAttributeName == 'description'){
						//关键词、描述
						translate.addNodeToQueue(uuid, node, node.content);
					}
				}
				//console.log(node.name)
			}else if(nodename == 'IMG'){
				//console.log('-------'+node.alt);
				translate.addNodeToQueue(uuid, node, node.alt);
			}else if(node.nodeValue != null && node.nodeValue.trim().length > 0){
	
				//过滤掉无效的值
				if(node.nodeValue != null && typeof(node.nodeValue) == 'string' && node.nodeValue.length > 0){
				}else{
					return;
				}
	
				//console.log(node.nodeValue+' --- ' + translate.language.get(node.nodeValue));
				
				//console.log(node.nodeName);
				//console.log(node.parentNode.nodeName);
				//console.log(node.nodeValue);
				//加入要翻译的node队列
				translate.addNodeToQueue(uuid, node, node.nodeValue);	
				//translate.addNodeToQueue(translate.hash(node.nodeValue), node);
				//translate.nodeQueue[translate.hash(node.nodeValue)] = node;
				//translate.nodeQueue[translate.hash(node.nodeValue)] = node.nodeValue;
				//node.nodeValue = node.nodeValue+'|';
	
			}
			*/

		},
	},

	


	
	/*
	 * 将发现的元素节点加入待翻译队列
	 * uuid execute方法执行的唯一id
	 * node 当前text所在的node
	 * text 当前要翻译的目标文本
	 * attribute 是否是元素的某个属性。比如 a标签中的title属性， a.title 再以node参数传入时是string类型的，本身并不是node类型，所以就要传入这个 attribute=title 来代表这是a标签的title属性。同样第二个参数node传入的也不能是a.title，而是传入a这个node元素
	 */
	addNodeToQueue:function(uuid, node, text, attribute){
		if(node == null || text == null || text.length == 0){
			return;
		}


		//console.log('find tag ignore : '+node.nodeValue+', '+node.nodeName+", "+node.nodeType+", "+node.tagName);
		//console.log('addNodeToQueue into -- node:'+node+', text:'+text+', attribute:'+attribute);
		var nodename = translate.element.getNodeName(node);
		
		//判断如果是被 <!--  --> 注释的区域，不进行翻译
		if(nodename.toLowerCase() == '#comment'){
			return;
		}
		//console.log('\t\t'+text);
		//取要翻译字符的hash
		var key = translate.util.hash(text);
		/*
		如果是input 的 placeholder ,就会出现这个情况
		if(node.parentNode == null){
			console.log('node.parentNode == null');
			return;
		}
		*/

		//console.log(node.parentNode);
		//console.log(node.parentNode.nodeName);
		
		//判断其内容是否是 script、style 等编程的文本，如果是，则不进行翻译，不然翻译后还会影响页面正常使用
		if(translate.util.findTag(text)){
			//console.log('find tag ignore : '+node.nodeValue+', '+node.nodeName+", "+node.nodeType+", "+node.tagName);
			//console.log(node.parentNode.nodeName);
			
			//获取到当前文本是属于那个tag标签中的，如果是script、style 这样的标签中，那也会忽略掉它，不进行翻译
			if(node.parentNode == null){
				//没有上级了，或是没获取到上级，忽略
				return;
			}
			//去上级的tag name
			var parentNodeName = translate.element.getNodeName(node.parentNode);
			//node.parentNode.nodeName;
			if(parentNodeName == 'SCRIPT' || parentNodeName == 'STYLE'){
				//如果是script、style中发现的，那也忽略
				return;
			}
		}
		//console.log(node.nodeValue);
	
		//获取当前是什么语种
		var langs = translate.language.get(text);
		//console.log('langs');
		//console.log(langs);

		
		//过滤掉要转换为的目标语种，比如要转为英语，那就将本来是英语的部分过滤掉，不用再翻译了
		if(typeof(langs[translate.to]) != 'undefined'){
			delete langs[translate.to];
		}
		
		var isWhole = translate.whole.isWhole(node);
		//console.log('isWhole:'+isWhole+', '+text);

		if(!isWhole){
			//常规方式，进行语种分类


			/* if(this.nodeQueue[lang] == null || typeof(this.nodeQueue[lang]) == 'undefined'){
				this.nodeQueue[lang] = new Array();
			} 
			//创建二维数组
			if(this.nodeQueue[lang][key] == null || typeof(this.nodeQueue[lang][key]) == 'undefined'){
				this.nodeQueue[lang][key] = new Array();
			}
			*/
			//console.log(langs);
			
			for(var lang in langs) {
				//创建二维数组， key为语种，如 english
				/*
				放到了 translate.addNodeQueueItem 进行判断
				if(translate.nodeQueue[uuid]['list'][lang] == null || typeof(translate.nodeQueue[uuid]['list'][lang]) == 'undefined'){
					translate.nodeQueue[uuid]['list'][lang] = new Array();
				}
				*/
				//console.log('|'+langs[lang].length);
				//遍历出该语种下有哪些词需要翻译
				for(var word_index = 0; word_index < langs[lang].length; word_index++){
					//console.log('start:'+word_index)
					//console.log(langs[lang][word_index]);
					if(typeof(langs[lang][word_index]) == 'undefined' || typeof(langs[lang][word_index]['text']) == 'undefined'){
						//理论上应该不会，但多加个判断
						continue;
					}
					var word = langs[lang][word_index]['text']; //要翻译的词
					var beforeText = langs[lang][word_index]['beforeText'];
					var afterText = langs[lang][word_index]['afterText'];

					translate.addNodeQueueItem(uuid, node, word, attribute, lang, beforeText, afterText);

					/*
					var hash = translate.util.hash(word); 	//要翻译的词的hash					
					//创建三维数组， key为要通过接口翻译的文本词或句子的 hash （注意并不是node的文本，而是node拆分后的文本）
					if(translate.nodeQueue[uuid]['list'][lang][hash] == null || typeof(translate.nodeQueue[uuid]['list'][lang][hash]) == 'undefined'){
						translate.nodeQueue[uuid]['list'][lang][hash] = new Array();
						
						translate.nodeQueue[uuid]['list'][lang][hash]['nodes'] = new Array();
						translate.nodeQueue[uuid]['list'][lang][hash]['original'] = word;
						translate.nodeQueue[uuid]['list'][lang][hash]['translateText'] = translate.nomenclature.dispose(word); //自定义术语处理
						//translate.nodeQueue[uuid]['list'][lang][hash]['beforeText'] = beforeText;
						//translate.nodeQueue[uuid]['list'][lang][hash]['afterText'] = afterText;
						//translate.nodeQueue[uuid]['list'][lang][hash]['attribute'] = attribute; //放入 nodes[index][attribute] 元素中
						
						//其中key： nodes 是第四维数组，里面存放具体的node元素对象
						

						//console.log(translate.nodeQueue[uuid]['list'][lang][hash]);
					}
					
					var isEquals = false; //queue中是否已经加入过这个node了（当然是同一hash同一node情况）
					if(typeof(node.isSameNode) != 'undefined'){	//支持 isSameNode 方法判断对象是否相等
						for(var node_index = 0; node_index < translate.nodeQueue[uuid]['list'][lang][hash]['nodes'].length; node_index++){
							if(node.isSameNode(translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['node'])){
								//相同，那就不用在存入了
								//console.log('相同，那就不用在存入了')
								isEquals = true;
								//console.log(node)
								continue;
							}
						}
					}
					if(isEquals){
						//相同，那就不用在存入了
						continue;
					}

					//往五维数组nodes中追加node元素
					var nodesIndex = translate.nodeQueue[uuid]['list'][lang][hash]['nodes'].length;
					translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex] = new Array();
					translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex]['node']=node; 
					translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex]['attribute']=attribute;
					translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex]['beforeText'] = beforeText;
					translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex]['afterText'] = afterText;
					
					*/

					//console.log('end:'+word_index)
				}
				
			}
			



		}else{
			//直接翻译整个元素内的内容，不再做语种分类，将出现次数最多的语种作为原本语种

			var lang = Object.keys(langs)[0];
			translate.addNodeQueueItem(uuid, node, text, attribute, lang, '', '');
		}

		
		
		//this.nodeQueue[lang][key][this.nodeQueue[lang][key].length]=node; //往数组中追加
	},

	/*

		服务于上面的 addNodeToQueue ，用于区分不同type情况，进行调用此加入 translate.nodeQueue
		uuid, node, attribute 这五个参数说明见 addNodeToQueue 的参数说明，相同
		
		word 要实际进行翻译的文本，也就是要把它拿来进行通过后端翻译接口进行翻译的文本
		lang 当前要翻译的文本的语种，如 english
		beforeText 参见 translate.nodeQueue 注释中第七维的解释
		afterText 参见 translate.nodeQueue 注释中第七维的解释

	*/
	addNodeQueueItem:function(uuid, node, word, attribute, lang, beforeText, afterText){
		//创建二维数组， key为语种，如 english
		if(translate.nodeQueue[uuid]['list'][lang] == null || typeof(translate.nodeQueue[uuid]['list'][lang]) == 'undefined'){
			translate.nodeQueue[uuid]['list'][lang] = new Array();
		}

		//var word = text;	//要翻译的文本
		var hash = translate.util.hash(word); 	//要翻译的文本的hash

		//创建三维数组， key为要通过接口翻译的文本词或句子的 hash 。这里翻译的文本也就是整个node元素的内容了，不用在做拆分了
		if(translate.nodeQueue[uuid]['list'][lang][hash] == null || typeof(translate.nodeQueue[uuid]['list'][lang][hash]) == 'undefined'){
			translate.nodeQueue[uuid]['list'][lang][hash] = new Array();
			
			/*
			 * 创建四维数组，存放具体数据
			 * key: nodes 包含了这个hash的node元素的数组集合，array 多个。其中
			 		nodes[index]['node'] 存放当前的node元素
			 		nodes[index]['attribute'] 存放当前hash，也就是翻译文本针对的是什么，是node本身（nodeValue），还是 node 的某个属性，比如title属性。如果这里不为空，那就是针对的属性操作的
			 * key: original 原始的要翻译的词或句子，html加载完成但还没翻译前的文本，用于支持当前页面多次语种翻译切换而无需跳转
			 * beforeText、afterText:见 translate.nodeQueue 的说明
			 */
			translate.nodeQueue[uuid]['list'][lang][hash]['nodes'] = new Array();
			translate.nodeQueue[uuid]['list'][lang][hash]['original'] = word;
			translate.nodeQueue[uuid]['list'][lang][hash]['translateText'] = translate.nomenclature.dispose(word); //自定义术语处理

			//其中key： nodes 是第四维数组，里面存放具体的node元素对象
		}


		var isEquals = false; //queue中是否已经加入过这个node了（当然是同一hash同一node情况）
		if(typeof(node.isSameNode) != 'undefined'){	//支持 isSameNode 方法判断对象是否相等
			for(var node_index = 0; node_index < translate.nodeQueue[uuid]['list'][lang][hash]['nodes'].length; node_index++){
				if(node.isSameNode(translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][node_index]['node'])){
					//相同，那就不用在存入了
					//console.log('相同，那就不用在存入了')
					isEquals = true;
					//console.log(node)
					continue;
				}
			}
		}
		if(isEquals){
			//相同，那就不用在存入了
			return;
		}

		//往五维数组nodes中追加node元素
		var nodesIndex = translate.nodeQueue[uuid]['list'][lang][hash]['nodes'].length;
		translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex] = new Array();
		translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex]['node']=node; 
		translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex]['attribute']=attribute;
		translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex]['beforeText'] = beforeText;
		translate.nodeQueue[uuid]['list'][lang][hash]['nodes'][nodesIndex]['afterText'] = afterText;
		

	},

	//全部翻译，node内容全部翻译，而不是进行语种提取，直接对node本身的全部内容拿出来进行直接全部翻译
	whole:{
		class:[],
		tag:[],
		id:[],

		//运行时出现自检并在浏览器控制台提示性文本。 
		//在执行翻译，也就是 execute() 时，会调用此方法。
		executeTip:function(){
			if(translate.whole.class.length == 0 && translate.whole.tag.length == 0 && translate.whole.id.length == 0){
				
			}else{
				console.log('您开启了 translate.whole 此次行为避开了浏览器端的文本语种自动识别，而是暴力的直接对某个元素的整个文本进行翻译，很可能会产生非常大的翻译量，请谨慎！有关每日翻译字符的说明，可参考： http://translate.zvo.cn/42557.html ');
			}

			if(translate.whole.tag.indexOf('html') > -1){
				console.log('自检发现您设置了 translate.whole.tag 其中有 html ，这个是不生效的，最大只允许设置到 body ');
			}
		},

		//当前元素是属于全部翻译定义的元素
		/*
			传入一个元素，判断这个元素是否是被包含的。 这个会找父类，看看父类中是否包含在其之中。
			return true是在其中，false不再其中
		*/
		isWhole:function(ele){
			if(translate.whole.class.length == 0 && translate.whole.tag.length == 0 && translate.whole.id.length == 0){
				//未设置，那么直接返回false
				return false;
			}
			if(ele == null || typeof(ele) == 'undefined'){
				return false;
			}

			var parentNode = ele;
			var maxnumber = 100;	//最大循环次数，避免死循环
			while(maxnumber-- > 0){
				if(parentNode == null || typeof(parentNode) == 'undefined'){
					//没有父元素了
					return false;
				}

				//判断Tag
				//var tagName = parentNode.nodeName.toLowerCase(); //tag名字，小写
				var nodename = translate.element.getNodeName(parentNode).toLowerCase(); //tag名字，小写
				if(nodename.length > 0){
					//有nodename
					if(nodename == 'html' || nodename == '#document'){
						//上层元素已经是顶级元素了，那肯定就不是了
						return false;
					}
					if(translate.whole.tag.indexOf(nodename) > -1){
						//发现ignore.tag 当前是处于被忽略的 tag
						return true;
					}
				}
				

				//判断class name
				if(parentNode.className != null){
					var classNames = parentNode.className;
					if(classNames == null || typeof(classNames) != 'string'){
						continue;
					}
					//console.log('className:'+typeof(classNames));
					//console.log(classNames);
					classNames = classNames.trim().split(' ');
					for(var c_index = 0; c_index < classNames.length; c_index++){
						if(classNames[c_index] != null && classNames[c_index].trim().length > 0){
							//有效的class name，进行判断
							if(translate.whole.class.indexOf(classNames[c_index]) > -1){
								//发现ignore.class 当前是处于被忽略的 class
								return true;
							}
						}
					}					
				}

				//判断id
				if(parentNode.id != null && typeof(parentNode.id) != 'undefined'){
					//有效的class name，进行判断
					if(translate.whole.id.indexOf(parentNode.id) > -1){
						//发现ignore.id 当前是处于被忽略的 id
						return true;
					}
				}

				//赋予判断的元素向上一级
				parentNode = parentNode.parentNode;
			}

			return false;
		}
	},

	language:{
		//当前本地语种，本地语言，默认是简体中文。设置请使用 translate.language.setLocal(...)。不可直接使用，使用需用 getLocal()
		local:'',
		//传入语种。具体可传入哪些参考： http://api.translate.zvo.cn/doc/language.json.html
		setLocal:function(languageName){
			translate.setUseVersion2(); //Set to use v2.x version
			translate.language.local = languageName;
		},
		//获取当前本地语种，本地语言，默认是简体中文。设置请使用 translate.language.setLocal(...)
		getLocal:function(){
			//判断是否设置了本地语种，如果没设置，自动给其设置
			if(translate.language.local == null || translate.language.local.length < 1){
				translate.language.autoRecognitionLocalLanguage();
			}
			return translate.language.local;
		},
		/*
			获取当前语种。
			比如当前设置的本地语种是简体中文，用户并未切换其他语种，那么这个方法将返回本地当前的语种，也就是等同于 translate.language.getLocal()
			如果用户切换为英语进行浏览，那么这个方法将返回翻译的目标语种，也就是 english
		*/
		getCurrent:function(){
			var to_storage = translate.storage.get('to');
			if(to_storage != null && typeof(to_storage) != 'undefined' && to_storage.length > 0){
				//之前有过使用，并且主动设置过目标语种
				return to_storage;
			}
			return translate.language.getLocal();
		},
		//如果第一次用，默认以什么语种显示。
		//比如本地当前语种是简体中文，这里设置为english，那么用户第一次使用时，会自动翻译为english进行显示。如果用户手动切换为其他语种比如韩语，那么就遵循用户手动切换的为主，显示韩语。
		setDefaultTo:function(languageName){
			var to_storage = translate.storage.get('to');
			if(to_storage != null && typeof(to_storage) != 'undefined' && to_storage.length > 0){
				//之前有过使用，并且主动设置过目标语种，那么不进行处理
			}else{
				//没有设置过，进行处理
				translate.storage.set('to', languageName);
				translate.to = languageName;
			}
		},
		//根据URL传参控制以何种语种显示
		//设置可以根据当前访问url的某个get参数来控制使用哪种语言显示。
		//比如当前语种是简体中文，网页url是http://translate.zvo.cn/index.html ,那么可以通过在url后面增加 language 参数指定翻译语种，来使网页内容以英文形态显示 http://translate.zvo.cn/index.html?language=english
		setUrlParamControl:function(paramName){
			if(typeof(paramName) == 'undefined' || paramName.length < 1){
				paramName = 'language';
			}
			var paramValue = translate.util.getUrlParam(paramName);
			if(typeof(paramValue) == 'undefined'){
				return;
			}
			if(paramValue == '' || paramValue == 'null' || paramValue == 'undefined'){
				return;
			}

			translate.storage.set('to', paramValue);
			translate.to = paramValue;
		},
		//自动识别当前页面是什么语种
		autoRecognitionLocalLanguage:function(){
			if(translate.language.local != null && translate.language.local.length > 2){
				//已设置过了，不需要再设置
				return;
			}

			var bodyText = document.body.outerText;
			if(bodyText == null || typeof(bodyText) == 'undefined' || bodyText.length < 1){
				//未取到，默认赋予简体中文
				translate.language.local = 'chinese_simplified';
				return;
			}

			bodyText = bodyText.replace(/\n|\t|\r/g,''); //将回车换行等去掉

			var langs = new Array(); //上一个字符的语种是什么，当前字符向上数第一个字符。格式如 ['language']='english', ['chatstr']='a', ['storage_language']='english'  这里面有3个参数，分别代表这个字符属于那个语种，其字符是什么、存入了哪种语种的队列。因为像是逗号，句号，一般是存入本身语种中，而不是存入特殊符号中。 
			for(var i=0; i<bodyText.length; i++){
				var charstr = bodyText.charAt(i);
				var lang = translate.language.getCharLanguage(charstr);
				if(lang == ''){
					//未获取到，未发现是什么语言
					//continue;
					lang = 'unidentification';
				}
				langs.push(lang);
			}

			//从数组中取出现频率最高的
			var newLangs = translate.util.arrayFindMaxNumber(langs);

			//移除数组中的特殊字符
			var index = newLangs.indexOf('specialCharacter');
			if(index > -1){
				newLangs.splice(index,1); //移除数组中的特殊字符
			}

			if(newLangs.length > 0){
				//找到排序出现频率最多的
				translate.language.local = newLangs[0];
			}else{
				//没有，默认赋予简体中文
				translate.language.local = 'chinese_simplified';
			}
		},
		
		/*
		 * 获取当前字符是什么语种。返回值是一个语言标识，有  chinese_simplified简体中文、japanese日语、korean韩语、
		 * str : node.nodeValue 或 图片的 node.alt 等
		 * 如果语句长，会全句翻译，以保证翻译的准确性，提高可读性。
		 * 如果语句短，会自动将特殊字符、要翻译的目标语种给过滤掉，只取出具体的要翻译的目标语种文本
		 *
		 * 返回 存放不同语言的数组，格式如
		 *  	[
					"english":[
						{beforeText: '', afterText: '', text: 'emoambue hag'},
						......
					],
					"japanese":[
						{beforeText: ' ', afterText: ' ', text: 'ẽ '},
						......
					]
		 		]
		 * 		
		 */
		get:function(str){
			//将str拆分为单个char进行判断

			var langs = new Array(); //当前字符串包含哪些语言的数组，其内如 english
			var langStrs = new Array();	//存放不同语言的文本，格式如 ['english'][0] = 'hello'
			var upLangs = []; //上一个字符的语种是什么，当前字符向上数第一个字符。格式如 ['language']='english', ['chatstr']='a', ['storage_language']='english'  这里面有3个参数，分别代表这个字符属于那个语种，其字符是什么、存入了哪种语种的队列。因为像是逗号，句号，一般是存入本身语种中，而不是存入特殊符号中。 
			var upLangsTwo = []; //上二个字符的语种是什么 ，当前字符向上数第二个字符。 格式如 ['language']='english', ['chatstr']='a', ['storage_language']='english'  这里面有3个参数，分别代表这个字符属于那个语种，其字符是什么、存入了哪种语种的队列。因为像是逗号，句号，一般是存入本身语种中，而不是存入特殊符号中。
			
			//var upLangs = ''; //上一个字符的语种是什么，格式如 english
			for(var i=0; i<str.length; i++){
				var charstr = str.charAt(i);
				//console.log('charstr:'+charstr)
				var lang = translate.language.getCharLanguage(charstr);
				if(lang == ''){
					//未获取到，未发现是什么语言
					//continue;
					lang = 'unidentification';
				}
				
				var result = translate.language.analyse(lang, langStrs, upLangs, upLangsTwo, charstr);
				//console.log(result)
				langStrs = result['langStrs'];
				//记录上几个字符
				if(typeof(upLangs['language']) != 'undefined'){
					upLangsTwo['language'] = upLangs['language'];
					upLangsTwo['charstr'] = upLangs['charstr'];
					upLangsTwo['storage_language'] = upLangs['storage_language'];
				}
				//upLangs['language'] = lang;
				upLangs['language'] = result['storage_language'];
				upLangs['charstr'] = charstr;
				upLangs['storage_language'] = result['storage_language'];
				//console.log(result['storage_language'])
				//console.log(upLangs['language']);
				langs.push(lang);
			}
			
			//console.log(langStrs);
			
			//console.log(langs);
			//console.log(langStrs);

/*
			//从数组中取出现频率最高的
			var newLangs = translate.util.arrayFindMaxNumber(langs);
			
			//移除当前翻译目标的语言。因为已经是目标预言了，不需要翻译了
			var index = newLangs.indexOf(translate.to);
			if(index > -1){
				newLangs.splice(index,1); //移除
			}

			//移除特殊字符
			var index = newLangs.indexOf('specialCharacter');
			if(index > -1){
				newLangs.splice(index,1); //移除数组中的特殊字符
			}

			if(newLangs.length > 0){
				//还剩一个或多个，（如果是多个，那应该是这几个出现的频率一样，所以取频率最高的时返回了多个）
				return newLangs[0];
			}else{
				//没找到，直接返回空字符串
				return '';
			}
			*/
			
			
			//去除特殊符号
			//for(var i = 0; i<langStrs.length; i++){
			/*
			var i = 0;
			for(var item in langStrs) {
				if(item == 'unidentification' || item == 'specialCharacter'){
					//langStrs.splice(i,1); //移除
					delete langStrs[item];
				}
				console.log(item);
				i++;
			}
			*/
			
			//console.log(langStrs);
			if(typeof(langStrs['unidentification']) != 'undefined'){
				delete langStrs['unidentification'];
			}
			if(typeof(langStrs['specialCharacter']) != 'undefined'){
				delete langStrs['specialCharacter'];
			}
			if(typeof(langStrs['number']) != 'undefined'){
				delete langStrs['number'];
			}
			
			
			//console.log('get end');
			return langStrs;
		},
		// 传入一个char，返回这个char属于什么语种，返回如 chinese_simplified、english  如果返回空字符串，那么表示未获取到是什么语种
		getCharLanguage:function(charstr){
			if(charstr == null || typeof(charstr) == 'undefined'){
				return '';
			}
			
			if(this.english(charstr)){
				return 'english';
			}else if(this.specialCharacter(charstr)){
				return 'specialCharacter';
			}else if(this.number(charstr)){
				return 'number';	
			}else if(this.chinese_simplified(charstr)){
				return 'chinese_simplified';
			}else if(this.japanese(charstr)){
				return 'japanese';
			}else if(this.korean(charstr)){
				return 'korean';
			}else{
				console.log('not find is language , char : '+charstr+', unicode: '+charstr.charCodeAt(0).toString(16));
				return '';
			}
		},
		/*
		 * 对字符串进行分析，分析字符串是有哪几种语言组成。
		 * language : 当前字符的语种，传入如 english
		 * langStrs : 操作的，如 langStrs['english'][0] = '你好'
		 * upLangs  : 当前字符之前的上一个字符的语种是什么，当前字符向上数第一个字符。格式如 ['language']='english', ['chatstr']='a', ['storage_language']='english'  这里面有3个参数，分别代表这个字符属于那个语种，其字符是什么、存入了哪种语种的队列。因为像是逗号，句号，一般是存入本身语种中，而不是存入特殊符号中。
		 * upLangsTwo : 当前字符之前的上二个字符的语种是什么 ，当前字符向上数第二个字符。 格式如 ['language']='english', ['chatstr']='a', ['storage_language']='english'  这里面有3个参数，分别代表这个字符属于那个语种，其字符是什么、存入了哪种语种的队列。因为像是逗号，句号，一般是存入本身语种中，而不是存入特殊符号中。
		 * chatstr  : 当前字符，如  h
		 */
		analyse:function(language, langStrs, upLangs, upLangsTwo, charstr){
			if(typeof(langStrs[language]) == 'undefined'){
				langStrs[language] = new Array();
			}
			var index = 0; //当前要存入的数组下标
			if(typeof(upLangs['storage_language']) == 'undefined'){
				//第一次，那么还没存入值，index肯定为0
				//console.log('第一次，那么还没存入值，index肯定为0')
				//console.log(upLangs['language'])
			}else{
				//console.log('analyse, charstr : '+charstr+', upLangs :');
				//console.log(upLangs);
				//var isEqual = upLangs['storage_language'] == language; //上次跟当前字符是否都是同一个语种（这个字符跟这个字符前一个字符）

				/*
					英语每个单词之间都会有空格分割. 如果是英文的话，英文跟特殊字符还要单独判断一下，避免拆开，造成翻译不准，单个单词翻译的情况
					所以如果上次的字符是英文或特殊符号，当前字符是特殊符号(逗号、句号、空格，然后直接笼统就吧特殊符号都算上吧)，那么也将当次的特殊符号变为英文来进行适配
					示例  
						hello word  的 "o w"
						hello  word  的 "  w"
						hello  word  的 "w  "
						this is a dog  的 " a "
				*/
				//console.log(language == 'specialCharacter');
				//如果两个字符类型不一致，但当前字符是英文或连接符时，进行判断
				/*
				if(!isEqual){
					if(language == 'english' || translate.language.connector(charstr)){
						console.log('1.'+(language == 'english' || translate.language.connector(charstr))+', upLangs str:'+upLangs['charstr']);
						//上一个字符是英文或连接符
						//console.log('teshu:'+translate.language.connector(upLangs['charstr'])+', str:'+upLangs['charstr']);
						if(upLangs['language'] == 'english' || translate.language.connector(upLangs['charstr'])) {
							console.log('2');
							//如果上二个字符不存在，那么刚开始，不再上面几种情况之中，直接不用考虑
							if(typeof(upLangsTwo['language']) != 'undefined'){
								console.log('3')
								//上二个字符是空（字符串刚开始），或者是英文
								if(upLangsTwo['language'] == 'english' || translate.language.connector(upLangsTwo['charstr'])){
									//满足这三个条件，那就将这三个拼接到一起
									console.log('4/5: '+', two lang:'+upLangsTwo['language']+', str:'+upLangsTwo['charstr'])
									isEqual = true;
									if(language == 'specialCharacter' && upLangs['language'] == 'specialCharacter' && upLangsTwo['language'] == 'specialCharacter'){
										//如果三个都是特殊字符，或后两个是特殊字符，第一个是空（刚开始），那就归入特殊字符
										language = 'specialCharacter';
										//console.log('4')
									}else{
										//不然就都归于英文中。
										//这里更改是为了让下面能将特殊字符（像是空格逗号等）也一起存入数组
										language = 'english';
										console.log(5)
									}
								}
							}
						}
					}
				}
				*/

				/*
					不判断当前字符，而判断上个字符，是因为当前字符没法获取未知的下个字符。
				*/
				//if(!isEqual){

					//如果当前字符是连接符
					if(translate.language.connector(charstr)){
						language = upLangs['storage_language'];
						/*
						//判断上个字符是否存入了待翻译字符，如要将中文翻译为英文，而上个字符是中文，待翻译，那将连接符一并加入待翻译字符中去，保持句子完整性
						//判断依据是上个字符存储至的翻译字符语种序列，不是特殊字符，而且也不是要翻译的目标语种，那肯定就是待翻译的，将连接符加入待翻译中一起进行翻译
						if(upLangs['storage_language'] != 'specialCharacter' && upLangs['storage_language'] != translate.to){
							
							language = upLangs['storage_language'];
							console.log('teshu:'+charstr+', 当前字符并入上个字符存储翻译语种:'+upLangs['storage_language']);
						}
						*/
					}
				//}

				//console.log('isEqual:'+isEqual);
				/*
				if(isEqual){
					//跟上次语言一样，那么直接拼接
					index = langStrs[language].length-1; 
					//但是还有别的特殊情况，v2.1针对英文翻译准确度的适配，会有特殊字符的问题
					if(typeof(upLangs['storage_language']) != 'undefined' && upLangs['storage_language'] != language){
						//如果上个字符存入的翻译队列跟当前这个要存入的队列不一个的话，那应该是特殊字符像是逗号句号等导致的，那样还要额外一个数组，不能在存入之前的数组了
						index = langStrs[language].length; 
					}
				}else{
					//console.log('新开');
					//当前字符跟上次语言不样，那么新开一个数组
					index = langStrs[language].length;
					//console.log('++, inde:'+index+',lang:'+language+', length:'+langStrs[language].length)
				}
				*/

				//当前要翻译的语种跟上个字符要翻译的语种一样，那么直接拼接
				if(upLangs['storage_language'] == language){
					index = langStrs[language].length-1; 
				}else{
					//console.log('新开');
					//当前字符跟上次语言不样，那么新开一个数组
					index = langStrs[language].length;
				}
			}
			if(typeof(langStrs[language][index]) == 'undefined'){
				langStrs[language][index] = new Array();
				langStrs[language][index]['beforeText'] = '';
				langStrs[language][index]['afterText'] = '';
				langStrs[language][index]['text'] = '';
			}
			langStrs[language][index]['text'] = langStrs[language][index]['text'] + charstr;
			/*
				中文英文混合时，当中文+英文并没有空格间隔，翻译为英文时，会使中文翻译英文的结果跟原本的英文单词连到一块。这里就是解决这种情况
				针对当前非英文(不需要空格分隔符，像是中文、韩语)，但要翻译为英文（需要空格作为分割符号，像是法语等）时的情况进行判断
			*/
			//if(translate.language.getLocal() != 'english' && translate.to == 'english'){
			//当前本地语种的语言是连续的，但翻译的目标语言不是连续的（空格间隔）
			if( translate.language.wordBlankConnector(translate.language.getLocal()) == false && translate.language.wordBlankConnector(translate.to)){	
				if((upLangs['storage_language'] != null && typeof(upLangs['storage_language']) != 'undefined' && upLangs['storage_language'].length > 0)){
					//上个字符存在
					//console.log(upLangs['storage_language']);
					if(upLangs['storage_language'] != 'specialCharacter'){
						//上个字符不是特殊字符 （是正常语种。且不会是连接符，连接符都并入了正常语种）

						//if( upLangs['storage_language'] != 'english' && language == 'english'){
						//上个字符的语言是连续的，但当前字符的语言不是连续的（空格间隔）
						if( translate.language.wordBlankConnector(upLangs['storage_language']) == false && translate.language.wordBlankConnector(language) ){
							//上个字符不是英语，当前字符是英语，这种情况要在上个字符后面追加空格，因为当前字符是英文，就不会在执行翻译操作了
							//console.log(upLangs['language']);
							langStrs[upLangs['storage_language']][langStrs[upLangs['storage_language']].length-1]['afterText'] = ' ';
						}else if(upLangs['storage_language'] == 'english' && language != 'english'){
							//上个字符是英语，当前字符不是英语，直接在当前字符前面追加空格
							langStrs[language][index]['beforeText'] = ' ';
						}
					}

					
				}
			}

			var result = new Array();
			result['langStrs'] = langStrs;
			result['storage_language'] = language;	//实际存入了哪种语种队列
			//console.log(result);
			//console.log(langStrs)
			//console.log(charstr);
			return result;
		},
		
		/*
		 * 不同于语言，这个只是单纯的连接符。比如英文单词之间有逗号、句号、空格， 汉字之间有逗号句号书名号的。避免一行完整的句子被分割，导致翻译不准确
		 * 单独拿他出来，目的是为了更好的判断计算，提高翻译的准确率
		 */
		connector:function(str){
			
			/*
				通用的有 空格、阿拉伯数字
				1.不间断空格\u00A0,主要用在office中,让一个单词在结尾处不会换行显示,快捷键ctrl+shift+space ;
				2.半角空格(英文符号)\u0020,代码中常用的;
				3.全角空格(中文符号)\u3000,中文文章中使用; 
			*/	
			if(/.*[\u0020\u00A0\u202F\u205F\u3000]+.*$/.test(str)){
				return true;
			}
			/*
				U+0030 0 数字 0
				U+0031 1 数字 1
				U+0032 2 数字 2
				U+0033 3 数字 3
				U+0034 4 数字 4
				U+0035 5 数字 5
				U+0036 6 数字 6
				U+0037 7 数字 7
				U+0038 8 数字 8
				U+0039 9 数字 9
			*/
			if(/.*[\u0030-\u0039]+.*$/.test(str)){ 
				return true
			}
			
		
			/*
				英文场景
				英文逗号、句号
				这里不包括() 因为这里面的基本属于补充，对语句前后并无强依赖关系
				
				U+0021 ! 叹号
				U+0022 " 双引号
				U+0023 # 井号
				U+0024 $ 价钱/货币符号
				U+0025 % 百分比符号
				U+0026 & 英文“and”的简写符号
				U+0027 ' 引号
				U+002C , 逗号
				U+002D - 连字号/减号
				U+002E . 句号
				U+003A : 冒号
				U+003B ; 分号
				U+003F ? 问号
				U+0040 @ 英文“at”的简写符号


			*/
			if(/.*[\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u002C\u002D\u002E\u003A\u003B\u003F\u0040]+.*$/.test(str)){
				return true;
			}
			
			/*
				中文标点符号
				名称	Unicode	符号
				句号	3002	。
				问号	FF1F	？
				叹号	FF01	！
				逗号	FF0C	，
				顿号	3001	、
				分号	FF1B	；
				冒号	FF1A	：
				引号	300C	「
				 	300D	」
				引号	300E	『
				 	300F	』
				引号	2018	‘
				 	2019	’
				引号	201C	“
				 	201D	”
				括号	FF08	（
				 	FF09	）
				括号	3014	〔
				 	3015	〕
				括号	3010	【
				 	3011	】
				破折号	2014	—
				省略号	2026	…
				连接号	2013	–
				间隔号	FF0E	．
				书名号	300A	《
				 	300B	》
				书名号	3008	〈
				 	3009	〉
				键盘123前面的那个符号 · 00b7
			*/
			if(/.*[\u3002\uFF1F\uFF01\uFF0C\u3001\uFF1B\uFF1A\u300C\u300D\u300E\u300F\u2018\u2019\u201C\u201D\uFF08\uFF09\u3014\u3015\u3010\u3011\u2014\u2026\u2013\uFF0E\u300A\u300B\u3008\u3009\u00b7]+.*$/.test(str)){
				return true;
			}



			
			//不是，返回false
			return false;
		},
		//语种的单词连接符是否需要空格，比如中文、韩文、日语都不需要空格，则返回false, 但是像是英文的单词间需要空格进行隔开，则返回true
		//如果未匹配到，默认返回true
		//language：语种，传入如  english
		wordBlankConnector:function(language){
			if(language == null || typeof(language) == 'undefined'){
				return true;
			}
			switch (language.trim().toLowerCase()){
		  		case 'chinese_simplified':
		  			return false;
		  		case 'chinese_traditional':
		  			return false;
		  		case 'korean':
		  			return false;
		  		case 'japanese':
		  			return false;
		  	}
		  	//其他情况则返回true
		  	return true;
		},
		//是否包含中文，true:包含
		chinese_simplified:function(str){
			if(/.*[\u4e00-\u9fa5]+.*$/.test(str)){ 
				return true
			} else {
				return false;
			}
		},
		//是否包含英文，true:包含
		english:function(str){
			if(/.*[\u0041-\u005a]+.*$/.test(str)){ 
				return true;
			} else if(/.*[\u0061-\u007a]+.*$/.test(str)){
				return true;
			} else {
				return false;
			}
		},
		//是否包含日语，true:包含
		japanese:function(str){
			if(/.*[\u0800-\u4e00]+.*$/.test(str)){ 
				return true
			} else {
				return false;
			}
		},
		//是否包含韩语，true:包含
		korean:function(str){
			if(/.*[\uAC00-\uD7AF]+.*$/.test(str)){ 
				return true
			} else {
				return false;
			}
		},
		//0-9 阿拉伯数字
		number:function(str){
			if(/.*[\u0030-\u0039]+.*$/.test(str)){
				return true;
			}
			return false;
		},
		//是否包含特殊字符
		specialCharacter:function(str){
			//如：① ⑴ ⒈ 
			if(/.*[\u2460-\u24E9]+.*$/.test(str)){ 
				return true
			}

			//如：┊┌┍ ▃ ▄ ▅
			if(/.*[\u2500-\u25FF]+.*$/.test(str)){ 
				return true
			}

			//如：㈠  ㎎ ㎏ ㎡
			if(/.*[\u3200-\u33FF]+.*$/.test(str)){ 
				return true
			}
			
			//如：与ANSI对应的全角字符
			if(/.*[\uFF00-\uFF5E]+.*$/.test(str)){ 
				return true
			}

			//其它特殊符号
			if(/.*[\u2000-\u22FF]+.*$/.test(str)){ 
				return true
			}

			// 、><等符号
			if(/.*[\u3001-\u3036]+.*$/.test(str)){
				return true;
			}

			/*
			//阿拉伯数字 0-9
			if(/.*[\u0030-\u0039]+.*$/.test(str)){
				return true;
			}
			*/
			
			/*
			U+0020 空格
			U+0021 ! 叹号
			U+0022 " 双引号
			U+0023 # 井号
			U+0024 $ 价钱/货币符号
			U+0025 % 百分比符号
			U+0026 & 英文“and”的简写符号
			U+0027 ' 引号
			U+0028 ( 开 左圆括号
			U+0029 ) 关 右圆括号
			U+002A * 星号
			U+002B + 加号
			U+002C , 逗号
			U+002D - 连字号/减号
			U+002E . 句号
			U+002F / 左斜杠
			*/
			if(/.*[\u0020-\u002F]+.*$/.test(str)){
				return true;
			}

			/*
				U+003A : 冒号
				U+003B ; 分号
				U+003C < 小于符号
				U+003D = 等于号
				U+003E > 大于符号
				U+003F ? 问号
				U+0040 @ 英文“at”的简写符号
				U+0041 A 拉丁字母 A
				U+0042 B 拉丁字母 B
				U+0043 C 拉丁字母 C
				U+0044 D 拉丁字母 D
				U+0045 E 拉丁字母 E
				U+0046 F 拉丁字母 F
				U+0047 G 拉丁字母 G
				U+0048 H 拉丁字母 H
				U+0049 I 拉丁字母 I
				U+004A J 拉丁字母 J
				U+004B K 拉丁字母 K
				U+004C L 拉丁字母 L
				U+004D M 拉丁字母 M
				U+004E N 拉丁字母 N
				U+004F O 拉丁字母 O
				U+0050 P 拉丁字母 P
				U+0051 Q 拉丁字母 Q
				U+0052 R 拉丁字母 R
				U+0053 S 拉丁字母 S
				U+0054 T 拉丁字母 T
				U+0055 U 拉丁字母 U
				U+0056 V 拉丁字母 V
				U+0057 W 拉丁字母 W
				U+0058 X 拉丁字母 X
				U+0059 Y 拉丁字母 Y
				U+005A Z 拉丁字母 Z
				U+005B [ 开 方括号
				U+005C \ 右斜杠
				U+005D ] 关 方括号
				U+005E ^ 抑扬（重音）符号
				U+005F _ 底线
				U+0060 ` 重音符
				U+0061 a 拉丁字母 a
				U+0062 b 拉丁字母 b
				U+0063 c 拉丁字母 c
				U+0064 d 拉丁字母 d
				U+0065 e 拉丁字母 e
				U+0066 f 拉丁字母 f
				U+0067 g 拉丁字母 g
				U+0068 h 拉丁字母 h
				U+0069 i 拉丁字母 i
				U+006A j 拉丁字母 j
				U+006B k 拉丁字母 k
				U+006C l 拉丁字母 l（L的小写）
				U+006D m 拉丁字母 m
				U+006E n 拉丁字母 n
				U+006F o 拉丁字母 o
				U+0070 p 拉丁字母 p
				U+0071 q 拉丁字母 q
				U+0072 r 拉丁字母 r
				U+0073 s 拉丁字母 s
				U+0074 t 拉丁字母 t
				U+0075 u 拉丁字母 u
				U+0076 v 拉丁字母 v
				U+0077 w 拉丁字母 w
				U+0078 x 拉丁字母 x
				U+0079 y 拉丁字母 y
				U+007A z 拉丁字母 z
				U+007B { 开 左花括号
				U+007C | 直线
				U+007D } 关 右花括号
				U+007E ~ 波浪纹
			*/
			if(/.*[\u003A-\u007E]+.*$/.test(str)){
				return true;
			}
			
			//空白字符，\u0009\u000a + https://cloud.tencent.com/developer/article/2128593
			if(/.*[\u0009\u000a\u0020\u00A0\u1680\u180E\u202F\u205F\u3000\uFEFF]+.*$/.test(str)){
				return true;
			}
			if(/.*[\u2000-\u200B]+.*$/.test(str)){
				return true;
			}
			
			/*
			拉丁字母
			代码 显示 描述
			U+00A1 ¡ 倒转的叹号
			U+00A2 ¢ （货币单位）分钱、毫子
			U+00A3 £ （货币）英镑
			U+00A4 ¤ （货币）当货币未有符号时以此替代
			U+00A5 ¥ （货币）日元
			U+00A6 ¦ 两条断开的直线
			U+00A7 § 文件分不同部分
			U+00A8 ¨ （语言）分音
			U+00A9 © 版权符
			U+00AA ª （意大利文、葡萄牙文、西班牙文）阴性序数
			U+00AB « 双重角形引号
			U+00AC ¬ 逻辑非
			U+00AE ® 商标
			U+00AF ¯ 长音
			U+00B0 ° 角度
			U+00B1 ± 正负号
			U+00B2 ² 二次方
			U+00B3 ³ 三次方
			U+00B4 ´ 锐音符
			U+00B5 µ 百万分之一，10?6
			U+00B6 ¶ 文章分段
			U+00B7 · 间隔号
			U+00B8 ¸ 软音符
			U+00B9 ¹ 一次方
			U+00BA º （意大利文、葡萄牙文、西班牙文）阳性序数
			U+00BB » 指向右的双箭头
			U+00BC ¼ 四分之一
			U+00BD ½ 二分之一
			U+00BE ¾ 四分之三
			U+00BF ¿ 倒转的问号
			U+00C1 Á 在拉丁字母 A 上加锐音符
			U+00C2 Â 在拉丁字母 A 上加抑扬符“^”
			U+00C3 Ã 在拉丁字母 A 上加“~”
			U+00C4 Ä 在拉丁字母 A 上加分音符“..”
			U+00C5 Å 在拉丁字母 A 上加角度符“°”
			U+00C6 Æ 拉丁字母 A、E 的混合
			U+00C7 Ç 在拉丁字母 C 下加软音符
			U+00C8 È 在拉丁字母 E 上加重音符
			U+00C9 É 在拉丁字母 E 上加锐音符
			U+00CA Ê 在拉丁字母 E 上加抑扬符
			U+00CB Ë 在拉丁字母 E 上加分音符
			U+00CC Ì 在拉丁字母 I 上加重音符
			U+00CD Í 在拉丁字母 I 上加锐音符
			U+00CE Î 在拉丁字母 I 上加抑扬符
			U+00CF Ï 在拉丁字母 I 上加分音符
			U+00D0 Ð 古拉丁字母，现只有法罗文和冰岛文和越南语使用
			U+00D1 Ñ 在拉丁字母 N 上加波浪纹“~”
			U+00D2 Ò 在拉丁字母 O 上加重音符
			U+00D3 Ó 在拉丁字母 O 上加锐音符
			U+00D4 Ô 在拉丁字母 O 上加抑扬符
			U+00D5 Õ 在拉丁字母 O 上加波浪纹“~”
			U+00D6 Ö 在拉丁字母 O 上加分音符
			U+00D7 × 乘号，亦可拖按“Alt”键，同时按“41425”五键
			U+00D8 Ø 在拉丁字母 O 由右上至左下加对角斜线“/”
			U+00D9 Ù 在拉丁字母 U 上加重音符
			U+00DA Ú 在拉丁字母 U 上加锐音符
			U+00DB Û 在拉丁字母 U 上加抑扬符
			U+00DC Ü 在拉丁字母 U 上加分音符
			U+00DD Ý 在拉丁字母 Y 上加锐音符
			U+00DE Þ 古拉丁字母，现已被“Th”取替
			U+00DF ß 德文字母
			U+00E0 à 在拉丁字母 a 上加重音符
			U+00E1 á 在拉丁字母 a 上加锐音符
			U+00E2 â 在拉丁字母 a 上加抑扬符
			U+00E3 ã 在拉丁字母 a 上加波浪纹“~”
			U+00E4 ä 在拉丁字母 a 上加分音符
			U+00E5 å 在拉丁字母 a 上加角度符“°”
			U+00E6 æ 拉丁字母 a、e 的混合
			U+00E7 ç 在拉丁字母 c 下加软音符
			U+00E8 è 在拉丁字母 e 上加锐音符
			U+00E9 é 在拉丁字母 e 上加重音符
			U+00EA ê 在拉丁字母 e 上加抑扬符
			U+00EB ë 在拉丁字母 e 上加分音符
			U+00EC ì 在拉丁字母 i 上加重音符
			U+00ED í 在拉丁字母 i 上加锐音符
			U+00EE î 在拉丁字母 i 上加抑扬符
			U+00EF ï 在拉丁字母 i 上加分音符
			U+00F0 ð 古拉丁字母
			U+00F1 ñ 在拉丁字母 n 上加波浪纹“~”
			U+00F2 ò 在拉丁字母 o 上加重音符
			U+00F3 ó 在拉丁字母 o 上加锐音符
			U+00F4 ô 在拉丁字母 o 上加抑扬符
			U+00F5 õ 在拉丁字母 o 上加波浪纹“~”
			U+00F6 ö 在拉丁字母 o 上加分音符
			U+00F7 ÷ 除号，亦可拖按“Alt”键，同时按“41426”五键
			U+00F8 ø 在拉丁字母 o 由右上至左下加对角斜线“/”
			U+00F9 ù 在拉丁字母 u 上加重音符
			U+00FA ú 在拉丁字母 u 上加锐音符
			U+00FB ? 在拉丁字母 u 上加抑扬符
			U+00FC ü 在拉丁字母 u 上加分音符
			U+00FD ý 在拉丁字母 y 上加锐音符
			U+00FE þ 古拉丁字母，现已被“th”取替
			U+00FF ü 在拉丁字母 u 上加分音符
			拉丁字母（扩展 A）
			代码 显示 描述
			U+0100 Ā 在拉丁字母 A 上加长音符
			U+0101 ā 在拉丁字母 a 上加长音符
			U+0102 Ă 在拉丁字母 A 上加短音符
			U+0103 ă 在拉丁字母 a 上加短音符
			U+0104 Ą 在拉丁字母 A 上加反尾形符
			U+0105 ą 在拉丁字母 a 上加反尾形符
			拉丁字母（扩展 C）
			代码 显示 描述
			U+2C60 Ⱡ 在拉丁字母“L”中间加两条横线“=”
			U+2C61 ⱡ 在拉丁字母“l”（L 的小写）中间加两条横线“=”
			U+2C62 Ɫ 在拉丁字母“L”（大写）中间加一条波浪线“~”
			U+2C63 Ᵽ 在拉丁字母“P”中间加一条横线“-”
			U+2C64 Ɽ 在拉丁字母“R”下加一条尾巴
			U+2C65 ⱥ 在拉丁字母“a”上加一条对角斜线“/”
			U+2C66 ⱦ 在拉丁字母“t”上加一条对角斜线“/”
			U+2C67 Ⱨ 在拉丁字母“H”下加一条尾巴
			U+2C68 ⱨ 在拉丁字母“h”下加一条尾巴
			U+2C69 Ⱪ 在拉丁字母“K”下加一条尾巴
			U+2C6A ⱪ 在拉丁字母“k”下加一条尾巴
			U+2C6B Ⱬ 在拉丁字母“Z”下加一条尾巴
			U+2C6C ⱬ 在拉丁字母“z”下加一条尾巴
			U+2C74 ⱴ 在拉丁字母“v”的起笔加一个弯勾
			U+2C75 Ⱶ 拉丁字母“H”的左半部
			U+2C76 ⱶ 拉丁字母“h”的左半部
			U+2C77 ⱷ 希腊字母“φ”的上半部
			*/
			if(/.*[\u00A1-\u0105]+.*$/.test(str)){
				return true;
			}
			if(/.*[\u2C60-\u2C77]+.*$/.test(str)){
				return true;
			}
			
			
			return false;
		}
	},
	//用户第一次打开网页时，自动判断当前用户所在国家使用的是哪种语言，来自动进行切换为用户所在国家的语种。
	//如果使用后，第二次在用，那就优先以用户所选择的为主
	executeByLocalLanguage:function(){
		translate.request.post(translate.request.api.ip, {}, function(data){
			//console.log(data); 
			if(data.result == 0){
				console.log('==== ERROR 获取当前用户所在区域异常 ====');
				console.log(data.info);
				console.log('==== ERROR END ====');
			}else{
				translate.setUseVersion2();
				translate.storage.set('to',data.language);	//设置目标翻译语言
				translate.to = data.language; //设置目标语言
				translate.selectLanguageTag
				translate.execute(); //执行翻译
			}
		});
	},
	
	util:{
		/* 生成一个随机UUID，复制于 https://gitee.com/mail_osc/kefu.js */
		uuid:function() {
		    var d = new Date().getTime();
		    if (window.performance && typeof window.performance.now === "function") {
		        d += performance.now(); //use high-precision timer if available
		    }
		    var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		        var r = (d + Math.random() * 16) % 16 | 0;
		        d = Math.floor(d / 16);
		        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		    });
		    return uuid;
		},

		//判断字符串中是否存在tag标签。 true存在
		findTag:function(str) {
			var reg = /<[^>]+>/g;
			return reg.test(str);
		},
		//传入一个数组，从数组中找出现频率最多的一个返回。 如果多个频率出现的次数一样，那会返回多个
		arrayFindMaxNumber:function(arr){

			// 储存每个元素出现的次数
			var numbers = {}

			// 储存出现最多次的元素
			var maxStr = []

			// 储存最多出现的元素次数
			var maxNum = 0

			for(var i =0,len=arr.length;i<len;i++){
			    if(!numbers[arr[i]]){
			          numbers[arr[i]] = 1  
			    }else{
			        numbers[arr[i]]++
			    }

			    if(numbers[arr[i]]>maxNum){
			        maxNum = numbers[arr[i]]
			    }
			}

			for(var item in numbers){
			    if(numbers[item]===maxNum){
			        maxStr.push(item)
			    }
			}
			
			return maxStr;
		},
		//对字符串进行hash化，目的取唯一值进行标识
		hash:function(str){
			if(str == null || typeof(str) == 'undefined'){
				return str;
			}
			var hash = 0, i, chr;
			if (str.length === 0){
				return hash;
			}

			for (i = 0; i < str.length; i++) {
				chr   = str.charCodeAt(i);
				hash  = ((hash << 5) - hash) + chr;
				hash |= 0; // Convert to 32bit integer
			}
			return hash+'';
		},
		//去除一些指定字符，如换行符。 如果传入的是null，则返回空字符串
		charReplace:function(str){

			if(str == null){
				return '';
			}
			str = str.trim();
			str = str.replace(/\t|\n|\v|\r|\f/g,'');	//去除换行符等
			//str = str.replace(/&/g, "%26"); //因为在提交时已经进行了url编码了
			return str;
		},
		//RegExp相关
		regExp:{
			// new RegExp(pattern, resultText); 中的 pattern 字符串的预处理
			pattern:function(str){
				//str = str.replace(/'/g,'\\\'');
				str = str.replace(/\"/g,'\\\"');
				//str = str.replace(/./g,'\\\.');
				str = str.replace(/\?/g,'\\\?');
				str = str.replace(/\$/g,'\\\$');
				str = str.replace(/\(/g,'\\\(');
				str = str.replace(/\)/g,'\\\)');
				return str;
			},
			// new RegExp(pattern, resultText); 中的 resultText 字符串的预处理
			resultText:function(str){
				//str = str.replace(/&quot;/g,"\"");
				//str = str.replace(/'/g,"\\\'");
				//str = str.replace(/"/g,"\\\"");
				return str;
			}
		},
		//获取URL的GET参数。若没有，返回""
		getUrlParam:function (name){
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return "";
		},
		/**
		 * 同步加载JS，加载过程中会阻塞，加载完毕后继续执行后面的。
		 * url: 要加载的js的url
		 */
		synchronizesLoadJs:function(url){
			var  xmlHttp = null;  
			if(window.ActiveXObject){//IE  
				try {  
					//IE6以及以后版本中可以使用  
					xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");  
				} catch (e) {  
					//IE5.5以及以后版本可以使用  
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
				}  
			}else if(window.XMLHttpRequest){  
				//Firefox，Opera 8.0+，Safari，Chrome  
				xmlHttp = new XMLHttpRequest();  
			}  
			//采用同步加载  
			xmlHttp.open("GET",url,false);  
			//发送同步请求，如果浏览器为Chrome或Opera，必须发布后才能运行，不然会报错  
			xmlHttp.send(null);  
			//4代表数据发送完毕  
			if( xmlHttp.readyState == 4 ){  
				//0为访问的本地，200到300代表访问服务器成功，304代表没做修改访问的是缓存  
				if((xmlHttp.status >= 200 && xmlHttp.status <300) || xmlHttp.status == 0 || xmlHttp.status == 304){  
					var myBody = document.getElementsByTagName("HTML")[0];  
					var myScript = document.createElement( "script" );  
					myScript.language = "javascript";  
					myScript.type = "text/javascript";  
					try{  
						//IE8以及以下不支持这种方式，需要通过text属性来设置  
						myScript.appendChild(document.createTextNode(xmlHttp.responseText));  
					}catch (ex){  
						myScript.text = xmlHttp.responseText;  
					}  
					myBody.appendChild(myScript);  
					return true;  
				}else{  
					return false;  
				}  
			}else{  
				return false;  
			}  
		},
		//加载 msg.js
		loadMsgJs:function(){
			if(typeof(msg) != 'undefined'){
				return;
			}
			translate.util.synchronizesLoadJs('http://res.zvo.cn/msg/msg.js');
		},
		/*
			对一个对象，按照对象的key的长度进行排序，越长越在前面
		*/
		objSort:function(obj){
			// 获取对象数组的所有 key，并转换为普通数组
			var keys = Array.from(Object.keys(obj));

			// 对 key 数组进行排序
			keys.sort(function(a, b){
			  return b.length - a.length;
			});

			// 定义一个新的对象数组，用来存储排序后的结果
			var sortedObj = new Array();

			// 遍历排序后的 key 数组，将对应的值复制到新的对象数组中，并删除原来的对象数组中的键值对
			for (var key of keys) {
			  sortedObj[key] = obj[key];
			}
			return sortedObj;
		}
	},
	//request请求来源于 https://github.com/xnx3/request
	request:{
		//相关API接口方面
		api:{
			/**
			 * 翻译接口请求的域名主机 host
			 * 格式注意前面要带上协议如 https:// 域名后要加 /
			 * v2.8.2 增加数组形态，如 ['https://api.translate.zvo.cn/','xxxxx'] 
			 */
			//host:'https://api.translate.zvo.cn/',
			host:['https://api.translate.zvo.cn/','https://api2.translate.zvo.cn/','https://apihwcdn.translate.zvo.cn/','https://apiqiniucdn.translate.zvo.cn/'],
			//host的备用接口，格式同host，可以填写多个，只不过这里是数组格式。只有当主 host 无法连通时，才会采用备host来提供访问。如果为空也就是 [] 则是不采用备方案。
			//backupHost:['',''],
			language:'language.json', //获取支持的语种列表接口
			translate:'translate.json', //翻译接口
			ip:'ip.json', //根据用户当前ip获取其所在地的语种
			connectTest:'connectTest.json',	//用于 translate.js 多节点翻译自动检测网络连通情况
		},
		/*
			请求后端接口的响应。无论是否成功，都会触发此处。
			另外当 xhr.readyState==4 的状态时才会触发。
			此处会在接口请求响应后、且在translate.js处理前就会触发
			@param xhr XMLHttpRequest 接口请求
			
		*/
		response:function(xhr){
			//console.log('response------');
			//console.log(xhr);
		},
		/*
			速度检测控制中心， 检测主备翻译接口的响应速度进行排列，真正请求时，按照排列的顺序进行请求
			v2.8.2增加	
			
			storage存储方面
			storage存储的key  						存的什么
			speedDetectionControl_hostQueue			hostQueue
			speedDetectionControl_hostQueueIndex	当前要使用的是 hostQueue 中的数组下标。如果没有，这里默认视为0
			speedDetectionControl_lasttime			最后一次执行速度检测的时间戳，13位时间戳


			
		*/
		speedDetectionControl:{
			/*
				翻译的队列，这是根据网络相应的速度排列的，0下标为请求最快，1次之...
				其格式为：
					[
						{
							"host":"xxxxxxxx",
							"time":123 			//这里的单位是毫秒
						},
						{
							"host":"xxxxxxxx",
							"time":123 			//这里的单位是毫秒
						}
					]
			*/
			hostQueue:[],	
			hostQueueIndex:-1,	//当前使用的 hostQueue的数组下标，  -1表示还未初始化赋予值，不可直接使用，通过 getHostQueueIndex() 使用
			
			//获取 host queue 队列
			getHostQueue:function(){
				if(translate.request.speedDetectionControl.hostQueue.length == 0){
					//还没有，先从本地存储中取，看之前是否已经设置过了
					// 只有经过真正的网络测速后，才会加入 storage 的 hostQueue
					var storage_hostQueue = translate.storage.get('speedDetectionControl_hostQueue');
					if(storage_hostQueue == null || typeof(storage_hostQueue) == 'undefined'){
						//本地存储中没有，也就是之前没设置过，是第一次用，那么直接讲 translate.request.api.host 赋予之
						//translate.request.api.host
						//console.log(typeof(translate.request.api.host))
						if(typeof(translate.request.api.host) == 'string'){
							//单个，那么赋予数组形式
							//translate.request.speedDetectionControl.hostQueue = [{"host":translate.request.api.host, time:0 }];
							translate.request.api.host = [''+translate.request.api.host];
						}

						//console.log(translate.request.api.host)
						//数组形态，多个，v2.8.2 增加多个，根据优先级返回
						translate.request.speedDetectionControl.hostQueue = [];
						for(var i = 0; i<translate.request.api.host.length; i++){
							var h = translate.request.api.host[i];
							//console.log(h);
							translate.request.speedDetectionControl.hostQueue[i] = {"host":h, time:0 };
						}
						//console.log(translate.request.speedDetectionControl.hostQueue);
						
					}else{
						//storage中有，那么赋予
						translate.request.speedDetectionControl.hostQueue = JSON.parse(storage_hostQueue);
						//console.log(storage_hostQueue);
						//console.log(translate.request.speedDetectionControl.hostQueue[0].time);
					}

					//console.log(translate.request.speedDetectionControl.hostQueue)

					/*
						当页面第一次打开初始化这个时才会进行测速，另外测速也是要判断时间的，五分钟一次
						进行测速
					*/
					var lasttime = translate.storage.get('speedDetectionControl_lasttime');
					if(lasttime == null || typeof(lasttime) == 'undefined'){
						lasttime = 0;
					}
					var updateTime = 60000;	//1分钟检测一次
					if(new Date().getTime() - lasttime > updateTime){
						translate.request.speedDetectionControl.checkResponseSpeed();
					}
					
				}
				

				return translate.request.speedDetectionControl.hostQueue;
			},

			//测试响应速度
			checkResponseSpeed:function(){
				var headers = {
					'content-type':'application/x-www-form-urlencoded',
				};


				translate.request.speedDetectionControl.checkHostQueue = []; //用于实际存储
				translate.request.speedDetectionControl.checkHostQueueMap = []; //只是map，通过key取值，无其他作用

				if(typeof(translate.request.api.host) == 'string'){
					//单个，那么赋予数组形式
					translate.request.api.host = [''+translate.request.api.host];
				}

				for(var i = 0; i < translate.request.api.host.length; i++){
					var host = translate.request.api.host[i];
					// 获取当前时间的时间戳
					translate.request.speedDetectionControl.checkHostQueueMap[host] = {
						start:new Date().getTime()
					};

					
					try{
						translate.request.send(
							host+translate.request.api.connectTest,
							{host:host},
							function(data){
								var host = data.info;
								var map = translate.request.speedDetectionControl.checkHostQueueMap[host];
								var time = new Date().getTime() - map.start;

								translate.request.speedDetectionControl.checkHostQueue.push({"host":host, "time":time });
								//按照time进行排序
								translate.request.speedDetectionControl.checkHostQueue.sort((a, b) => a.time - b.time);

								//存储到 storage 持久化
								translate.storage.set('speedDetectionControl_hostQueue',JSON.stringify(translate.request.speedDetectionControl.checkHostQueue));
								translate.storage.set('speedDetectionControl_lasttime', new Date().getTime());

								translate.request.speedDetectionControl.hostQueue = translate.request.speedDetectionControl.checkHostQueue;
								//console.log(translate.request.speedDetectionControl.hostQueue);
							},
							'post',
							true,
							headers,
							function(data){
								//console.log('eeerrr');
							},
							false
						);
					}catch(e){
						//console.log('e0000');
						//console.log(e);
						//time = 300000; //无法连接的，那么赋予 300 秒吧
					}

				}
				
			},

			//获取当前使用的host的数组下标
			getHostQueueIndex:function(){
				if(translate.request.speedDetectionControl.hostQueueIndex < 0){
					//页面当前第一次使用，赋予值
					//先从 storage 中取
					var storage_index = translate.storage.get('speedDetectionControl_hostQueueIndex');
					if(typeof(storage_index) == 'undefined' || storage_index == null){
						//存储中不存在，当前用户（浏览器）第一次使用，默认赋予0
						translate.request.speedDetectionControl.hostQueueIndex = 0;
						translate.storage.set('speedDetectionControl_hostQueueIndex',0);
					}else{
						translate.request.speedDetectionControl.hostQueueIndex = storage_index;
					}
				}
				return translate.request.speedDetectionControl.hostQueueIndex;
			},

			//获取当前要使用的host
			getHost:function(){
				var queue = translate.request.speedDetectionControl.getHostQueue();
				//console.log(queue);
				var queueIndex = translate.request.speedDetectionControl.getHostQueueIndex();
				if(queue.length > queueIndex){
					//正常，没有超出越界
					
				}else{
					//异常，下标越界了！，固定返回最后一个
					console.log('异常，下标越界了！index：'+queueIndex);
					queueIndex = queue.length-1;
				}
				//console.log(queueIndex);
				return queue[queueIndex].host;
			},

		},
		//生成post请求的url
		getUrl:function(path){
			var currentHost = translate.request.speedDetectionControl.getHost();
			var url = currentHost+path+'?v='+translate.version;
			//console.log('url: '+url);
			return url;
		},
		/**
		 * post请求
		 * @param path 请求的path（path，传入的是translate.request.api.translate 这种的，需要使用 getUrl 来组合真正请求的url ）
		 * @param data 请求的参数数据，传入如 {"goodsid":"1", "author":"管雷鸣"}
		 * @param func 请求完成的回调，传入如 function(data){ console.log(data); }
		 */
		post:function(path, data, func){
			var headers = {
				'content-type':'application/x-www-form-urlencoded',
			};
			this.send(path, data, func, 'post', true, headers, null, true);
		},
		/**
		 * 发送请求
		 * url 请求的url或者path（path，传入的是translate.request.api.translate 这种的，需要使用 getUrl 来组合真正请求的url ）
		 * data 请求的数据，如 {"author":"管雷鸣",'site':'www.guanleiming.com'} 
		 * func 请求完成的回调，传入如 function(data){}
		 * method 请求方式，可传入 post、get
		 * isAsynchronize 是否是异步请求， 传入 true 是异步请求，传入false 是同步请求
		 * headers 设置请求的header，传入如 {'content-type':'application/x-www-form-urlencoded'};
		 * abnormalFunc 响应异常所执行的方法，响应码不是200就会执行这个方法 ,传入如 function(xhr){}
		 * showErrorLog 是否控制台打印出来错误日志，true打印， false 不打印
		 */
		send:function(url, data, func, method, isAsynchronize, headers, abnormalFunc, showErrorLog){
			//post提交的参数
			var params = '';
			if(data != null){
				for(var index in data){
					if(params.length > 0){
						params = params + '&';
					}
					params = params + index + '=' + data[index];
				}
			}

			

			if(url.indexOf('https://') == 0 || url.indexOf('http://') == 0){
				//采用的url绝对路径
			}else{
				//相对路径，拼接上host
				url = translate.request.getUrl(url);
			}

			var xhr=null;
			try{
				xhr=new XMLHttpRequest();
			}catch(e){
				xhr=new ActiveXObject("Microsoft.XMLHTTP");
			}
			//2.调用open方法（true----异步）
			xhr.open(method,url,isAsynchronize);
			//设置headers
			if(headers != null){
				for(var index in headers){
					xhr.setRequestHeader(index,headers[index]);
				}
			}
			xhr.send(params);
			//4.请求状态改变事件
			xhr.onreadystatechange=function(){
			    if(xhr.readyState==4){
			    	translate.request.response(xhr); //自定义响应的拦截

			        if(xhr.status==200){
			        	//请求正常，响应码 200
			        	var json = null;
			        	try{
			        		json = JSON.parse(xhr.responseText);
			        	}catch(e){
			        		console.log(e);
			        	}
			        	if(json == null){
			        		func(xhr.responseText);
			        	}else{
			        		func(json);
			        	}
			        }else{
			        	if(showErrorLog){
				        	console.log('------- translate.js service api response error --------');
				        	console.log('    http code : '+xhr.status);
				        	console.log('    response : '+xhr.response);
				        	console.log('    request url : '+url);
				        	console.log('    request data : '+JSON.stringify(data));
				        	console.log('    request method : '+method);
				        	console.log('---------------------- end ----------------------');
			        	}
			        	
			        	if(abnormalFunc != null){
			        		abnormalFunc(xhr);
			        	}
			        }
			    }
			}
		},
		/*

			手动进行翻译操作。参数说明：
				texts: 可传入要翻译的文本、以及文本数组。 比如要一次翻译多个句子，那就可以传入数组的方式
				function: 翻译完毕后的处理函数。传入如 function(data){ console.log(data); }
						  注意，返回的data.result 为 1，则是翻译成功。  为0则是出错，可通过data.info 得到错误原因。 更详细说明参考： http://api.zvo.cn/translate/service/20230807/translate.json.html

			使用案例一： 
			translate.request.translateText('你好，我是翻译的内容', function(data){
				//打印翻译结果
				console.log(data);
			});
			
			使用案例二：
			var texts = ['我是翻译的第一句','我是翻译的第二句','我是翻译的第三句'];
			translate.request.translateText(texts, function(data){
				//打印翻译结果
				console.log(data);
			});
		*/
		translateText:function(texts, func){
			if(typeof(texts) == 'string'){
				texts = [texts];
			}

			var url = translate.request.api.translate;
			var data = {
				from:translate.language.getLocal(),
				to: translate.language.getCurrent(),
				text:encodeURIComponent(JSON.stringify(texts))
			};
			translate.request.post(url, data, function(data){
				//console.log(data); 
				if(data.result == 0){
					console.log('=======ERROR START=======');
					console.log('from : '+data.from);
					console.log('to : '+data.to);
					console.log('translate text array : '+texts);
					console.log('response : '+data.info);
					console.log('=======ERROR END  =======');
					//return;
				}

				func(data);
			});
		}
	},
	//存储，本地缓存
	storage:{
		set:function(key,value){
			localStorage.setItem(key,value);
		},
		get:function(key){
			return localStorage.getItem(key);
		}
	},
	//针对图片进行相关的语种图片替换
	images:{
		/* 要替换的图片队列，数组形态，其中某个数组的：
			key："/uploads/allimg/160721/2-160H11URA25-lp.jpg"; //旧图片，也就是原网站本身的图片。也可以绝对路径，会自动匹配 img src 的值，匹配时会进行完全匹配
			value："https://xxx.com/abc_{language}.jpg" //新图片，要被替换为的新图片。新图片路径需要为绝对路径，能直接访问到的。其中 {language} 会自动替换为当前要显示的语种。比如你要将你中文网站翻译为繁体中文，那这里会自动替换为：https://xxx.com/abc_chinese_traditional.jpg  有关{language}的取值，可查阅 http://api.translate.zvo.cn/doc/language.json.html 其中的语言标识id便是
		*/
		queues:[], 
		
		/*
			向图片替换队列中追加要替换的图片
			传入格式如：
			
			translate.images.add({
				"/uploads/a.jpg":"https://www.zvo.cn/a_{language}.jpg",
				"/uploads/b.jpg":"https://www.zvo.cn/b_{language}.jpg",
			});
			
			参数说明：
			key  //旧图片，也就是原网站本身的图片。也可以绝对路径，会自动匹配 img src 的值，匹配时会进行完全匹配
			value //新图片，要被替换为的新图片。新图片路径需要为绝对路径，能直接访问到的。其中 {language} 会自动替换为当前要显示的语种。比如你要将你中文网站翻译为繁体中文，那这里会自动替换为：https://xxx.com/abc_chinese_traditional.jpg  有关{language}的取值，可查阅 http://api.translate.zvo.cn/doc/language.json.html 其中的语言标识id便是
		*/
		add:function(queueArray){
			/*
			translate.images.queues[translate.images.queues.length] = {
				old:oldImage,
				new:newImage
			}
			*/
			for(var key in queueArray){
				translate.images.queues[key] = queueArray[key];
			}
		},
		//执行图片替换操作，将原本的图片替换为跟翻译语种一样的图片
		execute:function(){
			//console.log(translate.images.queues);
			if(Object.keys(translate.images.queues).length < 1){
				//如果没有，那么直接取消图片的替换扫描
				return;
			}
			
			/*** 寻找img标签中的图片 ***/
			var imgs = document.getElementsByTagName('img');
			for(var i = 0; i < imgs.length; i ++){
				var img = imgs[i];
				if(typeof(img.src) == 'undefined' || img.src == null || img.src.length == 0){
					continue;
				}
				
				for(var key in translate.images.queues){
					var oldImage = key; //原本的图片src
					var newImage = translate.images.queues[key]; //新的图片src，要替换为的
					//console.log('queue+'+oldImage);
					if(oldImage == img.src){
						//console.log('发现匹配图片:'+img.src);
						/*
						//判断当前元素是否在ignore忽略的tag、id、class name中
						if(translate.ignore.isIgnore(node)){
							console.log('node包含在要忽略的元素中：');
							console.log(node);
							continue;
						}
						*/
						
						//没在忽略元素里，可以替换
						newImage = newImage.replace(new RegExp('{language}','g'), translate.to);
						img.src = newImage;
					}
				}
				
			}
			
			
			/********** 还要替换style中的背景图 */
			// 获取当前网页中所有的元素
			var elems = document.getElementsByTagName("*");
			// 遍历每个元素，检查它们是否有背景图
			for (var i = 0; i < elems.length; i++) {
				var elem = elems[i];
				// 获取元素的计算后样式
				var style = window.getComputedStyle(elem, null);
				// 获取元素的背景图URL
				var bg = style.backgroundImage;
				// 如果背景图不为空，打印出来
				if (bg != "none") {
					//console.log(bg);
					var old_img = translate.images.gainCssBackgroundUrl(bg);
					//console.log("old_img:"+old_img);
					if(typeof(translate.images.queues[old_img]) != 'undefined'){
						//存在
						var newImage = translate.images.queues[old_img];
						newImage = newImage.replace(new RegExp('{language}','g'), translate.to);
						//更换翻译指定图像
						elem.style.backgroundImage='url("'+newImage+'")';
					}else{
						//console.log('发现图像'+old_img+', 但未做语种适配');
					}
				}
			}



			
		},
		//取css中的背景图，传入 url("https://xxx.com/a.jpg")  返回里面单纯的url
		gainCssBackgroundUrl:function(str){
			// 使用indexOf方法，找到第一个双引号的位置
			var start = str.indexOf("\"");
			// 使用lastIndexOf方法，找到最后一个双引号的位置
			var end = str.lastIndexOf("\"");
			// 如果找到了双引号，使用substring方法，截取中间的内容
			if (start != -1 && end != -1) {
				var url = str.substring(start + 1, end); // +1是为了去掉双引号本身
				//console.log(url); // https://e-assets.gitee.com/gitee-community-web/_next/static/media/mini_app.2e6b6d93.jpg!/quality/100
				return url;
			}
			return str;
		}
	},
	//对翻译结果进行复原。比如当前网页是简体中文的，被翻译为了英文，执行此方法即可复原为网页本身简体中文的状态，而无需在通过刷新页面来实现
	reset:function(){
		var currentLanguage = translate.language.getCurrent(); //获取当前翻译至的语种
		for(var queue in translate.nodeQueue){
			//console.log(queue);
			for(var lang in translate.nodeQueue[queue].list){
				//console.log(lang);
				
				for(var hash in translate.nodeQueue[queue].list[lang]){
					var item = translate.nodeQueue[queue].list[lang][hash];
					//console.log(item);
					for(var index in item.nodes){
						//console.log(item.nodes[index]);
						//item.nodes[index].node.nodeValue = item.original;
						var currentShow = translate.storage.get('hash_'+currentLanguage+'_'+hash); //当前显示出来的文字，也就是已经翻译后的文字
						//console.log('hash_'+lang+'_'+hash+'  --  '+currentShow);
						if(typeof(currentShow) == 'undefined'){
							continue;
						}
						if(currentShow == null){
							continue;
						}
						if(currentShow.length == 0){
							continue;
						}
/*
						if(item.beforeText.length > 0 || item.afterText.length > 0){
							console.log('----'+currentShow);
							console.log(item);
						}
						
						if(item.beforeText.length > 0){
							currentShow = currentShow.substring(currentShow.lastIndexOf(item.beforeText)+1, currentShow.length);
						}
						if(item.afterText.length > 0){
							currentShow = currentShow.substring(0, currentShow.lastIndexOf(item.afterText));
						}
						if(item.beforeText.length > 0 || item.afterText.length > 0){
							console.log(currentShow);
						}
*/						
						translate.element.nodeAnalyse.analyse(item.nodes[index].node, currentShow, item.original, item.nodes[index].node.attribute);
					}
				}
			}
		}

		//清除设置storage中的翻译至的语种
		translate.storage.set('to', '');
		translate.to = null;
		//重新渲染select
		translate.selectLanguageTag.render();
	},
	
	/*
		划词翻译，鼠标在网页中选中一段文字，会自动出现对应翻译后的文本
		有网友 https://gitee.com/huangguishen 提供。
		详细使用说明参见：http://translate.zvo.cn/41557.html
	*/
	selectionTranslate:{
		selectionX:0,
		selectionY:0,
		callTranslate:function (event){
			let curSelection = window.getSelection();
			//相等认为没有划词
			if (curSelection.anchorOffset == curSelection.focusOffset) return;
			let translateText = window.getSelection().toString();

			//简单Copy原有代码了
			var url = translate.request.api.translate
			var data = {
				from:translate.language.getLocal(),
				to:translate.to,
				text:encodeURIComponent(JSON.stringify([translateText]))
			};
			translate.request.post(url, data, function(data) {
				if (data.result == 0) return;
				let curTooltipEle = document.querySelector('#translateTooltip')
				curTooltipEle.innerText = data.text[0];
				curTooltipEle.style.top =selectionY+20+"px";
				curTooltipEle.style.left = selectionX+50+"px" ;
				curTooltipEle.style.display = "";
			});
		},
		start:function () {
			//新建一个tooltip元素节点用于显示翻译
			let tooltipEle = document.createElement('span');
			tooltipEle.innerText = '';
			tooltipEle.setAttribute('id', 'translateTooltip');
			tooltipEle.setAttribute('style', 'background-color:black;color:#fff;text-align:center;border-radius:6px;padding:5px;position:absolute;z-index:999;top:150%;left:50%; ');
			//把元素节点添加到body元素节点中成为其子节点，放在body的现有子节点的最后
			document.body.appendChild(tooltipEle);
			//监听鼠标按下事件，点击起始点位置作为显示翻译的位置点
			document.addEventListener('mousedown', (event)=>{ selectionX= event.pageX;selectionY= event.pageY ;}, false);			
			//监听鼠标弹起事件，便于判断是否处于划词
			document.addEventListener('mouseup', translate.selectionTranslate.callTranslate, false);
			//监听鼠标点击事件，隐藏tooltip，此处可优化
			document.addEventListener('click', (event)=>{  document.querySelector('#translateTooltip').style.display = "none"}, false);
		}
	}


	
	/**************************** v2.0 end */
	
}
/*
	将页面中的所有node节点，生成其在当前页面的唯一标识字符串uuid
	开源仓库： https://github.com/xnx3/nodeuuid.js
	原理： 当前节点的nodeName + 当前节点在父节点下，属于第几个 tagName ，然后追个向父级进行取，将node本身+父级+父父级+.... 拼接在一起
*/
var nodeuuid = {
	index:function(node){
		var parent = node.parentNode;
        if(parent == null){
          return '';
        }

        var childs;
        if(typeof(node.tagName) == 'undefined'){
        	//console.log('undefi');
        	childs = parent.childNodes;
        	//console.log(Array.prototype.indexOf.call(childs, node));
        }else{
        	// 使用querySelectorAll()方法获取所有与node元素相同标签名的子节点
	        childs = parent.querySelectorAll(node.tagName);
	        // 使用indexOf()方法获取node元素在子节点集合中的位置
        }
        var index = Array.prototype.indexOf.call(childs, node); 
        //console.log('--------'+node.tagName);
        return node.nodeName + "" + (index+1);
	},
	uuid:function(node){
		var uuid = '';
		var n = node;
		while(n != null){
			var id = nodeuuid.index(n);
			//console.log(id);
			if(id != ''){
				if(uuid != ''){
					uuid = '_'+uuid;
				}
				uuid = id + uuid;
			}
			//console.log(uuid)
			n = n.parentNode;
		}
		return uuid;
	}
}
console.log('------ translate.js ------\nTwo lines of js html automatic translation, page without change, no language configuration file, no API Key, SEO friendly! Open warehouse : https://github.com/xnx3/translate \n两行js实现html全自动翻译。 无需改动页面、无语言配置文件、无API Key、对SEO友好！完全开源，代码仓库：https://gitee.com/mail_osc/translate');

//这个只是v1使用到
try{
	translate.init();
	//translate.execute();
}catch(e){ console.log(e); }