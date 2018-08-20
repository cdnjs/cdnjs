var activeqp = 0;
var qpname = '';
var qpid = 0;
var stype = 0;
var sid = 0;
var timerret = 0;
var bookmarks = new Array();  
var id1=new Array();

function refreshpage() { 
		     var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}
	
	var urli = window.location.href + '/?&format=raw&email=' + profile.getEmail();
	
	allqupdateajax2(urli,"allq");



}

function forminit() { 
	
	inituser();
	init();
}


function forminitajax(formname,params,divname) { 
//	action="/index.php?option=com_question&formqpupdate=1" method="post"
console.log("Form init ajax called : Start");
inituser();
console.log("Form init ajax called : After Init user");
init();
console.log("Form init ajax called: After Init" + formname + ' ' +params+ ' ' + divname);

 var auth2 = gapi.auth2.getAuthInstance();
	     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}

 var urli = '/index.php/?option=com_test&format=raw&'+params+'&email=' + profile.getEmail();
 
 $("#" + formname).submit(function(e) {   

    $.ajax({
           type: "POST",
           url: urli,
           data: $("#" + formname).serialize(), // serializes the form's elements.
           success: function(data)
           {
	         //  alert(data);
	          // alert($("#" + formname).parent());
	          // alert($("#" + formname).parent().html());
               $("#" + divname).html(data);
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});
 
}



function formajaxqp(formname) { 
//	action="/index.php?option=com_question&formqpupdate=1" method="post"
 var urli = '/index.php/?option=com_test&formqpcreate2=2&format=raw';
// alert(formname);
 $("#" + formname).submit(function(e) {   

    $.ajax({
           type: "POST",
           url: urli,
           data: $("#" + formname).serialize(), // serializes the form's elements.
           success: function(data)
           {
	       //    alert(data);
	       //    alert($("#" + formname).parent());
	       //    alert($("#" + formname).parent().html());
               $("#" + formname).parent().html(data);
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});
 
}


function formajaxtest(formname) { 
//	action="/index.php?option=com_question&formqpupdate=1" method="post"
 var urli = '/index.php/?option=com_test&formtest=2&format=raw';
// alert(formname);
 $("#" + formname).submit(function(e) {   

    $.ajax({
           type: "POST",
           url: urli,
           data: $("#" + formname).serialize(), // serializes the form's elements.
           success: function(data)
           {
	       //    alert(data);
	       //    alert($("#" + formname).parent());
	       //    alert($("#" + formname).parent().html());
               $("#" + formname).parent().html(data);
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});
 
}

function updateqform() { 
			     var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}
	
	var urli = '/index.php/?option=com_test&formq=1&format=raw&email=' + profile.getEmail();
	//var urld = '/index.php/?option=com_question&formq=1';
	//window.location.href = urli;
	allqupdateajax2(urli,"allq");
}



function updateqpsettings(qpid,count) { 
	
	var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}

	var urli =  '/index.php?option=com_test&format=raw&formqpsettings=1&qpid=' + qpid + '&email=' +profile.getEmail();
	console.log(urli);
    
	var urld = '/index.php?option=com_question&qpid=' + catid;
	urld = '/category/' + catid;
    allqupdateajax2(urli,'addresponse2');	

//window.history.pushState("","", urld);
}

function updateassignments() { 
	
	var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}

	var urli =  '/index.php?option=com_test&format=raw&assignment=1&email=' +profile.getEmail();
	
    
	//var urld = '/index.php?option=com_question&qpid=' + catid;
	urld = '/category/' + catid;
    allqupdateajax(urli);	

//window.history.pushState("","", urld);
}

function updatetestreport(id) { 
			     var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}
	
	var urli = '/index.php/?option=com_test&testreport=' + id + '&format=raw&email=' + profile.getEmail();
	//var urld = '/index.php/?option=com_question&formq=1';
	//window.location.href = urli;
	allqupdateajax2(urli,"addresponse2");
}



function updatetestform(qpid,count) { 
			     var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}
	
	var urli = '/index.php/?option=com_test&formtest=1&format=raw&email=' + profile.getEmail() + '&qpid=' + qpid;
	//var urld = '/index.php/?option=com_question&formq=1';
//	alert(urli);
	//window.location.href = urli;
	var divn = 'addresponse2';
	//alert(divn);
	setonce = 1;
	allqupdateajax2(urli,divn);
}

function updatetestlist(qpid) { 
			     var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}
	
	var urli = '/index.php/?option=com_test&testlist=1&format=raw&email=' + profile.getEmail() + '&qpid=' + qpid;
	//var urld = '/index.php/?option=com_question&formq=1';
//	alert(urli);
	//window.location.href = urli;
	var divn = 'addresponse2';
	//alert(divn);
	setonce = 1;
	allqupdateajax2(urli,divn);
}

function updateqplistone(qpid) { 
			     var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}
	
	var urli = '/index.php/?option=com_test&qplistone=1&format=raw&email=' + profile.getEmail() + '&qpid=' + qpid;
	//var urld = '/index.php/?option=com_question&formq=1';
	
	//window.location.href = urli;
	var divn = 'addresponse';
	//alert(divn);
	setonce = 1;
	allqupdateajax2(urli,divn);
	$("#addresponse2").html('');
}

function redirectqphelp() { 
		     var auth2 = gapi.auth2.getAuthInstance();
		     
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  
} else { 
	
	return;
}
	
	var urli = '/index.php/?option=com_test&qphelp=1&format=raw&email=' + profile.getEmail();
	//var urld = '/index.php/?option=com_question&qphelp=1';
	//window.location.href = urli;
	allqupdateajax2(urli,"allq");

}



function viewuserdb() {
		var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.
   var email = '';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  email =  profile.getEmail();
}	else { 
	console.log("Not logged in"); return;
}
	var urli = '/index.php?option=com_test&format=raw&userdb=1&email=' + email;
	var urld = '/index.php?option=com_question';
	var urld = joomla + '/index.php?option=com_test&userdb=1';
  var state = {type: "test",url: urld};
    
	allqupdateajax(urli);	
	window.history.pushState(state,"", urld); 
	console.log("Pushed user db URL::" + urld);
}



function updateqplist() { 
	
	var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.
   var email = '';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  email =  profile.getEmail();
}	else { 
	console.log("Not logged in"); return;
}
	var urli = '/index.php?option=com_test&format=raw&qplist=1&email=' + email;
	var urld = '/index.php?option=com_question';
	allqupdateajax(urli);	
//	window.location.href = urld;
window.history.pushState("","", urld);
}


function updateqpform() { 
	
	var auth2 = gapi.auth2.getAuthInstance();
		     var email='';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  email = profile.getEmail();
  
}

allqupdateajax('/index.php?option=com_test&format=raw&mytests=1&email='+email);
}

function addtoqp(qid,id) { 
	
	var auth2 = gapi.auth2.getAuthInstance();
		     var email='';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  email = profile.getEmail();
  
}
	
	var urli =  '/index.php?option=com_test&format=raw&addtoqp=' + qid + '&qpid=' + activeqp + '&email=' +email;
	
	var response = "addresponse" + id;
	document.getElementById(response).innerHTML =  '<div style="width:20px;margin-left: auto; margin-right: auto;"><i style="color:#489cdf;" class="fa fa-spinner fa-pulse"></i></div>';
  
  
	
		$.ajax({
		
        url: urli,
                
        success: function(data){
	        document.getElementById(response).innerHTML = '<div class="alert alert-info"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + data + '</div> ';  
        },
         error: function(data){
          
        }
        
});
}

function deletefromqp(qid,id,num) { 
	
	var auth2 = gapi.auth2.getAuthInstance();
		     var email='';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  email = profile.getEmail();
  
}
	
	var urli =  '/index.php?option=com_test&format=raw&deletefromqp=' + qid + '&qpid=' + id + '&email=' +email;
	
	var response = "addresponse" + num;
	document.getElementById(response).innerHTML =  '<div style="width:20px;margin-left: auto; margin-right: auto;"><i style="color:#489cdf;" class="fa fa-spinner fa-pulse"></i></div>';
  
  
	
		$.ajax({
		
        url: urli,
                
        success: function(data){
	        
	        document.getElementById(response).innerHTML = '<div class="alert alert-info"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + data + '</div> ';  
        },
         error: function(data){
          
        }
        
});
}



function showqpbuttons() { 
	if(activeqp == 0) return;
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "addtoqpd" + i;
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		//$(cdivd).show();
		$(cdivd).css('display', 'inline-block');
		//console.log("removed class: #collpase"+i);
		var cdiv2 = "addtoqp" + i;
		var cdivb = document.getElementById(cdiv2);
		
		$(cdivb).html('Add To Test: ' + qpname);
		
     }
}




