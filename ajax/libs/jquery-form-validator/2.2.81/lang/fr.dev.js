/**
 * jQuery Form Validator
 * ------------------------------------------
 *
 * French language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 * @version 2.2.81
 */
(function($, window) {

  "use strict";

  $(window).bind('validatorsLoaded', function() {

    $.formUtils.LANG = {
      errorTitle:"Le formulaire n'a pas pu être envoyé!",
      requiredFields:"Vous n'avez pas saisi tous les champs",
      badTime:"Vous n'avez pas saisi l'heure correctement",
      badEmail:"Vous n'avez pas saisi une adresse e-mail valide",
      badTelephone:"Vous n'avez pas saisi un numéro de téléphone valide",
      badSecurityAnswer:"Vous avez saisi une mauvaise réponse à la question de la sécurité",
      badDate:"Vous n'avez pas saisi une date correcte",
      lengthBadStart:"Votre saisie doit comporter entre",
      lengthBadEnd:" caractères",
      lengthTooLongStart:"Vous avez saisi une réponse qui est plus longue que",
      lengthTooShortStart:"Votre saisie est plus courte que",
      notConfirmed:"Les saisies ne sont pas identiques",
      badDomain:"Vous avez saisi un domaine incorrect",
      badUrl:"Vous avez saisi une URL incorrecte",
      badCustomVal:"Re-saisissez une réponse correcte",
      andSpaces:" et des espaces",
      badInt:"Vous n'avez pas saisi un numéro",
      badSecurityNumber:"Vous avez saisi un mauvais numéro de sécurité sociale",
      badUKVatAnswer:"Vous n'avez pas saisi un numéro de TVA au Royaume-Uni",
      badStrength:"Vous avez saisi un mot de passe pas assez sécurisé",
      badNumberOfSelectedOptionsStart:"Vous devez sélectionner au moins",
      badNumberOfSelectedOptionsEnd:" réponse",
      badAlphaNumeric:"Vous ne pouvez répondre qu'avec des caractères alphanumériques et des chiffres",
      badAlphaNumericExtra:" et",
      wrongFileSize:"Le fichier que vous essayez de télécharger est trop grand (max %s)",
      wrongFileType:"Seuls les fichiers de type %s sont autorisés",
      groupCheckedRangeStart:"Choisissez entre",
      groupCheckedTooFewStart:"Ensuite, vous devez faire au moins",
      groupCheckedTooManyStart:"Vous ne pouvez pas faire plus de",
      groupCheckedEnd:" sélection",
      badCreditCard:"Vous avez saisi un numéro de carte de crédit invalide",
      badCVV:"Vous avez saisi un CVV incorrecte",
      wrongFileDim:"Mauvaise taille de l'image,",
      imageTooTall:"l'image ne peut pas être plus élevée que",
      imageTooWide:"l'image ne peut pas être plus large que",
      imageTooSmall:"l'image est trop petite",
      min:"moins",
      max:"max",
      imageRatioNotAccepted:"Ratio de l'image non accepté"
    };

  });

})(jQuery, window);


