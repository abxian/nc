(function(w) {
    function initBgVideo() {
        let random = window.getRandom(['1', "2", "3", "4", "5"]);
        var video = document.getElementById('video_source');
        let src = "assets/images/video/" + random + ".mp4";
        video.src = src;
        document.getElementById('video_bg').load();
    }

    function initBg() {
        var video = document.getElementById('video_bg');
        var gif = document.getElementById('gif_bg');
        if (window.isIOS()) {
            video.style.display = "none";
            gif.style.display = "block";
        } else {
            initBgVideo();
            gif.style.display = "none";
            video.style.display = "block";
            video.playbackRate = 1;
        }
    }

    function init() {
        initBg();
    }
    window.addEventListener("DOMContentLoaded", init, !1);
})(window);
/*(function(w) {
    function initBgVideo() {
        var video = document.getElementById('video_source');
        video.src = "assets/images/video/4.mp4";
        document.getElementById('video_bg').load();
    }

    function initBg() {
        var video = document.getElementById('video_bg');
        var gif = document.getElementById('gif_bg');
        if (window.isIOS()) {
            video.style.display = "none";
            gif.style.display = "block";
        } else {
            initBgVideo();
            gif.style.display = "none";
            video.style.display = "block";
            video.playbackRate = 1;
        }
    }

    function init() {
        initBg();
    }
    window.addEventListener("DOMContentLoaded", init, !1);
})(window);
*/