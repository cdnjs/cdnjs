/**
 * 繁體中文 translation
 * @author Yuwei Chuang <ywchuang.tw@gmail.com>
 * @author Danny Lin <danny0838@gmail.com>
 * @author TCC <john987john987@gmail.com>
 * @author Rick Jiang <rick.jiang@aol.com&gt
 * @author Banny Tai <cssf998811@gmail.com>
 * @author Alex Lion (阿力獅) <learnwithalex@gmail.com>
 * @version 2023-12-18
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
	elFinder.prototype.i18.zh_TW = {
		translator : 'Yuwei Chuang &lt;ywchuang.tw@gmail.com&gt;, Danny Lin &lt;danny0838@gmail.com&gt;, TCC &lt;john987john987@gmail.com&gt;, Rick Jiang &lt;rick.jiang@aol.com&gt, Banny Tai &lt;cssf998811@gmail.com&gt;, Alex Lion (阿力獅) &lt;learnwithalex@gmail.com&gt;',
		language   : '繁體中文',
		direction  : 'ltr',
		dateFormat : 'Y/n/j H:i', // will show like: 2023/12/4 14:29
		fancyDateFormat : '$1 H:i', // will show like: 今天 14:29
		nonameDateFormat : 'ymd-His', // noname upload will show like: 231204-142932
		messages   : {

			/********************************** errors **********************************/
			'error'                : '錯誤',
			'errUnknown'           : '未知的錯誤。',
			'errUnknownCmd'        : '未知的命令。',
			'errJqui'              : '無效的 jQuery 使用者介面組態。必須包含 Selectable、draggable 及 droppable 元件。',
			'errNode'              : '建立 elFinder 需要 DOM 元素。',
			'errURL'               : '無效的 elFinder 組態。URL 選項尚未設定。',
			'errAccess'            : '拒絕存取。',
			'errConnect'           : '無法連線至後端。',
			'errAbort'             : '連線中止。',
			'errTimeout'           : '連線逾時。',
			'errNotFound'          : '找不到後端。',
			'errResponse'          : '無效的後端回應。',
			'errConf'              : '無效的後端組態。',
			'errJSON'              : 'PHP JSON 模組尚未安裝。',
			'errNoVolumes'         : '沒有可供讀取的磁碟。',
			'errCmdParams'         : '命令 $1 的無效參數。',
			'errDataNotJSON'       : '資料不是 JSON 格式。',
			'errDataEmpty'         : '資料為空白。',
			'errCmdReq'            : '後端要求需要命令名稱。',
			'errOpen'              : '無法開啟 [$1]。',
			'errNotFolder'         : '物件不是資料夾。',
			'errNotFile'           : '物件不是檔案。',
			'errRead'              : '無法讀取 [$1]。',
			'errWrite'             : '無法寫入 [$1]。',
			'errPerm'              : '沒有使用權限。',
			'errLocked'            : '由於 [$1] 已鎖定，因此無法重新命名、移動或移除。',
			'errExists'            : '名稱為 [$1] 的項目已存在。',
			'errInvName'           : '無效的檔案名稱。',
			'errInvDirname'        : '無效的資料夾名稱。',  // from v2.1.24 added 12.4.2017
			'errFolderNotFound'    : '找不到資料夾。',
			'errFileNotFound'      : '找不到檔案。',
			'errTrgFolderNotFound' : '找不到目標資料夾 [$1]。',
			'errPopup'             : '瀏覽器阻擋了彈出式訊息視窗。如需開啟檔案，請允許瀏覽器開啟彈出式訊息視窗。',
			'errMkdir'             : '無法建立資料夾 [$1]。',
			'errMkfile'            : '無法建立檔案 [$1]。',
			'errRename'            : '無法重新命名 [$1]。',
			'errCopyFrom'          : '不允許從磁碟 $1 複製檔案。',
			'errCopyTo'            : '不允許將檔案複製至磁碟 $1。',
			'errMkOutLink'         : '無法建立磁碟根目錄以外的連結。', // from v2.1 added 03.10.2015
			'errUpload'            : '上傳時發生錯誤。',  // old name - errUploadCommon
			'errUploadFile'        : '無法上傳 [$1]。', // old name - errUpload
			'errUploadNoFiles'     : '找不到要上傳的檔案。',
			'errUploadTotalSize'   : '資料超過允許的大小上限。', // old name - errMaxSize
			'errUploadFileSize'    : '檔案超過允許的大小上限。', //  old name - errFileMaxSize
			'errUploadMime'        : '不允許的檔案類型。',
			'errUploadTransfer'    : '傳輸 [$1] 時發生錯誤。',
			'errUploadTemp'        : '無法產生用於上傳時所需的暫存檔案。', // from v2.1 added 26.09.2015
			'errNotReplace'        : '物件 [$1] 已存在於這個位置，且無法尤其他類型物件取代。', // new
			'errReplace'           : '無法取代 [$1]。',
			'errSave'              : '無法儲存 [$1]。',
			'errCopy'              : '無法複製 [$1]。',
			'errMove'              : '無法移動 [$1]。',
			'errCopyInItself'      : '無法將 [$1] 移動至現有位置。',
			'errRm'                : '無法移除 [$1]。',
			'errTrash'             : '無法移至回收桶。', // from v2.1.24 added 30.4.2017
			'errRmSrc'             : '無法移除來源檔案。',
			'errExtract'           : '無法解壓縮 [$1] 中的檔案。',
			'errArchive'           : '無法建立壓縮檔。',
			'errArcType'           : '不支援的壓縮檔格式。',
			'errNoArchive'         : '檔案不是壓縮檔，或是不支援的壓縮檔格式。',
			'errCmdNoSupport'      : '後端不支援這個命令。',
			'errReplByChild'       : '資料夾 [$1] 無法由它所包含的項目取代。',
			'errArcSymlinks'       : '基於安全性考量，拒絕解壓縮包含符號連結或含有不符規定名稱的檔案的壓縮檔。', // edited 24.06.2012
			'errArcMaxSize'        : '壓縮檔大小超過上限。',
			'errResize'            : '無法調整 [$1] 的大小。',
			'errResizeDegree'      : '無效的旋轉角度。',  // added 7.3.2013
			'errResizeRotate'      : '無法旋轉圖片。',  // added 7.3.2013
			'errResizeSize'        : '無效的圖片尺寸。',  // added 7.3.2013
			'errResizeNoChange'    : '圖片尺寸沒有變更。',  // added 7.3.2013
			'errUsupportType'      : '不支援的檔案類型。',
			'errNotUTF8Content'    : '檔案 [$1] 不是 UTF-8 編碼且無法編輯。',  // added 9.11.2011
			'errNetMount'          : '無法掛接 $1。', // added 17.04.2012
			'errNetMountNoDriver'  : '不支援的通訊協定。',     // added 17.04.2012
			'errNetMountFailed'    : '無法掛接磁碟。',         // added 17.04.2012
			'errNetMountHostReq'   : '需要設定主機名稱。', // added 18.04.2012
			'errSessionExpires'    : '由於非使用狀態時間過長，因此目前的工作階段已到期。',
			'errCreatingTempDir'   : '無法建立暫存目錄: $1',
			'errFtpDownloadFile'   : '無法從 FTP 下載檔案: $1',
			'errFtpUploadFile'     : '無法上傳檔案至 FTP: $1',
			'errFtpMkdir'          : '無法透過 FTP 建立遠端目錄: $1',
			'errArchiveExec'       : '壓縮檔案時發生錯誤: $1',
			'errExtractExec'       : '解壓縮檔案時發生錯誤: $1',
			'errNetUnMount'        : '無法卸載磁碟。', // from v2.1 added 30.04.2012
			'errConvUTF8'          : '無法轉換為 UTF-8', // from v2.1 added 08.04.2014
			'errFolderUpload'      : '如需上傳資料夾，請使用新式瀏覽器。', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : '搜尋「$1」逾時，因此僅列出部分搜尋結果。', // from v2.1 added 12.1.2016
			'errReauthRequire'     : '必須重新驗證。', // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : '可選取的項目數量上限為 $1。', // from v2.1.17 added 17.10.2016
			'errRestore'           : '無法從 [回收桶] 還原。無法識別還原目標位置。', // from v2.1.24 added 3.5.2017
			'errEditorNotFound'    : '找不到與這個檔案類型關聯的編輯器。', // from v2.1.25 added 23.5.2017
			'errServerError'       : '伺服器端發生錯誤。', // from v2.1.25 added 16.6.2017
			'errEmpty'             : '無法清空資料夾 [$1]。', // from v2.1.25 added 22.6.2017
			'moreErrors'           : '有超過 $1 個錯誤。', // from v2.1.44 added 9.12.2018
			'errMaxMkdirs'         : '最多可以同時建立 $1 個資料夾。', // from v2.1.58 added 20.6.2021

			/******************************* commands names ********************************/
			'cmdarchive'   : '建立壓縮檔',
			'cmdback'      : '返回',
			'cmdcopy'      : '複製',
			'cmdcut'       : '剪下',
			'cmddownload'  : '下載',
			'cmdduplicate' : '再製',
			'cmdedit'      : '編輯檔案',
			'cmdextract'   : '將壓縮檔解壓縮',
			'cmdforward'   : '往前',
			'cmdgetfile'   : '選取檔案',
			'cmdhelp'      : '關於這個軟體',
			'cmdhome'      : '根目錄',
			'cmdinfo'      : '取得項目資訊',
			'cmdmkdir'     : '新增資料夾',
			'cmdmkdirin'   : '移至新資料夾', // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : '新增檔案',
			'cmdopen'      : '開啟',
			'cmdpaste'     : '貼上',
			'cmdquicklook' : '預覽',
			'cmdreload'    : '重新載入',
			'cmdrename'    : '重新命名',
			'cmdrm'        : '刪除',
			'cmdtrash'     : '移至 [回收桶]', //from v2.1.24 added 29.4.2017
			'cmdrestore'   : '還原', //from v2.1.24 added 3.5.2017
			'cmdsearch'    : '尋找檔案',
			'cmdup'        : '前往上一層資料夾',
			'cmdupload'    : '上傳檔案',
			'cmdview'      : '檢視',
			'cmdresize'    : '調整大小及旋轉',
			'cmdsort'      : '排序方式',
			'cmdnetmount'  : '掛接網路磁碟', // added 18.04.2012
			'cmdnetunmount': '卸載', // from v2.1 added 30.04.2012
			'cmdplaces'    : '加入起始位置', // added 28.12.2014
			'cmdchmod'     : '變更權限', // from v2.1 added 20.6.2015
			'cmdopendir'   : '開啟資料夾', // from v2.1 added 13.1.2016
			'cmdcolwidth'  : '重設欄位寬度', // from v2.1.13 added 12.06.2016
			'cmdfullscreen': '全螢幕', // from v2.1.15 added 03.08.2016
			'cmdmove'      : '移動', // from v2.1.15 added 21.08.2016
			'cmdempty'     : '清空資料夾', // from v2.1.25 added 22.06.2017
			'cmdundo'      : '復原', // from v2.1.27 added 31.07.2017
			'cmdredo'      : '取消復原', // from v2.1.27 added 31.07.2017
			'cmdpreference': '偏好設定', // from v2.1.27 added 03.08.2017
			'cmdselectall' : '全部選取', // from v2.1.28 added 15.08.2017
			'cmdselectnone': '全部不選', // from v2.1.28 added 15.08.2017
			'cmdselectinvert': '反向選取', // from v2.1.28 added 15.08.2017
			'cmdopennew'   : '在新視窗中開啟', // from v2.1.38 added 3.4.2018
			'cmdhide'      : '隱藏 (偏好設定)', // from v2.1.41 added 24.7.2018

			/*********************************** buttons ***********************************/
			'btnClose'  : '關閉',
			'btnSave'   : '儲存',
			'btnRm'     : '移除',
			'btnApply'  : '套用',
			'btnCancel' : '取消',
			'btnNo'     : '否',
			'btnYes'    : '是',
			'btnMount'  : '掛接',  // added 18.04.2012
			'btnApprove': '前往 $1 並核准', // from v2.1 added 26.04.2012
			'btnUnmount': '卸載', // from v2.1 added 30.04.2012
			'btnConv'   : '轉換', // from v2.1 added 08.04.2014
			'btnCwd'    : '目前位置',      // from v2.1 added 22.5.2015
			'btnVolume' : '磁碟',    // from v2.1 added 22.5.2015
			'btnAll'    : '全部',       // from v2.1 added 22.5.2015
			'btnMime'   : 'MIME 類型', // from v2.1 added 22.5.2015
			'btnFileName':'檔案名稱',  // from v2.1 added 22.5.2015
			'btnSaveClose': '儲存並關閉', // from v2.1 added 12.6.2015
			'btnBackup' : '備份', // fromv2.1 added 28.11.2015
			'btnRename'    : '重新命名',      // from v2.1.24 added 6.4.2017
			'btnRenameAll' : '全部重新命名', // from v2.1.24 added 6.4.2017
			'btnPrevious' : '上一頁 ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnNext'     : '下一頁 ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnSaveAs'   : '另存新檔', // from v2.1.25 added 24.5.2017

			/******************************** notifications ********************************/
			'ntfopen'     : '開啟資料夾',
			'ntffile'     : '開啟檔案',
			'ntfreload'   : '重新載入資料夾內容',
			'ntfmkdir'    : '正在建立資料夾',
			'ntfmkfile'   : '正在建立檔案',
			'ntfrm'       : '刪除項目',
			'ntfcopy'     : '複製項目',
			'ntfmove'     : '移動項目',
			'ntfprepare'  : '正在檢查現有項目',
			'ntfrename'   : '重新命名檔案',
			'ntfupload'   : '正在上傳檔案',
			'ntfdownload' : '正在下載檔案',
			'ntfsave'     : '儲存檔案',
			'ntfarchive'  : '正在建立壓縮檔',
			'ntfextract'  : '正在從壓縮檔解壓縮檔案',
			'ntfsearch'   : '正在搜尋檔案',
			'ntfresize'   : '正在調整圖片尺寸',
			'ntfsmth'     : '正在處理',
			'ntfloadimg'  : '正在載入圖片',
			'ntfnetmount' : '正在掛接網路磁碟', // added 18.04.2012
			'ntfnetunmount': '正在卸載網路磁碟', // from v2.1 added 30.04.2012
			'ntfdim'      : '正在擷取圖片尺寸', // added 20.05.2013
			'ntfreaddir'  : '正在讀取資料夾資訊', // from v2.1 added 01.07.2013
			'ntfurl'      : '正在取得連結的網址', // from v2.1 added 11.03.2014
			'ntfchmod'    : '正在變更檔案權限', // from v2.1 added 20.6.2015
			'ntfpreupload': '正在驗證上傳檔案名稱', // from v2.1 added 31.11.2015
			'ntfzipdl'    : '正在建立可供下載的檔案', // from v2.1.7 added 23.1.2016
			'ntfparents'  : '正在取得路徑資訊', // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': '正在處理上傳的檔案', // from v2.1.17 added 2.11.2016
			'ntftrash'    : '正在移至 [回收桶]', // from v2.1.24 added 2.5.2017
			'ntfrestore'  : '正在從 [回收桶] 還原', // from v2.1.24 added 3.5.2017
			'ntfchkdir'   : '正在檢查目標資料夾', // from v2.1.24 added 3.5.2017
			'ntfundo'     : '正在復原之前的操作', // from v2.1.27 added 31.07.2017
			'ntfredo'     : '正在取消復原之前的復原操作', // from v2.1.27 added 31.07.2017
			'ntfchkcontent' : '正在檢查內容', // from v2.1.41 added 3.8.2018

			/*********************************** volumes *********************************/
			'volume_Trash' : '回收桶', //from v2.1.24 added 29.4.2017

			/************************************ dates **********************************/
			'dateUnknown' : '未知',
			'Today'       : '今天',
			'Yesterday'   : '昨天',
			'msJan'       : '1 月',
			'msFeb'       : '2 月',
			'msMar'       : '3 月',
			'msApr'       : '4 月',
			'msMay'       : '5 月',
			'msJun'       : '6 月',
			'msJul'       : '7 月',
			'msAug'       : '8 月',
			'msSep'       : '9 月',
			'msOct'       : '10 月',
			'msNov'       : '11 月',
			'msDec'       : '12 月',
			'January'     : '1 月',
			'February'    : '2 月',
			'March'       : '3 月',
			'April'       : '4 月',
			'May'         : '5 月',
			'June'        : '6 月',
			'July'        : '7 月',
			'August'      : '8 月',
			'September'   : '9 月',
			'October'     : '10 月',
			'November'    : '11 月',
			'December'    : '12 月',
			'Sunday'      : '星期日',
			'Monday'      : '星期一',
			'Tuesday'     : '星期二',
			'Wednesday'   : '星期三',
			'Thursday'    : '星期四',
			'Friday'      : '星期五',
			'Saturday'    : '星期六',
			'Sun'         : '週日',
			'Mon'         : '週一',
			'Tue'         : '週二',
			'Wed'         : '週三',
			'Thu'         : '週四',
			'Fri'         : '週五',
			'Sat'         : '週六',

			/******************************** sort variants ********************************/
			'sortname'          : '依據名稱',
			'sortkind'          : '依據類型',
			'sortsize'          : '依據大小',
			'sortdate'          : '依據日期',
			'sortFoldersFirst'  : '先顯示資料夾',
			'sortperm'          : '依據權限', // from v2.1.13 added 13.06.2016
			'sortmode'          : '依據權限',       // from v2.1.13 added 13.06.2016
			'sortowner'         : '依據擁有者',      // from v2.1.13 added 13.06.2016
			'sortgroup'         : '依據群組',      // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : '同時套用於樹狀檢視',  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'untitled file.txt' : '新增檔案.txt', // added 10.11.2015
			'untitled folder'   : '新增資料夾',   // added 10.11.2015
			'Archive'           : '新增壓縮檔',  // from v2.1 added 10.11.2015
			'untitled file'     : '新增檔案.$1',  // from v2.1.41 added 6.8.2018
			'extentionfile'     : '$1: 檔案',    // from v2.1.41 added 6.8.2018
			'extentiontype'     : '$1: $2',      // from v2.1.43 added 17.10.2018

			/********************************** messages **********************************/
			'confirmReq'      : '操作確認要求',
			'confirmRm'       : '確定要永久移除項目？<br/>這項操作無法復原！',
			'confirmRepl'     : '是否要以新的項目取代舊的項目？(如果項目包含資料夾，資料夾會合併。如需備份後才取代，請點擊 [備份]。)',
			'confirmRest'     : '是否要以 [回收桶] 內的項目取代目前項目？', // fromv2.1.24 added 5.5.2017
			'confirmConvUTF8' : '不是 UTF-8 編碼<br/>轉換至 UTF-8 編碼？<br/>轉換後儲存會將內容變更為 UTF-8 編碼。', // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : '無法偵測這個檔案的字元編碼方式。這個檔案需要暫時轉換至 UTF-8 編碼以進行編輯。<br/>請選取這個檔案的字元編碼方式。', // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : '項目已修改。<br/>如果不儲存變更，便會失去之前的工作成果。', // from v2.1 added 15.7.2015
			'confirmTrash'    : '確定要將項目移至 [回收桶]？', //from v2.1.24 added 29.4.2017
			'confirmMove'     : '確定要將項目移至 [$1]？', //from v2.1.50 added 27.7.2019
			'apllyAll'        : '全部套用',
			'name'            : '名稱',
			'size'            : '大小',
			'perms'           : '權限',
			'modify'          : '修改日期',
			'kind'            : '類型',
			'read'            : '讀取',
			'write'           : '寫入',
			'noaccess'        : '沒有存取權限',
			'and'             : '及',
			'unknown'         : '未知',
			'selectall'       : '選取全部項目',
			'selectfiles'     : '選取項目',
			'selectffile'     : '選取第一個項目',
			'selectlfile'     : '選取最後一個項目',
			'viewlist'        : '清單檢視',
			'viewicons'       : '圖示檢視',
			'viewSmall'       : '小型圖示', // from v2.1.39 added 22.5.2018
			'viewMedium'      : '中型圖示', // from v2.1.39 added 22.5.2018
			'viewLarge'       : '大型圖示', // from v2.1.39 added 22.5.2018
			'viewExtraLarge'  : '超大型圖示', // from v2.1.39 added 22.5.2018
			'places'          : '起始位置',
			'calc'            : '計算',
			'path'            : '路徑',
			'aliasfor'        : '別名',
			'locked'          : '鎖定',
			'dim'             : '尺寸',
			'files'           : '檔案',
			'folders'         : '資料夾',
			'items'           : '項目',
			'yes'             : '是',
			'no'              : '否',
			'link'            : '連結',
			'searcresult'     : '搜尋結果',
			'selected'        : '選取的項目',
			'about'           : '關於',
			'shortcuts'       : '快速鍵',
			'help'            : '使用說明',
			'webfm'           : '網頁檔案管理功能',
			'ver'             : '版本',
			'protocolver'     : '通訊協定版本',
			'homepage'        : '專案名稱',
			'docs'            : '線上說明',
			'github'          : '在 GitHub 上進行分支開發',
			'twitter'         : '在 Twitter 上跟隨我們',
			'facebook'        : '在 Facebook 加入我們',
			'team'            : '團隊',
			'chiefdev'        : '首席開發者',
			'developer'       : '開發者',
			'contributor'     : '參與者',
			'maintainer'      : '維護者',
			'translator'      : '本地化人員',
			'icons'           : '圖示',
			'dontforget'      : '請記得宣傳這個程式',
			'shortcutsof'     : '快速鍵已停用',
			'dropFiles'       : '將檔案拖放至這裡',
			'or'              : '或',
			'selectForUpload' : '選取檔案',
			'moveFiles'       : '移動項目',
			'copyFiles'       : '複製項目',
			'restoreFiles'    : '還原項目', // from v2.1.24 added 5.5.2017
			'rmFromPlaces'    : '從起始位置移除',
			'aspectRatio'     : '外觀比例',
			'scale'           : '縮放',
			'width'           : '寬度',
			'height'          : '高度',
			'resize'          : '調整大小',
			'crop'            : '裁剪',
			'rotate'          : '旋轉',
			'rotate-cw'       : '順時針旋轉 90 度',
			'rotate-ccw'      : '逆時針旋轉 90 度',
			'degree'          : '°',
			'netMountDialogTitle' : '掛接網路磁碟', // added 18.04.2012
			'protocol'            : '通訊協定', // added 18.04.2012
			'host'                : '主機名稱', // added 18.04.2012
			'port'                : '通訊埠', // added 18.04.2012
			'user'                : '使用者', // added 18.04.2012
			'pass'                : '密碼', // added 18.04.2012
			'confirmUnmount'      : '確定要卸載 $1？',  // from v2.1 added 30.04.2012
			'dropFilesBrowser': '從瀏覽器拖放檔案或貼上檔案', // from v2.1 added 30.05.2012
			'dropPasteFiles'  : '拖放檔案、貼上網址或圖片至這裡', // from v2.1 added 07.04.2014
			'encoding'        : '編碼方式', // from v2.1 added 19.12.2014
			'locale'          : '地區語言',   // from v2.1 added 19.12.2014
			'searchTarget'    : '目標: $1',                // from v2.1 added 22.5.2015
			'searchMime'      : '依據輸入的 MIME 類型搜尋', // from v2.1 added 22.5.2015
			'owner'           : '擁有者', // from v2.1 added 20.6.2015
			'group'           : '群組', // from v2.1 added 20.6.2015
			'other'           : '其他', // from v2.1 added 20.6.2015
			'execute'         : '執行', // from v2.1 added 20.6.2015
			'perm'            : '權限', // from v2.1 added 20.6.2015
			'mode'            : '權限', // from v2.1 added 20.6.2015
			'emptyFolder'     : '資料夾為空', // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : '資料夾為空\\A拖放以新增項目', // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : '資料夾為空\\A長按以新增項目', // from v2.1.6 added 30.12.2015
			'quality'         : '品質', // from v2.1.6 added 5.1.2016
			'autoSync'        : '自動同步',  // from v2.1.6 added 10.1.2016
			'moveUp'          : '上移',  // from v2.1.6 added 18.1.2016
			'getLink'         : '取得網址連結', // from v2.1.7 added 9.2.2016
			'selectedItems'   : '選取的項目 ($1)', // from v2.1.7 added 2.19.2016
			'folderId'        : '資料夾 ID', // from v2.1.10 added 3.25.2016
			'offlineAccess'   : '允許離線存取', // from v2.1.10 added 3.25.2016
			'reAuth'          : '重新驗證', // from v2.1.10 added 3.25.2016
			'nowLoading'      : '正在載入...', // from v2.1.12 added 4.26.2016
			'openMulti'       : '開啟多個檔案', // from v2.1.12 added 5.14.2016
			'openMultiConfirm': '目前正在嘗試開啟 $1 個檔案。確定要在瀏覽器中開啟？', // from v2.1.12 added 5.14.2016
			'emptySearch'     : '搜尋目標的搜尋結果為空。', // from v2.1.12 added 5.16.2016
			'editingFile'     : '目前正在編輯檔案。', // from v2.1.13 added 6.3.2016
			'hasSelected'     : '已選取 $1 個項目。', // from v2.1.13 added 6.3.2016
			'hasClipboard'    : '剪貼簿中有 $1 個項目。', // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : '僅能在目前的檢視方式中進行累加搜尋。', // from v2.1.13 added 6.30.2016
			'reinstate'       : '還原', // from v2.1.15 added 3.8.2016
			'complete'        : '$1已完成', // from v2.1.15 added 21.8.2016
			'contextmenu'     : '操作功能表', // from v2.1.15 added 9.9.2016
			'pageTurning'     : '換頁', // from v2.1.15 added 10.9.2016
			'volumeRoots'     : '磁碟根目錄', // from v2.1.16 added 16.9.2016
			'reset'           : '重設', // from v2.1.16 added 1.10.2016
			'bgcolor'         : '背景色彩', // from v2.1.16 added 1.10.2016
			'colorPicker'     : '色彩選擇器', // from v2.1.16 added 1.10.2016
			'8pxgrid'         : '8px 格狀排列', // from v2.1.16 added 4.10.2016
			'enabled'         : '啟用', // from v2.1.16 added 4.10.2016
			'disabled'        : '停用', // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : '在目前的檢視方式中搜尋結果為空。\\A按下 Enter 以擴大搜尋目標。', // from v2.1.16 added 5.10.2016
			'emptyLetSearch'  : '在目前的檢視方式中首個字母搜尋的搜尋結果為空。', // from v2.1.23 added 24.3.2017
			'textLabel'       : '文字標籤', // from v2.1.17 added 13.10.2016
			'minsLeft'        : '剩下 $1 分鐘', // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : '以選取的編碼方式重新開啟', // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : '以選取的編碼方式儲存', // from v2.1.19 added 2.12.2016
			'selectFolder'    : '選取資料夾', // from v2.1.20 added 13.12.2016
			'firstLetterSearch': '首個字母搜尋', // from v2.1.23 added 24.3.2017
			'presets'         : '預設集', // from v2.1.25 added 26.5.2017
			'tooManyToTrash'  : '由於要移除的檔案數量超過上限，因此無法移至 [回收桶]。', // from v2.1.25 added 9.6.2017
			'TextArea'        : '文字區域', // from v2.1.25 added 14.6.2017
			'folderToEmpty'   : '清空資料夾 [$1]。', // from v2.1.25 added 22.6.2017
			'filderIsEmpty'   : '資料夾 $1 中沒有任何項目。', // from v2.1.25 added 22.6.2017
			'preference'      : '偏好設定', // from v2.1.26 added 28.6.2017
			'language'        : '介面語言', // from v2.1.26 added 28.6.2017
			'clearBrowserData': '初始化這個瀏覽器中已儲存的設定', // from v2.1.26 added 28.6.2017
			'toolbarPref'     : '工具列設定', // from v2.1.27 added 2.8.2017
			'charsLeft'       : '... 剩下 $1 個字元。',  // from v2.1.29 added 30.8.2017
			'linesLeft'       : '... 剩下 $1 行。',  // from v2.1.52 added 16.1.2020
			'sum'             : '總計', // from v2.1.29 added 28.9.2017
			'roughFileSize'   : '檔案概略大小', // from v2.1.30 added 2.11.2017
			'autoFocusDialog' : '聚焦於游標暫留對話方塊的元素',  // from v2.1.30 added 2.11.2017
			'select'          : '選取', // from v2.1.30 added 23.11.2017
			'selectAction'    : '選取檔案後的動作', // from v2.1.30 added 23.11.2017
			'useStoredEditor' : '使用上次的編輯器開啟', // from v2.1.30 added 23.11.2017
			'selectinvert'    : '反向選取', // from v2.1.30 added 25.11.2017
			'renameMultiple'  : '確定要將選取的項目 $1 重新命名為 $2？<br/>這項操作無法復原！', // from v2.1.31 added 4.12.2017
			'batchRename'     : '批次重新命名', // from v2.1.31 added 8.12.2017
			'plusNumber'      : '增加數值', // from v2.1.31 added 8.12.2017
			'asPrefix'        : '新增前置詞', // from v2.1.31 added 8.12.2017
			'asSuffix'        : '新增後置詞', // from v2.1.31 added 8.12.2017
			'changeExtention' : '變更副檔名', // from v2.1.31 added 8.12.2017
			'columnPref'      : '欄位設定 (清單檢視)', // from v2.1.32 added 6.2.2018
			'reflectOnImmediate' : '全部變更會立即影響壓縮檔。', // from v2.1.33 added 2.3.2018
			'reflectOnUnmount'   : '在卸載這個磁碟前，任何變更均不會生效。', // from v2.1.33 added 2.3.2018
			'unmountChildren' : '掛接在這個磁碟的下列磁碟無法卸載。確定要卸載這個磁碟？', // from v2.1.33 added 5.3.2018
			'selectionInfo'   : '選取項目資訊', // from v2.1.33 added 7.3.2018
			'hashChecker'     : '用於顯示檔案雜湊值的演算法', // from v2.1.33 added 10.3.2018
			'infoItems'       : '資訊項目 (用於選取項目的資訊面板)', // from v2.1.38 added 28.3.2018
			'pressAgainToExit': '再按一下以離開。', // from v2.1.38 added 1.4.2018
			'toolbar'         : '工具列', // from v2.1.38 added 4.4.2018
			'workspace'       : '工作區', // from v2.1.38 added 4.4.2018
			'dialog'          : '對話方塊', // from v2.1.38 added 4.4.2018
			'all'             : '全部', // from v2.1.38 added 4.4.2018
			'iconSize'        : '圖示尺寸 (圖示檢視)', // from v2.1.39 added 7.5.2018
			'editorMaximized' : '開啟最大化編輯器視窗', // from v2.1.40 added 30.6.2018
			'editorConvNoApi' : '由於轉換 API 目前無法使用，請在網站上進行轉換。', //from v2.1.40 added 8.7.2018
			'editorConvNeedUpload' : '完成轉換後，必須使用項目的網址上傳或下載檔案以儲存轉換後的檔案。', //from v2.1.40 added 8.7.2018
			'convertOn'       : '在 $1 的網站上轉換', // from v2.1.40 added 10.7.2018
			'integrations'    : '整合項目', // from v2.1.40 added 11.7.2018
			'integrationWith' : '這裡會列出 elFinder 整合的外部服務。請在使用 elFinder 前先查看這些整合項目的使用條款、隱私權政策等內容。', // from v2.1.40 added 11.7.2018
			'showHidden'      : '顯示隱藏項目', // from v2.1.41 added 24.7.2018
			'hideHidden'      : '隱藏隱藏項目', // from v2.1.41 added 24.7.2018
			'toggleHidden'    : '顯示/隱藏隱藏項目', // from v2.1.41 added 24.7.2018
			'makefileTypes'   : '新增檔案可以新增的檔案類型', // from v2.1.41 added 7.8.2018
			'typeOfTextfile'  : '文字檔案類型', // from v2.1.41 added 7.8.2018
			'add'             : '新增', // from v2.1.41 added 7.8.2018
			'theme'           : '佈景主題', // from v2.1.43 added 19.10.2018
			'default'         : '預設', // from v2.1.43 added 19.10.2018
			'description'     : '內容說明', // from v2.1.43 added 19.10.2018
			'website'         : '網站', // from v2.1.43 added 19.10.2018
			'author'          : '開發者', // from v2.1.43 added 19.10.2018
			'email'           : '電子郵件地址', // from v2.1.43 added 19.10.2018
			'license'         : '授權方式', // from v2.1.43 added 19.10.2018
			'exportToSave'    : '這個項目無法儲存。為避免遺失編輯資料，必須將資料匯出至個人裝置。', // from v2.1.44 added 1.12.2018
			'dblclickToSelect': '按兩下檔案以選取。', // from v2.1.47 added 22.1.2019
			'useFullscreen'   : '使用全螢幕模式', // from v2.1.47 added 19.2.2019

			/********************************** mimetypes **********************************/
			'kindUnknown'     : '未知',
			'kindRoot'        : '磁碟根目錄', // from v2.1.16 added 16.10.2016
			'kindFolder'      : '資料夾',
			'kindSelects'     : 'Selections', // from v2.1.29 added 29.8.2017
			'kindAlias'       : '別名',
			'kindAliasBroken' : '中斷的別名',
			// applications
			'kindApp'         : '應用程式',
			'kindPostscript'  : 'PostScript 文件',
			'kindMsOffice'    : 'Microsoft Office 文件',
			'kindMsWord'      : 'Microsoft Word 文件',
			'kindMsExcel'     : 'Microsoft Excel 試算表',
			'kindMsPP'        : 'Microsoft Powerpoint 簡報',
			'kindOO'          : 'Open Office 文件',
			'kindAppFlash'    : 'Flash 應用程式',
			'kindPDF'         : 'PDF 文件',
			'kindTorrent'     : 'Bittorrent 檔案',
			'kind7z'          : '7z 壓縮檔',
			'kindTAR'         : 'TAR 壓縮檔',
			'kindGZIP'        : 'GZIP 壓縮檔',
			'kindBZIP'        : 'BZIP 壓縮檔',
			'kindXZ'          : 'XZ 壓縮檔',
			'kindZIP'         : 'ZIP 壓縮檔',
			'kindRAR'         : 'RAR 壓縮檔',
			'kindJAR'         : 'Java JAR 檔案',
			'kindTTF'         : 'True Type 字型',
			'kindOTF'         : 'Open Type 字型',
			'kindRPM'         : 'RPM 封裝檔案',
			// texts
			'kindText'        : '文字檔案',
			'kindTextPlain'   : '純文字',
			'kindPHP'         : 'PHP 原始程式碼',
			'kindCSS'         : '階層式樣式表 (CSS)',
			'kindHTML'        : 'HTML 文件',
			'kindJS'          : 'JavaScript 原始程式碼',
			'kindRTF'         : 'RTF 格式',
			'kindC'           : 'C 原始程式碼',
			'kindCHeader'     : 'C 標頭原始程式碼',
			'kindCPP'         : 'C++ 原始程式碼',
			'kindCPPHeader'   : 'C++ 標頭原始程式碼',
			'kindShell'       : 'Unix 殼層指令碼',
			'kindPython'      : 'Python 原始程式碼',
			'kindJava'        : 'Java 原始程式碼',
			'kindRuby'        : 'Ruby 原始程式碼',
			'kindPerl'        : 'Perl 指令碼',
			'kindSQL'         : 'SQL 原始程式碼',
			'kindXML'         : 'XML 文件',
			'kindAWK'         : 'AWK 原始程式碼',
			'kindCSV'         : '逗點分隔值 (CSV)',
			'kindDOCBOOK'     : 'Docbook XML 文件',
			'kindMarkdown'    : 'Markdown 文字', // added 20.7.2015
			// images
			'kindImage'       : '圖片',
			'kindBMP'         : 'BMP 圖片',
			'kindJPEG'        : 'JPEG 圖片',
			'kindGIF'         : 'GIF 圖片',
			'kindPNG'         : 'PNG 圖片',
			'kindTIFF'        : 'TIFF 圖片',
			'kindTGA'         : 'TGA 圖片',
			'kindPSD'         : 'Adobe Photoshop 圖片',
			'kindXBITMAP'     : 'X bitmap 圖片',
			'kindPXM'         : 'Pixelmator 圖片',
			// media
			'kindAudio'       : '音訊',
			'kindAudioMPEG'   : 'MPEG 音訊',
			'kindAudioMPEG4'  : 'MPEG-4 音訊',
			'kindAudioMIDI'   : 'MIDI 音訊',
			'kindAudioOGG'    : 'Ogg Vorbis 音訊',
			'kindAudioWAV'    : 'WAV 音訊',
			'AudioPlaylist'   : 'MP3 播放清單',
			'kindVideo'       : '視訊',
			'kindVideoDV'     : 'DV 影片',
			'kindVideoMPEG'   : 'MPEG 影片',
			'kindVideoMPEG4'  : 'MPEG-4 影片',
			'kindVideoAVI'    : 'AVI 影片',
			'kindVideoMOV'    : 'Quick Time 影片',
			'kindVideoWM'     : 'Windows Media 影片',
			'kindVideoFlash'  : 'Flash 影片',
			'kindVideoMKV'    : 'Matroska 影片',
			'kindVideoOGG'    : 'Ogg 影片'
		}
	};
}));

