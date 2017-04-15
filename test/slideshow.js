window.addEventListener('load',slideShow,false);function slideShow(){var globals={slideDelay:3000,fadeDelay:35,wrapperID:"slideShowImages",buttonID:"slideShowButton",buttonStartText:"Start Slides",buttonStopText:"Stop Slides",wrapperObject:null,buttonObject:null,slideImages:[],slideShowID:null,slideShowRunning:true,slideIndex:0}
initializeGlobals();if(insufficientSlideShowMarkup()){return;}
if(globals.slideImages.length==1){return;}
initializeSlideShowMarkup();globals.wrapperObject.addEventListener('click',toggleSlideShow,false);if(globals.buttonObject){globals.buttonObject.addEventListener('click',toggleSlideShow,false);}
startSlideShow();function initializeGlobals(){globals.wrapperObject=(document.getElementById(globals.wrapperID)?document.getElementById(globals.wrapperID):null);globals.buttonObject=(document.getElementById(globals.buttonID)?document.getElementById(globals.buttonID):null);if(globals.wrapperObject){globals.slideImages=(globals.wrapperObject.querySelectorAll('img')?globals.wrapperObject.querySelectorAll('img'):[]);}}
function insufficientSlideShowMarkup(){if(!globals.wrapperObject){if(globals.buttonObject){globals.buttonObject.style.display="none";}
return true;}
if(!globals.slideImages.length){if(globals.wrapperObject){globals.wrapperObject.style.display="none";}
if(globals.buttonObject){globals.buttonObject.style.display="none";}
return true;}
return false;}
function initializeSlideShowMarkup(){var slideWidthMax="400";var slideHeightMax="400";globals.wrapperObject.style.marginLeft="auto";globals.wrapperObject.style.marginRight="auto";globals.wrapperObject.style.position="relative";globals.wrapperObject.style.position="relative";globals.wrapperObject.style.width=slideWidthMax+"px";globals.wrapperObject.style.height=slideHeightMax+"px";var slideCount=globals.slideImages.length;for(var i=0;i<slideCount;i++){globals.slideImages[i].style.opacity=0;globals.slideImages[i].style.position="absolute";globals.slideImages[i].style.borderRadius="20px";globals.slideImages[i].style.border="solid 1px rgba(0,0,0,0.2)";globals.slideImages[i].style.padding="3px";globals.slideImages[i].style.width="400px";globals.slideImages[i].style.height="400px";globals.slideImages[i].style.left=(slideWidthMax-globals.slideImages[i].getBoundingClientRect().width)/2+"px";}
globals.slideImages[0].style.opacity=1;if(globals.buttonObject){globals.buttonObject.textContent=globals.buttonStopText;}}
function maxSlideWidth(){var maxWidth=0;var maxSlideIndex=0;var slideCount=globals.slideImages.length;for(var i=0;i<slideCount;i++){if(globals.slideImages[i].width>maxWidth){maxWidth="900";maxSlideIndex=i;}}
return globals.slideImages[maxSlideIndex].getBoundingClientRect().width;}
function maxSlideHeight(){var maxHeight=0;var maxSlideIndex=0;var slideCount=globals.slideImages.length;for(var i=0;i<slideCount;i++){if(globals.slideImages[i].height>maxHeight){maxHeight=globals.slideImages[i].height;maxSlideIndex=i;}}
return globals.slideImages[maxSlideIndex].getBoundingClientRect().height;}
function startSlideShow(){globals.slideShowID=setInterval(transitionSlides,globals.slideDelay);}
function haltSlideShow(){clearInterval(globals.slideShowID);}
function toggleSlideShow(){if(globals.slideShowRunning){haltSlideShow();if(globals.buttonObject){globals.buttonObject.textContent=globals.buttonStartText;}}
else{startSlideShow();if(globals.buttonObject){globals.buttonObject.textContent=globals.buttonStopText;}}
globals.slideShowRunning=!(globals.slideShowRunning);}
function transitionSlides(){var currentSlide=globals.slideImages[globals.slideIndex];++(globals.slideIndex);if(globals.slideIndex>=globals.slideImages.length){globals.slideIndex=0;}
var nextSlide=globals.slideImages[globals.slideIndex];var currentSlideOpacity=1;var nextSlideOpacity=0;var opacityLevelIncrement=1/globals.fadeDelay;var fadeActiveSlidesID=setInterval(fadeActiveSlides,globals.fadeDelay);function fadeActiveSlides(){currentSlideOpacity-=opacityLevelIncrement;nextSlideOpacity+=opacityLevelIncrement;if(currentSlideOpacity>=0&&nextSlideOpacity<=1){currentSlide.style.opacity=currentSlideOpacity;nextSlide.style.opacity=nextSlideOpacity;}
else{currentSlide.style.opacity=0;nextSlide.style.opacity=1;clearInterval(fadeActiveSlidesID);}}}}
