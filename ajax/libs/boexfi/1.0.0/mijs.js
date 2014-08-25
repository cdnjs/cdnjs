var NACT=null; 
	var PARAMETRO=window.location.search.substr(0); 
	if(PARAMETRO && PARAMETRO.length>0) 
	{ 
	NACT=new Number(PARAMETRO); 
	} 
	if(!NACT) 
	{ 
	window.location=window.location+"?="; 
	}
function focalizar(){
	document.getElementById("user").focus();
	}	