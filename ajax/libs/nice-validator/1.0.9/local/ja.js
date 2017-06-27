/*********************************
 * Themes, rules, and i18n support
 * Locale: Japanese; 日本語
 *********************************/
(function(factory) {
    typeof module === "object" && module.exports ? module.exports = factory( require( "jquery" ) ) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    factory(jQuery);
}(function($) {

    /* Global configuration
     */
    $.validator.config({
        //stopOnError: true,
        //focusCleanup: true,
        //theme: 'yellow_right',
        //timely: 2,

        // Custom rules
        rules: {
            digits: [/^\d+$/, "数字だけを入力してください"]
            ,letters: [/^[a-z]+$/i, "手紙のみでお願いします"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "有効な日付を入力してください、，フォーマット：YYYY-MM-DD"]
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "有効な時刻を入力してください，00:00~23:59の間"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "有効なメールアドレスを入力してください"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "有効なURLを入力してください"]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("ファイル拡張子を{1}のみを受け入れる", ext.replace(/\|/g, '、'));
            }
            
        },

        // Default error messages
        messages: {
            0: "このフィールド",
            fallback: "{0}は有効ではありません",
            loading: "検証プロセス...",
            error: "ネットワークエラー",
            timeout: "要求がタイムアウトしました",
            required: "{0}は必須です",
            remote: "この値が使用されている",
            integer: {
                '*': "整数を入力してください",
                '+': "正の整数を入力してください",
                '+0': "正の整数または0を入力してください",
                '-': "負の整数を入力してください",
                '-0': "負の整数または0を入力してください"
            },
            match: {
                eq: "{0}と{1}と同じでなければなりません",
                neq: "{0}と{1}は同じにすることはできません",
                lt: "{0}未満{1}なければならない",
                gt: "{0}より{1}大なければならない",
                lte: "{0}小なりイコール{1}なければならない",
                gte: "{0}大なりイコール{1}なければならない"
            },
            range: {
                rg: "{1}～{2}の数を入力してください",
                gte: "{1}以上の数を入力してください",
                lte: "{1}以下の数を入力してください",
                gtlt: "{1}～{2}の間の数を入力してください",
                gt: "{1}より大きい数を入力してください",
                lt: "{1}より小きい数を入力してください"
            },
            checked: {
                eq: "{1}項目を選択してください",
                rg: "{1}から{2}の項目を選択してください",
                gte: "少なくとも{1}の項目を選択してください",
                lte: "{1}の項目まで選択してください"
            },
            length: {
                eq: "{1}文字を入力してください",
                rg: "{1}文字から{2}文字までの値を入力してください",
                gte: "{1}文字以上で入力してください",
                lte: "{1}文字以内で入力してください",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        }
    });

    /* Themes
     */
    var TPL_ARROW = '<span class="n-arrow"><b>◆</b><i>◆</i></span>';
    $.validator.setTheme({
        'simple_right': {
            formClass: 'n-simple',
            msgClass: 'n-right'
        },
        'simple_bottom': {
            formClass: 'n-simple',
            msgClass: 'n-bottom'
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgArrow: TPL_ARROW
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW,
            msgShow: function($msgbox, type){
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({left: '20px', opacity: 0})
                        .delay(100).show().stop()
                        .animate({left: '-4px', opacity: 1}, 150)
                        .animate({left: '3px'}, 80)
                        .animate({left: 0}, 80);
                } else {
                    $el.css({left: 0, opacity: 1}).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
                var $el = $msgbox.children();
                $el.stop().delay(100).show()
                    .animate({left: '20px', opacity: 0}, 300, function(){
                        $msgbox.hide();
                    });
            }
        }
    });
}));
