/**
 * Created by Administrator on 2016/11/15.
 */
function animate(obj,target,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        var leader = obj.offsetLeft;
        var step = (target - leader) / 10;
        step = step>0?Math.ceil(step):Math.floor(step);
        leader = leader + step;
        obj.style.left = leader + "px";
        if(flag && leader ===target) {
            clearInterval(obj.timer);
            if (typeof fn === "function") {
                fn();
            }
        }
    }, 15)
}

function animateA(obj,json,fn){
    clearTimeout(obj.timer);
    obj.timer = setInterval(function(){
        var flag = true;
        for(var k in json){
            if(k ==="opacity"){
                var leader = getStyle(obj,k)*100;
                var target = json[k]*100;
                var step = (target-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader +step;
                obj.style[k] = leader/100;
            }else if(k ==="zIndex"){
                obj.style.zIndex = json[k];
            }else{
                var leader = parseInt(getStyle(obj,k))||0;
                var target = json[k];
                var step = (target-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader +step;
                obj.style[k] = leader +"px";
            }
            if(leader != target){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(typeof fn ==="function"){
                fn();
            }
        }
    },15)
}

function getStyle(obj,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(obj,null)[attr];
    }else{
        return obj.currentStyle[attr];
    }
}