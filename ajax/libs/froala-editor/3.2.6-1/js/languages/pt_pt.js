/*!
 * froala_editor v3.2.6-1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2021 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * Portuguese spoken in Portugal
   */
  FE.LANGUAGE['pt_pt'] = {
    translation: {
      // Place holder
      'Type something': 'Digite algo',
      // Missing translations
      'Text Color': 'Cor do texto',
      'Background Color': 'Cor de fundo',
      'Inline Class': 'Classe Inline',
      'Default': 'Padrão',
      'Lower Alpha': 'Alfa minúsculo',
      'Lower Greek': 'Grego minúsculo',
      'Lower Roman': 'Roman minúsculo',
      'Upper Alpha': 'Alfa maiúsculo',
      'Upper Roman': 'Roman maiúscula',
      'Circle': 'Círculo',
      'Disc': 'Disco',
      'Square': 'Quadrado',
      'Single': 'Único',
      'Double': 'Duplo',
      'Insert Files': 'Inserir arquivos',
      'Download PDF': 'Baixar PDF',
      // Basic formatting
      'Bold': 'Negrito',
      'Italic': "It\xE1lico",
      'Underline': 'Sublinhado',
      'Strikethrough': 'Rasurado',
      // Main buttons
      'Insert': 'Inserir',
      'Delete': 'Apagar',
      'Cancel': 'Cancelar',
      'OK': 'Ok',
      'Back': 'Voltar',
      'Remove': 'Remover',
      'More': 'Mais',
      'Update': 'Atualizar',
      'Style': 'Estilo',
      // Font
      'Font Family': 'Fonte',
      'Font Size': 'Tamanho da fonte',
      // Colors
      'Colors': 'Cores',
      'Background': 'Fundo',
      'Text': 'Texto',
      'HEX Color': 'Cor hexadecimal',
      // Paragraphs
      'Paragraph Format': 'Formatos',
      'Normal': 'Normal',
      'Code': "C\xF3digo",
      'Heading 1': "Cabe\xE7alho 1",
      'Heading 2': "Cabe\xE7alho 2",
      'Heading 3': "Cabe\xE7alho 3",
      'Heading 4': "Cabe\xE7alho 4",
      // Style
      'Paragraph Style': "Estilo de par\xE1grafo",
      'Inline Style': 'Estilo embutido',
      // Alignment
      'Align': 'Alinhar',
      'Align Left': "Alinhar \xE0 esquerda",
      'Align Center': 'Alinhar ao centro',
      'Align Right': "Alinhar \xE0 direita",
      'Align Justify': 'Justificado',
      'None': 'Nenhum',
      // Lists
      'Ordered List': 'Lista ordenada',
      'Unordered List': "Lista n\xE3o ordenada",
      // Indent
      'Decrease Indent': "Diminuir avan\xE7o",
      'Increase Indent': "Aumentar avan\xE7o",
      // Links
      'Insert Link': 'Inserir link',
      'Open in new tab': 'Abrir em uma nova aba',
      'Open Link': 'Abrir link',
      'Edit Link': 'Editar link',
      'Unlink': 'Remover link',
      'Choose Link': 'Escolha o link',
      // Images
      'Insert Image': 'Inserir imagem',
      'Upload Image': 'Carregar imagem',
      'By URL': 'Por URL',
      'Browse': 'Procurar',
      'Drop image': 'Largue imagem',
      'or click': 'ou clique em',
      'Manage Images': 'Gerenciar as imagens',
      'Loading': 'Carregando',
      'Deleting': 'Excluindo',
      'Tags': 'Etiquetas',
      'Are you sure? Image will be deleted.': "Voc\xEA tem certeza? Imagem ser\xE1 apagada.",
      'Replace': 'Substituir',
      'Uploading': 'Carregando',
      'Loading image': 'Carregando imagem',
      'Display': 'Exibir',
      'Inline': 'Em linha',
      'Break Text': 'Texto de quebra',
      'Alternative Text': 'Texto alternativo',
      'Change Size': 'Alterar tamanho',
      'Width': 'Largura',
      'Height': 'Altura',
      'Something went wrong. Please try again.': 'Algo deu errado. Por favor, tente novamente.',
      'Image Caption': 'Legenda da imagem',
      'Advanced Edit': 'Edição avançada',
      // Video
      'Insert Video': "Inserir v\xEDdeo",
      'Embedded Code': "C\xF3digo embutido",
      'Paste in a video URL': 'Colar em um URL de vídeo',
      'Drop video': 'Solte o video',
      'Your browser does not support HTML5 video.': 'Seu navegador não suporta o vídeo html5.',
      'Upload Video': 'Envio vídeo',
      // Tables
      'Insert Table': 'Inserir tabela',
      'Table Header': "Cabe\xE7alho da tabela",
      'Remove Table': 'Remover tabela',
      'Table Style': 'estilo de tabela',
      'Horizontal Align': 'Alinhamento horizontal',
      'Row': 'Linha',
      'Insert row above': 'Inserir linha antes',
      'Insert row below': 'Inserir linha depois',
      'Delete row': 'Eliminar linha',
      'Column': 'Coluna',
      'Insert column before': 'Inserir coluna antes',
      'Insert column after': 'Inserir coluna depois',
      'Delete column': 'Eliminar coluna',
      'Cell': "C\xE9lula",
      'Merge cells': "Unir c\xE9lulas",
      'Horizontal split': "Divis\xE3o horizontal",
      'Vertical split': "Divis\xE3o vertical",
      'Cell Background': "Fundo da c\xE9lula",
      'Vertical Align': 'Alinhar vertical',
      'Top': 'Topo',
      'Middle': 'Meio',
      'Bottom': 'Fundo',
      'Align Top': 'Alinhar topo',
      'Align Middle': 'Alinhar meio',
      'Align Bottom': 'Alinhar fundo',
      'Cell Style': "Estilo de c\xE9lula",
      // Files
      'Upload File': 'Upload de arquivo',
      'Drop file': 'Largar arquivo',
      // Emoticons
      'Emoticons': 'Emoticons',
      'Grinning face': 'Sorrindo a cara',
      'Grinning face with smiling eyes': 'Sorrindo rosto com olhos sorridentes',
      'Face with tears of joy': "Rosto com l\xE1grimas de alegria",
      'Smiling face with open mouth': 'Rosto de sorriso com a boca aberta',
      'Smiling face with open mouth and smiling eyes': 'Rosto de sorriso com a boca aberta e olhos sorridentes',
      'Smiling face with open mouth and cold sweat': 'Rosto de sorriso com a boca aberta e suor frio',
      'Smiling face with open mouth and tightly-closed eyes': 'Rosto de sorriso com a boca aberta e os olhos bem fechados',
      'Smiling face with halo': 'Rosto de sorriso com halo',
      'Smiling face with horns': 'Rosto de sorriso com chifres',
      'Winking face': 'Pisc a rosto',
      'Smiling face with smiling eyes': 'Rosto de sorriso com olhos sorridentes',
      'Face savoring delicious food': 'Rosto saboreando uma deliciosa comida',
      'Relieved face': 'Rosto aliviado',
      'Smiling face with heart-shaped eyes': "Rosto de sorriso com os olhos em forma de cora\xE7\xE3o",
      'Smiling face with sunglasses': "Rosto de sorriso com \xF3culos de sol",
      'Smirking face': 'Rosto sorridente',
      'Neutral face': 'Rosto neutra',
      'Expressionless face': 'Rosto inexpressivo',
      'Unamused face': "O rosto n\xE3o divertido",
      'Face with cold sweat': 'Rosto com suor frio',
      'Pensive face': 'O rosto pensativo',
      'Confused face': 'Cara confusa',
      'Confounded face': "Rosto at\xF4nito",
      'Kissing face': 'Beijar Rosto',
      'Face throwing a kiss': 'Rosto jogando um beijo',
      'Kissing face with smiling eyes': 'Beijar rosto com olhos sorridentes',
      'Kissing face with closed eyes': 'Beijando a cara com os olhos fechados',
      'Face with stuck out tongue': "Preso de cara com a l\xEDngua para fora",
      'Face with stuck out tongue and winking eye': "Rosto com estendeu a l\xEDngua e olho piscando",
      'Face with stuck out tongue and tightly-closed eyes': 'Rosto com estendeu a língua e os olhos bem fechados',
      'Disappointed face': 'Rosto decepcionado',
      'Worried face': 'O rosto preocupado',
      'Angry face': 'Rosto irritado',
      'Pouting face': 'Beicinho Rosto',
      'Crying face': 'Cara de choro',
      'Persevering face': 'Perseverar Rosto',
      'Face with look of triumph': 'Rosto com olhar de triunfo',
      'Disappointed but relieved face': 'Fiquei Desapontado mas aliviado Rosto',
      'Frowning face with open mouth': 'Sobrancelhas franzidas rosto com a boca aberta',
      'Anguished face': 'O rosto angustiado',
      'Fearful face': 'Cara com medo',
      'Weary face': 'Rosto cansado',
      'Sleepy face': 'Cara de sono',
      'Tired face': 'Rosto cansado',
      'Grimacing face': 'Fazendo caretas face',
      'Loudly crying face': 'Alto chorando rosto',
      'Face with open mouth': 'Enfrentar com a boca aberta',
      'Hushed face': 'Flagrantes de rosto',
      'Face with open mouth and cold sweat': 'Enfrentar com a boca aberta e suor frio',
      'Face screaming in fear': 'Cara gritando de medo',
      'Astonished face': 'Cara de surpresa',
      'Flushed face': 'Rosto vermelho',
      'Sleeping face': 'O rosto de sono',
      'Dizzy face': 'Cara tonto',
      'Face without mouth': 'Rosto sem boca',
      'Face with medical mask': "Rosto com m\xE1scara m\xE9dica",
      // Line breaker
      'Break': 'Partir',
      // Math
      'Subscript': 'Subscrito',
      'Superscript': 'Sobrescrito',
      // Full screen
      'Fullscreen': 'Tela cheia',
      // Horizontal line
      'Insert Horizontal Line': 'Inserir linha horizontal',
      // Clear formatting
      'Clear Formatting': "Remover formata\xE7\xE3o",
      // Save
      'Save': "Salve",
      // Undo, redo
      'Undo': 'Anular',
      'Redo': 'Restaurar',
      // Select all
      'Select All': 'Seleccionar tudo',
      // Code view
      'Code View': "Exibi\xE7\xE3o de c\xF3digo",
      // Quote
      'Quote': "Cita\xE7\xE3o",
      'Increase': 'Aumentar',
      'Decrease': 'Diminuir',
      // Quick Insert
      'Quick Insert': "Inser\xE7\xE3o r\xE1pida",
      // Spcial Characters
      'Special Characters': 'Caracteres especiais',
      'Latin': 'Latino',
      'Greek': 'Grego',
      'Cyrillic': 'Cirílico',
      'Punctuation': 'Pontuação',
      'Currency': 'Moeda',
      'Arrows': 'Setas; flechas',
      'Math': 'Matemática',
      'Misc': 'Misc',
      // Print.
      'Print': 'Impressão',
      // Spell Checker.
      'Spell Checker': 'Verificador ortográfico',
      // Help
      'Help': 'Socorro',
      'Shortcuts': 'Atalhos',
      'Inline Editor': 'Editor em linha',
      'Show the editor': 'Mostre o editor',
      'Common actions': 'Ações comuns',
      'Copy': 'Cópia de',
      'Cut': 'Cortar',
      'Paste': 'Colar',
      'Basic Formatting': 'Formatação básica',
      'Increase quote level': 'Aumentar o nível de cotação',
      'Decrease quote level': 'Diminuir o nível de cotação',
      'Image / Video': 'Imagem / video',
      'Resize larger': 'Redimensionar maior',
      'Resize smaller': 'Redimensionar menor',
      'Table': 'Tabela',
      'Select table cell': 'Selecione a célula da tabela',
      'Extend selection one cell': 'Ampliar a seleção de uma célula',
      'Extend selection one row': 'Ampliar a seleção uma linha',
      'Navigation': 'Navegação',
      'Focus popup / toolbar': 'Foco popup / barra de ferramentas',
      'Return focus to previous position': 'Retornar o foco para a posição anterior',
      // Embed.ly
      'Embed URL': 'URL de inserção',
      'Paste in a URL to embed': 'Colar em url para incorporar',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'O conteúdo colado vem de um documento Microsoft Word. Você quer manter o formato ou limpá-lo?',
      'Keep': 'Guarda',
      'Clean': 'Limpar  limpo',
      'Word Paste Detected': 'Pasta de palavras detectada',
      // Character Counter
      'Characters': 'Caracteres',
      // More Buttons
      'More Text': 'Mais Texto',
      'More Paragraph': 'Mais Parágrafo',
      'More Rich': 'Mais Rico',
      'More Misc': 'Mais  Misc'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=pt_pt.js.map
