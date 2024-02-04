const changeContent = (content) => {
    if (content === '') return content

    content = content.replace(/<img.*?src="(.*?)"?[^\>]+>|<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)<\/a>|<pre><code>.*?<\/pre>|<[^>]+>/g, (match, img, link, code) => {
        if (img) return '[图片]';
        if (link) return '[链接]';
        if (code) return '[代码]';
        return '';
    })

    if (content.length > 150) {
        content = content.substring(0, 150) + '...'
    }
    return content
}

const getComment = () => {
    const $dom = document.querySelector('#card-newest-comments .aside-list')

    const runTwikoo = () => {
        twikoo.getRecentComments({
            envId: GLOBAL_CONFIG.comment.twikoo.url,
            region: '',
            pageSize: 6,
            includeReply: true
        }).then(function (res) {
            const twikooArray = res.map(e => ({
                'content': changeContent(e.comment),
                'avatar': e.avatar,
                'nick': e.nick,
                'url': `${e.url}#${e.id}`,
                'date': new Date(e.created).toISOString()
            }))

            if (window.location.pathname === "/links/" || window.location.pathname === "/links") {
                let submit = document.getElementsByClassName('tk-submit ')
                let text = document.getElementsByClassName("el-textarea__inner");
                text[0].value += `昵称（请勿包含博客等字样）：
网站地址（要求博客地址，请勿提交个人主页）：
头像图片url（请提供尽可能清晰的图片，我会上传到我的图床）：
描述：`;
                text[0].style.height = "142px"
                submit.item(0).style.display = "none";

                window.checkForm = function () {
                    const checkboxes = document.querySelectorAll('input[onclick="checkForm()"]');
                    let allChecked = true;

                    checkboxes.forEach(checkbox => {
                        if (!checkbox.checked) {
                            allChecked = false;
                        }
                    });

                    if (allChecked) {
                        submit.item(0).style.display = "block";
                    } else {
                        submit.item(0).style.display = "none";
                    }
                }
            }

            generateHtml(twikooArray)
        }).catch(function (err) {
            $dom.innerHTML = "无法获取评论，请确认相关配置是否正确"
        })
    }
    runTwikoo()
}

const generateHtml = array => {
    const $dom = document.querySelector('#card-newest-comments .aside-list')
    $dom.innerHTML = array.length ? array.map(item => `
    <div class='aside-list-item'>
      <a href='${item.url}' class='thumbnail'>
        <img src='${item.avatar}' alt='${item.nick}'>
        <div class='name'><span>${item.nick}</span></div>
      </a>
      <div class='content'>
        <a class='comment' href='${item.url}'>${item.content}</a>
        <time class="datetime" datetime="${item.date}"></time>
      </div>
    </div>
  `).join('') : '没有评论'
    window.lazyLoadInstance && window.lazyLoadInstance.update()
    window.pjax && window.pjax.refresh($dom)
    changeTimeFormat()
}

const newestCommentInit = () => {
    const $asideList = document.querySelector('#card-newest-comments .aside-list')
    if ($asideList) {
        getComment()
    }
}
