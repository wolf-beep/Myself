// 1,获取地址栏参数函数
// 获取地址栏信息中心,字符串参数,转化为对象形式

function getURLValue() {
    var str = decodeURI(window.location.search).substr(1);
    var obj = {};
    var arr1 = str.split('&');
    arr1.forEach(function (v) {
        var arr2 = v.split('=');
        obj[arr2[0]] = arr2[1];
    })
    return obj;
}


// 2,随机颜色
function setColor() {
    // 方法1: 不推荐使用  颜色比较少
    // 创建所有英文单词的数组,随机索引下标,获取随机颜色字符串
    // var colorArr = ['red' , 'blue' , 'pink' , 'yellow' , 'orange' , 'green'];
    // var num = parseInt( Math.random()*colorArr.length );
    // return colorArr[num];

    // 方法2: #6位十六进制数值
    // 设定字符串,通过随机下标,获取6个字符,拼接在#号之后
    // var str = '0123456789abcdef';
    // var color = '#';
    // for(var i = 1 ; i <= 6 ; i++){
    //     var num = parseInt( Math.random()*str.length );
    //     color += str[num];
    // }
    // return color;

    // 方法3: rgb()  0-255的随机数
    return `rgb(${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)})`;
}


// 3,随机6位验证码
function setVc() {
    var str = '0123456789abcdefghijklmnopqrestuvwxyzABCDEFGHIJKLMNOPQRESTUVWXYZ';
    var vc = '';
    while (vc.length !== 6) {
        var num = parseInt(Math.random() * str.length);
        if (vc.indexOf(str[num]) === -1) {
            vc += str[num];
        }
    }
    return vc;
}


// 3,兼容语法,获取指定标签的指定css样式属性值
// 两个参数 : 参数1:标签对象  参数2:标签属性
function myGetStyle(ele, style) {
    // 兼容低版本IE浏览器
    // 如果有 window.getComputedStyle 就使用 window.getComputedStyle
    if (window.getComputedStyle) {
        // ele是要获取属性的标签
        // style是要获取的样式属性,[]语法解析变量
        return window.getComputedStyle(ele)[style];
    } else {
        // 没有 window.getComputedStyle , 使用低版本IE语法
        return ele.currentStyle(style);
    }
}


// 4,兼容语法,添加监听事件
function myAddEventListener(ele, type, fun) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fun)
    } else {
        ele.attachEvent('on' + type, fun)
    }
}

// 5,兼容语法,删除监听事件
function myRemoveEventListener(ele, type, fun) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fun)
    } else {
        ele.detachEvent('on' + type, fun)
    }
}


// 6,move运动函数
// 参数1:运动的标签对象
// 参数2:运动的属性和属性值 对象类型
// 参数3:运动终止,执行的回调函数 函数名称 / 匿名函数

function move(element, type, callback) {
    // 创建对象,存储不同属性的定时器
    let obj = {};
    // 循环遍历参数2,key存储的是运动css样式属性
    for (let key in type) {
        // 创建定时器,存储在对象中,属性是运动css样式属性,属性值是 setInterval() 的返回值,也就是定时器序号
        obj[key] = setInterval(() => {
            // 获取原始属性值
            // 如果是透明度,直接获取属性值,并且乘以 100
            // 不是透明度,去除px单位,获取数值部分
            let oldStyle = key === 'opacity' ? myGetStyle(element, key) * 100 : parseInt(myGetStyle(element, key));

            // 计算步长
            // 如果是透明度,原始属性值*100 - 初始属性值 / 次数
            // 不是透明度, 原始属性值 - 初始属性值 / 次数
            let speed = key === 'opacity' ? (type[key] * 100 - oldStyle) / 5 : (type[key] - oldStyle) / 5;

            // 步长取整
            // 正数 : 向上取整
            // 负数 : 向下取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 初始值累加步长
            oldStyle += speed;

            // 将改变的初始值,赋值给标签对象
            // 如果是透明度, 改变的初始值/100 赋值
            // 如果不是透明度 , 改变的初始值 拼接 px 单位
            element.style[key] = key === 'opacity' ? oldStyle / 100 : `${oldStyle}px`;

            // 判断改变的初始值 等于 最终位置

            if (key === 'opacity') {
                if (oldStyle === type[key] * 100) {
                    // 清除定时器
                    clearInterval(obj[key]);
                    // 删除对象中的对应的数据单元
                    delete(obj[key]);
                }
            } else {
                if (oldStyle === type[key]) {
                    // 清除定时器
                    clearInterval(obj[key]);
                    // 删除对象中的对应的数据单元
                    delete(obj[key]);
                }
            }

            // 获取对象的所有键名,组成新的数组
            var arr = Object.keys(obj);
            // 如果数组长度为0,证明对象没有单元,所有定时器都清除
            if (arr.length === 0) {
                // 执行回调函数
                callback()
            }
        }, 30)
    }
}


// 定义一个函数,专门生成table表格内容
// 参数:需要根据生成table表格的数组
function setTable(array) {
    let str = '';
    // item 是 数组的单元,就是存储每一行内容的对象
    array.forEach((item) => {
        str += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.sex}</td>
                        <td>${item.age}</td>
                        <td>${item.city}</td>
                        <td>${item.dep}</td>
                        <td>${item.pay}</td>
                        <td><button index="${item.id}" name="del">删除</button></td>
                        <td><button index="${item.id}" name="update">修改</button></td>
                    </tr>
                `;
    });

    return str;
}


// 设定cookie函数
// 参数1:cookie的键名
// 参数2:cookie的键值
// 参数3:cookie的时效
function mySetCookie(key, value, time) {
    const nowTime = new Date();
    let timeStamp = nowTime.getTime();
    timeStamp -= 8 * 60 * 60 * 1000;
    timeStamp += time * 1000;
    nowTime.setTime(timeStamp);
    let t = time === undefined ? '' : nowTime;
    document.cookie = `${key}=${value};expires=${t};path=/`;

}


function myGetCookie() {
    // 将cookie字符串,按照 分号空格 为间隔符号,转化为数组
    // 在按照 =等号 转化为数组 数组[0] 是对象的键名 数组[1]是对象的键值

    // 1,获取cookie字符串
    let str = document.cookie;
    var obj = {};
    var arr1 = str.split('; ');
    arr1.forEach(function (v) {
        var arr2 = v.split('=');
        obj[arr2[0]] = arr2[1];
    })
    return obj;
}