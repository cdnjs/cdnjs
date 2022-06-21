/*此处为后台配置*/
const hpp_domain = "blogadmin.cyfan.top"
const hpp_userimage = "https://cdn.jsdelivr.net/gh/ChenYFan/CDN/img/avatar.png"
const hpp_title = "ChenYFan的后台"
const hpp_usericon = "https://cdn.jsdelivr.net/gh/ChenYFan/CDN/img/ico/apple-touch-icon.png"
const hpp_password = ""
const hpp_username = ""
const hpp_cors = "*"
const hpp_CDNver = "b8a6e54"
/*此处为Github配置*/
const hpp_githubdoctoken = ""
const hpp_githubimagetoken = hpp_githubdoctoken
const hpp_githubdocusername = ""
const hpp_githubdocrepo = ""
const hpp_githubdocpath = ""
const hpp_githubdocbranch = ""
const hpp_githubimageusername = ""
const hpp_githubimagerepo = ""
const hpp_githubimagepath = ""
const hpp_githubimagebranch = ""


const hpp_ver = "HexoPlusPlus@0.0.5"
const hpp_githubgetimageinit = {
    method: "GET",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        "user-agent": hpp_ver,
        "Authorization": "token " + hpp_githubimagetoken
    },
}
const hpp_githubgetdocinit = {
    method: "GET",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        "user-agent": hpp_ver,
        "Authorization": "token " + hpp_githubdoctoken
    },
}


