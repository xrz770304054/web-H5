var Main = {	iscrolls : []};
wxurl = "http://ekang.ren/ask/index/index?url="
$(function(){
	$('.emptypage').on('touchmove', function (event) {
		event.preventDefault();
	});

	page_url = encodeURI(location.href)
	//获取配置信息
	Main.get(url+'user/signaturePack',{url:page_url},function(res){
		if(res.ret==0){
			//执行成功
            appid_val = res.data.appId;
			timestamp_val = res.data.timestamp;
			nonceStr_val = res.data.nonceStr;
			signature_val = res.data.signature;
//	微信接口配置
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: appid_val, // 必填，公众号的唯一标识
				timestamp: timestamp_val, // 必填，生成签名的时间戳
				nonceStr: nonceStr_val, // 必填，生成签名的随机串
				signature: signature_val,// 必填，签名，见附录1
				jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","startRecord","onMenuShareAppMessage","stopRecord","playVoice","uploadVoice","stopVoice",] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function(){
				//commonobject.onMenuShareAppMessage('易答','我的易答，不，是你的易答！','http://ekang.ren/ask/index/index?url=http://www.ekangjiuyi.net/fenda/index.html','http://www.ekangjiuyi.net/fenda/images/img_4.png');
				//commonobject.onMenuShareTimeline('首页','http://ekang.ren/ask/index/index?url=http://www.ekangjiuyi.net/fenda/index.html','http://www.ekangjiuyi.net/fenda/images/img_4.png');
			});
			wx.error(function(res){
				//alert('error')
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

			});
		}else{
			alert(res.msg)
			//执行失败
		}
	});
//	获取底部导航高度
	var botnav_h = $('.botnav').outerHeight();
	$('.station').height(botnav_h+10+'px');
	$('.questionanswering .determine,.probleminfor .recommend').css('margin-bottom',botnav_h+40+'px');
	$('.find_character .charactertype,.find_problem .recommend .problemappend').css('margin-bottom',botnav_h+20+'px');
//	编辑信息
//	获取顶部导航高度
	header_h = $('.header').outerHeight()+6
