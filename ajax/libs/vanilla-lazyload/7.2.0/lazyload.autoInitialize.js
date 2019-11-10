/* Creates instance and notifies it through the window element */
const createInstance = function (classObj, options) { 
    let instance = new classObj(options);
    let event = new CustomEvent("LazyLoad::Initialized", { detail: { instance } });
    window.dispatchEvent(event);
};

/* Auto initialization of one or more instances of lazyload, depending on the 
    options passed in (plain object or an array) */
export default function (classObj, options) { 
    let optsLength = options.length;
    if (!optsLength) {
        // Plain object
        createInstance(classObj, options);
    }
    else {
        // Array of objects
        for (let i = 0; i < optsLength; i++) {
            createInstance(classObj, options[i]);
        }
    }
};