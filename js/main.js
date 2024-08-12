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

    introSwiper = new Swiper('.intro .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        breakpoints: {
            1025: {
                slidesPerView: 2,
                grid: {
                    rows: 5,
                },
                spaceBetween: 20,
            },
            1441: {
                slidesPerView: 2,
                spaceBetween: 30,
                grid: {
                    rows: 5,
                },
            },
        },
        navigation: {
            nextEl: '.intro .swiper-button-next',
            prevEl: '.intro .swiper-button-prev',
        },
        on: {
            init: function() {
                if(window.innerWidth <= 1024) this.slides.eq(0).addClass('active');
            },
            click: function () {
                this.slideTo(this.clickedIndex)
            }
        }
    });
})

var infoBadge, introBadge, qEffect, infoEffect, introEffect, introClick, infoClick, linkEffect = false;

function resize() {
    if(window.innerWidth > 1024) {
    } else {
    }
}
function scrollEffect() {
    if($(window).scrollTop() + window.innerHeight*0.5 > $('.info').offset().top && $(window).scrollTop() < $('.info').offset().top + $('.info').height() - window.innerHeight*0.5 ) {
        $('.info .badge').addClass('show');
        infoBadge = true;
    } else {
        if(infoBadge) {
            $('.info .badge').removeClass('show');
        }
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

function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        $('body, html').animate({ scrollTop: $('.'+_searchParams).offset().top - headerHeight }, 1000);
    }
}