////    设置距离顶部距离
//	$('.index,.newJin').css('marginTop',header_h)
//	$('.find_character,.find_problem').css('marginTop',header_h-6)
});
commonobject = {
	//收听
	listen : function(to_uid){
		Main.get(url+'ask/user/followUser',{uid:8,to_uid:to_uid},function(res){
			if(res.ret==0){
				//执行成功
				console.log(res.data);
			}else{
				alert(res.msg);
				//执行失败
			}
		});
    },
	//播放结束回调
	endedcallback : function (obj){
		obj.removeClass('hover');
		obj.find('img').attr('src','images/img2.png');
    },
    //发现人物
	recest : function (zdurl,obj,page_index,page_size){
		Main.get(url+zdurl,{uid:8,page_index:page_index,page_size:page_size},function(res){
			if(res.ret==0){
				//执行成功
				console.log(res.data)
				var data = res.data
				$.each(data,function(i,t){
					var is_follow = t.is_follow;
					//obj.eq(i).find('.listenin').remove()
					if(t.is_myself==0){
						if(is_follow==true){
							obj.append('<div class="type1con"><div class="headpic" style="background: url('+ t.headimgurl+') center; background-size: cover;" data-to_uid="'+ t.id+'"></div><div class="useinfor"><p class="name">'+ t.nickname+'</p><p class="intro">'+ t.title+'</p><div class="listenanswer"><span class="answernum">'+ t.answer_count+'回答</span><span class="listennum" style=" margin-left:7px;">'+ t.listen_count+'收听</span></div></div><div class="listenin" data-is_myself="'+ t.is_myself+'" data-is_follow="'+ t.is_follow+'" data-id="'+ t.id+'"><img src="images/icon6.png" style="display: none;"><p style="width:100%; text-align:center;padding: 11% 0 9% 0;">已收听</p></div></div>');
						}else{
							obj.append('<div class="type1con"><div class="headpic" style="background: url('+ t.headimgurl+') center; background-size: cover;" data-to_uid="'+ t.id+'"></div><div class="useinfor"><p class="name">'+ t.nickname+'</p><p class="intro">'+ t.title+'</p><div class="listenanswer"><span class="answernum">'+ t.answer_count+'回答</span><span class="listennum" style=" margin-left:7px;">'+ t.listen_count+'收听</span></div></div><div class="listenin" data-is_myself="'+ t.is_myself+'" data-is_follow="'+ t.is_follow+'" data-id="'+ t.id+'"><img src="images/icon6.png"><p>收听</p></div></div>');
						}
					}else{
						obj.append('<div class="type1con"><div class="headpic" style="background: url('+ t.headimgurl+') center; background-size: cover;" data-to_uid="'+ t.id+'"></div><div class="useinfor"><p class="name">'+ t.nickname+'</p><p class="intro">'+ t.title+'</p><div class="listenanswer"><span class="answernum">'+ t.answer_count+'回答</span><span class="listennum" style=" margin-left:7px;">'+ t.listen_count+'收听</span></div></div></div>');
					}

				});
				//        设置顶部宽
				var characterwin_w = $('.find_character .characterlist .characterwin').width();
				var characterwin_l = $('.find_character .characterlist .characterwin').length;
				$('.find_character .characterlist').width(characterwin_w*characterwin_l+10+'px');
			}else{
				alert(res.msg)
				//执行失败
			}
		});

    },
	//搜索出答主列表
	search : function (type,search_content,page_index,page_size){
		Main.get(url+'search/wechat',{type:type,search_content:search_content,page_index:page_index,page_size:page_size},function(res){
			if(res.ret==0){
				//执行成功
				console.log(res.data);
				if(type==1){
                    data1 = res.data
					if(data1.length<page_size&&page_size==12){
						$('.infinite-scroll-preloader').html('<p style="  text-align: center;font-size: 3.5vw; margin-bottom: 5px;  color: #666;">暂无加载数据</p>');
						$('.infinite-scroll-preloader').show();
					}
					if(data1==''&&page_size==12){
						$('.searchpage .searchspace').show();
						$('.infinite-scroll-preloader').hide()
					}
					$.each(res.data,function(i,t){
						$('.searchpage .problemlist .problemappend').append('<div class="serch_problemcon" data-question_id="'+ t.question_id+'"><p class="subject">'+ t.question_content+'</p><p class="userinfor">答主：'+ t.nickname+'&nbsp;&nbsp;|&nbsp;&nbsp;'+ t.title+'</p></div>');
					});
					if(res.data.length<page_size){
						$('.searchpage .problemlist>.seemore').hide();
					}else{
						$('.searchpage .problemlist>.seemore').show();
					}
					if(res.data!=''){
						$('.searchpage .problemlist').show();
					}else{
						$('.searchpage .problemlist').hide();
					}

				}else if(type==2){
					data2 = res.data
					if(data2.length<page_size&&page_size==12){
						$('.infinite-scroll-preloader').html('<p style="  text-align: center;font-size: 3.5vw; margin-bottom: 5px;  color: #666;">暂无加载数据</p>');
						$('.infinite-scroll-preloader').show();
					}
					if(data2==''&&page_size==12){
						$('.searchpage .searchspace').show();
						$('.infinite-scroll-preloader').hide()
					}
					$.each(res.data,function(i,t){
						$('.searchpage .answermast .answermastappend').append('<div data-id="'+ t.id+'" class="search_use_con"><div class="headpic" style=" background: url('+ t.headimgurl+') center; background-size: cover;"></div><div class="useinfor"><div class="top"><p class="name">'+ t.nickname+'</p><p class="position">'+ t.title+'</p></div><div class="bot"><p class="answernum">'+ t.answer_count+'个回答</p><p' +
								' class="listennum">'+ t.listen_count+'个收听</p></div></div></div>');

					});
					if(res.data.length<page_size){
						$('.searchpage .answermast>.seemore').hide();
					}else{
						$('.searchpage .answermast>.seemore').show();
					}
					if(res.data!=''){
						$('.searchpage .answermast').show();
					}else{
						$('.searchpage .answermast').hide();
					}
				}
				if(data1==''&&data2==''){
					$('.searchpage .searchspace').show();
				}else{
					$('.searchpage .searchspace').hide();
				}
			}else{
				alert(res.msg);
				//执行失败
			}
		});
	},
//	是否登录
	login : function (){
		Main.get(url+'index.php/ask/user/index',{},function(res){
			if(res.ret==0){
				//执行成功
				console.log(res.data);
			}else{
				//alert(res.msg);
				console.log(res);
				if(res.errcode=='9001'){
					var getinfor = location.href
					location.href = 'http://ekang.ren/ask/index/index?url='+getinfor
				}
				//执行失败
			}
		});
	},
	getchargeuserpage : function (to_uid){
		Main.get(url+'ask/question/getCode',{product_type:1,to_uid:to_uid},function(res){
			if(res.ret==0){
				//执行成功
				console.log(res.data);
				var url = res.data.location_url;
				location.href = url
			}else{
				alert(res.msg)
				//执行失败
			}
		});
	},
	onMenuShareTimeline : function (title,link,imgUrl){
		wx.onMenuShareTimeline({
			title: title, // 分享标题
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});
	},
	onMenuShareAppMessage : function (title,desc,link,imgUrl){
		wx.onMenuShareAppMessage({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});
	}
}
//跳转链接
function link(url){
	location.href = url
}
var url = 'http://ekang.ren/'
//验证正则
obj={
	"phone":/^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
	"email":/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
	"name":/^[\u4e00-\u9fa5]+$/,
	"num":/^[1-9]+[0-9]*]*$/,
	"Idnumber":/^\d{17}[\w\d]$/,
};
//获取URL参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2])); return null;
}
//alert弹层
function layer(content){
	$('body').append('<div class="elasticlayer animatescale" style=" z-index: 9999999999999; position: fixed; top:0; width: 100%; height:100%; background:rgba(0,0,0,.7) "><div class="elasticlayercon" style=" background: rgba(255,255,255,1); border-radius: 5px; width: 60%;position: absolute; left: 50%; top: 50%; -webkit-transform:translate(-50%, -50%);"><div class="tit" style=" width: 100%; color:#35424b; text-align: center; padding: 5% 0; font-size: 4vw">易康分答温馨提醒</div><p style=" width: 90%; margin: auto; text-align: center; font-size: 3.5vw; padding: 5% 0 10% 0; ">'+content+'</p><button style=" display: block; background: none; border: none; padding: 5% 0; font-size:4vw; color: #00b8ff; width: 100%; border-top: 1px solid #ddd; letter-spacing: 1px;">确定</button></div></div>')
	$('.elasticlayer .elasticlayercon button').live('click',function(){
		$('.elasticlayer').remove()
		$('.publicmask').remove()
	});
}
//get
Main.get = function(url, data, success) {
	$.ajax({
		type : 'get',
		url : url,
		dataType : 'jsonp',
		data : data,
		success : function(res) {
			if(res.ret==99){
				//location.href=response.url
				return ;
			}
			success(res);
		}
	});
}
//post
Main.post = function(url, obj, call) {
	if (!/^http/.test(url)) {
		url = url;
	}
	$.post(url, obj, function(response) {
		//console.log(response);
		if (call) {
			call(response)
		}
	}, 'json')
}
//加载
function Load(msg){
	$('body').append('<div style="width:100%;height:100%;background:#000; opacity:0.7;z-index:99999999999999;position: fixed;top:0;"><div class="progress" style=" width:90px;  height:67px; background:#000; position: absolute; left: 50%;top: 50%; -webkit-transform: translate(-50%, -50%); border-radius:5px;"><img src="images/loader.gif" style="width:30%; margin-left:35%; margin-top:5%;"><p style=" text-align:center; margin-top:10px; color:#FFF;">'+msg+'</p></div></div>');
};
//验证
function prompt(msg){
	$('body').append('<div class="prompt" style=" width:100%;position:fixed; top:0; height:100%; background:rgba(0,0,0,0);"><div style=" padding: 10px 8px; background:#000; opacity:0.7; position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); z-index:9999999; border-radius:5px;"><p style=" text-align:center;  color:#FFF;">'+msg+'</p></div></div>');
	setTimeout("$('.prompt').fadeOut(2000)",1000);
	setTimeout("$('.prompt').remove()",1000);
};