function inituser() {
//	alert("Inituser called");
if (typeof gapi === 'undefined') {
    return;
}
	 var auth2 = gapi.auth2.getAuthInstance();
	  
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile(); 
  var username =  profile.getEmail();
  
  $("#username").val(username);
  console.log($("#username").val());
  getactiveqp(profile.getEmail());
  console.log("Inituser assigned:" + username);
}
else { 
	
}
}


function showhint(id) { 
	//alert("Hello");
	var div = 'hint'+id;
	//alert(div);
	document.getElementById(div).style.display ="block";
}

function showformula(id) { 
	//alert("Hello");
	var div = 'formula'+id;
	//alert(div);
	document.getElementById(div).style.display ="block";
}

function showworkspace(id) { 
		var div = 'workspace'+id;
	//alert(div);
	document.getElementById(div).style.display ="block";
}

function displaynext() { 
	
	$("#qinfo").hide();$("#qinfomock").hide();
	var count=1; var set = 0;
	hideall();
	console.log("Display Next Total = " + total + " Current="+current);
	
	
     if(current > total || current == 1) { 
	   
	     $("#page1q1").show();$("#p1q1").show();
	     current = 2;	     
	     if(document.getElementById("lastq") !=null)
	     document.getElementById("lastq").style.display ="none";
	     $("#notlastq").show();
	     return;
     }	
	for(var i = 1; ; i++) {	
		if(set == 1) break;
		var cdiv = "page" + i + "q1";
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		
	  for(var j = 1;; j++) {			
		var div = "page" + i + "q" + j;
		var parad = "p" + i + "q" + j;
		var divd = document.getElementById(div);
		var paradiv = document.getElementById(parad);
		if(divd ==null) break;
	
		if(count == current) { 
		//	divd.style.display = "block"; 
		set = 1; current = count+1;
	//	alert(current);
		//$divd.show
				$(divd).show();
				$(paradiv).show();
				//alert(paradiv);
			//	alert(paradiv.innerHTML);
		divd.style.marginTop = "1px";
	//	$('html, body').animate({ scrollTop: 0 },50);
			break; }
		count++;		
      }
     }
     if(current > total) { 
	    
	        document.getElementById("lastq").style.display ="block";
			$("#notlastq").hide();
	   
     }
   
}

function displayoneq(id) { 
	var count = 1; var set = 0;
	hideall(); 
	console.log("To display : " + id);
	for(var i = 1; ; i++) {	
		if(set == 1) break;
		var cdiv = "page" + i + "q1";
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { break;}
		
	  for(var j = 1;; j++) {			
		var div = "page" + i + "q" + j;
		var paradiv = "#p" + i + "q" + j;
		var divd = document.getElementById(div);
		if(divd ==null) break;
		//console.log("looping : " + count);
		if(count == id) { 
			//alert("Got it");
			//divd.style.display = "block"; 
			console.log("Showing::"+div);
			//alert(divd.innerHTML);
			$(divd).show();
			
		//document.getElementById(div).style.marginTop = "1px";
		$('html, body').animate({ scrollTop: 0 },50);
		set = 1; current = count+1;break; 
		}
		
		count++;		
      }
     }

}



function displayq(pid) {
	var id;
$("#qinfo").hide();
$("#qsettingsone").hide();
id = setbuttons(pid);
		
document.getElementById("loading").style.display = "block";
    
// get current page divs in a list     
    var div2 = new Array();
    for(var i =1;;i++) {
	    var did = "page" + id + "q" + i;
	    
	    var div = document.getElementById(did);	 
	    if(div == null) break;
	    div2[i-1] = div;
	    console.log(div2[i-1]);   	    

    }
    
 

  showquestion_new(div2,id);
  var scrolltpos = id*28-52;
  document.getElementById("score").scrollTop = scrolltpos;

    var subs = document.getElementById("subscribe");
  if(subs !=null) subs.style.display="none";
  
    var dinfo = document.getElementById("qinfo");
  if(dinfo !=null) dinfo.style.display="none";

}

function showquestion_new(divs,id) { 
	var delay = 500; 
	var slidems = 0;

document.getElementById("loading").style.display = "block";

//slidequestions(divs,slidems,delay);
setTimeout(function() { hideall();$('html, body').animate({ scrollTop: 0 },50);}, delay);

setTimeout(function() { showquestions(divs,id);}, delay+100);

	
	setTimeout(function() {
document.getElementById("loading").style.display = "none";},delay+50);
  

}

function hideall() { 
		for(var i = 1; ; i++) {	
		var cdiv = "page" + i + "q1";
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) break;
		
	  for(var j = 1;; j++) {		
		var para = "p" + i + "q" + j;
		var divpara = document.getElementById(para);	
		if(divpara !=null) divpara.style.display = "none";
		var div = "page" + i + "q" + j;
		var divd = document.getElementById(div);
		if(divd !=null) divd.style.display = "none"; else break;
		
      }
     }
}

function showall() { 
		for(var i = 1; ; i++) {	
		var cdiv = "page" + i + "q1";
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) break;
		
	  for(var j = 1;; j++) {		
		var para = "p" + i + "q" + j;
		var divpara = document.getElementById(para);	
		if(divpara !=null) divpara.style.display = "block";
		var div = "page" + i + "q" + j;
		var divd = document.getElementById(div);
		if(divd !=null) divd.style.display = "block"; else break;
		
      }
     }
}

function showallq() { 
	$("#showallq").hide();
	showall();
}

function ontableclick(col) { 
//	$("#qinfo").hide();
	ontableclick2(col.id.substring(1,col.id.length));

}

function ontableclick2(id) { 
	
	if(mode == 2) { 
	
    	displayoneq(id);return;
    }
	var loop =0;
	for(var i = 1; ; i++) {	
		var cdiv = "page" + i + "q1";
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) break;
		
	  for(var j = 1;; j++) {			
		var div = "page" + i + "q" + j;
		var divd = document.getElementById(div);
		if(divd ==null) break;
		loop = loop+1;

		if(id == loop) {
			displayq(i); 
			setTimeout(function() {
		    var pos = $(divd).offset().top;   
            console.log("printing position");
		    console.log(pos);
		    $(divd).slideDown(function(){ $('html, body').animate({ scrollTop: pos },"fast"); });   
	        $('html, body').animate({ scrollTop: pos },200); 
    }, 600);
			return;
		}
		
      }
     }
	
}

function loadscripturl(url)
{
   console.log("Loading URL Script : " + url);
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;   
    head.appendChild(script);
}

function loadscript(url, callbackf)
{
   console.log("Loading callback Script : " + url);
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

   script.onreadystatechange = callbackf;
    script.onload = callbackf;   
    head.appendChild(script);
}

function loadcss(hhref) { 
	console.log("Loading Css : " + hhref);
 var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');    
    link.rel  = 'stylesheet';
    link.type = 'text/css';    
    link.media = 'all';
    link.href = hhref;
    head.appendChild(link);
  
 
}

function pageinit() { 
	console.log("Page init");

var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) {console.log("Doc Not Ready"); return;}
    clearInterval( tid );    
    console.log("Doc Ready");   
    loadcss('http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
loadcss('/templates/protostar/stylemay5.css');
loadcss('/templates/protostar/styleother.css');
loadcss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
loadcss('https://fonts.googleapis.com/css?family=Roboto:400,500');
    
    loadscript('https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js', pageinit_others);
  //  pageinit_others();
    
}, 100 );

}



