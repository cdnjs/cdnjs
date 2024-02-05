const changeContent = (content) => {
    if (content === '') return content;

    const replacements = [
        { regex: /<img.*?src="(.*?)"?[^\>]+>/ig, replacement: '[图片]' },
        { regex: /<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)<\/a>/gi, replacement: '[链接]' },
        { regex: /<pre><code>.*?<\/pre>/gi, replacement: '[代码]' },
        { regex: /<[^>]+>/g, replacement: "" }
    ];

    content = replacements.reduce((str, { regex, replacement }) => str.replace(regex, replacement), content);

    return content.length > 150 ? content.substring(0, 150) + '...' : content;
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

newestCommentInit()