$(function() {
    // scrollEffect();
    // $(window).scroll(function() {
    //     scrollEffect();
    // })
    $('.tab-wrap a:first-child').addClass('active');
    $('.swiper .swiper-slide:first-child').addClass('active');
    $('.content-block:not(:first-child)').hide();
    $('.content-content:not(:first-child)').hide();
})

// function scrollEffect() {
//     if($(window).scrollTop() > $('.content-2').offset().top - window.innerHeight*0.75) {
//         $('.lantern-left, .lantern-right').addClass('active');
//     }
//     $('.bam-newyear-title-ani').each(function() {
//         if($(window).scrollTop() > $(this).offset().top - window.innerHeight*0.75 ) {
//             $(this).addClass('active')
//         }
//     })
//     if($(window).scrollTop() > $('.game-wrap').offset().top - window.innerHeight*0.75) {
//         $('.game-intro-content').addClass('active')
//     }
// }
$(document)
.on('click', 'a', function(e) {
    if($(this).attr('href').length == 0) {
        e.preventDefault();
        e.stopPropagation();
    }
})
.on('mousedown', 'img', function(e) {
    e.preventDefault();
})
.on('click', '.tab-wrap a', function() {
    if(!$(this).hasClass('active')) {
        $('.tab-wrap a').removeClass('active');
        $(this).addClass('active');
        $('.tab-wrap').removeClass('active-0 active-1 active-2 active-3')
        $('.tab-wrap').addClass('active-'+$(this).index());
        $('.content-block').hide()
        $('.content-block').eq($(this).index()).show();
    }
})
.on('click', '.swiper .swiper-slide', function() {
    if(!$(this).hasClass('active')) {
        $(this).closest('.swiper').find('.swiper-slide').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.content-info').find('.content-content').hide();
        $(this).closest('.content-info').find('.content-content').eq($(this).index()).show();
    }
})