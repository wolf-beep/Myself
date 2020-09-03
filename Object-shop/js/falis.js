const oUls = document.querySelectorAll('section ul');

let start = 0;
let bool = '原始值';
setLi();
window.onscroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    let winHeight = document.documentElement.clientHeight;
    let minUl = oUls[0];
    let minUlHeight = minUl.offsetHeight;
    oUls.forEach((i) => {
        if (i.offsetHeight < minUlHeight) {
            minUl = i;
            minUlHeight = i.offsetHeight;
        }
    })
    if (scrollTop + winHeight > minUlHeight - 500) {
        setLi();
    }
}

function setLi() {
    if (bool !== '原始值') {
        return;
    }
    bool = '其他数值';
    const time = new Date();
    let t = parseInt(time.getTime() / 1000);
    const xhr = new XMLHttpRequest();
    xhr.open('get', `/dt?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=%E7%BE%8E%E9%A3%9F%E8%8F%9C%E8%B0%B1&start=${start}&_=${t}`);
    xhr.send();
    xhr.onload = () => {
        const resArr = JSON.parse(xhr.response);
        start = resArr.data.next_start;
        const arr = resArr.data.object_list;
        arr.forEach((item) => {
            let oDivWidth = oUls[0].clientWidth;
            let oDivHeight = oDivWidth * item.photo.height / item.photo.width;
            let str = `
                    <li>
                        <div class="imgBox" style="height:${oDivHeight}px">
                            <img src="${item.photo.path}">    
                        </div>
                        <div class="contentBox">
                            <p>${item.msg}</p>
                            <p>
                                <!-- 去 bootstrap 官网 点击 3.3.7版本说明文档 组件中有 ICON字体图标说明 
                                    将需要 字体图标 的 class类名 定义在标签中就可以了 
                                -->
                                
                                <i class="glyphicon glyphicon-heart" style="${item.like_count === 0 ? 'display:none' : ''}"></i>
                                <span style="${item.like_count === 0 ? 'display:none' : ''}">${item.like_count}</span>
                                <i class="glyphicon glyphicon-star-empty" style="${item.favorite_count === 0 ? 'display:none' : ''}"></i>
                                <span style="${item.favorite_count === 0 ? 'display:none' : ''}">${item.favorite_count}</span>                       
                            </p>
                            <p> 
                                <span>
                                    <img src="${item.sender.avatar}">
                                </span>
                                <span>
                                    <strong>${item.sender.username}</strong>
                                    <strong>发布到: <a href="JavaScript:;">${item.album.name}</a></strong>
                                </span>
                            </p>
                        </div>
                    </li>
                    `;
            let minUl = oUls[0];
            let minUlHeight = minUl.offsetHeight;
            oUls.forEach((i) => {
                if (i.offsetHeight < minUlHeight) {
                    minUl = i;
                    minUlHeight = i.offsetHeight;
                }
            })
            minUl.innerHTML += str;
        })
        bool = '原始值';
    }
}