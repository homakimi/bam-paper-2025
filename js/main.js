$(function() {
    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
    } else {
        headerHeight = 0;
    }
    $('.bam-five-wrap').css('padding-top', headerHeight)

    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })

    new Swiper('.info-swiper .swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.info-swiper .swiper-button-next',
            prevEl: '.info-swiper .swiper-button-prev',
        },
        breakpoints: {
            1025: {
                slidesPerView: 3
            }
        }
    });

    urlDetect();
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
.on('click', '.bam-five-hamburger', function() {
    $('body').addClass('fix');
    $('.bam-five-menu').stop().fadeIn();
})
.on('click', '.bam-five-close, .bam-five-lightbox-close, [data-target]', function() {
    $('body').removeClass('fix');
    $('.bam-five-menu, .bam-five-lightbox').stop().fadeOut();
})
.on('click', '[data-target]', function() {
    if($(this).data('target') == 'top') {
        $('body, html').animate({ scrollTop: 0 }, 1000);
    } else {
        $('body, html').animate({ scrollTop: $('[data-pin="'+$(this).data('target')+'"]').offset().top - headerHeight }, 1000);
    }
})
.on('click', '.win-flex a',function() {
    $('body').addClass('fix');
    $('.bam-five-lightbox').stop().fadeIn();
})
.on('click', '.notice-more', function() {
    $(this).toggleClass('active');
    $('.notice article').stop().slideToggle();
    $('body, html').animate({ scrollTop: $('.notice').offset().top - headerHeight }, 750);
})
.on('click', '')

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
}


function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        if($('[data-pin="'+_searchParams+'"]').length > 0) {
            setTimeout(function() {
                $('body, html').animate({ scrollTop: $('[data-pin="'+_searchParams+'"]').offset().top - headerHeight }, 1000);
            }, 250)
        }
    }
}
