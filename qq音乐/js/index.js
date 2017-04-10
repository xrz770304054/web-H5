window.onload = function () {
    /* ----------全局变量 ----------*/
    var L_bg = document.getElementById("L_bg");
    var L_arr = document.getElementById("L_arr");
    var L_arr_l = document.getElementById("L_arr_l");
    var L_arr_r = document.getElementById("L_arr_r");
    var navUl = document.getElementById("navUl")
    var links = navUl.getElementsByTagName("a");
    var slider = document.getElementById("slider");
    var uls = document.getElementsByClassName("allUl");
    var L_all = slider.getElementsByClassName("L_all");
    var L_width = L_bg.children[0].offsetWidth;
    var bgb1Ul = document.getElementById("bgb1Ul");
    var bgb1Links = bgb1Ul.getElementsByTagName("a");
    var dot = document.getElementById("dot");
    var dotLis = dot.children[0].children;
    var dotDivs = document.getElementsByClassName("dotDiv");
    var foot = document.getElementById('foot');
    var dotTimer = null;
    var pic = 0;
    var flag = true;
    var index = 0;
    var f = true;
    // 轮播小盒子背景
    var L_span1 = slider.getElementsByClassName("L_span1");
    for (var k = 0; k < L_span1.length; k++) {
        L_span1[k].style.background = "url(images/L_all_" + (k + 1) + ".png) center center no-repeat"
    }
    var L_span2 = slider.getElementsByClassName("L_span2");
    for (var k = 0; k < L_span2.length; k++) {
        L_span2[k].style.background = "url(images/L_hy_" + (k + 1) + ".png) center center no-repeat"
    }
    var L_span3 = slider.getElementsByClassName("L_span3");
    for (var k = 0; k < L_span3.length; k++) {
        L_span3[k].style.background = "url(images/L_om_" + (k + 1) + ".png) center center no-repeat"
    }
    var L_span4 = slider.getElementsByClassName("L_span4");
    for (var k = 0; k < L_span4.length; k++) {
        L_span4[k].style.background = "url(images/L_hg_" + (k + 1) + ".png) center center no-repeat"
    }
    var L_span5 = slider.getElementsByClassName("L_span5");
    for (var k = 0; k < L_span5.length; k++) {
        L_span5[k].style.background = "url(images/L_rb_" + (k + 1) + ".png) center center no-repeat"
    }

    //轮播鼠标移入显示
    L_bg.onmouseover = function () {
        L_arr.className = L_arr.className.replace("hide", "show");
    }
    L_bg.onmouseout = function () {
        L_arr.className = L_arr.className.replace("show", "hide");
    }

    //切换轮播特效
    $(".L_all").hide();
    $(".L_all").eq(0).show();
    $("#navUl li").click(function () {
        if (flag && index != $(this).index()) {
            flag = false;
            pic = 0;
            $(".L_all").fadeOut('fast');
            ;
            index = $(this).index();
            $(".L_all").eq(index).fadeIn('slow', function () {
                flag = true;
            });
        }
    })

    // 左右轮播滚动
    L_arr_r.onclick = function () {
        if (flag) {
            flag = false;
            if (pic === uls[index].offsetWidth / L_width - 1) {
                uls[index].style.left = 0;
                pic = 0;
            }
            pic++;
            var target = -pic * L_width;
            animate(uls[index], target, function () {
                flag = true;
            });

        }
    }
    L_arr_l.onclick = function () {
        if (flag) {
            flag = false;
            if (pic === 0) {
                uls[index].style.left = -(uls[index].offsetWidth / L_width - 1) * L_width + "px";
                pic = uls[index].offsetWidth / L_width - 1;
            }
            pic--;
            var target = -pic * L_width;
            animate(uls[index], target, function () {
                flag = true;
            });
        }
    }


    for (var i = 0; i < bgb1Links.length; i++) {
        bgb1Links[i].style.background = "url(images/bgb1_" + (i + 1) + ".png) center center no-repeat"
    }
    window.onscroll = function () {
        var scrollHeight = window.pageYOffset;
        if (scrollHeight >= dotDivs[0].offsetTop && scrollHeight <= foot.offsetTop - window.innerHeight) {
            dot.className = dot.className.replace("hide", "show")
        } else {
            dot.className = dot.className.replace("show", "hide")
        }
        if (f) {
            for (var i = 0; i < dotDivs.length; i++) {
                if (scrollHeight > dotDivs[i].offsetTop - 10) {
                    for (var j = 0; j < dotLis.length; j++) {
                        dotLis[j].style.background = "gray";
                    }
                    dotLis[i].style.background = "#fff";
                }
            }
        }
        if(scrollHeight>dotDivs[0].offsetTop){
            $(".bgb1 h1").animate({"top":0},800, function () {
                $(".bgb1 h2").animate({"top":0},800, function () {
                    $(".download>a").animate({"top":0},800, function () {
                        $(".bgb1_pic>ul").animate({"top":0},800);
                    })
                })
            })
        }
        if(scrollHeight>dotDivs[1].offsetTop-10){
            $(".bgb2_h2>h2").animate({"top":0},1000, function () {
                $(".bgb2_c").animate({"top":0},1000,function(){
                    $(".pic_p1").fadeIn("slow");
                    $(".pic_p2").fadeIn("slow");
                })
                $(".pic_p1").addClass("animated rollIn");
                $(".pic_p2").addClass("animated rollIn");
            })
        }
        if(scrollHeight>dotDivs[2].offsetTop-10){
            $(".bgb3_h2").fadeIn("slow");
            $(".bgb3_c").fadeIn("slow");
            $(".bgb3_c > p").fadeIn("slow");
            $(".bgb3_b").fadeIn("slow");
            $(".bgb3_h2").addClass("animated flipInX");
            $(".bgb3_c").addClass("animated flipInX");
            $(".bgb3_c > p").addClass("animated flipInX");
            $(".bgb3_b").addClass("animated 3s flipInY");
        }
        if (scrollHeight >= dotDivs[3].offsetTop) {
            $(".bgb4 > h2").fadeIn("slow");
            $(".bgb4_c").fadeIn("slow");
            $(".bgb4_b").fadeIn("slow");
            $(".bgb4 > h2").addClass("animated slideInRight");
            $(".bgb4_c").addClass("animated slideInRight");
           $(".bgb4_b_img1").addClass("animated flipInX");
           $(".bgb4_b_img2").addClass("animated flipInX");
        }
        if (scrollHeight >= dotDivs[4].offsetTop) {
            $(".bgb5 > h2").fadeIn("slow");
            $(".bgb5_c").fadeIn("slow");
            $(".bgb5_b").fadeIn("slow");
            $(".bgb5 > h2").addClass("animated fadeInLeft");
            $(".bgb5_c").addClass("animated slideInRight");
            $(".bgb5_b").addClass("animated flipInY");
        }

    }

    for (var j = 0; j < dotLis.length; j++) {
        dotLis[j].index = j;
        dotLis[j].onclick = function () {
            f = false;
            clearInterval(dotTimer);
            var target = dotDivs[this.index].offsetTop;
            dotTimer = setInterval(function () {
                var leader = window.pageYOffset;
                var step = (target - leader) / 20;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                window.scrollTo(0, leader);
                if (leader === target) {
                    clearInterval(dotTimer);
                    f = true;
                }
            }, 15)
            for (var j = 0; j < dotLis.length; j++) {
                dotLis[j].style.background = "gray";
            }
            this.style.background = "#fff";
        }
    }

}