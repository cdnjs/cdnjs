(function () {
    // a stupidly simple copy button
    // - copies on awesome browsers/devices
    // - selects text on underwhelming mobile devices
    // - the button instructs the user if necessary
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
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
                copyBtn.textContent = "Now tap 'Copy'";
            } else if (navigator.userAgent.match(/iPad/i)) {
                // the iPad doesn't have the 'Copy' box pop up,
                // you have to tap the text first
                copyBtn.textContent = "Now tap the text, then 'Copy'";
            } else if (/^((?!chrome).)*safari/i.test(navigator.userAgent)) {
                // fancy safari detection thanks to: http://stackoverflow.com/a/23522755
                copyBtn.textContent = "Press Command + C to copy";
            } else {
                copyBtn.textContent = "Copied!";
            }
        } catch (err) {
            copyBtn.textContent = "Please copy manually";
        }
        // this is what selects it on iOS
        copyItem.focus();
        copyItem.selectionStart = 0;
        copyItem.selectionEnd = copyItem.textContent.length;
        // disable the button because clicking it again could cause madness
        copyBtn.disabled = true;
    });
})();