function pageinit_others() { 
	console.log("Page init others");
	if(!window.jQuery) { 
		console.log(" JQuery Not Loaded ");
	}
	
	if (typeof init_callback === 'function') {
		
        init_callback();
        console.log('Init Call back');
    }
	
	loadscripturl('/templates/protostar/otherjs.js');
	loadscripturl('/templates/protostar/testmay5.js');
	loadscripturl('http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
	loadscripturl('https://apis.google.com/js/platform.js');
	loadscripturl('http://connect.facebook.net/en_US/all.js');
	loadscripturl('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5003c8c210dc8038');
	loadscripturl('https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full');
	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-76356957-1', 'auto');
  var pagediv = document.getElementById("pageinfoforgoogle");
  var pagediv2 = document.getElementById("pagetitleforgoogle");
  if(pagediv == null)  { 
	     ga('send', 'pageview');
         console.log("Page View with no Title"); }
  
  else { 
	  var pagename = pagediv.innerHTML; 
	  var pagetitle = pagediv2.innerHTML;
	  ga('send', 'pageview', {		  
		  'page': pagename ,
		  'title': pagetitle 
	  });
	  console.log(pagename);
  }
  
  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&version=v2.8&appId=2090568707852482";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk')); 


}

function init() { 
	
	      //transfermenu();
	      embedcode();
        
   	 if(window.innerWidth <=767) { 
	    $("#cgroupmenu").removeClass("in");	 
	    $("#subgroupmenu").removeClass("in");
	    	var cdivd = document.getElementById("oneq");
	    if(cdivd==null) $("#mainmenu2").removeClass("in");
    }
     var divd = document.getElementById("easyq");	
	if(divd !=null) embedheight = $(divd).height();
	if(mode == 2) embedheight = 600;
	
	resetshares();
	
	$("#beforeq").slideDown();
 	$("#afterq").show();
	
	
	$("#sidebar").hide();
	$("cgroupmenuw").show();
	if(setonce == 0) 
	$("#sidebar").animate({width: 'toggle'});
	else $("#sidebar").show();
	$("#topbar").slideDown();
	$("#aside").show();
	$("#iconshelpw").show();
	
	$("#footerdiv").show();
	activeqp = 0;
    qpname = ''; 
	inituser();
	//getactiveqp(username);
	loadscript('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5003c8c210dc8038',addthisinit);	

	//$("#mainmenu").show(); 
//	$("#mainmenu2").show(); 
    
}

function addthisinit() { 
		addthis.init();
	addthis.toolbox('.addthis_inline_share_toolbox')
	
}


window.onload = function() { 
	 var canonical = "";
                var links = document.getElementsByTagName("link");
                for (var i = 0; i < links.length; i ++) {
                    if (links[i].getAttribute("rel") === "canonical") {
                        canonical = links[i].getAttribute("href")
                    }
                }
                
var state = {type: "abc",url: canonical};
    
console.log("Pushed:::" + state.url);
if(canonical.indexOf('category') > 0) { 
	
window.history.pushState(state,"", canonical);
}
}


function collapseall() { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "collapse" + i;
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		cdivd.classList.remove("in");
		console.log("removed class: #collpase"+i);
     }
}

function expandall() { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "collapse" + i;
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		var divname = "#collapse"+i;
		cdivd.classList.add("in");
		console.log("added class: "+divname);
     }
}

function initembedprepare() { 
	
	embed = 1;
	datareset();
	
	scoretable(1);
	tableclick(1);
	
}
function initembedmock() { 
	
	embed = 1;
	datareset();
	tableclick(2);
	scoretable(1);
	displaynext();
	$("#qinfo").show();
	$("#tscorediv").hide();
	
}
function initprepare() { 
//	alert("calling init prepare");
init();
console.log("Init prepare" + setonce)
	var mdiv = document.getElementById("movescore");
	if(mdiv !=null) mdiv.innerHTML="";
	
	datareset();	
	tableclick(1);
   
	scoretable(1);
	
	showicons();
	//alert("I am ok ");	
	showall();	
	hideallbuttons();
	//$("#tscorediv").show();
	$("#qinfo").show();
	$("#settings1").addClass("active");
	$("#oneperpage").hide();
	setonce = 1;	
	showbyclass("prepare");
	console.log('Init prepare over');
	//document.addEventListener("scroll", onscrollfunction);
	//var urli = '/index.php?option=com_question&format=raw&catid=6&qonly=1&page=2';
	//allqupdateajax4(urli,"autoload2",1,'loading3');
	//initprepare2(2);
}



function initpreparecat(cat) { 
	initprepare();
	catid = cat;
	
}

function initpreparecatpage(pageno) { 
	
	tableclick2(1,pageno);  
	
	showicons();

	showbyclass("prepare");
	
	document.addEventListener("scroll", onscrollfunction);
	pagetoload = pagetoload + 1;
	loadt =0;
	
}

function onscrollfunction() {
	
	clearTimeout(loadtimeout);  
	var loaddiv = document.getElementById('autoload'+pagetoload);
	if(loaddiv == null) { document.removeEventListener("scroll",onscrollfunction);return;}
    loadtimeout = setTimeout(function() {
    if(loadt == 1) return;	    
    var sc = $(window).scrollTop();
    
       var wh = document.getElementById('qcontent').offsetHeight;
     //  var wh = document.body.scrollHeight;
       
       if(wh * 0.68 < sc) {
	      // alert('trigger load');
	       document.removeEventListener("scroll",onscrollfunction);
	       console.log('scroll top:' + sc +  ' Total Height:' + wh + ' loadt:'+loadt);
	       var urli = '/index.php?option=com_question&format=raw&catid=' + catid + '&qonly=1&page='+pagetoload;
	   //    alert(urli);
	       allqupdateajax4(urli,"autoload"+pagetoload,0,'loading3');
	       
	       loadt = 1;
       }
       
    
        // do your stuff
    }, 50);
}



function readmode() { 
	var mdiv = document.getElementById("movescore");
	if(mdiv !=null) mdiv.innerHTML="";
	datareset();
	hideallbuttons();
	showall();
	markcorrectanswers();
	showallanswers();
	
	$("#settings3").addClass("active");
}

function initoneq(id) { 
	//alert("calling init prepare");
	
	datareset();	
	tableclick(1);
	scoretable(1);
	init();
	
	displayoneq(id);
	hideallbuttons();
	showbyclass("oneq");
	alert("Hello");
	$("#oneq").show();
	$("#oneperpage").show();
	$("#showallq").show();
	
}

function initoneqwithimage() { 
	
		datareset();	
	tableclick(1);
	
	init();	
	hideallbuttons();	
	showicons();
	showbyclass("oneq");
	
}

function initmock() { 
	var mdiv = document.getElementById("movescore");
	if(mdiv !=null) mdiv.innerHTML="";
	datareset();
	tableclick(2);
	scoretable(1);
  // alert($("#tscorediv"));
	init();
	//alert("After Hide");
	//displaynext();
	hideall();
	hideallbuttons();
	$("#qinfomock").show();	
	$("#oneq").show();	
	$("#scoretable").show();
	$("#oneperpage").show();	
	$("#result").show();
	//hideicons();	
	showbyclass("mock");
	$("resultc").removeClass("in");
	$("#settings2").addClass("active");
	
	if(total == 0) {  $("#afterq").hide(); $("#qinfomock").hide();}
	
	//startTimer();
	
}

function starttest() { 
	
	startTimer();
		displaynext();
		$("#qinfomock").hide();	
		var cdiv = "qinfomock";
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd!=null) cdivd.style.display="none";
		
}

function hideqinfo() { 
	$("#qinfomock").hide();	
}

function showbyclass(dname) { 
	var divs = document.getElementsByClassName(dname);
	for(loop=0;loop<divs.length;loop++) {
		//console.log(divs[loop]);
		$(divs[loop]).show();
	}
}

function hideallbuttons() { 
		$("#settings").removeClass("in");
	$("#settings1").removeClass("active");
	$("#settings2").removeClass("active");
	$("#settings3").removeClass("active");
	
	$("#qinfomock").hide();
	$("#qinfo").hide();
	$("#tscorediv").hide();
	$("#oneq").hide();
	
	$("#scoretable").hide();
	
	$("#showallq").hide();
	
	$("#resultc").removeClass("in");
	$("#result").hide();
	$("#qinfoone").hide();
	if(setonce == 1) {
	hideallanswers();
	resetanswers();
    }
	$("#oneperpage").hide();
	$("#iconshelp").removeClass("in");
	hideshares();
	hideresponses();
	
}

function hideshares() { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "share" + i;
		var cdivp = "sharepair" + i;
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		$("#" + cdiv).removeClass("in");
		$("#" + cdivp).removeClass("in");
     }
}

function resetshares() { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "share" + i;
		var cdivp = "sharepair" + i;
		var cdivd = document.getElementById(cdiv);
		var cdivpair = document.getElementById(cdivp);
		if(cdivd ==null) { 
			break;
		}
		//$("#" + cdiv).addClass("in");
		//$("#" + cdivp).addClass("in");
		cdivd.style.display = '';
		if(cdivpair!=null) cdivpair.style.display='';
     }
}

function hideresponses() { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "addresponse" + i;
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		$("#" + cdiv).html('');
		
     }
}


function hideicons() { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "icons" + i;
		var cdivp = "iconspair" + i;
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		$("#" + cdiv).hide();
		$("#" + cdivp).hide();
     }
}

