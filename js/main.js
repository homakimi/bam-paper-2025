var headerHeight;

$(function() {
    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
    } else {
        headerHeight = 0;
    }

    resize();
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
            resize();
        }
        if(widthPC && window.innerWidth <= 1024) {
            resize();
        } else if(!widthPC && window.innerWidth > 1024) {
            resize();
        }
    })

    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })
    urlDetect();

    new Swiper('.map-swiper .swiper', {
        spaceBetween: 15,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        navigation: {
            nextEl: '.map-swiper .swiper-button-next',
            prevEl: '.map-swiper .swiper-button-prev',
        }
    });

    $('.info-swiper').each(function(index) {
        $(this).addClass('info-swiper-'+index);
        new Swiper('.info-swiper-'+index+' .swiper', {
            effect: 'coverflow',
            speed: 500,
            allowTouchMove: false,
            coverflowEffect: {
                slideShadows: false,
            },
            runCallbacksOnInit: true,
            navigation: {
                nextEl: '.info-swiper-'+index+' .swiper-button-next',
                prevEl: '.info-swiper-'+index+' .swiper-button-prev',
            }
        });
    })
})

var infoBadge, introBadge, qEffect, infoEffect, introEffect, introClick, infoClick, linkEffect = false;

function resize() {
    if(window.innerWidth > 1024) {
    } else {
    }
}
function scrollEffect() {
    // if($(window).scrollTop() + window.innerHeight*0.5 > $('.info').offset().top && $(window).scrollTop() < $('.info').offset().top + $('.info').height() - window.innerHeight*0.5 ) {
    //     $('.info .badge').addClass('show');
    //     infoBadge = true;
    // } else {
    //     if(infoBadge) {
    //         $('.info .badge').removeClass('show');
    //     }
    // }
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

function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        $('body, html').animate({ scrollTop: $('.'+_searchParams).offset().top - headerHeight }, 1000);
    }
}
