var headerHeight;
var infoTimeout;
var introSwiper
$(function() {
    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
    } else {
        headerHeight = 0;
    }
    resize();
    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })
    $(window).resize(function() {
        resize();
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

    $('.info-block article:first-child a').addClass('active');
    if(window.innerWidth <= 1024) $('.info-block article:first-child .info-dropdown').show();
    if(window.innerWidth <= 1024) $('.intro-block:first-child').show();
})

var infoBadge, introBadge, qEffect, infoEffect, introEffect, introClick, linkEffect = false;

function resize() {
    if(window.innerWidth > 1024) {
        if(introEffect) {
            $('.intro-default, .intro-hand').hide();
        }
    } else {
        if(introEffect && !introClick) {
            $('.intro .swiper-slide').eq(0).addClass('active');
            $('.intro-block').eq(0).show();
        }
        if(introEffect && introClick) {
            setTimeout(function() {
                introSwiper.slideTo($('.intro .swiper-slide.active').index());
            }, 500)
        }
    }
}
function scrollEffect() {
    if($(window).scrollTop() + window.innerHeight*0.25 > $('.info').offset().top && $(window).scrollTop() < $('.info').offset().top + $('.info').height() - window.innerHeight*0.25 ) {
        $('.info .badge').addClass('show');
        infoBadge = true;
    } else {
        if(infoBadge) {
            $('.info .badge').removeClass('show');
        }
    }
    if($(window).scrollTop() + window.innerHeight*0.25 > $('.intro').offset().top && $(window).scrollTop() < $('.intro').offset().top + $('.intro').height() - window.innerHeight*0.25) {
        $('.intro .badge').addClass('show');
        introBadge = true;
    } else {
        if(introBadge) {
            $('.intro .badge').removeClass('show');
        }
    }
    
    if($(window).scrollTop() > $('.question').offset().top - window.innerHeight*0.5) {
        if(!qEffect) {
            qEffect = true;
            $('.question-intro [data-show]').each(function(index) {
                setTimeout(function() {
                    $(this).addClass('active')
                }.bind(this), index*500)
            })
            $('.question-btn').addClass('active')
        }
    }
    if($(window).scrollTop() > $('.info').offset().top - window.innerHeight*0.5) {
        if(!infoEffect) {
            infoEffect = true;
            $('.info .bam-exam-h2, .info .bam-exam-h2-deco').addClass('active');
            if(window.innerWidth > 1024) {
                $('.info-block article a').each(function(index) {
                    setTimeout(function() {
                        $(this).find('p').addClass('effect')
                    }.bind(this), index*250)
                })
                infoTimeout = setTimeout(function() {
                    $('.info-block article:first-child .info-dropdown').fadeIn();
                }, 3000)
            }
        }
    }
    if($(window).scrollTop() > $('.intro').offset().top - window.innerHeight*0.5) {
        if(!introEffect) {
            introEffect = true;
            $('.intro .bam-exam-h2, .intro .bam-exam-h2-deco').addClass('active');
            $('.intro-hand').addClass('active');
        }
    }
    if($(window).scrollTop() > $('.link').offset().top - window.innerHeight*0.5) {
        if(!linkEffect) {
            linkEffect = true;
            $('.link h2 img').addClass('active')
            $('.link [data-show]').each(function(index) {
                setTimeout(function() {
                    $(this).addClass('active')
                }.bind(this), index*500)
            })
            $('.link-flex > div').each(function(index) {
                setTimeout(function() {
                    $(this).addClass('active')
                }.bind(this), index*500)
            })
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
.on('click', '.question-btn', function() {
    $('.bam-exam-q-deco').addClass('active');
})
.on('click', '.info-block a', function() {
    clearTimeout(infoTimeout);
    if(!$(this).hasClass('active')) {
        $('.info-block a').removeClass('active');
        $(this).addClass('active');
        if(window.innerWidth > 1024) {
            $('.info-dropdown').hide();
            $(this).next('.info-dropdown').fadeIn();
        } else {
            $('.info-dropdown').stop().slideUp();
            $(this).next('.info-dropdown').stop().slideDown();

        }
    }
})
.on('click', '.intro .swiper-slide', function() {
    if(!$(this).hasClass('active')) {
        introClick = true;
        $('.intro-default, .intro-hand').hide();
        $('.intro .swiper-slide').removeClass('active');
        $(this).addClass('active');
        $('.intro-block').hide();
        $('.intro-block').eq($(this).index()).fadeIn();
    }
})

function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        $('body, html').animate({ scrollTop: $('.'+_searchParams).offset().top - headerHeight }, 1000);
    }
}