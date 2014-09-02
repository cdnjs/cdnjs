YUI.add('datatable-paginator-templates', function (Y, NAME) {

var engine = new Y.Template(),

/*
{
    wrapperClass,
    numOfCols
}
*/
rowWrapper = '<tr><td class="<%= this.wrapperClass %>" colspan="' +
             '<%= this.numOfCols %>"/></tr>',

/*
{
    classNames: {}
}
*/
content = '<%= buttons %><%= this.classNames.gotoPage %>' +
          '<%= this.classNames.perPage %>',

/*
{
    classNames: {},
    type,
    label
}
*/
button = '<button class="<%= this.classNames.control %> ' +
         '<%= this.classNames.control %>-<%= this.type %>" ' +
         'data-type="<%= this.type %>"><%= this.label %></button>',

/*
{
    classNames,
    buttons: [
        { type, label }
    ]
}
*/
buttons = '<div class="<%= this.classNames.controls %> <%= this.classNames.group %>">' +
            '<%== this.buttons %>' +
        '</div>',

/*
{
    classNames,
    strings,
    page
}
*/
gotoPage = '<form action="#" class="<%= this.classNames.group %>">' +
                '<label><%= this.strings.goToLabel %>' +
                '<input type="text" value="<%= this.page %>">' +
                '<button><%= this.strings.goToAction %></button>' +
                '</label>' +
            '</form>',

/*
{
    classNames,
    strings,
    options
}
*/
perPage = '<div class="<%= this.classNames.group %> <%= this.classNames.perPage %>">' +
                '<label><%= this.strings.perPage %> <select>' +
                '<% Y.Array.each(this.options, function (option, i) { %>' +
                    '<option value="<%= option.value %>" <%= option.selected %>>' +
                    '<%= option.label %></option>'+
                '<% }); %>' +
            '</select></label></div>';




Y.namespace('DataTable.Templates').Paginator = {
    rowWrapper: engine.compile(rowWrapper),
    button: engine.compile(button),
    content: engine.compile(content),
    buttons: engine.compile(buttons),
    gotoPage: engine.compile(gotoPage),
    perPage: engine.compile(perPage)
};


}, '@VERSION@', {"requires": ["template"]});
