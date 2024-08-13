var headerHeight;

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
    // urlDetect();

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

    var mapArticle = 0;
    setInterval(function() {
        $('.map-des article').removeClass('active');
        $('.map-des article').eq(mapArticle).addClass('active');
        mapArticle ++;
        if(mapArticle == $('.map-des article').length) {
            mapArticle = 0;
        }
    }, 2000)

    $('.guide-sub a, .guide-sub article p').hover(function() {
        $(this).closest('article').find('p').stop().slideDown(250);
        $(this).closest('.guide-sub').find('p.des').addClass('hide');
    }, function() {
        $(this).closest('article').find('p').stop().slideUp();
        $(this).closest('.guide-sub').find('p.des').removeClass('hide');
    })
})

var infoBadge, introBadge, qEffect, infoEffect, introEffect, introClick, infoClick, linkEffect = false;

function resize() {
    if(window.innerWidth > 1024) {
    } else {
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
.on('click', '.info-tab a', function() {
    if(!$(this).hasClass('active')) {
        $(this).closest('.info-wrap').find('.info-tab a').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.info-wrap').find('.info-swiper').hide();
        $(this).closest('.info-wrap').find('.info-swiper:nth-child('+parseInt($(this).index()+1)+')').fadeIn();
    }
})
.on('click', '.btn-guide', function() {
    $('body').addClass('fix');
    $('.guide-lightbox').fadeIn();
})
.on('click', '.guide-close, [data-scroll]', function() {
    $('body').removeClass('fix');
    $('.guide-lightbox').fadeOut();
})
.on('click', '[data-scroll]', function() {
    $('body, html').animate({ scrollTop: $('[data-scroll-target="'+$(this).data('scroll')+'"]').offset().top - headerHeight }, 1000)
})

function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        $('body, html').animate({ scrollTop: $('.'+_searchParams).offset().top - headerHeight }, 1000);
    }
}

function scrollEffect() {
    $('[data-scroll-show-parent]').each(function() {
        if($(window).scrollTop() > $(this).offset().top - $(window).height()*0.75) {
            if($(this).data('scroll-show-parent').length != '') {
                $(this).find('[data-scroll-show]').each(function(index) {
                    setTimeout(function() {
                        $(this).addClass('scrollShowActive');
                    }.bind(this), index*$(this).closest('[data-scroll-show-parent]').data('scroll-show-parent'))
                })
            } else {
                $(this).find('[data-scroll-show]').each(function() {
                    if($(this).data('scroll-show').length === 0) {
                        $(this).addClass('scrollShowActive');
                    } else {
                        setTimeout(function() {
                            $(this).addClass('scrollShowActive');
                        }.bind(this), $(this).data('scroll-show'))
                    }
                })
            }
        }
    })
    $('[data-scroll-show]').each(function() {
        if($(window).scrollTop() > $(this).offset().top - $(window).height()*0.75) {
            if($(this).closest('[data-scroll-show-parent]').length == 0) {
                if($(this).data('scroll-show').length === 0) {
                    $(this).addClass('scrollShowActive');
                } else {
                    setTimeout(function() {
                        $(this).addClass('scrollShowActive');
                    }.bind(this), $(this).data('scroll-show'))
                }
            }
        }
    })

    if($(window).scrollTop() > $('.map-bottom').offset().top - $(window).height()*0.25 && $(window).scrollTop() < $('.insure').offset().top + $('.insure').height()) {
        $('.btn-guide').fadeIn();
    } else {
        $('.btn-guide').fadeOut();
    }
}