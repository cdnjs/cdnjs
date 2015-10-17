/**
 * jQuery Form Validator Module: Brazil
 * ------------------------------------------
 * Created by Eduardo Cuducos <http://cuducos.me/>
 *
 * This form validation module adds validators typically used on
 * websites in the Brazil. This module adds the following validators:
 *  - cpf
 *  - cep
 *  - brphone
 *
 * @website http://formvalidator.net/#brazil-validators
 * @license MIT
 * @version 2.2.81
 */

$.formUtils.addValidator({
    name : 'cpf',
    validatorFunction : function(string) {

        // Based on this post from DevMedia:
        // http://www.devmedia.com.br/validar-cpf-com-javascript/23916

        // clean up the input (digits only) and set some support vars
        var cpf = string.replace(/\D/g,"");
        var sum1 = 0;
        var sum2 = 0;
        var remainder1 = 0;
        var remainder2 = 0;

        // skip special cases
        if (cpf.length != 11 || cpf == "00000000000") {
            return false;
        }

        // check 1st verification digit
        for (i=1; i<=9; i++) {
            sum1 += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder1 = (sum1 * 10) % 11;
        if (remainder1 >= 10) {
            remainder1 = 0;
        }
        if (remainder1 != parseInt(cpf.substring(9, 10))) {
            return false;
        }

        // check 2nd verification digit
        for (i = 1; i <= 10; i++) {
            sum2 += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder2 = (sum2 * 10) % 11;
        if (remainder2 >= 10) {
            remainder2 = 0;
        }
        if (remainder2 != parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;

    },
    errorMessage : '',
    errorMessageKey: 'badBrazilCPFAnswer'

});

$.formUtils.addValidator({
    name : 'brphone',
    validatorFunction : function(string) {

        // validates telefones such as (having X as numbers):
        // (XX) XXXX-XXXX
        // (XX) XXXXX-XXXX
        // XX XXXXXXXX
        // XX XXXXXXXXX
        // XXXXXXXXXX
        // XXXXXXXXXXX
        // +XX XX XXXXX-XXXX
        // +X XX XXXX-XXXX
        // And so on…

        if (string.match(/^(\+[\d]{1,3}[\s]{0,1}){0,1}(\(){0,1}(\d){2}(\)){0,1}(\s){0,1}(\d){4,5}([-. ]){0,1}(\d){4}$/g)) {
            return true;
        }

        return false;

    },
    errorMessage : '',
    errorMessageKey: 'badBrazilTelephoneAnswer'

});

$.formUtils.addValidator({
    name : 'cep',
    validatorFunction : function(string) {

        // validates CEP  such as (having X as numbers):
        // XXXXX-XXX
        // XXXXX.XXX
        // XXXXX XXX
        // XXXXXXXX

        if (string.match(/^(\d){5}([-. ]){0,1}(\d){3}$/g)) {
            return true;
        }

        return false;

    },
    errorMessage : '',
    errorMessageKey: 'badBrazilCEPAnswer'

});
