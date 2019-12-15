document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("click", function (ev) {
        var micronTrigger = ev.target;
        var micronPrefix = "mjs-";
        var micronData = micronTrigger.dataset.micron;
        var micronDataDuration = micronTrigger.dataset.micronDuration;
        var micronDataTiming = micronTrigger.dataset.micronTiming;
        var micronBind = micronTrigger.dataset.micronBind;
        var micronPuppet = micronTrigger.dataset.micronId;
        //Global Trigger
        if (micronData !== undefined) {
            if (micronBind === "true") {
                if (micronPuppet !== undefined) {
                    var node = document.getElementById(micronPuppet);
                    if (node !== undefined && node !== null) {
                        var twinNode = node.cloneNode(true);
                        node.parentNode.replaceChild(twinNode, node);
                        twinNode.classList.add(micronPrefix + micronData);
                    } else {
                        console.log("%c Micron Error : None of the DOM element reference to the declared ID", "color:red");
                        return false;
                    }
                } else {
                    console.log("%c Micron Error : add data-micron-id to bind an interaction", "color:red");
                    return false;
                }
            } else {
                var node = micronTrigger;
                var twinNode = node.cloneNode(true);
                node.parentNode.replaceChild(twinNode, node);
                twinNode.classList.add(micronPrefix + micronData);
            }
        } else {
            return false;
        }

        //Duration
        if (micronDataDuration !== undefined) {
            if (isNaN(micronDataDuration)) {
                console.log("%c Micron Error : data-micron-duration can only be number or decimal", "color:red");
                console.log("%c Micron Fallback : data-micron-duration set to default", "color:orange");
                twinNode.style.animationDuration = ".30s";
            } else {
                twinNode.style.animationDuration = micronDataDuration + "s";
            }
        } else {
            twinNode.style.animationDuration = ".45s";
        }

        //Easing Timing Function
        if (micronDataTiming !== undefined) {
            if (micronDataTiming === "linear" || micronDataTiming === "ease-in" || micronDataTiming === "ease-out" || micronDataTiming === "ease-in-out") {
                twinNode.classList.add(micronPrefix + micronDataTiming);
            } else {
                console.log("%c Micron Error : data-micron-timing currently supports linear, ease-in, ease-out and ease-in-out only", "color:red");
                console.log("%c Micron Fallback : data-micron-timing set to default", "color:orange");
                twinNode.classList.add(micronPrefix + "ease-in-out");
            }
        } else {
            twinNode.classList.add(micronPrefix + "ease-in-out");
        }

    });
});

//Micron Prototype
var Micron = function () {
    var ele;
    var node;

    //Get Element from DOM
    var getEle = function (paramEle) {
        ele = document.querySelector(paramEle);
        if (ele != undefined && ele != null) {
            node = ele.cloneNode("true");
            ele.parentNode.replaceChild(node, ele);
            return this;
        } else {
            console.log(
                "%c Micron Error : None of the DOM element reference to the argument which is passed to getEle() method",
                "color:red");
            return this;
        }
    }

    //Animation
    var interaction = function (paramAnimation) {
        if (node !== undefined && node !== null) {
            if (paramAnimation != undefined && paramAnimation != null && paramAnimation.indexOf(" ") ==
                -1) {
                var prefixAnimation = "mjs-" + paramAnimation;
                node.classList.add(prefixAnimation);
                return this;
            } else {
                console.log(
                    "%c Micron Error : either you are missing an argument or trying to pass an argument with spaces to animation() method",
                    "color:red");
                return this;
            }
        } else {
            return this;
        }
    }

    //Duration
    var duration = function (paramDuration) {
        if (node != undefined && node != null) {
            if (isNaN(paramDuration) == false) {
                node.style.animationDuration = paramDuration + "s";
                return this;
            } else {
                console.log("%c Micron Error : you can only pass number or decimal as arguments to duration() method", "color:red");
                return this;
            }
        } else {
            return this;
        }
    }

    var timing = function (paramTiming) {
        if (node != undefined && node != null) {
            if (paramTiming == "linear" || paramTiming == "ease-in" || paramTiming == "ease-out" ||
                paramTiming == "ease-in-out") {
                var prefixTiming = "mjs-" + paramTiming;
                node.classList.add(prefixTiming);
                return this;
            } else {
                console.log("%c Micron Error : you can only pass linear, ease-in, ease-out and ease-in-out as arguments to timing() method", "color:red");
                return this;
            }
        } else {
            return this;
        }

    }

    return {
        getEle: getEle,
        interaction: interaction,
        duration: duration,
        timing: timing
    }
}

var micron = Micron();

//Usage Sample
//micron.getEle().interaction().duration().timing();