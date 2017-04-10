/**
 * Created by Administrator on 2016/11/1.
 */
/**
 * 元素的替换，目前用于鼠标的移入移出特效
 * @param element
 * @param oldstr
 * @param newstr
 */
function replaceclassName(element,oldstr,newstr) {
    element.className=element.className.replace(oldstr,newstr);
}

/**
 * 获取对象内部文本
 * @param element
 * @returns {*}
 */
function getInnerText(element) {
    if (typeof element.innerText === "string") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}

/**
 * 设置对象内部文本
 * @param element
 * @param content
 */
function setInnerText(element, content) {
    if (typeof element.innerText === "string") {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}
/**
 * 获取下一个兄弟元素的封装
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if(element.nextElementSibling) {
        return element.nextElementSibling;
    }else {
        var next=element.nextSibling;
        while(next&&next.typeName!==1) {
            next=next.nextSibling;
        }
        return next;
    }
}


/**
 * 获取上一个兄弟元素的封装
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    if(element.previousElementSibling) {
        return element.previousElementSibling;
    }else {
        var previous=element.previousSibling;
        while(previous&&previous.nodeType!==1) {
            previous=previous.previousSibling;
        }
        return previous;
    }
}

/**
 * QQ好友移动模拟封装
 * @param sour
 * @param dest
 */
function moveall(sour,dest) {//??????????????
    var options=sour.children;
    for(var i=0;i<options.length;i++) {
        var option=options[i];
        dest.appendChild(option);
        i--;
    }
}
function moveselected(sour,dest) {//??????????????
    var options=sour.children;
    for(var i=0;i<options.length;i++) {
        var option=options[i];
        if(option.selected) {
            dest.appendChild(option);
            i--;
        }
    }
}
function move(sour,dest,ismoveall) {//????????????????????
    var options=sour.children;
    for(var i=0;i<options.length;i++) {
        var option=options[i];
        if(ismoveall||option.selected) {
            dest.appendChild(option);
            i--;
        }
    }
}
/**
 * getElementsByClassName的兼容封装
 * @param element
 * @param className
 * @returns {*}
 */
function getElementsByClassName(element,className) {
    if(element.getElementsByClassName(className)){
        return element.getElementsByClassName(className);
    }else {
        var elements=element.getElementsByTagName("*");
        var filterArr =[];
        for(var i=0;i<elements.length;i++) {
            if(elements[i].className.indexOf(className)!==-1){
                filterArr.push(elements[i]);
            }
        }
        return filterArr;
    }
}

/**
 * 找到字符串中元素所对应的位置
 * @type {string}
 */
//var str = "abcoefoxyozzopp";
var num = -1;
function findStr(str, x) {
    num = str.indexOf(x, num + 1);
    if (num !== -1) {
        console.log(num);
        findStr(str, x);
    }
    return findStr;
}
//findStr(str, "o");

/**
 * 匀速动画
 * @param obj
 * @param target
 * @param step
 */
function evenanimate(obj, target,step) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var stepnum = leader < target ? step : -step;
        if (Math.abs(target - leader) >= Math.abs(stepnum)) {
            leader = leader + stepnum;
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 15);
}

/**
 * .top就可以获取被卷去的头部的高度
 // .left就可以获取被卷去的左侧的宽度
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 * 封装缓动动画
 * @param obj
 * @param target
 */
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style.left = leader + "px";
        if (leader === target) {
            clearInterval(obj.timer);
        }
    }, 15);
}


/**
 * 获取 任意对象 的 任意属性的 兼容封装
 * @param obj
 * @param attr
 * @returns {*}
 */
function getstyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

/**
 * 封装缓动动画框架
 * @param obj
 * @param json
 * @param fn
 */
function getanimate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {
                var leader = getstyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;
            } else if(k==="zIndex"){
                obj.style.zIndex = json[k];
            }else {
                var leader = parseInt(getstyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (typeof fn == "function") {
                fn();
            }
        }
    }, 60);
}


function getstyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

/**
 * 获取页面可视宽高
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client(){
    return{
        width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0,
        height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0
    }
}

function animate1(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = leader < target ? step : -step;
        if (Math.abs(target - leader) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 15);
}
function animatetop(obj, target,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetTop;
        var step = 30;
        step = leader < target ? step : -step;
        if (Math.abs(target - leader) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.top = leader + "px";
        } else {
            obj.style.top = target + "px";
            clearInterval(obj.timer);
        };
        if(fn){
            fn();
        }
    }, 15);
}