function showicons() { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "icons" + i;
		var cdivp = "iconspair" + i;
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		$("#" + cdiv).show();
		console.log(cdiv);
		$("#" + cdivp).show();
		
     }
}

function showicons() { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "icons" + i;
		var cdivp = "iconspair" + i;
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		$("#" + cdiv).show();
		$("#" + cdivp).show();
		
     }
}

function showcalc(id) { 
	
	for(var i = 1; ; i++) {	
		
		var cdiv = "calc" + i;
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		$("#" + cdiv).html('');		
		
     }
     var cdivs = "calc" + id;		
	 var cdivds = document.getElementById(cdivs);
	 //console.log(cdivds);
	 var calc = "calc";		
	 var calcd = document.getElementById(calc);
	// console.log(calcd.innerHTML);
	 if(cdivds != null && calcd !=null) { 
		 cdivds.innerHTML = calcd.innerHTML;
		// console.log(calcd.innerHTML);
	 }
	 r('C');
}

  function onoptionclick_prepare_embed(cel) {
	
	var tbl = cel.parentNode.parentNode.parentNode.parentNode.parentNode;
	var radios = tbl.getElementsByTagName("input");
	var labels = tbl.getElementsByTagName("label");

	var id = cel.id; 
	   var id = cel.id; 
    var lid="tick" + cel.id;
   
    var rid ="r"+cel.id;
    var val = document.getElementById(rid).value;
   
   var qida=cel.id.split("o");
   var qno =  qida[0].substring(1,qida[0].length);
   current = parseInt(qno) + 1;

   var qinfo = "qinfo"+qno;
   for(var j=0;j<radios.length;j++) {
	   if(radios[j].checked == true) {    return;}
   }
    for(var j=0;j<radios.length;j++) { radios[j].checked = false; } 
    document.getElementById(rid).checked = true;


  setcorrectanswer_embed(qno,lid);
    if( val == "right") { correct++;   }
    else {incorrect++; setincorrectanswer(qno,lid);  } 
   
    
}

function setcorrectanswer_embed(qno,lid) { 
		 // lid not used.
	//	 alert(qno);
	  for (var i = 1; i <=12;i++) { 
		  var rid = "rt"+qno+"o"+i;
		  
		  var tid = "tickt"+qno+"o"+i;
		  var div = document.getElementById(rid); 
		  
		  if(div == null) { return;}
		  var val = document.getElementById(rid).value;
		  
		  if(val == "right") {
			  var tdiv = document.getElementById(tid);
			  if(tdiv == null) return;
	     tdiv.style.background = rightbcol;
	     tdiv.style.color = "#FFF";
	          
	    tdiv.innerHTML ='&#x2714';
    }
    }
	    
	
}


function scoretable(id) { 
	total = 0;   
	var table = document.getElementById("score");	     
	if(table!=null) table.innerHTML='';
	var loop = 0; var row;var col;
	     
	  

	      for(var i =1;;i++) {
		      var check = "page" + i + "q" + 1;
		      var cd = document.getElementById(check);
		      if(cd == null) break; 
		      for( var j = 1; ; j++) {
			      
	    var did = "page" + i + "q" + j;
	    
	    var div = document.getElementById(did);	 
	    if(div == null) break;
	    loop++;
        if(table!=null) {
	    if(loop%5==1)  { 
		    var val = Math.floor(loop/5);	
		    row = table.insertRow(val);		    
		    
	    }	
	    col = row.insertCell((loop-1)%5);
	    col.innerHTML = loop;
	    col.id = "s"+loop;	    
	    col.onclick = function () { ontableclick(this);  };
     
        } 
       }
    }
    
    total = loop;
    
    
    var sdiv = document.getElementById("noscoretable"); 
    if(sdiv !=null) { console.log("No Score Table");  document.getElementById("scoretable").style.display = "none";}
    var sdivall = document.getElementById("noscore"); 
    if(sdivall !=null) {console.log("No Score");document.getElementById("tscore").style.display = "none";}
    
    if(document.getElementById("tscore") != null) { 
	    
    document.getElementById("tscore1").innerHTML = loop;
    document.getElementById("tscore2").innerHTML = 0;
    document.getElementById("tscore3").innerHTML = 0;
    document.getElementById("tscore4").innerHTML = 0;
}
  console.log("Score table values set ..");
  
   console.log("End of Score Table: Current=" + current + " Total:"+total);
   
  
	
    }
 

function transferscore() { 
		   var tscoremain = document.getElementById("tscoremain");
		   if(tscoremain!=null) tscoremain.innerHTML= '';
    var tscore = document.getElementById("bscore");
    
    if(tscoremain!=null && tscore !=null){ 
	  //  alert(cgroup.innerHTML);alert(cgroupleft.innerHTML);
	  
    tscoremain.innerHTML = tscore.innerHTML;
    tscore.innerHTML = '';
}    
}

function movescore() { 
		   var tscoremain = document.getElementById("movescore");
		 var addthisd = document.getElementById("shareresult");  
		 var addthishtml = '';
		 if(addthisd!=null) { addthishtml = addthisd.innerHTML;addthisd.innerHTML='';}
   // var tscore = document.getElementById("tscoremain");
   // alert(tscore.innerHTML.length);
    if(tscoremain.innerHTML.length <= 1) {  tscore = document.getElementById("tscorediv");}
    var scoretable = document.getElementById("scoretable");
    var scoretablehtml = '';
    if(scoretable!=null) scoretablehtml = scoretable.innerHTML;
    if(tscoremain!=null && tscore !=null){ 
	  //  alert(cgroup.innerHTML);alert(cgroupleft.innerHTML);
    tscoremain.innerHTML = "<div> <h2> Score </h2>" + tscore.innerHTML + scoretablehtml + "</div>" + addthishtml + "<h2> Report </h2>";
    $("#scoretable").hide();
    
   // tscore.innerHTML = '';
   // scoretable.innerHTML = '';
}    
}

function transfermenu() { 

	   var cgroup = document.getElementById("cgroupmenumain");
    var cgroupleft = document.getElementById("cgroupmenuleft");
    if(cgroup == null) return;
    if(cgroup.innerHTML == '') return;    
    if(cgroupleft!=null && cgroup !=null){ 
	  //  alert(cgroup.innerHTML);alert(cgroupleft.innerHTML);
        cgroupleft.innerHTML = cgroup.innerHTML;
         cgroup.innerHTML = '';
    }
}

function eslidedown3(i,off) { 

	   var divd = "#trace-formt"+i;
	   openans = divd;   
	   $(divd).slideDown('slow',function() { if(pair==0) adjust(i);});
	   var divs = "#sliderpair"+i;
   $(divs).slideDown();
	 
	
}

function adjust(i) { 
	//$("#share"+i).addClass("in");
	//$("#sharepair"+i).addClass("in");
	var divd = "#trace-formt"+i;
	var parentid =  $(divd).parent().attr("id"); 
	console.log("Parent ID:"+parentid);
	//var pos2 = document.getElementById(parentid).offsetTop;
	var pos2 = $(divd).parent().offset().top;
	   console.log("position of pageq " +pos2);
	   
	    var sc = $(window).scrollTop();
       var h = $(window).height();
       console.log("SC" + sc);     
     console.log("Heigth Window" + h);
     
    // var decide = height of q + height of ans - scroll ;
     
     
     var ansh = $(divd).height(); 
     
     var qh = $(divd).parent().height();
    console.log("Ans height:" + ansh);
     console.log("Q height:" + qh);
     var notvisible = pos2 - sc + qh - h;
     console.log("Visible:" + notvisible); 
   if(notvisible>0) {  $('html, body').animate({ scrollTop: pos2 },300); }
}

function eslidedown2(i,off) { 

	   var divd = "#trace-formt"+i;
	   openans = divd;   
	   
	   var parentid =  $(divd).parent().attr("id"); 
	 //  console.log(parentid); 
	   var ha = $(divd).height() + + $("#share"+i).height(); 
	 //  var pos2 = $("#content").offset().top;
	 var pos2 = document.getElementById(parentid).offsetTop;
//	   console.log("position of pageq " +pos2);
	   var condiv = document.getElementById("content");
	   if(condiv ==null) { $(divd).show();return;}
	   var posc = document.getElementById("content").offsetTop;
	   
	//   console.log("position of content " +posc);
	    
	    var poss = document.getElementById("sidebar").offsetTop;
	   console.log("position of sidebar " +poss);
	  // var pos = $(parentid).position().top + pos2;
	  var pos = pos2+posc - 60;
	   
       var sc = $(window).scrollTop();
       var h = $(window).height();
      // h = 0 ;
       var hq = $(parentid).height();
       var decide = pos + hq + ha-sc;
  //     console.log("parent = "+ parentid);
  //   console.log("Height Ans" + ha);
  //   console.log("SC" + sc);
     
  //   console.log("Heigth Window" + h);
  //   console.log("Height q" + hq);
   //  console.log("Decide" + decide);
    // console.log("Position to move" + pos);
   if(decide > h || sc > pos) { 
	   $(divd).slideDown(function(){ $('html, body').animate({ scrollTop: pos },200); });
	   var s = $(window).scrollTop();	
	//   console.log("Moving ");
   }
   else $(divd).slideDown();
   var divs = "#sliderpair"+i;
   $(divs).slideDown();
   hideshares();
	$("#share"+i).addClass("in");
	$("#sharepair"+i).addClass("in");
}


