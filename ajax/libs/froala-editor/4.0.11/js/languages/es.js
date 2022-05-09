/*!
 * froala_editor v4.0.11 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2022 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * Spanish
   */
  FE.LANGUAGE['es'] = {
    translation: {
      // Place holder
      'Type something': 'Escriba algo',
      // Missing translations
      'More Text': 'Más texto',
      'Text Color': 'Color de texto',
      'Background Color': 'Color de fondo',
      'Inline Class': 'Clase en línea',
      'Default': 'Defecto',
      'Lower Alpha': 'Alpha inferiores',
      'Lower Greek': 'Griegas inferiores',
      'Lower Roman': 'Romanas inferiores',
      'Upper Alpha': 'Alpha superiores',
      'Upper Roman': 'Romanas superiores',
      'Circle': 'Circulo',
      'Disc': 'Dto',
      'Square': 'Cuadrado',
      'Single': 'Soltero',
      'Double': 'Doble',
      'More Rich': 'Más Rico',
      'More Misc': 'Más Diverso',
      'Download PDF': 'Descargar PDF',
      // Basic formatting
      'Bold': 'Negrita',
      'Italic': "It\xE1lica",
      'Underline': 'Subrayado',
      'Strikethrough': 'Tachado',
      // Main buttons
      'Insert': 'Insertar',
      'Delete': 'Borrar',
      'Cancel': 'Cancelar',
      'OK': 'Ok',
      'Back': "Atr\xE1s",
      'Remove': 'Quitar',
      'More': "M\xE1s",
      'Update': "Actualizaci\xF3n",
      'Style': 'Estilo',
      // Font
      'Font Family': 'Familia de fuentes',
      'Font Size': "Tama\xF1o de fuente",
      // Colors
      'Colors': 'Colores',
      'Background': 'Fondo',
      'Text': 'Texto',
      'HEX Color': 'Color hexadecimal',
      // Paragraphs
      'Paragraph Format': "Formato de p\xE1rrafo",
      'Normal': 'Normal',
      'Code': "C\xF3digo",
      'Heading 1': 'Encabezado 1',
      'Heading 2': 'Encabezado 2',
      'Heading 3': 'Encabezado 3',
      'Heading 4': 'Encabezado 4',
      'Line Height': 'Interlineado',
      // Style
      'Paragraph Style': "Estilo de p\xE1rrafo",
      'Inline Style': "Estilo en l\xEDnea",
      // Alignment
      'Align': 'Alinear',
      'Align Left': 'Alinear a la izquierda',
      'Align Center': 'Alinear al centro',
      'Align Right': 'Alinear a la derecha',
      'Align Justify': 'Justificar',
      'None': 'Ninguno',
      // Lists
      'Ordered List': 'Lista ordenada',
      'Unordered List': 'Lista desordenada',
      // Indent
      'Decrease Indent': "Reducir sangr\xEDa",
      'Increase Indent': "Aumentar sangr\xEDa",
      // Links
      'Insert Link': 'Insertar enlace',
      'Open in new tab': "Abrir en una nueva pesta\xF1a",
      'Open Link': 'Abrir enlace',
      'Edit Link': 'Editar enlace',
      'Unlink': 'Quitar enlace',
      'Choose Link': 'Elegir enlace',
      // Images
      'Insert Image': 'Insertar imagen',
      'Upload Image': 'Cargar imagen',
      'By URL': 'Por URL',
      'Browse': 'Examinar',
      'Drop image': 'Soltar la imagen',
      'or click': 'o haga clic en',
      'Manage Images': "Administrar im\xE1genes",
      'Loading': 'Cargando',
      'Deleting': 'Borrado',
      'Tags': 'Etiquetas',
      'Are you sure? Image will be deleted.': "\xBFEst\xE1 seguro? La imagen ser\xE1 borrada.",
      'Replace': 'Reemplazar',
      'Uploading': 'Carga',
      'Loading image': 'Cargando imagen',
      'Display': 'Mostrar',
      'Inline': "En l\xEDnea",
      'Break Text': 'Romper texto',
      'Alternative Text': 'Texto alternativo',
      'Change Size': "Cambiar tama\xF1o",
      'Width': 'Ancho',
      'Height': 'Altura',
      'Something went wrong. Please try again.': "Algo sali\xF3 mal. Por favor, vuelva a intentarlo.",
      'Image Caption': 'Captura de imagen',
      'Advanced Edit': 'Edición avanzada',
      // Video
      'Insert Video': 'Insertar video',
      'Embedded Code': "C\xF3digo incrustado",
      'Paste in a video URL': 'Pegar en una URL de video',
      'Drop video': 'Soltar video',
      'Your browser does not support HTML5 video.': 'Su navegador no es compatible con video html5.',
      'Upload Video': 'Subir video',
      // Tables
      'Insert Table': 'Insertar tabla',
      'Table Header': 'Encabezado de la tabla',
      'Remove Table': 'Retire la tabla',
      'Table Style': 'Estilo de tabla',
      'Horizontal Align': 'Alinear horizontal',
      'Row': 'Fila',
      'Insert row above': 'Insertar fila antes',
      'Insert row below': "Insertar fila despu\xE9s",
      'Delete row': 'Eliminar fila',
      'Column': 'Columna',
      'Insert column before': 'Insertar columna antes',
      'Insert column after': "Insertar columna despu\xE9s",
      'Delete column': 'Eliminar columna',
      'Cell': 'Celda',
      'Merge cells': 'Combinar celdas',
      'Horizontal split': "Divisi\xF3n horizontal",
      'Vertical split': "Divisi\xF3n vertical",
      'Cell Background': 'Fondo de la celda',
      'Vertical Align': 'Alinear vertical',
      'Top': 'Cima',
      'Middle': 'Medio',
      'Bottom': 'Del fondo',
      'Align Top': 'Alinear a la parte superior',
      'Align Middle': 'Alinear media',
      'Align Bottom': 'Alinear abajo',
      'Cell Style': 'Estilo de celda',
      // Files
      'Upload File': 'Subir archivo',
      'Drop file': 'Soltar archivo',
      // Emoticons
      'Emoticons': 'Emoticonos',
      'Grinning face': 'Cara sonriendo',
      'Grinning face with smiling eyes': 'Cara sonriendo con ojos sonrientes',
      'Face with tears of joy': "Cara con l\xE1grimas de alegr\xEDa",
      'Smiling face with open mouth': 'Cara sonriente con la boca abierta',
      'Smiling face with open mouth and smiling eyes': 'Cara sonriente con la boca abierta y los ojos sonrientes',
      'Smiling face with open mouth and cold sweat': "Cara sonriente con la boca abierta y el sudor fr\xEDo",
      'Smiling face with open mouth and tightly-closed eyes': 'Cara sonriente con la boca abierta y los ojos fuertemente cerrados',
      'Smiling face with halo': 'Cara sonriente con halo',
      'Smiling face with horns': 'Cara sonriente con cuernos',
      'Winking face': "Gui\xF1o de la cara",
      'Smiling face with smiling eyes': 'Cara sonriente con ojos sonrientes',
      'Face savoring delicious food': 'Cara de saborear una deliciosa comida',
      'Relieved face': 'Cara Aliviado',
      'Smiling face with heart-shaped eyes': "Cara sonriente con los ojos en forma de coraz\xF3n",
      'Smiling face with sunglasses': 'Cara sonriente con gafas de sol',
      'Smirking face': 'Sonriendo cara',
      'Neutral face': 'Cara neutral',
      'Expressionless face': 'Rostro inexpresivo',
      'Unamused face': 'Cara aburrida',
      'Face with cold sweat': "Cara con sudor fr\xEDo",
      'Pensive face': 'Rostro pensativo',
      'Confused face': 'Cara confusa',
      'Confounded face': 'Cara aturdida',
      'Kissing face': 'Cara besando',
      'Face throwing a kiss': 'Cara lanzando un beso',
      'Kissing face with smiling eyes': 'Cara besando con ojos sonrientes',
      'Kissing face with closed eyes': 'Cara besando con los ojos cerrados',
      'Face with stuck out tongue': 'Cara con la lengua pegada',
      'Face with stuck out tongue and winking eye': 'Cara con la lengua pegada y el ojo parpadeante',
      'Face with stuck out tongue and tightly-closed eyes': 'Cara con la lengua pegada y los ojos fuertemente cerrados',
      'Disappointed face': 'Cara de decepcionado',
      'Worried face': "Cara de preocupaci\xF3n",
      'Angry face': 'Cara enojada',
      'Pouting face': 'Que pone mala cara',
      'Crying face': 'Cara llorando',
      'Persevering face': 'Cara de perseverancia',
      'Face with look of triumph': "Cara con expresi\xF3n de triunfo",
      'Disappointed but relieved face': 'Decepcionado pero el rostro aliviado',
      'Frowning face with open mouth': "Cara con la boca abierta con el ce\xF1o fruncido",
      'Anguished face': 'Rostro angustiado',
      'Fearful face': 'Cara temerosa',
      'Weary face': 'Rostro cansado',
      'Sleepy face': 'Rostro somnoliento',
      'Tired face': 'Rostro cansado',
      'Grimacing face': 'Cara haciendo una mueca',
      'Loudly crying face': 'Cara llorando en voz alta',
      'Face with open mouth': 'Cara con la boca abierta',
      'Hushed face': 'Cara callada',
      'Face with open mouth and cold sweat': 'Cara con la boca abierta y el sudor frío',
      'Face screaming in fear': 'Cara gritando de miedo',
      'Astonished face': 'Cara asombrosa',
      'Flushed face': 'Cara enrojecida',
      'Sleeping face': 'Rostro dormido',
      'Dizzy face': 'Cara mareada',
      'Face without mouth': 'Cara sin boca',
      'Face with medical mask': "Cara con la m\xE1scara m\xE9dica",
      // Line breaker
      'Break': 'Romper',
      // Math
      'Subscript': "Sub\xEDndice",
      'Superscript': "Super\xEDndice",
      // Full screen
      'Fullscreen': 'Pantalla completa',
      // Horizontal line
      'Insert Horizontal Line': "Insertar l\xEDnea horizontal",
      // Clear formatting
      'Clear Formatting': 'Quitar el formato',
      // Undo, redo
      'Undo': 'Deshacer',
      'Redo': 'Rehacer',
      // Select all
      'Select All': 'Seleccionar todo',
      // Code view
      'Code View': "Vista de c\xF3digo",
      // Quote
      'Quote': 'Cita',
      'Increase': 'Aumentar',
      'Decrease': "Disminuci\xF3n",
      // Quick Insert
      'Quick Insert': "Inserci\xF3n r\xE1pida",
      // Spcial Characters
      'Special Characters': 'Caracteres especiales',
      'Latin': 'Latín',
      'Greek': 'Griego',
      'Cyrillic': 'Cirílico',
      'Punctuation': 'Puntuación',
      'Currency': 'Moneda',
      'Arrows': 'Flechas',
      'Math': 'Mates',
      'Misc': 'Misc',
      // Print.
      'Print': 'Impresión',
      // Spell Checker.
      'Spell Checker': 'Corrector ortográfico',
      // Help
      'Help': 'Ayuda',
      'Shortcuts': 'Atajos',
      'Inline Editor': 'Editor en línea',
      'Show the editor': 'Mostrar al editor',
      'Common actions': 'Acciones comunes',
      'Copy': 'Copiar',
      'Cut': 'Cortar',
      'Paste': 'Pegar',
      'Basic Formatting': 'Formato básico',
      'Increase quote level': 'Aumentar el nivel de cotización',
      'Decrease quote level': 'Disminuir el nivel de cotización',
      'Image / Video': 'Imagen / video',
      'Resize larger': 'Redimensionar más grande',
      'Resize smaller': 'Redimensionar más pequeño',
      'Table': 'Mesa',
      'Select table cell': 'Celda de tabla select',
      'Extend selection one cell': 'Ampliar la selección una celda',
      'Extend selection one row': 'Ampliar la selección una fila',
      'Navigation': 'Navegación',
      'Focus popup / toolbar': 'Focus popup / toolbar',
      'Return focus to previous position': 'Volver al foco a la posición anterior',
      // Embed.ly
      'Embed URL': 'URL de inserción',
      'Paste in a URL to embed': 'Pegar en una url para incrustar',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'El contenido pegado viene de un documento de Microsoft Word. ¿Quieres mantener el formato o limpiarlo?',
      'Keep': 'Guardar',
      'Clean': 'Limpiar',
      'Word Paste Detected': 'Palabra detectada'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=es.js.map
