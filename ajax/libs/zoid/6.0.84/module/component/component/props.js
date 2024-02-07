import 'zalgo-promise/src';


import { uniqueID } from '../../lib';
import '../../types';

/*  Internal Props
    --------------

    We define and use certain props by default, for configuration and events that are used at the framework level.
    These follow the same format as regular props, and are classed as reserved words that may not be overriden by users.
*/

export function getInternalProps() {
    return {

        // The desired env in which the component is being rendered. Used to determine the correct url

        env: {
            type: 'string',
            required: false,
            queryParam: true,
            def: function def() {
                return this.defaultEnv;
            }
        },

        uid: {
            type: 'string',
            def: function def() {
                return uniqueID();
            },

            queryParam: true
        },

        logLevel: {
            type: 'string',
            required: false,
            queryParam: true,
            def: function def() {
                return this.defaultLogLevel;
            }
        },

        // A custom url to use to render the component

        url: {
            type: 'string',
            required: false,
            promise: true,
            sendToChild: false
        },

        win: {
            type: 'object',
            required: false,
            sendToChild: false
        },

        dimensions: {
            type: 'object',
            required: false
        },

        version: {
            type: 'string',
            required: false,
            queryParam: true,
            def: function def() {
                return this.version;
            }
        },

        // A millisecond timeout before onTimeout is called

        timeout: {
            type: 'number',
            required: false,
            sendToChild: false
        },

        onDisplay: {
            type: 'function',
            required: false,
            noop: true,
            promisify: true,
            memoize: true,
            sendToChild: false
        },

        onEnter: {
            type: 'function',
            required: false,
            noop: true,
            promisify: true,
            sendToChild: false
        },

        // When we get an INIT message from the child

        onRender: {
            type: 'function',
            required: false,
            noop: true,
            promisify: true,
            sendToChild: false
        },

        // When the user closes the component.

        onClose: {
            type: 'function',
            required: false,
            noop: true,
            once: true,
            promisify: true,
            sendToChild: false
        },

        onDestroy: {
            type: 'function',
            required: false,
            noop: true,
            once: true,
            promisify: true,
            sendToChild: false
        },

        onResize: {
            type: 'function',
            required: false,
            noop: true,
            sendToChild: false
        },

        // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

        onTimeout: {
            type: 'function',
            required: false,
            memoize: true,
            promisify: true,
            sendToChild: false,
            def: function def() {
                return function onTimeout(err) {
                    if (this.props.onError) {
                        return this.props.onError(err);
                    }
                    throw err;
                };
            }
        },

        // When the component experiences an error

        onError: {
            type: 'function',
            required: false,
            promisify: true,
            sendToChild: true,
            once: true,
            def: function def() {
                return function onError(err) {
                    setTimeout(function () {
                        throw err;
                    });
                };
            }
        }
    };
}