function eslidedown(i,off) { 

	   var divd = "#trace-formt"+i;
	   openans = divd;   
	   
	   var parentid = "#" + $(divd).parent().attr("id"); 
	   console.log(parentid); 
	   var ha = $(divd).height(); 
	   var pos = $(parentid).offset().top; 
       var sc = $(window).scrollTop();
       var h = $(window).height();
       //h = 5000 ;
       var hq = $(parentid).height();
       var decide = pos + hq + ha-sc;
       console.log("parent = "+ parentid);
     console.log("Height Ans" + ha);
     console.log("SC" + sc);
     
     console.log("Heigth Window" + h);
     console.log("Height q" + hq);
     console.log("Decide" + decide);
     console.log("Position to move" + pos);
   if(decide > h || sc > pos) { 
	   $(divd).slideDown(function(){ $('html, body').animate({ scrollTop: pos },200); });
	//   var s = $(window).scrollTop();	
	   console.log("Moving ");
   }
   else $(divd).slideDown();
   var divs = "#sliderpair"+i;
   $(divs).slideDown();
   
}
	   



function datareset() {
	console.log("Data Reset");
	 var qdiv = document.getElementById("allq");
     var radios = qdiv.getElementsByTagName("input");	
  
     for(var j=0;j<radios.length;j++) { radios[j].checked = false; } 
     openans = "";
    
openans = "";

fbinfo=0;
mode =1;
notesinfo =0;


incorrect = 0;
correct = 0; 
answered = 0;
current = 1;

}




function showallanswers() { 
	for(var i = 1 ;;i++) { 		
	     var divd = "trace-formt" + i;
	     var diva = document.getElementById(divd);
	    
	     if(diva==null) break; else diva.style.display= "block";
     }

}

function hideallanswers() { 
	for(var i = 1 ;;i++) { 		
	     var divd = "trace-formt" + i;
	     var diva = document.getElementById(divd);
	    
	     if(diva==null) break; else diva.style.display= "none";
     }

}

function result_embed() { 
	result();
	$("#resultb").hide();
}


function result() {
	// alert("hEllo"); return;
	
	showall();

    markcorrectanswers();
if(document.getElementById("tscorediv") !=null) {
 document.getElementById("tscore2").innerHTML = answered;
 document.getElementById("tscore3").innerHTML = correct;
 document.getElementById("tscore4").innerHTML = incorrect;
 document.getElementById("tscore").style.display = "inline-table";
 document.getElementById("percent").innerHTML = Math.round((correct/total)*100) + "%"; 
}

 showallanswers();
scorepercent = Math.round((correct/total)*100);
$('html, body').animate({ scrollTop: 0 }, 1000);
 //alert(scorepercent);
 return (correct/total)*100;
}

function markcorrectanswers() { 
	
		var i = 0; var c = null; var fc = null;
	var count = 0;
	answered = 0;
	correct = 0;
	incorrect = 0;
do { 
	i++;   
	var foption = "rt" + i + "o1";
	var ans = "a"+i;
	fc = document.getElementById(foption); 
	if(fc==null) break;
//	document.getElementById(ans).style.display = "block";
	for(var j = 0;j<12;j++) {
	var lid = "tickt" + i + "o"+j;
	var rid="rt" + i + "o"+j;
	 var score = "s"+ i;
	 var scorediv = document.getElementById(score);
	 c = document.getElementById(rid); 
	     if(c!=null) { 
		    
	         var val = document.getElementById(rid).value;
	      if(val == "right") { 
	
	         if(document.getElementById(rid).checked == true) {
		         correct++;answered++;
		         if(scorediv!=null) scorediv.style.background = rightbcol;
	         }
             document.getElementById(lid).style.color = "#FFFFFF";
             document.getElementById(lid).style.background = "#34A853"; 
             document.getElementById(lid).innerHTML ='&#x2714';
             
             
          }
          
          if(val == "wrong") {
	          if(document.getElementById(rid).checked == true) {	
		          answered++;	incorrect++;         
		         if(scorediv!=null) scorediv.style.background = wrongbcol;
	         }
          }
          
         }
     }
     
} while(fc!=null) ; 
}


function resetanswers() { 
	
		var i = 0; var c = null; var fc = null;
	
	answered = 0;
	correct = 0;
	incorrect = 0;
do { 
	i++;   
	var foption = "rt" + i + "o1";
	var ans = "a"+i;
	fc = document.getElementById(foption); 
	if(fc==null) break;
//	document.getElementById(ans).style.display = "block";
	for(var j = 0;j<12;j++) {
	var lid = "tickt" + i + "o"+j;
	var rid="rt" + i + "o"+j;
	 var score = "s"+ i;
	 var scorediv = document.getElementById(score);
	 c = document.getElementById(rid); 
	     if(c!=null) { 
	
	         
		         if(scorediv!=null) { 
			         scorediv.style.background = "#FFFFFF";
			            scorediv.style.color = "#404040";
		         }
	         
	         document.getElementById(rid).checked =false;
             document.getElementById(lid).style.color = "#FFFFFF";
             document.getElementById(lid).style.background = "#FFFFFF"; 
             document.getElementById(lid).innerHTML ='&nbsp;&nbsp;';
    
         }
     }
     
} while(fc!=null) ; 
}

function resultview() { 
	movescore();
	showicons();
	$("#oneperpage").hide();
	$("#qinfo").hide();
	$("#qinfomock").hide();
	//$("#buttonnext2").hide();
	$("#timer").hide();
 $("#scoreinfo").hide();
 $("#scoretitle").hide();
 $("#result").hide();
 $("#resultc").hide();
 $("#resultb").hide();
 
 $("#tscoreshare").show();
 $("#tpercent").show();
 $("#tscorediv").removeClass("fixit");
 if(document.getElementById("scoretext") !=null)
 document.getElementById("scoretext").value = "Hi, I scored " + scorepercent + "% in this Test. Please give a try";
}





function showfbcomment() { 
		     var divd = "fbc";
	     var diva = document.getElementById(divd);

	     if(diva!=null) diva.style.display= "block";
	
}

function openfbcomment(qid) { 
window.open("/question/" + qid +"/?comments=1");	
}

function showalltopics() { 

	   //var diva = document.getElementById(divd);
       //if(diva!=null) diva.style.display= "block";
       $("#rlinks").slideUp();
       $("#alinks").slideDown();
       
}
function showsecondmenu() { 
	$("#cgroupmenu").slideDown();
}

function showimageanswer(id) { 
	var div1 = "#checkanswerimage" + id;
	var div2 = "#imageanswer" + id;
	$(div1).slideUp();
	$(div2).slideDown();
	
}
function hidelogin() { 
	$("#glogin").hide();
	
}

