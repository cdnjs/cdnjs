/**
 * jQuery Form Validator
 * ------------------------------------------
 *
 * Portuguese language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 * @version 2.2.81
 */
(function($, window) {

  "use strict";

  $(window).bind('validatorsLoaded', function() {

    $.formUtils.LANG = {
      errorTitle: 'O formulário não pode ser enviado!',
      requiredFields: 'Você ainda não preencheu todos os campos obrigatórios',
      badTime: 'A hora digitada não é válida',
      badEmail: 'O e-mail digitado não é válido',
      badTelephone: 'O telefone digitado não é válido',
      badSecurityAnswer: 'A pergunta de segurança não foi respondida corretamente',
      badDate: 'A data digitada não é válida',
      lengthBadStart: 'Sua resposta deve incluir entre ',
      lengthBadEnd: ' caracteres',
      lengthTooLongStart: 'Sua resposta tem mais que ',
      lengthTooShortStart: 'Sua resposta tem menos que',
      notConfirmed: 'As informações digitadas não puderam ser confirmadas',
      badDomain: 'O domínio digitado não é válido',
      badUrl: 'A URL digitada não é válida',
      badCustomVal: 'Os dados digitados não são válidos',
      andSpaces: ' e espaços',
      badInt: 'O número digitado não é válido',
      badSecurityNumber: 'O número de seguro social digitado não é válido',
      badUKVatAnswer: 'O número do VAT digitado não é válido para o Reino Unido',
      badStrength: 'Senha muito fraca',
      badNumberOfSelectedOptionsStart: 'Selecione pelo menos',
      badNumberOfSelectedOptionsEnd: ' alternativa(s)',
      badAlphaNumeric: 'Use somente caracteres alfanuméricos (letras a-z e números)',
      badAlphaNumericExtra: ' e',
      wrongFileSize: 'O arquivo selecionado é maior que o tamanho máximo permitido (%s)',
      wrongFileType: 'Somente arquivos %s são permitidos',
      groupCheckedRangeStart: 'Por favor, escolha entre ',
      groupCheckedTooFewStart: 'Por favor, escolha pelo menos ',
      groupCheckedTooManyStart: 'Por favor, escolhe no máximo ',
      groupCheckedEnd: ' alternativa(s)',
      badCreditCard: 'O número de cartão de crédito digitado não é válido',
      badCVV: 'O código de segurança do cartão de crédito não é válido',
      wrongFileDim: 'As dimensões da imagem não são válidas',
      imageTooTall: 'a imagem não pode ser mais alta que ',
      imageTooWide: 'a imagem não pode ser mais larga que ',
      imageTooSmall: 'a imagem é muito pequena',
      min: 'min',
      max: 'max',
      imageRatioNotAccepted : 'A proporção da imagem (largura x altura) não é válida',
      badBrazilTelephoneAnswer: 'O número de telefone digitado é inválido',
      badBrazilCEPAnswer: 'O CEP digitado é inválido',
      badBrazilCPFAnswer: 'O CPF digitado é inválido'
    };

  });

})(jQuery, window);
