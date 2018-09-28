jQuery(document).ready(function ($) {

    "use strict";

    var initTop = 0, staticHeight = 65,headerHeight = 305;

    /* loading */
    var loader = function () {
        $(window).on("load", function () {
            $(".status").fadeOut();
            $(".loader").delay(400).fadeOut("slow");
            var hash = window.location.hash;
            console.log(hash)
            updateAnchor(hash),scrollToHead(hash);
        });
    };

    /* 滚动条 */
    var scroll = function () {
        $(window).scroll(function () {
            var currentTop = $(this).scrollTop();

            /* 阅读进度 */
            progress(currentTop);
            /* 目录定位 */
            findHeadPosition(currentTop);

            /* 头部菜单样式 */
            var opcaity = (currentTop / 250 > 1) ? 1 : currentTop / 250 <= 0 ? .2 : currentTop / 250;
            var shadow = (currentTop / 250 > 1) ? .7 : 0;
            $('.header').css({
                'background': 'rgba(255,255,255,' + opcaity + ')',
                'box-shadow': '0 5px 6px -5px rgba(133,133,133,' + shadow + ')'
            });

            /* 滚动条高度判断 是否显示文章目录和go-up */
            if (currentTop > staticHeight) {
                if ($('#go-up').css('opacity') === '0') {
                    $('#go-up').velocity('stop').velocity({translateX: -30, rotateZ: 360, opacity: 1}, {
                        easing: 'easeOutQuart',
                        duration: 200
                    });
                }

            } else {
                $('#go-up').velocity('stop').velocity({translateX: 0, rotateZ: 180, opacity: 0}, {
                    easing: 'easeOutQuart',
                    duration: 200
                });
            }
            if (currentTop > (headerHeight-staticHeight)) {
                if ($('.post-page-title').css('opacity') === '0') {
                    $('.post-page-title').velocity('stop').velocity({left: '0px', opacity: 1}, {
                        easing: 'easeOutQuart',
                        duration: 300
                    });
                }
            }else{
                $('.post-page-title').velocity('stop').velocity({left: '-300px', opacity: 0}, {
                    easing: 'easeOutQuart',
                    duration: 300
                });
            }
        });
    }

    var scrollToHead = function (anchor) {
        $(anchor).velocity('stop').velocity('scroll', {
            duration: 500,
            easing: 'easeInOutQuart'
        })
    }

    /* 修改锚点 */
    var updateAnchor = function  (anchor) {
        if (window.history.replaceState && anchor !== window.location.hash) {
            window.history.replaceState(undefined, undefined, anchor)
        }
    }

    /* toc 定位 */
    var findHeadPosition = function  (top) {
        if ($('.toc-link').length === 0) {
            return false
        }
        var list = $('.article-content').find('h1,h2,h3,h4,h5,h6')
        var currentId = ''
        list.each(function () {
            var head = $(this)
            if (top > head.offset().top - 15) {
                currentId = '#' + $(this).attr('id')
            }
        })
        var currentActive = $('.toc-link.active')
        if (currentId && currentActive.attr('href') !== currentId) {
            updateAnchor(currentId)
            $('.toc-link').removeClass('active')
            var _this = $('.toc-link[href="' + currentId + '"]').addClass('active');
        }
    }

    $('#go-up').on('click', function () {
        $('html,body').velocity('stop').velocity('scroll', {
            duration: 500,
            easing: 'easeOutQuart'
        })
    })

    $('.toc-link').on('click', function (e) {
        e.preventDefault()
        scrollToHead($(this).attr('href'))
    })

    /* 判断滚动条下拉还是上拉 */
    var scrollDirection = function (currentTop) {
        var result = currentTop > initTop // true is down & false is up
        initTop = currentTop
        return result
    }

    /* 文章阅读进度 */
    var progress = function (currentTop) {
        var docHeight = $('.article-detail').height()
            , winHeight = $(window).height()
            , contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : ($(document).height() - winHeight)
            , scrollPercent = (currentTop > headerHeight) ? (currentTop - headerHeight) / (contentMath) : 0
            , scrollPercentRounded = Math.round(scrollPercent * 100)
            , percentage = (scrollPercentRounded > 100) ? 100 : scrollPercentRounded;

        $('.read-point').text(percentage);
        $('.progress-title .progress').velocity('stop').velocity({width: percentage + '%'}, {
            duration: 100,
            easing: 'easeInOutQuart'
        });
    };

    /* Initialize */
    (function init() {
        loader();
        scroll();
        // hashchange();
        // progress();
    })();
});