function initbuttons(id,qno) { 
	
	var b = "buttons" + id;
	var inh = '';
	var divb = document.getElementById(b);

var divall =   '<div class="" style="overflow:auto;border: 1px solid #C0C0C0;border-top:0px;"> <div style="margin:0 auto;width:100%;"> <div style="float:right;margin:1px;">';
			
var notesb = 	'<button class="ebutton"  style="min-width:initial;padding:0px;" onclick="addtonotes(' + qno + ',' + id 
	          + ')"><i class="fa fa-save" style="font-size:120%;padding:5px 10px 5px 10px;"> </i></button>';

var commentsb = '<button class="ebutton" style="min-width:initial;padding:0px;" onclick="openfbcomment(' + qno + ')"> <i class="fa fa-comments" style="padding:5px 10px 5px 10px;font-size:120%;"></i>  </button>';	          	

var fbtext = '<i style="padding: 5px 10px 5px 10px;background: #3b5998;color: #FFF;font-size:120%;" class="fa fa-facebook"> </i>';
var fbstyle = 'padding:0px;width:initial;min-width:initial;margin-right:5px;';
var fbdesc = 'For Interesting Q&A Click Here!!';
var fbhash = '';
var pic = 'http://www.easytutorial.in/images/questions/' + qno + '.png';
var llink = 'http://www.easytutorial.in/index.php?option=com_question&id='+ qno;

var fbbutton = '<button class="fbutton" style="' + fbstyle + '" onclick="fbsubmit(' + '\'\',\'' + pic + '\',\'' + llink + '\',' + '\'www.easytutorial.in\',\'' + fbdesc + '\',\'' + 'Prepare for Competitive Exams' + '\',\'\')"> ' + fbtext + '</button>';

	if(divb!=null)  inh = divb.innerHTML;
	else alert("Hello i am null");
	var str =  divall + notesb + commentsb + fbbutton + '</div></div><div id="addresponse' + id + '"> </div></div>';
	          
           
            console.log(str);

divb.innerHTML = "hello";
	
}

function embedcode() { 
	var catid=0; 
	var collid=0;
	var pagenumber = 0;
	var id = 0;
	
	var divq = document.getElementById("qnumber");
	if(divq!=null) id = divq.innerHTML;
	
	if(id!=0) { embedcodecat(id,0,0,0);return;}
	
	var divb = document.getElementById("catid");
	if(divb!=null) catid = divb.innerHTML;
	
	var divc = document.getElementById("collid");
	if(divc!=null) collid = divc.innerHTML;
	
	var divd = document.getElementById("pagenumber");
	if(divd!=null) pagenumber = divd.innerHTML;
	console.log("EMBED:::" + catid + collid + pagenumber);
	embedcodecat(0,catid,collid,pagenumber);
}

function embedcodeid(qid,b) { 
	embedcodecat2(qid,0,0,0,'embedcode','q1');
}

function embedcodeqid(qid,filldiv,hdiv) { 
	//alert(qid);alert(filldiv);
	embedcodecat2(qid,0,0,0,filldiv,hdiv);
}

function embedcodecat(qid,catid,set,page) { 
	embedcodecat2(qid,catid,set,page,'embedcode',null);
}

function embedcodecat2(qid,catid,set,page,filldiv,hdiv) { 
	
	var divb = document.getElementById(filldiv);
	//alert(divb);
	var divd = document.getElementById(hdiv);
	console.log(divd);
	var ht = 0;
	var ratio = 0;
	var h = 0;
	if(hdiv != null) { h = $(divd).height();}
	else h = embedheight;
	
	console.log(h);
	ht = h;
	var w = 1000;
	if(divd !=null) $(divd).width();
	console.log("Width="+w+" Height="+h);
	if(w < 600) { 
		
		ratio = 0.63 + ((w-300)/300) * (.37);
		console.log("Ratio = "+ratio);
		ht = ratio * h;
		console.log("Calculated height: "+ht);
	}
	var h2 = ht;
	console.log("Final Height: "+h2);
	var str = '&lt;script src="http://easytutorial.in/templates/protostar/js/easytutorialframe.js" type="text/javascript"&gt;&lt;/script&gt';
	var str2 = '<div style="background:#F1F1F1"> <p style="padding:10px;"> Copy this code and place it in your site. </p> </div>';
	var idstring = '';
	if(qid == 0) {  h2 = ht - total * 35+250; idstring = '/category/' + catid + '/' + set + '/' + page;}
	else { h2 = ht + 80; idstring = '/question/' + qid;}
	if(divb!=null) { 
	divb.innerHTML = str2+ '<textarea style="width:100%;padding:10px;height:120px;">' + str + '&lt;iframe src="http://www.easytutorial.in' + idstring + '/?&format=raw&embed=1" frameborder="0" style="overflow:hidden;width:100%" height="' + h2 + 'px" width="100%" onload="responsiveframeheight(this)"&gt;&lt;/iframe&gt' +'</textarea>';
	$(divb).slideDown();
}
	
}



function startTimer() { 
	var mins = timer;
	console.log("mins:::" + mins); 
	if(mins==0) return;
	var tdiv = document.getElementById("timer");
    if(tdiv == null) { console.log("Timer div null"); return;}
var endtime = new Date();
endtime.setMinutes(endtime.getMinutes() + mins);
if(timerret != 0) clearInterval(timerret);
// Update the count down every 1 second
timerret = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = endtime - now;
    
    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000) + 1;
    
    // Output the result in an element with id="demo"
    
    if(hours==0) document.getElementById("timer").innerHTML =  minutes + "m " + seconds + "s ";
    else document.getElementById("timer").innerHTML =  hours + "h "+ minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(timerret);
        document.getElementById("timer").innerHTML = "Time Over. Please click Check/Submit button.";
    }
}, 1000);
}

function fbsubmit3(hash,pic,llink,nname,desc,cap,rrlink,stype) {

rlink = rrlink;
	FB.init({appId: "486416571558236", status: true, cookie: true});
	
		FB.ui({
    method: 'feed',
    hashtag: hash,       
    display: 'popup',    
    picture: pic,         
    link: llink,        
    name: nname,      
    description: desc,
    caption: cap
    
  }, function(response){      
	  
	  
    if (response && !response.error_message) {
   
   if(stype==1) ga('send', 'event', 'Share', pic , response.post_id);
   if(stype==2) ga('send', 'event', 'ShareScore', pic , response.post_id);
      window.open(rlink, "_self");
    } else {
  
    }
	  });
}

function fbsubmit(hash,pic,llink,nname,desc,cap,rrlink) {
	fbsubmit3(hash,pic,llink,nname,desc,cap,rrlink,1)
}

function fbsubmitscore(hash,pic,llink,nname,desc,cap,rrlink) {
	var desc2 = "Hi, I scored " + scorepercent + "% in this Test. Please give a try";
	//alert(desc2);
	//var desc2="hello";
	fbsubmit3(hash,pic,llink,desc2,nname,cap,rrlink,2);
}

function fbsubmittest(hash,pic,llink,nname,desc,cap,rrlink) {

rlink = rrlink;
	FB.init({appId: "2090568707852482", status: true, cookie: true});

		FB.ui({
    method: 'share',
    hashtag: hash,       
    display: 'popup',    
    picture: pic,         
    href: llink,        
    name: nname,      
    description: desc,
    caption: cap
    
  }, function(response){      
	  
	  
    if (response && !response.error_message) {
   
    ga('send', 'event', 'Share', pic , response.post_id);
  
      window.open(rlink, "_self");
    } else {
  
    }
	  });
}

function fbsubmit2() {


	FB.init({appId: "2090568707852482", status: true, cookie: true});	
	FB.ui();
}

function sharescore(atitle, catid) { 
	var l = "whatsapp://send?text=Hi, I have scored " + scorepercent + "% in this test. Please give a try. " + "http://www.easytutorial.in/index.php?option=com_question%26mock=1%26catid=" + catid;
	//alert(l);
	location.href = l;
	ga('send', 'event', 'WhatsappShareScore', catid , '');
}

function onSignIn(googleUser) {
	
  var profile = googleUser.getBasicProfile();
  var url = joomla + '/index.php?option=mod_login&task=addemail&email=' + profile.getEmail();  
  document.getElementById("loginmsg").innerHTML = "";
  document.getElementById("viewnotes").style.display ="block";
  document.getElementById("viewscore").style.display ="block";
  console.log(profile.getEmail());
  if(resultval !=-1) { 
	//  alert("saving score");
	  sendscore("responsescorelogin");
	  
  }
  inituser();
  
  
 // mypost(url);
}

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  function profile() { 
	   var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.

if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

  }
  
  function checkloginandload() {
	 // alert("hello");
  }
  

  
function addtonotes(qid,response) { 
	  
	     var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.
	//   var response = "addresponse" + no;

if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  var urli = joomla + '/index.php?option=com_question&task=addtonotes&format=raw&email=' + profile.getEmail() + '&qid=' + qid;  
  console.log(urli);
  mypost(urli,response);
  
  document.getElementById(response).innerHTML =  '<div style="width:20px;margin-left: auto; margin-right: auto;"><i style="color:#489cdf;" class="fa fa-spinner fa-pulse"></i></div>';
  }
  else { 
	  // document.getElementById("loginmsg").style.display = "block";  
	  document.getElementById(response).innerHTML = '<div class="alert alert-info"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><b> Prepare your own Q&A Collection Notes :: </b> <br> Selected Q&A can be added to your personal notes, and can be retrieved later when required, say at exam time or when a revision is required. <br> Step 1) Please login using gmail. <br> Step 2) Click Bookmark icon button at Q&A, that need to be added to collection. <br> Step 3) To View Q&A, Click "View my Q&A Collection" Button next to login button. </div> ';  
	  
  }
  
}

