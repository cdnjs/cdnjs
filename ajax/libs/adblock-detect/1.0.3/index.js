(function(root, factory) {

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.adblockDetect = factory();
    }

}(this, function() {

    function adblockDetect(callback, options) {

        options = merge(adblockDetect.defaults, options || {});

        var testNode = createNode(options.testNodeClasses, options.testNodeStyle);
        var runsCounter = 0;
        var adblockDetected = false;

        var testInterval = setInterval(function() {

            runsCounter++;
            adblockDetected = isNodeBlocked(testNode);

            if (adblockDetected || runsCounter === options.testRuns) {
                clearInterval(testInterval);
                testNode.parentNode && testNode.parentNode.removeChild(testNode);
                callback(adblockDetected);
            }

        }, options.testInterval);

    }

    function createNode(testNodeClasses, testNodeStyle) {

        var document = window.document;
        var testNode = document.createElement('div');

        testNode.innerHTML = '&nbsp;';
        testNode.setAttribute('class', testNodeClasses);
        testNode.setAttribute('style', testNodeStyle);

        document.body.appendChild(testNode);

        return testNode;

    }

    function isNodeBlocked(testNode) {

        return testNode.offsetHeight === 0 ||
            !document.body.contains(testNode) ||
            testNode.style.display === 'none' ||
            testNode.style.visibility === 'hidden'
        ;

    }

    function merge(defaults, options) {

        var obj = {};

        for (var key in defaults) {
            obj[key] = defaults[key];
            options.hasOwnProperty(key) && (obj[key] = options[key]);
        }

        return obj;

    }

    adblockDetect.defaults = {
        testNodeClasses: 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
        testNodeStyle: 'height: 10px !important; font-size: 20px; color: transparent; position: absolute; bottom: 0; left: -10000px;',
        testInterval: 51,
        testRuns: 4
    };

    return adblockDetect;

}));
