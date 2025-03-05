const circles = document.querySelectorAll("#check-circle, #check-box");
circles.forEach(circle => {
    circle.addEventListener('click', function(){
        this.classList.toggle('checked');
    });
});