var headerHeight;
var mapInterval;
var swipers = [];
var mapSwiper;

$(function() {
    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
    } else {
        headerHeight = 0;
    }


    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })

    mapSwiper = new Swiper('.map-swiper .swiper', {
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
        $(this).attr('data-swiper', index);
        var _swiper = new Swiper('.info-swiper-'+index+' .swiper', {
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
        swipers.push(_swiper);
    })

    var mapArticle = 0;
    runInterval();
    function runInterval() {
        mapInterval = setInterval(function() {
            $('.map-des a').removeClass('active');
            $('.map-des a').eq(mapArticle).addClass('active');
            mapArticle ++;
            if(mapArticle == $('.map-des a').length) {
                mapArticle = 0;
            }
        }, 2000)
    }

    $('.map-bottom-href a, .map-des a').hover(function() {
        if(window.innerWidth > 1024) {
            clearInterval(mapInterval)
            $('.map-des a').removeClass('active');
            $('.map-des a').eq($(this).index()).addClass('active');
        }
    }, function() {
        if(window.innerWidth > 1024) {
            runInterval();
            $('.map-des a').removeClass('active');
            mapArticle = $(this).index();
        }
    })

    $('.guide-sub-q, .guide-sub-a').hover(function() {
        $(this).closest('article').find('.guide-sub-a').stop().fadeIn(250);
        $(this).closest('.guide-sub').find('a.des').addClass('hide');
    }, function() {
        $(this).closest('article').find('.guide-sub-a').stop().fadeOut();
        $(this).closest('.guide-sub').find('a.des').removeClass('hide');
    })
    $('.guide-sub-a').hide();

    urlDetect();
})

var infoBadge, introBadge, qEffect, infoEffect, introEffect, introClick, infoClick, linkEffect = false;

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
    if(window.innerWidth <= 1024) {
        $('.guide-sub-q').removeClass('active');
        setTimeout(function() {
            $('.guide-sub-q').each(function(index) {
                setTimeout(function() {
                    $(this).addClass('active')
                }.bind(this), index*250)
            })
        }, 500)
    }
})
.on('click', '.guide-close, [data-scroll]', function() {
    $('body').removeClass('fix');
    $('.guide-lightbox').fadeOut();
})
.on('click', '[data-scroll]', function() {
    if($(this).hasClass('guide-sub-q') && window.innerWidth <= 1024) {
        $('body, html').animate({ scrollTop: $('[data-scroll-target="'+$(this).data('scroll')+'"]').offset().top - headerHeight + $($('[data-scroll-target="'+$(this).data('scroll')+'"]')).height() - window.innerHeight }, 1000)
    } else {
        $('body, html').animate({ scrollTop: $('[data-scroll-target="'+$(this).data('scroll')+'"]').offset().top - headerHeight }, 1000)
    }
})
.on('click', '.guide-sub-q', function() {
    var _thisBlock = $('[data-scroll-target='+$(this).data('scroll')+']');
    var _thisSwiper = _thisBlock.find('.info-swiper').eq($(this).data('tab')).data('swiper');
    _thisBlock.find('.info-tab a').removeClass('active');
    _thisBlock.find('.info-tab a').eq($(this).data('tab')).addClass('active');
    _thisBlock.find('.info-swiper').hide();
    _thisBlock.find('.info-swiper').eq($(this).data('tab')).show();
    swipers[_thisSwiper].slideTo($(this).data('slide'));
})

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
        $('.btn-guide, .guide-fix').fadeIn();
    } else {
        $('.btn-guide, .guide-fix').fadeOut();
    }

    $('[data-scroll-target]').each(function() {
        if($(window).scrollTop() > $(this).offset().top - headerHeight - 1 && $(window).scrollTop() < $(this).offset().top + $(this).height() - headerHeight - 1) {
            $('.guide-fix [data-scroll="'+$(this).data('scroll-target')+'"]').addClass('active');
        } else {
            $('.guide-fix [data-scroll="'+$(this).data('scroll-target')+'"]').removeClass('active');
        }
    })
}


