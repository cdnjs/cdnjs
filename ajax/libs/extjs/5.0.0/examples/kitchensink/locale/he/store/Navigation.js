Ext.define('KitchenSink.locale.store.Navigation', {
    override: 'KitchenSink.store.Navigation',
    title: 'דוגמאות',
    getNavItems: function() {
        return Ext.Object.merge(this.callParent(), [
            {
                text: 'פנלים',
                children: [
                    { id: 'basic-panels', text: 'פנל בסיסי', leaf: true },
                    { id: 'framed-panels', text: 'פנל ממוסגר', leaf: true }
                ]
            },
            {
                text: 'רשתות',
                children: [
                    { id: 'array-grid', text: 'רשת מערך', leaf: true },
                    { id: 'grouped-grid', text: 'רשת מקובצת ', leaf: true },
                    { id: 'locking-grid', text: 'רשת קפוא', leaf: true },
                    { id: 'grouped-header-grid', text: 'רשת כותרת מקובצים', leaf: true },
                    { id: 'multi-sort-grid', text: 'רשת רבת מיון', leaf: true },
                    { id: 'progress-bar-pager', text: 'סרגל התקדמות עם החלפה', leaf: true },
                    { id: 'sliding-pager', text: 'סרגל התקדמות עם מחוון', leaf: true },
                    { id: 'reconfigure-grid', text: 'שינוי תצורה של רשתות', leaf: true },
                    { id: 'property-grid', text: 'רשת מאפיינים', leaf: true },
                    { id: 'cell-editing', text: 'עריכה בתוך תאים', leaf: true },
                    { id: 'row-expander-grid', text: 'מרחיב שורות', leaf: true },
                    { id: 'big-data-grid', text: 'נתונים גדולים', leaf: true }
                ]
            },
            {
                text: 'תצוגות עץ',
                children: [
                    { id: 'basic-trees', text: 'תצוגות עץ בסיסיות', leaf: true },
                    { id: 'tree-reorder', text: 'מיון תצוגות עץ', leaf: true },
                    { id: 'tree-grid', text: 'רשת עץ', leaf: true },
                    { id: 'tree-two', text: 'שתי תצוגות עץ', leaf: true },
                    { id: 'check-tree', text: 'תצוגות עץ עם תיבות סימון', leaf: true },
                    { id: 'tree-xml', text: 'XML תצוגות עץ', leaf: true }
                ]
            },
            {
                text: 'כרטיסיות',
                children: [
                    { id: 'basic-tabs', text: 'כרטיסיות בסיסיות', leaf: true },
                    { id: 'plain-tabs', text: 'כרטיסיות רגילות', leaf: true },
                    { id: 'framed-tabs', text: 'כרטיסיות ממוסגרות', leaf: true },
                    { id: 'icon-tabs', text: 'כרטיסיות סמלים', leaf: true }
                ]
            },
            {
                text: 'חלונות',
                children: [
                    { id: 'basic-window', text: 'חלון בסיסי', leaf: true }
                ]
            },
            {
                text: 'לחצנים',
                children: [
                    { id: 'basic-buttons', text: 'לחצנים בסיסיים', leaf: true },
                    { id: 'toggle-buttons', text: 'לחצנים דו-מצבים', leaf: true },
                    { id: 'menu-buttons', text: 'לחצני תפריט', leaf: true },
                    { id: 'menu-bottom-buttons', text: 'לחצני תפריט מתחת', leaf: true },
                    { id: 'split-buttons', text: 'לחצנים מפוצלים', leaf: true },
                    { id: 'split-bottom-buttons', text: 'לחצנים מפוצלים מתחת', leaf: true },
                    { id: 'left-text-buttons', text: 'לחצני טקסט משמאל', leaf: true },
                    { id: 'right-text-buttons', text: 'לחצני טקסט מימין', leaf: true },
                    { id: 'link-buttons', text: 'לחצני קישור', leaf: true }
                ]
            },
            {
                text: 'תצוגת נתונים',
                children: [
                    { id: 'dataview-multisort', text: 'תצוגת נתונים רבת מיון', leaf: true }
                ]
            },
            {
                text: 'טפסים',
                children: [
                    { id: 'form-login', text: 'טופס כניסה', leaf: true },
                    { id: 'form-contact', text: 'בטופס איש הקשר', leaf: true },
                    { id: 'form-register', text: 'טופס הרשמה', leaf: true  },
                    { id: 'form-number', text: 'שדה מספרי', leaf: true },
                    { id: 'form-date', text: 'בורר תאריכים', leaf: true },
                    { id: 'form-checkout', text: 'טופס קופה', leaf: true },
                    { id: 'form-grid', text: 'טופס עם רשת', leaf: true },
                    { id: 'form-tag', text: 'בחירה מרובה בתיבה משולבת', leaf: true }
                ]
            },
            {
                text: 'סרגלי כלים',
                children: [
                    { id: 'basic-toolbar', text: 'סרגל כלים בסיסי', leaf: true },
                    { id: 'docked-toolbars', text: 'סרגל כלים מעוגן', leaf: true }
                ]
            },
            {
                text: 'פריסה',
                children: [
                    { id: 'layout-accordion', text: 'פריסת אקורדיון', leaf: true }
                ]
            },
            {
                text: 'מחוון',
                children: [
                    { id: 'slider-field', text: 'שדה מחוון', leaf: true }
                ]
            },
            {
                text: 'גרירה ושחרור',
                children: [
                    { id: 'dd-field-to-grid', text: 'משדה לרשת', leaf: true },
                    { id: 'dd-grid-to-form', text: 'משדה לטופס', leaf: true },
                    { id: 'dd-grid-to-grid', text: 'מרשת לרשת', leaf: true }
                ]
            }
        ]);
    }
});

