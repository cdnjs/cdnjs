(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.cep = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var CepPromiseError = /*#__PURE__*/function (_Error) {
    _inherits(CepPromiseError, _Error);

    var _super = _createSuper(CepPromiseError);

    function CepPromiseError() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          message = _ref.message,
          type = _ref.type,
          errors = _ref.errors;

      _classCallCheck(this, CepPromiseError);

      _this = _super.call(this);
      _this.name = 'CepPromiseError';
      _this.message = message;
      _this.type = type;
      _this.errors = errors;
      return _this;
    }

    return CepPromiseError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  function fetch (e, n) {
    return n = n || {}, new Promise(function (t, r) {
      var s = new XMLHttpRequest(),
          o = [],
          u = [],
          i = {},
          a = function a() {
        return {
          ok: 2 == (s.status / 100 | 0),
          statusText: s.statusText,
          status: s.status,
          url: s.responseURL,
          text: function text() {
            return Promise.resolve(s.responseText);
          },
          json: function json() {
            return Promise.resolve(JSON.parse(s.responseText));
          },
          blob: function blob() {
            return Promise.resolve(new Blob([s.response]));
          },
          clone: a,
          headers: {
            keys: function keys() {
              return o;
            },
            entries: function entries() {
              return u;
            },
            get: function get(e) {
              return i[e.toLowerCase()];
            },
            has: function has(e) {
              return e.toLowerCase() in i;
            }
          }
        };
      };

      for (var l in s.open(n.method || "get", e, !0), s.onload = function () {
        s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (e, n, t) {
          o.push(n = n.toLowerCase()), u.push([n, t]), i[n] = i[n] ? i[n] + "," + t : t;
        }), t(a());
      }, s.onerror = r, s.withCredentials = "include" == n.credentials, n.headers) {
        s.setRequestHeader(l, n.headers[l]);
      }

      s.send(n.body || null);
    });
  }

  var ServiceError = /*#__PURE__*/function (_Error) {
    _inherits(ServiceError, _Error);

    var _super = _createSuper(ServiceError);

    function ServiceError() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          message = _ref.message,
          service = _ref.service;

      _classCallCheck(this, ServiceError);

      _this = _super.call(this);
      _this.name = 'ServiceError';
      _this.message = message;
      _this.service = service;
      return _this;
    }

    return ServiceError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  function fetchCorreiosService(cepWithLeftPad, configurations) {
    var url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente';
    var options = {
      method: 'POST',
      body: "<?xml version=\"1.0\"?>\n<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:cli=\"http://cliente.bean.master.sigep.bsb.correios.com.br/\">\n  <soapenv:Header />\n  <soapenv:Body>\n    <cli:consultaCEP>\n      <cep>".concat(cepWithLeftPad, "</cep>\n    </cli:consultaCEP>\n  </soapenv:Body>\n</soapenv:Envelope>"),
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'cache-control': 'no-cache'
      },
      timeout: configurations.timeout || 30000
    };
    return fetch(url, options).then(analyzeAndParseResponse)["catch"](throwApplicationError);
  }

  function analyzeAndParseResponse(response) {
    if (response.ok) {
      return response.text().then(parseSuccessXML).then(extractValuesFromSuccessResponse);
    }

    return response.text().then(parseAndextractErrorMessage).then(throwCorreiosError);
  }

  function parseSuccessXML(xmlString) {
    try {
      var _xmlString$replace$ma;

      var returnStatement = (_xmlString$replace$ma = xmlString.replace(/\r?\n|\r/g, '').match(/<return>(.*)<\/return>/)[0]) !== null && _xmlString$replace$ma !== void 0 ? _xmlString$replace$ma : '';
      var cleanReturnStatement = returnStatement.replace('<return>', '').replace('</return>', '');
      var parsedReturnStatement = cleanReturnStatement.split(/</).reduce(function (result, exp) {
        var splittenExp = exp.split('>');

        if (splittenExp.length > 1 && splittenExp[1].length) {
          result[splittenExp[0]] = splittenExp[1];
        }

        return result;
      }, {});
      return parsedReturnStatement;
    } catch (e) {
      throw new Error('Não foi possível interpretar o XML de resposta.');
    }
  }

  function parseAndextractErrorMessage(xmlString) {
    try {
      var _xmlString$match$;

      var returnStatement = (_xmlString$match$ = xmlString.match(/<faultstring>(.*)<\/faultstring>/)[0]) !== null && _xmlString$match$ !== void 0 ? _xmlString$match$ : '';
      var cleanReturnStatement = returnStatement.replace('<faultstring>', '').replace('</faultstring>', '');
      return cleanReturnStatement;
    } catch (e) {
      throw new Error('Não foi possível interpretar o XML de resposta.');
    }
  }

  function throwCorreiosError(translatedErrorMessage) {
    throw new Error(translatedErrorMessage);
  }

  function extractValuesFromSuccessResponse(xmlObject) {
    return {
      cep: xmlObject.cep,
      state: xmlObject.uf,
      city: xmlObject.cidade,
      neighborhood: xmlObject.bairro,
      street: xmlObject.end,
      service: 'correios'
    };
  }

  function throwApplicationError(error) {
    var serviceError = new ServiceError({
      message: error.message,
      service: 'correios'
    });

    if (error.name === 'FetchError') {
      serviceError.message = 'Erro ao se conectar com o serviço dos Correios.';
    }

    throw serviceError;
  }

  function fetchViaCepService(cepWithLeftPad, configurations) {
    var url = "https://viacep.com.br/ws/".concat(cepWithLeftPad, "/json/");
    var options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      timeout: configurations.timeout || 30000
    };

    if (typeof window == 'undefined') {
      options.headers['user-agent'] = 'cep-promise';
    }

    return fetch(url, options).then(analyzeAndParseResponse$1).then(checkForViaCepError).then(extractCepValuesFromResponse)["catch"](throwApplicationError$1);
  }

  function analyzeAndParseResponse$1(response) {
    if (response.ok) {
      return response.json();
    }

    throw Error('Erro ao se conectar com o serviço ViaCEP.');
  }

  function checkForViaCepError(responseObject) {
    if (responseObject.erro === true) {
      throw new Error('CEP não encontrado na base do ViaCEP.');
    }

    return responseObject;
  }

  function extractCepValuesFromResponse(responseObject) {
    return {
      cep: responseObject.cep.replace('-', ''),
      state: responseObject.uf,
      city: responseObject.localidade,
      neighborhood: responseObject.bairro,
      street: responseObject.logradouro,
      service: 'viacep'
    };
  }

  function throwApplicationError$1(error) {
    var serviceError = new ServiceError({
      message: error.message,
      service: 'viacep'
    });

    if (error.name === 'FetchError') {
      serviceError.message = 'Erro ao se conectar com o serviço ViaCEP.';
    }

    throw serviceError;
  }

  function fetchWideNetService(cepWithLeftPad, configurations) {
    var url = "https://ws.apicep.com/busca-cep/api/cep/".concat(cepWithLeftPad, ".json");
    var options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      timeout: configurations.timeout || 30000
    };
    return fetch(url, options).then(analyzeAndParseResponse$2).then(checkForWideNetError).then(extractCepValuesFromResponse$1)["catch"](throwApplicationError$2);
  }

  function analyzeAndParseResponse$2(response) {
    if (response.ok) {
      return response.json();
    }

    throw Error('Erro ao se conectar com o serviço WideNet.');
  }

  function checkForWideNetError(object) {
    if (object.ok === false || object.status !== 200) {
      throw new Error('CEP não encontrado na base do WideNet.');
    }

    return object;
  }

  function extractCepValuesFromResponse$1(object) {
    return {
      cep: object.code.replace('-', ''),
      state: object.state,
      city: object.city,
      neighborhood: object.district,
      street: object.address,
      service: 'widenet'
    };
  }

  function throwApplicationError$2(error) {
    var serviceError = new ServiceError({
      message: error.message,
      service: 'widenet'
    });

    if (error.name === 'FetchError') {
      serviceError.message = 'Erro ao se conectar com o serviço WideNet.';
    }

    throw serviceError;
  }

  function fetchBrasilAPIService(cepWithLeftPad, configurations) {
    var url = "https://brasilapi.com.br/api/cep/v1/".concat(cepWithLeftPad);
    var options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      timeout: configurations.timeout || 30000
    };
    return fetch(url, options).then(parseResponse).then(extractCepValuesFromResponse$2)["catch"](throwApplicationError$3);
  }

  function parseResponse(response) {
    if (response.ok === false || response.status !== 200) {
      throw new Error('CEP não encontrado na base do BrasilAPI.');
    }

    return response.json();
  }

  function extractCepValuesFromResponse$2(response) {
    return {
      cep: response.cep,
      state: response.state,
      city: response.city,
      neighborhood: response.neighborhood,
      street: response.street,
      service: 'brasilapi'
    };
  }

  function throwApplicationError$3(error) {
    var serviceError = new ServiceError({
      message: error.message,
      service: 'brasilapi'
    });

    if (error.name === 'FetchError') {
      serviceError.message = 'Erro ao se conectar com o serviço BrasilAPI.';
    }

    throw serviceError;
  }

  function getAvailableServices() {
    var isBrowser = typeof window !== 'undefined';

    if (isBrowser) {
      return {
        viacep: fetchViaCepService,
        widenet: fetchWideNetService,
        brasilapi: fetchBrasilAPIService
      };
    }

    return {
      correios: fetchCorreiosService,
      viacep: fetchViaCepService,
      widenet: fetchWideNetService,
      brasilapi: fetchBrasilAPIService
    };
  }

  var reverse = function reverse(promise) {
    return new Promise(function (resolve, reject) {
      return Promise.resolve(promise).then(reject, resolve);
    });
  };

  Promise.any = function (iterable) {
    return reverse(Promise.all(_toConsumableArray(iterable).map(reverse)));
  };

  var Promise$1 = Promise;

  var CEP_SIZE = 8;
  function cepPromise (cepRawValue) {
    var configurations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return Promise$1.resolve(cepRawValue).then(validateInputType).then(function (cepRawValue) {
      configurations.providers = configurations.providers ? configurations.providers : [];
      validateProviders(configurations.providers);
      return cepRawValue;
    }).then(removeSpecialCharacters).then(validateInputLength).then(leftPadWithZeros).then(function (cepWithLeftPad) {
      return fetchCepFromServices(cepWithLeftPad, configurations);
    })["catch"](handleServicesError)["catch"](throwApplicationError$4);
  }

  function validateProviders(providers) {
    var availableProviders = Object.keys(getAvailableServices());

    if (!Array.isArray(providers)) {
      throw new CepPromiseError({
        message: 'Erro ao inicializar a instância do CepPromise.',
        type: 'validation_error',
        errors: [{
          message: 'O parâmetro providers deve ser uma lista.',
          service: 'providers_validation'
        }]
      });
    }

    var _iterator = _createForOfIteratorHelper(providers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var provider = _step.value;

        if (!availableProviders.includes(provider)) {
          throw new CepPromiseError({
            message: 'Erro ao inicializar a instância do CepPromise.',
            type: 'validation_error',
            errors: [{
              message: "O provider \"".concat(provider, "\" \xE9 inv\xE1lido. Os providers dispon\xEDveis s\xE3o: [\"").concat(availableProviders.join('", "'), "\"]."),
              service: 'providers_validation'
            }]
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  function validateInputType(cepRawValue) {
    var cepTypeOf = _typeof(cepRawValue);

    if (cepTypeOf === 'number' || cepTypeOf === 'string') {
      return cepRawValue;
    }

    throw new CepPromiseError({
      message: 'Erro ao inicializar a instância do CepPromise.',
      type: 'validation_error',
      errors: [{
        message: 'Você deve chamar o construtor utilizando uma String ou um Number.',
        service: 'cep_validation'
      }]
    });
  }

  function removeSpecialCharacters(cepRawValue) {
    return cepRawValue.toString().replace(/\D+/g, '');
  }

  function leftPadWithZeros(cepCleanValue) {
    return '0'.repeat(CEP_SIZE - cepCleanValue.length) + cepCleanValue;
  }

  function validateInputLength(cepWithLeftPad) {
    if (cepWithLeftPad.length <= CEP_SIZE) {
      return cepWithLeftPad;
    }

    throw new CepPromiseError({
      message: "CEP deve conter exatamente ".concat(CEP_SIZE, " caracteres."),
      type: 'validation_error',
      errors: [{
        message: "CEP informado possui mais do que ".concat(CEP_SIZE, " caracteres."),
        service: 'cep_validation'
      }]
    });
  }

  function fetchCepFromServices(cepWithLeftPad, configurations) {
    var providersServices = getAvailableServices();

    if (configurations.providers.length === 0) {
      return Promise$1.any(Object.values(providersServices).map(function (provider) {
        return provider(cepWithLeftPad, configurations);
      }));
    }

    return Promise$1.any(configurations.providers.map(function (provider) {
      return providersServices[provider](cepWithLeftPad, configurations);
    }));
  }

  function handleServicesError(aggregatedErrors) {
    if (aggregatedErrors.length !== undefined) {
      throw new CepPromiseError({
        message: 'Todos os serviços de CEP retornaram erro.',
        type: 'service_error',
        errors: aggregatedErrors
      });
    }

    throw aggregatedErrors;
  }

  function throwApplicationError$4(_ref) {
    var message = _ref.message,
        type = _ref.type,
        errors = _ref.errors;
    throw new CepPromiseError({
      message: message,
      type: type,
      errors: errors
    });
  }

  return cepPromise;

})));
