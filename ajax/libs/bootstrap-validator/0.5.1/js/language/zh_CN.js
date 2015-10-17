(function ($) {
    /**
     * Traditional Chinese language package
     * Translated by @tureki
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': '请输入有效的Base64编码'
        },
        between: {
            'default': '请输入不小于%s 且不大于%s 的值',
            notInclusive: '请输入不小于等于%s 且不大于等于%s 的值'
        },
        callback: {
            'default': '请输入有效的值'
        },
        choice: {
            'default': '请输入有效的值',
            less: '最少选择 %s 个选项',
            more: '最多选择 %s 个选项',
            between: '请选择 %s 至 %s 个选项'
        },
        creditCard: {
            'default': '请输入有效的信用卡号码'
        },
        cusip: {
            'default': '请输入有效的CUSIP'
        },
        cvv: {
            'default': '请输入有效的CVV'
        },
        date: {
            'default': '请输入有效的日期'
        },
        different: {
            'default': '请输入不一样的值'
        },
        digits: {
            'default': '只能输入数字'
        },
        ean: {
            'default': '请输入有效的EAN'
        },
        emailAddress: {
            'default': '请输入有效的EMAIL'
        },
        file: {
            'default': '请选择有效的档案'
        },
        greaterThan: {
            'default': '请输入大于或等于 %s 的值',
            notInclusive: '请输入大于 %s 的值'
        },
        grid: {
            'default': '请输入有效的GRId'
        },
        hex: {
            'default': '请输入有效的16位元码'
        },
        hexColor: {
            'default': '请输入有效的16位色码'
        },
        iban: {
            'default': '请输入有效的IBAN ',
            countryNotSupported: '不支援该国家代码%s',
            country: '请输入有效的 %s IBAN编号 ',
            countries: {
                AD: '安道​​尔',
                AE: '阿联酋',
                AL: '阿尔巴尼亚',
                AO: '安哥拉',
                AT: '奥地利',
                AZ: '阿塞拜疆',
                BA: '波斯尼亚和黑塞哥维那',
                BE: '比利时',
                BF: '布基纳法索',
                BG: '保加利亚',
                BH: '巴林',
                BI: '布隆迪',
                BJ: '贝宁',
                BR: '巴西',
                CH: '瑞士',
                CI: '象牙海岸',
                CM: '喀麦隆',
                CR: '哥斯达黎加',
                CV: '佛得角',
                CY: '塞浦路斯',
                CZ: '捷克共和国',
                DE: '德国',
                DK: '丹麦',
                DO: '多明尼加共和国',
                DZ: '阿尔及利亚',
                EE: '爱沙尼亚',
                ES: '西班牙',
                FI: '芬兰',
                FO: '法罗群岛',
                FR: '法国',
                GB: '英国',
                GE: '格鲁吉亚',
                GI: '直布罗陀',
                GL: '格陵兰岛',
                GR: '希腊',
                GT: '危地马拉',
                HR: '克罗地亚',
                HU: '匈牙利',
                IE: '爱尔兰',
                IL: '以色列',
                IR: '伊朗',
                IS: '冰岛',
                IT: '意大利',
                JO: '乔丹',
                KW: '科威特',
                KZ: '哈萨克斯坦',
                LB: '黎巴嫩',
                LI: '列支敦士登',
                LT: '立陶宛',
                LU: '卢森堡',
                LV: '拉脱维亚',
                MC: '摩纳哥',
                MD: '摩尔多瓦',
                ME: '黑山共和国',
                MG: '马达加斯加',
                MK: '马其顿',
                ML: '马里',
                MR: '毛里塔尼亚',
                MT: '马耳他',
                MU: '毛里求斯',
                MZ: '莫桑比克',
                NL: '荷兰',
                NO: '挪威',
                PK: '巴基斯坦',
                PL: '波兰',
                PS: '巴勒斯坦',
                PT: '葡萄牙',
                QA: '卡塔尔',
                RO: '罗马尼亚',
                RS: '塞尔维亚',
                SA: '沙特阿拉伯',
                SE: '瑞典',
                SI: '斯洛文尼亚',
                SK: '斯洛伐克',
                SM: '圣马力诺',
                SN: '塞内加尔',
                TN: '突尼斯',
                TR: '土耳其',
                VG: '英属维尔京群岛'
            }
        },
        id: {
            'default': '请输入有效的身份证字号码',
            countryNotSupported: '不支援该国家代码%s',
            country: '请输入有效的%s 身份证字号码',
            countries: {
                BA: '波斯尼亚和黑塞哥维那',
                BG: '保加利亚',
                BR: '巴西',
                CH: '瑞士',
                CL: '智利',
                CZ: '捷克',
                DK: '丹麦',
                EE: '爱沙尼亚',
                ES: '西班牙语',
                FI: '芬兰',
                HR: '克罗地亚',
                IE: '爱尔兰',
                IS: '冰岛',
                LT: '立陶宛',
                LV: '拉脱维亚语',
                ME: '黑山共和国',
                MK: '马其顿',
                NL: '荷兰',
                RO: '罗马尼亚',
                RS: '塞尔维亚',
                SE: '瑞典',
                SI: '斯洛文尼亚',
                SK: '斯洛伐克',
                SM: '圣马力诺',
                ZA: '南非'
            }
        },
        identical: {
            'default': '请输入一样的值'
        },
        imei: {
            'default': '请输入有效的IMEI'
        },
        imo: {
            'default': '请输入有效的IMO'
        },
        integer: {
            'default': '请输入有效的整数'
        },
        ip: {
            'default': '请输入有效的IP位址',
            ipv4: '请输入有效的IPv4位址',
            ipv6: '请输入有效的IPv6位址'
        },
        isbn: {
            'default': '请输入有效的ISBN'
        },
        isin: {
            'default': '请输入有效的ISIN'
        },
        ismn: {
            'default': '请输入有效的ISMN'
        },
        issn: {
            'default': '请输入有效的ISSN'
        },
        lessThan: {
            'default': '请输入小于或等于 %s 的值',
            notInclusive: '请输入小于 %s 的值'
        },
        mac: {
            'default': '请输入有效的MAC位址'
        },
        meid: {
            'default': '请输入有效的MEID'
        },
        notEmpty: {
            'default': '栏位不能为空'
        },
        numeric: {
            'default': '请输入有效的浮点数'
        },
        phone: {
            'default': '请输入有效的电话号码',
            countryNotSupported: '不支援该国家代码%s',
            country: '请输入有效的 %s 电话号码',
            countries: {
                BR: '巴西',
                ES: '西班牙',
                FR: '法国',
                GB: '英国',
                MA: '摩洛哥',
                PK: '巴基斯坦',
                US: '美国'
            }
        },
        regexp: {
            'default': '请输入有效的值'
        },
        remote: {
            'default': '请输入有效的值'
        },
        rtn: {
            'default': '请输入有效的RTN'
        },
        sedol: {
            'default': '请输入有效的SEDOL'
        },
        siren: {
            'default': '请输入有效的SIREN'
        },
        siret: {
            'default': '请输入有效的SIRET'
        },
        step: {
            'default': '请输入 %s 个有效步骤'
        },
        stringCase: {
            'default': '只能输入小写的值',
            upper: '只能输入大写的值'
        },
        stringLength: {
            'default': '请输入符合长度限制的值',
            less: '请输入小于 %s 个字',
            more: '请输入大于 %s 个字',
            between: '请输入介于 %s 至 %s 个字'
        },
        uri: {
            'default': '请输入一个有效的链接'
        },
        uuid: {
            'default': '请输入有效的UUID',
            version: '请输入符合版本 %s 的UUID'
        },
        vat: {
            'default': '请输入有效的VAT',
            countryNotSupported: '不支援该国家代码%s',
            country: '请输入有效的 %s VAT',
            countries: {
                AT: '奥地利',
                BE: '比利时',
                BG: '保加利亚',
                BR: '巴西',
                CH: '瑞士',
                CY: '塞浦路斯',
                CZ: '捷克',
                DE: '德语',
                DK: '丹麦',
                EE: '爱沙尼亚',
                ES: '西班牙',
                FI: '芬兰',
                FR: '法语',
                GB: '英国',
                GR: '希腊',
                EL: '希腊',
                HU: '匈牙利',
                HR: '克罗地亚',
                IE: '爱尔兰',
                IS: '冰岛',
                IT: '意大利',
                LT: '立陶宛',
                LU: '卢森堡',
                LV: '拉脱维亚语',
                MT: '马耳他',
                NL: '荷兰',
                NO: '挪威',
                PL: '波兰',
                PT: '葡萄牙',
                RO: '罗马尼亚',
                RU: '俄罗斯',
                RS: '塞尔维亚',
                SE: '瑞典',
                SI: '斯洛文尼亚',
                SK: '斯洛伐克',
                ZA: '南非'
            }
        },
        vin: {
            'default': '请输入有效的VIN'
        },
        zipCode: {
            'default': '请输入有效的邮政编码',
            countryNotSupported: '不支援该国家代码%s',
            country: '请输入有效的 %s',
            countries: {
                BR: '巴西 邮政编码',
                CA: '加拿大 邮政编码',
                DK: '丹麦 邮政编码',
                GB: '英国 邮政编码',
                IT: '意大利 邮政编码',
                MA: '摩洛哥 邮政编码',
                NL: '荷兰 邮政编码',
                SE: '瑞士 邮政编码',
                SG: '新加坡 邮政编码',
                US: '美国 邮政编码'
            }
        }
    });
}(window.jQuery));
