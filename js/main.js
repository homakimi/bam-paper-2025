$(function() {
    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
    } else {
        headerHeight = 0;
    }

    // scrollEffect();
    // $(window).scroll(function() {
    //     scrollEffect();
    // })

    new Swiper('.info-swiper .swiper', {
        spaceBetween: 0,
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.info-swiper .swiper-button-next',
            prevEl: '.info-swiper .swiper-button-prev',
        }
    });

    // urlDetect();
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
    }
}
