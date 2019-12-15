(function () {
    // a stupidly simple copy button
    // - copies on awesome browsers/devices
    // - selects text on underwhelming mobile devices
    var copyBtn = document.querySelector('.js-copy-btn');
    copyBtn.addEventListener('click', function (event) {
        // select the text
        var copyItem = document.querySelector('.text-to-copy');
        var range = document.createRange();
        range.selectNode(copyItem);
        window.getSelection().addRange(range);
        try {
            // now that we've selected the text, execute the copy command
            var successful = document.execCommand('copy');
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                copyBtn.textContent = "Now click 'Copy'";
            } else if (/^((?!chrome).)*safari/i.test(navigator.userAgent)) {
                // fancy safari detection thanks to: http://stackoverflow.com/a/23522755
                copyBtn.textContent = "Press Command + C to copy";
            } 
            else {
                copyBtn.textContent = "Copied!";
            }
        } catch (err) {
            copyBtn.textContent = "Epic fail!";
        }
        var selection = window.getSelection();
        range.selectNodeContents(copyItem);
        selection.removeAllRanges();
        selection.addRange(range);
        copyItem.focus();
        copyItem.setSelectionRange(0, 9999);
    });
})();
