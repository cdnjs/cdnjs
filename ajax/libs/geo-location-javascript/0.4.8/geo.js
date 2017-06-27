//****NOTE*****: SEE THIS NOTE REGARDING the 404
//http://code.google.com/p/geo-location-javascript/issues/detail?id=48

// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

(function() {
  // We are already defined. Hooray!
  if (window.google && google.gears) {
    return;
  }

  var factory = null;

  // Firefox
  if (typeof(GearsFactory)!= 'undefined') {
    factory = new GearsFactory();
  } else {
    // IE
    try {
      factory = new ActiveXObject('Gears.Factory');
      // privateSetGlobalObject is only required and supported on IE Mobile on
      // WinCE.
      if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
        factory.privateSetGlobalObject(this);
      }
    } catch (e) {
      // Safari
      if ((typeof(navigator.mimeTypes) != 'undefined')
           && navigator.mimeTypes["application/x-googlegears"]) {
        factory = document.createElement("object");
        factory.style.display = "none";
        factory.width = 0;
        factory.height = 0;
        factory.type = "application/x-googlegears";
        document.documentElement.appendChild(factory);
        if(factory && (typeof(factory.create) == 'undefined')) {
          // If NP_Initialize() returns an error, factory will still be created.
          // We need to make sure this case doesn't cause Gears to appear to
          // have been initialized.
          factory = null;
        }
      }
    }
  }

  // *Do not* define any objects if Gears is not installed. This mimics the
  // behavior of Gears defining the objects in the future.
  if (!factory) {
    return;
  }

  // Now set up the objects, being careful not to overwrite anything.
  //
  // Note: In Internet Explorer for Windows Mobile, you can't add properties to
  // the window object. However, global objects are automatically added as
  // properties of the window object in all browsers.
  if (!window.google) {
    google = {};
  }

  if (!google.gears) {
    google.gears = {factory: factory};
  }
})();

//
//geo-location-javascript v0.4.8
//http://code.google.com/p/geo-location-javascript/
//
//Copyright (c) 2009 Stan Wiechers
//Licensed under the MIT licenses.
//
//Revision: $Rev: 81 $: 
//Author: $Author: whoisstan $:
//Date: $Date: 2012-04-17 17:50:53 -0400 (Tue, 17 Apr 2012) $:    
//
var bb_success;
var bb_error;
var bb_blackberryTimeout_id=-1;

function handleBlackBerryLocationTimeout()
{
	if(bb_blackberryTimeout_id!=-1)
	{
		bb_error({message:"Timeout error", code:3});
	}
}
function handleBlackBerryLocation()
{
		clearTimeout(bb_blackberryTimeout_id);
		bb_blackberryTimeout_id=-1;
        if (bb_success && bb_error)
        {
                if(blackberry.location.latitude==0 && blackberry.location.longitude==0)
                {
                        //http://dev.w3.org/geo/api/spec-source.html#position_unavailable_error
                        //POSITION_UNAVAILABLE (numeric value 2)
                        bb_error({message:"Position unavailable", code:2});
                }
                else
                {  
                        var timestamp=null;
                        //only available with 4.6 and later
                        //http://na.blackberry.com/eng/deliverables/8861/blackberry_location_568404_11.jsp
                        if (blackberry.location.timestamp)
                        {
                                timestamp=new Date(blackberry.location.timestamp);
                        }
                        bb_success({timestamp:timestamp, coords: {latitude:blackberry.location.latitude,longitude:blackberry.location.longitude}});
                }
                //since blackberry.location.removeLocationUpdate();
                //is not working as described http://na.blackberry.com/eng/deliverables/8861/blackberry_location_removeLocationUpdate_568409_11.jsp
                //the callback are set to null to indicate that the job is done

                bb_success = null;
                bb_error = null;
        }
}

