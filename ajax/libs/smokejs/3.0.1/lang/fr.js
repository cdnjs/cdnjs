(function($){
  $.fn.smkValidate.Languaje = {
    // Message d'erreur pour un champ vide
    textEmpty        : 'Ce champs est requis',
    // Message d'erreur pour un champ email
    textEmail        : 'Veuillez saisir un email valide',
    // Message d'erreur alphanumérique
    textAlphanumeric : 'Seulement des chiffres et/ou des lettres',
    // Message d'erreur pour un champ numérique
    textNumber       : 'Seul les chiffres sont authorisés',
    // Message d'erreur pour un rang
    textNumberRange  : 'Le rang doit être supérieur à <b> {@} </b> ou inférieur à <b> {@} </b>',
    // Message d'erreur pour un champ décimale
    textDecimal      : 'Seulement des décimales',
    // Message d'erreur pour un champ monaie
    textCurrency     : 'Veuillez entrer une valeur de devise correct',
    // Message d'erreur pour un champ select
    textSelect       : 'Il est nécessaire de selectionner une option',
    // Message d'erreur pour un champ checkbox
    textCheckbox     : 'Il est nécessaire de chocher une option',
    // Message d'information pour la longeur d'une chaîne
    textLength       : 'Le nombre de caractère est égale a <b> {@} </b>',
    // Message d'erreur pour un rang
    textRange        : 'Le nombre de caractère doit être supérieur à <b> {@} </b> ou inférieur à <b> {@} </b>',
    // Message d'erreur pour un mot de passe faible
    textSPassDefault : 'Minimum 4 caratères',
    // Message d'erreur pour un mot de passe faible
    textSPassWeak    : 'Minimum 6 caractères',
    // Message d'erreur pour un mot de passe moyen
    textSPassMedium  : 'Minimum 6 caractères et un numéro',
    // Message d'erreur pour un mot de passe complexe
    textSPassStrong  : 'Minimum 6 caractères, un numéro et une majuscule'
  };

  $.smkEqualPass.Languaje = {
    // Message d'erreur un mot de passe ne correspondant pas
    textEqualPass    : 'Les mots de passe ne correspondent pas'
  };

  $.smkDate.Languaje = {
    shortMonthNames : ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"],
    monthNames : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  };

}(jQuery));
