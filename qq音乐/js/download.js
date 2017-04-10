var y_nava = document.getElementById("y_nava");
var y_header = document.getElementById("y_header");
var y_txt = document.getElementById("y_txt");
var y_content = document.getElementById("y_content");
var y_clock = document.getElementById("y_clock");
var txtUl = y_txt.children[0];
var txtLis = txtUl.children;
var lis = y_nava.children;
var x = -339, y = -148;
y_header.style.background = "url(images/y_0bgc.jpg) no-repeat center bottom";
window.onload = function () {
    createClock();
    var q_sprite=document.getElementById("q_sprite");
    for(var i=0;i<36;i++){
        var div=document.createElement("div");
        div.className="part_singer__item";
        q_sprite.appendChild(div);
    }
};
for (var i = 0; i < lis.length; i++) {
    lis[i].index = i;
    lis[i].style.background = "url(images/img_index_ie6.png)  no-repeat " + x + "px " + y + "px";
    x += 113;
    lis[i].onclick = function () {
        for (var j = 0; j < lis.length; j++) {
            lis[j].style.borderTop = "none";
        }
        this.style.borderTop = "2px solid #fff";
        y_header.style.background = "url(images/y_" + this.index + "bgc.jpg) no-repeat center top";
        if (this.index == 0) {
            y_clock.style.opacity = "1";
            y_star.style.opacity = "1";
        } else {
            y_clock.style.opacity = "0";
            y_star.style.opacity = "0";
        }

        if (this.index == 0) {
           location.reload();
        } else {
            y_clock.style.opacity = "0";
        }

        //单击改变y_txt中的li的opacity
        for (var j = 0; j < txtLis.length; j++) {
            txtLis[j].style.opacity = 0;
        }
        txtLis[this.index].style.opacity = 1;
    }
    //动态创建clock
    function createClock() {
        /*var y_clock=document.createElement("div");
         y_clock.className="y_clock";
         y_clock.id="y_clock";
         y_clock.appendChild(y_content);*/
        var div = document.createElement("div");
        div.className = "clock";
        var span1 = document.createElement("span");
        span1.className = "watch__hand";
        var span2 = document.createElement("span");
        span2.className = "watch__numb1";
        var span3 = document.createElement("span");
        span3.className = "watch__numb2";
        y_clock.appendChild(div);
        y_clock.appendChild(span1);
        y_clock.appendChild(span2);
        y_clock.appendChild(span3);
        //console.log(y_clock.children.length);
    }

    function deleClock() {
        console.log(y_clock.children.length);
        y_clock.removeChild();
    }
}

function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

function setEveryAnimate(obj, json, fn) {//json 属性名：属性值
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//opacity透明度 要特殊处理
                //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
                //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 50;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = (leader + step);
                obj.style[k] = leader / 100;//opacity没有单位
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//层级不需要渐变 直接设置即可
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 50;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    },15);
}
