$(document).ready(function(){

  var myPlaylist = new jPlayerPlaylist({
    jPlayer: "#jplayer_N",
    cssSelectorAncestor: "#jp_container_N"
  }, [
    {
      title:"Monstercat Podcast Ep 049",
      artist:"Monstercat",
      mp3:"https://cf-media.sndcdn.com/v7q5h74ftlGa.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vdjdxNWg3NGZ0bEdhLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0MzM4MzI3NjR9fX1dfQ__&Signature=cFtWtEhv9B45mN90gPmE-2u3PW3dFhqsmXePc~THCZoGNiL~IPVKLIsmOcHIwstiFca4~Ss0gLORHZy7dBM2ZThS8pprB2rCYB2SNa2RMg16JNxfJMAydwp5gD4EWHRt5kz0XX1bJ3eqCPpMtlfDzaG41QE2DBFIALlyAmajYWQ0L5OctHOW7IELBB2qncLcsT2Pp~Ii4ymq1zWdB83Y16O~f6X5Io1SVGJ9jrH5kYYgiBPQzDE4JKu2KYVTYphprCx2WFJDgJzNx4Twu1c0osdmWXCLMEcpLxXffxH8kD37nMt18EGQohipDf6OPmakpI80KgpFauHN9OleCaP03g__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ",
      
    },
    {
      title:"Monstercat Podcast Ep 013",
      artist:"Monstercat",
      mp3:"https://cf-media.sndcdn.com/B1Npa8FWrURx.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vQjFOcGE4RldyVVJ4LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0MzM4MzI4Njl9fX1dfQ__&Signature=GHnEvX5bzbkXQ7NCxeItddQmsNH73Ru~gqSwJjtMsEa1zE54ASetIDY4dmqnqp6K7dZuefPkpPV1FHXecTYXqrFwgm53H0dIerAk4uL2ZWpocssWiMDh4PmBj-dlv~onCkvyBpH2eoTVHPptG~HhwjvP3doe0InQDtvSCq85l7ZO62fzgi68y1QRQ7bNr0fScETRF5FqBR25e8NecMVNI6wsnnf2AQwcizX2--kaeHhUe~DBbrx8JnHGr5fzegndQQEK4YRpUgMk8wSNrUVmdjuxbFaEaKIGz-rgHUchnS~GACvUIC1rlydCMjd~2mG8uNha0y7Tgdiz48pNHv-XHg__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ",
      
    },
    {
      title:"Tiesto Clublife Podcast Ep 422",
      artist:"Testo",
      mp3:"https://cf-media.sndcdn.com/9Ve3AJ3H3Qo0.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vOVZlM0FKM0gzUW8wLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0MzM4MzI4NTB9fX1dfQ__&Signature=rVo67nR8DmSDGMzPlxWafJcPAQZbEHrgUU-VULkQ0wsUYsfPaS4EwxcZb3TJ5D64jdmO3M6JxcPjiYTvc43e-b-aJN0Oda7pc-Gt5hpC9qJYky44ab0KWgpJxBSD4sM5JdeSIHYXlkHi-rTevc9zi-xlw2CXzpKOnUjgxHlxdQYxVlCH-9zylzCmo1nbGrk~4~E1XWN3TmLb4Dxbn6q~lcE4ImC7xRyLUAQ6PUNpbiTYcuXhpXL9gNjVJRHS5KuW6trPK6yWvEglTTbESYb7jt3-USYD~P8qgcM4ND77gpyP5xFt5ckQJVvBJVMQYmZO5yTOc7vXVxccLRD7K-ZffQ__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ",
      
    }
  ], {
    playlistOptions: {
      enableRemoveControls: true,
      autoPlay: true
    },
    swfPath: "js/jPlayer",
    supplied: "webmv, ogv, m4v, oga, mp3",
    smoothPlayBar: true,
    keyEnabled: true,
    audioFullScreen: false
  });
  
  $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').removeClass('animate');
    $('.jp-play-me').removeClass('active');
    $('.jp-play-me').parent('li').removeClass('active');
  });

  $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').addClass('animate');
  });

  $(document).on('click', '.jp-play-me', function(e){
    e && e.preventDefault();
    var $this = $(e.target);
    if (!$this.is('a')) $this = $this.closest('a');

    $('.jp-play-me').not($this).removeClass('active');
    $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

    $this.toggleClass('active');
    $this.parent('li').toggleClass('active');
    if( !$this.hasClass('active') ){
      myPlaylist.pause();
    }else{
      var i = Math.floor(Math.random() * (1 + 7 - 1));
      myPlaylist.play(i);
    }
    
  });



  // video

  $("#jplayer_1").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "Big Buck Bunny",
        m4v: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.m4v",
        ogv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.ogv",
        webmv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.webm",
        poster: "images/m41.jpg"
      });
    },
    swfPath: "js",
    supplied: "webmv, ogv, m4v",
    size: {
      width: "100%",
      height: "auto",
      cssClass: "jp-video-360p"
    },
    globalVolume: true,
    smoothPlayBar: true,
    keyEnabled: true
  });

});
