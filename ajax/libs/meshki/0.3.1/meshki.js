var meshki = {
  openNav: function() {
    document.getElementsByClassName("sidenav")[0].style.width = "250px";
    if (window.innerWidth > 768)
      document.getElementsByClassName("content")[0].style.marginLeft = "250px";
  },
  closeNav: function() {
    document.getElementsByClassName("sidenav")[0].style.width = "0";
    if (window.innerWidth > 768)
      document.getElementsByClassName("content")[0].style.marginLeft = "0";
  }
};