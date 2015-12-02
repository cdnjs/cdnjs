//////////////////////////////////////////////////////////////////////////////////////////
///
///  Cutback v2.0
///  A JS Library to easy build Doubleclick Ad Banners
///  Moxie Team
///  
///  Contact information: 
///  Juan Lara | skype:juanlaran - Gabriel Aguilar | skype:gab.webdesign
///
//////////////////////////////////////////////////////////////////////////////////////////

(function(window, undefined){

	//Config Variables
	var defaultConfig = {}

	var Banner = function(bannerConfig) {
        initialization(bannerConfig);
	};

	var initialization = function(bannerConfig){
        setDefaults(bannerConfig);

        if (defaultConfig.doubleClickTraking == true){
			doubleClickEvents.initializer();
		} else {
			eventsLibrary.addListener();
			motionLibrary.checkTabStatus();
			motionLibrary.executeAnimations();
		}
	}

	var setDefaults = function(bannerConfig){
		defaultConfig.type = bannerConfig.type;
        defaultConfig.expand = bannerConfig.expand || false;
		defaultConfig.doubleClickTraking = bannerConfig.doubleClickTraking || true;
		defaultConfig.finalExpandSize = bannerConfig.finalExpandSize || [0,0,0,0];
        defaultConfig.startExpanded = bannerConfig.startExpanded || false;
		defaultConfig.elementsToRegister = bannerConfig.elementsToRegister || [];
        defaultConfig.animations = bannerConfig.animations || [];
        defaultConfig.customFunctions = bannerConfig.customFunctions || {};
        defaultConfig.hotspotClose = bannerConfig.hotspotClose || [];
        defaultConfig.hotspotExpand = bannerConfig.hotspotExpand || [];
	}

    var eventsLibrary = {
        addListener : function(){
        	var customFunctionsRoot = defaultConfig.customFunctions;
            for (var i = 0; i < defaultConfig.elementsToRegister.length; i++) {
                var elementToAdd = document.querySelector(defaultConfig.elementsToRegister[i].element),
                    functionToDO = defaultConfig.elementsToRegister[i].functionToCall,
                    functionEval = eval('customFunctionsRoot.'+functionToDO);
                elementToAdd.addEventListener(defaultConfig.elementsToRegister[i].eventType, functionEval, false);
            }

            if (defaultConfig.expand == true && defaultConfig.type != "in-app"){
                
                //Expand Hotspot
                if(defaultConfig.hotspotExpand.length != 0){
                    var eventType = defaultConfig.hotspotExpand[1] || "click";
                    document.querySelector(defaultConfig.hotspotExpand[0]).addEventListener(eventType, motionLibrary.expandEvent, false);
                }else{
                    alert("Please add the hotspotExpand");
                }

                //Close Hotspot
                if(defaultConfig.hotspotClose.length != 0){
                    var eventType = defaultConfig.hotspotExpand[1] || "click";
                    document.querySelector(defaultConfig.hotspotClose[0]).addEventListener(eventType, motionLibrary.collapseEvent, false);
                }else{
                    alert("Please add the hotspotClose");
                }
            }
        }
    }

    var motionLibrary = {
        checkTabStatus : function(){
            var myInt = setInterval(myFunc, 300);
            var stateKey, eventKey, 
                keys = {
                    hidden: "visibilitychange",
                    webkitHidden: "webkitvisibilitychange",
                    mozHidden: "mozvisibilitychange",
                    msHidden: "msvisibilitychange"
                };

            var vis = (function(){
                for (stateKey in keys) {
                    if (stateKey in document) {
                        eventKey = keys[stateKey];
                        break;
                    }
                }

                return function(c) {
                    if (c) document.addEventListener(eventKey, c);
                    return !document[stateKey];
                }
            })();


            function myFunc(){
              if(vis()){    
                    // before the tab gains focus again, very important!
                    setTimeout(function(){           
                   TweenLite.ticker.useRAF(true);
                    },300);     
                } else{
                   TweenLite.ticker.useRAF(false);
                }
            };
        },
        resetWhenCloseOrExit : function(){
            TweenMax.set("div", {clearProps:"all"});
            TweenMax.set("span", {clearProps:"all"});
            TweenMax.set("p", {clearProps:"all"});
            TweenMax.set("h1", {clearProps:"all"});
            TweenMax.set("h2", {clearProps:"all"});
            TweenMax.set("h3", {clearProps:"all"});
            TweenMax.set("h4", {clearProps:"all"});
            TweenMax.set("a", {clearProps:"all"});
            TweenMax.set("input", {clearProps:"all"});
            TweenMax.set("canvas", {clearProps:"all"});
            TweenMax.killAll();
            motionLibrary.executeAnimations();
        },
        executeAnimations : function(){
            eval(defaultConfig.animations.firstFrame());
        },
        collapseEvent : function(){
            Enabler.requestCollapse();
        },
        expandEvent : function(){
            Enabler.requestExpand();
        }
    }

	var doubleClickEvents = {
        initializer : function(){
            if(!Enabler.isInitialized()){
                Enabler.addEventListener(studio.events.StudioEvent.INIT, doubleClickEvents.functionsWhenInit);
            } 

            if(!Enabler.isPageLoaded()){
                Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, doubleClickEvents.functionsWhenPageLoaded);
            }

            if(defaultConfig.expand == true){
                if (defaultConfig.finalExpandSize[0] == 0 && defaultConfig.finalExpandSize[1] == 0 && defaultConfig.finalExpandSize[2] == 0 || defaultConfig.finalExpandSize[3] == 0){
                    alert("Please add final expand size banner");
                } else {
                    Enabler.setExpandingPixelOffsets(defaultConfig.finalExpandSize[0], defaultConfig.finalExpandSize[1], defaultConfig.finalExpandSize[2], defaultConfig.finalExpandSize[3], false, false);
                }

                Enabler.setStartExpanded(defaultConfig.startExpanded);

                Enabler.addEventListener( studio.events.StudioEvent.EXPAND_START, function(){
                    if(defaultConfig.animations.expandStartAnimation){
                        eval(defaultConfig.animations.expandStartAnimation());
                    }
                    Enabler.finishExpand()
                });

                Enabler.addEventListener( studio.events.StudioEvent.EXPAND_FINISH, function(){
                    if(defaultConfig.animations.expandFinishAnimation){
                        eval(defaultConfig.animations.expandFinishAnimation()); 
                    }
                });

                Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_START, function(){
                    if(defaultConfig.animations.collapseStartAnimation){
                        eval(defaultConfig.animations.collapseStartAnimation());
                    }
                    Enabler.finishCollapse()
                });

                Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_FINISH, function(){
                    if(defaultConfig.animations.collapseFinishAnimation){
                        eval(defaultConfig.animations.collapseFinishAnimation()); 
                    }
                });

                //Initial orientation
                document.getElementsByTagName("body")[0].className = Enabler.getOrientation().getMode();

                Enabler.addEventListener( studio.events.StudioEvent.ORIENTATION, function(){
                    document.getElementsByTagName("body")[0].className = Enabler.getOrientation().getMode();
                });
            }
        },
        functionsWhenInit : function(){
            eventsLibrary.addListener();
        },
        functionsWhenPageLoaded : function(){
            if (!Enabler.isVisible()) {
                Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, function(){
                    motionLibrary.executeAnimations();
                });
            } else {
                motionLibrary.executeAnimations();
            }
            motionLibrary.checkTabStatus();
        }
    };

	window.Banner = Banner;
    window.motionLibrary = motionLibrary;

})(window);