function dropDown(obj,obj2,val){
	obj.on('click', function () {

		if ($$('.picker-modal.modal-in').length > 0) {
			myApp.closeModal('.picker-modal.modal-in');
		}
		myApp.pickerModal(
				'<div class="picker-modal" id="content-picker">' +
				'<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left"></div>' +
				'<div class="right"><a href="#" class="close-picker">关闭</a></div>' +
				'</div>' +
				'</div>' +
				'<div class="picker-modal-inner">' +
				'<div class="content-block">' +
					// 数据
				'<div class="time-content" style="margin-top: -20px">'+
				'</div>'+

				'</div>' +
				'</div>' +
				'</div>'
		)
		//var today = new Date();
		var pickerInline = myApp.picker({
			input: obj2,
			container: '.time-content',
			toolbar: false,
			rotateEffect: true,
			//value: [today.getDate()],
			onChange: function (picker, values, displayValues) {
				var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
				if (values[1] > daysInMonth) {
					picker.cols[1].setValue(daysInMonth);
				}
			},
			cols: [val]
		});
		pickerInline;
	});
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2])); return null;
}
////webViewJavaScript初始化
//function connectWebViewJavascriptBridge(callback) {
//	if (window.WebViewJavascriptBridge) {
//		callback(WebViewJavascriptBridge);
//	} else {
//		document.addEventListener('WebViewJavascriptBridgeReady', function() {callback(WebViewJavascriptBridge);}, false);
//	}
//}
//webViewJavaScript初始化
function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {callback(WebViewJavascriptBridge);}, false);
	}
}
//空白页面
function pagenull(desc,url,buttonword){
	$('body').append('<div class="emptypage"><div class="con"><img src="images/icon27.png"><p>'+desc+'</p><button class=" ui-btn ui-shadow ui-corner-all">'+buttonword+'</button></div></div>')
	$('.emptypage .con button').live('click',function(){
		location.href=url
	});
	$('body').on('touchmove', function (event) {
		event.preventDefault();
	});
}