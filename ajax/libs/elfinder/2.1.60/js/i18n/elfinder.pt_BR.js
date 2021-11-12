/**
 * Português translation
 * @author Leandro Carvalho <contato@leandrowebdev.net>
 * @author Wesley Osorio<wesleyfosorio@hotmail.com>
 * @author Fernando H. Bandeira <fernando.bandeira94@gmail.com>
 * @author Gustavo Brito <britopereiragustavo@gmail.com>
 * @version 2019-10-22
 */
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['elfinder'], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('elfinder'));
	} else {
		factory(root.elFinder);
	}
}(this, function(elFinder) {
	elFinder.prototype.i18.pt_BR = {
		translator : 'Leandro Carvalho &lt;contato@leandrowebdev.net&gt;, Wesley Osorio&lt;wesleyfosorio@hotmail.com&gt;, Fernando H. Bandeira &lt;fernando.bandeira94@gmail.com&gt;, Gustavo Brito &lt;britopereiragustavo@gmail.com&gt;',
		language   : 'Português',
		direction  : 'ltr',
		dateFormat : 'd M Y H:i', // will show like: 22 Out 2019 11:34
		fancyDateFormat : '$1 H:i', // will show like: Hoje 11:34
		nonameDateFormat : 'ymd-His', // noname upload will show like: 191022-113433
		messages   : {

			/********************************** errors **********************************/
			'error'                : 'Erro',
			'errUnknown'           : 'Erro desconhecido.',
			'errUnknownCmd'        : 'Comando desconhecido.',
			'errJqui'              : 'Configuração inválida do JQuery UI. Verifique se os componentes selectable, draggable e droppable estão incluídos.',
			'errNode'              : 'elFinder requer um elemento DOM para ser criado.',
			'errURL'               : 'Configuração inválida do elFinder! Você deve setar a opção da URL.',
			'errAccess'            : 'Acesso negado.',
			'errConnect'           : 'Incapaz de conectar ao backend.',
			'errAbort'             : 'Conexão abortada.',
			'errTimeout'           : 'Tempo de conexão excedido',
			'errNotFound'          : 'Backend não encontrado.',
			'errResponse'          : 'Resposta inválida do backend.',
			'errConf'              : 'Configuração inválida do backend.',
			'errJSON'              : 'Módulo PHP JSON não está instalado.',
			'errNoVolumes'         : 'Não existe nenhum volume legível disponivel.',
			'errCmdParams'         : 'Parâmetro inválido para o comando "$1".',
			'errDataNotJSON'       : 'Dados não estão no formato JSON.',
			'errDataEmpty'         : 'Dados vazios.',
			'errCmdReq'            : 'Requisição do Backend requer nome de comando.',
			'errOpen'              : 'Incapaz de abrir "$1".',
			'errNotFolder'         : 'Objeto não é uma pasta.',
			'errNotFile'           : 'Objeto não é um arquivo.',
			'errRead'              : 'Incapaz de ler "$1".',
			'errWrite'             : 'Incapaz de escrever em "$1".',
			'errPerm'              : 'Permissão negada.',
			'errLocked'            : '"$1" está bloqueado e não pode ser renomeado, movido ou removido.',
			'errExists'            : 'O nome do arquivo "$1" já existe neste local.',
			'errInvName'           : 'Nome do arquivo inválido.',
			'errInvDirname'        : 'Nome da pasta inválida.',  // from v2.1.24 added 12.4.2017
			'errFolderNotFound'    : 'Pasta não encontrada.',
			'errFileNotFound'      : 'Arquivo não encontrado.',
			'errTrgFolderNotFound' : 'Pasta de destino "$1" não encontrada.',
			'errPopup'             : 'O seu navegador está bloqueando popup\'s. Para abrir o arquivo, altere esta opção no seu Navegador.',
			'errMkdir'             : 'Incapaz de criar a pasta "$1".',
			'errMkfile'            : 'Incapaz de criar o arquivo "$1".',
			'errRename'            : 'Incapaz de renomear "$1".',
			'errCopyFrom'          : 'Copia dos arquivos do volume "$1" não permitida.',
			'errCopyTo'            : 'Copia dos arquivos para o volume "$1" não permitida.',
			'errMkOutLink'         : 'Incapaz de criar um link fora da unidade raiz.', // from v2.1 added 03.10.2015
			'errUpload'            : 'Erro no upload.',  // old name - errUploadCommon
			'errUploadFile'        : 'Não foi possível fazer o upload "$1".', // old name - errUpload
			'errUploadNoFiles'     : 'Não foi encontrado nenhum arquivo para upload.',
			'errUploadTotalSize'   : 'Os dados excedem o tamanho máximo permitido.', // old name - errMaxSize
			'errUploadFileSize'    : 'Arquivo excede o tamanho máximo permitido.', //  old name - errFileMaxSize
			'errUploadMime'        : 'Tipo de arquivo não permitido.',
			'errUploadTransfer'    : '"$1" erro na transferência.',
			'errUploadTemp'        : 'Incapaz de criar um arquivo temporário para upload.', // from v2.1 added 26.09.2015
			'errNotReplace'        : 'Objeto "$1" já existe neste local e não pode ser substituído por um objeto com outro tipo.', // new
			'errReplace'           : 'Incapaz de substituir "$1".',
			'errSave'              : 'Incapaz de salvar "$1".',
			'errCopy'              : 'Incapaz de copiar "$1".',
			'errMove'              : 'Incapaz de mover "$1".',
			'errCopyInItself'      : 'Incapaz de copiar "$1" nele mesmo.',
			'errRm'                : 'Incapaz de remover "$1".',
			'errTrash'             : 'Incapaz de deletar.', // from v2.1.24 added 30.4.2017
			'errRmSrc'             : 'Incapaz de remover o(s) arquivo(s) fonte.',
			'errExtract'           : 'Incapaz de extrair os arquivos de "$1".',
			'errArchive'           : 'Incapaz de criar o arquivo.',
			'errArcType'           : 'Tipo de arquivo não suportado.',
			'errNoArchive'         : 'Arquivo inválido ou é de um tipo não suportado.',
			'errCmdNoSupport'      : 'Backend não suporta este comando.',
			'errReplByChild'       : 'A pasta “$1” não pode ser substituída por um item que contém.',
			'errArcSymlinks'       : 'Por razões de segurança, negada a permissão para descompactar arquivos que contenham links ou arquivos com nomes não permitidos.', // edited 24.06.2012
			'errArcMaxSize'        : 'Arquivo excede o tamanho máximo permitido.',
			'errResize'            : 'Incapaz de redimensionar "$1".',
			'errResizeDegree'      : 'Grau de rotação inválido.',  // added 7.3.2013
			'errResizeRotate'      : 'Incapaz de rotacionar a imagem.',  // added 7.3.2013
			'errResizeSize'        : 'Tamanho inválido de imagem.',  // added 7.3.2013
			'errResizeNoChange'    : 'Tamanho da imagem não alterado.',  // added 7.3.2013
			'errUsupportType'      : 'Tipo de arquivo não suportado.',
			'errNotUTF8Content'    : 'Arquivo "$1" não está em UTF-8 e não pode ser editado.',  // added 9.11.2011
			'errNetMount'          : 'Incapaz de montar montagem "$1".', // added 17.04.2012
			'errNetMountNoDriver'  : 'Protocolo não suportado.',     // added 17.04.2012
			'errNetMountFailed'    : 'Montagem falhou.',         // added 17.04.2012
			'errNetMountHostReq'   : 'Servidor requerido.', // added 18.04.2012
			'errSessionExpires'    : 'Sua sessão expirou por inatividade.',
			'errCreatingTempDir'   : 'Não foi possível criar um diretório temporário: "$1"',
			'errFtpDownloadFile'   : 'Não foi possível fazer o download do arquivo do FTP: "$1"',
			'errFtpUploadFile'     : 'Não foi possível fazer o upload do arquivo para o FTP: "$1"',
			'errFtpMkdir'          : 'Não foi possível criar um diretório remoto no FTP: "$1"',
			'errArchiveExec'       : 'Erro ao arquivar os arquivos: "$1"',
			'errExtractExec'       : 'Erro na extração dos arquivos: "$1"',
			'errNetUnMount'        : 'Incapaz de desmontar', // from v2.1 added 30.04.2012
			'errConvUTF8'          : 'Não conversivel para UTF-8', // from v2.1 added 08.04.2014
			'errFolderUpload'      : 'Tente utilizar o Google Chrome, se você deseja enviar uma pasta.', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : 'Tempo limite atingido para a busca "$1". O resultado da pesquisa é parcial.', // from v2.1 added 12.1.2016
			'errReauthRequire'     : 'Re-autorização é necessária.', // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : 'O número máximo de itens selecionáveis ​​é $1.', // from v2.1.17 added 17.10.2016
			'errRestore'           : 'Não foi possível restaurar a partir do lixo. Não é possível identificar o destino da restauração.', // from v2.1.24 added 3.5.2017
			'errEditorNotFound'    : 'Editor não encontrado para este tipo de arquivo.', // from v2.1.25 added 23.5.2017
			'errServerError'       : 'Ocorreu um erro no lado do servidor.', // from v2.1.25 added 16.6.2017
			'errEmpty'             : 'Não foi possível esvaziar a pasta "$1".', // from v2.1.25 added 22.6.2017
			'moreErrors'           : 'Existem mais $1 erros.', // from v2.1.44 added 9.12.2018

			/******************************* commands names ********************************/
			'cmdarchive'   : 'Criar arquivo',
			'cmdback'      : 'Voltar',
			'cmdcopy'      : 'Copiar',
			'cmdcut'       : 'Cortar',
			'cmddownload'  : 'Baixar',
			'cmdduplicate' : 'Duplicar',
			'cmdedit'      : 'Editar arquivo',
			'cmdextract'   : 'Extrair arquivo de ficheiros',
			'cmdforward'   : 'Avançar',
			'cmdgetfile'   : 'Selecionar arquivos',
			'cmdhelp'      : 'Sobre este software',
			'cmdhome'      : 'Home',
			'cmdinfo'      : 'Propriedades',
			'cmdmkdir'     : 'Nova pasta',
			'cmdmkdirin'   : 'Em uma nova pasta', // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : 'Novo arquivo',
			'cmdopen'      : 'Abrir',
			'cmdpaste'     : 'Colar',
			'cmdquicklook' : 'Pré-vizualização',
			'cmdreload'    : 'Recarregar',
			'cmdrename'    : 'Renomear',
			'cmdrm'        : 'Deletar',
			'cmdtrash'     : 'Mover para a lixeira', //from v2.1.24 added 29.4.2017
			'cmdrestore'   : 'Restaurar', //from v2.1.24 added 3.5.2017
			'cmdsearch'    : 'Achar arquivos',
			'cmdup'        : 'Ir para o diretório pai',
			'cmdupload'    : 'Fazer upload de arquivo',
			'cmdview'      : 'Vizualizar',
			'cmdresize'    : 'Redimencionar & Rotacionar',
			'cmdsort'      : 'Ordenar',
			'cmdnetmount'  : 'Montar unidade de rede', // added 18.04.2012
			'cmdnetunmount': 'Desmontar', // from v2.1 added 30.04.2012
			'cmdplaces'    : 'Para locais', // added 28.12.2014
			'cmdchmod'     : 'Alterar permissão', // from v2.1 added 20.6.2015
			'cmdopendir'   : 'Abrir pasta', // from v2.1 added 13.1.2016
			'cmdcolwidth'  : 'Redefinir largura da coluna', // from v2.1.13 added 12.06.2016
			'cmdfullscreen': 'Tela cheia', // from v2.1.15 added 03.08.2016
			'cmdmove'      : 'Mover', // from v2.1.15 added 21.08.2016
			'cmdempty'     : 'Esvaziar a pasta', // from v2.1.25 added 22.06.2017
			'cmdundo'      : 'Desfazer', // from v2.1.27 added 31.07.2017
			'cmdredo'      : 'Refazer', // from v2.1.27 added 31.07.2017
			'cmdpreference': 'Preferências', // from v2.1.27 added 03.08.2017
			'cmdselectall' : 'Selecionar tudo', // from v2.1.28 added 15.08.2017
			'cmdselectnone': 'Selecionar nenhum', // from v2.1.28 added 15.08.2017
			'cmdselectinvert': 'Inverter seleção', // from v2.1.28 added 15.08.2017
			'cmdopennew'   : 'Abrir em nova janela', // from v2.1.38 added 3.4.2018
			'cmdhide'      : 'Ocultar (preferência)', // from v2.1.41 added 24.7.2018

			/*********************************** buttons ***********************************/
			'btnClose'  : 'Fechar',
			'btnSave'   : 'Salvar',
			'btnRm'     : 'Remover',
			'btnApply'  : 'Aplicar',
			'btnCancel' : 'Cancelar',
			'btnNo'     : 'Não',
			'btnYes'    : 'Sim',
			'btnMount'  : 'Montar',  // added 18.04.2012
			'btnApprove': 'Vá para $1 & aprove', // from v2.1 added 26.04.2012
			'btnUnmount': 'Desmontar', // from v2.1 added 30.04.2012
			'btnConv'   : 'Converter', // from v2.1 added 08.04.2014
			'btnCwd'    : 'Aqui',      // from v2.1 added 22.5.2015
			'btnVolume' : 'Volume',    // from v2.1 added 22.5.2015
			'btnAll'    : 'Todos',       // from v2.1 added 22.5.2015
			'btnMime'   : 'Tipo MIME', // from v2.1 added 22.5.2015
			'btnFileName':'Nome do arquivo',  // from v2.1 added 22.5.2015
			'btnSaveClose': 'Salvar & Fechar', // from v2.1 added 12.6.2015
			'btnBackup' : 'Backup', // fromv2.1 added 28.11.2015
			'btnRename'    : 'Renomear',      // from v2.1.24 added 6.4.2017
			'btnRenameAll' : 'Renomear (tudo)', // from v2.1.24 added 6.4.2017
			'btnPrevious' : 'Anterior ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnNext'     : 'Próximo ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnSaveAs'   : 'Salvar como', // from v2.1.25 added 24.5.2017

			/******************************** notifications ********************************/
			'ntfopen'     : 'Abrir pasta',
			'ntffile'     : 'Abrir arquivo',
			'ntfreload'   : 'Recarregar conteudo da pasta',
			'ntfmkdir'    : 'Criar diretório',
			'ntfmkfile'   : 'Criar arquivos',
			'ntfrm'       : 'Deletar arquivos',
			'ntfcopy'     : 'Copiar arquivos',
			'ntfmove'     : 'Mover arquivos',
			'ntfprepare'  : 'Preparando para copiar arquivos',
			'ntfrename'   : 'Renomear arquivos',
			'ntfupload'   : 'Subindo os arquivos',
			'ntfdownload' : 'Baixando os arquivos',
			'ntfsave'     : 'Salvando os arquivos',
			'ntfarchive'  : 'Criando os arquivos',
			'ntfextract'  : 'Extraindo arquivos compactados',
			'ntfsearch'   : 'Procurando arquivos',
			'ntfresize'   : 'Redimensionando imagens',
			'ntfsmth'     : 'Fazendo alguma coisa',
			'ntfloadimg'  : 'Carregando Imagem',
			'ntfnetmount' : 'Montando unidade de rede', // added 18.04.2012
			'ntfnetunmount': 'Desmontando unidade de rede', // from v2.1 added 30.04.2012
			'ntfdim'      : 'Adquirindo dimensão da imagem', // added 20.05.2013
			'ntfreaddir'  : 'Lendo informações da pasta', // from v2.1 added 01.07.2013
			'ntfurl'      : 'Recebendo URL do link', // from v2.1 added 11.03.2014
			'ntfchmod'    : 'Alterando permissões do arquivo', // from v2.1 added 20.6.2015
			'ntfpreupload': 'Verificando o nome do arquivo de upload', // from v2.1 added 31.11.2015
			'ntfzipdl'    : 'Criando um arquivo para download', // from v2.1.7 added 23.1.2016
			'ntfparents'  : 'Obtendo informações do caminho', // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': 'Processando o arquivo carregado', // from v2.1.17 added 2.11.2016
			'ntftrash'    : 'Movendo para a lixeira', // from v2.1.24 added 2.5.2017
			'ntfrestore'  : 'Restaurando da lixeira', // from v2.1.24 added 3.5.2017
			'ntfchkdir'   : 'Verificando a pasta de destino', // from v2.1.24 added 3.5.2017
			'ntfundo'     : 'Desfazendo a operação anterior', // from v2.1.27 added 31.07.2017
			'ntfredo'     : 'Refazendo o desfazer anterior', // from v2.1.27 added 31.07.2017
			'ntfchkcontent' : 'Verificando conteúdos', // from v2.1.41 added 3.8.2018

			/*********************************** volumes *********************************/
			'volume_Trash' : 'Lixo', //from v2.1.24 added 29.4.2017

			/************************************ dates **********************************/
			'dateUnknown' : 'Desconhecido',
			'Today'       : 'Hoje',
			'Yesterday'   : 'Ontem',
			'msJan'       : 'Jan',
			'msFeb'       : 'Fev',
			'msMar'       : 'Mar',
			'msApr'       : 'Abr',
			'msMay'       : 'Mai',
			'msJun'       : 'Jun',
			'msJul'       : 'Jul',
			'msAug'       : 'Ago',
			'msSep'       : 'Set',
			'msOct'       : 'Out',
			'msNov'       : 'Nov',
			'msDec'       : 'Dez',
			'January'     : 'Janeiro',
			'February'    : 'Fevereiro',
			'March'       : 'Março',
			'April'       : 'Abril',
			'May'         : 'Maio',
			'June'        : 'Junho',
			'July'        : 'Julho',
			'August'      : 'Agosto',
			'September'   : 'Setembro',
			'October'     : 'Outubro',
			'November'    : 'Novembro',
			'December'    : 'Dezembro',
			'Sunday'      : 'Domingo',
			'Monday'      : 'Segunda-feira',
			'Tuesday'     : 'Terça-feira',
			'Wednesday'   : 'Quarta-feira',
			'Thursday'    : 'Quinta-feira',
			'Friday'      : 'Sexta-feira',
			'Saturday'    : 'Sábado',
			'Sun'         : 'Dom',
			'Mon'         : 'Seg',
			'Tue'         : 'Ter',
			'Wed'         : 'Qua',
			'Thu'         : 'Qui',
			'Fri'         : 'Sex',
			'Sat'         : 'Sáb',

			/******************************** sort variants ********************************/
			'sortname'          : 'por nome',
			'sortkind'          : 'por tipo',
			'sortsize'          : 'por tam.',
			'sortdate'          : 'por data',
			'sortFoldersFirst'  : 'Pastas primeiro',
			'sortperm'          : 'Com permissão', // from v2.1.13 added 13.06.2016
			'sortmode'          : 'Por modo',       // from v2.1.13 added 13.06.2016
			'sortowner'         : 'Por proprietário',      // from v2.1.13 added 13.06.2016
			'sortgroup'         : 'Por grupo',      // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : 'Vizualizar em árvore',  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'untitled file.txt' : 'NovoArquivo.txt', // added 10.11.2015
			'untitled folder'   : 'NovaPasta',   // added 10.11.2015
			'Archive'           : 'NovoArquivo',  // from v2.1 added 10.11.2015
			'untitled file'     : 'NovoArquivo.$1',  // from v2.1.41 added 6.8.2018
			'extentionfile'     : '$1: Arquivo',    // from v2.1.41 added 6.8.2018
			'extentiontype'     : '$1: $2',      // from v2.1.43 added 17.10.2018

			/********************************** messages **********************************/
			'confirmReq'      : 'Confirmação requerida',
			'confirmRm'       : 'Você tem certeza que deseja remover os arquivos?<br />Isto não pode ser desfeito!',
			'confirmRepl'     : 'Substituir arquivo velho com este novo?',
			'confirmRest'     : 'Substituir o item existente pelo item na lixeira?', // fromv2.1.24 added 5.5.2017
			'confirmConvUTF8' : 'Não está em UTF-8<br/>Converter para UTF-8?<br/>Conteúdo se torna UTF-8 após salvar as conversões.', // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : 'Não foi possível detectar a codificação de caracteres deste arquivo. Ele precisa ser convertido temporariamente em UTF-8 para edição. Por favor, selecione a codificação de caracteres deste arquivo.', // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : 'Isto foi modificado.<br/>Você vai perder seu trabalho caso não salve as mudanças.', // from v2.1 added 15.7.2015
			'confirmTrash'    : 'Tem certeza de que deseja mover itens para a lixeira?', //from v2.1.24 added 29.4.2017
			'confirmMove'     : 'Tem certeza de que deseja mover itens para "$1"?', //from v2.1.50 added 27.7.2019
			'apllyAll'        : 'Aplicar a todos',
			'name'            : 'Nome',
			'size'            : 'Tamanho',
			'perms'           : 'Permissões',
			'modify'          : 'Modificado',
			'kind'            : 'Tipo',
			'read'            : 'Ler',
			'write'           : 'Escrever',
			'noaccess'        : 'Inacessível',
			'and'             : 'e',
			'unknown'         : 'Desconhecido',
			'selectall'       : 'Selecionar todos arquivos',
			'selectfiles'     : 'Selecionar arquivo(s)',
			'selectffile'     : 'Selecionar primeiro arquivo',
			'selectlfile'     : 'Slecionar último arquivo',
			'viewlist'        : 'Exibir como lista',
			'viewicons'       : 'Exibir como ícones',
			'viewSmall'       : 'Ícones pequenos', // from v2.1.39 added 22.5.2018
			'viewMedium'      : 'Ícones médios', // from v2.1.39 added 22.5.2018
			'viewLarge'       : 'Ícones grandes', // from v2.1.39 added 22.5.2018
			'viewExtraLarge'  : 'Ícones gigantes', // from v2.1.39 added 22.5.2018
			'places'          : 'Lugares',
			'calc'            : 'Calcular',
			'path'            : 'Caminho',
			'aliasfor'        : 'Alias para',
			'locked'          : 'Bloqueado',
			'dim'             : 'Dimesões',
			'files'           : 'Arquivos',
			'folders'         : 'Pastas',
			'items'           : 'Itens',
			'yes'             : 'sim',
			'no'              : 'não',
			'link'            : 'Link',
			'searcresult'     : 'Resultados da pesquisa',
			'selected'        : 'itens selecionados',
			'about'           : 'Sobre',
			'shortcuts'       : 'Atalhos',
			'help'            : 'Ajuda',
			'webfm'           : 'Gerenciador de arquivos web',
			'ver'             : 'Versão',
			'protocolver'     : 'Versão do protocolo',
			'homepage'        : 'Home do projeto',
			'docs'            : 'Documentação',
			'github'          : 'Fork us on Github',
			'twitter'         : 'Siga-nos no twitter',
			'facebook'        : 'Junte-se a nós no Facebook',
			'team'            : 'Time',
			'chiefdev'        : 'Desenvolvedor chefe',
			'developer'       : 'Desenvolvedor',
			'contributor'     : 'Contribuinte',
			'maintainer'      : 'Mantenedor',
			'translator'      : 'Tradutor',
			'icons'           : 'Ícones',
			'dontforget'      : 'e não se esqueça de levar a sua toalha',
			'shortcutsof'     : 'Atalhos desabilitados',
			'dropFiles'       : 'Solte os arquivos aqui',
			'or'              : 'ou',
			'selectForUpload' : 'Selecione arquivos para upload',
			'moveFiles'       : 'Mover arquivos',
			'copyFiles'       : 'Copiar arquivos',
			'restoreFiles'    : 'Restaurar itens', // from v2.1.24 added 5.5.2017
			'rmFromPlaces'    : 'Remover de Lugares',
			'aspectRatio'     : 'Manter aspecto',
			'scale'           : 'Tamanho',
			'width'           : 'Largura',
			'height'          : 'Altura',
			'resize'          : 'Redimencionar',
			'crop'            : 'Cortar',
			'rotate'          : 'Rotacionar',
			'rotate-cw'       : 'Girar 90 graus CW',
			'rotate-ccw'      : 'Girar 90 graus CCW',
			'degree'          : '°',
			'netMountDialogTitle' : 'Montar Unidade de rede', // added 18.04.2012
			'protocol'            : 'Protocolo', // added 18.04.2012
			'host'                : 'Servidor', // added 18.04.2012
			'port'                : 'Porta', // added 18.04.2012
			'user'                : 'Usuário', // added 18.04.2012
			'pass'                : 'Senha', // added 18.04.2012
			'confirmUnmount'      : 'Deseja desmontar $1?',  // from v2.1 added 30.04.2012
			'dropFilesBrowser': 'Soltar ou colar arquivos do navegador', // from v2.1 added 30.05.2012
			'dropPasteFiles'  : 'Solte ou cole arquivos aqui', // from v2.1 added 07.04.2014
			'encoding'        : 'Codificação', // from v2.1 added 19.12.2014
			'locale'          : 'Local',   // from v2.1 added 19.12.2014
			'searchTarget'    : 'Alvo: $1',                // from v2.1 added 22.5.2015
			'searchMime'      : 'Perquisar por input MIME Type', // from v2.1 added 22.5.2015
			'owner'           : 'Dono', // from v2.1 added 20.6.2015
			'group'           : 'Grupo', // from v2.1 added 20.6.2015
			'other'           : 'Outro', // from v2.1 added 20.6.2015
			'execute'         : 'Executar', // from v2.1 added 20.6.2015
			'perm'            : 'Permissão', // from v2.1 added 20.6.2015
			'mode'            : 'Modo', // from v2.1 added 20.6.2015
			'emptyFolder'     : 'Pasta vazia', // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : 'Pasta vazia\\A Arraste itens para os adicionar', // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : 'Pasta vazia\\A De um toque longo para adicionar itens', // from v2.1.6 added 30.12.2015
			'quality'         : 'Qualidade', // from v2.1.6 added 5.1.2016
			'autoSync'        : 'Auto sincronização',  // from v2.1.6 added 10.1.2016
			'moveUp'          : 'Mover para cima',  // from v2.1.6 added 18.1.2016
			'getLink'         : 'Obter link', // from v2.1.7 added 9.2.2016
			'selectedItems'   : 'Itens selecionados ($1)', // from v2.1.7 added 2.19.2016
			'folderId'        : 'ID da pasta', // from v2.1.10 added 3.25.2016
			'offlineAccess'   : 'Permitir acesso offline', // from v2.1.10 added 3.25.2016
			'reAuth'          : 'Se autenticar novamente', // from v2.1.10 added 3.25.2016
			'nowLoading'      : 'Carregando...', // from v2.1.12 added 4.26.2016
			'openMulti'       : 'Abrir múltiplos arquivos', // from v2.1.12 added 5.14.2016
			'openMultiConfirm': 'Você está tentando abrir os arquivos $1. Tem certeza de que deseja abrir no navegador?', // from v2.1.12 added 5.14.2016
			'emptySearch'     : 'Os resultados da pesquisa estão vazios no destino da pesquisa.', // from v2.1.12 added 5.16.2016
			'editingFile'     : 'Arquivo sendo editado.', // from v2.1.13 added 6.3.2016
			'hasSelected'     : 'Voce selecionou $1 itens.', // from v2.1.13 added 6.3.2016
			'hasClipboard'    : 'Você tem $1 itens na área de transferência.', // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : 'A pesquisa incremental é apenas da visualização atual.', // from v2.1.13 added 6.30.2016
			'reinstate'       : 'Restabelecer', // from v2.1.15 added 3.8.2016
			'complete'        : '$1 completo', // from v2.1.15 added 21.8.2016
			'contextmenu'     : 'Menu contextual', // from v2.1.15 added 9.9.2016
			'pageTurning'     : 'Virar página', // from v2.1.15 added 10.9.2016
			'volumeRoots'     : 'Raízes de volume', // from v2.1.16 added 16.9.2016
			'reset'           : 'Resetar', // from v2.1.16 added 1.10.2016
			'bgcolor'         : 'Cor de fundo', // from v2.1.16 added 1.10.2016
			'colorPicker'     : 'Seletor de cores', // from v2.1.16 added 1.10.2016
			'8pxgrid'         : 'Grade 8px', // from v2.1.16 added 4.10.2016
			'enabled'         : 'Ativado', // from v2.1.16 added 4.10.2016
			'disabled'        : 'Desativado', // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : 'Os resultados da pesquisa estão vazios na exibição atual.\\APressione [Enter] para expandir o alvo da pesquisa.', // from v2.1.16 added 5.10.2016
			'emptyLetSearch'  : 'Os resultados da pesquisa da primeira letra estão vazios na exibição atual.', // from v2.1.23 added 24.3.2017
			'textLabel'       : 'Texto do rótulo', // from v2.1.17 added 13.10.2016
			'minsLeft'        : '$1 minutos restantes', // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : 'Reabrir com a codificação selecionada', // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : 'Salvar com a codificação selecionada', // from v2.1.19 added 2.12.2016
			'selectFolder'    : 'Selecione a pasta', // from v2.1.20 added 13.12.2016
			'firstLetterSearch': 'Buscar primeira letra', // from v2.1.23 added 24.3.2017
			'presets'         : 'Predefinições', // from v2.1.25 added 26.5.2017
			'tooManyToTrash'  : 'São muitos itens, portanto não podem ser jogados no lixo.', // from v2.1.25 added 9.6.2017
			'TextArea'        : 'TextArea', // from v2.1.25 added 14.6.2017
			'folderToEmpty'   : 'Esvaziar a pasta "$1".', // from v2.1.25 added 22.6.2017
			'filderIsEmpty'   : 'Não há itens em uma pasta "$1".', // from v2.1.25 added 22.6.2017
			'preference'      : 'Preferência', // from v2.1.26 added 28.6.2017
			'language'        : 'Língua', // from v2.1.26 added 28.6.2017
			'clearBrowserData': 'Inicialize as configurações salvas neste navegador', // from v2.1.26 added 28.6.2017
			'toolbarPref'     : 'Barra de ferramentas', // from v2.1.27 added 2.8.2017
			'charsLeft'       : '... $1 caracteres restantes.',  // from v2.1.29 added 30.8.2017
			'sum'             : 'Somar', // from v2.1.29 added 28.9.2017
			'roughFileSize'   : 'Tamanho aproximado do arquivo', // from v2.1.30 added 2.11.2017
			'autoFocusDialog' : 'Focar no elemento do diálogo com o mouse por cima',  // from v2.1.30 added 2.11.2017
			'select'          : 'Selecione', // from v2.1.30 added 23.11.2017
			'selectAction'    : 'Ação ao selecionar arquivo', // from v2.1.30 added 23.11.2017
			'useStoredEditor' : 'Abrir com o editor usado pela última vez', // from v2.1.30 added 23.11.2017
			'selectinvert'    : 'Inverter seleção', // from v2.1.30 added 25.11.2017
			'renameMultiple'  : 'Tem certeza de que deseja renomear $1 itens selecionados como $2?<br/>Isto não poderá ser desfeito!', // from v2.1.31 added 4.12.2017
			'batchRename'     : 'Renomear Batch', // from v2.1.31 added 8.12.2017
			'plusNumber'      : '+ Número', // from v2.1.31 added 8.12.2017
			'asPrefix'        : 'Adicionar prefixo', // from v2.1.31 added 8.12.2017
			'asSuffix'        : 'Adicionar sufixo', // from v2.1.31 added 8.12.2017
			'changeExtention' : 'Alterar extensão', // from v2.1.31 added 8.12.2017
			'columnPref'      : 'Configurações de colunas (exibição em lista)', // from v2.1.32 added 6.2.2018
			'reflectOnImmediate' : 'Todas as alterações serão refletidas imediatamente no arquivo.', // from v2.1.33 added 2.3.2018
			'reflectOnUnmount'   : 'Quaisquer alterações não serão refletidas até desmontar este volume.', // from v2.1.33 added 2.3.2018
			'unmountChildren' : 'O(s) seguinte(s) volume(s) montado neste volume também desmontado. Você tem certeza que quer desmontá-lo(s)?', // from v2.1.33 added 5.3.2018
			'selectionInfo'   : 'Informações da seleção', // from v2.1.33 added 7.3.2018
			'hashChecker'     : 'Algoritmos para mostrar o hash do arquivo', // from v2.1.33 added 10.3.2018
			'infoItems'       : 'Itens de informação (painel Informações de seleção)', // from v2.1.38 added 28.3.2018
			'pressAgainToExit': 'Pressione novamente para sair.', // from v2.1.38 added 1.4.2018
			'toolbar'         : 'Barra de ferramentas', // from v2.1.38 added 4.4.2018
			'workspace'       : 'Área de trabalho', // from v2.1.38 added 4.4.2018
			'dialog'          : 'Diálogo', // from v2.1.38 added 4.4.2018
			'all'             : 'Tudo', // from v2.1.38 added 4.4.2018
			'iconSize'        : 'Tamanho do ícone (Visualização de ícones)', // from v2.1.39 added 7.5.2018
			'editorMaximized' : 'Abra a janela maximizada do editor', // from v2.1.40 added 30.6.2018
			'editorConvNoApi' : 'Como a conversão por API não está disponível no momento, faça a conversão no site.', //from v2.1.40 added 8.7.2018
			'editorConvNeedUpload' : 'Após a conversão, você deve fazer o upload com o URL do item ou um arquivo baixado para salvar o arquivo convertido.', //from v2.1.40 added 8.7.2018
			'convertOn'       : 'Converter no site $1', // from v2.1.40 added 10.7.2018
			'integrations'    : 'Integrações', // from v2.1.40 added 11.7.2018
			'integrationWith' : 'Este elFinder possui os seguintes serviços externos integrados. Por favor, verifique os termos de uso, política de privacidade, etc. antes de usá-lo.', // from v2.1.40 added 11.7.2018
			'showHidden'      : 'Mostrar itens ocultos', // from v2.1.41 added 24.7.2018
			'hideHidden'      : 'Ocultar itens ocultos', // from v2.1.41 added 24.7.2018
			'toggleHidden'    : 'Mostrar/Ocultar itens ocultos', // from v2.1.41 added 24.7.2018
			'makefileTypes'   : 'Tipos de arquivo para ativar com "Novo arquivo"', // from v2.1.41 added 7.8.2018
			'typeOfTextfile'  : 'Tipo do arquivo de texto', // from v2.1.41 added 7.8.2018
			'add'             : 'Adicionar', // from v2.1.41 added 7.8.2018
			'theme'           : 'Tema', // from v2.1.43 added 19.10.2018
			'default'         : 'Padrão', // from v2.1.43 added 19.10.2018
			'description'     : 'Descrição', // from v2.1.43 added 19.10.2018
			'website'         : 'Site da internet', // from v2.1.43 added 19.10.2018
			'author'          : 'Autor', // from v2.1.43 added 19.10.2018
			'email'           : 'Email', // from v2.1.43 added 19.10.2018
			'license'         : 'Licença', // from v2.1.43 added 19.10.2018
			'exportToSave'    : 'Este item não pode ser salvo. Para evitar perder as edições, você precisa exportar para o seu PC.', // from v2.1.44 added 1.12.2018
			'dblclickToSelect': 'Clique duas vezes no arquivo para selecioná-lo.', // from v2.1.47 added 22.1.2019
			'useFullscreen'   : 'Usar o modo de tela cheia', // from v2.1.47 added 19.2.2019

			/********************************** mimetypes **********************************/
			'kindUnknown'     : 'Desconhecio',
			'kindRoot'        : 'Raiz do volume', // from v2.1.16 added 16.10.2016
			'kindFolder'      : 'Pasta',
			'kindSelects'     : 'Seleções', // from v2.1.29 added 29.8.2017
			'kindAlias'       : 'Alias',
			'kindAliasBroken' : 'Alias inválido',
			// applications
			'kindApp'         : 'Aplicação',
			'kindPostscript'  : 'Documento Postscript',
			'kindMsOffice'    : 'Documento Microsoft Office',
			'kindMsWord'      : 'Documento Microsoft Word',
			'kindMsExcel'     : 'Documento Microsoft Excel',
			'kindMsPP'        : 'Apresentação Microsoft Powerpoint',
			'kindOO'          : 'Documento Open Office',
			'kindAppFlash'    : 'Aplicação Flash',
			'kindPDF'         : 'Formato de Documento Portátil (PDF)',
			'kindTorrent'     : 'Arquivo Bittorrent',
			'kind7z'          : 'Arquivo 7z',
			'kindTAR'         : 'Arquivo TAR',
			'kindGZIP'        : 'Arquivo GZIP',
			'kindBZIP'        : 'Arquivo BZIP',
			'kindXZ'          : 'Arquivo XZ',
			'kindZIP'         : 'Arquivo ZIP',
			'kindRAR'         : 'Arquivo RAR',
			'kindJAR'         : 'Arquivo JAR',
			'kindTTF'         : 'Tipo verdadeiro da fonte',
			'kindOTF'         : 'Abrir tipo de fonte',
			'kindRPM'         : 'Pacote RPM',
			// texts
			'kindText'        : 'Arquivo de texto',
			'kindTextPlain'   : 'Texto simples',
			'kindPHP'         : 'PHP',
			'kindCSS'         : 'CSS',
			'kindHTML'        : 'Documento HTML',
			'kindJS'          : 'Javascript',
			'kindRTF'         : 'Formato Rich Text',
			'kindC'           : 'C',
			'kindCHeader'     : 'C cabeçalho',
			'kindCPP'         : 'C++',
			'kindCPPHeader'   : 'C++ cabeçalho',
			'kindShell'       : 'Unix shell script',
			'kindPython'      : 'Python',
			'kindJava'        : 'Java',
			'kindRuby'        : 'Ruby',
			'kindPerl'        : 'Perl',
			'kindSQL'         : 'SQL',
			'kindXML'         : 'Documento XML',
			'kindAWK'         : 'AWK',
			'kindCSV'         : 'Valores separados por vírgula',
			'kindDOCBOOK'     : 'Documento Docbook XML',
			'kindMarkdown'    : 'Texto Markdown', // added 20.7.2015
			// images
			'kindImage'       : 'Imagem',
			'kindBMP'         : 'Imagem BMP',
			'kindJPEG'        : 'Imagem JPEG',
			'kindGIF'         : 'Imagem GIF',
			'kindPNG'         : 'Imagem PNG',
			'kindTIFF'        : 'Imagem TIFF',
			'kindTGA'         : 'Imagem TGA',
			'kindPSD'         : 'Imagem Adobe Photoshop',
			'kindXBITMAP'     : 'Imagem X bitmap',
			'kindPXM'         : 'Imagem Pixelmator',
			// media
			'kindAudio'       : 'Arquivo de audio',
			'kindAudioMPEG'   : 'Audio MPEG',
			'kindAudioMPEG4'  : 'Audio MPEG-4',
			'kindAudioMIDI'   : 'Audio MIDI',
			'kindAudioOGG'    : 'Audio Ogg Vorbis',
			'kindAudioWAV'    : 'Audio WAV',
			'AudioPlaylist'   : 'Lista de reprodução MP3 ',
			'kindVideo'       : 'Arquivo de video',
			'kindVideoDV'     : 'DV filme',
			'kindVideoMPEG'   : 'Video MPEG',
			'kindVideoMPEG4'  : 'Video MPEG-4',
			'kindVideoAVI'    : 'Video AVI',
			'kindVideoMOV'    : 'Filme rápido',
			'kindVideoWM'     : 'Video Windows Media',
			'kindVideoFlash'  : 'Video Flash',
			'kindVideoMKV'    : 'MKV',
			'kindVideoOGG'    : 'Video Ogg'
		}
	};
}));
