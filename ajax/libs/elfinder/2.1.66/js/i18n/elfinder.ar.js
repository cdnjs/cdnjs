/**
 * الترجمة العربية
 * @author Khamis Alqutob <alqutob@outlook.com>
 * @author Tawfek Daghistani <tawfekov@gmail.com>
 * @author Atef Ben Ali <atef.bettaib@gmail.com>
 * @version 2020-12-03
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
	elFinder.prototype.i18.ar = {
		translator : 'Khamis Alqutob &lt;alqutob@outlook.com&gt;, Tawfek Daghistani &lt;tawfekov@gmail.com&gt;, Atef Ben Ali &lt;atef.bettaib@gmail.com&gt;',
		language   : 'Arabic',
		direction  : 'rtl',
		dateFormat : 'M d, Y h:i A', // will show like: Aug 24, 2018 04:39 PM
		fancyDateFormat : '$1 h:i A', // will show like: Today 04:39 PM
		nonameDateFormat : 'ymd-His', // noname upload will show like: 180824-163916
		messages   : {

			/********************************** errors **********************************/
			'error'                : 'خطأ',
			'errUnknown'           : 'خطأ غير معروف .',
			'errUnknownCmd'        : 'أمر غير معروف .',
			'errJqui'              : 'تكوين jQuery UI غير صالح. يجب تضمين المكونات القابلة للتحديد والقابلة للسحب والإفلات',
			'errNode'              : 'يتطلب elFinder إنشاء عنصر DOM.',
			'errURL'               : 'تكوين elFinder غير صالح ! لم يتم تعيين خيار رابط URL',
			'errAccess'            : 'الوصول مرفوض .',
			'errConnect'           : 'تعذر الاتصال مع خادم الخلفية',
			'errAbort'             : 'تم فصل الإتصال',
			'errTimeout'           : 'نفذ وقت الاتصال.',
			'errNotFound'          : 'الخادوم الخلفي غير موجود .',
			'errResponse'          : 'رد غير مقبول من الخادوم الخلفي',
			'errConf'              : 'خطأ في الإعدادات الخاصة بالخادوم الخلفي ',
			'errJSON'              : 'موديول PHP JSON module غير مثبت ',
			'errNoVolumes'         : 'الأحجام المقروءة غير متوفرة',
			'errCmdParams'         : 'معلمات غير صالحة للأمر "$1".',
			'errDataNotJSON'       : 'البيانات ليست من نوع JSON ',
			'errDataEmpty'         : 'البيانات فارغة',
			'errCmdReq'            : 'الخادوم الخلفي يتطلب اسم الأمر ',
			'errOpen'              : 'غير قادر على فتح  "$1".',
			'errNotFolder'         : 'العنصر ليس مجلد',
			'errNotFile'           : 'العنصر ليس ملف',
			'errRead'              : 'غير قادر على قراءة "$1".',
			'errWrite'             : 'غير قادر على الكتابة في "$1".',
			'errPerm'              : 'وصول مرفوض ',
			'errLocked'            : '"$1" مقفل ولا يمكن إعادة تسميته أو نقله أو إزالته.',
			'errExists'            : 'العنصر الذي يحمل الاسم "$1" موجود مسبقاً.',
			'errInvName'           : 'اسم الملف غير صالح',
			'errInvDirname'        : 'اسم مجلد غير صالح',  // from v2.1.24 added 12.4.2017
			'errFolderNotFound'    : 'المجلد غير موجود',
			'errFileNotFound'      : 'الملف غير موجود',
			'errTrgFolderNotFound' : 'المجلد الهدف  "$1" غير موجود ',
			'errPopup'             : 'المتصفح منع من فتح نافذة منبثقة. لفتح ملف ، قم بتمكينه في خيارات المتصفح',
			'errMkdir'             : ' غير قادر على إنشاء مجلد "$1".',
			'errMkfile'            : ' غير قادر على إنشاء ملف "$1".',
			'errRename'            : 'غير قادر على إعادة تسمية  "$1".',
			'errCopyFrom'          : 'نسخ الملفات من الدليل "$1" غير مسموح.',
			'errCopyTo'            : 'نسخ الملفات إلى الدليل "$1" غير مسموح .',
			'errMkOutLink'         : 'تعذر إنشاء رابط إلى خارج جذر الدليل.', // from v2.1 added 03.10.2015
			'errUpload'            : 'خطأ في عملية الرفع.',  // old name - errUploadCommon
			'errUploadFile'        : 'غير قادر على رفع "$1".', // old name - errUpload
			'errUploadNoFiles'     : 'لم يتم العثور على ملفات للتحميل .',
			'errUploadTotalSize'   : 'البيانات تتجاوز الحد الأقصى للحجم المسموح به.', // old name - errMaxSize
			'errUploadFileSize'    : 'تجاوز الملف الحد الأقصى للحجم المسموح به.', //  old name - errFileMaxSize
			'errUploadMime'        : 'نوع الملف غير مسموح به.',
			'errUploadTransfer'    : '"$1" خطأ نقل.',
			'errUploadTemp'        : 'تعذر إنشاء ملف مؤقت للتحميل .', // from v2.1 added 26.09.2015
			'errNotReplace'        : 'الكائن "$1" موجود بالفعل في هذا الموقع ولا يمكن استبداله بكائن بنوع آخر.', // new
			'errReplace'           : 'غير قادر على استبدال "$1".',
			'errSave'              : 'غير قادر على حفظ "$1".',
			'errCopy'              : 'غير قادر على نسخ "$1".',
			'errMove'              : 'غير قادر على نقل "$1".',
			'errCopyInItself'      : 'غير قادر على نسخ "$1" داخل نفسه.',
			'errRm'                : 'غير قادر على إزالة "$1".',
			'errTrash'             : 'غير قادر في سلة المهملات', // from v2.1.24 added 30.4.2017
			'errRmSrc'             : 'تعذر إزالة ملف (ملفات) المصدر.',
			'errExtract'           : 'غير قادر على استخراج الملفات من "$1".',
			'errArchive'           : 'غير قادر على إنشاء ملف مضغوط.',
			'errArcType'           : 'نوع الملف المضغوط غير مدعوم.',
			'errNoArchive'         : 'هذا الملف ليس ملف مضغوط أو ذو صيغة غير مدعومة.',
			'errCmdNoSupport'      : 'الخادوم الخلفي لا يدعم هذا الأمر ',
			'errReplByChild'       : 'لا يمكن استبدال المجلد "$1" بعنصر محتوِ فيه.',
			'errArcSymlinks'       : 'لأسباب أمنية ، تم رفض فك ضغط الأرشيفات التي تحتوي على روابط رمزية أو ملفات بأسماء غير مسموح بها.', // edited 24.06.2012
			'errArcMaxSize'        : 'تتجاوز ملفات الأرشيف الحجم الأقصى المسموح به.',
			'errResize'            : 'تعذر تغيير حجم "$1".',
			'errResizeDegree'      : 'درجة تدوير غير صالحة.',  // added 7.3.2013
			'errResizeRotate'      : 'تعذر تدوير الصورة.',  // added 7.3.2013
			'errResizeSize'        : 'حجم الصورة غير صالح.',  // added 7.3.2013
			'errResizeNoChange'    : 'حجم الصورة لم يتغير.',  // added 7.3.2013
			'errUsupportType'      : 'نوع ملف غير مدعوم.',
			'errNotUTF8Content'    : 'الملف "$1" ليس بتنسيق UTF-8 ولا يمكن تحريره.',  // added 9.11.2011
			'errNetMount'          : 'غير قادر على التثبيت "$1".', // added 17.04.2012
			'errNetMountNoDriver'  : 'بروتوكول غير مدعوم.',     // added 17.04.2012
			'errNetMountFailed'    : 'فشل التثبيت.',         // added 17.04.2012
			'errNetMountHostReq'   : 'المضيف مطلوب.', // added 18.04.2012
			'errSessionExpires'    : 'انتهت جلسة العمل الخاصة بك بسبب عدم الفاعلية.',
			'errCreatingTempDir'   : 'تعذر إنشاء دليل مؤقت: "$1"',
			'errFtpDownloadFile'   : 'تعذر تنزيل الملف من FTP: "$1"',
			'errFtpUploadFile'     : 'تعذر تحميل الملف إلى FTP: "$1"',
			'errFtpMkdir'          : 'تعذر إنشاء دليل عن بعد في FTP: "$1"',
			'errArchiveExec'       : 'خطأ أثناء أرشفة الملفات: "$1"',
			'errExtractExec'       : 'خطأ أثناء استخراج الملفات: "$1"',
			'errNetUnMount'        : 'غير قادر على فك التثبيت.', // from v2.1 added 30.04.2012
			'errConvUTF8'          : 'غير قابل للتحويل إلى UTF-8', // from v2.1 added 08.04.2014
			'errFolderUpload'      : 'جرب المتصفح الحديث ، إذا كنت ترغب في تحميل المجلد.', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : 'انتهت المهلة أثناء البحث "$1". نتيجة البحث جزئية.', // from v2.1 added 12.1.2016
			'errReauthRequire'     : 'مطلوب إعادة التفويض.', // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : 'الحد الأقصى لعدد العناصر القابلة للتحديد هو $1.', // from v2.1.17 added 17.10.2016
			'errRestore'           : 'غير قادر على الاستعادة من سلة المهملات. لا يمكن تحديد وجهة الاستعادة.', // from v2.1.24 added 3.5.2017
			'errEditorNotFound'    : 'لم يتم العثور على المحرر لهذا النوع من الملفات.', // from v2.1.25 added 23.5.2017
			'errServerError'       : 'حدث خطأ من جانب الخادم.', // from v2.1.25 added 16.6.2017
			'errEmpty'             : 'تعذر إفراغ المجلد "$1".', // from v2.1.25 added 22.6.2017
			'moreErrors'           : 'يوجد $1 أخطاء إضافية.', // from v2.1.44 added 9.12.2018

			/******************************* commands names ********************************/
			'cmdarchive'   : 'إنشاء أرشيف',
			'cmdback'      : 'العودة',
			'cmdcopy'      : 'نسخ',
			'cmdcut'       : 'قص',
			'cmddownload'  : 'تنزيل',
			'cmdduplicate' : 'تكرار',
			'cmdedit'      : 'تحرير الملف',
			'cmdextract'   : 'إستخراج الملفات من الأرشيف',
			'cmdforward'   : 'الأمام',
			'cmdgetfile'   : 'اختيار الملفات',
			'cmdhelp'      : 'عن هذه البرمجية',
			'cmdhome'      : 'الجذر',
			'cmdinfo'      : 'الحصول على المعلومات ',
			'cmdmkdir'     : 'مجلد جديد',
			'cmdmkdirin'   : 'داخل مجلد جديد', // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : 'ملف جديد',
			'cmdopen'      : 'فتح',
			'cmdpaste'     : 'لصق',
			'cmdquicklook' : 'معاينة',
			'cmdreload'    : 'إعادة تحميل',
			'cmdrename'    : 'إعادة تسمية',
			'cmdrm'        : 'حذف',
			'cmdtrash'     : 'داخل سلة المهملات', //from v2.1.24 added 29.4.2017
			'cmdrestore'   : 'إستعادة', //from v2.1.24 added 3.5.2017
			'cmdsearch'    : 'بحث عن ملفات',
			'cmdup'        : 'انتقل إلى المجلد الأصل',
			'cmdupload'    : 'رفع ملفات',
			'cmdview'      : 'عرض',
			'cmdresize'    : 'تغيير الحجم والتدوير',
			'cmdsort'      : 'فرز',
			'cmdnetmount'  : 'تثبيت حجم الشبكة', // added 18.04.2012
			'cmdnetunmount': 'إلغاء التثبيت', // from v2.1 added 30.04.2012
			'cmdplaces'    : 'الى الاماكن', // added 28.12.2014
			'cmdchmod'     : 'تغيير النمط', // from v2.1 added 20.6.2015
			'cmdopendir'   : 'فتح مجلد', // from v2.1 added 13.1.2016
			'cmdcolwidth'  : 'إعادة تعيين عرض العمود', // from v2.1.13 added 12.06.2016
			'cmdfullscreen': 'ملء الشاشة', // from v2.1.15 added 03.08.2016
			'cmdmove'      : 'نقل', // from v2.1.15 added 21.08.2016
			'cmdempty'     : 'تفريغ المجلد', // from v2.1.25 added 22.06.2017
			'cmdundo'      : 'تراجع', // from v2.1.27 added 31.07.2017
			'cmdredo'      : 'إعادة', // from v2.1.27 added 31.07.2017
			'cmdpreference': 'التفضيلات', // from v2.1.27 added 03.08.2017
			'cmdselectall' : 'تحديد الكل', // from v2.1.28 added 15.08.2017
			'cmdselectnone': 'تحديد لا شيء', // from v2.1.28 added 15.08.2017
			'cmdselectinvert': 'عكس الاختيار', // from v2.1.28 added 15.08.2017
			'cmdopennew'   : 'فتح في نافذة جديدة', // from v2.1.38 added 3.4.2018
			'cmdhide'      : 'إخفاء (الأفضلية)', // from v2.1.41 added 24.7.2018

			/*********************************** buttons ***********************************/
			'btnClose'  : 'إغلاق',
			'btnSave'   : 'حفظ',
			'btnRm'     : 'إزالة',
			'btnApply'  : 'تطبيق',
			'btnCancel' : 'إلغاء',
			'btnNo'     : 'لا',
			'btnYes'    : 'نعم',
			'btnDiscard': 'Discard changes',
			'btnMount'  : 'تثبيت',  // added 18.04.2012
			'btnApprove': 'انتقل إلى $1 والموافقة', // from v2.1 added 26.04.2012
			'btnUnmount': 'إلغاء التثبيت', // from v2.1 added 30.04.2012
			'btnConv'   : 'تحويل', // from v2.1 added 08.04.2014
			'btnCwd'    : 'هنا',      // from v2.1 added 22.5.2015
			'btnVolume' : 'الحجم',    // from v2.1 added 22.5.2015
			'btnAll'    : 'الكل',       // from v2.1 added 22.5.2015
			'btnMime'   : 'نوع MIME', // from v2.1 added 22.5.2015
			'btnFileName':'إسم الملف',  // from v2.1 added 22.5.2015
			'btnSaveClose': 'حفظ وإغلاق', // from v2.1 added 12.6.2015
			'btnBackup' : 'نسخ احتياطي', // fromv2.1 added 28.11.2015
			'btnRename'    : 'إعادة تسمية',      // from v2.1.24 added 6.4.2017
			'btnRenameAll' : 'إعادة تسمية (الجميع)', // from v2.1.24 added 6.4.2017
			'btnPrevious' : '($1/$2) السابق', // from v2.1.24 added 11.5.2017
			'btnNext'     : '($1/$2) التالي', // from v2.1.24 added 11.5.2017
			'btnSaveAs'   : 'حفظ كــ', // from v2.1.25 added 24.5.2017

			/******************************** notifications ********************************/
			'ntfopen'     : 'فتح مجلد',
			'ntffile'     : 'فتح ملف',
			'ntfreload'   : 'إعادة تحميل محتوى المجلد',
			'ntfmkdir'    : 'إنشاء مجلد',
			'ntfmkfile'   : 'إنشاء ملفات',
			'ntfrm'       : 'حذف العناصر',
			'ntfcopy'     : 'نسخ العناصر',
			'ntfmove'     : 'نقل االعناصر',
			'ntfprepare'  : 'فحص العناصر الموجودة',
			'ntfrename'   : 'إعادة تسمية الملفات',
			'ntfupload'   : 'تحميل الملفات',
			'ntfdownload' : 'تنزيل الملفات',
			'ntfsave'     : 'حفظ الملفات',
			'ntfarchive'  : 'إنشاء أرشيف',
			'ntfextract'  : 'استخراج ملفات من الأرشيف',
			'ntfsearch'   : 'البحث في الملفات',
			'ntfresize'   : 'تغيير حجم الصور',
			'ntfsmth'     : 'القيام بشيء ما',
			'ntfloadimg'  : 'تحميل الصورة',
			'ntfnetmount' : 'تثبيت حجم الشبكة', // added 18.04.2012
			'ntfnetunmount': 'إلغاء تثبيت حجم الشبكة', // from v2.1 added 30.04.2012
			'ntfdim'      : 'اكتساب أبعاد الصورة', // added 20.05.2013
			'ntfreaddir'  : 'قراءة معلومات المجلد', // from v2.1 added 01.07.2013
			'ntfurl'      : 'الحصول على URL الرابط', // from v2.1 added 11.03.2014
			'ntfchmod'    : 'تغيير نمط الملف', // from v2.1 added 20.6.2015
			'ntfpreupload': 'التحقق من اسم ملف التحميل', // from v2.1 added 31.11.2015
			'ntfzipdl'    : 'إنشاء ملف للتنزيل', // from v2.1.7 added 23.1.2016
			'ntfparents'  : 'الحصول على معلومات المسار', // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': 'معالجة الملف المرفوع', // from v2.1.17 added 2.11.2016
			'ntftrash'    : 'القيام بالرمي في القمامة', // from v2.1.24 added 2.5.2017
			'ntfrestore'  : 'القيام بالاستعادة من سلة المهملات', // from v2.1.24 added 3.5.2017
			'ntfchkdir'   : 'التحقق من مجلد الوجهة', // from v2.1.24 added 3.5.2017
			'ntfundo'     : 'التراجع عن العملية السابقة', // from v2.1.27 added 31.07.2017
			'ntfredo'     : 'إعادة التراجع السابق', // from v2.1.27 added 31.07.2017
			'ntfchkcontent' : 'فحص المحتويات', // from v2.1.41 added 3.8.2018

			/*********************************** volumes *********************************/
			'volume_Trash' : 'Trash', //from v2.1.24 added 29.4.2017

			/************************************ dates **********************************/
			'dateUnknown' : 'غير معلوم',
			'Today'       : 'اليوم',
			'Yesterday'   : 'الأمس',
			'msJan'       : 'كانون الثاني',
			'msFeb'       : 'شباط',
			'msMar'       : 'آذار',
			'msApr'       : 'نيسان',
			'msMay'       : 'أيار',
			'msJun'       : 'حزيران',
			'msJul'       : 'تموز',
			'msAug'       : 'آب',
			'msSep'       : 'أيلول',
			'msOct'       : 'تشرين الأول',
			'msNov'       : 'تشرين الثاني',
			'msDec'       : 'كانون الأول ',
			'January'     : 'كانون الثاني',
			'February'    : 'شباط',
			'March'       : 'آذار',
			'April'       : 'نيسان',
			'May'         : 'أيار',
			'June'        : 'حزيران',
			'July'        : 'تموز',
			'August'      : 'آب',
			'September'   : 'أيلول',
			'October'     : 'تشرين الأول',
			'November'    : 'تشرين الثاني',
			'December'    : 'كانون الثاني',
			'Sunday'      : 'الأحد',
			'Monday'      : 'الاثنين',
			'Tuesday'     : 'الثلاثاء',
			'Wednesday'   : 'الإربعاء',
			'Thursday'    : 'الخميس',
			'Friday'      : 'الجمعة',
			'Saturday'    : 'السبت',
			'Sun'         : 'الأحد',
			'Mon'         : 'الاثنين',
			'Tue'         : 'الثلاثاء',
			'Wed'         : 'الإربعاء',
			'Thu'         : 'الخميس',
			'Fri'         : 'الجمعة',
			'Sat'         : 'السبت',

			/******************************** sort variants ********************************/
			'sortname'          : 'حسب الاسم',
			'sortkind'          : 'حسب النوع',
			'sortsize'          : 'حسب الحجم',
			'sortdate'          : 'حسب التاريخ',
			'sortFoldersFirst'  : 'المجلدات أولا',
			'sortperm'          : 'حسب الصلاحية', // from v2.1.13 added 13.06.2016
			'sortmode'          : 'حسب النمط',       // from v2.1.13 added 13.06.2016
			'sortowner'         : 'حسب المالك',      // from v2.1.13 added 13.06.2016
			'sortgroup'         : 'حسب المجموعة',      // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : 'أيضا عرض الشجرة',  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'file.txt بدون عنوان' : 'NewFile.txt', // added 10.11.2015
			'مجلد بلا عنوان'   : 'NewFolder',   // added 10.11.2015
			'Archive'           : 'NewArchive',  // from v2.1 added 10.11.2015
			'untitled file'     : 'NewFile.$1',  // from v2.1.41 added 6.8.2018
			'extentionfile'     : '$1: ملف',    // from v2.1.41 added 6.8.2018
			'extentiontype'     : '$1: $2',      // from v2.1.43 added 17.10.2018

			/********************************** messages **********************************/
			'confirmReq'      : 'التأكيد مطلوب',
			'confirmRm'       : 'هل تريد بالتأكيد إزالة العناصر نهائيًا؟ <br/> لا يمكن التراجع عن هذا الإجراء! ',
			'confirmRepl'     : 'استبدال الملف القديم بملف جديد؟ (إذا كان يحتوي على مجلدات ، فسيتم دمجه. للنسخ الاحتياطي والاستبدال ، حدد النسخ الاحتياطي.)',
			'confirmRest'     : 'هل تريد استبدال العنصر الموجود بالعنصر الموجود في المهملات؟', // fromv2.1.24 added 5.5.2017
			'confirmConvUTF8' : 'ليس بصيغة UTF-8<br/>التحويل إلى UTF-8؟<br/>تصبح المحتويات UTF-8 بالحفظ بعد التحويل.', // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : 'تعذر الكشف عن ترميز الأحرف لهذا الملف. تحتاج إلى التحويل مؤقتاً إلى UTF-8 للتحرير.<br/>الرجاء تحديد ترميز الأحرف لهذا الملف.', // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : 'لقد تم تعديله.<br/>قد تخسر العمل إذا لم تقم بحفظ التغييرات.', // from v2.1 added 15.7.2015
			'confirmTrash'    : 'هل أنت متأكد أنك تريد نقل العناصر إلى سلة المهملات؟', //from v2.1.24 added 29.4.2017
						'confirmMove'     : 'هل أنت متأكد أنك تريد نقل العناصر إلى "$1"?', //from v2.1.50 added 27.7.2019
			'apllyAll'        : 'تطبيق على الكل',
			'name'            : 'الاسم',
			'size'            : 'الحجم',
			'perms'           : 'الصلاحيات',
			'modify'          : 'التعديل',
			'kind'            : 'النوع',
			'read'            : 'قابل للقراءة',
			'write'           : 'قابل للكتابة',
			'noaccess'        : 'وصول ممنوع',
			'and'             : 'و',
			'unknown'         : 'غير معروف',
			'selectall'       : 'تحديد كل العناصر',
			'selectfiles'     : 'تحديد العناصر',
			'selectffile'     : 'تحديد العنصر الأول',
			'selectlfile'     : 'تحديد العنصر الأخير',
			'viewlist'        : 'عرض القائمة',
			'viewicons'       : 'عرض أيْقونات',
			'viewSmall'       : 'أيقونات صغيرة', // from v2.1.39 added 22.5.2018
			'viewMedium'      : 'أيقونات متوسطة', // from v2.1.39 added 22.5.2018
			'viewLarge'       : 'أيقونات كبيرة', // from v2.1.39 added 22.5.2018
			'viewExtraLarge'  : 'أيقونات كبيرة جداً', // from v2.1.39 added 22.5.2018
			'places'          : 'المواقع',
			'calc'            : 'حساب',
			'path'            : 'المسار',
			'aliasfor'        : 'اسم مستعار لـ',
			'locked'          : 'مقفل',
			'dim'             : 'الأبعاد',
			'files'           : 'ملفات',
			'folders'         : 'مجلدات',
			'items'           : 'عناصر',
			'yes'             : 'نعم',
			'no'              : 'لا',
			'link'            : 'الرابط',
			'searcresult'     : 'نتائج البحث',
			'selected'        : 'العناصر المحددة',
			'about'           : 'حول',
			'shortcuts'       : 'الاختصارات',
			'help'            : 'المساعدة',
			'webfm'           : 'مدير ملفات الويب',
			'ver'             : 'الإصدار',
			'protocolver'     : 'إصدار البرتوكول',
			'homepage'        : 'رئيسية المشروع',
			'docs'            : 'الوثائق',
			'github'          : 'شاركنا على Github',
			'twitter'         : 'تابعنا على تويتر',
			'facebook'        : 'انضم إلينا على الفيس بوك',
			'team'            : 'الفريق',
			'chiefdev'        : 'رئيس المبرمجين',
			'developer'       : 'مبرمج',
			'contributor'     : 'مساهم',
			'maintainer'      : 'مشرف',
			'translator'      : 'مترجم',
			'icons'           : 'أيقونات',
			'dontforget'      : 'ولا تنس أن تأخذ المنشفة',
			'shortcutsof'     : 'الاختصارات غير مفعلة',
			'dropFiles'       : 'إفلات الملفات هنا',
			'or'              : 'أو',
			'selectForUpload' : 'اختر الملفات',
			'moveFiles'       : 'نقل العناصر',
			'copyFiles'       : 'نسخ العناصر',
			'restoreFiles'    : 'استعادة العناصر', // from v2.1.24 added 5.5.2017
			'rmFromPlaces'    : 'إزالة من الأماكن',
			'aspectRatio'     : 'ابعاد متزنة',
			'scale'           : 'مقياس',
			'width'           : 'عرض',
			'height'          : 'طول',
			'resize'          : 'تغيير الحجم',
			'crop'            : 'قص',
			'rotate'          : 'تدوير',
			'rotate-cw'       : 'استدارة 90 درجة مع عقارب الساعة',
			'rotate-ccw'      : 'استدارة 90 درجة عكس عقارب الساعة',
			'degree'          : '°',
			'netMountDialogTitle' : 'تثبيت حجم الشبكة', // added 18.04.2012
			'protocol'            : 'البروتوكول', // added 18.04.2012
			'host'                : 'المضيف', // added 18.04.2012
			'port'                : 'المنفذ', // added 18.04.2012
			'user'                : 'المستخدم', // added 18.04.2012
			'pass'                : 'كلمة المرور', // added 18.04.2012
			'confirmUnmount'      : 'هل أنت متأكد من إلغاء تثبيت $1؟',  // from v2.1 added 30.04.2012
			'dropFilesBrowser': 'قم بإسقاط أو لصق الملفات من المتصفح', // from v2.1 added 30.05.2012
			'dropPasteFiles'  : 'قم بإسقاط الملفات أو لصق الروابط أو الصور (الحافظة) هنا', // from v2.1 added 07.04.2014
			'encoding'        : 'الترميز', // from v2.1 added 19.12.2014
			'locale'          : 'اللغة',   // from v2.1 added 19.12.2014
			'searchTarget'    : 'الهدف: $1',                // from v2.1 added 22.5.2015
			'searchMime'      : 'البحث عن طريق إدخال نوع MIME', // from v2.1 added 22.5.2015
			'owner'           : 'المالك', // from v2.1 added 20.6.2015
			'group'           : 'المجموعة', // from v2.1 added 20.6.2015
			'other'           : 'أخرى', // from v2.1 added 20.6.2015
			'execute'         : 'تنفيذ', // from v2.1 added 20.6.2015
			'perm'            : 'التصريح', // from v2.1 added 20.6.2015
			'mode'            : 'النمط', // from v2.1 added 20.6.2015
			'emptyFolder'     : 'المجلد فارغ', // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : 'المجلد فارغ\\إفلات لإضافة عناصر', // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : 'المجلد فارغ\\نقرة طويلة لإضافة العناصر', // from v2.1.6 added 30.12.2015
			'quality'         : 'النوعية', // from v2.1.6 added 5.1.2016
			'autoSync'        : 'مزامنة آلية',  // from v2.1.6 added 10.1.2016
			'moveUp'          : 'تحريك لأعلى',  // from v2.1.6 added 18.1.2016
			'getLink'         : 'الحصول على رابط URL', // from v2.1.7 added 9.2.2016
			'selectedItems'   : 'العناصر المحددة ($1)', // from v2.1.7 added 2.19.2016
			'folderId'        : 'معرف المجلد', // from v2.1.10 added 3.25.2016
			'offlineAccess'   : 'السماح بالوصول دون اتصال', // from v2.1.10 added 3.25.2016
			'reAuth'          : 'لإعادة المصادقة', // from v2.1.10 added 3.25.2016
			'nowLoading'      : 'جاري التحميل الآن...', // from v2.1.12 added 4.26.2016
			'openMulti'       : 'فتح ملفات متعددة', // from v2.1.12 added 5.14.2016
			'openMultiConfirm': 'أنت تحاول فتح  $1 ملف. هل أنت متأكد أنك تريد الفتح في المتصفح؟', // from v2.1.12 added 5.14.2016
			'emptySearch'     : 'نتائج البحث فارغة في هدف البحث.', // from v2.1.12 added 5.16.2016
			'editingFile'     : 'إنها تقوم بتحرير ملف.', // from v2.1.13 added 6.3.2016
			'hasSelected'     : 'لقد قمت بتحديد $1 عناصر.', // from v2.1.13 added 6.3.2016
			'hasClipboard'    : 'يوجد لديك $1 عناصر في الحافظة.', // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : 'البحث المتزايد هو فقط من العرض الحالي.', // from v2.1.13 added 6.30.2016
			'reinstate'       : 'إعادة', // from v2.1.15 added 3.8.2016
			'complete'        : '$1 إكتمل', // from v2.1.15 added 21.8.2016
			'contextmenu'     : 'قائمة السياق', // from v2.1.15 added 9.9.2016
			'pageTurning'     : 'قلب الصفحة', // from v2.1.15 added 10.9.2016
			'volumeRoots'     : 'جذور الحجم', // from v2.1.16 added 16.9.2016
			'reset'           : 'إعادة تعيين', // from v2.1.16 added 1.10.2016
			'bgcolor'         : 'لون الخلفية', // from v2.1.16 added 1.10.2016
			'colorPicker'     : 'أداة انتقاء اللون', // from v2.1.16 added 1.10.2016
			'8pxgrid'         : 'شبكة 8 بكسل', // from v2.1.16 added 4.10.2016
			'enabled'         : 'مفعل', // from v2.1.16 added 4.10.2016
			'disabled'        : 'معطل', // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : 'نتائج البحث فارغة في العرض الحالي. \\ اضغط على [Enter] لتوسيع هدف البحث.', // from v2.1.16 added 5.10.2016
			'emptyLetSearch'  : 'نتائج البحث الحرف الأول فارغة في العرض الحالي.', // from v2.1.23 added 24.3.2017
			'textLabel'       : 'تسمية نصية', // from v2.1.17 added 13.10.2016
			'minsLeft'        : '$1 دقائق باقية', // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : 'إعادة فتح مع الترميز المحدد', // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : 'حفظ مع الترميز المحدد', // from v2.1.19 added 2.12.2016
			'selectFolder'    : 'تحديد مجلد', // from v2.1.20 added 13.12.2016
			'firstLetterSearch': 'البحث بالحرف الأول', // from v2.1.23 added 24.3.2017
			'presets'         : 'الإعدادات المسبقة', // from v2.1.25 added 26.5.2017
			'tooManyToTrash'  : 'هناك عدد كبير جداً من العناصر لذا لا يمكن وضعها في سلة المهملات.', // from v2.1.25 added 9.6.2017
			'TextArea'        : 'منطقة النص', // from v2.1.25 added 14.6.2017
			'folderToEmpty'   : 'إفراغ المجلد "$1".', // from v2.1.25 added 22.6.2017
			'filderIsEmpty'   : 'لا توجد عناصر في مجلد "$1".', // from v2.1.25 added 22.6.2017
			'preference'      : 'الأفضلية', // from v2.1.26 added 28.6.2017
			'language'        : 'اللغة', // from v2.1.26 added 28.6.2017
			'clearBrowserData': 'تهيئة الإعدادات المحفوظة في هذا المتصفح', // from v2.1.26 added 28.6.2017
			'toolbarPref'     : 'إعدادات شريط الأدوات', // from v2.1.27 added 2.8.2017
			'charsLeft'       : '... $1 حروف متبقية.',  // from v2.1.29 added 30.8.2017
			'linesLeft'       : '... $1 سطور متبقية.',  // from v2.1.52 added 16.1.2020
			'sum'             : 'المجموع', // from v2.1.29 added 28.9.2017
			'roughFileSize'   : 'حجم ملف تقريبي', // from v2.1.30 added 2.11.2017
			'autoFocusDialog' : 'التركيز على عنصر الحوار مع تمرير الماوس',  // from v2.1.30 added 2.11.2017
			'select'          : 'حدد', // from v2.1.30 added 23.11.2017
			'selectAction'    : 'الإجراء عند تحديد الملف', // from v2.1.30 added 23.11.2017
			'useStoredEditor' : 'الفتح باستخدام المحرر المستخدم آخر مرة', // from v2.1.30 added 23.11.2017
			'selectinvert'    : 'عكس الاختيار', // from v2.1.30 added 25.11.2017
			'renameMultiple'  : 'هل أنت متأكد أنك تريد إعادة تسمية $1 عناصر محددة مثل $2؟<br/>هذا لا يمكن التراجع عنه !', // from v2.1.31 added 4.12.2017
			'batchRename'     : 'إعادة تسمية الحزمة', // from v2.1.31 added 8.12.2017
			'plusNumber'      : '+ رقم', // from v2.1.31 added 8.12.2017
			'asPrefix'        : 'إضافة بادئة', // from v2.1.31 added 8.12.2017
			'asSuffix'        : 'إضافة لاحقة', // from v2.1.31 added 8.12.2017
			'changeExtention' : 'تغيير الامتداد', // from v2.1.31 added 8.12.2017
			'columnPref'      : 'إعدادات الأعمدة (عرض القائمة)', // from v2.1.32 added 6.2.2018
			'reflectOnImmediate' : 'ستنعكس جميع التغييرات على الفور على الأرشيف.', // from v2.1.33 added 2.3.2018
			'reflectOnUnmount'   : 'لن تنعكس أي تغييرات حتى يتم فك هذا المجلد.', // from v2.1.33 added 2.3.2018
			'unmountChildren' : 'المجلد (المجلدات) التالية المركبة على هذا المجلد غير مثبتة أيضاً. هل أنت متأكد من إلغاء تحميله؟', // from v2.1.33 added 5.3.2018
			'selectionInfo'   : 'معلومات التحديد', // from v2.1.33 added 7.3.2018
			'hashChecker'     : 'خوارزميات لإظهار تجزئة الملف', // from v2.1.33 added 10.3.2018
			'infoItems'       : 'عناصر المعلومات (لوحة معلومات التحديد)', // from v2.1.38 added 28.3.2018
			'pressAgainToExit': 'اضغط مرة أخرى للخروج.', // from v2.1.38 added 1.4.2018
			'toolbar'         : 'شريط الأدوات', // from v2.1.38 added 4.4.2018
			'workspace'       : 'مساحة العمل', // from v2.1.38 added 4.4.2018
			'dialog'          : 'الحوار', // from v2.1.38 added 4.4.2018
			'all'             : 'الكل', // from v2.1.38 added 4.4.2018
			'iconSize'        : 'حجم الأيقونة (عرض الأيقونات)', // from v2.1.39 added 7.5.2018
			'editorMaximized' : 'افتح نافذة المحرر المكبرة', // from v2.1.40 added 30.6.2018
			'editorConvNoApi' : 'نظراً لعدم توفر التحويل بواسطة API حالياً ، يرجى التحويل على موقع الويب.', //from v2.1.40 added 8.7.2018
			'editorConvNeedUpload' : 'بعد التحويل ، يجب أن تقوم بالتحميل مع عنوان رابط العنصر أو الملف الذي تم تنزيله لحفظ الملف المحول.', //from v2.1.40 added 8.7.2018
			'convertOn'       : 'تحويل على موقع $1', // from v2.1.40 added 10.7.2018
			'integrations'    : 'تكاملات', // from v2.1.40 added 11.7.2018
			'integrationWith' : 'يحتوي elFinder على الخدمات الخارجية التالية المتكاملة. يرجى التحقق من شروط الاستخدام وسياسة الخصوصية وما إلى ذلك قبل استخدامها.', // from v2.1.40 added 11.7.2018
			'showHidden'      : 'إظهار العناصر المخفية', // from v2.1.41 added 24.7.2018
			'hideHidden'      : 'إخفاء العناصر المخفية', // from v2.1.41 added 24.7.2018
			'toggleHidden'    : 'إظهار / إخفاء العناصر المخفية', // from v2.1.41 added 24.7.2018
			'makefileTypes'   : 'أنواع الملفات لتفعيلها مع "ملف جديد"', // from v2.1.41 added 7.8.2018
			'typeOfTextfile'  : 'نوع الملف النصي', // from v2.1.41 added 7.8.2018
			'add'             : 'إضافة', // from v2.1.41 added 7.8.2018
			'theme'           : 'الثيم', // from v2.1.43 added 19.10.2018
			'default'         : 'الافتراضي', // from v2.1.43 added 19.10.2018
			'description'     : 'الوصف', // from v2.1.43 added 19.10.2018
			'website'         : 'الموقع الالكتروني', // from v2.1.43 added 19.10.2018
			'author'          : 'المؤلف', // from v2.1.43 added 19.10.2018
			'email'           : 'البريد الالكتروني', // from v2.1.43 added 19.10.2018
			'license'         : 'الرخصة', // from v2.1.43 added 19.10.2018
			'exportToSave'    : 'لا يمكن حفظ هذا العنصر. لتجنب فقدان التحريرات التي تحتاجها للتصدير إلى جهاز الكمبيوتر الخاص بك.', // from v2.1.44 added 1.12.2018
			'dblclickToSelect': 'انقر نقراً مزدوجاً فوق الملف لتحديده.', // from v2.1.47 added 22.1.2019
			'useFullscreen'   : 'استخدام وضع ملء الشاشة', // from v2.1.47 added 19.2.2019

			/********************************** mimetypes **********************************/
			'kindUnknown'     : 'غير معروف',
			'kindRoot'        : 'جذر الحجم', // from v2.1.16 added 16.10.2016
			'kindFolder'      : 'مجلد',
			'kindSelects'     : 'مختارات', // from v2.1.29 added 29.8.2017
			'kindAlias'       : 'اسم مستعار',
			'kindAliasBroken' : 'اسم مستعار مكسور',
			// applications
			'kindApp'         : 'التطبيق',
			'kindPostscript'  : 'وثيقة Postscript',
			'kindMsOffice'    : 'وثيقة Microsoft Office',
			'kindMsWord'      : 'وثيقة Microsoft Word',
			'kindMsExcel'     : 'وثيقة Microsoft Excel',
			'kindMsPP'        : 'عرض تقديمي Microsoft Powerpoint',
			'kindOO'          : 'وثيقة Open Office',
			'kindAppFlash'    : 'تطبيق فلاش',
			'kindPDF'         : 'تنسيق الوثائق المحمولة (PDF)',
			'kindTorrent'     : 'ملف Bittorrent ',
			'kind7z'          : 'أرشيف  7z',
			'kindTAR'         : 'أرشيف TAR',
			'kindGZIP'        : 'أرشيف GZIP',
			'kindBZIP'        : 'أرشيف BZIP',
			'kindXZ'          : 'أرشيف XZ',
			'kindZIP'         : 'أرشيف ZIP',
			'kindRAR'         : 'أرشيف RAR',
			'kindJAR'         : 'أرشيف Java JAR',
			'kindTTF'         : 'خط True Type ',
			'kindOTF'         : 'خط Open Type ',
			'kindRPM'         : 'حزمة RPM',
			// fonts
			'kindFont'        : 'خط',
			'kindSFNT'        : 'خط SFNT',
			'kindEOT'         : 'خط Embedded Open Type',
			'kindWOFF'        : 'خط Web Open Font Format',
			'kindWOFF2'       : 'خط Web Open Font Format 2',
			// texts
			'kindText'        : 'وثيقة نصية',
			'kindTextPlain'   : 'نص عادي',
			'kindPHP'         : 'مصدر PHP',
			'kindCSS'         : 'ورقة الأنماط المتتالية',
			'kindHTML'        : 'وثيقة HTML',
			'kindJS'          : 'مصدر Javascript',
			'kindRTF'         : 'Rich Text Format',
			'kindC'           : 'مصدر C',
			'kindCHeader'     : 'مصدر C header',
			'kindCPP'         : 'مصدر C++',
			'kindCPPHeader'   : 'مصدر C++ header',
			'kindShell'       : 'مصدر Unix shell',
			'kindPython'      : 'مصدر Python',
			'kindJava'        : 'مصدر Java',
			'kindRuby'        : 'مصدر Ruby',
			'kindPerl'        : 'مصدر Perl',
			'kindSQL'         : 'مصدر SQL',
			'kindXML'         : 'وثيقة XML',
			'kindAWK'         : 'مصدر AWK',
			'kindCSV'         : 'ملف CSV',
			'kindDOCBOOK'     : 'وثيقة Docbook XML',
			'kindMarkdown'    : 'نص Markdown', // added 20.7.2015
			// images
			'kindImage'       : 'صورة',
			'kindBMP'         : 'صورة BMP',
			'kindJPEG'        : 'صورة JPEG',
			'kindGIF'         : 'صورة GIF',
			'kindPNG'         : 'صورة PNG',
			'kindTIFF'        : 'صورة TIFF',
			'kindTGA'         : 'صورة TGA',
			'kindPSD'         : 'صورة Adobe Photoshop',
			'kindXBITMAP'     : 'صورة X bitmap',
			'kindPXM'         : 'صورة Pixelmator',
			// media
			'kindAudio'       : 'وسائط صوت',
			'kindAudioMPEG'   : 'ملف صوتي MPEG ',
			'kindAudioMPEG4'  : 'ملف صوتي MPEG-4',
			'kindAudioMIDI'   : 'ملف صوتي MIDI',
			'kindAudioOGG'    : 'ملف صوتي Ogg Vorbis',
			'kindAudioWAV'    : 'ملف صوتي WAV',
			'AudioPlaylist'   : 'قائمة تشغيل MP3',
			'kindVideo'       : 'وسائط فيديو',
			'kindVideoDV'     : 'ملف فيديو DV',
			'kindVideoMPEG'   : 'ملف فيديو MPEG',
			'kindVideoMPEG4'  : 'ملف فيديو MPEG-4',
			'kindVideoAVI'    : 'ملف فيديو AVI',
			'kindVideoMOV'    : 'ملف فيديو Quick Time',
			'kindVideoWM'     : 'ملف فيديو Windows Media',
			'kindVideoFlash'  : 'ملف فيديو Flash',
			'kindVideoMKV'    : 'ملف فيديو Matroska',
			'kindVideoOGG'    : 'ملف فيديو Ogg'
		}
	};
}));
