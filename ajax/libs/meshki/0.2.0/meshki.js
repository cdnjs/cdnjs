var meshki = {
  openNav: function() {
    document.getElementById("sidenav").style.width = "250px";
    document.getElementById("content").style.marginLeft = "250px";
  },
  closeNav: function() {
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("content").style.marginLeft = "0";
  }
};