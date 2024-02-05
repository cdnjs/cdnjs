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

const $asideList = document.querySelector('#card-newest-comments .aside-list')
const newestCommentInit = () => {
    if ($asideList) {
        getComment()
    }
}

const getComment = () => {
    Waline.RecentComments(
        options = {
            serverURL: GLOBAL_CONFIG.comment.waline.url,
            count: 6,
        }
    ).then(function (res) {
        const walineArray = res.comments.map(item => ({
            'content': changeContent(item.comment),
            'avatar': item.avatar,
            'nick': item.nick,
            'url': `${item.url}#${item.objectId}`,
            'date': new Date(item.insertedAt).toISOString()
        }))
        generateHtml(walineArray)
    }).catch(
        $asideList.innerHTML = "无法获取评论，请确认相关配置是否正确"
    )
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