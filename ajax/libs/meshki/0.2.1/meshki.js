var meshki = {
  openNav: function() {
    document.getElementById("sidenav").style.width = "250px";
    if (window.innerWidth > 544)
      document.getElementById("content").style.marginLeft = "250px";
  },
  closeNav: function() {
    document.getElementById("sidenav").style.width = "0";
    if (window.innerWidth > 544)
      document.getElementById("content").style.marginLeft = "0";
  }
};