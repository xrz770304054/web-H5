/**
 * Created by Administrator on 2016/11/12.
 */
var tag=true;
var flad1=true;
var flad2=true;
var flad3=true;
    window.onload= function () {
        var hmgreenvip=document.getElementById("hmgreenvip");
        var icon = document.getElementById("icon");
        var dotcon = document.getElementById("dotcon");
        var dotspeed = 0;
        var spans1 = icon.children;
        var hmmusic=document.getElementById("hmmusic");
        var micon = document.getElementById("micon");
        var cd = document.getElementById("cd");
        var spans2 = micon.children;
        var identity=document.getElementById("identity");
        var right = [624, 210, 286, 524];
        var iicon = document.getElementById("iicon");
        var spans3 = iicon.children;
        var slider =document.getElementById("slider");
        var ul=slider.children[0].children[0];
        var dot=slider.children[0].children[1];
        var ulLis=ul.children;
        var dots=dot.children;
        var sliderbgc=["#03312F","#1D0634","#0A0605","#B3CADA","#FCCB64","#03312F"];
        var  imgWidth = ulLis[0].offsetWidth;
        var firstImg = ulLis[0].cloneNode(true);
        var concert =document.getElementById("concert");
        var cons=concert.children;
        var concertp=concert.parentNode.parentNode;
        var dotcon=document.getElementById("dotcon");
        //console.log(concertp.offsetTop);
        var arrc=[]; var arrg=[];
        var gamep=document.getElementById("gamep");
        var games=gamep.children;
        var game=gamep.parentNode.parentNode;
        var flag1=true;
        var flag2=true;
        var timer=null;
        ul.appendChild(firstImg);
        getspan1();
        getspan2();
        getspan3();
        cd.style.right = "212px";
        cd.style.top = "-84px";
        function getspan1(){
            for (var i = 0; i < spans1.length; i++) {
                spans1[i].style.position = "absolute";
                spans1[i].style.top = "356px";
                spans1[i].style.left = "576px";
                spans1[i].style.opacity=0;
            }
        }
        function getspan2(){
            for(var i=0;i<spans2.length;i++){
                spans2[i].style.position = "absolute";
                spans2[i].style.right = "176px";
                spans2[i].style.top = "168px";
                spans2[i].style.opacity=0;
            }

        }
        function getspan3(){
            for(var i=0;i<spans3.length;i++) {
                spans3[i].style.position = "absolute";
                spans3[i].style.bottom = "0";
                spans3[i].style.right = right[i] + "px";
                spans3[i].style.opacity = 0;
            }
        }
        var config1 = [
            {
                "left": 80,
                "top": 395,
            },//0
            {
                "left": 446,
                "top": 620,
            },//1
            {
                "left": 723,
                "top": 660,
            },//2
            {
                "left": 893,
                "top": 571,
            },//3
            {
                "left": 960,
                "top": 420,
            },//4
            {
                "left": 768,
                "top": 460,
            },//5
            {
                "left": 830,
                "top": 306,
            },//6
            {
                "left": 978,
                "top": 222,
            },//7
            {
                "left": 50,
                "top": 627,
            },//8
        ];
        var config2 = [
            {
                "right": 514,
                "top": 52,
            },//0
            {
                "right": 610,
                "top": 188,
            },//1
            {
                "right": 614,
                "top": 355,
            },//2
            {
                "right": 522,
                "top": 494,
            },//3
        ];
        var config3 = [
            {
                //"right": 624,
                "bottom": 536,
            },//0
            {
                //"right": 210,
                "bottom": 410,
            },//1
            {
                //"right": 286,
                "bottom": 168,
            },//2
            {
                //"right": 524,
                "bottom": 198,
            },//3
        ];
        //轮播图
        for(var i=0;i<dots.length;i++){
            dots[i].index=i;
            dots[i].onmouseover= function () {
                for(var j=0;j<dots.length;j++){
                    dots[j].className="";
                };
                this.className="hscurrent";
                var target = -this.index * imgWidth;
                animate1(ul, target);
                slider.style.backgroundColor=sliderbgc[this.index];
            }
        }
        window.onscroll= function () {
            clearInterval(timer);
            timer=setInterval(function () {
                dotspeed+=10;
                if(dotspeed===1000){
                    dotspeed=0;
                }
                dotcon.style.backgroundPositionY=dotspeed+"px";
            },1000)
            if (tag) {
                //绿钻 B
                if(scroll().top>hmgreenvip.offsetTop && flad1){
                    flag=false;
                    for (var i = 0; i < spans1.length; i++) {
                        spans1[i].style.opacity=1;
                        getanimate(spans1[i], config1[i], function () {
                            flad1=false;
                            tag=true;
                        });
                    }
                }
                //绿钻 E
                //音乐特权 B
                if(scroll().top>hmmusic.offsetTop && flad2) {
                    for (var i = 0; i < spans2.length; i++) {
                        flag=false;
                        spans2[i].style.opacity=1;
                        getanimate(spans2[i], config2[i], function () {
                            flad2=false;
                            tag = true;
                        });
                    }
                    getanimate(cd, {"top": 90});
                }
                //音乐特权 E
                //身份特权 B
                if(scroll().top>identity.offsetTop && flad3) {
                    flag=false;
                    for (var i = 0; i < spans3.length; i++) {
                        spans3[i].style.opacity=1;
                        getanimate(spans3[i], config3[i],function(){
                            flad3=false;
                            tag=true;
                        });
                    }
                }
                //身份特权 E
            }
            if(scroll().top>concertp.offsetTop && flag1 ){
                for(var k=0;k<cons.length;k++){
                    arrc[k]=cons[k].offsetTop-200;
                    //console.log(cons[k]);
                    animatetop(cons[k],arrc[k],function(){flag1=false});
                }
            }
            if(scroll().top>game.offsetTop && flag2 ){
                for(var j=0;j<games.length;j++){
                    arrg[j]=games[j].offsetTop+70;
                    animatetop(games[j],arrg[j],function(){flag2=false});
                }
            }
            //animatetop(dotcon,600);

        }


    }



