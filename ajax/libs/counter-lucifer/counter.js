function counter(select, numb, speed) {
    var number = 0;
    setInterval(function () {
        if (number <= numb) {
            document.querySelector(select).innerText = number;
            number++
        } else {
            document.querySelector(select).innerText = numb;
        }
    }, speed)
}

/* For using 
counter(element, count-number, speed);

For example
counter("#user-count", 1500, 10)
speed is measured in milliseconds
*/
