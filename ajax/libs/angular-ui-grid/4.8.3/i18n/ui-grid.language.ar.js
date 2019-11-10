/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
	angular.module('ui.grid').config(['$provide', function($provide) {
		$provide.decorator('i18nService', ['$delegate', function($delegate) {
			$delegate.add('ar', {
				"headerCell": {
					"aria": {
						"defaultFilterLabel": "التصفيه بالعمود",
						"removeFilter": "محو التصفيه",
						"columnMenuButtonLabel": "قاءمه الاعمده"
					},
					"priority": "أولويه : ",
					"filterLabel": "تصفيه بالاعمده :"
				},
				"aggregate": {
					"label": "العناصر"
				},
				"groupPanel": {
					"description": "اسحب رأس العمود هنا وأسقطه لإنشاء مجموعه"
				},
				"search": {
					"placeholder": "بحث  ...",
					"showingItems": "العناصر الظاهره :",
					"selectedItems": "العناصر المحدده :",
					"totalItems": "عدد العناصر :",
					"size": "حجم الصفحه :",
					"first": "اول صفحه",
					"next": "الصفحه التاليه",
					"previous": "الصفحه الصابقه",
					"last": "الصفحه الاخيره"
				},
				"menu": {
					"text": "اختيار العمود :"
				},
				"sort": {
					"ascending": "ترتيب تصاعدى",
					"descending": "ترتيب تنازلى",
					"none": "عدم التحديد",
					"remove": "حذف الترتيب"
				},
				"column": {
					"hide": "إخفاء عمود"
				},
				"aggregation": {
					"count": "عدد الصفوف: ",
					"sum": "جمع: ",
					"avg": "المتوسط الحسابى: ",
					"min": "الادنى: ",
					"max": "الاقصى: "
				},
				"pinning": {
					"pinLeft": "تثبيت لليسار",
					"pinRight": "تثبيت لليمين",
					"unpin": "فك التثبيت"
				},
				"columnMenu": {
					"close": "غلق"
				},
				"gridMenu": {
					"aria": {
						"buttonLabel": "قائمه الجدول"
					},
					"columns": "الاعمده:",
					"importerTitle": "إدخال ملف",
					"exporterAllAsCsv": "إخراج كل البيانات ك(csv)",
					"exporterVisibleAsCsv": "إخراج كل البيانات الواضحه ك (csv)",
					"exporterSelectedAsCsv": "إخراج كل البيانات المحدده ك (csv)",
					"exporterAllAsPdf": "إخراج كل البيانات ك(pdf)",
					"exporterVisibleAsPdf": "إخراج كل البيانات الواضحه ك (pdf)",
					"exporterSelectedAsPdf": "إخراج كل البيانات المحدده ك (pdf)",
					"clearAllFilters": "محو كل الترشيح"
				},
				"importer": {
					"noHeaders": "اسماء هؤلاء الاعمده غير واضحه، هل يوجد رأس للملف؟",
					"noObjects": "Objects were not able to be derived, was there data in the file other than headers?",
					"invalidCsv": "الملف غير قادر على الاتمام ، هل ال (CSV) صحيح؟",
					"invalidJson": "الملف غير قادر على الاتمام ، هل ال (JSON) صحيح؟",
					"jsonNotArray": "Imported json file must contain an array, aborting."
				},
				"pagination": {
					"aria": {
						"pageToFirst": "الصفحه الاولى",
						"pageBack": "الصفه السابقه",
						"pageSelected": "الصفحه المحدده",
						"pageForward": "الصفحه التاليه",
						"pageToLast": "الصفحه الاخيره"
					},
					"sizes": "عدد العناصر فى الصفحه",
					"totalItems": "عناصر",
					"through": "إلى",
					"of": "من"
				},
				"grouping": {
					"group": "جمع",
					"ungroup": "فك الجمع",
					"aggregate_count": "جمله : العدد",
					"aggregate_sum": "جمله : الحاصل",
					"aggregate_max": "جمله : الاقصى",
					"aggregate_min": "جمله : الاقل",
					"aggregate_avg": "جمله :المتوسط ",
					"aggregate_remove": "جمله : حذف"
				},
				"validate": {
					"error": "خطأ :",
					"minLength": "القيمه لابد ان لا تقل عن THRESHOLD حرف.",
					"maxLength": "القيمه لابد ان لا تزيد عن THRESHOLD حرف.",
					"required": "مطلوب قيمه"
				}
			});
			return $delegate;
		}]);
	}]);
})();
