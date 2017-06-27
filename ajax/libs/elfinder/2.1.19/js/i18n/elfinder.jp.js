/**
 * Japanese translation
 * @author Tomoaki Yoshida <info@yoshida-studio.jp>
 * @author Naoki Sawada <hypweb@gmail.com>
 * @version 2016-12-02
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
	elFinder.prototype.i18.jp = {
		translator : 'Tomoaki Yoshida &lt;info@yoshida-studio.jp&gt;, Naoki Sawada &lt;hypweb@gmail.com&gt;',
		language   : 'Japanese',
		direction  : 'ltr',
		dateFormat : 'Y/m/d h:i A', // Mar 13, 2012 05:27 PM
		fancyDateFormat : '$1 h:i A', // will produce smth like: Today 12:25 PM
		messages   : {

			/********************************** errors **********************************/
			'error'                : 'エラー',
			'errUnknown'           : '不明なエラーです',
			'errUnknownCmd'        : '不明なコマンドです',
			'errJqui'              : '無効なjQuery UI コンフィグレーションです。セレクタブルコンポーネント、ドラッガブルコンポーネント、ドロッパブルコンポーネントがあるかを確認して下さい',
			'errNode'              : 'elFinderはDOM Elementが必要です',
			'errURL'               : '無効なelFinder コンフィグレーションです! URLを設定してください',
			'errAccess'            : 'アクセスが拒否されました',
			'errConnect'           : 'バックエンドとの接続ができません',
			'errAbort'             : '接続が中断されました',
			'errTimeout'           : '接続がタイムアウトしました.',
			'errNotFound'          : 'バックエンドが見つかりません',
			'errResponse'          : '無効なバックエンドレスポンスです',
			'errConf'              : 'バックエンドの設定が有効ではありません',
			'errJSON'              : 'PHP JSON モジュールがインストールされていません',
			'errNoVolumes'         : '読み込み可能なボリュームが入手できません',
			'errCmdParams'         : 'コマンド "$1"のパラメーターが無効です',
			'errDataNotJSON'       : 'JSONデータではありません',
			'errDataEmpty'         : '空のデータです',
			'errCmdReq'            : 'バックエンドリクエストがコマンド名を要求しています',
			'errOpen'              : '"$1"を開くことができません',
			'errNotFolder'         : 'オブジェクトがフォルダーではありません',
			'errNotFile'           : 'オブジェクトがファイルではありません',
			'errRead'              : '"$1"を読むことができません',
			'errWrite'             : '"$1"に書きこむことができません',
			'errPerm'              : '権限がありません',
			'errLocked'            : '"$1" はロックされているので名前の変更、移動、削除ができません',
			'errExists'            : '"$1"というファイル名はすでに存在しています',
			'errInvName'           : '無効なファイル名です',
			'errFolderNotFound'    : 'フォルダーが見つかりません',
			'errFileNotFound'      : 'ファイルが見つかりません',
			'errTrgFolderNotFound' : 'ターゲットとするフォルダー "$1" が見つかりません',
			'errPopup'             : 'ポップアップウィンドウが開けません。ファイルを開くにはブラウザの設定を変更してください',
			'errMkdir'             : '"$1"フォルダーを作成することができません',
			'errMkfile'            : '"$1"ファイルを作成することができません',
			'errRename'            : '"$1"の名前を変更することができません',
			'errCopyFrom'          : '"$1"からのファイルコピーが許可されていません',
			'errCopyTo'            : '"$1"へのファイルコピーが許可されていません',
			'errMkOutLink'         : 'ボリュームルート外へのリンクを作成することはできません', // from v2.1 added 03.10.2015
			'errUpload'            : 'アップロードエラー',  // old name - errUploadCommon
			'errUploadFile'        : '"$1"がアップロードできません', // old name - errUpload
			'errUploadNoFiles'     : 'アップロードされたファイルはありません',
			'errUploadTotalSize'   : 'データが許容サイズを超えています', // old name - errMaxSize
			'errUploadFileSize'    : 'ファイルが許容サイズを超えています', //  old name - errFileMaxSize
			'errUploadMime'        : '許可されていないファイル形式です',
			'errUploadTransfer'    : '"$1" 転送エラーです',
			'errUploadTemp'        : 'アップロード用一時ファイルが作成できません', // from v2.1 added 26.09.2015
			'errNotReplace'        : 'アイテム "$1" は、すでにこの場所にありますがアイテムのタイプが違うので置き換えることはできません', // new
			'errReplace'           : '"$1"を置き換えることができません',
			'errSave'              : '"$1"を保存することができません',
			'errCopy'              : '"$1"をコピーすることができません',
			'errMove'              : '"$1"を移動することができません',
			'errCopyInItself'      : '"$1"をそれ自身の中にコピーすることはできません',
			'errRm'                : '"$1"を削除することができません',
			'errRmSrc'             : '元ファイルを削除することができません',
			'errExtract'           : '"$1"を解凍することができません',
			'errArchive'           : 'アーカイブを作成することができません',
			'errArcType'           : 'サポート外のアーカイブ形式です',
			'errNoArchive'         : 'アーカイブでないかサポートされていないアーカイブ形式です',
			'errCmdNoSupport'      : 'サポートされていないコマンドです',
			'errReplByChild'       : 'フォルダ "$1" に含まれてるアイテムを置き換えることはできません',
			'errArcSymlinks'       : 'シンボリックリンクまたは許容されないファイル名を含むアーカイブはセキュリティ上、解凍できません', // edited 24.06.2012
			'errArcMaxSize'        : 'アーカイブが許容されたサイズを超えています',
			'errResize'            : '"$1"をリサイズできません',
			'errResizeDegree'      : 'イメージの回転角度が不正です',  // added 7.3.2013
			'errResizeRotate'      : 'イメージを回転できません',  // added 7.3.2013
			'errResizeSize'        : '指定されたイメージサイズが不正です',  // added 7.3.2013
			'errResizeNoChange'    : 'イメージサイズなどの変更点がありません',  // added 7.3.2013
			'errUsupportType'      : 'このファイルタイプはサポートされません',
			'errNotUTF8Content'    : 'ファイル "$1" には UTF-8 以外の文字が含まれているので編集できません',  // added 9.11.2011
			'errNetMount'          : '"$1"をマウントできません', // added 17.04.2012
			'errNetMountNoDriver'  : 'サポートされていないプロトコルです',     // added 17.04.2012
			'errNetMountFailed'    : 'マウントに失敗しました',         // added 17.04.2012
			'errNetMountHostReq'   : 'ホスト名は必須です', // added 18.04.2012
			'errSessionExpires'    : 'アクションがなかったため、セッションが期限切れになりました',
			'errCreatingTempDir'   : '一時ディレクトリを作成できません："$1"',
			'errFtpDownloadFile'   : 'FTP からファイルをダウンロードできません："$1"',
			'errFtpUploadFile'     : 'FTP へファイルをアップロードできません："$1"',
			'errFtpMkdir'          : 'FTP にリモートディレクトリを作成できません："$1"',
			'errArchiveExec'       : 'ファイルのアーカイブ中にエラーが発生しました："$1"',
			'errExtractExec'       : 'ファイルの抽出中にエラーが発生しました："$1"',
			'errNetUnMount'        : 'アンマウントできません', // from v2.1 added 30.04.2012
			'errConvUTF8'          : 'UTF-8 に変換できませんでした', // from v2.1 added 08.04.2014
			'errFolderUpload'      : 'フォルダをアップロードしたいのであれば、Google Chrome を使用してください', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : '"$1"を検索中にタイムアウトしました。検索結果は部分的です。', // from v2.1 added 12.1.2016
			'errReauthRequire'     : '再認可が必要です', // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : '選択可能な最大アイテム数は $1 個です', // from v2.1.17 added 17.10.2016

			/******************************* commands names ********************************/
			'cmdarchive'   : 'アーカイブ作成',
			'cmdback'      : '戻る',
			'cmdcopy'      : 'コピー',
			'cmdcut'       : 'カット',
			'cmddownload'  : 'ダウンロード',
			'cmdduplicate' : '複製',
			'cmdedit'      : 'ファイル編集',
			'cmdextract'   : 'アーカイブを解凍',
			'cmdforward'   : '進む',
			'cmdgetfile'   : 'ファイル選択',
			'cmdhelp'      : 'このソフトウェアについて',
			'cmdhome'      : 'ホーム',
			'cmdinfo'      : '情報',
			'cmdmkdir'     : '新規フォルダー',
			'cmdmkdirin'   : '新規フォルダーへ', // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : '新規テキストファイル',
			'cmdopen'      : '開く',
			'cmdpaste'     : 'ペースト',
			'cmdquicklook' : 'プレビュー',
			'cmdreload'    : 'リロード',
			'cmdrename'    : 'リネーム',
			'cmdrm'        : '削除',
			'cmdsearch'    : 'ファイルを探す',
			'cmdup'        : '親ディレクトリーへ移動',
			'cmdupload'    : 'ファイルアップロード',
			'cmdview'      : 'ビュー',
			'cmdresize'    : 'リサイズと回転',
			'cmdsort'      : 'ソート',
			'cmdnetmount'  : 'ネットワークボリュームをマウント', // added 18.04.2012
			'cmdnetunmount': 'アンマウント', // from v2.1 added 30.04.2012
			'cmdplaces'    : 'お気に入りへ', // added 28.12.2014
			'cmdchmod'     : '属性変更', // from v2.1 added 20.6.2015
			'cmdopendir'   : 'フォルダを開く', // from v2.1 added 13.1.2016
			'cmdcolwidth'  : '列幅リセット', // from v2.1.13 added 12.06.2016
			'cmdfullscreen': 'フルスクリーン', // from v2.1.15 added 03.08.2016
			'cmdmove'      : '移動', // from v2.1.15 added 21.08.2016
			
			/*********************************** buttons ***********************************/
			'btnClose'  : '閉じる',
			'btnSave'   : '保存',
			'btnRm'     : '削除',
			'btnApply'  : '適用',
			'btnCancel' : 'キャンセル',
			'btnNo'     : 'いいえ',
			'btnYes'    : 'はい',
			'btnMount'  : 'マウント',  // added 18.04.2012
			'btnApprove': '$1へ行き認可する', // from v2.1 added 26.04.2012
			'btnUnmount': 'アンマウント', // from v2.1 added 30.04.2012
			'btnConv'   : '変換', // from v2.1 added 08.04.2014
			'btnCwd'    : 'この場所',      // from v2.1 added 22.5.2015
			'btnVolume' : 'ボリューム',    // from v2.1 added 22.5.2015
			'btnAll'    : '全て',       // from v2.1 added 22.5.2015
			'btnMime'   : 'MIMEタイプ', // from v2.1 added 22.5.2015
			'btnFileName':'ファイル名',  // from v2.1 added 22.5.2015
			'btnSaveClose': '保存して閉じる', // from v2.1 added 12.6.2015
			'btnBackup' : 'バックアップ', // fromv2.1 added 28.11.2015

			/******************************** notifications ********************************/
			'ntfopen'     : 'フォルダーを開いています',
			'ntffile'     : 'ファイルを開いています',
			'ntfreload'   : 'フォルダーを再読込しています',
			'ntfmkdir'    : 'ディレクトリーを作成しています',
			'ntfmkfile'   : 'ファイルを作成しています',
			'ntfrm'       : 'ファイルを削除しています',
			'ntfcopy'     : 'ファイルをコピーしています',
			'ntfmove'     : 'ファイルを移動しています',
			'ntfprepare'  : 'ファイルコピーを準備しています',
			'ntfrename'   : 'ファイル名を変更しています',
			'ntfupload'   : 'ファイルをアップロードしています',
			'ntfdownload' : 'ファイルをダウンロードしています',
			'ntfsave'     : 'ファイルを保存しています',
			'ntfarchive'  : 'アーカイブ作成しています',
			'ntfextract'  : 'アーカイブを解凍しています',
			'ntfsearch'   : 'ファイル検索中',
			'ntfresize'   : 'リサイズしています',
			'ntfsmth'     : '処理をしています',
			'ntfloadimg'  : 'イメージを読み込んでいます',
			'ntfnetmount' : 'ネットボリュームをマウント中', // added 18.04.2012
			'ntfnetunmount': 'ネットボリュームをアンマウント中', // from v2.1 added 30.04.2012
			'ntfdim'      : '画像サイズを取得しています', // added 20.05.2013
			'ntfreaddir'  : 'ホルダ情報を読み取っています', // from v2.1 added 01.07.2013
			'ntfurl'      : 'リンクURLを取得しています', // from v2.1 added 11.03.2014
			'ntfchmod'    : 'ファイル属性を変更しています', // from v2.1 added 20.6.2015
			'ntfpreupload': 'アップロードファイル名を検証中', // from v2.1 added 31.11.2015
			'ntfzipdl'    : 'ダウンロード用ファイルを作成中', // from v2.1.7 added 23.1.2016
			'ntfparents'  : 'パス情報を取得しています', // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': 'アップロード済みファイルを処理中', // from v2.1.17 added 2.11.2016

			/************************************ dates **********************************/
			'dateUnknown' : '不明',
			'Today'       : '今日',
			'Yesterday'   : '昨日',
			'msJan'       : '1月',
			'msFeb'       : '2月',
			'msMar'       : '3月',
			'msApr'       : '4月',
			'msMay'       : '5月',
			'msJun'       : '6月',
			'msJul'       : '7月',
			'msAug'       : '8月',
			'msSep'       : '9月',
			'msOct'       : '10月',
			'msNov'       : '11月',
			'msDec'       : '12月',
			'January'     : '1月',
			'February'    : '2月',
			'March'       : '3月',
			'April'       : '4月',
			'May'         : '5月',
			'June'        : '6月',
			'July'        : '7月',
			'August'      : '8月',
			'September'   : '9月',
			'October'     : '10月',
			'November'    : '11月',
			'December'    : '12月',
			'Sunday'      : '日曜日',
			'Monday'      : '月曜日',
			'Tuesday'     : '火曜日',
			'Wednesday'   : '水曜日',
			'Thursday'    : '木曜日',
			'Friday'      : '金曜日',
			'Saturday'    : '土曜日',
			'Sun'         : '(日)',
			'Mon'         : '(月)',
			'Tue'         : '(火)',
			'Wed'         : '(水)',
			'Thu'         : '(木)',
			'Fri'         : '(金)',
			'Sat'         : '(土)',

			/******************************** sort variants ********************************/
			'sortname'          : '名前順',
			'sortkind'          : '種類順',
			'sortsize'          : 'サイズ順',
			'sortdate'          : '日付順',
			'sortFoldersFirst'  : 'フォルダ優先',
			'sortperm'          : '権限順',      // from v2.1.13 added 13.06.2016
			'sortmode'          : '属性順',      // from v2.1.13 added 13.06.2016
			'sortowner'         : 'オーナー順',  // from v2.1.13 added 13.06.2016
			'sortgroup'         : 'グループ順',  // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : 'ツリービューも',  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'untitled file.txt' : '新規ファイル.txt', // added 10.11.2015
			'untitled folder'   : '新規フォルダ',   // added 10.11.2015
			'Archive'           : '新規アーカイブ',  // from v2.1 added 10.11.2015

			/********************************** messages **********************************/
			'confirmReq'      : '処理を実行しますか？',
			'confirmRm'       : '本当にファイルを削除しますか?<br/>この操作は取り消せません！',
			'confirmRepl'     : '古いファイルを新しいファイルで上書きしますか？',
			'confirmConvUTF8' : 'UTF-8 以外の文字が含まれています。<br/>UTF-8  に変換しますか？<br/>変換後の保存でコンテンツは UTF-8 になります。', // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : 'このファイルの文字エンコーディングを判別できませんでした。編集するには一時的に UTF-8 に変換する必要があります。<br/>文字エンコーディングを指定してください。', // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : '変更されています。<br/>保存せずに閉じると編集内容が失われます。', // from v2.1 added 15.7.2015
			'apllyAll'        : '全てに適用します',
			'name'            : '名前',
			'size'            : 'サイズ',
			'perms'           : '権限',
			'modify'          : '更新',
			'kind'            : '種類',
			'read'            : '読み取り',
			'write'           : '書き込み',
			'noaccess'        : 'アクセス禁止',
			'and'             : ',',
			'unknown'         : '不明',
			'selectall'       : '全てのファイルを選択',
			'selectfiles'     : 'ファイル選択',
			'selectffile'     : '最初のファイルを選択',
			'selectlfile'     : '最後のファイルを選択',
			'viewlist'        : 'リスト形式で表示',
			'viewicons'       : 'アイコン形式で表示',
			'places'          : 'お気に入り',
			'calc'            : '計算中',
			'path'            : 'パス',
			'aliasfor'        : 'エイリアス',
			'locked'          : 'ロック',
			'dim'             : 'サイズ',
			'files'           : 'ファイル',
			'folders'         : 'フォルダー',
			'items'           : 'アイテム',
			'yes'             : 'はい',
			'no'              : 'いいえ',
			'link'            : 'リンク',
			'searcresult'     : '検索結果',
			'selected'        : '選択されたアイテム',
			'about'           : 'アバウト',
			'shortcuts'       : 'ショートカット',
			'help'            : 'ヘルプ',
			'webfm'           : 'ウェブファイルマネージャー',
			'ver'             : 'バージョン',
			'protocolver'     : 'プロトコルバージョン',
			'homepage'        : 'プロジェクトホーム',
			'docs'            : 'ドキュメンテーション',
			'github'          : 'Github でフォーク',
			'twitter'         : 'Twitter でフォロー',
			'facebook'        : 'Facebookグループ に参加',
			'team'            : 'チーム',
			'chiefdev'        : 'チーフデベロッパー',
			'developer'       : 'デベロッパー',
			'contributor'     : 'コントリビュータ',
			'maintainer'      : 'メインテナー',
			'translator'      : '翻訳者',
			'icons'           : 'アイコン',
			'dontforget'      : 'タオル忘れちゃだめよ～',
			'shortcutsof'     : 'ショートカットは利用できません',
			'dropFiles'       : 'ここにファイルをドロップ',
			'or'              : 'または',
			'selectForUpload' : 'アップロードするファイルを選択',
			'moveFiles'       : 'ファイルを移動',
			'copyFiles'       : 'ファイルをコピー',
			'rmFromPlaces'    : 'ここから削除',
			'aspectRatio'     : '縦横比維持',
			'scale'           : '表示縮尺',
			'width'           : '幅',
			'height'          : '高さ',
			'resize'          : 'リサイズ',
			'crop'            : '切り抜き',
			'rotate'          : '回転',
			'rotate-cw'       : '90度左回転',
			'rotate-ccw'      : '90度右回転',
			'degree'          : '度',
			'netMountDialogTitle' : 'ネットワークボリュームのマウント', // added 18.04.2012
			'protocol'            : 'プロトコル', // added 18.04.2012
			'host'                : 'ホスト名', // added 18.04.2012
			'port'                : 'ポート', // added 18.04.2012
			'user'                : 'ユーザー名', // added 18.04.2012
			'pass'                : 'パスワード', // added 18.04.2012
			'confirmUnmount'      : '$1をアンマウントしますか?',  // from v2.1 added 30.04.2012
			'dropFilesBrowser': 'ブラウザからファイルをドロップまたは貼り付け', // from v2.1 added 30.05.2012
			'dropPasteFiles'  : 'ここにファイルをドロップ または URLリスト, 画像(クリップボード) を貼り付け', // from v2.1 added 07.04.2014
			'encoding'        : 'エンコーディング', // from v2.1 added 19.12.2014
			'locale'          : 'ロケール',   // from v2.1 added 19.12.2014
			'searchTarget'    : '検索範囲: $1',                // from v2.1 added 22.5.2015
			'searchMime'      : '指定した MIME タイプで検索', // from v2.1 added 22.5.2015
			'owner'           : 'オーナー', // from v2.1 added 20.6.2015
			'group'           : 'グループ', // from v2.1 added 20.6.2015
			'other'           : 'その他', // from v2.1 added 20.6.2015
			'execute'         : '実行', // from v2.1 added 20.6.2015
			'perm'            : 'パーミッション', // from v2.1 added 20.6.2015
			'mode'            : '属性', // from v2.1 added 20.6.2015
			'emptyFolder'     : '空のフォルダ', // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : '空のフォルダ\\Aアイテムを追加するにはここへドロップ', // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : '空のフォルダ\\Aアイテムを追加するにはここをロングタップ', // from v2.1.6 added 30.12.2015
			'quality'         : '品質', // from v2.1.6 added 5.1.2016
			'autoSync'        : '自動更新',  // from v2.1.6 added 10.1.2016
			'moveUp'          : '上へ移動',  // from v2.1.6 added 18.1.2016
			'getLink'         : 'リンクURLを取得', // from v2.1.7 added 9.2.2016
			'selectedItems'   : '選択アイテム ($1)', // from v2.1.7 added 2.19.2016
			'folderId'        : 'フォルダID', // from v2.1.10 added 3.25.2016
			'offlineAccess'   : 'オフライン アクセスを可能にする', // from v2.1.10 added 3.25.2016
			'reAuth'          : '再認証する', // from v2.1.10 added 3.25.2016
			'nowLoading'      : '読み込んでいます...', // from v2.1.12 added 4.26.2016
			'openMulti'       : '複数ファイルオープン', // from v2.1.12 added 5.14.2016
			'openMultiConfirm': '$1 個のファイルを開こうとしています。このままブラウザで開きますか？', // from v2.1.12 added 5.14.2016
			'emptySearch'     : '検索対象に該当するアイテムはありません。', // from v2.1.12 added 5.16.2016
			'editingFile'     : 'ファイルを編集中です', // from v2.1.13 added 6.3.2016
			'hasSelected'     : '$1 個のアイテムを選択中です', // from v2.1.13 added 6.3.2016
			'hasClipboard'    : '$1 個のアイテムがクリップボードに入っています', // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : '逐次検索対象は現在のビューのみです', // from v2.1.13 added 6.30.2016
			'reinstate'       : '元に戻す', // from v2.1.15 added 3.8.2016
			'complete'        : '$1 完了', // from v2.1.15 added 21.8.2016
			'contextmenu'     : 'コンテキストメニュー', // from v2.1.15 added 9.9.2016
			'pageTurning'     : 'ページめくり', // from v2.1.15 added 10.9.2016
			'volumeRoots'     : 'ボリュームルート', // from v2.1.16 added 16.9.2016
			'reset'           : 'リセット', // from v2.1.16 added 1.10.2016
			'bgcolor'         : '背景色', // from v2.1.16 added 1.10.2016
			'colorPicker'     : 'カラーピッカー', // from v2.1.16 added 1.10.2016
			'8pxgrid'         : '8pxグリッド', // from v2.1.16 added 4.10.2016
			'enabled'         : '有効', // from v2.1.16 added 4.10.2016
			'disabled'        : '無効', // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : '現在のビュー内に該当するアイテムはありません。\\A[Enter]キーで検索対象を拡げます。', // from v2.1.16 added 5.10.2016
			'textLabel'       : 'テキストラベル', // from v2.1.17 added 13.10.2016
			'minsLeft'        : '残り$1分', // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : '選択したエンコーディングで開き直す', // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : '選択したエンコーディングで保存', // from v2.1.19 added 2.12.2016

			/********************************** mimetypes **********************************/
			'kindUnknown'     : '不明',
			'kindRoot'        : 'ボリュームルート', // from v2.1.16 added 16.10.2016
			'kindFolder'      : 'フォルダー',
			'kindAlias'       : '別名',
			'kindAliasBroken' : '宛先不明の別名',
			// applications
			'kindApp'         : 'アプリケーション',
			'kindPostscript'  : 'Postscript ドキュメント',
			'kindMsOffice'    : 'Microsoft Office ドキュメント',
			'kindMsWord'      : 'Microsoft Word ドキュメント',
			'kindMsExcel'     : 'Microsoft Excel ドキュメント',
			'kindMsPP'        : 'Microsoft Powerpoint プレゼンテーション',
			'kindOO'          : 'Open Office ドキュメント',
			'kindAppFlash'    : 'Flash アプリケーション',
			'kindPDF'         : 'PDF',
			'kindTorrent'     : 'Bittorrent ファイル',
			'kind7z'          : '7z アーカイブ',
			'kindTAR'         : 'TAR アーカイブ',
			'kindGZIP'        : 'GZIP アーカイブ',
			'kindBZIP'        : 'BZIP アーカイブ',
			'kindXZ'          : 'XZ アーカイブ',
			'kindZIP'         : 'ZIP アーカイブ',
			'kindRAR'         : 'RAR アーカイブ',
			'kindJAR'         : 'Java JAR ファイル',
			'kindTTF'         : 'True Type フォント',
			'kindOTF'         : 'Open Type フォント',
			'kindRPM'         : 'RPM パッケージ',
			// texts
			'kindText'        : 'Text ドキュメント',
			'kindTextPlain'   : 'プレインテキスト',
			'kindPHP'         : 'PHP ソース',
			'kindCSS'         : 'スタイルシート',
			'kindHTML'        : 'HTML ドキュメント',
			'kindJS'          : 'Javascript ソース',
			'kindRTF'         : 'Rich Text フォーマット',
			'kindC'           : 'C ソース',
			'kindCHeader'     : 'C ヘッダーソース',
			'kindCPP'         : 'C++ ソース',
			'kindCPPHeader'   : 'C++ ヘッダーソース',
			'kindShell'       : 'Unix shell スクリプト',
			'kindPython'      : 'Python ソース',
			'kindJava'        : 'Java ソース',
			'kindRuby'        : 'Ruby ソース',
			'kindPerl'        : 'Perl スクリプト',
			'kindSQL'         : 'SQL ソース',
			'kindXML'         : 'XML ドキュメント',
			'kindAWK'         : 'AWK ソース',
			'kindCSV'         : 'CSV',
			'kindDOCBOOK'     : 'Docbook XML ドキュメント',
			'kindMarkdown'    : 'Markdown テキスト', // added 20.7.2015
			// images
			'kindImage'       : 'イメージ',
			'kindBMP'         : 'BMP イメージ',
			'kindJPEG'        : 'JPEG イメージ',
			'kindGIF'         : 'GIF イメージ',
			'kindPNG'         : 'PNG イメージ',
			'kindTIFF'        : 'TIFF イメージ',
			'kindTGA'         : 'TGA イメージ',
			'kindPSD'         : 'Adobe Photoshop イメージ',
			'kindXBITMAP'     : 'X bitmap イメージ',
			'kindPXM'         : 'Pixelmator イメージ',
			// media
			'kindAudio'       : 'オーディオメディア',
			'kindAudioMPEG'   : 'MPEG オーディオ',
			'kindAudioMPEG4'  : 'MPEG-4 オーディオ',
			'kindAudioMIDI'   : 'MIDI オーディオ',
			'kindAudioOGG'    : 'Ogg Vorbis オーディオ',
			'kindAudioWAV'    : 'WAV オーディオ',
			'AudioPlaylist'   : 'MP3 プレイリスト',
			'kindVideo'       : 'ビデオメディア',
			'kindVideoDV'     : 'DV ムービー',
			'kindVideoMPEG'   : 'MPEG ムービー',
			'kindVideoMPEG4'  : 'MPEG-4 ムービー',
			'kindVideoAVI'    : 'AVI ムービー',
			'kindVideoMOV'    : 'Quick Time ムービー',
			'kindVideoWM'     : 'Windows Media ムービー',
			'kindVideoFlash'  : 'Flash ムービー',
			'kindVideoMKV'    : 'Matroska ムービー',
			'kindVideoOGG'    : 'Ogg ムービー'
		}
	};
}));