const hpp_loginhtml = '<!DOCTYPE html><html lang="zh-cmn-Hans"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"><script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1"></script><link rel="shortcut icon" href="'+hpp_usericon+'" type="image/x-icon" /><title>' + hpp_title + '</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@' + hpp_CDNver + '/dist/login.css">   </head><body><div id="all"><div class="wrapper"><div class="bg-container"><div class="container"><h1 style="margin: 0;" id="bar">Welcome</h1><form class="form" id="fm"><input id="username" type="text" placeholder="用户名" value name="username" /><input id="password" type="password" placeholder="密码" value name="password" /><button type="button" id="login-button">登陆</button><br /><br /><a href="https://github.com/HexoPlusPlus/HexoPlusPlus" id="tips">@HexoPP</a></form></div></div><ul class="bg-bubbles"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div></div><script>  $("#login-button").click(function (event) {   document.cookie="username=" + document.getElementById("username").value;  document.cookie="password="+document.getElementById("password").value;  location.reload();  });</script></body></html>'
const hpp_adminhtml = `

<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8">                                  
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${hpp_title}</title>
	<script src="https://cdn.jsdelivr.net/npm/jquery@2.2.4"></script>
	<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.4.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.6/dist/css/bootstrap.min.css">  
	<link rel="shortcut icon" href="${hpp_usericon}" type="image/x-icon" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/admin.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.6/dist/js/bootstrap.min.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/markusslima/bootstrap-filestyle@gh-pages/1.2.3/js/bootstrap-filestyle.min.js"></script>
	
		</head>
<body>
	
		<div class="container pb30">
			<div class="clear-backend">
			<div class="avatar">
				<div>
					<a href="/" target="_blank">
						<img src="${hpp_userimage}" alt="">
					</a>
				</div>
			</div>

			<!-- tab-menu -->
			<input type="radio" class="tab-1" name="tab" checked="checked">
			<span>主页</span><i class="fa fa-home"></i>

			<input type="radio" class="tab-2" name="tab">
			<span>书写</span><i class="fa fa-medium"></i>

			<input type="radio" class="tab-3" name="tab">
			<span>图床</span><i class="fa fa-image"></i>

			<input type="radio" class="tab-4" name="tab">
			<span>资源</span><i class="fa fa-link"></i>
<!--		
			<input type="radio" class="tab-6" name="tab">
			<span>--</span><i class="fa fa-star"></i>
			
			<input type="radio" class="tab-7" name="tab">
			<span>--</span><i class="fa fa-photo"></i>
			
			<input type="radio" class="tab-8" name="tab">
			<span>--</span><i class="fa fa-line-chart"></i>
			
			<input type="radio" class="tab-9" name="tab">
			<span>--</span><i class="fa fa-link"></i>
			
			<input type="radio" class="tab-10" name="tab">
			<span>--</span><i class="fa fa-cog"></i>
-->
			<div class="top-bar">
				<ul>
					<li>
						<a href="javascript:hpp_logout()" title="Log Out">
							<i class="fa fa-sign-out"></i>
						</a>
					</li>
					<li>
						<a href="javascript:jQuery.getScript\(\'https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@main/update.js\'\)" title="Update">
							<i class="fa fa-upload"></i>
						</a>
					</li><!--
					<li>
						<a href="" title="Edit">
							<i class="fa fa-edit"></i>
						</a>
					</li>-->
				</ul>
			</div>

			<!-- tab-content -->
			<div class="tab-content">
				<section class="tab-item-1">
					<table class="table table-striped">
  <caption>后端信息表</caption>
  <thead>
    <tr>
      <th>目标</th>
      <th>键值</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>当前版本</td>
      <td>${hpp_ver}</td>
    </tr>
    <tr>
      <td>绑定的域名</td>
      <td>${hpp_domain}</td>
    </tr>
    <tr>
      <td>用户头像</td>
      <td>${hpp_userimage}</td>
    </tr>
    <tr>
      <td>用户icon</td>
      <td>${hpp_usericon}</td>
    </tr>
    <tr>
      <td>跨域</td>
      <td>${hpp_cors}</td>
    </tr>
    <tr>
      <td>CDN版本</td>
      <td>${hpp_CDNver}</td>
    </tr>
    <tr>
      <td>Github文档存储用户名</td>
      <td>${hpp_githubdocusername}</td>
    </tr>
    <tr>
      <td>Github文档存储仓库名</td>
      <td>${hpp_githubdocrepo}</td>
    </tr>
    <tr>
      <td>Github文档存储路径</td>
      <td>${hpp_githubdocpath}</td>
    </tr>
    <tr>
      <td>Github文档存储分支</td>
      <td>${hpp_githubdocbranch}</td>
    </tr>
    <tr>
      <td>Github图片存储用户名</td>
      <td>${hpp_githubimageusername}</td>
    </tr>
    <tr>
      <td>Github图片存储仓库名</td>
      <td>${hpp_githubimagerepo}</td>
    </tr>
    <tr>
      <td>Github图片存储路径</td>
      <td>${hpp_githubimagepath}</td>
    </tr>
    <tr>
      <td>Github图片存储分支</td>
      <td>${hpp_githubimagebranch}</td>
    </tr>
    <tr>
      <td>CDN节点位置</td>
      <td id="cdn"></td>
    </tr>
     <tr>
      <td>用户IP</td>
      <td id="ip"></td>
    </tr>
    <tr>
      <td>User-Agent</td>
      <td id="uag"></td>
    </tr>
    <tr>
      <td>是否以HTTPS方式连接</td>
      <td id="httpos"></td>
    </tr>
    <tr>
      <td>HTTP连接版本</td>
      <td id="http"></td>
    </tr>
    <tr>
      <td>用户所处地区</td>
      <td id="loc"></td>
    </tr>
    <tr>
      <td>SSL版本</td>
      <td id="tls"></td>
    </tr>
    <tr>
      <td>是否使用Warp</td>
      <td id="warp"></td>
    </tr>
  </tbody>
</table>
				</section>
				<section class="tab-item-2">
				
				<select id="choo" class="form-control form-control-chosen" style="display: inline;"></select>
<button onclick="getdoc();" class="btn-sm btn btn-success">GET</button>

					<div class="markdown_editor" style="position: initial;">
				<textarea id="mdeditor" name="content" rows="10"></textarea>
			</div>
				</section>
				<section class="tab-item-3">
                <select id="chooimage" class="form-control form-control-chosen" style="display: inline;">
                <option>jpg</option>
                <option>png</option>
                <option>webp</option>
                <option>jpeg</option>
                </select>
				
				
				<form id="upform" enctype='multipart/form-data' style="display:none;">
    <div class="form-group">
        <label for="upteainput">上传文件</label>
        <input type="file" id="input">
    </div>
</form>
<button id="uptea" type="button" class="btn btn-primary">上传</button>
				
				</section>
				<section class="tab-item-4">
					<button type="button" class="btn btn-primary" onclick="location.href='/hpp/admin/docsmanager'">文档资源管理</button>
				<button type="button" class="btn btn-primary" onclick="location.href='/hpp/admin/imgsmanager'">图片资源管理</button>
                </section>
				<section class="tab-item-5">
					<h1>Five</h1>
				</section>
				<section class="tab-item-6">
					<h1>Six</h1>
				</section>
				<section class="tab-item-7">
					<h1>Sever</h1>
				</section>
				<section class="tab-item-8">
					<h1>Eight</h1>
				</section>
				<section class="tab-item-9">
					<h1>Nine</h1>
				</section>
				<section class="tab-item-10">
					<h1>Ten</h1>
				</section>
			</div>
		</div>
	
	<script>
    const hpp_now= '${hpp_ver}';
    const hpp_ver = '${hpp_ver}';
	function hpp_logout(){
	document.cookie="username=";  document.cookie="password=";  location.reload();
	};
	</script>
	<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/bm.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/bm.zh.js"></script>
	
	<script src="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/admin.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert/dist/sweetalert.min.js"></script>
	
</body>
</html>
`
const hpp_filemanager_p1 = `<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/filemanager.css" />
	<link rel="shortcut icon" href="${hpp_usericon}" type="image/x-icon" />
`
const hpp_filemanager_docs1 = `
	<title>${hpp_title}-文档资源管理器</title>
	<script>
	const hpp_githubdocusername = "${hpp_githubdocusername}"
	const hpp_githubdocrepo = "${hpp_githubdocrepo}"
	const hpp_githubdocpath = "${hpp_githubdocpath}"
	const hpp_githubdocbranch = "${hpp_githubdocbranch}"
	</script>
`
const hpp_filemanager_img1 = `
	<title>${hpp_title}-图片资源管理器</title>
	<script>
	const hpp_githubimageusername = "${hpp_githubimageusername}"
	const hpp_githubimagerepo = "${hpp_githubimagerepo}"
	const hpp_githubimagepath = "${hpp_githubimagepath}"
	const hpp_githubimagebranch = "${hpp_githubimagebranch}"
	</script>
`
const hpp_filemanager_p2 = `

</head>
<body>
    <div class="loader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>

    <aside class="sidebar">
      <div class="logo">
        <a href="/hpp/admin">←</a>
      </div>
    </aside>
    <section class="grid-holder">
      <div class="grid-list-layout">
        <nav class="navigation">
        </nav>
        
        <div class="grid-list-holder">
          <span class="grid-layout active">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <g>
            <g>
              <path d="M176.792,0H59.208C26.561,0,0,26.561,0,59.208v117.584C0,209.439,26.561,236,59.208,236h117.584
                C209.439,236,236,209.439,236,176.792V59.208C236,26.561,209.439,0,176.792,0z M196,176.792c0,10.591-8.617,19.208-19.208,19.208
                H59.208C48.617,196,40,187.383,40,176.792V59.208C40,48.617,48.617,40,59.208,40h117.584C187.383,40,196,48.617,196,59.208
                V176.792z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M452,0H336c-33.084,0-60,26.916-60,60v116c0,33.084,26.916,60,60,60h116c33.084,0,60-26.916,60-60V60
                C512,26.916,485.084,0,452,0z M472,176c0,11.028-8.972,20-20,20H336c-11.028,0-20-8.972-20-20V60c0-11.028,8.972-20,20-20h116
                c11.028,0,20,8.972,20,20V176z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M176.792,276H59.208C26.561,276,0,302.561,0,335.208v117.584C0,485.439,26.561,512,59.208,512h117.584
                C209.439,512,236,485.439,236,452.792V335.208C236,302.561,209.439,276,176.792,276z M196,452.792
                c0,10.591-8.617,19.208-19.208,19.208H59.208C48.617,472,40,463.383,40,452.792V335.208C40,324.617,48.617,316,59.208,316h117.584
                c10.591,0,19.208,8.617,19.208,19.208V452.792z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M452,276H336c-33.084,0-60,26.916-60,60v116c0,33.084,26.916,60,60,60h116c33.084,0,60-26.916,60-60V336
                C512,302.916,485.084,276,452,276z M472,452c0,11.028-8.972,20-20,20H336c-11.028,0-20-8.972-20-20V336c0-11.028,8.972-20,20-20
                h116c11.028,0,20,8.972,20,20V452z"/>
            </g>
          </g>
          <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
          </svg>
        </span>
          <span class="list-layout">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <g>
      <g>
        <path d="M100.923,0C64.276,0,34.462,29.814,34.462,66.462s29.814,66.462,66.462,66.462c36.647,0,66.462-29.814,66.462-66.462
          S137.57,0,100.923,0z M100.923,103.385C80.563,103.385,64,86.821,64,66.462s16.563-36.923,36.923-36.923
          c20.36,0,36.923,16.563,36.923,36.923S121.283,103.385,100.923,103.385z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M462.769,22.154h-256c-8.157,0-14.769,6.613-14.769,14.769V96c0,8.157,6.613,14.769,14.769,14.769h256
          c8.157,0,14.769-6.613,14.769-14.769V36.923C477.538,28.767,470.926,22.154,462.769,22.154z M448,81.231H221.538V51.692H448
          V81.231z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M100.923,189.538c-36.647,0-66.462,29.814-66.462,66.462s29.814,66.462,66.462,66.462
          c36.647,0,66.462-29.814,66.462-66.462S137.57,189.538,100.923,189.538z M100.923,292.923C80.563,292.923,64,276.36,64,256
          s16.563-36.923,36.923-36.923c20.36,0,36.923,16.563,36.923,36.923S121.283,292.923,100.923,292.923z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M462.769,211.692h-256c-8.157,0-14.769,6.613-14.769,14.769v59.077c0,8.157,6.613,14.769,14.769,14.769h256
          c8.157,0,14.769-6.613,14.769-14.769v-59.077C477.538,218.305,470.926,211.692,462.769,211.692z M448,270.769H221.538v-29.538H448
          V270.769z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M100.923,379.077c-36.647,0-66.462,29.814-66.462,66.462S64.276,512,100.923,512c36.647,0,66.462-29.814,66.462-66.462
          S137.57,379.077,100.923,379.077z M100.923,482.462c-20.36,0-36.923-16.563-36.923-36.923c0-20.36,16.563-36.923,36.923-36.923
          c20.36,0,36.923,16.563,36.923,36.923C137.846,465.898,121.283,482.462,100.923,482.462z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M462.769,401.231h-256c-8.157,0-14.769,6.613-14.769,14.769v59.077c0,8.157,6.613,14.769,14.769,14.769h256
          c8.157,0,14.769-6.613,14.769-14.769V416C477.538,407.843,470.926,401.231,462.769,401.231z M448,460.308H221.538v-29.538H448
          V460.308z"/>
      </g>
    </g>
    <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
          </svg>
        </span>
        </div>
      </div>
      <div class="grid masonry" id="item-all">     
      </div>
    </section>
	<script src="https://cdn.jsdelivr.net/npm/jquery@2.2.4" type="text/javascript"></script>
`
const hpp_filemanager_docs2 = `
<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/filemanager.js"></script>
</body>
</html>`
const hpp_filemanager_img2 = `
<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/imgmanager.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script>
</body>
</html>`


