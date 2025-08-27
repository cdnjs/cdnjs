/*!
 * DevExtreme (dx.ai-integration.debug.js)
 * Version: 25.1.5-build-25234-1935
 * Build date: Fri Aug 22 2025
 *
 * Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
! function() {
    var __webpack_modules__ = {
        55390:
            /*!*********************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/base.js ***!
              \*********************************************************************************************/
            function(__unused_webpack_module, exports) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.BaseCommand = void 0;
                exports.BaseCommand = class {
                    constructor(promptManager, requestManager) {
                        this.promptManager = promptManager;
                        this.requestManager = requestManager
                    }
                    execute(params, callbacks) {
                        const templateName = this.getTemplateName();
                        const data = this.buildPromptData(params);
                        const prompt = this.promptManager.buildPrompt(templateName, data);
                        const requestManagerCallbacks = {
                            onChunk: chunk => {
                                var _callbacks$onChunk;
                                null === callbacks || void 0 === callbacks || null === (_callbacks$onChunk = callbacks.onChunk) || void 0 === _callbacks$onChunk || _callbacks$onChunk.call(callbacks, chunk)
                            },
                            onComplete: result => {
                                var _callbacks$onComplete;
                                const finalResponse = this.parseResult(result);
                                null === callbacks || void 0 === callbacks || null === (_callbacks$onComplete = callbacks.onComplete) || void 0 === _callbacks$onComplete || _callbacks$onComplete.call(callbacks, finalResponse)
                            },
                            onError: error => {
                                var _callbacks$onError;
                                null === callbacks || void 0 === callbacks || null === (_callbacks$onError = callbacks.onError) || void 0 === _callbacks$onError || _callbacks$onError.call(callbacks, error)
                            }
                        };
                        const abort = this.requestManager.sendRequest(prompt, requestManagerCallbacks);
                        return abort
                    }
                }
            },
        5654:
            /*!****************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/changeStyle.js ***!
              \****************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.ChangeStyleCommand = void 0;
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                class ChangeStyleCommand extends _base.BaseCommand {
                    getTemplateName() {
                        return "changeStyle"
                    }
                    buildPromptData(params) {
                        return {
                            system: {
                                writingStyle: params.writingStyle
                            },
                            user: {
                                text: params.text
                            }
                        }
                    }
                    parseResult(response) {
                        return response
                    }
                }
                exports.ChangeStyleCommand = ChangeStyleCommand
            },
        16927:
            /*!***************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/changeTone.js ***!
              \***************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.ChangeToneCommand = void 0;
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                class ChangeToneCommand extends _base.BaseCommand {
                    getTemplateName() {
                        return "changeTone"
                    }
                    buildPromptData(params) {
                        return {
                            system: {
                                tone: params.tone
                            },
                            user: {
                                text: params.text
                            }
                        }
                    }
                    parseResult(response) {
                        return response
                    }
                }
                exports.ChangeToneCommand = ChangeToneCommand
            },
        15436:
            /*!************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/execute.js ***!
              \************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.ExecuteCommand = void 0;
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                class ExecuteCommand extends _base.BaseCommand {
                    getTemplateName() {
                        return "execute"
                    }
                    buildPromptData(params) {
                        return {
                            user: {
                                text: params.text
                            }
                        }
                    }
                    parseResult(response) {
                        return response
                    }
                }
                exports.ExecuteCommand = ExecuteCommand
            },
        37887:
            /*!***********************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/expand.js ***!
              \***********************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.ExpandCommand = void 0;
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                class ExpandCommand extends _base.BaseCommand {
                    getTemplateName() {
                        return "expand"
                    }
                    buildPromptData(params) {
                        return {
                            user: {
                                text: params.text
                            }
                        }
                    }
                    parseResult(response) {
                        return response
                    }
                }
                exports.ExpandCommand = ExpandCommand
            },
        39171:
            /*!**********************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/index.js ***!
              \**********************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                Object.defineProperty(exports, "BaseCommand", {
                    enumerable: true,
                    get: function() {
                        return _base.BaseCommand
                    }
                });
                Object.defineProperty(exports, "ChangeStyleCommand", {
                    enumerable: true,
                    get: function() {
                        return _changeStyle.ChangeStyleCommand
                    }
                });
                Object.defineProperty(exports, "ChangeToneCommand", {
                    enumerable: true,
                    get: function() {
                        return _changeTone.ChangeToneCommand
                    }
                });
                Object.defineProperty(exports, "ExecuteCommand", {
                    enumerable: true,
                    get: function() {
                        return _execute.ExecuteCommand
                    }
                });
                Object.defineProperty(exports, "ExpandCommand", {
                    enumerable: true,
                    get: function() {
                        return _expand.ExpandCommand
                    }
                });
                Object.defineProperty(exports, "ProofreadCommand", {
                    enumerable: true,
                    get: function() {
                        return _proofread.ProofreadCommand
                    }
                });
                Object.defineProperty(exports, "ShortenCommand", {
                    enumerable: true,
                    get: function() {
                        return _shorten.ShortenCommand
                    }
                });
                Object.defineProperty(exports, "SummarizeCommand", {
                    enumerable: true,
                    get: function() {
                        return _summarize.SummarizeCommand
                    }
                });
                Object.defineProperty(exports, "TranslateCommand", {
                    enumerable: true,
                    get: function() {
                        return _translate.TranslateCommand
                    }
                });
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                var _changeStyle = __webpack_require__( /*! ../../../core/ai_integration/commands/changeStyle */ 5654);
                var _changeTone = __webpack_require__( /*! ../../../core/ai_integration/commands/changeTone */ 16927);
                var _execute = __webpack_require__( /*! ../../../core/ai_integration/commands/execute */ 15436);
                var _expand = __webpack_require__( /*! ../../../core/ai_integration/commands/expand */ 37887);
                var _proofread = __webpack_require__( /*! ../../../core/ai_integration/commands/proofread */ 11121);
                var _shorten = __webpack_require__( /*! ../../../core/ai_integration/commands/shorten */ 36050);
                var _summarize = __webpack_require__( /*! ../../../core/ai_integration/commands/summarize */ 15162);
                var _translate = __webpack_require__( /*! ../../../core/ai_integration/commands/translate */ 37025)
            },
        11121:
            /*!**************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/proofread.js ***!
              \**************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.ProofreadCommand = void 0;
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                class ProofreadCommand extends _base.BaseCommand {
                    getTemplateName() {
                        return "proofread"
                    }
                    buildPromptData(params) {
                        return {
                            user: {
                                text: params.text
                            }
                        }
                    }
                    parseResult(response) {
                        return response
                    }
                }
                exports.ProofreadCommand = ProofreadCommand
            },
        36050:
            /*!************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/shorten.js ***!
              \************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.ShortenCommand = void 0;
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                class ShortenCommand extends _base.BaseCommand {
                    getTemplateName() {
                        return "shorten"
                    }
                    buildPromptData(params) {
                        return {
                            user: {
                                text: params.text
                            }
                        }
                    }
                    parseResult(response) {
                        return response
                    }
                }
                exports.ShortenCommand = ShortenCommand
            },
        15162:
            /*!**************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/summarize.js ***!
              \**************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.SummarizeCommand = void 0;
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                class SummarizeCommand extends _base.BaseCommand {
                    getTemplateName() {
                        return "summarize"
                    }
                    buildPromptData(params) {
                        return {
                            user: {
                                text: params.text
                            }
                        }
                    }
                    parseResult(response) {
                        return response
                    }
                }
                exports.SummarizeCommand = SummarizeCommand
            },
        37025:
            /*!**************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/commands/translate.js ***!
              \**************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.TranslateCommand = void 0;
                var _base = __webpack_require__( /*! ../../../core/ai_integration/commands/base */ 55390);
                class TranslateCommand extends _base.BaseCommand {
                    getTemplateName() {
                        return "translate"
                    }
                    buildPromptData(params) {
                        return {
                            system: {
                                lang: params.lang
                            },
                            user: {
                                text: params.text
                            }
                        }
                    }
                    parseResult(response) {
                        return response
                    }
                }
                exports.TranslateCommand = TranslateCommand
            },
        49691:
            /*!***************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/core/ai_integration.js ***!
              \***************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.CommandNames = exports.COMMANDS = exports.AIIntegration = void 0;
                var _index = __webpack_require__( /*! ../../../core/ai_integration/commands/index */ 39171);
                var _prompt_manager = __webpack_require__( /*! ../../../core/ai_integration/core/prompt_manager */ 76542);
                var _request_manager = __webpack_require__( /*! ../../../core/ai_integration/core/request_manager */ 17083);
                var CommandNames;
                ! function(CommandNames) {
                    CommandNames.ChangeStyle = "changeStyle";
                    CommandNames.ChangeTone = "changeTone";
                    CommandNames.Execute = "execute";
                    CommandNames.Expand = "expand";
                    CommandNames.Proofread = "proofread";
                    CommandNames.Shorten = "shorten";
                    CommandNames.Summarize = "summarize";
                    CommandNames.Translate = "translate"
                }(CommandNames || (exports.CommandNames = CommandNames = {}));
                const COMMANDS = exports.COMMANDS = {
                    [CommandNames.ChangeStyle]: _index.ChangeStyleCommand,
                    [CommandNames.ChangeTone]: _index.ChangeToneCommand,
                    [CommandNames.Execute]: _index.ExecuteCommand,
                    [CommandNames.Expand]: _index.ExpandCommand,
                    [CommandNames.Proofread]: _index.ProofreadCommand,
                    [CommandNames.Shorten]: _index.ShortenCommand,
                    [CommandNames.Summarize]: _index.SummarizeCommand,
                    [CommandNames.Translate]: _index.TranslateCommand
                };
                exports.AIIntegration = class {
                    constructor(provider) {
                        this.promptManager = new _prompt_manager.PromptManager;
                        this.requestManager = new _request_manager.RequestManager(provider);
                        this.commands = new Map
                    }
                    executeCommand(commandName, params, callbacks) {
                        let command = this.commands.get(commandName);
                        if (!command) {
                            const Command = COMMANDS[commandName];
                            command = new Command(this.promptManager, this.requestManager);
                            this.commands.set(commandName, command)
                        }
                        return command.execute(params, callbacks)
                    }
                    changeStyle(params, callbacks) {
                        return this.executeCommand(CommandNames.ChangeStyle, params, callbacks)
                    }
                    changeTone(params, callbacks) {
                        return this.executeCommand(CommandNames.ChangeTone, params, callbacks)
                    }
                    execute(params, callbacks) {
                        return this.executeCommand(CommandNames.Execute, params, callbacks)
                    }
                    expand(params, callbacks) {
                        return this.executeCommand(CommandNames.Expand, params, callbacks)
                    }
                    proofread(params, callbacks) {
                        return this.executeCommand(CommandNames.Proofread, params, callbacks)
                    }
                    shorten(params, callbacks) {
                        return this.executeCommand(CommandNames.Shorten, params, callbacks)
                    }
                    summarize(params, callbacks) {
                        return this.executeCommand(CommandNames.Summarize, params, callbacks)
                    }
                    translate(params, callbacks) {
                        return this.executeCommand(CommandNames.Translate, params, callbacks)
                    }
                }
            },
        76542:
            /*!***************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/core/prompt_manager.js ***!
              \***************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.PromptManager = exports.ERROR_MESSAGES = void 0;
                var _index = __webpack_require__( /*! ../../../core/ai_integration/templates/index */ 31764);
                const ERROR_MESSAGES = exports.ERROR_MESSAGES = {
                    TEMPLATE_NOT_FOUND: "Template not found"
                };
                exports.PromptManager = class {
                    constructor() {
                        this.templates = new Map(Object.entries(_index.templates))
                    }
                    buildPrompt(templateName, data) {
                        const template = this.templates.get(templateName);
                        if (!template) {
                            throw new Error(ERROR_MESSAGES.TEMPLATE_NOT_FOUND)
                        }
                        const system = this.generateMessage(template.system, data.system);
                        const user = this.generateMessage(template.user, data.user);
                        const prompt = {
                            system: system,
                            user: user
                        };
                        return prompt
                    }
                    generateMessage(promptTemplate, placeholders) {
                        if (!placeholders && !promptTemplate) {
                            return
                        }
                        if (!promptTemplate && placeholders) {
                            return Object.keys(placeholders).reduce(((acc, key) => `${acc} ${placeholders[key]}`), "").trim()
                        }
                        if (!placeholders && promptTemplate) {
                            return promptTemplate
                        }
                        const result = this.replacePlaceholders(promptTemplate, placeholders);
                        return result
                    }
                    replacePlaceholders(promptTemplate, placeholders) {
                        const result = Object.entries(placeholders).reduce(((acc, _ref) => {
                            let [key, value] = _ref;
                            return acc.replaceAll(`{{${key}}}`, value)
                        }), promptTemplate);
                        return result
                    }
                }
            },
        17083:
            /*!****************************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/core/request_manager.js ***!
              \****************************************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.RequestManager = void 0;
                var _errors = (e = __webpack_require__( /*! ../../../../core/errors */ 87129), e && e.__esModule ? e : {
                    default: e
                });
                var e;
                exports.RequestManager = class {
                    constructor(provider) {
                        this.provider = provider;
                        this.validateProvider()
                    }
                    validateProvider() {
                        if ("function" !== typeof this.provider.sendRequest) {
                            throw _errors.default.Error("E0122")
                        }
                    }
                    sendRequest(prompt, callbacks) {
                        let aborted = false;
                        const params = {
                            prompt: prompt,
                            onChunk: chunk => {
                                if (!aborted) {
                                    var _callbacks$onChunk;
                                    null === callbacks || void 0 === callbacks || null === (_callbacks$onChunk = callbacks.onChunk) || void 0 === _callbacks$onChunk || _callbacks$onChunk.call(callbacks, chunk)
                                }
                            }
                        };
                        const {
                            promise: promise,
                            abort: abortRequest
                        } = this.provider.sendRequest(params);
                        promise.then((response => {
                            if (!aborted) {
                                var _callbacks$onComplete;
                                null === callbacks || void 0 === callbacks || null === (_callbacks$onComplete = callbacks.onComplete) || void 0 === _callbacks$onComplete || _callbacks$onComplete.call(callbacks, response)
                            }
                        })).catch((e => {
                            if (!aborted) {
                                var _callbacks$onError;
                                null === callbacks || void 0 === callbacks || null === (_callbacks$onError = callbacks.onError) || void 0 === _callbacks$onError || _callbacks$onError.call(callbacks, e)
                            }
                        }));
                        return () => {
                            aborted = true;
                            null === abortRequest || void 0 === abortRequest || abortRequest()
                        }
                    }
                }
            },
        31764:
            /*!***********************************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/ai_integration/templates/index.js ***!
              \***********************************************************************************************/
            function(__unused_webpack_module, exports) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.templates = void 0;
                exports.templates = {
                    changeStyle: {
                        system: "Rewrite the text provided to match the {{writingStyle}} writing style. Ensure the rewritten text follows the grammatical rules and stylistic conventions of the specified style. Preserve the original meaning and context. Use complete sentences and a professional tone. Return answer with no markdown formatting."
                    },
                    changeTone: {
                        system: "Rewrite the following text to keep its original meaning but change its tone to {{tone}}. Provide only the rewritten text as plain text without any comments or formatting."
                    },
                    execute: {
                        system: "Return answer with no markdown formatting."
                    },
                    expand: {
                        system: "Expand the following text by adding relevant details, examples, and context while keeping the main point intact. Ensure the expanded text is coherent and logically structured. Return answer with no markdown formatting."
                    },
                    proofread: {
                        system: "Proofread the following text for grammar, punctuation, and style errors. Make corrections to ensure clarity and conciseness while preserving the original meaning. Use a formal writing style unless otherwise specified. Return only the revised text without any formatting or explanations."
                    },
                    shorten: {
                        system: "Please shorten the text provided by summarizing its content while retaining the main point and essential details. Aim to reduce the text to approximately 50% of its original length. Ensure that the key message remains clear and intact. Return answer with no markdown formatting."
                    },
                    summarize: {
                        system: "First, identify the key points of the provided text. Then, generate an abstractive summary by paraphrasing these points, ensuring the summary captures the core ideas and is approximately 20% of the text's length. Return answer with no markdown formatting."
                    },
                    translate: {
                        system: "Translate the text provided into {{lang}}. Ensure the translation retains the original meaning and tone. Provide only the translated text in your response, without any additional formatting or commentary."
                    }
                }
            },
        5583:
            /*!*************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/m_errors.js ***!
              \*************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.default = void 0;
                var _error = (e = __webpack_require__( /*! ../../core/utils/error */ 67264), e && e.__esModule ? e : {
                    default: e
                });
                var e;
                exports.default = (0, _error.default)({
                    E0001: "Method is not implemented",
                    E0002: "Member name collision: {0}",
                    E0003: "A class must be instantiated using the 'new' keyword",
                    E0004: "The NAME property of the component is not specified",
                    E0005: "Unknown device",
                    E0006: "Unknown endpoint key is requested",
                    E0007: "'Invalidate' method is called outside the update transaction",
                    E0008: "Type of the option name is not appropriate to create an action",
                    E0009: "Component '{0}' has not been initialized for an element",
                    E0010: "Animation configuration with the '{0}' type requires '{1}' configuration as {2}",
                    E0011: "Unknown animation type '{0}'",
                    E0012: "jQuery version is too old. Please upgrade jQuery to 1.10.0 or later",
                    E0013: "KnockoutJS version is too old. Please upgrade KnockoutJS to 2.3.0 or later",
                    E0014: "The 'release' method shouldn't be called for an unlocked Lock object",
                    E0015: "Queued task returned an unexpected result",
                    E0017: "Event namespace is not defined",
                    E0018: "DevExpress.ui.DevExpressPopup widget is required",
                    E0020: "Template engine '{0}' is not supported",
                    E0021: "Unknown theme is set: {0}",
                    E0022: "LINK[rel=DevExpress-theme] tags must go before DevExpress included scripts",
                    E0023: "Template name is not specified",
                    E0024: "DevExtreme bundle already included",
                    E0025: "Unexpected argument type",
                    E0100: "Unknown validation type is detected",
                    E0101: "Misconfigured range validation rule is detected",
                    E0102: "Misconfigured comparison validation rule is detected",
                    E0103: "validationCallback of an asynchronous rule should return a jQuery or a native promise",
                    E0110: "Unknown validation group is detected",
                    E0120: "Adapter for a DevExpressValidator component cannot be configured",
                    E0121: "The 'customItem' parameter of the 'onCustomItemCreating' function is empty or contains invalid data. Assign a custom object or a Promise that is resolved after the item is created.",
                    E0122: "AIIntegration: The sendRequest method is missing.",
                    W0000: "'{0}' is deprecated in {1}. {2}",
                    W0001: "{0} - '{1}' option is deprecated in {2}. {3}",
                    W0002: "{0} - '{1}' method is deprecated in {2}. {3}",
                    W0003: "{0} - '{1}' property is deprecated in {2}. {3}",
                    W0004: "Timeout for theme loading is over: {0}",
                    W0005: "'{0}' event is deprecated in {1}. {2}",
                    W0006: "Invalid recurrence rule: '{0}'",
                    W0007: "'{0}' Globalize culture is not defined",
                    W0008: "Invalid view type: {0}",
                    W0009: "Invalid time zone name: '{0}'",
                    W0010: "{0} is deprecated in {1}. {2}",
                    W0011: "Number parsing is invoked while the parser is not defined",
                    W0012: "Date parsing is invoked while the parser is not defined",
                    W0013: "'{0}' file is deprecated in {1}. {2}",
                    W0014: "{0} - '{1}' type is deprecated in {2}. {3}",
                    W0015: "Instead of returning a value from the '{0}' function, write it into the '{1}' field of the function's parameter.",
                    W0016: 'The "{0}" option does not accept the "{1}" value since v{2}. {3}.',
                    W0017: 'Setting the "{0}" property with a function is deprecated since v21.2',
                    W0018: 'Setting the "position" property with a function is deprecated since v21.2',
                    W0019: "DevExtreme: Unable to Locate a Valid License Key.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nIf you are using a 30-day trial version of DevExtreme, you must uninstall all copies of DevExtreme once your 30-day trial period expires. For terms and conditions that govern use of DevExtreme UI components/libraries, please refer to the DevExtreme End User License Agreement: https://js.devexpress.com/EULAs/DevExtremeComplete.\n\nTo use DevExtreme in a commercial project, you must purchase a license. For pricing/licensing options, please visit: https://js.devexpress.com/Buy.\n\nIf you have licensing-related questions or need help with a purchase, please email clientservices@devexpress.com.\n\n",
                    W0020: "DevExtreme: License Key Has Expired.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nA mismatch exists between the license key used and the DevExtreme version referenced in this project.\n\nTo proceed, you can:\n\u2022 use a version of DevExtreme linked to your license key: https://www.devexpress.com/ClientCenter/DownloadManager\n\u2022 renew your DevExpress Subscription: https://www.devexpress.com/buy/renew (once you renew your subscription, you will be entitled to product updates and support service as defined in the DevExtreme End User License Agreement)\n\nIf you have licensing-related questions or need help with a renewal, please email clientservices@devexpress.com.\n\n",
                    W0021: "DevExtreme: License Key Verification Has Failed.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nTo verify your DevExtreme license, make certain to specify a correct key in the GlobalConfig. If you continue to encounter this error, please visit https://www.devexpress.com/ClientCenter/DownloadManager to obtain a valid license key.\n\nIf you have a valid license and this problem persists, please submit a support ticket via the DevExpress Support Center. We will be happy to follow-up: https://supportcenter.devexpress.com/ticket/create.\n\n",
                    W0022: "DevExtreme: Pre-release software. Not suitable for commercial use.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nPre-release software may contain deficiencies and as such, should not be considered for use or integrated in any mission critical application.\n\n",
                    W0023: "DevExtreme: the following 'devextreme' package version does not match versions of other DevExpress products used in this application:\n\n{0}\n\nInteroperability between different versions of the products listed herein cannot be guaranteed.\n\n",
                    W0024: "DevExtreme: Use Your DevExtreme License Key - Not Your DevExpress .NET License Key\n\nInvalid/incorrect license key. You used your DevExpress .NET license key instead of your DevExtreme (React, Angular, Vue, JS) license key. Please copy your DevExtreme license key and try again. \n\nGo to https://www.devexpress.com/ClientCenter/DownloadManager (navigate to the DevExtreme Subscription section) to obtain a valid DevExtreme license key. To validate your license, specify the correct key within GlobalConfig.\n\nFor detailed license/registration information, visit https://js.devexpress.com/Documentation/Licensing/.\n\nIf you have a valid license and the issue persists, submit a support ticket via the DevExpress Support Center. We will be happy to follow-up: https://supportcenter.devexpress.com/ticket/create.\n\n"
                })
            },
        35005:
            /*!********************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/utils/m_console.js ***!
              \********************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.logger = exports.default = exports.debug = void 0;
                var _type = __webpack_require__( /*! ../../../core/utils/type */ 11528);
                const noop = function() {};
                const getConsoleMethod = function(method) {
                    if ("undefined" === typeof console || !(0, _type.isFunction)(console[method])) {
                        return noop
                    }
                    return console[method].bind(console)
                };
                const logger = exports.logger = {
                    log: getConsoleMethod("log"),
                    info: getConsoleMethod("info"),
                    warn: getConsoleMethod("warn"),
                    error: getConsoleMethod("error")
                };
                const debug = exports.debug = function() {
                    function assert(condition, message) {
                        if (!condition) {
                            throw new Error(message)
                        }
                    }
                    return {
                        assert: assert,
                        assertParam: function(parameter, message) {
                            assert(null !== parameter && void 0 !== parameter, message)
                        }
                    }
                }();
                exports.default = {
                    logger: logger,
                    debug: debug
                }
            },
        40818:
            /*!******************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/utils/m_error.js ***!
              \******************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.default = void 0;
                exports.error = error;
                var _extend = __webpack_require__( /*! ../../../core/utils/extend */ 52576);
                var _string = __webpack_require__( /*! ../../../core/utils/string */ 54497);
                var _version = __webpack_require__( /*! ../../../core/version */ 1956);
                var _m_console = (e = __webpack_require__( /*! ./m_console */ 35005), e && e.__esModule ? e : {
                    default: e
                });
                var e;
                const ERROR_URL = `https://js.devexpress.com/error/${_version.version.split(".").slice(0,2).join("_")}/`;

                function error(baseErrors, errors) {
                    const exports = {
                        ERROR_MESSAGES: (0, _extend.extend)(errors, baseErrors),
                        Error: function() {
                            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key]
                            }
                            return function(args) {
                                const id = args[0];
                                args = args.slice(1);
                                const details = formatDetails(id, args);
                                const url = getErrorUrl(id);
                                const message = formatMessage(id, details);
                                return (0, _extend.extend)(new Error(message), {
                                    __id: id,
                                    __details: details,
                                    url: url
                                })
                            }(args)
                        },
                        log() {
                            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                args[_key2] = arguments[_key2]
                            }
                            const id = args[0];
                            let method = "log";
                            if (/^E\d+$/.test(id)) {
                                method = "error"
                            } else if (/^W\d+$/.test(id)) {
                                method = "warn"
                            }
                            _m_console.default.logger[method]("log" === method ? id : function(args) {
                                const id = args[0];
                                args = args.slice(1);
                                return formatMessage(id, formatDetails(id, args))
                            }(args))
                        }
                    };

                    function formatDetails(id, args) {
                        args = [exports.ERROR_MESSAGES[id]].concat(args);
                        return _string.format.apply(this, args).replace(/\.*\s*?$/, "")
                    }

                    function formatMessage(id, details) {
                        const kind = null !== id && void 0 !== id && id.startsWith("W") ? "warning" : "error";
                        return _string.format.apply(this, ["{0} - {1}.\n\nFor additional information on this {2} message, see: {3}", id, details, kind, getErrorUrl(id)])
                    }

                    function getErrorUrl(id) {
                        return ERROR_URL + id
                    }
                    return exports
                }
                exports.default = error
            },
        96298:
            /*!*******************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/utils/m_extend.js ***!
              \*******************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.extendFromObject = exports.extend = void 0;
                var _type = __webpack_require__( /*! ../../../core/utils/type */ 11528);
                exports.extendFromObject = function(target, source, overrideExistingValues) {
                    target = target || {};
                    for (const prop in source) {
                        if (Object.prototype.hasOwnProperty.call(source, prop)) {
                            const value = source[prop];
                            if (!(prop in target) || overrideExistingValues) {
                                target[prop] = value
                            }
                        }
                    }
                    return target
                };
                const extend = function(target) {
                    target = target || {};
                    let i = 1;
                    let deep = false;
                    if ("boolean" === typeof target) {
                        deep = target;
                        target = arguments[1] || {};
                        i++
                    }
                    for (; i < arguments.length; i++) {
                        const source = arguments[i];
                        if (null == source) {
                            continue
                        }
                        for (const key in source) {
                            const targetValue = target[key];
                            const sourceValue = source[key];
                            let sourceValueIsArray = false;
                            let clone;
                            if ("__proto__" === key || "constructor" === key || target === sourceValue) {
                                continue
                            }
                            if (deep && sourceValue && ((0, _type.isPlainObject)(sourceValue) || (sourceValueIsArray = Array.isArray(sourceValue)))) {
                                if (sourceValueIsArray) {
                                    clone = targetValue && Array.isArray(targetValue) ? targetValue : []
                                } else {
                                    clone = targetValue && (0, _type.isPlainObject)(targetValue) ? targetValue : {}
                                }
                                target[key] = extend(deep, clone, sourceValue)
                            } else if (void 0 !== sourceValue) {
                                target[key] = sourceValue
                            }
                        }
                    }
                    return target
                };
                exports.extend = extend
            },
        32527:
            /*!*******************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/utils/m_string.js ***!
              \*******************************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.encodeHtml = void 0;
                exports.format = function(template) {
                    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        values[_key - 1] = arguments[_key]
                    }
                    if ((0, _type.isFunction)(template)) {
                        return template(...values)
                    }
                    values.forEach(((value, index) => {
                        if ((0, _type.isString)(value)) {
                            value = value.replace(/\$/g, "$$$$")
                        }
                        const placeholderReg = new RegExp(`\\{${index}\\}`, "gm");
                        template = template.replace(placeholderReg, value)
                    }));
                    return template
                };
                exports.quadToObject = exports.isEmpty = void 0;
                var _type = __webpack_require__( /*! ../../../core/utils/type */ 11528);
                exports.encodeHtml = function() {
                    const encodeRegExp = [new RegExp("&", "g"), new RegExp('"', "g"), new RegExp("'", "g"), new RegExp("<", "g"), new RegExp(">", "g")];
                    return function(str) {
                        return String(str).replace(encodeRegExp[0], "&amp;").replace(encodeRegExp[1], "&quot;").replace(encodeRegExp[2], "&#39;").replace(encodeRegExp[3], "&lt;").replace(encodeRegExp[4], "&gt;")
                    }
                }();
                exports.quadToObject = function(raw) {
                    const quad = function(raw) {
                        switch (typeof raw) {
                            case "string":
                                return raw.split(/\s+/, 4);
                            case "object":
                                return [raw.x || raw.h || raw.left, raw.y || raw.v || raw.top, raw.x || raw.h || raw.right, raw.y || raw.v || raw.bottom];
                            case "number":
                                return [raw];
                            default:
                                return raw
                        }
                    }(raw);
                    let left = parseInt(quad && quad[0], 10);
                    let top = parseInt(quad && quad[1], 10);
                    let right = parseInt(quad && quad[2], 10);
                    let bottom = parseInt(quad && quad[3], 10);
                    if (!isFinite(left)) {
                        left = 0
                    }
                    if (!isFinite(top)) {
                        top = left
                    }
                    if (!isFinite(right)) {
                        right = left
                    }
                    if (!isFinite(bottom)) {
                        bottom = top
                    }
                    return {
                        top: top,
                        right: right,
                        bottom: bottom,
                        left: left
                    }
                };
                exports.isEmpty = function() {
                    const SPACE_REGEXP = /\s/g;
                    return function(text) {
                        return !text || !text.replace(SPACE_REGEXP, "")
                    }
                }()
            },
        39918:
            /*!*****************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/__internal/core/utils/m_type.js ***!
              \*****************************************************************************/
            function(__unused_webpack_module, exports) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.type = exports.isWindow = exports.isString = exports.isRenderer = exports.isPromise = exports.isPrimitive = exports.isPlainObject = exports.isObject = exports.isNumeric = exports.isFunction = exports.isExponential = exports.isEvent = exports.isEmptyObject = exports.isDefined = exports.isDeferred = exports.isDate = exports.isBoolean = exports.default = void 0;
                const types = {
                    "[object Array]": "array",
                    "[object Date]": "date",
                    "[object Object]": "object",
                    "[object String]": "string"
                };
                const type = function(object) {
                    if (null === object) {
                        return "null"
                    }
                    const typeOfObject = Object.prototype.toString.call(object);
                    return "object" === typeof object ? types[typeOfObject] || "object" : typeof object
                };
                exports.type = type;
                const isBoolean = function(object) {
                    return "boolean" === typeof object
                };
                exports.isBoolean = isBoolean;
                const isExponential = function(value) {
                    return isNumeric(value) && -1 !== value.toString().indexOf("e")
                };
                exports.isExponential = isExponential;
                const isDate = function(object) {
                    return "date" === type(object)
                };
                exports.isDate = isDate;
                const isDefined = function(object) {
                    return null !== object && void 0 !== object
                };
                exports.isDefined = isDefined;
                const isFunction = function(object) {
                    return "function" === typeof object
                };
                exports.isFunction = isFunction;
                const isString = function(object) {
                    return "string" === typeof object
                };
                exports.isString = isString;
                const isNumeric = function(object) {
                    return "number" === typeof object && isFinite(object) || !isNaN(object - parseFloat(object))
                };
                exports.isNumeric = isNumeric;
                const isObject = function(object) {
                    return "object" === type(object)
                };
                exports.isObject = isObject;
                const isEmptyObject = function(object) {
                    let property;
                    for (property in object) {
                        return false
                    }
                    return true
                };
                exports.isEmptyObject = isEmptyObject;
                const isPlainObject = function(object) {
                    if (!object || "object" !== type(object)) {
                        return false
                    }
                    const proto = Object.getPrototypeOf(object);
                    if (!proto) {
                        return true
                    }
                    const ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
                    return "function" === typeof ctor && Object.toString.call(ctor) === Object.toString.call(Object)
                };
                exports.isPlainObject = isPlainObject;
                const isPrimitive = function(value) {
                    return !["object", "array", "function"].includes(type(value))
                };
                exports.isPrimitive = isPrimitive;
                const isWindow = function(object) {
                    return null != object && object === object.window
                };
                exports.isWindow = isWindow;
                const isRenderer = function(object) {
                    return !!object && !!(object.jquery || object.dxRenderer)
                };
                exports.isRenderer = isRenderer;
                const isPromise = function(object) {
                    return !!object && isFunction(object.then)
                };
                exports.isPromise = isPromise;
                const isDeferred = function(object) {
                    return !!object && isFunction(object.done) && isFunction(object.fail)
                };
                exports.isDeferred = isDeferred;
                const isEvent = function(object) {
                    return !!(object && object.preventDefault)
                };
                exports.isEvent = isEvent;
                exports.default = {
                    isBoolean: isBoolean,
                    isDate: isDate,
                    isDeferred: isDeferred,
                    isDefined: isDefined,
                    isEmptyObject: isEmptyObject,
                    isEvent: isEvent,
                    isExponential: isExponential,
                    isFunction: isFunction,
                    isNumeric: isNumeric,
                    isObject: isObject,
                    isPlainObject: isPlainObject,
                    isPrimitive: isPrimitive,
                    isPromise: isPromise,
                    isRenderer: isRenderer,
                    isString: isString,
                    isWindow: isWindow,
                    type: type
                }
            },
        63223:
            /*!**************************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/bundles/dx.ai-integration.js ***!
              \**************************************************************************/
            function(module, __unused_webpack_exports, __webpack_require__) {
                var _aiIntegration = __webpack_require__( /*! ../common/ai-integration */ 94977);
                module.exports = DevExpress.aiIntegration = _aiIntegration.AIIntegration
            },
        94977:
            /*!**********************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/common/ai-integration.js ***!
              \**********************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "AIIntegration", {
                    enumerable: true,
                    get: function() {
                        return _ai_integration.AIIntegration
                    }
                });
                var _ai_integration = __webpack_require__( /*! ../__internal/core/ai_integration/core/ai_integration */ 49691)
            },
        87129:
            /*!************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/core/errors.js ***!
              \************************************************************/
            function(module, exports, __webpack_require__) {
                exports.default = void 0;
                var _m_errors = (e = __webpack_require__( /*! ../__internal/core/m_errors */ 5583), e && e.__esModule ? e : {
                    default: e
                });
                var e;
                exports.default = _m_errors.default;
                module.exports = exports.default;
                module.exports.default = exports.default
            },
        67264:
            /*!*****************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/core/utils/error.js ***!
              \*****************************************************************/
            function(module, exports, __webpack_require__) {
                exports.default = void 0;
                var _m_error = __webpack_require__( /*! ../../__internal/core/utils/m_error */ 40818);
                exports.default = _m_error.error;
                module.exports = exports.default;
                module.exports.default = exports.default
            },
        52576:
            /*!******************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/core/utils/extend.js ***!
              \******************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "extend", {
                    enumerable: true,
                    get: function() {
                        return _m_extend.extend
                    }
                });
                Object.defineProperty(exports, "extendFromObject", {
                    enumerable: true,
                    get: function() {
                        return _m_extend.extendFromObject
                    }
                });
                var _m_extend = __webpack_require__( /*! ../../__internal/core/utils/m_extend */ 96298)
            },
        54497:
            /*!******************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/core/utils/string.js ***!
              \******************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "encodeHtml", {
                    enumerable: true,
                    get: function() {
                        return _m_string.encodeHtml
                    }
                });
                Object.defineProperty(exports, "format", {
                    enumerable: true,
                    get: function() {
                        return _m_string.format
                    }
                });
                Object.defineProperty(exports, "isEmpty", {
                    enumerable: true,
                    get: function() {
                        return _m_string.isEmpty
                    }
                });
                Object.defineProperty(exports, "quadToObject", {
                    enumerable: true,
                    get: function() {
                        return _m_string.quadToObject
                    }
                });
                var _m_string = __webpack_require__( /*! ../../__internal/core/utils/m_string */ 32527)
            },
        11528:
            /*!****************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/core/utils/type.js ***!
              \****************************************************************/
            function(__unused_webpack_module, exports, __webpack_require__) {
                Object.defineProperty(exports, "isBoolean", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isBoolean
                    }
                });
                Object.defineProperty(exports, "isDate", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isDate
                    }
                });
                Object.defineProperty(exports, "isDeferred", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isDeferred
                    }
                });
                Object.defineProperty(exports, "isDefined", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isDefined
                    }
                });
                Object.defineProperty(exports, "isEmptyObject", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isEmptyObject
                    }
                });
                Object.defineProperty(exports, "isEvent", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isEvent
                    }
                });
                Object.defineProperty(exports, "isExponential", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isExponential
                    }
                });
                Object.defineProperty(exports, "isFunction", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isFunction
                    }
                });
                Object.defineProperty(exports, "isNumeric", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isNumeric
                    }
                });
                Object.defineProperty(exports, "isObject", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isObject
                    }
                });
                Object.defineProperty(exports, "isPlainObject", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isPlainObject
                    }
                });
                Object.defineProperty(exports, "isPrimitive", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isPrimitive
                    }
                });
                Object.defineProperty(exports, "isPromise", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isPromise
                    }
                });
                Object.defineProperty(exports, "isRenderer", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isRenderer
                    }
                });
                Object.defineProperty(exports, "isString", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isString
                    }
                });
                Object.defineProperty(exports, "isWindow", {
                    enumerable: true,
                    get: function() {
                        return _m_type.isWindow
                    }
                });
                Object.defineProperty(exports, "type", {
                    enumerable: true,
                    get: function() {
                        return _m_type.type
                    }
                });
                var _m_type = __webpack_require__( /*! ../../__internal/core/utils/m_type */ 39918)
            },
        1956:
            /*!*************************************************************!*\
              !*** ./artifacts/transpiled-renovation-npm/core/version.js ***!
              \*************************************************************/
            function(__unused_webpack_module, exports) {
                exports.version = exports.fullVersion = void 0;
                exports.version = "25.1.4";
                exports.fullVersion = "25.1.4.25234-1935"
            }
    };
    var __webpack_module_cache__ = {};
    (function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) {
            return cachedModule.exports
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports
    })(63223)
}();
