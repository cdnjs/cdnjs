/*! 
 * 
 * Version: 1.0.0
 * Name: SDK Fidelizar Mais 
 * Author: Fidelizar Mais
 * Company: Fidelizar Mais Solucao de Tecnologia Ltda
 * Description: Programa de Fidelidade para sua Loja Virtual Se conecte de forma única com seus clientes e crie relacionamentos duradouros de fidelidade, ao recompensar e se fazer presente na vida deles. Saiba mais Pontue Recompense seus clientes com pontos, por ex.: a cada 1 real em compras = 1 ponto, e nosso sistema começará a interagir […]
 * Domain: fidelizarmais.co
 * 
 * */

var jFMais, __fmgwinus = {
    init: function (gWin) {
        jFMais = function () { }

        let year = new Date().getFullYear();
        var nav = gWin.navigator;
        var loc = gWin.location;
        let fm = {
            version: '1.0.0',
            year: year,
            date: new Date(),
            versionName: 'SDK Fidelizar Mais',
            author: 'Fidelizar Mais',
            company: 'Fidelizar Mais Solucao de Tecnologia Ltda',
            description: 'Programa de Fidelidade para sua Loja Virtual Se conecte de forma única com seus clientes e crie relacionamentos duradouros de fidelidade, ao recompensar e se fazer presente na vida deles. Saiba mais Pontue Recompense seus clientes com pontos, por ex.: a cada 1 real em compras = 1 ponto, e nosso sistema começará a interagir […]',
            domain: 'fidelizarmais.co',
            nav: nav,
            loc: loc,
            userAgent: nav.userAgent,
            isMobile: (nav.userAgent.indexOf("Mobile") > 0),
            newGuid: function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
            isValidEmail: function (email) {
                return /^(([^,<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
            },
            /**
             *
             * Exemplo da chamada
             *
             * function example() {
             *      let settings = {
             *          url: '',
             *          query: '',
             *          data: null,
             *          storeKey: '',
             *          secretKey: '',
             *      };
             *
             *      jFMais.get(settings).then((success) => {
             *          return success;
             *      }).catch((error) => {
             *          return error;
             *      });
             * }
             *
             * @param {any} settings
             */
            get: function (settings) {
                return new Promise(function (resolve, reject) {
                    var request = (typeof XMLHttpRequest !== 'undefined') ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    settings.url += (settings.query !== undefined && settings.query !== 'undefined' && settings.query !== '') ? settings.query : '';

                    __setHeaders(request, 'GET', settings.url, settings.storeKey, settings.secretKey);

                    request.onload = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            resolve(this.responseText);
                        } else if (request.readyState === 4 && request.status !== 200) {
                            reject(this.responseText);
                        }
                    };

                    request.onerror = function () {
                        reject(this.responseText);
                    };

                    request.ontimeout = function () {
                        reject(this.responseText);
                    };

                    __send(request, settings.data);
                });
            },
            /**
             *
             * Exemplo da chamada
             *
             * function example() {
             *      let settings = {
             *          url: '',
             *          query: '',
             *          data: null,
             *          storeKey: '',
             *          secretKey: '',
             *      };
             *
             *      jFMais.post(settings).then((success) => {
             *          return success;
             *      }).catch((error) => {
             *          return error;
             *      });
             * }
             *
             * @param {any} settings
             */
            post: function (settings) {
                return new Promise(function (resolve, reject) {
                    var request = (typeof XMLHttpRequest !== 'undefined') ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    settings.url += (settings.query !== undefined && settings.query !== 'undefined' && settings.query !== '') ? settings.query : '';

                    __setHeaders(request, 'POST', settings.url, settings.storeKey, settings.secretKey);

                    request.onload = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            resolve(this.responseText);
                        } else if (request.readyState === 4 && request.status !== 200) {
                            reject(this.responseText);
                        }
                    };

                    request.onerror = function () {
                        reject(this.responseText);
                    };

                    request.ontimeout = function () {
                        reject(this.responseText);
                    };

                    __send(request, settings.data);
                });
            },
            /**
             *
             * Exemplo da chamada
             *
             * let url = '';
             * jFMais.isValidUrl(url).then((success) => {
             *     return success;
             * }).catch((error) => {
             *     return error;
             * });
             *
             * @param {any} url
             */
            isValidUrl: function (url) {
                return new Promise(function (resolve, reject) {

                    if (url === '' || url === null || url === undefined) {
                        reject(false);
                    } else {

                        var request = (typeof XMLHttpRequest !== 'undefined') ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                        request.open('GET', url, true);

                        request.onreadystatechange = function (e) {
                            if (request.readyState === 4 && request.status === 200) {
                                resolve(true);
                            } else if (request.readyState === 4 && request.status !== 200) {
                                reject(false);
                            }
                        };

                        request.onerror = function (e) {
                            reject(false);
                        };

                        request.ontimeout = function (e) {
                            reject(false);
                        };

                        request.send();
                    }
                });
            },
            /**
             *
             * Exemplo da chamada
             *
             * let url = '';
             * jFMais.readUrl(url).then((success) => {
             *     return success;
             * }).catch((error) => {
             *     return error;
             * });
             *
             * @param {any} url
             */
            readUrl: function (url) {
                return new Promise(function (resolve, reject) {

                    if (url === '' || url === null || url === undefined) {
                        reject(null);
                    } else {

                        var request = (typeof XMLHttpRequest !== 'undefined') ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                        request.open('GET', url, true);

                        request.onreadystatechange = function (e) {
                            if (request.readyState === 4 && request.status === 200) {
                                resolve(this.responseText);
                            } else if (request.readyState === 4 && request.status !== 200) {
                                reject(null);
                            }
                        };

                        request.onerror = function (e) {
                            reject(null);
                        };

                        request.ontimeout = function (e) {
                            reject(null);
                        };

                        request.send();
                    }
                });
            },
            /**
             *
             * Exemplo da chamada
             * 
             * let param = {
             *      id: 'id',
             *      type: 'link' or 'script',
             *      version: '???',
             *      storeId: '???',
             *      src: 'link',
             * };
             * jFMais.appendHead(param);
             * 
             * @param {any} param
             */
            appendHead: function (param) {
                if (param.type === 'script') {
                    var file = document.createElement('script');
                    file.setAttribute('type', 'text/javascript');
                    file.setAttribute('charset', 'utf-8');
                    file.setAttribute('async', '');
                    file.setAttribute('defer', '');
                    file.setAttribute('data-store-id', param.storeId);
                    file.setAttribute('data-version', param.version);
                    file.setAttribute('src', param.src + param.version);
                    file.id = param.id;

                    if (typeof file !== 'undefined' && document.getElementById(param.id) === null) {
                        document.getElementsByTagName('head')[0].appendChild(file);
                    }
                } else if (param.type === 'link') {

                    var file = document.createElement('link');
                    file.setAttribute('type', 'text/css');
                    file.setAttribute("rel", "stylesheet");
                    file.setAttribute('data-version', param.version);
                    file.setAttribute('href', param.src + param.version);
                    file.id = param.id;

                    if (typeof file !== 'undefined' && document.getElementById(param.id) === null) {
                        document.getElementsByTagName('head')[0].appendChild(file);
                    }
                }
            }, 
        };

        jFMais = fm;

        function __setHeaders(request, type, url, storeKey, secretKey) {

            request.open(type, url, true);
            request.overrideMimeType("application/json");
            request.responseType = 'text';
            request.withCredentials = false;
            request.setRequestHeader('store-key', storeKey);
            request.setRequestHeader('secret-key', secretKey);
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            request.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin');
            request.setRequestHeader('Access-Control-Allow-Origin', '*');
            request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
            request.setRequestHeader('Accept-Language', 'pt-BR,pt,en-US,en');
        }
        function __send(request, data) {
            if (data !== undefined && data !== null && typeof data !== 'undefined' && data !== '') {
                request.send(JSON.stringify(data));
            } else {
                request.send(null);
            }
        }

        function mtel(obj) {
            obj = obj.replace(/\D/g, "")
            obj = obj.replace(/^(\d)/, "($1")
            obj = obj.replace(/(.{3})(\d)/, "$1)$2")
            if (obj.length == 9) {
                obj = obj.replace(/(.{1})$/, "-$1")
            } else if (obj.length == 10) {
                obj = obj.replace(/(.{2})$/, "-$1")
            } else if (obj.length == 11) {
                obj = obj.replace(/(.{3})$/, "-$1")
            } else if (obj.length == 12) {
                obj = obj.replace(/(.{4})$/, "-$1")
            } else if (obj.length > 12) {
                obj = obj.replace(/(.{4})$/, "-$1")
            }
            return obj;
        }
        function mcnpj(obj) {
            obj = obj.replace(/\D/g, "")
            obj = obj.replace(/^(\d{2})(\d)/, "$1.$2")
            obj = obj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            obj = obj.replace(/\.(\d{3})(\d)/, ".$1/$2")
            obj = obj.replace(/(\d{4})(\d)/, "$1-$2")
            return obj
        }
        function mcpf(obj) {
            obj = obj.replace(/\D/g, "")
            obj = obj.replace(/(\d{3})(\d)/, "$1.$2")
            obj = obj.replace(/(\d{3})(\d)/, "$1.$2")
            obj = obj.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            return obj
        }
        function mzip(obj) {
            obj = obj.replace(/\D/g, "")
            obj = obj.replace(/^(\d{2})(\d)/, "$1.$2")
            obj = obj.replace(/\.(\d{3})(\d)/, ".$1-$2")
            return obj
        }
        function mdate(obj) {
            obj = obj.replace(/\D/g, "")
            obj = obj.replace(/(\d{2})(\d)/, "$1/$2")
            obj = obj.replace(/(\d{2})(\d)/, "$1/$2")
            return obj;
        }
        function mhour(obj) {
            obj = obj.replace(/\D/g, "")
            obj = obj.replace(/(\d{2})(\d)/, "$1:$2")
            return obj;
        }
        function mdomain(obj) {
            obj = obj.replace(/^https:\/\/?/, "")
            domain = obj
            path = ""
            if (obj.indexOf("/") > -1) domain = obj.split("/")[0]
            path = obj.replace(/[^\/]*/, "")
            domain = domain.replace(/[^\w\.\+-:@]/g, "")
            path = path.replace(/[^\w\d\+-@:\?&=%\(\)\.]/g, "")
            path = path.replace(/([\?&])=/, "$1")
            if (path != "") domain = domain.replace(/\.+$/, "")
            obj = "https://" + domain + path
            return obj;
        }
        function mmoney(obj) {
            obj = obj.replace(/\D/g, "") // permite digitar apenas numero
            obj = obj.replace(/(\d{1})(\d{14})$/, "$1.$2") // coloca ponto antes dos ultimos digitos
            obj = obj.replace(/(\d{1})(\d{11})$/, "$1.$2") // coloca ponto antes dos ultimos 11 digitos
            obj = obj.replace(/(\d{1})(\d{8})$/, "$1.$2") // coloca ponto antes dos ultimos 8 digitos
            obj = obj.replace(/(\d{1})(\d{5})$/, "$1.$2") // coloca ponto antes dos ultimos 5 digitos
            obj = obj.replace(/(\d{1})(\d{1,2})$/, "$1,$2") // coloca virgula antes dos ultimos 2 digitos
            return obj;
        }
        function mask(obj, type) {
            switch (type) {
                case 'tel':
                    {
                        obj.value = mtel(obj.value);
                        return;
                    }
                case 'zip':
                    {
                        obj.value = mzip(obj.value);
                        return;
                    }
                case 'cpf':
                    {
                        obj.value = mcpf(obj.value);
                        return;
                    }
                case 'cnpj':
                    {
                        obj.value = mcnpj(obj.value);
                        return;
                    }
                case 'date':
                    {
                        obj.value = mdate(obj.value);
                        return;
                    }
                case 'hour':
                    {
                        obj.value = mhour(obj.value);
                        return;
                    }
                case 'domain':
                    {
                        obj.value = mdomain(obj.value);
                        return;
                    }
                case 'money':
                    {
                        obj.value = mmoney(obj.value);
                        return;
                    }
            }
        }

        function __load() {

            const elCCpfOrCnpj = document.querySelectorAll('.mask-cpf');
            elCCpfOrCnpj.forEach(el => { el.addEventListener('keypress', isCpfOrCnpj, false); });

            function isCpfOrCnpj(e) {
                if (e.length <= 14) {
                    mask(this, 'cpf');
                } else {
                    mask(this, 'cnpj');
                }
            }

            // mascara telefone
            const elTel = document.querySelectorAll('.mask-tel');
            elTel.forEach(el => { el.addEventListener('keypress', isTel, false); });
            function isTel(e) { mask(this, 'tel'); }

            // mascara cep
            const elZip = document.querySelectorAll('.mask-zip');
            elZip.forEach(el => { el.addEventListener('keypress', isZip, false); });
            function isZip(e) { mask(this, 'zip'); }

            // mascara data
            const elDate = document.querySelectorAll('.mask-date');
            elDate.forEach(el => { el.addEventListener('keypress', isDate, false); });
            function isDate(e) { mask(this, 'date'); }

            // mascara domninio
            const elDomain = document.querySelectorAll('.mask-domain');
            elDomain.forEach(el => { el.addEventListener('keypress', isDomain, false); });
            function isDomain(e) { mask(this, 'domain'); }

            // mascara hora
            const elHour = document.querySelectorAll('.mask-hour');
            elHour.forEach(el => { el.addEventListener('keypress', isHour, false); });
            function isHour(e) { mask(this, 'hour'); }

            // mascara hora
            const elMoney = document.querySelectorAll('.mask-money');
            elMoney.forEach(el => { el.addEventListener('keypress', isMoney, false); });
            function isMoney(e) { mask(this, 'money'); }
        }

        document.addEventListener("DOMContentLoaded", __load, false);

        window.jFMais = jFMais;
    }
};

(function (gWin) {
    'use strict';

    __fmgwinus.init(gWin);

})(typeof window !== 'undefined' ? window : this);
