/*******************************************************************************
 jquery.mb.components
 Copyright (c) 2001-2010. Matteo Bicocchi (Pupunzi); Open lab srl, Firenze - Italy
 email: mbicocchi@open-lab.com
 site: http://pupunzi.com

 Licences: MIT, GPL
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 ******************************************************************************/

/*
 * jQuery.mb.components: jquery.mb.YTPlayer
 * version: 1.2 - 6-feb-2010 - 43
 * © 2001 - 2010 Matteo Bicocchi (pupunzi), Open Lab
 *
 */

(function($){

  $.YTPlayer={
    name:"jquery.mb.YTPlayer",
    version:1.2,
    author:"Matteo Bicocchi",
    width:450,
    controls:{
      play:"<img src='images/play.png'>",
      pause:"<img src='images/pause.png'>",
      mute:"<img src='images/mute.png'>",
      unmute:"<img src='images/unmute.png'>"
    },
    rasterImg:"images/raster.png",
    setYTPlayer:function(){
      var players=this;
      $.getScript("http://ajax.googleapis.com/ajax/libs/swfobject/2/swfobject.js",function(){
        players.each(function(){

          if(!$(this).is("a")) return;

          if (!$(this).attr("id")) $(this).attr("id", "YTP_"+new Date().getMilliseconds());
          var ID=$(this).attr("id");


          var dataObj=$("<span/>");
          dataObj.attr("id",ID+"_data").hide();
          var data= dataObj.get(0);

          data.opacity=1;
          data.isBgndMovie=false;
          data.width=$.YTPlayer.width;
          data.quality="default";
          data.muteSound=false;
          data.hasControls=false;
          data.ratio="16/9";
          data.bufferImg=false;

          var BGisInit = typeof document.YTPBG != "undefined";

          if ($.metadata){
            $.metadata.setType("class");
            if ($(this).metadata().quality) data.quality=$(this).metadata().quality;
            if ($(this).metadata().width) data.width=$(this).metadata().width;
            if ($(this).metadata().opacity) data.opacity=$(this).metadata().opacity;
            if ($(this).metadata().isBgndMovie && !BGisInit) {
              data.isBgndMovie=$(this).metadata().isBgndMovie;
              data.width=$(this).metadata().isBgndMovie.width? $(this).metadata().isBgndMovie.width:"window";
            }

            if ($(this).metadata().muteSound) {data.muteSound=$(this).metadata().muteSound;}
            if ($(this).metadata().hasControls) {data.hasControls=$(this).metadata().hasControls;}
            if ($(this).metadata().ratio) {data.ratio=$(this).metadata().ratio;}
            if ($(this).metadata().bufferImg) {data.bufferImg=$(this).metadata().bufferImg;}
            if ($(this).metadata().ID) {data.ID=$(this).metadata().ID;}
          }

          var el= data.ID?$("#"+data.ID):$("body");

          if(data.width=="window") {
            data.height="100%";
            data.width= "100%";
            if(data.ID){
              data.height=el.outerHeight()+40;
              data.width= el.outerWidth();
            }
          }
          else
            data.height= data.ratio=="16/9" ? Math.ceil((9*data.width)/16):Math.ceil((3*data.width)/4);

          var videoWrapper="";

          $(el).append(dataObj);
          if(data.isBgndMovie){
            //            $(el).css({position:"relative",zIndex:1});
            if ($.browser.msie && $.browser.version < 8 || data.ID){
              var bodyWrapper=$("<div/>").css({position:"relative",zIndex:0});
              $(el).wrapInner(bodyWrapper);
              $(el).prepend($(this));
            }else
              $(el).after($(this));

            var pos= data.ID?"absolute":"fixed";

            videoWrapper=$("<div/>").attr("id","wrapper_"+ID).css({overflow:"hidden",position:pos,left:0,top:0, width:"100%", height:"100%"});
            $(this).wrap(videoWrapper);
            if(!data.width.toString().indexOf("%")==-1) {
              var videoDiv=$("<div/>").css({position:pos,top: data.ratio=="4/3" && !data.ID?-(data.height/4):0,left:0, display:"block", width:data.width, height:data.height});
              $(this).wrap(videoDiv);
            }
          }else{
            videoWrapper=$("<span/>").attr("id","wrapper_"+ID).css({width:data.width, height:data.height, position:"relative"}).addClass("mb_YTVPlayer");
            $(this).wrap(videoWrapper);
          }

          var params = { allowScriptAccess: "always", wmode:"transparent", allowFullScreen:"true" };
          var atts = { id: ID };
          data.movieURL=($(this).attr("href").match( /[\\?&]v=([^&#]*)/))[1];

          //swfobject.embedSWF(swfUrl, id, width, height, version, expressInstallSwfurl, flashvars, params, attributes, callbackFn)
          swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid="+ID,ID, data.width, data.height, "8", null, null, params, atts);
        });
      });
    },
    setMovie: function(){
      var player = $(this).get(0);
      var data = $("#"+player.id+"_data").get(0);
      var BGisInit = typeof document.YTPBG != "undefined";
      var movieID= data.movieURL;

      $(player).css({opacity:data.opacity});
      var pos= data.ID?"absolute":"fixed";

      //if it is as background
      if(data.isBgndMovie && !BGisInit){
        var raster=$("<div/>").addClass("mbYTP_raster").css({position:pos,top:0,left:0,width:"100%",height:"100%",background:"url("+$.YTPlayer.rasterImg+")"}).hide();
        var bufferImg=data.bufferImg?$("<div/>").addClass("mbYTP_bufferImg").css({position:pos,top:0,left:0,width:"100%",height:"100%",background:"url("+data.bufferImg+")"}).hide():false;
        var playerContainer=$(player).parents("div:first");
        var ratio=data.ratio;

        //       $(playerContainer).css({width:"100%", height:"100%"});

        //can't be more than one bgnd
        if(!data.ID) document.YTPBG=true;
        $(playerContainer).after(raster);
        if (data.bufferImg) raster.after(bufferImg);
      }

      if(data.isBgndMovie) {
        player.loadVideoByUrl("http://www.youtube.com/v/"+movieID, 0);
        if (data.isBgndMovie.mute) player.mute();
      }else{
        player.cueVideoByUrl("http://www.youtube.com/v/"+movieID, 0);
        $(player).buildYTPControls();
      }

      player.setPlaybackQuality(data.quality);
      player.addEventListener("onStateChange", '(function(state) { return playerState(state, "' + player.id + '"); })');
    },
    playYTP: function(){
      var player= $(this).get(0);
      var playBtn=$(player).parent().find(".mb_YTVPPlaypause");
      playBtn.html($.YTPlayer.controls.pause);
      player.playVideo();
    },
    stopYTP:function(){
      var player= $(this).get(0);
      var playBtn=$(player).parent().find(".mb_YTVPPlaypause");
      playBtn.html($.YTPlayer.controls.play);
      player.pauseVideo();
    },
    pauseYTP:function(){
      var player= $(this).get(0);
      var playBtn=$(player).parent().find(".mb_YTVPPlaypause");
      playBtn.html($.YTPlayer.controls.play);
      player.pauseVideo();

    },
    // todo
    setYTPVolume:function(val){
      var player= $(this).get(0);
      var VolumeBtn=$(player).parent().find(".mb_YTVPVolume");
      player.setVolume(val);

    },
    muteYTPVolume:function(){
      var player= $(this).get(0);
      var muteBtn=$(player).parent().find(".mb_YTVPMuteUnmute");
      muteBtn.html($.YTPlayer.controls.unmute);
      player.mute();

    },
    unmuteYTPVolume:function(){
      var player= $(this).get(0);
      var muteBtn=$(player).parent().find(".mb_YTVPMuteUnmute");
      muteBtn.html($.YTPlayer.controls.mute);
      player.unMute();

    },
    manageYTPProgress:function(){
      var player= $(this).get(0);
      var YTPlayer= $(player).parent(".mb_YTVPlayer");
      var progressBar= YTPlayer.find(".mb_YTVPProgress");
      var loadedBar=YTPlayer.find(".mb_YTVPLoaded");
      var timeBar=YTPlayer.find(".mb_YTVTime");
      var totW= progressBar.outerWidth();

      var startBytes= player.getVideoStartBytes();
      var totalBytes= player.getVideoBytesTotal();
      var loadedByte= player.getVideoBytesLoaded();
      var currentTime=Math.floor(player.getCurrentTime());
      var totalTime= Math.floor(player.getDuration());
      var timeW= (currentTime*totW)/totalTime;
      var startLeft=0;

      if(startBytes) {
        startLeft=player.timeW;
      }

      var loadedW= (loadedByte*(totW-startLeft))/totalBytes;
      loadedBar.css({left:startLeft, width:loadedW});
      timeBar.css({left:0,width:timeW});
      return {totalTime:totalTime,currentTime: currentTime};
    },
    buildYTPControls:function(){
      var player= $(this).get(0);
      if (typeof player.isInit != "undefined") return;
      player.isInit=true;
      var YTPlayer= $(this).parent(".mb_YTVPlayer");
      var controlBar=$("<span/>").addClass("mb_YTVPBar").css({whiteSpace:"noWrap",position:"absolute"}).hide();
      var playpause =$("<span>"+$.YTPlayer.controls.play+"</span>").addClass("mb_YTVPPlaypause").click(function(){
        if(player.getPlayerState()== 1){
          $(player).pauseYTP();
        }else{
          $(player).playYTP();
        }
      });
      var MuteUnmute=$("<span>"+$.YTPlayer.controls.mute+"</span>").addClass("mb_YTVPMuteUnmute").click(function(){
        if(player.isMuted()){
          $(player).unmuteYTPVolume();
        }else{
          $(player).muteYTPVolume();
        }
      });
      var idx=$("<span/>").addClass("mb_YTVPTime");
      var progressBar =$("<div/>").addClass("mb_YTVPProgress").css("position","absolute").click(function(e){
        timeBar.css({width:(e.clientX-timeBar.offset().left)});
        player.timeW=e.clientX-timeBar.offset().left;
        YTPlayer.find(".mb_YTVPLoaded").css({width:0});
        var totalTime= Math.floor(player.getDuration());
        player.goto=(timeBar.outerWidth()*totalTime)/progressBar.outerWidth();
        player.seekTo(player.goto, true);
        YTPlayer.find(".mb_YTVPLoaded").css({width:0});
      });
      var loadedBar = $("<div/>").addClass("mb_YTVPLoaded").css("position","absolute");
      var timeBar = $("<div/>").addClass("mb_YTVTime").css("position","absolute");
      progressBar.append(loadedBar).append(timeBar);
      controlBar.append(playpause).append(MuteUnmute).append(idx).append(progressBar);
      YTPlayer.append(controlBar);

      YTPlayer.hover(function(){
        controlBar.fadeIn();
        clearInterval(player.getState);
        player.getState=setInterval(function(){
          var prog= $(player).manageYTPProgress();
          $(".mb_YTVPTime").html($.YTPlayer.formatTime(prog.currentTime)+" / "+ $.YTPlayer.formatTime(prog.totalTime));
          if(player.getPlayerState()== 1 && $(".mb_YTVPPlaypause").html()!=$.YTPlayer.controls.pause) YTPlayer.find(".mb_YTVPPlaypause").html($.YTPlayer.controls.pause);
          if(player.getPlayerState()== 2) YTPlayer.find(".mb_YTVPPlaypause").html($.YTPlayer.controls.play);
        },500);
      },function(){
        controlBar.fadeOut();
        clearInterval(player.getState);
      });
    },
    formatTime: function(s){
      var min= Math.floor(s/60);
      var sec= s-(60*min);
      return (min<9?"0"+min:min)+" : "+(sec<9?"0"+sec:sec);
    }
  };

  $.fn.mb_YTPlayer = $.YTPlayer.setYTPlayer;
  $.fn.mb_setMovie = $.YTPlayer.setMovie;

  $.fn.buildYTPControls = $.YTPlayer.buildYTPControls;
  $.fn.playYTP = $.YTPlayer.playYTP;
  $.fn.stopYTP = $.YTPlayer.stopYTP;
  $.fn.pauseYTP = $.YTPlayer.pauseYTP;
  $.fn.muteYTPVolume = $.YTPlayer.muteYTPVolume;
  $.fn.unmuteYTPVolume = $.YTPlayer.unmuteYTPVolume;

  $.fn.manageYTPProgress = $.YTPlayer.manageYTPProgress;

})(jQuery);

function onYouTubePlayerReady(playerId) {
  var player=$("#"+playerId);
  player.mb_setMovie();
}

function playerState(state, el) {
  var player=$("#"+el).get(0);
  var data = $("#"+player.id+"_data").get(0);
  if (state==0 && data.isBgndMovie) {
    player.playVideo();
  }
  if ((state==-1 || state==3) && data.isBgndMovie) {
    $(player).css({opacity:0});
    $(".mbYTP_raster").css({opacity:.5,backgroundColor:"black"}).fadeIn();
    $(".mbYTP_bufferImg").css({opacity:.2}).fadeIn();
    if (!$.browser.msie){
      $("#wrapper_"+player.id).css({opacity:0});
    }
  }
  if (state==1 && data.isBgndMovie) {
    $(player).css({opacity:data.opacity});
    $(".mbYTP_raster").css({opacity:1,backgroundColor:"transparent"});
    $(".mbYTP_bufferImg").fadeOut();
    if (!$.browser.msie)
      $("#wrapper_"+player.id).animate({opacity:1},1000);
  }

  if(state==1 && !data.isBgndMovie)
    player.totalBytes=player.getVideoBytesTotal();

  if (state==0 && !data.isBgndMovie) {
    $(player).stopYTP();
  }
}