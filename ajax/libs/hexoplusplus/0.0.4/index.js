/*此处为后台配置*/
const hpp_domain = "blogadmin.cyfan.top"
const hpp_userimage = "https://cdn.jsdelivr.net/gh/ChenYFan/CDN/img/avatar.png"
const hpp_title = "ChenYFan的后台"
const hpp_usericon = "https://cdn.jsdelivr.net/gh/ChenYFan/CDN/img/ico/apple-touch-icon.png"
const hpp_password = ""
const hpp_username = ""
const hpp_cors = "*"
const hpp_CDNver = "f0b9804"
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


const hpp_ver = "HexoPlusPlus@0.0.3"
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


const hpp_loginhtml = '<!DOCTYPE html><html lang="zh-cmn-Hans"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"><script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1"></script><link rel="favicon" href="' + hpp_usericon + '"><title>' + hpp_title + '</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@' + hpp_CDNver + '/dist/login.css">   </head><body><div id="all"><div class="wrapper"><div class="bg-container"><div class="container"><h1 style="margin: 0;" id="bar">Welcome</h1><form class="form" id="fm"><input id="username" type="text" placeholder="用户名" value name="username" /><input id="password" type="password" placeholder="密码" value name="password" /><button type="button" id="login-button">登陆</button><br /><br /><a href="https://github.com/HexoPlusPlus/HexoPlusPlus" id="tips">@HexoPP</a></form></div></div><ul class="bg-bubbles"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div></div><script>  $("#login-button").click(function (event) {   document.cookie="username=" + document.getElementById("username").value;  document.cookie="password="+document.getElementById("password").value;  location.reload();  });</script></body></html>'
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
<!--
			<input type="radio" class="tab-4" name="tab">
			<span>--</span><i class="fa fa-comment"></i>
			
			<input type="radio" class="tab-5" name="tab">
			<span>--</span><i class="fa fa-cloud-upload"></i>
			
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
					<h1>Four</h1>
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
                const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${hpp_githubimagepath}${filename}`
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

