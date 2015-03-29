function SoftXpath(){
		/*changed var moz = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && !document.implementation.hasFeature('LS', '3.0') ;*/
		var moz = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined');
		/*changed var xmlDomOpera = ((document.implementation) && (document.implementation.createDocument) && document.implementation.hasFeature('LS', '3.0')?true:false);*/
		var xmlDomOpera = false;
		var xmlDom = (moz || xmlDomOpera?document.implementation.createDocument("", "doc", null):new ActiveXObject("MSXML2.DOMDocument.3.0"));
		var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		var is_Safari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
		var is_KMeleon = navigator.userAgent.toLowerCase().indexOf('k-meleon') > -1;
		var o = this;
		var p_ns="";
		var p_nsurl="";
		var p_namespaceRe = /\//gi;
		var p_namespaceReExists = /\/\//i;
		
		reservedXpathKeywords=["ancestor","ancestor-or-self","attribute","child","descendant","descendant-or-self","following","following-sibling","namespace","parent","preceding","preceding-sibling","self"];
		this.registerNamespace=function(ns,nsurl){
			p_ns = ns;
			p_nsurl = nsurl;
		}
		
		function testReservedKey(curkey){
			for(var i=0;i<reservedXpathKeywords.length;i++){
				if(String(reservedXpathKeywords[i])==curkey){
					return true;
				}
			}
			return false;
		
		}
		/*changed*/
		//if(xmlDomOpera){
			//ls = document.implementation.createLSParser(1,null);
		//}
		this.load = function(filepath){
			var isLoaded=false;
			xmlDom.async = false;
			if(xmlDomOpera){
				try{
					xmlDom = ls.parseURI(filepath);
					isLoaded = (xmlDom.documentElement.nodeName=="parsererror"?false:true);
				}
				catch(e){
					isLoaded = false;
				}	
			}
			else{
				if(is_chrome || is_Safari || is_KMeleon){
					
					var xmlhttp = new XMLHttpRequest();
					
					xmlhttp.open("GET",filepath,false);
					xmlhttp.send(null);
					try{
						xmlDom = xmlhttp.responseXML.documentElement;
							
						return true;
					}
					catch(e){
						
						return false;
					}	
			}
				else{
					try{
						isLoaded = xmlDom.load(filepath);
					}
					catch(e){
						return false;
					}	
				}	
			}
			
			return isLoaded;
		}
		this.loadXML = function(xmlstring){
			var isLoaded=false;
			if(moz  || xmlDomOpera){
			    var parser = new DOMParser();
				xmlDom = parser.parseFromString(xmlstring, "text/xml");
				isLoaded = (xmlDom.documentElement.nodeName=="parsererror"?false:true);
			}
			else{
				isLoaded = xmlDom.loadXML(xmlstring);
			}
			return isLoaded;
		}
		
		this.selectNodes = function(xpath){
			var p_resultXpath="";
			var resultXpath="";
			var resultsI = new Array();
			var ex = xpath.match(p_namespaceReExists);
			if(p_ns!=""){
					var correct_xpath = String(xpath).split(p_namespaceRe);
					for(var i=0;i<correct_xpath.length;i++){
						if(correct_xpath[i].substring(0,1)!="@"){
							if(correct_xpath[i]>""){
							    
								if(i>0 && !testReservedKey(String(correct_xpath[i-1]).split("::")[1])){
									if(typeof String(correct_xpath[i]).split("::")[1]!="undefined"){
										p_resultXpath+=String(correct_xpath[i]).split("::")[0] + "::" + p_ns + ":" + String(correct_xpath[i]).split("::")[1] + "/";
									}
									else{
										p_resultXpath+=p_ns + ":" + correct_xpath[i] + "/";
									}
								}
								else{
									p_resultXpath+=p_ns + ":" + correct_xpath[i] + "/";
								}
								
							}	
						}
						else{
							p_resultXpath+=correct_xpath[i] + "/";
						}
					}
					
					p_resultXpath = p_resultXpath.substring(0,p_resultXpath.length-1);
			}	
			else{
				p_resultXpath = xpath;
			}
			
			
			if(ex!=null){
				if(p_ns!=""){
					resultXpath=ex + p_resultXpath;
				}
				else{
					resultXpath=p_resultXpath;
				}
			}
			
			if(moz){
				var serializer = new XMLSerializer();
			
				var xpe = new XPathEvaluator();
				var nsResolver = (new XPathEvaluator()).createNSResolver(xmlDom.ownerDocument == null ? xmlDom.documentElement : xmlDom.ownerDocument.documentElement);
				try{
					var result = (xpath>""?xpe.evaluate(resultXpath, xmlDom, nsResolver, 0, null):"0");
					
				}
				catch(e){
					return resultsI;
					
				}
				
				if(result!="0"){
				    while (res = result.iterateNext()){
						//alert(res.textContent);
						
						try{
							xmstr = serializer.serializeToString(res);
						}
						catch(e){xmstr="";};	
						
					    resultsI[resultsI.length]={nodeName:res.nodeName,text:res.textContent,me:{_:res,xml:xmstr}};
				    }
				    
				} 
				
			}
			else{
			    try{
			        try{
			            xmlDom.setProperty ("SelectionNamespaces", "xmlns:" + p_ns + "='"+p_nsurl+"'");
			            xmlDom.setProperty ("SelectionLanguage", "XPath");
			        }
			        catch(e){}
			        
			        
            		nodes = xmlDom.selectNodes(resultXpath);
            		
            		
				    for(i=0;i<nodes.length;i++){
						//for(o in nodes[i]){
            				//alert(o);
            			//}
					    resultsI[i]={nodeName:nodes[i].nodeName,text:nodes[i].childNodes[0].nodeValue,me:{_:nodes[i],xml:nodes[i].xml}};
				    }
				 }
				 catch(e){};
			}
			
			return resultsI;
		}
} 


