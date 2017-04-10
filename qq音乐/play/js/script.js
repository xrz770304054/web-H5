(function ($) {
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = true,
        playlist = [
            {
                title: '十年',
                artist: '陈奕迅',
                album: '陈奕迅 - 十年.mp3',
                cover: 'mp3/1.jpg',
                mp3: 'mp3/陈奕迅 - 十年.mp3',
                ogg: ''
            },
            {
                title: '浮夸',
                artist: '陈奕迅',
                album: '陈奕迅 - 浮夸.mp3',
                cover: 'mp3/1.jpg',
                mp3: 'mp3/陈奕迅-浮夸.mp3',
                ogg: ''
            },
            {
                title: '红玫瑰',
                artist: '陈奕迅',
                album: '红玫瑰 - 陈奕迅.mp3',
                cover: 'mp3/1.jpg',
                mp3: 'mp3/红玫瑰 - 陈奕迅.mp3',
                ogg: ''
            },
            {
                title: 'K歌之王',
                artist: '陈奕迅',
                album: '陈奕迅 - K歌之王.mp3',
                cover: 'mp3/1.jpg',
                mp3: 'mp3/陈奕迅 - K歌之王.mp3',
                ogg: ''
            },
        ];

    // Load playlist
    for (var i = 0; i < playlist.length; i++) {
        var item = playlist[i];
        $('#playlist').append('<li>' + item.artist + ' - ' + item.title + '</li>');
        $("#playlist").addClass("animated lightSpeedIn");
    }
    //hover animated 动画效果
    $("#playlist li").hover(function () {
        $(this).addClass("animated flipInX");
    });
    var time = new Date(),
        currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
        trigger = false,
        audio, timeout, isPlaying, playCounts;
    var cover = document.getElementById("cover");
    var cover1 = document.getElementById("cover1");
    var ronum = -32;
    var num = 0;
    var timer = null;
    var play_disk = document.getElementById("play_disk");
    var play = function () {
        clearInterval(timer);
        audio.play();
        $('.playback').addClass('playing');
        timeout = setInterval(updateProgress, 500);
        isPlaying = true;
        timer = setInterval(function () {
            ronum++;
            num++;
            if (ronum <= 1) {
                goAnywhere(play_disk, {"top": 12,});
                play_disk.style.transform = "rotate(" + ronum + "deg)";

            } else {
                cover.style.transform = "rotate(" + num + "deg)";
                cover1.style.transform = "rotate(" + num + "deg)";
            }
        }, 20);
    };
    function goAnywhere(obj, json, fn) {
        clearInterval(obj.timer);//避免多次点击按钮时加速运动的情况！
        obj.timer = setInterval(function () {
            var flag = true;
            for (var k in json) {  //遍历所有json的对象
                if (k === "opacity") {  //给函数添加自定义透明的过程
                    var leader = getStyle(obj, k) * 100;//乘以100方便计算
                    var target = json[k] * 100;         //乘以100方便计算
                    var step = (target - leader) / 10;//步数等于目标距离-起始位置除以10
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = (leader + step); //对应前面的乘以100，此地方除以100方便计算
                    obj.style[k] = leader / 100;
                } else if (k === "zIndex") {        //设置盒子的层叠
                    obj.style.zIndex = json[k];
                } else {
                    leader = parseInt(getStyle(obj, k)) || 0;
                    target = json[k];
                    step = (target - leader) / 10;
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
                if (typeof fn === "function") {
                    console.log(fn);
                    fn();
                }
            }
        }, 15);
    }

    /*
     * 功能：获取计算后的样式属性(兼容IE 6,7,8的写法)
     * 使用方法示例: getStyle（obj处是对象，attr是样式属性）
     * 创建时间:2016-11-13
     * */
    var ronum1 = 1;

    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
    var pause = function () {
        audio.pause();
        $('.playback').removeClass('playing');
        clearInterval(updateProgress);
        isPlaying = false;
        goAnywhere(play_disk, {"top": -1});
        setInterval(function () {
            ronum1--;
            if (ronum1 > -32) {
                play_disk.style.transform = "rotate(" + ronum1 + "deg)";
            }
            clearInterval(timer);
        }, 25);

    };

    // Update progress
    var setProgress = function (value) {
        var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60),
            ratio = value / audio.duration * 100;

        $('.timer').html(parseInt(value / 60) + ':' + currentSec);
        $('.progress .pace').css('width', ratio + '%');
        $('.progress .slider a').css('left', ratio + '%');
    }

    var updateProgress = function () {
        setProgress(audio.currentTime);
    }

    // Progress slider
    $('.progress .slider').slider({
        step: 0.1, slide: function (event, ui) {
            $(this).addClass('enable');
            setProgress(audio.duration * ui.value / 100);
            clearInterval(timeout);
        }, stop: function (event, ui) {
            audio.currentTime = audio.duration * ui.value / 100;
            $(this).removeClass('enable');
            timeout = setInterval(updateProgress, 500);
        }
    });

    // Volume slider
    var setVolume = function (value) {
        audio.volume = localStorage.volume = value;
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    }

    var volume = localStorage.volume || 0.5;
    $('.volume .slider').slider({
        max: 1, min: 0, step: 0.01, value: volume, slide: function (event, ui) {
            setVolume(ui.value);
            $(this).addClass('enable');
            $('.mute').removeClass('enable');
        }, stop: function () {
            $(this).removeClass('enable');
        }
    }).children('.pace').css('width', volume * 100 + '%');

    $('.mute').click(function () {
        if ($(this).hasClass('enable')) {
            setVolume($(this).data('volume'));
            $(this).removeClass('enable');
        } else {
            $(this).data('volume', audio.volume).addClass('enable');
            setVolume(0);
        }
    });

    // Switch track
    var switchTrack = function (i) {
        if (i < 0) {
            track = currentTrack = playlist.length - 1;
        } else if (i >= playlist.length) {
            track = currentTrack = 0;
        } else {
            track = i;
        }

        $('audio').remove();
        loadMusic(track);
        if (isPlaying == true) play();
    };

    // Shuffle
    var shufflePlay = function () {
        var time = new Date(),
            lastTrack = currentTrack;
        currentTrack = time.getTime() % playlist.length;
        if (lastTrack == currentTrack) ++currentTrack;
        switchTrack(currentTrack);
    };

    // Fire when track ended
    var ended = function () {
        pause();
        audio.currentTime = 0;
        playCounts++;
        if (continous == true) isPlaying = true;
        if (repeat == 1) {
            play();
        } else {
            if (shuffle === 'true') {
                shufflePlay();
            } else {
                if (repeat == 2) {
                    switchTrack(++currentTrack);
                } else {
                    if (currentTrack < playlist.length) switchTrack(++currentTrack);
                }
            }
        }
    };

    var beforeLoad = function () {
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) + '%');
    };

    // // Fire when track loaded completely
    // var afterLoad = function () {
    //     if (autoplay == true) play();
    // };

    // Load track
    var loadMusic = function (i) {
        var item = playlist[i],
            newaudio = $('<audio>').html('<source src="' + item.mp3 + '"><source src="' + item.ogg + '">').appendTo('#player');

        $('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
        $('.tag').html('<strong>' + item.title + '</strong><span class="artist">' + item.artist + '</span><span class="album">' + item.album + '</span>');
        $('#playlist li').removeClass('playing').eq(i).addClass('playing');
        audio = newaudio[0];
        audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
        audio.addEventListener('progress', beforeLoad, false);
        audio.addEventListener('durationchange', beforeLoad, false);
        audio.addEventListener('ended', ended, false);
    }

    loadMusic(currentTrack);
    $('.playback').on('click', function () {
        if ($(this).hasClass('playing')) {
            pause();
        } else {
            play();
        }
    });
    $('.rewind').on('click', function () {
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(--currentTrack);
        }
    });
    $('.fastforward').on('click', function () {
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(++currentTrack);
        }
    });
    $('#playlist li').each(function (i) {
        var _i = i;
        $(this).on('click', function () {
            switchTrack(_i);
        });
    });

    if (shuffle === 'true') $('.shuffle').addClass('enable');
    if (repeat == 1) {
        $('.repeat').addClass('once');
    } else if (repeat == 2) {
        $('.repeat').addClass('all');
    }

    $('.repeat').on('click', function () {
        if ($(this).hasClass('once')) {
            repeat = localStorage.repeat = 2;
            $(this).removeClass('once').addClass('all');
        } else if ($(this).hasClass('all')) {
            repeat = localStorage.repeat = 0;
            $(this).removeClass('all');
        } else {
            repeat = localStorage.repeat = 1;
            $(this).addClass('once');
        }
    });

    $('.shuffle').on('click', function () {
        if ($(this).hasClass('enable')) {
            shuffle = localStorage.shuffle = 'false';
            $(this).removeClass('enable');
        } else {
            shuffle = localStorage.shuffle = 'true';
            $(this).addClass('enable');
        }
    });
})(jQuery);