function savescorelogin(googleUser) { 
var profile = googleUser.getBasicProfile();
var email = profile.getEmail(); 
var urli = joomla + '/index.php?option=com_question&task=savescore&format=raw&email=' + email + '&type=' + '1' + '&typeid=' + catid + '&score=' + resultval;  
console.log(urli);
 		$.ajax({
		
        url: urli,
        success: function(data){	
	        console.log(data);
	        document.getElementById(response).innerHTML =  data;
	        $("#result").hide();
        },
         error: function(data){
          
        }
    });
  
}

function savescore(qp,cat) { 
	catid = cat;
	qpid=qp;

	   
	     
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.
	   tableclick(3);
resultval = result();
resultview();

if (typeof gapi === 'undefined') {
    return;
}

sendscore("addresponsescore");
ganalyticseventscore();

  //else { 
	  // document.getElementById("loginmsg").style.display = "block";  
	//  document.getElementById(response).innerHTML = '<div class="alert alert-info"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><b> Save Your Score :: </b> <br> Please save your score to track your progress. <br> Step 1) Please login using gmail. <br> Step 2) Click on "Check/Submit Result" once Again. <br>  Step 3) To check scores click, "View My Scores" Button. </div> ';  
	  
 // }
  
  
}

function sendscore(resp) { 
	if(resultval == -1) return;
	
	
	var response = resp;
	var auth2 = gapi.auth2.getAuthInstance();
	if (auth2.isSignedIn.get()) {
		$("#shareinfo").hide();
		var load2 = document.getElementById(resp);
 load2.innerHTML =  '<div style="width:100%;margin-left: auto; margin-right: auto; border: 1px solid #D0D0D0;margin-top:20px;box-shadow:3px 3px 2px #CCC;background:#F8F8F8;border-radius:4px;"><p style="text-align:center;padding-top:10px;padding-bottom:10px;"> Saving Score .. <i style="color:#489cdf;font-size:150%" class="fa fa-spinner fa-pulse"></i> .. Please wait </p></div>';

  var profile = auth2.currentUser.get().getBasicProfile();
  var urli = joomla + '/index.php?option=com_question&task=savescore&format=raw&email=' + profile.getEmail() + '&catid=' + catid + '&qpid=' + qpid + '&score=' + resultval;  
 // alert(urli);
console.log(urli);
 		$.ajax({
		
        url: urli,
        success: function(data){	
	        console.log(data);
	        document.getElementById(response).innerHTML =  data;
	        
        },
         error: function(data){
          
        }
    });
  
  
  }
	
}

function mypost(urli,response) { 
	
		$.ajax({
		
        url: urli,
        success: function(data){	
	        console.log(data);
	        console.log(response);
	        document.getElementById(response).innerHTML =  data;
        },
         error: function(data){
          
        }
    });
}

function updatescore() { 
	
	var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.
var url = '';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  urli = joomla + '/index.php?option=com_test&score=1&format=raw&email=' + profile.getEmail();  
  
  } else { alert("Not Logged in"); return;}
  
  allqupdateajax(urli);	
  var urld = joomla + '/index.php?option=com_test&score=1';
  var state = {type: "test",url: urld};
  window.history.pushState(state,"", urld);
  displayscoreajax();
}

function updatenotes() { 
	var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.
var url = '';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  urli = joomla + '/index.php?option=com_test&bookmarks=1&format=raw&email=' + profile.getEmail();  
  
  } else { alert("Not Logged in"); return;}
  
  allqupdateajax(urli);	
  var urld = joomla + '/index.php?option=com_test&bookmarks=1';
  var state = {type: "test",url: urld};
  window.history.pushState(state,"", urld);
  displaynotesajax();
	
}

function displaynotesajax() { 
		
		     var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.
var url = '';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  urli = joomla + '/index.php?option=com_question&format=raw&email=' + profile.getEmail();  
  
  } else { alert("Not Logged in"); return;}
  
  allqupdateajax2(urli,'qcontent');	
  var urld = joomla + '/index.php?option=com_test&bookmarks=1';
 // window.history.pushState("","", urld);
}

function displaynotes() { 
	
		     var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.

if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  var url = joomla + '/index.php?option=com_question&email=' + profile.getEmail();  
  
  }
	window.location.href = url;
}

function displayscoreajax() { 
	
		     var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.
var url = '';
if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  url = joomla + '/index.php?option=com_question&score=1&format=raw&email=' + profile.getEmail();  
  
  } else {alert("Not Logged In");return;}
  
  allqupdateajax2(url,'qcontent');	
  

  
}

function displayscore() { 
	
		     var auth2 = gapi.auth2.getAuthInstance();
	   // auth2 is initialized with gapi.auth2.init() and a user is signed in.

if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  var url = joomla + '/index.php?option=com_question&score=1&email=' + profile.getEmail();  
  
  }
  window.location.href = url;
}


function getanswer(catid) { 
	var urli =  '/index.php?option=com_question&format=json&catid=' + catid;
		$.ajax({
		
        url: urli,
        dataType: "json",        
        success: function(data){
	        markanswer(data);
	        var res = result();
	        resultview();
        },
         error: function(data){
          alert("Error detected");
        }
        
});
}

function markanswer(data) { 
	var i =1;
	for(i=1;i<=data.length;i++) { 
		var rad = "rt" + i + "o" + data[i-1];
		console.log("Setting answer :: " + rad);
		document.getElementById(rad).value = "right";
	}
}



function updatecatid(catid) { 
	updatecat(catid,1,1,1,1);
//	var urli =  '/index.php?option=com_question&task=update&format=raw&catid=' + catid;
	//allqupdateajax(urli);	
}

function updateeasytutorialurl(urli,easydiv) { 
	alert(urli);
	allqupdateajax2(urli,easydiv);
}


function loadcatid(catid,qblockid){ 
	
	//alert("calling");
	$("#noscoretable").remove();
	$("#noscore").remove();
	$("#movescore").remove();
	//alert("hello");
	for(var i = 1; ; i++) {	
		
		var cdiv = "qblock" + i;
		
		var cdivd = document.getElementById(cdiv);
		if(cdivd ==null) { 
			break;
		}
		cdivd.innerHTML = '';
		
	}
	divid = 'qblock' + qblockid;
	
    var urli =  'index.php?option=com_question&task=update&format=raw&noaddons=1&catid=' + catid;
 //   alert(urli);
	allqupdateajax2(urli,divid);	
}

function updatecatpage(catid,page,set) { 
	updatecat(catid,set,1,1,page);
}

function updatecat(catid,set,qpair,update,page) { 
	//alert("hello");
	var updates = ''; 
	var sets ='';
	var qpairs = '';
	var pages ='';
	if(page > 0) pages = '&page=' + page;	
	if(update == 1) updates='&update=1';	
	if(set > 0) sets = '&set=' + set;	
	if(qpair > 0) qpairs = '&qpair=' + qpair;
	var urli =  '/category/' + catid + '/' + set + '/' + page + '/?format=raw';
	//alert(urli);

	var urld = '/index.php?option=com_question&catid=' + catid+sets+qpairs;
	urld = '/category/' + catid + '/' + set + '/' + page;
    allqupdateajax(urli);	
//	window.location.href = urld;
window.history.pushState("","", urld);

    //myganalytics();  
	

}

function updatecaturl(caturl,set,page) { 
	//alert("hello");
	
	var urli =  '/category/' + caturl + '/' + set + '/' + page + '/?format=raw';
	//alert(urli);

	var urld = '/category/' + caturl + '/' + set + '/' + page;
	urld = '/category/' + caturl + '/' + set + '/' + page;
    allqupdateajax(urli);	
//	window.location.href = urld;
var state = {type: "cat",url: urld};
    
console.log("Pushed" + state);
window.history.pushState(state,"", urld);

    //myganalytics();  
	

}

function updaterelated(word) { 
	//alert("hello");
	
	var urli =  '/related/' + word + '/?format=raw';
	//alert(urli);

	
    allqupdateajax(urli);	
    
//	window.location.href = urld;
window.history.pushState("","", urld);

    //myganalytics();  
	

}



