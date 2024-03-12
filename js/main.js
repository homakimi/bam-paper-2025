$(function() {
    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })

    // detect device change start
    var isMobile, isMobileFirst, widthPC;
    if(window.innerWidth > 1024) {
        widthPC = true;
    } else {
        widthPC = false;
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobileFirst = true;
    } else {
        isMobileFirst = false;
    }
    $(window).resize(function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            isMobile = true;
        } else {
            isMobile = false;
        }
        if(isMobileFirst != isMobile) {
            location.reload();
        }
        if(widthPC && window.innerWidth <= 1024) {
            location.reload();
        } else if(!widthPC && window.innerWidth > 1024) {
            location.reload();
        }
    })
    // detect device change end


})

function scrollEffect() {
    if($(window).scrollTop() > $('.content-2').offset().top - window.innerHeight*0.75) {
        $('.lantern-left, .lantern-right').addClass('active');
    }
    $('.bam-newyear-title-ani').each(function() {
        if($(window).scrollTop() > $(this).offset().top - window.innerHeight*0.75 ) {
            $(this).addClass('active')
        }
    })
    if($(window).scrollTop() > $('.game-wrap').offset().top - window.innerHeight*0.75) {
        $('.game-intro-content').addClass('active')
    }
}
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
    $('.bam-newyear-paper').css('background', 'url("img/bam-warm-bam-newyear-paper-'+_random+'.jpg")')
    $('body').addClass('fix');
    $('.bam-newyear-lightbox').fadeIn();
    setTimeout(function() {
        $('body').removeClass('fix');
        $('.bam-newyear-lightbox').fadeOut();
        $('body, html').animate({scrollTop: $('.content-1').offset().top - $('nav').height() }, 1000)
    }, 5000)
})