$(function() {
    $(window).scroll(function() {
        if($(window).scrollTop() > $('.content-2').offset().top - window.innerHeight*0.5) {
            $('.lantern-left, .lantern-right').addClass('active');
        }
    })
})
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
.on('click', '.notice-more', function() {
    $(this).hide();
    $('.notice-content').addClass('active');
})
.on('click', '.banner-bag', function() {
    // random
    var _random = parseInt(Math.random()*3)+1;
    console.log(_random)
    $('.bam-newyear-paper').css('background', 'url("img/bam-newyear-paper-'+_random+'.jpg")')
    $('body').addClass('fix');
    $('.bam-newyear-lightbox').fadeIn();
    setTimeout(function() {
        $('body').removeClass('fix');
        $('.bam-newyear-lightbox').fadeOut();
        $('body, html').animate({scrollTop: $('.content-1').offset().top}, 1000)
    }, 3500)
})
.on('click', '.card-swiper-wrap .swiper-slide', function() {
    if(window.innerWidth > 1024) {
        var imageUrl = $(this).find('img').attr('src');
        var downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = 'downloaded_image.jpg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
})