function update(id) {
	
	var urli = joomla + '/question/' + id+'/?format=raw';
	//alert(urli);
	var urld = '/question/' + id ;
    allqupdateajax(urli);
    window.history.pushState("","", urld);
  //  window.location.href = urld;
  
   // myganalyticsevent(id);
    
}
function allqupdateajax(urli) { 
	allqupdateajax2(urli,"allq");
}

function allqupdateajax2(urli,divname) { 
	allqupdateajax3(urli,divname,1);
}

function allqupdateajax3(urli,divname,scr) {
	allqupdateajax4(urli,divname,1,'loading3');
}

function allqupdateajax4(urli,divname,scr, loading) { 
	console.log(urli);
	console.log(divname);
//alert(divname);
//document.getElementById("allq").innerHTML = ''; 

var load2 = document.getElementById("loading2");
if(load2!=null && total > 1) load2.innerHTML =  '<div style="width:100%;margin-left: auto; margin-right: auto; border: 1px solid #D0D0D0;margin-top:20px;box-shadow:3px 3px 2px #CCC;background:#F8F8F8;border-radius:4px;"><p style="text-align:center;padding-top:10px;padding-bottom:10px;"> Loading .. <i style="color:#489cdf;font-size:150%" class="fa fa-spinner fa-pulse"></i> .. Please wait </p></div>';
var load3 = document.getElementById(loading);
if(load3!=null ) load3.innerHTML =  '<div style="width:100%;margin-left: auto; margin-right: auto; border: 1px solid #D0D0D0;margin-top:20px;box-shadow:3px 3px 2px #CCC;background:#F8F8F8;border-radius:4px;"><p style="text-align:center;padding-top:10px;padding-bottom:10px;"> Loading .. <i style="color:#489cdf;font-size:150%" class="fa fa-spinner fa-pulse"></i> .. Please wait </p></div>';
	

	$.ajax({
		
        url: urli,
        success: function(data){	
	  //  alert(data);
	  //  alert(divname);
        document.getElementById(divname).innerHTML = data;    
         var rsc = document.getElementById("rscript");
         if(rsc !=null) { 
           var rscript = rsc.innerHTML; 
           eval(rscript);
           rsc.parentElement.removeChild(rsc);
     }    
     
         //alert(rscript);
      //    datareset();
        
   
       
         
         console.log("Rscript Completed" + rscript);
          if(load2!=null) load2.innerHTML = '';
          if(load3!=null) load3.innerHTML = '';
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,divname]);
          sh_highlightDocument();
          if(scr == 1) jQuery('html,body').animate({scrollTop:0},500);
          setpageinfo();
          myganalytics(); 
           console.log("Analytics Completed");
        },
         error: function(data){
          alert("Error detected");
          console.log(data);
        }
    });
}

function setpageinfo() { 
	var divimage = document.getElementById("ogimage");
	var ogimage='';
	var divdesc = document.getElementById("desc");
	var desc='';
	var divtitle = document.getElementById("title");
	var newtitle='';
	var metadesc = '';
	if(divimage !=null) { 
		ogimage = divimage.innerHTML;
//		alert(ogimage);
	}
	if(divdesc !=null) { 
		desc = divdesc.innerHTML;
//		alert(desc);
	}
	if(divtitle !=null) { 
		newtitle = divtitle.innerHTML;
//		alert(newtitle);
		document.title = newtitle;
	}
	
	$('meta[name=description]').remove();
	metadesc = '<meta name="description" content="' + desc + '">';
//	alert(metadesc);
    $('head').append(metadesc);
	
	}



function qupdate(id) {
	document.getElementById("loading2").innerHTML =  '<div style="width:20px;margin-left: auto; margin-right: auto;"><i style="color:#489cdf;" class="fa fa-spinner fa-pulse"></i></div>';
	var urli = joomla + '/index.php?option=com_question&task=update&format=raw&qimage=' + id;
	
$.ajax({
        url: urli,
        success: function(data){
          document.getElementById("allq").innerHTML = data;
     // myganalytics();
    //        ga('send', 'event', 'Oneq', id , 'Next');
          tableclick(1);
          datareset();
        }
       
    });
}
	
function imageupdate(subject,id) {
	document.getElementById("loading2").innerHTML =  '<div style="width:20px;margin-left: auto; margin-right: auto;"><i style="color:#489cdf;" class="fa fa-spinner fa-pulse"></i></div>';
	var urli = joomla + '/index.php?option=com_question&task=update&image=1&format=raw&q=' + id + '&subject=' + subject;
	

$.ajax({
        url: urli,
        success: function(data){
         document.getElementById("allq").innerHTML = data;
         myganalyticsevent2("Image Question:"+subject, "Image Question: "+subject+" : "+id);
       //  myganalytics();
  //        tableclick(1);
    //      datareset();
        }
    });
}





function myganalytics() { 
	if (typeof ga === 'undefined') {
    return;
}
  var pagediv = document.getElementById("pageinfoforgoogle");
  var pagediv2 = document.getElementById("pagetitleforgoogle");
  if(pagediv == null)  { 
	     ga('send', 'pageview');
        console.log("Page View with no Title");
        return;
         }
  
  else { 
	  var pagename = pagediv.innerHTML ; 
	  var pagetitle = pagediv2.innerHTML ;
console.log(pagename);
console.log(pagetitle);
	  ga('send', 'pageview', {		  
		  'page': pagename ,
		  'title': pagetitle 
	  });
	 // console.log(pagename);
  }
  $(pagediv).remove();
  $(pagediv2).remove();
}

function myganalyticsevent(str) { 
	if (typeof ga === 'undefined') {
    return;
}
  var pagediv = document.getElementById("pageinfoforgoogle");
  var pagediv2 = document.getElementById("pagetitleforgoogle");
  if(pagediv == null)  { 
	  //   ga('send', 'pageview');
	  //   ga('send', 'event', 'Next', "Not Set" , "Not Set");
        // alert("Page View with no Title");
        return;
         }
  
  else { 
	  var pagename = pagediv.innerHTML ; 
	  var pagetitle = pagediv2.innerHTML ;

ga('send', 'event', str , pagetitle , pagename);

  }
  
}



function ganalyticseventscore() { 
	if (typeof ga === 'undefined') {
    return;
}
  var pagediv = document.getElementById("pageinfoforgoogle");
  var pagediv2 = document.getElementById("pagetitleforgoogle");
  if(pagediv == null)  { 
	  //   ga('send', 'pageview');
	     ga('send', 'event', 'Not Set', "Not Set" , "Not Set");
        // alert("Page View with no Title");
         }
  
  else { 
	  var pagename = pagediv.innerHTML ; 
	  var pagetitle = pagediv2.innerHTML ;

ga('send', 'event', 'Score', pagetitle , pagename + " Score: " + scorepercent+"%");
console.log(pagetitle+pagename+scorepercent);
  }
  
}



function checkimg(imgname) { 

//alert (imgname);  
var i = "#"+imgname;
$(i).load(function() {    
     //  alert (imgname);        
       var para = "#p" + imgname;
       
       $(para).hide();
    });
}


function showimageshare() { 
	$("#imageshare").slideDown();
}

function copylink() {
	var copyText = document.getElementById("copylink");
	console.log(copyText);
    copyText.select();
	document.execCommand("Copy");
	alert("Link Copied to Clipboard: " + copyText.value);
}

function updatelinkcopy(id) {
	var lin = copylink('copylink'+id);
	console.log(lin);
	var d = document.getElementById("tresponse"+id);
	console.log(d);
	d.innerHTML = '<p style="color:#34A853;text-align:center;"> Test Link Copied to Clipboard <br> ' + lin + '</p>';
}

function copylink(id) {
	var copyText = document.getElementById(id);
	console.log(copyText);
    copyText.select();
	document.execCommand("Copy");
	return copyText.value;
}

function copylinkurl() {
	var copyText = window.location.href;
	console.log(copyText);
    copyText.select();
	document.execCommand("Copy");
	alert("Link Copied to Clipboard: " + copyText.value);
}

function showBookmark() {

   hideall();
    for(var i=0;i<bookmarks.length;i++) { 
	    console.log("Bookmarked:"+i+"::"+bookmarks[i]);
     
    var cdiv = "page1q"+bookmarks[i];
    cdiv = cdiv.trim();
    var cdivd = document.getElementById(cdiv);
    console.log(cdiv);
    
     $("#"+cdiv).show(); 
  

  }
}


//var cdiv=new Array();

function addtoBookmark(b) {
id1.push(b);
bookmarks.push(b);
$("#addresponse"+b).html('<p style="font-size:105%;color:#34A853;padding:5px;">Question No:' + b + ' Marked. <p>');
console.log("Added to flag:"+b);
}
