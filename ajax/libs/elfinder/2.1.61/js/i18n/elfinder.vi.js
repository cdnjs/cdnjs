/**
 * Ngôn ngữ Việt Nam translation
 * @author Chung Thủy f <chungthuyf@gmail.com>
 * @author Son Nguyen <son.nguyen@catalyst.net.nz>
 * @author Nguyễn Trần Chung <admin@chungnguyen.xyz>
 * @version 2019-12-03
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
	elFinder.prototype.i18.vi = {
		translator : 'Chung Thủy f &lt;chungthuyf@gmail.com&gt;, Son Nguyen &lt;son.nguyen@catalyst.net.nz&gt;, Nguyễn Trần Chung &lt;admin@chungnguyen.xyz&gt;',
		language   : 'Ngôn ngữ Việt Nam',
		direction  : 'ltr',
		dateFormat : 'd.m.Y H:i', // will show like: 03.12.2019 17:28
		fancyDateFormat : '$1 H:i', // will show like: Hôm nay 17:28
		nonameDateFormat : 'ymd-His', // noname upload will show like: 191203-172820
		messages   : {

			/********************************** errors **********************************/
			'error'                : 'Lỗi',
			'errUnknown'           : 'Lỗi không xác định được.',
			'errUnknownCmd'        : 'Lỗi không rõ lệnh.',
			'errJqui'              : 'Cấu hình jQueryUI không hợp lệ. Các thành phần lựa chọn, kéo và thả phải được bao gồm.',
			'errNode'              : 'elFinder đòi hỏi phần tử DOM phải được tạo ra.',
			'errURL'               : 'Cấu hình elFinder không hợp lệ! URL không được thiết lập tùy chọn.',
			'errAccess'            : 'Truy cập bị từ chối.',
			'errConnect'           : 'Không thể kết nối với backend.',
			'errAbort'             : 'Kết nối bị hủy bỏ.',
			'errTimeout'           : 'Thời gian chờ kết nối đã hết.',
			'errNotFound'          : 'Backend không tìm thấy.',
			'errResponse'          : 'Phản hồi backend không hợp lệ.',
			'errConf'              : 'Cấu hình backend không hợp lệ.',
			'errJSON'              : 'Mô-đun PHP JSON không được cài đặt.',
			'errNoVolumes'         : 'Tập có thể đọc không có sẵn.',
			'errCmdParams'         : 'Thông số không hợp lệ cho lệnh "$1".',
			'errDataNotJSON'       : 'Dữ liệu không phải là JSON.',
			'errDataEmpty'         : 'Dữ liệu trống.',
			'errCmdReq'            : 'Backend đòi hỏi tên lệnh.',
			'errOpen'              : 'Không thể mở "$1".',
			'errNotFolder'         : 'Đối tượng không phải là một thư mục.',
			'errNotFile'           : 'Đối tượng không phải là một tập tin.',
			'errRead'              : 'Không thể đọc "$1".',
			'errWrite'             : 'Không thể ghi vào "$1".',
			'errPerm'              : 'Quyền bị từ chối.',
			'errLocked'            : '"$1" đã bị khóa và không thể đổi tên, di chuyển hoặc loại bỏ.',
			'errExists'            : 'Tập tin có tên "$1" đã tồn tại.',
			'errInvName'           : 'Tên tập tin không hợp lệ.',
			'errInvDirname'        : 'Tên thư mục không hợp lệ.',  // from v2.1.24 added 12.4.2017
			'errFolderNotFound'    : 'Thư mục không tìm thấy.',
			'errFileNotFound'      : 'Tập tin không tìm thấy.',
			'errTrgFolderNotFound' : 'Thư mục đích "$1" không được tìm thấy.',
			'errPopup'             : 'Trình duyệt ngăn chặn mở cửa sổ popup.',
			'errMkdir'             : 'Không thể tạo thư mục "$1".',
			'errMkfile'            : 'Không thể tạo tập tin "$1".',
			'errRename'            : 'Không thể đổi tên "$1".',
			'errCopyFrom'          : 'Sao chép tập tin từ tập "$1" không được phép.',
			'errCopyTo'            : 'Sao chép tập tin tới tập "$1" không được phép.',
			'errMkOutLink'         : 'Không thể tạo liên kết ra bên ngoài volume root.', // from v2.1 added 03.10.2015
			'errUpload'            : 'Tải lên báo lỗi.',  // old name - errUploadCommon
			'errUploadFile'        : 'Không thể tải lên "$1".', // old name - errUpload
			'errUploadNoFiles'     : 'Không thấy tập tin nào để tải lên.',
			'errUploadTotalSize'   : 'Dữ liệu vượt quá kích thước tối đa cho phép.', // old name - errMaxSize
			'errUploadFileSize'    : 'Tập tin vượt quá kích thước tối đa cho phép.', //  old name - errFileMaxSize
			'errUploadMime'        : 'Kiểu tập tin không được phép.',
			'errUploadTransfer'    : 'Lỗi khi truyền "$1".',
			'errUploadTemp'        : 'Không thể tạo thư mục tạm để tải lên.', // from v2.1 added 26.09.2015
			'errNotReplace'        : 'Đối tượng "$1" đã tồn tại ở vị trí này và không thể thay thế bằng đối tượng với loại khác.', // new
			'errReplace'           : 'Không thể thay thế "$1".',
			'errSave'              : 'Không thể lưu "$1".',
			'errCopy'              : 'Không thể sao chép "$1".',
			'errMove'              : 'Không thể chuyển "$1".',
			'errCopyInItself'      : 'Không thể sao chép "$1" vào chính nó.',
			'errRm'                : 'Không thể xóa "$1".',
			'errTrash'             : 'Không thể cho vào thùng rác.', // from v2.1.24 added 30.4.2017
			'errRmSrc'             : 'Không thể xóa tệp nguồn.',
			'errExtract'           : 'Không thể giải nén các tập tin từ"$1".',
			'errArchive'           : 'Không thể tạo ra lưu trữ.',
			'errArcType'           : 'Loại lưu trữ không được hỗ trợ.',
			'errNoArchive'         : 'Tập tin không phải là lưu trữ hoặc có kiểu lưu trữ không được hỗ trợ.',
			'errCmdNoSupport'      : 'Backend không hỗ trợ lệnh này.',
			'errReplByChild'       : 'Thư mục "$1" không thể được thay thế bằng một mục con mà nó chứa.',
			'errArcSymlinks'       : 'Vì lý do bảo mật, từ chối giải nén tập tin lưu trữ có chứa liên kết mềm.', // edited 24.06.2012
			'errArcMaxSize'        : 'Tập tin lưu trữ vượt quá kích thước tối đa cho phép.',
			'errResize'            : 'Không thể thay đổi kích thước "$1".',
			'errResizeDegree'      : 'Độ xoay không hợp lệ.',  // added 7.3.2013
			'errResizeRotate'      : 'Không thể xoay hình ảnh.',  // added 7.3.2013
			'errResizeSize'        : 'Kích thước hình ảnh không hợp lệ.',  // added 7.3.2013
			'errResizeNoChange'    : 'Kích thước hình ảnh không thay đổi.',  // added 7.3.2013
			'errUsupportType'      : 'Loại tập tin không được hỗ trợ.',
			'errNotUTF8Content'    : 'Tệp "$1" không phải bộ ký tự UTF-8 nên không thể chỉnh sửa.',  // added 9.11.2011
			'errNetMount'          : 'Không thể gắn kết "$1".', // added 17.04.2012
			'errNetMountNoDriver'  : 'Giao thức không được hỗ trợ.',     // added 17.04.2012
			'errNetMountFailed'    : 'Gắn (kết nối) thất bại.',         // added 17.04.2012
			'errNetMountHostReq'   : 'Yêu cầu máy chủ.', // added 18.04.2012
			'errSessionExpires'    : 'Phiên của bạn đã hết hạn do không hoạt động.',
			'errCreatingTempDir'   : 'Không thể tạo thư mục tạm thời: "$1"',
			'errFtpDownloadFile'   : 'Không thể tải xuống tệp từ FTP: "$1"',
			'errFtpUploadFile'     : 'Không thể tải tệp lên FTP: "$1"',
			'errFtpMkdir'          : 'Không thể tạo thư mục từ xa trên FTP: "$1"',
			'errArchiveExec'       : 'Lỗi trong khi lưu trữ tệp: "$1"',
			'errExtractExec'       : 'Lỗi trong khi giải nén tập tin: "$1"',
			'errNetUnMount'        : 'Không thể gỡ gắn (liên kết).', // from v2.1 added 30.04.2012
			'errConvUTF8'          : 'Không thể chuyển đổi thành UTF-8', // from v2.1 added 08.04.2014
			'errFolderUpload'      : 'Hãy thử trình duyệt mới hơn (vì trình duyệt hiện tại có vẻ cũ nên không hỗ trợ  tải lên thư mục).', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : 'Đã hết thời gian trong khi tìm kiếm "$1". Kết quả tìm kiếm là một phần.', // from v2.1 added 12.1.2016
			'errReauthRequire'     : 'Cần ủy quyền lại.', // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : 'Số lượng tối đa của các mục có thể chọn là $1.', // from v2.1.17 added 17.10.2016
			'errRestore'           : 'Không thể khôi phục từ thùng rác. Không thể xác định đích khôi phục.', // from v2.1.24 added 3.5.2017
			'errEditorNotFound'    : 'Không tìm thấy trình chỉnh sửa cho loại tệp này.', // from v2.1.25 added 23.5.2017
			'errServerError'       : 'Lỗi xảy ra ở phía máy chủ.', // from v2.1.25 added 16.6.2017
			'errEmpty'             : 'Không thể làm rỗng thư mục "$1".', // from v2.1.25 added 22.6.2017
			'moreErrors'           : 'Có thêm $1 lỗi.', // from v2.1.44 added 9.12.2018

			/******************************* commands names ********************************/
			'cmdarchive'   : 'Tạo tập tin nén',
			'cmdback'      : 'Trở lại',
			'cmdcopy'      : 'Sao chép',
			'cmdcut'       : 'Cắt',
			'cmddownload'  : 'Tải về',
			'cmdduplicate' : 'Bản sao',
			'cmdedit'      : 'Sửa tập tin',
			'cmdextract'   : 'Giải nén tập tin',
			'cmdforward'   : 'Trước',
			'cmdgetfile'   : 'Chọn tập tin',
			'cmdhelp'      : 'Giới thiệu phần mềm',
			'cmdhome'      : 'Home',
			'cmdinfo'      : 'Thông tin',
			'cmdmkdir'     : 'Thư mục',
			'cmdmkdirin'   : 'Vào thư mục mới', // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : 'Tạo tập tin Text',
			'cmdopen'      : 'Mở',
			'cmdpaste'     : 'Dán',
			'cmdquicklook' : 'Xem trước',
			'cmdreload'    : 'Nạp lại',
			'cmdrename'    : 'Đổi tên',
			'cmdrm'        : 'Xóa',
			'cmdtrash'     : 'Vào thùng rác', //from v2.1.24 added 29.4.2017
			'cmdrestore'   : 'Khôi phục', //from v2.1.24 added 3.5.2017
			'cmdsearch'    : 'Tìm tập tin',
			'cmdup'        : 'Go to parent directory',
			'cmdupload'    : 'Tải tập tin lên',
			'cmdview'      : 'Xem',
			'cmdresize'    : 'Thay đổi kích thước và xoay',
			'cmdsort'      : 'Sắp xếp',
			'cmdnetmount'  : 'Mount network volume', // added 18.04.2012
			'cmdnetunmount': 'Gỡ mount', // from v2.1 added 30.04.2012
			'cmdplaces'    : 'To Places', // added 28.12.2014
			'cmdchmod'     : 'Thay đổi chế độ', // from v2.1 added 20.6.2015
			'cmdopendir'   : 'Mở một thư mục', // from v2.1 added 13.1.2016
			'cmdcolwidth'  : 'Đặt lại chiều rộng cột', // from v2.1.13 added 12.06.2016
			'cmdfullscreen': 'Toàn màn hình', // from v2.1.15 added 03.08.2016
			'cmdmove'      : 'Di chuyển', // from v2.1.15 added 21.08.2016
			'cmdempty'     : 'Làm rỗng thư mục', // from v2.1.25 added 22.06.2017
			'cmdundo'      : 'Hủy bỏ (hoàn tác)', // from v2.1.27 added 31.07.2017
			'cmdredo'      : 'Làm lại', // from v2.1.27 added 31.07.2017
			'cmdpreference': 'Preferences', // from v2.1.27 added 03.08.2017
			'cmdselectall' : 'Chọn tất cả', // from v2.1.28 added 15.08.2017
			'cmdselectnone': 'Không chọn gì', // from v2.1.28 added 15.08.2017
			'cmdselectinvert': 'Chọn ngược lại', // from v2.1.28 added 15.08.2017
			'cmdopennew'   : 'Mở trong cửa sổ mới', // from v2.1.38 added 3.4.2018
			'cmdhide'      : 'Ẩn (Preference)', // from v2.1.41 added 24.7.2018

			/*********************************** buttons ***********************************/
			'btnClose'  : 'Đóng',
			'btnSave'   : 'Lưu',
			'btnRm'     : 'Gỡ bỏ',
			'btnApply'  : 'Áp dụng',
			'btnCancel' : 'Hủy bỏ',
			'btnNo'     : 'Không',
			'btnYes'    : 'Đồng ý',
			'btnMount'  : 'Mount',  // added 18.04.2012
			'btnApprove': 'Goto $1 & approve', // from v2.1 added 26.04.2012
			'btnUnmount': 'Unmount', // from v2.1 added 30.04.2012
			'btnConv'   : 'Convert', // from v2.1 added 08.04.2014
			'btnCwd'    : 'Here',      // from v2.1 added 22.5.2015
			'btnVolume' : 'Volume',    // from v2.1 added 22.5.2015
			'btnAll'    : 'All',       // from v2.1 added 22.5.2015
			'btnMime'   : 'MIME Type', // from v2.1 added 22.5.2015
			'btnFileName':'Filename',  // from v2.1 added 22.5.2015
			'btnSaveClose': 'Save & Close', // from v2.1 added 12.6.2015
			'btnBackup' : 'Backup', // fromv2.1 added 28.11.2015
			'btnRename'    : 'Rename',      // from v2.1.24 added 6.4.2017
			'btnRenameAll' : 'Rename(All)', // from v2.1.24 added 6.4.2017
			'btnPrevious' : 'Prev ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnNext'     : 'Next ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnSaveAs'   : 'Save As', // from v2.1.25 added 24.5.2017

			/******************************** notifications ********************************/
			'ntfopen'     : 'Mở thư mục',
			'ntffile'     : 'Mở tập tin',
			'ntfreload'   : 'Nạp lại nội dung thư mục',
			'ntfmkdir'    : 'Tạo thư mục',
			'ntfmkfile'   : 'Tạo tập tin',
			'ntfrm'       : 'Xóa tập tin',
			'ntfcopy'     : 'Sao chép tập tin',
			'ntfmove'     : 'Di chuyển tập tin',
			'ntfprepare'  : 'Chuẩn bị để sao chép các tập tin',
			'ntfrename'   : 'Đổi tên tập tin',
			'ntfupload'   : 'Tải tập tin lên',
			'ntfdownload' : 'Tải tập tin',
			'ntfsave'     : 'Lưu tập tin',
			'ntfarchive'  : 'Tạo tập tin nén',
			'ntfextract'  : 'Giải nén tập tin',
			'ntfsearch'   : 'Tìm kiếm tập tin',
			'ntfresize'   : 'Resizing images',
			'ntfsmth'     : 'Doing something >_<',
			'ntfloadimg'  : 'Đang tải hình ảnh',
			'ntfnetmount' : 'Mounting network volume', // added 18.04.2012
			'ntfnetunmount': 'Unmounting network volume', // from v2.1 added 30.04.2012
			'ntfdim'      : 'Acquiring image dimension', // added 20.05.2013
			'ntfreaddir'  : 'Reading folder infomation', // from v2.1 added 01.07.2013
			'ntfurl'      : 'Getting URL of link', // from v2.1 added 11.03.2014
			'ntfchmod'    : 'Changing file mode', // from v2.1 added 20.6.2015
			'ntfpreupload': 'Verifying upload file name', // from v2.1 added 31.11.2015
			'ntfzipdl'    : 'Creating a file for download', // from v2.1.7 added 23.1.2016
			'ntfparents'  : 'Getting path infomation', // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': 'Processing the uploaded file', // from v2.1.17 added 2.11.2016
			'ntftrash'    : 'Doing throw in the trash', // from v2.1.24 added 2.5.2017
			'ntfrestore'  : 'Doing restore from the trash', // from v2.1.24 added 3.5.2017
			'ntfchkdir'   : 'Checking destination folder', // from v2.1.24 added 3.5.2017
			'ntfundo'     : 'Undoing previous operation', // from v2.1.27 added 31.07.2017
			'ntfredo'     : 'Redoing previous undone', // from v2.1.27 added 31.07.2017
			'ntfchkcontent' : 'Checking contents', // from v2.1.41 added 3.8.2018

			/*********************************** volumes *********************************/
			'volume_Trash' : 'Trash', //from v2.1.24 added 29.4.2017

			/************************************ dates **********************************/
			'dateUnknown' : 'Chưa biết',
			'Today'       : 'Hôm nay',
			'Yesterday'   : 'Hôm qua',
			'msJan'       : 'Tháng 1',
			'msFeb'       : 'Tháng 2',
			'msMar'       : 'Tháng 3',
			'msApr'       : 'Tháng 4',
			'msMay'       : 'Tháng 5',
			'msJun'       : 'Tháng 6',
			'msJul'       : 'Tháng 7',
			'msAug'       : 'Tháng 8',
			'msSep'       : 'Tháng 9',
			'msOct'       : 'Tháng 10',
			'msNov'       : 'Tháng 11',
			'msDec'       : 'Tháng 12',
			'January'     : 'Tháng 1',
			'February'    : 'Tháng 2',
			'March'       : 'Tháng 3',
			'April'       : 'Tháng 4',
			'May'         : 'Tháng 5',
			'June'        : 'Tháng 6',
			'July'        : 'Tháng 7',
			'August'      : 'Tháng 8',
			'September'   : 'Tháng 9',
			'October'     : 'Tháng 10',
			'November'    : 'Tháng 11',
			'December'    : 'Tháng 12',
			'Sunday'      : 'Chủ nhật',
			'Monday'      : 'Thứ 2',
			'Tuesday'     : 'Thứ 3',
			'Wednesday'   : 'Thứ 4',
			'Thursday'    : 'Thứ 5',
			'Friday'      : 'Thứ 6',
			'Saturday'    : 'Thứ 7',
			'Sun'         : 'Chủ nhật',
			'Mon'         : 'Thứ 2',
			'Tue'         : 'Thứ 3',
			'Wed'         : 'Thứ 4',
			'Thu'         : 'Thứ 5',
			'Fri'         : 'Thứ 6',
			'Sat'         : 'Thứ 7',

			/******************************** sort variants ********************************/
			'sortname'          : 'theo tên',
			'sortkind'          : 'theo loại',
			'sortsize'          : 'theo kích cỡ',
			'sortdate'          : 'theo ngày',
			'sortFoldersFirst'  : 'Thư mục đầu tiên',
			'sortperm'          : 'theo quyền hạn', // from v2.1.13 added 13.06.2016
			'sortmode'          : 'theo chế độ',       // from v2.1.13 added 13.06.2016
			'sortowner'         : 'theo người tạo',      // from v2.1.13 added 13.06.2016
			'sortgroup'         : 'theo nhóm',      // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : 'Also Treeview',  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'untitled file.txt' : 'NewFile.txt', // added 10.11.2015
			'untitled folder'   : 'NewFolder',   // added 10.11.2015
			'Archive'           : 'NewArchive',  // from v2.1 added 10.11.2015
			'untitled file'     : 'NewFile.$1',  // from v2.1.41 added 6.8.2018
			'extentionfile'     : '$1: File',    // from v2.1.41 added 6.8.2018
			'extentiontype'     : '$1: $2',      // from v2.1.43 added 17.10.2018

			/********************************** messages **********************************/
			'confirmReq'      : 'Yêu cầu xác nhận',
			'confirmRm'       : 'Bạn có chắc chắn muốn xóa vĩnh viễn các mục?<br/>  Điều này không thể được hoàn tác!',
			'confirmRepl'     : 'Thay tập tin cũ bằng tập tin mới? (Nếu nó chứa các thư mục, nó sẽ được hợp nhất. Để sao lưu và thay thế, chọn Sao lưu.)',
			'confirmRest'     : 'Thay thế mục hiện có bằng một mục trong thùng rác?', // fromv2.1.24 added 5.5.2017
			'confirmConvUTF8' : 'Not in UTF-8<br/>Convert to UTF-8?<br/>Contents become UTF-8 by saving after conversion.', // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : 'Character encoding of this file couldn\'t be detected. It need to temporarily convert to UTF-8 for editting.<br/>Please select character encoding of this file.', // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : 'It has been modified.<br/>Losing work if you do not save changes.', // from v2.1 added 15.7.2015
			'confirmTrash'    : 'Bạn có chắc chắn muốn chuyển các mục vào thùng rác?', //from v2.1.24 added 29.4.2017
			'confirmMove'     : 'Bạn có chắc chắn muốn chuyển các mục vào "$1"?', //from v2.1.50 added 27.7.2019
			'apllyAll'        : 'Áp dụng cho tất cả',
			'name'            : 'Tên',
			'size'            : 'Kích cỡ',
			'perms'           : 'Quyền',
			'modify'          : 'Sửa đổi',
			'kind'            : 'Loại',
			'read'            : 'đọc',
			'write'           : 'viết',
			'noaccess'        : 'không truy cập',
			'and'             : 'và',
			'unknown'         : 'không xác định',
			'selectall'       : 'Chọn tất cả các mục',
			'selectfiles'     : 'Chọn các mục',
			'selectffile'     : 'Chọn mục đầu tiên',
			'selectlfile'     : 'Chọn mục cuối cùng',
			'viewlist'        : 'Hiển thị danh sách',
			'viewicons'       : 'Hiển thị biểu tượng',
			'viewSmall'       : 'Biểu tượng nhỏ', // from v2.1.39 added 22.5.2018
			'viewMedium'      : 'Biểu tượng vừa', // from v2.1.39 added 22.5.2018
			'viewLarge'       : 'Biểu tượng lớn', // from v2.1.39 added 22.5.2018
			'viewExtraLarge'  : 'Biểu tượng cực lớn', // from v2.1.39 added 22.5.2018
			'places'          : 'Places',
			'calc'            : 'Tính toán',
			'path'            : 'Đường dẫn',
			'aliasfor'        : 'Bí danh cho',
			'locked'          : 'Đã khóa',
			'dim'             : 'Kích thước',
			'files'           : 'Tệp',
			'folders'         : 'Thư mục',
			'items'           : 'Items',
			'yes'             : 'yes',
			'no'              : 'no',
			'link'            : 'Liên kết',
			'searcresult'     : 'Kết quả tìm kiếm',
			'selected'        : 'mục đã chọn',
			'about'           : 'Về',
			'shortcuts'       : 'Lối tắt',
			'help'            : 'Giúp đỡ',
			'webfm'           : 'Web file manager',
			'ver'             : 'Phiên bản',
			'protocolver'     : 'phiên bản protocol',
			'homepage'        : 'Trang chủ dự án',
			'docs'            : 'Tài liệu',
			'github'          : 'Theo dõi chúng tôi trên GitHub',
			'twitter'         : 'Theo dõi chúng tôi trên Twitter',
			'facebook'        : 'Theo dõi chúng tôi trên Facebook',
			'team'            : 'Đội ngũ',
			'chiefdev'        : 'Trùm sò',
			'developer'       : 'người phát triển',
			'contributor'     : 'người đóng góp',
			'maintainer'      : 'người bảo trì',
			'translator'      : 'người dịch',
			'icons'           : 'Icons',
			'dontforget'      : 'and don\'t forget to take your towel',
			'shortcutsof'     : 'Shortcuts disabled',
			'dropFiles'       : 'Thả tệp vào đây',
			'or'              : 'hoặc',
			'selectForUpload' : 'Chọn tệp',
			'moveFiles'       : 'Di chuyển các mục',
			'copyFiles'       : 'Sao chép các mục',
			'restoreFiles'    : 'Khôi mục các mục', // from v2.1.24 added 5.5.2017
			'rmFromPlaces'    : 'Remove from places',
			'aspectRatio'     : 'Tỉ lệ khung hình',
			'scale'           : 'Tỉ lệ',
			'width'           : 'Rộng',
			'height'          : 'Cao',
			'resize'          : 'Thay đổi kích cỡ',
			'crop'            : 'Cắt',
			'rotate'          : 'Xoay',
			'rotate-cw'       : 'Xoay 90 độ CW',
			'rotate-ccw'      : 'Xoay 90 độ CCW',
			'degree'          : '°',
			'netMountDialogTitle' : 'Mount network volume', // added 18.04.2012
			'protocol'            : 'Protocol', // added 18.04.2012
			'host'                : 'Host', // added 18.04.2012
			'port'                : 'Port', // added 18.04.2012
			'user'                : 'User', // added 18.04.2012
			'pass'                : 'Password', // added 18.04.2012
			'confirmUnmount'      : 'Are you unmount $1?',  // from v2.1 added 30.04.2012
			'dropFilesBrowser': 'Drop or Paste files from browser', // from v2.1 added 30.05.2012
			'dropPasteFiles'  : 'Drop files, Paste URLs or images(clipboard) here', // from v2.1 added 07.04.2014
			'encoding'        : 'Mã hóa', // from v2.1 added 19.12.2014
			'locale'          : 'Địa phương',   // from v2.1 added 19.12.2014
			'searchTarget'    : 'Mục tiêu: $1',                // from v2.1 added 22.5.2015
			'searchMime'      : 'Tìm kiếm theo kiểu tệp (MIME)', // from v2.1 added 22.5.2015
			'owner'           : 'Chủ sở hữu', // from v2.1 added 20.6.2015
			'group'           : 'Nhóm', // from v2.1 added 20.6.2015
			'other'           : 'Khác', // from v2.1 added 20.6.2015
			'execute'         : 'Thực thi', // from v2.1 added 20.6.2015
			'perm'            : 'Quyền', // from v2.1 added 20.6.2015
			'mode'            : 'Chế độ', // from v2.1 added 20.6.2015
			'emptyFolder'     : 'Thư mục trống', // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : 'Thư mục trống\\A Kéo thả vào đây để thêm các mục', // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : 'Thư mục trống\\A Nhấn giữ để thêm các mục', // from v2.1.6 added 30.12.2015
			'quality'         : 'Chất lượng', // from v2.1.6 added 5.1.2016
			'autoSync'        : 'Tự động động bộ',  // from v2.1.6 added 10.1.2016
			'moveUp'          : 'Di chuyển lên',  // from v2.1.6 added 18.1.2016
			'getLink'         : 'Lấy liên kết URL', // from v2.1.7 added 9.2.2016
			'selectedItems'   : 'Các mục đã chọn ($1)', // from v2.1.7 added 2.19.2016
			'folderId'        : 'ID thư mục', // from v2.1.10 added 3.25.2016
			'offlineAccess'   : 'Cho phép truy cập ngoại tuyến', // from v2.1.10 added 3.25.2016
			'reAuth'          : 'Xác thực lại', // from v2.1.10 added 3.25.2016
			'nowLoading'      : 'Đang tải...', // from v2.1.12 added 4.26.2016
			'openMulti'       : 'Mở nhiều tập tin', // from v2.1.12 added 5.14.2016
			'openMultiConfirm': 'You are trying to open the $1 files. Are you sure you want to open in browser?', // from v2.1.12 added 5.14.2016
			'emptySearch'     : 'Kết quả tìm kiếm trống trong mục tiêu tìm kiếm.', // from v2.1.12 added 5.16.2016
			'editingFile'     : 'Nó là một tập tin đang chỉnh sửa.', // from v2.1.13 added 6.3.2016
			'hasSelected'     : 'You have selected $1 items.', // from v2.1.13 added 6.3.2016
			'hasClipboard'    : 'You have $1 items in the clipboard.', // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : 'Tìm kiếm gia tăng chỉ từ hiển thị hiện tại.', // from v2.1.13 added 6.30.2016
			'reinstate'       : 'Phục hồi', // from v2.1.15 added 3.8.2016
			'complete'        : '$1 hoàn thành', // from v2.1.15 added 21.8.2016
			'contextmenu'     : 'Trình đơn ngữ cảnh', // from v2.1.15 added 9.9.2016
			'pageTurning'     : 'Chuyển trang', // from v2.1.15 added 10.9.2016
			'volumeRoots'     : 'Volume roots', // from v2.1.16 added 16.9.2016
			'reset'           : 'Đặt lại', // from v2.1.16 added 1.10.2016
			'bgcolor'         : 'Màu nền', // from v2.1.16 added 1.10.2016
			'colorPicker'     : 'Chọn màu', // from v2.1.16 added 1.10.2016
			'8pxgrid'         : '8px Grid', // from v2.1.16 added 4.10.2016
			'enabled'         : 'Đã bật', // from v2.1.16 added 4.10.2016
			'disabled'        : 'Đã tắt', // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : 'Search results is empty in current view.\\APress [Enter] to expand search target.', // from v2.1.16 added 5.10.2016
			'emptyLetSearch'  : 'Kết quả tìm kiếm thư đầu tiên là trống trong chế độ xem hiện tại.', // from v2.1.23 added 24.3.2017
			'textLabel'       : 'Nhãn văn bản', // from v2.1.17 added 13.10.2016
			'minsLeft'        : '$1 mins left', // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : 'Reopen with selected encoding', // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : 'Save with the selected encoding', // from v2.1.19 added 2.12.2016
			'selectFolder'    : 'Chọn thư mục', // from v2.1.20 added 13.12.2016
			'firstLetterSearch': 'First letter search', // from v2.1.23 added 24.3.2017
			'presets'         : 'Đặt trước', // from v2.1.25 added 26.5.2017
			'tooManyToTrash'  : 'Có quá nhiều mục vì vậy không thể cho vào thùng rác.', // from v2.1.25 added 9.6.2017
			'TextArea'        : 'TextArea', // from v2.1.25 added 14.6.2017
			'folderToEmpty'   : 'Empty the folder "$1".', // from v2.1.25 added 22.6.2017
			'filderIsEmpty'   : 'There are no items in a folder "$1".', // from v2.1.25 added 22.6.2017
			'preference'      : 'Preference', // from v2.1.26 added 28.6.2017
			'language'        : 'Ngôn ngữ', // from v2.1.26 added 28.6.2017
			'clearBrowserData': 'Initialize the settings saved in this browser', // from v2.1.26 added 28.6.2017
			'toolbarPref'     : 'Cài đặt thanh công cụ', // from v2.1.27 added 2.8.2017
			'charsLeft'       : '... $1 chars left.',  // from v2.1.29 added 30.8.2017
			'sum'             : 'Sum', // from v2.1.29 added 28.9.2017
			'roughFileSize'   : 'Rough file size', // from v2.1.30 added 2.11.2017
			'autoFocusDialog' : 'Focus on the element of dialog with mouseover',  // from v2.1.30 added 2.11.2017
			'select'          : 'Select', // from v2.1.30 added 23.11.2017
			'selectAction'    : 'Action when select file', // from v2.1.30 added 23.11.2017
			'useStoredEditor' : 'Open with the editor used last time', // from v2.1.30 added 23.11.2017
			'selectinvert'    : 'Invert selection', // from v2.1.30 added 25.11.2017
			'renameMultiple'  : 'Are you sure you want to rename $1 selected items like $2?<br/>This cannot be undone!', // from v2.1.31 added 4.12.2017
			'batchRename'     : 'Batch rename', // from v2.1.31 added 8.12.2017
			'plusNumber'      : '+ Number', // from v2.1.31 added 8.12.2017
			'asPrefix'        : 'Thêm tiền tố', // from v2.1.31 added 8.12.2017
			'asSuffix'        : 'Thêm hậu tố', // from v2.1.31 added 8.12.2017
			'changeExtention' : 'Thay đổi phần mở rộng', // from v2.1.31 added 8.12.2017
			'columnPref'      : 'Columns settings (List view)', // from v2.1.32 added 6.2.2018
			'reflectOnImmediate' : 'All changes will reflect immediately to the archive.', // from v2.1.33 added 2.3.2018
			'reflectOnUnmount'   : 'Any changes will not reflect until un-mount this volume.', // from v2.1.33 added 2.3.2018
			'unmountChildren' : 'The following volume(s) mounted on this volume also unmounted. Are you sure to unmount it?', // from v2.1.33 added 5.3.2018
			'selectionInfo'   : 'Selection Info', // from v2.1.33 added 7.3.2018
			'hashChecker'     : 'Algorithms to show the file hash', // from v2.1.33 added 10.3.2018
			'infoItems'       : 'Info Items (Selection Info Panel)', // from v2.1.38 added 28.3.2018
			'pressAgainToExit': 'Nhấn một lần nữa để thoát.', // from v2.1.38 added 1.4.2018
			'toolbar'         : 'Toolbar', // from v2.1.38 added 4.4.2018
			'workspace'       : 'Work Space', // from v2.1.38 added 4.4.2018
			'dialog'          : 'Dialog', // from v2.1.38 added 4.4.2018
			'all'             : 'All', // from v2.1.38 added 4.4.2018
			'iconSize'        : 'Icon Size (Icons view)', // from v2.1.39 added 7.5.2018
			'editorMaximized' : 'Open the maximized editor window', // from v2.1.40 added 30.6.2018
			'editorConvNoApi' : 'Because conversion by API is not currently available, please convert on the website.', //from v2.1.40 added 8.7.2018
			'editorConvNeedUpload' : 'After conversion, you must be upload with the item URL or a downloaded file to save the converted file.', //from v2.1.40 added 8.7.2018
			'convertOn'       : 'Convert on the site of $1', // from v2.1.40 added 10.7.2018
			'integrations'    : 'Integrations', // from v2.1.40 added 11.7.2018
			'integrationWith' : 'This elFinder has the following external services integrated. Please check the terms of use, privacy policy, etc. before using it.', // from v2.1.40 added 11.7.2018
			'showHidden'      : 'Show hidden items', // from v2.1.41 added 24.7.2018
			'hideHidden'      : 'Hide hidden items', // from v2.1.41 added 24.7.2018
			'toggleHidden'    : 'Show/Hide hidden items', // from v2.1.41 added 24.7.2018
			'makefileTypes'   : 'File types to enable with "New file"', // from v2.1.41 added 7.8.2018
			'typeOfTextfile'  : 'Type of the Text file', // from v2.1.41 added 7.8.2018
			'add'             : 'Add', // from v2.1.41 added 7.8.2018
			'theme'           : 'Theme', // from v2.1.43 added 19.10.2018
			'default'         : 'Default', // from v2.1.43 added 19.10.2018
			'description'     : 'Description', // from v2.1.43 added 19.10.2018
			'website'         : 'Website', // from v2.1.43 added 19.10.2018
			'author'          : 'Author', // from v2.1.43 added 19.10.2018
			'email'           : 'Email', // from v2.1.43 added 19.10.2018
			'license'         : 'License', // from v2.1.43 added 19.10.2018
			'exportToSave'    : 'This item can\'t be saved. To avoid losing the edits you need to export to your PC.', // from v2.1.44 added 1.12.2018
			'dblclickToSelect': 'Double click on the file to select it.', // from v2.1.47 added 22.1.2019
			'useFullscreen'   : 'Use fullscreen mode', // from v2.1.47 added 19.2.2019

			/********************************** mimetypes **********************************/
			'kindUnknown'     : 'Unknown',
			'kindRoot'        : 'Volume Root', // from v2.1.16 added 16.10.2016
			'kindFolder'      : 'Folder',
			'kindSelects'     : 'Selections', // from v2.1.29 added 29.8.2017
			'kindAlias'       : 'Alias',
			'kindAliasBroken' : 'Broken alias',
			// applications
			'kindApp'         : 'Application',
			'kindPostscript'  : 'Postscript document',
			'kindMsOffice'    : 'Microsoft Office document',
			'kindMsWord'      : 'Microsoft Word document',
			'kindMsExcel'     : 'Microsoft Excel document',
			'kindMsPP'        : 'Microsoft Powerpoint presentation',
			'kindOO'          : 'Open Office document',
			'kindAppFlash'    : 'Flash application',
			'kindPDF'         : 'Portable Document Format (PDF)',
			'kindTorrent'     : 'Bittorrent file',
			'kind7z'          : '7z archive',
			'kindTAR'         : 'TAR archive',
			'kindGZIP'        : 'GZIP archive',
			'kindBZIP'        : 'BZIP archive',
			'kindXZ'          : 'XZ archive',
			'kindZIP'         : 'ZIP archive',
			'kindRAR'         : 'RAR archive',
			'kindJAR'         : 'Java JAR file',
			'kindTTF'         : 'True Type font',
			'kindOTF'         : 'Open Type font',
			'kindRPM'         : 'RPM package',
			// texts
			'kindText'        : 'Text document',
			'kindTextPlain'   : 'Plain text',
			'kindPHP'         : 'PHP source',
			'kindCSS'         : 'Cascading style sheet',
			'kindHTML'        : 'HTML document',
			'kindJS'          : 'Javascript source',
			'kindRTF'         : 'Rich Text Format',
			'kindC'           : 'C source',
			'kindCHeader'     : 'C header source',
			'kindCPP'         : 'C++ source',
			'kindCPPHeader'   : 'C++ header source',
			'kindShell'       : 'Unix shell script',
			'kindPython'      : 'Python source',
			'kindJava'        : 'Java source',
			'kindRuby'        : 'Ruby source',
			'kindPerl'        : 'Perl script',
			'kindSQL'         : 'SQL source',
			'kindXML'         : 'XML document',
			'kindAWK'         : 'AWK source',
			'kindCSV'         : 'Comma separated values',
			'kindDOCBOOK'     : 'Docbook XML document',
			'kindMarkdown'    : 'Markdown text', // added 20.7.2015
			// images
			'kindImage'       : 'Image',
			'kindBMP'         : 'BMP image',
			'kindJPEG'        : 'JPEG image',
			'kindGIF'         : 'GIF Image',
			'kindPNG'         : 'PNG Image',
			'kindTIFF'        : 'TIFF image',
			'kindTGA'         : 'TGA image',
			'kindPSD'         : 'Adobe Photoshop image',
			'kindXBITMAP'     : 'X bitmap image',
			'kindPXM'         : 'Pixelmator image',
			// media
			'kindAudio'       : 'Audio media',
			'kindAudioMPEG'   : 'MPEG audio',
			'kindAudioMPEG4'  : 'MPEG-4 audio',
			'kindAudioMIDI'   : 'MIDI audio',
			'kindAudioOGG'    : 'Ogg Vorbis audio',
			'kindAudioWAV'    : 'WAV audio',
			'AudioPlaylist'   : 'MP3 playlist',
			'kindVideo'       : 'Video media',
			'kindVideoDV'     : 'DV movie',
			'kindVideoMPEG'   : 'MPEG movie',
			'kindVideoMPEG4'  : 'MPEG-4 movie',
			'kindVideoAVI'    : 'AVI movie',
			'kindVideoMOV'    : 'Quick Time movie',
			'kindVideoWM'     : 'Windows Media movie',
			'kindVideoFlash'  : 'Flash movie',
			'kindVideoMKV'    : 'Matroska movie',
			'kindVideoOGG'    : 'Ogg movie'
		}
	};
}));
