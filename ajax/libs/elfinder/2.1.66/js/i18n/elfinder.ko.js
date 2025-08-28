/**
 * Korea-한국어 translation
 * @author Hwang Ahreum; <luckmagic@naver.com>
 * @author Park Sungyong; <sungyong@gmail.com>
 * @author Yeonjeong Woo <eat_sweetly@naver.com>
 * @author Kwon Hyungjoo <hyung778@gmail.com>
 * @version 2024-03-19
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
	elFinder.prototype.i18.ko = {
		translator : 'Hwang Ahreum; &lt;luckmagic@naver.com&gt;, Park Sungyong; &lt;sungyong@gmail.com&gt;, Yeonjeong Woo &lt;eat_sweetly@naver.com&gt;, Kwon Hyungjoo &lt;hyung778@gmail.com&gt;',
		language   : 'Korea-한국어',
		direction  : 'ltr',
		dateFormat : 'Y-m-d H:i', // will show like: 2024-03-19 16:27
		fancyDateFormat : '$1 H:i', // will show like: 오늘 16:27
		nonameDateFormat : 'ymd-His', // noname upload will show like: 240319-162748
		messages   : {

			/********************************** errors **********************************/
			'error'                : '오류',
			'errUnknown'           : '알 수 없는 오류.',
			'errUnknownCmd'        : '알 수 없는 명령어.',
			'errJqui'              : 'jQuery UI 설정이 올바르지 않습니다. Selectable, draggable 및 droppable 구성 요소가 포함되어 있어야 합니다.',
			'errNode'              : 'elFinder를 생성하기 위해서는 DOM Element를 요구합니다.',
			'errURL'               : 'elFinder 환경설정이 올바르지 않습니다! URL 옵션이 설정되지 않았습니다.',
			'errAccess'            : '접근 제한.',
			'errConnect'           : 'Backend에 연결할 수 없습니다.',
			'errAbort'             : '연결 실패.',
			'errTimeout'           : '연결시간 초과.',
			'errNotFound'          : 'Backend를 찾을 수 없습니다.',
			'errResponse'          : 'Backend가 응답하지 않습니다.',
			'errConf'              : 'Backend 환경설정이 올바르지 않습니다.',
			'errJSON'              : 'PHP JSON 모듈이 설치되지 않았습니다.',
			'errNoVolumes'         : '읽을 수 있는 볼륨이 없습니다.',
			'errCmdParams'         : '"$1" 명령에 잘못된 매개 변수가 있습니다.',
			'errDataNotJSON'       : '데이터가 JSON이 아닙니다.',
			'errDataEmpty'         : '데이터가 비어있습니다.',
			'errCmdReq'            : 'Backend 요청에는 명령어 이름이 필요합니다.',
			'errOpen'              : '"$1"을(를) 열 수 없습니다.',
			'errNotFolder'         : '폴더가 아닙니다.',
			'errNotFile'           : '파일이 아닙니다.',
			'errRead'              : '"$1"을(를) 읽을 수 없습니다.',
			'errWrite'             : '"$1"에 쓸 수 없습니다.',
			'errPerm'              : '권한이 없습니다.',
			'errLocked'            : '"$1"이(가) 잠겨 있습니다, 이동, 삭제가 불가능합니다',
			'errExists'            : '이미 "$1"파일이 존재합니다.',
			'errInvName'           : '파일명에 올바르지 않은 문자가 포함되었습니다.',
			'errInvDirname'        : '폴더명에 올바르지 않은 문자가 포함되었습니다.',  // from v2.1.24 added 12.4.2017
			'errFolderNotFound'    : '폴더를 찾을 수 없습니다.',
			'errFileNotFound'      : '파일을 찾을 수 없습니다.',
			'errTrgFolderNotFound' : '"$1" 폴더를 찾을 수 없습니다.',
			'errPopup'             : '브라우저에서 팝업을 차단하였습니다. 팝업을 허용하려면 브라우저 옵션을 변경하세요.',
			'errMkdir'             : '"$1" 폴더를 생성할 수 없습니다.',
			'errMkfile'            : '"$1" 파일을 생성할 수 없습니다.',
			'errRename'            : '"$1"의 이름을 변경할 수 없습니다.',
			'errCopyFrom'          : '볼률 "$1"으(로)부터 파일을 복사할 수 없습니다.',
			'errCopyTo'            : '볼률 "$1"에 파일을 복사할 수 없습니다.',
			'errMkOutLink'         : 'root 볼륨 외부에 링크를 만들 수 없습니다.', // from v2.1 added 03.10.2015
			'errUpload'            : '업로드 오류.',  // old name - errUploadCommon
			'errUploadFile'        : '"$1"을(를) 업로드할 수 없습니다.', // old name - errUpload
			'errUploadNoFiles'     : '업로드할 파일이 없습니다.',
			'errUploadTotalSize'   : '데이터가 허용된 최대크기를 초과하였습니다.', // old name - errMaxSize
			'errUploadFileSize'    : '파일이 허용된 최대크기를 초과하였습니다.', //  old name - errFileMaxSize
			'errUploadMime'        : '잘못된 파일형식입니다.',
			'errUploadTransfer'    : '"$1" 전송 오류.',
			'errUploadTemp'        : '업로드에 필요한 임시파일 생성을 할 수 없습니다.', // from v2.1 added 26.09.2015
			'errNotReplace'        : '"$1"개체가 현재 위치에 이미 존재하며 다른 유형의 개체로 대체 할 수 없습니다.', // new
			'errReplace'           : '"$1"을(를) 변경할 수 없습니다.',
			'errSave'              : '"$1"을(를) 저장할 수 없습니다.',
			'errCopy'              : '"$1"을(를) 복사할 수 없습니다.',
			'errMove'              : '"$1"을(를) 이동할 수 없습니다.',
			'errCopyInItself'      : '"$1"을(를) 자기 자신에게 복사할 수 없습니다.',
			'errRm'                : '"$1"의 이름을 변경할 수 없습니다.',
			'errTrash'             : '휴지통으로 보낼 수 없습니다.', // from v2.1.24 added 30.4.2017
			'errRmSrc'             : '원본 파일을 제거할 수 없습니다.',
			'errExtract'           : '"$1"에 압축을 풀 수 없습니다.',
			'errArchive'           : '압축파일을 생성할 수 없습니다.',
			'errArcType'           : '지원하지 않는 압축파일 형식입니다.',
			'errNoArchive'         : '압축파일이 아니거나 지원하지 않는 압축파일 형식입니다.',
			'errCmdNoSupport'      : 'Backend에서 이 명령을 지원하지 않습니다.',
			'errReplByChild'       : '"$1" 폴더에 덮어쓸수 없습니다.',
			'errArcSymlinks'       : '보안상의 이유로 압축파일이 심볼릭 링크를 포함하거나 허용되지 않는 이름이 있을 경우 압축 해제가 불가능합니다.', // edited 24.06.2012
			'errArcMaxSize'        : '압축파일이 허용된 최대크기를 초과하였습니다.',
			'errResize'            : '"$1"의 크기 변경을 할 수 없습니다.',
			'errResizeDegree'      : '회전가능한 각도가 아닙니다.',  // added 7.3.2013
			'errResizeRotate'      : '이미지를 회전할 수 없습니다.',  // added 7.3.2013
			'errResizeSize'        : '올바르지 않은 크기의 이미지입니다.',  // added 7.3.2013
			'errResizeNoChange'    : '이미지 크기가 변경되지 않았습니다.',  // added 7.3.2013
			'errUsupportType'      : '지원하지 않는 파일 형식.',
			'errNotUTF8Content'    : '파일 "$1"은 UTF-8 형식이 아니어서 편집할 수 없습니다.',  // added 9.11.2011
			'errNetMount'          : '"$1"을(를) 마운트할 수 없습니다.', // added 17.04.2012
			'errNetMountNoDriver'  : '지원되지 않는 프로토콜.',     // added 17.04.2012
			'errNetMountFailed'    : '마운드 실패.',         // added 17.04.2012
			'errNetMountHostReq'   : '호스트가 필요합니다.', // added 18.04.2012
			'errSessionExpires'    : '활동이 없어 세션이 만료되었습니다.',
			'errCreatingTempDir'   : '임시 폴더 생성에 실패했습니다: "$1"',
			'errFtpDownloadFile'   : 'FTP를 통한 다운로드에 실패했습니다: "$1"',
			'errFtpUploadFile'     : 'FTP에 업로드 실패했습니다: "$1"',
			'errFtpMkdir'          : 'FTP에서 폴더 생성에 실패했습니다: "$1"',
			'errArchiveExec'       : '압축중 오류가 발생했습니다: "$1"',
			'errExtractExec'       : '압축해제중 오류가 발생했습니다: "$1"',
			'errNetUnMount'        : '마운트를 해제할 수 없습니다.', // from v2.1 added 30.04.2012
			'errConvUTF8'          : 'UTF-8로 변환할 수 없습니다.', // from v2.1 added 08.04.2014
			'errFolderUpload'      : '폴더를 업로드 하려면 최신 브라우저를 사용하세요.', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : '"$1" 검색중 시간을 초과하였습니다. 일부 결과만 표시됩니다.', // from v2.1 added 12.1.2016
			'errReauthRequire'     : '재인증이 필요합니다.', // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : '선택 가능한 최대 개수는 $1개입니다.', // from v2.1.17 added 17.10.2016
			'errRestore'           : '휴지통에서 복원할 수 없습니다. 복원할 위치를 확인할 수 없습니다.', // from v2.1.24 added 3.5.2017
			'errEditorNotFound'    : '이 파일 형식을 위한 편집기를 찾지 못했습니다.', // from v2.1.25 added 23.5.2017
			'errServerError'       : '서버측에서 오류가 발생했습니다.', // from v2.1.25 added 16.6.2017
			'errEmpty'             : '"$1" 폴더를 비울 수 없습니다.', // from v2.1.25 added 22.6.2017
			'moreErrors'           : '$1개의 오류가 더 발생했습니다.', // from v2.1.44 added 9.12.2018
			'errMaxMkdirs'         : 'You can create up to $1 folders at one time.', // from v2.1.58 added 20.6.2021

			/******************************* commands names ********************************/
			'cmdarchive'   : '압축파일생성',
			'cmdback'      : '뒤로',
			'cmdcopy'      : '복사',
			'cmdcut'       : '자르기',
			'cmddownload'  : '다운로드',
			'cmdduplicate' : '사본',
			'cmdedit'      : '편집',
			'cmdextract'   : '압축풀기',
			'cmdforward'   : '앞으로',
			'cmdgetfile'   : '선택',
			'cmdhelp'      : '이 소프트웨어는',
			'cmdhome'      : '홈',
			'cmdinfo'      : '파일정보',
			'cmdmkdir'     : '새 폴더',
			'cmdmkdirin'   : '새 폴더로', // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : '새 파일',
			'cmdopen'      : '열기',
			'cmdpaste'     : '붙여넣기',
			'cmdquicklook' : '미리보기',
			'cmdreload'    : '새로고침',
			'cmdrename'    : '이름바꾸기',
			'cmdrm'        : '삭제',
			'cmdtrash'     : '휴지통으로', //from v2.1.24 added 29.4.2017
			'cmdrestore'   : '복원', //from v2.1.24 added 3.5.2017
			'cmdsearch'    : '파일찾기',
			'cmdup'        : '상위폴더',
			'cmdupload'    : '업로드',
			'cmdview'      : '보기',
			'cmdresize'    : '이미지 크기 변경 & 회전',
			'cmdsort'      : '정렬',
			'cmdnetmount'  : '네트워크 볼륨 마운트', // added 18.04.2012
			'cmdnetunmount': '마운트 해제', // from v2.1 added 30.04.2012
			'cmdplaces'    : '즐겨찾기로', // added 28.12.2014
			'cmdchmod'     : '모드 변경', // from v2.1 added 20.6.2015
			'cmdopendir'   : '폴더 열기', // from v2.1 added 13.1.2016
			'cmdcolwidth'  : '컬럼 넓이 초기화', // from v2.1.13 added 12.06.2016
			'cmdfullscreen': '전체 화면', // from v2.1.15 added 03.08.2016
			'cmdmove'      : '이동', // from v2.1.15 added 21.08.2016
			'cmdempty'     : '폴더 비우기', // from v2.1.25 added 22.06.2017
			'cmdundo'      : '실행 취소', // from v2.1.27 added 31.07.2017
			'cmdredo'      : '다시 실행', // from v2.1.27 added 31.07.2017
			'cmdpreference': '환경설정', // from v2.1.27 added 03.08.2017
			'cmdselectall' : '전체 선택', // from v2.1.28 added 15.08.2017
			'cmdselectnone': '선택 취소', // from v2.1.28 added 15.08.2017
			'cmdselectinvert': '선택 반전', // from v2.1.28 added 15.08.2017
			'cmdopennew'   : '새 창으로 열기', // from v2.1.38 added 3.4.2018
			'cmdhide'      : '숨기기 (환경설정)', // from v2.1.41 added 24.7.2018

			/*********************************** buttons ***********************************/
			'btnClose'  : '닫기',
			'btnSave'   : '저장',
			'btnRm'     : '삭제',
			'btnApply'  : '적용',
			'btnCancel' : '취소',
			'btnNo'     : '아니오',
			'btnYes'    : '예',
			'btnDiscard': 'Discard changes',
			'btnMount'  : '마운트',  // added 18.04.2012
			'btnApprove': '$1로 이동 및 승인', // from v2.1 added 26.04.2012
			'btnUnmount': '마운트 해제', // from v2.1 added 30.04.2012
			'btnConv'   : '변환', // from v2.1 added 08.04.2014
			'btnCwd'    : '여기',      // from v2.1 added 22.5.2015
			'btnVolume' : '볼륨',    // from v2.1 added 22.5.2015
			'btnAll'    : '전체',       // from v2.1 added 22.5.2015
			'btnMime'   : 'MIME 타입', // from v2.1 added 22.5.2015
			'btnFileName':'파일 이름',  // from v2.1 added 22.5.2015
			'btnSaveClose': '저장후 닫기', // from v2.1 added 12.6.2015
			'btnBackup' : '백업', // fromv2.1 added 28.11.2015
			'btnRename'    : '이름변경',      // from v2.1.24 added 6.4.2017
			'btnRenameAll' : '전체이름 변경', // from v2.1.24 added 6.4.2017
			'btnPrevious' : '이전 ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnNext'     : '다음 ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnSaveAs'   : '다른 이름으로 저장하기', // from v2.1.25 added 24.5.2017

			/******************************** notifications ********************************/
			'ntfopen'     : '폴더 열기',
			'ntffile'     : '파일 열기',
			'ntfreload'   : '새로고침',
			'ntfmkdir'    : '폴더 생성',
			'ntfmkfile'   : '파일 생성',
			'ntfrm'       : '삭제',
			'ntfcopy'     : '복사',
			'ntfmove'     : '이동',
			'ntfprepare'  : '복사 준비',
			'ntfrename'   : '이름바꾸기',
			'ntfupload'   : '업로드',
			'ntfdownload' : '다운로드',
			'ntfsave'     : '저장하기',
			'ntfarchive'  : '압축파일만들기',
			'ntfextract'  : '압축풀기',
			'ntfsearch'   : '검색',
			'ntfresize'   : '이미지 크기 변경',
			'ntfsmth'     : '작업중 >_<',
			'ntfloadimg'  : '이미지 불러오는 중',
			'ntfnetmount' : '네트워크 볼륨 마운트 중', // added 18.04.2012
			'ntfnetunmount': '네트워크 볼륨 마운트 해제 중', // from v2.1 added 30.04.2012
			'ntfdim'      : '이미지 해상도 가져오는 중', // added 20.05.2013
			'ntfreaddir'  : '폴더 정보 읽는 중', // from v2.1 added 01.07.2013
			'ntfurl'      : '링크 URL 가져오는 중', // from v2.1 added 11.03.2014
			'ntfchmod'    : '파일 모드 변경하는 중', // from v2.1 added 20.6.2015
			'ntfpreupload': '업로드된 파일명 검증 중', // from v2.1 added 31.11.2015
			'ntfzipdl'    : '다운로드할 파일 생성 중', // from v2.1.7 added 23.1.2016
			'ntfparents'  : '경로 정보 가져오는 중', // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': '업로드된 파일 처리 중', // from v2.1.17 added 2.11.2016
			'ntftrash'    : '휴지통으로 이동 중', // from v2.1.24 added 2.5.2017
			'ntfrestore'  : '휴지통에서 복원 중', // from v2.1.24 added 3.5.2017
			'ntfchkdir'   : '대상 폴더 점검 중', // from v2.1.24 added 3.5.2017
			'ntfundo'     : '이전 작업 취소 중', // from v2.1.27 added 31.07.2017
			'ntfredo'     : '취소된 작업 다시 하는 중', // from v2.1.27 added 31.07.2017
			'ntfchkcontent' : '내용 확인 중', // from v2.1.41 added 3.8.2018

			/*********************************** volumes *********************************/
			'volume_Trash' : '휴지통', //from v2.1.24 added 29.4.2017

			/************************************ dates **********************************/
			'dateUnknown' : '알 수 없음',
			'Today'       : '오늘',
			'Yesterday'   : '어제',
			'msJan'       : '1월',
			'msFeb'       : '2월',
			'msMar'       : '3월',
			'msApr'       : '4월',
			'msMay'       : '5월',
			'msJun'       : '6월',
			'msJul'       : '7월',
			'msAug'       : '8월',
			'msSep'       : '9월',
			'msOct'       : '10월',
			'msNov'       : '11월',
			'msDec'       : '12월',
			'January'     : '1월',
			'February'    : '2월',
			'March'       : '3월',
			'April'       : '4월',
			'May'         : '5월',
			'June'        : '6월',
			'July'        : '7월',
			'August'      : '8월',
			'September'   : '9월',
			'October'     : '10월',
			'November'    : '11월',
			'December'    : '12월',
			'Sunday'      : '일요일',
			'Monday'      : '월요일',
			'Tuesday'     : '화요일',
			'Wednesday'   : '수요일',
			'Thursday'    : '목요일',
			'Friday'      : '금요일',
			'Saturday'    : '토요일',
			'Sun'         : '일',
			'Mon'         : '월',
			'Tue'         : '화',
			'Wed'         : '수',
			'Thu'         : '목',
			'Fri'         : '금',
			'Sat'         : '토',

			/******************************** sort variants ********************************/
			'sortname'          : '이름',
			'sortkind'          : '종류',
			'sortsize'          : '크기',
			'sortdate'          : '날짜',
			'sortFoldersFirst'  : '폴더 먼저',
			'sortperm'          : '퍼미션별', // from v2.1.13 added 13.06.2016
			'sortmode'          : '모드별',       // from v2.1.13 added 13.06.2016
			'sortowner'         : '소유자별',      // from v2.1.13 added 13.06.2016
			'sortgroup'         : '그룹별',      // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : '트리뷰도 같이',  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'untitled file.txt' : '새파일.txt', // added 10.11.2015
			'untitled folder'   : '새폴더',   // added 10.11.2015
			'Archive'           : '새아카이브',  // from v2.1 added 10.11.2015
			'untitled file'     : '새파일.$1',  // from v2.1.41 added 6.8.2018
			'extentionfile'     : '$1: 파일',    // from v2.1.41 added 6.8.2018
			'extentiontype'     : '$1: $2',      // from v2.1.43 added 17.10.2018

			/********************************** messages **********************************/
			'confirmReq'      : '확인',
			'confirmRm'       : '이 파일을 정말로 삭제 하겠습니까?<br/>실행 후 되돌릴 수 없습니다!',
			'confirmRepl'     : '오래된 파일을 새 파일로 바꾸시겠습니까? (폴더가 포함되어 있으면 병합됩니다. 백업 및 교체하려면 백업을 선택하세요.)',
			'confirmRest'     : '이미 있는 파일을 휴지통에 있는 파일로 교체하시겠습니까?', // fromv2.1.24 added 5.5.2017
			'confirmConvUTF8' : 'UTF-8이 아닙니다<br/>UTF-8로 변환할까요?<br/>변환후 저장하면 UTF-8로 바뀝니다.', // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : '이 파일의 인코딩 타입을 알아내지 못했습니다. 편집하려면 임시로 UTF-8로 변환해야 합니다.<br/>이 파일의 인코딩을 선택해주세요.', // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : '변경된 부분이 있습니다.<br/>저장하지 않는다면 현재 작업중인 내용을 잃을 수 있습니다.', // from v2.1 added 15.7.2015
			'confirmTrash'    : '휴지통으로 이동하시겠습니까?', //from v2.1.24 added 29.4.2017
			'confirmMove'     : '이 파일을 정말 "$1"(으)로 이동하시겠습니까?', //from v2.1.50 added 27.7.2019
			'apllyAll'        : '모두 적용',
			'name'            : '이름',
			'size'            : '크기',
			'perms'           : '권한',
			'modify'          : '수정된 시간',
			'kind'            : '종류',
			'read'            : '읽기',
			'write'           : '쓰기',
			'noaccess'        : '액세스 불가',
			'and'             : '와',
			'unknown'         : '알 수 없음',
			'selectall'       : '모든 파일 선택',
			'selectfiles'     : '파일 선택',
			'selectffile'     : '첫번째 파일 선택',
			'selectlfile'     : '마지막 파일 선택',
			'viewlist'        : '리스트 보기',
			'viewicons'       : '아이콘 보기',
			'viewSmall'       : '작은 아이콘', // from v2.1.39 added 22.5.2018
			'viewMedium'      : '중간 아이콘', // from v2.1.39 added 22.5.2018
			'viewLarge'       : '큰 아이콘', // from v2.1.39 added 22.5.2018
			'viewExtraLarge'  : '아주 큰 아이콘', // from v2.1.39 added 22.5.2018
			'places'          : '즐겨찾기',
			'calc'            : '계산',
			'path'            : '경로',
			'aliasfor'        : '별명',
			'locked'          : '잠금',
			'dim'             : '크기',
			'files'           : '파일',
			'folders'         : '폴더',
			'items'           : '아이템',
			'yes'             : '예',
			'no'              : '아니오',
			'link'            : '링크',
			'searcresult'     : '검색 결과',
			'selected'        : '아이템 선택',
			'about'           : '이 프로그램은..',
			'shortcuts'       : '단축아이콘',
			'help'            : '도움말',
			'webfm'           : '웹 파일매니저',
			'ver'             : '버전',
			'protocolver'     : '프로토콜 버전',
			'homepage'        : '홈페이지',
			'docs'            : '문서',
			'github'          : 'Github에서 포크하기',
			'twitter'         : '트위터에서 팔로우하기',
			'facebook'        : '페이스북에서 가입하기',
			'team'            : '팀',
			'chiefdev'        : '개발팀장',
			'developer'       : '개발자',
			'contributor'     : '공헌자',
			'maintainer'      : '관리자',
			'translator'      : '번역',
			'icons'           : '아이콘',
			'dontforget'      : '그리고 수건 가져가는 것을 잊지 마세요',
			'shortcutsof'     : '단축아이콘 사용불가',
			'dropFiles'       : '여기로 이동하기',
			'or'              : '또는',
			'selectForUpload' : '업로드 파일 선택',
			'moveFiles'       : '파일 이동',
			'copyFiles'       : '파일 복사',
			'restoreFiles'    : '복원하기', // from v2.1.24 added 5.5.2017
			'rmFromPlaces'    : '현재 폴더에서 삭제하기',
			'aspectRatio'     : '화면비율',
			'scale'           : '크기',
			'width'           : '가로',
			'height'          : '세로',
			'resize'          : '사이즈 변경',
			'crop'            : '자르기',
			'rotate'          : '회전',
			'rotate-cw'       : '반시계방향 90도 회전',
			'rotate-ccw'      : '시계방향 90도 회전',
			'degree'          : '도',
			'netMountDialogTitle' : '네트워크 볼륨 마운트', // added 18.04.2012
			'protocol'            : '프로토콜', // added 18.04.2012
			'host'                : '호스트', // added 18.04.2012
			'port'                : '포트', // added 18.04.2012
			'user'                : '사용자', // added 18.04.2012
			'pass'                : '비밀번호', // added 18.04.2012
			'confirmUnmount'      : '$1을(를) 마운트 해제하시겠습니까?',  // from v2.1 added 30.04.2012
			'dropFilesBrowser': '브라우저에서 파일을 끌어오거나 붙여넣으세요', // from v2.1 added 30.05.2012
			'dropPasteFiles'  : '파일을 끌어오거나, 클립보드의 URL이나 이미지들을 붙여넣으세요', // from v2.1 added 07.04.2014
			'encoding'        : '인코딩', // from v2.1 added 19.12.2014
			'locale'          : '로케일',   // from v2.1 added 19.12.2014
			'searchTarget'    : '대상: $1',                // from v2.1 added 22.5.2015
			'searchMime'      : '입력한 MIME 타입으로 검색하기', // from v2.1 added 22.5.2015
			'owner'           : '소유자', // from v2.1 added 20.6.2015
			'group'           : '그룹', // from v2.1 added 20.6.2015
			'other'           : '그외', // from v2.1 added 20.6.2015
			'execute'         : '실행', // from v2.1 added 20.6.2015
			'perm'            : '권한', // from v2.1 added 20.6.2015
			'mode'            : '모드', // from v2.1 added 20.6.2015
			'emptyFolder'     : '빈 폴더입니다', // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : '빈 폴더입니다\\A 드래드 앤 드롭으로 파일을 추가하세요', // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : '빈 폴더입니다\\A 길게 눌러 파일을 추가하세요', // from v2.1.6 added 30.12.2015
			'quality'         : '품질', // from v2.1.6 added 5.1.2016
			'autoSync'        : '자동 동기',  // from v2.1.6 added 10.1.2016
			'moveUp'          : '위로 이동',  // from v2.1.6 added 18.1.2016
			'getLink'         : 'URL 링크 가져오기', // from v2.1.7 added 9.2.2016
			'selectedItems'   : '선택된 항목 ($1)', // from v2.1.7 added 2.19.2016
			'folderId'        : '폴더 ID', // from v2.1.10 added 3.25.2016
			'offlineAccess'   : '오프라인 접근 허용', // from v2.1.10 added 3.25.2016
			'reAuth'          : '재인증하기', // from v2.1.10 added 3.25.2016
			'nowLoading'      : '로딩중...', // from v2.1.12 added 4.26.2016
			'openMulti'       : '여러 파일 열기', // from v2.1.12 added 5.14.2016
			'openMultiConfirm': '$1 파일을 열려고 합니다. 브라우저에서 열겠습니까?', // from v2.1.12 added 5.14.2016
			'emptySearch'     : '검색결과가 없습니다.', // from v2.1.12 added 5.16.2016
			'editingFile'     : '편집중인 파일입니다.', // from v2.1.13 added 6.3.2016
			'hasSelected'     : '$1개를 선택했습니다.', // from v2.1.13 added 6.3.2016
			'hasClipboard'    : '클립보드에 $1개가 있습니다.', // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : '증분 검색은 현재 보기에서만 가능합니다.', // from v2.1.13 added 6.30.2016
			'reinstate'       : '복원', // from v2.1.15 added 3.8.2016
			'complete'        : '$1 완료', // from v2.1.15 added 21.8.2016
			'contextmenu'     : '컨텍스트 메뉴', // from v2.1.15 added 9.9.2016
			'pageTurning'     : '페이지 전환', // from v2.1.15 added 10.9.2016
			'volumeRoots'     : '볼륨 루트', // from v2.1.16 added 16.9.2016
			'reset'           : '초기화', // from v2.1.16 added 1.10.2016
			'bgcolor'         : '배경색', // from v2.1.16 added 1.10.2016
			'colorPicker'     : '색 선택기', // from v2.1.16 added 1.10.2016
			'8pxgrid'         : '8px 그리드', // from v2.1.16 added 4.10.2016
			'enabled'         : '활성', // from v2.1.16 added 4.10.2016
			'disabled'        : '비활성', // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : '현재 보기에는 검색결과가 없습니다.\\A[Enter]를 눌러 검색 대상을 확장하세요.', // from v2.1.16 added 5.10.2016
			'emptyLetSearch'  : '현재 보기에는 첫 글자 검색 결과가 없습니다.', // from v2.1.23 added 24.3.2017
			'textLabel'       : '텍스트 라벨', // from v2.1.17 added 13.10.2016
			'minsLeft'        : '$1 분 남았습니다', // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : '선택한 인코딩으로 다시 열기', // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : '선택한 인코딩으로 저장하기', // from v2.1.19 added 2.12.2016
			'selectFolder'    : '폴더 선택', // from v2.1.20 added 13.12.2016
			'firstLetterSearch': '첫 글자 검색', // from v2.1.23 added 24.3.2017
			'presets'         : '프리셋', // from v2.1.25 added 26.5.2017
			'tooManyToTrash'  : '휴지통으로 옮기기엔 항목이 너무 많습니다.', // from v2.1.25 added 9.6.2017
			'TextArea'        : '글자영역', // from v2.1.25 added 14.6.2017
			'folderToEmpty'   : '"$1" 폴더를 비우세요.', // from v2.1.25 added 22.6.2017
			'filderIsEmpty'   : '"$1" 폴더에 아무것도 없습니다.', // from v2.1.25 added 22.6.2017
			'preference'      : '환경설정', // from v2.1.26 added 28.6.2017
			'language'        : '언어 설정', // from v2.1.26 added 28.6.2017
			'clearBrowserData': '이 브라우저에 저장된 설정값 초기화하기', // from v2.1.26 added 28.6.2017
			'toolbarPref'     : '툴바 설정', // from v2.1.27 added 2.8.2017
			'charsLeft'       : '... $1 글자 남았습니다.',  // from v2.1.29 added 30.8.2017
			'linesLeft'       : '... $1 줄 남았습니다.',  // from v2.1.52 added 16.1.2020
			'sum'             : '합계', // from v2.1.29 added 28.9.2017
			'roughFileSize'   : '대략적인 파일 크기', // from v2.1.30 added 2.11.2017
			'autoFocusDialog' : '마우스를 가져갈 때 대화창 요소에 초점 맞추기',  // from v2.1.30 added 2.11.2017
			'select'          : '선택', // from v2.1.30 added 23.11.2017
			'selectAction'    : '파일 선택시 동작', // from v2.1.30 added 23.11.2017
			'useStoredEditor' : '마지막 사용한 편집기로 열기', // from v2.1.30 added 23.11.2017
			'selectinvert'    : '선택 반전', // from v2.1.30 added 25.11.2017
			'renameMultiple'  : '선택한 $1을(를) $2와 같이 바꾸겠습니까?<br/>이 작업은 되돌릴 수 없습니다!', // from v2.1.31 added 4.12.2017
			'batchRename'     : '일괄 이름 바꾸기', // from v2.1.31 added 8.12.2017
			'plusNumber'      : '+ 숫자', // from v2.1.31 added 8.12.2017
			'asPrefix'        : '접두사 추가', // from v2.1.31 added 8.12.2017
			'asSuffix'        : '접미사 추가', // from v2.1.31 added 8.12.2017
			'changeExtention' : '확장자 변경', // from v2.1.31 added 8.12.2017
			'columnPref'      : '사이드바 설정 (리스트 보기)', // from v2.1.32 added 6.2.2018
			'reflectOnImmediate' : '모든 변경은 아카이브에 즉시 반영됩니다.', // from v2.1.33 added 2.3.2018
			'reflectOnUnmount'   : '이 볼륨의 마운트를 해제할 때까지는 어떠한 변경사항도 반영되지 않습니다.', // from v2.1.33 added 2.3.2018
			'unmountChildren' : '아래의 볼륨들도 이 볼륨과 함께 마운트가 해제됩니다. 계속하시겠습니까?', // from v2.1.33 added 5.3.2018
			'selectionInfo'   : '선택 정보', // from v2.1.33 added 7.3.2018
			'hashChecker'     : '파일 해쉬 알고리즘', // from v2.1.33 added 10.3.2018
			'infoItems'       : '정보 (선택 정보 패널)', // from v2.1.38 added 28.3.2018
			'pressAgainToExit': '나가기 위해서 한 번 더 누르세요.', // from v2.1.38 added 1.4.2018
			'toolbar'         : '툴바', // from v2.1.38 added 4.4.2018
			'workspace'       : '작업공간', // from v2.1.38 added 4.4.2018
			'dialog'          : '대화상자', // from v2.1.38 added 4.4.2018
			'all'             : '전체', // from v2.1.38 added 4.4.2018
			'iconSize'        : '아이콘 크기 (아이콘 보기)', // from v2.1.39 added 7.5.2018
			'editorMaximized' : '최대화된 편집기 창을 엽니다', // from v2.1.40 added 30.6.2018
			'editorConvNoApi' : '현재 API를 통한 변환이 불가능하므로 웹 사이트에서 변환하시기 바랍니다.', //from v2.1.40 added 8.7.2018
			'editorConvNeedUpload' : '변환 후 변환된 파일을 저장하기 위해서는 파일 URL이나 다운로드받은 파일을 업로드 해야 합니다.', //from v2.1.40 added 8.7.2018
			'convertOn'       : '$1 사이트에서 변환하시기 바랍니다.', // from v2.1.40 added 10.7.2018
			'integrations'    : '통합', // from v2.1.40 added 11.7.2018
			'integrationWith' : 'elFinder에는 다음과 같은 외부 서비스가 통합되어 있습니다. 이용하기 전에 이용 약관, 개인정보 보호정책 등을 확인하시기 바랍니다.', // from v2.1.40 added 11.7.2018
			'showHidden'      : '숨겨진 파일 표시', // from v2.1.41 added 24.7.2018
			'hideHidden'      : '숨겨진 파일 숨기기', // from v2.1.41 added 24.7.2018
			'toggleHidden'    : '숨겨진 항목 표시/숨기기', // from v2.1.41 added 24.7.2018
			'makefileTypes'   : '"새 파일"에서 사용할 파일 형식', // from v2.1.41 added 7.8.2018
			'typeOfTextfile'  : '텍스트 파일 유형', // from v2.1.41 added 7.8.2018
			'add'             : '추가', // from v2.1.41 added 7.8.2018
			'theme'           : '테마', // from v2.1.43 added 19.10.2018
			'default'         : '기본값', // from v2.1.43 added 19.10.2018
			'description'     : '설명', // from v2.1.43 added 19.10.2018
			'website'         : '웹사이트', // from v2.1.43 added 19.10.2018
			'author'          : '저자', // from v2.1.43 added 19.10.2018
			'email'           : '이메일', // from v2.1.43 added 19.10.2018
			'license'         : '라이선스', // from v2.1.43 added 19.10.2018
			'exportToSave'    : '이 파일은 저장될 수 없습니다. 편집한 내용을 유지하려면 PC로 내보내시기 바랍니다.', // from v2.1.44 added 1.12.2018
			'dblclickToSelect': '파일을 두 번 클릭하여 선택하세요.', // from v2.1.47 added 22.1.2019
			'useFullscreen'   : '전체 화면 모드 사용', // from v2.1.47 added 19.2.2019

			/********************************** mimetypes **********************************/
			'kindUnknown'     : '알 수 없음',
			'kindRoot'        : 'Root 볼륨', // from v2.1.16 added 16.10.2016
			'kindFolder'      : '폴더',
			'kindSelects'     : '선택', // from v2.1.29 added 29.8.2017
			'kindAlias'       : '별칭',
			'kindAliasBroken' : '손상된 별칭',
			// applications
			'kindApp'         : '응용프로그램',
			'kindPostscript'  : 'Postscript 문서',
			'kindMsOffice'    : 'Microsoft Office 문서',
			'kindMsWord'      : 'Microsoft Word 문서',
			'kindMsExcel'     : 'Microsoft Excel 문서',
			'kindMsPP'        : 'Microsoft Powerpoint 프레젠테이션',
			'kindOO'          : 'Open Office 문서',
			'kindAppFlash'    : '플래쉬 파일',
			'kindPDF'         : 'PDF 문서',
			'kindTorrent'     : '비트토렌트 파일',
			'kind7z'          : '7z 압축파일',
			'kindTAR'         : 'TAR 압축파일',
			'kindGZIP'        : 'GZIP 압축파일',
			'kindBZIP'        : 'BZIP 압축파일',
			'kindXZ'          : 'XZ 압축파일',
			'kindZIP'         : 'ZIP 압축파일',
			'kindRAR'         : 'RAR 압축파일',
			'kindJAR'         : '자바 JAR 파일',
			'kindTTF'         : '트루 타입 글꼴',
			'kindOTF'         : '오픈 타입 글꼴',
			'kindRPM'         : 'RPM 패키지',
			// fonts
			'kindFont'        : '글꼴',
			'kindSFNT'        : 'SFNT 글꼴',
			'kindEOT'         : 'Embedded Open Type 글꼴',
			'kindWOFF'        : 'Web Open Font Format 글꼴',
			'kindWOFF2'       : 'Web Open Font Format 2 글꼴',
			// texts
			'kindText'        : '텍스트 문서',
			'kindTextPlain'   : '일반 텍스트',
			'kindPHP'         : 'PHP 소스',
			'kindCSS'         : 'CSS 문서',
			'kindHTML'        : 'HTML 문서',
			'kindJS'          : '자바스크립트 소스',
			'kindRTF'         : 'RTF 형식',
			'kindC'           : 'C 소스',
			'kindCHeader'     : 'C 헤더 소스',
			'kindCPP'         : 'C++ 소스',
			'kindCPPHeader'   : 'C++ 헤더 소스',
			'kindShell'       : '유닉스 쉘 스크립트',
			'kindPython'      : '파이썬 소스',
			'kindJava'        : '자바 소스',
			'kindRuby'        : '루비 소스',
			'kindPerl'        : '펄 스크립트',
			'kindSQL'         : 'SQL 소스',
			'kindXML'         : 'XML 문서',
			'kindAWK'         : 'AWK 소스',
			'kindCSV'         : 'CSV 파일',
			'kindDOCBOOK'     : '닥북 XML 문서',
			'kindMarkdown'    : '마크다운 문서', // added 20.7.2015
			// images
			'kindImage'       : '이미지',
			'kindBMP'         : 'BMP 이미지',
			'kindJPEG'        : 'JPEG 이미지',
			'kindGIF'         : 'GIF 이미지',
			'kindPNG'         : 'PNG 이미지',
			'kindTIFF'        : 'TIFF 이미지',
			'kindTGA'         : 'TGA 이미지',
			'kindPSD'         : 'Adobe Photoshop 이미지',
			'kindXBITMAP'     : 'X 비트맵 이미지',
			'kindPXM'         : 'Pixelmator 이미지',
			// media
			'kindAudio'       : '오디오 미디어',
			'kindAudioMPEG'   : 'MPEG 오디오',
			'kindAudioMPEG4'  : 'MPEG-4 오디오',
			'kindAudioMIDI'   : 'MIDI 오디오',
			'kindAudioOGG'    : 'Ogg Vorbis 오디오',
			'kindAudioWAV'    : 'WAV 오디오',
			'AudioPlaylist'   : 'MP3 플레이 리스트',
			'kindVideo'       : '동영상 미디어',
			'kindVideoDV'     : 'DV 동영상',
			'kindVideoMPEG'   : 'MPEG 동영상',
			'kindVideoMPEG4'  : 'MPEG-4 동영상',
			'kindVideoAVI'    : 'AVI 동영상',
			'kindVideoMOV'    : '퀵 타임 동영상',
			'kindVideoWM'     : '윈도우 미디어 플레이어 동영상',
			'kindVideoFlash'  : '플래쉬 동영상',
			'kindVideoMKV'    : 'Matroska 동영상',
			'kindVideoOGG'    : 'Ogg 동영상'
		}
	};
}));

