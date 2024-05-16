var headerHeight;
var introSwiper;
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

    if(window.innerWidth <= 1024) $('.intro-block:first-child').show();
})

var infoBadge, introBadge, qEffect, infoEffect, introEffect, introClick, infoClick, linkEffect = false;

function resize() {
    if(window.innerWidth > 1024) {
        if(infoEffect) {
            $('.info-default, .info-hand').hide();
        }
        if(infoEffect && !infoClick) {
            $('.info-default, .info-hand').show();
        }
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
    if($(window).scrollTop() + window.innerHeight*0.5 > $('.info').offset().top && $(window).scrollTop() < $('.info').offset().top + $('.info').height() - window.innerHeight*0.5 ) {
        $('.info .badge').addClass('show');
        infoBadge = true;
    } else {
        if(infoBadge) {
            $('.info .badge').removeClass('show');
        }
    }
    if($(window).scrollTop() + window.innerHeight*0.5 > $('.intro').offset().top && $(window).scrollTop() < $('.intro').offset().top + $('.intro').height() - window.innerHeight*0.5) {
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
            $('.question-btn').addClass('active');
            $('.question-intro h5').addClass('active');
        }
    }
    if($(window).scrollTop() > $('.info').offset().top - window.innerHeight*0.5) {
        if(!infoEffect) {
            infoEffect = true;
            $('.info .bam-exam-h2, .info .bam-exam-h2-deco, .info-hand, .info-block, .info-default').addClass('active');
            if(window.innerWidth > 1024) {
                $('.info-block article a').each(function(index) {
                    setTimeout(function() {
                        $(this).find('p').addClass('effect')
                    }.bind(this), index*250)
                });
            }
        }
    }
    if($(window).scrollTop() > $('.intro').offset().top - window.innerHeight*0.5) {
        if(!introEffect) {
            introEffect = true;
            $('.intro .bam-exam-h2, .intro .bam-exam-h2-deco, .intro-hand, .intro .swiper, .intro-right, .intro h5').addClass('active');
        }
    }
    if($(window).scrollTop() > $('.link').offset().top - window.innerHeight*0.5) {
        if(!linkEffect) {
            linkEffect = true;
            $('.link h2 .bam-exam-h2-deco, .link h2 .bam-exam-h2').addClass('active')
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
.on('click', '.info-a', function() {
    if(!$(this).hasClass('active')) {
        infoClick = true;
        $('.info-default, .info-hand').hide();
        $('.info-a').removeClass('active');
        $(this).addClass('active');
        if(window.innerWidth > 1024) {
            $('.info-dropdown').hide();
            $(this).next('.info-dropdown').fadeIn();
        } else {
            $('.info-dropdown').stop().slideUp();
            $(this).next('.info-dropdown').stop().slideDown();
            setTimeout(function() {
                $('body, html').animate({ scrollTop: $(this).offset().top - headerHeight }, 1000);
            }.bind(this), 500)
        }
    } else {
        if(window.innerWidth <= 1024) {
            infoClick = false;
            $(this).removeClass('active');
            $(this).next('.info-dropdown').stop().slideUp();
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