/**
 * jqGrid Japanese Translation
 * OKADA Yoshitada okada.dev@sth.jp
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jslint white: true */
/*global jQuery */
(function ($) {
"use strict";
var locInfo = {
	isRTL: false,
	defaults: {
		recordtext: "{2} 件中 {0} - {1} を表示 ",
		emptyrecords: "表示するレコードがありません",
		loadtext: "読み込み中...",
		pgtext: "{1} ページ中 {0} ページ目 ",
		pgfirst: "先頭ページ",
		pglast: "最後のページ",
		pgnext: "次のページ",
		pgprev: "前のページ",
		pgrecs: "ページ当たりのレコード数",
		showhide: "切り替え 展開 折りたたみ グリッド",
		savetext: "保存中..."
	},
	search: {
		caption: "検索...",
		Find: "検索",
		Reset: "リセット",
		odata: [
			{ oper: "eq", text: "次に等しい" }, { oper: "ne", text: "次に等しくない" },
			{ oper: "lt", text: "次より小さい" }, { oper: "le", text: "次に等しいか小さい" },
			{ oper: "gt", text: "次より大きい" }, { oper: "ge", text: "次に等しいか大きい" },
			{ oper: "bw", text: "次で始まる" }, { oper: "bn", text: "次で始まらない" },
			{ oper: "in", text: "次に含まれる" }, { oper: "ni", text: "次に含まれない" },
			{ oper: "ew", text: "次で終わる" }, { oper: "en", text: "次で終わらない" },
			{ oper: "cn", text: "次を含む" }, { oper: "nc", text: "次を含まない" },
			{ oper: "nu", text: "NULL です" }, { oper: "nn", text: "NULL ではありません" }
		],
		groupOps: [
			{ op: "AND", text: "すべての" },
			{ op: "OR", text: "いずれかの" }
		],
		operandTitle: "検索操作をクリックして選択する",
		resetTitle: "値の検索のリセット"
	},
	edit: {
		addCaption: "レコード追加",
		editCaption: "レコード編集",
		bSubmit: "送信",
		bCancel: "キャンセル",
		bClose: "閉じる",
		saveData: "データが変更されています。保存しますか？",
		bYes: "はい",
		bNo: "いいえ",
		bExit: "キャンセル",
		msg: {
			required: "この項目は必須です。",
			number: "正しい数値を入力して下さい。",
			minValue: "次の値以上で入力して下さい。",
			maxValue: "次の値以下で入力して下さい。",
			email: "e-mailが正しくありません。",
			integer: "正しい整数値を入力して下さい。",
			date: "正しい値を入力して下さい。",
			url: "は有効なURLではありません。 プレフィックスが必要です。 ('http://' または 'https://')",
			nodefined: " が定義されていません",
			novalue: " 戻り値が必要です",
			customarray: "カスタム関数は配列を返す必要があります",
			customfcheck: "カスタム検証にはカスタム関数が必要です"
		}
	},
	view: {
		caption: "レコードを表示",
		bClose: "閉じる"
	},
	del: {
		caption: "削除",
		msg: "選択したレコードを削除しますか？",
		bSubmit: "削除",
		bCancel: "キャンセル"
	},
	nav: {
		edittext: "",
		edittitle: "選択した行を編集",
		addtext: "",
		addtitle: "行を新規追加",
		deltext: "",
		deltitle: "選択した行を削除",
		searchtext: "",
		searchtitle: "レコード検索",
		refreshtext: "",
		refreshtitle: "グリッドをリロード",
		alertcap: "警告",
		alerttext: "行を選択して下さい。",
		viewtext: "",
		viewtitle: "選択した行を表示"
	},
	col: {
		caption: "列を表示／隠す",
		bSubmit: "送信",
		bCancel: "キャンセル"
	},
	errors: {
		errcap: "エラー",
		nourl: "URLが設定されていません。",
		norecords: "処理対象のレコードがありません。",
		model: "colNamesの長さがcolModelと一致しません。"
	},
	formatter: {
		integer: {
			thousandsSeparator: ",",
			defaultValue: "0"
		},
		number: {
			decimalSeparator: ".",
			thousandsSeparator: ",",
			decimalPlaces: 2,
			defaultValue: "0.00"
		},
		currency: {
			decimalSeparator: ".",
			thousandsSeparator: ",",
			decimalPlaces: 0,
			prefix: "",
			suffix: "",
			defaultValue: "0"
		},
		date: {
			dayNames: [
				"日", "月", "火", "水", "木", "金", "土",
				"日", "月", "火", "水", "木", "金", "土"
			],
			monthNames: [
				"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
				"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
			],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function () { return "番目"; },
			srcformat: "Y-m-d",
			newformat: "d/m/Y",
			masks: {
				ShortDate: "n/j/Y",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "g:i A",
				LongTime: "g:i:s A",
				YearMonth: "F, Y"
			}
		}
	}
};
$.jgrid = $.jgrid || {};
$.extend(true, $.jgrid, {
	defaults: {
		locale: "ja"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		ja: $.extend({}, locInfo, { name: "日本語", nameEnglish: "Japanese" }),
		"ja-JP": $.extend({}, locInfo, { name: "日本語 (日本)", nameEnglish: "Japanese (Japan)" })
	}
});
}(jQuery));
