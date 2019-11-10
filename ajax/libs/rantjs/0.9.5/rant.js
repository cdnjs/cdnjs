String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless  they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words should be left uppercase
    uppers = ['Id', 'Tv', 'Lsd'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
};

String.prototype.toWordCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.toSentenceCase = function() {
    var re = /(^\s*\w{1}|\.\s*\w{1})/gi;
    return this.replace(re, function(str) {
        return str.toUpperCase();
    });
};



function rant(inputStream) {
    var outputStream = inputStream, re;
    var regex = /\<(.*?)\>/g;
    var matches, token, indexPos;
    var replacement, i = 0, tags = {};
    var repetitions = [];
    var separator = [];
    var stringCase = require("./getCase")(inputStream);
    outputStream = inputStream.toLowerCase(), regex = /(\[.*?\])/g;
    while (matches = regex.exec(inputStream)) {
        // [rep:4][sep:\s]{\8,x}
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        if (token[0] === "sep") {
            separator.push(token[1]);
            //separator=matches[0].match(/[^[\](sep:)]+(?=])/)[0];
        }
        if (token[0] === "rep") {
            repetitions.push(token[1]);
        }
    }
    repetitions.reverse();
    separator.reverse();

    // remove the brackets
    while (matches = regex.exec(inputStream)) {
        inputStream = inputStream.replace(/(\[.*?\])/g, '');
    }

    // instructions in the brackets will only be applied to tokens matched in curly braces
    regex = /(\{.*?\})/;
    var res = "";
    var curlymatch;

    while (curlymatch = regex.exec(inputStream)) {
        replacement = require("./braceParser")(inputStream, curlymatch[1], repetitions, separator);
        inputStream = inputStream.replace(curlymatch[1], replacement);
    }

    // lexer matches (anything inside arrow notation)
    outputStream = require("./lexer")(inputStream);

    return require("./capitalize")(outputStream, stringCase);
}

module.exports = rant;
