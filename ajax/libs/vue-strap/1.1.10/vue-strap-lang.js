(function(){
  window.VueStrapLang = function(lang){
    lang = lang || 'en';
    var l = {

en: {
  daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  limit: 'Limit reached ({{limit}} items max).',
  loading: 'Loading...',
  minLength: 'Min. Length',
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  notSelected: 'Nothing Selected',
  required: 'Required',
  search: 'Search'
},

es: {
  daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  loading: 'Cargando...',
  minLength: 'Tamaño Mínimo',
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  notSelected: 'Nada seleccionado',
  required: 'Requerido',
  search: 'Buscar',
  limit: 'Limite alcanzado (máximo {{limit}} items).',
},

'pt-BR': {
  daysOfWeek: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa'],
  limit: 'Limite atingido (máximo {{limit}} items).',
  loading: 'Cargando...',
  minLength: 'Tamanho Mínimo',
  months: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  notSelected: 'Nada selecionado',
  required: 'Requerido',
  search: 'Buscar',
},

fr: {
  daysOfWeek: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
  limit: 'Limite atteinte ({{limit}} éléments max).',
  loading: 'Chargement en cours...',
  minLength: 'Longueur Minimum',
  months: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  notSelected: 'Aucune sélection',
  required: 'Requis',
  search: 'Recherche'
}

    };
    var tr = {};
    for (var i in l['en']) {
      tr[i] = l[lang][i] || l['en'][i];
    }
    return tr;
  }
})();
