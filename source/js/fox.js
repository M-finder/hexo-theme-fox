jQuery(document).ready(function($){

    "use strict";

    var loader = function() {
        $(window).on("load", function() {
            $(".status").fadeOut();
            $(".loader").delay(400).fadeOut("slow");
        });
    };

    var scroll = function () {
        $(window).on('scroll',function(){
            var height = document.documentElement.scrollTop || document.body.scrollTop;
            var opcaity=(height/300>1)?1:height/300;
            $('.header').css('background','rgba(255,255,255,'+opcaity+')');
            progress();
        });
    };

    /* 文章toc 点击错位解决 */
    var hashchange = function (){
        $(window).on('hashchange',function(){
            var target = $(decodeURI(location.hash)),top = target.offset().top-65;
            $('html,body').animate({scrollTop:top}, 500);
            $('.toc-link[href="'+decodeURI(location.hash)+'"]').addClass('active')
            $('.toc-link[href!="'+decodeURI(location.hash)+'"]').removeClass('active');
        });
    };

    var progress = function (){
        var docHeight = $('.article-detail').height(),
            winHeight = $(window).height(),
            contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : ($(document).height() - winHeight),
            scrollPercent = ($(document).scrollTop()) / (contentMath),
            scrollPercentRounded = Math.round(scrollPercent * 100),
            percentage = (scrollPercentRounded > 100) ? 100 : scrollPercentRounded;

        $('.read-point').text(percentage)
        $('.progress-title').css('width');
    };
    // /* Nav */
    // var Annie_Nav = function() {
    //     // browser window scroll (in pixels) after which the "menu" link is shown
    //     var offset = 300;
    //
    //     var navigationContainer = $('#cd-nav');
    //     var	mainNavigation = navigationContainer.find('#cd-main-nav ul');
    //
    //     //hide or show the "menu" link
    //     checkMenu();
    //     $(window).scroll(function(){
    //         checkMenu();
    //     });
    //
    //     //open or close the menu clicking on the bottom "menu" link
    //     $('.cd-nav-trigger').on('click', function(){
    //         $(this).toggleClass('menu-is-open');
    //         //we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
    //         mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');
    //     });
    //
    //     function checkMenu() {
    //         if( $(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
    //             navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
    //                 mainNavigation.addClass('has-transitions');
    //             });
    //         } else if ($(window).scrollTop() <= offset) {
    //             //check if the menu is open when scrolling up
    //             if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
    //                 //close the menu with animation
    //                 mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
    //                     //wait for the menu to be closed and do the rest
    //                     mainNavigation.removeClass('is-visible is-hidden has-transitions');
    //                     navigationContainer.removeClass('is-fixed');
    //                     $('.cd-nav-trigger').removeClass('menu-is-open');
    //                 });
    //                 //check if the menu is open when scrolling up - fallback if transitions are not supported
    //             } else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
    //                 mainNavigation.removeClass('is-visible has-transitions');
    //                 navigationContainer.removeClass('is-fixed');
    //                 $('.cd-nav-trigger').removeClass('menu-is-open');
    //                 //scrolling up with menu closed
    //             } else {
    //                 navigationContainer.removeClass('is-fixed');
    //                 mainNavigation.removeClass('has-transitions');
    //             }
    //         }
    //     }
    // };
    //
    // /* ToTop */
    // var Annie_ToTop = function() {
    //     /* your code */
    // };
    //
    // /* Toc */
    // var Annie_Toc = function() {
    //     /* your code */
    // };

    /* other js function */
    /* ... */

    /* Initialize */
    (function init() {
        loader();
        scroll();
        hashchange();
        progress();
        // Annie_Nav();
        // Annie_ToTop();
        // Annie_Toc();
    })();
});