var geo_position_js=function() {

        var pub = {};
        var provider=null;
		var u="undefined";

		pub.showMap = function(latitude,longitude)
		{
			if(typeof(blackberry)!=u)
			{
				blackberry.launch.newMap({"latitude":latitude*100000,"longitude":-longitude*100000});
			}
			else
			{
				window.location="http://maps.google.com/maps?q=loc:"+latitude+","+longitude;
			}
		}


        pub.getCurrentPosition = function(success,error,opts)
        {
                provider.getCurrentPosition(success, error,opts);
        }
		

        pub.init = function()
        {			
                try
                {
                        if (typeof(geo_position_js_simulator)!=u)
                        {
                                provider=geo_position_js_simulator;
                        }
                        else if (typeof(bondi)!=u && typeof(bondi.geolocation)!=u)
                        {
                                provider=bondi.geolocation;
                        }
                        else if (typeof(navigator.geolocation)!=u)
                        {
                                provider=navigator.geolocation;
                                pub.getCurrentPosition = function(success, error, opts)
                                {
                                        function _success(p)
                                        {
                                                //for mozilla geode,it returns the coordinates slightly differently
                                                if(typeof(p.latitude)!=u)
                                                {
                                                        success({timestamp:p.timestamp, coords: {latitude:p.latitude,longitude:p.longitude}});
                                                }
                                                else
                                                {
                                                        success(p);
                                                }
                                        }
                                        provider.getCurrentPosition(_success,error,opts);
                                }
                        }
                        else if(typeof(window.blackberry)!=u && blackberry.location.GPSSupported)
                        {

                                // set to autonomous mode
								if(typeof(blackberry.location.setAidMode)==u)
								{
	                                return false;									
								}
								blackberry.location.setAidMode(2);
                                //override default method implementation
                                pub.getCurrentPosition = function(success,error,opts)
                                {
										//alert(parseFloat(navigator.appVersion));
                                        //passing over callbacks as parameter didn't work consistently
                                        //in the onLocationUpdate method, thats why they have to be set
                                        //outside
                                        bb_success=success;
                                        bb_error=error;
                                        //function needs to be a string according to
                                        //http://www.tonybunce.com/2008/05/08/Blackberry-Browser-Amp-GPS.aspx
										if(opts['timeout'])  
										{
										 	bb_blackberryTimeout_id=setTimeout("handleBlackBerryLocationTimeout()",opts['timeout']);
										}
										else
										//default timeout when none is given to prevent a hanging script
										{
											bb_blackberryTimeout_id=setTimeout("handleBlackBerryLocationTimeout()",60000);
										}										
										blackberry.location.onLocationUpdate("handleBlackBerryLocation()");
                                        blackberry.location.refreshLocation();
                                }
                                provider=blackberry.location;				
                        }
					 	else if(typeof(window.google)!="undefined" && typeof(google.gears)!="undefined")
                        {
                                provider=google.gears.factory.create('beta.geolocation');
                                pub.getCurrentPosition = function(successCallback, errorCallback, options)
                                {
                                        function _successCallback(p)
                                        {
                                                if(typeof(p.latitude)!="undefined")
                                                {
                                                        successCallback({timestamp:p.timestamp, coords: {latitude:p.latitude,longitude:p.longitude}});
                                                }
                                                else
                                                {
                                                        successCallback(p);
                                                }
                                        }
                                        provider.getCurrentPosition(_successCallback,errorCallback,options);
                                }

                        }
                        else if ( typeof(Mojo) !=u && typeof(Mojo.Service.Request)!="Mojo.Service.Request")
                        {
                                provider=true;
                                pub.getCurrentPosition = function(success, error, opts)
                                {

                                parameters={};
                                if(opts)
                                {
                                         //http://developer.palm.com/index.php?option=com_content&view=article&id=1673#GPS-getCurrentPosition
                                         if (opts.enableHighAccuracy && opts.enableHighAccuracy==true)
                                         {
                                                parameters.accuracy=1;
                                         }
                                         if (opts.maximumAge)
                                         {
                                                parameters.maximumAge=opts.maximumAge;
                                         }
                                         if (opts.responseTime)
                                         {
                                                if(opts.responseTime<5)
                                                {
                                                        parameters.responseTime=1;
                                                }
                                                else if (opts.responseTime<20)
                                                {
                                                        parameters.responseTime=2;
                                                }
                                                else
                                                {
                                                        parameters.timeout=3;
                                                }
                                         }
                                }


                                 r=new Mojo.Service.Request('palm://com.palm.location', {
                                        method:"getCurrentPosition",
                                            parameters:parameters,
                                            onSuccess: function(p){success({timestamp:p.timestamp, coords: {latitude:p.latitude, longitude:p.longitude,heading:p.heading}});},
                                            onFailure: function(e){
                                                                if (e.errorCode==1)
                                                                {
                                                                        error({code:3,message:"Timeout"});
                                                                }
                                                                else if (e.errorCode==2)
                                                                {
                                                                        error({code:2,message:"Position unavailable"});
                                                                }
                                                                else
                                                                {
                                                                        error({code:0,message:"Unknown Error: webOS-code"+errorCode});
                                                                }
                                                        }
                                            });
                                }

                        }
                        else if (typeof(device)!=u && typeof(device.getServiceObject)!=u)
                        {
                                provider=device.getServiceObject("Service.Location", "ILocation");

                                //override default method implementation
                                pub.getCurrentPosition = function(success, error, opts)
                                {
                                        function callback(transId, eventCode, result) {
                                            if (eventCode == 4)
                                                {
                                                error({message:"Position unavailable", code:2});
                                            }
                                                else
                                                {
                                                        //no timestamp of location given?
                                                        success({timestamp:null, coords: {latitude:result.ReturnValue.Latitude, longitude:result.ReturnValue.Longitude, altitude:result.ReturnValue.Altitude,heading:result.ReturnValue.Heading}});
                                                }
                                        }
                                        //location criteria
                                    var criteria = new Object();
                                criteria.LocationInformationClass = "BasicLocationInformation";
                                        //make the call
                                        provider.ILocation.GetLocation(criteria,callback);
                                }
                        }

                }
                catch (e){ 
					if(typeof(console)!=u)
					{
						console.log(e);
					}
					return false;
				}
                return  provider!=null;
        }


        return pub;
}();