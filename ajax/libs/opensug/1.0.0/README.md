# openSug.js
Simply reference a section of JS to get a search box with "search box prompts" to make your search easier!
Please browse the configuration page and examples : [here](https://www.opensug.org/ "https://www.opensug.org/")

Browser support: IE6+, Firefox, Chrome, Safari, Opera, Edge...

Provide the replacement result source, The default is to use **Baidu** result source.
```ini
var _source = 'google | haoso | kugou | yahoo | yandex | youku | taobao ';
```
## Example
### Simple
input type: text or search[only]

action: baiduSug = 1 or true : Automatic submission, baiduSug = 2 or false : Manual submission.
```ini
<input type="text" name="str" baiduSug="1|true" ... 
<input type="text" name="str" baiduSug="2|false" ... 
```
### Advanced
```JavaScript
BaiduSuggestion.bind('inputObj', {  // Input ID
      "XOffset": "-15",             // Proposal frame position X offset, unit px.
      "YOffset": "-30",             // Prompt box position vertical Y offset, unit px.
      "width": "",                  // Prompt box width, unit px.
      "fontColor": "#FF0000",       // Prompt text color.
      "fontColorHI": "#0000FF",     // Prompt box highlight text color when selected.
      "fontSize": "28px",           // font size
      "fontFamily": "Microsoft YaHei",    // Text fontFamily.
      "borderColor": "#008000",     // Prompt box border color.
      "bgcolorHI": "#FF6600",       // Prompt box highlights the selected color.
      "sugSubmit": true             // Whether to submit the form when the entry in the prompt box is selected.
  }, function(Callback){console.log('You have chosen：'+ Callback);});
```

**Note**: Introduce Javascript files in web pages. Javascript code should be added as far as possible behind the tag in the web page.

**Note**: If using utf-8 encoding, be sure to set the charset="gbk" attribute in the script tag, otherwise the search hints will be garbled.