function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        if($('[data-pin="'+_searchParams+'"]').length > 0) {
            $('body, html').animate({ scrollTop: $('[data-pin="'+_searchParams+'"]').offset().top - headerHeight }, 1000);
        }
        // 我們與癌的距離
        if(_searchParams == 'distancepeople') {
            $('body, html').animate({ scrollTop: $('.bam-cancer-title').offset().top - headerHeight }, 1000);
            mapSwiper.slideTo(0);
        }
        if(_searchParams == 'distancecost') {
            $('body, html').animate({ scrollTop: $('.bam-cancer-title').offset().top - headerHeight }, 1000);
            mapSwiper.slideTo(1);
        }
        if(_searchParams == 'distancehelp') {
            $('body, html').animate({ scrollTop: $('.bam-cancer-title').offset().top - headerHeight }, 1000);
            mapSwiper.slideTo(2);
        }
        // 機構連結
        var _infoParent, _infoTab, _infoSwiper, _infoSlide;
        if(_searchParams == 'goodfuture') { _infoParent = 0; _infoTab = 0; _infoSwiper = 0; _infoSlide = 0 };
        if(_searchParams == 'kimforest') { _infoParent = 0; _infoTab = 0; _infoSwiper = 0; _infoSlide = 1 };
        if(_searchParams == 'gga') { _infoParent = 0; _infoTab = 0; _infoSwiper = 0; _infoSlide = 2 };
        if(_searchParams == 'healthcheck') { _infoParent = 0; _infoTab = 0; _infoSwiper = 0; _infoSlide = 3 };
        if(_searchParams == 'johnson') { _infoParent = 0; _infoTab = 1; _infoSwiper = 1; _infoSlide = 0 };
        if(_searchParams == 'bam') { _infoParent = 0; _infoTab = 1; _infoSwiper = 1; _infoSlide = 1 };
        if(_searchParams == 'cofit') { _infoParent = 0; _infoTab = 1; _infoSwiper = 1; _infoSlide = 2 };
        if(_searchParams == 'secondopinion') { _infoParent = 1; _infoTab = 0; _infoSwiper = 2; _infoSlide = 0 };
        if(_searchParams == 'hope') { _infoParent = 1; _infoTab = 1; _infoSwiper = 3; _infoSlide = 0 };
        if(_searchParams == 'imosa') { _infoParent = 1; _infoTab = 1; _infoSwiper = 3; _infoSlide = 1 };
        if(_searchParams == 'homeangel') { _infoParent = 1; _infoTab = 1; _infoSwiper = 3; _infoSlide = 2 };
        if(_searchParams == 'laurel') { _infoParent = 1; _infoTab = 1; _infoSwiper = 3; _infoSlide = 3 };
        if(_searchParams == 'athome') { _infoParent = 1; _infoTab = 1; _infoSwiper = 3; _infoSlide = 4 };
        if(_searchParams == 'aicarept') { _infoParent = 2; _infoTab = 0; _infoSwiper = 4; _infoSlide = 0 };
        if(_searchParams == 'mecotech') { _infoParent = 2; _infoTab = 0; _infoSwiper = 4; _infoSlide = 1 };
        if(_searchParams == 'adlers') { _infoParent = 2; _infoTab = 0; _infoSwiper = 4; _infoSlide = 2 };
        if(_searchParams == 'farhugs') { _infoParent = 2; _infoTab = 1; _infoSwiper = 5; _infoSlide = 0 };
        if(_searchParams == 'telehealthcheck') { _infoParent = 2; _infoTab = 1; _infoSwiper = 5; _infoSlide = 1 };
        if(_infoParent !== undefined && _infoTab !== undefined && _infoSwiper !== undefined && _infoSlide !== undefined) {
            $('body, html').animate({ scrollTop: $('.info').eq(_infoParent).offset().top - headerHeight }, 1000);
            console.log(_infoParent, _infoTab, _infoSwiper, _infoSlide)
            $('.info').eq(_infoParent).find('.info-tab a').removeClass('active');
            $('.info').eq(_infoParent).find('.info-tab a').eq(_infoTab).addClass('active');
            $('.info').eq(_infoParent).find('.info-swiper').hide();
            $('.info').eq(_infoParent).find('.info-swiper').eq(_infoTab).show();
            swipers[_infoSwiper].slideTo(_infoSlide);
        }
    }
}