const hpp_filemanager_docs = hpp_filemanager_p1 + hpp_filemanager_docs1 + hpp_filemanager_p2 + hpp_filemanager_docs2
const hpp_filemanager_img = hpp_filemanager_p1 + hpp_filemanager_img1 + hpp_filemanager_p2 + hpp_filemanager_img2

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})
function getCookie(request, name) {
    let result = ""
    const cookieString = request.headers.get("Cookie")
    if (cookieString) {
        const cookies = cookieString.split(";")
        cookies.forEach(cookie => {
            const cookiePair = cookie.split("=", 2)
            const cookieName = cookiePair[0].trim()
            if (cookieName === name) {
                const cookieVal = cookiePair[1]
                result = cookieVal
            }
        })
    }
    return result
}

async function handleRequest(request) {

    /*!!!!!!高危，无权限，仅供测试
    var hpp_logstatus = 1
    */
    var hpp_logstatus = 0
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    if (getCookie(request, "password") == hpp_password && getCookie(request, "username") == hpp_username) {
        hpp_logstatus = 1
        const now = Date.now(new Date())
        await KVNAME.put("hpp_activetime", now)
        const hpp_kvwait = Date.now(new Date()) - now
    }
    if (path.startsWith('/hpp/admin')) {
        if (hpp_logstatus == 1) {
            if (path == '/hpp/admin/docsmanager'){
                return new Response(hpp_filemanager_docs, {
                headers: { "content-type": "text/html;charset=UTF-8" }
            })
            }
            if (path == '/hpp/admin/imgsmanager'){
                return new Response(hpp_filemanager_img, {
                headers: { "content-type": "text/html;charset=UTF-8" }
            })
            }
            if (path.startsWith("/hpp/admin/api/adddoc/")) {
                const file = await request.text()
                const filename = path.substr(("/hpp/admin/api/adddoc/").length)
                const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${hpp_githubdocpath}${filename}`
                const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())).sha
                const hpp_body = {
                    branch: hpp_githubdocbranch, message: `Upload from ${hpp_ver} By ${hpp_githubdocusername}`, content: file, sha: hpp_sha
                }
                const hpp_docputinit = {
                    body: JSON.stringify(hpp_body),
                    method: "PUT",
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                        "user-agent": hpp_ver,
                        "Authorization": "token " + hpp_githubdoctoken
                    }
                }
                const hpp_r = await fetch(url, hpp_docputinit)
                const hpp_r_s = await hpp_r.status
                if (hpp_r_s == 200 || hpp_r_s == 201) {
                    return new Response('Update Success', { status: hpp_r_s })
                } else {
                    return new Response('Fail To Update', { status: hpp_r_s })
                }

            }
            if (path.startsWith("/hpp/admin/api/addimage")) {
                const file = await request.text()
                const hpp_time = Date.parse(new Date())
                const filename = path.substr(("/hpp/admin/api/addimage/").length)
                const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${hpp_githubimagepath}${hpp_time}.${filename}`
                const hpp_body = {
                    branch: hpp_githubimagebranch, message: `Upload from ${hpp_ver} By ${hpp_githubdocusername}`, content: file
                }
                const hpp_docputinit = {
                    body: JSON.stringify(hpp_body),
                    method: "PUT",
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                        "user-agent": hpp_ver,
                        "Authorization": "token " + hpp_githubdoctoken
                    }
                }
                const hpp_r = await fetch(url, hpp_docputinit)
                const hpp_r_s = await hpp_r.status
                if (hpp_r_s == 200 || hpp_r_s == 201) {
                    return new Response(`https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${hpp_time}.${filename}`, { status: hpp_r_s })
                } else {
                    return new Response(`Fail To Upload Image`, { status: hpp_r_s })
                }
            }
            if (path.startsWith("/hpp/admin/api/deldoc")) {
                const filename = path.substr(("/hpp/admin/api/deldoc/").length)
                const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${hpp_githubdocpath}${filename}`
                const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())).sha
                const hpp_body = {
                    branch: hpp_githubdocbranch, message: `Delete from ${hpp_ver} By ${hpp_githubdocusername}`, sha: hpp_sha
                }
                const hpp_docputinit = {
                    body: JSON.stringify(hpp_body),
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                        "user-agent": hpp_ver,
                        "Authorization": "token " + hpp_githubdoctoken
                    }
                }
                const hpp_r = await fetch(url, hpp_docputinit)
                const hpp_r_s = await hpp_r.status
                if (hpp_r_s == 200) {
                    return new Response('Delete Success', { status: hpp_r_s })
                } else {
                    return new Response('Fail To Delete doc', { status: hpp_r_s })
                }
            }
            if (path.startsWith("/hpp/admin/api/delimage")) {

                const filename = path.substr(("/hpp/admin/api/delimage/").length)
                const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${hpp_githubimagepath}${filename}?ref=${hpp_githubimagebranch}`
                const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetimageinit)).text())).sha
                const hpp_body = {
                    branch: hpp_githubimagebranch, message: `Delete from ${hpp_ver} By ${hpp_githubdocusername}`, sha: hpp_sha
                }
                const hpp_docputinit = {
                    body: JSON.stringify(hpp_body),
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                        "user-agent": hpp_ver,
                        "Authorization": "token " + hpp_githubdoctoken
                    }
                }
                const hpp_r = await fetch(url, hpp_docputinit)
                const hpp_r_s = await hpp_r.status
                if (hpp_r_s == 200) {
                    return new Response('Delete Success', { status: hpp_r_s })
                } else {
                    return new Response('Fail To Delete doc', { status: hpp_r_s })
                }
            }
            if (path.startsWith("/hpp/admin/api/getdoc")) {
                const filename = path.substr(("/hpp/admin/api/getdoc/").length)
                return (fetch(`https://raw.githubusercontent.com/${hpp_githubdocusername}/${hpp_githubdocrepo}/${hpp_githubdocbranch}${hpp_githubdocpath}${filename}?ref=${hpp_githubdocbranch}`))
            }
            if (path == "/hpp/admin/api/getlist") {
                const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${hpp_githubdocpath}?ref=${hpp_githubdocbranch}`
                const hpp_getlist = await fetch(url, hpp_githubgetdocinit)
                return new Response(await (hpp_getlist).text(), {
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                        "Access-Control-Allow-Origin": hpp_cors
                    }
                })
            }
            if (path == "/hpp/admin/api/getimglist") {
                const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${hpp_githubimagepath}?ref=${hpp_githubimagebranch}`
                const hpp_getlist = await fetch(url, hpp_githubgetimageinit)
                return new Response(await (hpp_getlist).text(), {
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                        "Access-Control-Allow-Origin": hpp_cors
                    }
                })
            }
            return new Response(hpp_adminhtml, {
                headers: { "content-type": "text/html;charset=UTF-8" }
            })
        }
        else {
            if (path == '/hpp/admin') {
                return new Response(hpp_loginhtml, {
                    headers: { "content-type": "text/html;charset=UTF-8" }
                })
            }
            return Response.redirect('https://' + hpp_domain + '/hpp/admin', 302)
        }

    }
    if (path.startsWith('/hpp/api')) {
        if (path == "/hpp/api/getblogeractive") {
            const hpp_activetime = await KVNAME.get("hpp_activetime")
            var k = (Date.parse(new Date()) - hpp_activetime) / 1000
            if (k < 30) {
                return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主刚刚还在这儿呢\'', { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
            }
            if (k < 60) {
                return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + k + '秒前离开这儿\'', { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
            }
            if (k < 3600) {
                return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + Math.round(k / 60) + '分钟前偷偷瞄了一眼博客\'', { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
            }
            if (k < 86400) {
                return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + Math.round(k / 3600) + '小时前活跃了一次\'', { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
            }
            return new Response(hpp_activetime)
        }
        return new Response('APIERROR')
    }
    return new Response('ERROR')
}

